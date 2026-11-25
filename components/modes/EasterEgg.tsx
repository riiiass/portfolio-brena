"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefs } from "@/components/providers/Preferences";
import { emit } from "@/lib/events";
import { getContent } from "@/content";
import { useLocale } from "@/lib/use-locale";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
const COLORS = ["#f7a8c4", "#ff9a4d", "#8db8f2", "#c8eb6a", "#f2c6d0"];
const LABELS = [
  "projetos_01",
  "cases_ux_02",
  "codigo_03",
  "sobre_04",
  "deleite.zip",
  "ux.fig",
  "api.ts",
  "amor.css",
];
const W = 120;
const H = 92;

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  vr: number;
};

/**
 * deleite: Konami code ou 5 cliques no avatar soltam pastas com física simples
 * (gravidade, quique nas bordas, atrito e empilhamento aproximado). Some sozinho.
 */
export function EasterEgg() {
  const t = getContent(useLocale()).t;
  const { reducedMotion } = usePrefs();
  const [run, setRun] = useState(0);
  const [count, setCount] = useState(0);
  const bodies = useRef<Body[]>([]);
  const els = useRef<(HTMLDivElement | null)[]>([]);

  // gatilhos
  useEffect(() => {
    let seq: string[] = [];
    let clicks: number[] = [];
    const fire = () => {
      if (reducedMotion) {
        emit("toast", t.eggReduced);
        return;
      }
      emit("toast", t.egg);
      setCount(Math.min(16, Math.max(8, Math.floor(window.innerWidth / 90))));
      setRun((n) => n + 1);
    };
    const onKey = (e: KeyboardEvent) => {
      seq = [...seq, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      if (seq.join() === KONAMI.join()) {
        seq = [];
        fire();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-easter="avatar"]')) return;
      const now = performance.now();
      clicks = [...clicks.filter((t) => now - t < 2000), now];
      if (clicks.length >= 5) {
        clicks = [];
        fire();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [reducedMotion, t]);

  // simulação
  useEffect(() => {
    if (!run) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    bodies.current = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * (vw - W),
      y: -H - i * 70 - Math.random() * 120,
      vx: (Math.random() - 0.5) * 6,
      vy: 0,
      r: (Math.random() - 0.5) * 40,
      vr: (Math.random() - 0.5) * 8,
    }));
    let raf = 0;
    let last = performance.now();
    const start = last;
    const step = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 2);
      last = now;
      const bs = bodies.current;
      for (const b of bs) {
        b.vy += 0.55 * dt; // gravidade
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.r += b.vr * dt;
        if (b.y + H > vh) {
          b.y = vh - H;
          b.vy *= -0.38; // quique
          b.vx *= 0.86; // atrito
          b.vr *= 0.7;
          if (Math.abs(b.vy) < 1) b.vy = 0;
        }
        if (b.x < 0 || b.x + W > vw) {
          b.x = Math.max(0, Math.min(vw - W, b.x));
          b.vx *= -0.6;
        }
      }
      // empilhamento aproximado: separa pares sobrepostos
      for (let i = 0; i < bs.length; i++)
        for (let j = i + 1; j < bs.length; j++) {
          const a = bs[i]!;
          const c = bs[j]!;
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          if (Math.abs(dx) < W * 0.8 && Math.abs(dy) < H * 0.75) {
            const push = (H * 0.75 - Math.abs(dy)) / 2;
            if (dy > 0) {
              a.y -= push;
              a.vy = Math.min(a.vy, 0);
            } else {
              c.y -= push;
              c.vy = Math.min(c.vy, 0);
            }
            a.vx -= Math.sign(dx || 1) * 0.15;
            c.vx += Math.sign(dx || 1) * 0.15;
          }
        }
      bs.forEach((b, i) => {
        const el = els.current[i];
        if (el) el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) rotate(${b.r}deg)`;
      });
      if (now - start < 7000) raf = requestAnimationFrame(step);
      else setRun(0);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, count]);

  if (!run) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[88] overflow-hidden"
      key={run}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            els.current[i] = el;
          }}
          className="absolute top-0 left-0"
          style={{ width: W, transform: "translate3d(-200px,-200px,0)" }}
        >
          <span
            className="block h-[14px] w-12 rounded-t-[8px]"
            style={{ background: COLORS[i % COLORS.length] }}
          />
          <span
            className="text-ink flex h-[78px] items-end rounded-[0_12px_12px_12px] p-2.5 font-mono text-[10px] shadow-[0_10px_20px_-10px_rgb(0_0_0/.5)]"
            style={{ background: COLORS[i % COLORS.length] }}
          >
            {LABELS[i % LABELS.length]}
          </span>
        </div>
      ))}
    </div>
  );
}
