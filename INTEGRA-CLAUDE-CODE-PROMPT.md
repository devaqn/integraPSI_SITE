# BRIEFING TÉCNICO — SITE INTEGRA PSICANÁLISE
**Versão:** 2.0 — Produção  
**Destino:** Claude Code  
**Deploy:** Netlify + domínio customizado `integrapsicanalise.com`

---

## 1. CONTEXTO E MISSÃO

Você vai construir do zero o site institucional completo da **Integra Psicanálise — A Nova Escola**. É uma escola de psicanálise presencial com sede em **Recife/PE** e unidades em **Caruaru/PE** e **João Pessoa/PB**.

O objetivo do site é **converter visitantes em alunos**: apresentar a proposta da escola, detalhar a grade curricular, exibir as condições de matrícula e direcionar para inscrição via WhatsApp. O design deve ser sofisticado, quente e acolhedor — transmitindo seriedade acadêmica com profundidade humana.

**Stack obrigatória:** HTML5 semântico + CSS3 com Custom Properties + JavaScript ES6+ vanilla. Sem frameworks, sem jQuery. Google Fonts e Font Awesome 6 via CDN são permitidos.

---

## 2. IMAGENS DISPONÍVEIS NA PASTA RAIZ

As imagens já estão na pasta do projeto com os seguintes nomes originais. Seu **primeiro passo** deve ser renomeá-las para nomes semânticos usando o script de renomeação abaixo, depois referenciar os nomes novos no código. **Não mova os arquivos — apenas renomeie.**

### Script de renomeação (execute no início do projeto)

```bash
# Renomear imagens para nomes semânticos
# Execute na pasta raiz do projeto onde estão as imagens

mv "WhatsApp Image 2026-102-19 at 17.26.48.jpeg"     "img-fachada-recife.jpg"
mv "WhatsApp Image 2026-02-19 at 17.24.39 (3).jpeg"  "img-professores-grid.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.44.jpeg"      "logo-selo-verde-bege.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.45 (1).jpeg"  "logo-selo-terracota.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.45 (2).jpeg"  "logo-selo-areia.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.45.jpeg"      "logo-selo-bege2.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.46 (1).jpeg"  "logo-selo-verde-escuro.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.46 (2).jpeg"  "logo-selo-verde-gradient.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.46 (3).jpeg"  "logo-selo-terracota2.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.46.jpeg"      "logo-selo-terracota3.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.47 (1).jpeg"  "logo-horizontal-verde-branco.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.47 (2).jpeg"  "paleta-cores-oficial.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.47.jpeg"      "logo-selo-verde-light.jpg"
mv "WhatsApp Image 2026-02-19 at 17.26.48.jpeg"      "logo-horizontal-banner.jpg"
mv "WhatsApp Image 2026-02-19 at 1711.26.48.jpeg"    "logo-horizontal-v2.jpg"
mv "WhatsApp Image 201126-02-19 at 17.26.48.jpeg"    "logo-horizontal-v3.jpg"
mv "WhatsApp Image 2026-02-19 at 17.24.44 (2).jpeg"  "abordagem-freudiana.jpg"
mv "WhatsApp Image 2026-02-19 at 17.24.44.jpeg"      "abordagem-lacaniana.jpg"
mv "WhatsApp Image 2026-02-19 at 17.24.44 (1).jpeg"  "abordagem-bioniana.jpg"
mv "WhatsApp Image 2026-02-19 at 17.24.45.jpeg"      "abordagem-kleiniana.jpg"
mv "WhatsApp Image 2026-02-19 at 17.24.45 (1).jpeg"  "abordagem-winnicottiana.jpg"
```

> As imagens restantes (17.24.20 até 17.24.43) são capturas de tela do site existente e servirão de **referência visual** para você entender a estrutura, mas NÃO serão usadas diretamente no site novo.

### Mapa de uso das imagens no site

| Imagem renomeada | Onde usar |
|---|---|
| `img-fachada-recife.jpg` | Hero da index — background fullscreen com overlay |
| `img-professores-grid.jpg` | Seção "Pilares" — foto da equipe docente |
| `logo-horizontal-banner.jpg` | Referência para construir o SVG do logo horizontal |
| `logo-selo-verde-bege.jpg` | Referência para construir o SVG do logo selado |
| `abordagem-freudiana.jpg` | Card Sigmund Freud na seção Abordagens |
| `abordagem-lacaniana.jpg` | Card Jacques Lacan na seção Abordagens |
| `abordagem-bioniana.jpg` | Card Wilfred Bion na seção Abordagens |
| `abordagem-kleiniana.jpg` | Card Melanie Klein na seção Abordagens |
| `abordagem-winnicottiana.jpg` | Card Donald Winnicott na seção Abordagens |

**Unidades sem foto ainda:** Para as páginas de Caruaru e João Pessoa, use divs com classe `.placeholder-foto` estilizadas (instruções na seção de unidades).

---

## 3. PALETA DE CORES OFICIAL

Extraída do brand guide oficial (`paleta-cores-oficial.jpg` na pasta).

```css
:root {
  /* === PALETA OFICIAL — NÃO ALTERAR === */
  --cor-verde:      #566043;   /* Verde musgo/oliva — cor dominante */
  --cor-terracota:  #8C3211;   /* Vermelho terracota — cor de destaque */
  --cor-areia:      #B29784;   /* Bege acastanhado — cor de apoio */
  --cor-creme:      #F2E6DF;   /* Creme claro — fundo principal */

  /* === DERIVADAS FUNCIONAIS === */
  --cor-lima:       #A8C640;   /* Verde lima — exclusivo para botões CTA */
  --cor-branco:     #FAF8F5;   /* Off-white — fundo de cards */
  --cor-preto:      #1A1A1A;   /* Quase preto — footer */
  --cor-texto:      #2C1A0E;   /* Marrom escuro — corpo de texto */
  --cor-overlay:    rgba(140, 50, 17, 0.55); /* Overlay terracota — hero */

  /* === TIPOGRAFIA === */
  --fonte-serif:    'Cormorant Garamond', Georgia, serif;
  --fonte-script:   'Dancing Script', cursive;
  --fonte-sans:     'Inter', system-ui, sans-serif;

  /* === ESPAÇAMENTOS === */
  --section-gap:    6rem;
  --container-max:  1200px;
  --radius-card:    12px;
  --radius-btn:     50px;

  /* === SOMBRAS === */
  --shadow-card:    0 4px 24px rgba(0,0,0,0.08);
  --shadow-hover:   0 8px 40px rgba(0,0,0,0.15);
  --transition:     0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Google Fonts (colar no `<head>` de TODOS os HTMLs):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Dancing+Script:wght@600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**Font Awesome 6:**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
```

