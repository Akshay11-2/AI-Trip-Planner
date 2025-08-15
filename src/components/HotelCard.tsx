import React from 'react';
import { MapPin, Star, Wifi, Coffee, ExternalLink, CheckCircle } from 'lucide-react';

interface HotelCardProps {
  hotel: any;
  onSelect?: (hotel: any) => void;
  isSelected?: boolean;
}

export default function HotelCard({ hotel, onSelect, isSelected }: HotelCardProps) {
  const amenityIcons = {
    'Free WiFi': Wifi,
    'Restaurant': Coffee,
    'Spa': Star,
    'Fitness Center': Star,
    'Concierge': Star,
    'Room Service': Coffee,
    'Business Center': Coffee,
    'Parking': Star
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
      isSelected ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-gray-200'
    }`}>
      <div className="relative">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-bold text-gray-800">{hotel.rating}</span>
        </div>
        {isSelected && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-2 rounded-xl flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">Selected</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{hotel.location} • {hotel.distance}</span>
        </div>
        
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2">
            {hotel.amenities.slice(0, 4).map((amenity: string) => {
              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Star;
              return (
                <div key={amenity} className="flex items-center space-x-2 text-sm text-gray-600">
                  <IconComponent className="h-3 w-3 text-blue-500" />
                  <span>{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Per night</p>
              <p className="text-xl font-bold text-gray-800">${hotel.pricePerNight}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-green-600">${hotel.totalPrice}</p>
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">{hotel.cancellation}</p>
        </div>
        
        <div className="flex space-x-3">
          {onSelect && (
            <button
              onClick={() => onSelect(hotel)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isSelected ? 'Selected' : 'Select Hotel'}
            </button>
          )}
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <span>Book</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}