# NexGen Tech Zone — Cyberpunk Redesign
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in Supabase URL, anon key and OWNER_EMAIL.
3. Run `supabase/policies.sql` in Supabase (replace owner@example.com with your owner email). Skip table creation if your `tools` table already exists; match column names (name, url, image_url, description, category, created_at).
4. Create the owner user in Supabase Auth, then `npm run dev`.
5. Deploy to Vercel with the same three env vars.
Admin: /admin/login -> /admin/dashboard (server-checked + RLS).
