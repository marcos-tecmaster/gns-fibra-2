# GNS Fibra

Frontend institucional em React, TypeScript, Vite e Tailwind CSS.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Produção

```bash
npm run typecheck
npm run build
npm run preview
```

O build é gerado em `dist/`.

## Conteúdo e integração PHP

- `src/lib/site-content.ts`: fallback local para indisponibilidade da API.
- `src/content/types.ts`: contrato dos dados consumidos pela interface.
- `src/services/site-content-service.ts`: consumo e normalização da API.
- `src/content/SiteContentProvider.tsx`: distribuição dos dados para os componentes.

O frontend consome `/api/site-content.php`. Durante `npm run dev`, o Vite
encaminha `/api` para `http://127.0.0.1/gns-fibra/api` por padrão.

Para outro endereço local, defina antes de iniciar o Vite:

```powershell
$env:GNS_PHP_ORIGIN="http://127.0.0.1"
$env:GNS_PHP_BASE_PATH="/gns-fibra"
npm run dev
```

Também é possível definir `VITE_SITE_CONTENT_API` para substituir o endpoint
consumido pelo navegador.
