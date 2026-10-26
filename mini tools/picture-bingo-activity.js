/* =====================================================================
   picture-bingo-activity.js — ACTIVITY #62 of the one-by-one rebuild:
   "Bingo's Word Hunt" → BINGO'S PICTURE CARD (RF.K.3.d, 11 locales).
   Design sheet: docs/activities-rebuild/designs/062-bingo-word-hunt.md
   ---------------------------------------------------------------------
   THE INVENTION: a bingo card of look-alike words. Bingo (the library
   dog) calls a picture; the child puts a chip on the word that names it
   and presses Check — a right word flips over into its picture. Call by
   call the card turns into a picture card; a full row, column or diagonal
   is a BINGO line; the words left over at the end are the ones never
   called. A wrong chip slides off and the letter that made it another
   word lights up. You call: the roles swap — Bingo holds the pictures,
   the child holds three look-alike word cards and calls one, and Bingo
   covers exactly what that word names.

   ACTIVITY LAYER ONLY: the model is picture-bingo-core.js; lcs-shell.js
   is untouched (its Check is hidden and pressed by this activity on
   success). Test seams: window.PictureBingoActivity.st / ._order / ._pool
   / .FAST.
   ===================================================================== */
'use strict';

var PictureBingoActivity = {
  id: 'picture-bingo',
  apparatusClasses: ['pbg-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:        {en:'Bingo’s Picture Card',de:'Bingos Bilderkarte',nl:'Bingo’s plaatjeskaart',da:'Bingos billedplade',sv:'Bingos bildbricka',no:'Bingos bildebrett',es:'La tarjeta de Bingo',it:'La cartella di Bingo',pt:'A cartela do Bingo',fr:'La carte de Bingo',fi:'Bingon kuvakortti'},
    instruction:  {en:'Bingo calls a picture. Find its word on your card!',de:'Bingo ruft ein Bild auf. Finde sein Wort auf deiner Karte!',nl:'Bingo roept een plaatje. Zoek het woord op je kaart!',da:'Bingo råber et billede op. Find ordet på din plade!',sv:'Bingo ropar upp en bild. Hitta ordet på din bricka!',no:'Bingo roper opp et bilde. Finn ordet på brettet ditt!',es:'Bingo canta un dibujo. ¡Busca su palabra en tu tarjeta!',it:'Bingo estrae un disegno. Trova la parola sulla tua cartella!',pt:'O Bingo sorteia uma figura. Encontre a palavra na sua cartela!',fr:'Bingo tire une image. Trouve son mot sur ta carte !',fi:'Bingo arpoo kuvan. Etsi sen sana kortiltasi!'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    pCard:        {en:'Put a chip on the word for Bingo’s picture.',de:'Leg einen Chip auf das Wort für Bingos Bild.',nl:'Leg een fiche op het woord bij Bingo’s plaatje.',da:'Læg en brik på ordet til Bingos billede.',sv:'Lägg en marker på ordet till Bingos bild.',no:'Legg en brikke på ordet til Bingos bilde.',es:'Pon una ficha en la palabra del dibujo de Bingo.',it:'Metti un gettone sulla parola del disegno di Bingo.',pt:'Coloque uma ficha na palavra da figura do Bingo.',fr:'Pose un jeton sur le mot de l’image de Bingo.',fi:'Laita pelimerkki sanaan, joka sopii Bingon kuvaan.'},
    pCall:        {en:'Bingo needs one more picture. Read your cards and call the right word!',de:'Bingo braucht noch ein Bild. Lies deine Karten und ruf das richtige Wort!',nl:'Bingo heeft nog één plaatje nodig. Lees je kaartjes en roep het goede woord!',da:'Bingo mangler ét billede. Læs dine kort, og råb det rigtige ord!',sv:'Bingo behöver en bild till. Läs dina kort och ropa rätt ord!',no:'Bingo trenger ett bilde til. Les kortene dine og rop det riktige ordet!',es:'A Bingo le falta un dibujo. ¡Lee tus tarjetas y canta la palabra correcta!',it:'A Bingo manca un disegno. Leggi le tue carte e chiama la parola giusta!',pt:'O Bingo precisa de mais uma figura. Leia suas cartas e diga a palavra certa!',fr:'Il manque une image à Bingo. Lis tes cartes et annonce le bon mot !',fi:'Bingo tarvitsee vielä yhden kuvan. Lue korttisi ja huuda oikea sana!'},
    hintEmpty:    {en:'Find the word for Bingo’s picture and put a chip on it.',de:'Finde das Wort für Bingos Bild und leg einen Chip darauf.',nl:'Zoek het woord bij Bingo’s plaatje en leg er een fiche op.',da:'Find ordet til Bingos billede, og læg en brik på det.',sv:'Hitta ordet till Bingos bild och lägg en marker på det.',no:'Finn ordet til Bingos bilde og legg en brikke på det.',es:'Busca la palabra del dibujo de Bingo y ponle una ficha.',it:'Trova la parola del disegno di Bingo e mettici un gettone.',pt:'Encontre a palavra da figura do Bingo e coloque uma ficha nela.',fr:'Trouve le mot de l’image de Bingo et pose un jeton dessus.',fi:'Etsi sana, joka sopii Bingon kuvaan, ja laita siihen pelimerkki.'},
    hintMiss:     {en:'That word says something else. Look at the coral letters and read it again.',de:'Dieses Wort heißt etwas anderes. Schau auf die leuchtenden Buchstaben und lies noch einmal.',nl:'Dat woord betekent iets anders. Kijk naar de oplichtende letters en lees nog eens.',da:'Det ord betyder noget andet. Se på de lysende bogstaver, og læs igen.',sv:'Det ordet betyder något annat. Titta på bokstäverna som lyser och läs igen.',no:'Det ordet betyr noe annet. Se på bokstavene som lyser, og les igjen.',es:'Esa palabra dice otra cosa. Mira las letras que brillan y vuelve a leer.',it:'Quella parola dice un’altra cosa. Guarda le lettere che si illuminano e rileggi.',pt:'Essa palavra diz outra coisa. Olhe as letras que brilham e leia de novo.',fr:'Ce mot dit autre chose. Regarde les lettres qui s’allument et relis.',fi:'Se sana tarkoittaa jotain muuta. Katso hehkuvia kirjaimia ja lue uudelleen.'},
    hintMiss2:    {en:'Look at each letter. Which word names the picture?',de:'Schau jeden Buchstaben genau an. Welches Wort passt zum Bild?',nl:'Kijk goed naar elke letter. Welk woord hoort bij het plaatje?',da:'Se godt på hvert bogstav. Hvilket ord passer til billedet?',sv:'Titta noga på varje bokstav. Vilket ord passar till bilden?',no:'Se godt på hver bokstav. Hvilket ord passer til bildet?',es:'Mira bien cada letra. ¿Qué palabra nombra el dibujo?',it:'Guarda bene ogni lettera. Quale parola nomina il disegno?',pt:'Olhe bem cada letra. Qual palavra dá nome à figura?',fr:'Regarde bien chaque lettre. Quel mot nomme l’image ?',fi:'Katso jokaista kirjainta tarkasti. Mikä sana sopii kuvaan?'},
    hintMissSyl:  {en:'That word says something else. Look at the coral syllable and read it again.',de:'Dieses Wort heißt etwas anderes. Schau auf die leuchtende Silbe und lies noch einmal.',nl:'Dat woord betekent iets anders. Kijk naar de oplichtende lettergreep en lees nog eens.',da:'Det ord betyder noget andet. Se på den lysende stavelse, og læs igen.',sv:'Det ordet betyder något annat. Titta på stavelsen som lyser och läs igen.',no:'Det ordet betyr noe annet. Se på stavelsen som lyser, og les igjen.',es:'Esa palabra dice otra cosa. Mira la sílaba que brilla y vuelve a leer.',it:'Quella parola dice un’altra cosa. Guarda la sillaba che si illumina e rileggi.',pt:'Essa palavra diz outra coisa. Olhe a sílaba que brilha e leia de novo.',fr:'Ce mot dit autre chose. Regarde la syllabe qui s’allume et relis.',fi:'Se sana tarkoittaa jotain muuta. Katso hehkuvaa tavua ja lue uudelleen.'},
    hintMiss2Syl: {en:'Look at each syllable. Which word names the picture?',de:'Schau jede Silbe genau an. Welches Wort passt zum Bild?',nl:'Kijk goed naar elke lettergreep. Welk woord hoort bij het plaatje?',da:'Se godt på hver stavelse. Hvilket ord passer til billedet?',sv:'Titta noga på varje stavelse. Vilket ord passar till bilden?',no:'Se godt på hver stavelse. Hvilket ord passer til bildet?',es:'Mira bien cada sílaba. ¿Qué palabra nombra el dibujo?',it:'Guarda bene ogni sillaba. Quale parola nomina il disegno?',pt:'Olhe bem cada sílaba. Qual palavra dá nome à figura?',fr:'Regarde bien chaque syllabe. Quel mot nomme l’image ?',fi:'Katso jokaista tavua tarkasti. Mikä sana sopii kuvaan?'},
    hintEmptyCall:{en:'Put one of your word cards in Bingo’s slot.',de:'Steck eine deiner Wortkarten in Bingos Schlitz.',nl:'Stop een van je woordkaartjes in Bingo’s gleuf.',da:'Læg et af dine ordkort i Bingos sprække.',sv:'Lägg ett av dina ordkort i Bingos springa.',no:'Legg ett av ordkortene dine i Bingos åpning.',es:'Pon una de tus tarjetas de palabras en la ranura de Bingo.',it:'Metti una delle tue carte-parola nella fessura di Bingo.',pt:'Coloque uma das suas cartas de palavra na abertura do Bingo.',fr:'Glisse une de tes cartes-mots dans la fente de Bingo.',fi:'Laita yksi sanakorteistasi Bingon rakoon.'},
    hintCallDecoy:{en:'Bingo covered {got}. He needs {need}. Which card says {need}?',de:'Bingo hat {got} abgedeckt. Er braucht {need}. Welche Karte zeigt {need}?',nl:'Bingo heeft {got} bedekt. Hij heeft {need} nodig. Welk kaartje zegt {need}?',da:'Bingo dækkede {got}. Han skal bruge {need}. Hvilket kort står der {need} på?',sv:'Bingo täckte {got}. Han behöver {need}. På vilket kort står det {need}?',no:'Bingo dekket {got}. Han trenger {need}. Hvilket kort står det {need} på?',es:'Bingo tapó {got}. Necesita {need}. ¿Qué tarjeta dice {need}?',it:'Bingo ha coperto {got}. Gli serve {need}. Quale carta dice {need}?',pt:'O Bingo cobriu {got}. Ele precisa de {need}. Qual carta diz {need}?',fr:'Bingo a couvert {got}. Il lui faut {need}. Quelle carte dit {need} ?',fi:'Bingo peitti kuvan {got}. Bingo tarvitsee kuvan {need}. Missä kortissa lukee {need}?'},
    hintCallNone: {en:'Bingo has no picture for that word. He needs {need}.',de:'Bingo hat kein Bild für dieses Wort. Er braucht {need}.',nl:'Bingo heeft geen plaatje bij dat woord. Hij heeft {need} nodig.',da:'Bingo har intet billede til det ord. Han skal bruge {need}.',sv:'Bingo har ingen bild till det ordet. Han behöver {need}.',no:'Bingo har ikke noe bilde til det ordet. Han trenger {need}.',es:'Bingo no tiene dibujo para esa palabra. Necesita {need}.',it:'Bingo non ha un disegno per quella parola. Gli serve {need}.',pt:'O Bingo não tem figura para essa palavra. Ele precisa de {need}.',fr:'Bingo n’a pas d’image pour ce mot. Il lui faut {need}.',fi:'Bingolla ei ole kuvaa sille sanalle. Bingo tarvitsee kuvan {need}.'},
    hintCall2:    {en:'Look at the faint letters on Bingo’s picture. Find the card with the same letters.',de:'Schau auf die blassen Buchstaben auf Bingos Bild. Finde die Karte mit denselben Buchstaben.',nl:'Kijk naar de vage letters op Bingo’s plaatje. Zoek het kaartje met dezelfde letters.',da:'Se på de svage bogstaver på Bingos billede. Find kortet med de samme bogstaver.',sv:'Titta på de svaga bokstäverna på Bingos bild. Hitta kortet med samma bokstäver.',no:'Se på de svake bokstavene på Bingos bilde. Finn kortet med de samme bokstavene.',es:'Mira las letras suaves en el dibujo de Bingo. Busca la tarjeta con las mismas letras.',it:'Guarda le lettere chiare sul disegno di Bingo. Trova la carta con le stesse lettere.',pt:'Olhe as letras clarinhas na figura do Bingo. Encontre a carta com as mesmas letras.',fr:'Regarde les lettres pâles sur l’image de Bingo. Trouve la carte aux mêmes lettres.',fi:'Katso Bingon kuvan haaleita kirjaimia. Etsi kortti, jossa on samat kirjaimet.'},
    okCall:       {en:'{w}! You read it.',de:'{w}! Gut gelesen.',nl:'{w}! Goed gelezen.',da:'{w}! Godt læst.',sv:'{w}! Bra läst.',no:'{w}! Godt lest.',es:'¡{w}! Lo leíste.',it:'{w}! L’hai letta.',pt:'{w}! Você leu.',fr:'{w} ! Tu l’as lu.',fi:'{w}! Luit oikein.'},
    okLine:       {en:'BINGO! {list} in a line.',de:'BINGO! {list} in einer Reihe.',nl:'BINGO! {list} op een rij.',da:'BINGO! {list} på række.',sv:'BINGO! {list} på rad.',no:'BINGO! {list} på rad.',es:'¡BINGO! {list} en línea.',it:'BINGO! {list} in fila.',pt:'BINGO! {list} em linha.',fr:'BINGO ! {list} sur une ligne.',fi:'BINGO! {list} rivissä.'},
    okCard:       {en:'Your card is full of pictures. Never called: {list}.',de:'Deine Karte ist voller Bilder. Nie aufgerufen: {list}.',nl:'Je kaart staat vol plaatjes. Nooit geroepen: {list}.',da:'Din plade er fuld af billeder. Aldrig råbt op: {list}.',sv:'Din bricka är full av bilder. Aldrig uppropade: {list}.',no:'Brettet ditt er fullt av bilder. Aldri ropt opp: {list}.',es:'Tu tarjeta está llena de dibujos. Nunca se cantaron: {list}.',it:'La tua cartella è piena di disegni. Mai estratte: {list}.',pt:'Sua cartela está cheia de figuras. Nunca sorteadas: {list}.',fr:'Ta carte est pleine d’images. Jamais tirés : {list}.',fi:'Korttisi on täynnä kuvia. Arpomatta jäivät: {list}.'},
    okYou:        {en:'You called {w} – BINGO for Bingo!',de:'Du hast {w} gerufen – BINGO für Bingo!',nl:'Jij riep {w} – BINGO voor Bingo!',da:'Du råbte {w} – BINGO til Bingo!',sv:'Du ropade {w} – BINGO för Bingo!',no:'Du ropte {w} – BINGO for Bingo!',es:'Cantaste {w}: ¡BINGO para Bingo!',it:'Hai chiamato {w}: BINGO per Bingo!',pt:'Você disse {w} – BINGO para o Bingo!',fr:'Tu as annoncé {w} : BINGO pour Bingo !',fi:'Huusit {w} – BINGO Bingolle!'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    bingo:        {en:'BINGO!',de:'BINGO!',nl:'BINGO!',da:'BINGO!',sv:'BINGO!',no:'BINGO!',es:'¡BINGO!',it:'BINGO!',pt:'BINGO!',fr:'BINGO !',fi:'BINGO!'},
    setCard:      {en:'Card',de:'Karte',nl:'Kaart',da:'Plade',sv:'Bricka',no:'Brett',es:'Tarjeta',it:'Cartella',pt:'Cartela',fr:'Carte',fi:'Kortti'},
    lvLook:       {en:'Look-alikes',de:'Ähnliche Wörter',nl:'Woorden die lijken',da:'Ord der ligner',sv:'Ord som liknar',no:'Ord som ligner',es:'Palabras parecidas',it:'Parole simili',pt:'Palavras parecidas',fr:'Mots qui se ressemblent',fi:'Samannäköiset sanat'},
    lvFamily:     {en:'Word families',de:'Reimwörter',nl:'Rijmwoorden',da:'Rimord',sv:'Rimord',no:'Rimord',es:'Familias de palabras',it:'Famiglie di parole',pt:'Famílias de palavras',fr:'Mots qui riment',fi:'Riimisanat'},
    lvBlend:      {en:'Blends',de:'Konsonantenpaare',nl:'Medeklinkers vooraan',da:'Konsonantpar',sv:'Konsonantpar',no:'Konsonantpar',es:'Sílabas trabadas',it:'Gruppi consonantici',pt:'Encontros consonantais',fr:'Groupes de consonnes',fi:'Konsonanttiyhtymät'},
    lvSyll:       {en:'Syllables',de:'Silben',nl:'Lettergrepen',da:'Stavelser',sv:'Stavelser',no:'Stavelser',es:'Sílabas',it:'Sillabe',pt:'Sílabas',fr:'Syllabes',fi:'Tavut'},
    lvCall:       {en:'You call',de:'Du rufst',nl:'Jij roept',da:'Du råber',sv:'Du ropar',no:'Du roper',es:'Tú cantas',it:'Chiami tu',pt:'Você canta',fr:'C’est toi qui annonces',fi:'Sinä huudat'},
    setRead:      {en:'Read the call',de:'Der Aufruf',nl:'De oproep',da:'Opråbet',sv:'Uppropet',no:'Oppropet',es:'Lo que canta Bingo',it:'L’estrazione',pt:'O sorteio',fr:'Le tirage',fi:'Arvonta'},
    rPic:         {en:'Picture',de:'Bild',nl:'Plaatje',da:'Billede',sv:'Bild',no:'Bilde',es:'Dibujo',it:'Disegno',pt:'Figura',fr:'Image',fi:'Kuva'},
    rLetter:      {en:'Picture and first letter',de:'Bild und erster Buchstabe',nl:'Plaatje en eerste letter',da:'Billede og første bogstav',sv:'Bild och första bokstaven',no:'Bilde og første bokstav',es:'Dibujo y primera letra',it:'Disegno e prima lettera',pt:'Figura e primeira letra',fr:'Image et première lettre',fi:'Kuva ja ensimmäinen kirjain'},
    ariaCall:     {en:'Bingo calls: {w}',de:'Bingo ruft: {w}',nl:'Bingo roept: {w}',da:'Bingo råber: {w}',sv:'Bingo ropar: {w}',no:'Bingo roper: {w}',es:'Bingo canta: {w}',it:'Bingo estrae: {w}',pt:'O Bingo sorteia: {w}',fr:'Bingo tire : {w}',fi:'Bingo arpoo: {w}'},
    ariaSquare:   {en:'Square: {w}',de:'Feld: {w}',nl:'Vakje: {w}',da:'Felt: {w}',sv:'Ruta: {w}',no:'Rute: {w}',es:'Casilla: {w}',it:'Casella: {w}',pt:'Casa: {w}',fr:'Case : {w}',fi:'Ruutu: {w}'},
    ariaFlipped:  {en:'{w}: now a picture',de:'{w}: jetzt ein Bild',nl:'{w}: nu een plaatje',da:'{w}: nu et billede',sv:'{w}: nu en bild',no:'{w}: nå et bilde',es:'{w}: ahora es un dibujo',it:'{w}: ora è un disegno',pt:'{w}: agora é uma figura',fr:'{w} : maintenant une image',fi:'{w}: nyt kuva'},
    ariaLeft:     {en:'Never called: {w}',de:'Nie aufgerufen: {w}',nl:'Nooit geroepen: {w}',da:'Aldrig råbt op: {w}',sv:'Aldrig uppropat: {w}',no:'Aldri ropt opp: {w}',es:'Nunca se cantó: {w}',it:'Mai estratta: {w}',pt:'Nunca sorteada: {w}',fr:'Jamais tiré : {w}',fi:'Ei arvottu: {w}'},
    ariaHand:     {en:'Word card: {w}',de:'Wortkarte: {w}',nl:'Woordkaartje: {w}',da:'Ordkort: {w}',sv:'Ordkort: {w}',no:'Ordkort: {w}',es:'Tarjeta: {w}',it:'Carta: {w}',pt:'Carta: {w}',fr:'Carte-mot : {w}',fi:'Sanakortti: {w}'},
    ariaSlot:     {en:'Bingo’s call slot',de:'Bingos Schlitz',nl:'Bingo’s gleuf',da:'Bingos sprække',sv:'Bingos springa',no:'Bingos åpning',es:'Ranura de Bingo',it:'Fessura di Bingo',pt:'Abertura do Bingo',fr:'Fente de Bingo',fi:'Bingon rako'},
    ariaYou:      {en:'Bingo’s picture: {w}',de:'Bingos Bild: {w}',nl:'Bingo’s plaatje: {w}',da:'Bingos billede: {w}',sv:'Bingos bild: {w}',no:'Bingos bilde: {w}',es:'Dibujo de Bingo: {w}',it:'Disegno di Bingo: {w}',pt:'Figura do Bingo: {w}',fr:'Image de Bingo : {w}',fi:'Bingon kuva: {w}'},
    ariaChip:     {en:'Chip',de:'Chip',nl:'Fiche',da:'Brik',sv:'Marker',no:'Brikke',es:'Ficha',it:'Gettone',pt:'Ficha',fr:'Jeton',fi:'Pelimerkki'}
    /*STRINGS-END*/
  },

  defaults: { level: 'look', read: 'pic' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setCard', options: [{ value: 'look', labelKey: 'lvLook' }, { value: 'family', labelKey: 'lvFamily' }, { value: 'blend', labelKey: 'lvBlend' }, { value: 'syll', labelKey: 'lvSyll' }, { value: 'call', labelKey: 'lvCall' }] },
    { key: 'read', type: 'choice', labelKey: 'setRead', options: [{ value: 'pic', labelKey: 'rPic' }, { value: 'letter', labelKey: 'rLetter' }] }
  ],

  OK_MS: 500, FAST: false,
  LV_KEY: { look: 'lvLook', family: 'lvFamily', blend: 'lvBlend', syll: 'lvSyll', call: 'lvCall' },
  QUOTES: { en: ['“', '”'], de: ['„', '“'], nl: ['‘', '’'], da: ['»', '«'], sv: ['”', '”'], no: ['«', '»'], es: ['«', '»'], it: ['«', '»'], pt: ['“', '”'], fr: ['« ', ' »'], fi: ['”', '”'] },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0; this._deal = null;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._cards = {}; this._drag = null; this._pa = {};
    var ls = PictureBingoCore.levels(this._loc()), self = this;
    this.settings = [
      { key: 'level', type: 'choice', labelKey: 'setCard', options: ls.map(function (v) { return { value: v, labelKey: self.LV_KEY[v] }; }) },
      { key: 'read', type: 'choice', labelKey: 'setRead', options: [{ value: 'pic', labelKey: 'rPic' }, { value: 'letter', labelKey: 'rLetter' }] }
    ];
    injectBingoCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; this._cards = {}; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return PictureBingoCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _lv: function () { return PictureBingoCore.level(this._loc(), this._set('level')); },
  _key: function () { return this._loc() + '/' + this._lv(); },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },
  _q: function (s) { var Q = this.QUOTES[this._loc()] || this.QUOTES.en; return Q[0] + s + Q[1]; },
  _list: function (ws) { var self = this; return ws.map(function (w) { return self._q(w); }).join(', '); },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = PictureBingoCore.rounds(this._loc(), this._lv()); this._poolKey = k; this._order = null; this._cards = {}; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = PictureBingoCore, self = this;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._cards = {}; this._deal = null; }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._cards = {}; this._deal = null; }
    if (pool[0].level === 'call' && !this._deal) { var seed = String(Math.random()); this._deal = { hands: C.dealHands(pool, Math.random), pos: C.youPositions(n, pass, seed) }; }
    var k = this._order[index % n], r = pool[k], pa = { msg: '' }; this._pa = pa;
    var hand = this._deal ? this._deal.hands[k] : null, yc = this._deal ? C.youCard(r, this._deal.pos[index % n], Math.random) : null;
    return {
      id: 'picture-bingo.' + r.loc + '.' + r.id, promptKey: r.level === 'call' ? 'pCall' : 'pCard', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._view = {}; tool._drag = null;
        if (r.level === 'call') { tool.st = C.newState(r, null, yc); tool.st.hand = hand; }
        else { var cs = tool._cards[r.card.id] || (tool._cards[r.card.id] = C.newCardState(r.card)); tool.st = C.newState(r, cs); }
        tool._say(r.level === 'call' ? '' : r.word);
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = PictureBingoCore, r0 = C.rounds(this._loc(), 'look')[0]; this.st = C.newState(r0, C.newCardState(r0.card)); }
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
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'pbg-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    this._booth = api.el('div', 'pbg-booth'); wrap.appendChild(this._booth);
    this._board = api.el('div', 'pbg-board'); wrap.appendChild(this._board);
    var ask = api.el('div', 'pbg-ask'); wrap.appendChild(ask);
    this._tray = api.el('div', 'pbg-tray'); ask.appendChild(this._tray);
    var note = api.el('p', 'pbg-note'); note.setAttribute('aria-live', 'polite'); this._note = note; ask.appendChild(note);
    var chk = api.el('button', 'pbg-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check');
    chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
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
    if (!this._board) return;
    var st = this.st, C = PictureBingoCore, r = st.r, v = this._view;
    var cols = r.level === 'call' ? 3 : r.card.cols;
    var L = this._L = C.layout(this._width(), cols);
    this._wrap.className = 'pbg-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 310 ? ' is-tiny' : '') + ' is-lv-' + r.level + (this.FAST ? ' is-fast' : '');
    [['dog', L.dog], ['call', L.callPic], ['sqw', L.sqW], ['sqh', L.sqH], ['font', L.font], ['flip', L.flip], ['you', L.youPic]].forEach(function (p) { this._wrap.style.setProperty('--pbg-' + p[0], p[1] + 'px'); }, this);
    this._paintBooth();
    if (r.level === 'call') this._paintYou(); else this._paintCard();
    var h = C.hint(st), msg = '';
    if (st.done) msg = v.msg || '';
    else if (h && !this._busy) msg = this._t(h, { got: st.last && st.last.word ? this._q(st.last.word) : '', need: this._q(r.need || '') });
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.last && st.last.result !== 'empty'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    this._checkBtn.textContent = this._t('check');
  },
  /* the caller's booth: Bingo, the call card (a picture, with its first letter on a tab if the setting asks), the used calls */
  _paintBooth: function () {
    var el = this._booth, st = this.st, r = st.r, self = this, v = this._view; el.innerHTML = '';
    var dog = this.api.el('img', 'pbg-dog' + (v.hop ? ' is-hop' : '')); dog.alt = ''; dog.src = this._pic(PictureBingoCore.BINGO_PIC); dog.draggable = false; el.appendChild(dog);
    if (r.level === 'call') {
      var slot = this.api.el('button', 'pbg-slot' + (st.slot ? ' is-full' : '') + (v.nudge ? ' is-nudge' : '')); slot.type = 'button'; slot.setAttribute('data-k', 'slot'); slot.setAttribute('aria-label', this._t('ariaSlot') + (st.slot ? ': ' + st.slot : ''));
      if (st.slot) { var wc = this.api.el('span', 'pbg-slotword'); wc.textContent = st.slot; slot.appendChild(wc); }
      slot.addEventListener('click', function () { if (st.slot) self._slot(st.slot); });
      el.appendChild(slot);
      if (v.bingo) { var bn = this.api.el('span', 'pbg-banner'); bn.textContent = this._t('bingo'); el.appendChild(bn); }
      return;
    }
    var call = this.api.el('button', 'pbg-callcard' + (v.wiggle ? ' is-wiggle' : '')); call.type = 'button'; call.setAttribute('data-k', 'call');
    call.setAttribute('aria-label', this._t('ariaCall', { w: r.word }));
    var im = this.api.el('img', 'pbg-callpic'); im.alt = ''; im.draggable = false; im.src = this._pic(r.pic); call.appendChild(im);
    if (this._set('read') === 'letter') { var tab = this.api.el('span', 'pbg-tab'); tab.textContent = Array.from(r.word)[0]; tab.setAttribute('aria-hidden', 'true'); call.appendChild(tab); }
    call.addEventListener('click', function () { self._say(r.word); });
    el.appendChild(call);
    var used = this.api.el('div', 'pbg-used'); used.setAttribute('aria-hidden', 'true');
    st.cs.flipped.slice(-4).forEach(function (i) { var t = self.api.el('img', 'pbg-usedpic'); t.alt = ''; t.src = self._pic(st.cs.card.sq[i].pic); used.appendChild(t); });
    el.appendChild(used);
    if (v.bingo) { var b2 = this.api.el('span', 'pbg-banner'); b2.textContent = this._t('bingo'); el.appendChild(b2); }
  },
  /* the card: words that flip into pictures */
  _paintCard: function () {
    var el = this._board, st = this.st, r = st.r, c = st.cs.card, self = this, L = this._L, v = this._view, C = PictureBingoCore; el.innerHTML = '';
    var help = C.helpOf(st), lined = {}; st.cs.lines.forEach(function (Ln) { Ln.forEach(function (i) { lined[i] = 1; }); });
    var fresh = {}; (v.lines || []).forEach(function (Ln) { Ln.forEach(function (i) { fresh[i] = 1; }); });
    var full = c.sq.filter(function (s) { return s.called; }).every(function (s) { return st.cs.flipped.indexOf(s.i) >= 0; });
    var grid = this.api.el('div', 'pbg-card'); el.appendChild(grid);
    /* a four-wide card turns on its side on a phone (its rows become columns) */
    var turn = c.cols > L.cols;
    grid.style.setProperty('--pbg-cols', turn ? c.rows : c.cols);
    c.sq.forEach(function (s) {
      var flipped = st.cs.flipped.indexOf(s.i) >= 0;
      var b = self.api.el('button', 'pbg-sq' + (flipped ? ' is-flip' : '') + (st.chip === s.i ? ' has-chip' : '') + (lined[s.i] ? ' is-line' : '') + (fresh[s.i] ? ' is-fresh' : '') + (help && help.dim.indexOf(s.i) >= 0 ? ' is-dim' : '') + (help && help.pulse === s.i ? ' is-pulse' : '') + (!s.called && full ? ' is-left' : '') + (v.just === s.i ? ' is-turn' : '') + (v.slide === s.i ? ' is-slide' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'sq' + s.i); b.setAttribute('data-sq', s.i);
      if (turn) { b.style.gridColumn = String(s.row + 1); b.style.gridRow = String(s.col + 1); }
      if (flipped) {
        b.setAttribute('aria-label', self._t('ariaFlipped', { w: s.word }));
        var im = self.api.el('img', 'pbg-flippic'); im.alt = ''; im.draggable = false; im.src = self._pic(s.pic); b.appendChild(im);
        if (L.mode === 'wide') { var sw = self.api.el('span', 'pbg-small'); sw.textContent = s.word; b.appendChild(sw); }
      } else {
        b.setAttribute('aria-label', (!s.called && full ? self._t('ariaLeft', { w: s.word }) : self._t('ariaSquare', { w: s.word })));
        var w = self.api.el('span', 'pbg-word'); w.style.setProperty('--len', Math.max(3, Array.from(s.word).length + (s.syll ? 1 : 0)));
        var lit = help && help.lit[s.i];
        if (s.syll) s.syll.forEach(function (sy, k) { var sp = self.api.el('span', 'pbg-syl' + (help && help.syl && help.square === s.i && help.syl.indexOf(k) >= 0 ? ' is-diff' : '')); sp.textContent = sy; w.appendChild(sp); });
        else Array.from(s.word).forEach(function (ch, k) { var sp = document.createElement('span'); sp.textContent = ch; if (lit && lit.glow.indexOf(k) >= 0) sp.className = 'is-diff'; else if (lit && lit.extra.indexOf(k) >= 0) sp.className = 'is-diff'; w.appendChild(sp); });
        b.appendChild(w);
        if (st.chip === s.i) { var ch = self.api.el('span', 'pbg-chip'); ch.setAttribute('aria-hidden', 'true'); b.appendChild(ch); }
      }
      b.addEventListener('click', function () { if (flipped) { self._replay(s.i); return; } if (!s.called && full) { self._shrug(s.i); return; } self._place(s.i); });
      grid.appendChild(b);
    });
    /* the chip tray */
    this._tray.innerHTML = '';
    var chip = this.api.el('span', 'pbg-traychip' + (st.chip !== null || st.done ? ' is-used' : '')); chip.setAttribute('data-k', 'tray'); chip.setAttribute('role', 'img'); chip.setAttribute('aria-label', this._t('ariaChip'));
    this._bindChip(chip); this._tray.appendChild(chip);
  },
  /* You call: Bingo's picture card and the child's three word cards */
  _paintYou: function () {
    var el = this._board, st = this.st, r = st.r, self = this, v = this._view, yc = st.youCard; el.innerHTML = '';
    var grid = this.api.el('div', 'pbg-ycard'); el.appendChild(grid);
    yc.sq.forEach(function (s, i) {
      var cell = self.api.el('div', 'pbg-ysq' + (s.need ? ' is-need' : '') + (s.chipped || st.covered.indexOf(i) >= 0 ? ' is-chipped' : '') + (v.bingo && yc.line.indexOf(i) >= 0 ? ' is-line' : '') + (v.wobble === i ? ' is-wobble' : ''));
      cell.setAttribute('role', 'img'); cell.setAttribute('aria-label', self._t('ariaYou', { w: s.word })); cell.setAttribute('data-ysq', i);
      var im = self.api.el('img', 'pbg-ypic'); im.alt = ''; im.draggable = false; im.src = self._pic(s.pic); cell.appendChild(im);
      if (s.need && st.help >= 2 && !st.done) { var g = self.api.el('span', 'pbg-ghost'); g.textContent = s.word; g.setAttribute('aria-hidden', 'true'); cell.appendChild(g); }
      if (s.chipped || st.covered.indexOf(i) >= 0) { var ch = self.api.el('span', 'pbg-chip'); ch.setAttribute('aria-hidden', 'true'); cell.appendChild(ch); }
      grid.appendChild(cell);
    });
    if (v.shrug) { var sh = self.api.el('span', 'pbg-shrug'); sh.textContent = '?'; sh.setAttribute('aria-hidden', 'true'); el.appendChild(sh); }
    var hand = this.api.el('div', 'pbg-hand'); el.appendChild(hand);
    (st.hand || r.hand).forEach(function (w) {
      var lit = st.show && st.last && st.last.word === w && (st.last.result === 'decoy' || st.last.result === 'none') ? st.last.diff : null;
      var b = self.api.el('button', 'pbg-wcard' + (st.slot === w ? ' is-out' : '')); b.type = 'button'; b.setAttribute('data-k', 'wc-' + w); b.setAttribute('data-word', w); b.setAttribute('aria-label', self._t('ariaHand', { w: w }));
      Array.from(w).forEach(function (ch, k) { var sp = document.createElement('span'); sp.textContent = ch; if (lit && (lit.glow.indexOf(k) >= 0 || lit.extra.indexOf(k) >= 0)) sp.className = 'is-diff'; b.appendChild(sp); });
      b.addEventListener('click', function () { self._slot(w); });
      hand.appendChild(b);
    });
    this._tray.innerHTML = '';
  },

  /* ---------------- the hand ---------------- */
  _place: function (i) { if (this._busy || this.st.done) return; if (PictureBingoCore.placeChip(this.st, i)) { this._view = {}; this.api.sound(this.st.chip === i ? 560 : 330); this._paint(); } },
  _slot: function (w) { if (this._busy || this.st.done) return; if (PictureBingoCore.putInSlot(this.st, w)) { this._view = {}; this.api.sound(this.st.slot ? 560 : 330); this._paint(); } },
  _replay: function (i) { var self = this; this._view = { slide: i }; this._paint(); this.api.sound(700); this._later(function () { if (self._view.slide === i) { self._view = {}; self._paint(); } }, this._ms(500)); },
  _shrug: function (i) { var self = this; this._view = { just: i }; this._paint(); this.api.sound(300); this._later(function () { self._view = {}; self._paint(); }, this._ms(500)); },
  _bindChip: function (chip) {
    var self = this;
    chip.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || (ev.button !== undefined && ev.button !== 0)) return;
      var ghost = null; try { chip.setPointerCapture(ev.pointerId); } catch (e) {}
      var at = function (x, y) { var ss = self._wrap.querySelectorAll('.pbg-sq'); for (var z = 0; z < ss.length; z++) { var rc = ss[z].getBoundingClientRect(); if (x >= rc.left && x <= rc.right && y >= rc.top && y <= rc.bottom) return +ss[z].getAttribute('data-sq'); } return -1; };
      var move = function (e) {
        if (!ghost) { self._drag = {}; ghost = self.api.el('span', 'pbg-chip pbg-ghost'); document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - 22) + 'px'; ghost.style.top = (e.clientY - 22) + 'px';
        var h = at(e.clientX, e.clientY); [].forEach.call(self._wrap.querySelectorAll('.pbg-sq'), function (s) { s.classList.toggle('is-over', +s.getAttribute('data-sq') === h); });
      };
      var up = function (e) {
        chip.removeEventListener('pointermove', move); chip.removeEventListener('pointerup', up); chip.removeEventListener('pointercancel', up);
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost); self._drag = null;
        var h = at(e.clientX, e.clientY); if (h >= 0 && self.st.cs.flipped.indexOf(h) < 0) { if (self.st.chip !== h) self._place(h); } else self._paint();
      };
      chip.addEventListener('pointermove', move); chip.addEventListener('pointerup', up); chip.addEventListener('pointercancel', up);
      ev.preventDefault();
    });
  },
  _onKey: function (ev) {
    var k = ev.key, st = this.st;
    if (st.r.level !== 'call' && /^Arrow/.test(k) && ev.target && ev.target.getAttribute && ev.target.getAttribute('data-sq') !== null) {
      var c = st.cs.card, i = +ev.target.getAttribute('data-sq'), x = i % c.cols, y = Math.floor(i / c.cols);
      if (k === 'ArrowLeft') x = Math.max(0, x - 1); if (k === 'ArrowRight') x = Math.min(c.cols - 1, x + 1); if (k === 'ArrowUp') y = Math.max(0, y - 1); if (k === 'ArrowDown') y = Math.min(c.rows - 1, y + 1);
      var nx = this._wrap.querySelector('[data-sq="' + (y * c.cols + x) + '"]'); if (nx) { ev.preventDefault(); nx.focus(); }
      return;
    }
    if (k === ' ' && ev.target === this._wrap) { ev.preventDefault(); this._check(); }
  },

  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = PictureBingoCore, r = st.r;
    var res = C.check(st);
    if (res.kase === 'empty') { this.api.sound(460); this._view = r.level === 'call' ? { nudge: true } : { wiggle: true }; this._paint(); this._later(function () { self._view = {}; self._paint(); }, 1200); return; }
    if (res.ok) return this._win(res);
    this.api.sound(196);
    if (r.level === 'call') {
      /* Bingo reads exactly what he was given: a decoy gets covered (it wobbles), or he searches and shrugs */
      this._busy = true; this._view = res.kase === 'decoy' ? { wobble: res.at } : { shrug: true }; this._paint();
      this._later(function () { self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(700));
      return;
    }
    /* the chip slides off and back to the tray */
    this._busy = true; this._view = { slide: res.square }; this._paint();
    this._later(function () { self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(450));
  },
  _win: function (res) {
    var self = this, st = this.st, r = st.r, pa = this._pa || {}, msg;
    if (r.level === 'call') msg = this._t('okYou', { w: this._q(r.need) });
    else if (res.full) msg = this._t('okCard', { list: this._list(PictureBingoCore.leftovers(r.card)) });
    else if (res.lines && res.lines.length) msg = this._t('okLine', { list: this._list(res.lines[0].map(function (i) { return r.card.sq[i].word; })) });
    else msg = this._t('okCall', { w: this._q(r.word) });
    pa.msg = msg;
    var bingo = r.level === 'call' || (res.lines && res.lines.length) || res.full;
    this._busy = true;
    this._view = { just: r.sq, lines: res.lines || [], bingo: !!bingo, hop: !!bingo, msg: msg };
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110)); if (bingo) this._later(function () { self.api.sound(1046); }, this._ms(220));
    this._paint();
    this._later(function () { self._busy = false; self._paint(); self.api.announce(msg); }, this._ms(500));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var pbgCssDone = false;
