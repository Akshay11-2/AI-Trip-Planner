// Travel API service for live data integration
import axios from 'axios';

// Mock API endpoints - in production, these would be real travel APIs
const MOCK_API_BASE = 'https://api.example.com';

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  class: 'economy' | 'business' | 'first';
}

export interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  budget: 'cheap' | 'moderate' | 'luxury';
}

export interface ActivitySearchParams {
  destination: string;
  category?: string;
  budget: 'cheap' | 'moderate' | 'luxury';
  groupType: string;
}

// Flight search service
export const searchFlights = async (params: FlightSearchParams) => {
  // Simulate API call with realistic data
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const mockFlights = [
    {
      id: 'flight-1',
      airline: 'Air France',
      flightNumber: 'AF123',
      departure: {
        airport: 'JFK',
        time: '14:30',
        date: params.departureDate
      },
      arrival: {
        airport: 'CDG',
        time: '08:15+1',
        date: new Date(new Date(params.departureDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      duration: '8h 45m',
      price: params.class === 'economy' ? 650 : params.class === 'business' ? 2400 : 4800,
      stops: 0,
      bookingUrl: 'https://booking.example.com/flight-1'
    },
    {
      id: 'flight-2',
      airline: 'Delta',
      flightNumber: 'DL456',
      departure: {
        airport: 'JFK',
        time: '22:15',
        date: params.departureDate
      },
      arrival: {
        airport: 'CDG',
        time: '12:30+1',
        date: new Date(new Date(params.departureDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      duration: '9h 15m',
      price: params.class === 'economy' ? 580 : params.class === 'business' ? 2200 : 4500,
      stops: 0,
      bookingUrl: 'https://booking.example.com/flight-2'
    }
  ];

  return mockFlights;
};

// Hotel search service
export const searchHotels = async (params: HotelSearchParams) => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const budgetMultiplier = params.budget === 'cheap' ? 0.6 : params.budget === 'luxury' ? 2.5 : 1;
  
  const mockHotels = [
    {
      id: 'hotel-1',
      name: 'Grand Hotel Central',
      rating: 4.5,
      pricePerNight: Math.round(180 * budgetMultiplier),
      totalPrice: Math.round(180 * budgetMultiplier * getDaysDifference(params.checkIn, params.checkOut)),
      imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Free WiFi', 'Spa', 'Restaurant', 'Fitness Center'],
      location: 'City Center',
      distance: '0.5 km from center',
      bookingUrl: 'https://booking.example.com/hotel-1',
      cancellation: 'Free cancellation until 24h before check-in'
    },
    {
      id: 'hotel-2',
      name: 'Boutique Palace',
      rating: 4.8,
      pricePerNight: Math.round(250 * budgetMultiplier),
      totalPrice: Math.round(250 * budgetMultiplier * getDaysDifference(params.checkIn, params.checkOut)),
      imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Concierge', 'Room Service', 'Business Center', 'Parking'],
      location: 'Historic District',
      distance: '1.2 km from center',
      bookingUrl: 'https://booking.example.com/hotel-2',
      cancellation: 'Free cancellation until 48h before check-in'
    }
  ];

  return mockHotels;
};

// Activities search service
export const searchActivities = async (params: ActivitySearchParams) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const budgetMultiplier = params.budget === 'cheap' ? 0.7 : params.budget === 'luxury' ? 1.8 : 1;
  
  const mockActivities = [
    {
      id: 'activity-1',
      name: 'City Walking Tour',
      description: 'Explore the historic city center with a local guide',
      duration: '3 hours',
      price: Math.round(35 * budgetMultiplier),
      category: 'sightseeing',
      rating: 4.6,
      imageUrl: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'City Center',
      bookingUrl: 'https://booking.example.com/activity-1',
      availability: 'Daily at 10:00 AM'
    },
    {
      id: 'activity-2',
      name: 'Food Market Experience',
      description: 'Taste local delicacies and learn about culinary traditions',
      duration: '2.5 hours',
      price: Math.round(55 * budgetMultiplier),
      category: 'food',
      rating: 4.8,
      imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Central Market',
      bookingUrl: 'https://booking.example.com/activity-2',
      availability: 'Tuesday to Sunday at 9:00 AM'
    },
    {
      id: 'activity-3',
      name: 'Museum & Art Gallery Tour',
      description: 'Discover world-class art collections and cultural heritage',
      duration: '4 hours',
      price: Math.round(45 * budgetMultiplier),
      category: 'culture',
      rating: 4.4,
      imageUrl: 'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Museum District',
      bookingUrl: 'https://booking.example.com/activity-3',
      availability: 'Daily except Monday'
    }
  ];

  return mockActivities;
};

// Currency conversion service
export const convertCurrency = async (amount: number, from: string, to: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock exchange rates
  const exchangeRates: Record<string, number> = {
    'USD-EUR': 0.85,
    'USD-GBP': 0.73,
    'USD-JPY': 110,
    'EUR-USD': 1.18,
    'EUR-GBP': 0.86,
    'GBP-USD': 1.37,
    'GBP-EUR': 1.16
  };
  
  const rate = exchangeRates[`${from}-${to}`] || 1;
  return {
    originalAmount: amount,
    convertedAmount: Math.round(amount * rate * 100) / 100,
    rate,
    fromCurrency: from,
    toCurrency: to
  };
};

// Weather service
export const getWeatherForecast = async (destination: string, dates: string[]) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const mockWeather = dates.map((date, index) => ({
    date,
    temperature: {
      high: 22 + Math.random() * 8,
      low: 15 + Math.random() * 5
    },
    condition: ['sunny', 'partly-cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)],
    humidity: 45 + Math.random() * 30,
    windSpeed: 5 + Math.random() * 15
  }));
  
  return mockWeather;
};

// Helper function
function getDaysDifference(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}