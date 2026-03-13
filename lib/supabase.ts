import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company: string | null;
          plan: 'starter' | 'professional' | 'enterprise' | null;
          subscription_status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid' | null;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company?: string | null;
          plan?: 'starter' | 'professional' | 'enterprise' | null;
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid' | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
        Update: {
          id: string;
          full_name?: string | null;
          company?: string | null;
          plan?: 'starter' | 'professional' | 'enterprise' | null;
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid' | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
      };
      keywords: {
        Row: {
          id: string;
          user_id: string;
          keyword: string;
          type: 'company' | 'compound' | 'person' | 'custom';
          active: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          keyword: string;
          type: 'company' | 'compound' | 'person' | 'custom';
          active?: boolean;
        };
        Update: {
          keyword?: string;
          type?: 'company' | 'compound' | 'person' | 'custom';
          active?: boolean;
        };
      };
      alerts: {
        Row: {
          id: string;
          user_id: string;
          source: string;
          title: string;
          description: string;
          severity: 'low' | 'medium' | 'high' | 'critical';
          url?: string | null;
          created_at: string;
          read: boolean;
        };
        Insert: {
          user_id: string;
          source: string;
          title: string;
          description: string;
          severity: 'low' | 'medium' | 'high' | 'critical';
          url?: string | null;
          read?: boolean;
        };
        Update: {
          title?: string;
          description?: string;
          severity?: 'low' | 'medium' | 'high' | 'critical';
          url?: string | null;
          read?: boolean;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
