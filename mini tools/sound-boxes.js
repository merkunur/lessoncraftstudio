/* =====================================================================
   TOOL #4 — SOUND BOXES (Elkonin boxes)   (sound-boxes.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). First tool of the Premium Tools Program pilot wave.

   PEDAGOGY (locked by the 2026-07-15 expert-ensemble design):
     ONE BOX = ONE PHONEME, never one letter. The child taps/says each
     sound and places a chip; the "letters" state flips chips into
     grapheme tiles (a box can hold "sh"/"sch"/"oe" — one sound, one
     tile). Word banks live in sound-boxes-bank-<locale>.json: each
     word's `boxes` array holds GRAPHEME CHUNKS ALIGNED 1:1 TO PHONEMES,
     so one array drives both the Sounds and Letters modes.
     - split digraph "a_e" (cake): vowel letter in its box + a grey
       magic-e after the last box, joined by a coral arc
     - silentTail (fr chat → t): grey letters outside the last box,
       ignored in Sounds mode (they are not sounds)
     - NO isolated-phoneme TTS anywhere (synthetic "buh" is pedagogy
       poison; the teacher's mouth is the phoneme model). Whole-word TTS
       on the picture; grapheme names spoken only in Letters state via
       the existing type:'syllable' file-first path.
     - no timers, no scores, no shame: a completion is a warm glow +
       the word spoken once + a 2-note chime. Nothing judges placement.

   PREMIUM (free-taste): the first free stage is fully usable; other
   stages are visible-but-locked; custom "This week's words" preview is
   free, activation is premium. Entitlement = /api/auth/me with the
   platform's localStorage Bearer token; any failure → free tier.
   ===================================================================== */
