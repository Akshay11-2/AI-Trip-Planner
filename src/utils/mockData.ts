import { Activity, Accommodation, Transport, ItineraryDay } from '../types';

export const destinationImages: Record<string, string> = {
  'paris': 'https://images.pexels.com/photos/161853/paris-landmark-lights-night-161853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'tokyo': 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'new york': 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'london': 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'rome': 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'bali': 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'default': 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
};

export const mockActivities: Record<string, Activity[]> = {
  paris: [
    {
      id: '1',
      name: 'Eiffel Tower Visit',
      description: 'Iconic iron lattice tower and symbol of Paris',
      time: '09:00',
      duration: '2 hours',
      cost: 29,
      location: 'Champ de Mars, 7th arrondissement',
      imageUrl: 'https://images.pexels.com/photos/161853/paris-landmark-lights-night-161853.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'sightseeing'
    },
    {
      id: '2',
      name: 'Louvre Museum',
      description: 'World\'s largest art museum and historic monument',
      time: '14:00',
      duration: '3 hours',
      cost: 17,
      location: 'Rue de Rivoli, 1st arrondissement',
      imageUrl: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'culture'
    },
    {
      id: '3',
      name: 'Seine River Cruise',
      description: 'Romantic cruise along the Seine with city views',
      time: '18:00',
      duration: '1.5 hours',
      cost: 15,
      location: 'Port de la Bourdonnais',
      imageUrl: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'activity'
    }
  ],
  tokyo: [
    {
      id: '4',
      name: 'Senso-ji Temple',
      description: 'Ancient Buddhist temple in historic Asakusa district',
      time: '09:00',
      duration: '2 hours',
      cost: 0,
      location: 'Asakusa, Taito City',
      imageUrl: 'https://images.pexels.com/photos/161251/senso-ji-temple-asakusa-tokyo-japan-161251.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'culture'
    },
    {
      id: '5',
      name: 'Tsukiji Outer Market',
      description: 'Famous fish market with incredible sushi and seafood',
      time: '06:00',
      duration: '3 hours',
      cost: 25,
      location: 'Tsukiji, Chuo City',
      imageUrl: 'https://images.pexels.com/photos/4331491/pexels-photo-4331491.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'food'
    },
    {
      id: '6',
      name: 'Shibuya Crossing',
      description: 'World\'s busiest pedestrian crossing',
      time: '16:00',
      duration: '1 hour',
      cost: 0,
      location: 'Shibuya, Tokyo',
      imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'sightseeing'
    }
  ]
};

export const mockAccommodations: Record<string, Record<string, Accommodation>> = {
  paris: {
    cheap: {
      id: '1',
      name: 'Hotel des Grands Boulevards',
      type: 'Boutique Hotel',
      rating: 4.2,
      pricePerNight: 120,
      totalPrice: 360,
      imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Free WiFi', 'Continental Breakfast', '24/7 Reception'],
      location: '17 Boulevard Poissonnière, 2nd arrondissement',
      bookingUrl: '#'
    },
    moderate: {
      id: '2',
      name: 'Hotel Malte Opera',
      type: 'Luxury Hotel',
      rating: 4.6,
      pricePerNight: 280,
      totalPrice: 840,
      imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Spa', 'Fine Dining', 'Concierge', 'Room Service'],
      location: '63 Rue de Richelieu, 2nd arrondissement',
      bookingUrl: '#'
    },
    luxury: {
      id: '3',
      name: 'The Ritz Paris',
      type: 'Luxury Palace',
      rating: 4.9,
      pricePerNight: 750,
      totalPrice: 2250,
      imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Michelin Star Restaurant', 'Spa', 'Butler Service', 'Champagne Bar'],
      location: '15 Place Vendôme, 1st arrondissement',
      bookingUrl: '#'
    }
  },
  tokyo: {
    cheap: {
      id: '4',
      name: 'Capsule Hotel Anshin Oyado',
      type: 'Capsule Hotel',
      rating: 4.0,
      pricePerNight: 45,
      totalPrice: 135,
      imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Free WiFi', 'Shared Bath', 'Lockers'],
      location: 'Shinjuku, Tokyo',
      bookingUrl: '#'
    },
    moderate: {
      id: '5',
      name: 'Hotel Gracery Shinjuku',
      type: 'Business Hotel',
      rating: 4.4,
      pricePerNight: 150,
      totalPrice: 450,
      imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Restaurant', 'Business Center', 'Fitness Center'],
      location: '1-19-1 Kabukicho, Shinjuku',
      bookingUrl: '#'
    },
    luxury: {
      id: '6',
      name: 'The Peninsula Tokyo',
      type: 'Luxury Hotel',
      rating: 4.8,
      pricePerNight: 600,
      totalPrice: 1800,
      imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Michelin Star Restaurant', 'Spa', 'Personal Butler', 'Helicopter Transfers'],
      location: '1-8-1 Yurakucho, Chiyoda',
      bookingUrl: '#'
    }
  }
};

export const mockTransport: Record<string, Transport[]> = {
  paris: [
    {
      id: '1',
      type: 'flight',
      from: 'JFK',
      to: 'CDG',
      provider: 'Air France',
      cost: 650,
      duration: '8h 30m',
      bookingUrl: '#'
    },
    {
      id: '2',
      type: 'local',
      from: 'CDG Airport',
      to: 'City Center',
      provider: 'RER B Train',
      cost: 12,
      duration: '45m',
      bookingUrl: '#'
    }
  ],
  tokyo: [
    {
      id: '3',
      type: 'flight',
      from: 'LAX',
      to: 'NRT',
      provider: 'Japan Airlines',
      cost: 850,
      duration: '11h 45m',
      bookingUrl: '#'
    },
    {
      id: '4',
      type: 'local',
      from: 'Narita Airport',
      to: 'Shinjuku',
      provider: 'Narita Express',
      cost: 35,
      duration: '1h 15m',
      bookingUrl: '#'
    }
  ]
};