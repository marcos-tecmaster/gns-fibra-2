# MAPA DE USO DO MASCOTE - GNS FIBRA 2.0

Data: 13/07/2026
Status: colecao V2 oficial auditada, Hero atualizado e mascotes de Tecnologias/Empresarial integrados

## 1. Escopo

Este documento registra o inventario do mascote oficial da GNS Fibra, incluindo a folha de referencia, os cinco originais individuais aprovados e a primeira integracao no Hero da GNS Fibra 2.0.

Os arquivos em `docs/branding/mascote/originais/` permanecem inalterados. Somente a pose `apresentando` recebeu um derivado proprio de producao; nenhuma pose foi redesenhada, recolorida, gerada por IA ou implementada em outra secao.

## 2. Origem catalogada

| Item | Resultado |
| --- | --- |
| Caminho antigo encontrado | `C:\laragon\www\gns-fibra-2\docs\mascote\mascote.PNG` |
| Caminho oficial atual | `C:\laragon\www\gns-fibra-2\docs\branding\mascote\referencias\guia-oficial-poses-mascote-gns.png` |
| Tipo de arquivo | Folha completa oficial de poses |
| Formato atual | PNG |
| Peso | 2.457.050 bytes, aproximadamente 2,46 MB |
| Resolucao | 1536 x 1024 px |
| Canal alpha | Sim |
| SHA-256 | `92A5F493E8E61B7EFD3CBD6CB33F940237DE9A1C5B6F549436EA0F5396C18EE4` |
| Uso direto no site | Nao recomendado |
| Status para producao | Referencia oficial/matriz; requer extracao aprovada e otimizacao futura |

## 2.1 Originais individuais oficiais

Todos os arquivos abaixo sao PNG RGBA com transparencia real, 96,01 dpi e qualidade visual alta. Antenas, maos, pes, uniforme e logo foram conferidos visualmente.

| Arquivo | Pose e aplicacao | Dimensoes | Peso | Espaco transparente | SHA-256 |
| --- | --- | ---: | ---: | --- | --- |
| `apresentando.png` | Apresentacao; Hero integrado | 1369 x 1149 px | 834.579 bytes | L258 / T49 / R251 / B65 | `E9B18FB1D3F50EA144CC05F53464CEB316F4AA518E8310DFEAE3D80D8E90D77F` |
| `wifi-turbo.png` | Velocidade; tecnologias e beneficios | 1080 x 1350 px | 938.579 bytes | L154 / T165 / R55 / B151 | `E3CAAB0A358D541694301A7DCE54F285085E1D33C9FBF0C3FEBB554D5234DC1E` |
| `trabalhando-notebook.png` | Atendimento; empresarial ou suporte | 1080 x 1350 px | 866.974 bytes | L66 / T122 / R117 / B145 | `2E280573D089FAA307649029E8FFFD7FF4DC4176DA0023B7BB4E1B2CE3BBAB0F` |
| `pensando.png` | Duvida; FAQ | 1080 x 1350 px | 805.031 bytes | L190 / T26 / R171 / B129 | `FBB22740F51D8F36D3BEBDC6136CBEB7975869592900099C8F355D4A0C84A504` |
| `comemorando.png` | Sucesso; confirmacao, campanha ou Indique e Ganhe | 1080 x 1350 px | 876.191 bytes | L86 / T133 / R148 / B114 | `1A494926B31554B0884FB78DC004F109686777B02829EF80A168FA8D4C0DDB94` |

O espaco transparente foi medido a partir do menor retangulo que contem todos os pixels com alpha maior que zero. Os arquivos possuem pixels semitransparentes nas bordas, necessarios para preservar o antialiasing.

## 3. Classificacao geral

O arquivo `docs/branding/mascote/referencias/guia-oficial-poses-mascote-gns.png` continua preservado como matriz visual. Os cinco PNGs individuais em `originais/` sao agora as fontes oficiais para qualquer derivado futuro.

Para novas implementacoes, cada pose deve receber um asset de producao separado, com transparencia, dimensoes controladas e WebP/AVIF apenas quando houver encoder confiavel e comparacao visual.

## 3.1 Organizacao oficial do acervo

| Pasta | Funcao |
| --- | --- |
| `docs/branding/mascote/originais/` | Contem as cinco poses individuais oficiais em alta qualidade; nao editar |
| `docs/branding/mascote/referencias/` | Contera folhas de poses, prints e guias de uso |
| `docs/branding/mascote/otimizados/` | Contera somente arquivos aprovados e preparados para producao |

## 4. Inventario de poses e aplicacoes futuras

