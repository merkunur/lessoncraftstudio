/* =====================================================================
   TOOL #28 — DICTATION DESK   (dictation-desk.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). The Reading Corner. Premium Tools v2, build #2.

   The write-side of the phonics block. The teacher says a word; the class
   writes it ON PAPER; then one tap assembles the word on the slate, one
   spelling unit at a time. Every child checks their own handwriting
   against it.

   ⚠ A UNIT IS NEVER SPOKEN, only chimed. The platform lock is absolute
   (sound-boxes.js:18 — "NO isolated-phoneme TTS anywhere; synthetic
   'buh' is pedagogy poison; the teacher's mouth is the phoneme model"),
   and a synthesiser handed "c" says "see" and "sh" says "ess-aitch",
   teaching letter names where the lesson is sounds. In a dictation the
   teacher is already speaking; the tool speaks WHOLE WORDS only, and the
   gate asserts every speak() call carries type:'word'.

   THE ONE THESIS — THE CHILD'S OWN PAPER IS THE ANSWER KEY. This tool
   never sees what a child wrote, so it can never mark it. The correction
   is private, self-administered and immediate, which is the most
   efficient feedback loop in early spelling and costs nothing. A finished
   word displayed on the board invites copying; a word that ASSEMBLES,
   invites checking — and a sequential reveal tells a
   child WHERE their spelling diverged, not merely that it did.

   NO CHILD INPUT EXISTS. Not "we chose not to grade": there is no field
   in the model that could hold an answer and no text-entry affordance in
   the child-facing stage. `verify-dictation-desk.js` asserts both. The
   only input in the whole tool is the teacher's own word-list editor,
   which lives behind a premium panel and is adult-facing.

   THE REVEAL MODEL — derived from the shipped bank, not invented:
     `{ wordId, revealed }` and nothing else. Units are recomputed every
     read from `sound-boxes-bank-<locale>.json`:
       · one unit per BOX, which is one SOUND — so `sh`, `ck`, `ng` land
         whole, because that is the lesson;
       · a split digraph `a_e` (magic e) places its vowel in position and
         its `e` at the end of the word, revealed as ONE step;
       · `silentTail` is revealed LAST as a SILENT unit — shown, never
         sounded. ⚠ This is load-bearing. The bank is one box per SOUND,
         so `mouse` is m·ou·s and `hund` is h·u·n. Revealing only the
         boxes would show a child "mous" and teach them their correct
         spelling was wrong — the exact opposite of this tool's purpose.
         French carries 11 of the 15 silent tails in the corpus, and they
         are precisely what French children lose marks on.
     MEASURED: across all eleven banks, 332/332 words satisfy
     `boxes(+split) + silentTail === display`, and every declared
     `silentTail` agrees with the derivation. The gate re-checks it, so a
     bank edit cannot silently break this tool.

   ⚠ THE REVEAL UNIT IS PER-STAGE DATA, NEVER A UNIVERSAL. Stages marked
   `type:'syllables'` in es/pt/it/fi reveal SYLLABLES, because Spanish,
   Portuguese, Italian and Finnish phonics are syllable-first; the
   Germanic locales reveal graphemes. That ruling already exists in the
   bank and in `verify-sound-boxes-bank.js`; this tool reads it and says
   which unit it is using. The letter-studio RULING discipline: convention
   as data, never as an assumption.

   ⚠ NO PICTURE, DELIBERATELY. Bank entries carry `noun` + `themeDir`, so
   an illustration is available — and it is not used. Showing the thing
   before the word is written turns a dictation into a copying exercise.
   Nothing identifying the word may exist in the DOM before the teacher
   reveals it; the gate asserts no letter of the word is present at rest.

   FENCES — the encoding/decoding space is crowded, and every fence is
   about WHICH WAY THE INFORMATION FLOWS and WHO TOUCHES THE SCREEN:
     Sound Boxes    child pushes chips ON SCREEN, picture visible
                    (analysis)          | here: paper, voice, nothing on
                                        | screen until the reveal
     Heart Words    spelling ALWAYS     | spelling HIDDEN until after
                    visible             | they have written it
     Blending Board sounds -> word      | word -> spelling. Opposite
                    (decoding)          | direction through the same wall
     Letter Tiles   child builds words  | only the teacher touches it
     Letter Studio  HOW to form a       | WHICH letters — nothing about
                    letter              | stroke or shape
     Syllable Splitter splits by SOUND  | reveals the SPELLING
                    to be clapped       |
     word-clinic    child spells on     | nothing on screen, nothing
     (L.1.2.e)      screen, graded      | graded

   FREE = the starter stage, the reveal and the spoken word. PREMIUM = the later stages, the teacher's own word lists, and
   the printable dictation sheet. Locked stages are ABSENT from the stage
   strip for free visitors, not merely disabled.

   REFUSES, FOREVER: nothing a child types, so nothing that could be
   marked · no score, no "how many did you get", no count of words
   attempted · no show-of-hands prompt · no red, ever — a divergence
   between the paper and the slate is the child's own private business and
   this tool must never invite it into the room · no picture before the
   reveal · no auto-advance: the teacher dictates at their own pace.
   ===================================================================== */
