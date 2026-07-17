# IMPLEMENTACAO ESTATISTICAS E DIFERENCIAIS ADMINISTRAVEIS - GNS FIBRA 2.0

Data: 17/07/2026
Fase: Estatisticas e Diferenciais administraveis de ponta a ponta
Status: implementado localmente, sem staging, commit ou push

## 1. Escopo

Esta fase torna administraveis os blocos publicos:

- Estatisticas;
- Diferenciais.

Fluxo implementado:

`Banco MySQL -> CRUD PHP -> API publica -> normalizacao TypeScript -> SiteContentProvider -> componentes React existentes -> fallback local`

Nao foram implementados Historia, Galeria, Planos, Suporte, CTA, FAQ, Beneficios, Tecnologias, Roles, Logs, Campanhas, Leads, IXC, Analytics ou novas alegacoes comerciais.

## 2. Conteudo inicial auditado

Fonte: `src/lib/site-content.ts`.

Estatisticas atuais preservadas exatamente:

| Ordem | Slug | Valor | Rotulo |
| ---: | --- | --- | --- |
| 10 | `anos-de-mercado` | `14+` | `Anos de mercado` |
| 20 | `rede-fibra-optica` | `100%` | `Rede em fibra óptica` |
| 30 | `rede-monitorada` | `24/H` | `Rede monitorada` |
| 40 | `atendimento-proximo` | `Humanizado` | `Atendimento próximo` |

Observacao: `14+` se relaciona ao `years_in_market = 14`, mas permanece como texto independente para preservar o fallback atual. `100%` e `24/H` foram mantidos porque ja estavam literalmente publicados no conteudo local; devem ser confirmados com responsavel da GNS antes de campanhas comerciais.

Diferenciais atuais preservados exatamente:

| Ordem | Slug | Icone | Titulo |
| ---: | --- | --- | --- |
| 10 | `fibra-ponta-a-ponta` | `wifi` | `Fibra de ponta a ponta` |
| 20 | `alta-performance` | `zap` | `Alta performance` |
| 30 | `suporte-humanizado` | `headset` | `Suporte humanizado` |
| 40 | `rede-confiavel` | `shield` | `Rede confiável` |
| 50 | `casa-empresa` | `home` | `Casa e empresa` |

## 3. Migration e tabelas

Migration criada:

- `database/migration-2026-07-17-create-stats-differentials.sql`

Foi usada uma migration unica porque as duas tabelas pertencem a mesma fase, sao colecoes publicas paralelas e precisam ser implantadas juntas para manter o contrato da API coerente.

Tabela `stats`:

- `id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY`
- `slug VARCHAR(100) NOT NULL`
- `value VARCHAR(60) NOT NULL`
- `label VARCHAR(140) NOT NULL`
- `active TINYINT(1) NOT NULL DEFAULT 1`
- `display_order INT NOT NULL DEFAULT 0`
- timestamps padrao.

Indices:

- `uq_stats_slug`
- `idx_stats_active_order (active, display_order, id)`

Tabela `differentials`:

- `id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY`
- `slug VARCHAR(100) NOT NULL`
- `icon VARCHAR(50) NOT NULL`
- `title VARCHAR(180) NOT NULL`
- `description TEXT NOT NULL`
- `active TINYINT(1) NOT NULL DEFAULT 1`
- `display_order INT NOT NULL DEFAULT 0`
- timestamps padrao.

Indices:

- `uq_differentials_slug`
- `idx_differentials_active_order (active, display_order, id)`

A migration usa `CREATE TABLE IF NOT EXISTS`, nao usa `DROP`, `TRUNCATE`, `DELETE`, `REPLACE` ou alteracao destrutiva. O seed roda somente quando a tabela correspondente esta vazia.

Tambem foram atualizados:

- `database/schema.sql`;
- `database/seed.sql`.

## 4. Execucao local da migration

Antes:

- `SHOW TABLES LIKE 'stats'`: vazio;
- `SHOW TABLES LIKE 'differentials'`: vazio.

Primeira execucao:

- criou `stats` com 4 registros;
- criou `differentials` com 5 registros;
- todos ativos;
- ordens 10, 20, 30, 40 e 50 conforme aplicavel.

Segunda execucao:

- `stats` permaneceu com 4 registros;
- `differentials` permaneceu com 5 registros;
- nenhuma duplicacao foi criada;
- slugs, ordem e status permaneceram iguais.

## 5. CRUD administrativo

Arquivos criados:

- `admin/estatisticas.php`;
- `admin/diferenciais.php`.

Ambos usam `run_simple_crud()`, autenticacao obrigatoria, CSRF, POST para alteracoes, prepared statements, exclusao fisica coerente com o painel atual, estado vazio configurado e rejeicao de campos extras.

Estatisticas:

- slug obrigatorio, lowercase, unico, maximo 100, regex `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`;
- valor obrigatorio, texto puro, maximo 60;
- rotulo obrigatorio, texto puro, maximo 140;
- ordem entre 0 e 10000;
- ativa 0/1.

Diferenciais:

- slug obrigatorio, lowercase, unico, maximo 100, regex de slug;
- icone por select com whitelist;
- titulo obrigatorio, texto puro, maximo 180;
- descricao obrigatoria, texto puro, maximo 2000;
- ordem entre 0 e 10000;
- ativo 0/1.

Whitelist de icones:

- `wifi`;
- `zap`;
- `headset`;
- `shield`;
- `home`.

O backend rejeita icone fora da whitelist. O frontend usa fallback seguro `wifi` para qualquer valor inesperado vindo da API.

## 6. Menu e dashboard

Arquivos atualizados:

- `admin/includes/layout.php`;
- `admin/dashboard.php`.

Menu:

- `estatisticas.php => Estatísticas`;
- `diferenciais.php => Diferenciais`.

Dashboard:

- contador `Estatísticas ativas / total`;
- contador `Diferenciais ativos / total`;
- atalhos para criar nova estatistica e novo diferencial.

## 7. API publica

Arquivo atualizado:

- `api/site-content.php`.

Novos blocos:

```json
"stats": [
  {
    "id": 1,
    "slug": "anos-de-mercado",
    "value": "14+",
    "label": "Anos de mercado",
    "active": true,
    "display_order": 10
  }
],
"differentials": [
  {
    "id": 1,
    "slug": "fibra-ponta-a-ponta",
    "icon": "wifi",
    "title": "Fibra de ponta a ponta",
    "description": "Mais velocidade e estabilidade para todos os seus dispositivos.",
    "active": true,
    "display_order": 10
  }
]
```

Preservado:

- `settings`;
- `plans`;
- `coverage`;
- `testimonials`;
- `banners`;
- `benefits`;
- `technologies`;
- `faqs`;
- `generated_at`;
- metodo GET;
- POST com HTTP 405 e `Allow: GET`;
- erro generico sem stack trace.

## 8. TypeScript, normalizacao e fallback

Arquivos atualizados:

- `src/content/types.ts`;
- `src/lib/site-content.ts`;
- `src/services/site-content-service.ts`.

Tipos adicionados internamente:

- `ApiStat`;
- `ApiDifferential`.

Normalizadores:

- `normalizeStats()`;
- `normalizeDifferentials()`.

Regras:

- campo ausente usa fallback local;
- API indisponivel usa fallback local;
- `stats: []` oculta a secao Estatisticas;
- `differentials: []` oculta a secao Diferenciais;
- `slug` vira `id` logico no frontend;
- valor de estatistica permanece string;
- ordem recebida da API e preservada;
- registros sem slug, valor/rotulo ou titulo/descricao sao ignorados individualmente;
- icone desconhecido usa fallback `wifi`.

O fallback local foi preservado com os mesmos textos e valores, apenas recebendo `id` e `active` para suportar chave estavel e filtro.

## 9. Componentes publicos

Arquivos atualizados:

- `src/components/site/Stats.tsx`;
- `src/components/site/Differentials.tsx`.

Stats:

- filtra itens ativos;
- retorna `null` quando vazio;
- usa `key={id}`;
- usa grid responsivo por `auto-fit`;
- nao interpreta `value` numericamente.

Diferenciais:

- filtra itens ativos;
- retorna `null` quando vazio;
- usa `key={id}`;
- usa fallback de icone seguro;
- usa grid responsivo por `auto-fit`;
- preserva titulo, cards, animacoes, Dark/Light e responsividade.

## 10. Seguranca

Confirmado no desenho:

- autenticacao obrigatoria no painel;
- CSRF em salvar e excluir;
- alteracoes por POST;
- prepared statements;
- escape com `h()`;
- `strip_tags` nos textos;
- limites de tamanho;
- slug unico;
- ids inteiros;
- rejeicao de campos extras;
- whitelist de icones;
- sem HTML e sem `dangerouslySetInnerHTML`;
- API sem detalhes internos.

Fora desta fase:

- roles;
- logs administrativos;
- CAPTCHA;
- soft delete;
- hardening geral.

## 11. Implantacao e rollback

Implantacao recomendada:

1. Fazer backup do banco.
2. Publicar codigo do painel/API/frontend.
3. Executar `database/migration-2026-07-17-create-stats-differentials.sql`.
4. Conferir registros e indices.
5. Executar a migration novamente para confirmar idempotencia.
6. Validar API publica.
7. Validar painel.
8. Rodar build do frontend.
9. Limpar cache.
10. Validar visualmente mobile/desktop e Dark/Light.
11. Confirmar os numeros comerciais com responsavel da GNS.

Rollback:

- restaurar codigo anterior se necessario;
- manter tabelas sem uso;
- nao apagar dados automaticamente;
- avaliar `DROP TABLE stats` e `DROP TABLE differentials` somente manualmente, apos backup e aprovacao.

## 12. Pendencias

- Revisao humana dos numeros `100%` e `24/H` antes de uso em campanhas.
- Testes manuais completos de CRUD autenticado em navegador.
- Validacao visual final em dispositivos reais.
- Logs administrativos, roles e soft delete continuam pendencias futuras.
