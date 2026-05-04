import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SchemaLD from '../components/SchemaLD'
import FAQSection from '../sections/FAQSection'

export default function FAQPage() {
  return (
    <>
      <SEO
        title="الأسئلة الشائعة — صرح للخدمات القانونية"
        description="إجابات على أكثر الأسئلة شيوعاً حول كيفية التعامل مع صرح، أمان البيانات، التكلفة، والدعم المستمر للشركات."
        canonical="/faq"
      />
      <SchemaLD page="faq" />

      <main>
        <section className="bg-navy py-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
              الأسئلة <span className="text-gold">الشائعة</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link>
              <span className="text-gold">←</span>
              <span className="text-gold font-semibold">الأسئلة الشائعة</span>
            </div>
          </div>
        </section>
        <FAQSection />
        <section className="py-16 bg-gray-light text-center">
          <div className="max-w-xl mx-auto px-6">
            <h3 className="text-2xl font-black text-navy mb-4">لم تجد إجابة على سؤالك؟</h3>
            <p className="text-gray-text mb-8">تواصل معنا مباشرةً وسيجيبك فريقنا خلال ساعات</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              تواصل معنا الآن
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
