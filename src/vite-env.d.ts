/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_AI_API_ENDPOINT?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_RECAPTCHA_SITE_KEY?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_CRM_ACCESS_CODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
