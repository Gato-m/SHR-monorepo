-- Create moddatetime() if not exists
create or replace function moddatetime()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists public.users (
  id uuid primary key,
  email text not null unique,
  full_name text not null,
  role text not null check (role in ('user', 'admin')),
  avatar_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger update_users_updated_at
before update on public.users
for each row
execute procedure moddatetime();
