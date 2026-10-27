import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import type { Tool } from "@/lib/types";
import Dashboard from "./Dashboard";
export const dynamic = "force-dynamic";
export default async function Page() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user || user.email !== process.env.OWNER_EMAIL) redirect("/admin/login");
  const { data } = await sb.from("tools").select("*").order("created_at", { ascending: false });
  return <Dashboard initial={(data ?? []) as Tool[]} />;
}
