# RELATORIO DE TOKENS E TEMA - GNS FIBRA 2.0

Data: 13/07/2026
Escopo: inventario de cores e estilos para a fase Fundacao Visual, Design System e Tema Dark/Light.

## 1. Arquivos analisados

- `src/styles.css`
- `src/App.tsx`
- `src/components/site/*.tsx`
- `index.html`
- `admin/assets/admin.css` somente como referencia, sem alteracao nesta fase
- documentos de planejamento existentes

Foram ignorados:

- `node_modules/`
- `dist/`
- `package-lock.json`

## 2. Inventario principal

| Valor atual | Arquivos onde aparece | Token sugerido | Funcao visual | Risco da substituicao |
| --- | --- | --- | --- | --- |
| `oklch(0.13 0.02 40)` | `src/styles.css` | `--color-bg`, `--background` | Fundo principal dark | Alto: altera todo o site |
| `oklch(0.97 0.005 80)` | `src/styles.css` | `--color-text`, `--foreground` | Texto principal dark | Alto: impacto global de contraste |
| `oklch(0.17 0.025 40)` | `src/styles.css` | `--color-surface`, `--card` | Superficie de cards | Alto: impacta cards e header |
| `oklch(0.72 0.21 45)` | `src/styles.css`, `Hero`, sombras | `--color-primary`, `--color-cta` | Laranja de marca/acento | Medio: precisa manter identidade |
| `oklch(0.78 0.19 55)` | `src/styles.css` | `--color-primary-glow`, `--gradient-brand` | Brilho do laranja | Medio: afeta CTAs e gradientes |
| `oklch(0.30 0.04 45 / 50%)` | `src/styles.css` | `--color-border`, `--color-border-strong` | Bordas dark | Medio: contraste em tema claro |
| `oklch(0.72 0.18 150)` | `src/styles.css`, `WhatsAppFloat` | `--color-success`, `--color-whatsapp` | CTA WhatsApp | Baixo: funcao isolada |
| `linear-gradient(...)` brand | `src/styles.css`, componentes | `--gradient-brand` | CTA e texto gradiente | Medio: precisa funcionar nos dois temas |
| `radial-gradient(...)` body | `src/styles.css` | `--gradient-page-glow` | Atmosfera premium dark | Alto: no tema claro pode pesar |
| `shadow-[...oklch...]` | `Header`, `Hero`, `Plans`, `Coverage`, `CTASection`, `Differentials`, `WhatsAppFloat` | `--shadow-brand`, `--shadow-elevated` | Glow/sombra de CTA | Medio: substituir gradualmente |
| `style={{ backgroundColor: "oklch(...)" }}` | `WhatsAppFloat.tsx` | `--color-whatsapp` | Fundo do botao WhatsApp | Baixo: substituicao direta |
| `style={{ backgroundImage: ... }}` | `Hero.tsx` | `--hero-grid-line`, `--hero-grid-mask` | Grade decorativa do hero | Medio: tema claro pode exigir opacidade diferente |
| `black` no `maskImage` | `Hero.tsx` | manter tecnico ou `--mask-solid` | Mascara CSS | Baixo: nao e cor visual direta |
| `white` | `src/styles.css`, `WhatsAppFloat.tsx` | `--color-on-dark`, `--color-primary-contrast` | Texto/selection | Medio: depende do fundo |
| `#17110f` | `index.html` | `--theme-color-dark` via script | Cor da barra do navegador | Baixo: trocar por atualizacao via tema |
| `#100d0b`, `#191411`, `#ff7a00`, `#ffad33` | `admin/assets/admin.css` | futuro namespace admin | Painel admin | Alto: fora do escopo desta fase |

## 3. Classes Tailwind arbitrarias encontradas

- `shadow-[0_0_24px_oklch(...)]`
- `shadow-[0_0_40px_oklch(...)]`
- `shadow-[0_0_55px_oklch(...)]`
- `shadow-[0_8px_30px_oklch(...)]`
- `bg-[oklch(...)]`
- `text-[9px]`, `text-[10px]`, `text-[11px]`
- `rounded-[2rem]`, `rounded-[2.5rem]`
- `grid-cols-[1.1fr_0.9fr]`

Risco: as sombras e fundos arbitrarios acoplam o visual ao tema escuro. Tamanhos e grid arbitrarios nao sao problema de tema, mas devem ser mantidos por enquanto para preservar layout.

## 4. Backgrounds, bordas e gradientes fixos

- `body` possui dois `radial-gradient` com laranja OKLCH.
- `card-premium` possui gradiente escuro fixo.
- Hero possui overlays `from-background`, `via-background`, `to-background`, que devem funcionar via tokens.
- CTA e planos usam gradientes laranja direto por tokens Tailwind atuais.
- Admin possui CSS independente, com paleta propria e nao migrada nesta fase.

## 5. Tokens semanticos propostos

Tokens base:

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
- `--shadow-card`
- `--shadow-elevated`
- `--shadow-brand`
- `--gradient-brand`
- `--gradient-card`
- `--gradient-page-glow`

Tokens de compatibilidade Tailwind atual:

- `--background`
- `--foreground`
- `--card`
- `--card-foreground`
- `--popover`
- `--popover-foreground`
- `--primary`
- `--primary-foreground`
- `--primary-glow`
- `--secondary`
- `--secondary-foreground`
- `--muted`
- `--muted-foreground`
- `--accent`
- `--accent-foreground`
- `--destructive`
- `--destructive-foreground`
- `--border`
- `--input`
- `--ring`
- `--whatsapp`

## 6. Estrategia de migracao segura

1. Introduzir tokens semanticos em `src/styles.css`.
2. Manter os nomes antigos como aliases para nao quebrar classes existentes.
3. Criar `[data-theme="dark"]` preservando a aparencia Premium/Dark.
4. Criar `[data-theme="light"]` inspirado no Classic, sem reescrever componentes.
5. Migrar estilos inline de maior risco para CSS variables.
6. Validar typecheck e build.
7. Testar tema dark, light e primeira visita por `prefers-color-scheme`.

## 7. Fora do escopo desta fase

- Migrar `admin/assets/admin.css`.
- Redesenhar Hero.
- Redesenhar planos.
- Alterar banco/API.
- Corrigir todos os valores arbitrarios de layout.
- Implementar mascote, IXC ou Indique e Ganhe.
