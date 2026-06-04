/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FlightEnquiry } from '../types';
import { getEnquiries, updateEnquiry, deleteEnquiry, serializeEnquiry, exportToCSV } from '../db';
import { 
  Search, Filter, Download, Trash2, Edit3, MessageCircle, 
  Settings, CheckCircle2, AlertCircle, Clock, CircleDot, Database, Check
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPanelProps {
  refreshTrigger: number;
}

export default function AdminPanel({ refreshTrigger }: AdminPanelProps) {
  const [enquiries, setEnquiries] = useState<FlightEnquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Active edit model states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<FlightEnquiry['status']>('New');
  const [editNotes, setEditNotes] = useState('');

  // Password gate state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');

  // Suffix part deep link states
  const [copiedLeadPart, setCopiedLeadPart] = useState<{ id: string; part: string } | null>(null);

  const handleCopyLeadPart = (enq: FlightEnquiry, partName: string) => {
    try {
      const b64 = serializeEnquiry(enq);
      const baseUrl = window.location.origin + window.location.pathname;
      const fullUrl = `${baseUrl}?enqData=${b64}&enquiryId=${enq.id}${partName !== 'all' ? `&part=${partName}` : ''}`;
      
      navigator.clipboard.writeText(fullUrl);
      setCopiedLeadPart({ id: enq.id, part: partName });
      setTimeout(() => setCopiedLeadPart(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Load enquiries
  const loadData = () => {
    setEnquiries(getEnquiries());
  };

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  const handleUpdate = (id: string) => {
    const updated = updateEnquiry(id, { status: editStatus, notes: editNotes });
    setEnquiries(updated);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to permanently delete proposal ${id}?`)) {
      const remaining = deleteEnquiry(id);
      setEnquiries(remaining);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin' || password === 'nilhans123') {
      setIsUnlocked(true);
    } else {
      alert('Incorrect password. Please enter a valid agency passcode.');
    }
  };

  // Calculations for KPI Cards
  const totalLeads = enquiries.length;
  const newLeads = enquiries.filter(l => l.status === 'New').length;
  const inProgressLeads = enquiries.filter(l => l.status === 'In Progress' || l.status === 'Contacted').length;
  const bookedLeads = enquiries.filter(l => l.status === 'Booked').length;
  const winRate = totalLeads > 0 ? Math.round((bookedLeads / totalLeads) * 100) : 0;

  // Filtered enquiries list
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch = 
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fromCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.toCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emailAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeStyle = (status: FlightEnquiry['status']) => {
    switch (status) {
      case 'New': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Contacted': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'In Progress': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Booked': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Lost': return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 sm:px-6 font-sans text-left" id="admin-pass-gate">
        <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-8 shadow-2xl relative">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-full flex items-center justify-center mb-6">
            <Database className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl font-extrabold tracking-wide mb-2 text-white">Lead Database Security Gate</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            Enter the agency passcode to view, manage, and export flight bookings and active leads.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Agency Dashboard Code</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                required
                id="admin-pass-input"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 text-slate-950 font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-amber-400 transition-colors"
              id="admin-pass-btn"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="text-[10px] text-slate-500 mt-6 pt-4 border-t border-slate-850 flex items-center gap-2 justify-center">
            <span>🛡️ Authorized travel personnel access only. Logging active IP connections.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans text-left" id="admin-dashboard-root">
      
      {/* Header with Title and CSV download */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 font-sans">
            <Database className="w-8 h-8 text-amber-600" />
            <span>Nilhans CRM Control Desk</span>
          </h2>
          <p className="text-xs text-slate-500">
            Realtime flight ticketing enquiries tracking, client details updates & Excel/CSV download access.
          </p>
        </div>

        <button
          onClick={() => exportToCSV(filteredEnquiries)}
          className="px-4.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-transform hover:scale-[1.02]"
          id="crm-export-btn"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Export {filteredEnquiries.length} Leads to CSV</span>
        </button>
      </div>

      {/* KPI Stats Panel Block */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8" id="crm-kpi-bar">
        
        <div className="bg-white border border-slate-150 p-5 rounded-xl shadow-sm space-y-1.5 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Enquiries</span>
          <span className="text-3xl font-extrabold text-slate-900 block font-mono">{totalLeads}</span>
          <span className="text-[10px] text-emerald-600 font-medium">✨ All-time synchronized</span>
        </div>

        <div className="bg-white border border-slate-150 p-5 rounded-xl shadow-sm space-y-1.5 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-amber-600">New / Unread</span>
          <span className="text-3xl font-extrabold text-amber-500 block font-mono">{newLeads}</span>
          <span className="text-[10px] text-slate-500 font-light">Awaiting callback</span>
        </div>

        <div className="bg-white border border-slate-150 p-5 rounded-xl shadow-sm space-y-1.5 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-cyan-600">Active Pipeline</span>
          <span className="text-3xl font-extrabold text-cyan-500 block font-mono">{inProgressLeads}</span>
          <span className="text-[10px] text-slate-500 font-light">With travel agents</span>
        </div>

        <div className="bg-white border border-slate-150 p-5 rounded-xl shadow-sm space-y-1.5 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-emerald-600">Booked Tickets</span>
          <span className="text-3xl font-extrabold text-emerald-500 block font-mono">{bookedLeads}</span>
          <span className="text-[10px] text-emerald-600 font-extrabold">Revenue generation</span>
        </div>

        <div className="bg-white border border-slate-150 p-5 rounded-xl shadow-sm space-y-1.5 text-left col-span-2 md:col-span-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Conversion rate</span>
          <span className="text-3xl font-extrabold text-indigo-600 block font-mono">{winRate}%</span>
          <span className="text-[10px] text-slate-500 font-light">Performance Win rate</span>
        </div>

      </div>

      {/* Filter and Filters Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex flex-col md:flex-row items-center gap-4">
        
        {/* Search input */}
        <div className="relative flex-1 w-full flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search leads by client name, email, origin, or destination city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 font-sans focus:outline-none focus:border-slate-800 rounded-lg text-sm text-slate-800 placeholder-slate-400"
            id="crm-search-input"
          />
        </div>

        {/* Status filtering selection dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-shrink-0">
          <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span className="text-xs text-slate-500 font-bold uppercase font-mono flex-shrink-0">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-slate-800"
            id="crm-status-select"
          >
            <option value="All">All Leads</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Booked">Booked</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

      </div>

      {/* List / Table Area */}
      {filteredEnquiries.length === 0 ? (
        <div className="bg-white border rounded-2xl p-16 text-center border-slate-200 space-y-3">
          <span className="text-4xl">📭</span>
          <h3 className="text-lg font-bold text-slate-800">No flight enquiries match current parameters</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search box terms or changing status filters. Clear fields to view all records.
          </p>
        </div>
      ) : (
        <div className="space-y-4" id="crm-leads-grid">
          {filteredEnquiries.map((enq) => {
            const isEditing = editingId === enq.id;
            return (
              <div
                key={enq.id}
                className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-250 ${
                  isEditing ? 'border-amber-500 ring-1 ring-amber-500' : 'border-slate-200 hover:border-slate-350'
                }`}
                id={`crm-lead-card-${enq.id}`}
              >
                {/* Visual Header bar of row Card */}
                <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono font-bold text-slate-900 bg-slate-200 px-2.5 py-0.5 rounded text-xs select-none">
                      {enq.id}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold font-mono">
                      Logged at: {new Date(enq.submittedAt).toLocaleDateString() + ' ' + new Date(enq.submittedAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status badge and editor toggle */}
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 border rounded-full ${getStatusBadgeStyle(enq.status)}`}>
                      {enq.status}
                    </span>
                    {!isEditing && (
                      <button
                        onClick={() => {
                          setEditingId(enq.id);
                          setEditStatus(enq.status);
                          setEditNotes(enq.notes || '');
                        }}
                        className="p-1 px-2.5 hover:bg-slate-150 rounded text-slate-600 hover:text-slate-950 text-xs font-bold border border-slate-200 bg-white transition-colors"
                        id={`edit-lead-btn-${enq.id}`}
                      >
                        <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                        Update
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(enq.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent rounded transition-colors"
                      title="Permanently remove enquiry record"
                      id={`delete-lead-btn-${enq.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Main grid parameters body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Trip details segment */}
                  <div className="md:col-span-4 space-y-3.5 text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ROUTE SEGMENTS</span>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{enq.tripType}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-medium tracking-tight">
                          {enq.cabinClass}
                        </span>
                      </div>
                      
                      <p className="text-base font-extrabold text-slate-900 leading-tight">
                        {enq.fromCity} ➔ {enq.toCity}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block">Outbound:</span>
                        <span className="font-bold text-slate-700 font-mono">{enq.departureDate}</span>
                      </div>
                      {enq.returnDate && (
                        <div>
                          <span className="text-slate-400 block">Return Flight:</span>
                          <span className="font-bold text-slate-700 font-mono">{enq.returnDate}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-xs">
                      <span className="text-slate-400">Preferred carrier: </span>
                      <span className="font-bold text-slate-800">{enq.preferredAirline || 'Any/Open'}</span>
                    </div>

                    <div className="text-xs">
                      <span className="text-slate-400">Budget preference: </span>
                      <span className="font-extrabold text-amber-700">{enq.budgetRange || 'Unspecified'}</span>
                    </div>
                  </div>

                  {/* Traveller profile info */}
                  <div className="md:col-span-4 space-y-3.5 text-left border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CLIENT INFORMATION</span>
                    
                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-slate-950 font-sans">{enq.fullName}</h4>
                      
                      <div className="space-y-1 text-xs text-slate-600">
                        <a 
                          href={`tel:${enq.mobileNumber}`} 
                          className="hover:underline hover:text-slate-900 block font-mono font-medium"
                        >
                          📞 {enq.mobileNumber}
                        </a>
                        <a 
                          href={`mailto:${enq.emailAddress}`} 
                          className="hover:underline hover:text-slate-900 block font-mono font-medium"
                        >
                          ✉️ {enq.emailAddress}
                        </a>
                      </div>
                    </div>

                    {/* Breakdown count */}
                    <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700 flex items-center gap-4">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">Adults</span>
                        <span className="font-bold font-mono">{enq.adults}</span>
                      </div>
                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-slate-400 block text-[9px] uppercase">Children</span>
                        <span className="font-bold font-mono">{enq.children}</span>
                      </div>
                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-slate-400 block text-[9px] uppercase">Infants</span>
                        <span className="font-bold font-mono">{enq.infants}</span>
                      </div>
                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-slate-400 block text-[9px] uppercase">Flexible</span>
                        <span className="font-bold">{enq.flexibleDates ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  {/* System notes / special requests section */}
                  <div className="md:col-span-4 space-y-3.5 text-left border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CLIENT REQUESTS & NOTES</span>
                      <p className="text-xs text-slate-600 italic bg-amber-500/5 border border-amber-500/10 p-3 rounded-lg leading-relaxed">
                        &quot;{enq.specialRequests || 'No special requests provided.'}&quot;
                      </p>
                    </div>

                    {enq.notes && (
                      <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200 leading-normal">
                        <span className="font-extrabold text-[9px] uppercase tracking-wider text-slate-400 block">INTERNAL TEAM NOTES:</span>
                        {enq.notes}
                      </div>
                    )}
                  </div>

                </div>

                {/* Section Details Quick Share Links footer strip */}
                <div className="bg-slate-50/60 border-t border-slate-100 px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider font-mono">
                    <span>🔗 Deep-Link parts dispatcher:</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { label: '✈️ Route segment', part: 'flight' },
                      { label: '👥 Passenger specs', part: 'passenger' },
                      { label: '📞 Contact profile', part: 'contact' },
                      { label: '📋 Special remarks', part: 'requests' },
                      { label: '🚀 Complete details link', part: 'all' },
                    ].map((btn) => {
                      const isCopied = copiedLeadPart?.id === enq.id && copiedLeadPart?.part === btn.part;
                      return (
                        <button
                          key={btn.part}
                          onClick={() => handleCopyLeadPart(enq, btn.part)}
                          className={`px-3 py-1.5 rounded border font-bold text-[10px] transition-colors uppercase tracking-wider font-mono cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-white hover:bg-slate-100 font-semibold hover:border-slate-350 text-slate-600 border-slate-200'
                          }`}
                          id={`crm-copy-btn-${enq.id}-${btn.part}`}
                        >
                          {isCopied ? 'Copied Link!' : btn.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inline Updating Form view if toggled */}
                {isEditing && (
                  <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col sm:flex-row items-end gap-4" id={`editing-box-${enq.id}`}>
                    <div className="flex-shrink-0 w-full sm:w-44 space-y-1 flex flex-col">
                      <label className="text-xs font-bold text-slate-500 uppercase">Update Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as FlightEnquiry['status'])}
                        className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                        id="editing-status-select"
                      >
                        <option value="New">New Lead</option>
                        <option value="Contacted">Contacted Client</option>
                        <option value="In Progress">In Progress Routing</option>
                        <option value="Booked">Booked Tickets ✅</option>
                        <option value="Lost">Lost Opportunity ❌</option>
                      </select>
                    </div>

                    <div className="flex-1 w-full space-y-1 flex flex-col">
                      <label className="text-xs font-bold text-slate-500 uppercase">Internal Staff Note / Log Action</label>
                      <input
                        type="text"
                        placeholder="e.g. Called Rajesh on Tuesday, sent comparison budget quote via WhatsApp."
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                        id="editing-notes-input"
                      />
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleUpdate(enq.id)}
                        className="flex-1 sm:flex-initial px-4 py-2 bg-amber-500 text-slate-950 font-bold uppercase text-[10px] tracking-wider rounded-lg hover:bg-amber-400 transition-colors"
                        id="editing-save-btn"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 sm:flex-initial px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider rounded-lg hover:bg-slate-100 transition-colors"
                        id="editing-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
