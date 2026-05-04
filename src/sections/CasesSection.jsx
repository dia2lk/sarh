import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Scale, Gavel, Users, ArrowLeft, CheckCircle } from 'lucide-react'

const categories = [
  { id: 'forgery',     label: 'قضية تزوير',                Icon: Scale },
  { id: 'bribery',     label: 'جناية رشوة',                Icon: Gavel },
  { id: 'trafficking', label: 'الاتجار بالبشر والهجرة عبر الحدود', Icon: Users },
]

const caseData = {
  forgery: {
    title:    'قضية تزوير — دولة الكويت',
    badge:    'ذكاء تحليلي',
    subtitle: 'إثبات استحالة واقعة التزوير بالحسابات الرياضية',
    desc:     'تم توجيه تهمة تزوير لموكلنا بناءً على مستندات تُظهر قطع مسافة 112 كم في 18 دقيقة فقط. استخدمنا الحسابات الرياضية لإثبات استحالة الواقعة.',
    facts: [
      { label: 'المسافة',                       value: '112 كم' },
      { label: 'السرعة القصوى',                  value: '100 كم/ساعة' },
      { label: 'الزمن الأدنى الفيزيائي',         value: '65 دقيقة' },
      { label: 'الزمن المدوّن في المستندات',      value: '18 دقيقة' },
    ],
    strategy: 'استخدام الحسابات الرياضية والفيزيائية لإثبات استحالة الواقعة زمانياً ومكانياً، مع تقديم أدلة تقنية من كاميرات المراقبة.',
    result:   'براءة كاملة',
    lawyer:   'د. إسلام إبراهيم',
  },
  bribery: {
    title:    'جناية رشوة — القاهرة',
    badge:    'دفاع استراتيجي',
    subtitle: 'إثبات انعدام ركن العلم في جريمة الرشوة',
    desc:     'دافعنا عن موكل وُجّهت إليه تهمة رشوة موظف عام. أثبتنا انتفاء العلم بصفة المرتشي وانعدام القصد الجنائي.',
    facts: [
      { label: 'التهمة الموجهة',   value: 'رشوة موظف عام' },
      { label: 'المبلغ المزعوم',   value: 'غير محدد' },
      { label: 'مدة التقاضي',      value: '8 أشهر' },
      { label: 'درجة التقاضي',     value: 'محكمة الجنايات' },
    ],
    strategy: 'إثبات حسن النية وانعدام القصد الجنائي، مع تقديم شهادات الشهود وسجلات الاتصالات لدعم الدفاع.',
    result:   'براءة تامة',
    lawyer:   'د. إسلام إبراهيم',
  },
  trafficking: {
    title:    'قضية اتجار بالبشر عابرة للحدود',
    badge:    'تعاون دولي',
    subtitle: 'إدارة قضية متعددة الدول بالتنسيق مع محامين دوليين',
    desc:     'تولّينا الدفاع في قضية اتجار بالبشر عابرة للحدود، وتطلّبت التنسيق مع جهات قانونية في ثلاث دول للوصول إلى البراءة.',
    facts: [
      { label: 'عدد الدول المعنية', value: '3 دول' },
      { label: 'مدة القضية',        value: '14 شهراً' },
      { label: 'عدد المتهمين',      value: 'متعدد' },
      { label: 'الجهة القضائية',    value: 'محاكم دولية' },
    ],
    strategy: 'التنسيق مع فريق قانوني دولي، ونقض الأدلة المقدمة بالتسلسل مع إثبات عدم توافر أركان الجريمة.',
    result:   'براءة للموكل',
    lawyer:   'د. إسلام إبراهيم',
  },
}

export default function CasesSection() {
  const [active, setActive] = useState('forgery')
  const c = caseData[active]

  return (
    <section className="py-24 bg-navy relative overflow-hidden" aria-labelledby="cases-heading">
      <div className="absolute inset-0 bg-pattern opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px" style={{background:'linear-gradient(to left, transparent, rgba(201,162,39,0.3), transparent)'}} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">نتائج حقيقية</span>
          <h2 id="cases-heading" className="text-3xl md:text-4xl font-black text-white mb-4">
            قصص نجاح <span className="text-gold">من واقع القضايا</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            لا نكتفي بالقول — نقدّم نتائج مثبتة من واقع القضايا المعقدة التي تولّيناها
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center">
          {categories.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2
                ${active === id
                  ? 'bg-gold text-white shadow-lg'
                  : 'text-gray-300 border border-white/10 hover:border-gold/30 hover:text-gold'
                }`}
              style={active === id ? {boxShadow:'0 4px 16px rgba(201,162,39,0.3)'} : {}}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Case card */}
        <div className="rounded-3xl p-8 md:p-10 border" style={{background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.1)'}}>
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-6"
                style={{background:'rgba(201,162,39,0.1)', borderColor:'rgba(201,162,39,0.3)'}}>
                <span className="text-gold text-xs font-bold">{c.badge}</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">{c.title}</h3>
              <p className="text-gold font-semibold mb-4">{c.subtitle}</p>
              <p className="text-gray-300 leading-relaxed mb-8">{c.desc}</p>

              {/* Facts grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {c.facts.map(f => (
                  <div key={f.label} className="rounded-xl p-4 border" style={{background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.08)'}}>
                    <div className="text-gray-400 text-xs mb-1">{f.label}</div>
                    <div className="text-white font-bold text-sm">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Strategy */}
              <div className="rounded-2xl p-6 mb-6 border" style={{background:'rgba(201,162,39,0.05)', borderColor:'rgba(201,162,39,0.2)'}}>
                <h4 className="text-gold font-bold mb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4" /> الاستراتيجية الدفاعية
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">{c.strategy}</p>
              </div>

              {/* Result */}
              <div className="rounded-2xl p-6 border" style={{background:'rgba(34,197,94,0.05)', borderColor:'rgba(34,197,94,0.2)'}}>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h4 className="text-white font-bold">النتيجة</h4>
                </div>
                <div className="text-2xl font-black text-green-400 mb-2">{c.result}</div>
                <div className="text-gray-400 text-sm">المحامي: <span className="text-white font-semibold">{c.lawyer}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            عرض جميع القضايا
          </Link>
        </div>
      </div>
    </section>
  )
}
