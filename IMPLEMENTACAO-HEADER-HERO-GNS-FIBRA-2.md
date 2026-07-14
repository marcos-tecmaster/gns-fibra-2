# IMPLEMENTACAO DO HEADER E HERO - GNS FIBRA 2.0

Data: 13/07/2026
Fase: Novo Header e Novo Hero

## 1. Escopo

Esta fase redesenhou somente o Header e o Hero publico da GNS Fibra 2.0.

Nao foram alterados:

- cards dos planos;
- beneficios/diferenciais;
- cobertura;
- CTA final;
- Footer;
- painel administrativo;
- API PHP;
- banco de dados;
- migrations;
- IXC;
- Indique e Ganhe;
- Analytics ou Pixel.

## 2. Contrato preservado

O Header e o Hero continuam usando o contrato atual do `SiteContentProvider`, com fallback local e carregamento via `api/site-content.php`.

Fontes preservadas:

- Logo: `public/logo-gns.png`, resolvido por `import.meta.env.BASE_URL`.
- Nome da empresa: `config.company.name`.
- Titulo do Hero: `config.company.heroTitle`.
- Descricao do Hero: `config.company.description`.
- Anos de mercado: `config.company.yearsActive`.
- Navegacao: `navigation`.
- WhatsApp: `config.contact.whatsappUrl` via `whatsappLink`.
- Central do Assinante: `config.links.customerPortal`.

Nenhum campo editavel pelo painel foi removido, substituido por dado fixo ou desacoplado da API.

## 3. Novo Header

Estrutura:

- Logo oficial com link para `#inicio`.
- Nome da empresa e subtitulo compacto.
- Navegacao principal dinamica em desktop.
- Central do Assinante preservada.
- CTA comercial `Falar no WhatsApp`, preservando o destino configurado.
- `ThemeToggle` integrado ao conjunto de acoes.
- Menu mobile unico, sem criar Header separado por tema.

Comportamento:

- Header fixo no topo com comportamento sticky discreto.
- Fundo com transparencias controladas e blur leve.
- Menu mobile bloqueia scroll apenas quando aberto.
- Links do menu mobile fecham o menu apos selecao.
- Tecla `Escape` fecha o menu.
- Botao mobile usa `aria-expanded` e `aria-controls`.
- Area de toque minima de 44 x 44 px nos controles.

## 4. Novo Hero

Estrutura:

- Eyebrow dinamico com anos de mercado.
- Um unico `h1`, usando `config.company.heroTitle`.
- Texto curto usando `config.company.description`.
- CTA principal para WhatsApp usando `whatsappLink`.
- CTA secundario para `#planos`.
- Indicadores curtos de confianca.
- Composicao visual hibrida com imagem de fibra optica, overlays por tema e area futura para mascote.

Revisao visual antes do commit:

- A primeira versao do novo Hero removia `hero-fiber.jpg` e usava um quadro abstrato com simbolo de Wi-Fi.
- A revisao visual identificou perda de impacto em relacao a versao Premium/Dark.
- A imagem de fibra foi reintegrada sem voltar ao codigo antigo.
- O quadro Wi-Fi deixou de ser protagonista.

Asset reintegrado:

- Caminho: `src/assets/hero-fiber.jpg`.
- Formato: JPEG.
- Dimensoes: 1920 x 1080 px.
- Peso original: 160.700 bytes, aproximadamente 160,70 kB.
- Resolucao: 96 dpi.
- Uso anterior: imagem decorativa full-bleed no Hero Premium/Dark.
- Uso atual: imagem decorativa de fundo do novo Hero, com `alt=""`, `fetchPriority="high"`, dimensoes declaradas e overlays de leitura.

Nao foi gerada versao WebP/AVIF nesta etapa porque o JPEG existente ja tem peso baixo para um asset hero full-bleed. O arquivo original foi preservado sem alteracoes.

## 5. Mascote oficial

Nao foi usado o arquivo de referencia do mascote no site.

O ponto futuro de insercao esta preparado no componente `HeroVisual` por meio de:

```tsx
data-future-mascot-slot="hero"
```

