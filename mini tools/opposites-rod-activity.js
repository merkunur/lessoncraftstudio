/* =====================================================================
   opposites-rod-activity.js — ACTIVITY #72 of the one-by-one rebuild:
   "Quill's Mirror Market" → THE TWO-ENDED ROD (K.L.5.b, 11 locales).
   Design sheet: docs/activities-rebuild/designs/072-opposites.md
   ---------------------------------------------------------------------
   THE INVENTION: every pair of opposites lives on one rod. Put a card on
   the rod and it slides to where its meaning lives: the opposite runs to
   the far end and clicks into the clip; a middle word stops at the middle
   groove; a same-meaning word parks beside the target; a word from another
   family bumps the rod and falls back; left lands on the crossing rod.
   Levels: pictures (+ a bedtime scene), same or opposite, pair up,
   sentences (pick a card or write the word), prefix clips (hang a clip at
   the far end and push the word: only the right clip closes on it).

   ACTIVITY LAYER ONLY: the model is opposites-rod-core.js; lcs-shell.js and
   opposites-core.js are untouched (the shell's Check is hidden and pressed
   by this activity on success). Test seams:
   window.OppositesRodActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var OppositesRodActivity = {
  id: 'opposites-rod',
  apparatusClasses: ['tr-'],

  strings: {
    title:       {en:'Quill\'s Mirror Market',de:'Quills Spiegelmarkt',nl:'De spiegelmarkt van Quill',da:'Quills spejlmarked',sv:'Quills spegelmarknad',no:'Quills speilmarked',es:'El mercado de espejos de Quill',it:'Il mercato degli specchi di Quill',pt:'O mercado de espelhos do Quill',fr:'Le marché aux miroirs de Quill',fi:'Quillin peilitori'},
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    quote:       {en:'“{w}”',de:'„{w}“',nl:'‘{w}’',da:'»{w}«',sv:'”{w}”',no:'«{w}»',es:'“{w}”',it:'«{w}»',pt:'“{w}”',fr:'« {w} »',fi:'”{w}”'},
    tPictures:   {en:'Find the opposite — the other end of the rod!',de:'Finde das Gegenteil – das andere Ende der Stange!',nl:'Zoek het tegenovergestelde – het andere eind van de stang!',da:'Find det modsatte – den anden ende af stangen!',sv:'Hitta motsatsen – den andra änden av stången!',no:'Finn det motsatte – den andre enden av stanga!',es:'Encuentra el contrario: ¡el otro extremo de la barra!',it:'Trova il contrario: l’altra estremità della sbarra!',pt:'Ache o contrário: a outra ponta da barra!',fr:'Trouve le contraire, à l’autre bout de la barre !',fi:'Etsi vastakohta – tangon toinen pää!'},
    tScene:      {en:'Bedtime! Tap each thing to send it to its other end.',de:'Schlafenszeit! Tippe jedes Ding an, dann rutscht es ans andere Ende.',nl:'Bedtijd! Tik op elk ding, dan glijdt het naar het andere eind.',da:'Sengetid! Tryk på hver ting, så glider den hen til den anden ende.',sv:'Läggdags! Tryck på varje sak, så glider den till andra änden.',no:'Leggetid! Trykk på hver ting, så glir den til den andre enden.',es:'¡Hora de dormir! Toca cada cosa para mandarla al otro extremo.',it:'È ora di dormire! Tocca ogni cosa per mandarla all’altra estremità.',pt:'Hora de dormir! Toque em cada coisa para mandá-la para a outra ponta.',fr:'C’est l’heure de dormir ! Touche chaque chose pour l’envoyer à l’autre bout.',fi:'Nukkumaanmenoaika! Napauta jokaista, niin se liukuu toiseen päähän.'},
    tSame:       {en:'Put each word where it belongs: same end or other end.',de:'Leg jedes Wort an seinen Platz: gleiches Ende oder anderes Ende.',nl:'Leg elk woord op zijn plek: hetzelfde eind of het andere eind.',da:'Læg hvert ord, hvor det hører til: samme ende eller den anden ende.',sv:'Lägg varje ord där det hör hemma: samma ände eller andra änden.',no:'Legg hvert ord der det hører hjemme: samme ende eller den andre enden.',es:'Pon cada palabra en su lugar: el mismo extremo o el otro extremo.',it:'Metti ogni parola al suo posto: la stessa estremità o l’altra.',pt:'Coloque cada palavra no lugar certo: a mesma ponta ou a outra ponta.',fr:'Place chaque mot au bon endroit : le même bout ou l’autre bout.',fi:'Laita jokainen sana paikalleen: samaan päähän tai toiseen päähän.'},
    tPairs:      {en:'Slide each opposite onto its own rod.',de:'Schieb jedes Gegenteil auf seine eigene Stange.',nl:'Schuif elk tegenovergestelde op zijn eigen stang.',da:'Skub hvert modsatte ord hen på sin egen stang.',sv:'Skjut varje motsats till sin egen stång.',no:'Skyv hvert motsatte ord over på sin egen stang.',es:'Desliza cada contrario a su propia barra.',it:'Fai scorrere ogni contrario sulla sua sbarra.',pt:'Deslize cada contrário para a sua própria barra.',fr:'Fais glisser chaque contraire sur sa propre barre.',fi:'Liu’uta jokainen vastakohta omaan tankoonsa.'},
    tSentences:  {en:'Finish the sentence with the opposite.',de:'Ergänze den Satz mit dem Gegenteil.',nl:'Maak de zin af met het tegenovergestelde.',da:'Gør sætningen færdig med det modsatte.',sv:'Gör klart meningen med motsatsen.',no:'Gjør ferdig setningen med det motsatte.',es:'Completa la oración con el contrario.',it:'Completa la frase con il contrario.',pt:'Complete a frase com o contrário.',fr:'Termine la phrase avec le contraire.',fi:'Täydennä lause vastakohdalla.'},
    tFlip:       {en:'Which clip turns the word into its opposite?',de:'Welche Klammer macht aus dem Wort sein Gegenteil?',nl:'Welke klem maakt van het woord het tegenovergestelde?',da:'Hvilken klemme gør ordet til det modsatte?',sv:'Vilken klämma gör ordet till sin motsats?',no:'Hvilken klemme gjør ordet til det motsatte?',es:'¿Qué broche convierte la palabra en su contrario?',it:'Quale fermaglio trasforma la parola nel suo contrario?',pt:'Qual presilha transforma a palavra no contrário?',fr:'Quelle pince change le mot en son contraire ?',fi:'Mikä pidike tekee sanasta sen vastakohdan?'},
    tMeaning:    {en:'Which clip gives the word the meaning in the sentence?',de:'Welche Klammer gibt dem Wort die Bedeutung im Satz?',nl:'Welke klem geeft het woord de betekenis in de zin?',da:'Hvilken klemme giver ordet betydningen i sætningen?',sv:'Vilken klämma ger ordet betydelsen i meningen?',no:'Hvilken klemme gir ordet betydningen i setningen?',es:'¿Qué broche le da a la palabra el significado de la oración?',it:'Quale fermaglio dà alla parola il significato della frase?',pt:'Qual presilha dá à palavra o sentido da frase?',fr:'Quelle pince donne au mot le sens de la phrase ?',fi:'Mikä pidike antaa sanalle lauseen merkityksen?'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    send:        {en:'Send',de:'Los',nl:'Stuur',da:'Send',sv:'Skicka',no:'Send',es:'Enviar',it:'Invia',pt:'Enviar',fr:'Envoyer',fi:'Lähetä'},
    hEmpty:      {en:'Put the words at the ends of the rod first.',de:'Leg zuerst die Wörter an die Enden der Stange.',nl:'Leg eerst de woorden aan de uiteinden van de stang.',da:'Læg først ordene ved enderne af stangen.',sv:'Lägg först orden vid ändarna av stången.',no:'Legg først ordene ved endene av stanga.',es:'Primero pon las palabras en los extremos de la barra.',it:'Prima metti le parole alle estremità della sbarra.',pt:'Primeiro coloque as palavras nas pontas da barra.',fr:'Place d’abord les mots aux bouts de la barre.',fi:'Laita ensin sanat tangon päihin.'},
    hMid:        {en:'That is only halfway. The opposite is all the way at the other end.',de:'Das ist nur die Mitte. Das Gegenteil ist ganz am anderen Ende.',nl:'Dat is maar halverwege. Het tegenovergestelde zit helemaal aan het andere eind.',da:'Det er kun halvvejs. Det modsatte er helt ude i den anden ende.',sv:'Det är bara halvvägs. Motsatsen är ända ute i andra änden.',no:'Det er bare halvveis. Det motsatte er helt ute i den andre enden.',es:'Eso es solo la mitad. El contrario está hasta el otro extremo.',it:'Quella è solo a metà. Il contrario è proprio all’altra estremità.',pt:'Isso é só a metade. O contrário fica lá na outra ponta.',fr:'C’est seulement au milieu. Le contraire est tout au bout, de l’autre côté.',fi:'Se on vasta puolivälissä. Vastakohta on ihan toisessa päässä.'},
    hSame:       {en:'That one means the same. Find the one at the other end.',de:'Das bedeutet dasselbe. Finde das Wort am anderen Ende.',nl:'Dat betekent hetzelfde. Zoek het woord aan het andere eind.',da:'Det betyder det samme. Find ordet i den anden ende.',sv:'Det betyder samma sak. Hitta ordet i andra änden.',no:'Det betyr det samme. Finn ordet i den andre enden.',es:'Esa quiere decir lo mismo. Busca la del otro extremo.',it:'Quella vuol dire la stessa cosa. Trova quella all’altra estremità.',pt:'Essa quer dizer a mesma coisa. Ache a da outra ponta.',fr:'Celui-là veut dire la même chose. Trouve celui de l’autre bout.',fi:'Se tarkoittaa samaa. Etsi sana toisesta päästä.'},
    hOff:        {en:'That word does not live on this rod.',de:'Dieses Wort wohnt nicht auf dieser Stange.',nl:'Dat woord hoort niet bij deze stang.',da:'Det ord hører ikke til på denne stang.',sv:'Det ordet hör inte hemma på den här stången.',no:'Det ordet hører ikke hjemme på denne stanga.',es:'Esa palabra no vive en esta barra.',it:'Quella parola non abita su questa sbarra.',pt:'Essa palavra não mora nesta barra.',fr:'Ce mot n’habite pas sur cette barre.',fi:'Se sana ei kuulu tähän tankoon.'},
    hCross:      {en:'Left and right are on a different rod.',de:'Links und rechts sind auf einer anderen Stange.',nl:'Links en rechts zitten op een andere stang.',da:'Venstre og højre er på en anden stang.',sv:'Vänster och höger är på en annan stång.',no:'Venstre og høyre er på en annen stang.',es:'Izquierda y derecha están en otra barra.',it:'Sinistra e destra sono su un’altra sbarra.',pt:'Esquerda e direita ficam em outra barra.',fr:'La gauche et la droite sont sur une autre barre.',fi:'Vasen ja oikea ovat eri tangossa.'},
    hItself:     {en:'That is the same word! Find the word at the other end.',de:'Das ist dasselbe Wort! Finde das Wort am anderen Ende.',nl:'Dat is hetzelfde woord! Zoek het woord aan het andere eind.',da:'Det er det samme ord! Find ordet i den anden ende.',sv:'Det är samma ord! Hitta ordet i andra änden.',no:'Det er det samme ordet! Finn ordet i den andre enden.',es:'¡Es la misma palabra! Busca la palabra del otro extremo.',it:'È la stessa parola! Trova la parola all’altra estremità.',pt:'É a mesma palavra! Ache a palavra da outra ponta.',fr:'C’est le même mot ! Trouve le mot de l’autre bout.',fi:'Se on sama sana! Etsi sana toisesta päästä.'},
    hSpell:      {en:'Check the letters: is it spelled right?',de:'Schau dir die Buchstaben an: Ist es richtig geschrieben?',nl:'Kijk naar de letters: is het goed geschreven?',da:'Se på bogstaverne: Er det stavet rigtigt?',sv:'Titta på bokstäverna: är det rätt stavat?',no:'Se på bokstavene: Er det stavet riktig?',es:'Revisa las letras: ¿está bien escrita?',it:'Guarda le lettere: è scritta bene?',pt:'Olhe as letras: está escrita certinho?',fr:'Regarde les lettres : est-ce bien écrit ?',fi:'Katso kirjaimet: onko sana kirjoitettu oikein?'},
    hType:       {en:'Write a word first.',de:'Schreib zuerst ein Wort.',nl:'Schrijf eerst een woord.',da:'Skriv først et ord.',sv:'Skriv först ett ord.',no:'Skriv først et ord.',es:'Primero escribe una palabra.',it:'Prima scrivi una parola.',pt:'Primeiro escreva uma palavra.',fr:'Écris d’abord un mot.',fi:'Kirjoita ensin sana.'},
    hMore:       {en:'Put every word at an end.',de:'Leg jedes Wort an ein Ende.',nl:'Leg elk woord aan een eind.',da:'Læg hvert ord ved en ende.',sv:'Lägg varje ord vid en ände.',no:'Legg hvert ord ved en ende.',es:'Pon cada palabra en un extremo.',it:'Metti ogni parola a un’estremità.',pt:'Coloque cada palavra numa ponta.',fr:'Place chaque mot à un bout.',fi:'Laita jokainen sana johonkin päähän.'},
    hSameWrong:  {en:'Some words slid back. Does each word mean the same, or the opposite?',de:'Einige Wörter sind zurückgerutscht. Bedeutet jedes Wort dasselbe oder das Gegenteil?',nl:'Een paar woorden gleden terug. Betekent elk woord hetzelfde of het tegenovergestelde?',da:'Nogle ord gled tilbage. Betyder hvert ord det samme eller det modsatte?',sv:'Några ord gled tillbaka. Betyder varje ord samma sak eller motsatsen?',no:'Noen ord gled tilbake. Betyr hvert ord det samme eller det motsatte?',es:'Algunas palabras regresaron. ¿Cada palabra quiere decir lo mismo o lo contrario?',it:'Alcune parole sono tornate indietro. Ogni parola vuol dire la stessa cosa o il contrario?',pt:'Algumas palavras voltaram. Cada palavra quer dizer a mesma coisa ou o contrário?',fr:'Des mots sont revenus. Chaque mot veut-il dire la même chose ou le contraire ?',fi:'Osa sanoista liukui takaisin. Tarkoittaako sana samaa vai vastakohtaa?'},
    hSameOff:    {en:'That word does not live on this rod. Leave it in the basket.',de:'Dieses Wort wohnt nicht auf dieser Stange. Lass es im Korb.',nl:'Dat woord hoort niet bij deze stang. Laat het in de mand.',da:'Det ord hører ikke til på denne stang. Lad det blive i kurven.',sv:'Det ordet hör inte hemma på den här stången. Låt det ligga kvar i korgen.',no:'Det ordet hører ikke hjemme på denne stanga. La det ligge i kurven.',es:'Esa palabra no vive en esta barra. Déjala en la canasta.',it:'Quella parola non abita su questa sbarra. Lasciala nel cestino.',pt:'Essa palavra não mora nesta barra. Deixe-a na cesta.',fr:'Ce mot n’habite pas sur cette barre. Laisse-le dans le panier.',fi:'Se sana ei kuulu tähän tankoon. Jätä se koriin.'},
    hPairWrong:  {en:'That card has no place on that rod. Try another rod.',de:'Diese Karte hat auf dieser Stange keinen Platz. Probier eine andere Stange.',nl:'Die kaart past niet op die stang. Probeer een andere stang.',da:'Det kort har ingen plads på den stang. Prøv en anden stang.',sv:'Det kortet får inte plats på den stången. Prova en annan stång.',no:'Det kortet har ingen plass på den stanga. Prøv en annen stang.',es:'Esa tarjeta no tiene lugar en esa barra. Prueba otra barra.',it:'Quella carta non ha posto su quella sbarra. Prova un’altra sbarra.',pt:'Essa carta não tem lugar nessa barra. Tente outra barra.',fr:'Cette carte n’a pas sa place sur cette barre. Essaie une autre barre.',fi:'Kortilla ei ole paikkaa siinä tangossa. Kokeile toista tankoa.'},
    hPair2:      {en:'The glowing rod is its home.',de:'Die leuchtende Stange ist ihr Zuhause.',nl:'De stang die oplicht is zijn thuis.',da:'Den lysende stang er kortets hjem.',sv:'Den lysande stången är dess hem.',no:'Den lysende stanga er hjemmet til kortet.',es:'La barra que brilla es su casa.',it:'La sbarra che brilla è la sua casa.',pt:'A barra que brilha é a casa dela.',fr:'La barre qui brille est sa maison.',fi:'Hehkuva tanko on sen koti.'},
    hNoClip:     {en:'Hang a clip at the empty end first.',de:'Häng zuerst eine Klammer an das leere Ende.',nl:'Hang eerst een klem aan het lege eind.',da:'Hæng først en klemme på den tomme ende.',sv:'Häng först en klämma på den tomma änden.',no:'Heng først en klemme på den tomme enden.',es:'Primero cuelga un broche en el extremo vacío.',it:'Prima appendi un fermaglio all’estremità vuota.',pt:'Primeiro pendure uma presilha na ponta vazia.',fr:'Accroche d’abord une pince au bout vide.',fi:'Ripusta ensin pidike tyhjään päähän.'},
    hClipWrong:  {en:'{w} rolled back: {p} does not make a word with it. Try another clip.',de:'{w} ist zurückgerollt: Mit {p} wird daraus kein Wort. Probier eine andere Klammer.',nl:'{w} rolde terug: met {p} wordt het geen woord. Probeer een andere klem.',da:'{w} trillede tilbage: Med {p} bliver det ikke til et ord. Prøv en anden klemme.',sv:'{w} rullade tillbaka: med {p} blir det inget ord. Prova en annan klämma.',no:'{w} trillet tilbake: Med {p} blir det ikke et ord. Prøv en annen klemme.',es:'{w} regresó rodando: con {p} no se forma una palabra. Prueba otro broche.',it:'{w} è tornata indietro: con {p} non diventa una parola. Prova un altro fermaglio.',pt:'{w} voltou rolando: com {p} não vira uma palavra. Tente outra presilha.',fr:'{w} est revenu en roulant : avec {p}, cela ne fait pas un mot. Essaie une autre pince.',fi:'{w} vierähti takaisin: {p} ei tee siitä sanaa. Kokeile toista pidikettä.'},
    hClip2:      {en:'Which clip makes the opposite of {w}?',de:'Welche Klammer macht das Gegenteil von {w}?',nl:'Welke klem maakt het tegenovergestelde van {w}?',da:'Hvilken klemme laver det modsatte af {w}?',sv:'Vilken klämma gör motsatsen till {w}?',no:'Hvilken klemme lager det motsatte av {w}?',es:'¿Qué broche forma el contrario de {w}?',it:'Quale fermaglio forma il contrario di {w}?',pt:'Qual presilha forma o contrário de {w}?',fr:'Quelle pince fait le contraire de {w} ?',fi:'Mikä pidike tekee sanan {w} vastakohdan?'},
    hMeanWrong:  {en:'{p} means “{g}”. Which clip gives the meaning in the sentence?',de:'{p} bedeutet „{g}“. Welche Klammer passt zum Satz?',nl:'{p} betekent ‘{g}’. Welke klem past bij de zin?',da:'{p} betyder »{g}«. Hvilken klemme passer til sætningen?',sv:'{p} betyder ”{g}”. Vilken klämma passar i meningen?',no:'{p} betyr «{g}». Hvilken klemme passer til setningen?',es:'{p} quiere decir “{g}”. ¿Qué broche le da el significado de la oración?',it:'{p} vuol dire «{g}». Quale fermaglio dà il significato della frase?',pt:'{p} quer dizer “{g}”. Qual presilha dá o sentido da frase?',fr:'{p} veut dire « {g} ». Quelle pince donne le sens de la phrase ?',fi:'{p} tarkoittaa ”{g}”. Mikä pidike antaa lauseen merkityksen?'},
    hMean2:      {en:'Which clip means “{g}”?',de:'Welche Klammer bedeutet „{g}“?',nl:'Welke klem betekent ‘{g}’?',da:'Hvilken klemme betyder »{g}«?',sv:'Vilken klämma betyder ”{g}”?',no:'Hvilken klemme betyr «{g}»?',es:'¿Qué broche quiere decir “{g}”?',it:'Quale fermaglio vuol dire «{g}»?',pt:'Qual presilha quer dizer “{g}”?',fr:'Quelle pince veut dire « {g} » ?',fi:'Mikä pidike tarkoittaa ”{g}”?'},
    hMiss2:      {en:'Think of the word at the very other end of {w}.',de:'Denk an das Wort ganz am anderen Ende von {w}.',nl:'Denk aan het woord helemaal aan het andere eind van {w}.',da:'Tænk på ordet helt ude i den anden ende af {w}.',sv:'Tänk på ordet ända ute i andra änden från {w}.',no:'Tenk på ordet helt ute i den andre enden fra {w}.',es:'Piensa en la palabra que está al otro extremo de {w}.',it:'Pensa alla parola proprio all’altra estremità di {w}.',pt:'Pense na palavra que fica bem na outra ponta de {w}.',fr:'Pense au mot tout au bout, à l’opposé de {w}.',fi:'Mieti sanaa, joka on ihan toisessa päässä kuin {w}.'},
    hSame2:      {en:'Read each word with {w}: does it mean the same, or the opposite?',de:'Lies jedes Wort mit {w}: Bedeutet es dasselbe oder das Gegenteil?',nl:'Lees elk woord met {w}: betekent het hetzelfde of het tegenovergestelde?',da:'Læs hvert ord sammen med {w}: Betyder det det samme eller det modsatte?',sv:'Läs varje ord med {w}: betyder det samma sak eller motsatsen?',no:'Les hvert ord sammen med {w}: Betyr det det samme eller det motsatte?',es:'Lee cada palabra con {w}: ¿quiere decir lo mismo o lo contrario?',it:'Leggi ogni parola con {w}: vuol dire la stessa cosa o il contrario?',pt:'Leia cada palavra com {w}: quer dizer a mesma coisa ou o contrário?',fr:'Lis chaque mot avec {w} : veut-il dire la même chose ou le contraire ?',fi:'Lue jokainen sana yhdessä sanan {w} kanssa: tarkoittaako se samaa vai vastakohtaa?'},
    okPair:      {en:'{a} and {b} are opposites — the two ends of one rod!',de:'{a} und {b} sind Gegenteile – die zwei Enden einer Stange!',nl:'{a} en {b} zijn tegenovergesteld – de twee uiteinden van één stang!',da:'{a} og {b} er modsætninger – de to ender af én stang!',sv:'{a} och {b} är motsatser – de två ändarna av en stång!',no:'{a} og {b} er motsetninger – de to endene av én stang!',es:'¡{a} y {b} son contrarios: los dos extremos de una barra!',it:'{a} e {b} sono contrari: le due estremità di una sbarra!',pt:'{a} e {b} são contrários: as duas pontas de uma barra!',fr:'{a} et {b} sont des contraires, les deux bouts d’une barre !',fi:'{a} ja {b} ovat vastakohtia – saman tangon kaksi päätä!'},
    okScene:     {en:'Good night! The day turned to night, the lamp went off and the door closed.',de:'Gute Nacht! Aus dem Tag wurde Nacht, die Lampe ging aus und die Tür ging zu.',nl:'Welterusten! De dag werd nacht, de lamp ging uit en de deur ging dicht.',da:'Godnat! Dagen blev til nat, lampen blev slukket, og døren blev lukket.',sv:'God natt! Dagen blev natt, lampan släcktes och dörren stängdes.',no:'God natt! Dagen ble natt, lampa ble slått av, og døra ble lukket.',es:'¡Buenas noches! El día se hizo noche, la lámpara se apagó y la puerta se cerró.',it:'Buonanotte! Il giorno è diventato notte, la lampada si è spenta e la porta si è chiusa.',pt:'Boa noite! O dia virou noite, o abajur desligou e a porta fechou.',fr:'Bonne nuit ! Le jour est devenu la nuit, la lampe s’est éteinte et la porte s’est fermée.',fi:'Hyvää yötä! Päivästä tuli yö, lamppu sammui ja ovi meni kiinni.'},
    okSameA:     {en:'Same end: {list}.',de:'Gleiches Ende: {list}.',nl:'Hetzelfde eind: {list}.',da:'Samme ende: {list}.',sv:'Samma ände: {list}.',no:'Samme ende: {list}.',es:'El mismo extremo: {list}.',it:'Stessa estremità: {list}.',pt:'Mesma ponta: {list}.',fr:'Même bout : {list}.',fi:'Sama pää: {list}.'},
    okSameB:     {en:'Other end: {list}.',de:'Anderes Ende: {list}.',nl:'Het andere eind: {list}.',da:'Den anden ende: {list}.',sv:'Andra änden: {list}.',no:'Den andre enden: {list}.',es:'El otro extremo: {list}.',it:'L’altra estremità: {list}.',pt:'A outra ponta: {list}.',fr:'L’autre bout : {list}.',fi:'Toinen pää: {list}.'},
    okPairs:     {en:'Three rods, three pairs of opposites!',de:'Drei Stangen, drei Paare von Gegenteilen!',nl:'Drie stangen, drie paren tegenovergestelden!',da:'Tre stænger, tre par modsætninger!',sv:'Tre stänger, tre par motsatser!',no:'Tre stenger, tre par motsetninger!',es:'¡Tres barras, tres pares de contrarios!',it:'Tre sbarre, tre coppie di contrari!',pt:'Três barras, três pares de contrários!',fr:'Trois barres, trois paires de contraires !',fi:'Kolme tankoa, kolme vastakohtaparia!'},
    okFlip:      {en:'{p} turned {b} into its opposite: {n}!',de:'{p} hat aus {b} das Gegenteil gemacht: {n}!',nl:'{p} maakte van {b} het tegenovergestelde: {n}!',da:'{p} gjorde {b} til det modsatte: {n}!',sv:'{p} gjorde {b} till motsatsen: {n}!',no:'{p} gjorde {b} til det motsatte: {n}!',es:'¡{p} convirtió {b} en su contrario: {n}!',it:'{p} ha trasformato {b} nel suo contrario: {n}!',pt:'{p} transformou {b} no contrário: {n}!',fr:'{p} a changé {b} en son contraire : {n} !',fi:'{p} teki sanasta {b} vastakohdan: {n}!'},
    okMean:      {en:'{p} means {g}: {n}.',de:'{p} bedeutet {g}: {n}.',nl:'{p} betekent {g}: {n}.',da:'{p} betyder {g}: {n}.',sv:'{p} betyder {g}: {n}.',no:'{p} betyr {g}: {n}.',es:'{p} quiere decir {g}: {n}.',it:'{p} vuol dire {g}: {n}.',pt:'{p} quer dizer {g}: {n}.',fr:'{p} veut dire {g} : {n}.',fi:'{p} tarkoittaa {g}: {n}.'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    setLevel:    {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lPictures:   {en:'Pictures',de:'Bilder',nl:'Plaatjes',da:'Billeder',sv:'Bilder',no:'Bilder',es:'Dibujos',it:'Disegni',pt:'Figuras',fr:'Images',fi:'Kuvat'},
    lSame:       {en:'Same or opposite?',de:'Gleich oder Gegenteil?',nl:'Hetzelfde of tegenovergesteld?',da:'Det samme eller det modsatte?',sv:'Samma eller motsats?',no:'Det samme eller det motsatte?',es:'¿Igual o contrario?',it:'Uguale o contrario?',pt:'Igual ou contrário?',fr:'Pareil ou contraire ?',fi:'Sama vai vastakohta?'},
    lPairs:      {en:'Pair up',de:'Paare finden',nl:'Paren maken',da:'Find parrene',sv:'Hitta paren',no:'Finn parene',es:'Forma parejas',it:'Fai le coppie',pt:'Forme pares',fr:'Fais les paires',fi:'Etsi parit'},
    lSentences:  {en:'Sentences',de:'Sätze',nl:'Zinnen',da:'Sætninger',sv:'Meningar',no:'Setninger',es:'Oraciones',it:'Frasi',pt:'Frases',fr:'Phrases',fi:'Lauseet'},
    lPrefixes:   {en:'Prefixes',de:'Vorsilben',nl:'Voorvoegsels',da:'Forstavelser',sv:'Förstavelser',no:'Forstavelser',es:'Prefijos',it:'Prefissi',pt:'Prefixos',fr:'Préfixes',fi:'Etu- ja loppuliitteet'},
    setWords:    {en:'Words',de:'Wörter',nl:'Woorden',da:'Ord',sv:'Ord',no:'Ord',es:'Palabras',it:'Parole',pt:'Palavras',fr:'Mots',fi:'Sanat'},
    wPics:       {en:'Pictures',de:'Mit Bildern',nl:'Met plaatjes',da:'Med billeder',sv:'Med bilder',no:'Med bilder',es:'Con dibujos',it:'Con disegni',pt:'Com figuras',fr:'Avec images',fi:'Kuvien kanssa'},
    wOnly:       {en:'Words only',de:'Nur Wörter',nl:'Alleen woorden',da:'Kun ord',sv:'Bara ord',no:'Bare ord',es:'Solo palabras',it:'Solo parole',pt:'Só palavras',fr:'Mots seuls',fi:'Vain sanat'},
    setAnswer:   {en:'Answer',de:'Antwort',nl:'Antwoord',da:'Svar',sv:'Svar',no:'Svar',es:'Respuesta',it:'Risposta',pt:'Resposta',fr:'Réponse',fi:'Vastaus'},
    aPick:       {en:'Pick a card',de:'Karte wählen',nl:'Kaart kiezen',da:'Vælg et kort',sv:'Välj ett kort',no:'Velg et kort',es:'Elige una tarjeta',it:'Scegli una carta',pt:'Escolha uma carta',fr:'Choisis une carte',fi:'Valitse kortti'},
    aWrite:      {en:'Write it',de:'Selbst schreiben',nl:'Zelf schrijven',da:'Skriv det',sv:'Skriv det',no:'Skriv det',es:'Escríbela',it:'Scrivila',pt:'Escreva',fr:'Écris-le',fi:'Kirjoita itse'},
    ariaCard:    {en:'{w} card',de:'Karte {w}',nl:'Kaart {w}',da:'Kortet {w}',sv:'Kortet {w}',no:'Kortet {w}',es:'Tarjeta {w}',it:'Carta {w}',pt:'Carta {w}',fr:'Carte {w}',fi:'Kortti {w}'},
    ariaRod:     {en:'Rod from {a} to {b}',de:'Stange von {a} bis {b}',nl:'Stang van {a} tot {b}',da:'Stang fra {a} til {b}',sv:'Stång från {a} till {b}',no:'Stang fra {a} til {b}',es:'Barra de {a} a {b}',it:'Sbarra da {a} a {b}',pt:'Barra de {a} até {b}',fr:'Barre de {a} à {b}',fi:'Tanko: {a} – {b}'},
    ariaEnd:     {en:'Empty end of the rod',de:'Leeres Ende der Stange',nl:'Leeg eind van de stang',da:'Den tomme ende af stangen',sv:'Stångens tomma ände',no:'Den tomme enden av stanga',es:'Extremo vacío de la barra',it:'Estremità vuota della sbarra',pt:'Ponta vazia da barra',fr:'Bout vide de la barre',fi:'Tangon tyhjä pää'},
    ariaNear:    {en:'The same end',de:'Das gleiche Ende',nl:'Hetzelfde eind',da:'Samme ende',sv:'Samma ände',no:'Samme ende',es:'El mismo extremo',it:'La stessa estremità',pt:'A mesma ponta',fr:'Le même bout',fi:'Sama pää'},
    ariaFar:     {en:'The other end',de:'Das andere Ende',nl:'Het andere eind',da:'Den anden ende',sv:'Andra änden',no:'Den andre enden',es:'El otro extremo',it:'L’altra estremità',pt:'A outra ponta',fr:'L’autre bout',fi:'Toinen pää'},
    ariaClip:    {en:'Prefix clip {p}',de:'Klammer {p}',nl:'Klem {p}',da:'Klemme {p}',sv:'Klämma {p}',no:'Klemme {p}',es:'Broche {p}',it:'Fermaglio {p}',pt:'Presilha {p}',fr:'Pince {p}',fi:'Pidike {p}'},
    ariaPush:    {en:'Push {w} along the rod',de:'Schieb {w} über die Stange',nl:'Duw {w} over de stang',da:'Skub {w} hen ad stangen',sv:'Skjut {w} längs stången',no:'Skyv {w} bortover stanga',es:'Empuja {w} por la barra',it:'Spingi {w} lungo la sbarra',pt:'Empurre {w} pela barra',fr:'Pousse {w} le long de la barre',fi:'Työnnä sana {w} tankoa pitkin'},
    ariaInput:   {en:'Write the opposite',de:'Schreib das Gegenteil',nl:'Schrijf het tegenovergestelde',da:'Skriv det modsatte',sv:'Skriv motsatsen',no:'Skriv det motsatte',es:'Escribe el contrario',it:'Scrivi il contrario',pt:'Escreva o contrário',fr:'Écris le contraire',fi:'Kirjoita vastakohta'}
  },

  defaults: { level: 'pictures', words: 'pics', answer: 'pick' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'pictures', labelKey: 'lPictures' }, { value: 'same', labelKey: 'lSame' }, { value: 'pairs', labelKey: 'lPairs' }, { value: 'sentences', labelKey: 'lSentences' }, { value: 'prefixes', labelKey: 'lPrefixes' }] },
    { key: 'words', type: 'choice', labelKey: 'setWords', options: [{ value: 'pics', labelKey: 'wPics' }, { value: 'only', labelKey: 'wOnly' }] },
    { key: 'answer', type: 'choice', labelKey: 'setAnswer', options: [{ value: 'pick', labelKey: 'aPick' }, { value: 'write', labelKey: 'aWrite' }] }
  ],

  OK_MS: 500, FAST: false, MISS_MS: 1300, SLIDE_MS: 420,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._slots = null; this._pos = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pa = {}; this._drag = null; this._sel = null;
    injectRodCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return OppositesRodCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _level: function () { return OppositesRodCore.levelOf(this._set('level')); },
  _pics: function () { return this._set('words') !== 'only'; },
  _write: function () { return this._set('answer') === 'write'; },
  _key: function () { return this._loc() + '/' + this._level(); },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },
  _q: function (w) { return this._t('quote', { w: w }); },
  _list: function (a) { try { return new Intl.ListFormat(this._loc(), { type: 'conjunction' }).format(a); } catch (e) { return a.join(', '); } },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = OppositesRodCore.ids(this._loc(), this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._slots = null; }
    return this._pool;
  },
  /* the round id names the round: the next pass is the same rounds in a new order, the right card on new slots */
  nextTask: function (opts) {
    var C = OppositesRodCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.map(function (i) { return pool[i]; });
      this._order = C.plan(this._loc(), this._level(), Math.random, prev).map(function (x) { return pool.indexOf(x); }); this._orderForPool = pool;
      this._pass = pass; this._slots = null;
    }
    if (!this._slots || this._slots.length !== n) this._slots = C.slots(Math.random, n);
    var id = pool[this._order[pos]], pa = { msg: this._t(this._promptFor(id)) }; this._pa = pa;
    return {
      id: 'rod.' + this._loc() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._pos = pos; tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (id, pos) {
    var C = OppositesRodCore, r = C.round(this._loc(), id, this._slots ? this._slots[pos] : 0, pos % 2 ? 'R' : 'L');
    this._clearTimers(); this._busy = false; this._view = {}; this._drag = null; this._sel = null;
    this.st = C.newState(r, Math.random);
  },
  /* the task line is set before the shell reads it (it reads promptArgs before setup) */
  _promptFor: function (id) { return id === 'pic.scene' ? 'tScene' : ({ pic: 'tPictures', same: 'tSame', pairs: 'tPairs', sent: 'tSentences', flip: 'tFlip', mean: 'tMeaning' })[id.split('.')[0]] || 'tPictures'; },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = OppositesRodCore; this.st = C.newState(C.round(this._loc(), C.ids(this._loc(), this._level())[0], 1, 'L'), C.seeded('x')); }
    this._render2();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'tr-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    this._body = api.el('div', 'tr-body'); wrap.appendChild(this._body);
    var row = api.el('div', 'tr-row'); wrap.appendChild(row);
    var chk = api.el('button', 'tr-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check'); chk.addEventListener('click', function () { self._checkSame(); }); this._checkBtn = chk; row.appendChild(chk);
    var note = api.el('p', 'tr-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._body) return;
    var st = this.st, C = OppositesRodCore, self = this, L = this._L = C.layout(this._width());
    this._wrap.className = 'tr-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 300 ? ' is-tiny' : '') + ' is-' + st.kind + (st.done ? ' is-done' : '') + (this._pics() ? '' : ' is-nopics') + (this.FAST ? ' is-fast' : '');
    [['pic', L.pic], ['cw', L.cw], ['ch', L.ch], ['word', L.word], ['wcard', L.wcard], ['text', L.text]].forEach(function (p) { self._wrap.style.setProperty('--tr-' + p[0], p[1] + 'px'); });
    this._body.innerHTML = '';
    if (st.kind === 'rod') this._paintRod(); else if (st.kind === 'scene') this._paintScene(); else if (st.kind === 'same') this._paintSame(); else if (st.kind === 'pairs') this._paintPairs(); else this._paintClips();
    var h = C.hint(st), v = this._view, msg = '';
    if (v.msg) msg = v.msg;
    else if (h && !this._busy) msg = this._t(h, this._hintArgs());
    this._note.textContent = msg;
    this._note.className = 'tr-note' + (st.done ? ' is-ok' : (h && !this._busy ? ' is-hint' : ''));
    this._checkBtn.hidden = st.kind !== 'same' || !!st.done; this._checkBtn.disabled = !!this._busy; this._checkBtn.textContent = this._t('check');
  },
  _hintArgs: function () {
    var st = this.st, r = st.r, L = st.last || {};
    var w = r.target ? r.target.word : (r.base || '');
    return { w: this._q(w), p: this._q(L.clip || ''), g: L.gloss || (r.gloss || ''), word: this._q(L.word || '') };
  },
  /* a card: a library picture with its look, or a drawn mark, and the word */
  _card: function (c, cls, tag) {
    var api = this.api, hasArt = this._pics() && !!(c.pic || c.mark), el = api.el(tag || 'div', 'tr-card' + (hasArt ? (c.look ? ' has-' + c.look : '') : ' is-wordonly') + (cls ? ' ' + cls : '')), self = this;
    if (tag === 'button') el.type = 'button';
    if (hasArt) {
      var art = api.el('span', 'tr-art' + (c.look ? ' look-' + c.look : '') + (c.mark ? ' mark-' + c.mark : ''));
      if (c.mark === 'swatch') { var sw = api.el('span', 'tr-swatch'); sw.style.background = c.c; art.appendChild(sw); }
      else if (c.mark === 'arrow') { art.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true"><g transform="rotate(' + ({ up: 0, right: 90, down: 180, left: 270 }[c.d] || 0) + ' 32 32)"><path d="M32 8 L52 32 L40 32 L40 56 L24 56 L24 32 L12 32 Z" fill="#146B5E" stroke="#2A2A35" stroke-width="3" stroke-linejoin="round"/></g></svg>'; }
      else {
        if (c.look === 'open') art.appendChild(api.el('span', 'tr-doorway'));
        if (c.look === 'on') art.appendChild(api.el('span', 'tr-halo'));
        var im = api.el('img', 'tr-img'); im.alt = ''; im.draggable = false; im.src = this._pic(c.pic); art.appendChild(im);
        if (c.look === 'full' || c.look === 'half') art.appendChild(api.el('span', 'tr-fill'));
        if (c.look === 'warm') art.appendChild(api.el('span', 'tr-mercury'));
      }
      el.appendChild(art);
    }
    var wd = api.el('span', 'tr-word'); wd.textContent = c.word; el.appendChild(wd);
    el.setAttribute('aria-label', this._t('ariaCard', { w: c.word }));
    return el;
  },
  _paintRod: function () {
    var st = this.st, r = st.r, api = this.api, self = this, v = this._view, help = OppositesRodCore.helpOf(st);
    if (r.sentence) {
      var sen = api.el('p', 'tr-sentence'), parts = r.sentence.split('___');
      sen.appendChild(document.createTextNode(parts[0]));
      var b = api.el('span', 'tr-blank' + (st.done ? ' is-filled' : '')); b.textContent = st.done ? r.fill : '   '; sen.appendChild(b);
      sen.appendChild(document.createTextNode(parts[1] || ''));
      this._body.appendChild(sen);
    }
    var box = api.el('div', 'tr-rodbox' + (r.vertical ? ' is-vertical' : '') + ' paint-' + r.paint + (r.end === 'R' ? ' is-flipped' : '')); this._rodbox = box;
    box.setAttribute('aria-label', this._t('ariaRod', { a: r.target.word, b: '…' }));
    var near = api.el('div', 'tr-clip is-near'); near.appendChild(this._card(r.target, 'is-target'));
    var far = api.el('div', 'tr-clip is-far' + (st.done ? ' is-filled' : '') + (help && help.far ? ' is-help' : ''));
    if (st.done) far.appendChild(this._card(r.far, 'is-arrived' + (v.slide ? ' is-slide' : '')));
    else { var e = api.el('span', 'tr-empty'); e.setAttribute('aria-label', this._t('ariaEnd')); far.appendChild(e); }
    var bar = api.el('div', 'tr-bar');
    if (r.grad) bar.appendChild(api.el('span', 'tr-groove'));
    box.appendChild(near); box.appendChild(bar); box.appendChild(far);
    /* parked cards: the middle groove, or beside the target */
    Object.keys(st.parked).forEach(function (id) {
      var c = OppositesRodCore.cardOf(r, id), p = st.parked[id], pc = self._card(c, 'is-parked is-' + p + (v.last === id ? ' is-slide' : ''), 'button');
      pc.setAttribute('data-k', 'parked-' + id); pc.setAttribute('data-parked', id);
      pc.addEventListener('click', function () { if (self._free()) { OppositesRodCore.unpark(st, id); self._view = {}; self._paint(); } });
      (p === 'mid' ? bar : near).appendChild(pc);
    });
    if (v.bump) { var bc = OppositesRodCore.cardOf(r, v.bump) || { word: v.bumpWord }; near.appendChild(this._card(bc, 'is-bump')); }
    if (v.cross) { var cr = api.el('div', 'tr-cross'); cr.appendChild(this._card(OppositesRodCore.cardOf(r, v.cross), 'is-onCross')); bar.appendChild(cr); }
    this._body.appendChild(box);
    if (st.done) return;
    if (this._write() && r.level !== undefined) return this._paintWrite();
    this._paintBasket(r.cards.filter(function (c) { return !st.parked[c.id] && v.bump !== c.id && v.cross !== c.id; }), function (c) { self._dropCard(c.id); });
  },
  _paintBasket: function (cards, onTap) {
    var api = this.api, self = this, bk = api.el('div', 'tr-basket'); bk.setAttribute('data-zone', 'basket');
    cards.forEach(function (c) {
      var b = self._card(c, 'is-basket', 'button'); b.setAttribute('data-k', 'card-' + c.id); b.setAttribute('data-card', c.id);
      if (self._sel === c.id) b.classList.add('is-sel');
      b.addEventListener('pointerdown', function (ev) { self._dragStart(ev, c, b); });
      b.addEventListener('click', function () { if (self._suppress) { self._suppress = false; return; } onTap(c); });
      bk.appendChild(b);
    });
    this._body.appendChild(bk);
  },
  _paintWrite: function () {
    var api = this.api, self = this, row = api.el('form', 'tr-write');
    var inp = api.el('input', 'tr-input'); inp.type = 'text'; inp.setAttribute('autocomplete', 'off'); inp.setAttribute('autocapitalize', 'off'); inp.setAttribute('spellcheck', 'false'); inp.setAttribute('aria-label', this._t('ariaInput')); inp.setAttribute('data-k', 'input'); inp.value = this._typed || '';
    inp.addEventListener('input', function () { self._typed = inp.value; });
    var go = api.el('button', 'tr-send'); go.type = 'submit'; go.textContent = this._t('send'); go.setAttribute('data-k', 'send');
    row.appendChild(inp); row.appendChild(go);
    row.addEventListener('submit', function (ev) { ev.preventDefault(); self._typeWord(inp.value); });
    this._body.appendChild(row);
  },
  _paintScene: function () {
    var st = this.st, r = st.r, api = this.api, self = this, box = api.el('div', 'tr-scene');
    r.items.forEach(function (it, i) {
      var rod = api.el('div', 'tr-mini'), on = st.flipped[i];
      var b = self._card(on ? it.b : it.a, on ? 'is-arrived is-slide' : '', 'button'); b.setAttribute('data-k', 'scene-' + i); b.setAttribute('data-scene', i);
      b.addEventListener('click', function () { self._flip(i); });
      var near = api.el('div', 'tr-clip is-near'), far = api.el('div', 'tr-clip is-far' + (on ? ' is-filled' : '')), bar = api.el('div', 'tr-bar');
      if (on) far.appendChild(b); else { near.appendChild(b); far.appendChild(api.el('span', 'tr-empty')); }
      rod.appendChild(near); rod.appendChild(bar); rod.appendChild(far); box.appendChild(rod);
    });
    this._body.appendChild(box);
  },
  _paintSame: function () {
    var st = this.st, r = st.r, api = this.api, self = this, help = OppositesRodCore.helpOf(st);
    var box = api.el('div', 'tr-rodbox paint-brass is-same' + (r.end === 'R' ? ' is-flipped' : '')); this._rodbox = box;
    var near = api.el('div', 'tr-zone is-near'); near.setAttribute('data-zone', 'near'); near.setAttribute('aria-label', this._t('ariaNear'));
    var tgt = api.el('div', 'tr-card is-target is-wordonly'); var tw = api.el('span', 'tr-word'); tw.textContent = r.target.word; tgt.appendChild(tw); near.appendChild(tgt);
    var bar = api.el('div', 'tr-bar');
    var far = api.el('div', 'tr-zone is-far'); far.setAttribute('data-zone', 'far'); far.setAttribute('aria-label', this._t('ariaFar'));
    st.order.forEach(function (id) {
      var end = st.ends[id]; if (!end) return;
      var c = OppositesRodCore.cardOf(r, id), b = api.el('button', 'tr-card is-wordonly is-placed'); b.type = 'button'; b.setAttribute('data-k', 'placed-' + id); b.setAttribute('data-card', id);
      var w = api.el('span', 'tr-word'); w.textContent = c.word; b.appendChild(w); b.setAttribute('aria-label', self._t('ariaCard', { w: c.word }));
      b.addEventListener('pointerdown', function (ev) { self._dragStart(ev, c, b); });
      b.addEventListener('click', function () { if (self._suppress) { self._suppress = false; return; } if (self._free()) { OppositesRodCore.place(st, id, end === 'near' ? 'far' : null); self._view = {}; self._paint(); } });
      (end === 'near' ? near : far).appendChild(b);
    });
    box.appendChild(near); box.appendChild(bar); box.appendChild(far);
    this._body.appendChild(box);
    if (st.done) return;
    var rest = st.order.filter(function (id) { return !st.ends[id]; }).map(function (id) { var c = OppositesRodCore.cardOf(r, id); return { id: id, word: c.word, home: c.home }; });
    this._paintBasket(rest, function (c) { if (self._free()) { OppositesRodCore.place(st, c.id, 'near'); self._view = {}; self._paint(); } });
  },
  _paintPairs: function () {
    var st = this.st, r = st.r, api = this.api, self = this, help = OppositesRodCore.helpOf(st), box = api.el('div', 'tr-pairs');
    r.rods.forEach(function (rd, i) {
      var rod = api.el('div', 'tr-mini is-pairrod' + (help && help.rod === i ? ' is-help' : '') + (self._view.wrongRod === i ? ' is-shiver' : '')); rod.setAttribute('data-rod', i); rod.setAttribute('aria-label', self._t('ariaRod', { a: rd.a, b: '…' }));
      var near = api.el('div', 'tr-clip is-near'), tgt = api.el('div', 'tr-card is-target is-wordonly'), tw = api.el('span', 'tr-word'); tw.textContent = rd.a; tgt.appendChild(tw); near.appendChild(tgt);
      var far = api.el('div', 'tr-clip is-far' + (st.filled[i] ? ' is-filled' : ''));
      if (st.filled[i]) { var fc = api.el('div', 'tr-card is-wordonly is-arrived is-slide'), fw = api.el('span', 'tr-word'); fw.textContent = rd.b; fc.appendChild(fw); far.appendChild(fc); }
      else far.appendChild(api.el('span', 'tr-empty'));
      rod.appendChild(near); rod.appendChild(api.el('div', 'tr-bar')); rod.appendChild(far);
      rod.addEventListener('click', function () { if (self._sel) self._dropPair(self._sel, i); });
      box.appendChild(rod);
    });
    this._body.appendChild(box);
    if (st.done) return;
    var rest = r.cards.filter(function (c) { return st.filled.indexOf(c.id) < 0; });
    this._paintBasket(rest, function (c) { if (self._free()) { self._sel = self._sel === c.id ? null : c.id; self._paint(); } });
  },
  _paintClips: function () {
    var st = this.st, r = st.r, api = this.api, self = this, v = this._view, help = OppositesRodCore.helpOf(st);
    if (r.sentence) {
      var sen = api.el('p', 'tr-sentence'), parts = r.sentence.split('___');
      sen.appendChild(document.createTextNode(parts[0]));
      var b = api.el('span', 'tr-blank' + (st.done ? ' is-filled' : '')); b.textContent = st.done ? r.fill : '   '; sen.appendChild(b);
      sen.appendChild(document.createTextNode(parts[1] || ''));
      this._body.appendChild(sen);
    }
    var box = api.el('div', 'tr-rodbox paint-brass is-clips' + (r.end === 'R' ? ' is-flipped' : '')); this._rodbox = box;
    var near = api.el('div', 'tr-clip is-near'), far = api.el('div', 'tr-clip is-far is-hookend' + (st.done ? ' is-filled' : '')), bar = api.el('div', 'tr-bar');
    if (!st.done) {
      var base = api.el('button', 'tr-card is-wordonly is-base' + (v.roll ? ' is-roll' : '')); base.type = 'button'; base.setAttribute('data-k', 'base'); base.setAttribute('aria-label', this._t('ariaPush', { w: r.base }));
      var bw = api.el('span', 'tr-word'); bw.textContent = r.base; base.appendChild(bw);
      base.addEventListener('click', function () { self._push(); });
      near.appendChild(base);
      if (st.clip !== null) { var hc = r.clips[st.clip], cl = api.el('span', 'tr-clipcard is-hung' + (hc.side === 'back' ? ' is-back' : '')); cl.textContent = hc.label; far.appendChild(cl); }
      else { var e = api.el('span', 'tr-empty'); e.setAttribute('aria-label', this._t('ariaEnd')); far.appendChild(e); }
    } else { var fz = api.el('div', 'tr-card is-wordonly is-arrived is-slide is-fused'), fw = api.el('span', 'tr-word'); fw.textContent = r.fused; fz.appendChild(fw); far.appendChild(fz); }
    box.appendChild(near); box.appendChild(bar); box.appendChild(far);
    this._body.appendChild(box);
    if (st.done) return;
    var hook = api.el('div', 'tr-hook');
    r.clips.forEach(function (c, i) {
      var b = api.el('button', 'tr-clipcard' + (st.clip === i ? ' is-on' : '') + (help && help.clip === i ? ' is-help' : '') + (c.side === 'back' ? ' is-back' : '')); b.type = 'button'; b.setAttribute('data-k', 'clip-' + i); b.setAttribute('data-clip', i);
      b.textContent = c.label; b.setAttribute('aria-label', self._t('ariaClip', { p: c.label })); b.setAttribute('aria-pressed', st.clip === i ? 'true' : 'false');
      b.addEventListener('pointerdown', function (ev) { self._dragStart(ev, { id: 'clip' + i, clip: i }, b); });
      b.addEventListener('click', function () { if (self._suppress) { self._suppress = false; return; } self._hang(i); });
      hook.appendChild(b);
    });
    this._body.appendChild(hook);
  },

  /* ---------------- the hand ---------------- */
  _free: function () { return !(this._busy || this.st.done); },
  _dropCard: function (id) {
    if (!this._free()) return;
    var self = this, st = this.st, C = OppositesRodCore, res = C.drop(st, id);
    if (!res) return;
    this._settle(res, id);
  },
  _typeWord: function (text) {
    if (!this._free()) return;
    var st = this.st, res = OppositesRodCore.typeWord(st, text);
    if (!res) return;
    if (res.home === 'unknown' || res.home === 'empty' || res.home === 'already') { this.api.sound(300); this._view = { shake: true }; this._paint(); return; }
    if (res.home === 'itself') { this.api.sound(300); this._view = {}; this._typed = ''; this._paint(); return; }
    this._typed = '';
    this._settle(res, res.id === 'typed' ? null : res.id, res.word);
  },
  _settle: function (res, id, typedWord) {
    var self = this, st = this.st;
    if (res.home === 'far') { this.api.sound(523); this._view = { slide: true }; return this._win(); }
    if (res.home === 'mid' || res.home === 'same') { this.api.sound(res.home === 'mid' ? 392 : 587); this._view = { last: id }; this._paint(); this.api.announce(this._note.textContent || ''); return; }
    /* off / cross: it bumps (or rides the crossing rod) and comes back */
    this._busy = true; this.api.sound(220);
    this._view = res.home === 'cross' ? { cross: id } : { bump: id, bumpWord: typedWord };
    this._paint();
    this._later(function () { self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(res.home === 'cross' ? 1200 : this.MISS_MS));
  },
  _flip: function (i) {
    if (!this._free()) return;
    if (OppositesRodCore.flip(this.st, i)) { this.api.sound(523 + i * 80); this._paint(); if (this.st.done) this._win(); }
  },
  _checkSame: function () {
    if (!this._free()) return;
    var self = this, res = OppositesRodCore.checkSame(this.st);
    if (res.ok) return this._win();
    this.api.sound(res.reason === 'wrong' ? 220 : 460); this._view = {}; this._paint(); this.api.announce(this._note.textContent || '');
  },
  _dropPair: function (id, rod) {
    if (!this._free()) return;
    var self = this, res = OppositesRodCore.dropOn(this.st, id, rod);
    this._sel = null;
    if (!res) { this._paint(); return; }
    if (res.ok) { this.api.sound(523); this._view = {}; this._paint(); if (this.st.done) this._win(); return; }
    this.api.sound(220); this._view = { wrongRod: rod }; this._paint();
    this._later(function () { self._view = {}; self._paint(); }, this._ms(500));
  },
  _hang: function (i) { if (!this._free()) return; if (OppositesRodCore.hang(this.st, i)) { this.api.sound(659); this._view = {}; this._paint(); } },
  _push: function () {
    if (!this._free()) return;
    var self = this, res = OppositesRodCore.push(this.st);
    if (!res) return;
    if (res.fused) { this.api.sound(523); return this._win(); }
    if (res.reason === 'noClip') { this.api.sound(460); this._view = {}; this._paint(); return; }
    this._busy = true; this.api.sound(220); this._view = { roll: true }; this._paint();
    this._later(function () { self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(800));
  },
  _zoneAt: function (x, y) {
    /* the ends and the rods first: the end zones sit INSIDE the rod box, which would otherwise catch every drop */
    var els = this._body ? [].slice.call(this._body.querySelectorAll('[data-zone="near"],[data-zone="far"],[data-rod]')).concat([].slice.call(this._body.querySelectorAll('.tr-rodbox'))) : [];
    for (var i = 0; i < els.length; i++) {
      var b = els[i].getBoundingClientRect();
      if (x >= b.left - 20 && x <= b.right + 20 && y >= b.top - 30 && y <= b.bottom + 30) {
        if (els[i].getAttribute('data-rod') !== null) return { rod: +els[i].getAttribute('data-rod') };
        if (els[i].getAttribute('data-zone') === 'near' || els[i].getAttribute('data-zone') === 'far') return { end: els[i].getAttribute('data-zone') };
        if (els[i].classList.contains('tr-rodbox')) return { rodbox: true };
      }
    }
    return null;
  },
  _dragStart: function (ev, c, el) {
    if (!this._free() || (ev.button !== undefined && ev.button !== 0)) return;
    var self = this, sx = ev.clientX, sy = ev.clientY, moved = false, ghost = null;
    this._drag = { id: c.id };
    var onMove = function (e) {
      if (!moved && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 10) return;
      if (!moved) { moved = true; ghost = el.cloneNode(true); ghost.className += ' tr-ghost'; var rc = el.getBoundingClientRect(); ghost.style.width = rc.width + 'px'; document.body.appendChild(ghost); el.classList.add('is-lifted'); }
      ghost.style.left = (e.clientX - ghost.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - ghost.offsetHeight / 2) + 'px';
    };
    var onUp = function (e) {
      document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp); document.removeEventListener('pointercancel', onUp);
      self._drag = null;
      if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
      el.classList.remove('is-lifted');
      if (!moved) return;
      self._suppress = true; setTimeout(function () { self._suppress = false; }, 0);
      var z = self._zoneAt(e.clientX, e.clientY), st = self.st;
      if (c.clip !== undefined) { if (z && (z.rodbox || z.end)) self._hang(c.clip); return; }
      if (st.kind === 'rod') { if (z && z.rodbox) self._dropCard(c.id); return; }
      if (st.kind === 'same') { if (z && z.end) { OppositesRodCore.place(st, c.id, z.end); } else if (st.ends[c.id]) OppositesRodCore.place(st, c.id, null); self._view = {}; self._paint(); return; }
      if (st.kind === 'pairs') { if (z && z.rod !== undefined) self._dropPair(c.id, z.rod); return; }
    };
    document.addEventListener('pointermove', onMove); document.addEventListener('pointerup', onUp); document.addEventListener('pointercancel', onUp);
  },
  _win: function () {
    var self = this, st = this.st, r = st.r, pa = this._pa || {}, msg;
    if (st.kind === 'rod') msg = this._t('okPair', { a: this._q(r.target.word), b: this._q(r.far.word) });
    else if (st.kind === 'scene') msg = this._t('okScene');
    else if (st.kind === 'same') {
      var same = r.cards.filter(function (c) { return c.home === 'same'; }).map(function (c) { return c.word; }), opp = r.cards.filter(function (c) { return c.home === 'far'; }).map(function (c) { return c.word; });
      msg = (same.length ? this._t('okSameA', { list: this._list(same) }) + ' ' : '') + this._t('okSameB', { list: this._list(opp) });
    }
    else if (st.kind === 'pairs') msg = this._t('okPairs');
    else if (st.kind === 'flip') msg = this._t('okFlip', { p: this._q(r.clips.filter(function (c) { return c.idx === r.right; })[0].label), b: this._q(r.base), n: this._q(r.fused) });
    else msg = this._t('okMean', { p: this._q(r.clips.filter(function (c) { return c.idx === r.right; })[0].label), g: r.gloss, n: this._q(r.fused) });
    pa.msg = msg; this._busy = true; this._view = { msg: msg, slide: true, ring: true };
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110)); this._later(function () { self.api.sound(1046); }, this._ms(220));
    this._paint();
    this._later(function () { self._busy = false; self._paint(); self.api.announce(msg); }, this._ms(500));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var trCssDone = false;
function injectRodCSS() {
  if (trCssDone || typeof document === 'undefined') return;
  trCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tr-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--tr-ink:#2A2A35;--tr-teal:#146B5E;--tr-coral:#F2784B;--tr-cream:#FFF8EC;--tr-brass:#C9A34A;--tr-gold:#E8B83A;user-select:none;-webkit-user-select:none;}'
  + '.tr-wrap:focus{outline:none;} .tr-body{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:14px;}'
  /* cards */
  + '.tr-card{position:relative;flex:none;width:var(--tr-cw);min-height:var(--tr-ch);padding:6px 4px 8px;margin:0;border:0;border-radius:14px;background:var(--tr-cream);box-shadow:inset 0 0 0 3px var(--tr-ink),0 3px 0 #D8C9A6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;cursor:pointer;touch-action:none;}'
  + '.tr-card.is-target{cursor:default;box-shadow:inset 0 0 0 3px var(--tr-teal),0 3px 0 #D8C9A6;}'
  + '.tr-card.is-wordonly{min-height:calc(var(--tr-ch) * .55);}'
  + '.tr-wrap.is-nopics .tr-card{min-height:calc(var(--tr-ch) * .55);}'
  + '.tr-art{position:relative;flex:none;width:var(--tr-pic);height:var(--tr-pic);display:flex;align-items:center;justify-content:center;}'
  + '.tr-img{width:100%;height:100%;object-fit:contain;display:block;position:relative;}'
  /* sizes are shown by the BIGGER ball being bigger: small = the picture floor, medium 1.22×, big 1.45×; the card widens to hold it */
  + '.tr-art.look-medium{width:calc(var(--tr-pic) * 1.22);height:calc(var(--tr-pic) * 1.22);} .tr-art.look-big{width:calc(var(--tr-pic) * 1.45);height:calc(var(--tr-pic) * 1.45);}'
  + '.tr-card.has-medium{width:max(var(--tr-cw),calc(var(--tr-pic) * 1.22 + 16px));} .tr-card.has-big{width:max(var(--tr-cw),calc(var(--tr-pic) * 1.45 + 16px));} .tr-card.has-open{width:max(var(--tr-cw),calc(var(--tr-pic) * 1.4 + 16px));}'
  + '.tr-art.look-off .tr-img{filter:brightness(.55) saturate(.6);}'
  + '.tr-halo{position:absolute;left:4%;top:-2%;width:92%;height:72%;border-radius:50%;background:radial-gradient(circle,#FFE98A 0,#FFE98A88 45%,transparent 70%);}'
  /* the open door: the dark doorway, the door standing beside it at full size (never turned on its hinge, which narrows the picture) */
  + '.tr-art.look-open{width:calc(var(--tr-pic) * 1.4);justify-content:flex-end;} .tr-art.look-open .tr-img{width:var(--tr-pic);flex:none;}'
  + '.tr-doorway{position:absolute;left:3%;top:6%;width:40%;height:90%;background:#2B2236;border-radius:3px;box-shadow:inset 0 0 0 3px #6B4A2E;}'
  + '.tr-fill{position:absolute;left:22%;right:22%;bottom:10%;border-radius:0 0 10px 10px;background:#E8833A;opacity:.78;mix-blend-mode:multiply;}'
  + '.tr-art.look-full .tr-fill{top:30%;} .tr-art.look-half .tr-fill{top:58%;}'
  + '.tr-mercury{position:absolute;left:46%;width:8%;top:10%;height:38%;background:#EEF2F5;border-radius:4px;}'
  + '.tr-swatch{width:78%;height:78%;border-radius:12px;box-shadow:inset 0 0 0 3px var(--tr-ink);}'
  + '.tr-art.mark-arrow svg{width:82%;height:82%;}'
  + '.tr-word{font-family:' + B + ';font-weight:800;font-size:var(--tr-word);line-height:1.15;color:var(--tr-ink);overflow-wrap:anywhere;}'
  + '.tr-card.is-wordonly .tr-word,.tr-wrap.is-nopics .tr-word{font-size:var(--tr-wcard);}'
  + '.tr-card.is-sel{box-shadow:inset 0 0 0 4px var(--tr-gold),0 0 0 3px var(--tr-gold);}'
  + '.tr-card.is-lifted{opacity:.3;} .tr-ghost{position:fixed;z-index:9999;pointer-events:none;opacity:.94;transform:rotate(-4deg);margin:0;}'
  + '.tr-card:focus-visible,.tr-clipcard:focus-visible{outline:3px solid var(--tr-teal);outline-offset:3px;}'
  /* the rod */
  + '.tr-rodbox{position:relative;display:flex;align-items:center;gap:0;width:100%;}'
  + '.tr-rodbox.is-flipped{flex-direction:row-reverse;}'
  + '.tr-clip{position:relative;flex:none;width:var(--tr-cw);min-height:var(--tr-ch);display:flex;align-items:center;justify-content:center;}'
  + '.tr-empty{width:var(--tr-cw);height:var(--tr-ch);border-radius:14px;border:3px dashed #9C8C72;background:rgba(255,248,236,.5);}'
  + '.tr-clip.is-help .tr-empty{animation:trPulse .7s ease-in-out infinite;border-color:var(--tr-gold);}'
  + '.tr-bar{position:relative;flex:1;height:28px;margin:0 -6px;border-radius:14px;background:linear-gradient(#E3C46F,var(--tr-brass) 55%,#9E7C2E);box-shadow:inset 0 0 0 2px #7A5E1E;z-index:0;}'
  + '.tr-wrap.is-narrow .tr-bar{height:22px;}'
  + '.paint-grey .tr-bar{background:linear-gradient(90deg,#262626,#777 50%,#fff);} .paint-grey.is-flipped .tr-bar{background:linear-gradient(270deg,#262626,#777 50%,#fff);}'
  + '.paint-temp .tr-bar{background:linear-gradient(90deg,#E2574B,#E8B24B 50%,#4A90D9);} .paint-temp.is-flipped .tr-bar{background:linear-gradient(270deg,#E2574B,#E8B24B 50%,#4A90D9);}'
  + '.paint-sky .tr-bar{background:linear-gradient(90deg,#FCE38A,#8FB8E8 50%,#1E2A5A);} .paint-sky.is-flipped .tr-bar{background:linear-gradient(270deg,#FCE38A,#8FB8E8 50%,#1E2A5A);}'
  + '.paint-taper .tr-bar{clip-path:polygon(0 0,100% 30%,100% 70%,0 100%);} .paint-taper.is-flipped .tr-bar{clip-path:polygon(0 30%,100% 0,100% 100%,0 70%);}'
  + '.paint-tube .tr-bar{background:linear-gradient(90deg,#E8833A,#F3C08F 50%,#F4F1EA);box-shadow:inset 0 0 0 2px #8A9AA8;} .paint-tube.is-flipped .tr-bar{background:linear-gradient(270deg,#E8833A,#F3C08F 50%,#F4F1EA);}'
  + '.paint-cream .tr-bar{background:linear-gradient(#FFF6DF,#EEDDB6);box-shadow:inset 0 0 0 2px #B9A273;}'
  + '.tr-rodbox.paint-switch{width:min(100%,calc(var(--tr-cw) * 2 + 240px));align-self:center;} .tr-wrap.is-narrow .tr-rodbox.paint-switch{width:min(100%,calc(var(--tr-cw) * 2 + 120px));}'
  + '.tr-groove{position:absolute;left:50%;top:-6px;bottom:-6px;width:6px;margin-left:-3px;border-radius:3px;background:#2A2A35;opacity:.55;}'
  + '.tr-card.is-parked{position:absolute;z-index:2;}'
  + '.tr-bar .tr-card.is-parked.is-mid{left:50%;top:50%;margin-left:calc(var(--tr-cw) / -2);transform:translateY(-50%);}'
  + '.tr-clip .tr-card.is-parked.is-same{left:42%;top:-8%;}'
  + '.tr-rodbox.is-flipped .tr-clip .tr-card.is-parked.is-same{left:auto;right:42%;}'
  + '.tr-card.is-bump{position:absolute;z-index:3;animation:trBump 1.2s ease forwards;}'
  + '.tr-card.is-slide{animation:trSlide .42s ease-out;}'
  + '.tr-rodbox.is-flipped .tr-card.is-slide{animation-name:trSlideR;}'
  + '.tr-card.is-arrived{box-shadow:inset 0 0 0 3px var(--tr-teal),0 3px 0 #D8C9A6;}'
  /* the upright rod and its crossing rod */
  + '.tr-rodbox.is-vertical{flex-direction:column;}'
  + '.tr-rodbox.is-vertical .tr-bar{flex:none;width:28px;height:var(--tr-vbar,110px);margin:-6px 0;}'
  + '.tr-wrap.is-narrow .tr-rodbox.is-vertical .tr-bar{width:22px;--tr-vbar:70px;}'
  + '.tr-cross{position:absolute;left:50%;top:50%;width:min(420px,80vw);height:14px;margin:-7px 0 0 calc(min(420px,80vw) / -2);border-radius:7px;background:rgba(201,163,74,.45);display:flex;align-items:center;animation:trFade 1.2s ease forwards;z-index:3;}'
  + '.tr-cross .tr-card{position:absolute;left:0;transform:translateY(-50%) scale(.8);top:50%;}'
  + '.tr-rodbox.is-vertical .tr-clip .tr-card.is-parked.is-same{left:58%;top:-4%;}'
  /* sentence, basket, write */
  + '.tr-sentence{margin:0;padding:10px 14px;border-radius:12px;background:#F6EFE3;box-shadow:inset 0 0 0 2px #D8C9A6;font-family:' + B + ';font-weight:800;font-size:var(--tr-text);line-height:1.35;color:var(--tr-ink);text-align:center;}'
  + '.tr-blank{display:inline-block;min-width:2.6em;border-bottom:3px solid var(--tr-ink);padding:0 4px;} .tr-blank.is-filled{color:var(--tr-teal);border-color:var(--tr-teal);min-width:0;padding:0;}'
  + '.tr-basket{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;}'
  + '.tr-wrap.is-narrow .tr-basket{gap:8px;}'
  + '.tr-write{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;}'
  + '.tr-input{min-width:0;width:min(320px,62vw);min-height:52px;padding:6px 14px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px var(--tr-ink);font-family:' + B + ';font-weight:800;font-size:22px;color:var(--tr-ink);}'
  + '.tr-wrap.is-shake .tr-input{animation:trShake .4s ease;}'
  + '.tr-send{min-height:52px;min-width:96px;padding:6px 18px;border:0;border-radius:999px;background:var(--tr-coral);color:#fff;font-family:' + D + ';font-weight:800;font-size:20px;cursor:pointer;box-shadow:0 4px 0 #B8522C;}'
  /* scene, same, pairs, clips */
  + '.tr-scene,.tr-pairs{display:flex;flex-direction:column;gap:12px;}'
  + '.tr-mini{display:flex;align-items:center;width:100%;border-radius:16px;}'
  + '.tr-mini .tr-bar{height:18px;}'
  + '.tr-mini.is-pairrod{cursor:pointer;padding:2px;} .tr-mini.is-help{box-shadow:0 0 0 3px var(--tr-gold);} .tr-mini.is-shiver{animation:trShake .4s ease;}'
  + '.tr-pairs .tr-card,.tr-pairs .tr-clip,.tr-pairs .tr-empty{min-height:56px;height:auto;} .tr-pairs .tr-empty{height:56px;}'
  + '.tr-zone{position:relative;flex:none;width:max-content;min-width:calc(var(--tr-cw) * 1.25);max-width:42%;min-height:calc(var(--tr-ch) * 1.25);padding:6px;border-radius:16px;border:3px dashed #9C8C72;background:rgba(255,248,236,.45);display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.tr-zone.is-near{border-style:solid;border-color:#B9DDD5;}'
  + '.tr-zone .tr-card{min-height:48px;width:auto;min-width:100%;max-width:100%;padding-left:10px;padding-right:10px;} .tr-zone .tr-card.is-target{background:#E6F2EF;box-shadow:inset 0 0 0 3px var(--tr-teal);}'
  + '.tr-hook{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;}'
  + '.tr-clipcard{min-width:72px;min-height:48px;padding:6px 14px;border:0;border-radius:10px 10px 18px 18px;background:linear-gradient(#E3C46F,#C9A34A);box-shadow:inset 0 0 0 3px #7A5E1E,0 3px 0 #9E7C2E;font-family:' + D + ';font-weight:800;font-size:22px;color:#3A2A08;cursor:pointer;touch-action:none;}'
  + '.tr-clipcard.is-on{opacity:.4;} .tr-clipcard.is-help{animation:trGlint .8s ease-in-out infinite;} .tr-clipcard.is-hung{display:flex;align-items:center;justify-content:center;cursor:default;}'
  + '.tr-card.is-base.is-roll{animation:trRoll .8s ease;}'
  + '.tr-card.is-fused .tr-word{color:var(--tr-teal);}'
  + '.tr-row{display:flex;justify-content:center;}'
  + '.tr-check{min-width:150px;min-height:52px;padding:8px 26px;border:0;border-radius:999px;background:var(--tr-teal);color:#fff;font-family:' + D + ';font-weight:800;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #0D4A41;}'
  + '.tr-check:disabled{opacity:.55;cursor:default;} .tr-check:focus-visible,.tr-send:focus-visible{outline:3px solid var(--tr-coral);outline-offset:3px;}'
  + '.tr-note{margin:0;min-height:1.4em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.35;color:var(--tr-ink);max-width:640px;}'
  + '.tr-note.is-hint{color:#9A3D17;} .tr-note.is-ok{color:var(--tr-teal);}'
  + '.tr-wrap.is-narrow .tr-note{font-size:17px;} .tr-wrap.is-narrow .tr-check{min-height:48px;font-size:20px;} .tr-wrap.is-narrow .tr-body{gap:10px;}'
  + '.tr-wrap.is-narrow .tr-sentence{padding:8px 10px;} .tr-wrap.is-narrow .tr-clipcard{font-size:19px;}'
  + '@keyframes trSlide{0%{transform:translateX(-140%)}100%{transform:none}}'
  + '@keyframes trSlideR{0%{transform:translateX(140%)}100%{transform:none}}'
  + '@keyframes trBump{0%{transform:translateX(40%)}25%{transform:translateX(60%) rotate(4deg)}60%{transform:translate(20%,30px) rotate(-8deg);opacity:1}100%{transform:translate(0,80px) rotate(-14deg);opacity:0}}'
  + '@keyframes trRoll{0%,100%{transform:none}50%{transform:translateX(70%)}}'
  + '@keyframes trFade{0%,70%{opacity:1}100%{opacity:0}}'
  + '@keyframes trPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}'
  + '@keyframes trGlint{0%,100%{box-shadow:inset 0 0 0 3px #7A5E1E,0 3px 0 #9E7C2E}50%{box-shadow:inset 0 0 0 3px #7A5E1E,0 0 14px #FFE45C}}'
  + '@keyframes trShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}'
  + '.tr-wrap.is-fast *,.tr-wrap.is-fast *::before,.tr-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.tr-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'tr-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.OppositesRodActivity = OppositesRodActivity;
