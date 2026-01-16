create table if not exists public.absences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,

  type text not null check (type in ('vacation', 'sick', 'remote', 'other')),
  reason text,

  start_date date not null,
  end_date date not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger update_absences_updated_at
before update on public.absences
for each row
execute procedure moddatetime();
