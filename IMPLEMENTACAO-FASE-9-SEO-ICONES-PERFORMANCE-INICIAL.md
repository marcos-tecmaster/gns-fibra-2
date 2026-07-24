# Implementação — Fase 9 — SEO, Ícones e Performance Inicial

Data: 23/07/2026

## Objetivo

Iniciar a Fase 9 do projeto GNS Fibra 2.0 com melhorias de SEO técnico, identidade visual dos navegadores, manifesto do site e otimização inicial de assets públicos.

## SEO técnico

O arquivo `index.html` recebeu dados estruturados em JSON-LD.

Tipos utilizados:

- `Organization`;
- `WebSite`.

Informações incluídas:

- nome da empresa;
- URL oficial;
- logo;
- imagem institucional;
- descrição;
- e-mail;
- telefone;
- endereço;
- ponto de contato;
- Facebook;
- Instagram;
- idioma do site;
- organização responsável pelo site.

Os dados foram obtidos das configurações públicas existentes no projeto, sem criação de informações comerciais fictícias.

## Manifesto

Foi criado:

`public/site.webmanifest`

Configurações principais:

- nome: GNS Fibra;
- nome curto: GNS Fibra;
- idioma: pt-BR;
- exibição standalone;
- tema escuro institucional;
- escopo e URL inicial relativos;
- ícones de 192 e 512 pixels.

O manifesto é compatível com publicação em domínio raiz e subdiretório.

## Ícones

Foram criados:

- `public/favicon-48.png`;
- `public/apple-touch-icon.png`;
- `public/icon-192.png`;
- `public/icon-512.png`.

Os arquivos foram gerados a partir da logo oficial.

Tamanhos obtidos:

- favicon 48 px: 6.926 bytes;
- Apple Touch Icon: 83.276 bytes;
- ícone 192 px: 94.334 bytes;
- ícone 512 px: 581.406 bytes.

## Favicon público e administrativo

O site público passou a usar:

`public/favicon-48.png`

Também foram atualizados:

- `admin/includes/layout.php`;
- `admin/login.php`.

Assim, o site público, a tela de login e as páginas internas do painel usam o mesmo favicon institucional.

O antigo `favicon.svg` foi preservado no projeto para compatibilidade e histórico, mas deixou de ser a referência principal no HTML.

## Apache

O `.htaccess` foi atualizado para:

- servir os novos ícones pelo build;
- servir `site.webmanifest`;
- definir o MIME `application/manifest+json` para arquivos `.webmanifest`.

Os arquivos foram testados pelo Apache local e responderam com HTTP 200.

## Otimização do mascote

Foi otimizado somente o asset utilizado pelo frontend:

`src/assets/mascote/v2/conversao-comemorando.png`

Resultado:

- dimensões anteriores: 1080 x 1350;
- dimensões atuais: 800 x 1000;
- tamanho anterior: 1.094.527 bytes;
- tamanho atual: 651.137 bytes;
- economia: 443.390 bytes;
- redução aproximada: 40%.

O PNG transparente e a proporção foram preservados.

O original oficial permanece intacto dentro da documentação de branding.

## Arquivos alterados

- `.htaccess`;
- `admin/includes/layout.php`;
- `admin/login.php`;
- `index.html`;
- `src/assets/mascote/v2/conversao-comemorando.png`.

## Arquivos criados

- `public/favicon-48.png`;
- `public/apple-touch-icon.png`;
- `public/icon-192.png`;
- `public/icon-512.png`;
- `public/site.webmanifest`.

## Testes realizados

- leitura do `index.html` original em UTF-8;
- validação dos dados públicos da empresa;
- Schema.org inserido;
- manifesto copiado para o build;
- favicon público validado visualmente;
- favicon administrativo atualizado;
- ícones respondendo HTTP 200;
- MIME do manifesto configurado;
- PHP lint aprovado;
- TypeScript aprovado;
- build Vite aprovado;
- `git diff --check` aprovado;
- mascote otimizado confirmado no build.

## Aviso conhecido

O build continua exibindo o aviso conhecido:

`theme-init.js` não pode ser empacotado sem `type="module"`.

Esse aviso não interrompe o build e o script continua sendo servido pela pasta pública.

## Estado desta entrega

Esta é a primeira entrega técnica da Fase 9.

Ainda permanecem para etapas posteriores:

- otimização adicional da logo pública;
- revisão do ícone de 512 px;
- revisão das fontes externas;
- acessibilidade;
- Lighthouse;
- Core Web Vitals;
- cache de assets;
- checklist de produção.