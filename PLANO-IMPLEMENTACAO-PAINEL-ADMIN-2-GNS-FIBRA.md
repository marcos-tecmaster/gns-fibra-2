# PLANO IMPLEMENTACAO PAINEL ADMIN 2 - GNS FIBRA

Data: 16/07/2026
Status: planejamento com FAQ, Beneficios, Tecnologias, Suporte e CTA implementados localmente

## Avisos

- FAQ, Beneficios, Tecnologias, Suporte e CTA ja foram implementados localmente em fases separadas.
- As mensagens de commit sao sugestoes.

## Etapa 1 - Fundacao reutilizavel e migration de FAQs

Objetivo: preparar o primeiro modulo novo com menor risco.

Status em 16/07/2026: implementado localmente. Criada a migration `database/migration-2026-07-16-create-faqs.sql`, atualizados `schema.sql` e `seed.sql`, criado `admin/faqs.php`, adicionado FAQ ao menu/dashboard, API publica passou a entregar `faqs` e o normalizador TypeScript preserva fallback local.

Arquivos envolvidos:

- `database/migration-YYYY-MM-DD-faqs.sql`
- `admin/faq.php`
- `admin/includes/layout.php`
- possivel `admin/includes/validators.php`
- `api/site-content.php`
- `src/content/types.ts`
- `src/services/site-content-service.ts`
- `src/lib/site-content.ts`
- `src/components/site/FAQ.tsx`

Migration:

- criar tabela `faqs`;
- campos: id, question, answer, active, display_order, created_at, updated_at;
- indice `(active, display_order)`.

Seed:

- usar exatamente as 7 FAQs atualmente publicadas no fallback local.
- Nao inventar perguntas novas.

Testes:

- `php -l` nos PHP alterados;
- `npm run typecheck`;
- `npm run build`;
- GET API com e sem registros ativos;
- fallback React com API indisponivel.

Riscos:

- duplicidade entre fallback local e banco;
- FAQPage JSON-LD divergente se o normalizador falhar.

Rollback:

- remover item de menu FAQ;
- remover leitura de `faqs` da API;
- manter fallback local;
- tabela pode permanecer sem uso ate decisao posterior.

Criterio de aprovacao:

- FAQ administravel no painel;
- API entrega somente ativas ordenadas;
- frontend exibe dados do banco e cai para fallback quando API falha.

Commit sugerido:

`feat: add admin FAQ foundation`

## Etapa 2 - CRUD de FAQs + API + frontend

Objetivo: concluir fluxo completo de FAQs.

Status em 16/07/2026: implementado localmente junto com a Etapa 1, por ser o primeiro fluxo ponta a ponta do Painel Administrativo 2.0.

Arquivos:

- `admin/faq.php`
- `api/site-content.php`
- `src/services/site-content-service.ts`
- `src/components/site/FAQ.tsx`
- documentacao da etapa.

CRUD:

- criar, editar, ativar/desativar, ordenar, excluir com confirmacao.
- considerar exclusao fisica inicialmente por coerencia, mas documentar risco.

Validacoes:

- question obrigatoria, max 220;
- answer obrigatoria;
- display_order >= 0;
- CSRF em todos POSTs.

Impacto:

- API adiciona `faqs`.
- TypeScript ja possui `faqs`; normalizador passa a aceitar API.

Criterio de aprovacao:

- accordion inicia fechado;
- uma pergunta aberta por vez;
- JSON-LD usa mesmas FAQs visiveis.

Commit sugerido:

`feat: manage FAQs from admin`

## Etapa 3 - CRUD de beneficios + API + frontend

Objetivo: administrar a secao de beneficios sem alterar regras comerciais.

Status em 16/07/2026: implementado localmente. Criada a migration `database/migration-2026-07-16-create-benefits.sql`, atualizados `schema.sql` e `seed.sql`, criado `admin/beneficios.php`, adicionado Beneficios ao menu/dashboard, API publica passou a entregar `benefits` e o normalizador TypeScript preserva fallback local, `benefits: []` e a regra especial de `camera-seguranca`.

Arquivos:

- `database/migration-2026-07-16-create-benefits.sql`
- `admin/beneficios.php`
- `admin/includes/simple-crud.php`
- `admin/includes/layout.php`
- `admin/dashboard.php`
- `api/site-content.php`
- `src/services/site-content-service.ts`
- `src/lib/site-content.ts`
- `src/components/site/Benefits.tsx`

