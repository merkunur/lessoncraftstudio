/* pt-readiness-picture-path — Brazilian Portuguese (pt-BR) prose config for the picture-path fan.
 * Type: 'picture-path' (a picture maze / "Labirinto"). Readiness: NO standard.
 * Strand: Orientação espacial. Level: 'educacao-infantil'. NO counting, NO time pressure.
 *
 * THREE modes:
 *   'choose-path'  — pick the RIGHT path among several options (escolha o caminho certo).
 *   'classic-maze' — navigate the single winding maze from entrance to exit (labirinto clássico).
 *   'pathway'      — rare (1 deck); reuse a classic-maze-style voice (trace the open trail).
 *
 * OWNED lexicon (picture-path): o labirinto / o caminho / a saída / a entrada / sem saída /
 *   siga o caminho / da entrada até a saída / o trajeto / passo a passo.
 * FENCE vs treasure-hunt (deferred): NEVER tesouro / setas / bússola / pistas / norte / sul.
 *
 * Placeholder discipline (PURE-SUBSTITUTION renderer — pt-render.js, NO pt morphology):
 *   {N_PL}    appears ONLY in "imagens de {N_PL}" / "com {N_PL}" / "de {N_PL}" slots
 *             (never an article directly before {N_PL});
 *   "as coisas"/"the things" = {GEN_ART} {GEN} (= os/as + collective, plural-agreeing);
 *   prep+article contractions via {DE_GEN} / {EM_GEN} / {A_GEN} / {POR_GEN};
 *   P3 neighbour links via {nb1} / {nb2}. Every SKEL references the theme. */
'use strict';

