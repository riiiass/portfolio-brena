"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Peças que não aparecem no primeiro frame: carregadas sob demanda, fora da hidratação
 * inicial (menos JavaScript bloqueando a thread principal → melhor INP/TBT).
 */
const CommandPalette = dynamic(
  () => import("@/components/ui/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false },
);
const Modes = dynamic(() => import("@/components/modes/Modes").then((m) => m.Modes), {
  ssr: false,
});
const EasterEgg = dynamic(() => import("@/components/modes/EasterEgg").then((m) => m.EasterEgg), {
  ssr: false,
});
const Cursor = dynamic(() => import("@/components/ui/Cursor").then((m) => m.Cursor), {
  ssr: false,
});

export function LazyChrome() {
  const [palette, setPalette] = useState<"off" | "on" | "open">("off");

  useEffect(() => {
    if (palette !== "off") return;
    // pré-carrega quando o navegador fica ocioso…
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const idle = w.requestIdleCallback
      ? w.requestIdleCallback(() => setPalette("on"))
      : window.setTimeout(() => setPalette("on"), 2500);
    // …mas um ⌘K (ou o botão de busca) antes disso não se perde: carrega e já abre
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette("open");
      }
    };
    const onOpen = () => setPalette("open");
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
      if (typeof idle === "number") window.clearTimeout(idle);
    };
  }, [palette]);

  return (
    <>
      {palette !== "off" ? <CommandPalette initialOpen={palette === "open"} /> : null}
      <Cursor />
      <Modes />
      <EasterEgg />
    </>
  );
}
