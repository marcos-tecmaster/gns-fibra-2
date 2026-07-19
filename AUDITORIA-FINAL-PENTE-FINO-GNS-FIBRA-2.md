# Auditoria final pente-fino — GNS Fibra 2.0

Data da auditoria: 18/07/2026

Diretório: `C:\laragon\www\gns-fibra-2`

Escopo: código, arquivos, banco local, API, painel, frontend, uploads, build, SEO, segurança e documentação.

## 1. Estado do Git

- Branch: `main`.
- HEAD inicial: `35a6dde fix: improve footer link accessibility`.
- `main` sincronizada com `origin/main` no início.
- A alteração do Footer citada no roteiro já estava commitada; não existia diff pendente.
- Estado inicial: limpo, sem staged, sem não rastreados e sem stash.
- Revalidação do baseline: o histórico começa em `35a6dde`, seguido de `e367b3b`, `34b20d9`, `352d58a`, `7b5bee4`, `ac3cec8` e `e23bb1e`.
- A reexecução de `git diff --check` foi aprovada; `git diff --cached --name-only` e `git stash list` permaneceram vazios.
- O estado atual não é mais limpo exclusivamente porque esta auditoria criou três relatórios e alterou `.htaccess`; nenhuma pendência de `src/components/site/Footer.tsx` reapareceu.
- Nenhum `git add`, commit ou push foi executado nesta auditoria.

## 2. Inventário resumido

- 151 arquivos rastreados antes dos três relatórios desta fase.
- Distribuição: raiz 44; `admin` 21; `api` 1; `config` 5; `database` 13; `docs` 16; `public` 6; `src` 37; `uploads` 8.
- `dist`, `node_modules` e `config/database.local.php` estão ignorados.
- Não existe diretório de scripts auxiliares dedicado.
- Inventário por arquivo: `MAPA-ARQUIVOS-ASSETS-E-REFERENCIAS-GNS-FIBRA-2.md`.

## 3. Estrutura de pastas

| Pasta | Função | Avaliação |
|---|---|---|
| `admin` | Painel PHP e CSS compartilhado | Clara e funcional |
| `api` | Endpoint público de conteúdo | Clara |
| `config` | Banco, autenticação e headers | Clara; acesso web bloqueado |
| `database` | Schema, seed, migrations e criação CLI de usuário | Clara; divergência de nome de banco |
| `docs` | Acervo de marca e originais | Clara, porém pesada (aprox. 16,1 MB) |
| `public` | Logo, favicon, OG, robots, sitemap e script de tema | Clara |
| `src` | Aplicação React, fallbacks e assets compiláveis | Clara |
| `uploads` | Imagens administráveis | Clara; quatro imagens oficiais versionadas |
| `dist` | Artefato gerado e ignorado | Correto; não editar manualmente |

Pastas vazias preservadas por `.gitkeep`: `uploads/galeria`, `uploads/logos` e `docs/branding/mascote/otimizados`. `uploads/galeria` é legado/candidato a revisão; `uploads/logos` está reservado ao plano de identidade.

## 4. Arquivos duplicados

Duplicações por SHA256 confirmadas e atualmente justificadas como fallback/artefato oficial:

| Hash | Arquivos | Motivo atual |
|---|---|---|
| `22FA0B1A...A97D291` | `public/og-image.jpg`, `src/assets/hero-fiber.jpg`, banner oficial | OG, fallback compilado e upload administrável |
| `448DFDDB...CC268E1` | `src/assets/fiber-bundle.jpg`, upload CTA | fallback e upload administrável |
| `AA99C063...524E12E` | `src/assets/datacenter.jpg`, upload Cobertura | fallback e upload administrável |
| `9149AA9C...0CD1769` | `src/assets/install.jpg`, `uploads/history/install.jpg` | fallback e upload administrável |

Não remover fallbacks enquanto a API puder falhar ou o banco puder retornar caminho vazio/inválido.

## 5. Arquivos órfãos

