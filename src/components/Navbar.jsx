import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sun, 
  Phone, 
  MessageCircle, 
  Calculator, 
  ShoppingBag, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles, 
  FileText, 
  Layers,
  MapPin,
  Clock,
  Languages
} from 'lucide-react';

export const Navbar = ({ onOpenAdmin, onOpenQuoteDrawer, onOpenRateSheet }) => {
  const { settings, cart, formatWhatsAppUrl, isAdminLoggedIn, language, setLanguage, t } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: t('navProducts'), href: '#products' },
    { label: t('navPackages'), href: '#packages' },
    { label: t('navCalculator'), href: '#calculator', badge: 'Popular' },
    { label: t('navRates'), onClick: onOpenRateSheet, isAction: true },
    { label: t('navProjects'), href: '#projects' },
    { label: t('navWhyUs'), href: '#why-us' },
    { label: t('navContact'), href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Announcement text */}
          <div className="flex items-center gap-2 text-center sm:text-left overflow-hidden">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide shrink-0">
              ⚡ Notice
            </span>
            <p className="truncate font-medium text-slate-200">
              {settings.announcementText}
            </p>
          </div>

          {/* Quick contact header links & Language Switcher */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer font-sans ${
                  language === 'ur'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                اردو
              </button>
            </div>

            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{settings.phone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a
              href={formatWhatsAppUrl('Hello StarSolarEnergy, I would like to get a quote and consultation!')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t('directWhatsApp')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-600/25 group-hover:scale-105 transition-transform duration-200">
              <Sun className="w-6 h-6 text-amber-300 animate-spin-slow" />
              <Sparkles className="w-3.5 h-3.5 text-amber-200 absolute -top-1 -right-1" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1">
                Star<span className="text-amber-500">Solar</span>Energy
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wider uppercase -mt-0.5">
                Authorized Solar Distributor
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link, idx) => {
              if (link.isAction) {
                return (
                  <button
                    key={idx}
                    onClick={link.onClick}
                    className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors relative py-1 flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-emerald-500" />
                    {link.label}
                  </button>
                );
              }
              return (
                <a
                  key={idx}
                  href={link.href}
                  className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors relative py-1 flex items-center gap-1.5"
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Quote Cart Button */}
            <button
              onClick={onOpenQuoteDrawer}
              aria-label="Quote Cart"
              className="relative p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-emerald-600 transition-colors"
              title="View Quote Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-pulse-subtle">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Admin Management Button (Visible ONLY when logged in) */}
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdmin}
                className="p-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-sm animate-pulse-subtle"
                title="Owner Manager Active"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Manager Mode</span>
              </button>
            )}

            {/* Direct WhatsApp CTA Button */}
            <a
              href={formatWhatsAppUrl('Hello StarSolarEnergy! I would like to get a quote and consult regarding solar panels and inverters.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
            {navLinks.map((link, idx) => {
              if (link.isAction) {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      link.onClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-slate-800 font-semibold hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      {link.label}
                    </span>
                  </button>
                );
              }
              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-slate-800 font-semibold hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href={formatWhatsAppUrl('Hello StarSolarEnergy! I would like to get a quote and consult regarding solar systems.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <a
                href={`tel:${settings.phone}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                <Phone className="w-5 h-5 text-emerald-600" />
                <span>Call Store: {settings.phone}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
