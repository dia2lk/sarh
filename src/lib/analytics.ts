// ============================================
// 🏗️ Advanced Lead Infrastructure v3.0
// Company: صرح للخدمات القانونية والمحاسبية
// Architecture: Decoupled (WP + React via GTM)
// ============================================

// ---- Types ----
interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

interface LeadData {
  service_type?: string;
  lead_source?: string;
  lead_medium?: string;
  form_name?: string;
  form_step?: number;
  field_name?: string;
  field_type?: string;
  consultation_type?: string;
  preferred_date?: string;
  preferred_time?: string;
  [key: string]: unknown;
}

interface PageViewData {
  page_title: string;
  page_path: string;
  page_location: string;
  content_group?: string;
}

// ============================================
// 🔥 UTM PERSISTENCE (Cross-Platform Tracking)
// WP (sarh-law.com) → React (app.sarh-law.com)
// ============================================

const UTM_STORAGE_KEY = 'sarh_utm_data';
const SESSION_KEY = 'sarh_session';
const JOURNEY_KEY = 'sarh_journey';
const UTM_EXPIRY_DAYS = 30;

interface UTMData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid?: string;
  gclid?: string;
  first_touch_date: string;
  last_touch_date: string;
  landing_page: string;
  referrer: string;
}

// Capture & Persist UTM Parameters
export function captureUTM(): UTMData {
  if (typeof window === 'undefined') {
    return getEmptyUTM();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const hasUTM = urlParams.has('utm_source') || urlParams.has('fbclid') || urlParams.has('gclid');

  if (hasUTM) {
    const utmData: UTMData = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
      fbclid: urlParams.get('fbclid') || undefined,
      gclid: urlParams.get('gclid') || undefined,
      first_touch_date: new Date().toISOString(),
      last_touch_date: new Date().toISOString(),
      landing_page: window.location.href,
      referrer: document.referrer || 'direct',
    };

    // Persist to localStorage (survives cross-domain navigation)
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
    return utmData;
  }

  // Return existing persisted UTM or empty
  return getPersistedUTM();
}

function getEmptyUTM(): UTMData {
  return {
    utm_source: 'direct',
    utm_medium: 'organic',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    first_touch_date: '',
    last_touch_date: '',
    landing_page: '',
    referrer: '',
  };
}

export function getPersistedUTM(): UTMData {
  if (typeof window === 'undefined') return getEmptyUTM();
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as UTMData;
      // Check expiry
      const firstTouch = new Date(data.first_touch_date);
      const daysSince = (Date.now() - firstTouch.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince > UTM_EXPIRY_DAYS) {
        localStorage.removeItem(UTM_STORAGE_KEY);
        return getEmptyUTM();
      }
      return data;
    }
  } catch {
    // Ignore parse errors
  }
  return getEmptyUTM();
}

// Update last touch date
function updateLastTouch(utm: UTMData): void {
  utm.last_touch_date = new Date().toISOString();
  if (typeof window !== 'undefined') {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  }
}

// ============================================
// 🔥 SESSION TRACKING
// ============================================

interface SessionData {
  session_id: string;
  session_start: string;
  page_views: number;
  platform_origin: 'wordpress' | 'react' | 'unknown';
  journey_steps: JourneyStep[];
}

interface JourneyStep {
  timestamp: string;
  page: string;
  action: string;
  platform: 'wp' | 'react';
}

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getSession(): SessionData {
  if (typeof window === 'undefined') {
    return {
      session_id: '',
      session_start: '',
      page_views: 0,
      platform_origin: 'unknown',
      journey_steps: [],
    };
  }

  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      return JSON.parse(stored) as SessionData;
    }
  } catch {
    // Ignore
  }

  // Detect platform origin
  const referrer = document.referrer;
  let platformOrigin: 'wordpress' | 'react' | 'unknown' = 'unknown';
  if (referrer.includes('sarh-law.com') && !referrer.includes('app.')) {
    platformOrigin = 'wordpress';
  } else if (referrer.includes('app.sarh-law.com')) {
    platformOrigin = 'react';
  }

  // Check for WP→React transition marker in URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('from_wp') || urlParams.has('wp_ref')) {
    platformOrigin = 'wordpress';
  }

  const session: SessionData = {
    session_id: generateSessionId(),
    session_start: new Date().toISOString(),
    page_views: 0,
    platform_origin: platformOrigin,
    journey_steps: [],
  };

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function updateSession(session: SessionData): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
}

