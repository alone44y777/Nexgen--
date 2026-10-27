import Nav from "@/components/Nav";
import Hud from "@/components/Hud";
import ToolsGrid from "@/components/ToolsGrid";
import { supabaseServer } from "@/lib/supabase-server";
import { CHANNEL, LOGO, type Tool } from "@/lib/types";
export const dynamic = "force-dynamic";

const WA = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.800-1.2-4.600-4-4.700-4.200-.1-.2-1.1-1.500-1.1-2.900s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.2.1.3 0 .5l-.3.400-.4.500c-.1.1-.3.3-.1.600.2.300.8 1.3 1.700 2.100 1.2 1 2.100 1.3 2.400 1.500.3.100.5.100.6-.1l.9-1.1c.2-.3.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.2.1.8-.1 1.400z" /></svg>
);

export default async function Home() {
  const { data } = await supabaseServer().from("tools").select("*").order("created_at", { ascending: false });
  const tools = (data ?? []) as Tool[];
  return (
    <>
      <Nav />
      <main>
        <section id="home" className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="label inline-block border border-accent/50 px-3 py-1">[ SYSTEM ONLINE // NEXGEN NETWORK ]</p>
            <h1 className="mt-5 font-head text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              ENTER THE <span className="text-accent [text-shadow:0_0_24px_rgb(var(--accent)/.6)]">NEXT GENERATION.</span>
            </h1>
            <p className="mt-5 max-w-lg text-muted">Your gateway to powerful digital tools, useful online resources, and next-generation technology — all in one zone.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#tools" className="btn btn-solid">[ EXPLORE TOOLS → ]</a>
              <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="btn">[ JOIN OUR CHANNEL ]</a>
            </div>
            <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted">
              {[["NETWORK", "ONLINE"], ["PLATFORM", "NEXGEN"], ["ACCESS", "PUBLIC"]].map(([k, v]) => (
                <div key={k} className="flex gap-2"><dt>{k}:</dt><dd className="text-accent">{v}</dd></div>))}
            </dl>
          </div>
          <div className="order-last"><Hud /></div>
        </section>

        <section id="tools" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
          <div className="mb-8 text-center">
            <p className="label">[ AVAILABLE RESOURCES ]</p>
            <h2 className="mt-2 font-head text-3xl font-bold sm:text-4xl">THE TOOL MATRIX</h2>
            <p className="mt-2 text-muted">Explore the digital utilities available in the NexGen ecosystem.</p>
          </div>
          <ToolsGrid tools={tools} />
        </section>

        <section id="about" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-14">
          <div className="frame p-6 sm:p-10">
            <span className="corner c-tl" style={{ animation: "pulse2 3s ease infinite" }} /><span className="corner c-br" style={{ animation: "pulse2 3s ease infinite" }} />
            <p className="label">[ ABOUT THE PROJECT ]</p>
            <h2 className="mt-2 font-head text-3xl font-bold">ABOUT NEXGEN</h2>
            <p className="mt-3 font-head text-xl font-bold text-accent">NexGen Tech</p>
            <p className="font-mono text-xs text-muted">Next Generation Tech</p>
            <div className="mt-5 space-y-4 text-muted">
              <p>NexGen Tech Zone is a Pakistan-based technology initiative dedicated to making useful digital resources more accessible to everyone.</p>
              <p>Our mission is to help people discover practical online tools, explore emerging technologies, and improve their digital skills through a simple, centralized platform.</p>
              <p>We believe technology should empower everyone. That is why we aim to bring useful resources together in one convenient destination, offering free tools and resources wherever possible.</p>
              <p>Built around curiosity, creativity, and innovation, NexGen Tech Zone represents our vision of a smarter and more connected digital future.</p>
            </div>
            <p className="mt-6 font-head font-bold tracking-widest text-accent">EXPLORE. LEARN. CREATE. EVOLVE.</p>
          </div>
        </section>

        <section className="px-4 py-12 text-center">
          <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="btn btn-solid min-h-[56px] px-8 text-base">{WA} [ JOIN MY CHANNEL ↗ ]</a>
        </section>
      </main>

      <footer className="mt-10 border-t border-accent bg-bg shadow-[0_-1px_16px_rgb(var(--accent)/.4)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="NexGen Tech Zone logo" width={48} height={48} className="h-12 w-12 border border-accent/50 object-cover" />
          <p className="font-head font-bold uppercase tracking-widest">NexGen Tech Zone</p>
          <p className="text-sm text-muted">Next Generation Tools. One Powerful Zone.</p>
          <nav className="flex flex-wrap justify-center gap-4 text-sm" aria-label="Footer">
            <a href="/#home">Home</a><a href="/#tools">Tools</a><a href="/#about">About</a>
            <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="text-accent">WhatsApp Channel</a>
          </nav>
          <p className="font-mono text-xs text-muted">© {new Date().getFullYear()} NexGen Tech Zone. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
