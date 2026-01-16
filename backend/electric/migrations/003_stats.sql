create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,

  year int not null,
  month int not null check (month between 1 and 12),

  total_absences int not null default 0,
  vacation_days int not null default 0,
  sick_days int not null default 0,
  remote_days int not null default 0,
  other_days int not null default 0,

  updated_at timestamptz not null default now()
);

create unique index if not exists stats_user_month_idx
on public.stats (user_id, year, month);