/* ───────────────────────── choose-path: pick the RIGHT path among several ───────────────────────── */
const SKEL_CHOOSE = [
  `Imagine a criança sentada com o lápis na mão diante deste labirinto, se perguntando: qual é o caminho certo? É justamente isso que torna a folha tão gostosa. Na entrada começam vários caminhos, mas só um leva mesmo até a saída. Ao redor do labirinto esperam algumas imagens de {N_PL}, e o pequeno precisa escolher, entre os caminhos que se abrem, aquele que está livre. Brincando com {GEN_ART} {GEN}, ele compara as opções, segue o trajeto com o dedinho e depois com o lápis, e descobre por onde se chega à saída. Essa orientação espacial é uma preciosa habilidade de base, sem nenhuma pressão e sem contar nada. Aqui ninguém corre: brinca-se no próprio ritmo. Sugira começar pela entrada e experimentar as direções uma de cada vez. Se um caminho acaba sem saída, é só voltar com calma e tentar outro. Vivida ao lado de um adulto paciente, com palavras gentis, a atividade vira um momento quentinho de brincadeira compartilhada. É grátis, para imprimir ou jogar online.`,

  `Escolher o caminho certo num labirinto, para a criança da educação infantil, é como resolver um pequeno enigma — e de fato é. Nesta folha vários caminhos saem da entrada, e ao redor estão dispostas algumas imagens de {N_PL} como destino. Mas só uma das trilhas está livre até a saída. O pequeno olha com atenção, observa as bifurcações e compara as opções antes de seguir. Assim ele exercita, quase brincando, a orientação espacial e o olhar cuidadoso, duas habilidades que mais adiante vão ajudar a ler e a escrever. Observando {GEN_ART} {GEN}, não há limite de tempo nem medo de errar. Convide a criança a pousar o dedinho na entrada e a passar o olhar por cada caminho antes de decidir qual seguir. Quando encontra a trilha certa, pode repassá-la com um lápis colorido, e o trajeto vira logo um pequeno troféu para mostrar com orgulho. É grátis, para imprimir ou jogar online.`,

  `Às vezes um caminho parece certo e termina sem saída: escolher, entre vários, aquele que leva mesmo à saída treina na criança o pensamento que olha adiante. Nesta brincadeira o pequeno parte da entrada e precisa decidir qual dos caminhos, entre as imagens de {N_PL} ao redor, está realmente livre. Só uma trilha chega até a saída. Com o dedinho ou com um lápis colorido, a criança percorre o trajeto passo a passo. Essa lógica do espaço é uma verdadeira habilidade de base, e ainda por cima diverte muito. Não se conta os erros e nenhum cronômetro marca o tempo: explora-se com calma, observando {GEN_ART} {GEN}. Acompanhe com perguntas leves, por onde você acha que vai esse caminho, e deixe o pequeno tentar. Conseguir escolher a trilha certa fortalece a atenção e a confiança em si, num clima sempre sereno e carinhoso, longe de qualquer pressa. É grátis, para imprimir ou jogar online.`,

  `As crianças adoram labirintos porque parecem uma aventura: qual caminho leva ao destino certo? Nesta página o pequeno começa na entrada e decide, entre as várias trilhas que se abrem, qual delas conduz de verdade a uma das imagens de {N_PL} ao redor. Os outros caminhos terminam sem saída, escondidos com astúcia. A criança avança com o lápis e segue o único caminho livre até a saída. Enquanto faz isso, treina quase sem perceber a orientação espacial e a concentração, duas preciosas habilidades de base. Brincando com {GEN_ART} {GEN}, não há pontuação nem disputa, só o pequeno e um trajeto todo para descobrir. As trilhas fechadas fazem parte do jogo, e cada caminho sem saída é uma chance de voltar atrás. Deixe a criança experimentar várias direções: tomar um caminho errado e recomeçar com um sorriso é exatamente o que torna o labirinto tão vivo e afetuoso. É grátis, para imprimir ou jogar online.`,

  `Qual é o caminho certo? Essa pergunta simples é o coração da folha da educação infantil. Partindo da entrada, a criança precisa escolher, entre vários caminhos, aquele que atravessa o labirinto até a saída, onde a esperam imagens de {N_PL}. A parte surpreendente é que várias trilhas parecem livres, mas só uma chega de fato ao fim. O pequeno olha com atenção, prova com o dedinho e descobre o caminho aberto. Assim exercita a percepção do espaço, uma habilidade que na escola ajuda a se orientar e a colocar ordem. Sem pressa e sem correção de erros, explora-se no próprio ritmo, observando {GEN_ART} {GEN}. Convide-o a olhar primeiro todas as imagens ao redor e depois a decidir por qual caminho começar. Quando a trilha certa se revela, comemorem juntos a descoberta. É um doce momento de brincadeira e de crescimento, para viver lado a lado com muita calma. É grátis, para imprimir ou jogar online.`,

  `A entrada marca o começo e ao redor aparecem várias imagens, mas qual caminho leva até cada uma? Este labirinto desafia com doçura a criança a escolher, entre as trilhas que se abrem, a única que chega à saída, com {N_PL} como destino. Os caminhos errados terminam sem saída, então só uma trilha fica livre. O pequeno a segue com paciência usando o lápis, de uma bifurcação a outra. O exercício fortalece a imaginação do espaço, uma habilidade de base essencial para o começo da escola. Não há nenhum relógio correndo, nem alguém fazendo comparações, só a alegria de procurar e de encontrar entre {GEN_ART} {GEN}. Os caminhos fechados não são erros, mas dão a entender por onde não passar. Estimule o pequeno a contar em voz alta qual trilha quer experimentar, e por quê. Cada tentativa, mesmo a que acaba sem saída, o aproxima do destino e nutre a sua segurança, num clima quente e tranquilo. É grátis, para imprimir ou jogar online.`,

  `Escolher, entre vários caminhos, o que leva mesmo ao destino é um exercício maravilhoso para as mãozinhas e as mentes curiosas. Nesta folha a criança parte da entrada e se pergunta qual das trilhas, entre as imagens de {N_PL} ao redor, está livre até a saída. Só um caminho está aberto, os outros terminam sem saída. Com o dedinho ou com um lápis, o pequeno abre o seu trajeto e compara as opções passo a passo. Assim desenvolve a orientação espacial e a constância, duas preciosas habilidades de base. Brincando com {GEN_ART} {GEN}, cada tentativa merece um elogio e o destino não impõe nenhuma pressa. Sugira olhar adiante, imaginar onde uma trilha vai chegar antes mesmo de segui-la. Se errar o caminho, basta voltar à bifurcação e recomeçar com leveza. Quando finalmente a trilha certa se revela, a alegria da criança é autêntica, e a sua concentração sai fortalecida desse doce momento de descoberta. É grátis, para imprimir ou jogar online.`,

  `Entre vários caminhos, encontrar o certo até a imagem: parece brincadeira e é, na verdade, aprendizado de verdade. A criança parte da entrada e tenta descobrir qual trilha leva a uma das imagens de {N_PL} dispostas ao redor do labirinto. A maior parte dos caminhos termina sem saída, e só um permanece aberto. O pequeno o segue com atenção, usando o dedinho, e descobre sozinho a solução. Uma lógica do espaço como esta prepara o pensamento da escola, sem que a criança precise contar ou calcular nada. Sem cronômetro e sem pontuação, só a curiosidade que guia o olhar pelas trilhas, entre {GEN_ART} {GEN}. Os caminhos fechados fazem parte da aventura, e cada sem-saída ensina a olhar melhor. Basta imprimir a folha, sentar pertinho e procurar juntos o caminho. Quando a trilha certa aparece, compartilhem a satisfação de tê-la encontrado com calma e alegria. É grátis, para imprimir ou jogar online.`,
];

