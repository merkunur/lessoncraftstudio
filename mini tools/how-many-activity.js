/* =====================================================================
   how-many-activity.js — ACTIVITY #1 of the one-by-one rebuild:
   "How many?" (K.CC.B.5) — THE COUNTING TABLE.
   Design sheet: docs/activities-rebuild/001-how-many.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: TAG AS YOU COUNT, AND THE LAST TAG IS THE ANSWER.
   A table of n identical library animals in one of the four arrangements
   the standard names (line · rows · circle · scattered). The child taps
   each animal once; a numbered tag drops on it with a rising note. A
   second tap is refused (the tag wobbles): one-to-one correspondence is
   enforced by the material, not by a rule in the hint. When every animal
   wears a tag, the LAST tag glows and the number rail waits: the child
   taps the numeral that tells how many — cardinality, enacted. The hint
   names the principle that slipped (some still uncounted / now tap how
   many / the last number you said tells how many). Two free moves —
   Count again (same table, new order) and Mix them up (same n, another
   arrangement) — are order-irrelevance and conservation as play.

   ACTIVITY LAYER ONLY: the model is how-many-core.js (own core); the
   shell (lcs-shell.js) is untouched by this file. Pictures come through
   lcs-pictures.js from the library — nothing here is drawn by hand; the
   only SVG is the tag, a circle with a numeral.

   Test seams (read by scripts/local-test-how-many.js and visual-qa):
     window.HowManyActivity.st       the live round state (core shape)
     window.HowManyActivity._order   the per-pass order (visual-qa forces it)
     window.HowManyActivity._pool    the round pool
   ===================================================================== */
'use strict';

