-- Nilüfer İlaçlama — initial schema
-- Tables, foreign keys, and role-based Row Level Security policies.

create extension if not exists "pgcrypto";

-- ============================================================
-- TABLES
-- ============================================================

-- profiles: 1:1 extension of auth.users, carries the app-level role.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('owner', 'staff', 'customer')),
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

-- customers: CRM record for a customer. profile_id is nullable because
-- an office-created customer may not have a login yet.
create table public.customers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  full_name text not null,
  phone text,
  email text,
  address text,
  district text,
  created_at timestamptz not null default now()
);

-- staff: internal team member, always linked to a profile with role='staff'.
create table public.staff (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  position text,
  salary_base numeric,
  created_at timestamptz not null default now()
);

-- jobs: a scheduled/completed pest-control visit.
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  assigned_staff_id uuid references public.staff (id) on delete set null,
  service_type text not null,
  status text not null default 'pending'
    check (status in ('pending', 'scheduled', 'completed', 'cancelled')),
  scheduled_at timestamptz,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

-- job_reports: EK-1 application report filled in by the assigned staff.
create table public.job_reports (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs (id) on delete cascade,
  staff_id uuid references public.staff (id) on delete set null,
  products_used text,
  dosage text,
  signature_url text,
  pdf_url text,
  created_at timestamptz not null default now()
);

-- contracts: service agreement tied to a customer.
create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  start_date date,
  end_date date,
  duration_months integer,
  status text,
  pdf_url text,
  created_at timestamptz not null default now()
);

-- payments: payment/receipt record tied to a customer.
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  amount numeric not null,
  payment_type text,
  receipt_url text,
  created_at timestamptz not null default now()
);

-- quote_requests: public "Ücretsiz Keşif" form submissions.
create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  property_type text,
  service_type text,
  address text,
  district text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index customers_profile_id_idx on public.customers (profile_id);
create index staff_profile_id_idx on public.staff (profile_id);
create index jobs_customer_id_idx on public.jobs (customer_id);
create index jobs_assigned_staff_id_idx on public.jobs (assigned_staff_id);
create index job_reports_job_id_idx on public.job_reports (job_id);
create index job_reports_staff_id_idx on public.job_reports (staff_id);
create index contracts_customer_id_idx on public.contracts (customer_id);
create index payments_customer_id_idx on public.payments (customer_id);

-- ============================================================
-- HELPER FUNCTIONS (security definer, used inside RLS policies)
-- ============================================================

-- Current user's app role, or null if no profile / not authenticated.
create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- staff.id row that belongs to the current user, if any.
create or replace function public.current_staff_id()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select id from public.staff where profile_id = auth.uid();
$$;

-- customers.id row that belongs to the current user, if any.
create or replace function public.current_customer_id()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select id from public.customers where profile_id = auth.uid();
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.staff enable row level security;
alter table public.jobs enable row level security;
alter table public.job_reports enable row level security;
alter table public.contracts enable row level security;
alter table public.payments enable row level security;
alter table public.quote_requests enable row level security;

-- ---------- profiles ----------

create policy "owner_all_profiles"
  on public.profiles for all
  using (public.current_user_role() = 'owner')
  with check (public.current_user_role() = 'owner');

create policy "self_select_profile"
  on public.profiles for select
  using (id = auth.uid());

create policy "self_update_profile"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- ---------- customers ----------

create policy "owner_all_customers"
  on public.customers for all
  using (public.current_user_role() = 'owner')
  with check (public.current_user_role() = 'owner');

create policy "customer_select_own_customer_row"
  on public.customers for select
  using (profile_id = auth.uid());

create policy "customer_update_own_customer_row"
  on public.customers for update
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

-- ---------- staff ----------

create policy "owner_all_staff"
  on public.staff for all
  using (public.current_user_role() = 'owner')
  with check (public.current_user_role() = 'owner');

create policy "staff_select_own_staff_row"
  on public.staff for select
  using (profile_id = auth.uid());

-- ---------- jobs ----------

create policy "owner_all_jobs"
  on public.jobs for all
  using (public.current_user_role() = 'owner')
  with check (public.current_user_role() = 'owner');

create policy "staff_select_assigned_jobs"
  on public.jobs for select
  using (assigned_staff_id = public.current_staff_id());

create policy "staff_update_assigned_jobs"
  on public.jobs for update
  using (assigned_staff_id = public.current_staff_id())
  with check (assigned_staff_id = public.current_staff_id());

create policy "customer_select_own_jobs"
  on public.jobs for select
  using (customer_id = public.current_customer_id());

-- ---------- job_reports ----------

create policy "owner_all_job_reports"
  on public.job_reports for all
  using (public.current_user_role() = 'owner')
  with check (public.current_user_role() = 'owner');

create policy "staff_select_own_job_reports"
  on public.job_reports for select
  using (staff_id = public.current_staff_id());

create policy "staff_insert_own_job_reports"
  on public.job_reports for insert
  with check (staff_id = public.current_staff_id());

create policy "staff_update_own_job_reports"
  on public.job_reports for update
  using (staff_id = public.current_staff_id())
  with check (staff_id = public.current_staff_id());

-- ---------- contracts ----------

create policy "owner_all_contracts"
  on public.contracts for all
  using (public.current_user_role() = 'owner')
  with check (public.current_user_role() = 'owner');

create policy "customer_select_own_contracts"
  on public.contracts for select
  using (customer_id = public.current_customer_id());

-- ---------- payments ----------

create policy "owner_all_payments"
  on public.payments for all
  using (public.current_user_role() = 'owner')
  with check (public.current_user_role() = 'owner');

create policy "customer_select_own_payments"
  on public.payments for select
  using (customer_id = public.current_customer_id());

-- ---------- quote_requests ----------

create policy "owner_all_quote_requests"
  on public.quote_requests for all
  using (public.current_user_role() = 'owner')
  with check (public.current_user_role() = 'owner');

create policy "public_insert_quote_requests"
  on public.quote_requests for insert
  to anon, authenticated
  with check (true);