- Nenhum upload físico órfão.
- `src/content/index.ts` é candidato a código morto: exporta `contentProvider`, mas os consumidores importam diretamente `SiteContentProvider` ou o serviço.
- `uploads/galeria/.gitkeep` não possui módulo consumidor atual; manter até decisão de legado.
- Nenhum componente TSX público ficou sem caminho de importação.
- Nenhuma exclusão foi executada.

## 6. Referências quebradas

- Nenhuma imagem quebrada no frontend ou nas 14 páginas autenticadas inspecionadas.
- Nenhuma âncora interna aponta para seção ausente.
- Nenhum upload referenciado aponta para arquivo ausente.
- Nenhum `javascript:` ou link `#` sem função foi encontrado no código de aplicação.
- Achado funcional: os campos de texto e botão de Banners chegam à API/normalizador, mas o Hero consome somente `image`.
- Achado funcional: `coverage.description` chega ao frontend, mas a seção Cobertura mostra apenas `region` e `mapUrl`.

## 7. Uploads

| Arquivo físico | Origem da referência | Estado |
|---|---|---|
| `uploads/banners/aa600cfdc6e7513743ae73286e957a93.jpg` | `banners.image_path` | válido/presente |
| `uploads/history/install.jpg` | `history_gallery.image_path` | válido/presente |
| `uploads/coverage/9d5a2f1e67396dc16b49e30550b02c52.jpg` | `settings.coverage_image_path` | válido/presente |
| `uploads/cta/9c0d1bd3dbaafb209599ebdf3dbfccd3.jpg` | `settings.cta_background_image_path` | válido/presente |

Listas solicitadas: (1) quatro físicos com referência válida; (2) quatro referências com físico; (3) zero órfãos; (4) zero referências ausentes.

Segurança: MIME real por `finfo`, JPG/PNG/WebP, limite 5 MB, nome aleatório de 32 hex, proteção contra traversal na exclusão, `Options -Indexes` e bloqueio de PHP em `uploads/.htaccess`. Os quatro arquivos oficiais são exceções específicas do `.gitignore`; uploads futuros continuam ignorados.

## 8. Logo e identidade

- Logo oficial: `public/logo-gns.png`, 1080×1080, 2.156.795 bytes, SHA256 `317274AA99C55E13BC47EDA12DFF7BE76D34693B3D92CDF53B03EA03A3910E5D`.
- Consumidores: Header, Footer, login e layout do painel.
- Header e Footer usam exatamente a mesma origem visual via `BASE_URL`.
- Painel usa o mesmo arquivo por caminho relativo.
- Favicon: SVG de 1.541.628 bytes com PNG base64 1024×1024; não é hash idêntico à logo e deve continuar sendo tratado separadamente.
- OG: `public/og-image.jpg`, 1920×1080, idêntica ao fallback do Hero e ao banner atual.
- Logo ainda não é administrável. Plano separado em `PLANO-LOGO-E-IDENTIDADE-ADMINISTRAVEIS-GNS-FIBRA-2.md`.

## 9. Conteúdo administrável

Legenda: A funciona; B salva mas não é consumido; C fixo corretamente; D fixo candidato a administração; E duplicado em outra origem; F sem uso.

| Área | Classificação | Evidência |
|---|---|---|
| Empresa, telefone, e-mail, endereço e redes | A | settings → API → normalizador → Header/Support/CTA/Footer |
| Hero: título e descrição institucional | A/E | settings; `about_text` também alimenta descrição da empresa |
| Hero: imagem | A | banner ativo → API → Hero, com fallback |
| Hero: título/subtítulo/botão do cadastro Banner | B | normalizados, mas Hero ignora essas propriedades |
| Estatísticas | A | tabela/CRUD/API/Stats |
| Planos | A | tabela/CRUD/API/Plans |
| Diferenciais | A | tabela/CRUD/API/Differentials |
| Benefícios | A | tabela/CRUD/API/Benefits |
| Tecnologias | A | tabela/CRUD/API/Technologies |
| História e galeria | A | settings + tabela/CRUD/API/History |
| Cobertura: região e mapa | A | tabela/CRUD/API/Coverage/Footer |
| Cobertura: descrição do ponto | B | API normaliza; componente não exibe |
| Depoimentos | A | tabela/CRUD/API/Testimonials |
| FAQ | A | tabela/CRUD/API/FAQ |
| Suporte e CTA | A | settings/Configurações/API/componentes |
| Navegação | C | mapa estrutural fixo e coerente com IDs |
| Logo | D | identidade do cliente, com fallback obrigatório |
| Crédito Marcos TecMaster | C | autoria/propriedade, não conteúdo comercial cotidiano |

