/* =====================================================================
   TOOL #19 — CHORAL COUNTING   (choral-counting.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #19 of the Premium Tools Program
   (Wave 3, Morning Circle) — the class counts aloud together while the
   teacher records: every tap of NEXT inks the next number into a
   chart-paper grid (pen-pop, persisted hand-jitter, a traveling halo the
   back row can find). The tool NEVER auto-advances — the pause is the
   pedagogy. Noticing phase: armed marker colors on cells, whole-line
   header washes, and the place-value digit tint ("ones repeat, tens
   climb"). Pause-and-predict: a honey "?" wonder-mark on any empty cell
   — no guess is ever recorded, so the resolve is an ARRIVAL (same
   pen-pop as every cell + a brief sparkle), never a verdict.

   LOCALIZATION MOAT: with "speak each number" ON, TTS reads the BARE
   NUMERAL in the class's language — the grid shows 21, 22 while the
   room hears einundzwanzig, zweiundzwanzig (DE/NL/DA inversion), FR
   soixante-dix boundary work, FI long transparent compounds at a slower
   rate. Numerals only, never number words on screen (bokmål syv/sju
   stays the voice's business). Rate 0.92; 0.85 for ≥100 in the
   compound-number locales. Default OFF — the CLASS voice does the
   counting (Franke/Kazemi: the tool inks, children chant).

   NO-SHAME: no timers/scores/verdict colors; back-one is a quiet fade
   (never "WRONG"); wonder-resolve celebrates arrival, not correctness;
   completion shows "What do you notice?" — the discussion, not a score.

   FREE: count by 1s/10s (start 0/1/10, forward, 10 columns), wonder
   marks, the speech toggle, 2 K presets. PREMIUM (structural): all
   skips/starts (numpad 0-999), backwards, column choice, record-down-
   columns, ALL highlight affordances, the full preset shelf incl. the
   per-locale showcase counts, saved counts (≤8).

   Pure engine (derived terms, grid bijection both directions, plan
   bounds 0..1000) is gate-driven by scripts/verify-choral-counting.js.
   ===================================================================== */
