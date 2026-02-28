"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesFX({ density = 1 }: { density?: number }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (mounted) setReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) return null;

  return (
    <Particles
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
          move: {
            enable: true,
            speed: 0.28,
            direction: "none",
            outModes: { default: "out" },
          },
        },

        interactivity: {
          events: { onHover: { enable: true, mode: ["repulse"] } },
          modes: { repulse: { distance: 70, duration: 0.2 } },
        },

        detectRetina: true,
      }}
      className="absolute inset-0"
    />
  );
}
