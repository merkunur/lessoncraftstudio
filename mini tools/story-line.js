/* =====================================================================
   TOOL #10 — STORY LINE   (story-line.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #15 of the Premium Tools Program
   (Wave-3 opener) — the Word Workshop retelling tool: a clothesline
   across the projector; a child drags illustrated story cards from the
   tray and pegs them on the line; every peg is narrated with the
   locale's sequence words ("First, … / Then, … / At the end, …");
   "Play my story" pans a warm spotlight along the line reading the
   whole tale. Hide-narrator mode (premium) turns playback into the
   child's own retell ritual — deliberately WITHOUT any recording,
   transcript or notes: the teacher listens, full stop.

   NO-SHAME DESIGN (pedagogy-locked): playback ALWAYS honors the
   child's pegged order — sequence words attach to POSITIONS, not
   cards, so a jumbled line makes the semantics audibly collide and
   the laughter IS the feedback. No red X, no refusal, no "correct
   order!" copy or prosody, no stars/confetti/timers, no dimming of
   non-active cards (dimming-as-judgment is banned), no auto-
   rearranging of the child's cards — "the book's way" is a GHOST
   replay over their line, never a correction of it. Any future
   "check my order" feature request is to be refused.

   DATA: mini tools/story-line-sets.json — 14 sets (K 3-card,
   G1 4-card, G2 4-5-card); canonical order IS the array order.
   FREE = 2 complete sets (rain-rainbow + baking) with the whole
   ritual; PREMIUM = all sets + hide-narrator + teacher tray staging.
   ===================================================================== */
