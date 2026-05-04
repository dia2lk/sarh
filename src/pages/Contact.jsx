import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  { Icon: Phone,   title: 'الهاتف',        value: '+966 50 000 0000',  href: 'tel:+966500000000',         dir: 'ltr' },
  { Icon: Mail,    title: 'البريد الإلكتروني', value: 'info@sarh.sa',  href: 'mailto:info@sarh.sa',       dir: 'ltr' },
  { Icon: MapPin,  title: 'العنوان',        value: 'الرياض، المملكة العربية السعودية', href: '#',         dir: 'rtl' },
  { Icon: Clock,   title: 'ساعات العمل',   value: 'الأحد – الخميس: 8ص – 5م',        href: '#',          dir: 'rtl' },
]

const serviceOptions = [
  'استشارة قانونية',
  'قضايا الشركات',
  'العقود والاتفاقيات',
  'المحاسبة القانونية',
  'الزكاة والضرائب',
  'التدقيق المالي',
  'أخرى',
]

export default function Contact() {
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', service: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-primary-900 py-20 px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-black text-white mb-4">
          تواصل معنا
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-300 text-lg max-w-xl mx-auto">
          فريقنا جاهز للإجابة على جميع استفساراتك
        </motion.p>
        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400">
          <Link to="/" className="hover:text-gold-400 transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-gold-400">تواصل معنا</span>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
          {/* Info */}
          <div className="lg:col-span-1 space-y-5">
            {contactInfo.map(({ Icon, title, value, href, dir }) => (
              <motion.a
                key={title}
                href={href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 card hover:border-primary-200 border border-transparent group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium mb-0.5">{title}</div>
                  <div className="text-primary-800 font-semibold text-sm" dir={dir}>{value}</div>
                </div>
              </motion.a>
            ))}

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden h-48 bg-primary-900 flex items-center justify-center text-gray-400 text-sm border border-gray-200"
            >
              <div className="text-center">
                <MapPin className="w-10 h-10 mx-auto mb-2 text-gold-400 opacity-50" />
                الرياض، المملكة العربية السعودية
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 card"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                <h3 className="text-2xl font-bold text-primary-800 mb-3">تم إرسال رسالتك بنجاح!</h3>
                <p className="text-gray-500 mb-6">سيتواصل معك فريقنا خلال 24 ساعة عمل.</p>
                <button onClick={() => setSent(false)} className="btn-secondary">إرسال رسالة أخرى</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-primary-800 mb-6">احجز استشارة مجانية</h2>
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label">الاسم الكامل *</label>
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      placeholder="أدخل اسمك الكامل"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label">رقم الجوال *</label>
                    <input
                      name="phone" required value={form.phone} onChange={handleChange}
                      placeholder="05xxxxxxxx" dir="ltr"
                      className="input-field text-right"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">البريد الإلكتروني</label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="example@email.com" dir="ltr"
                      className="input-field text-right"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">نوع الخدمة المطلوبة *</label>
                    <select name="service" required value={form.service} onChange={handleChange} className="input-field">
                      <option value="">اختر الخدمة المطلوبة</option>
                      {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">تفاصيل الاستفسار *</label>
                    <textarea
                      name="message" required value={form.message} onChange={handleChange}
                      rows={5} placeholder="اشرح استفسارك بالتفصيل..."
                      className="input-field resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center text-base py-4 disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          جاري الإرسال...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3 justify-center">
                          <Send className="w-5 h-5" />
                          إرسال الطلب
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
