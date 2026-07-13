# Relatório - Links de mapa na cobertura

## Objetivo

Adicionar links clicáveis aos pontos de atendimento/cobertura e permitir edição do link de cada região no painel administrativo.

## Alterações realizadas

- Confirmado que `database/schema.sql` já possui o campo `coverage.map_url`.
- Confirmado que `database/seed.sql` já preenche Alvorada/Viamão, Canoas/Cachoeirinha, Bagé e Igrejinha com o mapa geral temporário.
- Criada a migração segura `database/migration-2026-06-17-coverage-map-url.sql`.
- Atualizado `admin/cobertura.php` para exibir o campo `Link do Google Maps` no formulário e na listagem.
- Mantida a validação de URL pelo CRUD administrativo (`type: url`).
- Atualizado `api/site-content.php` para normalizar `id`, `display_order` e `map_url` em cada item de cobertura.
- Atualizado o contrato TypeScript para tratar cobertura como objeto com `region`, `description` e `mapUrl`.
- Atualizado o fallback local em `src/lib/site-content.ts` com os links temporários.
- Atualizado `src/services/site-content-service.ts` para normalizar `map_url` ou `link_mapa`.
- Atualizado `Coverage` para renderizar cada região como `<a>` quando houver link.
- Atualizado `Footer` para renderizar cada ponto de atendimento como `<a>` quando houver link.
- Aplicado `target="_blank"` e `rel="noopener noreferrer"` nos links.
- Mantido o visual dos chips/badges, com `cursor-pointer` e hover discreto.

## Migração

Arquivo criado:

```sql
database/migration-2026-06-17-coverage-map-url.sql
```

A migração:

- adiciona `map_url` somente se a coluna ainda não existir;
- preenche temporariamente os quatro pontos principais com o mapa geral quando o link estiver vazio.

## Link temporário aplicado

```text
https://www.google.com/maps/d/viewer?mid=1L4SkzBboOM7GZyEKCoVC-qvy9J7QU1g&ll=-29.579942443027925%2C-50.71552340517935&z=13
```

## Validação executada

```bash
npm run typecheck
npm run build
php -l admin/cobertura.php
php -l api/site-content.php
```

Resultado:

- `npm run typecheck`: sem erros.
- `npm run build`: sem erros.
- `php -l admin/cobertura.php`: sem erros de sintaxe.
- `php -l api/site-content.php`: sem erros de sintaxe.
- Vite respondeu em `http://127.0.0.1:5173` durante o teste.

## Limitações do ambiente

- Não foi possível validar a API PHP por HTTP porque `localhost:80` recusou conexão no momento do teste.
- O navegador integrado do Codex não estava disponível nesta sessão, então a validação visual foi feita por revisão de código e build.

## Arquivos alterados

- `admin/cobertura.php`
- `api/site-content.php`
- `database/migration-2026-06-17-coverage-map-url.sql`
- `src/content/types.ts`
- `src/lib/site-content.ts`
- `src/services/site-content-service.ts`
- `src/components/site/Coverage.tsx`
- `src/components/site/Footer.tsx`