const P2_CHOOSE = [
  `E é assim que se brinca: a criança pousa o dedinho na entrada e olha os vários caminhos do labirinto. Em cada bifurcação observa qual trilha segue e qual termina sem saída. O destino é chegar a uma das imagens de {N_PL} ao redor. Deixe o pequeno experimentar várias direções com calma, os erros fazem parte do jogo; achado o caminho certo, ele pode repassá-lo com um lápis colorido. É grátis, para imprimir ou jogar online.`,

  `Sentem-se juntos à mesa e olhem o labirinto com calma. Onde fica a entrada? Qual caminho será o certo? A criança compara as trilhas com o dedinho, com {N_PL} dispostos ao redor. Só uma leva até a saída. Conversem enquanto procuram, porque assim é mais divertido e se fortalece, quase sem perceber, o senso do espaço, observando {GEN_ART} {GEN}. No fim, o caminho encontrado pode ser repassado com as cores.`,

  `Assim a criança escolhe o caminho: da entrada, compara as trilhas com o lápis e confere qual está aberta. Algumas parecem promissoras e terminam sem saída, e tudo bem assim. Importa só descobrir qual das imagens de {N_PL} o caminho livre alcança. Não há limite de tempo: deixe o pequeno pensar, experimentar e descobrir no próprio ritmo. É grátis, para imprimir ou jogar online.`,

  `Um pequeno guia: mostre à criança a entrada como ponto de partida e a convide a comparar os caminhos do labirinto. Com o dedinho ou com um lápis, ela observa as trilhas, sempre procurando a única que está aberta até as imagens de {N_PL} ao redor. Os outros caminhos terminam sem saída. Se errar, é só voltar e recomeçar: cada tentativa conta e treina o olhar cuidadoso.`,

  `Experimentem juntos: a criança começa na entrada e compara as trilhas com o dedinho. Nas bifurcações decide qual caminho seguir. O destino é encontrar a única imagem alcançável, com {N_PL}, enquanto as outras trilhas terminam sem saída. Quando descobre o caminho certo, pode traçá-lo com um lápis. Assim a procura vira uma pequena alegria conquistada, totalmente sem pressão. É grátis, para imprimir ou jogar online.`,

  `Uma dica para começar: olhem antes, com a criança, todas as imagens dispostas ao redor do labirinto. Depois ela parte da entrada e compara os caminhos com o dedinho até um destino com {N_PL}. Só uma trilha está livre, as outras terminam sem saída. Incentive o pequeno a tentar até alguns desvios, observando {GEN_ART} {GEN}: assim aprende a olhar adiante e a observar com precisão.`,

  `E agora é a vez de vocês: a criança parte da entrada e procura, entre os vários caminhos, a trilha certa do labirinto. Com o dedinho compara as opções e logo percebe que nem toda trilha leva ao destino. Trata-se de encontrar a única imagem com {N_PL} que o caminho livre alcança. Elogie cada tentativa, até os desvios, porque fazem parte do descobrir. No fim, achar o caminho será ainda mais gostoso.`,
];

