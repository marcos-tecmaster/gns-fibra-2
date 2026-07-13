# AUDITORIA - GNS FIBRA 2.0

Data: 13/07/2026  
Diretorio auditado: `C:\laragon\www\gns-fibra-2`  
Origem da copia: `C:\laragon\www\gns-fibra`  
Referencias comparativas: `C:\laragon\www\gns-fibra-classic` e `C:\laragon\www\gns-fibra-v3`

## 1. Escopo desta fase

Esta fase foi limitada a auditoria, planejamento, preparacao e validacoes nao destrutivas.

Nao foram alterados:

- design publico;
- logica React;
- banco de dados;
- painel administrativo;
- API PHP;
- conteudo funcional;
- rotas;
- dados;
- projetos originais `gns-fibra`, `gns-fibra-classic` e `gns-fibra-v3`.

Foram criados apenas documentos de planejamento na copia `gns-fibra-2`.

## 2. Preparacao da copia

Destino criado:

- `C:\laragon\www\gns-fibra-2`

Itens copiados da base Premium/Dark:

- `src/`
- `public/`
- `admin/`
- `api/`
- `config/`
- `database/`
- `uploads/`
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `index.html`
- `.htaccess`
- documentacao existente
- `GNS_FIBRA_2_0_DOCUMENTO_MESTRE.md`

Itens excluidos por seguranca ou por nao fazerem parte da copia limpa:

- `.git/`
- `node_modules/`
- `dist/`
- `logs/`, `log/`
- `tmp/`, `temp/`
- `backup/`, `backups/`
- `.cache/`, `.vite/`
- `.env`, `.env.*`
- `*.zip`
- `*.bak`
- `*.tmp`
- `*.log`
- `database.local.php`

Confirmacoes:

- O documento mestre existe na raiz de `gns-fibra-2`.
- `database.local.php` nao foi copiado.
- Nenhum arquivo `.env`, zip, backup ou log foi encontrado na copia apos a varredura.
- O projeto original `gns-fibra` permaneceu intacto; a unica acao sobre ele foi leitura e copia.

Observacao: `config/database.php` foi copiado porque faz parte da estrutura funcional, mas ele nao contem credencial fixa; usa variaveis `GNS_DB_*` ou `config/database.local.php`.

## 3. Validacoes executadas

Comandos executados em `C:\laragon\www\gns-fibra-2`:

| Validacao | Resultado |
| --- | --- |
| `npm install` | Concluido com `C:\Program Files\nodejs\npm.cmd`; 89 pacotes instalados |
| `npm run typecheck` | Aprovado com `tsc -b` |
| `npm run build` | Aprovado; Vite transformou 2146 modulos e gerou `dist/` |
| `npm audit` | 1 vulnerabilidade baixa em `esbuild`; correcao disponivel via `npm audit fix`, nao executada nesta fase |
| `php -l` em arquivos PHP | 20 arquivos verificados, 0 falhas |

Nota: o comando `npm run build` gerou `dist/` dentro da copia, como efeito esperado da validacao. Isso nao altera os projetos originais.

Observacao operacional: o `npm` encontrado primeiro no PATH apontava para `C:\WINDOWS\system32\npm` e retornava sem executar corretamente. As validacoes confiaveis foram refeitas explicitamente com `C:\Program Files\nodejs\npm.cmd`.

## 4. Inventario da estrutura React

Stack publica:

- React 19.2
- TypeScript
- Vite 7.3
- Tailwind CSS 4 via `@tailwindcss/vite`
- Framer Motion
- Lucide React

Entrada:

- `src/main.tsx`
- `src/App.tsx`
- `index.html`

Composicao atual de `App.tsx`:

1. `SiteContentProvider`
2. `Header`
3. `Hero`
4. `Stats`
5. `Differentials`
6. `Plans`
7. `Business`
8. `Coverage`
9. `History`
10. `Testimonials`
11. `CTASection`
12. `Footer`
13. `WhatsAppFloat`

Caracteristicas:

- SPA de uma pagina baseada em secoes com anchors.
- Sem roteador React.
- Conteudo dinamico centralizado em provider.
- Fallback local se a API PHP falhar.
- Imagens locais importadas por componentes React.

## 5. Componentes reutilizaveis

Devem ser preservados como base:

