export interface TripInput {
  destination: string;
  duration: number;
  budget: 'cheap' | 'moderate' | 'luxury';
  groupType: 'solo' | 'couple' | 'friends' | 'family';
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  time: string;
  duration: string;
  cost: number;
  location: string;
  imageUrl: string;
  category: 'sightseeing' | 'food' | 'activity' | 'shopping' | 'culture';
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
}

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  rating: number;
  pricePerNight: number;
  totalPrice: number;
  imageUrl: string;
  amenities: string[];
  location: string;
  bookingUrl: string;
}

export interface Transport {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'car' | 'local';
  from: string;
  to: string;
  provider: string;
  cost: number;
  duration: string;
  bookingUrl: string;
}

export interface TripItinerary {
  id: string;
  destination: string;
  duration: number;
  budget: string;
  groupType: string;
  days: ItineraryDay[];
  accommodation: Accommodation;
  transport: Transport[];
  totalCost: number;
  createdAt: string;
  destinationImage: string;
}

export interface SavedTrip {
  id: string;
  name: string;
  destination: string;
  createdAt: string;
  updatedAt?: string;
  itinerary: TripItinerary;
}