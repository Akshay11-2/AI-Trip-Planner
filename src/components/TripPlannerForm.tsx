import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Users, Sparkles, ArrowRight } from 'lucide-react';
import { TripInput } from '../types';

interface TripPlannerFormProps {
  onSubmit: (input: TripInput) => void;
  isLoading: boolean;
}

export default function TripPlannerForm({ onSubmit, isLoading }: TripPlannerFormProps) {
  const [input, setInput] = useState<TripInput>({
    destination: '',
    duration: 3,
    budget: 'moderate',
    groupType: 'solo'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.destination.trim()) {
      onSubmit(input);
    }
  };

  const budgetOptions = [
    { value: 'cheap', label: 'Budget', description: 'Affordable options', color: 'from-green-500 to-emerald-500' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced comfort', color: 'from-blue-500 to-cyan-500' },
    { value: 'luxury', label: 'Luxury', description: 'Premium experiences', color: 'from-purple-500 to-pink-500' }
  ];

  const groupTypes = [
    { value: 'solo', label: 'Solo', icon: '🧳', description: 'Just me' },
    { value: 'couple', label: 'Couple', icon: '💕', description: 'Romantic getaway' },
    { value: 'friends', label: 'Friends', icon: '👥', description: 'Group adventure' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Family vacation' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plan Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Journey</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let our AI craft a personalized itinerary tailored to your preferences, budget, and travel style.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 md:p-12">
          {/* Destination Input */}
          <div className="mb-8">
            <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Where would you like to go?
            </label>
            <input
              type="text"
              value={input.destination}
              onChange={(e) => setInput({ ...input, destination: e.target.value })}
              placeholder="Enter destination (e.g., Paris, Tokyo, New York)"
              className="w-full px-6 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-white/70 backdrop-blur-sm"
              required
            />
          </div>

          {/* Duration Input */}
          <div className="mb-8">
            <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              How many days?
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="14"
                value={input.duration}
                onChange={(e) => setInput({ ...input, duration: parseInt(e.target.value) })}
                className="flex-1 h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-lg min-w-[80px] text-center">
                {input.duration} {input.duration === 1 ? 'day' : 'days'}
              </div>
            </div>
          </div>

          {/* Budget Selection */}
          <div className="mb-8">
            <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
              What's your budget style?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setInput({ ...input, budget: option.value as any })}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
                    input.budget === option.value
                      ? 'border-transparent bg-gradient-to-br ' + option.color + ' text-white shadow-lg'
                      : 'border-gray-200 bg-white/70 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-xl font-bold mb-2">{option.label}</div>
                  <div className={`text-sm ${input.budget === option.value ? 'text-white/90' : 'text-gray-600'}`}>
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Group Type Selection */}
          <div className="mb-10">
            <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Who's traveling?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {groupTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setInput({ ...input, groupType: type.value as any })}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 text-center ${
                    input.groupType === type.value
                      ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                      : 'border-gray-200 bg-white/70 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <div className="font-bold text-gray-800 mb-1">{type.label}</div>
                  <div className="text-xs text-gray-600">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!input.destination.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                <span>Crafting Your Perfect Trip...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-6 w-6" />
                <span>Generate My Itinerary</span>
                <ArrowRight className="h-6 w-6" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}