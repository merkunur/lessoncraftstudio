/* =====================================================================
   TOOL #32 — PATTERN BENCH   (pattern-bench.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v3 catalog, build #3.

   A strip that repeats whatever unit you build. Colour it, shape it,
   picture it, clap it — the SAME pattern in four costumes.

   THE ONE THESIS — A PATTERN IS ITS UNIT, NOT ITS SURFACE. A child who
   can continue red-blue-red-blue has not necessarily seen the pattern;
   they may just be alternating. The child who sees that red-blue-red-blue
   and circle-square-circle-square and clap-stamp-clap-stamp are THE SAME
   PATTERN has. That transfer is the whole of early algebraic thinking,
   and it is what this bench is built to make visible.

   ⚠ THE STRAND IS EMPTY, AND THAT IS NOT AN OVERSIGHT. Repeating patterns
   are taught daily in K-1 across our European markets — Muster fortsetzen,
   patronen voortzetten, fortsätta mönster — but US Common Core barely
   codes them before 4.OA.C.5, so the US-built tool suites skipped them.
   That is exactly why this ground is open: the market followed the US
   standards and our teachers did not. This tool therefore carries NO
   educationalAlignment (readiness class, §22.1) and says so plainly.

   ⚠ WHAT THE CLASS TALKS ABOUT (the gate-5 test): **where the repeating
   part starts and ends** — and it is genuinely arguable, because in
   ABABAB the unit can honestly be read as AB or as BA. The bench lets
   them TEST each claim by rebuilding the strip from it, so the argument
   is settled by the material and not by the adult.

   THREE INVENTIONS:
     1. THE PATTERN IS STORED AS ABSTRACT SLOTS, NEVER AS ITS COSTUME.
        The unit is ['a','b']; colour, shape and picture are RENDERINGS.
        So changing the medium provably cannot change the pattern — the
        gate asserts the letter-sequence of the strip is identical across
        every medium. That is the transfer lesson made structural rather
        than merely encouraged.
     2. THE GAP GOES IN THE MIDDLE. Cover any cell, including an interior
        one. A missing cell at the END can be solved by copying the last
        one; a missing cell in the MIDDLE can only be solved from the
        unit. The covered cell leaves the DOM entirely, so nothing leaks.
     3. HIDE THE UNIT. The teacher can put the unit builder away and leave
        only the strip, which turns "continue it" into "what is the part
        that repeats?" — the harder and far more valuable question.

   FENCES — activity fence checked BEFORE a line was written (the
   discipline that three earlier deaths bought):
     shapeforge.compose        1.G.A.2 "Compose Shapes from Pattern
     (1 activity)              Blocks" — PATTERN BLOCKS are a geometry
                               manipulative (trapezoids into a hexagon).
                               Nothing to do with a repeating sequence.
     star-stitcher.connect-    K.CC.A.2 — the COUNTING sequence, joining
     sequence                  numerals in order. Not a repeating unit.
     choice-board.next-number  K.CC.A.2 — what number comes next. Number
                               order, not pattern structure.
   Zero repeating-pattern activities, zero pattern CCSS codes, and zero
   cores anywhere mention a repeating or growing pattern.

   REFUSES, FOREVER: no score, no streak, no timer · no tick and no cross —
   the strip never marks a guess, it only repeats the unit it was given ·
   no "what comes next?" quiz with a right answer, because the interesting
   question is what the UNIT is, not what the next bead is · the covered
   cell is never revealed by the tool, only by the teacher · no
   celebration when a pattern is completed, because completing it is not
   the achievement — naming it is.
   ===================================================================== */
