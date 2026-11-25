import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Card com recorte tipo aba (ref. C). Aba + corpo, com a curva côncava na junção
 * feita por mask (radial-gradient) — sem imagem, acompanha qualquer cor de fundo.
 */
export function NotchCard({
  tab,
  children,
  className,
  bodyClassName,
  tone = "block",
  tabWidth = "18rem",
}: {
  tab: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  tone?: "block" | "surface";
  tabWidth?: string;
}) {
  const color = tone === "block" ? "bg-block text-on-block" : "bg-surface text-fg";
  return (
    <div className={cn("relative", className)} data-component="NotchCard">
      <div className="relative flex" style={{ width: `min(${tabWidth}, 70%)` }}>
        <div className={cn("flex h-11 w-full items-center rounded-t-[28px] pl-7", color)}>
          {tab}
        </div>
        {/* junção côncava entre aba e corpo */}
        <span
          aria-hidden="true"
          className={cn("absolute -right-7 bottom-0 size-7", color)}
          style={{
            WebkitMask: "radial-gradient(circle at 100% 0, transparent 27.5px, #000 28px)",
            mask: "radial-gradient(circle at 100% 0, transparent 27.5px, #000 28px)",
          }}
        />
      </div>
      <div className={cn("rounded-[40px] rounded-tl-none p-8 md:p-12", color, bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
