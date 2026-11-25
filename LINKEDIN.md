# LinkedIn alinhado com o portfólio

Textos prontos para copiar e colar. Eles usam o mesmo título e a mesma proposta do site
(<https://portfolio-brena-angelo.netlify.app/>) e do CV, para quem chegar por qualquer
um dos três ver a mesma história.

> Eu (Claude) não tenho acesso à sua conta: você precisa colar os textos. Leva uns 10 minutos.

---

## 1. Título (headline)

Abra seu perfil → ícone de lápis ao lado do nome → **Título**.

**Português**

```
Desenvolvedora Full Stack · UX/UI Designer | Next.js, React, TypeScript, Node.js, PostgreSQL
```

**Inglês** (se ativar o perfil em inglês, passo 4)

```
Full Stack Developer · UX/UI Designer | Next.js, React, TypeScript, Node.js, PostgreSQL
```

No mesmo formulário:

- **Localização:** Maracanaú, Ceará, Brasil.
- **Site:** <https://portfolio-brena-angelo.netlify.app/>, com o texto do link "Portfólio".
  O LinkedIn mostra esse link logo abaixo do título.

---

## 2. Sobre

Perfil → **Sobre** → lápis.

**Português**

```
Sou desenvolvedora full stack e designer UX/UI. Uma dev que pensa como designer, uma designer que entrega código.

Construo produtos web de ponta a ponta: da pesquisa com usuários e do protótipo à API, ao banco de dados, aos testes e ao deploy. No dia a dia uso Next.js, React, TypeScript, Node.js, Prisma e PostgreSQL, e desenho no Figma.

Hoje sou voluntária no Instituto Paz no Lar como dev e designer, cuidando do site e do sistema interno que a equipe usa para acompanhar as mulheres atendidas, e faço projetos como freelancer, como a loja da KADOSH (varejo e atacado, frete, Pix e cartão e painel administrativo).

Certificada em Google UX Design. Curso Engenharia de Software e Licenciatura em Matemática.

Busco oportunidades em que design, código e impacto no usuário andem juntos.

Portfólio com os cases: https://portfolio-brena-angelo.netlify.app/
```

**Inglês**

```
I'm a full stack developer and UX/UI designer. A developer who thinks like a designer, a designer who ships code.

I build web products end to end: from user research and prototyping to APIs, databases, testing and deployment. Day to day I work with Next.js, React, TypeScript, Node.js, Prisma and PostgreSQL, and I design in Figma.

I currently volunteer at Instituto Paz no Lar as a developer and designer, looking after the website and the internal system the team uses to support the women they serve. I also take on freelance projects, such as the KADOSH store (retail and wholesale, shipping, Pix and card payments and an admin panel).

Google UX Design certified. Studying Software Engineering and a teaching degree in Mathematics.

I'm looking for roles where design, code and user impact go together.

Portfolio and case studies: https://portfolio-brena-angelo.netlify.app/en
```

---

## 3. Em destaque

Perfil → **Adicionar seção do perfil** → **Recomendado** → **Adicionar itens em destaque**
(se a seção já existir, use o **+** dela). Adicione nesta ordem:

1. **Link → Portfólio**
   - URL: `https://portfolio-brena-angelo.netlify.app/`
   - Título: `Portfólio · Brena Angelo — Full Stack × UX/UI`
   - Descrição: `Cases de KADOSH, Paz no Lar e Banco de Talentos, do problema ao deploy.`
   - A imagem de capa vem sozinha (a imagem Open Graph do site).
2. **Mídia → CV em PDF**
   - Envie `public/cv-brena-angelo.pdf` (baixe pelo botão "Baixar CV" do site).
   - Título: `Currículo · Brena Angelo`
   - Descrição: `Desenvolvedora Full Stack · UX/UI Designer. PDF, 1 página.`
   - Se o perfil em inglês estiver ativo, adicione também o `cv-brena-angelo-en.pdf`
     (`Résumé · Brena Angelo`).
3. _(opcional)_ **Link → Instituto Paz no Lar**
   - URL: `https://instituto-paz-no-lar.netlify.app/`
   - Descrição: `Site e sistema interno que desenvolvo como voluntária, em Next.js, Prisma e PostgreSQL.`

Arraste o portfólio para ficar em primeiro.

---

## 4. Perfil em inglês (opcional, recomendado para big techs)

Perfil → **Adicionar perfil em outro idioma** (no painel da direita) → English.
Use o título e o "About" em inglês acima. Recrutadores de fora veem essa versão automaticamente.

---

## 5. Experiência (para bater com o site e o CV)

| Cargo                                             | Empresa                    | Período      |
| ------------------------------------------------- | -------------------------- | ------------ |
| Desenvolvedora Full Stack e Designer (voluntária) | Instituto Paz no Lar       | 2026 – atual |
| Desenvolvedora Full Stack (freelancer)            | Autônoma (KADOSH e outros) | 2026 – atual |

Use as descrições do CV (`content/cv/cv-pt.json` → `experience`), que já estão no formato de bullets.
Não coloque números de resultado que você não tenha medido.

---

## 6. Checklist final

- [ ] Título igual ao do site
- [ ] Link do portfólio no topo do perfil (campo Site)
- [ ] Sobre colado
- [ ] Em destaque: portfólio (1º) e CV
- [ ] Foto de perfil: a mesma do hero do site (`public/brena/brena-hero.webp`), cortada no rosto
- [ ] URL personalizada (opcional): Perfil → **Editar perfil público e URL** → `linkedin.com/in/brena-angelo`
      (se mudar, atualize `lib/site.ts` → `social.linkedin`)
