/* =====================================================================
   ARRAY — BUILD & COUNT CORE   (array-core.js)
   ---------------------------------------------------------------------
   E13 #1 — the BUILD-AN-ARRAY VERB engine. The child taps the cells of a
   rectangular R×C grid to fill it (one dot per cell), watches a repeated-
   addition strip assemble row by row (C + C + … = ?), then enters the
   total on the shell keypad. This instantiates CCSS 2.OA.C.4 ("use
   addition to find the total number of objects arranged in rectangular
   arrays with up to 5 rows and up to 5 columns; express the total as a
   sum of equal addends"): the cell-fill builds the SUM OF EQUAL ADDENDS
   (the strip), the keypad answers FIND THE TOTAL.

   A different VERB from the E2/E4 tap (tap-the-answer), E14 partition
   (cut a shape), and E3 classify-and-place (drag to a bin). The child
   CONSTRUCTS a rectangular array cell by cell.

   CLEAN SIBLING CORE — zero lines to any of the protected cores
   (choice-board / cvc-builder / match-pairs / place-value / ten-frame /
   word-builder / fractions) and zero lines to lcs-shell.{js,css}. It
   mirrors their public contract (init / setupTask / render / paint /
   reset + an 11-locale strings dict + idempotent injectCSS) so a thin
   wrapper (array-activity.js) merges it via Object.assign exactly like
   fractions-activity.js does.

   GRADED ANSWER = the shell keypad total (answerType 'number'); the round
   task's check() compares the entered number to rows×cols. The tool owns
   only the array + the repeated-addition strip (the stimulus + scaffold);
   the keypad is shell chrome (zero new answer-surface code).

   CULTURE-NEUTRAL BY CONSTRUCTION — the array is pure code-drawn dots and
   3 rows of 4 is 12 in every locale, so the total is a fixed mathematical
   fact. ONLY the title/instruction/prompt/hint + screen-reader nouns
   localize. The digits in the strip + keypad are universal. A build-time
   assertion (scripts/verify-array-core.js) proves every round's total
   equals rows×cols and the strip is R equal addends of C.

   TOUCH + POINTER PARITY — the cell toggle is a TAP, so it uses
   `pointerdown` (mouse + touch parity) + `touch-action:manipulation` on
   the grid (the fractions-core tap precedent). setPointerCapture +
   touch-action:none are DRAG-specific (sort-bins) and not applicable to a
   tap; parity is achieved without them.
   ===================================================================== */
