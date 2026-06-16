/* pt-readiness-pattern-train — Brazilian Portuguese prose config for the pattern-train fan.
 * FIVE modes (readiness, NO standard, level 'educacao-infantil', strand 'Padrões e sequências').
 * BR name: "Sequência" — uma sequência que se repete e que a criança CONTINUA com a próxima
 * figura (o próximo vagão do trem). NADA de contar. Os 5 modos são TIPOS DE PADRÃO, cada um
 * escrito mode-true (um mundo de imagens DISTINTO em todos os parágrafos):
 *   'null' = AB   — dois elementos que se ALTERNAM (A B A B A B): o vai-e-volta / o balanço / tique-taque
 *   'aab'  = AAB  — o PRIMEIRO dobra na FRENTE, depois o diferente (A A B A A B): os gêmeos na frente / o colar de contas
 *   'abb'  = ABB  — o SEGUNDO dobra no FIM, o eco (A B B A B B): a bolinha que quica / a cauda dupla / o eco
 *   'aabb' = AABB — aos PARES, dois e dois (A A B B A A B B): a dança em pares / de bracinhos dados
 *   'abc'  = ABC  — TRÊS diferentes em fila (A B C A B C): o semáforo / o trio / o carrossel de três
 * AAB vs ABB são INCONFUNDÍVEIS: AAB dobra na FRENTE (cabeça gêmea), ABB dobra no FIM (a cauda/eco).
 * DISTINTO da pattern-worksheet (strand 'Padrões de repetição', léxico 'folha/linha/completar a fila'):
 * este tipo NUNCA usa esse strand; léxico = a sequência / o padrão / o ritmo / continue a sequência /
 * o que vem depois / se repete / a regularidade / o trem / o vagão / o próximo vagão. SEM 'algoritmo'.
 * Placeholders (renderizador de SUBSTITUIÇÃO PURA — sem morfologia em pt):
 *   {N_PL} só em "imagens de {N_PL}" / "com {N_PL}" / "de {N_PL}"; "as coisas" = {GEN_ART} {GEN};
 *   contrações prep+artigo via {DE_GEN}/{EM_GEN}/{A_GEN}/{POR_GEN}; SEM artigo direto antes de {N_PL}. */
'use strict';

/* ---------------------------------------------------------------- AB (null)
 * ANCHOR: vai-e-volta / um e depois o outro / a alternância.
 * MUNDO DE IMAGENS: o balanço, o tique-taque, o joga e devolve a bolinha,
 * o "eu e você", o pêndulo. SEM cantiga "tá-tá-tí" (reservada ao AAB),
 * SEM eco (reservado ao ABB), SEM pares (reservado ao AABB). */
const SKEL_AB = [
  // 1 — skill-statement opening
  `Um e depois o outro, um e depois o outro: é o vai-e-volta dos vagões que faz andar este trem de padrões da educação infantil. Esse ritmo se chama AB porque dois elementos se revezam, primeiro o primeiro e depois o segundo, como um balanço sereno que nunca se cansa. Nesta folha, a criança olha imagens de {N_PL} que se alternam na vez e adivinha de quem é o próximo vagão. Não há nada para contar: basta sentir o vai-e-volta e responder com a figura certa. Acompanhar esse "eu e você" das figuras é uma preciosa habilidade de base que prepara com doçura para a escola. Sem pressa: o balanço vai no seu próprio ritmo. Sugira à criança dizer "você, eu, você, eu" enquanto aponta os vagões, para que a alternância vire uma brincadeira gostosa de ouvir. Se errar a vez, troca com leveza e segue em frente. Quando o vai-e-volta volta a fluir, o sorriso aparece sozinho, ao lado de um adulto paciente. É grátis e fica pronta para imprimir ou jogar online.`,

  // 2 — invitation opening
  `Venha brincar de revezar com o trem do seu filho! Aqui os vagões fazem vai-e-volta: um fala e o outro responde, de novo o primeiro e depois o segundo, num revezamento sereno que segue por toda a fileira. É o ritmo AB. Na folha aparecem imagens de {N_PL} que se dão a vez uma à outra, e ao pequeno cabe continuar dizendo de quem é o vagão que vem agora. Seguir esse "eu e você" treina o olhar a perceber de quem é a vez, uma capacidade que na escola vai servir muito. Aqui não se conta nada: segue-se o revezamento e continua-se. Não há nota chegando, só a curiosidade guiando. Convide a criança a fazer as vozes, uma para o primeiro e outra para o segundo, e a prever quem responde agora. Se um vagão pular a vez, é só dar risada e tentar de novo. Cada vai-e-volta concluído é uma pequena conquista, para viver como um revezamento alegre e compartilhado. É grátis e fica pronta para imprimir ou jogar online.`,

  // 3 — question opening
  `De quem é a vez agora? É a pergunta que abre o vai-e-volta deste trem de padrões. O ritmo AB faz dois elementos se revezarem: primeiro um, depois o outro, de novo um e depois o outro, como um "eu e você" que se repete sereno. As imagens de {N_PL} se dão a vez na fileira, e o pequeno entende de quem é a vez e responde com a figura certa. Aqui não se conta nada, só se escuta o revezamento: a quem cabe o próximo vagão. Reconhecer essa vez diverte e prepara com carinho para a escola. Nenhum cronômetro marca o tempo: vai-se devagar. Provoque com perguntinhas — quem fala primeiro, quem responde logo depois — e dê tempo para pensar. Se mudar de ideia, devolve a palavra a outra figura e segue tranquilo. Concluir o revezamento reforça a atenção e a confiança em si. É um convite simples a ficar pertinho e a saborear junto a alegria de uma vez bem fechada. É grátis e fica pronta para imprimir ou jogar online.`,

  // 4 — metaphor opening
  `Imagine um balanço que vai e volta: para cima, para baixo, para cima, para baixo, sempre na vez. É assim que balança este trem de padrões no ritmo AB, com duas figuras que se alternam como o impulso do balanço. Olhando {GEN_ART} {GEN}, a criança descobre que os vagões se dão a vez um depois do outro, e que a ela cabe dar o próximo empurrãozinho. A tarefa é doce: sentir o vai-e-volta das figuras e responder com o próximo vagão. Seguindo o embalo do "eu e você", o pequeno treina o olhar para o ritmo, sem contar nada. Nenhuma corrida, só o prazer de observar o balanço. Convide-o a acompanhar com a voz "vai, volta, vai, volta", para que o revezamento fique límpido. Se errar o empurrão, sem problema: corrige com um sorriso. Cada ida-e-volta completada é uma pequena conquista, perfeita para viver lado a lado, sem nenhuma pressão. É grátis e fica pronta para imprimir ou jogar online.`,

  // 5 — reassurance-first opening
  `Aqui é só ficar tranquilo: olha-se um balanço de figuras e dá-se um empurrãozinho, com calma e com gosto. O ritmo AB é um vai-e-volta simples, uma figura e depois a outra, sempre na mesma ordem serena. Nesta folha, a criança observa imagens de {N_PL} que se alternam na vez e entende de quem é o próximo vagão. Não precisa contar nada: basta sentir quem fala e quem responde. Esse acompanhar o revezamento é uma verdadeira habilidade de base, porque treina o olhar para o ritmo, útil mais adiante para ler e escrever. Sem corrida nem pontuação, só o olhar curioso e a vontade de tentar. Estimule-o a seguir o trem com o dedinho e a fazer as duas vozes, uma para cada figura, para que a vez fique clara. Se mudar de ideia, devolve a palavra com tranquilidade. Continuar o vai-e-volta faz bem à confiança, para saborear junto com tempos macios. É grátis e fica pronta para imprimir ou jogar online.`,

  // 6 — scene opening
  `Imagine dois amigos que jogam a bolinha um para o outro: joga, devolve, joga, devolve, sempre na vez. Nesta folha da educação infantil o trem de padrões brinca bem assim, no ritmo AB, com imagens de {N_PL} que passam a vez uma para a outra. A criança lê esse revezamento e acrescenta o vagão que falta para mantê-lo vivo. Tudo está em sentir a quem cabe devolver e em responder, uma habilidade calma que na escola vai contar cedo. Aqui não se conta nada, só se segue o vai-e-volta. A bolinha já está em jogo de propósito, então ao pequeno basta devolvê-la na hora certa. Convide-o a dizer "pra você, pra mim, pra você, pra mim" até entender quem devolve agora. Diante de um erro, basta um sorriso e um novo lance. Quando acerta a vez, a segurança da criança cresce um pouquinho, num clima sempre sereno e carinhoso. É grátis e fica pronta para imprimir ou jogar online.`,

  // 7 — observe-the-rhythm opening
  `Escuta o tique-taque do trem? Nesta folha da educação infantil os vagões fazem tique, taque, tique, taque: o ritmo AB de duas figuras que se alternam na vez. A criança olha imagens de {N_PL} que se dão a vez e continua o revezamento com o próximo vagão. Não há número nenhum para escrever: escuta-se como volta o vai-e-volta e segue-se o trem. Captar essa vez é uma preciosa habilidade de base para os aprendizados que virão. Sem cronômetro, sem nota, só o gosto de observar o ir-e-vir. Acompanhe-o com perguntinhas doces — quem faz tique e quem faz taque, de quem é a vez agora — e o deixe ir no seu próprio passo. Se um vagão perde a vez, escolhe outro com serenidade. Cada tique-taque levado adiante direitinho é uma pequena alegria para festejar, vivida junto com doçura, uma vez depois da outra. É grátis e fica pronta para imprimir ou jogar online.`,

  // 8 — classic-worksheet opening
  `Uma brincadeira de sempre, simples e queridíssima: o trem do "eu e você" no ritmo AB, aqui pensado para a educação infantil. O revezamento faz duas figuras se alternarem na vez, primeiro uma e depois a outra, sem parar. Nesta folha, a criança observa {GEN_ART} {GEN} e vê os vagões se darem a vez, entende o vai-e-volta e mantém o trem vivo com a figura certa. Sem números nem contagens: importa só seguir o revezamento e responder. Essa capacidade de captar a vez reforça a concentração, um belo preparo para a escola. Nenhuma pressa marca o trabalho: vai-se com calma. Estimule-o a seguir o trem com o dedinho, a fazer as duas vozes que se alternam e a adivinhar quem responde agora. Se errar uma vez, troca com leveza e recomeça. Manter o vai-e-volta vivo vira um momento precioso de observação, para saborear junto com tempos calmos e muita gentileza. É grátis e fica pronta para imprimir ou jogar online.`,
];

