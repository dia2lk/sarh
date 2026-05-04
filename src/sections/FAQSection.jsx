import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'كيف أبدأ التعامل مع صرح؟',
    a: 'من خلال حجز استشارة أولية لتقييم وضعك القانوني وتحديد الحل المناسب. يمكنك الحجز مباشرة عبر نموذج الحجز على الموقع أو التواصل عبر واتساب أو الاتصال المباشر.',
  },
  {
    q: 'هل بياناتي ومستنداتي آمنة؟',
    a: 'نلتزم بأعلى معايير حماية البيانات والتشفير (End-to-End)، مع تطبيق اتفاقيات سرية صارمة (NDA). نستخدم أحدث تقنيات حماية البيانات ونلتزم بأعلى معايير الأمان المتعارف عليها دولياً.',
  },
  {
    q: 'كيف يتم تحديد التكلفة؟',
    a: 'تُحدد بناءً على نطاق وتعقيد الخدمة، مع شفافية كاملة قبل التنفيذ. نعتمد مبدأ الشفافية؛ تُوضح كافة التكاليف قبل البدء، مع إمكانية الاتفاق على خطط دفع مرنة.',
  },
  {
    q: 'هل تقدمون دعم مستمر للشركات؟',
    a: 'نعم، نوفر خدمات مستشار قانوني دائم لإدارة كافة الجوانب القانونية. نقدم باقات اشتراك شهرية تشمل استشارات قانونية غير محدودة ومراجعة العقود.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-24 bg-white" aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">إجابات فورية</span>
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-black text-navy mb-4">
            الأسئلة <span className="text-gold">الأكثر شيوعاً</span>
          </h2>
          <div className="section-divider mb-6" />
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 ${open === i ? 'border-gold/30 shadow-lg' : 'border-gray-100'}`}
              style={open === i ? {background:'rgba(201,162,39,0.05)'} : {background:'white'}}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between p-6 text-right"
                aria-expanded={open === i}
              >
                <span
                  className={`font-bold text-lg transition-colors ${open === i ? 'text-gold' : 'text-navy'}`}
                  itemProp="name"
                >
                  {f.q}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-4 transition-all ${open === i ? 'bg-gold text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {open === i && (
                <div
                  className="px-6 pb-6"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p className="text-gray-text leading-relaxed" itemProp="text">{f.a}</p>
                  <span className="inline-block mt-3 text-xs font-semibold text-gold border border-gold/20 px-3 py-1 rounded-full"
                    style={{background:'rgba(201,162,39,0.05)'}}>
                    سؤال شائع
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
