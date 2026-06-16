/* pt-readiness-shadow-match — Brazilian Portuguese (pt-BR) prose config for the
 * shadow-match fan. Two modes (readiness, NO standard, level 'educacao-infantil'):
 *   'find-shadow' — colored images of {N_PL} on one side, their black silhouettes
 *      shuffled on the other; the child matches each picture to its SHADOW by the
 *      OUTLINE only (no color, no counting). Strand: Discriminação visual.
 *      OWNS: a sombra / a silhueta / o contorno / ligue cada imagem à sua sombra.
 *   'make-whole' — each picture is missing its other HALF; the child finds the half
 *      that completes the image (visual part-whole, no counting). Strand: Percepção
 *      visual. OWNS: complete a imagem / a metade que falta / a parte que falta /
 *      a imagem inteira.
 *
 * FENCE-A (load-bearing — the "completar" split): make-whole completes A IMAGEM /
 * A METADE and must NEVER use quebra-cabeça / peça / pedaço (those belong to
 * missing-pieces). find-shadow must NEVER use quebra-cabeça / peça either, and the
 * two modes share NO sentence scaffold: find-shadow lives entirely in the
 * shadow-world (sombra / silhueta / contorno, NEVER "metade"); make-whole lives in
 * the complete-the-half-world (metade / completar a imagem, NEVER "sombra/silhueta").
 *
 * pt PLACEHOLDER discipline (pt-render.js is PURE SUBSTITUTION — no morphology):
 *   {N_PL} appears ONLY in "imagens de {N_PL}" / "com {N_PL}" slots (NO article
 *     before it); "as coisas/figuras" collective = {GEN_ART} {GEN}; prep+article
 *     contractions via {DE_GEN}/{EM_GEN}/{A_GEN}/{POR_GEN}; P3 neighbours {nb1}/{nb2}. */
'use strict';

