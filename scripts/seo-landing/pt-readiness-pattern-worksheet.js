/* pt-readiness-pattern-worksheet — Brazilian-Portuguese prose config for the pattern-worksheet fan.
 * One mode 'null' (readiness, NO standard, level 'educacao-infantil'):
 *   a simple printable worksheet; each ROW shows a logical sequence that has already
 *   STARTED (the pictures follow a simple, regular order); the child reasons out the
 *   rhythm and CONTINUES / completes the row by filling the empty box with the picture
 *   that comes next. NO counting.
 *   This is the generic no-prep printable face — do NOT mention the named alternating
 *   pattern labels (Sequência AB / AAB / ABB) nor the "trem/trenzinho" framing (those
 *   belong to the named pattern-train type). Strand: Padrões e sequências.
 * OWNED lexicon: a sequência lógica / complete a sequência / a ordem lógica /
 *   a casa vazia / o quadradinho vazio / raciocine / o que falta. Free + printable +
 *   no-prep mentioned in moderation. Brazilian Portuguese register (educação infantil).
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Portuguese morphology):
 *   {N_PL} appears ONLY in "imagens de {N_PL}" / "com {N_PL}" slots; NO article before
 *   {N_PL}. "as coisas" = {GEN_ART} {GEN}; "de/em/a/por + collective" via
 *   {DE_GEN}/{EM_GEN}/{A_GEN}/{POR_GEN}. P3 cross-links via {nb1} / {nb2}. */
'use strict';

