import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SchemaLD from '../components/SchemaLD'
import { Send, Scale, Lock, Zap, AlertTriangle, ArrowLeft } from 'lucide-react'

const suggestions = [
  'كيف أؤسس شركة ذات مسؤولية محدودة في مصر؟',
  'ما الفرق بين شركة المساهمة والشركة ذات مسؤولية محدودة؟',
  'كيف أحمي عقدي التجاري من الثغرات القانونية؟',
  'ما هي التزاماتي الضريبية كشركة ناشئة؟',
]

const fakeResponses = {
  default: 'شكراً لسؤالك. بناءً على التشريعات المصرية المعمول بها، هذا الموضوع يتضمن جوانب قانونية متعددة تستوجب الدراسة الدقيقة لحالتك تحديداً. أنصحك بحجز استشارة مع أحد خبراء صرح للحصول على رأي قانوني دقيق ومخصص لوضعك. يمكنك حجز استشارة أولية مجانية لمدة 30 دقيقة.',
}

export default function AIPage() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'مرحباً! أنا المستشار القانوني الذكي لصرح. يمكنني تقديم إرشادات قانونية مبدئية. كيف يمكنني مساعدتك اليوم؟' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  const send = (text) => {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', text }
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      setMessages(m => [...m, { role: 'bot', text: fakeResponses.default }])
      setLoading(false)
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 1200)
  }

  return (
    <>
      <SEO
        title="المستشار القانوني الذكي — إرشادات فورية بالذكاء الاصطناعي"
        description="احصل على إرشادات قانونية مبدئية فورية مجانية عبر مستشار صرح الذكي. متاح 24/7 لأسئلة الشركات والعقود والضرائب."
        canonical="/ai-consultation"
      />
      <SchemaLD page="ai" />

      <main className="min-h-screen bg-gray-light">
        {/* Header */}
        <section className="bg-navy py-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border"
              style={{background:'rgba(201,162,39,0.1)', borderColor:'rgba(201,162,39,0.3)'}}>
              <Scale className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              المستشار القانوني <span className="text-gold">الذكي</span>
            </h1>
            <p className="text-gray-400 mb-4">إرشادات قانونية مبدئية فورية — متاح على مدار الساعة</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link>
              <span className="text-gold">←</span>
              <span className="text-gold font-semibold">المستشار الذكي</span>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: <Zap className="w-5 h-5 text-gold" />,  label: 'رد فوري' },
              { icon: <Lock className="w-5 h-5 text-gold" />, label: 'سرية تامة' },
              { icon: <Scale className="w-5 h-5 text-gold" />,label: 'محتوى دقيق' },
            ].map(f => (
              <div key={f.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                <div className="flex justify-center mb-2">{f.icon}</div>
                <p className="text-navy font-bold text-sm">{f.label}</p>
              </div>
            ))}
          </div>

          {/* Chat box */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-navy text-white rounded-tr-none'
                      : 'text-navy rounded-tl-none border border-gray-100'
                  }`}
                    style={m.role === 'bot' ? {background:'rgba(201,162,39,0.05)'} : {}}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-end">
                  <div className="rounded-2xl rounded-tl-none px-5 py-3 border border-gray-100"
                    style={{background:'rgba(201,162,39,0.05)'}}>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{animationDelay:'0ms'}} />
                      <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{animationDelay:'150ms'}} />
                      <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{animationDelay:'300ms'}} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <div className="px-6 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-text mb-2 font-medium">أسئلة مقترحة:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all"
                    style={{background:'rgba(201,162,39,0.05)'}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <form onSubmit={e => { e.preventDefault(); send(input) }} className="flex gap-3">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="اكتب سؤالك القانوني..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-navy placeholder-gray-400 outline-none focus:ring-2 focus:ring-gold/30 font-arabic text-sm text-right"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                  style={{background:'linear-gradient(135deg, #c9a227, #e2b93b)'}}
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </form>
            </div>
          </div>

          {/* Disclaimer + CTA */}
          <div className="mt-6 p-4 rounded-xl flex items-start gap-3 bg-amber-50 border border-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 text-sm font-semibold mb-1">تنبيه مهم</p>
              <p className="text-amber-700 text-xs leading-relaxed">
                المستشار الذكي يقدم إرشادات مبدئية عامة ولا تُغني عن الاستشارة القانونية المتخصصة. للحصول على رأي قانوني معتمد وملزم، يرجى حجز استشارة مع أحد خبرائنا.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              احجز استشارة حقيقية مع خبير
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
