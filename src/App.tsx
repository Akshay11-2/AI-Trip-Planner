import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import TripPlannerForm from './components/TripPlannerForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import InteractiveItinerary from './components/InteractiveItinerary';
import SavedTrips from './components/SavedTrips';
import { TripInput, TripItinerary, SavedTrip } from './types';
import { generateTripItinerary } from './utils/tripGenerator';
import { saveTripToSupabase, updateTripInSupabase } from './utils/supabaseTrips';

type ViewType = 'planner' | 'saved' | 'profile' | 'itinerary' | 'interactive';

function App() {
  const { user, loading: authLoading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('planner');
  const [currentItinerary, setCurrentItinerary] = useState<TripItinerary | null>(null);
  const [currentTripInput, setCurrentTripInput] = useState<TripInput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');

  const handlePlanTrip = async (input: TripInput) => {
    setIsGenerating(true);
    setCurrentTripInput(input);
    
    try {
      const itinerary = await generateTripItinerary(input);
      setCurrentItinerary(itinerary);
      setCurrentView('interactive'); // Start with interactive view for Phase 2
    } catch (error) {
      console.error('Error generating trip:', error);
      alert('Failed to generate trip. Please try again.');
    } finally {
      setIsGenerating(false);
    }
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
    
    if (user) {
      saveTripToSupabase(tripName, itinerary)
        .then(() => {
          alert('Trip saved successfully!');
        })
        .catch((error) => {
          console.error('Error saving trip:', error);
          alert('Failed to save trip. Please try again.');
        });
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleViewChange = (view: 'planner' | 'saved' | 'profile') => {
    if ((view === 'saved' || view === 'profile') && !user) {
      setAuthModalOpen(true);
      return;
    }
    
    setCurrentView(view);
    if (view === 'planner') {
      setCurrentItinerary(null);
      setCurrentTripInput(null);
    }
  };

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

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
        <Header 
          currentView="planner" 
          onViewChange={handleViewChange}
          onAuthClick={handleAuthClick}
          language={language}
          currency={currency}
          onLanguageChange={setLanguage}
          onCurrencyChange={setCurrency}
        />
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
        <Header 
          currentView="saved" 
          onViewChange={handleViewChange}
          onAuthClick={handleAuthClick}
          language={language}
          currency={currency}
          onLanguageChange={setLanguage}
          onCurrencyChange={setCurrency}
        />
        <SavedTrips onViewTrip={handleViewSavedTrip} />
      </div>
    );
  }

  if (currentView === 'profile') {
    return (
      <UserProfile onClose={() => setCurrentView('planner')} />
    );
  }

  return (
    <div>
      <Header 
        currentView="planner" 
        onViewChange={handleViewChange}
        onAuthClick={handleAuthClick}
        language={language}
        currency={currency}
        onLanguageChange={setLanguage}
        onCurrencyChange={setCurrency}
      />
      <TripPlannerForm onSubmit={handlePlanTrip} isLoading={isGenerating} />
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}

export default App;