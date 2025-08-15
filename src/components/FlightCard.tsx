import React from 'react';
import { Plane, Clock, ExternalLink, Users } from 'lucide-react';

interface FlightCardProps {
  flight: any;
  onSelect?: (flight: any) => void;
  isSelected?: boolean;
}

export default function FlightCard({ flight, onSelect, isSelected }: FlightCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-sky-500 p-2 rounded-xl">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{flight.airline}</h3>
              <p className="text-sm text-gray-600">{flight.flightNumber}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">${flight.price}</p>
            <p className="text-sm text-gray-600">per person</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Departure</p>
            <p className="font-bold text-gray-800">{flight.departure.time}</p>
            <p className="text-xs text-gray-500">{flight.departure.airport}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{flight.duration}</span>
            </div>
            <div className="w-full h-px bg-gray-300 my-2 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white px-2">
                  <Plane className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Arrival</p>
            <p className="font-bold text-gray-800">{flight.arrival.time}</p>
            <p className="text-xs text-gray-500">{flight.arrival.airport}</p>
          </div>
        </div>

        <div className="flex space-x-3">
          {onSelect && (
            <button
              onClick={() => onSelect(flight)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isSelected ? 'Selected' : 'Select Flight'}
            </button>
          )}
          <a
            href={flight.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <span>Book Now</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}