import React from 'react';
import { useStore } from '../context/StoreContext';
import { PROJECTS_GALLERY } from '../data/initialData';
import { 
  CheckCircle2, 
  MapPin, 
  Zap, 
  TrendingDown, 
  MessageCircle, 
  Sun,
  ShieldCheck
} from 'lucide-react';

export const ProjectsGallery = () => {
  const { formatWhatsAppUrl, settings } = useStore();

  return (
    <section id="projects" className="py-16 sm:py-24 bg-slate-50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Proven Engineering Track Record</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Recent Completed Solar Installations
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Take a look at real residential villas, commercial plazas, and industrial projects engineered and commissioned by StarSolarEnergy.
          </p>
        </div>

        {/* Gallery Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_GALLERY.map((proj) => {
            const projectWhatsAppUrl = formatWhatsAppUrl(`Hello StarSolarEnergy! I saw your completed project "${proj.title}" (${proj.capacity}) in ${proj.client}. I would like to get a similar installation for my property.`);

            return (
              <div
                key={proj.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  
                  {/* Badges on image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-400 text-slate-950 shadow-md">
                      {proj.capacity}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/80 backdrop-blur-md text-slate-200">
                      {proj.date}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {proj.client}
                    </span>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white mt-1">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                {/* Card Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* System Equipment */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Installed Hardware:</span>
                        <span className="font-semibold text-slate-900">{proj.system}</span>
                      </div>
                    </div>

                    {/* Savings result */}
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-emerald-700 block uppercase font-bold tracking-wider">Customer Energy Result:</span>
                        <span className="font-bold">{proj.savings}</span>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click WhatsApp Button for Similar Setup */}
                  <a
                    href={projectWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-emerald-600 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire About Installing This Capacity</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
