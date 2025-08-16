import { TripInput, TripItinerary, ItineraryDay } from '../types';
import { mockActivities, mockAccommodations, mockTransport, destinationImages } from './mockData';
import { generateAITripItinerary } from '../services/openaiService';

export async function generateTripItinerary(input: TripInput): Promise<TripItinerary> {
  // Try to use AI generation first
  if (import.meta.env.VITE_OPENAI_API_KEY) {
    try {
      return await generateAITripItinerary(input);
    } catch (error) {
      console.warn('AI generation failed, falling back to mock data:', error);
    }
  }
  
  // Fallback to mock data generation
  return generateMockItinerary(input);
}

function generateMockItinerary(input: TripInput): TripItinerary {
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
    id: Date.now().toString(),
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
