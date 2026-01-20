import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useLegend = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  syncUsers: async () => {
    const { setUsers, setLoading, setError } = get();

    setLoading(true);
    setError(null);

    // 1) Initial fetch
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setUsers(data);
    setLoading(false);

    // 2) Real-time subscription
    const channel = supabase
      .channel('users-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
        const { eventType, new: newUser, old: oldUser } = payload;
        const users = get().users;

        if (eventType === 'INSERT') {
          setUsers([...users, newUser]);
        }

        if (eventType === 'UPDATE') {
          setUsers(users.map((u) => (u.id === newUser.id ? newUser : u)));
        }

        if (eventType === 'DELETE') {
          setUsers(users.filter((u) => u.id !== oldUser.id));
        }
      })
      .subscribe();

    // Save channel for cleanup if needed
    set({ channel });
  },

  // Optional: stop subscription
  stopSync: () => {
    const { channel } = get();
    if (channel) supabase.removeChannel(channel);
  },

  reset: () =>
    set({
      users: [],
      loading: false,
      error: null,
    }),
}));
