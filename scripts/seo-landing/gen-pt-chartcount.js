#!/usr/bin/env node
/**
 * gen-pt-chartcount.js — generate the pt (Gráfico de barras) chart-count landing
 * entries on the countable catalog (the facts minus the culled non-countable/locale-
 * invalid themes that match the validity gate).
 *
 * Honest-count binding: per-category count = facts.count (= rendered bar height,
 * the manifest icon occurrences). The native Brazilian-Portuguese singular/plural is
 * resolved from an OVERRIDE map authored + verified by a native anos-iniciais educator
 * (vocab gaps, icon-misdepictions, mechanical errors) FIRST, else from the native-
 * verified pt vocabulary. Prose p2 counts AND practiceProblems answers both draw from
 * the SAME facts → agree by construction with the chart. Operator gate: ZERO
 * mismatches.
 *
 * Ledger: K.MD.B.3 (recognition), strand Probabilidade e estatística (BNCC —
 * Matemática), 1º ano (números até 10), "Quantos/Quantas {plural}?" framing
 * (count-framing REQUIRED: chart-count side, the opposite of picture-sort).
 *
 * Reads:  scripts/seo-landing/_pt-cc-facts.json      (Stage-A server dump)
 *         REFERENCE TRANSLATIONS/image-vocabulary.js  (pt [sing,plural,gender])
 *         frontend/config/topics-taxonomy.json        (axes.theme.<key>.name.pt)
 * Writes: filter OUT existing chart-count landings in pt.json, append the new set
 *         (idempotent), preserve the rest.
 *
 * Português do Brasil (pt-BR). Tom 1º ano, warm "seu filho", sem cronômetro, sem nota.
 * Nada de calque es/it (suma/sumar). [NSR-FLAG][pt]
 *
 * Usage: node scripts/seo-landing/gen-pt-chartcount.js [--dry-run]
 */
'use strict';
const fs = require('fs');

const DRY = process.argv.includes('--dry-run');
const PT = 'frontend/content/seo-landing/pt.json';

// Cull: themes the validity gate excludes for "count how many objects" — non-
// countable-discrete (activities=verbs/sports, emotions=faces, weather/seasons=
// abstract, body_parts per operator, 4th_of_july per operator). Decks stay /decks/,
// no landing. These match the 8 NOT in the valid coords.
const CULL_THEMES = new Set([
  '4th_of_july', 'activities', 'body_parts', 'emotions',
  'spring', 'summer', 'winter', 'weather',
  // kitchen_tools: two distinct bars resolve to the substring-colliding pair
  // "Assadeira de biscoitos" (cookie-sheet, 4) + "Assadeira" (baking-sheet, 3).
  // The chart-prose then reads "4 assadeiras de biscoitos ... e 3 assadeiras" and
  // the two practiceProblems "Quantas assadeiras de biscoitos?" / "Quantas
  // assadeiras?" are visually ambiguous on the bar chart (one stem ⊂ the other).
  // Same shape as the it farm_animals "gatto"/"gatto 2" cull — deck stays /decks/.
  'kitchen_tools',
]);

// --- load sources ---
const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_pt-cc-facts.json', 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const vmod = {};
new Function('module', fs.readFileSync('REFERENCE TRANSLATIONS/image-vocabulary.js', 'utf8') + '\nmodule.exports=IMAGE_VOCABULARY;')(vmod);
const VOCAB = vmod.exports;

