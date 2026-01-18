import { supabase } from './supabase';
import { appState } from '@state/store';

export async function syncAbsences() {
  appState.sync.loading.set(true);

  const { data, error } = await supabase
    .from('absence')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    appState.sync.loading.set(false);
    throw error;
  }

  appState.absences.set(data ?? []);
  appState.sync.loading.set(false);
  appState.sync.lastSync.set(Date.now());
}

export async function addAbsence(date: string, reason?: string) {
  const user = appState.user.get();
  if (!user) throw new Error('Not logged in');

  const { data, error } = await supabase
    .from('absence')
    .insert({
      user_id: user.id,
      date,
      reason: reason ?? null,
    })
    .select()
    .single();

  if (error) throw error;

  appState.absences.set([data, ...appState.absences.get()]);
}
