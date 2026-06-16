'use strict';

/* pt-readiness config: CAÇA-PALAVRAS — 1º ano (anos iniciais) — atividades imprimíveis.
 * STANDARD-BEARING (RF.K.3.c; consciência fonológica). Português do Brasil (pt-BR).
 *
 * A ATIVIDADE (caça-palavras): uma GRADE de letras esconde palavras; cada palavra está
 * ligada a uma IMAGEM de {N_PL}. A criança PROCURA na grade, ENCONTRA cada palavra
 * escondida e a CIRCULA. Modo único (null).
 *
 * A CERCA (LOAD-BEARING): este config é DONO do quadro do caça-palavras. O corpo conduz
 * sempre por: o caça-palavras / a grade de letras / encontre / procure / circule a
 * palavra / a palavra escondida / espremida no meio das letras. É TERMINANTEMENTE
 * PROIBIDO usar: « palavras cruzadas » (é outra atividade, o crossword) e « sopa de
 * letras » (calque do espanhol — em pt se diz CAÇA-PALAVRAS). CAÇA-PALAVRAS e o achar
 * de palavras escondidas ficam sempre no centro.
 * Português do Brasil; nada de calque es/it. Tom 1º ano, sem vergonha, sem cronômetro,
 * sem nota. Palavras curtas ligadas a imagens. [NSR-FLAG][pt] */

const SKEL = [
  `Neste caça-palavras, seu filho vira caçador de palavras: numa grade cheia de letras se escondem palavras como {N_PL}, cada uma ligada a uma imagem ali do lado. A criança olha a figura, descobre que palavra procurar e então passa o olhar pela grade até achar a palavra escondida e circulá-la. Espremida no meio das letras, cada palavra espera quietinha — e é exatamente isso que torna a caça gostosa. Para o 1º ano, é uma atividade bonita, porque a criança liga o som da imagem às letras e percebe que as palavras se escrevem com letras numa ordem certa. Sem pressa nenhuma: cada palavra pode levar o tempo que precisar, sem cronômetro e sem nota. A cada rodada, seu filho encontra mais uma palavra na grade e a circula com alegria. É grátis para imprimir, em casa ou na escola.`,
  `Onde estará a próxima palavra? É essa a pergunta que move este caça-palavras do começo ao fim. A grade está cheia de letras, e no meio delas se escondem palavras ligadas a imagens de {N_PL}. Seu filho olha cada figura, pensa na palavra e procura na grade, letra por letra, até encontrá-la e circular. Achar uma palavra espremida entre tantas letras exige olhar com atenção e reconhecer as letras pela ordem — bem o que uma criança de 1º ano está aprendendo. Aponte com o dedo junto, soletre a palavra em voz alta, e veja o clique chegar quando a palavra escondida aparece. Tudo com calma, sem pressão e no ritmo da criança. De novo e de novo, seu filho procura, encontra e circula a palavra na grade de letras. A folha é grátis e se imprime num instante.`,
  `Cada imagem deste caça-palavras dá uma pista: a figura de {N_PL} mostra qual palavra seu filho precisa achar escondida na grade de letras. A criança liga a imagem ao seu nome, procura essa palavra entre as letras e a circula quando encontra. Esse vaivém entre a figura e as letras é precioso no 1º ano, porque mostra que cada coisa do mundo tem uma palavra, e que essa palavra se escreve com letras numa ordem certa. Procure junto, com o dedo na grade, e leiam as letras em voz alta — a palavra escondida quase salta aos olhos. Há toda a calma que precisar, sem pressão e sem correria. A cada rodada, seu filho acha mais uma palavra espremida no meio das letras e a circula. Imprima de graça quantas vezes quiser.`,
  `Uma grade de letras, um punhado de palavras escondidas — é assim este caça-palavras. Em algum lugar daquele bloco de letras se escondem palavras ligadas a imagens de {N_PL}, e seu filho precisa procurá-las e circular cada achado. Isso pede que os olhos trabalhem com método: olhar a figura, ter a palavra na cabeça e percorrer a grade até a palavra escondida aparecer. Essa busca cuidadosa fortalece o reconhecimento das letras de que o 1º ano tanto precisa. A criança não calcula nada — só liga a imagem à palavra e procura entre as letras. E como nem cronômetro nem nota entram na brincadeira, a caça continua um puro prazer, inteirinha no ritmo do seu filho. A folha é grátis para imprimir em casa ou na escola.`,
  `No começo a grade parece só um amontoado de letras — depois, as palavras vão aparecendo uma a uma. É essa a graça deste caça-palavras, em que palavras ligadas a imagens de {N_PL} ficam escondidas no meio das letras. Seu filho olha cada figura, descobre a palavra e a procura na grade até encontrá-la e circulá-la. Para uma criança de 1º ano, é um treino bonito: ela passa o olhar pelas letras, compara com a palavra que tem na cabeça e reconhece a sequência certa. Soletrem juntos em voz alta, apontando com o dedo — a palavra escondida cai certinha. Sem estresse, só tempo e calma para procurar, no seu ritmo. Conta após conta de letras, a confiança cresce, e seu filho circula mais uma palavra. Grátis para imprimir sempre que quiser.`,
  `Procure, encontre, circule — é esse o ritmo deste caça-palavras, em que cada palavra escondida está ligada a uma imagem de {N_PL}. A criança olha a figura, pensa qual é a palavra e a busca espremida no meio das letras, até achar e circular. Como tudo parte de uma imagem, ler vira uma historinha gostosa em vez de algo abstrato, e isso combina bem com as crianças do 1º ano, que ainda gostam de ligar o que veem ao que escrevem. Aponte as letras com o dedo no caminho — ajuda mais do que parece quando a palavra está bem disfarçada. Nada de pressa: trabalha-se com tranquilidade, no próprio ritmo, sem cronômetro. De novo e de novo, seu filho acha a palavra escondida na grade e a circula com gosto. Grátis para imprimir sempre que der vontade.`,
  `Os olhos são as melhores ferramentas neste caça-palavras, e por isso cada palavra a achar vem com uma imagem de {N_PL} ao lado. Seu filho olha a figura, reconhece a palavra e procura a palavra escondida dentro da grade de letras, circulando quando a encontra. Poder partir de uma imagem deixa a caça tranquila para quem está descobrindo as primeiras palavras no 1º ano. Leiam as letras juntos, em voz alta, e deixem a criança conduzir a busca no seu ritmo — nenhuma pressão na folha. A cada rodada, seu filho procura, acha e circula mais uma palavra espremida no meio das letras. Devagarinho, ligar a imagem à palavra e reconhecer suas letras vira um gesto seguro. Imprima de graça, em casa ou na escola, quantas vezes quiser.`,
  `No fundo, este caça-palavras se resume a uma coisa bonita: descobrir, no meio de uma grade de letras, a palavra que combina com cada imagem. Nesta folha, seu filho pratica justamente isso, com palavras ligadas a figuras de {N_PL} que se escondem entre tantas letras. A criança olha a imagem, tem a palavra na cabeça e a procura na grade antes de circulá-la. Esse jeito faz sentido no 1º ano, porque ler começa por reconhecer letras e juntá-las numa palavra que a gente já conhece. Aponte as letras junto e soletre em voz alta — a ligação fica clara, e a palavra escondida aparece. Há todo o tempo que precisar, sem pressão e no ritmo da criança. De novo e de novo, seu filho encontra a palavra na grade e a circula. A folha é grátis para imprimir sempre que quiser.`,
];

