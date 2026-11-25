"use client";

import {
  AnimatePresence,
  motion,
  motionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { heroFolders } from "@/content/pt/sections";
import { usePrefs } from "@/components/providers/Preferences";
import { FolderShape } from "@/components/ui/FolderShape";
import { Icon } from "@/components/ui/Icon";
import { getLenis, scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/cn";

type Folder = (typeof heroFolders)[number];

/** Posições base no desktop (% do container), rotação, profundidade do parallax e origem da intro */
const layout = [
  { left: "0%", top: "11%", rotate: -8, depth: 18, fx: "40%", fy: "60%" },
  { left: "calc(100% - 10rem)", top: "2%", rotate: 7, depth: -14, fx: "-40%", fy: "80%" },
  { left: "2%", top: "calc(100% - 15rem)", rotate: 5, depth: 10, fx: "50%", fy: "-30%" },
  {
    left: "calc(96% - 10rem)",
    top: "calc(100% - 17rem)",
    rotate: -6,
    depth: -22,
    fx: "-50%",
    fy: "-20%",
  },
];

const STEP = 20;

/* ---------------------------------------------------------------- */

function DraggableFolder({
  folder,
  index,
  constraints,
  offset,
  mouseX,
  mouseY,
  onOpen,
  onInteract,
}: {
  folder: Folder;
  index: number;
  constraints: React.RefObject<HTMLDivElement | null>;
  offset: { x: MotionValue<number>; y: MotionValue<number> };
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  onOpen: (f: Folder) => void;
  onInteract: () => void;
}) {
  const pos = layout[index] ?? layout[0]!;
  const { reducedMotion } = usePrefs();
  const dragged = useRef(false);
  // orientação/deleite: profundidade diferente por pasta = parallax pelo mouse
  const px = useTransform(mouseX, (v) => v * pos.depth);
  const py = useTransform(mouseY, (v) => v * pos.depth);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? STEP * 3 : STEP;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    onInteract();
    // feedback: arrastar por teclado (WCAG 2.5.7 — alternativa ao gesto de arrastar)
    const box = constraints.current?.getBoundingClientRect();
    const limitX = box ? box.width / 2 : 400;
    const limitY = box ? box.height / 2 : 300;
    offset.x.set(Math.max(-limitX, Math.min(limitX, offset.x.get() + m[0])));
    offset.y.set(Math.max(-limitY, Math.min(limitY, offset.y.get() + m[1])));
  };

  return (
    <div
      className="hero-folder absolute"
      style={{
        left: pos.left,
        top: pos.top,
        ["--i" as string]: index,
        ["--fx" as string]: pos.fx,
        ["--fy" as string]: pos.fy,
      }}
    >
      <motion.div style={reducedMotion ? undefined : { x: px, y: py }}>
        <div
          className="bob idle"
          style={{
            ["--bob-dur" as string]: `${4.5 + index * 0.7}s`,
            ["--bob-delay" as string]: `${-index * 1.3}s`,
          }}
        >
          <motion.button
            type="button"
            layoutId={`folder-${folder.id}`}
            id={`folder-btn-${folder.id}`}
            data-cursor="arrastar"
            aria-label={`Pasta ${folder.label}: abrir ${folder.title}`}
            aria-describedby="folder-help"
            drag
            dragConstraints={constraints}
            dragElastic={0.18}
            dragTransition={{ power: 0.25, timeConstant: 220 }}
            style={{ x: offset.x, y: offset.y, rotate: pos.rotate }}
            // feedback: levanta ao pegar, encaixa com mola ao soltar
            whileHover={reducedMotion ? undefined : { scale: 1.04 }}
            whileDrag={{ scale: 1.08, rotate: 0, zIndex: 20, cursor: "grabbing" }}
            whileTap={{ scale: 0.97 }}
            onDragStart={() => {
              dragged.current = true;
              onInteract();
            }}
            onPointerDown={() => {
              dragged.current = false;
            }}
            onClick={() => {
              if (dragged.current) return;
              onInteract();
              onOpen(folder);
            }}
            onKeyDown={onKeyDown}
            className="block cursor-grab touch-none rounded-[16px] text-left"
          >
            <FolderShape label={folder.label} color={folder.color} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function FolderWindow({
  folder,
  prefix,
  onClose,
}: {
  folder: Folder;
  prefix: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = usePrefs();

  useEffect(() => {
    closeRef.current?.focus();
    getLenis()?.stop();
    window.dispatchEvent(new Event("cursor:reset"));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        // foco preso dentro da janela
        const els = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [onClose]);

  const goTo = () => {
    onClose();
    setTimeout(() => scrollToId(folder.target), reducedMotion ? 0 : 350);
  };

  return (
    <motion.div
      className="bg-ink/30 fixed inset-0 z-[70] flex items-center justify-center p-4 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.25 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* orientação: a pasta vira a janela (mesmo layoutId) — fica claro de onde ela veio */}
      <motion.div
        ref={dialogRef}
        layoutId={`${prefix}${folder.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`win-title-${folder.id}`}
        className="bg-surface text-fg w-full max-w-lg overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgb(0_0_0/.6)]"
        transition={
          reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }
        }
      >
        <div className="border-line flex items-center gap-2 border-b px-[18px] py-3">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="group flex size-6 items-center justify-center rounded-full"
          >
            <span className="flex size-3 items-center justify-center rounded-full bg-[#ff5f57] text-[#4d0000]">
              <Icon
                name="close"
                size={8}
                strokeWidth={3}
                className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </span>
          </button>
          <span aria-hidden="true" className="size-3 rounded-full bg-[#febc2e]" />
          <span aria-hidden="true" className="size-3 rounded-full bg-[#28c840]" />
          <span className="text-muted ml-3 font-mono text-xs">~/{folder.label}</span>
        </div>
        <motion.div
          className="p-7 md:p-9"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: reducedMotion ? 0 : 0.18 } }}
        >
          <h2
            id={`win-title-${folder.id}`}
            className="font-display text-step-3 leading-none uppercase"
          >
            {folder.title}
          </h2>
          <p className="text-muted mt-3">{folder.summary}</p>
          <ul className="mt-6 grid gap-2">
            {folder.items.map((it) => (
              <li
                key={it}
                className="bg-bg flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px]"
              >
                <Icon name="folder" size={16} />
                {it}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={goTo}
            className="bg-fg text-bg mt-7 inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-medium transition-transform active:scale-[.97]"
          >
            Ir para {folder.title.toLowerCase()} <Icon name="arrowUpRight" size={18} />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */

export function FolderPlayground() {
  const constraints = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<{ folder: Folder; prefix: string } | null>(null);
  const [touched, setTouched] = useState(false);
  const [hintOn, setHintOn] = useState(false);
  const { reducedMotion } = usePrefs();

  // offsets de drag vivem aqui para sobreviver ao abrir/fechar a janela
  const offsets = useMemo(
    () => heroFolders.map(() => ({ x: motionValue(0), y: motionValue(0) })),
    [],
  );

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 80, damping: 20 });

  // a mãozinha aparece depois do hero entrar e some na 1ª interação ou após 8s
  useEffect(() => {
    const t1 = setTimeout(() => setHintOn(true), 2200);
    const t2 = setTimeout(() => setHintOn(false), 10000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reducedMotion || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2 * 0.6);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2 * 0.6);
  };

  const close = () => {
    const btnId = open ? `${open.prefix}btn-${open.folder.id}` : null;
    setOpen(null);
    // devolve o foco para a pasta de origem
    if (btnId) setTimeout(() => document.getElementById(btnId)?.focus({ preventScroll: true }), 30);
  };

  const interact = () => setTouched(true);

  return (
    <>
      <p id="folder-help" className="sr-only">
        Enter abre a pasta. Setas movem a pasta pela tela; Shift + setas movem mais rápido.
      </p>

      {/* ---------- desktop: composição livre ---------- */}
      <div
        ref={constraints}
        className="relative hidden h-[620px] lg:block"
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          rawX.set(0);
          rawY.set(0);
        }}
      >
        <PhotoCard />
        {heroFolders.map((f, i) =>
          open?.folder.id === f.id && open.prefix === "folder-" ? null : (
            <DraggableFolder
              key={f.id}
              folder={f}
              index={i}
              constraints={constraints}
              offset={offsets[i]!}
              mouseX={mouseX}
              mouseY={mouseY}
              onOpen={(folder) => setOpen({ folder, prefix: "folder-" })}
              onInteract={interact}
            />
          ),
        )}
        <AnimatePresence>
          {hintOn && !touched ? (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[3%] left-[2%] z-10 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span className="bg-fg text-bg rounded-full px-2.5 py-1.5 font-mono text-[11px] tracking-[.2em]">
                ME ARRASTE
              </span>
              <span className="drag-hint text-ink">
                <Icon name="hand" size={40} strokeWidth={1.4} fill="#fff" />
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* ---------- mobile: foto + carrossel de pastas ---------- */}
      <div className="lg:hidden">
        <div className="relative h-[360px] sm:h-[480px]">
          <PhotoCard compact />
        </div>
        <div className="mt-6 -mr-4">
          <p className="label-mono text-muted mb-3 text-[10px]">Arraste para o lado →</p>
          <ul className="flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto pr-4 pb-4">
            {heroFolders.map((f) =>
              open?.folder.id === f.id && open.prefix === "folder-m-" ? (
                <li key={f.id} className="w-40 shrink-0" />
              ) : (
                <li key={f.id} className="shrink-0 snap-start">
                  <motion.button
                    type="button"
                    layoutId={`folder-m-${f.id}`}
                    id={`folder-m-btn-${f.id}`}
                    aria-label={`Pasta ${f.label}: abrir ${f.title}`}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setOpen({ folder: f, prefix: "folder-m-" })}
                    className="block rounded-[16px] text-left"
                  >
                    <FolderShape label={f.label} color={f.color} />
                  </motion.button>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <FolderWindow
            key={open.folder.id}
            folder={open.folder}
            prefix={open.prefix}
            onClose={close}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function PhotoCard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "hero-fade bg-folder-blue absolute overflow-hidden rounded-[40px] shadow-[18px_24px_0_-6px_var(--shadow)]",
        compact ? "inset-0" : "top-[50px] left-[12%] h-[520px] w-[76%]",
      )}
      style={{ ["--i" as string]: 0 }}
    >
      {/* TODO: Brena — trocar pela foto recortada (next/image, AVIF/WebP, priority) */}
      <svg
        viewBox="0 0 300 400"
        className="absolute bottom-0 left-1/2 h-[78%] -translate-x-1/2"
        aria-hidden="true"
      >
        <circle cx="150" cy="130" r="78" fill="#6e9bd8" />
        <path d="M20 400c0-90 58-150 130-150s130 60 130 150z" fill="#6e9bd8" />
      </svg>
      <span className="on-light bg-paper absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-1.5 font-mono text-[11px] tracking-[.2em]">
        TODO: FOTO
      </span>
    </div>
  );
}
