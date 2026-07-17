# MATRIZ CONTEUDO PAINEL API FRONTEND - GNS FIBRA

Data: 16/07/2026
Ambiente: local
Status: matriz atualizada apos FAQ, Beneficios, Tecnologias, Suporte e CTA administraveis

## Avisos

- As fases de FAQ, Beneficios, Tecnologias, Suporte e CTA administraveis ja foram implementadas localmente.
- Nenhuma credencial foi registrada.
- A matriz reflete o estado local apos o commit base `ac3cec8` e as alteracoes ainda sem commit desta fase.

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
| Diferenciais | `siteContent.differentials` | `differentials` | `differentials` | `diferenciais.php` | Sim | Dinamico completo |
| Planos | `siteContent.plans` | `plans` | `plans` | `planos.php` | Sim | Dinamico completo |
| Beneficios dos planos | `plan.features` | `plans.benefits` | `plans.benefits` JSON | `planos.php` | Sim | Dinamico parcial |
| Beneficios globais | `siteContent.benefits` | `benefits` | `benefits` | `beneficios.php` | Sim | Dinamico completo |
| Tecnologias | `siteContent.technologies` | `technologies` | `technologies` | `tecnologias.php` | Sim | Dinamico completo |
| Cobertura | `coverageAreas` | `coverage` | `coverage` | `cobertura.php` | Sim | Dinamico completo |
| Mapa geral de cobertura | local + API | `settings.coverage_map_url` + `coverage.map_url` | `settings`, `coverage` | Configuracoes/Cobertura | Sim | Dinamico completo |
| Historia | `config.company.aboutText`, `historyGallery` | `about_text` parcial | `settings` parcial | Configuracoes parcial | Sim | Dinamico parcial |
| Galeria historia | `historyGallery` | Nao | Nao | Nao | Sim | Somente fallback local |
| Suporte | `siteContent.support` + config | `settings.support_*` | `settings` | Configuracoes | Sim | Dinamico completo |
| Canais de suporte | componente + config | `settings.whatsapp`, `support_whatsapp_message` parcial | `settings` parcial | Configuracoes parcial | Sim | Dinamico parcial |
| Depoimentos | `testimonials` | `testimonials` | `testimonials` | `depoimentos.php` | Sim | Dinamico parcial |
| Rating depoimentos | local fixa 5 | Nao | Nao | Nao | Sim | Hardcoded no normalizador |
| FAQs | `siteContent.faqs` | `faqs` | `faqs` | `faqs.php` | Sim | Dinamico completo |
| FAQPage JSON-LD | `FAQ.tsx` | `faqs` | `faqs` | `faqs.php` | Sim | Dinamico completo |
| CTA final textos | `siteContent.cta` | `settings.cta_*` | `settings` | Configuracoes | Sim | Dinamico completo |
| CTA final contatos | config local/API | settings contato | `settings` | Configuracoes | Sim | Dinamico parcial |
| Banners | Nao usado no frontend | `banners` | `banners` | `banners.php` | Nao | Dinamico parcial sem consumo publico |
| Mascotes publicados | imports em componentes | Nao | Nao | Nao | Assets locais | Hardcoded no componente |
| Stats | `siteContent.stats` | `stats` | `stats` | `estatisticas.php` | Sim | Dinamico completo |
| Developer footer | `siteContent.config.developer` | Nao | Nao | Nao | Sim | Somente fallback local |

## Contrato JSON atual da API

Endpoint:

- `api/site-content.php`

Campos reais retornados:

```json
{
  "settings": {},
  "plans": [],
  "stats": [],
  "differentials": [],
  "coverage": [],
  "testimonials": [],
  "banners": [],
  "benefits": [],
  "technologies": [],
  "faqs": [],
  "generated_at": ""
}
```

Campos nao retornados hoje:

- `navigation`
- `historyGallery`
- `support`
- `cta`
- `mascots`
- `analytics`

## Conteudos locais e fallback

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

Itens locais. Sem tabela, painel ou API.

### Diferenciais

Arquivos: `src/lib/site-content.ts`, `api/site-content.php`, `admin/diferenciais.php`

Cinco cards locais preservados como fallback e agora tambem existentes em `differentials`, administrados pelo painel e entregues pela API publica quando o banco esta disponivel.

Regras:

- `slug` e o id logico usado no frontend;
- `differentials: []` e respeitado e oculta a secao;
- API sem `differentials` ou indisponivel usa fallback local;
- registros sem slug, titulo ou descricao sao ignorados individualmente;
- icone desconhecido usa fallback visual seguro `wifi`.

### Beneficios

Arquivos: `src/lib/site-content.ts`, `api/site-content.php`, `admin/beneficios.php`

Quatro itens locais:

- Wi-Fi para conectar seus dispositivos;
- atendimento proximo e humanizado;
- pagamento com praticidade;
- mais seguranca para sua rotina.

Os quatro itens permanecem no fallback local, mas agora tambem existem em `benefits`, sao administrados pelo painel e entregues pela API publica quando o banco esta disponivel.

Regras:

- `slug` e o id logico usado no frontend;
- `camera-seguranca` so aparece quando algum plano publico possui feature contendo "camera" ou "câmera";
- `benefits: []` e respeitado e oculta a secao;
- API sem `benefits` ou indisponivel usa fallback local;
- icone desconhecido usa fallback visual seguro.

