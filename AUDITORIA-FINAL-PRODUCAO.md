# Auditoria final de produção - GNS Fibra

Data: 10/06/2026

## Parecer

**PENDÊNCIAS ENCONTRADAS**

O projeto compila e suas funções principais operam, mas ainda não deve ser publicado
sem corrigir os itens críticos abaixo.

## CRÍTICO

1. **Credencial administrativa padrão ainda ativa**
   - O login com `admin` e a senha padrão documentada foi aceito no teste.
   - A senha deve ser substituída antes de qualquer exposição pública.
   - Remover a senha do `ADMIN-README.md` e evitar credenciais previsíveis no seed de produção.

2. **Banco configurado com fallback para `root` sem senha**
   - `config/database.php` usa `root` e senha vazia quando variáveis de ambiente não existem.
   - Em produção, criar usuário MySQL exclusivo, com senha forte e privilégios somente no banco
     `gns_fibra`, e exigir as variáveis `GNS_DB_HOST`, `GNS_DB_PORT`, `GNS_DB_NAME`,
     `GNS_DB_USER` e `GNS_DB_PASS`.

## IMPORTANTE

1. **Proteção contra força bruta insuficiente**
   - O login possui atraso fixo de 350 ms, mas não tem rate limit, bloqueio progressivo,
     CAPTCHA ou registro de tentativas.

2. **Cabeçalhos HTTP de segurança ausentes**
   - Não foram encontrados CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`,
     `Permissions-Policy` e `X-Content-Type-Options` nas páginas do painel.
   - O servidor também expõe `X-Powered-By: PHP/8.2.28`.

3. **Publicação em subdiretório não está pronta**
   - Em `http://localhost/gns-fibra/`, as URLs absolutas `/src/main.tsx`,
     `/logo-gns.png`, `/favicon.svg` e `/api/site-content.php` retornaram 404.
   - O build deve ser servido como raiz pública do site, ou o `base` do Vite e a URL da API
     precisam ser configurados para `/gns-fibra/`.

4. **Overflow horizontal em mobile**
   - Em viewport de 390 px, o selo e o título do hero ultrapassam a área visível.
   - A tela de login do painel também excede a largura do viewport.

5. **Sitemap quebrado e SEO incompleto**
   - `https://gnsfibra.com.br/sitemap.xml`, informado em `public/robots.txt`, retornou 404.
   - Não há `canonical`, `og:url`, e `og:image` usa URL relativa em vez de URL absoluta.

6. **Link do desenvolvedor indisponível**
   - `https://marcostecmaster.com.br` não resolveu DNS durante a auditoria.

7. **Arquivos visuais excessivamente grandes**
   - `public/logo-gns.png`: 2.618.937 bytes para exibição de aproximadamente 48-60 px.
   - `public/favicon.svg`: 795.774 bytes e contém imagem raster embutida.
   - O diretório `dist` totalizou aproximadamente 4,35 MB, principalmente por esses arquivos.

8. **Uploads órfãos após exclusão de banner**
   - O CRUD remove o registro do banco, mas não exclui o arquivo associado em `uploads/banners`.

9. **Gerenciamento de usuários pode causar bloqueio administrativo**
   - É possível desativar o próprio usuário e não existe proteção para manter ao menos um
     administrador ativo.

10. **Configurações não são atualizadas em transação**
    - Uma falha durante a gravação pode deixar apenas parte das configurações atualizada.

## OPCIONAL

1. Alterar logout de GET para POST com CSRF.
2. Implementar logs de auditoria para login e alterações administrativas.
3. Adicionar política de backup e restauração do banco e dos uploads.
4. Configurar cache longo e versionamento para imagens estáticas.
5. Adicionar testes automatizados de integração para API e CRUDs.
6. Documentar Nginx/Apache, HTTPS, variáveis de ambiente e rotina de deploy.

## Validações aprovadas

- Login inválido rejeitado.
- Sessão regenerada após login e cookie com `HttpOnly` e `SameSite=Lax`.
- Redirecionamento de página protegida para o login.
- CSRF inválido rejeitado com HTTP 419.
- CRUD de planos funcionando.
- CRUD de cobertura funcionando.
- CRUD de depoimentos funcionando.
- CRUD de usuários funcionando.
- CRUD de banners e upload de imagem funcionando.
- Upload PHP rejeitado pela validação de MIME.
- Acesso HTTP direto a `config/database.php` bloqueado com 403.
- Listagem da pasta `uploads` bloqueada com 403.
- API válida com configurações, 7 planos, 4 coberturas, 4 depoimentos e 1 banner.
- Banco MySQL 8.4.3 com tabelas em `utf8mb4_unicode_ci`.
- 16 arquivos PHP aprovados em `php -l`.
- `npm run typecheck` aprovado.
- `npm run build` aprovado.
- Auditoria npm das dependências de produção concluída sem vulnerabilidades reportadas.
- 50 arquivos textuais verificados sem BOM e sem UTF-8 inválido.
- Favicon e logo carregados no frontend e no painel.
- WhatsApp, Central do Assinante, Linktree e mapa de cobertura responderam HTTP 200.

## Conclusão

O código está funcional para desenvolvimento e homologação. Para produção, os dois itens
críticos devem ser corrigidos obrigatoriamente. Depois disso, recomenda-se resolver os itens
importantes de segurança, deploy e responsividade antes da abertura pública.