const P2 = [
  `Uma boa dica em casa: deixe seu filho olhar bem a imagem de {N_PL} e dizer a palavra em voz alta antes de procurar. Apontar com o dedo, letra por letra, ajuda muito a achar a palavra escondida na grade. A folha é grátis e se imprime num instante: é só sentar à mesa quando bater a vontade, no ritmo de vocês.`,
  `Seu filho está em dúvida? Mostre a primeira letra da palavra e deixe a criança procurá-la na grade com calma; daí em diante, ela segue as letras vizinhas até a palavra escondida aparecer inteira. Tudo sem pressão. Imprima a folha de graça, ou jogue online se for mais prático para vocês em casa.`,
  `O bom de partir de {GEN_ART} {GEN} é que seu filho sempre tem a pista à mão: se a palavra não aparece, ele volta à imagem, repete o nome e procura de novo na grade, com calma e sem nenhuma pressão. Baixe a folha em impressão grátis e deixe-a na mesa — uma caça-palavras vira uma pausa boa no dia.`,
  `Quer ir além? Depois de achar uma palavra, peça que seu filho a copie ali do lado ou aponte cada letra na grade. Esse gestinho fixa as letras e dá sentido à palavra escondida que ele acabou de circular. Todas as folhas se imprimem de graça, quantas vezes você quiser, em casa ou na escola.`,
  `Algumas crianças passam o olhar rápido demais e pulam a palavra. Não tem problema nenhum: recomeça-se do canto da grade, aponta-se com o dedo e procura-se com calma, linha por linha. Cada palavra pode levar o tempo que for. Imprima a folha de graça e guarde — é bonito ver a palavra cair certinha da próxima vez.`,
  `Depois de cada achado, deixe seu filho contar como encontrou a palavra: « eu vi a imagem, pensei no nome e procurei a primeira letra ». Pôr em palavras esse caminho fixa melhor a busca na memória. Sem estresse, só uma prática calma que avança passo a passo. E como as folhas são grátis, dá sempre para fazer mais um caça-palavras.`,
  `Para fechar com tranquilidade: procurem juntos, uma última vez, todas as palavras que ainda faltam circular na grade. Assim seu filho pratica, brincando, encontrar a palavra escondida no meio das letras com {GEN_ART} {GEN} de companhia. A folha é grátis, para jogar online ou imprimir no papel, para que o gosto de ler cresça devagarinho aí em casa.`,
];

module.exports = {
  type: 'wordsearch',
  eyebrow: 'Atividade: Caça-palavras',
  strand: 'Consciência fonológica',
  slotWord: 'palavras',
  level: '1o-ano',
  standard: 'RF.K.3.c',
  h1: (mk) => 'Caça-palavras: {H1} – atividade para o 1º ano',
  carousel: (mk, h1Display) => 'Caça-palavras – ' + h1Display,
  modes: {
    'null': {
      SKEL: SKEL,
      P2: P2,
    },
  },
  P3: `Seu filho gosta de caçar palavras? Então ainda há muito para explorar juntos. Deem uma olhada nas atividades com {nb1}, onde seu filho pode seguir procurando palavras escondidas com a mesma calma, ou tentem algo com {nb2} para um pouco de variação. Trocando de tema de vez em quando, a caça-palavras fica viva, e seu filho segue ligando imagens a palavras com gosto. Toda a coleção com {GEN_ART} {GEN} é grátis: joguem as atividades online, ou imprimam e façam à mesa em casa. Há calma e todo o tempo que precisar, sem pressão e no ritmo da criança. Assim, seu filho constrói com segurança, passo a passo, a sua confiança na leitura.`,
};
