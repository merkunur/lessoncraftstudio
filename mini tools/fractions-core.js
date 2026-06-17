/* =====================================================================
   FRACTIONS — PARTITION CORE   (fractions-core.js)
   ---------------------------------------------------------------------
   E14 #3 — the ACTIVE-PARTITION VERB engine. The child taps to CUT a
   single shape into N equal parts (halves / fourths). This is the
   active clause of CCSS 1.G.A.3 ("Partition circles and rectangles into
   two and four equal shares"), distinct from the recognition facets
   E14 #1 (Equal Halves and Fourths) / #2 (Same Size, Different Shape)
   which only ask the child to TAP a pre-divided tile on the E2
   choice-board. Here the child CREATES the partition.

   CLEAN SIBLING CORE — zero lines to any of the protected cores
   (choice-board / cvc-builder / match-pairs / place-value / ten-frame /
   word-builder). It mirrors their public contract (init / setupTask /
   render / paint / reset / isCorrect + an 11-locale strings dict +
   idempotent injectCSS) so a thin wrapper (fractions-activity.js) can
   merge it via Object.assign exactly like place-value-activity.js does.

   MECHANIC — "guided ghost slots". The shape renders undivided (the
   same pale-teal body + deep-teal outline visual language as the #1/#2
   FRACTION_FIGURES). A small fixed set of candidate cut-lines is overlaid
   as faint dashed "ghosts": the exact-correct line(s) PLUS one off-centre
   distractor per correct line. Tapping a ghost commits it (solid teal
   cut); tapping a committed cut removes it (toggle — the any-item-removal
   precedent from ten-frame / place-value). Check passes iff the committed
   candidate set EXACTLY equals the correct set.

   PROPORTIONAL CORRECTNESS — every snap position is closed-form exact
   (re-derived from the #1/#2 FRACTION_FIGURES constants), so "equal
   shares" is true BY CONSTRUCTION the instant the correct set is
   committed. The runtime never measures areas — correctness is set
   membership. A build-time assertion (verify-fractions-core.js) proves
   each correct partition yields equal areas / passes through centre.
   ===================================================================== */