// [singular, plural, gender] override map — resolved by nounKey, checked BEFORE the
// pt vocabulary. Authored + verified by a native pt-BR anos-iniciais educator. Three
// classes:
//  (a) VOCAB GAPS — VOCAB[key].pt is null/missing (tree species, dragonfruit, octogon,
//      musical note, spanner, rocker, postman).
//  (b) ICON-MISDEPICTIONS — the facts label mis-describes the rendered ICON (parity
//      with the es/it/sv icon-verified OVERRIDE: same thumbnails), translated to
//      native pt-BR.
//  (c) MECHANICAL/GAP PLURAL ERRORS — only where the pt vocab plural is genuinely
//      wrong for the icon (old orthography, plural-only singular, mass nouns).
const OVERRIDE_PT = {
  // (a) vocab gaps — tree species (icon = a TREE), dragonfruit, octogon, note, tools
  palm:        ['Palmeira', 'Palmeiras', 'f'],
  fir:         ['Pinheiro', 'Pinheiros', 'm'],
  oak:         ['Carvalho', 'Carvalhos', 'm'],
  cedar:       ['Cedro', 'Cedros', 'm'],
  walnut:      ['Nogueira', 'Nogueiras', 'f'],
  maple:       ['Bordo', 'Bordos', 'm'],
  spruce:      ['Abeto vermelho', 'Abetos vermelhos', 'm'],   // tree theme icon
  ash:         ['Freixo', 'Freixos', 'm'],
  redwood:     ['Sequoia vermelha', 'Sequoias vermelhas', 'f'],
  aspen:       ['Álamo tremedor', 'Álamos tremedores', 'm'],
  cherry:      ['Cerejeira', 'Cerejeiras', 'f'],              // tree theme = cherry TREE (NOT "cereja" fruit)
  pear:        ['Pereira', 'Pereiras', 'f'],                  // tree theme = pear TREE (NOT "pera" fruit)
  dragonfruit: ['Pitaia', 'Pitaias', 'f'],
  octogon:     ['Octógono', 'Octógonos', 'm'],
  note:        ['Nota musical', 'Notas musicais', 'f'],       // icon: musical note
  spanner:     ['Chave inglesa', 'Chaves inglesas', 'f'],     // icon: wrench/spanner tool
  rocker:      ['Cadeira de balanço', 'Cadeiras de balanço', 'f'], // icon: rocking chair
  postman:     ['Carteiro', 'Carteiros', 'm'],               // post_office gap

  // (b) icon-misdepictions — verified against the deck thumbnail (es/it/sv-parity icons)
  liberty:       ['Estátua da Liberdade', 'Estátuas da Liberdade', 'f'], // icon: Statue of Liberty (NOT "liberdade")
  'uncle-sam':   ['Tio Sam', 'Tios Sam', 'm'],               // vocab plural "Tios Sans" wrong
  uncle_sam:     ['Tio Sam', 'Tios Sam', 'm'],
  autumn:        ['Árvore de outono', 'Árvores de outono', 'f'], // icon: autumn-foliage tree (NOT "outono"=season)
  delivery:      ['Carteiro', 'Carteiros', 'm'],             // icon: mail-carrier person (NOT "entrega")
  santa:         ['Papai Noel', 'Papais Noéis', 'm'],
  'santa-claus': ['Papai Noel', 'Papais Noéis', 'm'],
  santa_claus:   ['Papai Noel', 'Papais Noéis', 'm'],
  stamp:         ['Selo', 'Selos', 'm'],                     // icon: postage stamp (NOT "carimbo"=rubber stamp)
  truck:         ['Caminhão do correio', 'Caminhões do correio', 'm'], // post_office icon: mail truck
  bed:           ['Cama de hospital', 'Camas de hospital', 'f'], // hospital bed
  bracelet:      ['Pulseira', 'Pulseiras', 'f'],             // hospital ID bracelet
  cape:          ['Capa', 'Capas', 'f'],                     // superhero cape
  pliers:        ['Alicate', 'Alicates', 'm'],
  cymbals:       ['Prato', 'Pratos', 'm'],                   // musical cymbals; vocab gave plural "Pratos" as singular — fix
  earmuffs:      ['Protetor de ouvido', 'Protetores de ouvido', 'm'], // vocab singular was a plural
  garlic:        ['Alho', 'Alhos', 'm'],                     // bulbs valid for counting
  pomegranate:   ['Romã', 'Romãs', 'f'],

  // (c) mechanical / gap plural errors — corrected to the standard pt-BR plural
  'tyrannosaurus-rex': ['Tiranossauro rex', 'Tiranossauros rex', 'm'], // vocab "Tiranossauros Rexs" wrong
  'x-ray':       ['Raio-X', 'Raios-X', 'm'],                 // vocab plural "Raio-Xs" wrong
  'post-office': ['Correios', 'Correios', 'm'],              // invariable (the postal service building)
  purse:         ['Porta-moedas', 'Porta-moedas', 'm'],      // invariable
  crutches:      ['Muleta', 'Muletas', 'f'],                 // vocab singular was a plural; muletas = f
};

