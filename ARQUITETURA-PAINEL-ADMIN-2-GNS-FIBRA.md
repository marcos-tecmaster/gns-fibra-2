# ARQUITETURA PAINEL ADMIN 2 - GNS FIBRA

Data: 16/07/2026
Ambiente: local
Status: proposta, sem implementacao

## Avisos

- Nenhuma alteracao funcional foi feita nesta fase.
- Nenhuma migration foi criada ou executada.
- Nenhuma credencial foi registrada.
- Esta arquitetura ainda depende de aprovacao.

## 1. Objetivo

Evoluir o painel administrativo da GNS Fibra 2.0 sem reescrever a stack atual. A arquitetura recomendada preserva PHP simples, MySQL, API PHP e frontend React com fallback local.

## 2. Principios

- Nao adotar framework PHP novo.
- Nao adotar ORM novo.
- Nao criar painel SPA separado.
- Nao quebrar URLs existentes.
- Nao remover modulos atuais.
- Usar migrations pequenas, revisaveis e com rollback documentado.
- Manter fallback local no React.
- Manter compatibilidade com Hostinger, Apache e VM.
- Priorizar CSRF, prepared statements, validacao centralizada e logs.

## 3. Estado base real

Pastas atuais:

- `admin/`
- `admin/includes/`
- `admin/assets/`
- `api/`
- `config/`
- `database/`
- `uploads/`
- `src/content/`
- `src/lib/`
- `src/services/`

Base reutilizavel existente:

- `admin/includes/bootstrap.php`
- `admin/includes/layout.php`
- `admin/includes/simple-crud.php`
- `config/auth.php`
- `config/database.php`
- `config/security.php`
- `api/site-content.php`

## 4. Organizacao recomendada

Sem refatorar agora, a evolucao pode introduzir estruturas pequenas:

```text
admin/
  includes/
    bootstrap.php
    layout.php
    simple-crud.php
    form-helpers.php        (futuro)
    validators.php          (futuro)
    audit-log.php           (futuro)
  faq.php                   (futuro)
  beneficios.php            (futuro)
  tecnologias.php           (futuro)
  atendimento.php           (futuro)
  contato-cta.php           (futuro)
api/
  site-content.php
config/
  database.php
  database.local.php        (local, ignorado, nunca documentar credenciais)
  security.php
  auth.php
database/
  migration-YYYY-MM-DD-*.sql
```

Recomendacao: criar helpers somente quando o segundo ou terceiro modulo novo mostrar repeticao real. O `simple-crud.php` serve para CRUDs simples, mas FAQs, beneficios e tecnologias podem precisar de validacoes especificas.

## 5. Fluxo de conteudo proposto

```text
Admin PHP -> MySQL -> api/site-content.php -> React normalizer -> SiteContentProvider -> componentes
                                     \-> fallback local em src/lib/site-content.ts
```

Cada novo bloco deve ter:

- tabela ou settings documentados;
- CRUD no painel;
- filtro `active=1`;
- ordenacao por `sort_order` ou `display_order`;
- campos normalizados na API;
- tipos TypeScript;
- normalizador tolerante;
- fallback local preservado;
- testes manuais e automatizaveis.

## 6. Padroes de banco

Padrao atual:

