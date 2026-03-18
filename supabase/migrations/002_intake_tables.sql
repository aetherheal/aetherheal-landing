-- Run this in Supabase Dashboard > SQL Editor

-- Intake sessions: one per patient intake conversation
create table if not exists intake_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'in_progress'
    check (status in ('in_progress', 'completed', 'escalated')),
  specialty text not null default 'hair-transplant',
  locale text not null default 'en',
  messages jsonb not null default '[]',
  patient_goals text,
  risk_flags jsonb not null default '[]',
  missing_info jsonb not null default '[]',
  case_summary text,
  physician_notified_at timestamptz
);

create index idx_intake_sessions_status on intake_sessions(status);

-- RLS
alter table intake_sessions enable row level security;

create policy "Anyone can create intake sessions"
  on intake_sessions for insert
  to anon with check (true);

create policy "Anyone can read intake sessions"
  on intake_sessions for select
  to anon using (true);

create policy "Anyone can update intake sessions"
  on intake_sessions for update
  to anon using (true);

-- Auto-update updated_at
create trigger intake_sessions_updated_at
  before update on intake_sessions
  for each row execute function update_updated_at();
