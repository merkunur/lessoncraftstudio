/* =====================================================================
   TOOL #35 — THE FOLDING SHEET   (folding-sheet.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v3 catalog, build #6. The M2 entry, renamed from
   "Mirror Bench" by the operator once the design moved to the fold.

   THE SHEET · THE CREASE · THE FOLD. Three named parts, and nothing
   else in this tool gets a noun.

   THE ROUTINE, which is what makes this an instrument and not a canvas:
     "Paint on the sheet. Put the crease where you think the mirror is.
      Fold it and find out."   ... and then the move that matters:
     "Now try the crease somewhere else."

   THE ONE THESIS — THE CREASE IS A CLAIM AND THE FOLD IS THE TEST.
   "Is it symmetric?" has no answer until you say ALONG WHICH CREASE.
   Two children put the crease in two different places and both fold,
   and the paper settles it. That argument is real, K-2-sized, and it is
   the informal cousin of counting axes — never the count itself.

   ⚠ THE FENCE — TWO SURFACES, AND THE SECOND ONE ALMOST KILLED THIS.
   Interactive: all 204 activities and 37 tools, searched in 11 locales,
   contain ZERO symmetry. (`robin-mirror` is reflexive PRONOUNS, L.2.1.c;
   "halves" everywhere is fair-shares partitioning; "symmetry" in
   number-talk-easel is teacher talk about doubles.) Free.
   PRINTABLE: `scripts/worksheet-gen/` is a SEPARATE ~400-type catalog
   from the 33 REFERENCE APPS, and it already owns four symmetry types —
     K-063  mirror-images     "Circle the picture that shows the mirror
                              image."            (Kindergarten)
     G2-247 line-of-symmetry  "Is the dashed line a mirror line?"
     G2-248 symmetry-pictures "Circle the picture that is the same on
                              both sides."
     G3-342 lines-of-symmetry "Write how many mirror lines each shape
                              has."
   ALL FOUR ARE RECOGNITION — circle the answer on a picture somebody
   else drew. So the whitespace is the GENERATIVE half: here the picture
   is the child's, and the reflection is the child's to commit.

   ⚠ IT IS A TOOL, NEVER AN ACTIVITY, AND THAT IS THE WHOLE ANSWER TO
   THE GRADE-BAND RULING. docs/character-art-spec.md:402 records that
   line-symmetry = 4.G.A.3 is "above the K-2 ceiling, hard-banned", and
   pins it in CI (shapeforge-core.js:220 + verify-shapeforge-core.js:126).
   That ruling is about a GRADED activity's CCSS tag. A free-play tool
   declares no `tasks` and no `nextTask`, so it carries no
   educationalAlignment at all — it claims nothing. And it never counts
   axes, which is the actual 4.G.A.3 content and belongs to G3-342.
   Both halves of that promise are BUILD GATES, not prose: M13 + M14.

   ⚠ NO LETTERS, EVER. "Which letters survive a mirror" belongs to L5
   Reversal Bench (b/d/p/q, hole 89). Putting it here would cannibalise
   a planned tool, so the palette is colours only and the sheet has no
   text layer. Gated (M13).

   THREE INVENTIONS:
     1. THE CREASE IS A CLAIM. The child paints on BOTH halves — the
        freedom to paint an asymmetric blob is exactly what makes the
        fold a test rather than a formality — then commits to where the
        mirror is, and only then folds.
     2. THE FOLD IS A REFLECTION OF REAL DOM, NOT ARITHMETIC. The flap
        is a real copy of the far half, reflected by one CSS matrix
        about the crease, laid over the near half. Its landing position
        is the layout's own answer, never a number this file computed —
        the same trick as class-graph's bar (position:absolute inset:0)
        and place-value-lab.js:2298 `pvl-incoming`.
     3. THE TWIN. Press any cell and its partner across the crease
        lights up; press the twin and the original lights. That is the
        involution, made touchable — a mirror is a MAP, every cell has
        exactly one partner, and the partner of the partner is you.

   ⚠ THE MATERIAL PUSHES BACK OPTICALLY AND NEVER JUDGES. When the sheet
   folds, the far half lands like a transparency: paint over paint reads
   as TWO LAYERS, paint over bare paper reads as ONE LAYER, and two
   different colours make a THIRD THING. Nothing is recoloured, nothing
   is marked, nobody said "wrong". Single-thickness is a property of
   paper, not a verdict. "Matched / mismatched" is banned in all eleven
   locales (M12) — it is a verdict wearing a costume, and the platform
   rule is never verdict colours (choral-counting.js:106).

   ⚠ AN OFF-CENTRE CREASE IS LOSSY ON PURPOSE. Part of the folded half
   hangs off the edge, exactly as paper does. That is a named state, not
   an error: a butterfly drawn in the left third of a page IS symmetric
   about an off-centre line.

   ⚠ STRAIGHT CREASES LIVE IN A GAP, never on a row of cells, so they
   have NO fixed points — which is what makes an off-by-one re-index
   detectable (M4). The two diagonals are centred-only: four directions
   times arbitrary offsets is more knobs than a K-2 tool can carry, and
   corner-to-corner is the fold a child actually makes.

   REFUSES, FOREVER: no score, no timer, no streak · no verdict wording
   or colour · no count of single-layer cells (computed for the gate,
   never rendered — showing it is a score) · NO COUNT OF LINES OF
   SYMMETRY, in any locale · no letters · no themed image assets · no
   right answer, because the tool must never judge.
   ===================================================================== */
