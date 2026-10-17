import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sun, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  ArrowUp,
  Heart
} from 'lucide-react';

export const Footer = ({ onOpenAdmin, onOpenRateSheet }) => {
  const { settings, formatWhatsAppUrl } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const brands = [
    'Longi Solar', 
    'Jinko Solar', 
    'Canadian Solar', 
    'JA Solar', 
    'Deye', 
    'Growatt', 
    'Inverex', 
    'Huawei', 
    'GoodWe', 
    'Narada Lithium', 
    'Pylontech', 
    'Phoenix Battery'
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brands Ribbon */}
        <div className="pb-12 border-b border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block text-center mb-5">
            Authorized Tier-1 Brands & Verified Inverters
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-slate-300">
            {brands.map((brand, i) => (
              <span key={i} className="hover:text-amber-400 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Sun className="w-6 h-6 text-amber-300" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                Star<span className="text-amber-400">Solar</span>Energy
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Your trusted partner for Tier-1 solar panels, hybrid and on-grid inverters, lithium batteries, and turnkey net-metering installations. Powering homes and industries with reliable clean energy.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={formatWhatsAppUrl('Hello StarSolarEnergy!')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Consultation</span>
              </a>
              <button
                onClick={onOpenAdmin}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-medium transition-colors"
              >
                Owner Portal
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <span className="font-heading font-bold text-sm text-white uppercase tracking-wider block">
              Quick Links
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Solar Equipment Catalog
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Turnkey Solar Packages
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Solar System Estimator
                </a>
              </li>
              <li>
                <button onClick={onOpenRateSheet} className="hover:text-white transition-colors text-left cursor-pointer">
                  Daily Solar Rate Sheet
                </button>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Completed Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3 text-xs">
            <span className="font-heading font-bold text-sm text-white uppercase tracking-wider block">
              Equipment Categories
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Tier-1 Solar Panels (585W - 665W)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Hybrid Solar Inverters
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  On-Grid & Net Metering Inverters
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Lithium LiFePO4 Batteries
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Galvanized Structures & DC Boxes
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact info */}
          <div className="space-y-3 text-xs">
            <span className="font-heading font-bold text-sm text-white uppercase tracking-wider block">
              Store Contact
            </span>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +{settings.whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings.shopName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
