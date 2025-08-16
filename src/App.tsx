import React, { useState } from 'react';
import Header from './components/Header';
import TripPlannerForm from './components/TripPlannerForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import InteractiveItinerary from './components/InteractiveItinerary';
import SavedTrips from './components/SavedTrips';
import { TripInput, TripItinerary, SavedTrip } from './types';
import { generateTripItinerary } from './utils/tripGenerator';

type ViewType = 'planner' | 'saved' | 'itinerary' | 'interactive';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('planner');
  const [currentItinerary, setCurrentItinerary] = useState<TripItinerary | null>(null);
  const [currentTripInput, setCurrentTripInput] = useState<TripInput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
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
    
    try {
      // Save to localStorage
      const savedTrips = JSON.parse(localStorage.getItem('masterplan_trips') || '[]');
      const newTrip = {
        id: Date.now().toString(),
        name: tripName,
        destination: itinerary.destination,
        createdAt: new Date().toISOString(),
        itinerary
      };
      
      savedTrips.push(newTrip);
      localStorage.setItem('masterplan_trips', JSON.stringify(savedTrips));
      alert('Trip saved successfully!');
    } catch (error) {
      console.error('Error saving trip:', error);
      alert('Failed to save trip. Please try again.');
    }
  };

  const handleViewChange = (view: 'planner' | 'saved') => {
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
        <Header 
          currentView="planner" 
          onViewChange={handleViewChange}
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
          language={language}
          currency={currency}
          onLanguageChange={setLanguage}
          onCurrencyChange={setCurrency}
        />
        <SavedTrips onViewTrip={handleViewSavedTrip} />
      </div>
    );
  }

  return (
    <div>
      <Header 
        currentView="planner" 
        onViewChange={handleViewChange}
        language={language}
        currency={currency}
        onLanguageChange={setLanguage}
        onCurrencyChange={setCurrency}
      />
      <TripPlannerForm onSubmit={handlePlanTrip} isLoading={isGenerating} />
    </div>
  );
}

export default App;