import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Quote } from 'lucide-react'

const testimonials = [
  {
    name:    'أحمد المحمد',
    role:    'مدير شركة تجارية',
    text:    'تعاملت مع فريق صرح في قضية تجارية معقدة، وكان أداؤهم احترافياً بامتياز. أنهوا القضية بنتيجة ممتازة وفي وقت قياسي.',
    rating:  5,
    avatar:  'أ',
  },
  {
    name:    'سارة الزهراني',
    role:    'مديرة مالية',
    text:    'خدمات المحاسبة التي قدمها الفريق كانت على أعلى مستوى من الدقة والمهنية. ساعدونا في تنظيم ملفاتنا الضريبية بشكل مثالي.',
    rating:  5,
    avatar:  'س',
  },
  {
    name:    'خالد العتيبي',
    role:    'رجل أعمال',
    text:    'وجدت في صرح الشريك القانوني الذي كنت أبحث عنه. متاحون دائماً، سريعو الاستجابة، ونتائجهم تتجاوز التوقعات.',
    rating:  5,
    avatar:  'خ',
  },
  {
    name:    'نورة الدوسري',
    role:    'مؤسسة شركة ناشئة',
    text:    'ساعدني الفريق في تأسيس شركتي وصياغة جميع العقود اللازمة. عملهم كان متقناً والنصائح القانونية كانت قيّمة جداً.',
    rating:  5,
    avatar:  'ن',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold-500 text-lg">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx(i => (i + 1) % testimonials.length)
  const t    = testimonials[idx]

  return (
    <section className="section bg-primary-900 relative overflow-hidden">
      {/* decoration */}
      <div className="absolute inset-0 opacity-5" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 bg-gold-500/20 text-gold-400 text-sm font-semibold rounded-full mb-4"
        >
          آراء عملائنا
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-white mb-14"
        >
          ماذا يقول عملاؤنا؟
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-10 relative"
          >
            <Quote className="absolute top-6 right-8 w-10 h-10 text-gold-500/30" />
            <Stars count={t.rating} />
            <p className="text-gray-200 text-lg leading-relaxed mb-8 italic">
              "{t.text}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-xl">
                {t.avatar}
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{t.name}</div>
                <div className="text-gray-400 text-sm">{t.role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 flex items-center justify-center transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all ${i === idx ? 'w-6 h-2.5 bg-gold-500' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