const SKEL_PW = [
  // 1 — skill-statement opening
  `Reconhecer uma ordem lógica e levá-la adiante: é esta a delicada habilidade que esta atividade da educação infantil coloca em jogo. Em cada linha já começou uma sequência feita de imagens de {N_PL} que se repetem numa ordem simples e regular. A criança observa, percebe o ritmo e completa a sequência preenchendo a casa vazia com a figura que vem depois. Não há nada para contar: basta olhar com atenção para a ordem lógica e raciocinar sobre o que falta. Justamente esse olhar e continuar é uma preciosa habilidade de base que prepara para a escola. Sem pressa, cada um trabalha no seu ritmo. Sugira que ele siga a linha com o dedinho e diga em voz alta as figuras que se repetem, assim o motivo salta aos olhos. Se errar a figura, troca com leveza e segue em frente. A folha é grátis, imprime num instante e não exige nenhum preparo: são pouquinhos minutos para a criança completar as linhas já iniciadas, com toda a tranquilidade, ao lado de um adulto paciente.`,

  // 2 — invitation opening
  `Venha continuar as sequências junto com a sua criança! Esta atividade da educação infantil mostra, linha após linha, uma sequência lógica feita de imagens de {N_PL} que se repetem num ritmo simples. Cada linha já está começada, e cabe à pequena levá-la adiante preenchendo o quadradinho vazio com a figura que vem depois. Observando como as imagens voltam, ela treina o olhar para perceber as regularidades, uma capacidade que na escola vai contar muitas vezes. Não se conta nada: olha-se a ordem lógica e completa-se a sequência. Não há nota nenhuma para tirar, só a curiosidade que guia o olhar. Convide-a a contar o que nota, a apontar as figuras que se repetem e a prever qual vem agora. Se tentar uma figura que não respeita a ordem, sorriam juntos e tenta de novo. Cada sequência completada é uma conquista que enche a criança de orgulho. A folha é grátis e pronta para imprimir, sem nenhum preparo: vivam como um sereno momento de descoberta para compartilhar, uma linha de cada vez.`,

  // 3 — question opening
  `Que figura vem depois? É a pergunta que faz a criança sorrir diante desta atividade da educação infantil. Em cada linha uma sequência lógica já partiu: as imagens de {N_PL} se repetem seguindo uma ordem fácil de perceber. A pequena olha com atenção, raciocina sobre o motivo e continua a sequência com a figura certa na casa vazia. Aqui não se conta, apenas se observa: como a ordem volta, qual imagem chega agora. Esse reconhecer as regularidades diverte e prepara com doçura para a escola, onde olhar com cuidado conta muito. Nenhum cronômetro marca o tempo: avança-se com tranquilidade. Acompanhe com perguntas leves — que figuras você vê se repetindo, o que deveria vir agora — e dê espaço para ela pensar. Se mudar de ideia, pode escolher de novo e seguir serena. Completar a sequência fortalece a atenção e a confiança em si. É uma folha grátis e imediata para imprimir, um convite simples a ficar pertinho e saborear juntos a alegria de uma linha levada até o fim.`,

  // 4 — metaphor opening
  `Imagine uma musiquinha feita de figuras em vez de notas: volta sempre igual, com o mesmo ritmo. É assim que se comporta a sequência desta atividade da educação infantil. Olhando para {GEN_ART} {GEN}, a criança descobre que em cada linha uma ordem lógica se repete de modo regular, e que cabe a ela continuá-la. A tarefa é doce: reconhecer a melodia das imagens e completar a sequência com a figura que vem depois, na casa vazia. Concentrando-se no ritmo, a pequena treina o olhar para perceber as regularidades, sem contar nada. Não há disputa nenhuma, só o prazer de observar. Convide-a a cantarolar em voz alta as figuras que voltam, assim o motivo fica mais claro. Se errar a continuação, sem susto: corrige-se com um sorriso. Cada sequência completada é uma pequena conquista. A folha é grátis e fica pronta num instante para imprimir, perfeita para um momento sereno vivido lado a lado, sem nenhuma pressão por cima.`,

  // 5 — reassurance-first opening
  `Aqui não há nada a temer: olha-se uma ordem lógica e leva-se adiante, com calma e com prazer. Nesta atividade da educação infantil, cada linha mostra uma sequência já iniciada, feita de imagens de {N_PL} que se repetem num ritmo simples. A criança observa o motivo, percebe a regularidade e completa a sequência com a figura certa na casa vazia. Não precisa contar nada, basta raciocinar sobre como a ordem volta. Esse olhar atento é uma verdadeira habilidade de base, porque treina os olhos a perceber as regularidades, útil mais adiante na leitura e na escrita. Sem disputa nem nota, só o olhar curioso e a vontade de tentar. Estimule-a a seguir a linha com o dedinho e a apontar as figuras que se repetem, assim a continuação fica clara. Se mudar de ideia, pode corrigir com tranquilidade. A folha é grátis e imprime na hora, sem preparo: completar as sequências é uma conquista que faz bem à confiança, para saborear juntos com tempos suaves.`,

  // 6 — gentle-scene opening
  `Imagine uma fileira de figuras que se sucedem sempre na mesma ordem: assim que você vê algumas, adivinha o que chega depois. Esta atividade da educação infantil funciona assim, com motivos de figuras. Em cada linha as imagens de {N_PL} se repetem num ritmo simples, e a criança continua a sequência preenchendo a casa vazia com a figura que falta. Tudo está em olhar como a ordem lógica volta e em prosseguir, uma calma habilidade que na escola vai contar logo. Aqui não se conta nada, apenas se raciocina sobre o motivo. As linhas já estão começadas de propósito, para a pequena só precisar levá-las até o fim. Convide-a a ler a fileira em voz alta, figura por figura, até perceber qual vem agora. Diante de um erro, basta um sorriso e uma nova tentativa. É uma folha grátis e imediata para imprimir: quando completa a sequência, a segurança da criança cresce um pouquinho, num clima sempre sereno e afetuoso.`,

  // 7 — no-prep / parent-pragmatic opening
  `Procura algo simples e pronto para usar num momento tranquilo? Esta folha grátis de sequências é justamente o que serve para vocês: imprime na hora e não exige nenhum preparo. Mostra, linha após linha, uma ordem lógica de imagens de {N_PL} que se repetem num ritmo fácil. Cada linha já está começada, e a criança completa a sequência preenchendo o quadradinho vazio com a figura que vem depois. Não há nada para contar: olha-se como a ordem volta e raciocina-se sobre o que falta. Esse reconhecer as regularidades é uma preciosa habilidade de base para a aprendizagem futura. Sem cronômetro, sem nota, só o gosto de observar. Acompanhe com perguntas leves e deixe-a trabalhar no próprio passo. Se uma figura não respeita o ritmo, ela escolhe outra com serenidade. Dá para imprimir ou jogar online, como for mais cômodo: em poucos minutos a pequena tem uma bela ocupação calma e cheia de sentido, para viver juntos com doçura.`,

  // 8 — classic-worksheet opening
  `Um clássico entre as folhas para completar, sempre querido e sempre útil: aqui está esta atividade de sequências para a educação infantil. Em cada linha uma ordem lógica já foi iniciada, com imagens de {N_PL} que se repetem numa ordem regular. A criança olha, raciocina sobre o princípio e leva a sequência adiante até o fim, preenchendo a casa vazia com a figura que vem depois. Não precisam de números nem de contagem: conta só o olhar atento e o prosseguir. Essa capacidade de perceber as regularidades fortalece a concentração, uma bela preparação para a escola. Nenhuma pressa marca o trabalho: avança-se com calma. Estimule-a a seguir a linha com o dedinho, a nomear as figuras que voltam e a adivinhar qual chega agora. Se errar uma casa, troca com leveza e recomeça. A folha é grátis e imprime num instante: completar as sequências vira um momento precioso de observação, para saborear juntos com tempos folgados e muita gentileza.`,
];

