// ============================================
// 🤖 AI Legal Engine — Service Layer
// Company: صرح للخدمات القانونية والمحاسبية
// Architecture: SSE Streaming + Analytics + Supabase
// ============================================

// ---- Types ----
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface AIConversation {
  id: string;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
  title: string;
  queryCount: number;
}

export interface AIQueryLog {
  user_query: string;
  response_text: string;
  total_tokens: number;
  duration_ms: number;
  model: string;
  source: 'chatbot' | 'consultation_page';
  session_id: string;
  utm_source?: string;
}

export interface AIServiceConfig {
  apiEndpoint: string;
  model: string;
  maxTokens: number;
  systemPrompt: string;
}

// ---- Safe Window Access ----
/* eslint-disable @typescript-eslint/no-explicit-any */
declare const window: any;
/* eslint-enable @typescript-eslint/no-explicit-any */

// ---- Configuration ----
const DEFAULT_CONFIG: AIServiceConfig = {
  apiEndpoint:
    (typeof window !== 'undefined' && window.__AI_API_ENDPOINT__) ||
    import.meta.env.VITE_AI_API_ENDPOINT ||
    '/api/ai/ask',
  model: 'claude-3-5-sonnet-20241022',
  maxTokens: 1500,
  systemPrompt: `أنت مستشار قانوني ذكي يعمل في شركة "صرح للخدمات القانونية والمحاسبية" — محامون ومحاسبون قانونيون. 

قواعد أساسية:
- أجب باللغة العربية دائماً
- قدم معلومات قانونية دقيقة ومفيدة
- أوضح أن هذه استشارة مبدئية وليست رأياً قانونياً نهائياً
- اذكر دائماً أن العميل يجب أن يحجز استشارة تفصيلية مع محامٍ متخصص
- كن محترفاً ومهذباً ورسمياً
- لا تقدم نصائح محددة تتعلق بقضايا معينة بدون استشارة فعلية

معلومات عن صرح:
- صرح للخدمات القانونية والمحاسبية — محامون ومحاسبون قانونيون
- التأسيس: نخبة من الدكاترة الأكاديميين المتخصصين في القانون والمحاسبة
- المؤسس: د. إسلام إبراهيم — المؤسس والشريك العام
- الخدمات: تأسيس الشركات، صياغة العقود، الاستشارات الضريبية، التمثيل القانوني في القضايا المعقدة
- الفروع: بني سويف (كورنيش النيل - برج الصفوة)، الجيزة (القرية الذكية - مبني نورث سايد)
- الهاتف: 01117819505 - 01035678474
- البريد: legalsarh@gmail.com`
};

