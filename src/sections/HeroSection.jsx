import { Link } from 'react-router-dom'
import { Award, ArrowLeft } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center bg-navy overflow-hidden"
      aria-label="القسم الرئيسي — صرح للخدمات القانونية والمحاسبية"
    >
      {/* Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      {/* Glow blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{background:'rgba(201,162,39,0.05)'}} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{background:'rgba(201,162,39,0.03)'}} />
      {/* Gold vertical line right */}
      <div className="absolute top-0 right-0 w-px h-full" style={{background:'linear-gradient(to bottom, transparent, rgba(201,162,39,0.2), transparent)'}} />
      {/* Gold horizontal line bottom */}
      <div className="absolute bottom-0 left-0 w-full h-px" style={{background:'linear-gradient(to left, transparent, rgba(201,162,39,0.3), transparent)'}} />

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Right: Text */}
          <div className="animate-fade-in-up text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border rounded-full px-5 py-2 mb-8"
              style={{background:'rgba(201,162,39,0.1)', borderColor:'rgba(201,162,39,0.3)'}}>
              <Award className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-semibold">منظومة قانونية ومحاسبية متكاملة لحماية أعمالكم</span>
            </div>

            {/* h1 — one per page, primary keyword */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-white leading-tight mb-6">
              <span className="block">حلول قانونية</span>
              <span className="block">
                متكاملة لحماية{' '}
                <span className="text-gold-gradient">أعمالكم</span>
              </span>
              <span className="block">
                وتعزيز{' '}
                <span className="text-gold-gradient">نموكم</span>
              </span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
              نقدّم في صرح منظومة قانونية ومحاسبية متكاملة، مصممة لدعم الشركات
              والمؤسسات في إدارة المخاطر، الامتثال، وتحقيق النمو بثقة واستقرار.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-end">
              <Link
                to="/book-consultation"
                className="flex items-center gap-2 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 shadow-lg"
                style={{boxShadow:'0 8px 24px rgba(201,162,39,0.3)'}}
              >
                <ArrowLeft className="w-5 h-5" />
                احجز استشارة الآن
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 border"
                style={{background:'rgba(255,255,255,0.08)', borderColor:'rgba(255,255,255,0.2)'}}
              >
                تواصل معنا
              </Link>
            </div>
          </div>

          {/* Left: Stats */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-5 lg:gap-6">
            {[
              { value: '+5,500', label: 'قضية ناجحة' },
              { value: '+2,000', label: 'عميل يثق بنا' },
              { value: '98%',    label: 'نسبة النجاح' },
            ].map(s => (
              <div
                key={s.label}
                className="flex-1 text-center rounded-2xl p-6 border"
                style={{background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)'}}
              >
                <div className="text-4xl font-black text-gold mb-1">{s.value}</div>
                <div className="text-gray-300 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
