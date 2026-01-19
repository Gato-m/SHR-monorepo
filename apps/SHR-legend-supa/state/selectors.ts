import { useLegend } from './legend';

export const useUserWithAvatar = () =>
  useLegend((s) =>
    s.users.map((u) => ({
      ...u,
      avatarUrl: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${u.avatar}`,
    }))
  );
