# Implementação — Imagens de fundo administráveis — GNS Fibra 2.0

Data: 18/07/2026
Status: implementado localmente, sem staging, commit ou push

## Causa

O painel gravava `banners.image_path`, mas o frontend não tipava nem normalizava `banners`. `Hero.tsx`, `Coverage.tsx` e `CTASection.tsx` usavam exclusivamente `hero-fiber.jpg`, `datacenter.jpg` e `fiber-bundle.jpg`. Portanto, trocar arquivos no painel não alterava o site.

## Arquitetura final

- Hero: primeiro banner ativo, em `display_order, id`, que possua imagem pública válida.
- Cobertura: `settings.coverage_image_path`.
- CTA final: `settings.cta_background_image_path`.
- Uploads relativos: `uploads/banners/`, `uploads/coverage/` e `uploads/cta/`.
- Fallbacks empacotados: `hero-fiber.jpg`, `datacenter.jpg` e `fiber-bundle.jpg`.

Não foi criada tabela, JSON, caminho absoluto nem dependência de `dist/`. A migration `database/migration-2026-07-18-add-section-background-settings.sql` insere somente chaves ausentes, com valor vazio.

## Banner principal e textos

A API retorna somente banners ativos e ordenados. O frontend preserva a ordem, ignora itens sem ID válido e seleciona o primeiro com `image_path` normalizado. Banner sem imagem não bloqueia o próximo; array vazio, bloco ausente, API indisponível ou nenhuma imagem válida usa o fallback.

Os campos `title`, `subtitle`, `button_text` e `button_url` continuam na API e agora são tipados/normalizados, inclusive com validação de URL. Eles não substituem os textos do Hero nesta fase: `hero_title` já é a fonte administrativa do título, a descrição institucional vem de `about_text` e o botão principal possui fluxo WhatsApp específico. Isso evita duas fontes concorrentes e mantém o layout e a conversão existentes.

## Configurações e remoção

`admin/configuracoes.php` aceita JPEG, PNG e WebP de até 5 MB, com MIME real, Fileinfo, nome aleatório e diretório específico. A substituição preserva o caminho anterior até o commit do banco e só então tenta apagar o arquivo antigo.

`Remover imagem` usa POST, autenticação, CSRF e uma chave validada contra a configuração interna de campos `file`. O caminho é lido do banco, limpo em transação e o arquivo físico só é removido depois. Textos e demais settings são preservados. Arquivos compartilhados em settings, externos, versionados, maliciosos ou fora de `uploads/` não são apagados.

## Caminhos públicos, cache e produção

`normalizePublicAssetPath()` normaliza barras e resolve caminhos relativos a partir da URL real da API. Assim, funciona no Laragon sob `/gns-fibra-2/` e em produção na raiz, sem host hardcoded nem duplicação do subdiretório. Caminhos vazios, traversal e protocolos não públicos são rejeitados.

Cada substituição gera nome aleatório novo; não é necessário timestamp. Os componentes também tratam falha de carregamento e voltam ao fallback, evitando imagem quebrada. Em produção, `uploads/` deve permanecer ao lado de `api/`, `admin/` e do frontend publicado.

## Testes e rollback

Foram validados lint PHP, TypeScript, build, API, fallbacks, banner atual, seleção do primeiro banner com imagem, caminhos inválidos, ausência dos blocos, layouts mobile/desktop e temas claro/escuro. Não foram mantidos uploads temporários.

Rollback de código: reverter os arquivos desta fase. Rollback de dados: manter as chaves vazias; não é necessário removê-las. Os imports locais continuam disponíveis e independentes do banco.
