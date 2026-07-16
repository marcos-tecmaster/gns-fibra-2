# IMPLEMENTACAO DA COLECAO DE MASCOTES V2 - GNS FIBRA 2.0

Data: 15/07/2026
Fase: sistema oficial de mascotes - colecao V2
Status: implementado localmente, sem commit

## 1. Escopo

Esta fase recebeu, auditou e integrou a colecao oficial V2 de oito poses do mascote em:

`docs/branding/mascote/originais/v2-oficiais/`

Os originais foram apenas lidos, medidos e conferidos visualmente. Nenhum original foi sobrescrito, recortado, redimensionado, recomprimido, espelhado, recolorido, corrigido por IA ou movido.

Alteracoes publicas aplicadas:

- Hero: substituicao do mascote provisorio pela pose oficial `hero-apresentando-apontando.png`.
- Tecnologias: insercao da pose `wifi-turbo.png` como apoio visual unico da secao.
- Empresarial: insercao da pose `empresarial-notebook.png` como apoio visual da secao.

Permaneceram preservados: precos, planos, velocidades, regras comerciais, API PHP, painel administrativo, banco, migrations, IXC, Indique e Ganhe, Header, navegacao, Coverage, History, Testimonials e Footer.

## 2. Seguranca do Git

Antes de alterar arquivos foram executados:

- `git status --short`: worktree ja possuia alteracoes nao commitadas da integracao experimental do mascote e outras alteracoes locais; nada estava staged.
- `git stash list`: stash preservado em `stash@{0}: On main: wip: integração do mascote aguardando pose oficial`.
- `git diff --check`: aprovado, com avisos LF/CRLF esperados em arquivos ja modificados no Windows.

Nao foram executados `git reset --hard`, `git clean -fd`, `git stash pop`, `git stash drop`, `git checkout -- .`, commit ou push.

## 3. Auditoria dos originais V2

Todos os oito originais sao PNG RGBA 8-bit com canal alpha. A transparencia foi medida pelo menor retangulo que contem pixels com alpha maior que zero.

| Arquivo | Dimensoes | Peso | Limites reais do conteudo | Margens transparentes | SHA-256 | Halo | Uso recomendado |
| --- | ---: | ---: | --- | --- | --- | --- | --- |
| `apresentando-reserva.png` | 1080 x 1350 px | 1.381.755 bytes | L34 / T12 / R1013 / B1320, 980 x 1309 px | L34 / T12 / R66 / B29 | `B545EBD8DC2CAF21CD80EF7938630A19A7AF3628F1C249299082C483DA35F192` | contorno verde fino discreto | campanhas, planos ou beneficios |
| `contato-whatsapp-acenando.png` | 1080 x 1350 px | 1.134.032 bytes | L76 / T48 / R911 / B1297, 836 x 1250 px | L76 / T48 / R168 / B52 | `3DA22BECB11BD8B8689EDA29B9D43A22DDCF9838EAF9C265F04CE307BBC745B1` | contorno verde fino discreto | CTA final e contato/WhatsApp |
| `conversao-comemorando.png` | 1080 x 1350 px | 1.094.527 bytes | L57 / T80 / R1028 / B1271, 972 x 1192 px | L57 / T80 / R51 / B78 | `0CA7856F1988CBD446B1DF8E3A29822008C610F008E8EBA14006F41F7F2C29DD` | contorno verde fino discreto | confirmacao de formulario e Indique e Ganhe |
| `empresarial-notebook.png` | 1080 x 1350 px | 1.162.618 bytes | L83 / T42 / R1004 / B1267, 922 x 1226 px | L83 / T42 / R75 / B82 | `C9D30377147F200D3B642EC94EDD57837F9AAB992B91C9C2A9FB052B93C5ED8D` | contorno verde fino discreto | secao Empresarial, suporte e home office |
| `faq-pensando.png` | 1080 x 1350 px | 1.070.379 bytes | L151 / T21 / R886 / B1281, 736 x 1261 px | L151 / T21 / R193 / B68 | `5FE09714C5DC4DEEAB7FE2098A756CB1601293A40628E844BD8DB78D37AC1070` | contorno verde fino discreto | futura secao FAQ |
| `hero-apresentando-apontando.png` | 1080 x 1350 px | 1.014.517 bytes | L90 / T86 / R975 / B1276, 886 x 1191 px | L90 / T86 / R104 / B73 | `05F325808433F298354ED849D7EC8FE22DF7CF0619E6F76255BF131BA0FBFB07` | contorno verde fino discreto | Hero, apontando para texto e CTAs |
| `suporte-tecnico.png` | 1080 x 1350 px | 1.075.667 bytes | L143 / T37 / R996 / B1278, 854 x 1242 px | L143 / T37 / R83 / B71 | `0B5600810A4031F3A0A686EDEF4A8F7571870797DC290B8010B591DAA7278E77` | contorno verde fino discreto | atendimento humanizado e suporte tecnico |
| `wifi-turbo.png` | 1080 x 1350 px | 1.391.504 bytes | L71 / T0 / R999 / B1348, 929 x 1349 px | L71 / T0 / R80 / B1 | `2A62EF4206F3D753150EC446308218DCA728CA4816FA3E2352EB12867F1EC1FB` | contorno verde fino discreto | Tecnologias e performance Wi-Fi |

