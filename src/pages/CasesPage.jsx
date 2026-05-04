import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SchemaLD from '../components/SchemaLD'
import CasesSection from '../sections/CasesSection'

export default function CasesPage() {
  return (
    <>
      <SEO
        title="الإنجازات — براءات في قضايا تزوير، رشوة، واتجار بالبشر"
        description="قصص نجاح حقيقية: براءة في قضية تزوير بالكويت عبر الحسابات الرياضية، جناية رشوة، واتجار بالبشر عابر للحدود."
        canonical="/cases"
      />
      <SchemaLD page="default" />

      <main>
        <section className="bg-navy py-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
              قصص نجاح من <span className="text-gold">واقع القضايا</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link>
              <span className="text-gold">←</span>
              <span className="text-gold font-semibold">الإنجازات</span>
            </div>
          </div>
        </section>
        <CasesSection />
        <section className="py-16 bg-white text-center">
          <div className="max-w-xl mx-auto px-6">
            <h3 className="text-2xl font-black text-navy mb-4">لديك قضية معقدة؟</h3>
            <p className="text-gray-text mb-8">نتولى الدفاع عنك بكامل خبرتنا وتاريخنا في تحقيق البراءات</p>
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              احجز استشارة مجانية
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
