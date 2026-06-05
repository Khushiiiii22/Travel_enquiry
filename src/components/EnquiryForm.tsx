/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TripType, CabinClass, FlightEnquiry } from '../types';
import { saveEnquiry, serializeEnquiry } from '../db';
import { PlaneTakeoff, ShieldAlert, CheckCircle, Smartphone, Mail, Info, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface EnquiryFormProps {
  prefilledDestination: string;
  clearPrefilledDestination: () => void;
  onSuccessSubmit: () => void;
}

export default function EnquiryForm({ prefilledDestination, clearPrefilledDestination, onSuccessSubmit }: EnquiryFormProps) {
  // Step tracker
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [latestEnquiry, setLatestEnquiry] = useState<FlightEnquiry | null>(null);
  const [copiedPart, setCopiedPart] = useState<string | null>(null);

  const handleCopyPartLink = (partName: string) => {
    if (!latestEnquiry) return;
    try {
      const b64 = serializeEnquiry(latestEnquiry);
      const baseUrl = window.location.origin + window.location.pathname;
      const fullUrl = `${baseUrl}?enqData=${b64}&enquiryId=${latestEnquiry.id}${partName !== 'all' ? `&part=${partName}` : ''}`;
      
      navigator.clipboard.writeText(fullUrl);
      setCopiedPart(partName);
      setTimeout(() => setCopiedPart(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };
  
  // Trip details states
  const [tripType, setTripType] = useState<TripType>('Round Trip');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [preferredAirline, setPreferredAirline] = useState('');
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');

  // Passenger details states
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Additional states
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');
  const [budgetRange, setBudgetRange] = useState('$800 - $1,500');

  // Load prefilled destination if chosen from homepage
  useEffect(() => {
    if (prefilledDestination) {
      setToCity(prefilledDestination);
      clearPrefilledDestination();
    }
  }, [prefilledDestination, clearPrefilledDestination]);

  // Form validations
  const validateStep1 = () => {
    if (!fromCity.trim()) return 'Please enter departure city';
    if (!toCity.trim()) return 'Please enter destination city';
    if (!departureDate) return 'Please select your departure date';
    if (tripType === 'Round Trip' && !returnDate) return 'Please select return date';
    return null;
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const error = validateStep1();
    if (error) {
      alert(error);
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert('Please fill in your full name');
      return;
    }
    if (!mobileNumber.trim()) {
      alert('Please enter your mobile number');
      return;
    }
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    // Save lead through LocalDB API
    const entry = {
      tripType,
      fromCity: fromCity.toUpperCase(),
      toCity: toCity.toUpperCase(),
      departureDate,
      returnDate: tripType === 'Round Trip' ? returnDate : undefined,
      preferredAirline: preferredAirline || 'Any Airline',
      cabinClass,
      fullName,
      mobileNumber,
      emailAddress,
      adults: Number(adults),
      children: Number(children),
      infants: Number(infants),
      flexibleDates,
      specialRequests: specialRequests || 'No special requests',
      budgetRange,
    };

    const saved = saveEnquiry(entry);
    setLatestEnquiry(saved);
    setIsSubmitted(true);
    onSuccessSubmit(); // Trigger navbar counter increments / list reloads
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans" id="enquiry-success-block">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          {/* Background overlay accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-20 h-20 bg-amber-500/10 border-2 border-amber-500 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4" id="success-header">
            Enquiry Submitted Successfully!
          </h2>
          
          <p className="text-slate-300 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8" id="success-body">
            Thank you for your enquiry. Our travel experts are already matching airline seats with your exact flight route. 
            <span className="block mt-3 text-amber-400 font-medium">Our travel expert will contact you shortly with the best available fare.</span>
          </p>

          {/* Quick Lead Action Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-6 text-left">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase font-mono">
                <Smartphone className="w-4 h-4" />
                <span>Secure Hotline Desk</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Skip the ticket queue. Call our direct agent desk immediately to speak with a travel representative regarding your flight request.
              </p>
              <a
                href="tel:+13072841315"
                className="inline-flex w-full mt-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase rounded items-center justify-center gap-2 transition-all duration-200"
              >
                <span>Call +1 (307) 284-1315</span>
              </a>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase font-mono">
                <Mail className="w-4 h-4" />
                <span>Admin Notification Sent</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A structured copy of this request was logged into the **Nilhans database** and transmitted to admin email.
              </p>
              <div className="text-[10px] text-amber-400 font-mono italic mt-4">
                Ref ID: NILHANS-{latestEnquiry?.id || 'PENDING'}
              </div>
            </div>
          </div>

          {/* Share links for details section */}
          {latestEnquiry && (
            <div className="max-w-xl mx-auto mb-8 text-left bg-slate-950 p-5.5 rounded-xl border border-slate-800 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest font-mono block">Enquiry Deep Links</span>
                <h4 className="text-sm font-bold text-white mt-0.5">Share detail link for each part:</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                  Click below to copy links that highlight specific portions of this flight proposal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {[
                  { label: '✈️ Details: Route segment', key: 'flight' },
                  { label: '👥 Details: Passenger config', key: 'passenger' },
                  { label: '📞 Details: Contact & Profile', key: 'contact' },
                  { label: '📋 Details: Requests & Notes', key: 'requests' },
                ].map((part) => (
                  <button
                    key={part.key}
                    onClick={() => handleCopyPartLink(part.key)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-colors font-medium ${
                      copiedPart === part.key
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/50 hover:text-white'
                    }`}
                    type="button"
                    id={`success-part-copy-${part.key}`}
                  >
                    <span className="truncate">{part.label}</span>
                    <span className="text-[10px] uppercase font-bold text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded ml-2 flex-shrink-0">
                      {copiedPart === part.key ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                ))}
                
                <button
                  onClick={() => handleCopyPartLink('all')}
                  className={`col-span-1 sm:col-span-2 flex items-center justify-between p-2.5 rounded-lg border text-left transition-colors font-bold ${
                    copiedPart === 'all'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-400 font-extrabold'
                      : 'bg-amber-500/10 border-amber-550/30 text-amber-400 hover:border-amber-500 hover:bg-amber-500/20'
                  }`}
                  type="button"
                  id={`success-part-copy-all`}
                >
                  <span>🚀 Copy Complete Ledger Certificate Link</span>
                  <span className="text-[10px] uppercase font-black text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded">
                    {copiedPart === 'all' ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              // Reset values to restart
              setIsSubmitted(false);
              setStep(1);
              setFromCity('');
              setToCity('');
              setDepartureDate('');
              setReturnDate('');
              setPreferredAirline('');
              setSpecialRequests('');
              setFullName('');
              setMobileNumber('');
              setEmailAddress('');
            }}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-semibold rounded-lg transition-colors border border-slate-750"
            id="reset-form-btn"
          >
            Submit Another Ticket Quote
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans" id="flight-enquiry-page">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Informational Sidebar */}
        <div className="md:col-span-4 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decoration shine */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider rounded-md w-fit">
              <span>Save up to 30%</span>
            </div>
            
            <h3 className="text-2xl font-black text-white leading-tight">
              Get Lowest Custom Airfares
            </h3>
            
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              Submit your specific booking dates. Our specialized travel consultants search offline partner networks & consolidator codes to present multiple flight choices.
            </p>
          </div>

          {/* Stepper visualizer */}
          <div className="space-y-6 pt-10 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 1 ? 'bg-amber-500 text-slate-950 font-sans' : 'bg-slate-800 text-slate-400'
              }`}>
                1
              </div>
              <div>
                <span className="block text-xs font-semibold text-white">Route Parameters</span>
                <span className="block text-[10px] text-slate-400">Where & when do you fly?</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 2 ? 'bg-amber-500 text-slate-950 font-sans' : 'bg-slate-800 text-slate-400'
              }`}>
                2
              </div>
              <div>
                <span className="block text-xs font-semibold text-white">Contact & Passengers</span>
                <span className="block text-[10px] text-slate-400">Who is traveling?</span>
              </div>
            </div>
          </div>

          <div className="pt-10 flex items-center gap-2 text-slate-400 text-[10px] italic">
            <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
            <span>Fully compliant with airline safety & cancellation guidelines.</span>
          </div>
        </div>

        {/* Right Form Fields Area */}
        <form onSubmit={handleSubmit} className="md:col-span-8 p-8 sm:p-12 text-left space-y-8 bg-slate-50/50">
          
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 font-sans">
              Flight Enquiry Form
            </h2>
            <p className="text-xs text-slate-500">
              Provide your details and secure lower fares compared to typical search indexes.
            </p>
          </div>

          {/* STEP 1: ROUTE PARAMETERS */}
          {step === 1 && (
            <div className="space-y-6" id="form-step-1">
              
              {/* Trip Type toggle */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Trip Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['One Way', 'Round Trip', 'Multi-City'] as TripType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTripType(type)}
                      className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all text-center ${
                        tripType === type
                          ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-100'
                      }`}
                      id={`triptype-btn-${type.replace(' ', '')}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* From & To Cities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">From City</label>
                  <input
                    type="text"
                    placeholder="e.g. MUMBAI (BOM)"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-slate-900 rounded-lg text-sm text-slate-800 placeholder-slate-400 shadow-sm"
                    required
                    id="input-from-city"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">To City</label>
                  <input
                    type="text"
                    placeholder="e.g. DUBAI (DXB)"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-slate-900 rounded-lg text-sm text-slate-800 placeholder-slate-400 shadow-sm"
                    required
                    id="input-to-city"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Departure Date</label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-slate-900 rounded-lg text-sm text-slate-800 shadow-sm"
                    required
                    id="input-dep-date"
                  />
                </div>
                {tripType === 'Round Trip' && (
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Return Date</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-slate-900 rounded-lg text-sm text-slate-800 shadow-sm"
                      required={tripType === 'Round Trip'}
                      id="input-ret-date"
                    />
                  </div>
                )}
              </div>

              {/* Prefer Airline & Cabin Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Preferred Airline (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Emirates, Air India, Singapore Airlines"
                    value={preferredAirline}
                    onChange={(e) => setPreferredAirline(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-slate-900 rounded-lg text-sm text-slate-800 placeholder-slate-400 shadow-sm"
                    id="input-airline"
                  />
                </div>
                
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cabin Class</label>
                  <select
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value as CabinClass)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-slate-900 rounded-lg text-sm text-slate-800 shadow-sm"
                    id="input-cabin"
                  >
                    <option value="Economy">Economy</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First Class</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-transform hover:scale-102 flex items-center gap-2 shadow-md w-full sm:w-auto justify-center"
                  id="form-next-step-btn"
                >
                  <span>Continue to Passenger Details</span>
                  <PlaneTakeoff className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: PASSENGER & CONTACT DETAILS */}
          {step === 2 && (
            <div className="space-y-6" id="form-step-2">
              
              {/* Back selector */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider flex items-center gap-1 mb-4"
                id="back-step-btn"
              >
                ← Back to Journey details
              </button>

              {/* Personal Details */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                <text className="hidden">Full name field</text>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-slate-900 rounded-lg text-sm text-slate-800 shadow-sm"
                  required
                  id="input-fullname"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (307) 284-1315"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-slate-900 rounded-lg text-sm text-slate-800 shadow-sm"
                    required
                    id="input-mobile"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. rajesh@gmail.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-slate-900 rounded-lg text-sm text-slate-800 shadow-sm"
                    required
                    id="input-email"
                  />
                </div>
              </div>

              {/* Passengers Breakdown (Adults, Children, Infants) */}
              <div className="bg-slate-100 rounded-xl p-4 sm:p-5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-4">Passenger Headcount Breakdown</span>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1 flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Adults (12y+)</span>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full px-2 py-2 bg-white border border-slate-200 rounded text-xs text-slate-800 focus:outline-none"
                      id="input-[adults]"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Kids (2y - 12y)</span>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full px-2 py-2 bg-white border border-slate-200 rounded text-xs text-slate-800 focus:outline-none"
                      id="input-[children]"
                    >
                      {[...Array(11)].map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Infants (0 - 2y)</span>
                    <select
                      value={infants}
                      onChange={(e) => setInfants(Number(e.target.value))}
                      className="w-full px-2 py-2 bg-white border border-slate-200 rounded text-xs text-slate-800 focus:outline-none"
                      id="input-[infants]"
                    >
                      {[...Array(11)].map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Flexible Dates Checkbox */}
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-3 shadow-sm select-none">
                  <input
                    type="checkbox"
                    id="checkbox-flexible"
                    checked={flexibleDates}
                    onChange={(e) => setFlexibleDates(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900"
                  />
                  <label htmlFor="checkbox-flexible" className="text-xs text-slate-700 font-medium cursor-pointer">
                    My travel dates are flexible (+/- 3 days)
                  </label>
                </div>

                {/* Budget Selection */}
                <div className="space-y-1 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Expected budget Range (Total)</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none"
                    id="input-budget"
                  >
                    <option value="$300 - $800">$300 - $800 (Budget Domestic)</option>
                    <option value="$800 - $1,500">$800 - $1,500 (Standard)</option>
                    <option value="$1,500 - $3,000">$1,500 - $3,000 (Premium International)</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000 (Business Fare)</option>
                    <option value="$5,000+">$5,000+ (First Class or Family group)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Special Requests / Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Need wheelchair support, vegetarian baby meals, specific flight timings or hotel connection package assistance..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full p-4 bg-white border border-slate-200 focus:outline-none focus:border-slate-900 rounded-lg text-sm text-slate-800 placeholder-slate-400 shadow-sm resize-none"
                  id="input-special"
                />
              </div>

              {/* Submit trigger button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 text-slate-950 font-black text-sm tracking-widest uppercase rounded-lg hover:bg-amber-400 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                  id="submit-enquiry-btn"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Get Best Flight Quote</span>
                </button>
              </div>

            </div>
          )}

        </form>

      </div>
    </div>
  );
}
