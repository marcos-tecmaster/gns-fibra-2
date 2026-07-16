# IMPLEMENTACAO DO MASCOTE NO HERO - GNS FIBRA 2.0

Data: 13/07/2026
Fase: primeira integracao oficial do mascote
Status: implementado localmente, sem commit

## 1. Escopo

Esta fase integra somente a pose oficial `apresentando` no Hero. As poses `wifi-turbo`, `trabalhando-notebook`, `pensando` e `comemorando` foram auditadas e catalogadas, mas nao foram importadas pelo React nem aplicadas em outras secoes.

Foram preservados Header, conteudo comercial, planos, precos, links, navegacao, beneficios, empresarial, cobertura, depoimentos, CTA final, Footer, painel, API PHP e banco.

## 2. Originais auditados

Todos os arquivos estao em `docs/branding/mascote/originais/`, usam PNG RGBA, possuem transparencia real, 96,01 dpi e qualidade visual alta.

| Arquivo | Dimensoes | Peso | Alpha e espaco transparente | SHA-256 | Uso atual/futuro |
| --- | ---: | ---: | --- | --- | --- |
| `apresentando.png` | 1369 x 1149 px | 834.579 bytes | L258 / T49 / R251 / B65 | `E9B18FB1D3F50EA144CC05F53464CEB316F4AA518E8310DFEAE3D80D8E90D77F` | Hero atual |
| `wifi-turbo.png` | 1080 x 1350 px | 938.579 bytes | L154 / T165 / R55 / B151 | `E3CAAB0A358D541694301A7DCE54F285085E1D33C9FBF0C3FEBB554D5234DC1E` | Tecnologias/beneficios |
| `trabalhando-notebook.png` | 1080 x 1350 px | 866.974 bytes | L66 / T122 / R117 / B145 | `2E280573D089FAA307649029E8FFFD7FF4DC4176DA0023B7BB4E1B2CE3BBAB0F` | Empresarial/suporte |
| `pensando.png` | 1080 x 1350 px | 805.031 bytes | L190 / T26 / R171 / B129 | `FBB22740F51D8F36D3BEBDC6136CBEB7975869592900099C8F355D4A0C84A504` | FAQ |
| `comemorando.png` | 1080 x 1350 px | 876.191 bytes | L86 / T133 / R148 / B114 | `1A494926B31554B0884FB78DC004F109686777B02829EF80A168FA8D4C0DDB94` | Confirmacao/campanha/Indique e Ganhe |

O espaco transparente foi calculado pelo menor retangulo com alpha maior que zero. A conferencia visual confirmou antenas, maos, pes, uniforme e logo integros. Os hashes foram reconferidos depois da geracao do derivado e permanecem inalterados.

## 3. Asset de producao

Arquivo criado:

- `src/assets/mascote/mascote-apresentando.png`
- Formato: PNG RGBA.
- Dimensoes: 756 x 900 px.
- Peso: 584.002 bytes.
- SHA-256: `127BE24DA3E73DF26C048F2FA18CFDB349A89DBD749FA8FECD865062A00799F9`.
- Espaco transparente final: L27 / T26 / R26 / B27.
- Economia: 250.577 bytes, aproximadamente 30,02%.

Metodo:

1. Medicao do alpha do original.
2. Recorte somente do excesso de canvas transparente, com 32 px de margem segura no original.
3. Redimensionamento bicubico de alta qualidade para 756 x 900 px.
4. Exportacao PNG pelo encoder nativo do Windows com canal alpha.
5. Comparacao visual do original e do derivado.

Resultado visual:

- sem corte de antenas, maos ou pes;
- sem halo branco irregular;
- logo e uniforme preservados;
- sem alteracao perceptivel de cor ou proporcao;
- antialiasing semitransparente preservado.

Nao foi gerado WebP/AVIF. `magick`, `cwebp`, `avifenc`, `ffmpeg`, Pillow, GD e encoders PNG/WebP dedicados nao estavam disponiveis. A conversao pelo navegador foi bloqueada pela politica de seguranca do ambiente. Nenhuma dependencia pesada foi instalada apenas para conversao.

## 4. Estrutura do componente

Foi criado `src/components/site/HeroMascot.tsx`.

Responsabilidades:

- importar somente o derivado `apresentando`;
- preservar `data-future-mascot-slot="hero"`;
- declarar `width={756}` e `height={900}`;
- fornecer alt text informativo;
- usar `loading="eager"` e `decoding="async"`;
- nao receber foco nem bloquear ponteiro.