| Pose disponivel | Significado da pose | Secao sugerida | Prioridade | Formato atual | Qualidade/resolucao | Necessidade de fundo transparente | Necessidade de WebP/AVIF | Riscos de utilizacao |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pose principal com logo | Presenca de marca, saudacao e confianca | Hero | Alta | Parte da folha PNG | Boa como matriz, mas ainda nao isolada | Sim | Sim | Pode pesar no LCP e competir com H1/CTA se usada grande demais |
| Aceno | Boas-vindas e aproximacao | Hero, suporte, confirmacao | Alta | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Uso repetido pode parecer decorativo |
| Apontando | Direcionamento de atencao | Beneficios, planos, cobertura | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode desviar foco de texto/CTA se mal posicionado |
| Polegar para cima | Aprovacao, sucesso e decisao positiva | Planos, confirmacao de formulario | Alta | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode soar informal em excesso se usado em area premium |
| Apresentando | Apresentacao de oferta ou informacao | Planos, tecnologias, beneficios | Alta | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode competir com cards de preco se aplicado dentro do grid |
| Pensando | Duvida, analise e tomada de decisao | FAQ | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode reduzir objetividade se usado em excesso |
| Celebrando | Resultado positivo e conquista | Beneficios, campanhas, confirmacao | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode ficar promocional demais em secoes institucionais |
| Pulando | Energia e entusiasmo | Campanhas | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Movimento implicito pode parecer infantil se usado fora de campanha |
| Feliz | Satisfacao | Depoimentos, confirmacao | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Expressao generica se nao estiver ligada a uma mensagem clara |
| Animado | Entusiasmo e incentivo | Campanhas, Indique e Ganhe | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode disputar atencao com chamadas comerciais |
| Piscando | Simpatia e cumplicidade | Campanhas pontuais | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode parecer excessivamente informal |
| Surpreso | Alerta leve ou erro amigavel | Pagina 404, FAQ | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Evitar em mensagens criticas de suporte |
| Curioso | Investigacao e duvida | FAQ, cobertura | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode ser redundante se o texto ja indicar duvida |
| Triste | Problema ou indisponibilidade | Pagina 404, estado vazio | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode gerar sensacao negativa se usado em conversao |
| Bravo | Frustracao ou alerta | Nao recomendado para site principal | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode conflitar com tom premium e acolhedor |
| Engracado | Humor leve | Conteudos pontuais | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Risco alto de reduzir percepcao profissional |
| Trabalhando | Atendimento e execucao | Suporte, bastidores, tecnologia | Alta | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Detalhes pequenos podem perder legibilidade em mobile |
| Gamer | Entretenimento e baixa latencia | Planos gamer, beneficios de performance | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Usar apenas se a oferta gamer existir de forma clara |
| Assistindo | Streaming e entretenimento | Beneficios, planos residenciais | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode parecer especifico demais para ofertas gerais |
| Conectado | Internet ativa e estabilidade | Tecnologias, suporte, cobertura | Alta | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Evitar poluir secoes ja densas visualmente |
| GNS ama voce | Afeto e proximidade | Indique e Ganhe, relacionamento | Alta | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Usar com cuidado para nao infantilizar a campanha |
| Campeao | Recompensa e conquista | Indique e Ganhe, campanhas | Alta | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Precisa estar ligado a premio/regra concreta |
| Wi-Fi Turbo | Velocidade e performance | Tecnologias, planos | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Confirmar aderencia a nomenclatura comercial antes de usar |
| Protegido | Seguranca e confiabilidade | Tecnologias, suporte | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Evitar promessas de seguranca sem respaldo textual |
| Atras da placa | Chamada destacada | Campanhas, avisos | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Preferencial | Sim | Pode criar bloco visual pesado se a placa tiver texto proprio |
| Acenando de lado | Entrada lateral e apoio | Hero, suporte | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode ficar cortado em telas estreitas se nao houver area segura |
| Espiando | Descoberta e curiosidade | FAQ, cobertura, 404 | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode parecer brincadeira se usado em conteudo sensivel |
| Apontando pra baixo | Direcionamento para formulario/busca | Cobertura, planos, formulario | Alta | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode induzir scroll/acao errada se posicionado sem contexto |
| Apoiado | Apoio institucional | Planos, beneficios | Media | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Precisa de area de encaixe para nao parecer flutuante |
| Vem com a gente | Convite e conversao | Hero, campanhas | Alta | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Deve acompanhar CTA claro e nao substituir texto comercial |
| HMM... | Reflexao leve | FAQ, comparacao de planos | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Pode parecer indecisao na jornada de conversao |
| De olhos estrelados | Encantamento | Campanhas, beneficios premium | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Risco de tom infantil em excesso |
| Apaixonado | Afeto e satisfacao | Indique e Ganhe, relacionamento | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Usar apenas em campanha com tom afetivo |
| Rindo muito | Humor e leveza | Conteudo pontual | Baixa | Parte da folha PNG | Boa como matriz, requer recorte validado | Sim | Sim | Nao recomendado para areas comerciais principais |

