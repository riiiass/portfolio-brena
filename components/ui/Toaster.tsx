"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/** feedback: confirmações curtas (copiar e-mail, modos). aria-live para leitores de tela. */
export function Toaster() {
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      setMsg({ id: Date.now(), text });
      clearTimeout(t);
      t = setTimeout(() => setMsg(null), 2400);
    };
    window.addEventListener("toast", on);
    return () => {
      window.removeEventListener("toast", on);
      clearTimeout(t);
    };
  }, []);
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-28 z-[95] flex justify-center md:bottom-8"
    >
      <AnimatePresence>
        {msg ? (
          <motion.p
            key={msg.id}
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="bg-fg text-bg rounded-full px-5 py-3 text-sm font-medium shadow-lg"
          >
            {msg.text}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
