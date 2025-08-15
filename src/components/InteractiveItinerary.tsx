import React, { useState } from 'react';
import { ArrowLeft, Settings, RefreshCw, Save } from 'lucide-react';
import { TripInput, TripItinerary } from '../types';
import { useLiveData } from '../hooks/useLiveData';
import LiveDataLoader from './LiveDataLoader';
import FlightCard from './FlightCard';
import HotelCard from './HotelCard';
import LiveActivityCard from './LiveActivityCard';
import WeatherWidget from './WeatherWidget';
import CostSummary from './CostSummary';

interface InteractiveItineraryProps {
  tripInput: TripInput;
  initialItinerary: TripItinerary;
  onBack: () => void;
  onSave: (itinerary: TripItinerary) => void;
}

export default function InteractiveItinerary({ 
  tripInput, 
  initialItinerary, 
  onBack, 
  onSave 
}: InteractiveItineraryProps) {
  const [currentItinerary, setCurrentItinerary] = useState(initialItinerary);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [addedActivities, setAddedActivities] = useState<any[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const liveData = useLiveData(tripInput);

  // Simulate loading progress
  React.useEffect(() => {
    if (liveData.isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100);
    }
  }, [liveData.isLoading]);

  const handleFlightSelect = (flight: any) => {
    setSelectedFlight(flight);
    // Update itinerary with new flight data
    const updatedTransport = [...currentItinerary.transport];
    updatedTransport[0] = {
      id: flight.id,
      type: 'flight',
      from: flight.departure.airport,
      to: flight.arrival.airport,
      provider: flight.airline,
      cost: flight.price,
      duration: flight.duration,
      bookingUrl: flight.bookingUrl
    };
    
    setCurrentItinerary(prev => ({
      ...prev,
      transport: updatedTransport,
      totalCost: prev.totalCost - prev.transport[0].cost + flight.price
    }));
  };

  const handleHotelSelect = (hotel: any) => {
    setSelectedHotel(hotel);
    // Update itinerary with new hotel data
    const updatedAccommodation = {
      id: hotel.id,
      name: hotel.name,
      type: 'Hotel',
      rating: hotel.rating,
      pricePerNight: hotel.pricePerNight,
      totalPrice: hotel.totalPrice,
      imageUrl: hotel.imageUrl,
      amenities: hotel.amenities,
      location: hotel.location,
      bookingUrl: hotel.bookingUrl
    };
    
    setCurrentItinerary(prev => ({
      ...prev,
      accommodation: updatedAccommodation,
      totalCost: prev.totalCost - prev.accommodation.totalPrice + hotel.totalPrice
    }));
  };

  const handleActivityAdd = (activity: any) => {
    if (addedActivities.find(a => a.id === activity.id)) return;
    
    setAddedActivities(prev => [...prev, activity]);
    
    // Add to first available day
    const updatedDays = [...currentItinerary.days];
    if (updatedDays.length > 0) {
      const newActivity = {
        id: activity.id,
        name: activity.name,
        description: activity.description,
        time: '14:00', // Default time
        duration: activity.duration,
        cost: activity.price,
        location: activity.location,
        imageUrl: activity.imageUrl,
        category: activity.category as any
      };
      
      updatedDays[0].activities.push(newActivity);
      updatedDays[0].totalCost += activity.price;
      
      setCurrentItinerary(prev => ({
        ...prev,
        days: updatedDays,
        totalCost: prev.totalCost + activity.price
      }));
    }
  };

  const handleSaveItinerary = () => {
    onSave(currentItinerary);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <LiveDataLoader isLoading={liveData.isLoading} progress={loadingProgress} />
      
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Planner</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh Data</span>
              </button>
              <button 
                onClick={handleSaveItinerary}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Save className="h-4 w-4" />
                <span>Save Trip</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Overview */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Customize Your Trip to {tripInput.destination}
          </h1>
          <p className="text-xl text-gray-600">
            Select from live options to create your perfect {tripInput.duration}-day journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weather Widget */}
            {liveData.weather.length > 0 && (
              <WeatherWidget weather={liveData.weather} />
            )}

            {/* Flight Selection */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Flight</h2>
              {liveData.flights.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {liveData.flights.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      onSelect={handleFlightSelect}
                      isSelected={selectedFlight?.id === flight.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Loading flight options...
                </div>
              )}
            </div>

            {/* Hotel Selection */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Hotel</h2>
              {liveData.hotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {liveData.hotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onSelect={handleHotelSelect}
                      isSelected={selectedHotel?.id === hotel.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Loading hotel options...
                </div>
              )}
            </div>

            {/* Activities Selection */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Activities</h2>
              {liveData.activities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {liveData.activities.map((activity) => (
                    <LiveActivityCard
                      key={activity.id}
                      activity={activity}
                      onAdd={handleActivityAdd}
                      isAdded={addedActivities.some(a => a.id === activity.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Loading activity options...
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CostSummary itinerary={currentItinerary} />
            
            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Trip Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{tripInput.duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget Style</span>
                  <span className="font-medium capitalize">{tripInput.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Group Type</span>
                  <span className="font-medium capitalize">{tripInput.groupType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activities Added</span>
                  <span className="font-medium">{addedActivities.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}