var StoryLine = {
  id: 'story-line',

  strings: {
    title:        {en:'Story Line',de:'Die Geschichtenleine',fr:'La corde à histoires',it:'Il filo delle storie',es:'El tendedero de cuentos',pt:'O varal de histórias',nl:'De verhalenwaslijn',sv:'Sagolinan',da:'Historiesnoren',no:'Fortellingssnora',fi:'Tarinanaru'},
    instruction:  {en:'Hang the story cards in order — every peg tells the next part. Then play your story!',de:'Hängt die Geschichtenkarten der Reihe nach auf — jede Klammer erzählt den nächsten Teil. Dann spielt eure Geschichte ab!',fr:'Accrochez les cartes de l’histoire dans l’ordre — chaque pince raconte la suite. Puis écoutez votre histoire !',it:'Appendi le carte della storia in ordine — ogni molletta racconta che cosa succede dopo. Poi ascolta la tua storia!',es:'Cuelga las tarjetas del cuento en orden — cada pinza cuenta la parte que sigue. ¡Luego escucha tu cuento!',pt:'Pendure os cartões da história na ordem — cada prendedor conta a próxima parte. Depois ouça a sua história!',nl:'Hang de verhaalkaarten op volgorde — elke knijper vertelt het volgende stukje. Speel dan je verhaal af!',sv:'Häng upp berättelsekorten i ordning — varje klädnypa berättar nästa del. Spela sedan upp er berättelse!',da:'Hæng historiekortene op i rækkefølge — hver klemme fortæller den næste del. Afspil så jeres historie!',no:'Heng opp fortellingskortene i rekkefølge — hver klype forteller neste del. Spill så av fortellingen deres!',fi:'Ripusta tarinakortit järjestykseen — jokainen pyykkipoika kertoo seuraavan osan. Kuuntele sitten oma tarinasi!'},
    /* sequence connectives — position-fixed; localizers give the REAL classroom words */
    seqFirst:     {en:'First',de:'Zuerst',fr:'D’abord',it:'Prima',es:'Primero',pt:'Primeiro',nl:'Eerst',sv:'Först',da:'Først',no:'Først',fi:'Ensin'},
    seqThen:      {en:'Then',de:'Dann',fr:'Puis',it:'Poi',es:'Luego',pt:'Depois',nl:'Dan',sv:'Sedan',da:'Så',no:'Så',fi:'Sitten'},
    seqNext:      {en:'Next',de:'Danach',fr:'Ensuite',it:'Dopo',es:'Después',pt:'Em seguida',nl:'Daarna',sv:'Därefter',da:'Derefter',no:'Deretter',fi:'Seuraavaksi'},
    seqAfter:     {en:'After that',de:'Anschließend',fr:'Après',it:'In seguito',es:'Entonces',pt:'Então',nl:'Vervolgens',sv:'Efter det',da:'Bagefter',no:'Etterpå',fi:'Sen jälkeen'},
    seqEnd:       {en:'At the end',de:'Zum Schluss',fr:'À la fin',it:'Alla fine',es:'Al final',pt:'Por fim',nl:'Tot slot',sv:'Till sist',da:'Til sidst',no:'Til slutt',fi:'Lopuksi'},
    closer:       {en:'And that’s the story.',de:'Und das war die Geschichte.',fr:'Et voilà l’histoire.',it:'E la storia è finita.',es:'Y colorín colorado, este cuento se ha acabado.',pt:'E essa foi a história.',nl:'En dat was het verhaal.',sv:'Och så var sagan slut.',da:'Snip, snap, snude — så er historien ude.',no:'Snipp, snapp, snute — så var fortellingen ute.',fi:'Sen pituinen se.'},
    play:         {en:'Play my story',de:'Meine Geschichte abspielen',fr:'Écouter mon histoire',it:'Ascolta la mia storia',es:'Escuchar mi cuento',pt:'Ouvir minha história',nl:'Speel mijn verhaal af',sv:'Spela upp min berättelse',da:'Afspil min historie',no:'Spill av fortellingen min',fi:'Kuuntele tarinani'},
    stop:         {en:'Stop',de:'Stopp',fr:'Arrêter',it:'Ferma',es:'Detener',pt:'Parar',nl:'Stoppen',sv:'Stopp',da:'Stop',no:'Stopp',fi:'Lopeta'},
    tapHint:      {en:'Tap to tell the next part.',de:'Tippt, um den nächsten Teil zu erzählen.',fr:'Touchez pour raconter la suite.',it:'Tocca per raccontare che cosa succede dopo.',es:'Toca para contar la parte que sigue.',pt:'Toque para contar a próxima parte.',nl:'Tik om het volgende stukje te vertellen.',sv:'Tryck för att berätta nästa del.',da:'Tryk for at fortælle den næste del.',no:'Trykk for å fortelle neste del.',fi:'Napauta, niin tarina jatkuu.'},
    bookWay:      {en:'The book’s way',de:'So erzählt es das Buch',fr:'La version du livre',it:'La versione del libro',es:'Como lo cuenta el libro',pt:'Do jeito do livro',nl:'Zoals het boek het vertelt',sv:'Bokens version',da:'Bogens version',no:'Bokas versjon',fi:'Näin kirja sen kertoo'},
    library:      {en:'Story sets',de:'Geschichtensammlung',fr:'Collection d’histoires',it:'Raccolta di storie',es:'Colección de cuentos',pt:'Coleção de histórias',nl:'Verhalenverzameling',sv:'Berättelsesamlingen',da:'Historiesamlingen',no:'Fortellingssamlingen',fi:'Tarinakokoelma'},
    bandK:        {en:'Ages 4–6',de:'4–6 Jahre',fr:'4–6 ans',it:'4–6 anni',es:'4–6 años',pt:'4–6 anos',nl:'4–6 jaar',sv:'4–6 år',da:'4–6 år',no:'4–6 år',fi:'4–6 v'},
    bandG1:       {en:'Ages 6–7',de:'6–7 Jahre',fr:'6–7 ans',it:'6–7 anni',es:'6–7 años',pt:'6–7 anos',nl:'6–7 jaar',sv:'6–7 år',da:'6–7 år',no:'6–7 år',fi:'6–7 v'},
    bandG23:      {en:'Ages 7–9',de:'7–9 Jahre',fr:'7–9 ans',it:'7–9 anni',es:'7–9 años',pt:'7–9 anos',nl:'7–9 jaar',sv:'7–9 år',da:'7–9 år',no:'7–9 år',fi:'7–9 v'},
    narrator:     {en:'Narrator',de:'Erzählstimme',fr:'La voix qui raconte',it:'La voce narrante',es:'La voz que narra',pt:'A voz que conta',nl:'De vertelstem',sv:'Berättarrösten',da:'Fortællerstemmen',no:'Fortellerstemmen',fi:'Kertojan ääni'},
    startAgain:   {en:'Start again',de:'Noch einmal',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw beginnen',sv:'Börja om',da:'Begynd forfra',no:'Begynn på nytt',fi:'Aloita alusta'},
    close:        {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    /* settings */
    setShowCaps:  {en:'Show the words on the cards',de:'Wörter auf den Karten zeigen',fr:'Montrer les mots sur les cartes',it:'Mostra le parole sulle carte',es:'Mostrar las palabras en las tarjetas',pt:'Mostrar as palavras nos cartões',nl:'Woorden op de kaarten tonen',sv:'Visa orden på korten',da:'Vis ordene på kortene',no:'Vis ordene på kortene',fi:'Näytä sanat korteissa'},
    setChips:     {en:'Show the sequence words',de:'Reihenfolgewörter zeigen',fr:'Montrer les connecteurs (d’abord, puis…)',it:'Mostra le paroline del tempo',es:'Mostrar las palabras de secuencia',pt:'Mostrar as palavras de sequência',nl:'Volgordewoorden tonen',sv:'Visa tidsorden',da:'Vis rækkefølgeordene',no:'Vis tidsordene',fi:'Näytä järjestyssanat'},
    setTapPace:   {en:'Tap to move the story along',de:'Zum Weitererzählen tippen',fr:'Toucher pour faire avancer l’histoire',it:'Tocca per far continuare la storia',es:'Tocar para avanzar el cuento',pt:'Tocar para avançar a história',nl:'Tikken om het verhaal verder te laten gaan',sv:'Tryck för att föra berättelsen vidare',da:'Tryk for at føre historien videre',no:'Trykk for å føre fortellingen videre',fi:'Tarina etenee napautuksella'},
    /* gates */
    gateSets:     {en:'The full story library — fifteen tales and cycles to hang and retell — is part of Premium. Rain and Rainbow and Baking Day are always free.',de:'Die ganze Geschichten-Sammlung — fünfzehn Erzählungen und Kreisläufe zum Aufhängen und Nacherzählen — gehört zu Premium. Regen und Regenbogen sowie der Backtag bleiben immer kostenlos.',fr:'La collection complète — quinze histoires et cycles à accrocher et à raconter — fait partie de Premium. « Pluie et arc-en-ciel » et « Le jour du gâteau » restent toujours gratuits.',it:'La raccolta completa — quindici storie e cicli da appendere e raccontare — fa parte di Premium. «Pioggia e arcobaleno» e «Il giorno della torta» restano sempre gratuiti.',es:'La colección completa — quince cuentos y ciclos para colgar y contar — es parte de Premium. «Lluvia y arcoíris» y «Día de hornear» son gratis para siempre.',pt:'A coleção completa — quinze histórias e ciclos para pendurar e recontar — faz parte do Premium. Chuva e arco-íris e Dia de fazer bolo são sempre gratuitos.',nl:'De hele verzameling — vijftien verhalen en kringlopen om op te hangen en na te vertellen — hoort bij Premium. Regen en regenboog en de bakdag blijven altijd gratis.',sv:'Hela samlingen — femton berättelser och kretslopp att hänga upp och återberätta — ingår i Premium. Regn och regnbåge samt Bakdagen är alltid gratis.',da:'Hele historiesamlingen — femten historier og kredsløb at hænge op og genfortælle — er en del af Premium. Regn og regnbue og Bagedag er altid gratis.',no:'Hele samlingen — femten fortellinger og kretsløp å henge opp og gjenfortelle — er en del av Premium. Regn og regnbue og bakedagen er alltid gratis.',fi:'Koko kokoelma — viisitoista tarinaa ja kiertokulkua ripustettavaksi ja kerrottavaksi — kuuluu Premiumiin. Sade ja sateenkaari sekä leivontapäivä ovat aina ilmaisia.'},
    gateNarrator: {en:'Retell mode — the narrator goes quiet and your storyteller tells it — is part of Premium. The narrated line is always free.',de:'Der Nacherzähl-Modus — die Erzählstimme wird still und euer Erzählkind erzählt selbst — gehört zu Premium. Die erzählte Leine bleibt immer kostenlos.',fr:'Le mode « à toi de raconter » — la voix se tait et l’enfant raconte — fait partie de Premium. La corde racontée reste gratuite.',it:'La modalità racconto — la voce narrante tace e il bambino racconta — fa parte di Premium. Il filo narrato resta sempre gratuito.',es:'El modo «ahora lo cuentas tú» — la voz que narra se calla y el niño cuenta el cuento — es parte de Premium. El tendedero narrado siempre es gratis.',pt:'O modo de reconto — a voz fica em silêncio e a criança conta a história — faz parte do Premium. O varal narrado é sempre gratuito.',nl:'De navertelstand — de vertelstem wordt stil en jouw verteller vertelt zelf — hoort bij Premium. De waslijn mét vertelstem blijft altijd gratis.',sv:'Återberättarläget — berättarrösten tystnar och ert barn berättar — ingår i Premium. Den berättade linan är alltid gratis.',da:'Fortæl selv-tilstanden — fortællerstemmen tier, og barnet fortæller selv — er en del af Premium. Den fortalte snor er altid gratis.',no:'Gjenfortellingsmodusen — fortellerstemmen blir stille og barnet forteller selv — er en del av Premium. Den fortalte snora er alltid gratis.',fi:'Kerrontatila — kertojan ääni hiljenee ja lapsi kertoo itse — kuuluu Premiumiin. Kertojan lukema tarinanaru on aina ilmainen.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås alt op',no:'Lås opp alt',fi:'Avaa kaikki'},
    loading:      {en:'Pegging up the line…',de:'Die Leine wird gespannt…',fr:'On tend la corde…',it:'Tendiamo il filo…',es:'Tendiendo el cuento…',pt:'Esticando o varal…',nl:'De waslijn wordt gespannen…',sv:'Linan spänns upp…',da:'Snoren spændes ud…',no:'Snora spennes opp…',fi:'Narua pingotetaan…'}
  },

  defaults: { showCaps: true, showChips: true, tapPace: false },
  settings: [
    { key: 'showCaps', type: 'toggle', labelKey: 'setShowCaps' },
    { key: 'showChips', type: 'toggle', labelKey: 'setChips' },
    { key: 'tapPace', type: 'toggle', labelKey: 'setTapPace' }
  ],

  STORE_KEY: 'lcs:story-line:v1',
  ENT_TRUST_DAYS: 14,
  BAND_KEY: { K: 'bandK', G1: 'bandG1', G23: 'bandG23' },
  /* connective KEYS per line length — position-fixed (the no-shame mechanism) */
  SEQ_BY_N: {
    3: ['seqFirst', 'seqThen', 'seqEnd'],
    4: ['seqFirst', 'seqThen', 'seqAfter', 'seqEnd'],
    5: ['seqFirst', 'seqThen', 'seqNext', 'seqAfter', 'seqEnd']
  },

  /* =========================== lifecycle =========================== */

  init: function (api) {
    var self = this;
    this.api = api;
    this.premium = false;
    this.data = null;
    this.byId = {};
    this.current = null;
    this.slots = [];            /* slot index -> card index | null */
    this.tray = [];             /* card indices still in the tray (shuffled) */
    this.playing = false;
    this.playedFull = false;    /* unlocks "the book's way" */
    this._playToken = 0;
    this._actx = null;

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, settings: null, narratorOff: false };
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    this.narratorOff = !!this._store.narratorOff;

    var params = new URLSearchParams(location.search);
    this._wantSet = params.get('set') || null;

    fetch('/mini-tools/story-line-sets.json', { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        self.data = j;
        (j.sets || []).forEach(function (s) { self.byId[s.id] = s; });
        self._setSet(self._resolveSet());
      })
      .catch(function () {
        var ld = api.el('div', 'stl-loading');
        ld.textContent = api.t('loading');
        api.stage.appendChild(ld);
      });

    this._fetchEntitlement();
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      st.settings[key] = this.api.settings[key];
    }
    st.narratorOff = this.narratorOff;
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },

  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; if (self._wrap) { self._setSet(self._resolveSet()); } }
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
        if (self._wrap) { self._setSet(self._resolveSet()); }
      })
      .catch(function () { trustCache(); });
  },

  /* ============================ helpers ============================ */

  _loc: function (map) { if (!map) return ''; return map[this.api.lang] || map.en || ''; },
  _isFree: function (s) { return !!(this.data && (this.data.freeSets || []).indexOf(s.id) >= 0); },
  /* STRUCTURAL free gate: free resolves only the 2 free sets */
  _resolveSet: function () {
    if (!this.data) return null;
    var want = this._wantSet && this.byId[this._wantSet];
    if (want && (this.premium || this._isFree(want))) return want;
    if (this.current && (this.premium || this._isFree(this.current))) return this.current;
    return this.byId[(this.data.freeSets || [])[0]] || this.data.sets[0];
  },
  _seqWord: function (pos, n) {
    var keys = this.SEQ_BY_N[n] || this.SEQ_BY_N[4];
    return this.api.t(keys[Math.min(pos, keys.length - 1)]);
  },
  _speak: function (text) {
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.92 }); } catch (_) {}
    this.api.announce(text);
  },
  /* hide-narrator peg cue: ONE fixed soft note, always the same
     (a pitch ladder would encode progress/judgment) */
  _chime: function () {
    try {
      if (!this._actx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        this._actx = AC ? new AC() : false;
      }
      if (!this._actx) return;
      if (this._actx.state === 'suspended') this._actx.resume();
      var ctx = this._actx, t = ctx.currentTime;
      var osc = ctx.createOscillator();
      osc.type = 'sine'; osc.frequency.value = 659.25;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.16, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.75);
    } catch (_) {}
  },
  _narratePeg: function (slotIdx) {
    var n = this.slots.length;
    var ci = this.slots[slotIdx];
    if (ci == null) return;
    if (this.narratorOff && this.premium) { this._chime(); return; }
    var cap = this._loc(this.current.cards[ci].cap);
    var text = this._seqWord(slotIdx, n) + ', ' + cap;   /* capitals are inaudible; lowercasing would break German nouns */
    this._speak(text);
    this._haloSlot(slotIdx, 2600);
  },
  _haloSlot: function (slotIdx, ms) {
    var el = this._slotEls && this._slotEls[slotIdx];
    if (!el) return;
    var card = el.querySelector('.stl-card');
    if (!card) return;
    card.classList.add('speaking');
    setTimeout(function () { card.classList.remove('speaking'); }, ms);
  },

  /* =========================== rendering =========================== */

  _setSet: function (s) {
    if (!s) return;
    this.current = s;
    var n = s.cards.length;
    this.slots = new Array(n).fill(null);
    this.tray = s.cards.map(function (_, i) { return i; });
    /* Fisher–Yates deal — a canonical tray would make it copy-the-line */
    for (var i = this.tray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = this.tray[i]; this.tray[i] = this.tray[j]; this.tray[j] = t;
    }
    this.playedFull = false;
    this._stopPlayback();
    this.render();
  },

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('stl-wide');
    if (!this.data || !this.current) return;

    var wrap = api.el('div', 'stl-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    var s = this.current, n = s.cards.length;

    /* ---- the line zone ---- */
    var lineZone = api.el('div', 'stl-linezone');
    var line = api.el('div', 'stl-line');
    this._lineEl = line;
    line.innerHTML = this._ropeSVG();
    this._slotEls = [];
    for (var i = 0; i < n; i++) line.appendChild(this._slotEl(i, n));
    lineZone.appendChild(line);
    wrap.appendChild(lineZone);

    /* ---- the tray ---- */
    var tray = api.el('div', 'stl-tray');
    this._trayEl = tray;
    this.tray.forEach(function (ci) { tray.appendChild(self._trayCardEl(ci)); });
    wrap.appendChild(tray);

    /* ---- dock ---- */
    wrap.appendChild(this._dock());

    this._layout();
  },

  _ropeSVG: function () {
    return '<svg class="stl-rope" viewBox="0 0 940 64" preserveAspectRatio="none" aria-hidden="true">' +
      '<rect class="stl-post" x="10" y="4" width="12" height="58" rx="6" fill="#A9814F"/>' +
      '<rect class="stl-post" x="918" y="4" width="12" height="58" rx="6" fill="#A9814F"/>' +
      '<path d="M 24 16 Q 470 52 916 16" fill="none" stroke="#8B6F47" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M 24 15 Q 470 51 916 15" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>' +
      '</svg>';
  },
  _ropeY: function (t) {
    /* quadratic bezier y at parameter t (16 → 52 → 16) */
    return (1 - t) * (1 - t) * 16 + 2 * t * (1 - t) * 52 + t * t * 16;
  },

  _slotEl: function (i, n) {
    var api = this.api, self = this;
    var slot = api.el('div', 'stl-slot' + (this.slots[i] != null ? ' filled' : ''));
    slot.dataset.slot = i;
    if (this.slots[i] != null) {
      var card = this._cardEl(this.slots[i], 'line');
      card.dataset.fromSlot = i;
      slot.appendChild(card);
      slot.insertAdjacentHTML('beforeend', this._pinSVG());
      this._wireLineDrag(card, i);
    } else {
      slot.insertAdjacentHTML('beforeend', '<span class="stl-notch" aria-hidden="true"></span>');
    }
    if (this.api.settings.showChips) {
      var chip = api.el('span', 'stl-seq' + (this.slots[i] == null ? ' empty' : ''));
      chip.textContent = this._seqWord(i, n);
      slot.appendChild(chip);
    }
    this._slotEls[i] = slot;
    return slot;
  },

  _pinSVG: function () {
    return '<svg class="stl-pin" viewBox="0 0 28 44" aria-hidden="true">' +
      '<rect x="6" y="2" width="7" height="38" rx="3.5" fill="#C99B62" stroke="#A9814F" stroke-width="1.2"/>' +
      '<rect x="15" y="2" width="7" height="38" rx="3.5" fill="#C99B62" stroke="#A9814F" stroke-width="1.2"/>' +
      '<circle cx="14" cy="14" r="4" fill="none" stroke="#8A8A93" stroke-width="2"/>' +
      '</svg>';
  },

  _cardEl: function (ci, ctx) {
    var api = this.api;
    var c = this.current.cards[ci];
    var card = api.el('button', 'stl-card ' + (ctx === 'line' ? 'on-line' : 'in-tray'));
    card.type = 'button';
    card.dataset.card = ci;
    var art = api.el('div', 'stl-art');
    if (c.art.t === 'img') {
      var img = document.createElement('img');
      img.loading = 'lazy'; img.decoding = 'async'; img.alt = '';
      img.draggable = false;   /* a draggable img starts a NATIVE drag → pointercancel kills the peg */
      img.src = '/image-library-webp/themes/' + encodeURIComponent(c.art.d) + '/' + c.art.f + '@' + (ctx === 'mini' ? '1x' : '2x') + '.webp';
      art.appendChild(img);
    } else {
      art.innerHTML = '<svg viewBox="0 0 36 36" class="stl-glyph" aria-hidden="true">' + (this.STL_GLYPHS[c.art.key] || '') + '</svg>';
    }
    card.appendChild(art);
    if (this.api.settings.showCaps && ctx !== 'mini') {
      var cap = api.el('div', 'stl-cap');
      cap.textContent = this._loc(c.cap);
      card.appendChild(cap);
    }
    card.setAttribute('aria-label', this._loc(c.cap));
    return card;
  },

  _trayCardEl: function (ci) {
    var card = this._cardEl(ci, 'tray');
    card.style.setProperty('--stl-jit', ((ci * 37) % 5 - 2.5).toFixed(1) + 'deg');
    this._wireTrayDrag(card, ci);
    return card;
  },

  /* layout: place slots on the rope sag */
  _layout: function () {
    var line = this._lineEl;
    if (!line) return;
    var n = this.slots.length;
    var W = line.clientWidth || 940;
    var maxW = { 3: 190, 4: 168, 5: 148 }[n] || 168;
    var gap = { 3: 24, 4: 20, 5: 16 }[n] || 20;
    var slotW = Math.min(maxW, Math.floor((W - (n - 1) * gap - 24) / n));
    if (slotW < 90) gap = 6;
    slotW = Math.max(56, slotW);
    var slotH = Math.round(slotW * 1.273);
    var rowW = n * slotW + (n - 1) * gap;
    var x0 = (W - rowW) / 2;
    var hideCaps = slotW < 110;
    for (var i = 0; i < n; i++) {
      var cx = x0 + i * (slotW + gap) + slotW / 2;
      var t = Math.max(0, Math.min(1, (cx / W)));
      var ropeY = this._ropeY(t) * (line.clientHeight >= 64 ? 1 : 1);
      var el = this._slotEls[i];
      el.style.width = slotW + 'px';
      el.style.height = slotH + 'px';
      el.style.left = (x0 + i * (slotW + gap)) + 'px';
      el.style.top = (ropeY + 6) + 'px';
      el.classList.toggle('no-cap', hideCaps);
    }
    line.style.height = (52 + 10 + slotH + 46) + 'px';
    this._slotW = slotW;
  },

  /* ========================= drag engine =========================== */

  _wireTrayDrag: function (card, ci) { this._wireDrag(card, ci, null); },
  _wireLineDrag: function (card, fromSlot) { this._wireDrag(card, Number(card.dataset.card), fromSlot); },

  _wireDrag: function (card, ci, fromSlot) {
    var self = this;
    var start = null, fly = null, moved = false;
    card.style.touchAction = 'none';
    card.addEventListener('dragstart', function (e) { e.preventDefault(); });
    card.addEventListener('pointerdown', function (e) {
      if (!e.isPrimary || self.playing) return;
      start = { x: e.clientX, y: e.clientY };
      moved = false;
      try { card.setPointerCapture(e.pointerId); } catch (_) {}
    });
    card.addEventListener('pointermove', function (e) {
      if (!start) return;
      var dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!moved && Math.hypot(dx, dy) < 10) return;
      if (!moved) {
        moved = true;
        fly = self._makeFly(ci);
        document.body.appendChild(fly);
        card.classList.add('dragging');
        if (fromSlot != null) {
          var pin = card.parentNode.querySelector('.stl-pin');
          if (pin) pin.style.opacity = '0';
        }
      }
      fly.style.left = (e.clientX - fly._w / 2) + 'px';
      fly.style.top = (e.clientY - fly._h * 0.35) + 'px';
      var hot = self._slotAt(e.clientX, e.clientY);
      self._slotEls.forEach(function (s, i) { s.classList.toggle('hot', i === hot); });
    });
    var up = function (e) {
      if (!start) return;
      var wasMoved = moved;
      start = null;
      self._slotEls.forEach(function (s) { s.classList.remove('hot'); });
      if (fly) { fly.remove(); fly = null; }
      card.classList.remove('dragging');
      if (!wasMoved) {
        /* tap: speak this card's caption (tray) or re-narrate (line) */
        if (fromSlot != null) self._narratePeg(fromSlot);
        else if (!(self.narratorOff && self.premium)) self._speak(self._loc(self.current.cards[ci].cap));
        return;
      }
      var target = self._slotAt(e.clientX, e.clientY);
      var inTray = self._inRect(self._trayEl, e.clientX, e.clientY) ||
        (self._lineEl && e.clientY > self._lineEl.getBoundingClientRect().bottom + 40);
      if (fromSlot != null) {
        if (target != null && target !== fromSlot) self._moveSlot(fromSlot, target);
        else if (inTray) self._unpeg(fromSlot);
        else self.render();      /* settle back */
      } else {
        if (target != null) self._peg(ci, target);
        /* else: fly back — render restores */
        else self.render();
      }
    };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);

    /* keyboard */
    card.addEventListener('keydown', function (e) {
      if (self.playing) return;
      if (fromSlot == null) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var empty = self.slots.indexOf(null);
          if (empty >= 0) self._peg(ci, empty);
        }
      } else {
        if (e.key === 'ArrowLeft' && fromSlot > 0) { e.preventDefault(); self._moveSlot(fromSlot, fromSlot - 1); }
        else if (e.key === 'ArrowRight' && fromSlot < self.slots.length - 1) { e.preventDefault(); self._moveSlot(fromSlot, fromSlot + 1); }
        else if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); self._unpeg(fromSlot); }
      }
    });
  },

  _makeFly: function (ci) {
    var fly = this._cardEl(ci, 'line');
    fly.classList.add('stl-fly');
    var w = this._slotW || 160, h = Math.round(w * 1.273);
    fly.style.width = w + 'px'; fly.style.height = h + 'px';
    fly._w = w; fly._h = h;
    return fly;
  },
  _slotAt: function (x, y) {
    for (var i = 0; i < this._slotEls.length; i++) {
      var r = this._slotEls[i].getBoundingClientRect();
      if (x >= r.left - 16 && x <= r.right + 16 && y >= r.top - 24 && y <= r.bottom + 24) return i;
    }
    return null;
  },
  _inRect: function (el, x, y) {
    if (!el) return false;
    var r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  },

  /* every peg is accepted identically — position decides the connective */
  _peg: function (ci, slotIdx) {
    this.tray = this.tray.filter(function (x) { return x !== ci; });
    if (this.slots[slotIdx] == null) {
      this.slots[slotIdx] = ci;
    } else {
      /* SHIFT-insert toward the nearest empty slot */
      var empty = this._nearestEmpty(slotIdx);
      if (empty == null) { this.tray.push(ci); this.render(); return; }
      var step = empty > slotIdx ? -1 : 1;
      for (var i = empty; i !== slotIdx; i += step) this.slots[i] = this.slots[i + step];
      this.slots[slotIdx] = ci;
    }
    this.playedFull = false;
    this.render();
    this._narratePeg(slotIdx);
  },
  _moveSlot: function (from, to) {
    var ci = this.slots[from];
    this.slots[from] = null;
    if (this.slots[to] == null) this.slots[to] = ci;
    else {
      var empty = this._nearestEmpty(to);
      if (empty == null) { this.slots[from] = ci; this.render(); return; }
      var step = empty > to ? -1 : 1;
      for (var i = empty; i !== to; i += step) this.slots[i] = this.slots[i + step];
      this.slots[to] = ci;
    }
    this.playedFull = false;
    this.render();
    this._narratePeg(to);
  },
  _nearestEmpty: function (idx) {
    var best = null, dist = 99;
    for (var i = 0; i < this.slots.length; i++) {
      if (this.slots[i] == null && Math.abs(i - idx) < dist) { best = i; dist = Math.abs(i - idx); }
    }
    return best;
  },
  _unpeg: function (slotIdx) {
    var ci = this.slots[slotIdx];
    if (ci == null) return;
    this.slots[slotIdx] = null;
    this.tray.push(ci);
    this.playedFull = false;
    this.render();
  },

  /* ========================= playback ============================== */

  _pegCount: function () { return this.slots.filter(function (x) { return x != null; }).length; },

  _dock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'stl-dock');

    var name = api.el('div', 'stl-namechip');
    name.textContent = this._loc(this.current.title);
    dock.appendChild(name);

    var prow = api.el('div', 'stl-chiprow');
    var play = api.el('button', 'stl-big coral');
    play.type = 'button';
    play.textContent = api.t(this.playing ? 'stop' : 'play');
    play.disabled = !this.playing && this._pegCount() < 2;
    play.addEventListener('click', function () {
      if (self.playing) self._stopPlayback(true);
      else self._playStory(false);
    });
    prow.appendChild(play);
    if (this.playedFull && !this.playing) {
      var book = api.el('button', 'stl-chip');
      book.type = 'button';
      book.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5 a2 2 0 0 1 2-2 h5 v16 h-5 a2 2 0 0 0-2 2 z"/><path d="M20 5 a2 2 0 0 0-2-2 h-5 v16 h5 a2 2 0 0 1 2 2 z"/></svg> ' + api.t('bookWay');
      book.addEventListener('click', function () { self._playStory(true); });
      prow.appendChild(book);
    }
    dock.appendChild(prow);

    var lock = ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
    var row = api.el('div', 'stl-chiprow');
    var lib = api.el('button', 'stl-chip teal');
    lib.type = 'button';
    lib.textContent = api.t('library');
    lib.addEventListener('click', function () { self._openPanel(); });
    row.appendChild(lib);

    var narr = api.el('button', 'stl-chip' + (this.narratorOff ? ' narr-off' : '') + (this.premium ? '' : ' locked'));
    narr.type = 'button';
    narr.setAttribute('aria-pressed', this.narratorOff ? 'false' : 'true');
    narr.innerHTML = (this.narratorOff
      ? '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10 v4 h3.5 L13 19 V5 L7.5 10 Z" fill="currentColor" stroke="none"/><line x1="16" y1="8" x2="22" y2="16"/><line x1="22" y1="8" x2="16" y2="16"/></svg> '
      : '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10 v4 h3.5 L13 19 V5 L7.5 10 Z" fill="currentColor" stroke="none"/><path d="M16.5 9.5 a4 4 0 0 1 0 5"/><path d="M19 7.5 a7.5 7.5 0 0 1 0 9"/></svg> ')
      + api.t('narrator');
    if (!this.premium) narr.innerHTML += lock;
    narr.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(dock, 'gateNarrator'); return; }
      self.narratorOff = !self.narratorOff;
      self._saveStore();
      self.render();
    });
    row.appendChild(narr);

    var again = api.el('button', 'stl-chip');
    again.type = 'button';
    again.textContent = api.t('startAgain');
    again.addEventListener('click', function () { self._setSet(self.current); });
    row.appendChild(again);

    dock.appendChild(row);
    return dock;
  },

  _playStory: function (booksWay) {
    var self = this;
    if (this.playing) return;
    var order = [];
    if (booksWay) {
      /* GHOST replay: canonical card order over the child's line —
         cards NEVER move; the spotlight visits the slot each card
         currently hangs on, with the CANONICAL connective */
      for (var ci = 0; ci < this.current.cards.length; ci++) {
        var slot = this.slots.indexOf(ci);
        if (slot >= 0) order.push({ slot: slot, ci: ci, pos: order.length });
      }
    } else {
      for (var i = 0; i < this.slots.length; i++) {
        if (this.slots[i] != null) order.push({ slot: i, ci: this.slots[i], pos: order.length });
      }
    }
    if (order.length < 2) return;
    this.playing = true;
    var token = ++this._playToken;
    this.render();
    var silent = this.narratorOff && this.premium;
    var tap = this.api.settings.tapPace || silent;
    var n = order.length;
    var idx = 0;

    var advance = function () {
      if (token !== self._playToken) return;
      if (idx > 0) self._unspot(order[idx - 1].slot);
      if (idx >= n) { finish(); return; }
      var step = order[idx];
      self._spot(step.slot);
      if (!silent) {
        var cap = self._loc(self.current.cards[step.ci].cap);
        var text = self._seqWord(step.pos, n) + ', ' + cap;
        self._speak(text);
      }
      idx++;
      if (!tap) {
        /* auto: TTS has no end event through LCSAudio — pace by length */
        var capLen = self._loc(self.current.cards[step.ci].cap).length;
        self._playTimer = setTimeout(advance, silent ? 2200 : (1800 + capLen * 55));
      } else {
        self._tapHandler = function () { advance(); };
      }
    };
    var finish = function () {
      if (token !== self._playToken) return;
      self._tapHandler = null;
      var grid = self._lineEl;
      if (grid) grid.classList.add('all-told');
      if (!silent) self._speak(self.api.t('closer'));
      setTimeout(function () {
        if (token !== self._playToken) return;
        if (grid) grid.classList.remove('all-told');
        self.playing = false;
        if (!booksWay) self.playedFull = true;
        self.render();
      }, 1800);
    };

    if (tap) {
      /* tap anywhere on the stage advances */
      this._stageTap = function () { if (self._tapHandler) self._tapHandler(); };
      this._wrap.addEventListener('click', this._stageTap);
      var hint = this.api.el('div', 'stl-taphint');
      hint.textContent = this.api.t('tapHint');
      this._wrap.appendChild(hint);
    }
    advance();
  },
  _spot: function (slotIdx) {
    var el = this._slotEls[slotIdx];
    if (!el) return;
    var card = el.querySelector('.stl-card');
    if (card) card.classList.add('stl-spot');
    var chip = el.querySelector('.stl-seq');
    if (chip) chip.classList.add('warm');
  },
  _unspot: function (slotIdx) {
    var el = this._slotEls[slotIdx];
    if (!el) return;
    var card = el.querySelector('.stl-card');
    if (card) card.classList.remove('stl-spot');
    var chip = el.querySelector('.stl-seq');
    if (chip) chip.classList.remove('warm');
  },
  _stopPlayback: function (rerender) {
    this._playToken++;
    if (this._playTimer) { clearTimeout(this._playTimer); this._playTimer = null; }
    this._tapHandler = null;
    if (this._wrap && this._stageTap) { this._wrap.removeEventListener('click', this._stageTap); this._stageTap = null; }
    try { LCSAudio.cancel && LCSAudio.cancel(); } catch (_) {}
    this.playing = false;
    if (rerender) this.render();
  },

  /* ======================= library panel =========================== */

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
    var scrim = api.el('div', 'stl-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'stl-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('library'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },
  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    panel.innerHTML = '';
    var head = api.el('div', 'stl-panel-head');
    var h = api.el('div', 'stl-panel-title');
    h.textContent = api.t('library');
    var x = api.el('button', 'stl-panel-close');
    x.type = 'button';
    x.setAttribute('aria-label', api.t('close'));
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.addEventListener('click', function () { self._closePanel(); });
    head.append(h, x);
    panel.appendChild(head);

    var body = api.el('div', 'stl-panel-body');
    ['K', 'G1', 'G23'].forEach(function (band) {
      var lbl = api.el('div', 'stl-bandlbl');
      lbl.textContent = api.t(self.BAND_KEY[band]);
      body.appendChild(lbl);
      var tiles = api.el('div', 'stl-tiles');
      self.data.sets.filter(function (s) { return s.band === band; }).forEach(function (s) {
        var locked = !self.premium && !self._isFree(s);
        var tile = api.el('button', 'stl-tile' + (locked ? ' locked' : '') + (self.current.id === s.id ? ' active' : ''));
        tile.type = 'button';
        var strip = api.el('div', 'stl-strip');
        s.cards.forEach(function (c, ci) {
          var mc = api.el('div', 'stl-minicard');
          if (c.art.t === 'img') {
            mc.innerHTML = '<img loading="lazy" decoding="async" alt="" src="/image-library-webp/themes/' + encodeURIComponent(c.art.d) + '/' + c.art.f + '@1x.webp">';
          } else {
            mc.innerHTML = '<svg viewBox="0 0 36 36" aria-hidden="true">' + (self.STL_GLYPHS[c.art.key] || '') + '</svg>';
          }
          strip.appendChild(mc);
        });
        tile.appendChild(strip);
        if (locked) tile.insertAdjacentHTML('beforeend', '<span class="stl-lock"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></span>');
        var nm = api.el('div', 'stl-tilename');
        nm.textContent = self._loc(s.title);
        tile.appendChild(nm);
        tile.addEventListener('click', function () {
          if (locked) { self._closePanel(); self._gateInline(self._wrap.querySelector('.stl-dock'), 'gateSets'); return; }
          self._closePanel();
          self._wantSet = null;
          self._setSet(s);
        });
        tiles.appendChild(tile);
      });
      body.appendChild(tiles);
    });
    panel.appendChild(body);
  },

  _gateInline: function (host, key) {
    var api = this.api;
    var old = this._wrap.querySelector('.stl-gate');
    if (old) old.remove();
    var g = api.el('div', 'stl-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-story-line';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('beforebegin', g);
    setTimeout(function () { if (g.parentNode) g.remove(); }, 12000);
  },

  onSettings: function () {
    this._saveStore();
    this.render();
  },
  reset: function () {
    this._stopPlayback();
    this._setSet(this.current);
  },
  paint: function () {},

  /* ======================= the glyph library ======================= */
  /* 12 copied from the shipped story-spine activity's fixed scene set
     (36×36 boxes) + 4 NEW authored for the growth/lifecycle sets. */
  STL_GLYPHS: {
    bunny: '<ellipse cx="18" cy="26" rx="9" ry="10" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.5"/><ellipse cx="14" cy="11" rx="3" ry="8" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.3"/><ellipse cx="22" cy="11" rx="3" ry="8" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.3"/><circle cx="15" cy="24" r="1.4" fill="#2B2B2B"/><circle cx="21" cy="24" r="1.4" fill="#2B2B2B"/><circle cx="18" cy="28" r="1.4" fill="#E7A6A0"/>',
    mouse: '<ellipse cx="18" cy="24" rx="10" ry="9" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.5"/><circle cx="11" cy="15" r="4.5" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.3"/><circle cx="25" cy="15" r="4.5" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.3"/><path d="M27 27 q7 2 6 8" stroke="#7E7873" stroke-width="1.5" fill="none"/><circle cx="16" cy="23" r="1.3" fill="#2B2B2B"/><circle cx="21" cy="23" r="1.3" fill="#2B2B2B"/><circle cx="18.5" cy="27" r="1.2" fill="#E7A6A0"/>',
    bird: '<line x1="17" y1="28" x2="17" y2="33" stroke="#E08A2A" stroke-width="1.6" stroke-linecap="round"/><line x1="21" y1="28" x2="21" y2="33" stroke="#E08A2A" stroke-width="1.6" stroke-linecap="round"/><path d="M26 21 l8 -3 l-2 6 z" fill="#3E8794"/><ellipse cx="19" cy="23" rx="9" ry="7" fill="#5BA3B0" stroke="#2E6B77" stroke-width="1.5"/><circle cx="13" cy="16" r="5.5" fill="#5BA3B0" stroke="#2E6B77" stroke-width="1.4"/><path d="M8 15 l-6 2 l6 2.5 z" fill="#F2A65A" stroke="#D2761F" stroke-width="1"/><path d="M20 22 q5 -3 8 1 q-4 3 -8 0z" fill="#3E8794"/><circle cx="12" cy="15" r="1.4" fill="#2B2B2B"/>',
    friend: '<circle cx="18" cy="22" r="10" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.5"/><circle cx="11" cy="13" r="3.5" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.2"/><circle cx="25" cy="13" r="3.5" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.2"/><circle cx="15" cy="21" r="1.4" fill="#2B2B2B"/><circle cx="21" cy="21" r="1.4" fill="#2B2B2B"/><path d="M15 26 q3 2 6 0" stroke="#7A5A2A" stroke-width="1.3" fill="none"/>',
    tree: '<rect x="16" y="20" width="5" height="14" rx="1" fill="#8B5E3C"/><circle cx="18.5" cy="14" r="11" fill="#6FA886" stroke="#4E8A5C" stroke-width="1.5"/>',
    mitten: '<path d="M16 24 v-7 a6 6 0 0 1 12 0 v7 z" fill="#E05C4B" stroke="#A83A2C" stroke-width="1.5"/><path d="M16 16 a4.5 4.5 0 0 0 -5 4.3 a3.6 3.6 0 0 0 5 3.2 z" fill="#E05C4B" stroke="#A83A2C" stroke-width="1.4"/><rect x="14" y="23.5" width="15" height="6.5" rx="2.5" fill="#C94A3A" stroke="#A83A2C" stroke-width="1.3"/><g stroke="#A83A2C" stroke-width=".9" opacity=".8"><line x1="18" y1="24.5" x2="18" y2="29"/><line x1="21.5" y1="24.5" x2="21.5" y2="29"/><line x1="25" y1="24.5" x2="25" y2="29"/></g>',
    carrot: '<path d="M18 33 l-6 -17 a6 6 0 0 1 12 0 z" fill="#F2784B" stroke="#C2410C" stroke-width="1.3"/><path d="M18 16 l-3 -6 M18 16 l0 -7 M18 16 l3 -6" stroke="#4E8A5C" stroke-width="2" stroke-linecap="round"/>',
    snow: '<path d="M1 27 q17 -8 34 0 v9 h-34z" fill="#EAF2F7" stroke="#CBD9E2" stroke-width="1"/><g fill="#fff" stroke="#AEC2CE" stroke-width=".7"><circle cx="8" cy="9" r="2.6"/><circle cx="19" cy="6" r="2.6"/><circle cx="29" cy="11" r="2.6"/><circle cx="13" cy="17" r="2.4"/><circle cx="26" cy="20" r="2.4"/></g>',
    sun: '<g stroke="#F2C14E" stroke-width="2" stroke-linecap="round"><line x1="18" y1="3" x2="18" y2="8"/><line x1="18" y1="28" x2="18" y2="33"/><line x1="3" y1="18" x2="8" y2="18"/><line x1="28" y1="18" x2="33" y2="18"/><line x1="7" y1="7" x2="11" y2="11"/><line x1="25" y1="25" x2="29" y2="29"/><line x1="29" y1="7" x2="25" y2="11"/><line x1="11" y1="25" x2="7" y2="29"/></g><circle cx="18" cy="18" r="8" fill="#F2C14E"/>',
    rain: '<g fill="#9FB0B8"><circle cx="13" cy="15" r="7"/><circle cx="23" cy="15" r="8"/><circle cx="18" cy="11" r="7"/></g><rect x="10" y="14" width="18" height="6" fill="#9FB0B8"/><g stroke="#5BA3B0" stroke-width="2" stroke-linecap="round"><line x1="12" y1="24" x2="10" y2="30"/><line x1="19" y1="24" x2="17" y2="31"/><line x1="26" y1="24" x2="24" y2="30"/></g>',
    umbrella: '<path d="M5 20 a13 13 0 0 1 26 0 z" fill="#F2784B" stroke="#C2410C" stroke-width="1.3"/><path d="M5 20 q3.5 4 6.5 0 q3.5 4 6.5 0 q3.5 4 6.5 0 q3.5 4 6.5 0" fill="none" stroke="#C2410C" stroke-width="1"/><line x1="18" y1="20" x2="18" y2="32" stroke="#8B5E3C" stroke-width="1.8"/><path d="M18 32 a3 3 0 0 0 4 0" fill="none" stroke="#8B5E3C" stroke-width="1.8"/>',
    basket: '<path d="M9 18 a9 7 0 0 1 18 0" fill="none" stroke="#8B5E3C" stroke-width="1.8"/><path d="M8 20 h20 l-2 12 h-16 z" fill="#C58A4E" stroke="#8B5E3C" stroke-width="1.3"/><rect x="6.5" y="18.5" width="23" height="3.5" rx="1.5" fill="#A8763E"/><g stroke="#9A6A36" stroke-width="1"><line x1="13" y1="22.5" x2="12.5" y2="31"/><line x1="18" y1="22.5" x2="18" y2="31"/><line x1="23" y1="22.5" x2="23.5" y2="31"/><line x1="9.5" y1="26" x2="26.5" y2="26"/></g>',
    /* --- the 4 new glyphs (growth + lifecycle) --- */
    seed: '<path d="M2 28 q16 -7 32 0 v7 h-32z" fill="#A8763E" stroke="#8B5E3C" stroke-width="1.2"/><ellipse cx="18" cy="24" rx="5" ry="7" fill="#C58A4E" stroke="#8B5E3C" stroke-width="1.4" transform="rotate(18 18 24)"/><path d="M18 19 q1.5 -3 4 -4" stroke="#8B5E3C" stroke-width="1.2" fill="none"/>',
    sprout: '<path d="M2 29 q16 -6 32 0 v6 h-32z" fill="#A8763E" stroke="#8B5E3C" stroke-width="1.2"/><path d="M18 29 v-12" stroke="#4E8A5C" stroke-width="2.2" stroke-linecap="round"/><path d="M18 18 q-8 -2 -9 -9 q8 0 9 9z" fill="#6FA886" stroke="#4E8A5C" stroke-width="1.3"/><path d="M18 21 q8 -2 9 -9 q-8 0 -9 9z" fill="#6FA886" stroke="#4E8A5C" stroke-width="1.3"/>',
    butterflyEgg: '<path d="M6 26 q2 -14 24 -16 q2 16 -12 20 q-8 2 -12 -4z" fill="#6FA886" stroke="#4E8A5C" stroke-width="1.4"/><path d="M12 25 q8 -6 16 -13" stroke="#4E8A5C" stroke-width="1" fill="none"/><ellipse cx="21" cy="17" rx="4.5" ry="5.5" fill="#FDF7EC" stroke="#C9BDB0" stroke-width="1.4"/><path d="M18 15 q3 -2 6 0" stroke="#E3D9C8" stroke-width="1" fill="none"/>',
    cocoon: '<path d="M4 8 q14 2 28 -2" stroke="#8B5E3C" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M18 8 v3" stroke="#8B5E3C" stroke-width="1.6"/><path d="M18 11 q-6 3 -5 12 q1 8 5 10 q4 -2 5 -10 q1 -9 -5 -12z" fill="#C5B08A" stroke="#8B7A5E" stroke-width="1.4"/><path d="M14 18 q4 2 8 0 M14 24 q4 2 8 0" stroke="#8B7A5E" stroke-width="1" fill="none"/>'
  }
};

