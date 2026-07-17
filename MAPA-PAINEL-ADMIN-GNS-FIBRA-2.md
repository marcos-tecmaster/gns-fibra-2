# MAPA DO PAINEL ADMIN - GNS FIBRA 2.0

Data: 13/07/2026  
Atualizado em: 16/07/2026
Status: mapa vivo do painel administrativo

## 1. Estado atual

O painel administrativo atual e PHP/MySQL, separado do React publico.

Pastas principais:

- `admin/`
- `admin/includes/`
- `admin/assets/admin.css`
- `api/site-content.php`
- `config/`
- `database/`
- `uploads/`

## 2. Modulos atuais

| Modulo | Arquivo | Tabela principal | Observacao |
| --- | --- | --- | --- |
| Login | `admin/login.php` | `users`, `login_attempts` | Autenticacao com rate limit |
| Logout | `admin/logout.php` | sessao | Encerra sessao |
| Dashboard | `admin/dashboard.php` | `plans`, `stats`, `differentials`, `coverage`, `testimonials`, `benefits`, `technologies`, `faqs` | Indicadores simples |
| Planos | `admin/planos.php` | `plans` | CRUD especifico com beneficios JSON |
| Estatisticas | `admin/estatisticas.php` | `stats` | CRUD generico com slug, valor textual, rotulo, ativo e ordenacao |
| Diferenciais | `admin/diferenciais.php` | `differentials` | CRUD generico com slug, icone em whitelist, titulo, descricao, ativo e ordenacao |
| Beneficios | `admin/beneficios.php` | `benefits` | CRUD generico com slug, icone em whitelist, CTA seguro e ordenacao |
| Tecnologias | `admin/tecnologias.php` | `technologies` | CRUD generico com slug, icone em whitelist, disponibilidade e ordenacao |
| Banners | `admin/banners.php` | `banners` | CRUD generico com upload |
| Cobertura | `admin/cobertura.php` | `coverage` | CRUD generico com Google Maps |
| Depoimentos | `admin/depoimentos.php` | `testimonials` | CRUD generico |
| FAQ | `admin/faqs.php` | `faqs` | CRUD generico com perguntas ativas e ordenacao |
| Configuracoes | `admin/configuracoes.php` | `settings` | Dados institucionais, links, hero, Suporte e CTA final |
| Usuarios | `admin/usuarios.php` | `users` | CRUD de admins |
| Troca de senha | `admin/trocar-senha.php` | `users` | Exige senha forte |

## 3. Infraestrutura atual

Includes:

- `admin/includes/bootstrap.php`: carrega banco, seguranca e auth.
- `admin/includes/layout.php`: layout base do admin.
- `admin/includes/simple-crud.php`: CRUD generico para banners, cobertura e depoimentos.

Configuracao:

- `config/database.php`: usa variaveis `GNS_DB_*` ou `config/database.local.php`.
- `config/security.php`: headers de seguranca.
- `config/auth.php`: sessao, CSRF, login, rate limit, upload e helpers.

API:

- `api/site-content.php`: publica conteudo para o React.

## 4. Tabelas atuais

- `users`
- `login_attempts`
- `settings`
- `plans`
- `stats`
- `differentials`
- `coverage`
- `testimonials`
- `banners`
- `benefits`
- `technologies`
- `faqs`

Campos criticos:

- `plans.benefits` e JSON.
- `stats.slug` e unico; `stats.value` e texto para preservar valores como `14+`, `100%`, `24/H` e textos.
- `differentials.slug` e unico; `differentials.icon` usa whitelist do painel e fallback visual seguro no frontend.
- `benefits.slug` e unico; `camera-seguranca` possui regra especial no site.
- `technologies.slug` e unico; icone usa whitelist do modulo publico.
- `benefits.icon` usa whitelist do painel e fallback visual no frontend.
- `benefits.cta_href` aceita apenas protocolos seguros.
- `coverage.map_url` alimenta links clicaveis.
- `settings` usa chave/valor; `support_*` e `cta_*` controlam textos principais e visibilidade de Suporte/CTA final.
- `users.password_hash` nunca deve expor senha.
- `login_attempts` suporta rate limit.

## 5. Pontos fortes atuais