## 5. Poses prontas para uso

| Pose | Fonte oficial | Status |
| --- | --- | --- |
| Apresentando | `docs/branding/mascote/originais/apresentando.png` | Derivado PNG aprovado e integrado somente ao Hero |
| Wi-Fi Turbo | `docs/branding/mascote/originais/wifi-turbo.png` | Original auditado; aguardando fase de tecnologias/beneficios |
| Trabalhando com notebook | `docs/branding/mascote/originais/trabalhando-notebook.png` | Original auditado; aguardando fase empresarial/suporte |
| Pensando | `docs/branding/mascote/originais/pensando.png` | Original auditado; aguardando fase de FAQ |
| Comemorando | `docs/branding/mascote/originais/comemorando.png` | Original auditado; aguardando confirmacao/campanha |

## 6. Arquivos apenas de referencia

| Arquivo | Classificacao | Motivo |
| --- | --- | --- |
| `docs/branding/mascote/referencias/guia-oficial-poses-mascote-gns.png` | Referencia oficial/matriz | Contem multiplas poses em uma folha unica; nao deve ser usado diretamente no site |
| `src/assets/mascote/mascote-apresentando.png` | Legado/fase anterior | Derivado experimental transparente de 756 x 900 px; nao e importado pelo site apos a colecao V2 |

## 7. Regras para a proxima fase

- Preservar `docs/branding/mascote/referencias/guia-oficial-poses-mascote-gns.png` sem alteracoes.
- Criar derivados aprovados somente em local proprio de producao quando a fase visual for autorizada.
- Exportar apenas poses selecionadas e aprovadas; na colecao V2 publicada, apenas Hero, Tecnologias e Empresarial entram no bundle.
- Validar bordas, transparencia, nitidez e proporcao de cada exportacao.
- Gerar WebP/AVIF quando houver encoder confiavel que preserve alpha; nao instalar dependencia pesada apenas para conversao.
- Manter PNG ou original como fallback somente quando necessario.
- Definir largura/altura no markup para evitar layout shift.
- Usar `loading="lazy"` em imagens abaixo da dobra.
- Usar prioridade de carregamento apenas para eventual mascote acima da dobra.
- Escrever `alt` especifico quando a pose comunicar estado ou acao.
- Usar `alt=""` quando o mascote for puramente decorativo.

## 8. Prioridade recomendada

1. Selecionar 4 a 6 poses essenciais para a primeira implementacao: Hero, suporte, planos, Indique e Ganhe, confirmacao e 404.
2. Extrair e revisar manualmente cada pose escolhida.
3. Criar derivados otimizados WebP/AVIF.
4. Integrar uma pose por contexto, medindo impacto em performance e conversao.
5. Expandir o uso apenas se a composicao continuar premium, leve e acessivel.

## 9. Confirmacoes desta fase

- Os cinco originais foram apenas lidos, medidos e catalogados; hashes permanecem preservados.
- Nenhuma nova pose foi gerada e nenhuma imagem recebeu IA.
- Nenhuma cor, logo, uniforme ou proporcao foi alterada.
- O derivado de `apresentando` remove somente excesso de canvas transparente, mantem margem segura e reduz dimensoes para producao.
- Na colecao V2, apenas Hero, Tecnologias e Empresarial recebem mascotes; as demais poses oficiais permanecem reservadas.
- A folha completa de referencia nao foi aplicada diretamente no site.

## 10. Derivado legado da primeira integracao

| Item | Resultado |
| --- | --- |
| Arquivo | `src/assets/mascote/mascote-apresentando.png` |
| Formato | PNG RGBA |
| Dimensoes | 756 x 900 px |
| Peso | 584.002 bytes |
| Espaco transparente | L27 / T26 / R26 / B27 |
| SHA-256 | `127BE24DA3E73DF26C048F2FA18CFDB349A89DBD749FA8FECD865062A00799F9` |
| Economia frente ao original | 250.577 bytes, aproximadamente 30,02% |
| Uso | Legado da primeira integracao; substituido no site por `src/assets/mascote/v2/hero-apresentando-apontando.png` |

O PNG foi gerado com recorte seguro do canvas transparente e redimensionamento bicubico de alta qualidade pelo encoder nativo do Windows. A comparacao visual nao identificou halo, corte ou alteracao perceptivel de cor. WebP/AVIF nao foram gerados porque nenhum encoder compativel estava instalado e a alternativa do navegador foi bloqueada pela politica de seguranca do ambiente.

