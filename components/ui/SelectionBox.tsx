import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Assinatura visual: o elemento parece selecionado num editor de design.
 * As alças "esticam" no hover/foco do filho (feedback) — só transform.
 */
export function SelectionBox({
  children,
  label,
  className,
  tight = false,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
  tight?: boolean;
}) {
  const handle =
    "pointer-events-none absolute size-[11px] border-[1.5px] border-select bg-white transition-transform duration-300 ease-out";
  return (
    <span
      className={cn(
        "group/sel relative inline-block border-[1.5px] border-select",
        tight ? "p-0.5" : "p-1.5",
        className,
      )}
    >
      {label ? (
        <span
          aria-hidden="true"
          className="absolute -top-6 -left-0.5 bg-select px-1.5 py-0.5 font-mono text-[10px] leading-none whitespace-nowrap text-white"
        >
          {label}
        </span>
      ) : null}
      <span aria-hidden="true" className={cn(handle, "-top-[6px] -left-[6px] group-hover/sel:-translate-x-1 group-hover/sel:-translate-y-1 group-focus-within/sel:-translate-x-1 group-focus-within/sel:-translate-y-1")} />
      <span aria-hidden="true" className={cn(handle, "-top-[6px] -right-[6px] group-hover/sel:translate-x-1 group-hover/sel:-translate-y-1 group-focus-within/sel:translate-x-1 group-focus-within/sel:-translate-y-1")} />
      <span aria-hidden="true" className={cn(handle, "-bottom-[6px] -left-[6px] group-hover/sel:-translate-x-1 group-hover/sel:translate-y-1 group-focus-within/sel:-translate-x-1 group-focus-within/sel:translate-y-1")} />
      <span aria-hidden="true" className={cn(handle, "-right-[6px] -bottom-[6px] group-hover/sel:translate-x-1 group-hover/sel:translate-y-1 group-focus-within/sel:translate-x-1 group-focus-within/sel:translate-y-1")} />
      {children}
    </span>
  );
}
