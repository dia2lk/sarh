import { Link } from 'react-router-dom'
import { Landmark, Building2, Home, Stethoscope, Factory, GraduationCap, Plane, Zap } from 'lucide-react'

const sectors = [
  { Icon: Landmark,      label: 'القطاع المصرفي والمالي' },
  { Icon: Building2,     label: 'القطاع الحكومي' },
  { Icon: Home,          label: 'القطاع العقاري' },
  { Icon: Stethoscope,   label: 'القطاع الصحي' },
  { Icon: Factory,       label: 'القطاع الصناعي' },
  { Icon: GraduationCap, label: 'القطاع التعليمي' },
  { Icon: Plane,         label: 'القطاع السياحي' },
  { Icon: Zap,           label: 'قطاع الطاقة المتجددة' },
]

export default function SectorsSection() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px" style={{background:'linear-gradient(to left, transparent, rgba(201,162,39,0.3), transparent)'}} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">القطاعات التي نخدمها</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            خبرة واسعة في <span className="text-gold">مختلف القطاعات</span>
          </h2>
          <div className="section-divider mb-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sectors.map(({ Icon, label }) => (
            <Link
              key={label}
              to="/sectors"
              className="rounded-2xl p-6 text-center group transition-all duration-500 border card-hover"
              style={{background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.05)'}}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(201,162,39,0.1)'
                e.currentTarget.style.borderColor = 'rgba(201,162,39,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
              }}
            >
              <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4 transition-all duration-500"
                style={{background:'rgba(255,255,255,0.05)'}}>
                <Icon className="w-7 h-7 text-gold" />
              </div>
              <p className="text-white font-bold text-sm group-hover:text-gold transition-colors">{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
