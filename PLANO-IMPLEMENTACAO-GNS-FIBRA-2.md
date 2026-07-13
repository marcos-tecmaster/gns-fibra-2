# PLANO DE IMPLEMENTACAO - GNS FIBRA 2.0

Data: 13/07/2026  
Base oficial: `C:\laragon\www\gns-fibra-2`

## 1. Premissas

- Evoluir a copia `gns-fibra-2`, nao o projeto original.
- Preservar painel, API, banco e funcionalidades existentes ate haver fase especifica.
- Implementar em fases pequenas, sempre com `npm run typecheck`, `npm run build` e `php -l` quando houver PHP.
- Nao executar migracoes sem backup e aprovacao explicita.
- Nao conectar a banco de producao durante desenvolvimento local.
- Nao inventar endpoints IXC, credenciais, regras comerciais ou dados de campanha.

## 2. Sequencia recomendada

### Fase 1 - Fundacao de tema e tokens

Objetivo:

- Preparar Dark/Light sem alterar visual final de forma ampla.

Status em 13/07/2026:

- Implementada a fundacao de tema e tokens.
- Criado `ThemeProvider`, `useTheme`, script anti-flash e `ThemeToggle`.
- Dark preserva a base Premium/Dark.
- Light usa tokens inspirados na identidade Classic sem copiar componentes.
- Nao houve alteracao de banco, API PHP ou painel administrativo.

Arquivos provaveis:

- `src/styles.css`
- `src/main.tsx`
- `src/App.tsx`
- novo `src/theme/` ou `src/lib/theme.ts`
- possivel script inline em `index.html` para evitar flash visual

Entregas:

- tokens `:root`, `[data-theme="dark"]`, `[data-theme="light"]`;
- preferencia inicial por sistema;
- persistencia em `localStorage`;
- classe/atributo aplicado antes do React hidratar;
- botao futuro mapeado, mas nao necessariamente estilizado nesta fase.

Entregas realizadas:

- `data-theme` e `data-theme-mode` no elemento `html`.
- Chave `localStorage`: `gns-theme`.
- Botao de alternancia no Header.
- Validacao responsiva nos breakpoints definidos.

Complexidade: media.  
Risco: medio, pois altera base visual global.

### Fase 2 - Mobile-first real

Objetivo:

- Corrigir estrutura e fluxos para 360, 390, 414 e 430 px.

Arquivos provaveis:

- `src/components/site/Header.tsx`
- `src/components/site/Hero.tsx`
- `src/components/site/Plans.tsx`
- `src/components/site/Coverage.tsx`
- `src/components/site/Footer.tsx`
- `src/styles.css`

Entregas:

- auditoria visual por viewport;
- ajustes de grid, largura, quebra de texto e toque;
- nenhum overflow horizontal;
- CTAs com altura e largura adequadas;
- menu mobile robusto.

Complexidade: media.  
Risco: medio.

### Fase 3 - Design System 2.0 aplicado ao publico

Objetivo:

- Aplicar a identidade laranja, grafite, cinza metalico, dark/light, logo e mascote.

Arquivos provaveis:

- `src/styles.css`
- `src/components/site/*`
- `public/` para assets aprovados
- `src/assets/` para imagens importadas no bundle

Entregas:

- botoes padronizados;
- cards padronizados;
- formularios e chips padronizados;
- estados hover/focus;
- uso controlado do mascote;
- tema claro inspirado no Classic;
- dark preservando a forca Premium.

Complexidade: alta.  
Risco: medio-alto por impacto visual amplo.

### Fase 4 - Conteudo e UX comercial

Objetivo:

- Reorganizar a pagina para conversao e clareza.

Arquivos provaveis:

- `src/App.tsx`
- `src/components/site/Benefits.tsx` novo ou incorporado da V3
- `src/components/site/Technologies.tsx` novo
- `src/components/site/Faq.tsx` novo
- `src/components/site/Campaigns.tsx` novo
- `src/lib/site-content.ts`
- `src/content/types.ts`
- `src/services/site-content-service.ts`

Entregas:

- beneficios separados dos planos;
- tecnologias Wi-Fi 5/6/7 e XGS-PON;
- FAQ inicial;
- campanhas como estrutura visual;
- prova social mais forte;
- copy validada.

Complexidade: alta.  
Risco: medio, pois toca contratos de conteudo.

### Fase 5 - SEO e performance

Objetivo:

- Melhorar indexacao, compartilhamento e Core Web Vitals.

Arquivos provaveis:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- novos scripts de geracao se necessario
- `src/components/site/*` para headings e semantica

Entregas:

- JSON-LD Organization/LocalBusiness;
- FAQ schema quando FAQ existir;
- sitemap expandido;
- metadata por campanhas se houver landing pages;
- otimizacao de imagens;
- revisao de Google Fonts;
- Lighthouse apos implementacao.

Complexidade: media.  
Risco: baixo-medio.

### Fase 6 - Painel Administrativo 2.0

Objetivo:

- Evoluir o admin para suportar o novo conteudo.

Arquivos provaveis:

- `admin/*.php`
- `admin/includes/*.php`
- `admin/assets/admin.css`
- `api/site-content.php`
- `database/*.sql`

Modulos futuros:

- Beneficios
- Tecnologias
- FAQ
- Campanhas
- Indicacoes
- Leads
- Avaliacoes
- Integracoes
- Pixels/Analytics
- Mascote e banners
- Landing pages
- Logs IXC

Complexidade: alta.  
Risco: alto por envolver banco, permissoes e dados.

### Fase 7 - Campanha Indique e Ganhe

Objetivo:

- Criar fluxo de indicacao com LGPD e posterior integracao operacional.

Arquivos provaveis:

- novos componentes React;
- novo endpoint PHP proprio;
- novos modulos admin;
- novas tabelas e migrations;
- politica/termos se aplicavel.

Pre-condicoes:

- regras comerciais confirmadas;
- campos obrigatorios confirmados;
- tratamento de duplicidade definido;
- destino interno do lead definido.

Complexidade: alta.  
Risco: alto por dados pessoais.

### Fase 8 - Integracao IXC

Objetivo:

- Integrar somente pelo backend, sem token no frontend.

Arquitetura:

`React -> API PHP propria -> API REST IXC`

Arquivos provaveis:

- `api/*.php`
- `config/ixc.php` ou equivalente fora do Git com exemplo seguro;
- `admin/integracoes.php`
- `admin/logs-ixc.php`
- `database/migration-*.sql`

Pre-condicoes:

- URL base oficial;
- token exclusivo;
- usuario tecnico;
- permissoes minimas;
- ambiente de teste;
- endpoint e metodo confirmados;
- payload e respostas de sucesso/erro;
- contrato LGPD.

Complexidade: alta.  
Risco: alto.

### Fase 9 - Homologacao e producao

Objetivo:

- Validar fluxo completo antes de publicar.

Checklist:

- backup de banco;
- backup de arquivos;
- `npm run typecheck`;
- `npm run build`;
- `npm audit`;
- `php -l`;
- teste admin;
- teste API;
- teste mobile;
- teste anonimo;
- teste de headers;
- limpeza de cache Cloudflare;
- monitoramento pos-publicacao.

Complexidade: media.  
Risco: medio.

## 3. Arquivos que nao devem ser alterados sem fase propria

- `database/*.sql`
- `config/database.php`
- `config/auth.php`
- `config/security.php`
- `admin/*.php`
- `api/site-content.php`
- `.htaccess`

Excecao: documentacao, ajustes estritamente necessarios e aprovados, ou fase especifica.

## 4. Ordem tecnica recomendada

1. Congelar contratos atuais de conteudo em documentacao.
2. Criar tokens de tema e provider de tema.
3. Migrar cores diretas para tokens.
4. Implementar toggle dark/light.
5. Validar mobile.
6. Inserir beneficios/tecnologias/FAQ no frontend com fallback local.
7. So entao planejar migrations e admin 2.0.
8. Implementar Indique e Ganhe sem IXC primeiro.
9. Homologar IXC em backend isolado.
10. Publicar por etapas.

## 5. Validacoes por fase

Frontend:

- `npm run typecheck`
- `npm run build`
- `npm audit` e tratamento manual de vulnerabilidades; nao usar `npm audit fix` automatico sem revisar impacto
- teste visual mobile/desktop
- teste de teclado
- teste de contraste

PHP:

- `php -l`
- teste de sessao
- teste CSRF
- teste upload
- teste API JSON

Banco:

- revisar SQL manualmente;
- garantir migrations idempotentes quando possivel;
- fazer backup antes;
- nunca rodar em producao sem aprovacao.

## 6. Recomendacoes antes da implementacao

- Reunir logo e mascote oficiais em formatos aprovados.
- Definir se `base` do Vite sera `./` ou `/` para o ambiente final.
- Confirmar dados comerciais dos planos e beneficios.
- Confirmar regras do Indique e Ganhe.
- Definir lista de regioes e paginas/landing pages prioritarias.
- Definir politica de analytics e consentimento.
- Separar ambiente local/homologacao/producao.
- Criar backup do banco antes de qualquer fase com migration.
- Corrigir em fase propria o alerta baixo atual de `esbuild`, preferencialmente atualizando lock/dependencia de forma revisada.
