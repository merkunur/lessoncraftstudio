/* =====================================================================
   drive-cables-activity.js — ACTIVITY #160 of the one-by-one rebuild:
   "Sprocket's Clock — Match Analog and Digital" → THE DRIVE CABLES
   (2.MD.C.7; all 11 locales). Model: drive-cables-core.js
   (DriveCablesCore). Design: docs/activities-rebuild/designs/160-clock-digital.md
   ---------------------------------------------------------------------
   The invention: a switchboard. Four analog clocks — three match the
   digital cards, one is a LURE built to catch one named mistake — and
   three cards, each with a cable. The child plugs every card into a
   clock; on Check each card drives a dashed pair of hands to ITS time on
   the clock it is plugged into. Where they land on the painted hands the
   lamp lights and the pair stays; where they don't, two hand-sets share
   one face and the hand that disagrees pulses. Hour digits and hour hands
   are coral, minute digits and minute hands teal.
   No timer, no score; numerals only on the faces and the cards.
   Test seams: window.DriveCablesActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._tapCard / ._tapClock / ._plug /
   ._unplug / ._check / ._g / .FAST / .OK_MS.
   ===================================================================== */
var DriveCablesActivity = {
  id: 'drive-cables',
  /* the drawn apparatus (the hierarchy gate): the clocks, the cards, the cables */
  apparatusClasses: ['dc-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Sprocket's Clock","de":"Sprockets Uhr","fr":"L’horloge de Sprocket","es":"El reloj de Sprocket","pt":"O relógio do Sprocket","it":"L’orologio di Sprocket","nl":"De klok van Kukel","sv":"Tores klocka","da":"Sprockets ur","no":"Sprockets klokke","fi":"Sprocketin kello"},
    instruction: {"en":"Every card has a cable. Tap a card, then the clock that shows the same time, or drag its plug onto that clock. One clock matches no card. Press Check: each card draws dashed hands at its own time on the clock it is plugged into. Where the dashed hands sit on the clock’s own hands, the lamp lights up.","de":"Jede Karte hat ein Kabel. Tippe auf eine Karte und dann auf die Uhr, die dieselbe Uhrzeit zeigt, oder zieh den Stecker auf diese Uhr. Eine Uhr passt zu keiner Karte. Drück auf Prüfen: Jede Karte zeichnet gestrichelte Zeiger mit ihrer Uhrzeit auf die Uhr, in der sie steckt. Wo die gestrichelten Zeiger genau auf den Zeigern der Uhr liegen, leuchtet die Lampe.","fr":"Chaque carte a un câble. Touche une carte, puis l’horloge qui montre la même heure, ou fais glisser la prise jusqu’à cette horloge. Une horloge ne va avec aucune carte. Appuie sur Vérifier : chaque carte dessine des aiguilles en pointillés à son heure sur l’horloge où elle est branchée. Quand les aiguilles en pointillés tombent pile sur celles de l’horloge, la lampe s’allume.","es":"Cada tarjeta tiene un cable. Toca una tarjeta y luego el reloj que marca la misma hora, o arrastra el enchufe hasta ese reloj. Un reloj no va con ninguna tarjeta. Presiona Revisar: cada tarjeta dibuja manecillas punteadas con su hora en el reloj donde está conectada. Donde las manecillas punteadas quedan justo sobre las del reloj, se enciende la lámpara.","pt":"Cada cartão tem um cabo. Toque em um cartão e depois no relógio que mostra a mesma hora, ou arraste o plugue até esse relógio. Um relógio não combina com nenhum cartão. Aperte Conferir: cada cartão desenha ponteiros tracejados com a sua hora no relógio em que está ligado. Onde os ponteiros tracejados ficam bem em cima dos ponteiros do relógio, a lâmpada acende.","it":"Ogni cartellino ha un cavo. Tocca un cartellino e poi l’orologio che segna la stessa ora, oppure trascina la spina su quell’orologio. Un orologio non va con nessun cartellino. Premi Controlla: ogni cartellino disegna lancette tratteggiate con la sua ora sull’orologio a cui è collegato. Dove le lancette tratteggiate cadono proprio sulle lancette dell’orologio, la lampadina si accende.","nl":"Elke kaart heeft een snoer. Tik op een kaart en dan op de klok die dezelfde tijd laat zien, of sleep de stekker naar die klok. Eén klok past bij geen enkele kaart. Druk op Controleer: elke kaart tekent stippelwijzers met haar eigen tijd op de klok waar ze in zit. Waar de stippelwijzers precies op de wijzers van de klok vallen, gaat het lampje aan.","sv":"Varje kort har en sladd. Tryck på ett kort och sedan på klockan som visar samma tid, eller dra kontakten till den klockan. En klocka passar inte ihop med något kort. Tryck på Kolla: varje kort ritar streckade visare med sin egen tid på klockan som det är inkopplat i. Där de streckade visarna hamnar precis på klockans visare tänds lampan.","da":"Hvert kort har en ledning. Tryk på et kort og derefter på det ur, der viser det samme klokkeslæt, eller træk stikket hen til det ur. Et af urene passer ikke til noget kort. Tryk på Tjek: hvert kort tegner stiplede visere med sit eget klokkeslæt på det ur, det sidder i. Hvor de stiplede visere lander præcis på urets visere, tænder lampen.","no":"Hvert kort har en ledning. Trykk på et kort og så på klokka som viser det samme klokkeslettet, eller dra støpselet bort til den klokka. Én av klokkene passer ikke til noe kort. Trykk på Sjekk: hvert kort tegner stiplede visere med sitt eget klokkeslett på klokka det står i. Der de stiplede viserne havner akkurat på klokkas egne visere, lyser lampen.","fi":"Jokaisessa kortissa on johto. Napauta korttia ja sitten kelloa, joka näyttää saman ajan, tai vedä pistoke sen kellon luo. Yksi kelloista ei sovi yhteenkään korttiin. Paina Tarkista: jokainen kortti piirtää oman aikansa katkoviivaisina viisareina siihen kelloon, johon se on kytketty. Kun katkoviivaiset viisarit osuvat juuri kellon omien viisarien päälle, lamppu syttyy."},
    taskLine: {"en":"Plug each card into the clock that shows the same time.","de":"Steck jede Karte in die Uhr, die dieselbe Uhrzeit zeigt.","fr":"Branche chaque carte sur l’horloge qui montre la même heure.","es":"Conecta cada tarjeta al reloj que marca la misma hora.","pt":"Ligue cada cartão ao relógio que mostra a mesma hora.","it":"Collega ogni cartellino all’orologio che segna la stessa ora.","nl":"Steek elke kaart in de klok die dezelfde tijd laat zien.","sv":"Koppla in varje kort i klockan som visar samma tid.","da":"Sæt hvert kort i det ur, der viser det samme klokkeslæt.","no":"Koble hvert kort til klokka som viser det samme klokkeslettet.","fi":"Kytke jokainen kortti kelloon, joka näyttää saman ajan."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    hintPick: {"en":"Tap a card first, then a clock.","de":"Tippe zuerst auf eine Karte, dann auf eine Uhr.","fr":"Touche d’abord une carte, puis une horloge.","es":"Primero toca una tarjeta y luego un reloj.","pt":"Primeiro toque em um cartão e depois em um relógio.","it":"Prima tocca un cartellino, poi un orologio.","nl":"Tik eerst op een kaart en dan op een klok.","sv":"Tryck först på ett kort och sedan på en klocka.","da":"Tryk først på et kort og så på et ur.","no":"Trykk først på et kort og så på en klokke.","fi":"Napauta ensin korttia ja sitten kelloa."},
    hintPlug: {"en":"Plug in all three cards.","de":"Steck alle drei Karten ein.","fr":"Branche les trois cartes.","es":"Conecta las tres tarjetas.","pt":"Ligue os três cartões.","it":"Collega tutti e tre i cartellini.","nl":"Steek alle drie de kaarten in.","sv":"Koppla in alla tre korten.","da":"Sæt alle tre kort i.","no":"Koble til alle tre kortene.","fi":"Kytke kaikki kolme korttia."},
    hintSwap: {"en":"The short hand shows the hour, the long hand shows the minutes.","de":"Der kleine Zeiger zeigt die Stunde, der große Zeiger die Minuten.","fr":"La petite aiguille montre l’heure, la grande aiguille montre les minutes.","es":"La manecilla corta marca la hora y la larga marca los minutos.","pt":"O ponteiro pequeno mostra a hora e o ponteiro grande mostra os minutos.","it":"La lancetta corta segna l’ora, la lancetta lunga segna i minuti.","nl":"De kleine wijzer wijst het uur aan, de grote wijzer de minuten.","sv":"Lilla visaren visar timmen, stora visaren visar minuterna.","da":"Den lille viser viser timen, den store viser viser minutterne.","no":"Den lille viseren viser timen, den store viseren viser minuttene.","fi":"Lyhyt viisari näyttää tunnit, pitkä viisari näyttää minuutit."},
    hintHalf: {"en":"When the long hand is on the 6, the short hand is halfway between two numbers. Which number has it already passed?","de":"Steht der große Zeiger auf der 6, ist der kleine Zeiger genau zwischen zwei Zahlen. An welcher Zahl ist er schon vorbei?","fr":"Quand la grande aiguille est sur le 6, la petite aiguille est à mi-chemin entre deux nombres. Quel nombre a-t-elle déjà dépassé ?","es":"Cuando la manecilla larga está en el 6, la corta está a la mitad entre dos números. ¿Qué número ya pasó?","pt":"Quando o ponteiro grande está no 6, o pequeno fica no meio, entre dois números. Por qual número ele já passou?","it":"Quando la lancetta lunga è sul 6, quella corta è a metà tra due numeri. Quale numero ha già superato?","nl":"Staat de grote wijzer op de 6, dan staat de kleine wijzer precies tussen twee getallen. Welk getal is hij al voorbij?","sv":"När stora visaren står på 6:an står lilla visaren mitt emellan två siffror. Vilken siffra har den redan passerat?","da":"Når den store viser står på 6-tallet, står den lille viser midt mellem to tal. Hvilket tal er den allerede gået forbi?","no":"Når den store viseren står på 6-tallet, står den lille viseren midt mellom to tall. Hvilket tall har den allerede passert?","fi":"Kun pitkä viisari on numeron 6 kohdalla, lyhyt viisari on kahden numeron puolivälissä. Minkä numeron se on jo ohittanut?"},
    hintHourHand: {"en":"Look at the short hand: which number has it already passed? Not the one it is nearly at.","de":"Schau auf den kleinen Zeiger: An welcher Zahl ist er schon vorbei? Nicht an der, bei der er fast ist.","fr":"Regarde la petite aiguille : quel nombre a-t-elle déjà dépassé ? Pas celui dont elle s’approche.","es":"Mira la manecilla corta: ¿qué número ya pasó? No el que casi alcanza.","pt":"Olhe o ponteiro pequeno: por qual número ele já passou? Não aquele a que ele quase chegou.","it":"Guarda la lancetta corta: quale numero ha già superato? Non quello a cui è quasi arrivata.","nl":"Kijk naar de kleine wijzer: welk getal is hij al voorbij? Niet het getal waar hij bijna bij is.","sv":"Titta på lilla visaren: vilken siffra har den redan passerat? Inte den som den nästan är framme vid.","da":"Se på den lille viser: hvilket tal er den allerede gået forbi? Ikke det tal, den næsten er ved.","no":"Se på den lille viseren: hvilket tall har den allerede passert? Ikke det tallet den nesten er ved.","fi":"Katso lyhyttä viisaria: minkä numeron se on jo ohittanut? Ei sitä, jonka kohdalla se melkein on."},
    hintLongHand: {"en":"Look at the long hand: is it on the 12 or on the 6?","de":"Schau auf den großen Zeiger: Steht er auf der 12 oder auf der 6?","fr":"Regarde la grande aiguille : est-elle sur le 12 ou sur le 6 ?","es":"Mira la manecilla larga: ¿está en el 12 o en el 6?","pt":"Olhe o ponteiro grande: ele está no 12 ou no 6?","it":"Guarda la lancetta lunga: è sul 12 o sul 6?","nl":"Kijk naar de grote wijzer: staat hij op de 12 of op de 6?","sv":"Titta på stora visaren: står den på 12:an eller på 6:an?","da":"Se på den store viser: står den på 12-tallet eller på 6-tallet?","no":"Se på den store viseren: står den på 12-tallet eller på 6-tallet?","fi":"Katso pitkää viisaria: onko se numeron 12 vai numeron 6 kohdalla?"},
    hintQuarter: {"en":"Look at the long hand: is it on the 3 or on the 9?","de":"Schau auf den großen Zeiger: Steht er auf der 3 oder auf der 9?","fr":"Regarde la grande aiguille : est-elle sur le 3 ou sur le 9 ?","es":"Mira la manecilla larga: ¿está en el 3 o en el 9?","pt":"Olhe o ponteiro grande: ele está no 3 ou no 9?","it":"Guarda la lancetta lunga: è sul 3 o sul 9?","nl":"Kijk naar de grote wijzer: staat hij op de 3 of op de 9?","sv":"Titta på stora visaren: står den på 3:an eller på 9:an?","da":"Se på den store viser: står den på 3-tallet eller på 9-tallet?","no":"Se på den store viseren: står den på 3-tallet eller på 9-tallet?","fi":"Katso pitkää viisaria: onko se numeron 3 vai numeron 9 kohdalla?"},
    hintFive: {"en":"Count by fives from the 12 to the long hand.","de":"Zähl in Fünferschritten von der 12 bis zum großen Zeiger.","fr":"Compte de 5 en 5 depuis le 12 jusqu’à la grande aiguille.","es":"Cuenta de 5 en 5 desde el 12 hasta la manecilla larga.","pt":"Conte de 5 em 5 do 12 até o ponteiro grande.","it":"Conta di 5 in 5 dal 12 fino alla lancetta lunga.","nl":"Tel per 5 vanaf de 12 tot aan de grote wijzer.","sv":"Räkna med fem i taget från 12:an till stora visaren.","da":"Tæl fem ad gangen fra 12-tallet hen til den store viser.","no":"Tell fem om gangen fra 12-tallet bort til den store viseren.","fi":"Laske viisi kerrallaan numerosta 12 pitkään viisariin asti."},
    hintOther: {"en":"Look at both hands. Which clock has its hands where the dashed hands are?","de":"Schau auf beide Zeiger. Bei welcher Uhr stehen die Zeiger dort, wo die gestrichelten Zeiger sind?","fr":"Regarde les deux aiguilles. Sur quelle horloge les aiguilles sont-elles là où sont les aiguilles en pointillés ?","es":"Mira las dos manecillas. ¿En qué reloj están las manecillas donde están las punteadas?","pt":"Olhe os dois ponteiros. Em qual relógio os ponteiros estão onde estão os tracejados?","it":"Guarda tutte e due le lancette. In quale orologio le lancette sono dove sono quelle tratteggiate?","nl":"Kijk naar beide wijzers. Bij welke klok staan de wijzers waar de stippelwijzers staan?","sv":"Titta på båda visarna. Vilken klocka har visarna där de streckade visarna är?","da":"Se på begge visere. Hvilket ur har viserne der, hvor de stiplede visere er?","no":"Se på begge viserne. Hvilken klokke har viserne der de stiplede viserne er?","fi":"Katso molempia viisareita. Missä kellossa viisarit ovat samassa kohdassa kuin katkoviivaiset viisarit?"},
    hintHelp: {"en":"Count the dots by fives to the dashed long hand. The bold numbers show where the dashed short hand is.","de":"Zähl die Punkte in Fünferschritten bis zum gestrichelten großen Zeiger. Die dicken Zahlen zeigen, wo der gestrichelte kleine Zeiger steht.","fr":"Compte les points de 5 en 5 jusqu’à la grande aiguille en pointillés. Les nombres en gras montrent où est la petite aiguille en pointillés.","es":"Cuenta los puntos de 5 en 5 hasta la manecilla larga punteada. Los números en negrita muestran dónde está la manecilla corta punteada.","pt":"Conte os pontos de 5 em 5 até o ponteiro grande tracejado. Os números em negrito mostram onde está o ponteiro pequeno tracejado.","it":"Conta i puntini di 5 in 5 fino alla lancetta lunga tratteggiata. I numeri in grassetto mostrano dov’è la lancetta corta tratteggiata.","nl":"Tel de stippen per 5 tot aan de grote stippelwijzer. De dikke getallen laten zien waar de kleine stippelwijzer staat.","sv":"Räkna prickarna med fem i taget fram till den streckade stora visaren. De feta siffrorna visar var den streckade lilla visaren står.","da":"Tæl prikkerne fem ad gangen hen til den stiplede store viser. De fede tal viser, hvor den stiplede lille viser står.","no":"Tell prikkene fem om gangen bort til den stiplede store viseren. De tykke tallene viser hvor den stiplede lille viseren står.","fi":"Laske pisteitä viisi kerrallaan katkoviivaiseen pitkään viisariin asti. Lihavoidut numerot näyttävät, missä katkoviivainen lyhyt viisari on."},
    okAll: {"en":"{a}, {b} and {c}: all matched!","de":"{a}, {b} und {c}: alle passen!","fr":"{a}, {b} et {c} : tout est juste !","es":"{a}, {b} y {c}: ¡todas coinciden!","pt":"{a}, {b} e {c}: todos combinam!","it":"{a}, {b} e {c}: tutti giusti!","nl":"{a}, {b} en {c}: alles klopt!","sv":"{a}, {b} och {c}: alla stämmer!","da":"{a}, {b} og {c}: alle passer!","no":"{a}, {b} og {c}: alle stemmer!","fi":"{a}, {b} ja {c}: kaikki täsmäävät!"},
    tipOclock: {"en":"At {t} the long hand is on the 12 and the short hand is on the {h}.","de":"Um {t} steht der große Zeiger auf der 12 und der kleine Zeiger auf der {h}.","fr":"À {t}, la grande aiguille est sur le 12 et la petite aiguille sur le {h}.","es":"Para marcar {t}, la manecilla larga está en el 12 y la corta en el {h}.","pt":"Para marcar {t}, o ponteiro grande fica no 12 e o pequeno fica no {h}.","it":"Per segnare {t}, la lancetta lunga è sul numero 12 e quella corta sul numero {h}.","nl":"Om {t} staat de grote wijzer op de 12 en de kleine wijzer op de {h}.","sv":"Klockan {t} står stora visaren på 12:an och lilla visaren på {h}:an.","da":"Klokken {t} står den store viser på 12-tallet og den lille viser på {h}-tallet.","no":"Klokka {t} står den store viseren på 12-tallet og den lille viseren på {h}-tallet.","fi":"Kun kello on {t}, pitkä viisari on numeron 12 kohdalla ja lyhyt viisari numeron {h} kohdalla."},
    tipHalf: {"en":"At {t} the long hand is on the 6 and the short hand is halfway between the {h} and the {h1}.","de":"Um {t} steht der große Zeiger auf der 6 und der kleine Zeiger genau zwischen der {h} und der {h1}.","fr":"À {t}, la grande aiguille est sur le 6 et la petite aiguille à mi-chemin entre le {h} et le {h1}.","es":"Para marcar {t}, la manecilla larga está en el 6 y la corta a la mitad entre el {h} y el {h1}.","pt":"Para marcar {t}, o ponteiro grande fica no 6 e o pequeno fica no meio, entre o {h} e o {h1}.","it":"Per segnare {t}, la lancetta lunga è sul numero 6 e quella corta a metà tra i numeri {h} e {h1}.","nl":"Om {t} staat de grote wijzer op de 6 en de kleine wijzer precies tussen de {h} en de {h1}.","sv":"Klockan {t} står stora visaren på 6:an och lilla visaren mitt emellan {h}:an och {h1}:an.","da":"Klokken {t} står den store viser på 6-tallet og den lille viser midt mellem {h}-tallet og {h1}-tallet.","no":"Klokka {t} står den store viseren på 6-tallet og den lille viseren midt mellom {h}-tallet og {h1}-tallet.","fi":"Kun kello on {t}, pitkä viisari on numeron 6 kohdalla ja lyhyt viisari numeroiden {h} ja {h1} puolivälissä."},
    tipPast: {"en":"At {t} the long hand is on the 3 and the short hand has just passed the {h}.","de":"Um {t} steht der große Zeiger auf der 3 und der kleine Zeiger ist gerade an der {h} vorbei.","fr":"À {t}, la grande aiguille est sur le 3 et la petite aiguille vient de dépasser le {h}.","es":"Para marcar {t}, la manecilla larga está en el 3 y la corta acaba de pasar el {h}.","pt":"Para marcar {t}, o ponteiro grande fica no 3 e o pequeno acabou de passar do {h}.","it":"Per segnare {t}, la lancetta lunga è sul numero 3 e quella corta ha appena superato il numero {h}.","nl":"Om {t} staat de grote wijzer op de 3 en is de kleine wijzer net voorbij de {h}.","sv":"Klockan {t} står stora visaren på 3:an och lilla visaren har precis passerat {h}:an.","da":"Klokken {t} står den store viser på 3-tallet, og den lille viser er lige gået forbi {h}-tallet.","no":"Klokka {t} står den store viseren på 3-tallet, og den lille viseren har akkurat passert {h}-tallet.","fi":"Kun kello on {t}, pitkä viisari on numeron 3 kohdalla ja lyhyt viisari on juuri ohittanut numeron {h}."},
    tipTo: {"en":"At {t} the long hand is on the 9 and the short hand is nearly at the {h1}.","de":"Um {t} steht der große Zeiger auf der 9 und der kleine Zeiger ist fast bei der {h1}.","fr":"À {t}, la grande aiguille est sur le 9 et la petite aiguille est presque sur le {h1}.","es":"Para marcar {t}, la manecilla larga está en el 9 y la corta casi llega al {h1}.","pt":"Para marcar {t}, o ponteiro grande fica no 9 e o pequeno quase chega ao {h1}.","it":"Per segnare {t}, la lancetta lunga è sul numero 9 e quella corta è quasi sul numero {h1}.","nl":"Om {t} staat de grote wijzer op de 9 en is de kleine wijzer bijna bij de {h1}.","sv":"Klockan {t} står stora visaren på 9:an och lilla visaren är nästan framme vid {h1}:an.","da":"Klokken {t} står den store viser på 9-tallet, og den lille viser er næsten ved {h1}-tallet.","no":"Klokka {t} står den store viseren på 9-tallet, og den lille viseren er nesten ved {h1}-tallet.","fi":"Kun kello on {t}, pitkä viisari on numeron 9 kohdalla ja lyhyt viisari on melkein numeron {h1} kohdalla."},
    tipFive: {"en":"At {t} the long hand is on the {n}: {n} fives from the 12 is {m} minutes. The short hand has passed the {h} but not reached the {h1}.","de":"Um {t} steht der große Zeiger auf der {n}: {n}-mal 5 ab der 12 sind {m} Minuten. Der kleine Zeiger ist an der {h} vorbei, aber noch nicht bei der {h1}.","fr":"À {t}, la grande aiguille est sur le {n} : {n} fois 5 depuis le 12, ça fait {m} minutes. La petite aiguille a dépassé le {h} mais n’est pas encore sur le {h1}.","es":"Para marcar {t}, la manecilla larga está en el {n}: {n} veces 5 desde el 12 son {m} minutos. La corta ya pasó el {h}, pero todavía no llega al {h1}.","pt":"Para marcar {t}, o ponteiro grande fica no {n}: {n} vezes 5 a partir do 12 dá {m} minutos. O pequeno já passou do {h}, mas ainda não chegou ao {h1}.","it":"Per segnare {t}, la lancetta lunga è sul numero {n}: {n} volte 5 dal 12 fa {m} minuti. Quella corta ha superato il numero {h}, ma non è ancora arrivata al numero {h1}.","nl":"Om {t} staat de grote wijzer op de {n}: {n} keer 5 vanaf de 12 is {m} minuten. De kleine wijzer is voorbij de {h}, maar nog niet bij de {h1}.","sv":"Klockan {t} står stora visaren på {n}:an: {n} gånger 5 från 12:an är {m} minuter. Lilla visaren har passerat {h}:an men har inte kommit fram till {h1}:an.","da":"Klokken {t} står den store viser på {n}-tallet: {n} gange 5 fra 12-tallet er {m} minutter. Den lille viser er gået forbi {h}-tallet, men er ikke nået hen til {h1}-tallet endnu.","no":"Klokka {t} står den store viseren på {n}-tallet: {n} ganger 5 fra 12-tallet er {m} minutter. Den lille viseren har passert {h}-tallet, men har ikke kommet til {h1}-tallet ennå.","fi":"Kun kello on {t}, pitkä viisari on numeron {n} kohdalla: {n} kertaa 5 numerosta 12 on {m} minuuttia. Lyhyt viisari on ohittanut numeron {h}, mutta ei ole vielä numeron {h1} kohdalla."},
    aCard: {"en":"Card {time}","de":"Karte {time}","fr":"Carte {time}","es":"Tarjeta {time}","pt":"Cartão {time}","it":"Cartellino {time}","nl":"Kaart {time}","sv":"Kort {time}","da":"Kort {time}","no":"Kort {time}","fi":"Kortti {time}"},
    aCardPlugged: {"en":"Card {time}, plugged into clock {n}","de":"Karte {time}, steckt in Uhr {n}","fr":"Carte {time}, branchée sur l’horloge {n}","es":"Tarjeta {time}, conectada al reloj {n}","pt":"Cartão {time}, ligado ao relógio {n}","it":"Cartellino {time}, collegato all’orologio {n}","nl":"Kaart {time}, zit in klok {n}","sv":"Kort {time}, inkopplat i klocka {n}","da":"Kort {time}, sidder i ur {n}","no":"Kort {time}, koblet til klokke {n}","fi":"Kortti {time}, kytketty kelloon {n}"},
    aCardIn: {"en":"Card {time} is plugged in.","de":"Karte {time} steckt darin.","fr":"La carte {time} y est branchée.","es":"La tarjeta {time} está conectada.","pt":"O cartão {time} está ligado.","it":"Il cartellino {time} è collegato.","nl":"Kaart {time} zit erin.","sv":"Kort {time} är inkopplat.","da":"Kort {time} sidder i.","no":"Kort {time} er koblet til.","fi":"Kortti {time} on kytketty."},
    aClockOn: {"en":"Clock {n}: short hand on the {a}, long hand on the {c}.","de":"Uhr {n}: kleiner Zeiger auf der {a}, großer Zeiger auf der {c}.","fr":"Horloge {n} : petite aiguille sur le {a}, grande aiguille sur le {c}.","es":"Reloj {n}: manecilla corta en el {a}, manecilla larga en el {c}.","pt":"Relógio {n}: ponteiro pequeno no {a}, ponteiro grande no {c}.","it":"Orologio {n}: lancetta corta sul numero {a}, lancetta lunga sul numero {c}.","nl":"Klok {n}: kleine wijzer op de {a}, grote wijzer op de {c}.","sv":"Klocka {n}: lilla visaren på {a}:an, stora visaren på {c}:an.","da":"Ur {n}: den lille viser på {a}-tallet, den store viser på {c}-tallet.","no":"Klokke {n}: den lille viseren på {a}-tallet, den store viseren på {c}-tallet.","fi":"Kello {n}: lyhyt viisari numeron {a} kohdalla, pitkä viisari numeron {c} kohdalla."},
    aClockBetween: {"en":"Clock {n}: short hand between the {a} and the {b}, long hand on the {c}.","de":"Uhr {n}: kleiner Zeiger zwischen der {a} und der {b}, großer Zeiger auf der {c}.","fr":"Horloge {n} : petite aiguille entre le {a} et le {b}, grande aiguille sur le {c}.","es":"Reloj {n}: manecilla corta entre el {a} y el {b}, manecilla larga en el {c}.","pt":"Relógio {n}: ponteiro pequeno entre o {a} e o {b}, ponteiro grande no {c}.","it":"Orologio {n}: lancetta corta tra i numeri {a} e {b}, lancetta lunga sul numero {c}.","nl":"Klok {n}: kleine wijzer tussen de {a} en de {b}, grote wijzer op de {c}.","sv":"Klocka {n}: lilla visaren mellan {a}:an och {b}:an, stora visaren på {c}:an.","da":"Ur {n}: den lille viser mellem {a}-tallet og {b}-tallet, den store viser på {c}-tallet.","no":"Klokke {n}: den lille viseren mellom {a}-tallet og {b}-tallet, den store viseren på {c}-tallet.","fi":"Kello {n}: lyhyt viisari numeroiden {a} ja {b} välissä, pitkä viisari numeron {c} kohdalla."},
    aClockDone: {"en":"Clock {n} shows {time}.","de":"Uhr {n} zeigt {time}.","fr":"L’horloge {n} montre {time}.","es":"El reloj {n} marca {time}.","pt":"O relógio {n} mostra {time}.","it":"L’orologio {n} segna {time}.","nl":"Klok {n} wijst {time} aan.","sv":"Klocka {n} visar {time}.","da":"Ur {n} viser {time}.","no":"Klokke {n} viser {time}.","fi":"Kello {n} näyttää {time}."},
    setTimes: {"en":"Times","de":"Uhrzeiten","fr":"Heures","es":"Horas","pt":"Horas","it":"Orari","nl":"Tijden","sv":"Tider","da":"Klokkeslæt","no":"Klokkeslett","fi":"Ajat"},
    tL1: {"en":"O’clock and half past","de":"Volle und halbe Stunden","fr":"Heures pile et demi-heures","es":"Horas en punto y medias horas","pt":"Horas exatas e meias horas","it":"Ore esatte e mezze ore","nl":"Hele en halve uren","sv":"Hela och halva timmar","da":"Hele og halve timer","no":"Hele og halve timer","fi":"Tasa- ja puolitunnit"},
    tL2: {"en":"Quarter hours and five-minute times","de":"Viertelstunden und 5-Minuten-Schritte","fr":"Quarts d’heure et minutes de 5 en 5","es":"Cuartos de hora y de 5 en 5 minutos","pt":"Quartos de hora e de 5 em 5 minutos","it":"Quarti d’ora e di 5 in 5 minuti","nl":"Kwartieren en per 5 minuten","sv":"Kvartar och var femte minut","da":"Kvarterer og hvert femte minut","no":"Kvarter og hvert femte minutt","fi":"Vartit ja viiden minuutin ajat"},
    setNums: {"en":"Numbers on the clocks","de":"Zahlen auf den Uhren","fr":"Nombres sur les horloges","es":"Números en los relojes","pt":"Números nos relógios","it":"Numeri sugli orologi","nl":"Getallen op de klokken","sv":"Siffror på klockorna","da":"Tal på urene","no":"Tall på klokkene","fi":"Numerot kelloissa"},
    nAll: {"en":"All twelve","de":"Alle zwölf","fr":"Les douze","es":"Los doce","pt":"Os doze","it":"Tutti e dodici","nl":"Alle twaalf","sv":"Alla tolv","da":"Alle tolv","no":"Alle tolv","fi":"Kaikki kaksitoista"},
    nQuarter: {"en":"Only 12, 3, 6, 9","de":"Nur 12, 3, 6, 9","fr":"Seulement 12, 3, 6, 9","es":"Solo 12, 3, 6, 9","pt":"Só 12, 3, 6, 9","it":"Solo 12, 3, 6, 9","nl":"Alleen 12, 3, 6, 9","sv":"Bara 12, 3, 6, 9","da":"Kun 12, 3, 6, 9","no":"Bare 12, 3, 6, 9","fi":"Vain 12, 3, 6, 9"}
  },/*STRINGS-END*/
  defaults: { times: '1', nums: 'all' },
  settings: [
    { key: 'times', type: 'choice', labelKey: 'setTimes', options: [{ value: '1', labelKey: 'tL1' }, { value: '2', labelKey: 'tL2' }] },
    { key: 'nums', type: 'choice', labelKey: 'setNums', options: [{ value: 'all', labelKey: 'nAll' }, { value: 'quarters', labelKey: 'nQuarter' }] }
  ],
  OK_MS: 500, FAST: false,
  THEMES: ['farm-animals'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._themes = {}; this._picsReady = false; this._drag = null; this._sel = null;
    injectDriveCablesCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function (e) { if (typeof console !== 'undefined') console.error(e); });
    }
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return DriveCablesCore.levelOf(this._setting('times')); },
  _quarters: function () { return this._setting('nums') === 'quarters'; },
  _loc: function () { return DriveCablesCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._level(); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = DriveCablesCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = DriveCablesCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'drive-cables.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t('taskLine'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag(); this._sel = null;
    this.st = DriveCablesCore.newState(this._level(), k);
    this._view = { note: '', soft: false, win: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'dc-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="dc-board" data-qa="board"><div class="dc-clocks"></div><div class="dc-cards"></div></div><div class="dc-goline"></div><p class="dc-note" data-qa="note" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._keyboard(e); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _geometry: function (W, done) {
    var wide = W >= 560, cramp = W < 330;
    var F = wide ? Math.min(148, Math.floor((W - 3 * 14) / 4) - 8) : Math.min(cramp ? 110 : 140, Math.floor((W - 16) / 2) - 6);
    /* phones, once every lamp is lit: the four clocks close up into one row so the success line and Next stay above the fold */
    var row = !wide && !!done; if (row) F = Math.floor((W - 16 - 3 * 6) / 4) - 4;
    return { W: W, wide: wide, cramp: cramp, row: row, F: F, rooster: wide ? 96 : 64 };
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width();
    var g = this._g = this._geometry(W, st.done);
    this._wrap.className = 'dc-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (g.row ? ' is-row' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    this._paintClocks();
    this._paintCards();
    this._paintCables();
    this._paintGo();
    var note = this._qs('.dc-note');
    if (v.note) { note.textContent = v.note; note.className = 'dc-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'dc-note'; }
    this._setPrompt();
  },
  /* the pair a clock is in (or null), and that pair's verdict once Check has run */
  _pairAt: function (slot) { var st = this.st, c = st.plugs.indexOf(slot); if (c < 0) return null; var p = st.verdict ? st.verdict.pairs[c] : null; return { card: c, error: p ? p.error : undefined, lit: st.locked[c] }; },
  _face: function (t, opts) {
    var C = DriveCablesCore, o = '', q = this._quarters(), P = function (a, r) { var x = (a - 90) * Math.PI / 180; return [100 + r * Math.cos(x), 100 + r * Math.sin(x)]; };
    o += '<circle class="dc-face" cx="100" cy="100" r="92"/>';
    for (var i = 0; i < 60; i++) { var a1 = P(i * 6, 88), a2 = P(i * 6, i % 5 ? 84 : 79); o += '<path class="dc-tick' + (i % 5 ? '' : ' is-hour') + '" d="M' + a1[0].toFixed(1) + ' ' + a1[1].toFixed(1) + 'L' + a2[0].toFixed(1) + ' ' + a2[1].toFixed(1) + '"/>'; }
    /* miss 2: count-by-five dots along the ghost minute hand's way from the 12 */
    if (opts.dots != null) for (var d = 0; d <= opts.dots; d += 30) { var dp = P(d, 56); o += '<circle class="dc-dot" data-dot="' + d + '" cx="' + dp[0].toFixed(1) + '" cy="' + dp[1].toFixed(1) + '" r="4.6"/>'; }
    for (var h = 1; h <= 12; h++) { if (q && h % 3) continue; var n = P(h * 30, 70), bold = opts.bold && opts.bold.indexOf(h) >= 0; o += '<text class="dc-num' + (bold ? ' is-bold' : '') + '" x="' + n[0].toFixed(1) + '" y="' + (n[1] + 8).toFixed(1) + '" text-anchor="middle">' + h + '</text>'; }
    o += '<circle class="dc-rim" cx="100" cy="100" r="92"/>';
    var hand = function (ang, len, cls, extra) { var e = P(ang, len); return '<path class="' + cls + '"' + (extra || '') + ' d="M100 100L' + e[0].toFixed(1) + ' ' + e[1].toFixed(1) + '"/>'; };
    o += hand(C.minuteAngle(t), 58, 'dc-mhand' + (opts.pulseM ? ' is-pulse' : ''), ' data-minute="' + C.minuteAngle(t) + '"') + hand(C.hourAngle(t), 40, 'dc-hhand' + (opts.pulseH ? ' is-pulse' : ''), ' data-hour="' + C.hourAngle(t) + '"');
    /* the card's ghost hands (dashed, the card's colours) */
    if (opts.ghost != null) o += '<g class="dc-ghost" data-ghost="' + opts.ghost + '">' + hand(C.minuteAngle(opts.ghost), 58, 'dc-halo') + hand(C.hourAngle(opts.ghost), 40, 'dc-halo') + hand(C.minuteAngle(opts.ghost), 58, 'dc-gm') + hand(C.hourAngle(opts.ghost), 40, 'dc-gh') + '</g>';
    o += '<circle class="dc-cap" cx="100" cy="100" r="6"/>';
    return o;
  },
  _paintClocks: function () {
    var st = this.st, r = st.round, g = this._g, C = DriveCablesCore, self = this, el = this._qs('.dc-clocks'), loc = this._loc(), v = this._view;
    el.innerHTML = '';
    r.slots.forEach(function (t, s) {
      var pair = self._pairAt(s), opts = {};
      if (pair && pair.error !== undefined && pair.error !== null && st.verdict) {
        var c = r.cards[pair.card]; opts.ghost = c;
        opts.pulseH = C.hourAngle(c) !== C.hourAngle(t); opts.pulseM = C.minuteAngle(c) !== C.minuteAngle(t);
        if (st.help) { opts.dots = C.minuteAngle(c); var x = C.hm(c); opts.bold = x.m ? [x.h % 12 || 12, (x.h % 12) + 1] : [x.h % 12 || 12]; }
      }
      var lit = pair && pair.lit, unit = document.createElement('div'); unit.className = 'dc-unit' + (st.done && r.layout[s] === 'L' ? ' is-lure-done' : '');
      unit.innerHTML = '<span class="dc-lamp dc-art' + (lit ? ' is-on' : '') + '" data-lamp="' + (lit ? 'on' : 'off') + '" aria-hidden="true"></span>';
      var hx = C.hm(t), ha = hx.h % 12 || 12, read = { n: s + 1, a: ha, b: ha % 12 + 1, c: hx.m / 5 || 12 };
      /* before success the clock is read as its HANDS (the reading task), never as its time */
      var label = st.done ? self._t('aClockDone', { n: s + 1, time: C.fmt(loc, t) }) : self._t(hx.m ? 'aClockBetween' : 'aClockOn', read) + (pair ? ' ' + self._t('aCardIn', { time: C.fmt(loc, r.cards[pair.card]) }) : '');
      var b = self._btn('dc-clock' + (self._sel !== null && !st.done ? ' is-target' : ''), 'clock-' + s, label, '<svg class="dc-art" viewBox="0 0 200 200" width="' + g.F + '" height="' + g.F + '" aria-hidden="true">' + self._face(t, opts) + '</svg>');
      b.setAttribute('data-slot', String(s));
      b.addEventListener('click', function () { self._tapClock(s); });
      unit.appendChild(b);
      var sock = document.createElement('span'); sock.className = 'dc-socket dc-art' + (pair ? ' is-full' : ''); sock.setAttribute('data-socket', String(s)); sock.setAttribute('aria-hidden', 'true'); unit.appendChild(sock);
      el.appendChild(unit);
    });
  },
  /* Sprocket peeks out once every lamp is lit — never over a face, a lamp or a card */
  _rooster: function (el, cls) {
    var ro = this._themes['farm-animals'], g = this._g;
    if (!this.st.done || !ro || typeof LCSPictures === 'undefined') return;
    var im = LCSPictures.img(ro, 'rooster', this._loc(), { size: g.rooster }); im.className = 'dc-rooster dc-art' + cls; im.alt = ''; im.setAttribute('data-rooster', '1'); im.style.width = g.rooster + 'px'; im.style.height = g.rooster + 'px'; el.appendChild(im);
  },
  _paintCards: function () {
    var st = this.st, r = st.round, self = this, el = this._qs('.dc-cards'), C = DriveCablesCore, loc = this._loc();
    el.innerHTML = '';
    r.cards.forEach(function (t, c) {
      var x = C.hm(t), txt = C.fmt(loc, t), sepAt = loc === 'fr' ? txt.indexOf(' h') : txt.search(/[:.]/);
      var hh = txt.slice(0, sepAt), sep = loc === 'fr' ? ' h ' : txt.charAt(sepAt), mm = txt.slice(sepAt + sep.length);
      var lab = self._t(st.plugs[c] === null ? 'aCard' : 'aCardPlugged', { time: txt, n: st.plugs[c] === null ? '' : st.plugs[c] + 1 });
      var b = self._btn('dc-card dc-art' + (self._sel === c ? ' is-sel' : '') + (st.plugs[c] !== null ? ' is-plugged' : '') + (st.locked[c] ? ' is-lit' : ''), 'card-' + c, lab,
        '<span class="dc-lcd"><span class="dc-hh">' + self._esc(hh) + '</span><span class="dc-sep">' + self._esc(sep) + '</span><span class="dc-mm">' + self._esc(mm) + '</span></span><span class="dc-plug" aria-hidden="true"></span>');
      b.setAttribute('data-card', String(c)); b.setAttribute('data-plugged', st.plugs[c] === null ? '' : String(st.plugs[c]));
      b.addEventListener('pointerdown', function (e) { if (e.button || st.done || st.locked[c]) return; self._dragPlug(e, c); });
      /* a pointer tap is handled on pointerup (the card is re-drawn, so its click may never come); the click acts only for the keyboard and assistive tech (detail 0) */
      b.addEventListener('click', function (e) { if (e.detail) return; self._tapCard(c); });
      el.appendChild(b);
    });
    /* the rooster joins the row of cards, beside them (never over a face, a lamp or a card) */
    this._rooster(el, ' in-row');
    /* a card's time shrinks until it fits its card (fr « 12 h 45 » on a phone with the rooster beside it) */
    el.querySelectorAll('.dc-lcd').forEach(function (d) { var f = parseFloat(getComputedStyle(d).fontSize); while (d.scrollWidth > d.clientWidth + 1 && f > 14) { f -= 1; d.style.fontSize = f + 'px'; } });
  },
  /* the cables: from each card's plug to its socket, sagging; unplugged ones hang as a short curl */
  _paintCables: function () {
    var st = this.st, board = this._qs('.dc-board'), old = board.querySelector('.dc-cables'); if (old) old.remove();
    var br = board.getBoundingClientRect(), o = '';
    st.plugs.forEach(function (s, c) {
      var card = board.querySelector('[data-card="' + c + '"]'); if (!card) return;
      var cr = card.getBoundingClientRect(), x1 = cr.left + cr.width / 2 - br.left, y1 = cr.top - br.top + 4;
      if (s === null) { o += '<path class="dc-cable is-loose" d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'c-10 -10 10 -14 0 -22"/>'; return; }
      var so = board.querySelector('[data-socket="' + s + '"]'); if (!so) return;
      var sr = so.getBoundingClientRect(), x2 = sr.left + sr.width / 2 - br.left, y2 = sr.top + sr.height / 2 - br.top, sag = Math.max(18, Math.abs(x2 - x1) * 0.25);
      o += '<path class="dc-cable' + (st.locked[c] ? ' is-lit' : '') + '" data-cable="' + c + '" d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'C' + x1.toFixed(1) + ' ' + (y1 - sag).toFixed(1) + ' ' + x2.toFixed(1) + ' ' + (y2 + sag).toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '"/><circle class="dc-plughead" cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="7"/>';
    });
    board.insertAdjacentHTML('beforeend', '<svg class="dc-cables dc-art" width="' + br.width.toFixed(0) + '" height="' + br.height.toFixed(0) + '" aria-hidden="true">' + o + '</svg>');
  },
  _paintGo: function () {
    var st = this.st, self = this, el = this._qs('.dc-goline'); el.innerHTML = '';
    var c = this._btn('dc-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="currentColor"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    c.disabled = st.done; c.addEventListener('click', function () { self._check(); }); el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _after: function () { this._view.note = ''; this._paint(); },
  _plug: function (c, s) { if (!DriveCablesCore.plug(this.st, c, s)) return false; this._sel = null; this.api.sound(180); this._after(); return true; },
  _unplug: function (c) { if (!DriveCablesCore.unplug(this.st, c)) return false; this.api.sound(330); this._after(); return true; },
  /* tap a card: choose it (a second tap on a plugged card pulls its plug out) */
  _tapCard: function (c) {
    var st = this.st; if (st.done || st.locked[c]) return false;
    if (this._sel === c) { if (st.plugs[c] !== null) this._unplug(c); this._sel = null; this._paint(); return true; }
    this._sel = c; this.api.sound(420); this._paint(); return true;
  },
  _tapClock: function (s) {
    var st = this.st; if (st.done) return false;
    if (this._sel === null) { this._view.note = this._t('hintPick'); this._view.soft = true; this._paint(); return false; }
    return this._plug(this._sel, s);
  },
  _dragPlug: function (e, c) {
    var self = this, sx = e.clientX, sy = e.clientY, moved = false, el = e.currentTarget;
    this._endDrag();
    var mv = function (ev) { var dx = ev.clientX - sx, dy = ev.clientY - sy; if (!moved && Math.abs(dx) + Math.abs(dy) < 8) return; moved = true; ev.preventDefault(); el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; el.classList.add('is-drag'); };
    var up = function (ev) {
      self._endDrag(); el.style.transform = '';
      if (!moved) { self._tapCard(c); return; }
      var hit = null; self._wrap.querySelectorAll('.dc-clock').forEach(function (b) { var r = b.getBoundingClientRect(), pad = 24; if (ev.clientX >= r.left - pad && ev.clientX <= r.right + pad && ev.clientY >= r.top - pad && ev.clientY <= r.bottom + pad + 30) hit = +b.getAttribute('data-slot'); });
      if (hit !== null) { if (!self._plug(c, hit)) self._paint(); }
      else if (!self._unplug(c)) self._paint();
    };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  _keyboard: function (e) { if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); } },
  _check: function () {
    var st = this.st, v = this._view, C = DriveCablesCore; if (st.done) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    this._sel = null;
    if (res.result === 'ok') { this._success(); return; }
    v.soft = false; v.note = this._t(C.hint(st));
    this._paint(); this.api.announce(v.note); this.api.sound(240);
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = DriveCablesCore, loc = this._loc(), tip = C.tipOf(r, loc);
    var msg = this._t('okAll', { a: C.fmt(loc, r.cards[0]), b: C.fmt(loc, r.cards[1]), c: C.fmt(loc, r.cards[2]) }) + ' ' + this._t(tip.key, tip.args);
    v.note = ''; v.win = true;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg);
    this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectDriveCablesCSS() {
  if (typeof document === 'undefined' || document.getElementById('dc-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.dc-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .dc-wrap:focus{outline:none;}'
  + '.dc-board{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:30px;padding:6px 0 4px;box-sizing:border-box;border-radius:18px;background:#EFE6D2;box-shadow:inset 0 0 0 2px #CDBFA4;}'
  + '.dc-clocks{position:relative;display:grid;grid-template-columns:repeat(4,auto);justify-content:center;gap:14px;z-index:1;} .dc-wrap.is-narrow .dc-clocks{grid-template-columns:repeat(2,auto);gap:8px 14px;} .dc-wrap.is-row .dc-clocks{grid-template-columns:repeat(4,auto);gap:6px;} .dc-wrap.is-row .dc-lamp{width:14px;height:14px;} .dc-wrap.is-row .dc-socket{width:20px;height:20px;} .dc-wrap.is-row .dc-unit{gap:2px;}'
  + '.dc-unit{display:flex;flex-direction:column;align-items:center;gap:4px;}'
  + '.dc-lamp{width:18px;height:18px;border-radius:50%;background:#CFC6B4;box-shadow:inset 0 0 0 2px #8C7F66;} .dc-lamp.is-on{background:#FFD449;box-shadow:inset 0 0 0 2px #B98B00,0 0 10px 3px rgba(255,212,73,.8);}'
  + '.dc-clock{padding:0;margin:0;border:0;background:none;border-radius:50%;cursor:pointer;line-height:0;} .dc-clock.is-target{box-shadow:0 0 0 3px #2E9C88;} .dc-clock:focus-visible{outline:3px solid #F2784B;outline-offset:2px;}'
  + '.dc-socket{width:26px;height:26px;border-radius:50%;background:radial-gradient(circle,#3A3320 0 4px,#C9A23A 5px 100%);box-shadow:inset 0 0 0 2px #7A5E14;} .dc-socket.is-full{background:radial-gradient(circle,#F2784B 0 7px,#C9A23A 8px 100%);}'
  + '.dc-face{fill:#FFFDF6;} .dc-rim{fill:none;stroke:#146B5E;stroke-width:6;} .dc-tick{stroke:#8A8197;stroke-width:1.2;} .dc-tick.is-hour{stroke:' + INK + ';stroke-width:2.6;}'
  + '.dc-num{font-family:' + H + ';font-weight:800;font-size:22px;fill:' + INK + ';} .dc-num.is-bold{fill:#C4522F;font-size:27px;}'
  + '.dc-hhand{stroke:#F2784B;stroke-width:8;stroke-linecap:round;} .dc-mhand{stroke:#146B5E;stroke-width:5;stroke-linecap:round;} .dc-cap{fill:' + INK + ';}'
  + '.dc-halo{stroke:#fff;stroke-width:11;stroke-linecap:round;fill:none;opacity:.9;} .dc-gh{stroke:#B33F1C;stroke-width:6;stroke-dasharray:7 5;stroke-linecap:round;fill:none;} .dc-gm{stroke:#0B3F37;stroke-width:4.5;stroke-dasharray:7 5;stroke-linecap:round;fill:none;}'
  + '.dc-wrap:not(.is-fast) .is-pulse{animation:dcPulse .6s ease-in-out 3;} .dc-dot{fill:#2E9C88;stroke:#fff;stroke-width:1.5;}'
  + '.dc-cards{position:relative;display:flex;align-items:center;justify-content:center;gap:14px;z-index:3;width:100%;} .dc-wrap.is-narrow .dc-cards{gap:8px;}'
  + '.dc-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;width:150px;padding:6px 8px 8px;border:0;border-radius:14px;background:#3A3F47;box-shadow:inset 0 0 0 3px #22262C,0 3px 0 #1A1D22;cursor:grab;touch-action:none;}'
  + '.dc-card.is-sel{box-shadow:inset 0 0 0 3px #22262C,0 0 0 4px #2E9C88;} .dc-card.is-plugged{opacity:.92;} .dc-card.is-lit{box-shadow:inset 0 0 0 3px #22262C,0 0 0 4px #FFD449;} .dc-card.is-drag{z-index:9;cursor:grabbing;} .dc-card:focus-visible{outline:3px solid #F2784B;outline-offset:2px;}'
  + '.dc-lcd{display:flex;overflow:hidden;white-space:nowrap;align-items:baseline;justify-content:center;width:100%;padding:2px 0;border-radius:8px;background:#DDEBD8;font-family:' + H + ';font-weight:800;font-size:38px;line-height:1.1;}'
  + '.dc-hh{color:#C4522F;} .dc-mm{color:#146B5E;} .dc-sep{color:' + INK + ';}'
  + '.dc-wrap.is-narrow .dc-card{width:auto;flex:1;max-width:120px;min-height:52px;padding:5px 5px 7px;} .dc-wrap.is-narrow .dc-lcd{font-size:26px;} .dc-wrap.is-cramp .dc-lcd{font-size:22px;}'
  + '.dc-cables{position:absolute;left:0;top:0;pointer-events:none;z-index:0;overflow:visible;} .dc-cable{fill:none;stroke:' + INK + ';stroke-width:3;stroke-linecap:round;} .dc-cable.is-loose{stroke-dasharray:3 3;} .dc-cable.is-lit{stroke:#C9A23A;} .dc-plughead{fill:#F2784B;stroke:' + INK + ';stroke-width:2;}'
  + '.dc-rooster{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);object-fit:contain;pointer-events:none;z-index:2;} .dc-rooster.in-row{position:static;transform:none;align-self:center;} .dc-wrap:not(.is-fast) .dc-rooster{animation:dcPeek .6s ease-out both;}'
  + '.dc-wrap:not(.is-fast) .is-lure-done{animation:dcWobble .6s ease-in-out 1;}'
  + '.dc-note{margin:0;max-width:640px;min-height:1.3em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .dc-wrap.is-narrow .dc-note{font-size:16px;line-height:1.25;} .dc-note.is-hint{color:#9A3412;} .dc-wrap.is-narrow .dc-note:empty{display:none;}'
  + '.dc-go{height:52px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0E4F45;} .dc-go svg{width:22px;height:22px;} .dc-go:disabled{opacity:.45;cursor:default;} .dc-wrap.is-narrow .dc-go{height:48px;}'
  + '.dc-wrap.is-done .dc-goline{display:none;} .dc-wrap.is-cramp{gap:6px;} .dc-wrap.is-cramp .dc-board{gap:22px;} .dc-wrap.is-cramp .dc-unit{gap:2px;} .dc-wrap.is-cramp .dc-lamp{width:14px;height:14px;} .dc-wrap.is-cramp .dc-socket{width:22px;height:22px;}'
  + '@keyframes dcPulse{0%,100%{opacity:1;}50%{opacity:.25;}} @keyframes dcPeek{from{opacity:0;scale:.6;}to{opacity:1;scale:1;}} @keyframes dcWobble{0%,100%{transform:rotate(0);}30%{transform:rotate(-4deg);}70%{transform:rotate(3deg);}}'
  + '.dc-wrap.is-fast *{animation:none !important;transition:none !important;}';
  var s = document.createElement('style'); s.id = 'dc-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.DriveCablesActivity = DriveCablesActivity;
