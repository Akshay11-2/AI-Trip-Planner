import React from 'react';
import { MapPin, Calendar, Trash2, Eye } from 'lucide-react';
import { SavedTrip } from '../types';
import { getSavedTrips, deleteTrip } from '../utils/tripGenerator';

interface SavedTripsProps {
  onViewTrip: (trip: SavedTrip) => void;
}

export default function SavedTrips({ onViewTrip }: SavedTripsProps) {
  const [savedTrips, setSavedTrips] = React.useState<SavedTrip[]>([]);

  React.useEffect(() => {
    setSavedTrips(getSavedTrips());
  }, []);

  const handleDeleteTrip = (tripId: string) => {
    deleteTrip(tripId);
    setSavedTrips(getSavedTrips());
  };

  if (savedTrips.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Saved Trips Yet</h2>
          <p className="text-gray-600 text-lg">
            Start planning your first trip and save it for future reference!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Saved Trips</h1>
          <p className="text-xl text-gray-600">Revisit your dream destinations and planned adventures</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48">
                <img
                  src={trip.itinerary.destinationImage}
                  alt={trip.destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{trip.name}</h3>
                  <p className="text-white/90">{trip.destination}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{trip.itinerary.duration} days</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span className="capitalize">{trip.itinerary.budget}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Created on {new Date(trip.createdAt).toLocaleDateString()}
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => onViewTrip(trip)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-2xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Trip</span>
                  </button>
                  <button
                    onClick={() => handleDeleteTrip(trip.id)}
                    className="p-3 border border-red-200 text-red-600 rounded-2xl hover:bg-red-50 transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}