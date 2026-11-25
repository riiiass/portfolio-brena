"use client";

import { useEffect } from "react";
import { usePrefs } from "@/components/providers/Preferences";
import { loadGsap } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

/**
 * Lenis + ScrollTrigger no mesmo relógio (gsap.ticker).
 * Desligado quando o usuário pede menos movimento. Carregado quando o navegador fica ocioso.
 */
export function SmoothScroll() {
  const { reducedMotion } = usePrefs();

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let cleanup = () => {};

    const start = async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        loadGsap(),
      ]);
      if (cancelled) return;
      const lenis = new Lenis({ duration: 1.1, anchors: { offset: -24 }, autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    };

    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => void start());
    else setTimeout(() => void start(), 200);

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reducedMotion]);

  return null;
}