// Add journey step
function addJourneyStep(page: string, action: string, platform: 'wp' | 'react'): void {
  const session = getSession();
  session.journey_steps.push({
    timestamp: new Date().toISOString(),
    page,
    action,
    platform,
  });
  session.page_views++;
  updateSession(session);

  // Also persist journey in localStorage for cross-session analysis
  try {
    const journeyStr = localStorage.getItem(JOURNEY_KEY);
    const journey: JourneyStep[] = journeyStr ? JSON.parse(journeyStr) : [];
    journey.push({
      timestamp: new Date().toISOString(),
      page,
      action,
      platform,
    });
    // Keep only last 50 steps
    if (journey.length > 50) journey.splice(0, journey.length - 50);
    localStorage.setItem(JOURNEY_KEY, JSON.stringify(journey));
  } catch {
    // Ignore
  }
}

// ============================================
// 🔥 CROSS-PLATFORM JOURNEY TRACKING
// WP → React Funnel
// ============================================

export function detectPlatformTransition(): { 
  isTransition: boolean; 
  from: string; 
  wpReferrer?: string;
} {
  if (typeof window === 'undefined') return { isTransition: false, from: 'unknown' };

  const urlParams = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  
  // Check for explicit WP→React markers
  const wpRef = urlParams.get('wp_ref') || urlParams.get('from_wp');
  if (wpRef) {
    return { isTransition: true, from: 'wordpress', wpReferrer: wpRef };
  }

  // Check referrer
  if (referrer.includes('sarh-law.com') && !referrer.includes('app.')) {
    return { isTransition: true, from: 'wordpress', wpReferrer: referrer };
  }

  return { isTransition: false, from: 'direct' };
}

// ============================================
// 📊 DataLayer Push (Core)
// ============================================

export function pushToDataLayer(data: DataLayerEvent): void {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    // Enrich with session + UTM data
    const session = getSession();
    const utm = getPersistedUTM();
    updateLastTouch(utm);

    const enrichedData = {
      ...data,
      session_id: session.session_id,
      platform_origin: session.platform_origin,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      first_touch_date: utm.first_touch_date,
    };

    (window as any).dataLayer.push(enrichedData);

    // Debug logging
    if ((window as any).__DL_DEBUG__) {
      console.log('%c📊 DataLayer Push:', 'color: #C9A24A; font-weight: bold;', enrichedData);
    }
  }
}

// ---- Get UTM as plain object (for forms/submissions) ----
function getUTMParams(): Record<string, string> {
  const utm = getPersistedUTM();
  return {
    utm_source: utm.utm_source || 'direct',
    utm_medium: utm.utm_medium || 'organic',
    utm_campaign: utm.utm_campaign || '',
    utm_content: utm.utm_content || '',
    utm_term: utm.utm_term || '',
  };
}

// ---- Detect Lead Source ----
function detectLeadSource(): string {
  const utm = getPersistedUTM();
  if (utm.utm_source && utm.utm_source !== 'direct') return utm.utm_source;
  
  if (typeof window === 'undefined') return 'direct';
  const referrer = document.referrer;
  
  if (referrer.includes('facebook') || referrer.includes('fb.')) return 'facebook';
  if (referrer.includes('instagram')) return 'instagram';
  if (referrer.includes('linkedin')) return 'linkedin';
  if (referrer.includes('twitter') || referrer.includes('x.com')) return 'twitter';
  if (referrer.includes('google.com/maps')) return 'google_maps';
  if (referrer.includes('google')) return 'google';
  if (referrer.includes('sarh-law.com') && !referrer.includes('app.')) return 'wordpress_site';
  return 'direct';
}

// ============================================
// 📊 TRACKING FUNCTIONS
// ============================================

// ---- 1. Page View Tracking ----
export function trackPageView(pageTitle: string, pagePath: string, contentGroup?: string): void {
  const transition = detectPlatformTransition();
  
  pushToDataLayer({
    event: 'page_view',
    page_title: pageTitle,
    page_path: pagePath,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    content_group: contentGroup || 'general',
    is_cross_platform_transition: transition.isTransition,
    ...getUTMParams(),
  });

  addJourneyStep(pagePath, 'page_view', 'react');
}