const P2_AB = [
  `O trem faz vai-e-volta no ritmo AB: duas figuras que se revezam na vez, primeiro uma e depois a outra. A criança segue o revezamento e acrescenta o próximo vagão a quem cabe agora. Capta o "eu e você" observando, sem contar nada, e mantém o trem vivo. Seguir as vezes é uma preciosa habilidade de base, para saborear no seu ritmo, sem pressa e sem nota. É grátis, para imprimir ou jogar online.`,

  `De quem é a vez agora? Dessa pergunta nasce a brincadeira. Olhando imagens de {N_PL} que se dão a vez, o pequeno sente o vai-e-volta AB e responde com a figura certa. É um exercício tranquilo de atenção, nunca de contagem, para viver junto com palavras gentis e todo o tempo que precisar; se um vagão pular a vez, tenta-se outro com um sorriso. É grátis, para imprimir.`,

  `Brinquem de revezar juntos: os vagões fazem "eu e você", primeiro um e depois o outro, e a criança dá a palavra a quem vem agora. Sugira fazer as vozes, "pra você, pra mim, pra você, pra mim", para entender de quem é o próximo vagão. Sem corrida e sem cronômetro, só o olhar curioso e a alegria de um vai-e-volta bem fechado. Grátis, para imprimir ou jogar online.`,

  `Nesta página o pequeno encontra um balanço de figuras já começado com {N_PL}. Com calma sente de quem é a vez e continua o revezamento, treinando o olhar para o "eu e você" e a paciência. É um doce momento de observação, perfeito para viver lado a lado: deixe dar os empurrõezinhos no seu ritmo e festejem cada vez bem fechada. É grátis, para imprimir ou jogar online.`,

  `Como um balanço que vai e volta, o ritmo AB alterna duas figuras na vez. Olhando {GEN_ART} {GEN}, a criança capta o embalo do revezamento e dá o próximo empurrão com o vagão certo. Sem tempos a bater e sem pontos, importa só a alegria de observar e responder; quando o vai-e-volta volta a fluir, a confiança cresce um pouquinho. É grátis, para imprimir ou jogar online.`,

  `Este trem faz tique-taque no ritmo AB: duas figuras se dão a vez ao longo dos vagões. A criança observa imagens de {N_PL} que se alternam e acrescenta a figura de quem é a vez. Não se conta nada, só se escuta. Acompanhe com perguntinhas leves e a deixe ir com calma; em poucos minutos tem uma boa ocupação tranquila e cheia de sentido. É grátis, para imprimir ou jogar online.`,

  `Um clássico revezamento para continuar, simples e sempre útil: os vagões fazem "um e depois o outro", e a criança mantém o "eu e você" vivo com {N_PL}. Sente a vez AB e responde com o próximo vagão, até o fim. Elogie o empenho, não a velocidade, para que o vai-e-volta siga um prazer: brincadeira de vozes, nunca de números. É grátis, para imprimir ou jogar online.`,
];

/* ---------------------------------------------------------------- AAB (aab)
 * ANCHOR: dois gêmeos na FRENTE, dobra o PRIMEIRO, e depois o diferente.
 * MUNDO DE IMAGENS: o colar de contas (duas contas iguais, depois uma diferente),
 * os dois gêmeos que abrem e o irmãozinho diferente que fecha. A cabeça dobrada
 * está SEMPRE no INÍCIO. SEM eco/cauda (reservado ao ABB), SEM pares (AABB). */
