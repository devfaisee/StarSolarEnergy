import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Wrench, 
  CheckCircle,
  Truck,
  FileCheck
} from 'lucide-react';

export const WhyChooseUs = () => {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: "100% Genuine Tier-1 Equipment",
      description: "Direct importer & wholesale partner for Longi, Jinko, Canadian Solar, Deye, Growatt, and Inverex. Every single panel comes with verifiable QR codes & original factory flash test reports."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-emerald-600" />,
      title: "Turnkey Net-Metering Assistance",
      description: "From load sanctioning, DISCO NOC documentation, NEPRA licensing, to physical bi-directional green meter installation, our certified engineering team handles every single step."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "Guaranteed 25-Year Official Warranty",
      description: "Complete peace of mind with 10-12 years product replacement warranty and 25-30 years linear power output guarantee backed directly by official manufacturer warranty cards."
    },
    {
      icon: <Wrench className="w-6 h-6 text-amber-500" />,
      title: "Custom Heavy Galvanized Structures",
      description: "We never use light flimsy frames. All our mounting structures are hot-dipped galvanized 14-gauge high-tensile steel, engineered to withstand wind speeds up to 140 km/h."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Dedicated Chemical Earthing Protection",
      description: "Protection of your costly inverter and home appliances comes first. We install dedicated pure copper chemical bores with Class-II SPDs and double-pole DC breakers."
    },
    {
      icon: <Headphones className="w-6 h-6 text-emerald-600" />,
      title: "Direct WhatsApp Owner Support",
      description: "No robotic automated call centers. Get direct, honest guidance from experienced solar proprietors via 1-click WhatsApp anytime you need technical assistance or quotation."
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>The StarSolar Difference</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Why Hundreds of Families & Businesses Trust StarSolarEnergy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Investing in solar is a 25-year decision. We combine fair wholesale pricing, top-tier engineering standards, and lifelong customer loyalty.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-emerald-500/40 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all">
                {pillar.icon}
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 mt-4">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
