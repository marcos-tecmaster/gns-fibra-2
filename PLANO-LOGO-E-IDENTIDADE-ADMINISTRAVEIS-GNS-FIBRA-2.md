# Plano — Logo e identidade administráveis — GNS Fibra 2.0

## 1. Objetivo e limite

Permitir que um administrador autorizado substitua a logo do site sem eliminar a logo oficial versionada. Favicon, imagem Open Graph e marca do painel são ativos relacionados, mas não devem ser tratados automaticamente como a mesma imagem.

## 2. Estado atual comprovado

| Ativo | Dimensões | Peso | SHA256 | Consumidores |
|---|---:|---:|---|---|
| `public/logo-gns.png` | 1080×1080 | 2.156.795 B | `317274AA99C55E13BC47EDA12DFF7BE76D34693B3D92CDF53B03EA03A3910E5D` | Header, Footer, login e layout admin |
| `public/favicon.svg` | viewport 384×384; PNG interno 1024×1024 | 1.541.628 B | `FBE035A3159ED792A42FA...` (arquivo SVG) | frontend e admin |
| `public/og-image.jpg` | 1920×1080 | 160.700 B | `22FA0B1A4553DE0F53A30D54F947494AD274B21F24DB0A2BD3FF7E270A97D291` | Open Graph e Twitter Card |

Header e Footer usam a mesma fonte visual: `${import.meta.env.BASE_URL}logo-gns.png`. O painel usa `../logo-gns.png`. Não existe duplicata física da logo principal fora de `dist`; o build copia o arquivo para o artefato.

## 3. Arquitetura proposta

### Setting

- Chave: `site_logo_path`.
- Valor: caminho relativo gerenciado (`uploads/logos/<32-hex>.png|webp`) ou string vazia.
- String vazia significa usar o fallback oficial; nunca significa “sem logo”.
- A API pode expor a chave dentro de `settings`, como já faz com imagens de Cobertura e CTA.

### Fallback obrigatório

- Fallback imutável e versionado: `public/logo-gns.png`.
- Não permitir exclusão do fallback pelo painel.
- Se setting vazio, caminho rejeitado, arquivo ausente ou erro de carregamento: retornar imediatamente ao fallback.
- O botão “Restaurar logo oficial” deve apenas esvaziar o setting e remover o upload antigo se não estiver compartilhado.

### Diretório

- `uploads/logos/` já existe com `.gitkeep`.
- Nomes aleatórios: `bin2hex(random_bytes(16))`.
- Não reutilizar nome; substituição deve gerar nova URL e evitar cache obsoleto.
- Uploads futuros permanecem ignorados pelo Git; não criar exceção genérica em `.gitignore`.

## 4. Formatos e dimensões

- Permitir: PNG e WebP.
- Não recomendar/idealmente rejeitar JPEG por perder transparência e introduzir fundo sólido.
- MIME real por `finfo`, nunca confiar apenas na extensão.
- Limite: 2 MB.
- Dimensão recomendada: 512×512 a 1024×1024 para a marca quadrada atual.
- Mínimo sugerido: 256×256; máximo sugerido: 2048×2048.
- Preservar proporção; a interface deve avisar se a imagem for extremamente horizontal/vertical.
- Não redimensionar no servidor na primeira versão; validar dimensões e orientar o operador.

## 5. Painel administrativo

Adicionar grupo “Logo e identidade” em Configurações com:

1. preview da logo efetiva (upload ou fallback);
2. indicação “Logo personalizada” ou “Logo oficial”;
3. campo de upload PNG/WebP;
4. texto de formato, dimensão e limite;
5. botão “Substituir logo”;
6. ação POST separada “Restaurar logo oficial”, com CSRF e confirmação;
7. mensagem de sucesso/erro;
8. estado sempre com preview válido.

Não misturar a ação de restauração com salvamento geral de settings. Isso reduz a chance de apagar outros campos por engano.

## 6. Backend e banco

1. Migration idempotente adiciona `site_logo_path` somente se a chave não existir.
2. `schema.sql` documenta o setting; `seed.sql` usa valor vazio e não sobrescreve personalização.
3. Criar variante de `upload_image` que aceite lista de MIME e limite configuráveis, ou argumentos opcionais seguros; evitar duplicar validação.
4. Validar dimensão com `getimagesize` após `finfo`.
5. Salvar o novo arquivo antes da transação; atualizar setting; remover o antigo somente após commit.
6. Em falha, remover apenas o novo arquivo aleatório.
7. `delete_setting_uploaded_file_if_unused` continua protegendo referências compartilhadas.
8. Nunca aceitar URL remota, caminho absoluto, traversal ou `data:` no setting.

## 7. API e frontend

### API → normalizador