const SKEL_AAB = [
  // 1 — skill-statement
  `Dois gêmeos na frente e depois o diferente: é o segredo do ritmo AAB deste trem de padrões, uma doce habilidade para a educação infantil. Começa dobrando o primeiro — dois vagões gêmeos, iguaizinhos — e só depois chega o diferente para fechar o trio, de novo dois gêmeos e depois o diferente. Nesta folha, a criança olha imagens de {N_PL} que abrem em par igual e entende qual é o próximo vagão agora. Não há nada para contar: basta notar que a frente é dobrada e que o diferente vem por último, e então continuar o trem com a figura certa. Captar onde está o par gêmeo é uma preciosa habilidade de base que prepara para a escola. Sem pressa: enfia-se uma conta de cada vez. Sugira dizer "gêmeos, gêmeos, e depois o diferente", para que o primeiro-dobrado salte aos olhos. Se errar, troca a conta com leveza e segue. Quando o trio volta a abrir com os dois gêmeos, o sorriso aparece sozinho, ao lado de um adulto paciente. É grátis e fica pronta para imprimir ou jogar online.`,

  // 2 — invitation
  `Venha montar o colar do seu filho! Este trem AAB é como um colar de contas que começa sempre com duas contas gêmeas e depois põe uma diferente, de novo duas gêmeas e depois a diferente. O par igual abre, o diferente fecha. Na folha aparecem imagens de {N_PL} que abrem em gêmeos, e ao pequeno cabe continuar escolhendo a conta que vem agora. Notar que a frente é sempre dobrada treina o olhar a reconhecer onde começa o trio, uma capacidade que na escola vai servir muito. Aqui não se conta nada: segue-se o colar e o aumenta. Não há nota chegando, só a curiosidade guiando. Convide-o a apontar as duas contas gêmeas que abrem e depois a diferente que fecha, e a prever quem vem agora. Se enfiar uma conta errada, é só dar risada e tentar de novo. Cada trio bem fechado é uma conquista que enche de orgulho, para viver como um colar montado juntos. É grátis e fica pronta para imprimir ou jogar online.`,

  // 3 — question
  `Quem abre o trio? No ritmo AAB abrem sempre os dois gêmeos — o primeiro dobrado — e só depois chega o diferente para fechar, de novo dois iguais e depois o diferente. As imagens de {N_PL} começam cada grupinho em par idêntico, e a criança reconhece isso e continua o trem com a figura certa. Aqui não se conta, só se olha: onde estão os gêmeos, quando surge o diferente, qual é o próximo vagão agora. Notar a frente dobrada diverte e prepara com carinho para a escola. Nenhum cronômetro marca o tempo: vai-se devagar. Provoque com perguntinhas — quais duas figuras abrem iguais, qual diferente vem em seguida — e dê espaço para pensar. Se mudar de ideia, escolhe outra conta e segue tranquilo. Fechar o trio reforça a atenção e a confiança em si. É um convite simples a ficar pertinho e a saborear junto a alegria dos gêmeos que abrem bem. É grátis e fica pronta para imprimir ou jogar online.`,

  // 4 — metaphor
  `Imagine uma cantiga que faz "tá-tá-tí": duas batidas iguais e fortes na frente, e depois uma diferente, leve, para fechar. É assim que canta o ritmo AAB: primeiro os dois gêmeos, depois o diferente. Olhando {GEN_ART} {GEN}, a criança descobre que cada grupinho dobra o primeiro e põe no fim o diferente, e que a ela cabe continuar. A tarefa é doce: sentir as duas batidas gêmeas e depois a diferente, e acrescentar o próximo vagão. Batendo com a voz o "tá-tá" da frente dobrada, o pequeno treina o olhar para o ritmo, sem contar nada. Nenhuma corrida, só o prazer de cantarolar. Convide-o a fazer "forte, forte, fraco", para que o par da frente se ouça na hora. Se errar, sem medo: corrige com um sorriso. Cada "tá-tá-tí" completado é uma pequena conquista, perfeita para viver lado a lado, sem nenhuma pressão. É grátis e fica pronta para imprimir ou jogar online.`,

  // 5 — reassurance-first
  `Aqui é só ficar tranquilo: monta-se um colar de contas e o aumenta, com calma e com gosto. O ritmo AAB abre sempre com duas contas gêmeas e depois põe uma diferente, na mesma ordem serena. Nesta folha, a criança observa imagens de {N_PL} que começam em par igual e entende qual próximo vagão acrescentar. Não precisa contar nada: basta notar que a frente é dobrada e o diferente fecha. Esse perceber onde está o par gêmeo é uma verdadeira habilidade de base, porque treina o olhar para o ritmo, útil mais adiante para ler e escrever. Sem corrida nem pontuação, só o olhar curioso e a vontade de tentar. Estimule-o a tocar as duas contas iguais da frente e depois a diferente, para que a continuação fique clara. Se mudar de ideia, troca a conta com tranquilidade. Aumentar o colar faz bem à confiança, para saborear junto com tempos macios. É grátis e fica pronta para imprimir ou jogar online.`,

  // 6 — scene
  `Imagine dois irmãozinhos gêmeos que correm na frente de mãos dadas, e atrás deles um amigo diferente que os segue: gêmeos, gêmeos, e depois o amigo, de novo gêmeos e depois o amigo. É o ritmo AAB. Nesta folha da educação infantil as imagens de {N_PL} marcham bem assim, com o par igual abrindo cada trio. A criança lê a fileira e acrescenta quem falta para mantê-la em ordem. Tudo está em ver os gêmeos na frente e o diferente atrás, uma habilidade calma que na escola vai contar cedo. Aqui não se conta nada, só se reconhece quem abre em par. A marcha já começou de propósito, então ao pequeno basta continuá-la. Convide-o a cumprimentar "oi gêmeos, oi amigo" até entender quem vem agora. Diante de um erro, basta um sorriso e um novo passo. Quando acerta, a segurança da criança cresce um pouquinho, num clima sempre sereno e carinhoso. É grátis e fica pronta para imprimir ou jogar online.`,

  // 7 — observe-the-rhythm
  `Olha onde estão os gêmeos! Nesta folha da educação infantil, cada trio do ritmo AAB abre com duas figuras iguais na frente e fecha com a diferente. A criança observa imagens de {N_PL} que começam em par idêntico e continua o trem com o próximo vagão. Não há número nenhum para escrever: nota-se que a frente é dobrada e que o diferente vem depois, e então continua-se. Captar onde está o par gêmeo é uma preciosa habilidade de base para os aprendizados futuros. Sem cronômetro, sem nota, só o gosto de observar. Acompanhe-o com perguntinhas doces — quais duas figuras abrem iguais, qual diferente as fecha — e o deixe ir no seu próprio passo. Se um vagão quebra o par da frente, escolhe outro com serenidade. Cada trio bem aberto é uma pequena alegria para festejar, vivida junto com doçura. É grátis e fica pronta para imprimir ou jogar online.`,

  // 8 — classic-worksheet
  `Uma brincadeira de sempre, simples e queridíssima: o trem que abre com os gêmeos, ritmo AAB, aqui pensado para a educação infantil. Cada grupinho dobra o primeiro e põe no fim o diferente. Nesta folha, a criança observa {GEN_ART} {GEN} e vê os dois vagões gêmeos abrirem cada trio, reconhece o princípio e continua o trem com a figura certa. Sem números nem contagens: importa só notar a frente dobrada e seguir. Essa capacidade de captar onde começa o par reforça a concentração, um belo preparo para a escola. Nenhuma pressa marca o trabalho: vai-se com calma. Estimule-o a tocar as duas figuras gêmeas da frente, a nomear a diferente no fim e a adivinhar quem abre agora. Se errar um lugar, troca com leveza e recomeça. Abrir cada trio com os gêmeos vira um momento precioso de observação, para saborear junto com tempos calmos e muita gentileza. É grátis e fica pronta para imprimir ou jogar online.`,
];

