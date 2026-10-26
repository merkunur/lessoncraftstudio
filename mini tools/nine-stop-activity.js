/* =====================================================================
   nine-stop-activity.js — ACTIVITY #97 of the one-by-one rebuild: "Ten
   More, Ten Less — Mental Math With Two-Digit Numbers" → THE NINE-STOP
   TUBES (1.NBT.C.5, 11 locales).
   Design: docs/activities-rebuild/designs/097-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: the number lives in two glass tubes — rods in the tens
   tube, cubes in the ones tube — and both stop at nine under a lid, so
   ten more can only ever be one rod in the tens tube (the ones tube is
   simply left alone). Pushing the ones handle up at nine bumps the lid.
   ACTIVITY LAYER ONLY: the model is nine-stop-core.js; tubes, rods, cubes,
   arrow cards, ten frames and tallies are drawn apparatus; the number
   words come from scripts/worksheet-gen/lib/number-words.js, generated
   into the WORDS block below (never by rule here); lcs-shell.js untouched
   (the shell's Check is hidden and pressed by this activity when the round
   is right).
   Test seams: window.NineStopActivity.st / ._pool / ._order /
   ._ensurePool / ._start / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var NineStopActivity = {
  id: 'nine-stop',
  apparatusClasses: ['ns-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble:   {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:      {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:         {en:'Ten More, Ten Less',de:'10 mehr, 10 weniger',nl:'10 meer, 10 minder',da:'10 mere, 10 mindre',sv:'10 mer, 10 mindre',no:'10 mer, 10 mindre',es:'10 más, 10 menos',it:'10 in più, 10 in meno',pt:'10 a mais, 10 a menos',fr:'10 de plus, 10 de moins',fi:'10 enemmän, 10 vähemmän'},
    instrMake:     {en:'Make the new number with the handles.',de:'Bau die neue Zahl mit den Griffen.',nl:'Maak het nieuwe getal met de hendels.',da:'Lav det nye tal med håndtagene.',sv:'Gör det nya talet med handtagen.',no:'Lag det nye tallet med håndtakene.',es:'Forma el número nuevo con las manijas.',it:'Forma il nuovo numero con le maniglie.',pt:'Forme o número novo com as alças.',fr:'Fais le nouveau nombre avec les poignées.',fi:'Tee uusi luku kahvoilla.'},
    instrFollow:   {en:'Follow the arrows with the handles.',de:'Folge den Pfeilen mit den Griffen.',nl:'Volg de pijlen met de hendels.',da:'Følg pilene med håndtagene.',sv:'Följ pilarna med handtagen.',no:'Følg pilene med håndtakene.',es:'Sigue las flechas con las manijas.',it:'Segui le frecce con le maniglie.',pt:'Siga as setas com as alças.',fr:'Suis les flèches avec les poignées.',fi:'Seuraa nuolia kahvoilla.'},
    instrCount:    {en:'How many jumps? Work it out first, then watch.',de:'Wie viele Sprünge? Erst überlegen, dann zuschauen.',nl:'Hoeveel sprongen? Eerst nadenken, dan kijken.',da:'Hvor mange hop? Tænk først, og se så efter.',sv:'Hur många hopp? Tänk först och titta sedan.',no:'Hvor mange hopp? Tenk først, og se så etter.',es:'¿Cuántos saltos? Primero piénsalo y luego observa.',it:'Quanti salti? Prima pensaci, poi guarda.',pt:'Quantos pulos? Primeiro pense, depois observe.',fr:'Combien de sauts ? Réfléchis d’abord, puis regarde.',fi:'Montako hyppyä? Mieti ensin ja katso sitten.'},
    instrNod:      {en:'Make the four neighbors of the number of the day.',de:'Bau die vier Nachbarn der Zahl des Tages.',nl:'Maak de vier buren van het getal van de dag.',da:'Lav dagens tals fire naboer.',sv:'Gör dagens tals fyra grannar.',no:'Lag dagens talls fire naboer.',es:'Forma los cuatro vecinos del número del día.',it:'Forma i quattro vicini del numero del giorno.',pt:'Forme os quatro vizinhos do número do dia.',fr:'Fais les quatre voisins du nombre du jour.',fi:'Tee päivän luvun neljä naapuria.'},
    promptTenMore: {en:'What is 10 more?',de:'Was ist 10 mehr?',nl:'Hoeveel is 10 meer?',da:'Hvad er 10 mere?',sv:'Vad är 10 mer?',no:'Hva er 10 mer?',es:'¿Cuánto es 10 más?',it:'Quanto fa 10 in più?',pt:'Quanto é 10 a mais?',fr:'Combien font 10 de plus ?',fi:'Paljonko on 10 enemmän?'},
    promptTenLess: {en:'What is 10 less?',de:'Was ist 10 weniger?',nl:'Hoeveel is 10 minder?',da:'Hvad er 10 mindre?',sv:'Vad är 10 mindre?',no:'Hva er 10 mindre?',es:'¿Cuánto es 10 menos?',it:'Quanto fa 10 in meno?',pt:'Quanto é 10 a menos?',fr:'Combien font 10 de moins ?',fi:'Paljonko on 10 vähemmän?'},
    promptOneMore: {en:'What is 1 more?',de:'Was ist 1 mehr?',nl:'Hoeveel is 1 meer?',da:'Hvad er 1 mere?',sv:'Vad är 1 mer?',no:'Hva er 1 mer?',es:'¿Cuánto es 1 más?',it:'Quanto fa 1 in più?',pt:'Quanto é 1 a mais?',fr:'Combien font 1 de plus ?',fi:'Paljonko on 1 enemmän?'},
    promptOneLess: {en:'What is 1 less?',de:'Was ist 1 weniger?',nl:'Hoeveel is 1 minder?',da:'Hvad er 1 mindre?',sv:'Vad är 1 mindre?',no:'Hva er 1 mindre?',es:'¿Cuánto es 1 menos?',it:'Quanto fa 1 in meno?',pt:'Quanto é 1 a menos?',fr:'Combien font 1 de moins ?',fi:'Paljonko on 1 vähemmän?'},
    pFollow:       {en:'Where do the arrows land?',de:'Wo landen die Pfeile?',nl:'Waar komen de pijlen uit?',da:'Hvor lander pilene?',sv:'Var landar pilarna?',no:'Hvor lander pilene?',es:'¿A dónde llegan las flechas?',it:'Dove arrivano le frecce?',pt:'Onde as setas chegam?',fr:'Où arrivent les flèches ?',fi:'Mihin nuolet vievät?'},
    pMystery:      {en:'Both trips land on one number.',de:'Beide Wege landen auf einer Zahl.',nl:'Beide tochten komen op één getal uit.',da:'Begge ture lander på ét tal.',sv:'Båda resorna landar på ett tal.',no:'Begge turene lander på ett tall.',es:'Los dos caminos caen en un mismo número.',it:'I due percorsi arrivano allo stesso numero.',pt:'Os dois caminhos chegam ao mesmo número.',fr:'Les deux trajets arrivent au même nombre.',fi:'Molemmat matkat päättyvät samaan lukuun.'},
    pCount:        {en:'How many jumps from {a} to {b}?',de:'Wie viele Sprünge von {a} bis {b}?',nl:'Hoeveel sprongen van {a} naar {b}?',da:'Hvor mange hop fra {a} til {b}?',sv:'Hur många hopp från {a} till {b}?',no:'Hvor mange hopp fra {a} til {b}?',es:'¿Cuántos saltos de {a} a {b}?',it:'Quanti salti da {a} a {b}?',pt:'Quantos pulos de {a} até {b}?',fr:'Combien de sauts de {a} à {b} ?',fi:'Montako hyppyä luvusta {a} lukuun {b}?'},
    lab_m10:       {en:'10 less',de:'10 weniger',nl:'10 minder',da:'10 mindre',sv:'10 mindre',no:'10 mindre',es:'10 menos',it:'10 in meno',pt:'10 a menos',fr:'10 de moins',fi:'10 vähemmän'},
    lab_m1:        {en:'1 less',de:'1 weniger',nl:'1 minder',da:'1 mindre',sv:'1 mindre',no:'1 mindre',es:'1 menos',it:'1 in meno',pt:'1 a menos',fr:'1 de moins',fi:'1 vähemmän'},
    lab_p1:        {en:'1 more',de:'1 mehr',nl:'1 meer',da:'1 mere',sv:'1 mer',no:'1 mer',es:'1 más',it:'1 in più',pt:'1 a mais',fr:'1 de plus',fi:'1 enemmän'},
    lab_p10:       {en:'10 more',de:'10 mehr',nl:'10 meer',da:'10 mere',sv:'10 mer',no:'10 mer',es:'10 más',it:'10 in più',pt:'10 a mais',fr:'10 de plus',fi:'10 enemmän'},
    hintMove:      {en:'Move a handle first.',de:'Beweg zuerst einen Griff.',nl:'Beweeg eerst een hendel.',da:'Flyt først et håndtag.',sv:'Flytta ett handtag först.',no:'Flytt et håndtak først.',es:'Primero mueve una manija.',it:'Prima muovi una maniglia.',pt:'Primeiro mexa uma alça.',fr:'Bouge d’abord une poignée.',fi:'Liikuta ensin kahvaa.'},
    hintTypeCounts:{en:'Type how many jumps first.',de:'Gib zuerst ein, wie viele Sprünge es sind.',nl:'Typ eerst hoeveel sprongen het zijn.',da:'Skriv først, hvor mange hop det er.',sv:'Skriv först hur många hopp det är.',no:'Skriv først hvor mange hopp det er.',es:'Primero escribe cuántos saltos son.',it:'Prima scrivi quanti salti sono.',pt:'Primeiro escreva quantos pulos são.',fr:'Écris d’abord combien de sauts il y a.',fi:'Kirjoita ensin, montako hyppyä on.'},
    hintTenMore:   {en:'10 more is one more ten. Look at the tens tube.',de:'10 mehr ist ein Zehner mehr. Schau auf die Zehnerröhre.',nl:'10 meer is één tiental meer. Kijk naar de buis van de tientallen.',da:'10 mere er én tier mere. Se på tierrøret.',sv:'10 mer är ett tiotal till. Titta på tiotalsröret.',no:'10 mer er én tier til. Se på tierrøret.',es:'10 más es una decena más. Mira el tubo de las decenas.',it:'10 in più è una decina in più. Guarda il tubo delle decine.',pt:'10 a mais é uma dezena a mais. Olhe o tubo das dezenas.',fr:'10 de plus, c’est une dizaine de plus. Regarde le tube des dizaines.',fi:'10 enemmän on yksi kymppi lisää. Katso kymppien putkea.'},
    hintTenLess:   {en:'10 less is one ten fewer. Look at the tens tube.',de:'10 weniger ist ein Zehner weniger. Schau auf die Zehnerröhre.',nl:'10 minder is één tiental minder. Kijk naar de buis van de tientallen.',da:'10 mindre er én tier mindre. Se på tierrøret.',sv:'10 mindre är ett tiotal färre. Titta på tiotalsröret.',no:'10 mindre er én tier færre. Se på tierrøret.',es:'10 menos es una decena menos. Mira el tubo de las decenas.',it:'10 in meno è una decina in meno. Guarda il tubo delle decine.',pt:'10 a menos é uma dezena a menos. Olhe o tubo das dezenas.',fr:'10 de moins, c’est une dizaine de moins. Regarde le tube des dizaines.',fi:'10 vähemmän on yksi kymppi vähemmän. Katso kymppien putkea.'},
    hintOneMore:   {en:'1 more is one more cube. Look at the ones tube.',de:'1 mehr ist ein Einer mehr. Schau auf die Einerröhre.',nl:'1 meer is één eenheid meer. Kijk naar de buis van de eenheden.',da:'1 mere er én ener mere. Se på enerrøret.',sv:'1 mer är ett ental till. Titta på entalsröret.',no:'1 mer er én ener til. Se på enerrøret.',es:'1 más es una unidad más. Mira el tubo de las unidades.',it:'1 in più è un’unità in più. Guarda il tubo delle unità.',pt:'1 a mais é uma unidade a mais. Olhe o tubo das unidades.',fr:'1 de plus, c’est une unité de plus. Regarde le tube des unités.',fi:'1 enemmän on yksi ykkönen lisää. Katso ykkösten putkea.'},
    hintOneLess:   {en:'1 less is one cube fewer. Look at the ones tube.',de:'1 weniger ist ein Einer weniger. Schau auf die Einerröhre.',nl:'1 minder is één eenheid minder. Kijk naar de buis van de eenheden.',da:'1 mindre er én ener mindre. Se på enerrøret.',sv:'1 mindre är ett ental färre. Titta på entalsröret.',no:'1 mindre er én ener færre. Se på enerrøret.',es:'1 menos es una unidad menos. Mira el tubo de las unidades.',it:'1 in meno è un’unità in meno. Guarda il tubo delle unità.',pt:'1 a menos é uma unidade a menos. Olhe o tubo das unidades.',fr:'1 de moins, c’est une unité de moins. Regarde le tube des unités.',fi:'1 vähemmän on yksi ykkönen vähemmän. Katso ykkösten putkea.'},
    hintOnlyTens:  {en:'Only the tens digit changes — the ones stay as they are.',de:'Nur die Zehnerziffer ändert sich – die Einer bleiben, wie sie sind.',nl:'Alleen het cijfer van de tientallen verandert — de eenheden blijven zoals ze zijn.',da:'Kun tiercifferet ændrer sig – enerne bliver, som de er.',sv:'Bara tiotalssiffran ändras – entalen är som förut.',no:'Bare tiersifferet endrer seg – enerne blir som de er.',es:'Solo cambia la cifra de las decenas: las unidades se quedan igual.',it:'Cambia solo la cifra delle decine: le unità restano uguali.',pt:'Só muda o algarismo das dezenas: as unidades ficam iguais.',fr:'Seul le chiffre des dizaines change : les unités restent pareilles.',fi:'Vain kymppien numero muuttuu – ykköset pysyvät ennallaan.'},
    hintOnlyOnes:  {en:'Only the ones digit changes — the tens stay as they are.',de:'Nur die Einerziffer ändert sich – die Zehner bleiben, wie sie sind.',nl:'Alleen het cijfer van de eenheden verandert — de tientallen blijven zoals ze zijn.',da:'Kun enercifferet ændrer sig – tierne bliver, som de er.',sv:'Bara entalssiffran ändras – tiotalen är som förut.',no:'Bare enersifferet endrer seg – tierne blir som de er.',es:'Solo cambia la cifra de las unidades: las decenas se quedan igual.',it:'Cambia solo la cifra delle unità: le decine restano uguali.',pt:'Só muda o algarismo das unidades: as dezenas ficam iguais.',fr:'Seul le chiffre des unités change : les dizaines restent pareilles.',fi:'Vain ykkösten numero muuttuu – kympit pysyvät ennallaan.'},
    hintTradeUp:   {en:'The ones tube in {start} is full: put one more rod in the tens and take all the ones out.',de:'In {start} passt kein Einer mehr: Leg eine Stange zu den Zehnern und nimm alle Einer heraus.',nl:'In {start} past geen eenheid meer: zet er een staaf bij in de tientallen en haal alle eenheden eruit.',da:'I {start} er der ikke plads til én ener mere: Sæt en stang mere i tierne, og tag alle enerne ud.',sv:'I {start} får inget ental till plats: lägg en stav till i tiotalen och ta ut alla ental.',no:'I {start} er det ikke plass til én ener til: Legg en stav til i tierne og ta ut alle enerne.',es:'En {start} ya no cabe otra unidad: pon una barra más en las decenas y saca todas las unidades.',it:'In {start} non c’è posto per un’altra unità: aggiungi una barra nelle decine e togli tutte le unità.',pt:'Em {start} não cabe mais uma unidade: coloque mais uma barra nas dezenas e tire todas as unidades.',fr:'Dans {start}, il n’y a plus de place pour une unité : ajoute une barre dans les dizaines et enlève toutes les unités.',fi:'Luvussa {start} ei ole tilaa yhdelle ykköselle lisää: lisää sauva kymppeihin ja ota kaikki ykköset pois.'},
    hintTradeDown: {en:'{start} has no ones to take: take one rod out of the tens and fill the ones tube up to the lid.',de:'{start} hat keine Einer zum Wegnehmen: Nimm eine Stange aus den Zehnern und füll die Einerröhre bis zum Deckel.',nl:'{start} heeft geen eenheden om weg te halen: haal een staaf uit de tientallen en vul de buis van de eenheden tot aan het deksel.',da:'{start} har ingen enere at tage af: Tag en stang ud af tierne, og fyld enerrøret op til låget.',sv:'{start} har inga ental att ta: ta ut en stav ur tiotalen och fyll entalsröret upp till locket.',no:'{start} har ingen enere å ta: Ta en stav ut av tierne og fyll enerrøret helt opp til lokket.',es:'{start} no tiene unidades que quitar: saca una barra de las decenas y llena el tubo de las unidades hasta la tapa.',it:'{start} non ha unità da togliere: togli una barra dalle decine e riempi il tubo delle unità fino al coperchio.',pt:'{start} não tem unidades para tirar: tire uma barra das dezenas e encha o tubo das unidades até a tampa.',fr:'{start} n’a pas d’unités à enlever : sors une barre des dizaines et remplis le tube des unités jusqu’au couvercle.',fi:'Luvussa {start} ei ole ykkösiä otettavaksi: ota sauva pois kympeistä ja täytä ykkösten putki kanteen asti.'},
    hintArrows:    {en:'↓ one more ten · ↑ one ten fewer · → one more one · ← one one fewer.',de:'↓ ein Zehner mehr · ↑ ein Zehner weniger · → ein Einer mehr · ← ein Einer weniger.',nl:'↓ één tiental meer · ↑ één tiental minder · → één eenheid meer · ← één eenheid minder.',da:'↓ én tier mere · ↑ én tier mindre · → én ener mere · ← én ener mindre.',sv:'↓ ett tiotal till · ↑ ett tiotal färre · → ett ental till · ← ett ental färre.',no:'↓ én tier til · ↑ én tier færre · → én ener til · ← én ener færre.',es:'↓ una decena más · ↑ una decena menos · → una unidad más · ← una unidad menos.',it:'↓ una decina in più · ↑ una decina in meno · → un’unità in più · ← un’unità in meno.',pt:'↓ uma dezena a mais · ↑ uma dezena a menos · → uma unidade a mais · ← uma unidade a menos.',fr:'↓ une dizaine de plus · ↑ une dizaine de moins · → une unité de plus · ← une unité de moins.',fi:'↓ yksi kymppi lisää · ↑ yksi kymppi vähemmän · → yksi ykkönen lisää · ← yksi ykkönen vähemmän.'},
    hintCards:     {en:'Play the cards one at a time on their own tubes.',de:'Leg die Karten eine nach der anderen auf ihre eigene Röhre.',nl:'Speel de kaarten één voor één op hun eigen buis.',da:'Spil kortene ét ad gangen på deres eget rør.',sv:'Spela korten ett i taget på deras eget rör.',no:'Spill kortene ett om gangen på sitt eget rør.',es:'Juega las tarjetas de una en una sobre su propio tubo.',it:'Gioca le carte una alla volta sul loro tubo.',pt:'Jogue as cartas uma de cada vez no tubo delas.',fr:'Joue les cartes une à une sur leur propre tube.',fi:'Pelaa kortit yksi kerrallaan omaan putkeensa.'},
    hintCount1:    {en:'Count the tens first, then the ones.',de:'Zähl zuerst die Zehner, dann die Einer.',nl:'Tel eerst de tientallen, dan de eenheden.',da:'Tæl tierne først, så enerne.',sv:'Räkna tiotalen först, sedan entalen.',no:'Tell tierne først, så enerne.',es:'Cuenta primero las decenas y luego las unidades.',it:'Conta prima le decine, poi le unità.',pt:'Conte primeiro as dezenas, depois as unidades.',fr:'Compte d’abord les dizaines, puis les unités.',fi:'Laske ensin kympit ja sitten ykköset.'},
    hintCount2:    {en:'How far apart are the two tens digits? And the two ones digits?',de:'Wie weit liegen die zwei Zehnerziffern auseinander? Und die zwei Einerziffern?',nl:'Hoe ver liggen de twee cijfers van de tientallen uit elkaar? En de twee cijfers van de eenheden?',da:'Hvor langt er der mellem de to tierciffre? Og mellem de to enerciffre?',sv:'Hur långt ifrån varandra är de två tiotalssiffrorna? Och de två entalssiffrorna?',no:'Hvor langt fra hverandre er de to tiersifrene? Og de to enersifrene?',es:'¿Qué tan lejos están las dos cifras de las decenas? ¿Y las de las unidades?',it:'Quanto distano le due cifre delle decine? E quelle delle unità?',pt:'Qual é a distância entre os dois algarismos das dezenas? E entre os das unidades?',fr:'Quel écart entre les deux chiffres des dizaines ? Et entre ceux des unités ?',fi:'Kuinka kaukana toisistaan kahden luvun kymppien numerot ovat? Entä ykkösten numerot?'},
    hintLid:       {en:'The tube is full — nine is the most it holds.',de:'Die Röhre ist voll – mehr als neun passen nicht hinein.',nl:'De buis is vol — er passen er hoogstens negen in.',da:'Røret er fuldt – der kan højst være ni.',sv:'Röret är fullt – det rymmer högst nio.',no:'Røret er fullt – det får plass til høyst ni.',es:'El tubo está lleno: caben nueve como máximo.',it:'Il tubo è pieno: ce ne stanno al massimo nove.',pt:'O tubo está cheio: cabem no máximo nove.',fr:'Le tube est plein : il n’en contient pas plus de neuf.',fi:'Putki on täynnä – siihen mahtuu enintään yhdeksän.'},
    hintLidOnes:   {en:'The ones tube is full: put one more rod in the tens and take all the ones out.',de:'Die Einerröhre ist voll: Leg eine Stange zu den Zehnern und nimm alle Einer heraus.',nl:'De buis van de eenheden is vol: zet er een staaf bij in de tientallen en haal alle eenheden eruit.',da:'Enerrøret er fuldt: Sæt en stang mere i tierne, og tag alle enerne ud.',sv:'Entalsröret är fullt: lägg en stav till i tiotalen och ta ut alla ental.',no:'Enerrøret er fullt: Legg en stav til i tierne og ta ut alle enerne.',es:'El tubo de las unidades está lleno: pon una barra más en las decenas y saca todas las unidades.',it:'Il tubo delle unità è pieno: aggiungi una barra nelle decine e togli tutte le unità.',pt:'O tubo das unidades está cheio: coloque mais uma barra nas dezenas e tire todas as unidades.',fr:'Le tube des unités est plein : ajoute une barre dans les dizaines et enlève toutes les unités.',fi:'Ykkösten putki on täynnä: lisää sauva kymppeihin ja ota kaikki ykköset pois.'},
    hintWrongTube: {en:'That card goes on the other tube.',de:'Diese Karte gehört auf die andere Röhre.',nl:'Die kaart hoort bij de andere buis.',da:'Det kort skal på det andet rør.',sv:'Det kortet hör till det andra röret.',no:'Det kortet hører til det andre røret.',es:'Esa tarjeta va en el otro tubo.',it:'Quella carta va sull’altro tubo.',pt:'Essa carta vai no outro tubo.',fr:'Cette carte va sur l’autre tube.',fi:'Se kortti kuuluu toiseen putkeen.'},
    okTenMore:     {en:'10 more than {start} is {answer} — only the tens digit changed!',de:'10 mehr als {start} ist {answer} – nur die Zehnerziffer hat sich geändert!',nl:'10 meer dan {start} is {answer} — alleen het cijfer van de tientallen is veranderd!',da:'10 mere end {start} er {answer} – kun tiercifferet ændrede sig!',sv:'10 mer än {start} är {answer} – bara tiotalssiffran ändrades!',no:'10 mer enn {start} er {answer} – bare tiersifferet endret seg!',es:'¡10 más que {start} es {answer}: solo cambió la cifra de las decenas!',it:'10 in più di {start} è {answer}: è cambiata solo la cifra delle decine!',pt:'10 a mais que {start} é {answer}: só mudou o algarismo das dezenas!',fr:'{start} et 10 de plus, c’est {answer} : seul le chiffre des dizaines a changé !',fi:'10 enemmän kuin {start} on {answer} – vain kymppien numero muuttui!'},
    okTenLess:     {en:'10 less than {start} is {answer} — only the tens digit changed!',de:'10 weniger als {start} ist {answer} – nur die Zehnerziffer hat sich geändert!',nl:'10 minder dan {start} is {answer} — alleen het cijfer van de tientallen is veranderd!',da:'10 mindre end {start} er {answer} – kun tiercifferet ændrede sig!',sv:'10 mindre än {start} är {answer} – bara tiotalssiffran ändrades!',no:'10 mindre enn {start} er {answer} – bare tiersifferet endret seg!',es:'¡10 menos que {start} es {answer}: solo cambió la cifra de las decenas!',it:'10 in meno di {start} è {answer}: è cambiata solo la cifra delle decine!',pt:'10 a menos que {start} é {answer}: só mudou o algarismo das dezenas!',fr:'{start} et 10 de moins, c’est {answer} : seul le chiffre des dizaines a changé !',fi:'10 vähemmän kuin {start} on {answer} – vain kymppien numero muuttui!'},
    okOneMore:     {en:'1 more than {start} is {answer}!',de:'1 mehr als {start} ist {answer}!',nl:'1 meer dan {start} is {answer}!',da:'1 mere end {start} er {answer}!',sv:'1 mer än {start} är {answer}!',no:'1 mer enn {start} er {answer}!',es:'¡1 más que {start} es {answer}!',it:'1 in più di {start} è {answer}!',pt:'1 a mais que {start} é {answer}!',fr:'{start} et 1 de plus, c’est {answer} !',fi:'1 enemmän kuin {start} on {answer}!'},
    okOneLess:     {en:'1 less than {start} is {answer}!',de:'1 weniger als {start} ist {answer}!',nl:'1 minder dan {start} is {answer}!',da:'1 mindre end {start} er {answer}!',sv:'1 mindre än {start} är {answer}!',no:'1 mindre enn {start} er {answer}!',es:'¡1 menos que {start} es {answer}!',it:'1 in meno di {start} è {answer}!',pt:'1 a menos que {start} é {answer}!',fr:'{start} et 1 de moins, c’est {answer} !',fi:'1 vähemmän kuin {start} on {answer}!'},
    okFollow:      {en:'From {start}: {arrows} lands on {answer}.',de:'Von {start} aus: {arrows} landet auf {answer}.',nl:'Vanaf {start}: {arrows} komt uit op {answer}.',da:'Fra {start}: {arrows} lander på {answer}.',sv:'Från {start}: {arrows} landar på {answer}.',no:'Fra {start}: {arrows} lander på {answer}.',es:'Desde {start}: {arrows} cae en {answer}.',it:'Da {start}: {arrows} arriva a {answer}.',pt:'De {start}: {arrows} chega a {answer}.',fr:'Depuis {start} : {arrows} arrive à {answer}.',fi:'Luvusta {start}: {arrows} vie lukuun {answer}.'},
    okMystery:     {en:'Both trips land on {answer}!',de:'Beide Wege landen auf {answer}!',nl:'Beide tochten komen uit op {answer}!',da:'Begge ture lander på {answer}!',sv:'Båda resorna landar på {answer}!',no:'Begge turene lander på {answer}!',es:'¡Los dos caminos caen en {answer}!',it:'Entrambi i percorsi arrivano a {answer}!',pt:'Os dois caminhos chegam a {answer}!',fr:'Les deux trajets arrivent à {answer} !',fi:'Molemmat matkat päättyvät lukuun {answer}!'},
    okCountDown:   {en:'From {a} to {b}: {d} jumps of ten and {r} jumps of one.',de:'Von {a} bis {b}: {d} Zehnersprünge und {r} Einersprünge.',nl:'Van {a} naar {b}: {d} sprongen van tien en {r} sprongen van één.',da:'Fra {a} til {b}: {d} tierhop og {r} enerhop.',sv:'Från {a} till {b}: {d} tiotalshopp och {r} entalshopp.',no:'Fra {a} til {b}: {d} tierhopp og {r} enerhopp.',es:'De {a} a {b}: {d} saltos de diez y {r} saltos de uno.',it:'Da {a} a {b}: {d} salti da dieci e {r} salti da uno.',pt:'De {a} até {b}: {d} pulos de dez e {r} pulos de um.',fr:'De {a} à {b} : {d} sauts de dix et {r} sauts de un.',fi:'Luvusta {a} lukuun {b}: {d} kymppihyppyä ja {r} ykköshyppyä.'},
    okCountUp:     {en:'From {a} to {b}: {d} jumps of ten and {r} jumps of one.',de:'Von {a} bis {b}: {d} Zehnersprünge und {r} Einersprünge.',nl:'Van {a} naar {b}: {d} sprongen van tien en {r} sprongen van één.',da:'Fra {a} til {b}: {d} tierhop og {r} enerhop.',sv:'Från {a} till {b}: {d} tiotalshopp och {r} entalshopp.',no:'Fra {a} til {b}: {d} tierhopp og {r} enerhopp.',es:'De {a} a {b}: {d} saltos de diez y {r} saltos de uno.',it:'Da {a} a {b}: {d} salti da dieci e {r} salti da uno.',pt:'De {a} até {b}: {d} pulos de dez e {r} pulos de um.',fr:'De {a} à {b} : {d} sauts de dix et {r} sauts de un.',fi:'Luvusta {a} lukuun {b}: {d} kymppihyppyä ja {r} ykköshyppyä.'},
    okNod:         {en:'{n}, {word}: {m10} and {p10} above and below, {m1} and {p1} beside it.',de:'{n}, {word}: {m10} und {p10} darüber und darunter, {m1} und {p1} daneben.',nl:'{n}, {word}: {m10} en {p10} erboven en eronder, {m1} en {p1} ernaast.',da:'{n}, {word}: {m10} og {p10} over og under, {m1} og {p1} ved siden af.',sv:'{n}, {word}: {m10} och {p10} ovanför och under, {m1} och {p1} bredvid.',no:'{n}, {word}: {m10} og {p10} over og under, {m1} og {p1} ved siden av.',es:'{n}, {word}: {m10} y {p10} arriba y abajo, {m1} y {p1} a los lados.',it:'{n}, {word}: {m10} e {p10} sopra e sotto, {m1} e {p1} accanto.',pt:'{n}, {word}: {m10} e {p10} em cima e embaixo, {m1} e {p1} dos lados.',fr:'{n}, {word} : {m10} et {p10} au-dessus et en dessous, {m1} et {p1} à côté.',fi:'{n}, {word}: {m10} ja {p10} ylä- ja alapuolella, {m1} ja {p1} vieressä.'},
    check:         {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setTask:       {en:'Task',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Tarea',it:'Compito',pt:'Tarefa',fr:'Tâche',fi:'Tehtävä'},
    tTen:          {en:'10 more, 10 less',de:'10 mehr, 10 weniger',nl:'10 meer, 10 minder',da:'10 mere, 10 mindre',sv:'10 mer, 10 mindre',no:'10 mer, 10 mindre',es:'10 más, 10 menos',it:'10 in più, 10 in meno',pt:'10 a mais, 10 a menos',fr:'10 de plus, 10 de moins',fi:'10 enemmän, 10 vähemmän'},
    tOne:          {en:'1 more, 1 less',de:'1 mehr, 1 weniger',nl:'1 meer, 1 minder',da:'1 mere, 1 mindre',sv:'1 mer, 1 mindre',no:'1 mer, 1 mindre',es:'1 más, 1 menos',it:'1 in più, 1 in meno',pt:'1 a mais, 1 a menos',fr:'1 de plus, 1 de moins',fi:'1 enemmän, 1 vähemmän'},
    tJumps:        {en:'Arrow jumps',de:'Pfeilsprünge',nl:'Pijlsprongen',da:'Pilehop',sv:'Pilhopp',no:'Pilhopp',es:'Saltos de flechas',it:'Salti con le frecce',pt:'Pulos de setas',fr:'Sauts de flèches',fi:'Nuolihypyt'},
    tNod:          {en:'Number of the day',de:'Zahl des Tages',nl:'Getal van de dag',da:'Dagens tal',sv:'Dagens tal',no:'Dagens tall',es:'Número del día',it:'Numero del giorno',pt:'Número do dia',fr:'Nombre du jour',fi:'Päivän luku'},
    setGlass:      {en:'Glass',de:'Glas',nl:'Glas',da:'Glas',sv:'Glas',no:'Glass',es:'Vidrio',it:'Vetro',pt:'Vidro',fr:'Verre',fi:'Lasi'},
    gClear:        {en:'Clear',de:'Klar',nl:'Helder',da:'Klart',sv:'Klart',no:'Klart',es:'Transparente',it:'Trasparente',pt:'Transparente',fr:'Transparent',fi:'Kirkas'},
    gFrost:        {en:'Frosted',de:'Milchig',nl:'Mat',da:'Matteret',sv:'Frostat',no:'Matt',es:'Esmerilado',it:'Smerigliato',pt:'Fosco',fr:'Dépoli',fi:'Huurteinen'},
    ariaTubeT:     {en:'Tens tube: {n}',de:'Zehnerröhre: {n}',nl:'Buis van de tientallen: {n}',da:'Tierrør: {n}',sv:'Tiotalsrör: {n}',no:'Tierrør: {n}',es:'Tubo de las decenas: {n}',it:'Tubo delle decine: {n}',pt:'Tubo das dezenas: {n}',fr:'Tube des dizaines : {n}',fi:'Kymppien putki: {n}'},
    ariaTubeO:     {en:'Ones tube: {n}',de:'Einerröhre: {n}',nl:'Buis van de eenheden: {n}',da:'Enerrør: {n}',sv:'Entalsrör: {n}',no:'Enerrør: {n}',es:'Tubo de las unidades: {n}',it:'Tubo delle unità: {n}',pt:'Tubo das unidades: {n}',fr:'Tube des unités : {n}',fi:'Ykkösten putki: {n}'},
    ariaFull:      {en:'full',de:'voll',nl:'vol',da:'fuldt',sv:'fullt',no:'fullt',es:'lleno',it:'pieno',pt:'cheio',fr:'plein',fi:'täynnä'},
    ariaUpT:       {en:'One more rod',de:'Eine Stange mehr',nl:'Eén staaf meer',da:'Én stang mere',sv:'En stav till',no:'Én stav til',es:'Una barra más',it:'Una barra in più',pt:'Uma barra a mais',fr:'Une barre de plus',fi:'Yksi sauva lisää'},
    ariaDownT:     {en:'One rod out',de:'Eine Stange heraus',nl:'Eén staaf eruit',da:'Én stang ud',sv:'En stav ut',no:'Én stav ut',es:'Sacar una barra',it:'Togli una barra',pt:'Tirar uma barra',fr:'Enlever une barre',fi:'Yksi sauva pois'},
    ariaUpO:       {en:'One more cube',de:'Ein Würfel mehr',nl:'Eén blokje meer',da:'Én klods mere',sv:'En kloss till',no:'Én kloss til',es:'Un cubo más',it:'Un cubetto in più',pt:'Um cubinho a mais',fr:'Un cube de plus',fi:'Yksi kuutio lisää'},
    ariaDownO:     {en:'One cube out',de:'Ein Würfel heraus',nl:'Eén blokje eruit',da:'Én klods ud',sv:'En kloss ut',no:'Én kloss ut',es:'Sacar un cubo',it:'Togli un cubetto',pt:'Tirar um cubinho',fr:'Enlever un cube',fi:'Yksi kuutio pois'},
    ariaCard:      {en:'Arrow card: {a}',de:'Pfeilkarte: {a}',nl:'Pijlkaart: {a}',da:'Pilekort: {a}',sv:'Pilkort: {a}',no:'Pilkort: {a}',es:'Tarjeta de flecha: {a}',it:'Carta freccia: {a}',pt:'Carta de seta: {a}',fr:'Carte flèche : {a}',fi:'Nuolikortti: {a}'},
    ariaPlayed:    {en:'played',de:'gespielt',nl:'gespeeld',da:'spillet',sv:'spelat',no:'spilt',es:'jugada',it:'giocata',pt:'jogada',fr:'jouée',fi:'pelattu'},
    arrD:          {en:'down, one more ten',de:'nach unten, ein Zehner mehr',nl:'omlaag, één tiental meer',da:'ned, én tier mere',sv:'ner, ett tiotal till',no:'ned, én tier til',es:'abajo, una decena más',it:'in giù, una decina in più',pt:'para baixo, uma dezena a mais',fr:'vers le bas, une dizaine de plus',fi:'alas, yksi kymppi lisää'},
    arrU:          {en:'up, one ten fewer',de:'nach oben, ein Zehner weniger',nl:'omhoog, één tiental minder',da:'op, én tier mindre',sv:'upp, ett tiotal färre',no:'opp, én tier færre',es:'arriba, una decena menos',it:'in su, una decina in meno',pt:'para cima, uma dezena a menos',fr:'vers le haut, une dizaine de moins',fi:'ylös, yksi kymppi vähemmän'},
    arrR:          {en:'right, one more one',de:'nach rechts, ein Einer mehr',nl:'naar rechts, één eenheid meer',da:'til højre, én ener mere',sv:'höger, ett ental till',no:'til høyre, én ener til',es:'derecha, una unidad más',it:'a destra, un’unità in più',pt:'para a direita, uma unidade a mais',fr:'vers la droite, une unité de plus',fi:'oikealle, yksi ykkönen lisää'},
    arrL:          {en:'left, one one fewer',de:'nach links, ein Einer weniger',nl:'naar links, één eenheid minder',da:'til venstre, én ener mindre',sv:'vänster, ett ental färre',no:'til venstre, én ener færre',es:'izquierda, una unidad menos',it:'a sinistra, un’unità in meno',pt:'para a esquerda, uma unidade a menos',fr:'vers la gauche, une unité de moins',fi:'vasemmalle, yksi ykkönen vähemmän'},
    ariaCntT:      {en:'Tens jumps {a}: {n}',de:'Zehnersprünge {a}: {n}',nl:'Sprongen van tien {a}: {n}',da:'Tierhop {a}: {n}',sv:'Tiotalshopp {a}: {n}',no:'Tierhopp {a}: {n}',es:'Saltos de decenas {a}: {n}',it:'Salti di decine {a}: {n}',pt:'Pulos de dezenas {a}: {n}',fr:'Sauts de dizaines {a} : {n}',fi:'Kymppihypyt {a}: {n}'},
    ariaCntO:      {en:'Ones jumps {a}: {n}',de:'Einersprünge {a}: {n}',nl:'Sprongen van één {a}: {n}',da:'Enerhop {a}: {n}',sv:'Entalshopp {a}: {n}',no:'Enerhopp {a}: {n}',es:'Saltos de unidades {a}: {n}',it:'Salti di unità {a}: {n}',pt:'Pulos de unidades {a}: {n}',fr:'Sauts d’unités {a} : {n}',fi:'Ykköshypyt {a}: {n}'},
    ariaPinned:    {en:'The first trip landed on {n}',de:'Der erste Weg landete auf {n}',nl:'De eerste tocht kwam uit op {n}',da:'Den første tur landede på {n}',sv:'Den första resan landade på {n}',no:'Den første turen landet på {n}',es:'El primer camino cayó en {n}',it:'Il primo percorso è arrivato a {n}',pt:'O primeiro caminho chegou a {n}',fr:'Le premier trajet est arrivé à {n}',fi:'Ensimmäinen matka päättyi lukuun {n}'},
    ariaLanded:    {en:'Your jumps landed on {n}',de:'Deine Sprünge landeten auf {n}',nl:'Jouw sprongen kwamen uit op {n}',da:'Dine hop landede på {n}',sv:'Dina hopp landade på {n}',no:'Hoppene dine landet på {n}',es:'Tus saltos cayeron en {n}',it:'I tuoi salti sono arrivati a {n}',pt:'Seus pulos chegaram a {n}',fr:'Tes sauts sont arrivés à {n}',fi:'Hyppysi päättyivät lukuun {n}'},
    ariaCross:     {en:'The number of the day and its neighbours',de:'Die Zahl des Tages und ihre Nachbarn',nl:'Het getal van de dag en zijn buren',da:'Dagens tal og dets naboer',sv:'Dagens tal och dess grannar',no:'Dagens tall og naboene',es:'El número del día y sus vecinos',it:'Il numero del giorno e i suoi vicini',pt:'O número do dia e seus vizinhos',fr:'Le nombre du jour et ses voisins',fi:'Päivän luku ja sen naapurit'},
    ariaFrames:    {en:'Ten frames: {n}',de:'Zehnerfelder: {n}',nl:'Tienvelden: {n}',da:'Tierrammer: {n}',sv:'Tiorutor: {n}',no:'Tierrammer: {n}',es:'Marcos de diez: {n}',it:'Griglie da dieci: {n}',pt:'Quadros de dez: {n}',fr:'Cadres de dix : {n}',fi:'Kymppiruudukot: {n}'},
    ariaTally:     {en:'Tally marks: {n}',de:'Strichliste: {n}',nl:'Turfstreepjes: {n}',da:'Tællestreger: {n}',sv:'Streckräkning: {n}',no:'Tellestreker: {n}',es:'Marcas de conteo: {n}',it:'Tacche: {n}',pt:'Marcas de contagem: {n}',fr:'Bâtons : {n}',fi:'Tukkimiehen kirjanpito: {n}'},
    ariaWord:      {en:'In words: {w}',de:'In Worten: {w}',nl:'In woorden: {w}',da:'Med bogstaver: {w}',sv:'Med bokstäver: {w}',no:'Med bokstaver: {w}',es:'Con letra: {w}',it:'In lettere: {w}',pt:'Por extenso: {w}',fr:'En lettres : {w}',fi:'Sanoin: {w}'},
    ariaDim:       {en:'Lights up when you are done',de:'Leuchtet auf, wenn du fertig bist',nl:'Licht op als je klaar bent',da:'Lyser op, når du er færdig',sv:'Lyser upp när du är klar',no:'Lyser opp når du er ferdig',es:'Se ilumina cuando termines',it:'Si illumina quando hai finito',pt:'Acende quando você terminar',fr:'S’allume quand tu as fini',fi:'Syttyy, kun olet valmis'},
    ariaDel:       {en:'Delete',de:'Löschen',nl:'Wissen',da:'Slet',sv:'Radera',no:'Slett',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Poista'}
  },/*STRINGS-END*/

  /*WORDS-BEGIN*/WORDS: {
    en: {1:'one',2:'two',3:'three',4:'four',5:'five',6:'six',7:'seven',8:'eight',9:'nine',10:'ten',11:'eleven',12:'twelve',13:'thirteen',14:'fourteen',15:'fifteen',16:'sixteen',17:'seventeen',18:'eighteen',19:'nineteen',20:'twenty',21:'twenty-one',22:'twenty-two',23:'twenty-three',24:'twenty-four',25:'twenty-five',26:'twenty-six',27:'twenty-seven',28:'twenty-eight',29:'twenty-nine',30:'thirty',31:'thirty-one',32:'thirty-two',33:'thirty-three',34:'thirty-four',35:'thirty-five',36:'thirty-six',37:'thirty-seven',38:'thirty-eight',39:'thirty-nine',40:'forty',41:'forty-one',42:'forty-two',43:'forty-three',44:'forty-four',45:'forty-five',46:'forty-six',47:'forty-seven',48:'forty-eight',49:'forty-nine',50:'fifty',51:'fifty-one',52:'fifty-two',53:'fifty-three',54:'fifty-four',55:'fifty-five',56:'fifty-six',57:'fifty-seven',58:'fifty-eight',59:'fifty-nine',60:'sixty',61:'sixty-one',62:'sixty-two',63:'sixty-three',64:'sixty-four',65:'sixty-five',66:'sixty-six',67:'sixty-seven',68:'sixty-eight',69:'sixty-nine',70:'seventy',71:'seventy-one',72:'seventy-two',73:'seventy-three',74:'seventy-four',75:'seventy-five',76:'seventy-six',77:'seventy-seven',78:'seventy-eight',79:'seventy-nine',80:'eighty',81:'eighty-one',82:'eighty-two',83:'eighty-three',84:'eighty-four',85:'eighty-five',86:'eighty-six',87:'eighty-seven',88:'eighty-eight',89:'eighty-nine',90:'ninety',91:'ninety-one',92:'ninety-two',93:'ninety-three',94:'ninety-four',95:'ninety-five',96:'ninety-six',97:'ninety-seven',98:'ninety-eight',99:'ninety-nine'},
    de: {1:'eins',2:'zwei',3:'drei',4:'vier',5:'fünf',6:'sechs',7:'sieben',8:'acht',9:'neun',10:'zehn',11:'elf',12:'zwölf',13:'dreizehn',14:'vierzehn',15:'fünfzehn',16:'sechzehn',17:'siebzehn',18:'achtzehn',19:'neunzehn',20:'zwanzig',21:'einundzwanzig',22:'zweiundzwanzig',23:'dreiundzwanzig',24:'vierundzwanzig',25:'fünfundzwanzig',26:'sechsundzwanzig',27:'siebenundzwanzig',28:'achtundzwanzig',29:'neunundzwanzig',30:'dreißig',31:'einunddreißig',32:'zweiunddreißig',33:'dreiunddreißig',34:'vierunddreißig',35:'fünfunddreißig',36:'sechsunddreißig',37:'siebenunddreißig',38:'achtunddreißig',39:'neununddreißig',40:'vierzig',41:'einundvierzig',42:'zweiundvierzig',43:'dreiundvierzig',44:'vierundvierzig',45:'fünfundvierzig',46:'sechsundvierzig',47:'siebenundvierzig',48:'achtundvierzig',49:'neunundvierzig',50:'fünfzig',51:'einundfünfzig',52:'zweiundfünfzig',53:'dreiundfünfzig',54:'vierundfünfzig',55:'fünfundfünfzig',56:'sechsundfünfzig',57:'siebenundfünfzig',58:'achtundfünfzig',59:'neunundfünfzig',60:'sechzig',61:'einundsechzig',62:'zweiundsechzig',63:'dreiundsechzig',64:'vierundsechzig',65:'fünfundsechzig',66:'sechsundsechzig',67:'siebenundsechzig',68:'achtundsechzig',69:'neunundsechzig',70:'siebzig',71:'einundsiebzig',72:'zweiundsiebzig',73:'dreiundsiebzig',74:'vierundsiebzig',75:'fünfundsiebzig',76:'sechsundsiebzig',77:'siebenundsiebzig',78:'achtundsiebzig',79:'neunundsiebzig',80:'achtzig',81:'einundachtzig',82:'zweiundachtzig',83:'dreiundachtzig',84:'vierundachtzig',85:'fünfundachtzig',86:'sechsundachtzig',87:'siebenundachtzig',88:'achtundachtzig',89:'neunundachtzig',90:'neunzig',91:'einundneunzig',92:'zweiundneunzig',93:'dreiundneunzig',94:'vierundneunzig',95:'fünfundneunzig',96:'sechsundneunzig',97:'siebenundneunzig',98:'achtundneunzig',99:'neunundneunzig'},
    nl: {1:'een',2:'twee',3:'drie',4:'vier',5:'vijf',6:'zes',7:'zeven',8:'acht',9:'negen',10:'tien',11:'elf',12:'twaalf',13:'dertien',14:'veertien',15:'vijftien',16:'zestien',17:'zeventien',18:'achttien',19:'negentien',20:'twintig',21:'eenentwintig',22:'tweeëntwintig',23:'drieëntwintig',24:'vierentwintig',25:'vijfentwintig',26:'zesentwintig',27:'zevenentwintig',28:'achtentwintig',29:'negenentwintig',30:'dertig',31:'eenendertig',32:'tweeëndertig',33:'drieëndertig',34:'vierendertig',35:'vijfendertig',36:'zesendertig',37:'zevenendertig',38:'achtendertig',39:'negenendertig',40:'veertig',41:'eenenveertig',42:'tweeënveertig',43:'drieënveertig',44:'vierenveertig',45:'vijfenveertig',46:'zesenveertig',47:'zevenenveertig',48:'achtenveertig',49:'negenenveertig',50:'vijftig',51:'eenenvijftig',52:'tweeënvijftig',53:'drieënvijftig',54:'vierenvijftig',55:'vijfenvijftig',56:'zesenvijftig',57:'zevenenvijftig',58:'achtenvijftig',59:'negenenvijftig',60:'zestig',61:'eenenzestig',62:'tweeënzestig',63:'drieënzestig',64:'vierenzestig',65:'vijfenzestig',66:'zesenzestig',67:'zevenenzestig',68:'achtenzestig',69:'negenenzestig',70:'zeventig',71:'eenenzeventig',72:'tweeënzeventig',73:'drieënzeventig',74:'vierenzeventig',75:'vijfenzeventig',76:'zesenzeventig',77:'zevenenzeventig',78:'achtenzeventig',79:'negenenzeventig',80:'tachtig',81:'eenentachtig',82:'tweeëntachtig',83:'drieëntachtig',84:'vierentachtig',85:'vijfentachtig',86:'zesentachtig',87:'zevenentachtig',88:'achtentachtig',89:'negenentachtig',90:'negentig',91:'eenennegentig',92:'tweeënnegentig',93:'drieënnegentig',94:'vierennegentig',95:'vijfennegentig',96:'zesennegentig',97:'zevenennegentig',98:'achtennegentig',99:'negenennegentig'},
    da: {1:'en',2:'to',3:'tre',4:'fire',5:'fem',6:'seks',7:'syv',8:'otte',9:'ni',10:'ti',11:'elleve',12:'tolv',13:'tretten',14:'fjorten',15:'femten',16:'seksten',17:'sytten',18:'atten',19:'nitten',20:'tyve',21:'enogtyve',22:'toogtyve',23:'treogtyve',24:'fireogtyve',25:'femogtyve',26:'seksogtyve',27:'syvogtyve',28:'otteogtyve',29:'niogtyve',30:'tredive',31:'enogtredive',32:'toogtredive',33:'treogtredive',34:'fireogtredive',35:'femogtredive',36:'seksogtredive',37:'syvogtredive',38:'otteogtredive',39:'niogtredive',40:'fyrre',41:'enogfyrre',42:'toogfyrre',43:'treogfyrre',44:'fireogfyrre',45:'femogfyrre',46:'seksogfyrre',47:'syvogfyrre',48:'otteogfyrre',49:'niogfyrre',50:'halvtreds',51:'enoghalvtreds',52:'tooghalvtreds',53:'treoghalvtreds',54:'fireoghalvtreds',55:'femoghalvtreds',56:'seksoghalvtreds',57:'syvoghalvtreds',58:'otteoghalvtreds',59:'nioghalvtreds',60:'tres',61:'enogtres',62:'toogtres',63:'treogtres',64:'fireogtres',65:'femogtres',66:'seksogtres',67:'syvogtres',68:'otteogtres',69:'niogtres',70:'halvfjerds',71:'enoghalvfjerds',72:'tooghalvfjerds',73:'treoghalvfjerds',74:'fireoghalvfjerds',75:'femoghalvfjerds',76:'seksoghalvfjerds',77:'syvoghalvfjerds',78:'otteoghalvfjerds',79:'nioghalvfjerds',80:'firs',81:'enogfirs',82:'toogfirs',83:'treogfirs',84:'fireogfirs',85:'femogfirs',86:'seksogfirs',87:'syvogfirs',88:'otteogfirs',89:'niogfirs',90:'halvfems',91:'enoghalvfems',92:'tooghalvfems',93:'treoghalvfems',94:'fireoghalvfems',95:'femoghalvfems',96:'seksoghalvfems',97:'syvoghalvfems',98:'otteoghalvfems',99:'nioghalvfems'},
    sv: {1:'ett',2:'två',3:'tre',4:'fyra',5:'fem',6:'sex',7:'sju',8:'åtta',9:'nio',10:'tio',11:'elva',12:'tolv',13:'tretton',14:'fjorton',15:'femton',16:'sexton',17:'sjutton',18:'arton',19:'nitton',20:'tjugo',21:'tjugoett',22:'tjugotvå',23:'tjugotre',24:'tjugofyra',25:'tjugofem',26:'tjugosex',27:'tjugosju',28:'tjugoåtta',29:'tjugonio',30:'trettio',31:'trettioett',32:'trettiotvå',33:'trettiotre',34:'trettiofyra',35:'trettiofem',36:'trettiosex',37:'trettiosju',38:'trettioåtta',39:'trettionio',40:'fyrtio',41:'fyrtioett',42:'fyrtiotvå',43:'fyrtiotre',44:'fyrtiofyra',45:'fyrtiofem',46:'fyrtiosex',47:'fyrtiosju',48:'fyrtioåtta',49:'fyrtionio',50:'femtio',51:'femtioett',52:'femtiotvå',53:'femtiotre',54:'femtiofyra',55:'femtiofem',56:'femtiosex',57:'femtiosju',58:'femtioåtta',59:'femtionio',60:'sextio',61:'sextioett',62:'sextiotvå',63:'sextiotre',64:'sextiofyra',65:'sextiofem',66:'sextiosex',67:'sextiosju',68:'sextioåtta',69:'sextionio',70:'sjuttio',71:'sjuttioett',72:'sjuttiotvå',73:'sjuttiotre',74:'sjuttiofyra',75:'sjuttiofem',76:'sjuttiosex',77:'sjuttiosju',78:'sjuttioåtta',79:'sjuttionio',80:'åttio',81:'åttioett',82:'åttiotvå',83:'åttiotre',84:'åttiofyra',85:'åttiofem',86:'åttiosex',87:'åttiosju',88:'åttioåtta',89:'åttionio',90:'nittio',91:'nittioett',92:'nittiotvå',93:'nittiotre',94:'nittiofyra',95:'nittiofem',96:'nittiosex',97:'nittiosju',98:'nittioåtta',99:'nittionio'},
    no: {1:'en',2:'to',3:'tre',4:'fire',5:'fem',6:'seks',7:'sju',8:'åtte',9:'ni',10:'ti',11:'elleve',12:'tolv',13:'tretten',14:'fjorten',15:'femten',16:'seksten',17:'sytten',18:'atten',19:'nitten',20:'tjue',21:'tjueen',22:'tjueto',23:'tjuetre',24:'tjuefire',25:'tjuefem',26:'tjueseks',27:'tjuesju',28:'tjueåtte',29:'tjueni',30:'tretti',31:'trettien',32:'trettito',33:'trettitre',34:'trettifire',35:'trettifem',36:'trettiseks',37:'trettisju',38:'trettiåtte',39:'trettini',40:'førti',41:'førtien',42:'førtito',43:'førtitre',44:'førtifire',45:'førtifem',46:'førtiseks',47:'førtisju',48:'førtiåtte',49:'førtini',50:'femti',51:'femtien',52:'femtito',53:'femtitre',54:'femtifire',55:'femtifem',56:'femtiseks',57:'femtisju',58:'femtiåtte',59:'femtini',60:'seksti',61:'sekstien',62:'sekstito',63:'sekstitre',64:'sekstifire',65:'sekstifem',66:'sekstiseks',67:'sekstisju',68:'sekstiåtte',69:'sekstini',70:'sytti',71:'syttien',72:'syttito',73:'syttitre',74:'syttifire',75:'syttifem',76:'syttiseks',77:'syttisju',78:'syttiåtte',79:'syttini',80:'åtti',81:'åttien',82:'åttito',83:'åttitre',84:'åttifire',85:'åttifem',86:'åttiseks',87:'åttisju',88:'åttiåtte',89:'åttini',90:'nitti',91:'nittien',92:'nittito',93:'nittitre',94:'nittifire',95:'nittifem',96:'nittiseks',97:'nittisju',98:'nittiåtte',99:'nittini'},
    es: {1:'uno',2:'dos',3:'tres',4:'cuatro',5:'cinco',6:'seis',7:'siete',8:'ocho',9:'nueve',10:'diez',11:'once',12:'doce',13:'trece',14:'catorce',15:'quince',16:'dieciséis',17:'diecisiete',18:'dieciocho',19:'diecinueve',20:'veinte',21:'veintiuno',22:'veintidós',23:'veintitrés',24:'veinticuatro',25:'veinticinco',26:'veintiséis',27:'veintisiete',28:'veintiocho',29:'veintinueve',30:'treinta',31:'treinta y uno',32:'treinta y dos',33:'treinta y tres',34:'treinta y cuatro',35:'treinta y cinco',36:'treinta y seis',37:'treinta y siete',38:'treinta y ocho',39:'treinta y nueve',40:'cuarenta',41:'cuarenta y uno',42:'cuarenta y dos',43:'cuarenta y tres',44:'cuarenta y cuatro',45:'cuarenta y cinco',46:'cuarenta y seis',47:'cuarenta y siete',48:'cuarenta y ocho',49:'cuarenta y nueve',50:'cincuenta',51:'cincuenta y uno',52:'cincuenta y dos',53:'cincuenta y tres',54:'cincuenta y cuatro',55:'cincuenta y cinco',56:'cincuenta y seis',57:'cincuenta y siete',58:'cincuenta y ocho',59:'cincuenta y nueve',60:'sesenta',61:'sesenta y uno',62:'sesenta y dos',63:'sesenta y tres',64:'sesenta y cuatro',65:'sesenta y cinco',66:'sesenta y seis',67:'sesenta y siete',68:'sesenta y ocho',69:'sesenta y nueve',70:'setenta',71:'setenta y uno',72:'setenta y dos',73:'setenta y tres',74:'setenta y cuatro',75:'setenta y cinco',76:'setenta y seis',77:'setenta y siete',78:'setenta y ocho',79:'setenta y nueve',80:'ochenta',81:'ochenta y uno',82:'ochenta y dos',83:'ochenta y tres',84:'ochenta y cuatro',85:'ochenta y cinco',86:'ochenta y seis',87:'ochenta y siete',88:'ochenta y ocho',89:'ochenta y nueve',90:'noventa',91:'noventa y uno',92:'noventa y dos',93:'noventa y tres',94:'noventa y cuatro',95:'noventa y cinco',96:'noventa y seis',97:'noventa y siete',98:'noventa y ocho',99:'noventa y nueve'},
    it: {1:'uno',2:'due',3:'tre',4:'quattro',5:'cinque',6:'sei',7:'sette',8:'otto',9:'nove',10:'dieci',11:'undici',12:'dodici',13:'tredici',14:'quattordici',15:'quindici',16:'sedici',17:'diciassette',18:'diciotto',19:'diciannove',20:'venti',21:'ventuno',22:'ventidue',23:'ventitré',24:'ventiquattro',25:'venticinque',26:'ventisei',27:'ventisette',28:'ventotto',29:'ventinove',30:'trenta',31:'trentuno',32:'trentadue',33:'trentatré',34:'trentaquattro',35:'trentacinque',36:'trentasei',37:'trentasette',38:'trentotto',39:'trentanove',40:'quaranta',41:'quarantuno',42:'quarantadue',43:'quarantatré',44:'quarantaquattro',45:'quarantacinque',46:'quarantasei',47:'quarantasette',48:'quarantotto',49:'quarantanove',50:'cinquanta',51:'cinquantuno',52:'cinquantadue',53:'cinquantatré',54:'cinquantaquattro',55:'cinquantacinque',56:'cinquantasei',57:'cinquantasette',58:'cinquantotto',59:'cinquantanove',60:'sessanta',61:'sessantuno',62:'sessantadue',63:'sessantatré',64:'sessantaquattro',65:'sessantacinque',66:'sessantasei',67:'sessantasette',68:'sessantotto',69:'sessantanove',70:'settanta',71:'settantuno',72:'settantadue',73:'settantatré',74:'settantaquattro',75:'settantacinque',76:'settantasei',77:'settantasette',78:'settantotto',79:'settantanove',80:'ottanta',81:'ottantuno',82:'ottantadue',83:'ottantatré',84:'ottantaquattro',85:'ottantacinque',86:'ottantasei',87:'ottantasette',88:'ottantotto',89:'ottantanove',90:'novanta',91:'novantuno',92:'novantadue',93:'novantatré',94:'novantaquattro',95:'novantacinque',96:'novantasei',97:'novantasette',98:'novantotto',99:'novantanove'},
    pt: {1:'um',2:'dois',3:'três',4:'quatro',5:'cinco',6:'seis',7:'sete',8:'oito',9:'nove',10:'dez',11:'onze',12:'doze',13:'treze',14:'quatorze',15:'quinze',16:'dezesseis',17:'dezessete',18:'dezoito',19:'dezenove',20:'vinte',21:'vinte e um',22:'vinte e dois',23:'vinte e três',24:'vinte e quatro',25:'vinte e cinco',26:'vinte e seis',27:'vinte e sete',28:'vinte e oito',29:'vinte e nove',30:'trinta',31:'trinta e um',32:'trinta e dois',33:'trinta e três',34:'trinta e quatro',35:'trinta e cinco',36:'trinta e seis',37:'trinta e sete',38:'trinta e oito',39:'trinta e nove',40:'quarenta',41:'quarenta e um',42:'quarenta e dois',43:'quarenta e três',44:'quarenta e quatro',45:'quarenta e cinco',46:'quarenta e seis',47:'quarenta e sete',48:'quarenta e oito',49:'quarenta e nove',50:'cinquenta',51:'cinquenta e um',52:'cinquenta e dois',53:'cinquenta e três',54:'cinquenta e quatro',55:'cinquenta e cinco',56:'cinquenta e seis',57:'cinquenta e sete',58:'cinquenta e oito',59:'cinquenta e nove',60:'sessenta',61:'sessenta e um',62:'sessenta e dois',63:'sessenta e três',64:'sessenta e quatro',65:'sessenta e cinco',66:'sessenta e seis',67:'sessenta e sete',68:'sessenta e oito',69:'sessenta e nove',70:'setenta',71:'setenta e um',72:'setenta e dois',73:'setenta e três',74:'setenta e quatro',75:'setenta e cinco',76:'setenta e seis',77:'setenta e sete',78:'setenta e oito',79:'setenta e nove',80:'oitenta',81:'oitenta e um',82:'oitenta e dois',83:'oitenta e três',84:'oitenta e quatro',85:'oitenta e cinco',86:'oitenta e seis',87:'oitenta e sete',88:'oitenta e oito',89:'oitenta e nove',90:'noventa',91:'noventa e um',92:'noventa e dois',93:'noventa e três',94:'noventa e quatro',95:'noventa e cinco',96:'noventa e seis',97:'noventa e sete',98:'noventa e oito',99:'noventa e nove'},
    fr: {1:'un',2:'deux',3:'trois',4:'quatre',5:'cinq',6:'six',7:'sept',8:'huit',9:'neuf',10:'dix',11:'onze',12:'douze',13:'treize',14:'quatorze',15:'quinze',16:'seize',17:'dix-sept',18:'dix-huit',19:'dix-neuf',20:'vingt',21:'vingt-et-un',22:'vingt-deux',23:'vingt-trois',24:'vingt-quatre',25:'vingt-cinq',26:'vingt-six',27:'vingt-sept',28:'vingt-huit',29:'vingt-neuf',30:'trente',31:'trente-et-un',32:'trente-deux',33:'trente-trois',34:'trente-quatre',35:'trente-cinq',36:'trente-six',37:'trente-sept',38:'trente-huit',39:'trente-neuf',40:'quarante',41:'quarante-et-un',42:'quarante-deux',43:'quarante-trois',44:'quarante-quatre',45:'quarante-cinq',46:'quarante-six',47:'quarante-sept',48:'quarante-huit',49:'quarante-neuf',50:'cinquante',51:'cinquante-et-un',52:'cinquante-deux',53:'cinquante-trois',54:'cinquante-quatre',55:'cinquante-cinq',56:'cinquante-six',57:'cinquante-sept',58:'cinquante-huit',59:'cinquante-neuf',60:'soixante',61:'soixante-et-un',62:'soixante-deux',63:'soixante-trois',64:'soixante-quatre',65:'soixante-cinq',66:'soixante-six',67:'soixante-sept',68:'soixante-huit',69:'soixante-neuf',70:'soixante-dix',71:'soixante-et-onze',72:'soixante-douze',73:'soixante-treize',74:'soixante-quatorze',75:'soixante-quinze',76:'soixante-seize',77:'soixante-dix-sept',78:'soixante-dix-huit',79:'soixante-dix-neuf',80:'quatre-vingts',81:'quatre-vingt-un',82:'quatre-vingt-deux',83:'quatre-vingt-trois',84:'quatre-vingt-quatre',85:'quatre-vingt-cinq',86:'quatre-vingt-six',87:'quatre-vingt-sept',88:'quatre-vingt-huit',89:'quatre-vingt-neuf',90:'quatre-vingt-dix',91:'quatre-vingt-onze',92:'quatre-vingt-douze',93:'quatre-vingt-treize',94:'quatre-vingt-quatorze',95:'quatre-vingt-quinze',96:'quatre-vingt-seize',97:'quatre-vingt-dix-sept',98:'quatre-vingt-dix-huit',99:'quatre-vingt-dix-neuf'},
    fi: {1:'yksi',2:'kaksi',3:'kolme',4:'neljä',5:'viisi',6:'kuusi',7:'seitsemän',8:'kahdeksan',9:'yhdeksän',10:'kymmenen',11:'yksitoista',12:'kaksitoista',13:'kolmetoista',14:'neljätoista',15:'viisitoista',16:'kuusitoista',17:'seitsemäntoista',18:'kahdeksantoista',19:'yhdeksäntoista',20:'kaksikymmentä',21:'kaksikymmentäyksi',22:'kaksikymmentäkaksi',23:'kaksikymmentäkolme',24:'kaksikymmentäneljä',25:'kaksikymmentäviisi',26:'kaksikymmentäkuusi',27:'kaksikymmentäseitsemän',28:'kaksikymmentäkahdeksan',29:'kaksikymmentäyhdeksän',30:'kolmekymmentä',31:'kolmekymmentäyksi',32:'kolmekymmentäkaksi',33:'kolmekymmentäkolme',34:'kolmekymmentäneljä',35:'kolmekymmentäviisi',36:'kolmekymmentäkuusi',37:'kolmekymmentäseitsemän',38:'kolmekymmentäkahdeksan',39:'kolmekymmentäyhdeksän',40:'neljäkymmentä',41:'neljäkymmentäyksi',42:'neljäkymmentäkaksi',43:'neljäkymmentäkolme',44:'neljäkymmentäneljä',45:'neljäkymmentäviisi',46:'neljäkymmentäkuusi',47:'neljäkymmentäseitsemän',48:'neljäkymmentäkahdeksan',49:'neljäkymmentäyhdeksän',50:'viisikymmentä',51:'viisikymmentäyksi',52:'viisikymmentäkaksi',53:'viisikymmentäkolme',54:'viisikymmentäneljä',55:'viisikymmentäviisi',56:'viisikymmentäkuusi',57:'viisikymmentäseitsemän',58:'viisikymmentäkahdeksan',59:'viisikymmentäyhdeksän',60:'kuusikymmentä',61:'kuusikymmentäyksi',62:'kuusikymmentäkaksi',63:'kuusikymmentäkolme',64:'kuusikymmentäneljä',65:'kuusikymmentäviisi',66:'kuusikymmentäkuusi',67:'kuusikymmentäseitsemän',68:'kuusikymmentäkahdeksan',69:'kuusikymmentäyhdeksän',70:'seitsemänkymmentä',71:'seitsemänkymmentäyksi',72:'seitsemänkymmentäkaksi',73:'seitsemänkymmentäkolme',74:'seitsemänkymmentäneljä',75:'seitsemänkymmentäviisi',76:'seitsemänkymmentäkuusi',77:'seitsemänkymmentäseitsemän',78:'seitsemänkymmentäkahdeksan',79:'seitsemänkymmentäyhdeksän',80:'kahdeksankymmentä',81:'kahdeksankymmentäyksi',82:'kahdeksankymmentäkaksi',83:'kahdeksankymmentäkolme',84:'kahdeksankymmentäneljä',85:'kahdeksankymmentäviisi',86:'kahdeksankymmentäkuusi',87:'kahdeksankymmentäseitsemän',88:'kahdeksankymmentäkahdeksan',89:'kahdeksankymmentäyhdeksän',90:'yhdeksänkymmentä',91:'yhdeksänkymmentäyksi',92:'yhdeksänkymmentäkaksi',93:'yhdeksänkymmentäkolme',94:'yhdeksänkymmentäneljä',95:'yhdeksänkymmentäviisi',96:'yhdeksänkymmentäkuusi',97:'yhdeksänkymmentäseitsemän',98:'yhdeksänkymmentäkahdeksan',99:'yhdeksänkymmentäyhdeksän'}
  },/*WORDS-END*/

  defaults: { task: 'ten', glass: 'clear' },
  settings: [
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'ten', labelKey: 'tTen' }, { value: 'one', labelKey: 'tOne' }, { value: 'jumps', labelKey: 'tJumps' }, { value: 'nod', labelKey: 'tNod' }] },
    { key: 'glass', type: 'choice', labelKey: 'setGlass', options: [{ value: 'clear', labelKey: 'gClear' }, { value: 'frost', labelKey: 'gFrost' }] }
  ],
  OK_MS: 500, FAST: false,
  ARROW: { D: '↓', U: '↑', R: '→', L: '←' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._cnt = 'd';
    injectNineCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return NineStopCore.locale(((this.api && this.api.lang) || 'en')); },
  _face: function () { return NineStopCore.faceOf(this._setting('task')); },
  _frost: function () { return this._setting('glass') === 'frost'; },
  _key: function () { return this._face(); },
  _word: function (n) { var w = this.WORDS[this._loc()]; return (w && w[n]) || String(n); },
  _arrows: function (cards) { var s = '', self = this; for (var i = 0; i < cards.length; i++) s += self.ARROW[cards.charAt(i)]; return s; },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = NineStopCore.ids(this._face()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = NineStopCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      this._order = C.plan(this._face(), Math.random, prevIds).order.map(function (id) { return pool.indexOf(id); }); this._orderForPool = pool; this._pass = pass;
    }
    var id = pool[this._order[pos]], pa = { msg: this._promptText(C.round(this._face(), id)) }; this._pa = pa;
    return {
      id: 'ninestop.' + this._loc() + '.' + this._key() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r) {
    if (r.kind === 'count') return this._t('instrCount');
    if (r.kind === 'follow' || r.kind === 'mystery') return this._t('instrFollow');
    if (r.kind === 'nod') return this._t('instrNod');
    return this._t('instrMake');
  },
  _start: function (id, pos) {
    var C = NineStopCore;
    this._clearTimers(); this._view = {}; this._pos = pos || 0; this._busy = false; this._cnt = 'd'; this._dragUntil = 0;
    this.st = C.newState(C.round(this._face(), id));
    var line = this._promptText(this.st.r); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool();
    if (!this.st) this._start(this._pool[0], 0);
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
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ns-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="ns-q"></div><div class="ns-tray" role="group"></div><div class="ns-main"><div class="ns-tubes" role="group"></div><div class="ns-board is-side"></div></div><div class="ns-pad" role="group"></div><div class="ns-foot"></div><p class="ns-note" aria-live="polite"></p><div class="ns-board is-below"></div>';
    wrap.addEventListener('keydown', function (e) { self._keydown(e); });
    this._q = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _paint_: function () {
    if (!this._wrap) return;
    var C = NineStopCore, st = this.st, r = st.r, L = C.layout(this._width()), v = this._view, self = this;
    var h = C.hint(st), shown = !!(v.checked && (st.show > 0)), strong = st.show >= 2 && !st.done;
    this._wrap.className = 'ns-wrap ' + (L.wide ? 'is-wide' : 'is-narrow') + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + r.kind;
    /* ---- the question card ---- */
    var q = this._q('.ns-q'); q.innerHTML = '';
    var num = this.api.el('span', 'ns-qnum'), lab = this.api.el('span', 'ns-qlab');
    if (r.kind === 'count') { num.textContent = r.start + ' → ' + r.end; num.setAttribute('aria-label', this._t('pCount', { a: r.start, b: r.end })); lab.textContent = ''; }
    else if (r.kind === 'nod') { num.textContent = String(r.n); lab.textContent = st.done ? '' : this._t('lab_' + r.labels[st.phase]); }
    else {
      num.textContent = String(C.base(st));
      lab.textContent = r.kind === 'ten' ? this._t(r.step > 0 ? 'promptTenMore' : 'promptTenLess') : r.kind === 'one' ? this._t(r.step > 0 ? 'promptOneMore' : 'promptOneLess') : r.kind === 'follow' ? this._t('pFollow') : this._t('pMystery');
    }
    q.appendChild(num); q.appendChild(lab);
    if (r.kind === 'mystery' && st.ghost != null && st.done) { var gh = this.api.el('span', 'ns-ghostplate'); gh.textContent = String(st.ghost); gh.setAttribute('aria-label', this._t('ariaPinned', { n: st.ghost })); q.appendChild(gh); }
    if (r.kind === 'count' && st.ran != null && !st.done) { var pp = this.api.el('span', 'ns-pencil'); pp.textContent = String(st.ran); pp.setAttribute('aria-label', this._t('ariaLanded', { n: st.ran })); q.appendChild(pp); }
    /* ---- the arrow cards (follow / mystery) or the two count boxes ---- */
    var tray = this._q('.ns-tray'); tray.innerHTML = ''; tray.style.display = 'none';
    if (r.kind === 'follow' || r.kind === 'mystery') {
      tray.style.display = '';
      var cards = C.cardsOf(st);
      for (var i = 0; i < cards.length; i++) (function (i) {
        var dir = cards.charAt(i), played = st.played[i];
        var b = self._btn('ns-card is-' + dir + (played ? ' is-played' : '') + (shown && !played ? ' is-hint' : ''), 'card-' + i, self._t('ariaCard', { a: self._t('arr' + dir) }) + (played ? ' — ' + self._t('ariaPlayed') : ''), '<span class="ns-arrow">' + self.ARROW[dir] + '</span><span class="ns-emblem is-' + C.DATA.TUBE[dir] + '"></span>');
        b.disabled = st.done;
        b.addEventListener('click', function () { if (self._dragUntil && Date.now() < self._dragUntil) { self._dragUntil = 0; return; } self._play(i); });
        b.addEventListener('pointerdown', function (e) { self._dragCard(e, i, b); });
        tray.appendChild(b);
      })(i);
    } else if (r.kind === 'count') {
      tray.style.display = '';
      ['d', 'r'].forEach(function (w) {
        var dir = w === 'd' ? r.dirT : r.dirO;
        var b = self._btn('ns-cnt' + (self._cnt === w && !st.done ? ' is-on' : ''), 'cnt-' + w, self._t(w === 'd' ? 'ariaCntT' : 'ariaCntO', { a: self._t('arr' + dir), n: st.counts[w] || '' }), '<span class="ns-arrow">' + self.ARROW[dir] + '</span><span class="ns-cntval">' + (st.counts[w] || '') + '</span>');
        b.disabled = st.done; b.addEventListener('click', function () { self._cnt = w; self._paint(); }); tray.appendChild(b);
      });
    }
    /* ---- the two tubes ---- */
    var tubes = this._q('.ns-tubes'); tubes.innerHTML = '';
    var hidden = this._frost() && !st.reveal && !st.done, s = C.stepNow(st);
    ['t', 'o'].forEach(function (tube) {
      var n = st[tube], col = self.api.el('div', 'ns-col is-' + tube);
      var upb = self._btn('ns-handle is-up', 'up-' + tube, self._t(tube === 't' ? 'ariaUpT' : 'ariaUpO'), '<svg viewBox="0 0 40 24" aria-hidden="true"><path d="M8 18 L20 6 L32 18" fill="none" stroke="#3A2E1F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      upb.disabled = st.done || r.kind === 'count'; upb.addEventListener('click', function () { self._move(tube, 1); });
      var glass = self.api.el('div', 'ns-glass' + (hidden ? ' is-frost' : '') + (v.lid === tube ? ' is-bump' : '') + (v.glow === tube ? ' is-glow' : '') + (shown && !st.done && r.kind !== 'count' && r.kind !== 'follow' && r.kind !== 'mystery' && ((Math.abs(s.step) === 10 || s.trade) === (tube === 't')) ? ' is-glow' : ''));
      glass.setAttribute('role', 'img'); glass.setAttribute('aria-label', self._t(tube === 't' ? 'ariaTubeT' : 'ariaTubeO', { n: hidden ? '?' : n }) + (n >= 9 && !hidden ? ' — ' + self._t('ariaFull') : ''));
      glass.setAttribute('data-tube', tube);
      glass.appendChild(self.api.el('span', 'ns-lid'));
      var stack = self.api.el('div', 'ns-stack');
      for (var k = 0; k < n; k++) stack.appendChild(self.api.el('i', 'ns-blk is-' + tube + (k === n - 1 && shown && !st.done && !s.trade && (r.kind === 'ten' || r.kind === 'one' || r.kind === 'nod') && s.step === (tube === 't' ? -10 : -1) ? ' is-leave' : '')));
      /* miss 1: a ghost parcel shows what the step really is — one rod (one cube) in or out, never the number */
      if (shown && !strong && !st.done && !s.trade && (r.kind === 'ten' || r.kind === 'one' || r.kind === 'nod') && ((Math.abs(s.step) === 10) === (tube === 't')) && s.step > 0) stack.appendChild(self.api.el('i', 'ns-blk is-' + tube + ' is-ghost'));
      glass.appendChild(stack);
      glass.addEventListener('pointerdown', function (e) { self._dragTube(e, tube); });
      col.appendChild(glass);
      var dn = self._btn('ns-handle is-down', 'down-' + tube, self._t(tube === 't' ? 'ariaDownT' : 'ariaDownO'), '<svg viewBox="0 0 40 24" aria-hidden="true"><path d="M8 6 L20 18 L32 6" fill="none" stroke="#3A2E1F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      dn.disabled = st.done || r.kind === 'count'; dn.addEventListener('click', function () { self._move(tube, -1); });
      /* the two handles side by side under the tube: pull a block in, drop one out (none in count rounds — the tubes run the counted trip themselves) */
      if (r.kind !== 'count') { var hrow = self.api.el('div', 'ns-hrow'); hrow.appendChild(upb); hrow.appendChild(dn); col.appendChild(hrow); }
      /* the digit plate; a tens plate of 0 shows a faint dash (13 − 10 = 3, never "03") */
      var stays = strong && !st.done && r.kind !== 'count' && r.kind !== 'follow' && r.kind !== 'mystery' && !s.trade && ((Math.abs(s.step) === 10) ? tube === 'o' : tube === 't');
      var plate = self.api.el('span', 'ns-plate' + (stays ? ' is-ring' : '') + (st.done ? ' is-ok' : ''));
      plate.textContent = tube === 't' && n === 0 ? '–' : String(n); if (tube === 't' && n === 0) plate.className += ' is-blank';
      col.appendChild(plate);
      tubes.appendChild(col);
    });
    /* ---- the keypad (count the jumps) ---- */
    var pad = this._q('.ns-pad'); pad.innerHTML = ''; pad.style.display = r.kind === 'count' && !st.done ? '' : 'none';
    if (r.kind === 'count' && !st.done) ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var kb = self._btn('ns-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('ariaDel') : null, k === 'del' ? '⌫' : k);
      kb.addEventListener('click', function () { self._keyPress(k); }); pad.appendChild(kb);
    });
    /* ---- the board: the neighbour cross (number of the day) and the reward windows ---- */
    var side = this._q('.ns-board.is-side'), below = this._q('.ns-board.is-below');
    side.innerHTML = ''; below.innerHTML = '';
    var board = L.wide ? side : below; side.style.display = L.wide ? '' : 'none'; below.style.display = L.wide ? 'none' : '';
    this._board(board, L);
    /* ---- Check + the bubble ---- */
    var foot = this._q('.ns-foot'); foot.innerHTML = '';
    var ck = this._btn('ns-check', 'check', null); ck.textContent = this._t('check'); ck.disabled = st.done || !!this._busy;
    ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck);
    var note = this._q('.ns-note');
    if (v.msg) { note.textContent = v.msg; note.className = 'ns-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'ns-note is-hint'; }
    else if (h && v.checked) { note.textContent = this._t(h.key, h.args); note.className = 'ns-note is-hint'; }
    else { note.textContent = ''; note.className = 'ns-note'; }
  },
  /* the board: for the number of the day the cross of four neighbours; the three windows (ten frames, tallies, the word) light when the round is solved */
  _board: function (board, L) {
    var st = this.st, r = st.r, self = this;
    var show = r.kind === 'nod' ? r.n : r.answer, lit = st.done;
    if (r.kind === 'nod') {
      var cross = this.api.el('div', 'ns-cross'); cross.setAttribute('role', 'group'); cross.setAttribute('aria-label', this._t('ariaCross'));
      var cell = function (label, val, area, on) {
        var c = self.api.el('span', 'ns-frame is-' + area + (on ? ' is-on' : '') + (area !== 'c' && !on && !st.done && r.labels[st.phase] === label ? ' is-next' : ''));
        c.textContent = val == null ? '' : String(val); if (label) c.setAttribute('aria-label', self._t('lab_' + label) + (val == null ? '' : ': ' + val)); cross.appendChild(c);
      };
      var got = function (k) { return st.filled.length > k ? r.targets[k] : null; };
      cell('m10', got(0), 'n', st.filled.length > 0); cell('m1', got(1), 'w', st.filled.length > 1); cell(null, r.n, 'c', true); cell('p1', got(2), 'e', st.filled.length > 2); cell('p10', got(3), 's', st.filled.length > 3);
      board.appendChild(cross);
    }
    if (show == null) return;
    var wins = this.api.el('div', 'ns-windows' + (lit ? ' is-lit' : ''));
    /* ten frames */
    var fr = this.api.el('span', 'ns-win is-frames'); fr.setAttribute('role', 'img'); fr.setAttribute('aria-label', lit ? this._t('ariaFrames', { n: show }) : this._t('ariaDim'));
    var t = Math.floor(show / 10), o = show % 10, f, d;
    /* the windows stay EMPTY until the round is solved — dimmed frames or tallies of the answer would print it */
    if (lit) for (f = 0; f < t + (o ? 1 : 0); f++) { var tf = document.createElement('i'); tf.className = 'ns-tf'; for (d = 0; d < 10; d++) { var dot = document.createElement('b'); if (f < t || d < o) dot.className = 'is-on'; tf.appendChild(dot); } fr.appendChild(tf); }
    wins.appendChild(fr);
    /* tally marks: five-gates */
    var ta = this.api.el('span', 'ns-win is-tally'); ta.setAttribute('role', 'img'); ta.setAttribute('aria-label', lit ? this._t('ariaTally', { n: show }) : this._t('ariaDim'));
    var gates = lit ? Math.floor(show / 5) : 0, rest = lit ? show % 5 : 0, svg = '', x = 0;
    for (f = 0; f < gates; f++) { svg += '<g transform="translate(' + x + ',0)"><path d="M2 2V18M6 2V18M10 2V18M14 2V18M0 15L17 4" stroke="#3A2E1F" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>'; x += 21; }
    for (f = 0; f < rest; f++) { svg += '<path d="M' + (x + 2 + f * 4) + ' 2V18" stroke="#3A2E1F" stroke-width="1.8" stroke-linecap="round"/>'; }
    var w = Math.max(20, x + rest * 4 + 4);
    ta.innerHTML = '<svg viewBox="0 0 ' + w + ' 20" style="width:' + Math.min(w, 400) + 'px" aria-hidden="true">' + svg + '</svg>';
    wins.appendChild(ta);
    /* the number word */
    var wd = this.api.el('span', 'ns-win is-word'); wd.textContent = lit ? this._word(show) : ''; wd.setAttribute('aria-label', lit ? this._t('ariaWord', { w: this._word(show) }) : this._t('ariaDim'));
    wins.appendChild(wd);
    board.appendChild(wins);
  },

  /* ---------------- actions ---------------- */
  _edit: function (extra) { this._clearTimers(); this._busy = false; this._view = extra || {}; this._paint(); },
  _move: function (tube, dir) {
    var st = this.st, self = this; if (this._busy || st.done) return false;
    var res = (dir > 0 ? NineStopCore.up : NineStopCore.down)(st, tube); if (!res) return false;
    if (res === 'lid') { this.api.sound(120); this._edit({ lid: tube, note: this._t(tube === 'o' && st.r.kind !== 'ten' ? 'hintLidOnes' : 'hintLid') }); if (!this.FAST) this._later(function () { self._view.lid = null; self._paint(); }, 420); return false; }
    if (res === 'empty') { this.api.sound(160); return false; }
    this.api.sound(tube === 't' ? (dir > 0 ? 330 : 280) : (dir > 0 ? 620 : 520)); this._edit(); return true;
  },
  _play: function (i, tube) {
    var st = this.st, self = this; if (this._busy || st.done) return;
    var res = NineStopCore.playCard(st, i, tube);
    if (res === 'wrongTube') { var own = NineStopCore.DATA.TUBE[NineStopCore.cardsOf(st).charAt(i)]; this.api.sound(150); this._edit({ glow: own, note: this._t('hintWrongTube') }); if (!this.FAST) this._later(function () { self._view.glow = null; self._paint(); }, 600); return; }
    if (res === 'lid') { var tb = NineStopCore.DATA.TUBE[NineStopCore.cardsOf(st).charAt(i)]; this.api.sound(120); this._edit({ lid: tb, note: this._t(tb === 'o' ? 'hintLidOnes' : 'hintLid') }); return; }
    if (res === 'played' || res === 'undone') { this.api.sound(res === 'played' ? 560 : 420); this._edit(); }
  },
  /* drag a card onto a tube: on its own tube it plays, on the other it slides back and its own tube glows */
  _dragCard: function (e, i, el) {
    var self = this; if (this._busy || this.st.done || (e.button != null && e.button !== 0)) return;
    var x0 = e.clientX, y0 = e.clientY, ghost = null, moved = false;
    var move = function (ev) {
      if (!moved && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 8) return;
      if (!moved) { moved = true; ghost = el.cloneNode(true); ghost.className += ' ns-ghost'; document.body.appendChild(ghost); }
      ghost.style.left = (ev.clientX - 26) + 'px'; ghost.style.top = (ev.clientY - 26) + 'px';
    };
    var up = function (ev) {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      if (!moved) return;
      self._dragUntil = Date.now() + 300; if (ghost) ghost.remove();
      var hit = document.elementsFromPoint(ev.clientX, ev.clientY).map(function (n) { return n.closest && n.closest('[data-tube]'); }).filter(Boolean)[0];
      if (hit) self._play(i, hit.getAttribute('data-tube'));
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  /* drag the glass itself: one block per 28 px of travel, no momentum */
  _dragTube: function (e, tube) {
    var self = this; if (this._busy || this.st.done || this.st.r.kind === 'count' || (e.button != null && e.button !== 0)) return;
    var y0 = e.clientY, steps = 0;
    var move = function (ev) { var want = Math.trunc((y0 - ev.clientY) / 28); while (steps < want) { steps++; self._move(tube, 1); } while (steps > want) { steps--; self._move(tube, -1); } };
    var up = function () { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  _keyPress: function (k) {
    var C = NineStopCore, st = this.st; if (this._busy || st.done) return;
    var ok = k === 'del' ? C.clearCount(st, this._cnt) : C.typeCount(st, this._cnt, k);
    if (ok && k !== 'del' && this._cnt === 'd' && st.counts.r === '') this._cnt = 'r';
    if (ok) { this.api.sound(500); this._edit(); }
  },
  _keydown: function (e) {
    var a = document.activeElement, k = e.key;
    var tube = a && a.closest && a.closest('.ns-col') ? (a.closest('.ns-col.is-t') ? 't' : 'o') : null;
    if (!tube) return;
    if (k === 'ArrowUp') { this._move(tube, 1); e.preventDefault(); }
    else if (k === 'ArrowDown') { this._move(tube, -1); e.preventDefault(); }
  },
  _check: function () {
    var C = NineStopCore, st = this.st, r = st.r;
    if (this._busy || st.done) return;
    var a = C.check(st); if (!a) return;
    if (a.result === 'none') { this._view = { checked: true }; this.api.sound(200); this._paint(); this.api.announce(this._q('.ns-note').textContent || ''); return; }
    if (a.result === 'step') { this._view = { checked: true }; this.api.sound(760); this._paint(); return; }
    this._view = { checked: true };
    if (a.result === 'ok') {
      var msg = this._okText(r); this._view.msg = msg; this.api.sound(880); this._paint(); this.api.announce(msg);
      this._advance(msg.length * 60 + 2400);
    } else { this.api.sound(220); this._paint(); this.api.announce(this._q('.ns-note').textContent || ''); }
  },
  _okText: function (r) {
    if (r.kind === 'ten') return this._t(r.step > 0 ? 'okTenMore' : 'okTenLess', { start: r.start, answer: r.answer });
    if (r.kind === 'one') return this._t(r.step > 0 ? 'okOneMore' : 'okOneLess', { start: r.start, answer: r.answer });
    if (r.kind === 'follow') return this._t('okFollow', { start: r.start, arrows: this._arrows(r.cards), answer: r.answer });
    if (r.kind === 'mystery') return this._t('okMystery', { answer: r.answer });
    if (r.kind === 'count') return this._t(r.dirT === 'D' ? 'okCountDown' : 'okCountUp', { a: r.start, b: r.end, d: r.d, r: r.r });
    return this._t('okNod', { n: r.n, word: this._word(r.n), m10: r.targets[0], p10: r.targets[3], m1: r.targets[1], p1: r.targets[2] });
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var nsCssDone = false;
function injectNineCSS() {
  if (nsCssDone || typeof document === 'undefined') return;
  nsCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ns-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .ns-wrap:focus{outline:none;}'
  /* the question card */
  + '.ns-q{position:relative;display:flex;align-items:center;justify-content:center;gap:14px;min-height:56px;padding:4px 16px;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #3A2E1F,0 3px 0 #C9B79A;max-width:100%;box-sizing:border-box;flex-wrap:wrap;}'
  + '.ns-qnum{font-family:' + H + ';font-weight:800;font-size:44px;line-height:1;color:#146B5E;white-space:nowrap;} .ns-qlab{font-family:' + B + ';font-weight:800;font-size:19px;color:#3A2E1F;} .ns-qlab:empty{display:none;}'
  + '.ns-ghostplate,.ns-pencil{display:inline-flex;align-items:center;justify-content:center;min-width:44px;height:36px;padding:0 6px;border-radius:8px;border:2px dashed #9A8F80;font-family:' + H + ';font-weight:800;font-size:22px;color:#7A6F60;background:#F7F1E4;}'
  /* the tray of arrow cards / count boxes */
  + '.ns-tray{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;}'
  + '.ns-card{position:relative;width:56px;height:56px;border:0;border-radius:12px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #146B5E,0 3px 0 #0F5C4F;cursor:pointer;touch-action:none;} .ns-card .ns-arrow{font-family:' + H + ';font-weight:800;font-size:30px;line-height:56px;color:#146B5E;}'
  + '.ns-emblem{position:absolute;right:5px;bottom:5px;display:block;border-radius:2px;background:#1E8A78;box-shadow:inset 0 0 0 1px #0F4F45;} .ns-emblem.is-t{width:18px;height:5px;} .ns-emblem.is-o{width:7px;height:7px;background:#F2784B;box-shadow:inset 0 0 0 1px #9C3F1E;}'
  + '.ns-card.is-played{background:#D8CFBF;box-shadow:inset 0 0 0 3px #9A8F80;} .ns-card.is-played .ns-arrow{color:#9A8F80;} .ns-card.is-hint{box-shadow:inset 0 0 0 3px #146B5E,0 0 0 4px #F4CF62;} .ns-card:disabled{cursor:default;} .ns-ghost{position:fixed;z-index:50;pointer-events:none;opacity:.85;}'
  + '.ns-cnt{display:flex;align-items:center;gap:6px;height:56px;min-width:96px;padding:0 10px;border:0;border-radius:12px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #3A2E1F;cursor:pointer;} .ns-cnt.is-on{box-shadow:inset 0 0 0 4px #1E8A78,0 0 0 3px #F4CF62;} .ns-cnt .ns-arrow{font-family:' + H + ';font-weight:800;font-size:28px;color:#146B5E;} .ns-cntval{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:8px;background:#F2EBDD;box-shadow:inset 0 0 0 2px #B9AE9C;font-family:' + H + ';font-weight:800;font-size:26px;color:#3A2E1F;}'
  /* the tubes */
  + '.ns-main{display:flex;align-items:flex-start;justify-content:center;gap:22px;width:100%;}'
  + '.ns-tubes{display:flex;gap:16px;justify-content:center;}'
  + '.ns-col{display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.ns-hrow{display:flex;gap:4px;} .ns-handle{width:46px;height:44px;border:0;border-radius:12px;background:#E9D9BE;box-shadow:inset 0 0 0 3px #3A2E1F,0 3px 0 #8A6B42;cursor:pointer;padding:8px 6px;} .ns-handle svg{width:100%;height:100%;display:block;} .ns-handle:disabled{opacity:.4;cursor:default;}'
  + '.ns-glass{position:relative;width:96px;height:var(--ns-th,300px);border-radius:10px 10px 18px 18px;background:linear-gradient(90deg,rgba(255,255,255,.75) 0,rgba(214,234,240,.55) 30%,rgba(255,255,255,.4) 70%,rgba(214,234,240,.7) 100%);box-shadow:inset 0 0 0 3px #6E8A96,inset 6px 0 0 rgba(255,255,255,.6);touch-action:none;cursor:ns-resize;overflow:hidden;}'
  + '.ns-lid{position:absolute;left:-2px;right:-2px;top:0;height:10px;border-radius:6px;background:#3A2E1F;z-index:2;}'
  + '.ns-stack{position:absolute;left:0;right:0;bottom:6px;display:flex;flex-direction:column-reverse;align-items:center;gap:2px;}'
  + '.ns-blk{display:block;flex:none;border-radius:3px;} .ns-blk.is-t{width:80%;height:var(--ns-bh,28px);background:repeating-linear-gradient(90deg,#1E8A78 0,#1E8A78 calc(10% - 1px),#5FC2AF calc(10% - 1px),#5FC2AF 10%);box-shadow:inset 0 0 0 2px #0F4F45;} .ns-blk.is-o{width:var(--ns-bh,28px);height:var(--ns-bh,28px);background:#F2784B;box-shadow:inset 0 0 0 2px #9C3F1E,inset 0 4px 0 #F9A47F;}'
  + '.ns-blk.is-ghost{opacity:.45;outline:2px dashed #146B5E;outline-offset:1px;animation:nsFloat .9s ease-in-out infinite alternate;} @keyframes nsFloat{from{transform:translateY(-6px);}to{transform:translateY(0);}} .ns-blk.is-leave{outline:2px dashed #E0603A;outline-offset:1px;opacity:.6;}'
  + '.ns-glass.is-frost .ns-stack{visibility:hidden;} .ns-glass.is-frost{background:repeating-linear-gradient(135deg,#E6EEF1 0 6px,#DCE6EA 6px 12px);}'
  + '.ns-glass.is-bump{animation:nsBump .16s linear 2;} @keyframes nsBump{25%{transform:translateX(-3px);}75%{transform:translateX(3px);}} .ns-glass.is-glow{box-shadow:inset 0 0 0 3px #6E8A96,0 0 0 4px #F4CF62;}'
  + '.ns-plate{display:flex;align-items:center;justify-content:center;width:72px;height:54px;border-radius:12px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #3A2E1F;font-family:' + H + ';font-weight:800;font-size:46px;line-height:1;color:#3A2E1F;} .ns-plate.is-blank{color:#C9BFAE;} .ns-plate.is-ring{box-shadow:inset 0 0 0 3px #3A2E1F,0 0 0 5px #F4CF62;} .ns-plate.is-ok{color:#146B5E;}'
  /* the keypad */
  + '.ns-pad{display:grid;grid-template-columns:repeat(6,48px);gap:5px;} .ns-key{height:48px;border:0;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42;font-family:' + H + ';font-weight:800;font-size:22px;color:#3A2E1F;cursor:pointer;}'
  /* the board */
  + '.ns-board{display:flex;flex-direction:column;align-items:center;gap:10px;} .ns-board.is-side{width:240px;flex:none;} .ns-board.is-below{width:100%;}'
  + '.ns-cross{display:grid;grid-template-columns:repeat(3,64px);grid-template-rows:repeat(3,48px);gap:4px;} .ns-frame{display:flex;align-items:center;justify-content:center;border-radius:8px;border:2px dashed #B9AE9C;font-family:' + H + ';font-weight:800;font-size:22px;color:#3A2E1F;} .ns-frame.is-on{border:2px solid #146B5E;background:#E6F3F0;} .ns-frame.is-c{border:3px solid #3A2E1F;background:#FFFDF7;color:#146B5E;} .ns-frame.is-next{border-color:#F4CF62;border-style:solid;}'
  + '.ns-frame.is-n{grid-area:1/2;} .ns-frame.is-w{grid-area:2/1;} .ns-frame.is-c{grid-area:2/2;} .ns-frame.is-e{grid-area:2/3;} .ns-frame.is-s{grid-area:3/2;}'
  + '.ns-windows{display:flex;flex-direction:column;gap:6px;width:100%;opacity:.35;transition:opacity .3s;} .ns-windows.is-lit{opacity:1;}'
  + '.ns-win{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:3px;min-height:40px;padding:4px;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #C9B79A;box-sizing:border-box;} .ns-win svg{height:20px;max-width:100%;}'
  + '.ns-tf{display:grid;grid-template-columns:repeat(5,5px);gap:1px;padding:2px;border-radius:2px;box-shadow:inset 0 0 0 1px #8A6B42;} .ns-tf b{display:block;width:5px;height:5px;border-radius:50%;background:#EDE3D0;} .ns-tf b.is-on{background:#E0603A;}'
  + '.ns-win.is-word{font-family:' + B + ';font-weight:800;font-size:17px;color:#146B5E;text-align:center;}'
  /* Check + the bubble */
  + '.ns-foot{display:flex;justify-content:center;} .ns-check{min-height:52px;padding:6px 28px;border:0;border-radius:14px;background:#1E8A78;box-shadow:0 4px 0 #0F5C4F;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;cursor:pointer;} .ns-check:disabled{opacity:.5;cursor:default;}'
  + '.ns-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:3px;}'
  + '.ns-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .ns-note:empty{display:none;} .ns-note.is-hint{color:#B5461F;} .ns-note.is-ok{color:#146B5E;}'
  /* phones */
  + '.ns-wrap.is-wide{--ns-th:250px;--ns-bh:23px;} .ns-wrap.is-narrow{--ns-th:190px;--ns-bh:17px;gap:8px;} .ns-wrap.is-tiny{--ns-th:162px;--ns-bh:14px;gap:6px;}'
  + '.ns-wrap.is-count{--ns-th:180px;--ns-bh:16px;} .ns-wrap.is-count.is-narrow{--ns-th:138px;--ns-bh:11px;}'   /* count rounds: the tubes only show where the trip lands */
  + '.ns-wrap.is-narrow .ns-note{font-size:17px;} .ns-wrap.is-narrow .ns-qnum{font-size:36px;} .ns-wrap.is-narrow .ns-qlab{font-size:17px;line-height:1.25;flex:0 1 auto;min-width:0;text-align:left;} .ns-wrap.is-narrow .ns-q{flex-wrap:nowrap;gap:12px;} .ns-wrap.is-narrow .ns-plate{height:44px;font-size:34px;} .ns-wrap.is-narrow .ns-pad{grid-template-columns:repeat(6,44px);gap:4px;} .ns-wrap.is-narrow .ns-key{height:44px;}'
  + '.ns-wrap.is-narrow .ns-windows{flex-direction:row;flex-wrap:wrap;justify-content:center;} .ns-wrap.is-narrow .ns-win{flex:1 1 120px;}'
  + '.ns-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.ns-note,.ns-foot,.ns-pad{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.ns-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'ns-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.NineStopActivity = NineStopActivity;
