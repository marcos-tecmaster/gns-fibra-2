# DESIGN SYSTEM - GNS FIBRA 2.0

Data: 13/07/2026  
Status: fundacao de tokens e tema implementada em 13/07/2026

## 1. Objetivo

Definir a base visual da GNS Fibra 2.0 para aplicar em tema escuro e claro, preservando a forca Premium/Dark e incorporando a clareza do Classic e a organizacao da V3.

Este documento registra a fundacao implementada. A grande transformacao visual das secoes ainda nao foi realizada.

## 2. Principios visuais

- Marca forte e regional.
- Laranja como cor de acao e energia.
- Grafite como base de tecnologia e confianca.
- Cinza metalico como acabamento premium.
- Branco no tema claro para leitura e conversao.
- Mascote usado estrategicamente, nao como decoracao repetitiva.
- Mobile-first real.
- Alto contraste.
- Movimento controlado e respeitando `prefers-reduced-motion`.

## 3. Paleta base

| Token conceitual | Valor base | Uso |
| --- | --- | --- |
| `brand-orange` | `#ef7d03` | CTAs, links, destaques, foco |
| `brand-orange-dark` | `#c96502` | Hover, estados pressionados |
| `brand-orange-light` | `#ffad33` | Gradientes e brilho controlado |
| `graphite` | `#1f2937` | Texto forte, superficies escuras |
| `graphite-deep` | `#0f172a` | Fundo dark profundo |
| `metallic` | `#bfbfbf` | Bordas, divisores, elementos metalicos |
| `titanium` | `#d9d9d9` | Fundos claros secundarios |
| `white` | `#ffffff` | Fundo claro e texto sobre laranja |
| `success` | `#20b45a` | WhatsApp e estados positivos |
| `danger` | `#d92d20` | Erros |

## 4. Tokens Dark

Proposta semantica:

```css
[data-theme="dark"] {
  --background: #0f172a;
  --foreground: #f8fafc;
  --surface: #111827;
  --surface-raised: #1f2937;
  --surface-muted: #172033;
  --border: rgba(191, 191, 191, 0.22);
  --muted: #94a3b8;
  --primary: #ef7d03;
  --primary-hover: #ffad33;
  --primary-foreground: #1a0e06;
  --focus: rgba(239, 125, 3, 0.45);
}
```

Direcao:

- Fundo grafite profundo.
- Cards com contraste sutil.
- Laranja para acao, nao para todos os fundos.
- Sombras mais discretas que a versao atual.
- Gradientes usados em pontos de conversao.

Implementacao atual:

- `--color-bg`
- `--color-bg-soft`
- `--color-surface`
- `--color-surface-elevated`
- `--color-text`
- `--color-text-muted`
- `--color-border`
- `--color-border-strong`
- `--color-primary`
- `--color-primary-hover`
- `--color-primary-contrast`
- `--color-focus`
- `--color-success`
- `--color-warning`
- `--color-danger`
- `--color-overlay`
- `--color-hero-grid`
- `--gradient-brand`
- `--gradient-card`
- `--gradient-page-glow`
- `--shadow-card`
- `--shadow-elevated`
- `--shadow-brand`
- `--shadow-whatsapp`

Os aliases antigos (`--background`, `--foreground`, `--card`, `--primary`, `--border`, etc.) foram mantidos para compatibilidade com Tailwind e componentes existentes.

## 5. Tokens Light

Proposta semantica:

```css
[data-theme="light"] {
  --background: #ffffff;
  --foreground: #1f2937;
  --surface: #ffffff;
  --surface-raised: #f8fafc;
  --surface-muted: #eef2f6;
  --border: #d9d9d9;
  --muted: #5f6773;
  --primary: #ef7d03;
  --primary-hover: #c96502;
  --primary-foreground: #ffffff;
  --focus: rgba(239, 125, 3, 0.35);
}
```

Direcao:

- Inspirar no Classic, mas com menos excesso de branco puro.
- Usar grafite para texto e estrutura.
- Usar cinzas metalicos para divisao.
- Preservar o laranja como CTA primario.

## 6. Tipografia

Estado atual:

- `Inter` para texto.
- `Orbitron` para display no Premium/Dark.
- Classic usa combinacao mais corporativa (`Inter`/`Manrope`).
- V3 usa `Inter` de forma mais simples.

Proposta:

