import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Scale, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <SEO title="الصفحة غير موجودة — 404" description="" canonical="/404" noIndex={true} />
      <main className="min-h-screen bg-navy flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="relative text-center px-6">
          <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border border-gold/30"
            style={{background:'rgba(201,162,39,0.1)'}}>
            <Scale className="w-12 h-12 text-gold" />
          </div>
          <div className="text-8xl font-black text-gold mb-4">404</div>
          <h1 className="text-3xl font-black text-white mb-4">الصفحة غير موجودة</h1>
          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للرئيسية
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
