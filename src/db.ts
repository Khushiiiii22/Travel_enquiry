/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FlightEnquiry } from './types';

const STORAGE_KEY = 'NILHANS_FLIGHT_ENQUIRIES';

const SEED_ENQUIRIES: FlightEnquiry[] = [
  {
    id: 'ENQ-2026-001',
    tripType: 'Round Trip',
    fromCity: 'MUMBAI (BOM)',
    toCity: 'DUBAI (DXB)',
    departureDate: '2026-06-15',
    returnDate: '2026-06-22',
    preferredAirline: 'Emirates',
    cabinClass: 'Business',
    fullName: 'Rajesh Sharma',
    mobileNumber: '+91 98765 43210',
    emailAddress: 'rajesh.sharma@gmail.com',
    adults: 2,
    children: 1,
    infants: 0,
    flexibleDates: true,
    specialRequests: 'Window seat and vegetarian meals requested for all passengers.',
    budgetRange: 'INR 1,50,000 - 2,00,000',
    status: 'New',
    submittedAt: '2026-06-04T10:15:30Z',
    notes: 'Premium lead. Needs Emirates quotation specifically. Vegetarian meal requested.'
  },
  {
    id: 'ENQ-2026-002',
    tripType: 'One Way',
    fromCity: 'DELHI (DEL)',
    toCity: 'LONDON (LHR)',
    departureDate: '2026-07-02',
    preferredAirline: 'Air India',
    cabinClass: 'Premium Economy',
    fullName: 'Ananya Goel',
    mobileNumber: '+91 98123 45678',
    emailAddress: 'ananya.goel@outlook.com',
    adults: 1,
    children: 0,
    infants: 0,
    flexibleDates: false,
    specialRequests: 'Extra legroom seat. Student traveling for Fall intake.',
    budgetRange: 'INR 80,000 - 1,00,000',
    status: 'In Progress',
    submittedAt: '2026-06-03T14:30:22Z',
    notes: 'Sent initial comparison sheet of Air India and British Airways.'
  },
  {
    id: 'ENQ-2026-003',
    tripType: 'Multi-City',
    fromCity: 'BANGALORE (BLR) -> SINGAPORE (SIN)',
    toCity: 'SINGAPORE (SIN) -> BALI (DPS)',
    departureDate: '2026-08-10',
    returnDate: '2026-08-18',
    preferredAirline: 'Singapore Airlines',
    cabinClass: 'Economy',
    fullName: 'Siddharth & Priya Nair',
    mobileNumber: '+91 91765 43221',
    emailAddress: 'sid.nair@yahoo.com',
    adults: 2,
    children: 0,
    infants: 0,
    flexibleDates: true,
    specialRequests: 'Honeymoon couple. Requesting cozy hotels & visa packages together.',
    budgetRange: 'INR 1,20,000 - 1,50,000',
    status: 'Contacted',
    submittedAt: '2026-06-02T08:12:11Z',
    notes: 'Called. They also want customized 7-day Thailand/Bali honeymoon packages.'
  },
  {
    id: 'ENQ-2026-004',
    tripType: 'Round Trip',
    fromCity: 'CHENNAI (MAA)',
    toCity: 'BANGKOK (BKK)',
    departureDate: '2026-06-20',
    returnDate: '2026-06-25',
    preferredAirline: 'Thai Airways',
    cabinClass: 'Economy',
    fullName: 'Vikram Mehra',
    mobileNumber: '+91 99401 23456',
    emailAddress: 'vikram.mehra@gmail.com',
    adults: 4,
    children: 2,
    infants: 1,
    flexibleDates: false,
    specialRequests: 'Family holiday. Requires kid-friendly recommendations and direct flight if possible.',
    budgetRange: 'INR 2,00,000 - 2,50,000',
    status: 'Booked',
    submittedAt: '2026-05-28T16:45:00Z',
    notes: 'Booked Thai Airways TG-338. Total invoice paid.'
  },
  {
    id: 'ENQ-2026-005',
    tripType: 'One Way',
    fromCity: 'KOLKATA (CCU)',
    toCity: 'PATTAYA (UTP)',
    departureDate: '2026-06-30',
    cabinClass: 'Economy',
    fullName: 'Rahul Roy',
    mobileNumber: '+91 98300 12345',
    emailAddress: 'rahulroy@gmail.com',
    adults: 1,
    children: 0,
    infants: 0,
    flexibleDates: true,
    specialRequests: 'Cheapest available fare.',
    budgetRange: 'INR 15,000 - 20,000',
    status: 'Lost',
    submittedAt: '2026-05-25T11:20:00Z',
    notes: 'Lead lost. Client found alternative option online.'
  }
];

