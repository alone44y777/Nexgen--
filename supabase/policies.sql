-- Run in Supabase SQL editor. Replace owner@example.com with your owner email.
-- Adjust column names if your existing "tools" table differs.
create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  name text not null, url text not null, image_url text,
  description text, category text default 'General',
  created_at timestamptz default now());
alter table public.tools enable row level security;
drop policy if exists "public read" on public.tools;
drop policy if exists "owner write" on public.tools;
create policy "public read" on public.tools for select using (true);
create policy "owner write" on public.tools for all
  using ((auth.jwt()->>'email') = 'daudarain55@gmail.com')
  with check ((auth.jwt()->>'email') = 'daudarain55@gmail.com');
insert into storage.buckets (id, name, public) values ('tool-images','tool-images',true) on conflict do nothing;
drop policy if exists "img public read" on storage.objects;
drop policy if exists "img owner write" on storage.objects;
create policy "img public read" on storage.objects for select using (bucket_id='tool-images');
create policy "img owner write" on storage.objects for all
  using (bucket_id='tool-images' and (auth.jwt()->>'email')='daudarain55@gmail.com')
  with check (bucket_id='tool-images' and (auth.jwt()->>'email')='daudarain55@gmail.com');
