import { motion } from 'framer-motion'
import { Award, Clock, Users, Handshake } from 'lucide-react'

const reasons = [
  {
    Icon: Award,
    title: 'خبرة وتميز',
    desc: 'فريق من أمهر المحامين والمحاسبين القانونيين ذوي الخبرة الواسعة.',
  },
  {
    Icon: Clock,
    title: 'سرعة الاستجابة',
    desc: 'نلتزم بالمواعيد ونرد على استفساراتك في أسرع وقت ممكن.',
  },
  {
    Icon: Users,
    title: 'فريق متكامل',
    desc: 'فريق متعدد التخصصات يعمل بتناسق لتقديم أفضل النتائج.',
  },
  {
    Icon: Handshake,
    title: 'شراكة حقيقية',
    desc: 'نتعامل مع كل عميل كشريك استراتيجي لا مجرد قضية.',
  },
]

export default function WhyUs() {
  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: image-like decorative block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="bg-primary-900 rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gold-500/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary-700/40 rounded-full translate-x-1/3 translate-y-1/3" />
              <div className="relative">
                <div className="text-7xl font-black text-gold-400 mb-2">15+</div>
                <div className="text-2xl font-bold mb-4">سنة من الخبرة</div>
                <p className="text-gray-300 leading-relaxed">
                  منذ تأسيسنا ونحن نبني علاقات ثقة راسخة مع عملائنا،
                  نحمي حقوقهم ونحقق مصالحهم بأعلى معايير المهنية والنزاهة.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[['500+', 'عميل'], ['1200+', 'قضية'], ['98%', 'رضا'], ['15+', 'متخصص']].map(([n, l]) => (
                    <div key={l} className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-2xl font-black text-gold-400">{n}</div>
                      <div className="text-xs text-gray-300 mt-1">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: reasons */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 bg-gold-500/10 text-gold-600 text-sm font-semibold rounded-full mb-3"
            >
              لماذا تختارنا؟
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title mb-6"
            >
              نحن الخيار الأمثل لحماية حقوقك
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 mb-10 leading-relaxed"
            >
              نجمع بين الكفاءة القانونية والخبرة المحاسبية في منظومة متكاملة تخدم أهدافك.
            </motion.p>

            <div className="space-y-6">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <r.Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-primary-800 font-bold mb-1">{r.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