var SoundBoxes = {
  id: 'sound-boxes',

  /* CURATION FLAG: reviewed per-locale during the tool's native fan-out;
     sv/da/no/fi carry [NSR-FLAG] until a native-speaker pass. */
  strings: {
    title:        {en:'Sound Boxes',de:'Lautboxen',fr:'Boîtes à sons',it:'Caselle dei suoni',es:'Cajas de sonidos',pt:'Caixas de sons',nl:'Klankdozen',sv:'Ljudrutor',da:'Lydbokse',no:'Lydbokser',fi:'Äännelaatikot'},
    instruction:  {en:'Tap the picture to hear the word. Put one chip in a box for each sound.',de:'Tippe auf das Bild und hör dir das Wort an. Lege für jeden Laut ein Plättchen in eine Box.',fr:'Touche l’image pour entendre le mot. Pose un jeton dans une case pour chaque son.',it:'Tocca l’immagine per sentire la parola. Metti un gettone in una casella per ogni suono.',es:'Toca la imagen para escuchar la palabra. Pon una ficha en una caja por cada sonido.',pt:'Toque na imagem para ouvir a palavra. Coloque uma ficha em uma caixa para cada som.',nl:'Tik op het plaatje om het woord te horen. Leg voor elke klank een fiche in een vak.',sv:'Tryck på bilden för att höra ordet. Lägg en bricka i en ruta för varje ljud.',da:'Tryk på billedet for at høre ordet. Læg en brik i en boks for hver lyd.',no:'Trykk på bildet for å høre ordet. Legg en brikke i en boks for hver lyd.',fi:'Napauta kuvaa, niin kuulet sanan. Laita yksi nappula laatikkoon jokaista äännettä kohden.'},

    /* settings drawer */
    letters:      {en:'Letters',de:'Buchstaben',fr:'Lettres',it:'Lettere',es:'Letras',pt:'Letras',nl:'Letters',sv:'Bokstäver',da:'Bogstaver',no:'Bokstaver',fi:'Kirjaimet'},
    lettersHidden:{en:'Hidden',de:'Versteckt',fr:'Cachées',it:'Nascoste',es:'Ocultas',pt:'Ocultas',nl:'Verborgen',sv:'Dolda',da:'Skjulte',no:'Skjulte',fi:'Piilossa'},
    lettersReveal:{en:'Reveal as you go',de:'Beim Legen zeigen',fr:'Au fur et à mesure',it:'Rivela man mano',es:'Aparecen al jugar',pt:'Revelar aos poucos',nl:'Toon tijdens het leggen',sv:'Visa efter hand',da:'Vis undervejs',no:'Vis underveis',fi:'Näytä edetessä'},
    lettersShown: {en:'Shown',de:'Sichtbar',fr:'Visibles',it:'Visibili',es:'Visibles',pt:'Visíveis',nl:'Zichtbaar',sv:'Synliga',da:'Synlige',no:'Synlige',fi:'Näkyvissä'},
    soundsFilter: {en:'Word length',de:'Wortlänge',fr:'Longueur du mot',it:'Lunghezza parola',es:'Longitud de la palabra',pt:'Tamanho da palavra',nl:'Woordlengte',sv:'Ordlängd',da:'Ordlængde',no:'Ordlengde',fi:'Sanan pituus'},
    soundsAll:    {en:'All words',de:'Alle Wörter',fr:'Tous les mots',it:'Tutte le parole',es:'Todas las palabras',pt:'Todas as palavras',nl:'Alle woorden',sv:'Alla ord',da:'Alle ord',no:'Alle ord',fi:'Kaikki sanat'},
    sounds23:     {en:'2–3 sounds',de:'2–3 Laute',fr:'2–3 sons',it:'2–3 suoni',es:'2–3 sonidos',pt:'2–3 sons',nl:'2–3 klanken',sv:'2–3 ljud',da:'2–3 lyde',no:'2–3 lyder',fi:'2–3 äännettä'},
    sounds45:     {en:'4–5 sounds',de:'4–5 Laute',fr:'4–5 sons',it:'4–5 suoni',es:'4–5 sonidos',pt:'4–5 sons',nl:'4–5 klanken',sv:'4–5 ljud',da:'4–5 lyde',no:'4–5 lyder',fi:'4–5 äännettä'},
    order:        {en:'Word order',de:'Reihenfolge',fr:'Ordre des mots',it:'Ordine parole',es:'Orden de las palabras',pt:'Ordem das palavras',nl:'Volgorde',sv:'Ordning',da:'Rækkefølge',no:'Rekkefølge',fi:'Järjestys'},
    orderListed:  {en:'In order',de:'Der Reihe nach',fr:'Dans l’ordre',it:'In ordine',es:'En orden',pt:'Em ordem',nl:'Op volgorde',sv:'I ordning',da:'I rækkefølge',no:'I rekkefølge',fi:'Järjestyksessä'},
    orderShuffled:{en:'Shuffled',de:'Gemischt',fr:'Mélangés',it:'Mescolate',es:'Mezcladas',pt:'Embaralhadas',nl:'Door elkaar',sv:'Blandad ordning',da:'Blandede',no:'Blandet',fi:'Sekoitettu'},
    chipStyle:    {en:'Chip shape',de:'Plättchen-Form',fr:'Forme du jeton',it:'Forma gettone',es:'Forma de la ficha',pt:'Forma da ficha',nl:'Vorm van de fiche',sv:'Brickform',da:'Brikform',no:'Brikkeform',fi:'Nappulan muoto'},
    shapeDot:     {en:'Dot',de:'Punkt',fr:'Rond',it:'Punto',es:'Punto',pt:'Bolinha',nl:'Stip',sv:'Prick',da:'Prik',no:'Prikk',fi:'Piste'},
    shapeHeart:   {en:'Heart',de:'Herz',fr:'Cœur',it:'Cuore',es:'Corazón',pt:'Coração',nl:'Hart',sv:'Hjärta',da:'Hjerte',no:'Hjerte',fi:'Sydän'},
    shapeStar:    {en:'Star',de:'Stern',fr:'Étoile',it:'Stella',es:'Estrella',pt:'Estrela',nl:'Ster',sv:'Stjärna',da:'Stjerne',no:'Stjerne',fi:'Tähti'},
    chipColor:    {en:'Chip colour',de:'Plättchen-Farbe',fr:'Couleur du jeton',it:'Colore gettone',es:'Color de la ficha',pt:'Cor da ficha',nl:'Kleur van de fiche',sv:'Brickfärg',da:'Brikfarve',no:'Brikkefarge',fi:'Nappulan väri'},
    showImage:    {en:'Show picture',de:'Bild anzeigen',fr:'Afficher l’image',it:'Mostra immagine',es:'Mostrar imagen',pt:'Mostrar imagem',nl:'Plaatje tonen',sv:'Visa bild',da:'Vis billede',no:'Vis bilde',fi:'Näytä kuva'},
    autoSpeak:    {en:'Say new words aloud',de:'Neue Wörter vorsprechen',fr:'Prononcer les nouveaux mots',it:'Pronuncia le parole nuove',es:'Pronunciar las palabras nuevas',pt:'Falar palavras novas',nl:'Nieuwe woorden uitspreken',sv:'Läs upp nya ord',da:'Sig nye ord højt',no:'Si nye ord høyt',fi:'Sano uudet sanat ääneen'},

    /* word panel */
    wordList:     {en:'Word list',de:'Wortliste',fr:'Liste de mots',it:'Elenco di parole',es:'Lista de palabras',pt:'Lista de palavras',nl:'Woordenlijst',sv:'Ordlista',da:'Ordliste',no:'Ordliste',fi:'Sanalista'},
    stagesTab:    {en:'Word lists',de:'Wortlisten',fr:'Listes de mots',it:'Elenchi di parole',es:'Listas de palabras',pt:'Listas de palavras',nl:'Woordenlijsten',sv:'Ordlistor',da:'Ordlister',no:'Ordlister',fi:'Sanalistat'},
    myWordsTab:   {en:'My words',de:'Meine Wörter',fr:'Mes mots',it:'Le mie parole',es:'Mis palabras',pt:'Minhas palavras',nl:'Mijn woorden',sv:'Mina ord',da:'Mine ord',no:'Mine ord',fi:'Omat sanat'},
    myWordsHint:  {en:'Type this week’s words — one per line.',de:'Gib die Wörter der Woche ein – ein Wort pro Zeile.',fr:'Saisissez les mots de la semaine – un par ligne.',it:'Scrivi le parole della settimana: una per riga.',es:'Escribe las palabras de la semana: una por línea.',pt:'Digite as palavras da semana — uma por linha.',nl:'Typ de woorden van deze week – één per regel.',sv:'Skriv veckans ord – ett per rad.',da:'Skriv ugens ord – ét pr. linje.',no:'Skriv ukens ord – ett per linje.',fi:'Kirjoita viikon sanat – yksi sana riville.'},
    addWords:     {en:'Add words',de:'Wörter hinzufügen',fr:'Ajouter les mots',it:'Aggiungi parole',es:'Agregar palabras',pt:'Adicionar palavras',nl:'Woorden toevoegen',sv:'Lägg till ord',da:'Tilføj ord',no:'Legg til ord',fi:'Lisää sanat'},
    seamHint:     {en:'Tap between letters to split or join boxes.',de:'Tippe zwischen die Buchstaben, um Boxen zu teilen oder zu verbinden.',fr:'Touchez entre les lettres pour séparer ou réunir les cases.',it:'Tocca tra le lettere per dividere o unire le caselle.',es:'Toca entre las letras para separar o unir las cajas.',pt:'Toque entre as letras para separar ou juntar as caixas.',nl:'Tik tussen de letters om vakken te splitsen of samen te voegen.',sv:'Tryck mellan bokstäverna för att dela eller slå ihop rutor.',da:'Tryk mellem bogstaverne for at dele bokse eller slå dem sammen.',no:'Trykk mellom bokstavene for å dele eller slå sammen bokser.',fi:'Napauta kirjainten väliä, niin voit jakaa tai yhdistää laatikoita.'},
    useTheseWords:{en:'Use these words',de:'Diese Wörter verwenden',fr:'Utiliser ces mots',it:'Usa queste parole',es:'Usar estas palabras',pt:'Usar estas palavras',nl:'Deze woorden gebruiken',sv:'Använd dessa ord',da:'Brug disse ord',no:'Bruk disse ordene',fi:'Käytä näitä sanoja'},
    premiumLine:  {en:'Custom word lists are part of Premium — your starter words are always free.',de:'Eigene Wortlisten gehören zu Premium – die Startwörter bleiben immer kostenlos.',fr:'Les listes personnalisées font partie de Premium – les mots de départ restent gratuits.',it:'Gli elenchi personalizzati fanno parte di Premium: le parole iniziali restano gratuite.',es:'Las listas personalizadas son parte de Premium: las palabras iniciales siempre son gratis.',pt:'Listas personalizadas fazem parte do Premium — as palavras iniciais são sempre gratuitas.',nl:'Eigen woordenlijsten horen bij Premium – de startwoorden blijven altijd gratis.',sv:'Egna ordlistor ingår i Premium – startorden är alltid gratis.',da:'Egne ordlister er en del af Premium – startordene er altid gratis.',no:'Egne ordlister er en del av Premium – startordene er alltid gratis.',fi:'Omat sanalistat kuuluvat Premiumiin – aloitussanat ovat aina ilmaisia.'},
    unlockLine:   {en:'Unlock all word lists',de:'Alle Wortlisten freischalten',fr:'Débloquer toutes les listes',it:'Sblocca tutti gli elenchi',es:'Desbloquear todas las listas',pt:'Desbloquear todas as listas',nl:'Alle woordenlijsten ontgrendelen',sv:'Lås upp alla ordlistor',da:'Lås alle ordlister op',no:'Lås opp alle ordlister',fi:'Avaa kaikki sanalistat'},
    lockedLabel:  {en:'Premium',de:'Premium',fr:'Premium',it:'Premium',es:'Premium',pt:'Premium',nl:'Premium',sv:'Premium',da:'Premium',no:'Premium',fi:'Premium'},
    boxesCount:   {en:'{n} boxes',de:'{n} Boxen',fr:'{n} cases',it:'{n} caselle',es:'{n} cajas',pt:'{n} caixas',nl:'{n} vakken',sv:'{n} rutor',da:'{n} bokse',no:'{n} bokser',fi:'{n} laatikkoa'},
    wordsCount:   {en:'{n} words',de:'{n} Wörter',fr:'{n} mots',it:'{n} parole',es:'{n} palabras',pt:'{n} palavras',nl:'{n} woorden',sv:'{n} ord',da:'{n} ord',no:'{n} ord',fi:'{n} sanaa'},
    copyLink:     {en:'Copy link to this word',de:'Link zu diesem Wort kopieren',fr:'Copier le lien vers ce mot',it:'Copia il link a questa parola',es:'Copiar el enlace de esta palabra',pt:'Copiar link desta palavra',nl:'Link naar dit woord kopiëren',sv:'Kopiera länk till ordet',da:'Kopiér link til ordet',no:'Kopier lenke til ordet',fi:'Kopioi linkki tähän sanaan'},
    copied:       {en:'Link copied!',de:'Link kopiert!',fr:'Lien copié !',it:'Link copiato!',es:'¡Enlace copiado!',pt:'Link copiado!',nl:'Link gekopieerd!',sv:'Länk kopierad!',da:'Link kopieret!',no:'Lenke kopiert!',fi:'Linkki kopioitu!'},
    /* the trio footer — the SoR phonics family (segment · blend · build) */
    trioLabel:    {en:'Phonics tools:',de:'Werkzeuge zum Lesenlernen:',fr:'Outils de phonologie :',it:'Strumenti fonologici:',es:'Herramientas de conciencia fonológica:',pt:'Ferramentas de alfabetização:',nl:'Klankhulpjes:',sv:'Ljudverktyg:',da:'Lydværktøjer:',no:'Lydverktøy:',fi:'Äännetyökalut:'},
    siblingBbd:   {en:'Blending Board',de:'Lesemaschine',fr:'Tableau de syllabes',it:'Tabellone delle sillabe',es:'Tablero de sílabas',pt:'Quadro de sílabas',nl:'Klankenbord',sv:'Ljudtavla',da:'Lydtavle',no:'Lydtavle',fi:'Tavutaulu'},
    siblingLtl:   {en:'Letter Tiles',de:'Magnetbuchstaben',fr:'Lettres magnétiques',it:'Lettere magnetiche',es:'Letras magnéticas',pt:'Alfabeto móvel',nl:'Letterdoos',sv:'Magnetbokstäver',da:'Magnetbogstaver',no:'Magnetbokstaver',fi:'Magneettikirjaimet'},
    siblingHwd:   {en:'Heart Words',de:'Merkwörter',fr:'Mots à cœur',it:'Parole del cuore',es:'Palabras con corazón',pt:'Palavras de coração',nl:'Hartwoorden',sv:'Hjärteord',da:'Hjerteord',no:'Hjerteord'},

    /* stage buttons + aria */
    prevWord:     {en:'Previous word',de:'Vorheriges Wort',fr:'Mot précédent',it:'Parola precedente',es:'Palabra anterior',pt:'Palavra anterior',nl:'Vorig woord',sv:'Föregående ord',da:'Forrige ord',no:'Forrige ord',fi:'Edellinen sana'},
    nextWord:     {en:'Next word',de:'Nächstes Wort',fr:'Mot suivant',it:'Parola successiva',es:'Palabra siguiente',pt:'Próxima palavra',nl:'Volgend woord',sv:'Nästa ord',da:'Næste ord',no:'Neste ord',fi:'Seuraava sana'},
    hearWord:     {en:'Hear the word',de:'Wort anhören',fr:'Écouter le mot',it:'Ascolta la parola',es:'Escuchar la palabra',pt:'Ouvir a palavra',nl:'Woord beluisteren',sv:'Lyssna på ordet',da:'Hør ordet',no:'Hør ordet',fi:'Kuuntele sana'},
    lettersToggle:{en:'Show letters',de:'Buchstaben zeigen',fr:'Montrer les lettres',it:'Mostra lettere',es:'Mostrar letras',pt:'Mostrar letras',nl:'Letters tonen',sv:'Visa bokstäver',da:'Vis bogstaver',no:'Vis bokstaver',fi:'Näytä kirjaimet'},
    placeChip:    {en:'Place a chip',de:'Plättchen legen',fr:'Poser un jeton',it:'Metti un gettone',es:'Colocar una ficha',pt:'Colocar uma ficha',nl:'Fiche leggen',sv:'Lägg en bricka',da:'Læg en brik',no:'Legg en brikke',fi:'Aseta nappula'},
    boxOf:        {en:'Sound box {i} of {n}',de:'Lautbox {i} von {n}',fr:'Case {i} sur {n}',it:'Casella {i} di {n}',es:'Caja de sonidos {i} de {n}',pt:'Caixa de sons {i} de {n}',nl:'Klankvak {i} van {n}',sv:'Ljudruta {i} av {n}',da:'Lydboks {i} af {n}',no:'Lydboks {i} av {n}',fi:'Äännelaatikko {i}/{n}'},
    stateEmpty:   {en:'empty',de:'leer',fr:'vide',it:'vuota',es:'vacía',pt:'vazia',nl:'leeg',sv:'tom',da:'tom',no:'tom',fi:'tyhjä'},
    stateFilled:  {en:'filled',de:'gefüllt',fr:'remplie',it:'piena',es:'llena',pt:'preenchida',nl:'gevuld',sv:'fylld',da:'fyldt',no:'fylt',fi:'täytetty'},
    toGo:         {en:'{k} to go.',de:'Noch {k}.',fr:'Encore {k}.',it:'Ancora {k}.',es:'Faltan {k}.',pt:'Faltam {k}.',nl:'Nog {k}.',sv:'{k} kvar.',da:'{k} tilbage.',no:'{k} igjen.',fi:'{k} jäljellä.'},
    /* singular form — es/pt verbs inflect (Falta 1 / Faltam 2) */
    toGoOne:      {en:'1 to go.',de:'Noch 1.',fr:'Encore 1.',it:'Ancora 1.',es:'Falta 1.',pt:'Falta 1.',nl:'Nog 1.',sv:'1 kvar.',da:'1 tilbage.',no:'1 igjen.',fi:'1 jäljellä.'},
    allSounds:    {en:'All sounds placed! {word}.',de:'Alle Laute gelegt! {word}.',fr:'Tous les sons placés ! {word}.',it:'Tutti i suoni al posto giusto! {word}.',es:'¡Todos los sonidos en su lugar! {word}.',pt:'Todos os sons colocados! {word}.',nl:'Alle klanken gelegd! {word}.',sv:'Alla ljud på plats! {word}.',da:'Alle lyde på plads! {word}.',no:'Alle lyder på plass! {word}.',fi:'Kaikki äänteet paikoillaan! {word}.'},
    blendWord:    {en:'Blend the word',de:'Laute zusammenziehen',fr:'Fusionner les sons',it:'Unisci i suoni',es:'Unir los sonidos',pt:'Juntar os sons',nl:'Klanken plakken',sv:'Ljuda ihop ordet',da:'Træk lydene sammen',no:'Trekk lydene sammen',fi:'Yhdistä äänteet sanaksi'},
    loading:      {en:'Loading words…',de:'Wörter werden geladen…',fr:'Chargement des mots…',it:'Caricamento parole…',es:'Cargando palabras…',pt:'Carregando palavras…',nl:'Woorden laden…',sv:'Laddar ord…',da:'Indlæser ord…',no:'Laster ord…',fi:'Ladataan sanoja…'}
  },

  defaults: {
    letters: 'hidden', sounds: 'all', order: 'ordered',
    chipStyle: 'dot', chipColor: '#F2784B',
    showImage: true, autoSpeak: true
  },

  settings: [
    { key:'letters', type:'choice', labelKey:'letters', options:[
        { value:'hidden', labelKey:'lettersHidden' },
        { value:'reveal', labelKey:'lettersReveal' },
        { value:'shown',  labelKey:'lettersShown'  }
    ]},
    { key:'sounds', type:'choice', labelKey:'soundsFilter', options:[
        { value:'all', labelKey:'soundsAll' },
        { value:'23',  labelKey:'sounds23'  },
        { value:'45',  labelKey:'sounds45'  }
    ]},
    { key:'order', type:'choice', labelKey:'order', options:[
        { value:'ordered',  labelKey:'orderListed'   },
        { value:'shuffled', labelKey:'orderShuffled' }
    ]},
    { key:'chipStyle', type:'choice', labelKey:'chipStyle', options:[
        { value:'dot', labelKey:'shapeDot' },
        { value:'heart', labelKey:'shapeHeart' },
        { value:'star', labelKey:'shapeStar' }
    ]},
    { key:'chipColor', type:'color', labelKey:'chipColor',
      options:['#F2784B','#1B9E8F','#3E78C9','#E5536F','#7B5BD6','#2A2A35'] },
    { key:'showImage', type:'toggle', labelKey:'showImage' },
    { key:'autoSpeak', type:'toggle', labelKey:'autoSpeak' }
  ],

  /* Pitch ladder: placing chips left→right plays a rising pentatonic. */
  PITCHES: [523, 587, 659, 698, 784],
  STORE_KEY: 'lcs:sound-boxes:v1',

  /* Tiny inline fallback so the tool still works if the bank fetch fails
     (offline / 404). English regardless of locale — better than nothing. */
  FALLBACK_BANK: {
    locale: 'en', version: 0,
    stages: [{ id:'s1', label:'Simple words', free:true }],
    words: [
      { id:'cat', noun:'cat', themeDir:'animals', display:'cat', boxes:['c','a','t'], syllables:['cat'], stage:'s1' },
      { id:'dog', noun:'dog', themeDir:'animals', display:'dog', boxes:['d','o','g'], syllables:['dog'], stage:'s1' },
      { id:'sun', noun:'sun', themeDir:'beach',   display:'sun', boxes:['s','u','n'], syllables:['sun'], stage:'s1' },
      { id:'pig', noun:'pig', themeDir:'animals', display:'pig', boxes:['p','i','g'], syllables:['pig'], stage:'s1' },
      { id:'bed', noun:'bed', themeDir:'around the house', display:'bed', boxes:['b','e','d'], syllables:['bed'], stage:'s1' },
      { id:'hat', noun:'hat', themeDir:'accessories', display:'hat', boxes:['h','a','t'], syllables:['hat'], stage:'s1' }
    ]
  },

  /* Per-locale multi-char grapheme inventories for the custom-word
     auto-segmentation heuristic (greedy longest-match, tier 2). Sorted by
     length at use time. Mirrors scripts/verify-sound-boxes-bank.js. */
  GRAPHEME_INVENTORY: {
    en: ['igh','sh','ch','th','wh','ck','ng','ph','ee','oo','oa','ai','ay','ea','ow','ou','oi','oy','aw','au','ew','ue','ar','or','er','ur','ir','ll','ss','ff','zz','gg','tt','dd','nn','mm'],
    de: ['sch','ch','ck','ei','ie','au','eu','äu','ll','ss','ff','tt','nn','mm','pp','rr','tz','ng','qu','ah','eh','oh','uh','aa','ee','oo'],
    fr: ['eau','oeu','ch','ou','oi','on','an','en','in','un','ai','ei','au','eu','gn','ph','ll','ss','tt','nn','mm','rr','pp','qu'],
    es: ['ch','ll','rr','qu','gu'],
    pt: ['ch','lh','nh','rr','ss','qu','gu','ão'],
    it: ['gn','gl','sc','ch','gh','ci','gi','ll','tt','ss','nn','mm','rr','pp','cc','bb','zz','ff','gg','dd'],
    /* nl: NO 'sch' — Dutch sch = s + ch = TWO klanken (the opposite of
       German); joining it would mis-segment every custom sch-word. */
    nl: ['aa','ee','oo','uu','oe','ie','ij','ei','ui','eu','ou','au','ch','ng','nk'],
    sv: ['skj','stj','sj','kj','tj','hj','lj','dj','gj','ll','tt','ss','nn','mm','pp','rr','kk','gg','ck','ng'],
    da: ['sj','hj','sk','ll','tt','ss','nn','mm','pp','rr','kk','gg','dd','bb','ng','aa'],
    no: ['skj','sj','kj','gj','hj','øy','ei','au','ll','tt','ss','nn','mm','pp','rr','kk','gg','dd','bb','ng'],
    fi: ['kk','pp','tt','ss','ll','nn','mm','rr','aa','ee','ii','oo','uu','yy','ää','öö','ng','nk']
  },

  /* =========================== lifecycle =========================== */

  init: function (api) {
    this.api = api;
    this.bank = null;             /* loaded bank (or FALLBACK) */
    this.listId = null;           /* stage id | 'custom' */
    this.wordIdx = 0;
    this.filled = [];             /* bool per box, current word */
    this.lettersNow = null;       /* per-word override from the abc pill */
    this.premium = false;
    this.premiumKnown = false;
    this._orders = {};            /* per-list shuffled index orders */
    this._blendHinted = false;
    this._celebrating = false;
    this._draft = null;           /* custom-entry draft rows */
    this._panelTab = 'stages';

    this._store = this._loadStore();
    /* restore persisted appearance/behavior settings (no accounts yet —
       localStorage IS the v1 Saved-Setup; schema is migration-ready). */
    var saved = this._store.settings || {};
    for (var k in saved) {
      if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    }

    /* deep link: ?list=<stageId|custom>&word=<wordId> */
    var params = new URLSearchParams(location.search);
    this._deepList = params.get('list');
    this._deepWord = params.get('word');

    this._fetchBank();
    this._fetchEntitlement();
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var s = this._store;
    s.lastListId = this.listId;
    s.lastIndexByList = s.lastIndexByList || {};
    s.lastIndexByList[this.listId] = this.wordIdx;
    s.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      s.settings[key] = this.api.settings[key];
    }
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
  },

  _fetchBank: function () {
    var self = this;
    fetch('/mini-tools/sound-boxes-bank-' + this.api.lang + '.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_BANK; })
      .then(function (bank) {
        self.bank = bank;
        self._applyEntryState();
        self.render();
      });
  },

  /* Pick the entry list/word: deep link > stored resume > first free stage. */
  _applyEntryState: function () {
    var s = this._store;
    var list = null;
    if (this._deepList && this._listExists(this._deepList)) list = this._deepList;
    else if (s.lastListId && this._listExists(s.lastListId)) list = s.lastListId;
    else list = this._firstFreeStage();
    this.listId = list;

    var words = this.wordsForList(list);
    var idx = 0;
    if (this._deepWord) {
      for (var i = 0; i < words.length; i++) if (words[i].id === this._deepWord) { idx = i; break; }
    } else if (s.lastIndexByList && typeof s.lastIndexByList[list] === 'number') {
      idx = Math.min(s.lastIndexByList[list], Math.max(0, words.length - 1));
    }
    this.wordIdx = idx;
    this.filled = [];
    this._deepList = this._deepWord = null;
  },

  _fetchEntitlement: function () {
    /* Single seam: premium reaches the tool through this one function.
       Later signed-token upgrade = swap the body. Fail → free tier. */
    var self = this;
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    if (!token) { this.premiumKnown = true; return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var tier = j && j.user && j.user.subscriptionTier;
        var sub = j && j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self.premiumKnown = true;
        if (self._panelEl) self._renderPanel();   /* refresh locks if open */
      })
      .catch(function () { self.premiumKnown = true; });
  },

  /* ============================ data =============================== */

  _firstFreeStage: function () {
    var st = (this.bank && this.bank.stages) || [];
    for (var i = 0; i < st.length; i++) if (st[i].free) return st[i].id;
    return st.length ? st[0].id : null;
  },
  _listExists: function (id) {
    if (id === 'custom') return !!(this._store.customList && this._store.customList.words && this._store.customList.words.length);
    var st = (this.bank && this.bank.stages) || [];
    for (var i = 0; i < st.length; i++) if (st[i].id === id) return true;
    return false;
  },
  _stageById: function (id) {
    var st = (this.bank && this.bank.stages) || [];
    for (var i = 0; i < st.length; i++) if (st[i].id === id) return st[i];
    return null;
  },
  _stageUnlocked: function (stage) {
    return !!(stage && (stage.free || this.premium));
  },

  /* Words for a list, with the sounds-count filter + session order applied. */
  wordsForList: function (listId) {
    var raw;
    if (listId === 'custom') {
      var cl = this._store.customList;
      raw = ((cl && cl.words) || []).map(function (w, i) {
        return { id: 'custom-' + i, display: w.text, boxes: w.boxes, syllables: [w.text], stage: 'custom', noun: w.noun || null, themeDir: w.themeDir || null };
      });
    } else {
      raw = ((this.bank && this.bank.words) || []).filter(function (w) { return w.stage === listId; });
    }
    var f = this.api.settings.sounds;
    if (f === '23') raw = raw.filter(function (w) { return w.boxes.length <= 3; });
    else if (f === '45') raw = raw.filter(function (w) { return w.boxes.length >= 4; });

    if (this.api.settings.order === 'shuffled' && raw.length > 1) {
      var key = listId + ':' + f;
      var ord = this._orders[key];
      if (!ord || ord.length !== raw.length) {
        ord = raw.map(function (_, i) { return i; });
        for (var i = ord.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var t = ord[i]; ord[i] = ord[j]; ord[j] = t;
        }
        this._orders[key] = ord;
      }
      raw = ord.map(function (i) { return raw[i]; });
    }
    return raw;
  },

  currentWord: function () {
    var words = this.wordsForList(this.listId);
    if (!words.length) return null;
    if (this.wordIdx >= words.length) this.wordIdx = 0;
    return words[this.wordIdx];
  },

  /* letters state actually in force for the current word */
  lettersState: function () {
    return this.lettersNow !== null ? this.lettersNow : this.api.settings.letters;
  },

  imgUrl: function (w) {
    return '/image-library-webp/themes/' + w.themeDir + '/' + w.noun + '@2x.webp';
  },

  /* split-digraph helper: "a_e" → {main:'a', tail:'e'} ; else null */
  splitToken: function (box) {
    var m = /^(.+)_(.+)$/.exec(box);
    return m ? { main: m[1], tail: m[2] } : null;
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    this._celebrating = false;

    /* projector width: widen the shell card for this box-dominant tool */
    document.body.classList.add('sbx-wide');

    var wrap = api.el('div', 'sbx-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    if (!this.bank) {   /* bank still loading — calm shimmer, no menu */
      var load = api.el('div', 'sbx-loading');
      load.textContent = api.t('loading');
      wrap.appendChild(load);
      return;
    }

    var word = this.currentWord();
    var words = this.wordsForList(this.listId);

    /* ---- list pill ---- */
    var pillRow = api.el('div', 'sbx-pillrow');
    var pill = api.el('button', 'sbx-pill');
    pill.type = 'button';
    var stageObj = this.listId === 'custom' ? { label: api.t('myWordsTab') } : this._stageById(this.listId);
    pill.textContent = (stageObj ? stageObj.label : '') + (words.length ? '  ·  ' + (this.wordIdx + 1) + '/' + words.length : '');
    pill.setAttribute('aria-label', api.t('wordList'));
    pill.addEventListener('click', function () { self._openPanel(); });
    pillRow.appendChild(pill);
    wrap.appendChild(pillRow);

    if (!word) {   /* empty filtered list — send teacher to the panel */
      var none = api.el('div', 'sbx-loading');
      none.textContent = api.t('stagesTab');
      wrap.appendChild(none);
      return;
    }

    this.filled = word.boxes.map(function () { return false; });
    this.lettersNow = null;

    /* ---- picture card row ---- */
    var cardRow = api.el('div', 'sbx-cardrow');
    var prev = this._navBtn('prev', api.t('prevWord'), function () { self.step(-1); });
    var next = this._navBtn('next', api.t('nextWord'), function () { self.step(1); });

    var card = api.el('button', 'sbx-picture');
    card.type = 'button';
    card.setAttribute('aria-label', word.display + '. ' + api.t('hearWord'));
    if (api.settings.showImage && word.noun && word.themeDir) {
      var img = document.createElement('img');
      img.alt = '';
      img.draggable = false;
      img.src = this.imgUrl(word);
      card.appendChild(img);
    } else {
      var spk = api.el('div', 'sbx-bigspeaker');
      spk.innerHTML = this._speakerSVG(64);
      card.appendChild(spk);
    }
    var badge = api.el('span', 'sbx-speaker-badge');
    badge.innerHTML = this._speakerSVG(18);
    card.appendChild(badge);
    card.addEventListener('click', function () { self.speakWord(); });

    /* printed word appears ONLY when letters are in force (never leak
       the spelling in pure phonemic-awareness mode). */
    var cardWrap = api.el('div', 'sbx-cardwrap');
    cardWrap.appendChild(card);
    var wordLabel = api.el('div', 'sbx-wordlabel');
    wordLabel.textContent = word.display;
    cardWrap.appendChild(wordLabel);

    cardRow.append(prev, cardWrap, next);
    wrap.appendChild(cardRow);
    this._cardEl = card;

    /* ---- box row ---- */
    var boxRow = api.el('div', 'sbx-boxrow');
    boxRow.style.setProperty('--sbx-n', String(word.boxes.length));
    boxRow.setAttribute('role', 'group');
    boxRow.setAttribute('aria-label', api.t('title') + ': ' + (this.lettersState() !== 'hidden' ? word.display : ''));
    this._boxEls = [];
    for (var i = 0; i < word.boxes.length; i++) {
      (function (idx) {
        var box = api.el('button', 'sbx-box');
        box.type = 'button';
        box.addEventListener('click', function () { self.onBoxTap(idx); });
        box.addEventListener('keydown', function (e) {
          if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); self.removeAt(idx); }
          else if (e.key === 'ArrowLeft' && idx > 0) { e.preventDefault(); self._boxEls[idx - 1].focus(); }
          else if (e.key === 'ArrowRight' && idx < self._boxEls.length - 1) { e.preventDefault(); self._boxEls[idx + 1].focus(); }
        });
        self._attachBoxDragOut(box, idx);
        boxRow.appendChild(box);
        self._boxEls.push(box);
      }(i));
    }
    /* silent tail + magic-e tail slot (grey, outside the last box) */
    var tail = this._tailText(word);
    if (tail) {
      var tailEl = api.el('span', 'sbx-tail');
      tailEl.textContent = tail;
      tailEl.setAttribute('aria-hidden', 'true');
      boxRow.appendChild(tailEl);
      this._tailEl = tailEl;
    } else this._tailEl = null;
    /* arc overlay (split digraph) drawn after layout */
    var arc = api.el('svg');
    wrap.appendChild(boxRow);
    this._boxRow = boxRow;

    /* ---- blend bar (appears when complete) ---- */
    var blend = api.el('div', 'sbx-blendbar');
    blend.setAttribute('role', 'button');
    blend.setAttribute('tabindex', '0');
    blend.setAttribute('aria-label', api.t('blendWord'));
    blend.innerHTML = '<span class="sbx-chevrons" aria-hidden="true">›››</span>';
    this._attachBlend(blend);
    wrap.appendChild(blend);
    this._blendEl = blend;

    /* ---- tray row ---- */
    var trayRow = api.el('div', 'sbx-trayrow');
    var tray = api.el('div', 'sbx-tray');
    this._chipEls = [];
    for (var c = 0; c < word.boxes.length; c++) {
      (function (idx) {
        var chip = api.el('button', 'sbx-chip');
        chip.type = 'button';
        chip.setAttribute('aria-label', api.t('placeChip'));
        chip.innerHTML = api.token(api.settings.chipStyle, api.settings.chipColor, 64);
        chip.addEventListener('click', function () { self.placeNext(); });
        self._attachChipDrag(chip);
        tray.appendChild(chip);
        self._chipEls.push(chip);
      }(c));
    }
    var abc = api.el('button', 'sbx-abc');
    abc.type = 'button';
    abc.textContent = 'abc';
    abc.setAttribute('aria-label', api.t('lettersToggle'));
    abc.setAttribute('aria-pressed', String(this.lettersState() !== 'hidden'));
    abc.addEventListener('click', function () { self.toggleLetters(); });
    trayRow.append(tray, abc);
    wrap.appendChild(trayRow);
    this._abcEl = abc;
    this._trayEl = tray;

    /* word-entrance animation */
    if (!this._reducedMotion()) {
      cardWrap.classList.add('sbx-enter');
      this._boxEls.forEach(function (b, i) {
        b.style.animationDelay = (i * 40) + 'ms';
        b.classList.add('sbx-box-enter');
      });
    }

    /* keyboard: word nav + speak + letters + blend at the stage level */
    if (!this._keysBound) {
      this._keysBound = true;
      document.addEventListener('keydown', function (e) {
        if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
        if (self._panelEl && self._panelEl.classList.contains('open')) return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown') { self.step(1); e.preventDefault(); }
        else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { self.step(-1); e.preventDefault(); }
        else if (e.key === ' ' && !(e.target && e.target.classList && (e.target.classList.contains('sbx-box') || e.target.classList.contains('sbx-chip')))) { self.speakWord(); e.preventDefault(); }
        else if (e.key === 'l' || e.key === 'L') { self.toggleLetters(); }
        else if (e.key === 'b' || e.key === 'B') { self.autoBlend(); }
      });
    }

    this.paintBoxes();
    if (api.settings.autoSpeak && !this._firstRenderDone) {
      /* Don't autoplay on very first mount (browser autoplay policies +
         surprise audio); speak on subsequent word arrivals only. */
      this._firstRenderDone = true;
    } else if (api.settings.autoSpeak) {
      this.speakWord();
    }
    this._saveStore();
  },

  paint: function () { this.paintBoxes(); },

  reset: function () {
    /* clear chips for the current word, keep the word */
    for (var i = 0; i < this.filled.length; i++) this.filled[i] = false;
    this._celebrating = false;
    this.paintBoxes();
  },

  onSettings: function (key) {
    if (key === 'sounds' || key === 'order') {
      this.wordIdx = 0;
    }
    this._saveStore();
  },

  /* ====================== box + chip painting ====================== */

  _tailText: function (word) {
    var tail = '';
    for (var i = 0; i < word.boxes.length; i++) {
      var sp = this.splitToken(word.boxes[i]);
      if (sp) tail += sp.tail;
    }
    return tail + (word.silentTail || '');
  },

  /* Repaint every box + tray chip from state. */
  paintBoxes: function () {
    var word = this.currentWord();
    if (!word || !this._boxEls) return;
    var api = this.api;
    var letters = this.lettersState();
    var n = word.boxes.length;

    for (var i = 0; i < n; i++) {
      var box = this._boxEls[i];
      var g = word.boxes[i];
      var sp = this.splitToken(g);
      var face = sp ? sp.main : g;
      box.classList.toggle('filled', this.filled[i]);
      box.classList.remove('sbx-glow');
      var state = this.filled[i] ? api.t('stateFilled') : api.t('stateEmpty');
      var letterPart = (letters !== 'hidden' && this.filled[i]) ? (', ' + face) : '';
      box.setAttribute('aria-label', this.fmt('boxOf', { i: i + 1, n: n }) + ', ' + state + letterPart);

      if (this.filled[i]) {
        if (letters === 'hidden') {
          box.innerHTML = '<span class="sbx-boxchip">' + api.token(api.settings.chipStyle, api.settings.chipColor, 64) + '</span>';
        } else {
          box.innerHTML = this._tileHTML(face, false);
        }
      } else {
        if (letters === 'shown') box.innerHTML = this._tileHTML(face, true);
        else box.innerHTML = '';
      }
    }

    /* tray: ghost the chips that have been placed (left-to-right count) */
    var placed = this.filled.filter(Boolean).length;
    for (var c = 0; c < (this._chipEls || []).length; c++) {
      this._chipEls[c].classList.toggle('ghost', c < placed);
      this._chipEls[c].disabled = c < placed;
    }

    /* word label under the picture: letters in force only */
    var label = this._wrap && this._wrap.querySelector('.sbx-wordlabel');
    if (label) label.classList.toggle('show', letters !== 'hidden');

    /* abc pill state */
    if (this._abcEl) this._abcEl.setAttribute('aria-pressed', String(letters !== 'hidden'));

    /* blend bar visibility — width bound to the actual box row so the
       hero row stays the widest element on stage */
    var complete = placed === n;
    if (this._blendEl) {
      this._blendEl.classList.toggle('show', complete);
      if (complete && this._boxEls.length) {
        var first = this._boxEls[0].getBoundingClientRect();
        var last = this._boxEls[this._boxEls.length - 1].getBoundingClientRect();
        var w = Math.round(last.right - first.left);
        if (w > 40) this._blendEl.style.width = w + 'px';
      }
    }

    /* magic-e arc */
    this._paintArc(word, letters);
  },

  /* grapheme tile: one tile per phoneme; multi-letter graphemes get a
     coral tie-arc under the letters (one sound, one tile). */
  _tileHTML: function (face, dim) {
    var multi = face.length > 1;
    var arc = multi
      ? '<svg class="sbx-tie" viewBox="0 0 60 12" aria-hidden="true"><path d="M4 2 Q30 14 56 2" fill="none" stroke="#F2784B" stroke-width="3" stroke-linecap="round"/></svg>'
      : '';
    return '<span class="sbx-tile' + (dim ? ' dim' : '') + (multi ? ' multi' : '') + '">' +
           '<span class="sbx-tile-txt">' + face + '</span>' + arc + '</span>';
  },

  /* Draw the coral arc from the split-digraph vowel box to the grey tail e. */
  _paintArc: function (word, letters) {
    if (this._arcEl) { this._arcEl.remove(); this._arcEl = null; }
    if (letters === 'hidden' || !this._tailEl) return;
    var splitIdx = -1;
    for (var i = 0; i < word.boxes.length; i++) if (this.splitToken(word.boxes[i])) { splitIdx = i; break; }
    if (splitIdx < 0) return;
    if (!(this.filled[splitIdx] || letters === 'shown')) return;

    var row = this._boxRow;
    var boxR = this._boxEls[splitIdx].getBoundingClientRect();
    var tailR = this._tailEl.getBoundingClientRect();
    var rowR = row.getBoundingClientRect();
    if (!rowR.width) return;
    var x1 = boxR.left + boxR.width / 2 - rowR.left;
    var x2 = tailR.left + tailR.width / 2 - rowR.left;
    var y = boxR.bottom - rowR.top + 6;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'sbx-arc');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.width = rowR.width + 'px';
    svg.style.height = '22px';
    svg.style.top = (y - rowR.height < 0 ? boxR.height + 4 : y - 16) + 'px';
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var mid = (x1 + x2) / 2;
    path.setAttribute('d', 'M' + x1 + ' 4 Q' + mid + ' 22 ' + x2 + ' 4');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#F2784B');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);
    row.appendChild(svg);
    this._arcEl = svg;
  },

  /* ======================== interactions =========================== */

  onBoxTap: function (i) {
    if (this.filled[i]) {
      /* replay: pulse + pitch; speak the grapheme ONLY in letters state
         (never isolated-phoneme TTS). */
      this._pulseBox(i);
      this.api.sound(this.PITCHES[i] || 660);
      var word = this.currentWord();
      if (this.lettersState() !== 'hidden' && word) {
        var sp = this.splitToken(word.boxes[i]);
        LCSAudio.speak({ type: 'syllable', text: sp ? sp.main : word.boxes[i], lang: this.api.lang, rate: 0.85 });
      }
    } else {
      this.placeAt(i);
    }
  },

  placeNext: function () {
    for (var i = 0; i < this.filled.length; i++) {
      if (!this.filled[i]) { this.placeAt(i); return; }
    }
  },

  placeAt: function (i) {
    if (this.filled[i] || this._celebrating) return;
    var self = this;
    var placedBefore = this.filled.filter(Boolean).length;
    var sourceChip = this._chipEls[placedBefore];

    var commit = function () {
      self.filled[i] = true;
      self.paintBoxes();
      self.api.sound(self.PITCHES[i] || 660);
      var n = self.filled.length;
      var left = n - self.filled.filter(Boolean).length;
      if (left === 0) self._celebrate();
      else self.api.announce(self.fmt('boxOf', { i: i + 1, n: n }) + ' ' + self.api.t('stateFilled') + '. ' +
        (left === 1 ? self.api.t('toGoOne') : self.fmt('toGo', { k: left })));
      self.api.track('place', { box: i });
    };

    if (this._reducedMotion() || !sourceChip) { commit(); return; }

    /* chip flight: fixed-position clone from tray chip → box */
    var from = sourceChip.getBoundingClientRect();
    var to = this._boxEls[i].getBoundingClientRect();
    var clone = document.createElement('div');
    clone.className = 'sbx-fly';
    clone.innerHTML = this.api.token(this.api.settings.chipStyle, this.api.settings.chipColor, Math.round(from.width * 0.8));
    clone.style.left = from.left + 'px';
    clone.style.top = from.top + 'px';
    clone.style.width = from.width + 'px';
    clone.style.height = from.height + 'px';
    document.body.appendChild(clone);
    sourceChip.classList.add('ghost');
    requestAnimationFrame(function () {
      clone.style.transform = 'translate(' + (to.left + to.width / 2 - from.left - from.width / 2) + 'px,' +
                              (to.top + to.height / 2 - from.top - from.height / 2) + 'px) scale(1.05)';
    });
    setTimeout(function () {
      clone.remove();
      commit();
      var box = self._boxEls[i];
      box.classList.add('sbx-receive');
      setTimeout(function () { box.classList.remove('sbx-receive'); }, 320);
    }, 240);
  },

  removeAt: function (i) {
    if (!this.filled[i] || this._celebrating) return;
    this.filled[i] = false;
    this.api.sound(330);
    this.paintBoxes();
    this.api.track('remove', { box: i });
  },

  _pulseBox: function (i) {
    var box = this._boxEls[i];
    if (!box) return;
    box.classList.remove('sbx-pulse');
    void box.offsetWidth;   /* restart animation */
    box.classList.add('sbx-pulse');
  },

  /* completion: sequential warm glow → word spoken → 2-note chime. */
  _celebrate: function () {
    var self = this, api = this.api;
    this._celebrating = true;
    var n = this._boxEls.length;
    var word = this.currentWord();
    var stagger = this._reducedMotion() ? 0 : 140;
    this._boxEls.forEach(function (box, i) {
      setTimeout(function () { box.classList.add('sbx-glow'); }, 250 + i * stagger);
    });
    setTimeout(function () {
      self.speakWord();
      api.sound(659);
      setTimeout(function () { api.sound(880); }, 120);
      api.announce(self.fmt('allSounds', { word: word ? word.display : '' }));
      self._celebrating = false;
      if (self._blendEl) {
        self._blendEl.classList.add('show');
        if (!self._blendHinted && !self._reducedMotion()) {
          self._blendHinted = true;
          self._blendEl.classList.add('hint');
          setTimeout(function () { self._blendEl && self._blendEl.classList.remove('hint'); }, 1600);
        }
      }
      setTimeout(function () {
        (self._boxEls || []).forEach(function (b) { b.classList.remove('sbx-glow'); });
      }, 1000);
    }, 250 + n * stagger + 100);
    api.track('complete', { word: word && word.id });
  },

  speakWord: function () {
    var word = this.currentWord();
    if (!word) return;
    LCSAudio.speak({ type: 'word', text: word.display, lang: this.api.lang });
  },

  step: function (dir) {
    var words = this.wordsForList(this.listId);
    if (!words.length) return;
    this.wordIdx = (this.wordIdx + dir + words.length) % words.length;
    this.api.sound(520);
    this.render();
  },

  toggleLetters: function () {
    var cur = this.lettersState();
    this.lettersNow = (cur === 'hidden')
      ? (this.api.settings.letters !== 'hidden' ? this.api.settings.letters : 'shown')
      : 'hidden';
    /* pedagogically nice touch: flipping letters on mid-word keeps chips */
    this.api.sound(this.lettersNow === 'hidden' ? 440 : 587);
    this.paintBoxes();
  },

  /* blend: sequential highlight + rising pitches + the whole word. */
  autoBlend: function () {
    var self = this;
    var placed = this.filled.filter(Boolean).length;
    if (placed !== this.filled.length || !this.filled.length) return;
    var n = this._boxEls.length;
    for (var i = 0; i < n; i++) {
      (function (idx) {
        setTimeout(function () {
          self._pulseBox(idx);
          self.api.sound(self.PITCHES[idx] || 660);
        }, idx * 240);
      }(i));
    }
    setTimeout(function () { self.speakWord(); }, n * 240 + 80);
    this.api.track('blend');
  },

  _attachBlend: function (bar) {
    var self = this;
    var crossed = null;
    bar.addEventListener('click', function () { self.autoBlend(); });
    bar.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self.autoBlend(); }
    });
    /* finger sweep across the (filled) boxes themselves */
    var sweep = function (e) {
      if (!self._boxEls) return;
      for (var i = 0; i < self._boxEls.length; i++) {
        var r = self._boxEls[i].getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && crossed !== i && self.filled[i]) {
          crossed = i;
          self._pulseBox(i);
          self.api.sound(self.PITCHES[i] || 660);
        }
      }
    };
    var down = false;
    bar.addEventListener('pointerdown', function (e) {
      if (!self.filled.length || self.filled.filter(Boolean).length !== self.filled.length) return;
      down = true; crossed = null;
      try { bar.setPointerCapture(e.pointerId); } catch (_) {}
    });
    bar.addEventListener('pointermove', function (e) { if (down) sweep(e); });
    bar.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      if (crossed !== null) self.speakWord();
      crossed = null;
    });
  },

  /* ---- drag: tray chip → box ---- */
  _attachChipDrag: function (chip) {
    var self = this;
    var drag = null;
    chip.addEventListener('pointerdown', function (e) {
      if (chip.disabled) return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false, clone: null };
      try { chip.setPointerCapture(e.pointerId); } catch (_) {}
    });
    chip.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) > 8) {
        drag.moved = true;
        var r = chip.getBoundingClientRect();
        var clone = document.createElement('div');
        clone.className = 'sbx-fly dragging';
        clone.innerHTML = self.api.token(self.api.settings.chipStyle, self.api.settings.chipColor, Math.round(r.width * 0.8));
        clone.style.left = r.left + 'px'; clone.style.top = r.top + 'px';
        clone.style.width = r.width + 'px'; clone.style.height = r.height + 'px';
        document.body.appendChild(clone);
        drag.clone = clone;
        chip.classList.add('ghost');
      }
      if (drag.clone) drag.clone.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.12)';
      /* live drop-target highlight */
      var over = self._boxAt(e.clientX, e.clientY);
      (self._boxEls || []).forEach(function (b, i) { b.classList.toggle('sbx-over', over === i && !self.filled[i]); });
    });
    var up = function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var moved = drag.moved;
      if (drag.clone) drag.clone.remove();
      (self._boxEls || []).forEach(function (b) { b.classList.remove('sbx-over'); });
      chip.classList.remove('ghost');
      var wasDrag = moved;
      drag = null;
      if (wasDrag) {
        var over = self._boxAt(e.clientX, e.clientY);
        if (over !== null && !self.filled[over]) self.placeAt(over);
        else self.paintBoxes();   /* restore ghost states */
        /* prevent the click handler double-firing after a drag */
        var stop = function (ev) { ev.stopPropagation(); ev.preventDefault(); chip.removeEventListener('click', stop, true); };
        chip.addEventListener('click', stop, true);
        setTimeout(function () { chip.removeEventListener('click', stop, true); }, 0);
      }
    };
    chip.addEventListener('pointerup', up);
    chip.addEventListener('pointercancel', up);
  },

  /* ---- drag OUT of a filled box = remove ---- */
  _attachBoxDragOut: function (box, idx) {
    var self = this;
    var drag = null;
    box.addEventListener('pointerdown', function (e) {
      if (!self.filled[idx]) return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
      try { box.setPointerCapture(e.pointerId); } catch (_) {}
    });
    box.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 30) drag.moved = true;
    });
    var up = function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var moved = drag.moved;
      drag = null;
      if (moved) {
        self.removeAt(idx);
        var stop = function (ev) { ev.stopPropagation(); ev.preventDefault(); box.removeEventListener('click', stop, true); };
        box.addEventListener('click', stop, true);
        setTimeout(function () { box.removeEventListener('click', stop, true); }, 0);
      }
    };
    box.addEventListener('pointerup', up);
    box.addEventListener('pointercancel', up);
  },

  _boxAt: function (x, y) {
    for (var i = 0; i < (this._boxEls || []).length; i++) {
      var r = this._boxEls[i].getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return i;
    }
    return null;
  },

  _navBtn: function (dir, label, onClick) {
    var b = this.api.el('button', 'sbx-nav ' + dir);
    b.type = 'button';
    b.setAttribute('aria-label', label);
    b.title = label;
    b.innerHTML = dir === 'prev'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
    b.addEventListener('click', onClick);
    return b;
  },

  _speakerSVG: function (s) {
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
  },

  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /* ========================= word panel ============================ */

  _openPanel: function () {
    if (!this._panelEl) this._buildPanel();
    this._renderPanel();
    this._panelEl.classList.add('open');
    this._scrimEl.classList.add('open');
  },
  _closePanel: function () {
    if (this._panelEl) { this._panelEl.classList.remove('open'); this._scrimEl.classList.remove('open'); }
  },

  _buildPanel: function () {
    var api = this.api, self = this;
    var scrim = api.el('div', 'sbx-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'sbx-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('wordList'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },

  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    panel.innerHTML = '';

    var head = api.el('div', 'sbx-panel-head');
    var tabs = api.el('div', 'sbx-tabs');
    var mkTab = function (id, label) {
      var t = api.el('button', 'sbx-tab' + (self._panelTab === id ? ' active' : ''));
      t.type = 'button';
      t.textContent = label;
      t.addEventListener('click', function () { self._panelTab = id; self._renderPanel(); });
      return t;
    };
    tabs.append(mkTab('stages', api.t('stagesTab')), mkTab('custom', api.t('myWordsTab')));
    var x = api.el('button', 'sbx-panel-close');
    x.type = 'button';
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.setAttribute('aria-label', 'Close');
    x.addEventListener('click', function () { self._closePanel(); });
    head.append(tabs, x);
    panel.appendChild(head);

    var body = api.el('div', 'sbx-panel-body');
    panel.appendChild(body);

    if (this._panelTab === 'stages') this._renderStagesTab(body);
    else this._renderCustomTab(body);

    /* copy-link footer + the sibling cross-link (the daily SoR pair:
       segment here, blend on the Blending Board) */
    var word = this.currentWord();
    if (word) {
      var foot = api.el('div', 'sbx-panel-foot');
      var copy = api.el('button', 'sbx-copylink');
      copy.type = 'button';
      copy.textContent = api.t('copyLink');
      copy.addEventListener('click', function () {
        var url = location.origin + location.pathname + '?lang=' + api.lang + '&list=' + encodeURIComponent(self.listId) + '&word=' + encodeURIComponent(word.id);
        var done = function () { copy.textContent = api.t('copied'); setTimeout(function () { copy.textContent = api.t('copyLink'); }, 1600); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done);
        else { try { prompt('', url); } catch (_) {} done(); }
      });
      var trio = api.el('span');
      trio.style.display = 'inline-flex';
      trio.style.alignItems = 'center';
      trio.style.gap = '4px';
      var trioLbl = api.el('span');
      trioLbl.style.fontFamily = 'var(--lcs-font-body)';
      trioLbl.style.fontWeight = '700';
      trioLbl.style.fontSize = '13px';
      trioLbl.style.color = 'var(--lcs-ink-soft)';
      trioLbl.textContent = api.t('trioLabel') + ' ';
      var sib1 = document.createElement('a');
      sib1.className = 'sbx-copylink';
      sib1.href = '/mini-tools/blending-board.html?lang=' + api.lang;
      sib1.textContent = api.t('siblingBbd');
      var trioDot = trioLbl.cloneNode(false);
      trioDot.textContent = ' · ';
      var sib2 = document.createElement('a');
      sib2.className = 'sbx-copylink';
      sib2.href = '/mini-tools/letter-tiles.html?lang=' + api.lang;
      sib2.textContent = api.t('siblingLtl');
      trio.append(trioLbl, sib1, trioDot, sib2);
      /* Heart Words ships in TEN locales — never link it from the fi build. */
      if (['en','de','fr','it','es','pt','nl','sv','da','no'].indexOf(api.lang) >= 0) {
        var sib3 = document.createElement('a');
        sib3.className = 'sbx-copylink';
        sib3.href = '/mini-tools/heart-words.html?lang=' + api.lang;
        sib3.textContent = api.t('siblingHwd');
        var trioDot2 = trioLbl.cloneNode(false);
        trioDot2.textContent = ' · ';
        trio.append(trioDot2, sib3);
      }
      foot.append(copy, trio);
      foot.style.display = 'flex';
      foot.style.flexWrap = 'wrap';
      foot.style.gap = '10px';
      foot.style.justifyContent = 'space-between';
      panel.appendChild(foot);
    }
  },

  _renderStagesTab: function (body) {
    var api = this.api, self = this;
    var stages = (this.bank && this.bank.stages) || [];
    var wordsAll = (this.bank && this.bank.words) || [];

    stages.forEach(function (st) {
      var unlocked = self._stageUnlocked(st);
      var count = wordsAll.filter(function (w) { return w.stage === st.id; }).length;
      var row = api.el('button', 'sbx-stage-row' + (self.listId === st.id ? ' active' : '') + (unlocked ? '' : ' locked'));
      row.type = 'button';
      var lab = api.el('span', 'sbx-stage-label');
      lab.textContent = st.label;
      var meta = api.el('span', 'sbx-stage-meta');
      meta.textContent = self.fmt('wordsCount', { n: count });
      row.append(lab, meta);
      if (!unlocked) {
        var lock = api.el('span', 'sbx-lock');
        lock.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
        lock.title = api.t('lockedLabel');
        row.appendChild(lock);
      }
      row.addEventListener('click', function () {
        if (!unlocked) {
          /* the lock speaks only when tapped: one warm line + pricing link.
             Rendered BELOW the stage list (never between rows) so the list
             stays whole and the upsell doesn't shout mid-scan. */
          var old = body.querySelector('.sbx-upsell');
          if (old) old.remove();
          var up = api.el('div', 'sbx-upsell');
          var txt = api.el('span'); txt.textContent = api.t('premiumLine');
          var a = document.createElement('a');
          a.href = '/' + api.lang + '/pricing?from=tool-sound-boxes';
          a.target = '_blank'; a.rel = 'noopener';
          a.textContent = api.t('unlockLine');
          up.append(txt, a);
          var grid = body.querySelector('.sbx-wordgrid');
          if (grid) body.insertBefore(up, grid); else body.appendChild(up);
          return;
        }
        self.listId = st.id;
        self.wordIdx = 0;
        self._closePanel();
        self.render();
      });
      body.appendChild(row);
    });

    /* word-thumbnail grid for the ACTIVE stage (picture-first jump) */
    var words = this.wordsForList(this.listId);
    if (this.listId !== 'custom' && words.length) {
      var grid = api.el('div', 'sbx-wordgrid');
      words.forEach(function (w, i) {
        var cell = api.el('button', 'sbx-wordcell' + (i === self.wordIdx ? ' active' : ''));
        cell.type = 'button';
        if (w.noun && w.themeDir) {
          var im = document.createElement('img');
          im.loading = 'lazy'; im.alt = w.display; im.draggable = false;
          im.src = self.imgUrl(w);
          cell.appendChild(im);
        }
        var t = api.el('span'); t.textContent = w.display;
        cell.appendChild(t);
        cell.addEventListener('click', function () {
          self.wordIdx = i;
          self._closePanel();
          self.render();
        });
        grid.appendChild(cell);
      });
      body.appendChild(grid);
    }
  },

  /* ---- custom words: textarea → 3-tier segmentation → seam editor ---- */

  _renderCustomTab: function (body) {
    var api = this.api, self = this;

    var hint = api.el('p', 'sbx-hint');
    hint.textContent = api.t('myWordsHint');
    body.appendChild(hint);

    var ta = document.createElement('textarea');
    ta.className = 'sbx-textarea';
    ta.rows = 3;
    var existing = (this._store.customList && this._store.customList.words) || [];
    if (this._draft === null && existing.length) {
      this._draft = existing.map(function (w) { return { text: w.text, boxes: w.boxes.slice(), noun: w.noun || null, themeDir: w.themeDir || null }; });
    }
    body.appendChild(ta);

    var add = api.el('button', 'sbx-btn');
    add.type = 'button';
    add.textContent = api.t('addWords');
    add.addEventListener('click', function () {
      var words = ta.value.split(/[\s,;]+/).map(function (s) { return s.trim(); })
        .filter(Boolean).slice(0, 20);
      if (!words.length) return;
      self._draft = words.map(function (t) { return self._segment(t); });
      self._renderPanel();
    });
    body.appendChild(add);

    if (this._draft && this._draft.length) {
      var seamHint = api.el('p', 'sbx-hint small');
      seamHint.textContent = api.t('seamHint');
      body.appendChild(seamHint);

      this._draft.forEach(function (row, ri) {
        body.appendChild(self._seamRow(row, ri));
      });

      var use = api.el('button', 'sbx-btn primary' + (self.premium ? '' : ' locked'));
      use.type = 'button';
      use.textContent = api.t('useTheseWords');
      use.addEventListener('click', function () {
        if (!self.premium) {
          var old = body.querySelector('.sbx-upsell');
          if (old) old.remove();
          var up = api.el('div', 'sbx-upsell');
          var txt = api.el('span'); txt.textContent = api.t('premiumLine');
          var a = document.createElement('a');
          a.href = '/' + api.lang + '/pricing?from=tool-sound-boxes';
          a.target = '_blank'; a.rel = 'noopener';
          a.textContent = api.t('unlockLine');
          up.append(txt, a);
          use.insertAdjacentElement('beforebegin', up);
          return;
        }
        self._store.customList = {
          words: self._draft.map(function (r) { return { text: r.text, boxes: r.boxes, noun: r.noun, themeDir: r.themeDir }; }),
          updatedAt: new Date().toISOString()
        };
        self.listId = 'custom';
        self.wordIdx = 0;
        self._saveStore();
        self._closePanel();
        self.render();
      });
      body.appendChild(use);
    }
  },

  /* seam editor row: letters as mini tiles, tappable seams between them. */
  _seamRow: function (row, ri) {
    var api = this.api, self = this;
    var el = api.el('div', 'sbx-seamrow');
    var word = api.el('div', 'sbx-seamword');

    /* boundary set from the boxes array */
    var bounds = [];   /* letter-index after which a boundary sits */
    var acc = 0;
    for (var b = 0; b < row.boxes.length - 1; b++) { acc += row.boxes[b].length; bounds.push(acc); }

    var letters = row.text.split('');
    letters.forEach(function (ch, li) {
      var t = api.el('span', 'sbx-mini');
      t.textContent = ch;
      word.appendChild(t);
      if (li < letters.length - 1) {
        var seam = api.el('button', 'sbx-seam' + (bounds.indexOf(li + 1) >= 0 ? ' cut' : ''));
        seam.type = 'button';
        seam.setAttribute('aria-label', 'split');
        seam.addEventListener('click', function () {
          var pos = li + 1;
          var at = bounds.indexOf(pos);
          if (at >= 0) bounds.splice(at, 1); else { bounds.push(pos); bounds.sort(function (a, b2) { return a - b2; }); }
          /* rebuild boxes from boundaries */
          var boxes = [], prev = 0;
          bounds.concat([letters.length]).forEach(function (p) { boxes.push(row.text.slice(prev, p)); prev = p; });
          row.boxes = boxes;
          self._renderPanel();
        });
        word.appendChild(seam);
      }
    });

    var count = api.el('span', 'sbx-seamcount');
    count.textContent = this.fmt('boxesCount', { n: row.boxes.length });
    el.append(word, count);
    return el;
  },

  /* 3-tier segmentation: bank exact-match → grapheme heuristic. */
  _segment: function (text) {
    var lower = text.toLowerCase();
    var words = (this.bank && this.bank.words) || [];
    for (var i = 0; i < words.length; i++) {
      if (String(words[i].display).toLowerCase() === lower) {
        /* strip split-digraph tokens for custom display (seams are linear) */
        var boxes = [], tail = '';
        for (var b = 0; b < words[i].boxes.length; b++) {
          var sp = this.splitToken(words[i].boxes[b]);
          if (sp) { boxes.push(sp.main); tail += sp.tail; }
          else boxes.push(words[i].boxes[b]);
        }
        if (tail || words[i].silentTail) boxes[boxes.length - 1] += tail + (words[i].silentTail || '');
        return { text: words[i].display, boxes: boxes, noun: words[i].noun, themeDir: words[i].themeDir };
      }
    }
    /* tier 2: greedy longest-match against the locale grapheme inventory */
    var inv = (this.GRAPHEME_INVENTORY[this.api.lang] || []).slice()
      .sort(function (a, b2) { return b2.length - a.length; });
    var out = [], pos = 0;
    while (pos < lower.length) {
      var hit = null;
      for (var g = 0; g < inv.length; g++) {
        if (lower.startsWith(inv[g], pos)) { hit = inv[g]; break; }
      }
      var len = hit ? hit.length : 1;
      out.push(text.slice(pos, pos + len));
      pos += len;
    }
    if (out.length < 2) out = text.split('');   /* single box → letter boxes */
    if (out.length > 5) {
      /* clamp to 5 boxes: merge the tail overflow into the last box */
      var head = out.slice(0, 4);
      head.push(out.slice(4).join(''));
      out = head;
    }
    return { text: text, boxes: out, noun: null, themeDir: null };
  }
};

