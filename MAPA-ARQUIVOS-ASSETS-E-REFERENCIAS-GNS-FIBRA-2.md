# Mapa de arquivos, assets e referências — GNS Fibra 2.0

Data: 18/07/2026

## Critérios

- Inventário principal: arquivos rastreados e novos relatórios não ignorados.
- Dependências, caches, temporários e `dist` são resumidos separadamente.
- “Referência” indica consumidor de runtime, uso operacional ou finalidade documental; não significa import JavaScript em todos os casos.
- Tamanhos são bytes no momento da auditoria.
- Credenciais e conteúdo de `config/database.local.php` não foram inventariados.

## Totais antes dos relatórios desta fase

| Categoria | Arquivos | Bytes |
|---|---:|---:|
| raiz | 44 | 398.465 |
| admin | 21 | 105.593 |
| api | 1 | 7.899 |
| config | 5 | 12.589 |
| database | 13 | 35.781 |
| docs | 16 | 16.103.403 |
| public | 6 | 3.860.275 |
| src | 37 | 3.513.321 |
| uploads | 8 | 360.557 |
| **Total rastreado** | **151** | — |

## Inventário por arquivo

| Caminho | Extensão | Bytes | Finalidade provável | Git | Referência |
|---|---|---:|---|---|---|
| .gitignore | .gitignore | 805 | regras de versionamento | rastreado | sim, Git |
| .htaccess | .htaccess | 1224 | roteamento e segurança Apache | rastreado | sim, servidor |
| ADMIN-README.md | .md | 2105 | documentação/relatório | rastreado | não runtime |
| admin/assets/admin.css | .css | 12768 | estilos do painel | rastreado | sim, layout admin |
| admin/banners.php | .php | 1510 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/beneficios.php | .php | 3936 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/cobertura.php | .php | 1255 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/configuracoes.php | .php | 17510 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/dashboard.php | .php | 5844 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/depoimentos.php | .php | 1154 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/diferenciais.php | .php | 2823 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/estatisticas.php | .php | 2388 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/faqs.php | .php | 1591 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/historia-galeria.php | .php | 3252 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/includes/bootstrap.php | .php | 716 | helper compartilhado do painel | rastreado | sim, páginas admin |
| admin/includes/layout.php | .php | 2709 | helper compartilhado do painel | rastreado | sim, páginas admin |
| admin/includes/simple-crud.php | .php | 23498 | helper compartilhado do painel | rastreado | sim, páginas admin |
| admin/index.php | .php | 141 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/login.php | .php | 3243 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/logout.php | .php | 193 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/planos.php | .php | 8419 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/tecnologias.php | .php | 3187 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/trocar-senha.php | .php | 2999 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| admin/usuarios.php | .php | 6457 | página/módulo administrativo | rastreado | sim, menu ou fluxo admin |
| api/site-content.php | .php | 7899 | endpoint público de conteúdo | rastreado | sim, frontend |
| ARQUITETURA-PAINEL-ADMIN-2-GNS-FIBRA.md | .md | 9854 | documentação/relatório | rastreado | não runtime |
| AUDITORIA-FINAL-CORRIGIDA.md | .md | 4663 | documentação/relatório | rastreado | não runtime |
| AUDITORIA-FINAL-PENTE-FINO-GNS-FIBRA-2.md | .md | 20348 | documentação/relatório | não rastreado | não runtime |
| AUDITORIA-FINAL-PRODUCAO.md | .md | 4897 | documentação/relatório | rastreado | não runtime |
| AUDITORIA-GNS-FIBRA-2.md | .md | 14831 | documentação/relatório | rastreado | não runtime |
| AUDITORIA-PAINEL-ADMIN-2-GNS-FIBRA.md | .md | 16339 | documentação/relatório | rastreado | não runtime |
| config/.htaccess | .htaccess | 19 | proteção Apache de configurações | rastreado | sim, servidor |
| config/auth.php | .php | 9440 | configuração PHP compartilhada | rastreado | sim, API/admin |
| config/database.example.php | .php | 241 | modelo de configuração sem segredo | rastreado | documentação operacional |
| config/database.php | .php | 1817 | configuração PHP compartilhada | rastreado | sim, API/admin |
| config/security.php | .php | 1072 | configuração PHP compartilhada | rastreado | sim, API/admin |
| database/.htaccess | .htaccess | 19 | proteção Apache do banco | rastreado | sim, servidor |
| database/create-admin.php | .php | 1106 | CLI para criar administrador | rastreado | uso manual documentado |
| database/migration-2026-06-17-coverage-map-url.sql | .sql | 755 | migration SQL incremental | rastreado | uso operacional manual |
| database/migration-2026-06-security.sql | .sql | 1385 | migration SQL incremental | rastreado | uso operacional manual |
| database/migration-2026-07-16-add-support-cta-settings.sql | .sql | 1334 | migration SQL incremental | rastreado | uso operacional manual |
| database/migration-2026-07-16-create-benefits.sql | .sql | 1931 | migration SQL incremental | rastreado | uso operacional manual |
| database/migration-2026-07-16-create-faqs.sql | .sql | 2181 | migration SQL incremental | rastreado | uso operacional manual |
| database/migration-2026-07-16-create-technologies.sql | .sql | 1719 | migration SQL incremental | rastreado | uso operacional manual |
| database/migration-2026-07-17-create-history-gallery-and-settings.sql | .sql | 2594 | migration SQL incremental | rastreado | uso operacional manual |
| database/migration-2026-07-17-create-stats-differentials.sql | .sql | 2772 | migration SQL incremental | rastreado | uso operacional manual |
| database/migration-2026-07-18-add-section-background-settings.sql | .sql | 371 | migration SQL incremental | rastreado | uso operacional manual |
| database/schema.sql | .sql | 7192 | schema completo | rastreado | bootstrap de banco |
| database/seed.sql | .sql | 12422 | dados demonstrativos/reset | rastreado | bootstrap controlado |
| DESIGN-SYSTEM-GNS-FIBRA-2.md | .md | 20525 | documentação/relatório | rastreado | não runtime |
| docs/branding/mascote/originais/.gitkeep | .gitkeep | 0 | placeholder de diretório | rastreado | estrutura do acervo |
| docs/branding/mascote/originais/apresentando.png | .png | 834579 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/comemorando.png | .png | 876191 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/pensando.png | .png | 805031 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/trabalhando-notebook.png | .png | 866974 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/v2-oficiais/apresentando-reserva.png | .png | 1381755 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/v2-oficiais/contato-whatsapp-acenando.png | .png | 1134032 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/v2-oficiais/conversao-comemorando.png | .png | 1094527 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/v2-oficiais/empresarial-notebook.png | .png | 1162618 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/v2-oficiais/faq-pensando.png | .png | 1070379 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/v2-oficiais/hero-apresentando-apontando.png | .png | 1014517 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/v2-oficiais/suporte-tecnico.png | .png | 1075667 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/v2-oficiais/wifi-turbo.png | .png | 1391504 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/originais/wifi-turbo.png | .png | 938579 | original/referência de marca | rastreado | documentação, não runtime |
| docs/branding/mascote/otimizados/.gitkeep | .gitkeep | 0 | placeholder de diretório | rastreado | estrutura do acervo |
| docs/branding/mascote/referencias/guia-oficial-poses-mascote-gns.png | .png | 2457050 | original/referência de marca | rastreado | documentação, não runtime |
| GNS_FIBRA_2_0_DOCUMENTO_MESTRE.md | .md | 18678 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-BENEFICIOS-ADMINISTRAVEIS-GNS-FIBRA-2.md | .md | 9497 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-COLECAO-MASCOTES-V2-GNS-FIBRA.md | .md | 13470 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-ESTATISTICAS-DIFERENCIAIS-ADMINISTRAVEIS-GNS-FIBRA-2.md | .md | 8491 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-FAQ-ADMINISTRAVEL-GNS-FIBRA-2.md | .md | 7477 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-FAQ-SUPORTE-CONTATO-GNS-FIBRA-2.md | .md | 11689 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-HEADER-HERO-GNS-FIBRA-2.md | .md | 13636 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-HISTORIA-CONTEUDO-INSTITUCIONAL-ADMINISTRAVEIS-GNS-FIBRA-2.md | .md | 10472 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-IMAGENS-FUNDO-ADMINISTRAVEIS-GNS-FIBRA-2.md | .md | 3511 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-MASCOTE-HERO-GNS-FIBRA-2.md | .md | 11179 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-PLANOS-BENEFICIOS-TECNOLOGIAS-GNS-FIBRA-2.md | .md | 12700 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-SUPORTE-CTA-ADMINISTRAVEIS-GNS-FIBRA-2.md | .md | 5067 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-TECNOLOGIAS-ADMINISTRAVEIS-GNS-FIBRA-2.md | .md | 7282 | documentação/relatório | rastreado | não runtime |
| IMPLEMENTACAO-TEMA-GNS-FIBRA-2.md | .md | 6366 | documentação/relatório | rastreado | não runtime |
| index.html | .html | 2236 | template HTML e metadados | rastreado | Vite/build |
| MAPA-ARQUIVOS-ASSETS-E-REFERENCIAS-GNS-FIBRA-2.md | .md | 0 | documentação/relatório | não rastreado | não runtime |
| MAPA-CONTEUDO-COMERCIAL-GNS-FIBRA-2.md | .md | 4760 | documentação/relatório | rastreado | não runtime |
| MAPA-PAINEL-ADMIN-GNS-FIBRA-2.md | .md | 16115 | documentação/relatório | rastreado | não runtime |
| MAPA-USO-MASCOTE-GNS-FIBRA-2.md | .md | 19057 | documentação/relatório | rastreado | não runtime |
| MATRIZ-CONTEUDO-PAINEL-API-FRONTEND-GNS-FIBRA.md | .md | 14652 | documentação/relatório | rastreado | não runtime |
| package-lock.json | .json | 84132 | lock de dependências | rastreado | npm ci |
| package.json | .json | 637 | manifesto npm | rastreado | npm/build |
| PLANO-IMPLEMENTACAO-GNS-FIBRA-2.md | .md | 8343 | documentação/relatório | rastreado | não runtime |
| PLANO-IMPLEMENTACAO-PAINEL-ADMIN-2-GNS-FIBRA.md | .md | 13235 | documentação/relatório | rastreado | não runtime |
| PLANO-LOGO-E-IDENTIDADE-ADMINISTRAVEIS-GNS-FIBRA-2.md | .md | 8696 | documentação/relatório | não rastreado | não runtime |
| public/favicon.svg | .svg | 1541628 | favicon público | rastreado | index e painel |
| public/logo-gns.png | .png | 2156795 | logo oficial fallback | rastreado | Header, Footer e painel |
| public/og-image.jpg | .jpg | 160700 | imagem social | rastreado | metadados OG/Twitter |
| public/robots.txt | .txt | 127 | diretivas de crawler | rastreado | publicação |
| public/sitemap.xml | .xml | 232 | sitemap | rastreado | publicação |
| public/theme-init.js | .js | 793 | inicialização antecipada do tema | rastreado | index.html |
| README.md | .md | 1003 | documentação/relatório | rastreado | não runtime |
| RELATORIO-ADMIN.md | .md | 1154 | documentação/relatório | rastreado | não runtime |
| RELATORIO-ENCODING.md | .md | 1369 | documentação/relatório | rastreado | não runtime |
| RELATORIO-INTEGRACAO-API.md | .md | 1050 | documentação/relatório | rastreado | não runtime |
| RELATORIO-LINKS-MAPA-COBERTURA.md | .md | 2808 | documentação/relatório | rastreado | não runtime |
| RELATORIO-PAINEL-RESPONSIVO-PREMIUM.md | .md | 2175 | documentação/relatório | rastreado | não runtime |
| RELATORIO-PRODUCAO.md | .md | 3416 | documentação/relatório | rastreado | não runtime |
| RELATORIO-TOKENS-TEMA-GNS-FIBRA-2.md | .md | 5513 | documentação/relatório | rastreado | não runtime |
| src/App.tsx | .tsx | 1541 | composição da página | rastreado | sim, main |
| src/assets/datacenter.jpg | .jpg | 87962 | imagem fallback compilada | rastreado | sim, import TSX/TS |
| src/assets/fiber-bundle.jpg | .jpg | 51656 | imagem fallback compilada | rastreado | sim, import TSX/TS |
| src/assets/hero-fiber.jpg | .jpg | 160700 | imagem fallback compilada | rastreado | sim, import TSX/TS |
| src/assets/install.jpg | .jpg | 60139 | imagem fallback compilada | rastreado | sim, import TSX/TS |
| src/assets/mascote/v2/contato-whatsapp-acenando.png | .png | 495563 | mascote otimizado de runtime | rastreado | sim, componente TSX |
| src/assets/mascote/v2/empresarial-notebook.png | .png | 516793 | mascote otimizado de runtime | rastreado | sim, componente TSX |
| src/assets/mascote/v2/faq-pensando.png | .png | 447765 | mascote otimizado de runtime | rastreado | sim, componente TSX |
| src/assets/mascote/v2/hero-apresentando-apontando.png | .png | 540995 | mascote otimizado de runtime | rastreado | sim, componente TSX |
| src/assets/mascote/v2/suporte-tecnico.png | .png | 471752 | mascote otimizado de runtime | rastreado | sim, componente TSX |
| src/assets/mascote/v2/wifi-turbo.png | .png | 528774 | mascote otimizado de runtime | rastreado | sim, componente TSX |
| src/components/site/Benefits.tsx | .tsx | 3956 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Business.tsx | .tsx | 4083 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Coverage.tsx | .tsx | 7310 | componente React público | rastreado | sim, App ou componente |
| src/components/site/CTASection.tsx | .tsx | 5299 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Differentials.tsx | .tsx | 2512 | componente React público | rastreado | sim, App ou componente |
| src/components/site/FAQ.tsx | .tsx | 8086 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Footer.tsx | .tsx | 8009 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Header.tsx | .tsx | 8766 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Hero.tsx | .tsx | 6861 | componente React público | rastreado | sim, App ou componente |
| src/components/site/HeroMascot.tsx | .tsx | 594 | componente React público | rastreado | sim, App ou componente |
| src/components/site/History.tsx | .tsx | 4072 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Plans.tsx | .tsx | 8754 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Stats.tsx | .tsx | 1300 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Support.tsx | .tsx | 7311 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Technologies.tsx | .tsx | 4638 | componente React público | rastreado | sim, App ou componente |
| src/components/site/Testimonials.tsx | .tsx | 2689 | componente React público | rastreado | sim, App ou componente |
| src/components/site/ThemeToggle.tsx | .tsx | 880 | componente React público | rastreado | sim, App ou componente |
| src/components/site/WhatsAppFloat.tsx | .tsx | 786 | componente React público | rastreado | sim, App ou componente |
| src/content/index.ts | .ts | 150 | barrel de conteúdo | rastreado | candidato sem consumidor |
| src/content/SiteContentProvider.tsx | .tsx | 880 | contrato/provider de conteúdo | rastreado | sim, frontend |
| src/content/types.ts | .ts | 3074 | contrato/provider de conteúdo | rastreado | sim, frontend |
| src/lib/site-content.ts | .ts | 13801 | fallback e helpers | rastreado | sim, frontend |
| src/main.tsx | .tsx | 322 | entrada React | rastreado | sim, index/build |
| src/services/site-content-service.ts | .ts | 20966 | cliente/normalizador da API | rastreado | sim, provider |
| src/styles.css | .css | 21178 | estilos globais | rastreado | sim, main |
| src/theme/theme.tsx | .tsx | 3404 | provider de tema | rastreado | sim, main/controle |
| tsconfig.app.json | .json | 859 | configuração TypeScript | rastreado | typecheck/build |
| tsconfig.json | .json | 119 | configuração TypeScript | rastreado | typecheck/build |
| tsconfig.node.json | .json | 413 | configuração TypeScript | rastreado | typecheck/build |
| uploads/.htaccess | .htaccess | 97 | proteção dos uploads | rastreado | sim, servidor |
| uploads/banners/.gitkeep | .gitkeep | 1 | placeholder de upload | rastreado | estrutura planejada |
| uploads/banners/aa600cfdc6e7513743ae73286e957a93.jpg | .jpg | 160700 | banner oficial administrável | rastreado | banners.image_path |
| uploads/coverage/9d5a2f1e67396dc16b49e30550b02c52.jpg | .jpg | 87962 | imagem de cobertura | rastreado | setting coverage_image_path |
| uploads/cta/9c0d1bd3dbaafb209599ebdf3dbfccd3.jpg | .jpg | 51656 | fundo do CTA | rastreado | setting cta_background_image_path |
| uploads/galeria/.gitkeep | .gitkeep | 1 | placeholder de upload | rastreado | estrutura planejada |
| uploads/history/install.jpg | .jpg | 60139 | imagem da história | rastreado | history_gallery.image_path |
| uploads/logos/.gitkeep | .gitkeep | 1 | placeholder de upload | rastreado | estrutura planejada |
| vite.config.ts | .ts | 661 | configuração Vite | rastreado | dev/build |