### Tecnologias

Arquivos: `src/lib/site-content.ts`, `api/site-content.php`, `admin/tecnologias.php`

Quatro itens locais:

- fibra optica;
- Wi-Fi;
- rede monitorada;
- casa e empresa.

Os quatro itens permanecem no fallback local, mas agora tambem existem em `technologies`, sao administrados pelo painel e entregues pela API publica quando o banco esta disponivel.

Regras:

- `slug` e o id logico usado no frontend;
- `technologies: []` e respeitado e oculta a secao;
- API sem `technologies` ou indisponivel usa fallback local;
- registros sem slug, nome, descricao ou disponibilidade sao ignorados individualmente;
- icone desconhecido usa fallback visual seguro `network`;
- mascote Wi-Fi Turbo e aviso tecnico final permanecem no componente.

### FAQs

Arquivos: `src/lib/site-content.ts`, `api/site-content.php`, `admin/faqs.php`

As sete perguntas permanecem no fallback local, mas agora tambem existem em `faqs`, sao administradas pelo painel e entregues pela API publica quando o banco esta disponivel.

### Suporte

Arquivos: `src/lib/site-content.ts`, `src/services/site-content-service.ts`, `src/components/site/Support.tsx`, `api/site-content.php`, `admin/configuracoes.php`

Campos principais agora ficam em `settings.support_*` e sao editados no grupo Suporte de Configuracoes.

Regras:

- `support_enabled` controla exibicao da secao;
- `support_eyebrow`, `support_title`, `support_description`, `support_button_label` e `support_whatsapp_message` usam fallback local quando ausentes ou vazios;
- URL do WhatsApp continua vindo de `settings.whatsapp`;
- segundo CTA de cliente e Central do Assinante permanecem no fluxo atual.

### CTA

Arquivos: `src/lib/site-content.ts`, `src/services/site-content-service.ts`, `src/components/site/CTASection.tsx`, `api/site-content.php`, `admin/configuracoes.php`

Campos principais agora ficam em `settings.cta_*` e sao editados no grupo CTA final de Configuracoes.

Regras:

- `cta_enabled` controla exibicao da secao;
- `cta_eyebrow`, `cta_title`, `cta_description`, `cta_button_label` e `cta_whatsapp_message` usam fallback local quando ausentes ou vazios;
- URL do WhatsApp, e-mail e telefone continuam vindo das configuracoes globais.

### Mascotes

Arquivos importam assets diretamente:

- Hero;
- Technologies;
- Business;
- Support;
- FAQ;
- CTASection.

Nao ha painel/API/banco para mascotes.

### Stats

Arquivos: `src/lib/site-content.ts`, `api/site-content.php`, `admin/estatisticas.php`

Quatro estatisticas locais preservadas como fallback e agora tambem existentes em `stats`, administradas pelo painel e entregues pela API publica quando o banco esta disponivel.

Regras:

- `slug` e o id logico usado no frontend;
- `value` permanece texto, sem conversao numerica;
- `stats: []` e respeitado e oculta a secao;
- API sem `stats` ou indisponivel usa fallback local;
- registros sem slug, valor ou rotulo sao ignorados individualmente;
- os valores `100%` e `24/H` foram preservados por existirem no conteudo atual, mas exigem confirmacao futura antes de campanhas.

## Tipos publicos normalizados

O TypeScript possui:

- `benefits`
- `technologies`
- `faqs`
- `support`
- `cta`
- `stats`
- `differentials`

`src/services/site-content-service.ts` agora le `faqs`, `benefits`, `technologies`, `support_*` e `cta_*` da API.

## Modulos atuais por fonte

| Modulo | Painel | Banco | API | Frontend |
| --- | --- | --- | --- | --- |
| Dashboard | Sim | contagens | Nao | Nao |
| Planos | Sim | Sim | Sim | Sim |
| Estatisticas | Sim | Sim | Sim | Sim |
| Diferenciais | Sim | Sim | Sim | Sim |
| Banners | Sim | Sim | Sim | Nao |
| Cobertura | Sim | Sim | Sim | Sim |
| Depoimentos | Sim | Sim | Sim | Sim |
| Configuracoes | Sim | Sim | Sim | Sim parcial |
| Usuarios | Sim | Sim | Nao | Nao |
| Login/logout | Sim | `users`, `login_attempts` | Nao | Nao |
| FAQ | Sim | Sim | Sim | Sim |
| Suporte | Sim via Configuracoes | Sim | Sim | Sim |
| CTA final | Sim via Configuracoes | Sim | Sim | Sim |
| Beneficios | Sim | Sim | Sim | Sim |
| Tecnologias | Sim | Sim | Sim | Sim |

## Lacunas para Painel 2.0

Prioridade alta:

1. revisar em homologacao os fluxos ja implementados de FAQ, Beneficios, Tecnologias, Suporte e CTA.
2. revisar Estatisticas e Diferenciais administraveis em ambiente local/homologacao.
3. definir se Historia continua local ou entra em nova fase administravel.
4. manter mascotes e banners publicos fora do painel ate haver governanca de assets.

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
2. Revisar Beneficios administraveis em ambiente local/homologacao.
3. Revisar Tecnologias administraveis em ambiente local/homologacao.
4. Revisar Suporte/CTA via settings em ambiente local/homologacao.
5. Depois revisar menu, logs, roles e modulos de marketing.
