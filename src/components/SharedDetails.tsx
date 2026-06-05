/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FlightEnquiry } from '../types';
import { serializeEnquiry } from '../db';
import { 
  Plane, Users, PhoneCall, MessageSquare, Copy, Check, 
  Calendar, Award, DollarSign, ArrowLeft, ExternalLink, ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface SharedDetailsProps {
  enquiry: FlightEnquiry;
  initialFocusedPart: string;
  onBackToHome: () => void;
}

export default function SharedDetails({ enquiry, initialFocusedPart, onBackToHome }: SharedDetailsProps) {
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [activeSegment, setActiveSegment] = useState<string>(initialFocusedPart || 'all');

  const triggerCopy = (segment: string) => {
    try {
      const b64 = serializeEnquiry(enquiry);
      const baseUrl = window.location.origin + window.location.pathname;
      const fullUrl = `${baseUrl}?enqData=${b64}&enquiryId=${enquiry.id}${segment !== 'all' ? `&part=${segment}` : ''}`;
      
      navigator.clipboard.writeText(fullUrl);
      setCopiedStatus(segment);
      setTimeout(() => setCopiedStatus(null), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const getHighlightClass = (segment: string) => {
    if (activeSegment === segment) {
      return 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-500/[0.01]';
    }
    return 'border-slate-200 bg-white hover:border-slate-350';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left" id="shared-details-root">
      
      {/* Back button and Success status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:shadow-xs transition-all uppercase tracking-wider"
          id="shared-detail-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portal</span>
        </button>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex items-center gap-2.5 text-xs text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-medium">
            Stored: Full flight details for <strong className="font-bold">{enquiry.id}</strong> are locked into browser storage.
          </span>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">
              Synchronized Lead Ledger
            </span>
            <h1 className="text-3xl font-black text-white tracking-snug">
              Flight Enquiry: {enquiry.fullName}
            </h1>
            <p className="text-xs text-slate-400 font-light max-w-xl">
              Ticket proposal requested on {new Date(enquiry.submittedAt).toLocaleDateString()} at {new Date(enquiry.submittedAt).toLocaleTimeString()}. Use the section links below to share individual detail segments with other consultants.
            </p>
          </div>

          <button
            onClick={() => triggerCopy('all')}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all w-full md:w-auto ${
              copiedStatus === 'all' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
            }`}
            id="share-full-btn"
          >
            {copiedStatus === 'all' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Full Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Details Link</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Tabs to toggle Focus */}
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider h-fit py-1.5 self-center mr-2">Highlight Part:</span>
          {(['all', 'flight', 'passenger', 'contact', 'requests'] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all border ${
                activeSegment === seg
                  ? 'bg-white text-slate-950 border-white'
                  : 'bg-slate-950 text-slate-400 border-slate-850 hover:text-white'
              }`}
              id={`tab-highlight-${seg}`}
            >
              {seg === 'all' ? 'All Segments' : `${seg} details`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of details */}
      <div className="space-y-6" id="shared-details-sections">

        {/* SECTION 1: FLIGHT ROUTING DETAILS */}
        <div 
          className={`border rounded-2xl p-6 sm:p-8 shadow-xs transition-all duration-300 ${getHighlightClass('flight')}`}
          id="shared-part-flight"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Flight Route & Travel parameters</h3>
                <p className="text-[10px] text-slate-400 font-medium uppercase font-mono">Part 1 of 4 • Journey Specifications</p>
              </div>
            </div>

            <button
              onClick={() => triggerCopy('flight')}
              className={`px-3.5 py-2 border rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 ${
                copiedStatus === 'flight' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-700 border-slate-205'
              }`}
              id="share-flight-btn"
            >
              {copiedStatus === 'flight' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Route Link</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Departure Hub</span>
              <span className="text-base font-extrabold text-slate-900 block">{enquiry.fromCity}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Destination Hub</span>
              <span className="text-base font-extrabold text-slate-900 block">{enquiry.toCity}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Trip Classification</span>
              <span className="text-sm font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded w-fit block">{enquiry.tripType}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Cabin Selection</span>
              <span className="text-sm font-bold text-amber-700 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded w-fit block">
                {enquiry.cabinClass}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Departure Date</span>
              <div className="flex items-center gap-1.5 text-slate-800 font-mono font-bold text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{enquiry.departureDate}</span>
              </div>
            </div>

            {enquiry.returnDate && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Return Flight Date</span>
                <div className="flex items-center gap-1.5 text-slate-800 font-mono font-bold text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{enquiry.returnDate}</span>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Preferred Airline</span>
              <span className="text-sm font-bold text-slate-800">{enquiry.preferredAirline || 'Any Open Carrier'}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Date Flexibility</span>
              <span className="text-sm font-bold text-slate-800">
                {enquiry.flexibleDates ? 'Flexible (+/- 3 days)' : 'Strict Schedule'}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: PASSENGER PROFILE */}
        <div 
          className={`border rounded-2xl p-6 sm:p-8 shadow-xs transition-all duration-300 ${getHighlightClass('passenger')}`}
          id="shared-part-passenger"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Passenger Headcount Breakdown</h3>
                <p className="text-[10px] text-slate-400 font-medium uppercase font-mono">Part 2 of 4 • Ticket Demographics</p>
              </div>
            </div>

            <button
              onClick={() => triggerCopy('passenger')}
              className={`px-3.5 py-2 border rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 ${
                copiedStatus === 'passenger' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-700 border-slate-205'
              }`}
              id="share-passenger-btn"
            >
              {copiedStatus === 'passenger' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Passengers Link</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-150 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Adults (12y+)</span>
              <span className="text-2xl font-black text-slate-900 font-mono">{enquiry.adults}</span>
            </div>

            <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-150 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Children (2y - 12y)</span>
              <span className="text-2xl font-black text-slate-900 font-mono">{enquiry.children}</span>
            </div>

            <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-150 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Infants (Below 2y)</span>
              <span className="text-2xl font-black text-slate-900 font-mono">{enquiry.infants}</span>
            </div>

            <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-150 text-center space-y-1 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Seats Logged</span>
              <span className="text-2xl font-black text-indigo-600 font-mono">{enquiry.adults + enquiry.children}</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: CONTACT DETAILS & BUDGET */}
        <div 
          className={`border rounded-2xl p-6 sm:p-8 shadow-xs transition-all duration-300 ${getHighlightClass('contact')}`}
          id="shared-part-contact"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Client Contact & expected Budget</h3>
                <p className="text-[10px] text-slate-400 font-medium uppercase font-mono">Part 3 of 4 • Client Profile</p>
              </div>
            </div>

            <button
              onClick={() => triggerCopy('contact')}
              className={`px-3.5 py-2 border rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 ${
                copiedStatus === 'contact' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-700 border-slate-205'
              }`}
              id="share-contact-btn"
            >
              {copiedStatus === 'contact' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Contact Link</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1 col-span-1 sm:col-span-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Client Full Name</span>
              <span className="text-base font-extrabold text-slate-900 block">{enquiry.fullName}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Mobile Number</span>
              <a 
                href={`tel:${enquiry.mobileNumber}`}
                className="text-sm font-bold text-slate-850 hover:underline block font-mono"
              >
                📞 {enquiry.mobileNumber}
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email Address</span>
              <a 
                href={`mailto:${enquiry.emailAddress}`}
                className="text-sm font-bold text-slate-850 hover:underline block font-mono overflow-hidden text-ellipsis"
              >
                ✉️ {enquiry.emailAddress}
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Budget Preference</span>
              <div className="flex items-center gap-1 text-emerald-700 font-extrabold text-sm">
                <DollarSign className="w-4 h-4" />
                <span>{enquiry.budgetRange || 'Unspecified'}</span>
              </div>
            </div>

            <div className="space-y-1 col-span-1 sm:col-span-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Contact Synchronization Status</span>
              <span className="text-xs text-slate-500 font-light block leading-normal">
                Clicking phone or email triggers native client dispatch immediately to expedite booking confirmation.
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 4: SPECIAL REQUESTS & LEAD STATUS */}
        <div 
          className={`border rounded-2xl p-6 sm:p-8 shadow-xs transition-all duration-300 ${getHighlightClass('requests')}`}
          id="shared-part-requests"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Special requests & Internal lead updates</h3>
                <p className="text-[10px] text-slate-400 font-medium uppercase font-mono">Part 4 of 4 • Remarks & Special Requests</p>
              </div>
            </div>

            <button
              onClick={() => triggerCopy('requests')}
              className={`px-3.5 py-2 border rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 ${
                copiedStatus === 'requests' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-700 border-slate-205'
              }`}
              id="share-requests-btn"
            >
              {copiedStatus === 'requests' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Requests Link</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Client Request Note</span>
              <p className="text-xs text-slate-750 bg-slate-50 border border-slate-150 p-4 rounded-xl leading-relaxed italic">
                &quot;{enquiry.specialRequests || 'No adjustments or special requests logged.'}&quot;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Current Ticketing Status</span>
                <span className={`inline-block text-[10px] font-extrabold uppercase px-3 py-1 border rounded-full ${
                  enquiry.status === 'Booked' 
                    ? 'bg-emerald-100 text-emerald-850 border-emerald-205' 
                    : 'bg-amber-100 text-amber-850 border-amber-205'
                }`}>
                  ⬤ &nbsp;{enquiry.status}
                </span>
              </div>

              {enquiry.notes && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Agent Coordination Remarks</span>
                  <p className="text-xs font-medium text-slate-700">{enquiry.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
