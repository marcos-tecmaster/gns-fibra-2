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
- Composicao visual hibrida com imagem de fibra optica, overlays por tema e mascote oficial no espaco preparado.

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

Na entrega inicial do Header e Hero, o mascote ainda nao era carregado. A primeira integracao oficial passou a usar somente a pose individual `apresentando`, sem utilizar a folha de referencia.

O ponto de insercao foi mantido no componente `HeroMascot` por meio de:

```tsx
data-future-mascot-slot="hero"
```

Na primeira integracao, o componente importava apenas `src/assets/mascote/mascote-apresentando.png`. Na atualizacao V2, esse derivado experimental foi substituido por `src/assets/mascote/v2/hero-apresentando-apontando.png`.

Conceito preservado:

- Fibra optica como cenario tecnologico.
- Texto e CTAs no lado esquerdo.
- Mascote oficial na lateral direita do desktop e em fluxo normal apos o conteudo no mobile.
- Sem card, moldura ou fundo visivel ao redor do personagem.

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
- Imagem de fibra decorativa com `alt=""`.
- Mascote informativo com alt text especifico, sem foco e sem bloquear interacoes.
- Foco visivel preservado.
- CTAs como links reais.
- Areas de toque adequadas.

## 8. Performance

Decisoes:

- Imagem de fibra reutilizada como asset decorativo existente.
- Nenhuma dependencia nova.
- Nenhum video automatico.
- Somente o derivado de producao da pose `apresentando` e carregado.
- Outras poses oficiais permanecem fora do bundle.
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
- Mascote contido no espaco reservado, sem corte ou overflow no mobile.
- Menu mobile abre com `aria-expanded="true"` e bloqueia scroll.
- `Escape` fecha o menu e libera scroll.
- Console sem erro de aplicacao identificado; apareceu apenas a mensagem conhecida de extensao/navegador `A listener indicated an asynchronous response...`.

## 12. Pendencias

- Validar contraste com ferramenta WCAG dedicada em fase propria.
- Gerar WebP/AVIF quando houver encoder confiavel que preserve transparencia e qualidade.
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

## 14. Primeira integracao oficial do mascote

A pose `apresentando` foi integrada ao Hero em 13/07/2026. O marcador anterior foi substituido pelo componente simples `HeroMascot.tsx`, mantendo `data-future-mascot-slot="hero"` como identificador do espaco preparado.

Preservado integralmente:

- `config.company.heroTitle` e o unico `h1`;
- `config.company.description`;
- CTA WhatsApp e CTA para planos;
- indicadores de confianca;
- `SiteContentProvider`;
- `hero-fiber.jpg` e overlays Dark/Light;
- Header, links, navegacao e conteudo comercial.

Comportamento:

- Desktop: mascote no lado direito, alinhado a base, sem sobrepor texto ou navegacao.
- Mobile: mascote em fluxo normal depois dos indicadores, com altura reservada e sem bloquear os CTAs.
- Dark: contorno e sombra discretos mantem contraste das partes pretas.
- Light: sombra grafite suave evita aspecto desbotado e halo branco.
- Acessibilidade: alt text informativo, dimensoes declaradas, sem foco e sem informacao comercial exclusiva.
- Performance: PNG de 756 x 900 px e 584.002 bytes, `loading="eager"`, `decoding="async"` e prioridade automatica para nao competir com a fibra.

Detalhes completos, hashes e validacoes estao em `IMPLEMENTACAO-MASCOTE-HERO-GNS-FIBRA-2.md`.

## 15. Hero com pose oficial V2

Atualizado em 15/07/2026.

O Header e a estrutura do Hero permanecem preservados. A unica alteracao publica no Hero desta fase foi a troca do asset importado por `HeroMascot.tsx`:

- antes: derivado experimental `src/assets/mascote/mascote-apresentando.png`;
- agora: `src/assets/mascote/v2/hero-apresentando-apontando.png`.

O novo derivado possui 687 x 900 px, 540.995 bytes e SHA-256 `583CC01A2B8A0F95AB7B827EFF9F812CA00E9A2CD82BCA4F59AEA1D5A26FD412`.

Composicao preservada:

- texto, CTAs e indicadores no lado esquerdo;
- mascote no lado direito no desktop;
- fluxo normal no mobile;
- imagem `hero-fiber.jpg` preservada;
- tema Dark e Light preservados;
- sem espelhamento, sem overlay sobre conteudo e sem aumento excessivo da altura do Hero.

A matriz responsiva da colecao V2 foi validada em 360, 390, 414, 430, 768, 1024, 1280 e 1440 px nos dois temas, incluindo Header, menu mobile, navegacao ativa, CTA e ausencia de overflow horizontal.