Quando houver pose individual oficial aprovada, ela podera substituir ou complementar o visual tecnologico sem publicar a folha completa e sem recorte improvisado.

Conceito preservado:

- Fibra optica como cenario tecnologico.
- Texto e CTAs no lado esquerdo.
- Lateral direita preparada para receber o mascote oficial futuramente.
- Sem placeholder visivel para o usuario.

## 6. Dark e Light

O Header e o Hero usam tokens existentes:

- `background`;
- `foreground`;
- `card`;
- `border`;
- `primary`;
- `primary-glow`;
- `primary-foreground`;
- `--color-bg`;
- `--color-bg-soft`;
- `--color-primary`;
- `--color-primary-hover`;
- `--color-hero-grid`;
- sombras semanticas.

O tema Dark continua sendo a versao mais marcante, com fundo grafite, fibra mais presente e glow laranja controlado.

O tema Light usa overlay claro, branco/titanium e grafite para preservar contraste sem apagar a fibra.

## 7. Acessibilidade

Implementado:

- Um unico `h1` no Hero.
- Navegacao principal com `aria-label`.
- Navegacao mobile com `aria-label`.
- Botao de menu com `aria-label`, `aria-expanded` e `aria-controls`.
- Escape fecha o menu mobile.
- Elemento visual do Hero com `aria-hidden="true"`.
- Foco visivel preservado.
- CTAs como links reais.
- Areas de toque adequadas.

## 8. Performance

Decisoes:

- Imagem de fibra reutilizada como asset decorativo existente.
- Nenhuma dependencia nova.
- Nenhum video automatico.
- Nenhum asset do mascote carregado.
- O quadro abstrato com Wi-Fi foi removido como protagonista.
- Hero reserva dimensoes para a imagem com `width` e `height`, reduzindo risco de layout shift.

## 9. Arquivos alterados

- `src/components/site/Header.tsx`
- `src/components/site/Hero.tsx`
- `src/styles.css`

## 10. Arquivos criados

- `IMPLEMENTACAO-HEADER-HERO-GNS-FIBRA-2.md`

## 11. Testes

Comandos executados nesta fase:

- `"C:\Program Files\nodejs\npm.cmd" run typecheck`
- `"C:\Program Files\nodejs\npm.cmd" run build`
- `git diff --check`
- `git status --short`
- `git diff --stat`

Resultados:

- Typecheck aprovado.
- Build aprovado.
- `git diff --check` aprovado, com avisos LF/CRLF esperados no Windows.
- Vite manteve o aviso conhecido sobre `theme-init.js` como script classico vindo de `public`.

Inspecao visual/tecnica realizada:

- 360 px;
- 390 px;
- 414 px;
- 430 px;
- 768 px;
- 1024 px;
- 1280 px;
- 1440 px;
- temas Dark e Light;
- menu mobile;
- console do navegador.

Resultado da inspecao:

- Sem overflow horizontal nos breakpoints testados.
- Um unico `h1` presente.
- CTAs do Hero com altura acima de 44 px.
- Fibra carregada como fundo decorativo no Dark e no Light.
- Slot futuro do mascote sem espaco vazio no mobile.
- Menu mobile abre com `aria-expanded="true"` e bloqueia scroll.
- `Escape` fecha o menu e libera scroll.
- Console sem erro de aplicacao identificado; apareceu apenas a mensagem conhecida de extensao/navegador `A listener indicated an asynchronous response...`.

## 12. Pendencias

- Validar contraste com ferramenta WCAG dedicada em fase propria.
- Inserir mascote somente quando houver pose individual oficial aprovada.
- Confirmar futuramente se a microcopy do Hero deve continuar igual ou receber texto comercial aprovado pela equipe.

## 13. Revisao do ritmo vertical

### Diagnostico

A comparacao com o commit `33f60d7` confirmou que os espacamentos excessivos ja existiam no baseline. Antes desta revisao, as alteracoes nao commitadas estavam limitadas a `Header.tsx`, `Hero.tsx` e `styles.css`; os componentes das demais secoes permaneciam inalterados.

