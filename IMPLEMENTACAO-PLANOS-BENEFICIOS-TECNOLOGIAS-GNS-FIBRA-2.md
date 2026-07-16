# IMPLEMENTACAO DE PLANOS, BENEFICIOS E TECNOLOGIAS - GNS FIBRA 2.0

Data: 14/07/2026
Fase: Planos, beneficios e tecnologias
Status: implementado no frontend publico; contrato comercial preservado

## 1. Escopo

Foram reconstruidas visualmente e estruturalmente as secoes de:

- Planos;
- Beneficios;
- Tecnologias.

Nao foram alterados:

- Header;
- Hero;
- mascote do Hero;
- History;
- Testimonials;
- Coverage;
- CTA final;
- Footer;
- API PHP;
- painel administrativo;
- banco de dados;
- migrations;
- IXC;
- Indique e Ganhe;
- Analytics;
- Pixel;
- valores comerciais.

## 2. Arquivos modificados

- `src/App.tsx`
- `src/components/site/Plans.tsx`
- `src/content/types.ts`
- `src/lib/site-content.ts`
- `src/styles.css`
- `DESIGN-SYSTEM-GNS-FIBRA-2.md`
- `PLANO-IMPLEMENTACAO-GNS-FIBRA-2.md`
- `MAPA-PAINEL-ADMIN-GNS-FIBRA-2.md`

## 3. Arquivos criados

- `src/components/site/Benefits.tsx`
- `src/components/site/Technologies.tsx`
- `MAPA-CONTEUDO-COMERCIAL-GNS-FIBRA-2.md`
- `IMPLEMENTACAO-PLANOS-BENEFICIOS-TECNOLOGIAS-GNS-FIBRA-2.md`

## 4. Contrato preservado

Os planos continuam vindo do fluxo atual:

`SiteContentProvider -> apiContentProvider -> api/site-content.php -> tabela plans`

Fallback local preservado:

- se a API falhar;
- se a resposta vier incompleta;
- se houver menos ou mais planos;
- se beneficios vierem como lista vazia;
- se preco vier vazio ou zero.

Campos comerciais nao foram alterados:

- nome;
- velocidade;
- unidade;
- preco;
- descricao curta;
- beneficios;
- forma de pagamento;
- destaque;
- status;
- ordem.

## 5. Nova estrutura de planos

Cada card prioriza:

- nome;
- descricao curta;
- velocidade;
- preco ou estado sob consulta quando ausente;
- beneficio principal derivado do primeiro beneficio publicado;
- tecnologia Wi-Fi quando existir nos beneficios atuais;
- selo de destaque quando `featured` esta ativo;
- CTA para WhatsApp.

As listas longas foram evitadas: o card exibe ate tres beneficios, mantendo o restante como dado preservado no contrato.

## 6. Quantidade impar

A grade de planos usa CSS responsivo:

`repeat(auto-fit, minmax(min(100%, 19rem), 1fr))`

Isso remove a dependencia de `3 + 3 + 1`, evita regra por indice e funciona com qualquer quantidade de planos. O layout se adapta por largura disponivel, mantendo ritmo visual em mobile, tablet e desktop.

## 7. Beneficios

Foi criada a secao `Benefits`, separada dos planos.

Estrutura atual:

- titulo;
- descricao curta;
- icone;
- CTA opcional;
- estado `active`.

Conteudo usado nesta fase:

- Wi-Fi no plano;
- atendimento humano;
- formas de pagamento;
- camera em plano especifico.

Novos beneficios internos como GNS TV Plus, streaming, Mesh e telefone fixo ficaram documentados como pendentes, sem publicacao por suposicao.

## 8. Tecnologias

Foi criada a secao `Technologies`, com visual proprio e linguagem tecnica controlada.

Atualizacao em 16/07/2026: a secao passou a consumir `technologies` da API publica quando disponivel, com administracao pelo painel em `admin/tecnologias.php` e fallback local preservado.

Estrutura atual:

- nome;
- descricao;
- icone;
- disponibilidade;
- estado `active`.

Conteudo publicado nesta fase:

- fibra optica;
- Wi-Fi;
- rede monitorada;
- casa e empresa.

Tecnologias futuras como Wi-Fi 6, Wi-Fi 7 e XGS-PON foram preparadas na documentacao, mas nao publicadas sem confirmacao formal.

## 9. Dark e Light

As secoes usam os tokens existentes:

- `background`;
- `foreground`;
- `card`;
- `border`;
- `primary`;
- `primary-glow`;
- `primary-foreground`;
- sombras semanticas.

O Dark preserva contraste forte e acabamento premium. O Light usa superficies claras, bordas visiveis e laranja controlado para acao.

## 10. Mobile

Decisoes mobile-first:

- cards em uma coluna nas menores larguras;
- CTAs com altura minima de 44 px;
- textos quebram naturalmente;
- sem tabela ou comparacao horizontal obrigatoria;
- cards com `min-width: 0`;
- grid adaptativo sem overflow.

## 11. Acessibilidade

Implementado:

