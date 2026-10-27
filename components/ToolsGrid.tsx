"use client";
import { useMemo, useState } from "react";
import type { Tool } from "@/lib/types";
export default function ToolsGrid({ tools }: { tools: Tool[] }) {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set(tools.map((t) => t.category || "General")))], [tools]);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return tools.filter((t) => (cat === "All" || (t.category || "General") === cat) &&
      (!s || `${t.name} ${t.description ?? ""} ${t.category ?? ""}`.toLowerCase().includes(s)));
  }, [tools, q, cat]);
  return (
    <>
      <div className="relative mx-auto mb-5 max-w-2xl">
        <span aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-accent">⌕</span>
        <input className="field pl-9 pr-10" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools, resources, utilities..." aria-label="Search tools" />
        {q && <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2 text-muted hover:text-accent">✕</button>}
      </div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
            className={`min-h-[36px] border px-3 font-mono text-xs transition ${cat === c ? "border-accent bg-accent/20 text-fg" : "border-fg/10 text-muted hover:border-accent/60"}`}>{c}</button>
        ))}
      </div>
      {list.length === 0 ? <p className="text-center text-muted">No tools match your search. Try a different keyword or category.</p> : (
        <ul className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((t) => (
            <li key={t.id} className="card flex flex-col p-4">
              <span className="corner c-tl" /><span className="corner c-br" />
              <div className="mb-3 aspect-video overflow-hidden bg-bg">
                {t.image_url
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={t.image_url} alt={`${t.name} thumbnail`} loading="lazy" className="thumb h-full w-full object-cover" />
                  : <div className="thumb grid h-full place-items-center font-head text-3xl text-accent/60">{t.name.slice(0, 1)}</div>}
              </div>
              <span className="label mb-1">{t.category || "General"}</span>
              <h3 className="font-head text-lg font-bold">{t.name}</h3>
              <p className="mb-4 mt-1 line-clamp-3 flex-1 text-sm text-muted">{t.description}</p>
              <a href={t.url} target="_blank" rel="noopener noreferrer" className="btn text-sm">OPEN TOOL ↗</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