---

## 4. LOGO — CONSTRUÇÃO EM SVG

O logo da Integra tem **duas formas**. Ambas devem ser construídas como SVG inline no HTML — nunca como `<img>`. Use as imagens renomeadas como referência visual.

### 4.1 Logo Horizontal (navbar + footer)

Estrutura: ícone circular à esquerda + texto à direita.

```
[ ícone SVG ] + "Integra Psicanálise" (Dancing Script, 26px)
                "A NOVA ESCOLA" (Inter, uppercase, letter-spacing: 0.3em, 11px)
```

O ícone SVG circular contém:
- Dois arcos externos (círculo partido — abertura embaixo de ~90°)
- Interior superior: espiral tipo yin-yang assimétrica
- Interior inferior: alvo duplo (dois círculos concêntricos com ponto central)
- Três pontos nos eixos norte, leste e sul

**Versão clara** (navbar no topo / hero): ícone `--cor-creme`, texto `--cor-creme`  
**Versão escura** (navbar ao rolar / fundo claro): ícone `--cor-verde`, texto `--cor-verde`  

### 4.2 Logo Selado (hero / footer decorativo)

Apenas o ícone SVG em formato maior (100–140px), com texto "Integra Psicanálise · A Nova Escola" curvando ao redor em arco usando SVG `<textPath>` em um `<path>` circular. Usar a imagem `logo-selo-verde-bege.jpg` como referência exata.

---

## 5. ARQUITETURA DE ARQUIVOS

```
projeto/
│
├── index.html                    ← Página principal
├── sede/
│   ├── recife.html               ← Sede Recife (com foto real)
│   ├── caruaru.html              ← Unidade Caruaru (placeholder de fotos)
│   └── joaopessoa.html           ← Unidade João Pessoa (placeholder de fotos)
│
├── assets/
│   ├── css/
│   │   └── style.css             ← CSS global completo
│   └── js/
│       └── main.js               ← JS global completo
│
├── img-fachada-recife.jpg        ← (renomeada pelo script)
├── img-professores-grid.jpg      ← (renomeada pelo script)
├── abordagem-freudiana.jpg       ← (renomeada pelo script)
├── abordagem-lacaniana.jpg       ← (renomeada pelo script)
├── abordagem-bioniana.jpg        ← (renomeada pelo script)
├── abordagem-kleiniana.jpg       ← (renomeada pelo script)
├── abordagem-winnicottiana.jpg   ← (renomeada pelo script)
├── logo-horizontal-banner.jpg    ← (referência — não usar no HTML)
├── logo-selo-verde-bege.jpg      ← (referência — não usar no HTML)
│
├── _redirects                    ← Netlify routing
└── netlify.toml                  ← Netlify config
```

> **Atenção:** As imagens ficam na raiz, não dentro de `/assets/images/`. Os `<img src>` devem usar caminhos relativos corretos dependendo de onde o HTML está: `../img-fachada-recife.jpg` nas páginas dentro de `/sede/`.

---

## 6. CONFIGURAÇÃO NETLIFY

### `_redirects` (na raiz)
```
/sede/*   /sede/:splat   200
/*        /index.html    200
```

### `netlify.toml` (na raiz)
```toml
[build]
  publish = "."
  
[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

> O domínio `integrapsicanalise.com` já está comprado. No Netlify, após o deploy, basta ir em **Domain Settings → Add custom domain** e apontar o DNS. Nenhuma configuração especial no código é necessária — o `netlify.toml` já cuida de tudo.

---

## 7. index.html — ESTRUTURA COMPLETA

### HEAD
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Integra Psicanálise — A Nova Escola | Recife, Caruaru, João Pessoa</title>
  <meta name="description" content="Formação em Psicanálise Clínica com abordagem plural: Freud, Lacan, Klein, Winnicott, Bion e muito mais. Sede em Recife/PE, unidades em Caruaru e João Pessoa.">
  <meta property="og:title" content="Integra Psicanálise — A Nova Escola">
  <meta property="og:description" content="A formação psicanalítica que integra todas as correntes. Venha ser Integra.">
  <meta property="og:image" content="img-fachada-recife.jpg">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://integrapsicanalise.com">
  <!-- Google Fonts + Font Awesome aqui -->
  <link rel="stylesheet" href="assets/css/style.css">
  <!-- Favicon inline SVG -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,..."> <!-- logo SVG mini -->
</head>
```

### NAVBAR (`<header id="navbar">`)

- `position: fixed; top: 0; width: 100%; z-index: 1000`
- Estado inicial: `background: transparent; padding: 1.5rem 0`
- Estado `.scrolled` (após 80px de scroll): `background: var(--cor-verde); padding: 1rem 0; box-shadow: 0 2px 20px rgba(0,0,0,0.2)`
- Transição: `transition: all var(--transition)`
- **Desktop:** logo à esquerda + nav links + botão CTA à direita
  - Links: `Início · Sobre · Abordagens · Módulos · Condições · Unidades · Contato`
  - Botão: `EU QUERO SER INTEGRA ✓` — fundo `--cor-lima`, texto `--cor-texto`, border-radius `--radius-btn`
- **Mobile (< 768px):** logo à esquerda + hambúrguer à direita
  - Drawer lateral: slide da direita, fundo `--cor-verde`, largura 80vw, links em coluna com `--cor-creme`
  - Overlay escuro atrás do drawer ao abrir
- O logo SVG troca de cor conforme estado: claro (transparente) → escuro não — **sempre claro** quando navbar for `--cor-verde`; quando transparente sobre o hero escuro, também claro. O logo escuro só aparece em fundos claros.

### SEÇÃO 1 — HERO (`<section id="inicio" class="hero">`)

```
height: 100vh; min-height: 600px;
background: url('img-fachada-recife.jpg') center/cover no-repeat;
position: relative;

/* overlay */
&::before {
  content: '';
  position: absolute; inset: 0;
  background: var(--cor-overlay);
}
```

Conteúdo centralizado (flex column, align/justify center), todo em z-index acima do overlay:

1. **Logo selado SVG** — 120px, cor `--cor-creme` — animação `fadeInDown 0.8s ease`
2. **H1** — *"A oportunidade perfeita para transformar sua carreira e sua vida começa agora."*  
   Font: `--fonte-serif`, 52px desktop / 34px mobile, cor `--cor-creme`, font-weight 600, line-height 1.2  
   Animação: `fadeInUp 0.8s ease 0.2s both`
