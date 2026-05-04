import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const highlights = ['خبرة قانونية 15+ عاماً', 'محاسبون معتمدون', 'أكثر من 500 عميل راضٍ']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden>
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #c9a227 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, #2a64a5 0%, transparent 50%)`,
          }}
        />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 text-sm font-semibold rounded-full mb-6 border border-gold-500/30">
            محامون ومحاسبون قانونيون معتمدون
          </span>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
            <span className="block">صرح</span>
            <span className="block text-gold-400">للخدمات القانونية</span>
            <span className="block">والمحاسبية</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
            نقدم لك خدمات قانونية ومحاسبية متكاملة بأعلى معايير الجودة والمهنية،
            نحمي حقوقك ونحقق مصالحك بثقة وكفاءة.
          </p>

          <ul className="flex flex-col sm:flex-row gap-4 mb-10">
            {highlights.map(h => (
              <li key={h} className="flex items-center gap-2 text-gray-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary text-base px-8 py-4 gap-3">
              احجز استشارة مجانية
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/services" className="btn-outline text-base px-8 py-4">
              تعرف على خدماتنا
            </Link>
          </div>
        </motion.div>

        {/* Card grid */}
        <motion.div
          className="hidden lg:grid grid-cols-2 gap-5"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {[
            { icon: '⚖️', title: 'استشارات قانونية',   desc: 'حلول قانونية شاملة لكل احتياجاتك' },
            { icon: '📊', title: 'محاسبة قانونية',     desc: 'تدقيق مالي بأعلى معايير الدقة' },
            { icon: '🏛️', title: 'قضايا الشركات',     desc: 'تمثيل احترافي أمام المحاكم' },
            { icon: '📋', title: 'العقود والاتفاقيات', desc: 'صياغة ومراجعة العقود بعناية' },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="text-white font-bold mb-1">{c.title}</h3>
              <p className="text-gray-400 text-sm">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs">
        <span>اسحب للأسفل</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
