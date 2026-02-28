"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesFX({ density = 1 }: { density?: number }) {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={init}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: {
  value: Math.round(120 * density),
  density: { enable: true, width: 900, height: 900 },
},
          color: { value: ["#ff003c", "#ffffff"] },
          opacity: { value: { min: 0.04, max: 0.16 } },
          size: { value: { min: 1, max: 2 } },
          move: { enable: true, speed: 0.28, direction: "none", outModes: { default: "out" } },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 70, duration: 0.2 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0"
    />
  );
}
