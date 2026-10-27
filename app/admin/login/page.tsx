"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
export default function Login() {
  const r = useRouter(); const [email, setE] = useState(""); const [pw, setP] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function go(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr("");
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email, password: pw });
    if (error) { setErr(error.message); setBusy(false); return; }
    r.push("/admin/dashboard"); r.refresh();
  }
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form onSubmit={go} className="frame w-full max-w-sm space-y-4 p-6">
        <span className="corner c-tl" /><span className="corner c-br" />
        <p className="label">[ OWNER ACCESS ]</p>
        <h1 className="font-head text-2xl font-bold">Admin login</h1>
        <label className="block text-sm">Email<input className="field mt-1" type="email" required value={email} onChange={(e) => setE(e.target.value)} autoComplete="email" /></label>
        <label className="block text-sm">Password<input className="field mt-1" type="password" required value={pw} onChange={(e) => setP(e.target.value)} autoComplete="current-password" /></label>
        {err && <p role="alert" className="text-sm text-accent">{err}</p>}
        <button className="btn btn-solid w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        <a href="/" className="block text-center text-sm text-muted">← Back to site</a>
      </form>
    </main>
  );
    }
                    
