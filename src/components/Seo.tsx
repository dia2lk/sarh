import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'صرح للخدمات القانونية والمحاسبية | محامون ومحاسبون قانونيون',
    description: 'حلول قانونية ومحاسبية متكاملة لحماية أعمالكم وتعزيز نموكم بثقة واستقرار.',
  },
  '/about': {
    title: 'من نحن | صرح للخدمات القانونية والمحاسبية',
    description: 'تعرف على خبرة فريق صرح في القانون والمحاسبة والحوكمة.',
  },
  '/services': {
    title: 'خدماتنا | صرح للخدمات القانونية والمحاسبية',
    description: 'خدمات تأسيس الشركات، صياغة العقود، الاستشارات الضريبية والتمثيل القانوني.',
  },
  '/sectors': {
    title: 'القطاعات | صرح للخدمات القانونية والمحاسبية',
    description: 'حلول قانونية ومحاسبية مخصصة للقطاعات المختلفة.',
  },
  '/cases': {
    title: 'الإنجازات | صرح للخدمات القانونية والمحاسبية',
    description: 'اكتشف إنجازات فريق صرح في القضايا والعمليات القانونية المعقدة.',
  },
  '/articles': {
    title: 'المقالات | صرح للخدمات القانونية والمحاسبية',
    description: 'مقالات قانونية ومحاسبية حديثة ومفيدة لرواد الأعمال.',
  },
  '/faq': {
    title: 'الأسئلة الشائعة | صرح للخدمات القانونية والمحاسبية',
    description: 'إجابات واضحة عن أكثر الأسئلة القانونية والمحاسبية شيوعاً.',
  },
  '/contact': {
    title: 'تواصل معنا | صرح للخدمات القانونية والمحاسبية',
    description: 'تواصل مع فريق صرح عبر الهاتف أو واتساب أو نموذج الحجز.',
  },
  '/book-consultation': {
    title: 'احجز استشارة | صرح للخدمات القانونية والمحاسبية',
    description: 'احجز استشارة أولية مع نخبة من الخبراء القانونيين والمحاسبين.',
  },
  '/ai-consultation': {
    title: 'المستشار الذكي | صرح للخدمات القانونية والمحاسبية',
    description: 'استشر الذكاء الاصطناعي في المسائل القانونية العامة مع انتقال مباشر إلى الاستشارة البشرية.',
  },
  '/crm': {
    title: 'لوحة تحكم المحامين | صرح للخدمات القانونية والمحاسبية',
    description: 'منصة إدارة علاقات العملاء وإدارة الاستشارات والملفات.',
  },
  '/billing': {
    title: 'نظام الفوترة | صرح للخدمات القانونية والمحاسبية',
    description: 'أدوات إدارة الفواتير والملفات المالية بشكل فعّال.',
  },
  '/privacy': {
    title: 'سياسة الخصوصية | صرح للخدمات القانونية والمحاسبية',
    description: 'كيف نجمع بياناتكم ونستخدمها ونحميها وفق قواعد السرية المهنية.',
  },
  '/terms': {
    title: 'الشروط والأحكام | صرح للخدمات القانونية والمحاسبية',
    description: 'قواعد استخدام موقع وخدمات صرح للخدمات القانونية والمحاسبية.',
  },
};

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://app.sarh-law.com';

/** Create-or-update a <meta> tag identified by name= or property= */
function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export default function Seo() {
  const location = useLocation();

  useEffect(() => {
    const current = ROUTE_META[location.pathname] || ROUTE_META['/'];
    const url = `${SITE_URL}${location.pathname === '/' ? '' : location.pathname}`;

    document.title = current.title;
    setMeta('name', 'description', current.description);

    // Canonical (created if missing)
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Open Graph + Twitter
    setMeta('property', 'og:title', current.title);
    setMeta('property', 'og:description', current.description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', current.title);
    setMeta('name', 'twitter:description', current.description);

    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, [location.pathname]);

  return null;
}
