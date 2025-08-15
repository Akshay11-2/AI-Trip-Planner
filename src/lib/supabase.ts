import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          preferences: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          preferences?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          preferences?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      trips: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          destination: string;
          itinerary: any;
          is_public: boolean;
          shared_with: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          destination: string;
          itinerary: any;
          is_public?: boolean;
          shared_with?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          destination?: string;
          itinerary?: any;
          is_public?: boolean;
          shared_with?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      trip_shares: {
        Row: {
          id: string;
          trip_id: string;
          shared_by: string;
          shared_with: string;
          permission: 'view' | 'edit';
          created_at: string;
        };
        Insert: {
          id?: string;
          trip_id: string;
          shared_by: string;
          shared_with: string;
          permission: 'view' | 'edit';
          created_at?: string;
        };
        Update: {
          id?: string;
          trip_id?: string;
          shared_by?: string;
          shared_with?: string;
          permission?: 'view' | 'edit';
          created_at?: string;
        };
      };
    };
  };
};