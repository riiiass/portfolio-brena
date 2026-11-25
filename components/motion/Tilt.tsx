"use client";

import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { usePrefs } from "@/components/providers/Preferences";

/** deleite: tilt 3D sutil seguindo o mouse (só pointer de mouse, desligado com reduced motion) */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const { reducedMotion } = usePrefs();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 20 });

  return (
    <m.div
      className={className}
      style={reducedMotion ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (reducedMotion || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {children}
    </m.div>
  );
}
