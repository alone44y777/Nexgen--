import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
const head = Space_Grotesk({ subsets: ["latin"], variable: "--font-head", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
export const metadata: Metadata = {
  title: "NexGen Tech Zone — Next Generation Tools. One Powerful Zone.",
  description: "A Pakistan-based technology initiative making useful digital tools and resources easier to find.",
  openGraph: { title: "NexGen Tech Zone", description: "Discover practical online tools in one place.", images: ["https://files.catbox.moe/fdkpf4.jpg"] },
  icons: { icon: "https://files.catbox.moe/fdkpf4.jpg" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="red" suppressHydrationWarning className={`${head.variable} ${body.variable} ${mono.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("nx-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}` }} /></head>
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  );
}