3. **Subtítulo** — *"Integra Psicanálise — A Nova Escola"*  
   Font: `--fonte-script`, 30px, cor `--cor-lima`  
   Animação: `fadeInUp 0.8s ease 0.4s both`
4. **Dois botões lado a lado** (gap 1rem, flex-wrap wrap) — animação `fadeInUp 0.8s ease 0.6s both`
   - `EU QUERO SER INTEGRA ✓` → abre WhatsApp, fundo `--cor-lima`, texto escuro, padding `1rem 2.5rem`
   - `Conheça a escola ↓` → scroll para `#sobre`, border 2px solid white, texto branco, mesmo padding
5. **Seta scroll** no bottom center: ícone `fa-chevron-down`, animação `bounce 2s infinite`

### SEÇÃO 2 — SOBRE (`<section id="sobre">`)

**Fundo:** `--cor-creme`

**Bloco superior** — grid 2 colunas desktop (60/40), coluna única mobile:

*Coluna esquerda:*
- Tag/badge: `A NOVA ESCOLA` — pequeno, uppercase, `--cor-verde`, background `rgba(86,96,67,0.1)`, border-radius 4px
- H2: `"Quem somos"` — `--fonte-serif`, 42px, `--cor-terracota`
- Parágrafo: *"A Integra Psicanálise nasce com o propósito de inovar a formação psicanalítica no Brasil, integrando as principais escolas e abordagens do pensamento clássico e contemporâneo. Formamos psicanalistas com rigor teórico, sensibilidade clínica e visão plural. Para cada etapa da sua jornada, a Integra tem uma turma certa e benefícios exclusivos para você."*

*Coluna direita — 3 cards empilhados* (fundo `--cor-branco`, sombra `--shadow-card`, borda-esquerda 4px `--cor-verde`):
- `<i class="fa-solid fa-brain" style="color:var(--cor-terracota)">` + **Formação Completa** + "5 módulos progressivos com material didático e práticas terapêuticas complementares"
- `<i class="fa-solid fa-seedling">` + **Abordagem Plural** + "Freud, Lacan, Klein, Winnicott, Bion e muito mais — a única escola que integra todas as correntes"
- `<i class="fa-solid fa-handshake">` + **Equipe Qualificada** + "Professores com sólida formação acadêmica, ampla experiência clínica e paixão pelo ensino"

**Bloco inferior "Pilares"** — fundo `--cor-verde`, padding `var(--section-gap) 0`:

- H2: *"E foi sobre esses pilares que construímos a Integra Psicanálise"* — `--fonte-serif`, branco
- Foto `img-professores-grid.jpg` — border-radius 12px, width 100%, max-width 700px, centralizada
- Grid 3 colunas (1 mobile) de cards bege com ícones terracota:
  - `fa-brain` — *"Conhecimento tradicional da psicanálise com práticas terapêuticas complementares"* — "Essa fusão de saberes reflete a jornada do aluno, que busca não apenas aprender psicanálise, mas também integrar práticas para seu autoconhecimento e o desenvolvimento de seus futuros pacientes."
  - `fa-hands-holding-heart` — *"Jornada de desenvolvimento ético e responsável"* — "Ao se tornar psicanalista com visão ampliada, o aluno também se destaca como autoridade na área. A metodologia da Integra oferece as ferramentas para aprender, vivenciar e compartilhar esse desenvolvimento."
  - `fa-book-open` — *"Equipe docente altamente qualificada"* — "Na Integra Psicanálise, nossa equipe de professores une sólida formação acadêmica, ampla experiência clínica e paixão pelo ensino. Comprometidos com a ética e a humanização, formam psicanalistas preparados por meio de vivências clínicas e estudo contínuo das teorias psicanalíticas."
- Botão CTA centralizado: `FALE CONOSCO` + ícone WhatsApp — fundo `--cor-lima`

### SEÇÃO 3 — ABORDAGENS (`<section id="abordagens">`)

**Fundo:** `--cor-terracota`

- H2: *"As Escolas do Pensamento Psicanalítico"* — `--fonte-serif`, `--cor-creme`, 42px
- Subtítulo: *"Nossa formação integra as principais correntes da psicanálise mundial"* — `--cor-creme`, opacity 0.85
- **Grid 3 colunas desktop / 2 tablet / 1 mobile**

Cada card (fundo `rgba(0,0,0,0.2)`, border `1px solid rgba(242,230,223,0.15)`, border-radius `--radius-card`, padding `2rem`, hover: `background rgba(0,0,0,0.35) + translateY(-6px) + shadow`):

**Use as imagens reais como background no topo de cada card** (height: 200px, object-fit: cover, com overlay terracota escuro 0.4):

| Card | Imagem | Pensador | Abordagem | Descrição |
|------|--------|----------|-----------|-----------|
| 1 | `abordagem-freudiana.jpg` | **Sigmund Freud** | Abordagem Freudiana | Enfatiza o inconsciente e as pulsões sexuais e agressivas. Conceitos-chave: id, ego e superego, repressão, transferência e interpretação dos sonhos. |
| 2 | `abordagem-lacaniana.jpg` | **Jacques Lacan** | Abordagem Lacaniana | Enfatiza a linguagem e a estrutura do inconsciente. Conceitos-chave: estádio do espelho, real, imaginário e simbólico, Nome-do-Pai e objeto a. |
| 3 | `abordagem-kleiniana.jpg` | **Melanie Klein** | Abordagem Kleiniana | Enfatiza as relações precoces entre o bebê e seus objetos. Posição esquizoparanóide, posição depressiva e identificação projetiva. |
| 4 | `abordagem-winnicottiana.jpg` | **Donald Winnicott** | Abordagem Winnicottiana | Centrada nas relações mãe-bebê e no conceito de "holding". Ênfase no cuidado, ambiente e amadurecimento emocional da criança. |
| 5 | `abordagem-bioniana.jpg` | **Wilfred Bion** | Abordagem Bioniana | Foca nos processos mentais e a capacidade de pensar. Função continente, reverie, elementos beta e alfa, grupo como mente. |
| 6 | *(placeholder areia)* | **Wilhelm Reich** | Práticas Integrativas | Relação entre mente, corpo e energia vital. Bloqueios emocionais manifestos como tensões musculares crônicas. Base das terapias corporais integradas. |

Estrutura interna de cada card:
```
[ foto com overlay ] ← 200px height
[ "Abordagem Freudiana" em --cor-lima, italic, 13px uppercase ]
[ "Sigmund Freud" em --fonte-serif, --cor-creme, 24px bold ]
[ descrição em --cor-creme, opacity 0.85, 15px ]
```

