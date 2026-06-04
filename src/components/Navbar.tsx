/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Plane, Phone, Compass, Shield, Database } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'enquiry' | 'admin';
  setActiveTab: (tab: 'home' | 'enquiry' | 'admin') => void;
  enquiryCount: number;
}

export default function Navbar({ activeTab, setActiveTab, enquiryCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'enquiry', label: 'Flight Enquiry', icon: Plane },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} 
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo-btn"
          >
            <div className="p-2 bg-amber-500 rounded-lg text-slate-950 transition-transform duration-300 group-hover:scale-110">
              <Plane className="w-6 h-6 rotate-45 transform" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider text-white">NILHANS</span>
              <span className="block text-[10px] uppercase tracking-[3px] text-amber-400 font-medium">Travels</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2 text-sm font-semibold tracking-wide transition-colors py-2 px-1 relative ${
                    isActive ? 'text-amber-400' : 'text-slate-200 hover:text-amber-300'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <IconComp className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Admin Dashboard view */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 text-sm font-semibold tracking-wide transition-all py-1.5 px-3 rounded-lg ${
                activeTab === 'admin'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-transparent'
              }`}
              id="nav-link-admin"
            >
              <Database className="w-4 h-4 text-amber-500" />
              <span>Admin Panel</span>
              {enquiryCount > 0 && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                  {enquiryCount}
                </span>
              )}
            </button>
          </nav>

          {/* Call Now and CTA Quick Enquiry */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+13072841315" 
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
              id="nav-call-link"
            >
              <div className="p-1.5 bg-slate-800 rounded-full text-amber-400">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-mono">+1 (307) 284-1315</span>
            </a>
            <button
              onClick={() => setActiveTab('enquiry')}
              className="px-5 py-2.5 bg-amber-500 text-slate-950 text-sm font-bold tracking-wide rounded-full hover:bg-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300 hover:scale-105"
              id="nav-cta-enquire-btn"
            >
              Book & Enquire Now
            </button>
          </div>

          {/* Toggle Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setActiveTab('enquiry')}
              className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-bold rounded-full hover:bg-amber-400 transition-colors"
              id="nav-mobile-cta"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle menu"
              id="nav-mobile-hamburger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 p-4 space-y-3" id="mobile-drawer">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold' 
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
                id={`drawer-btn-${item.id}`}
              >
                <IconComp className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              setActiveTab('admin');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'admin'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
            }`}
            id="drawer-btn-admin"
          >
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-amber-500" />
              <span>Admin Dashboard</span>
            </div>
            {enquiryCount > 0 && (
              <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full font-mono">
                {enquiryCount}
              </span>
            )}
          </button>

          <div className="pt-4 border-t border-slate-900 flex flex-col gap-3">
            <a 
              href="tel:+13072841315" 
              className="flex items-center justify-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 hover:text-white font-mono"
              id="drawer-call-btn"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+1 (307) 284-1315</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
