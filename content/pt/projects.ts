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
  /** Projeto ainda em desenvolvimento */
  status?: "dev";
  /** Print real da interface (em /public/projects) */
  cover?: { src: string; width: number; height: number; alt: string };
};

// TODO: Brena confirmar stacks e autorizações de cada cliente
export const projects: Project[] = [
  {
    slug: "kadosh",
    title: "KADOSH",
    categories: ["Full Stack"],
    summary:
      "E-commerce de moda cristã para varejo e atacado: vitrine dinâmica, frete, Pix e cartão e painel admin. O cliente compra sem falar com a loja.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "PagBank", "SuperFrete"],
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
    stack: [], // em desenvolvimento: stack e print em breve
    status: "dev",
    publicImages: true,
    tone: "pink",
    layout: "wide",
  },
  {
    slug: "paz-no-lar",
    title: "Paz no Lar",
    categories: ["Full Stack", "UX/UI"],
    summary:
      "Site e sistema do instituto que ajuda mulheres a recomeçar, com área restrita para cadastro, impressão e PDF. Sou voluntária no dev e no design.",
    stack: ["Next.js", "React", "Prisma", "PostgreSQL", "Netlify"],
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
    summary: "Vitrine das acolhidas do instituto: busca por ofício, nome ou peça.",
    stack: ["HTML", "CSS", "JavaScript"],
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
  "HTML",
  "CSS",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "Neon",
  "Zod",
  "Vitest",
  "GitHub Actions",
  "Tailwind CSS",
  "Framer Motion",
  "Python",
  "Java",
  "Figma",
  "Git",
  "Netlify",
  "PagBank",
];
