import { certifications as pt } from "../pt/certifications";

const titles: Record<string, string> = {
  "Inglês intermediário (curso de 3 anos)": "Intermediate English (3-year program)",
  "Preparação profissional (4 módulos)": "Career readiness (4 modules)",
  "Marketing Digital e Redes Sociais": "Digital Marketing and Social Media",
  "DESPERTAR – Educação Empreendedora": "DESPERTAR – Entrepreneurship Education",
  "Extensão universitária (5 projetos sociais)": "University extension (5 community projects)",
};
const months: Record<string, string> = { mai: "May", abr: "Apr" };

export const certifications: typeof pt = pt.map((c) => ({
  ...c,
  title: titles[c.title] ?? c.title,
  date: c.date.replace(/^(mai|abr)/, (m) => months[m] ?? m),
}));
