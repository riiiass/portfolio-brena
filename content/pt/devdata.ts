/**
 * Lighthouse (performance, mobile) medido por projeto.
 * TODO: Brena — rodar o Lighthouse (aba do Chrome DevTools, modo mobile) em cada site no ar e
 * preencher `score`. Sem valor, a barra aparece vazia com "a medir". Nada é estimado.
 */
export const lighthouse: { project: string; score?: number; measuredAt?: string }[] = [
  { project: "Paz no Lar" },
  { project: "KADOSH" },
  { project: "Banco de Talentos" },
  { project: "Este portfólio" },
];

/** Paleta categórica validada (scripts/validate_palette.js: claro e escuro) — ordem fixa */
export const chartPalette = ["#2F6FD0", "#E0701F", "#B8336A", "#5E8C0A", "#7A4FC9"];
export const chartOther = "#8A8A8A";
