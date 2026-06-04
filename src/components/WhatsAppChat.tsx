/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const WHATSAPP_NUMBER = '13072841315'; // Client phone number

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(
      message.trim() || 'Hello Nilhans Travels, I want to enquire about domestic / international flight tickets.'
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="wa-chat-container">
      {/* Mini notification badge */}
      {!isOpen && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
      )}

      {/* Main Round Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-4 bg-emerald-600 text-white rounded-full shadow-2xl hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto"
        title="Chat with Travel Expert"
        id="wa-floating-btn"
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
            id="wa-chat-window"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-slate-950 font-mono">
                    NT
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-white">Nilhans Travel Expert</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Online & Responsive
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                id="wa-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Message Box */}
            <div className="p-4 bg-slate-50 min-h-[140px] text-xs space-y-3">
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[85%] border border-slate-100">
                <p className="font-medium text-slate-800 mb-1">👋 Welcome to Nilhans Travels!</p>
                <p className="text-slate-600 leading-relaxed">
                  Looking for the lowest airfare quotation or custom holiday packages? Drop us a line below for instant pricing!
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[85%] border border-slate-100 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 italic">
                  Average response time is under 5 minutes. Real booking specialists.
                </p>
              </div>
            </div>

            {/* Footer Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Type your flight plan or destination..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                id="wa-input-msg"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors flex items-center justify-center flex-shrink-0"
                id="wa-send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
