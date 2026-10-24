/* =====================================================================
   zero-cards-activity.js — ACTIVITY #98 of the one-by-one rebuild: "Tens
   and Ones" → THE ZERO-SWALLOWING CARDS (1.NBT.B.2, 11 locales).
   Design: docs/activities-rebuild/designs/098-place-value.md
   ---------------------------------------------------------------------
   THE INVENTION: arrow cards on a stand exactly two digits wide. The long
   tens card (40) fills both cells; the short ones card (7) only stays when
   it is laid on the 0 of the tens card — the 0 is swallowed, the stack
   reads 47 and pours 4 rods and 7 cubes onto the mat. A ones card laid
   over the tens digit or beside the stand tips off, so "407" cannot be
   made. Pull the ones card off sideways and the number stretches: 40 + 7.
   ACTIVITY LAYER ONLY: the model is zero-cards-core.js; cards, stand,
   rods, cubes, trays, ten frames and tallies are drawn apparatus; the
   number words come from scripts/worksheet-gen/lib/number-words.js,
   generated into the WORDS block below (never by rule here); lcs-shell.js
   untouched (the shell's Check is hidden and pressed by this activity
   when the round is right).
   Test seams: window.ZeroCardsActivity.st / ._pool / ._order / ._pos /
   ._ensurePool / ._start / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var ZeroCardsActivity = {
  id: 'zero-cards',
  apparatusClasses: ['zc-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble:   {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:      {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:         {en:'Tens and Ones',de:'Zehner und Einer',nl:'Tientallen en eenheden',da:'Tiere og enere',sv:'Tiotal och ental',no:'Tiere og enere',es:'Decenas y unidades',it:'Decine e unità',pt:'Dezenas e unidades',fr:'Dizaines et unités',fi:'Kymmenet ja ykköset'},
    taskBuild:     {en:'Build {n}',de:'Baue {n}',nl:'Bouw {n}',da:'Byg {n}',sv:'Bygg {n}',no:'Bygg {n}',es:'Construye {n}',it:'Costruisci {n}',pt:'Construa {n}',fr:'Construis {n}',fi:'Rakenna {n}'},
    instrBuild:    {en:'Build the number with cards.',de:'Lege die Zahl mit Karten.',nl:'Leg het getal met kaartjes.',da:'Byg tallet med kort.',sv:'Bygg talet med kort.',no:'Bygg tallet med kort.',es:'Forma el número con tarjetas.',it:'Componi il numero con le carte.',pt:'Monte o número com os cartões.',fr:'Construis le nombre avec les cartes.',fi:'Rakenna luku korteista.'},
    instrTens:     {en:'How many tens? Build the number with cards.',de:'Wie viele Zehner? Lege die Zahl mit Karten.',nl:'Hoeveel tientallen? Leg het getal met kaartjes.',da:'Hvor mange tiere? Byg tallet med kort.',sv:'Hur många tiotal? Bygg talet med kort.',no:'Hvor mange tiere? Bygg tallet med kort.',es:'¿Cuántas decenas? Forma el número con tarjetas.',it:'Quante decine? Componi il numero con le carte.',pt:'Quantas dezenas? Monte o número com os cartões.',fr:'Combien de dizaines ? Construis le nombre avec les cartes.',fi:'Montako kymmentä? Rakenna luku korteista.'},
    instrBlocks:   {en:'Which number do the blocks show? Build it with cards.',de:'Welche Zahl zeigen die Stangen und Würfel? Lege sie mit Karten.',nl:'Welk getal laten de staven en blokjes zien? Leg het met kaartjes.',da:'Hvilket tal viser stængerne og klodserne? Byg det med kort.',sv:'Vilket tal visar stavarna och kuberna? Bygg det med kort.',no:'Hvilket tall viser stavene og klossene? Bygg det med kort.',es:'¿Qué número muestran las barras y los cubos? Fórmalo con tarjetas.',it:'Quale numero mostrano le barre e i cubetti? Componilo con le carte.',pt:'Que número as barras e os cubinhos mostram? Monte-o com os cartões.',fr:'Quel nombre montrent les barres et les cubes ? Construis-le avec les cartes.',fi:'Minkä luvun sauvat ja kuutiot näyttävät? Rakenna se korteista.'},
    instrApart:    {en:'Build the number, then stretch it apart.',de:'Lege die Zahl und zieh sie dann auseinander.',nl:'Leg het getal en trek het dan uit elkaar.',da:'Byg tallet, og træk det så fra hinanden.',sv:'Bygg talet och dra sedan isär det.',no:'Bygg tallet, og dra det så fra hverandre.',es:'Forma el número y luego sepáralo.',it:'Componi il numero e poi scomponilo.',pt:'Monte o número e depois separe-o.',fr:'Construis le nombre, puis décompose-le.',fi:'Rakenna luku ja vedä se sitten osiin.'},
    instrTogether: {en:'Put the two parts together into one number.',de:'Schieb die zwei Teile zu einer Zahl zusammen.',nl:'Schuif de twee delen samen tot één getal.',da:'Sæt de to dele sammen til ét tal.',sv:'Sätt ihop de två delarna till ett tal.',no:'Sett de to delene sammen til ett tall.',es:'Junta las dos partes en un solo número.',it:'Unisci le due parti in un solo numero.',pt:'Junte as duas partes em um só número.',fr:'Assemble les deux parties en un seul nombre.',fi:'Yhdistä kaksi osaa yhdeksi luvuksi.'},
    instrWhich:    {en:'Which blocks show the number?',de:'Welche Stangen und Würfel zeigen die Zahl?',nl:'Welke staven en blokjes laten het getal zien?',da:'Hvilke stænger og klodser viser tallet?',sv:'Vilka stavar och kuber visar talet?',no:'Hvilke staver og klosser viser tallet?',es:'¿Qué barras y cubos muestran el número?',it:'Quali barre e cubetti mostrano il numero?',pt:'Quais barras e cubinhos mostram o número?',fr:'Quelles barres et quels cubes montrent le nombre ?',fi:'Mitkä sauvat ja kuutiot näyttävät luvun?'},
    coatTO:        {en:'{tp} and {op}',de:'{tp} und {op}',nl:'{tp} en {op}',da:'{tp} og {op}',sv:'{tp} och {op}',no:'{tp} og {op}',es:'{tp} y {op}',it:'{tp} e {op}',pt:'{tp} e {op}',fr:'{tp} et {op}',fi:'{tp} ja {op}'},
    pT1:           {en:'1 ten',de:'1 Zehner',nl:'1 tiental',da:'1 tier',sv:'1 tiotal',no:'1 tier',es:'1 decena',it:'1 decina',pt:'1 dezena',fr:'1 dizaine',fi:'1 kymmen'},
    pTn:           {en:'{t} tens',de:'{t} Zehner',nl:'{t} tientallen',da:'{t} tiere',sv:'{t} tiotal',no:'{t} tiere',es:'{t} decenas',it:'{t} decine',pt:'{t} dezenas',fr:'{t} dizaines',fi:'{t} kymmentä'},
    pO1:           {en:'1 one',de:'1 Einer',nl:'1 eenheid',da:'1 ener',sv:'1 ental',no:'1 ener',es:'1 unidad',it:'1 unità',pt:'1 unidade',fr:'1 unité',fi:'1 ykkönen'},
    pOn:           {en:'{o} ones',de:'{o} Einer',nl:'{o} eenheden',da:'{o} enere',sv:'{o} ental',no:'{o} enere',es:'{o} unidades',it:'{o} unità',pt:'{o} unidades',fr:'{o} unités',fi:'{o} ykköstä'},
    hintEmpty:     {en:'Put a card on the stand.',de:'Leg eine Karte auf den Ständer.',nl:'Leg een kaartje op de houder.',da:'Læg et kort på holderen.',sv:'Lägg ett kort på hållaren.',no:'Legg et kort på holderen.',es:'Pon una tarjeta en el soporte.',it:'Metti una carta sul supporto.',pt:'Coloque um cartão no suporte.',fr:'Pose une carte sur le support.',fi:'Laita kortti telineeseen.'},
    hintTip:       {en:'The ones card only stays on the 0 of the tens card.',de:'Die Einerkarte bleibt nur auf der 0 der Zehnerkarte liegen.',nl:'Het eenhedenkaartje blijft alleen op de 0 van het tientallenkaartje liggen.',da:'Enerkortet bliver kun liggende på 0\'et på tierkortet.',sv:'Entalskortet stannar bara på nollan på tiotalskortet.',no:'Enerkortet blir bare liggende på nullen på tierkortet.',es:'La tarjeta de las unidades solo se queda sobre el 0 de la tarjeta de las decenas.',it:'La carta delle unità resta solo sopra lo 0 della carta delle decine.',pt:'O cartão das unidades só fica em cima do 0 do cartão das dezenas.',fr:'La carte des unités ne tient que sur le 0 de la carte des dizaines.',fi:'Ykköskortti pysyy vain kymppikortin nollan päällä.'},
    hintTipAlone:  {en:'The ones card goes in the right-hand place.',de:'Die Einerkarte gehört auf den rechten Platz.',nl:'Het eenhedenkaartje hoort op de rechterplek.',da:'Enerkortet hører til på den højre plads.',sv:'Entalskortet hör hemma på den högra platsen.',no:'Enerkortet hører hjemme på den høyre plassen.',es:'La tarjeta de las unidades va en el lugar de la derecha.',it:'La carta delle unità va nel posto a destra.',pt:'O cartão das unidades vai no lugar da direita.',fr:'La carte des unités va à la place de droite.',fi:'Ykköskortti kuuluu oikeanpuoleiselle paikalle.'},
    hintStretch:   {en:'Now stretch it: pull the ones card to the side.',de:'Jetzt zieh sie auseinander: Zieh die Einerkarte zur Seite.',nl:'Trek het nu uit elkaar: schuif het eenhedenkaartje opzij.',da:'Træk det nu fra hinanden: Skub enerkortet til siden.',sv:'Dra nu isär det: dra entalskortet åt sidan.',no:'Dra det nå fra hverandre: Skyv enerkortet til siden.',es:'Ahora sepáralo: desliza la tarjeta de las unidades hacia un lado.',it:'Ora scomponilo: sposta di lato la carta delle unità.',pt:'Agora separe-o: deslize o cartão das unidades para o lado.',fr:'Maintenant, décompose-le : fais glisser la carte des unités sur le côté.',fi:'Vedä se nyt osiin: siirrä ykköskortti sivuun.'},
    hintTogether:  {en:'Push the parts together into one number.',de:'Schieb die Teile zu einer Zahl zusammen.',nl:'Schuif de delen samen tot één getal.',da:'Skub delene sammen til ét tal.',sv:'Skjut ihop delarna till ett tal.',no:'Skyv delene sammen til ett tall.',es:'Junta las partes en un solo número.',it:'Unisci le parti in un solo numero.',pt:'Junte as partes em um só número.',fr:'Rapproche les parties pour faire un seul nombre.',fi:'Työnnä osat yhteen yhdeksi luvuksi.'},
    hintPickTray:  {en:'Tap the blocks that show the number.',de:'Tippe auf die Stangen und Würfel, die die Zahl zeigen.',nl:'Tik op de staven en blokjes die het getal laten zien.',da:'Tryk på de stænger og klodser, der viser tallet.',sv:'Tryck på de stavar och kuber som visar talet.',no:'Trykk på stavene og klossene som viser tallet.',es:'Toca las barras y los cubos que muestran el número.',it:'Tocca le barre e i cubetti che mostrano il numero.',pt:'Toque nas barras e nos cubinhos que mostram o número.',fr:'Touche les barres et les cubes qui montrent le nombre.',fi:'Napauta sauvoja ja kuutioita, jotka näyttävät luvun.'},
    hintRods:      {en:'Look at the rods. How many tens do you need?',de:'Schau dir die Stangen an. Wie viele Zehner brauchst du?',nl:'Kijk naar de staven. Hoeveel tientallen heb je nodig?',da:'Se på stængerne. Hvor mange tiere skal du bruge?',sv:'Titta på stavarna. Hur många tiotal behöver du?',no:'Se på stavene. Hvor mange tiere trenger du?',es:'Mira las barras. ¿Cuántas decenas necesitas?',it:'Guarda le barre. Quante decine ti servono?',pt:'Olhe as barras. De quantas dezenas você precisa?',fr:'Regarde les barres. De combien de dizaines as-tu besoin ?',fi:'Katso sauvoja. Montako kymmentä tarvitset?'},
    hintCubes:     {en:'Look at the cubes. How many ones do you need?',de:'Schau dir die Würfel an. Wie viele Einer brauchst du?',nl:'Kijk naar de blokjes. Hoeveel eenheden heb je nodig?',da:'Se på klodserne. Hvor mange enere skal du bruge?',sv:'Titta på kuberna. Hur många ental behöver du?',no:'Se på klossene. Hvor mange enere trenger du?',es:'Mira los cubos. ¿Cuántas unidades necesitas?',it:'Guarda i cubetti. Quante unità ti servono?',pt:'Olhe os cubinhos. De quantas unidades você precisa?',fr:'Regarde les cubes. De combien d’unités as-tu besoin ?',fi:'Katso kuutioita. Montako ykköstä tarvitset?'},
    hintGhost:     {en:'The see-through blocks show the number. Count the rods, then the cubes.',de:'Die durchsichtigen Stangen und Würfel zeigen die Zahl. Zähl erst die Stangen, dann die Würfel.',nl:'De doorzichtige staven en blokjes laten het getal zien. Tel eerst de staven, dan de blokjes.',da:'De gennemsigtige stænger og klodser viser tallet. Tæl først stængerne, så klodserne.',sv:'De genomskinliga stavarna och kuberna visar talet. Räkna först stavarna, sedan kuberna.',no:'De gjennomsiktige stavene og klossene viser tallet. Tell først stavene, så klossene.',es:'Las barras y los cubos transparentes muestran el número. Cuenta primero las barras y luego los cubos.',it:'Le barre e i cubetti trasparenti mostrano il numero. Conta prima le barre, poi i cubetti.',pt:'As barras e os cubinhos transparentes mostram o número. Conte primeiro as barras, depois os cubinhos.',fr:'Les barres et les cubes transparents montrent le nombre. Compte d’abord les barres, puis les cubes.',fi:'Läpinäkyvät sauvat ja kuutiot näyttävät luvun. Laske ensin sauvat ja sitten kuutiot.'},
    hintTensCount: {en:'Count the rods: each rod is ten. Then count the cubes.',de:'Zähl die Stangen: Jede Stange ist ein Zehner. Dann zähl die Würfel.',nl:'Tel de staven: elke staaf is tien. Tel dan de blokjes.',da:'Tæl stængerne: Hver stang er ti. Tæl så klodserne.',sv:'Räkna stavarna: varje stav är tio. Räkna sedan kuberna.',no:'Tell stavene: Hver stav er ti. Tell så klossene.',es:'Cuenta las barras: cada barra vale diez. Luego cuenta los cubos.',it:'Conta le barre: ogni barra vale dieci. Poi conta i cubetti.',pt:'Conte as barras: cada barra vale dez. Depois conte os cubinhos.',fr:'Compte les barres : chaque barre vaut dix. Puis compte les cubes.',fi:'Laske sauvat: jokainen sauva on kymmenen. Laske sitten kuutiot.'},
    hintWhich1:    {en:'Now the cards’ blocks are on that tray. Blocks with an outline are extra; dashed ones are missing.',de:'Jetzt liegen die Stangen und Würfel der Karten darauf: Umrandete sind zu viel, gestrichelte fehlen.',nl:'Nu liggen de staven en blokjes van de kaartjes erop: blokjes met een rand zijn te veel, blokjes met een stippellijn ontbreken.',da:'Nu ligger kortenes stænger og klodser ovenpå: Dem med kant er for mange, de stiplede mangler.',sv:'Nu ligger kortens stavar och kuber ovanpå: de inramade är för många, de streckade saknas.',no:'Nå ligger kortenes staver og klosser oppå: De med kant er for mange, de stiplede mangler.',es:'Ahora las barras y los cubos de las tarjetas están encima: los que tienen borde sobran y los punteados faltan.',it:'Ora le barre e i cubetti delle carte sono sopra: quelli contornati sono di troppo, quelli tratteggiati mancano.',pt:'Agora as barras e os cubinhos dos cartões estão por cima: os contornados sobram e os pontilhados faltam.',fr:'Les barres et les cubes des cartes sont posés dessus : ceux qui ont un contour sont en trop, ceux en pointillé manquent.',fi:'Nyt korttien sauvat ja kuutiot ovat päällä: reunustetut ovat liikaa, katkoviivaiset puuttuvat.'},
    hintWhich2:    {en:'The tens card gives the rods and the ones card gives the cubes. Count each.',de:'Die Zehnerkarte gibt die Stangen, die Einerkarte gibt die Würfel. Zähl beide.',nl:'Het tientallenkaartje geeft de staven, het eenhedenkaartje geeft de blokjes. Tel ze allebei.',da:'Tierkortet giver stængerne, og enerkortet giver klodserne. Tæl begge.',sv:'Tiotalskortet ger stavarna och entalskortet ger kuberna. Räkna båda.',no:'Tierkortet gir stavene, og enerkortet gir klossene. Tell begge.',es:'La tarjeta de las decenas da las barras y la de las unidades da los cubos. Cuenta las dos.',it:'La carta delle decine dà le barre, quella delle unità dà i cubetti. Contali tutti e due.',pt:'O cartão das dezenas dá as barras e o das unidades dá os cubinhos. Conte os dois.',fr:'La carte des dizaines donne les barres, celle des unités donne les cubes. Compte les deux.',fi:'Kymppikortti antaa sauvat ja ykköskortti kuutiot. Laske molemmat.'},
    okBuild:       {en:'{n} — {tp} and {op}.',de:'{n} – {tp} und {op}.',nl:'{n}: {tp} en {op}.',da:'{n} – {tp} og {op}.',sv:'{n} – {tp} och {op}.',no:'{n} – {tp} og {op}.',es:'{n}: {tp} y {op}.',it:'{n}: {tp} e {op}.',pt:'{n}: {tp} e {op}.',fr:'{n} : {tp} et {op}.',fi:'{n} – {tp} ja {op}.'},
    okBuild0:      {en:'{n} — {tp} and no ones.',de:'{n} – {tp} und keine Einer.',nl:'{n}: {tp} en geen eenheden.',da:'{n} – {tp} og ingen enere.',sv:'{n} – {tp} och inga ental.',no:'{n} – {tp} og ingen enere.',es:'{n}: {tp} y ninguna unidad.',it:'{n}: {tp} e nessuna unità.',pt:'{n}: {tp} e nenhuma unidade.',fr:'{n} : {tp} et aucune unité.',fi:'{n} – {tp}, ei yhtään ykköstä.'},
    okApart:       {en:'{n} is {a} + {b}.',de:'{n} ist {a} + {b}.',nl:'{n} is {a} + {b}.',da:'{n} er {a} + {b}.',sv:'{n} är {a} + {b}.',no:'{n} er {a} + {b}.',es:'{n} es {a} + {b}.',it:'{n} è {a} + {b}.',pt:'{n} é {a} + {b}.',fr:'{n}, c’est {a} + {b}.',fi:'{n} on {a} + {b}.'},
    okTogether:    {en:'{a} + {b} is {n}.',de:'{a} + {b} ist {n}.',nl:'{a} + {b} is {n}.',da:'{a} + {b} er {n}.',sv:'{a} + {b} är {n}.',no:'{a} + {b} er {n}.',es:'{a} + {b} es {n}.',it:'{a} + {b} fa {n}.',pt:'{a} + {b} é {n}.',fr:'{a} + {b}, c’est {n}.',fi:'{a} + {b} on {n}.'},
    check:         {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setTask:       {en:'Task',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Tarea',it:'Attività',pt:'Tarefa',fr:'Tâche',fi:'Tehtävä'},
    tBuild:        {en:'Build it',de:'Zahl legen',nl:'Getal leggen',da:'Byg tallet',sv:'Bygg talet',no:'Bygg tallet',es:'Forma el número',it:'Componi il numero',pt:'Monte o número',fr:'Construis le nombre',fi:'Rakenna luku'},
    tTens:         {en:'Read the blocks',de:'Stangen und Würfel lesen',nl:'Staven en blokjes lezen',da:'Læs stænger og klodser',sv:'Läs stavar och kuber',no:'Les staver og klosser',es:'Lee las barras y los cubos',it:'Leggi barre e cubetti',pt:'Leia as barras e os cubinhos',fr:'Lis les barres et les cubes',fi:'Lue sauvat ja kuutiot'},
    tStretch:      {en:'Stretch it',de:'Auseinanderziehen',nl:'Uit elkaar trekken',da:'Træk fra hinanden',sv:'Dra isär',no:'Dra fra hverandre',es:'Sepáralo',it:'Scomponilo',pt:'Separe',fr:'Décompose-le',fi:'Vedä osiin'},
    tWhich:        {en:'Which blocks?',de:'Welche Stangen und Würfel?',nl:'Welke staven en blokjes?',da:'Hvilke stænger og klodser?',sv:'Vilka stavar och kuber?',no:'Hvilke staver og klosser?',es:'¿Qué barras y cubos?',it:'Quali barre e cubetti?',pt:'Quais barras e cubinhos?',fr:'Quelles barres et quels cubes ?',fi:'Mitkä sauvat ja kuutiot?'},
    setNumbers:    {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    n20:           {en:'To 20',de:'Bis 20',nl:'Tot 20',da:'Til 20',sv:'Till 20',no:'Til 20',es:'Hasta 20',it:'Fino a 20',pt:'Até 20',fr:'Jusqu’à 20',fi:'20:een asti'},
    n50:           {en:'To 50',de:'Bis 50',nl:'Tot 50',da:'Til 50',sv:'Till 50',no:'Til 50',es:'Hasta 50',it:'Fino a 50',pt:'Até 50',fr:'Jusqu’à 50',fi:'50:een asti'},
    n99:           {en:'To 99',de:'Bis 99',nl:'Tot 99',da:'Til 99',sv:'Till 99',no:'Til 99',es:'Hasta 99',it:'Fino a 99',pt:'Até 99',fr:'Jusqu’à 99',fi:'99:ään asti'},
    ariaSpeak:     {en:'Hear the number',de:'Zahl anhören',nl:'Luister naar het getal',da:'Hør tallet',sv:'Lyssna på talet',no:'Hør tallet',es:'Escucha el número',it:'Ascolta il numero',pt:'Ouça o número',fr:'Écoute le nombre',fi:'Kuuntele luku'},
    ariaFrames:    {en:'Ten frames: {n} dots',de:'Zehnerfelder: {n} Punkte',nl:'Tienvakken: {n} stippen',da:'Tierrammer: {n} prikker',sv:'Tiorutor: {n} prickar',no:'Tierrammer: {n} prikker',es:'Marcos de diez: {n} puntos',it:'Griglie del dieci: {n} pallini',pt:'Quadros de dez: {n} bolinhas',fr:'Cadres de dix : {n} points',fi:'Kymppikehykset: {n} pistettä'},
    ariaTally:     {en:'Tally marks: {n}',de:'Strichliste: {n}',nl:'Turfstreepjes: {n}',da:'Tællestreger: {n}',sv:'Tallstreck: {n}',no:'Tellestreker: {n}',es:'Palitos de conteo: {n}',it:'Tacche di conteggio: {n}',pt:'Risquinhos de contagem: {n}',fr:'Bâtons de comptage : {n}',fi:'Tukkimiehen kirjanpito: {n}'},
    ariaBlocks:    {en:'{r} rods and {c} cubes',de:'{r} Stangen und {c} Würfel',nl:'{r} staven en {c} blokjes',da:'{r} stænger og {c} klodser',sv:'{r} stavar och {c} kuber',no:'{r} staver og {c} klosser',es:'{r} barras y {c} cubos',it:'{r} barre e {c} cubetti',pt:'{r} barras e {c} cubinhos',fr:'{r} barres et {c} cubes',fi:'{r} sauvaa ja {c} kuutiota'},
    ariaStand:     {en:'Card stand: {v}',de:'Kartenständer: {v}',nl:'Kaartjeshouder: {v}',da:'Kortholder: {v}',sv:'Korthållare: {v}',no:'Kortholder: {v}',es:'Soporte de tarjetas: {v}',it:'Supporto delle carte: {v}',pt:'Suporte dos cartões: {v}',fr:'Support des cartes : {v}',fi:'Korttiteline: {v}'},
    ariaEmpty:     {en:'empty',de:'leer',nl:'leeg',da:'tom',sv:'tom',no:'tom',es:'vacío',it:'vuoto',pt:'vazio',fr:'vide',fi:'tyhjä'},
    ariaLift:      {en:'Card {v}: tap to take it back',de:'Karte {v}: tippen, um sie zurückzunehmen',nl:'Kaartje {v}: tik om het terug te nemen',da:'Kort {v}: tryk for at tage det tilbage',sv:'Kort {v}: tryck för att ta tillbaka det',no:'Kort {v}: trykk for å ta det tilbake',es:'Tarjeta {v}: toca para quitarla',it:'Carta {v}: tocca per toglierla',pt:'Cartão {v}: toque para tirá-lo',fr:'Carte {v} : touche pour la reprendre',fi:'Kortti {v}: napauta ottaaksesi sen pois'},
    ariaStretch:   {en:'Stretch the number apart',de:'Zahl auseinanderziehen',nl:'Getal uit elkaar trekken',da:'Træk tallet fra hinanden',sv:'Dra isär talet',no:'Dra tallet fra hverandre',es:'Separar el número',it:'Scomporre il numero',pt:'Separar o número',fr:'Décomposer le nombre',fi:'Vedä luku osiin'},
    ariaTogether:  {en:'Put the number back together',de:'Zahl wieder zusammenschieben',nl:'Getal weer samenschuiven',da:'Sæt tallet sammen igen',sv:'Sätt ihop talet igen',no:'Sett tallet sammen igjen',es:'Volver a juntar el número',it:'Riunire il numero',pt:'Juntar o número de novo',fr:'Rassembler le nombre',fi:'Yhdistä luku taas'},
    ariaMat:       {en:'{r} rods, {c} cubes',de:'{r} Stangen, {c} Würfel',nl:'{r} staven, {c} blokjes',da:'{r} stænger, {c} klodser',sv:'{r} stavar, {c} kuber',no:'{r} staver, {c} klosser',es:'{r} barras, {c} cubos',it:'{r} barre, {c} cubetti',pt:'{r} barras, {c} cubinhos',fr:'{r} barres, {c} cubes',fi:'{r} sauvaa, {c} kuutiota'},
    ariaTray:      {en:'Tray {i}: {r} rods, {c} cubes',de:'Tablett {i}: {r} Stangen, {c} Würfel',nl:'Bakje {i}: {r} staven, {c} blokjes',da:'Bakke {i}: {r} stænger, {c} klodser',sv:'Bricka {i}: {r} stavar, {c} kuber',no:'Brett {i}: {r} staver, {c} klosser',es:'Bandeja {i}: {r} barras, {c} cubos',it:'Vassoio {i}: {r} barre, {c} cubetti',pt:'Bandeja {i}: {r} barras, {c} cubinhos',fr:'Plateau {i} : {r} barres, {c} cubes',fi:'Tarjotin {i}: {r} sauvaa, {c} kuutiota'},
    ariaRackT:     {en:'Tens cards',de:'Zehnerkarten',nl:'Tientallenkaartjes',da:'Tierkort',sv:'Tiotalskort',no:'Tierkort',es:'Tarjetas de las decenas',it:'Carte delle decine',pt:'Cartões das dezenas',fr:'Cartes des dizaines',fi:'Kymppikortit'},
    ariaRackO:     {en:'Ones cards',de:'Einerkarten',nl:'Eenhedenkaartjes',da:'Enerkort',sv:'Entalskort',no:'Enerkort',es:'Tarjetas de las unidades',it:'Carte delle unità',pt:'Cartões das unidades',fr:'Cartes des unités',fi:'Ykköskortit'},
    ariaPutT:      {en:'Tens card {v}',de:'Zehnerkarte {v}',nl:'Tientallenkaartje {v}',da:'Tierkort {v}',sv:'Tiotalskort {v}',no:'Tierkort {v}',es:'Tarjeta de las decenas {v}',it:'Carta delle decine {v}',pt:'Cartão das dezenas {v}',fr:'Carte des dizaines {v}',fi:'Kymppikortti {v}'},
    ariaPutO:      {en:'Ones card {v}',de:'Einerkarte {v}',nl:'Eenhedenkaartje {v}',da:'Enerkort {v}',sv:'Entalskort {v}',no:'Enerkort {v}',es:'Tarjeta de las unidades {v}',it:'Carta delle unità {v}',pt:'Cartão das unidades {v}',fr:'Carte des unités {v}',fi:'Ykköskortti {v}'}
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

  defaults: { task: 'build', numbers: '99' },
  settings: [
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'build', labelKey: 'tBuild' }, { value: 'tens', labelKey: 'tTens' }, { value: 'stretch', labelKey: 'tStretch' }, { value: 'which', labelKey: 'tWhich' }] },
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: '20', labelKey: 'n20' }, { value: '50', labelKey: 'n50' }, { value: '99', labelKey: 'n99' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0; this._codes = {};
    this._timers = []; this._ro = null; this._view = {}; this._dragUntil = 0;
    injectZeroCSS();
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
  _loc: function () { return ZeroCardsCore.locale(((this.api && this.api.lang) || 'en')); },
  _face: function () { return ZeroCardsCore.faceOf(this._setting('task')); },
  _range: function () { return ZeroCardsCore.rangeOf(this._setting('numbers')); },
  _key: function () { return this._face() + '.' + this._range(); },
  _word: function (n) { var w = this.WORDS[this._loc()]; return (w && w[n]) || String(n); },
  /* "4 tens" / "1 ten" and "7 ones" / "1 one" (a decade gets its own sentence, okBuild0) — one phrase per count, so every locale's agreement is authored, never computed */
  _tp: function (t) { return t === 1 ? this._t('pT1') : this._t('pTn', { t: t }); },
  _op: function (o) { return o === 1 ? this._t('pO1') : this._t('pOn', { o: o }); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = ZeroCardsCore.ids(this._face(), this._range()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._codes = {}; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = ZeroCardsCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      var pl = C.plan(this._face(), this._range(), Math.random, prevIds);
      this._order = pl.order.map(function (id) { return pool.indexOf(id); }); this._codes = pl.pos; this._orderForPool = pool; this._pass = pass;
    }
    var id = pool[this._order[pos]], pa = { msg: this._promptText(C.round(this._face(), this._range(), id)) }; this._pa = pa;
    return {
      id: 'zerocards.' + this._loc() + '.' + this._key() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r) {
    if (r.kind === 'tens') return this._t(r.decade ? 'instrTens' : 'instrBlocks');
    if (r.kind === 'stretch') return this._t(r.dir === 'apart' ? 'instrApart' : 'instrTogether');
    if (r.kind === 'which') return this._t('instrWhich');
    return this._t('instrBuild');
  },
  _start: function (id, pos) {
    var C = ZeroCardsCore;
    this._clearTimers(); this._view = {}; this._pos = pos || 0; this._busy = false; this._dragUntil = 0;
    var r = C.round(this._face(), this._range(), id), code = this._codes && this._codes[id];
    if (code == null) code = Math.floor(Math.random() * 6);
    this.st = C.newState(r, code);
    var line = this._promptText(r); if (this._pa) this._pa.msg = line;
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
    var wrap = api.el('div', 'zc-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="zc-target"></div><div class="zc-main"><div class="zc-left"><div class="zc-standrow"></div><div class="zc-mat"></div></div><div class="zc-right"></div></div><div class="zc-foot"></div><p class="zc-note" aria-live="polite"></p>';
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
    var C = ZeroCardsCore, st = this.st, r = st.r, L = C.layout(this._width()), v = this._view;
    this._wrap.className = 'zc-wrap ' + (L.wide ? 'is-wide' : 'is-narrow') + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + r.kind;
    this._paintTarget();
    this._paintStand();
    this._paintMat();
    this._paintRight();
    /* ---- Check + the bubble ---- */
    var self = this, foot = this._q('.zc-foot'); foot.innerHTML = '';
    var ck = this._btn('zc-check', 'check', null); ck.textContent = this._t('check'); ck.disabled = st.done || !!this._busy;
    ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck);
    var note = this._q('.zc-note'), h = C.hint(st);
    if (v.msg) { note.textContent = v.msg; note.className = 'zc-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'zc-note is-hint'; }
    else if (h && v.checked) { note.textContent = this._t(h.key, h.args); note.className = 'zc-note is-hint'; }
    else { note.textContent = ''; note.className = 'zc-note'; }
  },

  /* ---- the target card: the round's number in one coat ---- */
  _paintTarget: function () {
    var st = this.st, r = st.r, el = this._q('.zc-target'), self = this, n = r.n, t = r.tens / 10, o = r.ones;
    el.innerHTML = ''; el.className = 'zc-target is-' + r.coat; el.style.display = r.kind === 'which' || r.kind === 'tens' ? 'none' : '';
    if (r.kind === 'which' || r.kind === 'tens') return;
    var put = function (cls, text) { var s = self.api.el('span', cls); s.textContent = text; el.appendChild(s); return s; };
    if (r.coat === 'num') { put('zc-tnum', String(n)); el.setAttribute('aria-label', String(n)); }
    else if (r.coat === 'word') { put('zc-tword', this._word(n)); el.setAttribute('aria-label', this._word(n)); }
    else if (r.coat === 'to') { var s1 = this._t('coatTO', { tp: this._tp(t), op: this._op(o) }); put('zc-tphrase', s1); el.setAttribute('aria-label', s1); }
    else if (r.coat === 'tens') { var s2 = this._tp(t); put('zc-tphrase', s2); el.setAttribute('aria-label', s2); }
    else if (r.coat === 'sum') { put('zc-tnum', r.tens + ' + ' + r.ones); el.setAttribute('aria-label', r.tens + ' + ' + r.ones); }
    else if (r.coat === 'spoken') {
      var sp = this._btn('zc-speak', 'speak', this._t('ariaSpeak'), '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 7a8 8 0 0 1 0 10"/></svg>');
      sp.addEventListener('click', function () { self._say(); }); el.appendChild(sp);
      put('zc-tsmall', String(n)); el.setAttribute('aria-label', String(n));
    }
    else if (r.coat === 'frames') {
      var fr = this.api.el('span', 'zc-frames'); fr.setAttribute('role', 'img'); fr.setAttribute('aria-label', this._t('ariaFrames', { n: n }));
      for (var f = 0; f < 2; f++) { var tf = document.createElement('i'); tf.className = 'zc-tf'; for (var d = 0; d < 10; d++) { var dot = document.createElement('b'); if (f * 10 + d < n) dot.className = 'is-on'; tf.appendChild(dot); } fr.appendChild(tf); }
      el.appendChild(fr);
    }
    else if (r.coat === 'tally') {
      var ta = this.api.el('span', 'zc-tally'); ta.setAttribute('role', 'img'); ta.setAttribute('aria-label', this._t('ariaTally', { n: n }));
      var gates = Math.floor(n / 5), rest = n % 5, svg = '', x = 0, g;
      for (g = 0; g < gates; g++) { svg += '<g transform="translate(' + x + ',0)"><path d="M2 2V18M6 2V18M10 2V18M14 2V18M0 15L17 4" stroke="#3A2E1F" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>'; x += 21; }
      for (g = 0; g < rest; g++) svg += '<path d="M' + (x + 2 + g * 4) + ' 2V18" stroke="#3A2E1F" stroke-width="1.8" stroke-linecap="round"/>';
      var w = x + rest * 4 + 4; ta.innerHTML = '<svg viewBox="0 0 ' + w + ' 20" style="aspect-ratio:' + w + '/20" aria-hidden="true">' + svg + '</svg>';
      el.appendChild(ta);
    }
    else if (r.coat === 'blocks') {
      var bl = this.api.el('span', 'zc-tblocks'); bl.setAttribute('role', 'img'); bl.setAttribute('aria-label', this._t('ariaBlocks', { r: t, c: o }));
      this._drawBlocks(bl, t, o, 'is-small'); el.appendChild(bl);
    }
  },
  _say: function () { if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'number', text: String(this.st.r.n), lang: this._loc(), rate: 0.9 }); } catch (e) { /* silent */ } } },
  _drawBlocks: function (host, rods, cubes, cls) {
    var rr = this.api.el('span', 'zc-rods ' + (cls || '')), cc = this.api.el('span', 'zc-cubes ' + (cls || '')), i;
    for (i = 0; i < rods; i++) rr.appendChild(this.api.el('i', 'zc-rod'));
    for (i = 0; i < cubes; i++) cc.appendChild(this.api.el('i', 'zc-cube'));
    if (rods || cls === 'is-tray') host.appendChild(rr); if (cubes || cls === 'is-tray') host.appendChild(cc);
  },

  /* ---- the stand: two cells; the tens card fills both, the ones card lies on its 0 ---- */
  _paintStand: function () {
    var st = this.st, r = st.r, self = this, C = ZeroCardsCore, row = this._q('.zc-standrow'), fixed = r.kind === 'which' || st.done;
    row.innerHTML = '';
    var stand = this.api.el('div', 'zc-stand' + (st.stretched ? ' is-stretched' : '') + (this._view.tip ? ' is-tipping' : ''));
    stand.setAttribute('role', 'group'); stand.setAttribute('aria-label', this._t('ariaStand', { v: C.reads(st) ? C.reads(st) + ' — ' + this._word(C.value(st)) : this._t('ariaEmpty') }));
    var cellL = this.api.el('span', 'zc-cell is-l'), cellR = this.api.el('span', 'zc-cell is-r');
    stand.appendChild(cellL); stand.appendChild(cellR);
    if (st.tens != null) {
      var tc = fixed ? this.api.el('span', 'zc-card is-tens is-on') : this._btn('zc-card is-tens is-on', 'stand-t', this._t('ariaLift', { v: st.tens }));
      tc.innerHTML = '<span class="zc-d">' + (st.tens / 10) + '</span><span class="zc-d is-zero">0</span>';
      if (!fixed) tc.addEventListener('click', function () { if (self._dragUntil && Date.now() < self._dragUntil) { self._dragUntil = 0; return; } self._lift('t'); });
      stand.appendChild(tc);
    }
    if (st.stretched) { var plus = this.api.el('span', 'zc-plus'); plus.textContent = '+'; plus.setAttribute('aria-hidden', 'true'); stand.appendChild(plus); }
    if (st.ones != null) {
      var oc = fixed ? this.api.el('span', 'zc-card is-ones is-on') : this._btn('zc-card is-ones is-on', 'stand-o', this._t('ariaLift', { v: st.ones }));
      oc.innerHTML = '<span class="zc-tab"></span><span class="zc-d">' + st.ones + '</span>';
      if (!fixed) {
        oc.addEventListener('click', function () { if (self._dragUntil && Date.now() < self._dragUntil) { self._dragUntil = 0; return; } self._lift('o'); });
        if (r.kind === 'stretch') oc.addEventListener('pointerdown', function (e) { self._dragStretch(e); });
      }
      stand.appendChild(oc);
    }
    if (this._view.tip) { var tp = this.api.el('span', 'zc-card is-ones is-tip is-' + this._view.tip.where); tp.innerHTML = '<span class="zc-tab"></span><span class="zc-d">' + this._view.tip.v + '</span>'; tp.setAttribute('aria-hidden', 'true'); stand.appendChild(tp); }
    row.appendChild(stand);
    if (r.kind === 'stretch') {
      var sb = this._btn('zc-stretch' + (st.stretched ? ' is-on' : ''), 'stretch', this._t(st.stretched ? 'ariaTogether' : 'ariaStretch'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12H21M7 8L3 12L7 16M17 8L21 12L17 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      sb.disabled = !C.canStretch(st) || !!this._busy;
      sb.addEventListener('click', function () { self._stretch(); }); row.appendChild(sb);
    }
  },

  /* ---- the mat: the stack's blocks; after miss 1 the half that differs glows, after miss 2 the target's own blocks show see-through ---- */
  _paintMat: function () {
    var st = this.st, r = st.r, C = ZeroCardsCore, mat = this._q('.zc-mat'), v = this._view;
    mat.innerHTML = ''; mat.setAttribute('role', 'img'); mat.style.display = r.kind === 'which' ? 'none' : '';
    if (r.kind === 'which') return;
    /* how many tens?: the mat holds the GIVEN blocks (the cards do not pour); the half that differs from the cards glows after every miss */
    var given = r.kind === 'tens', b = given ? C.targetBlocks(r) : C.blocks(st), w = C.targetBlocks(r), help = v.checked && st.last && st.last.reason === 'miss' && !st.done, ghost = help && st.show >= 2 && !given, dif = C.differs(st);
    mat.setAttribute('aria-label', this._t('ariaMat', { r: b.rods, c: b.cubes })); mat.className = 'zc-mat' + (given ? ' is-given' : '');
    var half = function (cls, glow) { var h = document.createElement('span'); h.className = 'zc-half ' + cls + (glow ? ' is-glow' : ''); mat.appendChild(h); return h; };
    var hr = half('is-rods', help && !ghost && dif.rods), hc = half('is-cubes', help && !ghost && !dif.rods && dif.cubes), i;
    var nr = ghost ? Math.max(b.rods, w.rods) : b.rods, nc = ghost ? Math.max(b.cubes, w.cubes) : b.cubes;
    for (i = 0; i < nr; i++) { var rod = document.createElement('i'); rod.className = 'zc-rod' + (i >= b.rods ? ' is-ghost' : ghost && i >= w.rods ? ' is-extra' : ''); if (st.done) { var lab = document.createElement('span'); lab.className = 'zc-n'; lab.textContent = String((i + 1) * 10); rod.appendChild(lab); rod.setAttribute('data-n', String((i + 1) * 10)); rod.style.animationDelay = (this.FAST ? 0 : i * 150) + 'ms'; } hr.appendChild(rod); }
    for (i = 0; i < nc; i++) { var cube = document.createElement('i'); cube.className = 'zc-cube' + (i >= b.cubes ? ' is-ghost' : ghost && i >= w.cubes ? ' is-extra' : ''); if (st.done) { cube.setAttribute('data-n', String(b.rods * 10 + i + 1)); cube.style.animationDelay = (this.FAST ? 0 : (b.rods + i) * 150) + 'ms'; } hc.appendChild(cube); }
  },

  /* ---- the right column: the card rack (or, for "which blocks?", the three trays) ---- */
  _paintRight: function () {
    var st = this.st, r = st.r, C = ZeroCardsCore, host = this._q('.zc-right'), self = this;
    host.innerHTML = '';
    if (r.kind === 'which') {
      var trays = this.api.el('div', 'zc-trays'); trays.setAttribute('role', 'group');
      var stack = C.blocks(st);
      st.trays.forEach(function (t, i) {
        var picked = st.tray === i, lastMiss = st.lastTray === i && !st.done, right = st.done && i === st.rightPos;
        var b = self._btn('zc-tray' + (picked ? ' is-picked' : '') + (lastMiss ? ' is-miss' : '') + (right ? ' is-right' : ''), 'tray-' + i, self._t('ariaTray', { i: i + 1, r: t.rods, c: t.cubes }));
        b.disabled = st.done;
        var body = self.api.el('span', 'zc-traybody'); self._drawBlocks(body, t.rods, t.cubes, 'is-tray');
        /* after a miss on this tray, or once it is right: the stack's own blocks laid over it — extra blocks outlined, missing ones dashed */
        if (lastMiss || right) {
          var cmp = C.compare(stack, t), rods = body.querySelector('.zc-rods'), cubes = body.querySelector('.zc-cubes'), k;
          for (k = stack.rods; k < t.rods; k++) rods.children[k].className += ' is-extra';
          for (k = 0; k < cmp.missing.rods; k++) rods.appendChild(self.api.el('i', 'zc-rod is-ghost'));
          for (k = stack.cubes; k < t.cubes; k++) cubes.children[k].className += ' is-extra';
          for (k = 0; k < cmp.missing.cubes; k++) cubes.appendChild(self.api.el('i', 'zc-cube is-ghost'));
        }
        b.appendChild(body);
        b.addEventListener('click', function () { self._pick(i); });
        trays.appendChild(b);
      });
      host.appendChild(trays);
      return;
    }
    var R = C.rack(r.range), rack = this.api.el('div', 'zc-rack'), tg = this.api.el('div', 'zc-rackt'), og = this.api.el('div', 'zc-racko');
    tg.setAttribute('role', 'group'); tg.setAttribute('aria-label', this._t('ariaRackT')); og.setAttribute('role', 'group'); og.setAttribute('aria-label', this._t('ariaRackO'));
    R.tens.forEach(function (v) {
      var b = self._btn('zc-chip is-tens' + (st.tens === v ? ' is-used' : ''), 'rack-t' + v, self._t('ariaPutT', { v: v }), '<span class="zc-d">' + (v / 10) + '</span><span class="zc-d">0</span>');
      b.disabled = st.done || !!self._busy;
      b.addEventListener('click', function () { if (self._dragUntil && Date.now() < self._dragUntil) { self._dragUntil = 0; return; } self._placeT(v); });
      b.addEventListener('pointerdown', function (e) { self._dragRack(e, 't', v, b); });
      tg.appendChild(b);
    });
    R.ones.forEach(function (v) {
      var b = self._btn('zc-chip is-ones' + (st.ones === v ? ' is-used' : ''), 'rack-o' + v, self._t('ariaPutO', { v: v }), '<span class="zc-tab"></span><span class="zc-d">' + v + '</span>');
      b.disabled = st.done || !!self._busy;
      b.addEventListener('click', function () { if (self._dragUntil && Date.now() < self._dragUntil) { self._dragUntil = 0; return; } self._placeO(v, 'zero'); });
      b.addEventListener('pointerdown', function (e) { self._dragRack(e, 'o', v, b); });
      og.appendChild(b);
    });
    rack.appendChild(tg); rack.appendChild(og); host.appendChild(rack);
  },

  /* ---------------- actions ---------------- */
  _edit: function (extra) { this._clearTimers(); this._busy = false; this._view = extra || {}; this._paint(); },
  _placeT: function (v) {
    if (this._busy || this.st.done) return;
    var res = ZeroCardsCore.placeTens(this.st, v);
    if (res === 'placed' || res === 'swapped') { this.api.sound(300); this._edit(); }
  },
  _placeO: function (v, where) {
    var self = this; if (this._busy || this.st.done) return;
    var res = ZeroCardsCore.placeOnes(this.st, v, where);
    if (res === 'tipped') {
      this.api.sound(140); this._edit({ tip: { v: v, where: where === 'left' ? 'left' : 'off' }, note: this._t(this.st.tens != null ? 'hintTip' : 'hintTipAlone') });
      this._later(function () { if (self._view.tip) { self._view.tip = null; self._paint(); } }, this.FAST ? 250 : 700);
      return;
    }
    if (res === 'stacked' || res === 'alone') { this.api.sound(res === 'stacked' ? 520 : 600); this._edit(); }
  },
  _lift: function (which) { if (this._busy || this.st.done) return; if (ZeroCardsCore.lift(this.st, which) === 'lifted') { this.api.sound(250); this._edit(); } },
  _stretch: function (on) { if (this._busy || this.st.done) return; var res = ZeroCardsCore.stretch(this.st, on); if (res === 'stretched' || res === 'together') { this.api.sound(res === 'stretched' ? 440 : 560); this._edit(); } },
  _pick: function (i) { if (this._busy || this.st.done) return; if (ZeroCardsCore.pickTray(this.st, i) === 'picked') { this.api.sound(400); this._edit(); } },
  /* drag a rack card onto the stand: a tens card lands anywhere on it; a ones card stays only in the right cell (on the 0), over the tens digit or beside the stand it tips off */
  _dragRack: function (e, kind, v, el) {
    var self = this; if (this._busy || this.st.done || (e.button != null && e.button !== 0)) return;
    var x0 = e.clientX, y0 = e.clientY, ghost = null, moved = false;
    var move = function (ev) {
      if (!moved && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 8) return;
      if (!moved) { moved = true; ghost = el.cloneNode(true); ghost.className += ' zc-ghostcard'; ghost.removeAttribute('data-k'); document.body.appendChild(ghost); }
      ghost.style.left = (ev.clientX - ghost.offsetWidth / 2) + 'px'; ghost.style.top = (ev.clientY - ghost.offsetHeight / 2) + 'px';
    };
    var up = function (ev) {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      if (!moved) return;
      self._dragUntil = Date.now() + 300; if (ghost) ghost.remove();
      var where = self._dropWhere(ev.clientX, ev.clientY);
      if (!where) return;
      if (kind === 't') self._placeT(v); else self._placeO(v, where);
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  /* where a drop lands relative to the stand: 'zero' (right cell) · 'left' (over the tens cell) · 'off' (just beside the stand) · null (nowhere near) */
  _dropWhere: function (x, y) {
    var s = this._q('.zc-stand'); if (!s) return null;
    var R = s.getBoundingClientRect(), cr = this._q('.zc-cell.is-r').getBoundingClientRect(), pad = 30;
    if (y < R.top - pad || y > R.bottom + pad) return null;
    if (x > R.right + 4 && x < R.right + 180) return 'off';
    if (x < R.left - pad || x > R.right + 4) return null;
    return x >= cr.left ? 'zero' : 'left';
  },
  /* stretch: drag the ones card on the stand to the right (40 + 7); drag it back to close the gap */
  _dragStretch: function (e) {
    var self = this; if (this._busy || this.st.done || (e.button != null && e.button !== 0)) return;
    var x0 = e.clientX, done = false;
    var move = function (ev) {
      var dx = ev.clientX - x0;
      if (!done && dx > 36 && !self.st.stretched) { done = true; self._dragUntil = Date.now() + 300; self._stretch(true); }
      else if (!done && dx < -36 && self.st.stretched) { done = true; self._dragUntil = Date.now() + 300; self._stretch(false); }
    };
    var up = function () { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); if (done) self._dragUntil = Date.now() + 300; };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  _keydown: function (e) {
    var k = e.key, st = this.st; if (this._busy || st.done) return;
    if ((k === 's' || k === 'S') && st.r.kind === 'stretch') { this._stretch(); e.preventDefault(); }
    else if (st.r.kind === 'which' && (k === '1' || k === '2' || k === '3')) { this._pick(+k - 1); e.preventDefault(); }
  },
  _check: function () {
    var C = ZeroCardsCore, st = this.st;
    if (this._busy || st.done) return;
    var a = C.check(st);
    this._view = { checked: true };
    if (a.result === 'none') { this.api.sound(200); this._paint(); this.api.announce(this._q('.zc-note').textContent || ''); return; }
    if (a.result === 'ok') {
      var msg = this._okText(); this._view.msg = msg; this.api.sound(880); this._paint(); this.api.announce(msg);
      this._advance(msg.length * 60 + 2600);
    } else { this.api.sound(220); this._paint(); this.api.announce(this._q('.zc-note').textContent || ''); }
  },
  _okText: function () {
    var ok = ZeroCardsCore.okOf(this.st), a = ok.args;
    if (ok.key === 'okBuild') return a.o === 0 ? this._t('okBuild0', { n: a.n, tp: this._tp(a.t) }) : this._t('okBuild', { n: a.n, tp: this._tp(a.t), op: this._op(a.o) });
    return this._t(ok.key, a);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

var zcCssDone = false;
function injectZeroCSS() {
  if (zcCssDone || typeof document === 'undefined') return;
  zcCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.zc-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;--zc-cw:112px;--zc-ch:100px;--zc-fs:72px;--zc-rw:24px;--zc-rh:128px;--zc-cu:24px;--zc-chip:56px;} .zc-wrap:focus{outline:none;}'
  + '.zc-wrap.is-narrow{--zc-cw:70px;--zc-ch:68px;--zc-fs:46px;--zc-rw:12px;--zc-rh:74px;--zc-cu:14px;--zc-chip:44px;} .zc-wrap.is-narrow .zc-half.is-rods{gap:3px;padding:16px 6px 8px;} .zc-wrap.is-narrow .zc-half{padding-top:16px;min-height:calc(var(--zc-rh) + 26px);} .zc-wrap.is-narrow .zc-mat{min-height:calc(var(--zc-rh) + 26px);} .zc-wrap.is-tiny{--zc-cw:64px;--zc-ch:62px;--zc-fs:42px;} .zc-wrap.is-tiny .zc-stand.is-stretched{grid-template-columns:var(--zc-cw) var(--zc-cw) calc(var(--zc-cw) * 0.35) var(--zc-cw);} .zc-wrap.is-narrow .zc-stretch{width:44px;height:44px;} .zc-wrap.is-narrow .zc-standrow{gap:6px;}'
  /* target card */
  + '.zc-target{display:flex;align-items:center;justify-content:center;gap:12px;min-height:60px;min-width:180px;max-width:100%;box-sizing:border-box;padding:6px 18px;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #3A2E1F,0 3px 0 #C9B79A;color:#146B5E;}'
  + '.zc-tnum{font-family:' + H + ';font-weight:800;font-size:46px;line-height:1;} .zc-tword,.zc-tphrase{font-family:' + B + ';font-weight:800;font-size:26px;line-height:1.2;text-align:center;overflow-wrap:anywhere;} .zc-tsmall{font-family:' + H + ';font-weight:800;font-size:22px;color:#6B5E4C;}'
  + '.zc-wrap.is-narrow .zc-tnum{font-size:38px;} .zc-wrap.is-narrow .zc-tword,.zc-wrap.is-narrow .zc-tphrase{font-size:20px;} .zc-wrap.is-narrow .zc-target{min-height:52px;padding:4px 12px;}'
  + '.zc-speak{width:48px;height:48px;border-radius:50%;border:0;background:#146B5E;color:#fff;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 3px 0 #0E4E44;} .zc-speak svg{width:26px;height:26px;}'
  + '.zc-frames{display:inline-flex;gap:8px;} .zc-tf{display:grid;grid-template-columns:repeat(5,18px);grid-template-rows:repeat(2,18px);gap:2px;padding:3px;border:2px solid #3A2E1F;border-radius:4px;background:#fff;} .zc-tf b{border-radius:50%;margin:2px;background:transparent;box-shadow:inset 0 0 0 1px #E6DCCB;} .zc-tf b.is-on{background:#E0603A;box-shadow:none;}'
  + '.zc-wrap.is-narrow .zc-tf{grid-template-columns:repeat(5,14px);grid-template-rows:repeat(2,14px);}'
  + '.zc-tally svg{display:block;height:34px;width:auto;max-width:100%;} .zc-wrap.is-narrow .zc-tally svg{height:28px;}'
  + '.zc-tblocks{display:inline-flex;align-items:flex-end;gap:14px;padding:4px 0;}'
  /* main grid */
  + '.zc-main{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
  + '.zc-wrap.is-wide .zc-main{gap:14px;}'
  + '.zc-right{width:100%;display:flex;justify-content:center;}'
  + '.zc-left{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
  + '.zc-standrow{display:flex;align-items:center;justify-content:center;gap:10px;min-height:calc(var(--zc-ch) + 12px);}'
  /* the stand: two cells, a lip underneath */
  + '.zc-stand{position:relative;display:grid;grid-template-columns:var(--zc-cw) var(--zc-cw);height:var(--zc-ch);padding:0 6px 10px;border-radius:8px;background:linear-gradient(#00000000 0,#00000000 calc(100% - 12px),#B98A55 calc(100% - 12px));box-shadow:0 4px 0 #8C6A45;}'
  + '.zc-stand.is-stretched{grid-template-columns:var(--zc-cw) var(--zc-cw) calc(var(--zc-cw) * 0.45) var(--zc-cw);}'
  + '.zc-cell{grid-row:1;border:2px dashed #C9B79A;border-radius:8px;margin:2px;} .zc-cell.is-l{grid-column:1;} .zc-cell.is-r{grid-column:2;}'
  + '.zc-stand.is-stretched .zc-cell.is-r{display:none;}'
  + '.zc-card{grid-row:1;display:flex;align-items:center;justify-content:center;border:0;border-radius:8px;font-family:' + H + ';font-weight:800;font-size:var(--zc-fs);line-height:1;color:#3A2E1F;padding:0;cursor:pointer;position:relative;}'
  + '.zc-card.is-tens{grid-column:1 / span 2;background:#FCE7DE;box-shadow:inset 0 0 0 3px #E0603A,0 3px 0 #B9472A;}'
  + '.zc-card.is-tens .zc-d{flex:1;text-align:center;} .zc-card.is-ones{grid-column:2;background:#DDF0EC;box-shadow:inset 0 0 0 3px #146B5E,0 3px 0 #0E4E44;z-index:2;}'
  + '.zc-stand.is-stretched .zc-card.is-ones{grid-column:4;} .zc-plus{grid-row:1;grid-column:3;align-self:center;justify-self:center;font-family:' + H + ';font-weight:800;font-size:calc(var(--zc-fs) * 0.8);color:#146B5E;animation:zcPop .22s ease-out;}'
  + '.zc-tab{position:absolute;left:-9px;top:50%;width:0;height:0;margin-top:-10px;border-style:solid;border-width:10px 10px 10px 0;border-color:transparent #146B5E transparent transparent;}'
  + '.zc-card.is-ones.is-on{animation:zcGulp .18s ease-out;} @keyframes zcGulp{0%{transform:translateY(-6px);}60%{transform:translateY(3px);}100%{transform:none;}} @keyframes zcPop{from{transform:scale(.3);opacity:0;}to{transform:none;opacity:1;}}'
  + '.zc-card.is-tip{position:absolute;top:0;width:var(--zc-cw);height:calc(var(--zc-ch) - 10px);pointer-events:none;opacity:.9;animation:zcTip .6s ease-in forwards;} .zc-card.is-tip.is-left{left:6px;} .zc-card.is-tip.is-off{left:calc(6px + 2 * var(--zc-cw) + 4px);}'
  + '@keyframes zcTip{0%{transform:translateY(-14px) rotate(0);}35%{transform:translateY(-4px) rotate(14deg);}100%{transform:translate(40px,46px) rotate(58deg);opacity:0;}}'
  + '.zc-wrap.is-fast .zc-card,.zc-wrap.is-fast .zc-plus,.zc-wrap.is-fast .zc-rod,.zc-wrap.is-fast .zc-cube{animation:none !important;}'
  + '.zc-stretch{width:52px;height:52px;border-radius:12px;border:0;background:#F1E7D6;color:#3A2E1F;cursor:pointer;box-shadow:0 3px 0 #C9B79A;display:inline-flex;align-items:center;justify-content:center;} .zc-stretch svg{width:30px;height:30px;} .zc-stretch.is-on{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4E44;} .zc-stretch:disabled{opacity:.4;cursor:default;}'
  /* the mat */
  + '.zc-mat{display:grid;grid-template-columns:3fr 2fr;width:100%;max-width:520px;min-height:calc(var(--zc-rh) + 32px);border-radius:12px;background:#F4ECDD;box-shadow:inset 0 0 0 2px #E2D5BF;box-sizing:border-box;}'
  + '.zc-half{display:flex;flex-wrap:wrap;align-content:flex-end;gap:4px;padding:22px 10px 8px;min-height:calc(var(--zc-rh) + 32px);box-sizing:border-box;border-radius:12px;} .zc-half.is-rods{justify-content:center;border-right:2px solid #E2D5BF;border-radius:12px 0 0 12px;} .zc-half.is-cubes{display:grid;grid-template-columns:repeat(5,var(--zc-cu));grid-auto-rows:var(--zc-cu);align-content:end;justify-content:center;}'
  + '.zc-half.is-glow{box-shadow:inset 0 0 0 3px #F4CF62;background:#FFF6D8;}'
  + '.zc-rod{display:block;position:relative;width:var(--zc-rw);height:var(--zc-rh);border-radius:3px;background:#E0603A repeating-linear-gradient(to bottom,transparent 0,transparent calc(10% - 1px),#B9472A calc(10% - 1px),#B9472A 10%);box-shadow:inset 0 0 0 2px #B9472A;}'
  + '.zc-cube{display:block;position:relative;width:var(--zc-cu);height:var(--zc-cu);border-radius:3px;background:#2E9C89;box-shadow:inset 0 0 0 2px #146B5E;}'
  + '.zc-rod.is-ghost,.zc-cube.is-ghost{background:transparent;box-shadow:none;outline:2px dashed #146B5E;outline-offset:-2px;opacity:.75;} .zc-rod.is-extra,.zc-cube.is-extra{outline:3px solid #F2784B;outline-offset:1px;}'
  + '.zc-n{position:absolute;left:50%;top:-17px;transform:translateX(-50%);font-family:' + H + ';font-weight:800;font-size:13px;line-height:14px;color:#146B5E;white-space:nowrap;} .zc-wrap.is-narrow .zc-n{font-size:9px;line-height:10px;top:-12px;letter-spacing:-0.3px;}'
  + '.zc-wrap.is-done .zc-rod[data-n],.zc-wrap.is-done .zc-cube[data-n]{animation:zcCount .3s ease-out both;} @keyframes zcCount{from{transform:translateY(-6px);opacity:.3;}to{transform:none;opacity:1;}}'
    + '.zc-rods.is-small .zc-rod{width:10px;height:50px;} .zc-cubes.is-small{display:grid;grid-template-columns:repeat(5,10px);grid-auto-rows:10px;gap:2px;align-content:end;} .zc-cubes.is-small .zc-cube{width:10px;height:10px;} .zc-rods.is-small{display:flex;gap:3px;align-items:flex-end;}'
  /* the rack */
  + '.zc-rack{display:flex;gap:14px;justify-content:center;} .zc-wrap.is-wide .zc-rack{flex-direction:column;align-items:center;gap:10px;} .zc-wrap.is-wide .zc-rack{width:100%;max-width:640px;} .zc-wrap.is-wide .zc-rackt{width:100%;grid-template-columns:repeat(9,minmax(44px,64px));justify-content:center;} .zc-wrap.is-wide .zc-racko{width:100%;grid-template-columns:repeat(9,minmax(44px,var(--zc-chip)));justify-content:center;} .zc-wrap.is-wide .zc-chip{width:100%;}'
  + '.zc-rackt,.zc-racko{display:grid;grid-template-columns:repeat(3,auto);gap:6px;} .zc-wrap.is-narrow .zc-rack{gap:6px;} .zc-wrap.is-narrow .zc-chip.is-tens{width:var(--zc-chip);} .zc-wrap.is-narrow{gap:8px;} .zc-wrap.is-narrow .zc-main,.zc-wrap.is-narrow .zc-left{gap:8px;} .zc-wrap.is-narrow .zc-rackt,.zc-wrap.is-narrow .zc-racko{gap:4px;}'
  + '.zc-chip{position:relative;display:inline-flex;align-items:center;justify-content:center;height:var(--zc-chip);border:0;border-radius:8px;font-family:' + H + ';font-weight:800;font-size:calc(var(--zc-chip) * 0.5);line-height:1;color:#3A2E1F;cursor:pointer;padding:0;touch-action:none;}'
  + '.zc-chip.is-tens{width:calc(var(--zc-chip) * 1.25);background:#FCE7DE;box-shadow:inset 0 0 0 2px #E0603A,0 3px 0 #B9472A;} .zc-chip.is-ones{width:var(--zc-chip);background:#DDF0EC;box-shadow:inset 0 0 0 2px #146B5E,0 3px 0 #0E4E44;}'
  + '.zc-chip .zc-tab{left:-7px;border-width:7px 7px 7px 0;margin-top:-7px;} .zc-chip.is-used{outline:3px solid #F4CF62;outline-offset:1px;} .zc-chip:disabled{opacity:.55;cursor:default;}'
  + '.zc-ghostcard{position:fixed;z-index:60;pointer-events:none;opacity:.88;transform:scale(1.08);}'
  /* the trays (which blocks?) */
  + '.zc-trays{display:flex;flex-direction:column;gap:8px;width:100%;} .zc-wrap.is-narrow .zc-trays{gap:6px;} .zc-wrap.is-narrow .zc-tray{min-height:86px;} .zc-wrap.is-narrow .zc-rods.is-tray .zc-rod{height:56px;} .zc-wrap.is-wide .zc-trays{flex-direction:row;max-width:660px;gap:12px;} .zc-wrap.is-wide .zc-tray{flex:1 1 0;min-height:118px;padding:8px 10px;} .zc-wrap.is-wide .zc-rods.is-tray{gap:2px;} .zc-wrap.is-wide .zc-rods.is-tray .zc-rod{width:9px;height:76px;} .zc-wrap.is-wide .zc-traybody{gap:8px;}'
  + '.zc-tray{position:relative;display:flex;align-items:center;gap:10px;min-height:96px;padding:6px 12px;border:0;border-radius:14px;background:#F4ECDD;box-shadow:inset 0 0 0 2px #E2D5BF,0 3px 0 #D8C7AA;cursor:pointer;width:100%;box-sizing:border-box;}'
  + '.zc-traybody{display:flex;align-items:flex-end;gap:14px;flex:1;justify-content:center;}'
  + '.zc-rods.is-tray{display:flex;gap:3px;align-items:flex-end;} .zc-rods.is-tray .zc-rod{width:10px;height:62px;} .zc-cubes.is-tray{display:grid;grid-template-columns:repeat(5,12px);grid-auto-rows:12px;gap:3px;align-content:end;} .zc-cubes.is-tray .zc-cube{width:12px;height:12px;}'
  + '.zc-tray.is-picked{box-shadow:inset 0 0 0 4px #146B5E,0 3px 0 #0E4E44;background:#E6F3F0;} .zc-tray.is-miss{box-shadow:inset 0 0 0 3px #F2784B,0 3px 0 #D8C7AA;} .zc-tray.is-right{box-shadow:inset 0 0 0 4px #146B5E;background:#E6F3F0;} .zc-tray:disabled{cursor:default;}'
  /* Check + note */
  + '.zc-foot{display:flex;justify-content:center;} .zc-check{min-width:150px;min-height:54px;padding:0 26px;border:0;border-radius:16px;background:#1E8C78;color:#fff;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #0E5E50;} .zc-check:disabled{opacity:.5;cursor:default;}'
  + '.zc-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .zc-note.is-hint{color:#8A3B1F;} .zc-wrap.is-narrow .zc-note{font-size:17px;}'
  + '.zc-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var s = document.createElement('style'); s.id = 'zc-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.ZeroCardsActivity = ZeroCardsActivity;
