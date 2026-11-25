import type { navSections as PtNav, heroFolders as PtFolders } from "../pt/sections";

export const navSections: typeof PtNav = [
  { id: "inicio", label: "Home", icon: "home" },
  { id: "projetos", label: "Projects", icon: "grid" },
  { id: "processo", label: "Journey", icon: "steps" },
  { id: "sobre", label: "About", icon: "user" },
  { id: "contato", label: "Contact", icon: "mail" },
];

export const heroFolders: typeof PtFolders = [
  {
    id: "projetos",
    label: "projects_01",
    color: "pink",
    target: "projetos",
    title: "Projects",
    summary: "E-commerce, websites and web systems I designed and built end to end.",
    items: [
      "KADOSH · e-commerce",
      "MODO · nail studio",
      "Paz no Lar · web system",
      "Banco de Talentos · showcase",
    ],
  },
  {
    id: "cases",
    label: "ux_cases_02",
    color: "orange",
    target: "processo",
    title: "UX cases",
    summary: "How I think: Discover → Define → Develop → Deliver.",
    items: [
      "Research and interviews",
      "Information architecture",
      "Prototype and test",
      "Metrics after launch",
    ],
  },
  {
    id: "codigo",
    label: "code_03",
    color: "lime",
    target: "projetos",
    title: "Code",
    summary: "Next.js, TypeScript, Node, Prisma and PostgreSQL every day.",
    items: [
      "Front-end with React/Next.js",
      "APIs and payment integrations",
      "Database modeling",
      "Accessibility and performance",
    ],
  },
  {
    id: "sobre",
    label: "about_04",
    color: "blush",
    target: "sobre",
    title: "About me",
    summary:
      "A developer who thinks like a designer and a designer who ships code. From Ceará, Brazil, to anywhere.",
    items: [
      "Technical high school in IT (Python, Java)",
      "Software Engineering · UNIASSELVI",
      "Teaching degree in Mathematics · Uninassau",
      "Now: volunteer at Paz no Lar and freelancer",
    ],
  },
];