- Texto: `Inter`, `Segoe UI`, system-ui, sans-serif.
- Display: avaliar manter `Orbitron` apenas em detalhes de tecnologia ou substituir por `Inter`/`Manrope` para melhor leitura.
- Evitar letter-spacing negativo.
- Titulos mobile com escala moderada.

Escala sugerida:

| Uso | Mobile | Desktop |
| --- | --- | --- |
| Hero H1 | 36-44px | 64-72px |
| Secao H2 | 28-34px | 44-52px |
| Card H3 | 18-22px | 20-24px |
| Corpo | 16px | 16-18px |
| Auxiliar | 13-14px | 14px |
| Eyebrow | 11-12px | 12px |

## 7. Espacamentos

Base:

- 4px como unidade minima.
- Secoes mobile: 64-80px vertical.
- Secoes desktop: 96-128px vertical.
- Container mobile: 16px.
- Container tablet: 24px.
- Container desktop: max-width 1180-1280px.

Tokens:

- `--space-1: 4px`
- `--space-2: 8px`
- `--space-3: 12px`
- `--space-4: 16px`
- `--space-5: 20px`
- `--space-6: 24px`
- `--space-8: 32px`
- `--space-10: 40px`
- `--space-12: 48px`
- `--space-16: 64px`
- `--space-20: 80px`
- `--space-24: 96px`

## 8. Bordas e raios

Direcao:

- Cards principais: 16-24px no site publico.
- Elementos compactos do painel: 8-12px.
- Botoes pill apenas em CTAs comerciais.
- Inputs: 10-14px.
- Chips: pill permitido.

Tokens:

- `--radius-sm: 8px`
- `--radius-md: 12px`
- `--radius-lg: 16px`
- `--radius-xl: 24px`
- `--radius-pill: 999px`

## 9. Sombras

Dark:

- Sombra baixa e glow laranja apenas em CTA primario.
- Evitar glow em todos os cards.

Light:

- Sombra difusa leve cinza/grafite.
- Borda visivel para cards.

Tokens:

- `--shadow-sm`
- `--shadow-md`
- `--shadow-lg`
- `--shadow-brand`
- `--shadow-focus`

## 10. Botoes

Primario:

- Fundo laranja.
- Texto branco no tema claro.
- Texto grafite profundo no tema escuro apenas se contraste for validado.
- Hover com leve elevacao ou escurecimento.
- Focus ring visivel.

Secundario:

- Fundo transparente/surface.
- Borda metalica.
- Texto foreground.
- Hover com borda laranja.

WhatsApp:

- Verde proprio em token separado.
- Nao misturar com a hierarquia principal laranja.

Regras:

- Altura minima mobile: 44px.
- Texto nao deve quebrar de forma ruim; usar `inline-flex`, `gap`, `text-align:center`.
- Icone lucide quando existir.

## 11. Cards

Tipos:

- Plano
- Beneficio
- Tecnologia
- Depoimento
- Campanha
- Cobertura
- Admin metric card

Regras:

- Conteudo escaneavel.
- Cabecalho curto.
- CTA claro quando aplicavel.
- Evitar cards excessivamente longos.
- Em mobile, preferir uma coluna.
- Em desktop, grids com alturas consistentes.

## 12. Formularios

Regras:

- Label sempre visivel.
- Placeholder apenas como ajuda, nao como label.
- Estados: default, hover, focus, error, disabled, success.
- Mensagens de erro claras.
- Campos sensiveis com mascaramento quando necessario.
- Consentimento LGPD explicito no Indique e Ganhe.

Campos futuros de Indique e Ganhe:

- Dados de quem indica.
- Dados da pessoa indicada.
- Consentimento/ciencia.
- Politica de privacidade.

## 13. Estados de hover e focus

Hover:

- Alterar borda, fundo ou elevacao com sutileza.
- Nao depender somente de cor quando a acao for critica.

Focus:

- Ring de 2-3px.
- Offset de 2-3px.
- Contraste nos dois temas.

Active:

- Reduzir elevacao.
- Confirmar feedback em botoes e chips.

Disabled:

- Baixa opacidade, cursor adequado e contraste ainda legivel.

## 14. Animacoes

Permitido:

- Entrada suave de secoes.
- Hover de CTA.
- Microinteracoes de menu.
- Movimento sutil de elementos de fibra.

Evitar:

- Efeitos constantes que distraem.
- Glows exagerados.
- Animacoes que prejudiquem Core Web Vitals.
- Movimento em `prefers-reduced-motion: reduce`.

