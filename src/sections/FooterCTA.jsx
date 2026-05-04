import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

export default function FooterCTA() {
  return (
    <div style={{background:'linear-gradient(to left, #c9a227, #e2b93b)'}}>
      <div className="max-w-7xl mx-auto px-6 py-14 text-center">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
          احجز استشارة الآن — ابدأ بحماية أعمالك اليوم
        </h3>
        <p className="text-white/80 mb-8 text-lg">
          نقدم استشارة أولية مجانية لمدة 30 دقيقة لتقييم وضعكم القانوني وتحديد مسار العمل
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/book-consultation"
            className="bg-navy-dark text-white px-8 py-3.5 rounded-lg font-bold hover:bg-navy transition-all duration-300 hover:scale-105"
          >
            احجز استشارة مجانية
          </Link>
          <a
            href="https://wa.me/201117819505"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold text-white border transition-all duration-300 hover:bg-white/30"
            style={{background:'rgba(255,255,255,0.2)', borderColor:'rgba(255,255,255,0.3)'}}
          >
            <MessageCircle className="w-5 h-5" />
            واتساب
          </a>
        </div>
      </div>
    </div>
  )
}
