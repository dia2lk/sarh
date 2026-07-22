import { Link } from 'react-router-dom';
import {
  Briefcase, Landmark, Building2, Heart, Factory, GraduationCap,
  Plane, Zap, ShoppingBag, Cpu, Wheat, ShieldCheck, ArrowLeft
} from 'lucide-react';

const sectors = [
  {
    icon: Briefcase,
    title: 'القطاع المصرفي والمالي',
    desc: 'نقدم استشارات قانونية متخصصة للبنوك والمؤسسات المالية، تشمل الامتثال التنظيمي وصياغة العقود المالية وحل النزاعات المصرفية.',
    features: ['الامتثال البنكي', 'عقود التمويل', 'الخدمات المصرفية الاستثمارية', 'قضايا غسيل الأموال'],
  },
  {
    icon: Landmark,
    title: 'القطاع الحكومي',
    desc: 'نعمل مع الجهات الحكومية في تقديم الاستشارات القانونية ودعم المشاريع التنموية والبنية التحتية.',
    features: ['مشاريع البنية التحتية', 'عقود الشراء الحكومي', 'الامتثال التنظيمي', 'الشراكات بين القطاعين'],
  },
  {
    icon: Building2,
    title: 'القطاع العقاري',
    desc: 'نقدم خدمات قانونية شاملة للقطاع العقاري تشمل عقود البيع والإيجار والتطوير العقاري وحل النزاعات.',
    features: ['عقود التطوير العقاري', 'التمويل العقاري', 'نزاعات الملكية', 'تسجيل العقارات'],
  },
  {
    icon: Heart,
    title: 'القطاع الصحي',
    desc: 'نستشارات قانونية متخصصة للمستشفيات والمراكز الصحية وشركات الأدوية والتأمين الصحي.',
    features: ['تراخيص المنشآت الصحية', 'قضايا المسؤولية الطبية', 'عقود التأمين الصحي', 'حماية البيانات الصحية'],
  },
  {
    icon: Factory,
    title: 'القطاع الصناعي',
    desc: 'ندعم الشركات الصناعية في جميع جوانبها القانونية من التراخيص إلى حماية الملكية الفكرية.',
    features: ['التراخيص الصناعية', 'حماية الملكية الفكرية', 'عقود التوريد', 'الامتثال البيئي'],
  },
  {
    icon: GraduationCap,
    title: 'القطاع التعليمي',
    desc: 'نقدم خدمات قانونية للمؤسسات التعليمية والجامعات ومراكز التدريب.',
    features: ['تراخيص المؤسسات التعليمية', 'حقوق الملكية الفكرية الأكاديمية', 'عقود الاعتماد الأكاديمي', 'نزاعات الطلاب'],
  },
  {
    icon: Plane,
    title: 'القطاع السياحي والضيافة',
    desc: 'نقدم استشارات قانونية متخصصة للفنادق والمنشآت السياحية وشركات السفر.',
    features: ['تراخيص المنشآت السياحية', 'عقود الإدارة الفندقية', 'تأشيرات وعمالة', 'قضايا التأمين السياحي'],
  },
  {
    icon: Zap,
    title: 'قطاع الطاقة',
    desc: 'نغطي جميع الجوانب القانونية لقطاع الطاقة بما في ذلك الطاقة المتجددة والنفط والغاز.',
    features: ['عقود النفط والغاز', 'مشاريع الطاقة المتجددة', 'الامتثال البيئي', 'عقود BOO/BOOT'],
  },
  {
    icon: ShoppingBag,
    title: 'قطاع التجزئة',
    desc: 'نساعد العلامات التجارية وشركات التجزئة في جميع متطلباتها القانونية.',
    features: ['تراخيص الامتياز التجاري', 'حماية العلامات التجارية', 'عقود التوزيع', 'قانون حماية المستهلك'],
  },
  {
    icon: Cpu,
    title: 'قطاع التقنية والاتصالات',
    desc: 'نقدم استشارات قانونية لشركات التقنية والاتصالات في مجالات حماية البيانات والملكية الفكرية.',
    features: ['حماية البيانات والخصوصية', 'عقود التراخيص التقنية', 'الأمن السيبراني', 'التجارة الإلكترونية'],
  },
  {
    icon: Wheat,
    title: 'القطاع الزراعي',
    desc: 'ندعم المشاريع الزراعية والغذائية في جميع المتطلبات القانونية والتنظيمية.',
    features: ['تراخيص المشاريع الزراعية', 'الأمن الغذائي', 'عقود التوريد الغذائي', 'الامتثال الصحي'],
  },
  {
    icon: ShieldCheck,
    title: 'قطاع التأمين',
    desc: 'نقدم خدمات قانونية متخصصة لشركات التأمين وإدارة المخاطر.',
    features: ['عقود إعادة التأمين', 'نزاعات المطالبات', 'الامتثال التنظيمي', 'تأمين الممتلكات'],
  },
];

export default function Sectors() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">القطاعات</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            القطاعات التي <span className="text-gold">نخدمها</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            نقدم خبرتنا القانونية لمجموعة واسعة من القطاعات الحيوية في مصر والمنطقة
          </p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-8 card-hover gold-border-hover group">
                <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-500">
                  <sector.icon size={26} className="text-gold group-hover:text-navy-dark transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">{sector.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{sector.desc}</p>
                <ul className="space-y-2">
                  {sector.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-black text-white mb-4">لم تجد قطاعك؟</h3>
          <p className="text-gray-300 mb-8 text-lg">نتعامل مع مجموعة واسعة من القطاعات. تواصل معنا لمعرفة كيف يمكننا مساعدتك</p>
          <Link to="/book-consultation" className="inline-flex items-center gap-2 bg-gradient-to-l from-gold to-gold-light text-navy-dark px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300">
            <span>احجز استشارة</span>
            <ArrowLeft size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
