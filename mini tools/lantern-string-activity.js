/* =====================================================================
   lantern-string-activity.js — ACTIVITY #27 of the one-by-one rebuild:
   "Make the Number" (K.OA.A.3) — THE TWO-ENDED LANTERN STRING.
   Design sheet: docs/activities-rebuild/designs/027-match-pairs.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: the target number is a string of exactly N bulbs between
   two sockets. The first number plugged lights it from the LEFT (coral),
   the second from the RIGHT (teal). When the two lights meet exactly the
   string flashes gold and the pair hangs on the garland as two paper
   lanterns; when they cross, the bulbs lit twice flicker white and number
   themselves (the size of the error); when they fall short, the dark bulbs
   between them show the gap. PAIR UP boards hold every pair once, MISSING
   rounds plug the given part and ask for its partner, WHOLE rounds give
   both parts and let the child choose how long the string is.
   "Lantern maker" is free play.

   ACTIVITY LAYER ONLY: the model is lantern-string-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity when the
   round is complete). Test seams: window.LanternStringActivity.st /
   ._order / ._pool / .FAST (no running lights, for the gates).
   ===================================================================== */
'use strict';

var LanternStringActivity = {
  id: 'lantern-string',
  apparatusClasses: ['ls-'],

  strings: {
    title:        {en:'Make the Number',de:'Bilde die Zahl',fr:'Forme le nombre',it:'Forma il numero',es:'Forma el número',pt:'Forme o número',nl:'Maak het getal',sv:'Bilda talet',da:'Lav tallet',no:'Lag tallet',fi:'Muodosta luku'},
    instruction:  {en:'Each number lights the string from one end. If the two lights meet exactly, the two numbers make the whole string!',de:'Jede Zahl lässt die Lichterkette von einem Ende her leuchten. Treffen sich die beiden Lichter genau, ergeben die zwei Zahlen zusammen die ganze Kette!',fr:'Chaque nombre allume la guirlande par un bout. Si les deux lumières se rejoignent pile, les deux nombres font toute la guirlande !',it:'Ogni numero accende il filo di lucine da un capo. Se le due luci si incontrano esattamente, i due numeri fanno tutto il filo!',es:'Cada número enciende la serie de foquitos desde un extremo. Si las dos luces se juntan exactamente, ¡los dos números forman toda la serie!',pt:'Cada número acende o pisca-pisca por uma ponta. Se as duas luzes se encontram certinho, os dois números formam o pisca-pisca inteiro!',nl:'Elk getal laat het lichtsnoer vanaf één kant branden. Komen de twee lichtjes precies bij elkaar, dan maken de twee getallen samen het hele snoer!',sv:'Varje tal tänder ljusslingan från ena änden. Möts de två ljusen precis, så blir de två talen tillsammans hela slingan!',da:'Hvert tal tænder lyskæden fra den ene ende. Mødes de to lys præcis, giver de to tal tilsammen hele kæden!',no:'Hvert tall tenner lysslyngen fra den ene enden. Møtes de to lysene akkurat, blir de to tallene til sammen hele slyngen!',fi:'Kumpikin luku sytyttää valosarjan omasta päästään. Jos valot kohtaavat tarkalleen, luvut tekevät yhdessä koko sarjan!'},
    promptPair:   {en:'Make {n}. Find every pair!',de:'Bilde {n}. Finde alle Paare!',fr:'Fais {n}. Trouve toutes les paires !',it:'Fai {n}. Trova tutte le coppie!',es:'Forma {n}. ¡Encuentra todas las parejas!',pt:'Forme {n}. Encontre todos os pares!',nl:'Maak {n}. Zoek alle paren!',sv:'Bilda {n}. Hitta alla par!',da:'Lav {n}. Find alle par!',no:'Lag {n}. Finn alle parene!',fi:'Tee {n}. Etsi kaikki parit!'},
    promptBoard:  {en:'Make {n}. Find the pairs on the board!',de:'Bilde {n}. Finde die Paare auf dem Spielfeld!',fr:'Fais {n}. Trouve les paires sur le plateau !',it:'Fai {n}. Trova le coppie sul tabellone!',es:'Forma {n}. ¡Encuentra las parejas del tablero!',pt:'Forme {n}. Encontre os pares do tabuleiro!',nl:'Maak {n}. Zoek de paren op het bord!',sv:'Bilda {n}. Hitta paren på brädet!',da:'Lav {n}. Find parrene på brættet!',no:'Lag {n}. Finn parene på brettet!',fi:'Tee {n}. Etsi laudan parit!'},
    promptMissing:{en:'Find the partner that makes {n}.',de:'Finde die Partnerzahl, die {n} ergibt.',fr:'Trouve le nombre qui va avec pour faire {n}.',it:'Trova il numero compagno che fa {n}.',es:'Encuentra el número que falta para formar {n}.',pt:'Encontre o número que falta para formar {n}.',nl:'Zoek het getal dat erbij hoort om {n} te maken.',sv:'Hitta kompisen som gör {n}.',da:'Find makkeren, der giver {n}.',no:'Finn makkeren som gir {n}.',fi:'Etsi pari, joka tekee luvun {n}.'},
    promptMissing10:{en:'Find the partner that makes 10.',de:'Finde die Partnerzahl, die 10 ergibt.',fr:'Trouve le nombre qui va avec pour faire 10.',it:'Trova il numero compagno che fa 10.',es:'Encuentra el número que falta para formar 10.',pt:'Encontre o número que falta para formar 10.',nl:'Zoek het verliefde hartje van 10!',sv:'Hitta tiokompisen!',da:'Find tier-vennen!',no:'Finn tiervennen!',fi:'Etsi kymppikaveri!'},
    promptWhole:  {en:'How long a string do {a} and {b} light? Choose, then light it.',de:'Wie lang ist die Kette, die {a} und {b} zum Leuchten bringen? Wähle und lass sie leuchten.',fr:'Quelle longueur de guirlande {a} et {b} allument-ils ? Choisis, puis allume.',it:'Quanto è lungo il filo che {a} e {b} accendono? Scegli, poi accendi.',es:'¿Qué tan larga es la serie que encienden {a} y {b}? Elige y luego enciéndela.',pt:'Qual é o tamanho do pisca-pisca que {a} e {b} acendem? Escolha e depois acenda.',nl:'Hoe lang is het snoer dat {a} en {b} laten branden? Kies en laat het branden.',sv:'Hur lång slinga tänder {a} och {b}? Välj och tänd den sedan.',da:'Hvor lang en kæde tænder {a} og {b}? Vælg, og tænd den så.',no:'Hvor lang slynge tenner {a} og {b}? Velg, og tenn den så.',fi:'Kuinka pitkän sarjan {a} ja {b} sytyttävät? Valitse ja sytytä sitten.'},
    hintPlug:     {en:'Tap a number to plug it in.',de:'Tipp auf eine Zahl, um sie einzustecken.',fr:'Touche un nombre pour le brancher.',it:'Tocca un numero per collegarlo.',es:'Toca un número para conectarlo.',pt:'Toque num número para ligá-lo.',nl:'Tik op een getal om het in te pluggen.',sv:'Tryck på ett tal för att koppla in det.',da:'Tryk på et tal for at sætte det i.',no:'Trykk på et tall for å koble det til.',fi:'Kytke luku napauttamalla sitä.'},
    hintChoose:   {en:'Choose how long the string is.',de:'Wähle, wie lang die Kette ist.',fr:'Choisis la longueur de la guirlande.',it:'Scegli quanto è lungo il filo.',es:'Elige qué tan larga es la serie.',pt:'Escolha o tamanho do pisca-pisca.',nl:'Kies hoe lang het snoer is.',sv:'Välj hur lång slingan är.',da:'Vælg, hvor lang kæden er.',no:'Velg hvor lang slyngen er.',fi:'Valitse, kuinka pitkä sarja on.'},
    hintCross1:   {en:'Too many lights — 1 is extra.',de:'Zu viele Lichter – 1 ist zu viel.',fr:'Trop de lumières\u202f: 1 de trop.',it:'Troppe luci: 1 di troppo.',es:'Demasiadas luces: sobra 1.',pt:'Luzes demais: sobra 1.',nl:'Te veel lichtjes: 1 te veel.',sv:'För många ljus – 1 är över.',da:'For mange lys – 1 er for meget.',no:'For mange lys – 1 er til overs.',fi:'Liikaa valoja – 1 jää yli.'},
    hintCross:    {en:'Too many lights — {k} are extra.',de:'Zu viele Lichter – {k} sind zu viel.',fr:'Trop de lumières\u202f: {k} de trop.',it:'Troppe luci: {k} di troppo.',es:'Demasiadas luces: sobran {k}.',pt:'Luzes demais: sobram {k}.',nl:'Te veel lichtjes: {k} te veel.',sv:'För många ljus – {k} är över.',da:'For mange lys – {k} er for mange.',no:'For mange lys – {k} er til overs.',fi:'Liikaa valoja – {k} jää yli.'},
    hintShort1:   {en:'Not enough — 1 bulb is still dark.',de:'Zu wenig – 1 Lämpchen ist noch dunkel.',fr:'Pas assez : 1 ampoule est encore éteinte.',it:'Non bastano: 1 lucina è ancora spenta.',es:'No alcanza: 1 foquito sigue apagado.',pt:'Falta: 1 lampadinha ainda está apagada.',nl:'Te weinig: 1 lampje is nog donker.',sv:'För få – 1 lampa är fortfarande mörk.',da:'For få – 1 pære er stadig mørk.',no:'For få – 1 lyspære er fortsatt mørk.',fi:'Liian vähän – 1 lamppu on vielä pimeä.'},
    hintShort:    {en:'Not enough — {k} bulbs are still dark.',de:'Zu wenig – {k} Lämpchen sind noch dunkel.',fr:'Pas assez : {k} ampoules sont encore éteintes.',it:'Non bastano: {k} lucine sono ancora spente.',es:'No alcanza: {k} foquitos siguen apagados.',pt:'Falta: {k} lampadinhas ainda estão apagadas.',nl:'Te weinig: {k} lampjes zijn nog donker.',sv:'För få – {k} lampor är fortfarande mörka.',da:'For få – {k} pærer er stadig mørke.',no:'For få – {k} lyspærer er fortsatt mørke.',fi:'Liian vähän – {k} lamppua on vielä pimeänä.'},
    hintWholeCross1:{en:'The string is too short — 1 light is extra.',de:'Die Kette ist zu kurz – 1 Licht ist zu viel.',fr:'La guirlande est trop courte\u202f: 1 lumière de trop.',it:'Il filo è troppo corto: 1 luce di troppo.',es:'La serie es muy corta: sobra 1 luz.',pt:'O pisca-pisca é curto demais: sobra 1 luz.',nl:'Het snoer is te kort: 1 lichtje te veel.',sv:'Slingan är för kort – 1 ljus är över.',da:'Kæden er for kort – 1 lys er for meget.',no:'Slyngen er for kort – 1 lys er til overs.',fi:'Sarja on liian lyhyt – 1 valo jää yli.'},
    hintWholeCross:{en:'The string is too short — {k} lights are extra.',de:'Die Kette ist zu kurz – {k} Lichter sind zu viel.',fr:'La guirlande est trop courte\u202f: {k} lumières de trop.',it:'Il filo è troppo corto: {k} luci di troppo.',es:'La serie es muy corta: sobran {k} luces.',pt:'O pisca-pisca é curto demais: sobram {k} luzes.',nl:'Het snoer is te kort: {k} lichtjes te veel.',sv:'Slingan är för kort – {k} ljus är över.',da:'Kæden er for kort – {k} lys er for mange.',no:'Slyngen er for kort – {k} lys er til overs.',fi:'Sarja on liian lyhyt – {k} valoa jää yli.'},
    hintWholeShort1:{en:'The string is too long — 1 bulb stays dark.',de:'Die Kette ist zu lang – 1 Lämpchen bleibt dunkel.',fr:'La guirlande est trop longue\u202f: 1 ampoule reste éteinte.',it:'Il filo è troppo lungo: 1 lucina resta spenta.',es:'La serie es muy larga: 1 foquito se queda apagado.',pt:'O pisca-pisca é comprido demais: 1 lampadinha fica apagada.',nl:'Het snoer is te lang: 1 lampje blijft donker.',sv:'Slingan är för lång – 1 lampa förblir mörk.',da:'Kæden er for lang – 1 pære forbliver mørk.',no:'Slyngen er for lang – 1 lyspære forblir mørk.',fi:'Sarja on liian pitkä – 1 lamppu jää pimeäksi.'},
    hintWholeShort:{en:'The string is too long — {k} bulbs stay dark.',de:'Die Kette ist zu lang – {k} Lämpchen bleiben dunkel.',fr:'La guirlande est trop longue\u202f: {k} ampoules restent éteintes.',it:'Il filo è troppo lungo: {k} lucine restano spente.',es:'La serie es muy larga: {k} foquitos se quedan apagados.',pt:'O pisca-pisca é comprido demais: {k} lampadinhas ficam apagadas.',nl:'Het snoer is te lang: {k} lampjes blijven donker.',sv:'Slingan är för lång – {k} lampor förblir mörka.',da:'Kæden er for lang – {k} pærer forbliver mørke.',no:'Slyngen er for lang – {k} lyspærer forblir mørke.',fi:'Sarja on liian pitkä – {k} lamppua jää pimeäksi.'},
    hintPartner:  {en:'The partner fills the dark bulbs.',de:'Die Partnerzahl füllt die dunklen Lämpchen.',fr:'Le nombre qui va avec remplit les ampoules éteintes.',it:'Il numero compagno riempie le lucine spente.',es:'La pareja llena los foquitos apagados.',pt:'O par preenche as lampadinhas apagadas.',nl:'Het getal dat erbij hoort, vult de donkere lampjes.',sv:'Kompisen fyller de mörka lamporna.',da:'Makkeren fylder de mørke pærer.',no:'Makkeren fyller de mørke lyspærene.',fi:'Pari täyttää pimeät lamput.'},
    hintBulbs:    {en:'The bulbs show the number.',de:'Die Lämpchen zeigen die Zahl.',fr:'Les ampoules montrent le nombre.',it:'Le lucine mostrano il numero.',es:'Los foquitos muestran el número.',pt:'As lampadinhas mostram o número.',nl:'De lampjes laten het getal zien.',sv:'Lamporna visar talet.',da:'Pærerne viser tallet.',no:'Lyspærene viser tallet.',fi:'Lamput näyttävät luvun.'},
    pairDone:     {en:'{a} + {b} = {n}!',de:'{a} + {b} = {n}!',fr:'{a} + {b} = {n} !',it:'{a} + {b} = {n}!',es:'¡{a} + {b} = {n}!',pt:'{a} + {b} = {n}!',nl:'{a} + {b} = {n}!',sv:'{a} + {b} = {n}!',da:'{a} + {b} = {n}!',no:'{a} + {b} = {n}!',fi:'{a} + {b} = {n}!'},
    celebrateAll: {en:'You found every pair that makes {n}!',de:'Du hast alle Paare gefunden, die {n} ergeben!',fr:'Tu as trouvé toutes les paires qui font {n}\u202f!',it:'Hai trovato tutte le coppie che fanno {n}!',es:'¡Encontraste todas las parejas que forman {n}!',pt:'Você encontrou todos os pares que formam {n}!',nl:'Je hebt alle paren gevonden die samen {n} maken!',sv:'Du hittade alla par som blir {n}!',da:'Du fandt alle par, der giver {n}!',no:'Du fant alle parene som blir {n}!',fi:'Löysit kaikki parit, jotka tekevät luvun {n}!'},
    celebrateBoard:{en:'Every pair on the board makes {n}!',de:'Jedes Paar auf dem Spielfeld ergibt {n}!',fr:'Chaque paire du plateau fait {n} !',it:'Ogni coppia sul tabellone fa {n}!',es:'¡Cada pareja del tablero forma {n}!',pt:'Cada par do tabuleiro forma {n}!',nl:'Elk paar op het bord maakt {n}!',sv:'Varje par på brädet blir {n}!',da:'Hvert par på brættet giver {n}!',no:'Hvert par på brettet blir {n}!',fi:'Jokainen laudan pari tekee luvun {n}!'},
    celebrateMake:{en:'{a} and {b} make {n}!',de:'{a} und {b} ergeben {n}!',fr:'{a} et {b} font {n} !',it:'{a} e {b} fanno {n}!',es:'¡{a} y {b} forman {n}!',pt:'{a} e {b} formam {n}!',nl:'{a} en {b} maken {n}!',sv:'{a} och {b} blir {n}!',da:'{a} og {b} giver {n}!',no:'{a} og {b} blir {n}!',fi:'{a} ja {b} tekevät {n}!'},
    celebratePass:{en:'Your garland is full of number pairs!',de:'Deine Girlande hängt voller Zahlenpaare!',fr:'Ta guirlande est pleine de paires de nombres !',it:'La tua ghirlanda è piena di coppie di numeri!',es:'¡Tu guirnalda está llena de parejas de números!',pt:'Sua guirlanda está cheia de pares de números!',nl:'Je slinger hangt vol getallenparen!',sv:'Din girlang är full av talpar!',da:'Din guirlande er fuld af talpar!',no:'Girlanderen din er full av tallpar!',fi:'Köynnöksesi on täynnä lukupareja!'},
    lightIt:      {en:'Light it',de:'Leuchten lassen',fr:'Allumer',it:'Accendi',es:'Encender',pt:'Acender',nl:'Laat branden',sv:'Tänd',da:'Tænd',no:'Tenn',fi:'Sytytä'},
    play:         {en:'Lantern maker',de:'Lichterwerkstatt',fr:'Atelier des lumières',it:'Laboratorio delle lucine',es:'Taller de foquitos',pt:'Oficina de luzes',nl:'Lampjesmaker',sv:'Lampverkstad',da:'Lysværksted',no:'Lysverksted',fi:'Valopaja'},
    playBack:     {en:'Back to the rounds',de:'Zurück zu den Runden',fr:'Retour aux manches',it:'Torna ai turni',es:'Volver a las rondas',pt:'Voltar às rodadas',nl:'Terug naar de rondes',sv:'Tillbaka till omgångarna',da:'Tilbage til runderne',no:'Tilbake til rundene',fi:'Takaisin kierroksiin'},
    playNote:     {en:'Choose a string, then light it with any two numbers.',de:'Wähle eine Kette und lass sie mit zwei beliebigen Zahlen leuchten.',fr:'Choisis une guirlande, puis allume-la avec deux nombres au choix.',it:'Scegli un filo, poi accendilo con due numeri qualsiasi.',es:'Elige una serie y enciéndela con dos números cualesquiera.',pt:'Escolha um pisca-pisca e acenda com dois números quaisquer.',nl:'Kies een snoer en laat het branden met twee getallen naar keuze.',sv:'Välj en slinga och tänd den med två valfria tal.',da:'Vælg en kæde, og tænd den med to tal, du selv vælger.',no:'Velg en slynge, og tenn den med to tall du velger selv.',fi:'Valitse sarja ja sytytä se kahdella luvulla.'},
    lenLess:      {en:'Shorter string',de:'Kürzere Kette',fr:'Guirlande plus courte',it:'Filo più corto',es:'Serie más corta',pt:'Pisca-pisca mais curto',nl:'Korter snoer',sv:'Kortare slinga',da:'Kortere kæde',no:'Kortere slynge',fi:'Lyhyempi sarja'},
    lenMore:      {en:'Longer string',de:'Längere Kette',fr:'Guirlande plus longue',it:'Filo più lungo',es:'Serie más larga',pt:'Pisca-pisca mais comprido',nl:'Langer snoer',sv:'Längre slinga',da:'Længere kæde',no:'Lengre slynge',fi:'Pidempi sarja'},
    card:         {en:'number {k}',de:'Zahl {k}',fr:'nombre {k}',it:'numero {k}',es:'número {k}',pt:'número {k}',nl:'getal {k}',sv:'talet {k}',da:'tallet {k}',no:'tallet {k}',fi:'luku {k}'},
    stringLabel:  {en:'String of {n} bulbs',de:'Kette mit {n} Lämpchen',fr:'Guirlande de {n} ampoules',it:'Filo di {n} lucine',es:'Serie de {n} foquitos',pt:'Pisca-pisca com {n} lampadinhas',nl:'Snoer met {n} lampjes',sv:'Slinga med {n} lampor',da:'Kæde med {n} pærer',no:'Slynge med {n} lyspærer',fi:'{n} lampun sarja'},
    stringUnbuilt:{en:'String not built yet',de:'Die Kette ist noch nicht gebaut',fr:'La guirlande n’est pas encore faite',it:'Il filo non è ancora pronto',es:'La serie aún no está armada',pt:'O pisca-pisca ainda não está montado',nl:'Het snoer is nog niet gemaakt',sv:'Slingan är inte byggd än',da:'Kæden er ikke bygget endnu',no:'Slyngen er ikke laget ennå',fi:'Sarjaa ei ole vielä tehty'},
    resMeet:      {en:'{a} and {b}: the lights meet exactly.',de:'{a} und {b}: Die Lichter treffen sich genau.',fr:'{a} et {b} : les lumières se rejoignent pile.',it:'{a} e {b}: le luci si incontrano esattamente.',es:'{a} y {b}: las luces se juntan exactamente.',pt:'{a} e {b}: as luzes se encontram certinho.',nl:'{a} en {b}: de lichtjes komen precies bij elkaar.',sv:'{a} och {b}: ljusen möts precis.',da:'{a} og {b}: lysene mødes præcis.',no:'{a} og {b}: lysene møtes akkurat.',fi:'{a} ja {b}: valot kohtaavat tarkalleen.'},
    resCross:     {en:'{a} and {b}: {k} too many.',de:'{a} und {b}: {k} zu viel.',fr:'{a} et {b} : {k} de trop.',it:'{a} e {b}: {k} di troppo.',es:'{a} y {b}: {k} de más.',pt:'{a} e {b}: {k} a mais.',nl:'{a} en {b}: {k} te veel.',sv:'{a} och {b}: {k} för många.',da:'{a} og {b}: {k} for mange.',no:'{a} og {b}: {k} for mange.',fi:'{a} ja {b}: {k} liikaa.'},
    resShort:     {en:'{a} and {b}: {k} too few.',de:'{a} und {b}: {k} zu wenig.',fr:'{a} et {b} : il en manque {k}.',it:'{a} e {b}: ne mancano {k}.',es:'{a} y {b}: faltan {k}.',pt:'{a} e {b}: faltam {k}.',nl:'{a} en {b}: {k} te weinig.',sv:'{a} och {b}: {k} för få.',da:'{a} og {b}: {k} for få.',no:'{a} og {b}: {k} for få.',fi:'{a} ja {b}: {k} liian vähän.'},
    garlandLabel: {en:'Pairs found: {f} of {t}',de:'Gefundene Paare: {f} von {t}',fr:'Paires trouvées : {f} sur {t}',it:'Coppie trovate: {f} su {t}',es:'Parejas encontradas: {f} de {t}',pt:'Pares encontrados: {f} de {t}',nl:'Gevonden paren: {f} van {t}',sv:'Hittade par: {f} av {t}',da:'Fundne par: {f} af {t}',no:'Funne par: {f} av {t}',fi:'Löydetyt parit: {f}/{t}'},
    keysLabel:    {en:'How long is the string?',de:'Wie lang ist die Kette?',fr:'Quelle est la longueur de la guirlande ?',it:'Quanto è lungo il filo?',es:'¿Qué tan larga es la serie?',pt:'Qual é o tamanho do pisca-pisca?',nl:'Hoe lang is het snoer?',sv:'Hur lång är slingan?',da:'Hvor lang er kæden?',no:'Hvor lang er slyngen?',fi:'Kuinka pitkä sarja on?'},
    setNumbers:   {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    upto5:        {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opp til 5',fi:'5:een asti'},
    six9:         {en:'6 to 9',de:'6 bis 9',fr:'De 6 à 9',it:'Da 6 a 9',es:'Del 6 al 9',pt:'De 6 a 9',nl:'6 tot en met 9',sv:'6 till 9',da:'6 til 9',no:'6 til 9',fi:'6–9'},
    ten:          {en:'Make 10',de:'10 bilden',fr:'Faire 10',it:'Fare 10',es:'Formar 10',pt:'Formar 10',nl:'10 maken',sv:'Bilda 10',da:'Lav 10',no:'Lag 10',fi:'Tee 10'},
    setDots:      {en:'Card dots',de:'Punkte auf den Karten',fr:'Points sur les cartes',it:'Pallini sulle carte',es:'Puntos en las tarjetas',pt:'Bolinhas nas cartas',nl:'Stippen op de kaarten',sv:'Prickar på korten',da:'Prikker på kortene',no:'Prikker på kortene',fi:'Pisteet korteissa'},
    off:          {en:'Off',de:'Aus',fr:'Non',it:'No',es:'No',pt:'Não',nl:'Uit',sv:'Av',da:'Fra',no:'Av',fi:'Pois'},
    on:           {en:'On',de:'An',fr:'Oui',it:'Sì',es:'Sí',pt:'Sim',nl:'Aan',sv:'På',da:'Til',no:'På',fi:'Päällä'}
  },

  defaults: { numbers: 'upto5', dots: 'off' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'upto5', labelKey: 'upto5' }, { value: 'six9', labelKey: 'six9' }, { value: 'ten', labelKey: 'ten' }] },
    { key: 'dots', type: 'choice', labelKey: 'setDots', options: [{ value: 'off', labelKey: 'off' }, { value: 'on', labelKey: 'on' }] }
  ],

  RUN_MS: 70, SHOW_MS: 1200, MEET_MS: 900, FAST: false,
  NOTES: [523, 587, 659, 784, 880, 1047, 1175, 1319, 1568, 1760],

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._play = null; this._playing = false; this._round = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._busy = false; this._timers = []; this._ro = null; this._show = null; this._run = null;
    injectLanternStringCSS();
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var st = self._cur(); if (!st || st.done) return;
      if (st.kind === 'whole' && /^[0-9]$/.test(ev.key)) { var v = ev.key === '0' ? 10 : +ev.key; if (v >= 2) self._choose(v); ev.preventDefault(); }
      else if ((ev.key === 'l' || ev.key === 'L') && (st.kind === 'missing' || st.kind === 'whole')) { self._light(); ev.preventDefault(); }
      else if (ev.key === 'Backspace') { self._unplug(); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._clearTimers();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._keyHandler && typeof document !== 'undefined') document.removeEventListener('keydown', this._keyHandler);
  },
  onSettings: function () {
    var key = this._level();
    if (this._poolKey !== key) { this._pool = null; this._order = null; this._playing = false; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },

  /* ---------------- rounds ---------------- */
  _level: function () { return LanternStringCore.level(this.api && this.api.settings && this.api.settings.numbers); },
  _dotsOn: function () { return !!(this.api && this.api.settings && this.api.settings.dots === 'on'); },
  _ensurePool: function () { var key = this._level(); if (!this._pool || this._poolKey !== key) { this._pool = LanternStringCore.rounds(key); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = LanternStringCore.order(pool, Math.random, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = LanternStringCore.order(pool, Math.random, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    var last = index % n === n - 1;
    var pk = LanternStringCore.promptKey(r);
    if (pk === 'promptMissing' && r.n === 10) pk = 'promptMissing10';
    return {
      id: 'lantern-string.' + r.id,
      promptKey: pk,
      promptArgs: { n: r.n, a: r.kind === 'missing' ? r.given : r.a, b: r.kind === 'missing' ? r.answer : r.b },
      celebrateKey: LanternStringCore.celebrateKey(r, last),
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool.st = LanternStringCore.newState(r); tool._round = r; tool._playing = false;
        tool._busy = false; tool._show = null; tool._run = null;
      },
      /* this activity presses Check itself when the round is complete */
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _cur: function () { return this._playing ? this._play : this.st; },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, self = this;
    if (!this.st) { this._round = LanternStringCore.rounds('upto5')[0]; this.st = LanternStringCore.newState(this._round); }
    var stage = api.stage;
    stage.innerHTML = '';
    var wrap = api.el('div', 'ls-wrap'); this._wrap = wrap;
    var body = api.el('div', 'ls-body');
    var main = api.el('div', 'ls-main');

    /* the lantern string */
    var str = api.el('div', 'ls-string'); str.setAttribute('role', 'img'); this._str = str;
    var cord = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); cord.setAttribute('class', 'ls-cord'); cord.setAttribute('aria-hidden', 'true'); this._cord = cord; str.appendChild(cord);
    var sockL = api.el('span', 'ls-sock ls-sockL'); sockL.setAttribute('aria-hidden', 'true'); sockL.innerHTML = '<b class="ls-plug"></b>'; this._sockL = sockL; str.appendChild(sockL);
    var bulbs = api.el('div', 'ls-bulbs'); bulbs.setAttribute('aria-hidden', 'true'); this._bulbs = bulbs; str.appendChild(bulbs);
    var sockR = api.el('span', 'ls-sock ls-sockR'); sockR.setAttribute('aria-hidden', 'true'); sockR.innerHTML = '<b class="ls-plug"></b>'; this._sockR = sockR; str.appendChild(sockR);
        var tag = api.el('span', 'ls-tag'); tag.setAttribute('aria-hidden', 'true'); this._tag = tag; str.appendChild(tag);
    var top = api.el('div', 'ls-top');
    var ghost = api.el('div', 'ls-ghost'); ghost.setAttribute('aria-hidden', 'true'); this._ghost = ghost; top.appendChild(ghost);
    var overEl = api.el('div', 'ls-over'); overEl.setAttribute('aria-hidden', 'true'); this._overEl = overEl; top.appendChild(overEl);
    top.appendChild(str);

    /* the board / tray, the whole keys, the length stepper */
    var board = api.el('div', 'ls-board'); board.setAttribute('role', 'group'); this._board = board; main.appendChild(board);
    var keys = api.el('div', 'ls-keys'); keys.setAttribute('role', 'group'); this._keys = keys; main.appendChild(keys);
    var stepper = api.el('div', 'ls-stepper'); this._stepper = stepper;
    var less = api.el('button', 'ls-step'); less.type = 'button'; less.textContent = '−'; less.addEventListener('click', function () { self._len(-1); }); this._lessBtn = less;
    var more = api.el('button', 'ls-step'); more.type = 'button'; more.textContent = '+'; more.addEventListener('click', function () { self._len(1); }); this._moreBtn = more;
    stepper.appendChild(less); stepper.appendChild(more); main.appendChild(stepper);

    /* the garland */
    var side = api.el('div', 'ls-side'); this._side = side;
    var garland = api.el('div', 'ls-garland'); garland.setAttribute('role', 'group'); this._garland = garland; side.appendChild(garland);

    body.appendChild(main); body.appendChild(side);
    wrap.appendChild(top);
    wrap.appendChild(body);
    var note = api.el('div', 'ls-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var row = api.el('div', 'ls-actions'); this._actions = row;
    var lightBtn = api.el('button', 'ls-light'); lightBtn.type = 'button'; lightBtn.addEventListener('click', function () { self._light(); }); this._lightBtn = lightBtn; row.appendChild(lightBtn);
    var playBtn = api.el('button', 'ls-tool'); playBtn.type = 'button'; playBtn.addEventListener('click', function () { self._togglePlay(); }); this._playBtn = playBtn; row.appendChild(playBtn);
    wrap.appendChild(row);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _layout: function () {
    var st = this._cur(), n = (st && st.kind === 'whole' ? (st.chosen || st.n) : (st && st.n)) || 10;
    var L = this._L = LanternStringCore.layout(this._width(), 10), w = this._wrap;
    var Ln = LanternStringCore.layout(this._width(), n);
    this._Ln = Ln;
    w.classList.toggle('is-wide', L.mode === 'wide'); w.classList.toggle('is-narrow', L.mode === 'narrow');
    w.classList.toggle('is-tiny', L.left < 330);
    w.style.setProperty('--ls-col', L.col + 'px');
    w.style.setProperty('--ls-cw', L.card.w + 'px'); w.style.setProperty('--ls-ch', L.card.h + 'px'); w.style.setProperty('--ls-cf', L.card.font + 'px');
    w.style.setProperty('--ls-key', L.key + 'px');
    w.style.setProperty('--ls-sock', L.socket + 'px');
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._paint();
    });
    this._ro.observe(this.api.stage);
  },

  /* what the string shows now: {len, a, b, la, lb, result, k, gold, marks, bracket} */
  _view: function () {
    var st = this._cur(), C = LanternStringCore, v;
    if (this._show) {
      v = { len: this._show.len, a: this._show.a, b: this._show.b, gold: !!this._show.gold, marks: this._show.marks || null, bracket: null };
    } else {
      var p = C.plugged(st), len = C.length(st);
      v = { len: len, a: p[0], b: p[1], gold: false, marks: null, bracket: null };
      if (st.kind === 'whole') { var lit = st.last && st.last.a != null; if (!lit) { v.a = null; v.b = null; } else { v.marks = C.errorMarks(st); v.gold = st.last.result === 'meet'; } }
      if (st.kind === 'missing') { v.marks = C.errorMarks(st); v.gold = !!st.done; }
      if (st.kind === 'pair') { v.bracket = C.bracket(st); }
      if (st.kind === 'missing' && !v.marks) v.bracket = C.bracket(st);
      if (st.explore && v.a != null && v.b != null && C.light(v.a, v.b, v.len).result === 'meet') v.gold = true;
    }
    v.la = v.a == null ? 0 : (this._run ? Math.min(v.a, this._run.la) : v.a);
    v.lb = v.b == null ? 0 : (this._run ? Math.min(v.b, this._run.lb) : v.b);
    if (this._run) v.gold = false;
    if (v.a != null && v.b != null && v.len) { var t = C.light(v.a, v.b, v.len); v.result = t.result; v.k = t.k; }
    return v;
  },

  /* ---------------- paint ---------------- */
  _paint: function () {
    var st = this._cur(), t = this.api.t, self = this, C = LanternStringCore;
    if (!st || !this._wrap) return;
    var w = this._wrap, r = this._round, v = this._view();
    w.classList.toggle('is-play', !!st.explore);
    w.classList.toggle('is-done', !!st.done);
    w.classList.toggle('is-dots', this._dotsOn());
    w.classList.toggle('is-whole', st.kind === 'whole');
    var Ln = LanternStringCore.layout(this._width(), v.len || 10);

    /* the string */
    var len = v.len || 0, bulbW = Ln.bulb, sp = Ln.sp, five = len > 5 ? Ln.five : 0;
    var bw = len ? len * bulbW + (len - 1) * sp + five : Math.max(160, Math.min(420, this._width() - 2 * Ln.socket - 40));
    var sag = Math.round(bulbW * 0.35), bh = bulbW + sag + 6;
    this._bulbs.style.width = bw + 'px'; this._bulbs.style.height = bh + 'px';
    var states = len ? C.bulbs(Math.min(v.la, len), Math.min(v.lb, len), len) : [];
    if (this._bulbs.children.length !== len) {
      this._bulbs.innerHTML = '';
      for (var i = 0; i < len; i++) { var bEl = this.api.el('span', 'ls-bulb'); bEl.innerHTML = '<i class="ls-cap"></i><b class="ls-mk"></b>'; this._bulbs.appendChild(bEl); }
    }
    var pts = [];
    for (var j = 0; j < len; j++) {
      var el = this._bulbs.children[j], x = j * (bulbW + sp) + (j >= 5 && len > 5 ? five : 0), tt = (j + 0.5) / len, y = Math.round(sag * 4 * tt * (1 - tt));
      el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.width = bulbW + 'px'; el.style.height = bulbW + 'px';
      var s = states[j];
      el.className = 'ls-bulb is-' + (v.gold && s !== 'dark' ? 'gold' : s);
      var mk = v.marks && v.marks.inside[j] !== '' && v.marks.inside[j] != null ? String(v.marks.inside[j]) : '';
      var inBr = v.bracket && j >= v.bracket.from && j < v.bracket.to && s === 'dark';
      el.classList.toggle('is-br', !!inBr);
      var mkEl = el.querySelector('.ls-mk'); mkEl.textContent = mk; mkEl.hidden = !mk;
      pts.push([x + bulbW / 2, y + 3]);
    }
    /* the cord from socket to socket, sagging through the bulb caps */
    var sock = Ln.socket, cw = bw + 2 * sock + 16, path;
    if (len) { path = 'M ' + (sock / 2) + ' ' + (sock / 2 + 4); pts.forEach(function (p) { path += ' L ' + (p[0] + sock + 8) + ' ' + (p[1] + 4); }); path += ' L ' + (cw - sock / 2) + ' ' + (sock / 2 + 4); }
    else path = 'M ' + (sock / 2) + ' ' + (sock / 2 + 4) + ' Q ' + (cw / 2) + ' ' + (bh + 26) + ' ' + (cw - sock / 2) + ' ' + (sock / 2 + 4);
    this._cord.setAttribute('viewBox', '0 0 ' + cw + ' ' + (bh + 30)); this._cord.style.width = cw + 'px'; this._cord.style.height = (bh + 30) + 'px';
    this._cord.innerHTML = '<path d="' + path + '" class="' + (len ? 'ls-cordline' : 'ls-cordslack') + '"/>';
    this._str.style.width = cw + 'px'; this._str.style.height = (bh + 30) + 'px';
    this._bulbs.style.left = (sock + 8) + 'px';
    this._sockR.style.left = (cw - sock) + 'px';
    this._sockL.querySelector('.ls-plug').textContent = v.a == null ? (st.kind === 'whole' ? String(st.a) : '') : String(v.a);
    this._sockR.querySelector('.ls-plug').textContent = v.b == null ? (st.kind === 'whole' ? String(st.b) : '') : String(v.b);
    this._sockL.classList.toggle('is-on', v.a != null || st.kind === 'whole'); this._sockR.classList.toggle('is-on', v.b != null || st.kind === 'whole');
    /* a light longer than the string runs on past the far socket */
    var ov = len ? C.over(v.la, v.lb, len) : { pastL: 0, pastR: 0 }, ovHtml = '';
    var ovB = Math.max(20, Math.min(26, bulbW - 4));
    var obi = function (cls, lab) { return '<i class="ls-ob ' + cls + '" style="width:' + ovB + 'px;height:' + ovB + 'px">' + lab + '</i>'; };
    ovHtml += '<span class="ls-og is-L">'; for (var oi = 0; oi < ov.pastL; oi++) ovHtml += obi('is-right', v.marks ? v.marks.pastL[oi] || '' : ''); ovHtml += '</span>';
    ovHtml += '<span class="ls-og is-R">'; for (var oj = 0; oj < ov.pastR; oj++) ovHtml += obi('is-left', v.marks ? v.marks.pastR[oj] || '' : ''); ovHtml += '</span>';
    if (this._overEl.getAttribute('data-h') !== ovHtml) { this._overEl.innerHTML = ovHtml; this._overEl.setAttribute('data-h', ovHtml); }
    this._overEl.style.width = Math.max(cw, (ov.pastL + ov.pastR) * (ovB + 3) + 16) + 'px';
    this._overEl.hidden = !(ov.pastL || ov.pastR);
    this._overEl.classList.toggle('is-flicker', !!(this._show && v.result === 'cross'));
    var tagTxt = st.kind === 'whole' ? (st.chosen ? String(st.chosen) : '?') : String(st.n);
    this._tag.textContent = tagTxt; this._tag.style.left = (cw / 2) + 'px'; this._tag.style.top = (bh + 2) + 'px';
    this._tag.classList.toggle('is-q', tagTxt === '?');
    /* the spark where the two lights kiss */
    var spark = this._str.querySelector('.ls-spark'); if (spark) spark.remove();
    if (v.gold && len && v.a != null && v.a > 0 && v.a < len) {
      spark = this.api.el('i', 'ls-spark'); var sx = (v.a) * (bulbW + sp) - sp / 2 + (v.a >= 5 && len > 5 ? (v.a === 5 ? five / 2 : five) : 0) + sock + 8;
      spark.style.left = sx + 'px'; spark.style.top = (pts[v.a] ? pts[v.a][1] + bulbW / 2 : bulbW / 2) + 'px'; this._str.appendChild(spark);
    }
    this._str.classList.toggle('is-flicker', !!(v.result === 'cross' && this._show && !this._run));
    var sl = st.kind === 'whole' && !st.chosen ? t('stringUnbuilt') : interp(t('stringLabel'), { n: len });
    if (v.result && v.la === v.a && v.lb === v.b) sl += '. ' + interp(t(v.result === 'meet' ? 'resMeet' : v.result === 'cross' ? 'resCross' : 'resShort'), { a: v.a, b: v.b, k: v.k });
    this._str.setAttribute('aria-label', sl);

    /* the ghost string (WHOLE, miss 2): as long as the two parts, numbered, never the key */
    var gh = C.ghost(st);
    if (gh && !this._show) {
      var gHtml = ''; gh.forEach(function (lab, gi) { gHtml += '<i class="ls-gb' + (gi < st.a ? ' is-a' : ' is-b') + '" style="width:' + Math.min(bulbW, 30) + 'px;height:' + Math.min(bulbW, 30) + 'px">' + lab + '</i>'; });
      if (this._ghost.getAttribute('data-h') !== gHtml) { this._ghost.innerHTML = gHtml; this._ghost.setAttribute('data-h', gHtml); }
      this._ghost.hidden = false;
    } else { this._ghost.hidden = true; this._ghost.removeAttribute('data-h'); this._ghost.innerHTML = ''; }

    /* the cards: the board (PAIR UP, free play) or the tray (MISSING) */
    var showCards = st.kind !== 'whole';
    this._board.hidden = !showCards;
    this._board.classList.toggle('is-tray', st.kind === 'missing');
    if (showCards) {
      var count = st.cards.length, cols = st.kind === 'missing' ? 4 : C.cols(count);
      this._board.style.gridTemplateColumns = 'repeat(' + cols + ',var(--ls-cw))';
      var sig = st.id + '|' + st.cards.map(function (c) { return c.id + ':' + c.v; }).join(',');
      if (this._board.getAttribute('data-sig') !== sig) {
        this._board.setAttribute('data-sig', sig); this._board.innerHTML = '';
        st.cards.forEach(function (c) {
          var b = self.api.el('button', 'ls-card'); b.type = 'button'; b.setAttribute('data-id', c.id);
          var dots = ''; for (var q = 0; q < c.v; q++) dots += '<i></i>';
          b.innerHTML = '<span class="ls-num">' + c.v + '</span><span class="ls-dots">' + dots + '</span>';
          b.addEventListener('click', function () { self._plug(c.id); });
          self._board.appendChild(b);
        });
      }
      var helpL = st.kind === 'missing' ? null : st.left;
      st.cards.forEach(function (c, ci) {
        var b = self._board.children[ci]; if (!b) return;
        b.classList.toggle('is-found', !!c.found);
        b.classList.toggle('is-left', st.left === c.id && st.kind !== 'missing');
        b.classList.toggle('is-right', st.right === c.id);
        b.disabled = !!c.found || st.done || self._busy;
        b.setAttribute('aria-label', interp(t('card'), { k: c.v }));
        b.setAttribute('aria-pressed', String(st.left === c.id || st.right === c.id));
      });
      void helpL;
    }

    /* the whole keys 2–10 (WHOLE) */
    var showKeys = st.kind === 'whole' && !st.done;
    if (showKeys && !this._keys.children.length) {
      for (var kv = 2; kv <= 10; kv++) (function (val) { var kb = self.api.el('button', 'ls-key'); kb.type = 'button'; kb.textContent = String(val); kb.setAttribute('data-v', String(val)); kb.addEventListener('click', function () { self._choose(val); }); self._keys.appendChild(kb); }(kv));
    }
    this._keys.hidden = !showKeys;
    this._keys.setAttribute('aria-label', t('keysLabel'));
    [].forEach.call(this._keys.children, function (kb) { var on = +kb.getAttribute('data-v') === st.chosen; kb.classList.toggle('is-on', on); kb.setAttribute('aria-pressed', String(on)); kb.disabled = self._busy || st.done; });

    /* the length stepper (free play) */
    this._stepper.hidden = !st.explore;
    this._lessBtn.disabled = !st.explore || st.n <= 2 || this._busy; this._moreBtn.disabled = !st.explore || st.n >= 10 || this._busy;
    this._lessBtn.setAttribute('aria-label', t('lenLess')); this._moreBtn.setAttribute('aria-label', t('lenMore'));

    /* the garland */
    var total = st.explore ? 0 : (st.kind === 'pair' ? r.pairs : 1);
    var ghtml = '';
    for (var g = 0; g < total; g++) {
      var f = st.found[g];
      ghtml += f ? '<button type="button" class="ls-pair" data-g="' + g + '" aria-label="' + escAttr(interp(t('pairDone'), { a: f[0], b: f[1], n: st.n })) + '"><span class="ls-lans"><i class="ls-lan ls-lanA">' + f[0] + '</i><i class="ls-bead">+</i><i class="ls-lan ls-lanB">' + f[1] + '</i></span><small>= ' + st.n + '</small></button>'
        : '<span class="ls-hook" aria-hidden="true"></span>';
    }
    if (this._garland.getAttribute('data-h') !== ghtml) {
      this._garland.innerHTML = ghtml; this._garland.setAttribute('data-h', ghtml);
      [].forEach.call(this._garland.querySelectorAll('.ls-pair'), function (pb) { pb.addEventListener('click', function () { self._replay(+pb.getAttribute('data-g')); }); });
    }
    [].forEach.call(this._garland.querySelectorAll('.ls-pair'), function (pb) { pb.disabled = self._busy; });
    this._garland.setAttribute('aria-label', interp(t('garlandLabel'), { f: st.found.length, t: total }));
    this._side.hidden = !total;
    w.classList.toggle('is-noside', !total);

    /* the note */
    var h = st.explore ? { key: 'playNote' } : (this._showNote || LanternStringCore.hint(st));
    var text = h ? interp(t(h.key), h) : '';
    if (this._note.textContent !== text) this._note.textContent = text;
    this._note.hidden = !text;
    this._note.classList.toggle('is-wrong', !!(h && h.wrong));
    this._note.classList.toggle('is-good', !!(h && h.good));

    /* the actions */
    this._lightBtn.textContent = t('lightIt');
    this._lightBtn.hidden = st.explore || st.kind === 'pair' || st.done;
    this._lightBtn.disabled = this._busy;
    this._playBtn.textContent = t(st.explore ? 'playBack' : 'play');
    this._playBtn.disabled = this._busy;
  },

  /* ---------------- the hand ---------------- */
  _plink: function (i) { this.api.sound(this.NOTES[Math.min(this.NOTES.length - 1, i)]); },
  /* run the light fronts: la from the left, lb from the right, one bulb per RUN_MS */
  _runLights: function (from, to, done) {
    var self = this;
    if (this.FAST) { this._run = null; done(); return; }
    this._run = { la: from.la, lb: from.lb }; this._busy = true; this._paint();
    var step = function () {
      var r = self._run; if (!r) return;
      var moved = false;
      if (r.la < to.la) { r.la++; moved = true; self._plink(r.la - 1); }
      if (r.lb < to.lb) { r.lb++; moved = true; self._plink(r.lb - 1); }
      self._paint();
      if (moved && (r.la < to.la || r.lb < to.lb)) self._later(step, self.RUN_MS);
      else self._later(function () { self._run = null; self._busy = false; done(); }, self.RUN_MS);
    };
    this._later(step, this.RUN_MS);
  },
  _plug: function (id) {
    var st = this._cur(), self = this, C = LanternStringCore;
    if (!st || this._busy || st.done) return;
    var before = C.plugged(st);
    var res = C.plug(st, id);
    if (res.act === 'locked') { this.api.sound(240); return; }
    this._showNote = null;
    if (res.act === 'unplug') { this.api.sound(330); this._paint(); return; }
    var after = C.plugged(st);
    this.api.track('plug', { id: st.id, side: res.side, v: C.card(st, id).v });
    /* PAIR UP, second card: the core has judged and unplugged; hold the picture while it runs */
    if (st.kind === 'pair' && res.side === 'R' && res.test) {
      var a = res.test.a, b = res.test.b, len = st.n;
      this._show = { a: a, b: b, len: len };
      this._runLights({ la: a, lb: 0 }, { la: a, lb: b }, function () { self._judged(res.test, a, b, len); });
      return;
    }
    var fromL = before[0] == null || st.kind === 'missing' ? 0 : after[0];
    var la = st.kind === 'missing' ? (after[0] || 0) : (after[0] || 0);
    this._runLights({ la: st.kind === 'missing' ? la : (before[0] == null ? 0 : la), lb: 0 }, { la: la, lb: after[1] || 0 }, function () { self._paint(); });
    void fromL;
  },
  /* a PAIR UP pair has been judged: meet → gold, the lanterns hang; cross / short → the error shows itself */
  _judged: function (test, a, b, len) {
    var self = this, st = this.st;
    if (test.result === 'meet') {
      this._show = { a: a, b: b, len: len, gold: true };
      this._showNote = { key: 'pairDone', a: a, b: b, n: len, good: true };
      this.api.sound(523); this._later(function () { self.api.sound(659); }, 90); this._later(function () { self.api.sound(784); }, 180);
    } else {
      this._show = { a: a, b: b, len: len, marks: LanternStringCore.marksFor(a, b, len) };
      this._showNote = null;
      this.api.sound(test.result === 'cross' ? 300 : 220);
    }
    this._busy = true;
    this._paint();
    this._later(function () {
      self._show = null; self._busy = false;
      if (test.result !== 'meet') self._showNote = null;
      self._paint();
      if (st.done) self._finish();
    }, this._ms(test.result === 'meet' ? this.MEET_MS : this.SHOW_MS));
  },
  _unplug: function () {
    var st = this._cur(); if (!st || this._busy || st.done || st.kind === 'whole') return;
    if (st.right) LanternStringCore.unplug(st, 'R'); else if (st.left) LanternStringCore.unplug(st, 'L'); else return;
    this._showNote = null; this.api.sound(330); this._paint();
  },
  _choose: function (v) {
    var st = this.st;
    if (!st || this._busy || this._playing || !LanternStringCore.choose(st, v)) return;
    this._showNote = null;
    var self = this;
    if (this.FAST) { this._paint(); return; }
    /* the cord takes that many bulbs, a soft pop each */
    for (var i = 0; i < v; i++) (function (k) { self._later(function () { self.api.sound(300 + k * 20); }, k * 25); }(i));
    this._paint();
  },
  /* "Light it" in MISSING and WHOLE */
  _light: function () {
    var st = this.st, self = this, C = LanternStringCore;
    if (!st || this._busy || this._playing || st.done || st.kind === 'pair') return;
    var res = C.check(st);
    if (!res) return;
    this._showNote = null;
    this.api.track('light', { id: st.id, result: res.result, misses: st.misses });
    if (res.result === 'empty') {
      this.api.sound(240);
      var first = st.kind === 'whole' ? this._keys.querySelector('.ls-key') : this._board.querySelector('.ls-card:not(:disabled)');
      bounce(st.kind === 'whole' ? this._keys : this._board, 'ls-bob'); void first;
      this._paint(); return;
    }
    var go = function () {
      if (res.result === 'meet') {
        self.api.sound(523); self._later(function () { self.api.sound(659); }, 90); self._later(function () { self.api.sound(784); }, 180);
        self._busy = true; self._paint();
        self._later(function () { self._busy = false; self._paint(); self._finish(); }, self._ms(self.MEET_MS));
      } else { self.api.sound(res.result === 'cross' ? 300 : 220); if (res.result === 'cross') { bounce(self._str, 'ls-flick'); } self._paint(); }
    };
    if (st.kind === 'whole') this._runLights({ la: 0, lb: 0 }, { la: st.a, lb: st.b }, go);
    else go();
  },
  _finish: function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); },
  /* a found pair on the garland lights the string again from the opposite ends */
  _replay: function (g) {
    var st = this._cur(), self = this;
    if (!st || this._busy) return;
    var f = st.found[g]; if (!f) return;
    var a = f[1], b = f[0], len = st.n;
    this._show = { a: a, b: b, len: len };
    this._runLights({ la: 0, lb: 0 }, { la: a, lb: b }, function () {
      self._show = { a: a, b: b, len: len, gold: true }; self._busy = true; self._paint();
      self._later(function () { self._show = null; self._busy = false; self._paint(); }, self._ms(self.MEET_MS));
    });
  },

  /* ---------------- free play ---------------- */
  _togglePlay: function () {
    if (this._busy) return;
    this._showNote = null; this._show = null; this._run = null;
    if (this._playing) { this._playing = false; this._paint(); return; }
    this._playing = true; this._play = LanternStringCore.newPlay(7);
    this._paint();
  },
  _len: function (d) { var st = this._play; if (!this._playing || !st || this._busy) return; LanternStringCore.setLength(st, st.n + d); this.api.sound(440); this._paint(); }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args && args[k] != null) ? String(args[k]) : m; }); }
