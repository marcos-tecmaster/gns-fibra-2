# Auditoria final corrigida - GNS Fibra

Data: 11/06/2026

## Parecer

**PRONTO PARA PRODUÇÃO**

Não foram encontradas pendências críticas após as correções e validações.
A publicação deve usar HTTPS, usuário MySQL exclusivo e as variáveis de
ambiente documentadas.

## CRÍTICO

Nenhuma pendência crítica encontrada.

### Credenciais administrativas

- O `seed.sql` não cria mais usuário ou senha padrão.
- A senha `GNS@2026` não pode ser cadastrada como nova senha.
- Usuários migrados recebem `must_change_password = 1`.
- O primeiro login redireciona obrigatoriamente para `trocar-senha.php`.
- O dashboard permanece bloqueado até a troca.
- O painel mostra aviso explícito enquanto a troca estiver pendente.
- A senha exige 12 caracteres, maiúscula, minúscula, número e símbolo.
- O usuário atual da instalação foi marcado para troca obrigatória.

### Banco de dados

- Removido o fallback automático para `root` sem senha.
- A conexão exige configuração explícita por variáveis `GNS_DB_*` ou pelo
  arquivo local ignorado `config/database.local.php`.
- `root` ou senha vazia são recusados quando o ambiente é `production`.
- O teste de produção confirmou a recusa das credenciais inseguras.

## IMPORTANTE

Nenhuma pendência importante encontrada.

### Segurança

- Rate limit por IP, usuário e sessão.
- Bloqueio temporário após cinco falhas em uma janela de 15 minutos.
- Mensagem de autenticação genérica.
- Sessão regenerada após login.
- CSRF mantido em todos os formulários administrativos.
- Headers configurados:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - HSTS quando HTTPS estiver ativo
- Header `X-Powered-By` removido.
- Acesso HTTP às pastas `config` e `database` retorna 403.

### Responsividade

- Header, Hero, Plans, Coverage, Footer e login administrativo revisados.
- Testes de DOM realizados em 360 px, 390 px e 414 px.
- Nenhuma largura rolável excedeu o viewport.
- Login administrativo em 360 px: viewport 360 px e card 332 px.

### Deploy e SEO

- Build servido pelo Apache a partir de `dist`.
- Assets e API funcionam em `/gns-fibra/`.
- Base Vite relativa, compatível também com domínio raiz.
- `sitemap.xml` criado e respondendo HTTP 200.
- `robots.txt` atualizado e respondendo HTTP 200.
- Adicionados canonical, `og:url` e imagem Open Graph absoluta.

### Assets

- Logo reduzida de aproximadamente 2,6 MB para 109 KB.
- Favicon reduzido de aproximadamente 795 KB para 739 bytes.
- Logo e favicon respondendo HTTP 200 no frontend e no admin.

### Conteúdo e CRUD

- Exclusão de banner remove o arquivo físico quando não há outro registro
  utilizando o mesmo caminho.
- Arquivos compartilhados são preservados até a exclusão do último registro.
- Configurações administrativas são gravadas em transação.
- Não é possível excluir ou desativar o próprio usuário.
- Mantido ao menos um administrador ativo.
- Instagram, Facebook e Linktree são carregados da API.
- Ícones oficiais aparecem no rodapé quando os links estão preenchidos.
- Links externos abrem em nova aba com `noopener noreferrer`.
- Crédito mantido em `https://marcostecmaster.com.br`.

## OPCIONAL

1. Alterar logout para POST protegido por CSRF.
2. Implementar logs permanentes de auditoria administrativa.
3. Automatizar testes E2E de login e CRUDs em CI.
4. Definir política automatizada de backup do banco e de `uploads`.
5. Criar configuração Nginx equivalente às regras do `.htaccess`.

## Validação final

- `php -l`: 21 arquivos aprovados.
- `npm run typecheck`: aprovado.
- `npm run build`: aprovado.
- `npm audit --omit=dev`: 0 vulnerabilidades.
- Login inválido: rejeitado.
- Rate limit: validado.
- Troca obrigatória de senha: validada ponta a ponta.
- Dashboard antes da troca: bloqueado.
- Dashboard depois da troca: liberado.
- API: HTTP 200.
- API: 7 planos, 4 coberturas, 4 depoimentos e 1 banner.
- Sitemap: HTTP 200.
- Robots: HTTP 200.
- Favicon: HTTP 200.
- Logo: HTTP 200.
- Admin: HTTP 200.
- Frontend no subdiretório: HTTP 200.
- WhatsApp e Central do Assinante presentes na API.
- Instagram e Facebook presentes na API.
- Exclusão física de banner: validada.
- Registros temporários da auditoria: removidos.

## Preparação do ambiente de produção

Defina:

```text
GNS_APP_ENV=production
GNS_DB_HOST
GNS_DB_PORT
GNS_DB_NAME
GNS_DB_USER
GNS_DB_PASS
```

Use um usuário MySQL exclusivo para o projeto, habilite HTTPS e execute a
migração `database/migration-2026-06-security.sql` antes da publicação de uma
instalação já existente.
