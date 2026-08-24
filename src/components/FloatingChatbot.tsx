import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Phone, ChevronLeft, Shield, CheckCircle2 } from 'lucide-react';
import {
  streamAIResponse,
  createNewConversation,
  saveConversation,
  type AIConversation,
  type AIMessage,
} from '../lib/aiService';
import {
  trackLeadSubmitted,
  trackLeadSuccess,
  trackFormStarted,
  trackFormFieldFocus,
  prepareSupabasePayload,
  submitToSupabase,
} from '../lib/analytics';

// ── Quick Questions (shown on welcome screen) ──
const QUICK_QUESTIONS = [
  { id: 'company', text: 'كيف أسس شركة في مصر؟' },
  { id: 'contract', text: 'ما أهم بنود عقد الشراكة؟' },
  { id: 'tax', text: 'ما التزاماتي الضريبية؟' },
  { id: 'case', text: 'لدي قضية تجارية معقدة' },
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<AIConversation>(createNewConversation());
  const [hasAIReplied, setHasAIReplied] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Lead form
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Minimized state
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const leadStarted = useRef(false);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages, showLeadCapture]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized && !showLeadCapture) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized, showLeadCapture]);

  // ── Send Message ──
  const handleSend = async (text?: string) => {
    const message = (text || input).trim();
    if (!message || isThinking) return;

    setInput('');
    setIsThinking(true);

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    const updated = {
      ...conversation,
      messages: [...conversation.messages, userMsg],
    };
    setConversation(updated);

    if (typeof window !== 'undefined') {
      window.setTimeout(() => inputRef.current?.focus(), 150);
    }

    const assistantMsg: AIMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    try {
      let fullText = '';
      const withAssistant = {
        ...updated,
        messages: [...updated.messages, assistantMsg],
      };
      setConversation(withAssistant);

      await streamAIResponse(
        message,
        (token) => {
          fullText += token;
          setConversation(prev => ({
            ...prev,
            messages: prev.messages.map(m =>
              m.id === assistantMsg.id ? { ...m, content: fullText } : m
            ),
          }));
        },
        (_fullText, _durationMs) => {
          // onComplete - analytics handled elsewhere
        },
        (_error) => {
          // onError - handled by catch
        },
        'chatbot'
      );

      if (!hasAIReplied) {
        setHasAIReplied(true);
        // Show lead capture banner after 2 seconds
        setTimeout(() => setShowLeadCapture(true), 2000);
      }

      saveConversation({ ...withAssistant, messages: withAssistant.messages.map(m =>
        m.id === assistantMsg.id ? { ...m, content: fullText } : m
      ) });

    } catch {
      setConversation(prev => ({
        ...prev,
        messages: prev.messages.map(m =>
          m.id === assistantMsg.id ? { ...m, content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.' } : m
        ),
      }));
    } finally {
      setIsThinking(false);
    }
  };

  // ── Lead Capture ──
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;

    setIsSubmittingLead(true);

    // Track form start
    if (!leadStarted.current) {
      leadStarted.current = true;
      trackFormStarted('floating_chatbot', 'name');
    }

    trackLeadSubmitted({
      form_name: 'floating_chatbot',
      service_type: 'ai_consultation',
      consultation_type: 'استشارة ذكية',
      lead_source: 'chatbot',
    });

    const payload = prepareSupabasePayload({
      form_name: 'floating_chatbot',
      service_type: 'ai_consultation',
      consultation_type: 'استشارة ذكية عبر الدردشة',
      name: leadName,
      phone: leadPhone,
      email: '',
      description: `محادثة تلقائية: ${conversation.messages.filter(m => m.role === 'user').map(m => m.content).join(' | ')}`,
    });

    await submitToSupabase(payload);
    setLeadSubmitted(true);
    setIsSubmittingLead(false);

    setTimeout(() => {
      trackLeadSuccess({
        form_name: 'floating_chatbot',
        service_type: 'ai_consultation',
        consultation_type: 'استشارة ذكية',
      });
    }, 300);

    // Hide lead capture after 5 seconds
    setTimeout(() => {
      setShowLeadCapture(false);
    }, 5000);
  };

  const handleLeadFieldFocus = (fieldName: string) => {
    if (!leadStarted.current) {
      leadStarted.current = true;
      trackFormStarted('floating_chatbot', fieldName);
    }
    trackFormFieldFocus('floating_chatbot', fieldName, 'text', 0);
  };

  // ── New Conversation ──
  const handleNewConversation = () => {
    setConversation(createNewConversation());
    setHasAIReplied(false);
    setShowLeadCapture(false);
    setLeadSubmitted(false);
    setLeadName('');
    setLeadPhone('');
    leadStarted.current = false;
  };

  // ── Toggle ──
  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* ── Floating Button ── */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="المساعد"
          data-testid="chatbot-trigger"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center shadow-2xl border-2 border-gold/30 group-hover:border-gold/60 transition-all group-hover:scale-105">
              <Bot size={28} className="text-gold" />
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-gold/40 animate-ping" />
            {/* Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
          </div>
          {/* Label */}
          <div className="absolute bottom-full left-0 mb-3 whitespace-nowrap bg-navy text-white text-xs px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            المستشار الذكي
          </div>
        </button>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className={`fixed z-50 flex flex-col shadow-2xl transition-all duration-300 ${
            isMinimized
              ? 'bottom-6 right-6 w-72 h-14 rounded-2xl'
              : 'bottom-6 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-4rem)] rounded-2xl'
          }`}
          style={{ direction: 'rtl' }}
          data-testid="chatbot-panel"
        >
          {/* ── Header ── */}
          <div className="bg-navy rounded-t-2xl px-5 py-4 flex items-center justify-between shrink-0 border-b border-gold/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-gold" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">المستشار الذكي</h3>
                <p className="text-gold/70 text-xs">صرح للخدمات القانونية والمحاسبية</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNewConversation}
                className="text-gold/60 hover:text-gold transition-colors p-1"
                title="محادثة جديدة"
              >
                <Sparkles size={16} />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gold/60 hover:text-gold transition-colors p-1"
              >
                <ChevronLeft size={18} className={isMinimized ? 'rotate-90' : '-rotate-90'} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gold/60 hover:text-gold transition-colors p-1"
                aria-label="إغلاق"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── Body (hidden when minimized) ── */}
          {!isMinimized && (
            <>
              {/* ── Messages ── */}
              <div className="flex-1 overflow-y-auto bg-[#0a1628] p-4 space-y-4 chat-area" data-testid="chat-area">
                {/* Welcome Screen */}
                {conversation.messages.length === 0 && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-gold/20 rounded-full mx-auto flex items-center justify-center mb-4">
                      <Bot size={32} className="text-gold" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">مرحباً بك في صرح</h4>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      نحن نخبة من الدكاترة الأكاديميين<br />
                      كيف يمكننا مساعدتك؟
                    </p>
                    <div className="grid grid-cols-1 gap-2" data-testid="quick-question-list">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q.id}
                          onClick={() => handleSend(q.text)}
                          className="bg-navy/80 border border-gold/20 text-gray-300 text-sm px-4 py-3 rounded-xl hover:border-gold/50 hover:text-gold transition-all text-right"
                          aria-label={q.text}
                          data-testid="quick-question-button"
                        >
                          {q.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chat Messages */}
                {conversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 chat-message ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user' ? 'bg-gold/20' : 'bg-navy'
                    }`}>
                      {msg.role === 'user' ? (
                        <User size={14} className="text-gold" />
                      ) : (
                        <Bot size={14} className="text-gold" />
                      )}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed message-bubble ${
                      msg.role === 'user'
                        ? 'bg-gold text-white rounded-br-md'
                        : 'bg-[#1a2744] text-gray-200 rounded-bl-md border border-[#243352]'
                    }`}>
                      {msg.content ? (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Thinking Indicator */}
                {isThinking && conversation.messages.length > 0 && !conversation.messages[conversation.messages.length - 1]?.content && (
                  <div className="flex gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-gold" />
                    </div>
                    <div className="bg-[#1a2744] border border-[#243352] rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── Lead Capture Banner ── */}
              {showLeadCapture && !leadSubmitted && (
                <div className="bg-gradient-to-l from-gold/10 to-gold/5 border-t border-gold/30 p-4 shrink-0" data-testid="lead-prompt">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={16} className="text-gold" />
                    <span className="text-gold text-sm font-bold">تواصل مع نخبة من الدكاترة الأكاديميين</span>
                  </div>
                  <form onSubmit={handleLeadSubmit} className="space-y-2" data-testid="lead-form">
                    <input
                      type="text"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      onFocus={() => handleLeadFieldFocus('lead_name')}
                      placeholder="الاسم الكامل"
                      required
                      className="w-full bg-[#0a1628] border border-gold/20 text-white text-sm px-4 py-2.5 rounded-xl placeholder:text-gray-500 focus:border-gold/50 focus:outline-none transition-colors"
                    />
                    <input
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      onFocus={() => handleLeadFieldFocus('lead_phone')}
                      placeholder="رقم الجوال 01XXXXXXXXX"
                      required
                      dir="ltr"
                      className="w-full bg-[#0a1628] border border-gold/20 text-white text-sm px-4 py-2.5 rounded-xl placeholder:text-gray-500 focus:border-gold/50 focus:outline-none transition-colors text-left"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingLead || !leadName.trim() || !leadPhone.trim()}
                      className="w-full bg-gold text-white py-2.5 rounded-xl font-bold text-sm disabled:opacity-50 hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmittingLead ? (
                        'جارٍ الإرسال...'
                      ) : (
                        <>
                          <Phone size={14} />
                          احجز استشارة مجانية
                        </>
                      )}
                    </button>
                  </form>
                  <button
                    type="button"
                    onClick={() => setShowLeadCapture(false)}
                    className="w-full text-gray-500 text-xs mt-2 hover:text-gray-300 transition-colors"
                    data-testid="lead-decline-button"
                    aria-label="رفض"
                  >
                    لا
                  </button>
                </div>
              )}

              {/* Lead Submitted Confirmation */}
              {showLeadCapture && leadSubmitted && (
                <div className="bg-green-900/30 border-t border-green-500/30 p-4 shrink-0 text-center">
                  <CheckCircle2 size={24} className="text-green-400 mx-auto mb-2" />
                  <p className="text-green-300 text-sm font-bold">تم الحجز بنجاح!</p>
                  <p className="text-green-400/70 text-xs mt-1">سيتواصل معك فريقنا خلال 24 ساعة</p>
                </div>
              )}

              {/* ── Input Bar ── */}
              <div className="bg-[#0f1a2e] rounded-b-2xl p-3 border-t border-[#1a2744] shrink-0">
                <div className="flex items-center gap-2">
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
                    placeholder="اكتب سؤالك هنا..."
                    rows={1}
                    className="flex-1 bg-[#1a2744] text-white text-sm px-4 py-3 rounded-xl border border-[#243352] placeholder:text-gray-500 focus:border-gold/40 focus:outline-none transition-colors resize-none"
                    aria-label="اكتب سؤالك"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isThinking}
                    className="w-11 h-11 bg-gold rounded-xl flex items-center justify-center text-white disabled:opacity-50 hover:bg-gold-dark transition-colors shrink-0"
                    aria-label="إرسال"
                  >
                    <Send size={16} className="rotate-180" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