## 11. Colecao V2 oficial

Atualizado em 15/07/2026.

Nova fonte oficial:

`docs/branding/mascote/originais/v2-oficiais/`

Os oito originais V2 foram auditados e preservados sem alteracao. Todos sao PNG RGBA 8-bit com transparencia real. Antenas, maos, pes, rosto, uniforme e logo GNS Fibra foram conferidos visualmente. A colecao apresenta um contorno verde fino discreto em partes do antialiasing original; esse halo foi apenas registrado e nao foi corrigido, removido ou alterado.

| Arquivo | Dimensoes | Peso | Margens transparentes | SHA-256 | Uso recomendado | Status |
| --- | ---: | ---: | --- | --- | --- | --- |
| `hero-apresentando-apontando.png` | 1080 x 1350 px | 1.014.517 bytes | L90 / T86 / R104 / B73 | `05F325808433F298354ED849D7EC8FE22DF7CF0619E6F76255BF131BA0FBFB07` | Hero, apontando para texto e CTAs | publicado via derivado V2 |
| `wifi-turbo.png` | 1080 x 1350 px | 1.391.504 bytes | L71 / T0 / R80 / B1 | `2A62EF4206F3D753150EC446308218DCA728CA4816FA3E2352EB12867F1EC1FB` | Tecnologias e performance Wi-Fi | publicado via derivado V2 |
| `empresarial-notebook.png` | 1080 x 1350 px | 1.162.618 bytes | L83 / T42 / R75 / B82 | `C9D30377147F200D3B642EC94EDD57837F9AAB992B91C9C2A9FB052B93C5ED8D` | Empresarial, suporte e home office | publicado via derivado V2 |
| `contato-whatsapp-acenando.png` | 1080 x 1350 px | 1.134.032 bytes | L76 / T48 / R168 / B52 | `3DA22BECB11BD8B8689EDA29B9D43A22DDCF9838EAF9C265F04CE307BBC745B1` | CTA final e contato/WhatsApp | reservado |
| `suporte-tecnico.png` | 1080 x 1350 px | 1.075.667 bytes | L143 / T37 / R83 / B71 | `0B5600810A4031F3A0A686EDEF4A8F7571870797DC290B8010B591DAA7278E77` | atendimento humanizado | reservado |
| `conversao-comemorando.png` | 1080 x 1350 px | 1.094.527 bytes | L57 / T80 / R51 / B78 | `0CA7856F1988CBD446B1DF8E3A29822008C610F008E8EBA14006F41F7F2C29DD` | confirmacao de formulario e Indique e Ganhe | reservado |
| `faq-pensando.png` | 1080 x 1350 px | 1.070.379 bytes | L151 / T21 / R193 / B68 | `5FE09714C5DC4DEEAB7FE2098A756CB1601293A40628E844BD8DB78D37AC1070` | futura secao FAQ | reservado |
| `apresentando-reserva.png` | 1080 x 1350 px | 1.381.755 bytes | L34 / T12 / R66 / B29 | `B545EBD8DC2CAF21CD80EF7938630A19A7AF3628F1C249299082C483DA35F192` | campanhas, planos ou beneficios | reservado |

## 12. Derivados V2 publicados

Criados somente os tres assets usados nesta fase:

| Derivado | Dimensoes | Peso | SHA-256 | Uso | Acessibilidade |
| --- | ---: | ---: | --- | --- | --- |
| `src/assets/mascote/v2/hero-apresentando-apontando.png` | 687 x 900 px | 540.995 bytes | `583CC01A2B8A0F95AB7B827EFF9F812CA00E9A2CD82BCA4F59AEA1D5A26FD412` | Hero | alt informativo |
| `src/assets/mascote/v2/wifi-turbo.png` | 596 x 840 px | 528.774 bytes | `75EE67B402B1E303B73D89245A3AEE6E987308B554B718C488A4C26F8413C24F` | Tecnologias | `alt=""`, decorativo |
| `src/assets/mascote/v2/empresarial-notebook.png` | 647 x 840 px | 516.793 bytes | `3D7CE8BFDBBB79E6CF745A31FC51C25A52C9717A8524700AA26E2B43AA7279E2` | Empresarial | `alt=""`, decorativo |

Metodo: recorte pelo retangulo real de alpha, recomposicao com 48 px de margem segura, redimensionamento bicubico pelo encoder PNG nativo do Windows e preservacao de transparencia. WebP/AVIF continuam pendentes ate existir encoder confiavel com suporte a alpha.

Detalhes completos da auditoria, hashes finais, validacoes e resultados de build estao em `IMPLEMENTACAO-COLECAO-MASCOTES-V2-GNS-FIBRA.md`.
