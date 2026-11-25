# Portfólio — Brena Angelo · Full Stack × UX/UI

Portfólio pessoal em que **o próprio site é o case de UX/UI**: cada interação mostra interface, processo e código.
No ar em **https://portfolio-brena-angelo.netlify.app**.

## Stack

| Camada     | Ferramentas                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict)                                           |
| Estilo     | Tailwind CSS 4 com tokens em CSS variables (`styles/tokens.css`) — sem biblioteca de componentes              |
| Movimento  | Motion (`LazyMotion`, layout, drag, `AnimatePresence`) · GSAP + ScrollTrigger (carregado sob demanda) · Lenis |
| Conteúdo   | Arquivos tipados em `content/pt/*.ts` e case studies em MDX (`content/cases/*.mdx`)                           |
| Dados      | GitHub (contribuições e linguagens) via ISR de 24h, com estado vazio se a API falhar                          |
| Formulário | Netlify Forms (honeypot, validação inline, funciona sem JS)                                                   |
| Qualidade  | ESLint · Prettier · Playwright (E2E, axe-core WCAG 2.2 AA, sem JS, screenshots)                               |
| Deploy     | Netlify (`@netlify/plugin-nextjs`)                                                                            |

## Rodar localmente

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # produção
```

Sem acesso ao GitHub (ex.: rede bloqueada), os gráficos de "Dados de dev" mostram um estado vazio. Para ver o layout com dados de exemplo (só local, marcado na tela):

```bash
DEVDATA_FIXTURE=1 npm run build && npm start
```

## Scripts

| Comando                                                 | O que faz                                                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `npm run dev`                                           | servidor de desenvolvimento                                                                          |
| `npm run build` / `npm start`                           | build e servidor de produção                                                                         |
| `npm run lint` · `npm run typecheck` · `npm run format` | ESLint · TypeScript · Prettier                                                                       |
| `npm run test:e2e`                                      | Playwright (precisa de `npm run build` antes; sobe o servidor na porta 3100)                         |
| `npm run cv`                                            | gera os currículos em PDF (`public/cv-brena-angelo.pdf` e `-en.pdf`) a partir de `content/cv/*.json` |

Para rodar os testes com um Chromium já instalado no sistema: `PW_CHROMIUM=/caminho/do/chrome npm run test:e2e`.
Na primeira vez em outra máquina: `npx playwright install chromium`.

## Onde editar o conteúdo

| O quê                                   | Arquivo                                                                |
| --------------------------------------- | ---------------------------------------------------------------------- |
| Links, e-mail, URL do site              | `lib/site.ts`                                                          |
| Sobre                                   | `content/pt/about.ts`                                                  |
| Serviços                                | `content/pt/services.ts`                                               |
| Projetos (cards)                        | `content/pt/projects.ts` + prints em `public/projects/`                |
| Case studies                            | `content/pt/cases.ts` (metadados) e `content/cases/<slug>.mdx` (texto) |
| Trajetória                              | `content/pt/timeline.ts`                                               |
| Ferramentas e certificações             | `content/pt/toolkit.ts` · `content/pt/certifications.ts`               |
| FAQ                                     | `content/pt/faq.ts`                                                    |
| Depoimentos (só reais, com autorização) | `content/pt/testimonials.ts`                                           |
| Notas de Lighthouse                     | `content/pt/devdata.ts`                                                |
| Currículo                               | `content/cv/cv-pt.json` · `content/cv/cv-en.json` → `npm run cv`       |

O que ainda falta preencher está em **[CONTENT.md](./CONTENT.md)**.

## Arquitetura

```
app/                 rotas (home, /projetos/[slug], /styleguide, 404), OG images, sitemap, robots
components/
  sections/          Hero, Intro, About, Services, Projects, Timeline, DevData, Testimonials, Toolkit, Faq, Contact, Footer
  case/              template do case (ProcessBar, Decisions, Architecture, Metrics, Gallery, NextProject)
  ui/                Nav/Dock, CommandPalette, Cursor, SelectionBox, NotchCard, Window, Folder, Pill…
  motion/            Reveal, Marquee, Magnetic, Tilt, Counter, ScrollFx (GSAP), SmoothScroll (Lenis)
  modes/             Modo Wireframe, Modo Inspeção, easter egg
  providers/         Preferences (tema, movimento, modos, LazyMotion), LazyChrome (carregamento sob demanda)
content/             textos tipados, MDX dos cases, JSON do currículo
lib/                 site, GitHub/ISR, GSAP loader, scroll, OG renderer, utilitários
styles/              tokens, globals, hero, motion, modes
e2e/                 testes Playwright
```

### Princípios de motion

- Toda animação tem propósito declarado em comentário: `feedback`, `orientação`, `hierarquia` ou `deleite`.
- Só `transform`, `opacity` e `clip-path`. Idle pausa fora da viewport e com a aba oculta.
- `prefers-reduced-motion` (ou o toggle no ⌘K): sem intro, parallax, pin, scroll suave, cursor e idle — tudo vira estado final.
- Sem JavaScript a página está completa.

### Recursos de UX

- **⌘K / Ctrl+K**: busca seções, projetos e tecnologias; copia e-mail, baixa o CV, troca tema, liga modos.
- **Modo Wireframe**: o site vira o esqueleto rosa (só CSS sobre o DOM real), com transição em onda.
- **Modo Inspeção** (tecla `I`): grid de 12 colunas e caixa de seleção com componente, fonte, cor, contraste e espaçamento.
- **Easter egg**: Konami code ou 5 cliques no avatar.

## Deploy (Netlify)

1. _Add new site → Import from Git_ → `riiiass/portfolio-brena`. O `netlify.toml` já define build, Node 22, plugin e cabeçalhos.
2. Nome do site: `portfolio-brena-angelo` (é a URL usada em `lib/site.ts`, sitemap e Open Graph). Domínio próprio: ajuste `NEXT_PUBLIC_SITE_URL`.
3. (Opcional) `GITHUB_TOKEN` com acesso só de leitura pública, para não esbarrar no limite da API do GitHub.
4. O formulário "contato" aparece em _Forms_ depois do primeiro deploy (detectado por `public/__forms.html`). Ative as notificações por e-mail lá.

## Qualidade (medido localmente, build de produção)

- Acessibilidade: **0 violações** axe-core (WCAG 2.2 A/AA) em home, cases e 404, temas claro e escuro, desktop e mobile.
- Lighthouse mobile (home, 1ª visita com intro): Acessibilidade 100 · Boas práticas 100 · SEO 100 · Performance ~81.
  LCP observado ~0,2 s e CLS 0; a nota de performance é limitada pela simulação de rede lenta sobre o JS inicial e pela intro da 1ª visita.

## Licenças

Código © Brena Angelo. Fontes do Google Fonts sob SIL Open Font License (ver `assets/fonts/LICENSE.txt`).
