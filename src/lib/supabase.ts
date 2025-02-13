
import { createClient } from '@supabase/supabase-js';

// For Lovable's Supabase integration, we can use a default client
export const supabase = createClient(
  'https://nfoxzzvyjxjqjwapsxvr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mb3h6enZ5anhqcWp3YXBzeHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MjQzMzAsImV4cCI6MjAyMzQwMDMzMH0.dEkn7JP2iFPVJ9zBvHBqGC03XPu5okHiIfAqMg0uMls'
);
