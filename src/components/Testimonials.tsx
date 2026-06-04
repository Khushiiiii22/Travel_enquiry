/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TESTIMONIALS } from '../staticData';
import { Star, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-white text-slate-950 font-sans" id="testimonials-sec">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-[4px] block">
            Client Gratitude
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" id="test-title">
            What Our Travellers Say About Us
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 font-light" id="test-desc">
            We measure our success by the flawless journeys, unforgettable moments, and smooth business connections we empower daily.
          </p>
        </div>

        {/* Testimonials layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col bg-slate-50 border border-slate-100 p-8 rounded-2xl relative text-left"
              id={`testimonial-card-${t.id}`}
            >
              {/* Star Rating */}
              <div className="flex items-center text-amber-400 gap-0.5 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Quotes icon decorative background */}
              <MessageSquare className="absolute right-8 top-8 w-12 h-12 text-amber-500/5 pointer-events-none" />

              {/* Review Text */}
              <p className="text-slate-700 font-light text-sm leading-relaxed mb-6 flex-grow italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* User Bio */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={`Reviewer ${t.name}`}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/20"
                  referrerPolicy="no-referrer"
                  id={`reviewer-avatar-${t.id}`}
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-950 font-sans">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Co-branded rating summary info */}
        <div className="mt-16 bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-left">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 font-sans">Are you an agent or traveling in a large group?</h4>
            <p className="text-xs text-slate-500">Contact our custom group travel coordinators for lower charter or group quote tariffs.</p>
          </div>
          <a
            href="mailto:info@nilhans.com"
            className="px-6 py-2.5 bg-slate-950 text-white hover:bg-slate-900 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex-shrink-0"
          >
            Direct Agent Desk
          </a>
        </div>

      </div>
    </section>
  );
}
