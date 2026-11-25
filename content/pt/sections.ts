import type { IconName } from "@/components/ui/Icon";
import type { FolderColor } from "@/components/ui/FolderShape";

export type SectionId = "inicio" | "projetos" | "processo" | "sobre" | "contato";

export const navSections: { id: SectionId; label: string; icon: IconName }[] = [
  { id: "inicio", label: "Início", icon: "home" },
  { id: "projetos", label: "Projetos", icon: "grid" },
  { id: "processo", label: "Processo", icon: "steps" },
  { id: "sobre", label: "Sobre", icon: "user" },
  { id: "contato", label: "Contato", icon: "mail" },
];

/** As 4 pastas do hero = atalhos para seções do site */
export const heroFolders: {
  id: string;
  label: string;
  color: FolderColor;
  target: SectionId;
  title: string;
  summary: string;
  items: string[];
}[] = [
  {
    id: "projetos",
    label: "projetos_01",
    color: "pink",
    target: "projetos",
    title: "Projetos",
    summary: "E-commerce, sites e sistemas web que eu desenhei e codei de ponta a ponta.",
    items: [
      "KADOSH · e-commerce",
      "MODO · studio de nails",
      "Paz no Lar · sistema web",
      "Banco de Talentos · vitrine",
    ],
  },
  {
    id: "cases",
    label: "cases_ux_02",
    color: "orange",
    target: "processo",
    title: "Cases de UX",
    summary: "Como eu penso: Descobrir → Definir → Desenvolver → Entregar.",
    items: [
      "Pesquisa e entrevistas",
      "Arquitetura de informação",
      "Protótipo e teste",
      "Métricas depois do lançamento",
    ],
  },
  {
    id: "codigo",
    label: "codigo_03",
    color: "lime",
    target: "projetos",
    title: "Código",
    summary: "Next.js, TypeScript, Node, Prisma e PostgreSQL no dia a dia.",
    items: [
      "Front-end com React/Next.js",
      "APIs e integrações de pagamento",
      "Modelagem de banco",
      "Acessibilidade e performance",
    ],
  },
  {
    id: "sobre",
    label: "sobre_04",
    color: "blush",
    target: "sobre",
    title: "Sobre mim",
    summary:
      "Dev que pensa como designer e designer que entrega código. Do Ceará para qualquer lugar.",
    items: [
      "Técnico com Python e Java",
      "Engenharia de Software · UNIASSELVI",
      "Licenciatura · Uninassau",
      "TODO: Brena completar",
    ],
  },
];