function resolvePt(nounKey) {
  const base = nounKey.replace(/-\d+$/, '');
  if (OVERRIDE_PT[nounKey]) return OVERRIDE_PT[nounKey];
  if (OVERRIDE_PT[base]) return OVERRIDE_PT[base];
  if (OVERRIDE_PT[base.replace(/-/g, '_')]) return OVERRIDE_PT[base.replace(/-/g, '_')];
  const cands = [nounKey, nounKey.replace(/-/g, '_'), nounKey.replace(/-/g, '')];
  if (base !== nounKey) cands.push(base, base.replace(/-/g, '_'), base.replace(/-/g, ''));
  for (const k of cands) { if (VOCAB[k] && VOCAB[k].pt) return VOCAB[k].pt; }
  return null;
}

// proper nouns whose first letter must NOT be lowercased mid-sentence
const PROPER = new Set([
  'Papai Noel', 'Papais Noéis', 'Estátua da Liberdade', 'Estátuas da Liberdade',
  'Tio Sam', 'Tios Sam', 'Tiranossauro rex', 'Tiranossauros rex', 'Correios', 'EUA',
]);
const lc = (s) => PROPER.has(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);

function themeDisplay(themeKey) {
  const e = tax.axes.theme[themeKey];
  return (e && e.name && e.name.pt) ? e.name.pt : themeKey;
}

// list-join: "3 maçãs, 4 bananas e 5 peras"
function ptList(items) {
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' e ' + items[items.length - 1];
}

