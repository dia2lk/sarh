import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Scale, Calculator, FileText, Building2, ShieldCheck, TrendingUp } from 'lucide-react'

const services = [
  {
    Icon: Scale,
    title: 'الاستشارات القانونية',
    desc: 'نقدم استشارات قانونية متخصصة في مختلف المجالات بأيدي نخبة من أمهر المحامين المرخصين.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    Icon: Building2,
    title: 'قضايا الشركات',
    desc: 'تمثيل قانوني احترافي للشركات أمام المحاكم التجارية وهيئات التحكيم.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    Icon: FileText,
    title: 'العقود والاتفاقيات',
    desc: 'صياغة ومراجعة وتوثيق العقود التجارية والمدنية بدقة قانونية عالية.',
    color: 'bg-green-50 text-green-600',
  },
  {
    Icon: Calculator,
    title: 'المحاسبة القانونية',
    desc: 'خدمات محاسبية متكاملة تشمل إعداد القوائم المالية والتدقيق والمراجعة.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    Icon: TrendingUp,
    title: 'الزكاة والضرائب',
    desc: 'تقديم الإقرارات الضريبية وإدارة ملفات الزكاة وضريبة القيمة المضافة.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    Icon: ShieldCheck,
    title: 'التدقيق والامتثال',
    desc: 'فحص ومراجعة السجلات المالية لضمان الامتثال للأنظمة واللوائح المعتمدة.',
    color: 'bg-teal-50 text-teal-600',
  },
]

export default function ServicesPreview() {
  return (
    <section className="section bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-gold-500/10 text-gold-600 text-sm font-semibold rounded-full mb-3"
          >
            ما نقدمه
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            خدماتنا المتكاملة
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
          >
            نوفر حلولاً قانونية ومحاسبية شاملة تلبي جميع احتياجاتك المهنية والتجارية
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card group hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <s.Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-primary-800 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services" className="btn-secondary gap-3">
            عرض جميع الخدمات
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
