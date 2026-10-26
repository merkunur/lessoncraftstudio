/* =====================================================================
   roll-mat-activity.js — ACTIVITY #96 of the one-by-one rebuild: "Tuck's
   Ten Bundles — Add with Regrouping" → THE ROLL-UP MATS (1.NBT.C.4 with the
   2.NBT column faces, 11 locales).
   Design: docs/activities-rebuild/designs/096-place-value-regroup.md
   ---------------------------------------------------------------------
   THE INVENTION: every column has a mat with exactly ten wells, and the
   tenth well hangs out over that column's answer box — a full mat covers
   its own digit, so it has to be rolled up into a ten and carried next
   door, where it lands on a shelf (and writes the little 1). Taking away,
   a ten pulled down from next door unrolls into a full mat (and the
   written digit is struck and rewritten). A box opens only when its
   column and every column to its right is settled, so the digits are
   written ones first by themselves.
   ACTIVITY LAYER ONLY: the model is roll-mat-core.js; Tuck is the library
   picture pets/hamster via lcs-pictures.js; mats, cubes, rods, flats, the
   shelves and the sum are drawn apparatus; lcs-shell.js untouched (the
   shell's Check is hidden and pressed by this activity when the round is
   right).
   Test seams: window.RollMatActivity.st / ._pool / ._order / ._ensurePool
   / ._start / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var RollMatActivity = {
  id: 'roll-mat',
  apparatusClasses: ['rm-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble:   {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:      {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:         {en:'Tuck\'s Ten Bundles',de:'Tuck bündelt einen Zehner',nl:'Tuck maakt een tiental',da:'Tuck laver en tier',sv:'Tuck gör ett tiotal',no:'Tuck lager en tier',es:'Tuck forma una decena',it:'Tuck fa il cambio',pt:'Tuck agrupa uma dezena',fr:'Tuck fait une dizaine',fi:'Tuck tekee kympin'},
    instrAdd:      {en:'Add the blocks. Roll up a full mat and carry it next door.',de:'Leg die Steine dazu. Roll eine volle Matte auf und bring sie nach nebenan.',nl:'Leg de blokjes erbij. Rol een volle mat op en breng hem naar de kolom ernaast.',da:'Læg klodserne til. Rul en fuld måtte sammen, og bær den over til naboen.',sv:'Lägg till klossarna. Rulla ihop en full matta och bär den till grannen.',no:'Legg til klossene. Rull sammen en full matte og bær den over til naboen.',es:'Junta los bloques. Enrolla un tapete lleno y llévalo a la columna de al lado.',it:'Aggiungi i blocchi. Arrotola un tappetino pieno e portalo nella colonna accanto.',pt:'Junte os blocos. Enrole um tapete cheio e leve para a coluna ao lado.',fr:'Ajoute les blocs. Roule un tapis plein et porte-le dans la colonne d’à côté.',fi:'Lisää palikat. Kääri täysi matto rullalle ja vie se viereiseen sarakkeeseen.'},
    instrSub:      {en:'Take away. Need more? Pull one down from next door and unroll it.',de:'Nimm weg. Zu wenig? Hol einen von nebenan herunter und entbündle ihn.',nl:'Haal weg. Te weinig? Wissel er een in van de kolom ernaast.',da:'Tag væk. For få? Træk en ned fra naboen, og veksl den.',sv:'Ta bort. För få? Dra ner en från grannen och växla den.',no:'Ta bort. For få? Dra ned en fra naboen og veksle den.',es:'Quita. ¿No alcanza? Baja uno de la columna de al lado y desenróllalo.',it:'Togli. Non bastano? Prendi uno dalla colonna accanto e fai il cambio.',pt:'Tire. Faltou? Pegue um da coluna ao lado e desenrole.',fr:'Enlève. Pas assez ? Fais descendre un bloc d’à côté et déroule-le.',fi:'Ota pois. Liian vähän? Vedä yksi viereisestä sarakkeesta ja pura se.'},
    hintStart:     {en:'Bring the blocks over first.',de:'Leg zuerst die Steine dazu.',nl:'Leg eerst de blokjes erbij.',da:'Læg først klodserne til.',sv:'Lägg först till klossarna.',no:'Legg først til klossene.',es:'Primero junta los bloques.',it:'Prima aggiungi i blocchi.',pt:'Primeiro junte os blocos.',fr:'Ajoute d’abord les blocs.',fi:'Lisää ensin palikat.'},
    hintStartSub:  {en:'Take the blocks away first.',de:'Nimm zuerst die Steine weg.',nl:'Haal eerst de blokjes weg.',da:'Tag først klodserne væk.',sv:'Ta först bort klossarna.',no:'Ta først bort klossene.',es:'Primero quita los bloques.',it:'Prima togli i blocchi.',pt:'Primeiro tire os blocos.',fr:'Enlève d’abord les blocs.',fi:'Ota ensin palikat pois.'},
    hintCovered:   {en:'Something is lying on that box.',de:'Da liegt noch etwas auf dem Kästchen.',nl:'Er ligt nog iets op dat vakje.',da:'Der ligger noget på den boks.',sv:'Det ligger något på den rutan.',no:'Det ligger noe på den ruten.',es:'Hay algo encima de esa casilla.',it:'C’è qualcosa sopra quella casella.',pt:'Tem algo em cima dessa casinha.',fr:'Il y a quelque chose sur cette case.',fi:'Ruudun päällä on vielä jotain.'},
    hintWrite:     {en:'Now write the answer in the boxes.',de:'Schreib jetzt das Ergebnis in die Kästchen.',nl:'Schrijf nu het antwoord in de vakjes.',da:'Skriv nu svaret i boksene.',sv:'Skriv nu svaret i rutorna.',no:'Skriv nå svaret i rutene.',es:'Ahora escribe el resultado en las casillas.',it:'Ora scrivi il risultato nelle caselle.',pt:'Agora escreva o resultado nas casinhas.',fr:'Écris maintenant le résultat dans les cases.',fi:'Kirjoita nyt vastaus ruutuihin.'},
    hintCount:     {en:'Count what is left in this column — that is the digit.',de:'Zähl, was in dieser Spalte übrig ist – das ist die Ziffer.',nl:'Tel wat er in deze kolom over is — dat is het cijfer.',da:'Tæl, hvad der er tilbage i denne søjle – det er cifferet.',sv:'Räkna det som är kvar i den här kolumnen – det är siffran.',no:'Tell det som er igjen i denne kolonnen – det er sifferet.',es:'Cuenta lo que queda en esta columna: esa es la cifra.',it:'Conta quello che resta in questa colonna: quella è la cifra.',pt:'Conte o que sobrou nesta coluna: esse é o algarismo.',fr:'Compte ce qui reste dans cette colonne : c’est le chiffre.',fi:'Laske, mitä tähän sarakkeeseen jäi – se on numero.'},
    hintCount2:    {en:'Each mat has two halves of five — count the full half, then the rest.',de:'Jede Matte hat zwei Hälften zu fünf – zähl die volle Hälfte, dann den Rest.',nl:'Elke mat heeft twee helften van vijf — tel de volle helft en dan de rest.',da:'Hver måtte har to halvdele med fem – tæl den fulde halvdel og så resten.',sv:'Varje matta har två halvor med fem – räkna den fulla halvan och sedan resten.',no:'Hver matte har to halvdeler med fem – tell den fulle halvdelen og så resten.',es:'Cada tapete tiene dos mitades de cinco: cuenta la mitad llena y luego el resto.',it:'Ogni tappetino ha due metà da cinque: conta la metà piena, poi il resto.',pt:'Cada tapete tem duas metades de cinco: conte a metade cheia e depois o resto.',fr:'Chaque tapis a deux moitiés de cinq : compte la moitié pleine, puis le reste.',fi:'Jokaisessa matossa on kaksi viiden palikan puoliskoa – laske täysi puolisko ja sitten loput.'},
    hintAway:      {en:'Take away exactly {b} — look at the tray.',de:'Nimm genau {b} weg – schau auf das Tablett.',nl:'Haal precies {b} weg — kijk naar het schaaltje.',da:'Tag præcis {b} væk – se på bakken.',sv:'Ta bort exakt {b} – titta på brickan.',no:'Ta bort nøyaktig {b} – se på brettet.',es:'Quita exactamente {b}: mira la charola.',it:'Togli esattamente {b}: guarda il vassoio.',pt:'Tire exatamente {b}: olhe a bandeja.',fr:'Enlève exactement {b} : regarde le plateau.',fi:'Ota pois tasan {b} – katso tarjotinta.'},
    hintEmpty:     {en:'This column is empty. Pull one down from next door.',de:'Diese Spalte ist leer. Hol einen von nebenan herunter.',nl:'Deze kolom is leeg. Haal er een uit de kolom ernaast naar beneden.',da:'Denne søjle er tom. Træk en ned fra naboen.',sv:'Den här kolumnen är tom. Dra ner en från grannen.',no:'Denne kolonnen er tom. Dra ned en fra naboen.',es:'Esta columna está vacía. Baja uno de la columna de al lado.',it:'Questa colonna è vuota. Prendi uno dalla colonna accanto.',pt:'Esta coluna está vazia. Pegue um da coluna ao lado.',fr:'Cette colonne est vide. Fais descendre un bloc d’à côté.',fi:'Tämä sarake on tyhjä. Vedä yksi viereisestä sarakkeesta.'},
    hintFull:      {en:'This mat is already full.',de:'Diese Matte ist schon voll.',nl:'Deze mat is al vol.',da:'Denne måtte er allerede fuld.',sv:'Den här mattan är redan full.',no:'Denne matten er allerede full.',es:'Este tapete ya está lleno.',it:'Questo tappetino è già pieno.',pt:'Este tapete já está cheio.',fr:'Ce tapis est déjà plein.',fi:'Tämä matto on jo täynnä.'},
    okAddRoll:     {en:'{a} plus {b} makes {c} — ten ones rolled up into one ten!',de:'{a} plus {b} ist {c} – zehn Einer zu einem Zehner gebündelt!',nl:'{a} plus {b} is {c} — tien eenheden opgerold tot één tiental!',da:'{a} plus {b} giver {c} – ti enere rullet sammen til én tier!',sv:'{a} plus {b} blir {c} – tio ental ihoprullade till ett tiotal!',no:'{a} pluss {b} blir {c} – ti enere rullet sammen til én tier!',es:'¡{a} más {b} son {c}: diez unidades enrolladas en una decena!',it:'{a} più {b} fa {c}: dieci unità arrotolate in una decina!',pt:'{a} mais {b} dá {c}: dez unidades enroladas numa dezena!',fr:'{a} plus {b} égale {c} : dix unités roulées en une dizaine !',fi:'{a} plus {b} on {c} – kymmenen ykköstä käärittiin yhdeksi kympiksi!'},
    okAddHundred:  {en:'{a} plus {b} makes {c} — ten tens rolled up into one hundred!',de:'{a} plus {b} ist {c} – zehn Zehner zu einem Hunderter gebündelt!',nl:'{a} plus {b} is {c} — tien tientallen opgerold tot één honderdtal!',da:'{a} plus {b} giver {c} – ti tiere rullet sammen til ét hundrede!',sv:'{a} plus {b} blir {c} – tio tiotal ihoprullade till ett hundratal!',no:'{a} pluss {b} blir {c} – ti tiere rullet sammen til én hundrer!',es:'¡{a} más {b} son {c}: diez decenas enrolladas en una centena!',it:'{a} più {b} fa {c}: dieci decine arrotolate in un centinaio!',pt:'{a} mais {b} dá {c}: dez dezenas enroladas numa centena!',fr:'{a} plus {b} égale {c} : dix dizaines roulées en une centaine !',fi:'{a} plus {b} on {c} – kymmenen kymppiä käärittiin yhdeksi sadaksi!'},
    okAddBoth:     {en:'{a} plus {b} makes {c} — you rolled up a ten and a hundred!',de:'{a} plus {b} ist {c} – du hast einen Zehner und einen Hunderter gebündelt!',nl:'{a} plus {b} is {c} — je hebt een tiental en een honderdtal opgerold!',da:'{a} plus {b} giver {c} – du rullede en tier og et hundrede sammen!',sv:'{a} plus {b} blir {c} – du rullade ihop ett tiotal och ett hundratal!',no:'{a} pluss {b} blir {c} – du rullet sammen en tier og en hundrer!',es:'¡{a} más {b} son {c}: enrollaste una decena y una centena!',it:'{a} più {b} fa {c}: hai arrotolato una decina e un centinaio!',pt:'{a} mais {b} dá {c}: você enrolou uma dezena e uma centena!',fr:'{a} plus {b} égale {c} : tu as roulé une dizaine et une centaine !',fi:'{a} plus {b} on {c} – kääräisit kympin ja sadan!'},
    okAddNone:     {en:'{a} plus {b} makes {c} — no ten to roll this time.',de:'{a} plus {b} ist {c} – diesmal gab es nichts zu bündeln.',nl:'{a} plus {b} is {c} — deze keer viel er niets op te rollen.',da:'{a} plus {b} giver {c} – denne gang var der intet at rulle sammen.',sv:'{a} plus {b} blir {c} – den här gången fanns det inget att rulla ihop.',no:'{a} pluss {b} blir {c} – denne gangen var det ingenting å rulle sammen.',es:'{a} más {b} son {c}: esta vez no hubo nada que enrollar.',it:'{a} più {b} fa {c}: questa volta non c’era niente da arrotolare.',pt:'{a} mais {b} dá {c}: desta vez não havia nada para enrolar.',fr:'{a} plus {b} égale {c} : cette fois, rien à rouler.',fi:'{a} plus {b} on {c} – tällä kertaa ei ollut mitään käärittävää.'},
    okSubRoll:     {en:'{a} take away {b} leaves {c} — you unrolled a ten!',de:'{a} minus {b} ist {c} – du hast einen Zehner entbündelt!',nl:'{a} min {b} is {c} — je hebt een tiental ingewisseld!',da:'{a} minus {b} giver {c} – du vekslede en tier!',sv:'{a} minus {b} blir {c} – du växlade ett tiotal!',no:'{a} minus {b} blir {c} – du vekslet en tier!',es:'¡{a} menos {b} son {c}: desenrollaste una decena!',it:'{a} meno {b} fa {c}: hai cambiato una decina!',pt:'{a} menos {b} dá {c}: você desenrolou uma dezena!',fr:'{a} moins {b} égale {c} : tu as déroulé une dizaine !',fi:'{a} miinus {b} on {c} – purit yhden kympin!'},
    okSubHundred:  {en:'{a} take away {b} leaves {c} — you unrolled a hundred!',de:'{a} minus {b} ist {c} – du hast einen Hunderter entbündelt!',nl:'{a} min {b} is {c} — je hebt een honderdtal ingewisseld!',da:'{a} minus {b} giver {c} – du vekslede et hundrede!',sv:'{a} minus {b} blir {c} – du växlade ett hundratal!',no:'{a} minus {b} blir {c} – du vekslet en hundrer!',es:'¡{a} menos {b} son {c}: desenrollaste una centena!',it:'{a} meno {b} fa {c}: hai cambiato un centinaio!',pt:'{a} menos {b} dá {c}: você desenrolou uma centena!',fr:'{a} moins {b} égale {c} : tu as déroulé une centaine !',fi:'{a} miinus {b} on {c} – purit yhden sadan!'},
    okSubBoth:     {en:'{a} take away {b} leaves {c} — you unrolled a hundred and a ten!',de:'{a} minus {b} ist {c} – du hast einen Hunderter und einen Zehner entbündelt!',nl:'{a} min {b} is {c} — je hebt een honderdtal en een tiental ingewisseld!',da:'{a} minus {b} giver {c} – du vekslede et hundrede og en tier!',sv:'{a} minus {b} blir {c} – du växlade ett hundratal och ett tiotal!',no:'{a} minus {b} blir {c} – du vekslet en hundrer og en tier!',es:'¡{a} menos {b} son {c}: desenrollaste una centena y una decena!',it:'{a} meno {b} fa {c}: hai cambiato un centinaio e una decina!',pt:'{a} menos {b} dá {c}: você desenrolou uma centena e uma dezena!',fr:'{a} moins {b} égale {c} : tu as déroulé une centaine et une dizaine !',fi:'{a} miinus {b} on {c} – purit yhden sadan ja yhden kympin!'},
    okSub:         {en:'{a} take away {b} leaves {c}.',de:'{a} minus {b} ist {c}.',nl:'{a} min {b} is {c}.',da:'{a} minus {b} giver {c}.',sv:'{a} minus {b} blir {c}.',no:'{a} minus {b} blir {c}.',es:'{a} menos {b} son {c}.',it:'{a} meno {b} fa {c}.',pt:'{a} menos {b} dá {c}.',fr:'{a} moins {b} égale {c}.',fi:'{a} miinus {b} on {c}.'},
    check:         {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setNumbers:    {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    nOne:          {en:'+ one digit',de:'+ einstellig',nl:'+ één cijfer',da:'+ etcifret',sv:'+ ensiffrigt',no:'+ ensifret',es:'+ una cifra',it:'+ una cifra',pt:'+ um dígito',fr:'+ un chiffre',fi:'+ yksinumeroinen'},
    nTwo:          {en:'Two digits',de:'Zweistellig',nl:'Twee cijfers',da:'Tocifrede',sv:'Tvåsiffriga',no:'Tosifrede',es:'Dos cifras',it:'Due cifre',pt:'Dois dígitos',fr:'Deux chiffres',fi:'Kaksinumeroiset'},
    nThree:        {en:'Three digits',de:'Dreistellig',nl:'Drie cijfers',da:'Trecifrede',sv:'Tresiffriga',no:'Tresifrede',es:'Tres cifras',it:'Tre cifre',pt:'Três dígitos',fr:'Trois chiffres',fi:'Kolminumeroiset'},
    setWay:        {en:'Add or take away',de:'Rechenart',nl:'Soort som',da:'Regneart',sv:'Räknesätt',no:'Regneart',es:'Operación',it:'Operazione',pt:'Operação',fr:'Opération',fi:'Laskutapa'},
    wAdd:          {en:'Add',de:'Plus',nl:'Erbij',da:'Plus',sv:'Addera',no:'Pluss',es:'Sumar',it:'Aggiungere',pt:'Somar',fr:'Ajouter',fi:'Yhteen'},
    wSub:          {en:'Take away',de:'Minus',nl:'Eraf',da:'Minus',sv:'Subtrahera',no:'Minus',es:'Quitar',it:'Togliere',pt:'Tirar',fr:'Enlever',fi:'Pois'},
    wBoth:         {en:'Both',de:'Beides',nl:'Allebei',da:'Begge',sv:'Båda',no:'Begge',es:'Las dos',it:'Tutte e due',pt:'As duas',fr:'Les deux',fi:'Molemmat'},
    colH:          {en:'hundreds',de:'Hunderter',nl:'honderdtallen',da:'hundreder',sv:'hundratal',no:'hundrere',es:'centenas',it:'centinaia',pt:'centenas',fr:'centaines',fi:'sadat'},
    colT:          {en:'tens',de:'Zehner',nl:'tientallen',da:'tiere',sv:'tiotal',no:'tiere',es:'decenas',it:'decine',pt:'dezenas',fr:'dizaines',fi:'kymmenet'},
    colO:          {en:'ones',de:'Einer',nl:'eenheden',da:'enere',sv:'ental',no:'enere',es:'unidades',it:'unità',pt:'unidades',fr:'unités',fi:'ykköset'},
    ariaBay:       {en:'Mat of the {col}: {n}',de:'Matte der {col}: {n}',nl:'Mat van de {col}: {n}',da:'Måtte – {col}: {n}',sv:'Matta – {col}: {n}',no:'Matte – {col}: {n}',es:'Tapete de las {col}: {n}',it:'Tappetino – {col}: {n}',pt:'Tapete – {col}: {n}',fr:'Tapis des {col} : {n}',fi:'Matto – {col}: {n}'},
    ariaBayFull:   {en:'Mat of the {col}: {n}, the mat is full',de:'Matte der {col}: {n}, die Matte ist voll',nl:'Mat van de {col}: {n}, de mat is vol',da:'Måtte – {col}: {n}, måtten er fuld',sv:'Matta – {col}: {n}, mattan är full',no:'Matte – {col}: {n}, matten er full',es:'Tapete de las {col}: {n}, el tapete está lleno',it:'Tappetino – {col}: {n}, il tappetino è pieno',pt:'Tapete – {col}: {n}, o tapete está cheio',fr:'Tapis des {col} : {n}, le tapis est plein',fi:'Matto – {col}: {n}, matto on täynnä'},
    ariaShelfT:    {en:'A ten on the shelf — tap to put it in',de:'Ein Zehner auf dem Brett – tippen zum Hineinlegen',nl:'Een tiental op de plank — tik om het erin te leggen',da:'En tier på hylden – tryk for at lægge den i',sv:'Ett tiotal på hyllan – tryck för att lägga i det',no:'En tier på hylla – trykk for å legge den i',es:'Una decena en la repisa: toca para meterla',it:'Una decina sulla mensola: tocca per metterla dentro',pt:'Uma dezena na prateleira: toque para colocar',fr:'Une dizaine sur l’étagère : touche pour la mettre dedans',fi:'Kymppi hyllyllä – napauta, niin se menee mattoon'},
    ariaShelfH:    {en:'A hundred on the shelf — tap to put it in',de:'Ein Hunderter auf dem Brett – tippen zum Hineinlegen',nl:'Een honderdtal op de plank — tik om het erin te leggen',da:'Et hundrede på hylden – tryk for at lægge det i',sv:'Ett hundratal på hyllan – tryck för att lägga i det',no:'En hundrer på hylla – trykk for å legge den i',es:'Una centena en la repisa: toca para meterla',it:'Un centinaio sulla mensola: tocca per metterlo dentro',pt:'Uma centena na prateleira: toque para colocar',fr:'Une centaine sur l’étagère : touche pour la mettre dedans',fi:'Sata hyllyllä – napauta, niin se menee mattoon'},
    ariaUnroll:    {en:'Pull one down from next door ({col}) and unroll it',de:'Einen von nebenan ({col}) herunterholen und entbündeln',nl:'Er een uit de kolom ernaast ({col}) naar beneden halen en inwisselen',da:'Træk en ned fra naboen ({col}), og veksl den',sv:'Dra ner en från grannen ({col}) och växla den',no:'Dra ned en fra naboen ({col}) og veksle den',es:'Bajar uno de la columna de al lado ({col}) y desenrollarlo',it:'Prendere uno dalla colonna accanto ({col}) e fare il cambio',pt:'Pegar um da coluna ao lado ({col}) e desenrolar',fr:'Faire descendre un bloc d’à côté ({col}) et le dérouler',fi:'Vedä yksi viereisestä sarakkeesta ({col}) ja pura se'},
    ariaRoll:      {en:'Roll up the full mat ({col})',de:'Die volle Matte aufrollen ({col})',nl:'De volle mat oprollen ({col})',da:'Rul den fulde måtte sammen ({col})',sv:'Rulla ihop den fulla mattan ({col})',no:'Rull sammen den fulle matten ({col})',es:'Enrollar el tapete lleno ({col})',it:'Arrotolare il tappetino pieno ({col})',pt:'Enrolar o tapete cheio ({col})',fr:'Rouler le tapis plein ({col})',fi:'Kääri täysi matto rullalle ({col})'},
    ariaBox:       {en:'Answer box: {col}',de:'Ergebniskästchen: {col}',nl:'Antwoordvakje: {col}',da:'Svarboks: {col}',sv:'Svarsruta: {col}',no:'Svarrute: {col}',es:'Casilla del resultado: {col}',it:'Casella del risultato: {col}',pt:'Casinha do resultado: {col}',fr:'Case du résultat : {col}',fi:'Vastausruutu: {col}'},
    ariaBoxCovered:{en:'Answer box: {col}, covered',de:'Ergebniskästchen: {col}, zugedeckt',nl:'Antwoordvakje: {col}, bedekt',da:'Svarboks: {col}, dækket til',sv:'Svarsruta: {col}, övertäckt',no:'Svarrute: {col}, dekket til',es:'Casilla del resultado: {col}, tapada',it:'Casella del risultato: {col}, coperta',pt:'Casinha do resultado: {col}, coberta',fr:'Case du résultat : {col}, couverte',fi:'Vastausruutu: {col}, peitossa'},
    ariaTotal:     {en:'Answer box',de:'Ergebniskästchen',nl:'Antwoordvakje',da:'Svarboks',sv:'Svarsruta',no:'Svarrute',es:'Casilla del resultado',it:'Casella del risultato',pt:'Casinha do resultado',fr:'Case du résultat',fi:'Vastausruutu'},
    ariaTotalCovered:{en:'Answer box, covered',de:'Ergebniskästchen, zugedeckt',nl:'Antwoordvakje, bedekt',da:'Svarboks, dækket til',sv:'Svarsruta, övertäckt',no:'Svarrute, dekket til',es:'Casilla del resultado, tapada',it:'Casella del risultato, coperta',pt:'Casinha do resultado, coberta',fr:'Case du résultat, couverte',fi:'Vastausruutu, peitossa'},
    ariaBin:       {en:'To bring over ({col}): {n}',de:'Zum Dazulegen ({col}): {n}',nl:'Om erbij te leggen ({col}): {n}',da:'Til at lægge til ({col}): {n}',sv:'Att lägga till ({col}): {n}',no:'Å legge til ({col}): {n}',es:'Por juntar ({col}): {n}',it:'Da aggiungere ({col}): {n}',pt:'Para juntar ({col}): {n}',fr:'À ajouter ({col}) : {n}',fi:'Lisättävät ({col}): {n}'},
    ariaAway:      {en:'Taken away ({col}): {n}',de:'Weggenommen ({col}): {n}',nl:'Weggehaald ({col}): {n}',da:'Taget væk ({col}): {n}',sv:'Borttagna ({col}): {n}',no:'Tatt bort ({col}): {n}',es:'Quitados ({col}): {n}',it:'Tolti ({col}): {n}',pt:'Tirados ({col}): {n}',fr:'Enlevés ({col}) : {n}',fi:'Pois otetut ({col}): {n}'},
    ariaDel:       {en:'Delete',de:'Löschen',nl:'Wissen',da:'Slet',sv:'Radera',no:'Slett',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Poista'}
  },/*STRINGS-END*/

  defaults: { numbers: 'add1', way: 'add' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'add1', labelKey: 'nOne' }, { value: 'col2', labelKey: 'nTwo' }, { value: 'col3', labelKey: 'nThree' }] },
    { key: 'way', type: 'choice', labelKey: 'setWay', options: [{ value: 'add', labelKey: 'wAdd' }, { value: 'sub', labelKey: 'wSub' }, { value: 'both', labelKey: 'wBoth' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {}; this._box = null; this._stack = 0; this._hold = null;
    injectRollCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') LCSPictures.load('pets').then(function (t) { self._pics.pets = t; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
  },
  destroy: function () { this._clearTimers(); this._stopHold(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return RollMatCore.locale(((this.api && this.api.lang) || 'en')); },
  _face: function () { return RollMatCore.faceOf(this._setting('numbers')); },
  _way: function () { return RollMatCore.wayOf(this._setting('way')); },
  _key: function () { return this._face() + '.' + this._way(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = RollMatCore.ids(this._face(), this._way()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = RollMatCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice();
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = prev ? prev.map(function (p) { return pool[p]; }) : null;
      this._order = C.plan(this._face(), this._way(), Math.random, prevIds).order.map(function (id) { return pool.indexOf(id); }); this._orderForPool = pool; this._pass = pass;
    }
    var id = pool[this._order[pos]], pa = { msg: this._promptText(C.round(this._face(), id)) }; this._pa = pa;
    return {
      id: 'rollmat.' + this._loc() + '.' + this._key() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r) { return this._t(r.op === '+' ? 'instrAdd' : 'instrSub'); },
  _start: function (id, pos) {
    var C = RollMatCore;
    this._clearTimers(); this._stopHold(); this._heldUntil = 0; this._view = {}; this._pos = pos || 0; this._busy = false; this._box = null;
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
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'rm-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="rm-sum"></div><div class="rm-bench" role="group"></div><div class="rm-answers" role="group"></div><div class="rm-tray" role="group"></div><div class="rm-pad" role="group"></div><div class="rm-foot"></div><p class="rm-note" aria-live="polite"></p>';
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
  _colName: function (c) { return this._t(c === 'H' ? 'colH' : c === 'T' ? 'colT' : 'colO'); },
  /* the sizes for this width: one shared grid — a sign column, then one bay per column */
  _dims: function (L, r) {
    var n = r.cols.length, d = {};
    d.op = L.wide ? 34 : 22; d.gap = L.wide ? 14 : (L.tiny ? 5 : 7);
    d.bay = Math.max(64, Math.min(n === 3 ? 200 : 240, Math.floor((L.W - d.op - d.gap * n - 4) / n)));
    d.cellW = Math.max(18, Math.min(n === 3 ? 44 : 50, Math.floor((d.bay - 14) / 2)));
    d.cellH = Math.max(13, Math.min(L.wide ? 24 : (L.tiny ? 14 : 20), Math.round(d.cellW * 0.6)));
    d.grid = d.op + 'px repeat(' + n + ',' + d.bay + 'px)';
    d.digit = L.wide ? 34 : (L.tiny ? 22 : 26);
    d.pic = L.wide ? 96 : 64;
    return d;
  },
  /* one block, drawn for its column: a cube, a rod of ten, a flat of a hundred */
  _block: function (c, src, extra) {
    var b = document.createElement('i'); b.className = 'rm-blk is-' + c.toLowerCase() + ' is-' + src + (extra ? ' ' + extra : ''); return b;
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = RollMatCore, st = this.st, r = st.r, L = C.layout(this._width()), v = this._view, self = this, d = this._dims(L, r);
    var de = this._loc() === 'de', h = C.hint(st), shown = !!(v.checked && (st.show > 0 || st.done)), missCol = shown && h && !st.done ? h.col : null;
    var coverCol = v.checked && h && h.key === 'hintCovered' ? h.col : null;
    this._wrap.className = 'rm-wrap ' + (L.wide ? 'is-wide' : 'is-narrow') + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (r.op === '-' ? ' is-sub' : ' is-add') + ' is-' + r.face;
    this._wrap.style.setProperty('--rm-cw', d.cellW + 'px'); this._wrap.style.setProperty('--rm-ch', d.cellH + 'px');
    /* ---- the written sum ---- */
    var sum = this._q('.rm-sum'); sum.innerHTML = '';
    if (r.total) {
      sum.className = 'rm-sum is-line'; sum.style.gridTemplateColumns = '';
      sum.innerHTML = '<span class="rm-line" style="font-size:' + d.digit + 'px">' + r.a + ' <b>' + (r.op === '+' ? '+' : '−') + '</b> ' + r.b + ' =</span>';
    } else {
      sum.className = 'rm-sum is-cols'; sum.style.gridTemplateColumns = d.grid;
      var carryRow = function () {
        sum.appendChild(self.api.el('span', 'rm-cell'));
        r.cols.forEach(function (c) {
          var cell = self.api.el('span', 'rm-cell is-carryrow');
          if (r.op === '+' && C.rightOf(st, c)) { var bx = self.api.el('span', 'rm-carry' + (de ? ' is-de' : '') + (st.got[c] ? ' is-on' : '')); bx.textContent = st.got[c] ? String(st.got[c]) : ''; cell.appendChild(bx); }
          sum.appendChild(cell);
        });
      };
      if (!de) carryRow();
      sum.appendChild(this.api.el('span', 'rm-cell'));
      r.cols.forEach(function (c) {
        var cell = self.api.el('span', 'rm-cell is-digit'), dg = C.digit(r.a, c), lead = r.cols.indexOf(c) === 0 && dg === 0 && r.a < C.DATA.UNIT[c];
        var now = dg + 10 * st.got[c] - st.lost[c];
        if (r.op === '-' && (st.got[c] || st.lost[c])) cell.innerHTML = '<span class="rm-strike"><s>' + dg + '</s><sup>' + now + '</sup></span>';
        else cell.textContent = lead ? '' : String(dg);
        cell.style.fontSize = d.digit + 'px'; sum.appendChild(cell);
      });
      var opc = this.api.el('span', 'rm-cell is-op'); opc.textContent = r.op === '+' ? '+' : '−'; opc.style.fontSize = d.digit + 'px'; sum.appendChild(opc);
      r.cols.forEach(function (c) {
        var cell = self.api.el('span', 'rm-cell is-digit'), dg = C.digit(r.b, c), lead = r.b < C.DATA.UNIT[c];
        cell.textContent = lead ? '' : String(dg); cell.style.fontSize = d.digit + 'px'; sum.appendChild(cell);
      });
      if (de) carryRow();   /* German books write the Übertrag under the numbers, not above them: the carry row follows the second number */
    }
    /* ---- the bench ---- */
    var bench = this._q('.rm-bench'); bench.innerHTML = ''; bench.style.gridTemplateColumns = d.grid;
    bench.appendChild(this.api.el('span', 'rm-cell'));
    r.cols.forEach(function (c) {
      var col = st.cols[c], full = col.mat.length >= 10, bay = self.api.el('div', 'rm-bay' + (coverCol === c ? ' is-pulse' : '') + (missCol === c ? ' is-count' : '') + (missCol === c && st.show >= 2 ? ' is-fives' : ''));
      bay.setAttribute('data-col', c);
      var head = self.api.el('div', 'rm-head'); head.textContent = self._colName(c); bay.appendChild(head);
      /* the shelf: a ten (hundred) carried from next door waits here */
      var shelf = self.api.el('div', 'rm-shelf');
      if (C.rightOf(st, c)) {
        if (col.shelf) { var sb = self._btn('rm-shelfrod', 'shelf-' + c, self._t(c === 'H' ? 'ariaShelfH' : 'ariaShelfT')); for (var s = 0; s < col.shelf; s++) sb.appendChild(self._block(c, 'r')); sb.disabled = st.done; sb.addEventListener('click', function () { self._drop(c); }); shelf.appendChild(sb); }
        else shelf.appendChild(self.api.el('span', 'rm-ledge'));
      }
      /* take away: pull one down from next door */
      if (r.op === '-' && C.leftOf(st, c)) { var ub = self._btn('rm-unroll', 'unroll-' + c, self._t('ariaUnroll', { col: self._colName(C.leftOf(st, c)) }), '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 10 H32" stroke="#3A2E1F" stroke-width="5" stroke-linecap="round"/><path d="M20 15 V31 M13 24 L20 31 L27 24" fill="none" stroke="#146B5E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'); ub.disabled = st.done; ub.addEventListener('click', function () { self._unroll(c); }); shelf.appendChild(ub); }
      bay.appendChild(shelf);
      /* the doorstep: blocks that cannot get into a full mat */
      var door = self.api.el('div', 'rm-door' + (col.door.length ? ' is-busy' : ''));
      col.door.forEach(function (src) { door.appendChild(self._block(c, src, 'is-wait')); });
      bay.appendChild(door);
      /* the mat: ten wells, filled column by column, the tenth hanging over the box */
      var n = C.count(st, c);
      var mat = self._btn('rm-mat' + (full ? ' is-full' : ''), 'mat-' + c, self._t(full ? 'ariaBayFull' : 'ariaBay', { col: self._colName(c), n: n }));
      for (var k = 0; k < 10; k++) {
        var well = self.api.el('span', 'rm-well' + (k === 9 ? ' is-tenth' : '')); well.style.gridColumn = String(1 + Math.floor(k / 5)); well.style.gridRow = String(1 + k % 5);
        if (k < col.mat.length) well.appendChild(self._block(c, col.mat[k]));
        mat.appendChild(well);
      }
      mat.disabled = st.done;
      mat.addEventListener('click', function () { self._tapMat(c); });
      if (r.op === '-') mat.addEventListener('pointerdown', function (e) { self._startHold(e, function () { return self._take(c, true); }); });
      bay.appendChild(mat);
      if (full) { var gb = self._btn('rm-grip', 'roll-' + c, self._t('ariaRoll', { col: self._colName(c) }), '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M10 28 C10 14 30 14 30 22 C30 28 22 28 22 23" fill="none" stroke="#3A2E1F" stroke-width="4" stroke-linecap="round"/></svg>'); gb.disabled = st.done || !C.leftOf(st, c); gb.addEventListener('click', function () { self._roll(c); }); bay.appendChild(gb); }
      bench.appendChild(bay);
    });
    /* ---- the answer boxes, under the bays ---- */
    var ans = this._q('.rm-answers'); ans.innerHTML = ''; ans.style.gridTemplateColumns = d.grid;
    ans.appendChild(this.api.el('span', 'rm-cell'));
    var boxBtn = function (key, label, text, open, cov, wrong, okc, span) {
      var b = self._btn('rm-box' + (cov ? ' is-covered' : open ? '' : ' is-frost') + (self._box === key && open && !st.done ? ' is-sel' : '') + (wrong ? ' is-wrong' : '') + (okc ? ' is-ok' : ''), 'box-' + key, label);
      b.innerHTML = '<span class="rm-boxtxt" style="font-size:' + d.digit + 'px">' + text + '</span>';
      if (span) b.style.gridColumn = span;
      b.disabled = st.done || !open; b.addEventListener('click', function () { self._box = key; self._view = { checked: false }; self._paint(); });
      return b;
    };
    if (r.total) {
      var anyCov = r.cols.some(function (c) { return C.covered(st, c); }), open = C.boxOpen(st, null);
      ans.appendChild(boxBtn('total', this._t(anyCov ? 'ariaTotalCovered' : 'ariaTotal'), st.total, open, anyCov, shown && !st.done && h && h.key !== 'hintAway', st.done, '2 / span ' + r.cols.length));
    } else r.cols.forEach(function (c) {
      var cov = C.covered(st, c), open = C.boxOpen(st, c);
      ans.appendChild(boxBtn(c, self._t(cov ? 'ariaBoxCovered' : 'ariaBox', { col: self._colName(c) }), st.written[c], open, cov, missCol === c, st.done));
    });
    /* ---- the tray: the bin (add) or the away tray (take away) ---- */
    var tray = this._q('.rm-tray'); tray.innerHTML = ''; tray.style.gridTemplateColumns = d.grid;
    var tic = this.api.el('span', 'rm-cell rm-trayicon'); tic.innerHTML = r.op === '+' ? '<svg viewBox="0 0 30 30" aria-hidden="true"><path d="M4 12 H26 L22 26 H8 Z" fill="#E9D9BE" stroke="#3A2E1F" stroke-width="2.5" stroke-linejoin="round"/></svg>' : '<svg viewBox="0 0 30 30" aria-hidden="true"><path d="M4 12 H26 L22 26 H8 Z" fill="#D8CFBF" stroke="#3A2E1F" stroke-width="2.5" stroke-linejoin="round"/><path d="M9 8 H21" stroke="#E0603A" stroke-width="3" stroke-linecap="round"/></svg>';
    tray.appendChild(tic);
    r.cols.forEach(function (c) {
      var nn = r.op === '+' ? st.bin[c] : st.away[c];
      var b = self._btn('rm-heap' + (nn ? '' : ' is-empty'), (r.op === '+' ? 'bin-' : 'away-') + c, self._t(r.op === '+' ? 'ariaBin' : 'ariaAway', { col: self._colName(c), n: nn }));
      for (var k = 0; k < nn; k++) b.appendChild(self._block(c, r.op === '+' ? 'b' : 'a'));
      b.disabled = st.done || !nn;
      b.addEventListener('click', function () { if (self._swallow()) return; if (r.op === '+') self._pour(c); else self._giveBack(c); });
      if (r.op === '+') b.addEventListener('pointerdown', function (e) { self._startHold(e, function () { return self._pour(c, true); }); });
      tray.appendChild(b);
    });
    /* ---- the keypad, under the box being written ---- */
    var pad = this._q('.rd-pad, .rm-pad'); pad.innerHTML = '';
    var boxOpen = this._box && !st.done && (this._box === 'total' ? C.boxOpen(st, null) : C.boxOpen(st, this._box));
    pad.style.display = boxOpen ? '' : 'none';
    if (boxOpen) ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var kb = self._btn('rm-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('ariaDel') : null, k === 'del' ? '⌫' : k);
      kb.addEventListener('click', function () { self._key_(k); }); pad.appendChild(kb);
    });
    /* ---- Tuck, his stack of tens, and Check ---- */
    var foot = this._q('.rm-foot'); foot.innerHTML = '';
    var tuck = this.api.el('div', 'rm-tuck' + (st.done ? ' is-hop' : ''));
    var stack = this.api.el('span', 'rm-stack'); stack.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < Math.min(12, this._stack + (st.done ? st.rolls : 0)); i++) stack.appendChild(this.api.el('i', 'rm-mini'));
    tuck.appendChild(stack);
    var th = this._pics.pets, box = this.api.el('span', 'rm-tuckpic'); box.style.width = box.style.height = d.pic + 'px';
    if (th && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(th, C.DATA.TUCK[1], this._loc(), { size: d.pic }); im.className = 'rm-hamster'; im.alt = ''; im.style.width = im.style.height = d.pic + 'px'; box.appendChild(im); }
    tuck.appendChild(box); foot.appendChild(tuck);
    var ck = this._btn('rm-check', 'check', null); ck.textContent = this._t('check'); ck.disabled = st.done || !!this._busy;
    ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck);
    /* ---- the bubble ---- */
    var note = this._q('.rm-note');
    if (v.msg) { note.textContent = v.msg; note.className = 'rm-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'rm-note is-hint'; }
    else if (h && v.checked) { note.textContent = this._t(h.key, h.args); note.className = 'rm-note is-hint'; }
    else { note.textContent = ''; note.className = 'rm-note'; }
  },

  /* ---------------- actions ---------------- */
  _edit: function (note) { this._clearTimers(); this._busy = false; this._view = note ? { note: note } : {}; this._paint(); },
  _pour: function (c, quiet) { if (this._busy || this.st.done) return false; if (RollMatCore.pour(this.st, c)) { this.api.sound(this.st.cols[c].mat.length > 5 ? 560 : 500); this._edit(); return true; } return false; },
  _tapMat: function (c) {
    var C = RollMatCore, st = this.st; if (this._swallow()) return; if (this._busy || st.done) return;
    if (st.r.op === '-') { this._take(c); return; }
    if (st.cols[c].mat.length >= 10) { this._roll(c); return; }
    if (C.unpour(st, c)) { this.api.sound(420); this._edit(); }
  },
  _roll: function (c) {
    var st = this.st; if (this._busy || st.done) return;
    var res = RollMatCore.roll(st, c); if (!res) { this.api.sound(140); return; }
    this.api.sound(300); this._edit();
  },
  _drop: function (c) { if (this._busy || this.st.done) return; if (RollMatCore.dropShelf(this.st, c)) { this.api.sound(260); this._edit(); } },
  _unroll: function (c) {
    var st = this.st; if (this._busy || st.done) return;
    var res = RollMatCore.unroll(st, c); if (!res) return;
    if (res.result === 'empty') { this.api.sound(140); this._edit(this._t('hintEmpty')); return; }
    if (res.result === 'full') { this.api.sound(140); this._edit(this._t('hintFull')); return; }
    this.api.sound(240); this._edit();
  },
  _take: function (c, quiet) {
    var st = this.st; if (this._busy || st.done) return false;
    var res = RollMatCore.takeAway(st, c); if (!res) return false;
    if (res.result === 'empty') { if (!quiet) { this.api.sound(140); this._edit(this._t('hintEmpty')); } return false; }
    this.api.sound(620); this._edit(); return true;
  },
  _giveBack: function (c) { if (this._busy || this.st.done) return; if (RollMatCore.giveBack(this.st, c)) { this.api.sound(380); this._edit(); } },
  /* press and hold: one more every 120 ms after a short wait */
  _startHold: function (e, fn) {
    var self = this; this._poured = false;
    if (this.FAST || (e.button != null && e.button !== 0)) return;
    this._stopHold();
    var t0 = setTimeout(function () { self._hold = setInterval(function () { if (!fn()) self._stopHold(); else self._poured = true; }, 120); }, 380);
    this._holdWait = t0;
    var up = function () { if (self._poured) self._heldUntil = Date.now() + 300; self._poured = false; self._stopHold(); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up); };
    document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  /* the click that ends a press-and-hold pour is part of the hold, not a new tap — and only that one click */
  _swallow: function () { if (this._heldUntil && Date.now() < this._heldUntil) { this._heldUntil = 0; return true; } return false; },
  _stopHold: function () { if (this._holdWait) clearTimeout(this._holdWait); if (this._hold) clearInterval(this._hold); this._hold = null; this._holdWait = null; },
  _key_: function (k) {
    var C = RollMatCore, st = this.st, r = st.r; if (this._busy || st.done || !this._box) return;
    var col = this._box === 'total' ? null : this._box;
    var ok = k === 'del' ? C.del(st, col) : C.write(st, col, k);
    if (!ok) return;
    /* a written column moves the pen to the next box to the left */
    if (k !== 'del' && col) { var L = C.leftOf(st, col); if (L && st.written[L] === '' && C.boxOpen(st, L)) this._box = L; }
    this.api.sound(500); this._edit();
  },
  _check: function () {
    var C = RollMatCore, st = this.st, r = st.r;
    if (this._busy || st.done) return;
    var a = C.check(st); if (!a) return;
    this._box = null;
    if (a.result === 'none') { this._view = { checked: true }; this.api.sound(200); this._paint(); this.api.announce(this._q('.rm-note').textContent || ''); return; }
    this._view = { checked: true };
    if (a.result === 'ok') {
      var msg = this._t(C.okKey(r), { a: r.a, b: r.b, c: r.c }); this._view.msg = msg; this.api.sound(880); this._paint(); this.api.announce(msg);
      this._stack += st.rolls;
      this._advance(msg.length * 60 + 2400);
    } else { this.api.sound(220); this._paint(); this.api.announce(this._q('.rm-note').textContent || ''); }
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var rmCssDone = false;
function injectRollCSS() {
  if (rmCssDone || typeof document === 'undefined') return;
  rmCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.rm-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .rm-wrap:focus{outline:none;}'
  + '.rm-sum,.rm-bench,.rm-answers,.rm-tray{display:grid;column-gap:var(--rm-gap,10px);justify-content:center;}'
  + '.rm-wrap.is-wide .rm-sum,.rm-wrap.is-wide .rm-bench,.rm-wrap.is-wide .rm-answers,.rm-wrap.is-wide .rm-tray{column-gap:14px;} .rm-wrap.is-narrow .rm-sum,.rm-wrap.is-narrow .rm-bench,.rm-wrap.is-narrow .rm-answers,.rm-wrap.is-narrow .rm-tray{column-gap:7px;} .rm-wrap.is-tiny .rm-sum,.rm-wrap.is-tiny .rm-bench,.rm-wrap.is-tiny .rm-answers,.rm-wrap.is-tiny .rm-tray{column-gap:5px;}'
  /* the written sum on squared paper */
  + '.rm-sum.is-cols{padding:6px 0 4px;border-radius:8px;background-color:#FFFDF7;background-image:linear-gradient(#E6EEF3 1px,transparent 1px),linear-gradient(90deg,#E6EEF3 1px,transparent 1px);background-size:14px 14px;box-shadow:inset 0 0 0 2px #C9D6DE;}'
  + '.rm-cell{display:flex;align-items:flex-end;justify-content:center;font-family:' + H + ';font-weight:800;line-height:1.05;color:#3A2E1F;}'
  + '.rm-cell.is-op{color:#146B5E;} .rm-cell.is-digit{position:relative;} .rm-cell s{color:#9A8F80;text-decoration-thickness:3px;text-decoration-color:#E0603A;} .rm-strike{position:relative;display:inline-block;} .rm-strike sup{position:absolute;left:62%;bottom:78%;font-size:.5em;line-height:1;color:#C4532A;}'
  + '.rm-cell.is-carryrow{height:24px;align-items:center;} .rm-carry{display:flex;align-items:center;justify-content:center;width:22px;height:22px;border:2px dashed #9FB3BF;border-radius:6px;font-size:18px;color:#146B5E;transform:translateX(-55%);} .rm-carry.is-on{border-style:solid;border-color:#146B5E;background:#E6F3F0;} .rm-carry.is-de{width:20px;height:20px;font-size:14px;}'
  + '.rm-sum.is-line{display:flex;justify-content:center;} .rm-line{font-family:' + H + ';font-weight:800;color:#3A2E1F;} .rm-line b{color:#146B5E;}'
  /* the bench: one bay per column */
  + '.rm-bay{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:3px;padding:4px 4px 6px;border-radius:12px;background:#E9DCC4;box-shadow:inset 0 0 0 3px #8A6B42;}'
  + '.rm-bay.is-pulse{animation:rmPulse .5s ease-in-out 2;} @keyframes rmPulse{50%{box-shadow:inset 0 0 0 3px #8A6B42,0 0 0 5px #F4CF62;}}'
  + '.rm-head{font-family:' + B + ';font-weight:800;font-size:15px;color:#5A4A35;line-height:1.1;text-align:center;margin-bottom:auto;} .rm-wrap.is-narrow .rm-head{font-size:12px;}'
  + '.rm-shelf{display:flex;align-items:center;justify-content:center;gap:4px;min-height:44px;width:100%;} .rm-bay .rm-shelf:empty{min-height:0;}'
  + '.rm-ledge{display:block;flex:1 1 auto;min-width:16px;max-width:70%;height:8px;border-radius:3px;background:#C9A86E;box-shadow:inset 0 0 0 2px #8A6B42;}'
  + '.rm-shelfrod{display:flex;align-items:center;justify-content:center;gap:2px;min-width:52px;height:44px;border:0;border-radius:8px;background:#C9A86E;box-shadow:inset 0 0 0 2px #8A6B42,0 0 0 3px #F4CF62;cursor:pointer;padding:0 6px;} .rm-shelfrod:disabled{cursor:default;box-shadow:inset 0 0 0 2px #8A6B42;}'
  + '.rm-unroll{flex:none;width:44px;height:44px;border:0;border-radius:50%;background:#FFFDF7;box-shadow:inset 0 0 0 2px #3A2E1F;padding:4px;cursor:pointer;} .rm-unroll svg{width:100%;height:100%;display:block;} .rm-unroll:disabled{opacity:.4;cursor:default;}'
  + '.rm-door{display:none;flex-wrap:wrap;justify-content:center;align-content:flex-end;gap:2px;width:100%;padding:2px;border-radius:6px;box-sizing:border-box;} .rm-door.is-busy{display:flex;background:rgba(244,207,98,.35);box-shadow:inset 0 0 0 2px #F4CF62;}'
  + '.rm-door .rm-blk{transform:scale(.7);margin:-3px;}'
  + '.rm-mat{position:relative;display:grid;grid-template-columns:repeat(2,var(--rm-cw));grid-template-rows:repeat(5,var(--rm-ch));gap:3px;padding:5px;border:0;border-radius:8px;background:#F4E7CF;box-shadow:inset 0 0 0 2px #8A6B42;cursor:pointer;} .rm-mat::after{content:"";position:absolute;left:50%;top:6px;bottom:6px;width:2px;margin-left:-1px;background:rgba(138,107,66,.35);} .rm-mat:disabled{cursor:default;}'
  + '.rm-mat.is-full{box-shadow:inset 0 0 0 2px #8A6B42,0 0 0 3px #F4CF62;} .rm-mat.is-full{animation:rmCurl .5s ease-in-out 1;} @keyframes rmCurl{50%{transform:rotate(-1.5deg);}}'
  + '.rm-well{display:flex;align-items:center;justify-content:center;border-radius:4px;background:rgba(138,107,66,.14);box-shadow:inset 0 0 0 1px rgba(138,107,66,.35);}'
  + '.rm-well.is-tenth{position:relative;z-index:3;pointer-events:none;transform:translateY(calc(var(--rm-ch) + 22px));background:#F4E7CF;box-shadow:inset 0 0 0 2px #8A6B42,0 2px 0 #8A6B42;}'
  + '.rm-bay.is-fives .rm-mat::after{width:4px;margin-left:-2px;background:#E0603A;}'
  + '.rm-bay.is-count .rm-blk{transform:translateY(-3px);box-shadow:inset 0 0 0 2px rgba(0,0,0,.35),0 0 0 2px #F4CF62;}'
  /* the blocks */
  + '.rm-blk{display:block;flex:none;box-sizing:border-box;border-radius:2px;box-shadow:inset 0 0 0 2px rgba(0,0,0,.35);}'
  + '.rm-blk.is-o{width:calc(var(--rm-ch) - 5px);height:calc(var(--rm-ch) - 5px);}'
  + '.rm-blk.is-t{width:calc(var(--rm-cw) - 5px);height:calc(var(--rm-ch) * 0.5);background-image:repeating-linear-gradient(90deg,transparent 0,transparent calc(10% - 1px),rgba(0,0,0,.25) calc(10% - 1px),rgba(0,0,0,.25) 10%) !important;}'
  + '.rm-blk.is-h{width:calc(var(--rm-ch) + 4px);height:calc(var(--rm-ch) - 3px);background-image:repeating-linear-gradient(90deg,transparent 0,transparent calc(10% - 1px),rgba(0,0,0,.2) calc(10% - 1px),rgba(0,0,0,.2) 10%),repeating-linear-gradient(0deg,transparent 0,transparent calc(10% - 1px),rgba(0,0,0,.2) calc(10% - 1px),rgba(0,0,0,.2) 10%) !important;}'
  + '.rm-blk.is-a{background-color:#F2784B;} .rm-blk.is-b{background-color:#1E8A78;} .rm-blk.is-r{background-color:#FBF3E4;box-shadow:inset 0 0 0 2px #3A2E1F;}'
  + '.rm-blk.is-wait{animation:rmGlow 1.2s ease-in-out infinite;} @keyframes rmGlow{50%{filter:brightness(1.15);}}'
  + '.rm-grip{position:absolute;left:-6px;top:50%;width:44px;height:44px;margin-top:-22px;border:0;border-radius:50%;background:#F4CF62;box-shadow:inset 0 0 0 2px #3A2E1F;padding:4px;cursor:pointer;z-index:4;} .rm-grip svg{width:100%;height:100%;display:block;} .rm-grip:disabled{opacity:.5;}'
  /* the answer boxes: the rule above them, the tenth wells hanging over them */
  + '.rm-answers{position:relative;border-top:3px solid #3A2E1F;padding-top:6px;margin-top:-2px;}'
  + '.rm-box{position:relative;height:56px;border:0;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #3A2E1F;cursor:pointer;} .rm-box.is-sel{box-shadow:inset 0 0 0 4px #1E8A78,0 0 0 3px #F4CF62;}'
  + '.rm-box.is-frost{background:repeating-linear-gradient(135deg,#F2EBDD 0 6px,#E9E1D2 6px 12px);box-shadow:inset 0 0 0 2px #B9AE9C;cursor:default;} .rm-box.is-covered{background:repeating-linear-gradient(135deg,#E9DCC4 0 6px,#D8C6A5 6px 12px);box-shadow:inset 0 0 0 2px #8A6B42;cursor:default;}'
  + '.rm-box.is-wrong{animation:rmWob .45s ease-in-out 1;box-shadow:inset 0 0 0 3px #E0603A;} @keyframes rmWob{25%{transform:translateX(-4px);}75%{transform:translateX(4px);}} .rm-box.is-ok{box-shadow:inset 0 0 0 3px #146B5E,0 0 0 3px #F4CF62;}'
  + '.rm-boxtxt{font-family:' + H + ';font-weight:800;color:#3A2E1F;letter-spacing:.06em;}'
  /* the tray */
  + '.rm-tray{align-items:center;} .rm-trayicon svg{width:24px;height:24px;display:block;}'
  + '.rm-heap{display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:2px;min-height:48px;padding:4px;border:0;border-radius:10px;background:#E9D9BE;box-shadow:inset 0 0 0 2px #8A6B42;cursor:pointer;} .rm-heap.is-empty{background:transparent;box-shadow:inset 0 0 0 2px rgba(138,107,66,.3);cursor:default;}'
  + '.rm-heap .rm-blk{transform:scale(.8);margin:-2px;}'
  /* keypad, Tuck, Check, the bubble */
  + '.rm-pad{display:grid;grid-template-columns:repeat(6,48px);gap:5px;} .rm-key{height:48px;border:0;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42;font-family:' + H + ';font-weight:800;font-size:22px;color:#3A2E1F;cursor:pointer;}'
  + '.rm-foot{display:flex;align-items:flex-end;justify-content:center;gap:18px;width:100%;}'
  + '.rm-tuck{display:flex;align-items:flex-end;gap:4px;} .rm-tuckpic{display:block;} .rm-hamster{display:block;} .rm-tuck.is-hop .rm-tuckpic{animation:rmHop .48s ease-out 1;} @keyframes rmHop{30%{transform:translateY(-10px);}60%{transform:translateY(0);}80%{transform:translateY(-4px);}}'
  + '.rm-stack{display:flex;flex-direction:column-reverse;gap:2px;} .rm-mini{display:block;width:30px;height:6px;border-radius:2px;background:#FBF3E4;box-shadow:inset 0 0 0 1.5px #3A2E1F;}'
  + '.rm-check{min-height:52px;padding:6px 28px;border:0;border-radius:14px;background:#1E8A78;box-shadow:0 4px 0 #0F5C4F;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;cursor:pointer;} .rm-check:disabled{opacity:.5;cursor:default;}'
  + '.rm-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:3px;}'
  + '.rm-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .rm-note:empty{display:none;} .rm-note.is-hint{color:#B5461F;} .rm-note.is-ok{color:#146B5E;}'
  /* phones */
  + '.rm-wrap.is-narrow{gap:8px;} .rm-wrap.is-narrow .rm-note{font-size:17px;} .rm-wrap.is-narrow .rm-box{height:50px;} .rm-wrap.is-narrow .rm-pad{grid-template-columns:repeat(6,44px);gap:4px;} .rm-wrap.is-narrow .rm-key{height:44px;}'
  + '.rm-wrap.is-narrow .rm-bay{padding:4px 2px 6px;} .rm-wrap.is-tiny{gap:4px;} .rm-wrap.is-tiny .rm-check{min-height:48px;} .rm-wrap.is-tiny .rm-pad{gap:3px;} .rm-wrap.is-tiny .rm-box{height:46px;} .rm-wrap.is-tiny .rm-heap{min-height:44px;} .rm-wrap.is-tiny .rm-cell.is-carryrow{height:20px;} .rm-wrap.is-tiny .rm-bay{padding:3px 2px 4px;}'   /* the smallest phones: German's longer task line needs the room */
  + '.rm-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.rm-note,.rm-foot,.rm-pad,.rm-tray{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.rm-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'rm-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.RollMatActivity = RollMatActivity;
