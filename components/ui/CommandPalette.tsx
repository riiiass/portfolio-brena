"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { navSections } from "@/content/pt/sections";
import { projects, technologies } from "@/content/pt/projects";
import { usePrefs } from "@/components/providers/Preferences";
import { copyEmail, emit } from "@/lib/events";
import { scrollToId } from "@/lib/scroll";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Action =
  | { kind: "section" | "route"; target: string }
  | { kind: "email" | "cv" | "cvEn" | "theme" | "wireframe" | "inspect" | "motion" };
type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: IconName;
  keywords?: string;
  action: Action;
};

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * ⌘K / Ctrl+K: busca seções, projetos e tecnologias, e executa ações.
 * Padrão combobox + listbox (WAI-ARIA), totalmente operável por teclado.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const prefs = usePrefs();
  const listId = useId();

  const close = useCallback(() => {
    setOpen(false);
    restoreRef.current?.focus?.();
  }, []);

  const openPalette = useCallback(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setIndex(0);
    setOpen(true);
    window.dispatchEvent(new Event("cursor:reset"));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else openPalette();
      }
    };
    const onOpen = () => openPalette();
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, [open, close, openPalette]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const items: Item[] = useMemo(
    () => [
      ...navSections.map((s) => ({
        id: `s-${s.id}`,
        group: "Seções",
        label: s.label,
        icon: s.icon,
        action: { kind: "section" as const, target: s.id },
      })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: "Projetos",
        label: p.title,
        hint: p.categories.join(" · "),
        icon: "folder" as const,
        keywords: `${p.summary} ${p.stack.join(" ")}`,
        action: { kind: "route" as const, target: `/projetos/${p.slug}` },
      })),
      ...technologies.map((t) => ({
        id: `t-${t}`,
        group: "Tecnologias",
        label: t,
        hint: "ver projetos",
        icon: "code" as const,
        action: { kind: "section" as const, target: "projetos" },
      })),
      {
        id: "a-email",
        group: "Ações",
        label: "Copiar e-mail",
        hint: site.email,
        icon: "copy",
        action: { kind: "email" },
      },
      {
        id: "a-cv",
        group: "Ações",
        label: "Baixar CV (PDF)",
        icon: "download",
        keywords: "curriculo resume",
        action: { kind: "cv" },
      },
      {
        id: "a-cv-en",
        group: "Ações",
        label: "Download CV (English)",
        icon: "download",
        keywords: "curriculo resume ingles english",
        action: { kind: "cvEn" },
      },
      {
        id: "a-theme",
        group: "Ações",
        label: prefs.theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro",
        icon: prefs.theme === "dark" ? "sun" : "moon",
        keywords: "tema escuro claro dark light preto branco",
        action: { kind: "theme" },
      },
      {
        id: "a-wire",
        group: "Ações",
        label: prefs.wireframe ? "Sair do Modo Wireframe" : "Alternar Modo Wireframe",
        icon: "wireframe",
        action: { kind: "wireframe" },
      },
      {
        id: "a-inspect",
        group: "Ações",
        label: prefs.inspect ? "Sair do Modo Inspeção" : "Modo Inspeção (tecla I)",
        icon: "inspect",
        action: { kind: "inspect" },
      },
      {
        id: "a-motion",
        group: "Ações",
        label: prefs.reducedMotion ? "Ativar animações" : "Reduzir movimento",
        icon: "motion",
        keywords: "acessibilidade animacao movimento",
        action: { kind: "motion" },
      },
    ],
    [prefs.theme, prefs.wireframe, prefs.inspect, prefs.reducedMotion],
  );

  const run = (item: Item) => {
    close();
    const a = item.action;
    switch (a.kind) {
      case "section":
        setTimeout(() => scrollToId(a.target), 60);
        break;
      case "route":
        router.push(a.target);
        break;
      case "email":
        void copyEmail(site.email);
        break;
      case "cv":
        window.open(site.cvUrl, "_blank");
        break;
      case "cvEn":
        window.open(site.cvUrlEn, "_blank");
        break;
      case "theme":
        prefs.toggleTheme();
        break;
      case "wireframe":
        prefs.toggleWireframe();
        emit("toast", prefs.wireframe ? "Modo Wireframe desligado" : "Modo Wireframe ligado");
        break;
      case "inspect":
        prefs.toggleInspect();
        emit("toast", prefs.inspect ? "Modo Inspeção desligado" : "Modo Inspeção ligado");
        break;
      case "motion":
        prefs.toggleReducedMotion();
        emit("toast", prefs.reducedMotion ? "Animações ativadas" : "Movimento reduzido");
        break;
    }
  };

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return items.filter((i) => i.group !== "Tecnologias");
    return items.filter((i) =>
      norm(`${i.label} ${i.hint ?? ""} ${i.keywords ?? ""} ${i.group}`).includes(q),
    );
  }, [items, query]);

  const safeIndex = Math.min(index, Math.max(filtered.length - 1, 0));
  const activeItem = filtered[safeIndex];

  const onListClick = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-index]");
    const item = el ? filtered[Number(el.dataset.index)] : undefined;
    if (item) run(item);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((safeIndex + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((safeIndex - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeItem) run(activeItem);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      e.preventDefault(); // foco preso no diálogo
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="bg-ink/40 fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefs.reducedMotion ? 0 : 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Busca e comandos"
            className="border-line bg-surface text-fg w-full max-w-xl overflow-hidden rounded-[28px] border shadow-[0_30px_80px_-20px_rgb(0_0_0/.5)]"
            // orientação: o painel "cai" da barra de busca
            initial={{ y: -16, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -8, scale: 0.98, opacity: 0 }}
            transition={
              prefs.reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 28 }
            }
            onKeyDown={onKeyDown}
          >
            <div className="border-line flex items-center gap-3 border-b px-5">
              <Icon name="search" size={18} />
              <input
                ref={inputRef}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={activeItem ? `cmd-${activeItem.id}` : undefined}
                aria-autocomplete="list"
                aria-label="Buscar projetos, tecnologias, seções ou ações"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder="Buscar projetos, stack, seções…"
                className="placeholder:text-muted h-16 flex-1 bg-transparent text-base outline-none"
              />
              <kbd className="border-line text-muted rounded-full border px-2.5 py-1 font-mono text-[11px]">
                esc
              </kbd>
            </div>
            <ul
              id={listId}
              role="listbox"
              onClick={onListClick}
              aria-label="Resultados"
              className="max-h-[min(60vh,440px)] overflow-y-auto p-2"
            >
              {filtered.length === 0 ? (
                <li className="text-muted px-4 py-8 text-center text-sm">
                  Nada encontrado para “{query}”.
                </li>
              ) : (
                filtered.map((item, i) => {
                  const header = item.group !== lastGroup ? item.group : null;
                  lastGroup = item.group;
                  const selected = i === safeIndex;
                  return (
                    <li key={item.id} role="presentation">
                      {header ? (
                        <p
                          className="label-mono text-muted px-3 pt-3 pb-1.5 text-[10px]"
                          aria-hidden="true"
                        >
                          {header}
                        </p>
                      ) : null}
                      <div
                        id={`cmd-${item.id}`}
                        role="option"
                        aria-selected={selected}
                        onMouseMove={() => setIndex(i)}
                        data-index={i}
                        className={cn(
                          "flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 transition-colors duration-150",
                          selected ? "bg-fg text-bg" : "text-fg",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full",
                            selected ? "bg-bg/15" : "bg-bg",
                          )}
                        >
                          <Icon name={item.icon} size={16} />
                        </span>
                        <span className="flex-1 truncate text-[15px] font-medium">
                          {item.label}
                        </span>
                        {item.hint ? (
                          <span
                            className={cn(
                              "truncate text-xs",
                              selected ? "opacity-80" : "text-muted",
                            )}
                          >
                            {item.hint}
                          </span>
                        ) : null}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
            <div className="border-line text-muted flex items-center gap-4 border-t px-5 py-3 font-mono text-[11px]">
              <span>↑↓ navegar</span>
              <span>↵ abrir</span>
              <span className="ml-auto">⌘K / Ctrl+K</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
