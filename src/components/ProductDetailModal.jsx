import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  Star, 
  Plus, 
  Share2,
  FileText,
  BadgeCheck
} from 'lucide-react';

export const ProductDetailModal = ({ product, onClose }) => {
  const { settings, addToCart, getProductWhatsAppLink, showToast } = useStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const whatsappUrl = getProductWhatsAppLink(product);
  const discountPercent = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at StarSolarEnergy for ${settings.currencySymbol} ${product.price.toLocaleString()}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('📋 Page link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Content */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 z-10 flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              {product.brand}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500 capitalize">
              {product.category?.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              title="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 sm:p-8 space-y-6">
          <div className="grid md:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left Col: High-Res Image & Badges */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-bold bg-amber-400 text-slate-950 shadow-md">
                    {product.badge}
                  </span>
                )}
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold shadow-md ${
                    product.inStock
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-slate-100'
                  }`}
                >
                  {product.inStock ? 'In Stock Now' : 'Pre-Order'}
                </span>
              </div>

              {/* Trust badges */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Genuine with Official Serial Number</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Insured Secure Packaging & Nationwide Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official Warranty Documentation Included</span>
                </div>
              </div>
            </div>

            {/* Right Col: Title, Pricing, Specs */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800">{product.rating || '5.0'}</span>
                  <span className="text-xs text-slate-500">({product.reviewsCount || 16} customer ratings)</span>
                </div>

                <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 mt-2">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="mt-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider block">
                      Wholesale / Cash Price
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                        {settings.currencySymbol} {product.price.toLocaleString()}
                      </span>
                      {product.unit && (
                        <span className="text-sm font-medium text-slate-600">
                          /{product.unit}
                        </span>
                      )}
                    </div>
                  </div>

                  {discountPercent > 0 && (
                    <div className="text-right">
                      <span className="text-xs text-slate-500 line-through block">
                        {settings.currencySymbol} {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-200/70 px-2 py-0.5 rounded">
                        Save {discountPercent}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Product Overview
                  </h4>
                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Technical Specifications Table */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>Technical Specifications</span>
                    </h4>
                    <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                      {Object.entries(product.specs).map(([specKey, specVal]) => (
                        <div key={specKey} className="grid grid-cols-12 py-2 px-3 hover:bg-slate-50">
                          <span className="col-span-5 font-medium text-slate-500">{specKey}</span>
                          <span className="col-span-7 font-semibold text-slate-900">{specVal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Action CTAs in Modal */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                {/* 1-Click WhatsApp Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-base text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Order on WhatsApp (Instant Reply)</span>
                </a>

                {/* Phone Call & Add to Quote Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${settings.phone}`}
                    className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Call Store</span>
                  </a>

                  <button
                    onClick={() => {
                      addToCart(product);
                      onClose();
                    }}
                    className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-emerald-700" />
                    <span>Add to Quote Cart</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
