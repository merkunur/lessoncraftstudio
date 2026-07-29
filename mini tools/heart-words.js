/* =====================================================================
   TOOL #21 — HEART WORDS   (heart-words.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). Reading Corner, Wave 3.

   PEDAGOGY (the Science-of-Reading "heart word" routine):
     A high-frequency IRREGULAR word sits in sound boxes with its
     spelling ALWAYS VISIBLE (this is not a spelling test — you cannot
     map a word to a spelling you cannot see). The child taps each box
     to mark the sounds. Regular parts get a quiet underline; the part
     that CANNOT be got from the code gets a small outline HEART stamped
     into the corner of the tile — letters still fully readable — with a
     warm spoken "this part we learn by heart".

     - `boxes[]` are grapheme chunks ALIGNED 1:1 TO PHONEMES (the Sound
       Boxes contract), so join(boxes)+silentTail always spells the word.
     - `heart[]` are INDEXES into boxes[]. heart.length < boxes.length is
       a hard invariant: a word where EVERY part is hearted is whole-word
       memorisation, the exact pedagogy SoR replaced. The regular parts
       ARE the lesson.
     - NO isolated-phoneme TTS anywhere. Speech is locked to whole words
       (type:'word') and UI lines (type:'ui'). Synthetic "buh" is
       pedagogy poison; the teacher's mouth is the phoneme model.
     - NO VERDICTS. Every box is tappable and no tap is ever refused, so
       there is no wrong tap available. Confirmation is MATERIAL (the
       tile settles, an underline draws) — never a symbol, never a colour
       coding rightness, never a word.
     - NO scores, timers, streaks, counts. The bookshelf shows spines,
       never "12 of 40".

   TEN LOCALES — NOT Finnish. Finnish orthography is transparent and the
   platform already ruled it out of sight-word pedagogy on native
   evidence (choice-board-activity.js:39-40). Manufacturing 40
   "irregular" Finnish words would be visible fabrication.

   PREMIUM (free-taste): shelf 1 (exactly 10 words) is a COMPLETE tool —
   mapping, heart, flip, sentence, illustration, bookshelf, review ring.
   Premium adds shelves 2-4, the class bookshelf and the printable cards.
   The gate is STRUCTURAL: wordsForShelf() returns [] for a locked shelf,
   so premium words never reach the DOM, and deep links are held until
   entitlement is known.
   ===================================================================== */
