import { Building2, Stethoscope, TrendingUp, Cpu, ShoppingBag, Landmark } from 'lucide-react'

const partners = [
  { Icon: Building2,    name: 'مصنع بوند فودز للصناعات الغذائية',   role: 'دعم إداري، مالي، قانوني، تسليعي',              tag: 'الصناعات الغذائية' },
  { Icon: Stethoscope,  name: 'مجموعة صيدليات الفخراني',             role: 'المستشار القانوني والضريبي',                   tag: 'القطاع الصحي' },
  { Icon: TrendingUp,   name: 'شركة أركان للاستشارات الاقتصادية',    role: 'المستشار القانوني داخل وخارج مصر',             tag: 'الاستشارات الاقتصادية' },
  { Icon: Cpu,          name: 'مجموعة شركات تقنية',                  role: 'تأسيس وحوكمة الشركات التقنية',                tag: 'قطاع التقنية' },
  { Icon: ShoppingBag,  name: 'شركة الميرة للتجارة العامة',           role: 'الاستشارات الضريبية والمحاسبية',               tag: 'القطاع التجاري' },
  { Icon: Landmark,     name: 'مجموعة استثمارية خليجية',              role: 'التمثيل القانوني في القضايا المعقدة',           tag: 'القطاع الاستثماري' },
]

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-100" aria-label="شركاء النجاح — العملاء">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">شركاء النجاح</span>
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
            كيانات نتشرف <span className="text-gold">بحمايتها</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            نفتخر بثقة كبرى الشركات والمؤسسات في المنطقة، ونسعى دائماً لتقديم أعلى مستويات الخدمة القانونية والمحاسبية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {partners.map(({ Icon, name, role, tag }) => (
            <div
              key={name}
              className="bg-gray-50 rounded-2xl p-6 card-hover gold-border-hover border border-gray-100 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center shrink-0 group-hover:from-gold group-hover:to-gold-light transition-all duration-500">
                  <Icon className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="font-black text-navy mb-1 leading-snug">{name}</h3>
                  <p className="text-gray-text text-sm mb-3">{role}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold border border-gold/20 bg-gold/5 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-text text-sm mt-10 font-medium">
          +2,000 عميل يثقون بخدمات صرح القانونية والمحاسبية
        </p>
      </div>
    </section>
  )
}
