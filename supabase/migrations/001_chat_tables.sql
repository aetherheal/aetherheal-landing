-- Run this in Supabase Dashboard > SQL Editor

-- Chat sessions
create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  locale text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Chat messages
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references chat_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index idx_chat_messages_session on chat_messages(session_id, created_at);

-- RLS policies
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;

-- Allow anonymous inserts and reads (anon key used from browser)
create policy "Anyone can create sessions"
  on chat_sessions for insert
  to anon with check (true);

create policy "Anyone can read own session"
  on chat_sessions for select
  to anon using (true);

create policy "Anyone can update sessions"
  on chat_sessions for update
  to anon using (true);

create policy "Anyone can insert messages"
  on chat_messages for insert
  to anon with check (true);

create policy "Anyone can read messages"
  on chat_messages for select
  to anon using (true);

-- Auto-update updated_at on chat_sessions
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger chat_sessions_updated_at
  before update on chat_sessions
  for each row execute function update_updated_at();
