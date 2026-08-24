import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Shield } from 'lucide-react';
import {
  trackLeadSubmitted,
  trackLeadSuccess,
  trackFormStepChange,
  trackFormFieldFocus,
  trackFormStarted,
  prepareSupabasePayload,
  submitToSupabase,
} from '../lib/analytics';

const consultationTypes = [
  { id: 'corporate', label: 'تأسيس الشركات وحوكمة الأعمال', desc: 'إدارة إجراءات التأسيس واختيار الهيكل القانوني الأمثل' },
  { id: 'contracts', label: 'صياغة ومراجعة العقود الاستراتيجية', desc: 'تصميم عقود الشراكة والوكالات التجارية وعقود العمل' },
  { id: 'tax', label: 'الاستشارات الضريبية والمحاسبية', desc: 'الحلول الضريبية المتكاملة والفاتورة الإلكترونية' },
  { id: 'criminal', label: 'التمثيل القانوني في القضايا المعقدة', desc: 'دفاع قانوني متخصص في القضايا الاقتصادية والتجارية' },
  { id: 'consultation', label: 'استشارة قانونية عامة', desc: 'استشارة في المسائل القانونية العامة' },
  { id: 'other', label: 'أخرى', desc: 'موضوع غير محدد' },
];

const benefits = [
  'استشارة أولية مع نخبة من الدكاترة الأكاديميين',
  'تقييم شامل للوضع القانوني وتحديد مسار العمل',
  'توصيات واضحة ومحددة بناءً على أحدث التشريعات',
  'عرض سعر شفاف قبل البدء',
  'سرية تامة (تشفير End-to-End + NDA)',
  'فريق متخصص حسب نوع الاستشارة',
];

