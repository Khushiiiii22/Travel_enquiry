/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plane, Star, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'enquiry') => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  // Travel Agency Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Nilhans Travels",
    "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
    "@id": "https://nilhans.com/#agency",
    "url": "https://nilhans.com",
    "telephone": "+1-307-284-1315",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "703 Johnson Ln",
      "addressLocality": "Sugar Land",
      "addressRegion": "TX",
      "postalCode": "77479",
      "addressCountry": "US"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://facebook.com/nilhanstravels",
      "https://instagram.com/nilhanstravels"
    ]
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-white font-sans pt-16 pb-8" id="footer-section">
      
      {/* Insert JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand and Description Info */}
          <div className="md:col-span-4 text-left space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="p-1.5 bg-amber-500 rounded text-slate-950">
                <Plane className="w-5 h-5 rotate-45" />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white">NILHANS</span>
              <span className="text-[10px] uppercase tracking-[3px] text-amber-400 font-medium font-sans">Travels</span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Flight Booking &amp; Air Ticket Enquiry Travel Desk. Nilhans Travels provides offline airfare quotation parameters, secure reservation blocks, holiday planning, and comprehensive 24/7 client desk support.
            </p>

            {/* Ratings overview footer badges */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center text-amber-400 gap-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span className="text-xs font-bold text-slate-200">5.0 / 5 Based on 4,800+ reviews</span>
            </div>
          </div>

          {/* Quick Sitemap Links */}
          <div className="md:col-span-3 text-left space-y-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest font-mono">Service Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('enquiry')} className="text-slate-400 hover:text-amber-400 transition-colors">
                  Domestic Flight Enquiry
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('enquiry')} className="text-slate-400 hover:text-amber-400 transition-colors">
                  International Flight Desk
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const el = document.getElementById('services-sec');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} className="text-slate-400 hover:text-amber-400 transition-colors">
                  Holiday Packages
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const el = document.getElementById('why-choose-sec');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} className="text-slate-400 hover:text-amber-400 transition-colors">
                  Corporate Travel Setup
                </button>
              </li>
            </ul>
          </div>

          {/* Security details support hours */}
          <div className="md:col-span-3 text-left space-y-3 text-xs">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest font-mono text-left">Contact Info</h4>
            <div className="space-y-2.5 text-slate-400">
              <a href="tel:+13072841315" className="flex items-center gap-2 hover:text-amber-400">
                <Phone className="w-4 h-4 text-amber-500" />
                <span className="font-mono">+1 (307) 284-1315</span>
              </a>
              <a href="mailto:info@nilhans.com" className="flex items-center gap-2 hover:text-amber-400">
                <Mail className="w-4 h-4 text-amber-500" />
                <span className="font-mono">info@nilhans.com</span>
              </a>
              <p className="leading-normal">
                703 Johnson Ln, Sugar Land, TX 77479, United States.<br />
                Licensed Air Consolidation Travel Partner.
              </p>
            </div>
          </div>

          {/* SSl secure tag banner */}
          <div className="md:col-span-2 text-left space-y-3 text-xs">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest font-mono text-left">Security Checks</h4>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase text-[10px] tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>SSL Secured</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                All client booking enquiries are encrypted at rest using certified secure standards. Zero cookie profiling.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom footer credit bar line */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-left w-full">
          <div>
            &copy; {new Date().getFullYear()} Nilhans Travels Private Limited. All Rights Reserved. 
            <span className="block sm:inline sm:ml-2 text-[10px] text-slate-600">Travel Registration code: LH-BOM-2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeDuUeiXGObY1myP3QVpVA4uSkMZnEjAkH4xYAgpQ16r8sTLA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 inline-flex items-center gap-1"
            >
              <span>Feedback G-Form</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
