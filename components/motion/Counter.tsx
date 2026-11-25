"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefs } from "@/components/providers/Preferences";

/** hierarquia + deleite: o número conta até o valor ao entrar na tela (estado final com reduced motion) */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const { reducedMotion } = usePrefs();
  const [shown, setShown] = useState(0);
  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- estado final direto, sem animação
      setShown(value);
      return;
    }
    const c = animate(0, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: setShown });
    return () => c.stop();
  }, [inView, reducedMotion, value]);

  return (
    <span ref={ref}>
      {/* leitores de tela recebem o valor final, não a contagem */}
      <span aria-hidden="true">
        {prefix}
        {fmt(shown)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {fmt(value)}
        {suffix}
      </span>
    </span>
  );
}
