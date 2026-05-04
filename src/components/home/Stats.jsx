import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 500,  suffix: '+', label: 'عميل راضٍ' },
  { value: 15,   suffix: '+', label: 'سنة خبرة' },
  { value: 1200, suffix: '+', label: 'قضية ناجحة' },
  { value: 98,   suffix: '%', label: 'نسبة رضا العملاء' },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref               = useRef(null)
  const inView            = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const steps    = 60
    const inc      = value / steps
    let cur        = 0
    const timer    = setInterval(() => {
      cur += inc
      if (cur >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(cur))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return <span ref={ref}>{count.toLocaleString('ar-EG')}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="bg-primary-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-gold-400 mb-2">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-gray-300 text-sm font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
