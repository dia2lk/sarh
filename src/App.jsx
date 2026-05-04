import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect }   from 'react'
import Navbar          from './components/layout/Navbar'
import Footer          from './components/layout/Footer'
import SEO             from './components/SEO'
import SchemaLD        from './components/SchemaLD'
import Home            from './pages/Home'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

/* Generic inner page — semantic article wrapper */
function InnerPage({ title, description, canonical, schemaPage }) {
  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <SchemaLD page={schemaPage || 'default'} />
      <main>
        <article className="min-h-screen flex items-center justify-center bg-gray-light">
          <div className="text-center px-4">
            <div className="text-6xl mb-4">⚖️</div>
            <h1 className="text-3xl font-black text-navy mb-3">{title}</h1>
            <p className="text-gray-text text-lg">هذه الصفحة قيد التطوير</p>
          </div>
        </article>
      </main>
    </>
  )
}

const innerPages = [
  {
    path:      '/about',
    title:     'من نحن — د. إسلام إبراهيم وفريق صرح',
    desc:      'تعرف على فريق صرح للخدمات القانونية والمحاسبية. خبرة قانونية منذ 2004، فرعان في بني سويف والجيزة، براءات في قضايا دولية.',
    canonical: '/about',
  },
  {
    path:      '/services',
    title:     'خدماتنا — تأسيس شركات، عقود، محاسبة، تمثيل قانوني',
    desc:      'خدمات قانونية ومحاسبية متكاملة: تأسيس الشركات، صياغة العقود، الاستشارات الضريبية، التمثيل في القضايا المعقدة.',
    canonical: '/services',
  },
  {
    path:      '/sectors',
    title:     'القطاعات — مصرفي، عقاري، صحي، صناعي وأكثر',
    desc:      'صرح تخدم قطاعات متعددة: المصرفي، الحكومي، العقاري، الصحي، الصناعي، التعليمي، السياحي، والطاقة المتجددة.',
    canonical: '/sectors',
  },
  {
    path:      '/cases',
    title:     'الإنجازات — براءات في قضايا تزوير، رشوة، واتجار بالبشر',
    desc:      'قصص نجاح حقيقية: براءة في قضية تزوير بالكويت عبر الحسابات الرياضية، جناية رشوة، واتجار بالبشر عابر للحدود.',
    canonical: '/cases',
  },
  {
    path:      '/articles',
    title:     'المقالات القانونية والمحاسبية',
    desc:      'مقالات قانونية ومحاسبية متخصصة من فريق خبراء صرح حول الشركات، الضرائب، والقانون التجاري المصري.',
    canonical: '/articles',
  },
  {
    path:      '/faq',
    title:     'الأسئلة الشائعة — صرح للخدمات القانونية',
    desc:      'إجابات على أكثر الأسئلة شيوعاً حول كيفية التعامل مع صرح، أمان البيانات، التكلفة، والدعم المستمر للشركات.',
    canonical: '/faq',
    schema:    'faq',
  },
  {
    path:      '/contact',
    title:     'تواصل معنا — 01117819505 | بني سويف والجيزة',
    desc:      'تواصل مع فريق صرح القانوني: 01117819505 أو 01035678474 أو info@sarh-law.com. فرعان في بني سويف والجيزة.',
    canonical: '/contact',
  },
  {
    path:      '/ai-consultation',
    title:     'المستشار القانوني الذكي — إرشادات فورية بالذكاء الاصطناعي',
    desc:      'احصل على إرشادات قانونية مبدئية فورية مجانية عبر مستشار صرح الذكي. متاح 24/7 لأسئلة الشركات والعقود والضرائب.',
    canonical: '/ai-consultation',
    schema:    'ai',
  },
  {
    path:      '/book-consultation',
    title:     'احجز استشارة مجانية — 30 دقيقة مع خبير قانوني',
    desc:      'احجز استشارتك القانونية الأولى مجاناً مع فريق صرح المتخصص. تقييم وضعك القانوني وتحديد مسار العمل في 30 دقيقة.',
    canonical: '/book-consultation',
    noIndex:   true,
  },
]

export default function App() {
  return (
    <>
      <ScrollTop />
      <header role="banner">
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        {innerPages.map(p => (
          <Route
            key={p.path}
            path={p.path}
            element={
              <InnerPage
                title={p.title}
                description={p.desc}
                canonical={p.canonical}
                schemaPage={p.schema}
                noIndex={p.noIndex}
              />
            }
          />
        ))}
        <Route path="*" element={<Home />} />
      </Routes>

      <footer role="contentinfo">
        <Footer />
      </footer>
    </>
  )
}
