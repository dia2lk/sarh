import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SchemaLD from '../components/SchemaLD'
import { Building2, FileText, Calculator, Scale, ShieldCheck, TrendingUp, Landmark, Users2, ArrowLeft, CheckCircle } from 'lucide-react'

const legalServices = [
  {
    Icon: Building2,
    title: 'تأسيس الشركات وحوكمة الأعمال',
    desc: 'ندير جميع مراحل تأسيس الكيانات القانونية ونساعدك على اختيار الهيكل الأمثل — شركة مساهمة، ذات مسؤولية محدودة، أو تضامنية — مع بناء إطار حوكمة يضمن الاستدامة والامتثال.',
    features: ['اختيار الهيكل القانوني الأمثل', 'صياغة النظام الأساسي والعقود التأسيسية', 'إجراءات التسجيل الرسمي', 'وضع هياكل الحوكمة والإدارة'],
  },
  {
    Icon: FileText,
    title: 'صياغة ومراجعة العقود الاستراتيجية',
    desc: 'نصمم عقوداً تحمي مصالحك وتمنع النزاعات، مع تغطية شاملة للثغرات القانونية والتجارية في كل أنواع الاتفاقيات.',
    features: ['عقود الشراكة والمشاريع المشتركة', 'عقود التوريد والخدمات', 'اتفاقيات السرية وعدم المنافسة', 'العقود الدولية والعابرة للحدود'],
  },
  {
    Icon: Scale,
    title: 'التمثيل القانوني في القضايا المعقدة',
    desc: 'دفاع قانوني متخصص في القضايا الاقتصادية والتجارية والجنائية، مع إدارة استراتيجية للنزاعات عالية الحساسية.',
    features: ['القضايا الاقتصادية والتجارية', 'قضايا الشركات والمساهمين', 'النزاعات التعاقدية', 'التمثيل أمام المحاكم والتحكيم'],
  },
  {
    Icon: ShieldCheck,
    title: 'الامتثال والحوكمة المؤسسية',
    desc: 'نساعد الشركات على الامتثال الكامل للأنظمة واللوائح المحلية والدولية وتطبيق أفضل معايير الحوكمة.',
    features: ['مراجعة مخاطر الامتثال', 'السياسات والإجراءات الداخلية', 'حوكمة الشركات ومجالس الإدارة', 'برامج الامتثال المستمر'],
  },
  {
    Icon: Users2,
    title: 'قضايا العمل والتوظيف',
    desc: 'تمثيل أصحاب العمل والموظفين في القضايا العمالية وصياغة عقود العمل والأنظمة الداخلية المحكمة.',
    features: ['عقود العمل وأنظمة الموارد البشرية', 'فصل العمالة والنزاعات العمالية', 'التمثيل أمام جهات العمل', 'اللوائح الداخلية للمنشآت'],
  },
  {
    Icon: Landmark,
    title: 'النزاعات العقارية والعقود',
    desc: 'حل النزاعات المتعلقة بالعقارات والأراضي وعقود الإيجار والبيع والشراء بكل أنواعها.',
    features: ['عقود البيع والشراء والإيجار', 'نزاعات الملكية والتوريث', 'عقارات الشركات والاستثمار', 'عقود الإنشاء والمقاولات'],
  },
]

const accountingServices = [
  {
    Icon: Calculator,
    title: 'الاستشارات الضريبية والمحاسبية',
    desc: 'حلول متكاملة لضبط الالتزامات الضريبية وتحسين الكفاءة المالية وضمان الامتثال الكامل للتشريعات المصرية.',
    features: ['إعداد الإقرارات الضريبية', 'ضريبة القيمة المضافة والمبيعات', 'التخطيط الضريبي الاستراتيجي', 'التسوية مع هيئة الضرائب'],
  },
  {
    Icon: TrendingUp,
    title: 'التدقيق المالي والمراجعة',
    desc: 'تدقيق ومراجعة دقيقة للحسابات والسجلات المالية للتحقق من دقتها وامتثالها للمعايير المحاسبية الدولية.',
    features: ['تدقيق القوائم المالية', 'مراجعة الإجراءات الداخلية', 'تقرير المدقق المستقل', 'الامتثال للمعايير الدولية IFRS'],
  },
  {
    Icon: ShieldCheck,
    title: 'إدارة المخاطر المالية',
    desc: 'تقييم وإدارة المخاطر المالية للشركات ووضع استراتيجيات فعّالة للحماية من المخاطر المحتملة.',
    features: ['تقييم المخاطر المالية', 'استراتيجيات التحوط', 'تقارير إدارة المخاطر', 'برامج الامتثال المالي'],
  },
]

function ServiceCard({ Icon, title, desc, features }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 card-hover gold-border-hover group">
      <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center mb-5 group-hover:from-gold group-hover:to-gold-light transition-all duration-500">
        <Icon className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-500" />
      </div>
      <h3 className="text-xl font-black text-navy mb-3 group-hover:text-gold transition-colors">{title}</h3>
      <p className="text-gray-text text-sm leading-relaxed mb-5">{desc}</p>
      <ul className="space-y-2">
        {features.map(f => (
          <li key={f} className="flex items-center gap-2 text-sm text-gray-text">
            <CheckCircle className="w-4 h-4 text-gold shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="خدماتنا — تأسيس شركات، عقود، محاسبة، تمثيل قانوني"
        description="خدمات قانونية ومحاسبية متكاملة: تأسيس الشركات، صياغة العقود، الاستشارات الضريبية، التمثيل في القضايا المعقدة."
        canonical="/services"
      />
      <SchemaLD page="default" />

      <main>
        {/* Hero */}
        <section className="bg-navy relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              خدماتنا القانونية و<span className="text-gold">المحاسبية</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              منظومة متكاملة من الخدمات القانونية والمحاسبية المتخصصة لدعم شركتك في كل مرحلة من مراحل نموها.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link>
              <span className="text-gold">←</span>
              <span className="text-gold font-semibold">خدماتنا</span>
            </div>
          </div>
        </section>

        {/* Legal Services */}
        <section className="py-24 bg-gray-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-gold font-bold text-sm tracking-wider mb-4 block">الخدمات القانونية</span>
              <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
                حماية قانونية <span className="text-gold">شاملة</span>
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-gray-text max-w-2xl mx-auto text-lg">
                فريق من أمهر المحامين المرخصين لحماية حقوقك وتمكين نمو أعمالك
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {legalServices.map(s => <ServiceCard key={s.title} {...s} />)}
            </div>
          </div>
        </section>

        {/* Accounting Services */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-gold font-bold text-sm tracking-wider mb-4 block">الخدمات المحاسبية</span>
              <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
                إدارة مالية <span className="text-gold">محترفة</span>
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-gray-text max-w-2xl mx-auto text-lg">
                محاسبون قانونيون معتمدون لإدارة التزاماتك المالية بدقة واحترافية
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {accountingServices.map(s => <ServiceCard key={s.title} {...s} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-navy relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black text-white mb-4">هل تحتاج خدمة بعينها؟</h2>
            <p className="text-gray-300 mb-8 text-lg">
              تواصل معنا واحصل على استشارة أولية مجانية لمدة 30 دقيقة لتقييم وضعك وتحديد الحل المناسب.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book-consultation"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                احجز استشارة مجانية
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
