/* =====================================================================
   NUMBER BOND — MAKE-10 CORE   (number-bond-core.js)
   ---------------------------------------------------------------------
   E18 #1 — the PART-PART-WHOLE VERB engine. A bond shows a WHOLE (10) at
   the top joined to two PART circles; one part is given (filled with
   counters), the other is empty. The child taps the empty part to add
   counters until the two parts make the whole, then taps Check. This
   instantiates CCSS K.OA.A.4 ("for any number 1-9, find the number that
   makes 10 when added to the given number") — the iconic missing-part
   number bond.

   A genuinely NEW verb (decompose-a-whole / find-the-missing-part on a
   part-part-whole DIAGRAM) — distinct from E4 match-pairs' tap-to-pair
   (which holds K.OA.A.3 "Make the Number"), E13 array-build, E12 place-
   value columns. The bond diagram (whole + two parts + connecting lines)
   is a render no existing core produces.

   CLEAN SIBLING CORE — zero lines to any of the protected cores
   (choice-board / cvc-builder / match-pairs / place-value / ten-frame /
   word-builder / fractions / array / sort-bins / clock) and zero lines to
   lcs-shell.{js,css}. It mirrors their public contract (init / setupTask /
   render / paint / reset / isCorrect + an 11-locale strings dict +
   idempotent injectCSS) so a thin wrapper (number-bond-activity.js) merges
   it via Object.assign exactly like array-activity.js does.

   DISCRETE-STATE MODEL — `whole` (10), `given` (1-9, the filled part), and
   `filled` (the count the child has put in the empty part). The child taps
   the empty part to +1 (cap at whole) and a "−" control to −1.
   isCorrect = given + filled === whole (single targeted answer = whole −
   given; discrete, exact). MEASURED by the build-time gate — every round's
   parts sum to the whole; the gate accepts the correct missing part and
   rejects a wrong one. answerType:'state' (the bond IS the answer surface).

   CULTURE-NEUTRAL — numerals + counters are universal (7 + 3 = 10 in every
   locale); ONLY the title/instruction/prompt/hint + sr labels localize.

   TOUCH + POINTER PARITY — the part is a TAP target (pointerdown +
   touch-action:manipulation, the fractions/array tap precedent; no drag).
   ===================================================================== */