// ---- 2. Virtual Page View (SPA) ----
export function trackVirtualPageView(data: PageViewData): void {
  const transition = detectPlatformTransition();
  
  pushToDataLayer({
    event: 'virtual_page_view',
    ...data,
    is_cross_platform_transition: transition.isTransition,
    cross_platform_from: transition.isTransition ? transition.from : '',
    ...getUTMParams(),
  });

  addJourneyStep(data.page_path, 'virtual_page_view', 'react');
}

// ---- 3. Lead Submitted (🔥 Core Conversion) ----
export function trackLeadSubmitted(data: LeadData): void {
  const session = getSession();
  const utm = getPersistedUTM();
  
  pushToDataLayer({
    event: 'lead_submitted',
    event_category: 'engagement',
    event_label: data.form_name || 'unknown_form',
    service_type: data.service_type || 'general',
    lead_source: data.lead_source || detectLeadSource(),
    lead_medium: getUTMParams().utm_medium,
    form_name: data.form_name || 'unknown',
    consultation_type: data.consultation_type || data.service_type || 'general',
    session_id: session.session_id,
    session_page_views: session.page_views,
    platform_origin: session.platform_origin,
    journey_length: session.journey_steps.length,
    first_touch_date: utm.first_touch_date,
    time_to_conversion: utm.first_touch_date 
      ? Math.round((Date.now() - new Date(utm.first_touch_date).getTime()) / 1000) 
      : 0,
    fbclid: utm.fbclid || '',
    gclid: utm.gclid || '',
    ...getUTMParams(),
    timestamp: new Date().toISOString(),
  });

  addJourneyStep(data.form_name || 'form', 'lead_submitted', 'react');
}

// ---- 4. Lead Success / Thank You Page ----
export function trackLeadSuccess(data: LeadData): void {
  pushToDataLayer({
    event: 'lead_success_page_view',
    event_category: 'conversion',
    event_label: 'thank_you_page',
    service_type: data.service_type || 'general',
    lead_source: data.lead_source || detectLeadSource(),
    lead_medium: getUTMParams().utm_medium,
    consultation_type: data.consultation_type || data.service_type || 'general',
    preferred_date: data.preferred_date || '',
    preferred_time: data.preferred_time || '',
    ...getUTMParams(),
    timestamp: new Date().toISOString(),
  });

  addJourneyStep('thank_you', 'lead_success', 'react');
}

// ---- 5. CTA Click Tracking ----
export function trackCTAClick(ctaName: string, ctaLocation: string, destinationUrl?: string): void {
  pushToDataLayer({
    event: 'cta_click',
    event_category: 'engagement',
    event_label: ctaName,
    cta_name: ctaName,
    cta_location: ctaLocation,
    destination_url: destinationUrl || '',
    lead_source: detectLeadSource(),
    ...getUTMParams(),
  });
}

// ---- 6. WhatsApp Click ----
export function trackWhatsAppClick(source: string): void {
  pushToDataLayer({
    event: 'whatsapp_click',
    event_category: 'engagement',
    event_label: 'whatsapp_contact',
    whatsapp_source: source,
    lead_source: detectLeadSource(),
    ...getUTMParams(),
  });
}

// ---- 7. Phone Click ----
export function trackPhoneClick(phoneNumber: string, source: string): void {
  pushToDataLayer({
    event: 'phone_click',
    event_category: 'engagement',
    event_label: 'phone_contact',
    phone_number: phoneNumber,
    phone_source: source,
    ...getUTMParams(),
  });
}

// ---- 8. Email Click ----
export function trackEmailClick(email: string, source: string): void {
  pushToDataLayer({
    event: 'email_click',
    event_category: 'engagement',
    event_label: 'email_contact',
    email_address: email,
    email_source: source,
    ...getUTMParams(),
  });
}

// ---- 9. Form Step Change (Funnel) ----
export function trackFormStepChange(formName: string, fromStep: number, toStep: number, formData?: Record<string, unknown>): void {
  pushToDataLayer({
    event: 'form_step_change',
    event_category: 'form_progress',
    event_label: `${formName}_step_${toStep}`,
    form_name: formName,
    form_step_from: fromStep,
    form_step_to: toStep,
    form_progress: `${toStep}/3`,
    ...formData,
    ...getUTMParams(),
  });
}

// ---- 10. Form Field Interaction (Drop-off Tracking) ----
export function trackFormFieldFocus(formName: string, fieldName: string, fieldType: string, step?: number): void {
  pushToDataLayer({
    event: 'form_field_focus',
    event_category: 'form_interaction',
    event_label: `${formName}_${fieldName}`,
    form_name: formName,
    field_name: fieldName,
    field_type: fieldType,
    form_step: step || 1,
  });
}

