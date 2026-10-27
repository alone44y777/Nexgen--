"use client";
import { useState } from "react";
import { LOGO } from "@/lib/types";
import ThemeSwitcher from "./ThemeSwitcher";
const LINKS = [["Home", "/#home"], ["Tools", "/#tools"], ["About", "/#about"], ["Admin Login", "/admin/login"]];
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-accent/30 bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2" aria-label="Main">
        <a href="/#home" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="NexGen Tech Zone logo" width={36} height={36} className="h-9 w-9 border border-accent/50 object-cover" />
          <span className="font-head text-sm font-bold uppercase tracking-widest sm:text-base">NexGen Tech Zone</span>
          <span aria-hidden className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent))]" style={{ animation: "pulse2 2s ease infinite" }} />
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map(([n, h]) => <a key={n} href={h} className="px-3 py-2 text-sm text-muted transition hover:text-fg hover:[text-shadow:0_0_12px_rgb(var(--accent))]">{n}</a>)}
          <span className="mx-2 h-5 w-px bg-accent/50" /><ThemeSwitcher />
        </div>
        <button className="min-h-[44px] min-w-[44px] border border-accent/40 md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
      </nav>
      {open && (
        <div className="flex flex-col gap-1 border-t border-accent/30 px-4 py-3 md:hidden">
          {LINKS.map(([n, h]) => <a key={n} href={h} onClick={() => setOpen(false)} className="border-b border-accent/20 py-3">{n}</a>)}
          <div className="pt-2"><ThemeSwitcher /></div>
        </div>
      )}
    </header>
  );
}
