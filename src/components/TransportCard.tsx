import React from 'react';
import { Plane, Train, Bus, Car, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Transport } from '../types';

interface TransportCardProps {
  transport: Transport;
}

export default function TransportCard({ transport }: TransportCardProps) {
  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'flight': return Plane;
      case 'train': return Train;
      case 'bus': return Bus;
      case 'car': return Car;
      default: return MapPin;
    }
  };

  const getTransportColor = (type: string) => {
    switch (type) {
      case 'flight': return 'from-blue-500 to-sky-500';
      case 'train': return 'from-green-500 to-emerald-500';
      case 'bus': return 'from-yellow-500 to-orange-500';
      case 'car': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const IconComponent = getTransportIcon(transport.type);
  const colorClass = getTransportColor(transport.type);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className={`bg-gradient-to-r ${colorClass} px-6 py-4`}>
        <div className="flex items-center space-x-3 text-white">
          <div className="bg-white/20 p-2 rounded-xl">
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold capitalize">{transport.type}</h3>
            <p className="text-white/90 text-sm">{transport.provider}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{transport.from}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-sm">to</span>
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{transport.to}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{transport.duration}</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">${transport.cost}</p>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
            <span>Book Transport</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}