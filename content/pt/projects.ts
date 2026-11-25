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
  layout: "big" | "tall" | "wide" | "default";
  /** Print real da interface (em /public/projects) */
  cover?: { src: string; width: number; height: number; alt: string };
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
    cover: {
      src: "/projects/kadosh.webp",
      width: 1904,
      height: 932,
      alt: "Página inicial da KADOSH: fundo preto, logo dourado e o título “Vista sua fé. Expresse sua essência.” com botões Masculino e Feminino.",
    },
  },
  {
    slug: "modo",
    title: "MODO",
    categories: ["Front-end"],
    summary: "Site do studio de nails com tabela de valores e agendamento via WhatsApp.",
    stack: ["Next.js", "Tailwind"], // TODO confirmar
    publicImages: true,
    tone: "pink",
    layout: "wide",
  },
  {
    slug: "paz-no-lar",
    title: "Paz no Lar",
    categories: ["Full Stack", "UX/UI"],
    summary:
      "Sistema web para instituto de psicologia gratuita, onde atuo como voluntária no desenvolvimento e no design.",
    stack: ["TODO"],
    publicImages: true,
    tone: "blue",
    layout: "tall",
    cover: {
      src: "/projects/paz-no-lar.webp",
      width: 1903,
      height: 935,
      alt: "Página inicial do Instituto Paz no Lar: título grande “Paz no Lar” em degradê roxo, botões “Conheça os benefícios” e “Fale conosco” e selos de atendimento gratuito, sigilo e equipe dedicada.",
    },
  },
  {
    slug: "banco-de-talentos",
    title: "Banco de Talentos",
    categories: ["UX/UI", "Front-end"],
    summary: "Vitrine das acolhidas do instituto.",
    stack: ["TODO"],
    publicImages: true,
    tone: "lime",
    layout: "tall",
    cover: {
      src: "/projects/banco-de-talentos.webp",
      width: 1903,
      height: 932,
      alt: "Página inicial do Banco de Talentos: fundo escuro, título “Encontre quem é Confeiteira”, busca por ofício e fotos de trabalhos das acolhidas, como unhas, bolos e bolsas.",
    },
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
