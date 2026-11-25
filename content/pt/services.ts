export type ServiceId = "front" | "back" | "db" | "research" | "ui" | "a11y";

export const services: {
  id: ServiceId;
  title: string;
  text: string;
  tone: "surface" | "block" | "pink" | "lime";
}[] = [
  {
    id: "front",
    title: "Front-end",
    text: "Interfaces em React e Next.js, responsivas, rápidas e animadas com propósito.",
    tone: "surface",
  },
  {
    id: "back",
    title: "Back-end & APIs",
    text: "APIs REST, autenticação, pagamentos e integrações com serviços externos.",
    tone: "block",
  },
  {
    id: "db",
    title: "Banco de dados",
    text: "Modelagem relacional com PostgreSQL e Prisma, pensada para crescer.",
    tone: "surface",
  },
  {
    id: "research",
    title: "UX Research",
    text: "Entrevistas, testes de usabilidade e mapas de jornada antes do primeiro pixel.",
    tone: "pink",
  },
  {
    id: "ui",
    title: "UI & Design System",
    text: "Tokens, componentes e documentação que viram código sem retrabalho.",
    tone: "surface",
  },
  {
    id: "a11y",
    title: "Acessibilidade & Performance",
    text: "WCAG 2.2 AA, navegação por teclado e Core Web Vitals no verde.",
    tone: "lime",
  },
];