As medicoes DOM identificaram que o vazio era causado exclusivamente pela soma dos paddings verticais de secoes adjacentes. Nao foram encontrados `margin`, `gap` entre secoes, `min-height`, altura fixa, pseudo-elemento ou wrapper invisivel interferindo no fluxo.

Elementos com `min-height` foram verificados e descartados como causa: o Hero usa `min-height: 760px` somente no desktop para sua composicao interna; os cards da Historia e dos Depoimentos usam alturas minimas locais; e a caixa de resultados da Cobertura usa `min-height: 128px`. Animacoes Framer Motion, imagens e decoracoes absolutas tambem nao reservam espaco entre as secoes.

Valores observados antes da correcao:

| Secao | Mobile | Desktop |
| --- | ---: | ---: |
| Diferenciais | 96 px | 112 px |
| Planos | 96 px | 128 px |
| Empresarial | 80 px | 112 px |
| Cobertura | 96 px | 128 px |
| Nossa Historia | 96 px | 128 px |
| Depoimentos | 96 px | 128 px |
| CTA WhatsApp | 96 px | 128 px |

Por isso, as transicoes Cobertura/Nossa Historia, Nossa Historia/Depoimentos e Depoimentos/CTA acumulavam 192 px no mobile e 256 px no desktop entre os conteudos. Dark e Light apresentavam exatamente as mesmas dimensoes; o fundo claro apenas deixava o vazio mais perceptivel.

Origem dos vazios observados:

- Antes de Nossa Historia: padding inferior da Cobertura somado ao padding superior da Historia.
- Entre Nossa Historia e Depoimentos: padding inferior da Historia somado ao padding superior de Depoimentos.
- Antes de Fale conosco pelo WhatsApp: padding inferior de Depoimentos somado ao padding superior do CTA.
- Nas demais transicoes: repeticao do mesmo padrao `py-24`/`md:py-32`, com variacao menor em Diferenciais e Empresarial.

### Correcao estrutural

Foi criado um sistema reutilizavel e independente de tema:

| Nivel | Mobile | Desktop | Aplicacao |
| --- | ---: | ---: | --- |
| Compacto | 56 px | 64 px | CTA final com bloco interno espacoso |
| Padrao | 64 px | 80 px | Diferenciais, Empresarial, Cobertura, Historia e Depoimentos |
| Amplo | 72 px | 96 px | Planos, devido a densidade e extensao do conteudo |

Os tokens `--section-space-compact`, `--section-space-standard` e `--section-space-wide` e as classes correspondentes foram adicionados a `src/styles.css`. Somente os paddings externos das secoes foram substituidos; conteudo, ordem, cards, Header, Hero, imagem de fibra, slot futuro do mascote, API, painel e banco foram preservados.

Depois da correcao, os principais intervalos combinados ficaram:

- Cobertura/Nossa Historia: 128 px no mobile e 160 px no desktop.
- Nossa Historia/Depoimentos: 128 px no mobile e 160 px no desktop.
- Depoimentos/CTA: 120 px no mobile e 144 px no desktop.
- CTA/Footer: 120 px no mobile e 128 px no desktop.

O componente `Stats` manteve seus 56 px por lado por funcionar como faixa compacta entre Hero e conteudo. O Footer manteve 64 px no topo e 32 px na base por possuir ritmo interno proprio.

### Comportamento e validacoes

- Dark e Light usam os mesmos tokens e mantem geometria identica.
- Mobile preserva separacao entre secoes sem fragmentar a rolagem.
- Desktop reduz os vazios mais evidentes sem comprimir os blocos de conteudo.
- Nao foram usadas margens negativas, posicionamento absoluto, JavaScript de altura ou regras especificas por resolucao.
- Matriz responsiva validada em 360, 390, 414, 430, 768, 1024, 1280 e 1440 px.
- Sem overflow horizontal, conteudo cortado ou alteracao da posicao natural do Footer.
- Header sticky e menu mobile preservados.
- Typecheck, build e `git diff --check` aprovados.
- Build manteve apenas o aviso conhecido do Vite sobre `theme-init.js` como script classico vindo de `public`.
- Console sem erro da aplicacao; foi registrada somente a mensagem conhecida do ambiente/extensao sobre fechamento de canal assincrono.