window.FractionsCore = {

  /* CURATION FLAG: the fraction nouns (halves / fourths) + the prompt
     phrasing are the load-bearing per-locale strings. EN is authored
     here; the 10 non-EN locales are folded in by the per-locale native
     ensemble (§A.13.48). api.t() falls back to en until a locale lands. */
  strings: {
    title: {en:"Make Equal Parts",de:"Gleiche Teile machen",es:"Forma partes iguales",pt:"Faça Partes Iguais",fr:"Partage en parts égales",it:"Crea parti uguali",nl:"Maak gelijke delen",sv:"Gör lika stora delar",da:"Lav lige store dele",no:"Lag like store deler",fi:"Tee yhtä suuret osat"},
    instruction: {en:"Tap the dotted lines to cut the shape into equal parts. Tap Check when you’re ready.",de:"Tippe auf die gepunkteten Linien und schneide die Form in gleiche Teile. Tippe auf Prüfen, wenn du fertig bist.",es:"Toca las líneas punteadas para cortar la figura en partes iguales. Toca Revisar cuando estés listo.",pt:"Toque nas linhas pontilhadas para cortar a figura em partes iguais. Toque em Conferir quando estiver pronto.",fr:"Tape sur les pointillés pour couper la forme en parts égales. Tape sur Vérifier quand tu es prêt.",it:"Tocca le linee tratteggiate per dividere la figura in parti uguali. Tocca Controlla quando sei pronto.",nl:"Tik op de stippellijnen om de vorm in gelijke delen te knippen. Tik op Controleer als je klaar bent.",sv:"Tryck på de prickade linjerna för att dela formen i lika stora delar. Tryck på Kontrollera när du är klar.",da:"Tryk på de stiplede linjer for at klippe figuren i lige store dele. Tryk på Tjek, når du er klar.",no:"Trykk på de prikkete linjene for å dele opp i like store deler. Trykk på Sjekk når du er klar.",fi:"Napauta katkoviivoja ja jaa kuvio yhtä suuriin osiin. Napauta Tarkista, kun olet valmis."},
    /* prompts — selected by N in the wrapper (n=2 → halves, n=4 → fourths) */
    promptHalves: {en:"Cut the shape into 2 equal parts — halves.",de:"Schneide die Form in 2 gleiche Teile – Hälften.",es:"Corta la figura en 2 partes iguales: mitades.",pt:"Corte em 2 partes iguais — as metades.",fr:"Coupe la forme en 2 parts égales : les moitiés.",it:"Dividi la figura in 2 parti uguali — le metà.",nl:"Knip in 2 gelijke delen — helften.",sv:"Dela formen i 2 lika stora delar — halvor.",da:"Klip figuren i 2 lige store dele — halve.",no:"Del opp i 2 like store deler — halvdeler.",fi:"Jaa kahteen yhtä suureen osaan – puolikkaat."},
    promptFourths: {en:"Cut the shape into 4 equal parts — fourths.",de:"Schneide die Form in 4 gleiche Teile – Viertel.",es:"Corta la figura en 4 partes iguales: cuartos.",pt:"Corte em 4 partes iguais — os quartos.",fr:"Coupe la forme en 4 parts égales : les quarts.",it:"Dividi la figura in 4 parti uguali — i quarti.",nl:"Knip in 4 gelijke delen — kwarten.",sv:"Dela formen i 4 lika stora delar — fjärdedelar.",da:"Klip figuren i 4 lige store dele — fjerdedele.",no:"Del opp i 4 like store deler — firedeler.",fi:"Jaa neljään yhtä suureen osaan – neljäsosat."},
    /* try-again hints (returned by the wrapper's hintKey) */
    hintTapLine: {en:"Tap a dotted line to make a cut.",de:"Tippe auf eine gepunktete Linie, um einen Schnitt zu machen.",es:"Toca una línea punteada para hacer un corte.",pt:"Toque em uma linha pontilhada para fazer um corte.",fr:"Tape sur un trait en pointillés pour faire une coupe.",it:"Tocca una linea tratteggiata per fare un taglio.",nl:"Tik op een stippellijn om te knippen.",sv:"Tryck på en prickad linje för att göra ett snitt.",da:"Tryk på en stiplet linje for at lave et klip.",no:"Trykk på en prikket linje for å lage et kutt.",fi:"Napauta katkoviivaa ja tee leikkaus."},
    hintMoreCuts: {en:"Add another cut so the parts are equal.",de:"Mach noch einen Schnitt, damit die Teile gleich groß sind.",es:"Agrega otro corte para que las partes queden iguales.",pt:"Faça mais um corte para deixar as partes iguais.",fr:"Ajoute une autre coupe pour que les parts soient égales.",it:"Aggiungi un altro taglio per rendere le parti uguali.",nl:"Maak nog een knip zodat de delen gelijk zijn.",sv:"Lägg till ett snitt till så att delarna blir lika stora.",da:"Lav endnu et klip, så delene bliver lige store.",no:"Legg til ett kutt til, så delene blir like store.",fi:"Tee vielä yksi leikkaus, niin osista tulee yhtä suuret."},
    hintTooManyCuts: {en:"Too many cuts — tap one to take it away.",de:"Zu viele Schnitte – tippe auf einen, um ihn wegzunehmen.",es:"Hay demasiados cortes. Toca uno para quitarlo.",pt:"Cortes demais — toque em um para tirar.",fr:"Trop de coupes ! Tape sur une coupe pour l'enlever.",it:"Troppi tagli — toccane uno per toglierlo.",nl:"Te veel knippen — tik er een aan om hem weg te halen.",sv:"För många snitt — tryck på ett för att ta bort det.",da:"For mange klip — tryk på et af dem for at fjerne det.",no:"For mange kutt — trykk på ett for å ta det bort.",fi:"Liikaa leikkauksia – napauta yhtä ja poista se."},
    hintNotEqual: {en:"Those parts aren’t equal — choose the cut through the middle.",de:"Diese Teile sind nicht gleich groß – wähle den Schnitt durch die Mitte.",es:"Esas partes no son iguales. Elige el corte que pasa justo por el centro.",pt:"Essas partes não estão iguais — escolha o corte que passa pelo meio.",fr:"Ces parts ne sont pas égales : choisis la coupe qui passe par le milieu.",it:"Queste parti non sono uguali — scegli il taglio che passa nel mezzo.",nl:"Deze delen zijn niet gelijk — kies de knip door het midden.",sv:"De där delarna är inte lika stora — välj snittet rakt genom mitten.",da:"De dele er ikke lige store — vælg klippet, der går gennem midten.",no:"Disse delene er ikke like store — velg kuttet som går rett gjennom midten.",fi:"Osat eivät ole yhtä suuret – valitse leikkaus keskeltä."},
    /* screen-reader shape nouns + cut-line label */
    shapeCircle: {en:"circle",de:"Kreis",es:"círculo",pt:"círculo",fr:"cercle",it:"cerchio",nl:"cirkel",sv:"cirkel",da:"cirkel",no:"sirkel",fi:"ympyrä"},
    shapeSquare: {en:"square",de:"Quadrat",es:"cuadrado",pt:"quadrado",fr:"carré",it:"quadrato",nl:"vierkant",sv:"kvadrat",da:"kvadrat",no:"kvadrat",fi:"neliö"},
    shapeRectangle: {en:"rectangle",de:"Rechteck",es:"rectángulo",pt:"retângulo",fr:"rectangle",it:"rettangolo",nl:"rechthoek",sv:"rektangel",da:"rektangel",no:"rektangel",fi:"suorakulmio"},
    srCutLine: {en:"cut line",de:"Schnittlinie",es:"línea de corte",pt:"linha de corte",fr:"trait de coupe",it:"linea di taglio",nl:"kniplijn",sv:"snittlinje",da:"klippelinje",no:"kuttelinje",fi:"leikkausviiva"}
  },

  defaults: {},
  /* No settings drawer — the partition task has no operator-facing options
     (the shell guards `if (tool.settings && tool.settings.length)`). */

  /* ---- design-system constants (re-derived from the #1/#2 FRACTION_FIGURES
     in choice-board-activity.js — copied numeric values, NOT an import) ---- */
  _C: {
    T: '#146B5E', BODY: '#E2F0EC', SH: '#F2784B', RIM: '#FFFFFF',
    /* rect body x8..92 (w84) y28..72 (h44); square 10..90 (w80); circle r40@50,50 */
    RX: 8, RY: 28, RR: 92, RB: 72,
    SX: 10, SR: 90,
    CX: 50, CY: 50, R: 40
  },

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.shape = 'rect';        // 'rect' | 'square' | 'circle'
    this.n = 2;                 // 2 | 4
    this.cut = 'v';             // 'v' | 'h' | 'grid'
    this.candidates = [];       // [{ id, kind:'correct'|'distractor', line:{x1,y1,x2,y2} }]
    this.correctIds = [];       // candidate ids that yield N equal shares
    this.committed = {};        // id -> true
    this.readOnly = false;      // wrapper sets true on correct Check
  },

  /* Build the candidate set for one round. opts = { shape, n, cut, seed }.
     Correct + distractor lines are computed closed-form, then ordered by a
     seeded shuffle so all 11 locales render an identical layout. */
  setupTask: function (opts) {
    opts = opts || {};
    this.shape = opts.shape || 'rect';
    this.n = opts.n || 2;
    this.cut = opts.cut || 'v';
    this.readOnly = false;
    this.committed = {};

    var built = this._lines(this.shape, this.n, this.cut);
    var all = [];
    built.correct.forEach(function (ln) { all.push({ kind: 'correct', line: ln }); });
    built.distractors.forEach(function (ln) { all.push({ kind: 'distractor', line: ln }); });
    all = this._shuffle(all, opts.seed || 1);

    this.candidates = all.map(function (c, i) {
      return { id: 'c' + i, kind: c.kind, line: c.line };
    });
    this.correctIds = this.candidates
      .filter(function (c) { return c.kind === 'correct'; })
      .map(function (c) { return c.id; });
  },

  /* ---- geometry: closed-form correct + distractor cut lines ----
     Correct positions are exact even-fractions / centre lines, so the
     partition is provably equal. Distractors are well-separated off-centre
     lines (≥16 viewBox units from the correct line and from edges, which
     keeps every tap target ≥36px even at a 280px viewport). */
  _lines: function (shape, n, cut) {
    var C = this._C;
    if (shape === 'circle') {
      if (n === 2) {
        return { correct: [this._diamV()], distractors: [this._chordV(34)] };
      }
      /* n === 4 → two perpendicular diameters (4 exact quarter-disks) */
      return {
        correct: [this._diamV(), this._diamH()],
        distractors: [this._chordV(30), this._chordH(30)]
      };
    }
    /* rect / square box */
    var box = (shape === 'square')
      ? { left: C.SX, top: C.SX, right: C.SR, bottom: C.SR }
      : { left: C.RX, top: C.RY, right: C.RR, bottom: C.RB };
    var midX = (box.left + box.right) / 2;   // 50 for both
    var midY = (box.top + box.bottom) / 2;   // 50 for both
    if (n === 2 && cut === 'h') {
      return {
        correct: [this._lineH(box, midY)],
        distractors: [this._lineH(box, midY - 20)]
      };
    }
    if (n === 4 && cut === 'grid') {
      return {
        correct: [this._lineV(box, midX), this._lineH(box, midY)],
        distractors: [this._lineV(box, midX - 20), this._lineH(box, midY - 20)]
      };
    }
    /* default n === 2 cut === 'v' */
    return {
      correct: [this._lineV(box, midX)],
      distractors: [this._lineV(box, midX - 16)]
    };
  },

  _lineV: function (box, x) { return { x1: x, y1: box.top, x2: x, y2: box.bottom }; },
  _lineH: function (box, y) { return { x1: box.left, y1: y, x2: box.right, y2: y }; },
  _diamV: function () { var C = this._C; return { x1: C.CX, y1: C.CY - C.R, x2: C.CX, y2: C.CY + C.R }; },
  _diamH: function () { var C = this._C; return { x1: C.CX - C.R, y1: C.CY, x2: C.CX + C.R, y2: C.CY }; },
  /* vertical chord at x — endpoints where the line meets the circle */
  _chordV: function (x) {
    var C = this._C, off = Math.sqrt(C.R * C.R - (x - C.CX) * (x - C.CX));
    return { x1: x, y1: C.CY - off, x2: x, y2: C.CY + off };
  },
  _chordH: function (y) {
    var C = this._C, off = Math.sqrt(C.R * C.R - (y - C.CY) * (y - C.CY));
    return { x1: C.CX - off, y1: y, x2: C.CX + off, y2: y };
  },

  /* deterministic mulberry32 shuffle (matches the choice-board seeded
     pattern so layout is locale-stable). */
  _shuffle: function (arr, seed) {
    var s = seed | 0;
    function rand() {
      s = (s + 0x6D2B79F5) | 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  },

  /* ---- SVG body for the current shape ---- */
  _bodySVG: function () {
    var C = this._C;
    if (this.shape === 'circle') {
      return '<circle cx="50" cy="50" r="40" fill="' + C.BODY + '"/>'
           + '<circle cx="50" cy="50" r="40" fill="none" stroke="' + C.T + '" stroke-width="3.5"/>';
    }
    var x, y, w, h;
    if (this.shape === 'square') { x = C.SX; y = C.SX; w = C.SR - C.SX; h = C.SR - C.SX; }
    else { x = C.RX; y = C.RY; w = C.RR - C.RX; h = C.RB - C.RY; }
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="' + C.BODY + '"/>'
         + '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="none" stroke="' + C.T + '" stroke-width="3.5"/>';
  },

  /* ---- render(): build the SVG once per task ---- */
  render: function () {
    this.injectCSS();
    var api = this.api, self = this, C = this._C;
    var stage = api.stage;
    stage.innerHTML = '';

    var wrap = api.el('div', 'frac-wrap');
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('class', 'frac-svg');
    svg.setAttribute('role', 'group');
    svg.setAttribute('aria-label', api.t('instruction'));

    /* body first (under the cut lines) */
    svg.insertAdjacentHTML('beforeend', this._bodySVG());

    /* one <g> per candidate: a visible line (ghost/cut) + a fat transparent
       hit line on top (≥~14 viewBox units → ≥36px target at any viewport). */
    this._lineEls = {};
    this.candidates.forEach(function (c) {
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'frac-cand');
      g.setAttribute('data-id', c.id);

      var vis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      vis.setAttribute('x1', c.line.x1); vis.setAttribute('y1', c.line.y1);
      vis.setAttribute('x2', c.line.x2); vis.setAttribute('y2', c.line.y2);
      vis.setAttribute('class', 'frac-line');
      vis.setAttribute('stroke', C.T);

      var hit = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      hit.setAttribute('x1', c.line.x1); hit.setAttribute('y1', c.line.y1);
      hit.setAttribute('x2', c.line.x2); hit.setAttribute('y2', c.line.y2);
      hit.setAttribute('class', 'frac-hit');
      hit.setAttribute('role', 'button');
      hit.setAttribute('aria-label', api.t('srCutLine'));
      hit.addEventListener('click', function () { self._toggle(c.id); });

      g.appendChild(vis);
      g.appendChild(hit);
      svg.appendChild(g);
      self._lineEls[c.id] = { vis: vis, hit: hit };
    });

    wrap.appendChild(svg);
    stage.appendChild(wrap);
    this.paint();
  },

  /* ---- paint(): reflect committed state onto the existing lines ---- */
  paint: function () {
    if (!this._lineEls) return;
    var committedWord = '';
    for (var id in this._lineEls) {
      if (!this._lineEls.hasOwnProperty(id)) continue;
      var on = !!this.committed[id], els = this._lineEls[id];
      if (on) els.vis.classList.add('is-cut'); else els.vis.classList.remove('is-cut');
      els.hit.setAttribute('aria-pressed', String(on));
    }
    var made = this._committedCount();
    if (this.api && this.api.announce) {
      this.api.announce(made + ' / ' + this.correctIds.length);
    }
  },

  _toggle: function (id) {
    if (this.readOnly) return;
    this.committed[id] = !this.committed[id];
    if (this.api && this.api.sound) this.api.sound(this.committed[id] ? 760 : 380);
    this.paint();
    if (this.api && this.api.track) this.api.track('cut', { id: id, on: !!this.committed[id] });
  },

  _committedCount: function () {
    var n = 0;
    for (var k in this.committed) { if (this.committed.hasOwnProperty(k) && this.committed[k]) n++; }
    return n;
  },

  /* correctness = committed set EXACTLY equals the correct set */
  isCorrect: function () {
    var got = [];
    for (var k in this.committed) { if (this.committed.hasOwnProperty(k) && this.committed[k]) got.push(k); }
    if (got.length !== this.correctIds.length) return false;
    var want = this.correctIds.slice().sort();
    got.sort();
    for (var i = 0; i < want.length; i++) { if (got[i] !== want[i]) return false; }
    return true;
  },

  reset: function () { this.committed = {}; this.readOnly = false; this.paint(); },

  /* ---- stage CSS — idempotent (safe from both core + wrapper) ----
     Sizing mirrors the #1/#2 .cb-frac-board CSS: max-width:min(92vw,440px)
     so the single shape never overflows the iframe at 280–768px (vw, not
     vmin, per §A.13.47 rule 1). Engine CSS uses !important per rule 6. */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var css = ''
      + '.frac-wrap{display:flex;justify-content:center;align-items:center;width:100%;}'
      + '.frac-svg{width:min(82vw,360px)!important;height:auto!important;aspect-ratio:1!important;'
      +   'display:block;overflow:visible;touch-action:manipulation;}'
      /* ghost candidate line: faint dashed "cut here" affordance */
      + '.frac-line{stroke-width:3;opacity:.34;stroke-dasharray:4 5;stroke-linecap:round;stroke-linejoin:round;'
      +   'transition:opacity .14s var(--lcs-ease),stroke-width .14s var(--lcs-ease);}'
      /* committed cut: solid teal */
      + '.frac-line.is-cut{opacity:1;stroke-width:3.6;stroke-dasharray:none;}'
      /* fat transparent hit target on top — only the stroke is clickable */
      + '.frac-hit{stroke:transparent;stroke-width:14;stroke-linecap:round;fill:none;'
      +   'pointer-events:stroke;cursor:pointer;}';
    var tag = document.createElement('style');
    tag.setAttribute('data-fractions-core', '');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
