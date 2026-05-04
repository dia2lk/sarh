import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SchemaLD from '../components/SchemaLD'
import { BookOpen, Calendar, ArrowLeft } from 'lucide-react'

const articles = [
  {
    title: 'دليل تأسيس الشركات في مصر 2024 — الأنواع والإجراءات',
    excerpt: 'تعرف على أنواع الشركات التجارية في مصر، من الشركات ذات المسؤولية المحدودة إلى شركات المساهمة، مع شرح تفصيلي لإجراءات التأسيس والتكاليف المتوقعة.',
    date: 'نوفمبر 2024',
    category: 'قانون الشركات',
    readTime: '8 دقائق',
  },
  {
    title: 'ضريبة القيمة المضافة في مصر — دليل الشركات الشامل',
    excerpt: 'كل ما تحتاج معرفته عن ضريبة القيمة المضافة: الإعفاءات، معدلات الضريبة، مواعيد الإقرار، وكيفية تجنب الغرامات والعقوبات.',
    date: 'أكتوبر 2024',
    category: 'الضرائب والمحاسبة',
    readTime: '10 دقائق',
  },
  {
    title: 'العقود التجارية — أهم البنود الواجب مراجعتها قبل التوقيع',
    excerpt: 'تحليل قانوني معمق لأهم بنود العقود التجارية التي يغفل عنها كثير من رجال الأعمال، وكيف تحمي نفسك من المخاطر القانونية.',
    date: 'سبتمبر 2024',
    category: 'العقود القانونية',
    readTime: '7 دقائق',
  },
  {
    title: 'حوكمة الشركات — لماذا هي ضرورة وليست ترفاً',
    excerpt: 'شرح مفصل لمفهوم حوكمة الشركات وأهميتها في حماية المساهمين وضمان استدامة الأعمال، مع أمثلة عملية من الشركات المصرية.',
    date: 'أغسطس 2024',
    category: 'حوكمة الأعمال',
    readTime: '9 دقائق',
  },
  {
    title: 'قانون العمل المصري — حقوق وواجبات أصحاب العمل',
    excerpt: 'دليل شامل للمشغّلين حول قانون العمل المصري: عقود العمل، الإجازات، التأمينات الاجتماعية، وإجراءات إنهاء العمل.',
    date: 'يوليو 2024',
    category: 'قانون العمل',
    readTime: '11 دقيقة',
  },
  {
    title: 'التحكيم التجاري الدولي — بديل فعّال للتقاضي التقليدي',
    excerpt: 'تعرف على مزايا التحكيم التجاري الدولي في حل النزاعات التجارية بسرعة وسرية، وكيفية إدراج بنود التحكيم في عقودك.',
    date: 'يونيو 2024',
    category: 'التحكيم التجاري',
    readTime: '6 دقائق',
  },
]

export default function ArticlesPage() {
  return (
    <>
      <SEO
        title="المقالات القانونية والمحاسبية — صرح"
        description="مقالات قانونية ومحاسبية متخصصة من فريق خبراء صرح حول الشركات، الضرائب، والقانون التجاري المصري."
        canonical="/articles"
      />
      <SchemaLD page="default" />

      <main>
        {/* Hero */}
        <section className="bg-navy relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              المقالات القانونية و<span className="text-gold">المحاسبية</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              تحليلات ودراسات معمقة من فريق خبراء صرح في القانون والمحاسبة لمساعدتك على اتخاذ قرارات أعمال مدروسة.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link>
              <span className="text-gold">←</span>
              <span className="text-gold font-semibold">المقالات</span>
            </div>
          </div>
        </section>

        {/* Articles grid */}
        <section className="py-24 bg-gray-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(a => (
                <article key={a.title} className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover gold-border-hover group">
                  <div className="h-3 bg-gradient-to-l from-navy to-navy-light group-hover:from-gold group-hover:to-gold-light transition-all duration-500" />
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold text-gold border border-gold/20 bg-gold/5 px-3 py-1 rounded-full">
                        {a.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-navy mb-3 leading-snug group-hover:text-gold transition-colors">
                      {a.title}
                    </h2>
                    <p className="text-gray-text text-sm leading-relaxed mb-5">{a.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-text border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        {a.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-gold" />
                        {a.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-14">
              <p className="text-gray-text mb-6">هل تريد الاشتراك في نشرتنا القانونية الشهرية؟</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                اشترك في النشرة القانونية
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