- CSRF nos formularios.
- Sessao com configuracao de cookie.
- Timeout de sessao.
- `password_hash`/`password_verify`.
- Troca obrigatoria de senha inicial.
- Validacao de senha forte.
- Rate limit de login.
- Upload com validacao MIME e limite de 5 MB.
- Headers de seguranca.
- Layout admin responsivo.
- Botao sair visivel em mobile.

## 6. Debitos e riscos

Seguranca:

- Sem perfis/permissoes por modulo.
- Sem trilha de auditoria.
- Sem CAPTCHA para login ou formularios futuros.
- CSP do PHP permite `unsafe-inline`.
- Uploads precisam de bloqueio de execucao PHP em producao.
- Logs futuros precisam mascarar dados pessoais.

UX/Admin:

- Tabelas usam rolagem horizontal em mobile.
- CRUD generico e eficiente, mas limitado para modulos complexos.
- Sem busca, filtros ou paginacao.
- Sem confirmacao avancada para exclusoes.
- Sem preview real de como conteudo aparece no site.

Arquitetura:

- Frontend e API tem contrato implicito, nao versionado.
- API retorna banners, mas o frontend Premium/Dark nao usa.
- Configuracoes chave/valor podem crescer demais, embora o formulario ja esteja agrupado por contexto.

## 7. Modulos futuros recomendados

| Prioridade | Modulo | Objetivo | Banco novo provavel |
| --- | --- | --- | --- |
| Concluido localmente | Beneficios | Separar beneficios dos planos | `benefits` |
| Concluido localmente | Tecnologias | Gerenciar tecnologias publicadas sem promessas futuras | `technologies` |
| Concluido localmente | FAQ | Perguntas frequentes e schema futuro | `faqs` |
| Concluido localmente | Suporte e CTA final | Gerenciar textos principais sem criar novas tabelas | `settings` |
| Concluido localmente | Estatisticas | Gerenciar numeros e rotulos publicados com cautela comercial | `stats` |
| Concluido localmente | Diferenciais | Gerenciar cards de diferenciais publicados | `differentials` |
| Alta | Campanhas | Sazonais e comerciais | `campaigns` |
| Alta | Indicacoes | Indique e Ganhe | `referrals` |
| Media | Leads | Formularios de interesse | `leads` |
| Media | Avaliacoes | Google/depoimentos/cases | `reviews` ou extensao de `testimonials` |
| Media | Integracoes | Configurar provedores externos | `integrations` |
| Media | Logs IXC | Auditoria de chamadas | `ixc_logs` |
| Media | Pixels/Analytics | GTM, GA4, Meta Pixel | `tracking_settings` |
| Baixa | Mascote e banners | Biblioteca de assets aprovados | `brand_assets` |
| Baixa | Landing pages | Campanhas regionais | `landing_pages` |

## 8. Evolucao de banco necessaria

Nao executar nesta fase.

Migrations futuras devem:

- ser versionadas em `database/migration-YYYY-MM-DD-*.sql`;
- ser idempotentes quando possivel;
- nao apagar dados;
- documentar rollback manual quando necessario;
- rodar primeiro em ambiente local/homologacao;
- exigir backup antes de producao.

Sugestoes conceituais:

- `benefits`: implementada com slug, titulo, descricao, icone em whitelist, CTA opcional, ativo e ordem.
- `technologies`: implementada com slug, nome, descricao, disponibilidade, icone em whitelist, ativo e ordem.
- `faqs`: implementada com pergunta, resposta, ativo e ordem.
- `settings`: implementada para Suporte e CTA final com `support_*`, `cta_*`, validacao condicional e fallback local.
- `stats`: implementada com slug, valor textual, rotulo, ativo e ordem.
- `differentials`: implementada com slug, icone em whitelist, titulo, descricao, ativo e ordem.
- `campaigns`: nome, slug, periodo, status, headline, termos, CTA, imagem.
- `referrals`: dados do indicador, dados do indicado, consentimento, status, origem, timestamps.
- `leads`: origem, nome, telefone, cidade, bairro, plano, status.
- `integration_logs`: provider, request_id, status, erro mascarado, timestamps.

## 9. Ordem recomendada para o Admin 2.0

