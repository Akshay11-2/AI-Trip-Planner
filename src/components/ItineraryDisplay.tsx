import React, { useState } from 'react';
import { ArrowLeft, BookmarkPlus, Share2, Download, MapPin, Calendar } from 'lucide-react';
import { TripItinerary } from '../types';
import DayCard from './DayCard';
import AccommodationCard from './AccommodationCard';
import TransportCard from './TransportCard';
import CostSummary from './CostSummary';
import { saveTrip } from '../utils/tripGenerator';

interface ItineraryDisplayProps {
  itinerary: TripItinerary;
  onBack: () => void;
}

export default function ItineraryDisplay({ itinerary, onBack }: ItineraryDisplayProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [tripName, setTripName] = useState('');

  const handleSaveTrip = () => {
    if (tripName.trim()) {
      setIsSaving(true);
      try {
        saveTrip(tripName, itinerary);
        setShowSaveDialog(false);
        setTripName('');
        // Show success message
        setTimeout(() => setIsSaving(false), 1000);
      } catch (error) {
        console.error('Error saving trip:', error);
        setIsSaving(false);
      }
    }
  };

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
        
        <div className="absolute top-6 left-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl font-medium hover:bg-white transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Planner</span>
          </button>
        </div>

        <div className="absolute top-6 right-6 flex space-x-3">
          <button
            onClick={() => setShowSaveDialog(true)}
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl font-medium hover:bg-white transition-all duration-200"
          >
            <BookmarkPlus className="h-4 w-4" />
            <span>Save Trip</span>
          </button>
          <button className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl font-medium hover:bg-white transition-all duration-200">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl font-medium hover:bg-white transition-all duration-200">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
        
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-5xl font-bold mb-4">{itinerary.destination}</h1>
          <div className="flex items-center space-x-6 text-white/90">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span className="text-lg">{itinerary.duration} days</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span className="text-lg capitalize">{itinerary.budget} budget</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Perfect Itinerary</h2>
              <p className="text-gray-600 text-lg">
                We've crafted a personalized {itinerary.duration}-day journey to {itinerary.destination} 
                tailored for {itinerary.groupType} travelers with a {itinerary.budget} budget. 
                Get ready for an unforgettable adventure!
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Where You'll Stay</h2>
            <AccommodationCard accommodation={itinerary.accommodation} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">How You'll Get There</h2>
            <div className="space-y-6">
              {itinerary.transport.map((transport) => (
                <TransportCard key={transport.id} transport={transport} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Trip Modal */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Save Your Trip</h3>
            <p className="text-gray-600 mb-6">Give your trip a memorable name to save it for later.</p>
            
            <input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="Enter trip name (e.g., Paris Adventure 2025)"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 mb-6"
              autoFocus
            />
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTrip}
                disabled={!tripName.trim() || isSaving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSaving ? 'Saving...' : 'Save Trip'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}