// ---- 11. Form Started ----
export function trackFormStarted(formName: string, firstField: string): void {
  pushToDataLayer({
    event: 'form_started',
    event_category: 'engagement',
    event_label: formName,
    form_name: formName,
    first_field: firstField,
    lead_source: detectLeadSource(),
    ...getUTMParams(),
  });
}

// ---- 12. Scroll Depth Tracking ----
let scrollTracked: Set<number> = new Set();
export function trackScrollDepth(pagePath: string): void {
  if (typeof window === 'undefined') return;
  const scrollPercentage = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );
  const milestones = [25, 50, 75, 90, 100];
  milestones.forEach((milestone) => {
    if (scrollPercentage >= milestone && !scrollTracked.has(milestone)) {
      scrollTracked.add(milestone);
      pushToDataLayer({
        event: 'scroll_depth',
        event_category: 'engagement',
        event_label: `${milestone}%`,
        scroll_percentage: milestone,
        page_path: pagePath,
      });
    }
  });
}

export function resetScrollTracking(): void {
  scrollTracked = new Set();
}

// ---- 13. Service Card Click ----
export function trackServiceCardClick(serviceName: string, source: string): void {
  pushToDataLayer({
    event: 'service_card_click',
    event_category: 'engagement',
    event_label: serviceName,
    service_name: serviceName,
    card_source: source,
    ...getUTMParams(),
  });
}

// ---- 14. Sector Card Click ----
export function trackSectorCardClick(sectorName: string): void {
  pushToDataLayer({
    event: 'sector_card_click',
    event_category: 'engagement',
    event_label: sectorName,
    sector_name: sectorName,
    ...getUTMParams(),
  });
}

// ---- 15. FAQ Interaction ----
export function trackFAQInteraction(question: string, action: 'open' | 'close'): void {
  pushToDataLayer({
    event: 'faq_interaction',
    event_category: 'engagement',
    event_label: question,
    faq_action: action,
    faq_question: question,
  });
}

// ---- 16. Navigation Click ----
export function trackNavClick(linkName: string, linkDestination: string, linkType: 'main' | 'mobile' | 'topbar' | 'footer'): void {
  pushToDataLayer({
    event: 'nav_click',
    event_category: 'navigation',
    event_label: linkName,
    nav_link: linkName,
    nav_destination: linkDestination,
    nav_type: linkType,
  });
}

// ---- 17. Outbound Click ----
export function trackOutboundClick(url: string, linkText: string): void {
  pushToDataLayer({
    event: 'outbound_click',
    event_category: 'outbound',
    event_label: url,
    outbound_url: url,
    link_text: linkText,
  });
}

// ---- 18. Article View ----
export function trackArticleView(articleTitle: string, articleCategory: string): void {
  pushToDataLayer({
    event: 'article_view',
    event_category: 'content',
    event_label: articleTitle,
    article_title: articleTitle,
    article_category: articleCategory,
    ...getUTMParams(),
  });
}

// ---- 19. Cross-Platform Transition ----
export function trackPlatformTransition(from: string, to: string, wpPage?: string): void {
  pushToDataLayer({
    event: 'cross_platform_transition',
    event_category: 'navigation',
    event_label: `${from}_to_${to}`,
    transition_from: from,
    transition_to: to,
    wp_referrer_page: wpPage || '',
    ...getUTMParams(),
  });
}

// ============================================
// 🏗️ SUPABASE-READY INTEGRATION
// ============================================

interface SupabaseLeadPayload {
  form_name: string;
  service_type: string;
  consultation_type: string;
  name: string;
  phone: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
  description: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  gclid: string;
  lead_source: string;
  session_id: string;
  platform_origin: string;
  first_touch_date: string;
  landing_page: string;
  journey_steps: number;
  page_views: number;
  time_to_conversion: number;
  created_at: string;
}