### SEÇÃO 4 — GRADE CURRICULAR (`<section id="modulos">`)

**Fundo:** `--cor-verde`

- H2: *"Explore os módulos e o conhecimento que vai transformar sua prática"* — `--fonte-serif`, `--cor-creme`
- 5 acordeões. Cada acordeão tem:
  - **Cabeçalho clicável** com badge de módulo (gradiente `--cor-verde` → `--cor-terracota`, texto branco bold) + ícone `+`/`−`
  - **Painel expansível** com fundo `--cor-branco`, padding, animação de height via `max-height` transition
  - Dentro do painel: lista de disciplinas, cada uma com ícone de seta `→` em `--cor-verde`, título em `--cor-terracota` bold uppercase, descrição em `--cor-texto`

#### MÓDULO 1 — FUNDAMENTOS DA PSICANÁLISE

1. **INTRODUÇÃO À PSICANÁLISE E CONCEITOS BÁSICOS** — Esta disciplina apresentará os fundamentos introdutórios da psicanálise e seus conceitos basais que precedem o conhecimento na teoria necessária do tripé freudiano e homogeniza com oportunidade de um saber inicial a cada grupo em sala reunido, bem como terá a apresentação dos conceitos paradigmáticos do campo da saúde mental no século 19, que fizeram parte da formação intelectual de Sigmund Freud e permitiram-no fundar o campo psicanalítico e as Tópicas Freudianas.

2. **LEGISLAÇÃO E ÉTICA EM PSICANÁLISE** — Esta disciplina tem como objetivo apresentar e debater, tanto o Código de Ética que rege a Escola Integra Psicanálise, quanto apresentar aos Psicanalistas em formação a situação jurídica do exercício da profissão no Brasil.

3. **ESCOLA CLÁSSICA PSICANALÍTICA E A CONTEMPORANEIDADE** — Nesta disciplina será discutido um contraponto entre a causa da angústia na Clínica Clássica, baseada no gozo recalcado pela castração; e na atualidade, baseada no gozo como direito obrigatório pelo imperativo social de consumo. A angústia se desloca da proibição para a liberdade e, apesar disto, não deixa de existir.

4. **AS SETE ESCOLAS DE PSICANÁLISE** — As Sete Escolas de Psicanálise é uma reflexão necessária e urgente sobre a formação de profissionais no Brasil, visto que boa parte das instituições apresentam teorias individuais. A proposta aqui é traçar um paralelo que fomente a discussão equiparando possibilidades diversas na prática clínica.

5. **EPIGENÉTICA E TRANSGERACIONALIDADE DO TRAUMA** — A disciplina tem como objetivo apresentar como o ambiente, as experiências e traumas impactam a expressão gênica, influenciando a forma como o indivíduo se comporta criando padrões emocionais que atravessam gerações.

#### MÓDULO 2 — ESTRUTURAS CLÍNICAS

1. **NEUROCIÊNCIA E PSICANÁLISE** — Há milhares de anos o ser humano se interessa pelo que passa na nossa cabeça! Motivada por essa curiosidade, nessa disciplina apresentamos conceitos de neuroanatomia e neurofisiologia, que ajudam o aluno a compreender melhor o funcionamento do sistema nervoso, facilitando a compreensão dos processos de memória e recalque envolvidos no desenvolvimento da psique humana.

2. **ESTRUTURA CLÍNICA PSICANALÍTICA DAS NEUROSES** — Na psicanálise, são resultantes de conflitos inconscientes entre desejos instintivos e as exigências da realidade ou da moral. Esses conflitos geram sintomas como ansiedade, fobias, obsessões e histeria. Esta disciplina visa mostrar desde a Mitologia do Édipo até o Complexo de Édipo, fundamentado por Freud. As neuroses refletem questões não resolvidas da infância e o trabalho analítico busca torná-las conscientes para promover alívio.

3. **ESTRUTURA CLÍNICA PSICANALÍTICA DAS PSICOSES** — Na psicanálise, as psicoses são caracterizadas por uma ruptura com a realidade, manifestando-se em delírios, alucinações e desorganização do pensamento. Freud relacionou as psicoses à falha na formação do ego. Lacan destacou a "forclusão" de elementos fundamentais do simbólico como causa das psicoses. O tratamento psicanalítico busca criar um espaço para a escuta e reorganização do mundo interno do paciente.

4. **ESTRUTURA CLÍNICA PSICANALÍTICA DAS PERVERSÕES** — Na psicanálise, as perversões são caracterizadas por uma fixação do desejo em objetos ou práticas não convencionais, desviando-se da norma social. Freud as relacionou ao desvio no desenvolvimento psicossexual. Lacan associou as perversões à sustentação da lei simbólica pelo sujeito, mas com inversão das posições de desejo.

5. **A QUARTA ESTRUTURA DA PSICANÁLISE: O AUTISMO** — Esta disciplina explora o autismo como uma forma particular de subjetivação, buscando entender suas manifestações a partir do inconsciente e da relação do sujeito com o mundo externo. A partir das contribuições de autores como François Dolto, Donald Winnicott, Rosine e Robert Lefort, investiga-se a posição do autista em relação à linguagem, ao desejo e à constituição do eu.

6. **BORDERLINE E TRANSTORNOS DE PERSONALIDADE** — Esta disciplina apresentará os desafios na Psicanálise devido às dificuldades no manejo e a falta de coesão teórica para lidar com estruturas psíquicas que vem aparecendo cada vez mais na clínica atual. A proposta é uma re-visão na literatura psicanalítica desde os anos 1930 com um viés histórico, psicodinâmico, comportamentos, sintomas, metapsicologia e etiologia, bem como as técnicas terapêuticas e os problemas durante o tratamento.

#### MÓDULO 3 — CLÍNICA PSICANALÍTICA

1. **CLÍNICA PSICANALÍTICA I — INFÂNCIA** — A clínica infantil psicanalítica visa se concentrar na compreensão e observação das questões emocionais e comportamentais de crianças, reconhecendo que têm um mundo interno complexo, que suas experiências, sentimentos e conflitos podem se manifestar de maneiras diferentes dos adultos. É uma abordagem rica e complexa que requer uma compreensão profunda do desenvolvimento infantil e das dinâmicas emocionais.

2. **CLÍNICA PSICANALÍTICA II — ADOLESCÊNCIA** — A adolescência surge na nossa atualidade através dos diferenciais de cultura em cada região e país. Entender as características orgânicas e desdobramentos comportamentais é fundamental para saber lidar com esse público.