const P2_PW = [
  // 1 — skill-statement
  `Em cada linha uma sequência lógica já começou: as imagens se repetem num ritmo simples e a criança completa a sequência com a figura que vem depois, na casa vazia. Ela percebe a ordem olhando, sem contar nada, e leva a linha adiante. Esse reconhecer as regularidades é uma preciosa habilidade de base; a folha é grátis e pronta para imprimir, para saborear no próprio ritmo, sem pressa e sem nota.`,

  // 2 — question
  `Que figura vem depois? É dessa pergunta que parte a brincadeira. Olhando as imagens de {N_PL}, a pequena raciocina sobre o ritmo da ordem lógica em cada linha e continua a sequência com a figura certa no quadradinho vazio. É um tranquilo exercício de atenção, nunca de contagem, para saborear juntos com palavras gentis e todo o tempo que precisar; se uma figura não respeita o motivo, tenta-se outra com um sorriso.`,

  // 3 — invitation/parent-tip
  `Continue a sequência junto com a sua criança: em cada linha uma ordem lógica se repete, e ela preenche a casa vazia com a figura que falta. Sugira que siga a linha com o dedinho e nomeie em voz alta as imagens que voltam, assim percebe qual vem agora. Sem disputa e sem cronômetro, só o olhar curioso e a alegria de uma linha completada. A folha é grátis e imprime num instante.`,

  // 4 — reassurance
  `Nesta página a pequena encontra linhas de sequências já iniciadas com {N_PL}. Com calma ela raciocina sobre como a ordem volta e completa cada linha, treinando o olhar para perceber as regularidades e a paciência. É um doce momento de observação, perfeito para viver lado a lado: deixe-a trabalhar no seu ritmo, comemorem cada linha levada até o fim e prossigam sem nenhuma pressão.`,

  // 5 — metaphor
  `Como uma musiquinha feita de figuras, a sequência volta sempre igual. Olhando para {GEN_ART} {GEN}, a criança percebe a melodia do motivo e continua cada linha com a figura que vem depois. Sem tempos a bater e sem nota, conta só a alegria de olhar e completar; quando a linha termina, a confiança em si cresce um pouquinho, com toda a serenidade.`,

  // 6 — no-prep/pragmatic
  `Esta folha grátis de sequências está pronta para usar: imprime na hora, sem nenhum preparo. Mostra linhas de imagens de {N_PL} que se repetem num ritmo fácil, e a criança as leva adiante preenchendo o quadradinho vazio com a figura certa. Não se conta nada, apenas se raciocina. Acompanhe com perguntas leves e deixe-a avançar com calma; em poucos minutos tem uma bela ocupação tranquila e cheia de sentido.`,

  // 7 — classic/celebration
  `Uma clássica folha para completar, simples e sempre útil: em cada linha uma sequência lógica com {N_PL} espera para ser continuada. A criança raciocina sobre o ritmo e preenche a casa vazia com a figura que vem depois, até o fim. Elogie o empenho e não a velocidade, assim continuar as sequências fica um prazer: um jogo de olhares, nunca de números, e cada linha completada é uma pequena conquista para saborear com doçura.`,
];

module.exports = {
  type: 'pattern-worksheet',
  eyebrow: 'Atividade: Sequências lógicas',
  strand: 'Padrões e sequências',
  level: 'educacao-infantil',
  slotWord: 'sequências',
  h1: (mk) => 'Sequências lógicas: {H1} – para a educação infantil',
  carousel: (mk, themeH1) => 'Sequências lógicas – ' + themeH1,
  modes: {
    'null': { SKEL: SKEL_PW, P2: P2_PW },
  },
  P3: `Se a criança gostou de raciocinar e continuar as sequências, pode seguir com outras atividades vizinhas, como {nb1} ou {nb2}. São jogos tranquilos de observação, perfeitos para treinar o olhar nas regularidades enquanto explora {GEN_ART} {GEN}. Cada atividade dá para imprimir ou jogar online, como preferirem. Vivam juntos com tempos folgados, sem cronômetro e sem nota, só pelo prazer de olhar qual figura vem depois e levar a linha até o fim.`,
};
