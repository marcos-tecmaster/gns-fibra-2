# GNS FibRA 2.0 — Documento Mestre do Projeto

**Palavra-chave do projeto:** **Bora 😎**

## 1. Propósito

Este documento é a referência oficial para qualquer agente, desenvolvedor, designer ou ferramenta de IA que atuar no projeto **GNS Fibra 2.0**.

Antes de alterar qualquer arquivo, o responsável deve:

1. Ler este documento por completo.
2. Respeitar a identidade já consolidada da GNS Fibra.
3. Preservar tudo que já funciona.
4. Evitar mudanças por suposição.
5. Validar tecnicamente cada decisão.
6. Priorizar segurança, conversão, desempenho, acessibilidade e manutenção.

A meta não é criar apenas um site bonito. A meta é construir uma plataforma digital de alto nível, capaz de:

- apresentar a GNS Fibra com força institucional;
- gerar oportunidades comerciais;
- integrar campanhas e processos internos;
- apoiar tráfego pago;
- reforçar a marca;
- acompanhar o crescimento da empresa;
- tornar-se referência entre provedores regionais.

---

## 2. Contexto atual

A GNS Fibra já possui identidade visual consolidada, presença regional, materiais físicos, veículos, uniformes, redes sociais, logo própria e mascote oficial.

Existem atualmente três versões do site:

### Premium / Dark
- Projeto local: `C:\laragon\www\gns-fibra`
- URL: `https://gns-fibra.marcostecmaster.com.br/`

### Classic
- Projeto local: `C:\laragon\www\gns-fibra-classic`
- URL: `https://gns-fibra-classic.marcostecmaster.com.br/`

### V3
- URL: `https://gns-fibra-v3.marcostecmaster.com.br/`

A nova fase deve evoluir principalmente o **Premium / Dark**, aproveitando o que há de melhor nas versões Classic e V3, sem apagar sua identidade original.

---

## 3. Stack atual

- React
- TypeScript
- Vite
- Tailwind CSS
- PHP
- MySQL
- Apache
- Hostinger
- Cloudflare
- Painel administrativo próprio
- API própria em PHP
- Git / GitHub
- Deploy em subdomínios
- Build final em `dist/`

---

## 4. Princípios obrigatórios

### 4.1 Preservar o que funciona

Não alterar sem necessidade:

- painel administrativo;
- autenticação;
- sessões;
- segurança;
- CRUDs;
- API;
- banco de dados;
- rotas;
- integrações existentes;
- SEO já implementado;
- responsividade já validada;
- estrutura de produção.

### 4.2 Não trabalhar por suposição

Quando faltar informação:

- identificar a dúvida;
- apontar o risco;
- solicitar confirmação;
- documentar a decisão;
- não inventar dados de cliente, plano, API ou campanha.

### 4.3 Mobile-first real

Toda interface deve ser pensada primeiro para:

- 360 px;
- 390 px;
- 414 px;
- 430 px;
- tablet;
- desktop.

Não deve existir:

- overflow horizontal;
- texto cortado;
- botão inacessível;
- menu quebrado;
- tabela fora da tela;
- formulário impraticável no celular.

### 4.4 Sem Flash e sem plug-ins desnecessários

O projeto deve utilizar apenas tecnologias modernas da web.

Evitar:

- Flash;
- dependências abandonadas;
- plug-ins pesados;
- bibliotecas sem necessidade;
- efeitos que prejudiquem desempenho.

---

## 5. Direção visual da GNS Fibra 2.0

### 5.1 Identidade principal

A marca deve manter:

- laranja oficial;
- grafite;
- cinza metálico;
- branco;
- aparência premium;
- tecnologia;
- proximidade;
- energia;
- credibilidade;
- telecomunicações.

### 5.2 Paleta-base

- Laranja oficial: `#ef7d03`
- Grafite: `#1f2937`
- Grafite escuro: `#0f172a`
- Cinza metálico: `#bfbfbf`
- Cinza titanium: `#d9d9d9`
- Branco: `#ffffff`

### 5.3 Tema claro e escuro

A versão 2.0 deverá oferecer:

- modo escuro;
- modo claro;
- alternância visível;
- persistência da escolha do usuário;
- respeito ao tema do sistema quando possível;
- contraste adequado nos dois temas.