1. Documentar contrato atual da API.
2. Criar padrao de migration.
3. Melhorar protecoes de producao para `config/`, `database/` e `uploads/`.
4. Revisar Beneficios administraveis implementados localmente.
5. Revisar Tecnologias administraveis implementadas localmente.
6. Revisar FAQ administravel ja implementado localmente.
7. Revisar Suporte e CTA final administraveis implementados localmente.
8. Revisar Estatisticas e Diferenciais administraveis implementados localmente.
9. Expandir API para entregar novos blocos quando houver necessidade real.
10. Atualizar frontend para consumir novos blocos com fallback.
11. Adicionar Campanhas.
12. Adicionar Leads e Indicacoes.
13. Adicionar logs e integracoes.
14. Integrar IXC somente apos homologacao.

## 10. Integracao futura IXC

Arquitetura obrigatoria:

`React -> API PHP propria -> API REST IXC`

Regras:

- Token nunca no frontend.
- Token fora do Git.
- Configuracao por variavel de ambiente ou arquivo local protegido.
- Endpoint proprio no backend.
- Timeout e tratamento de erro.
- Logs sem token, CPF completo ou payload sensivel.
- Rate limit.
- CAPTCHA quando houver formulario publico.
- Validacao de duplicidade.
- Homologacao antes de producao.

Dados que precisam ser solicitados antes:

- URL base da API IXC.
- Token exclusivo.
- Usuario tecnico.
- Permissoes minimas.
- Ambiente de teste.
- Endpoint correto.
- Metodo HTTP.
- Headers.
- Payload JSON.
- Campos obrigatorios.
- Exemplos de sucesso e erro.
- Contato tecnico.

Nao inventar endpoints, credenciais ou payloads.

## 11. Indique e Ganhe

Formulario futuro:

Dados de quem indica:

- nome;
- CPF ou codigo do cliente;
- telefone;
- contrato/login;
- e-mail opcional.

Dados da pessoa indicada:

- nome;
- telefone;
- cidade;
- bairro;
- CEP;
- endereco;
- plano de interesse.

Regras pendentes:

- quando o beneficio e concedido;
- se depende de instalacao;
- se depende de pagamento da primeira mensalidade;
- limite de indicacoes;
- acumulacao;
- duplicidade;
- validade da campanha;
- elegibilidade;
- contrato que recebe desconto.

LGPD:

- finalidade clara;
- coleta minima;
- consentimento/ciencia;
- link para politica de privacidade;
- registro de aceite;
- protecao dos dados;
- logs mascarados.

## 12. Arquivos provaveis por fase de admin

Beneficios:

- `admin/beneficios.php`
- `api/site-content.php`
- `src/content/types.ts`
- `src/services/site-content-service.ts`
- `database/migration-*.sql`

Tecnologias:

- `admin/tecnologias.php`
- `api/site-content.php`
- `src/components/site/Technologies.tsx`
- `database/migration-*.sql`

FAQ:

- `admin/faqs.php`
- `api/site-content.php`
- `src/components/site/FAQ.tsx`
- `index.html` ou geracao de schema futuro
- `database/migration-*.sql`

Suporte e CTA final:

- `admin/configuracoes.php`
- `api/site-content.php`
- `src/components/site/Support.tsx`
- `src/components/site/CTASection.tsx`
- `src/services/site-content-service.ts`
- `database/migration-*.sql`

Campanhas:

- `admin/campanhas.php`
- `src/components/site/Campaigns.tsx`
- possiveis landing pages
- `database/migration-*.sql`

Indicacoes:

- `admin/indicacoes.php`
- novo endpoint `api/referrals.php` ou equivalente
- tabela `referrals`
- protecoes LGPD

IXC:

- endpoint backend dedicado;
- configuracao local protegida;
- logs administrativos;
- documentacao de homologacao.

## 13. Recomendacoes de seguranca antes do painel 2.0

- Confirmar bloqueio web para `config/` e `database/`.
- Bloquear execucao de PHP em `uploads/`.
- Evitar scripts temporarios em producao.
- Adicionar log de auditoria antes de modulos sensiveis.
- Criar perfil/permissao antes de permitir acesso amplo a integracoes.
- Mascarar dados pessoais em listagens e logs.
- Validar backup e restore antes de migrations.

