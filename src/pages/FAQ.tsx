import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowLeft, MessageCircle, Shield, Clock, CreditCard, Building2, Scale, HelpCircle } from 'lucide-react';
import { trackFAQInteraction, trackCTAClick } from '../lib/analytics';

const faqCategories = [
  {
    title: 'البدء مع صرح',
    icon: HelpCircle,
    questions: [
      {
        q: 'كيف أبدأ التعامل مع صرح؟',
        a: 'من خلال حجز استشارة أولية لتقييم وضعك القانوني وتحديد الحل المناسب. يمكنك الحجز مباشرة عبر نموذج الحجز على الموقع أو التواصل عبر واتساب أو الاتصال المباشر. نقدم استشارة أولية مجانية لمدة تصل إلى 30 دقيقة.',
      },
      {
        q: 'هل يمكن إجراء الاستشارة عن بُعد؟',
        a: 'بالتأكيد! نقدم استشارات عن بُعد عبر مكالمات الفيديو أو الهاتف لراحة عملائنا. هذا يتيح لنا خدمة عملائنا في أي مكان داخل مصر أو خارجها، مع الحفاظ على جودة الخدمة وسرية المعلومات.',
      },
      {
        q: 'ما هي المناطق التي تغطونها؟',
        a: 'لنا فرعان في بني سويف (كورنيش النيل - برج الصفوة) والجيزة (القرية الذكية - مبني نورث سايد). نقدم خدماتنا في جميع أنحاء جمهورية مصر العربية. كما نتعامل مع قضايا دولية عبر شبكة مكاتبنا الشريكة في الكويت ودول الخليج.',
      },
      {
        q: 'ما هي لغات العمل لديكم؟',
        a: 'نعمل باللغتين العربية والإنجليزية بطلاقة. كما يتوفر لدينا محامون يتحدثون لغات أخرى حسب الحاجة، مما يتيح لنا خدمة العملاء الدوليين والمستثمرين الأجانب بكفاءة.',
      },
    ],
  },
  {
    title: 'الأمان والسرية',
    icon: Shield,
    questions: [
      {
        q: 'هل بياناتي ومستنداتي آمنة؟',
        a: 'نلتزم بأعلى معايير حماية البيانات والتشفير (End-to-End)، مع تطبيق اتفاقيات سرية صارمة (NDA). نستخدم أحدث تقنيات حماية البيانات ونلتزم بأعلى معايير الأمان المتعارف عليها دولياً. جميع المعلومات محمية بموجب قواعد السرية المهنية.',
      },
      {
        q: 'كيف تضمنون سرية معلوماتي؟',
        a: 'نلتزم بأعلى معايير السرية والخصوصية المهنية. جميع المعلومات محمية بموجب قواعد السرية المهنية للمحامين. نوقع اتفاقيات سرية مع جميع عملائنا ونستخدم أنظمة آمنة مشفرة لإدارة الملفات والمراسلات.',
      },
      {
        q: 'هل توقعون اتفاقيات عدم الإفصاح (NDA)؟',
        a: 'نعم، نوقع اتفاقيات عدم الإفصاح واتفاقيات السرية مع جميع عملائنا كجزء من إجراءات التعاقد. نحن ملزمون مهنياً وأخلاقياً بالحفاظ على سرية جميع المعلومات والبيانات المقدمة من العملاء.',
      },
    ],
  },
  {
    title: 'التكاليف والرسوم',
    icon: CreditCard,
    questions: [
      {
        q: 'كيف يتم تحديد التكلفة؟',
        a: 'تُحدد بناءً على نطاق وتعقيد الخدمة، مع شفافية كاملة قبل التنفيذ. نعتمد مبدأ الشفافية؛ تُوضح كافة التكاليف قبل البدء. نقدم عروض أسعار مفصلة وواضحة مع إمكانية الاتفاق على خطط دفع مرنة.',
      },
      {
        q: 'هل تقدمون خطط دفع مرنة؟',
        a: 'نعم، نقدم خطط دفع مرنة تناسب احتياجات عملائنا. يمكن الاتفاق على جدول دفعات يتناسب مع ميزانيتكم. نحرص على الشفافية الكاملة في جميع الأمور المالية ونوضح كل التكاليف مسبقاً.',
      },
      {
        q: 'كيف تحسبون أتعاب المحاماة؟',
        a: 'تعتمد طريقة حساب الأتعاب على نوع القضية وطبيعة الخدمة. قد تكون رسوماً ثابتة للاستشارات والعقود، أو أتعاباً بالساعة للقضايا المعقدة، أو أتعاباً شهرية لخدمات الامتثال والاستشارات المستمرة. نتفق معكم على الطريقة المناسبة مسبقاً بشفافية تامة.',
      },
      {
        q: 'هل الاستشارة الأولى مجانية؟',
        a: 'نعم، نقدم استشارة أولية مجانية لمدة تصل إلى 30 دقيقة لفهم طبيعة احتياجاتكم القانونية وتقديم التوجيه المناسب. بعد الاستشارة الأولى، نقدم عرض سعر شفاف ومفصل قبل البدء بأي عمل.',
      },
    ],
  },
  {
    title: 'خدمات الشركات والأعمال',
    icon: Building2,
    questions: [
      {
        q: 'هل تقدمون دعم مستمر للشركات؟',
        a: 'نعم، نوفر خدمات مستشار قانوني دائم لإدارة كافة الجوانب القانونية. نقدم باقات اشتراك شهرية للشركات تشمل استشارات قانونية غير محدودة ومراجعة العقود والامتثال التنظيمي والدعم القانوني المستمر. نقدم باقات مختلفة تناسب حجم الشركة واحتياجاتها.',
      },
      {
        q: 'كم يستغرق تأسيس شركة جديدة؟',
        a: 'تختلف المدة حسب نوع الشركة ومتطلباتها. بشكل عام، تأسيس شركة ذات مسؤولية محدودة يستغرق من 3 إلى 7 أيام عمل بعد اكتمال المستندات. الشركات المساهمة والكيانات المعقدة قد تحتاج لفترة أطول. نضمن سير العملية بسلاسة وكفاءة.',
      },
      {
        q: 'هل تقدمون خدمات قانونية للشركات الناشئة؟',
        a: 'نعم، نقدم باقة متكاملة من الخدمات القانونية للشركات الناشئة تشمل تأسيس الشركة وصياغة العقود وحماية الملكية الفكرية والامتثال التنظيمي والاستشارات الضريبية بأسعار تناسب ميزانياتها.',
      },
    ],
  },
  {
    title: 'القضايا والتمثيل القانوني',
    icon: Scale,
    questions: [
      {
        q: 'كيف تتعاملون مع القضايا الاقتصادية المعقدة؟',
        a: 'نمتلك فريقاً متخصصاً في الجنايات الاقتصادية والقضايا المعقدة. نتولى التمثيل القانوني في قضايا النقد الأجنبي والرشوة والتزوير وغسيل الأموال، مع سجل براءات مثبت في قضايا عابرة للحدود. نتبع منهجية دقيقة تشمل التحليل الشامل وبناء دفاع قوي.',
      },
      {
        q: 'هل يمكنكم التمثيل في قضايا دولية؟',
        a: 'نعم، نتعامل مع قضايا دولية عبر شبكة مكاتبنا الشريكة في عدة دول. نقدم التمثيل القانوني في النزاعات التجارية الدولية وقضايا التحكيم وفض المنازعات عبر الحدود.',
      },
      {
        q: 'ما هي إجراءات رفع دعوى قضائية؟',
        a: 'نبدأ بتقييم شامل للقضية وجمع الأدلة والمستندات، ثم نُعد صحيفة الدعوى ونقدمها للمحكمة المختصة. نتولى متابعة جميع الجلسات والمرافعات حتى صدور الحكم النهائي وتنفيذه.',
      },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (questionText: string, index: number) => {
    const action = openIndex === index ? 'close' : 'open';
    trackFAQInteraction(questionText, action as 'open' | 'close');
    setOpenIndex(openIndex === index ? null : index);
  };

  const switchCategory = (idx: number) => {
    setActiveCategory(idx);
    setOpenIndex(0);
  };

  const currentCategory = faqCategories[activeCategory];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">الأسئلة الشائعة</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            إجابات <span className="text-gold-gradient">فورية</span> لاستفساراتكم
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            نقدم لكم إجابات شاملة حول أكثر الأسئلة شيوعاً حول خدماتنا وإجراءات العمل
          </p>
        </div>
      </section>

      {/* Category Navigation + FAQ Content */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 sticky top-20 z-10 bg-white py-4 border-b border-gray-100">
            {faqCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => switchCategory(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === i
                    ? 'bg-navy text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gold/10 hover:text-gold'
                }`}
              >
                <cat.icon size={16} />
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {currentCategory.questions.map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  openIndex === i
                    ? 'border-gold/30 bg-gold/5 shadow-lg'
                    : 'border-gray-100 bg-white hover:border-gold/20'
                }`}
              >
                <button
                  onClick={() => handleToggle(faq.q, i)}
                  className="w-full flex items-center justify-between p-6 text-right"
                >
                  <span className={`font-bold text-lg ${openIndex === i ? 'text-gold' : 'text-navy'} transition-colors`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-4 transition-all ${
                    openIndex === i ? 'bg-gold text-white rotate-180' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="px-6 pb-6 text-gray-text leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-20 bg-gray-light">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'استجابة سريعة', desc: 'نضمن الرد على جميع استفساراتكم خلال ساعات قليلة' },
              { icon: Shield, title: 'سرية تامة', desc: 'نلتزم بأعلى معايير السرية وحماية البيانات' },
              { icon: CreditCard, title: 'شفافية كاملة', desc: 'نوضح جميع التكاليف والإجراءات قبل البدء بالعمل' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center card-hover">
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-gold" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            لم تجد إجابة <span className="text-gold">لسؤالك</span>؟
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            فريقنا جاهز للإجابة على جميع استفساراتكم القانونية. تواصل معنا مباشرة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-consultation"
              onClick={() => trackCTAClick('احجز استشارة مجانية', 'faq_cta', '/book-consultation')}
              className="bg-gradient-to-l from-gold to-gold-light text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>احجز استشارة مجانية</span>
              <ArrowLeft size={20} />
            </Link>
            <a
              href="https://wa.me/201117819505"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick('تواصل واتساب', 'faq_cta', 'whatsapp')}
              className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              <span>تواصل واتساب</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
