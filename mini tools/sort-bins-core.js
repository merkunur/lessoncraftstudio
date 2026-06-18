/* =====================================================================
   SORT / DRAG-TO-BIN CORE   (sort-bins-core.js)
   ---------------------------------------------------------------------
   E3 — the CLASSIFY-AND-PLACE VERB engine. The child DRAGS each shape tile
   into a labeled bin. Two MODES share one drag/state/paint machinery:

   • mode 'sides'    (E3 #1, CCSS 2.G.A.1) — sort each shape into the family
     bin whose name matches its NUMBER OF SIDES (Triangles / Quadrilaterals /
     Pentagons / Hexagons). [setupTask({bins,items,seed})]
   • mode 'defining' (E3 #2, CCSS 1.G.A.1) — sort a mixed pile into a target-
     family box vs a "not" box; the true tiles are the target shape drawn in
     varied COLOUR / SIZE / ORIENTATION, so the child recognises the shape by
     its DEFINING attribute (side count), not its look. The non-defining
     attributes are INERT to the placement check (read only by _shapeSVG); the
     build-time gate asserts that invariance. [setupTask({target,trueItems,
     falseItems,seed})] The wrapper selects the mode (+ its title/instruction/
     prompt strings) from the activity id — the core only branches on
     this.mode, so mode 'sides' runs behavior-identical to before (G1).

   A different VERB from the E2 choice-board tap (tap-the-answer) and from
   E14 fractions (partition). The child sorts a mixed pile, not taps a chip.

   CLEAN SIBLING CORE — zero lines to any of the protected cores
   (choice-board / cvc-builder / match-pairs / place-value / ten-frame /
   word-builder / fractions) and zero lines to lcs-shell.{js,css}. It mirrors
   their public contract (init / setupTask / render / paint / reset /
   isCorrect + an 11-locale strings dict + idempotent injectCSS) so a thin
   wrapper (sort-bins-activity.js) merges it via Object.assign exactly like
   fractions-activity.js does.

   MECHANIC — "drag to bin, deferred check". A pile of code-drawn SVG shape
   tiles sits above a row of labeled family bins. The child drags each tile
   into a bin (or back to the pile); free movement, NO feedback during the
   fill phase. Check (shell chrome) reads isCorrect() — every tile must be in
   a bin AND in the bin whose family side-count equals the tile's side-count.
   A failed Check paints per-tile marks (green = right bin, coral = wrong bin)
   via review(); the next drag clears them (clearReview) → back to fill phase.
   A passed Check locks the board (readOnly) for a stable celebration.

   CULTURE-NEUTRAL BY CONSTRUCTION — the items are pure geometry (no images,
   no words) and a triangle has 3 sides in every locale, so item→bin
   membership is a fixed mathematical fact. ONLY the bin LABELS + short
   strings localize. A build-time assertion (scripts/verify-sort-bins-core.js)
   proves every catalog shape's `sides` equals its polygon vertex count and
   every round's items each have a matching bin.

   TOUCH + POINTER PARITY — drag uses Pointer Events (pointerdown +
   setPointerCapture → pointermove ghost → pointerup rect hit-test), and the
   tiles carry `touch-action:none`, so a drag never scrolls the page on a
   tablet. (The number-line.js / ruler.js precedent, lifted into 2-D.)
   ===================================================================== */
