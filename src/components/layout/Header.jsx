import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Scale, Phone } from 'lucide-react'
import clsx from 'clsx'

const navLinks = [
  { to: '/',         label: 'الرئيسية' },
  { to: '/services', label: 'خدماتنا' },
  { to: '/about',    label: 'من نحن' },
  { to: '/contact',  label: 'تواصل معنا' },
]

export default function Header() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location              = useLocation()
  const isHome                = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const transparent = isHome && !scrolled

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        transparent
          ? 'bg-transparent'
          : 'bg-primary-900/95 backdrop-blur-md shadow-lg'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-lg leading-none">صرح</div>
              <div className="text-gold-400 text-xs font-medium">للخدمات القانونية والمحاسبية</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  clsx(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-gold-500 text-white'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+966500000000"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              اتصل بنا
            </a>
            <Link
              to="/admin"
              className="hidden md:inline-flex items-center px-3 py-2 border border-white/30 text-white/70 hover:text-white hover:border-white/60 text-xs font-medium rounded-lg transition-colors"
            >
              لوحة التحكم
            </Link>
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary-900/98 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'block px-4 py-3 rounded-lg text-sm font-semibold transition-all',
                  isActive ? 'bg-gold-500 text-white' : 'text-gray-200 hover:bg-white/10'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="tel:+966500000000"
            className="flex items-center gap-2 px-4 py-3 bg-gold-500 text-white text-sm font-semibold rounded-lg mt-2"
          >
            <Phone className="w-4 h-4" />
            اتصل بنا الآن
          </a>
        </div>
      )}
    </header>
  )
}
