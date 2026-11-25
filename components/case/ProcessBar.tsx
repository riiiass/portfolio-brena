"use client";

import { m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { scrollToId } from "@/lib/scroll";
import { phases } from "./phases";

/**
 * Pílulas do Double Diamond que se preenchem conforme a leitura avança (orientação: "onde estou no processo").
 * O preenchimento é ligado ao scroll (não é animação temporal), então continua útil com reduced motion.
 */
export function ProcessBar() {
  const [fill, setFill] = useState<number[]>(phases.map(() => 0));
  const raf = useRef(0);

  useEffect(() => {
    const compute = () => {
      raf.current = 0;
      const mid = window.innerHeight * 0.55;
      setFill(
        phases.map((p) => {
          const els = document.querySelectorAll<HTMLElement>(`[data-phase="${p.id}"]`);
          if (!els.length) return 0;
          const top = els[0]!.getBoundingClientRect().top;
          const bottom = els[els.length - 1]!.getBoundingClientRect().bottom;
          return Math.max(0, Math.min(1, (mid - top) / Math.max(bottom - top, 1)));
        }),
      );
    };
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const current = fill.reduce((acc, f, i) => (f > 0 ? i : acc), 0);

  return (
    <nav aria-label="Etapas do processo (Double Diamond)" className="sticky top-3 z-30 md:top-24">
      <ol className="border-line bg-surface/90 mx-auto flex w-fit max-w-full [scrollbar-width:none] gap-1.5 overflow-x-auto rounded-full border p-1.5 shadow-[0_10px_30px_-18px_var(--shadow)] backdrop-blur">
        {phases.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              aria-current={current === i ? "step" : undefined}
              onClick={() => {
                const el = document.querySelector<HTMLElement>(`[data-phase="${p.id}"]`);
                if (el) {
                  if (!el.id) el.id = `fase-${p.id}`;
                  scrollToId(el.id);
                }
              }}
              className="border-fg relative flex min-h-10 items-center overflow-hidden rounded-full border-[1.5px] px-2 font-mono text-[10px] tracking-[.04em] uppercase sm:px-4 sm:text-[11px] sm:tracking-[.15em]"
            >
              <m.span
                aria-hidden="true"
                className="bg-fg absolute inset-0 origin-left"
                style={{ scaleX: fill[i] ?? 0 }}
              />
              <span className="relative text-white mix-blend-difference">{p.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
