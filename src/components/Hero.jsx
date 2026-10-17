import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sun, 
  Zap, 
  ShieldCheck, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  TrendingDown, 
  Award,
  Sparkles,
  Flame
} from 'lucide-react';

export const Hero = ({ onOpenRateSheet }) => {
  const { settings, formatWhatsAppUrl } = useStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-navy-950 text-white py-16 sm:py-24 lg:py-28">
      {/* Background decorative solar aura glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Official Solar Panels & Hybrid Inverter Stock</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-white">
              Slash Your Electricity Bills to{' '}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-wavy">
                ZERO
              </span>{' '}
              with StarSolarEnergy.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Wholesale & retail supplier of genuine <strong className="text-white font-semibold">Tier-1 Solar Panels</strong> (Longi, Jinko, Canadian), high-performance <strong className="text-white font-semibold">Hybrid Inverters</strong> (Deye, Growatt, Inverex), and durable <strong className="text-white font-semibold">Lithium & Tubular Batteries</strong> with guaranteed warranty and turnkey net-metering.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>View Products & Prices</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </a>

              <a
                href={formatWhatsAppUrl('Hello StarSolarEnergy! I would like to get today\'s best wholesale price on solar panels and inverters.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-white bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/40 shadow-lg shadow-emerald-700/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>1-Click WhatsApp Inquire</span>
              </a>

              <button
                onClick={onOpenRateSheet}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 transition-colors"
              >
                <span>Today's Rate Sheet</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-left">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">100% Genuine Tier-1 Panels</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">25-Year Linear Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Net-Metering Ready</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Free Engineering Survey</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card with Live Features */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-1 bg-gradient-to-b from-emerald-500/40 via-slate-800 to-amber-500/30 shadow-2xl">
              <div className="rounded-[22px] bg-slate-900/90 backdrop-blur-xl p-6 sm:p-7 border border-slate-800">
                
                {/* Header inside card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Live Store Showcase
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Stock Available
                  </span>
                </div>

                {/* Hero Feature Image */}
                <div className="mt-4 relative rounded-xl overflow-hidden aspect-video border border-slate-700/60 shadow-inner group">
                  <img
                    src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
                    alt="Tier 1 Solar Panels and Inverters"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 rounded-md font-semibold text-white">
                      585W N-Type & Mono PERC
                    </span>
                    <span className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md font-semibold text-amber-300">
                      Hybrid Inverters Ready
                    </span>
                  </div>
                </div>

                {/* Fast Quick Solar Calculation Trigger */}
                <div className="mt-5 p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                        Free Instant Estimator
                      </p>
                      <h4 className="text-sm font-semibold text-white mt-0.5">
                        Calculate How Many Solar Panels You Need
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Select your monthly units or appliances to get an exact kW & battery recommendation.
                      </p>
                    </div>
                  </div>
                  <a
                    href="#calculator"
                    className="mt-3 w-full py-2.5 px-3 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Open Solar Calculator</span>
                  </a>
                </div>

                {/* Stat Counters */}
                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 text-center">
                  <div>
                    <span className="block font-heading font-extrabold text-lg sm:text-xl text-white">
                      {settings.completedProjects}+
                    </span>
                    <span className="text-[11px] text-slate-400">Installations</span>
                  </div>
                  <div className="border-x border-slate-800">
                    <span className="block font-heading font-extrabold text-lg sm:text-xl text-amber-400">
                      {settings.installedCapacityMW} MW+
                    </span>
                    <span className="text-[11px] text-slate-400">Clean Energy</span>
                  </div>
                  <div>
                    <span className="block font-heading font-extrabold text-lg sm:text-xl text-emerald-400">
                      25 Yrs
                    </span>
                    <span className="text-[11px] text-slate-400">Warranty</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