const SKEL_FS = [
  `«De quem é esta sombra?» É a pergunta que abre a brincadeira para a criança da educação infantil. De um lado da folha estão imagens coloridas de {N_PL}, do outro as mesmas figuras viraram silhuetas pretas, todas embaralhadas. A criança olha com atenção e liga cada imagem à sua sombra certa, sem contar nada, apenas reconhecendo a forma. Para acertar a silhueta é preciso comparar o contorno: onde a forma é arredondada, onde é pontuda. Esse olhar no lugar de contar é uma habilidade preciosa que prepara para a escola. Sem pressa, aqui se brinca no próprio ritmo. Sugira que ela siga com o dedinho a borda da sombra e a compare, uma por uma, com as figuras coloridas. Se escolher uma sombra que não combina, sorriam juntos e tenta-se de novo, com leveza. Quando imagem e sombra se reencontram, a alegria vem sozinha. Vivida ao lado de um adulto paciente, com palavras carinhosas e nenhuma corrida, a atividade vira um momento quentinho de brincar a dois.`,

  `Imagine um teatro de sombras: cada figura projeta a sua silhueta preta na parede. É a sensação que recebe a criança nesta folha, onde ela vê {GEN_ART} {GEN} ao lado das suas sombras, espalhadas sem ordem. A tarefa que a espera é gostosa, reconhecer a qual imagem colorida pertence cada silhueta e uni-las com um risquinho. Concentrando-se nos contornos, a criança treina a discriminação visual e aprende a olhar a forma em vez da cor. Não há nota nenhuma para tirar, só a curiosidade que guia o olhar. Convide-a a descrever em voz alta o que vê, a apontar as partes redondas e as pontas de cada silhueta. Se tentar uma ligação que não casa, calma: troca-se e tenta-se outra vez. Cada par reencontrado é uma pequena conquista que a enche de orgulho. Num clima sereno e paciente, esta atividade vira uma ocasião afetuosa de observar com calma e crescer junto, uma sombra depois da outra, sem nenhuma pressão.`,

  `Olhe bem a forma! Nesta folha pensada para a educação infantil, as figuras coloridas esperam reencontrar as suas sombras pretas. De um lado a criança vê imagens de {N_PL}, do outro as silhuetas escuras e embaralhadas. Cada sombra mostra só o contorno, nenhum detalhe e nenhuma cor. Assim, a criança precisa reconhecer, apenas pela silhueta, qual escura pertence a qual imagem. Esse exercício treina o olhar com precisão, uma habilidade de base tranquila que na escola será útil para reconhecer a forma das letrinhas. Nenhum cronômetro marca o tempo: anda-se com calma. Acompanhe com perguntas leves, onde a sombra é redonda, onde é pontuda, e deixe espaço para ela pensar. Se mudar de ideia, pode escolher de novo e seguir sereno. Encontrar a silhueta certa fortalece a atenção e a confiança em si. É um convite simples para ficar pertinho, cultivar o olhar curioso da criança e saborear juntos a alegria de uma forma reconhecida.`,

  `Qual sombra pertence a qual imagem? Para a criança é logo um pequeno enigma para resolver com os olhos. Observando {GEN_ART} {GEN} coloridas, ela procura ao lado a silhueta preta que corresponde a cada figura. Aqui não se trata de contar, mas de reconhecer: pela forma, pelas curvas e pelas pontas da silhueta, a criança encontra o contorno escuro certo. Ligar imagem e sombra diverte e fortalece a discriminação visual, um preparo sereno para a escola. As silhuetas estão embaralhadas de propósito, para que a brincadeira esteja toda na comparação atenta. Estimule-a a passar o dedo pela borda da sombra e a procurar a figura que tem o mesmo perfil. Mesmo um erro é um passo à frente: tenta-se de novo com um sorriso. Quando o par certo se forma, a concentração da criança fica mais firme. Vivida ao lado de uma voz doce e com tempos calmos, a folha vira um momento quentinho em que se aprende olhando, sem nenhuma corrida.`,

  `De um lado brilham as figuras coloridas, do outro as suas sombras pretas, bem embaralhadas: eis a folha que espera a criança da educação infantil. Olhando as imagens de {N_PL}, a criança estuda cada silhueta escura e a liga à figura a que pertence. Não é preciso contar, basta observar com atenção: o contorno coincide? A forma é a mesma? Esse olhar em vez de contar é uma habilidade de base muito útil, e deixa as crianças seguras para observar com precisão. As sombras ficam em desordem justamente para convidar à comparação. Incentive-a a seguir com o dedinho o perfil de cada silhueta e a compará-lo com as figuras disponíveis. Se uma sombra não corresponde, ela tenta outra com serenidade, sem pressa. Cada ligação certa é uma alegriazinha para comemorar. Num clima quente e paciente, a atividade se transforma num doce momento de descoberta para viver lado a lado, com muito carinho.`,

  `Reconhecer a forma em vez de contar: eis o desafio afetuoso desta folha da educação infantil. Na página, a criança encontra, de um lado, imagens coloridas de {N_PL} e, do outro, as suas sombras pretas embaralhadas. Com calma ela observa cada figura e procura, entre as silhuetas escuras, aquela que corresponde pelo perfil. É um treino gentil para os olhos: para escolher bem, ela precisa olhar com cuidado as curvas e as pontas de cada silhueta. Sem tempos para bater, vale o prazer de observar. Apoie-a com perguntas carinhosas e deixe-a explorar a página no seu próprio passo. Se não encontrar logo o par certo, tenta de novo com tranquilidade, sem que ninguém a apresse. Cada sombra ligada no ponto certo fortalece a discriminação visual e a confiança em si mesma. Vivida a quatro mãos, com tempos calmos e palavras gentis, esta atividade vira um momento precioso em que a criança aprende observando e comparando, um passinho de cada vez.`,

  `Uma brincadeira de luz e sombra: esta folha da educação infantil coloca diante da criança as figuras coloridas e as suas silhuetas pretas, espalhadas aqui e ali. Observando {GEN_ART} {GEN}, a criança liga cada imagem à sua sombra olhando apenas a forma. Encontrar o contorno certo treina os olhos e a atenção, uma habilidade que na escola vai contar quando for distinguir letrinhas e formas parecidas entre si. E o mais bonito é que aqui só se trata de olhar, não de contar. As silhuetas escuras estão embaralhadas de propósito, para que a busca continue sendo uma pequena aventura. Convide-a a apontar a sombra, a comparar o seu perfil com as figuras coloridas e a explicar por que escolheu uma. Diante de um erro, basta um sorriso e uma nova tentativa. Quando imagem e sombra casam, a segurança da criança cresce um pouquinho, num clima sempre sereno e afetuoso.`,

  `Cada figura projeta a sua sombra. Nesta folha para a educação infantil, a criança encontra imagens coloridas de {N_PL} ao lado das suas silhuetas escuras, para reunir em pares. Ela reconhece, seguindo a linha do contorno, qual sombra pertence a cada figura e as une com um traço. Essa concentração tranquila na forma é uma verdadeira habilidade de base: fortalece o olhar com precisão, que à criança será útil mais adiante no escrever e no ler. Não há disputa nem nota, só o olhar atento e a vontade de tentar. Estimule-a a seguir com o dedinho o perfil de cada silhueta, a compará-lo com as figuras disponíveis e a contar o que percebe. Se uma sombra não serve, ela pega outra com calma e recomeça. Encontrar o par certo é uma conquista que faz bem à confiança. Num clima gentil e calmo, a atividade vira um momento precioso de observação e descoberta, para saborear juntos com tempos macios.`,
];