- `SiteContentProvider`: boa separacao entre conteudo local e API.
- `site-content-service.ts`: normalizacao da resposta da API e fallback seguro.
- `Header`: ja possui menu mobile, bloqueio de scroll quando aberto e CTA.
- `Plans`: estrutura comercial clara, highlight e beneficios.
- `Coverage`: busca local e links clicaveis de mapa.
- `WhatsAppFloat`: CTA permanente e acessivel por `aria-label`.
- `Footer`: concentra links, pontos de atendimento e assinatura.
- `admin/includes/simple-crud.php`: reduz duplicacao no painel.

Componentes que precisam evoluir:

- `Hero`: forte visualmente, mas nao usa logo/mascote como elemento estrategico da nova fase.
- `Stats`: bom bloco, mas numeros precisam ser validados antes de ampliar prova social.
- `Differentials`: pode absorver tecnologias e beneficios, mas hoje mistura argumentos.
- `Testimonials`: tem estrutura pronta, mas usa depoimentos locais genericos quando API nao responde.
- `History`: inclui placeholders para equipe/frota; precisa receber imagens reais ou reposicionamento.

## 6. Estilos e tokens

Arquivo principal:

- `src/styles.css`

Estado atual:

- Tema unico escuro.
- Tokens CSS em `:root`.
- Paleta em OKLCH para fundo, cards, primaria, bordas e sombras.
- Utilitarios customizados: `text-gradient` e `card-premium`.
- `prefers-reduced-motion` ja tratado.
- `overflow-x: clip` em `html` e `body`.

Riscos para Dark/Light:

- `:root` representa hoje apenas o tema escuro.
- Variavel `dark` existe como custom variant, mas nao ha arquitetura real de tema.
- Muitos componentes usam opacidades diretas de tokens (`bg-card/60`, `from-background/85` etc.), o que exige revisao em tema claro.
- Ha sombras com OKLCH diretamente nos componentes.
- `WhatsAppFloat` usa `style={{ backgroundColor: "oklch(...)" }}` e classe arbitraria com OKLCH.
- `Hero` usa `style` inline com grid em OKLCH.
- `admin/assets/admin.css` possui paleta separada em HEX/RGBA e nao compartilha tokens com o frontend.

## 7. Cores fixadas diretamente

Principais pontos:

- `src/styles.css`: tokens OKLCH e gradientes globais.
- `src/components/site/Hero.tsx`: background grid inline com OKLCH.
- `src/components/site/Plans.tsx`, `Header.tsx`, `Coverage.tsx`, `CTASection.tsx`, `Differentials.tsx`: sombras arbitrarias com OKLCH em classes Tailwind.
- `src/components/site/WhatsAppFloat.tsx`: cor WhatsApp inline e classe arbitraria.
- `admin/assets/admin.css`: paleta propria com `#100d0b`, `#ff7a00`, `#ffad33`, `#3c2d24`, `#7c2825` etc.
- `index.html`: `theme-color` fixo para dark.
- `.htaccess` CSP permite Google Fonts.

Recomendacao: migrar cores diretas para tokens semanticamente nomeados antes de implementar o tema claro.

## 8. Imagens e assets

Assets publicos:

- `public/logo-gns.png`
- `public/favicon.svg`
- `public/og-image.jpg`
- `public/robots.txt`
- `public/sitemap.xml`

Assets React:

- `src/assets/hero-fiber.jpg`
- `src/assets/datacenter.jpg`
- `src/assets/fiber-bundle.jpg`
- `src/assets/install.jpg`

Uploads:

- `uploads/` copiado.
- Uploads sao usados pelo painel para banners.

Lacunas:

- Mascote oficial ainda nao esta mapeado como asset aprovado.
- Nao ha politica documentada de formatos WebP/AVIF.
- Alt texts existem em imagens importantes, mas algumas imagens decorativas usam `alt=""`, correto quando decorativas.

## 9. Conteudo, API e acoplamento

Frontend:

- `src/lib/site-content.ts` contem conteudo local de fallback.
- `src/services/site-content-service.ts` busca `api/site-content.php`.
- `VITE_SITE_CONTENT_API` pode substituir a URL da API.
- Se nao houver variavel, a URL e resolvida por `new URL("api/site-content.php", document.baseURI)`.

API:

