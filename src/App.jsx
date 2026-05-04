import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar          from './components/layout/Navbar'
import Footer          from './components/layout/Footer'
import WhatsAppButton  from './components/WhatsAppButton'
import Home            from './pages/Home'

/* Lazy-loaded pages — split into separate JS chunks */
const AboutPage   = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ContactPage  = lazy(() => import('./pages/ContactPage'))
const FAQPage      = lazy(() => import('./pages/FAQPage'))
const SectorsPage  = lazy(() => import('./pages/SectorsPage'))
const CasesPage    = lazy(() => import('./pages/CasesPage'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'))
const AIPage       = lazy(() => import('./pages/AIPage'))
const BookPage     = lazy(() => import('./pages/BookPage'))
const NotFound     = lazy(() => import('./pages/NotFound'))

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-gold border-t-transparent animate-spin" />
        <p className="text-navy font-semibold text-sm">جاري التحميل...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <header role="banner">
        <Navbar />
      </header>

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                  element={<Home />} />
          <Route path="/about"             element={<AboutPage />} />
          <Route path="/services"          element={<ServicesPage />} />
          <Route path="/contact"           element={<ContactPage />} />
          <Route path="/faq"               element={<FAQPage />} />
          <Route path="/sectors"           element={<SectorsPage />} />
          <Route path="/cases"             element={<CasesPage />} />
          <Route path="/articles"          element={<ArticlesPage />} />
          <Route path="/ai-consultation"   element={<AIPage />} />
          <Route path="/book-consultation" element={<BookPage />} />
          <Route path="*"                  element={<NotFound />} />
        </Routes>
      </Suspense>

      <footer role="contentinfo">
        <Footer />
      </footer>

      <WhatsAppButton />
    </>
  )
}