export function prepareSupabasePayload(formData: Record<string, string>): SupabaseLeadPayload {
  const utm = getPersistedUTM();
  const session = getSession();

  return {
    form_name: formData.form_name || 'unknown',
    service_type: formData.service_type || 'general',
    consultation_type: formData.consultation_type || formData.service_type || 'general',
    name: formData.name || '',
    phone: formData.phone || '',
    email: formData.email || '',
    preferred_date: formData.preferred_date || '',
    preferred_time: formData.preferred_time || '',
    description: formData.description || '',
    utm_source: utm.utm_source || 'direct',
    utm_medium: utm.utm_medium || 'organic',
    utm_campaign: utm.utm_campaign || '',
    utm_content: utm.utm_content || '',
    utm_term: utm.utm_term || '',
    fbclid: utm.fbclid || '',
    gclid: utm.gclid || '',
    lead_source: detectLeadSource(),
    session_id: session.session_id,
    platform_origin: session.platform_origin,
    first_touch_date: utm.first_touch_date,
    landing_page: utm.landing_page,
    journey_steps: session.journey_steps.length,
    page_views: session.page_views,
    time_to_conversion: utm.first_touch_date
      ? Math.round((Date.now() - new Date(utm.first_touch_date).getTime()) / 1000)
      : 0,
    created_at: new Date().toISOString(),
  };
}

// Submit to Supabase (ready to connect)
export async function submitToSupabase(payload: SupabaseLeadPayload): Promise<{ success: boolean; id?: string; error?: string }> {
  // Configured via .env (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) — window globals kept as override
  const SUPABASE_URL =
    (typeof window !== 'undefined' && (window as any).__SUPABASE_URL__) ||
    import.meta.env.VITE_SUPABASE_URL || '';
  const SUPABASE_KEY =
    (typeof window !== 'undefined' && (window as any).__SUPABASE_KEY__) ||
    import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    if (typeof window !== 'undefined' && (window as any).__DL_DEBUG__) {
      console.log('%c🔧 Supabase not configured. Payload ready:', 'color: #C9A24A;', payload);
    }
    return { success: true, id: 'mock_' + Date.now() };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, id: result[0]?.id };
  } catch (error) {
    console.error('Supabase submission error:', error);
    return { success: false, error: String(error) };
  }
}

// ============================================
// 📊 INITIALIZATION
// ============================================

export function initDataLayer(): void {
  // 1. Capture UTM parameters
  captureUTM();

  // 2. Initialize/get session
  const session = getSession();

  // 3. Detect cross-platform transition
  const transition = detectPlatformTransition();
  if (transition.isTransition) {
    trackPlatformTransition(transition.from, 'react', transition.wpReferrer);
  }

  // 4. Push initial dataLayer
  pushToDataLayer({
    event: 'gtm.js',
    'gtm.start': new Date().getTime(),
    page_title: typeof document !== 'undefined' ? document.title : '',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    site_language: 'ar',
    site_direction: 'rtl',
    business_name: 'صرح للخدمات القانونية والمحاسبية',
    business_type: 'law_firm',
    session_id: session.session_id,
    platform_origin: session.platform_origin,
    ...getUTMParams(),
  });
}

// ---- Page Title Mapping ----
export const PAGE_TITLES: Record<string, { title: string; group: string }> = {
  '/': { title: 'الرئيسية - صرح للخدمات القانونية والمحاسبية', group: 'home' },
  '/about': { title: 'من نحن - صرح للخدمات القانونية والمحاسبية', group: 'about' },
  '/services': { title: 'خدماتنا - صرح للخدمات القانونية والمحاسبية', group: 'services' },
  '/sectors': { title: 'القطاعات - صرح للخدمات القانونية والمحاسبية', group: 'sectors' },
  '/cases': { title: 'الإنجازات - صرح للخدمات القانونية والمحاسبية', group: 'cases' },
  '/articles': { title: 'المقالات - صرح للخدمات القانونية والمحاسبية', group: 'articles' },
  '/faq': { title: 'الأسئلة الشائعة - صرح للخدمات القانونية والمحاسبية', group: 'faq' },
  '/contact': { title: 'تواصل معنا - صرح للخدمات القانونية والمحاسبية', group: 'contact' },
  '/book-consultation': { title: 'حجز استشارة - صرح للخدمات القانونية والمحاسبية', group: 'booking' },
  '/ai-consultation': { title: 'المستشار القانوني الذكي - صرح للخدمات القانونية والمحاسبية', group: 'ai_consultation' },
};

// ---- Scroll Tracking Hook Setup ----
let scrollListenerActive = false;
export function startScrollTracking(pagePath: string): () => void {
  if (scrollListenerActive) return () => {};
  scrollListenerActive = true;
  
  const handler = () => trackScrollDepth(pagePath);
  window.addEventListener('scroll', handler, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handler);
    scrollListenerActive = false;
  };
}