/* ───────────────────────── classic-maze: trace the single winding path to the exit ───────────────────────── */
const SKEL_MAZE = [
  `Esta folha traz um verdadeiro labirinto, com paredes e becos sem saída para contornar. A criança entra pela entrada e procura o caminho certo até a saída, desviando dos becos. Avança primeiro com o dedinho, com cuidado, e depois traça com o lápis assim que encontra a passagem. Ao longo do trajeto, encontra imagens de {N_PL} para observar, o que deixa o labirinto ainda mais vivo. É um belo trabalho de orientação espacial: é preciso olhar bem adiante para não cair num beco sem saída. Brincando com {GEN_ART} {GEN}, não há cronômetro nem pontuação, só o prazer de se orientar e de chegar à saída, para repetir quantas vezes quiser na educação infantil. É grátis, para imprimir ou jogar online.`,

  `Atravessar um verdadeiro labirinto é aprender a planejar o gesto: a criança encontra o caminho certo com o olhar antes de começar, evitando as paredes e os becos sem saída. O dedinho guia primeiro, depois o lápis segue o trajeto da entrada até a saída. Esse controle do gesto, que deve ficar dentro dos corredores sem ultrapassar, prepara com doçura a escrita e afina a coordenação motora fina. Encontrando imagens de {N_PL} pelo caminho, o pequeno mantém o prazer de observar {GEN_ART} {GEN}. Cada beco evitado fortalece a sua capacidade de antecipar. É uma preparação gráfica tranquila, pensada para a educação infantil, que constrói a confiança antes das primeiras letras. É grátis, para imprimir ou jogar online.`,

  `Em casa ou num cantinho de atividades na escola, este verdadeiro labirinto encontra logo o seu lugar. A criança se acomoda com calma, observa imagens de {N_PL} ao longo dos corredores e procura a passagem certa, evitando paredes e becos sem saída. Sozinha ou acompanhada, avança no próprio ritmo da entrada até a saída. É uma atividade simples de propor num canto tranquilo, no começo ou no fim do dia. Começa-se com o dedinho para encontrar o caminho, depois retoma-se com o lápis para traçá-lo, brincando com {GEN_ART} {GEN}. Achar a saída de um labirinto vira um pequeno encontro que tranquiliza, perfeito para a educação infantil e sempre sem pressão. É grátis, para imprimir ou jogar online.`,

  `"Ajude a chegar à saída do labirinto!" A consigna logo lança a aventura. Desta vez é um verdadeiro labirinto: paredes fecham alguns corredores e becos sem saída espreitam a cada curva. Cabe à criança encontrar o caminho certo e desviar dos becos até a saída, entre as imagens de {N_PL} pelo trajeto. O dedinho explora primeiro, depois o lápis confirma a trilha. Essa encenação alegre dá sentido ao gesto e transforma a observação num pequeno desafio divertido. Brincando com {GEN_ART} {GEN}, o pequeno olha, antecipa e persiste até a saída. É um jeito bonito, na educação infantil, de trabalhar a orientação espacial sem nunca perder o prazer. É grátis, para imprimir ou jogar online.`,

  `Esta folha de verdadeiro labirinto é totalmente grátis e se trabalha de dois jeitos: para imprimir e traçar o caminho com o lápis, ou online para treinar com a pontinha do dedo na tela. Nos dois casos, a criança segue os corredores, evita as paredes e os becos sem saída, e procura a saída da entrada até o fim. As imagens de {N_PL} pontuam o trajeto e deixam a atividade mais viva. Em casa ou na escola, é uma atividade pronta para usar, sem material nenhum, brincando com {GEN_ART} {GEN}. Imprima-a para o caderno ou abra online: escolha o formato que mais combina com a sua criança. É grátis, para imprimir ou jogar online.`,

  `Neste labirinto, os becos sem saída fazem parte do jogo: se um corredor termina num beco, é só voltar atrás, sem estresse. Errar o caminho não tem nada de grave, tenta-se outra passagem e segue-se em frente. A criança percorre o caminho certo da entrada até a saída, o dedinho primeiro, depois o lápis. Encontrar imagens de {N_PL} pelo trajeto deixa o momento tranquilo e alegre, observando {GEN_ART} {GEN}. Sem cronômetro, sem pontuação: só o prazer de se orientar e de achar a saída. Essa pedagogia doce, sem pressão, combina muito bem com os pequenos da educação infantil. É grátis, para imprimir ou jogar online.`,

  `Para você, mãe, pai ou professor, este verdadeiro labirinto é uma ferramenta simples e tranquilizadora. Ele convida a criança a seguir os corredores, a evitar paredes e becos sem saída e a traçar o caminho certo da entrada até a saída. Você pode acompanhá-la com uma palavra ou deixá-la fazer sozinha. Lembre de propor o dedinho antes do lápis: encontrar o caminho primeiro evita muitas rasuras. As imagens de {N_PL} ao longo do trajeto oferecem lindos pontos de observação para compartilhar, brincando com {GEN_ART} {GEN}. É uma atividade da educação infantil fácil de encaixar no dia, grátis e sempre sem pressão, para repetir quantas vezes quiser. É grátis, para imprimir ou jogar online.`,

  `Da entrada até a saída, a criança atravessa um verdadeiro labirinto passo a passo. A consigna é clara: seguir os corredores, evitar as paredes e não se deixar enganar por um beco sem saída. Ela pousa o dedinho na entrada, explora o caminho certo e depois confirma com o lápis quando tem certeza. Pelo trajeto, encontra imagens de {N_PL} para observar, o que deixa o percurso vivo e agradável. Sair do labirinto pede olhar bem e antecipar cada curva, observando {GEN_ART} {GEN}. Esta folha de orientação espacial, pensada para a educação infantil, se refaz quantas vezes quiser, no próprio ritmo. É grátis, para imprimir ou jogar online.`,
];

