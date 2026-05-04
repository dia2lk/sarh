import { useState } from 'react'
import { Phone, Mail, MessageCircle, Send, CheckCircle, Facebook } from 'lucide-react'

export default function ContactSection() {
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [form,    setForm]    = useState({ name: '', phone: '', message: '' })

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    const text = encodeURIComponent(
      `مرحباً، أود التواصل معكم.\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالرسالة: ${form.message}`
    )
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      window.open(`https://wa.me/201117819505?text=${text}`, '_blank', 'noopener,noreferrer')
    }, 800)
  }

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Right: info */}
          <div>
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">تواصل سريع</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              نحن هنا <span className="text-gold">لمساعدتكم</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              لا تتردد في التواصل معنا لأي استفسار أو طلب استشارة قانونية. فريقنا جاهز لخدمتكم على مدار الساعة.
            </p>

            <div className="space-y-4">
              <a href="tel:+201117819505"
                className="flex items-center gap-4 rounded-xl p-5 border transition-colors hover:bg-white/10"
                style={{background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.05)'}}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{background:'rgba(201,162,39,0.1)'}}>
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">اتصل بنا</div>
                  <div className="text-white font-bold" dir="ltr">01117819505</div>
                  <div className="text-white font-bold" dir="ltr">01035678474</div>
                </div>
              </a>

              <a href="mailto:legalsarh@gmail.com"
                className="flex items-center gap-4 rounded-xl p-5 border transition-colors hover:bg-white/10"
                style={{background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.05)'}}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{background:'rgba(201,162,39,0.1)'}}>
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">البريد الإلكتروني</div>
                  <div className="text-white font-bold">legalsarh@gmail.com</div>
                </div>
              </a>

              <a href="https://wa.me/201117819505" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl p-5 border transition-colors hover:bg-white/10"
                style={{background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.05)'}}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{background:'rgba(201,162,39,0.1)'}}>
                  <MessageCircle className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">واتساب</div>
                  <div className="text-white font-bold">تواصل مباشرة عبر واتساب</div>
                </div>
              </a>

              <a href="https://www.facebook.com/diab5566/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl p-5 border transition-colors hover:bg-white/10"
                style={{background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.05)'}}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{background:'rgba(201,162,39,0.1)'}}>
                  <Facebook className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">فيسبوك</div>
                  <div className="text-white font-bold">صفحتنا على فيسبوك</div>
                </div>
              </a>
            </div>
          </div>

          {/* Left: form */}
          <div className="rounded-3xl p-8 border" style={{background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.1)'}}>
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-white mb-2">تم الإرسال بنجاح!</h3>
                <p className="text-gray-400 mb-6">سنقوم بالرد عليكم خلال 24 ساعة</p>
                <button onClick={() => setSent(false)}
                  className="px-6 py-3 rounded-xl font-bold text-white transition-all"
                  style={{background:'rgba(201,162,39,0.2)', border:'1px solid rgba(201,162,39,0.3)'}}>
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-white mb-2">أرسل لنا رسالة</h3>
                <p className="text-gray-400 text-sm mb-8">سنقوم بالرد عليكم خلال 24 ساعة</p>
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label className="text-gray-300 text-sm font-semibold block mb-2">الاسم الكامل</label>
                    <input name="name" required value={form.name} onChange={onChange}
                      placeholder="أدخل اسمك"
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none focus:ring-2 font-arabic text-right"
                      style={{background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)'}}
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-semibold block mb-2">رقم الهاتف</label>
                    <input name="phone" required value={form.phone} onChange={onChange}
                      placeholder="01xxxxxxxxx" dir="ltr"
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none focus:ring-2 font-arabic text-right"
                      style={{background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)'}}
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm font-semibold block mb-2">الرسالة</label>
                    <textarea name="message" required value={form.message} onChange={onChange}
                      rows={4} placeholder="اكتب استفسارك..."
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none focus:ring-2 font-arabic text-right resize-none"
                      style={{background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)'}}
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition-all hover:opacity-90 disabled:opacity-70"
                    style={{background:'linear-gradient(135deg, #c9a227, #e2b93b)'}}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        جاري الإرسال...
                      </span>
                    ) : (
                      <><Send className="w-5 h-5" /> إرسال الرسالة</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
