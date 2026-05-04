import { Link } from 'react-router-dom'
import { Zap, Lock, Scale } from 'lucide-react'

export default function AISection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{background:'linear-gradient(135deg, #050810 0%, #0f172a 50%, #0a0f1a 100%)'}}>
      <div className="absolute inset-0 bg-pattern opacity-10" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{background:'rgba(201,162,39,0.05)'}} />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-6 border"
          style={{background:'rgba(201,162,39,0.1)', borderColor:'rgba(201,162,39,0.3)'}}>
          <span className="text-4xl">⚖️</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          جرّب المستشار القانوني الذكي
        </h2>
        <p className="text-gray-400 text-lg mb-3">
          احصل على إرشادات قانونية مبدئية فورية — متاح على مدار الساعة.
        </p>
        <p className="text-gray-500 mb-12">
          اسأل عن تأسيس الشركات، العقود، الضرائب، أو أي موضوع قانوني.
        </p>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Zap className="w-6 h-6 text-gold" />,  title: 'رد فوري',    desc: 'إجابات لحظية بالذكاء الاصطناعي' },
            { icon: <Lock className="w-6 h-6 text-gold" />, title: 'سرية تامة',  desc: 'بياناتك محمية ومشفرة بالكامل' },
            { icon: <Scale className="w-6 h-6 text-gold" />,title: 'محتوى دقيق', desc: 'مبني على المعرفة القانونية المتخصصة' },
          ].map(f => (
            <div key={f.title} className="rounded-2xl p-6 border text-center"
              style={{background:'rgba(255,255,255,0.04)', borderColor:'rgba(255,255,255,0.08)'}}>
              <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-3"
                style={{background:'rgba(201,162,39,0.1)'}}>
                {f.icon}
              </div>
              <h4 className="text-white font-bold mb-1">{f.title}</h4>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/ai-consultation"
            className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:opacity-90"
            style={{background:'linear-gradient(135deg, #c9a227, #e2b93b)', boxShadow:'0 8px 24px rgba(201,162,39,0.25)'}}
          >
            جرّب المستشار الذكي الآن
          </Link>
          <Link
            to="/book-consultation"
            className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 border hover:bg-white/10"
            style={{borderColor:'rgba(255,255,255,0.2)'}}
          >
            أو احجز استشارة حقيقية
          </Link>
        </div>

        <p className="mt-8 text-gray-600 text-xs">
          ⚠️ المستشار الذكي يقدم إرشادات مبدئية — لا تغني عن الاستشارة القانونية المتخصصة
        </p>
      </div>
    </section>
  )
}