const P2_MAZE = [
  `Este verdadeiro labirinto combina com os pequenos da educação infantil, em casa como na escola. A folha é grátis, para imprimir e traçar com o lápis ou para fazer online com a pontinha do dedo. A criança segue os corredores, evita paredes e becos sem saída e procura a saída da entrada até o fim, entre imagens de {N_PL}.`,

  `Pensada para os menores, esta atividade grátis se trabalha online ou para imprimir. Neste labirinto, paredes e becos sem saída deixam o trajeto mais cheio de curvas: a criança encontra o caminho certo e o segue até a saída, sem cronômetro nem pontuação, observando {GEN_ART} {GEN}.`,

  `Perfeita sozinha ou acompanhada, esta folha de labirinto está pronta para usar. Para imprimir no caderno ou abrir online, de graça, ela convida a criança a evitar os becos sem saída e a se orientar da entrada até a saída, entre imagens de {N_PL}. Do dedinho depois ao lápis, no próprio ritmo.`,

  `Para casa ou para a sala, eis um verdadeiro labirinto simples e grátis. A criança observa, contorna as paredes e os becos sem saída, e depois traça o caminho certo até a saída, brincando com {GEN_ART} {GEN}. Disponível para imprimir ou jogar online, do dedinho depois ao lápis.`,

  `Esta atividade grátis da educação infantil se faz com a pontinha do dedo online ou com o lápis na folha impressa. O princípio: seguir os corredores do labirinto, evitar os becos sem saída e achar a saída, com calma, da entrada até o fim, entre imagens de {N_PL}.`,

  `Ideal para treinar a se orientar, esta folha traz um labirinto com paredes e becos sem saída. Para imprimir ou online, de graça, a criança procura o caminho certo e o segue até a saída, no próprio ritmo e sem nenhuma pressão, observando {GEN_ART} {GEN}.`,

  `Adaptada aos pequenos da educação infantil, sozinha ou com você, esta folha grátis coloca a observação no coração da brincadeira. Evitar os becos sem saída, seguir o caminho certo até a saída: para imprimir e usar o lápis ou para fazer online com o dedinho, entre imagens de {N_PL}.`,
];

