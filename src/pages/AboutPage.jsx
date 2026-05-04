import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SchemaLD from '../components/SchemaLD'
import { Target, Eye, Heart, Award, Users, Scale, ArrowLeft, CheckCircle } from 'lucide-react'

const values = [
  { Icon: Target, title: 'مهمتنا',  desc: 'تقديم خدمات قانونية ومحاسبية متكاملة تحمي حقوق عملائنا وتحقق مصالحهم بأعلى معايير المهنية والنزاهة.' },
  { Icon: Eye,    title: 'رؤيتنا',  desc: 'أن نكون الشريك القانوني والمحاسبي الأول والأكثر ثقة في مصر والمنطقة العربية من خلال التميز والابتكار.' },
  { Icon: Heart,  title: 'قيمنا',   desc: 'النزاهة والأمانة والمهنية والالتزام بأعلى معايير جودة الخدمة مع الحفاظ على سرية وخصوصية عملائنا.' },
]

const milestones = [
  { year: '2004', title: 'تأسيس صرح',                    desc: 'تأسيس المكتب برؤية د. إسلام إبراهيم لتقديم خدمات قانونية متكاملة' },
  { year: '2010', title: 'التوسع وافتتاح فرعين',          desc: 'افتتاح فرع بني سويف والجيزة مع بناء شراكات دولية' },
  { year: '2016', title: 'براءة تاريخية بالكويت',         desc: 'إثبات استحالة واقعة التزوير بالحسابات الرياضية والفيزيائية' },
  { year: '2019', title: 'شراكة بوند فودز',               desc: 'تقديم الدعم القانوني والإداري والمالي لمصنع بوند فودز' },
  { year: '2024', title: 'شركاء كبرى الشركات',            desc: 'مستشار قانوني وضريبي لأركان والفخراني ومجموعات استثمارية' },
]

const achievements = [
  { value: '+20', label: 'سنة من الخبرة' },
  { value: '+5,500', label: 'قضية ناجحة' },
  { value: '+2,000', label: 'عميل يثق بنا' },
  { value: '98%', label: 'نسبة النجاح' },
]

export default function AboutPage() {
  return (
    <>
      <SEO
        title="من نحن — د. إسلام إبراهيم وفريق صرح"
        description="تعرف على فريق صرح للخدمات القانونية والمحاسبية. خبرة قانونية منذ 2004، فرعان في بني سويف والجيزة، براءات في قضايا دولية."
        canonical="/about"
      />
      <SchemaLD page="default" />

      <main>
        {/* Hero */}
        <section className="bg-navy relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 border rounded-full px-5 py-2 mb-8"
              style={{background:'rgba(201,162,39,0.1)', borderColor:'rgba(201,162,39,0.3)'}}>
              <Award className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-semibold">خبرة قانونية منذ 2004</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              من نحن — <span className="text-gold">صرح للخدمات القانونية والمحاسبية</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              منذ عام 2004، نبني ثقة عملائنا قضية تلو الأخرى، معتمدين على الخبرة العميقة والنزاهة المهنية الراسخة.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-gold transition-colors">الرئيسية</Link>
              <span className="text-gold">←</span>
              <span className="text-gold font-semibold">من نحن</span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map(a => (
                <div key={a.label} className="text-center">
                  <div className="text-4xl font-black text-gold mb-1">{a.value}</div>
                  <div className="text-gray-text text-sm font-medium">{a.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-gold font-bold text-sm tracking-wider mb-4 block">قصتنا</span>
                <h2 className="text-3xl md:text-4xl font-black text-navy mb-6">
                  أكثر من <span className="text-gold">20 عاماً</span> من التميز القانوني
                </h2>
                <p className="text-gray-text text-lg leading-relaxed mb-5">
                  تأسست صرح للخدمات القانونية والمحاسبية عام 2004 بقيادة الدكتور إسلام إبراهيم، برؤية واضحة: تقديم منظومة قانونية ومحاسبية متكاملة تحمي الشركات وتمكّنها من النمو بثقة واستقرار.
                </p>
                <p className="text-gray-text leading-relaxed mb-8">
                  على مدار عقرين من العمل الدؤوب، بنينا سمعة راسخة على أسس الثقة والاحترافية، وأصبحنا الخيار الأول لأكثر من 2,000 عميل من الشركات والمؤسسات في مصر والخليج، مع حضور في قضايا دولية متعددة.
                </p>
                <Link
                  to="/book-consultation"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5" />
                  احجز استشارة مجانية
                </Link>
              </div>

              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex items-start gap-5 p-5 rounded-2xl border border-gray-100 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group">
                    <div className="w-16 h-10 bg-navy rounded-lg flex items-center justify-center text-gold font-black text-sm shrink-0 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                      {m.year}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy mb-1 group-hover:text-gold transition-colors">{m.title}</h4>
                      <p className="text-gray-text text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-gray-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-gold font-bold text-sm tracking-wider mb-4 block">هويتنا</span>
              <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
                مهمتنا ورؤيتنا و<span className="text-gold">قيمنا</span>
              </h2>
              <div className="section-divider mb-6" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map(({ Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-8 border border-gray-100 card-hover text-center">
                  <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5"
                    style={{background:'rgba(201,162,39,0.1)'}}>
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-black text-navy mb-3">{title}</h3>
                  <p className="text-gray-text text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="py-24 bg-navy relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-gold"
              style={{background:'rgba(201,162,39,0.15)'}}>
              <Scale className="w-10 h-10 text-gold" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">د. إسلام إبراهيم</h2>
            <p className="text-gold font-semibold mb-6">المؤسس والرئيس التنفيذي — صرح للخدمات القانونية والمحاسبية</p>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              محامٍ ومستشار قانوني متمرس، يحمل خبرة تمتد لأكثر من 20 عاماً في القانون التجاري والجنائي. حقق براءات في قضايا معقدة دولية وأسس منظومة متكاملة لخدمة الشركات والمؤسسات.
            </p>
            <ul className="grid sm:grid-cols-3 gap-6 mb-10 text-right">
              {[
                'خبرة في قضايا دولية بمصر والكويت',
                'تأسيس 100+ شركة ومؤسسة',
                'مستشار لكبرى الشركات المصرية',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 rounded-xl p-4 border"
                  style={{background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.1)'}}>
                  <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              تواصل معنا
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
