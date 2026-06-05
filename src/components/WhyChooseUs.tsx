/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Tag, PhoneCall, UserCheck, Settings, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const points = [
    {
      title: 'Best Airfares Guarantee',
      desc: 'We map direct premium consolidator slots, bypass standard GDS hidden commission markups, and offer offline agent-exclusive airline deals.',
      icon: Tag,
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      title: '24x7 Dedicated Emergency Desk',
      desc: 'No automated chatbots. Connect directly with real flight reservation agents for itinerary amendments, re-bookings, or cancellations.',
      icon: PhoneCall,
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      title: 'Trusted Travel Experts',
      desc: 'Our IATA qualified team operates with 15+ years of active air routing expertise to secure complex Visa rules and convenient layovers.',
      icon: UserCheck,
      color: 'text-indigo-500 bg-indigo-500/10'
    },
    {
      title: 'Customized Travel Solutions',
      desc: 'Coordinate unified corporate accounts, flexible multi-cabin segments, dietary meal requirements, and hotel blockings under single invoices.',
      icon: Settings,
      color: 'text-cyan-500 bg-cyan-500/10'
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden font-sans" id="why-choose-sec">
      {/* Background circles */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Why Left visual pitch */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-[4px] block">
              The Nilhans Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Why Savvy Travellers Choose Us Over Regular OTAs
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
            
            <p className="text-slate-300 font-light leading-relaxed">
              We look past generic internet algorithms. Nilhans Travels bridges the gap with professional airline desks, personal advisory, and offline-exclusive rates that major search platforms can&apos;t access.
            </p>

            <ul className="space-y-3.5 pt-4 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>Zero hidden service fees or convenience surcharges</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>Full corporate travel invoicing support</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>Immediate post-booking ticket changes and direct support</span>
              </li>
            </ul>

            <div className="pt-6">
              <a 
                href="tel:+13072841315"
                className="inline-flex items-center gap-3 text-sm font-bold text-amber-400 hover:text-amber-300 group"
              >
                <span>Instant Advisory Hotline</span>
                <span className="w-6 h-6 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">→</span>
              </a>
            </div>
          </div>

          {/* Grid points on right */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8" id="why-grid-points">
            {points.map((pt, idx) => {
              const IconComp = pt.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-slate-950/40 border border-slate-800/80 p-6 rounded-2xl text-left hover:border-slate-700 transition-colors"
                >
                  <div className={`p-3 rounded-xl w-fit ${pt.color} mb-4`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{pt.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{pt.desc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
