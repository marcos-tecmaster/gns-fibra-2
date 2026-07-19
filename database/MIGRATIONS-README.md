# Banco, schema, seed e migrations

## Princípio de segurança

Os scripts SQL deste diretório operam exclusivamente no banco já selecionado pela sessão. Eles não contêm `CREATE DATABASE`, `USE` com nome fixo, `DROP DATABASE`, `TRUNCATE`, `DELETE FROM` ou `REPLACE INTO`.

Informe sempre o banco-alvo no comando do cliente MySQL e confirme-o antes de importar:

```bash
mysql --default-character-set=utf8mb4 -u seu_usuario -p seu_banco -e "SELECT DATABASE();"
```

Não reutilize exemplos antigos que apontem para `gns_fibra`. O nome é uma decisão do ambiente e deve coincidir com `GNS_DB_NAME` ou `config/database.local.php`.

## Antes de qualquer alteração

1. Confirme `SELECT DATABASE()`.
2. Registre contagens e, quando necessário, hashes determinísticos.
3. Gere e valide um backup do banco e dos uploads.
4. Use um usuário com privilégios limitados ao banco correto.
5. Nunca teste schema ou seed em outro banco real como alternativa.

## Instalação nova

Crie e selecione o banco fora destes scripts. Depois importe:

```bash
mysql --default-character-set=utf8mb4 -u seu_usuario -p seu_banco < database/schema.sql
mysql --default-character-set=utf8mb4 -u seu_usuario -p seu_banco < database/seed.sql
php database/verify-database.php
```

O `schema.sql` cria 13 tabelas com `CREATE TABLE IF NOT EXISTS` e não apaga dados. O `seed.sql` usa transação e considera a ausência da setting `company_name` como marcador de instalação nova. Depois da primeira inicialização, ele não altera settings nem repopula tabelas, inclusive quando uma tabela tiver sido esvaziada pelo administrador.

O seed não cria usuário administrativo. Use, depois da instalação:

```bash
php database/create-admin.php usuario "Nome completo"
```

## Ordem das migrations

Para uma instalação antiga, aplique somente as migrations ainda não registradas pelo procedimento de deploy, nesta ordem:

1. `migration-2026-06-security.sql`
2. `migration-2026-06-17-coverage-map-url.sql`
3. `migration-2026-07-16-add-support-cta-settings.sql`
4. `migration-2026-07-16-create-benefits.sql`
5. `migration-2026-07-16-create-faqs.sql`
6. `migration-2026-07-16-create-technologies.sql`
7. `migration-2026-07-17-create-history-gallery-and-settings.sql`
8. `migration-2026-07-17-create-stats-differentials.sql`
9. `migration-2026-07-18-add-section-background-settings.sql`

Exemplo, sempre com banco explícito no cliente:

```bash
mysql --default-character-set=utf8mb4 -u seu_usuario -p seu_banco < database/migration-AAAA-MM-DD-descricao.sql
```

As migrations consultam `DATABASE()` quando precisam inspecionar metadados. Inserts de conteúdo só ocorrem para chaves ausentes ou tabelas recém-criadas/vazias; não atualizam conteúdo administrativo existente. A migration de Cobertura só executa o backfill quando acabou de criar `map_url`. A migration de Segurança só marca troca obrigatória quando acabou de criar a coluna e não presume username.

## Verificação

O comando padrão usa a configuração normal da aplicação:

```bash
php database/verify-database.php
```

Para um banco descartável local, é possível selecionar o alvo sem editar a configuração:

```bash
php database/verify-database.php --database=nome_do_banco_temporario
```

O override aceita apenas identificadores de 1 a 64 caracteres formados por letras, números, `_` e `-`, exige `config/database.local.php` e nunca imprime credenciais. O verificador é CLI-only e somente leitura. Ele retorna `0` em aprovação, `2` para divergências encontradas e `3` para falha de configuração, conexão ou execução.

## Rollback

Não há rollback destrutivo automático. Em caso de falha, interrompa o deploy, preserve as evidências e restaure o dump validado no banco explicitamente selecionado. Nunca execute `DROP DATABASE` em banco real.
