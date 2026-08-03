/* =====================================================================
   TOOL #44 — THE BLUEPRINT   (build-plan.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #9. Catalog slot B2, OPENING
   WAVE 3, space and structure. Wave 2 closed with #43.

   THE THESIS. A grid of numerals and a building of cubes are the same
   object written two ways, and you can edit it from either end. Then:
   turn it, and what you see changes although the thing does not — and
   two different buildings can look identical from the front and the
   side.

   ⭐ ONE NAMED PART: THE BLUEPRINT. Nothing else in this tool gets a
   noun, and that is a finding, not a style choice. The 11-locale census
   found the cube is owned four times over —
     · measurement-bench.js:48-49  unitCubeS/P in all eleven locales
     · choice-board-activity.js:550 the 3-D shape answer vocabulary
     · place-value-core.js:85       srUnitCube (`Einerwürfel`, `blokje`)
     · number-talk-easel.js:60      reprDice — and THAT is the hazard:
       de `Würfelbild`, sv `Tärningsbild`, da/no `Terning` mean DIE.
   There is no free cube word anywhere, so the cubes stay geometry, per
   `comparison-planks.js:7-8` — "three named parts, and nothing else in
   this tool gets a noun."

   ⭐⭐ AND THE VIEWS ARE NAMED BY DIRECTION, NOT BY A VIEW-NOUN.
   `class-timer.js:76` and `hush-owl.js:87` ship the shell's expand
   control as "Back to full view" in eleven locales — de `Ansicht`,
   it/es `vista`, pt `visão`, nl `weergave`, sv `vy`, da/no `visning`,
   fi `näkymä`. A panel called "the side view" would be using, in every
   locale, the shell's own word for *make the window bigger*. So: FROM
   THE FRONT and FROM THE SIDE. (nl `aanzicht` is the one clean
   architectural noun on the board — 0 hits — and the Dutch panel may
   take it.)
   ⚠ `elevation` is also unavailable in EN: `lcs-shell.css:44` uses it
   as a shadow-depth design token.

   ⚠⚠ AN OPEN RULING FOR THE GERMAN PANEL, RECORDED NOT PAPERED OVER.
   `Der Käferplan` is #40's German NAME, and `tool-content/de.json:1018`
   already writes "Bauen nach Bauplan" — in #40's own German classroom
   idea. So German already owns `-plan` as a tool-name head. The census
   found `Grundriss` and `Bauplatte` both at 0 hits. Whether a shared
   compound HEAD is a collision is a policy question the shipped rule
   does not answer (`comparison-planks.js:13-14` only settles that
   geometry does not save you). The German panel rules; the ruling is
   written here.

   THE FENCE (§23.3) — occupied on three of four surfaces, subtracted:
   · ⭐ `scripts/worksheet-gen/primitives/unit-cubes.js` IS a real
     dimetric iso renderer, and `G3-346-volume-unit-cubes` already asks
     "count all the cubes". It deliberately forces w = 1 — a single-
     depth wall — because, in its own words, "a full l×w×h box hides
     interior/back cubes in the isometric view, making 'count all the
     cubes' impossible". THAT LIMITATION IS THIS TOOL'S SUBJECT. We
     make the hidden cubes the point. So we never ask for a total.
     ⚠ Three consecutive fences missed that file, because they searched
     for primitives NESTED under the types tree, which does not exist.
     It is a SIBLING of `types/`, not a child.
     (⚠ and writing that path out literally here closes this very
     comment — a star-slash inside a block comment ends it. Bought once
     on #43 and again on the first draft of this file.)
   · `choice-board` flat-solid (K.G.A.3) + G2-242…246 own naming solids
     and counting faces/edges/vertices → THIS TOOL NAMES NO SOLID AND
     UNFOLDS NO NET. A Bauplan is a notation.
   · `patchwork-meadow` / `mosaic-menders` / `geometry-tasks.unitRect`
     own covering a grid with unit squares = AREA (3.MD.C.5/6) → we
     never count area. "How many cubes altogether" is volume, 5.MD.C,
     two bands above this platform's ceiling.
   · `graph-it` / `class-graph` / `calendar-wall` own vertical
     accumulation as 2-D columns of flat cells, and the nouns stack,
     fence, column, pile, bar with them.
   · `place-value-lab` / `base-ten.js` own the word cube while drawing
     FLAT ROUNDED SQUARES, and own the noun blocks.
   · `parking-tower-activity` is the closest visual — a side-on
     cross-section of a multi-storey structure — but it is a backdrop
     for positional language (K.G.A.1); no height is ever edited. It
     owns tower, building, skyline, floor, level.
   · `bramble-core` teaches the cousin idea — a silhouette honestly
     cannot tell you volume (K.MD.A.2) — by predict-and-pour. This is
     its spatial inversion, with zero code overlap.
   VIRGIN after subtraction: a numeral that means a HEIGHT, an elevation
   derived from a model, the plan⇄building bidirectional edit, and the
   many-buildings-one-view ambiguity. Zero hits tree-wide for bauplan,
   blueprint, elevation, front view, side view, top-down, floor plan,
   net, unfold, height map, storey, axonometric.

   ⚠ THE CURTAIN DOCTRINE, ANSWERED RATHER THAN DODGED.
   `class-graph.js:56` and `number-talk-easel` hold that "if the number
   is on screen from the start, nobody looks at the graph." This tool
   shows the numeral AND the model at once and calls that the point.
   The precedent is `place-value-lab.js:2-6`, which ships THREE
   live-linked displays with no curtain, because there the LINKAGE is
   the lesson. Same here: the numeral is not the answer to the model,
   it is the model in another notation.

   THE MOAT. Bauen nach Bauplan is a weekly K-2 staple across
   DE/NL/AT/CH and the Nordics, with printed card sets in every
   Grundschule cupboard — and CCSS codes none of it below 5.MD.C, so the
   US-built tool suites skipped it. Exactly the opening `pattern-bench`
   documents for repeating patterns.

   REFUSES, FOREVER
     1. Names no solid, unfolds no net.
     2. Never asks for a total — that is G3-346's question and 5.MD.C.
     3. Never counts area — 3.MD.C.5/6 is taken.
     4. No verdict, no score, no timer, no streak. Free-play: no
        `tasks`, therefore no educationalAlignment, therefore no code
        collision is structurally possible.
     5. No words on the apparatus (§23.2) — numerals 0-4 and the
        material. Legible with the sound off.
     6. A tap never wraps. It clamps at 0 and at HMAX.
     7. No CCSS claim. Readiness class, the `pattern-bench` precedent.

   ⭐ FIVE LAWS, MEASURED BEFORE THEY WERE GATED (and one was FALSE):
     · 5^9 = 1,953,125 buildings; full enumeration costs 9 ms, so the
       Node gate is genuinely exhaustive rather than sampled.
     · (front,side) has 5,501 distinct values: 4,792 AMBIGUOUS and 709
       DETERMINED. 99.96% of all buildings share their pair with
       another — so showing BOTH views does not collapse the teaching
       point, which was the real worry.
     · rot^4 = identity, 0 failures.
     · front(rot(h)) === REVERSE(side(h)), universally; neither-count 0.
     · ⚠ "the turn always changes what you see" is FALSE. Exactly 125
       buildings (0.0064%) are turn-invariant. The law is deleted and
       replaced by the true one; the turn stays ENABLED on those 125,
       because a turn that visibly does nothing IS the invariance idea.
       (#39: measure a law before you gate it — then fix the design or
       delete the law, never soften the threshold.)

   ⭐⭐ AND THE PAINT ORDER IS DERIVED, NOT COPIED.
   `unit-cubes.js` paints z asc / y desc / x asc, which is correct for
   the FULL BOX it ships. This building is RAGGED. Solving for the view
   direction — (dx-dy)*COS = 0 and (dx+dy)*SIN - dz = 0 with SIN = 0.5 —
   gives d = (1,1,1), so occlusion happens ONLY along that ray and
   painting in ascending (x+y+z) is provably correct for any shape.
   That is what `cubes()` returns, and the gate asserts it.
   ===================================================================== */

