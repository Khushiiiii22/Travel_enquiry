/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlaneTakeoff, Shield, Award, Users, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  setActiveTab: (tab: 'home' | 'enquiry' | 'admin') => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  return (
    <div className="relative bg-slate-950 text-white overflow-hidden min-h-[90vh] flex items-center justify-center font-sans" id="hero-sec-container">
      
      {/* Background Image with Dark Linear Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80" 
          alt="Premium Travel Jet taking off" 
          className="w-full h-full object-cover object-center opacity-30 select-none scale-105"
          referrerPolicy="no-referrer"
          id="hero-img-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent"></div>
      </div>

      {/* Decorative Gold & Indigo Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
            
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[2px] rounded-full pre"
              id="hero-badge"
            >
              <PlaneTakeoff className="w-3.5 h-3.5" />
              <span>Direct Flight Deals & Travel Desk</span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
                id="hero-headline"
              >
                Fly Anywhere.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Travel Everywhere.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed"
                id="hero-subheadline"
              >
                Best Flight Deals, Holiday Packages, Hotels & Visa Assistance. Get custom-tailored quotes from Nilhans Travels experts within minutes.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              id="hero-cta-group"
            >
              <button
                onClick={() => setActiveTab('enquiry')}
                className="px-8 py-4 bg-amber-500 text-slate-950 text-base font-extrabold rounded-lg hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 flex items-center justify-center gap-3 group"
                id="hero-book-flight-btn"
              >
                <span>Book Flight & Get Quote</span>
                <PlaneTakeoff className="w-5 h-5 group-hover:translate-x-1 duration-300 transform" />
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-100 hover:bg-slate-800 text-base font-bold rounded-lg transition-all duration-300 flex items-center justify-center"
                id="hero-enquire-now-btn"
              >
                Enquire Now
              </button>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 grid grid-cols-3 gap-6 sm:gap-10 border-t border-slate-800/80 w-full"
              id="hero-metrics"
            >
              <div className="text-left">
                <span className="block text-2xl sm:text-3xl font-extrabold text-white">lowest</span>
                <span className="block text-xs uppercase tracking-wider text-slate-400">Airfare Guarantee</span>
              </div>
              <div className="text-left">
                <span className="block text-2xl sm:text-3xl font-extrabold text-white">24/7</span>
                <span className="block text-xs uppercase tracking-wider text-slate-400">Emergency Desk</span>
              </div>
              <div className="text-left flex flex-col justify-start">
                <div className="flex items-center text-amber-400 gap-0.5">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="block text-xs uppercase tracking-wider text-slate-400 mt-1">5-Star Travel desk</span>
              </div>
            </motion.div>

          </div>

          {/* Side Premium Interactive Display Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-slate-900/60 backdrop-blur-lg border border-slate-800/80 p-8 rounded-2xl relative shadow-2xl"
              id="hero-flight-badge-card"
            >
              {/* Card top shine */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-600/30 to-transparent"></div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-widest block">Premium Partner Desk</span>
                  <h3 className="text-xl font-bold mt-1 text-white">Live Flight Quotations</h3>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded font-medium">
                  Direct API Active
                </span>
              </div>

              {/* Sample Ticket Route visualizer */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 mb-6 font-mono text-sm space-y-4">
                <div className="flex justify-between items-center text-slate-400 text-xs text-left">
                  <span>Passenger flight ID</span>
                  <span>DEP DATE</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <span className="text-xl font-extrabold text-amber-400 block font-sans">BOM</span>
                    <span className="text-xs text-slate-500 font-sans">Mumbai, India</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-4 relative">
                    <div className="w-full border-t border-dashed border-slate-700 relative">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-950 p-1 rounded-full">
                        <PlaneTakeoff className="w-3.5 h-3.5 text-amber-500" />
                      </div>
                    </div>
                    <span className="text-[10px] text-amber-400/80 mt-1 uppercase tracking-widest font-sans">Non-Stop</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-amber-400 block font-sans">DXB</span>
                    <span className="text-xs text-slate-500 font-sans">Dubai, UAE</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs">
                  <span className="text-slate-500 text-left">Economy, Business or First Cabin classes available</span>
                </div>
              </div>

              {/* Instant benefits bullet items */}
              <div className="space-y-3.5 text-left text-sm">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-emerald-500/10 rounded-full text-emerald-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-slate-300 font-medium">100% Secure Checkout & IATA standards</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-emerald-500/10 rounded-full text-emerald-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-slate-300 font-medium font-sans">Up to 25% corporate discounts on Business Cabin</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-emerald-500/10 rounded-full text-emerald-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-slate-300 font-medium">Custom packages with visa & transfer arrangements</span>
                </div>
              </div>

              {/* Trigger button */}
              <button
                onClick={() => setActiveTab('enquiry')}
                className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm tracking-wide rounded-lg transition-colors border border-slate-700"
                id="hero-widget-btn"
              >
                Start Free Enquiry
              </button>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