- `api/site-content.php`
- Metodo aceito: GET.
- Retorna `settings`, `plans`, `coverage`, `testimonials`, `banners`, `generated_at`.
- Aplica headers de seguranca e cache publico curto.
- Oculta erro interno com mensagem generica.

Acoplamentos:

- Frontend consome `settings`, `plans`, `coverage` e `testimonials`.
- API retorna `banners`, mas a interface publica Premium/Dark nao usa banners.
- `settings.hero_title` e `settings.about_text` afetam Hero e Historia.
- Planos dependem do JSON `benefits` no banco.
- Cobertura depende de `map_url`.
- Depoimentos no frontend assumem rating 5 fixo.

Risco: evoluir painel ou banco sem atualizar `types.ts` e normalizador quebra dados dinamicos ou gera fallback silencioso.

## 10. Painel administrativo

Modulos atuais:

- Dashboard
- Planos
- Banners
- Cobertura
- Depoimentos
- Configuracoes
- Usuarios
- Troca de senha
- Login/Logout

Pontos fortes:

- CSRF em formularios.
- `password_hash` e `password_verify`.
- Troca obrigatoria de senha.
- Rate limit de login por IP e usuario.
- Sessao com cookie `HttpOnly`, `SameSite=Lax` e `Secure` quando HTTPS.
- Upload limitado a JPG, PNG e WebP, ate 5 MB.
- Verificacao por MIME via `finfo`.
- Exclusao de uploads tenta evitar apagar arquivo compartilhado.
- Layout do admin tem media queries para mobile.

Riscos:

- CRUD generico monta nomes de tabela/campo por interpolacao; hoje configs sao internas, mas deve continuar sem entrada externa.
- Tabelas em mobile usam rolagem horizontal, nao layout em cards.
- Sem trilha de auditoria.
- Sem perfis/permissoes por modulo.
- Sem CAPTCHA.
- Sem logs administrativos estruturados.
- `script-src 'unsafe-inline'` no CSP do PHP por causa do admin.
- Painel e frontend usam sistemas visuais separados.

## 11. Banco de dados

Arquivos:

- `database/schema.sql`
- `database/seed.sql`
- `database/migration-2026-06-security.sql`
- `database/migration-2026-06-17-coverage-map-url.sql`
- `database/create-admin.php`

Tabelas atuais:

- `users`
- `login_attempts`
- `settings`
- `plans`
- `coverage`
- `testimonials`
- `banners`

Nao foram executadas migracoes.
Nao houve conexao intencional com banco de producao.
Nao houve alteracao de dados.

## 12. SEO e producao

Arquivos:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `.htaccess`

Pontos bons:

- `lang="pt-BR"`.
- Meta description.
- Open Graph.
- Twitter Card.
- Canonical.
- Robots e sitemap.
- Headers de seguranca no `.htaccess`.

Riscos:

- `sitemap.xml` tem apenas a home.
- Nao ha dados estruturados JSON-LD.
- Nao ha paginas regionais.
- Nao ha FAQ schema.
- `theme-color` e fixo para tema escuro.
- `vite.config.ts` usa `base: "./"`, enquanto o documento mestre cita producao com `base: "/"`; precisa decisao antes de publicar.
- `.htaccess` redireciona assets publicos para `dist/`; apos build, a estrutura precisa ser conferida no ambiente Apache.

## 13. Performance

Pontos bons:

- Build aprovado.
- Imagens principais possuem `width` e `height` em varios componentes.
- Hero usa `fetchPriority="high"`.
- Imagens secundarias usam `loading="lazy"` e `decoding="async"`.
- Dependencias enxutas: React, Framer Motion, Lucide.

Riscos:

- Google Fonts externa pode bloquear renderizacao e conflitar com CSP/performance.
- Framer Motion aumenta bundle e deve ser usado com parcimonia.
- Nao ha auditoria Lighthouse nesta fase.
- Nao ha estrategia documentada para WebP/AVIF.
- Hero usa imagem grande como background; precisa avaliar peso real.

## 14. Acessibilidade

Pontos bons:

- Foco visivel global.
- `prefers-reduced-motion` implementado.
- Botao do menu tem `aria-label` e `aria-expanded`.
- Navegacoes possuem `aria-label`.
- Campo de busca tem `sr-only`.
- WhatsApp flutuante tem `aria-label`.

Riscos:

