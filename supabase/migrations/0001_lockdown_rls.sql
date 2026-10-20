-- Lock down Row Level Security on every table the app actually has.
--
-- Found during a local verification pass: none of these tables had RLS enabled,
-- which meant the public anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY -- a key that is
-- *meant* to be public, since it's designed to ship in client bundles) could read
-- every row of every table directly via Supabase's REST API, bypassing the app
-- entirely. Worst case: `pedidos` -- full customer names, addresses, phone numbers,
-- emails and order contents -- was readable by anyone with that key, with no rate
-- limiting and no field restrictions (unlike /api/estado-pedido, which was already
-- hardened to only return safe fields to the public, for exactly this reason).
--
-- The app never queries Supabase directly from the browser today -- every table
-- read/write goes through a server route using SUPABASE_SECRET_KEY (the service
-- role key, which always bypasses RLS). So locking every table down to
-- "service role only, nothing else" matches how the app is actually built right
-- now and breaks nothing. If a future feature needs the browser to read a table
-- directly (e.g. a client-side Supabase Auth flow), add a narrow, explicit
-- SELECT policy for that specific table and column set at that time --
-- don't turn RLS off to work around this.
--
-- Safe to run multiple times.

alter table public.pedidos                 enable row level security;
alter table public.cache_catalogo_externo  enable row level security;
alter table public.destacados              enable row level security;
alter table public.novedades               enable row level security;
alter table public.promociones             enable row level security;

-- Deliberately no CREATE POLICY statements below this line.
-- With RLS enabled and zero policies, every role except service_role (which
-- bypasses RLS by design in Supabase) is denied all access -- no SELECT,
-- INSERT, UPDATE or DELETE. That's the correct default here: nothing today
-- needs anon/authenticated access to any of these tables.
