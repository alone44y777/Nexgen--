"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import type { Tool } from "@/lib/types";
const empty = { name: "", url: "", description: "", category: "General" };
export default function Dashboard({ initial }: { initial: Tool[] }) {
  const sb = useMemo(() => supabaseBrowser(), []); const router = useRouter();
  const [tools, setTools] = useState(initial); const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Tool | "new" | null>(null);
  const [f, setF] = useState(empty); const [file, setFile] = useState<File | null>(null); const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false); const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);
  const note = (ok: boolean, msg: string) => { setToast({ ok, msg }); setTimeout(() => setToast(null), 4000); };
  const shown = tools.filter((t) => `${t.name} ${t.category}`.toLowerCase().includes(q.toLowerCase()));

  function open(t: Tool | "new") {
    setEditing(t); setFile(null);
    if (t === "new") { setF(empty); setPreview(""); } else { setF({ name: t.name, url: t.url, description: t.description ?? "", category: t.category ?? "General" }); setPreview(t.image_url ?? ""); }
  }
  function pick(file?: File) { if (!file) return; setFile(file); setPreview(URL.createObjectURL(file)); }

  async function save(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    try {
      let image_url = editing !== "new" && editing ? editing.image_url : null;
      if (file) {
        const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const up = await sb.storage.from("tool-images").upload(path, file, { contentType: file.type });
        if (up.error) throw up.error;
        image_url = sb.storage.from("tool-images").getPublicUrl(path).data.publicUrl;
      }
      const row = { ...f, image_url };
      const res = editing === "new"
        ? await sb.from("tools").insert(row).select().single()
        : await sb.from("tools").update(row).eq("id", (editing as Tool).id).select().single();
      if (res.error) throw res.error;
      const saved = res.data as Tool;
      setTools(editing === "new" ? [saved, ...tools] : tools.map((t) => (t.id === saved.id ? saved : t)));
      note(true, "Tool saved."); setEditing(null);
    } catch (err: any) { note(false, `Could not save: ${err.message ?? "unknown error"}`); }
    setBusy(false);
  }
  async function del(t: Tool) {
    if (!confirm(`Delete "${t.name}"? This cannot be undone.`)) return;
    const { error } = await sb.from("tools").delete().eq("id", t.id);
    if (error) return note(false, `Could not delete: ${error.message}`);
    setTools(tools.filter((x) => x.id !== t.id)); note(true, "Tool deleted.");
  }
  async function logout() { await sb.auth.signOut(); router.push("/admin/login"); router.refresh(); }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-accent/40 pb-4">
        <div><p className="label">[ OPERATIONS PANEL ]</p><h1 className="font-head text-2xl font-bold">Dashboard</h1></div>
        <div className="flex gap-2"><a href="/" className="btn text-sm">View site</a><button onClick={logout} className="btn text-sm">Log out</button></div>
      </header>
      <div className="mb-6 grid gap-4 sm:grid-cols-[200px_1fr]">
        <div className="frame p-4"><p className="label">TOTAL TOOLS</p><p className="font-head text-4xl font-bold">{tools.length}</p></div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <input className="field" placeholder="Search tools…" aria-label="Search tools" value={q} onChange={(e) => setQ(e.target.value)} />
          <button onClick={() => open("new")} className="btn btn-solid shrink-0">+ Add new tool</button>
        </div>
      </div>

      {shown.length === 0 ? <p className="text-muted">No tools found. Add your first tool to get started.</p> : (
        <ul className="space-y-3">
          {shown.map((t) => (
            <li key={t.id} className="card flex items-center gap-3 p-3 hover:translate-y-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {t.image_url ? <img src={t.image_url} alt="" className="h-14 w-14 object-cover" /> : <div className="h-14 w-14 bg-bg" />}
              <div className="min-w-0 flex-1"><p className="truncate font-bold">{t.name}</p><p className="truncate font-mono text-xs text-muted">{t.category} · {t.url}</p></div>
              <button onClick={() => open(t)} className="btn px-3 text-sm">Edit</button>
              <button onClick={() => del(t)} className="btn px-3 text-sm">Delete</button>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Tool form">
          <form onSubmit={save} className="frame w-full max-w-lg space-y-3 bg-surface p-5">
            <h2 className="font-head text-xl font-bold">{editing === "new" ? "Add new tool" : "Edit tool"}</h2>
            <label className="block text-sm">Tool name<input className="field mt-1" required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
            <label className="block text-sm">Tool URL<input className="field mt-1" type="url" required placeholder="https://" value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} /></label>
            <label className="block text-sm">Category<input className="field mt-1" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} /></label>
            <label className="block text-sm">Description<textarea className="field mt-1" rows={3} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></label>
            <label className="block text-sm">Upload image<input className="field mt-1" type="file" accept="image/*" onChange={(e) => pick(e.target.files?.[0])} /></label>
            {preview && /* eslint-disable-next-line @next/next/no-img-element */ <img src={preview} alt="Image preview" className="h-32 w-full border border-accent/30 object-cover" />}
            {busy && <div className="h-1 overflow-hidden bg-accent/20" role="progressbar" aria-label="Saving"><div className="h-full w-1/3 animate-pulse bg-accent" /></div>}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditing(null)} className="btn" disabled={busy}>Cancel</button>
              <button className="btn btn-solid" disabled={busy}>{busy ? "Saving…" : "Save tool"}</button>
            </div>
          </form>
        </div>
      )}
      {toast && <div role="status" className={`fixed bottom-4 right-4 z-[60] border px-4 py-3 text-sm ${toast.ok ? "border-accent bg-surface" : "border-accent bg-accent/20"}`}>{toast.msg}</div>}
    </main>
  );
               }
    
