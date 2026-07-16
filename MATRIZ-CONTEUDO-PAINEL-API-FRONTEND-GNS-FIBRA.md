# MATRIZ CONTEUDO PAINEL API FRONTEND - GNS FIBRA

Data: 16/07/2026
Ambiente: local
Status: diagnostico, sem alteracao funcional

## Avisos

- Nenhuma migration foi executada.
- Nenhum banco foi alterado.
- Nenhum codigo foi alterado.
- Nenhuma credencial foi registrada.
- A matriz reflete o estado real observado no commit `86096e9`.

## Legenda de status

- Dinamico completo: painel, banco, API e frontend integrados.
- Dinamico parcial: parte do fluxo e dinamica, mas ha lacunas.
- Somente fallback local: existe no React local, sem banco/API/painel.
- Hardcoded no componente: definido diretamente em componente.
- Inexistente: nao existe ainda.
- Preparado para futuro: tipos/documentos existem, mas fluxo real nao.

## Matriz principal

| Campo | Fonte local | API | Banco | Painel | Fallback | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Configuracoes basicas | `siteContent.config` | `settings` | `settings` | `configuracoes.php` | Sim | Dinamico parcial |
| Nome da empresa | local + API | `settings.company_name` | `settings` | Configuracoes | Sim | Dinamico completo |
| WhatsApp base | local + API | `settings.whatsapp` | `settings` | Configuracoes | Sim | Dinamico completo |
| E-mail | local + API | `settings.email` | `settings` | Configuracoes | Sim | Dinamico completo |
| Endereco | local + API | `settings.address` | `settings` | Configuracoes | Sim | Dinamico completo |
| Central do Assinante | local + API | `settings.customer_portal_url` | `settings` | Configuracoes | Sim | Dinamico completo |
| Linktree/Facebook/Instagram | local + API | settings | `settings` | Configuracoes | Sim | Dinamico parcial |
| Hero title | local + API | `settings.hero_title` | `settings` | Configuracoes | Sim | Dinamico completo |
| About text | local + API | `settings.about_text` | `settings` | Configuracoes | Sim | Dinamico completo |
| Anos de mercado | local + API | `settings.years_in_market` | `settings` | Configuracoes | Sim | Dinamico completo |
| Navegacao | `siteContent.navigation` | Nao | Nao | Nao | Sim | Somente fallback local |
| Diferenciais | `siteContent.differentials` | Nao | Nao | Nao | Sim | Somente fallback local |
| Planos | `siteContent.plans` | `plans` | `plans` | `planos.php` | Sim | Dinamico completo |
| Beneficios dos planos | `plan.features` | `plans.benefits` | `plans.benefits` JSON | `planos.php` | Sim | Dinamico parcial |
| Beneficios globais | `siteContent.benefits` | Nao | Nao | Nao | Sim | Somente fallback local |
| Tecnologias | `siteContent.technologies` | Nao | Nao | Nao | Sim | Somente fallback local |
| Cobertura | `coverageAreas` | `coverage` | `coverage` | `cobertura.php` | Sim | Dinamico completo |
| Mapa geral de cobertura | local + API | `settings.coverage_map_url` + `coverage.map_url` | `settings`, `coverage` | Configuracoes/Cobertura | Sim | Dinamico completo |
| Historia | `config.company.aboutText`, `historyGallery` | `about_text` parcial | `settings` parcial | Configuracoes parcial | Sim | Dinamico parcial |
| Galeria historia | `historyGallery` | Nao | Nao | Nao | Sim | Somente fallback local |
| Suporte | componente + config | settings contato apenas | `settings` parcial | Configuracoes parcial | Sim | Hardcoded no componente |
| Canais de suporte | componente + config | settings contato apenas | `settings` parcial | Configuracoes parcial | Sim | Dinamico parcial |
| Depoimentos | `testimonials` | `testimonials` | `testimonials` | `depoimentos.php` | Sim | Dinamico parcial |
| Rating depoimentos | local fixa 5 | Nao | Nao | Nao | Sim | Hardcoded no normalizador |
| FAQs | `siteContent.faqs` | `faqs` | `faqs` | `faqs.php` | Sim | Dinamico completo |
| FAQPage JSON-LD | `FAQ.tsx` | `faqs` | `faqs` | `faqs.php` | Sim | Dinamico completo |
| CTA final textos | `CTASection.tsx` | Nao | Nao | Nao | Sim | Hardcoded no componente |
| CTA final contatos | config local/API | settings contato | `settings` | Configuracoes | Sim | Dinamico parcial |
| Banners | Nao usado no frontend | `banners` | `banners` | `banners.php` | Nao | Dinamico parcial sem consumo publico |
| Mascotes publicados | imports em componentes | Nao | Nao | Nao | Assets locais | Hardcoded no componente |
| Stats | `siteContent.stats` | Nao | Nao | Nao | Sim | Somente fallback local |
| Developer footer | `siteContent.config.developer` | Nao | Nao | Nao | Sim | Somente fallback local |

