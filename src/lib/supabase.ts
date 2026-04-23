import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log("Supabase URL loaded:", supabaseUrl ? "Yes" : "No");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
