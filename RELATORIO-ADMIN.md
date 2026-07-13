# Relatório do painel administrativo

## Estrutura criada

- `admin/`: autenticação, dashboard e CRUDs.
- `api/site-content.php`: API JSON pública.
- `config/`: conexão PDO e autenticação.
- `database/`: schema e dados iniciais.
- `uploads/`: banners, galeria e logos.

## Tabelas

- `users`
- `settings`
- `plans`
- `coverage`
- `testimonials`
- `banners`

## Segurança implementada

- PDO com prepared statements.
- Senhas com `password_hash` e `password_verify`.
- Sessão com cookie HttpOnly, SameSite e Secure em HTTPS.
- Regeneração de ID após login.
- Timeout de sessão.
- CSRF em operações administrativas.
- Escape de saída HTML.
- Upload com validação MIME, nome aleatório e limite de 5 MB.
- Bloqueio Apache para arquivos sensíveis e execução PHP em uploads.
- Respostas de erro da API sem detalhes internos.

## Validações realizadas

- Lint de todos os arquivos PHP.
- Importação de schema e seed no MySQL 8.4.
- Login real com sessão.
- Criação e exclusão de plano por HTTP.
- API retornando os registros ativos.
- Build do frontend React preservado.

Consulte `ADMIN-README.md` para instalação e operação.
