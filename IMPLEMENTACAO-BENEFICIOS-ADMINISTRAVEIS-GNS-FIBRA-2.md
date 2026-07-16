# IMPLEMENTACAO BENEFICIOS ADMINISTRAVEIS - GNS FIBRA 2.0

Data: 16/07/2026
Fase: Beneficios administraveis de ponta a ponta
Status: implementado localmente, sem commit

## 1. Escopo

Esta fase implementa o segundo modulo funcional do Painel Administrativo 2.0:

`Banco MySQL -> CRUD PHP -> API publica -> normalizacao TypeScript -> SiteContentProvider -> Benefits existente`

Nao foram implementados:

- Tecnologias;
- Diferenciais;
- Suporte administravel;
- CTA administravel;
- Planos;
- Roles;
- Logs administrativos;
- Campanhas;
- Leads;
- IXC;
- Analytics.

## 2. Migration e tabela

Arquivo criado:

- `database/migration-2026-07-16-create-benefits.sql`

Tabela:

- `benefits`

Campos:

- `id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY`
- `slug VARCHAR(100) NOT NULL`
- `icon VARCHAR(50) NOT NULL`
- `title VARCHAR(180) NOT NULL`
- `description TEXT NOT NULL`
- `cta_label VARCHAR(120) NULL`
- `cta_href VARCHAR(500) NULL`
- `active TINYINT(1) NOT NULL DEFAULT 1`
- `display_order INT NOT NULL DEFAULT 0`
- `created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`
- `updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`

Indices:

- `uq_benefits_slug (slug)`
- `idx_benefits_active_order (active, display_order, id)`

A migration usa `CREATE TABLE IF NOT EXISTS`, nao executa `DROP`, `TRUNCATE` ou alteracao destrutiva e insere seed somente quando a tabela esta vazia.

## 3. Seed inicial

Foram copiados exatamente os quatro beneficios locais de `src/lib/site-content.ts`:

| Ordem | Slug | Icone | Titulo |
| ---: | --- | --- | --- |
| 10 | `wifi-incluso` | `wifi` | Wi-Fi para conectar seus dispositivos |
| 20 | `atendimento-humano` | `headset` | Atendimento proximo e humanizado |
| 30 | `pagamento-flexivel` | `credit-card` | Pagamento com praticidade |
| 40 | `camera-seguranca` | `camera` | Mais seguranca para sua rotina |

Nenhum CTA foi inserido no seed porque o conteudo local atual nao possui CTA nos beneficios.

`database/schema.sql` foi atualizado para instalacoes novas. `database/seed.sql` recebeu insercao idempotente para `benefits`, sem sobrescrever conteudo quando a tabela ja possui registros.

## 4. CRUD administrativo

Arquivo criado:

- `admin/beneficios.php`

O modulo usa `run_simple_crud()` e fica disponivel no menu como `Beneficios`, posicionado apos `Planos`.

Campos:

- `slug`: obrigatorio, maximo 100, somente letras minusculas, numeros e hifen, unico.
- `icon`: select obrigatorio com whitelist interna.
- `title`: obrigatorio, maximo 180.
- `description`: textarea obrigatorio, maximo 2000, tags removidas.
- `cta_label`: opcional, maximo 120, sem HTML.
- `cta_href`: opcional, maximo 500, sem HTML, protocolos restritos.
- `display_order`: inteiro de 0 a 10000.
- `active`: checkbox.

O painel documenta no campo `slug` que `camera-seguranca` possui comportamento especial no site.

## 5. Evolucao do simple-crud

Arquivo atualizado:

- `admin/includes/simple-crud.php`

Recursos genericos adicionados:

- campo `select` com labels/values escapados;
- validacao de valor em whitelist para `select`;
- `pattern` e mensagem customizada;
- `unique` por campo com prepared statement;
- callback `validate` por campo;
- callback global `validate`;
- rejeicao opcional de campos extras enviados pelo cliente;
- validacao de URL com protocolos permitidos, hash interno e HTTP local opcional;
- bloqueio opcional de HTML;
- mensagem amigavel para erro de chave duplicada;
- texto de ajuda por campo.

Nao ha regra hardcoded de beneficios no helper.

## 6. Whitelist de icones

Icones aceitos no painel:

- `wifi`
- `headset`
- `credit-card`
- `camera`
- `tv`

O frontend usa fallback visual seguro `wifi` para icones desconhecidos vindos da API. `check-circle` nao foi adicionado ao contrato de `IconName` nesta fase.

## 7. CTA e seguranca

`cta_label` e `cta_href` sao opcionais, mas devem ser preenchidos em par.

Protocolos aceitos:

- `https`
- `mailto`
- `tel`
- hash interno no formato `#contato`
- `http` apenas para host local (`localhost`, `127.0.0.1`, `::1`, `.localhost`, `.test`)

Foram bloqueados:

- `javascript:`
- `data:`
- `vbscript:`
- HTML;
- URL malformada;
- URL sem label;
- label sem URL.

O normalizador TypeScript tambem descarta CTA inseguro antes de chegar ao DOM.

## 8. API publica

Arquivo atualizado:

- `api/site-content.php`

Novo bloco:

```json
"benefits": [
  {
    "id": 1,
    "slug": "wifi-incluso",
    "icon": "wifi",
    "title": "Wi-Fi para conectar seus dispositivos",
    "description": "Equipamentos e recursos definidos conforme o plano contratado e a viabilidade técnica.",
    "cta_label": null,
    "cta_href": null,
    "active": true,
    "display_order": 10
  }
]
```

