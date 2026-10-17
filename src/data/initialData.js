export const DEFAULT_STORE_SETTINGS = {
  shopName: "StarSolarEnergy",
  tagline: "Premier Solar Panels, Inverters & Turnkey Energy Solutions",
  ownerTitle: "Proprietor / Solar Engineering Specialist",
  phone: "+92 300 1234567",
  whatsappNumber: "923001234567", // formatted for wa.me/923001234567
  email: "contact@starsolarenergy.com",
  address: "Shop #14-16, StarSolarEnergy Commercial Hub, Main Solar Market",
  city: "Lahore / Karachi / Islamabad",
  currencySymbol: "Rs.",
  adminPin: "1234", // Simple default PIN for father/son to access Admin Portal
  announcementText: "☀️ Summer Solar Sale: Tier-1 Panels & Hybrid Inverters in Stock at Factory Wholesale Rates! Call / WhatsApp for Instant Discount.",
  netMeteringAssistance: true,
  warrantyAssistance: true,
  yearsOfExperience: 12,
  completedProjects: 650,
  installedCapacityMW: 4.8,
  openingHours: "Mon - Sat: 9:00 AM - 8:30 PM | Sun: On Appointment",
};

export const CATEGORIES = [
  { id: "all", name: "All Products", icon: "LayoutGrid" },
  { id: "solar-panels", name: "Solar Panels", icon: "Sun" },
  { id: "inverters", name: "Solar Inverters", icon: "Zap" },
  { id: "batteries", name: "Solar Batteries", icon: "BatteryCharging" },
  { id: "packages", name: "Complete Packages", icon: "PackageCheck" },
  { id: "accessories", name: "Structures & Accessories", icon: "Wrench" },
];

