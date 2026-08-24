import { Link } from 'react-router-dom';
import {
  ArrowLeft, Trophy, TrendingUp, Users, Award, CheckCircle2,
  Fingerprint, Eye, Globe, Building2, Calculator, FileText,
  Scale, Shield, MapPin, Briefcase, Banknote, Lock, Gavel,
  Landmark
} from 'lucide-react';

const realCases = [
  {
    category: 'جناية تزوير',
    country: 'دولة الكويت',
    title: 'إثبات استحالة واقعة التزوير بالحسابات الرياضية',
    desc: 'تم توجيه تهمة تزوير لموكلنا بناءً على مستندات تُظهر قطع مسافة 112 كم في 18 دقيقة فقط. استخدمنا الحسابات الرياضية والفيزيائية لإثبات أن سرعة القيادة المطلوبة لتحقيق ذلك تتجاوز 370 كم/ساعة — وهو مستحيل فيزيائياً على الطرق المعنية.',
    strategy: 'تحليل رياضي وفيزيائي للزمن والمسافة + تقديم أدلة كاميرات المراقبة',
    result: 'براءة كاملة',
    icon: Fingerprint,
    highlight: 'ذكاء تحليلي استثنائي',
    tags: ['تزوير', 'قضية جنائية', 'أدلة رقمية', 'كويت'],
  },
  {
    category: 'جناية رشوة',
    country: 'دولة الكويت',
    title: 'تحويل حكم الإدانة إلى براءة في الاستئناف',
    desc: 'تولّينا قضية رشوة معقدة صدر فيها حكم إدانة ابتدائي. قمنا بتفكيك سلسلة الأدلة الاستنتاجية وإثبات الانقطاع بين عناصر الجريمة، مع تقديم بدائل تفسيرية أقوى أقنعت محكمة الاستئناف.',
    strategy: 'تفكيك منطقي للأدلة الاستنتاجية + إثبات غياب الركن المعنوي',
    result: 'براءة في الاستئناف',
    icon: Eye,
    highlight: 'تفكيك استراتيجي للأدلة',
    tags: ['رشوة', 'استئناف', 'جنائية اقتصادية', 'كويت'],
  },
  {
    category: 'اتجار بالبشر',
    country: 'قضية عابرة للحدود',
    title: 'تحويل حكم سجن 7 سنوات غيابياً إلى براءة كاملة',
    desc: 'صدر حكم غيابي بالسجن 7 سنوات في قضية اتجار بالبشر والهجرة غير المشروعة. أثبتنا بطلان أمر الضبط لعدم مراعاة الضمانات الدستورية، مما أدى لبطلان جميع ما ترتب عليه من أدلة ونتج عنه براءة كاملة.',
    strategy: 'إثبات بطلان إجراءات الضبط والقبض + بطلان الأدلة المترتبة',
    result: 'براءة كاملة',
    icon: Globe,
    highlight: 'قضايا دولية عابرة للحدود',
    tags: ['اتجار بالبشر', 'هجرة غير مشروعة', 'عابرة للحدود', 'بطلان إجراءات'],
  },
  {
    category: 'تأسيس شركات',
    country: 'المملكة العربية السعودية',
    title: 'تأسيس شركة مساهمة برأسمال مليار ريال',
    desc: 'أشرفنا على تأسيس شركة مساهمة مقفلة في قطاع التقنية برأسمال يبلغ مليار ريال، مع إعداد كافة المستندات القانونية والنظام الأساسي ولوائح حوكمة الأعمال.',
    strategy: 'اختيار الهيكل القانوني الأمثل + إعداد نظام أساسي متكامل + حوكمة',
    result: 'تأسيس ناجح خلال 45 يوماً',
    icon: Building2,
    highlight: 'صفقات كبرى',
    tags: ['تأسيس', 'شركة مساهمة', 'حوكمة', 'رياض'],
  },
  {
    category: 'استشارات ضريبية',
    country: 'المملكة العربية السعودية',
    title: 'إعادة هيكلة ضريبية لشركة صناعية كبرى',
    desc: 'قمنا بإعادة هيكلة ضريبية شاملة لمجموعة صناعية كبرى، شملت مراجعة كافة الالتزامات الضريبية وتحسين الكفاءة المالية مع ضمان الامتثال الكامل لمنظومة الفاتورة الإلكترونية.',
    strategy: 'مراجعة ضريبية شاملة + تحسين الكفاءة المالية + الامتثال التشريعي',
    result: 'توفير 30% من الالتزامات الضريبية',
    icon: Calculator,
    highlight: 'تحسين مالي',
    tags: ['ضريبي', 'فاتورة إلكترونية', 'هيكلة', 'صناعي'],
  },
  {
    category: 'عقود استراتيجية',
    country: 'المملكة العربية السعودية',
    title: 'صياغة عقد شراكة دولي بقيمة 500 مليون ريال',
    desc: 'صمّمنا عقد شراكة استراتيجي بين شركة سعودية وشريك أجنبي بقيمة 500 مليون ريال، مع تغطية شاملة لجميع الثغرات القانونية والتجارية وآليات حل النزاعات.',
    strategy: 'صياغة شاملة + حماية حقوق + آليات تحكيم دولي',
    result: 'عقد محكم بلا ثغرات',
    icon: FileText,
    highlight: 'عقود دولية',
    tags: ['عقود', 'شراكة دولية', 'تحكيم', 'تجاري'],
  },
  {
    category: 'نزاع تجاري دولي',
    country: 'تحكيم دولي',
    title: 'تمثيل شركة سعودية في نزاع تجاري دولي',
    desc: 'مثّلنا شركة سعودية كبرى في نزاع تجاري دولي مع شريك أجنبي أمام محكمة تحكيم دولية. تم بناء استراتيجية دفاعية شاملة أدت لحسم النزاع لصالح موكلنا.',
    strategy: 'استراتيجية تحكيم دولي + بناء أدلة متينة + تمثيل احترافي',
    result: 'نجاح كامل وتعويضات',
    icon: Scale,
    highlight: 'تحكيم دولي',
    tags: ['تحكيم', 'دولي', 'نزاع تجاري', 'تعويضات'],
  },
  {
    category: 'حماية أصول',
    country: 'المملكة العربية السعودية',
    title: 'إعادة هيكلة قانونية لمجموعة استثمارية',
    desc: 'تولّينا إعادة الهيكلة القانونية الشاملة لمجموعة استثمارية تضم 12 شركة، بهدف حماية الأصول وتقليل المخاطر القانونية وتحسين الكفاءة التشغيلية.',
    strategy: 'هيكلة قانونية شاملة + حماية أصول + تحسين تشغيلي',
    result: 'حماية شاملة لـ 12 شركة',
    icon: Shield,
    highlight: 'هيكلة معقدة',
    tags: ['هيكلة', 'حماية أصول', 'مجموعة استثمارية', 'تحسين'],
  },
];