A API retorna apenas beneficios ativos, ordenados por `display_order, id`, sem `created_at` ou `updated_at`.

Preservado:

- `settings`;
- `plans`;
- `coverage`;
- `testimonials`;
- `banners`;
- `faqs`;
- `generated_at`;
- metodo `GET`;
- `POST` com HTTP 405 e `Allow: GET`;
- erro generico sem detalhes SQL.

## 9. TypeScript, fallback e array vazio

Arquivo atualizado:

- `src/services/site-content-service.ts`

Regras implementadas:

- `benefits` ausente usa fallback local;
- API indisponivel usa fallback local;
- `benefits: []` e respeitado e oculta a secao;
- registros sem slug, titulo ou descricao sao ignorados individualmente;
- `slug` vira o `benefit.id` logico;
- `id` numerico da API nao e usado como id publico do beneficio;
- ordem recebida da API e preservada;
- icone desconhecido usa fallback visual seguro `wifi`;
- CTA inseguro e descartado.

O tipo publico `SiteContent` nao precisou ser alterado porque ja continha `benefits`.

## 10. Regra especial da camera

Preservado em `src/components/site/Benefits.tsx`:

- o beneficio com id/slug `camera-seguranca` so aparece quando algum plano publico possui uma feature contendo "camera" ou "câmera";
- se o beneficio estiver inativo ou inexistente, ele nao aparece e a secao continua funcionando;
- se o administrador alterar o slug, a regra deixa de reconhece-lo.

Essa regra nao foi transformada em opcao livre nesta fase.

## 11. Validacoes executadas

Banco e migration:

- `SHOW TABLES LIKE 'benefits'` antes: vazio.
- primeira execucao da migration criou a tabela e inseriu 4 registros.
- `DESCRIBE benefits` confirmou campos e tipos.
- `SHOW INDEX FROM benefits` confirmou `PRIMARY`, `uq_benefits_slug` e `idx_benefits_active_order`.
- segunda execucao manteve 4 registros, sem duplicacao.

CRUD:

- listagem dos quatro beneficios oficiais;
- criacao, edicao, alteracao de icone, ordem, desativacao, reativacao e exclusao de registro artificial;
- estado vazio no painel;
- exclusao de todos os beneficios e restauracao via migration;
- cancelamento do formulario verificado pelo link `Cancelar`;
- titulo vazio, descricao vazia, slug vazio, slug invalido, slug duplicado;
- icone fora da whitelist;
- ordem negativa e acima de 10000;
- CTA label sem URL e URL sem label;
- `javascript:` bloqueado;
- HTTPS, hash interno, `mailto:` e `tel:` aceitos;
- acentos, aspas e texto semelhante a script tratados com escape/remocao de tags;
- CSRF invalido retornou HTTP 419;
- ID inexistente em salvar/excluir nao alterou dados.

API:

- `GET api/site-content.php`: HTTP 200, 4 beneficios ativos, ordem 10 a 40, campos anteriores intactos.
- `POST api/site-content.php`: HTTP 405, `Allow: GET`.
- beneficios inativos nao aparecem.

Site:

- beneficios da API aparecem no site;
- ordem administrativa refletida;
- CTA opcional aparece somente quando label e href sao seguros;
- `benefits: []` oculta a secao;
- registro invalido no meio e ignorado;
- icone desconhecido usa fallback visual;
- API invalida/indisponivel cai para fallback local;
- regra da camera validada com plano contendo camera, sem plano contendo camera, beneficio inativo, beneficio inexistente e slug alterado.

Visual:

- Dark e Light validados;
- larguras 360, 390, 414, 430, 768 e 1280 px sem overflow horizontal;
- texto "Escolha com tranquilidade" preservado;
- console do app sem erros. Mensagens externas de Statsig/ChatGPT foram observadas no ambiente de automacao, nao originadas pela aplicacao.

Regressoes:

- paginas admin `planos.php`, `banners.php`, `cobertura.php`, `depoimentos.php` e `faqs.php` responderam HTTP 200;
- API preservou planos, cobertura, depoimentos, banners e FAQs.

Validacoes tecnicas:

- `php -l` aprovado nos PHP alterados;
- `npm run typecheck` aprovado;
- `npm run build` aprovado, mantendo o aviso conhecido de `theme-init.js`;
- `npm audit` executado sem `audit fix`, com 1 vulnerabilidade baixa conhecida em `esbuild`.

## 12. Implantacao e rollback

Implantacao recomendada:

1. fazer backup do banco;
2. publicar codigo;
3. executar `database/migration-2026-07-16-create-benefits.sql`;
4. executar a migration uma segunda vez para confirmar idempotencia;
5. validar API publica;
6. validar painel `admin/beneficios.php`;
7. validar site em Dark/Light e mobile.

Rollback manual seguro:

1. exportar dados da tabela `benefits`;
2. restaurar codigo anterior se necessario;
3. manter a tabela sem uso;
4. remover temporariamente `benefits` da API apenas se for preciso;
5. avaliar `DROP TABLE benefits` somente manualmente, apos backup e confirmacao.

Nao foi criado rollback destrutivo automatico.

## 13. Pendencias

- Soft delete continua pendencia futura.
- Logs administrativos continuam pendencia futura.
- Roles/permissoes continuam pendencia futura.
- Tecnologias administraveis sao a proxima etapa recomendada.
