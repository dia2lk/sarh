import SEO            from '../components/SEO'
import SchemaLD        from '../components/SchemaLD'
import HeroSection     from '../sections/HeroSection'
import PartnersSection from '../sections/PartnersSection'
import ServicesSection from '../sections/ServicesSection'
import CasesSection    from '../sections/CasesSection'
import SectorsSection  from '../sections/SectorsSection'
import StatsSection    from '../sections/StatsSection'
import TimelineSection from '../sections/TimelineSection'
import WhyUsSection    from '../sections/WhyUsSection'
import FAQSection      from '../sections/FAQSection'
import AISection       from '../sections/AISection'
import BranchesSection from '../sections/BranchesSection'
import ContactSection  from '../sections/ContactSection'
import FooterCTA       from '../sections/FooterCTA'

export default function Home() {
  return (
    <>
      <SEO
        title="حلول قانونية ومحاسبية متكاملة"
        description="صرح للخدمات القانونية والمحاسبية — محامون ومحاسبون قانونيون. تأسيس شركات، استشارات ضريبية، تمثيل قانوني. فرعان في بني سويف والجيزة. اتصل: 01117819505"
        canonical="/"
      />
      <SchemaLD page="home" />

      <main>
        <HeroSection />
        <PartnersSection />
        <ServicesSection />
        <CasesSection />
        <SectorsSection />
        <StatsSection />
        <TimelineSection />
        <WhyUsSection />
        <FAQSection />
        <AISection />
        <BranchesSection />
        <ContactSection />
        <FooterCTA />
      </main>
    </>
  )
}
