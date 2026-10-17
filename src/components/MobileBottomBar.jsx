import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Phone, 
  MessageCircle, 
  LayoutGrid, 
  Calculator, 
  ShoppingBag 
} from 'lucide-react';

export const MobileBottomBar = ({ onOpenQuoteDrawer }) => {
  const { settings, formatWhatsAppUrl, cart } = useStore();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 shadow-lg flex items-center justify-around text-[10px] font-semibold text-slate-600">
      
      {/* WhatsApp Button */}
      <a
        href={formatWhatsAppUrl('Hello StarSolarEnergy! I would like to get a quote and inquire about solar products.')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 text-emerald-600 hover:text-emerald-700"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 fill-emerald-600" />
        </div>
        <span>WhatsApp</span>
      </a>

      {/* Direct Call */}
      <a
        href={`tel:${settings.phone}`}
        className="flex flex-col items-center gap-0.5 hover:text-slate-900"
      >
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <Phone className="w-4 h-4 text-slate-700" />
        </div>
        <span>Call Now</span>
      </a>

      {/* Catalog */}
      <a
        href="#products"
        className="flex flex-col items-center gap-0.5 hover:text-slate-900"
      >
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <LayoutGrid className="w-4 h-4 text-slate-700" />
        </div>
        <span>Products</span>
      </a>

      {/* Calculator */}
      <a
        href="#calculator"
        className="flex flex-col items-center gap-0.5 text-amber-600 hover:text-amber-700"
      >
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <Calculator className="w-4 h-4 text-amber-600" />
        </div>
        <span>Calculator</span>
      </a>

      {/* Quote Cart */}
      <button
        onClick={onOpenQuoteDrawer}
        className="relative flex flex-col items-center gap-0.5 hover:text-slate-900 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 text-slate-700" />
        </div>
        <span>Quote</span>
        {cartItemsCount > 0 && (
          <span className="absolute -top-0.5 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center shadow">
            {cartItemsCount}
          </span>
        )}
      </button>

    </div>
  );
};
