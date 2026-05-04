import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const milestones = [
  { year: '2004', title: 'تأسيس صرح',           desc: 'تأسيس الشركة برؤية د. إسلام إبراهيم' },
  { year: '2010', title: 'التوسع الإقليمي',       desc: 'افتتاح فرعي بني سويف والجيزة + شراكات دولية' },
  { year: '2016', title: 'براءة في قضية تزوير بالكويت', desc: 'إثبات استحالة الواقعة بالحسابات الرياضية' },
  { year: '2019', title: 'شراكة مع بوند فودز',   desc: 'تقديم الدعم القانوني والإداري والمالي' },
  { year: '2024', title: 'شركاء أركان والفخراني', desc: 'استشارات قانونية وضريبية لشركات كبرى' },
]

export default function TimelineSection() {
  return (
    <section className="py-24 bg-gray-light bg-pattern">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">مسيرتنا وإنجازاتنا</span>
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
            رحلة <span className="text-gold">تميز مستمر</span>
          </h2>
          <div className="section-divider mb-6" />
        </div>

        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-8 right-0 left-0 h-0.5 hidden md:block" style={{background:'rgba(201,162,39,0.2)'}} />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative text-center group">
                {/* Year circle */}
                <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center border-2 group-hover:bg-gold group-hover:border-gold transition-all duration-300 shadow-lg z-10 relative"
                  style={{borderColor:'rgba(201,162,39,0.3)'}}>
                  <span className="text-gold font-black text-sm group-hover:text-white transition-colors">{m.year}</span>
                </div>

                {/* Card */}
                <div className="mt-6 bg-white rounded-xl p-5 shadow-sm group-hover:shadow-xl transition-all duration-300">
                  <h4 className="font-bold text-navy mb-1 text-sm">{m.title}</h4>
                  <p className="text-gray-text text-xs leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 border text-navy px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:bg-navy hover:text-white"
            style={{borderColor:'#0f172a'}}
          >
            <ArrowLeft className="w-5 h-5" />
            عرض جميع الإنجازات
          </Link>
        </div>
      </div>
    </section>
  )
}
