/* pt-readiness-big-small — Brazilian-Portuguese prose config for the big-small fan.
 * Two modes (readiness, NO standard, level 'educacao-infantil'):
 *   'findBig' — each box shows the SAME object at two/three sizes; the child finds
 *      the BIGGEST (o maior) — or the smallest (o menor) — and circles it (compare by
 *      size, no counting, no numerals — looking only). Strand: Grandezas e medidas.
 *   'orderAsc' — the same object appears at several sizes; the child orders them from
 *      smallest to largest (do menor para o maior — seriation / size ladder).
 *      Digit-free copy (no "1st/2nd" numerals). Strand: Grandezas e medidas.
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Portuguese morphology):
 *   {N_PL} appears ONLY in "imagens de {N_PL}" / "com {N_PL}" slots (never with an
 *   article before it); "as coisas" = {GEN_ART} {GEN}; "de/em/a/por + collective"
 *   via {DE_GEN}/{EM_GEN}/{A_GEN}/{POR_GEN}; P3 uses {nb1}/{nb2}.
 * SIZE FENCE (load-bearing): lexicon stays on SIZE — tamanho / grande / pequeno /
 *   o maior / o menor / maior que / menor que / do menor para o maior / ordene por
 *   tamanho. The size intensifier (o maior / o menor) is mandatory and frequent.
 *   NEVER "quantidade / quantos / quantas / mais coisas que / em maior número /
 *   o grupo com mais" (that is more-less, the QUANTITY side). This worksheet is SIZE. */
'use strict';

