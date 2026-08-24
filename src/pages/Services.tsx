import { Link } from 'react-router-dom';
import {
  Scale, Building2, FileText, Gavel, Calculator, ArrowLeft,
  CheckCircle2, Shield, Users, Handshake, Globe, Lock, TrendingUp, Award, MessageCircle
} from 'lucide-react';
import { trackCTAClick, trackServiceCardClick } from '../lib/analytics';

const services = [
  {
    icon: Building2,
    title: 'تأسيس الشركات وحوكمة الأعمال',
    shortTitle: 'تأسيس الشركات',
    desc: 'نُدير جميع مراحل تأسيس الكيانات القانونية، ونساعدك على اختيار الهيكل الأمثل، مع بناء إطار حوكمة يضمن الاستدامة والامتثال.',
    features: [
      'اختيار الهيكل القانوني الأمثل (LLC, JSC)',
      'إعداد عقود التأسيس والأنظمة الأساسية',
      'إدارة إجراءات التأسيس لدى الجهات المختصة',
      'حوكمة الشركات والامتثال التنظيمي',
      'تسجيل الشركات الأجنبية والفروع',
      'إعداد سياسات مجلس الإدارة والجمعيات العمومية',
    ],
    stats: { cases: '+800', rate: '99%', label: 'شركة مؤسسة' },
    tags: ['تأسيس', 'حوكمة', 'امتثال'],
  },
  {
    icon: FileText,
    title: 'صياغة ومراجعة العقود الاستراتيجية',
    shortTitle: 'العقود الاستراتيجية',
    desc: 'نصمم عقودًا تحمي مصالحك وتمنع النزاعات، مع تغطية شاملة للثغرات القانونية والتجارية.',
    features: [
      'عقود الشراكة والتأسيس الاستراتيجية',
      'اتفاقيات الوكالات التجارية والتوزيع',
      'عقود العمل والخدمات الشاملة',
      'عقود التوريد والإنشاءات (FIDIC)',
      'اتفاقيات عدم الإفصاح وحماية البيانات (NDA)',
      'عقود الترخيص والملكية الفكرية',
    ],
    stats: { cases: '+3,000', rate: '100%', label: 'عقد مراجع' },
    tags: ['عقود', 'شراكات', 'حماية'],
  },
  {
    icon: Calculator,
    title: 'الاستشارات الضريبية والمحاسبية',
    shortTitle: 'الضريبي والمحاسبي',
    desc: 'حلول متكاملة لضبط الالتزامات الضريبية، تحسين الكفاءة المالية، وضمان الامتثال الكامل للتشريعات.',
    features: [
      'تخطيط وتحسين الالتزامات الضريبية',
      'إعداد ومراجعة البيانات المالية',
      'الامتثال لمنظومة الفاتورة الإلكترونية (فاتورة)',
      'الاستشارات الضريبية الدولية (TP, VAT, CIT)',
      'تمثيل العملاء أمام مصلحة الضرائب المصرية ولجان الطعن',
      'إعداد التقارير الضريبية الدورية',
    ],
    stats: { cases: '+1,200', rate: '97%', label: 'عميل ضريبي' },
    tags: ['ضريبي', 'محاسبي', 'فاتورة إلكترونية'],
  },
  {
    icon: Gavel,
    title: 'التمثيل القانوني في القضايا المعقدة',
    shortTitle: 'القضايا المعقدة',
    desc: 'دفاع قانوني متخصص في القضايا الاقتصادية والتجارية، مع إدارة استراتيجية للنزاعات عالية الحساسية.',
    features: [
      'قضايا النقد الأجنبي والمخالفات المصرفية',
      'قضايا الرشوة والفساد المالي',
      'جرائم التزوير والاحتيال التجاري',
      'القضايا الاقتصادية العابرة للحدود',
      'التحقيق والدفاع أمام الجهات المختصة',
      'غسيل الأموال وتمويل الإرهاب',
    ],
    stats: { cases: '+500', rate: '95%', label: 'قضية اقتصادية' },
    tags: ['تمثيل', 'اقتصادي', 'عابر للحدود'],
  },
];

