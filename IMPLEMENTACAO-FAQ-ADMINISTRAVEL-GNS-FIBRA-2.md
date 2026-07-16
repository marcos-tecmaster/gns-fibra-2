# IMPLEMENTACAO FAQ ADMINISTRAVEL - GNS FIBRA 2.0

Data: 16/07/2026
Fase: FAQ administravel de ponta a ponta
Status: implementado localmente, sem commit

## 1. Escopo

Esta fase implementa o primeiro modulo funcional do Painel Administrativo 2.0:

`Banco MySQL -> CRUD PHP -> API publica -> normalizacao TypeScript -> SiteContentProvider -> FAQ existente`

Nao foram implementados:

- Beneficios;
- Tecnologias;
- Suporte administravel;
- CTA administravel;
- Roles;
- Logs administrativos;
- Campanhas;
- Leads;
- IXC;
- Analytics.

## 2. Migration

Arquivo criado:

- `database/migration-2026-07-16-create-faqs.sql`

A migration:

- usa `SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci`;
- usa o banco ja selecionado pela conexao local, para respeitar `config/database.local.php`;
- cria `faqs` com `CREATE TABLE IF NOT EXISTS`;
- nao usa `DROP`, `TRUNCATE`, `ALTER` em outras tabelas ou SQL destrutivo;
- insere as sete FAQs oficiais somente quando a tabela esta vazia;
- nao cria `UNIQUE` em `question`;
- nao sobrescreve conteudo editado por administrador.

## 3. Tabela

Tabela: `faqs`

Campos:

- `id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY`
- `question VARCHAR(255) NOT NULL`
- `answer TEXT NOT NULL`
- `active TINYINT(1) NOT NULL DEFAULT 1`
- `display_order INT NOT NULL DEFAULT 0`
- `created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`
- `updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`

Indice:

- `idx_faqs_active_order (active, display_order, id)`

## 4. Seed inicial

As sete FAQs foram copiadas exatamente de `src/lib/site-content.ts`.

Estrategia:

- migration insere somente se `faqs` estiver vazia;
- `database/seed.sql` tambem foi atualizado para instalacoes novas seguindo o padrao destrutivo ja existente do seed base;
- `display_order`: 10, 20, 30, 40, 50, 60, 70;
- todas iniciam com `active = 1`.

## 5. Schema base

Arquivo atualizado:

- `database/schema.sql`

Instalacoes novas passam a criar a tabela `faqs` junto com as tabelas existentes.

## 6. CRUD administrativo

Arquivo criado:

- `admin/faqs.php`

O modulo usa `admin/includes/simple-crud.php`.

Configuracao:

- `table`: `faqs`
- `page`: `faqs.php`
- `title`: `Perguntas frequentes`
- `singular`: `Pergunta frequente`
- `order_by`: `display_order ASC, id ASC`
- `empty_message`: `Nenhuma pergunta frequente cadastrada.`

Campos:

- pergunta: obrigatoria, maximo 255, texto puro;
- resposta: obrigatoria, maximo 5000, texto puro;
- ordem: inteiro entre 0 e 10000;
- ativa: checkbox normalizado para 0 ou 1.

Listagem:

- pergunta;
- resposta;
- ordem;
- status;
- acoes.

## 7. Helper CRUD

Arquivo atualizado:

- `admin/includes/simple-crud.php`

Alteracoes genericas:

- estado vazio configuravel;
- `maxlength` em textarea;
- `max` em input numerico;
- validacao explicita de texto acima do limite;
- validacao explicita de numero invalido, abaixo do minimo ou acima do maximo;
- erro claro quando editar ou excluir registro inexistente;
- suporte opcional a `strip_tags` por campo.

Impacto previsto:

- preserva Banners, Cobertura e Depoimentos;
- mantem CSRF, prepared statements, escaping, redirects e flashes;
- continua usando configuracao interna para nomes de tabelas/campos.

## 8. Menu e dashboard

Arquivos atualizados:

- `admin/includes/layout.php`
- `admin/dashboard.php`

Menu:

- adiciona `FAQ` apos `Depoimentos`;
- mantem calculo de item ativo por `SCRIPT_NAME`;
- nao reorganiza agrupamentos.

Dashboard:

- adiciona card simples `FAQs ativas / total`;
- adiciona atalho `Nova FAQ`;
- nao redesenha o dashboard.

## 9. API publica

Arquivo atualizado:

- `api/site-content.php`

Novo campo:

```json
"faqs": [
  {
    "id": 1,
    "question": "Pergunta",
    "answer": "Resposta",
    "active": true,
    "display_order": 10
  }
]
```

Consulta:

```sql
SELECT id, question, answer, active, display_order
FROM faqs
WHERE active = 1
ORDER BY display_order, id
```

Preservado:

- `settings`;
- `plans`;
- `coverage`;
- `testimonials`;
- `banners`;
- `generated_at`;
- metodo GET;
- erro generico;
- headers;
- cache;
- JSON UTF-8.

## 10. TypeScript e fallback

Arquivo atualizado:

- `src/services/site-content-service.ts`

Regras:

- `faqs` na API e opcional;
- campo ausente ou `undefined` usa fallback local;
- array vazio da API e respeitado e oculta a secao FAQ;
- registros com pergunta ou resposta vazia sao ignorados;
- ordem recebida da API e preservada;
- fallback local em `src/lib/site-content.ts` permanece intacto.

## 11. Frontend FAQ

Arquivo preservado:

- `src/components/site/FAQ.tsx`

Nenhuma alteracao foi necessaria no componente, pois ele ja consome:

```ts
const { config, faqs } = useSiteContent();
```

Foram preservados:

- accordion;
- acessibilidade;
- JSON-LD;
- mascote;
- WhatsApp;
- Dark/Light;
- responsividade;
- retorno `null` quando nao ha FAQ ativa.

## 12. Segurança

Confirmado no modulo:

- autenticacao obrigatoria via `require_auth()`;
- CSRF em salvar e excluir;
- alteracoes somente por POST;
- prepared statements;
- saida escapada com `h()`;
- limites de tamanho;
- texto puro sem HTML arbitrario;
- ID validado como inteiro;
- mensagens sem credenciais ou dados sensiveis.

Pendencias mantidas fora desta fase:

- roles;
- logs administrativos;
- CAPTCHA;
- logout por POST;
- hardening geral.

## 13. Rollback manual

Nao foi criado rollback destrutivo.

Rollback conceitual seguro:

1. exportar dados da tabela `faqs`;
2. remover temporariamente `faqs` da resposta da API, se necessario;
3. manter fallback local no React;
4. remover item de menu/admin se necessario;
5. avaliar `DROP TABLE faqs` apenas manualmente, apos backup e aprovacao.

## 14. Validacoes

Validacoes executadas em 16/07/2026:

- migration executada localmente no banco configurado, criando `faqs` com 7 registros oficiais;
- segunda execucao da migration manteve 7 registros, sem duplicacao;
- `DESCRIBE faqs` e `SHOW INDEX FROM faqs` confirmaram estrutura e indice `idx_faqs_active_order`;
- CRUD validado por sessao administrativa simulada: listar, criar, editar, alterar ordem, desativar, reativar e excluir FAQ de teste;
- validacoes negativas do CRUD: pergunta vazia, resposta vazia, pergunta acima de 255 caracteres, ordem negativa, CSRF invalido e ID inexistente;
- caracteres acentuados, aspas simples/duplas e texto semelhante a script foram testados; tags HTML foram removidas no backend;
- estado vazio do painel validado com transacao e rollback;
- API validada com `faqs` contendo 7 itens ativos, ordem correta, tipos normalizados e campos anteriores preservados;
- POST na API retornou erro de metodo nao permitido;
- frontend validado em 360, 390, 414, 430, 768 e 1280 px sem overflow horizontal;
- accordion validado em 390 px;
- edicao temporaria no banco refletiu no site, respeitando ordenacao;
- FAQ temporariamente inativa deixou de aparecer no site e no JSON-LD;
- `faqs: []` vindo da API ocultou a secao FAQ e removeu JSON-LD;
- API indisponivel e API antiga sem campo `faqs` usaram fallback local;
- Dark e Light validados em 390 px com FAQ e JSON-LD presentes;
- `php -l` executado nos PHP alterados sem erros;
- `npm run typecheck` executado sem erros;
- `npm run build` executado sem erros, mantendo o aviso conhecido de `theme-init.js`;
- `npm audit` executado sem `audit fix`; permanece uma vulnerabilidade baixa conhecida em `esbuild`.

## 15. Proxima etapa recomendada

Revisao visual humana do painel FAQ e, depois, commit isolado contendo apenas os arquivos desta fase.