## 15. Acessibilidade

Obrigatorio:

- Contraste AA no minimo.
- Foco visivel.
- Navegacao por teclado.
- Labels reais em formularios.
- Alt text em imagens informativas.
- `alt=""` apenas em imagens decorativas.
- Tamanho minimo de toque.
- Sem overflow horizontal.
- Sem texto sobre imagem sem overlay suficiente.

## 16. Uso do Mascote Oficial

Origem catalogada nesta fase:

- Estrutura oficial: `docs/branding/mascote/`.
- Arquivo de referencia catalogado: `docs/branding/mascote/referencias/guia-oficial-poses-mascote-gns.png`.
- Arquivo encontrado: folha completa oficial de poses do mascote.
- Dimensoes: 1536 x 1024 px.
- Peso: aproximadamente 2,46 MB.
- Formato: PNG com canal alpha.
- Status: referencia oficial/matriz de poses, nao asset final para uso direto no site.

Organizacao do acervo:

- `docs/branding/mascote/originais/`: recebera futuramente poses individuais oficiais em alta qualidade.
- `docs/branding/mascote/referencias/`: contem folhas de poses, prints e guias de uso.
- `docs/branding/mascote/otimizados/`: contera somente arquivos aprovados e preparados para producao.

Diretrizes:

- Usar o mascote de maneira estrategica, sempre subordinado a mensagem principal e aos CTAs.
- Preservar aparencia premium: evitar excesso de repeticao, uso decorativo gratuito ou competicao com titulos.
- Usar somente poses oficiais aprovadas e derivadas dos arquivos originais em alta qualidade.
- Nao redesenhar, recolorir, distorcer, espelhar sem aprovacao, alterar uniforme, logo ou proporcoes.
- Nao utilizar a folha completa de poses diretamente no site.
- Nao recortar automaticamente poses sem conferencia visual de qualidade e transparencias.
- Manter os arquivos originais preservados e gerar derivados em pasta separada quando a fase de implementacao for aprovada.
- Otimizar derivados para WebP ou AVIF somente a partir dos originais aprovados.
- Prever dimensoes responsivas, `loading="lazy"` fora da primeira dobra e prioridade controlada no Hero.
- Evitar imagens pesadas acima da dobra sem versao otimizada.
- Definir `alt` informativo quando o mascote comunicar uma acao ou estado; usar `alt=""` apenas quando for puramente decorativo.

Aplicacoes futuras planejadas:

| Secao | Pose sugerida | Intencao | Prioridade | Observacoes |
| --- | --- | --- | --- | --- |
| Hero | Aceno ou pose principal com logo | Recepcao, confianca e presenca de marca | Alta | Usar somente se houver recorte limpo e peso otimizado |
| Planos | Apresentando ou polegar para cima | Reforcar oferta e decisao | Media | Nao competir com preco e CTA |
| Beneficios | Apontando ou celebrando | Destacar vantagens | Media | Usar com parcimonia em cards ou chamadas |
| Suporte | Trabalhando, conectado ou protegido | Atendimento, suporte e estabilidade | Alta | Boa aplicacao para WhatsApp/suporte |
| Cobertura | Apontando pra baixo ou espiando | Direcionar busca de endereco | Media | Evitar obstruir campo de busca |
| FAQ | Pensando ou curioso | Apoiar duvidas frequentes | Baixa | Pode ser usado como detalhe lateral |
| Indique e Ganhe | GNS ama voce ou campeao | Afeto, recompensa e campanha | Alta | Exigir comunicacao clara de regras |
| Confirmacao de formulario | Feliz, animado ou polegar para cima | Feedback positivo | Alta | Pode aumentar percepcao de sucesso |
| Pagina 404 | Surpreso, triste ou espiando | Estado de erro amigavel | Media | Manter tom profissional |

Riscos a controlar:

- A folha atual concentra muitas poses em um unico PNG; usar diretamente causaria peso excessivo e baixa precisao visual.
- Recortes mal feitos podem deixar residuos, bordas ruins ou perda de detalhes do uniforme/logo.
- Poses muito expressivas podem reduzir a percepcao premium se usadas em excesso.
- Sem derivados otimizados, o uso no Hero pode prejudicar LCP e performance mobile.
- Alt text generico ou redundante pode piorar acessibilidade.

Documento complementar:

