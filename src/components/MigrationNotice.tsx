const CURRENT_SITE_URL = "https://sarhgrowth-kas3u7ho.manus.space/";

export default function MigrationNotice() {
  return (
    <aside
      className="border-b border-[#c29a56]/35 bg-[#fff8e9] px-4 py-3 text-[#34230d]"
      role="status"
      aria-labelledby="migration-notice-title"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center" dir="rtl">
        <div>
          <p id="migration-notice-title" className="font-bold">انتقلنا إلى النسخة الأحدث من موقع صرح</p>
          <p className="mt-1 text-sm leading-6 text-[#6e5229]">هذه النسخة متاحة مؤقتاً. استخدم الموقع الجديد للوصول إلى أحدث الخدمات ونماذج الحجز وبيانات الخصوصية.</p>
        </div>
        <a
          href={CURRENT_SITE_URL}
          className="shrink-0 rounded-lg bg-[#0f2742] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#173c64]"
        >
          فتح الموقع الجديد
        </a>
      </div>
    </aside>
  );
}