/* ───────────────────────── pathway: rare (1 deck) — reuse a classic-maze-style voice ───────────────────────── */
const SKEL_PATHWAY = [
  `Esta folha convida a criança a seguir uma trilha ilustrada da entrada até a saída, passo a passo. O caminho serpenteia entre as imagens de {N_PL}, e o pequeno o percorre com o dedinho, sem perder de vista por onde a trilha continua. É um trabalho tranquilo de orientação espacial: basta seguir o caminho aberto, sem becos sem saída a temer, só a alegria de chegar ao fim. Brincando com {GEN_ART} {GEN}, não há cronômetro nem pontuação. Quando o pequeno se sente seguro, repassa o trajeto com o lápis e o caminho vira um pequeno troféu. É grátis, para imprimir ou jogar online, no próprio ritmo da educação infantil.`,

  `Seguir o caminho da entrada até a saída é um exercício gostoso para as mãozinhas e o olhar atento. Nesta folha a criança encontra uma trilha clara que atravessa as imagens de {N_PL}, e a percorre passo a passo, primeiro com o dedinho, depois com o lápis. Esse gesto que acompanha o caminho prepara com doçura a escrita e afina a coordenação motora fina. Observando {GEN_ART} {GEN}, o pequeno mantém o prazer de descobrir, sem pressa e sem medo de errar. Cada trecho seguido com cuidado fortalece a sua confiança. É uma preparação gráfica tranquila, pensada para a educação infantil. É grátis, para imprimir ou jogar online.`,

  `Em casa ou num cantinho de atividades, esta trilha ilustrada encontra logo o seu lugar. A criança se acomoda com calma, observa as imagens de {N_PL} ao longo do caminho e segue o trajeto da entrada até a saída. Sozinha ou acompanhada, avança no próprio ritmo, passo a passo. Começa-se com o dedinho para encontrar por onde a trilha continua, depois retoma-se com o lápis para traçá-la, brincando com {GEN_ART} {GEN}. Seguir o caminho até a saída vira um pequeno encontro que tranquiliza, perfeito para a educação infantil e sempre sem pressão. É grátis, para imprimir ou jogar online.`,

  `"Siga o caminho até a saída!" A consigna logo lança a brincadeira. Aqui a criança acompanha uma trilha ilustrada que liga a entrada à saída, contornando as imagens de {N_PL} pelo percurso. O dedinho mostra o caminho primeiro, depois o lápis confirma o trajeto. Essa encenação alegre dá sentido ao gesto e torna a observação divertida. Brincando com {GEN_ART} {GEN}, o pequeno olha adiante e persiste até a saída, passo a passo. É um jeito bonito, na educação infantil, de trabalhar a orientação espacial sem nunca perder o prazer. É grátis, para imprimir ou jogar online.`,

  `Esta trilha ilustrada é totalmente grátis e se trabalha de dois jeitos: para imprimir e traçar o caminho com o lápis, ou online para treinar com a pontinha do dedo na tela. Nos dois casos, a criança segue o trajeto da entrada até a saída, sem perder a trilha de vista. As imagens de {N_PL} pontuam o caminho e deixam a atividade mais viva, brincando com {GEN_ART} {GEN}. Em casa ou na escola, é uma atividade pronta para usar, sem material nenhum. Imprima-a para o caderno ou abra online: escolha o formato que mais combina com a sua criança. É grátis, para imprimir ou jogar online.`,

  `Aqui se avança com tranquilidade: a criança segue o caminho passo a passo, da entrada até a saída, sem nenhuma pressa. Acompanhar a trilha ilustrada é também aprender a olhar adiante e a manter o trajeto. O pequeno segue o caminho com o dedinho primeiro, depois com o lápis. Encontrar imagens de {N_PL} pelo percurso deixa o momento tranquilo e alegre, observando {GEN_ART} {GEN}. Sem cronômetro, sem pontuação: só o prazer de se orientar e de chegar à saída. Essa pedagogia doce combina muito bem com os pequenos da educação infantil. É grátis, para imprimir ou jogar online.`,

  `Para você, mãe, pai ou professor, esta trilha ilustrada é uma ferramenta simples e tranquilizadora. Ela convida a criança a seguir o caminho da entrada até a saída, passo a passo, mantendo o olhar no trajeto. Você pode acompanhá-la com uma palavra ou deixá-la fazer sozinha. Lembre de propor o dedinho antes do lápis: encontrar o caminho primeiro evita muitas rasuras. As imagens de {N_PL} ao longo do trajeto oferecem lindos pontos de observação para compartilhar, brincando com {GEN_ART} {GEN}. É uma atividade da educação infantil fácil de encaixar no dia, grátis e sempre sem pressão. É grátis, para imprimir ou jogar online.`,

  `Da entrada até a saída, a criança acompanha uma trilha clara passo a passo. A consigna é simples: seguir o caminho sem perdê-lo de vista até chegar ao fim. Ela pousa o dedinho na entrada, percorre o trajeto e depois confirma com o lápis quando tem certeza. Pelo caminho, encontra imagens de {N_PL} para observar, o que deixa o percurso vivo e agradável, brincando com {GEN_ART} {GEN}. Chegar à saída pede olhar bem e seguir a trilha com calma. Esta folha de orientação espacial, pensada para a educação infantil, se refaz quantas vezes quiser. É grátis, para imprimir ou jogar online.`,
];