- Incluir `site_logo_path` em `ApiSettings`.
- Resolver por `normalizePublicAssetPath`.
- Adicionar `config.brand.logo` ou `branding.logoUrl` ao contrato TypeScript; preferir um bloco `branding` para futuras extensões.
- Fallback local continua apontando para `logo-gns.png` via `BASE_URL`.

### Header e Footer

- Usar um único resolvedor/componente de logo compartilhado para impedir divergência.
- Manter dimensões de layout atuais; trocar somente o `src`.
- `onError` deve aplicar fallback uma única vez para evitar loop.
- Logo decorativa acompanhada de texto: `alt=""`; quando usada isoladamente, `alt="GNS Fibra"`.
- Não permitir que uma logo muito larga gere overflow; usar `object-contain`, `max-width` e dimensões reservadas.

## 8. Painel administrativo

Há duas opções:

- Fase 1 recomendada: login e sidebar também usam a logo efetiva do setting, resolvida por helper PHP `site_logo_url()` com fallback.
- Fase futura: criar `admin_logo_path` somente se o cliente realmente precisar de marca distinta no painel.

Evitar duplicar leitura do banco em cada fragmento; usar o cache de settings já existente em `admin/includes/bootstrap.php`.

## 9. Favicon

- Não derivar automaticamente da logo enviada.
- Razões: favicon precisa de recorte legível em 16/32 px, formato e cache próprios.
- Otimizar o atual: remover PNG base64 de 1,15 MB e gerar SVG vetorial real ou conjunto PNG/ICO pequeno aprovado.
- Futuro setting separado: `site_favicon_path`, com formatos/validações próprios.
- Manter fallback `public/favicon.svg` até aprovação visual.

## 10. Open Graph e Twitter

- Não usar automaticamente a logo quadrada como imagem social.
- OG exige composição horizontal (recomendação operacional 1200×630); o arquivo atual é 1920×1080 e coincide com o Hero.
- Futuro setting separado: `site_og_image_path`.
- Metadados são estáticos em `index.html`; para administração real, será necessário renderização no servidor, geração de HTML no deploy ou estratégia de metadados dinâmica compatível com crawlers.

## 11. Segurança

- Autenticação e CSRF obrigatórios.
- PNG/WebP, MIME real e máximo 2 MB.
- Validar dimensões e decodificação real; rejeitar imagem corrompida.
- Nome aleatório, permissões de diretório mínimas e execução PHP bloqueada.
- Caminho relativo com regex restrita e confirmação por `realpath` na exclusão.
- Não expor caminho local, stack trace ou mensagem de filesystem.
- Não permitir SVG no upload inicial: SVG requer sanitização contra script, referências externas e payloads ativos.
- Registrar futuramente quem substituiu/restaurou a identidade.

## 12. Cache

- Nome aleatório novo elimina necessidade de query string de versão.
- Fallback versionado pode continuar com cache do build.
- API tem cache de 60 s; informar no painel que a troca pode levar até esse intervalo.
- Em CDN, invalidar somente o JSON/API se necessário; não sobrescrever arquivo existente.

## 13. Implantação

1. Corrigir/alinha o nome do banco usado por schema/migrations antes da migration.
2. Fazer backup do banco e de `uploads/logos`.
3. Aplicar migration idempotente no banco correto.
4. Publicar código e build limpo.
5. Confirmar escrita em `uploads/logos` e bloqueio de execução.
6. Testar upload PNG e WebP, erro de formato/tamanho, substituição e restauração.
7. Testar Header/Footer/login/sidebar em Dark/Light e 360/390/414/430/desktop.
8. Testar falha física removendo apenas uma cópia em homologação e confirmando fallback (não em produção).
9. Verificar API, cache e ausência de overflow.

## 14. Critérios de aceite

- Nunca existe estado visual sem logo.
- Header, Footer e painel mostram a mesma logo efetiva na Fase 1.
- Upload inválido não altera setting nem remove a logo anterior.
- Restauração volta ao arquivo oficial e remove com segurança apenas o upload antigo sem uso.
- Favicon e OG permanecem independentes.
- Build, PHP lint, typecheck, teste mobile e `git diff --check` aprovados.

## 15. Arquivos previstos para implementação futura

- `database/migration-<data>-add-site-logo-setting.sql`
- `database/schema.sql`
- `database/seed.sql`
- `config/auth.php`
- `admin/configuracoes.php`
- `admin/includes/bootstrap.php`
- `admin/includes/layout.php`
- `admin/login.php`
- `api/site-content.php`
- `src/content/types.ts`
- `src/lib/site-content.ts`
- `src/services/site-content-service.ts`
- `src/components/site/Header.tsx`
- `src/components/site/Footer.tsx`
- possível novo componente compartilhado `src/components/site/SiteLogo.tsx`

Este plano não foi implementado durante a auditoria.
