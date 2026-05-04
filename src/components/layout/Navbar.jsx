import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Scale, Menu, X, Phone, Mail, MapPin, Clock } from 'lucide-react'

const navLinks = [
  { to: '/',                label: 'الرئيسية' },
  { to: '/about',           label: 'من نحن' },
  { to: '/services',        label: 'خدماتنا' },
  { to: '/sectors',         label: 'القطاعات' },
  { to: '/cases',           label: 'الإنجازات' },
  { to: '/articles',        label: 'المقالات' },
  { to: '/faq',             label: 'الأسئلة الشائعة' },
  { to: '/contact',         label: 'تواصل معنا' },
  { to: '/ai-consultation', label: 'المستشار الذكي' },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const active = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'}`}>
      {/* Top bar */}
      <div className="hidden lg:block bg-navy-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href="tel:+201117819505" className="flex items-center gap-1.5 hover:text-gold transition-colors" dir="ltr">
              <Phone className="w-3 h-3 text-gold" />
              01117819505
            </a>
            <a href="tel:+201035678474" className="flex items-center gap-1.5 hover:text-gold transition-colors" dir="ltr">
              <Phone className="w-3 h-3 text-gold" />
              01035678474
            </a>
            <a href="mailto:info@sarh-law.com" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail className="w-3 h-3 text-gold" />
              info@sarh-law.com
            </a>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-gold" />
              السبت – الخميس: 9:00 ص – 5:00 م
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-gold" />
              بني سويف · الجيزة، مصر
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-navy to-navy-light rounded-lg flex items-center justify-center shadow-md">
              <Scale className="w-5 h-5 text-gold" strokeWidth={2} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-black text-navy tracking-tight group-hover:text-gold transition-colors leading-none">
                صرح للخدمات القانونية والمحاسبية
              </span>
              <span className="text-[9px] text-gold font-semibold tracking-wider mt-0.5">
                محامون ومحاسبون قانونيون
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 whitespace-nowrap
                  ${active(l.to)
                    ? 'text-gold bg-gold/10'
                    : 'text-gray-700 hover:text-gold hover:bg-gold/5'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA + phone */}
          <div className="hidden xl:flex items-center gap-3">
            <a href="tel:+201117819505" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold transition-colors font-medium" dir="ltr">
              <Phone className="w-4 h-4 text-gold" />
              01117819505
            </a>
            <Link
              to="/book-consultation"
              className="bg-gold hover:bg-gold-light text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 shadow-md shadow-gold/20"
            >
              احجز استشارة
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(v => !v)}
            className="xl:hidden p-2 rounded-lg text-navy hover:bg-gray-100 transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all
                ${active(l.to) ? 'bg-gold/10 text-gold' : 'text-gray-700 hover:bg-gray-50 hover:text-gold'}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 space-y-2">
            <a href="tel:+201117819505" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 font-medium" dir="ltr">
              <Phone className="w-4 h-4 text-gold" /> 01117819505
            </a>
            <Link to="/book-consultation" className="block text-center bg-gold text-white px-4 py-3 rounded-xl font-bold text-sm">
              احجز استشارة الآن
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