var DictationDesk = {
  id: 'dictation-desk',

  /* ⚠ CURATION: en authored here; the other ten are builder drafts and are
     corrected in place by scripts/apply-dictation-desk-fanout.js from the
     per-locale native 3-agent ensembles (§A.13.48). ONE PHYSICAL LINE PER
     KEY — the applier does a surgical single-locale swap on that line.
     sv/da/no/fi carry [NSR-FLAG] until reviewed. */
  strings: {
    title:        {en:'Dictation Desk',de:'Diktat-Pult',fr:'Le pupitre de dictée',it:'Il banco del dettato',es:'El pupitre de dictado',pt:'A carteira de ditado',nl:'De dicteetafel',sv:'Diktamensbänken',da:'Diktatbordet',no:'Diktatpulten',fi:'Sanelupulpetti'},
    instruction:  {en:'Say the word, let them write it on paper — then uncover it one sound at a time.',de:'Sagt das Wort, lasst es aufs Papier schreiben — und deckt es dann Laut für Laut auf.',fr:'Dites le mot, faites-le écrire sur le papier — puis découvrez-le son par son.',it:'Di’ la parola, falla scrivere sul foglio — poi scoprila un suono alla volta.',es:'Di la palabra, que la escriban en el papel — y luego descúbrela sonido a sonido.',pt:'Diga a palavra, deixe escreverem no papel — e depois descubra som a som.',nl:'Zeg het woord, laat het op papier schrijven — en maak het dan klank voor klank open.',sv:'Säg ordet, låt dem skriva det på papper — och ta sedan fram det ett ljud i taget.',da:'Sig ordet, lad dem skrive det på papir — og afdæk det så én lyd ad gangen.',no:'Si ordet, la dem skrive det på papiret — og avdekk det så én lyd om gangen.',fi:'Sano sana, anna heidän kirjoittaa se paperille — paljasta se sitten äänne kerrallaan.'},
    sayWord:      {en:'Say the word',de:'Wort sagen',fr:'Dire le mot',it:'Di’ la parola',es:'Decir la palabra',pt:'Dizer a palavra',nl:'Zeg het woord',sv:'Säg ordet',da:'Sig ordet',no:'Si ordet',fi:'Sano sana'},
    sayAgain:     {en:'Say it again',de:'Noch einmal sagen',fr:'Redire le mot',it:'Ripeti la parola',es:'Decirla otra vez',pt:'Dizer de novo',nl:'Zeg het nog eens',sv:'Säg det igen',da:'Sig det igen',no:'Si det igjen',fi:'Sano uudelleen'},
    revealOne:    {en:'Uncover one',de:'Eins aufdecken',fr:'Découvrir un',it:'Scopri uno',es:'Descubrir uno',pt:'Descobrir um',nl:'Eén openmaken',sv:'Ta fram ett',da:'Afdæk én',no:'Avdekk én',fi:'Paljasta yksi'},
    revealAll:    {en:'Uncover the word',de:'Ganzes Wort aufdecken',fr:'Découvrir le mot',it:'Scopri la parola',es:'Descubrir la palabra',pt:'Descobrir a palavra',nl:'Het hele woord openmaken',sv:'Ta fram hela ordet',da:'Afdæk hele ordet',no:'Avdekk hele ordet',fi:'Paljasta koko sana'},
    coverAgain:   {en:'Cover again',de:'Wieder zudecken',fr:'Recouvrir',it:'Copri di nuovo',es:'Tapar otra vez',pt:'Cobrir de novo',nl:'Weer afdekken',sv:'Täck över igen',da:'Dæk til igen',no:'Dekk til igjen',fi:'Peitä uudelleen'},
    nextWord:     {en:'Next word',de:'Nächstes Wort',fr:'Mot suivant',it:'Parola successiva',es:'Siguiente palabra',pt:'Próxima palavra',nl:'Volgend woord',sv:'Nästa ord',da:'Næste ord',no:'Neste ord',fi:'Seuraava sana'},
    slateAria:    {en:'The word is covered',de:'Das Wort ist zugedeckt',fr:'Le mot est caché',it:'La parola è coperta',es:'La palabra está tapada',pt:'A palavra está coberta',nl:'Het woord is afgedekt',sv:'Ordet är övertäckt',da:'Ordet er dækket til',no:'Ordet er tildekket',fi:'Sana on peitossa'},
    silentNote:   {en:'a letter we write but do not hear',de:'ein Buchstabe, den wir schreiben, aber nicht hören',fr:'une lettre qu’on écrit mais qu’on n’entend pas',it:'una lettera che si scrive ma non si sente',es:'una letra que se escribe pero no se oye',pt:'uma letra que se escreve mas não se ouve',nl:'een letter die we schrijven maar niet horen',sv:'en bokstav vi skriver men inte hör',da:'et bogstav vi skriver, men ikke hører',no:'en bokstav vi skriver, men ikke hører',fi:'kirjain, jonka kirjoitamme mutta jota emme kuule'},
    unitSound:    {en:'sounds',de:'Laute',fr:'sons',it:'suoni',es:'sonidos',pt:'sons',nl:'klanken',sv:'ljud',da:'lyde',no:'lyder',fi:'äännettä'},
    unitSyllable: {en:'syllables',de:'Silben',fr:'syllabes',it:'sillabe',es:'sílabas',pt:'sílabas',nl:'lettergrepen',sv:'stavelser',da:'stavelser',no:'stavelser',fi:'tavua'},
    stageLabel:   {en:'Word set',de:'Wortsatz',fr:'Série de mots',it:'Gruppo di parole',es:'Conjunto de palabras',pt:'Conjunto de palavras',nl:'Woordenset',sv:'Ordsamling',da:'Ordsæt',no:'Ordsett',fi:'Sanajoukko'},
    myWords:      {en:'My words',de:'Meine Wörter',fr:'Mes mots',it:'Le mie parole',es:'Mis palabras',pt:'As minhas palavras',nl:'Mijn woorden',sv:'Mina ord',da:'Mine ord',no:'Mine ord',fi:'Omat sanat'},
    addWord:      {en:'Add a word',de:'Wort hinzufügen',fr:'Ajouter un mot',it:'Aggiungi una parola',es:'Añadir una palabra',pt:'Adicionar uma palavra',nl:'Woord toevoegen',sv:'Lägg till ord',da:'Tilføj et ord',no:'Legg til et ord',fi:'Lisää sana'},
    joinHint:     {en:'Tap between two letters to join them into one sound.',de:'Tippe zwischen zwei Buchstaben, um sie zu einem Laut zu verbinden.',fr:'Touchez entre deux lettres pour les réunir en un seul son.',it:'Tocca fra due lettere per unirle in un solo suono.',es:'Toca entre dos letras para unirlas en un solo sonido.',pt:'Toque entre duas letras para as juntar num só som.',nl:'Tik tussen twee letters om er één klank van te maken.',sv:'Tryck mellan två bokstäver för att slå ihop dem till ett ljud.',da:'Tryk mellem to bogstaver for at samle dem til én lyd.',no:'Trykk mellom to bokstaver for å slå dem sammen til én lyd.',fi:'Napauta kahden kirjaimen välistä yhdistääksesi ne yhdeksi äänteeksi.'},
    saveWord:     {en:'Save',de:'Speichern',fr:'Enregistrer',it:'Salva',es:'Guardar',pt:'Guardar',nl:'Bewaren',sv:'Spara',da:'Gem',no:'Lagre',fi:'Tallenna'},
    removeWord:   {en:'Remove',de:'Entfernen',fr:'Retirer',it:'Rimuovi',es:'Quitar',pt:'Remover',nl:'Verwijderen',sv:'Ta bort',da:'Fjern',no:'Fjern',fi:'Poista'},
    closePanel:   {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    printBtn:     {en:'Print',de:'Drucken',fr:'Imprimer',it:'Stampa',es:'Imprimir',pt:'Imprimir',nl:'Afdrukken',sv:'Skriv ut',da:'Udskriv',no:'Skriv ut',fi:'Tulosta'},
    printHead:    {en:'Dictation',de:'Diktat',fr:'Dictée',it:'Dettato',es:'Dictado',pt:'Ditado',nl:'Dictee',sv:'Diktamen',da:'Diktat',no:'Diktat',fi:'Sanelu'},
    setVoice:     {en:'Say it aloud',de:'Laut vorlesen',fr:'Dire à voix haute',it:'Leggi ad alta voce',es:'Decirlo en voz alta',pt:'Dizer em voz alta',nl:'Hardop zeggen',sv:'Säg det högt',da:'Sig det højt',no:'Si det høyt',fi:'Sano ääneen'},
    gateStage:    {en:'The later word sets are part of the Teacher plan.',de:'Die weiteren Wortsätze gehören zum Lehrer-Paket.',fr:'Les séries suivantes font partie de l’offre Enseignant.',it:'I gruppi di parole successivi fanno parte del piano Insegnante.',es:'Los siguientes conjuntos son parte del plan Docente.',pt:'Os conjuntos seguintes fazem parte do plano Professor.',nl:'De volgende woordensets horen bij het Leerkracht-pakket.',sv:'De senare ordsamlingarna ingår i Lärarpaketet.',da:'De senere ordsæt er en del af Lærerpakken.',no:'De senere ordsettene er en del av Lærerpakken.',fi:'Myöhemmät sanajoukot kuuluvat Opettaja-tilaukseen.'},
    gateWords:    {en:'Your own word lists are part of the Teacher plan.',de:'Eigene Wortlisten gehören zum Lehrer-Paket.',fr:'Vos propres listes de mots font partie de l’offre Enseignant.',it:'Le tue liste di parole fanno parte del piano Insegnante.',es:'Tus propias listas son parte del plan Docente.',pt:'As suas listas de palavras fazem parte do plano Professor.',nl:'Eigen woordenlijsten horen bij het Leerkracht-pakket.',sv:'Egna ordlistor ingår i Lärarpaketet.',da:'Dine egne ordlister er en del af Lærerpakken.',no:'Dine egne ordlister er en del av Lærerpakken.',fi:'Omat sanalistat kuuluvat Opettaja-tilaukseen.'},
    gatePrint:    {en:'Printing is part of the Teacher plan.',de:'Das Drucken gehört zum Lehrer-Paket.',fr:'L’impression fait partie de l’offre Enseignant.',it:'La stampa fa parte del piano Insegnante.',es:'La impresión es parte del plan Docente.',pt:'A impressão faz parte do plano Professor.',nl:'Afdrukken hoort bij het Leerkracht-pakket.',sv:'Utskrift ingår i Lärarpaketet.',da:'Udskrivning er en del af Lærerpakken.',no:'Utskrift er en del av Lærerpakken.',fi:'Tulostus kuuluu Opettaja-tilaukseen.'},
    unlock:       {en:'See the Teacher plan',de:'Lehrer-Paket ansehen',fr:'Voir l’offre Enseignant',it:'Vedi il piano Insegnante',es:'Ver el plan Docente',pt:'Ver o plano Professor',nl:'Bekijk het Leerkracht-pakket',sv:'Se Lärarpaketet',da:'Se Lærerpakken',no:'Se Lærerpakken',fi:'Katso Opettaja-tilaus'}
  },

  STORE_KEY: 'lcs:dictation-desk:v1',
  ENT_TRUST_DAYS: 14,

  /* A 404-proof floor so the desk is never empty. Real depth comes from
     sound-boxes-bank-<locale>.json, which is already served. */
  FALLBACK: {
    stages: [{ id: 's1', label: 'Simple words', free: true }],
    words: [
      { id: 'cat', display: 'cat', boxes: ['c', 'a', 't'], stage: 's1' },
      { id: 'dog', display: 'dog', boxes: ['d', 'o', 'g'], stage: 's1' },
      { id: 'sun', display: 'sun', boxes: ['s', 'u', 'n'], stage: 's1' }
    ]
  },

  defaults: { voice: true },
  settings: [
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' }
  ],

  premium: false,

  /* =================================================================
     PURE ENGINE — no DOM, no storage, no api.

     A word's units are RECOMPUTED from the bank entry on every read; the
     tool stores only which word and how many units are uncovered, so a
     partially revealed word has no second representation to fall out of
     step with the first.
     ================================================================= */

  /* one unit per box, plus the silent tail as its own final unit.
     `a_e` (magic e) puts its vowel in place and its `e` at the end. */
  unitsFor: function (w) {
    if (!w || !w.boxes) return [];
    var out = [], tail = '';
    for (var i = 0; i < w.boxes.length; i++) {
      var b = w.boxes[i];
      var m = /^(.)_(.)$/.exec(b);
      if (m) { out.push({ text: m[1], kind: 'split', endChar: m[2], say: b }); tail += m[2]; }
      else { out.push({ text: b, kind: 'sound', say: b }); }
    }
    var silent = w.silentTail || '';
    if (silent) out.push({ text: silent, kind: 'silent', say: '' });
    return out;
  },

  /* the invariant the gate re-measures over every bank: the units, laid
     out in order with split-digraph tails and the silent tail at the end,
     reproduce the printed word exactly. */
  reassemble: function (w) {
    var units = this.unitsFor(w), body = '', end = '', silent = '';
    for (var i = 0; i < units.length; i++) {
      var u = units[i];
      if (u.kind === 'split') { body += u.text; end += u.endChar; }
      else if (u.kind === 'silent') { silent += u.text; }
      else body += u.text;
    }
    return body + end + silent;
  },

  /* what is on the slate after n uncoverings — derived, never stored */
  shownUnits: function (w, revealed) {
    var u = this.unitsFor(w);
    return u.slice(0, Math.max(0, Math.min(revealed, u.length)));
  },

  isComplete: function (w, revealed) { return revealed >= this.unitsFor(w).length; },

  stageById: function (bank, id) {
    var st = (bank && bank.stages) || [];
    for (var i = 0; i < st.length; i++) if (st[i].id === id) return st[i];
    return st[0] || null;
  },

  /* THE PER-LOCALE RULING, read not assumed: a stage may declare that its
     boxes are syllables rather than sounds. */
  unitKindFor: function (bank, stageId) {
    var s = this.stageById(bank, stageId);
    return (s && s.type === 'syllables') ? 'syllable' : 'sound';
  },

  wordsForStage: function (bank, stageId) {
    var ws = (bank && bank.words) || [], out = [];
    for (var i = 0; i < ws.length; i++) if (ws[i].stage === stageId) out.push(ws[i]);
    return out;
  },

  /* free visitors do not merely see locked stages disabled — the locked
     stages are absent from the strip entirely */
  stagesFor: function (bank, premium) {
    var st = (bank && bank.stages) || [], out = [];
    for (var i = 0; i < st.length; i++) if (premium || st[i].free) out.push(st[i]);
    return out;
  },

  /* the teacher's own word: letters, with the joins they marked.
     `joins[i] === true` fuses letter i with letter i+1. */
  customUnits: function (text, joins) {
    var letters = String(text || '').split(''), out = [], cur = '';
    for (var i = 0; i < letters.length; i++) {
      cur += letters[i];
      if (!joins || !joins[i]) { out.push(cur); cur = ''; }
    }
    if (cur) out.push(cur);
    return out;
  },

  customToWord: function (text, joins) {
    var boxes = this.customUnits(text, joins);
    return { id: 'own:' + text, display: String(text), boxes: boxes, stage: 'own', own: true };
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectDictationDeskCSS();
    document.body.classList.add('dd-wide');

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this.bank = null;
    this.stageId = null;
    this.index = 0;
    this.revealed = 0;
    this.panelOpen = false;
    this.draft = { text: '', joins: {} };
    this.myWords = this._store.myWords || [];
    this._timers = [];

    this._fetchEntitlement();
    this._fetchBank();
    this.render();
  },

  destroy: function () { this._clearTimers(); },
  _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },

  _saveStore: function () {
    var s = this._store || {};
    s.v = 1;
    s.myWords = this.myWords;
    s.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      s.settings[key] = this.api.settings[key];
    }
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
    this._store = s;
  },

  _fetchEntitlement: function () {
    var self = this;
    var tok = null;
    try { tok = localStorage.getItem('accessToken'); } catch (_) {}
    if (!tok) return;
    try {
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + tok } })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var tier = d && d.user && d.user.subscriptionTier;
          var sub = d && d.subscription;
          self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
          self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
          self._saveStore();
          self._settle();
        })
        .catch(function () {});
    } catch (_) {}
  },

  /* the bank is already served for Sound Boxes — this tool reads it and
     never writes it (the heart-words fetch-and-fall-back shape) */
  _fetchBank: function () {
    var self = this, lang = this.api.lang;
    var use = function (b) { self.bank = b; self._settle(); };
    try {
      fetch('/mini-tools/sound-boxes-bank-' + lang + '.json', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { use(j && j.words && j.words.length ? j : self.FALLBACK); })
        .catch(function () { use(self.FALLBACK); });
    } catch (_) { use(self.FALLBACK); }
  },

  /* whichever of bank/entitlement lands last picks the opening stage */
  _settle: function () {
    if (!this.bank) return;
    var open = this.stagesFor(this.bank, this.premium);
    var stillOk = false;
    for (var i = 0; i < open.length; i++) if (open[i].id === this.stageId) stillOk = true;
    if (!stillOk) {
      this.stageId = open.length ? open[0].id : null;
      this.index = 0;
      this.revealed = 0;
    }
    if (this._wrap) this.render();
  },

  _words: function () {
    if (this.stageId === 'own') return this.myWords.map(function (m) {
      return { id: 'own:' + m.display, display: m.display, boxes: m.boxes, stage: 'own', own: true };
    });
    return this.wordsForStage(this.bank, this.stageId);
  },

  _word: function () {
    var ws = this._words();
    if (!ws.length) return null;
    return ws[Math.max(0, Math.min(this.index, ws.length - 1))];
  },

  /* whole words only — see the note in _revealOne */
  _say: function (text) {
    if (!this.api.settings.voice || !text) return;
    try { LCSAudio.speak({ type: 'word', text: String(text), lang: this.api.lang }); } catch (_) {}
  },

  /* =================================================================
     MOVES — every one of them is the teacher's; nothing auto-advances
     ================================================================= */
  _sayWord: function () {
    var w = this._word();
    if (w) this._say(w.display);
  },

  _revealOne: function () {
    var w = this._word();
    if (!w) return;
    var units = this.unitsFor(w);
    if (this.revealed >= units.length) return;
    var u = units[this.revealed];
    this.revealed++;
    this.render();
    /* ⚠ A UNIT IS NEVER SPOKEN. The platform lock is absolute
       (sound-boxes.js:18 — "NO isolated-phoneme TTS anywhere; synthetic
       'buh' is pedagogy poison; the teacher's mouth is the phoneme
       model"), and in a dictation the teacher is literally speaking
       already. A synthesiser given "c" says "see" and given "sh" says
       "ess-aitch" — it would teach letter names where the lesson is
       sounds. Each uncovering gets a soft chime; only the WHOLE WORD is
       ever spoken. The gate asserts no speak() call carries anything but
       type:'word'. */
    this.api.sound(u.kind === 'silent' ? 380 : 640);
    if (this.isComplete(w, this.revealed)) this._after(420, this._sayWord.bind(this));
  },

  _revealAll: function () {
    var w = this._word();
    if (!w) return;
    this.revealed = this.unitsFor(w).length;
    this.render();
    this._after(200, this._sayWord.bind(this));
  },

  _cover: function () { this.revealed = 0; this.render(); },

  _next: function () {
    var ws = this._words();
    if (!ws.length) return;
    this.index = (this.index + 1) % ws.length;
    this.revealed = 0;
    this.render();
    this._after(260, this._sayWord.bind(this));
  },

  _setStage: function (id) {
    this.stageId = id;
    this.index = 0;
    this.revealed = 0;
    this.render();
  },

  reset: function () { this.revealed = 0; this.index = 0; this.render(); },

  onSettings: function () { this._saveStore(); if (this._wrap) this.render(); },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    this._clearTimers();
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'dd-wrap');
    this._wrap = wrap;

    wrap.appendChild(this._buildStageStrip());
    wrap.appendChild(this._buildSlate());
    wrap.appendChild(this._buildControls());
    if (this.panelOpen && this.premium) wrap.appendChild(this._buildPanel());
    if (this.premium) wrap.appendChild(this._buildPrintSheet());

    api.stage.appendChild(wrap);
  },

  _buildStageStrip: function () {
    var self = this, api = this.api;
    var row = api.el('div', 'dd-stages');
    var lbl = api.el('span', 'dd-stagelbl');
    lbl.textContent = api.t('stageLabel');
    row.appendChild(lbl);

    var open = this.stagesFor(this.bank, this.premium);
    for (var i = 0; i < open.length; i++) {
      (function (st) {
        var b = api.el('button', 'dd-chip' + (st.id === self.stageId ? ' active' : ''));
        b.type = 'button';
        b.textContent = st.label || st.id;
        b.title = st.label || st.id;
        b.addEventListener('click', function () { self._setStage(st.id); });
        row.appendChild(b);
      }(open[i]));
    }

    /* the teacher's own list — the depth that makes a 16-word bank usable */
    var mine = api.el('button', 'dd-chip' + (this.stageId === 'own' ? ' active' : '') + (this.premium ? '' : ' dd-locked'));
    mine.type = 'button';
    mine.textContent = api.t('myWords');
    mine.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(row, 'gateWords'); return; }
      self.stageId = 'own'; self.index = 0; self.revealed = 0; self.panelOpen = true; self.render();
    });
    row.appendChild(mine);

    var all = this.stagesFor(this.bank, true);
    if (!this.premium && all.length > open.length) {
      var more = api.el('button', 'dd-chip dd-locked'); more.type = 'button';
      more.textContent = '+' + (all.length - open.length);
      more.setAttribute('aria-label', api.t('gateStage'));
      more.addEventListener('click', function () { self._gateInline(row, 'gateStage'); });
      row.appendChild(more);
    }
    return row;
  },

  /* ---- the slate. Nothing identifying the word exists here until the
     teacher uncovers it: no letters, no picture, no length hint beyond
     the number of covered places, which is the one clue a dictation
     legitimately gives. ---- */
  _buildSlate: function () {
    var api = this.api;
    var w = this._word();
    var box = api.el('div', 'dd-desk');

    var slate = api.el('div', 'dd-slate');
    slate.setAttribute('role', 'group');

    if (!w) {
      var empty = api.el('div', 'dd-empty');
      empty.textContent = api.t('addWord');
      slate.appendChild(empty);
      box.appendChild(slate);
      return box;
    }

    var units = this.unitsFor(w);
    var shown = this.shownUnits(w, this.revealed);
    slate.setAttribute('aria-label', this.revealed === 0 ? api.t('slateAria') : this._spellingSoFar(w));

    var line = api.el('div', 'dd-line');
    for (var i = 0; i < units.length; i++) {
      var u = units[i];
      var cell = api.el('span', 'dd-cell dd-cell-' + u.kind + (i < shown.length ? ' dd-open' : ''));
      if (i < shown.length) {
        cell.textContent = u.kind === 'split' ? u.text : u.text;
        if (u.kind === 'silent') cell.title = api.t('silentNote');
      } else {
        cell.setAttribute('aria-hidden', 'true');   /* nothing to read yet */
      }
      line.appendChild(cell);
    }
    /* the split digraph's travelling `e` sits at the end of the word, and
       only once its own unit has been uncovered */
    var endChars = '';
    for (var j = 0; j < shown.length; j++) if (shown[j].kind === 'split') endChars += shown[j].endChar;
    if (endChars) {
      var tail = api.el('span', 'dd-cell dd-cell-split dd-open dd-tail');
      tail.textContent = endChars;
      line.appendChild(tail);
    }
    slate.appendChild(line);

    var last = shown.length ? shown[shown.length - 1] : null;
    if (last && last.kind === 'silent') {
      var note = api.el('div', 'dd-silentnote');
      note.textContent = api.t('silentNote');
      slate.appendChild(note);
    }

    var meta = api.el('div', 'dd-meta');
    var kind = this.stageId === 'own' ? 'sound' : this.unitKindFor(this.bank, this.stageId);
    meta.textContent = this._soundedCount(w) + ' ' + api.t(kind === 'syllable' ? 'unitSyllable' : 'unitSound');
    slate.appendChild(meta);

    box.appendChild(slate);
    return box;
  },

  _soundedCount: function (w) {
    var u = this.unitsFor(w), n = 0;
    for (var i = 0; i < u.length; i++) if (u[i].kind !== 'silent') n++;
    return n;
  },

  _spellingSoFar: function (w) {
    var shown = this.shownUnits(w, this.revealed), body = '', end = '';
    for (var i = 0; i < shown.length; i++) {
      if (shown[i].kind === 'split') { body += shown[i].text; end += shown[i].endChar; }
      else body += shown[i].text;
    }
    return body + end;
  },

  _buildControls: function () {
    var self = this, api = this.api;
    var row = api.el('div', 'dd-controls');
    var w = this._word();
    var done = w ? this.isComplete(w, this.revealed) : true;

    var say = api.el('button', 'dd-btn dd-primary'); say.type = 'button';
    say.textContent = this.revealed === 0 ? api.t('sayWord') : api.t('sayAgain');
    say.disabled = !w;
    say.addEventListener('click', function () { self._sayWord(); });
    row.appendChild(say);

    var one = api.el('button', 'dd-btn'); one.type = 'button';
    one.textContent = api.t('revealOne');
    one.disabled = !w || done;
    one.addEventListener('click', function () { self._revealOne(); });
    row.appendChild(one);

    var all = api.el('button', 'dd-btn'); all.type = 'button';
    all.textContent = done && this.revealed > 0 ? api.t('coverAgain') : api.t('revealAll');
    all.disabled = !w;
    all.addEventListener('click', function () {
      if (done && self.revealed > 0) self._cover(); else self._revealAll();
    });
    row.appendChild(all);

    var nxt = api.el('button', 'dd-btn'); nxt.type = 'button';
    nxt.textContent = api.t('nextWord');
    nxt.disabled = !w;
    nxt.addEventListener('click', function () { self._next(); });
    row.appendChild(nxt);

    var pr = api.el('button', 'dd-btn' + (this.premium ? '' : ' dd-locked')); pr.type = 'button';
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(row, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    });
    row.appendChild(pr);

    return row;
  },

  /* ---- the teacher's word-list editor. ADULT-FACING, premium, and the
     only place in the tool where a text field exists at all. ---- */
  _buildPanel: function () {
    var self = this, api = this.api;
    var p = api.el('div', 'dd-panel');

    var head = api.el('div', 'dd-panelhead');
    var h = api.el('span', 'dd-panelttl'); h.textContent = api.t('myWords');
    var close = api.el('button', 'dd-chip'); close.type = 'button';
    close.textContent = api.t('closePanel');
    close.addEventListener('click', function () { self.panelOpen = false; self.render(); });
    head.append(h, close);
    p.appendChild(head);

    var inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'dd-input';
    inp.value = this.draft.text;
    inp.setAttribute('aria-label', api.t('addWord'));
    inp.addEventListener('input', function () {
      self.draft.text = inp.value; self.draft.joins = {};
      self._paintDraft(p);
    });
    p.appendChild(inp);

    var hint = api.el('div', 'dd-hint'); hint.textContent = api.t('joinHint');
    p.appendChild(hint);

    var draftRow = api.el('div', 'dd-draft');
    p.appendChild(draftRow);
    this._paintDraft(p);

    var save = api.el('button', 'dd-btn dd-primary'); save.type = 'button';
    save.textContent = api.t('saveWord');
    save.addEventListener('click', function () {
      var t = (self.draft.text || '').trim();
      if (!t) return;
      self.myWords.push({ display: t, boxes: self.customUnits(t, self.draft.joins) });
      self.draft = { text: '', joins: {} };
      self._saveStore();
      self.stageId = 'own'; self.index = self.myWords.length - 1; self.revealed = 0;
      self.render();
    });
    p.appendChild(save);

    var list = api.el('div', 'dd-list');
    for (var i = 0; i < this.myWords.length; i++) {
      (function (m, idx) {
        var r = api.el('div', 'dd-listrow');
        var t = api.el('span', 'dd-listword'); t.textContent = m.boxes.join('·');
        var x = api.el('button', 'dd-chip'); x.type = 'button';
        x.textContent = api.t('removeWord');
        x.addEventListener('click', function () {
          self.myWords.splice(idx, 1); self._saveStore();
          if (self.index >= self.myWords.length) self.index = 0;
          self.revealed = 0; self.render();
        });
        r.append(t, x);
        list.appendChild(r);
      }(this.myWords[i], i));
    }
    p.appendChild(list);
    return p;
  },

  /* letters with a tappable seam between each pair — the teacher marks
     which letters are ONE sound. The tool never guesses a segmentation
     it cannot verify; the teacher owns their own scope and sequence. */
  _paintDraft: function (panel) {
    var self = this, api = this.api;
    var host = panel.querySelector('.dd-draft');
    if (!host) return;
    host.innerHTML = '';
    var letters = String(this.draft.text || '').split('');
    for (var i = 0; i < letters.length; i++) {
      var c = api.el('span', 'dd-dletter'); c.textContent = letters[i];
      host.appendChild(c);
      if (i < letters.length - 1) {
        (function (idx) {
          var seam = api.el('button', 'dd-seam' + (self.draft.joins[idx] ? ' joined' : ''));
          seam.type = 'button';
          seam.setAttribute('aria-label', api.t('joinHint'));
          seam.addEventListener('click', function () {
            self.draft.joins[idx] = !self.draft.joins[idx];
            self._paintDraft(panel);
          });
          host.appendChild(seam);
        }(i));
      }
    }
  },

  _buildPrintSheet: function () {
    var api = this.api;
    var sheet = api.el('div', 'dd-printsheet');
    var head = api.el('div', 'dd-printhead');
    head.textContent = api.t('printHead');
    sheet.appendChild(head);
    var ws = this._words();
    for (var i = 0; i < ws.length; i++) {
      var row = api.el('div', 'dd-printrow');
      var n = api.el('span', 'dd-printnum'); n.textContent = String(i + 1) + '.';
      var rule = api.el('span', 'dd-printrule');
      row.append(n, rule);
      sheet.appendChild(row);
    }
    return sheet;
  },

  _gateInline: function (host, key) {
    var api = this.api;
    if (!host) return;
    var old = this._wrap.querySelector('.dd-gate');
    if (old) old.remove();
    var g = api.el('div', 'dd-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-dictation-desk';
    a.target = '_top';
    a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  }
};

