import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale, Phone, Mail, MapPin, Clock, Bot, Sparkles, BarChart3, CreditCard } from 'lucide-react';
import { trackNavClick, trackCTAClick, trackPhoneClick, trackEmailClick } from '../lib/analytics';

const navLinks = [
  { path: '/', label: 'الرئيسية' },
  { path: '/about', label: 'من نحن' },
  { path: '/services', label: 'خدماتنا' },
  { path: '/sectors', label: 'القطاعات' },
  { path: '/cases', label: 'الإنجازات' },
  { path: '/articles', label: 'المقالات' },
  { path: '/faq', label: 'الأسئلة الشائعة' },
  { path: '/contact', label: 'تواصل معنا' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleNavClick = (linkName: string, linkDestination: string, type: 'main' | 'mobile' | 'topbar') => {
    trackNavClick(linkName, linkDestination, type);
  };

  const handleBookCTA = () => {
    trackCTAClick('احجز استشارة', 'header_nav', '/book-consultation');
  };

  const handlePhoneClick = () => {
    trackPhoneClick('01117819505', 'header_topbar');
  };

  const handleEmailClick = () => {
    trackEmailClick('legalsarh@gmail.com', 'header_topbar');
  };

  return (
    <>
      {/* ====== TOP BAR — Dark Navy ====== */}
      <div className="bg-navy-dark text-white text-sm py-2.5 hidden lg:block border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          {/* Right Side — Contact Info */}
          <div className="flex items-center gap-8">
            <a
              href="tel:+201117819505"
              onClick={handlePhoneClick}
              className="flex items-center gap-2 hover:text-gold transition-colors group"
            >
              <Phone size={13} className="text-gold group-hover:scale-110 transition-transform" />
              <span dir="ltr" className="text-gray-300 group-hover:text-white">01117819505</span>
            </a>
            <span className="text-white/10">|</span>
            <a
              href="tel:+201035678474"
              onClick={() => trackPhoneClick('01035678474', 'header_topbar')}
              className="flex items-center gap-2 hover:text-gold transition-colors group"
            >
              <Phone size={13} className="text-gold group-hover:scale-110 transition-transform" />
              <span dir="ltr" className="text-gray-300 group-hover:text-white">01035678474</span>
            </a>
            <span className="text-white/10">|</span>
            <a
              href="mailto:legalsarh@gmail.com"
              onClick={handleEmailClick}
              className="flex items-center gap-2 hover:text-gold transition-colors group"
            >
              <Mail size={13} className="text-gold group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 group-hover:text-white">legalsarh@gmail.com</span>
            </a>
            <span className="text-white/10">|</span>
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-gold" />
              <span className="text-gray-300">الأحد - الخميس: 8ص - 6م</span>
            </div>
          </div>
          {/* Left Side — Branches */}
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-gold" />
            <span className="text-gray-300">بني سويف</span>
            <span className="text-white/20 mx-1">•</span>
            <span className="text-gray-300">الجيزة</span>
          </div>
        </div>
      </div>

      {/* ====== MAIN NAVBAR — White Background ====== */}
      <header role="banner" data-testid="site-header" className="block" aria-label="التنقل الرئيسي">
      <nav
        aria-label="التنقل الرئيسي"
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'white-nav-scrolled shadow-lg'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-navy to-navy-light rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-navy/20 transition-shadow">
                <Scale size={22} className="text-gold" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-black text-navy tracking-tight group-hover:text-gold transition-colors">صرح للخدمات القانونية والمحاسبية</span>
                <span className="text-[9px] text-gold -mt-0.5 tracking-widest font-bold uppercase">محامون ومحاسبون قانونيون</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleNavClick(link.label, link.path, 'main')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative ${
                    location.pathname === link.path
                      ? 'text-gold bg-gold/5'
                      : 'text-navy-light hover:text-gold hover:bg-gold/5'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-6 h-0.5 bg-gold rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/crm"
                onClick={() => trackCTAClick('لوحة التحكم', 'header_nav', '/crm')}
                className="p-2.5 rounded-lg text-navy/40 hover:text-gold hover:bg-gold/5 transition-all"
                title="لوحة تحكم المحامين"
              >
                <BarChart3 size={18} />
              </Link>
              <Link
                to="/ai-consultation"
                onClick={() => trackCTAClick('المستشار الذكي', 'header_nav', '/ai-consultation')}
                className="flex items-center gap-2 px-4 py-2.5 border border-navy/20 rounded-lg text-navy text-sm font-semibold hover:bg-navy hover:text-white hover:border-navy transition-all duration-300 group"
              >
                <Sparkles size={14} className="text-gold group-hover:animate-pulse" />
                <span>المستشار الذكي</span>
              </Link>
              <Link
                to="/book-consultation"
                onClick={handleBookCTA}
                className="bg-gradient-to-l from-gold to-gold-light text-white px-7 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span>احجز استشارة</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isOpen 
                  ? 'text-gold bg-gold/5' 
                  : 'text-navy hover:bg-gray-50'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            {/* Mobile Contact Info */}
            <div className="flex flex-col gap-2 pb-4 mb-3 border-b border-gray-100">
              <a
                href="tel:+201117819505"
                onClick={handlePhoneClick}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gold"
              >
                <Phone size={14} className="text-gold" />
                <span dir="ltr">01117819505</span>
              </a>
              <a
                href="tel:+201035678474"
                onClick={() => trackPhoneClick('01035678474', 'header_mobile')}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gold"
              >
                <Phone size={14} className="text-gold" />
                <span dir="ltr">01035678474</span>
              </a>
              <a
                href="mailto:legalsarh@gmail.com"
                onClick={handleEmailClick}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gold"
              >
                <Mail size={14} className="text-gold" />
                <span>legalsarh@gmail.com</span>
              </a>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link.label, link.path, 'mobile')}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-gold bg-gold/5'
                    : 'text-navy-light hover:text-gold hover:bg-gold/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <Link
                to="/crm"
                onClick={() => trackCTAClick('لوحة التحكم', 'mobile_menu', '/crm')}
                className="flex items-center justify-center gap-2 bg-navy/10 text-navy px-6 py-2.5 rounded-lg font-bold text-xs"
              >
                <BarChart3 size={14} />
                لوحة تحكم المحامين
              </Link>
              <Link
                to="/billing"
                onClick={() => trackCTAClick('نظام الفوترة', 'mobile_menu', '/billing')}
                className="flex items-center justify-center gap-2 bg-navy/10 text-navy px-6 py-2.5 rounded-lg font-bold text-xs"
              >
                <CreditCard size={14} />
                نظام الفوترة
              </Link>
              <Link
                to="/ai-consultation"
                onClick={() => trackCTAClick('المستشار الذكي', 'mobile_menu', '/ai-consultation')}
                className="flex items-center justify-center gap-2 bg-navy text-white px-6 py-3 rounded-lg font-bold text-sm"
              >
                <Bot size={16} className="text-gold" />
                المستشار القانوني الذكي
              </Link>
              <Link
                to="/book-consultation"
                onClick={() => trackCTAClick('احجز استشارة الآن', 'mobile_menu', '/book-consultation')}
                className="block text-center bg-gradient-to-l from-gold to-gold-light text-white px-6 py-3.5 rounded-lg font-bold text-sm"
              >
                احجز استشارة الآن
              </Link>
            </div>
          </div>
        </div>
      </nav>
      </header>
    </>
  );
}
