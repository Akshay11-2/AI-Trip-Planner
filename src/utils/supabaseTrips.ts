import { supabase } from '../lib/supabase';
import { TripItinerary, SavedTrip } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const saveTripToSupabase = async (name: string, itinerary: TripItinerary): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to save trips');
  }

  const { data, error } = await supabase
    .from('trips')
    .insert({
      user_id: user.id,
      name,
      destination: itinerary.destination,
      itinerary,
      is_public: false
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data.id;
};

export const getUserTrips = async (): Promise<SavedTrip[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data.map(trip => ({
    id: trip.id,
    name: trip.name,
    destination: trip.destination,
    createdAt: trip.created_at,
    updatedAt: trip.updated_at,
    itinerary: trip.itinerary
  }));
};

export const updateTripInSupabase = async (tripId: string, updatedItinerary: TripItinerary): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to update trips');
  }

  const { error } = await supabase
    .from('trips')
    .update({
      itinerary: updatedItinerary,
      updated_at: new Date().toISOString()
    })
    .eq('id', tripId)
    .eq('user_id', user.id);

  if (error) {
    throw error;
  }
};

export const deleteTripFromSupabase = async (tripId: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to delete trips');
  }

  const { error } = await supabase
    .from('trips')
    .delete()
    .eq('id', tripId)
    .eq('user_id', user.id);

  if (error) {
    throw error;
  }
};

export const getSharedTrips = async (): Promise<SavedTrip[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('trip_shares')
    .select(`
      trips:trip_id (
        id,
        name,
        destination,
        itinerary,
        created_at,
        updated_at,
        profiles:user_id (
          full_name
        )
      )
    `)
    .eq('shared_with', user.id);

  if (error) {
    throw error;
  }

  return data.map(share => ({
    id: share.trips.id,
    name: `${share.trips.name} (shared by ${share.trips.profiles?.full_name || 'Anonymous'})`,
    destination: share.trips.destination,
    createdAt: share.trips.created_at,
    updatedAt: share.trips.updated_at,
    itinerary: share.trips.itinerary
  }));
};