(function () {
  'use strict';

  /* ⭐ the projection, copied by VALUE from
     scripts/worksheet-gen/primitives/unit-cubes.js:10-14 — NOT imported
     (the recipe forbids importing across the boundary, and that module
     is CommonJS for the printable pipeline). Its `unitCubes` takes a
     SCALAR h for the whole box and cannot draw a ragged building, which
     is why only the two constants and isoPt come across. */
  var COS = 0.866, SIN = 0.5;

  var BuildPlan = {
    id: 'build-plan',

    /* ---- the model -------------------------------------------------
       State is NINE INTEGERS and nothing else. No orientation index, no
       cached projection, nothing derived is stored — so there is no
       second copy of the truth to drift. The turn rotates the heights
       themselves, which is what turning a real building does to its
       plan, and it makes rot^4 = identity a property of the state
       rather than of a counter.
       ---------------------------------------------------------------- */
    N: 3,
    HMAX: 4,

    /* ---- the arena, 1000 x 1000 --------------------------------------
       ⭐⭐ THE TWO PROFILES ARE PLACED BY GEOMETRY, NOT LABELLED.
       The design law forbids words on the apparatus, so "which one is
       the front?" has to be answered by POSITION. In this projection a
       rising row (y) travels down-LEFT and a rising column (x) travels
       down-RIGHT, so the face you meet looking from the front is the
       building's lower-left face and the side face is its lower-right.
       The front profile therefore sits at lower-LEFT and the side
       profile at lower-RIGHT, each under the face it is a shadow of.
       The first draft put them side by side in one corner and nothing
       on screen said which was which — legible only via aria-label,
       which is to say not legible at all.
       ------------------------------------------------------------------ */
    W: 1000, H: 1000,
    /* the blueprint block, top-left */
    PX: 60, PY: 100, PCELL: 148,
    /* the building, right */
    BU: 82, BOX: 740, BOY: 430,
    /* the profiles: front lower-LEFT, side lower-RIGHT, same baseline */
    VCELL: 64, VBASE: 940, FX: 140, SX: 640,

    /* ⚠⚠ THE OPENING BUILDING MUST NOT BE TURN-INVARIANT.
       It was the flat 1-high one — chosen as the baseline, and it IS
       one of the 125 buildings a quarter turn leaves unchanged. So at
       rest the turn chip honestly did nothing, and the liveness gate
       reported it DEAD ON EVERY PATH. Both were right; the design was
       wrong. A teacher opening the tool would have met a button that
       appears broken — the #39 complaint verbatim ("the numbers under
       the board has no function").
       The flat building keeps its place in the repertoire, where the
       turn-does-nothing moment is the point. It just cannot be the
       first thing anyone sees. This staircase turns visibly, and its
       front and side already disagree (123 against 333). */
    newState: function () { return { h: [1, 2, 3, 1, 2, 3, 1, 2, 3] }; },

    /* TOTALITY. `st || newState()` is not total — it catches null and 0
       and hands [] straight through to .length (#39). */
    _st: function (st) {
      var d = this.newState(), out = [], i, v, n = this.N * this.N;
      var src = (st && typeof st === 'object' && Object.prototype.toString.call(st.h) === '[object Array]')
        ? st.h : d.h;
      for (i = 0; i < n; i++) {
        v = src[i];
        if (typeof v !== 'number' || !isFinite(v)) v = 0;
        v = Math.round(v);
        if (v < 0) v = 0;
        if (v > this.HMAX) v = this.HMAX;
        out.push(v);
      }
      return { h: out };
    },

    at: function (st, r, c) { return this._st(st).h[r * this.N + c]; },

    /* set — a REFUSAL, never a clamp, so the caller cannot mistake a
       silently-corrected value for an accepted one (#43) */
    setHeight: function (st, r, c, v) {
      var s = this._st(st), i;
      if (typeof r !== 'number' || typeof c !== 'number' || typeof v !== 'number') return null;
      if (!isFinite(r) || !isFinite(c) || !isFinite(v)) return null;
      if (r < 0 || c < 0 || r >= this.N || c >= this.N) return null;
      if (v !== Math.round(v) || v < 0 || v > this.HMAX) return null;
      i = r * this.N + c;
      if (s.h[i] === v) return null;              /* a no-op is a refusal */
      s.h[i] = v;
      return s;
    },

    /* bump is a COMPOSITION of setHeight, so there is ONE clamp rule,
       not two that must agree (#43's slideBy). It saturates at the ends
       and then refuses — it NEVER wraps (#39 shipped a +30 -> -30). */
    bump: function (st, r, c, d) {
      var s = this._st(st), v;
      if (typeof d !== 'number' || !isFinite(d)) return null;
      if (r < 0 || c < 0 || r >= this.N || c >= this.N) return null;
      v = s.h[r * this.N + c] + Math.round(d);
      if (v < 0) v = 0;
      if (v > this.HMAX) v = this.HMAX;
      return this.setHeight(s, r, c, v);
    },

    /* rotate the whole thing a quarter turn. h[r][c] -> h'[c][N-1-r] */
    rot: function (st) {
      var s = this._st(st), n = this.N, out = new Array(n * n), r, c;
      for (r = 0; r < n; r++) for (c = 0; c < n; c++) out[c * n + (n - 1 - r)] = s.h[r * n + c];
      return { h: out };
    },

    /* the two directions. front[c] = the tallest column in that across-
       position; side[r] = the tallest in that depth-position. */
    front: function (st) {
      var s = this._st(st), n = this.N, o = [], c, r, m;
      for (c = 0; c < n; c++) { m = 0; for (r = 0; r < n; r++) if (s.h[r * n + c] > m) m = s.h[r * n + c]; o.push(m); }
      return o;
    },
    side: function (st) {
      var s = this._st(st), n = this.N, o = [], r, c, m;
      for (r = 0; r < n; r++) { m = 0; for (c = 0; c < n; c++) if (s.h[r * n + c] > m) m = s.h[r * n + c]; o.push(m); }
      return o;
    },

    /* ⭐ THE CUBES, IN PROVABLY CORRECT PAINT ORDER.
       Occlusion happens only along (1,1,1) — see the header derivation —
       so ascending (x+y+z) is correct for ANY shape, ragged included.
       The shipped primitive's z/y/x loop is correct only for a full box.
       Returns model coords; the renderer projects them. */
    cubes: function (st) {
      var s = this._st(st), n = this.N, out = [], r, c, z;
      for (r = 0; r < n; r++) for (c = 0; c < n; c++) {
        for (z = 0; z < s.h[r * n + c]; z++) out.push({ x: c, y: r, z: z, d: c + r + z });
      }
      out.sort(function (a, b) { return a.d - b.d; });
      return out;
    },

    isoPt: function (x, y, z, u, ox, oy) {
      return { x: ox + (x - y) * COS * u, y: oy + (x + y) * SIN * u - z * u };
    },

    /* ---- the ambiguity ---------------------------------------------
       h*[r][c] = min(front[c], side[r]) is the TALLEST building with
       these two directions, and it is always a member: for any row r
       some column has front[c] >= side[r], because max(front) =
       max(side). Every other member is <= h* pointwise.

       ⭐ SO THE TEST IS EXACT AND COSTS NINE COMPARISONS:
       more than one building shares these directions  <=>  some cell of
       h* can be lowered by exactly 1 with both maxima preserved.
       (If g != h* is a member, take a cell where g < h*; lowering h*
       there by 1 stays >= g pointwise, so its maxima are still the same
       — hence such a cell exists.)
       The Node gate proves this against an exhaustive census of all
       1,953,125 buildings, using a DIFFERENT algorithm. A cheap test in
       the browser is only allowed because an expensive one checks it.
       ---------------------------------------------------------------- */
    tallest: function (f, sd) {
      var n = this.N, out = new Array(n * n), r, c;
      for (r = 0; r < n; r++) for (c = 0; c < n; c++) out[r * n + c] = Math.min(f[c], sd[r]);
      return { h: out };
    },

    _keeps: function (st, f, sd) {
      var a = this.front(st), b = this.side(st), i;
      for (i = 0; i < this.N; i++) if (a[i] !== f[i] || b[i] !== sd[i]) return false;
      return true;
    },

    /* true when these two directions do NOT pin the building down */
    isAmbiguous: function (st) {
      var f = this.front(st), sd = this.side(st), top = this.tallest(f, sd), i, t;
      for (i = 0; i < this.N * this.N; i++) {
        if (top.h[i] === 0) continue;
        t = { h: top.h.slice() };
        t.h[i] -= 1;
        if (this._keeps(t, f, sd)) return true;
      }
      return false;
    },

    /* another building with the SAME two directions, or null when the
       directions determine it. `pick` is 0..1 and selects among the
       valid lowerings so repeated presses vary; it is a parameter and
       not Math.random so the gate can drive it. */
    /* ⚠⚠ THE FIRST VERSION HAD A BRANCH THAT COULD NEVER RUN, AND THE
       MUTATION HARNESS FOUND IT: it returned h* early whenever you were
       not sitting on h*, and otherwise picked a lowering — but a
       lowering is never h*, so its "did I just hand back the same
       building?" guard was unreachable. A mutation deleting that guard
       survived, which is the correct verdict on dead code and a wrong
       verdict on the tool.
       Rebuilt as ONE POOL: every member reachable in a single lowering,
       plus h* itself, minus whatever is on screen now. Every branch is
       live, `pick` genuinely varies the answer instead of alternating
       between two buildings, and null happens exactly when the pool is
       empty — which is exactly when the two directions determine the
       building. */
    another: function (st, pick) {
      var s = this._st(st), f = this.front(s), sd = this.side(s);
      var top = this.tallest(f, sd), pool = [], i, k, t;
      var cur = s.h.join(',');
      var offer = function (x) { if (x.h.join(',') !== cur) pool.push(x); };
      offer(top);
      for (i = 0; i < this.N * this.N; i++) {
        for (k = top.h[i] - 1; k >= 0; k--) {
          t = { h: top.h.slice() };
          t.h[i] = k;
          if (this._keeps(t, f, sd)) offer(t);
        }
      }
      if (!pool.length) return null;                 /* determined */
      if (typeof pick !== 'number' || !isFinite(pick) || pick < 0 || pick >= 1) pick = 0;
      return pool[Math.floor(pick * pool.length)];
    },

    /* ⭐⭐ THE HINT DISPATCH IS MODEL CODE, NOT RENDER CODE.
       Four native panels found `hintTurn` DEAD — declared once,
       selected never — in a tool whose header advertises a reachability
       gate, and whose smoke test contained a workaround calling the
       string directly with a comment excusing the dispatch. I wrote the
       excuse instead of reading the dispatch. A GATE YOU HELP PAST IS
       NOT A GATE.
       `hintPlan` was worse in a quieter way: it needed flat AND
       ambiguous, and flat-at-zero is determined, so it reached FOUR
       buildings out of 1,953,125 — while the tool opens on a staircase,
       so the first hint anyone ever saw was `hintSame`, giving away the
       whole payoff before a square had been touched.
       ⚠ And the first repair was still untestable: the dispatch lived
       inline in _paint(), so the Node gate had to REIMPLEMENT it, and a
       gate that reimplements the thing it checks is testing a copy —
       three mutations of the real dispatch sailed straight through.
       As a pure function of (state, flags) it is enumerable by the gate
       that actually matters.

       Order: the turn speaks first because it just happened; then the
       determined case, because inviting someone to find another
       building when none exists is a lie; then the invitation to edit,
       for anyone who has not yet touched a square; then the payoff. */
    hintKey: function (st, justTurned, touched) {
      var s = this._st(st), i, any = false;
      for (i = 0; i < s.h.length; i++) if (s.h[i] > 0) { any = true; break; }
      /* ⚠ A1 — WIRING hintTurn MADE IT LIE. It claimed "what faced you
         now faces sideways" on EVERY turn, and THREE OF THE FIVE FREE
         SETTINGS are turn-invariant: the teacher presses the chip in
         front of the class, nothing moves, and the tool narrates motion.
         Fixing a dead string had created a false one. The header keeps
         the turn enabled on those 125 buildings precisely because a turn
         that does nothing IS the invariance idea — so that idea now has
         a string of its own instead of being narrated wrongly. */
      if (justTurned) {
        return this.rot(s).h.join() === s.h.join() ? 'hintTurnSame' : 'hintTurn';
      }
      /* ⚠ A2 — THE EMPTY BOARD IS "DETERMINED", AND SAYING SO IS ABSURD.
         isAmbiguous([0×9]) is correctly false — no other building has
         those two profiles — so the tool made its proudest claim over a
         BLANK GRID, reachable by nine taps of ArrowDown. The predicate
         is right; the dispatch needed to notice there is nothing there. */
      if (!any) return 'hintEmpty';
      if (!this.isAmbiguous(s)) return 'hintDetermined';
      if (!touched) return 'hintPlan';
      return 'hintSame';
    },

    /* ---- entitlement + repertoire ---------------------------------- */
    STORE_KEY: 'lcs:build-plan:v1',
    premium: false,
    FREE_SETTINGS: 5,
    /* ⚠ an offline fallback must degrade to the FREE TIER, not to
       nothing (#38). These five are chosen by measurement, not taste:
       the baseline, the disagreement, an unmissable ambiguity, a
       DETERMINED one (where the payoff chip correctly goes dead), and a
       turn-invariant one. Every claim in this header is reachable
       without paying. */
    FALLBACK_SETS: {
      version: 1, freeCount: 5,
      sets: [
        { h: [1, 1, 1, 1, 1, 1, 1, 1, 1] },
        { h: [1, 2, 3, 1, 2, 3, 1, 2, 3] },
        { h: [0, 3, 0, 3, 3, 3, 0, 3, 0] },
        { h: [4, 4, 4, 0, 0, 0, 0, 0, 0] },
        { h: [4, 1, 4, 1, 1, 1, 4, 1, 4] }
      ]
    },

    strings: {
      title:          { en: "The Blueprint", de: "Neun Zahlen, ein Gebäude", fr: "Neuf nombres, une maquette", es: "Nueve casillas, un edificio", pt: "O Mapa das Alturas", it: "La mappa del palazzo", nl: "De bouwplaat", sv: "Byggritningen", da: "Byggeplanen", no: "Byggetegningen", fi: "Talo lukuina" },
      instruction:    { en: "Every square of the blueprint holds a number: that is how tall the building stands there. Tap a square to raise it, drag up and down, or use the arrow keys. Then give it a quarter turn and see what happens.", de: "In jedem Feld des Bauplans steht eine Zahl: So hoch ist das Gebäude dort. Tippen Sie ein Feld an, dann wächst es um eins – oder ziehen Sie nach oben und unten, oder nehmen Sie die Pfeiltasten. Drehen Sie danach eine Vierteldrehung weiter.", fr: "Chaque case du plan porte un nombre : c'est la hauteur de la maquette à cet endroit. Touchez une case, ou faites-la glisser vers le haut ou vers le bas, et la maquette suit. Puis faites-lui faire un quart de tour.", es: "Toca una casilla de la cuadrícula para que esa parte suba, o arrástrala para subir y bajar. El edificio la sigue. Dale un cuarto de giro y mira qué pasa.", pt: "Toque em um quadradinho do mapa para ele subir, ou arraste para cima e para baixo até a altura que você quiser. O prédio acompanha. Depois gire e veja o que acontece.", it: "Ogni numero della mappa dice quanto è alto il palazzo in quel posto. Tocca o trascina per cambiarlo, dalla mappa o dal palazzo: cambiano tutti e due insieme. Poi gira di un quarto di giro e guarda.", nl: "In elk vakje van de bouwplaat staat een getal: zo hoog staat het bouwwerk daar. Tik op een vakje om het één hoger te maken, sleep omhoog en omlaag, of gebruik de pijltjestoetsen. Geef het daarna een kwartslag.", sv: "I varje ruta på ritningen står en siffra: så högt står byggnaden där. Tryck på en ruta så växer den ett steg, dra uppåt och nedåt, eller använd piltangenterna. Vrid sedan ett kvarts varv.", da: "I hvert felt på byggeplanen står et tal: det siger, hvor højt der skal bygges på det felt. Tryk på et felt for at hæve det, eller træk op og ned. Drej så en kvart omgang, og se, hvad der sker.", no: "Trykk på en rute for å heve den, eller dra opp og ned – tallet viser hvor høyt det skal bygges akkurat der. Byggverket retter seg etter tallene. Vri en kvart omdreining, og se hva som skjer.", fi: "Napauta ruutua, niin luku kasvaa yhdellä, tai vedä ruutua ylös ja alas — luku kertoo, kuinka korkealle talo siinä kohdassa nousee. Voit tarttua yhtä hyvin itse taloon, jolloin luku ruudukossa muuttuu. Käännä neljänneskierros ja katso, mikä muuttuu." },
      sceneLabel:     { en: "A blueprint of nine squares, each with a number in it, and beside it the building those numbers make. Below the blueprint, that same building seen from the front; below the building, the same one seen from the side.", de: "Ein Bauplan aus neun Feldern, in jedem Feld eine Zahl, und daneben das Gebäude, das diese Zahlen ergeben. Unter dem Bauplan dasselbe Gebäude von vorn gesehen; unter dem Gebäude dasselbe Gebäude von der Seite gesehen.", fr: "Un plan de neuf cases, un nombre dans chacune, et à côté la maquette que ces nombres décrivent, dessinée en volume. En dessous, à gauche, la même maquette vue de face ; à droite, la même maquette vue de profil.", es: "Una cuadrícula de nueve casillas, cada una con un número, y al lado el edificio que forman esos números. Abajo a la izquierda, ese mismo edificio visto desde delante; abajo a la derecha, visto desde un lado.", pt: "Um mapa de nove quadradinhos, cada um com um número dentro, e ao lado o prédio que esses números levantam. Embaixo, o mesmo prédio visto de frente, à esquerda, e visto de lado, à direita.", it: "Una mappa di nove numeri e, accanto, il palazzo che quei numeri costruiscono. Sotto la mappa, lo stesso palazzo visto di fronte; sotto il palazzo, lo stesso palazzo visto di lato.", nl: "Een bouwplaat van negen vakjes met in elk vakje een getal, en daarnaast het bouwwerk dat die getallen vormen. Onder de bouwplaat staat hetzelfde bouwwerk van voren gezien; onder het bouwwerk staat hetzelfde bouwwerk van opzij gezien.", sv: "En byggritning med nio rutor och en siffra i varje ruta, och bredvid den byggnaden som siffrorna reser. Under ritningen syns samma byggnad framifrån; under byggnaden syns samma byggnad från sidan.", da: "En byggeplan med ni felter i tre rækker og tre kolonner, hvert felt med et tal i. Ved siden af står modellen, som tallene rejser, tegnet på skrå. Under byggeplanen ses den samme model set forfra, og under modellen ses den set fra siden.", no: "En byggetegning med ni ruter og ett tall i hver, og ved siden av den byggverket som tallene reiser. Under byggetegningen står det samme byggverket sett forfra; under byggverket står det sett fra siden.", fi: "Vasemmalla ylhäällä ruudukko: yhdeksän ruutua, joista jokaisessa on yksi luku nollasta neljään. Oikealla sama talo pystyyn rakennettuna. Alhaalla kaksi litteää kuvaa samasta talosta: ruudukon alla se edestä katsottuna, talon alla se sivulta katsottuna. Jokaista yhdeksää kohtaa voi muuttaa kummasta päästä tahansa." },
      hintPlan:       { en: "Change a number in the blueprint and watch that part of the building rise or fall. The building and the blueprint are one thing, written twice.", de: "Ändern Sie eine Zahl im Bauplan und schauen Sie, wie das Gebäude dort wächst oder sinkt. Bauplan und Gebäude sind ein und dasselbe, zweimal aufgeschrieben.", fr: "Changez un nombre du plan et regardez cette partie de la maquette monter ou descendre.", es: "Cambia un número de la cuadrícula y mira cómo sube o baja esa parte del edificio.", pt: "Mude um número no mapa e veja aquele pedaço do prédio subir ou descer.", it: "Cambia un numero della mappa e guarda il palazzo salire o scendere proprio in quel posto.", nl: "Verander een getal op de bouwplaat en kijk hoe dat deel van het bouwwerk stijgt of daalt. De bouwplaat en het bouwwerk zijn één ding, twee keer opgeschreven.", sv: "Ändra en siffra på ritningen och se den delen av byggnaden växa eller sjunka. Ritningen och byggnaden är samma sak, skriven två gånger.", da: "Ret et tal i byggeplanen, og se den del af modellen blive højere eller lavere. Modellen og byggeplanen er én og samme ting, skrevet to gange.", no: "Endre et tall i byggetegningen, og se den delen av byggverket vokse eller synke. Byggverket og byggetegningen er én og samme ting, skrevet to ganger.", fi: "Muuta yhtä lukua, niin yksi kohta talosta nousee tai laskee. Ruudukko ja talo ovat sama asia kahdesta päästä." },
      hintTurn:       { en: "It is the same building — but what faced you now faces sideways, and what was at the side has come round to the front.", de: "Es ist dasselbe Gebäude – nur zeigt jetzt zur Seite, was Ihnen eben zugewandt war, und was an der Seite lag, liegt nun vorn.", fr: "C'est toujours la même maquette — mais ce qui était de face passe de profil, et le profil revient devant.", es: "El edificio es el mismo — pero lo que estaba de frente queda ahora de lado, y lo que estaba al lado ha venido delante.", pt: "O prédio continua o mesmo — mas o que era a frente passa a ser o lado, e o que estava de lado veio para a frente.", it: "Il palazzo resta lo stesso: quello che vedevi di fronte adesso lo vedi di lato, e quello che stava di lato è venuto davanti.", nl: "Het is hetzelfde bouwwerk – alleen wijst nu naar opzij wat eerst naar je toe stond, en wat opzij zat, zit nu vooraan.", sv: "Det är samma byggnad – men nu vänder åt sidan det som nyss vände mot dig, och det som satt på sidan sitter framtill.", da: "Det er den samme model – men det, I før så forfra, ser I nu fra siden, og det, der var ude på siden, er kommet om foran.", no: "Byggverket er det samme – men det som nettopp vendte mot deg, vender nå til siden, og det som lå ute på siden, har kommet fram foran.", fi: "Sama talo — mutta se, mikä oli edessä, on nyt sivulla, ja se, mikä oli sivulla, on kiertynyt eteen." },
      hintTurnSame:   { en: "Turn it as often as you like — this one looks the same from every quarter. That is worth a moment on its own.", de: "Drehen Sie, so oft Sie mögen – dieses Gebäude sieht nach jeder Vierteldrehung genau gleich aus. Auch das ist einen Moment wert.", fr: "Tournez autant de fois que vous voulez — cette maquette apparaît pareille après chaque quart de tour. Cela aussi mérite un instant.", es: "Gíralo tantas veces como quieras: este edificio se ve igual después de cada cuarto de giro. Eso también merece un momento.", pt: "Gire quantas vezes quiser: este prédio fica igualzinho depois de cada quarto de giro. Isso também merece um momento.", it: "Gira quante volte vuoi: questo palazzo si vede uguale dopo ogni quarto di giro. Anche questo merita un momento.", nl: "Draai zo vaak je wilt – dit bouwwerk ziet er na elke kwartslag precies hetzelfde uit. Ook dat is een moment waard.", sv: "Vrid så många gånger du vill – den här byggnaden ser likadan ut efter varje kvarts varv. Också det är värt ett ögonblick.", da: "Drej så mange gange du vil – den her model ser præcis ens ud efter hver kvart omgang. Også det er et øjeblik værd.", no: "Vri så mange ganger du vil – dette byggverket ser helt likt ut etter hver kvart omdreining. Også det er verdt et øyeblikk.", fi: "Käännä niin monta kertaa kuin haluat — tämä talo näyttää joka neljänneskierroksen jälkeen samalta. Sekin kannattaa huomata." },
      hintEmpty:      { en: "Nothing built yet. Tap any square of the blueprint and the building starts there.", de: "Noch ist nichts gebaut. Tippen Sie ein Feld des Bauplans an, dort beginnt das Gebäude.", fr: "Rien n'est encore construit. Touchez une case du plan : la maquette commence là.", es: "Aún no hay nada construido. Toca cualquier casilla de la cuadrícula y el edificio empieza ahí.", pt: "Ainda não tem nada construído. Toque em qualquer quadradinho do mapa e o prédio começa ali.", it: "Non c'è ancora niente. Tocca uno qualsiasi dei numeri della mappa e il palazzo comincia lì.", nl: "Er is nog niets gebouwd. Tik op een vakje van de bouwplaat, daar begint het bouwwerk.", sv: "Ingenting är byggt ännu. Tryck på en ruta på byggritningen, så börjar byggnaden där.", da: "Der er ikke bygget noget endnu. Tryk på et felt på byggeplanen, så begynder modellen dér.", no: "Ingenting er bygd ennå. Trykk på en rute i byggetegningen, så begynner byggverket der.", fi: "Mitään ei ole vielä rakennettu. Napauta mitä tahansa ruudukon ruutua, niin talo lähtee siitä nousemaan." },
      hintSame:       { en: "Another building can look exactly like this from the front and from the side. Ask the class to picture one before you show it.", de: "Ein anderes Gebäude kann von vorn und von der Seite genau so aussehen wie dieses. Lassen Sie die Klasse eines erfinden, bevor Sie es zeigen.", fr: "Une autre maquette peut apparaître exactement comme celle-ci, de face comme de profil. Demandez à la classe d'en imaginer une avant de la montrer.", es: "Otro edificio distinto puede verse exactamente igual desde delante y desde un lado. Pide a la clase que se imagine uno antes de enseñárselo.", pt: "Outro prédio pode ficar igualzinho a este visto de frente e visto de lado. Peça que a turma imagine um antes de você mostrar.", it: "Un altro palazzo può vedersi identico a questo, di fronte e di lato. Chiedi alla classe di immaginarne uno prima di mostrarlo.", nl: "Een ander bouwwerk kan er van voren en van opzij precies zo uitzien. Laat de klas er eerst een bedenken voordat je het laat zien.", sv: "En annan byggnad kan se likadan ut framifrån och från sidan. Låt klassen tänka ut en innan du visar den.", da: "Der findes en anden model, der ser præcis ligesådan ud forfra og fra siden – og som alligevel ikke er den samme. Lad klassen gætte, hvordan den kan se ud, før I henter den frem.", no: "Et annet byggverk kan se helt likt ut både forfra og fra siden. La klassen tenke seg ett før dere ser det.", fi: "Toinenkin talo näyttää tältä sekä edestä että sivulta. Pyydä luokkaa kuvittelemaan sellainen, ennen kuin näytät sen." },
      hintDetermined: { en: "This one is pinned down: no other building looks like this from both directions.", de: "Dieses hier ist eindeutig: Kein anderes Gebäude sieht aus beiden Richtungen so aus.", fr: "Celle-ci est la seule : aucune autre maquette n'apparaît comme elle à la fois de face et de profil.", es: "Este está atado: ningún otro edificio se ve así desde las dos direcciones.", pt: "Este aqui é o único: nenhum outro prédio fica igual a ele visto de frente e visto de lado.", it: "Questo è l'unico: nessun altro palazzo si vede così di fronte e di lato.", nl: "Deze ligt vast: geen enkel ander bouwwerk ziet er van beide kanten zo uit.", sv: "Den här är entydig: ingen annan byggnad ser likadan ut från båda hållen.", da: "Den her er låst fast: ingen anden model ser sådan ud både forfra og fra siden.", no: "Dette byggverket er det eneste: ikke noe annet ser slik ut både forfra og fra siden. Derfor er knappen grå.", fi: "Nämä kaksi suuntaa riittävät: mikään toinen talo ei näytä sekä edestä että sivulta tältä." },
      cellAria:       { en: "blueprint square, row {r} of 3, position {c} of 3, height {v}. Tap to raise it by one, drag up or down, or use the arrow keys.", de: "Feld im Bauplan, Reihe {r} von 3, Position {c} von 3, Höhe {v}. Antippen erhöht um eins; nach oben und unten ziehen oder die Pfeiltasten benutzen.", fr: "case du plan, ligne {r} sur 3, position {c} sur 3, hauteur {v}. Touchez pour monter d'un cran, faites glisser vers le haut ou vers le bas, ou utilisez les flèches.", es: "cuadrícula, fila {r} de 3, posición {c} de 3, altura {v}. Tócala para subir uno, arrástrala hacia arriba o hacia abajo, o usa las flechas.", pt: "quadradinho do mapa, linha {r} de 3, posição {c} de 3, altura {v}. Toque para subir um, arraste para cima ou para baixo, ou use as setas.", it: "mappa, riga {r} di 3, posizione {c} di 3, altezza {v}. Tocca per aumentare di uno, trascina in su o in giù, oppure usa i tasti freccia.", nl: "Vakje op de bouwplaat, rij {r} van 3, positie {c} van 3, hoogte {v}. Tik om het één hoger te maken, sleep omhoog of omlaag, of gebruik de pijltjestoetsen.", sv: "Ruta på byggritningen, rad {r} av 3, position {c} av 3, höjd {v}. Tryck för att höja ett steg, dra uppåt eller nedåt, eller använd piltangenterna.", da: "felt på byggeplanen, række {r} af 3, kolonne {c} af 3, højde {v}. Tryk for at hæve med én, træk op eller ned, eller brug piletasterne.", no: "byggetegningen, rad {r} av 3, rute {c} av 3, høyde {v}. Trykk for å heve med én, dra opp eller ned, eller bruk piltastene.", fi: "ruudukko, rivi {r}, sarake {c}, korkeus {v}. Napauta, vedä ylös tai alas tai käytä nuolinäppäimiä." },
      colAria:        { en: "in the building, row {r} of 3, position {c} of 3, height {v}. Tap to raise it by one, drag up or down, or use the arrow keys.", de: "Im Gebäude, Reihe {r} von 3, Position {c} von 3, Höhe {v}. Antippen erhöht um eins; nach oben und unten ziehen oder die Pfeiltasten benutzen.", fr: "dans la maquette, ligne {r} sur 3, position {c} sur 3, hauteur {v}. Touchez pour monter d'un cran, faites glisser vers le haut ou vers le bas, ou utilisez les flèches.", es: "en el edificio, fila {r} de 3, posición {c} de 3, altura {v}. Tócalo para subir uno, arrástralo hacia arriba o hacia abajo, o usa las flechas.", pt: "no prédio, linha {r} de 3, posição {c} de 3, altura {v}. Toque para subir um, arraste para cima ou para baixo, ou use as setas.", it: "nel palazzo, riga {r} di 3, posizione {c} di 3, altezza {v}. Tocca per aumentare di uno, trascina in su o in giù, oppure usa i tasti freccia.", nl: "In het bouwwerk, rij {r} van 3, positie {c} van 3, hoogte {v}. Tik om het één hoger te maken, sleep omhoog of omlaag, of gebruik de pijltjestoetsen.", sv: "I byggnaden, rad {r} av 3, position {c} av 3, höjd {v}. Tryck för att höja ett steg, dra uppåt eller nedåt, eller använd piltangenterna.", da: "modellen, række {r} af 3, kolonne {c} af 3, højde {v}. Tryk for at hæve med én, træk op eller ned, eller brug piletasterne.", no: "byggverket, rad {r} av 3, rute {c} av 3, høyde {v}. Trykk for å heve med én, dra opp eller ned, eller bruk piltastene.", fi: "talo, rivi {r}, sarake {c}, korkeus {v}. Napauta, vedä ylös tai alas tai käytä nuolinäppäimiä." },
      frontAria:      { en: "the same building seen from the front", de: "Dasselbe Gebäude von vorn gesehen", fr: "la même maquette vue de face", es: "el mismo edificio visto desde delante", pt: "o mesmo prédio visto de frente", it: "lo stesso palazzo visto di fronte", nl: "Het vooraanzicht: hetzelfde bouwwerk van voren gezien", sv: "Samma byggnad sedd framifrån", da: "den samme model set forfra", no: "byggverket sett forfra", fi: "sama talo edestä katsottuna" },
      sideAria:       { en: "the same building seen from the side", de: "Dasselbe Gebäude von der Seite gesehen", fr: "la même maquette vue de profil", es: "el mismo edificio visto desde un lado", pt: "o mesmo prédio visto de lado", it: "lo stesso palazzo visto di lato", nl: "Het zijaanzicht: hetzelfde bouwwerk van opzij gezien", sv: "Samma byggnad sedd från sidan", da: "den samme model set fra siden", no: "byggverket sett fra siden", fi: "sama talo sivulta katsottuna" },
      turnBtn:        { en: "Quarter turn", de: "Vierteldrehung", fr: "Faire un quart de tour", es: "Un cuarto de giro", pt: "Girar um quarto", it: "Gira di un quarto", nl: "Kwartslag", sv: "Kvarts varv", da: "Kvart omgang", no: "Kvart omdreining", fi: "Käännä neljänneskierros" },
      sameBtn:        { en: "Another that looks the same", de: "Eins, das genauso aussieht", fr: "Une autre, même face, même profil", es: "Otro que se ve igual", pt: "Outro que parece igual", it: "Un altro che si vede uguale", nl: "Nog een die er zo uitziet", sv: "En till som ser likadan ut", da: "Samme billeder, anden model", no: "Et annet som ser likt ut", fi: "Sama edestä ja sivulta" },
      nextBtn:        { en: "A different blueprint", de: "Ein anderer Bauplan", fr: "Un autre plan", es: "Otra cuadrícula", pt: "Outro mapa", it: "Un'altra mappa", nl: "Een andere bouwplaat", sv: "En annan byggritning", da: "Ny byggeplan", no: "Ny byggetegning", fi: "Uusi ruudukko" },
      printBtn:       { en: "Print the blueprints", de: "Baupläne ausdrucken", fr: "Imprimer les plans", es: "Imprimir las cuadrículas", pt: "Imprimir os mapas", it: "Stampa le mappe", nl: "Bouwplaten afdrukken", sv: "Skriv ut byggritningar", da: "Print tomme byggeplaner", no: "Skriv ut tomme byggetegninger", fi: "Tulosta tyhjät ruudukot" },
      gateTitle:      { en: "More blueprints", de: "Mehr Baupläne", fr: "D'autres plans", es: "Más cuadrículas", pt: "Mais mapas", it: "Altre mappe", nl: "Meer bouwplaten", sv: "Fler byggritningar", da: "Flere byggeplaner", no: "Flere byggetegninger", fi: "Yksitoista taloa lisää" },
      gateBody:       { en: "Eleven more buildings, including the ones a class rarely stumbles on: the ones no other building can imitate, and the ones with many twins. Plus the sheet to print — six empty blueprints, squares ruled and no numbers, to fill in by hand.", de: "Elf weitere Gebäude, darunter die eindeutigen und die mit vielen Zwillingen, dazu das Blatt zum Ausdrucken: sechs leere Baupläne mit gezeichneten Feldern und ohne Zahlen, zum Ausfüllen von Hand.", fr: "Onze autres maquettes, dont celles qu'aucune autre n'imite et celles qui ont de nombreuses jumelles, et la fiche à imprimer : six plans vides, cases tracées et sans nombres, à remplir à la main.", es: "Once edificios más, entre ellos los que nadie más imita y los que tienen muchos gemelos, y la hoja para imprimir: seis cuadrículas vacías, con las casillas marcadas y sin números, para rellenar a mano.", pt: "Mais onze prédios, entre eles os que nenhum outro imita e os que têm muitos gêmeos, e a folha para imprimir: seis mapas vazios, com os quadradinhos riscados e sem número nenhum, para preencher à mão.", it: "Altri undici palazzi, fra cui quelli che nessun altro imita e quelli che hanno molti gemelli, e il foglio da stampare: sei mappe vuote, già tracciate e senza numeri, da riempire a mano.", nl: "Nog elf bouwwerken, waaronder de bouwwerken die vastliggen en die met veel tweelingen, en het blad om af te drukken: zes lege bouwplaten met de vakjes getekend en zonder getallen, om met de hand in te vullen.", sv: "Elva byggnader till, bland dem de entydiga och de med många tvillingar, och bladet att skriva ut: sex tomma byggritningar med rutorna uppdragna och utan siffror, att fylla i för hand.", da: "Elleve modeller mere, heriblandt dem der er låst fast og dem med mange tvillinger, og arket til at printe: seks tomme byggeplaner med felterne streget op og ingen tal i, som børnene selv fylder ud i hånden.", no: "Elleve byggverk til, blant dem de som er entydige og de med mange tvillinger, og arket til utskrift: seks tomme byggetegninger med ferdig oppmerkede ruter og ingen tall, til å fylle ut for hånd.", fi: "Yksitoista taloa lisää, mukana ne kohdat joita ei tunnilla keksi: talot joilla toista samannäköistä ei ole, ja talot joilla niitä on useita. Lisäksi tulostettava arkki, jossa on kuusi tyhjää ruudukkoa — ruudut viivoitettuina, ei valmiita lukuja — täytettäväksi käsin." },
      gateCta:        { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l'offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Tutustu Opettaja-tilaukseen" }
    },

    /* ---- lifecycle -------------------------------------------------- */
    init: function (api) {
      this.api = api;
      document.body.classList.add('bpl-wide');
      injectBuildPlanCSS();
      this._store = this._loadStore();
      var ent = this._store.ent;
      if (ent && ent.tier) this.premium = ent.tier !== 'free';
      this.st = this.newState();
      this._idx = -1;
      this._justTurned = false;
      this._touched = false;
      this._book = this.FALLBACK_SETS;
      this._fetchEntitlement();
      this._loadBook();
    },

    /* ⚠ the shell calls render() with NO ARGUMENTS (lcs-shell.js:959)
       and re-calls it on resize. Taking an `api` parameter here wipes
       this.api on the second call — #43 shipped that once. */
    render: function () {
      if (!this.api) return;
      this._build();
      this._paint();
    },

    /* ⚠ the shell DRAWS a Reset button and calls tool.reset() if the
       tool provides one (lcs-shell.js:531). Omit it and the button is
       dead on every path — #43 shipped that too. */
    reset: function () {
      this.st = this.newState();
      this._idx = -1;
      this._justTurned = false;
      this._touched = false;
      if (this._wrap) this._paint();
    },

    /* =================================================================
       THE RENDER HALF
       -----------------------------------------------------------------
       ⚠ ONE SQUARE ARENA, ONE COORDINATE SYSTEM. #43 shipped a defect
       by capping one dimension of an aspect-ratio box: the SVG
       letterboxed and every HTML control drifted off the thing it
       drove, so each mark drew as TWO circles. Here the arena is
       1000x1000, `aspect-ratio:1/1` with the cap on the WIDTH, and the
       18 hit-targets are positioned in % of that square from the SAME
       expressions that draw what they sit on.
       ================================================================= */
    _svg: function (n, a) {
      var e = document.createElementNS('http://www.w3.org/2000/svg', n), k;
      if (a) for (k in a) if (Object.prototype.hasOwnProperty.call(a, k)) e.setAttribute(k, a[k]);
      return e;
    },

    /* the centre of blueprint cell (r,c), in model units */
    cellXY: function (r, c) {
      return { x: this.PX + (c + 0.5) * this.PCELL, y: this.PY + (r + 0.5) * this.PCELL };
    },

    /* the centre of the TOP FACE of column (r,c) — where the building's
       hit-target sits, so it tracks the height it drives */
    topXY: function (st, r, c) {
      var z = this.at(st, r, c);
      var p = this.isoPt(c + 0.5, r + 0.5, z, this.BU, this.BOX, this.BOY);
      return p;
    },

    _build: function () {
      var api = this.api, self = this, r, c, i;
      var wrap = api.el('div', 'bpl-wrap');
      this._wrap = wrap;

      var bench = api.el('div', 'bpl-bench');
      this._bench = bench;
      var svg = this._svg('svg', {
        viewBox: '0 0 ' + this.W + ' ' + this.H, 'class': 'bpl-svg',
        preserveAspectRatio: 'xMidYMid meet'
      });
      this._svgRoot = svg;

      /* ---- the blueprint: nine ruled squares, nine numerals -------- */
      this._numEl = [];
      var gp = this._svg('g', { 'class': 'bpl-plan' });
      for (r = 0; r < this.N; r++) for (c = 0; c < this.N; c++) {
        gp.appendChild(this._svg('rect', {
          x: this.PX + c * this.PCELL, y: this.PY + r * this.PCELL,
          width: this.PCELL, height: this.PCELL, 'class': 'bpl-cell'
        }));
        var t = this._svg('text', {
          x: this.cellXY(r, c).x, y: this.cellXY(r, c).y,
          'text-anchor': 'middle', 'dominant-baseline': 'central', 'class': 'bpl-num'
        });
        gp.appendChild(t);
        this._numEl.push(t);
      }
      svg.appendChild(gp);

      /* ---- the two directions -------------------------------------- */
      this._vFront = this._svg('g', { 'class': 'bpl-view bpl-front' });
      this._vSide = this._svg('g', { 'class': 'bpl-view bpl-side' });
      svg.appendChild(this._vFront);
      svg.appendChild(this._vSide);

      /* ---- the building -------------------------------------------- */
      this._gBuild = this._svg('g', { 'class': 'bpl-build' });
      svg.appendChild(this._gBuild);

      bench.appendChild(svg);

      /* ---- 18 hit-targets, real buttons ----------------------------
         ⚠ A DRAG-ONLY TARGET IS DEAD to a keyboard, to assistive tech
         and to the liveness gate — a synthetic .click() never fires
         pointerdown (#41). Every one of these is a real <button>: it
         drags, it clicks, and it takes ArrowUp/ArrowDown.
         ⚠ They are CANVAS cells, not chrome controls, so the floor
         that applies is 34px, not 44px — the two floors are asserted
         separately in local-test, never with an or-shaped assertion. */
      this._hPlan = []; this._hCol = [];
      for (i = 0; i < this.N * this.N; i++) {
        this._hPlan.push(this._hit(bench, 'bpl-h-plan', i));
        this._hCol.push(this._hit(bench, 'bpl-h-col', i));
      }

      wrap.appendChild(bench);

      this._hint = api.el('div', 'bpl-hint');
      wrap.appendChild(this._hint);

      var foot = api.el('div', 'bpl-foot');
      this._chipTurn = this._chip(foot, '', function () {
        self.st = self.rot(self.st);
        self._justTurned = true;
        self._paint();
      });
      this._chipSame = this._chip(foot, '', function () {
        var o = self.another(self.st, Math.random());
        if (o) { self.st = o; self._justTurned = false; self._touched = true; self._paint(); }
      });
      this._chipNext = this._chip(foot, '', function () { self._next(); });
      this._chipPrint = this._chip(foot, 'bpl-lock', function () {
        if (!self.premium) { self._showGate(); return; }
        self._buildSheet();
        try { window.print(); } catch (e) { /* no printer in a headless gate */ }
      });
      wrap.appendChild(foot);

      this._sheetEl = api.el('div', 'bpl-sheet');
      wrap.appendChild(this._sheetEl);

      if (!this._wired) { this._wireDrags(); this._wired = true; }
      api.stage.appendChild(wrap);
    },

    /* every height edit, from either end and by any gesture, lands
       here — one place, so the two hint flags cannot drift apart */
    _edited: function () {
      this._justTurned = false;
      this._touched = true;
    },

    _chip: function (foot, cls, fn) {
      var b = this.api.el('button', 'bpl-chip' + (cls ? ' ' + cls : ''));
      b.type = 'button';
      b.addEventListener('click', function (ev) { ev.preventDefault(); fn(); });
      foot.appendChild(b);
      return b;
    },

    _hit: function (bench, cls, i) {
      var b = this.api.el('button', 'bpl-hit ' + cls);
      b.type = 'button';
      b.setAttribute('data-i', String(i));
      bench.appendChild(b);
      return b;
    },

    /* ---- pointer + keyboard, one code path per end ----------------
       ⚠ LCS.drag.linear is valueFromPointer(clientX, rect) — clientX
       ONLY — so a vertical drag is hand-rolled, as #42's and #43's
       were. Bind to `window`, because pointer capture is released the
       moment a repaint removes the captured element (#40).
       ---------------------------------------------------------------- */
    _wireDrags: function () {
      var self = this;
      var drag = null;

      var begin = function (btn, ev) {
        var i = Number(btn.getAttribute('data-i'));
        drag = { i: i, y0: ev.clientY, h0: self.at(self.st, Math.floor(i / self.N), i % self.N), moved: false };
        try { btn.setPointerCapture && btn.setPointerCapture(ev.pointerId); } catch (e) { /* not fatal */ }
      };
      var move = function (ev) {
        if (!drag) return;
        var bb = self._bench.getBoundingClientRect();
        if (!bb.height) return;
        /* one blueprint unit per (arena height / 9) of travel — up is
           taller, which is the only direction that reads */
        var step = bb.height / 9;
        var d = Math.round((drag.y0 - ev.clientY) / step);
        var v = drag.h0 + d;
        if (v < 0) v = 0;
        if (v > self.HMAX) v = self.HMAX;
        var r = Math.floor(drag.i / self.N), c = drag.i % self.N;
        if (v !== self.at(self.st, r, c)) {
          var n = self.setHeight(self.st, r, c, v);
          if (n) { self.st = n; drag.moved = true; self._edited(); self._paint(); }
        }
        ev.preventDefault();
      };
      var end = function () { drag = null; };

      var attach = function (btn) {
        btn.addEventListener('pointerdown', function (ev) { begin(btn, ev); ev.preventDefault(); });
        /* ⭐ CLICK, TOO — a tap adds one and CLAMPS at HMAX. It never
           wraps: #39 shipped a tap that went +30 -> -30, sixty units
           from one touch. A drag that moved suppresses the click. */
        btn.addEventListener('click', function (ev) {
          ev.preventDefault();
          if (drag && drag.moved) return;
          var i = Number(btn.getAttribute('data-i'));
          var r = Math.floor(i / self.N), c = i % self.N;
          var n = self.bump(self.st, r, c, 1);
          if (n) { self.st = n; self._edited(); self._paint(); }
        });
        btn.addEventListener('keydown', function (ev) {
          var k = ev.key, d = 0;
          if (k === 'ArrowUp' || k === 'ArrowRight' || k === '+') d = 1;
          else if (k === 'ArrowDown' || k === 'ArrowLeft' || k === '-') d = -1;
          else return;
          ev.preventDefault();
          var i = Number(btn.getAttribute('data-i'));
          var n = self.bump(self.st, Math.floor(i / self.N), i % self.N, d);
          if (n) { self.st = n; self._edited(); self._paint(); }
        });
      };
      var j;
      for (j = 0; j < this._hPlan.length; j++) attach(this._hPlan[j]);
      for (j = 0; j < this._hCol.length; j++) attach(this._hCol[j]);

      /* ⚠ ONE listener pair on window, added ONCE — #43 leaked a pair
         per render until it was caught. `_wired` guards re-entry. */
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
    },

    _loadStore: function () {
      try {
        var raw = window.localStorage.getItem(this.STORE_KEY);
        var j = raw ? JSON.parse(raw) : null;
        return (j && typeof j === 'object') ? j : {};
      } catch (e) { return {}; }
    },
    _saveStore: function () {
      try { window.localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store || {})); } catch (e) { /* private mode */ }
    },

    /* ⚠ UNKNOWN ENTITLEMENT MUST BE PESSIMISTIC. No `&& premiumKnown`
       on a control gate — an unknown tier is a free tier until proven
       otherwise, or the paid repertoire leaks on a slow network. */
    _fetchEntitlement: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      fetch('/api/quota/status', { credentials: 'include', cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j) return;
          var tier = j.tier || (j.entitlement && j.entitlement.tier);
          if (!tier) return;
          self.premium = tier !== 'free';
          self._store.ent = { tier: tier };
          self._saveStore();
          if (self._wrap) self._paint();
        })
        .catch(function () { /* stays pessimistic */ });
    },

    _loadBook: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      fetch('/mini-tools/build-plan-sets.json', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j || !j.sets || !j.sets.length) return;
          self._book = j;
          if (typeof j.freeCount === 'number') self.FREE_SETTINGS = j.freeCount;
          if (self._wrap) self._paint();
        })
        .catch(function () { /* the fallback is already live */ });
    },

    _sets: function () {
      var all = (this._book && this._book.sets) || this.FALLBACK_SETS.sets;
      var out = [], i;
      for (i = 0; i < all.length; i++) if (i < this.FREE_SETTINGS || this.premium) out.push(all[i]);
      return out;
    },

    _next: function () {
      var list = this._sets();
      if (!list.length) return;
      /* ⚠ start at -1 so the FIRST press serves sets[0]; #43 shipped a
         _next() that skipped its own first setting. */
      /* ⚠⚠ A3 — THE FIRST PRESS SHOWED A FREE TEACHER THE PAYWALL.
         _idx starts at -1, so press one computes (-1+1) % len = 0, and
         the gate below fired on "_idx === 0". It was written to fire on
         a WRAP — having been all the way round the free set — and index
         0 is both the wrap AND the first press. A teacher's very first
         click on "a different blueprint" was answered with a sales
         card. The Finnish teacher's verdict: "I would not press it a
         second time in front of a class."
         Fixed by remembering whether we have actually been round. */
      var wrapped = (this._idx === list.length - 1);
      this._idx = ((typeof this._idx === 'number' ? this._idx : -1) + 1) % list.length;
      this.st = this._st({ h: list[this._idx].h });
      this._justTurned = false;
      this._touched = false;
      this._paint();
      if (!this.premium && wrapped) this._showGate();
    },

    /* =================================================================
       _paint — everything on screen is recomputed from the nine
       integers. Nothing is incrementally patched, so no partial state
       can survive a turn.
       ================================================================= */
    _paint: function () {
      var api = this.api, s = this._st(this.st), self = this;
      var n = this.N, r, c, i, k;
      if (!this._wrap) return;

      /* ---- the numerals ------------------------------------------- */
      for (i = 0; i < n * n; i++) this._numEl[i].textContent = String(s.h[i]);

      /* ---- the building, in derived paint order -------------------- */
      while (this._gBuild.firstChild) this._gBuild.removeChild(this._gBuild.firstChild);
      var list = this.cubes(s), u = this.BU;
      for (k = 0; k < list.length; k++) {
        var q = list[k];
        var P = function (a, b, cc) {
          var p = self.isoPt(a, b, cc, u, self.BOX, self.BOY);
          return p.x.toFixed(2) + ',' + p.y.toFixed(2);
        };
        /* three faces per cube, exactly as the shipped primitive draws
           them: top, then the two sides. Each carries data-cube so the
           gate can count them per column off the RENDER. */
        this._gBuild.appendChild(this._svg('polygon', {
          points: P(q.x, q.y, q.z + 1) + ' ' + P(q.x + 1, q.y, q.z + 1) + ' ' + P(q.x + 1, q.y + 1, q.z + 1) + ' ' + P(q.x, q.y + 1, q.z + 1),
          'class': 'bpl-f bpl-f-top', 'data-cube': '1', 'data-col': (q.y * n + q.x), 'data-z': q.z
        }));
        this._gBuild.appendChild(this._svg('polygon', {
          points: P(q.x, q.y + 1, q.z) + ' ' + P(q.x + 1, q.y + 1, q.z) + ' ' + P(q.x + 1, q.y + 1, q.z + 1) + ' ' + P(q.x, q.y + 1, q.z + 1),
          'class': 'bpl-f bpl-f-l'
        }));
        this._gBuild.appendChild(this._svg('polygon', {
          points: P(q.x + 1, q.y, q.z) + ' ' + P(q.x + 1, q.y + 1, q.z) + ' ' + P(q.x + 1, q.y + 1, q.z + 1) + ' ' + P(q.x + 1, q.y, q.z + 1),
          'class': 'bpl-f bpl-f-r'
        }));
      }

      /* ---- the two directions, drawn as filled profiles ------------
         Each is three columns of unit squares; the height of column i
         is the projection. The gate measures the RENDER, not the model
         (#43: a gate that reads the model asks the tool to confirm
         itself). */
      var drawView = function (g, vals, x0, y0, cls) {
        while (g.firstChild) g.removeChild(g.firstChild);
        var w = self.VCELL, j, z;
        for (j = 0; j < vals.length; j++) {
          for (z = 0; z < vals[j]; z++) {
            g.appendChild(self._svg('rect', {
              x: x0 + j * w, y: y0 - (z + 1) * w, width: w, height: w,
              'class': 'bpl-vc', 'data-view': cls, 'data-col': j
            }));
          }
          /* the baseline tick keeps an empty column visible, so a zero
             reads as a zero rather than as a missing panel */
          g.appendChild(self._svg('rect', {
            x: x0 + j * w, y: y0, width: w, height: 6, 'class': 'bpl-vbase'
          }));
        }
      };
      /* front under the building's lower-LEFT face, side under its
         lower-RIGHT — position is what says which is which */
      drawView(this._vFront, this.front(s), this.FX, this.VBASE, 'front');
      /* ⭐⭐ REVERSED ROW ORDER, AND THAT IS THE DIFFERENCE BETWEEN
         TRUE AND FALSE. On screen the building's side face runs row 0
         -> row 2 from RIGHT to LEFT (measured: x 917.5, 846.5, 775.5),
         because a step back in y travels down-LEFT in this projection.
         Drawing side() left-to-right therefore drew the MIRROR of the
         face it claims to be a shadow of: for [0,0,4, 0,0,0, 1,0,0] the
         panel showed 401 where the eye sees 104.
         This tool's OWN verified law states it — front(rot(h)) ===
         REVERSE(side(h)) — and the renderer ignored its own model.
         ⚠ EVERY GATE PASSED. local-test compared the profile against
         cube heights counted in the SAME index order, so both sides of
         the comparison carried the same bug and agreed perfectly. The
         projections were "measured off the render" and still wrong. A
         native panel reading the model found it.
         MEASURING THE RENDER IS NOT ENOUGH IF THE ORACLE SHARES THE
         CONVENTION. */
      drawView(this._vSide, this.side(s).slice().reverse(), this.SX, this.VBASE, 'side');
      this._vFront.setAttribute('aria-label', api.t('frontAria'));
      this._vSide.setAttribute('aria-label', api.t('sideAria'));

      /* ---- the 18 hit-targets ------------------------------------- */
      var place = function (el, mx, my, label) {
        el.style.left = (mx / self.W * 100) + '%';
        el.style.top = (my / self.H * 100) + '%';
        el.setAttribute('aria-label', label);
      };
      var fill = function (tpl, rr, cc, vv) {
        return String(tpl).replace('{r}', rr + 1).replace('{c}', cc + 1).replace('{v}', vv);
      };
      for (r = 0; r < n; r++) for (c = 0; c < n; c++) {
        i = r * n + c;
        var p1 = this.cellXY(r, c);
        place(this._hPlan[i], p1.x, p1.y, fill(api.t('cellAria'), r, c, s.h[i]));
        var p2 = this.topXY(s, r, c);
        place(this._hCol[i], p2.x, p2.y, fill(api.t('colAria'), r, c, s.h[i]));
      }

      this._bench.setAttribute('aria-label', api.t('sceneLabel'));

      /* ---- the chips ---------------------------------------------- */
      this._chipTurn.textContent = api.t('turnBtn');
      this._chipSame.textContent = api.t('sameBtn');
      this._chipNext.textContent = api.t('nextBtn');
      this._chipPrint.textContent = api.t('printBtn');

      /* ⭐ THE PAYOFF CHIP GOES DEAD ON EXACTLY THE 709 DETERMINED
         PAIRS — disabled, never a silent no-op (#39's numeral strip
         that "acted" by highlighting itself). The nine-comparison test
         is exact; the Node gate proves it against a full census. */
      var amb = this.isAmbiguous(s);
      this._chipSame.disabled = !amb;

      /* the dispatch is MODEL code — see hintKey() */
      this._hint.textContent = api.t(this.hintKey(s, this._justTurned, this._touched));

      /* keep the two-node gate line honest: the wrap always carries the
         entitlement class so CSS cannot disagree with the model */
      this._wrap.className = 'bpl-wrap' + (this.premium ? ' bpl-paid' : '');
    },

    /* ---- the print sheet -------------------------------------------
       ⚠ #40 and #41 each shipped a Print chip calling window.print()
       with NO @media print block at all, so they printed the whole web
       page — and the generic liveness gate scores that green, because
       window.print fires either way. `audit-tool-print-sheets.js` is
       the gate that catches it.
       The sheet is EMPTY blueprints: ruled squares, no numerals, for a
       child to fill in by hand. It is the paid artefact.
       ---------------------------------------------------------------- */
    _buildSheet: function () {
      var i, r, c, self = this;
      while (this._sheetEl.firstChild) this._sheetEl.removeChild(this._sheetEl.firstChild);
      for (i = 0; i < 6; i++) {
        var svg = this._svg('svg', { viewBox: '0 0 420 420', 'class': 'bpl-sheet-svg' });
        for (r = 0; r < this.N; r++) for (c = 0; c < this.N; c++) {
          svg.appendChild(this._svg('rect', {
            x: 30 + c * 120, y: 30 + r * 120, width: 120, height: 120, 'class': 'bpl-p-cell'
          }));
        }
        this._sheetEl.appendChild(svg);
      }
    },

    _showGate: function () {
      var api = this.api;
      if (!this._wrap || this._wrap.querySelector('.bpl-gate')) return;
      var g = api.el('div', 'bpl-gate');
      var h = api.el('div', ''); h.textContent = api.t('gateTitle');
      var p = api.el('div', ''); p.textContent = api.t('gateBody');
      var a = api.el('a', ''); a.href = '/pricing'; a.textContent = api.t('gateCta');
      g.appendChild(h); g.appendChild(p); g.appendChild(a);
      this._wrap.appendChild(g);
    }
  };

  if (typeof window !== 'undefined') window.BuildPlan = BuildPlan;
  if (typeof module !== 'undefined' && module.exports) module.exports = BuildPlan;

  /* =====================================================================
     CSS. Direction A tokens, `bpl-` prefix, injected once.
     ⚠ NO `vh` anywhere — it measures the WINDOW, not the iframe.
     ⚠ NO inline `background` shorthand.
     ⚠ NO `font:` shorthand — an unquoted `Baloo 2` inside one makes the
       whole declaration invalid and it is dropped silently, which took a
       clamp() floor with it on #42. Longhand cannot fail that way.
     ===================================================================== */
  function injectBuildPlanCSS() {
    if (typeof document === 'undefined' || document.getElementById('bpl-style')) return;
    var s = document.createElement('style');
    s.id = 'bpl-style';
    s.textContent = ''
      + '.bpl-wrap{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;width:100%;}'
      /* ⚠⚠ THE CAP IS ON THE WIDTH AND THE ARENA STAYS SQUARE. Capping
         the HEIGHT of an aspect-ratio:1/1 box yields a RECTANGLE; the
         SVG then letterboxes and every %-positioned control drifts off
         what it drives. #43 shipped exactly that, and each of its marks
         drew as two circles. The gate asserts the aspect. */
      + '.bpl-bench{position:relative;width:100%;max-width:560px;aspect-ratio:1/1;'
      + 'margin:0 auto;border-radius:18px;background:#FBF3E4;'
      + 'border:2px solid rgba(20,107,94,.18);}'
      + '.bpl-svg{display:block;width:100%;height:100%;}'

      /* the blueprint */
      + '.bpl-cell{fill:#FFFDF7;stroke:#146B5E;stroke-width:5;}'
      + '.bpl-num{fill:#0F4A40;font-family:"Baloo 2",Nunito,sans-serif;font-weight:800;font-size:62px;}'

      /* the building */
      + '.bpl-f{stroke:#0F4A40;stroke-width:3;stroke-linejoin:round;}'
      + '.bpl-f-top{fill:#F2784B;}'
      + '.bpl-f-l{fill:#C8613A;}'
      + '.bpl-f-r{fill:#E26C42;}'

      /* the two directions — a flat profile, deliberately NOT the same
         colour family as the building, so a child reads them as a
         SHADOW of it rather than as more cubes */
      + '.bpl-vc{fill:#3C6E63;stroke:#0F4A40;stroke-width:2;}'
      + '.bpl-vbase{fill:#0F4A40;}'

      /* the 18 hit-targets. Sized as a % of the square arena so they
         scale with it; the CANVAS floor (34px) is what applies, and
         local-test measures it separately from the 44px CONTROL floor. */
      + '.bpl-hit{position:absolute;padding:0;border:0;background-color:transparent;'
      + 'cursor:ns-resize;touch-action:none;border-radius:12px;}'
      /* ⚠ SIZED AGAINST THE 34px CANVAS FLOOR AT THE NARROWEST VIEWPORT,
         not by eye. At a 320px page the arena is 296px, so 1% is 2.96px
         and a target needs >= 11.5% to clear 34px. The first draft had
         the building columns at 11% = 32.6px — UNDER the floor, and it
         would have passed any check that only measured the chips. Both
         are set from the thing they cover: the blueprint cell is 14.8%
         of the arena, a cube's top face about 14%. */
      + '.bpl-h-plan{width:14%;height:14%;margin:-7% 0 0 -7%;}'
      + '.bpl-h-col{width:13%;height:13%;margin:-6.5% 0 0 -6.5%;}'
      + '.bpl-hit:focus-visible{outline:3px solid #146B5E;outline-offset:-2px;}'

      + '.bpl-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;'
      + 'font-size:15px;line-height:1.45;color:#3C6E63;margin:2px auto 0;max-width:620px;}'
      + '.bpl-foot{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%;max-width:660px;}'
      + '.bpl-chip{font-family:Nunito,sans-serif;font-weight:600;'
      + 'font-size:clamp(.9rem,3.2vw,1.02rem);line-height:1.1;padding:11px 18px;'
      + 'min-height:44px;border-radius:999px;border:2px solid #146B5E;color:#146B5E;'
      + 'background-color:#FFFDF7;cursor:pointer;}'
      + '.bpl-chip:first-child{background-color:#F2784B;border-color:#F2784B;color:#fff;}'
      + '.bpl-chip.bpl-lock{border-color:#C8613A;color:#C8613A;background-color:transparent;}'
      + '.bpl-chip[disabled]{opacity:.45;cursor:default;}'

      + '.bpl-gate{flex-basis:100%;max-width:560px;margin:6px auto 0;padding:14px 16px;'
      + 'border-radius:16px;background-color:#FFF3EA;border:2px dashed #C8613A;'
      + 'font-family:Nunito,sans-serif;color:#8A3F1E;text-align:center;}'
      + '.bpl-gate a{display:inline-block;margin-top:8px;color:#C8613A;font-weight:700;}'

      /* the sheet is print-only */
      + '.bpl-sheet{display:none;}'
      + '.bpl-sheet-svg{width:46%;margin:2%;}'
      + '.bpl-p-cell{fill:none;stroke:#000;stroke-width:3;}'

      /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
         ⚠⚠ WIDTH CAP ONLY. Same construction as cold-line, and the same
         reason: `.bpl-bench` is `aspect-ratio:1/1` and capping its HEIGHT
         gives a rectangle whose SVG letterboxes while the HTML handles stay
         positioned against the wider box. Raise max-width; the square follows.
         Unlike cold-line the handles here are already PERCENTAGES of the bench
         (14%/13% with matching negative margins), so they scale for free — no
         handle ramp, and adding one would double-scale them.
         The bench is square, so height = width; each value is the tier's own
         MINIMUM height less the measured chrome, with a fourth height-keyed
         step so a 1440-tall board is not held at tier C's 1150 floor. */
      /* ⚠⚠ AND THE HINT HAS TO BE PINNED TO ITS OWN ROW — via max-width,
         NOT via flex. Once the bench was wide enough to leave 762px beside
         it, the hint flowed UP next to the apparatus and floated at
         mid-height instead of captioning it (measured at 2560: hint
         x1501..2121 against a bench ending at 1420).
         `flex:0 0 100%` did NOT fix it, and the computed style confirmed the
         rule was applying (basis 100%, shrink 0) while the element still
         rendered 620px on the same line: a flex item's HYPOTHETICAL MAIN
         SIZE is the flex base size CLAMPED BY min/max-width, and line
         breaking uses the hypothetical size — so `max-width:620px` decided
         the wrap before flex-basis ever got a say. Raising the cap past the
         leftover space is what actually breaks the line, and it makes the
         caption readable at board size besides.
         Scoped to the tiers; 1366 already wraps and stays byte-identical. */
      + '@media (min-width:1367px) and (min-height:880px){'
      + '  body.bpl-wide .bpl-hint{max-width:760px;font-size:18px;}'
      + '  body.bpl-wide .bpl-bench{max-width:576px;}'
      + '  body.bpl-wide .bpl-foot,body.bpl-wide .bpl-gate{max-width:760px;}'
      + '}'
      + '@media (min-width:1800px) and (min-height:1080px){'
      + '  body.bpl-wide .bpl-bench{max-width:780px;}'
      + '  body.bpl-wide .bpl-foot,body.bpl-wide .bpl-gate{max-width:920px;}'
      + '  body.bpl-wide .bpl-hint{max-width:900px;font-size:20px;}'
      + '}'
      + '@media (min-width:2400px) and (min-height:1150px){'
      + '  body.bpl-wide .bpl-bench{max-width:840px;}'
      + '  body.bpl-wide .bpl-foot,body.bpl-wide .bpl-gate{max-width:1000px;}'
      + '  body.bpl-wide .bpl-hint{max-width:1040px;font-size:22px;}'
      + '}'
      + '@media (min-width:2400px) and (min-height:1300px){'
      + '  body.bpl-wide .bpl-bench{max-width:980px;}'
      + '}'

      + '@media print{'
      + '*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
      + '.bpl-bench,.bpl-foot,.bpl-hint,.bpl-gate,.lcs-header,.lcs-bar{display:none !important;}'
      + '.bpl-sheet{display:flex !important;flex-wrap:wrap;}'
      + '}';
    document.head.appendChild(s);
  }
}());
