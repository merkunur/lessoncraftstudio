/* =====================================================================
   TOOL #48 — THE COUNTING CUPS   (counting-cups.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v5 catalog entry #4. PREV = 'folding-wall'.

   FIVE NAMED PARTS AND NO SIXTH:
     THE MAT · THE CHIP · THE CUP · THE STACK · THE SHELF
   The number is not a part. It is a readout.

   THE PROMISE: a spill too big to count becomes a number you can read,
   and the digits ARE the containers.

   ⭐ THE DREAD IT IS FOR: place value — "grasping that 23 is two tens
   and three ones" — named the Grade-1 sticking point in every locale.

   =====================================================================
   THE FENCE (§23.3), run over four surfaces before a line was written.
   It came back the most occupied in the programme, and it is the reason
   for nearly every ruling below. SUBTRACT the overlap, never negotiate.

     - `bundle-machine-core.js` is the declared FAMILY HEAD for "the
       CHILD authors the bundle": a lever that REFUSES below ten, a
       deliberate loose scatter so "full" cannot be read as a gestalt,
       and the doctrine "trigger != decide". So this tool does NOT ship
       a child-judged close. See THE CLOSE RULING below.
     - `estimation-jar.js` already ships a deliberately uncountable
       collection at capacity 200 which, on reveal, flies out in GROUPS
       OF TEN into ten-frames counted aloud. So: no ten-frame anywhere,
       no reveal, no tally counting up, and the cap is not 200.
     - `place-value-lab.js` ships unit cube -> TEN ROD -> HUNDRED FLAT,
       bundle/unbundle, and "Show me N". So the closed forms here are a
       CUP and a NESTED STACK, and there is no numeral entry anywhere.
     - `exchange-machine.js` (#45) owns "a digit changes iff ten of one
       lane became one of the next". So this readout does not advance a
       digit as an answer — it CONSTRUCTS one and leaves the rest `?`.
     - `bos-berry-pantry` owns CRATE = a sealed ten. `name-sticks` owns
       the cup as its used-names holder, AND `measurement-bench.js`
       ships cup/Becher/gobelet/beker/mugg as a CAPACITY UNIT on a
       volume scale — in the same subject area. So every locale takes
       its own unowned noun; only English keeps the operator's word.
     - `ten-frame.js` owns 2x5. Ours is 2 wide x 5 TALL, never 5x2.

   ⚠ A NAMING COLLISION MEANS RENAME. IT NEVER MEANS DELETE THE GESTURE.
   That rule is here because #47 shipped without the gesture it was
   named after: a naming note was read as a design ban, three expert
   panels were briefed on the invented constraint, and the operator had
   to correct it. The cups here close, because the commission says cups.

   =====================================================================
   THE CLOSE RULING — the cup closes ITSELF at ten, and it is not even a
   setting. Two expert panels came back with opposite designs on exactly
   this, both citing bundle-machine. Adjudicated on five grounds:

     1. ⭐ VARIABLE GROUP SIZE DESTROYS THE THESIS. If a child may group
        in threes and sevens there is no readout, because THERE ARE NO
        DIGITS IN A BASE-7 GROUPING. "Digits are closed containers" —
        the commission's headline — evaporates. A child-chosen group
        size is an excellent Counting Collections instrument and it is
        not a PLACE VALUE instrument, and place value is the dread.
     2. THE RENDER FORBIDS IT, and this is measured, not argued. A chip
        is 11.9px at a 296px mat. A child asked to judge "is that ten?"
        must count ten discs of that size on a projector from six
        metres — which is precisely the 1:1-correspondence failure the
        research caution bans, re-imported through the back door.
     3. UNREACHABLE-STATE DOCTRINE. With an automatic close, "a cup
        holding eleven" cannot be WRITTEN DOWN (see `_st`). With a
        manual close it must be guarded, and guards are what fail.
     4. THE A6 FENCE. Child-chosen group size is the unbuilt v4 slot
        A6 "The Grouping Dial"'s entire invention.
     5. Presses: a child-close costs +100% on a great spill for a
        judgment the material already makes.

   ⭐ THE CHILD'S DECISION IS NOT DELETED — IT IS RELOCATED TO WHERE THE
   MATERIAL CAN CARRY IT. The scoop takes WHAT IS UNDER ITS MOUTH, never
   a fixed ten, so WHERE TO AIM is a real decision with a different
   consequence every press: dense heap, one press fills a cup; thin
   heap, a press yields four. And the endgame — "is there another tenful
   left there?" — is genuinely contestable, differently every session,
   and is settled by doing rather than by the tool grading it.

   ⭐ THE GRADE-1 DISSENT WAS GRANTED AS A NUMBER, NOT A CONTROL. A
   teacher objected that a self-closing cup steals the moment the class
   shouts "TEN!". So T_ABSORB is 120ms in which the ten are in, the cup
   squashes, and NOTHING ELSE MOVES. The class shouts into that gap. It
   costs no control, no setting and no string.

   =====================================================================
   THE ARITHMETIC THAT DESIGNED THE TOOL — and three places where doing
   it refuted the spec I was handed. Measure a law before you gate it.

   M1  A CHIP IS NEVER A TAP TARGET AT ANY VIEWPORT — including 2560,
       where it would clear every floor. 11.9px at a 296px mat against a
       34px canvas floor. This is NOT a concession to small screens: a
       per-chip tap IS the 1:1 diagnostic, and behaviour that changes
       with viewport is what the house bans. ONE pointer region,
       everywhere, forever, with invisible pointer-events:none pads
       beneath for keyboard, AT and the liveness gate.
       The tap target is THE SCOOP MOUTH, and it cannot be too small by
       construction: it is sized to COVER TWO CUPFULS at the
       collection's own density, so it is always about 4.8 chips across.
       MEASURED at a 320px viewport across every band and seed: 63px to
       125px in diameter, against a 44px chrome floor and a 34px canvas
       floor. The floor is met by construction, not by a constant.

   M2  ⚠⚠ THE THREE SCATTER ACCEPTANCE NUMBERS I WAS GIVEN ARE MUTUALLY
       UNSATISFIABLE, and the arithmetic says so in one line. At
       d = 0.68*sqrt(A/N) the demanded minimum spacing 1.02d is 40.9u
       while the POISSON MEAN nearest-neighbour is 0.5*sqrt(A/N) =
       29.5u. A minimum cannot exceed a mean. Worse, a hard non-overlap
       floor at that density forces a REGULAR arrangement (R > 1), so
       the demanded Clark-Evans R = 0.78 (clustered) is the opposite of
       what non-overlap produces.
       RESOLVED BY DELETING THE INVENTED NUMBER, NOT BY LOOSENING IT.
       R is now MEASURED and reported, never asserted against a
       threshold somebody liked. The two requirements that are both
       satisfiable and actually load-bearing are kept and gated:
         - min nearest-neighbour >= 1.02d  (nothing fuses into a blob)
         - max empty-disc radius <= 3.4p   (no bald patch: children read
           one as "someone did this badly", and unfairness is the one
           reading that ends a lesson)
       Non-lattice-ness is delivered STRUCTURALLY instead, by random
       sequential adsorption from cluster-biased attempts — genuinely
       random subject to non-overlap, so there are no rows to find.

   M3  ⚠ d IS COMPUTED FROM THE BAND'S MAXIMUM N, NOT FROM THE DRAWN N.
       Two panels were half right. Freezing one diameter forever cannot
       serve both 23 and 199; computing from the drawn N makes 41 and 88
       fill the mat IDENTICALLY, which makes the band invisible — the
       one thing a "too many" premise cannot afford. From the band max:
       the material never changes size on a Tuesday, AND density varies
       honestly inside the band.

   M4  ⚠ NO PIXEL CLAMP ON d. The clamp I was handed was an artefact of
       computing d from actual-N in PIXELS; it would have made the
       scatter geometry viewport-dependent, so a resize would have to
       re-scatter — which the same spec forbids. d lives in viewBox
       units and everything scales together. That is what a viewBox is
       for.

   M5  THE CEILING 199 IS FORCED BY THE SHELF, NOT CHOSEN. Nine cup
       slots plus one stack (which is ten cups) is 19 tens, plus 9 ones.
       A 200th chip needs a SECOND stack zone. So hundreds is 0 or 1,
       tens 0..9, ones 0..9, and THREE READOUT SLOTS ARE ALWAYS EXACTLY
       ENOUGH — which is also why a slot count that changed with N
       (leaking whether the collection passes a hundred) is impossible.

   =====================================================================
   ⭐ THE THREE PLACES ARE PHYSICAL, and this is the tool's real claim:
       hundreds = the stack zone (shelf left)
       tens     = the cup slots (shelf right)
       ones     = THE MAT ITSELF, plus the cup still open
   There is no ones-dish and no fourth noun. So `?` in the ones slot
   means something literal — the ones place still has an unknown amount
   lying in it — and THE MAT EMPTIES AND THE NUMBER COMPLETES IN THE
   SAME ACT.

   ⭐ ALL THREE DIGITS SETTLE AT THE SAME INSTANT, and it falls out of
   the model rather than being staged: the only moves that change a
   digit are closing a cup (needs ones >= 10) and fusing (needs ten
   closed cups). So the moment ones < 10, every digit is frozen. One
   rule, three seats, drawn together.

   ⚠ NO TOTAL EXISTS ANYWHERE WHILE THE MAT CAN STILL YIELD A TEN — not
   in a text node, an attribute, an aria-label, the title, or the live
   region. AND NOT BY COUNTING DOM NODES: the heap is TWO <path>
   elements (one for the rings, one for the bodies), each carrying N
   sub-paths in its `d`. `querySelectorAll('.ccp-chip').length` is the
   answer in any design that draws N nodes, and every string audit in
   the world passes while it leaks.
   ⚠ Stated at its true scope: NOT DERIVABLE BY COUNTING DOM NODES. A
   `d` attribute can always be parsed. Do not overclaim it.

   ⭐ WHY THE SHEET IS WORTH MONEY: it carries THE SAME SCATTER, FROM
   THE SAME SEED, that the class just met. A generic worksheet
   structurally cannot do that.

   ===================================================================== */
