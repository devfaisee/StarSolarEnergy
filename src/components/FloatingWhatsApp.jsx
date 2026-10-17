import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const { settings, formatWhatsAppUrl } = useStore();
  const [bubbleOpen, setBubbleOpen] = useState(true);

  const whatsappUrl = formatWhatsAppUrl(`Hello ${settings.shopName}! I am on your website and would like to ask about solar panels and inverter stock & wholesale rates.`);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex flex-col items-end gap-2">
      {/* Friendly Speech Bubble */}
      {bubbleOpen && (
        <div className="hidden sm:flex items-center gap-2 p-3 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 max-w-xs animate-bounce-subtle">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-ping" />
          <div className="text-xs">
            <span className="font-bold block text-slate-900">Need Today's Solar Rates?</span>
            <span className="text-slate-500">1-click direct WhatsApp chat</span>
          </div>
          <button
            onClick={() => setBubbleOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 ml-1"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing ring aura */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30 pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <MessageCircle className="w-8 h-8 fill-white relative z-10" />
      </a>
    </div>
  );
};
