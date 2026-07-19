# Implementação — banco, migrations e seed seguro — GNS Fibra 2.0

Data: 19/07/2026

## Objetivo

Eliminar nomes de banco fixos e efeitos destrutivos/repetidos dos scripts de instalação, mantendo compatibilidade com o banco ativo e com instalações novas.

## Estado recuperado

A retomada preservou alterações válidas já presentes em:

- `config/database.example.php`;
- `database/migration-2026-06-17-coverage-map-url.sql`;
- `database/migration-2026-06-security.sql`;
- `database/schema.sql`;
- `database/seed.sql`;
- `database/verify-database.php` ainda não rastreado.

Antes da retomada já estavam implementados: exemplo de configuração neutro, schema portátil, remoção dos dois `USE gns_fibra`, backfill de Cobertura condicionado à criação da coluna, migration de Segurança sem username fixo, seed transacional sem exclusões e verificador CLI de leitura.

## Complementos desta retomada

- O seed passou a usar a existência de `settings.company_name` como marcador persistente de instalação inicializada.
- Todas as cargas do seed só ocorrem na primeira instalação. Reexecuções não inserem settings ausentes nem repopulam uma tabela esvaziada depois pelo administrador.
- `database/verify-database.php` recebeu `--database=NOME` para validar banco descartável sem alterar a configuração local.
- Foi criada documentação operacional de migrations, instalação, verificação, backup e rollback.
- Documentos históricos foram marcados ou atualizados somente onde continham orientação conflitante com o estado atual.

## Contratos finais

### Schema

- Opera no banco selecionado pelo cliente.
- Mantém 13 tabelas completas.
- Usa `CREATE TABLE IF NOT EXISTS`.
- Não cria, seleciona, apaga ou recria banco e não exclui dados.

### Seed

- Usa `START TRANSACTION` e `COMMIT`.
- Não contém `DELETE`, `TRUNCATE`, `DROP` ou `REPLACE`.
- Não sobrescreve settings nem conteúdo administrativo.
- Inicializa somente banco ainda não marcado por `company_name`.
- Usa os assets oficiais:
  - `uploads/banners/aa600cfdc6e7513743ae73286e957a93.jpg`;
  - `uploads/history/install.jpg`;
  - `uploads/coverage/9d5a2f1e67396dc16b49e30550b02c52.jpg`;
  - `uploads/cta/9c0d1bd3dbaafb209599ebdf3dbfccd3.jpg`.

### Migrations

- Não selecionam banco por nome.
- Usam `DATABASE()` para consultar metadados.
- Não sobrescrevem edição administrativa.
- Cobertura faz backfill apenas quando `map_url` acabou de ser criada.
- Segurança não presume usuário `admin` e não reativa troca de senha em reexecução.

### Verificador

- Executa somente em CLI e não altera dados.
- Confere as 13 tabelas, colunas, índices, 36 settings e arquivos referenciados.
- Não contém banco fixo nem exibe credenciais.
- Retorna códigos de saída documentados.

## Evidências no banco local

Banco confirmado por `SELECT DATABASE()`: `gns-fibra-2`.

Contagens iniciais principais: 1 banner, 4 benefícios, 4 coberturas, 5 diferenciais, 7 FAQs, 3 itens de História, 7 planos, 36 settings, 4 estatísticas, 4 tecnologias, 4 depoimentos e 1 usuário.

Hash determinístico global antes do seed:

```text
af3b009156864953ca284ff4466cea9bae6f9ecc1b8ae741187c6215f4e41c58
```

O mesmo hash foi obtido após a primeira e a segunda execução do seed: zero alteração comprovada nas 13 tabelas.

Backup anterior aos testes:

```text
C:\laragon\backups\gns-fibra-2\gns-fibra-2-before-safe-seed-20260719-023432.sql
28.214 bytes
SHA-256 332041ebbc8511c1080c6b6bf02ea7fc63fab555da75ec0eedf19ff47c8be717
```

## Evidências no banco descartável

Banco criado com o prefixo obrigatório:

```text
gns_fibra_2_seed_test_20260719024147_1a6e55e8
```

Resultados:

- schema importado sem selecionar/criar banco internamente;
- seed executado duas vezes com hash idêntico `5ff580672089ec6b9f4ca88f5a853f114b4faef7cf56bdd9fd1c512640b82bcc`;
- nove migrations executadas duas vezes, mantendo o mesmo hash;
- verificador retornou `0`;
- contagens oficiais confirmadas, com `users` e `login_attempts` vazias;
- após remover todos os banners apenas no banco temporário, nova execução do seed manteve zero banners;
- banco temporário removido após nova validação rígida do nome.

## Validações de código

- PHP lint: 28 arquivos aprovados, correspondendo aos 27 arquivos anteriores e ao novo verificador.
- `npm run typecheck`: aprovado.
- `npm run build`: aprovado, com 2.159 módulos; permaneceu apenas o aviso conhecido de `theme-init.js` sem `type="module"`.
- `npm audit`: uma vulnerabilidade baixa em `esbuild 0.27.7`, transitiva de `vite 7.3.5`, limitada ao servidor de desenvolvimento no Windows. `npm audit fix` não foi executado.
- `git diff --check`: aprovado.
- Pesquisa nos SQL executáveis: nenhuma ocorrência de nome de banco fixo, `CREATE DATABASE`, `DELETE FROM`, `TRUNCATE`, `DROP DATABASE` ou `REPLACE INTO`.

## Segurança operacional

As credenciais foram carregadas em memória e nunca exibidas. O banco legado `gns_fibra` não foi acessado. Nenhum `DROP` foi executado em banco real. O único `DROP DATABASE` ocorreu no banco temporário validado pelo prefixo e nome completo.

## Estado de versionamento

Esta fase não executa `git add`, commit, push, reset, clean, restore geral ou stash. A lista final do Git deve ser conferida após todas as validações.