export function serializeEnquiry(enquiry: FlightEnquiry): string {
  try {
    const minified = {
      id: enquiry.id,
      tt: enquiry.tripType,
      fc: enquiry.fromCity,
      tc: enquiry.toCity,
      dd: enquiry.departureDate,
      rd: enquiry.returnDate,
      pa: enquiry.preferredAirline,
      cc: enquiry.cabinClass,
      fn: enquiry.fullName,
      mn: enquiry.mobileNumber,
      ea: enquiry.emailAddress,
      ad: enquiry.adults,
      ch: enquiry.children,
      in: enquiry.infants,
      fd: enquiry.flexibleDates,
      sr: enquiry.specialRequests,
      br: enquiry.budgetRange,
      st: enquiry.status,
      sa: enquiry.submittedAt,
    };
    const str = JSON.stringify(minified);
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  } catch (err) {
    console.error('Failed to serialize enquiry:', err);
    return '';
  }
}

export function deserializeEnquiry(base64: string): FlightEnquiry | null {
  try {
    const normalized = atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');
    const str = decodeURIComponent(normalized);
    const minified = JSON.parse(str);
    return {
      id: minified.id,
      tripType: minified.tt,
      fromCity: minified.fc,
      toCity: minified.tc,
      departureDate: minified.dd,
      returnDate: minified.rd,
      preferredAirline: minified.pa,
      cabinClass: minified.cc,
      fullName: minified.fn,
      mobileNumber: minified.mn,
      emailAddress: minified.ea,
      adults: minified.ad,
      children: minified.ch,
      infants: minified.in,
      flexibleDates: minified.fd,
      specialRequests: minified.sr,
      budgetRange: minified.br,
      status: minified.st || 'New',
      submittedAt: minified.sa || new Date().toISOString(),
    };
  } catch (err) {
    console.error('Failed to deserialize enquiry:', err);
    return null;
  }
}

export function getEnquiries(): FlightEnquiry[] {
  const data = localStorage.getItem(STORAGE_KEY);
  let list: FlightEnquiry[] = [];
  if (!data) {
    // Seed and return seed data
    list = SEED_ENQUIRIES;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ENQUIRIES));
  } else {
    try {
      list = JSON.parse(data);
    } catch (error) {
      console.error('Failed to parse inquiries:', error);
      list = SEED_ENQUIRIES;
    }
  }

  // Check URL query parameters for shared data to store/persist automatically
  if (typeof window !== 'undefined' && window.location) {
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedData = params.get('enqData');
      if (sharedData) {
        const decoded = deserializeEnquiry(sharedData);
        if (decoded && !list.some(item => item.id === decoded.id)) {
          // Store it directly and update localStorage
          list = [decoded, ...list];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        }
      }
    } catch (e) {
      console.error('Error auto-syncing shared URL data:', e);
    }
  }

  return list;
}

export function saveEnquiry(enquiry: Omit<FlightEnquiry, 'id' | 'submittedAt' | 'status'>): FlightEnquiry {
  const enquiries = getEnquiries();
  
  // Format id: ENQ-YYYY-000
  const year = new Date().getFullYear();
  const nextNum = enquiries.length + 1;
  const id = `ENQ-${year}-${String(nextNum).padStart(3, '0')}`;
  
  const newEnquiry: FlightEnquiry = {
    ...enquiry,
    id,
    submittedAt: new Date().toISOString(),
    status: 'New'
  };
  
  const updated = [newEnquiry, ...enquiries];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newEnquiry;
}

export function updateEnquiry(id: string, updates: Partial<FlightEnquiry>): FlightEnquiry[] {
  const enquiries = getEnquiries();
  const updated = enquiries.map((item) => {
    if (item.id === id) {
      return { ...item, ...updates };
    }
    return item;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteEnquiry(id: string): FlightEnquiry[] {
  const enquiries = getEnquiries();
  const filtered = enquiries.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
}

// Client-side CSV export function
export function exportToCSV(enquiries: FlightEnquiry[]) {
  const headers = [
    'Enquiry ID',
    'Date Submitted',
    'Trip Type',
    'From City',
    'To City',
    'Departure Date',
    'Return Date',
    'Preferred Airline',
    'Cabin Class',
    'Client Name',
    'Mobile Number',
    'Email Address',
    'Adults',
    'Children',
    'Infants',
    'Flexible Dates',
    'Special Requests',
    'Budget Range',
    'Status',
    'Admin Notes'
  ];

  const escapeCSV = (val: any) => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = enquiries.map((e) => [
    e.id,
    new Date(e.submittedAt).toLocaleDateString() + ' ' + new Date(e.submittedAt).toLocaleTimeString(),
    e.tripType,
    e.fromCity,
    e.toCity,
    e.departureDate,
    e.returnDate || 'N/A',
    e.preferredAirline || 'Any',
    e.cabinClass,
    e.fullName,
    e.mobileNumber,
    e.emailAddress,
    e.adults,
    e.children,
    e.infants,
    e.flexibleDates ? 'Yes' : 'No',
    e.specialRequests || 'None',
    e.budgetRange || 'Unspecified',
    e.status,
    e.notes || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map(escapeCSV).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Nilhans_Travels_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