var HeartWords = {
  id: 'heart-words',

  /* CURATION FLAG: en is authored; the other nine locales carry drafts
     until their native ensemble pass lands via apply-heart-words-fanout. */
  strings: {
    title:        {en:'Heart Words',de:'Merkwörter',fr:'Mots à cœur',it:'Parole del cuore',es:'Palabras con corazón',pt:'Palavras de coração',nl:'Hartwoorden',sv:'Hjärteord',da:'Hjerteord',no:'Hjerteord'},
    instruction:  {en:'Tap each box to mark the sounds. A heart marks the part we learn by heart.',de:'Tippe auf jede Lautbox und markiere die Laute. Ein Herz zeigt den Teil, den wir uns merken.',fr:'Touche chaque case pour marquer les sons. Le cœur montre la partie qui se retient.',it:'Tocca ogni casella per seguire la parola. Un cuore indica la parte da imparare a memoria.',es:'Toca cada caja para marcar los sonidos. Un corazón señala la parte que aprendemos de memoria.',pt:'Toque em cada caixa para marcar os sons. Um coração mostra a parte que guardamos de cor.',nl:'Tik op elk vakje om de klanken te markeren. Het hartje wijst het stukje aan dat je uit je hoofd leert.',sv:'Tryck på varje ruta för att markera ljuden. Ett hjärta visar delen vi lär oss utantill.',da:'Tryk på hver boks for at markere lydene. Et hjerte viser den del, vi lærer udenad.',no:'Trykk på hver boks for å markere lydene. Et hjerte viser den delen vi lærer utenat.'},

    /* the heart moment */
    heartLine:    {en:'This part we learn by heart.',de:'Diesen Teil merken wir uns.',fr:'Cette partie, on la retient par cœur.',it:'Questa parte la impariamo a memoria.',es:'Esta parte la aprendemos de memoria.',pt:'Esta parte a gente guarda de cor.',nl:'Dit stukje leren we uit ons hoofd.',sv:'Den här delen lär vi oss utantill.',da:'Den her del lærer vi udenad.',no:'Denne delen lærer vi utenat.'},
    wordKnown:    {en:'We know {word} by heart now.',de:'Jetzt kennen wir {word} auswendig.',fr:'Maintenant, on connaît {word} par cœur.',it:'Ora sappiamo {word} a memoria.',es:'Ya nos sabemos {word} de memoria.',pt:'Agora a gente sabe {word} de cor.',nl:'Nu kennen we {word} uit ons hoofd.',sv:'Nu kan vi {word} utantill.',da:'Nu kan vi {word} udenad.',no:'Nå kan vi {word} utenat.'},
    stateMapped:  {en:'marked',de:'markiert',fr:'marquée',it:'segnata',es:'marcada',pt:'marcada',nl:'gemarkeerd',sv:'markerad',da:'markeret',no:'markert'},
    boxOf:        {en:'Part {i} of {n}',de:'Teil {i} von {n}',fr:'Partie {i} sur {n}',it:'Parte {i} di {n}',es:'Parte {i} de {n}',pt:'Parte {i} de {n}',nl:'Vakje {i} van {n}',sv:'Del {i} av {n}',da:'Del {i} af {n}',no:'Del {i} av {n}'},
    heartPart:    {en:'a part to learn by heart',de:'ein Teil, den wir uns merken',fr:'une partie à retenir par cœur',it:'una parte da imparare a memoria',es:'una parte para aprender de memoria',pt:'uma parte para guardar de cor',nl:'een stukje om uit je hoofd te leren',sv:'en del att lära sig utantill',da:'en del at lære udenad',no:'en del å lære utenat'},

    /* card chrome */
    hearWord:     {en:'Hear the word',de:'Wort anhören',fr:'Écouter le mot',it:'Ascolta la parola',es:'Escuchar la palabra',pt:'Ouvir a palavra',nl:'Luister naar het woord',sv:'Lyssna på ordet',da:'Hør ordet',no:'Hør ordet'},
    hearSentence: {en:'Hear the sentence',de:'Satz anhören',fr:'Écouter la phrase',it:'Ascolta la frase',es:'Escuchar la oración',pt:'Ouvir a frase',nl:'Luister naar de zin',sv:'Lyssna på meningen',da:'Hør sætningen',no:'Hør setningen'},
    flipToSee:    {en:'See it in a sentence',de:'Das Wort im Satz sehen',fr:'Voir le mot dans une phrase',it:'Vedila in una frase',es:'Verla en una oración',pt:'Ver em uma frase',nl:'Bekijk het woord in een zin',sv:'Se ordet i en mening',da:'Se ordet i en sætning',no:'Se ordet i en setning'},
    flipBack:     {en:'Back to the word',de:'Zurück zum Wort',fr:'Revenir au mot',it:'Torna alla parola',es:'Volver a la palabra',pt:'Voltar à palavra',nl:'Terug naar het woord',sv:'Tillbaka till ordet',da:'Tilbage til ordet',no:'Tilbake til ordet'},
    prevWord:     {en:'Previous word',de:'Vorheriges Wort',fr:'Mot précédent',it:'Parola precedente',es:'Palabra anterior',pt:'Palavra anterior',nl:'Vorig woord',sv:'Föregående ord',da:'Forrige ord',no:'Forrige ord'},
    nextWord:     {en:'Next word',de:'Nächstes Wort',fr:'Mot suivant',it:'Parola successiva',es:'Palabra siguiente',pt:'Próxima palavra',nl:'Volgend woord',sv:'Nästa ord',da:'Næste ord',no:'Neste ord'},

    /* shelves + panel */
    shelfPick:    {en:'Word shelves',de:'Wortregale',fr:'Étagères de mots',it:'Scaffali di parole',es:'Estantes de palabras',pt:'Prateleiras de palavras',nl:'Woordplanken',sv:'Ordhyllor',da:'Ordhylder',no:'Ordhyller'},
    shelfClose:   {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk'},
    bookshelf:    {en:'Words we know by heart',de:'Wörter, die wir auswendig kennen',fr:'Les mots qu’on connaît par cœur',it:'Le parole che sappiamo a memoria',es:'Palabras que sabemos de memoria',pt:'Palavras que sabemos de cor',nl:'Woorden die we uit ons hoofd kennen',sv:'Ord vi kan utantill',da:'Ord, vi kan udenad',no:'Ord vi kan utenat'},
    bookEmpty:    {en:'Your shelf fills up as you map words.',de:'Das Regal füllt sich, während ihr Wörter markiert.',fr:'L’étagère se remplit à mesure que vous marquez des mots.',it:'Lo scaffale si riempie man mano che segnate le parole.',es:'El estante se llena a medida que se marcan palabras.',pt:'A prateleira vai enchendo quando vocês marcam palavras.',nl:'De plank raakt voller terwijl jullie woorden markeren.',sv:'Hyllan fylls medan ni markerar ord.',da:'Hylden fyldes op, efterhånden som I markerer ord.',no:'Hylla fylles opp mens dere markerer ord.'},

    /* review ring */
    ringStart:    {en:'Visit words again',de:'Wörter noch einmal ansehen',fr:'Revoir des mots',it:'Rivedi le parole',es:'Volver a ver palabras',pt:'Ver as palavras de novo',nl:'Woorden opnieuw bekijken',sv:'Titta på ord igen',da:'Se ordene igen',no:'Besøk ord igjen'},
    ringLeave:    {en:'Back to the shelf',de:'Zurück zum Regal',fr:'Retour à l’étagère',it:'Torna allo scaffale',es:'Volver al estante',pt:'Voltar à prateleira',nl:'Terug naar de plank',sv:'Tillbaka till hyllan',da:'Tilbage til hylden',no:'Tilbake til hylla'},
    ringEmpty:    {en:'Map a word first, then you can visit it again.',de:'Markiert zuerst ein Wort, dann könnt ihr es noch einmal ansehen.',fr:'Marque d’abord un mot, puis tu pourras le revoir.',it:'Segnate prima una parola, poi potrete rivederla.',es:'Marca primero una palabra y luego podrás volver a verla.',pt:'Marquem uma palavra primeiro, depois vocês podem ver de novo.',nl:'Markeer eerst een woord, daarna kun je het opnieuw bekijken.',sv:'Markera ett ord först, sedan kan ni titta på det igen.',da:'Markér et ord først, så kan I se det igen.',no:'Markér et ord først, så kan dere besøke det igjen.'},

    /* premium */
    gatePremium:  {en:'These shelves are part of Premium — your first shelf is always free.',de:'Diese Regale gehören zu Premium – euer erstes Regal bleibt immer kostenlos.',fr:'Ces étagères font partie de Premium – la première reste toujours gratuite.',it:'Questi scaffali fanno parte di Premium: il primo resta sempre gratuito.',es:'Estos estantes son parte de Premium: el primero siempre es gratis.',pt:'Estas prateleiras fazem parte do Premium — a sua primeira prateleira é sempre gratuita.',nl:'Deze planken horen bij Premium – je eerste plank blijft altijd gratis.',sv:'De här hyllorna ingår i Premium – den första hyllan är alltid gratis.',da:'Disse hylder er en del af Premium – den første hylde er altid gratis.',no:'Disse hyllene er en del av Premium – den første hylla er alltid gratis.'},
    unlock:       {en:'See Premium',de:'Premium ansehen',fr:'Découvrir Premium',it:'Scopri Premium',es:'Ver Premium',pt:'Conhecer o Premium',nl:'Bekijk Premium',sv:'Se Premium',da:'Se Premium',no:'Se Premium'},
    lockedShelf:  {en:'Premium shelf',de:'Premium-Regal',fr:'Étagère Premium',it:'Scaffale Premium',es:'Estante Premium',pt:'Prateleira Premium',nl:'Premium-plank',sv:'Premiumhylla',da:'Premiumhylde',no:'Premiumhylle'},
    printCards:   {en:'Print the cards',de:'Karten ausdrucken',fr:'Imprimer les cartes',it:'Stampa le schede',es:'Imprimir las tarjetas',pt:'Imprimir os cartões',nl:'Kaarten afdrukken',sv:'Skriv ut korten',da:'Print kortene',no:'Skriv ut kortene'},

    /* settings */
    setVoice:     {en:'Say words aloud',de:'Wörter vorlesen',fr:'Dire les mots à voix haute',it:'Pronuncia le parole ad alta voce',es:'Decir las palabras en voz alta',pt:'Dizer as palavras em voz alta',nl:'Woorden hardop zeggen',sv:'Läs orden högt',da:'Læs ordene højt',no:'Les ordene høyt'},
    setOrder:     {en:'Word order',de:'Reihenfolge',fr:'Ordre des mots',it:'Ordine delle parole',es:'Orden de las palabras',pt:'Ordem das palavras',nl:'Volgorde',sv:'Ordningsföljd',da:'Rækkefølge',no:'Rekkefølge'},
    orderListed:  {en:'In order',de:'Der Reihe nach',fr:'Dans l’ordre',it:'In ordine',es:'En orden',pt:'Em ordem',nl:'Op volgorde',sv:'I ordning',da:'I rækkefølge',no:'Som de står'},
    orderShuffled:{en:'Shuffled',de:'Gemischt',fr:'Mélangés',it:'Mescolate',es:'Mezcladas',pt:'Embaralhadas',nl:'Door elkaar',sv:'Blandad ordning',da:'Blandet rækkefølge',no:'Blandet'},

    /* sibling phonics tools (the quartet footer) */
    trioLabel:    {en:'Phonics tools:',de:'Werkzeuge zum Lesenlernen:',fr:'Outils de phonologie :',it:'Strumenti fonologici:',es:'Herramientas de conciencia fonológica:',pt:'Ferramentas de alfabetização:',nl:'Klankhulpjes:',sv:'Ljudverktyg:',da:'Lydværktøjer:',no:'Lydverktøy:'},
    siblingSbx:   {en:'Sound Boxes',de:'Lautboxen',fr:'Boîtes à sons',it:'Caselle dei suoni',es:'Cajas de sonidos',pt:'Caixas de sons',nl:'Klankdozen',sv:'Ljudrutor',da:'Lydbokse',no:'Lydbokser'},
    siblingBbd:   {en:'Blending Board',de:'Lesemaschine',fr:'Tableau de syllabes',it:'Tabellone delle sillabe',es:'Tablero de sílabas',pt:'Quadro de sílabas',nl:'Klankenbord',sv:'Ljudtavla',da:'Lydtavle',no:'Lydtavle'},
    siblingLtl:   {en:'Letter Tiles',de:'Magnetbuchstaben',fr:'Lettres magnétiques',it:'Lettere magnetiche',es:'Letras magnéticas',pt:'Alfabeto móvel',nl:'Letterdoos',sv:'Magnetbokstäver',da:'Magnetbogstaver',no:'Magnetbokstaver'}
  },

  /* Legal multi-char graphemes per locale. MUST stay deep-equal to
     GRAPHEMES in scripts/verify-heart-words.js (the drift gate) — extend
     BOTH, deliberately, or the build fails. */
  GRAPHEME_INVENTORY: {
    en: ['sh','ch','th','wh','ck','ng','ph','ee','oo','oa','ai','ay','ea','ie','ow','ou','oi','oy','aw','au','ew','ue','ar','or','er','ur','ir','igh','a_e','i_e','o_e','u_e','e_e','ll','ss','ff','zz','gg','tt','dd','nn','mm','bb','pp','oe','ere','oul','eo','our','eigh','eir','ear'],
    de: ['sch','ch','ck','ei','ie','au','eu','äu','ll','ss','ff','tt','nn','mm','pp','rr','tz','ng','sp','st','qu','ah','eh','ih','oh','uh','aa','ee','oo','ieh','äh','öh','üh'],
    fr: ['ch','ou','oi','on','an','en','in','un','ai','ei','au','eau','eu','oeu','gn','ph','ll','ss','tt','nn','mm','rr','pp','qu','é','è','ê','em','om','am','ien','oy','ay','aim','ein'],
    es: ['ch','ll','rr','qu','gu','ñ','á','é','í','ó','ú','gü'],
    pt: ['ch','lh','nh','rr','ss','qu','gu','ão','ãe','õe','á','é','í','ó','ú','â','ê','ô','ç','ã','õ'],
    it: ['ch','gh','gn','gl','sc','ci','gi','ll','tt','ss','nn','mm','rr','pp','cc','bb','zz','ff','gg','dd','sci','cqu','gli','à','è','é','ì','ò','ù'],
    nl: ['aa','ee','oo','uu','oe','ie','ij','ei','ui','eu','ou','au','ch','ng','nk','eeu','ieu','aai','ooi','oei'],
    sv: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','ck','ng','sj','skj','stj','kj','tj','hj','lj','dj','gj','rs','rt','rd','rn','rl'],
    da: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','dd','bb','ng','sk','sj','hj','aa','hv','ej','øj','av'],
    no: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','dd','bb','ng','sj','skj','kj','gj','hj','øy','ei','au','hv','rs','rt','eg']
  },

  /* Rising pentatonic, one soft pitch per box index. */
  PITCHES: [523, 587, 659, 698, 784, 880],

  /* Emergency bank if the per-locale fetch 404s. Free shelf only, so a
     network failure still leaves a complete working free tool. */
  FALLBACK_BANK: {
    locale: 'en', version: 1, kind: 'irregular', curation: 'fallback',
    shelves: [{ id: 'sh1', label: 'Our first ten', free: true }],
    words: [
      { id:'the',  display:'the',  boxes:['th','e'],     heart:[1], heartKind:'irregular', sentence:'The cat sat on my lap.',       sentenceNoun:'cat',  nounForm:'cat',  imageDir:'pets',      imageFile:'cat',  shelf:'sh1' },
      { id:'of',   display:'of',   boxes:['o','f'],      heart:[1], heartKind:'irregular', sentence:'I drank all of my milk.',      sentenceNoun:'milk', nounForm:'milk', imageDir:'breakfast', imageFile:'milk', shelf:'sh1' },
      { id:'to',   display:'to',   boxes:['t','o'],      heart:[1], heartKind:'irregular', sentence:'We run to the bus.',           sentenceNoun:'bus',  nounForm:'bus',  imageDir:'vehicles',  imageFile:'bus',  shelf:'sh1' },
      { id:'do',   display:'do',   boxes:['d','o'],      heart:[1], heartKind:'irregular', sentence:'What can you do with a ball?', sentenceNoun:'ball', nounForm:'ball', imageDir:'toys',      imageFile:'ball', shelf:'sh1' },
      { id:'was',  display:'was',  boxes:['w','a','s'],  heart:[1,2], heartKind:'irregular', sentence:'My dog was fast asleep.',    sentenceNoun:'dog',  nounForm:'dog',  imageDir:'pets',      imageFile:'dog',  shelf:'sh1' },
      { id:'said', display:'said', boxes:['s','ai','d'], heart:[1], heartKind:'irregular', sentence:'Hello, said the little bird.', sentenceNoun:'bird', nounForm:'bird', imageDir:'spring',    imageFile:'bird', shelf:'sh1' }
    ]
  },

  defaults: { voice: true, order: 'listed' },
  settings: [
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' },
    { key: 'order', type: 'choice', labelKey: 'setOrder',
      options: [{ value: 'listed', labelKey: 'orderListed' }, { value: 'shuffled', labelKey: 'orderShuffled' }] }
  ],

  STORE_KEY: 'lcs:heart-words:v1',
  ENT_TRUST_DAYS: 14,

  /* =================================================================
     PURE ENGINE — no DOM. The build gate calls these directly.
     ================================================================= */

  shelfById: function (id) {
    var sh = (this.bank && this.bank.shelves) || [];
    for (var i = 0; i < sh.length; i++) if (sh[i].id === id) return sh[i];
    return null;
  },

  _shelfUnlocked: function (shelf) {
    if (!shelf) return false;
    return !!(shelf.free || this.premium);
  },

  firstFreeShelf: function () {
    var sh = (this.bank && this.bank.shelves) || [];
    for (var i = 0; i < sh.length; i++) if (sh[i].free) return sh[i].id;
    return sh.length ? sh[0].id : null;
  },

  /* THE STRUCTURAL GATE. A locked shelf yields nothing at all, so premium
     words never reach the DOM — not hidden, absent. */
  wordsForShelf: function (shelfId) {
    var shelf = this.shelfById(shelfId);
    if (!this._shelfUnlocked(shelf)) return [];
    var all = (this.bank && this.bank.words) || [], out = [];
    for (var i = 0; i < all.length; i++) if (all[i].shelf === shelfId) out.push(all[i]);
    return out;
  },

  isHeart: function (word, i) {
    if (!word || !word.heart) return false;
    for (var k = 0; k < word.heart.length; k++) if (word.heart[k] === i) return true;
    return false;
  },

  reassemble: function (word) {
    var out = '', tail = '', i, m;
    for (i = 0; i < (word.boxes || []).length; i++) {
      m = /^(.+)_(.+)$/.exec(word.boxes[i]);
      if (m) { out += m[1]; tail += m[2]; } else out += word.boxes[i];
    }
    return out + tail + (word.silentTail || '');
  },

  /* The visible face of a box: the split-digraph token "a_e" shows only
     its main letter in the box; the tail rides after the last box. */
  boxFace: function (box) {
    var m = /^(.+)_(.+)$/.exec(box);
    return m ? m[1] : box;
  },

  tailText: function (word) {
    var tail = '', i, m;
    for (i = 0; i < (word.boxes || []).length; i++) {
      m = /^(.+)_(.+)$/.exec(word.boxes[i]);
      if (m) tail += m[2];
    }
    return tail + (word.silentTail || '');
  },

  /* Deep links resolve ONLY to content the visitor may actually have.
     Returns null for a locked target without premium — the caller holds
     the link until entitlement is known rather than falling back early. */
  resolveDeepLink: function (params, premium) {
    if (!params) return null;
    var sid = params.shelf, wid = params.word;
    if (!sid && !wid) return null;
    var shelf = null, i, all = (this.bank && this.bank.words) || [];
    if (!sid && wid) {
      for (i = 0; i < all.length; i++) if (all[i].id === wid) { sid = all[i].shelf; break; }
    }
    shelf = this.shelfById(sid);
    if (!shelf) return null;
    if (!shelf.free && !premium) return null;
    var idx = 0;
    if (wid) {
      var list = [];
      for (i = 0; i < all.length; i++) if (all[i].shelf === sid) list.push(all[i]);
      for (i = 0; i < list.length; i++) if (list[i].id === wid) { idx = i; break; }
    }
    return { shelf: sid, index: idx };
  },

  /* Greedy longest-match segmenter for teacher-typed custom words. */
  segment: function (text, lang) {
    var inv = (this.GRAPHEME_INVENTORY[lang] || []).slice().sort(function (a, b) { return b.length - a.length; });
    var s = String(text || '').toLowerCase(), out = [], i = 0, k, hit;
    while (i < s.length) {
      hit = null;
      for (k = 0; k < inv.length; k++) {
        if (inv[k].indexOf('_') >= 0) continue;
        if (s.substr(i, inv[k].length) === inv[k]) { hit = inv[k]; break; }
      }
      if (hit) { out.push(hit); i += hit.length; } else { out.push(s.charAt(i)); i++; }
    }
    if (out.length < 2) out = s.split('');
    while (out.length > 6) { out[out.length - 2] += out[out.length - 1]; out.pop(); }
    return out;
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    for (var k in args) if (Object.prototype.hasOwnProperty.call(args, k))
      s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), args[k]);
    return s;
  },

  premium: false,

  /* =================================================================
     LIFECYCLE
     ================================================================= */

  init: function (api) {
    var self = this;
    this.api = api;
    injectHeartWordsCSS();

    this.bank = null;
    this.shelfId = null;
    this.index = 0;
    this.mapped = {};
    this.flipped = false;
    this.ring = false;
    this.ringList = [];
    this.panelOpen = false;
    this.gateOpen = false;
    this.premiumKnown = false;
    this._deepPending = null;
    this._timers = [];
    this._store = this._loadStore();

    /* trust a cached verdict while the network answer is in flight */
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this._deepPending = this._readParams();

    this._fetchBank();
    this._fetchEntitlement();

    document.addEventListener('keydown', function (e) {
      if (!self._wrap) return;
      var t = e.target || {};
      var typing = t.tagName === 'INPUT' || t.tagName === 'TEXTAREA';
      if (typing) return;
      if (e.key === 'ArrowRight') { self.go(1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { self.go(-1); e.preventDefault(); }
      else if (e.key === 'f' || e.key === 'F') { self.toggleFlip(); e.preventDefault(); }
      else if (e.key === ' ' && !(t.classList && t.classList.contains('hw-box'))) { self.speakWord(); e.preventDefault(); }
    });
  },

  _readParams: function () {
    var q = {};
    try {
      var p = new URLSearchParams(location.search);
      if (p.get('shelf')) q.shelf = p.get('shelf');
      if (p.get('word')) q.word = p.get('word');
      if (p.get('ring')) q.ring = true;
    } catch (_) {}
    return (q.shelf || q.word || q.ring) ? q : null;
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },

  _saveStore: function () {
    var s = this._store || {};
    s.v = 1;
    s.known = s.known || {};
    s.lastShelf = this.shelfId;
    s.settings = this.api ? this.api.settings : s.settings;
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
  },

  _fetchBank: function () {
    var self = this;
    var url = '/mini-tools/heart-words-' + this.api.lang + '.json';
    fetch(url, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_BANK; })
      .then(function (bank) {
        self.bank = bank && bank.words && bank.words.length ? bank : self.FALLBACK_BANK;
        self._applyEntryState();
        self.render();
      });
  },

  /* Entitlement: one seam, cached verdict trusted for ENT_TRUST_DAYS on a
     NETWORK failure only. Any other outcome falls to free. */
  _fetchEntitlement: function () {
    var self = this;
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}

    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) self.premium = ent.tier !== 'free';
        else self.premium = false;
      } else self.premium = false;
      self.premiumKnown = true;
      self._settle();
    };

    if (!token) { self.premium = false; self.premiumKnown = true; self._settle(); return; }

    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; self._settle(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        self._settle();
      })
      .catch(trustCache);
  },

  /* Runs once entitlement is known: applies any held deep link, then paints. */
  _settle: function () {
    if (!this.bank) return;
    this._applyEntryState();
    if (this._wrap) this.render();
  },

  _applyEntryState: function () {
    if (!this.bank) return;
    var d = this._deepPending ? this.resolveDeepLink(this._deepPending, this.premium) : null;
    if (d) {
      this.shelfId = d.shelf;
      this.index = d.index;
      if (this._deepPending && this._deepPending.ring) this.ring = true;
      if (this.premiumKnown) this._deepPending = null;
    } else if (!this.shelfId || !this._shelfUnlocked(this.shelfById(this.shelfId))) {
      /* never strand the visitor on a shelf they cannot open */
      this.shelfId = (this._store.lastShelf && this._shelfUnlocked(this.shelfById(this._store.lastShelf)))
        ? this._store.lastShelf : this.firstFreeShelf();
      this.index = 0;
    }
    this.mapped = {};
  },

  /* =================================================================
     WORD ACCESS
     ================================================================= */

  list: function () {
    if (this.ring) return this.ringList;
    var w = this.wordsForShelf(this.shelfId);
    if (this.api && this.api.settings && this.api.settings.order === 'shuffled') {
      w = this._shuffleStable(w, this.shelfId);
    }
    return w;
  },

  /* Deterministic per-shelf shuffle: stable within a session so the strip
     does not reorder under the child's hand. */
  _shuffleStable: function (arr, seedStr) {
    var a = arr.slice(), seed = 0, i, j, t;
    for (i = 0; i < String(seedStr).length; i++) seed = (seed * 31 + String(seedStr).charCodeAt(i)) >>> 0;
    if (!this._shuffleSeed) this._shuffleSeed = (Date.now() % 100000);
    seed = (seed + this._shuffleSeed) >>> 0;
    for (i = a.length - 1; i > 0; i--) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      j = seed % (i + 1);
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  },

  current: function () {
    var l = this.list();
    if (!l.length) return null;
    if (this.index >= l.length) this.index = 0;
    if (this.index < 0) this.index = l.length - 1;
    return l[this.index];
  },

  go: function (d) {
    var l = this.list();
    if (!l.length) return;
    this.index = (this.index + d + l.length) % l.length;
    this.mapped = {};
    this.flipped = false;
    this.render();
    var w = this.current();
    if (w && this.api.settings.voice) this.speakWord();
  },

  /* =================================================================
     SPEECH — locked to whole words and UI lines. Never a phoneme.
     ================================================================= */

  speakWord: function () {
    var w = this.current();
    if (!w) return;
    try { LCSAudio.speak({ type: 'word', text: w.display, lang: this.api.lang }); } catch (_) {}
  },

  speakSentence: function () {
    var w = this.current();
    if (!w || !w.sentence) return;
    try { LCSAudio.speak({ type: 'ui', text: w.sentence, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },

  speakLine: function (text) {
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },

  /* =================================================================
     THE MAPPING INTERACTION
     ================================================================= */

  onBoxTap: function (i) {
    var w = this.current();
    if (!w) return;
    var heart = this.isHeart(w, i);
    var already = !!this.mapped[i];
    this.mapped[i] = true;

    var box = this._boxEls && this._boxEls[i];
    if (box) {
      box.classList.add('hw-mapped');
      if (heart) box.classList.add('hw-hearted');
      box.classList.remove('hw-pop');
      /* restart the pop animation */
      void box.offsetWidth;
      box.classList.add('hw-pop');
    }
    this._paintBox(i);

    try { this.api.sound(this.PITCHES[Math.min(i, this.PITCHES.length - 1)]); } catch (_) {}

    if (heart && !already) {
      var line = this.api.t('heartLine');
      this.api.announce(line);
      if (this.api.settings.voice) {
        var self = this;
        this._after(180, function () { self.speakLine(line); });
      }
      try {
        var s = this;
        this._after(0, function () { s.api.sound(659); });
        this._after(150, function () { s.api.sound(880); });
      } catch (_) {}
    } else if (!already) {
      this.api.announce(this.fmt('boxOf', { i: i + 1, n: w.boxes.length }) + ' — ' + this.api.t('stateMapped'));
    }

    if (this._allMapped(w)) this._celebrate(w);
  },

  _allMapped: function (w) {
    for (var i = 0; i < w.boxes.length; i++) if (!this.mapped[i]) return false;
    return true;
  },

  _celebrate: function (w) {
    var self = this;
    if (this._celebrated === w.id) return;
    this._celebrated = w.id;

    (this._boxEls || []).forEach(function (b, i) {
      self._after(120 + i * 90, function () { if (b.isConnected !== false) b.classList.add('hw-glow'); });
    });

    this._after(140 * (w.boxes.length + 1), function () {
      if (self.api.settings.voice) self.speakWord();
      self.api.announce(self.fmt('wordKnown', { word: w.display }));
      if (self._flipBtn) self._flipBtn.classList.add('hw-shimmer');
    });

    /* the bookshelf remembers, quietly */
    var st = this._store;
    st.known = st.known || {};
    var now = new Date().toISOString();
    if (!st.known[w.id]) st.known[w.id] = { first: now, last: now };
    else st.known[w.id].last = now;
    this._saveStore();
    this._paintShelf();
  },

  /* queued animation steps are cancelled on re-render (stale-node class) */
  _after: function (ms, fn) {
    var id = setTimeout(fn, ms);
    this._timers.push(id);
    return id;
  },

  _clearTimers: function () {
    for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]);
    this._timers = [];
  },

  toggleFlip: function () {
    var w = this.current();
    if (!w) return;
    this.flipped = !this.flipped;
    if (this._card) this._card.classList.toggle('hw-flipped', this.flipped);
    if (this.flipped && this.api.settings.voice) {
      var self = this;
      this._after(320, function () { self.speakSentence(); });
    }
  },

  /* =================================================================
     RENDER
     ================================================================= */

  render: function () {
    var self = this, api = this.api;
    this._clearTimers();
    this._celebrated = null;
    api.stage.innerHTML = '';

    var wrap = api.el('div', 'hw-wrap');
    this._wrap = wrap;

    if (!this.bank) {
      wrap.appendChild(api.el('div', 'hw-loading'));
      api.stage.appendChild(wrap);
      return;
    }

    /* --- top row: shelf pill --- */
    var top = api.el('div', 'hw-toprow');
    var pill = api.el('button', 'hw-pill');
    pill.type = 'button';
    var shelf = this.shelfById(this.shelfId);
    pill.textContent = (this.ring ? api.t('ringStart') : (shelf ? shelf.label : api.t('shelfPick')));
    pill.setAttribute('aria-label', api.t('shelfPick'));
    pill.addEventListener('click', function () { self.panelOpen = true; self.render(); });
    top.appendChild(pill);
    wrap.appendChild(top);

    /* --- the card --- */
    var w = this.current();
    var stage = api.el('div', 'hw-cardstage');
    if (!w) {
      var empty = api.el('p', 'hw-empty');
      empty.textContent = this.ring ? api.t('ringEmpty') : api.t('bookEmpty');
      stage.appendChild(empty);
    } else {
      stage.appendChild(this._buildCard(w));
    }
    wrap.appendChild(stage);

    /* --- nav --- */
    if (w) {
      var nav = api.el('div', 'hw-nav');
      var prev = api.el('button', 'hw-navbtn');
      prev.type = 'button'; prev.innerHTML = '&#8249;';
      prev.setAttribute('aria-label', api.t('prevWord'));
      prev.addEventListener('click', function () { self.go(-1); });
      var next = api.el('button', 'hw-navbtn');
      next.type = 'button'; next.innerHTML = '&#8250;';
      next.setAttribute('aria-label', api.t('nextWord'));
      next.addEventListener('click', function () { self.go(1); });
      nav.appendChild(prev); nav.appendChild(next);
      wrap.appendChild(nav);
    }

    /* --- bookshelf --- */
    wrap.appendChild(this._buildShelf());

    /* --- tools --- */
    wrap.appendChild(this._buildTools());

    /* The sibling links live INSIDE the panel, matching the three shipped
       phonics tools — teacher-facing navigation, never on the child's
       touch surface. */
    if (this.panelOpen) wrap.appendChild(this._buildPanel());
    if (this.gateOpen) wrap.appendChild(this._buildGate());
    if (this.premium) wrap.appendChild(this._buildPrintSheet());

    api.stage.appendChild(wrap);
  },

  _buildCard: function (w) {
    var self = this, api = this.api;
    var card = api.el('div', 'hw-card' + (this.flipped ? ' hw-flipped' : ''));
    this._card = card;

    /* ---- FRONT: the mapping face ---- */
    var front = api.el('div', 'hw-face hw-face-map');

    var spk = api.el('button', 'hw-wordspeak');
    spk.type = 'button';
    spk.setAttribute('aria-label', api.t('hearWord'));
    spk.innerHTML = this._speakerSVG(26);
    spk.addEventListener('click', function () { self.speakWord(); });
    front.appendChild(spk);

    var row = api.el('div', 'hw-boxrow');
    row.style.setProperty('--hw-n', w.boxes.length);
    this._boxEls = [];
    for (var i = 0; i < w.boxes.length; i++) {
      (function (idx) {
        var b = api.el('button', 'hw-box');
        b.type = 'button';
        b.dataset.i = idx;
        b.addEventListener('click', function () { self.onBoxTap(idx); });
        row.appendChild(b);
        self._boxEls.push(b);
      })(i);
    }
    front.appendChild(row);

    var tail = this.tailText(w);
    if (tail) {
      var tl = api.el('span', 'hw-tail');
      tl.textContent = tail;
      front.appendChild(tl);
    }

    var flip = api.el('button', 'hw-flip');
    flip.type = 'button';
    flip.textContent = api.t('flipToSee');
    flip.addEventListener('click', function () { self.toggleFlip(); });
    this._flipBtn = flip;
    front.appendChild(flip);

    card.appendChild(front);

    /* ---- BACK: the sentence face ---- */
    var back = api.el('div', 'hw-face hw-face-sentence');
    if (w.imageDir && w.imageFile) {
      var img = api.el('img', 'hw-pic');
      img.src = '/image-library-webp/themes/' + encodeURIComponent(w.imageDir) + '/' + w.imageFile + '@2x.webp';
      img.alt = w.nounForm || w.sentenceNoun || '';
      img.draggable = false;
      img.addEventListener('dragstart', function (e) { e.preventDefault(); });
      back.appendChild(img);
    }
    var sent = api.el('p', 'hw-sentence');
    sent.innerHTML = this._sentenceHTML(w);
    back.appendChild(sent);

    var ss = api.el('button', 'hw-sentspeak');
    ss.type = 'button';
    ss.setAttribute('aria-label', api.t('hearSentence'));
    ss.innerHTML = this._speakerSVG(22);
    ss.addEventListener('click', function () { self.speakSentence(); });
    back.appendChild(ss);

    var back2 = api.el('button', 'hw-flip');
    back2.type = 'button';
    back2.textContent = api.t('flipBack');
    back2.addEventListener('click', function () { self.toggleFlip(); });
    back.appendChild(back2);

    card.appendChild(back);

    this._after(0, function () { self._paintBoxes(); });
    return card;
  },

  /* The heart word inside the sentence: bold + a small heart mark, never
     colour alone (colour-blind safety). */
  _sentenceHTML: function (w) {
    var esc = function (s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    var s = esc(w.sentence || '');
    var d = esc(w.display || '');
    if (!d) return s;
    var re = new RegExp('(^|[^\\p{L}])(' + d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')([^\\p{L}]|$)', 'iu');
    var m = re.exec(s);
    if (!m) return s;
    var mark = '<b class="hw-sent-target">' + m[2] + '<span class="hw-sent-heart" aria-hidden="true">&#9825;</span></b>';
    return s.slice(0, m.index) + m[1] + mark + m[3] + s.slice(m.index + m[0].length);
  },

  _paintBoxes: function () {
    var w = this.current();
    if (!w || !this._boxEls) return;
    for (var i = 0; i < this._boxEls.length; i++) this._paintBox(i);
  },

  _paintBox: function (i) {
    var w = this.current(), api = this.api;
    if (!w || !this._boxEls || !this._boxEls[i]) return;
    var b = this._boxEls[i];
    var face = this.boxFace(w.boxes[i]);
    var heart = this.isHeart(w, i);
    var mapped = !!this.mapped[i];

    var html = '<span class="hw-glyph">' + face + '</span>';
    if (face.length > 1) html += '<span class="hw-tie" aria-hidden="true"></span>';
    if (heart && mapped) html += this._heartSVG(20);
    b.innerHTML = html;

    b.classList.toggle('hw-mapped', mapped);
    b.classList.toggle('hw-hearted', heart && mapped);
    b.classList.toggle('hw-wide-glyph', face.length > 2);

    var label = this.fmt('boxOf', { i: i + 1, n: w.boxes.length }) + ': ' + face;
    if (heart) label += ' — ' + api.t('heartPart');
    if (mapped) label += ' (' + api.t('stateMapped') + ')';
    b.setAttribute('aria-label', label);
  },

  /* =================================================================
     BOOKSHELF — spines only. It never counts.
     ================================================================= */

  _buildShelf: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'hw-shelf');
    this._shelfEl = box;
    var head = api.el('div', 'hw-shelf-head');
    head.textContent = api.t('bookshelf');
    box.appendChild(head);
    var rail = api.el('div', 'hw-shelf-rail');
    this._shelfRail = rail;
    box.appendChild(rail);
    this._paintShelf();
    return box;
  },

  _paintShelf: function () {
    var self = this, api = this.api;
    var rail = this._shelfRail;
    if (!rail) return;
    rail.innerHTML = '';
    var known = (this._store && this._store.known) || {};
    var all = (this.bank && this.bank.words) || [];
    var shown = 0;
    for (var i = 0; i < all.length; i++) {
      var w = all[i];
      if (!known[w.id]) continue;
      /* only spines the visitor may actually open */
      if (!this._shelfUnlocked(this.shelfById(w.shelf))) continue;
      (function (word) {
        var sp = api.el('button', 'hw-spine');
        sp.type = 'button';
        sp.textContent = word.display;
        var h = self._hash(word.id);
        sp.style.setProperty('--hw-tilt', ((h % 7) - 3) + 'deg');
        sp.style.setProperty('--hw-spine', 'hsl(' + (h % 360) + ' 34% 62%)');
        sp.addEventListener('click', function () { self._jumpTo(word); });
        rail.appendChild(sp);
      })(w);
      shown++;
    }
    rail.classList.toggle('hw-rail-empty', !shown);
    if (!shown) {
      var p = api.el('p', 'hw-shelf-empty');
      p.textContent = api.t('bookEmpty');
      rail.appendChild(p);
    }
  },

  _hash: function (s) {
    var h = 0;
    for (var i = 0; i < String(s).length; i++) h = (h * 31 + String(s).charCodeAt(i)) >>> 0;
    return h;
  },

  _jumpTo: function (word) {
    if (this.ring) this.ring = false;
    this.shelfId = word.shelf;
    var l = this.list();
    for (var i = 0; i < l.length; i++) if (l[i].id === word.id) { this.index = i; break; }
    this.mapped = {};
    this.flipped = false;
    this.render();
  },

  /* =================================================================
     TOOLS ROW
     ================================================================= */

  _buildTools: function () {
    var self = this, api = this.api;
    var row = api.el('div', 'hw-tools');

    var ring = api.el('button', 'hw-toolbtn');
    ring.type = 'button';
    ring.textContent = this.ring ? api.t('ringLeave') : api.t('ringStart');
    ring.addEventListener('click', function () { self._toggleRing(); });
    row.appendChild(ring);

    var pr = api.el('button', 'hw-toolbtn' + (this.premium ? '' : ' hw-locked'));
    pr.type = 'button';
    pr.textContent = api.t('printCards');
    pr.addEventListener('click', function () {
      if (!self.premium) { self.gateOpen = true; self.render(); return; }
      try { window.print(); } catch (_) {}
    });
    row.appendChild(pr);

    return row;
  },

  _toggleRing: function () {
    if (this.ring) { this.ring = false; this.index = 0; this.mapped = {}; this.render(); return; }
    var known = (this._store && this._store.known) || {};
    var all = (this.bank && this.bank.words) || [], list = [], i;
    for (i = 0; i < all.length; i++) {
      if (!known[all[i].id]) continue;
      if (!this._shelfUnlocked(this.shelfById(all[i].shelf))) continue;
      list.push(all[i]);
    }
    /* oldest visit first — the ordering signal is never displayed */
    list.sort(function (a, b) {
      return String(known[a.id].last).localeCompare(String(known[b.id].last));
    });
    this.ringList = list;
    this.ring = true;
    this.index = 0;
    this.mapped = {};
    this.flipped = false;
    this.render();
  },

  /* =================================================================
     PANEL — shelves and words
     ================================================================= */

  _buildPanel: function () {
    var self = this, api = this.api;
    var scrim = api.el('div', 'hw-scrim');
    scrim.addEventListener('click', function (e) {
      if (e.target === scrim) { self.panelOpen = false; self.render(); }
    });
    var panel = api.el('div', 'hw-panel');

    var head = api.el('div', 'hw-panel-head');
    var h = api.el('h2', 'hw-panel-title');
    h.textContent = api.t('shelfPick');
    head.appendChild(h);
    var close = api.el('button', 'hw-panel-close');
    close.type = 'button';
    close.textContent = api.t('shelfClose');
    close.addEventListener('click', function () { self.panelOpen = false; self.render(); });
    head.appendChild(close);
    panel.appendChild(head);

    var shelves = (this.bank && this.bank.shelves) || [];
    for (var i = 0; i < shelves.length; i++) {
      (function (shelf) {
        var unlocked = self._shelfUnlocked(shelf);
        var sec = api.el('div', 'hw-shelfsec' + (unlocked ? '' : ' hw-locked'));

        var row = api.el('button', 'hw-shelfrow');
        row.type = 'button';
        var lbl = api.el('span', 'hw-shelflabel');
        lbl.textContent = shelf.label;
        row.appendChild(lbl);
        if (!unlocked) {
          var lock = api.el('span', 'hw-lock');
          lock.textContent = api.t('lockedShelf');
          row.appendChild(lock);
        }
        row.addEventListener('click', function () {
          if (!unlocked) { self.gateOpen = true; self.panelOpen = false; self.render(); return; }
          self.ring = false;
          self.shelfId = shelf.id;
          self.index = 0;
          self.mapped = {};
          self.flipped = false;
          self.panelOpen = false;
          self._saveStore();
          self.render();
        });
        sec.appendChild(row);

        /* THE STRUCTURAL GATE: the word grid is built only when the shelf
           is genuinely open — a locked shelf emits no displays, no images. */
        if (unlocked) {
          var grid = api.el('div', 'hw-wordgrid');
          var words = self.wordsForShelf(shelf.id);
          for (var k = 0; k < words.length; k++) {
            (function (word) {
              var t = api.el('button', 'hw-wordchip');
              t.type = 'button';
              t.textContent = word.display;
              if (self._store.known && self._store.known[word.id]) t.classList.add('hw-chip-known');
              t.addEventListener('click', function () {
                self.ring = false;
                self.shelfId = shelf.id;
                var l = self.list();
                for (var z = 0; z < l.length; z++) if (l[z].id === word.id) { self.index = z; break; }
                self.mapped = {};
                self.flipped = false;
                self.panelOpen = false;
                self._saveStore();
                self.render();
              });
              grid.appendChild(t);
            })(words[k]);
          }
          sec.appendChild(grid);
        }
        panel.appendChild(sec);
      })(shelves[i]);
    }

    panel.appendChild(this._buildSiblings());
    scrim.appendChild(panel);
    return scrim;
  },

  /* =================================================================
     PREMIUM GATE
     ================================================================= */

  _buildGate: function () {
    var self = this, api = this.api;
    var scrim = api.el('div', 'hw-scrim');
    scrim.addEventListener('click', function (e) {
      if (e.target === scrim) { self.gateOpen = false; self.render(); }
    });
    var g = api.el('div', 'hw-gate');
    var p = api.el('p', 'hw-gate-line');
    p.textContent = api.t('gatePremium');
    g.appendChild(p);
    var a = api.el('a', 'hw-gate-cta');
    a.href = '/' + api.lang + '/pricing?from=tool-heart-words';
    a.target = '_top';
    a.textContent = api.t('unlock');
    g.appendChild(a);
    var c = api.el('button', 'hw-gate-close');
    c.type = 'button';
    c.textContent = api.t('shelfClose');
    c.addEventListener('click', function () { self.gateOpen = false; self.render(); });
    g.appendChild(c);
    scrim.appendChild(g);
    return scrim;
  },

  /* =================================================================
     PRINT SHEET — premium DOM exists for premium visitors only.
     ================================================================= */

  _buildPrintSheet: function () {
    var api = this.api;
    var sheet = api.el('div', 'hw-printsheet');
    var all = (this.bank && this.bank.words) || [];
    for (var i = 0; i < all.length; i++) {
      var w = all[i];
      if (!this._shelfUnlocked(this.shelfById(w.shelf))) continue;
      var card = api.el('div', 'hw-printcard');
      var word = api.el('div', 'hw-printword');
      var html = '';
      for (var k = 0; k < w.boxes.length; k++) {
        var face = this.boxFace(w.boxes[k]);
        html += '<span class="hw-printbox' + (this.isHeart(w, k) ? ' hw-printheart' : '') + '">' + face + '</span>';
      }
      var tail = this.tailText(w);
      if (tail) html += '<span class="hw-printtail">' + tail + '</span>';
      word.innerHTML = html;
      card.appendChild(word);
      var s = api.el('div', 'hw-printsent');
      s.textContent = w.sentence || '';
      card.appendChild(s);
      sheet.appendChild(card);
    }
    return sheet;
  },

  /* =================================================================
     SIBLING PHONICS TOOLS (the quartet footer)
     ================================================================= */

  _buildSiblings: function () {
    var api = this.api;
    var f = api.el('div', 'hw-siblings');
    var lbl = api.el('span', 'hw-sib-label');
    lbl.textContent = api.t('trioLabel') + ' ';
    f.appendChild(lbl);
    var defs = [
      { file: 'sound-boxes', key: 'siblingSbx' },
      { file: 'blending-board', key: 'siblingBbd' },
      { file: 'letter-tiles', key: 'siblingLtl' }
    ];
    for (var i = 0; i < defs.length; i++) {
      if (i) {
        var sep = api.el('span', 'hw-sib-sep');
        sep.textContent = ' · ';
        f.appendChild(sep);
      }
      var a = api.el('a', 'hw-sib-link');
      a.href = '/mini-tools/' + defs[i].file + '.html?lang=' + api.lang;
      a.target = '_top';
      a.textContent = api.t(defs[i].key);
      f.appendChild(a);
    }
    return f;
  },

  /* =================================================================
     SHELL HOOKS
     ================================================================= */

  _speakerSVG: function (s) {
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" aria-hidden="true" focusable="false">'
      + '<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>'
      + '<path d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
      + '</svg>';
  },

  /* An OUTLINE heart, small, in the corner of the tile — deliberately
     unlike Sound Boxes' solid decorative chip that fills a whole box. */
  _heartSVG: function (s) {
    return '<svg class="hw-heart" viewBox="0 0 24 24" width="' + s + '" height="' + s + '" aria-hidden="true" focusable="false">'
      + '<path d="M12 20.3S4.9 15.8 3 12.2C1.4 9 3.2 5.7 6.4 5.7c2 0 3.2 1.1 3.9 2.1.7-1 1.9-2.1 3.9-2.1 3.2 0 5 3.3 3.4 6.5-1.9 3.6-9 8.1-9 8.1z"'
      + ' fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>'
      + '</svg>';
  },

  reset: function () {
    this._clearTimers();
    this.mapped = {};
    this.flipped = false;
    this.ring = false;
    this.index = 0;
    this._celebrated = null;
    this.panelOpen = false;
    this.gateOpen = false;
    this.render();
  },

  onSettings: function () {
    this._saveStore();
    this.mapped = {};
    this.flipped = false;
    this.render();
  }
};

