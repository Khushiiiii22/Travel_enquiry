/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TripType = 'One Way' | 'Round Trip' | 'Multi-City';

export type CabinClass = 'Economy' | 'Premium Economy' | 'Business' | 'First';

export interface FlightEnquiry {
  id: string;
  tripType: TripType;
  fromCity: string;
  toCity: string;
  departureDate: string;
  returnDate?: string;
  preferredAirline?: string;
  cabinClass: CabinClass;
  
  // Passenger details
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  adults: number;
  children: number;
  infants: number;
  
  // Additional conditions
  flexibleDates: boolean;
  specialRequests?: string;
  budgetRange?: string;
  
  // Lead tracking metadata
  status: 'New' | 'Contacted' | 'In Progress' | 'Booked' | 'Lost';
  submittedAt: string;
  notes?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface DestinationItem {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  startPrice: string;
  popularFor: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}