export default function BookConsultation() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formStarted = useRef(false);
  const fieldFocused = useRef<Set<string>>(new Set());

  const handleFormStart = (fieldName: string) => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStarted('booking_consultation', fieldName);
    }
  };

  const handleFieldFocus = (fieldName: string, fieldType: string) => {
    if (!fieldFocused.current.has(fieldName)) {
      fieldFocused.current.add(fieldName);
      handleFormStart(fieldName);
      trackFormFieldFocus('booking_consultation', fieldName, fieldType, step);
    }
  };

  const handleStepChange = (fromStep: number, toStep: number) => {
    setStep(toStep);
    trackFormStepChange('booking_consultation', fromStep, toStep, {
      consultation_type: formData.type,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.type || !formData.name.trim() || !formData.phone.trim() || !formData.description.trim()) {
      setSubmitError('يرجى استكمال الحقول المطلوبة (الاسم، رقم الجوال، وصف الطلب).');
      return;
    }
    if (!/^01[0-9]{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      setSubmitError('يرجى إدخال رقم جوال مصري صحيح (01XXXXXXXXX).');
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    trackLeadSubmitted({
      form_name: 'booking_consultation',
      service_type: formData.type,
      consultation_type: formData.type,
      lead_source: undefined,
    });

    const payload = prepareSupabasePayload({
      form_name: 'booking_consultation',
      service_type: formData.type,
      consultation_type: consultationTypes.find(t => t.id === formData.type)?.label || formData.type,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      description: formData.description,
    });

    await submitToSupabase(payload);
    setStep(3);
    setIsSubmitting(false);

    setTimeout(() => {
      trackLeadSuccess({
        form_name: 'booking_consultation',
        service_type: formData.type,
        consultation_type: consultationTypes.find(t => t.id === formData.type)?.label || formData.type,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
      });
    }, 500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">حجز استشارة</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            احجز <span className="text-gold">استشارتك المهنية</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            تواصل مع نخبة من الدكاترة الأكاديميين للحصول على حماية قانونية ومحاسبية متكاملة لأعمالكم
          </p>
        </div>
      </section>

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'نوع الاستشارة' },
              { num: 2, label: 'البيانات الشخصية' },
              { num: 3, label: 'التأكيد' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s.num ? 'bg-gold text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s.num ? <CheckCircle2 size={20} /> : s.num}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step >= s.num ? 'text-navy' : 'text-gray-400'}`}>
                  {s.label}
                </span>
                {i < 2 && <div className={`flex-1 h-0.5 mx-4 ${step > s.num ? 'bg-gold' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {step === 3 ? (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-black text-green-800 mb-4">تم الحجز بنجاح!</h2>
                  <p className="text-green-700 mb-6 text-lg">
                    شكراً لكم! سيتواصل فريقنا الأكاديمي معكم خلال 24 ساعة لتأكيد الموعد.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link to="/" className="bg-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-navy-light transition-all">العودة للرئيسية</Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
                  {step === 1 && (
                    <div>
                      <h2 className="text-2xl font-black text-navy mb-8 text-right">اختر نوع الاستشارة</h2>
                      <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {consultationTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              handleChange('type', type.id);
                              handleFieldFocus('consultation_type', 'button');
                            }}
                            className={`p-5 rounded-xl border-2 text-right transition-all ${
                              formData.type === type.id ? 'border-gold bg-gold/5' : 'border-gray-100 hover:border-gray-200'
                            }`}
                          >
                            <h4 className={`font-bold mb-1 ${formData.type === type.id ? 'text-gold' : 'text-navy'}`}>{type.label}</h4>
                            <p className="text-gray-400 text-sm">{type.desc}</p>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => formData.type && handleStepChange(1, 2)}
                        disabled={!formData.type}
                        className="w-full bg-gold text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50"
                      >
                        التالي
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2 className="text-2xl font-black text-navy mb-8 text-right">البيانات الشخصية</h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-navy mb-2 text-right">الاسم الكامل *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            onFocus={() => handleFieldFocus('name', 'text')}
                            className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-right"
                            placeholder="أدخل اسمك الكامل"
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-navy mb-2 text-right">رقم الجوال *</label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              onFocus={() => handleFieldFocus('phone', 'tel')}
                              className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-left"
                              placeholder="01XXXXXXXXX"
                              dir="ltr"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-navy mb-2 text-right">البريد الإلكتروني</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              onFocus={() => handleFieldFocus('email', 'email')}
                              className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-left"
                              placeholder="example@email.com"
                              dir="ltr"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="booking-description" className="block text-sm font-bold text-navy mb-2 text-right">وصف موجز لطلبك *</label>
                          <textarea
                            id="booking-description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            onFocus={() => handleFieldFocus('description', 'textarea')}
                            className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-right resize-none"
                            placeholder="اشرح باختصار موضوع الاستشارة حتى نجهّز الفريق المناسب"
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-navy mb-2 text-right">التاريخ المفضل</label>
                            <input
                              type="date"
                              value={formData.preferredDate}
                              onChange={(e) => handleChange('preferredDate', e.target.value)}
                              onFocus={() => handleFieldFocus('preferredDate', 'date')}
                              className="w-full px-5 py-3.5 border border-gray-200 rounded-xl"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-navy mb-2 text-right">الوقت المفضل</label>
                            <select
                              value={formData.preferredTime}
                              onChange={(e) => handleChange('preferredTime', e.target.value)}
                              onFocus={() => handleFieldFocus('preferredTime', 'select')}
                              className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-right"
                            >
                              <option value="">اختر الوقت</option>
                              <option value="morning">صباحاً (8-12)</option>
                              <option value="afternoon">ظهراً (12-4)</option>
                              <option value="evening">مساءً (4-6)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      {submitError && (
                        <p role="alert" className="mt-6 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl px-5 py-3 text-right">
                          {submitError}
                        </p>
                      )}
                      <div className="flex gap-4 mt-8">
                        <button type="button" onClick={() => handleStepChange(2, 1)} className="px-8 py-4 rounded-xl font-bold text-navy bg-gray-100">السابق</button>
                        <button type="submit" disabled={isSubmitting} className="flex-1 bg-gold text-white py-4 rounded-xl font-bold text-lg disabled:opacity-60">
                          {isSubmitting ? 'جارٍ الإرسال...' : 'تأكيد الحجز'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-navy rounded-3xl p-8 relative overflow-hidden">
                <div className="relative">
                  <Shield size={32} className="text-gold mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">لماذا تحجز مع صرح؟</h3>
                  <div className="space-y-4">
                    {benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm text-right">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gold/5 rounded-3xl p-8 border border-gold/20">
                <h4 className="font-bold text-navy mb-3 text-right">مساعدة فورية</h4>
                <a href="tel:01117819505" className="block bg-navy text-white text-center py-3 rounded-xl font-bold mb-3">اتصل بنا</a>
                <a href="https://wa.me/201117819505" target="_blank" rel="noopener noreferrer" className="block bg-[#25D366] text-white text-center py-3 rounded-xl font-bold">واتساب</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
