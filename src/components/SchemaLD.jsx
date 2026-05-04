import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://sarh-law.com'

/* ── LegalService (primary entity) ── */
const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type':    'LegalService',
  '@id':      `${SITE_URL}/#legal-service`,
  name:       'صرح للخدمات القانونية والمحاسبية',
  alternateName: 'Sarh Legal & Accounting Services',
  description:'منظومة قانونية ومحاسبية متكاملة، مصممة لدعم الشركات والمؤسسات في إدارة المخاطر، الامتثال، وتحقيق النمو بثقة واستقرار.',
  url:        SITE_URL,
  logo:       `${SITE_URL}/logo.png`,
  image:      `${SITE_URL}/og-image.jpg`,
  telephone:  ['+201117819505', '+201035678474'],
  email:      'legalsarh@gmail.com',
  foundingDate: '2004',
  founder: {
    '@type': 'Person',
    name:    'د. إسلام إبراهيم',
  },
  areaServed: [
    { '@type': 'City', name: 'بني سويف' },
    { '@type': 'City', name: 'الجيزة' },
    { '@type': 'Country', name: 'مصر' },
  ],
  address: [
    {
      '@type':           'PostalAddress',
      streetAddress:     'كورنيش النيل - برج الصفوة - الدور الأول - أعلى ديسباسيتو - بجوار هيئة الرقابة المالية',
      addressLocality:   'بني سويف',
      addressCountry:    'EG',
    },
    {
      '@type':           'PostalAddress',
      streetAddress:     'القرية الذكية - مبني نورث سايد - الدور الأول',
      addressLocality:   'الجيزة',
      addressCountry:    'EG',
    },
  ],
  openingHoursSpecification: {
    '@type':     'OpeningHoursSpecification',
    dayOfWeek:   ['Sunday','Monday','Tuesday','Wednesday','Thursday'],
    opens:       '09:00',
    closes:      '18:00',
  },
  sameAs: [
    `https://wa.me/201117819505`,
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name:    'الخدمات القانونية والمحاسبية',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تأسيس الشركات وحوكمة الأعمال' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'صياغة ومراجعة العقود الاستراتيجية' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'الاستشارات الضريبية والمحاسبية' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'التمثيل القانوني في القضايا المعقدة' } },
    ],
  },
  aggregateRating: {
    '@type':       'AggregateRating',
    ratingValue:   '4.9',
    reviewCount:   '248',
    bestRating:    '5',
    worstRating:   '1',
  },
}

/* ── SoftwareApplication (AI consultant feature) ── */
const aiAppSchema = {
  '@context':        'https://schema.org',
  '@type':           'SoftwareApplication',
  '@id':             `${SITE_URL}/#ai-app`,
  name:              'المستشار القانوني الذكي — صرح',
  applicationCategory: 'LegalApplication',
  operatingSystem:   'Web',
  description:       'مستشار قانوني ذكي يقدم إرشادات قانونية مبدئية فورية مدعوم بالذكاء الاصطناعي، متاح على مدار الساعة.',
  url:               `${SITE_URL}/ai-consultation`,
  offers: {
    '@type':    'Offer',
    price:      '0',
    priceCurrency: 'EGP',
    description: 'إرشادات قانونية مبدئية مجانية',
  },
  provider: {
    '@type': 'LegalService',
    name:    'صرح للخدمات القانونية والمحاسبية',
    url:     SITE_URL,
  },
}

/* ── BreadcrumbList for homepage ── */
const breadcrumbSchema = {
  '@context':  'https://schema.org',
  '@type':     'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'الرئيسية',  item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'خدماتنا',   item: `${SITE_URL}/services` },
    { '@type': 'ListItem', position: 3, name: 'تواصل معنا', item: `${SITE_URL}/contact` },
  ],
}

/* ── FAQ ── */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type':        'Question',
      name:           'كيف أبدأ التعامل مع صرح؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'من خلال حجز استشارة أولية لتقييم وضعك القانوني وتحديد الحل المناسب. يمكنك الحجز مباشرة عبر نموذج الحجز على الموقع أو التواصل عبر واتساب أو الاتصال المباشر.',
      },
    },
    {
      '@type':        'Question',
      name:           'هل بياناتي ومستنداتي آمنة؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'نلتزم بأعلى معايير حماية البيانات والتشفير End-to-End مع تطبيق اتفاقيات سرية صارمة NDA.',
      },
    },
    {
      '@type':        'Question',
      name:           'كيف يتم تحديد التكلفة؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'تُحدد بناءً على نطاق وتعقيد الخدمة مع شفافية كاملة قبل التنفيذ وإمكانية الاتفاق على خطط دفع مرنة.',
      },
    },
    {
      '@type':        'Question',
      name:           'هل تقدمون دعم مستمر للشركات؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'نعم، نوفر خدمات مستشار قانوني دائم مع باقات اشتراك شهرية تشمل استشارات غير محدودة ومراجعة العقود.',
      },
    },
  ],
}

export default function SchemaLD({ page = 'home' }) {
  const schemas = [legalServiceSchema, breadcrumbSchema]
  if (page === 'home') schemas.push(faqSchema, aiAppSchema)
  if (page === 'ai')   schemas.push(aiAppSchema)
  if (page === 'faq')  schemas.push(faqSchema)

  return (
    <Helmet>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
