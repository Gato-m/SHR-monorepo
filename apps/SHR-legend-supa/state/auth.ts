import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { supabase } from '../lib/supabase';

type Role = 'user' | 'admin';

type AuthUser = {
  id: string;
  email: string;
  role: Role;
  name?: string;
};

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  initDone: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  initAuth: () => Promise<void>;
  signOut: () => Promise<void>;
};

// Vanilla zustand store
const authStore = createStore<AuthState>((set) => ({
  user: null,
  loading: false,
  initDone: false,

  // Reģistrācija
  signUp: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error(error);
      set({ loading: false });
      return;
    }

    // pārbaudām, vai e‑pasts ir users tabulā
    const { data: allowedUser } = await supabase
      .from('users')
      .select('id, email, role, name')
      .eq('email', email)
      .single();

    if (!allowedUser) {
      await supabase.auth.signOut();
      set({ user: null, loading: false, initDone: true });
      throw new Error('Šis e‑pasts nav atļauts reģistrācijai');
    }

    set({
      user: {
        id: allowedUser.id,
        email: allowedUser.email,
        role: allowedUser.role,
        name: allowedUser.name,
      },
      loading: false,
      initDone: true,
    });
  },

  // Sesijas inicializācija pie app starta
  initAuth: async () => {
    set({ loading: true });
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session?.user?.email) {
        set({ user: null, initDone: true, loading: false });
        return;
      }

      const email = session.user.email;

      const { data: allowedUser } = await supabase
        .from('users')
        .select('id, email, role, name')
        .eq('email', email)
        .single();

      if (!allowedUser) {
        await supabase.auth.signOut();
        set({ user: null, initDone: true, loading: false });
        return;
      }

      set({
        user: {
          id: allowedUser.id,
          email: allowedUser.email,
          role: allowedUser.role,
          name: allowedUser.name,
        },
        initDone: true,
        loading: false,
      });
    } catch (e) {
      console.error('[auth] initAuth error', e);
      set({ user: null, initDone: true, loading: false });
    }
  },

  // Izlogoties
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

// Hook ar selektoru — zustand v5 stilā
export const useAuth = <T>(selector: (state: AuthState) => T) => useStore(authStore, selector);
