import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-l from-primary-700 to-primary-900 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl" />

          <div className="relative">
            <span className="inline-block px-4 py-1 bg-gold-500/20 text-gold-400 text-sm font-semibold rounded-full mb-4">
              ابدأ الآن
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              هل تحتاج إلى استشارة قانونية أو محاسبية؟
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              فريقنا من الخبراء جاهز لمساعدتك. احجز استشارتك المجانية الآن ودعنا نجد الحل المناسب لك.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary text-base px-8 py-4 gap-3">
                احجز استشارة مجانية
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <a href="tel:+966500000000" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white hover:border-white/60 font-semibold rounded-lg transition-colors text-base">
                <Phone className="w-5 h-5" />
                اتصل بنا مباشرة
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