const processSteps = [
  { num: '01', title: 'التقييم الأولي', desc: 'نبدأ بفهم شامل لاحتياجاتكم وتقييم الوضع القانوني الحالي' },
  { num: '02', title: 'وضع الاستراتيجية', desc: 'نصمم خطة عمل قانونية مخصصة تتوافق مع أهدافكم' },
  { num: '03', title: 'التنفيذ والمتابعة', desc: 'ننفذ الخطة بكفاءة مع متابعة مستمرة وتقارير دورية' },
  { num: '04', title: 'النتائج والحماية', desc: 'نضمن تحقيق النتائج المطلوبة مع حماية مستمرة لمصالحكم' },
];

export default function Services() {
  const handleServiceCTA = (serviceName: string) => {
    trackCTAClick(`اطلب خدمة: ${serviceName}`, 'services_page', '/book-consultation');
    trackServiceCardClick(serviceName, 'services_page_cta');
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/3 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">خدماتنا</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            حلول قانونية <span className="text-gold-gradient">متكاملة</span> لحماية أعمالكم
            <br />
            وتعزيز <span className="text-gold-gradient">نموكم</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            نقدّم في صرح منظومة قانونية ومحاسبية متكاملة، مصممة لدعم الشركات والمؤسسات في إدارة المخاطر، الامتثال، وتحقيق النمو بثقة واستقرار
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {services.map((s, i) => (
              <a
                key={i}
                href={`#service-${i}`}
                onClick={() => trackServiceCardClick(s.shortTitle, 'services_hero_nav')}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-gold text-sm font-medium hover:bg-gold/10 hover:border-gold/30 transition-all"
              >
                <s.icon size={16} />
                <span>{s.shortTitle}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Stats Bar */}
      <section className="bg-gold py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-white font-black text-2xl md:text-3xl">+5,500</p>
              <p className="text-white/70 text-sm font-medium">قضية وملف قانوني</p>
            </div>
            <div>
              <p className="text-white font-black text-2xl md:text-3xl">98%</p>
              <p className="text-white/70 text-sm font-medium">نسبة النجاح</p>
            </div>
            <div>
              <p className="text-white font-black text-2xl md:text-3xl">+2,000</p>
              <p className="text-white/70 text-sm font-medium">عميل يثق بنا</p>
            </div>
            <div>
              <p className="text-white font-black text-2xl md:text-3xl">20+</p>
              <p className="text-white/70 text-sm font-medium">عاماً من الخبرة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {services.map((service, i) => (
            <div
              key={i}
              id={`service-${i}`}
              className={`grid lg:grid-cols-2 gap-12 items-center scroll-mt-24 ${
                i % 2 !== 0 ? 'lg:direction-ltr' : ''
              }`}
            >
              {/* Content Side */}
              <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className="flex gap-2 mb-4">
                  {service.tags.map((tag, j) => (
                    <span key={j} className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy-light rounded-2xl flex items-center justify-center shadow-lg">
                    <service.icon size={28} className="text-gold" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-navy leading-tight">{service.title}</h2>
                </div>

                <p className="text-gray-text leading-relaxed mb-8 text-lg">{service.desc}</p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-gold shrink-0 mt-1" />
                      <span className="text-gray-600">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/book-consultation"
                  onClick={() => handleServiceCTA(service.shortTitle)}
                  className="inline-flex items-center gap-2 bg-gradient-to-l from-gold to-gold-light text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
                >
                  <span>اطلب هذه الخدمة</span>
                  <ArrowLeft size={18} />
                </Link>
              </div>

              {/* Visual Side */}
              <div className={`relative ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="bg-navy rounded-3xl p-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-10"></div>
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold/3 rounded-full blur-2xl"></div>
                  
                  <div className="relative text-center">
                    <div className="w-32 h-32 bg-gold/10 rounded-full mx-auto flex items-center justify-center mb-6 border border-gold/20">
                      <service.icon size={60} className="text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{service.shortTitle}</h3>
                    <p className="text-gray-400 mb-8">فريق متخصص من الخبراء جاهز لمساعدتكم</p>
                    
                    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-gold font-black text-2xl">{service.stats.cases}</p>
                        <p className="text-gray-400 text-sm mt-1">{service.stats.label}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-gold font-black text-2xl">{service.stats.rate}</p>
                        <p className="text-gray-400 text-sm mt-1">نسبة نجاح</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">منهجية العمل</span>
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
              كيف نعمل <span className="text-gold">معكم</span>
            </h2>
            <div className="section-divider mb-6"></div>
            <p className="text-gray-text max-w-2xl mx-auto text-lg">
              نسير وفق منهجية واضحة ومنظمة لضمان تحقيق أفضل النتائج لعملائنا
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-8 text-center card-hover h-full">
                  <div className="text-gold font-black text-5xl mb-4 opacity-20">{step.num}</div>
                  <h3 className="text-lg font-bold text-navy mb-3">{step.title}</h3>
                  <p className="text-gray-text text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
                    <ArrowLeft size={24} className="text-gold/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Sarh */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
              لماذا تختار <span className="text-gold">صرح</span>؟
            </h2>
            <div className="section-divider mb-6"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'حماية شاملة', desc: 'نوفر حماية قانونية متكاملة تغطي جميع جوانب أعمالكم ومصالحكم' },
              { icon: Users, title: 'فريق متخصص', desc: 'فريق من الخبراء والمتخصصين في مختلف التخصصات القانونية والمحاسبية' },
              { icon: Handshake, title: 'شراكة طويلة الأمد', desc: 'نبني علاقات طويلة الأمد مبنية على الثقة والاحترافية والنتائج' },
              { icon: TrendingUp, title: 'نتائج مثبتة', desc: 'سجل حافل بالإنجازات والنتائج الناجحة في مختلف المجالات القانونية' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-light rounded-2xl p-8 text-center card-hover">
                <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-gold" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            {[
              { icon: Globe, label: 'اعتماد رسمي من وزارة العدل' },
              { icon: Award, label: 'عضوية الغرف التجارية' },
              { icon: Lock, label: 'ISO 27001 أمن المعلومات' },
              { icon: Scale, label: 'عضوية نقابة المحامين المصرية' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3">
                <badge.icon size={24} className="text-gold" />
                <span className="text-gray-300 text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="py-24 bg-gradient-to-br from-navy via-navy-light to-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl"></div>
        <div className="relative max-w-5xl mx-auto px-6">
          {/* Trust Badges Row */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
            {[
              { num: '+800', label: 'شركة مؤسسة' },
              { num: '+3,000', label: 'عقد مراجع' },
              { num: '+1,200', label: 'عميل ضريبي' },
              { num: '+500', label: 'قضية اقتصادية' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-gold font-black text-2xl md:text-3xl">{stat.num}</p>
                <p className="text-gray-400 text-sm font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              احجز استشارة الآن — ابدأ <span className="text-gold">بحماية أعمالك</span> اليوم
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
              نقدم استشارة أولية مجانية لمدة 30 دقيقة لتقييم وضعكم القانوني وتحديد مسار العمل الأمثل
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book-consultation"
                onClick={() => trackCTAClick('احجز استشارة مجانية', 'services_cta', '/book-consultation')}
                className="bg-gradient-to-l from-gold to-gold-light text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>احجز استشارة مجانية</span>
                <ArrowLeft size={20} />
              </Link>
              <a
                href="https://wa.me/201117819505"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick('تواصل واتساب', 'services_cta', 'whatsapp')}
                className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                <span>تواصل واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
