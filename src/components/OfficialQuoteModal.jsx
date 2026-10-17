import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Printer, 
  MessageCircle, 
  Sun, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Building2, 
  Phone, 
  Calendar,
  Download
} from 'lucide-react';

export const OfficialQuoteModal = ({ quoteData, onClose }) => {
  const { settings, formatWhatsAppUrl } = useStore();
  const printRef = useRef(null);

  if (!quoteData) return null;

  const quoteNo = `SSE-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const validityDateStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const totalAmount = quoteData.items?.reduce((sum, it) => sum + it.price * it.quantity, 0) || quoteData.totalPrice || 0;

  const whatsappMsg = `☀️ *OFFICIAL PROPOSAL & QUOTATION*
*Ref:* ${quoteNo}
*Date:* ${dateStr}
*From:* ${settings.shopName}

👤 *Client:* ${quoteData.customerName || 'Valued Client'} (${quoteData.customerCity || 'Property Rooftop'})
💰 *Estimated Total:* ${settings.currencySymbol} ${totalAmount.toLocaleString()}

Please find the official proposal breakdown and terms. We are ready to proceed with rooftop shadow survey and installation schedule!`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 animate-fade-in print:p-0 print:bg-white">
      {/* Backdrop */}
      <div className="fixed inset-0 print:hidden" onClick={onClose} />

      {/* Main Quote Container */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 z-10 flex flex-col max-h-[94vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Top Action Header */}
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base leading-tight">
                Official Turnkey Solar Proposal
              </h3>
              <span className="text-[11px] text-slate-400">Ref: {quoteNo}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Letterhead Document */}
        <div ref={printRef} className="overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-800 text-xs sm:text-sm">
          
          {/* Company Letterhead */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md">
                <Sun className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
                  Star<span className="text-amber-500">Solar</span>Energy
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  {settings.tagline}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {settings.address}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1 text-xs">
              <div className="inline-block px-3 py-1 rounded bg-slate-900 text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                Official Quotation
              </div>
              <p className="font-bold text-slate-900">Ref: {quoteNo}</p>
              <p className="text-slate-500">Date: {dateStr}</p>
              <p className="text-slate-500">Validity: 7 Days (Until {validityDateStr})</p>
            </div>
          </div>

          {/* Client Details Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Client / Proposal For:
              </span>
              <p className="font-bold text-slate-900 text-base mt-0.5">
                {quoteData.customerName || 'Valued Solar Client'}
              </p>
              <p className="text-xs text-slate-600">
                Location: {quoteData.customerCity || 'Residential / Commercial Site'}
              </p>
              {quoteData.customerPhone && (
                <p className="text-xs text-slate-600">Phone: {quoteData.customerPhone}</p>
              )}
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Engineering Consultant:
              </span>
              <p className="font-bold text-emerald-800 text-base mt-0.5">
                {settings.shopName} Engineering Wing
              </p>
              <p className="text-xs text-slate-600">Helpline: {settings.phone}</p>
              <p className="text-xs text-slate-600">WhatsApp: +{settings.whatsappNumber}</p>
            </div>
          </div>

          {/* Itemized Hardware Table */}
          <div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-2">
              Itemized System Hardware & Turnkey Scope
            </h4>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Description / Specification</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Rate</th>
                    <th className="py-2.5 px-3 text-right">Total ({settings.currencySymbol})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {quoteData.items && quoteData.items.length > 0 ? (
                    quoteData.items.map((it, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 text-slate-400">{idx + 1}</td>
                        <td className="py-2.5 px-3">
                          <strong className="text-slate-900 block">{it.name}</strong>
                          <span className="text-[11px] text-slate-500">{it.brand} {it.unit ? `(${it.unit})` : ''}</span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold text-slate-800">{it.quantity}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">
                          {settings.currencySymbol} {it.price.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                          {settings.currencySymbol} {(it.price * it.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-2.5 px-3 text-slate-400">1</td>
                      <td className="py-2.5 px-3">
                        <strong className="text-slate-900 block">{quoteData.title || 'Custom Turnkey Solar System'}</strong>
                        <span className="text-[11px] text-slate-500">Tier-1 Solar Panels + Hybrid Inverter + Elevated Structure + Cabling</span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-800">1 Job</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        {settings.currencySymbol} {totalAmount.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        {settings.currencySymbol} {totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-slate-50 border-t border-slate-200 font-bold text-xs">
                  <tr>
                    <td colSpan={4} className="py-3 px-3 text-right uppercase text-slate-600">
                      Estimated Turnkey Total:
                    </td>
                    <td className="py-3 px-3 text-right text-base text-emerald-800 font-extrabold">
                      {settings.currencySymbol} {totalAmount.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Standard Scope Inclusions Checklist */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <span className="font-heading font-bold text-emerald-950 text-xs uppercase tracking-wider block">
              StarSolar Professional Installation Standards Included:
            </span>
            <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tier-1 Flash Test Certified Solar Modules (25-Year Warranty)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom Hot-Dipped Galvanized Heavy 14-Gauge Rustproof Frame</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated Pure Copper Chemical Earthing Pit (SPD Surge Protection)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DISCO Net-Metering / Green Meter Documentation Liaison</span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t border-slate-200 pt-4 text-[11px] text-slate-500 space-y-1.5">
            <strong className="text-slate-700 block">Terms & Commercial Notes:</strong>
            <p>1. Solar module and inverter rates are subject to daily USD/currency and international import tariff revisions.</p>
            <p>2. Payment Terms: 70% advance upon contract signing, 20% on equipment delivery to site, 10% after testing & commissioning.</p>
            <p>3. Manufacturer warranties are backed by official warranty cards and serial numbers.</p>
          </div>

          {/* Signature Signoff */}
          <div className="pt-8 flex items-end justify-between text-xs text-slate-700">
            <div className="space-y-1">
              <div className="w-40 border-b border-slate-400 mb-1" />
              <p className="font-bold">Client Acceptance Signature</p>
              <p className="text-[10px] text-slate-400">Date: _______________</p>
            </div>

            <div className="text-right space-y-1">
              <div className="w-48 border-b border-slate-400 mb-1 ml-auto" />
              <p className="font-bold text-emerald-800">Authorized Signatory</p>
              <p className="text-[10px] text-slate-400">{settings.shopName} Commercial Depot</p>
            </div>
          </div>

        </div>

        {/* Footer CTAs (hidden when printing) */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          <span className="text-xs text-slate-500">
            Click below to send this proposal directly to StarSolarEnergy on WhatsApp.
          </span>
          <a
            href={formatWhatsAppUrl(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send Proposal to WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
