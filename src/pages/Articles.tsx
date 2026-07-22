import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Scale, FileText, Banknote, Building2, Shield, AlertTriangle } from 'lucide-react';
import { trackCTAClick } from '../lib/analytics';

const articles = [
  {
    category: 'القانون الجنائي الاقتصادي',
    title: 'التعامل في النقد الأجنبي: الجرائم والعقوبات وكيفية الحماية القانونية',
    excerpt: 'دليل شامل حول الجرائم المتعلقة بالتعامل في النقد الأجنبي، العقوبات المقررة قانونياً، وكيف يمكن للشركات حماية نفسها من المخاطر القانونية في هذا المجال.',
    author: 'د. إسلام إبراهيم',
    date: '15 يناير 2025',
    readTime: '10 دقائق',
    featured: true,
    icon: Banknote,
    tags: ['نقد أجنبي', 'جرائم اقتصادية', 'حماية قانونية'],
  },
  {
    category: 'القانون المدني',
    title: 'إيصالات الأمانة: أحكامها القانونية وأخطاء شائعة تقع فيها',
    excerpt: 'كل ما تحتاج معرفته عن إيصالات الأمانة من الناحية القانونية، الفرق بين إيصال الأمانة والسند لأمر، وكيفية صياغتها بشكل صحيح.',
    author: 'د. إسلام إبراهيم',
    date: '10 يناير 2025',
    readTime: '8 دقائق',
    featured: false,
    icon: FileText,
    tags: ['إيصالات أمانة', 'قانون مدني', 'صياغة'],
  },
  {
    category: 'قانون العقارات',
    title: 'قانون الإيجار الجديد: أهم التغييرات وتأثيرها على أصحاب العقارات والمستأجرين',
    excerpt: 'نستعرض أبرز التعديلات في قانون الإيجار الجديد وحقوق والتزامات كل طرف وكيفية التعامل مع النزاعات الإيجارية.',
    author: 'د. إسلام إبراهيم',
    date: '5 يناير 2025',
    readTime: '7 دقائق',
    featured: false,
    icon: Building2,
    tags: ['إيجار', 'عقارات', 'قانون جديد'],
  },
  {
    category: 'قانون الشركات',
    title: 'تأسيس الشركات: دليلك الشامل لاختيار الهيكل القانوني الأمثل',
    excerpt: 'مقال تفصيلي يشرح أنواع الشركات المختلفة ومميزات كل نوع وكيفية اختيار الهيكل القانوني الأنسب لنشاطك التجاري.',
    author: 'د. إسلام إبراهيم',
    date: '28 ديسمبر 2024',
    readTime: '12 دقيقة',
    featured: false,
    icon: Scale,
    tags: ['تأسيس شركات', 'هيكل قانوني', 'حوكمة'],
  },
  {
    category: 'القانون الجنائي',
    title: 'جناية التزوير: أنواعه وعقوباته وكيفية إثبات براءتك',
    excerpt: 'شرح مفصل لجريمة التزوير بأنواعها المختلفة، العقوبات المقررة، والسبل القانونية للدفاع وإثبات البراءة.',
    author: 'د. إسلام إبراهيم',
    date: '20 ديسمبر 2024',
    readTime: '9 دقائق',
    featured: false,
    icon: AlertTriangle,
    tags: ['تزوير', 'قانون جنائي', 'دفاع'],
  },
  {
    category: 'الاستشارات الضريبية',
    title: 'الفاتورة الإلكترونية: متطلبات مصلحة الضرائب المصرية وكيفية الامتثال',
    excerpt: 'دليل شامل حول متطلبات منظومة الفاتورة الإلكترونية في مصر وخطوات الامتثال لتجنب الغرامات.',
    author: 'د. إسلام إبراهيم',
    date: '15 ديسمبر 2024',
    readTime: '6 دقائق',
    featured: false,
    icon: Shield,
    tags: ['فاتورة إلكترونية', 'مصلحة الضرائب', 'امتثال'],
  },
];

export default function Articles() {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-transparent via-gold/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">المقالات القانونية</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            رؤى <span className="text-gold">قانونية</span> وتحليلات <span className="text-gold">متخصصة</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            مقالات توعوية وتحليلية من خبراء صرح لمساعدتك في فهم التعقيدات القانونية واتخاذ القرارات الصحيحة
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-l from-navy to-navy-light rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
              <div className="relative grid md:grid-cols-2 gap-0">
                {/* Content */}
                <div className="p-10 md:p-12 flex flex-col justify-center">
                  <span className="bg-gold/20 text-gold text-xs font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 w-fit mb-6">
                    <featured.icon size={14} />
                    مقال مميز
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">{featured.title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8">
                    <span className="flex items-center gap-2">
                      <User size={14} />
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={14} />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} />
                      {featured.readTime}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featured.tags.map((tag, i) => (
                      <span key={i} className="bg-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => trackCTAClick('اقرأ المقال المميز', 'articles_featured', '#')}
                    className="inline-flex items-center gap-2 bg-gradient-to-l from-gold to-gold-light text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 w-fit"
                  >
                    <span>اقرأ المقال كاملاً</span>
                    <ArrowLeft size={18} />
                  </button>
                </div>

                {/* Visual */}
                <div className="hidden md:flex items-center justify-center p-12 relative">
                  <div className="w-64 h-64 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
                    <featured.icon size={80} className="text-gold" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-navy mb-4">جميع <span className="text-gold">المقالات</span></h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden card-hover gold-border-hover border border-gray-100 group cursor-pointer"
              >
                {/* Card Header */}
                <div className="h-48 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-20"></div>
                  <article.icon size={48} className="text-gold relative z-10" />
                  <span className="absolute top-4 right-4 bg-gold/20 text-gold text-[11px] font-bold px-3 py-1 rounded-full z-10">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300 leading-relaxed">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>

                  <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag, j) => (
                      <span key={j} className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
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
          <h3 className="text-3xl font-black text-white mb-4">هل تحتاج استشارة قانونية متخصصة؟</h3>
          <p className="text-gray-300 mb-8 text-lg">
            مقالاتنا تقدم المعرفة — لكن كل حالة قانونية فريدة وتحتاج تحليلاً مخصصاً
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-consultation"
              onClick={() => trackCTAClick('احجز استشارة', 'articles_cta', '/book-consultation')}
              className="inline-flex items-center gap-2 bg-gradient-to-l from-gold to-gold-light text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
            >
              <span>احجز استشارة الآن</span>
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
