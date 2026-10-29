/* =====================================================================
   spirit-bench-activity.js — ACTIVITY #156 of the one-by-one rebuild:
   "Bram's Board Shop" → THE SPIRIT LEVEL (2.MD.B.5; all 11 locales).
   Model: spirit-bench-core.js (SpiritBenchCore).
   Design: docs/activities-rebuild/designs/156-bram-board-shop.md
   ---------------------------------------------------------------------
   The invention: every length story is two rails that must end together.
   The child lays the story's two lengths on Bram's bench — the longest on
   the top rail, the pieces end to end on the bottom rail; the rack also
   holds the board a keyword guess would give. Then the child types the
   mystery board, and on Check the saw cuts exactly that board and drops it
   into the empty place. A spirit level against the two rail ends stands
   straight only when the story balances; otherwise it leans and the gap is
   shaded. The bench ruler is "a drawing of a ruler", the success line the
   equation in the story's own shape.
   No timer, no score; numerals only on the boards and the ruler.
   Test seams: window.SpiritBenchActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._put / ._select / ._tapRail /
   ._type / ._back / ._test / ._check / ._g / .FAST / .OK_MS.
   ===================================================================== */
var SpiritBenchActivity = {
  id: 'spirit-bench',
  /* the drawn apparatus (the hierarchy gate): the bench, the boards, the level */
  apparatusClasses: ['sb-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Bram's Board Shop","de":"Brams Bretter-Werkstatt","fr":"La menuiserie de Bram","es":"El taller de tablas de Bram","pt":"A marcenaria do Bram","it":"La falegnameria di Bram","nl":"Brams houtwerkplaats","sv":"Brams snickeri","da":"Brams snedkerværksted","no":"Brams snekkerverksted","fi":"Bramin puuverstas"},
    instruction: {"en":"Read the order. Put the two lengths from the story on the bench: the longest on the top rail (even if it is the mystery board), the pieces on the bottom rail. Then type how long the mystery board is and press Check.","de":"Lies den Auftrag. Leg die zwei Längen aus der Geschichte auf die Werkbank: die längste auf die obere Schiene, die Teile auf die untere. Tipp dann das Rätselbrett ein und drück auf Prüfen.","fr":"Lis la commande. Pose les deux longueurs de l’histoire sur l’établi : la plus longue sur le rail du haut, les morceaux sur le rail du bas. Tape ensuite la planche mystère, puis touche Vérifier.","es":"Lee el pedido. Pon en el banco las dos longitudes del problema: la más larga en el riel de arriba y las partes en el riel de abajo. Luego escribe la tabla misteriosa y oprime Revisar.","pt":"Leia o pedido. Coloque na bancada os dois comprimentos da história: o maior no trilho de cima e as partes no trilho de baixo. Depois digite a tábua misteriosa e toque em Conferir.","it":"Leggi l’ordine. Metti sul banco le due lunghezze del problema: la più lunga sulla guida in alto, i pezzi sulla guida in basso. Poi scrivi l’asse misteriosa e tocca Controlla.","nl":"Lees de bestelling. Leg de twee lengtes uit het verhaal op de werkbank: de langste op de bovenste rail, de stukken op de onderste rail. Typ dan de geheime plank en druk op Controleer.","sv":"Läs beställningen. Lägg de två längderna från berättelsen på bänken: den längsta på den övre skenan och bitarna på den nedre. Skriv sedan hur lång den hemliga brädan är och tryck på Kontrollera.","da":"Læs bestillingen. Læg de to længder fra historien på bænken: den længste på den øverste skinne og stykkerne på den nederste. Skriv så det hemmelige bræt, og tryk på Tjek.","no":"Les bestillingen. Legg de to lengdene fra fortellingen på benken: den lengste på den øverste skinnen og bitene på den nederste. Skriv så den hemmelige planken, og trykk på Sjekk.","fi":"Lue tilaus. Laita tarinan kaksi pituutta höyläpenkille: pisin ylempään kiskoon ja palat alempaan kiskoon. Kirjoita sitten salainen lauta ja paina Tarkista."},
    taskLine: {"en":"Put the two lengths on the bench, then type how long the mystery board is.","de":"Leg die zwei Längen auf die Werkbank und tipp dann das Rätselbrett ein.","fr":"Pose les deux longueurs sur l’établi, puis tape la planche mystère.","es":"Pon las dos longitudes en el banco y luego escribe la tabla misteriosa.","pt":"Coloque os dois comprimentos na bancada e depois digite a tábua misteriosa.","it":"Metti le due lunghezze sul banco, poi scrivi l’asse misteriosa.","nl":"Leg de twee lengtes op de werkbank en typ dan de geheime plank.","sv":"Lägg de två längderna på bänken och skriv sedan hur lång den hemliga brädan är.","da":"Læg de to længder på bænken, og skriv så det hemmelige bræt.","no":"Legg de to lengdene på benken, og skriv så den hemmelige planken.","fi":"Laita kaksi pituutta penkille ja kirjoita sitten salainen lauta."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    hintBoards: {"en":"Put the two lengths from the story on the bench.","de":"Leg die zwei Längen aus der Geschichte auf die Werkbank.","fr":"Pose les deux longueurs de l’histoire sur l’établi.","es":"Pon en el banco las dos longitudes del problema.","pt":"Coloque na bancada os dois comprimentos da história.","it":"Metti sul banco le due lunghezze del problema.","nl":"Leg de twee lengtes uit het verhaal op de werkbank.","sv":"Lägg de två längderna från berättelsen på bänken.","da":"Læg de to længder fra historien på bænken.","no":"Legg de to lengdene fra fortellingen på benken.","fi":"Laita tarinan kaksi pituutta penkille."},
    hintPick: {"en":"Tap a board first, then a rail.","de":"Tipp zuerst auf ein Brett und dann auf eine Schiene.","fr":"Touche d’abord une planche, puis un rail.","es":"Toca primero una tabla y luego un riel.","pt":"Toque primeiro numa tábua e depois num trilho.","it":"Tocca prima un’asse, poi una guida.","nl":"Tik eerst op een plank en dan op een rail.","sv":"Tryck först på en bräda och sedan på en skena.","da":"Tryk først på et bræt og så på en skinne.","no":"Trykk først på en planke og så på en skinne.","fi":"Napauta ensin lautaa ja sitten kiskoa."},
    hintFull: {"en":"Only two boards go on the bench. The saw cuts the mystery board for the empty place.","de":"Nur zwei Bretter kommen auf die Werkbank. Für die leere Stelle sägt die Säge das Rätselbrett.","fr":"Seules deux planches vont sur l’établi. Pour la place vide, la scie coupe la planche mystère.","es":"En el banco solo van dos tablas. Para el lugar vacío, el serrucho corta la tabla misteriosa.","pt":"Só duas tábuas vão na bancada. Para o lugar vazio, o serrote corta a tábua misteriosa.","it":"Sul banco vanno solo due assi. Per il posto vuoto la sega taglia l’asse misteriosa.","nl":"Er gaan maar twee planken op de werkbank. Voor de lege plek zaagt de zaag de geheime plank.","sv":"Bara två brädor får plats på bänken. Till den tomma platsen sågar sågen den hemliga brädan.","da":"Kun to brædder skal på bænken. Til den tomme plads saver saven det hemmelige bræt.","no":"Bare to planker skal på benken. Til den tomme plassen sager sagen den hemmelige planken.","fi":"Penkille tulee vain kaksi lautaa. Tyhjään kohtaan saha sahaa salaisen laudan."},
    hintType: {"en":"Now type how long the mystery board is.","de":"Tipp jetzt das Rätselbrett ein.","fr":"Tape maintenant la planche mystère.","es":"Ahora escribe la tabla misteriosa.","pt":"Agora digite a tábua misteriosa.","it":"Ora scrivi l’asse misteriosa.","nl":"Typ nu de geheime plank.","sv":"Skriv nu hur lång den hemliga brädan är.","da":"Skriv nu det hemmelige bræt.","no":"Skriv nå den hemmelige planken.","fi":"Kirjoita nyt salainen lauta."},
    hintLevel: {"en":"The bubble is not in the middle: the rails don't end together. Is the mystery board too long or too short?","de":"Die Blase ist nicht in der Mitte: Die Schienen enden nicht gleich. Ist das Rätselbrett zu lang oder zu kurz?","fr":"La bulle n’est pas au milieu : les rails ne finissent pas au même endroit. La planche mystère est-elle trop longue ou trop courte ?","es":"La burbuja no está en medio: los rieles no terminan juntos. ¿La tabla misteriosa es demasiado larga o demasiado corta?","pt":"A bolha não está no meio: os trilhos não terminam juntos. A tábua misteriosa está comprida demais ou curta demais?","it":"La bolla non è al centro: le guide non finiscono insieme. L’asse misteriosa è troppo lunga o troppo corta?","nl":"De luchtbel staat niet in het midden: de rails eindigen niet gelijk. Is de geheime plank te lang of te kort?","sv":"Bubblan är inte i mitten: skenorna slutar inte lika. Är den hemliga brädan för lång eller för kort?","da":"Boblen er ikke i midten: Skinnerne ender ikke samme sted. Er det hemmelige bræt for langt eller for kort?","no":"Boblen er ikke i midten: Skinnene slutter ikke likt. Er den hemmelige planken for lang eller for kort?","fi":"Kupla ei ole keskellä: kiskot eivät pääty samaan kohtaan. Onko salainen lauta liian pitkä vai liian lyhyt?"},
    hintDecoy: {"en":"Read the order again: is that board in the story?","de":"Lies den Auftrag noch einmal: Kommt dieses Brett in der Geschichte vor?","fr":"Relis la commande : cette planche est-elle dans l’histoire ?","es":"Lee otra vez el pedido: ¿esa tabla está en el problema?","pt":"Leia o pedido de novo: essa tábua está na história?","it":"Rileggi l’ordine: quell’asse c’è nel problema?","nl":"Lees de bestelling nog eens: staat die plank in het verhaal?","sv":"Läs beställningen igen: finns den brädan i berättelsen?","da":"Læs bestillingen igen: Er det bræt med i historien?","no":"Les bestillingen igjen: Er den planken med i fortellingen?","fi":"Lue tilaus uudestaan: onko se lauta tarinassa?"},
    hintRail: {"en":"The top rail holds the whole: the longest length in the story. It can be the mystery board. Which length is the whole?","de":"Auf die obere Schiene kommt das Ganze: die längste Länge der Geschichte. Das kann auch das Rätselbrett sein. Welche Länge ist das Ganze?","fr":"Le rail du haut porte le tout : la plus grande longueur de l’histoire. Ce peut être la planche mystère. Quelle longueur est le tout ?","es":"En el riel de arriba va el total: la longitud más larga del problema. Puede ser la tabla misteriosa. ¿Cuál es el total?","pt":"No trilho de cima vai o todo: o maior comprimento da história. Pode ser a tábua misteriosa. Qual comprimento é o todo?","it":"Sulla guida in alto va il tutto: la lunghezza più lunga del problema. Può essere l’asse misteriosa. Quale lunghezza è il tutto?","nl":"Op de bovenste rail komt het geheel: de langste lengte uit het verhaal. Dat kan ook de geheime plank zijn. Welke lengte is het geheel?","sv":"På den övre skenan ligger helheten: den längsta längden i berättelsen. Det kan vara den hemliga brädan. Vilken längd är helheten?","da":"På den øverste skinne ligger det hele: den længste længde i historien. Det kan være det hemmelige bræt. Hvilken længde er det hele?","no":"På den øverste skinnen ligger helheten: den lengste lengden i fortellingen. Det kan være den hemmelige planken. Hvilken lengde er helheten?","fi":"Ylempään kiskoon tulee kokonaisuus: tarinan pisin pituus. Se voi olla myös salainen lauta. Mikä pituus on kokonaisuus?"},
    hintDecoyFlat: {"en":"The rails end together, but one of these boards is not in the story. Read the order again.","de":"Die Schienen enden gleich, aber eines dieser Bretter kommt in der Geschichte nicht vor. Lies den Auftrag noch einmal.","fr":"Les rails finissent au même endroit, mais une de ces planches n’est pas dans l’histoire. Relis la commande.","es":"Los rieles terminan juntos, pero una de estas tablas no está en el problema. Lee otra vez el pedido.","pt":"Os trilhos terminam juntos, mas uma dessas tábuas não está na história. Leia o pedido de novo.","it":"Le guide finiscono insieme, ma una di queste assi non c’è nel problema. Rileggi l’ordine.","nl":"De rails eindigen gelijk, maar een van deze planken staat niet in het verhaal. Lees de bestelling nog eens.","sv":"Skenorna slutar lika, men en av brädorna finns inte i berättelsen. Läs beställningen igen.","da":"Skinnerne ender samme sted, men et af brædderne er ikke med i historien. Læs bestillingen igen.","no":"Skinnene slutter likt, men en av plankene er ikke med i fortellingen. Les bestillingen igjen.","fi":"Kiskot päättyvät samaan kohtaan, mutta yksi laudoista ei ole tarinassa. Lue tilaus uudestaan."},
    hintRailFlat: {"en":"The rails end together, but this bench is not the story: the top rail holds the longest length in the story.","de":"Die Schienen enden gleich, aber die Werkbank zeigt nicht die Geschichte: Auf die obere Schiene kommt die längste Länge der Geschichte.","fr":"Les rails finissent au même endroit, mais l’établi ne montre pas l’histoire : le rail du haut porte la plus grande longueur de l’histoire.","es":"Los rieles terminan juntos, pero el banco no muestra el problema: en el riel de arriba va la longitud más larga del problema.","pt":"Os trilhos terminam juntos, mas a bancada não mostra a história: no trilho de cima vai o maior comprimento da história.","it":"Le guide finiscono insieme, ma il banco non mostra il problema: sulla guida in alto va la lunghezza più lunga del problema.","nl":"De rails eindigen gelijk, maar de werkbank laat het verhaal niet zien: op de bovenste rail komt de langste lengte uit het verhaal.","sv":"Skenorna slutar lika, men bänken visar inte berättelsen: på den övre skenan ligger den längsta längden i berättelsen.","da":"Skinnerne ender samme sted, men bænken viser ikke historien: På den øverste skinne ligger den længste længde i historien.","no":"Skinnene slutter likt, men benken viser ikke fortellingen: På den øverste skinnen ligger den lengste lengden i fortellingen.","fi":"Kiskot päättyvät samaan kohtaan, mutta penkki ei näytä tarinaa: ylempään kiskoon tulee tarinan pisin pituus."},
    hintCount: {"en":"The mystery board starts at {s} and has to reach {e}. Count up from {s} to {e}.","de":"Das Rätselbrett beginnt bei {s} und muss bis {e} reichen. Zähl von {s} bis {e} weiter.","fr":"La planche mystère commence à {s} et doit aller jusqu’à {e}. Compte de {s} jusqu’à {e}.","es":"La tabla misteriosa empieza en {s} y tiene que llegar hasta {e}. Cuenta de {s} hasta {e}.","pt":"A tábua misteriosa começa no {s} e precisa chegar até o {e}. Conte do {s} até o {e}.","it":"L’asse misteriosa parte da {s} e deve arrivare a {e}. Conta da {s} fino a {e}.","nl":"De geheime plank begint bij {s} en moet tot {e} reiken. Tel door van {s} tot {e}.","sv":"Den hemliga brädan börjar vid {s} och ska räcka till {e}. Räkna från {s} till {e}.","da":"Det hemmelige bræt starter ved {s} og skal nå til {e}. Tæl fra {s} til {e}.","no":"Den hemmelige planken starter ved {s} og må nå til {e}. Tell fra {s} til {e}.","fi":"Salainen lauta alkaa kohdasta {s}, ja sen pitää ulottua kohtaan {e}. Laske luvusta {s} lukuun {e}."},
    hintCountTop: {"en":"The mystery board has to reach the end of the bottom rail. The first piece ends at {s}: count on by the second piece.","de":"Das Rätselbrett muss bis zum Ende der unteren Schiene reichen. Das erste Stück endet bei {s}: Zähl das zweite Stück dazu.","fr":"La planche mystère doit aller jusqu’au bout du rail du bas. Le premier morceau finit à {s} : compte la suite avec le deuxième morceau.","es":"La tabla misteriosa tiene que llegar hasta el final del riel de abajo. El primer pedazo termina en {s}: sigue contando con el segundo pedazo.","pt":"A tábua misteriosa precisa chegar até o fim do trilho de baixo. O primeiro pedaço termina no {s}: continue contando com o segundo pedaço.","it":"L’asse misteriosa deve arrivare fino alla fine della guida in basso. Il primo pezzo finisce a {s}: continua a contare con il secondo pezzo.","nl":"De geheime plank moet tot het eind van de onderste rail reiken. Het eerste stuk eindigt bij {s}: tel het tweede stuk erbij.","sv":"Den hemliga brädan ska räcka till slutet av den nedre skenan. Den första biten slutar vid {s}: räkna vidare med den andra biten.","da":"Det hemmelige bræt skal nå til enden af den nederste skinne. Det første stykke ender ved {s}: Tæl videre med det andet stykke.","no":"Den hemmelige planken må nå til enden av den nederste skinnen. Den første biten slutter ved {s}: Tell videre med den andre biten.","fi":"Salaisen laudan pitää ulottua alemman kiskon päähän asti. Ensimmäinen pala päättyy kohtaan {s}: laske eteenpäin toisen palan verran."},
    hintFixed: {"en":"The boards are now where the story puts them. Type how long the mystery board is.","de":"Jetzt liegen die Bretter so, wie es die Geschichte sagt. Tipp das Rätselbrett noch einmal ein.","fr":"Les planches sont maintenant là où l’histoire les met. Tape de nouveau la planche mystère.","es":"Ahora las tablas están donde dice el problema. Escribe otra vez la tabla misteriosa.","pt":"Agora as tábuas estão onde a história diz. Digite de novo a tábua misteriosa.","it":"Ora le assi sono dove dice il problema. Scrivi di nuovo l’asse misteriosa.","nl":"Nu liggen de planken waar het verhaal ze legt. Typ de geheime plank nog eens.","sv":"Nu ligger brädorna där berättelsen lägger dem. Skriv hur lång den hemliga brädan är.","da":"Nu ligger brædderne, hvor historien lægger dem. Skriv det hemmelige bræt igen.","no":"Nå ligger plankene der fortellingen legger dem. Skriv den hemmelige planken igjen.","fi":"Nyt laudat ovat siellä, minne tarina ne laittaa. Kirjoita salainen lauta uudestaan."},
    setNumbers: {"en":"Numbers","de":"Zahlen","fr":"Nombres","es":"Números","pt":"Números","it":"Numeri","nl":"Getallen","sv":"Tal","da":"Tal","no":"Tall","fi":"Luvut"},
    n80: {"en":"within 80, in fives","de":"bis 80, in Fünferschritten","fr":"jusqu’à 80, de 5 en 5","es":"hasta 80, de 5 en 5","pt":"até 80, de 5 em 5","it":"fino a 80, di 5 in 5","nl":"tot 80, met sprongen van 5","sv":"upp till 80, i femsteg","da":"op til 80, i spring på 5","no":"opp til 80, i femmerhopp","fi":"80:een asti, viiden välein"},
    n100: {"en":"within 100","de":"bis 100","fr":"jusqu’à 100","es":"hasta 100","pt":"até 100","it":"fino a 100","nl":"tot 100","sv":"upp till 100","da":"op til 100","no":"opp til 100","fi":"100:aan asti"},
    setRuler: {"en":"Bench ruler","de":"Lineal an der Werkbank","fr":"Règle de l’établi","es":"Regla del banco","pt":"Régua da bancada","it":"Righello del banco","nl":"Liniaal aan de werkbank","sv":"Bänklinjal","da":"Bænkens lineal","no":"Linjal på benken","fi":"Penkin viivain"},
    rShown: {"en":"shown","de":"sichtbar","fr":"visible","es":"visible","pt":"à mostra","it":"visibile","nl":"zichtbaar","sv":"visas","da":"vises","no":"vises","fi":"näkyvissä"},
    rHidden: {"en":"hidden","de":"versteckt","fr":"cachée","es":"oculta","pt":"escondida","it":"nascosto","nl":"verborgen","sv":"dold","da":"skjult","no":"skjult","fi":"piilossa"},
    aBoard: {"en":"board {n} centimeters","de":"Brett {n} Zentimeter","fr":"planche de {n} centimètres","es":"tabla de {n} centímetros","pt":"tábua de {n} centímetros","it":"asse di {n} centimetri","nl":"plank van {n} centimeter","sv":"bräda {n} centimeter","da":"bræt på {n} centimeter","no":"planke på {n} centimeter","fi":"lauta {n} senttimetriä"},
    aTop: {"en":"top rail","de":"obere Schiene","fr":"rail du haut","es":"riel de arriba","pt":"trilho de cima","it":"guida in alto","nl":"bovenste rail","sv":"övre skenan","da":"øverste skinne","no":"øverste skinne","fi":"ylempi kisko"},
    aBottom: {"en":"bottom rail","de":"untere Schiene","fr":"rail du bas","es":"riel de abajo","pt":"trilho de baixo","it":"guida in basso","nl":"onderste rail","sv":"nedre skenan","da":"nederste skinne","no":"nederste skinne","fi":"alempi kisko"},
    aLevel: {"en":"spirit level: tap to test the bench","de":"Wasserwaage: tippen, um die Werkbank zu prüfen","fr":"niveau à bulle : touche pour tester l’établi","es":"nivel de burbuja: toca para probar el banco","pt":"nível de bolha: toque para testar a bancada","it":"livella: tocca per provare il banco","nl":"waterpas: tik om de werkbank te testen","sv":"vattenpass: tryck för att testa bänken","da":"vaterpas: tryk for at teste bænken","no":"vater: trykk for å teste benken","fi":"vesivaaka: napauta ja testaa penkki"},
    aFlat: {"en":"The level stands straight: the rails end together.","de":"Die Wasserwaage steht gerade: Die Schienen enden gleich.","fr":"Le niveau est droit : les rails finissent au même endroit.","es":"El nivel está derecho: los rieles terminan juntos.","pt":"O nível está reto: os trilhos terminam juntos.","it":"La livella è dritta: le guide finiscono insieme.","nl":"De waterpas staat recht: de rails eindigen gelijk.","sv":"Vattenpasset står rakt: skenorna slutar lika.","da":"Vaterpasset står lige: Skinnerne ender samme sted.","no":"Vateret står rett: Skinnene slutter likt.","fi":"Vesivaaka on suorassa: kiskot päättyvät samaan kohtaan."},
    aLeanTop: {"en":"The level leans: the top rail is longer.","de":"Die Wasserwaage kippt: Die obere Schiene ist länger.","fr":"Le niveau penche : le rail du haut est plus long.","es":"El nivel se inclina: el riel de arriba es más largo.","pt":"O nível inclina: o trilho de cima é mais comprido.","it":"La livella pende: la guida in alto è più lunga.","nl":"De waterpas helt over: de bovenste rail is langer.","sv":"Vattenpasset lutar: den övre skenan är längre.","da":"Vaterpasset hælder: Den øverste skinne er længere.","no":"Vateret heller: Den øverste skinnen er lengre.","fi":"Vesivaaka kallistuu: ylempi kisko on pidempi."},
    aLeanBottom: {"en":"The level leans: the bottom rail is longer.","de":"Die Wasserwaage kippt: Die untere Schiene ist länger.","fr":"Le niveau penche : le rail du bas est plus long.","es":"El nivel se inclina: el riel de abajo es más largo.","pt":"O nível inclina: o trilho de baixo é mais comprido.","it":"La livella pende: la guida in basso è più lunga.","nl":"De waterpas helt over: de onderste rail is langer.","sv":"Vattenpasset lutar: den nedre skenan är längre.","da":"Vaterpasset hælder: Den nederste skinne er længere.","no":"Vateret heller: Den nederste skinnen er lengre.","fi":"Vesivaaka kallistuu: alempi kisko on pidempi."},
    aBack: {"en":"delete","de":"löschen","fr":"effacer","es":"borrar","pt":"apagar","it":"cancella","nl":"wissen","sv":"radera","da":"slet","no":"slett","fi":"poista"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    s_addResult: {"en":"Bram's scarf is {a} cm. Grandma knits {b} cm more. How long is the scarf now?","de":"Brams Schal ist {a} cm lang. Oma strickt {b} cm dazu. Wie lang ist der Schal jetzt?","fr":"L’écharpe de Bram mesure {a} cm. Mamie tricote encore {b} cm. Combien mesure l’écharpe maintenant ?","es":"La bufanda de Bram mide {a} cm. La abuela teje {b} cm más. ¿Cuánto mide la bufanda ahora?","pt":"O cachecol do Bram tem {a} cm. A vovó tricota mais {b} cm. Quanto o cachecol mede agora?","it":"La sciarpa di Bram è lunga {a} cm. La nonna ne lavora altri {b} cm. Quanto è lunga ora la sciarpa?","nl":"Brams sjaal is {a} cm. Oma breit er {b} cm bij. Hoe lang is de sjaal nu?","sv":"Brams halsduk är {a} cm. Mormor stickar {b} cm till. Hur lång är halsduken nu?","da":"Brams halstørklæde er {a} cm. Mormor strikker {b} cm mere. Hvor langt er halstørklædet nu?","no":"Skjerfet til Bram er {a} cm. Bestemor strikker {b} cm til. Hvor langt er skjerfet nå?","fi":"Bramin kaulaliina on {a} cm pitkä. Mummo neuloo siihen {b} cm lisää. Kuinka pitkä kaulaliina on nyt?"},
    ok_addResult: {"en":"{a} + {b} = {c}. The scarf is {c} cm now!","de":"{a} + {b} = {c}. Der Schal ist jetzt {c} cm lang!","fr":"{a} + {b} = {c}. L’écharpe mesure maintenant {c} cm !","es":"{a} + {b} = {c}. ¡La bufanda mide {c} cm ahora!","pt":"{a} + {b} = {c}. O cachecol mede {c} cm agora!","it":"{a} + {b} = {c}. Ora la sciarpa è lunga {c} cm!","nl":"{a} + {b} = {c}. De sjaal is nu {c} cm!","sv":"{a} + {b} = {c}. Halsduken är {c} cm nu!","da":"{a} + {b} = {c}. Halstørklædet er {c} cm nu!","no":"{a} + {b} = {c}. Skjerfet er {c} cm nå!","fi":"{a} + {b} = {c}. Kaulaliina on nyt {c} cm pitkä!"},
    s_addChange: {"en":"Bram has a {a} cm board. He glues on another piece. Now the board is {b} cm. How long was the piece?","de":"Bram hat ein Brett, das {a} cm lang ist. Er leimt ein Stück an. Jetzt ist das Brett {b} cm lang. Wie lang war das Stück?","fr":"Bram a une planche de {a} cm. Il colle un autre morceau au bout. Maintenant, elle mesure {b} cm. Combien mesurait le morceau ?","es":"Bram tiene una tabla de {a} cm. Le pega otro pedazo. Ahora la tabla mide {b} cm. ¿Cuánto medía el pedazo?","pt":"Bram tem uma tábua de {a} cm. Ele cola outro pedaço nela. Agora ela mede {b} cm. Quanto media o pedaço?","it":"Bram ha un’asse di {a} cm. Ci incolla un altro pezzo. Ora è lunga {b} cm. Quanto era lungo il pezzo?","nl":"Bram heeft een plank van {a} cm. Hij lijmt er een stuk aan. Nu is hij {b} cm. Hoe lang was het stuk?","sv":"Bram har en bräda som är {a} cm. Han limmar på en bit till. Nu är brädan {b} cm. Hur lång var biten?","da":"Bram har et bræt på {a} cm. Han limer et stykke mere på. Nu er brættet {b} cm. Hvor langt var stykket?","no":"Bram har en planke på {a} cm. Han limer på en bit til. Nå er planken {b} cm. Hvor lang var biten?","fi":"Bramilla on {a} cm pitkä lauta. Hän liimaa siihen toisen palan. Nyt lauta on {b} cm pitkä. Kuinka pitkä pala oli?"},
    ok_addChange: {"en":"{a} + ? = {b}, so the piece was {c} cm!","de":"{a} + ? = {b}, also war das Stück {c} cm lang!","fr":"{a} + ? = {b}, donc le morceau mesurait {c} cm !","es":"{a} + ? = {b}, ¡así que el pedazo medía {c} cm!","pt":"{a} + ? = {b}, então o pedaço media {c} cm!","it":"{a} + ? = {b}, quindi il pezzo era lungo {c} cm!","nl":"{a} + ? = {b}, dus het stuk was {c} cm!","sv":"{a} + ? = {b}, så biten var {c} cm!","da":"{a} + ? = {b}, så stykket var {c} cm!","no":"{a} + ? = {b}, så biten var {c} cm!","fi":"{a} + ? = {b}, joten pala oli {c} cm pitkä!"},
    s_addStart: {"en":"Bram glued a {a} cm piece onto a stick. Now the stick is {b} cm. How long was the stick at first?","de":"Bram hat {a} cm an einen Stab geleimt. Jetzt ist der Stab {b} cm lang. Wie lang war der Stab am Anfang?","fr":"Bram a collé {a} cm au bout d’un bâton. Maintenant, le bâton mesure {b} cm. Combien mesurait le bâton au début ?","es":"Bram le pegó {a} cm a un palo. Ahora el palo mide {b} cm. ¿Cuánto medía el palo al principio?","pt":"Bram colou {a} cm numa vareta. Agora a vareta mede {b} cm. Quanto a vareta media no começo?","it":"Bram ha incollato {a} cm a un bastoncino. Ora il bastoncino è lungo {b} cm. Quanto era lungo il bastoncino all’inizio?","nl":"Bram heeft {a} cm aan een stok gelijmd. Nu is de stok {b} cm. Hoe lang was de stok eerst?","sv":"Bram limmade {a} cm på en pinne. Nu är pinnen {b} cm. Hur lång var pinnen från början?","da":"Bram limede {a} cm på en pind. Nu er pinden {b} cm. Hvor lang var pinden i starten?","no":"Bram limte {a} cm på en pinne. Nå er pinnen {b} cm. Hvor lang var pinnen først?","fi":"Bram liimasi keppiin {a} cm lisää. Nyt keppi on {b} cm pitkä. Kuinka pitkä keppi oli alussa?"},
    ok_addStart: {"en":"? + {a} = {b}, so the stick was {c} cm at first!","de":"? + {a} = {b}, also war der Stab am Anfang {c} cm lang!","fr":"? + {a} = {b}, donc le bâton mesurait {c} cm au début !","es":"? + {a} = {b}, ¡así que el palo medía {c} cm al principio!","pt":"? + {a} = {b}, então a vareta media {c} cm no começo!","it":"? + {a} = {b}, quindi all’inizio il bastoncino era lungo {c} cm!","nl":"? + {a} = {b}, dus de stok was eerst {c} cm!","sv":"? + {a} = {b}, så pinnen var {c} cm från början!","da":"? + {a} = {b}, så pinden var {c} cm i starten!","no":"? + {a} = {b}, så pinnen var {c} cm først!","fi":"? + {a} = {b}, joten keppi oli alussa {c} cm pitkä!"},
    s_takeResult: {"en":"A board is {a} cm. Bram saws off {b} cm. How long is the board now?","de":"Ein Brett ist {a} cm lang. Bram sägt {b} cm ab. Wie lang ist das Brett jetzt?","fr":"Une planche mesure {a} cm. Bram en scie {b} cm. Combien mesure la planche maintenant ?","es":"Una tabla mide {a} cm. Bram le corta {b} cm. ¿Cuánto mide la tabla ahora?","pt":"Uma tábua mede {a} cm. Bram serra {b} cm dela. Quanto a tábua mede agora?","it":"Un’asse è lunga {a} cm. Bram ne sega via {b} cm. Quanto è lunga ora l’asse?","nl":"Een plank is {a} cm. Bram zaagt er {b} cm af. Hoe lang is de plank nu?","sv":"En bräda är {a} cm. Bram sågar av {b} cm. Hur lång är brädan nu?","da":"Et bræt er {a} cm. Bram saver {b} cm af. Hvor langt er brættet nu?","no":"En planke er {a} cm. Bram sager av {b} cm. Hvor lang er planken nå?","fi":"Lauta on {a} cm pitkä. Bram sahaa siitä {b} cm pois. Kuinka pitkä lauta on nyt?"},
    ok_takeResult: {"en":"{a} − {b} = {c}. The board is {c} cm now!","de":"{a} − {b} = {c}. Das Brett ist jetzt {c} cm lang!","fr":"{a} − {b} = {c}. La planche mesure maintenant {c} cm !","es":"{a} − {b} = {c}. ¡La tabla mide {c} cm ahora!","pt":"{a} − {b} = {c}. A tábua mede {c} cm agora!","it":"{a} − {b} = {c}. Ora l’asse è lunga {c} cm!","nl":"{a} − {b} = {c}. De plank is nu {c} cm!","sv":"{a} − {b} = {c}. Brädan är {c} cm nu!","da":"{a} − {b} = {c}. Brættet er {c} cm nu!","no":"{a} − {b} = {c}. Planken er {c} cm nå!","fi":"{a} − {b} = {c}. Lauta on nyt {c} cm pitkä!"},
    s_takeChange: {"en":"Bram has a {a} cm plank. He saws a bit off. Now the plank is {b} cm. How long was the bit?","de":"Bram hat eine Latte, die {a} cm lang ist. Er sägt ein Stück ab. Jetzt ist sie {b} cm lang. Wie lang war das Stück?","fr":"Bram a une latte de {a} cm. Il en scie un bout. Maintenant, elle mesure {b} cm. Combien mesurait le bout ?","es":"Bram tiene una tira de madera de {a} cm. Le corta un pedazo. Ahora la tira mide {b} cm. ¿Cuánto medía el pedazo?","pt":"Bram tem uma ripa de {a} cm. Ele serra um pedaço. Agora ela mede {b} cm. Quanto media o pedaço?","it":"Bram ha un listello di {a} cm. Ne sega via un pezzetto. Ora il listello è lungo {b} cm. Quanto era lungo il pezzetto?","nl":"Bram heeft een lat van {a} cm. Hij zaagt er een stukje af. Nu is hij {b} cm. Hoe lang was het stukje?","sv":"Bram har en ribba som är {a} cm. Han sågar av en bit. Nu är ribban {b} cm. Hur lång var biten?","da":"Bram har en liste på {a} cm. Han saver et stykke af. Nu er den {b} cm. Hvor langt var stykket?","no":"Bram har en lekt på {a} cm. Han sager av en bit. Nå er lekten {b} cm. Hvor lang var biten?","fi":"Bramilla on {a} cm pitkä rima. Hän sahaa siitä palan pois. Nyt rima on {b} cm pitkä. Kuinka pitkä pala oli?"},
    ok_takeChange: {"en":"{a} − ? = {b}, so the bit was {c} cm!","de":"{a} − ? = {b}, also war das Stück {c} cm lang!","fr":"{a} − ? = {b}, donc le bout mesurait {c} cm !","es":"{a} − ? = {b}, ¡así que el pedazo medía {c} cm!","pt":"{a} − ? = {b}, então o pedaço media {c} cm!","it":"{a} − ? = {b}, quindi il pezzetto era lungo {c} cm!","nl":"{a} − ? = {b}, dus het stukje was {c} cm!","sv":"{a} − ? = {b}, så biten var {c} cm!","da":"{a} − ? = {b}, så stykket var {c} cm!","no":"{a} − ? = {b}, så biten var {c} cm!","fi":"{a} − ? = {b}, joten pala oli {c} cm pitkä!"},
    s_takeStart: {"en":"Bram saws {a} cm off a board. Now it is {b} cm. How long was the board before?","de":"Bram sägt {a} cm von einem Brett ab. Jetzt ist es {b} cm lang. Wie lang war das Brett vorher?","fr":"Bram scie {a} cm d’une planche. Maintenant, elle mesure {b} cm. Combien mesurait la planche avant ?","es":"Bram le corta {a} cm a una tabla. Ahora mide {b} cm. ¿Cuánto medía la tabla antes?","pt":"Bram serra {a} cm de uma tábua. Agora ela mede {b} cm. Quanto a tábua media antes?","it":"Bram sega via {a} cm da un’asse. Ora è lunga {b} cm. Quanto era lunga l’asse prima?","nl":"Bram zaagt {a} cm van een plank af. Nu is hij {b} cm. Hoe lang was de plank eerst?","sv":"Bram sågar av {a} cm från en bräda. Nu är den {b} cm. Hur lång var brädan innan?","da":"Bram saver {a} cm af et bræt. Nu er det {b} cm. Hvor langt var brættet før?","no":"Bram sager {a} cm av en planke. Nå er den {b} cm. Hvor lang var planken før?","fi":"Bram sahaa laudasta {a} cm pois. Nyt lauta on {b} cm pitkä. Kuinka pitkä lauta oli ennen?"},
    ok_takeStart: {"en":"? − {a} = {b}, so the board was {c} cm before!","de":"? − {a} = {b}, also war das Brett vorher {c} cm lang!","fr":"? − {a} = {b}, donc la planche mesurait {c} cm avant !","es":"? − {a} = {b}, ¡así que la tabla medía {c} cm antes!","pt":"? − {a} = {b}, então a tábua media {c} cm antes!","it":"? − {a} = {b}, quindi prima l’asse era lunga {c} cm!","nl":"? − {a} = {b}, dus de plank was eerst {c} cm!","sv":"? − {a} = {b}, så brädan var {c} cm innan!","da":"? − {a} = {b}, så brættet var {c} cm før!","no":"? − {a} = {b}, så planken var {c} cm før!","fi":"? − {a} = {b}, joten lauta oli ennen {c} cm pitkä!"},
    s_apartPart: {"en":"Bram cuts a {a} cm board into two pieces. One piece is {b} cm. How long is the other piece?","de":"Bram sägt ein Brett, das {a} cm lang ist, in zwei Stücke. Ein Stück ist {b} cm lang. Wie lang ist das andere Stück?","fr":"Bram scie une planche de {a} cm en deux morceaux. Un morceau mesure {b} cm. Combien mesure l’autre morceau ?","es":"Bram corta una tabla de {a} cm en dos pedazos. Un pedazo mide {b} cm. ¿Cuánto mide el otro pedazo?","pt":"Bram serra uma tábua de {a} cm em dois pedaços. Um pedaço mede {b} cm. Quanto mede o outro pedaço?","it":"Bram sega un’asse di {a} cm in due pezzi. Un pezzo è lungo {b} cm. Quanto è lungo l’altro pezzo?","nl":"Bram zaagt een plank van {a} cm in twee stukken. Eén stuk is {b} cm. Hoe lang is het andere stuk?","sv":"Bram sågar en bräda som är {a} cm i två bitar. En bit är {b} cm. Hur lång är den andra biten?","da":"Bram saver et bræt på {a} cm i to stykker. Det ene stykke er {b} cm. Hvor langt er det andet stykke?","no":"Bram sager en planke på {a} cm i to biter. Den ene biten er {b} cm. Hvor lang er den andre biten?","fi":"Bram sahaa {a} cm pitkän laudan kahdeksi palaksi. Yksi pala on {b} cm pitkä. Kuinka pitkä on toinen pala?"},
    ok_apartPart: {"en":"{a} − {b} = {c}. The other piece is {c} cm!","de":"{a} − {b} = {c}. Das andere Stück ist {c} cm lang!","fr":"{a} − {b} = {c}. L’autre morceau mesure {c} cm !","es":"{a} − {b} = {c}. ¡El otro pedazo mide {c} cm!","pt":"{a} − {b} = {c}. O outro pedaço mede {c} cm!","it":"{a} − {b} = {c}. L’altro pezzo è lungo {c} cm!","nl":"{a} − {b} = {c}. Het andere stuk is {c} cm!","sv":"{a} − {b} = {c}. Den andra biten är {c} cm!","da":"{a} − {b} = {c}. Det andet stykke er {c} cm!","no":"{a} − {b} = {c}. Den andre biten er {c} cm!","fi":"{a} − {b} = {c}. Toinen pala on {c} cm pitkä!"},
    s_cmpDiff: {"en":"Bram's shelf is {a} cm long. His board is {b} cm long. How much longer is the shelf than the board?","de":"Brams Regal ist {a} cm lang. Sein Brett ist {b} cm lang. Wie viel länger ist das Regal als das Brett?","fr":"L’étagère de Bram mesure {a} cm de long. Sa planche mesure {b} cm de long. De combien l’étagère est-elle plus longue que la planche ?","es":"La repisa de Bram mide {a} cm de largo. Su tabla mide {b} cm de largo. ¿Cuánto más larga es la repisa que la tabla?","pt":"A prateleira do Bram tem {a} cm de comprimento. A tábua dele tem {b} cm de comprimento. Quantos centímetros a prateleira é mais comprida que a tábua?","it":"La mensola di Bram è lunga {a} cm. La sua asse è lunga {b} cm. Di quanto la mensola è più lunga dell’asse?","nl":"Brams wandplank is {a} cm lang. Zijn plank is {b} cm lang. Hoeveel langer is de wandplank dan de plank?","sv":"Brams hylla är {a} cm lång. Hans bräda är {b} cm lång. Hur mycket längre är hyllan än brädan?","da":"Brams hylde er {a} cm lang. Hans bræt er {b} cm langt. Hvor meget længere er hylden end brættet?","no":"Hylla til Bram er {a} cm lang. Planken hans er {b} cm lang. Hvor mye lengre er hylla enn planken?","fi":"Bramin hylly on {a} cm pitkä. Hänen lautansa on {b} cm pitkä. Kuinka paljon pidempi hylly on kuin lauta?"},
    ok_cmpDiff: {"en":"{a} − {b} = {c}. The shelf is {c} cm longer!","de":"{a} − {b} = {c}. Das Regal ist {c} cm länger!","fr":"{a} − {b} = {c}. L’étagère est plus longue de {c} cm !","es":"{a} − {b} = {c}. ¡La repisa es {c} cm más larga!","pt":"{a} − {b} = {c}. A prateleira é {c} cm mais comprida!","it":"{a} − {b} = {c}. La mensola è più lunga di {c} cm!","nl":"{a} − {b} = {c}. De wandplank is {c} cm langer!","sv":"{a} − {b} = {c}. Hyllan är {c} cm längre!","da":"{a} − {b} = {c}. Hylden er {c} cm længere!","no":"{a} − {b} = {c}. Hylla er {c} cm lengre!","fi":"{a} − {b} = {c}. Hylly on {c} cm pidempi!"},
    s_cmpBigger: {"en":"Bram's board is {a} cm long. His shelf is {b} cm longer than the board. How long is the shelf?","de":"Brams Brett ist {a} cm lang. Sein Regal ist {b} cm länger als das Brett. Wie lang ist das Regal?","fr":"La planche de Bram mesure {a} cm de long. Son étagère est plus longue de {b} cm que la planche. Combien mesure l’étagère ?","es":"La tabla de Bram mide {a} cm de largo. Su repisa es {b} cm más larga que la tabla. ¿Cuánto mide la repisa?","pt":"A tábua do Bram tem {a} cm de comprimento. A prateleira dele é {b} cm mais comprida que a tábua. Quanto mede a prateleira?","it":"L’asse di Bram è lunga {a} cm. La sua mensola è {b} cm più lunga dell’asse. Quanto è lunga la mensola?","nl":"Brams plank is {a} cm lang. Zijn wandplank is {b} cm langer dan de plank. Hoe lang is de wandplank?","sv":"Brams bräda är {a} cm lång. Hans hylla är {b} cm längre än brädan. Hur lång är hyllan?","da":"Brams bræt er {a} cm langt. Hans hylde er {b} cm længere end brættet. Hvor lang er hylden?","no":"Planken til Bram er {a} cm lang. Hylla hans er {b} cm lengre enn planken. Hvor lang er hylla?","fi":"Bramin lauta on {a} cm pitkä. Hänen hyllynsä on {b} cm pidempi kuin lauta. Kuinka pitkä hylly on?"},
    ok_cmpBigger: {"en":"{a} + {b} = {c}. The shelf is {c} cm long!","de":"{a} + {b} = {c}. Das Regal ist {c} cm lang!","fr":"{a} + {b} = {c}. L’étagère mesure {c} cm !","es":"{a} + {b} = {c}. ¡La repisa mide {c} cm!","pt":"{a} + {b} = {c}. A prateleira mede {c} cm!","it":"{a} + {b} = {c}. La mensola è lunga {c} cm!","nl":"{a} + {b} = {c}. De wandplank is {c} cm lang!","sv":"{a} + {b} = {c}. Hyllan är {c} cm lång!","da":"{a} + {b} = {c}. Hylden er {c} cm lang!","no":"{a} + {b} = {c}. Hylla er {c} cm lang!","fi":"{a} + {b} = {c}. Hylly on {c} cm pitkä!"},
    s_cmpSmaller: {"en":"Bram's board is {a} cm. It is {b} cm longer than his plank. How long is the plank?","de":"Brams Brett ist {a} cm lang. Es ist {b} cm länger als seine Latte. Wie lang ist die Latte?","fr":"La planche de Bram mesure {a} cm. Elle est plus longue de {b} cm que sa latte. Combien mesure la latte ?","es":"La tabla de Bram mide {a} cm. Es {b} cm más larga que su tira de madera. ¿Cuánto mide la tira?","pt":"A tábua do Bram mede {a} cm. Ela é {b} cm mais comprida que a ripa dele. Quanto mede a ripa?","it":"L’asse di Bram è lunga {a} cm. È {b} cm più lunga del suo listello. Quanto è lungo il listello?","nl":"Brams plank is {a} cm. Hij is {b} cm langer dan zijn lat. Hoe lang is de lat?","sv":"Brams bräda är {a} cm. Den är {b} cm längre än hans ribba. Hur lång är ribban?","da":"Brams bræt er {a} cm. Det er {b} cm længere end hans liste. Hvor lang er listen?","no":"Planken til Bram er {a} cm. Den er {b} cm lengre enn lekten hans. Hvor lang er lekten?","fi":"Bramin lauta on {a} cm pitkä. Se on {b} cm pidempi kuin hänen rimansa. Kuinka pitkä rima on?"},
    ok_cmpSmaller: {"en":"{a} − {b} = {c}. The plank is {c} cm long!","de":"{a} − {b} = {c}. Die Latte ist {c} cm lang!","fr":"{a} − {b} = {c}. La latte mesure {c} cm !","es":"{a} − {b} = {c}. ¡La tira mide {c} cm!","pt":"{a} − {b} = {c}. A ripa mede {c} cm!","it":"{a} − {b} = {c}. Il listello è lungo {c} cm!","nl":"{a} − {b} = {c}. De lat is {c} cm lang!","sv":"{a} − {b} = {c}. Ribban är {c} cm lång!","da":"{a} − {b} = {c}. Listen er {c} cm lang!","no":"{a} − {b} = {c}. Lekten er {c} cm lang!","fi":"{a} − {b} = {c}. Rima on {c} cm pitkä!"},
    s_together: {"en":"Bram glues a {a} cm board and a {b} cm board end to end. How long is the new board?","de":"Bram leimt ein Brett, das {a} cm lang ist, und eins, das {b} cm lang ist, aneinander. Wie lang ist das neue Brett?","fr":"Bram colle bout à bout une planche de {a} cm et une planche de {b} cm. Combien mesure la nouvelle planche ?","es":"Bram pega por las puntas una tabla de {a} cm y otra de {b} cm. ¿Cuánto mide la tabla nueva?","pt":"Bram cola, ponta com ponta, uma tábua de {a} cm e outra de {b} cm. Quanto mede a tábua nova?","it":"Bram incolla un’asse di {a} cm e una di {b} cm, una dopo l’altra. Quanto è lunga la nuova asse?","nl":"Bram lijmt een plank van {a} cm en een plank van {b} cm tegen elkaar. Hoe lang is de nieuwe plank?","sv":"Bram limmar ihop en bräda på {a} cm och en bräda på {b} cm, ände mot ände. Hur lång är den nya brädan?","da":"Bram limer et bræt på {a} cm og et bræt på {b} cm sammen, ende mod ende. Hvor langt er det nye bræt?","no":"Bram limer sammen en planke på {a} cm og en planke på {b} cm, ende mot ende. Hvor lang er den nye planken?","fi":"Bram liimaa {a} cm pitkän laudan ja {b} cm pitkän laudan päät yhteen. Kuinka pitkä uusi lauta on?"},
    ok_together: {"en":"{a} + {b} = {c}. The new board is {c} cm long!","de":"{a} + {b} = {c}. Das neue Brett ist {c} cm lang!","fr":"{a} + {b} = {c}. La nouvelle planche mesure {c} cm !","es":"{a} + {b} = {c}. ¡La tabla nueva mide {c} cm!","pt":"{a} + {b} = {c}. A tábua nova mede {c} cm!","it":"{a} + {b} = {c}. La nuova asse è lunga {c} cm!","nl":"{a} + {b} = {c}. De nieuwe plank is {c} cm lang!","sv":"{a} + {b} = {c}. Den nya brädan är {c} cm lång!","da":"{a} + {b} = {c}. Det nye bræt er {c} cm langt!","no":"{a} + {b} = {c}. Den nye planken er {c} cm lang!","fi":"{a} + {b} = {c}. Uusi lauta on {c} cm pitkä!"}
  },/*STRINGS-END*/
  defaults: { numbers: '80', ruler: 'shown' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: '80', labelKey: 'n80' }, { value: '100', labelKey: 'n100' }] },
    { key: 'ruler', type: 'choice', labelKey: 'setRuler', options: [{ value: 'shown', labelKey: 'rShown' }, { value: 'hidden', labelKey: 'rHidden' }] }
  ],
  OK_MS: 500, FAST: false,
  THEMES: ['clothing', 'tools', 'furniture'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._themes = {}; this._picsReady = false; this._drag = null; this._skipClick = 0; this._sel = null;
    injectSpiritBenchCSS();
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
  _level: function () { return SpiritBenchCore.levelOf(this._setting('numbers')); },
  _rulerShown: function () { return this._setting('ruler') !== 'hidden'; },
  _key: function () { return this._level(); },
  _loc: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = SpiritBenchCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SpiritBenchCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'spirit-bench.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t('taskLine'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag(); this._sel = null;
    this.st = SpiritBenchCore.newState(this._level(), k);
    this._view = { note: '', soft: false, win: false, shake: null };
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sb-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="sb-ticket" data-qa="ticket"></div><div class="sb-board" data-qa="board"></div><p class="sb-note" data-qa="note" aria-live="polite"></p><div class="sb-pad"></div>';
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
  /* the bench geometry: one cm = ppc px on the rails, the rack and the ruler */
  _geometry: function (W) {
    var r = this.st.round, wide = W >= 560, cramp = W < 310;
    var pad = 4, stop = wide ? 12 : 8, levelZone = wide ? 58 : 52;
    var railH = 44, gap = wide ? 10 : 7, rulerH = this._rulerShown() ? (wide ? 30 : 24) : 12, boardH = wide ? 30 : cramp ? 24 : 26, rowGap = wide ? 7 : cramp ? 3 : 5;
    var x0 = pad + stop, ppc = (W - x0 - levelZone - pad) / r.max;
    var g = { W: W, wide: wide, cramp: cramp, x0: x0, ppc: ppc, pad: pad, stop: stop, levelZone: levelZone, railH: railH, boardH: boardH };
    var y = 4;
    g.topY = y; y += railH + gap;
    g.botY = y; y += railH + 4;
    g.rulerY = y; y += rulerH + gap;
    /* the rack lists only the boards still on it (it shrinks as the bench fills); every board is a 44-px touch target, its wood drawn at scale inside */
    /* boards still on the rack are packed into rows, side by side where they fit (the rack is storage; the bench is where lengths compare) */
    var st = this.st, room = x0 + r.max * ppc - x0, place = {}, row = 0, used = 0, gapX = 10;
    r.rack.forEach(function (len, i) { if (SpiritBenchCore.where(st, i) !== 'rack') return; var bw = len * ppc, w = Math.max(44, bw + (bw < 34 ? 30 : 0)); if (used > 0 && used + gapX + w > room) { row++; used = 0; } place[i] = { row: row, x: x0 + (used ? used + gapX : 0) }; used += (used ? gapX : 0) + w; });
    var rows = Object.keys(place).length ? row + 1 : 1;
    g.hit = 44; g.rackY = y; g.rowGap = rowGap; g.rows = rows; g.place = place; y += rows * g.hit + (rows - 1) * rowGap;
    g.H = y + 4;
    g.x = function (cm) { return x0 + cm * ppc; };
    g.benchEnd = x0 + r.max * ppc;
    return g;
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width();
    var g = this._g = this._geometry(W);
    this._wrap.className = 'sb-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    this._paintTicket();
    this._paintBench();
    this._paintPad();
    var note = this._qs('.sb-note');
    if (v.note) { note.textContent = v.note; note.className = 'sb-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'sb-note'; }
    this._setPrompt();
  },
  _paintTicket: function () {
    var st = this.st, r = st.round, el = this._qs('.sb-ticket'), th = this._themes[r.pic[0]];
    el.innerHTML = '';
    if (th && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(th, r.pic[1], this._loc(), { size: this._g.wide ? 96 : 64 }); im.className = 'sb-tpic sb-art'; im.alt = ''; el.appendChild(im); }
    var p = document.createElement('p'); p.className = 'sb-story'; p.setAttribute('data-qa', 'story'); p.textContent = this._t(SpiritBenchCore.storyKey(r), { a: r.a, b: r.b }); el.appendChild(p);
    if (st.done) { var s = document.createElement('span'); s.className = 'sb-stamp'; s.setAttribute('data-stamp', '1'); s.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'; el.appendChild(s); }
  },
  _wood: function (x, y, w, h, n, cls, extra) {
    var o = '<g class="sb-woodg ' + (cls || '') + '"' + (extra || '') + '><rect class="sb-woodr" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + Math.max(2, w).toFixed(1) + '" height="' + h + '" rx="3"/>';
    for (var i = 1; i < 3; i++) o += '<path class="sb-grain" d="M' + (x + 4).toFixed(1) + ' ' + (y + h * i / 3).toFixed(1) + 'H' + (x + Math.max(2, w) - 4).toFixed(1) + '"/>';
    var inside = w >= 34, tx = inside ? x + 5 : x + w + 4;
    if (n != null) o += '<text class="sb-wnum' + (inside ? '' : ' is-out') + '" x="' + tx.toFixed(1) + '" y="' + (y + h / 2 + 6).toFixed(1) + '">' + n + '</text>';
    return o + '</g>';
  },
  _paintBench: function () {
    var st = this.st, r = st.round, v = this._view, g = this._g, C = SpiritBenchCore, self = this, X = g.x;
    var board = this._qs('.sb-board'); board.innerHTML = ''; board.style.width = g.W + 'px'; board.style.height = g.H + 'px';
    var o = '', ov = '', vk = st.verdict && st.verdict.kind, cut = st.verdict ? st.verdict.typed : st.done ? r.answer : null;
    var m = C.mystery(st), R = C.rails(st, cut);
    /* the bench top, the stop block and the saw slot */
    o += '<rect class="sb-top" x="' + g.pad + '" y="' + (g.topY - 2) + '" width="' + (g.W - 2 * g.pad) + '" height="' + (g.rulerY - g.topY + 2) + '" rx="8"/>';
    o += '<rect class="sb-stop" x="' + g.pad + '" y="' + (g.topY - 2) + '" width="' + g.stop + '" height="' + (g.botY + g.railH - g.topY + 4) + '" rx="3"/>';
    [g.topY, g.botY].forEach(function (y) { o += '<rect class="sb-rail" x="' + g.x0 + '" y="' + y + '" width="' + (g.benchEnd - g.x0) + '" height="' + g.railH + '" rx="4"/>'; });
    /* the bench ruler */
    var rs = this._rulerShown(), ry = g.rulerY;
    o += '<path class="sb-rline" d="M' + g.x0 + ' ' + ry + 'H' + g.benchEnd + '"/>';
    var helpSpan = st.help && vk === 'number' ? C.spanOf(st) : null, near = function (c) { return helpSpan && (Math.abs(c - helpSpan.s) * g.ppc < 22 || (r.mystery !== 'top' && Math.abs(c - helpSpan.e) * g.ppc < 22)); };
    for (var c = 0; c <= r.max; c += 5) { var tl = c % 10 === 0 ? 10 : 6; o += '<path class="sb-tick" d="M' + X(c).toFixed(1) + ' ' + ry + 'v' + tl + '"/>'; if (rs && c % 10 === 0 && (g.wide || c % 20 === 0 || c === r.max) && !near(c)) o += '<text class="sb-rnum" x="' + X(c).toFixed(1) + '" y="' + (ry + (g.wide ? 26 : 21)) + '" text-anchor="middle">' + c + '</text>'; }
    if (rs) o += '<text class="sb-runit" x="' + (g.benchEnd + (g.wide ? 16 : 13)).toFixed(1) + '" y="' + (ry + (g.wide ? 26 : 21)) + '">cm</text>';
    /* the mystery place: a dashed "?" (sized once the two known boards say how much room is left) */
    if (m && !st.done && !vk) {
      var bsum = 0; st.bottom.forEach(function (i) { bsum += r.rack[i]; });
      var topV = st.top === null ? null : r.rack[st.top], mx, mw, my = m === 'top' ? g.topY : g.botY;
      if (m === 'top') { mx = g.x0; mw = bsum * g.ppc; } else if (topV > bsum) { mx = X(bsum); mw = (topV - bsum) * g.ppc; } else { mx = X(bsum); mw = 60; }
      var sized = m === 'top' || topV > bsum;
      mw = Math.min(mw, g.benchEnd - mx); if (mw < 30) mw = 30;
      o += '<rect class="sb-myst' + (sized ? '' : ' is-neutral') + '" data-mystery="' + m + '" x="' + mx.toFixed(1) + '" y="' + (my + 3) + '" width="' + mw.toFixed(1) + '" height="' + (g.railH - 6) + '" rx="4"/>';
      o += '<text class="sb-mnum" x="' + (mx + Math.max(15, Math.min(mw, 80) / 2)).toFixed(1) + '" y="' + (my + g.railH / 2 + 7) + '" text-anchor="middle">' + (st.typed == null ? '?' : st.typed) + '</text>';
    }
    /* the cut board, exactly as long as the typed number, in the mystery place */
    if (cut != null && m) {
      var cbs = 0; st.bottom.forEach(function (i) { cbs += r.rack[i]; });
      var cx = m === 'top' ? g.x0 : X(cbs), cy = (m === 'top' ? g.topY : g.botY) + (g.railH - g.boardH) / 2, cw = Math.min(cut * g.ppc, g.W - g.pad - cx);
      o += this._wood(cx, cy, cw, g.boardH, cut, 'is-cut', ' data-cut="' + cut + '"');
      if (!this.FAST && !v.win && st.verdict) o += '<circle class="sb-dust" cx="' + (g.x0 + 2) + '" cy="' + (cy + g.boardH / 2) + '" r="10"/>';
    }
    /* the gap or the overhang between the two rail ends */
    if (vk) {
      var tE = X(R.top), bE = X(R.bottom);
      if (R.top !== R.bottom) { var lo = Math.min(tE, bE), hi = Math.max(tE, bE), w = Math.max(10, hi - lo), longY = R.top > R.bottom ? g.topY : g.botY;
        ov += '<rect class="sb-gap" data-gap="' + Math.abs(R.top - R.bottom) + '" x="' + Math.min(lo, g.W - g.pad - w).toFixed(1) + '" y="' + g.botY + '" width="' + w.toFixed(1) + '" height="' + g.railH + '" rx="3"/>'; }
      if (vk === 'wrongRail') ov += '<rect class="sb-railflash" x="' + g.x0 + '" y="' + g.topY + '" width="' + (g.benchEnd - g.x0) + '" height="' + g.railH + '" rx="4"/>';
      if (st.help && vk === 'number') {
        var sp = C.spanOf(st);
        [[R.top, '#F2784B'], [R.bottom, '#2E9C88']].forEach(function (q) { ov += '<path class="sb-endtick" stroke="' + q[1] + '" d="M' + X(Math.min(q[0], r.max)).toFixed(1) + ' ' + (ry - 4) + 'v18"/>'; });
        /* when the mystery is the whole its end IS the answer: mark only where the first piece ends */
        (r.mystery === 'top' ? [sp.s] : [sp.s, sp.e]).forEach(function (cm) { ov += '<path class="sb-span" data-span="' + cm + '" d="M' + X(cm).toFixed(1) + ' ' + (ry - 2) + 'v14"/>'; if (rs) ov += '<text class="sb-rnum is-bold" x="' + X(cm).toFixed(1) + '" y="' + (ry + (g.wide ? 26 : 21)) + '" text-anchor="middle">' + cm + '</text>'; });
      }
    }
    /* the spirit level against the two rail ends (after a test, a Check or at the end) */
    if (st.testing || vk || st.done) {
      var Rl = st.testing && !vk && !st.done ? C.rails(st, null) : R, t = Rl.bottom - Rl.top, lx = Math.min(X(Math.max(Rl.top, Rl.bottom)) + 5, g.W - g.pad - 18), ly0 = g.topY - 2, ly1 = g.botY + g.railH + 2;
      var ang = t === 0 ? 0 : t > 0 ? 6 : -6, bub = t === 0 ? 0 : (t > 0 ? -1 : 1) * 9;
      ov += '<g class="sb-level" data-level="' + (t === 0 ? 'flat' : t > 0 ? 'bottom' : 'top') + '" transform="rotate(' + ang + ' ' + (lx + 7) + ' ' + ly1 + ')"><rect class="sb-lbar" x="' + lx + '" y="' + ly0 + '" width="14" height="' + (ly1 - ly0) + '" rx="3"/>'
        + '<rect class="sb-vial" x="' + (lx - 7) + '" y="' + (ly0 + 4) + '" width="28" height="12" rx="6"/><path class="sb-vline" d="M' + (lx + 3) + ' ' + (ly0 + 4) + 'v12M' + (lx + 11) + ' ' + (ly0 + 4) + 'v12"/>'
        + '<circle class="sb-bubble' + (t === 0 ? ' is-mid' : '') + '" cx="' + (lx + 7 + bub) + '" cy="' + (ly0 + 10) + '" r="4.5"/></g>';
    }
    board.insertAdjacentHTML('beforeend', '<svg class="sb-art sb-svg" width="' + g.W + '" height="' + g.H + '" viewBox="0 0 ' + g.W + ' ' + g.H + '" aria-hidden="true">' + o + '</svg>');
    /* the two rails take a board (tap a board, then a rail; or drag it there) */
    [['top', g.topY], ['bottom', g.botY]].forEach(function (q) {
      var z = self._btn('sb-railhit' + (self._sel !== null ? ' is-target' : ''), 'rail-' + q[0], self._t(q[0] === 'top' ? 'aTop' : 'aBottom'));
      z.style.cssText = 'left:' + g.x0 + 'px;top:' + q[1] + 'px;width:' + (g.benchEnd - g.x0) + 'px;height:' + g.railH + 'px;';
      z.disabled = st.done;
      z.addEventListener('click', function () { self._tapRail(q[0]); });
      board.appendChild(z);
    });
    /* the three boards: on the rack, or on a rail */
    var bsum2 = 0;
    r.rack.forEach(function (len, i) {
      var w = C.where(st, i), x, y;
      if (w === 'top') { x = g.x0; y = g.topY + (g.railH - g.hit) / 2; }
      else if (w === 'bottom') { var before = 0; for (var j = 0; j < st.bottom.indexOf(i); j++) before += r.rack[st.bottom[j]]; x = X(before); y = g.botY + (g.railH - g.hit) / 2; }
      else { var pl = g.place[i]; x = pl.x; y = g.rackY + pl.row * (g.hit + g.rowGap); }
      var bw = len * g.ppc, b = self._btn('sb-board-btn sb-art' + (self._sel === i ? ' is-sel' : '') + (v.shake === i ? ' is-shake' : '') + ' is-' + w, 'board-' + i, self._t('aBoard', { n: len }));
      b.setAttribute('data-len', String(len)); b.setAttribute('data-where', w); b.disabled = st.done;
      b.style.cssText = 'left:' + x.toFixed(1) + 'px;top:' + y.toFixed(1) + 'px;width:' + Math.max(44, bw + (bw < 34 ? 30 : 0)).toFixed(1) + 'px;height:' + g.hit + 'px;';
      b.innerHTML = '<svg width="' + Math.max(44, bw + (bw < 34 ? 30 : 0)).toFixed(1) + '" height="' + g.hit + '" aria-hidden="true">' + self._wood(0, (g.hit - g.boardH) / 2, bw, g.boardH, len, '') + '</svg>';
      b.addEventListener('pointerdown', function (e) { if (e.button || st.done) return; e.preventDefault(); self._dragBoard(e, i); });
      /* a pointer tap already acted on pointerup: skip the click that follows it on the SAME board (keyboard Enter / synthetic clicks still act) */
      b.addEventListener('click', function () { if (self._skipFor === i && Date.now() - self._skipClick < 400) return; self._select(i); });
      board.appendChild(b);
    });
    /* the level, parked at the right end: tap it to test the bench as it is now */
    var lv = this._btn('sb-levelbtn sb-art', 'level', this._t('aLevel'), '<svg viewBox="0 0 24 60" aria-hidden="true"><rect x="7" y="2" width="10" height="56" rx="3" fill="#C9A23A" stroke="#2F2A3B" stroke-width="2"/><rect x="2" y="6" width="20" height="9" rx="4.5" fill="#DDF3E9" stroke="#2F2A3B" stroke-width="1.6"/><circle cx="12" cy="10.5" r="3" fill="#3FAE6A"/></svg>');
    lv.style.cssText = 'left:' + (g.W - g.pad - g.levelZone + 6) + 'px;top:' + (g.rackY + 2) + 'px;width:' + (g.levelZone - 8) + 'px;height:' + Math.max(44, g.rows * g.hit + (g.rows - 1) * g.rowGap - 4) + 'px;';
    lv.disabled = st.done;
    lv.addEventListener('click', function () { self._test(); });
    board.appendChild(lv);
    /* what Check or a test shows lies OVER the boards: the gap, the help marks, the level */
    if (ov) board.insertAdjacentHTML('beforeend', '<svg class="sb-art sb-svg sb-over" width="' + g.W + '" height="' + g.H + '" viewBox="0 0 ' + g.W + ' ' + g.H + '" aria-hidden="true">' + ov + '</svg>');
  },

  /* ---------- the keypad: digits, delete, Check (the mystery board is typed once the bench is built) ---------- */
  _paintPad: function () {
    var st = this.st, self = this, el = this._qs('.sb-pad'), ready = SpiritBenchCore.mystery(st) !== null; el.innerHTML = '';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].forEach(function (d) {
      var b = self._btn('sb-key', 'key-' + d, d, d); b.disabled = st.done || !ready;
      b.addEventListener('click', function () { self._type(d); }); el.appendChild(b);
    });
    var bk = this._btn('sb-key sb-back', 'back', this._t('aBack'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11v12H9l-6-6z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 9.5l5 5M17 9.5l-5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>');
    bk.disabled = st.done || st.typed == null; bk.addEventListener('click', function () { self._back(); }); el.appendChild(bk);
    var c = this._btn('sb-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    c.disabled = st.done; c.addEventListener('click', function () { self._check(); }); el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _after: function () { this._view.note = ''; this._view.shake = null; this._paint(); },
  _put: function (i, rail) {
    var x = SpiritBenchCore.put(this.st, i, rail);
    if (!x.ok) { if (x.full) { this._view.note = this._t('hintFull'); this._view.soft = true; this._view.shake = i; this.api.sound(200); this._paint(); } return false; }
    this._sel = null; this.api.sound(rail === 'rack' ? 260 : 150); this._after(); return true;
  },
  /* tap a board: on the rack it is picked up (tap a rail next); on a rail it goes back to the rack */
  _select: function (i) {
    var w = SpiritBenchCore.where(this.st, i);
    if (w !== 'rack') return this._put(i, 'rack');
    this._sel = this._sel === i ? null : i; this.api.sound(330); this._paint(); return true;
  },
  _tapRail: function (rail) { if (this._sel === null) { this._view.note = this._t('hintPick'); this._view.soft = true; this._paint(); return false; } return this._put(this._sel, rail); },
  _type: function (d) { if (!SpiritBenchCore.typeDigit(this.st, d)) return false; this.api.sound(440); this._after(); return true; },
  _back: function () { if (!SpiritBenchCore.backspace(this.st)) return false; this._after(); return true; },
  _test: function () {
    var st = this.st; if (st.done) return false;
    if (st.verdict) { st.verdict = null; }
    st.testing = true; var t = SpiritBenchCore.tilt(st, null);
    this._view.note = ''; this.api.sound(t === 0 ? 880 : 300); this._paint();
    this.api.announce(this._t(t === 0 ? 'aFlat' : t > 0 ? 'aLeanBottom' : 'aLeanTop'));
    return true;
  },
  _dragBoard: function (e, i) {
    var self = this, sx = e.clientX, sy = e.clientY, moved = false, el = e.currentTarget;
    this._endDrag();
    var mv = function (ev) { var dx = ev.clientX - sx, dy = ev.clientY - sy; if (!moved && Math.abs(dx) + Math.abs(dy) < 8) return; moved = true; ev.preventDefault(); el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; el.classList.add('is-drag'); };
    var up = function (ev) {
      self._endDrag(); self._skipClick = Date.now(); self._skipFor = i;
      if (!moved) { self._select(i); return; }
      var b = self._qs('.sb-board').getBoundingClientRect(), g = self._g, y = ev.clientY - b.top;
      var rail = y >= g.topY - 8 && y < g.topY + g.railH + 4 ? 'top' : y >= g.botY - 4 && y < g.botY + g.railH + 8 ? 'bottom' : 'rack';
      if (!self._put(i, rail)) self._paint();
    };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  _keyboard: function (e) {
    var k = e.key, dk = (e.target.getAttribute && e.target.getAttribute('data-k')) || '';
    if (/^[0-9]$/.test(k)) { e.preventDefault(); this._type(k); }
    else if (k === 'Backspace') { e.preventDefault(); this._back(); }
    else if (k === 'Enter' && (e.target === this._wrap || /^key-|^back$/.test(dk))) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = SpiritBenchCore; if (st.done) return;
    var r = C.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') { v.note = this._t(r.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (r.result === 'ok') { this._success(); return; }
    var key = C.hint(st), args = {};
    if (key === 'hintCount' || key === 'hintCountTop') { var sp = C.spanOf(st); args = { s: sp.s, e: sp.e }; }
    if (key === 'hintFixed') { C.fixModel(st); st.verdict = null; this._sel = null; }
    v.soft = false; v.note = this._t(key, args); v.shake = r.kind === 'decoy' ? st.round.rack.indexOf(st.round.decoy) : null;
    this._paint();
    this.api.announce(v.note);
    this.api.sound(240);
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = SpiritBenchCore;
    var msg = this._t(C.okKey(r), { a: r.a, b: r.b, c: r.answer });
    v.note = ''; v.win = true; this._sel = null;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg + ' ' + this._t('aFlat'));
    this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectSpiritBenchCSS() {
  if (typeof document === 'undefined' || document.getElementById('sb-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sb-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .sb-wrap:focus{outline:none;}'
  + '.sb-ticket{position:relative;display:flex;align-items:center;gap:12px;width:100%;box-sizing:border-box;padding:10px 14px;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #E6D9BF;}'
  + '.sb-tpic{flex:none;width:96px;height:96px;object-fit:contain;} .sb-wrap.is-narrow .sb-tpic{width:64px;height:64px;} .sb-wrap.is-cramp .sb-tpic{display:none;}'
  + '.sb-story{margin:0;flex:1;font-family:' + B + ';font-weight:700;font-size:18px;line-height:1.35;color:' + INK + ';} .sb-wrap.is-narrow .sb-story{font-size:15px;line-height:1.3;} .sb-wrap.is-cramp .sb-story{font-size:14px;}'
  + '.sb-stamp{position:absolute;right:8px;top:6px;width:34px;height:34px;border-radius:50%;background:#2E9C88;color:#fff;display:flex;align-items:center;justify-content:center;transform:rotate(-12deg);} .sb-stamp svg{width:22px;height:22px;}'
  + '.sb-board{position:relative;flex:none;touch-action:none;}'
  + '.sb-svg{position:absolute;left:0;top:0;pointer-events:none;} .sb-over{z-index:4;}'
  + '.sb-top{fill:#F3E3C3;stroke:#B08550;stroke-width:2;} .sb-stop{fill:#9C6B3C;stroke:' + INK + ';stroke-width:2;} .sb-rail{fill:#E9D3A8;stroke:' + INK + ';stroke-width:3;}'
  + '.sb-rline{stroke:' + INK + ';stroke-width:2;} .sb-tick{stroke:' + INK + ';stroke-width:1.6;} .sb-rnum{font-family:' + H + ';font-weight:800;font-size:16px;fill:' + INK + ';} .sb-wrap.is-narrow .sb-rnum{font-size:13px;} .sb-rnum.is-bold{fill:#C4522F;} .sb-runit{font-family:' + H + ';font-weight:800;font-size:13px;fill:' + INK + ';}'
  + '.sb-woodr{fill:#E3C38E;stroke:#5A3A1A;stroke-width:2;} .sb-grain{stroke:#C9A26B;stroke-width:1.4;} .sb-wnum{font-family:' + H + ';font-weight:800;font-size:18px;fill:#5A3A1A;} .sb-wrap.is-narrow .sb-wnum{font-size:15px;}'
  + '.is-cut .sb-woodr{fill:#F6DDAE;stroke:#C4522F;stroke-dasharray:0;} .is-cut .sb-wnum{fill:#9A3412;}'
  + '.sb-myst{fill:rgba(255,253,246,.7);stroke:#146B5E;stroke-width:2.5;stroke-dasharray:7 5;} .sb-myst.is-neutral{stroke:#B9A98A;} .sb-mnum{font-family:' + H + ';font-weight:800;font-size:20px;fill:#146B5E;}'
  + '.sb-gap{fill:rgba(255,226,90,.6);stroke:#D6A014;stroke-width:2;stroke-dasharray:5 4;} .sb-railflash{fill:none;stroke:#C4522F;stroke-width:4;} .sb-wrap:not(.is-fast) .sb-railflash{animation:sbFlash .5s ease-in-out 2;}'
  + '.sb-endtick{stroke-width:4;stroke-linecap:round;} .sb-span{stroke:#C4522F;stroke-width:3;}'
  + '.sb-lbar{fill:#C9A23A;stroke:' + INK + ';stroke-width:2;} .sb-vial{fill:#DDF3E9;stroke:' + INK + ';stroke-width:1.6;} .sb-vline{stroke:' + INK + ';stroke-width:1;} .sb-bubble{fill:#E8A23A;} .sb-bubble.is-mid{fill:#3FAE6A;}'
  + '.sb-dust{fill:rgba(201,162,107,.45);} .sb-wrap:not(.is-fast) .sb-dust{animation:sbDust .5s ease-out both;}'
  + '.sb-railhit{position:absolute;padding:0;margin:0;border:0;background:none;cursor:pointer;z-index:1;} .sb-railhit.is-target{box-shadow:0 0 0 3px #2E9C88 inset;border-radius:6px;} .sb-railhit:focus-visible{outline:3px solid #146B5E;outline-offset:1px;}'
  + '.sb-board-btn{position:absolute;padding:0;margin:0;border:0;background:none;cursor:grab;touch-action:none;z-index:2;display:block;} .sb-board-btn svg{display:block;overflow:visible;} .sb-board-btn.is-sel{filter:drop-shadow(0 0 4px #2E9C88) drop-shadow(0 0 2px #2E9C88);} .sb-board-btn.is-drag{z-index:5;cursor:grabbing;} .sb-board-btn:focus-visible{outline:3px solid #146B5E;outline-offset:1px;border-radius:4px;}'
  + '.sb-board-btn.is-shake{animation:sbShake .4s ease-in-out 2;}'
  + '.sb-levelbtn{position:absolute;padding:4px;margin:0;border:0;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4;cursor:pointer;display:flex;align-items:center;justify-content:center;} .sb-levelbtn svg{height:100%;max-height:64px;} .sb-levelbtn:disabled{opacity:.5;}'
  + '.sb-note{margin:0;max-width:640px;min-height:1.3em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .sb-wrap.is-narrow .sb-note{font-size:16px;line-height:1.25;} .sb-wrap.is-cramp .sb-note{font-size:15px;line-height:1.15;} .sb-note.is-hint{color:#9A3412;}'
  + '.sb-pad{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;max-width:100%;}'
  + '.sb-key{width:46px;height:50px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:0 0 0 2px #CDBFA4 inset,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;display:flex;align-items:center;justify-content:center;} .sb-key svg{width:24px;height:24px;} .sb-key:disabled{opacity:.45;cursor:default;}'
  + '.sb-go{height:50px;padding:0 16px;border:0;border-radius:14px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0E4F45;} .sb-go svg{width:22px;height:22px;} .sb-go:disabled{opacity:.45;cursor:default;}'
  + '.sb-wrap.is-narrow .sb-pad{display:grid;grid-template-columns:repeat(6,minmax(44px,1fr));width:100%;gap:5px;} .sb-wrap.is-narrow .sb-key{width:auto;height:44px;font-size:21px;} .sb-wrap.is-narrow .sb-go{height:44px;justify-content:center;padding:0;} .sb-wrap.is-narrow .sb-go span{display:none;}'
  + '.sb-wrap.is-done .sb-pad{display:none;} .sb-wrap.is-done .sb-note:empty{display:none;} .sb-wrap.is-cramp .sb-note:empty{display:none;} .sb-wrap.is-cramp{gap:5px;} .sb-wrap.is-cramp .sb-ticket{padding:6px 10px;gap:8px;}'
  + '@keyframes sbShake{0%,100%{transform:translateX(0);}30%{transform:translateX(-6px);}70%{transform:translateX(4px);}}'
  + '@keyframes sbFlash{0%,100%{opacity:1;}50%{opacity:.2;}} @keyframes sbDust{from{opacity:.9;transform:scale(.4);}to{opacity:0;transform:scale(1.6);}}'
  + '.sb-wrap.is-fast *{animation:none !important;transition:none !important;}';
  var s = document.createElement('style'); s.id = 'sb-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.SpiritBenchActivity = SpiritBenchActivity;
