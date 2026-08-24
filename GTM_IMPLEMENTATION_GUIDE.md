# 🏗️ دليل تنفيذ GTM المتقدم
## صرح للمحاماة والاستشارات القانونية والمحاسبية

---

## 📋 المحتويات

1. [الأحداث المُنفذة (DataLayer Events)](#1-الأحداث-المنفذة)
2. [إعداد GTM خطوة بخطوة](#2-إعداد-gtm-خطوة-بخطوة)
3. [المتغيرات (Variables)](#3-المتغيرات-variables)
4. [المحفزات (Triggers)](#4-المحفزات-triggers)
5. [الوسوم (Tags)](#5-الوسوم-tags)
6. [خطة التحليل والتحسين](#6-خطة-التحليل-والتحسين)

---

## 1. الأحداث المُنفذة

### 🔥 أحداث التحويل الأساسية (Core Conversion Events)

| الحدث | الوصف | المعاملات |
|-------|-------|-----------|
| `lead_submitted` | 🔥 إرسال نموذج (تحويل أساسي) | service_type, lead_source, lead_medium, form_name, consultation_type |
| `lead_success_page_view` | ✅ عرض صفحة الشكر | service_type, lead_source, consultation_type, preferred_date, preferred_time |
| `form_started` | 📝 بداية التفاعل مع النموذج | form_name, first_field, lead_source |

### 📊 أحداث قمع التحويل (Funnel Events)

| الحدث | الوصف | المعاملات |
|-------|-------|-----------|
| `form_step_change` | 📊 انتقال بين خطوات النموذج | form_name, form_step_from, form_step_to, form_progress |
| `form_field_focus` | 👆 تفاعل مع حقل (Drop-off) | form_name, field_name, field_type, form_step |

### 🖱️ أحداث التفاعل (Engagement Events)

| الحدث | الوصف | المعاملات |
|-------|-------|-----------|
| `cta_click` | 🎯 نقرة على زر إجراء | cta_name, cta_location, destination_url |
| `whatsapp_click` | 💬 نقرة على واتساب | whatsapp_source |
| `phone_click` | 📞 نقرة على رقم هاتف | phone_number, phone_source |
| `email_click` | ✉️ نقرة على بريد إلكتروني | email_address, email_source |
| `service_card_click` | 📋 نقرة على بطاقة خدمة | service_name, card_source |
| `sector_card_click` | 🏢 نقرة على بطاقة قطاع | sector_name |
| `faq_interaction` | ❓ فتح/إغلاق سؤال شائع | faq_action, faq_question |
| `nav_click` | 🧭 نقرة على رابط تنقل | nav_link, nav_destination, nav_type |
| `outbound_click` | 🔗 نقرة على رابط خارجي | outbound_url, link_text |
| `article_view` | 📰 مشاهدة مقال | article_title, article_category |

### 📄 أحداث الصفحات (Page Events)

| الحدث | الوصف | المعاملات |
|-------|-------|-----------|
| `virtual_page_view` | 📄 تصفح صفحة (SPA) | page_title, page_path, page_location, content_group |
| `scroll_depth` | 📜 عمق التمرير | scroll_percentage, page_path |

---

## 2. إعداد GTM خطوة بخطوة

### الخطوة 1: إنشاء حاوية GTM

1. اذهب إلى [tagmanager.google.com](https://tagmanager.google.com)
2. أنشئ حساباً جديداً باسم "صرح للمحاماة"
3. أنشئ حاوية ويب باسم "sarh-law.com"
4. انسخ معرف GTM (مثال: GTM-XXXXXXX)
5. استبدل `GTM-XXXXXXX` في `index.html` بالمعرف الفعلي

### الخطوة 2: تفعيل Preview Mode

1. في GTM اضغط على **Preview**
2. أدخل رابط الموقع
3. جرّب التنقل بين الصفحات وإرسال النماذج
4. يجب أن ترى الأحداث في Tag Assistant

---

## 3. المتغيرات (Variables)

أنشئ المتغيرات التالية في GTM → Variables → User-Defined Variables:

### متغيرات التحويل (Lead Variables)
```
الاسم: DLV - service_type
النوع: Data Layer Variable
اسم متغير Data Layer: service_type
```

```
الاسم: DLV - lead_source
النوع: Data Layer Variable
اسم متغير Data Layer: lead_source
```

```
الاسم: DLV - lead_medium
النوع: Data Layer Variable
اسم متغير Data Layer: lead_medium
```

```
الاسم: DLV - form_name
النوع: Data Layer Variable
اسم متغير Data Layer: form_name
```

```
الاسم: DLV - consultation_type
النوع: Data Layer Variable
اسم متغير Data Layer: consultation_type
```

### متغيرات CTA
```
الاسم: DLV - cta_name
النوع: Data Layer Variable
اسم متغير Data Layer: cta_name
```

```
الاسم: DLV - cta_location
النوع: Data Layer Variable
اسم متغير Data Layer: cta_location
```

### متغيرات الصفحة
```
الاسم: DLV - page_title
النوع: Data Layer Variable
اسم متغير Data Layer: page_title
```

```
الاسم: DLV - page_path
النوع: Data Layer Variable
اسم متغير Data Layer: page_path
```

```
الاسم: DLV - content_group
النوع: Data Layer Variable
اسم متغير Data Layer: content_group
```

### متغيرات القمع
```
الاسم: DLV - form_step_from
النوع: Data Layer Variable
اسم متغير Data Layer: form_step_from
```

```
الاسم: DLV - form_step_to
النوع: Data Layer Variable
اسم متغير Data Layer: form_step_to
```

```
الاسم: DLV - field_name
النوع: Data Layer Variable
اسم متغير Data Layer: field_name
```

---

## 4. المحفزات (Triggers)

أنشئ المحفزات التالية:

### محفزات التحويل
```
الاسم: Event - lead_submitted
النوع: Custom Event
Event name: lead_submitted
```

```
الاسم: Event - lead_success_page_view
النوع: Custom Event
Event name: lead_success_page_view
```

```
الاسم: Event - form_started
النوع: Custom Event
Event name: form_started
```

### محفزات التفاعل
```
الاسم: Event - cta_click
النوع: Custom Event
Event name: cta_click
```

```
الاسم: Event - whatsapp_click
النوع: Custom Event
Event name: whatsapp_click
```

```
الاسم: Event - phone_click
النوع: Custom Event
Event name: phone_click
```

```
الاسم: Event - email_click
النوع: Custom Event
Event name: email_click
```

```
الاسم: Event - form_step_change
النوع: Custom Event
Event name: form_step_change
```

```
الاسم: Event - form_field_focus
النوع: Custom Event
Event name: form_field_focus
```

### محفزات الصفحات
```
الاسم: Event - virtual_page_view
النوع: Custom Event
Event name: virtual_page_view
```

```
الاسم: Event - scroll_depth
النوع: Custom Event
Event name: scroll_depth
```

---

## 5. الوسوم (Tags)

### الوسم 1: GA4 - Page View
```
الاسم: GA4 - Page View
النوع: Google Analytics: GA4 Event
Measurement ID: G-XXXXXXXXXX (استبدل بمعرف GA4)
Event Name: page_view
Parameters:
  - page_title: {{DLV - page_title}}
  - page_path: {{DLV - page_path}}
  - content_group: {{DLV - content_group}}
Trigger: Event - virtual_page_view
```

### الوسم 2: GA4 - Lead Submitted (🔥 الأهم)
```
الاسم: GA4 - Lead Submitted
النوع: Google Analytics: GA4 Event
Measurement ID: G-XXXXXXXXXX
Event Name: generate_lead
Parameters:
  - service_type: {{DLV - service_type}}
  - lead_source: {{DLV - lead_source}}
  - lead_medium: {{DLV - lead_medium}}
  - form_name: {{DLV - form_name}}
  - consultation_type: {{DLV - consultation_type}}
Trigger: Event - lead_submitted
```

### الوسم 3: GA4 - Lead Success
```
الاسم: GA4 - Lead Success
النوع: Google Analytics: GA4 Event
Measurement ID: G-XXXXXXXXXX
Event Name: lead_success
Parameters:
  - service_type: {{DLV - service_type}}
  - lead_source: {{DLV - lead_source}}
  - consultation_type: {{DLV - consultation_type}}
Trigger: Event - lead_success_page_view
```

### الوسم 4: GA4 - CTA Click
```
الاسم: GA4 - CTA Click
النوع: Google Analytics: GA4 Event
Measurement ID: G-XXXXXXXXXX
Event Name: cta_click
Parameters:
  - cta_name: {{DLV - cta_name}}
  - cta_location: {{DLV - cta_location}}
Trigger: Event - cta_click
```

### الوسم 5: GA4 - WhatsApp Click
```
الاسم: GA4 - WhatsApp Click
النوع: Google Analytics: GA4 Event
Measurement ID: G-XXXXXXXXXX
Event Name: whatsapp_click
Trigger: Event - whatsapp_click
```

### الوسم 6: Facebook Pixel - Lead
```
الاسم: Facebook Pixel - Lead
النوع: Custom HTML
HTML: fbq('track', 'Lead', {content_name: '{{DLV - form_name}}'});
Trigger: Event - lead_submitted
```

### الوسم 7: Facebook Pixel - Contact
```
الاسم: Facebook Pixel - Contact
النوع: Custom HTML
HTML: fbq('track', 'Contact');
Trigger: Event - whatsapp_click OR Event - phone_click OR Event - email_click
```

### الوسم 8: Google Ads - Conversion
```
الاسم: Google Ads - Lead Conversion
النوع: Google Ads Conversion Tracking
Conversion ID: AW-XXXXXXXXX
Conversion Label: xxxxxxxx
Trigger: Event - lead_success_page_view
```

---

## 6. خطة التحليل والتحسين

### 🎯 قمع التحويل (Conversion Funnel)

```
تصفح الموقع → مشاهدة الخدمات → الدخول لصفحة الحجز → 
اختيار نوع الاستشارة → إدخال البيانات → إرسال النموذج → صفحة الشكر
```

### 📊 المؤشرات المهمة (KPIs)

| المؤشر | الحدث | الهدف |
|---------|-------|-------|
| معدل التحويل الكلي | lead_submitted / sessions | > 3% |
| معدل التحويل للحجز | lead_submitted / page_view(booking) | > 15% |
| معدل التحويل للتواصل | lead_submitted / page_view(contact) | > 10% |
| معدل الهجر في الخطوة 1 | form_step_change(1→2) / form_started | < 40% |
| معدل الهجر في الخطوة 2 | lead_submitted / form_step_change(1→2) | < 30% |
| تكلفة التحويل (CPA) | ad_spend / lead_submitted | < 50 SAR |

### 🔍 تحليل Drop-off

راقب `form_field_focus` لمعرفة:
- أي الحقول يتوقف عندها المستخدمون
- أي خطوة في النموذج بها أعلى معدل هجر
- هل هناك حقل يسبب إحباطاً للمستخدم

### 📱 تتبع المصادر

راقب `lead_source` لمعرفة:
- أي مصدر يجلب أكثر عدد من العملاء المحتملين
- أي مصدر يحقق أعلى جودة (أقل CPA)
- الفرق بين Facebook, LinkedIn, Google, Direct

---

## ⚡ تفعيل Debug Mode

في Console المتصفح:
```javascript
window.__DL_DEBUG__ = true;
```

سيتم طباعة جميع أحداث DataLayer في Console.

---

## 📝 ملاحظات مهمة

1. **استبدل GTM-XXXXXXX** بمعرف حاوية GTM الفعلي في `index.html`
2. **استبدل G-XXXXXXXXXX** بمعرف GA4 الفعلي في الوسوم
3. **استبدل AW-XXXXXXXXX** بمعرف Google Ads الفعلي
4. **أضف Facebook Pixel** base code قبل GTM أو من خلال GTM
5. **اختبر كل شيء** في Preview Mode قبل النشر
6. **تحقق من Realtime** في GA4 بعد النشر

---

*تم إنشاء هذا الدليل تلقائياً بواسطة نظام التتبع المتقدم - صرح للمحاماة*