const SKEL_FB = [
  `«Qual é o maior?» É a primeira pergunta que acende o olhar da criança da educação infantil diante desta página. Em cada quadrinho aparece a mesma coisa desenhada em dois ou três tamanhos: uma grande e uma pequena, lado a lado. A tarefa é simples e divertida: encontrar a figura maior e contorná-la com um traço firme. Enquanto faz isso, a criança aprende a distinguir o grande do pequeno olhando apenas, sem números. Aqui o que importa é o tamanho de cada figura. Esse comparar feito com os olhos é uma valiosa habilidade que prepara para a escola. Sem pressa, brinca-se no próprio ritmo. Sugira que ela apoie o dedo em cada figura e se pergunte qual ocupa mais espaço. Se hesitar no começo, olhem juntos a menor: por contraste, a maior salta logo aos olhos. Quando contorna a figura certa, a satisfação vem sozinha. Vivida ao lado de um adulto paciente, com palavras carinhosas e nenhuma corrida, a atividade vira um caloroso momento de brincadeira compartilhada.`,

  `Imagine duas bolas, uma gigante e uma minúscula: mesmo de relance se percebe qual é a maior. É a mesma sensação que recebe a criança nesta folha. Observando as imagens de {N_PL}, ela descobre que cada quadrinho mostra a mesma figura em tamanhos diferentes, e cabe a ela encontrar a maior e contorná-la. Concentrando-se no tamanho, a criança treina a comparação de grandezas e aprende a confiar no próprio olhar. Não há nota a tirar, apenas a curiosidade que guia os olhos. Convide-a a descrever em voz alta o que vê, a apontar a figura grande e a pequena. Se contornar uma figura que não é a maior, sorriam juntos e tenta-se de novo com leveza. Cada escolha certa é uma conquista que a enche de orgulho. Num clima sereno e paciente, esta atividade vira uma ocasião afetuosa para observar com calma e crescer juntos, um quadrinho após o outro, sem nenhuma pressão.`,

  `Olhe bem o tamanho! Nesta página pensada para a educação infantil, em cada quadrinho a mesma coisa aparece grande e pequena, lado a lado. A criança precisa reconhecer qual figura é a maior e cercá-la com um círculo. Para conseguir, basta comparar com os olhos: esta figura ocupa mais espaço ou menos espaço que a do lado? Assim a criança distingue o grande do pequeno sem precisar contar nem usar números. Essa comparação de tamanhos é uma calma habilidade de base que será útil na escola. Nenhum cronômetro marca o tempo: segue-se com tranquilidade. Acompanhe com perguntas leves, qual te parece maior, e dê espaço para ela pensar. Se mudar de ideia, pode contornar de novo e seguir serena. Encontrar a figura maior reforça a atenção e a confiança em si. É um convite simples a estarem juntos, a cultivar o olhar curioso da criança e a saborear juntos a alegria de um tamanho reconhecido.`,

  `Você sabe apontar a coisa maior com um dedo só? Para a criança é logo um pequeno jogo a resolver com os olhos. Em cada quadrinho a mesma figura aparece em dois ou três tamanhos, e ela procura a maior para contorná-la. Aqui não se trata de contar, mas de comparar tamanhos: qual figura é maior, qual é menor. Distinguir os tamanhos diverte e prepara com doçura para a escola, onde olhar com precisão importa muito. Os tamanhos são postos lado a lado de propósito, para que a comparação fique fácil e imediata. Estimule-a a comparar cada figura com a do lado e a escolher a maior com segurança. Mesmo um erro é um passo adiante: tenta-se de novo com um sorriso. Quando contorna o tamanho certo, a concentração da criança fica mais firme. Vivida ao lado de uma voz suave e com tempos calmos, a folha vira um caloroso momento em que se aprende observando, sem nenhuma corrida.`,

  `Encontrar a maior num relance: eis o desafio carinhoso desta folha da educação infantil. Em cada quadrinho a criança vê a mesma coisa em tamanhos diferentes e identifica a de maior tamanho, cercando-a com um círculo. É um treino gentil para os olhos: para escolher bem, ela precisa comparar com cuidado quanto espaço ocupa cada figura. Nenhum tempo a bater, conta o prazer de observar. Apoie-a com perguntas doces e deixe-a explorar a página seguindo o próprio passo. Se não achar logo a figura maior, tenta de novo com tranquilidade, sem que ninguém a apresse. Cada tamanho reconhecido reforça a comparação de grandezas e a confiança em si mesma. Vivida a quatro mãos, com tempos calmos e palavras gentis, esta atividade vira um momento precioso em que a criança aprende olhando e comparando, um pequeno passo de cada vez. Aqui não servem números: bastam dois olhos atentos.`,

  `Nesta página da educação infantil, cada quadrinho conta a mesma coisa em formato grande e em formato pequeno. Olhando {GEN_ART} {GEN}, a criança compara os tamanhos e contorna a figura maior. Não precisa contar, basta observar com atenção: esta figura é maior ou menor que a do lado? Esse olhar em vez de contar é uma habilidade de base muito útil, e deixa as crianças seguras ao avaliar tamanhos. Os tamanhos estão lado a lado justamente para convidar à comparação. Incentive-a a passar o olhar de uma à outra e a escolher a que ocupa mais espaço. Se contornar a figura errada, escolhe outra com serenidade, sem pressa. Cada tamanho reconhecido é uma pequena alegria a comemorar. Num clima caloroso e paciente, a atividade se transforma num doce momento de descoberta para viver lado a lado, com muita gentileza e nenhuma pressão.`,

  `Pequeno ou grande? Esta é a pergunta que faz a criança sorrir diante da folha. Olhando {GEN_ART} {GEN}, ela nota que em cada quadrinho a mesma figura aparece em tamanhos diferentes, e cabe a ela encontrar a maior e contorná-la. Tudo está em comparar com os olhos, uma calma habilidade que na escola vai contar quando for preciso distinguir formas e detalhes. E o mais bonito é que aqui basta olhar, nunca contar. Os tamanhos são aproximados de propósito, assim a comparação fica uma pequena aventura imediata. Convide-a a apontar a figura grande, a comparar seu tamanho com o da menor e a explicar sua escolha. Diante de um erro, basta um sorriso e uma nova tentativa. Quando identifica o tamanho certo, a segurança da criança cresce um pouco, num clima sempre sereno e afetuoso, no passo que ela preferir.`,

  `Cada coisa tem o seu tamanho. Nesta folha para a educação infantil, a criança encontra em cada quadrinho a mesma figura em tamanhos diferentes e deve escolher a maior, cercando-a com um círculo. Comparando os tamanhos, entende qual figura é grande e qual é pequena, qual ocupa mais espaço e qual ocupa menos. Essa quieta atenção ao tamanho é uma verdadeira habilidade de base: reforça o olhar com precisão, que será útil mais adiante no reconhecimento de letras e formas. Não há disputa nem pontuação, apenas o olhar atento e a vontade de tentar. Estimule-a a comparar duas figuras por vez, a apontar a maior e a contar o que percebe. Se contornar a errada, escolhe outra com calma e recomeça. Encontrar a figura maior é uma conquista que faz bem à confiança. Num clima gentil e calmo, a atividade vira um momento precioso de observação e comparação, para saborear juntos com tempos macios.`,
];