/* per-tool styling: STAGE ONLY + the sanctioned body class */
(function injectCSS() {
  var css = ''
  + 'body.stl-wide .lcs-app{max-width:min(1080px,96vw);}'
  + 'body.stl-wide #lcs-root{height:100%;min-height:0;}'
  + '@media (max-width:560px){body.stl-wide{overflow-y:auto;}body.stl-wide #lcs-root{height:auto;}}'
  + '@media (max-width:480px){body.stl-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}}'
  + '.stl-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.2vmin,12px);width:100%;height:100%;min-height:0;}'

  /* line zone */
  + '.stl-linezone{width:100%;display:flex;justify-content:center;flex-shrink:0;}'
  + '.stl-line{position:relative;width:100%;max-width:940px;}'
  + '.stl-rope{position:absolute;top:0;left:0;width:100%;height:64px;}'

  /* slots hang on the rope sag */
  + '.stl-slot{position:absolute;border:2px dashed rgba(20,107,94,.3);border-radius:14px;'
  +   'background:rgba(251,246,238,.6);}'
  + '.stl-slot.filled{border-color:transparent;background:transparent;}'
  + '.stl-slot.hot{border-color:#F2784B;border-style:solid;background:rgba(242,120,75,.08);'
  +   'transform:scale(1.03);transition:all .14s var(--lcs-ease);}'
  + '.stl-notch{position:absolute;top:-4px;left:50%;margin-left:-5px;width:10px;height:14px;'
  +   'border-radius:4px;background:rgba(139,111,71,.35);}'
  + '.stl-pin{position:absolute;top:-22px;left:50%;margin-left:-14px;width:28px;height:44px;z-index:4;'
  +   'transition:opacity .12s;animation:stlPinSnap .16s cubic-bezier(.34,1.56,.64,1);}'
  + '@keyframes stlPinSnap{0%{transform:scale(1.25) rotate(-14deg);}100%{transform:scale(1) rotate(-2deg);}}'
  + '.stl-slot.filled .stl-card{animation:stlSwing .9s ease-out;transform-origin:50% -12px;}'
  + '@keyframes stlSwing{0%{transform:rotate(6deg);}38%{transform:rotate(-3.5deg);}68%{transform:rotate(1.5deg);}100%{transform:rotate(0);}}'

  /* cards */
  + '.stl-card{position:relative;display:flex;flex-direction:column;background:#FFFEFB;border:none;'
  +   'border-radius:14px;cursor:grab;padding:0;overflow:hidden;'
  +   'box-shadow:0 1px 3px rgba(20,30,28,.08),0 6px 16px rgba(20,30,28,.09);}'
  + '.stl-card.on-line{width:100%;height:100%;}'
  + '.stl-card.in-tray{width:116px;height:148px;flex:none;transform:rotate(var(--stl-jit,0deg));}'
  + '.stl-card.dragging{opacity:.35;}'
  + '.stl-card.speaking{box-shadow:0 1px 3px rgba(20,30,28,.08),0 6px 16px rgba(20,30,28,.09),'
  +   '0 0 0 3px var(--lcs-structure),0 0 22px 6px rgba(242,120,75,.28);}'
  + '.stl-art{flex:1;min-height:0;display:grid;place-items:center;padding:7% 7% 2%;}'
  + '.stl-art img{max-width:88%;max-height:92%;object-fit:contain;}'
  + '.stl-glyph{width:76%;height:auto;max-height:92%;}'
  + '.stl-cap{flex:none;display:flex;align-items:center;justify-content:center;padding:2px 8px 8px;'
  +   'font-family:var(--lcs-font-display);font-weight:700;color:#2B2622;text-align:center;'
  +   'line-height:1.15;font-size:clamp(12px,1.9vmin,18px);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;max-height:2.4em;}'
  + '.stl-card.in-tray .stl-cap{font-size:11.5px;}'
  + '.stl-slot.no-cap .stl-cap{display:none;}'
  + '.stl-fly{position:fixed;z-index:1000;pointer-events:none;opacity:1;'
  +   'box-shadow:0 4px 10px rgba(20,30,28,.10),0 22px 40px rgba(20,30,28,.18);'
  +   'transform:scale(1.06) rotate(-2deg);}'

  /* sequence chips */
  + '.stl-seq{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:999px;padding:4px 12px;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(11px,1.8vmin,15px);'
  +   'color:#2B2622;white-space:nowrap;transition:background .3s;}'
  + '.stl-seq.empty{opacity:.55;}'
  + '.stl-seq.warm{background:#F2C879;}'

  /* spotlight (never dims the others) */
  + '.stl-card.stl-spot{box-shadow:0 1px 3px rgba(20,30,28,.08),0 6px 16px rgba(20,30,28,.09),'
  +   '0 0 0 4px rgba(242,200,121,.9),0 0 36px 12px rgba(242,200,121,.55);'
  +   'transform:scale(1.05) translateY(3px);z-index:5;'
  +   'transition:box-shadow .45s var(--lcs-ease),transform .45s var(--lcs-ease);}'
  + '.stl-line.all-told .stl-card{box-shadow:0 1px 3px rgba(20,30,28,.08),'
  +   '0 4px 20px rgba(242,200,121,.5),0 0 0 3px rgba(242,200,121,.85);transition:box-shadow .6s var(--lcs-ease);}'
  + '.stl-taphint{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;color:var(--lcs-ink-soft);'
  +   'animation:stlPulse 1.6s ease-in-out infinite;}'
  + '@keyframes stlPulse{0%,100%{opacity:.7;}50%{opacity:1;}}'

  /* tray */
  + '.stl-tray{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;flex-shrink:0;'
  +   'padding:8px 16px 16px;width:100%;min-height:132px;}'
  + '@media (max-width:900px){.stl-card.in-tray{width:104px;height:132px;}}'

  /* dock */
  + '.stl-dock{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;flex-shrink:0;}'
  + '.stl-namechip{font-family:var(--lcs-font-body);font-weight:800;font-size:13px;color:var(--lcs-ink-soft);margin-top:4px;position:relative;z-index:2;}'
  + '.stl-chiprow{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;}'
  + '.stl-chip{display:inline-flex;align-items:center;gap:6px;min-height:46px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:14.5px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);padding:8px 16px;cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.stl-chip:active{transform:scale(.96);}'
  + '.stl-chip.locked{color:var(--lcs-ink-soft);}'
  + '.stl-chip.narr-off{color:var(--lcs-ink-soft);}'
  + '.stl-big{min-width:200px;min-height:52px;padding:10px 28px;border-radius:var(--lcs-radius-pill);'
  +   'border:1.5px solid var(--lcs-structure);cursor:pointer;background:var(--lcs-surface);'
  +   'color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;font-size:16px;'
  +   'box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.stl-big.coral{background:#F2784B;border-color:#F2784B;color:#fff;'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);}'
  + '.stl-big.coral:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.stl-big:disabled{opacity:.5;cursor:default;}'

  /* gate */
  + '.stl-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:520px;margin:4px auto;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.stl-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'
  + '.stl-loading{font-family:var(--lcs-font-body);font-weight:700;color:var(--lcs-ink-soft);padding:24px;text-align:center;}'

  /* library panel */
  + '.stl-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);opacity:0;pointer-events:none;'
  +   'transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.stl-scrim.open{opacity:1;pointer-events:auto;}'
  + '.stl-panel{position:absolute;left:50%;top:5%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(720px,94%);max-height:88%;overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;opacity:0;pointer-events:none;'
  +   'transition:opacity .2s,transform .2s var(--lcs-ease);display:flex;flex-direction:column;}'
  + '.stl-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.stl-panel-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px;'
  +   'border-bottom:1px solid var(--lcs-line);}'
  + '.stl-panel-title{font-family:var(--lcs-font-display);font-weight:700;font-size:17px;color:var(--lcs-ink);}'
  + '.stl-panel-close{width:40px;height:40px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;border:none;}'
  + '.stl-panel-body{padding:12px 16px 16px;display:flex;flex-direction:column;gap:8px;}'
  + '.stl-bandlbl{font-family:var(--lcs-font-body);font-weight:800;font-size:12.5px;text-transform:uppercase;'
  +   'letter-spacing:.08em;color:var(--lcs-ink-soft);margin-top:6px;}'
  + '.stl-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;}'
  + '.stl-tile{position:relative;display:flex;flex-direction:column;gap:5px;padding:8px;cursor:pointer;'
  +   'background:var(--lcs-surface);border:2px solid var(--lcs-line);border-radius:14px;text-align:center;}'
  + '.stl-tile.active{border-color:var(--lcs-structure);}'
  + '.stl-tile.locked{opacity:.62;}'
  + '.stl-lock{position:absolute;top:6px;right:8px;color:var(--lcs-ink-soft);}'
  + '.stl-strip{display:flex;gap:3px;background:#FDF6E8;border-radius:8px;padding:4px;height:56px;}'
  + '.stl-minicard{flex:1;background:#FFFEFB;border-radius:5px;display:grid;place-items:center;overflow:hidden;min-width:0;}'
  + '.stl-minicard img,.stl-minicard svg{max-width:86%;max-height:86%;object-fit:contain;}'
  + '.stl-tilename{font-family:var(--lcs-font-body);font-weight:700;font-size:12px;color:var(--lcs-ink);'
  +   'min-height:2.4em;display:flex;align-items:center;justify-content:center;}'

  /* phone */
  + '@media (max-width:560px){'
  +   '.stl-card.in-tray{width:84px;height:108px;}'
  +   '.stl-card.in-tray .stl-cap{font-size:10px;}'
  +   '.stl-rope rect{display:none;}'
  +   '.stl-tray{gap:8px;min-height:118px;}'
  +   '.stl-seq{font-size:10.5px;padding:3px 9px;}'
  +   '.stl-pin{width:20px;height:32px;margin-left:-10px;top:-16px;}'
  + '}'

  /* short screens (projector 1024×768) */
  + '@media (max-height:960px) and (min-width:768px){.stl-wrap{gap:5px;}.stl-tray{min-height:132px;padding:8px 16px;}}'

  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.stl-slot.filled .stl-card,.stl-pin{animation:none;}'
  +   '.stl-taphint{animation:none;}'
  +   '.stl-card.stl-spot{transform:none;transition:box-shadow .12s;}'
  +   '.stl-slot.hot{transform:none;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
