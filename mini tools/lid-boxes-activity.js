/* =====================================================================
   lid-boxes-activity.js — ACTIVITY #55 of the one-by-one rebuild:
   "Coco's Sound Boxes — First, Middle & Last Sounds" → THE POP-UP SOUND
   BOXES (RF.K.2.d, 11 locales).
   Design sheet: docs/activities-rebuild/designs/055-sound-boxes.md
   ---------------------------------------------------------------------
   THE INVENTION: drop a picture on the sound boxes and the lids pop open
   wherever its sounds are the same as the target's, at the same place —
   the same colour in both boxes and a bar joining them. The asked box
   shakes when it stays shut, so "they share a sound" and "they share the
   FIRST sound" become two different things a child can see.
   Task 1 Same sound · Task 2 Where is the sound? (tap its box; a letter
   team is ONE box) · Task 3 Hear it anywhere (sort into two baskets).
   Coco is the library koala picture: she tilts when lids pop and hops on
   success. The pair shelf keeps every matched pair as two small boxes.

   ACTIVITY LAYER ONLY: the model is lid-boxes-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.LidBoxesActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var LidBoxesActivity = {
  id: 'lid-boxes',
  apparatusClasses: ['lbx-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:          {en:'Coco’s Pop-Up Sound Boxes',de:'Die Klapp-Lautkästchen',nl:'De klankdoosjes van Koos',da:'Lydkasserne',sv:'Ljudlådorna',no:'Lydboksene',es:'Las cajitas de los sonidos',it:'Le scatoline dei suoni di Nino',pt:'As caixinhas dos sons',fr:'Les boîtes à sons',fi:'Äännelaatikot'},
    instruction:    {en:'Drop a picture on the sound boxes. The lids pop open where the sounds are the same.',de:'Leg ein Bild auf die Lautkästchen. Die Deckel springen auf, wo die Laute gleich sind.',nl:'Leg een plaatje op de klankdoosjes. De dekseltjes springen open waar de klanken hetzelfde zijn.',da:'Læg et billede på lydkasserne. Lågene springer op, hvor lydene er ens.',sv:'Lägg en bild på ljudlådorna. Locken hoppar upp där ljuden är likadana.',no:'Legg et bilde på lydboksene. Lokkene spretter opp der lydene er like.',es:'Pon un dibujo sobre las cajitas de los sonidos. Las tapas se abren donde los sonidos son iguales.',it:'Metti un disegno sulle scatoline dei suoni. I coperchi si aprono dove i suoni sono uguali.',pt:'Coloque uma figura nas caixinhas dos sons. As tampas se abrem onde os sons são iguais.',fr:'Pose une image sur les boîtes à sons. Les couvercles s’ouvrent là où les sons sont pareils.',fi:'Laita kuva äännelaatikoiden päälle. Kannet ponnahtavat auki, missä äänteet ovat samat.'},
    check:          {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    pSameFirst:     {en:'Find the picture that starts with the same sound as {target}.',de:'Finde das Bild, das mit demselben Laut anfängt wie {target}.',nl:'Zoek het plaatje dat met dezelfde klank begint als {target}.',da:'Find billedet, der begynder med samme lyd som {target}.',sv:'Hitta bilden som börjar med samma ljud som {target}.',no:'Finn bildet som begynner med samme lyd som {target}.',es:'Busca el dibujo que empieza con el mismo sonido que {target}.',it:'Trova il disegno che comincia con lo stesso suono di {target}.',pt:'Encontre a figura que começa com o mesmo som que {target}.',fr:'Trouve l’image qui commence par le même son que {target}.',fi:'Etsi kuva, joka alkaa samalla äänteellä kuin sana {target}.'},
    pSameMiddle:    {en:'Find the picture with the same middle sound as {target}.',de:'Finde das Bild mit demselben Laut in der Mitte wie {target}.',nl:'Zoek het plaatje met dezelfde middelste klank als {target}.',da:'Find billedet med samme lyd i midten som {target}.',sv:'Hitta bilden som har samma ljud i mitten som {target}.',no:'Finn bildet med samme lyd i midten som {target}.',es:'Busca el dibujo con el mismo sonido en medio que {target}.',it:'Trova il disegno con lo stesso suono in mezzo di {target}.',pt:'Encontre a figura com o mesmo som no meio que {target}.',fr:'Trouve l’image qui a le même son au milieu que {target}.',fi:'Etsi kuva, jonka keskellä on sama äänne kuin sanassa {target}.'},
    pSameLast:      {en:'Find the picture that ends with the same sound as {target}.',de:'Finde das Bild, das mit demselben Laut aufhört wie {target}.',nl:'Zoek het plaatje dat op dezelfde klank eindigt als {target}.',da:'Find billedet, der slutter med samme lyd som {target}.',sv:'Hitta bilden som slutar med samma ljud som {target}.',no:'Finn bildet som slutter med samme lyd som {target}.',es:'Busca el dibujo que termina con el mismo sonido que {target}.',it:'Trova il disegno che finisce con lo stesso suono di {target}.',pt:'Encontre a figura que termina com o mesmo som que {target}.',fr:'Trouve l’image qui finit par le même son que {target}.',fi:'Etsi kuva, joka loppuu samaan äänteeseen kuin sana {target}.'},
    pWhere:         {en:'Where do you hear {card} in {word}? Tap its box.',de:'Wo hörst du {card} in {word}? Tipp auf sein Kästchen.',nl:'Waar hoor je {card} in {word}? Tik op het doosje.',da:'Hvor hører du {card} i {word}? Tryk på kassen.',sv:'Var hör du {card} i {word}? Tryck på lådan.',no:'Hvor hører du {card} i {word}? Trykk på boksen.',es:'¿Dónde oyes {card} en {word}? Toca su cajita.',it:'Dove senti {card} in {word}? Tocca la sua scatolina.',pt:'Onde você ouve {card} em {word}? Toque na caixinha.',fr:'Où entends-tu {card} dans {word} ? Touche sa boîte.',fi:'Missä kuulet äänteen {card} sanassa {word}? Napauta sen laatikkoa.'},
    pSort:          {en:'Which pictures have {card}? Sort them into the baskets.',de:'Welche Bilder haben {card}? Sortiere sie in die Körbe.',nl:'Welke plaatjes hebben {card}? Sorteer ze in de manden.',da:'Hvilke billeder har {card}? Sortér dem i kurvene.',sv:'Vilka bilder har {card}? Sortera dem i korgarna.',no:'Hvilke bilder har {card}? Sorter dem i kurvene.',es:'¿Qué dibujos tienen {card}? Ponlos en las canastas.',it:'Quali disegni hanno {card}? Mettili nei cestini.',pt:'Quais figuras têm {card}? Coloque-as nas cestas.',fr:'Quelles images ont {card} ? Range-les dans les paniers.',fi:'Missä kuvissa on äänne {card}? Lajittele ne koreihin.'},
    hintDrop:       {en:'Drop a picture on the boxes.',de:'Leg ein Bild auf die Kästchen.',nl:'Leg een plaatje op de doosjes.',da:'Læg et billede på kasserne.',sv:'Lägg en bild på lådorna.',no:'Legg et bilde på boksene.',es:'Pon un dibujo sobre las cajitas.',it:'Metti un disegno sulle scatoline.',pt:'Coloque uma figura nas caixinhas.',fr:'Pose une image sur les boîtes.',fi:'Laita kuva laatikoiden päälle.'},
    hintTap:        {en:'Tap the box where you hear {card}.',de:'Tipp auf das Kästchen, in dem du {card} hörst.',nl:'Tik op het doosje waar je {card} hoort.',da:'Tryk på kassen, hvor du hører {card}.',sv:'Tryck på lådan där du hör {card}.',no:'Trykk på boksen der du hører {card}.',es:'Toca la cajita donde oyes {card}.',it:'Tocca la scatolina dove senti {card}.',pt:'Toque na caixinha onde você ouve {card}.',fr:'Touche la boîte où tu entends {card}.',fi:'Napauta laatikkoa, jossa kuulet äänteen {card}.'},
    hintBaskets:    {en:'Put every picture in a basket.',de:'Leg jedes Bild in einen Korb.',nl:'Leg elk plaatje in een mand.',da:'Læg hvert billede i en kurv.',sv:'Lägg varje bild i en korg.',no:'Legg hvert bilde i en kurv.',es:'Pon cada dibujo en una canasta.',it:'Metti ogni disegno in un cestino.',pt:'Coloque cada figura em uma cesta.',fr:'Range chaque image dans un panier.',fi:'Laita jokainen kuva koriin.'},
    hintOtherFirst: {en:'Same sound, but not at the start! Find one that starts like {target}.',de:'Ein gleicher Laut – aber nicht am Anfang! Finde ein Bild, das wie {target} anfängt.',nl:'Dezelfde klank, maar niet vooraan! Zoek er een die begint zoals {target}.',da:'Samme lyd, men ikke i starten! Find et, der begynder som {target}.',sv:'Samma ljud, men inte i början! Hitta en som börjar som {target}.',no:'Samme lyd, men ikke i starten! Finn et som begynner som {target}.',es:'¡Es el mismo sonido, pero no al principio! Busca uno que empiece como {target}.',it:'Lo stesso suono, ma non all’inizio! Trova un disegno che comincia come {target}.',pt:'O mesmo som, mas não no começo! Encontre uma que comece como {target}.',fr:'Le même son, mais pas au début ! Trouve une image qui commence comme {target}.',fi:'Sama äänne, mutta ei alussa! Etsi kuva, joka alkaa samoin kuin sana {target}.'},
    hintOtherMiddle:{en:'Same sound, but not in the middle! Find one with the same middle sound as {target}.',de:'Ein gleicher Laut – aber nicht in der Mitte! Finde ein Bild mit demselben Laut in der Mitte wie {target}.',nl:'Dezelfde klank, maar niet in het midden! Zoek er een met dezelfde middelste klank als {target}.',da:'Samme lyd, men ikke i midten! Find et med samme lyd i midten som {target}.',sv:'Samma ljud, men inte i mitten! Hitta en med samma ljud i mitten som {target}.',no:'Samme lyd, men ikke i midten! Finn et med samme lyd i midten som {target}.',es:'¡Es el mismo sonido, pero no en medio! Busca uno con el mismo sonido en medio que {target}.',it:'Lo stesso suono, ma non in mezzo! Trova un disegno con lo stesso suono in mezzo di {target}.',pt:'O mesmo som, mas não no meio! Encontre uma com o mesmo som no meio que {target}.',fr:'Le même son, mais pas au milieu ! Trouve une image qui a le même son au milieu que {target}.',fi:'Sama äänne, mutta ei keskellä! Etsi kuva, jonka keskellä on sama äänne kuin sanassa {target}.'},
    hintOtherLast:  {en:'Same sound, but not at the end! Find one that ends like {target}.',de:'Ein gleicher Laut – aber nicht am Ende! Finde ein Bild, das wie {target} aufhört.',nl:'Dezelfde klank, maar niet achteraan! Zoek er een die eindigt zoals {target}.',da:'Samme lyd, men ikke i slutningen! Find et, der slutter som {target}.',sv:'Samma ljud, men inte i slutet! Hitta en som slutar som {target}.',no:'Samme lyd, men ikke på slutten! Finn et som slutter som {target}.',es:'¡Es el mismo sonido, pero no al final! Busca uno que termine como {target}.',it:'Lo stesso suono, ma non alla fine! Trova un disegno che finisce come {target}.',pt:'O mesmo som, mas não no final! Encontre uma que termine como {target}.',fr:'Le même son, mais pas à la fin ! Trouve une image qui finit comme {target}.',fi:'Sama äänne, mutta ei lopussa! Etsi kuva, joka loppuu samoin kuin sana {target}.'},
    hintNone:       {en:'No sounds match. Say {target} slowly, then say each picture.',de:'Kein Laut passt. Sprich {target} langsam und dann den Namen von jedem Bild.',nl:'Geen enkele klank past. Zeg {target} langzaam en zeg dan elk plaatje.',da:'Ingen lyde passer. Sig {target} langsomt, og sig så hvert billede.',sv:'Inga ljud passar. Säg {target} långsamt och säg sedan varje bild.',no:'Ingen lyder passer. Si {target} sakte, og si så hvert bilde.',es:'Ningún sonido es igual. Di {target} despacio y luego di cada dibujo.',it:'Nessun suono è uguale. Di’ {target} piano piano, poi di’ il nome di ogni disegno.',pt:'Nenhum som é igual. Diga {target} devagar e depois diga cada figura.',fr:'Aucun son ne correspond. Dis {target} lentement, puis dis le nom de chaque image.',fi:'Mikään äänne ei ole sama. Sano sana {target} hitaasti ja sano sitten jokaisen kuvan nimi.'},
    hintListenFirst:{en:'Listen only to the first sound. Look at the open boxes.',de:'Hör nur auf den ersten Laut. Schau auf die offenen Kästchen.',nl:'Luister alleen naar de eerste klank. Kijk naar de open doosjes.',da:'Lyt kun til den første lyd. Se på de åbne kasser.',sv:'Lyssna bara på det första ljudet. Titta på de öppna lådorna.',no:'Lytt bare til den første lyden. Se på de åpne boksene.',es:'Escucha solo el primer sonido. Mira las cajitas abiertas.',it:'Ascolta solo il primo suono. Guarda le scatoline aperte.',pt:'Escute só o primeiro som. Olhe as caixinhas abertas.',fr:'Écoute seulement le premier son. Regarde les boîtes ouvertes.',fi:'Kuuntele vain ensimmäistä äännettä. Katso avoimia laatikoita.'},
    hintListenMiddle:{en:'Listen only to the middle sound. Look at the open boxes.',de:'Hör nur auf den Laut in der Mitte. Schau auf die offenen Kästchen.',nl:'Luister alleen naar de middelste klank. Kijk naar de open doosjes.',da:'Lyt kun til lyden i midten. Se på de åbne kasser.',sv:'Lyssna bara på ljudet i mitten. Titta på de öppna lådorna.',no:'Lytt bare til lyden i midten. Se på de åpne boksene.',es:'Escucha solo el sonido de en medio. Mira las cajitas abiertas.',it:'Ascolta solo il suono in mezzo. Guarda le scatoline aperte.',pt:'Escute só o som do meio. Olhe as caixinhas abertas.',fr:'Écoute seulement le son du milieu. Regarde les boîtes ouvertes.',fi:'Kuuntele vain keskimmäistä äännettä. Katso avoimia laatikoita.'},
    hintListenLast: {en:'Listen only to the last sound. Look at the open boxes.',de:'Hör nur auf den letzten Laut. Schau auf die offenen Kästchen.',nl:'Luister alleen naar de laatste klank. Kijk naar de open doosjes.',da:'Lyt kun til den sidste lyd. Se på de åbne kasser.',sv:'Lyssna bara på det sista ljudet. Titta på de öppna lådorna.',no:'Lytt bare til den siste lyden. Se på de åpne boksene.',es:'Escucha solo el último sonido. Mira las cajitas abiertas.',it:'Ascolta solo l’ultimo suono. Guarda le scatoline aperte.',pt:'Escute só o último som. Olhe as caixinhas abertas.',fr:'Écoute seulement le dernier son. Regarde les boîtes ouvertes.',fi:'Kuuntele vain viimeistä äännettä. Katso avoimia laatikoita.'},
    hintWhere:      {en:'Look at the letters in the boxes. Where is {card}?',de:'Schau auf die Buchstaben in den Kästchen. Wo ist {card}?',nl:'Kijk naar de letters in de doosjes. Waar staat {card}?',da:'Se på bogstaverne i kasserne. Hvor er {card}?',sv:'Titta på bokstäverna i lådorna. Var är {card}?',no:'Se på bokstavene i boksene. Hvor er {card}?',es:'Mira las letras en las cajitas. ¿Dónde está {card}?',it:'Guarda le lettere nelle scatoline. Dov’è {card}?',pt:'Olhe as letras nas caixinhas. Onde está {card}?',fr:'Regarde les lettres dans les boîtes. Où est {card} ?',fi:'Katso laatikoiden kirjaimia. Missä on {card}?'},
    hintWhereHelp:  {en:'{card} is in the glowing box.',de:'{card} ist im leuchtenden Kästchen.',nl:'{card} zit in het doosje dat oplicht.',da:'{card} er i kassen, der lyser.',sv:'{card} finns i lådan som lyser.',no:'{card} er i boksen som lyser.',es:'{card} está en la cajita que brilla.',it:'{card} è nella scatolina che brilla.',pt:'{card} está na caixinha que brilha.',fr:'{card} est dans la boîte qui brille.',fi:'{card} on laatikossa, joka hehkuu.'},
    hintSort:       {en:'Some pictures are in the wrong basket. Look at their boxes.',de:'Manche Bilder liegen im falschen Korb. Schau auf ihre Kästchen.',nl:'Sommige plaatjes liggen in de verkeerde mand. Kijk naar hun doosjes.',da:'Nogle billeder ligger i den forkerte kurv. Se på deres kasser.',sv:'Några bilder ligger i fel korg. Titta på deras lådor.',no:'Noen bilder ligger i feil kurv. Se på boksene deres.',es:'Algunos dibujos están en la canasta equivocada. Mira sus cajitas.',it:'Alcuni disegni sono nel cestino sbagliato. Guarda le loro scatoline.',pt:'Algumas figuras estão na cesta errada. Olhe as caixinhas delas.',fr:'Des images sont dans le mauvais panier. Regarde leurs boîtes.',fi:'Osa kuvista on väärässä korissa. Katso niiden laatikoita.'},
    hintSortHelp:   {en:'The {card} box pops open in every picture that has it.',de:'Das Kästchen mit {card} springt bei jedem Bild auf, das {card} hat.',nl:'Het doosje met {card} springt open bij elk plaatje dat {card} heeft.',da:'Kassen med {card} springer op i hvert billede, der har {card}.',sv:'Lådan med {card} hoppar upp i varje bild som har {card}.',no:'Boksen med {card} spretter opp i hvert bilde som har {card}.',es:'La cajita con {card} se abre en cada dibujo que tiene {card}.',it:'La scatolina con {card} si apre in ogni disegno che ha {card}.',pt:'A caixinha com {card} se abre em cada figura que tem {card}.',fr:'La boîte avec {card} s’ouvre dans chaque image qui a {card}.',fi:'Laatikko, jossa on {card}, ponnahtaa auki jokaisessa kuvassa, jossa {card} on.'},
    okFirst:        {en:'{a} and {b} start with the same sound!',de:'{a} und {b} fangen mit demselben Laut an!',nl:'{a} en {b} beginnen met dezelfde klank!',da:'{a} og {b} begynder med samme lyd!',sv:'{a} och {b} börjar med samma ljud!',no:'{a} og {b} begynner med samme lyd!',es:'¡{a} y {b} empiezan con el mismo sonido!',it:'{a} e {b} cominciano con lo stesso suono!',pt:'{a} e {b} começam com o mesmo som!',fr:'{a} et {b} commencent par le même son !',fi:'Sanat {a} ja {b} alkavat samalla äänteellä!'},
    okMiddle:       {en:'{a} and {b} have the same middle sound!',de:'{a} und {b} haben denselben Laut in der Mitte!',nl:'{a} en {b} hebben dezelfde middelste klank!',da:'{a} og {b} har samme lyd i midten!',sv:'{a} och {b} har samma ljud i mitten!',no:'{a} og {b} har samme lyd i midten!',es:'¡{a} y {b} tienen el mismo sonido en medio!',it:'{a} e {b} hanno lo stesso suono in mezzo!',pt:'{a} e {b} têm o mesmo som no meio!',fr:'{a} et {b} ont le même son au milieu !',fi:'Sanoissa {a} ja {b} on sama äänne keskellä!'},
    okLast:         {en:'{a} and {b} end with the same sound!',de:'{a} und {b} hören mit demselben Laut auf!',nl:'{a} en {b} eindigen op dezelfde klank!',da:'{a} og {b} slutter med samme lyd!',sv:'{a} och {b} slutar med samma ljud!',no:'{a} og {b} slutter med samme lyd!',es:'¡{a} y {b} terminan con el mismo sonido!',it:'{a} e {b} finiscono con lo stesso suono!',pt:'{a} e {b} terminam com o mesmo som!',fr:'{a} et {b} finissent par le même son !',fi:'Sanat {a} ja {b} loppuvat samaan äänteeseen!'},
    okWhereFirst:   {en:'{card} is at the start of {word}.',de:'{card} ist am Anfang von {word}.',nl:'{card} zit vooraan in {word}.',da:'{card} er i starten af {word}.',sv:'{card} finns i början av {word}.',no:'{card} er i starten av {word}.',es:'{card} está al principio de {word}.',it:'{card} è all’inizio di {word}.',pt:'{card} está no começo de {word}.',fr:'{card} est au début de {word}.',fi:'{card} on sanan {word} alussa.'},
    okWhereMiddle:  {en:'{card} is in the middle of {word}.',de:'{card} ist in der Mitte von {word}.',nl:'{card} zit in het midden van {word}.',da:'{card} er i midten af {word}.',sv:'{card} finns i mitten av {word}.',no:'{card} er i midten av {word}.',es:'{card} está en medio de {word}.',it:'{card} è in mezzo a {word}.',pt:'{card} está no meio de {word}.',fr:'{card} est au milieu de {word}.',fi:'{card} on sanan {word} keskellä.'},
    okWhereLast:    {en:'{card} is at the end of {word}.',de:'{card} ist am Ende von {word}.',nl:'{card} zit achteraan in {word}.',da:'{card} er i slutningen af {word}.',sv:'{card} finns i slutet av {word}.',no:'{card} er på slutten av {word}.',es:'{card} está al final de {word}.',it:'{card} è alla fine di {word}.',pt:'{card} está no final de {word}.',fr:'{card} est à la fin de {word}.',fi:'{card} on sanan {word} lopussa.'},
    okSort:         {en:'All sorted! These pictures have {card}.',de:'Alles sortiert! Diese Bilder haben {card}.',nl:'Alles gesorteerd! Deze plaatjes hebben {card}.',da:'Færdig! Disse billeder har {card}.',sv:'Klart! De här bilderna har {card}.',no:'Ferdig! Disse bildene har {card}.',es:'¡Todo listo! Estos dibujos tienen {card}.',it:'Tutto a posto! Questi disegni hanno {card}.',pt:'Tudo certo! Estas figuras têm {card}.',fr:'Tout est rangé ! Ces images ont {card}.',fi:'Valmista! Näissä kuvissa on {card}.'},
    setTask:        {en:'Task',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Actividad',it:'Attività',pt:'Atividade',fr:'Activité',fi:'Tehtävä'},
    tSame:          {en:'Same sound',de:'Gleicher Laut',nl:'Dezelfde klank',da:'Samme lyd',sv:'Samma ljud',no:'Samme lyd',es:'Mismo sonido',it:'Stesso suono',pt:'Mesmo som',fr:'Même son',fi:'Sama äänne'},
    tWhere:         {en:'Where is the sound?',de:'Wo ist der Laut?',nl:'Waar is de klank?',da:'Hvor er lyden?',sv:'Var är ljudet?',no:'Hvor er lyden?',es:'¿Dónde está el sonido?',it:'Dov’è il suono?',pt:'Onde está o som?',fr:'Où est le son ?',fi:'Missä äänne on?'},
    tSort:          {en:'Hear it anywhere',de:'Laut irgendwo hören',nl:'Klank overal horen',da:'Hør lyden et sted i ordet',sv:'Hör ljudet var som helst',no:'Hør lyden hvor som helst',es:'Oír el sonido en cualquier parte',it:'Sentire il suono ovunque',pt:'Ouvir o som em qualquer lugar',fr:'Entendre le son dans le mot',fi:'Kuule äänne missä vain'},
    setPos:         {en:'Position',de:'Stelle',nl:'Plek',da:'Plads',sv:'Plats',no:'Plass',es:'Lugar',it:'Posizione',pt:'Posição',fr:'Position',fi:'Paikka'},
    posFirst:       {en:'First',de:'Anfang',nl:'Begin',da:'Start',sv:'Början',no:'Start',es:'Principio',it:'Inizio',pt:'Começo',fr:'Début',fi:'Alku'},
    posMiddle:      {en:'Middle',de:'Mitte',nl:'Midden',da:'Midten',sv:'Mitten',no:'Midten',es:'En medio',it:'In mezzo',pt:'Meio',fr:'Milieu',fi:'Keskikohta'},
    posLast:        {en:'Last',de:'Ende',nl:'Eind',da:'Slutning',sv:'Slutet',no:'Slutten',es:'Final',it:'Fine',pt:'Final',fr:'Fin',fi:'Loppu'},
    posMixed:       {en:'Mixed',de:'Gemischt',nl:'Gemengd',da:'Blandet',sv:'Blandat',no:'Blandet',es:'Mezclado',it:'Misto',pt:'Misturado',fr:'Mélangé',fi:'Sekaisin'},
    ariaBox:        {en:'Box {n}: {letters}.',de:'Kästchen {n}: {letters}.',nl:'Doosje {n}: {letters}.',da:'Kasse {n}: {letters}.',sv:'Låda {n}: {letters}.',no:'Boks {n}: {letters}.',es:'Cajita {n}: {letters}.',it:'Scatolina {n}: {letters}.',pt:'Caixinha {n}: {letters}.',fr:'Boîte {n} : {letters}.',fi:'Laatikko {n}: {letters}.'},
    ariaShut:       {en:'Box {n}: shut.',de:'Kästchen {n}: zu.',nl:'Doosje {n}: dicht.',da:'Kasse {n}: lukket.',sv:'Låda {n}: stängd.',no:'Boks {n}: lukket.',es:'Cajita {n}: cerrada.',it:'Scatolina {n}: chiusa.',pt:'Caixinha {n}: fechada.',fr:'Boîte {n} : fermée.',fi:'Laatikko {n}: kiinni.'},
    ariaPop:        {en:'The lids popped open.',de:'Die Deckel sind aufgesprungen.',nl:'De dekseltjes sprongen open.',da:'Lågene sprang op.',sv:'Locken hoppade upp.',no:'Lokkene spratt opp.',es:'Las tapas se abrieron.',it:'I coperchi si sono aperti.',pt:'As tampas se abriram.',fr:'Les couvercles se sont ouverts.',fi:'Kannet ponnahtivat auki.'},
    ariaYes:        {en:'Basket: has {card}',de:'Korb: hat {card}',nl:'Mand: heeft {card}',da:'Kurv: har {card}',sv:'Korg: har {card}',no:'Kurv: har {card}',es:'Canasta: tiene {card}',it:'Cestino: ha {card}',pt:'Cesta: tem {card}',fr:'Panier : a {card}',fi:'Kori: kuvissa on äänne {card}'},
    ariaNo:         {en:'Basket: does not have {card}',de:'Korb: hat kein {card}',nl:'Mand: heeft geen {card}',da:'Kurv: har ikke {card}',sv:'Korg: har inte {card}',no:'Kurv: har ikke {card}',es:'Canasta: no tiene {card}',it:'Cestino: non ha {card}',pt:'Cesta: não tem {card}',fr:'Panier : n’a pas {card}',fi:'Kori: kuvissa ei ole äännettä {card}'},
    ariaShelf:      {en:'Pairs found: {list}',de:'Gefundene Paare: {list}',nl:'Gevonden paren: {list}',da:'Fundne par: {list}',sv:'Hittade par: {list}',no:'Funne par: {list}',es:'Pares encontrados: {list}',it:'Coppie trovate: {list}',pt:'Pares encontrados: {list}',fr:'Paires trouvées : {list}',fi:'Löydetyt parit: {list}'}
    /*STRINGS-END*/
  },

  defaults: { task: 'same', pos: 'mixed' },
  settings: [
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'same', labelKey: 'tSame' }, { value: 'where', labelKey: 'tWhere' }, { value: 'sort', labelKey: 'tSort' }] },
    { key: 'pos', type: 'choice', labelKey: 'setPos', options: [{ value: 'first', labelKey: 'posFirst' }, { value: 'middle', labelKey: 'posMiddle' }, { value: 'last', labelKey: 'posLast' }, { value: 'mixed', labelKey: 'posMixed' }] }
  ],

  OK_MS: 500, FAST: false,
  QUOTES: { en: ['“', '”'], de: ['„', '“'], nl: ['‘', '’'], da: ['»', '«'], sv: ['”', '”'], no: ['«', '»'], es: ['«', '»'], it: ['«', '»'], pt: ['“', '”'], fr: ['« ', ' »'], fi: ['”', '”'] },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._lay = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._drag = null;
    this._shelf = []; this._shelfPass = -1; this._view = {};
    /* a locale without three-sound picture words offers no Middle (never faked) */
    var ps = LidBoxesCore.positions(this._loc());
    this.settings = [this.settings[0], { key: 'pos', type: 'choice', labelKey: 'setPos', options: ['first', 'middle', 'last'].filter(function (p) { return ps.indexOf(p) >= 0; }).map(function (p) { return { value: p, labelKey: 'pos' + p.charAt(0).toUpperCase() + p.slice(1) }; }).concat([{ value: 'mixed', labelKey: 'posMixed' }]) }];
    injectLidCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return LidBoxesCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _task: function () { return LidBoxesCore.task(this._set('task')); },
  _pos: function () { return LidBoxesCore.pos(this._loc(), this._set('pos')); },
  _key: function () { var t = this._task(); return this._loc() + '/' + t + (t === 'same' ? '/' + this._pos() : ''); },
  _q: function (s) { var Q = this.QUOTES[this._loc()] || this.QUOTES.en; return Q[0] + s + Q[1]; },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { if (this._poolKey && this._poolKey !== k) { this._shelf = []; this._shelfPass = -1; } this._pool = LidBoxesCore.rounds(this._loc(), this._task(), this._pos()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = LidBoxesCore, self = this;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._lay = C.deal(n, Math.random); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._lay = C.deal(n, Math.random); }
    var r = pool[this._order[index % n]], lay = this._lay[index % n], pss = pass;
    var args = this._args(r);
    var pk = r.task === 'same' ? 'pSame' + r.pos.charAt(0).toUpperCase() + r.pos.slice(1) : r.task === 'where' ? 'pWhere' : 'pSort';
    return {
      id: 'lid-boxes.' + r.loc + '.' + r.id, promptKey: pk, promptArgs: args, celebrateKey: this._okKey(r), answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = {}; tool._drag = null;
        if (tool._shelfPass !== pss) { tool._shelf = []; tool._shelfPass = pss; }
        var ord = null;
        if (r.task === 'sort') ord = C.order(r.items, Math.random, null);
        tool.st = C.newState(r, { layout: lay, order: ord }); tool._a = args;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _args: function (r) {
    if (r.task === 'same') return { target: r.target.word, a: r.target.word, b: r.cands[0].w.word };
    if (r.task === 'where') return { card: this._q(r.card), word: r.target.word };
    return { card: this._q(r.card) };
  },
  _okKey: function (r) { if (r.task === 'same') return 'ok' + r.pos.charAt(0).toUpperCase() + r.pos.slice(1); if (r.task === 'where') return 'okWhere' + r.pos.charAt(0).toUpperCase() + r.pos.slice(1); return 'okSort'; },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = LidBoxesCore.rounds(this._loc(), 'same', 'first')[0]; this.st = LidBoxesCore.newState(r0, {}); this._a = this._args(r0); }
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || self._drag) return; last = w; self._render2(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, st = this.st, self = this;
    api.stage.innerHTML = '';
    var L = this._L = LidBoxesCore.layout(this._width());
    var wrap = api.el('div', 'lbx-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + st.r.task); this._wrap = wrap; wrap.tabIndex = -1;
    /* every line is [picture column | boxes]; the boxes take what the column leaves */
    var n = st.r.task === 'sort' ? 3 : st.r.target.boxes.length, gap = L.mode === 'wide' ? 14 : 8, line = st.r.task === 'same', colW = line ? L.target + 14 : 0, colGap = line ? (L.mode === 'wide' ? 18 : 10) : 0;
    var box = Math.min(L.box, Math.floor((L.W - 4 - colW - colGap - gap * (n - 1)) / n));
    this._sz = { box: box, gap: gap, rowW: n * box + (n - 1) * gap };
    [['box', box], ['tbox', box], ['target', L.target], ['koala', L.koala], ['cand', L.cand], ['drop', L.drop], ['sort', L.sortPic], ['gap', gap], ['colw', colW], ['colgap', colGap], ['roww', this._sz.rowW]].forEach(function (p) { wrap.style.setProperty('--lbx-' + p[0], p[1] + 'px'); });
    this._headEl = api.el('div', 'lbx-head'); wrap.appendChild(this._headEl);
    this._boardEl = api.el('div', 'lbx-board'); wrap.appendChild(this._boardEl);
    this._bars = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); this._bars.setAttribute('class', 'lbx-bars'); this._bars.setAttribute('aria-hidden', 'true'); wrap.appendChild(this._bars);
    var ask = api.el('div', 'lbx-ask'); wrap.appendChild(ask);
    var note = api.el('p', 'lbx-note'); note.setAttribute('aria-live', 'polite'); this._note = note; ask.appendChild(note);
    var chk = api.el('button', 'lbx-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
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
    if (!this._boardEl) return;
    var st = this.st, C = LidBoxesCore, r = st.r;
    this._paintHead(); this._paintShelf();
    if (r.task === 'same') this._paintSame(); else if (r.task === 'where') this._paintWhere(); else this._paintSort();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : (this._view.won ? this._t(this._okKey(r), this._a) : '');
    else if (h && !this._busy) msg = this._t(h, this._a);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && st.last.result !== 'empty'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    var self = this; this._drawBars(); if (typeof requestAnimationFrame !== 'undefined') requestAnimationFrame(function () { self._drawBars(); });
  },

  /* one sound box: letters inside, a lid on top (open or shut) */
  _box: function (W, i, o) {
    o = o || {};
    var b = this.api.el(o.tag || 'div', 'lbx-box' + (o.small ? ' is-small' : '') + (o.help ? ' is-help' : '') + (o.open ? ' is-open' : '') + (o.pop ? ' is-pop' : '') + (o.asked ? ' is-asked' : '') + (o.shake ? ' is-shake' : '') + (o.glow ? ' is-glow' : '') + (o.raised ? ' is-raised' : '') + (o.fade ? ' is-fade' : ''));
    var lt = W.boxes[i], magic = /_e$/.test(lt); if (magic) lt = lt.charAt(0);
    if (o.pop) b.style.setProperty('--lbx-c', o.pop);
    b.innerHTML = '<span class="lbx-lid"></span><span class="lbx-let">' + lt + '</span>';
    if (o.pair) b.setAttribute('data-pair', o.pair);
    var lab = o.open ? this._t('ariaBox', { n: i + 1, letters: lt }) : this._t('ariaShut', { n: i + 1 });
    b.setAttribute('aria-label', lab);
    return b;
  },
  _boxRow: function (W, cls, fn) {
    var row = this.api.el('div', 'lbx-row ' + cls), n = W.boxes.length, self = this;
    for (var i = 0; i < n; i++) row.appendChild(fn(i));
    /* the silent tail (a magic e, a French mute e): grey, after the last box */
    var tail = W.tail || (W.boxes.some(function (b) { return /_e$/.test(b); }) ? 'e' : '');
    if (tail) { var t = self.api.el('span', 'lbx-tail'); t.textContent = tail; t.setAttribute('aria-hidden', 'true'); row.appendChild(t); }
    return row;
  },
  _picBtn: function (W, cls, k) {
    var b = this.api.el('button', 'lbx-pic ' + cls), self = this; b.type = 'button'; if (k) b.setAttribute('data-k', k);
    b.innerHTML = '<img alt="" draggable="false" src="' + this._pic(W.pic) + '">';
    b.setAttribute('aria-label', W.word);
    return b;
  },
  _koala: function () {
    var k = this.api.el('div', 'lbx-koala' + (this._view.tilt ? ' is-tilt' : '') + (this._view.won ? ' is-hop' : ''));
    k.innerHTML = '<img alt="" draggable="false" src="' + this._pic('animals/koala') + '">';
    k.setAttribute('aria-hidden', 'true');
    return k;
  },
  _card: function (letters) { var c = this.api.el('div', 'lbx-card'); c.textContent = letters; return c; },

  _paintShelf: function () {
    var el = this._shelfEl, self = this; el.innerHTML = '';
    el.hidden = this.st.r.task !== 'same' || !this._shelf.length;
    this._shelf.slice(-6).forEach(function (p) {
      var t = self.api.el('span', 'lbx-token');
      t.innerHTML = '<span class="lbx-tb" style="--lbx-c:' + p.c + '">' + p.a + '</span><span class="lbx-tbar"></span><span class="lbx-tb" style="--lbx-c:' + p.c + '">' + p.b + '</span>';
      el.appendChild(t);
    });
    el.setAttribute('aria-label', this._t('ariaShelf', { list: this._shelf.map(function (p) { return p.wa + '–' + p.wb; }).join(', ') }));
  },
  _paintHead: function () {
    var el = this._headEl, r = this.st.r; el.innerHTML = '';
    if (r.task !== 'same') el.appendChild(this._card(r.card));
    if (r.task === 'where') el.appendChild(this._targetPic());
    el.appendChild(this._koala());
    this._shelfEl = this.api.el('div', 'lbx-shelf'); el.appendChild(this._shelfEl);
  },
  /* a line: the picture column, then the boxes */
  _line: function (cls, colNode, row) {
    var ln = this.api.el('div', 'lbx-line ' + cls), col = this.api.el('div', 'lbx-lcol');
    if (colNode) col.appendChild(colNode);
    ln.appendChild(col); ln.appendChild(row); return ln;
  },
  _targetPic: function () { var r = this.st.r, self = this, tp = this._picBtn(r.target, 'is-target', 'target'); tp.addEventListener('click', function () { self._say(r.target.word); }); return tp; },

  /* Task 1 */
  _paintSame: function () {
    var el = this._boardEl, st = this.st, r = st.r, C = LidBoxesCore, self = this, v = this._view, sz = this._sz; el.innerHTML = '';
    var ai = C.asked(r.target, r.pos), last = st.last, showLid = (v.testing || (st.show && last && last.lid) || st.done) ? (st.last && st.last.lid) : null;
    var slot = st.done ? st.test : (last && last.slot !== undefined ? last.slot : st.test);
    var cand = slot >= 0 ? C.candAt(st, slot) : null, col = C.colours([r.target].concat(r.cands.map(function (c) { return c.w; })));
    var popT = {}, popC = {};
    if (showLid) showLid.forEach(function (p) { if (p.same) { popT[p.i] = 'p' + p.i; popC[p.j] = 'p' + p.i; } });
    /* the coral arrow over the asked box */
    var arrow = this.api.el('div', 'lbx-row lbx-arrows'); arrow.setAttribute('aria-hidden', 'true');
    for (var a = 0; a < r.target.boxes.length; a++) arrow.appendChild(this.api.el('span', a === ai ? 'is-on' : ''));
    el.appendChild(this._line('is-arrows', null, arrow));
    var trow = this._boxRow(r.target, 'is-target', function (i) {
      return self._box(r.target, i, { open: true, asked: i === ai, pop: popT[i] ? col[r.target.keys[i]] : null, pair: popT[i] ? 't' + popT[i] : null, shake: !!(showLid && !st.done && i === ai && !popT[i] && v.shakeOn) });
    });
    el.appendChild(this._line('is-target', this._targetPic(), trow));
    /* the test line: the dropped picture and its own boxes, first under first and last under last (lids shut until Check) */
    var nT = r.target.boxes.length, nC = cand ? cand.w.boxes.length : nT, tb = nC <= nT ? sz.box : Math.floor((sz.rowW - (nC - 1) * 4) / nC), brow, pic;
    if (cand) {
      pic = this._picBtn(cand.w, 'is-drop', 'drop'); pic.addEventListener('click', function () { if (!st.done && !self._busy && LidBoxesCore.lift(st)) { self.api.sound(380); self._paint(); } });
      brow = this._boxRow(cand.w, 'is-test', function (j) {
        return self._box(cand.w, j, { open: !!(showLid && popC[j]) || st.done, pop: popC[j] && showLid ? col[cand.w.keys[j]] : null, pair: popC[j] && showLid ? 'c' + popC[j] : null, small: true });
      });
    } else {
      pic = this.api.el('div', 'lbx-slot'); pic.setAttribute('aria-hidden', 'true');
      brow = this.api.el('div', 'lbx-row is-test is-ghost');
      for (var g = 0; g < nT; g++) brow.appendChild(this.api.el('span', 'lbx-box is-small is-ghost'));
    }
    brow.style.setProperty('--lbx-tbox', tb + 'px');
    var test = this._line('lbx-test' + (cand ? '' : ' is-empty') + (!st.done && st.show && last && last.lid ? ' is-fade' : ''), pic, brow);
    this._dropZone = test; el.appendChild(test);
    /* the tray */
    var tray = this.api.el('div', 'lbx-tray'), help = C.helpOn(st);
    for (var t = 0; t < 3; t++) (function (t) {
      var c = C.candAt(st, t), cell = self.api.el('div', 'lbx-cell');
      if (help) { var k = C.asked(c.w, r.pos); if (k >= 0) { var hb = self._box(c.w, k, { open: true, help: true }); hb.classList.add('is-one'); cell.appendChild(hb); } }
      var b = self._picBtn(c.w, 'is-cand' + (st.test === t ? ' is-gone' : ''), 'cand' + t);
      b.setAttribute('data-i', t);
      self._bindDrag(b, function () { return st.test !== t && !st.done; }, function (hit) { if (hit === 'drop') self._drop(t); }, function () { self._drop(t); });
      cell.appendChild(b); tray.appendChild(cell);
    })(t);
    el.appendChild(tray);
  },
  _drop: function (t) { var st = this.st; if (this._busy || st.done) return; if (LidBoxesCore.drop(st, t)) { this.api.sound(520); this._say(LidBoxesCore.candAt(st, t).w.word); this._view = {}; this._paint(); } },

  /* Task 2 */
  _paintWhere: function () {
    var el = this._boardEl, st = this.st, r = st.r, self = this, help = LidBoxesCore.helpOn(st), miss = !st.done && st.show && st.last && st.last.result === 'wrong'; el.innerHTML = '';
    var col = LidBoxesCore.colours([r.target]);
    var row = this._boxRow(r.target, 'is-target is-where', function (i) {
      var b = self._box(r.target, i, { tag: 'button', open: st.done || miss, raised: st.chosen === i && !st.done, pop: st.done && i === r.answer ? col[r.target.keys[i]] : null, glow: (help && i === r.answer) || (st.done && i === r.answer), shake: miss && st.chosen === i && self._view.shakeOn });
      b.type = 'button'; b.setAttribute('data-k', 'box' + i); b.setAttribute('aria-pressed', String(st.chosen === i));
      b.addEventListener('click', function () { self._choose(i); });
      return b;
    });
    row.style.width = 'auto'; el.appendChild(row);
  },
  _choose: function (i) { if (this._busy || this.st.done) return; if (LidBoxesCore.choose(this.st, i)) { this.api.sound(560 + i * 60); this._view = {}; this._paint(); } },

  /* Task 3 */
  _paintSort: function () {
    var el = this._boardEl, st = this.st, r = st.r, C = LidBoxesCore, self = this, help = C.helpOn(st), wrong = (!st.done && st.show && st.last && st.last.wrong) || []; el.innerHTML = '';
    var bins = this.api.el('div', 'lbx-bins');
    ['yes', 'no'].forEach(function (bin) {
      var bk = self.api.el('div', 'lbx-basket is-' + bin + (self._drag && self._drag.over === bin ? ' is-over' : '')); bk.setAttribute('data-bin', bin);
      var lab = self.api.el('button', 'lbx-blabel'); lab.type = 'button'; lab.setAttribute('data-k', 'bin-' + bin);
      lab.innerHTML = '<span class="lbx-bcard">' + r.card + '</span>' + (bin === 'no' ? '<span class="lbx-bslash"></span>' : '');
      lab.setAttribute('aria-label', self._t(bin === 'yes' ? 'ariaYes' : 'ariaNo', { card: r.card }));
      lab.addEventListener('click', function () { if (st.picked >= 0) self._place(st.picked, bin); });
      bk.appendChild(lab);
      var in_ = self.api.el('div', 'lbx-bin-items');
      st.order.forEach(function (i) { if (st.bins[i] === bin) in_.appendChild(self._sortItem(i, wrong.indexOf(i) >= 0, help)); });
      bk.appendChild(in_); bins.appendChild(bk);
    });
    el.appendChild(bins);
    var tray = this.api.el('div', 'lbx-stray'), any = false;
    st.order.forEach(function (i) { if (st.bins[i] === null) { tray.appendChild(self._sortItem(i, false, help)); any = true; } });
    tray.hidden = !any;
    el.appendChild(tray);
  },
  _sortItem: function (i, wrong, help) {
    var st = this.st, r = st.r, it = r.items[i], C = LidBoxesCore, self = this;
    var cell = this.api.el('div', 'lbx-scell' + (wrong ? ' is-wrong' : '') + (st.picked === i ? ' is-picked' : ''));
    var b = this._picBtn(it.w, 'is-sort', 'item' + i); b.setAttribute('data-i', i);
    this._bindDrag(b, function () { return !st.done; }, function (hit) { if (hit === 'yes' || hit === 'no') self._place(i, hit); }, function () { self._pick(i); });
    cell.appendChild(b);
    if (wrong || help || st.done) {
      var k = C.boxOf(it.w, r.key), col = C.colours([it.w]);
      var one = this._box(it.w, k >= 0 ? k : 0, { open: k >= 0, pop: k >= 0 ? col[it.w.keys[k]] : null }); one.classList.add('is-one'); cell.appendChild(one);
    }
    return cell;
  },
  _pick: function (i) { var st = this.st; if (this._busy || st.done) return; st.picked = st.picked === i ? -1 : i; this.api.sound(500); this._say(st.r.items[i].w.word); this._paint(); },
  _place: function (i, bin) { var st = this.st; if (this._busy || st.done) return; if (LidBoxesCore.place(st, i, bin)) { st.picked = -1; this.api.sound(bin === 'yes' ? 620 : 440); this._view = {}; this._paint(); } },

  /* the connecting bars: from each popped target box to its partner in the test row */
  _drawBars: function () {
    var svg = this._bars, wrap = this._wrap; if (!svg || !wrap || !wrap.isConnected) return;
    var W = wrap.getBoundingClientRect(); svg.setAttribute('width', W.width); svg.setAttribute('height', W.height); svg.innerHTML = '';
    var tops = wrap.querySelectorAll('[data-pair^="t"]'), html = '';
    [].forEach.call(tops, function (t) {
      var c = wrap.querySelector('[data-pair="c' + t.getAttribute('data-pair').slice(1) + '"]'); if (!c) return;
      var a = t.getBoundingClientRect(), b = c.getBoundingClientRect();
      var x1 = a.left + a.width / 2 - W.left, y1 = a.bottom - W.top, x2 = b.left + b.width / 2 - W.left, y2 = b.top - W.top;
      var colr = getComputedStyle(t).getPropertyValue('--lbx-c') || '#146B5E';
      html += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#2A2A35" stroke-width="10" stroke-linecap="round"/><line class="lbx-barline" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (wrap.classList.contains('is-won') ? '#F2B233' : '#fff') + '" stroke-width="6" stroke-linecap="round"/>';
      void colr;
    });
    svg.innerHTML = html;
  },

  /* drag with a real pointer; a tap without moving runs onTap */
  _bindDrag: function (b, can, onDrop, onTap) {
    var self = this;
    b.addEventListener('pointerdown', function (ev) {
      if (self._busy || !can() || (ev.button !== undefined && ev.button !== 0)) return;
      var sx = ev.clientX, sy = ev.clientY, moved = false, ghost = null, img = b.querySelector('img');
      try { b.setPointerCapture(ev.pointerId); } catch (e) {}
      var hitAt = function (x, y) {
        var zones = self._wrap.querySelectorAll('.lbx-test,.lbx-line.is-target,.lbx-basket');
        for (var z = 0; z < zones.length; z++) { var r = zones[z].getBoundingClientRect(); if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return zones[z].classList.contains('lbx-basket') ? zones[z].getAttribute('data-bin') : 'drop'; }
        return null;
      };
      var move = function (e) {
        if (!moved && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!moved) { moved = true; self._drag = { over: null }; ghost = self.api.el('div', 'lbx-ghost'); ghost.innerHTML = img ? img.outerHTML : ''; document.body.appendChild(ghost); b.classList.add('is-lifted'); }
        ghost.style.left = (e.clientX - 40) + 'px'; ghost.style.top = (e.clientY - 40) + 'px';
        var h = hitAt(e.clientX, e.clientY); self._drag.over = h;
        [].forEach.call(self._wrap.querySelectorAll('.lbx-test,.lbx-basket'), function (z) { z.classList.toggle('is-over', (z.classList.contains('lbx-test') && h === 'drop') || z.getAttribute('data-bin') === h); });
      };
      var up = function (e) {
        b.removeEventListener('pointermove', move); b.removeEventListener('pointerup', up); b.removeEventListener('pointercancel', up);
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        b.classList.remove('is-lifted');
        if (!moved) { self._drag = null; if (e.type === 'pointerup') onTap(); return; }
        var h = hitAt(e.clientX, e.clientY); self._drag = null;
        if (h) onDrop(h); else self._paint();
      };
      b.addEventListener('pointermove', move); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up);
      ev.preventDefault();
    });
    b.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); onTap(); } });
  },
  _onKey: function (ev) {
    var st = this.st;
    if (st.r.task === 'sort' && st.picked >= 0 && (ev.key === 'y' || ev.key === 'Y' || ev.key === 'ArrowLeft')) { ev.preventDefault(); this._place(st.picked, 'yes'); return; }
    if (st.r.task === 'sort' && st.picked >= 0 && (ev.key === 'n' || ev.key === 'N' || ev.key === 'ArrowRight')) { ev.preventDefault(); this._place(st.picked, 'no'); return; }
    if (st.r.task === 'where' && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) { ev.preventDefault(); var n = st.r.target.boxes.length, c = st.chosen < 0 ? 0 : st.chosen + (ev.key === 'ArrowRight' ? 1 : -1); this._choose(Math.max(0, Math.min(n - 1, c))); return; }
  },

  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = LidBoxesCore, r = st.r;
    var res = C.check(st);
    if (res.kase === 'empty') { this.api.sound(460); this._view = {}; this._paint(); return; }
    this._busy = true; this._view = { testing: true, shakeOn: true, tilt: true };
    this._paint();
    var pops = r.task === 'same' ? res.lid.filter(function (p) { return p.same; }).length : 1;
    for (var k = 0; k < pops; k++) (function (k) { self._later(function () { self.api.sound(880 + k * 110); }, self._ms(120 + k * 160)); })(k);
    if (pops) this.api.announce(this._t('ariaPop'));
    if (res.ok) return this._win();
    this._later(function () {
      self._busy = false; self._view = { shakeOn: false }; self.api.sound(196);
      self._paint();
    }, this._ms(120 + pops * 160 + 600));
  },
  _win: function () {
    var self = this, st = this.st, r = st.r;
    this._later(function () {
      self._view = { won: true };
      if (r.task === 'same') {
        var c = LidBoxesCore.candAt(st, st.test), ai = LidBoxesCore.asked(r.target, r.pos), j = LidBoxesCore.lidTest(r.target, c.w).filter(function (p) { return p.i === ai; })[0].j;
        var col = LidBoxesCore.colours([r.target].concat(r.cands.map(function (x) { return x.w; })))[r.target.keys[ai]];
        var la = r.target.boxes[ai].replace(/_e$/, ''), lb = c.w.boxes[j].replace(/_e$/, '');
        self._shelf.push({ a: la, b: lb, c: col, wa: r.target.word, wb: c.w.word });
      }
      self._wrap.classList.add('is-won');
      self.api.sound(659); self._later(function () { self.api.sound(784); }, 110); self._later(function () { self.api.sound(1046); }, 220);
      self._say(r.task === 'same' ? r.target.word + ' … ' + LidBoxesCore.candAt(st, st.test).w.word : r.target ? r.target.word : '', 0.85);
      self._busy = false; self._paint();
    }, this._ms(450));
    this._later(function () { self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(450 + this.OK_MS));
  }
};