// --- native pt-BR prose, parent register ("seu filho"), classify-count-represent
// (data), warm/no-shame, números até 10, no timer/points. theme + the deck's own
// nouns woven through. ex = 2–3 of the deck's category nouns (plural, lowercased).
// COUNT-FRAMING REQUIRED (chart-count side: "conte / quantos / quantas"). ---
function p1(T, ex, i) {
  const [a, b, c] = ex;
  return [
    // 0 — question opening
    `Quantas ${a.bare} há nesta folha com o tema ${T}? É justamente essa a pergunta de onde seu filho parte. Primeiro ele junta as imagens iguais, depois conta uma por uma e pinta uma casinha na coluna certa. Enquanto a coluna ${a.di} cresce ao lado da coluna ${b.di}, a criança lê o gráfico de barras num só olhar e percebe qual grupo tem mais. É o primeiro passo para organizar os dados: classificar, contar e comparar quantidades até 10, com calma e sem pressa.`,
    // 1 — scene opening
    `Sobre a mesa do tema ${T} estão espalhadas muitas figurinhas: ${a.bare}, ${b.bare} e ${c.bare} misturadas. A tarefa de seu filho é pôr ordem – ${a.bare} com ${a.bare}, ${b.bare} com ${b.bare} – e contar quantas há de cada tipo. Para cada imagem ele pinta uma casinha, e aos poucos nasce um gráfico de barras com uma coluna por categoria. Quando o gráfico está pronto, basta olhar para ver qual grupo é o mais numeroso. Assim a criança treina contagem e classificação de um jeito bem concreto, no seu próprio ritmo tranquilo.`,
    // 2 — skill-statement opening
    `Classificar por categoria, contar e comparar: são as três habilidades que esta folha com o tema ${T} treina juntas. Seu filho olha ${a.def} e ${b.def}, separa as iguais, conta cada grupo e pinta as casinhas até cada coluna subir. Também ${c.def} encontram a sua coluna no gráfico de barras. No fim, a criança vê na hora qual categoria tem mais e qual tem menos, tudo dentro dos números até 10 e sem nenhuma pressa.`,
    // 3 — invitation opening
    `Venha contar com seu filho nesta folha com o tema ${T}! Juntos vocês olham as imagens, juntam ${a.def} de um lado e ${b.def} do outro, e contam quantas há de cada tipo. Para cada figurinha pinta-se uma casinha na coluna certa, e assim o gráfico de barras cresce linha por linha. Quando também ${c.def} ganham a sua coluna, vocês comparam as alturas e descobrem o grupo mais numeroso. Um jeito concreto e sereno de organizar os dados e contar até 10.`,
    // 4 — "Imagine…" opening
    `Imagine ter de pôr ordem num monte de imagens com o tema ${T}: ${a.bare}, ${b.bare}, ${c.bare} todas juntas. É o que seu filho faz nesta folha. Primeiro ele separa as figurinhas por tipo, depois conta cada grupo e pinta uma casinha para cada imagem, até cada coluna do gráfico ficar completa. Ver ${a.def} e ${b.def} lado a lado ajuda a criança a comparar as quantidades num piscar de olhos. Trabalha-se com calma, até 10, sem relógios e sem notas.`,
    // 5 — category-noun lead
    `${a.def.charAt(0).toUpperCase() + a.def.slice(1)}, ${b.bare} e ${c.bare}: nesta folha com o tema ${T} as imagens são primeiro agrupadas por tipo e depois contadas. Seu filho junta as iguais, conta quantas há em cada grupo e pinta uma casinha para cada uma, montando casinha por casinha um gráfico de barras. Quando as colunas estão prontas, a criança lê o gráfico e percebe qual categoria é a mais numerosa. É um primeiro encontro concreto com a organização dos dados, sempre dentro dos números até 10.`,
    // 6 — reassurance opening
    `Sem pressa e sem nota: esta folha com o tema ${T} é só um jeito tranquilo de aprender a contar e a organizar os dados. Seu filho junta ${a.def} com ${a.def}, ${b.def} com ${b.def}, conta cada grupo e pinta uma casinha por imagem na coluna certa. Pouco a pouco cresce um gráfico de barras em que também ${c.def} têm o seu lugar. Se for preciso recontar uma coluna, tudo bem: olha-se de novo com calma. Tudo fica até 10, bem do tamanho de uma criança do 1º ano.`,
    // 7 — "Você já…" opening
    `Você já tentou contar quantas figurinhas há de cada tipo? Nesta folha com o tema ${T} seu filho faz exatamente isso: separa ${a.def} das demais, conta cada grupo e pinta as casinhas até o gráfico de barras ficar cheio. ${c.def.charAt(0).toUpperCase() + c.def.slice(1)} ocupam a sua coluna ao lado das outras, e assim o gráfico mostra num relance qual categoria ganha em número. A criança aponta cada imagem enquanto conta, sem pular nenhuma, com todo o tempo que precisar e sem pressão.`,
    // 8 — process-step opening
    `Começa-se observando: nesta folha com o tema ${T} seu filho olha as imagens e decide quais vão juntas. ${a.def.charAt(0).toUpperCase() + a.def.slice(1)} formam um grupo, ${b.def} outro, e assim por diante. Depois conta quantas há de cada um e pinta uma casinha para cada figurinha, enchendo as colunas do gráfico de barras. Quando também ${c.def} estão no lugar, o gráfico se lê num instante e revela o grupo mais numeroso. Contagem e classificação se treinam aqui de um jeito concreto, até 10.`,
    // 9 — purpose / "Para que serve…" opening
    `Para que serve esta folha com o tema ${T}? Para ensinar seu filho a coletar os dados e a lê-los. A criança classifica as imagens – ${a.bare}, ${b.bare}, ${c.bare} – conta grupo por grupo e pinta uma casinha para cada uma, até cada coluna do gráfico ficar completa. Comparando a altura da coluna ${a.di} com a coluna ${b.di}, percebe na hora qual categoria tem mais. É um exercício sereno e concreto, sempre dentro dos números até 10 e sem nenhum cronômetro.`,
    // 10 — "Olhe bem…" / observation opening
    `Olhe bem as imagens da folha com o tema ${T}: algumas são iguais, outras diferentes. Seu filho as organiza por tipo, junta ${a.def} de um lado e ${b.def} do outro, e conta quantas há em cada grupo. Depois pinta uma casinha para cada figurinha, e assim cresce um gráfico de barras com uma coluna por categoria. Também ${c.def} terão a sua. No fim, a criança compara as quantidades num só olhar, trabalhando com calma até 10 e sem notas a perseguir.`,
    // 11 — game-framing opening
    `Contar pode virar um joguinho: nesta folha com o tema ${T} seu filho procura todas ${a.def}, depois todas ${b.def}, as agrupa e as conta. Para cada imagem pinta uma casinha na coluna certa, e o gráfico de barras se enche aos poucos, inclusive as colunas ${c.di}. Quando tudo está completo, a criança olha qual coluna é a mais alta e descobre a categoria mais numerosa. Um jeito concreto e divertido de classificar, contar e comparar até 10, no seu próprio ritmo.`,
  ][i % 12];
}

