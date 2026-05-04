import { Helmet } from 'react-helmet-async'

const SITE_URL  = 'https://sarh-law.com'
const SITE_NAME = 'صرح للخدمات القانونية والمحاسبية'
const DEFAULT_IMG = `${SITE_URL}/og-image.svg`

/**
 * SEO component — injects <head> meta tags per page.
 *
 * Props:
 *   title       – page title (appended with site name)
 *   description – meta description (max ~155 chars)
 *   canonical   – canonical URL path, e.g. '/services'
 *   image       – absolute OG image URL (defaults to site OG image)
 *   type        – OG type: 'website' | 'article' (default: 'website')
 *   noIndex     – set true to add noindex (e.g. /book-consultation confirmation)
 */
export default function SEO({
  title       = 'حلول قانونية ومحاسبية متكاملة',
  description = 'صرح للخدمات القانونية والمحاسبية — محامون ومحاسبون قانونيون معتمدون. نقدم استشارات قانونية، تأسيس شركات، محاسبة ضريبية، وتمثيل قانوني في القضايا المعقدة. فرعان في بني سويف والجيزة.',
  canonical   = '/',
  image       = DEFAULT_IMG,
  type        = 'website',
  noIndex     = false,
}) {
  const fullTitle    = `${title} | ${SITE_NAME}`
  const canonicalUrl = `${SITE_URL}${canonical}`

  return (
    <Helmet>
      {/* ── Primary ── */}
      <html lang="ar" dir="rtl" />
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      <meta name="keywords"           content="محامي, مستشار قانوني, محاسب قانوني, تأسيس شركات, استشارات قانونية, محاسبة ضريبية, بني سويف, الجيزة, مصر, صرح" />
      <meta name="author"             content={SITE_NAME} />
      <meta name="robots"             content={noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'} />
      <link  rel="canonical"          href={canonicalUrl} />

      {/* ── Open Graph (Facebook / LinkedIn) ── */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height"content="630" />
      <meta property="og:image:alt"   content={title} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="ar_EG" />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
      <meta name="twitter:site"        content="@sarh_law" />
      <meta name="twitter:creator"     content="@sarh_law" />

      {/* ── Geo / Business ── */}
      <meta name="geo.region"         content="EG" />
      <meta name="geo.placename"      content="بني سويف، الجيزة، مصر" />
      <meta name="geo.position"       content="29.0661;31.0994" />
      <meta name="ICBM"               content="29.0661, 31.0994" />

      {/* ── Mobile / PWA ── */}
      <meta name="theme-color"        content="#0f172a" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Helmet>
  )
}
