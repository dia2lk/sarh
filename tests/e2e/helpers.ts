// ============================================================
// tests/e2e/helpers.ts
//
// Shared utilities for Sarh E2E test suites
// ============================================================

import { Page, Route } from "@playwright/test";

// ── URLs ──────────────────────────────────────────────────────

export const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:4173";
export const API_URL  = process.env.E2E_API_URL  ?? "http://localhost:4000";

// ── Selectors (single source of truth) ────────────────────────

export const SEL = {
  // Trigger
  triggerBtn:     '[aria-label*="المساعد"]',
  triggerBtnAlt:  'button[class*="fixed"][class*="bottom"]',
  panel:          '[class*="chatbot-panel"], [class*="w-[380px]"]',

  // Chat
  // Scoped to the real chatbot panel — see .scratch/0002-chatbot-lead-flow-fix.md
  // for why the previous page-global `button:has-text(...)` / `[class*=...]`
  // selectors below silently matched unrelated homepage elements (FAQ
  // accordion, WhatsApp icon, case-selector tabs).
  quickQuestionBtn: '[data-testid="chatbot-panel"] [data-testid="quick-question-button"]',
  inputArea:      'textarea[placeholder*="سؤالك"]',
  sendBtn:        'button[aria-label="إرسال"]',
  assistantBubble: '[data-testid="chatbot-panel"] [data-testid="assistant-message-bubble"]',
  // aiBubble/userBubble below are unused (kept for reference); they never
  // matched real markup even before this fix — see
  // .scratch/ISSUE-chatbot-e2e-neutered-assertions.md.
  aiBubble:       '[class*="ai-bubble"], [class*="bot-message"]',
  userBubble:     '[class*="user-bubble"], [class*="user-message"]',
  sourceBadge:    '[data-testid="source-badge"]',
  typingDots:     '[data-testid="typing-indicator"], [class*="typing"], [class*="animate-pulse"]',

  // Lead prompt
  leadPromptBanner: '[data-testid="lead-prompt"], [class*="lead-prompt"]',
  leadYesBtn:     'button:has-text("نعم"), button:has-text("تواصل")',
  // Scoped to the real decline control (FloatingChatbot already exposes this
  // testid) — the previous text-based selector matched a homepage "success
  // stories" tab whose label happens to contain "لا" as a substring.
  leadNoBtn:      '[data-testid="chatbot-panel"] [data-testid="lead-decline-button"]',

  // Lead form
  leadForm:       '[data-testid="lead-form"], form',
  nameInput:      'input[placeholder*="الاسم"], input[placeholder*="اسم"]',
  phoneInput:     'input[type="tel"], input[placeholder*="رقم"], input[placeholder*="جوال"]',
  submitLeadBtn:  'button:has-text("تأكيد"), button:has-text("تواصل"), button:has-text("إرسال")',
  leadErrMsg:     '[data-testid="lead-error"], [class*="error"], [class*="text-red"]',

  // Thank-you
  thankYouScreen: '[data-testid="lead-done"], [class*="success"], [class*="شكر"]',
  continueBtn:    'button:has-text("طرح"), button:has-text("سؤال"), button:has-text("آخر")',

  // Misc
  unreadBadge:    '[data-testid="unread-badge"], [class*="badge"]',
  closeBtn:       'button[aria-label="إغلاق"], button[aria-label="close"]',
} as const;

// ── Helper Functions ──────────────────────────────────────────

/** Open the chatbot widget */
export async function openWidget(page: Page) {
  // Try primary selector first, then fallback
  const trigger = page.locator(SEL.triggerBtn).first();
  const triggerAlt = page.locator(SEL.triggerBtnAlt).first();
  
  if (await trigger.isVisible()) {
    await trigger.click();
  } else {
    await triggerAlt.click();
  }
  
  // Wait for panel to appear
  await page.waitForTimeout(500);
}

/** Send a message and wait for AI response */
export async function sendAndWaitForReply(page: Page, message: string) {
  await page.fill(SEL.inputArea, message);
  await page.click(SEL.sendBtn);
  // Wait for response
  await page.waitForTimeout(3000);
}

/** Fill and submit the lead form */
export async function submitLeadForm(page: Page, name: string, phone: string) {
  await page.click(SEL.leadYesBtn);
  await page.waitForTimeout(300);
  const form = page.locator(SEL.leadForm);
  if (await form.isVisible()) {
    const nameInput = page.locator(SEL.nameInput).first();
    const phoneInput = page.locator(SEL.phoneInput).first();
    if (await nameInput.isVisible()) await nameInput.fill(name);
    if (await phoneInput.isVisible()) await phoneInput.fill(phone);
    await page.click(SEL.submitLeadBtn);
  }
}

/** Mock the AI API to return a fast deterministic response */
export function mockAiApi(page: Page) {
  return page.route('**/api/ai/ask', (route: Route) => {
    route.fulfill({
      status:      200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: {
          answer:  "بناءً على خبرة فريق صرح، يمكنني إرشادك في هذا الموضوع...",
          sources: [
            { post_id: "fb_001", similarity: 94.2, excerpt: "حماية الشركات تبدأ بالعقود المحكمة" },
            { post_id: "fb_008", similarity: 87.1, excerpt: "الهيكلة القانونية السليمة" },
          ],
          model:  "claude-sonnet-4-5",
          tokens: 312,
        },
      }),
    });
  });
}

/** Mock the leads API */
export function mockLeadsApi(page: Page, statusCode = 201) {
  return page.route('**/api/leads', (route: Route) => {
    route.fulfill({
      status:      statusCode,
      contentType: "application/json",
      body:        JSON.stringify({ success: statusCode === 201 }),
    });
  });
}

/** Generate a unique test phone number */
export function testPhone(): string {
  return `010${Math.floor(Math.random() * 9_000_000 + 1_000_000)}`;
}

/** Generate a unique test name */
export function testName(): string {
  return `E2E_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}