## 10. Conteúdo ainda fixo

Permanecem fixos: títulos e textos introdutórios de Planos, Benefícios, Tecnologias, Cobertura, Depoimentos e FAQ; conteúdo empresarial; indicadores curtos do Hero; mensagens secundárias de WhatsApp; labels de interface; copyright e autoria. Não há justificativa para tornar labels técnicos e autoria administráveis. Conteúdo empresarial e copy de abertura das seções são candidatos D, mas devem ser agrupados em settings com limites e preview, não liberados indiscriminadamente.

## 11. Links

- Responderam HTTP 200: domínio com e sem `www`, Central do Assinante, Linktree, Facebook, Instagram, WhatsApp e o mapa amostrado.
- Links `target="_blank"` do frontend usam `noopener noreferrer`; painel usa `noopener` ou `noopener noreferrer`.
- `mailto:` e `tel:` são formados a partir dos settings normalizados.
- URLs administráveis aceitam HTTPS; benefícios também permitem `mailto`, `tel` e âncoras internas válidas.
- Nenhum localhost ou caminho Windows foi encontrado em conteúdo público/banco.

## 12. Rotas

- Âncoras públicas válidas: `inicio`, `planos`, `empresarial`, `cobertura`, `quem-somos`, `faq`, `contato`.
- Seções adicionais existentes: `diferenciais`, `beneficios`, `tecnologias`, `suporte`, `depoimentos`.
- Todos os 14 itens de menu do painel apontam para páginas existentes.
- `admin/index.php` redireciona conforme autenticação; logout não foi acionado durante a auditoria.
- A API é resolvida relativamente a `document.baseURI`, funcionando em `/gns-fibra-2/`.
- `vite.config.ts` usa fallback de proxy `/gns-fibra`, diferente do diretório local `/gns-fibra-2`; desenvolvimento com Vite exige `GNS_PHP_BASE_PATH=/gns-fibra-2` ou correção documentada.

## 13. Código morto

- Candidato com evidência: `src/content/index.ts` (barrel sem consumidor).
- Todos os 18 componentes em `src/components/site` têm consumidor direto ou indireto.
- Todos os assets em `src/assets` são importados como conteúdo ou fallback.
- Funções PHP compartilhadas têm consumidores; nomes dinâmicos de tabela/campo vêm de configurações fixas dos módulos.
- Não remover o candidato sem confirmar se existe consumidor externo planejado.

## 14. CSS sem uso

Comparação literal de classes declaradas versus TS/TSX/PHP não encontrou classe customizada sem consumidor em `src/styles.css` ou `admin/assets/admin.css`. O resultado não prova uso visual de cada variante/estado, mas não há candidato inequívoco para exclusão.

## 15. Banco

- Banco local ativo: `gns-fibra-2`.
- 13 tabelas: banners, benefits, coverage, differentials, faqs, history_gallery, login_attempts, plans, settings, stats, technologies, testimonials e users.
- Contagens reais: 1 banner, 4 benefícios, 4 coberturas, 5 diferenciais, 7 FAQs, 3 itens de história, 7 planos, 36 settings, 4 estatísticas, 4 tecnologias, 4 depoimentos e 1 usuário.
- Colunas e índices atuais correspondem à estrutura funcional esperada.
- Divergência importante: `schema.sql` cria/seleciona `gns_fibra`, não o banco local `gns-fibra-2`.

## 16. Migrations

