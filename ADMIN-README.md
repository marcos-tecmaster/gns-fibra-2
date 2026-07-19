# Painel administrativo GNS Fibra

## Requisitos

- PHP 8.0 ou superior com `pdo_mysql`, `session`, `fileinfo` e `mbstring`.
- MySQL 8 ou MariaDB compatível.
- Apache ou Nginx com o diretório do projeto como raiz pública.

## Banco de dados

Importe nesta ordem:

```bash
mysql --default-character-set=utf8mb4 -u seu_usuario -p seu_banco < database/schema.sql
mysql --default-character-set=utf8mb4 -u seu_usuario -p seu_banco < database/seed.sql
php database/verify-database.php
```

O parâmetro `--default-character-set=utf8mb4` é obrigatório em terminais
Windows para evitar corrupção de acentos durante a importação.

O banco deve ser criado e selecionado pelo comando, nunca dentro dos scripts.
Confirme `SELECT DATABASE()`, gere backup e consulte
`database/MIGRATIONS-README.md` antes de qualquer importação.

O `seed.sql` inicializa conteúdo somente quando `company_name` ainda não
existe. Ele usa transação, não apaga nem sobrescreve dados e reexecuções não
recriam conteúdo removido posteriormente pelo administrador.

## Configuração da conexão

A conexão não possui credenciais padrão. Em produção, defina explicitamente:

```text
GNS_APP_ENV=production
GNS_DB_HOST
GNS_DB_PORT
GNS_DB_NAME
GNS_DB_USER
GNS_DB_PASS
```

Para desenvolvimento, copie `config/database.example.php` para
`config/database.local.php`. O arquivo local é ignorado pelo Git. Usuário
`root` ou senha vazia são recusados quando `GNS_APP_ENV=production`.

## Acesso inicial

- URL: `/admin/`

O seed não cria credencial administrativa padrão. Crie o primeiro usuário:

```bash
php database/create-admin.php usuario "Nome completo"
```

A senha temporária não pode ser `GNS@2026` e deverá ser trocada no primeiro
login.

Para instalações anteriores, siga a ordem e os controles descritos em
`database/MIGRATIONS-README.md`. Exemplo de execução com banco explícito:

```bash
mysql --default-character-set=utf8mb4 -u seu_usuario -p seu_banco < database/migration-2026-06-security.sql
```

## API pública

```text
/api/site-content.php
```

Retorna configurações, planos ativos, cobertura ativa, depoimentos ativos e
banners ativos em JSON.

## Apache

Habilite `AllowOverride All` para que os arquivos `.htaccess` bloqueiem acesso
a `config`, `database` e execução de PHP em `uploads`.

## Nginx

Adicione regras equivalentes:

```nginx
location ~ ^/(config|database)/ {
    deny all;
}

location ~ ^/uploads/.*\.php {
    deny all;
}
```

Garanta permissão de escrita do usuário do PHP apenas na pasta `uploads`.