const P2_FS = [
  `Como num teatro de sombras, cada figura tem a sua silhueta preta. A criança a reconhece pelo perfil e a liga à imagem colorida certa, seguindo com o dedinho o contorno da silhueta. Afina a discriminação visual no próprio ritmo, sem pressa e sem nota, só pelo gosto de ver imagem e sombra se reencontrarem.`,

  `«De quem é esta sombra?» Dessa pergunta parte a brincadeira. Observando {GEN_ART} {GEN}, a criança encontra entre as silhuetas escuras aquela que corresponde a cada figura colorida. É um exercício tranquilo de atenção à forma, para saborear junto com palavras gentis e todo o tempo que precisar; se uma sombra não serve, tenta-se outra com um sorriso.`,

  `Olhe bem a forma e não a cor: ligando as imagens de {N_PL} às suas sombras pretas, a criança aprende a reconhecer o que conta de verdade, o contorno. Sem disputa e sem cronômetro, só o olhar curioso e a alegria de um par reencontrado. Sugira que ela siga com o dedinho o perfil de cada silhueta e procure a figura com a mesma borda.`,

  `Nesta folha a criança encontra figuras coloridas e sombras escuras embaralhadas. Observando {GEN_ART} {GEN}, ela escolhe para cada imagem a silhueta que lhe corresponde, treinando a discriminação visual e a paciência. É um doce momento de observação, perfeito para viver lado a lado: deixe-a tentar no seu ritmo, comemorem cada par reencontrado e sigam sem nenhuma pressão.`,

  `Reconhecer o contorno: às figuras coloridas correspondem sombras pretas para reencontrar. A criança olha com cuidado as curvas e as pontas de cada silhueta e a une à imagem certa, exercitando o olhar no lugar do contar. Sem tempos para bater e sem nota, vale só a alegria de tentar; quando sombra e figura casam, a confiança em si cresce um pouquinho.`,

  `Esta brincadeira convida a criança a ligar as imagens de {N_PL} às suas silhuetas escuras. Com serenidade ela encontra, entre as sombras embaralhadas, aquela que corresponde a cada figura pelo perfil. É um momento quentinho de concentração e descoberta, para compartilhar com doçura: acompanhe com perguntas leves, dê espaço para pensar e incentive cada tentativa, mesmo quando ela precisa trocar de escolha.`,

  `Uma brincadeira de luz e sombra: a criança compara as figuras coloridas com as suas silhuetas pretas e reencontra cada par olhando só a forma. Exercita a discriminação visual com calma, no passo que prefere, sem nenhuma pressão; cada ligação certa é uma pequena conquista que a enche de orgulho e de vontade de continuar observando.`,
];