`Hero.tsx` apenas importa e posiciona `HeroMascot`. Nao foi criada abstracao para catalogo ou carregamento das outras poses.

## 5. Composicao visual

Desktop:

- texto e CTAs permanecem no lado esquerdo;
- mascote ocupa a lateral direita e fica alinhado a base;
- fibra continua como cenario atras do personagem;
- sem card, moldura, fundo branco ou circulo solido;
- glow laranja e sombra sao discretos;
- sem sobreposicao com titulo, CTAs ou Header.

Mobile/tablet:

- mascote entra em fluxo normal depois dos indicadores;
- altura reservada de 240 px no mobile, 280 px a partir de 640 px e 320 px a partir de 768 px;
- largura maxima do quadro de 288 px no mobile, 320 px a partir de 640 px e 384 px a partir de 768 px;
- a partir de 1024 px, o palco usa 520 px na coluna direita;
- imagem usa `object-fit: contain`, sem deformacao ou corte;
- nenhuma margem negativa ou posicionamento absoluto foi usado para puxar o personagem.

## 6. Dark e Light

Dark:

- sombra profunda separa o personagem da fibra;
- luz de contorno laranja discreta preserva leitura das partes pretas;
- cores oficiais permanecem sem filtros de cor.

Light:

- sombra grafite suave preserva contraste;
- transparencia nao apresenta halo branco;
- laranja, preto e logo permanecem nitidos;
- fibra continua visivel atras do personagem.

## 7. Acessibilidade

Foi adotado alt text informativo porque o mascote reforca identidade e acao de apresentacao:

`Mascote da GNS Fibra apresentando os servicos de internet`

A imagem nao contem oferta, preco ou informacao comercial exclusiva. Nao recebe foco, fica com `pointer-events: none` na composicao e nao interfere em teclado, links ou CTAs. O movimento de entrada existente continua sujeito a regra global de `prefers-reduced-motion`.

## 8. Performance

- Apenas uma pose entra no bundle.
- As quatro poses futuras nao sao importadas.
- Dimensoes do arquivo e altura do palco reservam layout antes da imagem terminar de carregar.
- `loading="eager"` foi mantido por estar acima da dobra.
- `decoding="async"` evita decodificacao sincronica.
- `fetchPriority="high"` nao foi aplicado ao mascote para nao competir com `hero-fiber.jpg`, que ja e o recurso visual prioritario.
- Build gerou `mascote-apresentando-Cp7eOE3y.png` com 584,00 kB.

## 9. Validacao responsiva

Testados em Dark e Light:

- 360 px;
- 390 px;
- 414 px;
- 430 px;
- 768 px;
- 1024 px;
- 1280 px;
- 1440 px.

Resultados:

- sem overflow horizontal;
- imagem carregada com dimensoes naturais 756 x 900 px;
- imagem sempre contida no palco;
- sem sobreposicao com conteudo;
- um unico `h1`;
- CTAs com altura minima observada de 52 px;
- Header sticky, menu mobile e troca de tema preservados;
- Hero com 1018-1051 px no mobile, 1011 px no tablet, 797 px em 1024 e 846 px em desktop amplo.

## 10. Validacoes tecnicas

- `npm run typecheck`: aprovado.
- `npm run build`: aprovado; 2.150 modulos transformados.
- Aviso conhecido do build: `theme-init.js` e script classico vindo de `public`.
- `npm audit`: 1 vulnerabilidade de baixa severidade em `esbuild` (`GHSA-g7r4-m6w7-qqqr`).
- `npm audit fix` e `npm audit fix --force`: nao executados.
- `git diff --check`: aprovado, com avisos esperados LF/CRLF no Windows.
- Console da aplicacao: sem erro funcional identificado; mensagens do ambiente de navegador permanecem externas ao codigo da pagina.

## 11. Arquivos desta fase

Criados:

- `src/assets/mascote/mascote-apresentando.png`;
- `src/components/site/HeroMascot.tsx`;
- `IMPLEMENTACAO-MASCOTE-HERO-GNS-FIBRA-2.md`.

Alterados:

- `src/components/site/Hero.tsx`;
- `src/styles.css`;
- `MAPA-USO-MASCOTE-GNS-FIBRA-2.md`;
- `DESIGN-SYSTEM-GNS-FIBRA-2.md`;
- `IMPLEMENTACAO-HEADER-HERO-GNS-FIBRA-2.md`.

