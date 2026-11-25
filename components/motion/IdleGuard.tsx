"use client";

import { useEffect } from "react";

/**
 * Pausa toda animação idle (CSS) quando a aba fica oculta.
 * Seções fora da viewport pausam via data-idle="off" (ver useInView nas seções).
 */
export function IdleGuard() {
  useEffect(() => {
    const on = () => {
      document.documentElement.dataset.tab = document.hidden ? "hidden" : "visible";
    };
    on();
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return null;
}
