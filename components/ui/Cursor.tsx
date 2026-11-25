"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { usePrefs } from "@/components/providers/Preferences";

/**
 * Bolinha que segue o ponteiro e troca de rótulo conforme o alvo:
 * qualquer elemento com data-cursor="ver" | "arrastar" | "abrir" | "copiar".
 * Só em pointer: fine e com movimento liberado.
 */
export function Cursor() {
  const { reducedMotion } = usePrefs();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [blend, setBlend] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches && !reducedMotion);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;
    let last = { x: -100, y: -100 };
    const read = (t: Element | null) => {
      const el = t as HTMLElement | null;
      setLabel(el?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? null);
      setBlend(Boolean(el?.closest("[data-cursor-blend]")));
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      read(e.target as Element);
    };
    // o alvo muda debaixo do ponteiro parado quando a página rola
    const onScroll = () => read(document.elementFromPoint(last.x, last.y));
    const reset = () => {
      setLabel(null);
      setBlend(false);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("cursor:reset", reset);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("cursor:reset", reset);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-dot"
      style={{ x, y, mixBlendMode: blend ? "difference" : "normal" }}
    >
      {/* feedback: cresce e mostra o que o clique vai fazer */}
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-[10px] tracking-[.15em] uppercase"
        animate={{
          width: label ? 76 : blend ? 64 : 12,
          height: label ? 76 : blend ? 64 : 12,
          opacity: visible ? 1 : 0,
          backgroundColor: blend ? "#ffffff" : label ? "#2f6bff" : "var(--fg)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-white"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