const P2_AAB = [
  `O trem abre com os gêmeos no ritmo AAB: duas figuras iguais na frente e depois uma diferente para fechar. A criança vê onde está o par gêmeo e acrescenta o próximo vagão para reabrir o trio. Capta a frente dobrada observando, sem contar nada, e aumenta o colar. Notar onde começa o par é uma preciosa habilidade de base, para saborear no seu ritmo, sem pressa e sem nota. É grátis, para imprimir ou jogar online.`,

  `Quem abre o trio? Dessa pergunta nasce a brincadeira. Olhando imagens de {N_PL} que começam em par idêntico, o pequeno reconhece o ritmo AAB — dois gêmeos e depois o diferente — e continua com a figura certa. É um exercício tranquilo de atenção, nunca de contagem, para viver junto com palavras gentis; se errar a conta, tenta-se outra com um sorriso. É grátis, para imprimir.`,

  `Montem o colar juntos: abrem duas contas gêmeas e depois chega uma diferente, e a criança escolhe quem vem agora. Sugira dizer "gêmeos, gêmeos, e depois o diferente", para entender qual próximo vagão reabre o trio. Sem corrida e sem cronômetro, só o olhar curioso e a alegria de um colar montado com capricho. Grátis, para imprimir ou jogar online.`,

  `Nesta página o pequeno encontra um colar no ritmo AAB já começado com {N_PL}. Com calma vê os dois gêmeos na frente e continua, treinando o olhar para o par que abre e a paciência. É um doce momento de observação, perfeito para viver lado a lado: deixe enfiar no seu ritmo e festejem cada trio bem fechado. É grátis, para imprimir ou jogar online.`,

  `Como uma cantiga "tá-tá-tí", o ritmo AAB bate duas notas gêmeas e depois uma diferente. Olhando {GEN_ART} {GEN}, a criança sente a frente dobrada e continua o trem com o próximo vagão. Sem tempos a bater e sem pontos, importa só a alegria de cantarolar "forte, forte, fraco"; quando o trio reabre com os gêmeos, a confiança cresce um pouquinho. É grátis, para imprimir ou jogar online.`,

  `Este trem abre em par no ritmo AAB: dois gêmeos na frente e depois o diferente ao longo dos vagões. A criança observa imagens de {N_PL} que começam iguais e acrescenta a figura que reabre o trio. Não se conta nada, só se vê onde está o par. Acompanhe com perguntinhas leves e a deixe ir com calma; em poucos minutos tem uma boa ocupação tranquila e cheia de sentido. É grátis, para imprimir ou jogar online.`,

  `Um clássico trem para continuar, onde a frente é sempre dobrada: abrem dois gêmeos e depois vem o diferente, e a criança aumenta o colar com {N_PL}. Reconhece o ritmo AAB e escolhe o próximo vagão, até o fim. Elogie o empenho, não a velocidade, para que enfiar as contas siga um prazer: brincadeira de olhares, nunca de números. É grátis, para imprimir ou jogar online.`,
];

/* ---------------------------------------------------------------- ABB (abb)
 * ANCHOR: o eco / um chama e dois respondem / a cauda dobrada.
 * MUNDO DE IMAGENS: o eco na montanha (uma voz, dois retornos), o que vai na
 * frente sozinho e chama, os dois amiguinhos que fazem eco, a bolinha que
 * quica duas vezes. A dobra está SEMPRE no FIM (a cauda), NUNCA na frente.
 * SEM gêmeos na frente (é AAB), SEM pares (é AABB). */
const SKEL_ABB = [
  // 1 — skill-statement
  `Uma voz e depois o seu eco dobrado: é o segredo do ritmo ABB deste trem de padrões, uma doce habilidade para a educação infantil. Aqui quem abre vem sozinho, um só na frente, e logo duas figuras iguais lhe fazem eco, como um chamado que volta duas vezes; de novo um que chama e dois que respondem. Nesta folha, a criança olha imagens de {N_PL} em que o primeiro vem sozinho e a cauda é dobrada, e entende qual é o próximo vagão agora. Não há nada para contar: basta sentir que a dobra está no fim e continuar o trem com a figura certa. Captar onde volta o eco é uma preciosa habilidade de base que prepara para a escola. Sem pressa: o eco se saboreia com calma. Sugira dizer "eu chamo… e você responde, responde", para que a cauda dobrada salte aos olhos. Se errar, troca a figura com leveza e segue. Quando o eco volta a soar dobrado, o sorriso aparece sozinho, ao lado de um adulto paciente. É grátis e fica pronta para imprimir ou jogar online.`,

  // 2 — invitation
  `Venha fazer eco com o trem do seu filho! O ritmo ABB é como uma vozinha que chama na montanha: um só lança o chamado e duas figuras iguais lhe respondem na cauda, de novo um chama e dois fazem eco. O sozinho abre, o par fecha. Na folha aparecem imagens de {N_PL} em que o primeiro vem sozinho e depois dobra no fim, e ao pequeno cabe continuar escolhendo quem vem agora. Notar que o eco dobrado chega sempre no fim treina o olhar a sentir onde se fecha o grupinho, uma capacidade que na escola vai servir muito. Aqui não se conta nada: segue-se o chamado e dá-se voz a ele. Não há nota chegando, só a curiosidade guiando. Convide-o a apontar o vagão sozinho que chama e depois os dois que respondem, e a prever quem volta agora. Se errar o chamado, é só dar risada e tentar de novo. Cada eco bem fechado é uma conquista que enche de orgulho, para viver como uma brincadeira de vozes compartilhada. É grátis e fica pronta para imprimir ou jogar online.`,

  // 3 — question
  `Quem responde ao chamado? No ritmo ABB abre sempre um só — a voz sozinha — e depois duas figuras iguais lhe fazem eco na cauda, de novo um e depois os dois que respondem. As imagens de {N_PL} começam cada grupinho sozinhas e se fecham com o par, e a criança reconhece isso e continua o trem com a figura certa. Aqui não se conta, só se escuta: quem chama sozinho, quando volta o eco dobrado, qual é o próximo vagão agora. Sentir onde está a dobra do fim diverte e prepara com carinho para a escola. Nenhum cronômetro marca o tempo: vai-se devagar. Provoque com perguntinhas — qual figura chama sozinha, quais duas lhe respondem iguais — e dê espaço para pensar. Se mudar de ideia, escolhe outro eco e segue tranquilo. Fechar o chamado reforça a atenção e a confiança em si. É um convite simples a ficar pertinho e a saborear junto a alegria de um eco que volta bem. É grátis e fica pronta para imprimir ou jogar online.`,

  // 4 — metaphor
  `Imagine uma bolinha que quica: um toque firme e depois dois quiques iguais que vêm atrás, "tóc… tic-tic". É assim que brinca o ritmo ABB: primeiro o toque sozinho, depois os dois quiques gêmeos na cauda. Olhando {GEN_ART} {GEN}, a criança descobre que cada grupinho parte de um só e dobra no fim, e que a ela cabe continuar. A tarefa é doce: sentir o toque sozinho e os dois quiques que fazem eco, e acrescentar o próximo vagão. Acompanhando com a voz "tóc, e depois tic-tic", o pequeno treina o olhar para o ritmo, sem contar nada. Nenhuma corrida, só o prazer de ouvir o eco. Convide-o a fazer "forte… fraquinho-fraquinho", para que a cauda dobrada se ouça na hora. Se errar, sem medo: corrige com um sorriso. Cada quique dobrado completado é uma pequena conquista, perfeita para viver lado a lado, sem nenhuma pressão. É grátis e fica pronta para imprimir ou jogar online.`,

  // 5 — reassurance-first
  `Aqui é só ficar tranquilo: escuta-se um eco e responde-se a ele, com calma e com gosto. O ritmo ABB abre sempre com uma voz só e a fecha com duas figuras iguais na cauda, na mesma ordem serena. Nesta folha, a criança observa imagens de {N_PL} em que o primeiro vem sozinho e a dobra chega no fim, e entende qual próximo vagão acrescentar. Não precisa contar nada: basta sentir que a cauda é dobrada. Esse captar onde volta o eco é uma verdadeira habilidade de base, porque treina o olhar para o ritmo, útil mais adiante para ler e escrever. Sem corrida nem pontuação, só o olhar curioso e a vontade de tentar. Estimule-o a tocar o vagão sozinho que chama e depois os dois que respondem, para que a continuação fique clara. Se mudar de ideia, troca o eco com tranquilidade. Responder ao chamado faz bem à confiança, para saborear junto com tempos macios. É grátis e fica pronta para imprimir ou jogar online.`,

  // 6 — scene
  `Imagine uma criança que chama de uma colina, "olá!", e do vale lhe voltam dois "olá, olá" iguais: uma voz só e depois o eco dobrado. É o ritmo ABB. Nesta folha da educação infantil as imagens de {N_PL} viajam bem assim, com o vagão sozinho na frente e os dois gêmeos fazendo eco na cauda. A criança lê a fileira e acrescenta quem falta para mantê-la em ordem. Tudo está em sentir quem chama sozinho e quem responde em par, uma habilidade calma que na escola vai contar cedo. Aqui não se conta nada, só se reconhece onde volta o eco. O chamado já partiu de propósito, então ao pequeno basta continuá-lo. Convide-o a fazer "olá… olá, olá" até entender quem vem agora. Diante de um erro, basta um sorriso e um novo chamado. Quando acerta, a segurança da criança cresce um pouquinho, num clima sempre sereno e carinhoso. É grátis e fica pronta para imprimir ou jogar online.`,

  // 7 — observe-the-rhythm
  `Escuta onde volta o eco? Nesta folha da educação infantil, cada grupinho do ritmo ABB abre com uma figura sozinha e fecha com duas iguais, como um chamado que quica na cauda. A criança observa imagens de {N_PL} em que o primeiro vem sozinho e a dobra chega no fim, e continua o trem com o próximo vagão. Não há número nenhum para escrever: sente-se que a cauda é dobrada e segue-se. Captar onde está o eco do fim é uma preciosa habilidade de base para os aprendizados futuros. Sem cronômetro, sem nota, só o gosto de escutar. Acompanhe-o com perguntinhas doces — qual figura chama sozinha, quais duas lhe respondem na cauda — e o deixe ir no seu próprio passo. Se um vagão quebra o eco, escolhe outro com serenidade. Cada chamado bem fechado é uma pequena alegria para festejar, vivida junto com doçura. É grátis e fica pronta para imprimir ou jogar online.`,

  // 8 — classic-worksheet
  `Uma brincadeira de sempre, simples e queridíssima: o trem do eco, ritmo ABB, aqui pensado para a educação infantil. Cada grupinho parte de um só e dobra no fim, com duas figuras iguais fazendo de cauda. Nesta folha, a criança observa {GEN_ART} {GEN} e vê o vagão sozinho chamar e os dois gêmeos responderem na cauda, reconhece o princípio e continua o trem com a figura certa. Sem números nem contagens: importa só sentir onde está o eco e seguir. Essa capacidade de captar onde se fecha o chamado reforça a concentração, um belo preparo para a escola. Nenhuma pressa marca o trabalho: vai-se com calma. Estimule-o a tocar o vagão que chama sozinho, a nomear os dois que respondem e a adivinhar quem volta agora. Se errar um lugar, troca com leveza e recomeça. Fazer o eco voltar vira um momento precioso de observação, para saborear junto com tempos calmos e muita gentileza. É grátis e fica pronta para imprimir ou jogar online.`,
];

