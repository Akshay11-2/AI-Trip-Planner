import React from 'react';
import { MapPin, Calendar, Trash2, Eye, Share2, Globe, Lock } from 'lucide-react';
import { SavedTrip } from '../types';
import { useAuth } from '../hooks/useAuth';
import { getUserTrips, getSharedTrips, deleteTripFromSupabase } from '../utils/supabaseTrips';
import TripShareModal from './TripShareModal';

interface SavedTripsProps {
  onViewTrip: (trip: SavedTrip) => void;
}

export default function SavedTrips({ onViewTrip }: SavedTripsProps) {
  const { user } = useAuth();
  const [savedTrips, setSavedTrips] = React.useState<SavedTrip[]>([]);
  const [sharedTrips, setSharedTrips] = React.useState<SavedTrip[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [shareModalOpen, setShareModalOpen] = React.useState(false);
  const [selectedTrip, setSelectedTrip] = React.useState<any>(null);

  React.useEffect(() => {
    if (user) {
      fetchTrips();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchTrips = async () => {
    try {
      const [userTrips, shared] = await Promise.all([
        getUserTrips(),
        getSharedTrips()
      ]);
      setSavedTrips(userTrips);
      setSharedTrips(shared);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      try {
        await deleteTripFromSupabase(tripId);
        setSavedTrips(prev => prev.filter(trip => trip.id !== tripId));
      } catch (error) {
        console.error('Error deleting trip:', error);
        alert('Failed to delete trip. Please try again.');
      }
    }
  };

  const handleShareTrip = (trip: SavedTrip) => {
    setSelectedTrip(trip);
    setShareModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign In Required</h2>
          <p className="text-gray-600 text-lg">
            Please sign in to view and manage your saved trips.
          </p>
        </div>
      </div>
    );
  }

  if (savedTrips.length === 0 && sharedTrips.length === 0) {
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
        {savedTrips.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Saved Trips</h1>
              <p className="text-xl text-gray-600">Revisit your dream destinations and planned adventures</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewTrip(trip)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-2xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleShareTrip(trip)}
                        className="p-3 border border-blue-200 text-blue-600 rounded-2xl hover:bg-blue-50 transition-all duration-200"
                      >
                        <Share2 className="h-4 w-4" />
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
          </>
        )}

        {sharedTrips.length > 0 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Shared With You</h2>
              <p className="text-lg text-gray-600">Trips that others have shared with you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sharedTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-200"
                >
                  <div className="relative h-48">
                    <img
                      src={trip.itinerary.destinationImage}
                      alt={trip.destination}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Shared
                    </div>
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
                      Shared on {new Date(trip.createdAt).toLocaleDateString()}
                    </p>
                    
                    <button
                      onClick={() => onViewTrip(trip)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-2xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Shared Trip</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedTrip && (
        <TripShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          tripId={selectedTrip.id}
          tripName={selectedTrip.name}
          isPublic={false}
          onUpdateVisibility={() => {}}
        />
      )}
    </div>
  );
}