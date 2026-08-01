/* =====================================================================
   TOOL #40 — THE UNIT HANDLE   (unit-handle.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #5. Catalog slot B3, and the first
   of wave 2, the measurement spine.

   THE OBJECT · THE TAPES · THE UNIT. Three named parts, and nothing else
   in this tool gets a noun.

   THE ROUTINE, which is what makes this an instrument and not a game:
     "Measure it with these."
      ... and then the move that matters:
     "Now make the unit smaller. What happened to the number?"

   THE ONE THESIS — THE NUMBER CHANGED AND THE OBJECT DID NOT. That is
   the whole of 2.MD.A.2, and it is the one thing a cupboard full of
   fixed unit sets cannot show. YOU CANNOT OWN A RULER WHOSE CENTIMETRE
   GROWS. Every physical unit set is fixed-size by definition; continuity
   of the unit is the one move only a screen can make.

   THREE INVENTIONS:
     1. ⭐ THE UNIT ITSELF IS THE DRAGGABLE THING. Not a slider beside the
        tape, not a menu of sizes — you grab the first tile's edge and
        stretch it, and the whole tape re-lays under your finger while
        its numeral climbs. Every other cover, unit and scale on this
        platform is a fixed size you place or a discrete option you pick.
     2. BOTH COUNTS ARE LIVE AT ONCE. Two tapes under one object, each
        with its own unit. Push the top one smaller and its numeral
        climbs while the bottom sits perfectly still. The comparison is
        not a memory of the previous measurement — it is on screen.
     3. THE OBJECT CANNOT FLINCH. Its geometry is a pure function of the
        object and nothing else, gated byte-exactly across every unit
        setting of both tapes. The one thing the class must trust is that
        the thing being measured did not move.

   ⚠ THE FENCE — FOUR SURFACES, RUN FRESH, and the catalog's own fence
   line was stale for the fourth time (it said "all 38 tools"; there are
   43, and it named two of the four surfaces). Re-run in full:
   **`2.MD.A.2` appears exactly ONCE in this repo — inside that claim.**
     TOOLS — `measurement-bench` LENGTH is the nearest thing and it is
       the opposite: units are HARD-CODED fixed sizes (`:214`
       `clip {w:45}`, `cube {w:30}`), it lays ONE tape, and switching
       unit WIPES the layout (`:1215-1220` `self.placed = []`). It
       computes both numbers and throws each away before the other is
       made. `ruler.js` drags ENDPOINTS, not a unit, and owns standard
       units (2.MD.A.1). `lay-units-core.js:44-45` ACTIVELY BANS mixed
       sizes (`return {status:'mixed-size'}`), and
       `docs/character-art-spec.md:412` makes it doctrine: "art cannot
       resize a helper".
     ACTIVITIES — 204 rows. The ladder K.MD.A.1 → K.MD.A.2 → 1.MD.A.1 →
       1.MD.A.2 → 2.MD.A.1 → 2.MD.A.3 → 2.MD.A.4 is fully occupied.
       2.MD.A.2 is the single missing rung.
     PRINTABLES — 240 types. G1-139, G1-140, G2-235, G2-236 all measure
       with a FIXED unit (`_shared/measurement-tasks.js:23` `const U=44`).
       G2-236 compares two OBJECTS in one unit — never one object in two
       units.
     APPS — 33. Zero length generators.
   And the MECHANIC — a drag handle that changes a repeated element's
   SIZE and re-lays the repetition — exists nowhere in the codebase.

   ⚠ THE ONE NEAR-MISS, CITED RATHER THAN HIDDEN, because it is the best
   argument for this tool: `lay-units-activities.json:258` has an
   `inverse-leaf` round — one leaf, a hard-coded `smallWidth: 4`, both
   rows built by a `for` loop, shown SEQUENTIALLY (never together), and
   ungraded, with the conclusion PRE-SPOKEN: `sayInverse: "Smaller
   helpers, more of them!"`. The platform already tried to teach this
   and could only TELL the class the answer. This tool lets them watch
   it happen instead.

   REFUSES, FOREVER — each one gated:
     1. NO NAMED UNIT. Never cm, never inches, never "paperclips".
        `ruler.js` owns standard units and the no-words law forbids the
        label anyway. The unit has a size and no name.
     2. THE CHILD NEVER LAYS A TILE. Laying units end to end with no gaps
        is 1.MD.A.2 and `lay-units-core` owns it. Here the tiles lay
        themselves and the child changes the SIZE.
     3. NO "WHICH IS LONGER". 2.MD.A.4 belongs to `span-length-gap`.
     4. NO VERDICT. Neither count is ever marked right, better or closer,
        and no path in this file brings the two counts into contact.
     5. THE OBJECT NEVER CHANGES when a unit changes. Gated.
     6. NO score, timer, streak. NO speech — LCSAudio silently
        substitutes a missing voice and TTS is reliable in 5 of 11
        locales.

   ⚠ §23.7 lists "capacity/weight/non-standard length" as a CLOSED
   strand, on the grounds that `measurement-bench` owns it. B3 is
   nonetheless the approved wave-2 opener, and the fence above measures
   that ownership claim false on the one point this tool depends on: a
   bench whose unit sizes are two hard-coded constants does not own a
   unit you can stretch. Recorded here so the next reader does not have
   to re-derive it.
   ===================================================================== */

