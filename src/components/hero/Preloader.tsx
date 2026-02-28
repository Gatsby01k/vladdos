"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function preload(url: string) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = url;
  });
}

export default function Preloader({
  assets,
  onDone,
}: {
  assets: string[];
  onDone: () => void;
}) {
  const unique = useMemo(() => Array.from(new Set(assets)), [assets]);
  const [p, setP] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      let done = 0;
      for (const url of unique) {
        try {
          await preload(url);
        } catch {
          // ignore missing assets
        }
        done += 1;
        if (mounted) setP(Math.round((done / unique.length) * 100));
      }
      if (!mounted) return;
      setTimeout(() => onDone(), 300);
    })();
    return () => {
      mounted = false;
    };
  }, [unique, onDone]);

  return (
    <motion.div
      className="absolute inset-0 z-[80] grid place-items-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-[min(520px,92vw)] rounded-3xl glass neon-border p-6 relative overflow-hidden">
        <div className="absolute inset-0 noise scanlines" />
        <div className="relative">
          <div className="text-xs tracking-[0.45em] opacity-80">LOADING</div>
          <div className="mt-2 text-3xl tracking-[0.25em] neon-text">VLADDOS</div>

          <div className="mt-6 h-[2px] w-full bg-white/10 rounded overflow-hidden">
            <div
              className="h-full bg-[rgba(255,0,60,.95)] shadow-[0_0_18px_rgba(255,0,60,.65)]"
              style={{ width: `${p}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] tracking-[0.35em] opacity-70">
            <span>ASSETS</span>
            <span>{p}%</span>
          </div>

          <div className="mt-6 text-[10px] tracking-[0.35em] opacity-60">
            Tip: включи звук снизу слева.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
