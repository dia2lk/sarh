import { motion } from 'framer-motion'
import { Scale, Calculator, FileText, Building2, ShieldCheck, TrendingUp, Landmark, Users2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const legalServices = [
  { Icon: Scale,     title: 'الاستشارات القانونية',    desc: 'نقدم استشارات قانونية دقيقة وشاملة تغطي جميع مجالات القانون التجاري والمدني والإداري.' },
  { Icon: Building2, title: 'قضايا الشركات',           desc: 'نمثل الشركات والمؤسسات أمام المحاكم التجارية وهيئات التحكيم لحماية مصالحها.' },
  { Icon: FileText,  title: 'العقود والاتفاقيات',      desc: 'صياغة ومراجعة وتوثيق جميع أنواع العقود التجارية والمدنية وعقود الشراكة.' },
  { Icon: Landmark,  title: 'النزاعات العقارية',       desc: 'حل النزاعات المتعلقة بالعقارات والأراضي وعقود الإيجار والبيع والشراء.' },
  { Icon: Users2,    title: 'قضايا العمل والتوظيف',   desc: 'تمثيل أصحاب العمل والموظفين في القضايا العمالية وصياغة عقود العمل.' },
  { Icon: ShieldCheck, title: 'الامتثال والحوكمة',    desc: 'مساعدة الشركات على الامتثال للأنظمة واللوائح المحلية والدولية.' },
]

const accountingServices = [
  { Icon: Calculator, title: 'المحاسبة القانونية',   desc: 'خدمات محاسبية متكاملة تشمل إعداد القوائم المالية والتقارير المحاسبية وفق المعايير الدولية.' },
  { Icon: TrendingUp, title: 'التدقيق المالي',       desc: 'تدقيق ومراجعة الحسابات والسجلات المالية للتحقق من دقتها وامتثالها للمعايير المحاسبية.' },
  { Icon: FileText,   title: 'الزكاة والضرائب',     desc: 'إعداد وتقديم الإقرارات الضريبية وملفات الزكاة وضريبة القيمة المضافة بدقة واحترافية.' },
  { Icon: Building2,  title: 'تأسيس الشركات',       desc: 'الإجراءات المحاسبية والقانونية لتأسيس الشركات وإعداد هياكلها المالية.' },
  { Icon: ShieldCheck, title: 'إدارة المخاطر المالية', desc: 'تقييم وإدارة المخاطر المالية ووضع استراتيجيات للحماية من التعرض للخسائر.' },
  { Icon: Scale,      title: 'الاستشارات المالية',   desc: 'تقديم استشارات مالية متخصصة لمساعدة الشركات والأفراد على اتخاذ القرارات الصحيحة.' },
]

function ServiceCard({ Icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="card group hover:-translate-y-1 cursor-default"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
        <Icon className="w-7 h-7 text-primary-600" />
      </div>
      <h3 className="text-xl font-bold text-primary-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

export default function Services() {
  return (
    <div className="pt-20">
      {/* Page hero */}
      <div className="bg-primary-900 py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-white mb-4"
        >
          خدماتنا
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-300 text-lg max-w-xl mx-auto"
        >
          نقدم خدمات قانونية ومحاسبية متكاملة بأعلى معايير الجودة والمهنية
        </motion.p>
        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400">
          <Link to="/" className="hover:text-gold-400 transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-gold-400">خدماتنا</span>
        </div>
      </div>

      {/* Legal */}
      <section className="section bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-3">
              الخدمات القانونية
            </span>
            <h2 className="section-title">الخدمات القانونية</h2>
            <p className="section-subtitle">فريق من أمهر المحامين المرخصين لحماية حقوقك القانونية</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalServices.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Accounting */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-3">
              الخدمات المحاسبية
            </span>
            <h2 className="section-title">الخدمات المحاسبية</h2>
            <p className="section-subtitle">محاسبون قانونيون معتمدون لإدارة أموالك بدقة واحترافية</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accountingServices.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-900 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-4">هل تحتاج خدمة لم تجدها؟</h2>
          <p className="text-gray-300 mb-8">تواصل معنا وسيساعدك فريقنا في إيجاد الحل المناسب لاحتياجاتك.</p>
          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            تواصل معنا الآن
          </Link>
        </div>
      </section>
    </div>
  )
}