- Migrations de criação usam `IF NOT EXISTS` e seeds condicionais, em geral reexecutáveis.
- `migration-2026-06-17-coverage-map-url.sql` e `migration-2026-06-security.sql` executam `USE gns_fibra`; podem operar no banco errado em ambientes cujo nome difere.
- A migration de segurança força `must_change_password=1` para username `admin` em toda execução; é reexecutável tecnicamente, mas tem efeito funcional repetido.
- Migrations mais novas não selecionam banco e dependem da sessão correta.
- Nenhuma migration foi executada nesta auditoria.

## 17. Seed

- `seed.sql` também executa `USE gns_fibra`.
- Settings usam `ON DUPLICATE KEY` sem sobrescrever valores existentes.
- O seed executa `DELETE FROM` em banners, FAQs, depoimentos, cobertura e planos e recria os registros; isso apaga edições administrativas.
- O próprio `ADMIN-README.md` alerta para não executá-lo após o painel entrar em uso. Para produção, separar bootstrap inicial de seed demonstrativo destrutivo.

## 18. API

- GET real: 200, JSON UTF-8, cache público `max-age=60, stale-while-revalidate=300`.
- HEAD real (`curl -I`): 405 com `Allow: GET`; portanto, a API está pública e saudável por GET, mas não satisfaz uma verificação de disponibilidade baseada em HEAD.
- POST real: 405; código envia `Allow: GET`.
- Retorna somente registros ativos e ordena por `display_order, id`.
- Blocos: settings, plans, stats, differentials, history_gallery, coverage, testimonials, banners, benefits, technologies e faqs.
- Todos os blocos possuem consumidor no normalizador; `generated_at` é metadado sem consumidor e não representa falha.
- Erros 500 não expõem detalhes internos.
- Percurso confirmado: banco → `api/site-content.php` → `normalizeContent` → `SiteContentProvider` → componentes.

## 19. Painel

- 14 módulos autenticados inspecionados por GET: Dashboard, Planos, Estatísticas, Diferenciais, Benefícios, Tecnologias, Banners, Galeria, Cobertura, Depoimentos, FAQ, Configurações, Usuários e Troca de senha.
- Todos apresentaram título, item de menu ativo, navegação com 14 itens e imagens válidas.
- CRUDs compartilhados aplicam autenticação, CSRF, validação, statements preparados, estado vazio/listagem e mensagens flash.
- Uploads possuem preview e remoção; Configurações cobre Cobertura e CTA.
- Desktop conectado: sem overflow e sem erros próprios de console.
- Limitação: o controle de viewport do Chrome conectado não alterou a largura real (permaneceu 1201 px). O CSS tem breakpoints em 1024, 768 e 480 px, nav rolável e tabelas dentro de contêiner com overflow, mas a validação manual real em 360/390/414/430 continua pendente antes da demonstração.

## 20. Frontend

- Um `h1`, 13 seções, Footer presente, zero imagens quebradas e zero âncoras ausentes.
- API real refletiu as contagens do banco.
- Fallback local cobre indisponibilidade da API e erro de imagens.
- Dark/Light e acessibilidade do Footer foram validados na fase imediatamente anterior.
- O erro de console observado no Chrome foi de canal de extensão do navegador, não da aplicação; logs próprios das páginas administrativas ficaram vazios.

## 21. SEO

- Presentes: `lang=pt-BR`, title, description, canonical, robots, sitemap, Open Graph, Twitter Card, favicon e um único `h1`.
- Canonical/OG apontam para `https://gnsfibra.com.br/`; os domínios com e sem `www` respondem 200.
- Ausentes: manifest, apple-touch-icon e dados estruturados. São melhorias, não bloqueios.
- `og-image.jpg` é a mesma foto do Hero/banner; é válida, mas não representa necessariamente a melhor arte social de longo prazo.
- Favicon é desproporcionalmente pesado (1,54 MB) para seu uso.

## 22. Segurança

