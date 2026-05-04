import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 20,   suffix: '+', label: 'سنوات من الخبرة' },
  { value: 5500, suffix: '+', label: 'قضية تم التعامل معها' },
  { value: 2000, suffix: '+', label: 'عميل يثق بنا' },
  { value: 98,   suffix: '%', label: 'نسبة النجاح' },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref    = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const steps    = 60
        const inc      = value / steps
        let cur        = 0
        const timer    = setInterval(() => {
          cur += inc
          if (cur >= value) { setCount(value); clearInterval(timer) }
          else setCount(Math.floor(cur))
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{count.toLocaleString('ar-EG')}{suffix}</span>
}

export default function StatsSection() {
  return (
    <section className="py-20 relative" style={{background:'linear-gradient(to left, #050810, #0f172a)'}}>
      <div className="absolute inset-0 bg-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-4xl md:text-5xl font-black text-gold mb-2">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-gray-400 font-medium text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
