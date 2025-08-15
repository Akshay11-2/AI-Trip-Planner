import { useState, useEffect } from 'react';
import { searchFlights, searchHotels, searchActivities, getWeatherForecast } from '../services/travelApi';
import { TripInput } from '../types';

export interface LiveDataState {
  flights: any[];
  hotels: any[];
  activities: any[];
  weather: any[];
  isLoading: boolean;
  error: string | null;
}

export const useLiveData = (tripInput: TripInput | null) => {
  const [data, setData] = useState<LiveDataState>({
    flights: [],
    hotels: [],
    activities: [],
    weather: [],
    isLoading: false,
    error: null
  });

  useEffect(() => {
    if (!tripInput) return;

    const fetchLiveData = async () => {
      setData(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const today = new Date();
        const departureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week from now
        const returnDate = new Date(departureDate.getTime() + tripInput.duration * 24 * 60 * 60 * 1000);

        // Fetch all data in parallel
        const [flights, hotels, activities, weather] = await Promise.all([
          searchFlights({
            origin: 'JFK', // Default origin
            destination: tripInput.destination,
            departureDate: departureDate.toISOString().split('T')[0],
            returnDate: returnDate.toISOString().split('T')[0],
            passengers: tripInput.groupType === 'solo' ? 1 : tripInput.groupType === 'couple' ? 2 : 4,
            class: tripInput.budget === 'luxury' ? 'business' : 'economy'
          }),
          searchHotels({
            destination: tripInput.destination,
            checkIn: departureDate.toISOString().split('T')[0],
            checkOut: returnDate.toISOString().split('T')[0],
            guests: tripInput.groupType === 'solo' ? 1 : tripInput.groupType === 'couple' ? 2 : 4,
            rooms: 1,
            budget: tripInput.budget
          }),
          searchActivities({
            destination: tripInput.destination,
            budget: tripInput.budget,
            groupType: tripInput.groupType
          }),
          getWeatherForecast(
            tripInput.destination,
            Array.from({ length: tripInput.duration }, (_, i) => 
              new Date(departureDate.getTime() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            )
          )
        ]);

        setData({
          flights,
          hotels,
          activities,
          weather,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to fetch live travel data. Please try again.'
        }));
      }
    };

    fetchLiveData();
  }, [tripInput]);

  return data;
};