Controles presentes: cookies HttpOnly/SameSite, Secure em HTTPS, regeneração de sessão, timeout de 2 h, CSRF, escaping HTML, senhas fortes, hash nativo, troca obrigatória, rate limit persistente, statements preparados, validação de URL, MIME e caminho de upload, CSP, HSTS em HTTPS, proteção de config/database/uploads.

Correção aplicada nesta fase: `.htaccess` agora bloqueia acesso direto a `src/`, `docs/`, `node_modules`, Markdown, SQL, TypeScript, sourcemaps, lockfiles e configurações Node. Antes, `package.json`, `src/main.tsx` e documentos Markdown respondiam 200; depois passaram a 403, enquanto site e upload testado permaneceram 200. A API permaneceu 200 por GET; HEAD retorna 405 por aceitar explicitamente apenas GET.

Riscos residuais: CSP do painel permite `'unsafe-inline'`; rate limit usa `REMOTE_ADDR` e precisa de revisão se houver proxy confiável; não há trilha de auditoria administrativa; a senha histórica `GNS@2026` continua literal apenas na lista de senhas proibidas, não como credencial ativa.

## 23. Dist

- `dist` é ignorado e não possui arquivos rastreados.
- Build limpo recriou HTML, JS/CSS e assets; uploads não foram copiados para `dist`.
- Imagens administrativas são servidas de `uploads`, não de `dist`.
- Nenhum conteúdo manual exclusivo foi identificado no artefato.
- Aviso conhecido: `<script src="./theme-init.js">` não é empacotado por não possuir `type="module"`; o arquivo é copiado de `public` e funciona como script externo necessário à inicialização antecipada do tema.

## 24. Documentação

- 35 Markdown rastreados na raiz antes deste relatório; há excesso de documentos históricos no nível principal.
- Atuais: Documento Mestre, Design System, arquitetura/mapa/matriz/plano do Painel 2.0 e implementações recentes.
- Históricos úteis: relatórios e implementações por fase.
- Obsoletos/conflitantes: `AUDITORIA-FINAL-PRODUCAO.md` e relatórios antigos descrevem senha/fallback/404 já corrigidos; devem ganhar aviso de histórico ou ir para arquivo.
- Proposta sem movimentação: `docs/architecture`, `docs/implementation`, `docs/audits`, `docs/deployment`, `docs/legal` e `docs/branding`.

## 25. Licença e autoria

Etapa aprovada, não implementada: licença proprietária, autorização de uso à GNS Fibra sem transferência de titularidade, proibição de revenda/reuso comercial, preservação de crédito, avisos nos arquivos, histórico Git como evidência e preparação para eventual INPI. Não foram adicionadas travas técnicas.

## 26. PHP lint

27 arquivos PHP verificados (incluindo configuração local apenas por sintaxe); 0 falhas.

## 27. Typecheck

`npm run typecheck`: aprovado, sem erros.

## 28. Build

`npm run build`: aprovado; 2.159 módulos transformados. Apenas o aviso conhecido de `theme-init.js`.

## 29. NPM audit

`npm audit`: 1 vulnerabilidade baixa em `esbuild 0.27.7`, transitiva de `vite 7.3.5` (`GHSA-g7r4-m6w7-qqqr`, leitura arbitrária de arquivo no dev server em Windows). Não afeta o bundle estático por si só, mas o servidor Vite não deve ser exposto publicamente. Não foi executado `npm audit fix`.

## 30. Itens críticos

Nenhum item crítico confirmado após a correção de exposição de arquivos internos.

## 31. Itens altos

| Descoberta | Evidência/impacto | Recomendação | Risco da correção | Quando |
|---|---|---|---|---|
| Contrato parcial de Banners | CRUD/API expõem texto e botão; Hero usa só imagem | Consumir campos ou renomear módulo/campos como imagem do Hero | médio | Antes da demo |
| Descrição de cobertura sem consumidor | `coverage.description` salva e trafega, mas não aparece | Mostrar descrição de modo controlado ou remover campo da UI | baixo | Antes da demo |
| Nome de banco divergente | local `gns-fibra-2`; schema/seed/migrations usam `gns_fibra` | Remover `USE` rígido ou parametrizar e documentar banco alvo | médio | Antes de implantação |
| Seed destrutivo | cinco `DELETE FROM` apagam conteúdo gerenciado | Separar seed demonstrativo/reset de bootstrap idempotente | médio | Antes de implantação |