/* =====================================================================
   CSS — injected once, tool-scoped with the hw- prefix. The tool writes
   no protected shell selectors.
   ===================================================================== */
function injectHeartWordsCSS() {
  if (document.getElementById('hw-style')) return;
  var st = document.createElement('style');
  st.id = 'hw-style';
  st.textContent = ''
    + '.hw-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;padding:4px 8px 12px;box-sizing:border-box}'
    + '.hw-loading{min-height:180px}'
    + '.hw-toprow{display:flex;justify-content:center;width:100%}'
    + '.hw-pill{font:600 15px/1.2 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF9EE;border:2px solid #146B5E33;'
    + 'border-radius:999px;padding:9px 18px;min-height:44px;cursor:pointer}'
    + '.hw-pill:hover{background:#FFF3DC}'

    /* --- card + flip --- */
    + '.hw-cardstage{width:100%;max-width:560px;perspective:1200px}'
    /* The card HUGS its content (a short word gets a small card, not a big
       empty one) while never falling below a comfortable minimum. */
    + '.hw-card{position:relative;width:fit-content;max-width:100%;min-width:min(100%,290px);margin-inline:auto;'
    + 'transform-style:preserve-3d;transition:transform .5s cubic-bezier(.4,.1,.2,1)}'
    + '.hw-card.hw-flipped{transform:rotateY(180deg)}'
    + '.hw-face{backface-visibility:hidden;-webkit-backface-visibility:hidden;'
    + 'background:#FFFDF7;border:2px solid #146B5E22;border-radius:22px;padding:20px 16px 18px;'
    + 'box-shadow:0 3px 0 #146B5E14,0 10px 26px -14px #146B5E55;display:flex;flex-direction:column;align-items:center;gap:14px}'
    /* The card sizes to the VISIBLE face: whichever face is showing stays in
       flow, the hidden one goes absolute. A fixed min-height sized to the
       front let the taller sentence face overflow and cover the pill above
       and the nav below. */
    + '.hw-face-map{position:relative;gap:10px}'
    + '.hw-face-sentence{position:absolute;inset:0;transform:rotateY(180deg);justify-content:center}'
    + '.hw-card.hw-flipped .hw-face-map{position:absolute;inset:0}'
    + '.hw-card.hw-flipped .hw-face-sentence{position:relative;inset:auto}'
    /* In FLOW, centred above the word — never absolutely parked in the card
       corner, where it collided with the last box of any longer word at
       every viewport. Flow position makes the collision unrepresentable. */
    + '.hw-wordspeak{width:44px;height:44px;flex:0 0 auto;border-radius:50%;'
    + 'border:2px solid #146B5E22;background:#FFF9EE;color:#146B5E;cursor:pointer;display:flex;align-items:center;justify-content:center}'

    /* --- the box row --- */
    + '.hw-boxrow{display:flex;flex-wrap:nowrap;justify-content:center;align-items:flex-end;gap:10px;margin-top:6px;max-width:100%}'
    /* Boxes grow to fill a short word so a two-box card is not a small mark
       floating in a big empty card (the sparse class). */
    + '.hw-box{position:relative;flex:0 1 auto;min-width:0;'
    + 'width:calc(min(112px, (100% - (var(--hw-n) - 1) * 10px) / var(--hw-n)));'
    + 'aspect-ratio:1/1;min-height:56px;border:3px solid #146B5E44;border-radius:14px;background:#FFF9EE;'
    + 'cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;transition:background .18s,border-color .18s,box-shadow .18s}'
    + '.hw-box .hw-glyph{font:700 clamp(20px,5.6vw,34px)/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#3A3226;letter-spacing:.5px}'
    + '.hw-box.hw-wide-glyph .hw-glyph{font-size:clamp(16px,4.2vw,26px)}'
    + '.hw-box .hw-tie{position:absolute;left:18%;right:18%;bottom:9px;height:3px;border-radius:2px;background:#F2784B99}'
    + '.hw-box.hw-mapped{background:#FFFFFF;border-color:#146B5E;box-shadow:0 3px 0 #146B5E22}'
    + '.hw-box.hw-mapped::after{content:"";position:absolute;left:24%;right:24%;bottom:-9px;height:4px;border-radius:3px;'
    + 'background:#146B5E;transform:scaleX(0);transform-origin:center;animation:hw-underline .26s ease forwards}'
    + '.hw-box.hw-hearted::after{display:none}'
    + '.hw-box.hw-hearted{border-color:#F2784B;background:#FFF6F1}'
    + '.hw-heart{position:absolute;top:5px;right:5px;color:#F2784B;animation:hw-stamp .26s cubic-bezier(.3,1.5,.5,1) forwards}'
    + '.hw-box.hw-pop{animation:hw-pop .2s ease}'
    + '.hw-box.hw-glow{box-shadow:0 0 0 4px #F2C94C55,0 3px 0 #146B5E22}'
    + '@keyframes hw-underline{to{transform:scaleX(1)}}'
    + '@keyframes hw-stamp{0%{transform:scale(0);opacity:0}70%{transform:scale(1.15);opacity:1}100%{transform:scale(1);opacity:1}}'
    + '@keyframes hw-pop{50%{transform:translateY(-3px)}}'
    + '.hw-tail{font:700 clamp(18px,4.6vw,28px)/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#9A8F7E;margin-top:-4px}'

    /* --- flip button --- */
    + '.hw-flip{font:600 15px/1.2 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF3DC;border:2px solid #146B5E33;'
    + 'border-radius:999px;padding:10px 18px;min-height:44px;cursor:pointer;margin-top:4px}'
    + '.hw-flip.hw-shimmer{animation:hw-shimmer 1.1s ease 2}'
    + '@keyframes hw-shimmer{50%{background:#FFE6BE;box-shadow:0 0 0 4px #F2C94C44}}'

    /* --- sentence face --- */
    + '.hw-pic{width:min(190px,44vw);height:auto;object-fit:contain;user-select:none;-webkit-user-drag:none}'
    + '.hw-sentence{font:600 clamp(17px,4.2vw,23px)/1.45 Nunito,system-ui,sans-serif;color:#3A3226;text-align:center;'
    + 'margin:0;max-width:min(420px,88vw)}'
    + '.hw-sent-target{font-weight:800;color:#146B5E;border-bottom:3px solid #F2784B;padding-bottom:1px}'
    + '.hw-sent-heart{font-size:.7em;color:#F2784B;vertical-align:super;margin-left:2px}'
    /* flex-shrink:0 — a column flex parent shrinks its children by default,
       which silently compressed this 44px control to 28px (the tap gate
       caught it). Fixed-size controls never shrink. */
    + '.hw-sentspeak{width:44px;height:44px;flex:0 0 auto;border-radius:50%;border:2px solid #146B5E22;background:#FFF9EE;'
    + 'color:#146B5E;cursor:pointer;display:flex;align-items:center;justify-content:center}'
    + '.hw-flip{flex:0 0 auto}'
    + '.hw-sentence{flex:0 1 auto}'

    /* --- nav --- */
    + '.hw-nav{display:flex;gap:14px}'
    + '.hw-navbtn{width:48px;height:48px;border-radius:50%;border:2px solid #146B5E33;background:#FFF9EE;color:#146B5E;'
    + 'font:700 24px/1 Nunito,system-ui,sans-serif;cursor:pointer}'
    + '.hw-navbtn:hover{background:#FFF3DC}'

    /* --- bookshelf --- */
    + '.hw-shelf{width:100%;max-width:620px;background:#FFF9EE;border:2px solid #146B5E1A;border-radius:18px;padding:10px 12px 12px}'
    + '.hw-shelf-head{font:700 13px/1.2 Nunito,system-ui,sans-serif;color:#7A6A55;text-transform:uppercase;'
    + 'letter-spacing:.06em;margin-bottom:8px;text-align:center}'
    + '.hw-shelf-rail{display:flex;flex-wrap:wrap;gap:5px;align-items:flex-end;justify-content:center;'
    + 'border-bottom:5px solid #C9A227;border-radius:2px;padding-bottom:6px;min-height:46px}'
    /* An empty shelf must not draw its wooden edge: a full-width saturated
       bar under an empty area reads as a filled progress bar, which is
       exactly the signal this tool must never send. */
    + '.hw-shelf-rail.hw-rail-empty{border-bottom:none;min-height:0;padding-bottom:0}'
    + '.hw-spine{writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(var(--hw-tilt,0deg));'
    + 'background:var(--hw-spine,#8FB9A8);color:#FFFDF7;border:none;border-radius:3px 3px 1px 1px;'
    + 'font:700 12px/1 Nunito,system-ui,sans-serif;padding:8px 4px;min-height:44px;cursor:pointer;'
    + 'box-shadow:1px 0 0 #00000018}'
    + '.hw-shelf-empty{font:italic 500 13px/1.4 Nunito,system-ui,sans-serif;color:#9A8F7E;margin:6px 0;text-align:center}'

    /* --- tools --- */
    + '.hw-tools{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}'
    + '.hw-toolbtn{font:600 14px/1.2 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF9EE;'
    + 'border:2px solid #146B5E33;border-radius:999px;padding:10px 16px;min-height:44px;cursor:pointer}'
    + '.hw-toolbtn.hw-locked{opacity:.62}'

    /* --- panel --- */
    + '.hw-scrim{position:fixed;inset:0;background:#3A322680;display:flex;align-items:center;justify-content:center;'
    + 'padding:16px;z-index:70}'
    + '.hw-panel{background:#FFFDF7;border-radius:20px;max-width:520px;width:100%;max-height:82vh;overflow:auto;'
    + 'padding:16px;box-shadow:0 18px 44px -18px #00000066;z-index:71}'
    + '.hw-panel-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}'
    + '.hw-panel-title{font:700 18px/1.2 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;margin:0}'
    + '.hw-panel-close{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF3DC;'
    + 'border:2px solid #146B5E33;border-radius:999px;padding:9px 14px;min-height:44px;cursor:pointer}'
    + '.hw-shelfsec{border-top:1px solid #146B5E1A;padding:10px 0}'
    + '.hw-shelfrow{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;'
    + 'background:none;border:none;cursor:pointer;padding:8px 4px;min-height:44px;text-align:left}'
    + '.hw-shelflabel{font:700 15px/1.3 Nunito,system-ui,sans-serif;color:#3A3226}'
    + '.hw-lock{font:600 11px/1 Nunito,system-ui,sans-serif;color:#9A8F7E;background:#F3ECDD;'
    + 'border-radius:999px;padding:5px 9px;white-space:nowrap}'
    + '.hw-shelfsec.hw-locked .hw-shelflabel{color:#9A8F7E}'
    + '.hw-wordgrid{display:flex;flex-wrap:wrap;gap:6px;padding:4px 4px 0}'
    + '.hw-wordchip{font:600 14px/1 Nunito,system-ui,sans-serif;color:#3A3226;background:#FFF9EE;'
    + 'border:2px solid #146B5E22;border-radius:999px;padding:9px 13px;min-height:44px;cursor:pointer}'
    + '.hw-wordchip.hw-chip-known{border-color:#F2784B;color:#146B5E}'

    /* --- gate --- */
    + '.hw-gate{background:#FFFDF7;border-radius:20px;max-width:420px;width:100%;padding:20px;text-align:center;'
    + 'box-shadow:0 18px 44px -18px #00000066;z-index:71}'
    + '.hw-gate-line{font:600 16px/1.45 Nunito,system-ui,sans-serif;color:#3A3226;margin:0 0 14px}'
    + '.hw-gate-cta{display:inline-block;font:700 15px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#F2784B;'
    + 'border-radius:999px;padding:14px 22px;text-decoration:none;min-height:44px;box-sizing:border-box}'
    + '.hw-gate-close{display:block;margin:12px auto 0;font:600 14px/1 Nunito,system-ui,sans-serif;color:#7A6A55;'
    + 'background:none;border:none;cursor:pointer;min-height:44px}'

    /* --- siblings --- */
    + '.hw-siblings{font:500 13px/1.5 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;margin-top:2px}'
    + '.hw-sib-link{color:#146B5E;text-decoration:underline}'
    + '.hw-empty{font:500 15px/1.5 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;padding:30px 10px}'

    /* --- print sheet (screen-hidden; premium DOM only) --- */
    + '.hw-printsheet{display:none}'

    /* --- narrow phones: the box row is the hero and must not shrink away --- */
    + '@media (max-width:420px){'
    + '.hw-boxrow{gap:6px}'
    + '.hw-box{border-width:2px;border-radius:11px;min-height:48px;'
    + 'width:calc(min(96px, (100% - (var(--hw-n) - 1) * 6px) / var(--hw-n)))}'
    + '.hw-face{padding:14px 10px 12px;border-radius:18px}'
    + '}'
    + 'body.hw-wide{overflow-y:auto}'

    /* --- reduced motion: no rotation, no stamp bounce --- */
    + '@media (prefers-reduced-motion:reduce){'
    + '.hw-card{transition:none}'
    + '.hw-card.hw-flipped{transform:none}'
    + '.hw-card.hw-flipped .hw-face-map{opacity:0;pointer-events:none}'
    + '.hw-face-sentence{transform:none;opacity:0;pointer-events:none;transition:opacity .2s}'
    + '.hw-card.hw-flipped .hw-face-sentence{opacity:1;pointer-events:auto}'
    + '.hw-heart{animation:none}'
    + '.hw-box.hw-pop{animation:none}'
    + '.hw-box.hw-mapped::after{animation:none;transform:scaleX(1)}'
    + '.hw-flip.hw-shimmer{animation:none}'
    + '}'

    /* --- print: the heart-word card sheet --- */
    + '@media print{'
    + '.hw-toprow,.hw-cardstage,.hw-nav,.hw-shelf,.hw-tools,.hw-siblings,.hw-scrim{display:none !important}'
    + '.hw-printsheet{display:grid !important;grid-template-columns:1fr 1fr;gap:10mm;padding:8mm}'
    + '.hw-printcard{border:1.5pt dashed #666;border-radius:6pt;padding:6mm;text-align:center;page-break-inside:avoid;break-inside:avoid}'
    + '.hw-printword{margin-bottom:4mm}'
    + '.hw-printbox{display:inline-block;border:1.2pt solid #333;border-radius:3pt;min-width:11mm;padding:3mm 2mm;'
    + 'margin:0 1.2mm;font:700 16pt/1 serif}'
    + '.hw-printheart{border-color:#000;border-width:2pt;position:relative}'
    + '.hw-printheart::after{content:"\\2661";position:absolute;top:-1mm;right:-1mm;font-size:9pt}'
    + '.hw-printtail{font:700 16pt/1 serif;color:#888;margin-left:1.5mm}'
    + '.hw-printsent{font:400 11pt/1.4 serif;color:#222}'
    + '}';
  document.head.appendChild(st);
}
