"use client";

import { Howl } from "howler";
import { useEffect, useMemo, useState } from "react";

function safeHowl(opts: any) {
  try {
    return new Howl(opts);
  } catch {
    return null;
  }
}

export default function AudioController() {
  const [enabled, setEnabled] = useState(false);
  const [armed, setArmed] = useState(false);

  const ambient = useMemo(
    () => safeHowl({ src: ["/assets/audio/ambient.mp3"], loop: true, volume: 0.35 }),
    []
  );
  const click = useMemo(
    () => safeHowl({ src: ["/assets/audio/click.mp3"], volume: 0.35 }),
    []
  );

  useEffect(() => {
    const onAny = () => setArmed(true);
    window.addEventListener("pointerdown", onAny, { once: true });
    return () => window.removeEventListener("pointerdown", onAny);
  }, []);

  useEffect(() => {
    if (!armed || !ambient) return;
    if (enabled) ambient.play();
    else ambient.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, armed]);

  useEffect(() => {
    const handler = () => {
      if (enabled && click) click.play();
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [enabled, click]);

  return (
    <button
      onClick={() => setEnabled((v) => !v)}
      className="absolute bottom-6 left-6 z-50 flex items-center gap-2 text-[10px] tracking-[0.35em] opacity-80 hover:opacity-100"
    >
      <span className="inline-block h-2 w-2 rounded-full bg-[rgba(255,0,60,.9)] shadow-[0_0_18px_rgba(255,0,60,.8)]" />
      {enabled ? "SOUND ON" : "SOUND OFF"}
    </button>
  );
}
