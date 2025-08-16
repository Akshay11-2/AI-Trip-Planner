# AI-Powered Trip Planner

An intelligent travel planning application that uses OpenAI to generate personalized trip itineraries based on your preferences, budget, and travel style.

## Features

- **AI-Powered Itinerary Generation**: Uses OpenAI GPT-4 to create detailed, personalized trip plans
- **Interactive Trip Customization**: Modify and enhance your itinerary with live data and AI suggestions
- **Real-time Travel Data**: Integration with travel APIs for flights, hotels, and activities
- **User Authentication**: Save and manage your trips with Supabase authentication
- **Trip Sharing**: Share your itineraries with friends and family
- **Multi-language & Currency Support**: Plan trips in your preferred language and currency

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your API keys:
   - `VITE_OPENAI_API_KEY`: Your OpenAI API key
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
4. Run the development server: `npm run dev`

## Environment Variables

- **VITE_OPENAI_API_KEY**: Required for AI-powered trip generation
- **VITE_SUPABASE_URL**: Required for user authentication and trip storage
- **VITE_SUPABASE_ANON_KEY**: Required for Supabase integration

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4 for intelligent trip planning
- **Backend**: Supabase for authentication and data storage
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

1. Enter your destination and travel preferences
2. Let AI generate a personalized itinerary
3. Customize with live travel data and AI suggestions
4. Save and share your perfect trip plan
