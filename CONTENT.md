# O que falta preencher ou confirmar

Lista de tudo que está como `TODO` ou que eu (Claude) escrevi por suposição e precisa do seu OK.
Marque `[x]` conforme for resolvendo. Arquivo do código entre parênteses.

## 1. Fotos e arquivos (prioridade alta)

- [ ] **Sua foto recortada** (PNG sem fundo) para o hero — hoje é uma silhueta azul (`components/sections/FolderPlayground.tsx`)
- [ ] **Sua foto** para a janela do Sobre — hoje é uma silhueta laranja (`components/sections/About.tsx`)
- [ ] **CV em PDF** — o ⌘K tem "Baixar CV", mas o arquivo `public/cv-brena-angelo.pdf` não existe (`lib/site.ts`)
- [ ] **Print do MODO** — hoje mostra "print em breve" (`content/pt/projects.ts`)
- [ ] **Mais prints para as galerias** dos cases (checkout e painel da KADOSH, versão mobile etc.) (`content/pt/cases.ts`)

## 2. Links (prioridade alta)

- [ ] Link no ar da **KADOSH** (`content/pt/cases.ts` → `url`)
- [ ] Link no ar do **Banco de Talentos** (`content/pt/cases.ts` → `url`)
- [x] Paz no Lar — https://instituto-paz-no-lar.netlify.app/

## 3. Projetos

- [ ] **MODO**: stack usada e um resumo do que foi feito (está como "em desenvolvimento")
- [ ] **Resultados/métricas** de cada case — hoje aparecem como "—" (`content/cases/*.mdx`, blocos `<Metrics>`)
- [ ] **Decisões de UX** — escrevi a partir do que você contou; confirme se é o seu raciocínio (`content/cases/*.mdx`)
- [ ] **Banco de Talentos**: quantas acolhidas participam e como chegam até elas (`content/cases/banco-de-talentos.mdx`)
- [ ] **Paz no Lar**: algum número ou depoimento do instituto que possa ser público (`content/cases/paz-no-lar.mdx`)
- [ ] Manter **"Claude (assistente de código)"** nas ferramentas da KADOSH? (você listou; é uma linha em `content/cases/kadosh.mdx`)

## 4. Lighthouse (dados de dev)

- [ ] Rodar o Lighthouse (Chrome → DevTools → Lighthouse → modo **mobile**) em cada site no ar e me passar a nota de **Performance** (`content/pt/devdata.ts`)
  - [ ] Paz no Lar
  - [ ] KADOSH (quando estiver no ar)
  - [ ] Banco de Talentos (quando estiver no ar)
  - [ ] Este portfólio (eu meço na Fase 9)

## 5. Textos que eu escrevi e você precisa revisar

- [ ] **Sobre** — 2 parágrafos em 1ª pessoa (`content/pt/about.ts`)
- [ ] **FAQ / prazos** — você pediu para eu sugerir: landing page 1–2 semanas, site institucional 2–4, sistema web/e-commerce 6–10 (`content/pt/faq.ts`)
- [ ] **"Eu respondo no seu e-mail em até 2 dias úteis"** — aparece depois do envio do formulário (`components/sections/Contact.tsx`)
- [ ] **Modalidade**: escrevi "trabalho remoto". Aceita também presencial/híbrido no Ceará? (`content/pt/faq.ts`, `components/sections/Contact.tsx`)
- [ ] **Figma** e **Prototipação/Design System** no toolkit — confirme que usa (`content/pt/toolkit.ts`)

## 6. Trajetória

- [x] Projetos de cliente e Paz no Lar: 2026, 2 a 3 meses cada (Banco de Talentos: menos de 2 meses); manutenção contínua na KADOSH e no Paz no Lar
- [ ] **Anos** do técnico, da Engenharia de Software e da Licenciatura em Matemática (`content/pt/timeline.ts`)
- [ ] Nome da **escola técnica** (se quiser mostrar)

## 7. Depoimentos

- [ ] Pedir depoimentos **com autorização** a clientes (KADOSH, MODO), ao instituto ou a colegas: texto + nome + cargo (`content/pt/testimonials.ts`). Até lá aparece um convite, nunca citação inventada.

## 8. Certificações (já preenchidas a partir do seu Drive)

Conferidas nos PDFs da pasta **CERTIFICADOS** e de outras pastas do seu Drive (`content/pt/certifications.ts`):
Google UX Design, Google IT Support, Foundations of Cybersecurity (com links de verificação), IBM SkillsBuild (4 módulos), Sebrae Marketing Digital, DESPERTAR (SEDUC/Sebrae) e Extensão UNIASSELVI (360h).

- [ ] Quer **tirar** algum (ex.: os de carreira/marketing) ou **incluir** outro que não esteja no Drive?

## 9. Deploy (no fim)

- [ ] Conectar o repositório no Netlify (_Add new site → Import from Git_)
- [ ] (Opcional) `GITHUB_TOKEN` nas variáveis de ambiente do Netlify, só leitura pública, para não esbarrar no limite da API do GitHub
- [ ] (Opcional) domínio próprio e `NEXT_PUBLIC_SITE_URL`
