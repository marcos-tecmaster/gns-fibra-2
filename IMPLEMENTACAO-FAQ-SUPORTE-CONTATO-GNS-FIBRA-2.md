# IMPLEMENTACAO FAQ, SUPORTE E CONTATO - GNS FIBRA 2.0

Data: 16/07/2026
Fase: FAQ + suporte humanizado + contato/WhatsApp
Status: implementado localmente, sem commit

## 1. Escopo

Esta fase adiciona tres evolucoes publicas ao frontend:

- secao `Support`, com atendimento humanizado e canais de contato;
- secao `FAQ`, com accordion acessivel e dados estruturados `FAQPage`;
- nova composicao da `CTASection`, com contato/WhatsApp e mascote oficial acenando.

Ordem atual da pagina:

1. Hero
2. Stats
3. Differentials
4. Plans
5. Benefits
6. Technologies
7. Business
8. Coverage
9. History
10. Support
11. Testimonials
12. FAQ
13. CTASection
14. Footer

Nao foram alterados banco, API PHP, painel administrativo, planos, precos, velocidades, regras comerciais, Hero, Technologies, Business, History, Testimonials, WhatsAppFloat, IXC, Indique e Ganhe, Analytics ou Pixel.

## 2. Estado inicial do Git

- `git status --short`: limpo.
- Branch: `main`.
- Ultimo commit: `07a1e1e feat: integrate official GNS mascot collection v2`.
- `git stash list`: vazio.
- `git diff --check`: sem problemas.
- `git diff --cached --name-only`: vazio.

Nao foram executados `git add`, commit ou push.

## 3. Assets de producao

Origem preservada:

`docs/branding/mascote/originais/v2-oficiais/`

Destino:

`src/assets/mascote/v2/`

Metodo aplicado:

1. leitura dos PNGs originais sem alteracao;
2. medicao do retangulo real de alpha;
3. remocao apenas do canvas transparente excessivo;
4. recomposicao com 48 px de margem segura;
5. redimensionamento bicubico via encoder PNG nativo do Windows;
6. preservacao de transparencia, proporcao, cores, logo, antenas, maos, pes, rosto e acessorios.

Nenhuma imagem foi espelhada, recolorida, redesenhada, corrigida por IA ou sobrescrita no acervo original.

| Asset | Original | Peso original | Producao | Peso final | Economia | SHA-256 final | Halo |
| --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `suporte-tecnico.png` | 1080 x 1350 px | 1.075.667 bytes | 596 x 840 px | 471.752 bytes | 603.915 bytes, 56,14% | `9537D61EFF64F9736FCBB1D5B846A63C7E19C516B91F70F1F6EA490743CB5050` | contorno verde fino discreto perceptivel no original |
| `faq-pensando.png` | 1080 x 1350 px | 1.070.379 bytes | 515 x 840 px | 447.765 bytes | 622.614 bytes, 58,17% | `99107DAE22200D320B0DF1875FF235E11DD2F8AFD9A618A6D2B9A929A3769918` | contorno verde fino discreto perceptivel no original |
| `contato-whatsapp-acenando.png` | 1080 x 1350 px | 1.134.032 bytes | 582 x 840 px | 495.563 bytes | 638.469 bytes, 56,30% | `AEF5106E238FFC1D230D78341CA1334906CDEA32EA0B051DC2545CF85449DD2C` | contorno verde fino discreto perceptivel no original |

## 4. Suporte humanizado

Arquivo criado:

- `src/components/site/Support.tsx`

Posicao:

`<History />`, `<Support />`, `<Testimonials />`

Conteudo publicado:

- etiqueta: `ATENDIMENTO GNS FIBRA`;
- titulo: `Atendimento humano para ajudar você de verdade.`;
- descricao: `Seja para conhecer os planos, verificar sua conexão ou acessar os serviços de cliente, nossa equipe está pronta para orientar você.`

Opcoes:

- `Quero contratar`: CTA para WhatsApp com a mensagem `Olá! Quero conhecer os planos da GNS Fibra.`;
- `Já sou cliente`: CTA para WhatsApp com a mensagem `Olá! Já sou cliente GNS Fibra e preciso de atendimento.`;
- `Central do Assinante`: CTA para `config.links.customerPortal`.

Contatos dinamicos usados:

- `config.contact.whatsappUrl`;
- `config.contact.phone`;
- `config.contact.email`;
- `config.links.customerPortal`.

