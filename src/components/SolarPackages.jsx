import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Check, 
  Sun, 
  Zap, 
  ShieldCheck, 
  MessageCircle, 
  Flame, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const SolarPackages = ({ onSelectPackage }) => {
  const { settings, formatWhatsAppUrl } = useStore();

  const packages = [
    {
      id: 'pkg-3.2kw',
      title: '3.2 kW Starter Hybrid',
      subtitle: 'Ideal for 3 to 5 Marla Homes',
      badge: 'Essential',
      price: 495000,
      originalPrice: 540000,
      monthlyUnits: '380 - 450 Units/mo',
      savings: 'Rs. 24,000 - 30,000/mo',
      runsLoad: '1 Refrigerator + 4-6 Ceiling Fans + 1 LED TV + 10 LED Lights + Wi-Fi',
      highlights: [
        '6x Tier-1 585W Mono PERC Solar Panels (3,510W Total)',
        '1x 3.2 kW Smart Pure Sine Wave Hybrid Inverter',
        '2x Heavy-Duty 180Ah Deep Cycle Tubular Batteries',
        'Standard Hot-Dipped Galvanized L2 Mounting Structure',
        'Pure Copper DC & AC Cables with PVC Conduit Pipe',
        'DC Breakers, AC Changeover & Class-II Surge Protectors',
        'Complete Installation, Commissioning & Testing Included'
      ],
      popular: false
    },
    {
      id: 'pkg-5kw',
      title: '5 kW Executive Hybrid',
      subtitle: 'Comfortably Powers 1 Inverter AC',
      badge: 'Most Popular',
      price: 785000,
      originalPrice: 850000,
      monthlyUnits: '650 - 750 Units/mo',
      savings: 'Rs. 42,000 - 52,000/mo',
      runsLoad: '1x 1.5-Ton Inverter AC (Daytime) + Refrigerator + Water Pump + 8 Fans + Full Lights',
      highlights: [
        '10x Tier-1 585W N-Type Bifacial Panels (5,850W Total)',
        '1x 5kW / 6kW Smart Hybrid Inverter (Dual MPPT)',
        '1x 48V 100Ah Lithium LiFePO4 or 4x Tall Tubulars',
        'Elevated Heavy Gauge Customized L2/L3 Structure',
        'Certified Chemical Earthing Bore (Surge Protected)',
        'Eligible for DISCO Net-Metering / Green Meter',
        '5 Years Inverter / 25 Years Panels Official Warranty'
      ],
      popular: true
    },
    {
      id: 'pkg-10kw',
      title: '10 kW Zero-Bill Net Metering',
      subtitle: 'Complete Freedom from Power Bills',
      badge: 'Zero Bill Solution',
      price: 1390000,
      originalPrice: 1520000,
      monthlyUnits: '1,200 - 1,450 Units/mo',
      savings: 'Rs. 85,000 - 110,000/mo',
      runsLoad: '2 to 3 Inverter ACs + Refrigerator + Freezer + 1.5HP Pump + Full Villa Load',
      highlights: [
        '18x Tier-1 585W N-Type Dual Glass Bifacial (10,530W Total)',
        '1x Deye / Inverex Nitrox 10kW 3-Phase Hybrid Inverter',
        'Complete End-to-End Net-Metering Documentation & Filing',
        'Bi-Directional Green Meter Installation Coordination',
        'Custom High Elevated Rust-Proof Heavy Structure',
        'Dual Dual Chemical Earthing Bores (AC + DC + Lightning)',
        'Free Mobile Wi-Fi Monitoring Setup with 24/7 Remote Diagnostics'
      ],
      popular: false
    }
  ];

  const handlePackageWhatsApp = (pkg) => {
    const msg = `☀️ *TURNKEY SOLAR PACKAGE INQUIRY*
*Package:* ${pkg.title}
*Listed Price:* ${settings.currencySymbol} ${pkg.price.toLocaleString()}
*Estimated Monthly Savings:* ${pkg.savings}
*Applicable Load:* ${pkg.runsLoad}

Hello StarSolarEnergy! I am interested in this complete turnkey solar package. Please share details on rooftop structure survey, equipment brand choices, and payment schedule. Thank you!`;
    return formatWhatsAppUrl(msg);
  };

  return (
    <section id="packages" className="py-16 sm:py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Turnkey Solar Solutions</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Complete Pre-Engineered Solar Packages
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hassle-free all-inclusive packages: Tier-1 panels, smart inverters, premium structures, earthing, cabling, and certified installation.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const whatsappUrl = handlePackageWhatsApp(pkg);

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-slate-900 via-navy-950 to-slate-900 text-white shadow-2xl ring-2 ring-emerald-500 scale-100 md:-translate-y-2'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Popular Ribbon */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-extrabold shadow-md uppercase tracking-wider ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Subtitle */}
                  <div className="text-center pb-5 border-b border-slate-200/20">
                    <h3 className={`font-heading font-extrabold text-2xl ${pkg.popular ? 'text-white' : 'text-slate-900'}`}>
                      {pkg.title}
                    </h3>
                    <p className={`text-xs mt-1 ${pkg.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                      {pkg.subtitle}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline justify-center gap-2">
                      <span className={`font-heading font-extrabold text-3xl sm:text-4xl ${pkg.popular ? 'text-amber-400' : 'text-slate-900'}`}>
                        {settings.currencySymbol} {pkg.price.toLocaleString()}
                      </span>
                    </div>
                    {pkg.originalPrice > pkg.price && (
                      <span className={`text-xs line-through ${pkg.popular ? 'text-slate-400' : 'text-slate-400'}`}>
                        {settings.currencySymbol} {pkg.originalPrice.toLocaleString()}
                      </span>
                    )}

                    {/* Savings banner */}
                    <div className={`mt-3 py-1.5 px-3 rounded-xl text-xs font-bold inline-block ${
                      pkg.popular ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      Save ~{pkg.savings}
                    </div>
                  </div>

                  {/* Load Capability Box */}
                  <div className={`mt-5 p-3.5 rounded-2xl text-xs ${
                    pkg.popular ? 'bg-slate-800/80 border border-slate-700 text-slate-200' : 'bg-slate-50 border border-slate-200 text-slate-700'
                  }`}>
                    <span className="font-bold text-amber-500 block uppercase text-[10px] tracking-wider mb-0.5">
                      Powers Load:
                    </span>
                    <p className="font-medium leading-relaxed">{pkg.runsLoad}</p>
                  </div>

                  {/* Itemized Inclusions */}
                  <div className="mt-5 space-y-2.5 text-xs">
                    <span className={`font-bold uppercase text-[10px] tracking-wider block ${pkg.popular ? 'text-slate-400' : 'text-slate-400'}`}>
                      Package Inclusions:
                    </span>
                    {pkg.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={`leading-relaxed ${pkg.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct WhatsApp Booking Button */}
                <div className="mt-8 pt-5 border-t border-slate-200/20">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      pkg.popular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Book Package on WhatsApp</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Custom Commercial Banner */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Need Commercial or Industrial 20kW to 100kW+ Setup?
            </span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Custom Engineered Projects for Mills, Plazas, Schools & Tubewells
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              We provide custom 3-Phase designs with Huawei, GoodWe, Sungrow, and Deye inverters tailored to your exact transformer load.
            </p>
          </div>

          <a
            href={formatWhatsAppUrl('Hello StarSolarEnergy! I would like to consult regarding a custom commercial/industrial solar project.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consult Commercial Project</span>
          </a>
        </div>

      </div>
    </section>
  );
};
