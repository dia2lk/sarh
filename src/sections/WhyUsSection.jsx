import { Link } from 'react-router-dom'
import { Handshake, Brain, Target, Trophy, CheckCircle, ArrowLeft } from 'lucide-react'

const reasons = [
  { Icon: Handshake, title: 'الالتزام بالمعايير المهنية', desc: 'نلتزم بأعلى معايير المهنية والنزاهة في كل ما نقدمه' },
  { Icon: Brain,     title: 'ذكاء تحليلي استثنائي',      desc: 'نستخدم التحليل المنطقي والرياضي لإثبات الحقائق كما في قضية التزوير بالكويت' },
  { Icon: Target,    title: 'حلول مخصصة لكل قضية',      desc: 'نصمم استراتيجية دفاعية فريدة لكل قضية بناءً على تحليل معمق' },
  { Icon: Trophy,    title: 'سجل براءات مثبت',           desc: 'حققنا براءات في قضايا تزوير ورشوة واتجار بالبشر عابرة للحدود' },
]

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Right: text */}
          <div>
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">لماذا صرح؟</span>
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-6">
              شريكك القانوني <span className="text-gold">الاستراتيجي</span>
            </h2>
            <p className="text-gray-text text-lg leading-relaxed mb-8">
              في صرح، نؤمن بأن الحماية القانونية الحقيقية تبدأ بالفهم العميق لاحتياجات عملائنا. نجمع بين الخبرة القانونية المتخصصة لنقدم حلولاً استراتيجية تحمي أعمالكم وتدعم نموكم.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {reasons.map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-1"
                    style={{background:'rgba(201,162,39,0.1)'}}>
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm mb-1">{title}</h4>
                    <p className="text-gray-text text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-navy font-bold hover:text-gold transition-colors border-b-2 border-gold pb-0.5"
            >
              تعرف علينا أكثر
            </Link>
          </div>

          {/* Left: CTA card */}
          <div className="rounded-3xl p-8 text-white" style={{background:'linear-gradient(135deg, #0f172a 0%, #1e2d4a 100%)'}}>
            <h3 className="text-2xl font-black mb-2">ابدأ بحماية أعمالك اليوم</h3>
            <p className="text-gold font-semibold mb-8">استشارة أولية مجانية</p>

            <ul className="space-y-4 mb-10">
              {[
                'فريق متخصص من المحامين الخبراء',
                'متابعة مستمرة لجميع القضايا',
                'حلول مبتكرة ومناسبة',
                'أسعار تنافسية وشفافة',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-200 text-sm">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/book-consultation"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:opacity-90"
              style={{background:'linear-gradient(135deg, #c9a227, #e2b93b)'}}
            >
              <ArrowLeft className="w-5 h-5" />
              احجز استشارة الآن — ابدأ بحماية أعمالك اليوم
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
