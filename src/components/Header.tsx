import React from 'react';
import { Plane, BookOpen, User, LogIn, Globe } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import LanguageCurrencySelector from './LanguageCurrencySelector';

interface HeaderProps {
  currentView: 'planner' | 'saved' | 'profile';
  onViewChange: (view: 'planner' | 'saved' | 'profile') => void;
  onAuthClick?: () => void;
  language?: string;
  currency?: string;
  onLanguageChange?: (language: string) => void;
  onCurrencyChange?: (currency: string) => void;
}

export default function Header({ 
  currentView, 
  onViewChange, 
  onAuthClick,
  language = 'en',
  currency = 'USD',
  onLanguageChange = () => {},
  onCurrencyChange = () => {}
}: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Masterplan
              </h1>
              <p className="text-xs text-gray-500">AI-Powered Trip Planner</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageCurrencySelector
              language={language}
              currency={currency}
              onLanguageChange={onLanguageChange}
              onCurrencyChange={onCurrencyChange}
            />
            
            <nav className="flex space-x-6">
              <button
                onClick={() => onViewChange('planner')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentView === 'planner'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Plane className="h-4 w-4" />
                <span className="hidden sm:inline">Plan Trip</span>
              </button>
              
              {user && (
                <button
                  onClick={() => onViewChange('saved')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentView === 'saved'
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">My Trips</span>
                </button>
              )}
              
              {user ? (
                <button
                  onClick={() => onViewChange('profile')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentView === 'profile'
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </button>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}