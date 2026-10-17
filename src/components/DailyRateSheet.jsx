import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Printer, 
  MessageCircle, 
  FileText, 
  Sun, 
  Zap, 
  BatteryCharging, 
  Calendar,
  Phone
} from 'lucide-react';

export const DailyRateSheet = ({ onClose }) => {
  const { products, settings, formatWhatsAppUrl } = useStore();

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const panels = products.filter(p => p.category === 'solar-panels');
  const inverters = products.filter(p => p.category === 'inverters');
  const batteries = products.filter(p => p.category === 'batteries');

  const handlePrint = () => {
    window.print();
  };

  const whatsappUrl = formatWhatsAppUrl(`Hello StarSolarEnergy! I reviewed your Daily Rate Sheet for ${todayStr}. I would like to inquire about bulk/container pricing and payment terms.`);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in print:p-0 print:bg-white">
      {/* Backdrop */}
      <div className="fixed inset-0 print:hidden" onClick={onClose} />

      {/* Main Rate Sheet Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 z-10 flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Header Bar */}
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between shrink-0 print:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg leading-tight">
                {settings.shopName} — Daily Solar Price Sheet
              </h3>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Valid for: {todayStr}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print Rate Sheet"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-800">
          
          {/* Shop contact banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
            <div>
              <span className="font-bold text-slate-900 block">{settings.shopName} Wholesale Solar Depot</span>
              <span className="text-slate-600">{settings.address}</span>
            </div>
            <div className="flex items-center gap-3 font-semibold text-slate-800">
              <span>Tel: {settings.phone}</span>
              <span>•</span>
              <span className="text-emerald-700">WhatsApp: +{settings.whatsappNumber}</span>
            </div>
          </div>

          {/* Section 1: Solar Panels */}
          <div>
            <h4 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>1. Tier-1 Solar Panels</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Brand & Model</th>
                    <th className="py-2.5 px-3">Technology</th>
                    <th className="py-2.5 px-3">Official Warranty</th>
                    <th className="py-2.5 px-3 text-right">Cash / Panel Rate</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {panels.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-medium text-slate-900">{p.name}</td>
                      <td className="py-2 px-3 text-slate-500">{p.specs?.["Cell Type"] || p.specs?.["Technology"] || 'Mono PERC'}</td>
                      <td className="py-2 px-3 text-slate-600">{p.specs?.["Linear Output Warranty"] || '25 Years'}</td>
                      <td className="py-2 px-3 text-right font-bold text-emerald-700">
                        {settings.currencySymbol} {p.price.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                          {p.inStock ? 'In Stock' : 'Call'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Inverters */}
          <div>
            <h4 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>2. Solar Inverters (Hybrid & On-Grid)</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Brand & Model</th>
                    <th className="py-2.5 px-3">Capacity / Type</th>
                    <th className="py-2.5 px-3">Warranty</th>
                    <th className="py-2.5 px-3 text-right">Wholesale Rate</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inverters.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-medium text-slate-900">{inv.name}</td>
                      <td className="py-2 px-3 text-slate-500">{inv.specs?.["Rated Power"] || 'Hybrid Inverter'}</td>
                      <td className="py-2 px-3 text-slate-600">{inv.specs?.["Warranty"] || '5 Years'}</td>
                      <td className="py-2 px-3 text-right font-bold text-emerald-700">
                        {settings.currencySymbol} {inv.price.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${inv.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                          {inv.inStock ? 'In Stock' : 'Call'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Batteries */}
          <div>
            <h4 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
              <BatteryCharging className="w-4 h-4 text-emerald-600" />
              <span>3. Lithium LiFePO4 & Tubular Batteries</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Battery Model</th>
                    <th className="py-2.5 px-3">Capacity</th>
                    <th className="py-2.5 px-3">Cycle Life</th>
                    <th className="py-2.5 px-3 text-right">Price</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {batteries.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-medium text-slate-900">{b.name}</td>
                      <td className="py-2 px-3 text-slate-500">{b.specs?.["Nominal Capacity"] || b.specs?.["Capacity"] || 'Deep Cycle'}</td>
                      <td className="py-2 px-3 text-slate-600">{b.specs?.["Cycle Life"] || b.specs?.["Warranty"] || '1 Year'}</td>
                      <td className="py-2 px-3 text-right font-bold text-emerald-700">
                        {settings.currencySymbol} {b.price.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                          {b.inStock ? 'In Stock' : 'Call'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Note on market volatility */}
          <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
            * Note: Rates are subject to market currency and container import duty fluctuations. For container, pallet, or project volume orders, please contact via WhatsApp for special discounted dispatch.
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          <span className="text-xs text-slate-500">
            Need custom structure, chemical earthing, or DC cables pricing?
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Confirm Live Rates on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