const partnerClients = [
  {
    name: 'مصنع بوند فودز للصناعات الغذائية',
    service: 'دعم إداري، مالي، قانوني، وتسليعي شامل',
    icon: Building2,
  },
  {
    name: 'مجموعة صيدليات الفخراني',
    service: 'المستشار القانوني والضريبي المعتمد',
    icon: Briefcase,
  },
  {
    name: 'شركة أركان للاستشارات الاقتصادية',
    service: 'المستشار القانوني داخل وخارج مصر',
    icon: Landmark,
  },
];

const stats = [
  { icon: Trophy, value: '98%', label: 'نسبة النجاح' },
  { icon: TrendingUp, value: '+5,500', label: 'قضية ناجحة' },
  { icon: Users, value: '+2,000', label: 'عميل يثق بنا' },
  { icon: Award, value: '+20', label: 'سنة خبرة' },
];

export default function Cases() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-transparent via-gold/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">سجل إنجازاتنا</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            نتائج <span className="text-gold">حقيقية</span> وقصص نجاح <span className="text-gold">مثبتة</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            لا نكتفي بالوعود — نقدّم نتائج مثبتة من واقع القضايا المعقدة التي تولّيناها. كل قضية هي شهادة على التزامنا بالتميز والإبداع في الدفاع عن حقوق موكلينا.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-14 bg-gradient-to-l from-gold to-gold-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon size={32} className="text-navy-dark mx-auto mb-2" />
                <p className="text-3xl md:text-4xl font-black text-navy-dark">{stat.value}</p>
                <p className="text-navy/70 font-medium text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Partners */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">شركاء النجاح</span>
            <h2 className="text-3xl font-black text-navy mb-4">كيانات <span className="text-gold">نتشرف بحمايتها</span></h2>
            <div className="section-divider"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {partnerClients.map((client, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 text-center card-hover gold-border-hover border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy-light rounded-xl mx-auto mb-5 flex items-center justify-center group-hover:from-gold group-hover:to-gold-light transition-all duration-500">
                  <client.icon size={28} className="text-gold group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-bold text-navy mb-2 group-hover:text-gold transition-colors">{client.name}</h3>
                <p className="text-gray-500 text-sm">{client.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Case Studies */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">قضايا حقيقية</span>
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
              أبرز <span className="text-gold">القضايا والإنجازات</span>
            </h2>
            <div className="section-divider mb-6"></div>
            <p className="text-gray-text max-w-2xl mx-auto text-lg">
              من واقع القضايا التي تولّيناها — قصص نجاح تثبت خبرتنا وقدرتنا على إدارة أصعب التحديات القانونية
            </p>
          </div>

          <div className="space-y-6">
            {realCases.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden card-hover gold-border-hover border border-gray-100 group"
              >
                <div className="grid md:grid-cols-12 gap-0">
                  {/* Case Icon + Number */}
                  <div className="md:col-span-1 bg-navy p-6 flex md:flex-col items-center justify-center gap-3">
                    <c.icon size={28} className="text-gold" />
                    <span className="text-white/40 text-xs font-black">#{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Case Content */}
                  <div className="md:col-span-8 p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1.5 rounded-full">{c.category}</span>
                      <span className="bg-navy/5 text-navy text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                        <MapPin size={10} />
                        {c.country}
                      </span>
                      {c.tags.slice(0, 3).map((tag, j) => (
                        <span key={j} className="bg-gray-100 text-gray-500 text-[11px] px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                      {c.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{c.desc}</p>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-navy text-xs font-bold mb-1">الاستراتيجية الدفاعية</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{c.strategy}</p>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="md:col-span-3 bg-gradient-to-b from-green-50 to-green-100/50 p-6 md:p-8 flex flex-col items-center justify-center text-center border-r-0 md:border-r border-t md:border-t-0 border-green-100">
                    <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={28} className="text-green-600" />
                    </div>
                    <h4 className="text-green-700 font-black text-lg mb-1">النتيجة</h4>
                    <p className="text-navy font-bold text-sm mb-3">{c.result}</p>
                    <span className="bg-gold/10 text-gold text-[11px] font-bold px-3 py-1 rounded-full">
                      {c.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Insights / SEO Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">خبرة متميزة</span>
            <h2 className="text-3xl font-black text-navy mb-4">
              لماذا تختار <span className="text-gold">صرح</span> للقضايا المعقدة؟
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Gavel,
                title: 'خبرة في القضايا العابرة للحدود',
                desc: 'نساعد العملاء في القضايا الدولية المعقدة عبر شبكة مكاتبنا الشريكة في الكويت ومصر ودول الخليج.',
              },
              {
                icon: Lock,
                title: 'سرية تامة واتفاقيات NDA',
                desc: 'نلتزم بأعلى معايير السرية المهنية مع تطبيق اتفاقيات عدم الإفصاح لجميع عملائنا.',
              },
              {
                icon: Banknote,
                title: 'شفافية في الأتعاب',
                desc: 'تُحدد الأتعاب بناءً على تعقيد القضية مع شفافية كاملة قبل البدء وأي رسوم مخفية.',
              },
              {
                icon: Scale,
                title: 'استراتيجية دفاع مخصصة',
                desc: 'كل قضية لها استراتيجية فريدة مصممة خصيصاً بناءً على تحليل معمق للوقائع والأدلة.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-gold/5 transition-colors duration-300">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon size={22} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-black text-white mb-4">كن قصة نجاحنا القادمة</h3>
          <p className="text-gray-300 mb-8 text-lg">
            دعنا نساعدك في تحقيق أهدافك القانونية — احجز استشارة الآن وابدأ بحماية أعمالك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 bg-gradient-to-l from-gold to-gold-light text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
            >
              <span>احجز استشارة الآن</span>
              <ArrowLeft size={20} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <span>استعرض خدماتنا</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
