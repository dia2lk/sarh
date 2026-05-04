import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Calendar, CheckCircle, Phone, MessageCircle, Clock, ArrowLeft, Send } from 'lucide-react'

const timeSlots = ['9:00 ص', '10:00 ص', '11:00 ص', '12:00 م', '1:00 م', '2:00 م', '3:00 م', '4:00 م', '5:00 م']
const topics = ['تأسيس شركة', 'صياغة عقد', 'استشارة ضريبية', 'قضية قانونية', 'حوكمة الأعمال', 'أخرى']

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', phone: '', email: '', topic: '', time: '', notes: '' })
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submitStep1 = e => {
    e.preventDefault()
    setStep(2)
  }

  const submitStep2 = e => {
    e.preventDefault()
    setLoading(true)
    const text = encodeURIComponent(
      `طلب حجز استشارة\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالبريد: ${form.email}\nالموضوع: ${form.topic}\nالوقت المفضل: ${form.time}\nملاحظات: ${form.notes}`
    )
    setTimeout(() => {
      setLoading(false)
      setStep(3)
      window.open(`https://wa.me/201117819505?text=${text}`, '_blank', 'noopener,noreferrer')
    }, 900)
  }

  return (
    <>
      <SEO
        title="احجز استشارة مجانية — 30 دقيقة مع خبير قانوني"
        description="احجز استشارتك القانونية الأولى مجاناً مع فريق صرح المتخصص. تقييم وضعك القانوني وتحديد مسار العمل في 30 دقيقة."
        canonical="/book-consultation"
        noIndex={true}
      />

      <main className="min-h-screen bg-gray-light py-16">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{background:'rgba(201,162,39,0.15)', border:'1px solid rgba(201,162,39,0.3)'}}>
              <Calendar className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-3xl font-black text-navy mb-2">احجز استشارة مجانية</h1>
            <p className="text-gray-text">30 دقيقة مع أحد خبراء صرح القانونيين لتقييم وضعك وتحديد مسار العمل</p>
          </div>

          {step < 3 && (
            <div className="flex items-center gap-3 mb-8">
              {[1, 2].map(s => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? 'bg-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {s}
                  </div>
                  <span className={`text-sm font-semibold transition-colors ${step >= s ? 'text-gold' : 'text-gray-400'}`}>
                    {s === 1 ? 'بياناتك' : 'تفاصيل الاستشارة'}
                  </span>
                  {s < 2 && <div className="flex-1 h-0.5 bg-gray-200 mx-2" style={step > s ? {background:'#c9a227'} : {}} />}
                </div>
              ))}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={submitStep1} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-5">
              <div>
                <label className="text-navy text-sm font-bold block mb-2">الاسم الكامل *</label>
                <input name="name" required value={form.name} onChange={onChange}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-navy outline-none focus:ring-2 focus:ring-gold/30 font-arabic text-right text-sm"
                />
              </div>
              <div>
                <label className="text-navy text-sm font-bold block mb-2">رقم الهاتف *</label>
                <input name="phone" required value={form.phone} onChange={onChange}
                  placeholder="01xxxxxxxxx" dir="ltr"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-navy outline-none focus:ring-2 focus:ring-gold/30 font-arabic text-right text-sm"
                />
              </div>
              <div>
                <label className="text-navy text-sm font-bold block mb-2">البريد الإلكتروني</label>
                <input name="email" type="email" value={form.email} onChange={onChange}
                  placeholder="example@domain.com" dir="ltr"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-navy outline-none focus:ring-2 focus:ring-gold/30 font-arabic text-right text-sm"
                />
              </div>
              <button type="submit"
                className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{background:'linear-gradient(135deg, #c9a227, #e2b93b)'}}>
                التالي <ArrowLeft className="w-5 h-5" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submitStep2} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-5">
              <div>
                <label className="text-navy text-sm font-bold block mb-3">موضوع الاستشارة *</label>
                <div className="grid grid-cols-2 gap-2">
                  {topics.map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => setForm(f => ({...f, topic: t}))}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                        form.topic === t ? 'bg-gold text-white border-gold' : 'border-gray-200 text-gray-text hover:border-gold/30 hover:text-gold'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-navy text-sm font-bold block mb-3">الوقت المفضل *</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => setForm(f => ({...f, time: t}))}
                      className={`px-3 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        form.time === t ? 'bg-gold text-white border-gold' : 'border-gray-200 text-gray-text hover:border-gold/30 hover:text-gold'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-navy text-sm font-bold block mb-2">ملاحظات إضافية</label>
                <textarea name="notes" value={form.notes} onChange={onChange}
                  rows={3} placeholder="اكتب أي تفاصيل إضافية تود مشاركتها..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-navy outline-none focus:ring-2 focus:ring-gold/30 font-arabic text-right resize-none text-sm"
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-xl font-bold border border-gray-200 text-gray-text hover:border-gold/30 hover:text-gold transition-all">
                  السابق
                </button>
                <button type="submit" disabled={!form.topic || !form.time || loading}
                  className="flex-2 py-4 px-8 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                  style={{background:'linear-gradient(135deg, #c9a227, #e2b93b)', flex:2}}>
                  {loading ? 'جاري الإرسال...' : <><Send className="w-5 h-5" /> تأكيد الحجز</>}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm text-center">
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
              <h2 className="text-2xl font-black text-navy mb-3">تم تأكيد طلب الحجز!</h2>
              <p className="text-gray-text mb-8 leading-relaxed">
                تم إرسال طلبك عبر واتساب. سيقوم فريقنا بالتواصل معك خلال ساعات لتأكيد موعد الاستشارة.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <a href="tel:+201117819505"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all">
                  <Phone className="w-5 h-5" /> اتصل بنا
                </a>
                <a href="https://wa.me/201117819505" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
                  style={{background:'linear-gradient(135deg, #25d366, #128c7e)'}}>
                  <MessageCircle className="w-5 h-5" /> واتساب
                </a>
              </div>
              <Link to="/" className="text-gold font-semibold hover:underline text-sm">
                العودة إلى الرئيسية
              </Link>
            </div>
          )}

          {/* Info cards */}
          {step < 3 && (
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: <Clock className="w-5 h-5 text-gold" />,   title: '30 دقيقة مجاناً', desc: 'الاستشارة الأولى مجانية بالكامل' },
                { icon: <Phone className="w-5 h-5 text-gold" />,   title: 'رد خلال 24 ساعة', desc: 'يتواصل معك فريقنا لتأكيد الموعد' },
              ].map(c => (
                <div key={c.title} className="bg-white rounded-xl p-5 border border-gray-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{background:'rgba(201,162,39,0.1)'}}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-bold text-navy text-sm mb-1">{c.title}</p>
                    <p className="text-gray-text text-xs">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