(function () {
  'use strict';

  /* ================= geometry ========================================
     ⚠ EXPOSED so the gate reads the real constants instead of carrying
     its own copy of the number it is checking (#44: a gate that
     re-declares what it checks is testing a copy). */
  var GEO = {
    VB_W: 1000, VB_H: 1220,

    /* the three bands */
    READ_Y: 0, READ_H: 156,
    MAT_X: 20, MAT_Y: 176, MAT_W: 960, MAT_H: 720,
    SHELF_Y: 916, SHELF_H: 304,

    /* readout */
    FONT: 112,
    SLOT_PITCH: 74,
    SLOT_CX: [426, 500, 574],
    BASELINE: 118,
    SEAT_W: 62, SEAT_H: 8, SEAT_Y: 138, SEAT_R: 4,
    QMARK_F: 0.84,

    /* the chip: two filled circles, no stroke, ever.
       ⚠ A stroke-width:1 hairline at 12px on a 1.25-DPR projector lands
       on a half pixel and shimmers, and 199 of them shimmering at a
       repeating pitch IS the moire. Two filled circles antialias
       identically at every scale, so there is nothing to shimmer. This
       is also why vector-effect="non-scaling-stroke" appears nowhere. */
    CHIP_OUTER: 0.500,
    CHIP_INNER: 0.410,
    CHIP_INNER_DY: -0.035,
    SHEEN_AT_PX: 26,

    /* ⭐ THE MINIMUM-FEATURE LAW: no feature smaller than 0.055d.
       At d=12 that is 0.66px, which the ring meets EXACTLY and nothing
       else in the drawing does. This law forbids, at every size and
       forever: button holes, a stem, a star point, a stroke, a dashed
       edge, a rim light, a drop shadow, and a numeral on the chip. */
    MIN_FEATURE: 0.055,

    /* the cup, in units of its own chip diameter u */
    CUP_IW: 2.30, CUP_IH: 5.40, CUP_WALL: 0.085, CUP_WALL_SHUT: 0.115,
    CUP_TAPER: 0.94, CUP_BASE_R: 0.26, CUP_RIM_RY: 0.22,
    CUP_LID_H: 0.42, CUP_LID_OUT: 0.10, CUP_CREST: 0.10,

    /* the shelf: margin 20 + stack 74.6 + divider 34 + 9*70.4 + 8*27
       + margin 20 = 998 of 1000. Nine cups and one stack ALWAYS fit,
       and there is never a tenth loose cup because the tenth fuses. */
    SHELF_U: 28.5,
    SHELF_GAP: 27,
    SHELF_DIV: 34,
    SHELF_MARGIN: 20,
    STACK_NEST: 0.075,
    CUP_SLOTS: 9,

    /* scatter */
    NN_FLOOR: 1.02,      /* min centre distance, in chip diameters */
    NN_TARGET: 1.16,     /* what inhibition aims for where density allows */
    VOID_MAX: 3.4,       /* max empty-disc radius, in mean-spacing p */
    D_COEF: 0.68,        /* d = D_COEF * sqrt(A / Nmax) */

    /* the scoop mouth covers ten chips at heap density => 4.8d */
    MOUTH_TARGET: 2.0,     /* mouth covers this MANY CUPFULS at start */
    MOUTH_MIN: 2.0,        /* floor, in chip diameters */
    MOUTH_MAX_W: 0.22,     /* ceiling, as a fraction of the mat's width */

    /* motion, ms. The character is the INVERSE of #46's: gathering is
       quick and confident, undoing is slow and reluctant, because
       gathering is the gain. */
    T_ARM: 90,
    T_GATHER: 380,
    T_ABSORB: 120,       /* <- the class shouts TEN into this */
    T_LID: 180,
    T_CARRY: 340,
    T_TICK: 140,
    T_HOLD: 200,         /* the stack: see ten before you see one */
    T_GATHERUP: 360,
    T_SEAM: 140,
    T_ONE: 220,
    T_OPEN: 340,
    T_TIP: 900,
    T_TIPALL: 1200,
    T_SETTLE: 180,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_CLOSE: 880,
    SND_OPEN: 440,
    SND_DEBOUNCE: 300
  };

  /* ⭐ BANDS. The labels never contain the numbers — a number in the
     settings drawer is a numeral leak straight onto the projector.
     N is drawn fresh on every open, Reset and settings change, and
     NEVER at a band endpoint (a round or extreme number reads as a
     number somebody chose; a ragged one reads as a quantity that
     happened).
     ⚠ DECADES ARE NOT EXCLUDED, and that is a considered divergence
     from `estimation-jar`, which rejects them because zero leftover
     SKIPS its payload. Here "four tens and NO ones" is the hardest
     reading in the tool and the destination of the crossing, so a
     decade is a gift, not a skip. */
  var BANDS = {
    handful: { lo: 12, hi: 39, nmax: 39 },
    heap:    { lo: 41, hi: 88, nmax: 88 },
    spill:   { lo: 91, hi: 199, nmax: 199 }
  };
  var BAND_KEYS = ['handful', 'heap', 'spill'];

  var CAP = 199;
  var CUP_HOLDS = 10;

  /* ---- deterministic RNG (house idiom) ------------------------------ */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  var CountingCups = {

    id: 'counting-cups',

    /* ================= strings ======================================
       Authored English. Every non-English locale is REBUILT by a native
       panel, never translated, and each picks its own unowned noun for
       the cup — because every locale's cup-word is a live capacity unit
       in `measurement-bench`. */
    strings: {
      title:        {
        en: 'The Counting Cups',
        de: 'Die Zehnerdosen',
        fr: 'Les barquettes de dix',
        es: 'Los botes de diez',
        pt: 'Os potinhos de dez',
        it: 'I secchielli da dieci',
        nl: 'De Tienkokers',
        sv: 'Tioaskarna',
        da: 'Tælleæskerne',
        no: 'Ti om gangen',
        fi: 'Kymppirasiat'
      },
      /* ⚠ Rewritten after four panels: it never said the child
         CHOOSES where to aim (the tool's one real decision), never
         said the cup SHUTS ITSELF (the signature), and implied the
         scoop decides how many when the cup does. */
      /* ⚠ "Far too many to count one at a time" is FALSE at the handful
         band, which this tool ships on purpose — the Italian panel
         caught the source contradicting its own settings. "Not worth
         counting one at a time" is true across the whole range. */
      instruction:  {
        en: 'Too many to be worth counting one at a time. Press the mat wherever you like and the scoop lifts whatever is under it, up to what still fits. A cup holds ten and shuts itself at the tenth.',
        de: 'Viel zu viele, um sie einzeln zu zählen. Tippe auf den Teppich, wo du willst: die Schaufel hebt auf, was gerade darunterliegt, so viel wie noch hineinpasst. In eine Dose passen zehn, und bei der zehnten schließt sie sich von selbst.',
        fr: 'Bien trop de jetons pour que cela vaille la peine de les compter un à un. Appuie sur la nappe où tu veux : ce qui se trouve sous ton doigt part dans la barquette, autant qu\'il y reste de place. Elle en contient dix et se ferme toute seule au dixième.',
        es: 'Hay demasiadas fichas para que valga la pena contarlas una a una. Toca la mesa donde quieras: la pala recoge lo que haya debajo, hasta donde quepa. En cada bote caben diez, y se cierra solo con la décima.',
        pt: 'Fichas demais para valer a pena contar uma a uma. Aperte o tabuleiro onde você quiser: a concha recolhe o que estiver ali, até onde couber. Cada potinho guarda dez e fecha sozinho na décima.',
        it: 'Troppi gettoni perché convenga contarli a uno a uno. Premi la tovaglia dove vuoi: quello che sta sotto il dito va nel secchiello, per quanto ci sta ancora. Il secchiello ne contiene dieci e a dieci si chiude da solo.',
        nl: 'Te veel om ze de moeite waard één voor één te tellen. Tik op de mat waar je wilt: de schep pakt op wat eronder ligt, zoveel als er nog in past. In een koker passen er tien, en bij de tiende gaat hij vanzelf dicht.',
        sv: 'Alldeles för många för att det ska löna sig att räkna en och en. Tryck på bordet där du vill — skopan tar upp det som ligger just där, så mycket som får plats. En ask rymmer tio och stängs av sig själv vid den tionde.',
        da: 'Alt for mange til at det kan betale sig at tælle ét ad gangen. Tryk på bordet, hvor du vil: skeen løfter det, der ligger under fingeren, så meget som der er plads til. Der er plads til ti i hver æske, og den lukker sig selv ved den tiende.',
        no: 'Alt for mange til at det lønner seg å telle én og én. Trykk på matta der du vil — øsa tar det som ligger akkurat der, så mye som får plass. Ei eske rommer ti, og den lukker seg selv ved den tiende.',
        fi: 'Näitä on aivan liikaa yksitellen laskettavaksi. Paina pöytää mistä haluat: kauha nostaa sen, mitä sormen alla sattuu olemaan, sen verran kuin mahtuu. Rasiaan mahtuu kymmenen, ja se napsahtaa kiinni kymmenennen kohdalla.'
      },

      /* ⚠ It labelled a CHOOSER as a question about current state —
         and it was the very question the readout exists to refuse, so
         a teacher would look here for the total. It now names the
         size of the heap it sets. */
      setBand:      {
        en: 'Size of the heap',
        de: 'Größe des Haufens',
        fr: 'Taille du tas',
        es: 'Tamaño del montón',
        pt: 'Tamanho do monte',
        it: 'Quanti gettoni versiamo',
        nl: 'Grootte van de hoop',
        sv: 'Storleken på högen',
        da: 'Hvor meget skal der ligge på bordet',
        no: 'Mengden på matta',
        fi: 'Kuinka paljon pöydälle kaadetaan'
      },
      bandHandful:  {
        en: 'A handful',
        de: 'Eine Handvoll',
        fr: 'Une pleine main',
        es: 'Un puñado',
        pt: 'Um punhado',
        it: 'Una manciata',
        nl: 'Een handvol',
        sv: 'En handfull',
        da: 'En håndfuld',
        no: 'En håndfull',
        fi: 'Kourallinen'
      },
      bandHeap:     {
        en: 'A heap',
        de: 'Ein Haufen',
        fr: 'Un tas',
        es: 'Un buen montón',
        pt: 'Um monte',
        it: 'Un mucchio',
        nl: 'Een hoop',
        sv: 'En hög',
        da: 'En dynge',
        no: 'En haug',
        fi: 'Kasa'
      },
      bandSpill:    {
        en: 'A great spill',
        de: 'Ein ganzer Berg',
        fr: 'Un déluge',
        es: 'Una montaña de fichas',
        pt: 'Um mar de fichas',
        it: 'Una montagna',
        nl: 'Een hele berg',
        sv: 'Ett helt berg',
        da: 'Et helt bjerg',
        no: 'Et helt hav',
        fi: 'Valtava kasa'
      },

      tipAllBtn:    {
        en: 'Tip it all back onto the mat',
        de: 'Alles zurück auf den Teppich schütten',
        fr: 'Tout reverser sur la nappe',
        es: 'Volcarlo todo otra vez en la mesa',
        pt: 'Devolver tudo para o tabuleiro',
        it: 'Rovescia tutto sulla tovaglia',
        nl: 'Alles terug op de mat',
        sv: 'Töm allt tillbaka på bordet',
        da: 'Hæld det hele ud på bordet igen',
        no: 'Tøm alt ut på matta igjen',
        fi: 'Kaada kaikki takaisin pöydälle'
      },
      tipAllOff:    {
        en: 'Tip it all back onto the mat — nothing has been scooped yet.',
        de: 'Alles zurück auf den Teppich schütten — es ist noch nichts geschöpft worden.',
        fr: 'Tout reverser sur la nappe — rien n\'a encore été ramassé.',
        es: 'Volcarlo todo otra vez en la mesa — todavía no se ha recogido nada.',
        pt: 'Devolver tudo para o tabuleiro — ainda não há nada recolhido para devolver.',
        it: 'Rovescia tutto sulla tovaglia — non è ancora stato raccolto niente.',
        nl: 'Alles terug op de mat — er is nog niets opgeschept.',
        sv: 'Töm allt tillbaka på bordet — går att göra när något har skopats upp.',
        da: 'Hæld det hele ud på bordet igen — der er endnu ikke øst noget op.',
        no: 'Tøm alt ut på matta igjen — du må øse opp noe først.',
        fi: 'Kaada kaikki takaisin pöydälle — toimii vasta, kun jotain on kauhottu rasiaan.'
      },
      moreBtn:      {
        en: 'Put one more on the mat',
        de: 'Noch ein Plättchen auf den Teppich legen',
        fr: 'Ajouter un jeton sur la nappe',
        es: 'Poner una ficha más en la mesa',
        pt: 'Colocar mais uma ficha no tabuleiro',
        it: 'Aggiungi un gettone',
        nl: 'Eén erbij op de mat',
        sv: 'Lägg en bricka till på bordet',
        da: 'Læg én brik mere på bordet',
        no: 'Legg en til på matta',
        fi: 'Lisää pöydälle yksi nappula'
      },
      /* ⚠ THE CEILING IS ON THE COLLECTION, NOT THE MAT — found by the
         Spanish panel reading the mechanics. After scooping 190 away
         the mat can be visibly EMPTY while this chip is still disabled,
         at which point "the mat is as full as it goes" states something
         the class can see is false. */
      moreOff:      {
        en: 'Put one more on the mat — the collection is as big as it goes.',
        de: 'Noch ein Plättchen auf den Teppich legen — mehr Plättchen hat dieses Werkzeug nicht.',
        fr: 'Ajouter un jeton sur la nappe — la collection ne peut pas être plus grande.',
        es: 'Poner una ficha más en la mesa — la colección ya no admite ninguna más.',
        pt: 'Colocar mais uma ficha no tabuleiro — a coleção já está do tamanho máximo que dá.',
        it: 'Aggiungi un gettone — la raccolta ha già il numero più grande che si può tenere.',
        nl: 'Eén erbij op de mat — de verzameling kan niet groter worden.',
        sv: 'Lägg en bricka till på bordet — samlingen kan inte bli större än så här.',
        da: 'Læg én brik mere på bordet — samlingen kan ikke blive større end det her.',
        no: 'Legg en til på matta — samlinga kan ikke bli større enn dette.',
        fi: 'Lisää pöydälle yksi nappula — kokoelma on jo niin suuri kuin se voi olla.'
      },
      fewerBtn:     {
        en: 'Take one away',
        de: 'Ein Plättchen wegnehmen',
        fr: 'Enlever un jeton',
        es: 'Quitar una ficha',
        pt: 'Tirar uma ficha',
        it: 'Togli un gettone',
        nl: 'Eén eraf',
        sv: 'Ta bort en bricka',
        da: 'Tag én brik væk',
        no: 'Ta bort en',
        fi: 'Ota yksi nappula pois'
      },
      /* ⚠ True only when the mat AND the cups AND the stack are all
         empty — because on a bare mat this button BREAKS A CUP OPEN.
         Read on a bare-mat-full-shelf screen the old wording said the
         borrow was unavailable at the exact moment it was the whole
         point. */
      fewerOff:     {
        en: 'Take one away — there is nothing left anywhere: not on the mat, not in a cup, not in the stack.',
        de: 'Ein Plättchen wegnehmen — es ist nirgends mehr eines da: nicht auf dem Teppich, nicht in einer Dose, nicht im Turm.',
        fr: 'Enlever un jeton — il n\'y a plus rien nulle part : ni sur la nappe, ni dans les barquettes, ni dans les piles.',
        es: 'Quitar una ficha — ya no queda ninguna en ningún sitio: ni en la mesa, ni en los botes, ni en la torre.',
        pt: 'Tirar uma ficha — não há mais nenhuma em lugar nenhum: nem no tabuleiro, nem nos potinhos, nem na torre.',
        it: 'Togli un gettone — non è rimasto più niente da nessuna parte: né sulla tovaglia, né nei secchielli, né nella torre.',
        nl: 'Eén eraf — er is nergens meer iets: niet op de mat, niet in een koker, niet in de stapel.',
        sv: 'Ta bort en bricka — det finns inget kvar någonstans: varken på bordet, i askarna eller i tornet.',
        da: 'Tag én brik væk — der er ingenting tilbage nogen steder: hverken på bordet, i æskerne eller i tårnet.',
        no: 'Ta bort en — det er ingenting igjen noe sted: verken på matta, i eskene eller i stabelen.',
        fi: 'Ota yksi nappula pois — toimii vasta, kun nappuloita on jossakin jäljellä.'
      },
      printBtn:     {
        en: 'Print the collection sheet',
        de: 'Das Sammelblatt drucken',
        fr: 'Imprimer la fiche de la collection',
        es: 'Imprimir la hoja de la colección',
        pt: 'Imprimir a folha da coleta',
        it: 'Stampa la scheda della raccolta',
        nl: 'Print het verzamelblad',
        sv: 'Skriv ut räknebladet',
        da: 'Print tællearket',
        no: 'Skriv ut samlearket',
        fi: 'Tulosta tehtäväpaperi'
      },
      printLocked:  {
        en: 'Print the collection sheet — this one needs a Teacher plan.',
        de: 'Das Sammelblatt drucken — dafür brauchst du das Lehrkraft-Abo.',
        fr: 'Imprimer la fiche de la collection — réservé à l\'abonnement Enseignant.',
        es: 'Imprimir la hoja de la colección — esto forma parte del plan Docente.',
        pt: 'Imprimir a folha da coleta — isto faz parte do plano Professor.',
        it: 'Stampa la scheda della raccolta — fa parte del piano Insegnante.',
        nl: 'Print het verzamelblad — hiervoor heb je het Leerkracht-abonnement nodig.',
        sv: 'Skriv ut räknebladet — det här kräver Lärarprenumeration.',
        da: 'Print tællearket — det kræver et Lærerabonnement.',
        no: 'Skriv ut samlearket — dette trenger Lærerabonnement.',
        fi: 'Tulosta tehtäväpaperi — tarvitset tähän Opettajatilauksen.'
      },

      matPad:       {
        en: 'Scoop this part of the mat',
        de: 'Hier auf dem Teppich schöpfen',
        fr: 'Ramasser à cet endroit de la nappe',
        es: 'Recoger fichas de esta parte de la mesa',
        pt: 'Recolher desta parte do tabuleiro',
        it: 'Raccogli i gettoni di questa zona',
        nl: 'Schep op dit stuk van de mat',
        sv: 'Skopa upp brickorna här',
        da: 'Øs brikker op i denne del af bordet',
        no: 'Øs opp her på matta',
        fi: 'Kauho tästä kohdasta'
      },
      matPadEmpty:  {
        en: 'Scoop this part of the mat — there is nothing left in this part.',
        de: 'Hier auf dem Teppich schöpfen — an dieser Stelle liegt nichts mehr.',
        fr: 'Ramasser à cet endroit de la nappe — il n\'y a plus rien à cet endroit.',
        es: 'Recoger fichas de esta parte de la mesa — en esta parte ya no queda ninguna.',
        pt: 'Recolher desta parte do tabuleiro — não sobrou nada por aqui.',
        it: 'Raccogli i gettoni di questa zona — qui non è rimasto niente.',
        nl: 'Schep op dit stuk van de mat — hier ligt niets meer.',
        sv: 'Skopa upp brickorna här — här finns inga brickor kvar.',
        da: 'Øs brikker op i denne del af bordet — denne del er tom.',
        no: 'Øs opp her på matta — her er det tomt. Trykk et sted der det fortsatt ligger brikker.',
        fi: 'Kauho tästä kohdasta — täältä ei löydy enää nappuloita. Kauho sieltä, missä niitä vielä on.'
      },
      cupOpen:      {
        en: 'The open cup',
        de: 'Die offene Dose',
        fr: 'La barquette ouverte',
        es: 'El bote abierto, el que se está llenando',
        pt: 'O potinho aberto, recebendo as fichas',
        it: 'Il secchiello aperto',
        nl: 'De open koker',
        sv: 'Den öppna asken',
        da: 'Den åbne æske — den, der fyldes nu',
        no: 'Eska som fylles nå',
        fi: 'Avoin rasia. Nappulat menevät tänne, ja rasiaan mahtuu kymmenen.'
      },
      cupShut:      {
        en: 'A closed cup. Press to tip it back onto the mat.',
        de: 'Eine geschlossene Dose. Tippen, um sie zurück auf den Teppich zu schütten.',
        fr: 'Une barquette fermée. Appuie pour la reverser sur la nappe.',
        es: 'Un bote cerrado. Tócalo para volcarlo otra vez en la mesa.',
        pt: 'Um potinho fechado, com dez fichas. Aperte para devolver tudo ao tabuleiro.',
        it: 'Un secchiello chiuso. Premi per rovesciarlo sulla tovaglia.',
        nl: 'Een gesloten koker. Tik erop om hem weer op de mat te storten.',
        sv: 'En stängd ask. Tryck för att hälla tillbaka den på bordet.',
        da: 'En lukket æske. Tryk for at hælde den ud på bordet igen.',
        no: 'Ei lukket eske. Trykk for å tømme den ut på matta igjen.',
        fi: 'Suljettu rasia. Paina, niin se kaatuu takaisin pöydälle.'
      },
      stackLabel:   {
        en: 'The stack. Press to break it back into cups.',
        de: 'Der Turm. Tippen, um ihn wieder in einzelne Dosen zu zerlegen.',
        fr: 'La pile. Appuie pour la défaire en barquettes.',
        es: 'La torre. Tócala para deshacerla en diez botes.',
        pt: 'A torre. Aperte para desmanchar a torre em potinhos.',
        it: 'La torre. Premi per disfarla e riavere i secchielli.',
        nl: 'De stapel. Tik erop om hem weer uit elkaar te halen in kokers.',
        sv: 'Tornet. Tryck för att dela det i askar igen.',
        da: 'Tårnet. Tryk for at dele det op i æsker igen.',
        no: 'Stabelen. Trykk for å dele den opp i esker igjen.',
        fi: 'Torni, jossa on kymmenen rasiaa. Paina, niin se hajoaa takaisin rasioiksi.'
      },

      /* ⚠ ARIA SAYS EXACTLY WHAT THE READOUT SHOWS — no more, no less.
         And THE MAT NEVER CARRIES A COUNT, only a coarse density band,
         deliberately coarse so nobody can binary-search a total out of
         it. This is the parity standard: a blind child is never poorer
         and never richer than the class. */
      /* ⚠⚠ THESE ARE ADJECTIVAL PHRASES BECAUSE THEY ARE SUBSTITUTED
         INTO "The mat is {d}" — and two of the four originals did not
         compose. "The mat is only a few left" is not a sentence, and
         "the mat is thinner now" says the MAT thinned when the SPILL
         did. Half of every screen-reader state report was ungrammatical
         in the string a blind child hears most. Found independently by
         the Dutch and French panels; neither could have been caught by
         reading the keys in isolation. */
      densePacked:  {
        en: 'covered in chips',
        de: 'noch ganz voll',
        fr: 'couverte de jetons',
        es: 'llena de fichas',
        pt: 'abarrotado de fichas',
        it: 'piena di gettoni',
        nl: 'vol fiches',
        sv: 'packat med brickor',
        da: 'fyldt med brikker',
        no: 'fullt av brikker',
        fi: 'täynnä nappuloita'
      },
      denseThinner: {
        en: 'less crowded now',
        de: 'schon leerer',
        fr: 'moins garnie',
        es: 'más despejada',
        pt: 'mais vazio agora',
        it: 'meno affollata di prima',
        nl: 'al wat leger',
        sv: 'glesare nu',
        da: 'tyndet ud',
        no: 'tynnere nå',
        fi: 'jo harventunut'
      },
      denseFew:     {
        en: 'nearly bare',
        de: 'fast leer',
        fr: 'presque vide',
        es: 'casi vacía',
        pt: 'quase sem fichas',
        it: 'quasi vuota',
        nl: 'bijna leeg',
        sv: 'nästan tomt',
        da: 'næsten tomt',
        no: 'bare noen få igjen',
        fi: 'melkein tyhjä'
      },
      denseEmpty:   {
        en: 'empty',
        de: 'leer',
        fr: 'vide',
        es: 'vacía',
        pt: 'vazio',
        it: 'vuota',
        nl: 'leeg',
        sv: 'tomt',
        da: 'tomt',
        no: 'tomt',
        fi: 'tyhjä'
      },

      readUnknown:  {
        en: 'not yet known',
        de: 'noch nicht bekannt',
        fr: 'pas encore connu',
        es: 'todavía no se sabe',
        pt: 'ainda não se sabe',
        it: 'ancora da scoprire',
        nl: 'nog niet bekend',
        sv: 'vet vi inte än',
        da: 'endnu ukendt',
        no: 'ikke kjent ennå',
        fi: 'ei vielä tietoa'
      },
      saidScoop:    {
        en: '{n} into the cup.',
        de: '{n} in die Dose.',
        fr: '{n} dans la barquette.',
        es: '{n} al bote.',
        pt: '{n} para o potinho.',
        it: 'Gettoni raccolti: {n}.',
        nl: '{n} erbij in de koker.',
        sv: 'Skopan tog {n} upp i asken.',
        da: '{n} i æsken.',
        no: '{n} ned i eska.',
        fi: 'Rasiaan meni {n}.'
      },
      /* ⚠ '{n} places left' prints '1 places left', and {n} reaches 1
         on every single cup — not an edge case, the commonest frame.
         The referent was ambiguous too (places left on the mat?). */
      saidRoom:     {
        en: 'Room for {n} more in the cup.',
        de: 'Noch {n} Plätze frei.',
        fr: 'Places libres dans la barquette : {n}.',
        es: 'Huecos que quedan en el bote: {n}.',
        pt: 'Lugares livres no potinho: {n}.',
        it: 'Posti liberi nel secchiello: {n}.',
        nl: 'Nog plaats voor {n}.',
        sv: 'Det får plats {n} till i asken.',
        da: 'Der er plads til {n} mere.',
        no: 'Det er plass til {n} til.',
        fi: 'Tilaa on vielä {n}.'
      },
      saidShut:     {
        en: 'Ten. The cup is closed.',
        de: 'Die Dose ist voll: zehn. Sie schließt sich von selbst.',
        fr: 'Dix. La barquette se ferme.',
        es: 'Diez. El bote se cierra solo.',
        pt: 'Dez. O potinho fechou sozinho.',
        it: 'Dieci. Il secchiello si chiude.',
        nl: 'Tien. De koker is dicht.',
        sv: 'Tio. Asken är stängd.',
        da: 'Ti brikker. Æsken er lukket.',
        no: 'Ti. Eska er lukket.',
        fi: 'Kymmenen täynnä. Rasia napsahti kiinni.'
      },
      /* ⚠ 'They are one hundred' parses as 'there are a hundred of
         them'. The hundred is the CONTENTS, not the count of cups. */
      saidStack:    {
        en: 'Ten cups. Together they are one hundred.',
        de: 'Zehn Dosen. Zusammen sind sie hundert.',
        fr: 'Dix barquettes. Ensemble, elles font cent.',
        es: 'Diez botes. Juntos son cien.',
        pt: 'Dez potinhos. Juntos, isso é cem.',
        it: 'Dieci secchielli. Diventano una torre da cento.',
        nl: 'Tien kokers. Die zijn samen honderd.',
        sv: 'Tio askar. Tillsammans är de hundra.',
        da: 'Ti æsker. Det er hundrede.',
        no: 'Ti esker ble til én stabel. Stabelen er hundre.',
        fi: 'Kymmenen rasiaa. Ne ovat yhdessä sata.'
      },
      /* ⚠ THE CLASS SEES THREE EVENTS AND THE PASSIVE REPORTED ONE.
         A cup breaks open, ITS TEN CHIPS LAND BACK ON THE MAT, and one
         is then taken away. A blind child was told only the first. */
      saidOpened:   {
        en: 'Nothing was loose on the mat, so a closed cup was opened: its ten chips came back, and one was taken away.',
        de: 'Auf dem Teppich lag nichts mehr: eine Dose wurde geöffnet, ihre zehn Plättchen kamen zurück, und eines wurde weggenommen.',
        fr: 'Il n\'y avait plus rien sur la nappe : une barquette s\'est ouverte, ses dix jetons sont revenus sur la nappe, et un jeton a été enlevé.',
        es: 'No quedaba nada en la mesa: se ha abierto un bote, sus diez fichas han caído en la mesa y de ahí se ha quitado una.',
        pt: 'Não havia nada no tabuleiro: um potinho se abriu, as suas dez fichas voltaram para o tabuleiro e uma foi tirada.',
        it: 'Sulla tovaglia non c’era più niente: si è aperto un secchiello, i suoi gettoni sono tornati sulla tovaglia e uno è stato tolto.',
        nl: 'Er lag niets meer op de mat: er is een koker opengegaan, zijn tien fiches kwamen terug en er is er één weggehaald.',
        sv: 'Bordet var tomt. En ask öppnades och tio brickor kom ut på bordet — sedan togs en av dem bort.',
        da: 'Der lå ikke mere på bordet, så en æske blev åbnet, dens ti brikker kom tilbage, og én blev taget væk.',
        no: 'Det lå ingenting på matta. Ei eske ble brutt opp, de ti brikkene kom ut på matta, og så ble én tatt bort.',
        fi: 'Pöytä oli tyhjä, joten yksi rasia avattiin, sen kymmenen nappulaa palasivat pöydälle ja yksi otettiin pois.'
      },
      saidTipped:   {
        en: 'A cup was tipped back onto the mat.',
        de: 'Eine Dose wurde zurück auf den Teppich geschüttet.',
        fr: 'Une barquette a été reversée sur la nappe.',
        es: 'Un bote se ha volcado en la mesa.',
        pt: 'Um potinho voltou para o tabuleiro.',
        it: 'Un secchiello è stato rovesciato sulla tovaglia.',
        nl: 'Een koker is weer op de mat gestort.',
        sv: 'En ask hälldes tillbaka på bordet.',
        da: 'En æske blev hældt ud på bordet igen.',
        no: 'Ei eske ble tømt ut på matta igjen.',
        fi: 'Rasia kaatui takaisin pöydälle, ja sen kymmenen nappulaa ovat taas mukana.'
      },
      saidTipAll:   {
        en: 'Everything is back on the mat.',
        de: 'Alles liegt wieder auf dem Teppich.',
        fr: 'Tout est revenu sur la nappe.',
        es: 'Todo está otra vez en la mesa.',
        pt: 'Está tudo de volta no tabuleiro.',
        it: 'È tornato tutto sulla tovaglia.',
        nl: 'Alles ligt weer op de mat.',
        sv: 'Allt ligger på bordet igen.',
        da: 'Alt ligger på bordet igen.',
        no: 'Alt ligger på matta igjen.',
        fi: 'Kaikki on taas pöydällä.'
      },
      saidBroke:    {
        en: 'The stack is cups again.',
        de: 'Der Turm ist wieder in einzelne Dosen zerlegt.',
        fr: 'La pile est redevenue des barquettes.',
        es: 'La torre vuelve a ser diez botes.',
        pt: 'A torre virou potinhos de novo.',
        it: 'La torre è tornata a essere secchielli.',
        nl: 'De stapel is weer los in kokers.',
        sv: 'Tornet är askar igen.',
        da: 'Tårnet er ti æsker igen.',
        no: 'Stabelen er esker igjen.',
        fi: 'Torni hajosi takaisin rasioiksi.'
      },
      saidNothing:  {
        en: 'Nothing there.',
        de: 'Da ist nichts.',
        fr: 'Rien à cet endroit.',
        es: 'Ahí no hay nada.',
        pt: 'Não havia nada aí.',
        it: 'Qui non c’era niente.',
        nl: 'Daar lag niets.',
        sv: 'Där fanns ingenting att skopa upp.',
        da: 'Der var ingenting.',
        no: 'Det lå ingenting der.',
        fi: 'Siinä kohdassa ei ollut mitään.'
      },
      /* ⚠⚠ THE COLON FORM IS NOT A STYLE CHOICE — IT IS A BUG FIX, and
         the bug was in my English before any locale saw it.
         `"{h} hundreds, {t} tens, {o} ones"` prints "1 hundreds", and
         the same slot has to accept BOTH a digit and the phrase "not
         yet known", which no agreeing construction can do. The colon
         form is agreement-free, so it is grammatical at 1, at 0, and
         with a phrase, in every one of the eleven languages. Found by
         the Spanish panel auditing the source. */
      readState:    {
        en: 'Hundreds: {h}. Tens: {t}. Ones: {o}. The mat is {d}.',
        de: 'Hunderter: {h}. Zehner: {t}. Einer: {o}. Der Teppich ist {d}.',
        fr: 'Centaines : {h}. Dizaines : {t}. Unités : {o}. La nappe est {d}.',
        es: 'Centenas: {h}. Decenas: {t}. Unidades: {o}. La mesa está {d}.',
        pt: 'Centenas: {h}. Dezenas: {t}. Unidades: {o}. O tabuleiro está {d}.',
        it: 'Centinaia: {h}. Decine: {t}. Unità: {o}. La tovaglia è {d}.',
        nl: 'Honderdtallen: {h}. Tientallen: {t}. Eenheden: {o}. De mat is {d}.',
        sv: 'Hundratal: {h}. Tiotal: {t}. Ental: {o}. Bordet är {d}.',
        da: 'Hundreder: {h}. Tiere: {t}. Enere: {o}. Bordet er {d}.',
        no: 'Hundrere: {h}. Tiere: {t}. Enere: {o}. På matta: {d}.',
        fi: 'Satojen paikalla {h}, kymmenten paikalla {t}, ykkösten paikalla {o}. Pöytä on {d}.'
      },
      readDone:     {
        en: 'The mat is empty. Hundreds: {h}. Tens: {t}. Ones: {o}.',
        de: 'Der Teppich ist leer. Hunderter: {h}. Zehner: {t}. Einer: {o}.',
        fr: 'La nappe est vide. Centaines : {h}. Dizaines : {t}. Unités : {o}.',
        es: 'La mesa está vacía. Centenas: {h}. Decenas: {t}. Unidades: {o}.',
        pt: 'O tabuleiro está vazio. Centenas: {h}. Dezenas: {t}. Unidades: {o}.',
        it: 'La tovaglia è vuota. Centinaia: {h}. Decine: {t}. Unità: {o}.',
        nl: 'De mat is leeg. Honderdtallen: {h}. Tientallen: {t}. Eenheden: {o}.',
        sv: 'Bordet är tomt. Hundratal: {h}. Tiotal: {t}. Ental: {o}.',
        da: 'Bordet er tomt. Hundreder: {h}. Tiere: {t}. Enere: {o}.',
        no: 'Matta er tom. Hundrere: {h}. Tiere: {t}. Enere: {o}.',
        fi: 'Pöytä on tyhjä. Satojen paikalla {h}, kymmenten paikalla {t}, ykkösten paikalla {o}.'
      },

      gateTitle:    {
        en: 'The collection sheet',
        de: 'Das Sammelblatt',
        fr: 'La fiche de la collection',
        es: 'La hoja de la colección',
        pt: 'A folha da coleta',
        it: 'La scheda della raccolta',
        nl: 'Het verzamelblad',
        sv: 'Räknebladet',
        da: 'Tællearket',
        no: 'Samlearket',
        fi: 'Tehtäväpaperi'
      },
      /* ⚠ 'spill' was doing two jobs at two levels: bandSpill is the
         LARGEST of three settings, so a teacher on the handful setting
         read this as offering a sheet of something else. The band word
         must appear nowhere but the band. */
      gateBody:     {
        en: 'The sheet carries the very same collection the class just worked on, ready to be done again with a pencil.',
        de: 'Auf dem Blatt liegt genau dieselbe Sammlung, mit der die Klasse eben gearbeitet hat — bereit, alles noch einmal mit dem Bleistift zu machen.',
        fr: 'La fiche reprend exactement la collection que la classe vient de travailler, à refaire au crayon.',
        es: 'La hoja lleva la misma colección con la que acaba de trabajar la clase, lista para volver a hacerla con lápiz.',
        pt: 'A folha traz a mesma coleção que a turma acabou de recolher na tela, pronta para refazer no papel, com lápis.',
        it: 'La scheda porta sul foglio la stessa raccolta che la classe ha appena fatto, pronta da rifare con la matita.',
        nl: 'Op het blad staat precies dezelfde verzameling als de klas net had, klaar om het nog een keer met potlood te doen.',
        sv: 'På bladet ligger exakt samma samling som klassen just arbetade med, redo att göras om en gång till med penna.',
        da: 'Arket har præcis den samme samling, som klassen lige har arbejdet med — klar til at blive talt igen med blyant.',
        no: 'Arket har nøyaktig den samme samlinga som klassen nettopp jobbet med, klar til å gjøres en gang til med blyant.',
        fi: 'Paperilla on sama kokoelma, jonka luokka juuri tutki — nyt kynällä ryhmiteltäväksi uudelleen.'
      },
      gateCta:      {
        en: 'See the Teacher plan',
        de: 'Das Lehrkraft-Abo ansehen',
        fr: 'Découvrir l\'abonnement Enseignant',
        es: 'Ver el plan Docente',
        pt: 'Ver o plano Professor',
        it: 'Scopri il piano Insegnante',
        nl: 'Bekijk het Leerkracht-abonnement',
        sv: 'Läs om Lärarprenumeration',
        da: 'Se Lærerabonnementet',
        no: 'Se Lærerabonnementet',
        fi: 'Tutustu Opettajatilaukseen'
      },
      gateClose:    {
        en: 'Close',
        de: 'Schließen',
        fr: 'Fermer',
        es: 'Cerrar',
        pt: 'Fechar',
        it: 'Chiudi',
        nl: 'Sluiten',
        sv: 'Stäng',
        da: 'Luk',
        no: 'Lukk',
        fi: 'Sulje'
      },

      sheetTitle:   {
        en: 'Our collection',
        de: 'Unsere Sammlung',
        fr: 'Notre collection',
        es: 'Nuestra colección',
        pt: 'A nossa coleta',
        it: 'La nostra raccolta',
        nl: 'Onze verzameling',
        sv: 'Våra brickor',
        da: 'Vores optælling',
        no: 'Samlinga vår',
        fi: 'Meidän kokoelmamme'
      },
      /* ⚠⚠ THE PAPER MUST MIRROR THE STOPPING RULE, NOT THE HAND
         MOVEMENT. "Ring ten at a time" tells the child to count out
         exactly ten — which is the deliberate-ten move this apparatus
         exists to REMOVE, since the scoop lifts an unknown amount and
         the cup stops itself. The sheet was teaching the opposite of
         the tool. Found by the Finnish panel. */
      sheetNote:    {
        en: 'Ring a group of ten for as long as another full ten can still be made. Draw a cup for every ten. Then write how many hundreds, tens and ones you found.',
        de: 'Kreise so lange Zehnergruppen ein, wie noch eine volle Zehnergruppe entsteht. Male für jede Zehnergruppe eine Dose. Schreib dann auf, wie viele Hunderter, Zehner und Einer du gefunden hast.',
        fr: 'Entoure une dizaine tant qu\'une dizaine complète peut encore être formée. Dessine une barquette pour chaque dizaine. Écris ensuite combien de centaines, de dizaines et d\'unités tu as trouvées.',
        es: 'Rodea un grupo de diez mientras todavía pueda formarse otro diez completo. Dibuja un bote por cada diez. Escribe después cuántas centenas, decenas y unidades has encontrado.',
        pt: 'Circule um grupo de dez enquanto ainda der para formar outra dezena completa. Desenhe um potinho para cada dez. Depois escreva quantas centenas, dezenas e unidades você encontrou.',
        it: 'Cerchia un gruppo di dieci finché si può ancora formare una decina intera. Per ogni dieci, disegna un secchiello. Poi scrivi quante centinaia, decine e unità hai trovato.',
        nl: 'Omcirkel een groepje van tien zolang er nog een volle tien te maken is. Teken voor elke tien één koker. Schrijf daarna op hoeveel honderdtallen, tientallen en eenheden je gevonden hebt.',
        sv: 'Ringa in en tiogrupp så länge det fortfarande går att få ihop en hel tia. Rita en ask för varje tia. Skriv sedan hur många hundratal, tiotal och ental ni fick.',
        da: 'Sæt en ring om ti ad gangen, så længe der stadig kan blive en hel tier. Farv en æske for hver ti. Skriv til sidst, hvor mange hundreder, tiere og enere I fandt.',
        no: 'Ring inn ei tiergruppe så lenge det fortsatt kan bli en hel tier. Tegn ei eske for hver tier. Skriv så ned hvor mange hundrere, tiere og enere du fant.',
        fi: 'Ympyröi kymmenen nappulan ryhmä niin kauan kuin täysi kymmenen vielä syntyy. Piirrä jokaisesta kymmenestä yksi rasia. Kirjoita lopuksi, montako sataa, kymmentä ja ykköstä sait.'
      }
    },

    /* ⚠ EXACTLY ONE SETTING. `onSettings` re-spills, because a setting
       that changes nothing is furniture (#39). */
    settings: [
      { key: 'band', type: 'choice', labelKey: 'setBand', options: [
        { value: 'handful', labelKey: 'bandHandful' },
        { value: 'heap',    labelKey: 'bandHeap' },
        { value: 'spill',   labelKey: 'bandSpill' }
      ] }
    ],
    /* ⚠ NOTHING PERSISTS ACROSS RELOAD (#46 refuse #12). A start-state
       setting is not memory, which is why this one is allowed. */
    defaults: { band: 'heap' },

    premium: false,
    GEO: GEO,
    BANDS: BANDS,

    /* ================= the model ====================================
       Pure, DOM-free, and the gate drives it directly.

       ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM — structural, not guarded:
         - there is no representation for two open cups (`open` is a
           scalar);
         - there is no representation for a cup holding eleven (`open`
           is clamped at the ONLY writer, and the clamp is dead code the
           gate proves is dead);
         - there is no representation for a chip in two places
           (conservation is computed the long way round);
         - there is no representation for two hundreds (`stack` is 0|1
           and addOne refuses at the cap).                              */

    /* ⚠ TOTAL. Must survive null, 0, NaN and a string. #39 shipped
       `st || newState()`, which catches null and 0 and then hands []
       straight through to .length. */
    _st: function (st) {
      var o = (st && typeof st === 'object') ? st : {};
      var band = (BANDS[o.band]) ? o.band : 'heap';
      var mat = Array.isArray(o.mat) ? o.mat : [];
      var open = (typeof o.open === 'number' && isFinite(o.open)) ? Math.max(0, Math.min(CUP_HOLDS - 1, Math.floor(o.open))) : 0;
      var closed = (typeof o.closed === 'number' && isFinite(o.closed)) ? Math.max(0, Math.min(GEO.CUP_SLOTS, Math.floor(o.closed))) : 0;
      var stack = (o.stack === 1 || o.stack === true) ? 1 : 0;
      var n = (typeof o.n === 'number' && isFinite(o.n)) ? Math.max(0, Math.min(CAP, Math.floor(o.n))) : (mat.length + open + 10 * closed + 100 * stack);
      return { n: n, mat: mat, open: open, closed: closed, stack: stack, band: band, seed: (typeof o.seed === 'number' && isFinite(o.seed)) ? o.seed : 1 };
    },

    /* ⭐ ones = the mat PLUS the cup still open. Both are "not yet a
       ten", and both live in the ones place. */
    ones: function (st) { st = this._st(st); return st.mat.length + st.open; },

    /* ⭐ EVERY DIGIT SETTLES THE INSTANT ones < 10, because that is
       exactly when no further cup can close. One rule, three seats. */
    settled: function (st) { return this.ones(st) < CUP_HOLDS; },

    digits: function (st) {
      st = this._st(st);
      var done = this.settled(st);
      return {
        h: st.stack,
        t: st.closed,
        o: done ? this.ones(st) : null,
        settled: done
      };
    },

    /* L1: computed the long way round so the gate can compare it with
       its own independent oracle. */
    total: function (st) {
      st = this._st(st);
      return st.mat.length + st.open + 10 * st.closed + 100 * st.stack;
    },

    density: function (st) {
      st = this._st(st);
      var m = st.mat.length;
      if (m === 0) return 'denseEmpty';
      if (m <= 24) return 'denseFew';
      if (m <= 60) return 'denseThinner';
      return 'densePacked';
    },

    /* ---- the scatter -------------------------------------------------
       Random sequential adsorption from cluster-biased attempts:
       genuinely random subject to non-overlap, so there are no rows to
       find, and the micro-groups of two to six are what make a child's
       eye WANT to count — which is the trap. They start, reach about
       thirty, and lose the thread. The emotional beat is produced by a
       distribution parameter, not by a mood.                            */
    chipDiameter: function (band) {
      var b = BANDS[band] || BANDS.heap;
      return GEO.D_COEF * Math.sqrt((GEO.MAT_W * GEO.MAT_H) / b.nmax);
    },

    scatter: function (n, band, seed) {
      var d = this.chipDiameter(band);
      var rnd = mulberry32(seed >>> 0);
      var m = d * 0.5;
      var x0 = GEO.MAT_X + m, x1 = GEO.MAT_X + GEO.MAT_W - m;
      var y0 = GEO.MAT_Y + m, y1 = GEO.MAT_Y + GEO.MAT_H - m;
      var p = Math.sqrt((GEO.MAT_W * GEO.MAT_H) / Math.max(1, n));
      var floor2 = (GEO.NN_FLOOR * d) * (GEO.NN_FLOOR * d);
      var cr = this._cupRect(band);
      var ex0 = cr.x - m, ex1 = cr.x + cr.w + m, ey0 = cr.y - m, ey1 = cr.y + cr.h + m;
      var out = [];
      var parent = null, brood = 0;
      var i, tries, ok, j, dx, dy, cx, cy;

      for (i = 0; i < n; i++) {
        ok = false;
        for (tries = 0; tries < 240 && !ok; tries++) {
          /* cluster-biased attempts: keep a parent for a small brood,
             then move on. Falls back to uniform once a brood is spent
             or the neighbourhood is full. */
          if (!parent || brood <= 0 || tries > 60) {
            parent = { x: x0 + rnd() * (x1 - x0), y: y0 + rnd() * (y1 - y0) };
            brood = 2 + Math.floor(rnd() * 5);
          }
          if (tries > 120) {
            cx = x0 + rnd() * (x1 - x0);
            cy = y0 + rnd() * (y1 - y0);
          } else {
            var ang = rnd() * Math.PI * 2;
            var rad = 0.58 * p * Math.sqrt(-2 * Math.log(Math.max(1e-9, rnd())));
            if (rad > 2.1 * 0.58 * p) rad = 2.1 * 0.58 * p;
            cx = parent.x + Math.cos(ang) * rad;
            cy = parent.y + Math.sin(ang) * rad;
          }
          if (cx < x0 || cx > x1 || cy < y0 || cy > y1) continue;
          /* ⚠ THE OPEN CUP'S FOOTPRINT IS EXCLUDED. Without this a chip
             renders UNDER the cup, where it is invisible but still
             counted — a conservation break the eye can see and the
             model cannot, which is the worst kind. */
          if (cx > ex0 && cx < ex1 && cy > ey0 && cy < ey1) continue;
          ok = true;
          for (j = 0; j < out.length; j++) {
            dx = out[j].x - cx; dy = out[j].y - cy;
            if (dx * dx + dy * dy < floor2) { ok = false; break; }
          }
        }
        if (!ok) {
          /* Last resort: relax onto the least-crowded of a few uniform
             candidates. Never drop a chip — dropping one would break
             conservation, which is the one thing this tool exists to
             assert. */
          var best = null, bestD = -1, k;
          for (k = 0; k < 200; k++) {
            cx = x0 + rnd() * (x1 - x0); cy = y0 + rnd() * (y1 - y0);
            if (cx > ex0 && cx < ex1 && cy > ey0 && cy < ey1) continue;
            var near = Infinity;
            for (j = 0; j < out.length; j++) {
              dx = out[j].x - cx; dy = out[j].y - cy;
              var dd = dx * dx + dy * dy;
              if (dd < near) near = dd;
            }
            if (near > bestD) { bestD = near; best = { x: cx, y: cy }; }
          }
          out.push(best);
        } else {
          out.push({ x: cx, y: cy });
        }
        brood--;
      }

      /* ⭐ ONE BOUNDED RELAXATION PASS. The last-resort placement could
         sit inside the non-overlap floor (the gate measured 90.7u
         against a 92.3u floor), so pairs are pushed apart along their
         own axis. It is MONOTONE and CONSERVES THE COUNT exactly — a
         chip is only ever moved, never added or dropped — and it is
         bounded, because a gate that hangs is a gate that survived.

         ⚠ A SECOND PASS USED TO LIVE HERE AND IT WAS DELETED, NOT
         GATED. It moved the most crowded chip into the largest hole, to
         fix a "bald patch" of 3.46p. That bald patch turned out to be
         the OPEN CUP'S SHADOW — a measurement artefact, not a defect —
         and with the measurement corrected the repair changed the worst
         void by NOTHING, to two decimal places, in all three bands. A
         mutation that disables dead code cannot be killed, and the
         honest response to code no gate can see is to remove it. */
      var pass, a2, b2, dist, push;
      for (pass = 0; pass < 12; pass++) {
        var moved = 0;
        for (a2 = 0; a2 < out.length; a2++) {
          for (b2 = a2 + 1; b2 < out.length; b2++) {
            dx = out[b2].x - out[a2].x; dy = out[b2].y - out[a2].y;
            var dd2 = dx * dx + dy * dy;
            if (dd2 >= floor2 || dd2 === 0) continue;
            dist = Math.sqrt(dd2) || 0.001;
            push = ((GEO.NN_FLOOR * d) - dist) / 2 * 0.62;
            var ux = dx / dist * push, uy = dy / dist * push;
            out[a2].x = Math.max(x0, Math.min(x1, out[a2].x - ux));
            out[a2].y = Math.max(y0, Math.min(y1, out[a2].y - uy));
            out[b2].x = Math.max(x0, Math.min(x1, out[b2].x + ux));
            out[b2].y = Math.max(y0, Math.min(y1, out[b2].y + uy));
            moved++;
          }
        }
        if (!moved) break;
      }

      return out;
    },

    newState: function (band, seed) {
      band = BANDS[band] ? band : 'heap';
      var b = BANDS[band];
      var rnd = mulberry32((seed >>> 0) || 1);
      /* never at a band endpoint */
      /* strictly inside the band: never an endpoint, because a round or
         extreme number reads as one somebody CHOSE, and a ragged one
         reads as a quantity that happened.
         ⚠ A defensive clamp used to sit here and it was DEAD — the
         expression already yields exactly [lo+1, hi-1], so no input
         could reach it. The mutation harness found it by being unable
         to kill a poisoning of it. Dead code no gate can see is
         removed, not gated. */
      var n = b.lo + 1 + Math.floor(rnd() * (b.hi - b.lo - 1));
      return {
        n: n,
        mat: this.scatter(n, band, (seed >>> 0) || 1),
        open: 0, closed: 0, stack: 0,
        band: band,
        seed: (seed >>> 0) || 1
      };
    },

    /* ---- which chips a mouth would take ------------------------------
       ⭐ THE PREVIEW IS THE REFUSAL. The chips that ARE coming lift; the
       ones that will not fit do not. The child sees which three are
       staying behind BEFORE releasing the finger — a control stating
       its consequence before it is pressed.
       ⚠ The eleventh is NEVER LIFTED. Nothing is refused and nothing is
       corrected, and the cup's ten-ness is DEMONSTRATED rather than
       enforced. `money-mat`'s render-only-what-fits doctrine is
       INAPPLICABLE here, not rejected: hiding a chip would break
       conservation. A bounce is worse — it reports an error where the
       child aimed WELL. */
    /* ⚠ THE MOUTH IS SIZED FROM THE COLLECTION'S OWN STARTING DENSITY,
       NOT FROM THE BAND MAXIMUM.
       MEASURED, and it was wrong in BOTH directions at once: with a
       band-max mouth, a handful of 13 was swallowed in ONE press (no
       aiming decision at all) while a spill of 195 took 35, which is
       the "identical presses stop being decisions" failure that 200
       objects was refused for. Sized from the actual N, every
       collection starts at about ten a scoop and thins from there —
       and the thinning IS the endgame argument, because the mouth
       stays put while the heap empties.
       The ceiling keeps the mouth under half the mat's width, so a
       sparse handful cannot be cleared in a single gesture.
       ⭐⭐ AND MOUTH_TARGET IS 2 CUPFULS FOR A REASON THAT IS NOT PRESS
       COUNTS. At exactly one cupful the mouth covers about what the cup
       can take, so NOTHING IS EVER LEFT BEHIND and the preview-as-
       refusal — the whole "you can see which three are staying" moment
       that makes the cup's ten-ness demonstrated rather than enforced —
       NEVER FIRES. At two cupfuls the child sees roughly twice what
       will fit, on every early press. The press counts corroborate it
       (spill 10-27 against 12-37 at one cupful); they did not choose
       it. */
    mouthRadius: function (st) {
      st = this._st(st);
      var d = this.chipDiameter(st.band);
      var A = GEO.MAT_W * GEO.MAT_H;
      var r = Math.sqrt((GEO.MOUTH_TARGET * CUP_HOLDS * A) / (Math.PI * Math.max(1, st.n)));
      var lo = GEO.MOUTH_MIN * d, hi = GEO.MOUTH_MAX_W * GEO.MAT_W;
      return Math.max(lo, Math.min(hi, r));
    },

    underMouth: function (st, cx, cy) {
      st = this._st(st);
      var r = this.mouthRadius(st);
      var r2 = r * r;
      var hits = [];
      for (var i = 0; i < st.mat.length; i++) {
        var dx = st.mat[i].x - cx, dy = st.mat[i].y - cy;
        if (dx * dx + dy * dy <= r2) hits.push({ i: i, dd: dx * dx + dy * dy });
      }
      hits.sort(function (a, b) { return a.dd - b.dd; });
      var room = CUP_HOLDS - st.open;
      var take = [];
      for (var k = 0; k < hits.length && k < room; k++) take.push(hits[k].i);
      take.sort(function (a, b) { return a - b; });
      return { take: take, left: hits.length - take.length };
    },

    /* ---- transitions -------------------------------------------------
       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP.          */

    scoop: function (st, cx, cy) {
      st = this._st(st);
      var u = this.underMouth(st, cx, cy);
      if (!u.take.length) return null;
      var keep = [], t = 0;
      for (var i = 0; i < st.mat.length; i++) {
        if (t < u.take.length && u.take[t] === i) { t++; continue; }
        keep.push(st.mat[i]);
      }
      var open = st.open + u.take.length;
      var closed = st.closed, stack = st.stack, shut = false, fused = false;
      /* ⚠ THE CLAMP IS DEAD CODE AND THE GATE PROVES IT: underMouth
         never returns more than the room left. It exists so that a cup
         holding eleven is not merely refused but INEXPRESSIBLE. */
      if (open >= CUP_HOLDS) { open = 0; closed++; shut = true; }
      if (closed >= CUP_HOLDS) { closed = 0; stack = 1; fused = true; }
      return {
        st: { n: st.n, mat: keep, open: open, closed: closed, stack: stack, band: st.band, seed: st.seed },
        took: u.take.length, shut: shut, fused: fused, indices: u.take
      };
    },

    addOne: function (st) {
      st = this._st(st);
      if (st.n >= CAP) return null;
      var d = this.chipDiameter(st.band);
      var rnd = mulberry32((st.seed + st.n * 7919) >>> 0);
      var m = d * 0.5;
      var x0 = GEO.MAT_X + m, x1 = GEO.MAT_X + GEO.MAT_W - m;
      var y0 = GEO.MAT_Y + m, y1 = GEO.MAT_Y + GEO.MAT_H - m;
      var best = null, bestD = -1;
      for (var k = 0; k < 80; k++) {
        var cx = x0 + rnd() * (x1 - x0), cy = y0 + rnd() * (y1 - y0);
        var near = Infinity;
        for (var j = 0; j < st.mat.length; j++) {
          var dx = st.mat[j].x - cx, dy = st.mat[j].y - cy;
          var dd = dx * dx + dy * dy;
          if (dd < near) near = dd;
        }
        if (near > bestD) { bestD = near; best = { x: cx, y: cy }; }
      }
      var mat = st.mat.slice(); mat.push(best);
      var open = st.open, closed = st.closed, stack = st.stack;
      return { st: { n: st.n + 1, mat: mat, open: open, closed: closed, stack: stack, band: st.band, seed: st.seed }, added: best };
    },

    /* ⭐ THE BORROW. The mat has nothing to give, so a closed cup breaks
       open and one leaves. It is not a lesson about subtraction — it is
       the same fact read the other way. */
    removeOne: function (st) {
      st = this._st(st);
      if (st.n <= 0) return null;
      var mat = st.mat.slice(), open = st.open, closed = st.closed, stack = st.stack;
      var opened = false, broke = false;
      if (mat.length > 0) {
        mat.pop();
      } else if (open > 0) {
        open--;
      } else if (closed > 0) {
        closed--; open = CUP_HOLDS - 1; opened = true;
      } else if (stack === 1) {
        stack = 0; closed = CUP_HOLDS - 1; open = CUP_HOLDS - 1; broke = true; opened = true;
      } else {
        return null;
      }
      return { st: { n: st.n - 1, mat: mat, open: open, closed: closed, stack: stack, band: st.band, seed: st.seed }, opened: opened, broke: broke };
    },

    tipCup: function (st) {
      st = this._st(st);
      if (st.closed <= 0) return null;
      return { st: { n: st.n, mat: this._refill(st, CUP_HOLDS), open: st.open, closed: st.closed - 1, stack: st.stack, band: st.band, seed: st.seed } };
    },

    breakStack: function (st) {
      st = this._st(st);
      if (st.stack !== 1) return null;
      /* a hundred becomes ten cups; nine fit the slots and the tenth is
         immediately the one that would not fit, so it goes back as ten
         loose chips. */
      return { st: { n: st.n, mat: this._refill(st, CUP_HOLDS), open: st.open, closed: GEO.CUP_SLOTS, stack: 0, band: st.band, seed: st.seed } };
    },

    tipAll: function (st) {
      st = this._st(st);
      if (st.closed === 0 && st.stack === 0 && st.open === 0) return null;
      return { st: { n: st.n, mat: this.scatter(st.n, st.band, st.seed), open: 0, closed: 0, stack: 0, band: st.band, seed: st.seed } };
    },

    _refill: function (st, k) {
      /* Chips return to fresh positions drawn from the SAME seed family,
         so a tipped cup lands back in the heap rather than in a tidy
         row. ⚠ A tidy heap is countable by eye and the premise dies. */
      var extra = this.scatter(st.mat.length + k, st.band, (st.seed + 104729) >>> 0);
      return extra;
    },

    /* ---- capability flags the chips read ----------------------------- */
    canTipAll: function (st) { st = this._st(st); return st.closed > 0 || st.stack > 0 || st.open > 0; },
    canAdd: function (st) { return this._st(st).n < CAP; },
    canRemove: function (st) { return this._st(st).n > 0; },

    /* ================= lifecycle ===================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('ccp-wide');
      /* ⚠⚠ THE SCROLL ESCAPE, AND IT IS NOT COSMETIC. The shell pins
         html AND body to overflow:hidden, so on a phone visiting the
         standalone page there is no iframe to grow into and scrollY is
         stuck at 0 — #47 measured a control row that began at y=558 in
         a 568px window and was PHYSICALLY UNREACHABLE. English fitted
         and proved nothing.
         ⚠ Written as TWO rules. `html,body.x{...}` is a selector LIST
         whose `html` half applies unconditionally, which makes the
         class decorative and its mutation unkillable (#22's trap). */
      document.documentElement.classList.add('ccp-scroll');
      document.body.classList.add('ccp-scroll');

      this._seed = 1;
      this._anim = null;
      this._preview = null;
      this._lastSound = 0;
      this._focusMat = 4;
      this._focusRack = 0;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.band, this._nextSeed());
      this._checkEntitlement();
      this._bindPrint();
    },

    _nextSeed: function () {
      this._seed = (this._seed * 1103515245 + 12345) >>> 0;
      return this._seed || 1;
    },

    /* ⚠ RESET AND TIP BACK ARE DIFFERENT ACTS AND THE DIFFERENCE IS THE
       POINT. Tip back keeps the number and undoes the grouping: DO IT
       AGAIN. Reset draws a NEW number: DO A NEW ONE. A teacher pressing
       Reset in front of the class is starting the routine, and the same
       number twice is a demonstration.
       ⚠ reset() MUST EXIST or the shell's button is dead on every path
       (#43) — it survives embed and embed=compact. */
    reset: function () {
      this._anim = null;
      this._preview = null;
      this.st = this.newState(this.api.settings.band, this._nextSeed());
      this.render();
    },

    onSettings: function () {
      /* a setting that changes nothing is furniture (#39) */
      this.reset();
    },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    _snd: function (freq) {
      var now = Date.now();
      if (now - this._lastSound < GEO.SND_DEBOUNCE) return;
      this._lastSound = now;
      if (this.api && this.api.sound) this.api.sound(freq);
    },

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ==========================================
       ⚠ THE ARENA IS CAPPED ON WIDTH, INSIDE HEIGHT QUERIES, NEVER ON
       HEIGHT. Capping the height of an aspect-ratio box letterboxes the
       SVG while %-positioned keyboard pads stay bound to the box, so
       every pad drifts off the thing it drives — #43 shipped that and
       every mark rendered as two circles with all eight gates green. */
    _build: function () {
      var api = this.api, self = this;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'ccp-wrap');
      this._wrap = wrap;

      var card = api.el('div', 'ccp-card');
      var arena = api.el('div', 'ccp-arena');
      this._arena = arena;

      var svg = this._svg('svg', {
        viewBox: '0 0 ' + GEO.VB_W + ' ' + GEO.VB_H,
        class: 'ccp-svg', role: 'img'
      });
      this._svgEl_root = svg;
      arena.appendChild(svg);

      /* invisible keyboard/AT layer.
         ⚠ POINTER TOUCHES THE MAT, KEYBOARD DRIVES THE PADS. The layer
         must not eat the pointer, so it is pointer-events:none and each
         pad turns it back on only for focus. */
      var pads = api.el('div', 'ccp-pads');
      this._pads = pads;
      arena.appendChild(pads);

      card.appendChild(arena);

      /* ---- the ledge: four glyph chips on ONE wrapping row.
         ⚠ On its own row the print chip cost 48px plus a gap and blew
         the height budget at both ends of the sweep (#47). */
      var ledge = api.el('div', 'ccp-ledge');
      this._btnTip = this._chip(ledge, 'ccp-b-tip', this._glyphTip(), function () { self._doTipAll(); });
      this._btnMore = this._chip(ledge, 'ccp-b-more', this._glyphChev(true), function () { self._doAddOne(); });
      this._btnFewer = this._chip(ledge, 'ccp-b-fewer', this._glyphChev(false), function () { self._doRemoveOne(); });
      this._btnPrint = this._chip(ledge, 'ccp-b-print', this._glyphPrint(), function () {
        /* ⚠ #47 shipped a chip promising "Print" in every entitlement
           state while its handler opened a paywall. The label states
           the requirement; only then may the handler refuse. */
        if (!self.premium) { self._showGate(); return; }
        self._buildSheet();
        window.print();
      });
      card.appendChild(ledge);

      wrap.appendChild(card);
      api.stage.appendChild(wrap);

      /* ⚠ THE SHEET IS A SIBLING OF THE WRAP, NEVER A CHILD. A hidden
         parent kills the whole subtree and measures 0mm on paper, with
         every assertion still green (#40, #41, #47). */
      this._sheet = api.el('div', 'ccp-sheet');
      api.stage.appendChild(this._sheet);

      this._bindPointer();
      this._bindKeys();
    },

    _svg: function (tag, attrs) {
      var n = document.createElementNS('http://www.w3.org/2000/svg', tag);
      if (attrs) for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
      return n;
    },

    _chip: function (parent, cls, glyph, fn) {
      var b = this.api.el('button', 'ccp-btn ' + cls);
      b.type = 'button';
      b.innerHTML = glyph;
      /* ⚠ A SYNTHETIC .click() NEVER FIRES pointerdown. The shared
         liveness gate drives controls that way, and #41 scored DEAD on
         all nine paths because its only handler was a pointer one. */
      b.addEventListener('click', fn);
      parent.appendChild(b);
      return b;
    },

    /* ⚠ NO OPERATOR GLYPH ANYWHERE, INCLUDING ONE DRAWN BY CODE. #46
       shipped a literal "+" into eleven locales because the stepper
       DREW it, so it survived every string ban, every poison case and
       eleven native reviews. These are CHEVRONS: they say fewer/more
       without naming an operation. */
    _glyphChev: function (up) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
        + '<path d="' + (up ? 'M5 15 L12 8 L19 15' : 'M5 9 L12 16 L19 9')
        + '" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    },
    _glyphTip: function () {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
        + '<path d="M20 12a8 8 0 1 1-2.6-5.9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'
        + '<path d="M20 3.5V8h-4.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    },
    _glyphPrint: function () {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
        + '<path d="M7 9V4h10v5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>'
        + '<rect x="4" y="9" width="16" height="7" rx="1.6" fill="none" stroke="currentColor" stroke-width="2.2"/>'
        + '<rect x="7" y="15" width="10" height="5" rx="1" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>';
    },

    /* ---- the open cup's footprint, excluded from the scatter --------- */
    _cupRect: function (band) {
      var d = this.chipDiameter(band);
      var w = (GEO.CUP_IW + 2 * GEO.CUP_WALL) * d;
      var h = (GEO.CUP_IH + GEO.CUP_WALL + 0.30) * d;
      var x = GEO.MAT_X + GEO.MAT_W - w - 0.35 * d;
      var y = GEO.MAT_Y + GEO.MAT_H - h;
      return { x: x, y: y, w: w, h: h, d: d };
    },

    /* ================= paint ======================================== */
    _paint: function () {
      var svg = this._svgEl_root;
      if (!svg) return;
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      var st = this.st, api = this.api;
      var anim = this._anim;
      var d = this.chipDiameter(st.band);

      this._paintReadout(svg, st);
      this._paintMat(svg, st, d, anim);
      this._paintOpenCup(svg, st, d, anim);
      this._paintShelf(svg, st, anim);

      svg.setAttribute('aria-label', this._stateSentence(st));
      this._syncChips();
      this._syncPads(st, d);
    },

    /* ---- readout ---------------------------------------------------
       ⭐ THE SEAT IS THE ANSWER TO BALOO 2 HAVING NO TABULAR FIGURES.
       A FIXED 62-unit rect for every digit, never the glyph's advance —
       a variable seat would make a settled 1 look less settled than a
       settled 8. The seats do the aligning the font refuses to do, and
       Baloo 2 is never asked to line anything up: three separate <text>
       nodes at a fixed pitch, each text-anchor:middle over its slot. */
    _paintReadout: function (svg, st) {
      var g = this._svg('g', { class: 'ccp-read' });
      /* ⚠⚠ THREE STATES, NOT TWO — and getting this wrong BROKE THE
         PARITY LAW THIS FILE STATES ABOUT ITSELF, in both directions at
         once. The first build used `known = settled` for all three
         slots, so the wall showed `? ? ?` throughout while
         `_stateSentence` was passing the tens as a bare number: the
         blind child HEARD "Tens: 3" while the class SAW a question
         mark, and was simultaneously told the hundreds were unknown
         while a stack stood in plain sight. Found by the German panel
         reading the model, not the copy.
           UNKNOWN      `?`     grey, no seat  — the ones, always, until
                                                 the mat is spent
           PROVISIONAL  digit   grey, no seat  — hundreds and tens: the
                                                 count SO FAR, which can
                                                 still change, and the
                                                 ticking IS the
                                                 instrument working
           SETTLED      digit   ink, on a seat — all three, together
         ⭐ THE ONES DIGIT HAS NO PROVISIONAL STATE, EVER. While a ten
         could still be made it is not a partial answer, it is unknown;
         and the instant it cannot, it comes into existence already
         settled. That is the whole climax and it is free. */
      var dg = this.digits(st);
      var vals = [dg.h, dg.t, dg.o];
      var i;
      for (i = 0; i < 3; i++) {
        /* ⚠⚠ TWO DIFFERENT QUESTIONS, AND COLLAPSING THEM INTO ONE MADE
           THE TOOL CLAIM MORE THAN ITS MODEL SUPPORTS.
             `known` — is there a glyph to draw at all?
             `final` — is that glyph NO LONGER NEGOTIABLE?
           The first build used one flag for both, so a PROVISIONAL tens
           digit rendered in ink ON A SEAT — and the seat is precisely
           the mark that says "this cannot change now", on a digit that
           demonstrably still can. Found by reading the render. */
        var isOnes = (i === 2);
        var known = dg.settled || !isOnes;
        var final = dg.settled;
        var cx = GEO.SLOT_CX[i];
        if (final) {
          g.appendChild(this._svg('rect', {
            x: cx - GEO.SEAT_W / 2, y: GEO.SEAT_Y, width: GEO.SEAT_W, height: GEO.SEAT_H,
            rx: GEO.SEAT_R, class: 'ccp-seat'
          }));
        }
        var t = this._svg('text', {
          x: cx, y: GEO.BASELINE, 'text-anchor': 'middle',
          class: 'ccp-digit' + (known ? ' is-set' : ' is-open'),
          'font-size': known ? GEO.FONT : Math.round(GEO.FONT * GEO.QMARK_F)
        });
        /* ⚠ The question mark is set at 0.84F, not F: Baloo 2's ? rises
           above the lining figures, so at equal font-size it is visually
           taller than the digits beside it. 0.84 puts its apex on their
           cap line, same baseline. */
        t.appendChild(document.createTextNode(known ? String(vals[i]) : '?'));
        g.appendChild(t);
      }
      svg.appendChild(g);
    },

    /* ---- the mat ---------------------------------------------------
       ⚠⚠ THE HEAP IS TWO <path> NODES. If it were N nodes then
       querySelectorAll('.ccp-chip').length IS the answer — the total
       would sit in the DOM and the accessibility tree from the first
       frame, fully enumerable, while every string audit passes. One
       path carries every ring, one carries every body, each as N
       sub-paths in its own `d`.
       ⚠ Scope the claim honestly: NOT DERIVABLE BY COUNTING DOM NODES.
       A `d` attribute can always be parsed. */
    _paintMat: function (svg, st, d, anim) {
      var g = this._svg('g', { class: 'ccp-mat' });
      g.appendChild(this._svg('rect', {
        x: GEO.MAT_X, y: GEO.MAT_Y, width: GEO.MAT_W, height: GEO.MAT_H,
        rx: 18, class: 'ccp-mat-bed'
      }));

      var lift = {}, flying = {};
      var t = anim ? anim.t : 0;
      if (anim && anim.kind === 'scoop') {
        var k;
        for (k = 0; k < anim.indices.length; k++) {
          if (t < 1) flying[anim.indices[k]] = true;
        }
      }
      if (this._preview) {
        for (var q = 0; q < this._preview.take.length; q++) lift[this._preview.take[q]] = true;
      }

      var rings = [], bodies = [], sheens = [];
      var rO = d * GEO.CHIP_OUTER, rI = d * GEO.CHIP_INNER, dy = d * GEO.CHIP_INNER_DY;
      var px = this._pxPerUnit();
      var showSheen = (d * px) >= GEO.SHEEN_AT_PX;

      for (var i = 0; i < st.mat.length; i++) {
        if (flying[i]) continue;
        var c = st.mat[i];
        var s = lift[i] ? 1.03 : 1;
        rings.push(this._disc(c.x, c.y, rO * s));
        bodies.push(this._disc(c.x, c.y + dy, rI * s));
        if (showSheen) sheens.push(this._sheen(c.x, c.y + dy, rI));
      }
      if (rings.length) g.appendChild(this._svg('path', { class: 'ccp-ring', d: rings.join('') }));
      if (bodies.length) g.appendChild(this._svg('path', { class: 'ccp-body', d: bodies.join('') }));
      if (sheens.length) g.appendChild(this._svg('path', { class: 'ccp-sheen', d: sheens.join('') }));

      /* chips in flight, drawn on the straight line to their slot */
      if (anim && anim.kind === 'scoop' && anim.fly) {
        var fr = [], fb = [];
        for (var f = 0; f < anim.fly.length; f++) {
          var a = anim.fly[f];
          var e = this._ease(Math.max(0, Math.min(1, (t - a.t0) / Math.max(0.0001, a.t1 - a.t0))));
          var x = a.x0 + (a.x1 - a.x0) * e, y = a.y0 + (a.y1 - a.y0) * e;
          var sc = a.r1 / rO;
          var rr = rO * (1 + (sc - 1) * e);
          fr.push(this._disc(x, y, rr));
          fb.push(this._disc(x, y + dy * (rr / rO), rI * (rr / rO)));
        }
        if (fr.length) g.appendChild(this._svg('path', { class: 'ccp-ring', d: fr.join('') }));
        if (fb.length) g.appendChild(this._svg('path', { class: 'ccp-body', d: fb.join('') }));
      }

      /* the scoop mouth — the only tap target the child ever aims, and
         it cannot be too small by construction (4.8d). */
      if (this._preview) {
        g.appendChild(this._svg('circle', {
          cx: this._preview.cx, cy: this._preview.cy,
          r: this.mouthRadius(st), class: 'ccp-mouth'
        }));
      }
      svg.appendChild(g);
    },

    /* two arcs = one full circle, as a sub-path */
    _disc: function (cx, cy, r) {
      var a = cx - r, b = cx + r;
      return 'M' + a.toFixed(2) + ',' + cy.toFixed(2)
        + 'a' + r.toFixed(2) + ',' + r.toFixed(2) + ' 0 1,0 ' + (2 * r).toFixed(2) + ',0'
        + 'a' + r.toFixed(2) + ',' + r.toFixed(2) + ' 0 1,0 ' + (-2 * r).toFixed(2) + ',0';
    },
    _sheen: function (cx, cy, rI) {
      var rx = rI * 0.49, ry = rI * 0.27;
      var x = cx - rI * 0.32, y = cy - rI * 0.49;
      return 'M' + (x - rx).toFixed(2) + ',' + y.toFixed(2)
        + 'a' + rx.toFixed(2) + ',' + ry.toFixed(2) + ' 0 1,0 ' + (2 * rx).toFixed(2) + ',0'
        + 'a' + rx.toFixed(2) + ',' + ry.toFixed(2) + ' 0 1,0 ' + (-2 * rx).toFixed(2) + ',0';
    },

    _pxPerUnit: function () {
      if (!this._arena) return 0.296;
      var w = this._arena.getBoundingClientRect().width;
      return (w || 296) / GEO.VB_W;
    },

    /* ---- the cup ---------------------------------------------------
       ⭐ AT 12px OF CHIP THE CUP IS 29.6 x 69.5px AND ONLY ONE THING
       SURVIVES: THE NOTCH — the mouth ellipse, a dark opening in the
       silhouette at 5.36:1, unmissable from the back of a room. The
       crest bumps are 1.2px and the stroke step is 2.5 -> 3.4px, and
       both are CONFIRMATION ONLY.
       BUILD LAW: THE NOTCH IS LOAD-BEARING. If a change would remove
       the notch, the change is refused. */
    _cupPath: function (x, y, u, shut) {
      var W = (GEO.CUP_IW + 2 * GEO.CUP_WALL) * u;
      var Hi = GEO.CUP_IH * u;
      var tp = GEO.CUP_TAPER, rb = GEO.CUP_BASE_R * u;
      var l = x - W / 2, r = x + W / 2;
      var lt = x - (W / 2) * tp, rt = x + (W / 2) * tp;
      return 'M' + l.toFixed(2) + ',' + y.toFixed(2)
        + 'L' + lt.toFixed(2) + ',' + (y + Hi - rb).toFixed(2)
        + 'Q' + lt.toFixed(2) + ',' + (y + Hi).toFixed(2) + ' ' + (lt + rb).toFixed(2) + ',' + (y + Hi).toFixed(2)
        + 'L' + (rt - rb).toFixed(2) + ',' + (y + Hi).toFixed(2)
        + 'Q' + rt.toFixed(2) + ',' + (y + Hi).toFixed(2) + ' ' + rt.toFixed(2) + ',' + (y + Hi - rb).toFixed(2)
        + 'L' + r.toFixed(2) + ',' + y.toFixed(2) + 'Z';
    },

    _paintCup: function (g, x, y, u, count, shut, ground, lidT) {
      var W = (GEO.CUP_IW + 2 * GEO.CUP_WALL) * u;
      g.appendChild(this._svg('path', {
        d: this._cupPath(x, y, u, shut),
        class: 'ccp-cup' + (shut ? ' is-shut' : ''),
        'stroke-width': (shut ? GEO.CUP_WALL_SHUT : GEO.CUP_WALL) * u
      }));

      if (!shut) {
        /* ⚠⚠ PAINT ORDER IS LOAD-BEARING, AND I GOT IT WRONG FIRST.
           THE MOUTH GOES DOWN BEFORE THE CHIPS. Drawing the chips first
           and the rim ellipse over them covers the top row, which
           DELETES the two crest bumps — and those bumps are the entire
           "it cannot take an eleventh" signal, delivered as a change of
           silhouette. Mouth first is also what the eye expects: you see
           the far rim, then the contents standing in front of it.

           ⚠⚠ AND THE MOUTH IS DARK, NOT THE GROUND BEHIND IT. Filling
           it with the mat colour (a cup standing ON the mat) made the
           open and closed cups NEARLY IDENTICAL — on a tool whose whole
           subject is closed containers versus loose ones. Found by
           reading the render; no assertion in the suite could see it.
           This tool's own build law says THE NOTCH IS LOAD-BEARING, and
           my first render had removed it. Teal is already the
           container's colour, so the notch costs no twelfth value and
           carries 5.79:1 against the cream body — unmissable at 12px
           from the back of a room. */
        g.appendChild(this._svg('ellipse', {
          cx: x, cy: y, rx: W / 2, ry: (W / 2) * GEO.CUP_RIM_RY,
          class: 'ccp-mouth-cup',
          'stroke-width': GEO.CUP_WALL * u
        }));

        /* the chips inside, 2 wide x 5 TALL, bottom-up.
           ⚠ NEVER 5x2 — that is a ten-frame, and a ten-frame is banned
           twice over: `estimation-jar` owns it and the naming note bans
           *frame*. The eye subitises 2 and counts 5 rows. */
        var d = u, rO = d * GEO.CHIP_OUTER, rI = d * GEO.CHIP_INNER, dy = d * GEO.CHIP_INNER_DY;
        var Hi = GEO.CUP_IH * u;
        var rings = [], bodies = [];
        for (var i = 0; i < count; i++) {
          var col = i % 2, row = Math.floor(i / 2);
          var cx = x + (col === 0 ? -1 : 1) * (0.49 * d);
          var cy = y + Hi - (0.49 * d) - row * (0.98 * d) - GEO.CUP_WALL * u;
          rings.push(this._disc(cx, cy, rO));
          bodies.push(this._disc(cx, cy + dy, rI));
        }
        if (rings.length) g.appendChild(this._svg('path', { class: 'ccp-ring', d: rings.join('') }));
        if (bodies.length) g.appendChild(this._svg('path', { class: 'ccp-body', d: bodies.join('') }));
      }

      if (shut || (lidT != null && lidT > 0)) {
        /* ⚠ THE LID IS OPAQUE AND THE CHIPS ARE OCCLUDED, NEVER FADED.
           A dissolve reads as LOSS, and the quantity is conserved —
           which is the one thing this instrument exists to say. This is
           the shipped house idiom (#47), not an invention. */
        /* ⚠ THE LID IS PROUD OF THE SHOULDER AND IT IS A CAP, NOT A
           HAIRLINE. At 0.30u and flush it rendered as a 4.6px bar that
           merged into the body outline, so a closed cup and an open one
           were the same drawing. It now overhangs each side and is tall
           enough to read as a lid at the shelf scale. */
        var ang = (lidT == null) ? 0 : (-108 * (1 - lidT));
        var lw = W + 2 * GEO.CUP_LID_OUT * u;
        var lid = this._svg('rect', {
          x: x - lw / 2, y: y - GEO.CUP_LID_H * u * 0.62,
          width: lw, height: GEO.CUP_LID_H * u,
          rx: GEO.CUP_LID_H * u * 0.42,
          class: 'ccp-lid',
          'stroke-width': GEO.CUP_WALL * u,
          transform: 'rotate(' + ang.toFixed(2) + ',' + (x - lw / 2).toFixed(2) + ',' + y.toFixed(2) + ')'
        });
        g.appendChild(lid);
      }
    },

    _paintOpenCup: function (svg, st, d, anim) {
      var g = this._svg('g', { class: 'ccp-open' });
      var rect = this._cupRect(st.band);
      var count = st.open;
      var lidT = null, squash = 1;
      if (anim && anim.kind === 'scoop') {
        if (anim.phase === 'absorb') squash = 1 - 0.015 * Math.sin(Math.PI * anim.sub);
        if (anim.phase === 'lid') lidT = anim.sub;
        if (anim.phase === 'absorb' || anim.phase === 'lid') count = CUP_HOLDS;
      }
      var gg = this._svg('g', {
        transform: 'translate(0,' + (rect.y + rect.h).toFixed(2) + ') scale(1,' + squash.toFixed(4) + ') translate(0,' + (-(rect.y + rect.h)).toFixed(2) + ')'
      });
      this._paintCup(gg, rect.x + rect.w / 2, rect.y + 0.30 * d, d, count, false, '#F6EAD3', lidT);
      g.appendChild(gg);
      svg.appendChild(g);
    },

    /* ---- the shelf --------------------------------------------------
       ⭐ THE STACK IS TEN CLOSED CUPS NESTED, and it is visibly a bigger
       object while being conspicuously NOT ten times anything — that
       asymmetry IS the mathematics. A hundred is not BIGGER; it is one
       thing standing in a different column. It carries its ten as ten
       rim hairlines, so THE HUNDRED IS AUDITABLE. Nothing here is
       hidden.
       ⚠ Not a rod and not a flat: `place-value-lab` ships unit cube ->
       ten rod -> hundred flat, and that fence is why the closed forms
       here are a cup and a nested stack. */
    _paintShelf: function (svg, st, anim) {
      var g = this._svg('g', { class: 'ccp-shelf' });
      var u = GEO.SHELF_U;
      var cupW = (GEO.CUP_IW + 2 * GEO.CUP_WALL) * u;
      var cupH = (GEO.CUP_IH + GEO.CUP_WALL + 0.30) * u;
      var top = GEO.SHELF_Y + GEO.SHELF_H - 24;

      g.appendChild(this._svg('rect', {
        x: 0, y: top, width: GEO.VB_W, height: 24, class: 'ccp-plinth'
      }));
      g.appendChild(this._svg('rect', {
        x: 0, y: top, width: GEO.VB_W, height: 5, class: 'ccp-plinth-edge'
      }));

      var stackX = GEO.SHELF_MARGIN + (cupW * 1.06) / 2;
      var firstCup = GEO.SHELF_MARGIN + cupW * 1.06 + GEO.SHELF_DIV;

      if (st.stack === 1) {
        var nest = GEO.STACK_NEST * cupH;
        for (var s = 9; s >= 0; s--) {
          var sy = top - cupH - s * nest;
          g.appendChild(this._svg('path', {
            d: this._cupPath(stackX, sy, u, true),
            class: 'ccp-cup is-shut' + (s > 0 ? ' is-nested' : ''),
            'stroke-width': (s === 0 ? GEO.CUP_WALL_SHUT : GEO.CUP_WALL) * u
          }));
        }
      }

      for (var i = 0; i < st.closed; i++) {
        var cx = firstCup + i * (cupW + GEO.SHELF_GAP) + cupW / 2;
        this._paintCup(g, cx, top - cupH, u, CUP_HOLDS, true, '#0D4E44', null);
      }
      svg.appendChild(g);
    },

    /* ================= motion =======================================
       ⭐ ONE INTERPOLATOR. Every animated quantity reads the same `t`
       from one rAF loop. A completion callback would show cause and
       effect between two objects instead of one object changing.
       ⚠ REDUCED MOTION COMPRESSES, NEVER SKIPS — the scoop IS the
       lesson. */
    _ease: function (t) { return t < 0 ? 0 : t > 1 ? 1 : (1 - Math.pow(1 - t, 3)); },

    _run: function (spec, done) {
      var self = this;
      var total = spec.total;
      var t0 = null;
      this._anim = { kind: spec.kind, t: 0, phase: spec.phases[0].name, sub: 0, indices: spec.indices || [], fly: spec.fly || null };
      function frame(ts) {
        if (t0 === null) t0 = ts;
        var el = ts - t0;
        var t = Math.min(1, el / total);
        var acc = 0, ph = spec.phases[0], sub = 0;
        for (var i = 0; i < spec.phases.length; i++) {
          var p = spec.phases[i];
          if (el >= acc && el < acc + p.ms) { ph = p; sub = (el - acc) / p.ms; break; }
          acc += p.ms;
          if (i === spec.phases.length - 1) { ph = p; sub = 1; }
        }
        self._anim.t = t; self._anim.phase = ph.name; self._anim.sub = sub;
        if (ph.sound && !ph._fired) { ph._fired = true; self._snd(ph.sound); }
        self._paint();
        if (el < total) window.requestAnimationFrame(frame);
        else { self._anim = null; if (done) done(); self._paint(); }
      }
      window.requestAnimationFrame(frame);
    },

    /* ================= acts ========================================= */

    _doScoop: function (cx, cy) {
      var res = this.scoop(this.st, cx, cy);
      this._preview = null;
      if (!res) { this.api.announce(this.api.t('saidNothing')); this._paint(); return; }
      var self = this;
      var st0 = this.st, d = this.chipDiameter(st0.band);
      var rect = this._cupRect(st0.band);
      var startCount = st0.open;

      /* ⭐ EVERY CHIP'S GATHER DURATION IS IDENTICAL REGARDLESS OF
         DISTANCE — the far ones move faster and THEY ALL ARRIVE IN THE
         SAME FRAME. Ten arrivals at ten times is a visible COUNT, and a
         count is meaning; one arrival of ten things is a GROUPING.
         Distance-proportional easing would silently reintroduce the
         count. Slots are solved in order so no two paths cross. */
      var fly = [], Hi = GEO.CUP_IH * d;
      for (var k = 0; k < res.indices.length; k++) {
        var c = st0.mat[res.indices[k]];
        var slot = startCount + k;
        var col = slot % 2, row = Math.floor(slot / 2);
        fly.push({
          x0: c.x, y0: c.y,
          x1: rect.x + rect.w / 2 + (col === 0 ? -1 : 1) * (0.49 * d),
          y1: rect.y + 0.30 * d + Hi - (0.49 * d) - row * (0.98 * d) - GEO.CUP_WALL * d,
          r1: d * GEO.CHIP_OUTER, t0: 0, t1: 1
        });
      }

      var phases = [{ name: 'arm', ms: this._dur(GEO.T_ARM) }, { name: 'gather', ms: this._dur(GEO.T_GATHER) }];
      if (res.shut) {
        phases.push({ name: 'absorb', ms: this._dur(GEO.T_ABSORB) });
        phases.push({ name: 'lid', ms: this._dur(GEO.T_LID), sound: GEO.SND_CLOSE });
        phases.push({ name: 'carry', ms: this._dur(GEO.T_CARRY) });
        phases.push({ name: 'tick', ms: this._dur(GEO.T_TICK) });
      }
      var total = 0;
      for (var p = 0; p < phases.length; p++) total += phases[p].ms;

      this._run({ kind: 'scoop', total: total, phases: phases, indices: res.indices, fly: fly }, function () {
        self.st = res.st;
        var msg = self._fmt(self.api.t('saidScoop'), { n: res.took });
        if (res.shut) msg = self.api.t('saidShut');
        if (res.fused) msg = self.api.t('saidStack');
        if (!res.shut) {
          var room = CUP_HOLDS - res.st.open;
          msg += ' ' + self._fmt(self.api.t('saidRoom'), { n: room });
        }
        if (self.settled(res.st)) msg = self._doneSentence(res.st);
        self.api.announce(msg);
        self._paint();
      });
    },

    _doAddOne: function () {
      var r = this.addOne(this.st);
      if (!r) return;
      var self = this;
      this.st = r.st;
      /* the added chip may cascade a close */
      this._snd(GEO.SND_OPEN);
      this.api.announce(this._stateSentence(this.st));
      this._paint();
    },

    _doRemoveOne: function () {
      var r = this.removeOne(this.st);
      if (!r) return;
      this.st = r.st;
      this._snd(r.opened ? GEO.SND_OPEN : GEO.SND_OPEN);
      this.api.announce(r.opened ? this.api.t('saidOpened') : this._stateSentence(this.st));
      this._paint();
    },

    _doTipAll: function () {
      var r = this.tipAll(this.st);
      if (!r) return;
      this.st = r.st;
      this._snd(GEO.SND_OPEN);
      this.api.announce(this.api.t('saidTipAll'));
      this._paint();
    },

    _doTipCup: function () {
      var r = this.st.stack === 1 && this.st.closed === 0 ? this.breakStack(this.st) : this.tipCup(this.st);
      if (!r) return;
      var broke = (this.st.stack === 1 && this.st.closed === 0);
      this.st = r.st;
      this._snd(GEO.SND_OPEN);
      this.api.announce(broke ? this.api.t('saidBroke') : this.api.t('saidTipped'));
      this._paint();
    },

    /* ================= pointer ======================================
       ⚠ THE COMMIT LIVES ON window, NEVER ON THE TARGET. The preview
       repaint replaces the node under the finger, so a click bound to
       that node never fires (#46). It also lets a child slide off the
       mat and CANCEL — which is the undo, and the reason a generic Undo
       control is refused.
       ⚠ NO DRAG AT ALL IN v1: dead to keyboard, AT and the liveness
       gate; a palm-rejection lottery on a whiteboard; and a dropped
       drag is indistinguishable from a scoop that yielded nothing. */
    _bindPointer: function () {
      var self = this, arena = this._arena;
      if (!arena) return;
      arena.addEventListener('pointerdown', function (e) {
        var p = self._resolve(e.clientX, e.clientY);
        if (!p) return;
        self._down = true;
        self._aim(p.x, p.y);
        e.preventDefault();
      });
      arena.addEventListener('pointermove', function (e) {
        if (!self._down) return;
        var p = self._resolve(e.clientX, e.clientY);
        if (p) self._aim(p.x, p.y);
        /* ⚠ NOTHING IS ANNOUNCED ON MOVE. #47 recorded a hundred full
           sentences queued into the live region by one finger dragged
           across a shelf. ONE ANNOUNCEMENT PER COMMIT. */
      });
      window.addEventListener('pointerup', function (e) {
        if (!self._down) return;
        self._down = false;
        var p = self._resolve(e.clientX, e.clientY);
        if (!p || !self._preview) { self._preview = null; self._paint(); return; }
        self._doScoop(self._preview.cx, self._preview.cy);
      });
    },

    _resolve: function (clientX, clientY) {
      if (!this._arena) return null;
      var r = this._arena.getBoundingClientRect();
      if (!r.width) return null;
      var x = (clientX - r.left) / r.width * GEO.VB_W;
      var y = (clientY - r.top) / r.height * GEO.VB_H;
      if (y < GEO.MAT_Y || y > GEO.MAT_Y + GEO.MAT_H) return null;
      if (x < GEO.MAT_X || x > GEO.MAT_X + GEO.MAT_W) return null;
      return { x: x, y: y };
    },

    _aim: function (x, y) {
      var u = this.underMouth(this.st, x, y);
      this._preview = { cx: x, cy: y, take: u.take, left: u.left };
      this._paint();
    },

    /* ================= keyboard =====================================
       ⭐ THE CHILD DOES NOT ACT ON CHIPS. THE CHILD ACTS ON REGIONS.
       Hundreds of chips cannot be hundreds of tab stops, and they must
       not be one tab stop EACH either — a screen-reader user tabbing
       through chips is counting them one by one, which is the exact
       failure the research caution bans, arriving through the
       accessibility tree.
       A keyboard scoop takes what is under the mouth at the region
       centre: IDENTICAL physics, identical uncertainty, identical
       decision. That is parity, not a fallback. */
    _syncPads: function (st, d) {
      var pads = this._pads, api = this.api, self = this;
      if (!pads) return;
      var want = 9 + 1 + st.closed + st.stack;
      if (pads.childNodes.length !== want || this._padSig !== (st.closed + ':' + st.stack)) {
        while (pads.firstChild) pads.removeChild(pads.firstChild);
        this._padSig = st.closed + ':' + st.stack;
        var i;
        for (i = 0; i < 9; i++) (function (idx) {
          var b = api.el('button', 'ccp-pad ccp-pad-mat');
          b.type = 'button';
          b.style.left = (100 * (GEO.MAT_X + (idx % 3) * (GEO.MAT_W / 3)) / GEO.VB_W) + '%';
          b.style.top = (100 * (GEO.MAT_Y + Math.floor(idx / 3) * (GEO.MAT_H / 3)) / GEO.VB_H) + '%';
          b.style.width = (100 * (GEO.MAT_W / 3) / GEO.VB_W) + '%';
          b.style.height = (100 * (GEO.MAT_H / 3) / GEO.VB_H) + '%';
          b.setAttribute('data-i', String(idx));
          b.addEventListener('click', function () { self._padScoop(idx); });
          pads.appendChild(b);
        }(i));
        var rb = api.el('button', 'ccp-pad ccp-pad-rack');
        rb.type = 'button';
        rb.style.left = '2%'; rb.style.top = (100 * GEO.SHELF_Y / GEO.VB_H) + '%';
        rb.style.width = '96%'; rb.style.height = (100 * GEO.SHELF_H / GEO.VB_H) + '%';
        rb.addEventListener('click', function () { self._doTipCup(); });
        pads.appendChild(rb);

        /* ⚠⚠ THE OPEN CUP IS PART OF THE APPARATUS AND IT HAD NO LABEL.
           `cupOpen` was authored and REFERENCED NOWHERE — the #39
           dead-string defect, caught here by a source scan and
           independently by the Spanish panel, which noticed that the
           class can SEE how full the open cup is while a blind child
           was told only "the open cup".
           It is a describable part, not an action, so the pad is
           `aria-disabled` rather than `disabled`: it must be reachable
           and readable, and it must not pretend to be a control. */
        var ob = api.el('button', 'ccp-pad ccp-pad-cup');
        ob.type = 'button';
        ob.setAttribute('aria-disabled', 'true');
        pads.appendChild(ob);
      }
      var cupPad = pads.querySelector('.ccp-pad-cup');
      if (cupPad) {
        var cr2 = this._cupRect(st.band);
        cupPad.style.left = (100 * cr2.x / GEO.VB_W) + '%';
        cupPad.style.top = (100 * cr2.y / GEO.VB_H) + '%';
        cupPad.style.width = (100 * cr2.w / GEO.VB_W) + '%';
        cupPad.style.height = (100 * cr2.h / GEO.VB_H) + '%';
        cupPad.setAttribute('aria-label',
          api.t('cupOpen') + ' ' + this._fmt(api.t('saidRoom'), { n: CUP_HOLDS - st.open }));
      }
      /* ⚠ A PAD OVER EMPTIED GROUND IS disabled WITH A REQUIREMENT-
         STATING LABEL. pointer-events:none does NOT stop a keyboard. */
      for (var k = 0; k < 9; k++) {
        var pad = pads.childNodes[k];
        if (!pad || !pad.getAttribute) continue;
        var c = this._padAim(k, st);
        var u = c.empty ? { take: [] } : this.underMouth(st, c.x, c.y);
        var dead = u.take.length === 0;
        pad.disabled = dead;
        pad.setAttribute('aria-label', api.t(dead ? 'matPadEmpty' : 'matPad'));
      }
      var rack = pads.childNodes[9];
      if (rack && rack.setAttribute) {
        var none = (st.closed === 0 && st.stack === 0);
        rack.disabled = none;
        rack.setAttribute('aria-label', api.t(st.stack === 1 && st.closed === 0 ? 'stackLabel' : 'cupShut'));
      }
    },

    /* ⚠⚠ A KEYBOARD SCOOP AIMS AT THE CENTROID OF THE CHIPS ACTUALLY IN
       THAT REGION, NEVER AT THE REGION'S GEOMETRIC CENTRE.
       MEASURED: with geometric centres a full play-through STRANDS —
       the mouth is 4.8d across while a region is a third of the mat, so
       chips survive in the gaps between centres and the endgame becomes
       UNREACHABLE BY KEYBOARD FOREVER. A heap band stranded with 13
       chips still loose and ones stuck at 17; a spill band with 88.
       The child still makes the whole decision (WHICH REGION still has
       enough); within a region, aiming where the chips actually are is
       what a person does with a real scoop. Identical physics,
       identical uncertainty — parity, not a fallback.
       ⭐ AND THIS IS WHY THERE IS NO "SURVIVORS SLIDE TO THE CENTRE"
       RULE. That rearrangement was specified to rescue exactly this
       stranding; aiming properly removes the need, so the stronger
       invariant survives instead — MAT POSITIONS ARE ASSIGNED ONCE AND
       NEVER REWRITTEN. A heap that reshuffles itself is a heap that
       could be adding chips, and it would break conservation by
       perception even where the model held. */
    _padAim: function (idx, st) {
      st = this._st(st || this.st);
      var cx = GEO.MAT_X + (idx % 3) * (GEO.MAT_W / 3);
      var cy = GEO.MAT_Y + Math.floor(idx / 3) * (GEO.MAT_H / 3);
      var w = GEO.MAT_W / 3, h = GEO.MAT_H / 3;
      var mine = [], i, p;
      for (i = 0; i < st.mat.length; i++) {
        p = st.mat[i];
        if (p.x >= cx && p.x < cx + w && p.y >= cy && p.y < cy + h) mine.push(p);
      }
      if (!mine.length) return { x: cx + w / 2, y: cy + h / 2, empty: true };

      /* ⚠⚠ AIM AT THE THICKEST CHIP, NEVER AT A CENTROID.
         MEASURED, and the failure is self-inflicted: repeated
         centroid-aimed scoops eat the MIDDLE of a region and leave an
         ANNULUS — whose centroid is precisely the hole they just made.
         In a stranded spill every remaining chip in region 0 sat 99 to
         160 units from the centroid while the mouth reaches 96, in all
         nine regions at once. 44 of 120 play-throughs stranded.
         Aiming at an actual chip makes stranding STRUCTURALLY
         IMPOSSIBLE, because a mouth centred on a chip always catches at
         least that chip. It is also what a person does with a real
         scoop: put it where the chips are thickest. */
      var r = this.mouthRadius(st), r2 = r * r;
      var best = mine[0], bestN = -1, j, k, dx, dy;
      for (j = 0; j < mine.length; j++) {
        var n = 0;
        for (k = 0; k < st.mat.length; k++) {
          dx = st.mat[k].x - mine[j].x; dy = st.mat[k].y - mine[j].y;
          if (dx * dx + dy * dy <= r2) n++;
        }
        if (n > bestN) { bestN = n; best = mine[j]; }
      }
      return { x: best.x, y: best.y, empty: false };
    },

    _padScoop: function (idx) {
      var c = this._padAim(idx, this.st);
      this._doScoop(c.x, c.y);
    },

    _bindKeys: function () {
      var self = this;
      if (!this._pads) return;
      this._pads.addEventListener('keydown', function (e) {
        var t = e.target;
        if (!t || !t.classList || !t.classList.contains('ccp-pad-mat')) return;
        var i = parseInt(t.getAttribute('data-i'), 10);
        var next = i;
        if (e.key === 'ArrowLeft') next = (i % 3 === 0) ? i : i - 1;
        else if (e.key === 'ArrowRight') next = (i % 3 === 2) ? i : i + 1;
        else if (e.key === 'ArrowUp') next = (i < 3) ? i : i - 3;
        else if (e.key === 'ArrowDown') next = (i > 5) ? i : i + 3;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = 8;
        else if (e.key === 'Escape') { self._preview = null; self._paint(); return; }
        else return;
        e.preventDefault();
        var n = self._pads.childNodes[next];
        if (n && n.focus) n.focus();
      });
    },

    /* ================= sentences ====================================
       ⚠ ARIA SAYS EXACTLY WHAT THE READOUT SHOWS — NO MORE, NO LESS,
       and THE MAT NEVER CARRIES A COUNT, only a coarse density band,
       deliberately coarse so nobody can binary-search a total out of
       it. A blind child is never poorer and never richer than the
       class. */
    _fmt: function (s, vals) {
      return String(s).replace(/\{(\w+)\}/g, function (m, k) {
        return (vals && vals[k] != null) ? String(vals[k]) : m;
      });
    },

    _stateSentence: function (st) {
      var api = this.api, dg = this.digits(st);
      if (dg.settled) return this._doneSentence(st);
      var unk = api.t('readUnknown');
      return this._fmt(api.t('readState'), {
        h: dg.settled ? dg.h : unk, t: dg.t, o: unk, d: api.t(this.density(st))
      });
    },

    _doneSentence: function (st) {
      var dg = this.digits(st);
      return this._fmt(this.api.t('readDone'), { h: dg.h, t: dg.t, o: dg.o });
    },

    /* ================= chips sync ===================================
       ⚠ A disabled control STATES ITS REQUIREMENT — never a silent
       no-op, never hidden. Exactly four disabled labels exist. */
    _syncChips: function () {
      var api = this.api, st = this.st;
      var tip = this.canTipAll(st), add = this.canAdd(st), rem = this.canRemove(st);
      this._btnTip.disabled = !tip;
      this._btnTip.setAttribute('aria-label', api.t(tip ? 'tipAllBtn' : 'tipAllOff'));
      this._btnMore.disabled = !add;
      this._btnMore.setAttribute('aria-label', api.t(add ? 'moreBtn' : 'moreOff'));
      this._btnFewer.disabled = !rem;
      this._btnFewer.setAttribute('aria-label', api.t(rem ? 'fewerBtn' : 'fewerOff'));
      this._btnPrint.setAttribute('aria-label', api.t(this.premium ? 'printBtn' : 'printLocked'));
      this._btnPrint.className = 'ccp-btn ccp-b-print' + (this.premium ? ' is-paid' : '');
    },

    /* ================= the paywall ================================== */
    _showGate: function () {
      var api = this.api, self = this;
      if (this._gate) { this._gate.classList.add('is-on'); return; }
      var g = api.el('div', 'ccp-gate is-on');
      var box = api.el('div', 'ccp-gate-box');
      var h = api.el('h2', 'ccp-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'ccp-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'ccp-gate-cta');
      a.href = '/' + (api.lang || 'en') + '/pricing';
      a.textContent = api.t('gateCta');
      var c = api.el('button', 'ccp-gate-x');
      c.type = 'button';
      c.textContent = api.t('gateClose');
      c.addEventListener('click', function () { g.classList.remove('is-on'); });
      box.appendChild(h); box.appendChild(p); box.appendChild(a); box.appendChild(c);
      g.appendChild(box);
      this._wrap.appendChild(g);
      this._gate = g;
    },

    /* free-tier-locked by default, never optimistically unlocked */
    _checkEntitlement: function () {
      var self = this;
      try {
        if (typeof fetch !== 'function') return;
        fetch('/api/entitlement', { credentials: 'include' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j) return;
            var tier = j.tier || (j.entitlement && j.entitlement.tier);
            self.premium = tier && tier !== 'free';
            if (self._btnPrint) self._syncChips();
          })
          .catch(function () { /* offline degrades to the FREE TIER */ });
      } catch (e) { /* free tier */ }
    },

    /* ================= print ========================================
       ⭐ THE SHEET CARRIES THE SAME SCATTER, FROM THE SAME SEED, that
       the class just met. That is what a generic worksheet structurally
       cannot do, and it is why the sheet is worth money.
       ⚠ INK INVERTS: the screen fills, the paper OUTLINES. Measured,
       137 outlined chips are 0.71% coverage against 14.6% filled — the
       difference between a sheet a teacher prints all year and one they
       print once. */
    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      window.addEventListener('beforeprint', function () {
        if (self.premium) self._buildSheet();
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('ccp-printing');
      });
    },

    _buildSheet: function () {
      var st = this.st, api = this.api;
      var sheet = this._sheet;
      if (!sheet) return;
      while (sheet.firstChild) sheet.removeChild(sheet.firstChild);

      var h = api.el('h2', 'ccp-sheet-h'); h.textContent = api.t('sheetTitle');
      var n = api.el('p', 'ccp-sheet-note'); n.textContent = api.t('sheetNote');
      sheet.appendChild(h); sheet.appendChild(n);

      var svg = this._svg('svg', { viewBox: '0 0 1000 1220', class: 'ccp-sheet-svg' });

      /* ⚠ THE READOUT PRINTS EMPTY, AND THERE IS NO PRINTED "?". On
         paper there is nothing to refuse — the emptiness IS the
         refusal, and the child writes the digits. */
      for (var i = 0; i < 3; i++) {
        svg.appendChild(this._svg('rect', {
          x: GEO.SLOT_CX[i] - 44, y: 96, width: 88, height: 5, class: 'ccp-p-rule'
        }));
      }

      svg.appendChild(this._svg('rect', {
        x: GEO.MAT_X, y: GEO.MAT_Y, width: GEO.MAT_W, height: GEO.MAT_H,
        rx: 18, class: 'ccp-p-mat'
      }));

      var d = this.chipDiameter(st.band);
      var mat = this.scatter(st.n, st.band, st.seed);
      var ring = [];
      for (var k = 0; k < mat.length; k++) ring.push(this._disc(mat[k].x, mat[k].y, d * GEO.CHIP_OUTER));
      svg.appendChild(this._svg('path', { class: 'ccp-p-chip', d: ring.join('') }));

      /* a rank of TEN cups, ALL PRINTED OPEN — on paper every one is
         still to be filled — plus one empty stack outline. */
      var u = GEO.SHELF_U;
      var cupW = (GEO.CUP_IW + 2 * GEO.CUP_WALL) * u;
      var cupH = (GEO.CUP_IH + GEO.CUP_WALL + 0.30) * u;
      var top = GEO.SHELF_Y + GEO.SHELF_H - 24;
      var stackX = GEO.SHELF_MARGIN + (cupW * 1.06) / 2;
      svg.appendChild(this._svg('path', {
        d: this._cupPath(stackX, top - cupH * 1.675, u * 1.06, true), class: 'ccp-p-cup'
      }));
      var firstCup = GEO.SHELF_MARGIN + cupW * 1.06 + GEO.SHELF_DIV;
      for (var c = 0; c < 9; c++) {
        var cx = firstCup + c * (cupW + GEO.SHELF_GAP) + cupW / 2;
        svg.appendChild(this._svg('path', { d: this._cupPath(cx, top - cupH, u, false), class: 'ccp-p-cup' }));
        svg.appendChild(this._svg('ellipse', {
          cx: cx, cy: top - cupH, rx: cupW / 2, ry: (cupW / 2) * GEO.CUP_RIM_RY, class: 'ccp-p-cup'
        }));
      }

      sheet.appendChild(svg);
      document.body.classList.add('ccp-printing');
    }
  };

  /* ================= CSS ==========================================
     ELEVEN HEX VALUES, TWO HUES (teal 171deg, coral 16deg).
     ⭐ SO NO COLOUR IS AVAILABLE TO ENCODE CORRECTNESS EVEN BY
     ACCIDENT: there is no green and no red in the palette, and nothing
     in this tool is right or wrong.
     ⚠ #2A2A35 ink is 2.22:1 on teal, so INK NEVER APPEARS ON TEAL.
     ⚠ Coral is 2.33:1 on the mat and must never carry a fine mark
     alone — it is a FILLED AREA whose #A34122 ring does the 5.28:1
     separation. That ring is not a twelfth colour: hue 14.4deg against
     coral's 16.2deg, L* 13.7% darker. It is the coral's own shadow, the
     same relationship #0D4E44 has to #146B5E. A red would be available
     to mean WRONG; this is not one.                                    */
  function injectCSS() {
    if (document.querySelector('style[data-ccp]')) return;
    var css = ''
      /* ⚠ TWO RULES, NEVER `html,body.ccp-scroll{...}` — that is a
         selector LIST whose html half applies unconditionally, which
         makes the class decorative and its mutation unkillable (#22). */
      + 'html.ccp-scroll{overflow-y:auto;height:auto;min-height:100%;}'
      + 'body.ccp-scroll{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}'

      + '.ccp-wrap{display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.ccp-card{width:100%;max-width:560px;background:#FBF3E4;border:1.5px solid #E7DCC8;'
      + 'border-radius:18px;padding:10px 10px 8px;box-sizing:border-box;'
      + 'box-shadow:0 1px 0 #E7DCC8,0 10px 24px rgba(20,107,94,.10);}'

      /* ⚠ WIDTH-CAPPED INSIDE HEIGHT QUERIES. Never a max-height on an
         aspect-ratio box — that letterboxes the SVG while the
         %-positioned pads stay bound to the box (#43). */
      + '.ccp-arena{position:relative;width:100%;max-width:540px;margin:0 auto;'
      + 'aspect-ratio:1000/1220;}'
      + '@media (max-height:760px){.ccp-arena{max-width:460px;}}'
      + '@media (max-height:640px){.ccp-arena{max-width:380px;}}'
      + '@media (max-height:540px){.ccp-arena{max-width:300px;}}'
      + '.ccp-svg{display:block;width:100%;height:100%;overflow:visible;}'

      + '.ccp-mat-bed{fill:#F6EAD3;stroke:#E7DCC8;stroke-width:3;}'
      + '.ccp-ring{fill:#A34122;}'
      + '.ccp-body{fill:#F2784B;}'
      + '.ccp-sheen{fill:#FFFFFF;fill-opacity:.20;}'
      + '.ccp-mouth{fill:#F2784B;fill-opacity:.16;stroke:#A34122;stroke-width:4;}'

      + '.ccp-cup{fill:#FBF3E4;stroke:#146B5E;}'
      /* ⭐⭐ A CLOSED CUP IS FULL, AND AN EMPTY OUTLINE SAYS THE OPPOSITE.
         Found by reading the render: a shut cup and an open one were
         very nearly the same drawing, on a tool whose whole subject is
         closed containers versus loose ones. It now carries THE CHIPS'
         OWN TWO COLOURS, so the eye reads it as made of the same stuff
         as the loose ones — the conservation argument stated in paint,
         at no cost in new values.
         ⚠ Cups stand on the cream card, never on the teal plinth, so
         this is the chip's own 5.71:1 situation and NOT the forbidden
         bare-coral-on-teal. */
      + '.ccp-cup.is-shut{fill:#F2784B;stroke:#A34122;}'
      + '.ccp-cup.is-nested{fill:none;stroke:#A34122;}'
      + '.ccp-mouth-cup{fill:#146B5E;stroke:#0D4E44;}'
      + '.ccp-lid{fill:#FBF3E4;stroke:#146B5E;}'
      + '.ccp-plinth{fill:#146B5E;}'
      + '.ccp-plinth-edge{fill:#0D4E44;}'

      + '.ccp-digit{font-family:"Baloo 2",system-ui,sans-serif;}'
      + '.ccp-digit.is-open{fill:#7A6A55;font-weight:500;}'
      + '.ccp-digit.is-set{fill:#2A2A35;font-weight:700;}'
      + '.ccp-seat{fill:#2A2A35;}'

      /* invisible pads: the layer must not eat the pointer */
      + '.ccp-pads{position:absolute;inset:0;pointer-events:none;}'
      + '.ccp-pad{position:absolute;margin:0;padding:0;border:0;background:transparent;'
      + 'opacity:0;pointer-events:none;cursor:default;}'
      + '.ccp-pad:focus-visible{opacity:1;outline:3px solid #1E8FD4;outline-offset:-3px;'
      + 'background:rgba(30,143,212,.08);border-radius:8px;}'

      + '.ccp-ledge{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
      + 'gap:8px;margin-top:8px;}'
      + '.ccp-btn{display:inline-flex;align-items:center;justify-content:center;'
      + 'width:48px;height:48px;min-width:48px;border-radius:12px;border:1.5px solid #146B5E;'
      + 'background:#FBF3E4;color:#146B5E;cursor:pointer;padding:0;}'
      + '.ccp-btn svg{width:24px;height:24px;}'
      + '.ccp-btn:disabled{opacity:.38;cursor:default;}'
      + '.ccp-btn:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'
      + '.ccp-b-print{border-style:dashed;margin-left:10px;}'
      + '.ccp-b-print.is-paid{border-style:solid;}'

      + '.ccp-gate{position:absolute;inset:0;display:none;align-items:center;'
      + 'justify-content:center;background:rgba(42,42,53,.42);border-radius:18px;padding:12px;}'
      + '.ccp-gate.is-on{display:flex;}'
      + '.ccp-gate-box{background:#FBF3E4;border:1.5px solid #146B5E;border-radius:16px;'
      + 'padding:16px;max-width:340px;text-align:center;}'
      + '.ccp-gate-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;'
      + 'color:#146B5E;margin:0 0 6px;}'
      + '.ccp-gate-p{font-family:Nunito,system-ui,sans-serif;font-size:14px;'
      + 'color:#2A2A35;margin:0 0 12px;line-height:1.45;}'
      + '.ccp-gate-cta{display:inline-block;background:#146B5E;color:#FBF3E4;'
      + 'text-decoration:none;padding:10px 16px;border-radius:10px;'
      + 'font-family:Nunito,system-ui,sans-serif;font-weight:700;min-height:44px;'
      + 'box-sizing:border-box;}'
      + '.ccp-gate-x{display:block;margin:10px auto 0;background:none;border:0;'
      + 'color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:14px;'
      + 'cursor:pointer;min-height:44px;}'

      + '.ccp-sheet{display:none;}'

      /* ⚠ SCOPED TO A CLASS THE SHEET ITSELF ADDS. An unscoped
         @media print block prints a BLANK PAGE for everybody who
         presses Ctrl+P (#40, #41, #47). */
      + '@media print{'
      + 'body.ccp-printing *{visibility:hidden;}'
      + 'body.ccp-printing .ccp-sheet,body.ccp-printing .ccp-sheet *{visibility:visible;}'
      + 'body.ccp-printing .ccp-wrap{display:none !important;}'
      + 'body.ccp-printing .ccp-sheet{display:block !important;position:static;'
      + 'width:100%;margin:0;padding:0;}'
      + '.ccp-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;'
      + 'font-size:16pt;color:#000;}'
      + '.ccp-sheet-note{margin:0 0 4mm;font-family:Nunito,system-ui,sans-serif;'
      + 'font-size:9pt;color:#000;}'
      + '.ccp-sheet-svg{display:block;width:170mm;height:auto;margin:0 auto;}'
      /* INK INVERTS: the screen fills, the paper outlines. */
      + '.ccp-p-chip{fill:none;stroke:#000;stroke-width:4;}'
      + '.ccp-p-cup{fill:none;stroke:#000;stroke-width:6;}'
      + '.ccp-p-mat{fill:none;stroke:#000;stroke-width:4;}'
      + '.ccp-p-rule{fill:#000;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-ccp', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }

  if (typeof document !== 'undefined' && document.head) injectCSS();

  if (typeof window !== 'undefined') window.CountingCups = CountingCups;
  if (typeof module !== 'undefined' && module.exports) module.exports = CountingCups;
}());