const P2_FB = [
  `«Qual é o maior?» É dessa pergunta que parte o jogo. Em cada quadrinho a mesma figura aparece em dois tamanhos, uma grande e uma pequena, e a criança contorna a de maior tamanho olhando apenas, sem contar. Compara os tamanhos no próprio ritmo, sem pressa e sem notas; se por contraste olharem antes a pequena, a maior salta logo aos olhos.`,

  `Reserve um momento tranquilo à mesa e observem juntos as imagens de {N_PL}. A cada quadrinho, pergunte qual figura é grande e qual é pequena, antes que ela procure a maior. Assim o tempo fica calmo e a pressão fora da porta. Aqui não se conta nada: comparam-se tamanhos olhando, e cada tamanho reconhecido merece um sorriso.`,

  `Uma ideia doce: procurem antes pela casa dois objetos iguais mas de tamanho diferente, um sapato grande e um pequeno, depois voltem à página com {N_PL}. Assim a criança entende brincando o que significa «maior». Depois, contornar a figura certa fica facílimo. Olhar e comparar tamanhos, nunca contar, é todo o segredo desta folha.`,

  `Fique sereno ao lado da criança enquanto ela compara as imagens de {N_PL}. Há quem aponte com o dedo e quem prefira dizer em voz alta: tudo bem dos dois jeitos. O importante é que olhe o tamanho de cada uma e encontre a figura maior, contornando-a com prazer. Nenhum relógio e nenhuma corrida; um sorriso caloroso motiva os pequenos observadores mais do que qualquer outra coisa.`,

  `Se a criança estiver em dúvida, ponham dois dedos dos lados de cada figura e olhem onde a distância é maior: assim a maior fica logo visível, sem contar. Depois ela contorna o tamanho que escolheu. Esse pequeno truque torna a comparação de grandezas concreta e reforça o seu olhar atento, com toda a tranquilidade.`,

  `Não é preciso explicar muito: a criança aprende fazendo. Folheiem a página com {N_PL} quadrinho após quadrinho e alegrem-se com cada figura grande identificada. Se um espaço parecer difícil, aponte antes a menor e a maior quase se revela sozinha. Comparar os tamanhos com os olhos é aqui o único ingrediente, doce e leve.`,

  `Esta atividade com {N_PL} é perfeita para um momento calmo a sós. Deixe que a criança decida qual figura é grande e qual é pequena, qual é a maior, e intervenha só se ela pedir. Contorná-la é o belo ponto final. Elogie o empenho, não a velocidade, assim comparar os tamanhos continua sendo um prazer e não uma prova: é um jogo de olhares, não de números.`,
];