const SKEL_MW = [
  `Uma imagem pela metade espera ficar inteira: é o coração desta folha da educação infantil. Na página, cada imagem de {N_PL} está cortada ao meio e as duas partes estão embaralhadas. A criança junta cada figura procurando, para cada metade, a outra metade que a completa. Enquanto faz isso, olha com atenção onde a linha continua e qual forma se reencontra com qual. Completar as figuras é uma habilidade de base gostosa que treina a percepção do espaço, sem precisar contar nada. Sem pressa, aqui se brinca no próprio ritmo. Sugira que ela siga com o dedinho a borda do corte e que imagine como ficaria a figura inteira. Se tentar uma metade que não serve, larga e pega outra, com leveza. Quando as duas partes casam, a imagem volta a ficar completa e o sorriso vem sozinho. Vivida ao lado de um adulto paciente, com palavras carinhosas e nenhuma corrida, vira um momento quentinho de brincar a dois.`,

  `Meias figuras querem virar inteiras: eis o convite que espera a criança nesta folha. Olhando {GEN_ART} {GEN}, ela descobre que cada imagem está dividida em duas e que cabe a ela montar de novo. A tarefa é gostosa, achar para cada primeira metade a outra parte que lhe corresponde, até a figura ficar completa outra vez. Observando onde as cores e as linhas continuam, a criança treina a percepção visual e a imaginação, porque precisa imaginar o todo partindo de uma parte só. Não há nota nenhuma para tirar, só a curiosidade que guia o olhar. Convide-a a contar o que vê, a apontar a borda do corte e a comparar em voz alta as duas partes. Se tentar uma junção que não casa, sorriam juntos e tenta-se de novo. Cada figura completada é uma conquista que a enche de orgulho. Num clima sereno e paciente, a atividade vira uma ocasião afetuosa de crescer junto, uma metade depois da outra, sem nenhuma pressão.`,

  `Junte de novo as imagens! Nesta folha da educação infantil, as figuras de {N_PL} estão cortadas ao meio e bem embaralhadas. A criança encontra, para cada metade, a outra parte certa, para que a imagem volte a ficar inteira. Enquanto faz isso, ela se pergunta quais partes pertencem à mesma figura e onde a borda do corte se reencontra. Unir as meias imagens fortalece o pensamento espacial e a atenção, um belo preparo para a escola, em que o olhar conta mais do que contar. Nenhum cronômetro marca o tempo: anda-se com calma. Acompanhe com perguntas leves, como seria a imagem inteira, qual metade completa esta outra, e deixe espaço para ela pensar. Se mudar de ideia, pode escolher de novo e seguir sereno. Conseguir completar a figura fortalece a concentração e a confiança em si. É um convite simples para ficar pertinho e saborear juntos a satisfação de uma imagem enfim inteira.`,

  `Quais duas metades ficam juntas? Para a criança é logo uma brincadeirinha para resolver com os olhos. Observando as imagens de {N_PL}, cada uma dividida em duas, ela procura para cada meia figura a parte que a completa. Unindo as partes num conjunto, cada imagem renasce diante dos seus olhos. Aqui não se trata de contar, mas de reconhecer: onde a forma continua, qual outra metade deixa a figura inteira. Esse exercício diverte e treina, quase brincando, o olhar preciso e a percepção do espaço. As metades estão embaralhadas de propósito, para que a busca continue sendo uma pequena aventura. Estimule-a a seguir com o dedinho a linha do corte e a imaginar o conjunto. Mesmo um erro é um passo à frente: tenta-se de novo com um sorriso. Quando a imagem volta a ficar completa, a concentração da criança fica mais firme. Vivida ao lado de uma voz doce e com tempos calmos, a folha vira um momento quentinho em que se aprende olhando.`,

  `De um lado esperam as primeiras metades das figuras, do outro as suas partes correspondentes, bem embaralhadas: eis a folha que recebe a criança da educação infantil. Olhando as imagens de {N_PL}, a criança remonta cada figura unindo metade e metade. Observa com cuidado onde as linhas e as cores de uma parte continuam na outra. Esse completar tranquilo é uma habilidade de base preciosa: exercita o olhar em vez de contar e nutre a ideia de que as partes, unidas, formam um conjunto. As metades estão em desordem justamente para convidar à comparação atenta. Incentive-a a seguir com o dedinho a borda do corte e a procurar a parte que ali se reencontra. Se uma metade não casa, ela tenta outra com serenidade, sem pressa. Cada imagem completada é uma alegriazinha para comemorar. Num clima quente e paciente, a atividade se transforma num doce momento de descoberta para viver lado a lado, com muito carinho.`,

  `De duas se faz uma: esta folha da educação infantil convida a criança a unir as duas metades de cada figura, entre {GEN_ART} {GEN}, numa imagem inteira. Cada meia figura tem uma só parte que lhe corresponde, a outra metade certa. A criança compara as bordas do corte, segue o caminho da forma e então reúne as partes. Assim treina com calma o olhar preciso e o pensamento espacial, uma habilidade de base que cresce sem precisar de números. Sem tempos para bater, vale o prazer de observar. Apoie-a com perguntas carinhosas e deixe-a explorar a página no próprio passo. Se as metades não se encontram logo, tenta de novo com tranquilidade, sem que ninguém a apresse. Cada figura remontada fortalece a percepção visual e a confiança em si mesma. Vivida a quatro mãos, com tempos calmos e palavras gentis, esta atividade vira um momento precioso em que a criança aprende unindo e completando, um passinho de cada vez.`,

  `Duas partes que se pertencem: nesta folha pensada para a educação infantil, as imagens de {N_PL} estão cortadas ao meio e embaralhadas. A criança procura, para cada metade, a parte correspondente e completa assim uma imagem depois da outra. Achar a outra metade treina os olhos e a imaginação, uma habilidade de base que na escola vai ser útil para reconhecer as formas. E o mais bonito é que aqui só se trata de olhar e unir, nunca de contar. As metades estão em desordem, para que a busca continue sendo uma pequena aventura tranquila. Convide-a a seguir a linha do corte com o dedinho, a imaginar a figura inteira e a explicar por que duas partes vão juntas. Diante de um erro, basta um sorriso e uma nova tentativa. Quando a imagem se remonta, a segurança da criança cresce um pouquinho, num clima sempre sereno e afetuoso.`,

  `Cada figura nasce de duas partes que se pertencem. Nesta folha da educação infantil as imagens de {N_PL} estão divididas ao meio, e a criança as junta de novo uma a uma, até deixá-las completas. Ela reconhece, pelo caminho da forma, qual outra metade casa e une as duas partes com cuidado. Essa concentração tranquila no completar é uma verdadeira habilidade de base: fortalece a percepção do espaço, que à criança será útil mais adiante no escrever e no reconhecer as letrinhas. Não há disputa nem nota, só o olhar atento e a vontade de tentar. Estimule-a a seguir com o dedinho a borda do corte, a imaginar o conjunto e a contar o que percebe. Se uma metade não serve, ela pega outra com calma e recomeça. Completar a figura é uma conquista que faz bem à confiança. Num clima gentil e calmo, a atividade vira um momento precioso de observação, para saborear juntos com tempos macios.`,
];

