-- Migration: Create waitlist table for pre-launch email collection
-- Run this in Supabase Dashboard > SQL Editor

-- ═══════════════════════════════════════════
-- 1. Create waitlist table
-- ═══════════════════════════════════════════

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  locale text not null default 'en',
  created_at timestamptz not null default now(),
  constraint waitlist_email_unique unique (email)
);

-- ═══════════════════════════════════════════
-- 2. Enable RLS
-- ═══════════════════════════════════════════

alter table waitlist enable row level security;

-- Anon can only insert (API route uses service_role for reads)
create policy "Anon can insert waitlist"
  on waitlist for insert
  to anon with check (true);

-- ═══════════════════════════════════════════
-- 3. Indexes
-- ═══════════════════════════════════════════

create index if not exists idx_waitlist_email on waitlist(email);
create index if not exists idx_waitlist_created on waitlist(created_at desc);
