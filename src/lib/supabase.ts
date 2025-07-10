import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string
          current_country: string
          status: 'in_india' | 'abroad'
          destination_country?: string
          current_university?: string
          course_field: string
          bio: string
          profile_image?: string
          created_at: string
          updated_at: string
          profile_completed: boolean
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          email: string
          current_country: string
          status: 'in_india' | 'abroad'
          destination_country?: string
          current_university?: string
          course_field: string
          bio: string
          profile_image?: string
          created_at?: string
          updated_at?: string
          profile_completed?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          email?: string
          current_country?: string
          status?: 'in_india' | 'abroad'
          destination_country?: string
          current_university?: string
          course_field?: string
          bio?: string
          profile_image?: string
          created_at?: string
          updated_at?: string
          profile_completed?: boolean
        }
      }
      connections: {
        Row: {
          id: string
          requester_id: string
          receiver_id: string
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          requester_id: string
          receiver_id: string
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          requester_id?: string
          receiver_id?: string
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          created_at: string
          read: boolean
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          created_at?: string
          read?: boolean
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          created_at?: string
          read?: boolean
        }
      }
    }
  }
}