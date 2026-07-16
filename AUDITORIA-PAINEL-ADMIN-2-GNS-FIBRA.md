# AUDITORIA PAINEL ADMIN 2 - GNS FIBRA

Data: 16/07/2026
Ambiente: local, `C:\laragon\www\gns-fibra-2`
Branch auditada: `main`
Commit base esperado e confirmado: `86096e9 feat: add support FAQ and contact experience`

## Avisos desta auditoria

- Auditoria realizada somente em ambiente local.
- Nenhuma alteracao funcional foi feita.
- Nenhuma migration foi criada ou executada.
- Nenhum seed foi executado.
- Nenhum SQL destrutivo foi executado.
- Nenhuma credencial, hash completo, senha ou token foi registrado neste documento.
- As propostas abaixo ainda dependem de aprovacao.

## 1. Estado inicial do Git

Comandos executados antes da auditoria:

- `git status`: branch `main`, atualizado com `origin/main`, working tree limpa.
- `git log --oneline -7`: ultimo commit `86096e9`.
- `git stash list`: vazio.
- `git diff --check`: sem problemas.
- `git diff --cached --name-only`: vazio.

Confirmado:

- branch `main`;
- ultimo commit `86096e9`;
- sincronizado com `origin/main`;
- working tree limpa;
- stash vazio;
- nada staged;
- nenhum conflito identificado.

## 2. Documentos lidos

Foram lidos integralmente:

- `GNS_FIBRA_2_0_DOCUMENTO_MESTRE.md`
- `AUDITORIA-GNS-FIBRA-2.md`
- `PLANO-IMPLEMENTACAO-GNS-FIBRA-2.md`
- `DESIGN-SYSTEM-GNS-FIBRA-2.md`
- `MAPA-PAINEL-ADMIN-GNS-FIBRA-2.md`
- `IMPLEMENTACAO-PLANOS-BENEFICIOS-TECNOLOGIAS-GNS-FIBRA-2.md`
- `IMPLEMENTACAO-FAQ-SUPORTE-CONTATO-GNS-FIBRA-2.md`
- `IMPLEMENTACAO-COLECAO-MASCOTES-V2-GNS-FIBRA.md`
- `MAPA-USO-MASCOTE-GNS-FIBRA-2.md`

Diferença principal entre documentacao e estado real: o frontend ja possui suporte local para beneficios, tecnologias e FAQs, mas o painel, API e banco ainda nao administram esses blocos. O painel real continua limitado aos modulos legados listados abaixo.

## 3. Estrutura atual do painel

Arquivos reais em `admin/`:

| Caminho | Finalidade |
| --- | --- |
| `admin/index.php` | Redireciona para `dashboard.php` quando logado ou `login.php` quando anonimo |
| `admin/login.php` | Tela e processamento de login administrativo |
| `admin/logout.php` | Encerra sessao e redireciona ao login |
| `admin/dashboard.php` | Indicadores simples e atalhos |
| `admin/planos.php` | CRUD especifico de planos |
| `admin/banners.php` | CRUD generico de banners com upload |
| `admin/cobertura.php` | CRUD generico de regioes/cobertura |
| `admin/depoimentos.php` | CRUD generico de depoimentos |
| `admin/configuracoes.php` | Edicao de settings chave/valor institucionais |
| `admin/usuarios.php` | CRUD de usuarios administrativos |
| `admin/trocar-senha.php` | Troca obrigatoria ou manual de senha |
| `admin/includes/bootstrap.php` | Carrega banco, security, auth e helper `setting()` |
| `admin/includes/layout.php` | Layout compartilhado e menu lateral |
| `admin/includes/simple-crud.php` | CRUD reutilizavel para banners, cobertura e depoimentos |
| `admin/assets/admin.css` | CSS proprio do painel |

Nao existem no painel atual:

- FAQ;
- beneficios;
- tecnologias;
- atendimento/suporte;
- CTA/Contato;
- diferenciais;
- historia/galeria;
- campanhas;
- indicacoes;
- leads;
- integracoes;
- analytics/pixels;
- logs administrativos.

## 4. Menu e layout atual

O menu lateral e definido em `admin/includes/layout.php`, na funcao `admin_header()`.

Itens atuais:

1. Dashboard
2. Planos
3. Banners
4. Cobertura
5. Depoimentos
6. Configuracoes
7. Usuarios
8. Trocar senha

O item ativo e calculado por:

`basename($_SERVER['SCRIPT_NAME'] ?? '')`

O layout compartilhado existe em `admin/includes/layout.php` e reduz duplicacao de HTML. Ainda ha HTML especifico dentro de `planos.php`, `configuracoes.php`, `usuarios.php`, `login.php` e `trocar-senha.php`.

Responsividade:

- O painel possui media queries em `admin/assets/admin.css`.
- Em telas abaixo de 1024 px, sidebar vira topo.
- Em 768 px e 480 px, formularios viram uma coluna e o menu fica em grid.
- Tabelas usam `min-width` e rolagem horizontal dentro de `.panel`, nao cards responsivos.

Visual:

- O painel usa paleta propria em HEX/RGBA.
- Nao possui Dark/Light.
- Nao compartilha diretamente os tokens do frontend publico.
- Nao usa bibliotecas JS externas; depende de PHP, CSS e confirm nativo do navegador.

## 5. Inventario por arquivo

### `admin/login.php`

- Inclui `admin/includes/bootstrap.php`.
- Nao exige auth.
- GET: renderiza login.
- POST: verifica CSRF, username, password, rate limit, busca usuario ativo, `password_verify`, registra tentativa, regenera sessao e redireciona.
- Tabelas: `users`, `login_attempts`.
- Validacoes: username max 100, senha presente, usuario ativo, rate limit.
- CSRF: sim.
- Redirects: logado para dashboard; senha inicial para trocar-senha; falha permanece no login.
- Riscos: sem CAPTCHA; mensagem generica adequada; atraso com `usleep`.

### `admin/logout.php`

- Inclui bootstrap.
- Acoes: `logout_user()`, nova sessao para flash, redirect `login.php`.
- CSRF: nao, logout por GET.
- Risco medio: logout por GET e aceitavel para baixa criticidade, mas ideal futuro e POST com CSRF.

### `admin/trocar-senha.php`

- Inclui bootstrap e layout.
- Exige login, mas permite acesso quando `must_change_password` esta ativo.
- POST: CSRF, senha atual, nova senha, confirmacao, `password_verify`, politica de senha, `password_hash`, `password_changed_at`, `session_regenerate_id`.
- Tabela: `users`.
- Validacoes: minimo 12, maiuscula, minuscula, numero, especial, nao reutilizar senha inicial conhecida.
- Risco: politica adequada; sem medidor visual; sem historico de senhas.

### `admin/dashboard.php`

- Exige auth.
- Consulta contagens de `plans`, `coverage`, `testimonials`.
- Sem POST.
- Mostra atalhos e link para API.
- Risco baixo: indicadores simples, sem filtro de ativos.

### `admin/planos.php`

- Exige auth.
- GET `action=list|new|edit`, `id`.
- POST `form_action=save|delete`.
- Tabela: `plans`.
- Campos: name, speed, unit, price, audience, benefits JSON, payment_method, featured, active, display_order.
- Validacoes: nome, velocidade, preco valido, pelo menos um beneficio, ordem minima 0.
- CSRF: sim.
- Exclusao: fisica com `DELETE`.
- Redirects: volta para `planos.php`.
- Riscos:
  - exclusao fisica sem soft delete;
  - quando um plano e marcado featured, todos os outros sao zerados por `UPDATE plans SET featured = 0`;
  - benefits continua em JSON dentro de `plans`, dificultando administracao fina de beneficios globais.

### `admin/banners.php`

- Exige auth.
- Usa `run_simple_crud()`.
- Tabela: `banners`.
- GET `action=list|new|edit`, `id`.
- POST save/delete com CSRF.
- Upload: campo `image_path`, diretorio `uploads/banners`, JPG/PNG/WebP ate 5 MB.
- Validacoes: titulo requerido, URL valida para botao.
- Exclusao: fisica; tenta excluir arquivo se nao usado.
- Riscos: banners sao publicados pela API, mas nao consumidos pelo frontend publico atual.

### `admin/cobertura.php`

- Exige auth.
- Usa `run_simple_crud()`.
- Tabela: `coverage`.
- Campos: region, description, map_url, display_order, active.
- Validacoes: region requerida, URL valida, ordem minima 0.
- Exclusao: fisica.
- Risco: nao ha relacao com leads/regioes futuras; sem slug ou cidade normalizada.

### `admin/depoimentos.php`

- Exige auth.
- Usa `run_simple_crud()`.
- Tabela: `testimonials`.
- Campos: customer_name, city, testimonial_text, display_order, active.
- Validacoes: cliente e texto requeridos.
- Exclusao: fisica.
- Risco: frontend assume rating 5 fixo; painel nao administra rating, origem ou autorizacao.

### `admin/configuracoes.php`

- Exige auth.
- POST com CSRF.
- Tabela: `settings`.
- Campos atuais: company_name, whatsapp, email, address, customer_portal_url, linktree_url, facebook_url, instagram_url, coverage_map_url, hero_title, about_text, years_in_market.
- Usa upsert com `ON DUPLICATE KEY UPDATE`.
- Validacoes: obrigatorios, URL, e-mail, numero minimo 0.
- Riscos: settings chave/valor tende a crescer sem agrupamento; nao ha tipos alem da validacao da tela.

