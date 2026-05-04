import { Link } from 'react-router-dom'
import { Award, ArrowLeft, Scale } from 'lucide-react'

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

          {/* Left: Orbit graphic */}
          <div className="hidden lg:flex justify-center animate-fade-in">
            <div className="relative">
              {/* Outer circle */}
              <div className="w-96 h-96 rounded-full flex items-center justify-center border border-gold/20"
                style={{background:'linear-gradient(135deg, rgba(201,162,39,0.1), rgba(201,162,39,0.05))'}}>
                {/* Middle circle */}
                <div className="w-72 h-72 rounded-full flex items-center justify-center border border-gold/10"
                  style={{background:'linear-gradient(135deg, rgba(201,162,39,0.1), transparent)'}}>
                  {/* Inner circle */}
                  <div className="w-48 h-48 rounded-full flex items-center justify-center"
                    style={{background:'linear-gradient(135deg, rgba(201,162,39,0.2), rgba(201,162,39,0.05))'}}>
                    <Scale className="w-20 h-20 text-gold" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Floating card: top-right */}
              <div className="absolute top-10 -right-4 rounded-xl p-4 border backdrop-blur-sm flex items-center gap-3 shadow-lg"
                style={{background:'rgba(255,255,255,0.08)', borderColor:'rgba(255,255,255,0.15)'}}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{background:'rgba(201,162,39,0.2)'}}>
                  <Scale className="w-4 h-4 text-gold" />
                </div>
                <span className="text-white text-sm font-semibold whitespace-nowrap">العقود الاستراتيجية</span>
              </div>

              {/* Floating card: left-center */}
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 rounded-xl p-4 border backdrop-blur-sm flex items-center gap-3 shadow-lg"
                style={{background:'rgba(255,255,255,0.08)', borderColor:'rgba(255,255,255,0.15)'}}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{background:'rgba(201,162,39,0.2)'}}>
                  <Award className="w-4 h-4 text-gold" />
                </div>
                <span className="text-white text-sm font-semibold whitespace-nowrap">التمثيل القانوني</span>
              </div>

              {/* Floating card: bottom-left */}
              <div className="absolute bottom-10 -left-4 rounded-xl p-4 border backdrop-blur-sm flex items-center gap-3 shadow-lg"
                style={{background:'rgba(255,255,255,0.08)', borderColor:'rgba(255,255,255,0.15)'}}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{background:'rgba(201,162,39,0.2)'}}>
                  <Scale className="w-4 h-4 text-gold" />
                </div>
                <span className="text-white text-sm font-semibold whitespace-nowrap">حوكمة الأعمال</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