export const INITIAL_PRODUCTS = [
  // SOLAR PANELS
  {
    id: "sp-1",
    name: "Longi Hi-MO 6 Explorer 585W Mono PERC",
    category: "solar-panels",
    brand: "Longi Solar",
    price: 34500,
    originalPrice: 38000,
    unit: "per panel",
    rating: 4.9,
    reviewsCount: 48,
    badge: "Bestseller",
    inStock: true,
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    description: "High-efficiency Tier-1 Longi 585W monocrystalline solar panel with HPBC cell technology, offering supreme conversion efficiency up to 22.6% even in high-temperature climates.",
    specs: {
      "Power Output": "585 Watts",
      "Efficiency": "22.6%",
      "Cell Type": "Monocrystalline HPBC",
      "Dimensions": "2278 x 1134 x 35 mm",
      "Weight": "27.5 kg",
      "Product Warranty": "12 Years",
      "Linear Output Warranty": "25 Years (84.8% output)",
      "Frame": "Anodized Aluminum Alloy"
    },
    featured: true
  },
  {
    id: "sp-2",
    name: "Jinko Tiger Neo N-Type 585W Bifacial",
    category: "solar-panels",
    brand: "Jinko Solar",
    price: 35500,
    originalPrice: 39000,
    unit: "per panel",
    rating: 4.9,
    reviewsCount: 36,
    badge: "N-Type TopCon",
    inStock: true,
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-high performance dual-glass Bifacial N-Type solar module. Yields up to 25% extra generation from rear albedo reflection. Excellent low-light performance.",
    specs: {
      "Power Output": "585 Watts",
      "Technology": "N-Type TOPCon Dual Glass",
      "Efficiency": "22.65%",
      "Bifaciality": "80% ± 5%",
      "Product Warranty": "15 Years",
      "Performance Warranty": "30 Years",
      "Degradation": "0.40% annual after year 1"
    },
    featured: true
  },
  {
    id: "sp-3",
    name: "Canadian Solar HiKu7 665W Mono-Facial",
    category: "solar-panels",
    brand: "Canadian Solar",
    price: 39500,
    originalPrice: 43000,
    unit: "per panel",
    rating: 4.8,
    reviewsCount: 22,
    badge: "High Power",
    inStock: true,
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
    description: "Heavy-duty commercial and large residential panel. Minimizes system BOS (balance of system) costs by delivering 665W per module with half-cut cell architecture.",
    specs: {
      "Power Output": "665 Watts",
      "Efficiency": "21.4%",
      "Cell Type": "Mono PERC 132 Half-cells",
      "Weight": "34.4 kg",
      "Linear Warranty": "25 Years",
      "Junction Box": "IP68, 3 bypass diodes"
    },
    featured: false
  },
  {
    id: "sp-4",
    name: "JA Solar DeepBlue 4.0 Pro 580W N-Type",
    category: "solar-panels",
    brand: "JA Solar",
    price: 33800,
    originalPrice: 37000,
    unit: "per panel",
    rating: 4.8,
    reviewsCount: 19,
    badge: "Hot Deal",
    inStock: true,
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80",
    description: "Next-generation 16BB SMBB cell structure for maximum reliability and reduced micro-cracking risk with outstanding temperature coefficient.",
    specs: {
      "Power Output": "580 Watts",
      "Efficiency": "22.5%",
      "Warranty": "12 Yrs Material / 30 Yrs Power",
      "Cell Type": "N-Type Bycium+"
    },
    featured: false
  },

  // INVERTERS
  {
    id: "inv-1",
    name: "Deye 12kW 3-Phase Hybrid Inverter (SUN-12K-SG04LP3)",
    category: "inverters",
    brand: "Deye",
    price: 520000,
    originalPrice: 560000,
    unit: "unit",
    rating: 5.0,
    reviewsCount: 54,
    badge: "Flagship Hybrid",
    inStock: true,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description: "The gold standard for residential and commercial hybrid solar. Supports low voltage 48V battery bank, generator auto-start, dual MPPTs, unbalanced 3-phase load output, and seamless UPS transfer <4ms.",
    specs: {
      "Rated Power": "12,000 Watts (12 kW)",
      "System Type": "Hybrid (On-Grid + Battery + Genset)",
      "Phase": "Three Phase",
      "Battery Voltage": "40-60V DC (Low Voltage Lithium / Tubular)",
      "MPPT Trackers": "2 Trackers / 2+1 Strings",
      "Max PV Input": "15,600 Watts",
      "Warranty": "5 Years Official Manufacturer Warranty",
      "Monitoring": "Wi-Fi Dongle Included (Mobile App)"
    },
    featured: true
  },
  {
    id: "inv-2",
    name: "Growatt 6kW Hybrid Inverter (SPF 6000T DVM)",
    category: "inverters",
    brand: "Growatt",
    price: 245000,
    originalPrice: 275000,
    unit: "unit",
    rating: 4.8,
    reviewsCount: 41,
    badge: "Top Value",
    inStock: true,
    image: "https://images.unsplash.com/photo-1558441719-8b489c63f79b?auto=format&fit=crop&w=800&q=80",
    description: "Robust 6kW hybrid pure sine-wave inverter for standard 1 to 1.5-ton AC residential loads. Built-in 80A MPPT charge controller, handles surges with built-in low frequency transformer.",
    specs: {
      "Rated Power": "6,000 Watts (6 kW)",
      "Phase": "Single Phase",
      "Surge Power": "18,000 VA (3x overload)",
      "Battery Voltage": "48V DC",
      "Max PV Voltage": "145V DC",
      "Warranty": "2 Years Official Warranty"
    },
    featured: true
  },
  {
    id: "inv-3",
    name: "Inverex Nitrox 10kW On-Grid / Hybrid",
    category: "inverters",
    brand: "Inverex",
    price: 460000,
    originalPrice: 495000,
    unit: "unit",
    rating: 4.9,
    reviewsCount: 38,
    badge: "Net Metering Ready",
    inStock: true,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    description: "Specially calibrated for local grid conditions and extreme weather. Complete with built-in net-metering synchronization, touch color LCD, IP65 waterproof housing, and smart power export limit.",
    specs: {
      "Rated Power": "10 kW (10,000 W)",
      "Grid Feed-in": "Approved for Net Metering",
      "Protection": "IP65 Outdoor Rated",
      "Dual MPPT": "Yes, 99.9% MPPT efficiency",
      "Warranty": "5 Years Replacement Warranty"
    },
    featured: true
  },
  {
    id: "inv-4",
    name: "Huawei SUN2000-10KTL-M1 10kW On-Grid",
    category: "inverters",
    brand: "Huawei",
    price: 390000,
    originalPrice: 420000,
    unit: "unit",
    rating: 4.9,
    reviewsCount: 29,
    badge: "German Quality",
    inStock: true,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    description: "Industry-leading 98.6% European efficiency. AI-powered arc fault circuit breaker (AFCI) stops fire hazards in 0.5s. Whisper quiet fanless design.",
    specs: {
      "Rated Power": "10 kW 3-Phase",
      "Maximum Efficiency": "98.6%",
      "Battery Ready": "Plug & Play DC ESS interface",
      "Warranty": "5 to 10 Years Warranty Option"
    },
    featured: false
  },

  // BATTERIES
  {
    id: "bat-1",
    name: "Narada 48V 100Ah Lithium LiFePO4 Battery (4.8 kWh)",
    category: "batteries",
    brand: "Narada",
    price: 330000,
    originalPrice: 360000,
    unit: "unit",
    rating: 5.0,
    reviewsCount: 33,
    badge: "Lithium LiFePO4",
    inStock: true,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    description: "Maintenance-free Grade-A prismatic Lithium Iron Phosphate battery module. Up to 6000+ deep charge cycles with 90% DoD. Built-in intelligent smart BMS compatible with Deye, Growatt, and Inverex.",
    specs: {
      "Nominal Capacity": "100Ah / 4.8 kWh",
      "Nominal Voltage": "48V DC",
      "Cycle Life": ">6000 Cycles @ 80% DoD (15+ Years)",
      "Communication": "CAN / RS485 to Inverter",
      "Max Discharge Current": "100A Continuous",
      "Warranty": "5 Years Full Replacement Warranty"
    },
    featured: true
  },
  {
    id: "bat-2",
    name: "Pylontech US3000C 48V 3.5 kWh Lithium Battery",
    category: "batteries",
    brand: "Pylontech",
    price: 285000,
    originalPrice: 310000,
    unit: "unit",
    rating: 4.9,
    reviewsCount: 27,
    badge: "Modular",
    inStock: true,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    description: "World renown modular rack-mount energy storage system. Easily expand your storage capacity by stacking up to 16 units in parallel.",
    specs: {
      "Usable Capacity": "3.37 kWh",
      "Nominal Voltage": "48V",
      "Discharge Depth": "95% DoD",
      "Certifications": "UL1973 / CE / UN38.3",
      "Warranty": "10 Years Manufacturer Warranty"
    },
    featured: false
  },
  {
    id: "bat-3",
    name: "Phoenix TX-1800 Heavy Deep Cycle Tubular Battery",
    category: "batteries",
    brand: "Phoenix",
    price: 58000,
    originalPrice: 65000,
    unit: "per battery",
    rating: 4.7,
    reviewsCount: 65,
    badge: "Budget Friendly",
    inStock: true,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    description: "Heavy duty tubular lead-acid battery engineered for demanding power cuts and solar backup. Thick spine plates with low antimony alloy ensure high backup time.",
    specs: {
      "Type": "Tall Tubular Deep Cycle",
      "Capacity": "180Ah @ C20",
      "Voltage": "12V DC",
      "Electrolyte Level Indicators": "6 Float indicators included",
      "Warranty": "1 Year Free Replacement Warranty"
    },
    featured: true
  },

  // COMPLETE PACKAGES
  {
    id: "pkg-1",
    name: "3.2 kW Starter Solar Hybrid System",
    category: "packages",
    brand: "StarSolar Turnkey",
    price: 495000,
    originalPrice: 540000,
    unit: "complete setup",
    rating: 4.9,
    reviewsCount: 43,
    badge: "Home Essential",
    inStock: true,
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    description: "Ideal for 3-5 Marla homes or small apartments. Runs 1 Refrigerator, 4-6 Ceiling Fans, 1 LED TV, 10 LED Lights, Wi-Fi router, and mobile chargers 24/7 without electricity bills during sunlight.",
    specs: {
      "Solar Panels": "6x Tier-1 585W Mono PERC Panels (3,510W Total)",
      "Inverter": "1x 3.2 kW Pure Sine Wave Hybrid Inverter",
      "Batteries": "2x 180Ah Deep Cycle Tubular Batteries",
      "Structure": "Custom Galvanized Heavy L2 Structure",
      "Wiring & Protection": "Pure Copper DC/AC Cables, Breakers, Surge Protectors",
      "Installation": "Complete Turnkey Testing & Delivery Included",
      "Monthly Units Generated": "Approx 380 - 450 kWh"
    },
    featured: true
  },
  {
    id: "pkg-2",
    name: "5 kW Executive Hybrid Solar System (Runs 1 Inverter AC)",
    category: "packages",
    brand: "StarSolar Turnkey",
    price: 785000,
    originalPrice: 850000,
    unit: "complete setup",
    rating: 5.0,
    reviewsCount: 68,
    badge: "Most Popular",
    inStock: true,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    description: "The most popular package for 5 to 10 Marla homes! Comfortably runs ONE 1.5-Ton Inverter AC in daytime + Refrigerator + Water Pump + all lights, fans, and electronics.",
    specs: {
      "Solar Panels": "10x Tier-1 585W N-Type Bifacial Panels (5,850W Total)",
      "Inverter": "1x 5kW / 6kW Smart Hybrid Solar Inverter (Dual MPPT)",
      "Batteries": "1x 48V 100Ah Lithium LiFePO4 or 4x Tall Tubular Batteries",
      "Structure": "Standard Elevated Rooftop L2/L3 Frame",
      "Net Metering": "Green Meter / Bi-directional meter assistance ready",
      "Monthly Savings": "Up to Rs. 35,000 - 45,000/month",
      "Warranty": "25 Years Panels / 5 Years Inverter"
    },
    featured: true
  },
  {
    id: "pkg-3",
    name: "10 kW Premium Net-Metering Hybrid Package",
    category: "packages",
    brand: "StarSolar Turnkey",
    price: 1390000,
    originalPrice: 1520000,
    unit: "complete setup",
    rating: 5.0,
    reviewsCount: 52,
    badge: "Zero Bill Solution",
    inStock: true,
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
    description: "Eliminate your monthly electricity bill to ZERO or sell units back to the national grid! Runs 2 to 3 Inverter ACs simultaneously along with heavy home appliances.",
    specs: {
      "Solar Panels": "18x Tier-1 585W Bi-Facial Panels (10,530W Total)",
      "Inverter": "1x Deye / Inverex Nitrox 10kW 3-Phase Hybrid Inverter",
      "Net Metering": "Complete end-to-end WAPDA/DISCO documentation & testing",
      "Earthing": "Proper Chemical Earthing Bore (Lightning & Surge Safe)",
      "Estimated Units/Mo": "1,200 - 1,450 kWh per month",
      "Payback Period": "Estimated 2.2 to 2.8 Years"
    },
    featured: true
  },

  // ACCESSORIES
  {
    id: "acc-1",
    name: "Elevated Heavy-Duty Galvanized Solar Structure (L2 / L3)",
    category: "accessories",
    brand: "StarSolar Fab",
    price: 18500,
    originalPrice: 22000,
    unit: "per set (2 panels)",
    rating: 4.8,
    reviewsCount: 31,
    badge: "High Grade",
    inStock: true,
    image: "https://images.unsplash.com/photo-1545209179-a5dc550496ac?auto=format&fit=crop&w=800&q=80",
    description: "Custom welded hot-dipped galvanized 14-gauge high-tensile steel frame with optimal 24°–28° tilt angle. Wind resistant up to 140 km/h.",
    specs: {
      "Material": "Hot Dipped Galvanized Steel (Rust-proof)",
      "Tilt Angle": "Adjustable 22° to 30°",
      "Wind Rating": "Up to 140 km/h",
      "Warranty": "10 Years Anti-Rust Guarantee"
    },
    featured: false
  },
  {
    id: "acc-2",
    name: "Schneider / Suntree DC Distribution Safety Box (Complete)",
    category: "accessories",
    brand: "Suntree",
    price: 32000,
    originalPrice: 38000,
    unit: "box",
    rating: 4.9,
    reviewsCount: 24,
    badge: "Safety Certified",
    inStock: true,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description: "Complete pre-wired DC/AC combiner protection box featuring dual DC Breakers, Type-2 Surge Protection Devices (SPD), Changeover switch, and IP65 dust-tight box.",
    specs: {
      "DC Breaker": "2P 550V/1000V DC 32A / 63A",
      "Surge Protection": "Type II SPD (40kA)",
      "AC Breaker": "Terasaki / Schneider 63A 4-Pole",
      "Enclosure": "IP65 Weatherproof Transparent Door"
    },
    featured: false
  }
];