## Itens ignorados e gerados

| Caminho/grupo | Estado | Observação |
|---|---|---|
| `node_modules/` | ignorado | dependências; não analisar como código próprio |
| `dist/` | ignorado | build gerado; 19 arquivos após build |
| `config/database.local.php` | ignorado | configuração sensível local; conteúdo não exposto |
| `node_modules/.tmp`, `.vite` | ignorados | caches de ferramentas |
| logs, temp, backup, zip, local, env | ignorados por regra | nenhum inesperado encontrado |

## Assets de identidade

| Arquivo | Dimensões | Bytes | SHA256 | Consumidores |
|---|---:|---:|---|---|
| `public/logo-gns.png` | 1080×1080 | 2.156.795 | `317274AA99C55E13BC47EDA12DFF7BE76D34693B3D92CDF53B03EA03A3910E5D` | Header, Footer, login e layout admin |
| `public/favicon.svg` | SVG 512; PNG interno 1024×1024 | 1.541.628 | `FBE035A3159ED792A42FA...` | index e painel |
| `public/og-image.jpg` | 1920×1080 | 160.700 | `22FA0B1A4553DE0F53A30D54F947494AD274B21F24DB0A2BD3FF7E270A97D291` | Open Graph/Twitter |

Header e Footer usam a mesma origem. A marca do painel aponta para o mesmo arquivo. Favicon e OG são ativos independentes.

