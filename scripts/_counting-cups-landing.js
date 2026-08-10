/* =====================================================================
   _counting-cups-landing.js — the eleven ToolEntry landing records.
   Each is the native panel's own copy, not a translation of the English.
   ⚠ EIGHT REQUIRED FIELDS: slug · name · tagline · about[] · howToUse[]
   · classroomIdeas[] · metaTitle · metaDescription. #42 shipped five and
   failed the static export of all eleven landings after two guards had
   reported success.
   ⚠ Every slug is ASCII-folded to its OWN locale's rule — da folds ø→oe
   and å→aa, no folds ø→o, so the two never collide.
   ===================================================================== */
'use strict';
module.exports = {

  en: {
    slug: 'counting-cups-grouping-tens-place-value',
    name: 'The Counting Cups',
    tagline: 'Too many to be worth counting one at a time — so the class scoops them ten at a time, and the number builds itself.',
    about: [
      'Chips lie scattered across a mat, deliberately far too many to count one by one. Press the mat anywhere and a round scoop lifts whatever happens to be under your finger — never an agreed number — into a cup at the edge. A cup holds ten and shuts itself the moment the tenth chip lands, so nobody has to decide when a ten is a ten.',
      'The readout above the mat has three places and refuses to guess. Digits appear as cups close, but the ones place stays a question mark for as long as another ten could still be made — and the instant it cannot, all three settle together. The number arrives because the material stopped changing, not because a machine knew it.',
      'Ten closed cups nest into one stack, and that stack is a hundred. Two buttons add or take away a single chip, and taking one from a bare mat breaks a closed cup open — the borrow, done with hands long before it is a written rule. No score, no timer, nothing marked right or wrong: the child chooses where to scoop and the tool never corrects them.'
    ],
    howToUse: [
      'Choose the size of the heap and project it before anyone touches the board. Ask how many there are, and let the question stand — nobody in the room knows, including you.',
      'Let a child press wherever they like. The scoop takes what is there, so the haul is different every time, and where to aim is the whole decision.',
      'Stop the first time a cup shuts itself and ask why it stopped at ten. Then look at the readout: why is the ones place still a question mark?',
      'Work until the mat cannot give another ten and the three digits settle together. Only then read the number aloud, pointing at the cups it came from.'
    ],
    classroomIdeas: [
      'Guess first: everyone writes a guess before the first press, and the guesses come out only once the digits have settled. Nobody wins — the point is who thought in tens.',
      'Two children, one heap: one takes big scoops from the thick middle, the other small ones from the edge. Different number of presses, same number at the end.',
      'Empty the mat, then press take-one-away and watch a closed cup break open. Ask what just happened before anyone is allowed to say the word "borrow".'
    ],
    metaTitle: 'The Counting Cups — grouping in tens, K to Grade 2',
    metaDescription: 'Free whiteboard tool: far too many chips to count one at a time, so the class scoops them into cups of ten and the number builds itself.'
  },

  de: {
    slug: 'zehnerdosen',
    name: 'Die Zehnerdosen',
    tagline: 'Zu viele zum Zählen — bis die Zehner in den Dosen stehen.',
    about: [
      'Auf dem Teppich liegen viel zu viele Plättchen, um sie einzeln zu zählen — genau der Moment, in dem Kinder anfangen und sich bei dreißig verzählen.',
      'Ein Fingertipp schöpft auf, was gerade darunterliegt: mal drei, mal sieben, nie eine feste Zahl. Die Dose füllt sich, und bei zehn schließt sie sich von selbst.',
      'Die Anzeige über dem Teppich rät nicht. Sie zeigt so lange Fragezeichen, wie noch ein Zehner entstehen könnte, und erst wenn keiner mehr möglich ist, steht die Zahl da — gebaut, nicht geraten.'
    ],
    howToUse: [
      'Wählt zusammen, wie viel auf dem Teppich liegen soll: eine Handvoll, ein Haufen oder ein ganzer Berg.',
      'Ein Kind tippt irgendwo auf den Teppich. Fragt vorher: Wie viele holen wir wohl? Die Klasse sieht sofort, dass niemand das vorher weiß.',
      'Sammelt weiter, bis sich eine Dose schließt. Zehn Dosen rutschen zu einem Turm zusammen — das ist die Hundert.',
      'Erst wenn der Teppich leer ist, steht die Zahl vollständig da. Lest sie gemeinsam vor und zeigt dabei auf die Dosen, die dazugehören.'
    ],
    classroomIdeas: [
      'Schätzen vor dem Schöpfen: Alle zeigen mit den Fingern, wie viele Dosen es am Ende wohl werden. Nachher vergleichen — ohne richtig und falsch, nur schauen, wer nah dran war.',
      'Zwei Kinder schöpfen abwechselnd an ganz verschiedenen Stellen. Am Ende steht dieselbe Zahl da: Der Weg ist frei, das Ergebnis nicht.',
      'Nehmt bei leerem Teppich ein Plättchen weg. Eine volle Dose muss aufgehen — das ist genau das Bündel, das beim schriftlichen Rechnen entbündelt wird, nur zum Anfassen.'
    ],
    metaTitle: 'Zehnerdosen: Bündeln und Stellenwert bis 100',
    metaDescription: 'Viel zu viele Plättchen zum Einzelnzählen: schöpfen, in Zehnerdosen füllen, bündeln. Zahlenraum bis 100, Klasse 1 und 2 — kostenloses Werkzeug.'
  },

  fr: {
    slug: 'groupement-par-dix-cp',
    name: 'Les barquettes de dix',
    tagline: "Bien trop de jetons pour les compter un à un : on en ramasse une pleine main, la barquette se ferme toute seule au dixième — et l'écran refuse d'annoncer le total tant qu'une dizaine peut encore se faire.",
    about: [
      "Sur la nappe, des jetons renversés en vrac : bien trop pour être comptés un à un, et c'est précisément le problème. Appuyez à un endroit de la nappe : ce qui se trouve sous le doigt part dans la barquette posée sur le côté. Personne ne sait à l'avance combien de jetons partent — ni vous, ni la classe. Au dixième, la barquette se ferme d'elle-même : la dizaine n'a pas été décrétée, elle s'est faite.",
      "Au-dessus de la nappe, trois cases attendent, et elles refusent de deviner. Tant qu'il reste de quoi faire une dizaine de plus, l'écran ne dit rien du total. Il n'annonce que lorsqu'il ne peut plus rien se passer. C'est ce silence qui fait parler la classe : combien y en a-t-il, à votre avis ?",
      "Deux boutons ajoutent ou enlèvent un seul jeton. Enlever un jeton quand la nappe est vide oblige une barquette fermée à s'ouvrir : le cassage de la dizaine se voit avant d'être une technique écrite. Rien n'est noté juste ou faux, il n'y a ni score, ni chronomètre, ni correction."
    ],
    howToUse: [
      "Choisissez ce qu'il y a sur la nappe — une pleine main, un tas, un déluge — puis projetez sans rien annoncer, et laissez la classe constater qu'on ne peut pas compter cela un à un.",
      "Faites désigner un endroit de la nappe par un élève, appuyez, et regardez ensemble ce qui part dans la barquette.",
      "Au dixième jeton, laissez la barquette se fermer toute seule et faites dire la phrase à voix haute : dix jetons font une dizaine.",
      "Quand l'écran finit par annoncer les centaines, les dizaines et les unités, faites relire l'ensemble en montrant les piles, les barquettes et les jetons restés sur la nappe."
    ],
    classroomIdeas: [
      "Le pari du ramassage : avant chaque appui, la classe annonce si la barquette va se fermer ce coup-ci ou non. On appuie, on regarde, on ne corrige personne.",
      "Deux chemins, un même nombre : refaites la même nappe deux fois, une fois en ramassant au hasard, une fois en visant les endroits les plus fournis. Le nombre final est le même, le nombre d'appuis ne l'est pas.",
      "Le cassage avant la technique : mettez toutes les barquettes en place, puis n'enlevez que des jetons un par un. Au moment où une barquette s'ouvre, arrêtez-vous."
    ],
    metaTitle: 'Grouper par dix au CP — les barquettes de dix',
    metaDescription: "Trop de jetons pour les compter un à un : on ramasse, la barquette se ferme au dixième, et l'écran n'annonce rien tant qu'une dizaine peut se faire."
  },

  es: {
    slug: 'botes-de-diez-agrupar-decenas-valor-posicional',
    name: 'Los botes de diez',
    tagline: 'Un montón de fichas imposible de contar una a una: la clase las recoge de diez en diez, cada bote se cierra solo al llegar a diez y el visor se niega a adivinar.',
    about: [
      'Sobre la mesa caen muchas fichas: demasiadas para contarlas una a una, que es justo el problema. Al tocar la mesa aparece una boca redonda que recoge lo que haya debajo — nunca una cantidad fija — y lo lleva a un bote. En cada bote caben diez, y el bote se cierra solo en cuanto entra la décima ficha.',
      'Los botes cerrados se quedan en el estante, y diez botes se encajan en una torre que vale cien. Encima de la mesa hay un visor de tres casillas que no adivina: mientras todavía pueda formarse otro diez, las unidades siguen siendo un interrogante. Cuando ya no cabe otro diez, las tres cifras se colocan a la vez.',
      'Dos botones ponen o quitan una sola ficha. Quitar una cuando la mesa está pelada obliga a abrir un bote cerrado: sus diez fichas vuelven a la mesa y de ahí se retira una. No hay puntuación, ni cronómetro, ni respuestas buenas o malas.'
    ],
    howToUse: [
      'Elige cuántas fichas caen sobre la mesa y proyéctalas para toda la clase. Antes de tocar nada, pregunta cuántas parecen: nadie lo sabe, y ése es el punto de partida.',
      'Un alumno toca la mesa y recoge lo que haya bajo el dedo. Al llegar a diez, el bote se cierra solo: parad ahí la primera vez.',
      'Mirad el visor mientras trabajáis: las unidades siguen con interrogante mientras aún quepa otro diez. Preguntad por qué el instrumento no se atreve a decir el número todavía.',
      'Cuando la mesa quede vacía, leed las tres cifras juntos. Después, con los botones, quitad una ficha y ved abrirse un bote cerrado.'
    ],
    classroomIdeas: [
      'Recogida a ciegas: antes de empezar, cada niño escribe en su pizarra cuántas fichas cree que hay. Al final se comparan las estimaciones con las tres cifras.',
      'El mismo montón, dos caminos: dos alumnos recogen la misma cantidad tocando sitios distintos de la mesa. Salen los mismos botes y la misma cifra.',
      'La torre del jueves: dejad el instrumento con una cantidad grande y recoged un poco cada día hasta armar la torre de cien.'
    ],
    metaTitle: 'Los botes de diez — agrupar de diez en diez | Primaria',
    metaDescription: 'Instrumento gratuito para la pizarra digital: la clase recoge fichas de diez en diez, cada bote se cierra al llegar a diez y diez botes hacen cien.'
  },

  pt: {
    slug: 'potinhos-de-dez-agrupamento-e-valor-posicional',
    name: 'Os potinhos de dez',
    tagline: 'Fichas demais para contar uma a uma: a concha recolhe um pouco de cada vez, o potinho fecha sozinho no décimo — e o visor se recusa a dizer o total.',
    about: [
      'Na tela há um tabuleiro com fichas espalhadas — muitas, de propósito. Aperte o tabuleiro onde quiser e uma concha redonda se abre embaixo do dedo, levando para o potinho o que estiver ali: nunca uma quantidade combinada, sempre o que der. O potinho guarda dez e fecha sozinho quando a décima ficha entra.',
      'O que faz esta ferramenta é o visor de três casas, que começa com três interrogações e se recusa a chutar. As casas vão aparecendo conforme os potinhos fecham, mas a casa das unidades continua interrogada enquanto ainda for possível fazer mais uma dezena — e as três só se acomodam juntas no instante em que não dá mais.',
      'Dois botões colocam ou tiram uma ficha só. Tirar uma ficha de um tabuleiro vazio abre um potinho fechado: é a troca do empréstimo acontecendo por necessidade, e não porque alguém mandou. Não há pontuação, não há cronômetro e nada é marcado como certo ou errado.'
    ],
    howToUse: [
      'Escolha quanto derramar no tabuleiro e projete antes de a turma entrar. Pergunte quantas fichas há — e deixe os palpites no ar, sem confirmar nenhum.',
      'Chame uma criança para apertar o tabuleiro onde ela quiser. Repita com outras crianças e não interfira na escolha do lugar.',
      'Quando um potinho fechar, aponte o visor: uma casa apareceu e a das unidades continua interrogada. Pergunte por que o visor ainda não sabe.',
      'Recolha até não dar mais para fazer uma dezena e deixe as três casas se acomodarem juntas. Só então escreva o número no quadro.'
    ],
    classroomIdeas: [
      'Rode a mesma quantidade duas vezes, recolhendo em ordens diferentes do tabuleiro, e deixe as duas rodadas no quadro. O caminho muda, o número final não.',
      'Pare com o tabuleiro quase vazio e pergunte se já dá para dizer o total. Enquanto sobrar ficha suficiente para mais uma dezena, a resposta honesta é a mesma do visor.',
      'Tire uma ficha de um tabuleiro vazio, na frente de todos, e deixe um potinho se abrir sozinho. Pergunte por que foi preciso abrir.'
    ],
    metaTitle: 'Agrupamento e valor posicional: os potinhos de dez',
    metaDescription: 'Contar uma coleção grande sem contar de um em um: a turma recolhe as fichas em potinhos de dez, empilha dez potinhos e lê centenas, dezenas e unidades.'
  },

  it: {
    slug: 'secchielli-da-dieci-valore-posizionale',
    name: 'I secchielli da dieci',
    tagline: 'Troppi gettoni per contarli a uno a uno: si raccolgono dieci alla volta, e il numero non si sbilancia finché si può ancora fare un secchiello.',
    about: [
      'Una tovaglia coperta di gettoni: a volte una manciata, a volte una montagna. Contarli a uno a uno è proprio la strada che non vogliamo, ed è per questo che ce ne sono così tanti. Il bambino appoggia il dito dove vuole e si porta via quello che c’era sotto: mai un numero deciso dallo strumento. Quando nel secchiello arriva il decimo gettone, il secchiello si chiude da solo.',
      'Il numero in alto ha tre posti e non se ne inventa nessuno. Le cifre compaiono via via che i secchielli si chiudono, ma il posto delle unità resta con il punto interrogativo finché sulla tovaglia c’è ancora abbastanza per fare un altro secchiello: solo quando quel dieci non è più possibile le tre cifre si posano tutte insieme.',
      'I due tasti aggiungono e tolgono un gettone alla volta. Togliere quando la tovaglia è vuota apre un secchiello chiuso e ne rovescia fuori i dieci: il prestito non viene spiegato, viene fatto vedere. Nessun punteggio, nessun tempo, nessun «bravo».'
    ],
    howToUse: [
      'Proiettate la tovaglia già piena e chiedete solo: sono tanti o pochi? Fate scommettere la classe ad alta voce prima di toccare qualsiasi cosa.',
      'Chiamate un bambino alla LIM e lasciategli scegliere il punto. Chiedete alla classe di guardare il secchiello, non la tovaglia: quanti posti restano ancora liberi?',
      'Quando il primo secchiello si chiude, fermatevi. Chiedete perché si è chiuso da solo e chi ha deciso di fermarsi a dieci.',
      'Alla fine leggete insieme il numero: centinaia, decine, unità. Poi togliete un gettone dalla tovaglia vuota e lasciate che vedano un secchiello aprirsi da solo.'
    ],
    classroomIdeas: [
      'Fate due prese diverse sulla stessa tovaglia in due giorni diversi e fate notare che il numero finale è identico. Quanti gettoni si prendono per volta non cambia quanti sono.',
      'Coprite il numero in alto con un foglio e chiedete la stima quando i secchielli sono già in fila ma la tovaglia non è ancora finita. Poi scoprite.',
      'Fermatevi sulla torre. Dieci secchielli spariscono e ne resta uno solo: chiedete quanti gettoni sono e non accontentatevi di «cento», fatevi dire perché.'
    ],
    metaTitle: 'I secchielli da dieci — valore posizionale in prima',
    metaDescription: 'Troppi gettoni per contarli a uno a uno: la classe li raccoglie dieci alla volta e il numero si scrive da sé. Per la LIM, senza timer né punteggio.'
  },

  nl: {
    slug: 'tienkokers-tientallen-en-eenheden-groep-3-4',
    name: 'De Tienkokers',
    tagline: 'Veel te veel om te tellen — dus schep je het bij tien tegelijk op.',
    about: [
      'Er ligt een berg fiches op de mat, veel te veel om één voor één te tellen. Tik op de mat en er verschijnt een schep die precies oppakt wat er onder zit — nooit een afgesproken aantal, gewoon wat daar toevallig ligt. Die fiches vallen in een koker, en zodra de tiende erin valt gaat de koker vanzelf dicht: tien is tien, daar hoeft niemand over te stemmen.',
      'Het bijzondere zit in wat het scherm níét doet. De uitlezing heeft drie vakjes en vult ze pas als ze zeker zijn: zolang er nog een tiental van de mat te halen valt, blijven de eenheden een vraagteken staan. Tien volle kokers schuiven in elkaar tot één stapel, en die stapel is honderd.',
      'Haal je er één fiche af terwijl de mat leeg is, dan gaat er een koker open: lenen is hier geen regel maar iets wat je ziet gebeuren. Geen timer, geen score, geen goed of fout — en de omkering in onze telwoorden laten we bewust aan het Getallenlab.'
    ],
    howToUse: [
      'Kies hoeveel er op de mat komt en laat de klas eerst kijken: kunnen we dit tellen? Het antwoord is nee, en dat is precies het startpunt.',
      'Laat een kind zelf kiezen waar het schept. Een dicht stuk levert veel in één keer op, een leeg hoekje niets — dat verschil is het gesprek waard.',
      'Wijs op de uitlezing zodra de eerste koker dichtgaat: waarom staat er al een tiental, maar nog een vraagteken bij de eenheden?',
      'Werk door tot de mat leeg is en de drie cijfers tegelijk op hun plaats vallen. Vraag pas dán hoeveel het er waren.'
    ],
    classroomIdeas: [
      'Schatten vooraf: laat de klas eerst roepen hoeveel het er zijn, schrijf de schattingen op het bord en vergelijk pas aan het eind. Wie dacht in tienen, zat dichtbij.',
      'Voorspel de laatste koker: als er nog een handvol op de mat ligt, vraag dan of die nog vol wordt. De vraagtekens in de uitlezing stellen die vraag al voor je.',
      'Haal er één af van een lege mat en laat de klas zien hoe een koker opengaat. Doe daarna dezelfde beweging op papier met een som onder elkaar.'
    ],
    metaTitle: 'De Tienkokers – tientallen maken, groep 3-5',
    metaDescription: 'Gratis digibordmateriaal: te veel fiches om te tellen, dus schep je ze bij tien tegelijk in kokers. Tientallen en positiewaarde, groep 3-5.'
  },

  sv: {
    slug: 'bunta-i-tiotal-rakna-stora-antal-lagstadiet',
    name: 'Tioaskarna',
    tagline: 'Fler brickor än någon orkar räkna en och en. Klassen skopar upp dem tio i taget, askarna stänger sig själva, och rutorna säger ingenting förrän ingen tia till går att göra.',
    about: [
      'Brickorna ligger utspridda över bordet, alldeles för många för att räknas en och en. Klassen trycker där den vill, skopan tar upp det som råkar ligga just där, och när den tionde brickan landar stänger asken sig själv.',
      'Tio stängda askar blir ett torn, och tornet är hundra. Nere vid kanten står tre rutor som vägrar gissa: entalet står kvar som ett frågetecken så länge ytterligare en tia kan bildas, och först när den inte kan det faller alla tre på plats samtidigt.',
      'Det är positionssystemet sett bakifrån — talet växer fram ur bordet i stället för att skrivas upp på tavlan, och läraren behöver aldrig säga om det blev rätt.'
    ],
    howToUse: [
      'Välj hur stor högen ska vara — en handfull, en hög eller ett helt berg — och låt klassen säga vad de tror innan någon börjar.',
      'Låt barnen turas om att trycka på bordet. Skopan tar det som ligger just där, varken mer eller mindre, och asken stänger sig själv vid tio.',
      'Stanna vid rutorna och fråga varför entalet fortfarande är ett frågetecken. Svaret är att det ligger brickor kvar som skulle kunna bli en tia till.',
      'Ta bort en bricka när bordet är tomt och låt klassen se en stängd ask öppna sig igen. Där ser de vad det innebär att låna.'
    ],
    classroomIdeas: [
      'Gissa först: varje barn skriver sin gissning på en lapp innan första trycket, och lapparna plockas fram när rutorna har fallit på plats.',
      'Två barn, samma hög: den ena skopar med små tryck i kanten, den andra med stora tryck mitt i. Det tar olika många tryck och blir lika många askar.',
      'Stanna vid frågetecknet. Låt klassen argumentera för vad entalet kommer att bli innan sista tian görs klar, skriv förslagen på tavlan och jämför sedan.'
    ],
    metaTitle: 'Tioaskarna – bunta i tiotal och ental, åk 1–2',
    metaDescription: 'Brickorna är för många för att räknas en och en. Klassen skopar upp tio i taget, askarna stänger sig själva och rutorna gissar aldrig. Åk 1–2 i Lgr22.'
  },

  da: {
    slug: 'taelleaeskerne',
    name: 'Tælleæskerne',
    tagline: 'Alt for mange til at tælle ét ad gangen — så øs dem op ti ad gangen.',
    about: [
      'På bordet ligger der langt flere brikker, end nogen kan tælle ét ad gangen. Tryk på bordet, og der åbner sig en mund, som løfter præcis det, der lå under fingeren — aldrig et fast antal — op i en æske ved kanten. Æsken rummer ti, og den lukker sig selv i samme øjeblik den tiende brik lander. Ti lukkede æsker sætter sig sammen til ét tårn, og tårnet er hundrede.',
      'Aflæsningen står med tre tomme pladser og nægter at gætte. Cifrene dukker op, efterhånden som æskerne lukker, og enerpladsen bliver ved med at være tom, så længe der kan blive én tier mere — først når det ikke længere kan lade sig gøre, falder alle tre på plads på én gang.',
      'Netop på dansk er det arbejdet værd. I fireogtredive siges 4-tallet først, selvom det står sidst — her bygges tierne først og enerne til sidst, tro mod det, hænderne gør. Der er ingen point, intet stopur og intet rigtigt eller forkert.'
    ],
    howToUse: [
      'Vælg, hvor meget der skal ligge på bordet, og vis det på den interaktive tavle, før nogen trykker — spørg klassen, om det overhovedet kan tælles ét ad gangen.',
      'Lad et barn trykke rundt på bordet. Hver gang æsken bliver fuld, lukker den sig selv, og en ny åbner.',
      'Kig på aflæsningen undervejs: hvorfor står enerpladsen stadig tom? Spørgsmålet er hele lektionen.',
      'Brug de to knapper til at lægge én brik til eller tage én væk. Når der ikke er flere løse brikker, må en lukket æske brydes op.'
    ],
    classroomIdeas: [
      'Gæt først: lad klassen skrive et bud, før der øses. Sammenlign til sidst — buddet er tænkning, ikke et facit.',
      'Den tavse omgang: øs hele bordet op uden at sige et ord, og lad børnene bagefter forklare, hvorfor de tre cifre først faldt på plads til allersidst.',
      'Bryd en æske op med vilje: tag brikker væk, til en lukket æske må åbnes, og lad børnene sætte ord på, hvad der lige skete.'
    ],
    metaTitle: 'Tælleæskerne – tiere og enere, 1.-3. klasse',
    metaDescription: 'Gratis værktøj til klassen: alt for mange brikker til at tælle ét ad gangen. Øs dem op ti ad gangen i æsker, og se tallet vokse frem. Til 1.-3. klasse.'
  },

  no: {
    slug: 'telle-store-mengder-ti-om-gangen-plassverdi',
    name: 'Ti om gangen',
    tagline: 'Alt for mange til å telle én og én — så klassen øser ti om gangen, og tallet leser seg selv til slutt.',
    about: [
      'På matta ligger det altfor mange brikker til at noen kan telle dem én og én. Trykker du på matta, kommer det fram en rund munn under fingeren som løfter det som tilfeldigvis ligger der — aldri et bestemt antall — og legger det ned i ei eske ved kanten. Eska rommer ti, og den lukker seg selv i det tiende brikka lander. Ti lukkede esker går inn i hverandre og blir én stabel, og stabelen er hundre.',
      'Det som gjør verktøyet til noe annet enn en telleøvelse, er avlesningen: tre felt som nekter å gjette. Enerplassen står som spørsmålstegn så lenge det fortsatt kan bli en tier til, og i det øyeblikket det ikke kan det lenger, faller alle tre på plass samtidig.',
      'Å ta bort én når matta er bar, bryter opp ei lukket eske — det er lånet, gjort med hendene i stedet for med en regel. Det finnes ingen poeng, ingen klokke og ingen retting: barnet velger selv hvor det vil øse.'
    ],
    howToUse: [
      'Sett mengden på matta og vis den på storskjerm. Spør klassen hvor mange de tror det er — og la spørsmålet stå ubesvart.',
      'La en elev trykke der han eller hun vil på matta. Se hva som blir løftet: det er aldri det samme antallet to ganger.',
      'Stopp ved hver eske som lukker seg, og les avlesningen høyt sammen. Spør hvorfor enerplassen fortsatt står som spørsmålstegn.',
      'Hold på til matta ikke kan gi fra seg ti til. Da faller alle tre plassene på plass samtidig — og det er klassen som har gjort arbeidet.'
    ],
    classroomIdeas: [
      'Sikt bevisst: la ett barn øse midt i den tetteste haugen og et annet ute i kanten. Samme antall trykk, helt ulikt resultat — hvorfor?',
      'Dagens tall i samlinga: kjør én matte hver morgen i to uker, og la klassen merke selv at de begynner å se tiere før eskene lukker seg.',
      'Lånet med hendene: tøm matta helt, og trykk så «Ta bort en». Ei eske brytes opp foran øynene på dem.'
    ],
    metaTitle: 'Ti om gangen – tiergrupper og plassverdi, 1.–3. trinn',
    metaDescription: 'Gratis verktøy for storskjermen: altfor mange brikker til å telle én og én. Klassen øser ti om gangen ned i esker, og tallet leser seg selv. 1.–3. trinn.'
  },

  fi: {
    slug: 'kymmenjarjestelma-paikka-arvo-kymppirasiat-alkuopetus',
    name: 'Kymppirasiat',
    tagline: 'Liian iso kasa laskettavaksi — kauho se rasioihin, ja kymmenet syntyvät itsestään.',
    about: [
      'Pöydälle kaadetaan nappuloita niin paljon, ettei niitä voi laskea yksi kerrallaan — juuri se on koko idea. Lapsi painaa pöytää mistä kohtaa haluaa, kauha nostaa sen, mitä sormen alla sattuu olemaan, eikä koskaan valmiiksi kymmentä. Rasia laskee itse ja napsahtaa kiinni kymmenennen nappulan kohdalla, joten kymmenen ei ole ohje vaan tapahtuma.',
      'Näyttö on kolme paikkaa: sadat, kymmenet ja ykköset. Se kieltäytyy arvaamasta. Ykkösten paikalla lukee "ei vielä tietoa" niin kauan kuin pöydältä voisi vielä syntyä yksi kymmenen — ja sillä hetkellä, kun ei voisi, kaikki kolme asettuvat yhtä aikaa.',
      'Kun kymmenen rasiaa on hyllyssä, ne asettuvat sisäkkäin yhdeksi torniksi, ja torni on sata. Vähennysnappi tekee saman toisin päin: tyhjältä pöydältä ei voi ottaa mitään, joten rasia avataan ja sen kymmenen nappulaa palaavat pöydälle.'
    ],
    howToUse: [
      'Heijasta Kymppirasiat taululle ja valitse, kuinka paljon pöydälle kaadetaan: kourallinen, kasa vai valtava kasa. Kysykää ensin ääneen, voisiko tämän laskea yksitellen.',
      'Anna lapsen painaa pöytää itse valitsemastaan kohdasta. Katsokaa yhdessä, montako nappulaa kauha sattui nostamaan — se on eri luku joka kerta.',
      'Pysähtykää sillä hetkellä, kun rasia napsahtaa kiinni, ja lukekaa näyttö ääneen. Kysy, miksi ykkösten paikka on yhä tyhjä, vaikka pöydällä on nappuloita.',
      'Kauhokaa loppuun asti ja katsokaa, kuinka kaikki kolme paikkaa asettuvat samalla hetkellä. Painakaa lopuksi vähennysnappia tyhjällä pöydällä.'
    ],
    classroomIdeas: [
      'Arvaus ennen kauhomista: kaada valtava kasa ja pyydä luokkaa arvaamaan, montako rasiaa siitä tulee. Kirjatkaa arviot taululle ennen ensimmäistä painallusta.',
      'Miksi näyttö vaikenee? Pysäyttäkää työ silloin, kun ykkösten paikalla lukee "ei vielä tietoa", ja pyytäkää perusteluja.',
      'Sama määrä, eri reitti: antakaa kahden lapsen kauhoa sama kasa aivan eri kohdista ja eri suuruisina nostoina. Verratkaa lopputuloksia.'
    ],
    metaTitle: 'Kymppirasiat – kymmenet ja sadat näkyviksi | Ilmainen',
    metaDescription: 'Maksuton väline koko luokalle: kauho liian iso kasa rasioihin, jotka sulkeutuvat itsestään kymmenen kohdalla. Näyttö ei arvaa lukua ennen aikojaan.'
  }
};
