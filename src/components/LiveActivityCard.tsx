import React from 'react';
import { Clock, MapPin, Star, ExternalLink, Plus, Check } from 'lucide-react';

interface LiveActivityCardProps {
  activity: any;
  onAdd?: (activity: any) => void;
  isAdded?: boolean;
}

export default function LiveActivityCard({ activity, onAdd, isAdded }: LiveActivityCardProps) {
  const categoryColors = {
    sightseeing: 'bg-blue-50 text-blue-600',
    food: 'bg-orange-50 text-orange-600',
    activity: 'bg-green-50 text-green-600',
    shopping: 'bg-purple-50 text-purple-600',
    culture: 'bg-indigo-50 text-indigo-600'
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
      isAdded ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-gray-200'
    }`}>
      <div className="relative">
        <img
          src={activity.imageUrl}
          alt={activity.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[activity.category] || categoryColors.activity}`}>
            {activity.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-bold text-gray-800">{activity.rating}</span>
        </div>
        {isAdded && (
          <div className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{activity.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{activity.location}</span>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">Available:</span> {activity.availability}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-gray-800">
            ${activity.price}
          </div>
          <div className="text-sm text-gray-600">
            per person
          </div>
        </div>
        
        <div className="flex space-x-3">
          {onAdd && (
            <button
              onClick={() => onAdd(activity)}
              disabled={isAdded}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                isAdded
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Add to Trip</span>
                </>
              )}
            </button>
          )}
          <a
            href={activity.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <span>Book</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}