function injectBingoCSS() {
  if (pbgCssDone || typeof document === 'undefined') return;
  pbgCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.pbg-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--pbg-ink:#2A2A35;--pbg-teal:#146B5E;--pbg-coral:#F2784B;--pbg-cream:#FFF8EC;--pbg-gold:#E8B83A;user-select:none;-webkit-user-select:none;}'
  + '.pbg-wrap:focus{outline:none;}'
  /* the booth */
  + '.pbg-booth{position:relative;display:flex;align-items:center;justify-content:center;gap:16px;width:100%;max-width:640px;padding:8px 12px;box-sizing:border-box;border-radius:18px;background:var(--pbg-cream);box-shadow:inset 0 0 0 3px var(--pbg-ink);}'
  + '.pbg-dog{width:var(--pbg-dog);height:var(--pbg-dog);object-fit:contain;flex:none;}'
  + '.pbg-dog.is-hop{animation:pbg-hop .5s ease-out 2;} @keyframes pbg-hop{40%{transform:translateY(-12px);}}'
  + '.pbg-callcard{position:relative;display:flex;align-items:center;justify-content:center;width:calc(var(--pbg-call) + 20px);height:calc(var(--pbg-call) + 20px);padding:0;border:0;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 3px var(--pbg-ink),0 4px 0 #C9B999;cursor:pointer;animation:pbg-up .3s ease-out;}'
  + '@keyframes pbg-up{0%{transform:translateY(24px);opacity:0;}}'
  + '.pbg-callcard.is-wiggle{animation:pbg-wig .45s ease-in-out 2;} @keyframes pbg-wig{25%{transform:rotate(-5deg);}75%{transform:rotate(5deg);}}'
  + '.pbg-callpic{width:var(--pbg-call);height:var(--pbg-call);object-fit:contain;}'
  + '.pbg-tab{position:absolute;left:-8px;top:-8px;min-width:30px;height:30px;padding:0 6px;box-sizing:border-box;border-radius:15px;background:#FFE3D6;box-shadow:inset 0 0 0 2px var(--pbg-coral);font-family:' + D + ';font-weight:800;font-size:20px;line-height:30px;text-align:center;color:#A6461F;}'
  + '.pbg-used{display:flex;flex-direction:column;gap:2px;min-width:40px;} .pbg-usedpic{width:36px;height:36px;object-fit:contain;border-radius:6px;background:#fff;box-shadow:inset 0 0 0 1px #C9B999;}'
  + '.pbg-banner{position:absolute;right:14px;top:50%;transform:translateY(-50%) rotate(-6deg);padding:6px 14px;border-radius:12px;background:var(--pbg-gold);box-shadow:inset 0 0 0 3px var(--pbg-ink);font-family:' + D + ';font-weight:800;font-size:26px;color:var(--pbg-ink);animation:pbg-wave .6s ease-in-out 2;} @keyframes pbg-wave{50%{transform:translateY(-50%) rotate(6deg) scale(1.08);}}'
  /* the card */
  + '.pbg-board{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;}'
  + '.pbg-card{display:grid;grid-template-columns:repeat(var(--pbg-cols),var(--pbg-sqw));gap:8px;padding:10px;border-radius:16px;background:#F3EAD8;box-shadow:inset 0 0 0 3px var(--pbg-ink);}'
  + '.pbg-sq{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:var(--pbg-sqw);height:var(--pbg-sqh);padding:0;border:0;border-radius:12px;background:var(--pbg-cream);box-shadow:inset 0 0 0 3px var(--pbg-ink),0 3px 0 #C9B999;cursor:pointer;color:var(--pbg-ink);}'
  + '.pbg-word{display:flex;gap:0;font-family:' + D + ';font-weight:800;line-height:1;white-space:nowrap;font-size:min(var(--pbg-font),calc((var(--pbg-sqw) - 14px) / (var(--len) * .6)));}'
  + '.pbg-word span.is-diff{color:#D2501F;text-shadow:0 0 8px rgba(242,120,75,.6);}'
  + '.pbg-syl{display:inline-block;} .pbg-syl + .pbg-syl{margin-left:.3em;} .pbg-syl.is-diff{color:#D2501F;text-shadow:0 0 8px rgba(242,120,75,.6);}'
  + '.pbg-sq.is-flip{background:#fff;animation:pbg-flip .3s ease-out;} @keyframes pbg-flip{0%{transform:rotateY(90deg);}}'
  + '.pbg-wrap.is-wide .pbg-sq.is-flip{justify-content:flex-start;padding-top:2px;}'
  + '.pbg-flippic{width:var(--pbg-flip);height:var(--pbg-flip);max-height:calc(var(--pbg-sqh) - 6px);object-fit:contain;}'
  + '.pbg-wrap.is-wide .pbg-flippic{max-height:calc(var(--pbg-sqh) - 24px);}'
  + '.pbg-small{font-family:' + D + ';font-weight:700;font-size:15px;line-height:1;color:var(--pbg-ink);}'
  + '.pbg-chip,.pbg-traychip{display:block;width:44px;height:44px;border-radius:50%;background:var(--pbg-teal);box-shadow:inset 0 0 0 3px var(--pbg-ink),inset 0 0 0 9px #2D8A7B;}'
  + '.pbg-sq .pbg-chip{position:absolute;right:-6px;top:-8px;width:34px;height:34px;opacity:.92;animation:pbg-hopchip .18s ease-out;} @keyframes pbg-hopchip{0%{transform:translateY(-14px);}}'
  + '.pbg-traychip{cursor:grab;touch-action:none;flex:none;} .pbg-traychip.is-used{opacity:.35;}'
  + '.pbg-ghost{position:fixed;z-index:9999;pointer-events:none;}'
  + '.pbg-sq.is-over{box-shadow:inset 0 0 0 3px var(--pbg-teal),0 0 0 4px rgba(20,107,94,.3);}'
  + '.pbg-sq.is-slide .pbg-word{animation:pbg-shake .15s ease-in-out 3;} @keyframes pbg-shake{25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
  + '.pbg-sq.is-dim{opacity:.35;}'
  + '.pbg-sq.is-pulse{animation:pbg-pulse 1s ease-in-out infinite;} @keyframes pbg-pulse{50%{box-shadow:inset 0 0 0 3px var(--pbg-ink),0 0 0 6px rgba(232,184,58,.55);}}'
  + '.pbg-sq.is-line{box-shadow:inset 0 0 0 3px var(--pbg-gold),0 0 0 3px rgba(232,184,58,.45);} .pbg-sq.is-fresh{animation:pbg-light .4s ease-out;} @keyframes pbg-light{0%{background:#FFF1BF;}}'
  + '.pbg-sq.is-left{background:#F6F1E6;} .pbg-sq.is-turn{animation:pbg-shrug .45s ease-in-out;} @keyframes pbg-shrug{30%{transform:rotate(-8deg);}70%{transform:rotate(8deg);}}'
  /* You call */
  + '.pbg-slot{position:relative;display:flex;align-items:center;justify-content:center;min-width:150px;height:64px;padding:0 12px;border:0;border-radius:12px;background:#3B3A44;box-shadow:inset 0 0 0 3px var(--pbg-ink);cursor:pointer;}'
  + '.pbg-slot::after{content:"";position:absolute;left:14px;right:14px;top:50%;height:6px;margin-top:-3px;border-radius:3px;background:#1E1D24;}'
  + '.pbg-slot.is-full::after{display:none;} .pbg-slot.is-nudge{animation:pbg-wig .45s ease-in-out 2;}'
  + '.pbg-slotword{position:relative;z-index:1;padding:4px 12px;border-radius:8px;background:var(--pbg-cream);font-family:' + D + ';font-weight:800;font-size:28px;line-height:1;color:var(--pbg-ink);}'
  + '.pbg-ycard{display:grid;grid-template-columns:repeat(3,calc(var(--pbg-you) + 16px));gap:6px;padding:10px;border-radius:16px;background:#F3EAD8;box-shadow:inset 0 0 0 3px var(--pbg-ink);}'
  + '.pbg-ysq{position:relative;display:flex;align-items:center;justify-content:center;height:calc(var(--pbg-you) + 12px);border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px #C9B999;}'
  + '.pbg-ypic{width:var(--pbg-you);height:var(--pbg-you);object-fit:contain;}'
  + '.pbg-ysq.is-need::before{content:"";position:absolute;inset:3px;border-radius:9px;border:3px dashed var(--pbg-teal);animation:pbg-ring 1.4s ease-in-out infinite;} @keyframes pbg-ring{50%{opacity:.45;}}'
  + '.pbg-ysq .pbg-chip{position:absolute;right:-4px;top:-6px;width:30px;height:30px;}'
  + '.pbg-ysq.is-line{box-shadow:inset 0 0 0 3px var(--pbg-gold);} .pbg-ysq.is-wobble{animation:pbg-wig .2s ease-in-out 3;}'
  + '.pbg-ghost{color:rgba(20,107,94,.4);} .pbg-ysq .pbg-ghost{position:absolute;bottom:2px;left:0;right:0;text-align:center;font-family:' + D + ';font-weight:800;font-size:16px;letter-spacing:.06em;color:rgba(20,107,94,.55);}'
  + '.pbg-shrug{font-family:' + D + ';font-weight:800;font-size:28px;color:var(--pbg-coral);}'
  + '.pbg-hand{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}'
  + '.pbg-wcard{min-width:112px;height:64px;padding:0 14px;border:0;border-radius:12px;background:var(--pbg-cream);box-shadow:inset 0 0 0 3px var(--pbg-ink),0 3px 0 #C9B999;font-family:' + D + ';font-weight:800;font-size:30px;line-height:1;color:var(--pbg-ink);cursor:pointer;}'
  + '.pbg-wcard span.is-diff{color:#D2501F;text-shadow:0 0 8px rgba(242,120,75,.6);} .pbg-wcard.is-out{opacity:.35;}'
  /* the ask strip */
  + '.pbg-ask{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;max-width:640px;}'
  + '.pbg-tray{flex:none;} .pbg-tray:empty{display:none;}'
  + '.pbg-note{flex:1;min-height:28px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--pbg-teal);text-align:center;} .pbg-note:empty{visibility:hidden;} .pbg-note.is-ok{font-weight:800;} .pbg-note.is-wrong{color:#A6461F;}'
  + '.pbg-check{min-height:52px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .pbg-check[hidden]{display:none;} .pbg-check:disabled{opacity:.6;}'
  + '.pbg-wrap.is-narrow{gap:9px;} .pbg-wrap.is-narrow .pbg-booth{gap:10px;padding:6px 8px;} .pbg-wrap.is-narrow .pbg-used{display:none;} .pbg-wrap.is-narrow .pbg-card{gap:6px;padding:6px;}'
  + '.pbg-wrap.is-narrow .pbg-note{text-align:left;} .pbg-wrap.is-narrow .pbg-ask{align-items:flex-start;} .pbg-wrap.is-narrow .pbg-banner{font-size:20px;right:8px;}'
  + '.pbg-wrap.is-narrow .pbg-wcard{min-width:96px;height:56px;font-size:26px;} .pbg-wrap.is-narrow .pbg-slot{min-width:120px;height:56px;} .pbg-wrap.is-narrow .pbg-slotword{font-size:24px;}'
  + '.pbg-wrap.is-tiny .pbg-card{gap:5px;padding:5px;} .pbg-wrap.is-tiny{gap:7px;}'
  + '.pbg-wrap.is-tiny .pbg-hand{gap:8px;flex-wrap:nowrap;} .pbg-wrap.is-tiny .pbg-wcard{min-width:80px;height:52px;padding:0 8px;font-size:24px;} .pbg-wrap.is-tiny .pbg-slot{height:52px;}'
  + '.pbg-wrap.is-fast *,.pbg-wrap.is-fast *::before,.pbg-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.pbg-wrap *{animation-duration:.2s !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'pbg-css'; s.textContent = css; document.head.appendChild(s);
}
