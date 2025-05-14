import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn(
    'Supabase URL or Anon Key is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example of how to define types for your tables, which you should customize
export interface Publication {
  id: string; // uuid, Primary Key
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
  title_en: string;
  title_ar: string;
  category_en?: string;
  category_ar?: string;
  date: string; // YYYY-MM-DD
  link_en?: string; // URL to PDF or external link
  link_ar?: string;
  summary_en?: string;
  summary_ar?: string;
  image_url?: string; // URL to image
  status?: 'Published' | 'Draft' | 'Archived';
  is_trending?: boolean;
  is_featured?: boolean;
  author_en?: string;
  author_ar?: string;
  tags?: string[];
  full_content_en?: string;
  full_content_ar?: string;
}

export interface Poll {
  id: string; // uuid, Primary Key
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
  title_en: string;
  title_ar: string;
  date: string; // YYYY-MM-DD
  link_en?: string;
  link_ar?: string;
  summary_en?: string;
  summary_ar?: string;
  image_url?: string;
  status?: 'Published' | 'Draft' | 'Archived';
  is_trending?: boolean;
  is_featured?: boolean;
  sample_size?: number;
  methodology_en?: string;
  methodology_ar?: string;
}

// You can add more interfaces for other tables as needed