const P2_MW = [
  `Meias figuras esperam virar inteiras: a criança olha uma primeira metade, imagina a imagem completa e procura ao lado a parte que a fecha. Segue com o dedinho a borda do corte e une as partes, treinando a percepção do espaço no próprio ritmo, sem pressa e sem nota, só pela alegria de ver a figura voltar a ficar inteira.`,

  `Quais duas metades ficam juntas? Dessa pergunta parte a brincadeira. Observando {GEN_ART} {GEN}, a criança acha para cada meia figura a parte que a completa, olhando onde a forma continua. É um exercício tranquilo de atenção, para saborear junto com palavras gentis e todo o tempo que precisar; se uma metade não casa, tenta-se outra com um sorriso.`,

  `Junte de novo as imagens de {N_PL}: a criança procura com calma a outra metade de cada figura e a reúne até deixá-la inteira. Sem disputa e sem cronômetro, só o olhar curioso e a satisfação de uma imagem completa. Sugira que ela siga com o dedinho a linha do corte e imagine como ficaria a figura unida.`,

  `Nesta folha a criança encontra figuras cortadas ao meio e embaralhadas. Observando {GEN_ART} {GEN}, ela escolhe para cada metade a parte que a remonta, treinando o pensamento espacial e a paciência. É um doce momento de observação, perfeito para viver lado a lado: deixe-a tentar no seu ritmo, comemorem cada figura que volta a ficar inteira e sigam sem nenhuma pressão.`,

  `De duas se faz uma: a cada imagem falta a sua outra metade. A criança olha com cuidado onde a forma e as cores continuam e une as duas partes certas, exercitando o olhar no lugar do contar. Sem tempos para bater e sem nota, vale só a alegria de tentar; quando as metades casam, a imagem se completa e a confiança em si cresce um pouquinho.`,

  `Esta brincadeira convida a criança a remontar as imagens de {N_PL} unindo as suas duas metades. Com serenidade ela encontra, entre as partes embaralhadas, aquela que se reencontra e deixa cada figura inteira. É um momento quentinho de concentração e descoberta, para compartilhar com doçura: acompanhe com perguntas leves e deixe-a imaginar com calma como ficará a imagem completa.`,

  `A cada figura falta a metade que a completa. A criança explora a página e reúne, com cuidado, as duas partes que se pertencem. Exercita a percepção visual com calma, no passo que prefere, sem nenhuma pressão; cada imagem remontada é uma pequena conquista que a enche de orgulho e de vontade de continuar.`,
];

