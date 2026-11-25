export type ProjectCategory = "Full Stack" | "UX/UI" | "Front-end";

export type Project = {
  slug: string;
  title: string;
  categories: ProjectCategory[];
  summary: string;
  stack: string[];
  /** Autorização do cliente para mostrar prints */
  publicImages: boolean;
  tone: "ink" | "pink" | "blue" | "lime";
  layout: "big" | "tall" | "default";
};

// TODO: Brena confirmar stacks e autorizações de cada cliente
export const projects: Project[] = [
  {
    slug: "kadosh",
    title: "KADOSH",
    categories: ["Full Stack"],
    summary: "E-commerce de moda com painel admin, pagamento e frete integrados.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Mercado Pago", "Melhor Envio"],
    publicImages: true,
    tone: "ink",
    layout: "big",
  },
  {
    slug: "modo",
    title: "MODO",
    categories: ["Front-end"],
    summary: "Site do studio de nails com tabela de valores e agendamento via WhatsApp.",
    stack: ["Next.js", "Tailwind"], // TODO confirmar
    publicImages: true,
    tone: "pink",
    layout: "default",
  },
  {
    slug: "paz-no-lar",
    title: "Paz no Lar",
    categories: ["Full Stack", "UX/UI"],
    summary:
      "Sistema web para instituto de psicologia gratuita, onde atuo como voluntária no desenvolvimento e no design.",
    stack: ["TODO"],
    publicImages: false,
    tone: "blue",
    layout: "tall",
  },
  {
    slug: "banco-de-talentos",
    title: "Banco de Talentos",
    categories: ["UX/UI", "Front-end"],
    summary: "Vitrine das acolhidas do instituto.",
    stack: ["TODO"],
    publicImages: false,
    tone: "lime",
    layout: "default",
  },
];

export const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "Python",
  "Java",
  "Tailwind CSS",
  "Figma",
  "Git",
  "Netlify",
];