/* per-tool styling: STAGE ONLY, consuming shell tokens. The one sanctioned
   page-level touch is body.sbx-wide (projector width for this box-dominant
   tool) — injected here, zero shell-file edits. */
(function injectCSS() {
  var css = ''
  /* projector width */
  + 'body.sbx-wide .lcs-app{max-width:min(1000px,96vw);}'
  + '.sbx-wrap{display:flex;flex-direction:column;align-items:center;'
  +   'gap:clamp(12px,2.4vmin,22px);width:100%;}'
  + '.sbx-loading{padding:48px 0;color:var(--lcs-ink-soft);'
  +   'font-family:var(--lcs-font-body);font-weight:700;}'

  /* list pill */
  + '.sbx-pillrow{display:flex;justify-content:center;width:100%;}'
  + '.sbx-pill{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(13px,2.2vmin,16px);color:var(--lcs-structure);'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:7px 18px;'
  +   'min-height:var(--lcs-tap);display:inline-flex;align-items:center;'
  +   'box-shadow:var(--lcs-shadow-sm);cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.sbx-pill:hover{background:var(--lcs-structure-soft);}'
  + '.sbx-pill:active{transform:scale(.97);}'

  /* picture card row */
  + '.sbx-cardrow{display:flex;align-items:center;justify-content:center;'
  +   'gap:clamp(10px,3vmin,28px);width:100%;}'
  + '.sbx-cardwrap{display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.sbx-picture{position:relative;width:clamp(96px,20vmin,200px);'
  +   'height:clamp(96px,20vmin,200px);display:grid;place-items:center;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);'
  +   'cursor:pointer;padding:8px;transition:transform .18s var(--lcs-ease);}'
  + '.sbx-picture:active{transform:scale(.97);}'
  + '.sbx-picture img{max-width:100%;max-height:100%;object-fit:contain;'
  +   'pointer-events:none;}'
  + '.sbx-bigspeaker{color:var(--lcs-structure);}'
  + '.sbx-speaker-badge{position:absolute;right:8px;bottom:8px;width:30px;'
  +   'height:30px;display:grid;place-items:center;color:var(--lcs-structure);'
  +   'background:var(--lcs-surface);border-radius:50%;'
  +   'box-shadow:var(--lcs-shadow-sm);pointer-events:none;}'
  + '.sbx-wordlabel{font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:clamp(20px,3.6vmin,30px);color:var(--lcs-structure);'
  +   'letter-spacing:.02em;opacity:0;transition:opacity .25s var(--lcs-ease);'
  +   'min-height:1.2em;}'
  + '.sbx-wordlabel.show{opacity:1;}'
  + '.sbx-nav{width:clamp(44px,7vmin,56px);height:clamp(44px,7vmin,56px);'
  +   'display:grid;place-items:center;border-radius:50%;'
  +   'background:var(--lcs-surface);box-shadow:var(--lcs-shadow-sm);'
  +   'color:var(--lcs-structure);cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.sbx-nav:hover{background:var(--lcs-structure-soft);}'
  + '.sbx-nav:active{transform:scale(.92);}'
  + '.sbx-nav svg{width:52%;height:52%;}'

  /* boxes — the hero */
  + '.sbx-boxrow{position:relative;display:flex;justify-content:center;'
  +   'align-items:center;gap:clamp(8px,2vmin,20px);width:100%;'
  +   'touch-action:manipulation;}'
  /* count-aware sizing: never wider than an equal share of the row, so a
     5-box word still fits a 320px phone (the box floor yields to the row). */
  + '.sbx-box{position:relative;'
  +   'width:min(clamp(56px,15vmin,176px),calc((100% - (var(--sbx-n,3) - 1)*clamp(8px,2vmin,20px))/var(--sbx-n,3)));'
  +   'aspect-ratio:1;height:auto;display:grid;place-items:center;'
  +   'background:var(--lcs-surface-2);border:3px solid var(--lcs-structure);'
  +   'border-radius:16px;cursor:pointer;padding:0;touch-action:none;'
  +   'box-shadow:inset 0 3px 8px rgba(20,30,28,.08),0 1px 0 rgba(255,255,255,.9);'
  +   'transition:background .15s var(--lcs-ease),box-shadow .15s var(--lcs-ease),'
  +   'border-color .15s var(--lcs-ease),transform .15s var(--lcs-ease);}'
  + '.sbx-box.filled{background:var(--lcs-surface);'
  +   'box-shadow:0 2px 8px rgba(20,107,94,.10);}'
  + '.sbx-box.sbx-over{background:var(--lcs-surface);'
  +   'box-shadow:inset 0 3px 8px rgba(20,30,28,.08),0 0 0 4px rgba(242,120,75,.28);}'
  + '.sbx-box.sbx-receive{animation:sbxReceive .3s var(--lcs-ease);}'
  + '@keyframes sbxReceive{0%{transform:scale(.95);}55%{transform:scale(1.02);}100%{transform:scale(1);}}'
  + '.sbx-box.sbx-pulse::after{content:"";position:absolute;inset:-3px;'
  +   'border-radius:16px;animation:sbxPulse .35s var(--lcs-ease);}'
  + '@keyframes sbxPulse{0%{box-shadow:0 0 0 0 rgba(20,107,94,.25);}'
  +   '100%{box-shadow:0 0 0 12px rgba(20,107,94,0);}}'
  + '.sbx-box.sbx-glow{background:#FFF6EC;border-color:#F2784B;'
  +   'box-shadow:0 0 0 5px rgba(242,120,75,.20);}'
  + '.sbx-box-enter{animation:sbxBoxIn .28s var(--lcs-ease) backwards;}'
  + '@keyframes sbxBoxIn{from{opacity:0;transform:translateY(6px);}'
  +   'to{opacity:1;transform:none;}}'
  + '.sbx-boxchip{display:grid;place-items:center;width:62%;height:62%;}'
  + '.sbx-boxchip svg{width:100%;height:100%;filter:drop-shadow(0 3px 3px rgba(20,30,28,.14));}'
  + '.sbx-tail{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(22px,6vmin,54px);color:var(--lcs-ink-soft);'
  +   'opacity:.55;margin-left:2px;align-self:center;}'
  + '.sbx-arc{position:absolute;left:0;pointer-events:none;overflow:visible;}'

  /* grapheme tile */
  + '.sbx-tile{display:flex;flex-direction:column;align-items:center;'
  +   'justify-content:center;width:86%;height:72%;background:var(--lcs-surface);'
  +   'border-radius:12px;box-shadow:0 3px 0 rgba(20,30,28,.10),'
  +   '0 4px 10px rgba(20,30,28,.08);}'
  + '.sbx-tile.dim{opacity:.35;box-shadow:none;background:transparent;}'
  + '.sbx-tile-txt{font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(24px,7vmin,64px);line-height:1;color:var(--lcs-structure);'
  +   'text-transform:lowercase;letter-spacing:-0.02em;}'
  + '.sbx-tile.multi .sbx-tile-txt{font-size:clamp(18px,5vmin,46px);}'
  + '.sbx-tie{width:60%;max-width:64px;height:9px;margin-top:2px;}'

  /* blend bar */
  + '.sbx-blendbar{width:min(500px,72%);height:22px;border-radius:11px;'
  +   'background:var(--lcs-structure-soft);display:none;place-items:center;'
  +   'cursor:pointer;touch-action:none;position:relative;}'
  + '.sbx-blendbar.show{display:grid;}'
  + '.sbx-chevrons{color:var(--lcs-structure);opacity:.4;font-weight:800;'
  +   'font-size:15px;letter-spacing:6px;line-height:1;pointer-events:none;}'
  + '.sbx-blendbar.hint::before{content:"";position:absolute;left:4px;top:50%;'
  +   'width:12px;height:12px;margin-top:-6px;border-radius:50%;'
  +   'background:#F2784B;animation:sbxHint 1.4s var(--lcs-ease);}'
  + '@keyframes sbxHint{from{left:4px;opacity:1;}to{left:calc(100% - 16px);opacity:0;}}'

  /* tray */
  + '.sbx-trayrow{display:flex;align-items:center;justify-content:center;'
  +   'gap:clamp(10px,2.6vmin,24px);width:100%;}'
  + '.sbx-tray{display:flex;gap:clamp(8px,1.8vmin,14px);align-items:center;'
  +   'background:var(--lcs-surface-2);border:1px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:10px 18px;'
  +   'box-shadow:inset 0 2px 6px rgba(20,30,28,.06);}'
  + '.sbx-chip{width:clamp(48px,9vmin,84px);height:clamp(48px,9vmin,84px);'
  +   'display:grid;place-items:center;background:var(--lcs-surface);'
  +   'border-radius:50%;box-shadow:0 3px 0 rgba(20,30,28,.10),'
  +   '0 4px 10px rgba(20,30,28,.08);cursor:grab;padding:0;touch-action:none;'
  +   'transition:transform .12s var(--lcs-ease),box-shadow .12s,opacity .2s;}'
  + '.sbx-chip:hover{transform:translateY(-2px);}'
  + '.sbx-chip svg{width:78%;height:78%;pointer-events:none;}'
  + '.sbx-chip.ghost{opacity:.75;box-shadow:none;background:transparent;'
  +   'border:2px dashed rgba(20,107,94,.35);cursor:default;}'
  + '.sbx-chip.ghost svg{visibility:hidden;}'
  + '.sbx-abc{min-width:var(--lcs-tap);height:var(--lcs-tap);padding:0 16px;'
  +   'font-family:var(--lcs-font-display);font-weight:800;font-size:17px;'
  +   'letter-spacing:.04em;color:var(--lcs-structure);'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);box-shadow:var(--lcs-shadow-sm);'
  +   'cursor:pointer;transition:transform .1s var(--lcs-ease),background .12s;}'
  + '.sbx-abc:hover{background:var(--lcs-structure-soft);}'
  + '.sbx-abc[aria-pressed="true"]{background:var(--lcs-structure);'
  +   'color:var(--lcs-surface);border-color:var(--lcs-structure);}'

  /* chip flight clone */
  + '.sbx-fly{position:fixed;z-index:60;display:grid;place-items:center;'
  +   'pointer-events:none;transition:transform .24s var(--lcs-ease);}'
  + '.sbx-fly.dragging{transition:none;filter:drop-shadow(0 8px 14px rgba(20,30,28,.2));}'

  /* word panel */
  + '.sbx-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);'
  +   'opacity:0;pointer-events:none;transition:opacity .2s;z-index:70;'
  +   'border-radius:inherit;}'
  + '.sbx-scrim.open{opacity:1;pointer-events:auto;}'
  + '.sbx-panel{position:absolute;left:50%;top:8%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(560px,92%);max-height:84%;overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;'
  +   'opacity:0;pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);'
  +   'display:flex;flex-direction:column;}'
  + '.sbx-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.sbx-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
  + '.sbx-tabs{display:flex;gap:8px;}'
  + '.sbx-tab{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;'
  +   'padding:7px 14px;border-radius:var(--lcs-radius-pill);'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;}'
  + '.sbx-tab.active{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.sbx-panel-close{width:36px;height:36px;display:grid;place-items:center;'
  +   'border-radius:50%;color:var(--lcs-ink-soft);background:transparent;cursor:pointer;}'
  + '.sbx-panel-close:hover{background:var(--lcs-structure-soft);color:var(--lcs-structure);}'
  + '.sbx-panel-body{padding:12px 16px;display:flex;flex-direction:column;gap:8px;}'
  + '.sbx-panel-foot{padding:10px 16px 14px;border-top:1px solid var(--lcs-line);}'
  + '.sbx-stage-row{display:flex;align-items:center;gap:10px;text-align:left;'
  +   'padding:11px 14px;border-radius:var(--lcs-radius-sm);cursor:pointer;'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);'
  +   'font-family:var(--lcs-font-body);}'
  + '.sbx-stage-row.active{border-color:var(--lcs-structure);'
  +   'background:var(--lcs-structure-soft);}'
  + '.sbx-stage-label{font-weight:800;color:var(--lcs-ink);flex:1;}'
  + '.sbx-stage-meta{font-size:12.5px;color:var(--lcs-ink-soft);font-weight:700;}'
  + '.sbx-stage-row.locked .sbx-stage-label{color:var(--lcs-ink-soft);}'
  + '.sbx-lock{color:var(--lcs-ink-soft);display:grid;place-items:center;}'
  + '.sbx-upsell{display:flex;flex-direction:column;gap:6px;padding:10px 14px;'
  +   'background:#FDE8DE;border-radius:var(--lcs-radius-sm);font-size:13.5px;'
  +   'font-family:var(--lcs-font-body);color:var(--lcs-ink);}'
  + '.sbx-upsell a{color:#C9502A;font-weight:800;text-decoration:underline;}'
  + '.sbx-wordgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));'
  +   'gap:8px;margin-top:6px;}'
  + '.sbx-wordcell{display:flex;flex-direction:column;align-items:center;gap:4px;'
  +   'padding:8px 4px;border-radius:var(--lcs-radius-sm);cursor:pointer;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;'
  +   'color:var(--lcs-ink);}'
  + '.sbx-wordcell img{width:44px;height:44px;object-fit:contain;}'
  + '.sbx-wordcell.active{border-color:var(--lcs-structure);'
  +   'background:var(--lcs-structure-soft);}'
  + '.sbx-hint{margin:0;font-size:13.5px;color:var(--lcs-ink-soft);'
  +   'font-family:var(--lcs-font-body);}'
  + '.sbx-hint.small{font-size:12.5px;}'
  + '.sbx-textarea{width:100%;box-sizing:border-box;resize:vertical;'
  +   'font-family:var(--lcs-font-body);font-size:15px;padding:10px 12px;'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);color:var(--lcs-ink);}'
  + '.sbx-btn{align-self:flex-start;font-family:var(--lcs-font-display);'
  +   'font-weight:800;font-size:14px;padding:9px 18px;'
  +   'border-radius:var(--lcs-radius-pill);cursor:pointer;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-structure);'
  +   'color:var(--lcs-structure);}'
  + '.sbx-btn.primary{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.sbx-btn.locked{opacity:.75;}'
  + '.sbx-copylink{font-family:var(--lcs-font-body);font-weight:700;'
  +   'font-size:13px;color:var(--lcs-structure);background:transparent;'
  +   'border:none;cursor:pointer;text-decoration:underline;padding:0;}'
  + '.sbx-seamrow{display:flex;align-items:center;gap:12px;}'
  + '.sbx-seamword{display:flex;align-items:center;}'
  + '.sbx-mini{font-family:var(--lcs-font-display);font-weight:700;font-size:22px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface-2);'
  +   'border:1.5px solid var(--lcs-line);border-radius:8px;padding:4px 8px;}'
  + '.sbx-seam{width:18px;height:36px;margin:0 1px;cursor:pointer;'
  +   'background:transparent;border:none;position:relative;padding:0;}'
  + '.sbx-seam::after{content:"";position:absolute;left:8px;top:4px;bottom:4px;'
  +   'width:2px;border-radius:1px;background:var(--lcs-line);}'
  + '.sbx-seam.cut::after{background:#F2784B;width:3px;}'
  + '.sbx-seamcount{font-size:12.5px;font-weight:700;color:var(--lcs-ink-soft);'
  +   'font-family:var(--lcs-font-body);white-space:nowrap;}'

  /* word entrance */
  + '.sbx-enter{animation:sbxCardIn .3s var(--lcs-ease);}'
  + '@keyframes sbxCardIn{from{opacity:0;transform:translateY(12px);}'
  +   'to{opacity:1;transform:none;}}'

  /* reduced motion: crossfades only */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.sbx-box.sbx-receive,.sbx-enter,.sbx-box-enter{animation:none;}'
  +   '.sbx-fly{transition:none;}'
  +   '.sbx-blendbar.hint::before{animation:none;display:none;}'
  + '}'

  /* narrow phones: tighten paddings so 5 boxes fit at 320, and keep the
     BOX ROW the hero — bigger boxes, smaller picture card. */
  + '@media (max-width:420px){'
  +   '.sbx-boxrow{gap:6px;}'
  +   '.sbx-box{border-width:2px;border-radius:12px;'
  +     'width:min(clamp(72px,24vw,120px),calc((100% - (var(--sbx-n,3) - 1)*6px)/var(--sbx-n,3)));}'
  +   '.sbx-picture{width:clamp(84px,28vw,124px);height:clamp(84px,28vw,124px);}'
  +   '.sbx-tray{padding:8px 12px;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
