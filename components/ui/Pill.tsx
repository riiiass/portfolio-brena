import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "soft" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium select-none whitespace-nowrap " +
  // feedback: hover e press curtos (--dur-micro), só transform/cores
  "transition-[transform,background-color,color,border-color] duration-150 ease-out active:scale-[.97]";

const variants: Record<Variant, string> = {
  solid: "bg-fg text-bg border-[1.5px] border-fg hover:bg-transparent hover:text-fg",
  outline: "border-[1.5px] border-fg text-fg hover:bg-fg hover:text-bg",
  soft: "bg-surface text-fg border-[1.5px] border-line hover:border-fg",
  ghost: "text-current hover:bg-current/10",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3.5 text-sm",
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-14 px-7 text-base",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function pillClass({
  variant = "outline",
  size = "md",
  className,
}: Omit<Common, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Pill({
  variant,
  size,
  className,
  pressed,
  ...rest
}: Common & { pressed?: boolean } & Omit<ComponentProps<"button">, "className">) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={pillClass({
        variant: pressed === undefined ? variant : pressed ? "solid" : "outline",
        size,
        className,
      })}
      {...rest}
    />
  );
}

export function PillLink({
  variant,
  size,
  className,
  href,
  ...rest
}: Common & { href: string } & Omit<ComponentProps<"a">, "className" | "href">) {
  const cls = pillClass({ variant, size, className });
  if (href.startsWith("http") || href.startsWith("mailto:"))
    return <a href={href} className={cls} target="_blank" rel="noreferrer" {...rest} />;
  return <Link href={href} className={cls} {...rest} />;
}

/** Selo / tag estática em mono */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "bg-paper text-ink inline-flex items-center rounded-full px-2.5 py-1.5 font-mono text-[11px] tracking-[.15em] uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