const SKEL_OA = [
  `Uma pequena escada de tamanhos a construir: é o coração desta folha da educação infantil. Em cada quadrinho a mesma coisa aparece em vários tamanhos, do menor ao maior, e todas misturadas. A criança as recoloca em ordem, do menor para o maior, formando uma bela fila crescente. Enquanto faz isso, olha e compara os tamanhos, sem contar nada e sem usar números. Aqui só importa o tamanho: o que vem antes, o que vem depois. Esse ordenar por tamanho é uma valiosa habilidade de base que prepara para a escola. Sem pressa, brinca-se no próprio ritmo. Sugira que ela procure primeiro a figura menor e a coloque no começo, depois aos poucos as outras até a maior. Se errar um lugar, troca com leveza e segue. Quando a fila está completa, do menor ao maior, a satisfação vem sozinha. Vivida ao lado de um adulto paciente, com palavras carinhosas e nenhuma corrida, vira um caloroso momento de brincadeira compartilhada.`,

  `Imagine três copos para pôr em fila, do menor ao maior: eis o convite que espera a criança nesta folha. Observando {GEN_ART} {GEN}, ela descobre que cada figura se repete em tamanhos diferentes e que cabe a ela ordená-las. A tarefa é doce: comparar todos os tamanhos, da figura pequena à grande, e dispô-los numa sequência que cresce, do menor para o maior. Concentrando-se nos tamanhos, a criança treina o pensamento para sequências e ordens, o que os estudiosos chamam de seriação. Não há nota a tirar, apenas a curiosidade que guia o olhar. Convide-a a apontar a menor e a maior antes de arrumar o resto. Se duas figuras pararem no lugar errado, sorriam juntos e tenta-se de novo. Cada fila bem construída é uma conquista que a enche de orgulho. Num clima sereno e paciente, a atividade vira uma ocasião afetuosa para crescer juntos, um tamanho após o outro, sem nenhuma pressão.`,

  `Coloque em ordem por tamanho! Nesta página da educação infantil, a mesma figura aparece pequena, média e grande, toda misturada. A criança a reordena, do menor para o maior, construindo uma escada de tamanhos. Para conseguir, compara com os olhos todas as figuras e se pergunta qual vem antes e qual depois. Esse ordenar por tamanho reforça o pensamento para sequências e a atenção, uma bela preparação para a escola, em que olhar conta mais do que contar. Nenhum cronômetro marca o tempo: segue-se com calma. Acompanhe com perguntas leves, qual é a menor, qual a maior, e dê espaço para ela pensar. Se mudar de ideia, pode mover as figuras e seguir serena. Conseguir compor a fila reforça a concentração e a confiança em si. É um convite simples a estarem juntos e a saborear a satisfação de uma escada de tamanhos enfim em ordem.`,

  `Do menor ao maior: você saberia dispor estas figuras em fila? Para a criança é logo um pequeno jogo a resolver com os olhos. Em cada quadrinho a mesma coisa aparece em vários tamanhos, e ela as ordena formando uma sequência crescente. Aqui não se trata de contar, mas de comparar tamanhos: qual figura é menor, qual maior, e onde vai cada uma. Ordenar por tamanho diverte e treina, quase brincando, o pensamento para sequências. Os tamanhos estão misturados de propósito, para que o desafio esteja todo em recolocá-los em ordem. Estimule-a a partir da figura menor e a construir a escada um degrau de cada vez. Mesmo um erro é um passo adiante: tenta-se de novo com um sorriso. Quando a fila cresce ordenada, a concentração da criança fica mais firme. Vivida ao lado de uma voz suave e com tempos calmos, a folha vira um caloroso momento em que se aprende observando, sem números e sem corrida.`,

  `Nesta página da educação infantil, cada figura aparece em dois ou três tamanhos, espalhadas pela folha. Olhando as imagens de {N_PL}, a criança as recoloca em ordem, do menor para o maior, formando uma escada de tamanhos. Observa com cuidado todos os tamanhos e decide qual figura vai em cada lugar. Esse tranquilo ordenar é uma valiosa habilidade de base: exercita a comparação de grandezas com os olhos e nutre a ideia de que as coisas podem se dispor numa sequência ordenada. As figuras estão em desordem justamente para convidar à comparação atenta. Incentive-a a começar pela menor e a acrescentar aos poucos as maiores. Se uma figura parar no lugar errado, ela a move com serenidade, sem pressa. Cada fila completada é uma pequena alegria a comemorar. Num clima caloroso e paciente, a atividade se transforma num doce momento de descoberta para viver lado a lado, com muita gentileza.`,

  `De pequena a grande, degrau após degrau: esta folha da educação infantil convida a criança a ordenar as figuras conforme o seu tamanho. Cada figura, repetida em vários tamanhos, tem um lugar certo na fila. A criança compara todos os tamanhos, identifica a menor e a maior e então arruma as outras no meio. Assim treina com calma o olhar preciso e o pensamento para sequências, uma habilidade de base que cresce sem nenhuma necessidade de números. Nenhum tempo a bater, conta o prazer de observar. Apoie-a com perguntas doces e deixe-a explorar a página no próprio passo. Se a fila não se compuser logo, tenta de novo com tranquilidade, sem que ninguém a apresse. Cada escada de tamanhos bem construída reforça a confiança em si mesma. Vivida a quatro mãos, com tempos calmos e palavras gentis, esta atividade vira um momento precioso em que a criança aprende ordenando e comparando, um pequeno passo de cada vez.`,

  `Construir uma escada de tamanhos: eis o jogo que esta página propõe à criança da educação infantil. Olhando {GEN_ART} {GEN}, ela nota que cada figura se repete em tamanhos diferentes e as reordena, do menor para o maior. Tudo está em comparar com os olhos e em dispor os tamanhos em sequência, uma calma habilidade que na escola vai contar muitas vezes. E o mais bonito é que aqui basta olhar e ordenar, nunca contar. As figuras estão misturadas de propósito, assim a reorganização continua sendo uma pequena aventura. Convide-a a apontar a menor e a maior, depois a preencher a fila no meio. Diante de uma troca errada, basta um sorriso e uma nova arrumação. Quando a sequência cresce ordenada, a segurança da criança aumenta um pouco, num clima sempre sereno e afetuoso, no passo que ela preferir.`,

  `Cada figura encontra o seu lugar na fila. Nesta folha para a educação infantil a criança vê a mesma coisa em vários tamanhos, da pequena à grande, e a ordena por tamanho, do menor para o maior, construindo uma escada. Reconhece, comparando os tamanhos, qual figura vem antes e qual depois, e as dispõe com cuidado. Essa quieta concentração no ordenar é uma verdadeira habilidade de base: reforça o pensamento para sequências, que será útil mais adiante no escrever e no reconhecer letras. Não há disputa nem pontuação, apenas o olhar atento e a vontade de tentar. Estimule-a a começar pela menor, a comparar cada figura com a anterior e a contar o que percebe. Se errar um lugar, troca com calma e recomeça. Compor a escada é uma conquista que faz bem à confiança. Num clima gentil e calmo, a atividade vira um momento precioso de observação e ordem, para saborear juntos com tempos macios.`,
];