## Duplicações exatas de assets

| Grupo SHA256 | Cópias | Classificação |
|---|---|---|
| `22FA0B1A...A97D291` | OG, fallback Hero, upload Banner | duplicação intencional atual |
| `448DFDDB...CC268E1` | fallback CTA, upload CTA | duplicação intencional atual |
| `AA99C063...524E12E` | fallback Cobertura, upload Cobertura | duplicação intencional atual |
| `9149AA9C...0CD1769` | fallback História, upload História | duplicação intencional atual |

## Assets do frontend e consumidores

| Asset | Consumidor | Papel |
|---|---|---|
| `hero-fiber.jpg` | Hero | fallback de banner |
| `datacenter.jpg` | Coverage | fallback da imagem administrável |
| `fiber-bundle.jpg` | CTASection | fallback do fundo administrável |
| `install.jpg` | conteúdo local/History | fallback de galeria |
| mascote apresentando | HeroMascot | Hero |
| mascote empresarial | Business | seção empresarial |
| mascote Wi-Fi | Technologies | tecnologias |
| mascote suporte | Support | suporte |
| mascote FAQ | FAQ | perguntas frequentes |
| mascote contato | CTASection | CTA final |

Todos os assets de `src/assets` possuem import/consumidor. Os originais em `docs/branding` são acervo, não runtime.

## Cruzamento dos uploads

| Estado | Quantidade | Caminhos |
|---|---:|---|
| físico com referência válida | 4 | banner, history, coverage, CTA |
| referência com físico presente | 4 | idem |
| físico órfão | 0 | — |
| referência para ausente | 0 | — |

## Código e CSS

- Componente sem consumidor: nenhum.
- Arquivo candidato sem consumidor: `src/content/index.ts`.
- Classe customizada sem consumidor literal: nenhuma em `src/styles.css` ou `admin/assets/admin.css`.
- Página admin sem link/fluxo: nenhuma; arquivos especiais `index.php`, `login.php` e `logout.php` pertencem ao fluxo de autenticação.
- Endpoint sem consumidor: nenhum; `generated_at` é metadado informativo.

## Dist

`dist` contém somente artefatos gerados: index, JS/CSS com hash, dez imagens compiladas e seis arquivos públicos. Não contém uploads administrativos, não está rastreado e foi recriado por `npm run build`.

## Conclusão

Não há arquivo físico de upload comprovadamente órfão nem asset de runtime sem consumidor. Candidatos de organização/limpeza devem ser tratados como recomendação: barrel `src/content/index.ts`, placeholder `uploads/galeria` e documentação histórica na raiz.
