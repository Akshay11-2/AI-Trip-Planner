import React, { useState } from 'react';
import Header from './components/Header';
import TripPlannerForm from './components/TripPlannerForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import InteractiveItinerary from './components/InteractiveItinerary';
import SavedTrips from './components/SavedTrips';
import { TripInput, TripItinerary, SavedTrip } from './types';
import { generateTripItinerary, saveTrip, updateTrip } from './utils/tripGenerator';

type ViewType = 'planner' | 'saved' | 'profile' | 'itinerary' | 'interactive';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('planner');
  const [currentItinerary, setCurrentItinerary] = useState<TripItinerary | null>(null);
  const [currentTripInput, setCurrentTripInput] = useState<TripInput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePlanTrip = async (input: TripInput) => {
    setIsGenerating(true);
    setCurrentTripInput(input);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const itinerary = generateTripItinerary(input);
    setCurrentItinerary(itinerary);
    setCurrentView('interactive'); // Start with interactive view for Phase 2
    setIsGenerating(false);
  };

  const handleBackToPlanner = () => {
    setCurrentView('planner');
    setCurrentItinerary(null);
    setCurrentTripInput(null);
  };

  const handleViewSavedTrip = (savedTrip: SavedTrip) => {
    setCurrentItinerary(savedTrip.itinerary);
    // Reconstruct trip input from saved data
    setCurrentTripInput({
      destination: savedTrip.itinerary.destination,
      duration: savedTrip.itinerary.duration,
      budget: savedTrip.itinerary.budget as any,
      groupType: savedTrip.itinerary.groupType as any
    });
    setCurrentView('itinerary');
  };

  const handleSaveItinerary = (itinerary: TripItinerary) => {
    const tripName = `${itinerary.destination} ${new Date().getFullYear()}`;
    saveTrip(tripName, itinerary);
    // Show success message or redirect
    alert('Trip saved successfully!');
  };

  const handleViewChange = (view: 'planner' | 'saved' | 'profile') => {
    setCurrentView(view);
    if (view === 'planner') {
      setCurrentItinerary(null);
      setCurrentTripInput(null);
    }
  };

  if (currentView === 'interactive' && currentItinerary && currentTripInput) {
    return (
      <div>
        <InteractiveItinerary
          tripInput={currentTripInput}
          initialItinerary={currentItinerary}
          onBack={handleBackToPlanner}
          onSave={handleSaveItinerary}
        />
      </div>
    );
  }

  if (currentView === 'itinerary' && currentItinerary) {
    return (
      <div>
        <Header currentView="planner" onViewChange={handleViewChange} />
        <ItineraryDisplay
          itinerary={currentItinerary}
          onBack={handleBackToPlanner}
        />
      </div>
    );
  }

  if (currentView === 'saved') {
    return (
      <div>
        <Header currentView="saved" onViewChange={handleViewChange} />
        <SavedTrips onViewTrip={handleViewSavedTrip} />
      </div>
    );
  }

  if (currentView === 'profile') {
    return (
      <div>
        <Header currentView="profile" onViewChange={handleViewChange} />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile Coming Soon</h2>
            <p className="text-gray-600 text-lg">
              User profiles and preferences will be available in the next update!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header currentView="planner" onViewChange={handleViewChange} />
      <TripPlannerForm onSubmit={handlePlanTrip} isLoading={isGenerating} />
    </div>
  );
}

export default App;