window.ArrayCore = {

  /* CURATION FLAG: the title / instruction / prompt frame + the recount
     hint are the load-bearing per-locale strings. EN is authored here; the
     10 non-EN locales are folded in by the per-locale native ensemble
     (§A.13.48). The prompt is an ICU-style template — {rows} and {cols} are
     DIGITS (universal), so each native author must phrase the frame so it
     reads grammatically with a digit substituted (esp. Finnish partitive,
     §A.13.56). api.t() falls back to en until a locale lands. */
  strings: {
    title: {en:"Build the Array",de:"Baue das Gitter",es:"Arma el arreglo",pt:"Monte a Matriz",fr:"Construis le quadrillage",it:"Costruisci lo schieramento",nl:"Bouw het rooster",sv:"Bygg rutnätet",da:"Byg gitteret",no:"Bygg rutenettet",fi:"Rakenna taulukko"},
    instruction: {en:"Tap the cells to fill the array. Watch the rows add up, then type how many there are in all.",de:"Tippe die Felder an, um das Gitter zu füllen. Sieh zu, wie sich die Reihen aufaddieren, und tippe dann ein, wie viele es insgesamt sind.",es:"Toca las celdas para llenar el arreglo. Mira cómo se suman las filas y luego escribe cuántos hay en total.",pt:"Toque nas células para preencher a matriz. Veja as fileiras somando e depois digite quantos há no total.",fr:"Touche les cases pour remplir le quadrillage. Regarde les rangées s'additionner, puis écris combien il y en a en tout.",it:"Tocca le caselle per riempire lo schieramento. Guarda le righe che si sommano, poi scrivi quante sono in tutto.",nl:"Tik op de vakjes om het rooster te vullen. Kijk hoe de rijen samen optellen en typ dan hoeveel het er samen zijn.",sv:"Tryck på rutorna för att fylla rutnätet. Se hur raderna läggs ihop, och skriv sedan hur många det är totalt.",da:"Tryk på felterne for at fylde gitteret. Se rækkerne lægge sig sammen, og skriv så, hvor mange der er i alt.",no:"Trykk på rutene for å fylle rutenettet. Se hvordan radene legges sammen, og skriv så hvor mange det er til sammen.",fi:"Napauta ruutuja ja täytä taulukko. Katso, kuinka rivit lasketaan yhteen, ja kirjoita sitten, montako niitä on yhteensä."},
    /* the per-task prompt — {rows}/{cols} interpolated by the wrapper. Each
       native author phrased the frame so a DIGIT substitutes grammatically. */
    prompt: {en:"Make {rows} rows of {cols}. How many in all?",de:"Bilde {rows} Reihen mit je {cols}. Wie viele sind es insgesamt?",es:"Haz {rows} filas de {cols}. ¿Cuántos hay en total?",pt:"Faça {rows} fileiras de {cols}. Quantos há no total?",fr:"Fais {rows} rangées de {cols}. Combien en tout ?",it:"Fai {rows} righe da {cols}. Quante sono in tutto?",nl:"Maak {rows} rijen van {cols}. Hoeveel zijn het er samen?",sv:"Gör {rows} rader med {cols} i varje. Hur många är det totalt?",da:"Lav {rows} rækker med {cols} i hver. Hvor mange er der i alt?",no:"Lag {rows} rader med {cols} i hver. Hvor mange er det til sammen?",fi:"Tee {rows} riviä, joissa kussakin on {cols}. Montako niitä on yhteensä?"},
    hintRecount: {en:"Count one row, then add a row at a time: that's the total.",de:"Zähle eine Reihe und füge dann Reihe für Reihe dazu: Das ergibt die Gesamtzahl.",es:"Cuenta una fila y después agrega una fila a la vez: ese es el total.",pt:"Conte uma fileira e vá somando uma fileira de cada vez: esse é o total.",fr:"Compte une rangée, puis ajoute une rangée à la fois : ça te donne le total.",it:"Conta una riga, poi aggiungi una riga alla volta: ecco il totale.",nl:"Tel één rij en doe er steeds één rij bij: dat is het totaal.",sv:"Räkna en rad, och lägg sedan till en rad i taget – det blir totalsumman.",da:"Tæl én række, og læg så en række til ad gangen — det giver i alt.",no:"Tell én rad, og legg så til én rad om gangen: det blir summen.",fi:"Laske yksi rivi ja lisää sitten yksi rivi kerrallaan: siitä saat yhteismäärän."},
    /* screen-reader: a neutral cell noun + the strip label */
    srCell: {en:"array cell",de:"Gitterfeld",es:"celda del arreglo",pt:"célula da matriz",fr:"case du quadrillage",it:"casella dello schieramento",nl:"roostervakje",sv:"ruta i rutnätet",da:"gitterfelt",no:"rute i rutenettet",fi:"taulukon ruutu"},
    srEquation: {en:"repeated addition",de:"wiederholte Addition",es:"suma repetida",pt:"adição repetida",fr:"addition répétée",it:"addizione ripetuta",nl:"herhaald optellen",sv:"upprepad addition",da:"gentagen addition",no:"gjentatt addisjon",fi:"toistuva yhteenlasku"}
  },

  defaults: {},
  /* No settings drawer — the build task has no operator-facing options
     (the shell guards `if (tool.settings && tool.settings.length)`). */

  /* ---- design-system constants (Direction A teal language) ---- */
  _C: { T: '#146B5E', BODY: '#E2F0EC', DOT: '#146B5E', GOOD: '#1F9D6B' },

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.rows = 2;            // R this round
    this.cols = 2;            // C this round
    this.filled = {};         // "r,c" -> true
    this.readOnly = false;    // wrapper sets true on correct Check
    this._cellEls = {};       // "r,c" -> cell element
    this._stripEl = null;     // repeated-addition strip element
  },

  /* Build one round. opts = { rows, cols, seed }. (No randomness in the
     layout — an R×C grid is deterministic; `seed` is accepted for
     signature parity with the sibling cores but unused.) */
  setupTask: function (opts) {
    opts = opts || {};
    this.rows = opts.rows || 2;
    this.cols = opts.cols || 2;
    this.filled = {};
    this.readOnly = false;
  },

  _key: function (r, c) { return r + ',' + c; },
  _isFilled: function (r, c) { return !!this.filled[this._key(r, c)]; },

  /* a row is "complete" when all C cells in it are filled */
  _rowComplete: function (r) {
    for (var c = 0; c < this.cols; c++) { if (!this._isFilled(r, c)) return false; }
    return true;
  },
  _filledCount: function () {
    var n = 0;
    for (var k in this.filled) { if (this.filled.hasOwnProperty(k) && this.filled[k]) n++; }
    return n;
  },
  /* the total the child is asked for = rows × cols (the full array) */
  total: function () { return this.rows * this.cols; },
  /* the equal-addend equation built so far: one C per COMPLETED row.
     Exposed for the wrapper/gate; on a full build it is R addends of C. */
  builtEquation: function () {
    var eq = [];
    for (var r = 0; r < this.rows; r++) { if (this._rowComplete(r)) eq.push(this.cols); }
    return eq;
  },

  /* ---- render(): build the R×C grid + the repeated-addition strip ---- */
  render: function () {
    this.injectCSS();
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';

    var wrap = api.el('div', 'arr-wrap');

    /* the array grid — R rows × C cols of tappable cells */
    var grid = api.el('div', 'arr-grid');
    grid.style.gridTemplateColumns = 'repeat(' + this.cols + ', 1fr)';
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', api.t('instruction'));
    this._cellEls = {};
    for (var r = 0; r < this.rows; r++) {
      for (var c = 0; c < this.cols; c++) {
        var key = this._key(r, c);
        var cell = api.el('div', 'arr-cell');
        cell.setAttribute('data-key', key);
        cell.setAttribute('role', 'button');
        cell.setAttribute('tabindex', '0');
        cell.setAttribute('aria-label', api.t('srCell'));
        cell.innerHTML = '<span class="arr-dot" aria-hidden="true"></span>';
        (function (rr, cc, el) {
          /* TAP toggle — pointerdown for mouse+touch parity (no capture: no drag) */
          el.addEventListener('pointerdown', function (e) {
            if (self.readOnly) return;
            if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
            e.preventDefault();
            self._toggle(rr, cc);
          });
          el.addEventListener('keydown', function (e) {
            if (self.readOnly) return;
            if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
            e.preventDefault();
            self._toggle(rr, cc);
          });
        }(r, c, cell));
        this._cellEls[key] = cell;
        grid.appendChild(cell);
      }
    }
    wrap.appendChild(grid);

    /* repeated-addition strip — one addend slot per ROW + " = ?" */
    var strip = api.el('div', 'arr-strip');
    strip.setAttribute('aria-label', api.t('srEquation'));
    this._stripEl = strip;
    wrap.appendChild(strip);

    stage.appendChild(wrap);
    this.paint();
  },

  /* ---- paint(): reflect filled cells + rebuild the strip ---- */
  paint: function () {
    var self = this;
    for (var key in this._cellEls) {
      if (!this._cellEls.hasOwnProperty(key)) continue;
      var on = !!this.filled[key], el = this._cellEls[key];
      if (on) el.classList.add('is-filled'); else el.classList.remove('is-filled');
      el.setAttribute('aria-pressed', String(on));
      if (this.readOnly) el.classList.add('is-locked'); else el.classList.remove('is-locked');
    }
    /* strip: one slot per row — shows C when that row is complete, else a
       blank placeholder; joined by "+", trailed by "= ?". */
    if (this._stripEl) {
      var html = '';
      for (var r = 0; r < this.rows; r++) {
        if (r > 0) html += '<span class="arr-op">+</span>';
        if (this._rowComplete(r)) html += '<span class="arr-addend">' + this.cols + '</span>';
        else html += '<span class="arr-addend arr-blank">?</span>';
      }
      html += '<span class="arr-op">=</span><span class="arr-total">?</span>';
      this._stripEl.innerHTML = html;
    }
    if (this.api && this.api.announce) {
      this.api.announce(this._filledCount() + ' / ' + this.total());
    }
  },

  _toggle: function (r, c) {
    if (this.readOnly) return;
    var key = this._key(r, c);
    this.filled[key] = !this.filled[key];
    if (this.api && this.api.sound) this.api.sound(this.filled[key] ? 720 : 420);
    this.paint();
    if (this.api && this.api.track) this.api.track('fill', { key: key, on: !!this.filled[key] });
  },

  reset: function () { this.filled = {}; this.readOnly = false; this.paint(); },

  /* ---- stage CSS — idempotent (safe from both core + wrapper).
     Grid max-width:min(86vw,360px) so up to 5 columns never overflow the
     iframe at 280–768px (vw per §A.13.47 rule 1; !important per rule 6).
     Cells are square (aspect-ratio:1) with touch-action:manipulation so a
     tap never triggers double-tap-zoom. ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var C = this._C;
    var css = ''
      + '.arr-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:100%;}'
      + '.arr-grid{display:grid;gap:7px;width:100%;max-width:min(86vw,360px);'
      +   'touch-action:manipulation;}'
      + '.arr-cell{aspect-ratio:1;min-width:0;border-radius:12px;cursor:pointer;'
      +   'background:' + C.BODY + ';border:2px solid rgba(20,107,94,.28);'
      +   'display:flex;align-items:center;justify-content:center;'
      +   '-webkit-user-select:none;user-select:none;'
      +   'transition:background .12s var(--lcs-ease),border-color .12s var(--lcs-ease);}'
      + '.arr-cell:focus-visible{outline:3px solid ' + C.T + ';outline-offset:2px;}'
      + '.arr-cell.is-locked{cursor:default;}'
      /* the dot — hidden until the cell is filled, then a teal disc pops in */
      + '.arr-dot{width:54%;height:54%;border-radius:50%;background:' + C.DOT + ';'
      +   'transform:scale(0);transition:transform .14s var(--lcs-ease);}'
      + '.arr-cell.is-filled{background:#D2E8E1;border-color:' + C.T + ';}'
      + '.arr-cell.is-filled .arr-dot{transform:scale(1);}'
      /* repeated-addition strip */
      + '.arr-strip{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:7px;'
      +   'font:800 22px/1 var(--lcs-font-ui,"Nunito",system-ui,sans-serif);color:' + C.T + ';}'
      + '.arr-addend{min-width:30px;height:38px;padding:0 8px;border-radius:10px;'
      +   'display:inline-flex;align-items:center;justify-content:center;'
      +   'background:#D2E8E1;border:2px solid ' + C.T + ';}'
      + '.arr-addend.arr-blank{background:transparent;border-style:dashed;border-color:rgba(20,107,94,.4);color:rgba(20,107,94,.5);}'
      + '.arr-op{opacity:.7;font-weight:700;}'
      + '.arr-total{min-width:30px;height:38px;padding:0 8px;border-radius:10px;'
      +   'display:inline-flex;align-items:center;justify-content:center;'
      +   'background:transparent;border:2px dashed rgba(20,107,94,.4);color:rgba(20,107,94,.5);}';
    var tag = document.createElement('style');
    tag.setAttribute('data-array-core', '');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