## 14. Conclusao

O painel atual e uma boa base para a GNS Fibra 2.0. Ele ja cobre conteudo essencial, seguranca basica adequada e fluxo administrativo funcional.

A evolucao deve ser incremental. O primeiro passo nao deve ser IXC nem Indicacoes; deve ser consolidar contrato de API, migrations e modulos simples como Beneficios, Tecnologias, FAQ, Suporte e CTA. Depois disso, Campanhas, Leads, Indicacoes e IXC podem ser implementados com menor risco.

## 15. Atualizacao da fase Planos, Beneficios e Tecnologias

Data: 14/07/2026
Status: somente frontend e documentacao; sem alteracao de painel, API, banco ou migration

### Campos atuais de planos

| Campo | Banco | API | Frontend |
| --- | --- | --- | --- |
| Nome | `plans.name` | `name` | `plan.name` |
| Velocidade | `plans.speed` | `speed` | `plan.speed` |
| Unidade | `plans.unit` | `unit` | `plan.unit` |
| Preco | `plans.price` | `price` | `plan.price` formatado |
| Descricao curta | `plans.audience` | `audience` | `plan.audience` |
| Beneficios | `plans.benefits` | `benefits` | `plan.features` |
| Forma de pagamento | `plans.payment_method` | `payment_method` | incorporado em `features` quando necessario |
| Destaque | `plans.featured` | `featured` | `plan.highlight` |
| Status | `plans.active` | filtrado na API | somente ativos |
| Ordem | `plans.display_order` | ordem da query | ordem renderizada |

### Campos novos recomendados para planos

Nao criar migration nesta fase.

- `wifi_technology`: texto curto como Wi-Fi 5, Wi-Fi 6 ou Wi-Fi 7, quando confirmado.
- `subtitle`: subtitulo comercial editavel.
- `main_benefit`: beneficio principal para card.
- `badge`: selo editavel, independente de `featured`.
- `quote_only`: plano somente sob consulta.
- `category`: residencial, empresarial, combo, campanha ou outro.
- `tier`: ordenacao semantica como essential, performance, advanced.
- `display_order`: ja existe e deve ser mantido.
- `featured`: ja existe e deve ser mantido.
- `active`: ja existe e deve ser mantido.

### Modulo futuro de beneficios

Tabela sugerida: `benefits`.

Campos:

- `id`;
- `slug`;
- `title`;
- `description`;
- `icon`;
- `cta_label`;
- `cta_href`;
- `active`;
- `display_order`;
- `created_at`;
- `updated_at`.

Endpoint atual:

- `api/site-content.php` retorna `benefits` ativos ordenados por `display_order, id`.

Fallback:

- se a API nao enviar `benefits`, o frontend usa `src/lib/site-content.ts`.
- se a API enviar `benefits: []`, a secao e ocultada.
- beneficios inativos nao devem aparecer.
- `camera-seguranca` so aparece quando algum plano publico menciona camera.

### Modulo implementado de tecnologias

Status em 16/07/2026: implementado localmente.

Tabela: `technologies`.

Campos:

- `id`;
- `slug`;
- `name`;
- `description`;
- `icon`;
- `availability`;
- `active`;
- `display_order`;
- `created_at`;
- `updated_at`.

Endpoint atual:

- `api/site-content.php` retorna `technologies` ativos ordenados por `display_order, id`.

Fallback:

- se a API nao enviar `technologies`, o frontend usa `src/lib/site-content.ts`.
- se a API enviar `technologies: []`, a secao e ocultada.
- tecnologias inativas nao devem aparecer.

### Riscos

- A tela publica agora consegue exibir beneficios e tecnologias; ambos ja sao administraveis localmente.
- O frontend infere beneficio principal e Wi-Fi a partir de `plans.benefits`; isso deve ser substituido por campos proprios em fase de banco.
- Publicar Wi-Fi 6, Wi-Fi 7, XGS-PON, GNS TV Plus, streaming, Mesh ou telefone fixo exige confirmacao comercial e tecnica.
- `quote_only` deve ser campo semantico futuro; hoje o frontend apenas tolera preco vazio ou zero.
