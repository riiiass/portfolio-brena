"use client";

import { LazyMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type Prefs = {
  theme: Theme;
  toggleTheme: () => void;
  /** true quando o sistema pede menos movimento OU o toggle do ⌘K está ligado */
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  wireframe: boolean;
  toggleWireframe: () => void;
  inspect: boolean;
  toggleInspect: () => void;
};

const PrefsContext = createContext<Prefs | null>(null);
const loadFeatures = () => import("@/lib/motion-features").then((r) => r.default);

function readHtml(attr: string) {
  if (typeof document === "undefined") return undefined;
  return document.documentElement.dataset[attr];
}

/** Executa a troca dentro de uma View Transition quando o navegador suporta e o movimento está liberado */
function withTransition(update: () => void, reduced: boolean) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  // orientação: a onda nasce do controle que disparou a troca
  const el = document.activeElement as HTMLElement | null;
  if (el && el !== document.body) {
    const r = el.getBoundingClientRect();
    document.documentElement.style.setProperty("--wave-x", `${r.left + r.width / 2}px`);
    document.documentElement.style.setProperty("--wave-y", `${r.top + r.height / 2}px`);
  }
  if (!reduced && typeof doc.startViewTransition === "function") {
    doc.startViewTransition(update);
  } else {
    update();
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [reducedMotion, setReduced] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [inspect, setInspect] = useState(false);

  // Sincroniza com o que o script do <head> já aplicou (evita flash e mismatch)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- leitura única do estado aplicado antes da hidratação */
    setTheme(readHtml("theme") === "dark" ? "dark" : "light");
    setReduced(readHtml("motion") === "reduced");
    /* eslint-enable react-hooks/set-state-in-effect */

    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (localStorage.getItem("motion")) return; // escolha explícita vence
      document.documentElement.dataset.motion = mq.matches ? "reduced" : "full";
      setReduced(mq.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    // hierarquia: a troca de tema acontece numa transição única, não pisca elemento por elemento
    withTransition(() => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
    }, reducedMotion);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }, [theme, reducedMotion]);

  const toggleReducedMotion = useCallback(() => {
    const next = !reducedMotion;
    document.documentElement.dataset.motion = next ? "reduced" : "full";
    setReduced(next);
    try {
      localStorage.setItem("motion", next ? "reduced" : "full");
    } catch {}
  }, [reducedMotion]);

  const setMode = useCallback((mode: "wireframe" | "inspect", on: boolean) => {
    const html = document.documentElement;
    const modes = new Set((html.dataset.mode ?? "").split(" ").filter(Boolean));
    if (on) modes.add(mode);
    else modes.delete(mode);
    html.dataset.mode = [...modes].join(" ");
  }, []);

  const toggleWireframe = useCallback(() => {
    const next = !wireframe;
    withTransition(() => {
      setMode("wireframe", next);
      setWireframe(next);
    }, reducedMotion);
  }, [wireframe, reducedMotion, setMode]);

  const toggleInspect = useCallback(() => {
    const next = !inspect;
    setMode("inspect", next);
    setInspect(next);
  }, [inspect, setMode]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      reducedMotion,
      toggleReducedMotion,
      wireframe,
      toggleWireframe,
      inspect,
      toggleInspect,
    }),
    [
      theme,
      toggleTheme,
      reducedMotion,
      toggleReducedMotion,
      wireframe,
      toggleWireframe,
      inspect,
      toggleInspect,
    ],
  );

  return (
    <PrefsContext.Provider value={value}>
      {/* features do Motion chegam sob demanda: menos JS no caminho crítico */}
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs precisa estar dentro de <PreferencesProvider>");
  return ctx;
}