// ---- Legal Knowledge Base (RAG Simulation) ----
const LEGAL_KNOWLEDGE: Record<string, string> = {
  'تأسيس': `لتأسيس شركة في جمهورية مصر العربية، يجب اتباع الخطوات التالية:

**1. اختيار الكيان القانوني**
- شركة ذات مسؤولية محدودة (الأكثر شيوعاً)
- شركة مساهمة مقفلة (للمشاريع الكبرى)
- مؤسسة فردية (للأفراد)

**2. إجراءات التأسيس**
- اعتماد الاسم التجاري والحصول على شهادة عدم الالتباس
- إعداد عقد التأسيس والنظام الأساسي وتوثيقه
- فتح حساب بنكي وإيداع رأس المال
- القيد في السجل التجاري (عبر الهيئة العامة للاستثمار للشركات الخاضعة لها)

**3. الالتزامات بعد التأسيس**
- التسجيل الضريبي لدى مصلحة الضرائب المصرية والحصول على البطاقة الضريبية
- استخراج التراخيص اللازمة لمزاولة النشاط
- تسجيل الموظفين في التأمينات الاجتماعية
- الالتزام بمنظومة الفاتورة الإلكترونية

✅ في صرح، نُدير جميع هذه المراحل بالكامل لضمان تأسيس سليم ومتوافق.`,

  'عقد': `صياغة العقود الاستراتيجية تتطلب دقة قانونية عالية:

**أنواع العقود التي نتعامل معها:**
- عقود الشراكة والتأسيس
- عقود الوكالات التجارية
- عقود التوريد والمقاولات
- عقود العمل والتوظيف
- عقود الترخيص والملكية الفكرية
- عقود الإيجار التجاري

**عناصر العقد القوي:**
- تحديد أطراف العقد بدقة مع الصفة القانونية
- صياغة الالتزامات والحقوق بوضوح تام
- بنود حماية (القوة القاهرة، السرية)
- آلية حل النزاعات (تحكيم/قضاء)
- بنود الإنهاء وشروطه

⚠️ لا توقع أي عقد بدون مراجعة قانونية — الثغرات تكلف أكثر من الصياغة.`,

  'ضريب': `الالتزامات الضريبية في جمهورية مصر العربية:

**ضريبة القيمة المضافة (VAT)**
- النسبة العامة: 14%
- التسجيل إلزامي عند تجاوز حد التسجيل المقرر قانوناً
- تقديم الإقرارات الشهرية في المواعيد المحددة

**ضريبة الدخل على الشركات**
- النسبة العامة: 22.5% من صافي الأرباح
- التزامات الخصم والتحصيل تحت حساب الضريبة

**منظومة الفاتورة الإلكترونية**
- ربط مباشر مع مصلحة الضرائب المصرية
- إلزامية للشركات وفق مراحل التطبيق المعلنة

⚠️ عدم الامتثال يعرض الشركة لغرامات وفوائد تأخير — ننصح بمراجعة دورية مع مستشار ضريبي.`,

  'قضية': `للتمثيل القانوني في القضايا:

**أنواع القضايا التي نتولاها:**
- القضايا التجارية والمدنية
- الجنايات الاقتصادية (تزوير، رشوة، خيانة أمانة)
- قضايا النقد الأجنبي
- قضايا عابرة للحدود
- نزاعات الشركات والشراكات
- قضايا الإفلاس والتسوية

**مراحل التقاضي:**
1. تقييم الموقف القانوني والبحث في الأدلة
2. إعداد استراتيجية دفاعية/هجومية
3. تقديم المذكرات والطلبات القضائية
4. المرافعة الشفهية أمام المحكمة
5. الاستئناف إن لزم الأمر

📞 لحالتك المحددة، ننصح بحجز استشارة فورية.`,

  'فاتورة': `منظومة الفاتورة الإلكترونية في مصر:

**المنظومة:**
- **الفاتورة الإلكترونية**: إلزامية لمعاملات الشركات (B2B) عبر منظومة مصلحة الضرائب المصرية
- **الإيصال الإلكتروني**: للمعاملات مع المستهلك النهائي (B2C) وفق مراحل التطبيق

**المتطلبات التقنية:**
- التسجيل في منظومة مصلحة الضرائب المصرية
- توقيع إلكتروني معتمد
- ربط نظام الفوترة (POS/ERP) بالمنظومة
- استخدام أكواد GS1/EGS للسلع والخدمات

⚠️ عدم الالتزام يعرض المنشأة لغرامات ويمنع خصم الضريبة — نساعدك في التسجيل والربط الكامل.`,

  'سرية': `حماية البيانات والسرية المهنية:

في صرح، نلتزم بأعلى معايير حماية البيانات:
- تشفير End-to-End لجميع البيانات
- تخزين سحابي محمي ومشفر
- اتفاقيات سرية مهنية صارمة (NDA)
- صلاحيات وصول محدودة للأطراف المعنية فقط
- امتثال كامل لأنظمة حماية البيانات الشخصية

🔒 جميع المعلومات المقدمة لنا محمية بموجب قواعد المهنة والقوانين المعمول بها.`,
};

// ---- Utility Functions ----
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  const key = 'sarh_ai_session';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = generateId();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function getUTMSource(): string {
  if (typeof window === 'undefined') return 'direct';
  try {
    const stored = localStorage.getItem('sarh_utm_data');
    if (stored) {
      const data = JSON.parse(stored);
      return data.utm_source || 'direct';
    }
  } catch { /* ignore */ }
  return 'direct';
}

// ---- AI Response Generator (Demo/Offline Mode) ----
function generateLegalResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  let response = '';

  for (const [keyword, knowledge] of Object.entries(LEGAL_KNOWLEDGE)) {
    if (lowerQuery.includes(keyword)) {
      response = knowledge;
      break;
    }
  }

  if (!response) {
    response = `شكراً لسؤالك. بناءً على استفسارك حول "${query}"، يمكنني تقديم الإرشادات التالية:

**1. التقييم الأولي**
يجب مراجعة الوثائق والحقائق المتعلقة بحالتك بعناية فائقة.

**2. الاستشارة المتخصصة**
ننصح بشدة بحجز استشارة مع أحد محامينا المتخصصين للحصول على رأي قانوني مفصل وموثوق.

**3. الإجراءات المطلوبة**
تختلف الإجراءات حسب طبيعة الحالة والجهة المختصة والنظام المطبق.

⚠️ **ملاحظة مهمة**: هذه المعلومات عامة ولا تغني عن الاستشارة القانونية المتخصصة.

📞 للاستشارة الفورية: 01117819505
💬 أو تواصل عبر واتساب لحجز موعد سريع`;
  }

  return response;
}

