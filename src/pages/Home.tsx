import { Link } from 'react-router-dom';
import {
  Scale, Shield, FileText, Building2, Gavel, Calculator, Users,
  Briefcase, Landmark, Heart, Factory, GraduationCap, Plane,
  CheckCircle2, Star, Award, TrendingUp, Clock,
  ArrowLeft, Phone, Mail, ChevronDown, MapPin,
  Handshake, BookOpen, Target, Zap, MessageCircle,
  Eye, Globe, BadgeCheck, Pill, Wheat,
  PartyPopper, Fingerprint, Sparkles
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {
  trackCTAClick,
  trackServiceCardClick,
  trackSectorCardClick,
  trackFAQInteraction,
  trackLeadSubmitted,
  trackLeadSuccess,
  trackFormFieldFocus,
  trackFormStarted,
  trackPhoneClick,
  trackEmailClick,
  prepareSupabasePayload,
  submitToSupabase,
} from '../lib/analytics';

// ===== HERO SECTION =====
function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-navy overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      <div className="absolute inset-0 hero-overlay"></div>

      {/* Decorative */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/3 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-transparent via-gold/30 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-5 py-2 mb-8">
              <Award size={16} className="text-gold" />
              <span className="text-gold text-sm font-medium">منظومة قانونية ومحاسبية متكاملة لحماية أعمالكم</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.2] mb-6">
              حلول قانونية
              <br />
              <span className="text-gold-gradient">متكاملة</span> لحماية
              <br />
              أعمالكم وتعزيز <span className="text-gold-gradient">نموكم</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
              نقدّم في صرح منظومة قانونية ومحاسبية متكاملة، مصممة لدعم الشركات والمؤسسات في إدارة المخاطر، الامتثال، وتحقيق النمو بثقة واستقرار.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/book-consultation"
                onClick={() => trackCTAClick('احجز استشارة الآن', 'hero_section', '/book-consultation')}
                className="bg-gradient-to-l from-gold to-gold-light text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105 text-center flex items-center justify-center gap-2"
              >
                <span>احجز استشارة الآن</span>
                <ArrowLeft size={20} />
              </Link>
              <Link
                to="/contact"
                onClick={() => trackCTAClick('تواصل معنا', 'hero_section', '/contact')}
                className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 text-center"
              >
                تواصل معنا
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Shield size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">+5,500</p>
                  <p className="text-gray-400 text-xs">عمل وملف مهني</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Users size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">+2,000</p>
                  <p className="text-gray-400 text-xs">عميل ومؤسسة</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Star size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">+20</p>
                  <p className="text-gray-400 text-xs">عاماً من الخبرة</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hidden lg:flex justify-center animate-fade-in">
            <div className="relative">
              <div className="w-96 h-96 bg-gradient-to-br from-gold/10 to-gold/5 rounded-full flex items-center justify-center border border-gold/20">
                <div className="w-72 h-72 bg-gradient-to-br from-gold/10 to-transparent rounded-full flex items-center justify-center border border-gold/10">
                  <div className="w-48 h-48 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center">
                    <Scale size={80} className="text-gold" />
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-10 right-0 bg-white/10 backdrop-blur rounded-xl p-4 animate-float border border-white/10">
                <FileText size={24} className="text-gold" />
                <p className="text-white text-xs mt-1">العقود الاستراتيجية</p>
              </div>
              <div className="absolute bottom-20 left-0 bg-white/10 backdrop-blur rounded-xl p-4 animate-float delay-300 border border-white/10">
                <Gavel size={24} className="text-gold" />
                <p className="text-white text-xs mt-1">التمثيل القانوني</p>
              </div>
              <div className="absolute top-1/2 left-10 bg-white/10 backdrop-blur rounded-xl p-4 animate-float delay-600 border border-white/10">
                <Building2 size={24} className="text-gold" />
                <p className="text-white text-xs mt-1">حوكمة الأعمال</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== AUDITABLE METRICS — aligned with the reference experience =====
const referenceMetrics = [
  { value: '+5,500', title: 'عمل وملف مهني', description: 'إجمالي تراكمي عبر مسارات التأسيس والعقود والضرائب والتمثيل القانوني.', source: 'سجل الأعمال التشغيلي المجمّع', icon: FileText },
  { value: '+2,000', title: 'عميل ومؤسسة', description: 'جهات وأفراد تلقّوا خدمات قانونية أو محاسبية من صرح.', source: 'سجل ملفات العملاء والخدمات', icon: Users },
  { value: '+20', title: 'عاماً من الخبرة', description: 'مسيرة مهنية بدأت في 2004 وتراكمت عبر ملفات وقطاعات متعددة.', source: 'سجل تأسيس صرح ومسيرتها المهنية', icon: Clock },
  { value: '12+', title: 'قطاعاً نخدمه', description: 'خبرة تمتد من الخدمات المالية والعقار إلى التقنية والطاقة والصناعة.', source: 'تصنيف القطاعات ومحفظة الخدمات', icon: Building2 },
];

function ReferenceMetricsSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <span className="mb-3 block text-sm font-bold text-gold">مؤشرات قابلة للمراجعة</span>
          <h2 className="mb-4 text-3xl font-black text-navy md:text-4xl">الأرقام وراء الخبرة</h2>
          <p className="leading-8 text-gray-text">نعرض نطاق مؤشراتنا بحسب نوع العمل، لا كنسبة نجاح عامة. تُحدَّث هذه البيانات دورياً من سجلات أعمال صرح الداخلية.</p>
        </div>
        <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2 lg:grid-cols-4">
          {referenceMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={metric.title} className="bg-white p-7 transition-colors hover:bg-[#fcfaf5]">
                <Icon className="mb-6 text-gold" size={24} aria-hidden="true" />
                <p className="mb-1 text-3xl font-black text-navy">{metric.value}</p>
                <h3 className="mb-4 font-bold text-navy">{metric.title}</h3>
                <p className="min-h-20 text-sm leading-7 text-gray-text">{metric.description}</p>
                <p className="mt-5 border-t border-gray-100 pt-4 text-xs font-semibold text-gold">{metric.source}<br />آخر مراجعة: أغسطس ٢٠٢٦</p>
              </article>
            );
          })}
        </div>
        <div className="mt-8 grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <div>
            <h3 className="mb-2 text-lg font-black text-navy">كيف نقرأ الأرقام؟</h3>
            <p className="max-w-3xl text-sm leading-7 text-gray-text">
              يشمل العدد التراكمي أعمال التأسيس، ومراجعات العقود، والملفات الضريبية، والتمثيل القانوني. وقد يتلقى العميل أكثر من خدمة ضمن نطاق تعاون واحد.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-navy">
            <Link to="/cases" className="border-b border-gold pb-1 hover:text-gold">اطّلع على نماذج من الأعمال ←</Link>
            <Link to="/services" className="border-b border-gold pb-1 hover:text-gold">استعرض خدماتنا ←</Link>
          </div>
        </div>
        <div className="mt-8 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['+800 شركة مؤسسة', 'تأسيس الشركات وحوكمة الأعمال'],
            ['+3,000 عقد مراجع', 'صياغة ومراجعة العقود الاستراتيجية'],
            ['+1,200 عميل ضريبي', 'الاستشارات الضريبية والمحاسبية'],
            ['+500 قضية اقتصادية', 'التمثيل القانوني في القضايا المعقدة'],
          ].map(([value, label]) => (
            <div key={label} className="bg-[#fcfaf5] px-5 py-4">
              <p className="text-base font-black text-navy">{value}</p>
              <p className="mt-1 text-xs font-semibold text-gray-text">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== SERVICES SECTION =====
const services = [
  {
    icon: Building2,
    title: 'تأسيس الشركات وحوكمة الأعمال',
    desc: 'نُدير جميع مراحل تأسيس الكيانات القانونية، ونساعدك على اختيار الهيكل الأمثل، مع بناء إطار حوكمة يضمن الاستدامة والامتثال.',
  },
  {
    icon: FileText,
    title: 'صياغة ومراجعة العقود الاستراتيجية',
    desc: 'نصمم عقودًا تحمي مصالحك وتمنع النزاعات، مع تغطية شاملة للثغرات القانونية والتجارية.',
  },
  {
    icon: Calculator,
    title: 'الاستشارات الضريبية والمحاسبية',
    desc: 'حلول متكاملة لضبط الالتزامات الضريبية، تحسين الكفاءة المالية، وضمان الامتثال الكامل للتشريعات.',
  },
  {
    icon: Gavel,
    title: 'التمثيل القانوني في القضايا المعقدة',
    desc: 'دفاع قانوني متخصص في القضايا الاقتصادية والتجارية، مع إدارة استراتيجية للنزاعات عالية الحساسية.',
  },
];

function ServicesSection() {
  return (
    <section className="py-24 bg-white bg-pattern">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">خدماتنا القانونية</span>
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
            أربع ركائز <span className="text-gold">استراتيجية</span> لحماية أعمالكم
          </h2>
          <div className="section-divider mb-6"></div>
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            نقدّم منظومة قانونية ومحاسبية متكاملة، مصممة لدعم الشركات في إدارة المخاطر والامتثال وتحقيق النمو
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <Link
              key={i}
              to="/services"
              onClick={() => trackServiceCardClick(service.title, 'home_services_section')}
              className="card-hover bg-white rounded-2xl p-8 border border-gray-100 shadow-sm group gold-border-hover relative overflow-hidden"
            >
              {/* Pillar Number */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center">
                <span className="text-gold text-xs font-black">0{i + 1}</span>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center shrink-0 group-hover:from-gold group-hover:to-gold-light transition-all duration-500">
                  <service.icon size={26} className="text-gold group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-text leading-relaxed text-sm">{service.desc}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-gold font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>اقرأ المزيد</span>
                <ArrowLeft size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            onClick={() => trackCTAClick('استعرض جميع الخدمات', 'home_services_cta', '/services')}
            className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-xl font-bold hover:bg-navy-light transition-all duration-300 hover:scale-105"
          >
            <span>استعرض جميع الخدمات</span>
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== SECTORS SECTION =====
const sectors = [
  { icon: Briefcase, label: 'القطاع المصرفي والمالي' },
  { icon: Landmark, label: 'القطاع الحكومي' },
  { icon: Building2, label: 'القطاع العقاري' },
  { icon: Heart, label: 'القطاع الصحي' },
  { icon: Factory, label: 'القطاع الصناعي' },
  { icon: GraduationCap, label: 'القطاع التعليمي' },
  { icon: Plane, label: 'القطاع السياحي' },
  { icon: Zap, label: 'قطاع الطاقة المتجددة' },
];

function SectorsSection() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-transparent via-gold/30 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">القطاعات التي نخدمها</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">خبرة واسعة في <span className="text-gold">مختلف القطاعات</span></h2>
          <div className="section-divider mb-6"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sectors.map((sector, i) => (
            <Link
              key={i}
              to="/sectors"
              onClick={() => trackSectorCardClick(sector.label)}
              className="bg-white/5 backdrop-blur rounded-2xl p-6 text-center group hover:bg-gold/10 transition-all duration-500 border border-white/5 hover:border-gold/30 card-hover"
            >
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-all duration-500">
                <sector.icon size={28} className="text-gray-400 group-hover:text-gold transition-colors duration-300" />
              </div>
              <h3 className="text-white font-medium text-sm group-hover:text-gold transition-colors duration-300">{sector.label}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== STATS SECTION =====
function AnimatedCounter({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer); // prevent leak if unmounted mid-animation
    };
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-black text-gold mb-2">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-gray-400 font-medium">{label}</p>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-l from-navy-dark to-navy relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <AnimatedCounter target={5500} suffix="+" label="عمل وملف مهني" />
          <AnimatedCounter target={2000} suffix="+" label="عميل ومؤسسة" />
          <AnimatedCounter target={20} suffix="+" label="عاماً من الخبرة" />
          <AnimatedCounter target={12} suffix="+" label="قطاعاً نخدمه" />
        </div>
      </div>
    </section>
  );
}

// ===== ACHIEVEMENTS SECTION =====
const achievements = [
  { year: '2004', title: 'تأسيس صرح', desc: 'نخبة من الدكاترة الأكاديميين' },
  { year: '2010', title: 'التوسع الإقليمي', desc: 'افتتاح فرعي بني سويف والجيزة + شراكات دولية' },
  { year: '2016', title: 'براءة في قضية تزوير بالكويت', desc: 'إثبات استحالة الواقعة بالحسابات الرياضية' },
  { year: '2019', title: 'شراكة مع بوند فودز', desc: 'تقديم الدعم القانوني والإداري والمالي' },
  { year: '2024', title: 'شركاء أركان والفخراني', desc: 'استشارات قانونية وضريبية لشركات كبرى' },
];

function AchievementsSection() {
  return (
    <section className="py-24 bg-gray-light bg-pattern">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">مسيرتنا وإنجازاتنا</span>
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">رحلة <span className="text-gold">تميز مستمر</span></h2>
          <div className="section-divider mb-6"></div>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 right-0 left-0 h-0.5 bg-gold/20 hidden md:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {achievements.map((item, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center border-2 border-gold/30 group-hover:border-gold group-hover:bg-gold transition-all duration-300 shadow-lg z-10 relative">
                  <span className="text-gold font-black text-sm group-hover:text-white transition-colors">{item.year}</span>
                </div>
                <div className="mt-6 bg-white rounded-xl p-5 shadow-sm group-hover:shadow-xl transition-all duration-300">
                  <h4 className="font-bold text-navy mb-1 text-sm">{item.title}</h4>
                  <p className="text-gray-text text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/cases"
            onClick={() => trackCTAClick('عرض جميع الإنجازات', 'home_achievements_section', '/cases')}
            className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-xl font-bold hover:bg-navy-light transition-all duration-300"
          >
            <span>عرض جميع الإنجازات</span>
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== WHY SARH SECTION =====
const reasons = [
  { icon: Handshake, title: 'التزام بالمعايير المهنية', desc: 'نلتزم بأعلى معايير المهنية والنزاهة في كل ما نقدمه' },
  { icon: BookOpen, title: 'ذكاء تحليلي استثنائي', desc: 'نستخدم التحليل المنطقي والرياضي لإثبات الحقائق كما في قضية التزوير بالكويت' },
  { icon: Target, title: 'حلول مخصصة لكل قضية', desc: 'نصمم استراتيجية دفاعية فريدة لكل قضية بناءً على تحليل معمق' },
  { icon: TrendingUp, title: 'سجل براءات مثبت', desc: 'حققنا براءات في قضايا تزوير ورشوة واتجار بالبشر عابرة للحدود' },
  { icon: Clock, title: 'استجابة سريعة', desc: 'نضمن الاستجابة الفورية لاستفساراتكم على مدار الساعة' },
  { icon: Shield, title: 'سرية تامة (NDA)', desc: 'تشفير End-to-End واتفاقيات سرية صارمة لحماية بياناتكم' },
];

function WhySarhSection() {
  return (
    <section className="py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">لماذا صرح؟</span>
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-6">
              شريكك القانوني <span className="text-gold">الاستراتيجي</span>
            </h2>
            <p className="text-gray-text text-lg leading-relaxed mb-8">
              تأسست صرح بجمع نخبة من الدكاترة الأكاديميين المتخصصين في القانون والمحاسبة. نجمع بين العمق الأكاديمي والخبرة العملية لنقدم حلولاً استراتيجية تحمي أعمالكم وتدعم نموكم.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.slice(0, 4).map((reason, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    <reason.icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm mb-1">{reason.title}</h4>
                    <p className="text-gray-text text-xs leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              onClick={() => trackCTAClick('تعرف علينا أكثر', 'why_sarh_section', '/about')}
              className="inline-flex items-center gap-2 text-gold font-bold mt-8 hover:gap-4 transition-all duration-300"
            >
              <span>تعرف علينا أكثر</span>
              <ArrowLeft size={20} />
            </Link>
          </div>

          <div className="relative">
            <div className="bg-navy rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center">
                    <Scale size={28} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">ابدأ بحماية أعمالك اليوم</h3>
                    <p className="text-gray-400 text-sm">استشارة أولية مجانية</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {['فريق متخصص من المحامين الخبراء', 'متابعة مستمرة لجميع القضايا', 'حلول مبتكرة ومناسبة', 'أسعار تنافسية وشفافة'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-gold shrink-0" />
                      <span className="text-gray-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/book-consultation"
                  onClick={() => trackCTAClick('احجز استشارة مجانية', 'why_sarh_card', '/book-consultation')}
                  className="block text-center bg-gradient-to-l from-gold to-gold-light text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 text-lg"
                >
                  احجز استشارة الآن — ابدأ بحماية أعمالك اليوم
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== TRUST PARTNERS SECTION (شركاء النجاح) =====
const partners = [
  {
    name: 'مصنع بوند فودز للصناعات الغذائية',
    service: 'دعم إداري، مالي، قانوني، تسليعي',
    icon: Wheat,
    sector: 'الصناعات الغذائية',
  },
  {
    name: 'مجموعة صيدليات الفخراني',
    service: 'المستشار القانوني والضريبي',
    icon: Pill,
    sector: 'القطاع الصحي',
  },
  {
    name: 'شركة أركان للاستشارات الاقتصادية',
    service: 'المستشار القانوني داخل وخارج مصر',
    icon: Briefcase,
    sector: 'الاستشارات الاقتصادية',
  },
  {
    name: 'مجموعة شركات تقنية',
    service: 'تأسيس وحوكمة الشركات التقنية',
    icon: Building2,
    sector: 'قطاع التقنية',
  },
  {
    name: 'شركة الميرة للتجارة العامة',
    service: 'الاستشارات الضريبية والمحاسبية',
    icon: Calculator,
    sector: 'القطاع التجاري',
  },
  {
    name: 'مجموعة استثمارية خليجية',
    service: 'التمثيل القانوني في القضايا المعقدة',
    icon: Gavel,
    sector: 'القطاع الاستثماري',
  },
];

function TrustPartnersSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">شركاء النجاح</span>
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
            كيانات نتشرف <span className="text-gold">بحمايتها</span>
          </h2>
          <div className="section-divider mb-6"></div>
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            نفتخر بثقة كبرى الشركات والمؤسسات في المنطقة، ونسعى دائماً لتقديم أعلى مستويات الخدمة القانونية والمحاسبية
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl p-6 card-hover gold-border-hover border border-gray-100 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center shrink-0 group-hover:from-gold group-hover:to-gold-light transition-all duration-500">
                  <partner.icon size={24} className="text-gold group-hover:text-white transition-colors duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy text-sm mb-1.5 group-hover:text-gold transition-colors duration-300 leading-relaxed">
                    {partner.name}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{partner.service}</p>
                  <span className="inline-flex items-center gap-1.5 bg-gold/10 text-gold text-[11px] font-bold px-3 py-1 rounded-full">
                    <BadgeCheck size={12} />
                    {partner.sector}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-navy/5 rounded-full px-8 py-4">
            <Shield size={20} className="text-gold" />
            <span className="text-navy font-bold text-sm">+2,000 عميل يثقون بخدمات صرح القانونية والمحاسبية</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== REAL CASE STUDIES SECTION (نتائج حقيقية) =====
const realCases = [
  {
    id: 1,
    badge: 'قضية تزوير — دولة الكويت',
    title: 'إثبات استحالة واقعة التزوير بالحسابات الرياضية',
    summary: 'تم توجيه تهمة تزوير لموكلنا بناءً على مستندات تُظهر قطع مسافة 112 كم في 18 دقيقة فقط. استخدمنا الحسابات الرياضية لإثبات استحالة الواقعة.',
    details: [
      'المسافة: 112 كم',
      'السرعة القصوى: 100 كم/ساعة',
      'الزمن الأدنى الفيزيائي: 65 دقيقة',
      'الزمن المدوّن في المستندات: 18 دقيقة',
    ],
    strategy: 'استخدام الحسابات الرياضية والفيزيائية لإثبات استحالة الواقعة زمانياً ومكانياً، مع تقديم أدلة تقنية من كاميرات المراقبة.',
    result: 'براءة كاملة',
    resultType: 'acquittal' as const,
    icon: Fingerprint,
    highlight: 'ذكاء تحليلي',
  },
  {
    id: 2,
    badge: 'جناية رشوة — دولة الكويت',
    title: 'تحويل حكم الإدانة إلى براءة في الاستئناف',
    summary: 'تولّينا قضية رشوة معقدة صدر فيها حكم إدانة ابتدائي. من خلال تفكيك الأدلة الاستنتاجية وإعادة بناء الوقائع، تم تحويل الحكم إلى براءة.',
    details: [
      'حكم ابتدائي: إدانة',
      'التحدي: أدلة استنتاجية ظاهرية',
      'الاستراتيجية: تفكيك منطقي للأدلة',
      'النتيجة: براءة في الاستئناف',
    ],
    strategy: 'تفكيك سلسلة الأدلة الاستنتاجية وإثبات الانقطاع بين عناصر الجريمة، مع تقديم بدائل تفسيرية أقوى.',
    result: 'براءة في الاستئناف',
    resultType: 'acquittal' as const,
    icon: Eye,
    highlight: 'تفكيك استراتيجي',
  },
  {
    id: 3,
    badge: 'الاتجار بالبشر والهجرة عبر الحدود',
    title: 'تحويل حكم سجن 7 سنوات غيابياً إلى براءة',
    summary: 'صدر حكم غيابي بالسجن 7 سنوات في قضية اتجار بالبشر والهجرة غير المشروعة. تم إثبات بطلان أمر الضبط وتقديم دفاع شامل أدى للبراءة.',
    details: [
      'حكم غيابي: 7 سنوات سجن',
      'الإجراء: إثبات بطلان أمر الضبط',
      'التحدي: قضية عابرة للحدود',
      'النتيجة: براءة كاملة',
    ],
    strategy: 'إثبات بطلان إجراءات الضبط والقبض لعدم مراعاة الضمانات الدستورية، مما أدى لبطلان جميع ما ترتب عليها من أدلة.',
    result: 'براءة كاملة',
    resultType: 'acquittal' as const,
    icon: Globe,
    highlight: 'قضايا عابرة للحدود',
  },
];

function RealCaseStudiesSection() {
  const [activeCase, setActiveCase] = useState(0);

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-transparent via-gold/30 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">نتائج حقيقية</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            قصص نجاح <span className="text-gold">من واقع القضايا</span>
          </h2>
          <div className="section-divider mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            لا نكتفي بالقول — نقدّم نتائج مثبتة من واقع القضايا المعقدة التي تولّيناها
          </p>
        </div>

        {/* Case Selector */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center">
          {realCases.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveCase(i)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeCase === i
                  ? 'bg-gold text-white shadow-lg shadow-gold/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <c.icon size={16} />
              <span>{c.badge.split('—')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Active Case */}
        <div className="bg-white/5 backdrop-blur rounded-3xl border border-white/10 overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Case Details */}
            <div className="lg:col-span-3 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gold/20 text-gold text-xs font-bold px-4 py-1.5 rounded-full">
                  {realCases[activeCase].badge}
                </span>
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <PartyPopper size={12} />
                  {realCases[activeCase].highlight}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                {realCases[activeCase].title}
              </h3>

              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                {realCases[activeCase].summary}
              </p>

              {/* Key Facts */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {realCases[activeCase].details.map((detail, j) => (
                  <div key={j} className="bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                    <p className="text-gray-300 text-sm font-medium">{detail}</p>
                  </div>
                ))}
              </div>

              {/* Strategy */}
              <div className="mb-8">
                <h4 className="text-gold font-bold text-sm mb-3 flex items-center gap-2">
                  <Target size={14} />
                  الاستراتيجية الدفاعية
                </h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {realCases[activeCase].strategy}
                </p>
              </div>

              <Link
                to="/cases"
                onClick={() => trackCTAClick('عرض جميع القضايا', 'home_case_studies', '/cases')}
                className="inline-flex items-center gap-2 bg-gradient-to-l from-gold to-gold-light text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
              >
                <span>عرض جميع القضايا</span>
                <ArrowLeft size={18} />
              </Link>
            </div>

            {/* Result Panel */}
            <div className="lg:col-span-2 bg-gradient-to-b from-gold/10 to-gold/5 p-8 md:p-10 flex flex-col justify-center border-r border-white/5">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-500/20 rounded-full mx-auto flex items-center justify-center mb-6 border-2 border-green-500/30">
                  <CheckCircle2 size={48} className="text-green-400" />
                </div>
                <h4 className="text-green-400 font-black text-2xl mb-2">النتيجة</h4>
                <p className="text-white text-xl font-bold mb-6">{realCases[activeCase].result}</p>
                
                {/* Divider */}
                <div className="w-16 h-0.5 bg-gold/30 mx-auto mb-6"></div>

                <div className="space-y-4 text-right">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-gold text-xs font-bold mb-1">الموكل</p>
                    <p className="text-white text-sm">براءة تامة من جميع التهم</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-gold text-xs font-bold mb-1">القانون المستخدم</p>
                    <p className="text-white text-sm">إثبات بطلان الإجراءات</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-gold text-xs font-bold mb-1">المحامي</p>
                    <p className="text-white text-sm">د. إسلام إبراهيم</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FAQ SECTION =====
const faqs = [
  {
    q: 'كيف أبدأ التعامل مع صرح؟',
    a: 'من خلال حجز استشارة أولية لتقييم وضعك القانوني وتحديد الحل المناسب. يمكنك الحجز مباشرة عبر نموذج الحجز على الموقع أو التواصل عبر واتساب أو الاتصال المباشر.',
    core: true,
  },
  {
    q: 'هل بياناتي ومستنداتي آمنة؟',
    a: 'نلتزم بأعلى معايير حماية البيانات والتشفير (End-to-End)، مع تطبيق اتفاقيات سرية صارمة (NDA). نستخدم أحدث تقنيات حماية البيانات ونلتزم بأعلى معايير الأمان المتعارف عليها دولياً.',
    core: true,
  },
  {
    q: 'كيف يتم تحديد التكلفة؟',
    a: 'تُحدد بناءً على نطاق وتعقيد الخدمة، مع شفافية كاملة قبل التنفيذ. نعتمد مبدأ الشفافية؛ تُوضح كافة التكاليف قبل البدء، مع إمكانية الاتفاق على خطط دفع مرنة.',
    core: true,
  },
  {
    q: 'هل تقدمون دعم مستمر للشركات؟',
    a: 'نعم، نوفر خدمات مستشار قانوني دائم لإدارة كافة الجوانب القانونية. نقدم باقات اشتراك شهرية تشمل استشارات قانونية غير محدودة ومراجعة العقود والامتثال التنظيمي والدعم القانوني المستمر.',
    core: true,
  },
  {
    q: 'هل يمكن إجراء الاستشارة عن بُعد؟',
    a: 'بالتأكيد! نقدم استشارات عن بُعد عبر مكالمات الفيديو أو الهاتف لراحة عملائنا. هذا يتيح لنا خدمة عملائنا في أي مكان داخل مصر أو خارجها.',
    core: false,
  },
  {
    q: 'ما هي المناطق التي تغطونها؟',
    a: 'لنا فرعان في بني سويف (كورنيش النيل - برج الصفوة) والجيزة (القرية الذكية - مبني نورث سايد). نقدم خدماتنا في جميع أنحاء مصر، كما نتعامل مع قضايا دولية عبر شبكة مكاتبنا الشريكة في الكويت ودول الخليج.',
    core: false,
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    const action = openIndex === index ? 'close' : 'open';
    trackFAQInteraction(faqs[index].q, action as 'open' | 'close');
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">إجابات فورية</span>
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">الأسئلة <span className="text-gold">الأكثر شيوعاً</span></h2>
          <div className="section-divider mb-6"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 ${
                openIndex === i 
                  ? 'border-gold/30 bg-gold/5 shadow-lg' 
                  : faq.core 
                    ? 'border-gold/10 bg-gold/[0.02] hover:border-gold/20' 
                    : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              {faq.core && openIndex !== i && (
                <div className="flex items-center gap-2 px-6 pt-4 pb-0">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-gold text-xs font-bold">سؤال شائع</span>
                </div>
              )}
              <button
                onClick={() => handleToggle(i)}
                className="w-full flex items-center justify-between p-6 text-right"
              >
                <span className={`font-bold text-lg ${openIndex === i ? 'text-gold' : 'text-navy'} transition-colors`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-4 transition-all ${
                  openIndex === i ? 'bg-gold text-white rotate-180' : 'bg-gray-100 text-gray-500'
                }`}>
                  <ChevronDown size={18} />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${
                openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="px-6 pb-6 text-gray-text leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/faq"
            onClick={() => trackCTAClick('عرض جميع الأسئلة', 'home_faq_section', '/faq')}
            className="inline-flex items-center gap-2 text-gold font-bold hover:gap-4 transition-all duration-300"
          >
            <span>عرض جميع الأسئلة</span>
            <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== BRANCHES MAP SECTION =====
const branches = [
  {
    city: 'بني سويف',
    address: 'كورنيش النيل - برج الصفوة - الدور الأول - أعلى ديسباسيتو - بجوار هيئة الرقابة المالية',
    phone: '01117819505',
    phoneRaw: '+201117819505',
    hours: 'الأحد - الخميس: 9:00 ص - 6:00 م',
    mapQuery: 'بني+سويف+برج+الصفوة+كورنيش+النيل',
  },
  {
    city: 'الجيزة',
    address: 'القرية الذكية - مبني نورث سايد - الدور الأول',
    phone: '01035678474',
    phoneRaw: '+201035678474',
    hours: 'الأحد - الخميس: 9:00 ص - 6:00 م',
    mapQuery: 'القرية+الذكية+مبني+نورث+سايد+الجيزة',
  },
];

function BranchesSection() {
  return (
    <section className="py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">فروعنا</span>
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
            نخدمكم في <span className="text-gold">موقعين</span> استراتيجيين
          </h2>
          <div className="section-divider mb-6"></div>
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            نوفر وجوداً فعلياً في بني سويف والجيزة لخدمتكم عن قرب
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {branches.map((branch, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden card-hover border border-gray-100"
            >
              {/* Map Placeholder */}
              <div className="map-placeholder h-48 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <MapPin size={32} className="text-gold mb-2" />
                  <span className="text-navy font-bold text-lg">{branch.city}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-gold" />
                  فرع {branch.city}
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-text">{branch.address}</p>
                  <a
                    href={`tel:${branch.phoneRaw}`}
                    onClick={() => trackPhoneClick(branch.phoneRaw, 'home_branches')}
                    className="flex items-center gap-2 text-navy font-medium hover:text-gold transition-colors"
                  >
                    <Phone size={14} className="text-gold" />
                    <span dir="ltr">{branch.phone}</span>
                  </a>
                  <div className="flex items-center gap-2 text-gray-text">
                    <Clock size={14} className="text-gold" />
                    <span>{branch.hours}</span>
                  </div>
                </div>
                <a
                  href={`https://maps.google.com/?q=${branch.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center bg-navy/5 text-navy font-bold text-sm py-2.5 rounded-lg hover:bg-gold hover:text-white transition-all duration-300"
                >
                  عرض على الخريطة
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== QUICK CONTACT SECTION =====
function QuickContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const formStarted = useRef(false);
  const fieldFocused = useRef<Set<string>>(new Set());

  const handleFormStart = (fieldName: string) => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStarted('home_quick_contact', fieldName);
    }
  };

  const handleFieldFocus = (fieldName: string, fieldType: string) => {
    if (!fieldFocused.current.has(fieldName)) {
      fieldFocused.current.add(fieldName);
      handleFormStart(fieldName);
      trackFormFieldFocus('home_quick_contact', fieldName, fieldType);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    trackLeadSubmitted({
      form_name: 'home_quick_contact',
      service_type: 'general_inquiry',
    });

    const payload = prepareSupabasePayload({
      form_name: 'home_quick_contact',
      service_type: 'general_inquiry',
      consultation_type: 'general_inquiry',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      preferred_date: '',
      preferred_time: '',
      description: formData.message,
    });
    await submitToSupabase(payload);

    setSubmitted(true);

    setTimeout(() => {
      trackLeadSuccess({
        form_name: 'home_quick_contact',
        service_type: 'general_inquiry',
      });
    }, 500);
  };

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Info */}
          <div>
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">تواصل سريع</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              نحن هنا <span className="text-gold">لمساعدتكم</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              لا تتردد في التواصل معنا لأي استفسار أو طلب استشارة قانونية. فريقنا جاهز لخدمتكم على مدار الساعة.
            </p>

            <div className="space-y-6">
              <a
                href="tel:+201117819505"
                onClick={() => trackPhoneClick('01117819505', 'home_quick_contact')}
                className="flex items-center gap-4 bg-white/5 rounded-xl p-5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-bold">اتصل بنا</h4>
                  <p className="text-gray-400 text-sm" dir="ltr">01117819505</p>
                  <p className="text-gray-400 text-sm" dir="ltr">01035678474</p>
                </div>
              </a>

              <a
                href="mailto:legalsarh@gmail.com"
                onClick={() => trackEmailClick('legalsarh@gmail.com', 'home_quick_contact')}
                className="flex items-center gap-4 bg-white/5 rounded-xl p-5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-bold">البريد الإلكتروني</h4>
                  <p className="text-gray-400 text-sm">legalsarh@gmail.com</p>
                </div>
              </a>

              <a
                href="https://wa.me/201117819505"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366]/10 rounded-xl p-5 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
              >
                <div className="w-14 h-14 bg-[#25D366]/20 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle size={24} className="text-[#25D366]" />
                </div>
                <div>
                  <h4 className="text-white font-bold">واتساب</h4>
                  <p className="text-gray-400 text-sm">تواصل مباشرة عبر واتساب</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-navy mb-3">تم الإرسال بنجاح!</h3>
                <p className="text-gray-text mb-6">شكراً لتواصلكم معنا. سنقوم بالرد عليكم في أقرب وقت.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', message: '' });
                    formStarted.current = false;
                    fieldFocused.current = new Set();
                  }}
                  className="bg-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-navy-light transition-all"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black text-navy mb-2">أرسل لنا رسالة</h3>
                <p className="text-gray-text mb-8 text-sm">سنقوم بالرد عليكم خلال 24 ساعة</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="الاسم الكامل *"
                      aria-label="الاسم الكامل"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => handleFieldFocus('name', 'text')}
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-navy placeholder-gray-400 bg-gray-50 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="tel"
                      placeholder="رقم الجوال *"
                      aria-label="رقم الجوال"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => handleFieldFocus('phone', 'tel')}
                      className="px-5 py-3.5 border border-gray-200 rounded-xl text-navy placeholder-gray-400 bg-gray-50 transition-all"
                    />
                    <input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      aria-label="البريد الإلكتروني"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => handleFieldFocus('email', 'email')}
                      className="px-5 py-3.5 border border-gray-200 rounded-xl text-navy placeholder-gray-400 bg-gray-50 transition-all"
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="رسالتكم *"
                    aria-label="رسالتكم"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => handleFieldFocus('message', 'textarea')}
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-navy placeholder-gray-400 bg-gray-50 transition-all resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-l from-gold to-gold-light text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    إرسال الرسالة
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== AI CONSULTATION CTA SECTION =====
function AIConsultationCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#050810] via-[#0f172a] to-[#0a0f1a] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-transparent via-[#c29a56]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-transparent via-[#c29a56]/40 to-transparent" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#c29a56]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#c29a56]/3 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#c29a56 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center">
          {/* AI Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#c29a56]/10 rounded-2xl border border-[#c29a56]/20 mb-8 relative">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c29a56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
              <path d="M16 14h.01" /><path d="M8 14h.01" />
              <path d="M12 18v4" /><path d="M8 22h8" />
              <circle cx="12" cy="8" r="1" fill="#c29a56" />
            </svg>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#c29a56] rounded-full flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            جرّب <span className="text-[#c29a56]">المستشار القانوني الذكي</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            احصل على إرشادات قانونية مبدئية فورية — متاح على مدار الساعة.
            <br />
            اسأل عن تأسيس الشركات، العقود، الضرائب، أو أي موضوع قانوني.
          </p>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            {[
              { icon: '⚡', title: 'رد فوري', desc: 'إجابات لحظية بالذكاء الاصطناعي' },
              { icon: '🔒', title: 'سرية تامة', desc: 'بياناتك محمية ومشفرة بالكامل' },
              { icon: '⚖️', title: 'محتوى دقيق', desc: 'مبني على المعرفة القانونية المصرية' },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h4 className="text-white font-bold text-sm mb-1">{f.title}</h4>
                <p className="text-gray-500 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/ai-consultation"
              onClick={() => trackCTAClick('جرّب المستشار الذكي', 'ai_cta_section', '/ai-consultation')}
              className="flex items-center gap-3 bg-gradient-to-l from-[#c29a56] to-[#a8833a] text-white px-8 py-4 rounded-xl font-bold text-base hover:shadow-2xl hover:shadow-[#c29a56]/30 transition-all duration-300 hover:scale-105"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M16 14h.01" /><path d="M8 14h.01" />
                <path d="M12 18v4" /><path d="M8 22h8" />
              </svg>
              جرّب المستشار الذكي الآن
            </Link>
            <Link
              to="/book-consultation"
              onClick={() => trackCTAClick('احجز استشارة حقيقية', 'ai_cta_section', '/book-consultation')}
              className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-xl font-bold text-base hover:bg-white/5 transition-all"
            >
              أو احجز استشارة حقيقية
            </Link>
          </div>

          <p className="text-gray-600 text-xs mt-6">
            ⚠️ المستشار الذكي يقدم إرشادات مبدئية — لا تغني عن الاستشارة القانونية المتخصصة
          </p>
        </div>
      </div>
    </section>
  );
}

// Optional homepage blocks retained for future campaign pages.  They are
// intentionally not included in the reference landing-page sequence below.
void StatsSection;
void QuickContactSection;
void AIConsultationCTA;

// ===== MAIN HOME PAGE =====
export default function Home() {
  return (
    <>
      <HeroSection />
      <ReferenceMetricsSection />
      <TrustPartnersSection />
      <ServicesSection />
      <RealCaseStudiesSection />
      <SectorsSection />
      <AchievementsSection />
      <WhySarhSection />
      <FAQSection />
      <BranchesSection />
    </>
  );
}
