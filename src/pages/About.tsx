import { Link } from 'react-router-dom';
import {
  Users, Award, Target, Eye, ArrowLeft, Shield, Clock, Star,
  Scale, GraduationCap, Globe, BookOpen, CheckCircle2
} from 'lucide-react';

const leadership = [
  {
    name: 'د. إسلام إبراهيم',
    role: 'المؤسس والشريك العام — رئيس مجلس الإدارة',
    desc: 'المؤسس والشريك العام لشركة صرح — قاد فريق نخبة من الدكاترة الأكاديميين المتخصصين في القانون والمحاسبة لبناء منظومة متكاملة تجمع بين العمق الأكاديمي والخبرة العملية. خبير قانوني في القضايا الجنائية الاقتصادية والمعقدة، بسجل حافل من البراءات في قضايا عابرة للحدود، ويمتلك خبرة واسعة في التمثيل القانوني أمام المحاكم المصرية والكويتية.',
    highlights: [
      'خبرة +20 عاماً في المحاماة والاستشارات القانونية',
      'سجل براءات مثبت في قضايا تزوير ورشوة واتجار بالبشر',
      'متخصص في القضايا الاقتصادية عالية الحساسية',
      'استشاري قانوني لشركات كبرى (بوند فودز، الفخراني، أركان)',
    ],
    icon: Scale,
  },
];

const team = [
  { name: 'د. أحمد حسين', role: 'شريك — رئيس قسم القضايا التجارية', desc: 'دكتور أكاديمي متخصص في القضايا التجارية والتحكيم الدولي بخبرة 18 عاماً' },
  { name: 'د. منى عبد الرحمن', role: 'مديرة قسم الاستشارات القانونية', desc: 'دكتورة أكاديمية خبيرة في تأسيس الشركات والامتثال التنظيمي وحوكمة الأعمال' },
  { name: 'د. خالد محمد', role: 'مدير قسم الاستشارات الضريبية', desc: 'دكتور أكاديمي متخصص في الضرائب والمحاسبة والهيكلة الضريبية' },
  { name: 'د. فاطمة السيد', role: 'مديرة قسم المحاسبة والمراجعة', desc: 'دكتورة أكاديمية حاصلة على شهادة CPA مع خبرة 15 عاماً في المراجعة المالية' },
];

