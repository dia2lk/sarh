import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '../lib/analytics';

export default function WhatsAppButton() {
  const handleClick = () => {
    trackWhatsAppClick('floating_button');
  };

  return (
    <a
      href="https://wa.me/201117819505"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 animate-pulse-gold group"
      aria-label="تواصل عبر واتساب"
    >
      <div className="relative">
        <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
          <MessageCircle size={30} className="text-white" fill="white" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
          <span className="text-[10px] text-navy-dark font-bold">1</span>
        </div>
        {/* Tooltip */}
        <div className="absolute left-full bottom-1/2 translate-y-1/2 mr-4 bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          تواصل معنا عبر واتساب
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-navy"></div>
          </div>
        </div>
      </div>
    </a>
  );
}
