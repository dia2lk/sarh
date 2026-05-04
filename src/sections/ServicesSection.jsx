import { Link } from 'react-router-dom'
import { Building2, FileText, Calculator, Scale, ArrowLeft } from 'lucide-react'

const services = [
  {
    num: '01',
    Icon: Building2,
    title: 'تأسيس الشركات وحوكمة الأعمال',
    desc: 'نُدير جميع مراحل تأسيس الكيانات القانونية، ونساعدك على اختيار الهيكل الأمثل، مع بناء إطار حوكمة يضمن الاستدامة والامتثال.',
    link: '/services',
  },
  {
    num: '02',
    Icon: FileText,
    title: 'صياغة ومراجعة العقود الاستراتيجية',
    desc: 'نصمم عقوداً تحمي مصالحك وتمنع النزاعات، مع تغطية شاملة للثغرات القانونية والتجارية.',
    link: '/services',
  },
  {
    num: '03',
    Icon: Calculator,
    title: 'الاستشارات الضريبية والمحاسبية',
    desc: 'حلول متكاملة لضبط الالتزامات الضريبية، تحسين الكفاءة المالية، وضمان الامتثال الكامل للتشريعات.',
    link: '/services',
  },
  {
    num: '04',
    Icon: Scale,
    title: 'التمثيل القانوني في القضايا المعقدة',
    desc: 'دفاع قانوني متخصص في القضايا الاقتصادية والتجارية، مع إدارة استراتيجية للنزاعات عالية الحساسية.',
    link: '/services',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white bg-pattern" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">خدماتنا القانونية</span>
          <h2 id="services-heading" className="text-3xl md:text-4xl font-black text-navy mb-4">
            أربع ركائز <span className="text-gold">استراتيجية</span> لحماية أعمالكم
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            نقدّم منظومة قانونية ومحاسبية متكاملة، مصممة لدعم الشركات في إدارة المخاطر والامتثال وتحقيق النمو
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map(({ num, Icon, title, desc, link }) => (
            <Link
              key={num}
              to={link}
              className="card-hover bg-white rounded-2xl p-8 border border-gray-100 shadow-sm group gold-border-hover relative overflow-hidden block"
            >
              {/* Number badge */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{background:'rgba(201,162,39,0.1)'}}>
                <span className="text-gold text-xs font-black">{num}</span>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center shrink-0 group-hover:from-gold group-hover:to-gold-light transition-all duration-500">
                  <Icon className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-navy mb-3 group-hover:text-gold transition-colors">{title}</h3>
                  <p className="text-gray-text leading-relaxed mb-5 text-sm">{desc}</p>
                  <span className="inline-flex items-center gap-2 text-gold text-sm font-bold group-hover:gap-3 transition-all">
                    <ArrowLeft className="w-4 h-4" />
                    اقرأ المزيد
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-navy-light transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            استعرض جميع الخدمات
          </Link>
        </div>
      </div>
    </section>
  )
}