Integridade visual conferida:

- antenas, maos, pes, rosto e uniforme preservados em todas as poses;
- logo GNS Fibra legivel no uniforme em todas as poses;
- `empresarial-notebook.png` tambem preserva a logo GNS Fibra no notebook;
- elementos complementares preservados: simbolo Wi-Fi Turbo, balao de pergunta, headset, notebook e gestos das maos;
- nenhum conteudo encosta nas bordas dos derivados de producao; no original `wifi-turbo.png`, o conteudo toca o topo do canvas, por isso o derivado recebeu margem transparente nova.

## 4. Assets de producao

Foram gerados somente os tres arquivos usados nesta fase em:

`src/assets/mascote/v2/`

Metodo utilizado:

1. Medicao de alpha dos originais em Node com `zlib`, sem dependencias novas.
2. Recorte pelo retangulo real de conteudo.
3. Recomposicao em canvas transparente com 48 px de margem segura.
4. Redimensionamento bicubico de alta qualidade via encoder PNG nativo do Windows.
5. Exportacao PNG RGBA, preservando transparencia, proporcao, cores, logo, antenas, maos, pes e elementos complementares.

Nao foram gerados WebP ou AVIF porque `magick`, `cwebp` e encoders dedicados nao estavam disponiveis, e nenhuma dependencia pesada foi instalada apenas para conversao.

| Asset de producao | Origem | Dimensoes finais | Peso final | Economia | SHA-256 final |
| --- | --- | ---: | ---: | ---: | --- |
| `src/assets/mascote/v2/hero-apresentando-apontando.png` | 1.014.517 bytes | 687 x 900 px | 540.995 bytes | 473.522 bytes, 46,67% | `583CC01A2B8A0F95AB7B827EFF9F812CA00E9A2CD82BCA4F59AEA1D5A26FD412` |
| `src/assets/mascote/v2/wifi-turbo.png` | 1.391.504 bytes | 596 x 840 px | 528.774 bytes | 862.730 bytes, 62,00% | `75EE67B402B1E303B73D89245A3AEE6E987308B554B718C488A4C26F8413C24F` |
| `src/assets/mascote/v2/empresarial-notebook.png` | 1.162.618 bytes | 647 x 840 px | 516.793 bytes | 645.825 bytes, 55,55% | `3D7CE8BFDBBB79E6CF745A31FC51C25A52C9717A8524700AA26E2B43AA7279E2` |

## 5. Integracao publica

### Hero

`HeroMascot.tsx` agora importa somente `src/assets/mascote/v2/hero-apresentando-apontando.png`.

Resultado:

- pose oficial no lado direito;
- gesto apontando para a area de texto e CTAs;
- sem espelhamento por CSS;
- imagem de fibra, titulo dinamico, descricao dinamica, CTAs, indicadores e unico `h1` preservados;
- `width={687}`, `height={900}`, `loading="eager"` e `decoding="async"`.

### Tecnologias

`Technologies.tsx` importa somente `src/assets/mascote/v2/wifi-turbo.png`.

Resultado:

- mascote usado como apoio visual unico da secao, sem repeticao em cards;
- quatro itens tecnologicos permanecem legiveis;
- aviso de disponibilidade tecnica preservado;
- desktop com painel tecnico e mascote em composicao lateral;
- mobile em fluxo normal, com o mascote antes do painel e tamanho controlado;
- `loading="lazy"`, `decoding="async"`, `width={596}` e `height={840}`.

### Empresarial

`Business.tsx` importa somente `src/assets/mascote/v2/empresarial-notebook.png`.

Resultado:

- texto, CTA e beneficios existentes preservados;
- mascote com notebook apoia a mensagem de produtividade, suporte e home office;
- imagem abaixo da dobra com `loading="lazy"`, `decoding="async"`, `width={647}` e `height={840}`;
- layout mobile-first mantido, sem overflow horizontal.

## 6. Poses reservadas

As poses abaixo permanecem apenas documentadas e nao foram importadas no bundle atual:

| Pose | Uso futuro |
| --- | --- |
| `contato-whatsapp-acenando.png` | CTA final e contato/WhatsApp |
| `suporte-tecnico.png` | atendimento humanizado |
| `conversao-comemorando.png` | confirmacao de formulario e Indique e Ganhe |
| `faq-pensando.png` | futura secao FAQ |
| `apresentando-reserva.png` | campanhas, planos ou beneficios |

