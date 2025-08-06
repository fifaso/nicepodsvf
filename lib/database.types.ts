export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      podcasts: {
        Row: {
          audio_url: string | null
          created_at: string
          id: number
          is_public: boolean | null
          play_count: number | null
          script: string | null
          status: Database["public"]["Enums"]["podcast_status"] | null
          topic: string
          user_id: string
        }
        Insert: {
          // ... (puedes rellenar esto si lo necesitas)
        }
        Update: {
          // ...
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          full_name: string | null
          avatar_url: string | null
          subscription_level: Database["public"]["Enums"]["subscription_tier"]
          monthly_usage: number
        }
        Insert: {
         // ...
        }
        Update: {
         // ...
        }
      }
      // ... puedes añadir la tabla 'reports' si la necesitas
    }
    Views: {
      user_profiles: { // Nuestra vista
        Row: {
          id: string | null
          email: string | null
          full_name: string | null
          avatar_url: string | null
          subscription_level: Database["public"]["Enums"]["subscription_tier"] | null
          monthly_usage: number | null
        }
      }
    }
    Functions: {
      // ...
    }
    Enums: {
      podcast_status: "pending" | "generating_script" | "generating_audio" | "completed" | "failed"
      subscription_tier: "free" | "thinker" | "scientist"
    }
  }
}