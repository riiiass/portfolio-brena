"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefs } from "@/components/providers/Preferences";

/** feedback: o alvo "puxa" levemente o elemento em direção ao ponteiro (só pointer: fine) */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reducedMotion } = usePrefs();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reducedMotion || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      ref={ref}
      className={className ?? "inline-block"}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.span>
  );
}