## 7. Acessibilidade

- Hero: alt informativo `Mascote da GNS Fibra apontando para a mensagem principal`, porque o gesto reforca o direcionamento visual do Hero.
- Tecnologias: `alt=""` e `aria-hidden="true"`, porque o mascote e apoio visual redundante aos cards e ao texto da secao.
- Empresarial: `alt=""` e `aria-hidden="true"`, porque a imagem e apoio visual redundante ao conteudo textual e ao CTA.

As imagens nao recebem foco, nao possuem eventos de ponteiro, nao contem informacao comercial exclusiva e possuem `width`, `height`, `aspect-ratio` e espaco visual reservado para reduzir layout shift.

## 8. Performance

- Somente tres poses entram no bundle.
- Nao foi criado agregador que importe todas as poses.
- Hero carrega `eager` por estar acima da dobra.
- Tecnologias e Empresarial usam `lazy` e `decoding="async"`.
- Build gerou:
  - `hero-apresentando-apontando-Bm4mIffG.png`: 541,00 kB;
  - `wifi-turbo-CUuVfEk0.png`: 528,77 kB;
  - `empresarial-notebook-WjwmmOM6.png`: 516,79 kB.
- JS final: `assets/index-BH1aBfOk.js`, 382,96 kB, gzip 118,97 kB.
- CSS final: `assets/index-BVVhHUDx.css`, 64,39 kB, gzip 10,79 kB.

## 9. Responsividade e temas

Verificado no navegador local em Dark e Light:

- 360 px;
- 390 px;
- 414 px;
- 430 px;
- 768 px;
- 1024 px;
- 1280 px;
- 1440 px.

Matriz final: 48 verificacoes automatizadas, cobrindo Hero, Tecnologias e Empresarial nos dois temas.

Resultado:

- sem overflow horizontal (`scrollWidth` nao excedeu `clientWidth`);
- um unico `h1`;
- mascotes publicados carregam nas secoes-alvo;
- mascotes sem corte horizontal;
- Tecnologias preserva quatro cards legiveis;
- Empresarial preserva texto, CTA e beneficios;
- Header, menu mobile, navegacao ativa, CTA e Footer preservados;
- menu mobile em 390 px abre, bloqueia scroll do body, fecha com Escape e navega para Empresarial.

Observacao: elementos decorativos ja existentes podem ultrapassar seu proprio retangulo visual interno, mas permanecem contidos por `overflow-hidden` ou pelo `overflow-x: clip` global e nao criam scroll horizontal.

## 10. Validacoes tecnicas

- `"C:\Program Files\nodejs\npm.cmd" run typecheck`: aprovado.
- `"C:\Program Files\nodejs\npm.cmd" run build`: aprovado, 2.154 modulos transformados.
- Aviso conhecido do build: `<script src="./theme-init.js">` sem `type="module"` por ser script classico vindo de `public`.
- `"C:\Program Files\nodejs\npm.cmd" audit`: executado; 1 vulnerabilidade baixa em `esbuild` (`GHSA-g7r4-m6w7-qqqr`).
- `npm audit fix`: nao executado.
- Console da aplicacao: nenhuma falha funcional propria identificada. Foi observada a mensagem externa conhecida do ambiente/extensao: `A listener indicated an asynchronous response by returning true...`.

## 11. Arquivos criados

- `IMPLEMENTACAO-COLECAO-MASCOTES-V2-GNS-FIBRA.md`;
- `src/assets/mascote/v2/hero-apresentando-apontando.png`;
- `src/assets/mascote/v2/wifi-turbo.png`;
- `src/assets/mascote/v2/empresarial-notebook.png`.

## 12. Arquivos alterados

- `src/components/site/HeroMascot.tsx`;
- `src/components/site/Technologies.tsx`;
- `src/components/site/Business.tsx`;
- `src/styles.css`;
- `MAPA-USO-MASCOTE-GNS-FIBRA-2.md`;
- `DESIGN-SYSTEM-GNS-FIBRA-2.md`;
- `IMPLEMENTACAO-MASCOTE-HERO-GNS-FIBRA-2.md`;
- `IMPLEMENTACAO-HEADER-HERO-GNS-FIBRA-2.md`;
- `IMPLEMENTACAO-PLANOS-BENEFICIOS-TECNOLOGIAS-GNS-FIBRA-2.md`.

## 13. Pendencias

- Revisao visual humana em video antes do commit.
- Tratar a vulnerabilidade baixa de `esbuild` em uma fase propria de dependencias.
- Gerar WebP/AVIF futuramente quando houver encoder confiavel com preservacao de alpha.
- Publicar as poses reservadas somente em fases funcionais correspondentes.

Nenhum commit foi criado. Nenhum push foi feito. O stash existente foi preservado.
