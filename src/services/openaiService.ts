import OpenAI from 'openai';
import { TripInput, TripItinerary, Activity, ItineraryDay } from '../types';
import { destinationImages } from '../utils/mockData';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

interface OpenAITripResponse {
  destination: string;
  duration: number;
  budget: string;
  groupType: string;
  days: {
    day: number;
    date: string;
    activities: {
      name: string;
      description: string;
      time: string;
      duration: string;
      cost: number;
      location: string;
      category: 'sightseeing' | 'food' | 'activity' | 'shopping' | 'culture';
    }[];
  }[];
  accommodation: {
    name: string;
    type: string;
    rating: number;
    pricePerNight: number;
    amenities: string[];
    location: string;
  };
  transport: {
    type: string;
    from: string;
    to: string;
    provider: string;
    cost: number;
    duration: string;
  }[];
  totalCost: number;
}

export async function generateAITripItinerary(input: TripInput): Promise<TripItinerary> {
  try {
    const prompt = createTripPlanningPrompt(input);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner with extensive knowledge of destinations worldwide. Create detailed, realistic, and well-structured trip itineraries based on user preferences. Always respond with valid JSON that matches the expected structure."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const aiResponse: OpenAITripResponse = JSON.parse(response);
    
    // Convert to our TripItinerary format
    return convertToTripItinerary(aiResponse, input);
    
  } catch (error) {
    console.error('Error generating AI trip itinerary:', error);
    // Fallback to mock data if AI fails
    return generateFallbackItinerary(input);
  }
}

function createTripPlanningPrompt(input: TripInput): string {
  const budgetDescriptions = {
    cheap: 'budget-friendly (under $100/day)',
    moderate: 'mid-range ($100-300/day)',
    luxury: 'luxury ($300+/day)'
  };

  const groupDescriptions = {
    solo: 'solo traveler',
    couple: 'romantic couple',
    friends: 'group of friends',
    family: 'family with children'
  };

  return `Create a detailed ${input.duration}-day trip itinerary for ${input.destination} with the following requirements:

- Budget: ${budgetDescriptions[input.budget]}
- Group type: ${groupDescriptions[input.groupType]}
- Duration: ${input.duration} days

Please provide a JSON response with the following structure:
{
  "destination": "${input.destination}",
  "duration": ${input.duration},
  "budget": "${input.budget}",
  "groupType": "${input.groupType}",
  "days": [
    {
      "day": 1,
      "date": "Day 1 - [Date]",
      "activities": [
        {
          "name": "Activity Name",
          "description": "Detailed description",
          "time": "09:00",
          "duration": "2 hours",
          "cost": 25,
          "location": "Specific location",
          "category": "sightseeing" // or "food", "activity", "shopping", "culture"
        }
      ]
    }
  ],
  "accommodation": {
    "name": "Hotel Name",
    "type": "Hotel Type",
    "rating": 4.5,
    "pricePerNight": 150,
    "amenities": ["Free WiFi", "Breakfast", "Gym"],
    "location": "Hotel location"
  },
  "transport": [
    {
      "type": "flight",
      "from": "Origin",
      "to": "${input.destination}",
      "provider": "Airline",
      "cost": 500,
      "duration": "8h 30m"
    }
  ],
  "totalCost": 1500
}

Requirements:
- Include 3-5 activities per day
- Mix different activity categories (sightseeing, food, culture, etc.)
- Provide realistic costs in USD
- Include specific locations and timing
- Consider the group type for activity selection
- Ensure activities are geographically logical
- Include realistic accommodation and transport options
- Calculate accurate total costs

Make the itinerary engaging, practical, and tailored to the specified budget and group type.`;
}

function convertToTripItinerary(aiResponse: OpenAITripResponse, input: TripInput): TripItinerary {
  const destinationKey = input.destination.toLowerCase();
  const destinationImage = destinationImages[destinationKey] || destinationImages.default;

  // Convert days
  const days: ItineraryDay[] = aiResponse.days.map(day => ({
    day: day.day,
    date: day.date,
    activities: day.activities.map(activity => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: activity.name,
      description: activity.description,
      time: activity.time,
      duration: activity.duration,
      cost: activity.cost,
      location: activity.location,
      imageUrl: getActivityImage(activity.category),
      category: activity.category
    })),
    totalCost: day.activities.reduce((sum, activity) => sum + activity.cost, 0)
  }));

  // Convert accommodation
  const accommodation = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: aiResponse.accommodation.name,
    type: aiResponse.accommodation.type,
    rating: aiResponse.accommodation.rating,
    pricePerNight: aiResponse.accommodation.pricePerNight,
    totalPrice: aiResponse.accommodation.pricePerNight * input.duration,
    imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: aiResponse.accommodation.amenities,
    location: aiResponse.accommodation.location,
    bookingUrl: '#'
  };

  // Convert transport
  const transport = aiResponse.transport.map(t => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    type: t.type as any,
    from: t.from,
    to: t.to,
    provider: t.provider,
    cost: t.cost,
    duration: t.duration,
    bookingUrl: '#'
  }));

  return {
    id: Date.now().toString(),
    destination: input.destination,
    duration: input.duration,
    budget: input.budget,
    groupType: input.groupType,
    days,
    accommodation,
    transport,
    totalCost: aiResponse.totalCost,
    createdAt: new Date().toISOString(),
    destinationImage
  };
}

function getActivityImage(category: string): string {
  const categoryImages = {
    sightseeing: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
    food: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    activity: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    shopping: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
    culture: 'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=800'
  };
  
  return categoryImages[category as keyof typeof categoryImages] || categoryImages.sightseeing;
}

function generateFallbackItinerary(input: TripInput): TripItinerary {
  // Import the original mock generator as fallback
  const { generateTripItinerary } = require('../utils/tripGenerator');
  return generateTripItinerary(input);
}

// Enhanced prompt for activity suggestions
export async function generateActivitySuggestions(
  destination: string, 
  budget: string, 
  groupType: string,
  existingActivities: string[] = []
): Promise<Activity[]> {
  try {
    const prompt = `Suggest 6 unique activities for ${destination} that are:
- Suitable for ${groupType} travelers
- ${budget} budget level
- Not including: ${existingActivities.join(', ')}

Return JSON array with this structure:
[
  {
    "name": "Activity Name",
    "description": "Detailed description",
    "duration": "2 hours",
    "cost": 25,
    "location": "Specific location",
    "category": "sightseeing"
  }
]

Categories: sightseeing, food, activity, shopping, culture`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a travel expert. Provide activity suggestions as valid JSON array."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1500
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) return [];

    const suggestions = JSON.parse(response);
    
    return suggestions.map((activity: any) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: activity.name,
      description: activity.description,
      time: '14:00', // Default time
      duration: activity.duration,
      cost: activity.cost,
      location: activity.location,
      imageUrl: getActivityImage(activity.category),
      category: activity.category
    }));

  } catch (error) {
    console.error('Error generating activity suggestions:', error);
    return [];
  }
}