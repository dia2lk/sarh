import { Component, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import WhatsAppButton from './components/WhatsAppButton.tsx';
import FloatingChatbot from './components/FloatingChatbot.tsx';
import Seo from './components/Seo.tsx';
import StaffGate from './components/StaffGate.tsx';

const Home = lazy(() => import('./pages/Home.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Services = lazy(() => import('./pages/Services.tsx'));
const Sectors = lazy(() => import('./pages/Sectors.tsx'));
const Cases = lazy(() => import('./pages/Cases.tsx'));
const Articles = lazy(() => import('./pages/Articles.tsx'));
const FAQ = lazy(() => import('./pages/FAQ.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const BookConsultation = lazy(() => import('./pages/BookConsultation.tsx'));
const AIConsultation = lazy(() => import('./pages/AIConsultation.tsx'));
const LawyerCRM = lazy(() => import('./pages/LawyerCRM.tsx'));
const BillingDashboard = lazy(() => import('./pages/BillingDashboard.tsx'));
const Privacy = lazy(() => import('./pages/Privacy.tsx'));
const Terms = lazy(() => import('./pages/Terms.tsx'));

// ---- Error Boundary ----
class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean; error: string }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]" dir="rtl">
          <div className="text-center p-8">
            <div className="text-[#c29a56] text-6xl mb-4">⚖️</div>
            <h1 className="text-2xl font-bold text-white mb-4">حدث خطأ غير متوقع</h1>
            <p className="text-gray-400 mb-6">يرجى تحديث الصفحة والمحاولة مرة أخرى</p>
            <p className="text-red-400 text-sm mb-6 bg-red-900/20 p-3 rounded-lg max-w-md mx-auto">{this.state.error}</p>
            <button
              onClick={() => { this.setState({ hasError: false, error: '' }); window.location.reload(); }}
              className="bg-[#c29a56] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#a88340] transition-colors"
            >
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---- Scroll to Top on Route Change ----
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ---- Legacy Hash URL Redirect (old links like /#/about keep working) ----
function HashRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const { hash } = window.location;
    if (hash.startsWith('#/')) {
      navigate(hash.slice(1), { replace: true });
    }
  }, [navigate]);
  return null;
}

// ---- 404 Page ----
function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white" dir="rtl">
      <div className="text-center p-8">
        <p className="text-gold font-black text-7xl mb-4">404</p>
        <h1 className="text-2xl font-bold text-navy mb-3">الصفحة غير موجودة</h1>
        <p className="text-gray-500 mb-8">الرابط الذي تحاول الوصول إليه غير متاح أو تم نقله.</p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-l from-gold to-gold-light text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg transition-all"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}

// ---- App Layout ----
function AppLayout() {
  return (
    <>
      <Seo />
      <ScrollToTop />
      <HashRedirect />
      <div className="min-h-screen bg-white text-gray-800" dir="rtl">
        <Header />
        <main>
          <Suspense
            fallback={
              <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4" role="status" aria-label="جارٍ التحميل">
                <div className="w-10 h-10 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
                <span className="text-navy font-medium">جارٍ التحميل...</span>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/sectors" element={<Sectors />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-consultation" element={<BookConsultation />} />
              <Route path="/ai-consultation" element={<AIConsultation />} />
              <Route path="/crm" element={<StaffGate><LawyerCRM /></StaffGate>} />
              <Route path="/billing" element={<StaffGate><BillingDashboard /></StaffGate>} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
        <FloatingChatbot />
      </div>
    </>
  );
}

// ---- Root App ----
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
