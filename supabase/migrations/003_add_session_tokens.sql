-- Migration: Add session_token columns and tighten RLS policies
-- Run this in Supabase Dashboard > SQL Editor
--
-- IMPORTANT: After running this migration, the API routes expect
-- session_token on both chat_sessions and intake_sessions tables.

-- ═══════════════════════════════════════════
-- 1. Add session_token columns
-- ═══════════════════════════════════════════

alter table chat_sessions
  add column if not exists session_token uuid not null default gen_random_uuid();

alter table intake_sessions
  add column if not exists session_token uuid not null default gen_random_uuid();

-- Index for fast token lookups
create index if not exists idx_chat_sessions_token on chat_sessions(session_token);
create index if not exists idx_intake_sessions_token on intake_sessions(session_token);

-- ═══════════════════════════════════════════
-- 2. Drop old permissive RLS policies
-- ═══════════════════════════════════════════

-- Chat sessions
drop policy if exists "Anyone can create sessions" on chat_sessions;
drop policy if exists "Anyone can read own session" on chat_sessions;
drop policy if exists "Anyone can update sessions" on chat_sessions;

-- Chat messages
drop policy if exists "Anyone can insert messages" on chat_messages;
drop policy if exists "Anyone can read messages" on chat_messages;

-- Intake sessions
drop policy if exists "Anyone can create intake sessions" on intake_sessions;
drop policy if exists "Anyone can read intake sessions" on intake_sessions;
drop policy if exists "Anyone can update intake sessions" on intake_sessions;

-- ═══════════════════════════════════════════
-- 3. New RLS policies — anon can only INSERT
--    All reads/updates go through service_role (API routes)
-- ═══════════════════════════════════════════

-- Chat sessions: anon can only create new sessions
create policy "Anon can create chat sessions"
  on chat_sessions for insert
  to anon with check (true);

-- Chat messages: anon can only insert (our API handles reads via service_role)
create policy "Anon can insert chat messages"
  on chat_messages for insert
  to anon with check (true);

-- Intake sessions: anon can only create new sessions
create policy "Anon can create intake sessions"
  on intake_sessions for insert
  to anon with check (true);

-- ═══════════════════════════════════════════
-- 4. Additional indexes for performance
-- ═══════════════════════════════════════════

create index if not exists idx_intake_sessions_status_created
  on intake_sessions(status, created_at desc);

create index if not exists idx_chat_sessions_created
  on chat_sessions(created_at desc);