### `admin/usuarios.php`

- Exige auth.
- GET `action=list|new|edit`, `id`.
- POST save/delete com CSRF.
- Tabela: `users`.
- Validacoes: nome, usuario, senha para novo usuario, politica de senha.
- Protecoes: nao permite excluir/desativar proprio usuario; tenta manter pelo menos um ativo.
- Riscos:
  - a checagem de "pelo menos um ativo" antes da exclusao conta ativos totais, mas nao impede excluir um usuario inativo irrelevante; aceitavel.
  - nao ha roles/permissoes.

### `admin/includes/simple-crud.php`

- Reutilizado por banners, cobertura e depoimentos.
- Usa configuracoes internas para montar SQL de tabela/campos.
- CSRF em POST.
- Prepared statements para valores.
- Risco medio: nomes de tabela/campo/order by sao interpolados. Hoje sao configs internas, mas nao devem receber entrada externa.

### `admin/includes/bootstrap.php`

- Carrega database, security e auth.
- Chama `send_security_headers()`.
- Helper `setting()` le todos os settings.

### `admin/includes/layout.php`

- Define HTML, topbar, sidebar, menu e flash.
- Usa `h()` para escape.
- Risco baixo: menu hardcoded e sem agrupamentos.

## 6. Autenticacao e seguranca

Pontos positivos confirmados:

- `session_name('gns_admin_session')`.
- Cookie `HttpOnly`.
- Cookie `SameSite=Lax`.
- Cookie `Secure` quando HTTPS detectado.
- `session_regenerate_id(true)` no login e apos troca de senha.
- Timeout de sessao de 7200 segundos.
- CSRF por formulario em POST.
- `password_hash` e `password_verify`.
- Forca troca da senha inicial quando `must_change_password=1`.
- Rate limit por IP + username em `login_attempts`.
- Usuario precisa estar ativo para login.
- Saida HTML usa `h()`.
- PDO com `ATTR_EMULATE_PREPARES=false`.
- API e admin enviam headers de seguranca.
- Upload valida MIME real via `finfo`, limita tamanho a 5 MB e gera nome aleatorio.
- `uploads/.htaccess` bloqueia execucao PHP.
- `database/.htaccess` bloqueia acesso web.

Achados classificados:

| Severidade | Achado | Evidencia | Recomendacao |
| --- | --- | --- | --- |
| Alto | Sem perfis/permissoes por modulo | Qualquer usuario admin acessa todos os modulos | Criar roles antes de integracoes, leads e logs sensiveis |
| Alto | Sem trilha de auditoria | CRUDs nao registram quem alterou/excluiu | Criar `admin_logs` antes de conteudos sensiveis |
| Medio | Logout por GET | `logout.php` encerra sessao sem CSRF | Futuro: formulario POST com CSRF |
| Medio | Exclusoes fisicas | planos, users, coverage, testimonials, banners usam `DELETE` | Avaliar soft delete ou confirmacao reforcada por modulo |
| Medio | SQL de identificadores interpolado no CRUD generico | tabela/campos/order_by em `simple-crud.php` | Manter configs internas e validar allowlist se expandir |
| Medio | CSP do PHP permite `unsafe-inline` | `config/security.php` | Remover gradualmente inline handlers/estilos |
| Medio | Sem CAPTCHA no login | apenas rate limit | Considerar CAPTCHA apos tentativas repetidas |
| Medio | API sem CORS explicito e sem autenticacao | GET publico | Aceitavel para conteudo publico; documentar contrato e cache |
| Baixo | Tabelas admin dependem de scroll horizontal no mobile | CSS `table min-width` | Futuro: cards/listas em mobile |
| Baixo | Admin nao compartilha design system publico | CSS proprio | Criar tokens admin compativeis, sem redesenho imediato |
| Melhoria | Sem estados vazios dedicados | tabelas vazias apenas renderizam tbody vazio | Adicionar estado vazio por modulo |

## 7. Banco de dados real

Foi usado `config/database.local.php` apenas para conectar localmente. O conteudo do arquivo nao foi exibido.

Consultas executadas somente leitura:

- `SHOW TABLES`
- `DESCRIBE tabela`
- `SHOW INDEX FROM tabela`
- `SELECT COUNT(*) FROM tabela`

Tabelas encontradas:

| Tabela | Registros locais | Finalidade | Soft delete | Status/ativo | Ordenacao |
| --- | ---: | --- | --- | --- | --- |
| `users` | 1 | Usuarios administrativos | Nao | `active` | nome no painel |
| `login_attempts` | 1 | Rate limit de login | Nao | `successful` | tentativa |
| `settings` | 12 | Configuracoes chave/valor | Nao | Nao | chave |
| `plans` | 7 | Planos publicados | Nao | `active` | `display_order`, `id` |
| `coverage` | 4 | Regioes e mapa | Nao | `active` | `display_order`, `id` |
| `testimonials` | 4 | Depoimentos | Nao | `active` | `display_order`, `id` |
| `banners` | 1 | Banners promocionais | Nao | `active` | `display_order`, `id` |