O mascote `suporte-tecnico.png` e decorativo, usa `alt=""`, `aria-hidden="true"`, `loading="lazy"`, `decoding="async"`, `width={596}`, `height={840}`, fluxo normal no mobile e coluna lateral no desktop.

## 5. FAQ

Arquivo criado:

- `src/components/site/FAQ.tsx`

Posicao:

`<Testimonials />`, `<FAQ />`, `<CTASection />`

Conteudo local adicionado em `src/lib/site-content.ts`:

| Pergunta | Resposta |
| --- | --- |
| Como contratar um plano da GNS Fibra? | Entre em contato pelo WhatsApp. A equipe verifica a disponibilidade no endereço e orienta sobre os planos adequados para sua rotina. |
| Como verifico a cobertura no meu endereço? | Use a área de cobertura do site ou envie seu endereço pelo WhatsApp para a equipe verificar a disponibilidade técnica. |
| A GNS Fibra possui atendimento para empresas? | Sim. A GNS Fibra oferece soluções para residências e empresas. Entre em contato para avaliar a necessidade e a disponibilidade no local. |
| Onde acesso a Central do Assinante? | A Central do Assinante pode ser acessada pelo botão disponível no menu e nas áreas de atendimento do site. |
| Como solicito atendimento sendo cliente? | Use o WhatsApp, telefone ou Central do Assinante apresentados no site para entrar em contato com a equipe. |
| A instalação depende de análise técnica? | Sim. A contratação e a instalação dependem da cobertura e da viabilidade técnica no endereço informado. |
| Quais são as formas de pagamento? | As formas disponíveis podem variar conforme o plano e a condição comercial. Consulte a equipe antes da contratação. |

Tipo adicionado:

```ts
faqs: Array<{
  id: string;
  question: string;
  answer: string;
  active: boolean;
}>;
```

Somente FAQs com `active === true` sao exibidas.

A estrutura de conteúdo está preparada no frontend, mas o gerenciamento de FAQs pelo painel será desenvolvido em fase futura.

## 6. Accordion acessivel

Regras implementadas:

- perguntas como `button type="button"`;
- `id` exclusivo no botao;
- `aria-expanded`;
- `aria-controls`;
- painel com `role="region"`;
- `aria-labelledby`;
- foco visivel;
- area de toque minima adequada;
- icone visual de abrir/fechar;
- resposta permanece no DOM;
- carregamento inicial com todas as perguntas fechadas;
- apenas uma pergunta aberta por vez;
- sem biblioteca nova.

## 7. JSON-LD FAQPage

O componente `FAQ` gera um unico script:

`<script id="gns-faq-json-ld" type="application/ld+json">`

Regras:

- dados derivados das mesmas FAQs visiveis;
- somente FAQs ativas;
- sem HTML no conteudo renderizado;
- strings normalizadas e serializadas por `JSON.stringify`;
- caracteres `<` escapados como `\u003c`;
- script removido automaticamente quando nao ha FAQ ativa ou quando o componente desmonta;
- nenhuma alteracao de title/meta global.

## 8. CTA contato/WhatsApp

Arquivo atualizado:

- `src/components/site/CTASection.tsx`

Preservado:

- `id="contato"`;
- fundo `fiber-bundle.jpg`;
- WhatsApp dinamico;
- e-mail dinamico;
- temas Dark e Light.

Conteudo publicado:

- etiqueta: `VAMOS CONECTAR VOCÊ`;
- titulo: `Pronto para falar com a GNS Fibra?`;
- descricao: `Conte onde você mora ou trabalha e nossa equipe ajuda a verificar a cobertura e encontrar a opção adequada.`;
- CTA principal: `Falar pelo WhatsApp`;
- mensagem WhatsApp: `Olá! Quero verificar a cobertura e conhecer os planos da GNS Fibra.`;
- CTA secundario: `Enviar um e-mail`;
- telefone exibido de forma discreta quando `config.contact.phone` existe.

O mascote `contato-whatsapp-acenando.png` e decorativo, usa `alt=""`, `aria-hidden="true"`, `loading="lazy"`, `decoding="async"`, `width={582}`, `height={840}` e fluxo normal, sem `position absolute` sobre conteudo.

## 9. Navegacao

Alteracoes:

- `FAQ` adicionado ao conteudo local antes de `Contato`;
- `Header` recebeu mapeamento interno `{ id: "faq", href: "#faq" }`;
- `Suporte` nao foi adicionado ao menu principal.

Comportamentos preservados:

- item ativo por `IntersectionObserver`;
- `aria-current="location"`;
- menu mobile fecha ao clicar;
- Escape fecha o menu;
- scroll lock do menu mobile preservado.