export const PROJECTS_GALLERY = [
  {
    id: 1,
    title: "15 kW Net-Metering Hybrid Installation",
    client: "Executive Villa, Phase 6 DHA",
    capacity: "15 kW (3-Phase)",
    savings: "Zero Bill + Rs. 14,000 Export Credit",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80",
    date: "Installed Recently",
    system: "26x Longi 585W + Deye 15kW Hybrid Inverter"
  },
  {
    id: 2,
    title: "10 kW Turnkey Residential Rooftop",
    client: "Private Residence, Model Town",
    capacity: "10 kW On-Grid",
    savings: "92% Reduction in Monthly Utility Cost",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    date: "Completed Last Month",
    system: "18x Jinko Tiger Neo + Inverex Nitrox 10kW"
  },
  {
    id: 3,
    title: "30 kW Industrial Commercial System",
    client: "Al-Rehman Cold Storage & Logistics",
    capacity: "30 kW On-Grid Grid Tie",
    savings: "Over 3,800 Units/Month Clean Power",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
    date: "Installed 3 Months Ago",
    system: "Canadian Solar 665W + Huawei 30KTL Inverter"
  },
  {
    id: 4,
    title: "5 kW Eco Hybrid System with Lithium Storage",
    client: "Modern 5-Marla House, Bahria Town",
    capacity: "5.8 kW PV + 4.8 kWh Narada Lithium",
    savings: "100% Load-Shedding Proof Comfort",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
    date: "Installed 2 Weeks Ago",
    system: "Growatt 6kW + Narada 48V 100Ah LiFePO4"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Engr. Tariq Mehmood",
    role: "Homeowner, DHA",
    comment: "StarSolarEnergy did an outstanding job installing our 10kW Deye hybrid system. My electricity bill dropped from Rs. 85,000 to nearly zero! Their after-sales support via WhatsApp is instant and highly professional.",
    rating: 5,
    location: "Lahore"
  },
  {
    id: 2,
    name: "Haji Abdul Rasheed",
    role: "Textile Mill Director",
    comment: "Genuine Tier-1 panels with official serial numbers and warranty cards. The owner himself inspected the rooftop structure. Highly trustworthy shop, fair market rates, and top-tier workmanship.",
    rating: 5,
    location: "Faisalabad"
  },
  {
    id: 3,
    name: "Dr. Farhan Siddiqui",
    role: "Consultant Physician",
    comment: "I was confused between tubular and lithium batteries. StarSolarEnergy guided me patiently. We installed a 5kW hybrid with Narada lithium battery and it effortlessly runs my 1.5-ton inverter AC without any glitch.",
    rating: 5,
    location: "Rawalpindi"
  }
];

