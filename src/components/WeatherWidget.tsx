import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

interface WeatherWidgetProps {
  weather: any[];
}

export default function WeatherWidget({ weather }: WeatherWidgetProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return Sun;
      case 'partly-cloudy': return Cloud;
      case 'cloudy': return Cloud;
      case 'rainy': return CloudRain;
      case 'snowy': return CloudSnow;
      default: return Sun;
    }
  };

  const getWeatherColor = (condition: string) => {
    switch (condition) {
      case 'sunny': return 'text-yellow-500';
      case 'partly-cloudy': return 'text-gray-500';
      case 'cloudy': return 'text-gray-600';
      case 'rainy': return 'text-blue-500';
      case 'snowy': return 'text-blue-300';
      default: return 'text-yellow-500';
    }
  };

  if (!weather.length) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <Cloud className="h-5 w-5 text-blue-600" />
        <span>Weather Forecast</span>
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {weather.slice(0, 4).map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.condition);
          const iconColor = getWeatherColor(day.condition);
          
          return (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
              <WeatherIcon className={`h-8 w-8 mx-auto mb-2 ${iconColor}`} />
              <div className="space-y-1">
                <p className="text-lg font-bold text-gray-800">
                  {Math.round(day.temperature.high)}°
                </p>
                <p className="text-sm text-gray-600">
                  {Math.round(day.temperature.low)}°
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {day.condition.replace('-', ' ')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}