## 12. Pendencias

- Revisao visual em video antes do commit.
- Gerar e comparar WebP/AVIF quando houver encoder confiavel com suporte a alpha.
- Tratar o alerta baixo de `esbuild` em fase propria de dependencias, com revisao do lockfile.
- Integrar as outras poses somente nas fases funcionais correspondentes.

## 13. Refinamento mobile do Hero

### Causa visual

No mobile, o espacamento acumulado entre o fim dos indicadores, o quadro do mascote e a base do Hero separava o personagem da composicao principal. Em 360 px, havia 48 px entre os indicadores e o quadro, mais 64 px entre o quadro e a base do Hero. No tablet, o quadro de 360 px e o padding inferior de 80 px ampliavam a altura total sem melhorar a leitura do personagem.

### Ajuste realizado

- gap entre conteudo e mascote reduzido para 16 px no mobile e 20 px entre 640 e 1023 px;
- padding inferior reduzido para 24 px no mobile e 32 px entre 640 e 1023 px;
- quadro do mascote ajustado para 240 px, 280 px e 320 px nos breakpoints mobile/tablet;
- largura maxima controlada em 288 px, 320 px e 384 px, com alinhamento central;
- fluxo normal, proporcao, `object-fit: contain` e integridade visual do personagem preservados;
- valores aprovados de 520 px, gap de 48 px e padding inferior de 80 px preservados a partir de 1024 px.

### Antes e depois

Antes, o mascote ficava visualmente distante dos indicadores e sua base se aproximava da transicao com a secao seguinte depois de um vazio excessivo. Depois, ele permanece ligado ao bloco principal, aproxima os pes da base visual do Hero e reduz a altura total sem invadir a proxima secao.

Foram verificados os breakpoints de 360, 390, 414, 430, 768, 1024, 1280 e 1440 px. Em Dark e Light, antenas, rosto, maos, logo e pes permanecem visiveis; CTAs, indicadores, fibra e conteudo dinamico nao sofreram alteracao. O desktop permaneceu com a composicao e as medidas anteriormente aprovadas.

Alturas observadas depois do refinamento: 1018 px em 360 px, 1051 px entre 390 e 430 px, 1011 px em 768 px, 797 px em 1024 px e 846 px em 1280/1440 px. Nao houve overflow horizontal; os CTAs mantiveram altura minima de 52 px no mobile e 58 px a partir de 768 px.

Nenhum commit foi criado nesta execucao.

## 14. Atualizacao V2 oficial do Hero

Atualizado em 15/07/2026.

A pose anterior `apresentando` foi substituida somente no asset visual do componente `HeroMascot.tsx`. A estrutura do Hero, `hero-fiber.jpg`, overlays Dark/Light, indicadores, titulo dinamico, descricao dinamica, CTAs, `SiteContentProvider` e o unico `h1` foram preservados.

Novo asset usado:

- Origem: `docs/branding/mascote/originais/v2-oficiais/hero-apresentando-apontando.png`.
- Derivado: `src/assets/mascote/v2/hero-apresentando-apontando.png`.
- Dimensoes do derivado: 687 x 900 px.
- Peso do derivado: 540.995 bytes.
- SHA-256 do derivado: `583CC01A2B8A0F95AB7B827EFF9F812CA00E9A2CD82BCA4F59AEA1D5A26FD412`.
- Economia frente ao original V2: 473.522 bytes, 46,67%.

Resultado:

- mascote permanece no lado direito no desktop;
- gesto aponta para a esquerda, em direcao ao texto e CTAs;
- sem espelhamento via CSS;
- mobile mantem fluxo normal e altura controlada;
- Dark e Light preservados com sombras existentes;
- `width={687}`, `height={900}`, `loading="eager"` e `decoding="async"`;
- alt text atualizado para `Mascote da GNS Fibra apontando para a mensagem principal`.

Validacoes da fase V2:

- `npm run typecheck`: aprovado.
- `npm run build`: aprovado.
- matriz responsiva em 360, 390, 414, 430, 768, 1024, 1280 e 1440 px, Dark e Light, sem overflow horizontal.
- console sem erro funcional proprio da aplicacao; apenas mensagem externa conhecida de extensao/navegador.

Detalhes completos da colecao V2 estao em `IMPLEMENTACAO-COLECAO-MASCOTES-V2-GNS-FIBRA.md`.
