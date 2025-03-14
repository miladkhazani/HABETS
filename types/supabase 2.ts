export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          streak_count: number
          total_challenges: number
          wins_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          streak_count?: number
          total_challenges?: number
          wins_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          streak_count?: number
          total_challenges?: number
          wins_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      challenges: {
        Row: {
          id: string
          creator_id: string
          title: string
          description: string | null
          challenge_type: string
          target_value: number | null
          target_unit: string | null
          duration_days: number
          start_date: string | null
          end_date: string | null
          pot_amount: number
          is_public: boolean
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          title: string
          description?: string | null
          challenge_type: string
          target_value?: number | null
          target_unit?: string | null
          duration_days: number
          start_date?: string | null
          end_date?: string | null
          pot_amount?: number
          is_public?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          title?: string
          description?: string | null
          challenge_type?: string
          target_value?: number | null
          target_unit?: string | null
          duration_days?: number
          start_date?: string | null
          end_date?: string | null
          pot_amount?: number
          is_public?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      challenge_participants: {
        Row: {
          id: string
          challenge_id: string
          user_id: string
          contribution_amount: number
          total_progress: number
          completed_days: number
          streak_days: number
          status: string
          joined_at: string
        }
        Insert: {
          id?: string
          challenge_id: string
          user_id: string
          contribution_amount?: number
          total_progress?: number
          completed_days?: number
          streak_days?: number
          status?: string
          joined_at?: string
        }
        Update: {
          id?: string
          challenge_id?: string
          user_id?: string
          contribution_amount?: number
          total_progress?: number
          completed_days?: number
          streak_days?: number
          status?: string
          joined_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          challenge_id: string
          activity_type: string
          value: number
          unit: string
          logged_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          challenge_id: string
          activity_type: string
          value: number
          unit: string
          logged_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          challenge_id?: string
          activity_type?: string
          value?: number
          unit?: string
          logged_date?: string
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          requirement_type: string
          requirement_value: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon: string
          requirement_type: string
          requirement_value: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string
          requirement_type?: string
          requirement_value?: number
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          progress: number
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          progress?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          progress?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}