const P2_ABB = [
  `O trem faz eco no ritmo ABB: uma figura sozinha na frente e depois duas iguais respondendo na cauda. A criança sente onde está a dobra do fim e acrescenta o próximo vagão para reabrir o chamado. Capta o eco observando, sem contar nada, e continua o trem. Sentir onde volta a cauda dobrada é uma preciosa habilidade de base, para saborear no seu ritmo, sem pressa e sem nota. É grátis, para imprimir ou jogar online.`,

  `Quem responde ao chamado? Dessa pergunta nasce a brincadeira. Olhando imagens de {N_PL} em que o primeiro chama sozinho e duas iguais fazem eco, o pequeno reconhece o ritmo ABB e continua com a figura certa. É um exercício tranquilo de atenção, nunca de contagem, para viver junto com palavras gentis; se errar o eco, tenta-se outro com um sorriso. É grátis, para imprimir.`,

  `Façam eco juntos: um chama sozinho e dois lhe respondem na cauda, e a criança escolhe quem volta agora. Sugira dizer "eu chamo… e você responde, responde", para entender qual próximo vagão reabre o chamado. Sem corrida e sem cronômetro, só o olhar curioso e a alegria de um eco que volta com capricho. Grátis, para imprimir ou jogar online.`,

  `Nesta página o pequeno encontra um chamado no ritmo ABB já começado com {N_PL}. Com calma sente o vagão sozinho e os dois que respondem na cauda, treinando o olhar para o eco dobrado e a paciência. É um doce momento de observação, perfeito para viver lado a lado: deixe responder no seu ritmo e festejem cada chamado bem fechado. É grátis, para imprimir ou jogar online.`,

  `Como uma bolinha que faz "tóc… tic-tic", o ritmo ABB lança um toque sozinho e dois quiques iguais na cauda. Olhando {GEN_ART} {GEN}, a criança sente o eco do fim e continua o trem com o próximo vagão. Sem tempos a bater e sem pontos, importa só a alegria de fazer "forte… fraquinho-fraquinho"; quando o chamado volta dobrado, a confiança cresce um pouquinho. É grátis, para imprimir ou jogar online.`,

  `Este trem fecha em eco no ritmo ABB: uma voz só e depois duas iguais na cauda ao longo dos vagões. A criança observa imagens de {N_PL} em que a dobra chega no fim e acrescenta a figura que reabre o chamado. Não se conta nada, só se escuta onde está o eco. Acompanhe com perguntinhas leves e a deixe ir com calma; em poucos minutos tem uma boa ocupação tranquila e cheia de sentido. É grátis, para imprimir ou jogar online.`,

  `Um clássico trem para continuar, onde a cauda é sempre dobrada: chama um só e lhe respondem dois iguais, e a criança faz o eco voltar com {N_PL}. Reconhece o ritmo ABB e escolhe o próximo vagão, até o fim. Elogie o empenho, não a velocidade, para que responder ao chamado siga um prazer: brincadeira de vozes, nunca de números. É grátis, para imprimir ou jogar online.`,
];

/* -------------------------------------------------------------- AABB (aabb)
 * ANCHOR: aos pares / dois e dois / de bracinhos dados.
 * MUNDO DE IMAGENS: a dança em pares (dois dançarinos iguais, depois outros
 * dois), os amigos de bracinhos dados de dois em dois, as meias em par, a
 * valsa "um-dois, um-dois". SEMPRE em pares de quatro (dois+dois), NUNCA trios.
 * SEM cabeça gêmea-e-um (é AAB), SEM eco (é ABB). */
