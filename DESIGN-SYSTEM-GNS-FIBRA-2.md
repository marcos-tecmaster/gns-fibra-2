# DESIGN SYSTEM - GNS FIBRA 2.0

Data: 13/07/2026  
Status: especificacao inicial, nao implementada

## 1. Objetivo

Definir a base visual da GNS Fibra 2.0 para aplicar em tema escuro e claro, preservando a forca Premium/Dark e incorporando a clareza do Classic e a organizacao da V3.

Este documento nao altera o design atual. Ele orienta a proxima fase.

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

## 16. Mascote oficial

Uso recomendado:

- Hero, se houver pose oficial com boa leitura.
- Planos, como apoio a oferta destacada.
- Suporte/WhatsApp.
- Cobertura.
- FAQ.
- Campanhas.
- Sucesso de formulario.
- 404.

Regras:

- Usar apenas arquivos oficiais aprovados.
- Nao distorcer proporcao.
- Nao usar como padrao repetitivo em todas as secoes.
- Garantir que nao cubra CTA ou texto.
- Ter versoes otimizadas para web.

## 17. Arquitetura de tema

Fluxo:

1. Antes do React carregar, script curto le `localStorage.gns-theme`.
2. Se houver preferencia salva, aplica `data-theme`.
3. Se nao houver, usa `prefers-color-scheme`.
4. React inicializa lendo o tema aplicado.
5. Toggle altera atributo e persiste.

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