Tabela:

- id;
- slug;
- icon;
- title;
- description;
- cta_label;
- cta_href;
- active;
- display_order;
- created_at;
- updated_at.

Validacoes:

- slug unico, minusculo, numerico/hifen;
- icon por allowlist do `IconName`;
- title obrigatorio;
- description obrigatoria;
- CTA label/href em par;
- URL com protocolos seguros;
- display_order entre 0 e 10000.

Seed:

- usar apenas beneficios atualmente publicados:
  - Wi-Fi para conectar dispositivos;
  - atendimento proximo;
  - pagamento com praticidade;
  - seguranca quando aprovado pelo conteudo atual.

Riscos:

- publicar beneficios internos nao aprovados;
- CTA quebrado;
- icone invalido no frontend.

Rollback:

- frontend usa fallback local;
- remover bloco da API se necessario;
- manter tabela sem leitura.

Criterio de aprovacao:

- beneficios ativos aparecem em ordem;
- inativos nao aparecem;
- fallback preservado.
- `benefits: []` oculta a secao.
- `camera-seguranca` so aparece quando plano publico menciona camera.

Commit sugerido:

`feat: add admin benefits content`

## Etapa 4 - CRUD de tecnologias + API + frontend

Objetivo: administrar tecnologias publicadas.

Status em 16/07/2026: implementado localmente. Criada a migration `database/migration-2026-07-16-create-technologies.sql`, atualizados `schema.sql` e `seed.sql`, criado `admin/tecnologias.php`, adicionadas Tecnologias ao menu/dashboard, API publica passou a entregar `technologies` e o normalizador TypeScript preserva fallback local.

Arquivos:

- `database/migration-2026-07-16-create-technologies.sql`
- `admin/tecnologias.php`
- `admin/includes/layout.php`
- `admin/dashboard.php`
- `api/site-content.php`
- `src/services/site-content-service.ts`
- `src/components/site/Technologies.tsx`
- `database/schema.sql`
- `database/seed.sql`

Tabela:

- id;
- slug;
- icon;
- name;
- description;
- availability;
- active;
- display_order;
- created_at;
- updated_at.

Validacoes:

- slug obrigatorio, unico e no formato `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`;
- icon por allowlist;
- name obrigatorio;
- description obrigatoria;
- availability obrigatoria, max 140;
- display_order entre 0 e 10000;
- campos extras rejeitados.

Seed:

- fibra optica;
- Wi-Fi;
- rede monitorada;
- casa e empresa.

Riscos:

- publicar Wi-Fi 6, Wi-Fi 7 ou XGS-PON sem aprovacao;
- texto tecnico virar promessa comercial.

Rollback:

- fallback local preservado;
- API pode deixar de enviar `technologies`.

Criterio de aprovacao:

- quatro tecnologias atuais preservadas;
- ordenacao e ativo funcionam;
- `technologies: []` oculta a secao;
- fallback local funciona com API antiga ou indisponivel;
- mobile e temas preservados.

Commit sugerido:

`feat: add admin technologies content`

## Etapa 5 - Atendimento e CTA administraveis

Objetivo: permitir edicao segura de textos e canais de suporte/contato.

Status em 16/07/2026: implementado localmente. Criada a migration `database/migration-2026-07-16-add-support-cta-settings.sql`, atualizados `schema.sql` e `seed.sql`, agrupado o formulario `admin/configuracoes.php`, API publica passou a entregar as chaves `support_*` e `cta_*` dentro de `settings`, e o normalizador TypeScript criou os blocos `support` e `cta` com fallback local.

Opcao aplicada:

- usar `settings` para textos do CTA e mensagens de WhatsApp;
- manter canais principais em settings atuais;
- adiar `support_channels` ate haver necessidade operacional clara.

Arquivos:

- `admin/configuracoes.php`
- `api/site-content.php`
- `src/services/site-content-service.ts`
- `src/components/site/Support.tsx`
- `src/components/site/CTASection.tsx`

Settings aplicadas:

- `support_enabled`;
- `support_eyebrow`;
- `support_title`;
- `support_description`;
- `support_button_label`;
- `support_whatsapp_message`;
- `cta_enabled`;
- `cta_eyebrow`;
- `cta_title`;
- `cta_description`;
- `cta_button_label`;
- `cta_whatsapp_message`;

Validacoes:

- CSRF e rejeicao de campos extras;
- textos obrigatorios para blocos publicados;
- limite de tamanho;
- HTML/script rejeitado;
- booleanos normalizados para `0`/`1`;
- mensagens de WhatsApp sem dados sensiveis.

Riscos:

- excesso de settings;
- operadores alterarem copy comercial sem revisao.

Rollback:

- componentes mantem fallback local.

Criterio de aprovacao:

- textos atuais preservados como seed;
- painel edita sem quebrar CTA;
- API indisponivel usa fallback.

Commit sugerido:

`feat: add admin-managed support and CTA content`

## Etapa 6 - Revisao visual e responsiva do painel

Objetivo: melhorar UX do admin sem trocar stack.

Arquivos:

- `admin/assets/admin.css`
- `admin/includes/layout.php`
- modulos novos e antigos conforme necessidade.

Entregas:

- menu agrupado por Conteudo, Marketing, Sistema;
- estados vazios;
- melhor responsividade de tabelas;
- confirmacoes mais claras;
- mensagens de erro/sucesso padronizadas;
- prevencao de duplo submit.

Riscos:

- alterar visual antes dos CRUDs estarem estaveis;
- quebrar usabilidade desktop.

Rollback:

- revert visual isolado se necessario.

Criterio de aprovacao:

- desktop, tablet e mobile conferidos;
- nenhum overflow horizontal fora dos paineis;
- formularios praticos em 390 px.

Commit sugerido:

`feat: refine admin responsive experience`

## Etapa 7 - Hardening, logs e documentacao

Objetivo: preparar fases de marketing, leads, indicacoes e integracoes.

Arquivos:

- `database/migration-YYYY-MM-DD-admin-logs.sql`
- `admin/logs.php`
- `admin/includes/audit-log.php`
- `config/security.php`
- `config/auth.php`
- documentacao.

Entregas:

- logs administrativos sem senha/token;
- mascaramento de dados pessoais;
- melhoria de CSP;
- logout por POST;
- base de roles/permissoes;
- checklist de producao.

Riscos:

- logs armazenarem dados sensiveis se mal projetados;
- roles incompletas bloquearem admins.

Rollback:

- logs podem ser desativados por feature flag simples;
- preservar admin unico com acesso total ate roles estarem maduras.

Criterio de aprovacao:

- login/logout/CSRF/rate limit revalidados;
- logs registram CRUD sem payload sensivel;
- usuarios existentes continuam acessando.

Commit sugerido:

`feat: harden admin security and audit logs`

## Etapas posteriores

### Diferenciais

- Avaliar tabela propria ou manter local.
- Depende de estrategia comercial de copy.

### Historia e galeria

- Requer politica de imagens, uploads e alt text.
- Ideal apos hardening de uploads.

### Mascotes e banners

- Banners ja existem, mas nao sao consumidos.
- Mascotes exigem biblioteca de assets aprovados, sem upload livre em primeira fase.

### Campanhas

- Requer `campaigns`, periodo, status, CTA, regras e talvez landing pages.

### Indicacoes

- Requer regras aprovadas por Jeferson e LGPD.
- Nao iniciar sem politica de dados.

### Leads

- Requer origem, status, historico, exportacao e mascaramento.

### Integracoes

- Requer roles, logs e secrets fora do Git.

### Analytics e pixels

- Requer decisao de consentimento/cookies e campos seguros.

## Checklist futuro de testes

### Automatizaveis

- `php -l`;
- `npm run typecheck`;
- `npm run build`;
- GET API com JSON valido;
- normalizador com payload parcial;
- fallback quando API retorna erro;
- ordenacao e filtro ativo/inativo;
- caracteres acentuados.

### Manuais

- login;
- logout;
- primeira troca de senha;
- CRUD completo;
- confirmacao de exclusao;
- estado vazio;
- mobile do painel;
- Dark/Light publico;
- subdiretorio;
- producao.

### Seguranca

- CSRF ausente/invalido;
- rate limiting;
- XSS em campos de texto;
- SQL injection em id e campos;
- upload invalido quando houver upload;
- logs sem senha/hash/token;
- cookies HttpOnly/SameSite/Secure em HTTPS.

### Implantacao

- backup antes de migration;
- executar migration local;
- validar rollback manual;
- testar API em producao;
- limpar cache Cloudflare;
- testar aba anonima;
- performance e cache.
