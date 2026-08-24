// ============================================================
// src/lib/notificationService.ts
//
// نظام الإشعارات لمنصة صرح
// - Twilio SMS (عملاء + محامين)
// - Supabase Realtime (إشعارات فورية)
// - Browser Notifications
// ============================================================

// ---- Types ----
export interface NotificationEvent {
  id: string;
  type: 'new_lead' | 'lead_updated' | 'invoice_paid' | 'invoice_overdue' | 'chatbot_query';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: Record<string, unknown>;
}

export interface SMSMessage {
  to: string;
  body: string;
  type: 'payment_link' | 'consultation_confirmed' | 'payment_confirmed' | 'lawyer_alert';
}

// ---- Notification Store ----
type NotificationListener = (event: NotificationEvent) => void;
const listeners: NotificationListener[] = [];
let notificationHistory: NotificationEvent[] = [];

function generateId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ---- Core Functions ----

/** Subscribe to real-time notifications */
export function subscribeToNotifications(listener: NotificationListener): () => void {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

/** Get notification history */
export function getNotificationHistory(): NotificationEvent[] {
  return notificationHistory;
}

/** Mark notification as read */
export function markAsRead(id: string): void {
  notificationHistory = notificationHistory.map(n => n.id === id ? { ...n, read: true } : n);
}

/** Mark all as read */
export function markAllAsRead(): void {
  notificationHistory = notificationHistory.map(n => ({ ...n, read: true }));
}

/** Get unread count */
export function getUnreadCount(): number {
  return notificationHistory.filter(n => !n.read).length;
}

// ---- Event Emitters ----

export function emitNewLead(lead: { name: string; phone: string; service_type: string; source?: string }) {
  const event: NotificationEvent = {
    id: generateId(),
    type: 'new_lead',
    title: 'عميل محتمل جديد',
    message: `${lead.name} (${lead.phone}) — ${lead.service_type}`,
    timestamp: new Date().toISOString(),
    read: false,
    data: lead,
  };
  notificationHistory.unshift(event);
  listeners.forEach(fn => fn(event));
  pushBrowserNotification(event);
}

export function emitLeadUpdated(lead: { name: string; status: string }) {
  const statusMap: Record<string, string> = {
    contacted: 'تم التواصل', converted: 'تم التحويل', lost: 'مفقود',
  };
  const event: NotificationEvent = {
    id: generateId(),
    type: 'lead_updated',
    title: 'تحديث حالة عميل',
    message: `${lead.name} → ${statusMap[lead.status] || lead.status}`,
    timestamp: new Date().toISOString(),
    read: false,
    data: lead,
  };
  notificationHistory.unshift(event);
  listeners.forEach(fn => fn(event));
}

export function emitInvoicePaid(invoice: { id: string; amount: number; lead_name: string }) {
  const event: NotificationEvent = {
    id: generateId(),
    type: 'invoice_paid',
    title: 'دفعة مستلمة ✓',
    message: `${invoice.lead_name} — ${invoice.amount.toLocaleString('ar-EG')} ج.م (${invoice.id})`,
    timestamp: new Date().toISOString(),
    read: false,
    data: invoice,
  };
  notificationHistory.unshift(event);
  listeners.forEach(fn => fn(event));
  pushBrowserNotification(event);
}

export function emitInvoiceOverdue(invoice: { id: string; amount: number; lead_name: string }) {
  const event: NotificationEvent = {
    id: generateId(),
    type: 'invoice_overdue',
    title: 'فاتورة متأخرة ⚠️',
    message: `${invoice.lead_name} — ${invoice.amount.toLocaleString('ar-EG')} ج.م (${invoice.id})`,
    timestamp: new Date().toISOString(),
    read: false,
    data: invoice,
  };
  notificationHistory.unshift(event);
  listeners.forEach(fn => fn(event));
  pushBrowserNotification(event);
}

// ---- SMS Templates ----

export const SMS_TEMPLATES = {
  paymentLink: (name: string, amount: number, url: string) =>
    `⚖️ صرح للخدمات القانونية والمحاسبية\nالسيد/ة ${name}\nرابط دفع أتعاب (${amount.toLocaleString('ar-EG')} ج.م):\n${url}\nشكراً لثقتكم بصرح`,

  consultationConfirmed: (name: string, date: string, time: string) =>
    `⚖️ صرح للخدمات القانونية والمحاسبية\nالسيد/ة ${name}\nتم تأكيد استشارتك: ${date} (${time})\nسيتم التواصل معكم قريباً`,

  paymentConfirmed: (name: string, invoiceId: string) =>
    `⚖️ صرح للخدمات القانونية والمحاسبية\nالسيد/ة ${name}\nتم تأكيد استلام الدفعة (${invoiceId})\nشكراً لثقتكم بصرح`,

  lawyerAlert: (leadName: string, service: string, phone: string) =>
    `⚖️ عميل جديد في صرح\n${leadName} — ${service}\nهاتف: ${phone}\nادخل لوحة التحكم فوراً`,
};

/** Send SMS (demo mode — logs to console) */
export async function sendSMS(message: SMSMessage): Promise<boolean> {
  if (typeof window !== 'undefined' && (window as any).__DL_DEBUG__) {
    console.log(`[SMS] To: ${message.to} | Type: ${message.type}`);
    console.log(`[SMS] Body:\n${message.body}`);
  }
  // In production: POST /api/notifications/sms
  return true;
}

// ---- Browser Push Notifications ----

function pushBrowserNotification(event: NotificationEvent) {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    new Notification(event.title, { body: event.message, icon: '/favicon.ico', tag: event.id });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(perm => {
      if (perm === 'granted') {
        new Notification(event.title, { body: event.message, icon: '/favicon.ico', tag: event.id });
      }
    });
  }
}

/** Request browser notification permission */
export function requestNotificationPermission(): void {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

// ---- Demo: Auto-generate sample notifications ----

export function generateDemoNotifications(): void {
  const demos: NotificationEvent[] = [
    {
      id: 'demo_1', type: 'new_lead',
      title: 'عميل محتمل جديد',
      message: 'أحمد محمد العمري — تأسيس شركات',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: 'demo_2', type: 'invoice_paid',
      title: 'دفعة مستلمة ✓',
      message: 'سارة المنصور — 8,500 ج.م (INV-002)',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: 'demo_3', type: 'chatbot_query',
      title: 'استفسار جديد عبر المساعد الذكي',
      message: 'كيف أحمي شركتي من المسؤولية القانونية؟',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: 'demo_4', type: 'lead_updated',
      title: 'تحديث حالة عميل',
      message: 'خالد السيد → تم التواصل',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: 'demo_5', type: 'invoice_overdue',
      title: 'فاتورة متأخرة ⚠️',
      message: 'محمود الخالد — 12,000 ج.م (INV-003)',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
  ];
  notificationHistory = demos;
}
