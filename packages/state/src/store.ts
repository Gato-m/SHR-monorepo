import { store } from 'legend-state';

export const appState = store({
  user: null as null | {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
  },
  absences: [] as Array<{
    id: string;
    user_id: string;
    date: string;
    reason: string | null;
    created_at: string;
  }>,
  sync: {
    loading: false,
    lastSync: null as null | number,
  },
});
