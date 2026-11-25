"use client";

import { motion } from "motion/react";
import { usePrefs } from "@/components/providers/Preferences";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, reducedMotion } = usePrefs();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Tema escuro"
      title={dark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      onClick={toggleTheme}
      className={cn(
        "relative flex h-11 w-[68px] shrink-0 items-center rounded-full border-[1.5px] border-current px-[5px] active:scale-[.97]",
        className,
      )}
    >
      {/* feedback: o botão desliza com mola para o lado do tema escolhido */}
      <motion.span
        className="bg-paper text-ink flex size-[30px] items-center justify-center rounded-full"
        animate={{ x: dark ? 28 : 0, rotate: dark ? -30 : 0 }}
        transition={
          reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24 }
        }
      >
        <Icon name={dark ? "moon" : "sun"} size={16} strokeWidth={2} />
      </motion.span>
    </button>
  );
}
