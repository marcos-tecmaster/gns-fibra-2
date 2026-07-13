# Relatório de auditoria de encoding

## Escopo

Foram auditados arquivos `.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.php`,
`.html`, `.md` e `.sql`, excluindo dependências e artefatos gerados.

## Diagnóstico

Os arquivos-fonte já continham os textos corretos em UTF-8. A corrupção estava
nos registros do MySQL, causada por uma importação feita com o charset padrão
do cliente Windows.

Os registros afetados incluíam termos de pagamento, câmera de segurança,
nomes de cidades e nomes de clientes. Todos foram restaurados com seus acentos
corretos.

## Correções

- Adicionado `SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci` em
  `database/schema.sql` e `database/seed.sql`.
- Banco reimportado usando `--default-character-set=utf8mb4`.
- Dados de configurações, planos, cobertura, depoimentos e banners corrigidos.
- Todos os 49 arquivos auditados foram regravados em UTF-8 sem BOM.
- Instruções de importação atualizadas em `ADMIN-README.md`.

## Validação

- Zero arquivos com BOM.
- Zero arquivos com UTF-8 inválido.
- Zero caracteres de substituição `U+FFFD`.
- Zero padrões de mojibake nos fontes e no banco.
- API retorna `application/json; charset=utf-8`.
- A API retorna corretamente `Cartão`, `crédito`, `débito`, `câmera`,
  `segurança`, `Viamão`, `Bagé` e `Patrícia`.
- TypeScript e build de produção concluídos sem erros.