const SKEL_AABB = [
  // 1 — skill-statement
  `Aos pares, dois e dois: é o passo de dança do ritmo AABB deste trem de padrões, uma doce habilidade para a educação infantil. Os vagões entram na pista de bracinhos dados — duas figuras iguais juntas — e logo depois entra outro par, duas figuras iguais mas diferentes das primeiras, de novo dois e dois. Nesta folha, a criança olha imagens de {N_PL} que dançam aos pares e entende qual é o próximo vagão agora. Não há nada para contar: basta ver que as figuras vão de bracinhos dados, nunca sozinhas, e continuar o trem com a figura certa. Captar a valsa dos pares é uma preciosa habilidade de base que prepara para a escola. Sem pressa: a dança vai no seu próprio ritmo. Sugira dizer "um par, e depois outro par" enquanto aponta os vagões, para que o dois-e-dois salte aos olhos. Se errar o dançarino, troca com leveza e segue. Quando os pares voltam a entrar de bracinhos dados, o sorriso aparece sozinho, ao lado de um adulto paciente. É grátis e fica pronta para imprimir ou jogar online.`,

  // 2 — invitation
  `Venha dançar aos pares com o trem do seu filho! O ritmo AABB é uma dança de dois em dois: primeiro entra um par de amigos de bracinhos dados, dois iguais, e depois outro par, dois iguais e diferentes, de novo dois e dois. Na folha aparecem imagens de {N_PL} que dançam abraçadas aos pares, e ao pequeno cabe continuar escolhendo quem entra agora na pista. Notar que as figuras entram sempre de bracinhos dados treina o olhar a ver os pares, uma capacidade que na escola vai servir muito. Aqui não se conta nada: segue-se a dança e a continua. Não há nota chegando, só a curiosidade guiando. Convide-o a apontar o primeiro par de bracinhos dados e depois o outro par, e a prever quem dança agora. Se puser na pista um dançarino sem par, é só dar risada e tentar de novo. Cada par bem entrado é uma conquista que enche de orgulho, para viver como uma dança alegre e compartilhada. É grátis e fica pronta para imprimir ou jogar online.`,

  // 3 — question
  `Quem entra de bracinhos dados agora? No ritmo AABB as figuras dançam sempre aos pares: duas iguais juntas e depois outras duas iguais juntas, de novo dois e dois. As imagens de {N_PL} entram na pista abraçadas de dois em dois, e a criança reconhece isso e continua o trem com a figura certa. Aqui não se conta, só se olha: como entram os pares, qual é o próximo vagão agora. Ver a dança de dois em dois diverte e prepara com carinho para a escola. Nenhum cronômetro marca o tempo: vai-se devagar. Provoque com perguntinhas — quais duas figuras dançam juntas, quais outras duas entram depois — e dê espaço para pensar. Se mudar de ideia, escolhe outro par e segue tranquilo. Fazer os pares entrarem bem reforça a atenção e a confiança em si. É um convite simples a ficar pertinho e a saborear junto a alegria de uma dança de bracinhos dados. É grátis e fica pronta para imprimir ou jogar online.`,

  // 4 — metaphor
  `Imagine uma valsa que faz "um-dois, um-dois": primeiro dois passos juntos, depois outros dois passos juntos. É assim que dança o ritmo AABB, aos pares. Olhando {GEN_ART} {GEN}, a criança descobre que os vagões entram de bracinhos dados, dois iguais e depois outros dois iguais, e que a ela cabe fazer a dança girar. A tarefa é doce: ver as figuras dançarem de dois em dois e acrescentar o próximo vagão. Acompanhando com a voz "um-dois, um-dois", o pequeno treina o olhar para o ritmo, sem contar nada. Nenhuma corrida, só o prazer da valsa. Convide-o a dar duas palmas juntas e depois outras duas, "pá-pá… pá-pá", para que os pares se ouçam na hora. Se errar um passo, sem medo: corrige com um sorriso. Cada valsa de pares completada é uma pequena conquista, perfeita para viver lado a lado, sem nenhuma pressão. É grátis e fica pronta para imprimir ou jogar online.`,

  // 5 — reassurance-first
  `Aqui é só ficar tranquilo: olha-se uma dança aos pares e faz-se ela girar, com calma e com gosto. O ritmo AABB manda para a pista duas figuras iguais de bracinhos dados e depois outras duas iguais, na mesma ordem serena. Nesta folha, a criança observa imagens de {N_PL} que dançam de dois em dois e entende qual próximo vagão acrescentar. Não precisa contar nada: basta ver que as figuras vão sempre em par. Esse captar o dois-e-dois é uma verdadeira habilidade de base, porque treina o olhar para o ritmo, útil mais adiante para ler e escrever. Sem corrida nem pontuação, só o olhar curioso e a vontade de tentar. Estimule-o a apontar o primeiro par de bracinhos dados e depois o outro par, para que a continuação fique clara. Se mudar de ideia, troca o dançarino com tranquilidade. Fazer os pares dançarem faz bem à confiança, para saborear junto com tempos macios. É grátis e fica pronta para imprimir ou jogar online.`,

  // 6 — scene
  `Imagine uma ciranda de amigos que se dão os bracinhos de dois em dois: primeiro passam dois juntos, depois outros dois juntos, de novo dois e dois. É o ritmo AABB. Nesta folha da educação infantil as imagens de {N_PL} desfilam bem assim, sempre abraçadas em par. A criança lê a fileira e acrescenta quem falta para manter os pares juntos. Tudo está em ver que ninguém anda sozinho, mas todos de bracinhos dados de dois em dois, uma habilidade calma que na escola vai contar cedo. Aqui não se conta nada, só se reconhece o passo aos pares. O desfile já começou de propósito, então ao pequeno basta continuá-lo. Convide-o a cumprimentar "oi par, oi par" até entender quem passa agora. Diante de um erro, basta um sorriso e um novo passo. Quando acerta, a segurança da criança cresce um pouquinho, num clima sempre sereno e carinhoso. É grátis e fica pronta para imprimir ou jogar online.`,

  // 7 — observe-the-rhythm
  `Olha os pares de bracinhos dados! Nesta folha da educação infantil, cada grupo do ritmo AABB entra de dois em dois: duas figuras iguais juntas e depois outras duas iguais juntas. A criança observa imagens de {N_PL} que dançam aos pares e continua o trem com o próximo vagão. Não há número nenhum para escrever: vê-se que as figuras vão sempre em par e segue-se. Captar o dois-e-dois é uma preciosa habilidade de base para os aprendizados futuros. Sem cronômetro, sem nota, só o gosto de olhar a dança. Acompanhe-o com perguntinhas doces — quais duas figuras dançam abraçadas, quais outras duas entram depois — e o deixe ir no seu próprio passo. Se um vagão fica sem par, escolhe outro com serenidade. Cada par bem entrado é uma pequena alegria para festejar, vivida junto com doçura. É grátis e fica pronta para imprimir ou jogar online.`,

  // 8 — classic-worksheet
  `Uma brincadeira de sempre, simples e queridíssima: o trem que dança aos pares, ritmo AABB, aqui pensado para a educação infantil. Cada grupo entra de bracinhos dados, duas figuras iguais e depois outras duas iguais. Nesta folha, a criança observa {GEN_ART} {GEN} e vê as figuras dançarem de dois em dois, reconhece o princípio e faz o trem girar com a figura certa. Sem números nem contagens: importa só ver os pares e seguir. Essa capacidade de captar o dois-e-dois reforça a concentração, um belo preparo para a escola. Nenhuma pressa marca o trabalho: vai-se com calma. Estimule-o a apontar o primeiro par de bracinhos dados, a nomear o outro par e a adivinhar quem dança agora. Se puser na pista um sem par, troca com leveza e recomeça. Fazer os pares dançarem vira um momento precioso de observação, para saborear junto com tempos calmos e muita gentileza. É grátis e fica pronta para imprimir ou jogar online.`,
];

