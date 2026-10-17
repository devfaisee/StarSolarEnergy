import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Calculator, 
  Sun, 
  Zap, 
  BatteryCharging, 
  DollarSign, 
  ArrowRight, 
  MessageCircle, 
  RotateCcw, 
  Tv, 
  Wind, 
  Refrigerator, 
  Droplet, 
  Lightbulb, 
  Flame,
  CheckCircle,
  HelpCircle,
  FileText
} from 'lucide-react';

export const SolarCalculator = () => {
  const { settings, getSolarCalculatorWhatsAppLink, t, language, setOfficialQuoteData } = useStore();

  const [calculationMode, setCalculationMode] = useState('units'); // 'units' or 'appliances'

  // Mode 1 state: By Monthly Units
  const [monthlyUnits, setMonthlyUnits] = useState(600);
  const [unitRate, setUnitRate] = useState(65); // Average PKR per unit including taxes/fuel adjustments

  // Mode 2 state: By Appliances
  const [appliances, setAppliances] = useState({
    ac15: 1, // 1.5-ton ACs
    ac10: 0, // 1.0-ton ACs
    fans: 5,  // Ceiling fans
    fridge: 1,// Refrigerators
    pump: 1,  // Water pump (1HP)
    lights: 12, // LED lights
  });

  const updateAppliance = (key, delta) => {
    setAppliances((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  // Calculation Results
  const results = useMemo(() => {
    let effectiveUnits = monthlyUnits;

    if (calculationMode === 'appliances') {
      // Estimated monthly units based on realistic daily usage
      // 1.5-ton AC (inverter, ~1.2kW average running 8 hours/day in season = 9.6 units/day = 288 units/month)
      // 1.0-ton AC (inverter, ~0.8kW running 8 hrs = 6.4 units/day = 192 units/month)
      // Fan (~80W running 14 hrs/day = 1.1 units/day = 33 units/month)
      // Refrigerator (~150W running 24 hrs duty cycle = 2.5 units/day = 75 units/month)
      // Water Pump (1HP ~750W running 1 hr/day = 0.75 units/day = 22 units/month)
      // 10 LED lights (~100W running 6 hrs/day = 0.6 units/day = 18 units/month)
      const calculatedMonthlyUnits = Math.round(
        appliances.ac15 * 280 +
        appliances.ac10 * 180 +
        appliances.fans * 30 +
        appliances.fridge * 75 +
        appliances.pump * 25 +
        (appliances.lights / 5) * 15
      );
      effectiveUnits = Math.max(150, calculatedMonthlyUnits);
    }

    // Solar calculation logic:
    // In sunny climate, 1 kW solar generates ~4 units/day = ~120 units/month.
    // So kW required = effectiveUnits / 120
    const rawKW = effectiveUnits / 120;
    
    // Standardize to commercially common system capacities: 3.2kW, 5kW, 8kW, 10kW, 12kW, 15kW, 20kW
    let recommendedKW = 3.2;
    if (rawKW <= 3.5) recommendedKW = 3.2;
    else if (rawKW <= 5.8) recommendedKW = 5.0;
    else if (rawKW <= 8.5) recommendedKW = 8.0;
    else if (rawKW <= 11.5) recommendedKW = 10.0;
    else if (rawKW <= 14.5) recommendedKW = 12.0;
    else if (rawKW <= 18.0) recommendedKW = 15.0;
    else recommendedKW = 20.0;

    // Number of 585W Panels
    // Total watts required = recommendedKW * 1000
    const panelsCount = Math.ceil((recommendedKW * 1000) / 585);
    const panelWattage = 585;

    // Daily generation
    const dailyUnits = Math.round(recommendedKW * 4.2);

    // Monthly bill savings (PKR)
    const monthlySavings = Math.round(effectiveUnits * unitRate);

    // Inverter size
    let inverterSize = `${recommendedKW} kW Hybrid Inverter`;
    if (recommendedKW >= 10) {
      inverterSize = `${recommendedKW} kW 3-Phase Hybrid / On-Grid Inverter (Net-Metering Ready)`;
    }

    // Battery recommendation
    let batteryRecommendation = '2x 180Ah Deep Cycle Tubular Batteries';
    if (recommendedKW === 5.0) {
      batteryRecommendation = '1x 48V 100Ah Lithium LiFePO4 (4.8 kWh) or 4x Tubulars';
    } else if (recommendedKW >= 8.0) {
      batteryRecommendation = '1x to 2x 48V 100Ah Lithium LiFePO4 (4.8 - 9.6 kWh) Battery Rack';
    }

    // Space required (approx 28 sq ft per 585W panel)
    const rooftopSpaceSqFt = panelsCount * 28;

    const inputSummary = calculationMode === 'units'
      ? `${monthlyUnits} Units/Month (~${settings.currencySymbol} ${(monthlyUnits * unitRate).toLocaleString()})`
      : `Approx ${effectiveUnits} Units based on selected appliances`;

    const appliancesSummary = calculationMode === 'appliances'
      ? `${appliances.ac15}x 1.5T AC, ${appliances.ac10}x 1.0T AC, ${appliances.fans} Fans, ${appliances.fridge} Fridge, ${appliances.pump} Pump, ${appliances.lights} Lights`
      : '';

    return {
      effectiveUnits,
      recommendedKW,
      panelsCount,
      panelWattage,
      inverterSize,
      batteryRecommendation,
      dailyUnits,
      monthlySavings,
      rooftopSpaceSqFt,
      inputSummary,
      appliancesSummary
    };
  }, [calculationMode, monthlyUnits, unitRate, appliances, settings]);

  const whatsappLink = getSolarCalculatorWhatsAppLink(results);

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-navy-950 text-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Solar System Estimator</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Calculate Your Solar System Size & Savings
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Not sure how many solar panels or what inverter capacity you need? Choose your average electricity consumption or appliances below for an immediate recommendation!
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 flex gap-1">
            <button
              onClick={() => setCalculationMode('units')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                calculationMode === 'units'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Option A: By Monthly Electricity Units (kWh)
            </button>
            <button
              onClick={() => setCalculationMode('appliances')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                calculationMode === 'appliances'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Option B: By Home Appliances Load
            </button>
          </div>
        </div>

        {/* Main Grid: Inputs on Left, Results on Right */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-6 bg-slate-850/80 rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-xl">
            
            {calculationMode === 'units' ? (
              /* Mode 1: Units Input */
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-200">
                      Average Monthly Electricity Consumption:
                    </label>
                    <span className="font-heading font-extrabold text-xl text-amber-400">
                      {monthlyUnits} Units (kWh)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="2500"
                    step="50"
                    value={monthlyUnits}
                    onChange={(e) => setMonthlyUnits(Number(e.target.value))}
                    className="w-full mt-3 h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>150 Units (Small Home)</span>
                    <span>600 Units (Medium)</span>
                    <span>1200+ Units (3+ ACs)</span>
                  </div>
                </div>

                {/* Preset Unit Buttons */}
                <div>
                  <span className="text-xs text-slate-400 font-medium block mb-2">
                    Quick Unit Presets:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[350, 600, 1000, 1500].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setMonthlyUnits(preset)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          monthlyUnits === preset
                            ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {preset} Units
                      </button>
                    ))}
                  </div>
                </div>

                {/* Unit Cost in PKR */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Estimated Cost Per Unit (including taxes/FPA):</span>
                    <span className="text-slate-200 font-bold">{settings.currencySymbol} {unitRate}/kWh</span>
                  </div>
                  <div className="mt-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                    <span>Approx. Monthly Bill Before Solar:</span>
                    <span className="font-bold text-amber-400 text-sm">
                      {settings.currencySymbol} {(monthlyUnits * unitRate).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Mode 2: Appliances Counter Inputs */
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Select the appliances you plan to power during day and night:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 1.5-Ton Inverter AC */}
                  <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Wind className="w-5 h-5 text-amber-400" />
                      <div>
                        <span className="text-xs font-bold text-white block">1.5 Ton Inverter AC</span>
                        <span className="text-[10px] text-slate-400">~280 units/mo</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateAppliance('ac15', -1)}
                        className="w-7 h-7 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-white">{appliances.ac15}</span>
                      <button
                        onClick={() => updateAppliance('ac15', 1)}
                        className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 1.0-Ton Inverter AC */}
                  <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Wind className="w-5 h-5 text-emerald-400" />
                      <div>
                        <span className="text-xs font-bold text-white block">1.0 Ton Inverter AC</span>
                        <span className="text-[10px] text-slate-400">~180 units/mo</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateAppliance('ac10', -1)}
                        className="w-7 h-7 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-white">{appliances.ac10}</span>
                      <button
                        onClick={() => updateAppliance('ac10', 1)}
                        className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Ceiling Fans */}
                  <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Tv className="w-5 h-5 text-teal-400" />
                      <div>
                        <span className="text-xs font-bold text-white block">Ceiling Fans</span>
                        <span className="text-[10px] text-slate-400">~30 units/mo each</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateAppliance('fans', -1)}
                        className="w-7 h-7 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-white">{appliances.fans}</span>
                      <button
                        onClick={() => updateAppliance('fans', 1)}
                        className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Refrigerators */}
                  <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Refrigerator className="w-5 h-5 text-blue-400" />
                      <div>
                        <span className="text-xs font-bold text-white block">Refrigerator / Freezer</span>
                        <span className="text-[10px] text-slate-400">24/7 running</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateAppliance('fridge', -1)}
                        className="w-7 h-7 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-white">{appliances.fridge}</span>
                      <button
                        onClick={() => updateAppliance('fridge', 1)}
                        className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Water Pump */}
                  <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Droplet className="w-5 h-5 text-cyan-400" />
                      <div>
                        <span className="text-xs font-bold text-white block">Water Pump (1 HP)</span>
                        <span className="text-[10px] text-slate-400">~25 units/mo</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateAppliance('pump', -1)}
                        className="w-7 h-7 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-white">{appliances.pump}</span>
                      <button
                        onClick={() => updateAppliance('pump', 1)}
                        className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* LED Lights */}
                  <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Lightbulb className="w-5 h-5 text-amber-300" />
                      <div>
                        <span className="text-xs font-bold text-white block">LED Lights & TVs</span>
                        <span className="text-[10px] text-slate-400">General load</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateAppliance('lights', -2)}
                        className="w-7 h-7 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-white">{appliances.lights}</span>
                      <button
                        onClick={() => updateAppliance('lights', 2)}
                        className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                  <span>Computed Load Requirement:</span>
                  <span className="font-bold text-amber-400 text-sm">
                    ~{results.effectiveUnits} Monthly Units
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Recommended System & WhatsApp Action */}
          <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-navy-950 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            
            {/* Top Recommended Banner */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Recommended System Size
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                Net-Metering Ready
              </span>
            </div>

            {/* Big System Size Result */}
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Optimal System Capacity</span>
                <span className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
                  {results.recommendedKW} <span className="text-amber-400">kW</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Est. Monthly Bill Savings</span>
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-emerald-400">
                  {settings.currencySymbol} {results.monthlySavings.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">/ month</span>
              </div>
            </div>

            {/* Itemized Technical Inclusions */}
            <div className="mt-6 space-y-3">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-300">Tier-1 Solar Panels:</span>
                </div>
                <span className="font-bold text-white">
                  {results.panelsCount}x {results.panelWattage}W Panels ({(results.panelsCount * results.panelWattage / 1000).toFixed(2)} kW PV)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-300">Recommended Inverter:</span>
                </div>
                <span className="font-bold text-white text-right max-w-[240px] truncate">
                  {results.inverterSize}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">Storage / Battery Option:</span>
                </div>
                <span className="font-bold text-white text-right max-w-[240px] truncate">
                  {results.batteryRecommendation}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block">Daily Generation</span>
                  <span className="font-bold text-amber-400">{results.dailyUnits} Units / Day</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block">Rooftop Area Needed</span>
                  <span className="font-bold text-slate-200">~{results.rooftopSpaceSqFt} Sq. Ft.</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS: WHATSAPP + OFFICIAL PRINTABLE PROPOSAL */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-xl shadow-emerald-700/30 transition-all cursor-pointer group"
              >
                <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>{t('calcSendWhatsApp')}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setOfficialQuoteData({
                    title: `${results.recommendedKW} kW Turnkey Solar System`,
                    totalPrice: results.recommendedKW * 140000,
                    customerName: 'Solar Client',
                    customerCity: 'Property Rooftop',
                    items: [
                      {
                        name: `${results.panelsCount}x ${results.panelWattage}W Tier-1 N-Type Solar Panels`,
                        brand: 'Longi / Jinko Solar',
                        price: results.panelsCount * 34500,
                        quantity: 1
                      },
                      {
                        name: results.inverterSize,
                        brand: 'Deye / Inverex / Growatt',
                        price: results.recommendedKW >= 10 ? 460000 : 245000,
                        quantity: 1
                      },
                      {
                        name: results.batteryRecommendation,
                        brand: 'Narada / Phoenix',
                        price: results.recommendedKW >= 5 ? 330000 : 116000,
                        quantity: 1
                      },
                      {
                        name: 'L2/L3 Galvanized Mounting Structure, Pure Copper DC/AC Cables, SPDs & Earthing',
                        brand: 'StarSolar Turnkey',
                        price: 95000,
                        quantity: 1
                      }
                    ]
                  });
                }}
                className="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>📄 Generate Official Printable Proposal / Quote (PDF)</span>
              </button>

              <p className="text-center text-[11px] text-slate-400 mt-2">
                {t('calcDisclaimer')}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
