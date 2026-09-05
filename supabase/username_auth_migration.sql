-- ===========================================
-- Migration: Add profiles table for username auth
-- Run this in Supabase Dashboard -> SQL Editor
-- ===========================================

-- 1. Create profiles table safely
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text not null,
  created_at timestamptz default now() not null
);

-- Safely add check constraint
do $$ 
begin
  if not exists (
    select 1 from pg_constraint 
    where conname = 'profiles_username_check' 
    and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles add constraint profiles_username_check check (
      username = lower(trim(username))
      and username ~ '^[a-z0-9_]{3,30}$'
    );
  end if;
end $$;

-- 2. Enforce case-insensitive uniqueness on username
create unique index if not exists profiles_username_lower_idx on public.profiles (lower(username));

-- 3. Enable RLS
alter table public.profiles enable row level security;

-- 4. RLS Policies
do $$
begin
  drop policy if exists "Users can view their own profile" on public.profiles;
  drop policy if exists "Users can update their own profile" on public.profiles;
end $$;

-- Only SELECT policy is allowed. Profiles are immutable from client.
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- 5. Trigger to validate and automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  raw_username text;
  normalized_username text;
  expected_email text;
begin
  raw_username := new.raw_user_meta_data->>'username';
  
  if raw_username is null then
    raise exception 'Username metadata is required for signup';
  end if;

  normalized_username := lower(trim(raw_username));

  if normalized_username !~ '^[a-z0-9_]{3,30}$' then
    raise exception 'Username must be 3-30 characters and contain only lowercase letters, numbers, and underscores';
  end if;

  expected_email := normalized_username || '@users.dashbill.local';

  if new.email is null or lower(trim(new.email)) != expected_email then
    raise exception 'Auth email does not match the required synthetic email format based on username';
  end if;

  insert into public.profiles (id, username)
  values (new.id, normalized_username);
  
  return new;
end;
$$;

-- Drop trigger if exists to ensure idempotency
drop trigger if exists on_auth_user_created on auth.users;

-- Bind trigger to auth.users table
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
