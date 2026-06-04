/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DESTINATIONS } from '../staticData';
import { MapPin, Plane, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface DestinationsProps {
  onSelectDestination: (cityName: string) => void;
}

export default function Destinations({ onSelectDestination }: DestinationsProps) {
  return (
    <section className="py-24 bg-slate-50 text-slate-950 font-sans" id="destinations-sec">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div className="text-left max-w-2xl space-y-4">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-[4px] block">
              Curated Escapes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" id="dest-title">
              Trending International Destinations
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
            <p className="text-slate-600 font-light" id="dest-desc">
              Unpack breathtaking adventures. Click any destination card below to immediately request our best customized flight & accommodation quotations.
            </p>
          </div>
          
          <div className="flex-shrink-0 text-left">
            <span className="inline-flex items-center gap-2 text-xs bg-amber-500/10 text-amber-700 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider border border-amber-500/20">
              ⚡ Exclusive direct companion fares
            </span>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="dest-grid">
          {DESTINATIONS.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => onSelectDestination(dest.name.toUpperCase())}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:scale-[1.03] cursor-pointer group relative"
              id={`destination-card-${dest.id}`}
            >
              {/* Image Container with Hover Zoom Card Style */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={`Nilhans Travels tour package for ${dest.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  id={`dest-card-img-${dest.id}`}
                />
                
                {/* Floating tags */}
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{dest.country}</span>
                </div>

                <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-1 tracking-widest rounded">
                  {dest.popularFor}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                {/* Embedded Fares bottom left */}
                <div className="absolute bottom-4 left-4 text-left">
                  <span className="text-[10px] uppercase text-slate-300 font-semibold tracking-wider block">Fares Starting From</span>
                  <span className="text-xl font-extrabold text-amber-400 font-sans">{dest.startPrice}</span>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6 flex flex-col flex-1 text-left">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {dest.name} Flight Package
                  </h3>
                  <div className="flex items-center text-amber-500 gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-800 font-mono">4.9</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {dest.description}
                </p>

                {/* Submit trigger button wrapper */}
                <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium font-sans">Flight Enquiry & Visa Desk</span>
                  <span className="text-xs font-bold text-amber-600 uppercase group-hover:underline flex items-center gap-1.5">
                    <span>Enquire Flight Deal</span>
                    <Plane className="w-3.5 h-3.5 rotate-45 transform" />
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
