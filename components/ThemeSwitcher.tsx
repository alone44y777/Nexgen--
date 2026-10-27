"use client";
import { useEffect, useState } from "react";
const THEMES = [["red", "Cyber Red"], ["ice", "Ice Blue"], ["green", "Matrix Green"], ["white", "Pure White"]];
export default function ThemeSwitcher() {
  const [t, setT] = useState("red");
  useEffect(() => { setT(document.documentElement.dataset.theme || "red"); }, []);
  const change = (v: string) => { setT(v); document.documentElement.dataset.theme = v; try { localStorage.setItem("nx-theme", v); } catch {} };
  return (
    <select aria-label="Theme" value={t} onChange={(e) => change(e.target.value)}
      className="min-h-[40px] border border-accent/40 bg-bg/70 px-2 font-mono text-xs text-fg focus:border-accent">
      {THEMES.map(([v, n]) => <option key={v} value={v}>{n}</option>)}
    </select>
  );
}