window.SortBinsCore = {

  /* CURATION FLAG: the four family bin LABELS + the prompt/instruction are the
     load-bearing per-locale strings. EN is authored here; the 10 non-EN
     locales are folded in by the per-locale native ensemble (§A.13.48). Each
     native author chooses the kid-appropriate bin wording — the formal polygon
     term where natural (en "Quadrilaterals") vs an "N sides" phrasing where the
     formal term is too heavy for Grade 2 (e.g. "Four sides"). Either is fine:
     the SIDE COUNT is the universal correct-key, never the label text. */
  strings: {
    title: {en:"Sort Shapes by Sides",de:"Formen nach Ecken sortieren",es:"Clasifica figuras por lados",pt:"Classifique figuras por lados",fr:"Trie les formes par côtés",it:"Ordina le figure per lati",nl:"Sorteer vormen op zijden",sv:"Sortera former efter sidor",da:"Sortér figurer efter sider",no:"Sorter former etter sider",fi:"Lajittele kuviot sivujen mukaan"},
    instruction: {en:"Drag each shape into the bin that matches its number of sides. Tap Check when every shape is sorted.",de:"Ziehe jede Form in den Korb mit der passenden Eckenzahl. Tippe auf Prüfen, wenn alle Formen sortiert sind.",es:"Arrastra cada figura a la caja que coincide con su número de lados. Toca Revisar cuando todas estén clasificadas.",pt:"Arraste cada figura para a caixa com o número de lados certo. Toque em Conferir quando todas estiverem classificadas.",fr:"Glisse chaque forme dans la boîte qui correspond à son nombre de côtés. Appuie sur Vérifier quand toutes les formes sont triées.",it:"Trascina ogni figura nel contenitore con il numero di lati giusto. Tocca Controlla quando hai ordinato tutte le figure.",nl:"Sleep elke vorm naar de bak met het juiste aantal zijden. Tik op Controleer als alles gesorteerd is.",sv:"Dra varje form till lådan med rätt antal sidor. Tryck på Kontrollera när alla former är sorterade.",da:"Træk hver figur over i den kasse, der passer til dens antal sider. Tryk på Tjek, når alle figurer er sorteret.",no:"Dra hver form til boksen med riktig antall sider. Trykk på Sjekk når alle formene er sortert.",fi:"Vedä jokainen kuvio laatikkoon, jossa on oikea sivujen määrä. Napauta Tarkista, kun kaikki kuviot on lajiteltu."},
    /* the single per-task prompt (no promptArgs — generic across rounds) */
    prompt: {en:"Put each shape in the right bin. Count the sides!",de:"Bring jede Form in den richtigen Korb. Zähle die Ecken!",es:"Pon cada figura en la caja correcta. ¡Cuenta los lados!",pt:"Coloque cada figura na caixa certa. Conte os lados!",fr:"Mets chaque forme dans la bonne boîte. Compte les côtés !",it:"Metti ogni figura nel contenitore giusto. Conta i lati!",nl:"Doe elke vorm in de juiste bak. Tel de zijden!",sv:"Lägg varje form i rätt låda. Räkna sidorna!",da:"Læg hver figur i den rigtige kasse. Tæl siderne!",no:"Legg hver form i riktig boks. Tell sidene!",fi:"Laita jokainen kuvio oikeaan laatikkoon. Laske sivut!"},
    /* family bin labels — sides = 3 / 4 / 5 / 6 */
    binTriangles: {en:"Triangles",de:"Dreiecke",es:"Triángulos",pt:"Triângulos",fr:"Triangles",it:"Triangoli",nl:"Driehoeken",sv:"Trianglar",da:"Trekanter",no:"Trekanter",fi:"Kolmiot"},
    binQuadrilaterals: {en:"Quadrilaterals",de:"Vierecke",es:"Cuadriláteros",pt:"Quadriláteros",fr:"Quadrilatères",it:"Quadrilateri",nl:"Vierhoeken",sv:"Fyrhörningar",da:"Firkanter",no:"Firkanter",fi:"Nelikulmiot"},
    binPentagons: {en:"Pentagons",de:"Fünfecke",es:"Pentágonos",pt:"Pentágonos",fr:"Pentagones",it:"Pentagoni",nl:"Vijfhoeken",sv:"Femhörningar",da:"Femkanter",no:"Femkanter",fi:"Viisikulmiot"},
    binHexagons: {en:"Hexagons",de:"Sechsecke",es:"Hexágonos",pt:"Hexágonos",fr:"Hexagones",it:"Esagoni",nl:"Zeshoeken",sv:"Sexhörningar",da:"Sekskanter",no:"Sekskanter",fi:"Kuusikulmiot"},
    /* try-again hints (returned by the wrapper's hintKey) */
    hintPlaceAll: {en:"Drag every shape into a bin first.",de:"Zieh zuerst jede Form in einen Korb.",es:"Primero arrastra todas las figuras a una caja.",pt:"Primeiro arraste todas as figuras para uma caixa.",fr:"Glisse d'abord toutes les formes dans une boîte.",it:"Prima trascina ogni figura in un contenitore.",nl:"Sleep eerst elke vorm naar een bak.",sv:"Dra först alla former till en låda.",da:"Træk først alle figurer over i en kasse.",no:"Dra først alle formene til en boks.",fi:"Vedä ensin kaikki kuviot laatikoihin."},
    hintSomeWrong: {en:"Some shapes are in the wrong bin — count their sides again.",de:"Manche Formen sind im falschen Korb – zähl noch einmal die Ecken.",es:"Algunas figuras están en la caja equivocada: cuenta otra vez sus lados.",pt:"Algumas figuras estão na caixa errada — conte os lados de novo.",fr:"Certaines formes ne sont pas dans la bonne boîte — recompte leurs côtés.",it:"Alcune figure sono nel contenitore sbagliato: riconta i lati.",nl:"Sommige vormen zitten in de verkeerde bak — tel de zijden opnieuw.",sv:"Några former ligger i fel låda — räkna sidorna igen.",da:"Nogle figurer ligger i den forkerte kasse — tæl siderne igen.",no:"Noen former ligger i feil boks – tell sidene på nytt.",fi:"Jotkin kuviot ovat väärässä laatikossa – laske niiden sivut uudelleen."},
    /* screen-reader: neutral tile noun (naming the family would reveal the
       answer) + pile region label */
    srTile: {en:"shape to sort",de:"Form zum Sortieren",es:"figura para clasificar",pt:"figura para classificar",fr:"forme à trier",it:"figura da ordinare",nl:"vorm om te sorteren",sv:"form att sortera",da:"figur, der skal sorteres",no:"form som skal sorteres",fi:"lajiteltava kuvio"},
    srPile: {en:"shapes to sort",de:"Formen zum Sortieren",es:"figuras para clasificar",pt:"figuras para classificar",fr:"formes à trier",it:"figure da ordinare",nl:"vormen om te sorteren",sv:"former att sortera",da:"figurer, der skal sorteres",no:"former som skal sorteres",fi:"lajiteltavat kuviot"},

    /* ===== DEFINING-ATTRIBUTES MODE (1.G.A.1) — selected by the wrapper when
       the activity id carries `defining-attributes`. The child sorts a mixed
       pile into a target-family box vs a "not" box; the true tiles are the
       target shape drawn in varied COLOUR / SIZE / ORIENTATION (non-defining
       attributes), so the child must recognise the shape by its DEFINING
       attribute (side count), not its look. Positive bin labels REUSE the
       formal-polygon labels above (binTriangles …) per the naming-standard
       doctrine; only the NEGATIVE labels + the title/instruction/prompt/hint
       are new. The 10 non-EN locales are folded in by the per-locale native
       ensemble (§A.13.48 / §A.13.56). Negatives are authored as FULL literal
       phrases per (target, locale) — never a "Not a {shape}" token apposition
       (the case-language trap, esp. Finnish). */
    titleDefining: {en:"Spot the Shape",de:"Welche Form ist das?",es:"Descubre la figura",pt:"Descubra a Figura",fr:"Reconnais la forme",it:"Riconosci la figura",nl:"Welke vorm is het?",sv:"Hitta formen",da:"Find figuren",no:"Finn formen",fi:"Tunnista kuvio"},
    instructionDefining: {en:"A shape stays the same even when its colour, size, or direction changes. Drag each one into the right box, then tap Check.",de:"Eine Form bleibt dieselbe Form – auch wenn sie eine andere Farbe oder Größe hat oder gedreht ist. Ziehe jede Form in den richtigen Korb und tippe dann auf Prüfen.",es:"Una figura sigue siendo la misma aunque cambie de color, de tamaño o de dirección. Arrastra cada una a la caja correcta y luego toca Revisar.",pt:"Uma figura continua a mesma mesmo quando muda de cor, de tamanho ou de direção. Arraste cada uma para a caixa certa e toque em Conferir.",fr:"Une forme reste la même même si sa couleur, sa taille ou son sens changent. Glisse chaque forme dans la bonne boîte, puis appuie sur Vérifier.",it:"Una figura resta la stessa anche se cambia colore, grandezza o direzione. Trascina ognuna nel contenitore giusto, poi tocca Controlla.",nl:"Een vorm blijft dezelfde, ook als de kleur, de grootte of de richting verandert. Sleep elke vorm naar de juiste bak en tik daarna op Controleer.",sv:"En form är likadan även om färgen, storleken eller riktningen ändras. Dra varje form till rätt låda och tryck sedan på Kontrollera.",da:"En figur er den samme, selvom dens farve, størrelse eller retning ændrer sig. Træk hver figur over i den rigtige kasse, og tryk så på Tjek.",no:"En form er den samme selv om fargen, størrelsen eller retningen endrer seg. Dra hver form til riktig boks, og trykk på Sjekk.",fi:"Kuvio pysyy samana, vaikka sen väri, koko tai suunta muuttuu. Vedä jokainen kuvio oikeaan laatikkoon ja napauta sitten Tarkista."},
    promptDefining: {en:"Drag each shape into the right box. Colour and size don't change what it is!",de:"Ziehe jede Form in den richtigen Korb. Farbe und Größe ändern nichts daran, welche Form es ist!",es:"Arrastra cada figura a la caja correcta. ¡El color y el tamaño no cambian lo que es!",pt:"Arraste cada figura para a caixa certa. A cor e o tamanho não mudam o que ela é!",fr:"Glisse chaque forme dans la bonne boîte. La couleur et la taille ne changent rien !",it:"Trascina ogni figura nel contenitore giusto. Il colore e la grandezza non cambiano che cos'è!",nl:"Sleep elke vorm naar de juiste bak. De kleur en de grootte veranderen niet wat het is!",sv:"Dra varje form till rätt låda. Färg och storlek ändrar inte vad det är!",da:"Træk hver figur over i den rigtige kasse. Farve og størrelse ændrer ikke, hvad den er!",no:"Dra hver form til riktig boks. Farge og størrelse endrer ikke hva den er!",fi:"Vedä jokainen kuvio oikeaan laatikkoon. Väri ja koko eivät muuta sitä, mikä kuvio on!"},
    hintSomeWrongDefining: {en:"Some shapes are in the wrong box — look at the number of sides, not the colour or size.",de:"Ein paar Formen liegen im falschen Korb – schau auf die Anzahl der Ecken, nicht auf die Farbe oder die Größe.",es:"Algunas figuras están en la caja equivocada: fíjate en el número de lados, no en el color ni en el tamaño.",pt:"Algumas figuras estão na caixa errada — olhe o número de lados, não a cor nem o tamanho.",fr:"Certaines formes sont dans la mauvaise boîte — regarde le nombre de côtés, pas la couleur ni la taille.",it:"Alcune figure sono nel contenitore sbagliato: guarda il numero di lati, non il colore o la grandezza.",nl:"Sommige vormen zitten in de verkeerde bak — kijk naar het aantal zijden, niet naar de kleur of de grootte.",sv:"Några former ligger i fel låda – titta på antalet sidor, inte på färgen eller storleken.",da:"Nogle figurer ligger i den forkerte kasse — kig på antallet af sider, ikke på farven eller størrelsen.",no:"Noen former ligger i feil boks – se på antall sider, ikke på fargen eller størrelsen.",fi:"Osa kuvioista on väärässä laatikossa – katso sivujen määrää, älä väriä tai kokoa."},
    binNotTriangles: {en:"Not triangles",de:"Keine Dreiecke",es:"No son triángulos",pt:"Não são triângulos",fr:"Pas des triangles",it:"Non sono triangoli",nl:"Geen driehoeken",sv:"Inga trianglar",da:"Ingen trekanter",no:"Ingen trekanter",fi:"Ei kolmioita"},
    binNotQuadrilaterals: {en:"Not quadrilaterals",de:"Keine Vierecke",es:"No son cuadriláteros",pt:"Não são quadriláteros",fr:"Pas des quadrilatères",it:"Non sono quadrilateri",nl:"Geen vierhoeken",sv:"Inga fyrhörningar",da:"Ingen firkanter",no:"Ingen firkanter",fi:"Ei nelikulmioita"},
    binNotPentagons: {en:"Not pentagons",de:"Keine Fünfecke",es:"No son pentágonos",pt:"Não são pentágonos",fr:"Pas des pentagones",it:"Non sono pentagoni",nl:"Geen vijfhoeken",sv:"Inga femhörningar",da:"Ingen femkanter",no:"Ingen femkanter",fi:"Ei viisikulmioita"},
    binNotHexagons: {en:"Not hexagons",de:"Keine Sechsecke",es:"No son hexágonos",pt:"Não são hexágonos",fr:"Pas des hexagones",it:"Non sono esagoni",nl:"Geen zeshoeken",sv:"Inga sexhörningar",da:"Ingen sekskanter",no:"Ingen sekskanter",fi:"Ei kuusikulmioita"}
  },

  defaults: {},
  /* No settings drawer — the sort task has no operator-facing options
     (the shell guards `if (tool.settings && tool.settings.length)`). */

  /* ---- design-system constants (Direction A FRACTION_FIGURES language —
     pale-teal body + deep-teal outline; copied numeric values, NOT imports) ---- */
  _C: { T: '#146B5E', BODY: '#E2F0EC', GOOD: '#1F9D6B', BAD: '#F2784B' },

  /* ---- shape catalog. Every entry's `points` is a closed polygon in a
     0..100 viewBox; `sides` is the literal vertex count (asserted equal by
     scripts/verify-sort-bins-core.js). Multiple DIFFERENT-LOOKING shapes share
     a side count on purpose — the child must COUNT sides, not match one icon
     (the §A.13.60 "genuinely distinct to the child" variety, here within a
     family). Regular polygons are inscribed in r40 @50,50 (math angles, SVG y
     down → subtract sin); irregular shapes are explicit points. ---- */
  _CATALOG: {
    /* 3 sides */
    tri_equi:   { sides: 3, pts: '_reg', a: [90, 210, 330] },
    tri_right:  { sides: 3, pts: [[16,16],[16,86],[86,86]] },
    tri_obtuse: { sides: 3, pts: [[8,70],[92,70],[66,30]] },
    /* 4 sides */
    quad_square: { sides: 4, pts: [[18,18],[82,18],[82,82],[18,82]] },
    quad_rect:   { sides: 4, pts: [[8,28],[92,28],[92,72],[8,72]] },
    quad_rhombus:{ sides: 4, pts: '_reg', a: [90, 0, 270, 180] },
    quad_trap:   { sides: 4, pts: [[26,28],[74,28],[92,78],[8,78]] },
    quad_para:   { sides: 4, pts: [[30,28],[92,28],[70,78],[8,78]] },
    /* 5 sides */
    pent_reg:   { sides: 5, pts: '_reg', a: [90, 162, 234, 306, 18] },
    pent_house: { sides: 5, pts: [[18,46],[50,16],[82,46],[82,84],[18,84]] },
    /* 6 sides */
    hex_reg:    { sides: 6, pts: '_reg', a: [90, 150, 210, 270, 330, 30] },
    hex_irreg:  { sides: 6, pts: [[30,18],[70,18],[90,50],[70,82],[30,82],[10,50]] }
  },

  /* family key → { sides, labelKey } */
  _FAMILY: {
    triangle:      { sides: 3, labelKey: 'binTriangles' },
    quadrilateral: { sides: 4, labelKey: 'binQuadrilaterals' },
    pentagon:      { sides: 5, labelKey: 'binPentagons' },
    hexagon:       { sides: 6, labelKey: 'binHexagons' }
  },

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.mode = 'sides';      // 'sides' (2.G.A.1) | 'defining' (1.G.A.1)
    this.target = null;       // defining mode: the target family key
    this._binDefs = null;     // defining mode: [{labelKey,isTarget}] per bin
    this.bins = ['triangle', 'quadrilateral', 'pentagon'];  // family keys, this round
    this.items = [];          // [{ uid, shapeId, sides, pts }] (+ isTarget/color/scale/rotation in defining mode)
    this.placement = {};      // uid -> binIndex (number) | 'pile'
    this.reviewed = false;    // a failed Check painted marks
    this.readOnly = false;    // wrapper sets true on correct Check
    this._tileEls = {};       // uid -> tile element
    this._binDrops = [];      // binIndex -> drop element
  },

  /* Build one round.
     • sort-by-sides (legacy): opts = { bins:[familyKey], items:[shapeId], seed }.
     • defining-attributes:    opts = { target:familyKey, trueItems:[shapeId],
                                        falseItems:[shapeId], seed }.
     Items are ordered by a seeded shuffle so all 11 locales render an
     identical pile layout. */
  setupTask: function (opts) {
    opts = opts || {};
    this.reviewed = false;
    this.readOnly = false;
    this.placement = {};
    var self = this;

    if (opts.target) {
      /* ---- defining-attributes mode (1.G.A.1) ---- */
      this.mode = 'defining';
      this.target = opts.target;
      var fam = this._FAMILY[opts.target] || this._FAMILY.triangle;
      var posKey = fam.labelKey;                       // e.g. 'binTriangles'
      var negKey = 'binNot' + posKey.slice(3);         // 'binNotTriangles'
      this._binDefs = [
        { labelKey: posKey, isTarget: true },          // bin 0 = the target box
        { labelKey: negKey, isTarget: false }          // bin 1 = the "not" box
      ];
      this.bins = ['__is__', '__not__'];               // length 2 for keyboard nav; NOT family keys
      var raw = (opts.trueItems || []).map(function (id) { return { id: id, isTarget: true }; })
        .concat((opts.falseItems || []).map(function (id) { return { id: id, isTarget: false }; }));
      raw = this._shuffle(raw, opts.seed || 1);
      this.items = raw.map(function (e, i) {
        var cat = self._CATALOG[e.id] || self._CATALOG.tri_equi;
        var uid = e.id + '#' + i;
        self.placement[uid] = 'pile';
        var deco = self._decorate(i, opts.seed || 1);
        return { uid: uid, shapeId: e.id, sides: cat.sides, pts: self._pointsOf(cat),
                 isTarget: e.isTarget, color: deco.color, scale: deco.scale, rotation: deco.rotation };
      });
      return;
    }

    /* ---- sort-by-sides mode (legacy, unchanged) ---- */
    this.mode = 'sides';
    this.target = null;
    this._binDefs = null;
    this.bins = (opts.bins && opts.bins.length) ? opts.bins.slice() : ['triangle', 'quadrilateral', 'pentagon'];
    var ids = (opts.items && opts.items.length) ? opts.items.slice() : [];
    ids = this._shuffle(ids, opts.seed || 1);
    this.items = ids.map(function (shapeId, i) {
      var cat = self._CATALOG[shapeId] || self._CATALOG.tri_equi;
      var uid = shapeId + '#' + i;
      self.placement[uid] = 'pile';
      return { uid: uid, shapeId: shapeId, sides: cat.sides, pts: self._pointsOf(cat) };
    });
  },

  /* resolve a catalog entry to an array of {x,y} points */
  _pointsOf: function (cat) {
    if (cat.pts === '_reg') {
      return cat.a.map(function (d) {
        var r = d * Math.PI / 180;
        return { x: 50 + 40 * Math.cos(r), y: 50 - 40 * Math.sin(r) };
      });
    }
    return cat.pts.map(function (p) { return { x: p[0], y: p[1] }; });
  },

  /* deterministic mulberry32 shuffle (matches the fractions/choice-board
     seeded pattern so the pile order is locale-stable). */
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

  /* ---- defining-attributes mode: non-defining decoration ----
     A small kid palette (distinct from the teal chrome) + a deterministic
     per-(seed,index) pick of colour / size / orientation. These are the
     NON-DEFINING attributes of 1.G.A.1: they are read ONLY by _shapeSVG (the
     look), NEVER by the placement check (isCorrect/paint read side count
     alone), so a red/rotated/small triangle and a blue/upright/large one
     both sort to "Triangles". The build-time gate asserts that invariance. */
  _PALETTE: ['#F2784B', '#3FA7D6', '#5EB95E', '#E6B800', '#B07CC6', '#EC6A88'],
  _decorate: function (index, seed) {
    var s = (((seed | 0) * 0x9E3779B1) + (index + 1) * 0x9E37) >>> 0;
    function rand() {
      s = (s + 0x6D2B79F5) | 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    var color = this._PALETTE[Math.floor(rand() * this._PALETTE.length)];
    var scale = [0.66, 0.77, 0.88][Math.floor(rand() * 3)];   // visibly different sizes (≤0.88 keeps rotation in-box)
    var rotation = Math.floor(rand() * 8) * 45;               // 0,45,…,315
    return { color: color, scale: scale, rotation: rotation };
  },

  /* ---- SVG tile body for a shape's points. `opts` (defining mode only) adds
     non-defining colour/scale/rotation; with NO opts the output is byte-
     identical to the sort-by-sides render (G1 — legacy path unchanged). ---- */
  _shapeSVG: function (pts, opts) {
    var C = this._C;
    var fill = (opts && opts.color) || C.BODY;
    var d = 'M' + pts.map(function (p) { return p.x.toFixed(2) + ' ' + p.y.toFixed(2); }).join(' L') + ' Z';
    var paths = '<path d="' + d + '" fill="' + fill + '"/>'
      + '<path d="' + d + '" fill="none" stroke="' + C.T + '" stroke-width="5" stroke-linejoin="round"/>';
    if (opts && (opts.scale != null || opts.rotation != null)) {
      var s = (opts.scale != null) ? opts.scale : 1;
      var rot = (opts.rotation != null) ? opts.rotation : 0;
      /* scale + rotate about the viewBox centre (50,50): translate→scale→
         rotate→translate-back (SVG applies right-to-left). */
      paths = '<g transform="translate(50 50) rotate(' + rot + ') scale(' + s + ') translate(-50 -50)">' + paths + '</g>';
    }
    return '<svg viewBox="0 0 100 100" class="sb-shape" aria-hidden="true">' + paths + '</svg>';
  },

  /* ---- render(): build pile + bins once per task; tile elements PERSIST
     and are moved between containers on drop (no full re-render). ---- */
  render: function () {
    this.injectCSS();
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';

    var wrap = api.el('div', 'sb-wrap');

    /* pile (top) — also a drop target so tiles can return. Assign this._pile
       BEFORE the tiles loop: _containerFor reads it, and stage.innerHTML=''
       just detached the previous render's pile (appending there = dead DOM). */
    var pile = api.el('div', 'sb-pile');
    pile.setAttribute('aria-label', api.t('srPile'));
    pile.setAttribute('data-bin', 'pile');
    wrap.appendChild(pile);
    this._pile = pile;

    /* bins row */
    var binsRow = api.el('div', 'sb-bins');
    this._binDrops = [];
    this.bins.forEach(function (familyKey, bi) {
      /* defining mode reads the per-bin label from _binDefs (target box vs
         "not" box); sort-by-sides reads the family label (unchanged). */
      var labelKey = (self.mode === 'defining')
        ? self._binDefs[bi].labelKey
        : (self._FAMILY[familyKey] || self._FAMILY.triangle).labelKey;
      var bin = api.el('div', 'sb-bin');
      var label = api.el('div', 'sb-bin-label');
      label.textContent = api.t(labelKey);
      var drop = api.el('div', 'sb-bin-drop');
      drop.setAttribute('data-bin', String(bi));
      drop.setAttribute('role', 'group');
      drop.setAttribute('aria-label', api.t(labelKey));
      bin.append(label, drop);
      binsRow.appendChild(bin);
      self._binDrops[bi] = drop;
    });
    wrap.appendChild(binsRow);

    /* tiles — built once, appended to the container their placement names */
    this._tileEls = {};
    this.items.forEach(function (it) {
      var tile = api.el('div', 'sb-tile');
      tile.setAttribute('data-uid', it.uid);
      tile.setAttribute('role', 'button');
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('aria-label', api.t('srTile'));
      tile.innerHTML = self._shapeSVG(it.pts, (self.mode === 'defining')
        ? { color: it.color, scale: it.scale, rotation: it.rotation } : null);
      self._tileEls[it.uid] = tile;
      self._containerFor(self.placement[it.uid]).appendChild(tile);
      self._wireDrag(tile, it.uid);
    });

    stage.appendChild(wrap);
    this.paint();
  },

  _containerFor: function (where) {
    if (where === 'pile' || where == null) return this._pile || this._binDrops[0];
    return this._binDrops[where] || this._pile;
  },

  /* ---- Pointer-Events drag (mouse + touch parity) ---- */
  _wireDrag: function (tile, uid) {
    var self = this;
    tile.addEventListener('pointerdown', function (e) {
      if (self.readOnly) return;
      if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();
      self.clearReview();
      self._startDrag(tile, uid, e);
    });
    /* keyboard fallback: Enter/Space cycles the tile to the next bin (and
       wraps back to the pile) so the activity is operable without a pointer. */
    tile.addEventListener('keydown', function (e) {
      if (self.readOnly) return;
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      e.preventDefault();
      self.clearReview();
      var cur = self.placement[uid];
      var next = (cur === 'pile') ? 0 : (cur + 1 >= self.bins.length ? 'pile' : cur + 1);
      self._moveTo(uid, next);
      self._tileEls[uid].focus();
    });
  },

  _startDrag: function (tile, uid, e) {
    var self = this;
    var rect = tile.getBoundingClientRect();
    var ghost = document.createElement('div');
    ghost.className = 'sb-ghost';
    ghost.style.width = rect.width + 'px';
    ghost.style.height = rect.height + 'px';
    ghost.innerHTML = tile.innerHTML;
    document.body.appendChild(ghost);
    tile.classList.add('sb-dragging');

    function place(cx, cy) { ghost.style.left = cx + 'px'; ghost.style.top = cy + 'px'; }
    place(e.clientX, e.clientY);

    try { tile.setPointerCapture(e.pointerId); } catch (err) {}
    self._hoverDrop(e.clientX, e.clientY);

    function onMove(ev) { ev.preventDefault(); place(ev.clientX, ev.clientY); self._hoverDrop(ev.clientX, ev.clientY); }
    function onUp(ev) {
      cleanup();
      var target = self._dropTargetAt(ev.clientX, ev.clientY);
      if (target != null) self._moveTo(uid, target);   // null → snap back (no-op)
      self._clearHover();
    }
    function cleanup() {
      tile.removeEventListener('pointermove', onMove);
      tile.removeEventListener('pointerup', onUp);
      tile.removeEventListener('pointercancel', onUp);
      try { tile.releasePointerCapture(e.pointerId); } catch (err) {}
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
      tile.classList.remove('sb-dragging');
    }
    tile.addEventListener('pointermove', onMove);
    tile.addEventListener('pointerup', onUp);
    tile.addEventListener('pointercancel', onUp);
  },

  /* which container is under the pointer? returns binIndex (number), 'pile',
     or null (outside any drop → caller snaps back). */
  _dropTargetAt: function (cx, cy) {
    for (var i = 0; i < this._binDrops.length; i++) {
      if (this._inside(this._binDrops[i], cx, cy)) return i;
    }
    if (this._pile && this._inside(this._pile, cx, cy)) return 'pile';
    return null;
  },
  _inside: function (elm, cx, cy) {
    if (!elm) return false;
    var r = elm.getBoundingClientRect();
    return cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
  },

  /* highlight the drop the pointer is over (during drag) */
  _hoverDrop: function (cx, cy) {
    var t = this._dropTargetAt(cx, cy);
    this._clearHover();
    var elm = (t === 'pile') ? this._pile : (typeof t === 'number' ? this._binDrops[t] : null);
    if (elm) elm.classList.add('sb-dragover');
  },
  _clearHover: function () {
    if (this._pile) this._pile.classList.remove('sb-dragover');
    for (var i = 0; i < this._binDrops.length; i++) this._binDrops[i].classList.remove('sb-dragover');
  },

  /* move a tile to a container + update placement + announce progress */
  _moveTo: function (uid, where) {
    if (this.readOnly) return;
    this.placement[uid] = where;
    var tile = this._tileEls[uid];
    if (tile) this._containerFor(where).appendChild(tile);
    if (this.api && this.api.sound) this.api.sound(where === 'pile' ? 420 : 720);
    if (this.api && this.api.track) this.api.track('sort', { uid: uid, to: where });
    this.paint();
  },

  /* ---- paint(): announce progress; reflect review marks when reviewed ---- */
  paint: function () {
    var placed = this._placedCount(), total = this.items.length;
    if (this.api && this.api.announce) this.api.announce(placed + ' / ' + total);
    for (var i = 0; i < this.items.length; i++) {
      var it = this.items[i], tile = this._tileEls[it.uid];
      if (!tile) continue;
      tile.classList.remove('sb-correct', 'sb-wrong');
      if (this.reviewed) {
        var where = this.placement[it.uid];
        if (where !== 'pile') {
          var right;
          if (this.mode === 'defining') {
            right = ((where === 0) === !!it.isTarget);   // bin 0 = target box
          } else {
            var fam = this._FAMILY[this.bins[where]];
            right = !!(fam && fam.sides === it.sides);
          }
          tile.classList.add(right ? 'sb-correct' : 'sb-wrong');
        }
      }
      if (this.readOnly) tile.classList.add('sb-locked');
      else tile.classList.remove('sb-locked');
    }
  },

  /* paint the green/coral marks (called by the wrapper's check on a fail) */
  review: function () { this.reviewed = true; this.paint(); },
  clearReview: function () { if (this.reviewed) { this.reviewed = false; this.paint(); } },

  _placedCount: function () {
    var n = 0;
    for (var k in this.placement) { if (this.placement.hasOwnProperty(k) && this.placement[k] !== 'pile') n++; }
    return n;
  },

  /* correctness = EVERY tile placed in a bin AND each tile's bin family
     side-count equals the tile's side-count. */
  isCorrect: function () {
    for (var i = 0; i < this.items.length; i++) {
      var it = this.items[i], where = this.placement[it.uid];
      if (where === 'pile' || where == null) return false;
      if (this.mode === 'defining') {
        if (((where === 0) === !!it.isTarget) === false) return false;   // bin 0 = target box
      } else {
        var fam = this._FAMILY[this.bins[where]];
        if (!fam || fam.sides !== it.sides) return false;
      }
    }
    return this.items.length > 0;
  },

  reset: function () {
    for (var i = 0; i < this.items.length; i++) {
      this.placement[this.items[i].uid] = 'pile';
      if (this._pile && this._tileEls[this.items[i].uid]) this._pile.appendChild(this._tileEls[this.items[i].uid]);
    }
    this.reviewed = false; this.readOnly = false; this.paint();
  },

  /* ---- stage CSS — idempotent (safe from both core + wrapper).
     Bins wrap (flex-wrap) so 4 bins fall to 2×2 at ≤~320px instead of
     overflowing (vw sizing per §A.13.47 rule 1; engine CSS uses !important
     per rule 6). Tiles are 48px (≥36px target) with touch-action:none so a
     drag never scrolls the page. ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var C = this._C;
    var css = ''
      + '.sb-wrap{display:flex;flex-direction:column;gap:14px;width:100%;max-width:min(94vw,560px);margin:0 auto;}'
      /* pile — dashed holding area at the top */
      + '.sb-pile{display:flex;flex-wrap:wrap;align-content:flex-start;justify-content:center;gap:8px;'
      +   'min-height:62px;padding:9px 8px;border-radius:16px;'
      +   'background:rgba(20,107,94,.05);border:2px dashed rgba(20,107,94,.28);'
      +   'transition:background .14s var(--lcs-ease),border-color .14s var(--lcs-ease);}'
      /* bins row */
      + '.sb-bins{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
      + '.sb-bin{flex:1 1 0;min-width:74px;max-width:150px;display:flex;flex-direction:column;}'
      + '.sb-bin-label{font:700 13px/1.15 var(--lcs-font-ui,"Nunito",system-ui,sans-serif);'
      +   'color:' + C.T + ';text-align:center;margin:0 0 5px;letter-spacing:.2px;}'
      + '.sb-bin-drop{flex:1;display:flex;flex-wrap:wrap;align-content:flex-start;justify-content:center;'
      +   'gap:6px;min-height:88px;padding:9px 6px;border-radius:16px;'
      +   'background:' + C.BODY + ';border:2px solid rgba(20,107,94,.32);'
      +   'transition:background .14s var(--lcs-ease),border-color .14s var(--lcs-ease);}'
      /* drag-over affordance on whichever drop the pointer hovers */
      + '.sb-pile.sb-dragover,.sb-bin-drop.sb-dragover{border-color:' + C.BAD + ';background:#FBEEE6;}'
      /* tile */
      + '.sb-tile{width:48px;height:48px;flex:0 0 auto;border-radius:10px;cursor:grab;'
      +   'touch-action:none;-webkit-user-select:none;user-select:none;'
      +   'display:flex;align-items:center;justify-content:center;'
      +   'background:#fff;box-shadow:0 1px 3px rgba(20,107,94,.18);'
      +   'transition:box-shadow .12s var(--lcs-ease),transform .12s var(--lcs-ease);}'
      + '.sb-tile:focus-visible{outline:3px solid ' + C.T + ';outline-offset:2px;}'
      + '.sb-tile.sb-dragging{opacity:.32;}'
      + '.sb-shape{width:40px;height:40px;display:block;pointer-events:none;}'
      /* review marks */
      + '.sb-tile.sb-correct{box-shadow:0 0 0 3px ' + C.GOOD + ';}'
      + '.sb-tile.sb-wrong{box-shadow:0 0 0 3px ' + C.BAD + ';animation:sb-shake .34s var(--lcs-ease);}'
      + '.sb-tile.sb-locked{cursor:default;}'
      + '@keyframes sb-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}'
      /* drag ghost (fixed, follows the pointer) */
      + '.sb-ghost{position:fixed;z-index:99999;pointer-events:none;transform:translate(-50%,-50%);'
      +   'border-radius:10px;background:#fff;box-shadow:0 4px 14px rgba(20,107,94,.32);'
      +   'display:flex;align-items:center;justify-content:center;opacity:.95;}'
      + '.sb-ghost .sb-shape{width:40px;height:40px;}'
      + '@media (prefers-reduced-motion: reduce){.sb-tile.sb-wrong{animation:none;}}';
    var tag = document.createElement('style');
    tag.setAttribute('data-sort-bins-core', '');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
