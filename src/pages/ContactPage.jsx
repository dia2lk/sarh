import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SchemaLD from '../components/SchemaLD'
import ContactSection from '../sections/ContactSection'
import BranchesSection from '../sections/BranchesSection'

export default function ContactPage() {
  return (
    <>
      <SEO
        title="تواصل معنا — 01117819505 | بني سويف والجيزة"
        description="تواصل مع فريق صرح القانوني: 01117819505 أو 01035678474 أو legalsarh@gmail.com. فرعان في بني سويف والجيزة."
        canonical="/contact"
      />
      <SchemaLD page="default" />

      <main>
        {/* Breadcrumb */}
        <section className="bg-navy py-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
              تواصل <span className="text-gold">معنا</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link>
              <span className="text-gold">←</span>
              <span className="text-gold font-semibold">تواصل معنا</span>
            </div>
          </div>
        </section>
        <ContactSection />
        <BranchesSection />
      </main>
    </>
  )
}
