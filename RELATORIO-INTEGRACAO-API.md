# Integração React com API PHP

## Alterações

- Criado `src/services/site-content-service.ts`.
- O `SiteContentProvider` passou a carregar `/api/site-content.php`.
- Configurações, planos, cobertura e depoimentos são normalizados para o
  contrato visual existente.
- `site-content.ts` permanece como fallback integral.
- Links de WhatsApp agora usam a configuração recebida da API.
- Hero e seção Nossa História usam os textos administráveis.
- Adicionado proxy de desenvolvimento no Vite.

## Comportamento do fallback

O conteúdo local é renderizado imediatamente. A API é consultada em segundo
plano e, quando responde corretamente, substitui os dados sem tela de
carregamento ou alteração de layout. Em erro HTTP, timeout, JSON inválido ou
indisponibilidade do PHP, o conteúdo local permanece visível.

Listas vazias retornadas com sucesso pela API são respeitadas. O fallback só é
ativado quando a requisição falha.

## Endpoint

```text
/api/site-content.php
```

O timeout configurado no frontend é de 5 segundos.
