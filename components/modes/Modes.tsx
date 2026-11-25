"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefs } from "@/components/providers/Preferences";
import { emit } from "@/lib/events";
import { contrast } from "@/lib/contrast";
import { Icon } from "@/components/ui/Icon";
import { getContent } from "@/content";
import { useLocale } from "@/lib/use-locale";

type Info = {
  rect: { x: number; y: number; w: number; h: number };
  name: string;
  font: string;
  color: string;
  bg: string;
  ratio: number | null;
  padding: string;
};

const typing = (t: EventTarget | null) =>
  t instanceof HTMLElement &&
  (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));

function toHex(rgb: string) {
  const m = rgb.match(/\d+(\.\d+)?/g);
  if (!m || m.length < 3) return null;
  if (m.length === 4 && Number(m[3]) === 0) return null;
  return (
    "#" +
    m
      .slice(0, 3)
      .map((v) => Math.round(Number(v)).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** fundo efetivo: sobe na árvore até achar uma cor opaca */
function effectiveBg(el: Element | null): string {
  while (el) {
    const hex = toHex(getComputedStyle(el).backgroundColor);
    if (hex) return hex;
    el = el.parentElement;
  }
  return toHex(getComputedStyle(document.body).backgroundColor) ?? "#f4f1ec";
}

const PICK =
  "[data-component], h1, h2, h3, h4, p, a, button, img, input, textarea, label, li, figure, article, section, nav, header, footer";

function describe(el: HTMLElement): Info {
  const target = el.closest<HTMLElement>(PICK) ?? el;
  const r = target.getBoundingClientRect();
  const cs = getComputedStyle(target);
  const comp = target.closest<HTMLElement>("[data-component]")?.dataset.component;
  const tag = target.tagName.toLowerCase();
  const cls =
    target.className && typeof target.className === "string" ? target.className.split(" ")[0] : "";
  const name =
    comp && target.dataset.component
      ? `<${comp}>`
      : `<${tag}>${comp ? ` em ${comp}` : cls && !cls.includes("[") ? ` .${cls}` : ""}`;
  const family = cs.fontFamily
    .split(",")[0]!
    .replace(/["']/g, "")
    .replace(/^__|_Fallback.*$|_[a-f0-9]+$/g, "");
  const color = toHex(cs.color) ?? "#000000";
  const bg = effectiveBg(target);
  return {
    rect: { x: r.left, y: r.top, w: r.width, h: r.height },
    name,
    font: `${family || "sans"} ${Math.round(parseFloat(cs.fontSize))}px / ${cs.fontWeight}`,
    color,
    bg,
    ratio: contrast(color, bg),
    padding: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft]
      .map((v) => Math.round(parseFloat(v)))
      .join(" "),
  };
}

/** Grid de 12 colunas alinhado ao container do site */
function Grid() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[85]">
      <div className="mx-auto grid h-full max-w-[1240px] grid-cols-4 gap-4 px-4 md:grid-cols-12 md:gap-6 md:px-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`bg-select/[.06] outline-select/20 h-full outline outline-1 ${i >= 4 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

function Inspector() {
  const [info, setInfo] = useState<Info | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    const pick = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement) || el.closest("[data-inspector]")) return;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setInfo(describe(el)));
    };
    const onMove = (e: PointerEvent) => pick(e.target);
    const onFocus = (e: FocusEvent) => pick(e.target);
    const onScroll = () => setInfo(null);
    window.addEventListener("pointerover", onMove);
    window.addEventListener("focusin", onFocus);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("pointerover", onMove);
      window.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!info) return null;
  const { x, y, w, h } = info.rect;
  const below = y < 140;
  const handle = "absolute size-[9px] border-[1.5px] border-select bg-white";
  const pass = info.ratio !== null && info.ratio >= 4.5;

  return (
    <div aria-hidden="true" data-inspector className="pointer-events-none fixed inset-0 z-[86]">
      {/* feedback: a caixa de seleção azul acompanha o elemento */}
      <m.div
        className="border-select absolute border-[1.5px]"
        initial={false}
        animate={{ left: x - 3, top: y - 3, width: w + 6, height: h + 6 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      >
        <span className={`${handle} -top-[5px] -left-[5px]`} />
        <span className={`${handle} -top-[5px] -right-[5px]`} />
        <span className={`${handle} -bottom-[5px] -left-[5px]`} />
        <span className={`${handle} -right-[5px] -bottom-[5px]`} />
        <span className="bg-select-strong absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-white">
          {Math.round(w)} × {Math.round(h)}
        </span>
      </m.div>
      <div
        className="bg-ink text-paper absolute w-[260px] rounded-xl p-3 font-mono text-[11px] leading-[1.7] shadow-xl"
        style={{
          left: Math.min(Math.max(8, x), window.innerWidth - 268),
          top: below ? Math.min(y + h + 34, window.innerHeight - 150) : Math.max(8, y - 142),
        }}
      >
        <div className="text-folder-blue truncate">{info.name}</div>
        <div className="truncate">fonte: {info.font}</div>
        <div className="flex items-center gap-1.5">
          cor:{" "}
          <span
            className="border-paper/40 size-2.5 rounded-sm border"
            style={{ background: info.color }}
          />{" "}
          {info.color}
          <span className="opacity-60">sobre</span>
          <span
            className="border-paper/40 size-2.5 rounded-sm border"
            style={{ background: info.bg }}
          />{" "}
          {info.bg}
        </div>
        <div>padding: {info.padding}</div>
        {info.ratio !== null ? (
          <div className={pass ? "text-folder-lime" : "text-folder-orange"}>
            contraste {info.ratio.toFixed(1)}:1 · {pass ? "AA ✓" : "AA só p/ texto grande"}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Modo Wireframe + Modo Inspeção: mostram o processo por trás do visual.
 * Tecla I alterna a inspeção; Esc sai de qualquer modo.
 */
export function Modes() {
  const t = getContent(useLocale()).t;
  const { wireframe, toggleWireframe, inspect, toggleInspect } = usePrefs();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || typing(e.target)) return;
      if (e.key.toLowerCase() === "i") {
        toggleInspect();
        emit("toast", inspect ? t.palette.toastInspectOff : t.modes.hint);
      } else if (
        e.key === "Escape" &&
        (inspect || wireframe) &&
        !document.querySelector("[aria-modal=true], dialog[open]")
      ) {
        if (inspect) toggleInspect();
        if (wireframe) toggleWireframe();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inspect, wireframe, toggleInspect, toggleWireframe, t]);

  return (
    <>
      {inspect ? (
        <>
          <Grid />
          <Inspector />
        </>
      ) : null}
      <AnimatePresence>
        {wireframe || inspect ? (
          <m.div
            key="modebar"
            role="region"
            aria-label={t.modes.active}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed bottom-28 left-4 z-[87] flex items-center gap-2 rounded-full border-[1.5px] border-dashed border-[#d98aa0] bg-[#fbeff2] p-1.5 pl-4 font-mono text-[11px] tracking-[.15em] text-[#8a3a52] uppercase shadow-lg md:bottom-6"
          >
            {wireframe ? t.modes.wireframe : null}
            {wireframe && inspect ? " + " : null}
            {inspect ? t.modes.inspect : null}
            <button
              type="button"
              onClick={() => {
                if (inspect) toggleInspect();
                if (wireframe) toggleWireframe();
              }}
              className="flex min-h-9 items-center gap-1.5 rounded-full bg-[#8a3a52] px-3 text-[#fbeff2]"
            >
              <Icon name="close" size={12} strokeWidth={2.5} /> {t.modes.exit}{" "}
              <kbd className="opacity-70">esc</kbd>
            </button>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