const P2_PATHWAY = [
  `Esta trilha ilustrada combina com os pequenos da educação infantil, em casa como na escola. A folha é grátis, para imprimir e traçar com o lápis ou para fazer online com a pontinha do dedo. A criança segue o caminho da entrada até a saída, passo a passo, entre imagens de {N_PL}.`,

  `Pensada para os menores, esta atividade grátis se trabalha online ou para imprimir. A criança acompanha uma trilha clara e a segue até a saída, sem becos sem saída a temer, sem cronômetro nem pontuação, observando {GEN_ART} {GEN}.`,

  `Perfeita sozinha ou acompanhada, esta folha de trilha está pronta para usar. Para imprimir no caderno ou abrir online, de graça, ela convida a criança a seguir o caminho da entrada até a saída, entre imagens de {N_PL}. Do dedinho depois ao lápis, no próprio ritmo.`,

  `Para casa ou para a sala, eis uma trilha ilustrada simples e grátis. A criança observa o caminho e o segue passo a passo até a saída, brincando com {GEN_ART} {GEN}. Disponível para imprimir ou jogar online, do dedinho depois ao lápis.`,

  `Esta atividade grátis da educação infantil se faz com a pontinha do dedo online ou com o lápis na folha impressa. O princípio: seguir a trilha, sem perdê-la de vista, e chegar à saída, com calma, da entrada até o fim, entre imagens de {N_PL}.`,

  `Ideal para treinar a se orientar, esta folha traz uma trilha ilustrada clara. Para imprimir ou online, de graça, a criança segue o caminho até a saída, no próprio ritmo e sem nenhuma pressão, observando {GEN_ART} {GEN}.`,

  `Adaptada aos pequenos da educação infantil, sozinha ou com você, esta folha grátis coloca a observação no coração da brincadeira. Seguir o caminho passo a passo até a saída: para imprimir e usar o lápis ou para fazer online com o dedinho, entre imagens de {N_PL}.`,
];

const H1 = {
  'choose-path': 'Labirinto: {H1} – para a educação infantil',
  'classic-maze': 'Labirinto: {H1} – para a educação infantil',
  'pathway': 'Labirinto: {H1} – para a educação infantil',
};
const CAR = {
  'choose-path': 'Labirinto – ',
  'classic-maze': 'Labirinto – ',
  'pathway': 'Labirinto – ',
};

module.exports = {
  type: 'picture-path',
  eyebrow: 'Atividade: Labirinto',
  strand: 'Orientação espacial',
  level: 'educacao-infantil',
  slotWord: 'labirinto',
  h1: (mk) => H1[mk] || H1['classic-maze'],
  carousel: (mk, themeH1) => (CAR[mk] || CAR['classic-maze']) + themeH1,
  modes: {
    'choose-path': { SKEL: SKEL_CHOOSE, P2: P2_CHOOSE },
    'classic-maze': { SKEL: SKEL_MAZE, P2: P2_MAZE },
    'pathway': { SKEL: SKEL_PATHWAY, P2: P2_PATHWAY },
  },
  P3: `Se a criança gostou de seguir os caminhos, pode continuar com outros labirintos parecidos, como {nb1} ou {nb2}. Cada novo destino torna a procura emocionante de novo e mantém em movimento a orientação espacial, enquanto o pequeno explora {GEN_ART} {GEN}. Cada folha pode ser impressa ou jogada online, como preferirem. Vivam juntos com tempos calmos, sem cronômetro e sem pontuação, só pelo prazer de procurar e encontrar o caminho da entrada até a saída. É grátis, para imprimir ou jogar online.`,
};
