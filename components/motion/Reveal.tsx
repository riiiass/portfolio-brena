"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Variant = "clip-up" | "clip-left" | "rise" | "pop" | "slide-right" | "lines" | "none";

/**
 * Marca data-shown quando entra na viewport. A animação em si é CSS (styles/motion.css),
 * então sem JS ou com reduced motion o conteúdo já está no estado final.
 */
export function Reveal({
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  className,
  style,
  children,
  once = true,
  ...rest
}: {
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  once?: boolean;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          el.setAttribute("data-shown", "");
          if (once) io.disconnect();
        } else if (!once && entry.boundingClientRect.top > 0) {
          // bidirecional: ao voltar para cima, o elemento "sai" de novo
          el.removeAttribute("data-shown");
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant === "none" ? undefined : variant}
      className={className}
      style={{ ...style, ["--d" as string]: delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Título com linhas que sobem por máscara (hierarquia) */
export function RevealLines({
  as: Tag = "h2",
  lines,
  className,
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  id?: string;
}) {
  return (
    <Reveal as={Tag} variant="lines" className={className} id={id}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span style={{ ["--l" as string]: i }}>{line}</span>
        </span>
      ))}
    </Reveal>
  );
}
