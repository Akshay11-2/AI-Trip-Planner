import React from 'react';
import { Clock, MapPin, DollarSign } from 'lucide-react';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const categoryColors = {
    sightseeing: 'bg-blue-50 text-blue-600',
    food: 'bg-orange-50 text-orange-600',
    activity: 'bg-green-50 text-green-600',
    shopping: 'bg-purple-50 text-purple-600',
    culture: 'bg-indigo-50 text-indigo-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative h-48">
        <img
          src={activity.imageUrl}
          alt={activity.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[activity.category]}`}>
            {activity.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="font-bold text-gray-800">{activity.time}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{activity.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{activity.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm font-semibold text-green-600">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>{activity.cost === 0 ? 'Free' : `$${activity.cost}`}</span>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}