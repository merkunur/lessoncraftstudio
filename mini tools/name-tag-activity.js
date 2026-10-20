/* =====================================================================
   name-tag-activity.js — ACTIVITY #57 of the one-by-one rebuild:
   "Read the Word, Tap the Picture" → THE STICKY NAME TAG (RF.K.3, 11
   locales). Design sheet: docs/activities-rebuild/designs/057-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: the printed word is a name tag on a string. Hang it on a
   picture and press Check: it presses down letter by letter from the left,
   and on the wrong picture it sticks only as far as the letters match —
   at the first different letter the end curls up and the tag peels off,
   back to the tray, with that letter ringed in coral.
     read      — one tag; four pictures whose names start alike
     family    — rhyme families: hang every tag; one picture is not in it
     syllables — clip the syllable pieces into one tag, then hang it
     memory    — face-down cards: a picture and its own tag make a pair
   The tag never speaks its word before it sticks: the task is reading.

   ACTIVITY LAYER ONLY: the model is name-tag-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.NameTagActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var NameTagActivity = {
  id: 'name-tag',
  apparatusClasses: ['ntg-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:        {en:'The Sticky Name Tag',de:'Das Namensschild',nl:'Het naamkaartje',da:'Navneskiltet',sv:'Namnlappen',no:'Navnelappen',es:'La etiqueta que se pega',it:'L’etichetta che si attacca',pt:'A etiqueta que gruda',fr:'L’étiquette qui colle',fi:'Nimilappu'},
    instruction:  {en:'Read the word on the tag. Hang it on its picture, then press Check.',de:'Lies das Wort auf dem Schild. Häng es an sein Bild und tippe dann auf Prüfen.',nl:'Lees het woord op het kaartje. Hang het bij het goede plaatje en tik dan op Controleer.',da:'Læs ordet på skiltet. Hæng det på det rigtige billede, og tryk så på Tjek.',sv:'Läs ordet på lappen. Häng den på rätt bild och tryck sedan på Kolla.',no:'Les ordet på lappen. Heng den på riktig bilde, og trykk så på Sjekk.',es:'Lee la palabra de la etiqueta. Cuélgala en su dibujo y luego toca Revisar.',it:'Leggi la parola sull’etichetta. Appendila al suo disegno, poi tocca Controlla.',pt:'Leia a palavra da etiqueta. Pendure-a na figura certa e depois toque em Verificar.',fr:'Lis le mot sur l’étiquette. Accroche-la à la bonne image, puis touche Vérifier.',fi:'Lue lapun sana. Ripusta lappu oikeaan kuvaan ja napauta sitten Tarkista.'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    pRead:        {en:'Read the tag and hang it on its picture.',de:'Lies das Schild und häng es an sein Bild.',nl:'Lees het kaartje en hang het bij het plaatje.',da:'Læs skiltet, og hæng det på billedet.',sv:'Läs lappen och häng den på bilden.',no:'Les lappen og heng den på bildet.',es:'Lee la etiqueta y cuélgala en su dibujo.',it:'Leggi l’etichetta e appendila al suo disegno.',pt:'Leia a etiqueta e pendure-a na figura.',fr:'Lis l’étiquette et accroche-la à son image.',fi:'Lue lappu ja ripusta se kuvaan.'},
    pFamily:      {en:'Hang each rhyming word on its picture.',de:'Häng jedes Reimwort an sein Bild.',nl:'Hang elk rijmwoord bij zijn plaatje.',da:'Hæng hvert rimord på sit billede.',sv:'Häng varje rimord på sin bild.',no:'Heng hvert rimord på sitt bilde.',es:'Cuelga cada palabra que rima en su dibujo.',it:'Appendi ogni parola in rima al suo disegno.',pt:'Pendure cada palavra que rima na sua figura.',fr:'Accroche chaque mot qui rime à son image.',fi:'Ripusta jokainen riimisana omaan kuvaansa.'},
    pSyl:         {en:'Join the pieces, read the word, hang the tag.',de:'Setz die Silben zusammen, lies das Wort und häng das Schild auf.',nl:'Zet de stukjes aan elkaar, lees het woord en hang het kaartje op.',da:'Sæt stykkerne sammen, læs ordet, og hæng skiltet op.',sv:'Sätt ihop bitarna, läs ordet och häng upp lappen.',no:'Sett sammen bitene, les ordet og heng opp lappen.',es:'Une las sílabas, lee la palabra y cuelga la etiqueta.',it:'Unisci le sillabe, leggi la parola e appendi l’etichetta.',pt:'Junte as sílabas, leia a palavra e pendure a etiqueta.',fr:'Assemble les syllabes, lis le mot et accroche l’étiquette.',fi:'Yhdistä tavut, lue sana ja ripusta lappu.'},
    pMem:         {en:'Find each picture and its tag.',de:'Finde zu jedem Bild sein Schild.',nl:'Zoek bij elk plaatje zijn kaartje.',da:'Find hvert billede og dets skilt.',sv:'Hitta varje bild och dess lapp.',no:'Finn hvert bilde og lappen som hører til.',es:'Encuentra cada dibujo y su etiqueta.',it:'Trova ogni disegno e la sua etichetta.',pt:'Encontre cada figura e a sua etiqueta.',fr:'Trouve chaque image et son étiquette.',fi:'Etsi jokaiselle kuvalle oma lappu.'},
    hintHang:     {en:'Hang the tag on a picture first.',de:'Häng das Schild zuerst an ein Bild.',nl:'Hang het kaartje eerst bij een plaatje.',da:'Hæng først skiltet på et billede.',sv:'Häng först lappen på en bild.',no:'Heng lappen på et bilde først.',es:'Primero cuelga la etiqueta en un dibujo.',it:'Prima appendi l’etichetta a un disegno.',pt:'Primeiro pendure a etiqueta em uma figura.',fr:'Accroche d’abord l’étiquette à une image.',fi:'Ripusta lappu ensin johonkin kuvaan.'},
    hintTray:     {en:'Some tags are still in the tray.',de:'Es liegen noch Schilder in der Ablage.',nl:'Er liggen nog kaartjes in het bakje.',da:'Der ligger stadig skilte i bakken.',sv:'Det ligger fortfarande lappar i lådan.',no:'Det ligger fortsatt lapper i skuffen.',es:'Todavía hay etiquetas en la charola.',it:'Ci sono ancora etichette nel vassoio.',pt:'Ainda há etiquetas na bandeja.',fr:'Il reste des étiquettes sur le plateau.',fi:'Tarjottimella on vielä lappuja.'},
    hintJoin:     {en:'Join all the pieces into one tag first.',de:'Setz zuerst alle Silben zu einem Schild zusammen.',nl:'Zet eerst alle stukjes aan elkaar tot één kaartje.',da:'Sæt først alle stykkerne sammen til ét skilt.',sv:'Sätt först ihop alla bitar till en lapp.',no:'Sett først sammen alle bitene til én lapp.',es:'Primero une todas las sílabas en una etiqueta.',it:'Prima unisci tutte le sillabe in un’etichetta.',pt:'Primeiro junte todas as sílabas em uma etiqueta.',fr:'Assemble d’abord toutes les syllabes en une étiquette.',fi:'Yhdistä ensin kaikki tavut yhdeksi lapuksi.'},
    hintMem:      {en:'Not a pair — the cards turn back over.',de:'Kein Paar – die Karten drehen sich wieder um.',nl:'Geen paar – de kaarten draaien weer om.',da:'Ikke et par – kortene vender om igen.',sv:'Inget par – korten vänds tillbaka.',no:'Ikke et par – kortene snur seg igjen.',es:'No son pareja: las tarjetas se voltean otra vez.',it:'Non è una coppia: le carte si girano di nuovo.',pt:'Não é um par: as cartas viram de novo.',fr:'Ce n’est pas une paire : les cartes se retournent.',fi:'Ei pari – kortit kääntyvät takaisin.'},
    hintFirst:    {en:'The very first letter is different.',de:'Schon der erste Buchstabe ist anders.',nl:'De allereerste letter is al anders.',da:'Allerede det første bogstav er anderledes.',sv:'Redan den första bokstaven är annorlunda.',no:'Allerede den første bokstaven er annerledes.',es:'Desde la primera letra ya es diferente.',it:'Già la prima lettera è diversa.',pt:'Já a primeira letra é diferente.',fr:'Dès la première lettre, c’est différent.',fi:'Jo ensimmäinen kirjain on eri.'},
    hintPeel1:    {en:'Only the first letter stuck. Look at the next letter: {letter}.',de:'Nur der erste Buchstabe hat geklebt. Schau dir den nächsten an: {letter}.',nl:'Alleen de eerste letter bleef plakken. Kijk naar de volgende letter: {letter}.',da:'Kun det første bogstav sad fast. Se på det næste bogstav: {letter}.',sv:'Bara den första bokstaven fastnade. Titta på nästa bokstav: {letter}.',no:'Bare den første bokstaven ble sittende. Se på neste bokstav: {letter}.',es:'Solo se pegó la primera letra. Mira la siguiente letra: {letter}.',it:'Si è attaccata solo la prima lettera. Guarda la lettera dopo: {letter}.',pt:'Só a primeira letra grudou. Olhe a próxima letra: {letter}.',fr:'Seule la première lettre a collé. Regarde la lettre suivante : {letter}.',fi:'Vain ensimmäinen kirjain tarttui. Katso seuraavaa kirjainta: {letter}.'},
    hintPeel:     {en:'The first {k} letters stuck. Look at the next letter: {letter}.',de:'{k} Buchstaben haben geklebt. Schau dir den nächsten an: {letter}.',nl:'{k} letters bleven plakken. Kijk naar de volgende letter: {letter}.',da:'{k} bogstaver sad fast. Se på det næste bogstav: {letter}.',sv:'{k} bokstäver fastnade. Titta på nästa bokstav: {letter}.',no:'{k} bokstaver ble sittende. Se på neste bokstav: {letter}.',es:'Se pegaron {k} letras. Mira la siguiente letra: {letter}.',it:'Si sono attaccate {k} lettere. Guarda la lettera dopo: {letter}.',pt:'{k} letras grudaram. Olhe a próxima letra: {letter}.',fr:'{k} lettres ont collé. Regarde la lettre suivante : {letter}.',fi:'{k} kirjainta tarttui. Katso seuraavaa kirjainta: {letter}.'},
    hintFamily:   {en:'Some tags peeled off. Read each one to the end.',de:'Ein paar Schilder sind abgefallen. Lies jedes bis zum Ende.',nl:'Er zijn kaartjes losgelaten. Lees elk kaartje tot het eind.',da:'Nogle skilte faldt af. Læs hvert skilt helt til ende.',sv:'Några lappar ramlade av. Läs varje lapp ända till slutet.',no:'Noen lapper falt av. Les hver lapp helt til slutten.',es:'Algunas etiquetas se despegaron. Lee cada una hasta el final.',it:'Alcune etichette si sono staccate. Leggile tutte fino alla fine.',pt:'Algumas etiquetas descolaram. Leia cada uma até o fim.',fr:'Des étiquettes se sont décollées. Lis chacune jusqu’au bout.',fi:'Osa lapuista irtosi. Lue jokainen loppuun asti.'},
    hintHelp:     {en:'Read every letter, all the way to the end.',de:'Lies jeden Buchstaben, ganz bis zum Ende.',nl:'Lees elke letter, helemaal tot het eind.',da:'Læs hvert bogstav, helt til ende.',sv:'Läs varje bokstav, ända till slutet.',no:'Les hver bokstav, helt til slutten.',es:'Lee cada letra, hasta el final.',it:'Leggi ogni lettera, fino alla fine.',pt:'Leia cada letra, até o fim.',fr:'Lis chaque lettre, jusqu’au bout.',fi:'Lue jokainen kirjain loppuun asti.'},
    hintFirstSyl: {en:'The very first part is different.',de:'Schon die erste Silbe ist anders.',nl:'Het allereerste stukje is al anders.',da:'Allerede den første stavelse er anderledes.',sv:'Redan den första stavelsen är annorlunda.',no:'Allerede den første stavelsen er annerledes.',es:'Desde la primera sílaba ya es diferente.',it:'Già la prima sillaba è diversa.',pt:'Já a primeira sílaba é diferente.',fr:'Dès la première syllabe, c’est différent.',fi:'Jo ensimmäinen tavu on eri.'},
    hintPeelSyl:  {en:'The beginning stuck. Look at the next part: {part}.',de:'Der Anfang hat geklebt. Schau dir die nächste Silbe an: {part}.',nl:'Het begin bleef plakken. Kijk naar het volgende stukje: {part}.',da:'Begyndelsen sad fast. Se på den næste stavelse: {part}.',sv:'Början fastnade. Titta på nästa stavelse: {part}.',no:'Begynnelsen ble sittende. Se på neste stavelse: {part}.',es:'El principio se pegó. Mira la siguiente sílaba: {part}.',it:'L’inizio si è attaccato. Guarda la sillaba dopo: {part}.',pt:'O começo grudou. Olhe a próxima sílaba: {part}.',fr:'Le début a collé. Regarde la syllabe suivante : {part}.',fi:'Alku tarttui. Katso seuraavaa tavua: {part}.'},
    hintShortSyl: {en:'Every part stuck, but this picture’s name is longer.',de:'Alle Silben haben geklebt, aber der Name dieses Bildes ist länger.',nl:'Alle stukjes bleven plakken, maar de naam van dit plaatje is langer.',da:'Alle stavelser sad fast, men billedets navn er længere.',sv:'Alla stavelser fastnade, men bildens namn är längre.',no:'Alle stavelsene ble sittende, men navnet på bildet er lengre.',es:'Se pegaron todas las sílabas, pero el nombre de este dibujo es más largo.',it:'Si sono attaccate tutte le sillabe, ma il nome di questo disegno è più lungo.',pt:'Todas as sílabas grudaram, mas o nome desta figura é mais comprido.',fr:'Toutes les syllabes ont collé, mais le nom de cette image est plus long.',fi:'Kaikki tavut tarttuivat, mutta kuvan nimi on pidempi.'},
    hintHelpSyl:  {en:'Read every part, all the way to the end.',de:'Lies jede Silbe, ganz bis zum Ende.',nl:'Lees elk stukje, helemaal tot het eind.',da:'Læs hver stavelse, helt til ende.',sv:'Läs varje stavelse, ända till slutet.',no:'Les hver stavelse, helt til slutten.',es:'Lee cada sílaba, hasta el final.',it:'Leggi ogni sillaba, fino alla fine.',pt:'Leia cada sílaba, até o fim.',fr:'Lis chaque syllabe, jusqu’au bout.',fi:'Lue jokainen tavu loppuun asti.'},
    okRead:       {en:'{sounds}: {word}. You read it to the end!',de:'{sounds}: {word} – du hast bis zum Ende gelesen!',nl:'{sounds}: {word} – je hebt het tot het eind gelezen!',da:'{sounds}: {word} – du læste helt til ende!',sv:'{sounds}: {word} – du läste ända till slutet!',no:'{sounds}: {word} – du leste helt til slutten!',es:'{sounds}: {word}. ¡Leíste hasta el final!',it:'{sounds}: {word}. Hai letto fino alla fine!',pt:'{sounds}: {word}. Você leu até o fim!',fr:'{sounds} : {word}. Tu as lu jusqu’au bout !',fi:'{sounds}: {word}. Luit loppuun asti!'},
    okFamily:     {en:'{list}: they all end in {ending}!',de:'{list}: Alle enden auf {ending}!',nl:'{list}: ze eindigen allemaal op {ending}!',da:'{list}: de ender alle på {ending}!',sv:'{list}: alla slutar på {ending}!',no:'{list}: alle slutter på {ending}!',es:'{list}: ¡todas terminan en {ending}!',it:'{list}: finiscono tutte in {ending}!',pt:'{list}: todas terminam em {ending}!',fr:'{list} : ils finissent tous par {ending} !',fi:'{list}: kaikkien lopussa on {ending}!'},
    okSyl:        {en:'{parts}: {word}!',de:'{parts}: {word}!',nl:'{parts}: {word}!',da:'{parts}: {word}!',sv:'{parts}: {word}!',no:'{parts}: {word}!',es:'¡{parts}: {word}!',it:'{parts}: {word}!',pt:'{parts}: {word}!',fr:'{parts} : {word} !',fi:'{parts}: {word}!'},
    okMem:        {en:'All the tags are on!',de:'Alle Schilder hängen!',nl:'Alle kaartjes hangen!',da:'Alle skilte hænger!',sv:'Alla lappar sitter uppe!',no:'Alle lappene henger!',es:'¡Todas las etiquetas están puestas!',it:'Tutte le etichette sono al loro posto!',pt:'Todas as etiquetas estão no lugar!',fr:'Toutes les étiquettes sont accrochées !',fi:'Kaikki laput ovat paikallaan!'},
    setLevel:     {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lvRead:       {en:'Read the word',de:'Wort lesen',nl:'Woord lezen',da:'Læs ordet',sv:'Läs ordet',no:'Les ordet',es:'Lee la palabra',it:'Leggi la parola',pt:'Leia a palavra',fr:'Lire le mot',fi:'Lue sana'},
    lvFamily:     {en:'Rhyming words',de:'Reimwörter',nl:'Rijmwoorden',da:'Rimord',sv:'Rimord',no:'Rimord',es:'Palabras que riman',it:'Parole in rima',pt:'Palavras que rimam',fr:'Mots qui riment',fi:'Riimisanat'},
    lvSyl:        {en:'Words in syllables',de:'Wörter in Silben',nl:'Woorden in stukjes',da:'Ord i stavelser',sv:'Ord i stavelser',no:'Ord i stavelser',es:'Palabras en sílabas',it:'Parole in sillabe',pt:'Palavras em sílabas',fr:'Mots en syllabes',fi:'Sanat tavuina'},
    lvMem:        {en:'Memory pairs',de:'Memory',nl:'Memory',da:'Vendespil',sv:'Memory',no:'Memory',es:'Memorama',it:'Memory',pt:'Jogo da memória',fr:'Memory',fi:'Muistipeli'},
    setLook:      {en:'Look-alike words',de:'Ähnliche Wörter',nl:'Woorden die op elkaar lijken',da:'Ord der ligner hinanden',sv:'Ord som liknar varandra',no:'Ord som ligner hverandre',es:'Palabras parecidas',it:'Parole simili',pt:'Palavras parecidas',fr:'Mots qui se ressemblent',fi:'Samannäköiset sanat'},
    lookClose:    {en:'Very alike',de:'Sehr ähnlich',nl:'Erg veel',da:'Meget',sv:'Mycket',no:'Mye',es:'Muy parecidas',it:'Molto simili',pt:'Muito parecidas',fr:'Beaucoup',fi:'Paljon'},
    lookFar:      {en:'Less alike',de:'Weniger ähnlich',nl:'Minder',da:'Mindre',sv:'Mindre',no:'Mindre',es:'Menos parecidas',it:'Meno simili',pt:'Menos parecidas',fr:'Moins',fi:'Vähemmän'},
    ariaTag:      {en:'Tag: {word}.',de:'Schild: {word}.',nl:'Kaartje: {word}.',da:'Skilt: {word}.',sv:'Lapp: {word}.',no:'Lapp: {word}.',es:'Etiqueta: {word}.',it:'Etichetta: {word}.',pt:'Etiqueta: {word}.',fr:'Étiquette : {word}.',fi:'Lappu: {word}.'},
    ariaFrame:    {en:'Picture {n} of 4.',de:'Bild {n} von 4.',nl:'Plaatje {n} van 4.',da:'Billede {n} af 4.',sv:'Bild {n} av 4.',no:'Bilde {n} av 4.',es:'Dibujo {n} de 4.',it:'Disegno {n} di 4.',pt:'Figura {n} de 4.',fr:'Image {n} sur 4.',fi:'Kuva {n}/4.'},
    ariaHung:     {en:'Picture {n} of 4, with the tag {word}.',de:'Bild {n} von 4, mit dem Schild {word}.',nl:'Plaatje {n} van 4, met het kaartje {word}.',da:'Billede {n} af 4, med skiltet {word}.',sv:'Bild {n} av 4, med lappen {word}.',no:'Bilde {n} av 4, med lappen {word}.',es:'Dibujo {n} de 4, con la etiqueta {word}.',it:'Disegno {n} di 4, con l’etichetta {word}.',pt:'Figura {n} de 4, com a etiqueta {word}.',fr:'Image {n} sur 4, avec l’étiquette {word}.',fi:'Kuva {n}/4, lappu {word}.'},
    ariaOn:       {en:'The tag is on: {word}.',de:'Das Schild hängt: {word}.',nl:'Het kaartje hangt: {word}.',da:'Skiltet hænger: {word}.',sv:'Lappen sitter: {word}.',no:'Lappen henger: {word}.',es:'La etiqueta quedó puesta: {word}.',it:'L’etichetta è appesa: {word}.',pt:'A etiqueta está pendurada: {word}.',fr:'L’étiquette est accrochée : {word}.',fi:'Lappu on paikallaan: {word}.'},
    ariaCardDown: {en:'Card {n}, face down.',de:'Karte {n}, verdeckt.',nl:'Kaart {n}, omgedraaid.',da:'Kort {n}, med bagsiden op.',sv:'Kort {n}, med baksidan upp.',no:'Kort {n}, med baksiden opp.',es:'Tarjeta {n}, boca abajo.',it:'Carta {n}, coperta.',pt:'Carta {n}, virada para baixo.',fr:'Carte {n}, face cachée.',fi:'Kortti {n}, kuvapuoli alaspäin.'},
    ariaCardPic:  {en:'Card {n}: a picture.',de:'Karte {n}: ein Bild.',nl:'Kaart {n}: een plaatje.',da:'Kort {n}: et billede.',sv:'Kort {n}: en bild.',no:'Kort {n}: et bilde.',es:'Tarjeta {n}: un dibujo.',it:'Carta {n}: un disegno.',pt:'Carta {n}: uma figura.',fr:'Carte {n} : une image.',fi:'Kortti {n}: kuva.'},
    ariaCardTag:  {en:'Card {n}: the tag {word}.',de:'Karte {n}: das Schild {word}.',nl:'Kaart {n}: het kaartje {word}.',da:'Kort {n}: skiltet {word}.',sv:'Kort {n}: lappen {word}.',no:'Kort {n}: lappen {word}.',es:'Tarjeta {n}: la etiqueta {word}.',it:'Carta {n}: l’etichetta {word}.',pt:'Carta {n}: a etiqueta {word}.',fr:'Carte {n} : l’étiquette {word}.',fi:'Kortti {n}: lappu {word}.'},
    ariaPiece:    {en:'Piece: {piece}.',de:'Silbe: {piece}.',nl:'Stukje: {piece}.',da:'Stykke: {piece}.',sv:'Bit: {piece}.',no:'Bit: {piece}.',es:'Sílaba: {piece}.',it:'Sillaba: {piece}.',pt:'Sílaba: {piece}.',fr:'Syllabe : {piece}.',fi:'Tavu: {piece}.'},
    ariaApart:    {en:'Take the tag apart.',de:'Schild wieder auseinandernehmen.',nl:'Haal het kaartje weer uit elkaar.',da:'Skil skiltet ad igen.',sv:'Ta isär lappen igen.',no:'Ta lappen fra hverandre igjen.',es:'Separa otra vez la etiqueta.',it:'Separa di nuovo l’etichetta.',pt:'Separe a etiqueta de novo.',fr:'Défais l’étiquette.',fi:'Pura lappu taas osiin.'}
    /*STRINGS-END*/
  },

  defaults: { level: 'read', look: 'close' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'read', labelKey: 'lvRead' }, { value: 'family', labelKey: 'lvFamily' }, { value: 'syllables', labelKey: 'lvSyl' }, { value: 'memory', labelKey: 'lvMem' }] },
    { key: 'look', type: 'choice', labelKey: 'setLook', options: [{ value: 'close', labelKey: 'lookClose' }, { value: 'far', labelKey: 'lookFar' }] }
  ],

  OK_MS: 3000, FAST: false, PRESS_MS: 120,
  QUOTES: { en: ['“', '”'], de: ['„', '“'], nl: ['‘', '’'], da: ['»', '«'], sv: ['”', '”'], no: ['«', '»'], es: ['«', '»'], it: ['«', '»'], pt: ['“', '”'], fr: ['« ', ' »'], fi: ['”', '”'] },
  LV_KEY: { read: 'lvRead', family: 'lvFamily', syllables: 'lvSyl', memory: 'lvMem' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._lay = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._drag = null; this._view = {}; this._sel = -1;
    var ls = NameTagCore.levels(this._loc()), self = this;
    this.settings = [
      { key: 'level', type: 'choice', labelKey: 'setLevel', options: ls.map(function (v) { return { value: v, labelKey: self.LV_KEY[v] }; }) },
      { key: 'look', type: 'choice', labelKey: 'setLook', options: [{ value: 'close', labelKey: 'lookClose' }, { value: 'far', labelKey: 'lookFar' }] }
    ];
    injectNameTagCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return NameTagCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _lv: function () { return NameTagCore.level(this._loc(), this._set('level')); },
  _look: function () { return this._set('look') === 'far' ? 'far' : 'close'; },
  _key: function () { var lv = this._lv(); return this._loc() + '/' + lv + (lv === 'read' ? '/' + this._look() : ''); },
  _q: function (s) { var Q = this.QUOTES[this._loc()] || this.QUOTES.en; return Q[0] + s + Q[1]; },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = NameTagCore.rounds(this._loc(), this._lv(), this._look()); this._poolKey = k; this._order = null; } return this._pool; },
  _dealFor: function (lv, n) { var C = NameTagCore; return lv === 'memory' ? C.dealCards(n, Math.random) : lv === 'family' ? C.dealFree(n, Math.random) : C.deal(n, Math.random); },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = NameTagCore, lv = this._lv();
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._lay = this._dealFor(lv, n); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._lay = this._dealFor(lv, n); }
    if (!this._lay || this._layKey !== this._poolKey || this._lay.length !== n) { this._lay = this._dealFor(lv, n); this._layKey = this._poolKey; }   /* the layouts belong to the level */
    var r = pool[this._order[index % n]], lay = this._lay[index % n];
    var pk = { read: 'pRead', family: 'pFamily', syllables: 'pSyl', memory: 'pMem' }[r.level];
    var ck = { read: 'okRead', family: 'okFamily', syllables: 'okSyl', memory: 'okMem' }[r.level];
    var pieces = r.level === 'syllables' ? this._scramble(r.tag.parts.length) : null;
    return {
      id: 'name-tag.' + r.loc + '.' + r.id, promptKey: pk, promptArgs: {}, celebrateKey: ck, answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = {}; tool._drag = null; tool._sel = -1;
        tool.st = r.level === 'memory' ? C.newState(r, { cards: lay }) : C.newState(r, { layout: lay, pieceOrder: pieces });
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* the syllable pieces arrive out of order (never already in reading order) */
  _scramble: function (n) { var o = []; for (var i = 0; i < n; i++) o.push(i); if (n < 2) return o; do { for (var j = n - 1; j > 0; j--) { var k = Math.floor(Math.random() * (j + 1)), x = o[j]; o[j] = o[k]; o[k] = x; } } while (o.every(function (v, i) { return v === i; })); return o; },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = NameTagCore, lv = C.levels(this._loc())[0], r0 = C.rounds(this._loc(), lv, 'close')[0]; this.st = C.newState(r0, {}); }
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
    var L = this._L = NameTagCore.layout(this._width());
    var wrap = api.el('div', 'ntg-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 340 ? ' is-tiny' : '') + ' is-' + st.r.level); this._wrap = wrap; wrap.tabIndex = -1;
    [['pic', L.pic], ['font', L.font], ['card', L.card]].forEach(function (p) { wrap.style.setProperty('--ntg-' + p[0], p[1] + 'px'); });
    var board = api.el('div', 'ntg-board'); wrap.appendChild(board); this._board = board;
    var ask = api.el('div', 'ntg-ask'); wrap.appendChild(ask);
    var note = api.el('p', 'ntg-note'); note.setAttribute('aria-live', 'polite'); this._note = note; ask.appendChild(note);
    var chk = api.el('button', 'ntg-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
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
    if (!this._board) return;
    var st = this.st, C = NameTagCore, r = st.r;
    this._wrap.classList.toggle('is-fast', !!this.FAST);
    this._board.innerHTML = '';
    if (r.level === 'memory') this._paintCards();
    else { this._paintTray(); this._paintWall(); }
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : (this._view.won ? this._okText() : '');
    else if (h && (!this._busy || st.last.result === 'mismatch')) msg = this._t(h, this._hintArgs());
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.last && (st.last.result === 'peel' || st.last.result === 'mismatch')));
    this._checkBtn.hidden = !!st.done || r.level === 'memory'; this._checkBtn.disabled = !!this._busy;
  },
  _hintArgs: function () {
    var st = this.st, l = st.last || {}, a = {};
    a.k = l.stuck; a.letter = this._q(NameTagCore.peelUnit(st)); a.part = a.letter;
    return a;
  },
  _okText: function () {
    var st = this.st, r = st.r;
    if (r.level === 'read') return this._t('okRead', { sounds: Array.from(r.tag.word).join('-'), word: r.tag.word });
    if (r.level === 'syllables') return this._t('okSyl', { parts: r.tag.parts.join('-'), word: r.tag.word });
    if (r.level === 'family') return this._t('okFamily', { list: r.tags.map(function (t) { return t.word; }).join(', '), ending: this._q('-' + r.ending) });
    return this._t('okMem');
  },

  /* a tag: its letters (or syllable pieces) in fixed cells, each with its own sticking zone */
  _tagEl: function (units, cls, k, opts) {
    opts = opts || {};
    var b = this.api.el(opts.div ? 'div' : 'button', 'ntg-tag ' + (cls || '')); if (!opts.div) b.type = 'button'; if (k) b.setAttribute('data-k', k);
    var hole = this.api.el('span', 'ntg-hole'); hole.setAttribute('aria-hidden', 'true'); b.appendChild(hole);
    var row = this.api.el('span', 'ntg-letters');
    units.forEach(function (u, i) {
      var s = document.createElement('span'); s.className = 'ntg-l' + (u.length > 1 ? ' is-part' : '');
      if (opts.pressed !== undefined && i < opts.pressed) { s.className += ' is-stick'; s.style.animationDelay = (opts.delay ? i * opts.delay : 0) + 'ms'; }
      if (opts.ring === i) s.className += ' is-ring';
      if (opts.finger) { s.className += ' is-finger'; s.style.animationDelay = (i * 450) + 'ms'; }
      s.textContent = u; row.appendChild(s);
      if (opts.dots && i < units.length - 1) { var d = document.createElement('span'); d.className = 'ntg-dot'; d.textContent = '·'; d.setAttribute('aria-hidden', 'true'); row.appendChild(d); }
    });
    b.appendChild(row);
    /* a long word shrinks its letters to fit the room it has (never below the floor the gates measure) */
    if (opts.room) {
      var chars = units.join('').length, dots = opts.dots ? units.length - 1 : 0, base = parseFloat(opts.base || this._L.font);
      var fit = Math.floor((opts.room - 44) / (chars * 0.62 + dots * 0.5));
      if (fit < base) b.style.setProperty('--ntg-font', Math.max(opts.floor || 24, fit) + 'px');
    }
    return b;
  },
  _units: function (tag) { var st = this.st; if (st.r.level === 'syllables') return NameTagCore.builtWord(st); return Array.from(tag.word); },
  _paintTray: function () {
    var st = this.st, r = st.r, C = NameTagCore, self = this, v = this._view;
    var tray = this.api.el('div', 'ntg-tray'); this._tray = tray;
    if (r.level === 'syllables') this._paintPieces(tray);
    C.tagsOf(st).forEach(function (tag, t) {
      if (st.hung[t] >= 0 || (v.press && v.press.tags.indexOf(t) >= 0)) return;
      if (r.level === 'syllables' && !C.tagReady(st)) return;
      var ring = st.show && st.last && st.last.result === 'peel' && st.last.peels && st.last.peels.some(function (p) { return p.tag === t; }) ? st.last.peels.filter(function (p) { return p.tag === t; })[0] : null;
      var units = self._units(tag);
      var el = self._tagEl(units, 'is-tray' + (self._sel === t ? ' is-sel' : '') + (r.level === 'family' ? ' is-small' : ''), 'tag' + t, { ring: ring && !ring.short ? ring.peelAt : -1, finger: NameTagCore.helpOn(st) && r.level !== 'family', dots: r.level === 'syllables', room: r.level === 'family' ? 0 : (self._L.mode === 'wide' ? 250 : self._L.W - 56) });
      el.setAttribute('aria-label', self._t('ariaTag', { word: tag.word }));
      el.setAttribute('aria-pressed', String(self._sel === t));
      self._bindDrag(el, t);
      tray.appendChild(el);
      if (r.level === 'syllables') {
        var ap = self.api.el('button', 'ntg-apart'); ap.type = 'button'; ap.setAttribute('data-k', 'apart'); ap.setAttribute('aria-label', self._t('ariaApart'));
        ap.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12h5M14 12h5M10 8l-3 4 3 4M14 8l3 4-3 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        ap.addEventListener('click', function () { self._unjoin(); });
        tray.appendChild(ap);
      }
    });
    this._board.appendChild(tray);
  },
  /* syllables: the loose pieces + the tag being built */
  _paintPieces: function (tray) {
    var st = this.st, r = st.r, C = NameTagCore, self = this;
    if (C.tagReady(st)) return;
    var bar = this.api.el('div', 'ntg-build');
    var built = C.builtWord(st);
    var shell = this._tagEl(built.length ? built : [], 'is-building', 'build', { div: true, dots: true });
    for (var e = built.length; e < r.tag.parts.length; e++) { var gap = document.createElement('span'); gap.className = 'ntg-gap'; gap.setAttribute('aria-hidden', 'true'); shell.querySelector('.ntg-letters').appendChild(gap); }
    bar.appendChild(shell); tray.appendChild(bar);
    var loose = this.api.el('div', 'ntg-pieces');
    st.pieceOrder.forEach(function (pi) {
      if (st.built.indexOf(pi) >= 0) return;
      var p = self.api.el('button', 'ntg-piece'); p.type = 'button'; p.setAttribute('data-k', 'piece' + pi); p.textContent = r.tag.parts[pi];
      p.setAttribute('aria-label', self._t('ariaPiece', { piece: r.tag.parts[pi] }));
      p.addEventListener('click', function () { self._join(pi); });
      loose.appendChild(p);
    });
    tray.appendChild(loose);
  },
  _paintWall: function () {
    var st = this.st, r = st.r, C = NameTagCore, self = this, v = this._view;
    var wall = this.api.el('div', 'ntg-wall' + (st.done && r.level === 'family' && v.won ? ' is-weave' : '')); this._wallEl = wall;
    var help = C.helpOn(st);
    for (var f = 0; f < 4; f++) (function (f) {
      var p = C.wallAt(st, f), cell = self.api.el('div', 'ntg-cell');
      var fr = self.api.el('button', 'ntg-frame'); fr.type = 'button'; fr.setAttribute('data-k', 'frame' + f); fr.setAttribute('data-frame', f);
      fr.innerHTML = '<img alt="" draggable="false" src="' + self._pic(p.pic) + '"><span class="ntg-hook" aria-hidden="true"></span>';
      var hungT = st.hung.indexOf(f);
      fr.setAttribute('aria-label', hungT >= 0 ? self._t('ariaHung', { n: f + 1, word: C.tagsOf(st)[hungT].word }) : self._t('ariaFrame', { n: f + 1 }));
      fr.addEventListener('click', function () { self._frameTap(f); });
      if (st.done && hungT >= 0 && v.won) fr.classList.add('is-win');
      if (st.locked && hungT >= 0 && st.locked[hungT]) fr.classList.add('is-win');
      cell.appendChild(fr);
      /* the tag hanging here (loose before Check, stuck after, or pressing during Check) */
      var press = v.press && v.press.frames.indexOf(f) >= 0 ? v.press : null;
      var showT = press ? press.tags[press.frames.indexOf(f)] : hungT;
      if (showT >= 0) {
        var tag = C.tagsOf(st)[showT], units = press ? press.units[press.frames.indexOf(f)] : self._units(tag);
        var res = press ? press.res[press.frames.indexOf(f)] : null;
        var locked = (st.locked && st.locked[showT]) || (st.done && !press);
        var el = self._tagEl(units, 'is-hung' + (locked ? ' is-stuck' : '') + (press && !res.full ? ' is-peel' : '') + (r.level === 'family' ? ' is-small' : ''), 'hung' + showT,
          { pressed: press ? res.stuck : (locked ? units.length : undefined), delay: press ? self._ms(self.PRESS_MS) : 0, ring: press && !res.full && !res.short ? res.peelAt : -1, dots: r.level === 'syllables', room: r.level === 'family' ? 0 : (self._L.pic + 20) / 0.6, floor: 40 });
        if (press && !res.full) el.style.setProperty('--ntg-peel-at', self._ms(res.stuck * self.PRESS_MS + 150) + 'ms');
        el.setAttribute('aria-label', self._t('ariaTag', { word: tag.word }));
        if (!locked && !press) self._bindDrag(el, showT);
        if (locked && v.won) { var bow = self.api.el('span', 'ntg-bow'); bow.setAttribute('aria-hidden', 'true'); el.appendChild(bow); }
        cell.appendChild(el);
      }
      /* the glue mark: where a tag just peeled, its stuck letters stay printed faintly */
      if (!press && st.show && st.last && st.last.result === 'peel' && st.last.peels) st.last.peels.forEach(function (pp) {
        if (pp.frame !== f || !pp.stuck || v.glueGone) return;
        var g = self.api.el('span', 'ntg-glue'); g.setAttribute('aria-hidden', 'true');
        var u = r.level === 'syllables' ? C.builtWord(st) : Array.from(C.tagsOf(st)[pp.tag].word);
        g.textContent = u.slice(0, pp.stuck).join(''); cell.appendChild(g);
      });
      if (help) { var gn = self.api.el('span', 'ntg-ghostname'); gn.textContent = r.level === 'syllables' ? p.parts.join('·') : p.word; gn.setAttribute('aria-hidden', 'true'); cell.appendChild(gn); }
      wall.appendChild(cell);
    })(f);
    this._board.appendChild(wall);
  },
  _paintCards: function () {
    var st = this.st, r = st.r, C = NameTagCore, self = this, v = this._view;
    var grid = this.api.el('div', 'ntg-cards');
    st.cards.forEach(function (c, i) {
      var up = C.isUp(st, i), found = st.found.indexOf(c.i + ':' + c.kind) >= 0, w = r.words[c.i];
      var b = self.api.el('button', 'ntg-card' + (up ? ' is-up' : '') + (found ? ' is-found' : '') + (v.flipped === i ? ' is-turn' : '') + (v.miss && v.miss.indexOf(i) >= 0 ? ' is-miss' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'card' + i); b.setAttribute('data-i', i);
      if (!up) { b.setAttribute('aria-label', self._t('ariaCardDown', { n: i + 1 })); b.innerHTML = '<span class="ntg-back" aria-hidden="true"></span>'; }
      else if (c.kind === 'pic') {
        b.setAttribute('aria-label', self._t('ariaCardPic', { n: i + 1 }));
        b.innerHTML = '<img alt="" draggable="false" src="' + self._pic(w.pic) + '">';
        if (found) { var tg = self._tagEl(Array.from(w.word), 'is-on-card is-stuck', null, { div: true, pressed: w.letters.length }); b.appendChild(tg); }
      } else {
        b.setAttribute('aria-label', self._t('ariaCardTag', { n: i + 1, word: w.word }));
        var ring = v.miss && v.miss.indexOf(i) >= 0 && v.test && !v.test.full && !v.test.short ? v.test.peelAt : -1;
        b.appendChild(self._tagEl(Array.from(w.word), 'is-card-tag', null, { div: true, ring: ring }));
      }
      b.addEventListener('click', function () { self._flip(i); });
      grid.appendChild(b);
    });
    this._board.appendChild(grid);
  },

  /* ---------------- the hand ---------------- */
  _select: function (t) { if (this._busy || this.st.done) return; this._sel = this._sel === t ? -1 : t; this.api.sound(500); this._paint(); },
  _frameTap: function (f) {
    var st = this.st, C = NameTagCore; if (this._busy) return;
    if (this._sel >= 0) { this._hang(this._sel, f); return; }
    var hungT = st.hung.indexOf(f);
    if (hungT >= 0 && !st.done && !(st.locked && st.locked[hungT])) { if (C.unhang(st, hungT)) { this.api.sound(330); this._view = {}; this._paint(); } return; }
    this._say(C.wallAt(st, f).word);
  },
  _hang: function (t, f) {
    var st = this.st; if (this._busy || st.done) return;
    if (NameTagCore.hang(st, t, f)) { this._sel = -1; this._view = {}; this.api.sound(587); this._paint(); }
  },
  _join: function (pi) { if (this._busy) return; if (NameTagCore.join(this.st, pi)) { this.api.sound(659); this._view = {}; this._paint(); } },
  _unjoin: function () { if (this._busy) return; if (NameTagCore.unjoin(this.st)) { this._sel = -1; this.api.sound(330); this._view = {}; this._paint(); } },
  _bindDrag: function (b, t) {
    var self = this;
    b.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || (ev.button !== undefined && ev.button !== 0)) return;
      var sx = ev.clientX, sy = ev.clientY, moved = false, ghost = null;
      try { b.setPointerCapture(ev.pointerId); } catch (e) {}
      var hitAt = function (x, y) { var fr = self._wrap.querySelectorAll('.ntg-cell'); for (var z = 0; z < fr.length; z++) { var rc = fr[z].getBoundingClientRect(); if (x >= rc.left - 6 && x <= rc.right + 6 && y >= rc.top - 6 && y <= rc.bottom + 6) return z; } return -1; };
      var move = function (e) {
        if (!moved && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!moved) { moved = true; self._drag = {}; ghost = b.cloneNode(true); ghost.className += ' ntg-ghost'; ghost.removeAttribute('data-k'); document.body.appendChild(ghost); b.classList.add('is-lifted'); }
        var gr = ghost.getBoundingClientRect(); ghost.style.left = (e.clientX - gr.width / 2) + 'px'; ghost.style.top = (e.clientY - gr.height / 2) + 'px';
        var h = hitAt(e.clientX, e.clientY);
        [].forEach.call(self._wrap.querySelectorAll('.ntg-frame'), function (s, i) { s.classList.toggle('is-over', i === h); });
      };
      var up = function (e) {
        b.removeEventListener('pointermove', move); b.removeEventListener('pointerup', up); b.removeEventListener('pointercancel', up);
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        b.classList.remove('is-lifted');
        if (!moved) { self._drag = null; if (e.type === 'pointerup') { if (self.st.hung[t] >= 0) { if (NameTagCore.unhang(self.st, t)) { self.api.sound(330); self._view = {}; self._paint(); } } else self._select(t); } return; }
        var h = hitAt(e.clientX, e.clientY); self._drag = null;
        if (h >= 0) self._hang(t, h);
        else { var tr = self._tray && self._tray.getBoundingClientRect(); if (tr && self.st.hung[t] >= 0 && e.clientY >= tr.top - 10 && e.clientY <= tr.bottom + 10 && NameTagCore.unhang(self.st, t)) { self._view = {}; } self._paint(); }
      };
      b.addEventListener('pointermove', move); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up);
      ev.preventDefault();
    });
    b.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); if (self.st.hung[t] >= 0) { if (NameTagCore.unhang(self.st, t)) { self._view = {}; self._paint(); } } else self._select(t); } });
  },
  _flip: function (c) {
    var st = this.st, C = NameTagCore, self = this; if (this._busy || st.done) return;
    var res = C.flip(st, c); if (!res) return;
    this.api.sound(res.kase === 'miss' ? 330 : 587);
    this._view = { flipped: c };
    if (res.kase === 'one') { this._paint(); return; }
    if (res.kase === 'pair') { this.api.sound(784); this.api.announce(this._t('ariaOn', { word: st.r.words[res.i].word })); this._paint(); return; }
    if (res.kase === 'done') { this.api.announce(this._t('ariaOn', { word: st.r.words[st.cards[c].i].word })); return this._win(); }
    /* a miss: the two cards stay up a moment (a tag on the wrong picture shows where it would peel), then turn back */
    this._busy = true; this._view = { flipped: c, miss: st.up.slice(), test: res.test };
    this._paint();
    this._later(function () { C.settle(st); self._busy = false; self._view = {}; self._paint(); }, 1200);   /* read, not animated: 1.2 s at any speed */
  },
  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = NameTagCore, r = st.r;
    /* what is on the wall before the model judges it (a peeled tag leaves the frame) */
    var tags = [], frames = [], units = [];
    st.hung.forEach(function (f, t) { if (f >= 0 && !(st.locked && st.locked[t])) { tags.push(t); frames.push(f); units.push(self._units(C.tagsOf(st)[t])); } });
    var ready = C.tagReady(st);
    var tests = ready ? tags.map(function (t) { return C.test(st, t); }) : [];
    var res = C.check(st);
    if (res.kase === 'empty' || res.kase === 'tray' || res.kase === 'join') { this.api.sound(460); this._view = {}; this._paint(); return; }
    var longest = 0; tests.forEach(function (x, i) { longest = Math.max(longest, x.full ? units[i].length : x.stuck); });
    this._busy = true; this._sel = -1;
    this._view = { press: { tags: tags, frames: frames, units: units, res: tests } };
    this.api.sound(523); this._paint();
    for (var i = 1; i <= longest; i++) (function (i) { self._later(function () { self.api.sound(392 + i * 40); }, self._ms(i * self.PRESS_MS)); })(i);
    if (res.ok) { if (r.level !== 'family') this.api.announce(this._t('ariaOn', { word: r.tag.word })); this._say(r.level === 'family' ? '' : r.tag.word); return this._win(longest); }
    /* the peel: curl, lift, flutter back to the tray (500 ms), then the glue mark stays 2 s */
    this._later(function () { self.api.sound(196); }, this._ms(longest * this.PRESS_MS + 200));
    this._later(function () {
      self._busy = false; self._view = {}; self._paint();
      self.api.announce(self._note.textContent || '');
      self._later(function () { if (!self._view.press && !self._busy) { self._view.glueGone = true; self._paint(); } }, 2000);   /* the glue mark is read, not animated: it stays 2 s at any speed */
    }, this._ms(longest * this.PRESS_MS + 850));
  },
  _win: function (longest) {
    var self = this;
    this._later(function () {
      self._view = { won: true };
      self.api.sound(659); self._later(function () { self.api.sound(784); }, 110); self._later(function () { self.api.sound(1046); }, 220);
      self._busy = false; self._paint();
    }, this._ms((longest || 0) * this.PRESS_MS + 450));
    this._later(function () { self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS));
  }
};