var ChoralCounting = {
  id: 'choral-counting',

  strings: {
    title:        {en:'Choral Counting',de:'Zählen im Chor',fr:'Comptons ensemble',it:'Contiamo insieme',es:'Conteo en coro',pt:'Contagem em coro',nl:'Samen tellen',sv:'Räkna i kör',da:'Tælle i kor',no:'Telle i kor',fi:'Lasketaan yhdessä'},
    instruction:  {en:'Count aloud together — each tap writes the next number on the chart.',de:'Zählt gemeinsam laut — bei jedem Antippen wird die nächste Zahl auf das Blatt geschrieben.',fr:'Comptez à voix haute tous ensemble — chaque appui écrit le nombre suivant sur la feuille.',it:'Contate insieme ad alta voce — ogni tocco scrive il numero successivo sul foglio.',es:'Cuenten todos juntos en voz alta — cada toque escribe el siguiente número en la hoja.',pt:'Contem juntos em voz alta — cada toque escreve o próximo número no quadro.',nl:'Tel samen hardop — elke tik schrijft het volgende getal op het blad.',sv:'Räkna högt tillsammans — varje tryck skriver nästa tal på bladet.',da:'Tæl højt sammen — hvert tryk skriver det næste tal på arket.',no:'Tell høyt sammen — hvert trykk skriver neste tall på arket.',fi:'Lasketaan yhdessä ääneen — jokainen napautus kirjoittaa seuraavan luvun taululle.'},
    next:         {en:'Next',de:'Weiter',fr:'Suivant',it:'Avanti',es:'Siguiente',pt:'Próximo',nl:'Volgende',sv:'Nästa',da:'Næste',no:'Neste',fi:'Seuraava'},
    backOne:      {en:'Back one number',de:'Eine Zahl zurück',fr:'Reculer d’un nombre',it:'Indietro di un numero',es:'Retroceder un número',pt:'Voltar um número',nl:'Eén getal terug',sv:'Ett tal tillbaka',da:'Ét tal tilbage',no:'Ett tall tilbake',fi:'Yksi luku taaksepäin'},
    startLabel:   {en:'Start at',de:'Start bei',fr:'Partir de',it:'Parti da',es:'Empezar en',pt:'Começar em',nl:'Begin bij',sv:'Börja på',da:'Begynd ved',no:'Begynn på',fi:'Aloita luvusta'},
    skipLabel:    {en:'Count by',de:'In Schritten von',fr:'Compter de … en …',it:'A salti di',es:'Saltos de',pt:'Contar de',nl:'Tellen met',sv:'Räkna med',da:'Tæl med',no:'Tell med',fi:'Askel'},
    colsLabel:    {en:'Columns',de:'Spalten',fr:'Colonnes',it:'Colonne',es:'Columnas',pt:'Colunas',nl:'Kolommen',sv:'Kolumner',da:'Kolonner',no:'Kolonner',fi:'Sarakkeet'},
    downChip:     {en:'Count down',de:'Rückwärts zählen',fr:'Compter à rebours',it:'Conta all’indietro',es:'Contar hacia atrás',pt:'Contagem regressiva',nl:'Terugtellen',sv:'Räkna baklänges',da:'Tæl baglæns',no:'Tell baklengs',fi:'Laske taaksepäin'},
    colwiseChip:  {en:'Write down columns',de:'Spaltenweise schreiben',fr:'Écrire colonne par colonne',it:'Scrivi per colonne',es:'Escribir en columnas',pt:'Escrever em colunas',nl:'In kolommen schrijven',sv:'Skriv i kolumner',da:'Skriv i kolonner',no:'Skriv i kolonner',fi:'Kirjoita sarakkeittain'},
    moreChip:     {en:'More…',de:'Mehr…',fr:'Plus…',it:'Altro…',es:'Más…',pt:'Mais…',nl:'Meer…',sv:'Fler…',da:'Flere…',no:'Flere…',fi:'Lisää…'},
    summaryPill:  {en:'Start {start} · {dir}{step} · {cols} columns',de:'Start {start} · {dir}{step} · {cols} Spalten',fr:'Départ {start} · {dir}{step} · {cols} colonnes',it:'Da {start} · {dir}{step} · {cols} colonne',es:'Desde {start} · {dir}{step} · {cols} columnas',pt:'De {start} · {dir}{step} · {cols} colunas',nl:'Start {start} · {dir}{step} · {cols} kolommen',sv:'Start {start} · {dir}{step} · {cols} kolumner',da:'Start {start} · {dir}{step} · {cols} kolonner',no:'Start {start} · {dir}{step} · {cols} kolonner',fi:'Aloitus {start} · {dir}{step} · {cols} saraketta'},
    newCountAsk:  {en:'Start a new count?',de:'Eine neue Zählung beginnen?',fr:'Commencer un nouveau comptage ?',it:'Iniziare un nuovo conteggio?',es:'¿Empezar un conteo nuevo?',pt:'Começar uma nova contagem?',nl:'Een nieuwe telling beginnen?',sv:'Börja en ny räkning?',da:'Begynde en ny tælling?',no:'Starte en ny telling?',fi:'Aloitetaanko uusi lukujono?'},
    newCountYes:  {en:'New count',de:'Neue Zählung',fr:'Nouveau comptage',it:'Nuovo conteggio',es:'Conteo nuevo',pt:'Nova contagem',nl:'Nieuwe telling',sv:'Ny räkning',da:'Ny tælling',no:'Ny telling',fi:'Uusi lukujono'},
    newCountNo:   {en:'Keep counting',de:'Weiterzählen',fr:'Continuer à compter',it:'Continua a contare',es:'Seguir contando',pt:'Continuar contando',nl:'Verder tellen',sv:'Fortsätt räkna',da:'Tæl videre',no:'Fortsett å telle',fi:'Jatka laskemista'},
    noticePrompt: {en:'What do you notice?',de:'Was fällt euch auf?',fr:'Que remarquez-vous ?',it:'Che cosa notate?',es:'¿Qué observan?',pt:'O que vocês perceberam?',nl:'Wat valt jullie op?',sv:'Vad lägger ni märke till?',da:'Hvad lægger I mærke til?',no:'Hva legger dere merke til?',fi:'Mitä huomaatte?'},
    doneLine:     {en:'We counted from {a} to {b}!',de:'Wir haben von {a} bis {b} gezählt!',fr:'On a compté de {a} à {b} !',it:'Abbiamo contato da {a} a {b}!',es:'¡Contamos del {a} al {b}!',pt:'Contamos de {a} até {b}!',nl:'We hebben van {a} tot {b} geteld!',sv:'Vi räknade från {a} till {b}!',da:'Vi talte fra {a} til {b}!',no:'Vi telte fra {a} til {b}!',fi:'Laskimme luvusta {a} lukuun {b}!'},
    wonderAria:   {en:'Mark this spot to watch — what will go here?',de:'Dieses Feld beobachten — welche Zahl wird hier stehen?',fr:'Marquer cette case — quel nombre viendra ici ?',it:'Segna questa casella — quale numero ci andrà?',es:'Marcar esta casilla — ¿qué número irá aquí?',pt:'Marcar esta casinha — o que vai aparecer aqui?',nl:'Markeer dit vakje — wat komt hier te staan?',sv:'Markera den här rutan — vad ska stå här?',da:'Markér dette felt — hvad mon der kommer her?',no:'Marker denne ruten — hva kommer her?',fi:'Merkitse tämä ruutu — mikä luku tähän tulee?'},
    markerAria:   {en:'Marker {n}',de:'Stift {n}',fr:'Feutre {n}',it:'Pennarello {n}',es:'Plumón {n}',pt:'Canetinha {n}',nl:'Stift {n}',sv:'Penna {n}',da:'Tusch {n}',no:'Tusj {n}',fi:'Tussi {n}'},
    eraserAria:   {en:'Eraser',de:'Radierer',fr:'Gomme',it:'Gomma',es:'Borrador',pt:'Borracha',nl:'Gum',sv:'Sudd',da:'Viskelæder',no:'Viskelær',fi:'Pyyhekumi'},
    clearMarks:   {en:'Clear marks',de:'Markierungen löschen',fr:'Effacer les marques',it:'Cancella i segni',es:'Borrar las marcas',pt:'Apagar as marcas',nl:'Markeringen wissen',sv:'Rensa markeringar',da:'Ryd markeringer',no:'Fjern markeringer',fi:'Tyhjennä merkinnät'},
    tintOnes:     {en:'Tint the ones',de:'Einer färben',fr:'Colorier les unités',it:'Colora le unità',es:'Colorear las unidades',pt:'Colorir as unidades',nl:'Eenheden kleuren',sv:'Färga entalen',da:'Farv enerne',no:'Fargelegg enerne',fi:'Värjää ykköset'},
    tintTens:     {en:'Tint the tens',de:'Zehner färben',fr:'Colorier les dizaines',it:'Colora le decine',es:'Colorear las decenas',pt:'Colorir as dezenas',nl:'Tientallen kleuren',sv:'Färga tiotalen',da:'Farv tierne',no:'Fargelegg tierne',fi:'Värjää kymmenet'},
    presetsTitle: {en:'Planned counts',de:'Geplante Zählungen',fr:'Comptages préparés',it:'Conteggi pronti',es:'Conteos preparados',pt:'Contagens prontas',nl:'Kant-en-klare tellingen',sv:'Planerade räkningar',da:'Planlagte tællinger',no:'Ferdige tellinger',fi:'Valmiit lukujonot'},
    gradeK:       {en:'Kindergarten',de:'Kindergarten',fr:'Maternelle',it:'Scuola dell’infanzia',es:'Preescolar',pt:'Educação Infantil',nl:'Kleuters',sv:'Förskoleklass',da:'Børnehaveklasse',no:'Skolestart',fi:'Esikoulu'},
    grade1:       {en:'Grade 1',de:'Klasse 1',fr:'CP',it:'Classe prima',es:'1er grado',pt:'1º ano',nl:'Groep 3',sv:'Åk 1',da:'1. klasse',no:'1. trinn',fi:'1. luokka'},
    grade2:       {en:'Grade 2',de:'Klasse 2',fr:'CE1',it:'Classe seconda',es:'2º grado',pt:'2º ano',nl:'Groep 4',sv:'Åk 2',da:'2. klasse',no:'2. trinn',fi:'2. luokka'},
    gradeListen:  {en:'Listen closely',de:'Genau hinhören',fr:'Tendez l’oreille',it:'Ascoltiamo bene',es:'A escuchar con atención',pt:'Ouvidos atentos',nl:'Goed luisteren',sv:'Lyssna noga',da:'Lyt godt efter',no:'Lytt nøye',fi:'Kuunnellaan tarkasti'},
    pK1:          {en:'Count to 30',de:'Bis 30 zählen',fr:'Compter jusqu’à 30',it:'Contiamo fino a 30',es:'Contar hasta 30',pt:'Contar até 30',nl:'Tellen tot 30',sv:'Räkna till 30',da:'Tæl til 30',no:'Tell til 30',fi:'Lasketaan 30:een'},
    pK2:          {en:'Fives hiding in ones',de:'Fünfer verstecken sich',fr:'Où se cachent les cinq ?',it:'I cinque si nascondono',es:'Los cincos escondidos',pt:'Os cincos escondidos',nl:'De vijven verstoppen zich',sv:'Femmorna gömmer sig',da:'Femmerne gemmer sig',no:'Femmerne gjemmer seg',fi:'Viitoset piilossa'},
    pK3:          {en:'Tens to 100',de:'Zehner bis 100',fr:'De 10 en 10 jusqu’à 100',it:'Decine fino a 100',es:'Decenas hasta 100',pt:'Dezenas até 100',nl:'Tientallen tot 100',sv:'Tiotal till 100',da:'Tiere til 100',no:'Tiere til 100',fi:'Kymmenet sataan'},
    pK4:          {en:'Countdown from 20',de:'Rückwärts von 20',fr:'Compte à rebours à partir de 20',it:'Conto alla rovescia da 20',es:'Cuenta regresiva desde el 20',pt:'Contagem regressiva do 20',nl:'Aftellen vanaf 20',sv:'Nedräkning från 20',da:'Nedtælling fra 20',no:'Nedtelling fra 20',fi:'Lähtölaskenta 20:stä'},
    pG1a:         {en:'Twos to 60',de:'In Zweierschritten bis 60',fr:'De 2 en 2 jusqu’à 60',it:'Di 2 in 2 fino a 60',es:'De 2 en 2 hasta 60',pt:'De 2 em 2 até 60',nl:'Met 2 tot 60',sv:'Tvåhopp till 60',da:'Toere til 60',no:'Toere til 60',fi:'Kakkoset 60:een'},
    pG1b:         {en:'Fives to 120',de:'In Fünferschritten bis 120',fr:'De 5 en 5 jusqu’à 120',it:'Di 5 in 5 fino a 120',es:'De 5 en 5 hasta 120',pt:'De 5 em 5 até 120',nl:'Met 5 tot 120',sv:'Femhopp till 120',da:'Femmere til 120',no:'Femmere til 120',fi:'Viitoset 120:een'},
    pG1c:         {en:'Seven by tens',de:'Ab 7 in Zehnerschritten',fr:'De 10 en 10 à partir de 7',it:'Da 7, di 10 in 10',es:'Desde el 7, de 10 en 10',pt:'Do 7, de 10 em 10',nl:'Vanaf 7 met tienen',sv:'Tiohopp från 7',da:'Syv i tierspring',no:'Tierhopp fra 7',fi:'Seitsemästä kymmenittäin'},
    pG1d:         {en:'Crossing 100',de:'Über die 100',fr:'Franchir la centaine',it:'Oltre il 100',es:'Cruzando el 100',pt:'Cruzando o 100',nl:'Over de 100',sv:'Förbi 100',da:'Over 100',no:'Over 100',fi:'Sadan yli'},
    pG2a:         {en:'Quarters to 500',de:'In 25er-Schritten bis 500',fr:'De 25 en 25 jusqu’à 500',it:'Di 25 in 25 fino a 500',es:'De 25 en 25 hasta 500',pt:'De 25 em 25 até 500',nl:'Met 25 tot 500',sv:'25-hopp till 500',da:'25-spring til 500',no:'25-hopp til 500',fi:'25:n askelin 500:aan'},
    pG2b:         {en:'Across the centuries',de:'Über die Hunderter',fr:'D’une centaine à l’autre',it:'Scavalchiamo le centinaia',es:'Cruzando las centenas',pt:'Atravessando as centenas',nl:'Over de honderdtallen',sv:'Förbi hundratalen',da:'Over hundrederne',no:'Over hundrerne',fi:'Satojen yli'},
    pG2c:         {en:'Fall from 1000',de:'Von 1000 abwärts',fr:'Descendre depuis 1000',it:'Giù dal 1000',es:'Bajando desde el 1000',pt:'Descendo do 1000',nl:'Vanaf 1000 omlaag',sv:'Ner från 1000',da:'Ned fra 1000',no:'Ned fra 1000',fi:'Tuhannesta alaspäin'},
    showTeens:    {en:'The teen numbers',de:'Die Zahlen von 11 bis 20',fr:'Les nombres de 11 à 20',it:'I numeri da 11 a 20',es:'Los números del 11 al 20',pt:'Os números de 11 a 20',nl:'De getallen 11–20',sv:'Talen 11–20',da:'Tallene 11–20',no:'Tallene 11–20',fi:'Luvut 11–20'},
    showBoundary: {en:'The tricky stretch',de:'Die Zahlendreher-Strecke',fr:'Soixante-dix, quatre-vingt-dix…',it:'I numeri dispettosi',es:'El tramo difícil',pt:'O trecho difícil',nl:'Het lastige stukje',sv:'Den kluriga biten',da:'De drilske tal',no:'Den vriene biten',fi:'Pitkät lukusanat'},
    showTens:     {en:'By tens',de:'In Zehnerschritten',fr:'De 10 en 10',it:'Di 10 in 10',es:'De 10 en 10',pt:'De 10 em 10',nl:'Met tienen',sv:'Tiotal',da:'I tierspring',no:'Med tiere',fi:'Kymmenittäin'},
    saveCount:    {en:'Save this count',de:'Diese Zählung speichern',fr:'Enregistrer ce comptage',it:'Salva questo conteggio',es:'Guardar este conteo',pt:'Salvar esta contagem',nl:'Deze telling opslaan',sv:'Spara den här räkningen',da:'Gem tællingen',no:'Lagre tellingen',fi:'Tallenna lukujono'},
    savedList:    {en:'Saved counts',de:'Gespeicherte Zählungen',fr:'Comptages enregistrés',it:'Conteggi salvati',es:'Conteos guardados',pt:'Contagens salvas',nl:'Opgeslagen tellingen',sv:'Sparade räkningar',da:'Gemte tællinger',no:'Lagrede tellinger',fi:'Tallennetut lukujonot'},
    replaceAsk:   {en:'All 8 slots are full — replace the oldest?',de:'Alle 8 Plätze sind belegt — die älteste ersetzen?',fr:'Les 8 emplacements sont pleins — remplacer le plus ancien ?',it:'Tutti gli 8 posti sono pieni — sostituire il più vecchio?',es:'Los 8 espacios están llenos — ¿reemplazar el más antiguo?',pt:'Os 8 espaços já estão ocupados — substituir a contagem mais antiga?',nl:'Alle 8 plekken zijn vol — de oudste vervangen?',sv:'Alla 8 platserna är fulla — ersätta den äldsta?',da:'Alle 8 pladser er fulde — skal den ældste erstattes?',no:'Alle 8 plassene er fulle — erstatte den eldste?',fi:'Kaikki 8 paikkaa on täynnä — korvataanko vanhin?'},
    replaceYes:   {en:'Replace it',de:'Ersetzen',fr:'Remplacer',it:'Sostituisci',es:'Reemplazar',pt:'Substituir',nl:'Vervangen',sv:'Ersätt',da:'Erstat',no:'Erstatt',fi:'Korvaa'},
    replaceNo:    {en:'Keep them',de:'Behalten',fr:'Garder',it:'Tienili',es:'Conservar',pt:'Manter',nl:'Bewaren',sv:'Behåll',da:'Behold',no:'Behold',fi:'Säilytä'},
    deleteSave:   {en:'Delete this saved count',de:'Diese gespeicherte Zählung löschen',fr:'Supprimer ce comptage enregistré',it:'Elimina questo conteggio salvato',es:'Eliminar este conteo guardado',pt:'Excluir esta contagem salva',nl:'Deze opgeslagen telling verwijderen',sv:'Ta bort den sparade räkningen',da:'Slet den gemte tælling',no:'Slett den lagrede tellingen',fi:'Poista tallennettu lukujono'},
    setSpeak:     {en:'Speak each number',de:'Jede Zahl vorsprechen',fr:'Prononcer chaque nombre',it:'Pronuncia ogni numero',es:'Decir cada número',pt:'Falar cada número',nl:'Elk getal uitspreken',sv:'Läs upp varje tal',da:'Sig hvert tal højt',no:'Les opp hvert tall',fi:'Lue jokainen luku ääneen'},
    setCues:      {en:'Sound cues',de:'Signaltöne',fr:'Signaux sonores',it:'Segnali sonori',es:'Efectos de sonido',pt:'Sinais sonoros',nl:'Geluidssignalen',sv:'Ljudsignaler',da:'Lydsignaler',no:'Lydeffekter',fi:'Äänimerkit'},
    voiceMissing: {en:'No voice for this language is installed on this device.',de:'Auf diesem Gerät ist keine Stimme für diese Sprache installiert.',fr:'Aucune voix n’est installée pour cette langue sur cet appareil.',it:'Su questo dispositivo non è installata una voce per questa lingua.',es:'Este dispositivo no tiene instalada una voz para este idioma.',pt:'Este aparelho não tem uma voz instalada para este idioma.',nl:'Op dit apparaat is geen stem voor deze taal geïnstalleerd.',sv:'Det finns ingen röst för det här språket på den här enheten.',da:'Der er ingen stemme til dette sprog på denne enhed.',no:'Det er ikke installert noen stemme for dette språket på denne enheten.',fi:'Tässä laitteessa ei ole puheääntä tälle kielelle.'},
    gatePremium:  {en:'All skips and starts, counting down, the markers, column choices, and saved counts are part of Premium. Counting by 1s and 10s — with wonder marks and the spoken numbers — is always free.',de:'Alle Schrittweiten und Startzahlen, das Rückwärtszählen, die Stifte, die Spaltenwahl und gespeicherte Zählungen gehören zu Premium. Das Zählen in Einer- und Zehnerschritten — mit Fragezeichen-Feldern und vorgesprochenen Zahlen — bleibt immer kostenlos.',fr:'Tous les pas de comptage et tous les départs, le compte à rebours, les feutres, le choix des colonnes et les comptages enregistrés font partie de l’offre Premium. Compter de 1 en 1 et de 10 en 10 — avec les cases « ? » et les nombres dits à voix haute — reste toujours gratuit.',it:'Tutti i salti e i punti di partenza, il conto all’indietro, i pennarelli, la scelta delle colonne e i conteggi salvati fanno parte di Premium. Contare di 1 in 1 e di 10 in 10 — con le caselle «?» e i numeri pronunciati ad alta voce — resta sempre gratuito.',es:'Todos los saltos y números de inicio, la cuenta regresiva, los plumones, la elección de columnas y los conteos guardados forman parte de Premium. Contar de 1 en 1 y de 10 en 10 — con las casillas de «?» y los números en voz alta — es gratis para siempre.',pt:'Todos os passos e pontos de partida, a contagem regressiva, as canetinhas, a escolha de colunas e as contagens salvas fazem parte do Premium. Contar de 1 em 1 e de 10 em 10 — com as casinhas “?” e os números falados — é sempre gratuito.',nl:'Alle stappen en startgetallen, terugtellen, de stiften, de kolomkeuze en opgeslagen tellingen horen bij Premium. Tellen met 1 en met 10 — mét vraagteken-vakjes en uitgesproken getallen — blijft altijd gratis.',sv:'Alla hopp och starttal, baklängesräkning, pennorna, kolumnvalet och sparade räkningar ingår i Premium. Att räkna med 1 och 10 — med frågeteckensrutor och upplästa tal — är alltid gratis.',da:'Alle spring og starttal, baglæns tælling, tuscherne, kolonnevalget og gemte tællinger er en del af Premium. At tælle med 1 og 10 — med spørgsmålstegn og oplæste tal — er altid gratis.',no:'Alle steg og starttall, baklengs telling, tusjene, kolonnevalget og lagrede tellinger er en del av Premium. Å telle med 1 og 10 — med spørsmålstegnruter og oppleste tall — er alltid gratis.',fi:'Kaikki askeleet ja aloitusluvut, taaksepäin laskeminen, tussit, sarakevalinta ja tallennetut lukujonot kuuluvat Premiumiin. Ykkösin ja kymmenin laskeminen — kysymysmerkkiruutuineen ja ääneen luettuine lukuineen — on aina ilmaista.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås alt op',no:'Lås opp alt',fi:'Avaa kaikki'},
    numpadOk:     {en:'Done',de:'Fertig',fr:'Valider',it:'Fatto',es:'Listo',pt:'Pronto',nl:'Klaar',sv:'Klar',da:'Færdig',no:'Ferdig',fi:'Valmis'},
    inkedAria:    {en:'{n} is on the chart',de:'{n} steht auf dem Blatt',fr:'{n} est sur la feuille',it:'{n} è sul foglio',es:'El {n} ya está en la hoja',pt:'{n} está no quadro',nl:'{n} staat op het blad',sv:'{n} står på bladet',da:'{n} står på arket',no:'{n} står på arket',fi:'{n} on taululla'}
  },

  /* ==================== engine constants (gate-proven) ============== */

  MAX_N: 1000,
  MAX_ROWS: 12,
  COMFORT_ROWS: 8,
  COLS_ALLOWED: [3, 4, 5, 6, 8, 10],
  /* compound-number locales speak ≥100 at a slower rate — the morpheme
     boundaries (achthundertachtundachtzig) are the point */
  RATE_SLOW: { de: 1, nl: 1, fi: 1, sv: 1, da: 1, no: 1 },
  MARKS: ['#F2C879', '#9CC3E5', '#C9A8E0'],   /* honey / sky / plum — never verdict colors */

  /* the Franke/Kazemi planned counts — each preset is (start, step,
     cols, rows) AS A UNIT (the column count is the planning lever) */
  PRESETS: [
    { id: 'k1',  grade: 'k',  free: true,  labelKey: 'pK1',  start: 1,    step: 1,    cols: 10, rows: 3 },
    { id: 'k2',  grade: 'k',  free: false, labelKey: 'pK2',  start: 1,    step: 1,    cols: 5,  rows: 6 },
    { id: 'k3',  grade: 'k',  free: true,  labelKey: 'pK3',  start: 10,   step: 10,   cols: 5,  rows: 2 },
    { id: 'k4',  grade: 'k',  free: false, labelKey: 'pK4',  start: 20,   step: -1,   cols: 10, rows: 3 },
    { id: 'g1a', grade: 'g1', free: false, labelKey: 'pG1a', start: 2,    step: 2,    cols: 5,  rows: 6 },
    { id: 'g1b', grade: 'g1', free: false, labelKey: 'pG1b', start: 5,    step: 5,    cols: 6,  rows: 4 },
    { id: 'g1c', grade: 'g1', free: false, labelKey: 'pG1c', start: 7,    step: 10,   cols: 4,  rows: 3 },
    { id: 'g1d', grade: 'g1', free: false, labelKey: 'pG1d', start: 85,   step: 1,    cols: 10, rows: 4 },
    { id: 'g2a', grade: 'g2', free: false, labelKey: 'pG2a', start: 25,   step: 25,   cols: 4,  rows: 5 },
    { id: 'g2b', grade: 'g2', free: false, labelKey: 'pG2b', start: 460,  step: 10,   cols: 6,  rows: 4 },
    { id: 'g2c', grade: 'g2', free: false, labelKey: 'pG2c', start: 1000, step: -100, cols: 5,  rows: 3 }
  ],

  /* per-locale "listen closely" showcase counts — the inversion moat.
     One shared schema, locale-tuned ranges (de/nl unit-first 18–42,
     da vigesimal 40–65, fr 55–100 boundaries, fi long compounds slow).
     no is NOT an inversion locale (1951 reform) — default set. */
  SHOWCASE: {
    de: [ { key: 'showTeens', start: 11, step: 1, cols: 5, rows: 2 }, { key: 'showBoundary', start: 18, step: 1, cols: 5, rows: 5 }, { key: 'showTens', start: 10, step: 10, cols: 5, rows: 2 } ],
    nl: [ { key: 'showTeens', start: 11, step: 1, cols: 5, rows: 2 }, { key: 'showBoundary', start: 18, step: 1, cols: 5, rows: 5 }, { key: 'showTens', start: 10, step: 10, cols: 5, rows: 2 } ],
    da: [ { key: 'showTeens', start: 11, step: 1, cols: 5, rows: 2 }, { key: 'showBoundary', start: 40, step: 1, cols: 5, rows: 6 }, { key: 'showTens', start: 10, step: 10, cols: 5, rows: 2 } ],
    fr: [ { key: 'showTeens', start: 11, step: 1, cols: 5, rows: 2 }, { key: 'showBoundary', start: 55, step: 1, cols: 10, rows: 5 }, { key: 'showTens', start: 10, step: 10, cols: 5, rows: 2 } ],
    fi: [ { key: 'showTeens', start: 11, step: 1, cols: 5, rows: 2 }, { key: 'showBoundary', start: 110, step: 10, cols: 5, rows: 4 }, { key: 'showTens', start: 10, step: 10, cols: 5, rows: 2 } ],
    en: [ { key: 'showTeens', start: 11, step: 1, cols: 5, rows: 2 }, { key: 'showBoundary', start: 13, step: 1, cols: 10, rows: 3 }, { key: 'showTens', start: 10, step: 10, cols: 5, rows: 2 } ],
    default: [ { key: 'showTeens', start: 11, step: 1, cols: 5, rows: 2 }, { key: 'showBoundary', start: 15, step: 1, cols: 10, rows: 3 }, { key: 'showTens', start: 10, step: 10, cols: 5, rows: 2 } ]
  },

  defaults: { speakNumbers: false, soundCues: true },
  settings: [
    { key: 'speakNumbers', type: 'toggle', labelKey: 'setSpeak' },
    { key: 'soundCues', type: 'toggle', labelKey: 'setCues' }
  ],

  STORE_KEY: 'lcs:choral-counting:v1',
  ENT_TRUST_DAYS: 14,

  /* ======================= PURE counting engine ===================== */

  /* THE TERM IS DERIVED, NEVER STORED (skipcount-core discipline) */
  term: function (cfg, k) { return cfg.start + k * cfg.step; },

  /* how many terms the plan holds: rows×cols cells, clipped to 0..1000 */
  planLen: function (cfg) {
    var cells = cfg.rows * cfg.cols;
    var boundK;
    if (cfg.step > 0) boundK = Math.floor((this.MAX_N - cfg.start) / cfg.step);
    else boundK = Math.floor(cfg.start / (-cfg.step));   /* backwards includes and stops at 0 */
    return Math.max(0, Math.min(cells, boundK + 1));
  },

  /* cell ↔ index bijection, BOTH recording directions */
  cellRC: function (cfg, k) {
    if (cfg.down) return { row: k % cfg.rows, col: Math.floor(k / cfg.rows) };
    return { row: Math.floor(k / cfg.cols), col: k % cfg.cols };
  },
  kFromRC: function (cfg, row, col) {
    return cfg.down ? col * cfg.rows + row : row * cfg.cols + col;
  },

  /* default row count for a custom (start, step, cols): comfort 8, never
     beyond the 0..1000 bound, hard cap 12, at least 1 */
  rowsForCustom: function (start, step, cols) {
    var boundK = step > 0 ? Math.floor((this.MAX_N - start) / step) : Math.floor(start / (-step));
    var need = Math.ceil((boundK + 1) / cols);
    return Math.max(1, Math.min(this.MAX_ROWS, Math.min(this.COMFORT_ROWS, need)));
  },

  /* the FREE fence: by 1s/10s, forward, start 0/1/10, 10 columns, row-wise */
  isFreeCfg: function (cfg) {
    return (cfg.step === 1 || cfg.step === 10) &&
      (cfg.start === 0 || cfg.start === 1 || cfg.start === 10) &&
      cfg.cols === 10 && !cfg.down;
  },

  /* spoken rate: 0.92 base; 0.85 for ≥100 in compound-number locales */
  speakRate: function (n, lang) {
    return (n >= 100 && this.RATE_SLOW[lang]) ? 0.85 : 0.92;
  },
  /* the spoken text is ALWAYS the bare numeral — no separators, ever */
  speakText: function (n) { return String(n); },

  /* persisted hand-jitter: deterministic per cell index (stable across
     re-renders — what sells hand-inked) */
  jitterDeg: function (k) { return (((k * 7919) % 9) - 4) * 0.5; },

  showcaseFor: function (lang) { return this.SHOWCASE[lang] || this.SHOWCASE.default; },

  /* ============================ mount =============================== */

  premium: false,

  init: function (api) {
    this.api = api;
    injectChoralCSS();

    this.cfg = { start: 1, step: 1, cols: 10, rows: 3, down: false };
    this.inked = 0;
    this.marks = {};        /* cellIndex -> markerIdx */
    this.lineMarks = {};    /* 'c3' / 'r1' -> markerIdx */
    this.wonders = {};      /* cellIndex -> true */
    this.armed = null;      /* null | 0|1|2 | 'erase' */
    this.tint = null;       /* null | 'ones' | 'tens' */
    this.confirmOpen = false;
    this.moreSkips = false;
    this.presetsOpen = false;
    this.gateOpen = false;
    this.replaceAsk = false;
    this._numpad = null;    /* null | {field:'start'|'step', val:''} */
    this._justInked = -1;
    this._actx = null;
    this._voiceState = null;

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, settings: null, counts: [] };
    if (!this._store.counts) this._store.counts = [];
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    /* free-legal deep links apply immediately; premium ones wait for
       entitlement (applyDeepLink runs on BOTH resolution paths) */
    this._applyParams(false);

    this.render();
    this._fetchEntitlement();

    var self = this;
    document.addEventListener('keydown', function (e) {
      if (self._numpad) return;
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowRight') {
        var tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return;
        e.preventDefault();
        self.next();
      }
    });
    window.addEventListener('resize', function () { self._fitFont(); });
  },

  _applyParams: function (premiumPass) {
    var p = new URLSearchParams(location.search);
    var start = parseInt(p.get('start'), 10);
    var step = parseInt(p.get('skip'), 10);
    var cols = parseInt(p.get('cols'), 10);
    var down = p.get('down') === '1';
    if (isNaN(start) && isNaN(step) && isNaN(cols) && !down) return;
    var cfg = {
      start: isNaN(start) ? 1 : Math.max(0, Math.min(this.MAX_N, start)),
      step: isNaN(step) ? 1 : Math.max(1, Math.min(100, Math.abs(step))),
      cols: (this.COLS_ALLOWED.indexOf(cols) >= 0) ? cols : 10,
      down: false
    };
    if (down) cfg.step = -cfg.step;
    if (p.get('colwise') === '1') cfg.down = true;
    cfg.rows = this.rowsForCustom(cfg.start, cfg.step, cfg.cols);
    if (this.isFreeCfg(cfg) || (premiumPass && this.premium)) {
      if (this.inked === 0) this.cfg = cfg;
    }
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) st.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },
  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var applyDeepLink = function () { self._applyParams(true); };
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; applyDeepLink(); if (self._wrap) self.render(); }
      }
    };
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    if (!token) return;
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { trustCache(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        if (self._wrap) { applyDeepLink(); self.render(); }
      })
      .catch(function () { trustCache(); });
  },

  /* ==================== helpers + speech + sfx ====================== */

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },

  /* voice guard: only block when the voice list is NON-EMPTY and lacks
     the language (an empty list means "not loaded yet" — let TTS try) */
  _voiceOk: function () {
    if (this._voiceState !== null) return this._voiceState;
    var ok = true;
    try {
      if (!window.speechSynthesis) ok = false;
      else {
        var voices = window.speechSynthesis.getVoices() || [];
        if (voices.length > 0) {
          var want = ({ no: 'nb', pt: 'pt' }[this.api.lang] || this.api.lang).toLowerCase();
          ok = voices.some(function (v) { return (v.lang || '').toLowerCase().indexOf(want) === 0; });
          /* nb fallback also accepts 'no-' prefixed voices */
          if (!ok && this.api.lang === 'no') ok = voices.some(function (v) { return (v.lang || '').toLowerCase().indexOf('no') === 0; });
        }
      }
    } catch (_) { ok = true; }
    this._voiceState = ok;
    return ok;
  },
  _speakNum: function (n) {
    this.api.announce(this.fmt('inkedAria', { n: n }));
    if (!this.api.settings.speakNumbers) return;
    if (!this._voiceOk()) return;
    try { LCSAudio.speak({ type: 'number', text: this.speakText(n), lang: this.api.lang, rate: this.speakRate(n, this.api.lang) }); } catch (_) {}
  },

  _ctx: function () {
    if (this._actx === null) {
      try { var AC = window.AudioContext || window.webkitAudioContext; this._actx = AC ? new AC() : false; } catch (_) { this._actx = false; }
    }
    if (this._actx && this._actx.state === 'suspended') { try { this._actx.resume(); } catch (_) {} }
    return this._actx;
  },
  _note: function (freq, at, dur, peak) {
    if (!this.api.settings.soundCues) return;
    var ctx = this._ctx();
    if (!ctx) return;
    var t = ctx.currentTime + (at || 0);
    var osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak || 0.10, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.18));
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + (dur || 0.18) + 0.05);
  },
  /* soft ink tick, pitched gently upward across the row */
  _sfxInk: function (col) { this._note(460 + col * 36, 0, 0.07, 0.08); },
  _sfxBack: function () { this._note(320, 0, 0.09, 0.05); },
  _sfxWonder: function () { this._note(987.77, 0, 0.10, 0.08); this._note(1318.5, 0.08, 0.16, 0.07); },

  /* ========================= count actions ========================== */

  next: function () {
    var plan = this.planLen(this.cfg);
    if (this.inked >= plan) return;
    var k = this.inked;
    var n = this.term(this.cfg, k);
    var hadWonder = !!this.wonders[k];
    delete this.wonders[k];
    this.inked = k + 1;
    this._justInked = k;
    var rc = this.cellRC(this.cfg, k);
    this._sfxInk(rc.col);
    if (hadWonder) this._sfxWonder();
    this._speakNum(n);
    this.render();
  },
  backOne: function () {
    if (this.inked === 0) return;
    this.inked--;
    delete this.marks[this.inked];   /* a mark on an empty cell would dangle */
    this._justInked = -1;
    this._sfxBack();
    this.render();
  },
  _resetCount: function (cfg) {
    this.cfg = cfg;
    this.inked = 0;
    this.marks = {};
    this.lineMarks = {};
    this.wonders = {};
    this.tint = null;
    this.armed = null;
    this.confirmOpen = false;
    this.presetsOpen = false;
    this._justInked = -1;
  },

  cellTap: function (k) {
    var plan = this.planLen(this.cfg);
    if (k >= plan) return;
    if (k < this.inked) {
      /* FILLED cell: apply the armed marker (premium) */
      if (!this.premium) return;
      if (this.armed === null) return;
      if (this.armed === 'erase') { delete this.marks[k]; }
      else if (this.marks[k] === this.armed) delete this.marks[k];
      else this.marks[k] = this.armed;
      this.render();
    } else {
      /* EMPTY planned cell: wonder-mark toggle (free — core practice) */
      if (this.wonders[k]) delete this.wonders[k];
      else { this.wonders[k] = true; this._note(659.25, 0, 0.07, 0.05); }
      this.render();
    }
  },
  headerTap: function (kind, idx) {
    if (!this.premium || this.armed === null) return;
    var key = kind + idx;
    if (this.armed === 'erase') { delete this.lineMarks[key]; }
    else if (this.lineMarks[key] === this.armed) delete this.lineMarks[key];
    else this.lineMarks[key] = this.armed;
    this.render();
  },
  clearAllMarks: function () {
    this.marks = {};
    this.lineMarks = {};
    this.tint = null;
    this.render();
  },

  /* ========================= saved counts =========================== */

  _saveName: function (s) {
    var dir = s.cfg.step < 0 ? '−' : '+';
    var wd = '';
    try {
      var locMap = { en: 'en', de: 'de', fr: 'fr', it: 'it', es: 'es', pt: 'pt-BR', nl: 'nl', sv: 'sv', da: 'da', no: 'nb', fi: 'fi' };
      wd = new Date(s.ts).toLocaleDateString(locMap[this.api.lang] || 'en', { weekday: 'short' });
    } catch (_) {}
    return s.cfg.start + ' · ' + dir + Math.abs(s.cfg.step) + (wd ? ' · ' + wd : '');
  },
  saveCurrent: function () {
    if (!this.premium) return;
    if (this._store.counts.length >= 8) { this.replaceAsk = true; this.render(); return; }
    this._pushSave();
  },
  _pushSave: function () {
    this._store.counts.push({
      cfg: { start: this.cfg.start, step: this.cfg.step, cols: this.cfg.cols, rows: this.cfg.rows, down: !!this.cfg.down },
      inked: this.inked,
      marks: this.marks,
      lineMarks: this.lineMarks,
      wonders: this.wonders,
      ts: Date.now()
    });
    this._saveStore();
    this.replaceAsk = false;
    this.render();
  },
  resumeSave: function (i) {
    var s = this._store.counts[i];
    if (!s || !this.premium) return;
    this.cfg = { start: s.cfg.start, step: s.cfg.step, cols: s.cfg.cols, rows: s.cfg.rows, down: !!s.cfg.down };
    this.inked = Math.min(s.inked, this.planLen(this.cfg));
    this.marks = s.marks || {};
    this.lineMarks = s.lineMarks || {};
    this.wonders = s.wonders || {};
    this.tint = null;
    this.armed = null;
    this.confirmOpen = false;
    this.presetsOpen = false;
    this._justInked = this.inked - 1;   /* halo re-orients the class */
    this.render();
  },
  deleteSave: function (i) {
    this._store.counts.splice(i, 1);
    this._saveStore();
    this.render();
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    document.body.classList.add('cc-wide');
    var wrap = api.el('div', 'cc-wrap');
    api.stage.appendChild(wrap);
    this._wrap = wrap;

    wrap.appendChild(this.inked === 0 && !this.confirmOpen ? this._pickerRow() : this._summaryRow());
    wrap.appendChild(this._chart());

    var plan = this.planLen(this.cfg);
    if (this.inked >= plan && plan > 0) {
      var done = api.el('div', 'cc-done');
      done.innerHTML = '<span class="cc-done-line">' + this.fmt('doneLine', { a: this.term(this.cfg, 0), b: this.term(this.cfg, plan - 1) }) + '</span>' +
        '<span class="cc-done-notice">' + api.t('noticePrompt') + '</span>';
      wrap.appendChild(done);
    }

    wrap.appendChild(this._rail());
    if (this.gateOpen) wrap.appendChild(this._gatePanel());
    wrap.appendChild(this._shelf());
    if (this._numpad) wrap.appendChild(this._numpadOverlay());

    this._fitFont();
    var ji = this._justInked;
    this._justInked = -1;   /* pop animates once */
    if (ji >= 0) { /* class applied during _chart() */ }
  },

  /* ------- picker row (before the first ink) ------- */
  _pickerRow: function () {
    var api = this.api, self = this;
    var row = api.el('div', 'cc-pickers');

    /* start */
    var g1 = api.el('div', 'cc-pick');
    g1.innerHTML = '<span class="cc-pick-label">' + api.t('startLabel') + '</span>';
    var stepr = api.el('div', 'cc-stepper');
    var minus = this._chipBtn('−', 'cc-step-btn', function () { self._bumpStart(-1); });
    var val = api.el('button', 'cc-step-val');
    val.type = 'button';
    val.textContent = String(this.cfg.start);
    val.addEventListener('click', function () {
      if (!self.premium) { self._gate(); return; }
      self._numpad = { field: 'start', val: '' };
      self.render();
    });
    var plus = this._chipBtn('+', 'cc-step-btn', function () { self._bumpStart(1); });
    stepr.append(minus, val, plus);
    g1.appendChild(stepr);
    row.appendChild(g1);

    /* skip */
    var g2 = api.el('div', 'cc-pick');
    g2.innerHTML = '<span class="cc-pick-label">' + api.t('skipLabel') + '</span>';
    var chips = api.el('div', 'cc-chiprow');
    var skips = this.moreSkips ? [1, 2, 3, 4, 5, 10, 25, 100] : [1, 2, 5, 10];
    var absStep = Math.abs(this.cfg.step);
    skips.forEach(function (s) {
      var free = (s === 1 || s === 10);
      var c = self._chipBtn('+' + s, 'cc-chip' + (absStep === s ? ' cc-on' : '') + (!free && !self.premium ? ' cc-locked' : ''), function () {
        if (!free && !self.premium) { self._gate(); return; }
        self._setCfg({ step: self.cfg.step < 0 ? -s : s });
      });
      chips.appendChild(c);
    });
    if (!this.moreSkips) {
      chips.appendChild(this._chipBtn(api.t('moreChip'), 'cc-chip', function () {
        if (!self.premium) { self._gate(); return; }
        self.moreSkips = true; self.render();
      }));
    }
    g2.appendChild(chips);
    row.appendChild(g2);

    /* direction + colwise */
    var g3 = api.el('div', 'cc-pick');
    var toggles = api.el('div', 'cc-chiprow');
    toggles.appendChild(this._chipBtn('↓ ' + api.t('downChip'), 'cc-chip' + (this.cfg.step < 0 ? ' cc-on' : '') + (!this.premium ? ' cc-locked' : ''), function () {
      if (!self.premium) { self._gate(); return; }
      self._setCfg({ step: -self.cfg.step });
    }));
    toggles.appendChild(this._chipBtn('⇊ ' + api.t('colwiseChip'), 'cc-chip' + (this.cfg.down ? ' cc-on' : '') + (!this.premium ? ' cc-locked' : ''), function () {
      if (!self.premium) { self._gate(); return; }
      self._setCfg({ down: !self.cfg.down });
    }));
    g3.appendChild(toggles);
    row.appendChild(g3);

    /* columns */
    var g4 = api.el('div', 'cc-pick');
    g4.innerHTML = '<span class="cc-pick-label">' + api.t('colsLabel') + '</span>';
    var cchips = api.el('div', 'cc-chiprow');
    this.COLS_ALLOWED.forEach(function (c) {
      var free = c === 10;
      cchips.appendChild(self._chipBtn(String(c), 'cc-chip' + (self.cfg.cols === c ? ' cc-on' : '') + (!free && !self.premium ? ' cc-locked' : ''), function () {
        if (!free && !self.premium) { self._gate(); return; }
        self._setCfg({ cols: c });
      }));
    });
    g4.appendChild(cchips);
    row.appendChild(g4);

    return row;
  },
  _bumpStart: function (d) {
    var self = this;
    if (!this.premium) {
      /* the free start cycle: 0 → 1 → 10 */
      var cyc = [0, 1, 10];
      var i = cyc.indexOf(this.cfg.start);
      if (i < 0) i = 1;
      this._setCfg({ start: cyc[(i + (d > 0 ? 1 : cyc.length - 1)) % cyc.length] });
      return;
    }
    var s = Math.max(0, Math.min(this.MAX_N, this.cfg.start + d * Math.max(1, Math.abs(this.cfg.step))));
    this._setCfg({ start: s });
  },
  _setCfg: function (patch) {
    var c = this.cfg;
    var next = {
      start: 'start' in patch ? patch.start : c.start,
      step: 'step' in patch ? patch.step : c.step,
      cols: 'cols' in patch ? patch.cols : c.cols,
      down: 'down' in patch ? patch.down : c.down
    };
    /* backwards from a start of 0 has nowhere to go — lift the start */
    if (next.step < 0 && next.start === 0) next.start = Math.abs(next.step) * 10 <= this.MAX_N ? Math.abs(next.step) * 10 : this.MAX_N;
    next.rows = this.rowsForCustom(next.start, next.step, next.cols);
    this._resetCount(next);
    this.render();
  },

  /* ------- summary pill (mid-count) ------- */
  _summaryRow: function () {
    var api = this.api, self = this;
    var row = api.el('div', 'cc-summary');
    if (!this.confirmOpen) {
      var pill = api.el('button', 'cc-sum-pill');
      pill.type = 'button';
      pill.textContent = this.fmt('summaryPill', {
        start: this.cfg.start,
        dir: this.cfg.step < 0 ? '−' : '+',
        step: Math.abs(this.cfg.step),
        cols: this.cfg.cols
      });
      pill.addEventListener('click', function () { self.confirmOpen = true; self.render(); });
      row.appendChild(pill);
    } else {
      var ask = api.el('div', 'cc-confirm');
      ask.innerHTML = '<span>' + api.t('newCountAsk') + '</span>';
      var yes = this._chipBtn(api.t('newCountYes'), 'cc-chip cc-on', function () {
        self._resetCount({ start: self.cfg.start, step: self.cfg.step, cols: self.cfg.cols, rows: self.cfg.rows, down: self.cfg.down });
        self.render();
      });
      var no = this._chipBtn(api.t('newCountNo'), 'cc-chip', function () { self.confirmOpen = false; self.render(); });
      ask.append(yes, no);
      row.appendChild(ask);
    }
    return row;
  },

  /* ------- the chart ------- */
  _chart: function () {
    var api = this.api, self = this;
    var plan = this.planLen(this.cfg);
    var host = api.el('div', 'cc-charthost');
    var grid = api.el('div', 'cc-grid' + (this.tint === 'ones' ? ' cc-tint-ones' : this.tint === 'tens' ? ' cc-tint-tens' : ''));
    grid.style.setProperty('--cc-cols', this.cfg.cols);
    this._gridEl = grid;

    /* header tap zones (premium — whole-line washes) */
    if (this.premium) {
      var corner = api.el('div', 'cc-h cc-h-corner');
      grid.appendChild(corner);
      for (var hc = 0; hc < this.cfg.cols; hc++) {
        (function (col) {
          var h = api.el('button', 'cc-h cc-h-col' + (self.lineMarks['c' + col] !== undefined ? ' cc-hmk' : ''));
          h.type = 'button';
          if (self.lineMarks['c' + col] !== undefined) h.style.background = self.MARKS[self.lineMarks['c' + col]];
          h.addEventListener('click', function () { self.headerTap('c', col); });
          grid.appendChild(h);
        }(hc));
      }
    }

    for (var r = 0; r < this.cfg.rows; r++) {
      if (this.premium) {
        (function (rowI) {
          var h = api.el('button', 'cc-h cc-h-row' + (self.lineMarks['r' + rowI] !== undefined ? ' cc-hmk' : ''));
          h.type = 'button';
          if (self.lineMarks['r' + rowI] !== undefined) h.style.background = self.MARKS[self.lineMarks['r' + rowI]];
          h.addEventListener('click', function () { self.headerTap('r', rowI); });
          grid.appendChild(h);
        }(r));
      }
      for (var c = 0; c < this.cfg.cols; c++) {
        var k = this.kFromRC(this.cfg, r, c);
        grid.appendChild(this._cell(k, plan));
      }
    }
    host.appendChild(grid);
    return host;
  },
  _cell: function (k, plan) {
    var api = this.api, self = this;
    var cls = 'cc-cell';
    var inert = k >= plan;
    if (inert) cls += ' cc-inert';
    var filled = !inert && k < this.inked;
    var cell = api.el('button', cls);
    cell.type = 'button';
    if (inert) { cell.disabled = true; cell.tabIndex = -1; cell.setAttribute('aria-hidden', 'true'); return cell; }

    var rc = this.cellRC(this.cfg, k);
    /* line wash under any cell-level mark */
    var lm = this.lineMarks['c' + rc.col] !== undefined ? this.lineMarks['c' + rc.col]
           : this.lineMarks['r' + rc.row] !== undefined ? this.lineMarks['r' + rc.row] : undefined;
    if (lm !== undefined) cell.style.background = this._wash(this.MARKS[lm]);
    if (this.marks[k] !== undefined) {
      cell.style.background = this._wash(this.MARKS[this.marks[k]]);
      cell.style.boxShadow = 'inset 0 0 0 3px ' + this.MARKS[this.marks[k]];
    }

    if (filled) {
      var n = this.term(this.cfg, k);
      var pop = k === this._justInked;
      var halo = k === this.inked - 1;
      cell.className += (pop ? ' cc-pop' : '') + (halo ? ' cc-halo' : '') + (String(n).length >= 4 ? ' cc-d4' : String(n).length >= 3 ? ' cc-d3' : '');
      cell.style.setProperty('--cc-rot', this.jitterDeg(k) + 'deg');
      cell.innerHTML = this._digitSpans(n);
      cell.setAttribute('aria-label', this.fmt('inkedAria', { n: n }));
      cell.addEventListener('click', function () { self.cellTap(k); });
      if (pop && halo && this.wondersResolved === k) { /* sparkle handled via cc-spark class below */ }
    } else {
      if (this.wonders[k]) {
        cell.className += ' cc-wonder';
        cell.innerHTML = '<span class="cc-q">?</span>';
      }
      cell.setAttribute('aria-label', api.t('wonderAria'));
      cell.addEventListener('click', function () { self.cellTap(k); });
    }
    return cell;
  },
  _digitSpans: function (n) {
    var s = String(n), out = '', len = s.length;
    for (var i = 0; i < len; i++) {
      var place = len - 1 - i;   /* 0 = ones, 1 = tens, 2+ = higher */
      var cls = place === 0 ? 'cc-dg cc-dg-ones' : place === 1 ? 'cc-dg cc-dg-tens' : 'cc-dg';
      out += '<span class="' + cls + '">' + s.charAt(i) + '</span>';
    }
    return out;
  },
  _wash: function (hex) {
    /* a light wash of the marker color (the ink stays readable) */
    return hex + '55';
  },

  /* ------- the rail (the entire control surface) ------- */
  _rail: function () {
    var api = this.api, self = this;
    var rail = api.el('div', 'cc-rail');

    /* marker palette (premium; dimmed + lock for free — discoverable) */
    var pal = api.el('div', 'cc-palette' + (this.premium ? '' : ' cc-pal-locked'));
    this.MARKS.forEach(function (hex, i) {
      var b = api.el('button', 'cc-swatch' + (self.armed === i ? ' cc-armed' : ''));
      b.type = 'button';
      b.style.background = hex;
      b.setAttribute('aria-label', self.fmt('markerAria', { n: i + 1 }));
      b.addEventListener('click', function () {
        if (!self.premium) { self._gate(); return; }
        self.armed = self.armed === i ? null : i;
        self.render();
      });
      pal.appendChild(b);
    });
    var er = api.el('button', 'cc-swatch cc-eraser' + (this.armed === 'erase' ? ' cc-armed' : ''));
    er.type = 'button';
    er.setAttribute('aria-label', api.t('eraserAria'));
    er.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 20h10"/><path d="M5 15l8-8 5 5-6.5 6.5a2 2 0 0 1-2.8 0L5 15z"/></svg>';
    er.addEventListener('click', function () {
      if (!self.premium) { self._gate(); return; }
      self.armed = self.armed === 'erase' ? null : 'erase';
      self.render();
    });
    pal.appendChild(er);
    if (!this.premium) {
      var lk = api.el('span', 'cc-pal-lock');
      lk.textContent = '🔒';
      pal.appendChild(lk);
    }
    rail.appendChild(pal);

    /* tint chips (premium) */
    var tints = api.el('div', 'cc-tints');
    tints.appendChild(this._chipBtn(api.t('tintOnes'), 'cc-chip cc-chip-sm' + (this.tint === 'ones' ? ' cc-on' : '') + (!this.premium ? ' cc-locked' : ''), function () {
      if (!self.premium) { self._gate(); return; }
      self.tint = self.tint === 'ones' ? null : 'ones';
      self.render();
    }));
    tints.appendChild(this._chipBtn(api.t('tintTens'), 'cc-chip cc-chip-sm' + (this.tint === 'tens' ? ' cc-on' : '') + (!this.premium ? ' cc-locked' : ''), function () {
      if (!self.premium) { self._gate(); return; }
      self.tint = self.tint === 'tens' ? null : 'tens';
      self.render();
    }));
    tints.appendChild(this._chipBtn(api.t('clearMarks'), 'cc-chip cc-chip-sm' + (!this.premium ? ' cc-locked' : ''), function () {
      if (!self.premium) { self._gate(); return; }
      self.clearAllMarks();
    }));
    rail.appendChild(tints);

    var spacer = api.el('div', 'cc-rail-spacer');
    rail.appendChild(spacer);

    /* voice-missing hint (only when speech is ON but no voice exists) */
    if (this.api.settings.speakNumbers && !this._voiceOk()) {
      var vm = api.el('span', 'cc-voicemiss');
      vm.title = api.t('voiceMissing');
      vm.setAttribute('aria-label', api.t('voiceMissing'));
      vm.textContent = '🔇';
      rail.appendChild(vm);
    }

    /* back + NEXT travel together, right-anchored (never split by wrap) */
    var go = api.el('div', 'cc-go');
    var back = api.el('button', 'cc-back');
    back.type = 'button';
    back.setAttribute('aria-label', api.t('backOne'));
    back.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>';
    back.disabled = this.inked === 0;
    back.addEventListener('click', function () { self.backOne(); });
    go.appendChild(back);

    /* NEXT — the counting verb */
    var next = api.el('button', 'cc-next');
    next.type = 'button';
    next.textContent = api.t('next');
    next.disabled = this.inked >= this.planLen(this.cfg);
    next.addEventListener('click', function () { self.next(); });
    go.appendChild(next);
    rail.appendChild(go);

    return rail;
  },

  /* ------- the shelf below (presets + saves) ------- */
  _shelf: function () {
    var api = this.api, self = this;
    var shelf = api.el('div', 'cc-shelf');

    var head = this._chipBtn(api.t('presetsTitle') + (this.presetsOpen ? ' ▴' : ' ▾'), 'cc-chip cc-shelf-head', function () {
      self.presetsOpen = !self.presetsOpen;
      self.render();
    });
    shelf.appendChild(head);

    if (this.presetsOpen) {
      var groups = [
        { key: 'gradeK', ids: ['k1', 'k2', 'k3', 'k4'] },
        { key: 'grade1', ids: ['g1a', 'g1b', 'g1c', 'g1d'] },
        { key: 'grade2', ids: ['g2a', 'g2b', 'g2c'] }
      ];
      groups.forEach(function (g) {
        var gl = api.el('div', 'cc-pgroup');
        gl.innerHTML = '<span class="cc-pgroup-label">' + api.t(g.key) + '</span>';
        var rowEl = api.el('div', 'cc-chiprow');
        g.ids.forEach(function (id) {
          var p = null;
          for (var i = 0; i < self.PRESETS.length; i++) if (self.PRESETS[i].id === id) p = self.PRESETS[i];
          if (!p) return;
          rowEl.appendChild(self._chipBtn(api.t(p.labelKey), 'cc-chip' + (!p.free && !self.premium ? ' cc-locked' : ''), function () {
            if (!p.free && !self.premium) { self._gate(); return; }
            self._resetCount({ start: p.start, step: p.step, cols: p.cols, rows: p.rows, down: false });
            self.render();
          }));
        });
        gl.appendChild(rowEl);
        shelf.appendChild(gl);
      });
      /* the per-locale "listen closely" showcase */
      var sc = this.showcaseFor(api.lang);
      var sl = api.el('div', 'cc-pgroup');
      sl.innerHTML = '<span class="cc-pgroup-label">' + api.t('gradeListen') + '</span>';
      var srow = api.el('div', 'cc-chiprow');
      sc.forEach(function (s) {
        srow.appendChild(self._chipBtn(api.t(s.key), 'cc-chip' + (!self.premium ? ' cc-locked' : ''), function () {
          if (!self.premium) { self._gate(); return; }
          self._resetCount({ start: s.start, step: s.step, cols: s.cols, rows: s.rows, down: false });
          self.render();
        }));
      });
      sl.appendChild(srow);
      shelf.appendChild(sl);
    }

    /* saves row */
    var saves = api.el('div', 'cc-saves');
    var saveBtn = this._chipBtn(api.t('saveCount'), 'cc-chip' + (!this.premium ? ' cc-locked' : ''), function () {
      if (!self.premium) { self._gate(); return; }
      self.saveCurrent();
    });
    saves.appendChild(saveBtn);
    if (this.replaceAsk) {
      var ra = api.el('div', 'cc-confirm');
      ra.innerHTML = '<span>' + api.t('replaceAsk') + '</span>';
      ra.append(
        this._chipBtn(api.t('replaceYes'), 'cc-chip cc-on', function () { self._store.counts.shift(); self._pushSave(); }),
        this._chipBtn(api.t('replaceNo'), 'cc-chip', function () { self.replaceAsk = false; self.render(); })
      );
      saves.appendChild(ra);
    }
    if (this.premium && this._store.counts.length) {
      var list = api.el('div', 'cc-savelist');
      list.setAttribute('aria-label', api.t('savedList'));
      this._store.counts.forEach(function (s, i) {
        var card = api.el('div', 'cc-savecard');
        var open = api.el('button', 'cc-saveopen');
        open.type = 'button';
        open.appendChild(self._thumb(s));
        var nm = api.el('span', 'cc-savename');
        nm.textContent = self._saveName(s);
        open.appendChild(nm);
        open.addEventListener('click', function () { self.resumeSave(i); });
        var del = api.el('button', 'cc-savedel');
        del.type = 'button';
        del.setAttribute('aria-label', api.t('deleteSave'));
        del.textContent = '×';
        del.addEventListener('click', function () { self.deleteSave(i); });
        card.append(open, del);
        list.appendChild(card);
      });
      saves.appendChild(list);
    }
    shelf.appendChild(saves);
    return shelf;
  },
  _thumb: function (s) {
    var api = this.api, self = this;
    var t = api.el('span', 'cc-thumb');
    t.style.setProperty('--cc-tcols', s.cfg.cols);
    var cfg = s.cfg;
    var plan = this.planLen(cfg);
    var cap = Math.min(cfg.rows * cfg.cols, 60);
    for (var i = 0; i < cap; i++) {
      var rc = cfg.down ? { row: i % cfg.rows, col: Math.floor(i / cfg.rows) } : { row: Math.floor(i / cfg.cols), col: i % cfg.cols };
      /* thumbnail paints ROW-MAJOR display order; look up the k at (row,col) */
      var dispRow = Math.floor(i / cfg.cols), dispCol = i % cfg.cols;
      var k = cfg.down ? dispCol * cfg.rows + dispRow : dispRow * cfg.cols + dispCol;
      var d = api.el('span', 'cc-tc');
      if (k < plan && k < s.inked) {
        d.style.background = (s.marks && s.marks[k] !== undefined) ? this.MARKS[s.marks[k]] : '#146B5E';
      } else if (k < plan && s.wonders && s.wonders[k]) {
        d.style.background = '#F2C879';
      }
      t.appendChild(d);
    }
    return t;
  },

  /* ------- gate + numpad ------- */
  _gate: function () { this.gateOpen = true; this.render(); },
  _gatePanel: function () {
    var api = this.api, self = this;
    var g = api.el('div', 'cc-gate');
    var p = api.el('p', 'cc-gate-text');
    p.textContent = api.t('gatePremium');
    var a = api.el('a', 'cc-gate-link');
    a.href = '/' + api.lang + '/pricing?from=tool-choral-counting';
    a.target = '_top';
    a.textContent = api.t('unlock');
    var x = api.el('button', 'cc-gate-close');
    x.type = 'button';
    x.textContent = '×';
    x.setAttribute('aria-label', 'close');
    x.addEventListener('click', function () { self.gateOpen = false; self.render(); });
    g.append(x, p, a);
    return g;
  },
  _numpadOverlay: function () {
    var api = this.api, self = this;
    var ov = api.el('div', 'cc-numpad-scrim');
    var pad = api.el('div', 'cc-numpad');
    var disp = api.el('div', 'cc-np-disp');
    disp.textContent = this._numpad.val || '0';
    pad.appendChild(disp);
    var keys = api.el('div', 'cc-np-keys');
    [1, 2, 3, 4, 5, 6, 7, 8, 9, '⌫', 0, 'ok'].forEach(function (kk) {
      var b = api.el('button', 'cc-np-key' + (kk === 'ok' ? ' cc-np-ok' : ''));
      b.type = 'button';
      b.textContent = kk === 'ok' ? api.t('numpadOk') : String(kk);
      b.addEventListener('click', function () {
        if (kk === '⌫') { self._numpad.val = self._numpad.val.slice(0, -1); disp.textContent = self._numpad.val || '0'; return; }
        if (kk === 'ok') {
          var v = parseInt(self._numpad.val || '0', 10);
          var field = self._numpad.field;
          self._numpad = null;
          if (field === 'start') self._setCfg({ start: Math.max(0, Math.min(self.MAX_N, v)) });
          else self._setCfg({ step: (self.cfg.step < 0 ? -1 : 1) * Math.max(1, Math.min(100, v)) });
          return;
        }
        if (self._numpad.val.length < 4) { self._numpad.val += String(kk); disp.textContent = self._numpad.val; }
      });
      keys.appendChild(b);
    });
    pad.appendChild(keys);
    ov.appendChild(pad);
    ov.addEventListener('click', function (e) { if (e.target === ov) { self._numpad = null; self.render(); } });
    return ov;
  },

  _chipBtn: function (label, cls, fn) {
    var b = this.api.el('button', cls);
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  },

  /* fluid ink size: measure one cell, set the font var */
  _fitFont: function () {
    if (!this._gridEl) return;
    var cell = this._gridEl.querySelector('.cc-cell');
    if (!cell) return;
    var w = cell.offsetWidth || 40;
    this._gridEl.style.setProperty('--cc-cell', w + 'px');
  },

  reset: function () {
    this._resetCount({ start: this.cfg.start, step: this.cfg.step, cols: this.cfg.cols, rows: this.cfg.rows, down: this.cfg.down });
    this.render();
  },
  onSettings: function () { this._voiceState = null; this._saveStore(); this.render(); }
};

