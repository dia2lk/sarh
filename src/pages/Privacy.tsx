import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const sections = [
  {
    title: 'البيانات التي نجمعها',
    body: 'نجمع البيانات التي تقدمونها طوعاً عبر نماذج الموقع (الاسم، رقم الهاتف، البريد الإلكتروني، ووصف الطلب)، بالإضافة إلى بيانات تصفح مجهولة الهوية لأغراض تحليلية.',
  },
  {
    title: 'كيف نستخدم بياناتكم',
    body: 'تُستخدم بياناتكم حصراً للتواصل معكم بشأن طلباتكم وتقديم الخدمات القانونية والمحاسبية المطلوبة، وتحسين تجربة استخدام الموقع. لا نبيع بياناتكم ولا نشاركها مع أي طرف ثالث لأغراض تسويقية.',
  },
  {
    title: 'السرية المهنية',
    body: 'تخضع جميع المعلومات المقدمة لنا لقواعد السرية المهنية للمحاماة والمحاسبة، مع تطبيق اتفاقيات عدم إفصاح (NDA) وتشفير للبيانات الحساسة.',
  },
  {
    title: 'حقوقكم',
    body: 'يحق لكم طلب الاطلاع على بياناتكم أو تصحيحها أو حذفها في أي وقت عبر التواصل معنا على legalsarh@gmail.com.',
  },
];

export default function Privacy() {
  return (
    <>
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <Shield size={36} className="text-gold mx-auto mb-4" />
          <h1 className="text-4xl font-black text-white mb-4">سياسة <span className="text-gold">الخصوصية</span></h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">كيف نتعامل مع بياناتكم ونحميها</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-navy mb-3">{s.title}</h2>
              <p className="text-gray-text leading-relaxed">{s.body}</p>
            </div>
          ))}
          <div className="pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm mb-6">لأي استفسار حول الخصوصية، تواصلوا معنا مباشرة.</p>
            <Link to="/contact" className="inline-block bg-gradient-to-l from-gold to-gold-light text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg transition-all">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
