/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Destinations from './components/Destinations';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import EnquiryForm from './components/EnquiryForm';
import AdminPanel from './components/AdminPanel';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import SharedDetails from './components/SharedDetails';
import { getEnquiries } from './db';
import { Phone, Plane } from 'lucide-react';
import { FlightEnquiry } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'enquiry' | 'admin'>('home');
  const [prefilledDestination, setPrefilledDestination] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  // Deep Link visual states
  const [sharedEnquiry, setSharedEnquiry] = useState<FlightEnquiry | null>(null);
  const [focusedPart, setFocusedPart] = useState<string>('all');

  // Parse deep link parameters on boot/refresh
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const enqId = params.get('enquiryId');
      const part = params.get('part') || 'all';
      if (enqId) {
        // Run getEnquiries to parse and register the shared data into local storage beforehand
        const all = getEnquiries();
        const found = all.find((item) => item.id === enqId);
        if (found) {
          setSharedEnquiry(found);
          setFocusedPart(part);
        }
      }
    } catch (e) {
      console.error('Error parsing deep links:', e);
    }
  }, [refreshTrigger]);

  // Update CRM notifications
  const updateCrmNotificationBadge = () => {
    try {
      const all = getEnquiries();
      const news = all.filter((item) => item.status === 'New').length;
      setUnreadCount(news);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateCrmNotificationBadge();
  }, [refreshTrigger, activeTab]);

  // Handle destination selection from Homepage grid
  const handleSelectDestination = (cityName: string) => {
    setPrefilledDestination(cityName);
    setActiveTab('enquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback when a new ticket is booked
  const handleSuccessSubmit = () => {
    setRefreshTrigger((prev) => prev + 1);
    updateCrmNotificationBadge();
  };

  const handleClearSharedView = () => {
    try {
      const baseUrl = window.location.origin + window.location.pathname;
      window.history.pushState({}, '', baseUrl);
    } catch (e) {
      console.error(e);
    }
    setSharedEnquiry(null);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none overflow-x-hidden antialiased">
      
      {/* Dynamic SEO Title & description injections */}
      <title>Flight Booking & Air Ticket Enquiry | Nilhans Travels</title>
      <meta name="description" content="Get the best domestic and international flight deals. Submit your enquiry and receive the lowest airfare from Nilhans Travels." />

      {/* Global Brand Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        enquiryCount={unreadCount}
      />

      {/* Main Client Content body */}
      <main className="flex-grow">
        {sharedEnquiry ? (
          <div className="py-8 bg-slate-100/50 min-h-[85vh]">
            <SharedDetails 
              enquiry={sharedEnquiry} 
              initialFocusedPart={focusedPart}
              onBackToHome={handleClearSharedView}
            />
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <div className="animate-fade-in">
                <Hero setActiveTab={setActiveTab} />
                <Services setActiveTab={setActiveTab} />
                <Destinations onSelectDestination={handleSelectDestination} />
                <WhyChooseUs />
                <Testimonials />
              </div>
            )}

            {activeTab === 'enquiry' && (
              <div className="py-8 bg-slate-100/50 min-h-[85vh]">
                <EnquiryForm 
                  prefilledDestination={prefilledDestination} 
                  clearPrefilledDestination={() => setPrefilledDestination('')}
                  onSuccessSubmit={handleSuccessSubmit}
                />
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="py-8 bg-slate-50 min-h-[90vh]">
                <AdminPanel refreshTrigger={refreshTrigger} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Contact Form and Map details (Hidden in raw Admin workspace for neatness) */}
      {!sharedEnquiry && activeTab !== 'admin' && <ContactSection />}

      {/* Corporate footer details (Hidden in CRM context) */}
      {!sharedEnquiry && activeTab !== 'admin' && <Footer setActiveTab={setActiveTab} />}

      {/* Floating high-conversion Chat widget */}
      <WhatsAppChat />

      {/* Mobile-Only Sticky Call & Quick Enquiry Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-slate-900 border-t border-slate-800 p-3 flex md:hidden items-center justify-between gap-3 z-30" id="mobile-sticky-dock">
        <a 
          href="tel:+13072841315"
          className="flex-1 py-3 bg-slate-800 text-slate-100 rounded-xl flex items-center justify-center gap-2 text-xs font-bold border border-slate-700"
          id="sticky-call-trigger"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call Desk Now</span>
        </a>
        <button
          onClick={() => {
            setActiveTab('enquiry');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-1 py-3 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider hover:bg-amber-400 transition-colors"
          id="sticky-enquiry-trigger"
        >
          <Plane className="w-4 h-4 rotate-45 transform" />
          <span>Flight Enquiry</span>
        </button>
      </div>

    </div>
  );
}