3. **CLÍNICA PSICANALÍTICA III — A PSICANÁLISE COM BEBÊS E A GERONTOLOGIA** — A clínica com bebês e a clínica do idoso representam o início da vida e o processo de envelhecimento rumo à finitude. O inconsciente, instância psíquica que fica registrada todas as experiências humanas, desde sua existência intrauterina até ao longo da velhice, é o alvo dos estudos e intervenções psicanalíticas.

4. **CLÍNICA PSICANALÍTICA IV — TÉCNICAS E MANEJO CLÍNICO** — Ao final do século XIX, surge a psicanálise, teoria e ética criadas por Sigmund Freud a partir de sua prática clínica. A Clínica valoriza a singularidade de cada sujeito que, pela associação livre — regra fundamental da psicanálise — e o estabelecimento da transferência, promove a retificação subjetiva por meio da escuta do inconsciente.

5. **PSICANÁLISE EM GRUPOS, INSTITUIÇÕES E EMPRESAS** — Esta disciplina apresentará as principais abordagens psicanalíticas sobre os processos grupais, fundamentos iniciais, conceitos-chave, desenvolvimento histórico, áreas de atuação, teorias e métodos. Haverá uma exploração da teoria psicanalítica dos grupos e dos fenômenos relevantes nas dinâmicas grupais com foco na evolução histórica e nos pioneiros da terapia de grupo, também em Instituições e Empresas.

#### MÓDULO 4 — ESPECIALIDADES E PRÁTICAS

1. **TEORIA E TÉCNICA EM PASSAGEM AO ATO E VAZÃO CRIATIVA** — Na Psicanálise, a passagem ao ato ocorre quando o sujeito de modo abrupto ou até violento quer sair de cena. E a vazão criativa tem a arte como ajuda nessa reorganização psíquica da não passagem.

2. **TERAPÊUTICA MEDICAMENTOSA E IMPACTOS CLÍNICOS** — Esta disciplina investiga o papel dos medicamentos no tratamento das psicopatologias e seus efeitos na subjetividade. Explora as implicações clínicas e éticas do uso de psicofármacos, refletindo sobre sua relação com abordagens psicoterapêuticas. Discute-se a integração entre intervenções médicas e a escuta psicanalítica, considerando o sujeito em sua singularidade. Também são abordados os limites e potencialidades da medicalização no contexto da saúde mental atualmente.

3. **PSICOSSOMÁTICA** — A psicossomática é uma área que estuda a interação entre mente e corpo, investigando como fatores emocionais e psicológicos podem influenciar a saúde física. Baseia-se na ideia de que emoções e conflitos internos podem contribuir para o desenvolvimento ou agravamento de doenças orgânicas, como hipertensão, asma e doenças autoimunes.

4. **PRÁTICAS INTEGRATIVAS I — WILHELM REICH** — Embasada na teoria de Wilhelm Reich, esta disciplina focará na relação entre mente, corpo e energia vital, propondo que bloqueios emocionais se manifestam como tensões musculares crônicas, chamadas de "couraças". Reich desenvolveu a análise do caráter e introduziu o conceito de energia orgônica, essencial para a saúde mental e física.

5. **BASES DE AFETO E ADOECIMENTO CONTEMPORÂNEO** — A disciplina explora os fundamentos afetivos que sustentam a constituição psíquica, analisando como as emoções e os vínculos primordiais influenciam os processos de subjetivação. Com base em teóricos psicanalíticos, serão discutidos temas como o papel do afeto na formação do inconsciente, sua relação com o desejo e a repetição, e os impactos nas dinâmicas do sofrimento psíquico.

6. **PRÁTICAS INTEGRATIVAS II — BIOENERGÉTICA E RENASCIMENTO** — Esta disciplina terá um olhar da bioenergética, que busca integrar corpo e mente, utilizando movimentos e posturas para liberar tensões emocionais e energéticas. O Renascimento (ou rebirthing), criado por Leonard Orr, é uma técnica de respiração consciente que visa liberar traumas emocionais profundos. Todas essas práticas ajudam a acessar e liberar emoções contidas no inconsciente, promovendo uma melhor transferência no setting analítico e harmonia interna.

#### MÓDULO 5 — FORMAÇÃO E CARREIRA

1. **ESTUDO DE CASOS PSICANALÍTICOS** — A disciplina oferece uma imersão aprofundada na análise de situações clínicas relatadas por Freud, Lacan e dentro de nossa atualidade, explorando a aplicação prática de teorias psicanalíticas no contexto terapêutico. Com ênfase em supervisão e reflexão crítica, a disciplina prepara futuros psicanalistas para atuar com sensibilidade e rigor técnico em diversas configurações clínicas.

2. **SEXOLOGIA NA PSICANÁLISE** — A disciplina explora a sexualidade humana sob a perspectiva psicanalítica, abordando suas dimensões inconscientes, conflitos, e influências culturais. Analisa conceitos como pulsão sexual, desejos, fantasias, repressão e o papel do complexo de Édipo na formação psíquica. Estuda questões como identidade de gênero, orientação sexual, disfunções sexuais e suas relações com o psiquismo.

3. **INTERPRETAÇÃO DOS SONHOS** — Esta disciplina aborda o sonho como via de acesso ao inconsciente, analisando sua função como realização de desejos reprimidos. Os conceitos de conteúdo manifesto e latente, trabalho onírico (condensação, deslocamento, simbolização) e a interpretação psicanalítica são centrais. A prática reflexiva enfatiza a escuta clínica, destacando a importância dos sonhos na compreensão das dinâmicas psíquicas.

4. **SAÚDE DO PROFISSIONAL, PREVENÇÃO E AUTOCUIDADO** — Esta disciplina tem o objetivo de trabalhar as questões da saúde do Psicanalista, que está diretamente ligada ao equilíbrio físico, mental e emocional, sendo essencial para o desempenho no trabalho. Abordaremos temas como: prevenção (alimentação equilibrada, atividade física, sono adequado e gestão do estresse) e autocuidado (reconhecer limites, buscar apoio quando necessário e cultivar hábitos saudáveis).

5. **CONSTRUÇÃO DE CARREIRA NA PSICANÁLISE E EMPREENDEDORISMO** — A disciplina aborda conceitos e estratégias para criar um negócio sustentável, alinhado ao propósito e à ética profissional. Desenvolva a mentalidade empreendedora para estruturar sua carreira como psicanalista.

Após o último acordeão: botão CTA centralizado verde lima → `SAIBA MAIS SOBRE NOSSOS MÓDULOS`

