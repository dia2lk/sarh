import { MapPin, Phone, Clock } from 'lucide-react'

const branches = [
  {
    city:    'بني سويف',
    name:    'فرع بني سويف',
    address: 'كورنيش النيل - برج الصفوة - الدور الأول - أعلى ديسباسيتو - بجوار هيئة الرقابة المالية',
    phone:   '01117819505',
    hours:   'الأحد - الخميس: 9:00 ص - 6:00 م',
  },
  {
    city:    'الجيزة',
    name:    'فرع الجيزة',
    address: 'القرية الذكية - مبني نورث سايد - الدور الأول',
    phone:   '01035678474',
    hours:   'الأحد - الخميس: 9:00 ص - 6:00 م',
  },
]

export default function BranchesSection() {
  return (
    <section className="py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold text-sm tracking-wider mb-4 block">فروعنا</span>
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
            نخدمكم في <span className="text-gold">موقعين</span> استراتيجيين
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            نوفر وجوداً فعلياً في بني سويف والجيزة لخدمتكم عن قرب
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {branches.map(b => (
            <div key={b.city} className="bg-white rounded-2xl overflow-hidden card-hover border border-gray-100">
              {/* Map placeholder */}
              <div className="map-placeholder h-48 relative flex flex-col items-center justify-center">
                <MapPin className="w-8 h-8 text-gold mb-2" />
                <span className="text-white/60 text-sm">{b.city}</span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <h3 className="font-black text-navy text-lg">{b.name}</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-text">
                    <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{b.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-text">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <a href={`tel:+20${b.phone}`} className="hover:text-gold transition-colors font-medium" dir="ltr">
                      {b.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-text">
                    <Clock className="w-4 h-4 text-gold shrink-0" />
                    <span>{b.hours}</span>
                  </div>
                </div>

                <button className="mt-5 w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border border-gold/30 text-gold hover:bg-gold hover:text-white">
                  عرض على الخريطة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