Tabelas nao encontradas:

- `benefits`
- `technologies`
- `faqs`
- `support`
- `support_channels`
- `campaigns`
- `leads`
- `referrals`
- `integrations`
- `tracking_settings`
- `analytics_settings`
- `mascot_settings`
- `admin_logs`
- `uploads`

Relacionamentos:

- Nao ha foreign keys declaradas.
- Possiveis orfaos atuais sao baixos por nao haver tabelas dependentes.
- Uploads de banners dependem de caminho textual em `banners.image_path`.

## 8. API atual

Endpoint principal:

- `api/site-content.php`

Metodo aceito:

- GET.

Headers:

- `Content-Type: application/json; charset=utf-8`
- `Cache-Control: public, max-age=60, stale-while-revalidate=300`
- headers de seguranca via `send_security_headers(true)`.

Autenticacao:

- Nenhuma, pois entrega conteudo publico.

Tabelas consultadas:

- `settings`
- `plans` ativos
- `coverage` ativa
- `testimonials` ativos
- `banners` ativos

Contrato JSON real:

- `settings`
- `plans`
- `coverage`
- `testimonials`
- `banners`
- `generated_at`

Normalizacoes:

- `plans.id`, `display_order`: int.
- `plans.price`: float.
- `plans.featured`: bool.
- `plans.benefits`: JSON decodificado para array.
- `coverage.id`, `display_order`: int.
- `coverage.map_url`: string.

Comportamento em erro:

- HTTP 500 com `{"error":"Nao foi possivel carregar o conteudo do site."}` sem detalhes internos.

Lacunas:

- Nao entrega `benefits`, `technologies`, `faqs`, `support`, `cta`, `navigation`, `stats`, `historyGallery`, `differentials`, `mascotes`.
- Retorna `banners`, mas o frontend publico atual nao consome.
- Nao ha versionamento de contrato.
- Nao ha ETag.

## 9. Contrato frontend real

Arquivos:

- `src/content/types.ts`
- `src/lib/site-content.ts`
- `src/services/site-content-service.ts`
- `src/content/SiteContentProvider.tsx`

Fluxo:

`SiteContentProvider -> apiContentProvider -> api/site-content.php -> fallback local`

Fallback local cobre mais conteudo que a API. A API atual substitui apenas parte do conteudo:

- settings basicos;
- planos;
- cobertura;
- depoimentos.

Continuam locais/hardcoded:

- navegacao;
- diferenciais;
- beneficios;
- tecnologias;
- FAQs;
- stats;
- galeria historia;
- suporte;
- CTA textual;
- mascotes;
- developer links.

## 10. Lacunas principais

1. Painel nao administra as secoes publicas novas de suporte, FAQ e contato.
2. Painel nao administra beneficios e tecnologias, embora ja existam no frontend.
3. API nao entrega blocos que o frontend ja tipou.
4. Banco nao possui tabelas para os cinco modulos prioritarios.
5. Banners existem no banco/API/admin, mas nao aparecem no frontend publico.
6. Sem logs administrativos.
7. Sem permissoes por modulo.
8. Sem soft delete.
9. Sem contrato JSON versionado.
10. Sem testes automatizados especificos para admin/API.

## 11. Riscos consolidados

| Risco | Severidade | Impacto |
| --- | --- | --- |
| Expandir modulos sem logs e roles | Alto | Dificulta auditoria e aumenta impacto de erro humano |
| Criar tabelas sem contrato API/TS | Alto | Fallback silencioso ou quebra de conteudo publico |
| Migrar benefits/technologies sem preservar fallback | Alto | Perda de conteudo em falha de API |
| Manter exclusao fisica em conteudo importante | Medio | Perda acidental de dados |
| Crescer `settings` sem estrutura | Medio | Configuracoes dificeis de validar e manter |
| Banners sem consumo publico | Baixo | Modulo administrativo ocioso |
| Admin mobile com tabelas largas | Baixo | Usabilidade limitada em celular |

## 12. Conclusao

O painel atual e simples, funcional e adequado como base incremental. A seguranca basica e boa para o escopo atual: CSRF, sessao, hash de senha, rate limit e uploads validados existem. A evolucao para Painel 2.0 deve ser gradual, com foco inicial em contrato de dados, migrations pequenas, logs, e CRUDs simples para FAQs, beneficios e tecnologias.

Nao ha evidencia de que os novos blocos publicos estejam administraveis hoje. Eles existem como conteudo local no frontend e precisam de banco, painel, API, tipos TypeScript e fallback coordenados.
