import { supabase } from './supabase';
import { appState } from '@state/store';

export async function loadUserProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    appState.user.set(null);
    return null;
  }

  const { data, error } = await supabase.from('users').select('*').eq('id', user.id).single();

  if (error) throw error;

  appState.user.set(data);
  return data;
}