function p3(T, top, ex, i) {
  const [a, b] = ex;
  return [
    // 0 — print-first practical
    `A folha com o tema ${T} pode ser impressa em PDF para trabalhar no papel, ou feita direto na tela – sempre grátis e sem cadastro. Não há cronômetros nem notas: seu filho decide o próprio ritmo, sem vergonha se errar a contagem, porque recontar uma coluna – olhar mais uma vez a coluna ${top.di}, por exemplo – faz parte de aprender. A atividade se liga à BNCC e ao campo Probabilidade e estatística da matemática, e combina muito com o 1º ano, por volta dos 6 anos. Como próximo passo, vocês podem contar de novo ${a.def} e comparar as colunas.`,
    // 1 — download-online
    `Você pode baixar o PDF com o tema ${T} para imprimir, ou fazer a versão interativa online – grátis e sem conta. Sem relógio e sem pontos: cada criança avança no seu tempo, com carinho e sem pressão. A atividade se liga à BNCC, no campo Probabilidade e estatística (matemática), e foi pensada para o 1º ano, por volta dos 6 anos. Quando seu filho termina de contar ${a.def} e ${b.def}, é gostoso comparar as colunas e ver se a coluna ${top.di} é a mais alta.`,
    // 2 — "tudo grátis" lead
    `Tudo grátis: imprima a folha com o tema ${T} para trabalhar no papel, ou faça online sem precisar se cadastrar. Não há cronômetros nem notas; rever e recontar ${a.def} também é um jeito de aprender. A folha se liga à BNCC, ao campo Probabilidade e estatística (matemática), e serve bem para as crianças do 1º ano, por volta dos 6 anos. O próximo passo é comparar qual categoria tem mais imagens – serão ${top.def}?`,
    // 3 — diagram lead
    `Este gráfico com o tema ${T} é grátis, para imprimir em PDF ou fazer online, sem cadastro. Sem relógios e sem pontos: seu filho escolhe o próprio ritmo, num tom gentil. A folha se liga à BNCC, no campo Probabilidade e estatística (matemática), e combina muito com o 1º ano, por volta dos 6 anos. No fim, vocês podem comparar as colunas ${a.di} e ${b.di} – e ver se a coluna ${top.di} é a mais alta – firmando juntos a leitura do gráfico de barras.`,
    // 4 — "em casa" / home extension
    `Em casa você pode imprimir a folha com o tema ${T} em PDF, ou abri-la online: de qualquer jeito é grátis e não precisa de cadastro. Sem cronômetros e sem notas, seu filho conta com calma e, se quiser, confere de novo a coluna ${a.di}. A folha está de acordo com a BNCC, campo Probabilidade e estatística da matemática, e serve para o 1º ano, por volta dos 6 anos. Depois, vocês podem procurar pela casa outros objetos como ${b.def} e tentar contá-los do mesmo jeito.`,
    // 5 — collaborative parent lead
    `Sentem-se pertinho: imprimam a folha com o tema ${T} ou façam online, é grátis e sem conta. Sem relógio, sem nota, só o prazer de contar juntos ${a.def} e ${b.def}. A atividade lembra a BNCC, no campo Probabilidade e estatística (matemática), e foi pensada para o 1º ano, por volta dos 6 anos. Para continuar, pergunte a seu filho qual coluna é a mais alta – se são ${top.def} – e por quê.`,
    // 6 — "quando precisar" flexible
    `Quando precisar, você tem a folha com o tema ${T} pronta para imprimir em PDF ou usar online, sempre grátis e sem cadastro. Não há nenhum cronômetro e nenhuma nota: recontar ${a.def} com calma é só mais um jeito de aprender. A folha se liga à BNCC, campo Probabilidade e estatística (matemática), e serve para o 1º ano, por volta dos 6 anos. Depois vocês podem comparar as colunas e descobrir se ${top.def} são mesmo o grupo mais numeroso.`,
    // 7 — next-step lead
    `Como próximo passo, depois de contar ${a.def} e ${b.def}, seu filho pode comparar todas as colunas do gráfico com o tema ${T}. A folha é grátis: imprime-se em PDF ou usa-se online sem conta. Nenhum cronômetro e nenhuma nota acompanham o trabalho, então a criança avança serena. A atividade está de acordo com a BNCC, campo Probabilidade e estatística da matemática, e serve para o 1º ano, por volta dos 6 anos. A pergunta final é simples: a coluna ${top.di} é a mais alta?`,
    // 8 — reassurance / no-shame lead
    `Errar a contagem não é problema: nesta folha com o tema ${T} sempre dá para recontar a coluna ${a.di} com toda a calma necessária, porque não há relógios nem notas. A folha é grátis, para imprimir em PDF ou fazer online sem cadastro. Liga-se à BNCC, ao campo Probabilidade e estatística (matemática), e combina muito com o 1º ano, por volta dos 6 anos. Para continuar, comparem ${b.def} com as outras categorias e procurem o grupo mais numeroso.`,
    // 9 — printable-PDF practical lead
    `O PDF com o tema ${T} se imprime num instante para trabalhar no caderno, mas você também pode usar a versão online: as duas são grátis e sem conta. Seu filho conta do seu jeito, sem relógio e sem nota, e se quiser confere de novo quantas são ${a.def}. A folha lembra a BNCC, campo Probabilidade e estatística da matemática, e serve para o 1º ano, por volta dos 6 anos. Depois comparem as colunas ${b.di} e das outras categorias para achar a mais alta.`,
    // 10 — question-to-extend lead
    `Qual grupo terá vencido, ${top.def} ou outro? Depois de completar o gráfico com o tema ${T}, seu filho compara as colunas e descobre. A folha é grátis, para imprimir em PDF ou fazer online sem cadastro, e sem nenhum cronômetro ou nota. Liga-se à BNCC, campo Probabilidade e estatística (matemática), e foi pensada para o 1º ano, por volta dos 6 anos. Como brincadeira a mais, tentem contar de novo ${a.def} e ${b.def} em voz alta.`,
    // 11 — gentle-rhythm lead
    `No seu tempo e em toda a tranquilidade, seu filho termina a folha com o tema ${T}, que você pode imprimir em PDF ou abrir online grátis e sem conta. Sem relógio e sem estrelinhas: contar ${a.def} e ${b.def} continua sendo um prazer calmo. A atividade está de acordo com a BNCC, campo Probabilidade e estatística da matemática, e serve para o 1º ano, por volta dos 6 anos. No fim, comparem juntos as colunas e vejam se são ${top.def} a categoria mais numerosa.`,
  ][i % 12];
}

