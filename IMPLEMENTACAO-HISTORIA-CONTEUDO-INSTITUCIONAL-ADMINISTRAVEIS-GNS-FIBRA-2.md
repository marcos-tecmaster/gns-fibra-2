# IMPLEMENTACAO HISTORIA E CONTEUDO INSTITUCIONAL ADMINISTRAVEIS - GNS FIBRA 2.0

Data: 17/07/2026
Fase: Historia e conteudo institucional administraveis
Status: implementado localmente, sem staging, commit ou push

## 1. Escopo

Esta fase torna administravel a secao publica Historia / Quem Somos:

- conteudo institucional unico via `settings`;
- dois cards institucionais;
- ativacao/desativacao da secao;
- galeria administravel via `history_gallery`;
- API publica;
- normalizacao TypeScript;
- fallback local preservado;
- layout React existente preservado.

Nao foram implementados Hero, Estatisticas, Diferenciais, Planos, Beneficios, Tecnologias, Suporte, CTA, FAQ, depoimentos, biblioteca de midia, editor rico, roles, logs, campanhas, leads, IXC ou Analytics.

## 2. Auditoria do conteudo atual

Fonte principal: `src/components/site/History.tsx` e `src/lib/site-content.ts`.

Textos encontrados:

- eyebrow: `Quem somos`;
- titulo: `Nossa` + destaque visual `História`;
- primeiro paragrafo: `Há mais de 14 anos conectando famílias e empresas com fibra óptica, estabilidade e atendimento humano.`;
- segundo paragrafo: `Nossa trajetória é construída diariamente por uma equipe que conhece a região, investe em infraestrutura e entende que conexão de qualidade também depende de atendimento humano.`;
- card de experiencia: `{yearsActive}+ anos` e `de experiência`;
- card de equipe: `Equipe local` e `próxima do cliente`.

`config.company.yearsActive` continua vindo de `years_in_market`. A nova fase nao duplica esse valor.

Galeria encontrada:

| Ordem | Slug | Titulo | Descricao | Imagem |
| ---: | --- | --- | --- | --- |
| 10 | `estrutura` | `Estrutura` | `Infraestrutura e equipamentos que sustentam nossa operação.` | `src/assets/install.jpg` |
| 20 | `equipe` | `Nossa equipe` | `Profissionais próximos, preparados para orientar e atender você.` | sem imagem |
| 30 | `frota` | `Nossa frota` | `Estrutura de atendimento para acompanhar nossa área de cobertura.` | sem imagem |

Nenhum dado institucional novo foi inventado.

## 3. Decisao de arquitetura

Foi aplicada a arquitetura hibrida solicitada:

- conteudo institucional unico: `settings`;
- galeria repetivel: tabela `history_gallery`.

`about_text` foi preservado como texto institucional geral. A secao Historia passa a usar `history_description`, inicializada com o valor atual de `about_text`. Assim outros consumidores de `config.company.aboutText` nao sao alterados silenciosamente.

## 4. Settings adicionadas

Chaves:

- `history_enabled`;
- `history_eyebrow`;
- `history_title`;
- `history_title_highlight`;
- `history_description`;
- `history_secondary_text`;
- `history_experience_suffix`;
- `history_experience_label`;
- `history_team_title`;
- `history_team_description`.

O destaque do titulo fica em campo separado para preservar o visual sem HTML no banco.

## 5. Migration e tabela

Migration criada:

- `database/migration-2026-07-17-create-history-gallery-and-settings.sql`

Tabela: `history_gallery`

- `id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY`
- `slug VARCHAR(100) NOT NULL`
- `title VARCHAR(180) NOT NULL`
- `description TEXT NOT NULL`
- `image_path VARCHAR(500) NULL`
- `image_alt VARCHAR(180) NOT NULL`
- `active TINYINT(1) NOT NULL DEFAULT 1`
- `display_order INT NOT NULL DEFAULT 0`
- timestamps padrao.

Indices:

- `uq_history_gallery_slug`;
- `idx_history_gallery_active_order (active, display_order, id)`.

A migration usa `CREATE TABLE IF NOT EXISTS`, insere settings apenas quando ausentes e popula a galeria somente quando a tabela esta vazia. Nao usa `DROP`, `TRUNCATE`, `DELETE`, `REPLACE` nem sobrescreve settings existentes.

Tambem foram atualizados:

- `database/schema.sql`;
- `database/seed.sql`.

## 6. Uploads e imagem inicial

Diretorio usado:

- `uploads/history/`

O projeto ja possui `uploads/.htaccess` com:

- `Options -Indexes`;
- bloqueio de `php`, `phtml`, `phar` e variantes.

Formatos aceitos pelo helper:

- JPEG;
- PNG;
- WebP.

Limite:

- 5 MB.

Seguranca:

- MIME real por `finfo` quando disponivel;
- se Fileinfo nao estiver disponivel, upload e rejeitado com erro controlado;
- nomes aleatorios por `random_bytes`;
- caminho relativo em `uploads/...`;
- exclusao restrita ao diretorio real de uploads;
- sem SVG, GIF, PHP, HTML, PDF, video ou caminho absoluto.

Para manter o visual inicial via API, `src/assets/install.jpg` foi copiado para:

- `uploads/history/install.jpg`

O fallback local continua usando o import original `src/assets/install.jpg`.

## 7. Painel

Arquivos alterados/criados:

- `admin/configuracoes.php`;
- `admin/historia-galeria.php`;
- `admin/includes/layout.php`;
- `admin/dashboard.php`;
- `admin/includes/simple-crud.php`;
- `config/auth.php`.

`admin/configuracoes.php` recebeu o grupo `História e conteúdo institucional`, com link para `Gerenciar galeria da história`.

`admin/historia-galeria.php` usa `run_simple_crud()`:

- slug obrigatorio, lowercase, unico e com regex;
- titulo obrigatorio, maximo 180;
- descricao obrigatoria, maximo 1500;
- imagem opcional;
- alt obrigatorio, maximo 180;
- ordem 0 a 10000;
- ativo 0/1.

O helper generico foi ajustado para:

- rejeitar arquivos extras quando `reject_extra_fields` esta ativo;
- nao apagar imagem antiga antes do banco confirmar;
- remover upload novo se validacao ou gravacao falhar;
- apagar imagem antiga somente apos update bem-sucedido e somente se nao estiver em uso.

## 8. API publica

`api/site-content.php` passa a retornar:

```json
"history_gallery": [
  {
    "id": 1,
    "slug": "estrutura",
    "title": "Estrutura",
    "description": "Infraestrutura e equipamentos que sustentam nossa operação.",
    "image_path": "uploads/history/install.jpg",
    "image_alt": "Estrutura",
    "active": true,
    "display_order": 10
  }
]
```

As chaves `history_*` permanecem dentro de `settings`.

Preservado:

- `settings`;
- `plans`;
- `coverage`;
- `testimonials`;
- `banners`;
- `faqs`;
- `benefits`;
- `technologies`;
- `stats`;
- `differentials`;
- `generated_at`.

## 9. TypeScript e fallback

Arquivos atualizados:

- `src/content/types.ts`;
- `src/lib/site-content.ts`;
- `src/services/site-content-service.ts`;
- `src/components/site/History.tsx`.

Novos tipos:

- `SiteContent.history`;
- `ApiHistoryGalleryItem`.

Normalizacao:

- `history_enabled` usa parser booleano explicito;
- texto ausente usa fallback local;
- texto vazio com secao ativa usa fallback individual;
- `history_gallery` ausente usa fallback local;
- `history_gallery: []` e respeitado;
- item invalido e ignorado isoladamente;
- `slug` vira `id` logico;
- `image_path` vazio gera card sem imagem;
- caminho publico e normalizado contra a base da API quando necessario.

## 10. Componente History