O modo claro pode aproveitar referências visuais da versão Classic.

### 5.4 Mascote oficial

O mascote da GNS Fibra deve ser usado estrategicamente, não como decoração excessiva.

Aplicações recomendadas:

- Hero;
- planos;
- suporte;
- cobertura;
- FAQ;
- campanhas;
- páginas de sucesso;
- página 404;
- WhatsApp;
- seções de benefícios.

Usar apenas poses oficiais aprovadas.

---

## 6. Arquitetura de conteúdo sugerida

A navegação deve conduzir o visitante naturalmente até a conversão.

Ordem recomendada:

1. Hero
2. Planos
3. Benefícios
4. Tecnologias
5. Soluções residenciais
6. Soluções empresariais
7. Cobertura
8. Prova social
9. Campanhas
10. FAQ
11. Contato
12. Footer

---

## 7. Funcionalidades públicas

### 7.1 Hero

Deve conter:

- proposta de valor clara;
- CTA principal;
- CTA secundário;
- destaque para atendimento;
- mascote quando fizer sentido;
- boa leitura no mobile;
- alto impacto visual;
- baixo peso de carregamento.

### 7.2 Planos

Exibir de forma limpa:

- nome;
- velocidade;
- preço;
- tecnologia Wi-Fi;
- comodato;
- benefícios principais;
- selo de destaque;
- CTA.

Evitar cards excessivamente longos.

### 7.3 Benefícios separados dos planos

Criar uma seção específica para:

- GNS TV;
- GNS TV Plus;
- streaming;
- câmera IP;
- repetidor Mesh;
- telefone fixo;
- antivírus;
- outros benefícios futuros.

Pode usar:

- cards;
- modal;
- accordion;
- comparação visual.

### 7.4 Tecnologias

Destacar:

- Wi-Fi 5;
- Wi-Fi 6;
- Wi-Fi 7;
- XGS-PON;
- equipamentos de última geração;
- redes 2.4 GHz e 5 GHz;
- infraestrutura monitorada.

### 7.5 Soluções empresariais

Apresentar:

- alta disponibilidade;
- estabilidade;
- produtividade;
- suporte especializado;
- soluções para empresas, escritórios, comércios e operações críticas.

Texto aprovado:

> Soluções de internet fibra óptica para empresas, escritórios, comércios e operações que necessitam de alta disponibilidade e estabilidade, produtividade e suporte especializado.

### 7.6 Cobertura

Cada local deve ser clicável e editável no painel.

Regiões atuais:

- Alvorada / Viamão
- Canoas / Cachoeirinha
- Bagé
- Igrejinha

Cada item deve ter:

- nome;
- descrição;
- link do Google Maps;
- CTA;
- status ativo/inativo.

### 7.7 Prova social

Incluir futuramente:

- avaliações Google;
- depoimentos reais;
- empresas atendidas;
- números da operação;
- validação pública;
- cases.

### 7.8 FAQ

Perguntas sobre:

- instalação;
- cobertura;
- fidelidade;
- comodato;
- suporte;
- velocidades;
- Wi-Fi;
- benefícios;
- contratos;
- atendimento.

### 7.9 Campanhas

Criar estrutura para campanhas sazonais e comerciais.

Exemplos:

- Indique e Ganhe;
- Copa;
- Black Friday;
- Natal;
- aniversário da empresa;
- promoções regionais.

---

## 8. Campanha “Indique e Ganhe”

### 8.1 Objetivo

Permitir que um cliente indique outra pessoa e, conforme as regras da campanha, receba 1 mês de internet grátis.

### 8.2 Formulário

Dados de quem indica:

- nome;
- CPF ou código do cliente;
- telefone;
- contrato/login;
- e-mail opcional.

Dados da pessoa indicada:

- nome;
- telefone;
- cidade;
- bairro;
- CEP;
- endereço;
- plano de interesse.

### 8.3 Regras a definir

Antes da implementação final, confirmar:

- quando o benefício é concedido;
- se depende de instalação;
- se depende de pagamento da primeira mensalidade;
- limite de indicações;
- possibilidade de acumular;
- tratamento de duplicidade;
- validade da campanha;
- elegibilidade do indicado;
- contrato que recebe o desconto.