var ntgCssDone = false;
function injectNameTagCSS() {
  if (ntgCssDone || typeof document === 'undefined') return;
  ntgCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)', R = '\'Andika\',var(--lcs-font-body,Nunito,sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ntg-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:14px;--ntg-ink:#2A2A35;--ntg-teal:#146B5E;--ntg-coral:#F2784B;--ntg-cream:#FFF8EC;--ntg-cork:#E8D5B0;user-select:none;-webkit-user-select:none;}'
  + '.ntg-wrap:focus{outline:none;}'
  + '.ntg-board{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'
  + '.ntg-wrap.is-wide .ntg-board{flex-direction:row-reverse;justify-content:center;align-items:flex-start;gap:20px;}'
  + '.ntg-wrap.is-wide .ntg-tray{flex:1;max-width:250px;flex-direction:column;align-self:center;}'
  /* the tray */
  + '.ntg-tray{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;min-height:calc(var(--ntg-font) * 1.7);}'
  /* the tag: a cream luggage tag with a punched hole and a string */
  + '.ntg-tag{position:relative;display:inline-flex;align-items:center;gap:6px;padding:8px 14px 8px 26px;border:0;border-radius:12px;background:var(--ntg-cream);box-shadow:inset 0 0 0 3px var(--ntg-ink),0 4px 0 #CDBFA6;color:var(--ntg-ink);cursor:pointer;touch-action:none;font-family:' + R + ';min-height:44px;}'
  + '.ntg-hole{position:absolute;left:9px;top:50%;width:9px;height:9px;margin-top:-4.5px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px var(--ntg-ink);}'
  + '.ntg-hole::before{content:"";position:absolute;right:6px;top:3px;width:18px;height:2px;background:#9A7B55;transform:rotate(-24deg);transform-origin:right center;}'
  + '.ntg-letters{display:inline-flex;align-items:baseline;}'
  + '.ntg-l{display:inline-block;min-width:.62em;text-align:center;font-size:var(--ntg-font);font-weight:700;line-height:1.15;color:#4A4652;border-radius:6px;}'
  + '.ntg-l.is-part{min-width:0;padding:0 1px;}'
  + '.ntg-dot{font-size:calc(var(--ntg-font) * .7);color:#B2A794;padding:0 1px;}'
  + '.ntg-tag.is-small .ntg-l{font-size:calc(var(--ntg-font) * .7);} .ntg-tag.is-small{padding:6px 10px 6px 22px;} .ntg-tag.is-small .ntg-dot{font-size:calc(var(--ntg-font) * .5);}'
  + '.ntg-tag.is-sel{transform:translateY(-6px);box-shadow:inset 0 0 0 3px var(--ntg-coral),0 0 0 4px rgba(242,120,75,.35),0 6px 0 #CDBFA6;}'
  + '.ntg-tag.is-lifted{opacity:.35;} .ntg-ghost{position:fixed !important;z-index:9999;pointer-events:none;box-shadow:inset 0 0 0 3px var(--ntg-ink),0 10px 18px rgba(0,0,0,.22) !important;}'
  + '.ntg-l.is-ring{box-shadow:0 0 0 3px var(--ntg-coral);background:#FFE3D6;color:#A6461F;}'
  + '.ntg-l.is-finger{animation:ntg-finger .45s ease-in-out 1 both;} @keyframes ntg-finger{0%,100%{background:transparent;}50%{background:#FFE9A8;}}'
  + '.ntg-wrap .ntg-tag.is-tray .ntg-l.is-finger{margin:0 3px;}'
  /* pressing down: each stuck letter darkens to full ink with a sheen */
  + '.ntg-l.is-stick{animation:ntg-press .18s ease-out both;color:var(--ntg-ink);} @keyframes ntg-press{0%{color:#4A4652;transform:translateY(-3px);}100%{color:#15131A;transform:none;text-shadow:0 1px 0 rgba(255,255,255,.7);}}'
  + '.ntg-tag.is-peel{animation:ntg-peel .55s ease-in var(--ntg-peel-at,0ms) both;transform-origin:left center;} @keyframes ntg-peel{0%{transform:none;opacity:1;}35%{transform:rotate(-14deg) translateY(-6px);}100%{transform:rotate(-30deg) translate(-20px,46px);opacity:0;}}'
  + '.ntg-tag.is-stuck{box-shadow:inset 0 0 0 3px var(--ntg-teal),0 3px 0 #9EC6BC;cursor:default;}'
  + '.ntg-bow{position:absolute;left:-6px;top:-10px;width:22px;height:14px;background:var(--ntg-coral);clip-path:polygon(0 0,50% 40%,100% 0,100% 100%,50% 60%,0 100%);}'
  /* syllables: the tag being built + loose pieces */
  + '.ntg-build{display:flex;justify-content:center;width:100%;} .ntg-tag.is-building{cursor:default;min-width:120px;} .ntg-gap{display:inline-block;width:calc(var(--ntg-font) * 1.1);height:calc(var(--ntg-font) * .9);margin:0 3px;border-radius:6px;border:2px dashed #C9BCA3;}'
  + '.ntg-pieces{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;width:100%;}'
  + '.ntg-piece{min-height:48px;min-width:48px;padding:4px 12px;border:0;border-radius:10px;background:#FDE2D4;box-shadow:inset 0 0 0 3px var(--ntg-ink),0 4px 0 #CDBFA6;font-family:' + R + ';font-weight:700;font-size:calc(var(--ntg-font) * .8);color:var(--ntg-ink);cursor:pointer;}'
  + '.ntg-apart{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border:0;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px #B2A794;color:#8A7E6A;cursor:pointer;}'
  /* the cork wall: 2 × 2 frames, each with a hook */
  + '.ntg-wall{display:grid;grid-template-columns:repeat(2,auto);gap:12px 14px;padding:14px;border-radius:14px;background:var(--ntg-cork);box-shadow:inset 0 0 0 2px var(--ntg-ink);background-image:radial-gradient(rgba(140,105,60,.18) 1px,transparent 1.5px);background-size:9px 9px;}'
  + '.ntg-wall.is-weave{background-color:#CDE9E1;background-image:repeating-linear-gradient(45deg,rgba(20,107,94,.18) 0 6px,transparent 6px 12px),repeating-linear-gradient(-45deg,rgba(242,120,75,.18) 0 6px,transparent 6px 12px);animation:ntg-weave .6s ease-out;} @keyframes ntg-weave{0%{background-color:var(--ntg-cork);}}'
  + '.ntg-cell{position:relative;display:flex;flex-direction:column;align-items:center;}'
  + '.ntg-frame{position:relative;display:flex;align-items:center;justify-content:center;width:calc(var(--ntg-pic) + 20px);height:calc(var(--ntg-pic) + 18px);padding:0;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px var(--ntg-ink),0 3px 0 rgba(42,42,53,.18);cursor:pointer;}'
  + '.ntg-frame img{width:var(--ntg-pic);height:var(--ntg-pic);object-fit:contain;pointer-events:none;}'
  + '.ntg-frame.is-over{box-shadow:inset 0 0 0 4px var(--ntg-coral),0 3px 0 rgba(42,42,53,.18);}'
  + '.ntg-frame.is-win{box-shadow:inset 0 0 0 4px var(--ntg-teal),0 0 0 5px rgba(20,107,94,.22);}'
  + '.ntg-hook{position:absolute;left:50%;bottom:-6px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#C9A24A;box-shadow:inset 0 0 0 2px #8C6A20;}'
  + '.ntg-cell .ntg-tag.is-hung{margin-top:6px;}'
  + '.ntg-cell .ntg-tag.is-hung:not(.is-small) .ntg-l{font-size:calc(var(--ntg-font) * .6);} .ntg-cell .ntg-tag.is-hung{padding:4px 10px 4px 22px;min-height:44px;} .ntg-cell .ntg-tag.is-hung .ntg-l.is-part{font-size:calc(var(--ntg-font) * .5);} .ntg-cell .ntg-tag.is-hung .ntg-dot{font-size:calc(var(--ntg-font) * .4);}'
  + '.ntg-cell .ntg-tag.is-small .ntg-l{font-size:calc(var(--ntg-font) * .55);}'
  + '.ntg-glue{position:absolute;left:8px;bottom:calc(100% - var(--ntg-pic) - 16px);font-family:' + R + ';font-weight:700;font-size:calc(var(--ntg-font) * .5);color:rgba(42,42,53,.32);pointer-events:none;}'
  + '.ntg-ghostname{margin-top:4px;font-family:' + R + ';font-weight:700;font-size:calc(var(--ntg-font) * .48);color:#6F6A76;letter-spacing:.06em;}'
  /* memory cards */
  + '.ntg-cards{display:grid;grid-template-columns:repeat(3,var(--ntg-card));gap:12px;padding:14px;border-radius:14px;background:var(--ntg-cork);box-shadow:inset 0 0 0 2px var(--ntg-ink);}'
  + '.ntg-card{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:var(--ntg-card);height:calc(var(--ntg-card) * 1.12);padding:4px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px var(--ntg-ink),0 3px 0 rgba(42,42,53,.18);cursor:pointer;overflow:hidden;}'
  + '.ntg-card img{width:calc(var(--ntg-card) - 16px);height:calc(var(--ntg-card) - 16px);object-fit:contain;pointer-events:none;}'
  + '.ntg-back{position:absolute;inset:6px;border-radius:7px;background:var(--ntg-teal);background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.14) 0 5px,transparent 5px 10px);}'
  + '.ntg-card.is-turn{animation:ntg-turn .3s ease-out;} @keyframes ntg-turn{0%{transform:perspective(600px) rotateY(90deg);}100%{transform:none;}}'
  + '.ntg-card.is-found{box-shadow:inset 0 0 0 3px var(--ntg-teal),0 0 0 4px rgba(20,107,94,.2);}'
  + '.ntg-card.is-miss{box-shadow:inset 0 0 0 3px var(--ntg-coral),0 3px 0 rgba(42,42,53,.18);}'
  + '.ntg-tag.is-card-tag,.ntg-tag.is-on-card{cursor:inherit;padding:3px 7px 3px 18px;min-height:0;} .ntg-tag.is-card-tag .ntg-l,.ntg-tag.is-on-card .ntg-l{font-size:calc(var(--ntg-card) * .24);} .ntg-tag.is-card-tag .ntg-hole,.ntg-tag.is-on-card .ntg-hole{left:6px;}'
  + '.ntg-tag.is-on-card{position:absolute;bottom:4px;left:50%;transform:translateX(-50%);} .ntg-tag.is-on-card .ntg-l{font-size:calc(var(--ntg-card) * .17);}'
  /* the ask strip */
  + '.ntg-ask{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;}'
  + '.ntg-note{flex:1;min-height:28px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--ntg-teal);text-align:center;} .ntg-note:empty{display:none;} .ntg-note.is-ok{font-weight:800;} .ntg-note.is-wrong{color:#A6461F;}'
  + '.ntg-check{min-height:48px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .ntg-check[hidden]{display:none;} .ntg-check:disabled{opacity:.6;}'
  + '.ntg-wrap.is-narrow .ntg-note{text-align:left;}'
  + '.ntg-wrap.is-tiny{gap:8px;} .ntg-wrap.is-tiny .ntg-board{gap:8px;} .ntg-wrap.is-tiny .ntg-wall{gap:6px 8px;padding:8px;} .ntg-wrap.is-tiny .ntg-frame{height:calc(var(--ntg-pic) + 8px);width:calc(var(--ntg-pic) + 14px);} .ntg-wrap.is-tiny .ntg-tray{gap:6px;min-height:0;} .ntg-wrap.is-tiny .ntg-cell .ntg-tag.is-hung{margin-top:3px;} .ntg-wrap.is-tiny .ntg-ghostname{margin-top:1px;line-height:1.1;} .ntg-wrap.is-tiny .ntg-note{font-size:15px;line-height:1.25;}'
  + '.ntg-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.ntg-wrap *{animation-duration:.2s !important;transition:none !important;} .ntg-tag.is-peel{animation:ntg-fade .2s ease-out var(--ntg-peel-at,0ms) both;} @keyframes ntg-fade{100%{opacity:0;}}}';
  var s = document.createElement('style'); s.id = 'ntg-css'; s.textContent = css; document.head.appendChild(s);
}