var UnitHandle = {
  id: 'unit-handle',

  /* ---------------------------------------------------------------
     STRINGS — GENERATED. EN is authored; the other ten are REBUILT (not
     translated) by a three-person NATIVE panel per locale, §A.13.48.
     ⚠ DO NOT HAND-EDIT A LOCALE HERE. The source of truth is
     scripts/_unit-handle-strings.js; scripts/apply-unit-handle-locales.js
     rewrites this whole block from it.
     --------------------------------------------------------------- */
  strings: {
    title:       { en: "The Unit Handle", de: "Die dehnbare Einheit", fr: "L'étalon élastique", es: "Estira la unidad", pt: "A Unidade que Estica", it: "L'unità elastica", nl: "De Rekbare Maat", sv: "Enhetsremsan", da: "Strækbåndet", no: "Strekkbåndet", fi: "Venyvä yksikkö" },
    instruction: { en: "Two tapes, one object. Stretch a tape's unit and watch its number change — while the object, and the other tape, stay exactly where they are.", de: "Zwei Streifen, ein Gegenstand: Zieh die Einheit eines Streifens größer oder kleiner – die Zahl am Ende verändert sich, während der Gegenstand und der andere Streifen genau dort bleiben, wo sie sind.", fr: "Deux bandes, un seul objet. Étire l'étalon d'une bande : son nombre change, alors que l'objet et l'autre bande, eux, ne bougent pas.", es: "Dos tiras, un solo objeto. Estira la unidad de una tira y mira cómo cambia su número: el objeto y la otra tira se quedan donde están.", pt: "Duas fitas, um só objeto. Estique a unidade de uma fita e veja o número dela mudar — enquanto o objeto e a outra fita ficam exatamente onde estão.", it: "Due strisce, un solo oggetto. Allungate l'unità di una striscia e guardate come cambia il suo numero: l'oggetto e l'altra striscia restano esattamente dove sono.", nl: "Twee stroken, één voorwerp. Rek de maat van één strook uit en kijk hoe het getal verandert — het voorwerp en de andere strook blijven precies waar ze zijn.", sv: "Två remsor, ett föremål. Dra i en remsas enhet och se hur talet ändras – medan föremålet och den andra remsan står kvar precis som de är.", da: "To bånd, én genstand. Stræk enheden på det ene bånd, og se tallet ændre sig – mens genstanden og det andet bånd ligger helt stille.", no: "To bånd, én gjenstand. Strekk enheten på det ene båndet og se hvordan tallet endrer seg – mens gjenstanden og det andre båndet står helt i ro.", fi: "Kaksi nauhaa, yksi esine. Venytä toisen nauhan yksikköä ja katso, miten sen luku muuttuu – esine ja toinen nauha pysyvät paikoillaan." },

    hintStretch: { en: "Drag the end of a first tile to make its unit bigger or smaller.", de: "Zieh am Ende des ersten Plättchens – so wird seine Einheit größer oder kleiner.", fr: "Fais glisser le bord de la première case pour agrandir ou réduire l'étalon.", es: "Arrastra el borde de la primera pieza para hacer su unidad más grande o más pequeña.", pt: "Arraste a ponta da primeira peça para deixar a unidade maior ou menor.", it: "Trascinate l'estremità della prima piastrella per rendere l'unità più grande o più piccola.", nl: "Sleep aan het einde van het eerste blokje om de maat groter of kleiner te maken.", sv: "Dra i kanten på den första biten – då blir enheten större eller mindre.", da: "Træk i kanten af den første brik for at gøre enheden større eller mindre.", no: "Dra i enden av den første biten for å gjøre enheten større eller mindre.", fi: "Vedä ensimmäisen palan reunasta: yksikkö suurenee tai pienenee." },
    hintCompare: { en: "The two tapes measure the same object. Why are the numbers different?", de: "Beide Streifen messen denselben Gegenstand. Warum sind die Zahlen verschieden?", fr: "Les deux bandes mesurent le même objet. Pourquoi les nombres sont-ils différents ?", es: "Las dos tiras miden el mismo objeto. ¿Por qué los números son distintos?", pt: "As duas fitas medem o mesmo objeto. Por que os números são diferentes?", it: "Le due strisce misurano lo stesso oggetto. Perché i numeri sono diversi?", nl: "Beide stroken meten hetzelfde voorwerp. Waarom staan er verschillende getallen?", sv: "Remsorna mäter samma föremål. Varför blir talen olika?", da: "De to bånd måler den samme genstand. Hvorfor er tallene forskellige?", no: "Begge båndene måler den samme gjenstanden. Hvorfor er tallene forskjellige?", fi: "Molemmat nauhat mittaavat samaa esinettä. Miksi luvut ovat erilaiset?" },
    hintOver:    { en: "That unit does not fit a whole number of times. The last piece is left over.", de: "Diese Einheit geht nicht ganz auf. Das letzte Stück bleibt übrig.", fr: "Cet étalon ne tient pas un nombre entier de fois : il reste un morceau.", es: "Esa unidad no cabe un número exacto de veces: el último trozo sobra.", pt: "Essa unidade não cabe um número exato de vezes: o último pedaço sobra.", it: "Quest'unità non ci sta un numero intero di volte: l'ultimo pezzo avanza.", nl: "Deze maat past niet een heel aantal keer. Het laatste stukje blijft over.", sv: "Den enheten går inte jämnt upp. Det blir en bit över.", da: "Den enhed går ikke op. Det sidste stykke bliver til overs.", no: "Denne enheten går ikke opp. Den siste biten blir til overs.", fi: "Tämä yksikkö ei mahdu tasan. Viimeinen pala jää yli." },

    fitBtn:      { en: "Make it come out even", de: "Ohne Rest messen", fr: "Faire tomber juste", es: "Que salga exacto", pt: "Caber sem sobra", it: "Togli l'avanzo", nl: "Precies laten passen", sv: "Så det går jämnt upp", da: "Få det til at gå op", no: "Få det til å gå opp", fi: "Tasan menevä yksikkö" },
    matchBtn:    { en: "Same unit on both", de: "Gleiche Einheit", fr: "Le même étalon", es: "Igualar las unidades", pt: "Igualar as unidades", it: "Stessa unità", nl: "Zelfde maat op beide", sv: "Samma enhet på båda", da: "Samme enhed på begge", no: "Samme enhet på begge", fi: "Yhtä suuret yksiköt" },
    newObjBtn:   { en: "Another object", de: "Anderer Gegenstand", fr: "Un autre objet", es: "Otro objeto", pt: "Outro objeto", it: "Un altro oggetto", nl: "Ander voorwerp", sv: "Ett annat föremål", da: "Ny genstand", no: "Ny gjenstand", fi: "Toinen esine" },
    printBtn:    { en: "Print the bench", de: "Messtisch drucken", fr: "Imprimer le plateau", es: "Imprimir la mesa", pt: "Imprimir a bancada", it: "Stampa il tavolo", nl: "Blad afdrukken", sv: "Skriv ut bänken", da: "Udskriv bordet", no: "Skriv ut benken", fi: "Tulosta mittauspöytä" },

    gateLine:    { en: "The whole object shelf and printing are part of the Teacher plan.", de: "Das ganze Regal mit Gegenständen und das Drucken gehören zum Lehrer-Paket.", fr: "La collection complète d'objets et l'impression font partie de l'offre Enseignant.", es: "El estante completo de objetos y la impresión forman parte del plan Docente.", pt: "A prateleira completa de objetos e a impressão fazem parte do plano Professor.", it: "Lo scaffale completo degli oggetti e la stampa fanno parte del piano Insegnante.", nl: "Alle voorwerpen en het afdrukken horen bij het Leerkracht-pakket.", sv: "Hela föremålshyllan och utskrifterna ingår i Lärarpaketet.", da: "Hele hylden med genstande og udskrivning er en del af Lærerabonnementet.", no: "Hele hylla med gjenstander og utskrift er en del av Lærerabonnementet.", fi: "Koko esinevalikoima ja tulostus kuuluvat Opettaja-tilaukseen." },
    unlock:      { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l'offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Tutustu Opettaja-tilaukseen" },

    benchLabel:  { en: "the bench", de: "der Messtisch", fr: "le plateau", es: "la mesa de medir", pt: "a bancada", it: "il tavolo", nl: "het blad", sv: "bänken", da: "bordet", no: "benken", fi: "mittauspöytä" },
    objectAria:  { en: "the object being measured", de: "der Gegenstand, der gemessen wird", fr: "l'objet à mesurer", es: "el objeto que se mide", pt: "o objeto que está sendo medido", it: "l'oggetto da misurare", nl: "het voorwerp dat gemeten wordt", sv: "föremålet som mäts", da: "genstanden, der måles", no: "gjenstanden som måles", fi: "mitattava esine" },
    tapeAria:    { en: "tape {i}", de: "Streifen {i}", fr: "bande {i}", es: "tira {i}", pt: "fita {i}", it: "striscia {i}", nl: "strook {i}", sv: "remsa {i}", da: "bånd {i}", no: "bånd {i}", fi: "nauha {i}" },
    handleAria:  { en: "the unit on tape {i} — drag to resize", de: "die Einheit auf Streifen {i} – zum Ändern ziehen", fr: "l'étalon de la bande {i} — faire glisser pour changer sa taille", es: "la unidad de la tira {i}: arrastra para cambiar su tamaño", pt: "a unidade da fita {i} — arraste para mudar o tamanho", it: "l'unità della striscia {i} — trascina per cambiarne la grandezza", nl: "de maat op strook {i} — sleep om te vergroten of te verkleinen", sv: "enheten på remsa {i} – dra för att ändra storlek", da: "enheden på bånd {i} – træk for at ændre størrelsen", no: "enheten på bånd {i} – dra for å endre størrelse", fi: "nauha {i}: yksikkö – vedä ja muuta kokoa" },
    countAria:   { en: "tape {i} holds {n}", de: "Streifen {i} enthält {n}", fr: "la bande {i} en contient {n}", es: "la tira {i} tiene {n}", pt: "a fita {i} tem {n}", it: "striscia {i}: contiene {n}", nl: "strook {i} bevat {n}", sv: "remsa {i} visar {n}", da: "bånd {i} rummer {n}", no: "bånd {i} rommer {n}", fi: "nauha {i}: luku {n}" },
    overAria:    { en: "and a piece left over", de: "und ein Stück bleibt übrig", fr: "et un morceau qui dépasse", es: "y sobra un trozo", pt: "e sobra um pedaço", it: "e un pezzo che avanza", nl: "en er blijft een stukje over", sv: "och en bit över", da: "og et stykke til overs", no: "og en bit til overs", fi: "ja yksi pala jää yli" }
  },

  STORE_KEY: 'lcs:unit-handle:v1',
  ENT_TRUST_DAYS: 14,

  defaults: {},
  settings: [],

  premium: false,
  premiumKnown: false,

  /* =================================================================
     THE MODEL SPACE, and where its numbers come from.

     W = 1000 model units wide (the lids.js convention); the view scales
     it. The object occupies [X0, X0 + L] and both tapes start at X0.

     ⚠ THE OBJECT LENGTHS ARE THE BENCH'S, SCALED BY 16/9. measurement-
     bench draws its length objects at 180/270/360/450 in a 660-wide
     stage. Kept at those numbers here, the longest object would fill
     less than half the bench and the smallest would afford a count of
     four — no range, and no drama. 16/9 maps them EXACTLY onto
     320/480/640/800 (every one an integer), so the ratios between
     objects are untouched — a key is still shorter than a kayak — and
     the longest object reaches the end of the bench.

     ⚠ AND THE UNIT BAND IS SET BY LEGIBILITY, NOT BY THE CATALOG. The
     catalog's gate spec says "every unit size 1…1000 … 499,500 pairs".
     C(1000,2) is arithmetically right and physically impossible: at
     u = 1 the tape carries a thousand tiles. No class counts that and no
     phone renders it. U_MIN is the smallest tile that stays legible —
     MEASURED at 320px by the browser gate, not guessed — and MIN_COUNT
     is 2, because one tile is not a measurement.
     ================================================================= */
  W: 1000,
  /* ⚠ THE BENCH IS TWO STACKED ZONES, AND THAT IS A CORRECTNESS
     REQUIREMENT, NOT A STYLE CHOICE.

     The object's horizontal placement is a percentage of the box WIDTH
     and its vertical placement a percentage of the box HEIGHT, so it
     lands on the bench line only while the box keeps the model's aspect
     ratio. Lock the WHOLE bench to one aspect and a 320px phone gets a
     145px-tall bench whose tapes are 23px — and a 23px drag control is
     not a control anyone can hit. The sweep caught exactly that, at
     every width below 768.

     So: the OBJECT ZONE keeps the aspect (1000 x H_OBJ) and scales with
     width, while the TAPE ZONE below it is a fixed pixel stack. The
     x-axis stays model-exact in both — same width, same X0, same
     formula — and the tapes keep a real tap target at every width.

     H_OBJ is MEASURED: the tallest object on the shelf (the ladder)
     stands 243 model units above the line, so 260 clears it. */
  H_OBJ: 260,
  BASE: 260,          /* the bench line IS the bottom of the object zone */
  /* ⚠ MEASURED, NOT CHOSEN — and raised once the browser gate measured
     it. At 45 the smallest whole tile rendered 32.3px on a 680px bench,
     under the 34px canvas floor, so the floor moved the TOOL rather than
     the gauge: 50 model units is 34px at desktop and 14.5px on a 320px
     phone. It costs two counts at the top of the range (2..12 instead of
     2..14) and buys a tile a six-year-old can actually see. */
  U_MIN: 50,          /* smallest unit, in model units — legibility floor */
  MIN_COUNT: 2,       /* one tile is not a measurement */
  FREE_OBJECTS: 6,
  LEN_SCALE: 16 / 9,  /* the bench's 180/270/360/450 -> 320/480/640/800 */

  /* the largest unit that still lays MIN_COUNT tiles */
  uMax: function (L) { return Math.floor(L / this.MIN_COUNT); },
  /* the largest count this object can carry at the legibility floor */
  maxCount: function (L) { return Math.floor(L / this.U_MIN); },

  /* =================================================================
     THE MODEL — pure, total, immutable. No DOM, no locale, no Date, and
     no randomness at all: the bench is a function of (object, uA, uB).
     ================================================================= */

  newState: function () {
    return {
      obj: 0,           /* index into the object shelf */
      uA: 160,          /* tape 1's unit, in model units */
      uB: 100           /* tape 2's unit */
    };
  },

  /* ⚠ TOTAL MEANS TOTAL — the lids.js lesson. `st || newState()` catches
     null and 0 and hands `{}` straight through to a property read. */
  _st: function (st) {
    return (st && typeof st === 'object' &&
            typeof st.obj === 'number' && isFinite(st.obj) &&
            typeof st.uA === 'number' && isFinite(st.uA) &&
            typeof st.uB === 'number' && isFinite(st.uB)) ? st : this.newState();
  },

  _clone: function (st) {
    var s = this._st(st);
    return { obj: s.obj, uA: s.uA, uB: s.uB };
  },

  shelf: function () {
    var all = (this.data && this.data.objects) || [], out = [], i;
    /* locked objects are ABSENT from the array, never merely hidden */
    for (i = 0; i < all.length; i++) if (i < this.FREE_OBJECTS || this.premium) out.push(all[i]);
    return out;
  },

  objectOf: function (st) {
    var s = this._st(st), shelf = this.shelf();
    if (!shelf.length) return null;
    var i = s.obj % shelf.length;
    if (i < 0) i += shelf.length;
    return shelf[i];
  },

  /* the object's length on the bench, in model units */
  lengthOf: function (st) {
    var o = this.objectOf(st);
    return o ? Math.round(o.w * this.LEN_SCALE) : 0;
  },

  /* the bench is centred, so both tapes start at the object's left edge */
  originOf: function (st) {
    return Math.round((this.W - this.lengthOf(st)) / 2);
  },

  unitOf: function (st, which) {
    var s = this._st(st);
    return which === 'b' ? s.uB : s.uA;
  },

  /* ⭐ THE WHOLE ARITHMETIC OF THE TOOL, in two lines. */
  countOf: function (st, which) {
    var L = this.lengthOf(st), u = this.unitOf(st, which);
    if (!(u > 0) || !(L > 0)) return 0;
    return Math.floor(L / u);
  },
  remainderOf: function (st, which) {
    var L = this.lengthOf(st), u = this.unitOf(st, which);
    if (!(u > 0) || !(L > 0)) return 0;
    return L - u * this.countOf(st, which);
  },

  /* every tile's left edge, in model units. ⚠ x0 + i*u, NEVER a running
     accumulator — the rekenrek/measurement-bench anti-drift rule. The
     last entry is the REMAINDER and is flagged, never counted. */
  tilesOf: function (st, which) {
    var s = this._st(st);
    var L = this.lengthOf(s), u = this.unitOf(s, which), x0 = this.originOf(s);
    var n = this.countOf(s, which), rem = this.remainderOf(s, which), out = [], i;
    if (!(u > 0) || !(L > 0)) return out;
    for (i = 0; i < n; i++) out.push({ x: x0 + i * u, w: u, part: false });
    if (rem > 0) out.push({ x: x0 + n * u, w: rem, part: true });
    return out;
  },

  setUnit: function (st, which, u) {
    var s = this._clone(st);
    var L = this.lengthOf(s);
    var v = Math.round(Number(u));
    if (!isFinite(v)) return null;
    if (v < this.U_MIN || v > this.uMax(L)) return null;
    if (v === this.unitOf(s, which)) return null;
    if (which === 'b') s.uB = v; else s.uA = v;
    return s;
  },

  /* ⭐ THE NEXT UNIT THAT COMES OUT EVEN. Enter/Space on a handle steps
     to the next divisor of L inside the band — a real teaching move
     ("make it fit"), and a MOVE rather than a toggle, because the
     liveness gate presses both keys in one tick and a toggle would flip
     back and report itself dead (the recorded lids lesson). */
  evenFits: function (st) {
    var L = this.lengthOf(st), out = [], u;
    if (!(L > 0)) return out;
    for (u = this.U_MIN; u <= this.uMax(L); u++) if (L % u === 0) out.push(u);
    return out;
  },
  nextEvenFit: function (st, which) {
    var fits = this.evenFits(st);
    if (!fits.length) return null;
    var cur = this.unitOf(st, which), i;
    for (i = 0; i < fits.length; i++) if (fits[i] > cur) return this.setUnit(st, which, fits[i]);
    return this.setUnit(st, which, fits[0]);
  },

  /* ⭐ THE KEYBOARD STEPS BY COUNT, NOT BY PIXEL. An arrow that nudges
     the unit five model units is a key you can press six times with the
     numeral never moving — a control that produces no visible change,
     which is precisely the defect the numeral strip on The Lids was
     reported for. The class reads the COUNT, so that is what a press
     changes: the largest unit that yields count c is floor(L/c), so
     landing there steps the numeral by exactly one and the drag stays
     continuous for the mouse, which is where the invention lives. */
  stepCount: function (st, which, delta) {
    var s = this._st(st);
    var L = this.lengthOf(s);
    var c = this.countOf(s, which) + delta;
    if (!(L > 0) || !(c >= this.MIN_COUNT) || c > this.maxCount(L)) return null;
    return this.setUnit(s, which, Math.floor(L / c));
  },

  /* both tapes to tape 1's unit — the "why are they the same now?" move */
  matchUnits: function (st) {
    var s = this._clone(st);
    if (s.uB === s.uA) return null;
    s.uB = s.uA;
    return s;
  },

  /* ⚠ CHANGING THE OBJECT RE-CLAMPS BOTH UNITS. A unit legal on a
     800-long kayak can be illegal on a 320-long key, and carrying it
     over would put the bench in a state setUnit itself would refuse. */
  stepObject: function (st) {
    var s = this._clone(st);
    var shelf = this.shelf();
    if (shelf.length < 2) return null;
    s.obj = (s.obj + 1) % shelf.length;
    var L = this.lengthOf(s), hi = this.uMax(L);
    s.uA = Math.max(this.U_MIN, Math.min(hi, s.uA));
    s.uB = Math.max(this.U_MIN, Math.min(hi, s.uB));
    return s;
  },

  /* =================================================================
     THE OBJECT SHELF. Locale-NEUTRAL by construction: an entry is an
     image key, a length and a trim box, so it carries no words in any
     language. ⚠ The fallback carries the FREE objects inline — a 404
     must degrade to the free tier, not to nothing (the recorded
     arrow-strip Mat Book defect).
     ================================================================= */
  FALLBACK_OBJECTS: {
    version: 1, freeCount: 6, premiumCount: 12,
    objects: [
      { k: 'crayon', theme: 'classroom', noun: 'crayon', w: 180, rot: 90, trim: { x: 384, y: 23, w: 232, h: 985 }, iw: 1024, ih: 1024 },
      { k: 'fork', theme: 'around the house', noun: 'fork', w: 180, rot: 90, trim: { x: 426, y: 25, w: 164, h: 986 }, iw: 1024, ih: 1024 },
      { k: 'skateboard', theme: 'toys', noun: 'skateboard', w: 270, rot: 0, trim: { x: 29, y: 374, w: 966, h: 299 }, iw: 1024, ih: 1024 },
      { k: 'celery', theme: 'vegetables', noun: 'celery', w: 270, rot: 90, trim: { x: 344, y: 30, w: 340, h: 974 }, iw: 1024, ih: 1024 },
      { k: 'ladder', theme: 'tools', noun: 'ladder', w: 360, rot: 90, trim: { x: 320, y: 24, w: 375, h: 989 }, iw: 1024, ih: 1024 },
      { k: 'shovel', theme: 'around the house', noun: 'shovel', w: 360, rot: 90, trim: { x: 387, y: 25, w: 270, h: 984 }, iw: 1024, ih: 1024 }
    ]
  },

  _fetchObjects: function () {
    var self = this;
    fetch('/mini-tools/unit-handle-objects.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_OBJECTS; })
      .then(function (d) {
        self.data = (d && d.objects && d.objects.length) ? d : self.FALLBACK_OBJECTS;
        if (self._wrap) self.render();
      });
  },

  _imgUrl: function (o) {
    return '/image-library-webp/themes/' + encodeURIComponent(o.theme) + '/' + encodeURIComponent(o.noun) + '@2x.webp';
  },

  /* ⚠ PURE TRIM-EXACT PLACEMENT — the affine copied as a PATTERN from
     measurement-bench.js:635-659 (nothing is imported; every tool on
     this platform is self-contained). Maps the DEPICTED object's
     trimmed box onto [X0, X0+L] with its bottom on the bench line;
     rot=90 lies the illustration down. It is a function of the OBJECT
     ALONE — no unit, no tape, no state — which is what makes invention
     3 gate-able: the object provably cannot flinch. */
  placement: function (o, X0, L, baseY) {
    if (!o) return null;
    var t = o.trim;
    if (o.rot === 90) {
      /* ⚠ left/top IN MODEL UNITS AND ONLY `rotate` IN THE TRANSFORM.
         The bench version of this affine carries the offset inside
         `translate(Xpx, Ypx) rotate(90deg)`, which is correct in px but
         cannot survive the conversion to a scalable box: a PERCENTAGE
         translate is a percentage of THE ELEMENT'S OWN SIZE, not of its
         container. Converting it put a 1024-wide crayon a third of a
         screen away from the tapes that were supposed to start at its
         left edge — which is the one alignment this whole tool is about.
         Positioning at (A,B) and rotating about the top-left corner is
         the same transform, and left/top ARE container-relative. */
      var k = L / t.h;
      return { width: o.iw * k, left: X0 + (t.y + t.h) * k, top: baseY - (t.x + t.w) * k, rot: true };
    }
    var k0 = L / t.w;
    return { width: o.iw * k0, left: X0 - t.x * k0, top: baseY - (t.y + t.h) * k0, rot: false };
  },

  /* =================================================================
     STORE + ENTITLEMENT — the pattern from lids.js:540-579.
     ================================================================= */
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
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectUnitHandleCSS();
    this._store = this._loadStore();
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this.data = this.FALLBACK_OBJECTS;
    this.st = this.newState();
    this._timers = [];
    this._fetchObjects();
    this._fetchEntitlement();
    this.render();
  },

  reset: function () {
    this.st = this.newState();
    this.render();
  },

  destroy: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  render: function () {
    var api = this.api;
    /* ⚠ locking a control is not enough — reset the STATE it produced.
       If we learn the account is free while a paid object is on the
       bench, put it back (the pattern-bench:290 rule). */
    if (this.premiumKnown && !this.premium) {
      var shelf = this.shelf();
      if (shelf.length && this.st.obj >= shelf.length) {
        this.st.obj = 0;
        var L0 = this.lengthOf(this.st), hi0 = this.uMax(L0);
        this.st.uA = Math.max(this.U_MIN, Math.min(hi0, this.st.uA));
        this.st.uB = Math.max(this.U_MIN, Math.min(hi0, this.st.uB));
      }
    }
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'unh-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildHint());
    wrap.appendChild(this._buildBench());
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
  },

  _buildHint: function () {
    var api = this.api, s = this.st, hint = api.el('div', 'unh-hint');
    var over = this.remainderOf(s, 'a') > 0 || this.remainderOf(s, 'b') > 0;
    /* ⚠ THE LADDER BRANCHES ON THE UNITS, NEVER ON THE COUNTS. The first
       draft asked `countOf(a) === countOf(b)`, and the gate was right to
       refuse it: the moment anything in this file brings the two counts
       into contact, a verdict is one line away. Equal units give
       identical tapes, so this is the same test made of the apparatus
       rather than of the measurements. */
    if (s.uA === s.uB) hint.textContent = api.t('hintStretch');
    else if (over) {
      var q = api.el('span', 'unh-hline'); q.textContent = api.t('hintCompare');
      var m = api.el('span', 'unh-hline'); m.textContent = api.t('hintOver');
      hint.appendChild(q); hint.appendChild(m);
    } else hint.textContent = api.t('hintCompare');
    return hint;
  },

  /* =================================================================
     THE BENCH. One object across the top, two tapes beneath it, both
     starting at the object's left edge.
     ⚠ EVERY GEOMETRY IS A PERCENTAGE OF THE MODEL BOX, so the whole
     bench scales with its container and the tapes cannot drift apart
     from the object — they share one X0 and one formula, which is the
     estimation-jar.js:537-540 discipline.
     ================================================================= */
  _buildBench: function () {
    var api = this.api, self = this, s = this.st;
    var box = api.el('div', 'unh-bench');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('benchLabel'));
    var zone = api.el('div', 'unh-objzone');
    var tapes = api.el('div', 'unh-tapes');

    var o = this.objectOf(s), L = this.lengthOf(s), X0 = this.originOf(s);
    var BASE = this.BASE;

    if (o) {
      var img = document.createElement('img');
      img.className = 'unh-obj';
      img.alt = '';
      img.setAttribute('aria-label', api.t('objectAria'));
      img.draggable = false;
      img.src = this._imgUrl(o);
      var p = this.placement(o, X0, L, BASE);
      /* ⭐ percentages of the model box, and a pure function of the
         object — no unit anywhere in this block. Invention 3. */
      img.style.width = (p.width / this.W * 100) + '%';
      img.style.left = (p.left / this.W * 100) + '%';
      img.style.top = (p.top / this.H_OBJ * 100) + '%';
      img.style.transformOrigin = 'top left';
      img.style.transform = p.rot ? 'rotate(90deg)' : 'none';
      zone.appendChild(img);
    }

    tapes.appendChild(this._buildTape('a', 1, 0));
    tapes.appendChild(this._buildTape('b', 2, 1));
    box.appendChild(zone);
    box.appendChild(tapes);
    return box;
  },

  _buildTape: function (which, n, row) {
    var api = this.api, self = this, s = this.st;
    var tape = api.el('div', 'unh-tape unh-tape-' + which);
    tape.style.top = (row * 56) + 'px';
    tape.setAttribute('role', 'group');
    tape.setAttribute('aria-label', api.t('tapeAria').replace('{i}', String(n)));

    var tiles = this.tilesOf(s, which), i;
    for (i = 0; i < tiles.length; i++) {
      (function (t, idx) {
        var el = api.el('div', 'unh-tile' + (t.part ? ' unh-part' : '') + (idx === 0 && !t.part ? ' unh-first' : ''));
        el.style.left = (t.x / self.W * 100) + '%';
        el.style.width = (t.w / self.W * 100) + '%';
        el.setAttribute('aria-hidden', 'true');
        tape.appendChild(el);
      }(tiles[i], i));
    }

    /* ⭐ THE GRIP IS THE CONTROL; THE TILE IS CANVAS. The unit itself is
       still the draggable thing — you take hold of its right edge — but
       a tile is exactly u wide by definition, and at the legibility
       floor on a 320px phone that is 13px. A 13px control is not a
       control. So the grip is a 44px-wide button CENTRED on the first
       tile's edge, overlapping the tile on both sides; the tile keeps
       the canvas floor and the grip keeps the control floor, which is
       why this file measures the two separately and never with an
       or-shaped assertion. */
    var u = this.unitOf(s, which), x0 = this.originOf(s);
    var grip = api.el('button', 'unh-grip');
    grip.type = 'button';
    grip.style.left = ((x0 + u) / this.W * 100) + '%';
    grip.setAttribute('aria-label', api.t('handleAria').replace('{i}', String(n)));
    this._wireHandle(grip, which, tape);
    tape.appendChild(grip);

    /* the count — a numeral, which the no-words law explicitly allows */
    var cnt = api.el('div', 'unh-count');
    cnt.style.left = ((this.originOf(s) + this.lengthOf(s)) / this.W * 100 + 1.4) + '%';
    cnt.textContent = String(this.countOf(s, which));
    var aria = api.t('countAria').replace('{i}', String(n)).replace('{n}', String(this.countOf(s, which)));
    if (this.remainderOf(s, which) > 0) aria += ', ' + api.t('overAria');
    cnt.setAttribute('aria-label', aria);
    tape.appendChild(cnt);
    return tape;
  },

  /* ⭐ THE HANDLE. The first tile's right edge follows your finger: the
     pointer x IS the unit size, measured from the object's left edge.
     Choreography copied as a PATTERN from LCS.drag.linear
     (lcs-shell.js:340-410) and lids.js:808-841 — pointer capture,
     listeners attached on down and removed on up, no full re-render
     mid-drag, model-space quantisation.
     ⚠ THE KEYBOARD TWIN IS NOT OPTIONAL. Arrows nudge, PageUp/Down jump,
     Home/End take the band ends — and Enter/Space steps to the next unit
     that COMES OUT EVEN, because the liveness gate presses both keys in
     one tick and a drag handle that answers neither is unusable to
     anyone who cannot drag (the recorded lids finding). */
  _wireHandle: function (el, which, tape) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      ev.preventDefault();
      try { el.setPointerCapture(ev.pointerId); } catch (_) {}
      /* ⚠ SNAPSHOT THE TAPE'S RECT ONCE, HERE. _repaint replaces the tape
         node on every move, so the `tape` this closure captured is
         detached from the second move onward and reports a zero-width
         rect — which the guard below then treats as "not ready" and
         skips. The result was a drag that applied its FIRST move and
         silently ignored every one after it: the grip followed the
         finger for one frame and then stuck. The tape cannot move during
         a drag, so one snapshot is not just a fix, it is the correct
         reading. */
      var rect = tape.getBoundingClientRect();
      var move = function (e) {
        var r = rect;
        if (!r.width) return;
        var x = (e.clientX - r.left) / r.width * self.W;
        /* ⚠ CLAMP INTO THE BAND, do not let the model's refusal be the
           UX. setUnit correctly returns null outside [U_MIN, uMax], and
           the first draft passed the raw pointer straight to it — so
           pulling the grip past the end of the object simply froze it,
           with no edge, no resistance and no explanation. The model
           still refuses; the drag now stops AT the limit, which is what
           a physical handle does. */
        var L = self.lengthOf(self.st);
        var u = Math.max(self.U_MIN, Math.min(self.uMax(L), x - self.originOf(self.st)));
        var next = self.setUnit(self.st, which, u);
        if (!next) return;
        self.st = next;
        self._repaint(which);
      };
      var up = function () {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', up);
        self.render();
      };
      /* ⚠ ON THE WINDOW, NOT ON THE GRIP. Every move re-lays the tape,
         which REPLACES the grip node — and removing a captured element
         from the document releases pointer capture, so from the second
         move onward the events went to whatever was under the cursor and
         never reached this handler. The grip followed the finger for one
         frame and then stuck. Listening on the window outlives the node
         swap; the rect snapshot above outlives it too. */
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    });

    el.addEventListener('keydown', function (ev) {
      var L = self.lengthOf(self.st), next = null;
      if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
        ev.preventDefault();
        next = self.nextEvenFit(self.st, which);
      } else {
        /* a smaller unit means MORE of them, so ArrowLeft (shrink) adds
           one to the count and ArrowRight takes one away */
        var d = { ArrowLeft: 1, ArrowDown: 1, ArrowRight: -1, ArrowUp: -1, PageUp: -3, PageDown: 3 }[ev.key];
        if (d) next = self.stepCount(self.st, which, d);
        else if (ev.key === 'Home') next = self.setUnit(self.st, which, self.U_MIN);
        else if (ev.key === 'End') next = self.setUnit(self.st, which, self.uMax(L));
        else return;
        ev.preventDefault();
      }
      if (!next) return;
      self.st = next;
      self.render();
      var again = self._wrap && self._wrap.querySelector('.unh-tape-' + which + ' .unh-grip');
      if (again) { try { again.focus(); } catch (_) {} }
    });
  },

  /* repaint ONE tape mid-drag — the object and the other tape are never
     touched, which is invention 2 made structural rather than promised */
  _repaint: function (which) {
    if (!this._wrap) return;
    var old = this._wrap.querySelector('.unh-tape-' + which);
    if (!old) return;
    var n = which === 'b' ? 2 : 1;
    var topPx = old.style.top;
    var fresh = this._buildTape(which, n, 0);
    fresh.style.top = topPx;
    old.parentNode.replaceChild(fresh, old);
    var h = fresh.querySelector('.unh-grip');
    if (h) { try { h.focus({ preventScroll: true }); } catch (_) {} }
  },

  _buildFoot: function () {
    var api = this.api, self = this, s = this.st;
    var foot = api.el('div', 'unh-foot');

    var fit = api.el('button', 'unh-chip unh-go');
    fit.type = 'button';
    fit.textContent = api.t('fitBtn');
    fit.disabled = !this.evenFits(s).length;
    fit.addEventListener('click', function () {
      var next = self.nextEvenFit(self.st, 'a');
      if (!next) return;
      self.st = next;
      self.render();
    });
    foot.appendChild(fit);

    var match = api.el('button', 'unh-chip');
    match.type = 'button';
    match.textContent = api.t('matchBtn');
    match.disabled = (s.uA === s.uB);
    match.addEventListener('click', function () {
      var next = self.matchUnits(self.st);
      if (!next) return;
      self.st = next;
      self.render();
    });
    foot.appendChild(match);

    var other = api.el('button', 'unh-chip');
    other.type = 'button';
    other.textContent = api.t('newObjBtn');
    other.disabled = this.shelf().length < 2;
    other.addEventListener('click', function () {
      var next = self.stepObject(self.st);
      if (!next) return;
      self.st = next;
      self.render();
    });
    foot.appendChild(other);

    var pr = api.el('button', 'unh-chip' + (this.premium ? '' : ' unh-locked'));
    pr.type = 'button';
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () {
      if (!self.premium) { self._showGate(); return; }
      window.print();
    });
    foot.appendChild(pr);

    /* ⚠ TWO NODES, NEVER A CONCATENATION — the recorded localisation
       smell, and joining them makes the one actionable thing
       unclickable. Shape from lids.js:1018-1033. */
    if (this._gate) {
      var g = api.el('div', 'unh-gate');
      var sp = api.el('span');
      sp.textContent = api.t('gateLine');
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-unit-handle';
      a.target = '_top';
      a.rel = 'noopener';
      a.textContent = api.t('unlock');
      g.appendChild(sp);
      g.appendChild(a);
      foot.appendChild(g);
    }
    return foot;
  },

  _showGate: function () {
    var self = this;
    this._gate = true;
    this.render();
    this._after(6000, function () { self._gate = false; if (self._wrap) self.render(); });
  }
};