var PatternBench = {
  id: 'pattern-bench',

  /* ⚠ CURATION: en authored; the other ten are added by the locale pass
     and corrected by the per-locale native 3-agent ensembles (§A.13.48).
     [NSR-FLAG] sv/da/no/fi. pt Brazilian per §6. */
  strings: {
    title:          { en: "Pattern Bench", de: "Musterwerkstatt", fr: "L’atelier des motifs", es: "Mesa de patrones", pt: "Mesa de padrões", it: "Il banco dei ritmi", nl: "Patroonwerkplaats", sv: "Mönsterverkstaden", da: "Mønsterbænken", no: "Mønsterbenken", fi: "Kuviopaja" },
    instruction:    { en: "Build the part that repeats. The strip carries it on. Then show the same pattern a different way.", de: "Baut den Baustein, der sich wiederholt. Das Band setzt ihn fort. Zeigt dann dasselbe Muster auf eine andere Art.", fr: "Construisez le motif qui se répète. La bande le continue toute seule. Puis montrez la même suite d’une autre façon.", es: "Armen la parte que se repite. La tira la continúa sola. Después, muestren el mismo patrón de otra manera.", pt: "Montem a parte que se repete. A tira continua sozinha. Depois, mostrem o mesmo padrão de outro jeito.", it: "Costruite la parte che si ripete. La striscia va avanti da sola. Poi mostrate lo stesso ritmo in un altro modo.", nl: "Bouw de kern van het patroon. De strook zet hem voort. Laat daarna hetzelfde patroon op een andere manier zien.", sv: "Bygg mönsterdelen. Remsan fortsätter den. Visa sedan samma mönster på ett annat sätt.", da: "Byg den del, der gentager sig. Striben fører den videre. Vis så det samme mønster på en ny måde.", no: "Bygg delen som gjentar seg. Stripen fører den videre. Vis så det samme mønsteret på en ny måte.", fi: "Rakenna osa, joka toistuu. Jono jatkaa sitä eteenpäin. Näytä sitten sama kuvio toisella tavalla." },
    unitLabel:      { en: "The part that repeats", de: "Der Baustein", fr: "Le motif qui se répète", es: "La parte que se repite", pt: "A parte que se repete", it: "La parte che si ripete", nl: "De kern van het patroon", sv: "Mönsterdelen", da: "Den del, der gentager sig", no: "Delen som gjentar seg", fi: "Osa, joka toistuu" },
    stripLabel:     { en: "The strip", de: "Das Band", fr: "La bande", es: "La tira", pt: "A tira", it: "La striscia", nl: "De strook", sv: "Remsan", da: "Striben", no: "Stripen", fi: "Jono" },
    mColour:        { en: "Colours", de: "Farben", fr: "Couleurs", es: "Colores", pt: "Cores", it: "Colori", nl: "Kleuren", sv: "Färger", da: "Farver", no: "Farger", fi: "Värit" },
    mShape:         { en: "Shapes", de: "Formen", fr: "Formes", es: "Formas", pt: "Formas", it: "Forme", nl: "Vormen", sv: "Former", da: "Former", no: "Former", fi: "Muodot" },
    mPicture:       { en: "Pictures", de: "Bilder", fr: "Images", es: "Imágenes", pt: "Imagens", it: "Immagini", nl: "Plaatjes", sv: "Bilder", da: "Billeder", no: "Bilder", fi: "Kuvat" },
    clapIt:         { en: "Clap it", de: "Klatschen", fr: "Taper le rythme", es: "Aplaudir", pt: "Bater palmas", it: "Batti il ritmo", nl: "Klappen", sv: "Klappa", da: "Klap med", no: "Klapp med", fi: "Taputa mukana" },
    sameAgain:      { en: "Same pattern, new costume", de: "Dasselbe Muster, nur anders angezogen.", fr: "La même suite, habillée autrement.", es: "El mismo patrón, con otro disfraz.", pt: "O mesmo padrão, com outra roupa.", it: "Lo stesso ritmo, un altro vestito.", nl: "Hetzelfde patroon, in een nieuw jasje.", sv: "Samma mönster – bara nya kläder.", da: "Samme mønster i nyt tøj", no: "Samme mønster i nye klær", fi: "Sama kuvio, uusi asu" },
    showLetters:    { en: "Say it in letters", de: "Mit Buchstaben sagen", fr: "Dire la suite en lettres", es: "Decirlo con letras", pt: "Dizer com letras", it: "Dirlo con le lettere", nl: "Zeg het in letters", sv: "Säg det med bokstäver", da: "Sig det med bogstaver", no: "Si det med bokstaver", fi: "Sano se kirjaimin" },
    hideUnit:       { en: "Hide it", de: "Verstecken", fr: "Cacher", es: "Esconder", pt: "Esconder", it: "Nascondi", nl: "Verstoppen", sv: "Göm den", da: "Skjul den", no: "Skjul den", fi: "Piilota" },
    showUnit:       { en: "Show it", de: "Zeigen", fr: "Montrer", es: "Mostrar", pt: "Mostrar", it: "Mostra", nl: "Laten zien", sv: "Visa den", da: "Vis den", no: "Vis den", fi: "Näytä" },
    hiddenUnitNote: { en: "What is the part that repeats?", de: "Welcher Baustein wiederholt sich?", fr: "Quel est le motif qui se répète ?", es: "¿Cuál es la parte que se repite?", pt: "Qual é a parte que se repete?", it: "Qual è la parte che si ripete?", nl: "Wat is de kern van het patroon?", sv: "Hur ser mönsterdelen ut?", da: "Hvad er det, der gentager sig?", no: "Hva er det som gjentar seg?", fi: "Mikä osa toistuu?" },
    coverNote:      { en: "Tap a bead to cover it — try one in the middle.", de: "Tippt auf eine Perle, um sie zuzudecken — am besten eine in der Mitte.", fr: "Touchez une perle pour la cacher — essayez-en une au milieu.", es: "Toquen una ficha para taparla — prueben con una de en medio.", pt: "Toquem em uma ficha para cobrir — experimentem uma do meio.", it: "Toccate una perlina per coprirla — provatene una in mezzo.", nl: "Tik op een kraal om hem af te dekken — probeer er een in het midden.", sv: "Tryck på en pärla för att täcka den — pröva en i mitten.", da: "Tryk på en perle for at dække den — prøv en inde i midten.", no: "Trykk på en perle for å dekke den — prøv en i midten.", fi: "Napauta helmeä, niin se peittyy — kokeile keskeltä." },
    unitLen:        { en: "How long is it?", de: "Wie lang ist er?", fr: "Combien de perles ?", es: "¿De cuántas fichas?", pt: "De quantas fichas?", it: "Di quante perline?", nl: "Hoe lang is hij?", sv: "Hur lång är den?", da: "Hvor lang er den?", no: "Hvor lang er den?", fi: "Kuinka pitkä osa on?" },
    longerStrip:    { en: "A longer strip", de: "Längeres Band", fr: "Rallonger", es: "Tira más larga", pt: "Tira mais longa", it: "Più lunga", nl: "Langere strook", sv: "Längre remsa", da: "Længere stribe", no: "Lengre stripe", fi: "Pidempi jono" },
    gatePicture:    { en: "The picture costume is part of the Teacher plan.", de: "Die Bilder gehören zum Lehrer-Paket.", fr: "Le costume Images fait partie de l’offre Enseignant.", es: "El disfraz de Imágenes es parte del plan Docente.", pt: "A roupa de Imagens faz parte do plano Professor.", it: "Il vestito Immagini fa parte del piano Insegnante.", nl: "De plaatjes horen bij het Leerkracht-pakket.", sv: "Bilderna ingår i Lärarpaketet.", da: "Billederne er en del af Lærerpakken.", no: "Bildene er en del av Lærerpakken.", fi: "Kuvat kuuluvat Opettaja-tilaukseen." },
    gatePrint:      { en: "Printing is part of the Teacher plan.", de: "Das Drucken gehört zum Lehrer-Paket.", fr: "L’impression fait partie de l’offre Enseignant.", es: "La impresión es parte del plan Docente.", pt: "A impressão faz parte do plano Professor.", it: "La stampa fa parte del piano Insegnante.", nl: "Afdrukken hoort bij het Leerkracht-pakket.", sv: "Utskrift ingår i Lärarpaketet.", da: "Udskrivning er en del af Lærerpakken.", no: "Utskrift er en del av Lærerpakken.", fi: "Tulostus kuuluu Opettaja-tilaukseen." },
    printBtn:       { en: "Print the strip", de: "Das Band drucken", fr: "Imprimer la bande", es: "Imprimir la tira", pt: "Imprimir a tira", it: "Stampa la striscia", nl: "De strook printen", sv: "Skriv ut remsan", da: "Print striben", no: "Skriv ut stripen", fi: "Tulosta jono" },
    unlock:         { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Vedi il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerpakken", no: "Se Lærerpakken", fi: "Katso Opettaja-tilaus" },
    privacyLine:    { en: "Nothing here is saved, counted or sent anywhere.", de: "Hier wird nichts gespeichert, gezählt oder weitergegeben.", fr: "Rien ici n’est enregistré, compté ni envoyé où que ce soit.", es: "Aquí no se guarda, no se cuenta ni se envía nada.", pt: "Aqui nada é guardado, contado nem enviado para lugar nenhum.", it: "Qui non si salva, non si conta e non si invia nulla.", nl: "Hier wordt niets bewaard, geteld of doorgestuurd.", sv: "Ingenting här sparas, räknas eller skickas vidare.", da: "Intet gemmes, tælles eller sendes nogen steder hen.", no: "Ingenting lagres, telles eller sendes noe sted.", fi: "Mitään ei tallenneta, lasketa eikä lähetetä minnekään." },
    setSound:       { en: "Play a sound for each bead", de: "Für jede Perle einen Ton spielen", fr: "Jouer un son pour chaque perle", es: "Tocar un sonido en cada ficha", pt: "Tocar um som em cada ficha", it: "Suona una nota per ogni perlina", nl: "Bij elke kraal een toon spelen", sv: "Spela en ton för varje pärla", da: "Spil en lyd for hver perle", no: "Spill en lyd for hver perle", fi: "Soita ääni jokaiselle helmelle" },
    clear:          { en: "Start again", de: "Neu anfangen", fr: "Recommencer", es: "Empezar de nuevo", pt: "Começar de novo", it: "Ricomincia", nl: "Opnieuw beginnen", sv: "Börja om", da: "Start forfra", no: "Start på nytt", fi: "Aloita alusta" }
  },

  STORE_KEY: 'lcs:pattern-bench:v1',
  ENT_TRUST_DAYS: 14,

  defaults: { sound: true, letters: false },
  settings: [
    { key: 'sound', type: 'toggle', labelKey: 'setSound' },
    { key: 'letters', type: 'toggle', labelKey: 'showLetters' }
  ],

  premium: false,
  premiumKnown: false,

  /* =================================================================
     THE MODEL — abstract slots only. This is invention #1 and it is
     structural: the pattern is a letter sequence; a medium is a way of
     DRAWING a letter. Nothing about colour, shape or picture can reach
     the pattern, so switching costume provably preserves it.
     ================================================================= */
  SLOTS: ['a', 'b', 'c', 'd'],
  MEDIA: ['colour', 'shape', 'picture'],

  COLOUR: { a: '#D6453C', b: '#2F6FB5', c: '#E2A72E', d: '#3F8F5E' },
  SHAPE:  { a: 'circle', b: 'square', c: 'triangle', d: 'hexagon' },
  /* four picture nouns from one theme, so the costume reads as a set */
  PICTURE: { a: 'apple', b: 'banana', c: 'cherry', d: 'lemon' },
  PICTURE_DIR: 'fruits',
  TONE:   { a: 392, b: 523, c: 659, d: 784 },

  newState: function () {
    return { unit: ['a', 'b'], len: 12, covered: [], medium: 'colour', unitHidden: false };
  },

  /* ⚠ PURE and total: cell i of the strip is unit[i mod unitLength].
     An empty unit yields no strip rather than a crash. */
  cellAt: function (st, i) {
    if (!st || !st.unit || !st.unit.length) return null;
    if (i < 0 || i >= st.len) return null;
    return st.unit[i % st.unit.length];
  },

  /* the whole strip as a letter sequence — the pattern, costume-free */
  sequence: function (st) {
    var out = [], i;
    for (i = 0; i < (st ? st.len : 0); i++) out.push(this.cellAt(st, i));
    return out;
  },

  isCovered: function (st, i) { return !!st && st.covered.indexOf(i) > -1; },

  /* immutable */
  setUnitSlot: function (st, i, slot) {
    var next = this._clone(st);
    if (i < 0 || i >= next.unit.length) return next;
    if (this.SLOTS.indexOf(slot) === -1) return next;
    next.unit[i] = slot;
    return next;
  },
  /* ⚠ CLAMP, do not reject. A rejecting guard invites a future edit to
     loosen it, and `while (unit.length > n)` with a negative n pops an
     empty array forever. Clamping first makes that shape unreachable. */
  UNIT_MIN: 2,
  UNIT_MAX: 4,
  setUnitLength: function (st, n) {
    var next = this._clone(st), i;
    var v = Math.round(Number(n) || 0);
    if (!(v >= this.UNIT_MIN)) v = this.UNIT_MIN;
    if (v > this.UNIT_MAX) v = this.UNIT_MAX;
    /* slice, never `while (length > v) pop()` — with a negative v that loop
       pops an empty array forever, and a build gate that HANGS reports
       nothing at all. Bounded by construction instead. */
    next.unit = next.unit.slice(0, Math.max(0, v));
    for (i = next.unit.length; i < v; i++) next.unit.push(this.SLOTS[i]);
    return next;
  },
  toggleCover: function (st, i) {
    var next = this._clone(st);
    if (i < 0 || i >= next.len) return next;
    var at = next.covered.indexOf(i);
    if (at > -1) next.covered.splice(at, 1); else next.covered.push(i);
    return next;
  },
  /* the strip grows so the pattern has more to say; clamped so it can
     never collapse below one and a bit repeats of a 4-unit */
  LEN_MIN: 12,
  LEN_MAX: 24,
  LEN_STEP: 4,
  setLen: function (st, n) {
    var next = this._clone(st);
    var v = Math.round(Number(n) || 0);
    if (!(v >= this.LEN_MIN)) v = this.LEN_MIN;
    if (v > this.LEN_MAX) v = this.LEN_MAX;
    next.len = v;
    /* a bead that no longer exists cannot stay covered */
    next.covered = next.covered.filter(function (i) { return i < v; });
    return next;
  },

  setMedium: function (st, m) {
    var next = this._clone(st);
    if (this.MEDIA.indexOf(m) === -1) return next;
    next.medium = m;
    return next;
  },
  _clone: function (st) {
    return { unit: st.unit.slice(), len: st.len, covered: st.covered.slice(),
      medium: st.medium, unitHidden: st.unitHidden };
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectPatternBenchCSS();
    document.body.classList.add('ptn-wide');

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this.st = this.newState();
    this._timers = [];
    this._fetchEntitlement();
    this.render();
  },

  reset: function () { this.st = this.newState(); this.render(); },
  onSettings: function () { this._store.settings = this.api.settings; this._saveStore(); this.render(); },

  _loadStore: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
    if (!s || typeof s !== 'object') s = {};
    if (!s.v) s.v = 1;
    return s;
  },
  _saveStore: function () { try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {} },

  _fetchEntitlement: function () {
    var self = this, token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        self.premium = (age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false;
      } else self.premium = false;
      self.premiumKnown = true;
      if (self._wrap) self.render();
    };
    /* repaint like the branches around it — see class-graph for the note */
    if (!token) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
        var tier = j.user && j.user.subscriptionTier, sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        if (self._wrap) self.render();
      })
      .catch(trustCache);
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },
  _clearTimers: function () { this._timers.forEach(clearTimeout); this._timers = []; },

  /* ⚠ THE FOURTH COSTUME. Clapping the strip is not decoration — hearing
     ABAB after seeing it is the transfer this tool exists for. A covered
     bead is SILENT, so the sound cannot leak what the cloth hides. */
  clapIt: function () {
    var self = this, seq = this.sequence(this.st);
    this._clearTimers();
    seq.forEach(function (slot, i) {
      self._after(i * 340, function () {
        var cell = self._wrap && self._wrap.querySelector('.ptn-cell[data-i="' + i + '"]');
        if (cell) { cell.classList.add('ptn-lit'); self._after(300, function () { cell.classList.remove('ptn-lit'); }); }
        if (self.isCovered(self.st, i)) return;
        if (!self.api.settings.sound) return;
        try { self.api.sound(self.TONE[slot] || 440); } catch (_) {}
      });
    });
  },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    /* ⚠ if we learn the account is free while the premium costume is on,
       take it off. Locking the chip is not enough — the STRIP is what the
       class is looking at. */
    if (this.premiumKnown && !this.premium && this.st && this.st.medium === 'picture') {
      this.st = this.setMedium(this.st, 'colour');
    }
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ptn-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildBar());
    if (this._transfer) {
      var tr = api.el('div', 'ptn-transfer');
      tr.textContent = api.t('sameAgain');
      wrap.appendChild(tr);
      this._transfer = false;
    }
    /* ⚠ ONE TRACK. The strip and the letter row must share a single
       scrolling grid: as two independent wrapping rows they wrapped at
       different points and letter i stopped sitting under bead i, which
       is the entire reason the letter row exists. */
    var track = api.el('div', 'ptn-track');
    track.setAttribute('role', 'group');
    track.setAttribute('aria-label', api.t('stripLabel'));
    track.style.setProperty('--ptn-n', String(this.st.len));
    track.appendChild(this._buildStrip());
    if (api.settings.letters) track.appendChild(this._buildLetters());
    wrap.appendChild(track);
    var hint = api.el('div', 'ptn-hint');
    hint.textContent = api.t('coverNote');
    wrap.appendChild(hint);
    wrap.appendChild(this._buildUnit());
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
  },

  _chip: function (label, on, fn, extra) {
    var b = this.api.el('button', 'ptn-chip' + (on ? ' ptn-on' : '') + (extra ? ' ' + extra : ''));
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  },

  _buildBar: function () {
    var api = this.api, self = this;
    var bar = api.el('div', 'ptn-bar');
    var LAB = { colour: 'mColour', shape: 'mShape', picture: 'mPicture' };
    this.MEDIA.forEach(function (m) {
      /* ⚠ NO `&& premiumKnown`. With it, the unknown state read as UNLOCKED,
         so during the auth fetch a free account could switch to the premium
         picture costume — and when the answer came back free the chip locked
         but st.medium stayed 'picture', so the strip kept drawing premium
         beads forever. Unknown must be pessimistic, as it is in
         sorting-hoops and number-balance. */
      var locked = (m === 'picture' && !self.premium);
      bar.appendChild(self._chip(api.t(LAB[m]), self.st.medium === m, function () {
        if (locked) { self._gateInline(bar, 'gatePicture'); return; }
        /* ⚠ THE TRANSFER LINE. The whole thesis of this tool is that the
           pattern survived the costume change. Saying so at the moment it
           happens is what turns a colour swap into a maths idea. It is a
           statement about the STRIP, never about the child. */
        var was = self.st.medium;
        self.st = self.setMedium(self.st, m);
        self._transfer = (was !== m);
        self.render();
      }, locked ? 'ptn-locked' : ''));
    });
    var sep = api.el('span', 'ptn-sep');
    bar.appendChild(sep);
    bar.appendChild(this._chip(api.t('clapIt'), false, function () { self.clapIt(); }));
    if (this.st.len < this.LEN_MAX) {
      bar.appendChild(this._chip(api.t('longerStrip'), false, function () {
        self.st = self.setLen(self.st, self.st.len + self.LEN_STEP);
        self.render();
      }));
    }
    return bar;
  },

  _buildStrip: function () {
    var api = this.api, self = this;
    var strip = api.el('div', 'ptn-strip');
    var i;
    for (i = 0; i < this.st.len; i++) {
      (function (idx) {
        var slot = self.cellAt(self.st, idx);
        var cell = api.el('button', 'ptn-cell');
        cell.type = 'button';
        cell.setAttribute('data-i', String(idx));
        /* ⚠ A COVERED BEAD LEAVES THE DOM. Not hidden with CSS, not
           dimmed — the cloth must not be readable by anyone. */
        if (self.isCovered(self.st, idx)) {
          cell.classList.add('ptn-covered');
          cell.setAttribute('aria-label', api.t('coverNote'));
        } else {
          cell.appendChild(self._bead(slot));
          cell.setAttribute('aria-label', String(slot).toUpperCase());
        }
        cell.addEventListener('click', function () {
          self.st = self.toggleCover(self.st, idx);
          self.render();
        });
        strip.appendChild(cell);
      }(i));
    }
    return strip;
  },

  /* the costume — and it is only ever a drawing of a letter */
  _bead: function (slot) {
    var api = this.api;
    if (this.st.medium === 'picture') {
      var img = document.createElement('img');
      img.className = 'ptn-pic';
      img.src = '/image-library-webp/themes/' + this.PICTURE_DIR + '/' + this.PICTURE[slot] + '@2x.webp';
      img.alt = '';
      img.loading = 'lazy';
      return img;
    }
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ptn-glyph');
    svg.setAttribute('viewBox', '0 0 40 40');
    svg.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (this.st.medium === 'colour') {
      p.setAttribute('d', 'M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30z');
      p.setAttribute('fill', this.COLOUR[slot]);
    } else {
      var d = {
        circle:   'M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30z',
        square:   'M6 6h28v28H6z',
        triangle: 'M20 4 36 35H4z',
        hexagon:  'M20 3 34 12v16L20 37 6 28V12z'
      }[this.SHAPE[slot]];
      p.setAttribute('d', d);
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', '#146B5E');
      p.setAttribute('stroke-width', '2.6');
      p.setAttribute('stroke-linejoin', 'round');
    }
    svg.appendChild(p);
    void api;
    return svg;
  },

  /* the pattern written out — a DESCRIPTION of the strip, like the
     notation on Number Balance, never a mark on anybody's work */
  _buildLetters: function () {
    var api = this.api, self = this;
    var row = api.el('div', 'ptn-letters');
    this.sequence(this.st).forEach(function (slot, i) {
      var s = api.el('span', 'ptn-letter');
      s.textContent = self.isCovered(self.st, i) ? '·' : String(slot).toUpperCase();
      row.appendChild(s);
    });
    return row;
  },

  _buildUnit: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'ptn-unitbox');
    var toggle = this._chip(api.t(this.st.unitHidden ? 'showUnit' : 'hideUnit'), this.st.unitHidden, function () {
      self.st.unitHidden = !self.st.unitHidden;
      self.render();
    });
    if (this.st.unitHidden) {
      var n = api.el('div', 'ptn-note');
      n.textContent = api.t('hiddenUnitNote');
      box.append(n, toggle);
      return box;
    }
    var head = api.el('div', 'ptn-unithead');
    var lab = api.el('div', 'ptn-lab');
    lab.textContent = api.t('unitLabel');
    head.append(lab, toggle);
    box.appendChild(head);
    var row = api.el('div', 'ptn-unit');
    this.st.unit.forEach(function (slot, i) {
      var b = api.el('button', 'ptn-slot');
      b.type = 'button';
      b.setAttribute('data-slot-i', String(i));
      b.appendChild(self._bead(slot));
      b.setAttribute('aria-label', String(slot).toUpperCase());
      /* tap cycles the slot through a b c d — the child's only move */
      b.addEventListener('click', function () {
        var at = self.SLOTS.indexOf(slot);
        var next = self.SLOTS[(at + 1) % self.SLOTS.length];
        self.st = self.setUnitSlot(self.st, i, next);
        self.render();
        if (self.api.settings.sound) { try { self.api.sound(self.TONE[next] || 440); } catch (_) {} }
      });
      row.appendChild(b);
    });
    box.appendChild(row);

    var lens = api.el('div', 'ptn-lens');
    var ll = api.el('span', 'ptn-lab');
    ll.textContent = api.t('unitLen');
    lens.appendChild(ll);
    [2, 3, 4].forEach(function (n) {
      lens.appendChild(self._chip(String(n), self.st.unit.length === n, function () {
        self.st = self.setUnitLength(self.st, n);
        self.render();
      }));
    });
    box.appendChild(lens);
    return box;
  },

  _buildFoot: function () {
    var api = this.api, self = this;
    var foot = api.el('div', 'ptn-foot');
    foot.appendChild(this._chip(api.t('clear'), false, function () { self.reset(); }));
    var pr = this._chip(api.t('printBtn'), false, function () {
      if (!self.premium) { self._gateInline(foot, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    }, this.premium ? '' : 'ptn-locked');
    foot.appendChild(pr);
    var pv = api.el('div', 'ptn-privacy');
    pv.textContent = api.t('privacyLine');
    foot.appendChild(pv);
    return foot;
  },

  _gateInline: function (host, key) {
    var api = this.api;
    if (!host || !this._wrap) return;
    var old = this._wrap.querySelector('.ptn-gate');
    if (old) old.remove();
    var g = api.el('div', 'ptn-gate');
    var s = api.el('span');
    s.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-pattern-bench';
    a.target = '_top'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(s, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  }
};

function injectPatternBenchCSS() {
  if (document.getElementById('ptn-style')) return;
  var st = document.createElement('style');
  st.id = 'ptn-style';
  st.textContent = ''
    + '.ptn-wrap{display:flex;flex-direction:column;align-items:center;gap:11px;width:100%;}'
    + '.ptn-bar{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;align-items:center;}'
    + '.ptn-transfer{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:16px;color:#3C7C72;'
    +   'background:rgba(20,107,94,.08);border-radius:999px;padding:5px 15px;}'
    + '.ptn-unithead{display:flex;flex-wrap:wrap;gap:9px;align-items:center;justify-content:center;}'
    /* a 320px phone: tighter chrome so the whole bench still rests on one screen */
    /* the divider only groups when the bar is one row; once it wraps it is
       a stray mark hanging off the end of a line */
    + '@media (max-width:420px){.ptn-chip{padding:8px 11px;font-size:14px;}'
    +   '.ptn-bar{gap:6px;}.ptn-wrap{gap:9px;}.ptn-sep{display:none;}}'
    + '.ptn-sep{width:1px;height:26px;background:rgba(20,107,94,.22);margin:0 3px;}'
    + '.ptn-chip{min-height:44px;padding:8px 14px;border-radius:999px;border:1.5px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer;}'
    + '.ptn-chip:hover{background:#F3EADA;}'
    + '.ptn-chip.ptn-on{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'
    + '.ptn-chip:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    + '.ptn-lab{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;text-align:center;}'
    /* THE STRIP */
    /* ⚠ ONE GRID, TWO ROWS. Both the strip and the letter row use the same
       column template inside one scrolling track, so letter i is under bead
       i by construction rather than by luck. The 44px floor keeps the tap
       target legal on a phone and the track scrolls instead of wrapping. */
    + '.ptn-track{width:min(100%,720px);overflow-x:auto;overflow-y:hidden;padding:9px;'
    +   'border-radius:16px;background:rgba(255,253,247,.85);border:2px solid rgba(20,107,94,.2);'
    +   'display:flex;flex-direction:column;gap:4px;}'
    + '.ptn-strip,.ptn-letters{display:grid;gap:5px;'
    +   'grid-template-columns:repeat(var(--ptn-n,12),minmax(44px,1fr));}'
    + '.ptn-cell{aspect-ratio:1;min-width:44px;padding:3px;border-radius:11px;'
    +   'border:1.5px solid rgba(20,107,94,.16);background:#FFFDF7;cursor:pointer;font:inherit;'
    +   'display:flex;align-items:center;justify-content:center;}'
    + '.ptn-cell:hover{background:#F3EADA;}'
    + '.ptn-cell:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    + '.ptn-cell.ptn-covered{background:repeating-linear-gradient(45deg,#C9BBA4,#C9BBA4 6px,#BFAF95 6px,#BFAF95 12px);'
    +   'border-color:rgba(107,101,88,.4);}'
    + '.ptn-cell.ptn-lit{box-shadow:0 0 0 3px rgba(242,120,75,.55);}'
    + '.ptn-glyph{width:100%;height:100%;display:block;}'
    + '.ptn-pic{width:100%;height:100%;object-fit:contain;display:block;}'
    + '.ptn-hint{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;text-align:center;}'
    /* THE PATTERN WRITTEN OUT */
    + '.ptn-letter{text-align:center;min-width:44px;'
    +   'font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:18px;color:#3C7C72;}'
    /* THE UNIT */
    + '.ptn-unitbox{display:flex;flex-direction:column;align-items:center;gap:7px;'
    +   'padding:11px 14px;border-radius:18px;background:rgba(243,234,218,.7);}'
    + '.ptn-unit{display:flex;gap:7px;justify-content:center;}'
    + '.ptn-slot{width:clamp(52px,9vw,64px);height:clamp(52px,9vw,64px);padding:5px;border-radius:14px;'
    +   'border:2.5px solid rgba(20,107,94,.42);background:#FFFDF7;cursor:pointer;font:inherit;'
    +   'display:flex;align-items:center;justify-content:center;}'
    + '.ptn-slot:hover{background:#F3EADA;}'
    + '.ptn-slot:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    + '.ptn-lens{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center;}'
    + '.ptn-note{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:17px;color:#3C7C72;'
    +   'text-align:center;padding:6px 4px;}'
    + '.ptn-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;}'
    + '.ptn-privacy{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;'
    +   'text-align:center;width:100%;}'
    + '.ptn-locked{border-color:rgba(242,120,75,.55);color:#C2562F;}'
    + '.ptn-gate{display:flex;align-items:center;gap:9px;flex-wrap:wrap;justify-content:center;'
    +   'padding:8px 12px;border-radius:12px;background:rgba(242,120,75,.1);'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#8A4A2E;}'
    + '.ptn-gate a{color:#C2562F;font-weight:700;}'
    + '@media (max-width:560px){.ptn-hint{font-size:14px;}.ptn-note{font-size:16px;}}'
    + 'body.ptn-wide .lcs-header{flex-direction:column;}'
    /* the shell sets html,body{overflow:hidden} — past the fold on a phone
       is UNREACHABLE, not merely off-screen (letter-studio precedent) */
    + '@media (max-width:700px){body.ptn-wide{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}}'
    /* =====================================================================
       WIDE VIEWPORTS — ONE cap, and this tool earns that by construction.
       CARD-MAXED: the shell already gives an 1800px card and the instrument
       was 28.1% of the screen. The chain-walk finds a single real binder —
       `.ptn-track{width:min(100%,720px)}` — because everything below it is
       already relative: the strip is
           grid-template-columns: repeat(var(--ptn-n,12), minmax(44px,1fr))
       so the cells are 1fr and SHARE the track, `.ptn-cell` is
       aspect-ratio:1 so its height follows its width, and `.ptn-glyph` and
       `.ptn-pic` are width:100%/height:100% so the artwork fills the cell.
       Raise the track and the whole ladder follows.
       ⚠ THAT IS THE EXCEPTION, NOT THE RULE, in this batch. sorting-hoops
       needed the glyph inside its tile ramped by hand because `.hp-block`
       was a fixed 38px; here the equivalent element is already 100%. The
       difference is whether the tool sized its contents RELATIVE or FIXED,
       and it is worth reading before assuming either.
       ⚠ `minmax(44px,1fr)` keeps the 44px K-2 tap floor as the grid's own
       minimum at every width, untouched by any of this.
       ===================================================================== */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.ptn-wide .ptn-track{width:min(100%,900px);}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.ptn-wide .ptn-track{width:min(100%,1120px);}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.ptn-wide .ptn-track{width:min(100%,1320px);}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){.ptn-cell.ptn-lit{box-shadow:none;}}'
    + '@media print{'
    +   '.ptn-bar,.ptn-foot,.ptn-gate,.ptn-hint,.ptn-lens{display:none !important;}'
    +   '.ptn-cell{border-color:#000 !important;background:#fff !important;}'
    +   '.ptn-slot{border-color:#000 !important;background:#fff !important;}'
    +   '.ptn-letter,.ptn-lab,.ptn-note{color:#000 !important;}'
    +   '.ptn-glyph path[stroke]{stroke:#000 !important;}'
    +   '.ptn-stripbox{page-break-inside:avoid;break-inside:avoid;}'
    + '}';
  document.head.appendChild(st);
}
