import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/201117819505"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl pulse-gold transition-transform hover:scale-110"
      style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
    </a>
  )
}
