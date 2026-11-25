"use client";

import { useEffect } from "react";
import { usePrefs } from "@/components/providers/Preferences";
import { loadGsap } from "@/lib/gsap";

const BG_VAR: Record<string, string> = { paper: "--bg", band: "--band", block: "--block" };

/**
 * Coreografias de scroll declarativas via data-attributes (GSAP + ScrollTrigger, carregado sob demanda):
 *  - data-bg="paper|band|block" → o fundo da página morfa entre seções (orientação: muda o "capítulo")
 *  - data-exit="slide-left|slide-right|compress" → o elemento sai ao rolar (scroll bidirecional)
 *  - data-parallax="0.2" → deslocamento vertical proporcional (profundidade)
 * Tudo desligado com reduced motion; sem JS as seções mantêm seus fundos próprios.
 */
export function ScrollFx() {
  const { reducedMotion, theme } = usePrefs();

  useEffect(() => {
    if (reducedMotion) return;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const html = document.documentElement;
      const read = (v: string) => getComputedStyle(html).getPropertyValue(v).trim();

      ctx = gsap.context(() => {
        // ---- fundo que morfa ----
        const sections = gsap.utils.toArray<HTMLElement>("[data-bg]");
        if (sections.length) {
          html.classList.add("bg-morph");
          const first = sections[0]?.dataset.bg ?? "paper";
          gsap.set(document.body, { backgroundColor: read(BG_VAR[first] ?? "--bg") });
          sections.forEach((sec) => {
            const color = () => read(BG_VAR[sec.dataset.bg ?? "paper"] ?? "--bg");
            ScrollTrigger.create({
              trigger: sec,
              start: "top 55%",
              end: "bottom 55%",
              onToggle: (self) => {
                if (self.isActive)
                  gsap.to(document.body, {
                    backgroundColor: color(),
                    duration: 0.7,
                    ease: "power2.inOut",
                    overwrite: true,
                  });
              },
            });
          });
        }

        // ---- saídas ----
        gsap.utils.toArray<HTMLElement>("[data-exit]").forEach((el) => {
          const kind = el.dataset.exit;
          const to =
            kind === "slide-left"
              ? { xPercent: -12, opacity: 0.25 }
              : kind === "slide-right"
                ? { xPercent: 12, opacity: 0.25 }
                : { scaleY: 0.72, opacity: 0.35, transformOrigin: "50% 0%" };
          gsap.to(el, {
            ...to,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 6%", end: "bottom -20%", scrub: true },
          });
        });

        // ---- parallax ----
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax ?? 0.15);
          gsap.fromTo(
            el,
            { yPercent: amount * 50 },
            {
              yPercent: -amount * 50,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      // recalcula quando as fontes terminam de carregar (alturas mudam)
      void document.fonts?.ready.then(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      document.documentElement.classList.remove("bg-morph");
      document.body.style.backgroundColor = "";
    };
    // theme na dependência: as cores do morph são relidas ao trocar de tema
  }, [reducedMotion, theme]);

  return null;
}