const P2_OA = [
  `Uma escada de tamanhos a construir do menor para o maior: a criança olha todas as figuras, escolhe a menor, a bem pequena, e a coloca primeiro, depois aos poucos as outras até a maior, a bem grande. Compara os tamanhos com os olhos e ordena no próprio ritmo, sem pressa e sem notas, só pela alegria de ver a fila crescer bem ordenada, degrau após degrau.`,

  `Qual vem antes, qual depois? É dessa pergunta que parte o jogo. Observando {GEN_ART} {GEN}, a criança dispõe as figuras do menor para o maior, da pequena à grande, olhando só o seu tamanho. É um tranquilo exercício de comparação, para saborear juntos com palavras gentis e todo o tempo que precisar; se duas figuras pararem no lugar errado, troca-se com um sorriso.`,

  `Uma ideia doce: ordenem antes pela casa três objetos iguais mas de tamanho diferente, três xícaras talvez, depois voltem à página com {N_PL}. Assim a criança entende brincando o que quer dizer ir da pequena à grande, do menor para o maior. Depois, reordenar as figuras na folha fica fácil. Comparar e ordenar por tamanho, nunca contar, é todo o segredo.`,

  `Fique sereno ao lado da criança enquanto ela ordena as imagens de {N_PL}. Há quem arrume em silêncio e quem comente em voz alta: ambos valem. O importante é que construa a sua escada de tamanhos com prazer. Nenhum relógio e nenhuma corrida; um sorriso caloroso motiva os pequenos mais do que qualquer coisa, e cada fila completada é uma conquista.`,

  `Se a criança estiver em dúvida, procurem juntos a figura menor e ponham-na à esquerda, depois a um pouco maior ao lado, até completar a fila. Assim a escada de tamanhos toma forma um degrau de cada vez, sem contar. Essa pequena ajuda torna o ordenar por tamanho concreto e reforça o seu olhar atento, com toda a calma.`,

  `Não é preciso explicar muito: a criança aprende fazendo. Folheiem a página com {N_PL} e alegrem-se com cada fila bem composta. Se um quadrinho parecer difícil, comecem pela figura menor, a bem pequena, e a ordem quase se revela sozinha até a grande. Comparar os tamanhos e dispô-los em sequência é aqui o único ingrediente, doce e leve, sem nenhuma pressão.`,

  `Esta atividade com {N_PL} é perfeita para um momento calmo à mesa. Deixe que a criança decida qual figura vai em cada lugar, da pequena à grande, e intervenha só se ela pedir. A escada de tamanhos pronta é o belo ponto final. Elogie o empenho, não a velocidade, assim ordenar por tamanho continua sendo um prazer: um jogo de olhares e de comparações, não de números.`,
];

const H1 = {
  'findBig': 'Grande ou pequeno: encontre o maior com {H1} – folha para a educação infantil',
  'orderAsc': 'Ordene por tamanho com {H1} – do menor para o maior – folha para a educação infantil',
};
const CAR = {
  'findBig': 'Grande ou pequeno – ',
  'orderAsc': 'Ordene por tamanho – ',
};

module.exports = {
  type: 'big-small',
  eyebrow: 'Atividade: Grande ou pequeno',
  strand: 'Grandezas e medidas',
  level: 'educacao-infantil',
  slotWord: 'grande-pequeno',
  h1: (mk) => H1[mk] || H1['findBig'],
  carousel: (mk, themeH1) => (CAR[mk] || 'Grande ou pequeno – ') + themeH1,
  modes: {
    'findBig': { SKEL: SKEL_FB, P2: P2_FB },
    'orderAsc': { SKEL: SKEL_OA, P2: P2_OA },
  },
  P3: `Se a criança se divertiu comparando os tamanhos, pode continuar com outras folhas vizinhas, como {nb1} ou {nb2}. São brincadeiras tranquilas de observação, perfeitas para treinar o olhar sobre os tamanhos enquanto explora {GEN_ART} {GEN}. Cada folha dá para imprimir ou jogar online, como preferirem. Vivam-na juntos com tempos calmos, sem cronômetro e sem pontuação, só pelo prazer de olhar qual figura é grande e qual é pequena, qual é maior e qual é menor.`,
};