const values = [
  { icon: Shield, title: 'النزاهة والشفافية', desc: 'نلتزم بأعلى معايير النزاهة في كل تعاملاتنا' },
  { icon: Star, title: 'التميز والاحترافية', desc: 'نسعى دائماً لتقديم أفضل الخدمات القانونية' },
  { icon: Clock, title: 'الالتزام بالمواعيد', desc: 'نحترم وقت عملائنا ونلتزم بالجداول الزمنية' },
  { icon: Users, title: 'العمل الجماعي', desc: 'نؤمن بقوة الفريق المتكامل والتعاون' },
  { icon: Target, title: 'التركيز على النتائج', desc: 'نركز على تحقيق نتائج ملموسة لعملائنا' },
  { icon: Award, title: 'الابتكار المستمر', desc: 'نتبنى أحدث الأساليب والتقنيات القانونية' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-transparent via-gold/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">من نحن</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            تعرف على <span className="text-gold">صرح</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            تأسست صرح بجمع نخبة من الدكاترة الأكاديميين المتخصصين في القانون والمحاسبة، لنقدم حلولاً مبتكرة تحمي أعمالكم وتدعم نموكم بثقة واستقرار.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold font-bold text-sm tracking-wider mb-4 block">قصتنا</span>
              <h2 className="text-3xl md:text-4xl font-black text-navy mb-6">
                نخبة من <span className="text-gold">الدكاترة الأكاديميين</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                تأسست شركة صرح للخدمات القانونية والمحاسبية بجمع نخبة متميزة من <strong className="text-navy">الدكاترة الأكاديميين</strong> المتخصصين في شتى فروع القانون والمحاسبة، الذين يؤمنون بأن الدفاع الحقيقي عن الحقوق يتطلب مزيجاً فريداً بين <strong className="text-navy">العمق الأكاديمي</strong> و<strong className="text-navy">الخبرة العملية</strong>.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                هذه النخبة من الدكاترة الأكاديميين تمثل الركيزة الأساسية لصرح، حيث يجمع كل عضو من أعضاء الفريق بين التأهيل الأكاديمي الرفيع والخبرة العملية المتراكمة عبر أكثر من عقدين من الزمن، مما يمنح عملاءنا ثقلة علمية ومهنية لا مثيل لها.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                على مدار سنوات من العمل الدؤوب، توسعت صرح لتشمل فرعين رئيسيين في <strong className="text-navy">بني سويف</strong> (كورنيش النيل - برج الصفوة) و<strong className="text-navy">الجيزة</strong> (القرية الذكية - مبني نورث سايد)، مع شبكة واسعة من الشركاء الدوليين في الكويت ودول الخليج العربي.
              </p>
              <p className="text-gray-500 leading-relaxed">
                فريقنا الأكاديمي المتكامل يمتلك خبرات متنوعة تغطي جميع جوانب القانون التجاري والمدني والجنائي والضريبي والمحاسبي، مما يتيح لنا تقديم حلول مبتكرة تجمع بين الرصانة العلمية والكفاءة المهنية في خدمة عملائنا.
              </p>
            </div>
            <div className="relative">
              <div className="bg-navy rounded-3xl p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="relative space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center">
                      <Users size={30} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-gold">+50</p>
                      <p className="text-gray-300">محامي ومستشار متخصص</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center">
                      <Award size={30} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-gold">2</p>
                      <p className="text-gray-300">فرع رئيسي (بني سويف، الجيزة)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center">
                      <Star size={30} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-gold">+20</p>
                      <p className="text-gray-300">سنة من الخبرة والتميز</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center">
                      <Globe size={30} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-gold">+5</p>
                      <p className="text-gray-300">دول نخدم عملاءنا فيها</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership - Dr. Islam Ibrahim */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">القيادة</span>
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
              مؤسس <span className="text-gold">صرح</span>
            </h2>
            <div className="section-divider"></div>
          </div>

          {leadership.map((leader, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden card-hover border border-gray-100 shadow-sm">
              <div className="grid lg:grid-cols-12 gap-0">
                {/* Profile Section */}
                <div className="lg:col-span-4 bg-navy p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-10"></div>
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-gold/30">
                      <leader.icon size={56} className="text-gold" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">{leader.name}</h3>
                    <p className="text-gold font-bold text-sm mb-4">{leader.role}</p>
                    <div className="flex items-center justify-center gap-2">
                      <GraduationCap size={14} className="text-gold" />
                      <span className="text-gray-400 text-xs">دكتوراه في القانون</span>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="lg:col-span-8 p-10">
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{leader.desc}</p>

                  <h4 className="text-navy font-bold text-sm mb-4 flex items-center gap-2">
                    <BookOpen size={16} className="text-gold" />
                    أبرز الإنجازات والمؤهلات
                  </h4>

                  <div className="space-y-3">
                    {leader.highlights.map((h, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 size={14} className="text-gold" />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{h}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="bg-gold/10 text-gold text-xs font-bold px-4 py-2 rounded-full">القضايا الجنائية الاقتصادية</span>
                    <span className="bg-gold/10 text-gold text-xs font-bold px-4 py-2 rounded-full">القضايا العابرة للحدود</span>
                    <span className="bg-gold/10 text-gold text-xs font-bold px-4 py-2 rounded-full">الاستشارات القانونية للشركات</span>
                    <span className="bg-gold/10 text-gold text-xs font-bold px-4 py-2 rounded-full">التأسيس والحوكمة</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100">
              <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
                <Eye size={30} className="text-gold" />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4">رؤيتنا</h3>
              <p className="text-gray-500 leading-relaxed text-lg">
                أن نكون الشريك القانوني والمحاسبي الأول والأكثر ثقة في جمهورية مصر العربية والمنطقة العربية، ونساهم في بناء بيئة أعمال قانونية مستدامة ومزدهرة.
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100">
              <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
                <Target size={30} className="text-gold" />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4">مهمتنا</h3>
              <p className="text-gray-500 leading-relaxed text-lg">
                تقديم حلول قانونية ومحاسبية مبتكرة وشاملة تتجاوز توقعات عملائنا، من خلال فريق متخصص يعمل بشغف واحترافية لحماية مصالحهم وتحقيق أهدافهم.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">قيمنا</span>
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">القيم التي <span className="text-gold">تحركنا</span></h2>
            <div className="section-divider"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl hover:bg-gold/5 transition-colors duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <val.icon size={22} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-2">{val.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-transparent via-gold/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold font-bold text-sm tracking-wider mb-4 block">فريقنا</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">نخبة من <span className="text-gold">الدكاترة الأكاديميين</span></h2>
            <div className="section-divider"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white/5 backdrop-blur rounded-2xl p-8 text-center border border-white/5 hover:border-gold/30 transition-all duration-300 card-hover">
                <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-black text-gold">{member.name.charAt(2)}</span>
                </div>
                <h4 className="text-white font-bold text-lg mb-1">{member.name}</h4>
                <p className="text-gold text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-l from-gold to-gold-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-black text-navy-dark mb-4">هل تبحث عن شريك قانوني موثوق؟</h3>
          <p className="text-navy/80 mb-8 text-lg">دعنا نساعدك في حماية أعمالك وتحقيق أهدافك القانونية</p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 bg-navy-dark text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-navy transition-all duration-300 hover:scale-105"
          >
            <span>احجز استشارة الآن</span>
            <ArrowLeft size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
