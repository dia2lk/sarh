export interface StaffSession {
  accessToken: string;
  expiresAt: number;
}

const storageKey = 'sarh_staff_session';

function config() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error('إعدادات Supabase غير مكتملة.');
  return { url, anonKey };
}

export function getStaffSession(): StaffSession | null {
  const hash = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = hash.get('access_token');
  const expiresIn = Number(hash.get('expires_in') || 0);
  if (accessToken && expiresIn) {
    const session = { accessToken, expiresAt: Date.now() + expiresIn * 1000 };
    sessionStorage.setItem(storageKey, JSON.stringify(session));
    history.replaceState(null, '', `${location.pathname}${location.search}`);
    return session;
  }
  try {
    const session = JSON.parse(sessionStorage.getItem(storageKey) || 'null') as StaffSession | null;
    return session && session.expiresAt > Date.now() ? session : null;
  } catch { return null; }
}

export async function sendStaffMagicLink(email: string) {
  const { url, anonKey } = config();
  const response = await fetch(`${url}/auth/v1/otp`, {
    method: 'POST',
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, create_user: false, options: { emailRedirectTo: `${location.origin}${location.pathname}` } }),
  });
  if (!response.ok) throw new Error('تعذر إرسال رابط الدخول. تحقق من البريد أو إعدادات Supabase.');
}

export async function isAllowlistedStaff(session: StaffSession) {
  const { url, anonKey } = config();
  const response = await fetch(`${url}/rest/v1/rpc/is_staff`, {
    method: 'POST',
    headers: { apikey: anonKey, Authorization: `Bearer ${session.accessToken}`, 'Content-Type': 'application/json' },
    body: '{}',
  });
  return response.ok && (await response.json()) === true;
}

export function clearStaffSession() { sessionStorage.removeItem(storageKey); }