// ---- SSE Streaming Service ----
export async function streamAIResponse(
  query: string,
  onToken: (token: string) => void,
  onComplete: (fullText: string, durationMs: number) => void,
  _onError: (error: string) => void,
  source: 'chatbot' | 'consultation_page' = 'chatbot'
): Promise<void> {
  const startTime = Date.now();
  const apiEndpoint = DEFAULT_CONFIG.apiEndpoint;
  
  // ---- Try real SSE streaming from backend ----
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userQuery: query,
        model: DEFAULT_CONFIG.model,
        maxTokens: DEFAULT_CONFIG.maxTokens,
        sessionId: getSessionId(),
        source,
      }),
    });

    if (response.ok && response.headers.get('content-type')?.includes('text/event-stream')) {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') {
                onComplete(fullText, Date.now() - startTime);
                logAIQuery(query, fullText, Date.now() - startTime, source);
                return;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  fullText += parsed.text;
                  onToken(parsed.text);
                }
              } catch {
                fullText += data;
                onToken(data);
              }
            }
          }
        }
        onComplete(fullText, Date.now() - startTime);
        logAIQuery(query, fullText, Date.now() - startTime, source);
        return;
      }
    }
  } catch {
    // Backend unavailable — fall through to demo mode
  }

  // ---- Demo/Simulation Mode with Typewriter Effect ----
  const responseText = generateLegalResponse(query);
  let fullText = '';
  const words = responseText.split(' ');
  let wordIndex = 0;

  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (wordIndex >= words.length) {
        clearInterval(interval);
        const duration = Date.now() - startTime;
        onComplete(fullText, duration);
        logAIQuery(query, fullText, duration, source);
        resolve();
        return;
      }

      const word = wordIndex === 0 ? words[wordIndex] : ' ' + words[wordIndex];
      fullText += word;
      onToken(word);
      wordIndex++;
    }, 25 + Math.random() * 35);
  });
}

// ---- AI Query Logging (Analytics + Supabase) ----
function logAIQuery(
  query: string,
  response: string,
  durationMs: number,
  source: 'chatbot' | 'consultation_page'
): void {
  const log: AIQueryLog = {
    user_query: query,
    response_text: response,
    total_tokens: Math.ceil(query.length / 4) + Math.ceil(response.length / 4),
    duration_ms: durationMs,
    model: DEFAULT_CONFIG.model,
    source,
    session_id: getSessionId(),
    utm_source: getUTMSource(),
  };

  // Push to GTM dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'ai_query_completed',
      ai_query: query.substring(0, 100),
      ai_response_length: response.length,
      ai_duration_ms: durationMs,
      ai_source: source,
      ai_session_id: log.session_id,
    });
  }

  // Log to Supabase (fire-and-forget)
  try {
    const supabaseUrl = window.__SUPABASE_URL__ || import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = window.__SUPABASE_KEY__ || import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      fetch(`${supabaseUrl}/rest/v1/ai_query_logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(log),
      }).catch(() => { /* silent */ });
    }
  } catch { /* silent */ }

  // Debug
  if (typeof window !== 'undefined' && window.__DL_DEBUG__) {
    console.log('🤖 AI Query Logged:', log);
  }
}

// ---- Conversation Management ----
const CONVERSATIONS_KEY = 'sarh_ai_conversations';

export function saveConversation(conversation: AIConversation): void {
  if (typeof window === 'undefined') return;
  try {
    const conversations = getConversations();
    const idx = conversations.findIndex(c => c.id === conversation.id);
    if (idx >= 0) conversations[idx] = conversation;
    else conversations.unshift(conversation);
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations.slice(0, 10)));
  } catch { /* ignore */ }
}

export function getConversations(): AIConversation[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CONVERSATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function createNewConversation(): AIConversation {
  return {
    id: generateId(),
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'استشارة جديدة',
    queryCount: 0,
  };
}

export function getAIConfig(): AIServiceConfig {
  return { ...DEFAULT_CONFIG };
}

// ---- Suggested Questions ----
export const SUGGESTED_QUESTIONS = [
  'كيف أؤسس شركة في مصر؟',
  'ما هي خطوات تأسيس شركة ذات مسؤولية محدودة؟',
  'ما هي متطلبات الفاتورة الإلكترونية؟',
  'كيف أحمي حقوقي في عقد الشراكة؟',
  'ما هي الالتزامات الضريبية لشركتي؟',
  'كيف أتعامل مع قضية تزوير؟',
  'ما الفرق بين التحكيم والقضاء؟',
  'كيف أستعيد حقي في إيصال الأمانة؟',
];

export const QUICK_TOPICS = [
  { label: 'تأسيس شركات', query: 'كيف أؤسس شركة في مصر؟' },
  { label: 'العقود', query: 'ما أهمية صياغة العقود القانونية؟' },
  { label: 'الضرائب', query: 'ما هي الالتزامات الضريبية في مصر؟' },
  { label: 'القضايا', query: 'كيف يتم التمثيل القانوني في القضايا؟' },
  { label: 'فاتورة إلكترونية', query: 'ما هي متطلبات الفاتورة الإلكترونية؟' },
];
