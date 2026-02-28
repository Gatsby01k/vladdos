"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Card = ({
  title,
  subtitle,
  href,
  x,
  y,
}: {
  title: string;
  subtitle: string;
  href: string;
  x: string;
  y: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="absolute"
    style={{ left: x, top: y }}
  >
    <Link
      href={href}
      className="group inline-block rounded-2xl px-5 py-4 glass neon-border hover:neon-text transition"
    >
      <div className="text-lg tracking-[0.25em] glitch">{title}</div>
      <div className="mt-1 text-[10px] tracking-[0.4em] opacity-70 group-hover:opacity-95">
        {subtitle}
      </div>
      <div className="mt-3 h-[1px] w-full bg-[rgba(255,0,60,.35)] group-hover:bg-[rgba(255,0,60,.85)] transition" />
    </Link>
  </motion.div>
);

export default function Hotspots() {
  return (
    <div className="relative h-full w-full">
      {/* left */}
      <div className="hidden lg:block">
        <Card title="PORTFOLIO" subtitle="MY WORK" href="/projects" x="5%" y="52%" />
        <Card title="MUSIC" subtitle="JBL BOOM" href="/projects#music" x="21%" y="63%" />
      </div>

      {/* center */}
      <div className="hidden md:block">
        <Card title="ABOUT" subtitle="WHO I AM" href="/resume" x="42%" y="56%" />
      </div>

      {/* right skills */}
      <motion.div
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
        className="absolute right-[4%] top-[18%] w-[260px] hidden lg:block glass neon-border rounded-2xl p-4"
      >
        <div className="text-sm tracking-[0.35em] neon-text">SKILLS</div>
        <div className="mt-3 space-y-3 text-[10px] tracking-[0.35em] opacity-85">
          <Skill label="FRONTEND" val={99} />
          <Skill label="3D / MOTION" val={90} />
          <Skill label="BRANDING" val={98} />
          <Skill label="DEVELOPMENT" val={90} />
        </div>
      </motion.div>

      {/* contacts */}
      <div className="hidden lg:block">
        <Card title="CONTACTS" subtitle="TAP TO CONNECT" href="/contacts" x="70%" y="72%" />
      </div>

      {/* mobile quick actions */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[14%] md:hidden flex gap-3">
        <Link className="px-4 py-3 rounded-2xl glass neon-border text-[10px] tracking-[0.35em]" href="/projects">PROJECTS</Link>
        <Link className="px-4 py-3 rounded-2xl glass neon-border text-[10px] tracking-[0.35em]" href="/contacts">HIRE</Link>
      </div>
    </div>
  );
}

function Skill({ label, val }: { label: string; val: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <span className="opacity-70">{val}%</span>
      </div>
      <div className="mt-2 h-[2px] w-full bg-white/10 overflow-hidden rounded">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${val}%` }}
          transition={{ duration: 0.95, ease: "easeOut" }}
          className="h-full bg-[rgba(255,0,60,.9)] shadow-[0_0_18px_rgba(255,0,60,.6)]"
        />
      </div>
    </div>
  );
}