### 8.4 LGPD

Obrigatório:

- informar finalidade;
- coletar apenas o necessário;
- incluir consentimento/ciência;
- linkar política de privacidade;
- registrar aceite;
- proteger dados;
- não expor CPF ou token em logs públicos.

---

## 9. Integração IXC

### 9.1 Arquitetura obrigatória

Nunca expor token no frontend.

Fluxo correto:

`React -> API PHP própria -> API REST IXC`

### 9.2 Requisitos técnicos

Solicitar da equipe:

- URL base da API;
- token exclusivo;
- usuário técnico;
- permissões mínimas;
- ambiente de teste;
- endpoint correto;
- método HTTP;
- headers;
- JSON;
- campos obrigatórios;
- exemplo Postman;
- respostas de sucesso e erro;
- contato técnico.

### 9.3 Segurança

- token fora do GitHub;
- token fora do React;
- arquivo de configuração protegido;
- timeout;
- logs seguros;
- rate limit;
- CAPTCHA;
- validação;
- tratamento de indisponibilidade;
- prevenção de duplicidade;
- fila ou armazenamento temporário.

### 9.4 Integração comercial

A equipe deve definir se o envio irá criar:

- lead;
- negociação;
- prospecção;
- pedido de venda;
- outro registro interno.

---

## 10. Painel administrativo

O painel faz parte do produto e deve evoluir junto com o site.

### 10.1 Módulos atuais

- Dashboard
- Planos
- Benefícios
- Banners
- Cobertura
- Depoimentos
- FAQ
- Configurações
- Usuários
- Troca de senha

### 10.2 Módulos futuros

- Tecnologias
- Campanhas
- Indicações
- Leads
- Avaliações
- Integrações
- Configurações de Pixel/Analytics
- Mascote e banners
- Landing pages
- Logs de integração IXC

### 10.3 Requisitos do painel

- responsivo;
- mobile;
- seguro;
- acessível;
- legível;
- com botão Sair visível;
- sem overflow;
- validação;
- CSRF;
- sessões seguras;
- rate limit;
- uploads protegidos;
- trilha de auditoria futura.

---

## 11. Marketing e conversão

### 11.1 Ferramentas futuras

- Google Analytics 4
- Google Tag Manager
- Meta Pixel
- Google Ads
- eventos personalizados
- conversões de WhatsApp
- conversões de cobertura
- conversões de planos
- conversões de campanha

### 11.2 Landing pages

Criar estrutura para campanhas específicas:

- plano Ultra;
- empresas;
- indique e ganhe;
- regiões;
- promoções;
- tráfego pago.

### 11.3 Eventos de conversão

Rastrear:

- clique no WhatsApp;
- clique em plano;
- consulta de cobertura;
- envio de formulário;
- início de contratação;
- indicação enviada;
- acesso à Central do Assinante.

---

## 12. SEO

Implementar e validar:

- title;
- description;
- canonical;
- sitemap;
- robots;
- Open Graph;
- Twitter Card;
- dados estruturados;
- SEO local;
- páginas por região;
- FAQ schema;
- Organization schema;
- LocalBusiness schema;
- performance;
- URLs amigáveis.

---

## 13. Performance

Objetivos:

- carregamento rápido;
- Core Web Vitals positivos;
- imagens WebP/AVIF quando possível;
- lazy loading;
- preload apenas quando necessário;
- bundle controlado;
- sem dependências inúteis;
- cache correto;
- compressão;
- fontes otimizadas;
- sem bloqueios desnecessários.

---

## 14. Acessibilidade

Garantir:

- contraste;
- navegação por teclado;
- labels;
- foco visível;
- alt text;
- semântica;
- tamanho de toque adequado;
- motion reduzido;
- formulários compreensíveis;
- mensagens de erro claras.

---

## 15. Segurança

Obrigatório:

- HTTPS;
- CSP;
- headers de segurança;
- CSRF;
- password_hash/password_verify;
- rate limit;
- validação de upload;
- proteção de configuração;
- credenciais fora do GitHub;
- banco com usuário próprio;
- logs sem dados sensíveis;
- backups.

---

## 16. Produção e hospedagem