const H1 = {
  'find-shadow': 'As sombras: {H1} – para a educação infantil',
  'make-whole': 'Complete a figura: {H1} – para a educação infantil',
};
const CAR = {
  'find-shadow': 'As sombras – ',
  'make-whole': 'Complete a figura – ',
};

module.exports = {
  type: 'shadow-match',
  eyebrow: 'Atividade: As sombras',
  strand: (mk) => (mk === 'make-whole' ? 'Percepção visual' : 'Discriminação visual'),
  level: 'educacao-infantil',
  slotWord: 'sombras',
  h1: (mk) => H1[mk] || H1['find-shadow'],
  carousel: (mk, themeH1) => (CAR[mk] || '') + themeH1,
  modes: {
    'find-shadow': { SKEL: SKEL_FS, P2: P2_FS },
    'make-whole': { SKEL: SKEL_MW, P2: P2_MW },
  },
  P3: `Se a criança gostou de olhar as formas, pode continuar com outras folhas pertinho, como {nb1} ou {nb2}. São brincadeiras tranquilas de observação, perfeitas para afinar a percepção visual enquanto explora {GEN_ART} {GEN}. Cada folha é grátis e dá para imprimir ou jogar online, como vocês preferirem. Vivam-na juntos com tempos calmos, sem cronômetro e sem nota, só pelo prazer de olhar e descobrir.`,
};
