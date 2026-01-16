import { ElectricDatabase, electrify } from '@electric-sql/react-native';
import { makeElectricContext } from '@electric-sql/react';
import { createClient } from '@supabase/supabase-js';
import * as SQLite from 'expo-sqlite';

// 1. Supabase klienta inicializācija
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

// 2. SQLite lokālā DB
const sqlite = SQLite.openDatabase('local.db');

// 3. ElectricSQL konteksts React komponentiem
export const { ElectricProvider, useElectric } = makeElectricContext<ElectricDatabase>();

// 4. ElectricSQL inicializācija
export async function initElectric() {
  const electric = await electrify(sqlite, {
    url: process.env.EXPO_PUBLIC_ELECTRIC_URL!, // Electric sync service URL
    auth: {
      token: async () => {
        const session = await supabase.auth.getSession();
        return session.data.session?.access_token ?? '';
      },
    },
  });

  return electric;
}
