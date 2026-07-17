# IMPLEMENTACAO SUPORTE E CTA ADMINISTRAVEIS - GNS FIBRA 2.0

Data: 16/07/2026
Fase: Suporte e CTA administraveis de ponta a ponta
Status: implementado localmente, sem staging, commit ou push

## 1. Objetivo

Tornar administraveis os textos principais da secao publica de Suporte e do CTA final, usando o fluxo existente:

`Painel Configuracoes -> settings -> API publica -> normalizacao TypeScript -> componentes React -> fallback local`

Nao foram criadas tabelas novas para suporte, CTA, secoes ou blocos de pagina.

## 2. Settings adicionadas

As chaves ficam na tabela `settings`:

- `support_enabled`
- `support_eyebrow`
- `support_title`
- `support_description`
- `support_button_label`
- `support_whatsapp_message`
- `cta_enabled`
- `cta_eyebrow`
- `cta_title`
- `cta_description`
- `cta_button_label`
- `cta_whatsapp_message`

Valores iniciais preservam o conteudo publico existente:

- Suporte: `ATENDIMENTO GNS FIBRA`, `Atendimento humano para ajudar você de verdade.`, descricao atual, botao `Conhecer planos pelo WhatsApp` e mensagem `Olá! Quero conhecer os planos da GNS Fibra.`
- CTA final: `VAMOS CONECTAR VOCÊ`, `Pronto para falar com a GNS Fibra?`, descricao atual, botao `Falar pelo WhatsApp` e mensagem `Olá! Quero verificar a cobertura e conhecer os planos da GNS Fibra.`

## 3. Banco

Migration criada:

- `database/migration-2026-07-16-add-support-cta-settings.sql`

Caracteristicas:

- idempotente;
- insere apenas chaves ausentes;
- nao altera valores existentes;
- nao cria tabelas novas;
- nao apaga dados.

Tambem foram atualizados:

- `database/seed.sql`, para novas instalacoes;
- `database/schema.sql`, com comentario de contrato das chaves `support_*` e `cta_*`.

## 4. Painel

Arquivo atualizado:

- `admin/configuracoes.php`

O formulario foi agrupado em:

- Empresa e contato;
- Links;
- Hero/Institucional;
- Suporte;
- CTA final.

Validacoes implementadas:

- CSRF obrigatorio;
- rejeicao de campos POST extras;
- trim e remocao/rejeicao de HTML;
- limites de tamanho por campo;
- URL e e-mail validados;
- booleanos normalizados para `0` ou `1`;
- campos de texto obrigatorios quando Suporte ou CTA estiverem ativos;
- campos vazios permitidos quando a respectiva secao estiver desativada;
- gravacao em transacao com prepared statements.

Nao foram adicionados novos itens ao menu do painel.

## 5. API e frontend

A API `api/site-content.php` continua retornando as chaves dentro do mapa `settings`; nao foi criado bloco JSON top-level `support` ou `cta`.

Tipos adicionados:

- `SiteContent.support`
- `SiteContent.cta`

Normalizacao:

- `parseBooleanSetting` aceita `1`, `true`, `yes`, `on` como verdadeiro;
- aceita `0`, `false`, `no`, `off` como falso;
- chave ausente usa fallback local;
- texto vazio vindo da API usa fallback local;
- secao desativada retorna `null` no componente, independentemente dos textos.

Componentes atualizados:

- `src/components/site/Support.tsx`
- `src/components/site/CTASection.tsx`

Regras preservadas:

- layout, mascotes, animacoes, temas e responsividade;
- WhatsApp montado no frontend com `whatsappLink(config.contact.whatsappUrl, mensagem)`;
- URL global do WhatsApp continua em `settings.whatsapp`;
- mensagens de Hero, Planos, FAQ, WhatsApp flutuante e Empresarial nao foram alteradas;
- segundo CTA de Suporte para clientes e Central do Assinante permanecem no fluxo atual.

## 6. Validacoes executadas

Banco:

- migration aplicada duas vezes no banco local configurado;
- contagem final de 12 chaves confirmada;
- valores oficiais restaurados apos testes.

Painel:

- GET autenticado de `admin/configuracoes.php` carregou os 5 grupos;
- POST valido salvou Suporte e CTA;
- Suporte ativo com titulo vazio foi rejeitado e nao alterou o banco;
- HTML/script foi rejeitado;
- limite de tamanho foi rejeitado;
- campo extra foi rejeitado;
- secao desativada aceitou textos vazios;
- CSRF invalido retornou 419 e nao alterou o banco.

API:

- GET retornou as 12 chaves em `settings`;
- POST retornou 405.

Frontend:

- build conectado a API real ocultou Suporte e CTA com `false/0`;
- build conectado a API real exibiu Suporte e CTA com `yes/on`;
- titulo vazio com secao ativa usou fallback local;
- links de WhatsApp usaram a URL global e as mensagens corretas;
- validacao mobile em 390 px sem overflow horizontal.

Comandos:

- `php -l admin/configuracoes.php`
- `php -l admin/beneficios.php`
- `php -l admin/tecnologias.php`
- `php -l admin/dashboard.php`
- `php -l admin/includes/layout.php`
- `php -l admin/includes/simple-crud.php`
- `php -l api/site-content.php`
- `"C:\Program Files\nodejs\npm.cmd" run typecheck`
- `"C:\Program Files\nodejs\npm.cmd" run build`

Observacao: o build manteve o aviso conhecido do Vite sobre `theme-init.js` classico sem `type="module"`.

## 7. Rollback

Rollback funcional:

- definir `support_enabled = 0` e/ou `cta_enabled = 0` em `settings` para ocultar as secoes;
- remover as chaves novas de `settings` faz o frontend voltar ao fallback local;
- reverter os arquivos da fase remove a administracao sem afetar as tabelas existentes.