const P2_AABB = [
  `O trem dança aos pares no ritmo AABB: duas figuras iguais de bracinhos dados e depois outras duas iguais. A criança olha os pares e acrescenta o próximo vagão para fazer entrar o par certo. Vê o dois-e-dois observando, sem contar nada, e faz a dança girar. Captar que as figuras vão de bracinhos dados é uma preciosa habilidade de base, para saborear no seu ritmo, sem pressa e sem nota. É grátis, para imprimir ou jogar online.`,

  `Quem entra de bracinhos dados agora? Dessa pergunta nasce a brincadeira. Olhando imagens de {N_PL} que dançam de dois em dois, o pequeno reconhece o ritmo AABB — um par e depois outro par — e continua com a figura certa. É um exercício tranquilo de atenção, nunca de contagem, para viver junto com palavras gentis; se puser na pista um sem par, tenta-se outro com um sorriso. É grátis, para imprimir.`,

  `Dancem aos pares juntos: entra um par de bracinhos dados e depois outro par, e a criança escolhe quem dança agora. Sugira dizer "um par, e depois outro par", para entender qual próximo vagão entra na pista. Sem corrida e sem cronômetro, só o olhar curioso e a alegria de uma dança feita girar com capricho. Grátis, para imprimir ou jogar online.`,

  `Nesta página o pequeno encontra uma dança no ritmo AABB já começada com {N_PL}. Com calma vê as figuras entrarem de bracinhos dados de dois em dois e continua, treinando o olhar para os pares e a paciência. É um doce momento de observação, perfeito para viver lado a lado: deixe fazer dançar no seu ritmo e festejem cada par bem entrado. É grátis, para imprimir ou jogar online.`,

  `Como uma valsa que faz "um-dois, um-dois", o ritmo AABB move dois passos juntos e depois outros dois. Olhando {GEN_ART} {GEN}, a criança sente a dança aos pares e continua o trem com o próximo vagão. Sem tempos a bater e sem pontos, importa só a alegria de bater "pá-pá… pá-pá"; quando os pares voltam de bracinhos dados, a confiança cresce um pouquinho. É grátis, para imprimir ou jogar online.`,

  `Este trem dança aos pares no ritmo AABB: duas iguais de bracinhos dados e depois outras duas ao longo dos vagões. A criança observa imagens de {N_PL} que entram de dois em dois e acrescenta a figura que completa o par. Não se conta nada, só se olha a dança. Acompanhe com perguntinhas leves e a deixe ir com calma; em poucos minutos tem uma boa ocupação tranquila e cheia de sentido. É grátis, para imprimir ou jogar online.`,

  `Um clássico trem para continuar, onde ninguém anda sozinho: as figuras vão de bracinhos dados de dois em dois, e a criança faz a dança girar com {N_PL}. Reconhece o ritmo AABB e escolhe o próximo vagão, até o fim. Elogie o empenho, não a velocidade, para que fazer os pares dançarem siga um prazer: brincadeira de olhares, nunca de números. É grátis, para imprimir ou jogar online.`,
];

/* ---------------------------------------------------------------- ABC (abc)
 * ANCHOR: três diferentes em fila / um trio / o carrossel de três.
 * MUNDO DE IMAGENS: o semáforo (vermelho-amarelo-verde), três bandeirinhas de
 * cores diferentes, o carrossel de três amigos, a marcha "um-dois-três". Todos
 * os três DIFERENTES, sem dobra nenhuma: a surpresa é que NADA se repete dentro
 * do trio. SEM gêmeos, SEM eco, SEM pares. */
const SKEL_ABC = [
  // 1 — skill-statement
  `Três amigos diferentes em fila, e nenhum que se repete: é a surpresa do ritmo ABC deste trem de padrões, uma doce habilidade para a educação infantil. O trio é feito de três figuras todas diferentes, uma depois da outra, e depois as mesmas três recomeçam na mesma ordem, como um carrossel que volta ao começo. Nesta folha, a criança olha imagens de {N_PL} em que cada trio é todo diferente e entende qual é o próximo vagão agora. Não há nada para contar: basta notar que dentro do trio nada se repete e então continuar o trem com a figura certa. Guardar na cabeça a ordem dos três diferentes é uma preciosa habilidade de base que prepara para a escola. Sem pressa: o carrossel gira devagar. Sugira dizer "um, dois, três… e recomeça", para que a ordem do trio salte aos olhos. Se errar, troca a figura com leveza e segue. Quando o carrossel volta a girar com os mesmos três amigos, o sorriso aparece sozinho, ao lado de um adulto paciente. É grátis e fica pronta para imprimir ou jogar online.`,

  // 2 — invitation
  `Venha rodar o carrossel com o trem do seu filho! O ritmo ABC põe em fila três amigos todos diferentes, um depois do outro, e depois os mesmos três voltam na mesma ordem, como um carrossel que recomeça a volta. Na folha aparecem imagens de {N_PL} em que cada trio é todo diferente, e ao pequeno cabe continuar escolhendo quem recomeça a volta agora. Notar que dentro do trio ninguém se repete treina o olhar a guardar a ordem, uma capacidade que na escola vai servir muito. Aqui não se conta nada: segue-se o carrossel e o faz continuar. Não há nota chegando, só a curiosidade guiando. Convide-o a nomear os três amigos diferentes em fila — primeiro, segundo, terceiro — e a prever quem reabre a volta. Se puser na fila o vagão errado, é só dar risada e tentar de novo. Cada volta bem fechada é uma conquista que enche de orgulho, para viver como um carrossel rodado juntos. É grátis e fica pronta para imprimir ou jogar online.`,

  // 3 — question
  `Quem recomeça a volta? No ritmo ABC desfilam sempre três amigos todos diferentes — primeiro, segundo, terceiro — e depois os mesmos três voltam na mesma ordem. As imagens de {N_PL} formam trios em que nada se repete, e a criança reconhece isso e continua o trem com a figura certa. Aqui não se conta, só se olha: quem vem primeiro, quem segundo, quem terceiro, e qual é o próximo vagão que reabre a volta. Guardar a ordem dos três diferentes diverte e prepara com carinho para a escola. Nenhum cronômetro marca o tempo: vai-se devagar. Provoque com perguntinhas — quais três figuras diferentes você vê em fila, qual reabre o trio — e dê espaço para pensar. Se mudar de ideia, repõe na fila outra figura e segue tranquilo. Fechar a volta reforça a atenção e a confiança em si. É um convite simples a ficar pertinho e a saborear junto a alegria de um carrossel que recomeça bem. É grátis e fica pronta para imprimir ou jogar online.`,

  // 4 — metaphor
  `Imagine um semáforo: vermelho, amarelo, verde, e depois de novo vermelho, amarelo, verde, sempre na mesma ordem. É assim que gira o ritmo ABC: três figuras todas diferentes, uma atrás da outra, e depois as mesmas três do começo. Olhando {GEN_ART} {GEN}, a criança descobre que cada trio é feito de três amigos diferentes e que a ela cabe fazer a volta recomeçar. A tarefa é doce: guardar na cabeça a ordem dos três e acrescentar o próximo vagão. Nomeando com a voz "primeiro, segundo, terceiro", o pequeno treina o olhar para o ritmo, sem contar nada. Nenhuma corrida, só o prazer de ver as luzes mudarem. Convide-o a fazer três sons diferentes, "bip, bop, bup", para que a ordem do trio se ouça na hora. Se errar, sem medo: corrige com um sorriso. Cada semáforo completado é uma pequena conquista, perfeita para viver lado a lado, sem nenhuma pressão. É grátis e fica pronta para imprimir ou jogar online.`,

  // 5 — reassurance-first
  `Aqui é só ficar tranquilo: olha-se um carrossel de três amigos e faz-se ele recomeçar, com calma e com gosto. O ritmo ABC põe em fila três figuras todas diferentes, sempre na mesma ordem, que depois recomeça do começo. Nesta folha, a criança observa imagens de {N_PL} em que dentro do trio nada se repete e entende qual próximo vagão acrescentar. Não precisa contar nada: basta guardar quem vem primeiro, segundo e terceiro. Esse lembrar a ordem dos três diferentes é uma verdadeira habilidade de base, porque treina o olhar para o ritmo, útil mais adiante para ler e escrever. Sem corrida nem pontuação, só o olhar curioso e a vontade de tentar. Estimule-o a apontar os três amigos diferentes em fila, para que a continuação fique clara. Se mudar de ideia, repõe na fila com tranquilidade. Fazer a volta recomeçar faz bem à confiança, para saborear junto com tempos macios. É grátis e fica pronta para imprimir ou jogar online.`,

  // 6 — scene
  `Imagine três bandeirinhas de cores diferentes penduradas num cordãozinho: uma vermelha, uma amarela, uma azul, e depois de novo vermelha, amarela, azul, sempre nessa ordem. É o ritmo ABC. Nesta folha da educação infantil as imagens de {N_PL} estão penduradas bem assim, em trios em que cada figura é diferente. A criança lê a fileira de bandeirinhas e acrescenta a que falta para fazer a volta recomeçar. Tudo está em guardar a ordem dos três diferentes e em continuá-la, uma habilidade calma que na escola vai contar cedo. Aqui não se conta nada, só se reconhece quem vem primeiro, segundo e terceiro. O cordãozinho já está pendurado de propósito, então ao pequeno basta continuá-lo. Convide-o a nomear as cores "vermelha, amarela, azul" até entender qual reabre a volta. Diante de um erro, basta um sorriso e uma nova bandeirinha. Quando acerta, a segurança da criança cresce um pouquinho, num clima sempre sereno e carinhoso. É grátis e fica pronta para imprimir ou jogar online.`,

  // 7 — observe-the-rhythm
  `Guarda na cabeça os três amigos diferentes! Nesta folha da educação infantil, cada trio do ritmo ABC põe em fila três figuras todas diferentes — primeiro, segundo, terceiro — e depois as mesmas três recomeçam. A criança observa imagens de {N_PL} em que dentro do grupo nada se repete e continua o trem com o próximo vagão. Não há número nenhum para escrever: lembra-se a ordem dos três e faz-se a volta recomeçar. Guardar a fila dos diferentes é uma preciosa habilidade de base para os aprendizados futuros. Sem cronômetro, sem nota, só o gosto de olhar. Acompanhe-o com perguntinhas doces — quais três figuras diferentes chegam em fila, qual reabre o trio — e o deixe ir no seu próprio passo. Se um vagão quebra a ordem, escolhe outro com serenidade. Cada volta bem guardada na cabeça é uma pequena alegria para festejar, vivida junto com doçura. É grátis e fica pronta para imprimir ou jogar online.`,

  // 8 — classic-worksheet
  `Uma brincadeira de sempre, simples e queridíssima: o trem do carrossel de três, ritmo ABC, aqui pensado para a educação infantil. Cada trio é feito de três amigos todos diferentes em fila, e depois os mesmos três recomeçam em ordem. Nesta folha, a criança observa {GEN_ART} {GEN} e vê os três vagões diferentes desfilarem um depois do outro, reconhece o princípio e faz o trem recomeçar com a figura certa. Sem números nem contagens: importa só guardar a ordem e seguir. Essa capacidade de lembrar a fila dos diferentes reforça a concentração, um belo preparo para a escola. Nenhuma pressa marca o trabalho: vai-se com calma. Estimule-o a nomear os três amigos diferentes em fila — primeiro, segundo, terceiro — e a adivinhar quem reabre a volta. Se errar um lugar, troca com leveza e recomeça. Fazer o carrossel recomeçar vira um momento precioso de observação, para saborear junto com tempos calmos e muita gentileza. É grátis e fica pronta para imprimir ou jogar online.`,
];