var lbxCssDone = false;
function injectLidCSS() {
  if (lbxCssDone || typeof document === 'undefined') return;
  lbxCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.lbx-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--lbx-ink:#2A2A35;--lbx-teal:#146B5E;--lbx-cream:#FFF8EC;user-select:none;-webkit-user-select:none;}'
  + '.lbx-wrap:focus{outline:none;}'
  + '.lbx-bars{position:absolute;left:0;top:0;pointer-events:none;overflow:visible;z-index:3;}'
  /* the shelf of pairs */
  + '.lbx-shelf{display:flex;flex-wrap:wrap;justify-content:flex-start;gap:6px;max-width:60%;} .lbx-shelf[hidden]{display:none;}'
  + '.lbx-token{display:inline-flex;align-items:center;gap:0;padding:3px 6px;border-radius:10px;background:#fff;box-shadow:0 1px 0 rgba(42,42,53,.18);}'
  + '.lbx-tb{display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:24px;padding:0 3px;border-radius:5px;border:2px solid var(--lbx-c);color:var(--lbx-c);font-weight:800;font-size:16px;line-height:1;font-family:' + D + ';background:var(--lbx-cream);}'
  + '.lbx-tbar{display:inline-block;width:12px;height:5px;background:#F2B233;border-radius:3px;}'
  /* the head: target picture, sound card, Coco */
  + '.lbx-head{display:flex;align-items:center;justify-content:center;gap:14px;}'
  + '.lbx-pic{display:inline-flex;align-items:center;justify-content:center;padding:6px;border:0;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 2px var(--lbx-ink),0 3px 0 rgba(42,42,53,.15);cursor:pointer;touch-action:none;}'
  + '.lbx-pic img{display:block;object-fit:contain;pointer-events:none;}'
  + '.lbx-pic.is-target img{width:var(--lbx-target);height:var(--lbx-target);}'
  + '.lbx-koala img{display:block;width:var(--lbx-koala);height:var(--lbx-koala);object-fit:contain;transform-origin:50% 90%;transition:transform .3s;}'
  + '.lbx-koala.is-tilt img{transform:rotate(-10deg);} .lbx-koala.is-hop img{animation:lbx-hop .6s ease-out;}'
  + '@keyframes lbx-hop{0%{transform:none;}40%{transform:translateY(-18px);}100%{transform:none;}}'
  + '.lbx-card{display:inline-flex;align-items:center;justify-content:center;min-width:72px;height:72px;padding:0 14px;border-radius:14px;background:var(--lbx-teal);color:#fff;font-weight:800;font-size:48px;line-height:1;font-family:' + D + ';box-shadow:0 3px 0 #0E4D44;}'
  /* sound boxes and lids */
  + '.lbx-board{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;}'
  + '.lbx-arrows{height:12px;align-items:flex-start;} .lbx-arrows span{width:var(--lbx-box);display:flex;justify-content:center;} .lbx-arrows span.is-on::before{content:"";border-left:11px solid transparent;border-right:11px solid transparent;border-top:12px solid #F2784B;}'
  + '.lbx-row{display:flex;align-items:flex-end;justify-content:center;gap:var(--lbx-gap);position:relative;}'
  + '.lbx-box{position:relative;flex:none;width:var(--lbx-box);height:var(--lbx-box);border-radius:10px;background:var(--lbx-cream);box-shadow:inset 0 0 0 3px var(--lbx-ink),inset 0 -6px 0 #CDBFA6;display:flex;align-items:center;justify-content:center;padding:0;border:0;font-family:' + D + ';}'
  + '.lbx-box.is-small{width:var(--lbx-tbox);height:var(--lbx-tbox);}'
  + '.lbx-row.is-mini .lbx-box{width:var(--lbx-mini,34px);height:var(--lbx-mini,34px);border-radius:6px;box-shadow:inset 0 0 0 2px var(--lbx-ink);} .lbx-row.is-mini{gap:3px;} .lbx-row.is-mini .lbx-let{font-size:calc(var(--lbx-mini,34px) * .6);} .lbx-row.is-mini .lbx-lid{height:6px;top:-6px;}'
  + '.lbx-scell{position:relative;} .lbx-box.is-one{position:absolute;right:-7px;top:-7px;z-index:2;width:32px;height:32px;border-radius:7px;} .lbx-box.is-one .lbx-let{font-size:18px;} .lbx-box.is-one .lbx-lid{left:-3px;right:-3px;height:6px;top:-7px;} .lbx-box.is-one:not(.is-open) .lbx-lid{height:calc(100% + 2px);top:-2px;}'
  + '.lbx-box.is-help.is-one{width:40px;height:40px;right:-10px;top:-10px;} .lbx-box.is-help .lbx-let{font-size:22px;}'
  + '.lbx-wrap.is-narrow{--lbx-mini:26px;} .lbx-wrap.is-narrow .lbx-bins{grid-template-columns:1fr;} .lbx-wrap.is-narrow .lbx-basket{flex-direction:row;align-items:flex-start;min-height:60px;padding:8px 6px;gap:6px;} .lbx-wrap.is-narrow .lbx-blabel{min-width:44px;width:44px;padding:0;} .lbx-wrap.is-narrow .lbx-bcard{font-size:22px;} .lbx-wrap.is-narrow .lbx-bin-items{flex:1;justify-content:flex-start;gap:6px;} .lbx-wrap.is-narrow .lbx-pic.is-sort{padding:1px;} .lbx-wrap.is-narrow .lbx-scell{gap:0;} .lbx-wrap.is-narrow .lbx-pic{padding:4px;} .lbx-wrap.is-narrow .lbx-stray{gap:6px;} .lbx-wrap.is-narrow.is-sort .lbx-head{display:none;}'
  + '.lbx-let{font-weight:800;font-size:calc(var(--lbx-box) * .48);line-height:1;color:var(--lbx-ink);visibility:hidden;}'
  + '.lbx-box.is-small .lbx-let{font-size:calc(var(--lbx-tbox) * .48);}'
  + '.lbx-box.is-open .lbx-let{visibility:visible;}'
  + '.lbx-lid{position:absolute;left:-5px;right:-5px;top:-2px;height:calc(100% + 2px);border-radius:10px;background:linear-gradient(#5C8F87,#3E716A);box-shadow:inset 0 0 0 3px var(--lbx-ink),0 3px 0 rgba(0,0,0,.18);transform-origin:50% 0;transition:transform .32s cubic-bezier(.3,1.6,.5,1),height .32s;}'
  + '.lbx-box.is-open .lbx-lid{height:12px;top:-14px;transform:rotate(-6deg);background:linear-gradient(#6FA59C,#4C8178);}'
  + '.lbx-box.is-pop{box-shadow:inset 0 0 0 4px var(--lbx-c),inset 0 -6px 0 #CDBFA6,0 0 0 4px rgba(255,255,255,.9);} .lbx-box.is-pop .lbx-let{color:var(--lbx-c);} .lbx-box.is-pop .lbx-lid{animation:lbx-pop .5s cubic-bezier(.3,1.8,.5,1);}'
  + '@keyframes lbx-pop{0%{transform:translateY(16px) rotate(0);}60%{transform:translateY(-6px) rotate(-12deg);}100%{transform:rotate(-6deg);}}'
  + '.lbx-box.is-asked{box-shadow:inset 0 0 0 3px var(--lbx-ink),inset 0 -6px 0 #CDBFA6,0 0 0 4px #F2784B;}'
  + '.lbx-box.is-asked.is-pop{box-shadow:inset 0 0 0 4px var(--lbx-c),inset 0 -6px 0 #CDBFA6,0 0 0 4px #F2784B;}'
  + '.lbx-box.is-shake{animation:lbx-shake .3s ease-in-out 2;} @keyframes lbx-shake{25%{transform:rotate(-4deg);}75%{transform:rotate(4deg);}}'
  + '.lbx-box.is-glow{box-shadow:inset 0 0 0 4px var(--lbx-teal),0 0 0 6px rgba(20,107,94,.3);}'
  + '.lbx-box.is-raised .lbx-lid{transform:rotate(-10deg) translateY(-6px);} .lbx-box.is-raised{box-shadow:inset 0 0 0 3px var(--lbx-ink),inset 0 -6px 0 #CDBFA6,0 0 0 4px #F2784B;}'
  + '.lbx-box.is-ghost{background:transparent;box-shadow:inset 0 0 0 2px rgba(42,42,53,.25);border:0;} .lbx-box.is-ghost .lbx-lid,.lbx-box.is-ghost .lbx-let{display:none;}'
  + 'button.lbx-box{cursor:pointer;}'
  + '.lbx-tail{align-self:center;font-weight:800;font-size:calc(var(--lbx-tbox) * .42);color:#A8A29A;font-family:' + D + ';margin-left:-2px;}'
  /* the test row */
  + '.lbx-line{display:flex;align-items:center;justify-content:center;gap:var(--lbx-colgap);} .lbx-lcol{flex:none;width:var(--lbx-colw);display:flex;justify-content:center;}'
  + '.lbx-row.is-target,.lbx-row.is-test,.lbx-row.lbx-arrows{width:var(--lbx-roww);}'
  + '.lbx-test{border-radius:16px;outline:3px dashed rgba(20,107,94,.35);outline-offset:7px;margin:4px 0;}'
  + '.lbx-row.is-test{gap:0;justify-content:space-between;} .lbx-row.is-test .lbx-tail{position:absolute;left:calc(100% + 4px);bottom:8px;}'
  + '.lbx-test.is-over{outline-color:#F2784B;background:rgba(242,120,75,.08);} .lbx-test.is-fade{opacity:.55;}'
  + '.lbx-pic.is-drop img{width:var(--lbx-drop);height:var(--lbx-drop);}'
  + '.lbx-slot{width:var(--lbx-drop);height:var(--lbx-drop);border-radius:12px;border:3px dashed rgba(42,42,53,.2);}'
  /* the tray */
  + '.lbx-tray{display:flex;justify-content:center;gap:clamp(10px,4vw,28px);}'
  + '.lbx-cell{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;justify-content:flex-end;}'
  + '.lbx-pic.is-cand img{width:var(--lbx-cand);height:var(--lbx-cand);} .lbx-pic.is-gone{opacity:.25;} .lbx-pic.is-lifted{opacity:.4;}'
  + '.lbx-ghost{position:fixed;z-index:9999;pointer-events:none;width:80px;height:80px;} .lbx-ghost img{width:80px;height:80px;object-fit:contain;filter:drop-shadow(0 6px 8px rgba(0,0,0,.25));}'
  /* sort */
  + '.lbx-bins{display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;}'
  + '.lbx-basket{display:flex;flex-direction:column;align-items:center;gap:8px;min-height:120px;padding:8px;border-radius:18px;background:#F3E6CF;box-shadow:inset 0 0 0 3px #B9905B;}'
  + '.lbx-basket.is-over{box-shadow:inset 0 0 0 4px #F2784B;}'
  + '.lbx-blabel{position:relative;display:inline-flex;align-items:center;justify-content:center;min-width:64px;min-height:48px;padding:0 12px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 2px var(--lbx-ink);cursor:pointer;}'
  + '.lbx-bcard{font-weight:800;font-size:30px;line-height:1;color:var(--lbx-teal);font-family:' + D + ';}'
  + '.lbx-bslash{position:absolute;left:10px;right:10px;top:50%;height:4px;background:#9A948B;transform:rotate(-24deg);border-radius:2px;}'
  + '.lbx-bin-items,.lbx-stray{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
  + '.lbx-stray[hidden]{display:none;}'
  + '.lbx-scell{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.lbx-pic.is-sort img{width:var(--lbx-sort);height:var(--lbx-sort);} .lbx-scell.is-picked .lbx-pic{box-shadow:inset 0 0 0 3px #F2784B,0 0 0 4px rgba(242,120,75,.3);transform:translateY(-4px);}'
  + '.lbx-scell.is-wrong .lbx-pic{box-shadow:inset 0 0 0 3px #A6461F;animation:lbx-shake .3s ease-in-out 2;}'
  /* the ask strip */
  + '.lbx-ask{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;}'
  + '.lbx-note{flex:1;min-height:28px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--lbx-teal);text-align:center;} .lbx-note:empty{display:none;} .lbx-note.is-ok{font-weight:800;} .lbx-note.is-wrong{color:#A6461F;}'
  + '.lbx-check{min-height:48px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .lbx-check[hidden]{display:none;} .lbx-check:disabled{opacity:.6;}'
  + '.lbx-wrap.is-narrow .lbx-note{text-align:left;}'
  + '@media (prefers-reduced-motion: reduce){.lbx-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'lbx-css'; s.textContent = css; document.head.appendChild(s);
}