export const FAQS = [
  {
    question: "How do I place an order or check today's live rate?",
    answer: "Simply click the green 'Inquire on WhatsApp' button on any product! It will automatically open WhatsApp with the product details and price pre-filled. My father or our sales engineering team will answer immediately with current stock availability and delivery options."
  },
  {
    question: "Do you provide official warranties on solar panels and inverters?",
    answer: "Yes, 100%! All solar panels come with an official 10-12 year material replacement warranty and 25-30 year linear power performance warranty. Inverters come with 2-5 years official manufacturer warranty with original warranty cards and serial verification."
  },
  {
    question: "Can you handle the Net-Metering Green Meter process with WAPDA / DISCO?",
    answer: "Yes! We provide complete turnkey Net-Metering services, including load extension, certified engineer testing, SRO compliance, Disco application filing, inspection, and green bi-directional meter installation."
  },
  {
    question: "What is the difference between On-Grid, Off-Grid, and Hybrid inverters?",
    answer: "On-Grid works with the main utility grid to lower your bill and export excess electricity, but turns off during power outages. Off-Grid operates purely on panels and batteries without the grid. Hybrid gives you the best of both worlds: it can export excess solar to the grid and also charge batteries to provide uninterrupted backup during load shedding."
  },
  {
    question: "Do you deliver to other cities?",
    answer: "Yes, we ship nationwide with secure insured wooden crate packing for solar panels, or you can visit our shop directly to inspect stock before purchase."
  }
];
