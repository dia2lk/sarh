import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin, ArrowUp, MessageCircle, BarChart3, CreditCard } from 'lucide-react';
import { trackCTAClick, trackPhoneClick, trackEmailClick, trackNavClick } from '../lib/analytics';

const footerLinks = {
  services: [
    { label: 'تأسيس الشركات وحوكمة الأعمال', path: '/services' },
    { label: 'صياغة ومراجعة العقود الاستراتيجية', path: '/services' },
    { label: 'الاستشارات الضريبية والمحاسبية', path: '/services' },
    { label: 'التمثيل القانوني في القضايا المعقدة', path: '/services' },
  ],
  quickLinks: [
    { label: 'من نحن', path: '/about' },
    { label: 'خدماتنا', path: '/services' },
    { label: 'القطاعات', path: '/sectors' },
    { label: 'الإنجازات', path: '/cases' },
    { label: 'المقالات', path: '/articles' },
    { label: 'الأسئلة الشائعة', path: '/faq' },
    { label: 'تواصل معنا', path: '/contact' },
    { label: 'المستشار الذكي', path: '/ai-consultation' },
    { label: 'احجز استشارة', path: '/book-consultation' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterLinkClick = (label: string, path: string) => {
    trackNavClick(label, path, 'footer');
  };

  return (
    <footer className="bg-navy-dark text-white">
      {/* CTA Section */}
      <div className="bg-gradient-to-l from-gold to-gold-light">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
            احجز استشارة الآن — ابدأ بحماية أعمالك اليوم
          </h3>
          <p className="text-white/80 mb-8 text-lg">
            نقدم استشارة أولية مجانية لمدة 30 دقيقة لتقييم وضعكم القانوني وتحديد مسار العمل
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-consultation"
              onClick={() => trackCTAClick('احجز استشارة مجانية', 'footer_cta', '/book-consultation')}
              className="bg-navy-dark text-white px-8 py-3.5 rounded-lg font-bold hover:bg-navy transition-all duration-300 hover:scale-105"
            >
              احجز استشارة مجانية
            </Link>
            <a
              href="https://wa.me/201117819505"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick('تواصل واتساب', 'footer_cta', 'whatsapp')}
              className="bg-white/20 backdrop-blur text-white px-8 py-3.5 rounded-lg font-bold hover:bg-white/30 transition-all duration-300 border border-white/20 flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              <span>واتساب</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
                <Scale size={22} className="text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-white">صرح للخدمات القانونية والمحاسبية</span>
                <span className="text-[9px] text-gold -mt-0.5 font-bold tracking-widest">محامون ومحاسبون قانونيون</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              صرح للخدمات القانونية والمحاسبية — محامون ومحاسبون قانونيون. منظومة متكاملة لدعم الشركات والمؤسسات في إدارة المخاطر، الامتثال، وتحقيق النمو بثقة واستقرار.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61563312433693"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-all duration-300"
                aria-label="صفحة فيسبوك"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://wa.me/201117819505"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#25D366]/20 text-gray-400 hover:text-[#25D366] transition-all duration-300"
                aria-label="واتساب"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">خدماتنا</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    onClick={() => handleFooterLinkClick(link.label, link.path)}
                    className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-gold/40 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">روابط سريعة</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    onClick={() => handleFooterLinkClick(link.label, link.path)}
                    className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-gold/40 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">تواصل معنا</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm font-medium">بني سويف • الجيزة</p>
                  <p className="text-gray-400 text-xs">جمهورية مصر العربية</p>
                </div>
              </div>
              <a
                href="tel:+201117819505"
                onClick={() => trackPhoneClick('01117819505', 'footer')}
                className="flex items-center gap-3 hover:text-gold transition-colors"
              >
                <Phone size={18} className="text-gold shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm" dir="ltr">01117819505</p>
                  <p className="text-gray-300 text-sm" dir="ltr">01035678474</p>
                </div>
              </a>
              <a
                href="mailto:legalsarh@gmail.com"
                onClick={() => trackEmailClick('legalsarh@gmail.com', 'footer')}
                className="flex items-center gap-3 hover:text-gold transition-colors"
              >
                <Mail size={18} className="text-gold shrink-0" />
                <p className="text-gray-300 text-sm">legalsarh@gmail.com</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} صرح للخدمات القانونية والمحاسبية. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-gold transition-colors">سياسة الخصوصية</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">الشروط والأحكام</Link>
            <Link to="/crm" className="hover:text-gold transition-colors flex items-center gap-1">
              <BarChart3 size={12} /> لوحة التحكم
            </Link>
            <Link to="/billing" className="hover:text-gold transition-colors flex items-center gap-1">
              <CreditCard size={12} /> نظام الفوترة
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        aria-label="العودة إلى أعلى الصفحة"
        className="fixed bottom-24 left-6 w-12 h-12 bg-navy text-gold rounded-full shadow-lg flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300 z-40"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
