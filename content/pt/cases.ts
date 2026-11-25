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

// TODO: Brena — conferir anos, links públicos e enviar mais prints para as galerias
export const cases: CaseMeta[] = [
  {
    slug: "kadosh",
    script: "fé",
    role: "Full stack · design e desenvolvimento",
    year: "TODO",
    lede: "Uma loja própria para uma marca de moda cristã: vitrine animada, checkout com Pix e cartão, frete calculado na hora e um painel para cuidar de produtos, estoque e pedidos.",
    gallery: [],
  },
  {
    slug: "modo",
    script: "unhas",
    role: "Front-end · design e desenvolvimento",
    year: "TODO",
    lede: "Site do studio de nails com tabela de valores e agendamento direto pelo WhatsApp.",
    gallery: [],
  },
  {
    slug: "paz-no-lar",
    script: "cuidado",
    role: "Voluntária · desenvolvimento e design",
    year: "TODO",
    lede: "Site e sistema web do Instituto Paz no Lar, que oferece atendimento psicológico gratuito. Atuo como voluntária no desenvolvimento e no design.",
    gallery: [],
  },
  {
    slug: "banco-de-talentos",
    script: "talento",
    role: "Design e front-end",
    year: "TODO",
    lede: "Vitrine das acolhidas do instituto: quem visita encontra confeiteiras, manicures, artesãs e empreendedoras e vê, de perto, o trabalho de cada uma.",
    gallery: [],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