- secoes com headings semanticos;
- icones decorativos com `aria-hidden`;
- links reais para CTA;
- foco global preservado;
- informacao de destaque nao depende somente de cor;
- estados visuais com texto;
- animacoes respeitam `prefers-reduced-motion` pela regra global.

## 12. Performance

Decisoes:

- nenhuma dependencia nova;
- nenhum asset novo;
- nenhum asset do mascote importado;
- sem biblioteca visual pesada;
- icones ja instalados via `lucide-react`;
- CSS leve e reutilizavel;
- sem imagens pesadas nas novas secoes.

## 13. Painel futuro

Campos futuros previstos:

Planos:

- tecnologia Wi-Fi;
- subtitulo;
- beneficio principal;
- selo;
- somente sob consulta;
- ordem;
- destaque;
- ativo.

Beneficios:

- titulo;
- descricao;
- icone;
- imagem;
- CTA;
- ordem;
- ativo.

Tecnologias:

- nome;
- descricao;
- icone;
- disponibilidade;
- ordem;
- ativo.

## 14. Mascote

O stash de integracao experimental do mascote nao foi restaurado nem alterado.

Nenhum arquivo original foi importado para o bundle. Nenhuma pose nova foi gerada ou publicada. Pontos de uso futuro ficam apenas documentados:

- `wifi-turbo`: tecnologias;
- `trabalhando-notebook`: empresa, suporte ou home office.

## 15. Validacoes

Executado nesta fase:

- `"C:\Program Files\nodejs\npm.cmd" run typecheck` aprovado.
- `"C:\Program Files\nodejs\npm.cmd" run build` aprovado.
- `"C:\Program Files\nodejs\npm.cmd" audit` executado; 1 vulnerabilidade baixa em `esbuild`; `audit fix` nao executado.
- Verificacao em navegador local com `http://127.0.0.1:5174/`.
- Breakpoints 360, 390, 414, 430, 768, 1024, 1280 e 1440 px em Dark e Light.
- Sem overflow horizontal nos breakpoints testados.
- Secoes `planos`, `beneficios` e `tecnologias` presentes.
- 7 cards de planos renderizados no fallback atual.
- CTAs dos planos com altura minima de 44 px.
- Console da aplicacao sem erros registrados.

Observacao: durante a automacao do navegador apareceram mensagens externas do ambiente sobre Statsig/ChatGPT, nao originadas pela aplicacao GNS Fibra.

## 16. Pendencias

- Confirmar formalmente nova matriz comercial.
- Definir se plano sob consulta sera campo proprio ou convencao de preco.
- Criar migrations futuras somente em fase aprovada.
- Revisar em homologacao os modulos reais de Beneficios e Tecnologias no painel.
- Validar contraste com ferramenta WCAG dedicada antes de producao.

## 17. Revisao de conteudo publico e navegacao

Revisao executada em 14/07/2026, sem alteracao de API, painel, banco ou regras
comerciais.

Textos internos removidos do frontend:

- carregamento dinamico pelo painel e conteudo preservado;
- estrutura preparada para administracao futura;
- beneficios mapeados para confirmacao e publicacao por suposicao;
- tecnologias futuras e conteudo aguardando validacao.
- referencia a avaliacoes do futuro painel administrativo em Depoimentos;
- placeholders publicos de fotos futuras em Historia.

Conteudo publico adotado:

- Planos com orientacao comercial objetiva e confirmacao das condicoes no atendimento;
- Beneficios com foco em Wi-Fi, atendimento humano e formas de pagamento;
- camera exibida apenas quando algum plano publico informar esse recurso;
- Tecnologias com fibra optica, Wi-Fi, rede monitorada e solucoes para casa e empresa;
- observacao publica sobre variacao de equipamentos conforme plano e disponibilidade.

Continuam pendentes de confirmacao comercial e fora do frontend: GNS TV Plus,
streaming, Mesh, telefone fixo, Wi-Fi 6, Wi-Fi 7 e XGS-PON.

A navegacao nao possuia controle de secao ativa; apenas o estado visual de hover
podia sugerir que "Empresarial" estava selecionado. Foi adicionado um
`IntersectionObserver` com faixa de ativacao abaixo do Header fixo. As secoes
`beneficios` e `tecnologias` foram associadas a `#planos`, e `#empresarial` agora
fica ativo somente quando sua propria secao cruza a faixa observada. O estado
tambem e exposto por `aria-current="location"` no menu desktop e mobile. A
aparencia ativa recebeu preenchimento solido para nao ser confundida com o
estado discreto de hover do item sob o ponteiro.

Arquivos alterados nesta revisao:

- `src/components/site/Plans.tsx`;
- `src/components/site/Benefits.tsx`;
- `src/components/site/Technologies.tsx`;
- `src/components/site/Header.tsx`;
- `src/components/site/Testimonials.tsx`;
- `src/lib/site-content.ts`;
- `IMPLEMENTACAO-PLANOS-BENEFICIOS-TECNOLOGIAS-GNS-FIBRA-2.md`.

Validacoes da revisao:

- `npm run typecheck`: aprovado;
- `npm run build`: aprovado, mantendo o aviso preexistente de `theme-init.js`;
- temas Dark e Light verificados em 1280 px, 768 px e 390 px;
- sem overflow horizontal nos tamanhos verificados;
- nenhum texto interno encontrado nas secoes de Planos, Beneficios e Tecnologias;
- quatro cards de beneficios exibidos; o card de seguranca permanece porque o
  plano Security publica `1 camera de seguranca`;
- Beneficios e Tecnologias mantem `Planos` ativo;
- `Empresarial` fica ativo somente na propria secao;
- console sem erros originados pela aplicacao. O navegador de teste registrou
  mensagens externas do ambiente sobre fechamento de canal assincrono.

## 18. Mascotes V2 em Tecnologias e Empresarial

Atualizado em 15/07/2026.

Esta revisao integrou dois assets oficiais V2 sem alterar conteudo comercial, planos, precos, velocidades, API, painel, banco, links ou CTAs existentes.

### Tecnologias

Asset publicado:

- `src/assets/mascote/v2/wifi-turbo.png`.
- Origem preservada: `docs/branding/mascote/originais/v2-oficiais/wifi-turbo.png`.
- Dimensoes: 596 x 840 px.
- Peso: 528.774 bytes.
- SHA-256: `75EE67B402B1E303B73D89245A3AEE6E987308B554B718C488A4C26F8413C24F`.

Resultado:

- mascote usado como apoio visual principal da secao, sem repeticao nos cards;
- os quatro itens tecnologicos permanecem nos cards;
- aviso de disponibilidade tecnica preservado;
- desktop usa composicao entre painel tecnico e mascote lateral;
- mobile usa fluxo normal, com o mascote antes do painel e tamanho reduzido;
- `loading="lazy"`, `decoding="async"`, dimensoes declaradas e `alt=""` por ser apoio visual redundante.

### Empresarial

Asset publicado:

- `src/assets/mascote/v2/empresarial-notebook.png`.
- Origem preservada: `docs/branding/mascote/originais/v2-oficiais/empresarial-notebook.png`.
- Dimensoes: 647 x 840 px.
- Peso: 516.793 bytes.
- SHA-256: `3D7CE8BFDBBB79E6CF745A31FC51C25A52C9717A8524700AA26E2B43AA7279E2`.

Resultado:

- texto empresarial aprovado, CTA e beneficios existentes preservados;
- mascote usado como apoio visual para produtividade, suporte e home office;
- sem informacao comercial exclusiva na imagem;
- `loading="lazy"`, `decoding="async"`, dimensoes declaradas e `alt=""` por ser apoio visual redundante.

### Validacao

- `npm run typecheck`: aprovado.
- `npm run build`: aprovado.
- `npm audit`: executado; 1 vulnerabilidade baixa em `esbuild`; `audit fix` nao executado.
- Matriz responsiva em 360, 390, 414, 430, 768, 1024, 1280 e 1440 px, Dark e Light: sem overflow horizontal, mascotes carregados nas secoes-alvo e sem corte horizontal.

Detalhes completos estao em `IMPLEMENTACAO-COLECAO-MASCOTES-V2-GNS-FIBRA.md`.

## 19. Beneficios administraveis no Painel 2.0

Atualizado em 16/07/2026.

A secao de Beneficios passou a ter fluxo administravel de ponta a ponta:

`Banco MySQL -> admin/beneficios.php -> api/site-content.php -> src/services/site-content-service.ts -> Benefits`

Arquivos principais:

- `database/migration-2026-07-16-create-benefits.sql`;
- `admin/beneficios.php`;
- `admin/includes/simple-crud.php`;
- `admin/includes/layout.php`;
- `admin/dashboard.php`;
- `api/site-content.php`;
- `src/services/site-content-service.ts`;
- `IMPLEMENTACAO-BENEFICIOS-ADMINISTRAVEIS-GNS-FIBRA-2.md`.

Conteudo inicial:

- `wifi-incluso`;
- `atendimento-humano`;
- `pagamento-flexivel`;
- `camera-seguranca`.

Foram preservados:

- os quatro textos locais atuais;
- fallback local em `src/lib/site-content.ts`;
- layout, cards, icones e animacoes de `Benefits.tsx`;
- regra comercial da camera;
- Dark/Light e responsividade.

O painel restringe icones a `wifi`, `headset`, `credit-card`, `camera` e `tv`. CTAs sao opcionais, mas precisam de label e link seguros. O normalizador TypeScript respeita `benefits: []` como secao vazia, ignora registros invalidos isoladamente e usa fallback visual seguro para icone desconhecido.

Atualizacao em 16/07/2026: Tecnologias administraveis tambem foram implementadas localmente com tabela `technologies`, seed idempotente dos quatro itens oficiais, CRUD PHP, API publica e normalizacao TypeScript. Continuam fora do frontend e sem publicacao comercial: TV, streaming, Mesh, Wi-Fi 6, Wi-Fi 7, telefonia, fidelidade, promocoes e outras tecnologias ainda nao aprovadas.