- `MAPA-USO-MASCOTE-GNS-FIBRA-2.md`.

## 17. Arquitetura de tema

Fluxo:

1. Antes do React carregar, script curto le `localStorage.gns-theme`.
2. Se houver preferencia salva, aplica `data-theme`.
3. Se nao houver, usa `prefers-color-scheme`.
4. React inicializa lendo o tema aplicado.
5. Toggle altera atributo e persiste.

Implementado:

- `ThemeProvider` em `src/theme/theme.tsx`.
- Hook `useTheme`.
- Tipo `ThemeMode = "light" | "dark" | "system"`.
- Chave `localStorage`: `gns-theme`.
- Atributos no HTML: `data-theme` e `data-theme-mode`.
- Script externo `public/theme-init.js` para evitar flash visual antes do React carregar.
- `ThemeToggle` no Header existente, sem redesenhar o Header.

Requisitos:

- Sem SSR necessario.
- Evitar flash visual.
- Nao bloquear carregamento.
- Respeitar sistema inicialmente.
- Botao com `aria-label`, `aria-pressed` ou texto acessivel.
- Atualizar `meta[name="theme-color"]` por tema.

## 18. Contrato de tokens recomendado

Categorias:

- `color.background`
- `color.foreground`
- `color.surface`
- `color.surface-raised`
- `color.border`
- `color.primary`
- `color.primary-hover`
- `color.primary-foreground`
- `color.muted`
- `color.success`
- `color.warning`
- `color.danger`
- `shadow.*`
- `radius.*`
- `space.*`
- `font.*`
- `motion.*`

## 19. O que preservar visualmente

- Sensacao premium do Dark.
- CTAs fortes.
- Logo no header e footer.
- Cards de planos com destaque claro.
- Cobertura com busca.
- Prova social em cards.
- WhatsApp flutuante.

## 20. O que revisar antes de aplicar

- Se `Orbitron` continua alinhada a marca.
- Peso das imagens.
- Tokens OKLCH versus HEX; escolher estrategia unica ou documentada.
- Gradientes decorativos que dificultem tema claro.
- Separacao visual entre beneficios, diferenciais e tecnologias.
- Aplicacao do mascote.

## 21. Validacao inicial da fundacao

Validado em navegador local:

- Tema Dark: aplicado por `data-theme="dark"`.
- Tema Light: aplicado por `data-theme="light"`.
- Toggle acessivel no Header com `aria-label`, `title`, `aria-pressed` e area 44x44.
- Persistencia observada apos reload pelo atributo mantido no HTML.
- Breakpoints 360, 390, 414, 430, 768, 1024, 1280 e 1440 sem overflow horizontal nos dois temas.
- Menu mobile abre em 390px com o toggle presente e sem overflow.

## 22. Planos, beneficios e tecnologias

Atualizado em 14/07/2026.

### Planos

Direcao aplicada:

- cards comerciais mais escaneaveis;
- nome, velocidade, preco, beneficio principal, Wi-Fi e CTA como hierarquia principal;
- lista curta de beneficios para evitar cards longos;
- selo textual para plano em destaque;
- grid responsivo com `auto-fit`, sem regra por indice ou quantidade fixa;
- tratamento visual para preco ausente ou zero como estado sob consulta.

Classes CSS adicionadas:

- `.plans-grid`;
- `.plan-card`;
- `.plan-card-featured`.

### Beneficios

Foi criada uma secao propria para beneficios, separada dos planos.

Direcao aplicada:

- cards menores;
- icones `lucide-react`;
- texto curto;
- estrutura com `active`, CTA opcional e dados preparados para painel futuro;
- uso apenas de informacoes ja presentes no conteudo atual.

Classe CSS adicionada:

- `.benefit-card`.

### Tecnologias

Foi criada uma secao propria para tecnologias.

Direcao aplicada:

- aparencia tecnica sem estetica gamer excessiva;
- composicao em painel com linhas e sinalizacao leve em CSS;
- sem imagens novas;
- sem publicar Wi-Fi 6, Wi-Fi 7, XGS-PON ou beneficios internos sem confirmacao;
- disponibilidade exibida como campo textual administravel no futuro.

Classes CSS adicionadas:

- `.technology-panel`;
- `.technology-radar`;
- `.technology-card`.

### Ajuste tipografico

O `letter-spacing` global de headings foi ajustado para `0`, evitando compressao visual e seguindo a regra atual de legibilidade do projeto.
