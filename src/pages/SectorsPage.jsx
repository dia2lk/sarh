import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SchemaLD from '../components/SchemaLD'
import { Landmark, Building2, Home, Stethoscope, Factory, GraduationCap, Plane, Zap, ArrowLeft } from 'lucide-react'

const sectors = [
  {
    Icon: Landmark,
    label: 'القطاع المصرفي والمالي',
    desc: 'خدمات قانونية ومالية متخصصة للبنوك وشركات التمويل والاستثمار، تشمل الامتثال التنظيمي وصياغة العقود المالية المعقدة.',
    services: ['عقود التمويل والإقراض', 'الامتثال للبنك المركزي', 'عقود الضمانات والرهن', 'قضايا الديون والتعثر'],
  },
  {
    Icon: Building2,
    label: 'القطاع الحكومي',
    desc: 'دعم قانوني ومحاسبي للجهات الحكومية وشركات القطاع العام في إدارة العقود والمناقصات والالتزامات القانونية.',
    services: ['عقود المشتريات الحكومية', 'المناقصات والمزايدات', 'حوكمة الشركات الحكومية', 'الطعون والتظلمات الإدارية'],
  },
  {
    Icon: Home,
    label: 'القطاع العقاري',
    desc: 'تغطية قانونية شاملة لمطوري العقارات والمستثمرين والوسطاء العقاريين من التأسيس حتى التسوية.',
    services: ['عقود البيع والإيجار', 'تراخيص التطوير العقاري', 'نزاعات الملكية', 'عقود المقاولات والإنشاء'],
  },
  {
    Icon: Stethoscope,
    label: 'القطاع الصحي',
    desc: 'خدمات قانونية متخصصة للمستشفيات والعيادات والصيدليات تشمل التراخيص والامتثال والمسؤولية الطبية.',
    services: ['تراخيص المنشآت الصحية', 'عقود الأطباء والكوادر', 'قضايا الإهمال الطبي', 'الامتثال للجهات الرقابية'],
  },
  {
    Icon: Factory,
    label: 'القطاع الصناعي',
    desc: 'دعم قانوني ومحاسبي للمصانع والشركات الصناعية في إدارة العقود والتراخيص والامتثال البيئي.',
    services: ['تراخيص المصانع والمنشآت', 'عقود التوريد والتصنيع', 'قضايا حماية الملكية الفكرية', 'الامتثال البيئي'],
  },
  {
    Icon: GraduationCap,
    label: 'القطاع التعليمي',
    desc: 'خدمات قانونية للمدارس والجامعات ومراكز التدريب تشمل التأسيس والتراخيص وعقود أعضاء هيئة التدريس.',
    services: ['تأسيس المنشآت التعليمية', 'عقود الكوادر التعليمية', 'التراخيص والاعتمادات', 'حوكمة المؤسسات التعليمية'],
  },
  {
    Icon: Plane,
    label: 'القطاع السياحي',
    desc: 'دعم قانوني للفنادق ووكالات السفر وشركات السياحة في إدارة التراخيص والعقود والنزاعات.',
    services: ['تراخيص الفنادق والمنشآت', 'عقود التشغيل والإدارة', 'النزاعات السياحية', 'الامتثال لاشتراطات الهيئة'],
  },
  {
    Icon: Zap,
    label: 'قطاع الطاقة المتجددة',
    desc: 'خدمات قانونية متخصصة لمشاريع الطاقة الشمسية والرياح والطاقة المتجددة في مصر.',
    services: ['عقود إنشاء محطات الطاقة', 'اتفاقيات شراء الطاقة PPA', 'تراخيص المشاريع', 'الشراكات الدولية في الطاقة'],
  },
]

export default function SectorsPage() {
  return (
    <>
      <SEO
        title="القطاعات — مصرفي، عقاري، صحي، صناعي وأكثر"
        description="صرح تخدم قطاعات متعددة: المصرفي، الحكومي، العقاري، الصحي، الصناعي، التعليمي، السياحي، والطاقة المتجددة."
        canonical="/sectors"
      />
      <SchemaLD page="default" />

      <main>
        <section className="bg-navy relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              القطاعات التي <span className="text-gold">نخدمها</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              خبرة واسعة ومتخصصة في 8 قطاعات اقتصادية رئيسية تضم مئات العملاء
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link>
              <span className="text-gold">←</span>
              <span className="text-gold font-semibold">القطاعات</span>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {sectors.map(({ Icon, label, desc, services }) => (
                <div key={label} className="bg-white rounded-2xl p-8 border border-gray-100 card-hover gold-border-hover group">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center shrink-0 group-hover:from-gold group-hover:to-gold-light transition-all duration-500">
                      <Icon className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-navy mb-2 group-hover:text-gold transition-colors">{label}</h2>
                      <p className="text-gray-text text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map(s => (
                      <div key={s} className="flex items-center gap-2 text-xs text-gray-text rounded-lg p-2"
                        style={{background:'rgba(201,162,39,0.05)', border:'1px solid rgba(201,162,39,0.15)'}}>
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-navy relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="relative max-w-xl mx-auto px-6">
            <h3 className="text-2xl font-black text-white mb-4">قطاعك غير موجود في القائمة؟</h3>
            <p className="text-gray-400 mb-8">نتعامل مع جميع القطاعات. تواصل معنا للحصول على حل مخصص لنشاطك</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              تحدث مع خبير الآن
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
