import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  Send, 
  Copy, 
  Check, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ContactSection = () => {
  const { settings, formatWhatsAppUrl, showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    systemRequirement: '5kW Hybrid System',
    message: ''
  });

  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(settings.phone);
    setCopiedPhone(true);
    showToast('📞 Phone number copied to clipboard!');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter your name', 'error');
      return;
    }

    const msg = `☀️ *NEW WEBSITE CONTACT INQUIRY*
👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone || 'Not provided'}
⚡ *Requirement:* ${formData.systemRequirement}
💬 *Message:* ${formData.message || 'I would like to inquire about current rates and rooftop survey.'}

Please connect with me regarding solar installation and rates. Thank you!`;

    window.open(formatWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Visit Our Store or Chat Online</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Get in Touch with StarSolarEnergy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions about solar panel brands, inverter compatibility, or want a customized quotation for your rooftop? Contact us directly.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Store Details */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Shop Address Card */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Store Location & Headquarters
              </span>
              <h3 className="font-heading font-extrabold text-xl text-white">
                {settings.shopName} Wholesale Depot
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>{settings.openingHours}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>{settings.email}</span>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call: {settings.phone}</span>
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Instant WhatsApp Primary Button */}
              <a
                href={formatWhatsAppUrl('Hello StarSolarEnergy! I would like to visit your shop or discuss solar equipment.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-700/25 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>

            {/* Nationwide Delivery Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Secure Nationwide Pallet Delivery</strong>
                <span>All solar panels are packed in reinforced wooden pallets with insurance during transit to prevent any cell micro-cracks.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-1">
              Request a Free Rooftop Solar Survey & Quote
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Fill out this quick form and click "Submit to WhatsApp" for immediate response from the proprietor.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Your Full Name: *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ahmad Khan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    WhatsApp / Phone Number:
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  System Requirement / Interest:
                </label>
                <select
                  value={formData.systemRequirement}
                  onChange={(e) => setFormData({ ...formData, systemRequirement: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                >
                  <option value="3.2kW Starter Solar System">3.2 kW Starter Hybrid System (No AC)</option>
                  <option value="5kW Executive Hybrid System">5 kW Hybrid System (1 Inverter AC)</option>
                  <option value="10kW Net-Metering Package">10 kW Net-Metering Hybrid (2-3 Inverter ACs)</option>
                  <option value="15kW to 30kW Commercial System">15 kW to 30 kW+ Commercial Installation</option>
                  <option value="Only Solar Panels (Pallet / Quantity)">Purchasing Solar Panels Only (Wholesale/Pallet)</option>
                  <option value="Only Inverter or Battery">Purchasing Inverter or Lithium / Tubular Battery</option>
                  <option value="Other Consultation">Other Solar Technical Inquiry</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Your City / Area & Any Specific Load Details:
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Located in DHA Lahore, 500 units monthly consumption, want rooftop survey..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Submit Inquiry via WhatsApp (Instant Reply)</span>
              </button>

              <span className="text-[11px] text-slate-400 block text-center mt-1">
                ⚡ We reply promptly with live pricing, equipment datasheets, and survey booking.
              </span>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
