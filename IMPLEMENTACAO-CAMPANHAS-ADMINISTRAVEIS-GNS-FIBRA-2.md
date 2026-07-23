# Implementação — campanhas administráveis — GNS Fibra 2.0
Data: 23/07/2026
Baseline: `2847252 docs: document admin-managed visual identity`
Commit técnico: `afc3763 feat: add admin-managed campaigns`
## Objetivo
Adicionar um módulo completo de campanhas sazonais e comerciais, administrável pelo painel, sem publicar conteúdos fictícios e sem alterar as seções existentes quando não houver campanha válida.
## Banco de dados
Foi criada a migration:
`database/migration-2026-07-22-create-campaigns.sql`
Tabela:
`campaigns`
Campos principais:
- identificador único;
- nome interno;
- chamada superior;
- título público;
- descrição;
- condições;
- imagem opcional;
- texto alternativo;
- CTA;
- data de início;
- data de término;
- status;
- ordem de exibição;
- timestamps.
A migration usa `CREATE TABLE IF NOT EXISTS`, não apaga dados e não insere campanhas fictícias.
## Painel administrativo
Foi criado:
`admin/campanhas.php`
Recursos implementados:
- criação;
- edição;
- exclusão;
- ativação e desativação;
- controle de período;
- ordenação;
- upload de JPG, PNG ou WebP;
- limite de 5 MB;
- validação MIME real;
- nome aleatório;
- remoção isolada da imagem;
- validação de URL segura;
- validação de datas;
- exigência de texto alternativo quando houver imagem;
- rejeição de campos não permitidos;
- proteção CSRF.
O painel recomenda imagens em:
`1500 x 1000 px`
Proporção:
`3:2`
## Dashboard e navegação
Foram adicionados:
- item Campanhas no menu administrativo;
- contador de campanhas vigentes e total;
- atalho Nova campanha.
## API
A API publica somente campanhas que atendam simultaneamente:
- `active = 1`;
- data de início menor ou igual à data atual;
- data de término maior ou igual à data atual.
O nome interno não é publicado.
Quando não existe campanha válida, a API retorna:
`"campaigns": []`
## Frontend
Foi criado:
`src/components/site/Campaigns.tsx`
Comportamento:
- a seção não aparece quando a coleção está vazia;
- nenhuma faixa vazia é renderizada;
- campanhas aparecem após o Hero;
- suporte a temas claro e escuro;
- suporte a desktop e mobile;
- datas em formato brasileiro;
- CTA interno ou externo;
- condições em bloco expansível;
- imagem inteira com `object-contain`;
- fundo desfocado da própria imagem para preencher o espaço;
- fallback com ícone de megafone quando não há imagem;
- proteção contra caminhos e URLs inválidos.
## Fallback
O conteúdo local usa:
`campaigns: []`
Portanto, falha da API não cria campanha fictícia.
## Testes realizados
- migration importada com sucesso;
- `DESCRIBE campaigns` validado;
- tela administrativa validada;
- campanha inativa não publicada;
- campanha ativa e vigente publicada;
- dashboard exibindo contador correto;
- API retornando campanha válida;
- seção pública validada;
- tema claro validado;
- tema escuro validado;
- upload de imagem validado;
- remoção isolada da imagem validada;
- fallback com megafone validado;
- restauração de imagem validada;
- botão para Planos validado;
- campanha desativada e removida do site;
- `php -l` aprovado;
- `npm.cmd run typecheck` aprovado;
- `npm.cmd run build` aprovado;
- `git diff --check` aprovado.
## Observação conhecida
O build continua exibindo o aviso conhecido sobre:
`theme-init.js`
O aviso não impede a compilação e o build termina com código de saída zero.
## Estado final
O módulo está pronto para uso real.
Nenhuma campanha fictícia permanece publicada.
A campanha de teste pode permanecer inativa no banco local para validações futuras.