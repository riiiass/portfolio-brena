"use client";

import { useEffect, useState } from "react";
import { emit } from "@/lib/events";
import { Icon } from "./Icon";

/** Barra de busca do hero (ref. C) = atalho visível para o ⌘K */
export function SearchTrigger() {
  const [mac, setMac] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- detecção de plataforma só existe no cliente
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);
  return (
    <button
      type="button"
      onClick={() => emit("palette:open")}
      aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
      data-cursor="buscar"
      className="group border-line bg-surface text-muted hover:border-fg flex min-h-[52px] w-full max-w-[460px] items-center gap-3 rounded-full border-[1.5px] py-2 pr-2.5 pl-5 text-left text-[15px] shadow-[6px_8px_0_-2px_var(--shadow)] transition-[border-color,transform] duration-150 active:scale-[.99]"
    >
      <Icon
        name="search"
        size={18}
        strokeWidth={2}
        className="text-fg transition-transform duration-300 group-hover:-rotate-12"
      />
      <span className="flex-1">Buscar projetos, stack, seções…</span>
      <kbd className="bg-fg text-bg rounded-full px-3 py-1.5 font-mono text-xs">
        {mac ? "⌘ K" : "Ctrl K"}
      </kbd>
    </button>
  );
}
