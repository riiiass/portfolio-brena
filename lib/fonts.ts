import { Anton, Italiana, JetBrains_Mono, Manrope, Mrs_Saint_Delafield } from "next/font/google";

// Display condensada: títulos gigantes
export const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
// Script: palavra sobreposta ao título (decorativa, nunca carrega informação sozinha)
export const script = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});
// Serifa fina editorial: subtítulos
export const italiana = Italiana({ subsets: ["latin"], weight: "400", variable: "--font-italiana", display: "swap" });
// Sans de leitura
export const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
// Mono: labels espaçadas
export const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const fontVariables = [anton, script, italiana, manrope, jetbrains].map((f) => f.variable).join(" ");
