"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefs } from "@/components/providers/Preferences";

/**
 * Marquee infinito que desacelera no hover (deleite + leitura).
 * Pausa fora da viewport e com a aba oculta. Com reduced motion vira uma faixa estática rolável.
 */
export function Marquee({
  children,
  speed = 60,
  className,
  label,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  label: string;
}) {
  const { reducedMotion } = usePrefs();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const w = wrap.current;
    const t = track.current;
    if (!w || !t) return;
    let x = 0;
    let current = speed;
    let target = speed;
    let last = performance.now();
    let raf = 0;
    let visible = false;

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      current += (target - current) * 0.08; // desacelera suave
      x -= current * dt;
      const half = t.scrollWidth / 2;
      if (-x >= half) x += half;
      t.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
      if (visible) start();
      else stop();
    });
    io.observe(w);
    const onVis = () => (document.hidden ? stop() : start());
    const slow = () => (target = speed * 0.18);
    const fast = () => (target = speed);
    document.addEventListener("visibilitychange", onVis);
    w.addEventListener("pointerenter", slow);
    w.addEventListener("pointerleave", fast);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      w.removeEventListener("pointerenter", slow);
      w.removeEventListener("pointerleave", fast);
    };
  }, [reducedMotion, speed]);

  return (
    <div
      ref={wrap}
      className={`overflow-hidden ${className ?? ""}`}
      role="region"
      aria-label={label}
    >
      {reducedMotion ? (
        <div className="flex flex-wrap items-center justify-center gap-y-2">{children}</div>
      ) : (
        <div ref={track} className="marquee-track">
          <div className="flex shrink-0 items-center">{children}</div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
