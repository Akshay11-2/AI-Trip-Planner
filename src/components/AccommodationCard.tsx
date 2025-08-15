import React from 'react';
import { MapPin, Star, Wifi, Coffee, Car, Dumbbell, ExternalLink } from 'lucide-react';
import { Accommodation } from '../types';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export default function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const amenityIcons = {
    'Free WiFi': Wifi,
    'Continental Breakfast': Coffee,
    'Parking': Car,
    'Fitness Center': Dumbbell,
    'Spa': Star,
    'Business Center': Coffee,
    'Room Service': Coffee,
    'Concierge': Star,
    'Fine Dining': Coffee,
    'Butler Service': Star,
    'Champagne Bar': Coffee,
    'Michelin Star Restaurant': Star,
    'Personal Butler': Star,
    'Helicopter Transfers': Car,
    '24/7 Reception': Coffee,
    'Shared Bath': Coffee,
    'Lockers': Coffee,
    'Restaurant': Coffee
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={accommodation.imageUrl}
          alt={accommodation.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-bold text-gray-800">{accommodation.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl">
          <span className="text-sm font-medium">{accommodation.type}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{accommodation.name}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{accommodation.location}</span>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Amenities</h4>
          <div className="grid grid-cols-2 gap-2">
            {accommodation.amenities.map((amenity) => {
              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Star;
              return (
                <div key={amenity} className="flex items-center space-x-2 text-sm text-gray-600">
                  <IconComponent className="h-4 w-4 text-blue-500" />
                  <span>{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Per night</p>
              <p className="text-2xl font-bold text-gray-800">${accommodation.pricePerNight}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${accommodation.totalPrice}
              </p>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
            <span>Book Now</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}