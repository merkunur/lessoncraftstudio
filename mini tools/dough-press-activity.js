/* =====================================================================
   dough-press-activity.js — ACTIVITY #171 of the one-by-one rebuild:
   "Same Size, Different Shape" (2.G.A.3) → THE DOUGH PRESS.
   Model: dough-press-core.js. Design:
   docs/activities-rebuild/designs/171-choice-board.md
   ---------------------------------------------------------------------
   Cut shapes are slabs of dough. The model's pieces wait as a stack of
   round patties on the left platter; on Check the chosen shape's pieces
   go under the press, squash into patties with exactly their amount of
   dough, and their stack is set on the model's: equal patties vanish into
   each other, a bigger one shows a rim, a smaller one a gap, an extra one
   rolls off, a missing one leaves an empty ring. FAIR: ribbon every shape
   cut into equal parts (each pressed onto its own plate). WHICH: the
   shaded patties lump together and must fill the card's share. Next
   appears .OK_MS after success.
   ===================================================================== */
var DoughPressActivity = {
  id: 'dough-press-activity',
  /* the drawn apparatus (dough shapes, press, platters, patties, card, plates, shelf): declared for the hierarchy audit */
  apparatusClasses: ['dp-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"The Dough Press","de":"Die Teigpresse","fr":"La presse à pâte","es":"La prensa de masa","pt":"A prensa de massa","it":"La pressa per l’impasto","nl":"De deegpers","sv":"Degpressen","da":"Dejpressen","no":"Deigpressen","fi":"Taikinapuristin"},
    instruction: {"en":"Squash the pieces into patties. Equal shares make equal patties.","de":"Drück die Stücke zu Teigfladen. Gleich große Teile geben gleich große Fladen.","fr":"Écrase les morceaux en galettes de pâte. Des parts égales donnent des galettes égales.","es":"Aplasta los pedazos en discos de masa. Partes iguales dan discos iguales.","pt":"Achate os pedaços em discos de massa. Partes iguais dão discos iguais.","it":"Schiaccia i pezzi in dischi di impasto. Parti uguali danno dischi uguali.","nl":"Druk de stukken plat tot deegrondjes. Gelijke delen geven gelijke rondjes.","sv":"Platta till bitarna till degplattor. Lika stora delar ger lika stora plattor.","da":"Pres stykkerne flade til dejklatter. Lige store dele giver lige store klatter.","no":"Press bitene flate til deigklatter. Like store deler gir like store klatter.","fi":"Litistä palat taikinakiekoiksi. Yhtä suuret osat tekevät yhtä suuret kiekot."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setBoard: {"en":"Board","de":"Spielfeld","fr":"Plateau","es":"Tablero","pt":"Tabuleiro","it":"Tabellone","nl":"Speelbord","sv":"Spelbräde","da":"Spilleplade","no":"Spillebrett","fi":"Pelilauta"},
    bMatch: {"en":"Match the model","de":"Wie das Muster","fr":"Comme le modèle","es":"Igual que el modelo","pt":"Igual ao modelo","it":"Come il modello","nl":"Zoals het voorbeeld","sv":"Som förebilden","da":"Som forbilledet","no":"Som forbildet","fi":"Mallin mukaan"},
    bFair: {"en":"Fair shares","de":"Gerecht geteilt","fr":"Parts égales","es":"Partes iguales","pt":"Partes iguais","it":"Parti uguali","nl":"Eerlijk verdeeld","sv":"Rättvist delat","da":"Retfærdigt delt","no":"Rettferdig delt","fi":"Reilusti jaettu"},
    bWhich: {"en":"Which shows the fraction","de":"Welche zeigt den Bruch","fr":"Laquelle montre la fraction","es":"Cuál muestra la fracción","pt":"Qual mostra a fração","it":"Quale mostra la frazione","nl":"Welke toont de breuk","sv":"Vilken visar bråket","da":"Hvilken viser brøken","no":"Hvilken viser brøken","fi":"Mikä näyttää murtoluvun"},
    setRead: {"en":"Fractions read as","de":"Brüche als","fr":"Les fractions en","es":"Fracciones como","pt":"Frações como","it":"Frazioni come","nl":"Breuken als","sv":"Bråk som","da":"Brøker som","no":"Brøker som","fi":"Murtoluvut"},
    rWords: {"en":"Words","de":"Wörter","fr":"Mots","es":"Palabras","pt":"Palavras","it":"Parole","nl":"Woorden","sv":"Ord","da":"Ord","no":"Ord","fi":"Sanoina"},
    rNumbers: {"en":"Numbers","de":"Zahlen","fr":"Nombres","es":"Números","pt":"Números","it":"Numeri","nl":"Getallen","sv":"Tal","da":"Tal","no":"Tall","fi":"Lukuina"},
    qMatch: {"en":"Find another shape cut into {into} — the pieces may look different.","de":"Such eine andere Form, die in {into} geteilt ist – die Stücke dürfen anders aussehen.","fr":"Trouve une autre forme coupée en {into} : les morceaux peuvent sembler différents.","es":"Busca otra figura dividida en {into}; los pedazos pueden verse distintos.","pt":"Procure outra figura dividida em {into}: os pedaços podem parecer diferentes.","it":"Trova un’altra figura divisa in {into}: i pezzi possono sembrare diversi.","nl":"Zoek een andere vorm die in {into} verdeeld is – de stukken mogen er anders uitzien.","sv":"Hitta en annan form som är delad i {into} – bitarna kan se olika ut.","da":"Find en anden figur, der er delt i {into} – stykkerne må gerne se forskellige ud.","no":"Finn en annen figur som er delt i {into} – bitene kan se forskjellige ut.","fi":"Etsi toinen kuvio, joka on jaettu {into} – palat voivat näyttää erilaisilta."},
    qFair: {"en":"Tie a ribbon on every shape cut into equal parts.","de":"Bind eine Schleife um jede Form, die in gleich große Teile geteilt ist.","fr":"Mets un ruban sur chaque forme coupée en parts égales.","es":"Pon un listón en cada figura dividida en partes iguales.","pt":"Coloque uma fita em cada figura dividida em partes iguais.","it":"Lega un nastro a ogni figura divisa in parti uguali.","nl":"Strik een lint om elke vorm die in gelijke delen verdeeld is.","sv":"Knyt ett band runt varje form som är delad i lika stora delar.","da":"Bind et bånd om hver figur, der er delt i lige store dele.","no":"Knyt et bånd rundt hver figur som er delt i like store deler.","fi":"Sido nauha jokaiseen kuvioon, joka on jaettu yhtä suuriin osiin."},
    qWhich: {"en":"Which shape shows {frac}?","de":"Welche Form zeigt {frac}?","fr":"Quelle forme montre {frac} ?","es":"¿Qué figura muestra {frac}?","pt":"Qual figura mostra {frac}?","it":"Quale figura mostra {frac}?","nl":"Welke vorm laat {frac} zien?","sv":"Vilken form visar {frac}?","da":"Hvilken figur viser {frac}?","no":"Hvilken figur viser {frac}?","fi":"Missä kuviossa on väritetty {frac}?"},
    hintPick: {"en":"Tap the shape you think is right.","de":"Tipp auf die Form, die du für richtig hältst.","fr":"Touche la forme qui te semble juste.","es":"Toca la figura que crees que es la correcta.","pt":"Toque na figura que você acha que está certa.","it":"Tocca la figura che secondo te è giusta.","nl":"Tik op de vorm die volgens jou klopt.","sv":"Tryck på formen som du tror är rätt.","da":"Tryk på den figur, du tror er rigtig.","no":"Trykk på figuren du tror er riktig.","fi":"Napauta kuviota, jonka uskot olevan oikea."},
    hintRibbon: {"en":"Tap every fair shape to tie a ribbon on it.","de":"Tipp auf jede gerecht geteilte Form, dann bekommt sie eine Schleife.","fr":"Touche chaque forme bien partagée pour lui mettre un ruban.","es":"Toca cada figura bien repartida para ponerle un listón.","pt":"Toque em cada figura bem dividida para colocar uma fita.","it":"Tocca ogni figura divisa in parti uguali per legarle un nastro.","nl":"Tik op elke eerlijk verdeelde vorm om er een lint om te strikken.","sv":"Tryck på varje rättvist delad form så får den ett band.","da":"Tryk på hver retfærdigt delt figur, så får den et bånd.","no":"Trykk på hver rettferdig delt figur, så får den et bånd.","fi":"Napauta jokaista reilusti jaettua kuviota, niin se saa nauhan."},
    hintPatties: {"en":"Are the patties the same size as the model’s? Are there as many?","de":"Sind die Fladen so groß wie die vom Muster? Sind es gleich viele?","fr":"Les galettes sont-elles aussi grandes que celles du modèle ? Y en a-t-il autant ?","es":"¿Los discos son del mismo tamaño que los del modelo? ¿Hay la misma cantidad?","pt":"Os discos são do mesmo tamanho que os do modelo? Há a mesma quantidade?","it":"I dischi sono grandi come quelli del modello? Sono tanti quanti quelli del modello?","nl":"Zijn de rondjes even groot als die van het voorbeeld? Zijn het er evenveel?","sv":"Är plattorna lika stora som förebildens? Är de lika många?","da":"Er klatterne lige så store som forbilledets? Er der lige så mange?","no":"Er klattene like store som forbildets? Er det like mange?","fi":"Ovatko kiekot yhtä suuria kuin mallin kiekot? Onko niitä yhtä monta?"},
    hintFair: {"en":"A fair shape makes patties that are all the same size.","de":"Eine gerecht geteilte Form gibt Fladen, die alle gleich groß sind.","fr":"Une forme bien partagée donne des galettes toutes de la même taille.","es":"Una figura bien repartida da discos todos del mismo tamaño.","pt":"Uma figura bem dividida dá discos todos do mesmo tamanho.","it":"Una figura divisa in parti uguali dà dischi tutti uguali.","nl":"Een eerlijk verdeelde vorm geeft rondjes die allemaal even groot zijn.","sv":"En rättvist delad form ger plattor som är lika stora allihop.","da":"En retfærdigt delt figur giver klatter, der er lige store allesammen.","no":"En rettferdig delt figur gir klatter som er like store alle sammen.","fi":"Reilusti jaettu kuvio tekee kiekkoja, jotka ovat kaikki yhtä suuria."},
    hintMore: {"en":"Some fair shapes still have no ribbon.","de":"Ein paar gerecht geteilte Formen haben noch keine Schleife.","fr":"Certaines formes bien partagées n’ont pas encore de ruban.","es":"Algunas figuras bien repartidas todavía no tienen listón.","pt":"Algumas figuras bem divididas ainda não têm fita.","it":"Alcune figure divise in parti uguali non hanno ancora il nastro.","nl":"Een paar eerlijk verdeelde vormen hebben nog geen lint.","sv":"Några rättvist delade former har inget band än.","da":"Nogle retfærdigt delte figurer har endnu ikke et bånd.","no":"Noen rettferdig delte figurer har ikke bånd ennå.","fi":"Joillakin reilusti jaetuilla kuvioilla ei ole vielä nauhaa."},
    hintCard: {"en":"The coral lump must fill its dashed ring exactly, and the other lump the other ring. Look at the coral lump.","de":"Der orangefarbene Klumpen muss genau in seinen gestrichelten Ring passen, der andere Klumpen in den anderen. Schau dir den orangefarbenen Klumpen an.","fr":"La boule orange doit remplir exactement son cercle en pointillés, et l’autre boule l’autre cercle. Regarde la boule orange.","es":"La bola naranja debe llenar justo su círculo punteado, y la otra bola el otro círculo. Mira la bola naranja.","pt":"A bola laranja precisa encher certinho o seu círculo pontilhado, e a outra bola o outro círculo. Olhe a bola laranja.","it":"La palla arancione deve riempire esattamente il suo cerchio tratteggiato, e l’altra palla l’altro cerchio. Guarda la palla arancione.","nl":"De oranje bal moet precies zijn gestippelde ring vullen, en de andere bal de andere ring. Kijk naar de oranje bal.","sv":"Den orange klumpen ska fylla sin streckade ring precis, och den andra klumpen den andra ringen. Titta på den orange klumpen.","da":"Den orange klump skal fylde sin stiplede ring helt præcist, og den anden klump den anden ring. Se på den orange klump.","no":"Den oransje klumpen skal fylle sin stiplede ring nøyaktig, og den andre klumpen den andre ringen. Se på den oransje klumpen.","fi":"Oranssin pallon täytyy täyttää katkoviivarenkaansa täsmälleen ja toisen pallon toinen rengas. Katso oranssia palloa."},
    hintCompare: {"en":"Compare the patties, then choose again.","de":"Vergleich die Fladen und such dann noch einmal aus.","fr":"Compare les galettes, puis choisis à nouveau.","es":"Compara los discos y vuelve a elegir.","pt":"Compare os discos e escolha de novo.","it":"Confronta i dischi, poi scegli di nuovo.","nl":"Vergelijk de rondjes en kies dan opnieuw.","sv":"Jämför plattorna och välj sedan igen.","da":"Sammenlign klatterne, og vælg så igen.","no":"Sammenlign klattene, og velg så på nytt.","fi":"Vertaa kiekkoja ja valitse sitten uudelleen."},
    okMatch: {"en":"Yes — {fp}! Different shapes, the same amount of dough.","de":"Ja – {fp}! Andere Formen, gleich viel Teig.","fr":"Oui : des {fp} ! Des formes différentes, la même quantité de pâte.","es":"¡Sí, {fp}! Formas distintas, la misma cantidad de masa.","pt":"Isso, {fp}! Formas diferentes, a mesma quantidade de massa.","it":"Sì, {fp}! Forme diverse, la stessa quantità di impasto.","nl":"Ja, {fp}! Andere vormen, evenveel deeg.","sv":"Ja – {fp}! Olika former, lika mycket deg.","da":"Ja – {fp}! Forskellige figurer, lige meget dej.","no":"Ja – {fp}! Forskjellige figurer, like mye deig.","fi":"Kyllä – {fp}! Eri muodot, sama määrä taikinaa."},
    okFair: {"en":"Yes — these {k} are fair: every patty the same size.","de":"Ja – diese {k} sind gerecht geteilt: alle Fladen gleich groß.","fr":"Oui : ces {k} formes sont bien partagées, toutes les galettes de la même taille.","es":"¡Sí! Estas {k} están bien repartidas: todos los discos del mismo tamaño.","pt":"Isso! Estas {k} estão bem divididas: todos os discos do mesmo tamanho.","it":"Sì: queste {k} sono divise in parti uguali, tutti i dischi uguali.","nl":"Ja, deze {k} zijn eerlijk verdeeld: alle rondjes even groot.","sv":"Ja – de här {k} är rättvist delade: alla plattor lika stora.","da":"Ja – de her {k} er retfærdigt delt: alle klatter lige store.","no":"Ja – disse {k} er rettferdig delt: alle klattene like store.","fi":"Kyllä – nämä {k} on jaettu reilusti: kaikki kiekot yhtä suuria."},
    okWhichEq: {"en":"Yes — {frac}: {k} of {n} equal parts is the same amount as {kc} of {nc}.","de":"Ja – {frac}: {k} von {n} gleich großen Teilen sind genauso viel wie {kc} von {nc}.","fr":"Oui : {frac}, {k} parts égales sur {n}, c’est autant que {kc} sur {nc}.","es":"¡Sí, {frac}! {k} de {n} partes iguales es lo mismo que {kc} de {nc}.","pt":"Isso, {frac}! {k} de {n} partes iguais é o mesmo tanto que {kc} de {nc}.","it":"Sì: {frac}, {k} su {n} parti uguali sono tanto quanto {kc} su {nc}.","nl":"Ja, {frac}: {k} van de {n} gelijke delen is evenveel als {kc} van de {nc}.","sv":"Ja – {frac}: {k} av {n} lika stora delar är lika mycket som {kc} av {nc}.","da":"Ja – {frac}: {k} af {n} lige store dele er lige så meget som {kc} af {nc}.","no":"Ja – {frac}: {k} av {n} like store deler er like mye som {kc} av {nc}.","fi":"Kyllä – {frac}: {k}/{n} yhtä suurista osista on yhtä paljon kuin {kc}/{nc}."},
    okWhich: {"en":"Yes — {frac}: {k} of {n} equal parts.","de":"Ja – {frac}: {k} von {n} gleich großen Teilen.","fr":"Oui : {frac}, {k} parts égales sur {n}.","es":"¡Sí, {frac}! {k} de {n} partes iguales.","pt":"Isso, {frac}! {k} de {n} partes iguais.","it":"Sì: {frac}, {k} su {n} parti uguali.","nl":"Ja, {frac}: {k} van de {n} gelijke delen.","sv":"Ja – {frac}: {k} av {n} lika stora delar.","da":"Ja – {frac}: {k} af {n} lige store dele.","no":"Ja – {frac}: {k} av {n} like store deler.","fi":"Kyllä – {frac}: väritettyjä osia {k}, yhtä suuria osia {n}."},
    aTile: {"en":"Shape {k} of {n}, cut into {p} pieces","de":"Form {k} von {n}, in {p} Stücke geteilt","fr":"Forme {k} sur {n}, coupée en {p} morceaux","es":"Figura {k} de {n}, dividida en {p} pedazos","pt":"Figura {k} de {n}, dividida em {p} pedaços","it":"Figura {k} di {n}, divisa in {p} pezzi","nl":"Vorm {k} van {n}, in {p} stukken verdeeld","sv":"Form {k} av {n}, delad i {p} bitar","da":"Figur {k} af {n}, delt i {p} stykker","no":"Figur {k} av {n}, delt i {p} biter","fi":"Kuvio {k}/{n}, jaettu {p} palaan"},
    aTile1: {"en":"Shape {k} of {n}, not cut","de":"Form {k} von {n}, nicht geteilt","fr":"Forme {k} sur {n}, pas coupée","es":"Figura {k} de {n}, sin dividir","pt":"Figura {k} de {n}, sem dividir","it":"Figura {k} di {n}, non divisa","nl":"Vorm {k} van {n}, niet verdeeld","sv":"Form {k} av {n}, inte delad","da":"Figur {k} af {n}, ikke delt","no":"Figur {k} av {n}, ikke delt","fi":"Kuvio {k}/{n}, jakamaton"},
    aTileShaded: {"en":"Shape {k} of {n}, cut into {p} pieces, {s} coral","de":"Form {k} von {n}, in {p} Stücke geteilt, {s} orange","fr":"Forme {k} sur {n}, coupée en {p} morceaux, {s} en orange","es":"Figura {k} de {n}, dividida en {p} pedazos, {s} en naranja","pt":"Figura {k} de {n}, dividida em {p} pedaços, {s} em laranja","it":"Figura {k} di {n}, divisa in {p} pezzi, {s} in arancione","nl":"Vorm {k} van {n}, in {p} stukken verdeeld, {s} oranje","sv":"Form {k} av {n}, delad i {p} bitar, {s} orange","da":"Figur {k} af {n}, delt i {p} stykker, {s} orange","no":"Figur {k} av {n}, delt i {p} biter, {s} oransje","fi":"Kuvio {k}/{n}, jaettu {p} palaan, oransseja {s}"},
    aModel: {"en":"The model, cut into {p} pieces","de":"Das Muster, in {p} Stücke geteilt","fr":"Le modèle, coupé en {p} morceaux","es":"El modelo, dividido en {p} pedazos","pt":"O modelo, dividido em {p} pedaços","it":"Il modello, diviso in {p} pezzi","nl":"Het voorbeeld, in {p} stukken verdeeld","sv":"Förebilden, delad i {p} bitar","da":"Forbilledet, delt i {p} stykker","no":"Forbildet, delt i {p} biter","fi":"Malli, jaettu {p} palaan"},
    aCard: {"en":"The card: {frac}","de":"Die Karte: {frac}","fr":"La carte : {frac}","es":"La tarjeta: {frac}","pt":"O cartão: {frac}","it":"La scheda: {frac}","nl":"De kaart: {frac}","sv":"Kortet: {frac}","da":"Kortet: {frac}","no":"Kortet: {frac}","fi":"Kortti: {frac}"},
    aPlatterL: {"en":"The model’s patties","de":"Die Fladen vom Muster","fr":"Les galettes du modèle","es":"Los discos del modelo","pt":"Os discos do modelo","it":"I dischi del modello","nl":"De rondjes van het voorbeeld","sv":"Förebildens plattor","da":"Forbilledets klatter","no":"Forbildets klatter","fi":"Mallin kiekot"},
    aPlatterR: {"en":"The patties of the shape you chose","de":"Die Fladen der Form, die du ausgesucht hast","fr":"Les galettes de la forme que tu as choisie","es":"Los discos de la figura que elegiste","pt":"Os discos da figura que você escolheu","it":"I dischi della figura che hai scelto","nl":"De rondjes van de vorm die je koos","sv":"Plattorna från formen du valde","da":"Klatterne fra den figur, du valgte","no":"Klattene fra figuren du valgte","fi":"Valitsemasi kuvion kiekot"}
  },/*STRINGS-END*/
  /* the fraction words per locale: plural nouns (match), the "into" form, and the amounts (which) */
  /*FRAC-BEGIN*/FRAC: {
    en: {"plural":{"2":"halves","3":"thirds","4":"fourths"},"into":{"2":"halves","3":"thirds","4":"fourths"},"amount":{"1/2":"one half","1/3":"one third","2/3":"two thirds","1/4":"one fourth","2/4":"two fourths","3/4":"three fourths"}},
    de: {"plural":{"2":"Hälften","3":"Drittel","4":"Viertel"},"into":{"2":"zwei Hälften","3":"Drittel","4":"Viertel"},"amount":{"1/2":"die Hälfte","1/3":"ein Drittel","2/3":"zwei Drittel","1/4":"ein Viertel","2/4":"zwei Viertel","3/4":"drei Viertel"}},
    fr: {"plural":{"2":"moitiés","3":"tiers","4":"quarts"},"into":{"2":"deux moitiés","3":"trois tiers","4":"quatre quarts"},"amount":{"1/2":"la moitié","1/3":"un tiers","2/3":"deux tiers","1/4":"un quart","2/4":"deux quarts","3/4":"trois quarts"}},
    es: {"plural":{"2":"mitades","3":"tercios","4":"cuartos"},"into":{"2":"dos mitades","3":"tres tercios","4":"cuatro cuartos"},"amount":{"1/2":"un medio","1/3":"un tercio","2/3":"dos tercios","1/4":"un cuarto","2/4":"dos cuartos","3/4":"tres cuartos"}},
    pt: {"plural":{"2":"metades","3":"terços","4":"quartos"},"into":{"2":"duas metades","3":"três terços","4":"quatro quartos"},"amount":{"1/2":"um meio","1/3":"um terço","2/3":"dois terços","1/4":"um quarto","2/4":"dois quartos","3/4":"três quartos"}},
    it: {"plural":{"2":"metà","3":"terzi","4":"quarti"},"into":{"2":"due metà","3":"tre terzi","4":"quattro quarti"},"amount":{"1/2":"un mezzo","1/3":"un terzo","2/3":"due terzi","1/4":"un quarto","2/4":"due quarti","3/4":"tre quarti"}},
    nl: {"plural":{"2":"helften","3":"derde delen","4":"kwarten"},"into":{"2":"helften","3":"derde delen","4":"kwarten"},"amount":{"1/2":"de helft","1/3":"een derde","2/3":"twee derde","1/4":"een kwart","2/4":"twee kwart","3/4":"drie kwart"}},
    sv: {"plural":{"2":"halvor","3":"tredjedelar","4":"fjärdedelar"},"into":{"2":"halvor","3":"tredjedelar","4":"fjärdedelar"},"amount":{"1/2":"en halv","1/3":"en tredjedel","2/3":"två tredjedelar","1/4":"en fjärdedel","2/4":"två fjärdedelar","3/4":"tre fjärdedelar"}},
    da: {"plural":{"2":"halvdele","3":"tredjedele","4":"fjerdedele"},"into":{"2":"halvdele","3":"tredjedele","4":"fjerdedele"},"amount":{"1/2":"en halv","1/3":"en tredjedel","2/3":"to tredjedele","1/4":"en fjerdedel","2/4":"to fjerdedele","3/4":"tre fjerdedele"}},
    no: {"plural":{"2":"halvdeler","3":"tredeler","4":"firedeler"},"into":{"2":"halvdeler","3":"tredeler","4":"firedeler"},"amount":{"1/2":"en halv","1/3":"en tredel","2/3":"to tredeler","1/4":"en firedel","2/4":"to firedeler","3/4":"tre firedeler"}},
    fi: {"plural":{"2":"puolikkaat","3":"kolmasosat","4":"neljäsosat"},"into":{"2":"puolikkaiksi","3":"kolmasosiksi","4":"neljäsosiksi"},"amount":{"1/2":"yksi puolikas","1/3":"yksi kolmasosa","2/3":"kaksi kolmasosaa","1/4":"yksi neljäsosa","2/4":"kaksi neljäsosaa","3/4":"kolme neljäsosaa"}}
  },/*FRAC-END*/
  defaults: { board: 'match', read: 'words' },
  settings: [
    { key: 'board', type: 'choice', labelKey: 'setBoard', options: [{ value: 'match', labelKey: 'bMatch' }, { value: 'fair', labelKey: 'bFair' }, { value: 'which', labelKey: 'bWhich' }] },
    { key: 'read', type: 'choice', labelKey: 'setRead', options: [{ value: 'words', labelKey: 'rWords' }, { value: 'numbers', labelKey: 'rNumbers' }] }
  ],
  OK_MS: 500, FAST: false,
  TEAL: '#146B5E', CORAL: '#F2784B', INK: '#2B2B2B', DOUGH: '#F4D9A8', DOUGH2: '#E8C68A', PAPER: '#FFFDF6',

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this.shelf = 0;
    injectDoughPressCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _board: function () { return DoughPressCore.boardOf(this._setting('board')); },
  _read: function () { return this._setting('read') === 'numbers' ? 'numbers' : 'words'; },
  _loc: function () { return DoughPressCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._board(); },
  _frac: function () { return this.FRAC[this._loc()] || this.FRAC.en; },
  /* the plural noun of the model's fraction (halves, thirds, fourths) */
  _plural: function (n) { return this._frac().plural[n]; },
  _into: function (n) { return this._frac().into[n]; },
  /* an amount k/n as words or as numbers */
  _amount: function (k, n) { return this._read() === 'numbers' ? k + '/' + n : this._frac().amount[k + '/' + n]; },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = DoughPressCore.rounds(this._board()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = DoughPressCore, pool = this._ensurePool(), n = C.passSize(this._board()), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(this._board(), Math.random, fresh ? null : this._prev, pass); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'dough-press.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k, pass); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _modelN: function () { return DoughPressCore.nPieces(DoughPressCore.figure(this.st.round.model)); },
  _taskLine: function () {
    var st = this.st;
    if (st.board === 'fair') return this._t('qFair');
    if (st.board === 'which') return this._t('qWhich', { frac: this._amount(st.round.card[0], st.round.card[1]) });
    var n = this._modelN();
    return this._t('qMatch', { fp: this._plural(n), into: this._into(n) });
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k, pass) {
    this._clearTimers();
    this.st = DoughPressCore.newState(this._board(), k, pass || 0);
    this._view = { note: '', soft: false, anim: null, pressed: false, free: null, glaze: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0, 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'dp-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="dp-main"><div class="dp-left" data-qa="left"></div><div class="dp-tiles" data-qa="tiles"></div></div><p class="dp-note" data-qa="note" aria-live="polite"></p><div class="dp-ctrl"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _geometry: function (W) {
    var st = this.st, wide = W >= 600, cramp = W < 300, fair = st.board === 'fair';
    var cols = fair ? 3 : 2, leftW = wide && !fair ? 300 : W, tilesW = wide && !fair ? W - leftW - 16 : W;
    var gap = wide ? 12 : cramp ? 6 : 8, tile = Math.floor(Math.min(wide ? (fair ? 150 : 160) : fair ? (cramp ? 84 : 98) : cramp ? 104 : 136, (tilesW - (cols - 1) * gap) / cols));
    var inTile = !wide && !fair && st.help && !!st.verdict;
    /* one drawing scale for every whole in the round: px per unit, so the 100-unit wide shape fills the tile's inner box */
    var inner = tile - (fair ? 16 : 22), s = inner / 100 * (inTile ? (tile - 54) / (tile - 22) : 1), platter = wide ? 124 : cramp ? 70 : 82;
    /* the patties have their own scale. MATCH: one scale per round, so the largest piece of the round (the model or any
       tile, the uncut whole aside: its one big patty may spill over its slot) just fits a tray slot; the other boards: a half of the square fills 82 % of the platter's width */
    var cell = wide ? 86 : cramp ? 46 : 66, sp = platter * 0.41 / DoughPressCore.pattyR(5000);
    if (st.board === 'match') { var C = DoughPressCore, maxA = 0; [st.round.model].concat(st.tiles.map(function (t) { return t.fig; })).forEach(function (id) { if (/notsplit/.test(id)) return; C.areas(C.figure(id)).forEach(function (x) { if (x > maxA) maxA = x; }); }); sp = (cell / 2 - 3) / C.pattyR(maxA); }
    return { W: W, wide: wide, cramp: cramp, fair: fair, cols: cols, leftW: leftW, tilesW: tilesW, gap: gap, tile: tile, s: s, sp: sp, platter: platter, cell: cell, inTile: inTile };
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    var st = this.st, v = this._view, g = this._g = this._geometry(this._width());
    this._wrap.setAttribute('lang', this._loc());
    this._wrap.className = 'dp-wrap is-' + st.board + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '');
    this._paintLeft(); this._paintTiles(); this._paintCtrl();
    var note = this._qs('.dp-note');
    note.textContent = v.note || ''; note.className = 'dp-note' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _pts: function (poly, s, ox, oy) { return poly.map(function (p) { return (ox + p[0] * s).toFixed(1) + ',' + (oy + p[1] * s).toFixed(1); }).join(' '); },

  /* a cut shape in dough: its pieces filled, the outline and the seams in ink; shaded pieces coral-glazed */
  _shapeSvg: function (figId, s, shaded, cls) {
    var f = DoughPressCore.figure(figId), w = f.W * s, h = f.H * s, pad = 3, self = this;
    var o = '<svg class="dp-shape' + (cls || '') + '" width="' + (w + 2 * pad) + '" height="' + (h + 2 * pad) + '" aria-hidden="true">';
    f.pieces.forEach(function (p, i) { var sh = shaded && shaded.indexOf(i) >= 0; o += '<polygon points="' + self._pts(p, s, pad, pad) + '" fill="' + (sh ? self.CORAL : self.DOUGH) + '" stroke="#B98A4E" stroke-width="2.5" stroke-linejoin="round"/>'; });
    /* a soft speckle so it reads as dough */
    for (var d = 0; d < 9; d++) { var x = pad + ((d * 37) % 97) / 100 * w, y = pad + ((d * 61 + 13) % 89) / 100 * h; o += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.4" fill="#C9A66E" opacity=".55"/>'; }
    o += '<rect x="' + pad + '" y="' + pad + '" width="' + w + '" height="' + h + '" fill="none" stroke="' + this.INK + '" stroke-width="3" rx="2"/>';
    return o + '</svg>';
  },
  /* the tray: up to four slots (2 × 2), each a model patty seen from above; after the press each holds the pair
     (model l, chosen r): ok = one patty with a teal outline · over = a coral rim round the model's patty · under = a
     pale ring of the model's patty round the smaller one · extra = a patty with nothing under it, wobbling · missing =
     an empty dashed ring. While the press runs, the current piece squashes in the next free slot. */
  _traySvg: function (pairs, cls, anim) {
    var g = this._g, c = g.cell, n = Math.max(1, pairs.length), cols = n > 1 ? 2 : 1, rows = Math.ceil(Math.max(n, anim ? 1 : 0) / cols), W = cols * c, H = Math.max(1, rows) * c, self = this;
    if (anim) { var need = Math.max(n, anim.i + 1); rows = Math.ceil(need / 2); H = Math.max(rows, 1) * c; W = 2 * c; cols = 2; }
    var o = '<svg class="dp-traysvg' + (cls || '') + '" width="' + W + '" height="' + H + '" aria-hidden="true"><rect x="1" y="1" width="' + (W - 2) + '" height="' + (H - 2) + '" rx="12" fill="#FFFDF6" stroke="#D8C9A6" stroke-width="2"/>';
    var circ = function (cx, cy, r, fill, stroke, w, extra) { return '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + Math.max(1, r).toFixed(1) + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + w + '"' + (extra || '') + '/>'; };
    pairs.forEach(function (p, i) {
      var cx = (i % cols + 0.5) * c, cy = (Math.floor(i / cols) + 0.5) * c, D = self.DOUGH, E = '#B98A4E';
      if (p.fit === 'rest' || (anim && p.fit !== 'extra')) { o += circ(cx, cy, p.l, D, E, 2); return; }
      if (p.fit === 'ok') { o += circ(cx, cy, p.l, D, self.TEAL, 3.5, ' class="dp-fit"'); return; }
      if (p.fit === 'over') { o += circ(cx, cy, p.r, self.CORAL, '#B4502C', 2, ' class="dp-over"') + circ(cx, cy, p.l, D, E, 2); return; }
      if (p.fit === 'under') { o += circ(cx, cy, p.l, '#FBEFD9', '#C9B48A', 2, ' class="dp-gap"') + circ(cx, cy, p.r, D, E, 2, ' class="dp-under"'); return; }
      if (p.fit === 'extra') { o += '<g class="dp-extra">' + circ(cx, cy, p.r, D, self.CORAL, 2.5, ' stroke-dasharray="6 4"') + '</g>'; return; }
      if (p.fit === 'missing') { o += circ(cx, cy, p.l, 'none', self.TEAL, 2.5, ' class="dp-missing" stroke-dasharray="5 4"'); }
    });
    if (anim) {
      /* the piece under the press, squashing toward its patty (its area kept at every step) */
      var C = DoughPressCore, f = C.figure(anim.fig), poly = f.pieces[anim.i], s = g.sp * Math.sqrt(C.K), M = C.morph(poly, anim.t), mx = 0, my = 0;
      M.forEach(function (p) { mx += p[0]; my += p[1]; }); mx /= M.length; my /= M.length;
      var slot = Math.min(anim.i, rows * 2 - 1), sx = (slot % 2 + 0.5) * c, sy = (Math.floor(slot / 2) + 0.5) * c;
      o += '<polygon class="dp-squash" points="' + this._pts(M, s, sx - mx * s, sy - my * s) + '" fill="' + this.DOUGH + '" stroke="' + this.CORAL + '" stroke-width="2" fill-opacity=".92"/>';
    }
    return o + '</svg>';
  },
  /* a row of patties (miss-2 previews, fair plates) */
  _pattyRow: function (radii, W, kinds) {
    var tot = radii.reduce(function (s, r) { return s + 2 * r + 4; }, 0), k = Math.min(1, (W - 6) / tot), x = (W - tot * k) / 2, maxR = Math.max.apply(null, radii.concat([4])) * k, self = this;
    var o = '<svg class="dp-row" width="' + W + '" height="' + Math.ceil(2 * maxR + 6) + '" aria-hidden="true">';
    radii.forEach(function (r, i) { var rr = r * k, kind = kinds ? kinds[i] : 'dough'; o += '<circle cx="' + (x + 2 + rr).toFixed(1) + '" cy="' + (maxR + 3).toFixed(1) + '" r="' + rr.toFixed(1) + '" fill="' + (kind === 'coral' ? self.CORAL : kind === 'teal' ? '#8CC7BC' : self.DOUGH) + '" stroke="#B98A4E" stroke-width="1.6"/>'; x += 2 * rr + 4 * k; });
    return o + '</svg>';
  },
  _pxR: function (a) { return DoughPressCore.pattyR(a) * this._g.sp; },

  /* ---- the left: the model on its board (or the card) and the press with its two platters ---- */
  _paintLeft: function () {
    var st = this.st, g = this._g, v = this._view, el = this._qs('.dp-left'), C = DoughPressCore, self = this;
    el.innerHTML = ''; el.style.width = g.wide && !g.fair ? g.leftW + 'px' : '';
    if (st.board === 'fair') { el.style.display = 'none'; return; }
    el.style.display = '';
    var top = this.api.el('div', 'dp-board');
    if (st.board === 'match') {
      top.setAttribute('aria-label', this._t('aModel', { p: this._modelN() }));
      top.innerHTML = this._shapeSvg(st.round.model, g.s);
    } else {
      var c = st.round.card, n = c[1], k = c[0], a = C.total(C.figure(st.tiles[0].fig)) / n, r = this._pxR(a) * (g.wide ? 0.82 : 0.58), row = [], kinds = [];
      for (var i = 0; i < n; i++) { row.push(r); kinds.push(i < k ? 'coral' : 'teal'); }
      top.className = 'dp-board dp-card'; top.setAttribute('aria-label', this._t('aCard', { frac: k + '/' + n }));
      var big = this._read() === 'numbers' ? '<span class="dp-num"><b>' + k + '</b><i></i><b>' + n + '</b></span>' : '<span class="dp-word">' + this._esc(this._amount(k, n)) + '</span>';
      top.innerHTML = big + this._outlineRow(row, kinds);
    }
    /* the press row. MATCH: the tray of the model's patties (seen from above, largest first); on Check the chosen shape's
       patties land centred on them. On a phone the tray sits beside the model and the press drawing steps aside. */
    var press = this.api.el('div', 'dp-pressrow');
    if (g.wide || st.board !== 'match') el.appendChild(top);
    if (st.board === 'match') {
      if (!g.wide) press.appendChild(top);
      else press.insertAdjacentHTML('beforeend', this._pressSvg());
      var model = C.patties(C.figure(st.round.model)).map(function (r) { return r * g.sp; });
      var tray = this.api.el('div', 'dp-tray'); tray.setAttribute('data-qa', 'tray');
      var tileId = v.free != null ? st.tiles[v.free].fig : st.sel != null ? st.tiles[st.sel].fig : null;
      tray.setAttribute('aria-label', this._t(v.pressed && tileId ? 'aPlatterR' : 'aPlatterL'));
      if (v.pressed && v.anim == null && tileId) {
        var right = C.patties(C.figure(tileId)).map(function (r) { return r * g.sp; });
        tray.innerHTML = this._traySvg(C.stackFit(model, right), (st.done || v.glaze) ? ' is-glaze' : '');
      } else tray.innerHTML = this._traySvg(C.stackFit(model, []).map(function (f) { return { l: f.l, r: null, fit: 'rest' }; }), '', v.anim);
      press.appendChild(tray);
    } else {
      /* WHICH: the lump row under the card — the shaded patties rolled into one coral lump, the rest into one teal lump,
         each set in its outline (the card's share and the rest) */
      var lumpBox = this.api.el('div', 'dp-lumps');
      if (v.pressed && v.anim == null && (st.sel != null || v.free != null)) lumpBox.innerHTML = this._lumpSvg(st.tiles[v.free != null ? v.free : st.sel], st.round.card, g.wide ? 240 : g.cramp ? 128 : 150);
      else lumpBox.innerHTML = v.anim ? this._animSvg(g.wide ? 240 : 200) : '';
      press.appendChild(lumpBox);
      if (g.wide) press.insertAdjacentHTML('afterbegin', this._pressSvg());
      else if (lumpBox.innerHTML) { el.removeChild(top); press.insertBefore(top, lumpBox); }
    }
    el.appendChild(press);
    /* the shelf: one bell jar per finished round this session */
    if (g.wide && this.shelf) { var shelf = this.api.el('div', 'dp-shelf'); var jars = ''; for (var j = 0; j < Math.min(this.shelf, 8); j++) jars += '<svg width="22" height="26" aria-hidden="true"><path d="M3 24 V12 a8 8 0 0 1 16 0 V24" fill="rgba(140,199,188,.25)" stroke="' + this.TEAL + '" stroke-width="2"/><circle cx="11" cy="3" r="2" fill="' + this.TEAL + '"/><rect x="5" y="18" width="12" height="5" rx="2" fill="' + this.DOUGH + '"/></svg>'; shelf.innerHTML = jars + '<span class="dp-shelfboard"></span>'; el.appendChild(shelf); }
  },
  _outlineRow: function (radii, kinds) {
    var tot = radii.reduce(function (s, r) { return s + 2 * r + 6; }, 0), x = 3, maxR = Math.max.apply(null, radii), self = this;
    var o = '<svg class="dp-outlines" width="' + Math.ceil(tot + 6) + '" height="' + Math.ceil(2 * maxR + 6) + '" aria-hidden="true">';
    radii.forEach(function (r, i) { o += '<circle cx="' + (x + r).toFixed(1) + '" cy="' + (maxR + 3).toFixed(1) + '" r="' + r.toFixed(1) + '" fill="none" stroke="' + (kinds[i] === 'coral' ? self.CORAL : self.TEAL) + '" stroke-width="3" stroke-dasharray="5 4"/>'; x += 2 * r + 6; });
    return o + '</svg>';
  },
  _lumpSvg: function (tile, card, W) {
    var C = DoughPressCore, f = C.figure(tile.fig), A = C.areas(f), T = C.total(f), sh = A.filter(function (a, i) { return tile.shaded.indexOf(i) >= 0; }).reduce(function (s, a) { return s + a; }, 0);
    var q = this._g.wide ? 0.7 : this._g.cramp ? 0.42 : 0.5, want = T * card[0] / card[1], R1 = this._pxR(want) * q, R2 = this._pxR(T - want) * q, r1 = this._pxR(sh) * q, r2 = this._pxR(T - sh) * q, self = this;
    var H = Math.max(R1, R2, r1, r2) * 2 + 10, cx1 = W * 0.3, cx2 = W * 0.72, cy = H / 2;
    var lump = function (cx, Rw, r, fill, stroke, outline) {
      var fit = Math.abs(r - Rw) <= 0.002 * Rw, o2 = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r.toFixed(1) + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2" class="' + (fit ? 'dp-fit' : r > Rw ? 'dp-over' : 'dp-under') + '"/>';
      return o2 + '<circle cx="' + cx + '" cy="' + cy + '" r="' + Rw.toFixed(1) + '" fill="none" stroke="' + outline + '" stroke-width="3" stroke-dasharray="5 4"/>';
    };
    return '<svg class="dp-lump" width="' + W + '" height="' + Math.ceil(H) + '" aria-hidden="true">' + lump(cx1, R1, r1, this.CORAL, '#B4502C', this.CORAL) + lump(cx2, R2, r2, '#8CC7BC', '#146B5E', this.TEAL) + '</svg>';
  },
  _pressSvg: function () {
    var down = this._view.anim ? ' is-down' : '';
    return '<svg class="dp-press' + down + '" width="64" height="86" viewBox="0 0 64 86" aria-hidden="true"><rect x="6" y="4" width="8" height="78" rx="3" fill="#B98A4E" stroke="' + this.INK + '" stroke-width="2"/><rect x="50" y="4" width="8" height="78" rx="3" fill="#B98A4E" stroke="' + this.INK + '" stroke-width="2"/><rect x="4" y="2" width="56" height="10" rx="4" fill="#C9965F" stroke="' + this.INK + '" stroke-width="2"/><g class="dp-foot"><rect x="29" y="12" width="6" height="22" fill="#8A6A3E"/><ellipse cx="32" cy="38" rx="18" ry="6" fill="#D9D2C2" stroke="' + this.INK + '" stroke-width="2"/></g><path d="M58 8 L64 0" stroke="' + this.INK + '" stroke-width="3" stroke-linecap="round"/><rect x="2" y="80" width="60" height="6" rx="3" fill="#C9965F"/></svg>';
  },
  /* the squash in progress: the current piece morphing toward its patty (area kept at every step) */
  _animSvg: function (W) {
    var a = this._view.anim, C = DoughPressCore; if (!a) return '';
    var f = C.figure(a.fig), poly = f.pieces[a.i], s = this._g.sp * Math.sqrt(C.K);
    var M = C.morph(poly, a.t), cx = 0, cy = 0; M.forEach(function (p) { cx += p[0]; cy += p[1]; }); cx /= M.length; cy /= M.length;
    var R = C.pattyR(C.area(poly)) * this._g.sp, H = Math.max(70, 2 * R + 30), ox = W / 2 - cx * s, oy = H / 2 - cy * s;
    var sh = a.shaded && a.shaded.indexOf(a.i) >= 0;
    var done = (a.made || []).map(function (r) { return r; });
    return '<svg class="dp-anim" width="' + W + '" height="' + H.toFixed(0) + '" aria-hidden="true"><polygon points="' + this._pts(M, s, ox, oy) + '" fill="' + (sh ? this.CORAL : this.DOUGH) + '" stroke="#B98A4E" stroke-width="2"/></svg>' + (done.length ? this._pattyRow(done, W, a.madeKinds) : '');
  },

  /* ---- the tiles ---- */
  _paintTiles: function () {
    var st = this.st, g = this._g, v = this._view, el = this._qs('.dp-tiles'), C = DoughPressCore, self = this;
    el.innerHTML = ''; el.style.width = g.wide && !g.fair ? g.tilesW + 'px' : '';
    el.style.gridTemplateColumns = 'repeat(' + g.cols + ', ' + g.tile + 'px)'; el.style.gap = g.gap + 'px';
    var inK = 1;
    if (g.inTile) { var mx = 0; st.tiles.forEach(function (t) { var A = C.areas(C.figure(t.fig)), T = C.total(C.figure(t.fig)); (st.board === 'which' ? [T] : A).forEach(function (a) { mx = Math.max(mx, self._pxR(a) * 0.4); }); }); inK = Math.min(1, 11 / mx); }
    st.tiles.forEach(function (t, i) {
      /* solved, on a phone: only the matching tile stays beside the model (the others step aside for the success line and Next) */
      if (st.done && !g.wide && st.board !== 'fair' && i !== st.sel) return;
      var f = C.figure(t.fig), p = C.nPieces(f), cell = self.api.el('div', 'dp-cell');
      var label = self._t(p === 1 ? 'aTile1' : st.board === 'which' ? 'aTileShaded' : 'aTile', { k: i + 1, n: st.tiles.length, p: p, s: (t.shaded || []).length });
      var on = st.board === 'fair' ? st.ribbons.indexOf(i) >= 0 : st.sel === i;
      var b = self._btn('dp-tile' + (on ? ' is-sel' : '') + (st.board === 'fair' && on ? ' is-ribbon' : '') + (st.done && on ? ' is-won' : ''), 'tile-' + i, label, self._shapeSvg(t.fig, g.s, st.board === 'which' ? t.shaded : null));
      b.style.width = g.tile + 'px'; b.style.height = g.tile + 'px';
      b.setAttribute('aria-pressed', String(on));
      if (st.board === 'fair') b.insertAdjacentHTML('beforeend', '<svg class="dp-ribbon" width="40" height="30" viewBox="0 0 40 30" aria-hidden="true"><path d="M20 12 L6 4 L4 16 Z M20 12 L34 4 L36 16 Z" fill="#3E9B5A" stroke="#22663A" stroke-width="1.5"/><circle cx="20" cy="12" r="4" fill="#3E9B5A" stroke="#22663A" stroke-width="1.5"/><path d="M18 15 L12 28 M22 15 L28 28" stroke="#3E9B5A" stroke-width="4" stroke-linecap="round"/></svg>');
      b.addEventListener('click', function () { self._tap(i); });
      b.addEventListener('keydown', function (e) { self._tileKey(e, i); });
      cell.appendChild(b);
      /* under the tile: its plate (fair, once pressed) or its patty preview (miss 2) */
      var show = st.board === 'fair' ? (st.verdict && (st.help || st.verdict.pressed.indexOf(i) >= 0)) : (st.help && st.verdict);
      if (show) {
        var A = C.areas(f), q = g.fair ? 0.32 : 0.4, radii = A.map(function (a) { return self._pxR(a) * q; });
        if (st.board === 'which') { var T = C.total(f), sh = A.filter(function (a, j) { return t.shaded.indexOf(j) >= 0; }).reduce(function (s, a) { return s + a; }, 0); radii = [self._pxR(sh) * q, self._pxR(T - sh) * q]; }
        /* inside a tile the plate must fit under the shape: ONE scale for every tile's plate (so the tiles still compare),
           set so the largest patty of the round is at most 11 px in radius; the shapes shrink so a square plus its plate fit the tile exactly */
        if (g.inTile) radii = radii.map(function (r) { return r * inK; });
        var plate = '<div class="dp-plate' + (g.inTile ? ' is-in' : '') + '">' + self._pattyRow(radii, g.inTile ? g.tile - 16 : g.tile, st.board === 'which' ? ['coral', 'teal'] : null) + '</div>';
        if (g.inTile) { b.classList.add('has-plate'); b.insertAdjacentHTML('beforeend', plate); } else cell.insertAdjacentHTML('beforeend', plate);
      }
      el.appendChild(cell);
    });
  },
  _paintCtrl: function () {
    var st = this.st, el = this._qs('.dp-ctrl'), self = this;
    el.innerHTML = '';
    var go = this._btn('dp-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    go.disabled = st.done || !!this._view.anim; go.addEventListener('click', function () { self._check(); });
    el.appendChild(go);
  },

  /* ---------------- the hand ---------------- */
  _tap: function (i) {
    var st = this.st, v = this._view, C = DoughPressCore;
    if (v.anim) return;
    /* free play after success: any tile can be pressed onto the platter, no judgement */
    if (st.done) { if (st.board === 'fair') return; v.free = i; this._press([i], null); return; }
    var ok = st.board === 'fair' ? C.ribbon(st, i) : C.select(st, i);
    if (!ok) return;
    v.note = ''; v.pressed = false;
    this.api.sound(st.board === 'fair' ? (st.ribbons.indexOf(i) >= 0 ? 700 : 400) : (st.sel === i ? 560 : 420));
    this._paint();
  },
  _tileKey: function (e, i) {
    var n = this.st.tiles.length, cols = this._g.cols, j = null;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._tap(i); return; }
    if (e.key === 'ArrowRight') j = (i + 1) % n; else if (e.key === 'ArrowLeft') j = (i + n - 1) % n; else if (e.key === 'ArrowDown') j = (i + cols) % n; else if (e.key === 'ArrowUp') j = (i + n - cols) % n;
    if (j != null) { e.preventDefault(); var b = this._qs('[data-k="tile-' + j + '"]'); if (b) b.focus(); }
  },
  /* the press runs on tile indices: each piece squashes in turn (area kept), then the stacks meet */
  _press: function (idx, then) {
    var self = this, st = this.st, v = this._view, C = DoughPressCore;
    if (st.board === 'fair' || this.FAST) { v.anim = null; v.pressed = true; this._paint(); if (then) then(); return; }
    var t = st.tiles[idx[0]], f = C.figure(t.fig), n = f.pieces.length, steps = 8, made = [], madeKinds = [];
    v.pressed = false; v.anim = { fig: t.fig, shaded: st.board === 'which' ? t.shaded : null, i: 0, t: 0, made: made, madeKinds: madeKinds };
    var step = 0;
    var tick = function () {
      if (self.st !== st) return;
      step++; var i = Math.floor(step / (steps + 1)), tt = (step % (steps + 1)) / steps;
      if (i >= n) { v.anim = null; v.pressed = true; self.api.sound(220); self._paint(); if (then) then(); return; }
      if (tt === 0 && step > 0) { made.push(C.pattyR(C.area(f.pieces[i - 1])) * self._g.sp * 0.4); madeKinds.push(st.board === 'which' && t.shaded.indexOf(i - 1) >= 0 ? 'coral' : 'dough'); self.api.sound(300 + 40 * i); }
      v.anim.i = Math.min(i, n - 1); v.anim.t = Math.min(1, tt);
      self._paintLeft(); self._paintCtrl();
      self._later(tick, 28);
    };
    this._paint(); this._later(tick, 28);
  },

  /* ---------------- Check ---------------- */
  _check: function () {
    var st = this.st, v = this._view, C = DoughPressCore, self = this; if (st.done || v.anim) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    v.free = null;
    var idx = st.board === 'fair' ? (st.verdict ? st.verdict.pressed : st.ribbons.slice()) : [st.sel];
    if (res.result === 'ok') { this._press(idx, function () { self._success(); }); return; }
    var card = st.board === 'which' ? st.round.card : null;
    v.soft = false; v.note = this._t(C.hint(st, res), card ? { n: card[1], k: card[0] } : {});
    this._press(idx, function () { self.api.announce(v.note); });
  },
  _okLine: function () {
    var st = this.st, C = DoughPressCore;
    if (st.board === 'fair') return this._t('okFair', { k: st.tiles.filter(function (t, i) { return C.tileRight(st, i); }).length });
    if (st.board === 'which') {
      /* when the shape is cut into more parts than the card (2 of 4 for one half) the line says why it is the same amount */
      var t = st.tiles[st.sel], f = C.figure(t.fig), c = st.round.card, n = C.nPieces(f);
      return this._t(n === c[1] ? 'okWhich' : 'okWhichEq', { frac: this._amount(c[0], c[1]), k: t.shaded.length, n: n, kc: c[0], nc: c[1] });
    }
    return this._t('okMatch', { fp: this._plural(this._modelN()) });
  },
  _success: function () {
    var st = this.st, v = this._view, msg = this._okLine();
    v.note = ''; v.glaze = true; this.shelf++;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectDoughPressCSS() {
  if (typeof document === 'undefined' || document.getElementById('dp-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2B2B2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.dp-wrap{position:relative;width:100%;max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .dp-wrap:focus{outline:none;}'
  + '.dp-main{display:flex;gap:16px;justify-content:center;align-items:flex-start;width:100%;} .dp-wrap.is-narrow .dp-main{flex-direction:column;align-items:center;gap:10px;}'
  + '.dp-left{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.dp-wrap.is-narrow .dp-board{padding:7px 9px;} .dp-board{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:12px 16px;border-radius:14px;background:linear-gradient(#D9B47E,#C99A5C);box-shadow:inset 0 0 0 3px ' + INK + ',0 4px 0 #A97E45;} .dp-card{background:#FFFDF6;box-shadow:inset 0 0 0 3px #F2784B,0 4px 10px rgba(0,0,0,.12);min-width:150px;}'
  + '.dp-num{display:inline-flex;flex-direction:column;align-items:center;font:800 34px/1 ' + H + ';color:' + INK + ';} .dp-num i{display:block;width:30px;height:4px;margin:3px 0;background:' + INK + ';border-radius:2px;} .dp-word{font:800 28px/1.1 ' + H + ';color:' + INK + ';text-align:center;}'
  + '.dp-pressrow{display:flex;align-items:center;justify-content:center;gap:10px;} .dp-tray{display:flex;} .dp-traysvg{display:block;overflow:hidden;border-radius:12px;} .dp-traysvg.is-glaze .dp-fit{filter:drop-shadow(0 0 6px rgba(242,190,100,.95));} .dp-platter{display:flex;align-items:flex-end;justify-content:center;} .dp-lumps{display:flex;justify-content:center;min-height:20px;}'
  + '.dp-press .dp-foot{transition:transform .18s ease;} .dp-press.is-down .dp-foot{transform:translateY(30px);}'
  + '.dp-stack,.dp-row,.dp-lump,.dp-anim,.dp-outlines{display:block;overflow:visible;} .dp-extra{animation:dpWob .6s ease 2;} @keyframes dpWob{50%{transform:translateX(5px)}}'
  + '.dp-stack.is-glaze .dp-fit{filter:drop-shadow(0 0 6px rgba(242,190,100,.9));}'
  + '.dp-tiles{display:grid;justify-content:center;} .dp-cell{display:flex;flex-direction:column;align-items:center;gap:4px;}'
  + '.dp-tile{position:relative;display:flex;align-items:center;justify-content:center;padding:6px;border:0;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D4B4,0 3px 0 #E2D4B4;cursor:pointer;transition:transform .15s ease;} .dp-tile.is-sel{transform:translateY(-6px);box-shadow:inset 0 0 0 3px #F2784B,0 8px 12px rgba(0,0,0,.18);} .dp-tile.is-won{box-shadow:inset 0 0 0 3px #146B5E,0 8px 12px rgba(0,0,0,.18);} .dp-tile:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .dp-shape{display:block;}'
  + '.dp-ribbon{position:absolute;right:4px;top:4px;opacity:0;transform:scale(.6);transition:all .15s ease;} .dp-tile.is-ribbon .dp-ribbon{opacity:1;transform:none;} .is-fair .dp-tile.is-sel{transform:none;box-shadow:inset 0 0 0 3px #3E9B5A,0 3px 0 #E2D4B4;}'
  + '.dp-plate{padding:2px 4px;border-radius:999px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D4B4;} .dp-tile.has-plate{flex-direction:column;gap:4px;} .dp-plate.is-in{padding:1px 3px;}'
  + '.dp-shelf{display:flex;align-items:flex-end;gap:4px;position:relative;padding:0 6px 4px;} .dp-shelfboard{position:absolute;left:0;right:0;bottom:0;height:5px;border-radius:3px;background:#B98A4E;}'
  + '.dp-note{margin:0;min-height:1.3em;max-width:600px;font-family:' + B + ';font-weight:700;font-size:17px;color:#146B5E;text-align:center;} .dp-note.is-hint{color:#A3401F;} .dp-note:empty{display:none;} .dp-wrap.is-narrow .dp-note{font-size:15px;line-height:1.25;} .dp-wrap.is-cramp .dp-note{font-size:14px;} .dp-wrap.is-done .dp-ctrl{display:none;}'
  + '.dp-ctrl{display:flex;justify-content:center;} .dp-go{display:inline-flex;align-items:center;gap:8px;min-height:52px;padding:0 26px;border:0;border-radius:14px;background:#146B5E;color:#fff;font:800 20px ' + H + ';box-shadow:0 4px 0 #0E4C43;cursor:pointer;} .dp-go svg{width:22px;height:22px;} .dp-go:disabled{opacity:.45;cursor:default;} .dp-go:focus-visible{outline:3px solid #F2784B;outline-offset:3px;}'
  + '.dp-wrap.is-cramp{gap:6px;} .dp-wrap.is-cramp .dp-main{gap:6px;} .dp-wrap.is-cramp .dp-board{padding:4px 6px;} .dp-wrap.is-cramp .dp-pressrow{gap:6px;} .dp-wrap.is-narrow .dp-word{font-size:24px;} .dp-wrap.is-narrow .dp-num{font-size:28px;}'
  + '@media (prefers-reduced-motion:reduce){.dp-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'dp-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.DoughPressActivity = DoughPressActivity;
