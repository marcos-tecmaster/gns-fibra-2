# Implementação — logo e identidade visual administráveis — GNS Fibra 2.0

Data: 19/07/2026
Baseline: `bc5f9e1 docs: document hero and coverage content alignment`

## Estado anterior

Header e Footer referenciavam diretamente `${import.meta.env.BASE_URL}logo-gns.png`. Login e sidebar do painel usavam `../logo-gns.png`. Não existia configuração de logo no banco ou no contrato TypeScript.

## Arquitetura final

- logo oficial imutável e versionada: `public/logo-gns.png`;
- setting opcional: `company_logo_path`;
- upload relativo: `uploads/branding/<32-hex>.png|jpg|webp`;
- vazio ou ausência da setting: logo oficial;
- caminho inválido, externo, ausente ou erro de carregamento: logo oficial;
- favicon, Open Graph, login e marca fixa da sidebar administrativa permanecem independentes.

Não foi criada tabela, migration ou configuração estrutural obrigatória. `settings` já aceita chaves dinâmicas; por isso `schema.sql`, `seed.sql`, migrations e `database/verify-database.php` não foram alterados. A ausência e o valor vazio de `company_logo_path` são estados válidos equivalentes.

## Painel e upload

Configurações recebeu o grupo “Identidade visual” antes de “Empresa e contato”. Ele mostra a logo efetiva em fundo neutro, com `object-fit: contain`, identifica “Logo oficial padrão” ou “Logo personalizada”, aceita PNG/JPG/WebP até 5 MB e apresenta ação isolada de remoção.

O fluxo reutiliza `upload_image()` e mantém MIME real por Fileinfo, extensão derivada do MIME, limite de tamanho, nome aleatório, CSRF, autenticação, allowlist de campos, transação e rollback. O diretório passou a ser validado por allowlist de caracteres. Exclusões de settings recebem o diretório esperado; a logo só pode remover arquivo em `uploads/branding/`, nunca `public/logo-gns.png` ou outro upload.

Substituição salva um arquivo novo, persiste a setting e só então remove o anterior se ele não estiver compartilhado. Remoção limpa somente `company_logo_path`, exclui o upload gerenciado não compartilhado e mostra: “Logo personalizada removida. A logo oficial padrão voltou a ser utilizada.”

## API e frontend

A API já publicava todas as settings no bloco `settings`; o mapeamento agora garante chaves e valores textuais sem expor caminho físico ou metadados internos. `ApiSettings` reconhece `company_logo_path`.

`config.company.logoUrl` foi incluído no tipo e no fallback local. A logo oficial usa `import.meta.env.BASE_URL`, preservando publicação em subdiretório. O caminho remoto é processado por `normalizePublicAssetPath()` com opções restritas para logo: apenas o diretório `branding`, extensões JPG/PNG/WebP e nenhum URL remoto.

O componente compartilhado `BrandLogo` centraliza dimensões, classes, carregamento, alt e fallback. Em erro, tenta a logo oficial uma única vez; se o próprio fallback falhar, não entra em loop.

Header usa alt `${config.company.name} - Logo`, dimensões reservadas, carregamento eager e prioridade alta. Footer usa a mesma origem e mantém `alt=""`, pois a imagem está no mesmo link que o nome visível da empresa; isso evita repetição no nome acessível.

## Testes realizados

- fallback oficial confirmado no painel, Header e Footer, com imagem 1080×1080 carregada;
- logo personalizada existente confirmada simultaneamente no Header e Footer;
- caminho físico ausente confirmou fallback no Header e no Footer após carregamento lazy;
- URL externa confirmou rejeição antes da renderização;
- upload HTTP real pelo Apache usando o próprio `upload_image()`: PNG, JPG e WebP retornaram 200 e nomes aleatórios de 32 caracteres hexadecimais;
- `package.json` enviado como imagem foi rejeitado com 422 por MIME;
- fixture de 5.242.881 bytes foi rejeitada com 422 pelo limite de 5 MB;
- substituições PNG → JPG → WebP removeram somente o arquivo anterior depois da persistência;
- remoção final apagou somente o WebP temporário e preservou todas as demais settings;
- hash das 36 settings antes e depois: `c07a68aff717ef2da6767076eb5273580abd17a68b4e62966d1533753c8e5f4e`;
- todos os uploads, harnesses e fixtures temporários foram removidos;
- a tentativa de upload pela automação do Chrome ficou bloqueada porque a extensão não possui acesso a URLs de arquivo; o mesmo fluxo foi validado diretamente no Apache, mas a repetição manual pelo seletor do navegador permanece pendente;
- a conexão do navegador foi interrompida antes da matriz completa de 360/390/414/430/768/1280/1440; a inspeção desktop não mostrou overflow, e as dimensões/classes existentes foram preservadas.

## Limites da fase

- não redesenha nem otimiza a logo oficial;
- não torna favicon, manifest, PWA ou Open Graph administráveis;
- não altera automaticamente login ou sidebar do painel;
- não adiciona biblioteca;
- não inclui upload no Git;
- não cria migration ou seed para uma setting opcional.