function injectDictationDeskCSS() {
  if (document.getElementById('dd-style')) return;
  var st = document.createElement('style');
  st.id = 'dd-style';
  st.textContent = ''
    + '.dd-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'

    + '.dd-stages{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center;}'
    + '.dd-stagelbl{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#3C7C72;}'
    /* ⚠ The bank's stage labels are full descriptive sentences, authored
       for Sound Boxes' settings drawer. Unclamped they wrap the strip to
       three rows and swallow the slate. Clamp to one line; the full text
       stays available as the title. */
    + '.dd-chip{min-height:44px;padding:7px 14px;border-radius:999px;border:1.5px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#3C7C72;font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;'
    +   'max-width:22ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
    + '.dd-chip.active{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'
    + '.dd-chip:hover:not(.active){background:#F3EADA;}'

    /* the desk and its slate */
    + '.dd-desk{width:min(100%,640px);padding:18px 16px 20px;border-radius:18px;background:#FFFDF7;'
    +   'border:2px solid rgba(20,107,94,.22);'
    +   'box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 6px 18px rgba(20,107,94,.08);}'
    + '.dd-slate{display:flex;flex-direction:column;align-items:center;gap:10px;min-height:132px;'
    +   'justify-content:center;padding:14px 10px;border-radius:14px;background:#F3EADA;'
    +   'border:2px solid rgba(20,107,94,.16);}'
    + '.dd-line{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;}'
    /* a covered place is a cloth square — it shows THAT there is a part,
       never which one. The letters are absent from the DOM, not hidden. */
    /* ⚠ Projector legibility: this is read from the back of the room, so
       the slate scales with the viewport instead of sitting at a fixed
       34px in the middle of a 1200px panel. */
    + '.dd-cell{min-width:clamp(52px,7vw,96px);min-height:clamp(62px,8vw,112px);'
    +   'display:flex;align-items:center;justify-content:center;'
    +   'border-radius:11px;font-family:"Baloo 2",Nunito,system-ui,sans-serif;'
    +   'font-size:clamp(34px,5vw,60px);line-height:1;'
    +   'background:repeating-linear-gradient(45deg,#DCC9A8 0 8px,#D3BE9B 8px 16px);'
    +   'border:2px solid rgba(20,107,94,.18);color:transparent;padding:0 10px;}'
    + '.dd-cell.dd-open{background:#FFFDF7;color:#146B5E;border-color:rgba(20,107,94,.3);}'
    + '.dd-cell-silent.dd-open{color:#8A8578;background:#F7F1E4;border-style:dashed;}'
    + '.dd-tail{margin-left:2px;}'
    + '.dd-silentnote{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;text-align:center;}'
    + '.dd-meta{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#3C7C72;}'
    + '.dd-empty{font-family:Nunito,system-ui,sans-serif;font-size:16px;color:#3C7C72;}'

    + '.dd-controls{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
    + '.dd-btn{min-height:44px;padding:9px 16px;border-radius:12px;border:2px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer;}'
    + '.dd-btn:hover:not(:disabled){background:#F3EADA;}'
    + '.dd-btn:disabled{opacity:.45;cursor:default;}'
    + '.dd-primary{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'
    + '.dd-primary:hover:not(:disabled){background:#10574C;}'
    /* a gated control must not read as a broken one (the recorded
       open-number-line defect): full opacity, coral edge, lock glyph */
    + '.dd-locked{opacity:1;border-color:rgba(242,120,75,.55);color:#C2562F;}'
    + '.dd-locked::before{content:"";display:inline-block;width:11px;height:13px;margin-right:7px;'
    +   'vertical-align:-1px;border:2px solid currentColor;border-radius:2px;border-top-width:6px;'
    +   'border-top-left-radius:7px;border-top-right-radius:7px;box-sizing:border-box;}'

    + '.dd-panel{width:min(100%,640px);padding:14px;border-radius:14px;background:#FFFDF7;'
    +   'border:2px solid rgba(20,107,94,.18);display:flex;flex-direction:column;gap:10px;}'
    + '.dd-panelhead{display:flex;align-items:center;justify-content:space-between;gap:10px;}'
    + '.dd-panelttl{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:19px;color:#146B5E;}'
    + '.dd-input{min-height:44px;padding:8px 12px;border-radius:10px;border:2px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:17px;}'
    + '.dd-hint{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#3C7C72;}'
    + '.dd-draft{display:flex;flex-wrap:wrap;align-items:center;gap:2px;min-height:48px;}'
    + '.dd-dletter{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:26px;color:#146B5E;'
    +   'padding:2px 4px;}'
    + '.dd-seam{width:16px;min-height:44px;padding:0;border:0;background:transparent;cursor:pointer;'
    +   'position:relative;}'
    + '.dd-seam::after{content:"";position:absolute;left:7px;top:12px;bottom:12px;width:2px;'
    +   'background:rgba(20,107,94,.28);border-radius:2px;}'
    + '.dd-seam.joined::after{background:#F2784B;width:4px;left:6px;}'
    + '.dd-list{display:flex;flex-direction:column;gap:6px;}'
    + '.dd-listrow{display:flex;align-items:center;justify-content:space-between;gap:10px;}'
    + '.dd-listword{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:18px;color:#146B5E;}'

    + '.dd-gate{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;'
    +   'margin:0 0 8px;padding:9px 13px;border-radius:12px;background:#FBE6DA;'
    +   'border:1px solid rgba(242,120,75,.45);font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#8A3B1B;}'
    + '.dd-gate a{color:#C2562F;font-weight:700;}'

    + '.dd-printsheet{display:none;}'

    + '@media (max-width:480px){'
    +   '.dd-cell{min-width:44px;min-height:54px;font-size:28px;padding:0 7px;}'
    +   '.dd-desk{padding:14px 10px 16px;}'
    + '}'
    + 'body.dd-wide .lcs-header{flex-direction:column;}'
    /* the shell sets html,body{overflow:hidden}, so anything past the fold
       on a phone is UNREACHABLE, not merely off-screen (the letter-studio
       precedent, re-proven on tool #1) */
    + '@media (max-width:560px){body.dd-wide{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}}'

    + '@media (prefers-reduced-motion:reduce){.dd-cell{transition:none !important;}}'

    /* PRINT — re-tone every ink, not just the headline one (the recorded
       letter-studio defect). The sheet is ruled lines for the children to
       write on; the slate itself never prints, because a printed answer
       key defeats a dictation. */
    + '@media print{'
    +   '.dd-stages,.dd-controls,.dd-panel,.dd-gate,.dd-desk{display:none !important;}'
    +   '.dd-printsheet{display:block !important;padding:10mm;}'
    +   '.dd-printhead{font-size:15pt;color:#000;margin-bottom:8mm;}'
    +   '.dd-printrow{display:flex;align-items:flex-end;gap:4mm;margin-bottom:9mm;'
    +     'page-break-inside:avoid;break-inside:avoid;}'
    +   '.dd-printnum{font-size:11pt;color:#000;min-width:8mm;}'
    +   '.dd-printrule{flex:1;border-bottom:1pt solid #444;height:8mm;}'
    + '}';
  document.head.appendChild(st);
}
