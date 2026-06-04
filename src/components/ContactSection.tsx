/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeDuUeiXGObY1myP3QVpVA4uSkMZnEjAkH4xYAgpQ16r8sTLA/viewform?usp=header';

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate contact submission
    setIsSuccess(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMsg('');
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section className="py-24 bg-slate-950 text-white relative font-sans" id="contact-section">
      {/* Decorative vector background */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-slate-900 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-[4px] block">
            Reach Out Today
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" id="cnt-heading">
            Connect With Nilhans Corporate Desk
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-300 font-light text-sm leading-relaxed" id="cnt-desc">
            Get immediate replies. Our head offices operate synchronized desks to expedite flight booking and visa support queries without delays.
          </p>
        </div>

        {/* Contact layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-blocks-grid">
          
          {/* Info cards left */}
          <div className="lg:col-span-4 space-y-6 text-left">
            
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-100 uppercase tracking-wider">Corporate Headquarters</h4>
                  <p className="text-xs text-slate-300 leading-normal">
                    Nilhans Travels Private Limited<br />
                    703 Johnson Ln,<br />
                    Sugar Land, TX 77479, United States
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-sm text-slate-100 uppercase tracking-wider">Immediate Assistance</h4>
                  <a href="tel:+13072841315" className="block text-slate-300 hover:text-amber-400 font-mono font-medium py-0.5">
                    +1 (307) 284-1315 (Direct Support Desk)
                  </a>
                  <a href="tel:+13072841315" className="block text-slate-400 hover:text-amber-400 font-mono font-normal">
                    +1 (307) 284-1315 (Corporate Desk)
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-sm text-slate-100 uppercase tracking-wider">Email Communications</h4>
                  <a href="mailto:info@nilhans.com" className="block text-slate-300 hover:text-amber-400 font-mono py-0.5">
                    info@nilhans.com
                  </a>
                  <a href="mailto:info@nilhans.com" className="block text-slate-400 hover:text-amber-400 font-mono">
                    info@nilhans.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-100 uppercase tracking-wider">Working Hours</h4>
                  <p className="text-xs text-slate-300">
                    Monday &mdash; Saturday: 09:00 AM &mdash; 08:00 PM IST<br />
                    Sunday: Emergency Support via WhatsApp Only
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive submit block middle */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl text-left relative">
            <h3 className="text-xl font-bold mb-1 text-white">General Inquiries Form</h3>
            <p className="text-xs text-slate-400 mb-6">Need hotel bookings, hotel transfers, or visa consultancy? Send us a quick query.</p>

            {isSuccess ? (
              <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-6 text-center space-y-3" id="general-cnt-success">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">Query Received!</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Our system cached your submission successfully. An operations executive will follow up with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Your Name</span>
                    <input
                      type="text"
                      className="px-3 py-2 bg-slate-950 border border-slate-800 rounded font-sans text-xs focus:outline-none focus:border-amber-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-1 flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Your Email</span>
                    <input
                      type="email"
                      className="px-3 py-2 bg-slate-950 border border-slate-800 rounded font-sans text-xs focus:outline-none focus:border-amber-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1 flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Subject</span>
                  <input
                    type="text"
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded font-sans text-xs focus:outline-none focus:border-amber-500"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Visa support, Corporate account setup, etc."
                  />
                </div>

                <div className="space-y-1 flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Message</span>
                  <textarea
                    rows={4}
                    className="p-3 bg-slate-950 border border-slate-800 rounded font-sans text-xs focus:outline-none focus:border-amber-500 resize-none"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    required
                    placeholder="Provide details of your planned holiday or specific ticketing issues..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider rounded font-sans hover:bg-amber-400 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Real Google Form Integration sidebar right */}
          <div className="lg:col-span-3 space-y-6 text-left">
            
            {/* Google Forms callbox */}
            <div className="bg-amber-500 text-slate-950 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
              <h4 className="text-lg font-black leading-tight tracking-tight">
                Classic Google Form Submission
              </h4>
              <p className="text-xs text-slate-900 leading-relaxed font-medium">
                Prefer to communicate through our official legacy channels? Fill in your travel details using our verified SSL-secured Google Document platform directly.
              </p>
              
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full py-3 bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
                id="google-form-link-btn"
              >
                <span>Open Google Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Google Maps Visual Indicator */}
            <div className="border border-slate-800 bg-slate-900 p-4 rounded-3xl text-xs space-y-3 relative overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-amber-500 block font-mono">Live Desk Location map</span>
              
              {/* Simulated static custom styled map for premium look */}
              <div className="w-full h-32 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-800 group">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="text-center space-y-1 relative z-10">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white mx-auto animate-bounce font-bold">📍</div>
                  <span className="block font-bold text-[10px] text-slate-300 font-sans">Sugar Land, Texas, USA</span>
                </div>
              </div>

              <span className="block text-[10px] text-slate-400">
                Secure SSL Ready servers guarantee 256-bit SSL encryption client-side.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