var HowManyActivity = {
  id: 'how-many',
  apparatusClasses: ['hm-'],

  /* ---------------- strings ×11 ---------------- */
  strings: {
    title:         {en:'How Many?',de:'Wie viele?',fr:'Combien ?',it:'Quanti sono?',es:'¿Cuántos hay?',pt:'Quantos são?',nl:'Hoeveel?',sv:'Hur många?',da:'Hvor mange?',no:'Hvor mange?',fi:'Kuinka monta?'},
    instruction:   {en:"Tap each one and say its number. Then tap the number that tells how many.",de:"Tippe eins nach dem anderen an und sag die Zahl dazu. Tippe dann auf die Zahl, die sagt, wie viele es sind.",fr:"Touche-les un par un en disant le nombre. Puis touche le nombre qui dit combien il y en a.",it:"Toccali uno per uno dicendo il numero. Poi tocca il numero che dice quanti sono.",es:"Toca uno por uno diciendo el número. Luego toca el número que dice cuántos hay.",pt:"Toque em um de cada vez dizendo o número. Depois toque no número que diz quantos são.",nl:"Tik ze één voor één aan en zeg het getal. Tik daarna op het getal dat zegt hoeveel het er zijn.",sv:"Tryck på en i taget och säg talet. Tryck sedan på talet som säger hur många det är.",da:"Tryk på dem én ad gangen og sig tallet. Tryk så på det tal, der siger hvor mange der er.",no:"Trykk på én om gangen og si tallet. Trykk så på det tallet som sier hvor mange det er.",fi:"Napauta yksi kerrallaan ja sano luku. Napauta sitten numeroa, joka kertoo, kuinka monta niitä on."},
    prompt:        {en:"Tap each one to count. Then tap how many.",de:"Tippe eins nach dem anderen an und zähle. Tippe dann auf die Zahl.",fr:"Touche-les un par un pour compter. Puis touche le nombre.",it:"Toccali uno per uno per contare. Poi tocca il numero.",es:"Toca uno por uno para contar. Luego toca el número.",pt:"Toque em cada um para contar. Depois toque no número.",nl:"Tik ze één voor één aan om te tellen. Tik daarna op het getal.",sv:"Tryck på en i taget och räkna. Tryck sedan på talet.",da:"Tryk på dem én ad gangen og tæl. Tryk så på tallet.",no:"Trykk på én om gangen og tell. Trykk så på tallet.",fi:"Napauta yksi kerrallaan ja laske. Napauta sitten numeroa."},
    promptZero:    {en:'The table is empty. How many? Tap the number.',de:'Der Tisch ist leer. Wie viele? Tippe auf die Zahl.',fr:'La table est vide. Combien ? Touche le nombre.',it:'Il tavolo è vuoto. Quanti sono? Tocca il numero.',es:'La mesa está vacía. ¿Cuántos hay? Toca el número.',pt:'A mesa está vazia. Quantos são? Toque no número.',nl:'De tafel is leeg. Hoeveel? Tik op het getal.',sv:'Bordet är tomt. Hur många? Tryck på talet.',da:'Bordet er tomt. Hvor mange? Tryk på tallet.',no:'Bordet er tomt. Hvor mange? Trykk på tallet.',fi:'Pöytä on tyhjä. Kuinka monta? Napauta numeroa.'},
    matLabel:      {en:"The counting table",de:"Der Zähltisch",fr:"La table à compter",it:"Il tavolo per contare",es:"La mesa de contar",pt:"A mesa de contar",nl:"De telmat",sv:"Räknebordet",da:"Tællebordet",no:"Tellebordet",fi:"Laskupöytä"},
    railLabel:     {en:'How many?',de:'Wie viele?',fr:'Combien ?',it:'Quanti sono?',es:'¿Cuántos hay?',pt:'Quantos são?',nl:'Hoeveel?',sv:'Hur många?',da:'Hvor mange?',no:'Hvor mange?',fi:'Kuinka monta?'},
    again:         {en:'Count again',de:'Noch mal zählen',fr:'Recompter',it:'Conta di nuovo',es:'Contar otra vez',pt:'Contar de novo',nl:'Opnieuw tellen',sv:'Räkna igen',da:'Tæl igen',no:'Tell igjen',fi:'Laske uudelleen'},
    mix:           {en:"Mix them up",de:"Neu verteilen",fr:"Mélanger",it:"Mescola",es:"Mezclar",pt:"Misturar",nl:"Husselen",sv:"Blanda om",da:"Bland dem",no:"Bland dem",fi:"Sekoita"},
    hintUntagged:  {en:"Some are not counted yet. Tap every one once.",de:"Einige sind noch nicht gezählt. Tippe jedes genau einmal an.",fr:"Il en reste à compter. Touche chacun une seule fois.",it:"Ne mancano ancora. Tocca ognuno una volta sola.",es:"Faltan algunos por contar. Toca cada uno una sola vez.",pt:"Ainda faltam alguns. Toque em cada um uma só vez.",nl:"Sommige zijn nog niet geteld. Tik elk dier één keer aan.",sv:"Några är inte räknade än. Tryck en gång på varje.",da:"Nogle er ikke talt endnu. Tryk én gang på hver.",no:"Noen er ikke telt ennå. Trykk én gang på hver.",fi:"Osa on vielä laskematta. Napauta jokaista kerran."},
    hintNoAnswer:  {en:"All counted! Now tap the number that tells how many.",de:"Alle gezählt! Tippe jetzt auf die Zahl, die sagt, wie viele es sind.",fr:"Tout est compté ! Touche maintenant le nombre qui dit combien.",it:"Contati tutti! Ora tocca il numero che dice quanti sono.",es:"¡Todos contados! Ahora toca el número que dice cuántos hay.",pt:"Todos contados! Agora toque no número que diz quantos são.",nl:"Allemaal geteld! Tik nu op het getal dat zegt hoeveel.",sv:"Alla räknade! Tryck nu på talet som säger hur många.",da:"Alle talt! Tryk nu på tallet, der siger hvor mange.",no:"Alle telt! Trykk nå på tallet som sier hvor mange.",fi:"Kaikki laskettu! Napauta nyt numeroa, joka kertoo, kuinka monta."},
    hintWrong:     {en:"Look at the last tag. The last number tells how many.",de:"Schau auf die letzte Marke. Die letzte Zahl beim Zählen sagt, wie viele es sind.",fr:"Regarde la dernière étiquette. Le dernier nombre dit combien il y en a.",it:"Guarda l’ultima etichetta. L’ultimo numero dice quanti sono.",es:"Mira la última etiqueta. El último número dice cuántos hay.",pt:"Olhe para a última etiqueta. O último número diz quantos são.",nl:"Kijk naar het laatste kaartje. Het laatste getal zegt hoeveel.",sv:"Titta på den sista lappen. Det sista talet säger hur många.",da:"Se på den sidste mærkat. Det sidste tal siger hvor mange.",no:"Se på den siste lappen. Det siste tallet sier hvor mange.",fi:"Katso viimeistä lappua. Viimeinen luku kertoo, kuinka monta."},
    celebrate:     {en:"Yes — {n}!",de:"Ja – {n}!",fr:"Oui, {n} !",it:"Sì, {n}!",es:"¡Sí, {n}!",pt:"Isso, {n}!",nl:"Ja, {n}!",sv:"Ja – {n}!",da:"Ja – {n}!",no:"Ja – {n}!",fi:"Oikein – {n}!"},
    still:         {en:"Still {n}!",de:"Immer noch {n}!",fr:"Toujours {n} !",it:"Sono sempre {n}!",es:"¡Siguen siendo {n}!",pt:"Ainda são {n}!",nl:"Nog steeds {n}!",sv:"Fortfarande {n}!",da:"Stadig {n}!",no:"Fortsatt {n}!",fi:"Vieläkin {n}!"},
    alreadyCounted:{en:'Already counted.',de:'Schon gezählt.',fr:'Déjà compté.',it:'Già contato.',es:'Ya está contado.',pt:'Já foi contado.',nl:'Al geteld.',sv:'Redan räknad.',da:'Allerede talt.',no:'Allerede telt.',fi:'Jo laskettu.'},
    counted:       {en:"number {k}",de:"Nummer {k}",fr:"numéro {k}",it:"numero {k}",es:"número {k}",pt:"número {k}",nl:"nummer {k}",sv:"nummer {k}",da:"nummer {k}",no:"nummer {k}",fi:"numero {k}"},
    notCounted:    {en:"not counted yet",de:"noch nicht gezählt",fr:"pas encore compté",it:"non ancora contato",es:"aún sin contar",pt:"ainda não contado",nl:"nog niet geteld",sv:"saknar nummer",da:"ikke talt endnu",no:"ikke telt ennå",fi:"ei vielä laskettu"},
    setArrangement:{en:'Arrangement',de:'Anordnung',fr:'Disposition',it:'Disposizione',es:'Disposición',pt:'Disposição',nl:'Opstelling',sv:'Uppställning',da:'Opstilling',no:'Oppstilling',fi:'Asettelu'},
    arrAuto:       {en:'Varied',de:'Wechselnd',fr:'Variée',it:'Varia',es:'Variada',pt:'Variada',nl:'Afwisselend',sv:'Växlande',da:'Skiftende',no:'Vekslende',fi:'Vaihteleva'},
    arrLine:       {en:"In a line (up to 5)",de:"In einer Reihe (bis 5)",fr:"En ligne (jusqu’à 5)",it:"In fila (fino a 5)",es:"En fila (hasta 5)",pt:"Em fila (até 5)",nl:"Op een rij (t/m 5)",sv:"På rad (upp till 5)",da:"På række (op til 5)",no:"På rekke (opptil 5)",fi:"Jonossa (enintään 5)"},
    arrRows:       {en:"In rows",de:"In mehreren Reihen",fr:"En rangées",it:"In righe",es:"En varias filas",pt:"Em linhas",nl:"In rijen",sv:"I rader",da:"I rækker",no:"I rader",fi:"Riveissä"},
    arrCircle:     {en:"In a circle (3 to 6)",de:"Im Kreis (3 bis 6)",fr:"En cercle (3 à 6)",it:"In cerchio (da 3 a 6)",es:"En círculo (3 a 6)",pt:"Em círculo (3 a 6)",nl:"In een kring (3 t/m 6)",sv:"I en ring (3 till 6)",da:"I rundkreds (3 til 6)",no:"I en ring (3 til 6)",fi:"Ympyrässä (3–6)"},
    arrScatter:    {en:"Scattered",de:"Verstreut",fr:"Éparpillée",it:"Sparsi",es:"Dispersos",pt:"Espalhados",nl:"Verspreid",sv:"Utspridda",da:"Spredt",no:"Spredt",fi:"Hajallaan"},
    setRange:      {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    range5:        {en:"0 to 5",de:"0 bis 5",fr:"de 0 à 5",it:"da 0 a 5",es:"de 0 a 5",pt:"de 0 a 5",nl:"0 t/m 5",sv:"0 till 5",da:"0 til 5",no:"0 til 5",fi:"0–5"},
    range10:       {en:"0 to 10",de:"0 bis 10",fr:"de 0 à 10",it:"da 0 a 10",es:"de 0 a 10",pt:"de 0 a 10",nl:"0 t/m 10",sv:"0 till 10",da:"0 til 10",no:"0 til 10",fi:"0–10"}
  },

  defaults: { arrangement: 'auto', range: '10' },
  settings: [
    { key: 'arrangement', type: 'choice', labelKey: 'setArrangement', options: [
      { value: 'auto', labelKey: 'arrAuto' }, { value: 'line', labelKey: 'arrLine' }, { value: 'array', labelKey: 'arrRows' },
      { value: 'circle', labelKey: 'arrCircle' }, { value: 'scatter', labelKey: 'arrScatter' }
    ]},
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [
      { value: '5', labelKey: 'range5' }, { value: '10', labelKey: 'range10' }
    ]}
  ],

  /* K-friendly default set for the animals theme — the manifest row's
     params.nouns overrides it; every key must exist in the theme index. */
  FALLBACK_THEME: 'animals',
  FALLBACK_NOUNS: ['cat', 'dog', 'duck', 'elephant', 'fish', 'fox', 'giraffe', 'horse', 'owl', 'panda', 'penguin', 'pig', 'rabbit', 'sheep', 'tiger', 'turtle', 'zebra', 'koala', 'whale', 'wolf'],

  /* ---------------- lifecycle ---------------- */
  init: function (api) {
    this.api = api;
    this.themeDir = this.FALLBACK_THEME;
    this.theme = null;                       // the lcs-pictures index once loaded
    this.nouns = this.FALLBACK_NOUNS.slice();
    this.range = { min: 0, max: 10 };
    this.st = null;
    this._order = null; this._curPass = 0; this._pool = null; this._poolW = 0;
    this._nounOrder = null;
    this._ro = null;
    injectHowManyCSS();
    var params = (typeof window !== 'undefined' && window.location) ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    var self = this;
    var rowP = this._activityId
      ? fetch('/mini-tools/how-many-activities.json').then(function (r) { return r.ok ? r.json() : []; })
          .then(function (rows) { return rows.find(function (r) { return r.id === self._activityId; }) || null; })
          .catch(function () { return null; })
      : Promise.resolve(null);
    rowP.then(function (row) {
      if (row && row.params) {
        if (row.params.range) self.range = { min: Number(row.params.range.min) || 0, max: Number(row.params.range.max) || 10 };
        if (row.params.theme) self.themeDir = row.params.theme;
        if (Array.isArray(row.params.nouns) && row.params.nouns.length) self.nouns = row.params.nouns.slice();
      }
      return (typeof LCSPictures !== 'undefined') ? LCSPictures.load(self.themeDir) : null;
    }).then(function (theme) {
      if (theme) {
        self.theme = theme;
        self.nouns = self.nouns.filter(function (k) { return !!theme.nouns[k]; });
        if (!self.nouns.length) self.nouns = LCSPictures.keys(theme);
      }
      self._pool = null; self._order = null;
      if (typeof window !== 'undefined' && window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
    }).catch(function () { /* the fallback set keeps the table playable */ });
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },

  onSettings: function (key, val) {
    if (key === 'range') this.range = { min: 0, max: val === '5' ? 5 : 10 };
    /* both settings rebuild the pool: an arrangement is honoured by serving
       only the counts it can show (a line: 1-5; a circle: 3-8; rows: 4,6,8,9,10),
       so the drawer never does nothing (settings-efficacy, §21.4) */
    this._pool = null; this._order = null;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },

  /* ---------------- rounds (nextTask, order-only reshuffle) ---------------- */
  _matWidth: function () {
    var s = this.api && this.api.stage;
    var w = s ? s.clientWidth : 0;
    return w > 160 ? w : 560;
  },
  _ensurePool: function () {
    var W = this._matWidth();
    if (this._pool && this._poolW === W) return this._pool;
    var want = (this.api && this.api.settings && this.api.settings.arrangement) || 'auto';
    this._pool = HowManyCore.rounds(this.range.min, this.range.max, W, 'hm:' + this.range.max, want === 'auto' ? null : want);
    if (!this._pool.length) this._pool = HowManyCore.rounds(this.range.min, this.range.max, W, 'hm:' + this.range.max, null);
    this._poolW = W;
    /* a width change rebuilds the arrangements, not the ORDER: the round the
       child (or a gate) is on stays the round they are on */
    if (!(this._order && this._order.length === this._pool.length)) { this._order = null; this._curPass = 0; }
    return this._pool;
  },
  _shuffled: function (n, prev) {
    var a = [], i, j, t;
    for (i = 0; i < n; i++) a.push(i);
    for (var guard = 0; guard < 10; guard++) {
      for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
      if (!prev || n < 2 || a.join(',') !== prev.join(',')) break;
    }
    return a;
  },
  nextTask: function (opts) {
    var pool = this._ensurePool();
    var n = pool.length;
    if (!n) return null;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = this._shuffled(n, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = this._shuffled(n, this._order); this._curPass = pass; }
    if (!this._nounOrder || this._nounOrder.length !== this.nouns.length) this._nounOrder = this._shuffled(this.nouns.length, null);
    var r = pool[this._order[index % n]];
    var noun = this.nouns[this._nounOrder[index % this.nouns.length]];
    var self = this;
    var round = { n: r.n, arr: r.arr, seed: r.seed + ':' + index, noun: noun };
    return {
      id: 'how-many.' + r.n + '.' + r.arr + '.' + noun,
      promptKey: r.n === 0 ? 'promptZero' : 'prompt',
      promptArgs: { n: r.n },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool._startRound(round); },
      check: function (tool) {
        var ok = HowManyCore.verdict(tool.st) === 'ok';
        if (ok) tool._celebrate();
        return ok;
      },
      hintKey: function (tool) {
        var v = HowManyCore.verdict(tool.st);
        tool._showSlip(v);
        return v === 'untagged' ? 'hintUntagged' : v === 'noAnswer' ? 'hintNoAnswer' : 'hintWrong';
      }
    };
  },
  _startRound: function (round) {
    this.st = HowManyCore.newState(round);
    this.st.noun = round.noun;
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = HowManyCore.newState({ n: 3, arr: 'line', seed: 'boot' });
    var st = this.st;
    var W = this._matWidth();

    var wrap = api.el('div', 'hm-wrap');
    this._wrap = wrap;

    /* ---- the table ---- */
    var mat = api.el('div', 'hm-mat');
    mat.setAttribute('role', 'group');
    mat.setAttribute('aria-label', t('matLabel'));
    if (st.n === 0) mat.classList.add('hm-empty');
    this._mat = mat;
    this._pics = [];
    for (var i = 0; i < st.n; i++) {
      var b = api.el('button', 'hm-pic');
      b.type = 'button';
      b.dataset.i = String(i);
      b.appendChild(this._picture());
      var tag = api.el('span', 'hm-tag');
      tag.setAttribute('aria-hidden', 'true');
      b.appendChild(tag);
      b.addEventListener('click', this._onPic.bind(this, i));
      mat.appendChild(b);
      this._pics.push(b);
    }
    wrap.appendChild(mat);

    /* ---- the number rail ---- */
    var rail = api.el('div', 'hm-rail');
    var railLabel = api.el('div', 'hm-rail-label');
    railLabel.textContent = t('railLabel');
    if (W >= 330) rail.appendChild(railLabel);           // a narrow phone keeps the task line only (fold)
    var nums = api.el('div', 'hm-nums');
    nums.setAttribute('role', 'group');
    nums.setAttribute('aria-label', t('railLabel'));
    this._nums = [];
    /* one row of numerals when the mat is wide enough (a number line the eye
       reads left to right); on a phone two deliberate rows, 0-5 over 6-10 —
       never a dangling orphan row */
    var count = this.range.max - this.range.min + 1;
    var oneRowW = count * 44 + (count - 1) * 4;                   // eleven 44px chips, 4px apart
    var perRow = (count > 6 && W < oneRowW) ? 6 : count;
    var chip = Math.max(44, Math.min(52, Math.floor((W - (perRow - 1) * 4) / perRow)));   // 44 = the tap floor
    nums.style.setProperty('--hm-chip', chip + 'px');
    var rowEl = null;
    for (var v = this.range.min, c = 0; v <= this.range.max; v++, c++) {
      if (c % perRow === 0) { rowEl = api.el('div', 'hm-numrow'); nums.appendChild(rowEl); }
      var nb = api.el('button', 'hm-num');
      nb.type = 'button';
      nb.textContent = String(v);
      nb.dataset.v = String(v);
      nb.setAttribute('aria-pressed', String(st.answer === v));
      nb.addEventListener('click', this._onNum.bind(this, v));
      rowEl.appendChild(nb);
      this._nums.push(nb);
    }
    rail.appendChild(nums);
    this._rail = rail;
    wrap.appendChild(rail);

    /* ---- the two free moves ---- */
    var tools = api.el('div', 'hm-tools');
    var again = api.el('button', 'hm-tool hm-again');
    again.type = 'button'; again.textContent = t('again');
    again.disabled = st.n === 0;
    again.addEventListener('click', this._countAgain.bind(this));
    var mix = api.el('button', 'hm-tool hm-mix');
    mix.type = 'button'; mix.textContent = t('mix');
    mix.disabled = st.n === 0 || HowManyCore.arrangementsFor(st.n, W).length < 2;
    mix.addEventListener('click', this._mix.bind(this));
    tools.append(again, mix);
    /* the two free moves are extras; on the narrowest phones (mat < 330px,
       the 320×640 class) they would push Check below the fold — the task is
       complete without them there (design sheet, Layout) */
    if (W >= 330) wrap.appendChild(tools);

    stage.appendChild(wrap);

    this._layout();
    /* re-apply the state (a render after Check / a settings change keeps the tags) */
    for (var k = 0; k < st.tags.length; k++) this._paintTag(st.tags[k], k + 1, false);
    this._paintLast();
    this._watchWidth();
  },

  _picture: function () {
    var lang = this.api.lang, noun = this.st.noun || this.nouns[0];
    if (this.theme) {
      try { return LCSPictures.img(this.theme, noun, lang, { plural: false }); } catch (e) { /* fall through */ }
    }
    var img = document.createElement('img');
    img.src = '/image-library-webp/themes/' + this.themeDir + '/' + noun + '@2x.webp';
    img.alt = noun; img.decoding = 'async'; img.draggable = false;
    return img;
  },

  /* positions from the core, in px, re-run on a width change */
  _layout: function () {
    var st = this.st, W = this._matWidth();
    var L = HowManyCore.layout(st.n, st.arr, W, st.seed);
    this._L = L;
    this._mat.style.height = L.h + 'px';
    for (var i = 0; i < this._pics.length; i++) {
      var p = L.points[i], b = this._pics[i];
      b.style.left = p.x + 'px'; b.style.top = p.y + 'px';
      b.style.width = L.size + 'px'; b.style.height = L.size + 'px';
    }
    this._labelPics();
  },
  _labelPics: function () {
    var t = this.api.t, st = this.st, noun = st.noun;
    var name = (this.theme) ? LCSPictures.label(this.theme, noun, this.api.lang, { plural: false }) : noun;
    for (var i = 0; i < this._pics.length; i++) {
      var k = st.tags.indexOf(i);
      this._pics[i].setAttribute('aria-label', name + ', ' + (k >= 0 ? interp(t('counted'), { k: k + 1 }) : t('notCounted')));
    }
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._matWidth();
    this._ro = new ResizeObserver(function () {
      var w = self._matWidth();
      if (Math.abs(w - last) < 24 || !self._mat || !self._mat.isConnected) return;
      /* an arrangement that no longer fits (a scatter of nine on a narrowed
         mat) falls back to the first that does, keeping the count — BEFORE
         either re-layout path */
      if (HowManyCore.arrangementsFor(self.st.n, w).indexOf(self.st.arr) < 0) { self.st.arr = HowManyCore.arrangementsFor(self.st.n, w)[0]; }
      /* crossing the narrow-phone line changes WHAT is rendered (rail label,
         free moves), not just where — re-render, keeping the round's state */
      if ((w < 330) !== (last < 330)) { last = w; self.render(); return; }
      last = w;
      self._layout();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- interaction ---------------- */
  _onPic: function (i) {
    var st = this.st, t = this.api.t;
    var res = HowManyCore.tag(st, i);
    var b = this._pics[i];
    if (!res.ok) {
      if (res.reason === 'again') {
        b.classList.remove('hm-wobble'); void b.offsetWidth; b.classList.add('hm-wobble');
        this.api.announce(t('alreadyCounted'));
      }
      return;
    }
    this._paintTag(i, res.k, true);
    this.api.sound(440 + 40 * res.k);
    this._speakNumber(res.k);
    this._labelPics();
    this._paintLast();
    if (HowManyCore.allTagged(st)) {
      this._rail.classList.add('hm-ready');
      this.api.announce(t('hintNoAnswer'));
    } else {
      this.api.announce(String(res.k));
    }
    this.api.track('tag', { k: res.k, n: st.n });
  },
  _paintTag: function (i, k, animate) {
    var b = this._pics[i];
    if (!b) return;
    var tag = b.querySelector('.hm-tag');
    tag.textContent = String(k);
    b.classList.add('is-tagged');
    if (!animate) b.classList.add('hm-still');
    b.classList.remove('hm-missing');
  },
  /* ⚠ The last tag does NOT glow before Check (reviewer, 2026-10-15): the tag
     already shows the numeral, so a pre-emptive ring would let a child match
     the glowing numeral to the rail without ever taking the cardinality step.
     The rail cue says "now answer"; the ring is only the remedy for a wrong
     numeral (_showSlip 'wrong'). */
  _paintLast: function () {
    var st = this.st, all = HowManyCore.allTagged(st) && st.n > 0;
    for (var i = 0; i < this._pics.length; i++) this._pics[i].classList.remove('is-last');
    if (this._rail) this._rail.classList.toggle('hm-ready', all);
  },
  _onNum: function (v) {
    var st = this.st;
    HowManyCore.setAnswer(st, v);
    for (var i = 0; i < this._nums.length; i++) this._nums[i].setAttribute('aria-pressed', String(Number(this._nums[i].dataset.v) === v));
    this._rail.classList.remove('hm-nudge');
    this.api.sound(660);
    this.api.track('answer', { v: v, n: st.n });
  },
  _countAgain: function () {
    var st = this.st;
    HowManyCore.untagAll(st);
    for (var i = 0; i < this._pics.length; i++) { this._pics[i].classList.remove('is-tagged', 'is-last', 'hm-still', 'hm-missing'); this._pics[i].querySelector('.hm-tag').textContent = ''; }
    for (var j = 0; j < this._nums.length; j++) this._nums[j].setAttribute('aria-pressed', 'false');
    this._rail.classList.remove('hm-ready', 'hm-nudge');
    this._labelPics();
    this.api.announce(this.api.t('prompt'));
    this.api.track('again', { n: st.n });
  },
  _mix: function () {
    var st = this.st, W = this._matWidth();
    var wasAll = HowManyCore.allTagged(st) && st.n > 0;
    st.arr = HowManyCore.nextArrangement(st, W);
    st.seed = st.seed + '+';
    this._countAgain();
    this._layout();
    this.api.announce(wasAll ? interp(this.api.t('still'), { n: st.n }) : this.api.t('prompt'));
    this.api.track('mix', { n: st.n, arr: st.arr });
  },
  /* the hint names the principle that slipped — and the apparatus shows WHERE */
  _showSlip: function (v) {
    var st = this.st;
    if (v === 'untagged') {
      var miss = HowManyCore.untagged(st);
      for (var i = 0; i < miss.length; i++) { var b = this._pics[miss[i]]; b.classList.remove('hm-missing'); void b.offsetWidth; b.classList.add('hm-missing'); }
    } else if (v === 'noAnswer') {
      this._rail.classList.remove('hm-nudge'); void this._rail.offsetWidth; this._rail.classList.add('hm-nudge');
    } else if (v === 'wrong') {
      var last = this._pics[HowManyCore.lastTagged(st)];
      if (last) { last.classList.remove('is-last'); void last.offsetWidth; last.classList.add('is-last'); }
    }
  },
  _celebrate: function () {
    var pics = this._pics;
    for (var i = 0; i < pics.length; i++) {
      (function (b, d) { setTimeout(function () { b.classList.remove('hm-hop'); void b.offsetWidth; b.classList.add('hm-hop'); }, d); }(pics[i], 60 * i));
    }
  },
  _speakNumber: function (k) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(k), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function interp(s, args) {
  return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
}

/* ---------------- CSS (injected once; hm- prefix; no vh anywhere) ---------------- */
var hmCssDone = false;
function injectHowManyCSS() {
  if (hmCssDone || typeof document === 'undefined') return;
  hmCssDone = true;
  var css = ''
  + '.hm-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;}'
  /* the table: a cream mat with a teal edge and a soft lip — the apparatus */
  + '.hm-mat{position:relative;width:100%;border-radius:22px;background:#FFFDF8;border:3px solid var(--lcs-structure);'
  + 'box-shadow:inset 0 2px 0 rgba(255,255,255,.8),inset 0 -6px 0 rgba(20,107,94,.08),0 6px 0 rgba(20,107,94,.16),0 10px 22px rgba(20,30,28,.08);overflow:visible;}'
  + '.hm-mat.hm-empty{background:repeating-linear-gradient(135deg,#FFFDF8 0 14px,#FBF6EE 14px 16px);}'
  + '.hm-pic{position:absolute;padding:0;margin:0;border:0;background:none;border-radius:18px;cursor:pointer;touch-action:manipulation;'
  + 'transition:transform .12s var(--lcs-ease);-webkit-tap-highlight-color:transparent;}'
  + '.hm-pic img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;user-select:none;-webkit-user-drag:none;}'
  + '.hm-pic:hover{transform:translateY(-3px);} .hm-pic:active{transform:scale(.94);}'
  + '.hm-pic:focus-visible{outline:3px solid var(--lcs-focus);outline-offset:2px;}'
  /* the tag: a coral disc with a white numeral, dropped on the picture */
  + '.hm-tag{position:absolute;top:-8px;left:-8px;width:34px;height:34px;border-radius:50%;background:var(--lcs-accent);color:#fff;'
  + 'font-family:var(--lcs-font-display);font-weight:700;font-size:18px;line-height:34px;text-align:center;'
  + 'box-shadow:0 2px 0 #C2603C,0 4px 10px rgba(0,0,0,.18);transform:scale(0);pointer-events:none;}'
  + '.hm-pic.is-tagged .hm-tag{transform:scale(1);animation:hm-drop .34s var(--lcs-ease) 1;}'
  + '.hm-pic.is-tagged.hm-still .hm-tag{animation:none;}'
  + '@keyframes hm-drop{0%{transform:scale(.2) translateY(-18px);}60%{transform:scale(1.18) translateY(2px);}100%{transform:scale(1) translateY(0);}}'
  + '.hm-pic.is-last .hm-tag{box-shadow:0 0 0 4px #fff,0 0 0 8px var(--lcs-structure),0 4px 10px rgba(0,0,0,.18);animation:hm-pulse .8s var(--lcs-ease) 2;}'
  + '@keyframes hm-pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.25);}}'
  + '.hm-pic.hm-wobble{animation:hm-wobble .4s var(--lcs-ease) 1;}'
  + '@keyframes hm-wobble{0%,100%{transform:translateX(0);}25%{transform:translateX(-7px) rotate(-4deg);}75%{transform:translateX(7px) rotate(4deg);}}'
  + '.hm-pic.hm-missing{animation:hm-grow 1s var(--lcs-ease) 2;}'
  + '@keyframes hm-grow{50%{transform:scale(1.14);}}'
  + '.hm-pic.hm-hop{animation:hm-hop .55s var(--lcs-ease) 1;}'
  + '@keyframes hm-hop{0%{transform:none;}30%{transform:translateY(-16px) scale(1.06,.94);}60%{transform:translateY(0) scale(.96,1.04);}100%{transform:none;}}'
  /* the number rail */
  + '.hm-rail{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
  + '.hm-rail-label{font-family:var(--lcs-font-body);font-weight:700;font-size:15px;color:var(--lcs-ink-soft);letter-spacing:.02em;}'
  + '.hm-nums{display:flex;flex-direction:column;align-items:center;gap:6px;--hm-chip:50px;}'
  + '.hm-numrow{display:flex;justify-content:center;gap:4px;}'
  + '.hm-num{width:var(--hm-chip);height:var(--hm-chip);padding:0;border-radius:13px;background:var(--lcs-surface);border:2px solid var(--lcs-line);'
  + 'font-family:var(--lcs-font-display);font-weight:700;font-size:calc(var(--hm-chip) * .46);color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;'
  + 'box-shadow:0 2px 0 rgba(20,30,28,.08);transition:transform .12s var(--lcs-ease),background .15s,border-color .15s;}'
  + '.hm-num:hover{background:var(--lcs-structure-soft);border-color:var(--lcs-structure-soft);}'
  + '.hm-num[aria-pressed="true"]{background:var(--lcs-structure);color:#fff;border-color:var(--lcs-structure);transform:translateY(-2px);box-shadow:0 4px 0 #0F564B;}'
  + '.hm-rail.hm-ready .hm-rail-label{color:var(--lcs-structure);}'
  + '.hm-rail.hm-nudge .hm-num{animation:hm-grow .8s var(--lcs-ease) 2;}'
  /* the two free moves */
  + '.hm-tools{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
  + '.hm-tool{min-height:44px;padding:0 16px;border-radius:999px;border:2px solid var(--lcs-structure-soft);background:var(--lcs-surface);'
  + 'font-family:var(--lcs-font-body);font-weight:700;font-size:15px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;transition:background .15s;}'
  + '.hm-tool:hover{background:var(--lcs-structure-soft);} .hm-tool:disabled{opacity:.4;cursor:default;}'
  + '@media (prefers-reduced-motion:reduce){.hm-pic,.hm-tag,.hm-rail .hm-num,.hm-pic .hm-tag{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'hm-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = HowManyActivity;
if (typeof window !== 'undefined') window.HowManyActivity = HowManyActivity;