/* ========================== styles ================================== */
function injectChoralCSS() {
  if (document.getElementById('cc-style')) return;
  var st = document.createElement('style');
  st.id = 'cc-style';
  st.textContent = ''
    + '.cc-wrap{display:flex;flex-direction:column;gap:12px;max-width:920px;margin:0 auto;padding:4px 2px 10px;}'

    /* pickers */
    + '.cc-pickers{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:flex-end;background:#fff;border-radius:16px;padding:10px 14px;box-shadow:0 1px 4px rgba(20,107,94,.08);}'
    + '.cc-pick{display:flex;flex-direction:column;gap:6px;}'
    + '.cc-pick-label{font-family:Nunito,sans-serif;font-weight:700;font-size:13px;color:#4E6E69;}'
    + '.cc-stepper{display:flex;align-items:center;gap:4px;}'
    + '.cc-step-btn{width:38px;height:38px;border-radius:10px;border:2px solid #146B5E22;background:#FBF3E4;font-family:Baloo\\ 2,cursive;font-size:20px;color:#146B5E;cursor:pointer;}'
    + '.cc-step-val{min-width:64px;height:38px;border-radius:10px;border:2px dashed #146B5E44;background:#fff;font-family:Baloo\\ 2,cursive;font-size:20px;color:#146B5E;cursor:pointer;padding:0 8px;}'
    + '.cc-chiprow{display:flex;flex-wrap:wrap;gap:6px;}'
    + '.cc-chip{border:2px solid #146B5E22;background:#fff;border-radius:999px;padding:7px 13px;font-family:Nunito,sans-serif;font-weight:800;font-size:14px;color:#146B5E;cursor:pointer;min-height:38px;}'
    + '.cc-chip.cc-on{background:#146B5E;border-color:#146B5E;color:#fff;}'
    + '.cc-chip.cc-locked::after{content:" 🔒";font-size:11px;}'
    + '.cc-chip-sm{padding:5px 10px;font-size:12.5px;min-height:32px;}'

    /* summary + confirm */
    + '.cc-summary{display:flex;justify-content:center;}'
    + '.cc-sum-pill{border:2px solid #146B5E22;background:#fff;border-radius:999px;padding:8px 18px;font-family:Nunito,sans-serif;font-weight:800;font-size:15px;color:#146B5E;cursor:pointer;}'
    + '.cc-confirm{display:flex;flex-wrap:wrap;align-items:center;gap:8px;background:#FDF7EA;border:2px solid #F2C87966;border-radius:14px;padding:8px 14px;font-family:Nunito,sans-serif;font-weight:700;color:#5B4A2F;}'

    /* chart */
    + '.cc-charthost{background:#FFFDF7;border-radius:18px;padding:14px;box-shadow:0 2px 10px rgba(20,107,94,.10);}'
    + '.cc-grid{display:grid;grid-template-columns:repeat(var(--cc-cols),1fr);gap:4px;--cc-cell:48px;}'
    + '.cc-grid:has(.cc-h){grid-template-columns:18px repeat(var(--cc-cols),1fr);}'
    + '.cc-h{border:0;background:#146B5E10;border-radius:6px;cursor:pointer;padding:0;min-height:14px;}'
    + '.cc-h-corner{background:transparent;cursor:default;}'
    + '.cc-h-col{height:14px;}'
    + '.cc-h-row{width:18px;}'
    + '.cc-cell{position:relative;aspect-ratio:1/1;border:1.5px solid rgba(20,107,94,.12);border-radius:8px;background:transparent;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:Baloo\\ 2,cursive;color:#0E5147;transform:rotate(var(--cc-rot,0deg));font-size:calc(var(--cc-cell)*.55);line-height:1;font-variant-numeric:tabular-nums;}'
    + '.cc-cell.cc-d3{font-size:calc(var(--cc-cell)*.40);}'
    + '.cc-cell.cc-d4{font-size:calc(var(--cc-cell)*.30);}'
    + '.cc-cell.cc-inert{border-color:rgba(20,107,94,.05);cursor:default;}'
    + '.cc-cell.cc-halo{box-shadow:0 0 0 4px #F2784B,0 0 14px 2px #F2784B66;font-weight:700;z-index:1;}'
    + '@keyframes ccPop{0%{transform:rotate(var(--cc-rot,0deg)) scale(.55);opacity:.2;}60%{transform:rotate(var(--cc-rot,0deg)) scale(1.07);opacity:1;}100%{transform:rotate(var(--cc-rot,0deg)) scale(1);}}'
    + '.cc-cell.cc-pop{animation:ccPop .48s cubic-bezier(.34,1.4,.64,1);}'
    + '.cc-cell.cc-wonder{border-color:#F2C879;background:#F2C87922;}'
    + '.cc-q{font-family:Baloo\\ 2,cursive;font-size:calc(var(--cc-cell)*.5);color:#8F6512;animation:ccBreathe 2s ease-in-out infinite;}'
    + '@keyframes ccBreathe{0%,100%{transform:scale(1);}50%{transform:scale(1.06);}}'
    + '.cc-grid.cc-tint-ones .cc-cell .cc-dg-ones{background:#F2C87977;border-radius:4px;padding:0 1px;}'
    + '.cc-grid.cc-tint-tens .cc-cell .cc-dg-tens{background:#9CC3E577;border-radius:4px;padding:0 1px;}'

    /* done caption */
    + '.cc-done{display:flex;flex-direction:column;align-items:center;gap:2px;}'
    + '.cc-done-line{font-family:Baloo\\ 2,cursive;font-size:19px;color:#146B5E;}'
    + '.cc-done-notice{font-family:Nunito,sans-serif;font-weight:800;font-size:15px;color:#C4693C;}'

    /* rail */
    + '.cc-rail{display:flex;align-items:center;gap:10px;background:#fff;border-radius:16px;padding:8px 10px;box-shadow:0 1px 4px rgba(20,107,94,.08);flex-wrap:wrap;}'
    + '.cc-palette{display:flex;align-items:center;gap:6px;position:relative;}'
    + '.cc-pal-locked .cc-swatch{opacity:.35;filter:grayscale(.4);}'
    + '.cc-pal-lock{font-size:12px;}'
    + '.cc-swatch{width:34px;height:34px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:pointer;padding:0;}'
    + '.cc-swatch.cc-armed{outline:3px solid #146B5E;outline-offset:2px;}'
    + '.cc-eraser{background:#FBF3E4;color:#146B5E;display:flex;align-items:center;justify-content:center;}'
    + '.cc-tints{display:flex;gap:6px;flex-wrap:wrap;}'
    + '.cc-rail-spacer{flex:1;}'
    + '.cc-voicemiss{font-size:16px;}'
    + '.cc-go{display:flex;align-items:center;gap:10px;margin-left:auto;}'
    + '.cc-back{width:46px;height:46px;border-radius:12px;border:2px solid rgba(20,107,94,.15);background:#fff;color:#4E6E69;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
    + '.cc-back:disabled{opacity:.35;cursor:default;}'
    + '.cc-next{min-width:130px;height:56px;border-radius:16px;border:0;background:#F2784B;color:#fff;font-family:Baloo\\ 2,cursive;font-size:22px;cursor:pointer;box-shadow:0 3px 0 #C4552B;}'
    + '.cc-next:active{transform:translateY(2px);box-shadow:0 1px 0 #C4552B;}'
    + '.cc-next:disabled{opacity:.4;box-shadow:none;cursor:default;}'

    /* shelf */
    + '.cc-shelf{display:flex;flex-direction:column;gap:8px;}'
    + '.cc-shelf-head{align-self:flex-start;}'
    + '.cc-pgroup{display:flex;flex-direction:column;gap:4px;background:#fff;border-radius:14px;padding:8px 12px;}'
    + '.cc-pgroup-label{font-family:Nunito,sans-serif;font-weight:800;font-size:12.5px;color:#4E6E69;text-transform:uppercase;letter-spacing:.04em;}'
    + '.cc-saves{display:flex;flex-direction:column;gap:8px;}'
    + '.cc-savelist{display:flex;flex-wrap:wrap;gap:8px;}'
    + '.cc-savecard{display:flex;align-items:center;background:#fff;border-radius:12px;padding:6px 8px;gap:4px;box-shadow:0 1px 4px rgba(20,107,94,.08);}'
    + '.cc-saveopen{display:flex;align-items:center;gap:8px;border:0;background:transparent;cursor:pointer;padding:2px;}'
    + '.cc-savename{font-family:Nunito,sans-serif;font-weight:800;font-size:13px;color:#146B5E;}'
    + '.cc-savedel{border:0;background:transparent;color:#4E6E69;font-size:16px;cursor:pointer;padding:2px 6px;}'
    + '.cc-thumb{display:grid;grid-template-columns:repeat(var(--cc-tcols),1fr);gap:1px;width:52px;}'
    + '.cc-tc{width:100%;aspect-ratio:1/1;background:rgba(20,107,94,.08);border-radius:1px;}'

    /* gate */
    + '.cc-gate{position:relative;background:#FDF7EA;border:2px solid #F2C879;border-radius:16px;padding:14px 40px 14px 16px;font-family:Nunito,sans-serif;}'
    + '.cc-gate-text{margin:0 0 8px;font-weight:700;color:#5B4A2F;font-size:14.5px;line-height:1.5;}'
    + '.cc-gate-link{color:#C4552B;font-weight:900;text-decoration:underline;}'
    + '.cc-gate-close{position:absolute;top:6px;right:8px;border:0;background:transparent;font-size:20px;color:#8A7A5C;cursor:pointer;}'

    /* numpad */
    + '.cc-numpad-scrim{position:fixed;inset:0;background:rgba(20,40,36,.35);display:flex;align-items:center;justify-content:center;z-index:80;}'
    + '.cc-numpad{background:#fff;border-radius:18px;padding:14px;box-shadow:0 8px 30px rgba(0,0,0,.25);}'
    + '.cc-np-disp{font-family:Baloo\\ 2,cursive;font-size:30px;color:#146B5E;text-align:center;margin-bottom:8px;min-height:38px;}'
    + '.cc-np-keys{display:grid;grid-template-columns:repeat(3,64px);gap:6px;}'
    + '.cc-np-key{height:52px;border-radius:12px;border:2px solid #146B5E22;background:#FBF3E4;font-family:Baloo\\ 2,cursive;font-size:20px;color:#146B5E;cursor:pointer;}'
    + '.cc-np-ok{background:#146B5E;color:#fff;border-color:#146B5E;}'

    /* phone */
    + '@media (max-width:480px){'
    +   '.cc-wrap{padding:4px 0 10px;}'
    +   '.cc-charthost{padding:5px 4px;}'
    +   '.cc-grid{gap:1.5px;}'
    +   '.cc-cell{border-width:1px;border-radius:5px;}'
    +   '.cc-next{flex:1;min-width:0;}'
    +   '.cc-rail{gap:6px;}'
    +   '.cc-swatch{width:30px;height:30px;}'
    + '}'
    + '@media (min-width:900px){.cc-next{min-width:170px;height:64px;font-size:25px;}}'
    /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
       ONE variable carries the whole grid: `--cc-cell:48px` sizes every cell
       and the numeral inside it is `calc(var(--cc-cell) * .55)`. Wrap cap and
       cell move together — a wider wrap alone would have spread 48px cells
       across the board. A counting grid the class reads together is exactly
       the instrument that should be biggest. */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.cc-wide .cc-wrap{max-width:1160px;width:100%;}'
    +   'body.cc-wide .cc-grid{--cc-cell:62px;gap:6px;}'
    +   'body.cc-wide .cc-step-val{font-size:24px;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.cc-wide .cc-wrap{max-width:1480px;width:100%;}'
    +   'body.cc-wide .cc-grid{--cc-cell:80px;gap:8px;}'
    +   'body.cc-wide .cc-step-val{font-size:27px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.cc-wide .cc-wrap{max-width:1680px;width:100%;}'
    +   'body.cc-wide .cc-grid{--cc-cell:92px;gap:9px;}'
    +   'body.cc-wide .cc-step-val{font-size:30px;}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){.cc-cell.cc-pop{animation:none;}.cc-q{animation:none;}}';
  document.head.appendChild(st);
}
