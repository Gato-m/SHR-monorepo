console.log('[supabase.ts] file loaded');
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const extra = Constants?.manifest?.extra || {};
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || extra.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || extra.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log('[supabase] supabaseUrl:', supabaseUrl);
console.log(
  '[supabase] supabaseAnonKey:',
  supabaseAnonKey ? supabaseAnonKey.slice(0, 8) + '...' : undefined
);
console.log('[supabase.ts] before createClient');
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('[supabase.ts] after createClient');
