# Implementação — Indique e Ganhe — GNS Fibra 2.0

Data: 23/07/2026

## Objetivo

Criar um fluxo completo de indicações sem integração com IXC nesta etapa.

O módulo permite:

- receber indicações pelo site;
- registrar consentimento;
- armazenar os dados com segurança;
- acompanhar o processo no painel;
- atualizar status;
- registrar observações internas;
- impedir concessão automática de recompensa.

## Banco de dados

Foi criada a migration:

`database/migration-2026-07-23-create-referrals.sql`

Tabela:

`referrals`

Campos principais:

- dados do cliente indicador;
- dados da pessoa indicada;
- contrato opcional;
- cidade e bairro;
- consentimento;
- data do consentimento;
- versão da política de privacidade;
- status;
- origem;
- observações internas;
- hash técnico do IP;
- timestamps.

Status disponíveis:

- `new`;
- `contacted`;
- `qualified`;
- `installed`;
- `rewarded`;
- `invalid`;
- `cancelled`.

## Endpoint público

Foi criado:

`api/referrals.php`

Proteções implementadas:

- somente método POST;
- somente JSON;
- limite de tamanho do corpo;
- validação de origem;
- rejeição de campos extras;
- normalização de textos;
- normalização de telefones;
- validação de campos obrigatórios;
- consentimento obrigatório;
- honeypot antispam;
- rate limit;
- bloqueio de telefone indicado repetido em 24 horas;
- prepared statements;
- respostas JSON padronizadas;
- ausência de exposição de erros internos.

O endereço IP original não é armazenado.

É salvo somente um hash rotativo diário para auxiliar na prevenção de abuso.

## Painel administrativo

Foi criado:

`admin/indicacoes.php`

O painel permite:

- visualizar todas as indicações;
- filtrar por status;
- acompanhar dados do indicador;
- acompanhar dados da pessoa indicada;
- verificar consentimento;
- verificar origem;
- atualizar status operacional;
- registrar observações internas.

Os dados pessoais recebidos não podem ser alterados pelo painel.

Não existe criação manual nem exclusão direta pela interface.

## Dashboard e navegação

Foram adicionados:

- item Indicações no menu;
- contador de indicações novas e total;
- acesso rápido ao acompanhamento.

## Frontend

Foi criado:

`src/components/site/ReferralSection.tsx`

Recursos:

- formulário responsivo;
- temas claro e escuro;
- validação no navegador;
- envio para a API;
- telefone formatado;
- mensagens de sucesso e erro;
- consentimento obrigatório;
- honeypot invisível;
- estado de envio;
- limpeza do formulário após sucesso;
- aviso de que benefício não é automático.

A seção foi inserida entre FAQ e CTA final.

## Mascote

Foi utilizado:

`src/assets/mascote/v2/conversao-comemorando.png`

O asset corresponde ao mascote oficial reservado para conversão, confirmação e Indique e Ganhe.

## Regras comerciais

O formulário não promete recompensa automática.

O site informa que:

- a indicação depende de análise;
- a cobertura e a viabilidade técnica precisam ser confirmadas;
- a instalação precisa ser concluída;
- o benefício depende das regras comerciais vigentes.

## Testes realizados

- migration importada;
- estrutura e índices validados;
- envio válido;
- gravação no banco;
- consentimento registrado;
- hash técnico gerado;
- duplicidade bloqueada;
- envio sem consentimento bloqueado;
- honeypot sem gravação;
- painel exibindo indicação;
- atualização de status;
- observações internas;
- filtro por status;
- contador do dashboard;
- envio pelo frontend;
- mensagem de sucesso;
- limpeza do formulário;
- tema claro;
- tema escuro;
- visual responsivo;
- PHP lint completo;
- TypeScript aprovado;
- build aprovado;
- diff check aprovado.

## Observação conhecida

O build continua exibindo o aviso conhecido sobre:

`theme-init.js`

O aviso não bloqueia a compilação.

## Estado final

O módulo está pronto para uso local e posterior publicação.

A integração com IXC permanece fora desta fase.

Nenhuma recompensa é concedida automaticamente.