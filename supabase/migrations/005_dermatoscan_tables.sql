-- Dermatoscan tables — AetherHeal's first healthcare AI product
-- (added 2026-05-16 for the 5-professor academic validation cohort).
--
-- Shares this Supabase project with aetherheal-landing rather than spinning
-- up a separate one. Tables are prefixed `dermatoscan_` (or live in their
-- own namespace like `professors`) so the schema stays readable as more
-- AetherHeal products land in this project.
--
-- Run this in Supabase Dashboard > SQL Editor.

-- ─────────────────────────────────────────────────────────────────────────
-- Professor allowlist (invite-only access during validation phase).
-- Linked to Supabase Auth users via auth_user_id; admin invites by inserting
-- a row + sending a magic-link email through the dashboard. Setting
-- active=false revokes access without deleting the audit trail.
create table if not exists professors (
  id            uuid primary key default gen_random_uuid(),
  auth_user_id  uuid unique references auth.users(id) on delete set null,
  email         text not null unique,
  name          text not null,
  institution   text,
  invited_by    text,
  invited_at    timestamptz not null default now(),
  joined_at     timestamptz,
  active        boolean not null default true,
  daily_cost_cap_usd numeric(8,4) not null default 5.0,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists idx_professors_auth_user on professors(auth_user_id);
create index if not exists idx_professors_email on professors(email);

-- ─────────────────────────────────────────────────────────────────────────
-- Audit log — one row per consultation. raw_ai_result holds the full
-- structured JSON the model returned so history-click can re-render the
-- whole result view. images stores SHA-256 hashes only; image bytes never
-- enter Supabase (privacy doctrine).
create table if not exists dermatoscan_audit (
  entry_id      uuid primary key,
  professor_id  uuid not null references professors(id) on delete cascade,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  status        text not null check (status in ('analyzed','edited','completed')),
  physician_marked_real boolean not null default false,
  session_metadata       jsonb not null default '{}'::jsonb,
  patient_reference      jsonb not null default '{}'::jsonb,
  images                 jsonb not null default '[]'::jsonb,   -- [{sha256, w, h}]
  clinical_context       jsonb not null default '{}'::jsonb,
  ai_recommendation      jsonb not null default '{}'::jsonb,
  physician_decision     jsonb not null default '{}'::jsonb,
  api_usage              jsonb,
  raw_ai_result          jsonb                                  -- full result for re-render
);
create index if not exists idx_dermatoscan_audit_professor_created
  on dermatoscan_audit(professor_id, created_at desc);

-- ─────────────────────────────────────────────────────────────────────────
-- Structured validation feedback — captured at session-close. This is the
-- primary research data for the cohort study.
create table if not exists dermatoscan_feedback (
  id                  uuid primary key default gen_random_uuid(),
  entry_id            uuid not null references dermatoscan_audit(entry_id) on delete cascade,
  professor_id        uuid not null references professors(id) on delete cascade,
  agreement_rating    smallint check (agreement_rating between 1 and 5),
  agreement_label     text check (agreement_label in ('agree','partial','disagree','biopsy_instead','insufficient')),
  override_reason     text,
  usability_notes     text,
  perceived_safety    smallint check (perceived_safety between 1 and 5),
  would_use_again     boolean,
  created_at          timestamptz not null default now()
);
create index if not exists idx_dermatoscan_feedback_entry on dermatoscan_feedback(entry_id);
create index if not exists idx_dermatoscan_feedback_professor on dermatoscan_feedback(professor_id, created_at desc);

-- ─────────────────────────────────────────────────────────────────────────
-- Per-professor daily cost ledger — enforced by the backend proxy before
-- every Anthropic call. Daily cap defaults to professors.daily_cost_cap_usd
-- which itself defaults to $5.
create table if not exists dermatoscan_cost (
  professor_id uuid not null references professors(id) on delete cascade,
  date         date not null,
  cost_usd     numeric(10,6) not null default 0,
  call_count   integer not null default 0,
  updated_at   timestamptz not null default now(),
  primary key (professor_id, date)
);

-- Atomic increment function used by the proxy. Avoids the upsert race where
-- two concurrent calls would each read 0 and write a single increment.
create or replace function increment_dermatoscan_cost(
  p_professor_id uuid,
  p_date date,
  p_amount numeric
) returns void language plpgsql security definer as $$
begin
  insert into dermatoscan_cost (professor_id, date, cost_usd, call_count, updated_at)
  values (p_professor_id, p_date, p_amount, 1, now())
  on conflict (professor_id, date) do update
  set cost_usd   = dermatoscan_cost.cost_usd + p_amount,
      call_count = dermatoscan_cost.call_count + 1,
      updated_at = now();
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security — professors can only see/edit their own data. The
-- backend proxy uses the service-role key for cross-cutting writes (cost
-- ledger, audit upserts from the function).

alter table professors            enable row level security;
alter table dermatoscan_audit     enable row level security;
alter table dermatoscan_feedback  enable row level security;
alter table dermatoscan_cost      enable row level security;

-- Authenticated professors can read their own professor row.
create policy "professors_self_read" on professors
  for select to authenticated
  using (auth_user_id = auth.uid());

-- Audit log: a professor sees only their own entries.
create policy "audit_self_read" on dermatoscan_audit
  for select to authenticated
  using (professor_id = (select id from professors where auth_user_id = auth.uid()));

create policy "audit_self_insert" on dermatoscan_audit
  for insert to authenticated
  with check (professor_id = (select id from professors where auth_user_id = auth.uid()));

create policy "audit_self_update" on dermatoscan_audit
  for update to authenticated
  using (professor_id = (select id from professors where auth_user_id = auth.uid()))
  with check (professor_id = (select id from professors where auth_user_id = auth.uid()));

-- Feedback: a professor sees and writes only their own feedback rows.
create policy "feedback_self_read" on dermatoscan_feedback
  for select to authenticated
  using (professor_id = (select id from professors where auth_user_id = auth.uid()));

create policy "feedback_self_insert" on dermatoscan_feedback
  for insert to authenticated
  with check (professor_id = (select id from professors where auth_user_id = auth.uid()));

-- Cost ledger is never read or written by the user directly — only the
-- service-role backend (via increment_dermatoscan_cost) touches it.
-- No anon/authenticated policies, so RLS effectively locks it down.

-- ─────────────────────────────────────────────────────────────────────────
-- Convenience view for the admin to monitor cohort progress.
create or replace view dermatoscan_cohort_summary as
select
  p.id, p.email, p.name, p.institution, p.active, p.joined_at,
  count(distinct a.entry_id) filter (where a.status = 'completed') as completed_cases,
  count(distinct a.entry_id) as total_cases,
  count(distinct f.id) as feedback_count,
  coalesce(sum(c.cost_usd), 0) as total_cost_usd,
  max(a.created_at) as last_active_at
from professors p
left join dermatoscan_audit    a on a.professor_id = p.id
left join dermatoscan_feedback f on f.professor_id = p.id
left join dermatoscan_cost     c on c.professor_id = p.id
group by p.id;
