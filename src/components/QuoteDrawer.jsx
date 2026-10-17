import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  MapPin,
  User
} from 'lucide-react';

export const QuoteDrawer = ({ isOpen, onClose }) => {
  const { cart, settings, updateCartQty, removeFromCart, clearCart, getCartQuoteWhatsAppLink } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerNote, setCustomerNote] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const whatsappUrl = getCartQuoteWhatsAppLink(customerName, customerCity, customerNote);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-left">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Solar Quotation Cart
                </h3>
                <span className="text-xs text-slate-500">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-bold text-base text-slate-800">
                  Your Quote Cart is Empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click "+ Add to Quote" on any solar panel, inverter, or battery to assemble your custom solar setup!
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                  <span className="font-semibold text-slate-500">Items in Quote</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl border border-slate-200/80 bg-white hover:border-emerald-300 transition-colors flex gap-3 items-center"
                    >
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=100&q=80'}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                          {item.brand}
                        </span>
                        <h4 className="font-semibold text-xs text-slate-900 truncate" title={item.name}>
                          {item.name}
                        </h4>
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="font-bold text-xs text-slate-900">
                            {settings.currencySymbol} {(item.price * item.quantity).toLocaleString()}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-slate-400">
                              (@ {settings.currencySymbol} {item.price.toLocaleString()} each)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => updateCartQty(item.id, -1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-900 min-w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Customer Details Form */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 block">
                    Your Information (Optional for Quote):
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full pl-8 pr-2 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        placeholder="City / Area"
                        className="w-full pl-8 pr-2 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="Special requirements (e.g. need installation + earthing)"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with Total & 1-Click WhatsApp Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500 font-medium">Estimated Total Price:</span>
                <span className="font-heading font-extrabold text-2xl text-slate-900">
                  {settings.currencySymbol} {totalAmount.toLocaleString()}
                </span>
              </div>

              {/* 1-Click WhatsApp Quote Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-lg shadow-emerald-700/25 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send Complete Quote to WhatsApp</span>
              </a>

              <p className="text-[11px] text-center text-slate-400">
                Instantly forwards this complete itemized list to {settings.shopName}'s WhatsApp for final discount & stock dispatch.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
