"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import clsx from "clsx";

const items = [
  { href: "/", label: "HOME" },
  { href: "/resume", label: "RESUME" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contacts", label: "CONTACTS" },
];

export default function TopNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const activeHref = useMemo(() => {
    if (!path) return "/";
    if (path === "/") return "/";
    const hit = items.find((i) => path.startsWith(i.href) && i.href !== "/");
    return hit?.href ?? "/";
  }, [path]);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full neon-border grid place-items-center">
            <span className="text-xs font-semibold">V</span>
          </div>
          <span className="hidden sm:inline text-xs tracking-[0.35em] opacity-80">VLADDOS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.35em]">
          {items.map((it) => {
            const active = it.href === activeHref;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={clsx(
                  "relative opacity-80 hover:opacity-100 transition glitch",
                  active && "opacity-100 neon-text"
                )}
              >
                {it.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[rgba(255,0,60,.9)] shadow-[0_0_18px_rgba(255,0,60,.65)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex items-center gap-2 text-xs opacity-70 hover:opacity-100">
            <span className="inline-block h-2 w-2 rounded-full bg-[rgba(255,0,60,.9)] shadow-[0_0_18px_rgba(255,0,60,.8)]" />
            EN
          </button>

          <Link
            href="/contacts"
            className="hidden sm:inline-flex px-4 py-2 text-xs tracking-[0.35em] rounded-md neon-border hover:neon-text transition"
          >
            HIRE ME
          </Link>

          <button
            className="md:hidden h-10 w-10 rounded-lg glass neon-border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className="text-lg">≡</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="rounded-2xl glass neon-border p-4">
            <div className="grid gap-3 text-xs tracking-[0.35em]">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "opacity-80 hover:opacity-100 transition",
                    it.href === activeHref && "neon-text opacity-100"
                  )}
                >
                  {it.label}
                </Link>
              ))}
              <Link
                href="/contacts"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center px-4 py-3 text-xs tracking-[0.35em] rounded-xl neon-border hover:neon-text transition"
              >
                HIRE ME
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
