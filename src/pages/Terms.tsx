import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

const sections = [
  {
    title: 'طبيعة المحتوى',
    body: 'المحتوى المنشور على هذا الموقع — بما في ذلك ردود المستشار الذكي — هو معلومات عامة لأغراض التوعية فقط، ولا يشكّل رأياً قانونياً ملزماً ولا يغني عن الاستشارة المتخصصة مع محامٍ أو محاسب.',
  },
  {
    title: 'العلاقة المهنية',
    body: 'لا تنشأ علاقة (محامٍ – موكل) إلا بموجب اتفاق أتعاب مكتوب وموقّع بين الطرفين. حجز استشارة عبر الموقع هو طلب تواصل مبدئي فقط.',
  },
  {
    title: 'استخدام الموقع',
    body: 'باستخدامكم الموقع، تلتزمون بعدم إساءة استخدامه أو محاولة الوصول غير المصرح به لأي جزء منه، وبتقديم بيانات صحيحة في النماذج.',
  },
  {
    title: 'الملكية الفكرية',
    body: 'جميع حقوق المحتوى والعلامة التجارية "صرح" محفوظة، ولا يجوز إعادة نشر المحتوى دون إذن كتابي مسبق.',
  },
];

export default function Terms() {
  return (
    <>
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <Scale size={36} className="text-gold mx-auto mb-4" />
          <h1 className="text-4xl font-black text-white mb-4">الشروط <span className="text-gold">والأحكام</span></h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">قواعد استخدام موقع وخدمات صرح</p>
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
            <Link to="/book-consultation" className="inline-block bg-gradient-to-l from-gold to-gold-light text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg transition-all">
              احجز استشارة رسمية
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
