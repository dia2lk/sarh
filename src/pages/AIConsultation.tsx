import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot, User, Send, Sparkles,
  Shield, Scale, FileText, Building2,
  Phone, MessageCircle, Clock, Zap,
  BookOpen, ArrowLeft, RefreshCw, Gavel, Calculator as Calc,
} from 'lucide-react';
import {
  streamAIResponse,
  createNewConversation,
  saveConversation,
  SUGGESTED_QUESTIONS,
  QUICK_TOPICS,
  type AIConversation,
  type AIMessage,
} from '../lib/aiService';

// ---- Service Category Icons ----
const SERVICE_ICONS: Record<string, typeof Scale> = {
  'تأسيس': Building2,
  'عقد': FileText,
  'ضريب': Calc,
  'قضية': Gavel,
  'فاتورة': FileText,
  'سرية': Shield,
};

export default function AIConsultation() {
  const [conversation, setConversation] = useState<AIConversation>(createNewConversation());
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  useEffect(() => {
    if (!isThinking) inputRef.current?.focus();
  }, [isThinking]);

  // ---- Send Message ----
  async function handleSend(overrideQuery?: string) {
    const query = overrideQuery || input.trim();
    if (!query || isThinking) return;

    setInput('');
    setIsThinking(true);

    const userMsg: AIMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date(),
    };

    const assistantMsg: AIMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    const updatedConv = {
      ...conversation,
      messages: [...conversation.messages, userMsg, assistantMsg],
      updatedAt: new Date(),
      queryCount: conversation.queryCount + 1,
      title: conversation.queryCount === 0 ? query.substring(0, 50) : conversation.title,
    };
    setConversation(updatedConv);

    await streamAIResponse(
      query,
      (token) => {
        setConversation(prev => {
          const msgs = [...prev.messages];
          const lastMsg = msgs[msgs.length - 1];
          if (lastMsg.role === 'assistant') {
            msgs[msgs.length - 1] = { ...lastMsg, content: lastMsg.content + token };
          }
          return { ...prev, messages: msgs };
        });
      },
      (fullText, _duration) => {
        setIsThinking(false);
        setQueryCount(prev => prev + 1);
        setConversation(prev => {
          const msgs = [...prev.messages];
          const lastMsg = msgs[msgs.length - 1];
          if (lastMsg.role === 'assistant') {
            msgs[msgs.length - 1] = { ...lastMsg, content: fullText, isStreaming: false };
          }
          const updated = { ...prev, messages: msgs, updatedAt: new Date() };
          saveConversation(updated);
          return updated;
        });
      },
      (error) => {
        setIsThinking(false);
        setConversation(prev => {
          const msgs = [...prev.messages];
          const lastMsg = msgs[msgs.length - 1];
          if (lastMsg.role === 'assistant') {
            msgs[msgs.length - 1] = {
              ...lastMsg,
              content: `عذراً، حدث خطأ: ${error}. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.`,
              isStreaming: false,
            };
          }
          return { ...prev, messages: msgs };
        });
      },
      'consultation_page'
    );
  }

  function handleNewChat() {
    setConversation(createNewConversation());
    setInput('');
    setIsThinking(false);
  }

  // ---- Format Message (XSS-safe: no innerHTML — renders **bold** via React nodes) ----
  function formatMessage(content: string) {
    const lines = content.split('\n');
    return lines.map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={j} className="text-[#c29a56] font-bold">{part.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
        {i < lines.length - 1 && <br />}
      </span>
    ));
  }

  // Detect service category from query
  function detectServiceCategory(query: string): typeof Scale {
    for (const [key, Icon] of Object.entries(SERVICE_ICONS)) {
      if (query.includes(key)) return Icon;
    }
    return Scale;
  }

  const hasMessages = conversation.messages.length > 0;

  return (
    <div className="min-h-screen bg-[#050810]">
      {/* ---- Header Bar ---- */}
      <div className="bg-gradient-to-l from-[#0f172a] to-[#1a2332] border-b border-[#c29a56]/20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-400 hover:text-[#c29a56] transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#c29a56]/20 rounded-xl flex items-center justify-center border border-[#c29a56]/30">
                <Bot size={24} className="text-[#c29a56]" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">المستشار القانوني الذكي</h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-gray-400 text-sm">مدعوم بالذكاء الاصطناعي</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-400 text-sm">{queryCount} استفسار</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-4 py-2 bg-[#c29a56]/10 border border-[#c29a56]/20 rounded-lg text-[#c29a56] text-sm hover:bg-[#c29a56]/20 transition-all"
            >
              <RefreshCw size={14} />
              محادثة جديدة
            </button>
            <Link
              to="/book-consultation"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-l from-[#c29a56] to-[#a8833a] rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-[#c29a56]/20 transition-all"
            >
              <Phone size={14} />
              حجز استشارة حقيقية
            </Link>
          </div>
        </div>
      </div>

      {/* ---- Main Content ---- */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* ---- Sidebar ---- */}
          <div className="lg:col-span-1 space-y-6">
            {/* Features */}
            <div className="bg-[#0f172a] rounded-xl border border-[#c29a56]/10 p-5">
              <h3 className="text-[#c29a56] font-bold text-sm mb-4 flex items-center gap-2">
                <Zap size={14} />
                قدرات المستشار
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Scale, text: 'استشارات قانونية عامة' },
                  { icon: Building2, text: 'تأسيس الشركات' },
                  { icon: FileText, text: 'صياغة العقود' },
                  { icon: Calc, text: 'الضرائب والفواتير' },
                  { icon: Shield, text: 'سرية تامة' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-gray-400 text-sm">
                    <Icon size={14} className="text-[#c29a56]/60 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Topics */}
            <div className="bg-[#0f172a] rounded-xl border border-[#c29a56]/10 p-5">
              <h3 className="text-[#c29a56] font-bold text-sm mb-4 flex items-center gap-2">
                <BookOpen size={14} />
                مواضيع سريعة
              </h3>
              <div className="space-y-2">
                {QUICK_TOPICS.map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => handleSend(topic.query)}
                    className="w-full text-right px-3 py-2 bg-[#1a2332]/50 border border-gray-800/50 rounded-lg text-gray-400 text-xs hover:bg-[#c29a56]/10 hover:border-[#c29a56]/20 hover:text-[#c29a56] transition-all duration-200"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1a2332] rounded-xl border border-[#c29a56]/20 p-5 text-center">
              <div className="w-14 h-14 bg-[#c29a56]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone size={24} className="text-[#c29a56]" />
              </div>
              <h4 className="text-white font-bold text-sm mb-2">تحتاج استشارة حقيقية؟</h4>
              <p className="text-gray-400 text-xs mb-4">تحدث مع محامٍ متخصص مباشرة</p>
              <Link
                to="/book-consultation"
                className="block w-full py-2.5 bg-gradient-to-l from-[#c29a56] to-[#a8833a] rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all"
              >
                احجز استشارة الآن
              </Link>
              <a
                href="https://wa.me/201117819505"
                className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg text-[#25D366] text-sm hover:bg-[#25D366]/20 transition-all"
              >
                <MessageCircle size={14} />
                تواصل عبر واتساب
              </a>
            </div>
          </div>

          {/* ---- Chat Area ---- */}
          <div className="lg:col-span-3">
            <div className="bg-[#0a0f1a] rounded-2xl border border-gray-800/50 overflow-hidden flex flex-col min-h-[700px]">
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Welcome Screen */}
                {!hasMessages && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#c29a56]/20 to-[#c29a56]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#c29a56]/20">
                      <Bot size={48} className="text-[#c29a56]" />
                    </div>
                    <h2 className="text-white text-2xl font-black mb-3">المستشار القانوني الذكي</h2>
                    <p className="text-gray-400 text-base leading-relaxed max-w-lg mx-auto mb-8">
                      اسأل أي سؤال قانوني واحصل على إرشادات مبدئية فورية.
                      <br />
                      نظامنا الذكي يغطي تأسيس الشركات، العقود، الضرائب، والقضايا.
                    </p>

                    {/* Suggested Questions Grid */}
                    <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {SUGGESTED_QUESTIONS.slice(0, 6).map((q) => {
                        const Icon = detectServiceCategory(q);
                        return (
                          <button
                            key={q}
                            onClick={() => handleSend(q)}
                            className="flex items-start gap-3 p-4 bg-[#0f172a]/80 border border-gray-800/50 rounded-xl text-right hover:bg-[#c29a56]/5 hover:border-[#c29a56]/20 transition-all duration-300 group"
                          >
                            <div className="w-8 h-8 bg-[#c29a56]/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#c29a56]/20 transition-colors">
                              <Icon size={14} className="text-[#c29a56]" />
                            </div>
                            <span className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                              {q}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-xs">
                      <Clock size={12} />
                      رد فوري — متاح 24/7
                    </div>
                  </div>
                )}

                {/* Messages */}
                {conversation.messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-[#c29a56]/20 border border-[#c29a56]/30'
                          : 'bg-[#0f172a] border border-[#1e293b]'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User size={18} className="text-[#c29a56]" />
                      ) : (
                        <Bot size={18} className="text-[#c29a56]" />
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                        msg.role === 'user'
                          ? 'bg-[#c29a56]/15 border border-[#c29a56]/25 text-white'
                          : 'bg-[#111827] border border-gray-800 text-gray-300'
                      }`}
                    >
                      <div className="text-sm leading-[1.8] whitespace-pre-wrap">
                        {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
                      </div>
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-5 bg-[#c29a56] animate-pulse mr-1 align-middle" />
                      )}
                      {/* Timestamp */}
                      <div className={`mt-2 text-[10px] ${msg.role === 'user' ? 'text-[#c29a56]/40' : 'text-gray-600'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Thinking */}
                {isThinking && hasMessages && conversation.messages[conversation.messages.length - 1]?.role === 'user' && (
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-center shrink-0">
                      <Bot size={18} className="text-[#c29a56]" />
                    </div>
                    <div className="bg-[#111827] border border-gray-800 rounded-2xl px-5 py-4">
                      <div className="flex gap-2 items-center">
                        <Sparkles size={14} className="text-[#c29a56] animate-pulse" />
                        <span className="text-gray-500 text-sm">جاري تحليل سؤالك...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Follow-ups */}
              {!isThinking && hasMessages && conversation.messages[conversation.messages.length - 1]?.role === 'assistant' && !conversation.messages[conversation.messages.length - 1]?.isStreaming && (
                <div className="px-6 pb-3">
                  <div className="flex gap-2 overflow-x-auto scrollbar-none">
                    {['أريد حجز استشارة متخصصة', 'ما هي تكاليف الخدمات؟', 'هل بياناتي آمنة؟', 'ما هي القطاعات التي تخدمونها؟'].map(q => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="shrink-0 px-4 py-2 bg-[#c29a56]/5 border border-[#c29a56]/15 rounded-full text-[#c29a56] text-xs hover:bg-[#c29a56]/15 hover:border-[#c29a56]/30 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="px-6 py-2 bg-[#050810] border-t border-gray-800/30">
                <p className="text-[11px] text-gray-600 text-center">
                  ⚠️ هذه استشارة مبدئية بالذكاء الاصطناعي ولا تغني عن الاستشارة القانونية المتخصصة من محامٍ مرخّص
                </p>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-800/50 bg-[#0a0f1a]">
                <div className="flex items-end gap-3">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="اكتب سؤالك القانوني هنا... (Enter للإرسال)"
                    className="flex-1 bg-[#111827] border border-gray-700/50 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#c29a56]/50 focus:ring-1 focus:ring-[#c29a56]/20 transition-all resize-none min-h-[48px] max-h-[120px]"
                    rows={1}
                    disabled={isThinking}
                    dir="rtl"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isThinking}
                    className="w-12 h-12 bg-gradient-to-br from-[#c29a56] to-[#a8833a] rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#c29a56]/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    <Send size={18} className="rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
