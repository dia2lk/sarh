# 🏗️ دليل النشر والتكامل الشامل
## صرح للمحاماة والاستشارات القانونية والمحاسبية

---

## 📋 المحتويات

1. [هندسة الربط التقني (WordPress ↔ React)](#1-هندسة-الربط-التقني)
2. [إعداد WordPress CTA Buttons](#2-إعداد-wordpress-cta-buttons)
3. [إعداد Supabase](#3-إعداد-supabase)
4. [إعداد GTM + GA4](#4-إعداد-gtm--ga4)
5. [إعداد CNAME Record](#5-إعداد-cname-record)
6. [نشر React App](#6-نشر-react-app)
7. [قائمة التحقق النهائية](#7-قائمة-التحقق-النهائية)

---

## 1. هندسة الربط التقني

### المعمارية العامة

```
┌─────────────────────────────────────────────────────────────────┐
│                    Decoupled Architecture                        │
│                                                                  │
│  WordPress (SEO + Content)          React (Booking + Forms)     │
│  sarh-law.com                       app.sarh-law.com            │
│  ┌──────────────────┐               ┌──────────────────┐        │
│  │ Elementor Pages  │               │ React App        │        │
│  │ - Home           │               │ - Book Consult.  │        │
│  │ - About          │               │ - Contact Form   │        │
│  │ - Services       │               │ - Quick Contact  │        │
│  │ - Articles       │──CTA Redir──▶│ - FAQ            │        │
│  │ - Sectors        │  + UTM Params │ - Services       │        │
│  │ - Landing Pages  │               │ - Cases          │        │
│  └──────────────────┘               └────────┬─────────┘        │
│                                              │                  │
│                    ┌─────────────────────────┤                  │
│                    │                         │                  │
│              ┌─────▼─────┐          ┌───────▼──────┐           │
│              │   GTM     │          │  Supabase    │           │
│              │ + GA4     │          │  (Database)  │           │
│              │ + Pixel   │          │  - leads     │           │
│              └───────────┘          └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

### تدفق رحلة العميل

```
1. العميل يقرأ مقال في WordPress (sarh-law.com/blog/article-1)
2. يضغط على زر "احجز استشارة" CTA
3. يتم توجيهه لـ: app.sarh-law.com/book-consultation?from_wp=1&utm_source=wordpress&utm_medium=cta&utm_campaign=article_1
4. React يلتقط UTM parameters ويحفظها في localStorage
5. العميل يملأ نموذج الحجز (3 خطوات)
6. يتم إرسال البيانات + UTM لـ Supabase
7. يتم تفعيل حدث lead_submitted في GTM
8. GA4 يسجل generate_lead conversion
```

---

## 2. إعداد WordPress CTA Buttons

### روابط CTA المطلوبة في Elementor

#### زر "احجز استشارة" (رئيسي)
```html
<a href="https://app.sarh-law.com/book-consultation?from_wp=1&utm_source=wordpress&utm_medium=cta&utm_campaign={page_name}">
  احجز استشارة مجانية
</a>
```

#### زر "تواصل معنا"
```html
<a href="https://app.sarh-law.com/contact?from_wp=1&utm_source=wordpress&utm_medium=cta&utm_campaign={page_name}">
  تواصل معنا
</a>
```

#### زر "خدماتنا"
```html
<a href="https://app.sarh-law.com/services?from_wp=1&utm_source=wordpress&utm_medium=cta&utm_campaign={page_name}">
  تعرف على خدماتنا
</a>
```

### Campaign Naming Convention
```
الصفحة الرئيسية: utm_campaign=homepage
صفحة الخدمات: utm_campaign=services_page
المقالات: utm_campaign=article_{slug}
Landing Pages: utm_campaign=lp_{name}
الإعلانات: utm_campaign=ads_{platform}_{adset}
```

### قائمة صفحات WordPress المطلوبة
| الصفحة | المحتوى | CTA |
|--------|---------|-----|
| الرئيسية | Hero + مختصر الخدمات | احجز استشارة |
| من نحن | قصة الشركة + الفريق | احجز استشارة |
| خدماتنا | 4 خدمات مركزة | اطلب الخدمة |
| القطاعات | 12 قطاع | تعرف أكثر |
| الإنجازات | قضايا ناجحة + أرقام | احجز استشارة |
| المقالات | مدونة قانونية | احجز استشارة |
| الأسئلة الشائعة | FAQ كاملة | احجز استشارة |
| تواصل معنا | معلومات الفروع | احجز استشارة |

---

## 3. إعداد Supabase

### إنشاء الجدول (leads)

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_name TEXT NOT NULL,
  service_type TEXT,
  consultation_type TEXT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  description TEXT,
  
  -- Tracking Data
  utm_source TEXT DEFAULT 'direct',
  utm_medium TEXT DEFAULT 'organic',
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  fbclid TEXT,
  gclid TEXT,
  lead_source TEXT,
  session_id TEXT,
  platform_origin TEXT,
  first_touch_date TIMESTAMPTZ,
  landing_page TEXT,
  journey_steps INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  time_to_conversion INTEGER DEFAULT 0,
  
  -- Meta
  status TEXT DEFAULT 'new',
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy for insert (public/anon)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT WITH CHECK (true);

-- Create policy for read (authenticated only)
CREATE POLICY "Allow authenticated reads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(utm_source);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_leads_platform ON leads(platform_origin);
```

### تفعيل Supabase في React

في ملف `index.html`، أزل التعليق عن السطرين:

```html
<!-- قبل -->
<!-- window.__SUPABASE_URL__ = 'https://your-project.supabase.co'; -->
<!-- window.__SUPABASE_KEY__ = 'your-anon-key-here'; -->

<!-- بعد -->
<script>
  window.__SUPABASE_URL__ = 'https://xxxxx.supabase.co';
  window.__SUPABASE_KEY__ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
</script>
```

### Payload نموذجي يُرسل لـ Supabase

```json
{
  "form_name": "booking_consultation",
  "service_type": "corporate",
  "consultation_type": "تأسيس الشركات وحوكمة الأعمال",
  "name": "محمد أحمد",
  "phone": "05XXXXXXXX",
  "email": "example@email.com",
  "preferred_date": "2025-02-15",
  "preferred_time": "morning",
  "description": "أريد تأسيس شركة ذات مسؤولية محدودة...",
  "utm_source": "facebook",
  "utm_medium": "paid_social",
  "utm_campaign": "winter_campaign_2025",
  "utm_content": "hero_banner",
  "utm_term": "تأسيس شركات",
  "fbclid": "fb_click_id_value",
  "gclid": "",
  "lead_source": "facebook",
  "session_id": "sess_1234567890_abc123",
  "platform_origin": "wordpress",
  "first_touch_date": "2025-01-20T14:30:00.000Z",
  "landing_page": "https://sarh-law.com/blog/how-to-establish-company",
  "journey_steps": 8,
  "page_views": 5,
  "time_to_conversion": 86400,
  "created_at": "2025-01-21T14:30:00.000Z"
}
```

---

## 4. إعداد GTM + GA4

### المتغيرات المطلوبة (Variables)

| اسم المتغير | النوع | Data Layer Variable Name |
|-------------|-------|------------------------|
| `DLV - Event` | Data Layer Variable | `event` |
| `DLV - Service Type` | Data Layer Variable | `service_type` |
| `DLV - Lead Source` | Data Layer Variable | `lead_source` |
| `DLV - Lead Medium` | Data Layer Variable | `utm_medium` |
| `DLV - Form Name` | Data Layer Variable | `form_name` |
| `DLV - CTA Name` | Data Layer Variable | `cta_name` |
| `DLV - CTA Location` | Data Layer Variable | `cta_location` |
| `DLV - Platform Origin` | Data Layer Variable | `platform_origin` |
| `DLV - Session ID` | Data Layer Variable | `session_id` |
| `DLV - UTM Source` | Data Layer Variable | `utm_source` |
| `DLV - UTM Campaign` | Data Layer Variable | `utm_campaign` |
| `DLV - FBCLID` | Data Layer Variable | `fbclid` |
| `DLV - GCLID` | Data Layer Variable | `gclid` |
| `DLV - Time to Conversion` | Data Layer Variable | `time_to_conversion` |

### المحفزات المطلوبة (Triggers)

| اسم المحفز | النوع | الشرط |
|------------|-------|-------|
| `Trigger - Lead Submitted` | Custom Event | `Event name = lead_submitted` |
| `Trigger - Lead Success` | Custom Event | `Event name = lead_success_page_view` |
| `Trigger - Form Started` | Custom Event | `Event name = form_started` |
| `Trigger - Form Step Change` | Custom Event | `Event name = form_step_change` |
| `Trigger - CTA Click` | Custom Event | `Event name = cta_click` |
| `Trigger - WhatsApp Click` | Custom Event | `Event name = whatsapp_click` |
| `Trigger - Phone Click` | Custom Event | `Event name = phone_click` |
| `Trigger - Scroll Depth` | Custom Event | `Event name = scroll_depth` |
| `Trigger - Virtual Page View` | Custom Event | `Event name = virtual_page_view` |
| `Trigger - FAQ Interaction` | Custom Event | `Event name = faq_interaction` |
| `Trigger - Service Click` | Custom Event | `Event name = service_card_click` |
| `Trigger - Platform Transition` | Custom Event | `Event name = cross_platform_transition` |

### الوسوم المطلوبة (Tags)

#### 🔥 Tag 1: GA4 - Lead Conversion (الأهم!)
```
Tag Type: GA4 Event
Configuration Tag: [GA4 Config Tag]
Event Name: generate_lead
Parameters:
  - service_type: {{DLV - Service Type}}
  - lead_source: {{DLV - Lead Source}}
  - lead_medium: {{DLV - Lead Medium}}
  - form_name: {{DLV - Form Name}}
  - value: 500 (قيمة تقديرية للـ lead)
  - currency: SAR
  - session_id: {{DLV - Session ID}}
  - platform_origin: {{DLV - Platform Origin}}

Trigger: Trigger - Lead Submitted
```

#### Tag 2: GA4 - Lead Success
```
Tag Type: GA4 Event
Event Name: lead_success
Parameters:
  - service_type: {{DLV - Service Type}}
  - consultation_type: {{DLV - Service Type}}
  - time_to_conversion: {{DLV - Time to Conversion}}

Trigger: Trigger - Lead Success
```

#### Tag 3: Google Ads - Conversion
```
Tag Type: Google Ads Conversion Tracking
Conversion ID: [AW-XXXXXXXXX]
Conversion Label: [conversion_label]
Conversion Value: 500

Trigger: Trigger - Lead Submitted
```

#### Tag 4: Facebook Pixel - Lead
```
Tag Type: Custom HTML
HTML:
  <script>
    fbq('track', 'Lead', {
      content_name: {{DLV - Service Type}},
      content_category: 'legal_consultation',
      value: 500,
      currency: 'SAR'
    });
  </script>

Trigger: Trigger - Lead Submitted
```

#### Tag 5: GA4 - Form Funnel
```
Tag Type: GA4 Event
Event Name: form_progress
Parameters:
  - form_name: {{DLV - Form Name}}
  - form_step_from: {{DLV - form_step_from}}
  - form_step_to: {{DLV - form_step_to}}

Trigger: Trigger - Form Step Change
```

#### Tag 6: GA4 - Virtual Page View
```
Tag Type: GA4 Event
Event Name: page_view
Parameters:
  - page_title: {{DLV - page_title}}
  - page_path: {{DLV - page_path}}
  - content_group: {{DLV - content_group}}

Trigger: Trigger - Virtual Page View
```

### تفعيل GTM

في ملف `index.html`:

```html
<!-- 1. استبدل GTM-XXXXXXX بمعرف GTM الفعلي -->
<!-- 2. أزل التعليقات عن كود GTM في Head و Body -->

<!-- Head Script -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>

<!-- Body Script -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

---

## 5. إعداد CNAME Record

### DNS Configuration

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | app | `your-hosting-provider.com` | 3600 |

### لـ Vercel:
```
CNAME  app  cname.vercel-dns.com  3600
```

### لـ Netlify:
```
CNAME  app  your-site.netlify.app  3600
```

### لـ Cloudflare Pages:
```
CNAME  app  your-site.pages.dev  3600
```

### خطوات إعداد SSL
1. بعد إضافة CNAME، انتظر حتى ينتشر الـ DNS (حتى 48 ساعة)
2. في لوحة تحكم الاستضافة، فعّل SSL لـ `app.sarh-law.com`
3. استخدم Let's Encrypt أو SSL مجاني من الاستضافة
4. تأكد من إعادة التوجيه من HTTP إلى HTTPS

---

## 6. نشر React App

### خيار 1: Vercel (الأسهل)

```bash
# 1. تثبيت Vercel CLI
npm i -g vercel

# 2. تسجيل الدخول
vercel login

# 3. نشر المشروع
vercel --prod

# 4. إعداد Custom Domain
# من لوحة Vercel → Settings → Domains → Add app.sarh-law.com
```

### خيار 2: Netlify

```bash
# 1. بناء المشروع
npm run build

# 2. رفع مجلد dist يدوياً من Netlify Dashboard
# أو ربط GitHub repository

# 3. إعداد Custom Domain
# Site settings → Domain management → Add custom domain
```

### خيار 3: Self-Hosted (VPS)

```bash
# 1. بناء المشروع
npm run build

# 2. رفع مجلد dist إلى الخادم
scp -r dist/* user@server:/var/www/app.sarh-law.com/

# 3. إعداد Nginx
cat > /etc/nginx/sites-available/app.sarh-law.com << 'EOF'
server {
    listen 443 ssl http2;
    server_name app.sarh-law.com;

    ssl_certificate /etc/letsencrypt/live/app.sarh-law.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.sarh-law.com/privkey.pem;

    root /var/www/app.sarh-law.com;
    index index.html;

    # SPA routing - redirect all to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -s /etc/nginx/sites-available/app.sarh-law.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 7. قائمة التحقق النهائية

### ✅ المحتوى
- [ ] صفحة الخدمات تحتوي على 4 خدمات مركزة
- [ ] صفحة الأسئلة الشائعة تحتوي على 5 تصنيفات
- [ ] الصفحة الرئيسية محدثة بآخر المحتوى
- [ ] جميع النصوص بالعربية الفصحى
- [ ] H1/H2/H3 مرتبة بشكل منطقي

### ✅ التصميم
- [ ] الموقع متجاوب (Mobile + Tablet + Desktop)
- [ ] الألوان: كحلي #0B1F3A، ذهبي #C9A24A
- [ ] خط Cairo محمل بشكل صحيح
- [ ] زر واتساب عائم يعمل
- [ ] Header ثابت مع القائمة
- [ ] Footer شامل بجميع الروابط

### ✅ التتبع
- [ ] GTM container ID مستبدل
- [ ] GA4 Property ID مضاف
- [ ] Variables مُنشأة في GTM
- [ ] Triggers مُنشأة في GTM
- [ ] Tags مُنشأة ومختبرة في GTM
- [ ] Facebook Pixel مضاف (اختياري)
- [ ] Google Ads Conversion مضاف (اختياري)

### ✅ قاعدة البيانات
- [ ] Supabase project مُنشأ
- [ ] جدول leads مُنشأ بالـ schema المطلوب
- [ ] RLS policies مُفعلة
- [ ] Supabase URL + Key مضافان في index.html
- [ ] اختبار إدخال lead ناجح

### ✅ WordPress Integration
- [ ] CNAME record لـ app.sarh-law.com مضاف
- [ ] SSL certificate مفعّل
- [ ] أزرار CTA في WordPress توجه لـ React
- [ ] UTM parameters تُمرر بشكل صحيح
- [ ] رحلة العميل من WP→React تعمل
- [ ] نفس GTM container على المنصتين

### ✅ الاختبار
- [ ] `window.__DL_DEBUG__ = true` في Console
- [ ] DataLayer events تظهر بشكل صحيح
- [ ] نموذج الحجز يعمل (3 خطوات + Success)
- [ ] Supabase يستقبل البيانات
- [ ] GA4 Realtime يُظهر الأحداث
- [ ] GTM Preview mode يعمل
- [ ] Scroll depth tracking يعمل
- [ ] CTA click tracking يعمل
- [ ] WhatsApp click tracking يعمل

---

## 📞 الدعم الفني

### تفعيل Debug Mode
```javascript
// في Chrome DevTools Console:
window.__DL_DEBUG__ = true;

// لعرض جميع الأحداث:
window.dataLayer.forEach((e, i) => console.log(i, e.event, e));

// لعرض UTM المحفوظ:
JSON.parse(localStorage.getItem('sarh_utm_data'));

// لعرض بيانات الجلسة:
JSON.parse(sessionStorage.getItem('sarh_session'));
```

### اختبار Supabase
```javascript
// محاكاة إرسال lead:
fetch('https://YOUR_PROJECT.supabase.co/rest/v1/leads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': 'YOUR_ANON_KEY',
    'Authorization': 'Bearer YOUR_ANON_KEY',
  },
  body: JSON.stringify({
    form_name: 'test',
    service_type: 'test',
    consultation_type: 'test',
    name: 'اختبار',
    phone: '0500000000',
    email: 'test@test.com',
    preferred_date: '',
    preferred_time: '',
    description: 'اختبار الاتصال',
    utm_source: 'test',
    utm_medium: 'test',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    fbclid: '',
    gclid: '',
    lead_source: 'test',
    session_id: 'test_session',
    platform_origin: 'react',
    first_touch_date: new Date().toISOString(),
    landing_page: 'https://app.sarh-law.com',
    journey_steps: 1,
    page_views: 1,
    time_to_conversion: 0,
  }),
});
```

---

## 📊 مؤشرات الأداء الرئيسية (KPIs)

| المؤشر | الهدف | طريقة القياس |
|--------|-------|-------------|
| معدل التحويل (Conversion Rate) | 3-5% | Leads / Sessions |
| تكلفة الـ Lead (CPL) | < 200 SAR | Ad Spend / Leads |
| وقت التحويل (Time to Conversion) | < 48 ساعة | first_touch → lead_submitted |
| معدل التخلي عن النموذج (Form Abandonment) | < 60% | form_started - lead_submitted |
| معدل فتح الأسئلة الشائعة | > 40% | faq_interaction / sessions |
| معدل النقر على CTA | > 8% | cta_click / page_views |
| WP→React Transition Rate | > 20% | platform_transition / wp_sessions |