var FoldingSheet = {
  id: 'folding-sheet',

  /* ⚠ CURATION: en authored here; the other ten are REPLACED WHOLESALE
     by the per-locale native 3-agent ensembles (§A.13.48) via
     scripts/apply-folding-sheet-locales.js. Until that step runs they
     are builder drafts and must not ship. [NSR-FLAG] sv/da/no/fi.
     pt Brazilian per §6. */
  strings: {
    title:         { en: "The Folding Sheet", de: "Das Faltpapier", fr: "La feuille à plier", es: "La hoja para doblar", pt: "A folha que dobra", it: "Il foglio che si piega", nl: "Het vouwblad", sv: "Vikpappret", da: "Foldearket", no: "Arket vi bretter", fi: "Taittuva paperi" },
    instruction:   { en: "Paint on the sheet. Put the crease where you think the mirror is. Fold it and find out.", de: "Malt auf dem Papier. Legt die Faltlinie dahin, wo ihr den Spiegel vermutet. Faltet und schaut nach.", fr: "Coloriez des carreaux. Placez le pli là où vous pensez que le miroir se trouve. Pliez et regardez.", es: "Coloreen en la hoja. Pongan el doblez donde creen que está el espejo. Doblen y vean qué pasa.", pt: "Pinte na folha. Ponha o vinco onde você acha que está o espelho. Dobre e descubra.", it: "Colora sul foglio. Metti la piega dove pensi che ci sia lo specchio. Piega e scopri.", nl: "Kleur op het blad. Leg de vouw waar je denkt dat de spiegel zit. Vouw het en kijk.", sv: "Måla på pappret. Lägg vikningen där ni tror att spegeln finns. Vik och se efter.", da: "Farvelæg nogle tern på arket. Læg folden der, hvor du tror spejlet er. Fold, og find ud af det.", no: "Fargelegg noen ruter på arket. Legg brettelinjen der du tror speilet er. Brett, og se hva som skjer.", fi: "Väritä ruutuja paperiin. Aseta taite sinne, missä uskot peilin olevan. Taita ja katso, mitä tapahtuu." },
    tryElsewhere:  { en: "Now try the crease somewhere else.", de: "Legt die Faltlinie jetzt woanders hin.", fr: "Maintenant, essayez le pli ailleurs.", es: "Ahora pongan el doblez en otro lugar.", pt: "Agora experimente o vinco em outro lugar.", it: "Ora prova la piega in un altro punto.", nl: "Leg de vouw nu eens ergens anders.", sv: "Prova vikningen på ett annat ställe.", da: "Prøv nu folden et andet sted.", no: "Prøv nå brettelinjen et annet sted.", fi: "Kokeile nyt taitetta toisessa kohdassa." },
    creaseLabel:   { en: "The crease", de: "Die Faltlinie", fr: "Le pli", es: "El doblez", pt: "O vinco", it: "La piega", nl: "De vouw", sv: "Vikningen", da: "Folden", no: "Brettelinjen", fi: "Taite" },
    creaseV:       { en: "Crease up and down", de: "Faltlinie von oben nach unten", fr: "Pli de haut en bas", es: "Doblez de arriba hacia abajo", pt: "Vinco de cima a baixo", it: "Piega dall’alto in basso", nl: "Vouw van boven naar beneden", sv: "Vikning uppifrån och ned", da: "Fold oppefra og ned", no: "Brett ovenfra og ned", fi: "Taite ylhäältä alas" },
    creaseH:       { en: "Crease across", de: "Faltlinie von links nach rechts", fr: "Pli de gauche à droite", es: "Doblez de izquierda a derecha", pt: "Vinco de um lado a outro", it: "Piega da sinistra a destra", nl: "Vouw van links naar rechts", sv: "Vikning på tvären", da: "Fold på tværs", no: "Brett på tvers", fi: "Taite sivulta sivulle" },
    creaseD:       { en: "Crease corner to corner", de: "Faltlinie von Ecke zu Ecke", fr: "Pli d’un coin à l’autre", es: "Doblez de esquina a esquina", pt: "Vinco de um canto a outro", it: "Piega da un angolo all’altro", nl: "Vouw van hoek naar hoek", sv: "Vikning från hörn till hörn", da: "Fold fra hjørne til hjørne", no: "Brett fra hjørne til hjørne", fi: "Taite kulmasta kulmaan" },
    creaseA:       { en: "Crease the other corners", de: "Faltlinie über die anderen Ecken", fr: "Pli sur les autres coins", es: "Doblez por las otras esquinas", pt: "Vinco pelos outros cantos", it: "Piega dagli altri due angoli", nl: "Vouw over de andere hoeken", sv: "Vikning över de andra hörnen", da: "Fold fra de andre hjørner", no: "Brett fra de andre hjørnene", fi: "Taite toisista kulmista" },
    creaseGap:     { en: "Put the crease here", de: "Faltlinie hierher legen", fr: "Placer le pli ici", es: "Poner el doblez aquí", pt: "Ponha o vinco aqui", it: "Metti qui la piega", nl: "Leg de vouw hier", sv: "Lägg vikningen här", da: "Læg folden her", no: "Legg brettelinjen her", fi: "Aseta taite tähän" },
    foldBtn:       { en: "Fold it", de: "Falten", fr: "Plier", es: "Doblar", pt: "Dobrar", it: "Piega", nl: "Vouwen", sv: "Vik", da: "Fold", no: "Brett", fi: "Taita" },
    openBtn:       { en: "Open it out", de: "Aufklappen", fr: "Déplier", es: "Desdoblar", pt: "Abrir", it: "Apri", nl: "Openvouwen", sv: "Vik upp", da: "Fold ud", no: "Brett ut", fi: "Avaa" },
    ghostBtn:      { en: "Show me the mirror", de: "Zeig mir das Spiegelbild", fr: "Montrez-moi le reflet", es: "Muéstrame el reflejo", pt: "Mostrar o espelho", it: "Mostrami lo specchio", nl: "Laat het spiegelbeeld zien", sv: "Visa spegelbilden", da: "Vis mig spejlet", no: "Vis meg speilet", fi: "Näytä peili" },
    ghostHide:     { en: "Hide the mirror", de: "Spiegelbild verstecken", fr: "Cacher le reflet", es: "Ocultar el reflejo", pt: "Esconder o espelho", it: "Nascondi lo specchio", nl: "Spiegelbeeld verbergen", sv: "Dölj spegelbilden", da: "Skjul spejlet", no: "Skjul speilet", fi: "Piilota peili" },
    twoLayers:     { en: "two layers", de: "zwei Lagen", fr: "deux épaisseurs", es: "dos capas", pt: "duas camadas", it: "due strati", nl: "twee lagen", sv: "två lager", da: "to lag", no: "to lag", fi: "kaksi kerrosta" },
    oneLayer:      { en: "one layer", de: "eine Lage", fr: "une épaisseur", es: "una capa", pt: "uma camada", it: "uno strato", nl: "één laag", sv: "ett lager", da: "ét lag", no: "ett lag", fi: "yksi kerros" },
    twoColours:    { en: "two colours together", de: "zwei Farben übereinander", fr: "deux couleurs l’une sur l’autre", es: "dos colores encimados", pt: "duas cores juntas", it: "due colori insieme", nl: "twee kleuren over elkaar", sv: "två färger på varandra", da: "to farver oven på hinanden", no: "to farger oppå hverandre", fi: "kaksi väriä päällekkäin" },
    hangsOff:      { en: "Some of it hangs off the edge.", de: "Ein Stück schaut über den Rand hinaus.", fr: "Une partie dépasse du bord.", es: "Una parte se sale del borde.", pt: "Uma parte fica para fora da folha.", it: "Un pezzo finisce fuori dal foglio.", nl: "Een stukje steekt over de rand.", sv: "En del hänger utanför kanten.", da: "En del af det hænger ud over kanten.", no: "Noe av det havner utenfor arket.", fi: "Osa jää paperin ulkopuolelle." },
    paintLabel:    { en: "Paint", de: "Farbe", fr: "Couleur", es: "Color", pt: "Pintar", it: "Colore", nl: "Kleur", sv: "Färg", da: "Farve", no: "Farge", fi: "Väri" },
    eraser:        { en: "Rubber", de: "Radierer", fr: "Gomme", es: "Borrador", pt: "Borracha", it: "Gomma", nl: "Gum", sv: "Suddgummi", da: "Viskelæder", no: "Viskelær", fi: "Pyyhekumi" },
    cellAria:      { en: "row {r}, column {c}", de: "Zeile {r}, Spalte {c}", fr: "ligne {r}, colonne {c}", es: "fila {r}, columna {c}", pt: "linha {r}, coluna {c}", it: "riga {r}, colonna {c}", nl: "rij {r}, kolom {c}", sv: "rad {r}, kolumn {c}", da: "række {r}, kolonne {c}", no: "rad {r}, kolonne {c}", fi: "rivi {r}, sarake {c}" },
    clear:         { en: "Start again", de: "Neu anfangen", fr: "Recommencer", es: "Empezar de nuevo", pt: "Recomeçar", it: "Ricomincia", nl: "Opnieuw beginnen", sv: "Börja om", da: "Start forfra", no: "Start på nytt", fi: "Aloita alusta" },
    printBtn:      { en: "Print the sheet", de: "Blatt drucken", fr: "Imprimer la feuille", es: "Imprimir la hoja", pt: "Imprimir a folha", it: "Stampa il foglio", nl: "Blad afdrukken", sv: "Skriv ut pappret", da: "Print arket", no: "Skriv ut arket", fi: "Tulosta paperi" },
    gatePrint:     { en: "Printing the sheet is part of the Teacher plan.", de: "Das Drucken gehört zum Lehrer-Paket.", fr: "L’impression fait partie de l’offre Enseignant.", es: "La impresión es parte del plan Docente.", pt: "Imprimir a folha faz parte do plano Professor.", it: "Stampare il foglio fa parte del piano Insegnante.", nl: "Afdrukken hoort bij het Leerkracht-pakket.", sv: "Utskrift ingår i Lärarpaketet.", da: "Print af arket hører til Lærerabonnementet.", no: "Utskrift av arket hører til Lærerabonnementet.", fi: "Paperin tulostaminen kuuluu Opettajan tilaukseen." },
    unlock:        { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", es: "Ver el plan Docente", pt: "Conhecer o plano Professor", it: "Scopri il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Katso Opettajan tilaus" },
    setGuides:     { en: "Show the squares", de: "Kästchen zeigen", fr: "Afficher les carreaux", es: "Mostrar los cuadritos", pt: "Mostrar os quadradinhos", it: "Mostra i quadretti", nl: "Hokjes tonen", sv: "Visa rutorna", da: "Vis ternene", no: "Vis rutene", fi: "Näytä ruudut" },
    emptyNote:    { en: "Paint some squares, then fold.", de: "Malt ein paar Kästchen aus und faltet dann.", fr: "Coloriez quelques carreaux, puis pliez.", es: "Pinten algunos cuadros y luego doblen.", pt: "Pintem alguns quadrados e depois dobrem.", it: "Colorate qualche quadretto, poi piegate.", nl: "Kleur een paar hokjes en vouw dan.", sv: "Måla några rutor och vik sedan.", da: "Mal nogle terner, og fold så.", no: "Mal noen ruter, og brett så.", fi: "Väritä muutama ruutu ja taita sitten." }
  },

  STORE_KEY: 'lcs:folding-sheet:v1',
  ENT_TRUST_DAYS: 14,

  defaults: { guides: true },
  settings: [
    { key: 'guides', type: 'toggle', labelKey: 'setGuides' }
  ],

  premium: false,
  premiumKnown: false,

  /* ⚠ THE SHEET IS SQUARE, AND THAT IS LOAD-BEARING. On a square grid all
     four canonical reflections are EXACT integer index maps, so the model
     is provable rather than approximated — and the two diagonals only
     exist at all because the sheet is square. */
  N: 8,

  /* ⚠ NEVER A VERDICT COLOUR. No red, no green (choral-counting.js:106),
     and no coral — coral is the locked/premium affordance in this suite,
     so paint must not borrow it. */
  COLOURS: ['#146B5E', '#F2C879', '#6B4C9A', '#3E7CB1'],

  KINDS: ['v', 'h', 'd', 'a'],
  GLYPH: { v: '│', h: '─', d: '╲', a: '╱' },
  KIND_LABEL: { v: 'creaseV', h: 'creaseH', d: 'creaseD', a: 'creaseA' },

  /* =================================================================
     THE MODEL — pure, immutable, total. Nothing here touches the DOM.
     ================================================================= */
  newState: function () {
    var n = this.N, paint = [], i;
    for (i = 0; i < n * n; i++) paint.push(null);
    /* opens on the centred vertical crease: the fold every child makes */
    return { n: n, paint: paint, crease: { kind: 'v', k: (n / 2) - 1 }, folded: false, ghosts: false };
  },

  _clone: function (st) {
    var s = st || this.newState();
    return {
      n: s.n, paint: s.paint.slice(),
      crease: { kind: s.crease.kind, k: s.crease.k },
      folded: !!s.folded, ghosts: !!s.ghosts
    };
  },

  /* ⚠ CLAMP, NEVER REJECT. A rejecting guard invites a later edit to
     loosen it, and a build gate that hangs reports nothing at all
     (pattern-bench learned that the hard way). */
  clampCrease: function (n, kind, k) {
    var kk = this.KINDS.indexOf(kind) > -1 ? kind : 'v';
    var kn = (typeof k === 'number' && isFinite(k)) ? Math.round(k) : 0;
    if (kk === 'd' || kk === 'a') return { kind: kk, k: 0 };   /* centred only */
    if (kn < 0) kn = 0;
    if (kn > n - 2) kn = n - 2;
    return { kind: kk, k: kn };
  },

  /* the partner of a cell across the crease, or -1 when it lands off the
     sheet. THE definition everything else is measured against. */
  mirrorIdx: function (st, idx) {
    var n = st.n, x = st.crease;
    if (!(idx >= 0 && idx < n * n)) return -1;
    var r = Math.floor(idx / n), c = idx % n, nr, nc;
    if (x.kind === 'v')      { nr = r;                nc = 2 * x.k + 1 - c; }
    else if (x.kind === 'h') { nr = 2 * x.k + 1 - r;  nc = c; }
    else if (x.kind === 'd') { nr = c;                nc = r; }
    else                     { nr = n - 1 - c;        nc = n - 1 - r; }
    if (nr < 0 || nr > n - 1 || nc < 0 || nc > n - 1) return -1;
    return nr * n + nc;
  },

  hasPartner: function (st, idx) { return this.mirrorIdx(st, idx) >= 0; },

  /* a cell the crease passes through: its own partner. Only the two
     diagonals have these — the straight creases sit in a GAP between
     columns/rows and fix nothing, which is what makes an off-by-one
     re-index detectable. */
  onCrease: function (st, idx) { return this.mirrorIdx(st, idx) === idx; },

  /* the half that stays put when the sheet folds */
  isNear: function (st, idx) {
    var n = st.n, x = st.crease, r = Math.floor(idx / n), c = idx % n;
    if (x.kind === 'v') return c <= x.k;
    if (x.kind === 'h') return r <= x.k;
    if (x.kind === 'd') return r >= c;
    return r + c <= n - 1;
  },

  setCrease: function (st, kind, k) {
    var next = this._clone(st);
    /* ⚠ THE PAINT IS NOT TOUCHED. Moving the crease is trying a new
       claim, and it must cost the child nothing — this is the
       class-graph setSetup-clears-the-votes trap, pre-empted (M10). */
    next.crease = this.clampCrease(next.n, kind, k);
    next.folded = false;
    return next;
  },

  paintAt: function (st, idx, colour) {
    var next = this._clone(st);
    if (!(idx >= 0 && idx < next.n * next.n)) return next;
    if (colour === null) { next.paint[idx] = null; return next; }
    var ci = (typeof colour === 'number' && isFinite(colour)) ? Math.round(colour) : 0;
    if (ci < 0) ci = 0;
    if (ci > this.COLOURS.length - 1) ci = this.COLOURS.length - 1;
    next.paint[idx] = ci;
    return next;
  },

  fold: function (st) { var n = this._clone(st); n.folded = true; return n; },
  open: function (st) { var n = this._clone(st); n.folded = false; return n; },
  setGhosts: function (st, on) { var n = this._clone(st); n.ghosts = !!on; return n; },

  clear: function (st) {
    var next = this._clone(st), i;
    for (i = 0; i < next.paint.length; i++) next.paint[i] = null;
    next.folded = false; next.ghosts = false;
    return next;
  },

  /* ⚠ WHAT THE CHILD SEES WHEN IT FOLDS, and the ONLY vocabulary this
     tool owns for it: 'two' (paint over paint), 'one' (paint over bare
     paper, single thickness), 'twotone' (two different colours — a
     third thing, neither of the other two), 'crease' (a cell the fold
     runs through: single thickness because nothing lands on it), and
     'none'. NOT "matched" and NOT "mismatched". */
  layerAt: function (st, idx) {
    var self = st.paint[idx], m = this.mirrorIdx(st, idx);
    if (m === idx) return { kind: self === null ? 'none' : 'crease', count: self === null ? 0 : 1 };
    var other = (m < 0) ? null : st.paint[m];
    if (self === null && other === null) return { kind: 'none', count: 0 };
    if (self === null || other === null) return { kind: 'one', count: 1 };
    if (self !== other) return { kind: 'twotone', count: 2 };
    return { kind: 'two', count: 2 };
  },

  /* the far cells whose image lands off the sheet — "it hangs off the
     edge", a named state of paper, never an error */
  overhang: function (st) {
    var out = [], i, tot = st.n * st.n;
    for (i = 0; i < tot; i++) if (!this.isNear(st, i) && this.mirrorIdx(st, i) < 0) out.push(i);
    return out;
  },

  /* every missing partner of a painted cell — the mirror the child has
     not drawn yet. Tapping one makes it real.

     ⚠ GHOSTS COMPLETE; THEY DO NOT CORRECT. A ghost is an ABSENCE. A cell
     painted red whose partner is painted blue has no missing partner, so
     nothing is suggested there and committing every ghost still leaves
     the disagreement standing — as it must, because overwriting a child's
     colour to make the sheet come out right would be the tool judging.
     The gate states this as an IFF (M9); its first draft asserted the
     stronger "always symmetric" and was simply wrong about the tool. */
  ghostsOf: function (st) {
    var out = [], seen = {}, i, m, tot = st.n * st.n;
    for (i = 0; i < tot; i++) {
      if (st.paint[i] === null) continue;
      m = this.mirrorIdx(st, i);
      if (m < 0 || m === i) continue;
      if (st.paint[m] !== null) continue;
      if (seen[m]) continue;
      seen[m] = 1; out.push(m);
    }
    return out;
  },

  commitGhosts: function (st) {
    var next = this._clone(st), g = this.ghostsOf(st), i, m;
    for (i = 0; i < g.length; i++) {
      m = this.mirrorIdx(st, g[i]);
      if (m >= 0) next.paint[g[i]] = st.paint[m];
    }
    return next;
  },

  /* ⚠ FOR THE GATE ONLY — NEVER RENDERED, NEVER SPOKEN, NEVER COUNTED ON
     SCREEN. A number here would be a score, and this tool does not score.
     M6 proves: symmetric <=> no 'one' and no 'twotone' off the crease. */
  isSymmetric: function (st) {
    var i, m, tot = st.n * st.n;
    for (i = 0; i < tot; i++) {
      m = this.mirrorIdx(st, i);
      if (m < 0) { if (st.paint[i] !== null) return false; continue; }
      if (st.paint[i] !== st.paint[m]) return false;
    }
    return true;
  },

  singlesCount: function (st) {
    var i, k, tot = st.n * st.n, c = 0;
    for (i = 0; i < tot; i++) {
      k = this.layerAt(st, i).kind;
      if (k === 'one' || k === 'twotone') c++;
    }
    return c;
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectFoldingSheetCSS();
    document.body.classList.add('fsh-wide');
    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this.st = this.newState();
    this._colour = 0;
    this._twin = -1;
    this._lastK = (this.N / 2) - 1;
    this._timers = [];
    this._fetchEntitlement();
    this.render();
  },

  onSettings: function () { this._store.settings = this.api.settings; this._saveStore(); this.render(); },

  reset: function () {
    this.st = this.clear(this.st);
    this._colour = 0;
    this._twin = -1;
    this.render();
  },

  destroy: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
    document.body.classList.remove('fsh-wide');
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  _loadStore: function () {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY) || '{}') || {}; } catch (_) { s = {}; }
    return s;
  },
  _saveStore: function () {
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {}
  },

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

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'fsh-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildCreaseBar());
    wrap.appendChild(this._buildSheet());
    wrap.appendChild(this._buildNote());
    wrap.appendChild(this._buildPalette());
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
  },

  _chip: function (label, on, fn, extra) {
    var b = this.api.el('button', 'fsh-chip' + (on ? ' fsh-on' : '') + (extra ? ' ' + extra : ''));
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  },

  _buildCreaseBar: function () {
    var api = this.api, self = this;
    var bar = api.el('div', 'fsh-toolbar');
    var lab = api.el('span', 'fsh-barlab');
    lab.textContent = api.t('creaseLabel');
    bar.appendChild(lab);
    /* ⚠ GLYPHS, NOT WORDS. A picture has nothing to translate and nothing
       to wrap, which makes this row structurally immune to the long-
       German-chip defect class that shipped four broken locales on
       Reading Easel. The label lives in aria-label, per locale. */
    this.KINDS.forEach(function (kind) {
      var b = self._chip(self.GLYPH[kind], self.st.crease.kind === kind, function () {
        /* ⚠ REMEMBER WHERE THE CHILD PUT IT. The model clamps a diagonal
           to the centre (k=0), so without this a trip through a diagonal
           and back would silently drop a straight crease onto the far
           edge — the child's claim moved and nobody moved it. Caught by
           the L2 fold measurement at desktop, not by any model check. */
        var cur = self.st.crease;
        if (cur.kind === 'v' || cur.kind === 'h') self._lastK = cur.k;
        var k = (kind === 'v' || kind === 'h')
          ? (typeof self._lastK === 'number' ? self._lastK : (self.st.n / 2) - 1)
          : 0;
        self.st = self.setCrease(self.st, kind, k);
        self._twin = -1;
        self.render();
      }, 'fsh-glyph');
      b.setAttribute('aria-label', api.t(self.KIND_LABEL[kind]));
      b.setAttribute('aria-pressed', String(self.st.crease.kind === kind));
      bar.appendChild(b);
    });
    var sp = api.el('span', 'fsh-sep');
    bar.appendChild(sp);
    if (this.st.folded) {
      bar.appendChild(this._chip(api.t('openBtn'), false, function () {
        self.st = self.open(self.st); self.render();
      }));
    } else {
      bar.appendChild(this._chip(api.t('foldBtn'), false, function () {
        self.st = self.fold(self.st); self.render();
      }));
    }
    bar.appendChild(this._chip(api.t(this.st.ghosts ? 'ghostHide' : 'ghostBtn'), this.st.ghosts, function () {
      self.st = self.setGhosts(self.st, !self.st.ghosts);
      self.render();
    }));
    return bar;
  },

  _cellEl: function (idx, opts) {
    var api = this.api, n = this.st.n;
    var r = Math.floor(idx / n), c = idx % n;
    var b = api.el('button', 'fsh-cell' + (opts && opts.extra ? ' ' + opts.extra : ''));
    b.type = 'button';
    b.setAttribute('data-i', String(idx));
    b.setAttribute('aria-label', api.t('cellAria').replace('{r}', String(r + 1)).replace('{c}', String(c + 1)));
    var v = this.st.paint[idx];
    /* ⚠ backgroundColor, NOT the background SHORTHAND. The shorthand
       resets background-image, and an inline style beats the stylesheet,
       so setting .background here silently erased the two-colour stripe
       pattern and a disagreement rendered as a flat block. Visible only
       in the render; every assertion was green. */
    if (v !== null) b.style.backgroundColor = this.COLOURS[v];
    return b;
  },

  _buildSheet: function () {
    var api = this.api, self = this, n = this.st.n, x = this.st.crease;
    var box = api.el('div', 'fsh-sheetbox');
    var sheet = api.el('div', 'fsh-sheet' + (this.api.settings.guides ? ' fsh-guides' : '')
      + (this.st.folded ? ' fsh-folded' : ''));
    sheet.style.setProperty('--fsh-n', String(n));
    if (this.st.folded) sheet.style.clipPath = this._foldClip();

    var ghosts = this.st.ghosts && !this.st.folded ? this.ghostsOf(this.st) : [];
    var ghostSet = {};
    ghosts.forEach(function (g) { ghostSet[g] = 1; });

    var i, tot = n * n;
    for (i = 0; i < tot; i++) {
      var near = this.isNear(this.st, i);
      var extra = near ? 'fsh-near' : 'fsh-far';
      if (this.st.folded && !near) extra += ' fsh-hidden';
      if (this.st.folded && near) {
        var L = this.layerAt(this.st, i);
        extra += ' fsh-l-' + L.kind;
      }
      if (this._twin >= 0 && (i === this._twin || i === this.mirrorIdx(this.st, this._twin))) extra += ' fsh-twin';
      if (ghostSet[i]) extra += ' fsh-ghost';
      var cell = this._cellEl(i, { extra: extra });
      if (ghostSet[i]) {
        var srcG = this.mirrorIdx(this.st, i);
        if (srcG >= 0 && this.st.paint[srcG] !== null) cell.style.borderColor = this.COLOURS[this.st.paint[srcG]];
      }
      (function (idx) {
        cell.addEventListener('click', function () {
          if (self.st.folded) { self._showTwin(idx); return; }
          if (ghostSet[idx]) {
            var src = self.mirrorIdx(self.st, idx);
            self.st = self.paintAt(self.st, idx, src >= 0 ? self.st.paint[src] : self._colour);
          } else {
            self.st = self.paintAt(self.st, idx, self._colour === null ? null : self._colour);
          }
          self.render();
        });
      }(i));
      sheet.appendChild(cell);
    }

    /* THE FLAP — a real copy of the far half, reflected by ONE CSS matrix
       about the crease and laid over the near half. Its landing place is
       the layout's answer, never a number this file worked out. */
    if (this.st.folded) {
      var flap = api.el('div', 'fsh-flap');
      flap.style.setProperty('--fsh-n', String(n));
      flap.style.transform = this._flapTransform();
      flap.style.transformOrigin = this._flapOrigin();
      for (i = 0; i < tot; i++) {
        var fc = this._cellEl(i, { extra: this.isNear(this.st, i) ? 'fsh-blank' : 'fsh-flapcell' });
        if (this.isNear(this.st, i)) fc.style.backgroundColor = '';
        flap.appendChild(fc);
      }
      sheet.appendChild(flap);
    }

    /* the crease itself + the gap handles that move it */
    sheet.appendChild(this._buildCreaseLine());
    if (x.kind === 'v' || x.kind === 'h') sheet.appendChild(this._buildGaps());

    box.appendChild(sheet);
    return box;
  },

  /* ⚠ EXACT REFLECTIONS, WRITTEN AS MATRICES ABOUT THE CREASE.
     v: scaleX(-1) about the gap line   h: scaleY(-1) about the gap line
     d: (u,v)->(v,u) about the centre   a: (u,v)->(-v,-u) about the centre
     The two diagonals are only exact because the sheet is SQUARE. */
  _flapTransform: function () {
    var k = this.st.crease.kind;
    if (k === 'v') return 'scaleX(-1)';
    if (k === 'h') return 'scaleY(-1)';
    if (k === 'd') return 'matrix(0,1,1,0,0,0)';
    return 'matrix(0,-1,-1,0,0,0)';
  },
  _flapOrigin: function () {
    var x = this.st.crease, n = this.st.n, p = ((x.k + 1) / n * 100).toFixed(6) + '%';
    if (x.kind === 'v') return p + ' 50%';
    if (x.kind === 'h') return '50% ' + p;
    return '50% 50%';
  },

  /* ⚠ A FOLDED SHEET IS NARROWER — clip the far half away entirely.
     Without this the far region stays on screen as a blank white
     rectangle and the sheet reads as BROKEN rather than folded: half
     squared paper, half nothing. Paper that has been folded shows you
     the near half and an open edge at the crease, so that is what this
     draws. Exact, and per crease: a rectangle for the straight folds and
     a triangle for the two diagonals. Found by LOOKING at the render —
     every measurement was already green. */
  _foldClip: function () {
    var x = this.st.crease, n = this.st.n, far = (1 - (x.k + 1) / n) * 100;
    if (x.kind === 'v') return 'inset(0 ' + far.toFixed(4) + '% 0 0)';
    if (x.kind === 'h') return 'inset(0 0 ' + far.toFixed(4) + '% 0)';
    if (x.kind === 'd') return 'polygon(0 0, 100% 100%, 0 100%)';
    return 'polygon(0 0, 100% 0, 0 100%)';
  },

  _buildCreaseLine: function () {
    var api = this.api, x = this.st.crease, n = this.st.n;
    var line = api.el('div', 'fsh-crease fsh-crease-' + x.kind);
    var pct = ((x.k + 1) / n * 100).toFixed(6) + '%';
    if (x.kind === 'v') line.style.left = pct;
    else if (x.kind === 'h') line.style.top = pct;
    return line;
  },

  _buildGaps: function () {
    var api = this.api, self = this, n = this.st.n, x = this.st.crease;
    var layer = api.el('div', 'fsh-gaps fsh-gaps-' + x.kind);
    var i;
    for (i = 0; i <= n - 2; i++) {
      var b = api.el('button', 'fsh-gap' + (i === x.k ? ' fsh-gapon' : ''));
      b.type = 'button';
      var pct = ((i + 1) / n * 100).toFixed(6) + '%';
      if (x.kind === 'v') b.style.left = pct; else b.style.top = pct;
      b.setAttribute('aria-label', api.t('creaseGap'));
      b.setAttribute('aria-pressed', String(i === x.k));
      (function (kk) {
        b.addEventListener('click', function () {
          self.st = self.setCrease(self.st, self.st.crease.kind, kk);
          self._lastK = self.st.crease.k;
          self._twin = -1;
          self.render();
        });
        b.addEventListener('keydown', function (e) {
          var d = (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1
            : (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : 0;
          if (!d) return;
          e.preventDefault();
          self.st = self.setCrease(self.st, self.st.crease.kind, self.st.crease.k + d);
          self._lastK = self.st.crease.k;
          self._twin = -1;
          self.render();
        });
      }(i));
      layer.appendChild(b);
    }
    return layer;
  },

  _showTwin: function (idx) {
    var self = this;
    this._twin = idx;
    this.render();
    this._after(1400, function () { if (self._twin === idx) { self._twin = -1; self.render(); } });
  },

  _buildNote: function () {
    var api = this.api;
    var note = api.el('div', 'fsh-note');
    var painted = this.st.paint.some(function (v) { return v !== null; });
    if (!painted) { note.textContent = api.t('emptyNote'); return note; }
    if (this.st.folded) {
      /* ⚠ A LEGEND OF WHAT PAPER DOES — never a count, never a verdict.
         The child reads the sheet; this only names what they are seeing. */
      var legend = api.el('div', 'fsh-legend');
      [['two', 'twoLayers'], ['one', 'oneLayer'], ['twotone', 'twoColours']].forEach(function (pair) {
        var item = api.el('span', 'fsh-leg');
        var sw = api.el('span', 'fsh-legsw fsh-l-' + pair[0]);
        var tx = api.el('span', 'fsh-legtx');
        tx.textContent = api.t(pair[1]);
        item.append(sw, tx);
        legend.appendChild(item);
      });
      note.appendChild(legend);
      if (this.overhang(this.st).some(function (i) { return true; })) {
        var oh = api.el('div', 'fsh-hint');
        oh.textContent = api.t('hangsOff');
        note.appendChild(oh);
      }
    } else {
      note.textContent = api.t('tryElsewhere');
    }
    return note;
  },

  _buildPalette: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'fsh-palette');
    var lab = api.el('span', 'fsh-barlab');
    lab.textContent = api.t('paintLabel');
    box.appendChild(lab);
    this.COLOURS.forEach(function (col, i) {
      var b = api.el('button', 'fsh-swatch' + (self._colour === i ? ' fsh-on' : ''));
      b.type = 'button';
      b.style.background = col;
      b.setAttribute('aria-label', api.t('paintLabel') + ' ' + (i + 1));
      b.setAttribute('aria-pressed', String(self._colour === i));
      b.addEventListener('click', function () { self._colour = i; self.render(); });
      box.appendChild(b);
    });
    var er = this._chip(api.t('eraser'), this._colour === null, function () {
      self._colour = null; self.render();
    }, 'fsh-eraser');
    er.setAttribute('aria-pressed', String(this._colour === null));
    box.appendChild(er);
    return box;
  },

  _buildFoot: function () {
    var api = this.api, self = this;
    var foot = api.el('div', 'fsh-foot');
    foot.appendChild(this._chip(api.t('clear'), false, function () { self.reset(); }));
    var pr = this._chip(api.t('printBtn'), false, function () {
      if (!self.premium) { self._gateInline(foot, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    }, this.premium ? '' : 'fsh-locked');
    foot.appendChild(pr);
    return foot;
  },

  _gateInline: function (host, key) {
    var api = this.api;
    if (!host || !this._wrap) return;
    var old = this._wrap.querySelector('.fsh-gate');
    if (old) old.remove();
    var g = api.el('div', 'fsh-gate');
    var s = api.el('span');
    s.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-folding-sheet';
    a.target = '_top'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(s, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  }
};

function injectFoldingSheetCSS() {
  if (document.getElementById('fsh-style')) return;
  var st = document.createElement('style');
  st.id = 'fsh-style';
  st.textContent = ''
    + '.fsh-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
    + '.fsh-toolbar,.fsh-palette,.fsh-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;}'
    + '.fsh-barlab{font:600 14px/1.2 Nunito,system-ui,sans-serif;color:#146B5E;opacity:.85;}'
    + '.fsh-sep{width:10px;}'
    + '.fsh-chip{min-height:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;'
    +   'background:#FFFDF8;color:#146B5E;font:600 15px/1.15 Nunito,system-ui,sans-serif;cursor:pointer;}'
    + '.fsh-chip:hover{background:#F3EADA;}'
    + '.fsh-chip:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    + '.fsh-on{background:#146B5E;color:#FFFDF8;}'
    + '.fsh-glyph{min-width:44px;font-size:19px;line-height:1;padding:8px 10px;}'
    + '.fsh-locked{border-style:dashed;border-color:#F2784B;color:#F2784B;}'
    /* THE SHEET — a square of squared paper */
    + '.fsh-sheetbox{width:100%;display:flex;justify-content:center;}'
    + '.fsh-sheet{position:relative;display:grid;'
    +   'grid-template-columns:repeat(var(--fsh-n,8),1fr);'
    +   'grid-template-rows:repeat(var(--fsh-n,8),1fr);'
    +   'width:min(92vw,calc(var(--fsh-cell) * var(--fsh-n,8)));aspect-ratio:1/1;'
    +   'background:#FFFDF8;border:2px solid #E0D5C0;border-radius:6px;'
    +   'box-shadow:0 2px 0 #E0D5C0;}'
    /* ⚠ CELL FLOOR 34px, NOT 44. A paint cell is canvas, not a control —
       the same call calendar-wall.js:1423 makes for its month grid
       (clamp(38px,...)). Every CONTROL in this tool holds 44px; the two
       categories are measured separately and neither threshold moves. */
    + '.fsh-sheet{--fsh-cell:clamp(34px,10.4vmin,58px);}'
    + '.fsh-cell{padding:0;margin:0;border:1px solid transparent;background:transparent;'
    +   'position:relative;'
    +   'cursor:pointer;min-width:0;min-height:0;border-radius:2px;}'
    + '.fsh-guides .fsh-cell{border-color:#EDE4D3;}'
    + '.fsh-cell:focus-visible{outline:3px solid #146B5E;outline-offset:-3px;z-index:4;}'
    + '.fsh-hidden{visibility:hidden;}'
    /* ⚠ THE FOLD, AS LAYERS OF PAPER RATHER THAN A VERDICT — and the
       difference has to read as TWO versus ONE, not as full versus
       faded, or a pale cell starts to look like a mark against the
       child. So two layers carries a visible DOUBLED RIM in the paper
       colour (legible over any paint), and one layer is simply less ink,
       which is what one thickness of paint actually is. The first pass
       used a 2px rim in the paint's own colour and it was invisible —
       every measurement was green and the render showed it plainly. */
    + '.fsh-l-two{z-index:3;box-shadow:inset 0 0 0 3px rgba(255,253,248,.92),'
    +   'inset 0 0 0 4px rgba(90,83,72,.22);}'
    + '.fsh-l-one{opacity:.4;}'
    + '.fsh-l-twotone{z-index:3;background-image:repeating-linear-gradient(45deg,'
    +   'rgba(255,253,248,.92) 0 4px,rgba(255,253,248,0) 4px 9px);}'
    + '.fsh-l-crease{box-shadow:inset 0 0 0 1px rgba(224,213,192,.9);}'
    + '.fsh-legend{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;}'
    + '.fsh-leg{display:inline-flex;align-items:center;gap:6px;'
    +   'font:600 14px/1.25 Nunito,system-ui,sans-serif;color:#5A5348;}'
    /* ⚠ each legend swatch must SHOW its own state. The first pass reused
       the cell classes and rendered "two layers" and "two colours
       together" as two identical teal squares — a legend that cannot
       tell its own terms apart is worse than no legend at all. */
    + '.fsh-legsw{width:19px;height:19px;border-radius:3px;display:inline-block;'
    +   'background:#146B5E;flex:0 0 auto;}'
    + '.fsh-legsw.fsh-l-two{box-shadow:inset 0 0 0 3px rgba(255,253,248,.92),'
    +   'inset 0 0 0 4px rgba(90,83,72,.22);}'
    + '.fsh-legsw.fsh-l-twotone{background:linear-gradient(135deg,#146B5E 50%,#6B4C9A 50%);'
    +   'background-image:repeating-linear-gradient(45deg,rgba(255,253,248,.92) 0 3px,'
    +   'rgba(255,253,248,0) 3px 7px),linear-gradient(135deg,#146B5E 50%,#6B4C9A 50%);}'
    /* THE FLAP — the far half, reflected, laid over the near half */
    + '.fsh-flap{position:absolute;inset:0;display:grid;'
    +   'grid-template-columns:repeat(var(--fsh-n,8),1fr);'
    +   'grid-template-rows:repeat(var(--fsh-n,8),1fr);'
    +   'pointer-events:none;opacity:.4;'
    +   'transition:transform .42s cubic-bezier(.4,0,.2,1),opacity .42s;}'
    + '.fsh-blank{background:transparent!important;border-color:transparent!important;}'
    /* THE CREASE */
    + '.fsh-crease{position:absolute;pointer-events:none;z-index:3;}'
    + '.fsh-crease-v{top:-4px;bottom:-4px;width:0;border-left:3px dashed #F2784B;transform:translateX(-1.5px);}'
    + '.fsh-crease-h{left:-4px;right:-4px;height:0;border-top:3px dashed #F2784B;transform:translateY(-1.5px);}'
    /* ⚠ A LINEAR-GRADIENT'S COLOUR BANDS RUN PERPENDICULAR TO ITS
       DIRECTION, so the axis has to be the OTHER diagonal: `to top
       right` draws a band along the MAIN diagonal, `to bottom right`
       draws one along the ANTI-diagonal. The first pass had them
       swapped and the crease was drawn across the corner it was not
       folding on — the clip was right, the line was a lie. Only the
       diagonal render showed it. Exact here because the sheet is
       square, so corner-to-corner really is 45 degrees. */
    + '.fsh-crease-d{inset:0;background:linear-gradient(to top right,transparent calc(50% - 1.5px),'
    +   '#F2784B calc(50% - 1.5px),#F2784B calc(50% + 1.5px),transparent calc(50% + 1.5px));}'
    + '.fsh-crease-a{inset:0;background:linear-gradient(to bottom right,transparent calc(50% - 1.5px),'
    +   '#F2784B calc(50% - 1.5px),#F2784B calc(50% + 1.5px),transparent calc(50% + 1.5px));}'
    /* THE GAP HANDLES — tap the gap; a tap is a commitment, a drag is not */
    + '.fsh-gaps{position:absolute;inset:0;z-index:5;pointer-events:none;}'
    + '.fsh-gap{position:absolute;background:transparent;border:0;padding:0;cursor:pointer;'
    +   'pointer-events:auto;border-radius:6px;}'
    + '.fsh-gaps-v .fsh-gap{top:0;bottom:0;width:44px;transform:translateX(-22px);}'
    + '.fsh-gaps-h .fsh-gap{left:0;right:0;height:44px;transform:translateY(-22px);}'
    + '.fsh-gap:hover{background:rgba(242,120,75,.13);}'
    + '.fsh-gap:focus-visible{outline:3px solid #F2784B;outline-offset:-3px;}'
    /* THE GHOSTS — outline, never fill: a suggestion, not a mark */
    + '.fsh-ghost{border:2px dashed #B9AC95;background:transparent;}'
    + '.fsh-twin{box-shadow:0 0 0 3px #F2C879;z-index:6;}'
    + '.fsh-swatch{width:44px;height:44px;border-radius:12px;border:3px solid #FFFDF8;'
    +   'box-shadow:0 0 0 2px #E0D5C0;cursor:pointer;}'
    + '.fsh-swatch.fsh-on{box-shadow:0 0 0 3px #146B5E;}'
    + '.fsh-swatch:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
    + '.fsh-note{min-height:22px;text-align:center;'
    +   'font:600 14px/1.35 Nunito,system-ui,sans-serif;color:#5A5348;}'
    + '.fsh-hint{margin-top:4px;font-weight:600;color:#8A7E6B;}'
    + '.fsh-gate{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;'
    +   'margin:6px 0;padding:8px 12px;border-radius:12px;background:#FDF1E7;'
    +   'font:600 14px/1.3 Nunito,system-ui,sans-serif;color:#8A4B2A;}'
    + '.fsh-gate a{color:#F2784B;font-weight:700;}'
    /* the sanctioned shell scope both siblings use: stack the header, and
       let a phone SCROLL rather than clipping the sheet */
    + 'body.fsh-wide .lcs-header{flex-direction:column;}'
    + '@media (max-width:700px){body.fsh-wide{overflow-y:auto;overflow-x:hidden;'
    +   'height:auto;min-height:100%;}}'
    /* ⚠ REDUCED MOTION COMPRESSES, IT DOES NOT SKIP. The fold IS the
       content; removing it removes the lesson for the children who most
       need a steady one. (class-graph + rekenrek.js:2124,
       degrade-rather-than-delete.) */
    + '@media (prefers-reduced-motion:reduce){.fsh-flap{transition-duration:.12s;}}'
    /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
       The sheet is a square of N x N cells sized by --fsh-cell, so ONE number
       carries it: the grid, the fold guides and the painted squares all follow.
       ⚠ ITS CEILING IS THE HEIGHT, NOT THE WIDTH — `aspect-ratio:1/1` means
       every pixel of width is a pixel of height, the arrow-strip case. The
       tiers are therefore sized against the tier's own MINIMUM height, and the
       `10.4vmin` middle term is raised with the ceiling or the ceiling never
       engages (10.4vmin is 90px at 1440, so a raised ceiling alone would have
       been dead). The 34px cell FLOOR is untouched — it is a canvas floor, not
       a control floor, and the two are measured separately. */
    /* ⚠ TIER A RAISES THE CARD AND NOTHING ELSE, ON PURPOSE. The grid is a
       FIXED 8x8 (N:149) and `aspect-ratio:1/1`, so sheet height is 8 x cell
       and the chrome around it measures ~420px — at the tier-A floor of 880
       that leaves 450px, i.e. a 56px cell, BELOW the 58px the tool already
       has. There is no room at 880 tall; raising the cell here cut nine cells
       across de/it/fi. Even the chip ramp costs height, so it starts at B. */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.fsh-wide .lcs-app{max-width:min(1192px,96vw);}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.fsh-wide .lcs-app{max-width:min(1560px,96vw);}'
    +   'body.fsh-wide .fsh-sheet{--fsh-cell:clamp(34px,11.5vmin,78px);}'
    +   'body.fsh-wide .fsh-chip{min-height:52px;padding:10px 18px;font-size:17px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.fsh-wide .lcs-app{max-width:min(1752px,96vw);}'
    +   'body.fsh-wide .fsh-sheet{--fsh-cell:clamp(34px,12vmin,84px);}'
    +   'body.fsh-wide .fsh-chip{min-height:56px;padding:11px 20px;font-size:19px;}'
    + '}'
    /* ⚠ A FOURTH STEP KEYED ONLY ON HEIGHT, because the cap here is a HEIGHT
       budget: sheet = 8 x cell + ~420px of chrome. At the tier-C floor of 1150
       that allows an 84px cell, while a 1440-tall board has room for 118 —
       and lowering C to fit its own floor would have left every tall board at
       two thirds of what it can show. The same shape measurement-bench needed. */
    + '@media (min-width:2400px) and (min-height:1300px){'
    +   'body.fsh-wide .fsh-sheet{--fsh-cell:clamp(34px,12vmin,118px);}'
    + '}'
    + '@media print{.fsh-toolbar,.fsh-palette,.fsh-foot,.fsh-gate,.fsh-gaps{display:none!important;}'
    +   '.fsh-sheet{border-color:#333;}}';
  document.head.appendChild(st);
}
