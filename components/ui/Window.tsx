import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Janela com semáforo (ref. A). Os pontos são decorativos. */
export function WindowFrame({
  title,
  children,
  className,
  actions,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <div
      className={cn("overflow-hidden rounded-[28px] bg-surface shadow-[14px_18px_0_-4px_var(--shadow)]", className)}
      data-component="Window"
    >
      <div className="flex items-center gap-2 border-b border-line px-[18px] py-3.5">
        <span aria-hidden="true" className="size-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden="true" className="size-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden="true" className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-xs text-muted">{title}</span>
        {actions ? <span className="ml-auto flex items-center gap-1">{actions}</span> : null}
      </div>
      {children}
    </div>
  );
}
