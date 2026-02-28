"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import ParticlesFX from "./ParticlesFX";
import Hotspots from "./Hotspots";
import Dock from "./Dock";
import Preloader from "./Preloader";

function usePerfTier() {
  const [tier, setTier] = useState<"low" | "mid" | "high">("high");
  useEffect(() => {
    const dm = (navigator as any).deviceMemory ?? 8;
    const hc = navigator.hardwareConcurrency ?? 8;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce || dm <= 4 || hc <= 4) setTier("low");
    else if (dm <= 6 || hc <= 6) setTier("mid");
    else setTier("high");
  }, []);
  return tier;
}

export default function HeroScene() {
  const tier = usePerfTier();
  const [loaded, setLoaded] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });

  const strengths = useMemo(() => {
    if (tier === "low") return { bg: 2, char: 4, logo: 6, ui: 3 };
    if (tier === "mid") return { bg: 6, char: 12, logo: 14, ui: 8 };
    return { bg: 10, char: 22, logo: 26, ui: 12 };
  }, [tier]);

  // ✅ вместо sx.to(...) / sy.to(...)
  const logoX = useTransform(sx, (v) => -v * strengths.logo);
  const logoY = useTransform(sy, (v) => -v * strengths.logo);

  const charX = useTransform(sx, (v) => -v * strengths.char);
  const charY = useTransform(sy, (v) => -v * strengths.char);

  const uiX = useTransform(sx, (v) => -v * strengths.ui);
  const uiY = useTransform(sy, (v) => -v * strengths.ui);

  const assets = useMemo(
    () => ["/assets/hero/bg.png", "/assets/hero/logo.png", "/assets/hero/character.png"],
    []
  );

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      onMouseMove={(e) => {
        const { innerWidth: w, innerHeight: h } = window;
        const x = (e.clientX / w - 0.5) * 2;
        const y = (e.clientY / h - 0.5) * 2;
        mx.set(x);
        my.set(y);
      }}
    >
      {!loaded && <Preloader assets={assets} onDone={() => setLoaded(true)} />}

      {/* background scene */}
      <div className="absolute inset-0">
        <Image src="/assets/hero/bg.png" alt="Background" fill priority className="object-cover" />
        {/* cinematic grading */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,0,60,.22),transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.55),rgba(0,0,0,.35),rgba(0,0,0,.72))]" />
      </div>

      {/* particles */}
      {tier !== "low" && (
        <div className="absolute inset-0">
          <ParticlesFX density={tier === "high" ? 1 : 0.65} />
        </div>
      )}

      {/* film overlay */}
      <div className="absolute inset-0 noise scanlines" />

      {/* parallax logo */}
      <motion.div
        className="absolute left-1/2 top-[10%] -translate-x-1/2 pointer-events-none"
        style={{ x: logoX, y: logoY }}
      >
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -18 }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
        >
          <Image
            src="/assets/hero/logo.png"
            alt="VLADDOS"
            width={1100}
            height={350}
            className="w-[260px] sm:w-[380px] md:w-[520px] h-auto drop-shadow-[0_0_30px_rgba(255,0,60,.45)]"
          />
          <div className="absolute inset-0 blur-2xl opacity-35 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,60,.85),transparent_62%)]" />
        </motion.div>
      </motion.div>

      {/* parallax character overlay (adds depth on top of background) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: charX, y: charY }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{
            opacity: loaded ? 0.55 : 0,
            scale: loaded ? 1 : 0.96,
            y: loaded ? 0 : 20,
          }}
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative w-[240px] sm:w-[320px] md:w-[380px] lg:w-[430px]"
        >
          <Image
            src="/assets/hero/character.png"
            alt="Character overlay"
            width={900}
            height={900}
            className="w-full h-auto mix-blend-screen opacity-90 drop-shadow-[0_0_35px_rgba(255,0,60,.25)]"
          />
        </motion.div>
      </motion.div>

      {/* UI hotspots */}
      <motion.div className="absolute inset-0 z-30" style={{ x: uiX, y: uiY }}>
        <Hotspots />
      </motion.div>

      {/* bottom hint */}
      <div className="absolute bottom-6 left-0 right-0 z-40 flex flex-col items-center gap-2 opacity-80">
        <div className="text-[10px] tracking-[0.45em]">SCROLL TO EXPLORE</div>
        <div className="h-10 w-10 rounded-full neon-border grid place-items-center glass">
          <span className="text-lg leading-none">⌄</span>
        </div>
      </div>

      <Dock />
    </section>
  );
}
