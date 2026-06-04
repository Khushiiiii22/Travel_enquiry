/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, DestinationItem, TestimonialItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Domestic Flights',
    description: 'Get cheapest connection fares across all Indian airlines. Quick flight bookings and instant support.',
    iconName: 'PlaneTakeoff'
  },
  {
    id: 'srv-2',
    title: 'International Flights',
    description: 'Exclusive corporate deals and discounted global routing with world-class companion assistance.',
    iconName: 'Globe'
  },
  {
    id: 'srv-3',
    title: 'Holiday Packages',
    description: 'Tailfully custom-crafted tour packages covering best sights, luxury stays and premium guided experiences.',
    iconName: 'Map'
  },
  {
    id: 'srv-4',
    title: 'Hotel Bookings',
    description: 'Special direct partners with 5-star chains & boutique stays to guarantee lowest prices worldwide.',
    iconName: 'Hotel'
  },
  {
    id: 'srv-5',
    title: 'Visa Assistance',
    description: 'End-to-end documentation assistance, fast-track processing, and multi-country tourist visa guidance.',
    iconName: 'FileText'
  },
  {
    id: 'srv-6',
    title: 'Corporate Travel',
    description: 'Unified billing, flexible dates, priority service, and seamless flight bookings for business teams.',
    iconName: 'Briefcase'
  }
];

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 'dest-1',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    description: 'Marvel at futuristic skyscrapers, desert safaris, and legendary shopping malls.',
    startPrice: '₹22,499',
    popularFor: 'Luxury & Sightseeing'
  },
  {
    id: 'dest-2',
    name: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    description: 'Uncover the lush Gardens by the Bay, Universal Studios, and Michelin-starred dining adventures.',
    startPrice: '₹31,999',
    popularFor: 'Family & Attractions'
  },
  {
    id: 'dest-3',
    name: 'Thailand',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1528181304800-2f190854897d?auto=format&fit=crop&w=600&q=80',
    description: 'Explore golden temples of Bangkok, vibrant night markets, and golden pristine beach clubs.',
    startPrice: '₹18,500',
    popularFor: 'Beaches & Heritage'
  },
  {
    id: 'dest-4',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    description: 'Rejuvenate with rice terrace swings, clifftop shrines, beautiful sunsets, and spiritual yoga retreat stays.',
    startPrice: '₹26,999',
    popularFor: 'Romance & Yoga'
  },
  {
    id: 'dest-5',
    name: 'Europe',
    country: 'Multi-Country',
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=600&q=80',
    description: 'Grand historic tour covering the London Eye, Eiffel Tower, romantic Swiss Alps, and Venetian gondolas.',
    startPrice: '₹95,000',
    popularFor: 'Culture & Luxury'
  },
  {
    id: 'dest-6',
    name: 'Vietnam',
    country: 'Vietnam',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    description: 'Cruise emerald waters of Ha Long Bay, taste pho in Hanoi, and discover ancient Hoi An lanterns.',
    startPrice: '₹19,999',
    popularFor: 'Nature & Cuisine'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Devvrat Singhal',
    location: 'New Delhi',
    rating: 5,
    text: 'Nilhans Travels booked our family flights to Dubai within an hour! Their rates were significantly lower than the big OTA portals, and their support helped post-confirm our special meals.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'test-2',
    name: 'Simran Khurana',
    location: 'Mumbai',
    rating: 5,
    text: 'I submitted a flight enquiry for my multi-city student trip to Seattle. The airline expert gave me a custom route combination that saved me over ₹35,000! Professional, transparent pricing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'test-3',
    name: 'Mehul Mehta',
    location: 'Bangalore',
    rating: 5,
    text: 'Excellent b2b customer service. As a corporate lead, I rely on Nilhans Travels for all our international flight booking requirements. Fast response, GST invoices shared on the spot.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'
  }
];