function buildEntry(deck, i, report) {
  const T = themeDisplay(deck.themeKey);
  const cats = [];
  for (const c of deck.categories) {
    const pt = resolvePt(c.nounKey);
    if (!pt) { report.unresolved.push(`${c.nounKey} (${deck.themeKey})`); continue; }
    cats.push({ sing: pt[0], plural: pt[1], gender: pt[2] || 'm', count: c.count });
  }
  if (cats.length < 2) { report.droppedDecks.push(`${deck.slug} (only ${cats.length} resolved cats)`); return null; }

  // p2: HONEST-COUNT weave — "3 corujas, 5 porcos e 3 elefantes" (count + lc sing/plural)
  const items = cats.map((c) => `${c.count} ${lc(c.count === 1 ? c.sing : c.plural)}`);
  const list = ptList(items);
  // gender-articled forms per category noun, computed from c.gender. Portuguese has
  // NO masculine-plural-article complexity (the it gli/i trap disappears):
  //   masculine plural article = "os", feminine = "as"; de+art = "dos"/"das".
  //   bare = "gatos"/"maçãs" (no article — count/genitive position)
  //   def  = "os gatos"/"as maçãs" (definite-article position)
  //   di   = "dos gatos"/"das maçãs" (de+article position)
  const articled = (c) => {
    const bare = lc(c.plural);
    if (c.gender === 'm') return { bare, def: 'os ' + bare, di: 'dos ' + bare };
    return { bare, def: 'as ' + bare, di: 'das ' + bare };
  };
  const ex = cats.map(articled);
  const top = articled([...cats].sort((a, b) => b.count - a.count)[0]);

  const p2 = [
    // 0
    `Nesta folha seu filho conta ${list}. Enquanto pinta uma casinha para cada imagem, a coluna mais alta mostra num só olhar qual grupo tem mais e qual tem menos. Apontar cada imagem com o dedo enquanto conta ajuda seu filho a não perder a conta e a conferir a resposta.`,
    // 1
    `Aqui seu filho conta ${list}. Cada grupo tem a sua coluna, então quando a folha está completa vê-se na hora qual categoria ficou a mais alta e qual a mais baixa. Contar e ao mesmo tempo apontar cada imagem faz com que seu filho não pule nenhuma e possa rever a resposta com calma.`,
    // 2
    `No gráfico desta folha seu filho conta ${list}. Uma casinha pintada para cada figurinha faz subir a coluna certa, e num relance a criança compara as alturas e percebe qual grupo é o mais numeroso. Tocar cada imagem enquanto conta ajuda a manter o lugar e a não errar o total.`,
    // 3
    `Vamos contar juntos: nesta folha seu filho conta ${list}. À medida que pinta as casinhas, as colunas crescem e contam uma pequena história de quantidades, em que se lê na hora quem tem mais e quem tem menos. Apontar as imagens uma a uma enquanto conta permite reconferir cada coluna com tranquilidade.`,
    // 4
    `A tarefa de contagem é clara: seu filho conta ${list}. Cada categoria enche a sua coluna do gráfico de barras, então assim que a folha fica completa a comparação entre os grupos vira algo imediato. Seguir cada figurinha com o dedo enquanto conta é o truquezinho que evita pular alguma e deixa a conferência serena.`,
    // 5
    `Nesta atividade seu filho conta ${list}. Pintando uma casinha por imagem faz crescer as colunas do gráfico, e assim vê num só olhar qual grupo é o mais alto e qual o mais baixo. Contar apontando cada figurinha ajuda a não perder a conta e a rever o resultado com calma.`,
  ][i % 6];

  // practiceProblems — "Quantos/Quantas {plural}?" (agree with plural gender)
  const pp = cats.map((c) => ({
    q: `${c.gender === 'm' ? 'Quantos' : 'Quantas'} ${lc(c.plural)}?`,
    a: String(c.count),
  }));

  return {
    slug: deck.slug,
    variantShape: deck.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'chart-count', mode: null, theme: deck.themeKey, level: '1o-ano' },
    levels: ['1o-ano'],
    eyebrow: 'Atividade: Gráfico de barras',
    h1: `Gráfico de barras: ${T} – atividade para o 1º ano`,
    strand: 'Probabilidade e estatística',
    standard: 'K.MD.B.3',
    slotTokens: [...cats.map((c) => c.sing), T, '1º ano'],
    p1: p1(T, [ex[0], ex[1] || ex[0], ex[2] || ex[1] || ex[0]], i),
    p2,
    p3: p3(T, top, [ex[0], ex[1] || ex[0]], i),
    canonicalDeckSlug: deck.slug,
    carousel: [],
    practiceProblems: pp,
    ...(deck.siblings.length > 1 ? { collapseSiblings: deck.siblings } : {}),
  };
}