O gap e o padding dos itens desktop foram reduzidos discretamente para acomodar `FAQ` em 1280 px sem esconder itens.

## 10. Acessibilidade e debito de Coverage

Correcao realizada em `src/components/site/Coverage.tsx`:

- `id="coverage-search"`;
- `name="coverage-search"`.

O label existente foi preservado.

As novas imagens decorativas usam `alt=""`, `aria-hidden="true"`, nao recebem foco, nao bloqueiam ponteiro e nao carregam informacao exclusiva. Links externos com nova aba usam `rel="noopener noreferrer"`.

## 11. Performance e build

Os tres novos mascotes ficam abaixo da dobra:

- `loading="lazy"`;
- `decoding="async"`;
- `width` e `height` explicitos;
- sem preload;
- sem `fetchPriority high`;
- cada componente importa somente a pose usada.

Build final aprovado com os tres PNGs separados:

- `faq-pensando-CjDBxbg0.png`: 447,77 kB;
- `suporte-tecnico-DXl6ztwf.png`: 471,75 kB;
- `contato-whatsapp-acenando-CGRdh_DH.png`: 495,56 kB.

Impacto frente ao build anterior documentado:

- JS: de 382,96 kB / gzip 118,97 kB para 395,81 kB / gzip 121,42 kB;
- CSS: de 64,39 kB / gzip 10,79 kB para 68,60 kB / gzip 11,32 kB;
- imagens novas somam 1.415,08 kB no bundle, carregadas sob demanda abaixo da dobra.

## 12. Arquivos criados

- `src/components/site/Support.tsx`;
- `src/components/site/FAQ.tsx`;
- `src/assets/mascote/v2/suporte-tecnico.png`;
- `src/assets/mascote/v2/faq-pensando.png`;
- `src/assets/mascote/v2/contato-whatsapp-acenando.png`;
- `IMPLEMENTACAO-FAQ-SUPORTE-CONTATO-GNS-FIBRA-2.md`.

## 13. Arquivos modificados

- `src/App.tsx`;
- `src/components/site/CTASection.tsx`;
- `src/components/site/Coverage.tsx`;
- `src/components/site/Header.tsx`;
- `src/content/types.ts`;
- `src/lib/site-content.ts`;
- `src/styles.css`;
- `DESIGN-SYSTEM-GNS-FIBRA-2.md`;
- `MAPA-USO-MASCOTE-GNS-FIBRA-2.md`;
- `IMPLEMENTACAO-COLECAO-MASCOTES-V2-GNS-FIBRA.md`;
- `GNS_FIBRA_2_0_DOCUMENTO_MESTRE.md`.

## 14. Itens reservados para painel futuro

- gerenciamento de FAQs no painel;
- endpoint/API para FAQs;
- ordenacao administravel de FAQs;
- ativacao/desativacao via banco;
- campos de suporte/contato editaveis alem das configuracoes ja existentes;
- WebP/AVIF dos mascotes quando houver encoder confiavel com alpha.

## 15. Validacoes tecnicas

- `"C:\Program Files\nodejs\npm.cmd" run typecheck`: aprovado.
- `"C:\Program Files\nodejs\npm.cmd" run build`: aprovado, 2.159 modulos transformados.
- Aviso conhecido do build: `<script src="./theme-init.js">` sem `type="module"` por ser script classico vindo de `public`.
- `"C:\Program Files\nodejs\npm.cmd" audit`: executado; 1 vulnerabilidade baixa em `esbuild` (`GHSA-g7r4-m6w7-qqqr`).
- `npm audit fix`: nao executado.
- Navegador local: verificado em 360, 390, 414, 430, 768, 1024, 1280 e 1440 px, nos temas Dark e Light.
- Matriz responsiva: 16 casos sem overflow horizontal, com um unico `h1`, FAQPage com 7 perguntas, imagens decorativas com atributos corretos e links externos sem `rel` ausente.
- Interacao mobile: menu abre, bloqueia scroll, fecha com Escape, link FAQ fecha o menu e ativa `aria-current`.
- Accordion: inicia fechado, abre por botao, fecha a pergunta anterior ao abrir outra e responde a teclado.
- Imagens lazy: Suporte, FAQ e Contato carregam com dimensoes naturais corretas ao entrar na viewport em mobile e desktop, Dark e Light.
- Console do navegador: nenhum erro relevante da aplicacao; apenas avisos externos do ambiente de teste.

As validacoes Git finais ficam registradas no relatorio final desta execucao.
