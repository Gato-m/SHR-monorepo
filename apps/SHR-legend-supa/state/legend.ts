import { create } from 'zustand';
import { supabase } from '../lib/supabase';

type LegendState = {
  users: any[];
  loading: boolean;
  error: string | null;

  channel: ReturnType<typeof supabase.channel> | null;
  isSyncing: boolean;
  retryCount: number;
  maxRetries: number;
  heartbeatMs: number;
  heartbeatAt: number | null;
  heartbeatTimer: any;
  reconnectTimer: any;

  setUsers: (users: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  syncUsers: () => Promise<void>;
  stopSync: () => void;
  reset: () => void;
};

export const useLegend = create<LegendState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  channel: null,
  isSyncing: false,
  retryCount: 0,
  maxRetries: 5,
  heartbeatMs: 30_000,
  heartbeatAt: null,
  heartbeatTimer: null,
  reconnectTimer: null,

  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Core: self-healing sync
  syncUsers: async () => {
    const state = get();
    if (state.isSyncing) {
      console.log('[legend] syncUsers: already syncing, skip');
      return;
    }

    console.log('[legend] syncUsers CALLED');
    set({ isSyncing: true, error: null });

    const { setUsers, setLoading, setError } = get();

    try {
      setLoading(true);

      // 1) Initial fetch
      const { data, error } = await supabase.from('users').select('*');

      if (error) {
        console.log('[legend] initial fetch error', error);
        setError(error.message);
        setLoading(false);
        set({ isSyncing: false });
        return;
      }

      setUsers(data || []);
      setLoading(false);

      // 2) Clean previous channel / timers if any
      const { channel, heartbeatTimer, reconnectTimer } = get();
      if (channel) {
        console.log('[legend] removing previous channel');
        supabase.removeChannel(channel);
      }
      if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
      }
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }

      // 3) Create new realtime channel
      const newChannel = supabase
        .channel('users-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
          console.log('[legend] REALTIME EVENT', payload);

          const { eventType, new: newUser, old: oldUser } = payload as any;
          const users = get().users;
          const { setUsers } = get();

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
        .subscribe((status) => {
          console.log('[legend] channel status:', status);

          if (status === 'SUBSCRIBED') {
            // Reset retry counter on successful subscribe
            set({ retryCount: 0 });

            // Start heartbeat
            const { heartbeatMs } = get();
            const timer = setInterval(() => {
              const now = Date.now();
              set({ heartbeatAt: now });
              console.log('[legend] heartbeat', new Date(now).toISOString());
            }, heartbeatMs);

            set({ heartbeatTimer: timer });
          }

          if (status === 'CHANNEL_ERROR' || status === 'CLOSED') {
            console.log('[legend] channel closed or error, scheduling reconnect');
            get().scheduleReconnect();
          }
        });

      console.log('[legend] SUBSCRIBED (postgres_changes)', newChannel);

      set({
        channel: newChannel,
        isSyncing: false,
      });
    } catch (e: any) {
      console.log('[legend] syncUsers exception', e);
      setError(e?.message ?? 'Unknown error');
      set({ isSyncing: false });
      get().scheduleReconnect();
    }
  },

  // Internal: schedule reconnect with backoff
  scheduleReconnect: () => {
    const { retryCount, maxRetries, reconnectTimer, heartbeatTimer } = get();

    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
    }
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      set({ heartbeatTimer: null });
    }

    if (retryCount >= maxRetries) {
      console.log('[legend] maxRetries reached, giving up');
      set({ error: 'Realtime connection lost (max retries reached)' });
      return;
    }

    const nextRetry = retryCount + 1;
    const baseDelay = 1000;
    const delay = Math.min(baseDelay * 2 ** (nextRetry - 1), 30_000);

    console.log(`[legend] scheduling reconnect #${nextRetry} in ${delay}ms`);

    const timer = setTimeout(() => {
      set({ retryCount: nextRetry });
      get().syncUsers();
    }, delay);

    set({ reconnectTimer: timer });
  },

  // Stop real-time sync
  stopSync: () => {
    const { channel, heartbeatTimer, reconnectTimer } = get();

    console.log('[legend] stopSync CALLED');

    if (channel) {
      supabase.removeChannel(channel);
    }
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
    }
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
    }

    set({
      channel: null,
      heartbeatTimer: null,
      reconnectTimer: null,
      isSyncing: false,
      retryCount: 0,
    });
  },

  // Reset store
  reset: () => {
    console.log('[legend] reset CALLED');
    const { channel, heartbeatTimer, reconnectTimer } = get();

    if (channel) {
      supabase.removeChannel(channel);
    }
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
    }
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
    }

    set({
      users: [],
      loading: false,
      error: null,
      channel: null,
      isSyncing: false,
      retryCount: 0,
      heartbeatAt: null,
      heartbeatTimer: null,
      reconnectTimer: null,
    });
  },
}));