Estrutura padrão:

`/public_html/projetos/NOME-DO-PROJETO/`

Acesso público via subdomínio.

Configuração Vite:

`base: "/"`

Publicação:

1. Rodar `npm run typecheck`
2. Rodar `npm run build`
3. Subir `dist/`
4. Manter ao lado:
   - `admin/`
   - `api/`
   - `config/`
   - `uploads/`
5. Configurar banco
6. Testar API
7. Testar admin
8. Limpar cache Cloudflare
9. Testar aba anônima
10. Testar mobile

---

## 17. Git e versionamento

Antes de grandes mudanças:

- criar commit;
- criar backup;
- exportar banco;
- documentar;
- evitar force push sem necessidade;
- separar ambientes;
- não subir credenciais;
- manter `.gitignore`.

---

## 18. Roadmap sugerido

### Fase 1 — Auditoria
- inventário;
- backup;
- revisão do Premium;
- comparação com V3;
- comparação com Classic.

### Fase 2 — Mobile-first
- revisão total;
- tablet;
- desktop;
- acessibilidade.

### Fase 3 — Tema claro/escuro
- tokens;
- persistência;
- contraste;
- identidade.

### Fase 4 — UX e conteúdo
- planos;
- benefícios;
- tecnologias;
- empresarial;
- FAQ;
- prova social.

### Fase 5 — Branding do mascote
- hero;
- suporte;
- cobertura;
- campanhas;
- 404;
- sucesso.

### Fase 6 — Marketing
- GTM;
- GA4;
- Meta Pixel;
- eventos.

### Fase 7 — Integração IXC
- homologação;
- formulário;
- API PHP;
- logs;
- testes.

### Fase 8 — Painel administrativo 2.0
- campanhas;
- indicações;
- FAQ;
- benefícios;
- integrações.

### Fase 9 — SEO e performance
- schema;
- Core Web Vitals;
- SEO local;
- auditoria final.

### Fase 10 — Produção
- testes;
- backup;
- publicação;
- monitoramento.

---

## 19. Critérios de aceite

Uma funcionalidade só é considerada concluída quando:

- funciona em mobile;
- funciona em desktop;
- não quebra outras áreas;
- passa typecheck;
- passa build;
- passa lint PHP;
- não expõe segredos;
- possui tratamento de erro;
- foi documentada;
- foi testada em produção/homologação;
- mantém identidade GNS;
- atende objetivo comercial.

---

## 20. Regra final para IA e desenvolvedores

Antes de executar:

- entender o pedido;
- analisar impacto;
- localizar arquivos;
- preservar comportamento;
- fazer alteração mínima;
- validar;
- documentar;
- informar riscos.

Nunca:

- remover funcionalidade útil;
- inventar endpoint;
- inventar credencial;
- expor token;
- alterar banco sem migração;
- quebrar produção;
- copiar concorrente literalmente;
- misturar estilos sem coerência.

Sempre:

- superar o nível atual;
- manter a marca;
- pensar além do layout;
- considerar vendas, operação e crescimento;
- entregar algo digno da nova fase da GNS Fibra.

---

## 21. Estado atual do frontend publico

Atualizado em 16/07/2026.

A pagina publica da GNS Fibra 2.0 passa a incluir, no frontend, as secoes de suporte humanizado e FAQ antes do CTA final de contato/WhatsApp.

Ordem publica atual:

1. Hero
2. Stats
3. Diferenciais
4. Planos
5. Beneficios
6. Tecnologias
7. Empresarial
8. Cobertura
9. Historia
10. Suporte
11. Depoimentos
12. FAQ
13. Contato
14. Footer

O FAQ usa conteudo administravel quando a API esta disponivel, preserva fallback local no `SiteContentProvider` e gera `FAQPage` a partir das perguntas visiveis.

Atualizacao em 16/07/2026: o FAQ passou a ter fluxo administravel local de ponta a ponta no Painel Administrativo 2.0, com tabela `faqs`, CRUD PHP em `admin/faqs.php`, entrega por `api/site-content.php` e normalizacao em `src/services/site-content-service.ts`. O fallback local permanece preservado para API antiga ou indisponivel.

