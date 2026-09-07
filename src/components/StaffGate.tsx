import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { getStaffSession, isAllowlistedStaff, sendStaffMagicLink } from '../lib/staffAuth';

export default function StaffGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const session = getStaffSession();
    if (!session) { setReady(true); return; }
    isAllowlistedStaff(session).then(setAllowed).finally(() => setReady(true));
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSending(true); setMessage('');
    try { await sendStaffMagicLink(email); setMessage('أُرسل رابط دخول آمن إلى بريدك. افتحه من نفس المتصفح.'); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'تعذر إرسال الرابط.'); }
    finally { setSending(false); }
  };

  if (!ready) return <div className="min-h-screen bg-navy flex items-center justify-center text-white">جارٍ التحقق من الجلسة…</div>;
  if (allowed) return <>{children}</>;
  return <div className="min-h-screen bg-navy flex items-center justify-center p-6" dir="rtl"><div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full"><div className="text-center mb-8"><Shield size={30} className="mx-auto mb-4 text-gold"/><h1 className="text-2xl font-black text-navy">دخول فريق صرح</h1><p className="text-gray-500 text-sm mt-2">استخدم بريدك الوظيفي المصرّح له.</p></div><form onSubmit={submit} className="space-y-4"><input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="البريد الإلكتروني" className="w-full px-5 py-3.5 border border-gray-200 rounded-xl text-left" dir="ltr"/><button disabled={sending} className="w-full bg-gold text-white py-3.5 rounded-xl font-bold disabled:opacity-50">{sending ? 'جارٍ الإرسال…' : 'إرسال رابط الدخول'}</button></form>{message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}<p className="mt-6 text-center text-xs text-gray-400">لن يظهر المحتوى إلا للحسابات الموجودة في قائمة الموظفين المصرّح لهم.</p></div></div>;
}