## 32. Itens médios

- QA móvel autenticada completa ainda manual.
- Proxy Vite default aponta para `/gns-fibra`, não `/gns-fibra-2`.
- Logo ainda fixa e pesada.
- Copies de seções e módulo Empresarial permanecem fixos.
- Documentação histórica misturada na raiz e alguns relatórios conflitam com o estado atual.
- Migration de segurança refaz a exigência de troca para username `admin`.
- Ausência de trilha de auditoria administrativa.

## 33. Itens baixos

- Vulnerabilidade baixa transitiva de `esbuild` no dev server Windows.
- Favicon raster embutido com 1,54 MB.
- `src/content/index.ts` sem consumidor confirmado.
- `uploads/galeria/.gitkeep` possivelmente legado.
- Manifest, apple-touch-icon e dados estruturados ausentes.
- CSP administrativa ainda depende de inline.

## 34. Corrigir antes da demonstração

1. Decidir o contrato real de Banners (imagem apenas versus conteúdo completo).
2. Tornar visível ou retirar da UI a descrição de cobertura.
3. Fazer QA manual autenticada em 360, 390, 414 e 430 px.
4. Fixar/documentar `GNS_PHP_BASE_PATH` para desenvolvimento.
5. Atualizar Vite/esbuild de forma controlada e repetir build/audit.
6. Confirmar que publicação usa Apache com `.htaccess` e build limpo.

## 35. Deixar para depois

- Logo administrável e ecossistema completo de identidade.
- Organização física dos Markdown.
- Administração seletiva das copies de seção/Empresarial.
- Otimização de logo/favicon/OG.
- Auditoria administrativa, CSP com nonce/hash e estratégia de proxy.
- Remoção de candidatos mortos após decisão de arquitetura.

## 36. Plano específico da logo

Documento: `PLANO-LOGO-E-IDENTIDADE-ADMINISTRAVEIS-GNS-FIBRA-2.md`. Resumo: setting `site_logo_path`, fallback oficial obrigatório, PNG/WebP até 2 MB, MIME real, preview, substituir/restaurar, mesmo resolvedor em Header/Footer/painel, sem acoplar favicon e OG.

## 37. Arquivos criados ou alterados

- Alterado: `.htaccess` (bloqueio de artefatos internos).
- Criado: `AUDITORIA-FINAL-PENTE-FINO-GNS-FIBRA-2.md`.
- Criado: `MAPA-ARQUIVOS-ASSETS-E-REFERENCIAS-GNS-FIBRA-2.md`.
- Criado: `PLANO-LOGO-E-IDENTIDADE-ADMINISTRAVEIS-GNS-FIBRA-2.md`.
- Nenhum documento mestre foi alterado.

## 38. Git final

O estado final contém exatamente:

```text
 M .htaccess
?? AUDITORIA-FINAL-PENTE-FINO-GNS-FIBRA-2.md
?? MAPA-ARQUIVOS-ASSETS-E-REFERENCIAS-GNS-FIBRA-2.md
?? PLANO-LOGO-E-IDENTIDADE-ADMINISTRAVEIS-GNS-FIBRA-2.md
```

`git diff --name-only` lista somente `.htaccess`, pois os três relatórios ainda são não rastreados. `git diff --stat` registra 11 inserções nesse arquivo.

## 39. Confirmação de staging

Nenhum arquivo foi adicionado ao index. `git diff --cached --name-only` deve permanecer vazio.

## 40. Próxima fase recomendada

Hardening pré-demonstração: corrigir contrato de Banners/Cobertura, alinhar scripts de banco, executar QA móvel autenticada e atualizar a dependência vulnerável. Em seguida, implementar a logo administrável conforme plano separado.
