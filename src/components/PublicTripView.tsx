import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Users, DollarSign, Share2, BookmarkPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { TripItinerary } from '../types';
import DayCard from './DayCard';
import AccommodationCard from './AccommodationCard';
import TransportCard from './TransportCard';
import CostSummary from './CostSummary';
import { useAuth } from '../hooks/useAuth';

export default function PublicTripView() {
  const { tripId } = useParams<{ tripId: string }>();
  const { user } = useAuth();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (tripId) {
      fetchTrip();
    }
  }, [tripId, user]);

  const fetchTrip = async () => {
    try {
      // First try to get public trip
      let { data: tripData, error: tripError } = await supabase
        .from('trips')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('id', tripId)
        .eq('is_public', true)
        .single();

      // If not public, check if user has access
      if (tripError && user) {
        const { data: sharedTrip, error: shareError } = await supabase
          .from('trip_shares')
          .select(`
            permission,
            trips:trip_id (
              *,
              profiles:user_id (
                full_name,
                avatar_url
              )
            )
          `)
          .eq('trip_id', tripId)
          .eq('shared_with', user.id)
          .single();

        if (!shareError && sharedTrip) {
          tripData = sharedTrip.trips;
          setCanEdit(sharedTrip.permission === 'edit');
        }
      }

      // Check if user owns the trip
      if (tripError && user) {
        const { data: ownTrip, error: ownError } = await supabase
          .from('trips')
          .select(`
            *,
            profiles:user_id (
              full_name,
              avatar_url
            )
          `)
          .eq('id', tripId)
          .eq('user_id', user.id)
          .single();

        if (!ownError) {
          tripData = ownTrip;
          setCanEdit(true);
        }
      }

      if (!tripData) {
        setError('Trip not found or you don\'t have permission to view it.');
        return;
      }

      setTrip(tripData);
    } catch (err: any) {
      setError('Failed to load trip. Please try again.');
      console.error('Error fetching trip:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToMyTrips = async () => {
    if (!user || !trip) return;

    try {
      const { error } = await supabase
        .from('trips')
        .insert({
          user_id: user.id,
          name: `${trip.name} (Copy)`,
          destination: trip.destination,
          itinerary: trip.itinerary,
          is_public: false
        });

      if (error) throw error;
      alert('Trip saved to your collection!');
    } catch (err) {
      console.error('Error saving trip:', err);
      alert('Failed to save trip. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trip...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  if (!trip) return null;

  const itinerary: TripItinerary = trip.itinerary;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={itinerary.destinationImage}
          alt={itinerary.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute top-6 right-6 flex space-x-3">
          <button className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl font-medium hover:bg-white transition-all duration-200">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
          {user && (
            <button
              onClick={handleSaveToMyTrips}
              className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl font-medium hover:bg-white transition-all duration-200"
            >
              <BookmarkPlus className="h-4 w-4" />
              <span>Save Copy</span>
            </button>
          )}
        </div>
        
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-5xl font-bold mb-4">{trip.name}</h1>
          <div className="flex items-center space-x-6 text-white/90 mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{itinerary.destination}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span className="text-lg">{itinerary.duration} days</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="text-lg capitalize">{itinerary.groupType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-lg capitalize">{itinerary.budget}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {trip.profiles?.avatar_url && (
              <img
                src={trip.profiles.avatar_url}
                alt={trip.profiles.full_name}
                className="w-8 h-8 rounded-full border-2 border-white/50"
              />
            )}
            <span className="text-white/90">
              Created by {trip.profiles?.full_name || 'Anonymous'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Trip Overview</h2>
              <p className="text-gray-600 text-lg">
                Explore this amazing {itinerary.duration}-day journey to {itinerary.destination} 
                designed for {itinerary.groupType} travelers with a {itinerary.budget} budget.
              </p>
            </div>
          </div>
          <div>
            <CostSummary itinerary={itinerary} />
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Daily Itinerary</h2>
          <div className="space-y-8">
            {itinerary.days.map((day) => (
              <DayCard key={day.day} day={day} />
            ))}
          </div>
        </div>

        {/* Accommodation & Transport */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Accommodation</h2>
            <AccommodationCard accommodation={itinerary.accommodation} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Transportation</h2>
            <div className="space-y-6">
              {itinerary.transport.map((transport) => (
                <TransportCard key={transport.id} transport={transport} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}