- Contraste deve ser revalidado no tema claro.
- Depoimentos usam estrelas visuais com label no container, bom, mas rating fixo.
- Muitos CTAs abrem nova aba; manter `rel="noopener noreferrer"`.
- Areas clicaveis em chips podem ficar pequenas dependendo do conteudo.
- Tabelas do admin em mobile dependem de scroll horizontal.

## 15. Seguranca

Pontos bons:

- Headers PHP de seguranca.
- Headers Apache de seguranca.
- `Options -Indexes`.
- Configuracao de banco sem credenciais fixas no arquivo principal.
- `database.local.php` excluido da copia.
- API so aceita GET.
- Erros internos da API nao sao expostos.

Riscos:

- Necessario confirmar protecao de `config/` e `database/` no Apache em producao.
- `.htaccess` atual nao mostra bloqueio explicito de acesso direto a `.sql`; avaliar antes de publicar.
- `uploads/` precisa bloquear execucao PHP em producao.
- Futuras integracoes IXC exigem token fora do Git e fora do React.
- Logs futuros devem mascarar CPF, telefone e token.

## 16. Comparativo conceitual

| Tema | Preservar do Premium/Dark | Aproveitar do Classic | Incorporar da V3 | Nao reutilizar |
| --- | --- | --- | --- | --- |
| Identidade | Impacto premium, atmosfera tecnologica, contraste, CTA forte | Clareza do modo claro, branco/cinza metalico, grafite e laranja oficial | Paleta oficial mais objetiva, menos dependente de OKLCH | Excesso de brilho, sombras decorativas e fundos pesados em todas as secoes |
| Estrutura | Header, Hero, Planos, Cobertura, Prova social, CTA, Footer | Leitura clara, superficies brancas, hierarquia comercial | Benefits e About como secoes dedicadas | Duplicar secoes com nomes diferentes sem consolidar conteudo |
| Conteudo | Provider, fallback local, API dinamica | Textos comerciais mais diretos do Classic | Organizacao comercial: planos, beneficios, empresas, cobertura, sobre | Dados genericos sem validacao comercial |
| Admin/API | Painel atual, seguranca, CRUDs, API de conteudo | Melhorias visuais pontuais do painel Classic se existirem | Relatorios V3 de Admin/API e scripts production-safe como referencia | Credenciais temporarias, scripts de seed em producao sem remocao |
| Mobile | Estrutura responsiva existente | Leitura mais leve do tema claro | Fluxo mais enxuto da V3 | Menu/tabelas que dependam somente de scroll horizontal em telas pequenas |
| SEO/Marketing | Metas existentes, sitemap, robots, OG | Visual claro para campanhas | Estrutura de landing/campanha e beneficios | Publicar sem schema, eventos e paginas regionais planejadas |

## 17. Prioridades de risco

Alta:

- Definir arquitetura de tema antes de mexer em componentes.
- Separar tokens semanticos dark/light e remover cores inline criticas.
- Confirmar protecao de arquivos sensiveis e uploads em Apache.
- Planejar migrations antes de adicionar beneficios, tecnologias, FAQ, campanhas e indicacoes.

Media:

- Reorganizar conteudo entre diferenciais, beneficios e tecnologias.
- Integrar banners retornados pela API ou remover do contrato publico se nao for usado.
- Validar mobile real com Playwright/Lighthouse apos implementacao.
- Definir estrategia de mascote oficial.

Baixa:

- Revisar nomes, labels e microcopy.
- Padronizar raios e sombras.
- Reduzir dependencia de fontes externas.
- Atualizar dependencia afetada pelo alerta baixo de `esbuild` em fase propria, sem `audit fix` automatico em producao.

## 18. Conclusao da auditoria

A base Premium/Dark esta tecnicamente saudavel para evolucao: typecheck, build e lint PHP passaram. O `npm audit` encontrou 1 vulnerabilidade baixa em `esbuild`, relevante principalmente ao dev server em Windows, e deve ser tratada em fase propria. A arquitetura atual e simples e preservavel, com separacao razoavel entre frontend, API e admin.

O maior risco da GNS Fibra 2.0 nao e estabilidade imediata, mas evoluir tema, conteudo dinamico e painel sem antes criar tokens e contratos claros. A proxima fase deve ser fundacional: design tokens, tema, documentacao de dados e sequencia de migracoes.
