/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SERVICES } from '../staticData';
import { Plane, Globe, Map, Hotel, FileText, Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  setActiveTab: (tab: 'home' | 'enquiry' | 'admin') => void;
}

// Icon helper mapping to prevent complex dynamic resolution in bundler
const renderIcon = (name: string) => {
  const props = { className: "w-8 h-8 text-amber-500" };
  switch (name) {
    case 'PlaneTakeoff': return <Plane {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Map': return <Map {...props} />;
    case 'Hotel': return <Hotel {...props} />;
    case 'FileText': return <FileText {...props} />;
    case 'Briefcase': return <Briefcase {...props} />;
    default: return <Plane {...props} />;
  }
};

export default function Services({ setActiveTab }: ServicesProps) {
  return (
    <section className="py-24 bg-white text-slate-950 font-sans" id="services-sec">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-[4px] block">
            What We Deliver
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" id="services-title">
            Complete Travel Management Solutions
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 font-light" id="services-desc">
            Whether you are booking a weekend getaway, a family beach vacation, or coordinating travel flight tickets for an entire enterprise team. We make booking hassle-free.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {SERVICES.map((srv, index) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => setActiveTab('enquiry')}
              className="flex flex-col text-left p-8 bg-slate-50 hover:bg-slate-900 border border-slate-100 hover:border-slate-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
              id={`service-card-${srv.id}`}
            >
              {/* Icon Container */}
              <div className="mb-6 p-4 bg-amber-500/10 group-hover:bg-amber-500/20 rounded-xl w-fit transition-colors">
                {renderIcon(srv.iconName)}
              </div>

              {/* Text Description */}
              <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-white transition-colors">
                {srv.title}
              </h3>
              
              <p className="text-slate-600 group-hover:text-slate-300 text-sm leading-relaxed mb-6 flex-grow transition-colors">
                {srv.description}
              </p>

              {/* Action Trigger */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-400 mt-auto">
                <span>Request Free Quotation</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 duration-200" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
