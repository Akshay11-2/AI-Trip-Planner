import React from 'react';
import { DollarSign, Plane, Building, MapPin } from 'lucide-react';
import { TripItinerary } from '../types';

interface CostSummaryProps {
  itinerary: TripItinerary;
}

export default function CostSummary({ itinerary }: CostSummaryProps) {
  const activitiesTotal = itinerary.days.reduce((sum, day) => sum + day.totalCost, 0);
  const accommodationTotal = itinerary.accommodation.totalPrice;
  const transportTotal = itinerary.transport.reduce((sum, t) => sum + t.cost, 0);

  const costBreakdown = [
    { label: 'Activities & Food', amount: activitiesTotal, icon: MapPin, color: 'text-blue-600' },
    { label: 'Accommodation', amount: accommodationTotal, icon: Building, color: 'text-purple-600' },
    { label: 'Transport', amount: transportTotal, icon: Plane, color: 'text-green-600' }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
          <DollarSign className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Trip Cost Summary</h2>
          <p className="text-gray-600">{itinerary.duration} days in {itinerary.destination}</p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        {costBreakdown.map((item) => (
          <div key={item.label} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center space-x-3">
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <span className="font-medium text-gray-800">{item.label}</span>
            </div>
            <span className="text-xl font-bold text-gray-800">${item.amount}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800">Total Cost</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            ${itinerary.totalCost}
          </span>
        </div>
        <p className="text-gray-600 mt-2">
          Approximately ${Math.round(itinerary.totalCost / itinerary.duration)} per day
        </p>
      </div>
    </div>
  );
}