## Contrato JSON atual da API

Endpoint:

- `api/site-content.php`

Campos reais retornados:

```json
{
  "settings": {},
  "plans": [],
  "coverage": [],
  "testimonials": [],
  "banners": [],
  "faqs": [],
  "generated_at": ""
}
```

Campos nao retornados hoje:

- `navigation`
- `differentials`
- `benefits`
- `technologies`
- `stats`
- `historyGallery`
- `support`
- `cta`
- `mascots`
- `analytics`

## Conteudos ainda locais

### Navegacao

Arquivo: `src/lib/site-content.ts`

Itens:

- Inicio
- Planos
- Empresarial
- Cobertura
- Quem Somos
- FAQ
- Contato

Painel/API: inexistentes.

### Diferenciais

Arquivo: `src/lib/site-content.ts`

Cinco cards locais. Sem tabela e sem API.

### Beneficios

Arquivo: `src/lib/site-content.ts`

Quatro itens locais:

- Wi-Fi para conectar seus dispositivos;
- atendimento proximo e humanizado;
- pagamento com praticidade;
- mais seguranca para sua rotina.

Painel/API: inexistentes.

### Tecnologias

Arquivo: `src/lib/site-content.ts`

Quatro itens locais:

- fibra optica;
- Wi-Fi;
- rede monitorada;
- casa e empresa.

Painel/API: inexistentes.

### FAQs

Arquivos: `src/lib/site-content.ts`, `api/site-content.php`, `admin/faqs.php`

As sete perguntas permanecem no fallback local, mas agora tambem existem em `faqs`, sao administradas pelo painel e entregues pela API publica quando o banco esta disponivel.

### Suporte

Arquivo: `src/components/site/Support.tsx`

Textos e cards de acao estao no componente. Contatos usam config dinamica.

### CTA

Arquivo: `src/components/site/CTASection.tsx`

Textos e mensagem WhatsApp estao no componente. WhatsApp/e-mail/telefone usam config dinamica.

### Mascotes

Arquivos importam assets diretamente:

- Hero;
- Technologies;
- Business;
- Support;
- FAQ;
- CTASection.

Nao ha painel/API/banco para mascotes.

## Campos preparados para futuro

O TypeScript ja possui:

- `benefits`
- `technologies`
- `faqs`

`src/services/site-content-service.ts` agora le `faqs` da API. `benefits` e `technologies` continuam preparados apenas no fallback.

## Modulos atuais por fonte

| Modulo | Painel | Banco | API | Frontend |
| --- | --- | --- | --- | --- |
| Dashboard | Sim | contagens | Nao | Nao |
| Planos | Sim | Sim | Sim | Sim |
| Banners | Sim | Sim | Sim | Nao |
| Cobertura | Sim | Sim | Sim | Sim |
| Depoimentos | Sim | Sim | Sim | Sim |
| Configuracoes | Sim | Sim | Sim | Sim parcial |
| Usuarios | Sim | Sim | Nao | Nao |
| Login/logout | Sim | `users`, `login_attempts` | Nao | Nao |
| FAQ | Sim | Sim | Sim | Sim |
| Suporte | Nao | Nao | Nao | Sim local/com config |
| Beneficios | Nao | Nao | Nao | Sim local |
| Tecnologias | Nao | Nao | Nao | Sim local |

## Lacunas para Painel 2.0

Prioridade alta:

1. `benefits` no banco, painel e API.
2. `technologies` no banco, painel e API.
3. suporte/atendimento administravel, provavelmente via settings no inicio.
4. CTA/Contato administravel, provavelmente via settings no inicio.

Prioridade posterior:

- diferenciais;
- historia/galeria;
- mascotes e banners integrados ao frontend;
- campanhas;
- indicacoes;
- leads;
- integracoes;
- analytics;
- logs administrativos.

## Recomendacao

Nao tentar tornar todo o conteudo dinamico de uma vez. A ordem mais segura e:

1. Revisar o FAQ administravel em ambiente local/homologacao.
2. Beneficios, com allowlist de icones e seed do conteudo atual.
3. Tecnologias, com aprovacao de termos tecnicos.
4. Suporte/CTA via settings.
5. Depois revisar menu, logs, roles e modulos de marketing.
