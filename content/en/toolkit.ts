import { toolkit as pt } from "../pt/toolkit";

const groups: Record<string, string> = {
  Código: "Code",
  "Dados & back-end": "Data & back-end",
  "Design & UX": "Design & UX",
  "Infra & testes": "Infra & testing",
};
const items: Record<string, string> = {
  Prototipação: "Prototyping",
  "Acessibilidade (WCAG)": "Accessibility (WCAG)",
};

export const toolkit: typeof pt = pt.map((g) => ({
  group: groups[g.group] ?? g.group,
  items: g.items.map((i) => items[i] ?? i),
}));
