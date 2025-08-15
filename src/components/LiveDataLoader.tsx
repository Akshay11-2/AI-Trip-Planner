import React from 'react';
import { Plane, Building, MapPin, Cloud, Loader2 } from 'lucide-react';

interface LiveDataLoaderProps {
  isLoading: boolean;
  progress: number;
}

export default function LiveDataLoader({ isLoading, progress }: LiveDataLoaderProps) {
  if (!isLoading) return null;

  const steps = [
    { icon: Plane, label: 'Searching flights', progress: 25 },
    { icon: Building, label: 'Finding hotels', progress: 50 },
    { icon: MapPin, label: 'Discovering activities', progress: 75 },
    { icon: Cloud, label: 'Checking weather', progress: 100 }
  ];

  const currentStep = steps.find(step => progress <= step.progress) || steps[steps.length - 1];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Finding Live Data</h3>
          <p className="text-gray-600">We're searching for the best travel options for you</p>
        </div>

        <div className="space-y-4 mb-6">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = progress >= step.progress;
            const isCurrent = currentStep === step;

            return (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-green-50' : isCurrent ? 'bg-blue-50' : 'bg-gray-50'
              }`}>
                <div className={`p-2 rounded-lg ${
                  isActive ? 'bg-green-500 text-white' : isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  <StepIcon className="h-4 w-4" />
                </div>
                <span className={`font-medium ${
                  isActive ? 'text-green-700' : isCurrent ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {step.label}
                </span>
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">{progress}% complete</p>
      </div>
    </div>
  );
}