import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { ItineraryDay } from '../types';
import ActivityCard from './ActivityCard';

interface DayCardProps {
  day: ItineraryDay;
}

export default function DayCard({ day }: DayCardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Day {day.day}</h2>
              <p className="text-blue-100">{day.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-xl">
            <DollarSign className="h-5 w-5" />
            <span className="font-bold">${day.totalCost}</span>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {day.activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}