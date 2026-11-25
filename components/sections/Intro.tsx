"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/lib/scroll";

const DURATION = 1500; // contador; a saída leva +300ms → máx. 1,8s
const NAME = "BRENA ANGELO";
const FOLDERS = [
  { color: "bg-folder-pink", r0: "-25deg", r1: "-6deg" },
  { color: "bg-folder-orange", r0: "20deg", r1: "4deg" },
  { color: "bg-folder-lime", r0: "-15deg", r1: "-2deg" },
  { color: "bg-blush", r0: "30deg", r1: "7deg" },
];

/**
 * Intro da 1ª visita (sessionStorage). Pulável por clique, Enter ou Esc.
 * Renderizada no HTML do servidor e escondida por CSS quando não deve aparecer,
 * para não piscar o hero antes.
 */
export function Intro() {
  const countRef = useRef<HTMLParagraphElement>(null);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro === "skip") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- desmonta a intro que o CSS já escondeu
      setGone(true);
      return;
    }
    getLenis()?.stop();
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // easeOutCubic: o contador desacelera perto do 100 (orientação: "quase pronto")
      if (countRef.current)
        countRef.current.textContent = String(Math.round((1 - (1 - p) ** 3) * 100)).padStart(
          3,
          "0",
        );
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function finish() {
    if (done.current) return;
    done.current = true;
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (countRef.current) countRef.current.textContent = "100";
    setLeaving(true);
    // hierarquia: o hero começa a entrar enquanto a cortina sobe
    document.documentElement.dataset.hero = "go";
    setTimeout(() => {
      setGone(true);
      document.documentElement.dataset.intro = "skip";
      getLenis()?.start();
    }, 650);
  }

  if (gone) return null;

  return (
    <div
      className="intro bg-ink text-paper fixed inset-0 z-[100] flex flex-col justify-between p-6 md:p-10"
      style={{
        clipPath: leaving ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
        transition: "clip-path 650ms cubic-bezier(.65,0,.35,1)",
      }}
      role="presentation"
    >
      <div className="flex items-start justify-between">
        <span className="label-mono text-[11px] text-[#cfc9c0]">
          Portfólio · {new Date().getFullYear()}
        </span>
        <button
          type="button"
          onClick={finish}
          className="border-paper/50 hover:border-paper min-h-11 rounded-full border-[1.5px] px-4 font-mono text-xs tracking-[.2em] transition-colors"
        >
          PULAR ↵
        </button>
      </div>

      {/* as pastas caem e se empilham */}
      <div className="relative mx-auto h-40 w-44" aria-hidden="true">
        {FOLDERS.map((f, i) => (
          <span
            key={i}
            className="intro-folder absolute inset-x-0 block"
            style={{
              bottom: i * 10,
              ["--i" as string]: i,
              ["--r0" as string]: f.r0,
              ["--r1" as string]: f.r1,
            }}
          >
            <span className={`block h-4 w-14 rounded-t-[9px] ${f.color}`} />
            <span
              className={`block h-24 rounded-[0_14px_14px_14px] ${f.color} shadow-[0_-6px_18px_-8px_rgb(0_0_0/.5)]`}
            />
          </span>
        ))}
      </div>

      <div className="flex items-end justify-between gap-6">
        <p
          className="font-display overflow-hidden text-[clamp(2.5rem,9vw,7rem)] leading-[.9]"
          aria-label={NAME}
        >
          {NAME.split("").map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="intro-letter"
              style={{ ["--i" as string]: i }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </p>
        <p
          ref={countRef}
          className="font-mono text-[clamp(2rem,6vw,4.5rem)] leading-none tabular-nums"
          aria-hidden="true"
        >
          000
        </p>
      </div>
    </div>
  );
}
