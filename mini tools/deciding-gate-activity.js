/* =====================================================================
   deciding-gate-activity.js — ACTIVITY #151 of the one-by-one rebuild:
   "Compare Three-Digit Numbers" → THE DECIDING GATE (2.NBT.A.4; G2-219,
   G2-220; the four-digit setting covers G3-325; all 11 locales).
   Model: deciding-gate-core.js (DecidingGateCore).
   Design: docs/activities-rebuild/designs/151-match-pairs.md
   ---------------------------------------------------------------------
   The invention: two numbers race through one gate per place, the
   biggest place first. At each gate their digits stand as real blocks
   (flats, rods, cubes, big cubes for thousands); equal digits let both
   through, and the first gate where they differ drops its bar in front
   of the smaller number. The child calls that gate (or the finish flag,
   for "the same") BEFORE the race, then sets < = >. Order four: four
   numbers onto a four-step podium, smallest to greatest.
   No timer, no score, no words on the apparatus: numerals and blocks.
   Test seams: window.DecidingGateActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._predict / ._sign / ._pick /
   ._step / ._check / .FAST / .OK_MS.
   ===================================================================== */
var DecidingGateActivity = {
  id: 'deciding-gate',
  /* the drawn apparatus (the hierarchy gate): the board, the track, the gates and their blocks, the podium, the long view */
  apparatusClasses: ['dg-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Compare Three-Digit Numbers","de":"Dreistellige Zahlen vergleichen","fr":"Comparer des nombres à trois chiffres","es":"Compara números de tres cifras","pt":"Compare números de três algarismos","it":"Confronta numeri a tre cifre","nl":"Getallen van drie cijfers vergelijken","sv":"Jämför tresiffriga tal","da":"Sammenlign trecifrede tal","no":"Sammenlign tresifrede tall","fi":"Vertaa kolminumeroisia lukuja"},
    instruction: {"en":"The numbers race through the gates, the biggest place first. Call the gate, then set the sign.","de":"Die Zahlen fahren durch die Tore, die größte Stelle zuerst. Sag voraus, welches Tor entscheidet, und setz dann das Zeichen.","fr":"Les nombres font la course à travers les portes, le plus grand rang d’abord. Choisis la porte, puis place le signe.","es":"Los números corren por las puertas, primero el lugar de mayor valor. Elige la puerta y luego pon el signo.","pt":"Os números correm pelos portões, primeiro a ordem maior. Escolha o portão e depois coloque o sinal.","it":"I numeri corrono attraverso le porte, partendo dalla posizione di valore più alto. Scegli la porta, poi metti il segno.","nl":"De getallen racen door de poortjes, de grootste plaats eerst. Kies het poortje en zet dan het teken.","sv":"Talen kör genom grindarna, den största positionen först. Gissa grinden och sätt sedan in tecknet.","da":"Tallene kører gennem portene, den største plads først. Gæt porten, og sæt så tegnet.","no":"Tallene kjører gjennom portene, den største plassen først. Gjett porten, og sett så inn tegnet.","fi":"Luvut kilpailevat porttien läpi suurimmasta paikka-arvosta alkaen. Valitse portti ja laita sitten merkki."},
    setJob: {"en":"Job","de":"Aufgabe","fr":"Tâche","es":"Tarea","pt":"Tarefa","it":"Compito","nl":"Opdracht","sv":"Uppgift","da":"Opgave","no":"Oppgave","fi":"Tehtävä"},
    jCompare: {"en":"compare two","de":"zwei vergleichen","fr":"comparer deux nombres","es":"comparar dos","pt":"comparar dois","it":"confrontare due","nl":"twee vergelijken","sv":"jämför två","da":"sammenligne to","no":"sammenligne to","fi":"vertaa kahta"},
    jOrder: {"en":"order four","de":"vier ordnen","fr":"ranger quatre nombres","es":"ordenar cuatro","pt":"ordenar quatro","it":"ordinare quattro","nl":"vier ordenen","sv":"ordna fyra","da":"ordne fire","no":"ordne fire","fi":"järjestä neljä"},
    setDigits: {"en":"Digits","de":"Stellen","fr":"Chiffres","es":"Cifras","pt":"Algarismos","it":"Cifre","nl":"Cijfers","sv":"Siffror","da":"Cifre","no":"Sifre","fi":"Numerot"},
    dThree: {"en":"three","de":"dreistellig","fr":"trois","es":"tres","pt":"três","it":"tre","nl":"drie","sv":"tre","da":"tre","no":"tre","fi":"kolme"},
    dFour: {"en":"four","de":"vierstellig","fr":"quatre","es":"cuatro","pt":"quatro","it":"quattro","nl":"vier","sv":"fyra","da":"fire","no":"fire","fi":"neljä"},
    taskCompare: {"en":"Which gate decides? Tap it. Then put in the sign.","de":"Welches Tor entscheidet? Tipp es an. Dann setz das Zeichen ein.","fr":"Quelle porte décide ? Touche-la. Puis place le signe.","es":"¿Qué puerta decide? Tócala. Luego pon el signo.","pt":"Qual portão decide? Toque nele. Depois coloque o sinal.","it":"Quale porta decide? Toccala. Poi metti il segno.","nl":"Welk poortje beslist? Tik erop. Zet dan het teken erin.","sv":"Vilken grind avgör? Tryck på den. Sätt sedan in tecknet.","da":"Hvilken port afgør det? Tryk på den. Sæt så tegnet ind.","no":"Hvilken port avgjør? Trykk på den. Sett så inn tegnet.","fi":"Mikä portti ratkaisee? Napauta sitä. Laita sitten merkki."},
    taskOrder: {"en":"Put the numbers on the steps, smallest to greatest.","de":"Stell die Zahlen auf die Stufen, von der kleinsten zur größten.","fr":"Place les nombres sur les marches, du plus petit au plus grand.","es":"Pon los números en los escalones, del menor al mayor.","pt":"Coloque os números nos degraus, do menor para o maior.","it":"Metti i numeri sui gradini, dal più piccolo al più grande.","nl":"Zet de getallen op de treden, van klein naar groot.","sv":"Ställ talen på trappstegen, från minst till störst.","da":"Stil tallene på trinene, fra mindst til størst.","no":"Sett tallene på trinnene, fra minst til størst.","fi":"Laita luvut portaille pienimmästä suurimpaan."},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    hintPick: {"en":"Tap the gate you think will decide, or the flag if the numbers are the same.","de":"Tipp das Tor an, das deiner Meinung nach entscheidet, oder die Fahne, wenn die Zahlen gleich sind.","fr":"Touche la porte qui, d’après toi, va décider, ou le drapeau si les nombres sont égaux.","es":"Toca la puerta que crees que va a decidir, o la bandera si los números son iguales.","pt":"Toque no portão que você acha que vai decidir, ou na bandeira se os números forem iguais.","it":"Tocca la porta che secondo te deciderà, o la bandiera se i numeri sono uguali.","nl":"Tik op het poortje dat volgens jou beslist, of op de vlag als de getallen gelijk zijn.","sv":"Tryck på grinden du tror avgör, eller på flaggan om talen är lika.","da":"Tryk på den port, du tror afgør det, eller på flaget, hvis tallene er lige store.","no":"Trykk på porten du tror avgjør, eller på flagget hvis tallene er like.","fi":"Napauta porttia, jonka arvelet ratkaisevan, tai lippua, jos luvut ovat yhtä suuret."},
    hintSign: {"en":"Now put a sign in the box.","de":"Setz jetzt ein Zeichen in das Kästchen.","fr":"Place maintenant un signe dans la case.","es":"Ahora pon un signo en el cuadro.","pt":"Agora coloque um sinal no quadrinho.","it":"Ora metti un segno nella casella.","nl":"Zet nu een teken in het vakje.","sv":"Sätt nu ett tecken i rutan.","da":"Sæt nu et tegn i feltet.","no":"Sett nå et tegn i ruta.","fi":"Laita nyt merkki ruutuun."},
    hintSteps: {"en":"Every number needs a step.","de":"Jede Zahl braucht eine Stufe.","fr":"Chaque nombre a besoin d’une marche.","es":"Cada número necesita un escalón.","pt":"Cada número precisa de um degrau.","it":"Ogni numero ha bisogno di un gradino.","nl":"Elk getal heeft een trede nodig.","sv":"Varje tal behöver ett trappsteg.","da":"Hvert tal skal have et trin.","no":"Hvert tall trenger et trinn.","fi":"Jokainen luku tarvitsee portaan."},
    hintLate: {"en":"The race was already decided {at}: the digits there are different.","de":"Das Rennen war schon {at} entschieden: Dort sind die Ziffern verschieden.","fr":"La course était déjà décidée {at} : les chiffres y sont différents.","es":"La carrera ya se decidió {at}: ahí las cifras son distintas.","pt":"A corrida já foi decidida {at}: ali os algarismos são diferentes.","it":"La gara si era già decisa {at}: lì le cifre sono diverse.","nl":"De race was al beslist {at}: daar zijn de cijfers verschillend.","sv":"Loppet avgjordes redan {at}: där är siffrorna olika.","da":"Løbet blev allerede afgjort {at}: Der er cifrene forskellige.","no":"Løpet ble allerede avgjort {at}: Der er sifrene forskjellige.","fi":"Kisa ratkesi jo {at}: siellä numerot ovat erilaiset."},
    hintEarly: {"en":"Here the digits are the same: the race goes on to the next gate.","de":"Hier sind die Ziffern gleich: Das Rennen geht zum nächsten Tor weiter.","fr":"Ici, les chiffres sont les mêmes : la course continue jusqu’à la porte suivante.","es":"Aquí las cifras son iguales: la carrera sigue hasta la siguiente puerta.","pt":"Aqui os algarismos são iguais: a corrida continua até o próximo portão.","it":"Qui le cifre sono uguali: la gara continua fino alla porta successiva.","nl":"Hier zijn de cijfers gelijk: de race gaat door naar het volgende poortje.","sv":"Här är siffrorna lika: loppet fortsätter till nästa grind.","da":"Her er cifrene ens: Løbet fortsætter til næste port.","no":"Her er sifrene like: Løpet fortsetter til neste port.","fi":"Tässä numerot ovat samat: kisa jatkuu seuraavalle portille."},
    hintSignSide: {"en":"The open side of the sign faces the bigger number.","de":"Die offene Seite des Zeichens zeigt zur größeren Zahl.","fr":"Le côté ouvert du signe est tourné vers le plus grand nombre.","es":"El lado abierto del signo mira hacia el número mayor.","pt":"O lado aberto do sinal fica virado para o número maior.","it":"Il lato aperto del segno è rivolto verso il numero più grande.","nl":"De open kant van het teken wijst naar het grootste getal.","sv":"Tecknets öppna sida vänder sig mot det större talet.","da":"Tegnets åbne side vender mod det største tal.","no":"Den åpne siden av tegnet vender mot det største tallet.","fi":"Merkin avoin puoli on suurempaa lukua kohti."},
    hintSignEq: {"en":"Both numbers reached the flag: they are the same.","de":"Beide Zahlen sind ins Ziel gekommen: Sie sind gleich.","fr":"Les deux nombres sont arrivés au drapeau : ils sont égaux.","es":"Los dos números llegaron a la bandera: son iguales.","pt":"Os dois números chegaram à bandeira: eles são iguais.","it":"Tutti e due i numeri sono arrivati alla bandiera: sono uguali.","nl":"Beide getallen kwamen bij de vlag: ze zijn gelijk.","sv":"Båda talen kom fram till flaggan: de är lika.","da":"Begge tal nåede flaget: De er lige store.","no":"Begge tallene kom fram til flagget: De er like.","fi":"Molemmat luvut pääsivät lipulle: ne ovat yhtä suuret."},
    hintVs: {"en":"{w1} against {w2}: the bar drops in front of {small}.","de":"{w1} gegen {w2}: Die Schranke fällt vor {small}.","fr":"{w1} contre {w2} : la barrière tombe devant {small}.","es":"{w1} contra {w2}: la barrera baja frente a {small}.","pt":"{w1} contra {w2}: a cancela desce na frente de {small}.","it":"{w1} contro {w2}: la sbarra scende davanti a {small}.","nl":"{w1} tegen {w2}: de slagboom gaat dicht voor {small}.","sv":"{w1} mot {w2}: bommen fälls framför {small}.","da":"{w1} mod {w2}: Bommen falder foran {small}.","no":"{w1} mot {w2}: Bommen faller foran {small}.","fi":"{w1} vastaan {w2}: puomi laskeutuu luvun {small} eteen."},
    hintAllSame: {"en":"Every gate lets both through: the numbers are the same.","de":"Jedes Tor lässt beide durch: Die Zahlen sind gleich.","fr":"Chaque porte laisse passer les deux : les nombres sont égaux.","es":"Cada puerta deja pasar a los dos: los números son iguales.","pt":"Todo portão deixa os dois passarem: os números são iguais.","it":"Ogni porta li lascia passare tutti e due: i numeri sono uguali.","nl":"Elk poortje laat ze allebei door: de getallen zijn gelijk.","sv":"Varje grind släpper igenom båda: talen är lika.","da":"Hver port lukker begge igennem: Tallene er lige store.","no":"Hver port slipper begge gjennom: Tallene er like.","fi":"Jokainen portti päästää molemmat läpi: luvut ovat yhtä suuret."},
    hintOrder: {"en":"Some numbers are on the wrong step. Look at the steps that flash.","de":"Einige Zahlen stehen auf der falschen Stufe. Schau dir die blinkenden Stufen an.","fr":"Certains nombres sont sur la mauvaise marche. Regarde les marches qui clignotent.","es":"Algunos números están en el escalón equivocado. Mira los escalones que parpadean.","pt":"Alguns números estão no degrau errado. Olhe os degraus que piscam.","it":"Alcuni numeri sono sul gradino sbagliato. Guarda i gradini che lampeggiano.","nl":"Sommige getallen staan op de verkeerde trede. Kijk naar de treden die knipperen.","sv":"Några tal står på fel trappsteg. Titta på stegen som blinkar.","da":"Nogle tal står på det forkerte trin. Se på de trin, der blinker.","no":"Noen tall står på feil trinn. Se på trinnene som blinker.","fi":"Osa luvuista on väärällä portaalla. Katso vilkkuvia portaita."},
    hintPair: {"en":"{a} and {b} are decided {at}.","de":"{a} und {b} werden {at} entschieden.","fr":"{a} et {b} se départagent {at}.","es":"{a} y {b} se deciden {at}.","pt":"{a} e {b} se decidem {at}.","it":"{a} e {b} si decidono {at}.","nl":"Tussen {a} en {b} wordt het {at} beslist.","sv":"{a} och {b} avgörs {at}.","da":"{a} og {b} afgøres {at}.","no":"{a} og {b} avgjøres {at}.","fi":"Lukujen {a} ja {b} vertailu ratkeaa {at}."},
    okLess: {"en":"{a} is less than {b}.","de":"{a} ist kleiner als {b}.","fr":"{a} est plus petit que {b}.","es":"{a} es menor que {b}.","pt":"{a} é menor que {b}.","it":"{a} è minore di {b}.","nl":"{a} is kleiner dan {b}.","sv":"{a} är mindre än {b}.","da":"{a} er mindre end {b}.","no":"{a} er mindre enn {b}.","fi":"{a} on pienempi kuin {b}."},
    okGreater: {"en":"{a} is greater than {b}.","de":"{a} ist größer als {b}.","fr":"{a} est plus grand que {b}.","es":"{a} es mayor que {b}.","pt":"{a} é maior que {b}.","it":"{a} è maggiore di {b}.","nl":"{a} is groter dan {b}.","sv":"{a} är större än {b}.","da":"{a} er større end {b}.","no":"{a} er større enn {b}.","fi":"{a} on suurempi kuin {b}."},
    okEqual: {"en":"{a} is equal to {b}.","de":"{a} ist gleich {b}.","fr":"{a} est égal à {b}.","es":"{a} es igual a {b}.","pt":"{a} é igual a {b}.","it":"{a} è uguale a {b}.","nl":"{a} is gelijk aan {b}.","sv":"{a} är lika med {b}.","da":"{a} er lig med {b}.","no":"{a} er lik {b}.","fi":"{a} on yhtä suuri kuin {b}."},
    okOrder: {"en":"{w} < {x} < {y} < {z}","de":"{w} < {x} < {y} < {z}","fr":"{w} < {x} < {y} < {z}","es":"{w} < {x} < {y} < {z}","pt":"{w} < {x} < {y} < {z}","it":"{w} < {x} < {y} < {z}","nl":"{w} < {x} < {y} < {z}","sv":"{w} < {x} < {y} < {z}","da":"{w} < {x} < {y} < {z}","no":"{w} < {x} < {y} < {z}","fi":"{w} < {x} < {y} < {z}"},
    atTh: {"en":"at the thousands gate","de":"am Tausendertor","fr":"à la porte des milliers","es":"en la puerta de los millares","pt":"no portão dos milhares","it":"alla porta delle migliaia","nl":"bij het duizendtalpoortje","sv":"vid tusentalsgrinden","da":"ved tusinderporten","no":"ved tusenerporten","fi":"tuhansien portilla"},
    atH: {"en":"at the hundreds gate","de":"am Hundertertor","fr":"à la porte des centaines","es":"en la puerta de las centenas","pt":"no portão das centenas","it":"alla porta delle centinaia","nl":"bij het honderdtalpoortje","sv":"vid hundratalsgrinden","da":"ved hundrederporten","no":"ved hundrerporten","fi":"satojen portilla"},
    atT: {"en":"at the tens gate","de":"am Zehnertor","fr":"à la porte des dizaines","es":"en la puerta de las decenas","pt":"no portão das dezenas","it":"alla porta delle decine","nl":"bij het tientalpoortje","sv":"vid tiotalsgrinden","da":"ved tierporten","no":"ved tierporten","fi":"kymmenten portilla"},
    atO: {"en":"at the ones gate","de":"am Einertor","fr":"à la porte des unités","es":"en la puerta de las unidades","pt":"no portão das unidades","it":"alla porta delle unità","nl":"bij het eenhedenpoortje","sv":"vid entalsgrinden","da":"ved enerporten","no":"ved enerporten","fi":"ykkösten portilla"},
    gTh: {"en":"thousands gate","de":"Tausendertor","fr":"porte des milliers","es":"puerta de los millares","pt":"portão dos milhares","it":"porta delle migliaia","nl":"duizendtalpoortje","sv":"tusentalsgrind","da":"tusinderport","no":"tusenerport","fi":"tuhansien portti"},
    gH: {"en":"hundreds gate","de":"Hundertertor","fr":"porte des centaines","es":"puerta de las centenas","pt":"portão das centenas","it":"porta delle centinaia","nl":"honderdtalpoortje","sv":"hundratalsgrind","da":"hundrederport","no":"hundrerport","fi":"satojen portti"},
    gT: {"en":"tens gate","de":"Zehnertor","fr":"porte des dizaines","es":"puerta de las decenas","pt":"portão das dezenas","it":"porta delle decine","nl":"tientalpoortje","sv":"tiotalsgrind","da":"tierport","no":"tierport","fi":"kymmenten portti"},
    gO: {"en":"ones gate","de":"Einertor","fr":"porte des unités","es":"puerta de las unidades","pt":"portão das unidades","it":"porta delle unità","nl":"eenhedenpoortje","sv":"entalsgrind","da":"enerport","no":"enerport","fi":"ykkösten portti"},
    aFinish: {"en":"finish flag: the numbers are the same","de":"Zielfahne: Die Zahlen sind gleich","fr":"drapeau d’arrivée : les nombres sont égaux","es":"bandera de meta: los números son iguales","pt":"bandeira de chegada: os números são iguais","it":"bandiera del traguardo: i numeri sono uguali","nl":"finishvlag: de getallen zijn gelijk","sv":"målflagga: talen är lika","da":"målflag: tallene er lige store","no":"målflagg: tallene er like","fi":"maalilippu: luvut ovat yhtä suuret"},
    aSlot: {"en":"Sign box: {s}","de":"Zeichenkästchen: {s}","fr":"Case du signe : {s}","es":"Cuadro del signo: {s}","pt":"Quadrinho do sinal: {s}","it":"Casella del segno: {s}","nl":"Vakje voor het teken: {s}","sv":"Ruta för tecknet: {s}","da":"Felt til tegnet: {s}","no":"Rute for tegnet: {s}","fi":"Merkin ruutu: {s}"},
    aEmpty: {"en":"empty","de":"leer","fr":"vide","es":"vacío","pt":"vazio","it":"vuota","nl":"leeg","sv":"tom","da":"tomt","no":"tom","fi":"tyhjä"},
    aLt: {"en":"less than","de":"kleiner als","fr":"plus petit que","es":"menor que","pt":"menor que","it":"minore di","nl":"kleiner dan","sv":"mindre än","da":"mindre end","no":"mindre enn","fi":"pienempi kuin"},
    aEq: {"en":"equal to","de":"gleich","fr":"égal à","es":"igual a","pt":"igual a","it":"uguale a","nl":"gelijk aan","sv":"lika med","da":"lig med","no":"lik","fi":"yhtä suuri kuin"},
    aGt: {"en":"greater than","de":"größer als","fr":"plus grand que","es":"mayor que","pt":"maior que","it":"maggiore di","nl":"groter dan","sv":"större än","da":"større end","no":"større enn","fi":"suurempi kuin"},
    aStep: {"en":"Step {k}: {n}","de":"Stufe {k}: {n}","fr":"Marche {k} : {n}","es":"Escalón {k}: {n}","pt":"Degrau {k}: {n}","it":"Gradino {k}: {n}","nl":"Trede {k}: {n}","sv":"Steg {k}: {n}","da":"Trin {k}: {n}","no":"Trinn {k}: {n}","fi":"Porras {k}: {n}"},
    wTh0: {"en":"thousands","de":"Tausender","fr":"millier","es":"millares","pt":"milhares","it":"migliaia","nl":"duizendtallen","sv":"tusental","da":"tusinder","no":"tusenere","fi":"tuhatta"},
    wTh1: {"en":"thousand","de":"Tausender","fr":"millier","es":"millar","pt":"milhar","it":"migliaio","nl":"duizendtal","sv":"tusental","da":"tusinde","no":"tusener","fi":"tuhat"},
    wThn: {"en":"thousands","de":"Tausender","fr":"milliers","es":"millares","pt":"milhares","it":"migliaia","nl":"duizendtallen","sv":"tusental","da":"tusinder","no":"tusenere","fi":"tuhatta"},
    wH0: {"en":"hundreds","de":"Hunderter","fr":"centaine","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"sataa"},
    wH1: {"en":"hundred","de":"Hunderter","fr":"centaine","es":"centena","pt":"centena","it":"centinaio","nl":"honderdtal","sv":"hundratal","da":"hundrede","no":"hundrer","fi":"sata"},
    wHn: {"en":"hundreds","de":"Hunderter","fr":"centaines","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"sataa"},
    wT0: {"en":"tens","de":"Zehner","fr":"dizaine","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmentä"},
    wT1: {"en":"ten","de":"Zehner","fr":"dizaine","es":"decena","pt":"dezena","it":"decina","nl":"tiental","sv":"tiotal","da":"tier","no":"tier","fi":"kymmen"},
    wTn: {"en":"tens","de":"Zehner","fr":"dizaines","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmentä"},
    wO0: {"en":"ones","de":"Einer","fr":"unité","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykköstä"},
    wO1: {"en":"one","de":"Einer","fr":"unité","es":"unidad","pt":"unidade","it":"unità","nl":"eenheid","sv":"ental","da":"ener","no":"ener","fi":"ykkönen"},
    wOn: {"en":"ones","de":"Einer","fr":"unités","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykköstä"}
  },/*STRINGS-END*/
  defaults: { job: 'compare', digits: 'three' },
  settings: [
    { key: 'job', type: 'choice', labelKey: 'setJob', options: [{ value: 'compare', labelKey: 'jCompare' }, { value: 'order', labelKey: 'jOrder' }] },
    { key: 'digits', type: 'choice', labelKey: 'setDigits', options: [{ value: 'three', labelKey: 'dThree' }, { value: 'four', labelKey: 'dFour' }] }
  ],
  OK_MS: 500, FAST: false,
  SIGNS: [['<', 'lt', 'aLt'], ['=', 'eq', 'aEq'], ['>', 'gt', 'aGt']],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null;
    injectDecidingGateCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } this._endDrag(); },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st) { this._start(this.st.k); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _job: function () { return DecidingGateCore.jobOf(this._setting('job')); },
  _nd: function () { return DecidingGateCore.ndOf(this._setting('digits')); },
  _key: function () { return this._job() + '.' + this._nd(); },
  /* place keys: th → Th, h → H, t → T, o → O */
  _P: function (p) { return p === 'th' ? 'Th' : p.toUpperCase(); },
  _word: function (p, n) { return n + ' ' + this._t('w' + this._P(p) + (n === 0 ? '0' : n === 1 ? '1' : 'n')); },
  _at: function (g) { var p = DecidingGateCore.places(this.st.nd)[g]; return this._t(p === 'th' ? 'atTh' : p === 'h' ? 'atH' : p === 't' ? 'atT' : 'atO'); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = DecidingGateCore.rounds(this._job(), this._nd()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = DecidingGateCore, pool = this._ensurePool(), job = this._job(), nd = this._nd(), n = C.passSize(job, nd), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { var P = C.plan(job, nd, pass, Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'deciding-gate.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () { var st = this.st; if (!st) return ''; return this._t(st.job === 'order' ? 'taskOrder' : 'taskCompare'); },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = DecidingGateCore.newState(this._job(), this._nd(), k);
    this._view = { note: '', soft: false, shake: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth();
  },
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
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'dg-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="dg-main"></div><p class="dg-note" data-qa="note" aria-live="polite"></p><div class="dg-bar"></div>';
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
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width(), B = DecidingGateCore.band(W);
    this._wide = B.wide;
    this._wrap.className = 'dg-wrap' + (B.wide ? ' is-wide' : ' is-narrow') + (B.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (st.help ? ' is-help' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.job + ' is-d' + st.nd;
    var main = this._qs('.dg-main'); main.innerHTML = '';
    if (st.job === 'compare') { this._paintBoard(main); this._paintTrack(main, W); } else this._paintPodium(main, W);
    if (st.done) this._paintLong(main, W);
    this._paintBar();
    var note = this._qs('.dg-note');
    if (v.note) { note.textContent = v.note; note.className = 'dg-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'dg-note'; }
    this._setPrompt();
    v.shake = false;
  },

  /* ---------- blocks (drawn apparatus): a place digit as a stack ---------- */
  _stack: function (p, d, u, cls) {
    var out = '', i, w, h, fo = Math.max(2, Math.round(0.8 * u)), rp = Math.round(1.55 * u), cp = Math.round(1.45 * u), s = 10 * u, c = Math.round(2.2 * u);
    if (!d) return '';
    /* thousands: big blue 3-D cubes (each wider than half a flat), nested 3 × 3 like the ones */
    if (p === 'th') { var cs = Math.round(6 * u), dp = Math.round(cs * 0.28), bp = cs + dp + 2, br = Math.ceil(d / 3); w = cs + dp + (Math.min(d, 3) - 1) * bp; h = cs + dp + (br - 1) * bp; for (i = 0; i < d; i++) { var bx = (i % 3) * bp, by = h - cs - Math.floor(i / 3) * bp; out += '<g class="dg-big"><path class="dg-bigside" d="M' + (bx + cs) + ' ' + by + 'l' + dp + ' ' + (-dp) + 'v' + cs + 'l' + (-dp) + ' ' + dp + 'z"/><path class="dg-bigtopf" d="M' + bx + ' ' + by + 'l' + dp + ' ' + (-dp) + 'h' + cs + 'l' + (-dp) + ' ' + dp + 'z"/><rect class="dg-bigbg" x="' + bx + '" y="' + by + '" width="' + cs + '" height="' + cs + '" rx="1"/></g>'; } h += 0; }
    else if (p === 'h') { w = s + (d - 1) * fo; h = w; for (i = 0; i < d; i++) out += '<rect class="dg-flatbg" x="' + (i * fo) + '" y="' + (i * fo) + '" width="' + s + '" height="' + s + '" rx="1.2"/>'; }
    else if (p === 't') { w = u + (d - 1) * rp; h = s; for (i = 0; i < d; i++) out += '<rect class="dg-rodbg" x="' + (i * rp) + '" y="0" width="' + u + '" height="' + s + '" rx="1"/>'; }
    else { var rows = Math.ceil(d / 3); w = u + (Math.min(d, 3) - 1) * cp; h = u + (rows - 1) * cp; for (i = 0; i < d; i++) out += '<rect class="dg-cubebg" x="' + ((i % 3) * cp) + '" y="' + (h - u - Math.floor(i / 3) * cp) + '" width="' + u + '" height="' + u + '" rx="1"/>'; }
    return '<svg class="dg-art dg-stack' + (cls ? ' ' + cls : '') + '" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">' + out + '</svg>';
  },
  _glyph: function (p) {
    var g = p === 'th' ? '<rect x="4" y="2" width="16" height="16" rx="2" class="dg-bigbg"/>' : p === 'h' ? '<rect x="4" y="2" width="16" height="16" rx="1.5" class="dg-flatbg"/>' : p === 't' ? '<rect x="9.5" y="2" width="5" height="16" rx="1" class="dg-rodbg"/>' : '<rect x="8.5" y="6.5" width="7" height="7" rx="1" class="dg-cubebg"/>';
    return '<svg class="dg-glyph" width="24" height="20" viewBox="0 0 24 20" aria-hidden="true">' + g + '</svg>';
  },
  _flagSvg: function () { return '<svg class="dg-flag" width="22" height="24" viewBox="0 0 22 24" aria-hidden="true"><path d="M4 2V23" stroke="#2F2A3B" stroke-width="2.4" stroke-linecap="round"/><path d="M5 3h13l-3 4.5 3 4.5H5z" class="dg-flagcloth"/></svg>'; },
  /* the number as digit plates in their place colours */
  _plates: function (n, cls, big) {
    var C = DecidingGateCore, st = this.st, ds = C.digitsOf(n, st.nd), pl = C.places(st.nd);
    return '<span class="dg-plates' + (cls ? ' ' + cls : '') + '">' + ds.map(function (d, i) { return '<span class="dg-plate dg-p-' + pl[i] + (big === i ? ' is-big' : '') + '">' + d + '</span>'; }).join('') + '</span>';
  },

  /* ---------- compare: the scoreboard (a [sign] b) and the sign tiles ---------- */
  _paintBoard: function (main) {
    var st = this.st, r = st.round, self = this, v = st.verdict, big = st.help && v && r.gate < st.nd ? r.gate : null;
    var board = document.createElement('div'); board.className = 'dg-board dg-art';
    board.innerHTML = this._plates(r.a, 'is-a', big);
    var slot = this._btn('dg-slot' + (st.sign ? ' has-sign' : '') + (v && v.kind === 'sign' ? ' is-wrong' : ''), 'slot', this._t('aSlot', { s: st.sign ? this._t(st.sign === '<' ? 'aLt' : st.sign === '>' ? 'aGt' : 'aEq') : this._t('aEmpty') }), st.sign ? this._jaw(st.sign) : '');
    slot.disabled = st.done;
    slot.addEventListener('click', function () { if (self.st.sign) self._sign(null); });
    board.appendChild(slot);
    board.insertAdjacentHTML('beforeend', this._plates(r.b, 'is-b', big));
    main.appendChild(board);
    if (st.done) return;
    var tiles = document.createElement('div'); tiles.className = 'dg-tiles';
    this.SIGNS.forEach(function (s) {
      var b = self._btn('dg-tile' + (st.sign === s[0] ? ' is-on' : ''), 'sign-' + s[1], self._t(s[2]), self._jaw(s[0]));
      b.addEventListener('click', function () { self._sign(s[0]); });
      b.addEventListener('pointerdown', function (e) { self._dragStart(e, 'sign', s[0], b); });
      tiles.appendChild(b);
    });
    main.appendChild(tiles);
  },
  _jaw: function (s) { return '<span class="dg-jaw" aria-hidden="true">' + (s === '<' ? '&lt;' : s === '>' ? '&gt;' : '=') + '</span>'; },

  /* ---------- compare: the track — gate headers to tap, two lanes, the run ---------- */
  _paintTrack: function (main, W) {
    var st = this.st, r = st.round, C = DecidingGateCore, self = this, v = st.verdict, pl = C.places(st.nd), nd = st.nd;
    var track = document.createElement('div'); track.className = 'dg-track dg-art';
    var G = this._trackGeo(W), colW = G.col, u = this._u(colW);
    /* one geometry for every column, gap and the padding, so the sum always fits the stage */
    track.style.gridTemplateColumns = G.start + 'px repeat(' + nd + ', ' + colW + 'px) ' + G.fin + 'px';
    track.style.columnGap = G.gap + 'px'; track.style.padding = G.pad + 'px';
    /* header: the gates (and the flag) the child can call */
    track.appendChild(document.createElement('span'));
    var lateShake = v && v.kind === 'gateLate' ? st.predicted : null;
    for (var g = 0; g <= nd; g++) (function (g) {
      var isFin = g === nd, p = pl[g];
      var label = isFin ? self._t('aFinish') : self._t(p === 'th' ? 'gTh' : p === 'h' ? 'gH' : p === 't' ? 'gT' : 'gO');
      var cls = 'dg-gate' + (isFin ? ' is-fin' : ' dg-g-' + p) + (st.predicted === g ? ' is-pick' : '') + (st.ran && g === r.gate ? ' is-deciding' : '') + (lateShake === g ? ' is-shake' : '');
      var b = self._btn(cls, 'gate-' + g, label, isFin ? self._flagSvg() : self._glyph(p) + (st.predicted === g ? '<span class="dg-pickflag" aria-hidden="true"></span>' : ''));
      b.disabled = st.done;
      b.addEventListener('click', function () { self._predict(g); });
      track.appendChild(b);
    })(g);
    /* the two lanes */
    var frames = st.ran ? C.frames(r.a, r.b, nd) : [], smaller = r.a < r.b ? 'a' : r.a > r.b ? 'b' : null, early = v && v.kind === 'gateEarly' ? v.gate : null;
    ['a', 'b'].forEach(function (lane) {
      var n = lane === 'a' ? r.a : r.b, ds = C.digitsOf(n, nd);
      var sled = document.createElement('div'); sled.className = 'dg-sled is-' + lane + (st.ran && smaller === lane ? ' is-stopped' : '');
      sled.innerHTML = self._plates(n, 'is-sled'); sled.setAttribute('role', 'img'); sled.setAttribute('aria-label', String(n));
      track.appendChild(sled);
      for (var g = 0; g < nd; g++) {
        var cell = document.createElement('div'), f = frames[g], dim = st.ran && smaller === lane && g > r.gate;
        cell.className = 'dg-cell is-' + lane + (f ? ' is-run' : '') + (f && f.equal ? ' is-eq' : '') + (early === g ? ' is-glow' : '') + (dim ? ' is-dim' : '') + (st.ran && g === r.gate && smaller === lane ? ' is-barred' : '');
        cell.style.animationDelay = (self.FAST ? 0 : g * 0.35) + 's';
        cell.innerHTML = '<span class="dg-rail"></span>' + (f ? self._stack(pl[g], ds[g], u) : '') + (st.ran && g === r.gate && smaller === lane ? '<span class="dg-gatebar"></span>' : '');
        track.appendChild(cell);
      }
      var fin = document.createElement('div');
      fin.className = 'dg-fincell is-' + lane + (st.ran && smaller !== lane ? ' is-through' : '');
      fin.innerHTML = st.ran && smaller !== lane ? self._flagSvg() : '';
      track.appendChild(fin);
    });
    main.appendChild(track);
  },
  _trackGeo: function (W) {
    var nd = this.st.nd, wide = this._wide, cramp = W < 340;
    var G = { start: wide ? 128 : cramp ? (nd === 4 ? 46 : 62) : (nd === 4 ? 66 : 80), fin: wide ? 60 : 44, gap: wide ? 4 : cramp ? 2 : 4, pad: wide ? 8 : cramp ? 3 : 6 };
    G.col = Math.max(44, Math.min(130, Math.floor((W - G.start - G.fin - 2 * G.pad - G.gap * (nd + 1) - 2) / nd)));
    return G;
  },
  _u: function (colW) { return Math.max(2, Math.min(this._wide ? 5 : 4, Math.floor((colW - 6) / 16.4 * 10) / 10)); },

  /* ---------- order four: the tags and the podium ---------- */
  _paintPodium: function (main, W) {
    var st = this.st, r = st.round, C = DecidingGateCore, self = this, v = st.verdict, want = C.trueOrder(r.nums);
    var tags = document.createElement('div'); tags.className = 'dg-tags';
    r.nums.forEach(function (n, i) {
      var onStep = st.steps.indexOf(i);
      var b = self._btn('dg-tag' + (st.picked === i ? ' is-picked' : '') + (onStep >= 0 ? ' is-placed' : ''), 'tag-' + i, String(n), self._plates(n));
      b.disabled = st.done;
      b.addEventListener('pointerdown', function (e) { self._dragStart(e, 'tag', i, b); });
      b.addEventListener('click', function () { if (self._dragged) { self._dragged = false; return; } self._pick(i); });
      tags.appendChild(b);
    });
    main.appendChild(tags);
    var pod = document.createElement('div'); pod.className = 'dg-podium dg-art';
    for (var k = 0; k < 4; k++) (function (k) {
      var i = st.steps[k], n = i == null ? null : r.nums[i], wrong = v && v.wrong && v.wrong.indexOf(k) >= 0, pair = st.help && v && v.pair && i != null && v.pair.indexOf(i) >= 0;
      var b = self._btn('dg-step dg-s' + k + (n == null ? ' is-empty' : '') + (wrong ? ' is-wrong' : '') + (st.done ? ' is-right' : '') + (pair ? ' is-pair' : ''), 'step-' + k,
        self._t('aStep', { k: k + 1, n: n == null ? self._t('aEmpty') : n }),
        '<span class="dg-stepnum">' + (k + 1) + '</span>' + (n == null ? '' : self._plates(n, 'is-onstep')));
      b.disabled = st.done;
      b.setAttribute('data-step', k);
      b.addEventListener('click', function () { self._step(k); });
      pod.appendChild(b);
    })(k);
    main.appendChild(pod);
    /* help 2: the pair the child has wrong, at the gate that decides them, as blocks side by side */
    if (st.help && v && v.kind === 'order') {
      var p = C.places(st.nd)[v.gate], cmp = document.createElement('div'); cmp.className = 'dg-pair dg-art';
      cmp.innerHTML = v.pair.map(function (i) { var n = r.nums[i], d = v.gate < st.nd ? C.digitsOf(n, st.nd)[v.gate] : 0; return '<span class="dg-paircol">' + self._plates(n, '', v.gate) + (v.gate < st.nd ? self._stack(p, d, self._wide ? 4 : 3) : '') + '</span>'; }).join('');
      main.appendChild(cmp);
    }
  },

  /* ---------- the long view (after a win): true lengths on a ruler from 0 ---------- */
  _paintLong: function (main, W) {
    var st = this.st, r = st.round, max = st.nd === 4 ? 10000 : 1000, nums = st.job === 'order' ? C2(r) : [r.a, r.b], wR = Math.max(200, Math.min(600, W - 24));
    function C2(r) { return DecidingGateCore.trueOrder(r.nums).map(function (i) { return r.nums[i]; }); }
    var row = 16, h = nums.length * row + 26, svg = '';
    nums.forEach(function (n, i) { var y = 4 + i * row, len = Math.max(2, Math.round(wR * n / max)); svg += '<rect class="dg-lbar dg-l' + i + '" x="0" y="' + y + '" width="' + len + '" height="10" rx="3"/><text class="dg-ltxt" x="' + Math.min(len + 4, wR - 30) + '" y="' + (y + 9) + '">' + n + '</text>'; });
    var ty = nums.length * row + 6;
    svg += '<path class="dg-ruler" d="M0 ' + ty + 'H' + wR + '"/>';
    for (var q = 0; q <= 10; q++) svg += '<path class="dg-tick" d="M' + Math.round(wR * q / 10) + ' ' + ty + 'v' + (q % 5 ? 4 : 7) + '"/>';
    svg += '<text class="dg-ltxt" x="0" y="' + (ty + 18) + '">0</text><text class="dg-ltxt" x="' + wR + '" y="' + (ty + 18) + '" text-anchor="end">' + max + '</text>';
    var d = document.createElement('div'); d.className = 'dg-long';
    d.innerHTML = '<svg class="dg-art" width="' + (wR + 34) + '" height="' + (h + 6) + '" viewBox="-2 0 ' + (wR + 34) + ' ' + (h + 6) + '" aria-hidden="true">' + svg + '</svg>';
    main.appendChild(d);
  },
  _paintBar: function () {
    var st = this.st, self = this, el = this._qs('.dg-bar'); el.innerHTML = '';
    if (st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    var c = this._btn('dg-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._t('checkBtn') + '</span>');
    c.addEventListener('click', function () { self._check(); });
    el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _clear: function () { this._view.note = ''; },
  _predict: function (g) { if (DecidingGateCore.predict(this.st, g)) { this._clear(); this.api.sound(660); this._paint(); } },
  _sign: function (s) { if (DecidingGateCore.setSign(this.st, s)) { this._clear(); this.api.sound(s ? 520 : 300); this._paint(); } },
  _pick: function (i) { if (this.st.done) return; this.st.picked = this.st.picked === i ? null : i; this.api.sound(520); this._paint(); },
  _step: function (k) {
    var st = this.st; if (st.done) return;
    if (st.picked != null) { if (DecidingGateCore.place(st, st.picked, k)) { st.picked = null; this._clear(); this.api.sound(620); } else st.picked = null; this._paint(); return; }
    if (st.steps[k] != null) { st.picked = st.steps[k]; DecidingGateCore.unplace(st, k); this._clear(); this.api.sound(300); this._paint(); }
  },
  _keyboard: function (e) {
    if (!this.st || this.st.job !== 'compare') { if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); } return; }
    if (e.key === '<' || e.key === '>' || e.key === '=') { e.preventDefault(); this._sign(e.key); }
    else if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = DecidingGateCore; if (st.done) return;
    var r = C.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') { v.note = this._t(r.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (r.result === 'ok') { this._success(); return; }
    var key = C.hint(st), V = st.verdict, R = st.round, pl = C.places(st.nd), args = {};
    if (key === 'hintSignSide' && R.sign === '=') key = 'hintSignEq';
    if (key === 'hintLate') args.at = this._at(R.gate);
    if (key === 'hintVs') { var g = R.gate, da = C.digitsOf(R.a, st.nd)[g], db = C.digitsOf(R.b, st.nd)[g]; args = { w1: this._word(pl[g], da), w2: this._word(pl[g], db), small: Math.min(R.a, R.b) }; }
    if (key === 'hintPair') { args = { a: R.nums[V.pair[0]], b: R.nums[V.pair[1]], at: this._at(V.gate) }; }
    v.soft = false; v.shake = true;
    v.note = this._t(key, args);
    this.api.sound(240); this._paint(); this.api.announce(v.note);
  },
  _okLine: function () {
    var st = this.st, r = st.round, k = DecidingGateCore.okKey(st);
    if (k === 'okOrder') { var s = DecidingGateCore.trueOrder(r.nums).map(function (i) { return r.nums[i]; }); return this._t('okOrder', { w: s[0], x: s[1], y: s[2], z: s[3] }); }
    return this._t(k, { a: r.a, b: r.b });
  },
  _success: function () {
    var v = this._view, msg = this._okLine();
    v.note = ''; v.success = true;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },

  /* drag a sign tile into the slot, or a tag onto a step (a tap stays a tap) */
  _dragStart: function (e, kind, val, srcEl) {
    if (e.button != null && e.button !== 0) return;
    var self = this, sx = e.clientX, sy = e.clientY, moved = false, ghost = null;
    this._dragged = false;
    var mv = function (ev) {
      if (!moved && Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 8) return;
      if (!moved) { moved = true; ghost = srcEl.cloneNode(true); ghost.className += ' dg-ghost is-ghostdrag'; ghost.removeAttribute('data-k'); document.body.appendChild(ghost); srcEl.classList.add('is-lifted'); }
      ghost.style.left = (ev.clientX - ghost.offsetWidth / 2) + 'px'; ghost.style.top = (ev.clientY - ghost.offsetHeight / 2) + 'px';
      ev.preventDefault();
    };
    var up = function (ev) {
      self._endDrag();
      if (!moved) return;
      self._dragged = true;
      var hit = document.elementFromPoint(ev.clientX, ev.clientY), t;
      if (kind === 'sign' && hit && hit.closest('.dg-slot')) self._sign(val);
      else if (kind === 'tag' && hit && (t = hit.closest('.dg-step'))) { self.st.picked = val; self._step(+t.getAttribute('data-step')); }
      if (kind === 'sign') self._dragged = false;
    };
    this._drag = { mv: mv, up: up, ghost: function () { return ghost; }, src: srcEl };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d) return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    var g = d.ghost(); if (g && g.parentNode) g.parentNode.removeChild(g);
    if (d.src) d.src.classList.remove('is-lifted');
    this._drag = null;
  }
};

function injectDecidingGateCSS() {
  if (typeof document === 'undefined' || document.getElementById('dg-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.dg-wrap{--dg-start:128px;--dg-fin:60px;position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .dg-wrap:focus{outline:none;}'
  + '.dg-wrap.is-narrow{--dg-start:80px;--dg-fin:46px;gap:8px;} .dg-wrap.is-cramp{--dg-start:70px;}'
  + '.dg-main{display:flex;flex-direction:column;align-items:center;gap:10px;min-width:0;} .dg-wrap.is-narrow .dg-main{gap:8px;}'
  /* digit plates in the place colours */
  + '.dg-plates{display:inline-flex;gap:3px;} .dg-plate{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:52px;padding:0 2px;border-radius:8px;background:#FFFDF6;font-family:' + H + ';font-weight:800;font-size:40px;line-height:1;color:' + INK + ';font-variant-numeric:tabular-nums;transition:transform .2s;}'
  + '.dg-p-th{box-shadow:inset 0 0 0 3px #3F5BA9;} .dg-p-h{box-shadow:inset 0 0 0 3px #2E9C88;} .dg-p-t{box-shadow:inset 0 0 0 3px #F2784B;} .dg-p-o{box-shadow:inset 0 0 0 3px #F2B33D;}'
  + '.dg-plate.is-big{transform:scale(1.22);background:#FCE3D6;} .dg-wrap.is-narrow .dg-plate{min-width:26px;height:42px;font-size:30px;} .is-d4.dg-wrap.is-narrow .dg-board .dg-plate{min-width:22px;font-size:26px;}'
  + '.dg-plates.is-sled .dg-plate,.dg-plates.is-onstep .dg-plate{min-width:20px;height:30px;font-size:22px;border-radius:6px;} .dg-wrap.is-narrow .dg-plates.is-sled .dg-plate{min-width:15px;height:26px;font-size:17px;} .is-d4.dg-wrap.is-cramp .dg-plates.is-sled{gap:1px;} .is-d4.dg-wrap.is-cramp .dg-plates.is-sled .dg-plate{min-width:10px;height:22px;font-size:13px;border-radius:4px;padding:0 1px;} .is-d4.dg-wrap.is-narrow:not(.is-cramp) .dg-plates.is-sled .dg-plate{min-width:13px;font-size:15px;}'
  + '.dg-tag .dg-plate{min-width:24px;height:36px;font-size:26px;} .dg-wrap.is-narrow .dg-tag .dg-plate{min-width:16px;height:30px;font-size:20px;}'
  /* the board and the sign */
  + '.dg-board{display:flex;align-items:center;justify-content:center;gap:12px;padding:8px 14px;border-radius:16px;background:#FBF3E4;box-shadow:inset 0 0 0 3px #146B5E;} .dg-wrap.is-narrow .dg-board{gap:8px;padding:6px 8px;}'
  + '.dg-slot{display:flex;align-items:center;justify-content:center;width:66px;height:66px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px #9AB8B1;outline:2px dashed #9AB8B1;outline-offset:-8px;cursor:pointer;} .dg-slot.has-sign{outline:0;box-shadow:inset 0 0 0 3px #146B5E;} .dg-slot.is-wrong{box-shadow:inset 0 0 0 3px #F2784B;background:#FCE3D6;} .dg-wrap.is-narrow .dg-slot{width:52px;height:52px;}'
  + '.dg-jaw{font-family:' + H + ';font-weight:800;font-size:46px;line-height:1;color:#146B5E;} .dg-wrap.is-narrow .dg-jaw{font-size:36px;}'
  + '.dg-tiles{display:flex;gap:10px;justify-content:center;} .dg-tile{width:64px;height:56px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;cursor:grab;touch-action:none;} .dg-tile.is-on{box-shadow:inset 0 0 0 3px #146B5E,0 3px 0 #146B5E;background:#EAF6F2;} .dg-tile.is-lifted{opacity:.4;}'
  /* the track */
  + '.dg-track{display:grid;grid-auto-rows:auto;column-gap:4px;row-gap:4px;padding:8px;border-radius:16px;background:#F3EBDD;box-shadow:inset 0 0 0 2px #CDBFA4;box-sizing:border-box;max-width:100%;} .dg-wrap.is-narrow .dg-track{padding:6px;column-gap:4px;}'
  + '.dg-gate{display:flex;align-items:center;justify-content:center;gap:4px;height:52px;min-width:44px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 3px #146B5E;cursor:pointer;position:relative;padding:0;} .dg-gate.is-fin{box-shadow:inset 0 0 0 3px #CDBFA4;}'
  + '.dg-gate.is-pick{background:#FCE3D6;box-shadow:inset 0 0 0 3px #F2784B;} .dg-gate.is-deciding{background:#E9F4EE;box-shadow:inset 0 0 0 3px #2E9C88;} .dg-gate.is-pick.is-deciding{background:#2E9C88;} .dg-gate.is-shake{animation:dgShake .45s 1;}'
  + '.dg-pickflag{position:absolute;top:4px;right:6px;width:10px;height:10px;border-radius:2px 6px 6px 2px;background:#F2784B;} .dg-gate.is-pick.is-deciding .dg-pickflag{background:#fff;}'
  + '.dg-sled{display:flex;align-items:center;justify-content:flex-start;padding-left:2px;} .dg-sled.is-stopped{opacity:.55;}'
  + '.dg-cell{position:relative;display:flex;align-items:center;justify-content:center;min-height:76px;border-radius:10px;} .dg-wrap.is-narrow .dg-cell{min-height:56px;} .is-d4.dg-wrap.is-narrow .dg-cell{min-height:52px;}'
  + '.dg-rail{position:absolute;left:0;right:0;top:50%;height:2px;background:#CDBFA4;} .dg-cell .dg-stack{position:relative;}'
  + '.dg-cell.is-run{animation:dgRise .35s ease-out both;} .is-fast .dg-cell.is-run{animation:none;} .dg-cell.is-eq{background:#EAF6F2;} .dg-cell.is-glow{background:#FCE3D6;box-shadow:inset 0 0 0 2px #F2784B;} .dg-cell.is-dim{opacity:.35;}'
  + '.dg-cell.is-barred{background:#FCE3D6;} .dg-gatebar{position:absolute;left:-2px;top:6px;bottom:6px;width:6px;border-radius:3px;background:#C4522F;box-shadow:0 0 0 2px #fff;}'
  + '.dg-fincell{display:flex;align-items:center;justify-content:center;border-radius:10px;} .dg-fincell.is-through{background:#E9F4EE;}'
  /* blocks */
  + '.dg-flatbg{fill:#2E9C88;stroke:' + INK + ';stroke-width:1;} .dg-rodbg{fill:#F2784B;stroke:' + INK + ';stroke-width:1;} .dg-cubebg{fill:#F2B33D;stroke:' + INK + ';stroke-width:1;} .dg-bigbg{fill:#5C77C4;stroke:' + INK + ';stroke-width:1;} .dg-bigtopf{fill:#8EA3DC;stroke:' + INK + ';stroke-width:1;} .dg-bigside{fill:#3F5BA9;stroke:' + INK + ';stroke-width:1;}'
  + '.dg-flagcloth{fill:#F2B33D;stroke:' + INK + ';stroke-width:1.2;}'
  /* order four */
  + '.dg-tags{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;} .dg-tag{display:flex;align-items:center;justify-content:center;min-width:64px;height:52px;padding:0 8px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;cursor:grab;touch-action:none;} .dg-tag.is-picked{box-shadow:inset 0 0 0 3px #146B5E,0 3px 0 #146B5E;background:#EAF6F2;} .dg-tag.is-placed{opacity:.45;} .dg-tag.is-lifted{opacity:.3;}'
  + '.dg-wrap.is-narrow .dg-tags{gap:5px;} .dg-wrap.is-narrow .dg-tag{min-width:44px;height:46px;padding:0 4px;}'
  + '.dg-podium{display:flex;align-items:flex-end;justify-content:center;gap:6px;padding:8px;border-radius:16px;background:#F3EBDD;box-shadow:inset 0 0 0 2px #CDBFA4;}'
  + '.dg-step{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:4px;width:118px;padding:6px 2px 4px;border:0;border-radius:10px 10px 4px 4px;background:#FFFDF6;box-shadow:inset 0 0 0 3px #146B5E;cursor:pointer;} .dg-wrap.is-narrow .dg-step{width:72px;}'
  + '.dg-s0{height:84px;} .dg-s1{height:104px;} .dg-s2{height:124px;} .dg-s3{height:144px;} .dg-wrap.is-narrow .dg-s0{height:70px;} .dg-wrap.is-narrow .dg-s1{height:84px;} .dg-wrap.is-narrow .dg-s2{height:98px;} .dg-wrap.is-narrow .dg-s3{height:112px;}'
  + '.dg-stepnum{font-family:' + H + ';font-weight:800;font-size:16px;color:#146B5E;} .dg-step.is-empty{box-shadow:inset 0 0 0 3px #9AB8B1;} .dg-step.is-wrong{box-shadow:inset 0 0 0 3px #F2784B;background:#FCE3D6;animation:dgShake .45s 1;} .dg-step.is-right{box-shadow:inset 0 0 0 3px #2E9C88;background:#E9F4EE;} .dg-step.is-pair{background:#FFE9C9;}'
  + '.dg-wrap.is-narrow .dg-plates.is-onstep .dg-plate{min-width:14px;height:24px;font-size:16px;}'
  + '.dg-pair{display:flex;gap:18px;justify-content:center;padding:8px 12px;border-radius:12px;background:#FFE9C9;} .dg-paircol{display:flex;flex-direction:column;align-items:center;gap:6px;} .dg-pair .dg-plate{min-width:20px;height:30px;font-size:22px;}'
  /* the long view */
  + '.dg-long{display:flex;justify-content:center;max-width:100%;overflow:hidden;} .dg-lbar{fill:#2E9C88;} .dg-l1{fill:#F2784B;} .dg-l2{fill:#F2B33D;} .dg-l3{fill:#5C77C4;} .dg-ltxt{font-family:' + H + ';font-weight:800;font-size:13px;fill:' + INK + ';} .dg-ruler,.dg-tick{stroke:' + INK + ';stroke-width:1.5;fill:none;}'
  /* the bar */
  + '.dg-bar{display:flex;justify-content:center;} .dg-go{display:flex;align-items:center;justify-content:center;gap:8px;min-width:180px;height:48px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .dg-go svg{width:22px;height:22px;display:block;}'
  + '.dg-wrap.is-narrow .dg-go{height:44px;font-size:20px;}'
  + '.dg-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .dg-wrap.is-narrow .dg-note{font-size:16px;line-height:1.25;} .dg-note:empty{display:none;} .dg-note.is-hint{color:#9A3D1C;}'
  + '.dg-ghost{position:fixed;z-index:50;pointer-events:none;opacity:.9;margin:0;}'
  + '.dg-gate:focus-visible,.dg-tile:focus-visible,.dg-slot:focus-visible,.dg-tag:focus-visible,.dg-step:focus-visible,.dg-go:focus-visible{outline:3px solid #2E5BD6;outline-offset:2px;}'
  + '@keyframes dgShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}'
  + '@keyframes dgRise{0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:none}}'
  + '@media (prefers-reduced-motion:reduce){.dg-cell.is-run,.dg-gate.is-shake,.dg-step.is-wrong{animation:none !important;}}';
  var st = document.createElement('style'); st.id = 'dg-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.DecidingGateActivity = DecidingGateActivity;