### SEÇÃO 5 — PARA CADA ETAPA (`<section id="turmas">`)

**Fundo:** `--cor-branco`

- H2: *"Para cada etapa, a Integra tem uma turma certa e benefícios exclusivos para você!"* — `--fonte-serif`, `--cor-verde`, 38px
- Subtítulo: *"Cada etapa da sua jornada importa para nós, e estamos com você em todas as fases da sua carreira."*
- **Grid 3 cards** (fundo `--cor-creme`, border-radius `--radius-card`, padding `2rem`, shadow, hover lift):
  - `fa-play-circle` + **INICIANTES** + "Alunos que estão iniciando o curso de psicanálise clínica"
  - `fa-rotate` + **ALUNOS AVANÇADOS** + "Já é estudante de Psicanálise e deseja continuar sua formação na Integra"
  - `fa-graduation-cap` + **PSICANALISTAS FORMADOS** + "Já são Psicanalistas e desejam cursar apenas as disciplinas exclusivas da Integra"
- Botão outline verde escuro centralizado: `VEJA NOSSAS CONDIÇÕES >`

### SEÇÃO 6 — CONDIÇÕES ESPECIAIS (`<section id="condicoes">`)

**Layout:** 3 colunas (1 por tipo de aluno) — coluna única em mobile, slider horizontal com scroll snap

**COLUNA 1 — ALUNOS INICIANTES** (fundo `--cor-creme`)
- Badge: `ALUNOS INICIANTES` — `--fonte-serif` italic, `--cor-terracota`
- Texto: *"Se você está iniciando agora sua formação em psicanálise, nós da Integra temos essas condições exclusivas esperando por você."*
- Card branco com lista checkmark verde lima:
  - ✅ Matrícula com **10% de desconto**: ~~R$ 350,00~~ por apenas **R$ 315,00**
  - ✅ Material didático do primeiro módulo **totalmente grátis**
  - ✅ Mensalidade até dezembro de 2025 por apenas **R$ 300,00** (pagos até o vencimento)
  - `⏰ APROVEITE QUE É POR TEMPO LIMITADO.`
- Botão verde lima: `EU QUERO SER INTEGRA ✓`

**COLUNA 2 — ALUNOS AVANÇADOS** (fundo `--cor-verde`, texto `--cor-creme`)
- Badge: `ALUNOS AVANÇADOS` — `--fonte-serif` italic, `--cor-lima`
- Texto: *"Se você já é estudante de Psicanálise e deseja continuar sua formação aqui na Integra, nós temos condições exclusivas para você! Confira abaixo!"*
- Card branco:
  - ✅ Matrícula com **14% de desconto**: ~~R$ 350,00~~ por apenas **R$ 300,00**
  - ✅ Mensalidade até dezembro de 2025 por **R$ 300,00** (pagos até o vencimento)
  - ✅ Material por módulo: **R$ 120,00** — adquirido a cada 5 ou 6 meses de aula
  - `⏰ APROVEITE QUE É POR TEMPO LIMITADO.`
- Botão verde lima: `EU QUERO SER INTEGRA ✓`

**COLUNA 3 — PSICANALISTAS FORMADOS** (fundo `--cor-areia`, texto escuro)
- Badge: `PSICANALISTAS FORMADOS` — `--fonte-serif` italic, `--cor-terracota`
- Texto: *"A grade curricular da Integra Psicanálise possui 10 disciplinas que você só encontrará aqui. Por isso, nós preparamos condições especiais para você, colega Psicanalista. Confira abaixo:"*
- Card branco:
  - ✅ Matrícula com **14% de desconto**: ~~R$ 350,00~~ por apenas **R$ 300,00**
  - ✅ Mensalidade até dezembro de 2025 por **R$ 300,00** (pagos até o vencimento)
  - ✅ Credenciamento 2025 **GRÁTIS**, mediante matrícula na completação do curso
  - `⏰ APROVEITE QUE É POR TEMPO LIMITADO.`
- Botão verde lima: `EU QUERO SER INTEGRA ✓`

### SEÇÃO 7 — NOSSAS UNIDADES (`<section id="unidades">`)

**Fundo:** `--cor-creme`

- H2: *"Nossas Unidades"* — `--fonte-serif`, `--cor-terracota`
- Subtítulo: *"Estamos presentes em três cidades do Nordeste. Venha nos conhecer."*
- **Grid 3 cards** (border-radius `--radius-card`, overflow hidden, sombra, hover lift):

**Card Recife — SEDE** (badge `SEDE` em `--cor-lima`):
- Imagem: `img-fachada-recife.jpg` — height 240px, object-fit cover
- Nome: *"Recife, Pernambuco"* — `--fonte-serif`, 24px
- Texto placeholder (editável): `[TEXTO: Descreva aqui a sede de Recife — sua história, estrutura, diferenciais e o que torna este espaço especial para os alunos.]`
- Ícone de mapa + *"Recife, PE"*
- Botão: `Conhecer a Sede →` → `sede/recife.html`

**Card Caruaru:**
- Placeholder foto (div `.placeholder-foto` com instrução interna)
- Nome: *"Caruaru, Pernambuco"*
- Texto: `[TEXTO: Descreva aqui a unidade de Caruaru.]`
- Botão: `Conhecer a Unidade →` → `sede/caruaru.html`

**Card João Pessoa:**
- Placeholder foto
- Nome: *"João Pessoa, Paraíba"*
- Texto: `[TEXTO: Descreva aqui a unidade de João Pessoa.]`
- Botão: `Conhecer a Unidade →` → `sede/joaopessoa.html`

Estilo dos placeholders de foto:
```css
.placeholder-foto {
  height: 240px;
  background: var(--cor-areia);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--cor-verde);
  border-bottom: 3px dashed var(--cor-verde);
}
.placeholder-foto::before { content: "📷"; font-size: 2rem; }
.placeholder-foto span { font-size: 0.85rem; font-style: italic; }
```

### SEÇÃO 8 — CONTATO E CTA FINAL (`<section id="contato">`)

**Fundo:** `--cor-verde`

Layout desktop: grid 2 colunas (texto/CTA + formulário). Mobile: coluna única.

