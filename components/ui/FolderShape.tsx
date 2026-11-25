import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FolderColor = "pink" | "orange" | "blue" | "lime" | "blush";

export const folderBg: Record<FolderColor, string> = {
  pink: "bg-folder-pink",
  orange: "bg-folder-orange",
  blue: "bg-folder-blue",
  lime: "bg-folder-lime",
  blush: "bg-blush",
};

/** Desenho puro da pasta (aba + corpo). A versão arrastável usa este shape. */
export function FolderShape({
  label,
  color,
  className,
  children,
}: {
  label: string;
  color: FolderColor;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span className={cn("on-light block w-40", className)} data-component="Folder">
      <span
        aria-hidden="true"
        className={cn("block h-[18px] w-16 rounded-t-[10px]", folderBg[color])}
      />
      <span
        className={cn(
          "flex h-28 flex-col justify-end rounded-[0_16px_16px_16px] p-3.5 shadow-[0_16px_24px_-12px_rgb(0_0_0/.4)]",
          folderBg[color],
        )}
      >
        {children}
        <span className="font-mono text-xs">{label}</span>
      </span>
    </span>
  );
}
