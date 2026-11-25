export type CaseMeta = {
  slug: string;
  /** palavra em script sobre o título condensado */
  script: string;
  role: string;
  year: string;
  /** link do projeto no ar (opcional) */
  url?: string;
  /** frase de abertura */
  lede: string;
  gallery: { src: string; width: number; height: number; alt: string }[];
};

// TODO: Brena — links da KADOSH e do Banco de Talentos quando estiverem no ar; mais prints para as galerias
export const cases: CaseMeta[] = [
  {
    slug: "kadosh",
    script: "fé",
    role: "Full stack · design e desenvolvimento",
    year: "2026",
    lede: "Uma loja completa para uma marca de moda cristã, de varejo e atacado: vitrine dinâmica, frete calculado na compra, pagamento por Pix ou cartão e um painel para cuidar de produtos, estoque e pedidos. O cliente faz tudo sozinho, sem precisar falar com a loja.",
    gallery: [],
  },
  {
    slug: "modo",
    script: "unhas",
    role: "Front-end · design e desenvolvimento",
    year: "2026",
    lede: "Site do studio de nails com tabela de valores e agendamento direto pelo WhatsApp. Projeto em desenvolvimento.",
    gallery: [],
  },
  {
    slug: "paz-no-lar",
    script: "cuidado",
    role: "Voluntária · desenvolvimento e design",
    year: "2026",
    lede: "Site e sistema do Instituto Paz no Lar, que acolhe e ajuda mulheres que passaram por situações de violência. Por fora, um site que aproxima as pessoas do instituto; por dentro, uma área restrita onde a equipe cadastra e organiza as informações de quem faz parte do projeto. Atuo como voluntária no desenvolvimento e no design.",
    url: "https://instituto-paz-no-lar.netlify.app/",
    gallery: [],
  },
  {
    slug: "banco-de-talentos",
    script: "talento",
    role: "Design e front-end",
    year: "2026",
    lede: "Vitrine das acolhidas do instituto: quem visita encontra confeiteiras, manicures, artesãs e empreendedoras e vê, de perto, o trabalho de cada uma.",
    gallery: [],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
