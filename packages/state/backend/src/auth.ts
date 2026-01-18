import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  const { data: allowed } = await supabase
    .from('allowed_emails')
    .select('*')
    .eq('email', email)
    .single();

  if (!allowed) throw new Error('Email not allowed');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data.user;
}