Preservado:

- `id="quem-somos"`;
- layout premium;
- cards;
- icones `Clock3`, `UsersRound` e `Camera`;
- animacoes;
- Dark/Light;
- responsividade.

Comportamento novo:

- `history.enabled = false` retorna `null`;
- galeria vazia mantem conteudo textual e remove somente a area de galeria;
- primeiro item so fica em destaque quando houver mais de um item;
- alt vem de `item.imageAlt`;
- placeholder sem imagem usa `Camera` decorativo com `aria-hidden`.

## 11. Validacoes executadas

Banco:

- antes: `history_gallery` inexistente;
- primeira execucao: tabela criada, 10 settings `history_*`, 3 itens oficiais;
- segunda execucao: manteve 3 itens e 10 settings, sem duplicacao.

API:

- GET retorna `history_gallery=3`;
- settings contem 10 chaves `history_*`;
- blocos anteriores preservados;
- POST retorna erro de metodo;
- todos os itens inativos resultam em `history_gallery: []`.

Painel:

- Configuracoes: edicao valida, campos obrigatorios com secao ativa, campos vazios com secao inativa, HTML/script, campo extra e CSRF invalido.
- Galeria: criar sem imagem, excluir, slug invalido, slug duplicado, campo extra, SVG/MIME invalido e CSRF invalido.

Observacao: upload valido via HTTP autenticado deve ser revisado manualmente no navegador. No CLI local, `move_uploaded_file()` nao representa um upload HTTP real.

## 12. Implantacao e rollback

Implantacao:

1. backup do banco;
2. backup de uploads;
3. aplicar `database/migration-2026-07-17-create-history-gallery-and-settings.sql`;
4. conferir settings `history_*`;
5. conferir registros de `history_gallery`;
6. publicar painel/API/frontend;
7. conferir permissoes de `uploads/history`;
8. confirmar bloqueio de execucao em `uploads/.htaccess`;
9. testar imagens;
10. limpar cache;
11. revisar textos institucionais com a GNS.

Rollback:

- restaurar codigo anterior;
- manter settings e tabela sem uso;
- manter uploads;
- nao apagar dados automaticamente;
- excluir tabela ou arquivos somente manualmente, apos backup e decisao explicita.

## 13. Pendencias

- Teste manual de upload valido autenticado em navegador para JPEG, PNG e WebP.
- Revisao visual humana em 360, 390, 414, 430, 768 e 1280 px.
- Revisao institucional dos textos pela GNS.
- Logs, roles, soft delete e biblioteca de midia continuam fora desta fase.
# Ajuste de remoção isolada da imagem (18/07/2026)

O CRUD da galeria passou a exibir `Remover imagem` somente em registros que possuem `image_path`. A ação usa POST, autenticação da página, CSRF e ID inteiro; lê o caminho no banco, limpa somente `history_gallery.image_path` em transação e preserva slug, título, descrição, `image_alt`, ordem e status. `Excluir` continua sendo a ação separada que remove o registro inteiro.

Depois do commit da atualização, o helper tenta excluir fisicamente apenas arquivos gerenciados, sob `uploads/`, com nome aleatório gerado pelo uploader e sem outra referência na mesma coleção. Caminhos externos, maliciosos, compartilhados ou nomes versionados/protegidos, como `uploads/history/install.jpg`, não são apagados fisicamente. Nesses casos somente a referência do registro é limpa.

A API serializa a ausência como `image_path: null`; o normalizador omite `image` e o componente `History` mantém o card e mostra o placeholder existente. Foram verificados lint, typecheck, build, integridade do diff e os cenários de configuração, ausência de imagem, preservação dos campos, referência compartilhada, caminho malicioso e arquivo protegido.

O mesmo modelo de segurança foi reutilizado nas imagens únicas de Cobertura e CTA, armazenadas em settings. Banners continua usando `file_clear_action`; sua imagem agora alimenta o Hero, com fallback local quando removida.