**Coluna esquerda:**
- H2: *"Pronto para começar sua formação?"* — `--fonte-serif`, `--cor-creme`, 42px
- Subtítulo: *"Garanta já sua vaga na formação e receba o material didático de um módulo gratuitamente!"*
- Botão grande: `SOLICITAR MINHA INSCRIÇÃO` + `<i class="fab fa-whatsapp">` — verde lima, pill, 58px height
- **Informações de contato** (ícones `--cor-lima`, texto `--cor-creme`):
  - `fa-location-dot` Sede: Recife, PE — *(endereço a definir)*
  - `fa-location-dot` Unidade Caruaru, PE
  - `fa-location-dot` Unidade João Pessoa, PB
  - `fa-whatsapp` WhatsApp: *(número a definir — substituir `55XXXXXXXXXXX` em todos os href)*
  - `fa-envelope` contato@integrapsicanalise.com
  - `fa-globe` www.integrapsicanalise.com

**Coluna direita — Formulário:**
```html
<form class="contato-form" name="contato" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contato">
  <p hidden><input name="bot-field"></p>
  <!-- campos: nome, email, whatsapp, select-perfil, select-unidade, textarea, botão -->
</form>
```
> O atributo `data-netlify="true"` ativa o **Netlify Forms** — os formulários chegam direto no painel do Netlify sem backend. É gratuito e funciona automaticamente com o deploy. Não remova esses atributos.

Campos do formulário (input fundo `rgba(255,255,255,0.1)`, border `rgba(242,230,223,0.3)`, texto `--cor-creme`, placeholder `rgba(242,230,223,0.6)`, focus: border `--cor-lima`):
- Nome completo
- E-mail
- WhatsApp
- Select: *"Você é..."* (Iniciante / Aluno Avançado / Psicanalista Formado)
- Select: *"Unidade de interesse"* (Recife / Caruaru / João Pessoa)
- Textarea: Mensagem *(opcional)*
- Botão: `ENVIAR MENSAGEM` — fundo `--cor-lima`, texto escuro, width 100%

### SEÇÃO 9 — FOOTER (`<footer>`)

**Fundo:** `--cor-preto`

Grid 4 colunas desktop / 2 tablet / 1 mobile:
- **Col 1:** Logo horizontal SVG (versão clara), tagline italic `--cor-areia`
- **Col 2:** Navegação rápida — links âncora para todas as seções
- **Col 3:** Unidades — links para `sede/*.html`
- **Col 4:** Contato — e-mail, WhatsApp, redes sociais

Linha inferior:
- `© 2025 Integra Psicanálise — A Nova Escola. Todos os direitos reservados.`
- Ícones sociais: `fa-brands fa-instagram`, `fa-brands fa-whatsapp`, `fa-brands fa-youtube` — cor `--cor-areia`, hover `--cor-lima`

---

## 8. PÁGINAS DE UNIDADES (`sede/*.html`)

Todas as 3 páginas têm **exatamente a mesma navbar e footer** da index (copiar o HTML ou usar includes via JavaScript). Cada página é auto-contida (não há sistema de templates — copie o navbar/footer em cada arquivo).

### Caminhos relativos nas páginas de sede

Nas páginas dentro de `/sede/`, todos os caminhos de assets devem usar `../`:
```html
<link rel="stylesheet" href="../assets/css/style.css">
<script src="../assets/js/main.js"></script>
<img src="../img-fachada-recife.jpg" ...>
```

### Estrutura de cada página de unidade

**1. HERO DA UNIDADE**
- Imagem de fundo: `../img-fachada-recife.jpg` (Recife) ou `.placeholder-foto` (Caruaru/JP)
- Overlay `--cor-overlay`
- Breadcrumb: `Início / Unidades / [Cidade]` — links reais, cor `--cor-lima`
- H1: nome da unidade em `--fonte-script`
- H2: "Integra Psicanálise — A Nova Escola"

**2. SOBRE ESTA UNIDADE**
- Grid 2 colunas: texto | fotos
- Bloco de texto com **comentário HTML editável**:
```html
<!-- 
  ✏️ EDITE AQUI: Conte a história desta unidade.
  Quando foi fundada? Quantos alunos já passaram?
  Quais são os diferenciais deste espaço?
  Quem são os professores locais?
-->
<p>A unidade de [Cidade] da Integra Psicanálise...</p>
```
- Grid de **4 a 6 fotos internas** — Recife usa placeholders com labels descritivos; ao adicionar fotos, simplesmente substituir o `src` do `<img>`

**3. GALERIA**
- Grid 4 colunas desktop / 2 mobile, gap 8px
- Cada item: `<img>` ou `.placeholder-foto` com altura 220px, object-fit cover, border-radius 8px
- Labels em cada placeholder: "Sala de aula", "Recepção", "Sala de estudos", "Espaço de convivência", "Biblioteca", "Detalhe da fachada"

**4. LOCALIZAÇÃO**
- Mapa embed (placeholder):
```html
<!-- 
  📍 MAPA: Substituir pelo iframe do Google Maps.
  Acesse maps.google.com → encontre o endereço → Share → Embed a map → copie o <iframe>
-->
<div class="mapa-placeholder">
  <i class="fa-solid fa-map-location-dot"></i>
  <p>Mapa da unidade de [Cidade]</p>
  <small>Substituir pelo iframe do Google Maps</small>
</div>
```
- Endereço, telefone, e-mail da unidade, horário de funcionamento (todos com `<!-- EDITE AQUI -->`)

**5. CTA DA UNIDADE**
- Fundo `--cor-verde`
- Texto: *"Quer conhecer nossa unidade em [Cidade] pessoalmente?"*
- Botão verde lima: `ENTRAR EM CONTATO` → WhatsApp

---

## 9. `assets/css/style.css` — ESPECIFICAÇÕES

```css
/* === RESET === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
img { max-width: 100%; height: auto; display: block; }
a { text-decoration: none; color: inherit; }

/* === BASE === */
body {
  font-family: var(--font-sans);
  color: var(--cor-texto);
  line-height: 1.65;
  overflow-x: hidden;
  background: var(--cor-branco);
}

/* === CONTAINER === */
.container { max-width: var(--container-max); margin: 0 auto; padding: 0 1.5rem; }

/* === SEÇÕES === */
section { padding: var(--section-gap) 0; }

/* === TIPOGRAFIA === */
h1, h2, h3 { font-family: var(--font-serif); line-height: 1.2; }
h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.75rem, 3.5vw, 2.75rem); }
h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); }

/* === BOTÕES === */
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.9rem 2rem; border-radius: var(--radius-btn); font-family: var(--font-sans); font-weight: 600; font-size: 0.9rem; letter-spacing: 0.05em; cursor: pointer; transition: all var(--transition); border: 2px solid transparent; text-transform: uppercase; }
.btn-primary { background: var(--cor-lima); color: var(--cor-texto); }
.btn-primary:hover { filter: brightness(1.08); transform: translateY(-2px); box-shadow: var(--shadow-hover); }
.btn-outline-white { background: transparent; color: white; border-color: white; }
.btn-outline-white:hover { background: white; color: var(--cor-terracota); }
.btn-outline-verde { background: transparent; color: var(--cor-verde); border-color: var(--cor-verde); }
.btn-outline-verde:hover { background: var(--cor-verde); color: white; }

/* === ANIMAÇÕES === */
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }

.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }

/* === MEDIA QUERIES === */
/* mobile: < 480px, tablet: 480–768px, desktop: > 768px, wide: > 1200px */
```

