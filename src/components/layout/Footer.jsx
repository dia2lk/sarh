import { Link } from 'react-router-dom'
import { Scale, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

function FooterCTA() {
  return (
    <div style={{background:'linear-gradient(to left, #c9a227, #e2b93b)'}}>
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
            className="bg-navy-dark text-white px-8 py-3.5 rounded-lg font-bold hover:bg-navy transition-all duration-300 hover:scale-105"
          >
            احجز استشارة مجانية
          </Link>
          <a
            href="https://wa.me/201117819505"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold text-white border transition-all duration-300 hover:bg-white/30"
            style={{background:'rgba(255,255,255,0.2)', borderColor:'rgba(255,255,255,0.3)'}}
          >
            <MessageCircle className="w-5 h-5" />
            واتساب
          </a>
        </div>
      </div>
    </div>
  )
}

const footerLinks = [
  { label: 'خدماتنا',                      to: '/services' },
  { label: 'تأسيس الشركات وحوكمة الأعمال', to: '/services' },
  { label: 'صياغة ومراجعة العقود الاستراتيجية', to: '/services' },
  { label: 'الاستشارات الضريبية والمحاسبية', to: '/services' },
  { label: 'التمثيل القانوني في القضايا المعقدة', to: '/services' },
]

const quickLinks = [
  { label: 'الرئيسية',          to: '/' },
  { label: 'من نحن',            to: '/about' },
  { label: 'خدماتنا',           to: '/services' },
  { label: 'القطاعات',          to: '/sectors' },
  { label: 'الإنجازات',         to: '/cases' },
  { label: 'المقالات',          to: '/articles' },
  { label: 'الأسئلة الشائعة',   to: '/faq' },
  { label: 'تواصل معنا',        to: '/contact' },
  { label: 'المستشار القانوني الذكي', to: '/ai-consultation' },
  { label: 'احجز استشارة الآن', to: '/book-consultation' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-400">
      <FooterCTA />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-navy to-navy-light rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="text-white font-black text-sm leading-tight">صرح للخدمات القانونية والمحاسبية</div>
                <div className="text-gold text-[10px] font-semibold">محامون ومحاسبون قانونيون</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              صرح للخدمات القانونية والمحاسبية — محامون ومحاسبون قانونيون. منظومة متكاملة لدعم الشركات والمؤسسات في إدارة المخاطر، الامتثال، وتحقيق النمو بثقة واستقرار.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/201117819505" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gold"
                style={{background:'rgba(255,255,255,0.08)'}}>
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm">خدماتنا</h4>
            <ul className="space-y-2">
              {footerLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-gold transition-colors leading-relaxed block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <div dir="ltr">
                  <div className="hover:text-gold"><a href="tel:+201117819505">01117819505</a></div>
                  <div className="hover:text-gold"><a href="tel:+201035678474">01035678474</a></div>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:info@sarh-law.com" className="hover:text-gold">info@sarh-law.com</a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>بني سويف والجيزة، مصر</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} صرح للخدمات القانونية والمحاسبية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:info@sarh-law.com" className="hover:text-gold transition-colors">سياسة الخصوصية</a>
            <span>|</span>
            <a href="mailto:info@sarh-law.com" className="hover:text-gold transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
