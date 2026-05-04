import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, Eye, Heart } from 'lucide-react'

const team = [
  { name: 'م. عبدالله الشمري',   role: 'المحامي الرئيسي',       specialty: 'قانون الشركات والتجاري',  exp: '20 عاماً',  avatar: 'ع' },
  { name: 'أ. سلطان المالكي',    role: 'محامي أول',              specialty: 'القضايا العمالية والمدنية', exp: '15 عاماً', avatar: 'س' },
  { name: 'أ. ريم الحربي',       role: 'محاسب قانوني أول',      specialty: 'التدقيق والمراجعة المالية', exp: '12 عاماً', avatar: 'ر' },
  { name: 'أ. فهد العنزي',       role: 'مستشار ضريبي',          specialty: 'الزكاة والضرائب وضريبة القيمة المضافة', exp: '10 سنوات', avatar: 'ف' },
  { name: 'أ. منى السعيد',       role: 'محامية شركات',          specialty: 'العقود والاتفاقيات التجارية', exp: '8 سنوات',  avatar: 'م' },
  { name: 'أ. عمر الرشيدي',      role: 'محلل مالي',             specialty: 'التحليل المالي وإدارة المخاطر', exp: '7 سنوات', avatar: 'م' },
]

const values = [
  { Icon: Target, title: 'مهمتنا',    desc: 'تقديم خدمات قانونية ومحاسبية متكاملة ومتميزة تحمي حقوق عملائنا وتحقق مصالحهم بأعلى معايير المهنية والنزاهة.' },
  { Icon: Eye,    title: 'رؤيتنا',    desc: 'أن نكون الشريك القانوني والمحاسبي الأول والأكثر ثقة في المملكة العربية السعودية والمنطقة العربية.' },
  { Icon: Heart,  title: 'قيمنا',     desc: 'النزاهة والأمانة والمهنية والالتزام بأعلى معايير جودة الخدمة مع الحفاظ على خصوصية عملائنا.' },
]

const milestones = [
  { year: '2008', title: 'تأسيس صرح', desc: 'بدأنا رحلتنا بفريق صغير وحلم كبير' },
  { year: '2012', title: 'التوسع المحاسبي', desc: 'أضفنا قسم المحاسبة القانونية المتخصص' },
  { year: '2016', title: '300 عميل', desc: 'تجاوزنا حاجز 300 عميل راضٍ' },
  { year: '2020', title: 'الرقمنة الكاملة', desc: 'أطلقنا منصتنا الرقمية المتكاملة' },
  { year: '2024', title: '500+ عميل', desc: 'تجاوزنا 500 عميل وألف قضية ناجحة' },
]

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-primary-900 py-20 px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-black text-white mb-4">
          من نحن
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-300 text-lg max-w-xl mx-auto">
          قصتنا وفريقنا وقيمنا التي نؤمن بها
        </motion.p>
        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400">
          <Link to="/" className="hover:text-gold-400 transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-gold-400">من نحن</span>
        </div>
      </div>

      {/* Story */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1 bg-gold-500/10 text-gold-600 text-sm font-semibold rounded-full mb-3">قصتنا</span>
            <h2 className="section-title mb-6">15 عاماً من الثقة والتميز</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              تأسست صرح للخدمات القانونية والمحاسبية عام 2008 برؤية واضحة: تقديم خدمات قانونية ومحاسبية متكاملة تجمع بين الكفاءة المهنية والنزاهة الكاملة.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              على مدار سنوات من العمل الدؤوب، بنينا سمعة راسخة على أسس الثقة والاحترافية، وأصبحنا الخيار الأول لمئات العملاء من الأفراد والشركات والمؤسسات.
            </p>
            <Link to="/contact" className="btn-primary">تواصل مع فريقنا</Link>
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-16 h-10 rounded-lg bg-primary-800 flex items-center justify-center text-gold-400 font-bold text-sm flex-shrink-0">
                  {m.year}
                </div>
                <div className="pt-1">
                  <h4 className="font-bold text-primary-800">{m.title}</h4>
                  <p className="text-gray-500 text-sm">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">مهمتنا ورؤيتنا وقيمنا</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-5">
                  <v.Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 bg-gold-500/10 text-gold-600 text-sm font-semibold rounded-full mb-3">كفاءات متميزة</span>
            <h2 className="section-title">فريقنا المتخصص</h2>
            <p className="section-subtitle">نخبة من أمهر المحامين والمحاسبين القانونيين المرخصين</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-primary-800 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 group-hover:scale-105 transition-transform">
                  {m.avatar}
                </div>
                <h3 className="font-bold text-primary-800 text-lg">{m.name}</h3>
                <div className="text-gold-600 font-semibold text-sm mb-2">{m.role}</div>
                <div className="text-gray-400 text-xs mb-1">{m.specialty}</div>
                <div className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs rounded-full font-medium">
                  خبرة {m.exp}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