- `id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY`
- `active TINYINT(1) NOT NULL DEFAULT 1`
- `display_order INT NOT NULL DEFAULT 0`
- `created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`
- `updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
- indice publico composto em `(active, display_order)`

Para os novos modulos, manter esse padrao para coerencia. Usar `sort_order` apenas se houver decisao de padronizacao nova; caso contrario, `display_order` reduz divergencia com o banco atual.

## 7. Modelo de dados preliminar

### `faqs`

Proposta coerente com o projeto:

```sql
id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
question VARCHAR(220) NOT NULL
answer TEXT NOT NULL
active TINYINT(1) NOT NULL DEFAULT 1
display_order INT NOT NULL DEFAULT 0
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
INDEX idx_faqs_public (active, display_order)
```

Observacoes:

- O pedido sugeriu `sort_order`; o banco atual usa `display_order`.
- Recomendo `display_order` para compatibilidade visual e mental com `plans`, `coverage`, `testimonials`, `banners`.
- Categoria pode ficar para etapa posterior.

### `benefits`

Proposta:

```sql
id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
icon VARCHAR(60) NOT NULL DEFAULT ''
title VARCHAR(160) NOT NULL
description TEXT NOT NULL
cta_label VARCHAR(120) NOT NULL DEFAULT ''
cta_href VARCHAR(1000) NOT NULL DEFAULT ''
active TINYINT(1) NOT NULL DEFAULT 1
display_order INT NOT NULL DEFAULT 0
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
INDEX idx_benefits_public (active, display_order)
```

Observacoes:

- `icon` deve usar allowlist compatível com `IconName`.
- `cta_href` deve validar URL absoluta ou anchor local aprovada.
- Nao publicar beneficios comerciais internos sem aprovacao.

### `technologies`

Proposta:

```sql
id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
icon VARCHAR(60) NOT NULL DEFAULT ''
name VARCHAR(140) NOT NULL
description TEXT NOT NULL
availability VARCHAR(160) NOT NULL DEFAULT ''
active TINYINT(1) NOT NULL DEFAULT 1
display_order INT NOT NULL DEFAULT 0
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
INDEX idx_technologies_public (active, display_order)
```

Observacoes:

- `availability` ja existe no tipo local.
- Termos como Wi-Fi 6, Wi-Fi 7 e XGS-PON exigem aprovacao tecnica/comercial antes de seed.

### `support_channels`

Duas opcoes:

1. Manter em `settings` por enquanto:
   - melhor para phone, whatsapp, email, customer portal;
   - menor migration;
   - suficiente se os canais continuarem fixos.

2. Criar tabela propria:
   - melhor se houver multiplos canais, horarios, regioes, labels e ordem;
   - mais flexivel para "contratar", "ja sou cliente", "central".

Recomendacao: iniciar com settings estruturadas somente se a necessidade for editar textos simples. Criar `support_channels` quando houver mais de tres canais administraveis ou regras por publico.

Modelo possivel se aprovado:

```sql
id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
label VARCHAR(120) NOT NULL
description VARCHAR(220) NOT NULL DEFAULT ''
type VARCHAR(40) NOT NULL
href VARCHAR(1000) NOT NULL
message TEXT NULL
active TINYINT(1) NOT NULL DEFAULT 1
display_order INT NOT NULL DEFAULT 0
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
INDEX idx_support_channels_public (active, display_order)
```

### `cta_content`

Opcoes:

1. Settings:
   - `cta_eyebrow`
   - `cta_title`
   - `cta_description`
   - `cta_primary_label`
   - `cta_primary_message`
   - `cta_secondary_label`

2. Tabela propria `cta_content`:
   - util se houver multiplos CTAs por campanha, pagina ou periodo.

Recomendacao: usar `settings` na fase prioritaria. Criar `campaigns` depois para CTAs sazonais.

## 8. API proposta

Manter `api/site-content.php` como endpoint unico no curto prazo.

Adicionar blocos somente quando as tabelas existirem:

```json
{
  "settings": {},
  "plans": [],
  "coverage": [],
  "testimonials": [],
  "banners": [],
  "benefits": [],
  "technologies": [],
  "faqs": [],
  "support": {},
  "cta": {},
  "generated_at": ""
}
```

Regras:

- GET apenas.
- Conteudo publico sem auth.
- `active = 1`.
- Ordenar por `display_order, id`.
- Normalizar tipos antes de JSON.
- Em erro, manter resposta generica.
- Nao remover campos existentes.
- Se um bloco novo falhar isoladamente, avaliar se a API inteira deve falhar ou retornar fallback parcial. Para simplicidade atual, preferir falha total com fallback React.

## 9. TypeScript e fallback

Para cada bloco novo:

1. Atualizar `src/content/types.ts`.
2. Atualizar `src/services/site-content-service.ts` com tipos de API e normalizacao.
3. Preservar `src/lib/site-content.ts` como fallback.
4. Componentes devem filtrar `active`.
5. Nao remover dados locais ate a API estar validada.

## 10. Painel UX futuro

Organizacao candidata:

### Conteudo do site

- Visao geral
- Planos
- Beneficios
- Tecnologias
- Cobertura
- Historia
- Depoimentos
- FAQ
- Atendimento
- Banners e mascotes

### Marketing

- Campanhas
- Indicacoes
- Leads
- Analytics

### Sistema

- Configuracoes
- Integracoes
- Usuarios
- Logs

Transicao recomendada:

- Manter URLs atuais.
- Adicionar novos itens no menu sem renomear os existentes no primeiro momento.
- Agrupar visualmente o menu apenas em etapa de revisao visual.
- Criar redirects somente se alguma URL antiga mudar, o que nao e recomendado agora.

## 11. Seguranca arquitetural

Antes ou durante os modulos prioritarios:

- Manter CSRF em todos os POSTs.
- Validar metodo HTTP explicitamente.
- Usar prepared statements para valores.
- Usar allowlists para `icon`, `type`, `href` quando aplicavel.
- Escapar toda saida HTML com `h()`.
- Manter uploads fora dos modulos prioritarios, exceto se estritamente necessario.
- Adicionar logs administrativos antes de modulos de leads/integracoes.
- Planejar roles antes de IXC/leads/referrals.

## 12. Rollback conceitual

Para cada migration:

- Criar tabela nova sem alterar dados existentes.
- Seed apenas com conteudo atualmente publicado.
- API deve tolerar tabela ausente ate a etapa aprovada.
- Frontend deve manter fallback local.
- Rollback manual: remover item de menu, remover leitura API do bloco novo e, se aprovado, dropar tabela nova somente apos backup. Nao automatizar DROP em producao.

## 13. Recomendacao final

Arquitetura recomendada para o Painel 2.0:

1. Consolidar fundacao administrativa sem redesenho amplo.
2. Criar `faqs` primeiro, por ser modulo isolado e ja publicado localmente.
3. Depois `benefits` e `technologies`, preservando conteudo atual.
4. Manter suporte e CTA inicialmente em settings, a menos que a operacao confirme necessidade de varios canais administraveis.
5. Adiar campanhas, indicacoes, leads, integracoes e analytics ate roles/logs estarem definidos.