function escAttr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var lsCssDone = false;
function injectLanternStringCSS() {
  if (lsCssDone || typeof document === 'undefined') return;
  lsCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.ls-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:12px;--ls-col:196px;--ls-cw:80px;--ls-ch:92px;--ls-cf:48px;--ls-key:52px;--ls-sock:26px;--ls-ink:#2B3A36;--ls-coral:#F2784B;--ls-teal:#2E9C88;}'
  + '.ls-body{display:flex;flex-direction:column;align-items:stretch;gap:12px;}'
  + '.ls-wrap.is-wide .ls-body{flex-direction:row;align-items:flex-start;}'
  + '.ls-main{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:12px;}'
  /* the string */
  + '.ls-top{display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.ls-string{position:relative;flex:none;margin:4px auto 18px;}'
  + '.ls-cord{position:absolute;left:0;top:0;overflow:visible;pointer-events:none;}'
  + '.ls-cordline{fill:none;stroke:var(--ls-ink);stroke-width:3;stroke-linejoin:round;stroke-linecap:round;}'
  + '.ls-cordslack{fill:none;stroke:#8C9894;stroke-width:3;stroke-dasharray:6 6;stroke-linecap:round;}'
  + '.ls-sock{position:absolute;top:0;width:var(--ls-sock);height:calc(var(--ls-sock) + 14px);border-radius:6px;background:linear-gradient(180deg,#E0B860,#B58A2E);box-shadow:inset 0 0 0 2px #7A5A1C;z-index:2;}'
  + '.ls-sockL{left:0;} .ls-sockL::after,.ls-sockR::after{content:"";position:absolute;left:30%;right:30%;bottom:-6px;height:8px;border-radius:0 0 4px 4px;}'
  + '.ls-sockL::after{background:var(--ls-coral);} .ls-sockR::after{background:var(--ls-teal);}'
  + '.ls-plug{position:absolute;left:50%;top:calc(var(--ls-sock) + 22px);transform:translateX(-50%);min-width:34px;height:34px;padding:0 6px;box-sizing:border-box;border-radius:10px;background:#fff;font:800 22px/34px var(--lcs-font-display);text-align:center;color:var(--ls-ink);opacity:0;transition:opacity .15s;}'
  + '.ls-sock.is-on .ls-plug{opacity:1;} .ls-sockL .ls-plug{box-shadow:inset 0 0 0 3px var(--ls-coral);color:#B24A22;} .ls-sockR .ls-plug{box-shadow:inset 0 0 0 3px var(--ls-teal);color:#1F7A69;}'
  + '.ls-bulbs{position:absolute;top:6px;z-index:1;}'
  + '.ls-bulb{position:absolute;box-sizing:border-box;border-radius:50%;background:radial-gradient(circle at 38% 34%,#FBFBF7,#D9DEDC 70%);box-shadow:inset 0 0 0 2px var(--ls-ink);transition:background .12s,box-shadow .12s;display:grid;place-items:center;}'
  + '.ls-cap{position:absolute;left:50%;top:-6px;width:36%;height:8px;margin-left:-18%;border-radius:3px 3px 1px 1px;background:#B58A2E;}'
  + '.ls-bulb.is-left{background:radial-gradient(circle at 38% 34%,#FFD3BF,var(--ls-coral) 72%);box-shadow:inset 0 0 0 2px var(--ls-ink),0 0 12px 2px rgba(242,120,75,.55);}'
  + '.ls-bulb.is-right{background:radial-gradient(circle at 38% 34%,#BDEDE3,var(--ls-teal) 72%);box-shadow:inset 0 0 0 2px var(--ls-ink),0 0 12px 2px rgba(46,156,136,.5);}'
  + '.ls-bulb.is-twice{background:radial-gradient(circle at 50% 45%,#fff,#FFF6CF 70%);box-shadow:inset 0 0 0 3px #E04E1A,0 0 16px 5px rgba(255,255,255,.95),0 0 0 3px #fff;}'
  + '.ls-string.is-flicker .ls-bulb.is-twice,.ls-string.ls-flick .ls-bulb.is-twice{animation:ls-flk .15s steps(2) 4;} @keyframes ls-flk{50%{opacity:.35;}}'
  + '.ls-bulb.is-gold{background:radial-gradient(circle at 38% 34%,#FFF4C4,#F2C14E 72%);box-shadow:inset 0 0 0 2px var(--ls-ink),0 0 16px 4px rgba(242,193,78,.75);animation:ls-glow .3s ease-out 1;} @keyframes ls-glow{from{filter:brightness(1.6);}}'
  + '.ls-bulb.is-dark.is-br{box-shadow:inset 0 0 0 2px var(--ls-ink),0 0 0 3px #fff,0 0 0 5px var(--ls-teal);} .ls-bulb.is-dark.is-br::before{content:"";position:absolute;inset:-9px;border:2px dashed var(--ls-teal);border-radius:50%;}'
  + '.ls-over{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;max-width:100%;margin-bottom:-8px;} .ls-over[hidden]{display:none;}'
  + '.ls-og{display:flex;flex-wrap:wrap;gap:3px;} .ls-og.is-R{justify-content:flex-end;}'
  + '.ls-over.is-flicker .ls-ob{animation:ls-flk .15s steps(2) 4;}'
  + '.ls-ob{position:relative;box-sizing:border-box;border-radius:50%;display:grid;place-items:center;font:800 13px/1 var(--lcs-font-display);font-style:normal;color:#9C3F1C;box-shadow:inset 0 0 0 2px var(--ls-ink),0 0 0 2px #fff,0 0 0 4px #E04E1A;}'
  + '.ls-ob.is-left{background:radial-gradient(circle at 38% 34%,#FFD3BF,var(--ls-coral) 72%);} .ls-ob.is-right{background:radial-gradient(circle at 38% 34%,#BDEDE3,var(--ls-teal) 72%);}'
  + '.ls-mk{position:relative;z-index:2;font:800 15px/1 var(--lcs-font-display);color:#9C3F1C;} .ls-mk[hidden]{display:none;}'
  + '.ls-spark{position:absolute;z-index:3;width:22px;height:22px;margin:-11px 0 0 -11px;background:radial-gradient(circle,#fff 20%,#FFE58A 45%,transparent 70%);border-radius:50%;animation:ls-spk .5s ease-out both;pointer-events:none;} @keyframes ls-spk{0%{transform:scale(.2);}50%{transform:scale(1.6);}100%{transform:scale(1);}}'
  + '.ls-tag{position:absolute;transform:translateX(-50%);min-width:44px;height:40px;padding:0 8px;box-sizing:border-box;border-radius:10px;background:#FFFBF2;color:var(--ls-ink);font:800 26px/40px var(--lcs-font-display);text-align:center;box-shadow:inset 0 0 0 3px var(--ls-ink);z-index:2;}'
  + '.ls-tag.is-q{color:#8C9894;box-shadow:inset 0 0 0 3px #8C9894;}'
  + '.ls-ghost{display:flex;gap:3px;justify-content:center;flex-wrap:wrap;} .ls-ghost[hidden]{display:none;}'
  + '.ls-gb{display:grid;place-items:center;border-radius:50%;border:2px dashed #8C9894;font:800 14px/1 var(--lcs-font-display);color:var(--ls-ink);font-style:normal;background:#fff;} .ls-gb.is-a{border-color:var(--ls-coral);} .ls-gb.is-b{border-color:var(--ls-teal);}'
  /* the cards */
  + '.ls-board{display:grid;gap:10px;justify-content:center;} .ls-board[hidden]{display:none;}'
  + '.ls-board.is-tray{padding:8px 10px;border-radius:14px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #E2D3B5;}'
  + '.ls-card{position:relative;width:var(--ls-cw);min-height:var(--ls-ch);padding:4px 2px;box-sizing:border-box;border:0;border-radius:12px;background:#FFFBF2;box-shadow:inset 0 0 0 3px var(--ls-ink),0 3px 0 #C9BFA8;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;transition:transform .12s;}'
  + '.ls-num{font:800 var(--ls-cf)/1 var(--lcs-font-display);color:var(--ls-ink);}'
  + '.ls-dots{display:none;grid-template-columns:repeat(5,9px);gap:2px;} .ls-wrap.is-dots .ls-dots{display:grid;} .ls-dots i{width:9px;height:9px;border-radius:50%;background:#B9844C;}'
  + '.ls-wrap.is-narrow .ls-dots{grid-template-columns:repeat(5,7px);} .ls-wrap.is-narrow .ls-dots i{width:7px;height:7px;}'
  + '.ls-card.is-left{transform:translateY(-4px);box-shadow:inset 0 0 0 4px var(--ls-coral),0 6px 0 #C9BFA8;} .ls-card.is-right{transform:translateY(-4px);box-shadow:inset 0 0 0 4px var(--ls-teal),0 6px 0 #C9BFA8;}'
  + '.ls-card.is-found{background:transparent;box-shadow:inset 0 0 0 2px #D5DED9;cursor:default;} .ls-card.is-found > *{visibility:hidden;}'
  + '.ls-card:disabled{cursor:default;}'
  + '.ls-board.ls-bob,.ls-keys.ls-bob{animation:ls-bobk .5s ease-in-out 1;} @keyframes ls-bobk{50%{transform:translateY(-6px);}}'
  /* the whole keys + the stepper */
  + '.ls-keys{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:100%;} .ls-keys[hidden]{display:none;}'
  + '.ls-key{width:var(--ls-key);height:var(--ls-key);padding:0;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;font:800 22px/1 var(--lcs-font-display);color:var(--lcs-structure);cursor:pointer;}'
  + '.ls-key.is-on{background:var(--lcs-structure);color:#fff;border-color:var(--lcs-structure);}'
  + '.ls-stepper{display:flex;gap:10px;} .ls-stepper[hidden]{display:none;}'
  + '.ls-step{width:48px;height:48px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 26px/1 var(--lcs-font-display);cursor:pointer;} .ls-step:disabled{opacity:.4;cursor:default;}'
  /* the garland */
  + '.ls-side{display:flex;flex-direction:column;align-items:center;} .ls-side[hidden]{display:none;}'
  + '.ls-wrap.is-wide .ls-side{width:var(--ls-col);flex:none;}'
  + '.ls-garland{position:relative;display:grid;grid-template-columns:repeat(2,88px);gap:10px 8px;justify-content:center;padding:18px 6px 8px;width:100%;box-sizing:border-box;border-radius:14px;background:#FBF6EC;}'
  + '.ls-garland::before{content:"";position:absolute;left:8px;right:8px;top:8px;height:3px;border-radius:2px;background:#7A6A58;}'
  + '.ls-wrap.is-narrow .ls-garland{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;}'
  + '.ls-hook{width:84px;height:58px;box-sizing:border-box;border:2px dashed #C9BFA8;border-radius:12px;}'
  + '.ls-pair{display:flex;flex-direction:column;align-items:center;gap:2px;width:88px;min-height:58px;padding:2px 0;border:0;background:none;cursor:pointer;animation:ls-hang .6s ease-out both;}'
  + '.ls-pair:disabled{cursor:default;} @keyframes ls-hang{0%{transform:translateY(40px);opacity:0;}70%{transform:translateY(-3px) rotate(3deg);}100%{transform:none;opacity:1;}}'
  + '.ls-lans{display:flex;align-items:center;gap:2px;}'
  + '.ls-lan{display:grid;place-items:center;width:36px;height:40px;border-radius:12px 12px 16px 16px;font:800 20px/1 var(--lcs-font-display);font-style:normal;color:#fff;box-shadow:inset 0 -4px 0 rgba(0,0,0,.15);}'
  + '.ls-lanA{background:var(--ls-coral);} .ls-lanB{background:var(--ls-teal);}'
  + '.ls-bead{font:800 14px/1 var(--lcs-font-display);font-style:normal;color:#7A6A58;}'
  + '.ls-pair small{font:800 15px/1 var(--lcs-font-display);color:var(--ls-ink);}'
  /* the note and the actions */
  + '.ls-note{box-sizing:border-box;align-self:center;width:100%;max-width:560px;padding:10px 14px;border-radius:14px;background:#fff;border:2px solid var(--lcs-line,#DDE6E3);font-family:var(--lcs-font-body);font-weight:700;font-size:17px;line-height:1.35;color:var(--ls-ink);text-align:center;} .ls-note[hidden]{display:none;}'
  + '.ls-note.is-wrong{border-color:#E5B39E;background:#FFF5F0;} .ls-note.is-good{border-color:#C9A24A;background:#FFF6DA;font-family:var(--lcs-font-display);font-size:22px;font-weight:800;}'
  + '.ls-actions{display:flex;justify-content:center;flex-wrap:wrap;gap:12px;}'
  + '.ls-light{min-height:48px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font:800 18px/1 var(--lcs-font-display);cursor:pointer;box-shadow:0 3px 0 #C95A31;} .ls-light[hidden]{display:none;} .ls-light:disabled{opacity:.5;cursor:default;}'
  + '.ls-tool{min-height:48px;padding:0 14px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 15px/1 var(--lcs-font-body);cursor:pointer;} .ls-tool:disabled{opacity:.45;cursor:default;}'
  + '.ls-card:focus-visible,.ls-key:focus-visible,.ls-pair:focus-visible,.ls-light:focus-visible,.ls-tool:focus-visible,.ls-step:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  /* narrow */
  + '.ls-wrap.is-narrow{gap:8px;} .ls-wrap.is-narrow .ls-body{gap:8px;} .ls-wrap.is-narrow .ls-main{gap:8px;} .ls-wrap.is-narrow .ls-board{gap:8px;}'
  + '.ls-wrap.is-narrow .ls-note{font-size:15px;padding:7px 10px;} .ls-wrap.is-narrow .ls-tag{min-width:36px;height:34px;font-size:22px;line-height:34px;}'
  + '.ls-wrap.is-narrow .ls-plug{min-width:28px;height:28px;font-size:18px;line-height:28px;top:calc(var(--ls-sock) + 18px);}'
  + '.ls-wrap.is-narrow .ls-mk{font-size:13px;}'
  + '@media (prefers-reduced-motion:reduce){.ls-bulb,.ls-pair,.ls-spark,.ls-board,.ls-keys,.ls-card{animation:none!important;transition:none!important;} .ls-string.is-flicker .ls-bulb.is-twice{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'ls-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = LanternStringActivity;
if (typeof window !== 'undefined') window.LanternStringActivity = LanternStringActivity;
