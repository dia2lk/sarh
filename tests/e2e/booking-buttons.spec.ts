// ============================================================
// tests/e2e/booking-buttons.spec.ts
//
// Playwright E2E — /book-consultation action buttons
//
// Locks in the externally observable behaviour of the three action
// buttons after they were migrated to <Button> (ticket 02):
//   • step 1 "التالي"  — primary, disabled until a type is picked
//   • step 2 "السابق"  — secondary (outlined navy), returns to step 1
//   • step 2 "تأكيد الحجز" — primary submit, drives its in-flight
//     state from the component's `loading` prop
// ============================================================

import { test, expect, Page, Route } from "@playwright/test";
import { BASE_URL } from "./helpers";

const BOOKING_URL = `${BASE_URL}/book-consultation`;

// A phone that satisfies the page's own /^01[0-9]{9}$/ check (helpers'
// testPhone() is 10 digits and would fail booking validation).
const VALID_PHONE = "01012345678";

// ── local helpers ─────────────────────────────────────────────

async function gotoBooking(page: Page) {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { name: "اختر نوع الاستشارة" })).toBeVisible();
}

/** Pick the first consultation-type card and advance to step 2. */
async function advanceToStep2(page: Page) {
  await page.getByRole("button", { name: /تأسيس الشركات وحوكمة الأعمال/ }).click();
  await page.getByRole("button", { name: "التالي" }).click();
  await expect(page.getByRole("heading", { name: "البيانات الشخصية" })).toBeVisible();
}

/** Fill the step-2 required fields with valid data. */
async function fillStep2(page: Page) {
  await page.getByPlaceholder("أدخل اسمك الكامل").fill("عميل الاختبار");
  await page.getByPlaceholder("01XXXXXXXXX").fill(VALID_PHONE);
  await page.getByLabel(/وصف موجز لطلبك/).fill("وصف موجز لطلب استشارة الاختبار الآلي.");
}

/**
 * Make submitToSupabase() take its real fetch() path (it no-ops unless
 * these globals are set) and return a handle that releases the request.
 */
async function stubHangingSubmit(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as Record<string, unknown>).__SUPABASE_URL__ = "https://stub.supabase.test";
    (window as unknown as Record<string, unknown>).__SUPABASE_KEY__ = "stub-anon-key";
  });

  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });

  await page.route("**/rest/v1/leads", async (route: Route) => {
    await gate;
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify([{ id: "e2e-lead" }]),
    });
  });

  return { release };
}

// ── step 1 — "التالي" ─────────────────────────────────────────

test.describe("Booking buttons — step 1 next", () => {
  test("is disabled until a consultation type is selected, and clicking it while disabled does not advance", async ({ page }) => {
    await gotoBooking(page);

    const next = page.getByRole("button", { name: "التالي" });
    await expect(next).toBeVisible();
    await expect(next).toBeDisabled();

    await next.click({ force: true }).catch(() => { /* disabled button swallows the click */ });
    await expect(page.getByRole("heading", { name: "اختر نوع الاستشارة" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "البيانات الشخصية" })).toHaveCount(0);
  });

  test("becomes enabled after selecting a type and advances to step 2", async ({ page }) => {
    await gotoBooking(page);

    const next = page.getByRole("button", { name: "التالي" });
    await page.getByRole("button", { name: /تأسيس الشركات وحوكمة الأعمال/ }).click();
    await expect(next).toBeEnabled();

    await next.click();
    await expect(page.getByRole("heading", { name: "البيانات الشخصية" })).toBeVisible();
  });
});

// ── step 2 — "السابق" ─────────────────────────────────────────

test.describe("Booking buttons — step 2 back", () => {
  test("is the outlined secondary action (not gold-filled) and returns to step 1", async ({ page }) => {
    await gotoBooking(page);
    await advanceToStep2(page);

    const back = page.getByRole("button", { name: "السابق" });
    await expect(back).toBeVisible();
    await expect(back).toHaveClass(/border-navy/);
    await expect(back).not.toHaveClass(/bg-gold/);

    await back.click();
    await expect(page.getByRole("heading", { name: "اختر نوع الاستشارة" })).toBeVisible();
  });
});

// ── step 2 — "تأكيد الحجز" ────────────────────────────────────

test.describe("Booking buttons — step 2 submit", () => {
  test("shows the spinner + \"جارٍ الإرسال...\", exposes aria-busy, and cannot be re-clicked while the submit is pending", async ({ page }) => {
    const { release } = await stubHangingSubmit(page);
    await gotoBooking(page);
    await advanceToStep2(page);
    await fillStep2(page);

    const submit = page.locator('form button[type="submit"]');
    await submit.click();

    await expect(page.getByRole("button", { name: /جارٍ الإرسال/ })).toBeVisible();
    await expect(submit).toHaveAttribute("aria-busy", "true");
    await expect(submit).toBeDisabled();
    await expect(submit.locator("svg.animate-spin")).toBeVisible();

    // A second click must not fire a second submission.
    await submit.click({ force: true }).catch(() => { /* disabled */ });
    await expect(submit).toBeDisabled();

    release();
    await expect(page.getByRole("heading", { name: "تم الحجز بنجاح!" })).toBeVisible();
  });

  test("shows the success screen when the submit resolves", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as Record<string, unknown>).__SUPABASE_URL__ = "https://stub.supabase.test";
      (window as unknown as Record<string, unknown>).__SUPABASE_KEY__ = "stub-anon-key";
    });
    await page.route("**/rest/v1/leads", (route) =>
      route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify([{ id: "e2e-lead" }]),
      }),
    );

    await gotoBooking(page);
    await advanceToStep2(page);
    await fillStep2(page);
    await page.locator('form button[type="submit"]').click();

    await expect(page.getByRole("heading", { name: "تم الحجز بنجاح!" })).toBeVisible();
    // The success-screen link is still a plain router <Link>, not <Button>.
    await expect(page.getByRole("link", { name: "العودة للرئيسية" })).toBeVisible();
  });
});

// ── full flow (runs on every project, incl. Pixel 5) ──────────

test.describe("Booking buttons — end to end", () => {
  test("the three buttons render and the booking flow completes under RTL", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as Record<string, unknown>).__SUPABASE_URL__ = "https://stub.supabase.test";
      (window as unknown as Record<string, unknown>).__SUPABASE_KEY__ = "stub-anon-key";
    });
    await page.route("**/rest/v1/leads", (route) =>
      route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify([{ id: "e2e-lead" }]),
      }),
    );

    await gotoBooking(page);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

    // step 1
    await expect(page.getByRole("button", { name: "التالي" })).toBeVisible();
    await advanceToStep2(page);

    // step 2 — both actions present
    await expect(page.getByRole("button", { name: "السابق" })).toBeVisible();
    await expect(page.locator('form button[type="submit"]')).toBeVisible();

    await fillStep2(page);
    await page.locator('form button[type="submit"]').click();
    await expect(page.getByRole("heading", { name: "تم الحجز بنجاح!" })).toBeVisible();

    // sidebar quick-help links are untouched — still plain anchors, not <Button>
    await expect(page.locator('a[href="tel:01117819505"]').first()).toBeVisible();
    await expect(page.locator('a[href*="wa.me"]').first()).toBeVisible();
  });
});