const P2_ABC = [
  `O trem gira em trios no ritmo ABC: três figuras todas diferentes em fila, depois as mesmas três na mesma ordem. A criança guarda na cabeça a ordem dos três e acrescenta o próximo vagão para reabrir a volta. Capta o trio observando, sem contar nada, e faz o trem recomeçar. Lembrar a fila dos diferentes é uma preciosa habilidade de base, para saborear no seu ritmo, sem pressa e sem nota. É grátis, para imprimir ou jogar online.`,

  `Quem recomeça a volta? Dessa pergunta nasce a brincadeira. Olhando imagens de {N_PL} que desfilam em três diferentes em fila, o pequeno reconhece o ritmo ABC e continua com a figura certa. É um exercício tranquilo de atenção, nunca de contagem, para viver junto com palavras gentis; se quebrar a ordem do trio, tenta-se outro com um sorriso. É grátis, para imprimir.`,

  `Façam o carrossel juntos: três amigos diferentes desfilam em fila e depois recomeçam, e a criança escolhe quem reabre a volta. Sugira nomeá-los "primeiro, segundo, terceiro, e de novo", para entender qual próximo vagão recomeça o trio. Sem corrida e sem cronômetro, só o olhar curioso e a alegria de um carrossel feito recomeçar com capricho. Grátis, para imprimir ou jogar online.`,

  `Nesta página o pequeno encontra um carrossel no ritmo ABC já começado com {N_PL}. Com calma guarda na cabeça os três amigos diferentes em fila e continua, treinando o olhar para a ordem do trio e a paciência. É um doce momento de observação, perfeito para viver lado a lado: deixe fazer girar no seu ritmo e festejem cada volta bem fechada. É grátis, para imprimir ou jogar online.`,

  `Como um semáforo "vermelho, amarelo, verde", o ritmo ABC põe três figuras todas diferentes e depois recomeça. Olhando {GEN_ART} {GEN}, a criança guarda na cabeça a ordem do trio e continua o trem com o próximo vagão. Sem tempos a bater e sem pontos, importa só a alegria de nomear "primeiro, segundo, terceiro"; quando a volta recomeça, a confiança cresce um pouquinho. É grátis, para imprimir ou jogar online.`,

  `Este trem desfila em trios no ritmo ABC: três figuras todas diferentes em fila ao longo dos vagões. A criança observa imagens de {N_PL} em que nada se repete dentro do grupo e acrescenta a figura que reabre a volta. Não se conta nada, só se guarda a ordem. Acompanhe com perguntinhas leves e a deixe ir com calma; em poucos minutos tem uma boa ocupação tranquila e cheia de sentido. É grátis, para imprimir ou jogar online.`,

  `Um clássico trem para continuar, onde cada trio é todo diferente: três amigos em fila, nenhum repetido, e a criança faz a volta recomeçar com {N_PL}. Reconhece o ritmo ABC e escolhe o próximo vagão, até o fim. Elogie o empenho, não a velocidade, para que fazer o trio girar siga um prazer: brincadeira de olhares, nunca de números. É grátis, para imprimir ou jogar online.`,
];

/* ----------------------------------------------------------------- exports */
const H1 = {
  'null': 'Sequência AB com {H1} – para a educação infantil',
  'aab': 'Sequência AAB com {H1} – para a educação infantil',
  'abb': 'Sequência ABB com {H1} – para a educação infantil',
  'aabb': 'Sequência AABB com {H1} – para a educação infantil',
  'abc': 'Sequência ABC com {H1} – para a educação infantil',
};
const CAR = {
  'null': 'Sequência (AB) – ',
  'aab': 'Sequência (AAB) – ',
  'abb': 'Sequência (ABB) – ',
  'aabb': 'Sequência (AABB) – ',
  'abc': 'Sequência (ABC) – ',
};

module.exports = {
  type: 'pattern-train',
  eyebrow: 'Atividade: Sequência',
  strand: 'Padrões e sequências',
  level: 'educacao-infantil',
  slotWord: 'sequencia',
  h1: (mk) => H1[mk] || H1['null'],
  carousel: (mk, themeH1) => (CAR[mk] || CAR['null']) + themeH1,
  modes: {
    'null': { SKEL: SKEL_AB, P2: P2_AB },
    'aab': { SKEL: SKEL_AAB, P2: P2_AAB },
    'abb': { SKEL: SKEL_ABB, P2: P2_ABB },
    'aabb': { SKEL: SKEL_AABB, P2: P2_AABB },
    'abc': { SKEL: SKEL_ABC, P2: P2_ABC },
  },
  P3: `Se a criança gostou de ler os ritmos e de continuar a sequência, pode seguir com outras folhas vizinhas, como {nb1} ou {nb2}. São brincadeiras tranquilas de observação, perfeitas para treinar o olhar nas sequências enquanto ela explora {GEN_ART} {GEN}. Cada folha dá para imprimir ou jogar online, como preferirem. Vivam juntos com tempos calmos, sem cronômetro e sem nota, só pelo prazer de descobrir qual é o próximo vagão e levar a sequência até o fim.`,
};