---

## 10. `assets/js/main.js` — ESPECIFICAÇÕES

Implemente exatamente estas funcionalidades, nesta ordem no arquivo:

```javascript
// 1. NAVBAR SCROLL — adiciona .scrolled após 80px
// 2. MENU MOBILE — toggle .open no drawer, overlay, aria-expanded
// 3. SMOOTH SCROLL — todos os [href^="#"] com offset do navbar height
// 4. REVEAL ON SCROLL — IntersectionObserver em .reveal → adiciona .visible
// 5. ACCORDION MÓDULOS — apenas 1 aberto por vez, animação de max-height
// 6. ACTIVE NAV LINK — IntersectionObserver nas sections → highlight no menu
// 7. WHATSAPP CTA — todos .btn-whatsapp abrem wa.me/55XXXXXXXXXXX em nova aba
//    IMPORTANTE: substituir 55XXXXXXXXXXX pelo número real antes do deploy
// 8. NETLIFY FORMS — submit feedback visual (loading → success → reset)
// 9. BACK TO TOP — botão aparece após 400px de scroll, smooth scroll ao topo
```

Cada função deve ser **isolada, comentada** e inicializada no `DOMContentLoaded`.

---

## 11. CHECKLIST DE QUALIDADE — VERIFICAR ANTES DE CONCLUIR

Antes de dar o trabalho como concluído, confirme cada item:

**Arquivos e estrutura:**
- [ ] Script de renomeação de imagens executado com sucesso
- [ ] Todos os 7 arquivos HTML criados (`index.html` + 3 páginas de sede)
- [ ] `assets/css/style.css` criado e linkado em todos os HTMLs
- [ ] `assets/js/main.js` criado e linkado em todos os HTMLs
- [ ] `_redirects` na raiz com conteúdo correto
- [ ] `netlify.toml` na raiz configurado

**Imagens:**
- [ ] `img-fachada-recife.jpg` usada como hero da index e de `sede/recife.html`
- [ ] `img-professores-grid.jpg` usada na seção Pilares
- [ ] 5 imagens de abordagens usadas nos cards da seção Abordagens
- [ ] Placeholders `.placeholder-foto` aplicados onde falta foto real

**Funcionalidade:**
- [ ] Navbar transparente → verde ao rolar (testar em 80px)
- [ ] Menu hambúrguer funciona no mobile (< 768px)
- [ ] Todos os links de âncora navegam suavemente para a seção correta
- [ ] Acordeões dos módulos abrem/fecham com animação
- [ ] Formulário tem `data-netlify="true"` e `name="contato"`
- [ ] Todos os botões CTA de inscrição apontam para `wa.me/55XXXXXXXXXXX`
- [ ] Botões "Conhecer Unidade" levam para `sede/*.html` corretos
- [ ] Links no footer e navbar de `sede/*.html` usam `../` corretamente

**Visual:**
- [ ] Paleta usada corretamente (só as 4 cores oficiais + derivadas)
- [ ] Logo SVG aparece no navbar e no hero
- [ ] Responsivo testado em 375px, 768px e 1280px
- [ ] Seções com `class="reveal"` têm animação ao entrar na viewport
- [ ] Hover nos cards funciona (lift + sombra)

**Netlify:**
- [ ] `_redirects` presente para evitar 404 em navegação direta
- [ ] `netlify.toml` com headers de segurança
- [ ] Formulário com `data-netlify="true"` (Netlify Forms gratuito)
- [ ] Nenhum caminho absoluto (ex: `/assets/...`) nas páginas de `sede/` — usar `../`

---

## 12. INSTRUÇÕES DE DEPLOY NO NETLIFY

*(Incluir este bloco como comentário HTML no topo do `index.html` para o dono do site)*

```html
<!--
  ╔══════════════════════════════════════════════════════════════╗
  ║           COMO FAZER O DEPLOY NO NETLIFY                     ║
  ╠══════════════════════════════════════════════════════════════╣
  ║                                                              ║
  ║  1. Acesse app.netlify.com e faça login                      ║
  ║  2. Clique em "Add new site" → "Deploy manually"             ║
  ║  3. Arraste a PASTA INTEIRA do projeto para a área indicada  ║
  ║  4. Aguarde o deploy (geralmente < 1 minuto)                 ║
  ║                                                              ║
  ║  DOMÍNIO CUSTOMIZADO:                                        ║
  ║  5. Vá em Site Settings → Domain Management                  ║
  ║  6. Clique "Add custom domain" → digite integrapsicanalise.com ║
  ║  7. No painel do seu provedor de domínio, aponte o DNS:      ║
  ║     - Tipo: CNAME, Nome: www, Valor: [seu-site].netlify.app  ║
  ║     - Tipo: A, Nome: @, Valor: 75.2.60.5                     ║
  ║  8. Aguarde a propagação (até 48h, geralmente < 1h)          ║
  ║                                                              ║
  ║  FORMULÁRIOS:                                                ║
  ║  - O formulário de contato é processado pelo Netlify Forms   ║
  ║  - Respostas chegam em: app.netlify.com → Forms              ║
  ║  - Configure notificações por e-mail em: Forms → Settings    ║
  ║                                                              ║
  ║  WHATSAPP — ANTES DE PUBLICAR:                               ║
  ║  - Buscar "55XXXXXXXXXXX" em todos os arquivos               ║
  ║  - Substituir pelo número real com DDD (ex: 5581999999999)   ║
  ║                                                              ║
  ╚══════════════════════════════════════════════════════════════╝
-->
```

---

*Briefing gerado a partir da análise das 70 imagens do material de marca da Integra Psicanálise: brand guide com paleta oficial (hex exatos #566043, #8C3211, #B29784, #F2E6DF), todas as versões do logo, foto da fachada da sede de Recife, grid de professores, imagens dos 5 pensadores psicanalíticos e capturas completas do site existente (www.integrapsicanalise.com) com todo o conteúdo dos 5 módulos, 25 disciplinas, 3 faixas de condições e seções institucionais.*
