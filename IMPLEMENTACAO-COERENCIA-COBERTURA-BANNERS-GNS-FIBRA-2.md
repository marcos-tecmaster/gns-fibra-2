# Implementação — coerência entre Painel, API e frontend — Cobertura e Banners

Data: 19/07/2026

## Problema original

O painel de Banners apresentava título, subtítulo e campos de botão como se alterassem o Hero. A API pública transportava esses campos e o TypeScript os normalizava, mas o componente consumia somente a imagem. Ao mesmo tempo, `coverage.description` percorria banco, painel, API e normalizador sem aparecer na seção pública.

## Decisão arquitetural

O Hero mantém uma única fonte oficial para cada responsabilidade:

- título: `settings.hero_title` → `config.company.heroTitle`;
- descrição: `settings.about_text` → `config.company.description`;
- imagem: primeira imagem válida da lista de Banners ativos, já ordenada por `display_order, id` na API;
- CTAs: comportamento fixo e atual do componente Hero.

O banco preserva `banners.title`, `subtitle`, `button_text` e `button_url` por compatibilidade. No painel, `title` e `subtitle` passam a ser identificação e observação internas. Os campos legados de botão não são editados nem apagados nesta fase.

## Contrato público final de Banners

A API entrega somente:

- `id`;
- `image_path` nullable;
- `display_order`.

O frontend normalizado mantém somente `id` e `image` opcional. `active` não é transportado porque a consulta pública já filtra `active = 1`. A ordem recebida é preservada, IDs inválidos são descartados e caminhos de imagem continuam protegidos por `normalizePublicAssetPath()`.

## Módulo Imagens do Hero

O antigo contexto visual “Banners” foi renomeado para “Imagens do Hero” na página, navegação e acesso rápido. O formulário apresenta:

- identificação interna obrigatória;
- observação interna opcional;
- imagem de fundo;
- ordem, com explicação de prioridade;
- status ativo.

Upload, preview, substituição, remoção isolada da imagem e exclusão do registro foram preservados. A remoção informa explicitamente que os metadados internos permanecem.

## Cobertura pública

Os chips foram substituídos por itens compactos adequados a nome e descrição. Cada item mostra ícone, região, descrição não vazia e indicador discreto de link externo. Com `mapUrl`, todo o item é um link seguro; sem URL, é um bloco não clicável.

A pesquisa considera região e descrição, ignora maiúsculas/minúsculas e diacríticos por normalização Unicode compatível com português do Brasil. Contador, ordenação, estado vazio e rolagem interna foram preservados.

## Banco

Nenhum dado, schema, seed ou migration foi alterado ou executado. As colunas legadas permanecem intactas.

## Arquivos de implementação

- `admin/banners.php`;
- `admin/dashboard.php`;
- `admin/includes/layout.php`;
- `api/site-content.php`;
- `src/components/site/Coverage.tsx`;
- `src/components/site/Hero.tsx`;
- `src/content/types.ts`;
- `src/services/site-content-service.ts`.

## Validações

Validações realizadas em 19/07/2026:

- PHP lint aprovado nos 28 arquivos PHP do projeto;
- `npm run typecheck` aprovado;
- `npm run build` aprovado com Vite 7.3.5 e 2.159 módulos transformados;
- `npm audit` executado sem correção automática: permaneceu 1 vulnerabilidade baixa no `esbuild`;
- `database/verify-database.php` aprovado em modo somente leitura no banco `gns-fibra-2`, com 13 tabelas, 36 settings e os quatro uploads oficiais conferidos;
- API confirmou um Banner público com somente `id`, `image_path` e `display_order`, além das quatro regiões com descrição e URL de mapa;
- painel autenticado conferido nas telas de criação e edição: cinco campos esperados, preview existente e ausência dos campos públicos legados de botão;
- frontend conferido com busca, contador, estado vazio, links externos seguros, alternância Dark/Light e ausência de overflow nas larguras 360, 390, 414, 430, 768 e 1280 px;
- a busca por região foi validada no navegador; a busca por descrição foi confirmada no contrato e no código após a API comprovar as descrições, pois a primeira inspeção visual ocorreu antes da geração do bundle atualizado;
- `git diff --check` aprovado e staging mantido vazio.
