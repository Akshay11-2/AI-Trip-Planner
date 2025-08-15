import { TripInput, TripItinerary, ItineraryDay } from '../types';
import { mockActivities, mockAccommodations, mockTransport, destinationImages } from './mockData';
import { v4 as uuidv4 } from 'uuid';

export function generateTripItinerary(input: TripInput): TripItinerary {
  const destinationKey = input.destination.toLowerCase();
  const activities = mockActivities[destinationKey] || mockActivities.paris;
  const accommodation = mockAccommodations[destinationKey]?.[input.budget] || mockAccommodations.paris[input.budget];
  const transport = mockTransport[destinationKey] || mockTransport.paris;

  // Generate days based on duration
  const days: ItineraryDay[] = [];
  const startDate = new Date();
  
  for (let i = 0; i < input.duration; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Distribute activities across days
    const dayActivities = activities.slice(i % activities.length, (i % activities.length) + Math.min(3, activities.length));
    if (dayActivities.length === 0) {
      dayActivities.push(activities[0]);
    }
    
    const totalCost = dayActivities.reduce((sum, activity) => sum + activity.cost, 0);
    
    days.push({
      day: i + 1,
      date: currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      activities: dayActivities,
      totalCost
    });
  }

  // Calculate total cost
  const activitiesTotal = days.reduce((sum, day) => sum + day.totalCost, 0);
  const accommodationTotal = accommodation.totalPrice;
  const transportTotal = transport.reduce((sum, t) => sum + t.cost, 0);
  const totalCost = activitiesTotal + accommodationTotal + transportTotal;

  return {
    id: uuidv4(),
    destination: input.destination,
    duration: input.duration,
    budget: input.budget,
    groupType: input.groupType,
    days,
    accommodation,
    transport,
    totalCost,
    createdAt: new Date().toISOString(),
    destinationImage: destinationImages[destinationKey] || destinationImages.default
  };
}

export function saveTrip(name: string, itinerary: TripItinerary): void {
  const savedTrips = getSavedTrips();
  const newTrip = {
    id: uuidv4(),
    name,
    destination: itinerary.destination,
    createdAt: new Date().toISOString(),
    itinerary
  };
  
  savedTrips.push(newTrip);
  localStorage.setItem('masterplan_trips', JSON.stringify(savedTrips));
}

export function updateTrip(tripId: string, updatedItinerary: TripItinerary): void {
  const savedTrips = getSavedTrips();
  const tripIndex = savedTrips.findIndex((trip: any) => trip.id === tripId);
  
  if (tripIndex !== -1) {
    savedTrips[tripIndex].itinerary = updatedItinerary;
    savedTrips[tripIndex].updatedAt = new Date().toISOString();
    localStorage.setItem('masterplan_trips', JSON.stringify(savedTrips));
  }
}

export function getSavedTrips() {
  const stored = localStorage.getItem('masterplan_trips');
  return stored ? JSON.parse(stored) : [];
}

export function deleteTrip(tripId: string): void {
  const savedTrips = getSavedTrips();
  const filtered = savedTrips.filter((trip: any) => trip.id !== tripId);
  localStorage.setItem('masterplan_trips', JSON.stringify(filtered));
}