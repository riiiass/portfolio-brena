"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { navSections, type SectionId } from "@/content/pt/sections";
import { usePrefs } from "@/components/providers/Preferences";
import { scrollToId } from "@/lib/scroll";
import { emit } from "@/lib/events";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";

/** Observa qual seção está no centro da tela */
function useActiveSection() {
  const [active, setActive] = useState<SectionId>("inicio");
  useEffect(() => {
    const els = navSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/** Na home rola até a seção; em outras rotas deixa o link /#id navegar */
function go(e: React.MouseEvent, id: SectionId) {
  if (location.pathname !== "/") return;
  e.preventDefault();
  scrollToId(id);
}

function UserPill({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/#inicio"
      onClick={(e) => go(e, "inicio")}
      data-cursor="início"
      data-easter="avatar"
      className="bg-paper text-ink flex items-center gap-2.5 rounded-full py-1.5 pr-3.5 pl-1.5 transition-transform duration-150 active:scale-[.97]"
    >
      <span className="bg-folder-blue font-display flex size-8 items-center justify-center rounded-full text-[13px]">
        BA
      </span>
      <span className="flex flex-col leading-tight">
        {!compact ? (
          <span className="hidden text-[13px] font-bold lg:block">{site.name}</span>
        ) : null}
        <span className="flex items-center gap-1.5 text-[11px]">
          {/* deleite + orientação: o ponto pulsa = "estou disponível agora" */}
          <span className="relative flex size-[7px]">
            <span className="idle bg-ok absolute inset-0 animate-ping rounded-full opacity-60" />
            <span className="bg-ok relative size-[7px] rounded-full" />
          </span>
          {compact ? (
            "disponível"
          ) : (
            <>
              <span className="lg:hidden">disponível</span>
              <span className="hidden lg:inline">disponível para projetos</span>
            </>
          )}
        </span>
      </span>
    </Link>
  );
}

export function Nav() {
  const active = useActiveSection();
  const { wireframe, toggleWireframe, reducedMotion } = usePrefs();
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // orientação: some ao descer (mais espaço para o conteúdo), volta ao subir
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const focusInside = navRef.current?.contains(document.activeElement);
    setHidden(y > 160 && y > prev && !focusInside);
  });

  return (
    <>
      {/* ---------- desktop / tablet ---------- */}
      <motion.header
        className="fixed inset-x-0 top-0 z-40 hidden justify-center px-6 pt-5 md:flex"
        animate={{ y: hidden ? -110 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          ref={navRef}
          aria-label="Principal"
          className="border-line bg-block text-on-block flex w-full max-w-[1180px] items-center gap-2.5 rounded-full border p-1.5 shadow-[0_14px_30px_-14px_var(--shadow)]"
        >
          <UserPill />
          <ul className="flex flex-1 items-center justify-center gap-0.5">
            {navSections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id} className="relative">
                  <Link
                    href={`/#${s.id}`}
                    onClick={(e) => go(e, s.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                      isActive ? "text-ink" : "text-on-block hover:text-blush",
                    )}
                  >
                    {s.label}
                  </Link>
                  {/* orientação: o indicador desliza até a seção atual */}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="bg-blush absolute inset-0 rounded-full"
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 260, damping: 24 }
                      }
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => emit("palette:open")}
            aria-label="Abrir busca (Ctrl ou Command + K)"
            className="border-on-block/40 hover:border-on-block flex size-11 items-center justify-center rounded-full border-[1.5px] transition-colors active:scale-[.97] lg:hidden"
          >
            <Icon name="search" size={18} />
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleWireframe}
            aria-pressed={wireframe}
            className={cn(
              "border-blush flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-dashed px-3.5 font-mono text-[11px] tracking-[.2em] transition-colors active:scale-[.97]",
              wireframe ? "bg-blush text-ink" : "text-on-block",
            )}
          >
            <Icon name="wireframe" size={16} />
            <span className="hidden lg:inline">WIREFRAME</span>
            <span className="sr-only lg:hidden">Modo Wireframe</span>
          </button>
        </nav>
      </motion.header>

      {/* ---------- mobile: barra superior compacta ---------- */}
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-4 pt-4 md:hidden">
        <div className="bg-block text-on-block rounded-full p-1">
          <UserPill compact />
        </div>
        <div className="text-fg flex items-center gap-2">
          <button
            type="button"
            onClick={() => emit("palette:open")}
            aria-label="Abrir busca"
            className="border-fg bg-surface flex size-11 items-center justify-center rounded-full border-[1.5px]"
          >
            <Icon name="search" size={18} />
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* ---------- mobile: dock inferior ---------- */}
      <nav
        aria-label="Navegação rápida"
        className="bg-block text-on-block fixed inset-x-4 bottom-4 z-40 flex h-[72px] items-center justify-around rounded-full px-2.5 shadow-[0_16px_30px_-10px_rgb(0_0_0/.55)] md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {navSections.map((s) =>
          s.id === "inicio" ? (
            <Link
              key={s.id}
              href="/#inicio"
              onClick={(e) => go(e, s.id)}
              aria-label="Início"
              aria-current={active === s.id ? "true" : undefined}
              className="border-bg bg-blush text-ink -mt-8 flex size-16 items-center justify-center rounded-full border-4 transition-transform active:scale-[.94]"
            >
              <Icon name="home" size={24} strokeWidth={2} />
            </Link>
          ) : (
            <Link
              key={s.id}
              href={`/#${s.id}`}
              onClick={(e) => go(e, s.id)}
              aria-label={s.label}
              aria-current={active === s.id ? "true" : undefined}
              className="relative flex size-12 items-center justify-center rounded-full transition-transform active:scale-[.94]"
            >
              <Icon name={s.icon} size={22} />
              {active === s.id ? (
                <motion.span
                  layoutId="dock-active"
                  className="bg-blush absolute bottom-1 size-1.5 rounded-full"
                />
              ) : null}
            </Link>
          ),
        )}
      </nav>
    </>
  );
}