/* =====================================================================
   THE STYLESHEET
   ⚠ TWO TAP FLOORS, MEASURED SEPARATELY AND NEITHER MOVES: every CONTROL
   holds 44px; a TILE is canvas and holds the legibility floor the gate
   measures. Collapsing them into one number waves a real defect through.
   ⚠ No `vh` anywhere: a manipulative's iframe grows to its content, so a
   vh rule inside it is a feedback loop the shell has no path for.
   ⚠ Never an inline `background` SHORTHAND — it resets background-image
   and beats the stylesheet.
   ===================================================================== */
function injectUnitHandleCSS() {
  if (document.getElementById('unh-style')) return;
  var css = ''
    + '.unh-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;min-width:0;}'
    + '.unh-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;'
    +   'color:#0E5147;min-height:40px;display:flex;flex-direction:column;justify-content:center;gap:1px;}'
    + '.unh-hline{display:block;line-height:1.25;}'
    /* THE BENCH — the model box, and the only thing with a size */
    + '.unh-bench{position:relative;width:100%;max-width:620px;'
    +   'border-radius:18px;border:2px solid rgba(20,107,94,.28);background-color:#FBF3E4;overflow:hidden;}'
    /* the object zone keeps the model aspect, so the object lands on the
       bench line at every width */
    + '.unh-objzone{position:relative;width:100%;aspect-ratio:1000/260;}'
    /* the tape zone is a FIXED pixel stack, so a drag grip is always a
       real tap target however narrow the screen gets */
    + '.unh-tapes{position:relative;width:100%;height:112px;}'
    + '.unh-obj{position:absolute;pointer-events:none;user-select:none;}'
    /* A TAPE — absolutely positioned, its tiles laid in percentages */
    + '.unh-tape{position:absolute;left:0;right:0;height:48px;}'
    + '.unh-tile{position:absolute;top:0;height:100%;box-sizing:border-box;'
    +   'border:2px solid #146B5E;border-radius:6px;background-color:#CFE3DE;}'
    /* the first tile is the one whose edge you take hold of */
    + '.unh-first{background-color:#F2784B;border-color:#C2562F;}'
    /* ⭐ THE GRIP — a 44px control straddling that edge. Transparent
       except for its bar, so it never hides the material underneath. */
    + '.unh-grip{position:absolute;top:0;height:100%;width:44px;margin-left:-22px;'
    +   'padding:0;border:0;background-color:transparent;cursor:ew-resize;'
    +   'touch-action:none;display:flex;align-items:center;justify-content:center;}'
    + '.unh-grip::after{content:"";width:6px;height:62%;border-radius:3px;'
    +   'background-color:#C2562F;box-shadow:0 0 0 2px rgba(251,243,228,.9);}'
    + '.unh-grip:active{cursor:grabbing;}'
    + '.unh-grip:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    /* the remainder — visibly a PART, and never counted */
    + '.unh-part{background-color:transparent;border-style:dashed;border-color:#C2562F;}'
    + '.unh-count{position:absolute;top:50%;transform:translateY(-50%);'
    +   'font-family:Baloo\\ 2,cursive;font-size:22px;color:#0E5147;}'
    /* THE FOOT */
    + '.unh-foot{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;width:100%;}'
    + '.unh-chip{min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;'
    +   'background:#FBF3E4;color:#0E5147;font-family:Nunito,sans-serif;font-size:15px;cursor:pointer;}'
    + '.unh-chip[disabled]{cursor:default;opacity:.5;}'
    + '.unh-go{background:#F2784B;border-color:#C2562F;color:#FFF;}'
    + '.unh-locked{border-color:#C2562F;color:#C2562F;}'
    + '.unh-gate{flex-basis:100%;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
    +   'gap:8px;font-family:Nunito,sans-serif;font-size:14px;color:#C2562F;text-align:center;}'
    + '.unh-gate a{color:#C2562F;min-height:44px;display:inline-flex;align-items:center;}'
    + '@media (min-width:760px){.unh-bench{max-width:680px;}}'
    + '@media print{'
      + '  *{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
      + '  .lcs-header,.unh-hint,.unh-foot,.unh-gate,.unh-grip{display:none !important;}'
      + '  .unh-wrap{gap:0;}'
      + '  .unh-bench{max-width:none;width:100%;border:0;background:#fff;break-inside:avoid;}'
      + '  @page{margin:14mm;}'
      + '}'
      + '@media (prefers-reduced-motion:reduce){.unh-tile{transition:none;}}';
  var st = document.createElement('style');
  st.id = 'unh-style';
  st.textContent = css;
  document.head.appendChild(st);
}

if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(UnitHandle);