window.NumberBondCore = {

  /* CURATION FLAG: title / instruction / prompt frame + hint are the
     load-bearing per-locale strings (numerals universal). EN authored here;
     10 non-EN folded in by the per-locale native ensemble (§A.13.48). The
     prompt is an ICU template — {whole} is a DIGIT (universal). */
  strings: {
    title: {en:"Make 10",de:"Zehn voll machen",es:"Forma el 10",pt:"Faça o 10",fr:"Faire 10",it:"Forma il 10",nl:"Maak 10",sv:"Gör 10",da:"Lav 10",no:"Lag 10",fi:"Kympin kaverit"},
    instruction: {en:"The whole is at the top. One part is filled. Tap the empty part to add counters until the two parts make the whole. Tap Check when you're ready.",de:"Oben steht das Ganze. Ein Teil ist schon gefüllt. Tippe auf den leeren Teil und füge so viele Plättchen hinzu, bis beide Teile zusammen das Ganze ergeben. Tippe auf Prüfen, wenn du fertig bist.",es:"El todo está arriba. Una parte ya está completa. Toca la parte vacía para añadir fichas hasta que las dos partes formen el todo. Toca Comprobar cuando estés listo.",pt:"O todo está no alto. Uma parte já está preenchida. Toque na parte vazia para acrescentar fichas até que as duas partes formem o todo. Toque em Verificar quando estiver pronto.",fr:"Le tout est en haut. Une partie est déjà remplie. Touche la partie vide pour ajouter des jetons jusqu'à ce que les deux parties fassent le tout. Touche Vérifier quand tu es prêt.",it:"L'intero è in alto. Una parte è già piena. Tocca la parte vuota per aggiungere le pedine finché le due parti insieme formano l'intero. Tocca Controlla quando sei pronto.",nl:"Het geheel staat bovenaan. Eén deel is al gevuld. Tik op het lege deel om fiches toe te voegen totdat de twee delen samen het geheel maken. Tik op Controleer als je klaar bent.",sv:"Det hela står överst. En del är ifylld. Tryck på den tomma delen för att lägga till markörer tills de två delarna tillsammans blir det hela. Tryck på Kontrollera när du är klar.",da:"Det hele står øverst. Den ene del er fyldt. Tryk på den tomme del for at lægge brikker til, indtil de to dele tilsammen bliver det hele. Tryk på Tjek, når du er klar.",no:"Det hele tallet står øverst. Den ene delen er fylt. Trykk på den tomme delen for å legge til tellebrikker til de to delene blir det hele tallet. Trykk på Sjekk når du er klar.",fi:"Kokonaisluku on ylhäällä. Toinen osa on jo täytetty. Napauta tyhjää osaa ja lisää nappuloita, kunnes molemmat osat muodostavat kokonaisluvun. Napauta Tarkista, kun olet valmis."},
    prompt: {en:"Make {whole} — fill the empty part.",de:"Mach {whole} voll – fülle den leeren Teil.",es:"Forma {whole}: completa la parte vacía.",pt:"Faça {whole} — preencha a parte vazia.",fr:"Fais {whole} — remplis la partie vide.",it:"Forma il {whole}: riempi la parte vuota.",nl:"Maak {whole} — vul het lege deel.",sv:"Gör {whole} — fyll den tomma delen.",da:"Lav {whole} — fyld den tomme del.",no:"Lag {whole} – fyll den tomme delen.",fi:"Tee {whole} — täytä tyhjä osa."},
    hintWrong: {en:"Not yet — count both parts. Together they must make the whole.",de:"Noch nicht ganz – zähle beide Teile. Zusammen müssen sie das Ganze ergeben.",es:"Todavía no: cuenta las dos partes. Juntas deben formar el todo.",pt:"Ainda não — conte as duas partes. Juntas, elas precisam formar o todo.",fr:"Pas encore — compte les deux parties. Ensemble, elles doivent faire le tout.",it:"Non ancora: conta tutte e due le parti. Insieme devono formare l'intero.",nl:"Nog niet — tel beide delen. Samen moeten ze het geheel maken.",sv:"Inte än — räkna båda delarna. Tillsammans måste de bli det hela.",da:"Ikke endnu — tæl begge dele. Tilsammen skal de blive det hele.",no:"Ikke ennå – tell begge delene. Til sammen må de bli det hele tallet.",fi:"Ei vielä — laske molemmat osat. Yhdessä niiden pitää muodostaa kokonaisluku."},
    remove: {en:"Remove one",de:"Eins wegnehmen",es:"Quitar una ficha",pt:"Tirar uma",fr:"Enlever un jeton",it:"Togli una pedina",nl:"Eén weghalen",sv:"Ta bort en",da:"Fjern en",no:"Fjern én",fi:"Poista yksi"},
    srWhole: {en:"the whole",de:"das Ganze",es:"el todo",pt:"o todo",fr:"le tout",it:"l'intero",nl:"het geheel",sv:"det hela",da:"det hele",no:"det hele tallet",fi:"kokonaisluku"},
    srPartGiven: {en:"the filled part",de:"der gefüllte Teil",es:"la parte completa",pt:"a parte preenchida",fr:"la partie remplie",it:"la parte piena",nl:"het gevulde deel",sv:"den ifyllda delen",da:"den fyldte del",no:"den fylte delen",fi:"täytetty osa"},
    srPartFill: {en:"the empty part — tap to add counters",de:"der leere Teil – tippe, um Plättchen hinzuzufügen",es:"la parte vacía: toca para añadir fichas",pt:"a parte vazia — toque para acrescentar fichas",fr:"la partie vide — touche pour ajouter des jetons",it:"la parte vuota: tocca per aggiungere le pedine",nl:"het lege deel — tik om fiches toe te voegen",sv:"den tomma delen — tryck för att lägga till markörer",da:"den tomme del — tryk for at lægge brikker til",no:"den tomme delen – trykk for å legge til tellebrikker",fi:"tyhjä osa — napauta lisätäksesi nappuloita"}
  },

  defaults: {},

  /* ---- design-system constants (Direction A teal) ---- */
  _C: { T: '#146B5E', BODY: '#E2F0EC', WHOLE: '#FBF3E4', DOT: '#F2784B', GIVEN: '#146B5E', LINE: '#146B5E' },

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.whole = 10;
    this.given = 7;          // the filled part this round (1-9)
    this.filled = 0;         // counters the child has put in the empty part
    this.readOnly = false;
    this._fillEl = null; this._minusEl = null;
  },

  /* opts = { whole, given, seed }. whole defaults 10 (K.OA.A.4); given 1-9. */
  setupTask: function (opts) {
    opts = opts || {};
    this.whole = opts.whole || 10;
    this.given = (typeof opts.given === 'number') ? opts.given : 7;
    this.filled = 0;
    this.readOnly = false;
  },

  /* the single correct missing part + the discrete answer key */
  missing: function () { return this.whole - this.given; },
  isCorrect: function () { return this.given + this.filled === this.whole; },

  /* ---- render(): the part-part-whole bond + a "−" control ---- */
  render: function () {
    this.injectCSS();
    var api = this.api, self = this, C = this._C;
    var stage = api.stage;
    stage.innerHTML = '';

    var wrap = api.el('div', 'nb-wrap');

    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 100 78');
    svg.setAttribute('class', 'nb-svg');
    svg.setAttribute('role', 'group');
    svg.setAttribute('aria-label', api.t('instruction'));
    function elNS(tag, attrs) { var e = document.createElementNS(ns, tag); for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); } return e; }

    /* connecting lines (whole bottom → each part top) UNDER the circles */
    svg.appendChild(elNS('line', { x1: 50, y1: 26, x2: 28, y2: 48, stroke: C.LINE, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.7 }));
    svg.appendChild(elNS('line', { x1: 50, y1: 26, x2: 72, y2: 48, stroke: C.LINE, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.7 }));

    /* WHOLE (top) */
    svg.appendChild(elNS('circle', { cx: 50, cy: 15, r: 13, fill: C.WHOLE, stroke: C.T, 'stroke-width': 2.5 }));
    var wt = elNS('text', { x: 50, y: 15, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.T, 'font-size': 13, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",system-ui,sans-serif)' });
    wt.textContent = String(this.whole);
    svg.appendChild(wt);

    /* the two parts: left = given (filled), right = empty (tappable) */
    this._partGroup(svg, elNS, 'given', 28, 61, this.given, false);
    this._fillEl = this._partGroup(svg, elNS, 'fill', 72, 61, this.filled, true);
    this._fillEl.setAttribute('role', 'button');
    this._fillEl.setAttribute('tabindex', '0');
    this._fillEl.setAttribute('aria-label', api.t('srPartFill'));

    wrap.appendChild(svg);

    /* "−" remove control (the part-tap adds; this removes one) */
    var minus = api.el('button', 'nb-minus');
    minus.type = 'button';
    minus.textContent = '−';
    minus.setAttribute('aria-label', api.t('remove'));
    minus.addEventListener('click', function () { if (self.readOnly) return; if (self.filled > 0) { self.filled--; self._beep(420); self.paint(); } });
    this._minusEl = minus;
    wrap.appendChild(minus);

    /* tap the empty part → +1 (cap at whole) */
    this._fillEl.addEventListener('pointerdown', function (e) {
      if (self.readOnly) return;
      if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();
      if (self.filled < self.whole) { self.filled++; self._beep(720); self.paint(); }
    });
    this._fillEl.addEventListener('keydown', function (e) {
      if (self.readOnly) return;
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      e.preventDefault();
      if (self.filled < self.whole) { self.filled++; self._beep(720); self.paint(); }
    });

    stage.appendChild(wrap);
    this.paint();
  },

  _beep: function (f) { if (this.api && this.api.sound) this.api.sound(f); if (this.api && this.api.track) this.api.track('bond', { filled: this.filled }); },

  /* build one part: a circle + `count` counter-dots + a numeral caption.
     Returns the group element. `tappable` parts get the fill styling. */
  _partGroup: function (svg, elNS, kind, cx, cy, count, tappable) {
    var ns = 'http://www.w3.org/2000/svg', C = this._C;
    var g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'nb-part nb-part-' + kind);
    g.appendChild(elNS('circle', { cx: cx, cy: cy, r: 15, fill: tappable ? C.BODY : '#D2E8E1', stroke: C.T, 'stroke-width': 2.5, 'class': 'nb-part-disc' }));
    /* counter dots, packed in up to 2 rows of 5 within the circle */
    var n = count, perRow = 5, dotR = 1.7, gap = 4.0;
    for (var i = 0; i < n; i++) {
      var row = Math.floor(i / perRow), col = i % perRow;
      var rowCount = Math.min(perRow, n - row * perRow);
      var dx = (col - (rowCount - 1) / 2) * gap;
      var dy = (row - (Math.ceil(n / perRow) - 1) / 2) * gap;
      g.appendChild(elNS('circle', { cx: (cx + dx).toFixed(2), cy: (cy + dy - 3).toFixed(2), r: dotR, fill: C.DOT }));
    }
    /* numeral caption below the circle */
    var t = elNS('text', { x: cx, y: cy + 11, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.T, 'font-size': 7, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",system-ui,sans-serif)', 'class': 'nb-part-num' });
    t.textContent = String(count);
    g.appendChild(t);
    svg.appendChild(g);
    return g;
  },

  /* ---- paint(): re-render the fill part's dots + numeral + readout ---- */
  paint: function () {
    if (!this._fillEl) return;
    var ns = 'http://www.w3.org/2000/svg', C = this._C, self = this;
    /* rebuild the fill part group's dots + numeral (cheap; ≤10 dots) */
    var g = this._fillEl;
    // remove old dots + numeral, keep the disc (first child)
    while (g.childNodes.length > 1) g.removeChild(g.lastChild);
    var cx = 72, cy = 61, perRow = 5, dotR = 1.7, gap = 4.0, n = this.filled;
    function elNS(tag, attrs) { var e = document.createElementNS(ns, tag); for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); } return e; }
    for (var i = 0; i < n; i++) {
      var row = Math.floor(i / perRow), col = i % perRow;
      var rowCount = Math.min(perRow, n - row * perRow);
      var dx = (col - (rowCount - 1) / 2) * gap;
      var dy = (row - (Math.ceil(n / perRow) - 1) / 2) * gap;
      g.appendChild(elNS('circle', { cx: (cx + dx).toFixed(2), cy: (cy + dy - 3).toFixed(2), r: dotR, fill: C.DOT }));
    }
    var t = elNS('text', { x: cx, y: cy + 11, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.T, 'font-size': 7, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",system-ui,sans-serif)', 'class': 'nb-part-num' });
    t.textContent = String(this.filled);
    g.appendChild(t);
    if (this.readOnly) { g.classList.add('nb-locked'); if (this._minusEl) this._minusEl.disabled = true; }
    else { g.classList.remove('nb-locked'); if (this._minusEl) this._minusEl.disabled = false; }
    if (this.api && this.api.announce) this.api.announce(this.given + ' + ' + this.filled + ' / ' + this.whole);
  },

  reset: function () { this.filled = 0; this.readOnly = false; this.paint(); },

  /* ---- stage CSS — idempotent. Bond max-width:min(82vw,340px); the
     tappable part disc is a large tap zone (touch-action:manipulation). ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var C = this._C;
    var css = ''
      + '.nb-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
      + '.nb-svg{width:min(82vw,340px)!important;height:auto!important;display:block;touch-action:manipulation;overflow:visible;}'
      + '.nb-part-fill{cursor:pointer;}'
      + '.nb-part-fill .nb-part-disc{transition:fill .12s var(--lcs-ease),stroke-width .12s var(--lcs-ease);}'
      + '.nb-part-fill:focus-visible{outline:none;}'
      + '.nb-part-fill:focus-visible .nb-part-disc{stroke-width:4;}'
      + '.nb-part-fill.nb-locked{cursor:default;}'
      /* "−" remove button (≥44px tap target) */
      + '.nb-minus{width:48px;height:44px;border-radius:14px;border:2px solid ' + C.T + ';'
      +   'background:#fff;color:' + C.T + ';font:800 26px/1 var(--lcs-font-display,"Baloo 2",system-ui,sans-serif);'
      +   'cursor:pointer;touch-action:manipulation;box-shadow:0 1px 3px rgba(20,107,94,.18);}'
      + '.nb-minus:active{transform:scale(.92);}'
      + '.nb-minus:disabled{opacity:.4;cursor:default;}';
    var tag = document.createElement('style');
    tag.setAttribute('data-number-bond-core', '');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
