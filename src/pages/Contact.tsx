import { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import {
  trackLeadSubmitted,
  trackLeadSuccess,
  trackFormFieldFocus,
  trackFormStarted,
  trackCTAClick,
  trackPhoneClick,
  trackEmailClick,
  trackWhatsAppClick,
  prepareSupabasePayload,
  submitToSupabase,
} from '../lib/analytics';

const branches = [
  {
    city: 'بني سويف',
    address: 'كورنيش النيل - برج الصفوة - الدور الأول - أعلى ديسباسيتو - بجوار هيئة الرقابة المالية',
    phone: '01117819505',
    phone2: '01035678474',
    hours: 'الأحد - الخميس: 9:00 ص - 6:00 م',
  },
  {
    city: 'الجيزة',
    address: 'القرية الذكية - مبني نورث سايد - الدور الأول',
    phone: '01117819505',
    phone2: '01035678474',
    hours: 'الأحد - الخميس: 9:00 ص - 6:00 م',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const formStarted = useRef(false);
  const fieldFocused = useRef<Set<string>>(new Set());

  // Track form start
  const handleFormStart = (fieldName: string) => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStarted('contact_form', fieldName);
    }
  };

  // Track field focus
  const handleFieldFocus = (fieldName: string, fieldType: string) => {
    if (!fieldFocused.current.has(fieldName)) {
      fieldFocused.current.add(fieldName);
      handleFormStart(fieldName);
      trackFormFieldFocus('contact_form', fieldName, fieldType);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = formData.name.trim() && formData.phone.trim() && formData.subject && formData.message.trim();
    if (!isValid) {
      return;
    }
    
    // 🔥 Core Conversion: lead_submitted
    trackLeadSubmitted({
      form_name: 'contact_form',
      service_type: formData.subject,
    });

    // 🔥 Submit to Supabase
    const payload = prepareSupabasePayload({
      form_name: 'contact_form',
      service_type: formData.subject,
      consultation_type: formData.subject,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      preferred_date: '',
      preferred_time: '',
      description: formData.message,
    });

    await submitToSupabase(payload);

    setSubmitted(true);

    // 🔥 Thank You Event
    setTimeout(() => {
      trackLeadSuccess({
        form_name: 'contact_form',
        service_type: formData.subject,
      });
    }, 500);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">تواصل معنا</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            نسعد <span className="text-gold">بتواصلكم</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            نحن هنا للإجابة على جميع استفساراتكم وتقديم الدعم القانوني الذي تحتاجونه
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              {submitted ? (
                /* Thank You State */
                <div className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                    <Send size={36} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-black text-green-800 mb-4">تم إرسال رسالتكم بنجاح!</h2>
                  <p className="text-green-700 mb-6 text-lg">
                    شكراً لتواصلكم معنا. سنقوم بالرد عليكم خلال 24 ساعة عمل.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                      formStarted.current = false;
                      fieldFocused.current = new Set();
                    }}
                    className="bg-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-navy-light transition-all"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-navy mb-2">أرسل لنا رسالة</h2>
                  <p className="text-gray-500 mb-8">سنقوم بالرد عليكم خلال 24 ساعة عمل</p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-navy mb-2">الاسم الكامل *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => handleFieldFocus('name', 'text')}
                          className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-navy bg-gray-50 transition-all"
                          placeholder="أدخل اسمك الكامل"
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-navy mb-2">رقم الجوال *</label>
                        <input
                          type="tel"
                          required
                          inputMode="tel"
                          pattern="^[0-9+\-\s]{8,15}$"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onFocus={() => handleFieldFocus('phone', 'tel')}
                          className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-navy bg-gray-50 transition-all"
                          placeholder="05XXXXXXXX"
                          dir="ltr"
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-navy mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => handleFieldFocus('email', 'email')}
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-navy bg-gray-50 transition-all"
                        placeholder="example@email.com"
                        dir="ltr"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-navy mb-2">الموضوع *</label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        onFocus={() => handleFieldFocus('subject', 'select')}
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-navy bg-gray-50 transition-all"
                      >
                        <option value="">اختر الموضوع</option>
                        <option value="consultation">طلب استشارة قانونية</option>
                        <option value="company">تأسيس شركة</option>
                        <option value="contract">صياغة عقد</option>
                        <option value="case">قضية قانونية</option>
                        <option value="tax">استشارة ضريبية</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-navy mb-2">رسالتكم *</label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => handleFieldFocus('message', 'textarea')}
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-navy bg-gray-50 transition-all resize-none"
                        placeholder="اكتب رسالتك هنا..."
                        minLength={10}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-l from-gold to-gold-light text-navy-dark py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send size={20} />
                      <span>إرسال الرسالة</span>
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-black text-navy mb-2">معلومات التواصل</h2>
              <p className="text-gray-500 mb-8">يمكنكم التواصل معنا عبر أي من الطرق التالية</p>

              <div className="space-y-6 mb-12">
                <a
                  href="tel:+201117819505"
                  onClick={() => trackPhoneClick('01117819505', 'contact_page')}
                  className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={22} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy">الهاتف</h4>
                    <p className="text-gray-500 text-sm" dir="ltr">01117819505</p>
                    <p className="text-gray-500 text-sm" dir="ltr">01035678474</p>
                  </div>
                </a>
                <a
                  href="mailto:legalsarh@gmail.com"
                  onClick={() => trackEmailClick('legalsarh@gmail.com', 'contact_page')}
                  className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={22} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy">البريد الإلكتروني</h4>
                    <p className="text-gray-500 text-sm">legalsarh@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={22} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy">ساعات العمل</h4>
                    <p className="text-gray-500 text-sm">الأحد - الخميس: 8:00 ص - 6:00 م</p>
                    <p className="text-gray-500 text-sm">السبت: 10:00 ص - 2:00 م</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/201117819505"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('contact_page')}
                  className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle size={22} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy">واتساب</h4>
                    <p className="text-gray-500 text-sm" dir="ltr">01117819505</p>
                    <p className="text-gray-400 text-xs">متاح 24/7 للاستفسارات</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches / Map */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">فروعنا</span>
            <h2 className="text-3xl font-black text-navy mb-4">زورونا في <span className="text-gold">أقرب فرع</span></h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {branches.map((branch, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 card-hover gold-border-hover border border-gray-100">
                <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center mb-5">
                  <MapPin size={24} className="text-gold" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{branch.city}</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-500">{branch.address}</p>
                  <a
                    href={`tel:${branch.phone.replace(/\s/g, '')}`}
                    onClick={() => trackPhoneClick(branch.phone, `branch_${branch.city}`)}
                    className="text-gray-500 hover:text-gold transition-colors block"
                    dir="ltr"
                  >
                    {branch.phone}
                  </a>
                  <a
                    href={`tel:${branch.phone2.replace(/\s/g, '')}`}
                    onClick={() => trackPhoneClick(branch.phone2, `branch_${branch.city}`)}
                    className="text-gray-500 hover:text-gold transition-colors block"
                    dir="ltr"
                  >
                    {branch.phone2}
                  </a>
                  <p className="text-gray-400">{branch.hours}</p>
                </div>
                <a
                  href="#"
                  onClick={() => trackCTAClick('عرض على الخريطة', `branch_${branch.city}`, '#')}
                  className="inline-flex items-center gap-2 text-gold font-bold mt-4 text-sm"
                >
                  <MapPin size={14} />
                  <span>عرض على الخريطة</span>
                </a>
              </div>
            ))}
          </div>

          {/* Interactive Map */}
          <div className="mt-12 rounded-3xl overflow-hidden border border-gray-200">
            <div className="map-placeholder h-96 relative">
              {/* Map grid background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-12 md:gap-20">
                  {[
                    { city: 'بني سويف', query: 'Beni+Suef+Corniche+Al+Safwa+Tower' },
                    { city: 'الجيزة', query: 'Smart+Village+Giza+North+Side+Building' },
                  ].map((b, i) => (
                    <a
                      key={i}
                      href={`https://maps.google.com/?q=${b.query}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center group"
                    >
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:bg-gold transition-all duration-300 mb-3">
                        <MapPin size={28} className="text-gold group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-navy font-bold text-lg group-hover:text-gold transition-colors">{b.city}</span>
                      <span className="text-gray-400 text-xs mt-1 group-hover:text-gold/60 transition-colors">عرض على الخريطة</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
