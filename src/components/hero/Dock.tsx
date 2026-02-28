"use client";

import Link from "next/link";

export default function Dock() {
  return (
    <div className="absolute bottom-6 right-6 z-50 flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 rounded-full glass neon-border px-3 py-2">
        <Dot active />
        <Dot />
        <Dot />
        <Dot />
      </div>
      <Link
        href="/contacts"
        className="h-10 w-10 rounded-full glass neon-border grid place-items-center hover:neon-text transition"
        aria-label="Contacts"
      >
        ✉
      </Link>
      <button
        className="h-10 w-10 rounded-full glass neon-border grid place-items-center opacity-80 hover:opacity-100"
        aria-label="Theme"
        title="Theme (visual only)"
      >
        ☾
      </button>
    </div>
  );
}

function Dot({ active }: { active?: boolean }) {
  return (
    <span
      className={
        "h-2 w-2 rounded-full " +
        (active
          ? "bg-[rgba(255,0,60,.95)] shadow-[0_0_18px_rgba(255,0,60,.75)]"
          : "bg-white/20")
      }
    />
  );
}