Atualizacao em 16/07/2026: os Beneficios passaram a ter fluxo administravel local de ponta a ponta no Painel Administrativo 2.0, com tabela `benefits`, CRUD PHP em `admin/beneficios.php`, entrega por `api/site-content.php` e normalizacao em `src/services/site-content-service.ts`. O fallback local permanece preservado para API antiga ou indisponivel, `benefits: []` oculta a secao e o slug `camera-seguranca` continua protegido pela regra comercial que exige plano publico com feature de camera.

Atualizacao em 16/07/2026: as Tecnologias passaram a ter fluxo administravel local de ponta a ponta no Painel Administrativo 2.0, com tabela `technologies`, CRUD PHP em `admin/tecnologias.php`, entrega por `api/site-content.php` e normalizacao em `src/services/site-content-service.ts`. O fallback local permanece preservado para API antiga ou indisponivel, `technologies: []` oculta a secao e o aviso tecnico publico permanece inalterado.

Atualizacao em 16/07/2026: Suporte e CTA final passaram a ter textos principais administraveis pelo modulo Configuracoes, usando chaves `support_*` e `cta_*` na tabela `settings`. A API publica continua entregando essas chaves dentro do mapa `settings`, o TypeScript normaliza `support` e `cta` com fallback local, e `support_enabled = 0` ou `cta_enabled = 0` ocultam as secoes sem alterar layout, mascotes ou mensagens de outros blocos.

Atualizacao em 17/07/2026: Estatisticas e Diferenciais passaram a ter fluxo administravel local de ponta a ponta no Painel Administrativo 2.0, com tabelas explicitas `stats` e `differentials`, CRUDs PHP em `admin/estatisticas.php` e `admin/diferenciais.php`, entrega por `api/site-content.php` e normalizacao em `src/services/site-content-service.ts`. O fallback local permanece preservado para API antiga ou indisponivel, `stats: []` e `differentials: []` ocultam as secoes, e os numeros comerciais publicados foram mantidos exatamente como estavam no conteudo local ate confirmacao futura com responsavel da GNS.

Atualizacao em 17/07/2026: Historia / Quem Somos passou a ter fluxo administravel local de ponta a ponta, com conteudo institucional unico em `settings` por chaves `history_*`, galeria repetivel em `history_gallery`, CRUD PHP em `admin/historia-galeria.php`, grupo especifico em `admin/configuracoes.php`, entrega por `api/site-content.php` e normalizacao em `src/services/site-content-service.ts`. `years_in_market` continua sendo a fonte unica dos anos de atuacao, `about_text` permanece como texto institucional geral, e o fallback local da secao e da galeria permanece preservado.

As poses V2 publicadas no site sao: Hero, Tecnologias, Empresarial, Suporte, FAQ e Contato/WhatsApp. As poses restantes continuam reservadas para campanhas, confirmacoes e futuras telas aprovadas.

---

# Encerramento

Este projeto representa uma nova etapa da GNS Fibra e também uma nova etapa profissional para todos os envolvidos.

A meta é construir um produto:

- forte;
- moderno;
- rápido;
- seguro;
- vendável;
- memorável;
- escalável;
- preparado para crescer.

**Palavra-chave: Bora 😎**
Atualização em 18/07/2026: os CRUDs de Galeria da História e Banners distinguem `Remover imagem` de `Excluir`. A primeira ação limpa somente o campo de arquivo, preservando o registro e todos os textos; a segunda continua removendo o registro. A exclusão física ocorre após a atualização do banco e somente para uploads gerenciados, não compartilhados e contidos no diretório permitido. Arquivos versionados/protegidos apenas perdem a referência no banco. A História recebe `image_path: null` e mostra placeholder; banners sem imagem permanecem no painel e na API, mas continuam sem consumo no frontend atual.

Atualização em 18/07/2026: imagens de fundo passaram a ser administráveis de ponta a ponta. O Hero usa o primeiro banner ativo com imagem por `display_order, id`; Cobertura usa `settings.coverage_image_path`; CTA final usa `settings.cta_background_image_path`. Os assets locais anteriores permanecem como fallback, e falhas de caminho ou arquivo não geram imagem quebrada. Uploads usam nomes aleatórios em diretórios específicos e refletem no site sem novo build.
