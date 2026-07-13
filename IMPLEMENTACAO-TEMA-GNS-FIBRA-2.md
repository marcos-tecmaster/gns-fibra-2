# IMPLEMENTACAO DO TEMA - GNS FIBRA 2.0

Data: 13/07/2026
Fase: Fundacao Visual, Design System e Tema Dark/Light

## 1. Escopo realizado

Foi implementada a fundacao tecnica e visual para temas Dark e Light, com tokens semanticos, provider tipado, persistencia e controle acessivel no Header.

Nao foram alterados:

- painel administrativo;
- API PHP;
- banco de dados;
- migrations;
- conteudo comercial;
- cards dos planos;
- Hero como estrutura;
- IXC;
- Indique e Ganhe.

## 2. Arquitetura criada

Arquivos principais:

- `src/theme/theme.tsx`
- `src/components/site/ThemeToggle.tsx`
- `public/theme-init.js`
- `src/styles.css`

Conceitos:

- `ThemeMode`: `light`, `dark`, `system`.
- `ResolvedTheme`: `light` ou `dark`.
- `ThemeProvider`: gerencia modo escolhido e tema resolvido.
- `useTheme`: expoe `mode`, `resolvedTheme`, `setMode` e `toggleTheme`.
- `ThemeToggle`: alterna entre Dark e Light no Header.

## 3. Chave de persistencia

Chave usada:

```text
gns-theme
```

Valores validos:

- `light`
- `dark`
- `system`

Se o storage estiver indisponivel, o sistema cai para `system` sem quebrar a pagina.

## 4. Comportamento do modo System

Quando nao ha preferencia salva, o modo inicial e `system`.

O tema resolvido usa:

```text
prefers-color-scheme: light
```

Se o sistema estiver em Light, aplica `data-theme="light"`. Caso contrario, aplica `data-theme="dark"`.

O provider tambem observa mudancas de `prefers-color-scheme` enquanto `mode === "system"`.

## 5. Prevencao de flash visual

Foi criado `public/theme-init.js`, carregado no `head` antes do bundle React.

Ele:

- le `localStorage.gns-theme`;
- valida o valor;
- resolve `system` por `prefers-color-scheme`;
- aplica `data-theme`;
- aplica `data-theme-mode`;
- atualiza `color-scheme`;
- atualiza `meta[name="theme-color"]`.

A solucao usa script externo para manter compatibilidade com a CSP atual, que nao permite script inline no `.htaccess` principal.

## 6. Tokens implementados

Tokens semanticos:

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
- `--theme-color`

Aliases preservados para compatibilidade:

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

Utilitarios adicionados:

- `shadow-brand`
- `shadow-whatsapp`

## 7. Arquivos alterados

- `.gitignore`
- `index.html`
- `src/main.tsx`
- `src/styles.css`
- `src/components/site/Header.tsx`
- `src/components/site/Hero.tsx`
- `src/components/site/WhatsAppFloat.tsx`
- `src/components/site/Differentials.tsx`
- `src/components/site/Plans.tsx`
- `src/components/site/CTASection.tsx`
- `src/components/site/Coverage.tsx`
- `DESIGN-SYSTEM-GNS-FIBRA-2.md`
- `PLANO-IMPLEMENTACAO-GNS-FIBRA-2.md`

## 8. Arquivos novos

- `src/theme/theme.tsx`
- `src/components/site/ThemeToggle.tsx`
- `public/theme-init.js`
- `RELATORIO-TOKENS-TEMA-GNS-FIBRA-2.md`
- `IMPLEMENTACAO-TEMA-GNS-FIBRA-2.md`

## 9. Comportamento do tema Dark

- Preserva a aparencia Premium/Dark como base.
- Usa tokens OKLCH existentes migrados para nomes semanticos.
- Mantem laranja de destaque, cards escuros, gradiente premium e CTA forte.
- Atualiza `meta[name="theme-color"]` para `#17110f`.

## 10. Comportamento do tema Light

- Usa fundo branco, grafite, cinzas metalicos e laranja oficial.
- Aproveita a direcao visual da Classic sem copiar componentes.
- Mantem layout, secoes, conteudo, CTAs e estrutura do Premium/Dark.
- Atualiza `meta[name="theme-color"]` para `#ffffff`.

## 11. Testes executados

Comandos:

```powershell
"C:\Program Files\nodejs\npm.cmd" run typecheck
"C:\Program Files\nodejs\npm.cmd" run build
```

Resultado:

- Typecheck aprovado.
- Build aprovado.
- Vite transformou 2148 modulos.
- `dist/theme-init.js` foi gerado/copiadado.

Observacao:

- O Vite emite aviso informando que `theme-init.js` nao e empacotado sem `type="module"`. Isso e esperado porque o arquivo e um script classico vindo de `public/`, necessario para rodar antes do bundle React e compativel com a CSP atual.

## 12. Validacao em navegador

Servidor local:

```text
http://127.0.0.1:5182/
```

Breakpoints testados nos dois temas:

- 360 px
- 390 px
- 414 px
- 430 px
- 768 px
- 1024 px
- 1280 px
- 1440 px

Resultado:

- Sem overflow horizontal nos breakpoints testados.
- Header visivel.
- Botao de tema com area 44x44.
- WhatsApp flutuante com area 56x56.
- Menu mobile abre em 390 px sem overflow.
- Persistencia observada apos reload pelo tema aplicado no `html`.

Console:

- Foram observadas mensagens de extensao/navegador do tipo `A listener indicated an asynchronous response...`. Nao foi identificado stack de erro da aplicacao React durante a validacao.

## 13. Limitacoes

- O admin ainda usa paleta propria em `admin/assets/admin.css`.
- O Hero ainda possui um `style` inline para montar a grade decorativa, agora usando CSS variables.
- O modo `system` existe internamente, mas o botao do Header alterna diretamente entre Dark e Light para simplicidade.
- A validacao de contraste foi feita por inspecao de tokens e comportamento; uma auditoria WCAG automatizada completa deve ocorrer na fase visual.
- O alerta baixo de `npm audit` em `esbuild` permanece pendente; nao foi executado `npm audit fix`.

## 14. Recomendacoes para a proxima fase

1. Migrar gradualmente mais classes de cor para componentes utilitarios semanticos.
2. Validar contraste WCAG com ferramenta dedicada.
3. Revisar o Header visualmente para acomodar o toggle em versao final.
4. Decidir se `Orbitron` permanece como fonte display.
5. Corrigir a vulnerabilidade baixa de `esbuild` com revisao de lockfile.
6. Iniciar a fase mobile-first real antes de redesenhar Hero e planos.