// --- build ---
const culled = facts.filter((d) => CULL_THEMES.has(d.themeKey)).map((d) => d.themeKey);
const targets = facts.filter((d) => !CULL_THEMES.has(d.themeKey));
const report = { unresolved: [], droppedDecks: [] };
const entries = [];
targets.forEach((d, i) => { const e = buildEntry(d, i, report); if (e) entries.push(e); });

// --- summary ---
console.log('=== gen-pt-chartcount summary ===');
console.log('themes processed (countable):', targets.length, '/ facts', facts.length);
console.log('culled (non-countable, ' + culled.length + '):', culled.join(', '));
console.log('categories skipped (unresolved, ' + report.unresolved.length + '):', report.unresolved.join(', ') || '(none)');
console.log('decks dropped (<2 cats, ' + report.droppedDecks.length + '):', report.droppedDecks.join(', ') || '(none)');
console.log('total entries built:', entries.length);
if (entries.length) {
  const s = entries[0];
  console.log('--- sample entry [' + s.slug + '] ---');
  console.log('  h1:', s.h1);
  console.log('  p2:', s.p2);
  console.log('  practiceProblems:', JSON.stringify(s.practiceProblems));
}

// --- honest-count assertion: every practiceProblem answer must appear with the same
// number in p2's count list (defence in depth — both come from facts but assert it).
// Strip the "Quantos |Quantas " prefix and "?" suffix, match "(\d+) <noun>". ---
let mismatch = 0;
for (const e of entries) {
  for (const pp of e.practiceProblems) {
    const noun = pp.q.replace(/^(Quantas|Quantos) /, '').replace(/\?$/, '');
    const re = new RegExp('(\\d+) ' + noun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const m = e.p2.match(re);
    if (m && m[1] !== pp.a) { console.error('  HONEST-COUNT MISMATCH ' + e.slug + ': p2 "' + m[0] + '" vs pp a=' + pp.a); mismatch++; }
  }
}
if (mismatch) { console.error('HONEST-COUNT: ' + mismatch + ' mismatch(es) — halting.'); process.exit(1); }
console.log('honest-count assertion: clean (p2 counts ↔ practiceProblems answers agree)');

if (DRY) { console.log('\n[DRY-RUN] no write.'); process.exit(0); }

// --- read / filter-out existing chart-count / append / write (idempotent) ---
let cur = { _note: 'PT landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(PT, 'utf8')); } catch (e) {}
const keep = (cur.landings || []).filter((l) => l.coordinate.type !== 'chart-count');
const merged = { _note: cur._note, landings: keep.concat(entries) };
JSON.parse(JSON.stringify(merged)); // validate serializable
fs.writeFileSync(PT, JSON.stringify(merged, null, 2) + '\n');
console.log('\nwrote ' + entries.length + ' chart-count entries; pt.json total landings now ' + merged.landings.length);
