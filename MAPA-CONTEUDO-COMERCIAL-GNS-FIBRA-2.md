# MAPA DE CONTEUDO COMERCIAL - GNS FIBRA 2.0

Data: 14/07/2026
Fase: Planos, beneficios e tecnologias
Status: contrato atual preservado; sem alteracao de API, painel, banco ou migrations

## 1. Origem dos planos atuais

Fluxo publico:

1. `SiteContentProvider` inicia com fallback local de `src/lib/site-content.ts`.
2. `apiContentProvider` busca `api/site-content.php`.
3. A API le o banco via `config/database.php`.
4. Os planos vem da tabela `plans`, somente com `active = 1`.
5. A ordenacao publicada e `display_order, id`.
6. Se a API falhar, o frontend usa integralmente o fallback local.

Fluxo administrativo atual:

- Painel: `admin/planos.php`.
- Tabela: `plans`.
- API publica: `api/site-content.php`.
- Normalizador frontend: `src/services/site-content-service.ts`.

## 2. Campos atuais

| Campo comercial | Origem banco/API | Frontend atual | Observacao |
| --- | --- | --- | --- |
| Nome | `plans.name` | `plan.name` | Preservado |
| Velocidade | `plans.speed` | `plan.speed` | Preservado como string |
| Unidade | `plans.unit` | `plan.unit` | Preservado |
| Preco | `plans.price` | `plan.price` formatado pt-BR | Preservado; card tolera valor ausente/zero como sob consulta |
| Descricao curta | `plans.audience` | `plan.audience` | Preservado |
| Beneficios | `plans.benefits` JSON | `plan.features` | Preservado e limitado visualmente nos cards |
| Forma de pagamento | `plans.payment_method` | adicionado em `features` se nao duplicado | Preservado |
| Destaque | `plans.featured` | `plan.highlight` | Preservado |
| Selo | derivado de `featured` | `plan.badge` | Hoje "Mais contratado" |
| Status | `plans.active` | filtrado pela API | Preservado |
| Ordem | `plans.display_order` | ordem da API | Preservado |

## 3. Conteudo atual do site

O fallback local contem os planos:

- Start 95 MEGA;
- Premium 300 MEGA;
- Ultra 600 MEGA;
- Security 700 MEGA;
- Evolution 800 MEGA;
- Extreme 1000 MEGA;
- Extreme Combo 1000 MEGA.

Beneficios atualmente publicados nos planos:

- ponto Wi-Fi ou Wi-Fi 5;
- atendimento humano e digital;
- pagamento por boleto ou PIX;
- camera de seguranca no plano Security;
- cartao de credito ou debito em conta nos planos cadastrados com esse metodo.

Esses dados foram preservados. Nomes, velocidades, precos, beneficios, regras e textos legais nao foram alterados.

## 4. Estrutura necessaria

Para a experiencia nova, a estrutura futura ideal deve separar:

- Planos: oferta comercial, velocidade, preco, destaque, CTA e resumo.
- Beneficios: vantagens administraveis independentes do card do plano.
- Tecnologias: explicacao tecnica com disponibilidade por plano/regiao.

Campos futuros sugeridos para planos:

- `wifi_technology`;
- `subtitle`;
- `main_benefit`;
- `badge`;
- `quote_only`;
- `category`;
- `tier`;
- `display_order`;
- `featured`;
- `active`.

Campos futuros sugeridos para beneficios:

- `title`;
- `description`;
- `icon`;
- `image_path`;
- `cta_label`;
- `cta_url`;
- `display_order`;
- `active`.

Campos futuros sugeridos para tecnologias:

- `name`;
- `description`;
- `icon`;
- `availability`;
- `display_order`;
- `active`.

## 5. Possiveis dados novos

A matriz interna mencionada para fase futura inclui:

- Start;
- Basic;
- Premium;
- Deluxe;
- Ultra;
- Evolution;
- Extreme;
- Wi-Fi 5, Wi-Fi Plus, Wi-Fi 6, Wi-Fi 7;
- XGS-PON;
- GNS TV, GNS TV Plus, streaming;
- camera IP;
- Mesh;
- telefone fixo.

Esses dados nao foram publicados nesta fase porque dependem de confirmacao formal.

## 6. Confirmacao pendente

Antes de publicar novos dados comerciais, confirmar:

- nomes finais dos planos;
- velocidades finais;
- precos;
- fidelidade;
- comodato;
- beneficios por plano;
- disponibilidade por cidade/bairro;
- tecnologias por plano;
- regras de camera, TV, streaming, Mesh e telefone;
- textos legais e restricoes.

## 7. Impacto no painel/API/banco

Nesta fase:

- sem alteracao no painel;
- sem alteracao em `api/site-content.php`;
- sem migration;
- sem nova tabela;
- sem mudanca obrigatoria no contrato da API.

Impacto futuro previsto:

- adicionar tabelas `benefits` e `technologies`;
- expandir `plans` com campos opcionais;
- versionar o contrato da API ou manter fallbacks rigorosos;
- adaptar o painel para beneficios e tecnologias com ordem e status;
- preservar fallback local quando a API nao entregar os novos blocos.

## 8. Riscos

- A API atual nao diferencia beneficio principal, tecnologia Wi-Fi e beneficio comercial; o frontend infere visualmente a partir de `benefits`.
- Preco "sob consulta" ainda nao existe como campo semantico; o frontend apenas tolera preco vazio/zero.
- Novas tecnologias nao devem ser publicadas sem confirmacao de disponibilidade.
- Beneficios futuros exigem painel proprio para evitar listas longas dentro dos cards de planos.
