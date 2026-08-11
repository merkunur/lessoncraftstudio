/* =====================================================================
   TOOL #57 — THE SHAPE STRETCHER   (shape-stretcher.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v5 catalog, entry 13.

   THE PANE · THE SHAPE · THE TAGS. Three named parts, nothing else.
   (The kept copy is a STATE of THE SHAPE, not a fourth noun. ⚠ It is
   emphatically not a "twin": `folding-sheet` #35 owns THE TWIN.)

   THE ROUTINE:
     "Turn it. Spin it right round. Did anything come off?"   ... then:
     "Now make every tag hold at once. What have you got?"    ... and:
     "Break exactly one tag. Only one."

   ---------------------------------------------------------------------
   ALL THREE PANELS RULED AGAINST THIS TOOL. WHAT THEY CHANGED.
   ---------------------------------------------------------------------
   The fence said DO NOT BUILD, the pedagogy panel 3-0, and the art panel
   found the only remainder that survives. The operator's standing rule
   is that the objections go in the header and the tool ships — so every
   one of them below is binding, and two of them changed the machine.

   ⭐⭐ WHAT IS ACTUALLY UNOWNED — and it is sharper than the pitch.
      A TILT AND A SKEW LOOK ALIKE AND ARE NOT ALIKE. Both make a square
      lean; one costs nothing, the other destroys a defining property and
      hands you a different shape. Everything shipped DEALS a shape that
      is already transformed and asks the child to CLASSIFY it —
      `sort-bins` (1.G.A.1) in the pitch's own words, `pip-museum`
      (K.G.A.2) with tilted/tiny/stretched exhibits that spin upright,
      `curate-wing-core` computing equal-sides and right-angles on a live
      vertex array. NOT ONE lets the child PERFORM the transformation,
      and not one CROSSES a category boundary. This tool is the WHY
      behind the sort-bins grade.

   ⭐⭐ THE PEDAGOGY FINDING THAT CHANGED THE MACHINE — Christie & Gentner
      (2010), ages 3-4, the closest direct test that exists: SEQUENTIAL
      presentation of two exemplars taught NO BETTER than showing one
      (.13 vs .14, p = .37), while SIMULTANEOUS presentation of the SAME
      TWO gave eta-sq .30-.37. A memory probe found 98% recall — "the
      problem appears to be a failure to compare." A morph is a SEQUENCE.
      So this tool would have replaced the format that works with the one
      that tested no better than nothing.
      ⭐ THE ANSWER, AND IT IS THE BEST THING IN THE BUILD: the pane
      holds TWO shapes at once — the one under your hand and the one you
      KEPT. The child sets a shape, keeps it, then moves the other, and
      the two sit side by side. The sequence becomes a simultaneous
      array, which is the format with the effect size.

   ⚠⚠ THE PITCH'S THREE VERBS WERE AIMED AT THE WRONG ATTRIBUTE.
      Hannibal & Clements rank what actually drives misclassification:
      SKEWNESS > ASPECT RATIO > ORIENTATION. Tilt and spin hit the
      WEAKEST driver, and the tilted square — the entry's whole emotional
      hook — is the least important one. So THETA (the included angle,
      i.e. the skew) is the PRIMARY track here and tilt is the control
      that demonstrably does nothing. The pitch had it backwards.

   ⚠ CLAIMS STRUCK FROM ALL COPY, EVERY LOCALE:
      - "research says canonical exemplars CAUSE the misconception" —
        Verdine et al. 2019: "We know of no data to support this
        suggestion." It is a co-occurrence, not a cause.
      - "documented from age 3" — it is documented from 30 MONTHS, i.e.
        BEFORE SCHOOLING. The teacher did not cause it, and no copy may
        imply a teacher did.
      - "every K-3 tool shows canonical upright shapes" — FALSIFIED BY
        OUR OWN `pip-museum` AND `sort-bins`. ⭐ And per
        `sorting-hoops.js:22-26`, which retracted its own header claim as
        unverifiable: state a gap as what the REPO contains, never as
        what the world contains.

   ⚠ THE POP IS THE PANELS' SHARPEST OBJECTION AND IT IS ANSWERED BY
      SYMMETRY, NOT BY ASSERTION. Fisher et al.: unmediated
      manipulation-with-feedback is behaviourally the FREE-PLAY arm
      (10-22% acceptance) against guided play (67-77%, eta-p-sq .41), so
      an automated verdict fails gate 5 as well as gate 4. The answer is
      that a tag reports a PROPERTY, never a performance, and it is
      exactly as loud coming back as it was going: T_POP === T_SEAT,
      SND_POP === SND_SEAT, equal travel, one colour throughout. A
      verdict is asymmetric by nature — you are told you are wrong and
      never told you are right by the identical mechanism. ⚠ And the
      temptation to make the pop the more exciting animation IS the
      verdict, delivered by production values instead of by hue.
      ⚠⚠ AND FOR ONE VERSION THAT ANSWER WAS UNRENDERED, WHICH IS WORSE
      THAN NOT ANSWERING. There was no `transition`, no `animation` and
      no `@keyframes` in the file; `--shp-dur` was written on every paint
      and read by NO CSS RULE. So "equal travel" was two instants, and
      `T_POP === T_SEAT` passed its gate because BOTH SIDES WERE ZERO —
      an equality between two nothings, certifying a law that was never
      performed. A comment was then added asserting the travel "comes
      back from the announcement, and that is the only reason T_POP and
      T_SEAT are load-bearing"; it was false when written and is deleted.
      ⭐ THE STANDING RULE THIS BOUGHT: a constant reaching a CALL SITE
      is not the same as a constant reaching the SCREEN, and a source
      scan cannot tell them apart. Whatever the symmetry law is, it must
      be measured on the RENDERED element — `scripts/_shp-symmetry.js`
      reads the two keyframe sets off the live DOM and asserts they are
      reverses of one another in offset, angle, duration and colour.

   ---------------------------------------------------------------------
   THREE INVENTIONS
   ---------------------------------------------------------------------
   1. ⭐⭐ THE DIAL HAS NO NOTCHES, AND THAT IS A THEOREM. The detent set
      on a control is exactly the set of values at which crossing flips a
      tag. `rot` appears in no predicate, so for the dial that set is
      EMPTY — and the apparatus therefore says, in its own furniture and
      before anyone touches it, that this knob changes nothing about
      identity. ⚠ A home notch at rot=0 would assert that upright is
      special, which is the misconception itself; its absence is gated.

   2. ⭐⭐ "TILT ANYTHING AND NOTHING POPS" IS STRUCTURAL, NOT LUCKY.
      `tags(form)` takes FORM = {n,k,theta}; POSE = {rot} is an input to
      the RENDERER AND NOTHING ELSE. The gate parses the function source
      and asserts the identifier `rot` does not occur in it, then
      evaluates every form against every rotation. ⚠ With the mandatory
      non-vacuity control, because a `tags()` returning a constant passes
      the rotation half perfectly: the same gate must assert that
      crossing each detent DOES flip a tag.

   3. ⭐ EXACTLY TWO STATES IN THE WHOLE SPACE ARE 30-60-90 TRIANGLES.
      A base angle is exactly 90 iff cos(theta) = b/a, and the cosine of
      a whole number of degrees is rational only at 60/90/120. Solving
      gives a = 2b at theta = 60 — so k = +40 and k = -40, both
      reachable, and the little square appears in a corner the child was
      not touching.

   ---------------------------------------------------------------------
   THE REFUSE-LIST, BINDING
   ---------------------------------------------------------------------
   Nothing marked right or wrong. No colour encodes correctness — the tag
   is `#0E5147` from the first frame of a pop to the last, so the whole
   event is position and opacity and no hue can mean anything. No residue
   when a tag leaves: no empty socket, no "2 of 3 remaining" (a score
   wearing a fraction — `folding-sheet`'s own rule). No perimeter or area
   readout ever (v5 entry 15 owns conserved perimeter). No degree numeral
   and no hinge gesture (v5 entry 14 owns angle-as-turn). No count of
   corners rendered as a numeral. No timer, score or streak. No efficacy
   claim in any of the eleven landings.
   ⚠ NOUNS: `clasp` is TAKEN 21x AND INVERTED — `necklace-activity.js:88`
   ships `win: 'Clasp! The same many!'` and `bead-string-core.js:50`
   returns `{clasp: count === targetCount}`, so in this shelf's lexicon a
   clasp CLOSING is the success state. `bench` is taken 506x and is a
   sibling tool's NAME in sv/da/no. `twin` belongs to `folding-sheet`.

   CCSS: 1.G.A.1 is held by `sort-bins`; this is free-play (no `tasks`)
   so it emits no `educationalAlignment` and the collision is
   structurally impossible. The honest strand is defining attributes.
   It loads NO ART and NO AUDIO beyond the shell's own pop.
   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* the working pane is a square; the shape is fitted to a
       ROTATION-INVARIANT extent (circumradius), never to the bounding
       box, which would breathe as the shape turns */
    TARGET_R: 82,

    /* ⚠⚠ EVERY PARAMETER IS AN INTEGER, and that is what makes the drag
       legal. Drag-ONLY is banned, not the pointer — and the real failure
       mode is a CONTINUOUS REAL-VALUED parameter, because then the
       pointer and the keyboard address different state spaces and no
       gate can compare them. One integer ladder, three doors into it. */
    K_MAX: 82,          /* a = 120 + k, b = 120 - k; a === b exactly at 0 */
    TH_MIN: 18,
    TH_MAX: 162,
    TH_STEP: 2,
    ROT_STEP: 2,

    /* derived, not chosen: at k = 82 the drawn short side is 23.0px and
       the right-angle mark's 8px minimum leg is 35% of it — a 15.2%
       margin. k = 83 sits at 12.4% and is rejected on margin, not on
       arithmetic, which is the house rule. */
    MARK_MIN: 8,

    /* motion, ms. ⚠ Reduced motion COMPRESSES, never skips. ⚠ Every one
       of these reaches a call site — #55 shipped SEVEN dead constants
       past a gate written to catch exactly that, and #56 shipped THREE
       more under a comment forbidding it by name.
       ⚠⚠ AND "REACHES A CALL SITE" IS NOT "IS RENDERED". T_POP and
       T_SEAT were read, returned, and written into `--shp-dur` — which
       NO CSS RULE READ. There was no `transition`, no `animation` and no
       `@keyframes` anywhere in the file, so the equality T_POP ===
       T_SEAT held only because BOTH WERE INSTANTANEOUS, and a source
       scan for call sites cannot tell that apart from a rendered law.
       The travel is now real (`@keyframes shp-pop` / `shp-seat`, driven
       by `--shp-dur`) and it is measured on the rendered element by
       `scripts/_shp-symmetry.js`, not inferred from these two numbers. */
    T_POP: 260,
    /* ⚠⚠ TWO CONSTANTS WITH AN EQUALITY ASSERTION, NOT ONE SHARED
       CONSTANT. One constant would make the no-verdict law unstatable;
       two make it FALSIFIABLE if someone later differentiates them. */
    T_SEAT: 260,
    T_DETENT: 90,
    T_DEAL: 420,
    T_TURN: 320,
    T_REFUSE: 200,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_DETENT: 720,
    SND_POP: 430,
    SND_SEAT: 430,      /* ⚠ gate asserts SND_POP === SND_SEAT */
    SND_DEAL: 560,
    SND_REFUSE: 300,
    /* ⚠ T_, NOT SND_. Every other SND_* is a FREQUENCY and this one is
       MILLISECONDS. `pair-gate.js:126` still ships that defect. */
    T_SND_DEBOUNCE: 160,

    /* the dial says one sentence and it is the same sentence at every
       rung, so a drag across 180 rungs must not say it 180 times */
    T_SAY_THROTTLE: 700,

    /* ⭐ THE POP AND THE SEAT ARE ONE GESTURE PLAYED IN TWO DIRECTIONS:
       the same distance along the tag's own OUTWARD normal and the same
       rotation out of alignment, for the same length of time, in the
       same colour. Two numbers, read by both keyframes. */
    FX_PUSH: 14,
    FX_TURN: 14
  };

  var ShapeStretcher = {

    id: 'shape-stretcher',

    /* ⚠ EVERY SIBLING EXPOSES ITS CONSTANTS (doubling-mirror.js:679).
       Without this a model gate must eval them out of the source text,
       and a gate that reconstructs what it is checking is testing a copy
       (#44). Its absence is an assertion, not an inconvenience. */
    GEO: GEO,

    strings: {
      title: { en: "The Shape Stretcher", de: "Der Formenzieher", fr: "L’Étire-forme", es: "La figura de goma", pt: "A Figura que Entorta", it: "Allunga e inclina la figura", nl: "De vormrekker", sv: "Figursträckaren", da: "Stadig den samme figur?", no: "Figuren som blir skjev", fi: "Muodonmuuttaja" },
      /* ⚠⚠ MEASURED, NOT ASSUMED: OVER 400,000 DEALS AGAINST THE REAL
         SAMPLER, P(ANY TAG AT OPEN) = 1.99% AT n=4 AND 1.43% AT n=3.
         (`equal` needs k = 0, one rung of 165; `right` needs theta = 90,
         one rung of 73.) So the first version — "watch the tags ... see
         which tag lets go" — described a state the child sees on one
         mount in fifty, and the routine's first step was vacuous on
         first contact.
         ⭐ THE FIX IS THE COPY, NOT THE SAMPLER, and it is the ten
         native panels' own ruling: every one of them REBUILT rather
         than translated this string and `saidDealt` for exactly this
         reason ("the English is false in states the model actually
         reaches"). Biasing the deal toward a tag would also have made
         the ARRIVAL of a tag — the thing a child produces by stretching
         to k = 0 — the boring half of the tool, and would have put a
         thumb on which shapes are worth dealing. Both sentences are now
         true of an opening with no tag on it AND of one with two. */
      instruction: { en: "Turn the shape as far as you like — nothing lets go. Then stretch it, or lean it, and watch a tag arrive or leave. Keep a shape beside the one in your hand and you can hold both at once.", de: "Dreht die Form, so weit ihr wollt, und schaut dabei genau hin. Zieht sie dann in die Länge oder neigt sie: Jetzt kann ein Etikett abfallen — oder wieder halten. Lasst eine Form daneben stehen, dann habt ihr beide zugleich vor Augen.", fr: "Étirez la forme ou penchez-la jusqu’à ce qu’un témoin tienne. Tournez-la ensuite autant que vous voulez : aucun témoin ne s’en va. Gardez une forme à côté sur la vitre, et vous en avez deux sous les yeux en même temps.", es: "Gira la figura todo lo que quieras y mira si se le cae algo. Después estírala o inclínala: verás qué marca se suelta y cuál vuelve a su sitio. Deja una figura al lado de la que tienes en la mano y podrás mirar las dos a la vez.", pt: "Gire a figura o quanto quiser: nenhuma marquinha aparece nem some. Agora vá alongando ou entortando até fazer uma marquinha aparecer — e descubra o que faz ela soltar. Deixe uma figura parada ao lado e dá para olhar as duas ao mesmo tempo.", it: "Gira la figura quanto vuoi: non se ne va niente. Allungala o inclinala finché non compare una targhetta, poi girala ancora e guarda che cosa succede. Tieni una figura da parte, accanto a quella che hai in mano, e le vedi tutte e due insieme.", nl: "Draai de vorm zo ver je wilt: aan de labels verandert er niets. Rek aan de zijden, of trek hem scheef, en kijk wat de labels dan doen. Zet er een vorm naast en je hebt ze allebei tegelijk in beeld.", sv: "Snurra figuren hur mycket ni vill — ingenting lossnar. Sträck den sedan, eller vinkla den, och se vilken markering som lossnar. Låt en figur stå kvar bredvid den ni håller på med, så syns båda samtidigt.", da: "Drej figuren, så meget I vil — drejningen laver ingenting om. Gør så figurens sider lange og korte, eller læn figuren, indtil der kommer en markering. Bliv ved, til den slipper igen. Lad en figur blive stående ved siden af, så I kan se to på én gang.", no: "Drei figuren så mye du vil, og følg med på merkene. Strekk den, eller gjør den skjev, og se hvilket merke som slipper — og hva som skal til for å få det tilbake. Behold én figur på flata, så står to ved siden av hverandre og dere kan se på begge samtidig.", fi: "Kierrä muotoa niin paljon kuin haluat: muoto pysyy samana. Litistä tai vinouta sitä, niin näet, milloin lipuke irtoaa ja milloin se tulee takaisin. Jätä yksi muoto viereen, niin näet kaksi kerralla." },

      /* the three tracks */
      lenLabel: { en: "Stretch", de: "Ziehen", fr: "Étirer", es: "Estirar", pt: "Alongar", it: "Allunga", nl: "Rekken", sv: "Sträck", da: "Lang og kort", no: "Strekk", fi: "Litistä" },
      skewLabel: { en: "Lean", de: "Neigen", fr: "Pencher", es: "Inclinar", pt: "Entortar", it: "Inclina", nl: "Scheeftrekken", sv: "Vinkla", da: "Læn", no: "Skjev", fi: "Vinouta" },
      turnLabel: { en: "Turn", de: "Drehen", fr: "Tourner", es: "Girar", pt: "Girar", it: "Gira", nl: "Draaien", sv: "Snurra", da: "Drej", no: "Drei", fi: "Kierrä" },

      /* controls */
      keep: { en: "Keep this one beside it", de: "Diese Form daneben stehen lassen", fr: "Garder celle-ci à côté", es: "Dejar esta al lado", pt: "Deixar esta ao lado", it: "Tieni questa da parte", nl: "Deze laten staan", sv: "Låt den här stå kvar bredvid", da: "Lad denne blive stående", no: "Behold denne på flata", fi: "Jätä tämä viereen" },
      drop: { en: "Put the kept one away", de: "Die Form daneben wegnehmen", fr: "Ranger la forme gardée", es: "Quitar la de al lado", pt: "Tirar a que ficou", it: "Rimetti a posto quella tenuta da parte", nl: "De vorm ernaast weghalen", sv: "Ta bort den som står kvar", da: "Fjern figuren ved siden af", no: "Ta bort den du beholdt", fi: "Ota jätetty muoto pois" },
      deal: { en: "Start from a different shape", de: "Mit einer anderen Form anfangen", fr: "Partir d’une autre forme", es: "Empezar con otra figura", pt: "Começar de outra figura", it: "Comincia da un'altra figura", nl: "Begin met een andere vorm", sv: "Börja med en annan figur", da: "Begynd med en ny figur", no: "Hent en helt ny figur", fi: "Aloita toisesta muodosta" },
      quarter: { en: "Quarter turn", de: "Vierteldrehung", fr: "Un quart de tour", es: "Un cuarto de vuelta", pt: "Um quarto de volta", it: "Un quarto di giro", nl: "Een kwartslag draaien", sv: "Snurra ett kvarts varv", da: "Kvart omgang", no: "Kvart runde", fi: "Neljänneskierros" },
      print: { en: "Print the sheet", de: "Das Blatt drucken", fr: "Imprimer la fiche", es: "Imprimir la hoja", pt: "Imprimir a folha", it: "Stampa la scheda", nl: "Het blad afdrukken", sv: "Skriv ut arbetsbladet", da: "Udskriv", no: "Skriv ut arket", fi: "Tulosta arkki" },

      /* aria — nothing on the canvas is a tap target, so these carry it */
      /* ⚠ NO DEGREE NUMERAL — this file's own refuse-list, line 120,
         and the numeral was meaningless anyway because `rot` enters no
         predicate. Found by the Swedish panel reading the model. */
      ariaShape3: { en: "A three-sided shape.", de: "Ein Dreieck auf der Platte.", fr: "Une forme à trois côtés.", es: "Figura de tres lados.", pt: "Uma figura de três lados.", it: "Una figura con tre lati.", nl: "Een vorm met drie zijden.", sv: "En figur med tre sidor.", da: "En figur med tre sider.", no: "En figur med tre sider.", fi: "Muoto, jossa on kolme sivua." },
      ariaShape4: { en: "A four-sided shape.", de: "Ein Viereck auf der Platte.", fr: "Une forme à quatre côtés.", es: "Figura de cuatro lados.", pt: "Uma figura de quatro lados.", it: "Una figura con quattro lati.", nl: "Een vorm met vier zijden.", sv: "En figur med fyra sidor.", da: "En figur med fire sider.", no: "En figur med fire sider.", fi: "Muoto, jossa on neljä sivua." },
      /* ⚠⚠ ONE SYSTEM, NOT TWO. `sayTagsRight` was moved to "the shape
         is right-angled" while this string still said "square corners",
         so the SAME tag was described two ways depending on whether the
         other tag happened to be holding — and the only channel that can
         hear it is the one with no picture to reconcile them against.
         ⚠ `sayTagsBoth` is reachable ONLY at n = 4: at n = 3 `equal`
         needs k = 0 AND theta = 60 while `right` needs theta = 90 or
         k = ±40, which are mutually exclusive. So Both is always the
         square — but it is still named by its PROPERTY, uncounted, for
         the same reason the plural was struck below. */
      sayTagsBoth: { en: "Both tags are holding: every side the same length, and the shape is right-angled.", de: "Beide Etiketten halten: alle Seiten sind gleich lang, und die Form ist rechtwinklig.", fr: "Les deux témoins tiennent : tous les côtés ont la même longueur, et l’angle droit est marqué.", es: "Están puestas las dos marcas: la de lados iguales y la de ángulo recto.", pt: "As duas marquinhas estão segurando: todos os lados do mesmo tamanho e ângulo reto.", it: "Ci sono tutte e due le targhette: lati tutti uguali e angolo retto.", nl: "Beide labels houden vast: alle zijden even lang, en de vorm is haaks.", sv: "Båda markeringarna sitter kvar: alla sidor lika långa, och figuren är rätvinklig.", da: "Begge markeringer sidder: alle sider er lige lange, og figuren er retvinklet.", no: "Begge merkene holder: alle sidene er like lange, og det er rett vinkel i figuren.", fi: "Molemmat lipukkeet pitävät: kaikki sivut ovat yhtä pitkät ja muoto on suorakulmainen." },
      sayTagsEqual: { en: "One tag is holding: every side the same length.", de: "Ein Etikett hält: alle Seiten sind gleich lang.", fr: "Un témoin tient : tous les côtés ont la même longueur.", es: "Está puesta la marca de lados iguales.", pt: "Uma marquinha está segurando: todos os lados do mesmo tamanho.", it: "C'è una targhetta: lati tutti uguali.", nl: "Eén label houdt vast: alle zijden zijn even lang.", sv: "En markering sitter kvar: alla sidor lika långa.", da: "Én markering sidder: alle sider er lige lange.", no: "Ett merke holder: alle sidene er like lange.", fi: "Yksi lipuke pitää: kaikki sivut ovat yhtä pitkät." },
      /* ⚠ was "square cornerS" — the reachable counts are exactly 1
         (n=3) and exactly 4 (n=4), so the plural was false half the
         time. Name the property, never count the corners. */
      sayTagsRight: { en: "One tag is holding: the shape is right-angled.", de: "Ein Etikett hält: die Form ist rechtwinklig.", fr: "Un témoin tient : l’angle droit est marqué.", es: "Está puesta la marca de ángulo recto.", pt: "Uma marquinha está segurando: a figura tem ângulo reto.", it: "C'è una targhetta: angolo retto.", nl: "Eén label houdt vast: de vorm is haaks.", sv: "En markering sitter kvar: figuren är rätvinklig.", da: "Én markering sidder: figuren er retvinklet.", no: "Ett merke holder: det er rett vinkel i figuren.", fi: "Yksi lipuke pitää: muoto on suorakulmainen." },
      sayTagsNone: { en: "No tags are holding.", de: "Kein Etikett hält.", fr: "Aucun témoin ne tient.", es: "No hay ninguna marca puesta.", pt: "Nenhuma marquinha está segurando.", it: "Non c'è nessuna targhetta.", nl: "Geen enkel label houdt vast.", sv: "Ingen markering sitter kvar.", da: "Ingen markeringer sidder.", no: "Ingen av merkene holder nå.", fi: "Kumpikaan lipuke ei pidä." },
      ariaKept: { en: "A kept shape stands beside it for comparison.", de: "Eine zweite Form steht zum Vergleich daneben.", fr: "Une forme gardée est posée à côté, pour comparer.", es: "A la izquierda hay otra figura, guardada para comparar.", pt: "Uma figura ficou ao lado, para comparar.", it: "Accanto c'è la figura che hai tenuto da parte.", nl: "Er staat een vorm naast om mee te vergelijken.", sv: "En figur står kvar bredvid för jämförelse.", da: "Der står en figur ved siden af, så de to kan sammenlignes.", no: "En figur du har beholdt, står ved siden av til sammenligning.", fi: "Vieressä on jätetty muoto vertailua varten." },

      /* said aloud — a property, never a performance */
      saidPop: { en: "A tag let go.", de: "Ein Etikett hält nicht mehr.", fr: "Un témoin s’en va.", es: "Se soltó una marca.", pt: "Uma marquinha soltou.", it: "Una targhetta si è staccata.", nl: "Er laat een label los.", sv: "En markering lossnade.", da: "En markering slap.", no: "Et merke slapp.", fi: "Lipuke irtosi." },
      saidSeat: { en: "A tag went back on.", de: "Ein Etikett hält wieder.", fr: "Un témoin revient.", es: "Se volvió a poner una marca.", pt: "Uma marquinha voltou.", it: "Una targhetta è tornata.", nl: "Er zit weer een label op.", sv: "En markering kom tillbaka.", da: "En markering kom på.", no: "Et merke kom tilbake.", fi: "Lipuke tuli takaisin." },
      saidTurn: { en: "Turned. Nothing let go.", de: "Gedreht. Daran ändert sich nichts.", fr: "Un quart de tour : rien ne change pour les témoins.", es: "Giró. No se soltó nada.", pt: "Girou. Nada soltou.", it: "Hai girato la figura. Non si è staccato niente.", nl: "Gedraaid. De labels blijven zoals ze waren.", sv: "Figuren har snurrat. Ingenting lossnade.", da: "Drejet. Ingenting slap.", no: "Dreid. Ingenting slapp.", fi: "Kierretty. Mikään ei irronnut." },
      saidKept: { en: "Kept. Now move the other one and hold them side by side.", de: "Sie steht jetzt daneben. Bewegt nun die andere — dann seht ihr beide nebeneinander.", fr: "Gardée. Bougez l’autre, et regardez-les toutes les deux en même temps.", es: "Ya está al lado. Ahora mueve la que sigue en tu mano y compáralas.", pt: "Ficou uma ao lado. Agora mexa na outra e olhe as duas juntas.", it: "Tenuta da parte. Adesso muovi l'altra e le guardi tutte e due insieme.", nl: "Deze staat er nu naast. Beweeg de andere, dan zie je ze allebei.", sv: "Den står kvar bredvid. Flytta den andra nu, så syns båda samtidigt.", da: "Den ene figur bliver stående. Bliv ved med at flytte den anden, så I kan se dem ved siden af hinanden.", no: "Beholdt. Nå kan du endre den ene og sammenligne med den du beholdt.", fi: "Jätetty viereen. Liikuta nyt tätä muotoa, niin näet kaksi vierekkäin." },
      saidNoKeep: { en: "There is already one kept beside it.", de: "Es steht schon eine zweite Form daneben.", fr: "Il y en a déjà une gardée à côté.", es: "Ya hay una figura al lado.", pt: "Já tem uma figura ao lado.", it: "Ce n'è già una tenuta da parte.", nl: "Er staat er al een naast.", sv: "Det står redan en figur kvar bredvid.", da: "Der står allerede en figur ved siden af.", no: "Du har allerede beholdt en figur.", fi: "Vieressä on jo yksi jätetty muoto." },
      /* ⚠ SAME MEASUREMENT AS `instruction` ABOVE: a dealt shape carries
         a tag on ~1 mount in 50, so "watch what comes off as you turn"
         would be hollow. It arrives already turned (never within 22° of
         a canonical pose), and turning it further is safe by theorem —
         which is true whether or not anything is holding.
         ⚠ It also may NOT report the kept shape being swept away,
         because as of this pass NOTHING is swept away: `_deal` carries
         the kept shape across. One key, one true sentence. */
      saidDealt: { en: "A different shape. It arrives already turned — turn it further and nothing lets go.", de: "Eine andere Form. Sie steht schon gedreht auf der Platte.", fr: "Une autre forme. Faites d’abord tenir un témoin, puis tournez-la.", es: "Otra figura. Gírala antes de estirarla.", pt: "Outra figura. Gire primeiro e veja que nada solta.", it: "Un'altra figura. Allungala o inclinala finché non compare una targhetta.", nl: "Een nieuwe vorm. Draai hem eerst eens rond.", sv: "En annan figur. Snurra den först och se om något ändras.", da: "En ny figur. Prøv at dreje den først.", no: "En helt ny figur på flata.", fi: "Toinen muoto. Kierrä sitä ensin, litistä vasta sitten." },

      /* settings */
      sidesLabel: { en: "How many sides", de: "Wie viele Seiten", fr: "Combien de côtés", es: "Número de lados", pt: "Quantos lados", it: "Quanti lati", nl: "Hoeveel zijden", sv: "Hur många sidor", da: "Trekant eller firkant", no: "Hvor mange sider", fi: "Montako sivua" },
      sidesFour: { en: "four sides", de: "vier Seiten", fr: "quatre côtés", es: "cuatro lados", pt: "quatro lados", it: "quattro lati", nl: "vier zijden", sv: "fyra sidor", da: "firkant", no: "fire sider", fi: "neljä sivua" },
      sidesThree: { en: "three sides", de: "drei Seiten", fr: "trois côtés", es: "tres lados", pt: "três lados", it: "tre lati", nl: "drie zijden", sv: "tre sidor", da: "trekant", no: "tre sider", fi: "kolme sivua" },

      /* paid sheet */
      /* ⚠ THE SHEET CARRIES THE PANE, WHICH HOLDS ONE SHAPE OR TWO —
         never six. "The shapeS as the class left them" was false on the
         default mount, and "on each line, one shape the class made"
         promised six shapes over six blank lines the sheet does not
         draw. Both now describe what the paper actually has on it. */
      sheetTitle: { en: "The pane as the class left it, and room to write", de: "Was die Klasse auf der Platte stehen ließ — und Platz zum Schreiben.", fr: "La vitre telle que la classe l’a laissée, et de quoi écrire", es: "Lo que la clase dejó en la lámina, y espacio para escribir", pt: "O painel do jeito que a turma deixou, e espaço para escrever", it: "Quello che la classe ha lasciato nel riquadro, e lo spazio per scrivere", nl: "Wat er op het paneel stond, en ruimte om te schrijven", sv: "Så såg det ut när klassen slutade, och plats att skriva", da: "Sådan så det ud, da klassen gik — og plads til at skrive", no: "Slik så flata ut da klassen var ferdig, og plass til å skrive", fi: "Mitä luokka jätti pinnalle — ja tilaa kirjoittaa" },
      sheetHint: { en: "On the lines: what the class could say about the shape above, and what stayed true when they turned it.", de: "In jede Zeile: was sich über die Form sagen lässt.", fr: "Sur chaque ligne, ce qu’on peut dire de la forme.", es: "En cada línea, lo que pudieron decir de la figura.", pt: "Escreva aqui o que dá para dizer sobre a figura que ficou no painel.", it: "Su ogni riga, che cosa si può dire della figura.", nl: "Op elke regel: wat je over de vorm kunt zeggen.", sv: "På varje rad: vad man kan säga om figuren.", da: "Skriv på linjerne, hvad I kunne sige om det, I ser.", no: "Skriv én ting dere kan si om figuren på hver linje.", fi: "Yhdelle riville yksi asia, jonka luokka voi sanoa muodosta." },
      lockedTitle: { en: "The sheet is part of a Teacher plan", de: "Das Blatt gehört zum Lehrkraft-Abo", fr: "La fiche fait partie de l’abonnement Enseignant", es: "La hoja es parte del plan Docente", pt: "A folha faz parte do plano Professor", it: "La scheda da stampare fa parte del piano Insegnante", nl: "Het blad hoort bij het Leerkracht-abonnement", sv: "Arbetsbladet ingår i Lärarplanen", da: "Udskriften er en del af Lærerabonnementet", no: "Arket hører til Lærerabonnementet", fi: "Arkki kuuluu Opettajatilaukseen" },
      lockedBody: { en: "The whole apparatus is free — every shape, all three tracks, the tags and the kept shape. A Teacher plan adds the printed sheet, which carries the pane as the class left it and ruled lines to write on.", de: "Der ganze Formenzieher ist kostenlos — jede Form, das Ziehen, das Neigen und das Drehen, die Etiketten und die zweite Form daneben. Mit dem Lehrkraft-Abo kommt das Blatt zum Ausdrucken dazu: Darauf steht, was die Klasse auf der Platte stehen ließ, dazu Linien zum Schreiben.", fr: "Tout l’appareil est gratuit : chaque forme, les trois mouvements, les témoins et la forme gardée. L’abonnement Enseignant ajoute la fiche imprimée, qui reprend la vitre telle que la classe l’a laissée, avec des lignes pour écrire.", es: "Todo el aparato es gratis: cualquier figura, estirarla, inclinarla y girarla, las marcas y la figura que dejas al lado. El plan Docente añade la hoja impresa, con lo que la clase dejó en la lámina y líneas para escribir.", pt: "Aqui tudo é grátis — todas as figuras, girar, alongar e entortar, as marquinhas e a figura que fica ao lado. O plano Professor traz ainda a folha impressa, que leva o painel do jeito que a turma deixou e linhas pautadas para escrever.", it: "Lo strumento è gratuito tutto intero: ogni figura, allungare, inclinare e girare, le targhette e la figura tenuta da parte. Con il piano Insegnante c'è anche la scheda da stampare, con quello che la classe ha lasciato nel riquadro e le righe per scrivere.", nl: "Het hele apparaat is gratis: elke vorm, alle drie de banen, de labels en de vorm die ernaast staat. Met het Leerkracht-abonnement komt daar het blad bij om af te drukken, met wat er op het paneel stond en lijnen om op te schrijven.", sv: "Hela apparaten är gratis — alla figurer, alla tre reglagen, markeringarna och att låta en figur stå kvar bredvid. Lärarplanen lägger till arbetsbladet, som visar det klassen lämnade kvar i fönstret och linjer att skriva på.", da: "Hele apparatet er gratis — alle figurer, alt hvad I kan gøre ved dem, markeringerne og figuren, der bliver stående ved siden af. Lærerabonnementet giver desuden udskriften, som viser fladen, sådan som klassen forlod den, med linjer til at skrive på.", no: "Hele apparatet er gratis: figurene, alle tre — strekk, skjev og drei — merkene og figuren du beholder. Lærerabonnementet legger til arket til utskrift, med flata slik klassen forlot den og linjer å skrive på.", fi: "Koko väline on ilmainen: kaikki muodot, kaikki kolme säädintä, lipukkeet ja viereen jätetty muoto. Opettajatilaus lisää tulostettavan arkin, jossa näkyvät pinnalle jätetty muoto ja rivit kirjoittamista varten." },
      gateCta: { en: "See the Teacher plan", de: "Das Lehrkraft-Abo ansehen", fr: "Voir l’abonnement Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Scopri il piano Insegnante", nl: "Bekijk het Leerkracht-abonnement", sv: "Läs om Lärarplanen", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Tutustu Opettajatilaukseen" }
      /* ⚠ `gateClose: 'Not now'` was authored here and wired to nothing.
         The gate is an INLINE panel, not a modal — there is no overlay to
         dismiss and nothing a close control could close — so the string
         was a fossil carried in from a sibling's modal gate. Removed
         rather than given a button, because the button would be the
         invention. */
    },

    settings: [
      { key: 'sides', type: 'choice', labelKey: 'sidesLabel',
        options: [ { value: 'four', labelKey: 'sidesFour' }, { value: 'three', labelKey: 'sidesThree' } ] }
    ],

    defaults: { sides: 'four' },

    premium: false,

    /* ================= THE MODEL ===================================
       FORM = { n, k, theta }   integers. The ONLY input to a tag.
       POSE = { rot }           integer degrees. Input to NOTHING but
                                the renderer.
       ⚠ There is no epsilon anywhere in this model. Compare
       `curate-wing-core.js:127`, which must classify with ratio < 1.13
       and |angle - 90| < 10 because it reads coordinates. This one never
       touches a coordinate. */

    sideA: function (f) { return 120 + f.k; },
    sideB: function (f) { return 120 - f.k; },

    /* ⭐ exact integer comparisons, both of them */
    sidesAllEqual: function (f) {
      if (f.n === 4) return f.k === 0;
      /* a triangle from SAS is equilateral iff the two given sides are
         equal AND the included angle is 60 */
      return f.k === 0 && f.theta === 60;
    },

    /* ⭐ a base angle is exactly 90 iff the cosine of theta is the ratio of
       the two given sides, and cos of a whole number of degrees is
       rational only at 60/90/120 — so the triangle's BASE right angle
       exists at exactly two states in the whole space, k = +40 and
       k = -40 with theta = 60.
       ⚠⚠ WHICH CORNER IS WHICH, AND IT SHIPPED SWAPPED. Vertices are
       v0 = (0,0), v1 = (a,0), v2 = b(cos th, sin th).
         at v1: (v0-v1)·(v2-v1) = a(a - b cos th) = 0  ->  cos th = a/b
                a/b = 1/2 needs a = 120+k SMALLER, i.e. k = -40.
         at v2: (v0-v2)·(v1-v2) = b(b - a cos th) = 0  ->  cos th = b/a
                b/a = 1/2 needs a LARGER, i.e. k = +40.
       The first version had these two the wrong way round, so at
       theta = 60, k = +40 the little square was drawn on the THIRTY
       degree corner. `anyCornerRight` unions over i and is identical
       either way, so the TAG was right and only the MARK was wrong —
       which is why nothing but a per-index re-derivation can see it. */
    cornerRight: function (f, i) {
      if (f.n === 4) return f.theta === 90;      /* all four, or none */
      if (i === 0) return f.theta === 90;
      if (i === 1) return f.theta === 60 && f.k === -40;
      return f.theta === 60 && f.k === 40;
    },

    anyCornerRight: function (f) {
      var i, c = f.n === 4 ? 4 : 3;
      for (i = 0; i < c; i++) if (this.cornerRight(f, i)) return true;
      return false;
    },

    /* ⚠⚠ THE WHOLE POINT: `rot` DOES NOT APPEAR IN THIS FUNCTION, and a
       gate parses this source to prove it. */
    tags: function (f) {
      return { equal: this.sidesAllEqual(f), right: this.anyCornerRight(f) };
    },

    /* the form this track's ladder produces at rung `v`. ⚠⚠ FOR 'turn'
       THE RUNG IS DISCARDED — the pose is not part of a form — so every
       rung of the dial maps to the SAME form. That single line is what
       makes the empty detent set below a THEOREM rather than a special
       case. */
    _formAt: function (track, f, v) {
      return { n: f.n,
        k: track === 'len' ? v : f.k,
        theta: track === 'skew' ? v : f.theta };
    },

    /* ⭐⭐ THE DETENT SET IS THE SET OF RUNGS AT WHICH CROSSING FLIPS A
       TAG: a rung where a tag HOLDS and an adjacent rung of the same
       ladder LOSES it. Nothing else is a detent.
       ⚠⚠ THE FIRST VERSION PUSHED EVERY RUNG AT WHICH A TAG MERELY HELD,
       which is a different set the moment a tag does not depend on the
       track's own parameter: at theta = 90 the right-angle tag holds at
       every k, so the stretch rail drew ALL 165 NOTCHES — a solid bar —
       and at k = 0 the lean rail drew all 73. Crossing those rungs flips
       nothing. And 'turn' came back empty only because an if/else-if had
       no branch for it, i.e. BY SPECIAL CASE, which is exactly what this
       tool's first invention forbids. Both are the same fix: walk the
       ladder generically and ask the tags.
       ⚠ A home notch at rot = 0 would assert that upright is special,
       which is the misconception itself; it cannot arise here because
       `_formAt` drops the rung. */
    detentsFor: function (track, f) {
      var r = this._range(track), out = [], v, here, i, u, there;
      for (v = r.lo; v <= r.hi; v += r.step) {
        here = this.tags(this._formAt(track, f, v));
        if (!here.equal && !here.right) continue;
        for (i = -1; i <= 1; i += 2) {
          u = v + i * r.step;
          if (u < r.lo || u > r.hi) continue;
          there = this.tags(this._formAt(track, f, u));
          if ((here.equal && !there.equal) || (here.right && !there.right)) { out.push(v); break; }
        }
      }
      return out;
    },

    legalTheta: function (t) {
      return t >= GEO.TH_MIN && t <= GEO.TH_MAX && (t - GEO.TH_MIN) % GEO.TH_STEP === 0;
    },

    newState: function (sides, pick) {
      var n = sides === 'three' ? 3 : 4, r = pick || Math.random;
      var k = Math.round((r() * 2 - 1) * GEO.K_MAX);
      var steps = (GEO.TH_MAX - GEO.TH_MIN) / GEO.TH_STEP;
      var theta = GEO.TH_MIN + Math.round(r() * steps) * GEO.TH_STEP;
      /* ⭐ THE TOOL NEVER OPENS ON AN UPRIGHT SHAPE. `curate-wing`'s own
         ASSESS_OFF is 22 degrees; reused rather than reinvented. */
      var rot = 22 + Math.round(r() * ((90 - 44) / GEO.ROT_STEP)) * GEO.ROT_STEP;
      return { n: n, k: k, theta: theta, rot: rot, kept: null };
    },

    _st: function (st) { return st || this.st; },

    form: function (st) { var s = this._st(st); return { n: s.n, k: s.k, theta: s.theta }; },

    /* ---- the moves. null is the single refusal channel. ------------ */

    setLen: function (st, k) {
      var s = this._st(st);
      if (k !== Math.round(k) || k < -GEO.K_MAX || k > GEO.K_MAX) return null;
      if (k === s.k) return null;
      return { n: s.n, k: k, theta: s.theta, rot: s.rot, kept: s.kept };
    },

    setSkew: function (st, t) {
      var s = this._st(st);
      if (!this.legalTheta(t) || t === s.theta) return null;
      return { n: s.n, k: s.k, theta: t, rot: s.rot, kept: s.kept };
    },

    setRot: function (st, r) {
      var s = this._st(st);
      if (r !== Math.round(r) || r % GEO.ROT_STEP !== 0) return null;
      r = ((r % 360) + 360) % 360;
      if (r === s.rot) return null;
      return { n: s.n, k: s.k, theta: s.theta, rot: r, kept: s.kept };
    },

    /* ⭐⭐ THE SIMULTANEOUS ARRAY. This is the Christie & Gentner answer:
       a morph is a sequence, and sequence tested no better than showing
       one shape. Keeping a copy puts two exemplars on the pane AT ONCE,
       which is the arrangement with the effect size. */
    keep: function (st) {
      var s = this._st(st);
      if (s.kept) return null;
      return { n: s.n, k: s.k, theta: s.theta, rot: s.rot,
        kept: { n: s.n, k: s.k, theta: s.theta, rot: s.rot } };
    },

    drop: function (st) {
      var s = this._st(st);
      if (!s.kept) return null;
      return { n: s.n, k: s.k, theta: s.theta, rot: s.rot, kept: null };
    },

    /* ================= GEOMETRY (renderer only) ===================== */

    /* vertices in model space. ⚠ `rot` enters ONLY here. */
    verts: function (f, rot) {
      var a = this.sideA(f), b = this.sideB(f);
      var th = f.theta * Math.PI / 180, pts;
      if (f.n === 4) {
        pts = [[0, 0], [a, 0], [a + b * Math.cos(th), b * Math.sin(th)], [b * Math.cos(th), b * Math.sin(th)]];
      } else {
        pts = [[0, 0], [a, 0], [b * Math.cos(th), b * Math.sin(th)]];
      }
      var cx = 0, cy = 0, i;
      for (i = 0; i < pts.length; i++) { cx += pts[i][0]; cy += pts[i][1]; }
      cx /= pts.length; cy /= pts.length;
      var rr = 0;
      for (i = 0; i < pts.length; i++) {
        rr = Math.max(rr, Math.sqrt(Math.pow(pts[i][0] - cx, 2) + Math.pow(pts[i][1] - cy, 2)));
      }
      /* ⚠⚠ SCALE BY THE CIRCUMRADIUS, NEVER THE BOUNDING BOX. A
         bounding box breathes as the shape turns, so the shape would
         visibly change size under a rotation that changes nothing. */
      var sc = GEO.TARGET_R / rr, c = Math.cos(rot * Math.PI / 180), sn = Math.sin(rot * Math.PI / 180);
      var out = [];
      for (i = 0; i < pts.length; i++) {
        var x = (pts[i][0] - cx) * sc, y = (pts[i][1] - cy) * sc;
        out.push([x * c - y * sn, x * sn + y * c]);
      }
      return out;
    },

    /* ================= LIFECYCLE ==================================== */

    init: function (api) {
      this.api = api;
      /* ⚠⚠ THE COMPLETE HOUSE SCROLL FORM. `overflow-y:auto` ALONE is
         present-and-inert against a shell that pins html,body{height:100%}
         — measured on a sibling at 320x568 as an 1150px card in a 568px
         window with scrollY immovable. This tool is TALLER than that one
         (pane + three tracks + a deal row), so it is mandatory. */
      document.documentElement.classList.add('shp-scroll');
      document.body.classList.add('shp-scroll');
      this._lastSound = 0;
      this._lastSay = 0;
      /* the pop/seat kind for the next paint, written in all three
         branches of _announceTagChange and read in _paint. ⚠ A flag with
         a read site and no write site is a sibling's shipped defect;
         this one is written 3x and read 1x, and the mount check proves
         both ends. */
      this._fx = null;
      this._fxFrom = null;
      /* ⚠ `_prevTags` lived here, in reset() and in _deal(): written
         three times and READ NOWHERE. The before-state of a move is
         computed inside _apply, which is the only place it is wanted.
         Deleted rather than given a reader, because the reader would be
         the invention. */
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.sides);
      this._checkEntitlement();
      this._bindPrint();
    },

    /* ⚠⚠ THE KEPT SHAPE SURVIVES A RESET AND A SETTINGS CHANGE. It was
       destroyed silently on all three paths — the one mechanism the
       pedagogy panel's own effect size sits on, swept away with no
       announcement anywhere. `newState` still returns `kept: null` (the
       model is untouched, and a gate asserts it); the CARRY is the
       instrument's, not the model's. A pane holding a kept triangle and
       a live quadrilateral is a legitimate simultaneous array, and the
       put-away control is the one way to end it. */
    reset: function () {
      var carried = this.st ? this.st.kept : null;
      this.st = this.newState(this.api.settings.sides);
      this.st.kept = carried;
      this.render();
    },
    onSettings: function () { this.reset(); },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    _snd: function (f, force) {
      var now = Date.now();
      if (!force && now - this._lastSound < GEO.T_SND_DEBOUNCE) return;
      this._lastSound = now;
      if (this.api && this.api.sound) this.api.sound(f);
    },

    /* ⚠⚠ `_fmt` WAS DELETED HERE, AND THE DELETION IS THE POINT.
       It was the substituter for the `{rot}` placeholder in the shape
       labels; striking the banned degree numeral took its only consumer
       with it, leaving a declared-and-never-called function — the same
       family as a sibling's `hintTurn`.
       ⭐ AND REMOVING A CONSUMER CAN CONVERT A LOUD FAILURE INTO A
       SILENT ONE. While `_fmt` existed, a locale still shipping `{rot}`
       rendered a number; with `_fmt` gone it would render the literal
       braces to a screen reader, and from the locale side "substituted"
       and "printed raw" are indistinguishable — placeholder-parity
       catches only one of them. So the gate must assert `_fmt` HAS A
       CALL SITE OR IS ABSENT, poisoned both ways
       (`scripts/_shp-nofmt.js`), never merely that the locales are
       clean. */

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    _build: function () {
      /* ⚠ api.STAGE, not api.root — the shell's frozen api has no
         `root`, and a sibling threw on the first line of its first paint
         under 8,903 green model assertions because of it. */
      var api = this.api, self = this;
      this.injectCSS();
      /* ⚠⚠ THE D10 GUARD IS A CACHE KEY, AND A CACHE KEY MUST NEVER
         OUTLIVE THE NODE IT DESCRIBES. `_paint` skips rewriting the
         caption and the pane label when the FORM signature is unchanged;
         `_build` throws both elements away and makes new ones. Carrying
         the key across a rebuild would leave the new caption EMPTY and
         the new pane with no label whenever a reset happened to land on
         the same form — the recorded stale-memo defect, one tool later.
         Cleared here, at the only place that can invalidate it. */
      this._sig = null;
      if (this._ghostTimer) { window.clearTimeout(this._ghostTimer); this._ghostTimer = 0; }
      var host = api.stage || api.root;
      host.innerHTML = '';

      var wrap = document.createElement('div');
      wrap.className = 'shp-wrap';
      host.appendChild(wrap);

      this._pane = document.createElement('div');
      this._pane.className = 'shp-pane';
      wrap.appendChild(this._pane);

      this._svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this._svg.setAttribute('viewBox', '-140 -140 280 280');
      this._svg.setAttribute('class', 'shp-svg');
      this._pane.appendChild(this._svg);

      /* ⚠⚠ THE `aria*` PREFIX ON THESE FOUR KEYS IS A MISNOMER AND IT
         MISLED TEN NATIVE PANELS INTO SCREEN-READER REGISTER. The
         `sayTags*` strings are this tool's ONLY VISIBLE CAPTION — the
         sentence a class reads off a projector — while the label that is
         genuinely for assistive tech was the pane's `aria-label`, which
         is on a `role="group"` and is therefore NEVER ANNOUNCED when it
         changes. The naming was exactly inverted.
         ⭐ The half that is fixable without touching the ten locale
         files is fixed here: this caption is now a LIVE REGION, so a tag
         arriving or leaving is announced to a screen reader on the same
         channel the class reads, in the same words, at the same moment —
         and the pane label no longer repeats it, so the sentence sits in
         the accessibility tree ONCE.
         ⚠ The KEY RENAME (`sayTags*` -> `sayTags*`) is deliberately NOT
         done here: it is a key change and must travel by reference
         through the ten locale files at the fold, not be retyped in one
         file alone. */
      this._say = document.createElement('p');
      this._say.className = 'shp-say';
      this._say.setAttribute('role', 'status');
      this._say.setAttribute('aria-live', 'polite');
      wrap.appendChild(this._say);

      this._tracks = {};
      [['len', 'lenLabel'], ['skew', 'skewLabel'], ['turn', 'turnLabel']].forEach(function (t) {
        self._tracks[t[0]] = self._mkTrack(wrap, t[0], t[1]);
      });

      var row = document.createElement('div');
      row.className = 'shp-row';
      wrap.appendChild(row);

      this._btn = {};
      this._btn.keep = this._mk(row, 'shp-b-keep', '⧉', 'keep');
      /* ⚠⚠ THIS CONTROL WAS NEVER BUILT. `drop()` is a complete reducer
         with its own refusal, and `drop` was authored in the strings —
         and nothing anywhere called either, so the only way to take the
         kept shape away was to DEAL, which throws away the shape the
         class just built as well. A never-referenced string is the
         fossil of a control that was never built (#22's `saveWords`). */
      this._btn.drop = this._mk(row, 'shp-b-drop', '⌫', 'drop');
      this._btn.quarter = this._mk(row, 'shp-b-quarter', '⟳', 'quarter');
      this._btn.deal = this._mk(row, 'shp-b-deal', '↻', 'deal');
      this._btn.print = this._mk(row, 'shp-b-print', '⎙', 'print');

      this._btn.keep.addEventListener('click', function () { self._keep(); });
      this._btn.drop.addEventListener('click', function () { self._drop(); });
      this._btn.quarter.addEventListener('click', function () { self._quarter(); });
      this._btn.deal.addEventListener('click', function () { self._deal(); });
      this._btn.print.addEventListener('click', function () { self._print(); });

      this._gateHost = document.createElement('div');
      this._gateHost.className = 'shp-gate';
      wrap.appendChild(this._gateHost);

      this._sheet = document.createElement('div');
      this._sheet.className = 'shp-sheet';
      host.appendChild(this._sheet);

      this._gate();
    },

    /* ⭐ ONE REDUCER, THREE DOORS. Drag sweeps the ladder; a press that
       moved under 6px JUMPS to the clicked rung (not +1 per tap — 165
       taps is a chore, not an affordance); the keyboard walks it. */
    _mkTrack: function (parent, key, labelKey) {
      var self = this, api = this.api;
      var box = document.createElement('div');
      box.className = 'shp-track shp-track-' + key;
      var lab = document.createElement('span');
      lab.className = 'shp-tlabel';
      lab.textContent = api.t(labelKey);
      var rail = document.createElement('div');
      rail.className = 'shp-rail';
      rail.setAttribute('role', 'slider');
      rail.setAttribute('tabindex', '0');
      rail.setAttribute('aria-label', api.t(labelKey));
      /* ⚠⚠ THE BANNED DEGREE NUMERAL WAS STILL SHIPPING ON A CHANNEL NO
         STRING EDIT COULD REACH. Striking `{rot}` from the labels left
         the turn rail a `role="slider"` whose `aria-valuenow` carried
         the raw rotation, 0-358 — so a screen-reader user heard a degree
         number on every arrow press, of the one quantity this file's own
         refuse-list bans and the second invention proves irrelevant.
         The dial now carries NO numeric value at all; `len` and `skew`
         keep theirs, because those are the numbers that change what the
         shape IS.
         ⚠ NOT fixed by naming the pose in words instead ("upright" /
         "leaning"): that re-announces `rot` in adjectival dress, which
         is the numeral finding returning wearing a coat — and it is the
         defect this file already shipped once (see `ariaShape4`).
         The value attributes are written in `_paint`, gated on the same
         `key !== 'turn'`. */
      var notches = document.createElement('div');
      notches.className = 'shp-notches';
      var grip = document.createElement('div');
      grip.className = 'shp-grip';
      rail.appendChild(notches);
      rail.appendChild(grip);
      box.appendChild(lab);
      box.appendChild(rail);
      parent.appendChild(box);

      var down = false, moved = 0, sx = 0;
      var pos = function (ev) {
        var r = rail.getBoundingClientRect();
        return Math.min(1, Math.max(0, (ev.clientX - r.left) / Math.max(1, r.width)));
      };
      rail.addEventListener('pointerdown', function (ev) {
        down = true; moved = 0; sx = ev.clientX;
        rail.setPointerCapture && rail.setPointerCapture(ev.pointerId);
      });
      rail.addEventListener('pointermove', function (ev) {
        if (!down) return;
        moved = Math.max(moved, Math.abs(ev.clientX - sx));
        if (moved >= 6) self._setFrac(key, pos(ev));
      });
      rail.addEventListener('pointerup', function (ev) {
        if (!down) return;
        down = false;
        /* a press that never moved is a JUMP to the clicked rung */
        self._setFrac(key, pos(ev));
      });
      rail.addEventListener('keydown', function (ev) {
        var d = 0;
        if (ev.key === 'ArrowLeft') d = -1;
        else if (ev.key === 'ArrowRight') d = 1;
        else if (ev.key === 'PageDown') d = -10;
        else if (ev.key === 'PageUp') d = 10;
        /* ⚠⚠ A SENTINEL, NOT A HUGE NUMBER. `Home` was `d = -1e9` and
           the turn rail wraps with `% 360` — and 2e9 % 360 === 200, so
           Home and End JUMPED THE DIAL BY 200 DEGREES instead of going
           anywhere. `_step` now handles the two ends by name. */
        else if (ev.key === 'Home') d = 'lo';
        else if (ev.key === 'End') d = 'hi';
        else if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); self._toDetent(key); return; }
        else return;
        ev.preventDefault();
        self._step(key, d);
      });
      return { box: box, rail: rail, grip: grip, notches: notches, label: lab };
    },

    _mk: function (parent, cls, glyph, key) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'shp-btn ' + cls;
      var g = document.createElement('span');
      g.className = 'shp-glyph';
      g.setAttribute('aria-hidden', 'true');
      g.textContent = glyph;
      var t = document.createElement('span');
      t.className = 'shp-label';
      t.textContent = this.api.t(key);
      b.appendChild(g); b.appendChild(t);
      b._key = key;
      parent.appendChild(b);
      return b;
    },

    /* ---- the acts ---------------------------------------------------- */

    _range: function (key) {
      if (key === 'len') return { lo: -GEO.K_MAX, hi: GEO.K_MAX, step: 1, get: 'k' };
      if (key === 'skew') return { lo: GEO.TH_MIN, hi: GEO.TH_MAX, step: GEO.TH_STEP, get: 'theta' };
      return { lo: 0, hi: 360 - GEO.ROT_STEP, step: GEO.ROT_STEP, get: 'rot' };
    },

    _apply: function (key, v) {
      var n = key === 'len' ? this.setLen(null, v) : key === 'skew' ? this.setSkew(null, v) : this.setRot(null, v);
      if (!n) return;
      var before = this.tags(this.form(this.st));
      /* the form the departing tag was last held on — the ghost is drawn
         from THIS, at the pose it is leaving from, so a tag leaves from
         where it actually was */
      this._fxFrom = { f: this.form(this.st), rot: this.st.rot };
      this.st = n;
      var after = this.tags(this.form(this.st));
      /* ⚠⚠ THE TURN RAIL HAS NO DETENTS BY THEOREM, SO IT MUST NOT PLAY
         A DETENT TONE. Every drag and every arrow press on the dial fell
         through to `_announceTagChange`'s else branch and clicked — the
         one rail whose detent set is EMPTY BY CONSTRUCTION was the only
         one clicking on every rung, which is the second invention
         contradicted by ear. It also meant `saidTurn` was reachable ONLY
         from the ⟳ button, so the rail said nothing at all. */
      if (key === 'turn') { this._turned(); return; }
      /* ⚠⚠ THE TRAVEL COMES BACK FROM THE ANNOUNCEMENT — and until this
         pass that was ALL it did. The returned number was written into
         `--shp-dur`, which NO CSS RULE READ, so T_POP and T_SEAT named a
         motion that never occurred and their equality held only because
         both were instantaneous. `_announceTagChange` now also records
         WHICH of the two happened, and `_paint` renders it. */
      this._paint(this._announceTagChange(before, after));
    },

    /* the dial's own path: no detent tone, and the sentence the rail
       could not reach. Throttled because one drag crosses 180 rungs and
       every one of them says the same thing. */
    _turned: function () {
      var now = Date.now();
      if (now - this._lastSay >= GEO.T_SAY_THROTTLE) {
        this._lastSay = now;
        this.api.announce(this.api.t('saidTurn'));
      }
      this._fx = null;
      this._paint(GEO.T_TURN);
    },

    _setFrac: function (key, frac) {
      var r = this._range(key);
      var steps = Math.round((r.hi - r.lo) / r.step);
      this._apply(key, r.lo + Math.round(frac * steps) * r.step);
    },

    _step: function (key, d) {
      var r = this._range(key), cur = this.st[r.get];
      if (d === 'lo' || d === 'hi') {
        /* ⭐⭐ THE DIAL HAS NO ENDS, SO HOME AND END HAVE NOWHERE TO GO.
           Landing them on a chosen rung would mean choosing one, and the
           only rung anyone would choose is rot = 0 — which asserts that
           upright is special, i.e. the misconception itself, and is
           already forbidden as a home notch by the first invention. The
           ring declines them. (Before this they read as a 200-degree
           jump: d was ±1e9, the step is 2, and 2e9 % 360 === 200.) */
        if (key === 'turn') return;
        this._apply(key, d === 'lo' ? r.lo : r.hi);
        return;
      }
      var v = Math.min(r.hi, Math.max(r.lo, cur + d * r.step));
      if (key === 'turn') v = ((cur + d * r.step) % 360 + 360) % 360;
      this._apply(key, v);
    },

    /* ⭐ Enter on a track with detents snaps to the nearest one — so ONE
       KEY fastens and unfastens the property, which is the whole thesis
       in a single press. On the turn dial there are no detents, so Enter
       is a quarter turn: four presses return you to where you began with
       nothing changed. */
    _toDetent: function (key) {
      if (key === 'turn') { this._quarter(); return; }
      var d = this.detentsFor(key, this.form(this.st));
      if (!d.length) { this._refuse(key); return; }
      var r = this._range(key), cur = this.st[r.get], best = d[0], i;
      for (i = 1; i < d.length; i++) if (Math.abs(d[i] - cur) < Math.abs(best - cur)) best = d[i];
      this._apply(key, best);
    },

    /* ⚠ `if (!n) { this._refuse('turn'); }` STOOD HERE AND WAS DEAD CODE.
       `setRot` refuses on three grounds — a non-integer, a rung off the
       2-degree ladder, and no movement — and a quarter turn can trip
       none of them: `rot` is always even, 90 is even, and 90 % 360 is
       never 0. A refusal path that cannot be entered is a claim the
       machine does not make, so it is gone rather than guarded.
       ⚠ And no detent tone here either, for the same reason as the rail:
       a quarter turn crosses no detent, because the dial has none. */
    _quarter: function () {
      this.st = this.setRot(null, (this.st.rot + 90) % 360);
      this.api.announce(this.api.t('saidTurn'));
      this._lastSay = Date.now();
      this._fx = null;
      this._paint(GEO.T_TURN);
    },

    _keep: function () {
      var n = this.keep(null);
      if (!n) { this._refuse('keep'); return; }
      this.st = n;
      this._snd(GEO.SND_DEAL);
      this.api.announce(this.api.t('saidKept'));
      this._fx = null;
      this._paint();
    },

    /* ⚠ NO ANNOUNCEMENT OF ITS OWN. Putting the kept shape away removes a
       thing from the pane; the pane's own aria label re-reads on the very
       next paint and says what is there now, so a second sentence would
       be the tool talking about itself. */
    _drop: function () {
      var n = this.drop(null);
      if (!n) { this._refuse('drop'); return; }
      this.st = n;
      this._snd(GEO.SND_DEAL);
      this._fx = null;
      this._paint();
    },

    /* ⚠⚠ THE KEPT SHAPE IS CARRIED ACROSS THE DEAL. It used to be
       destroyed here, silently, on the one control a child presses most
       — the simultaneous array the pedagogy panel's whole effect size
       rests on, swept away with nothing said on any channel. Dealing now
       replaces THE SHAPE IN YOUR HAND and leaves the one you kept where
       it stands, which is also why `saidDealt` needs no clause about it
       and no second key: nothing is taken away, so no sentence can be
       false about what was. `newState` still returns `kept: null` — the
       model is untouched and a gate asserts it. */
    _deal: function () {
      var carried = this.st.kept;
      this.st = this.newState(this.api.settings.sides);
      this.st.kept = carried;
      this._snd(GEO.SND_DEAL);
      this.api.announce(this.api.t('saidDealt'));
      this._fx = null;
      this._paint(GEO.T_DEAL);
    },

    /* ⚠⚠ A TAG REPORTS A PROPERTY, NEVER A PERFORMANCE — and it is
       exactly as loud coming back as it was going. */
    /* ⚠ `force` ON BOTH, AND ON BOTH FOR THE SAME REASON. A pop or a
       seat mid-drag arrives within the 160ms debounce of the rung sound
       that preceded it, so the one event that matters was the one the
       debounce could swallow. Forcing only the pop would have made the
       pop the reliable half — a verdict delivered by which sound
       survives — so both are forced and they stay identical. */
    _announceTagChange: function (before, after) {
      var lost = (before.equal && !after.equal) || (before.right && !after.right);
      var gained = (!before.equal && after.equal) || (!before.right && after.right);
      if (lost) { this._fx = 'pop'; this._snd(GEO.SND_POP, true); this.api.announce(this.api.t('saidPop')); return GEO.T_POP; }
      if (gained) { this._fx = 'seat'; this._snd(GEO.SND_SEAT, true); this.api.announce(this.api.t('saidSeat')); return GEO.T_SEAT; }
      this._fx = null;
      this._snd(GEO.SND_DETENT);
      return GEO.T_DETENT;
    },

    /* ⚠⚠ A REFUSAL WITH NO WORDS IS A 3px NUDGE AND A BEEP. Only `keep`
       said anything, and the refusal a free visitor is FAR more likely
       to meet is PRINT — the paid sheet — which nudged the button and
       said nothing at all. The map is explicit so a new refusal cannot
       be added silently; `drop` and the two rails stay wordless on
       purpose, because their control is already visibly `is-off` and the
       pane has not changed. */
    _refuse: function (why) {
      var self = this;
      var SAY = { keep: 'saidNoKeep', print: 'lockedTitle' };
      var el = (this._tracks[why] && this._tracks[why].rail) || this._btn[why] || this._btn.keep;
      this._snd(GEO.SND_REFUSE, true);
      if (el) {
        el.classList.add('is-refuse');
        window.setTimeout(function () { el.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      if (SAY[why]) this.api.announce(this.api.t(SAY[why]));
    },

    /* ================= PAINT ======================================== */

    /* ⭐⭐ THE TAGS ARE BUILT SEPARATELY FROM THE SHAPE, AND THAT IS WHAT
       MAKES THE POP RENDERABLE AT ALL. A tag that lets go has no element
       on the new form to animate — it is gone — so the departing tag has
       to be rebuilt from the form it was last held on and flown off from
       there. One builder serves the live shape, the kept shape, the
       printed sheet AND the ghost, so a tag cannot be drawn one way in
       one of them and another way in the next.
       ⭐ Each tag carries its own OUTWARD NORMAL as `--shp-tx/--shp-ty`,
       so the travel is away from the shape it was fastened to rather
       than in some globally chosen direction. The vertices arrive
       centred on the origin (`verts` recentres), so "outward" is just
       "away from (0,0)". */
    _tagEls: function (f, v) {
      var self = this, out = [], push = GEO.FX_PUSH;
      var mark = function (el, ox, oy) {
        var L = Math.sqrt(ox * ox + oy * oy) || 1;
        el.style.setProperty('--shp-tx', (ox / L * push).toFixed(2) + 'px');
        el.style.setProperty('--shp-ty', (oy / L * push).toFixed(2) + 'px');
        out.push(el);
      };
      var tg = this.tags(f);
      /* THE TICK — one stroke across each mid-edge; all sides carry one,
         or none does. */
      if (tg.equal) {
        v.forEach(function (q, i) {
          var w = v[(i + 1) % v.length];
          var mx = (q[0] + w[0]) / 2, my = (q[1] + w[1]) / 2;
          var ex = w[0] - q[0], ey = w[1] - q[1], L = Math.sqrt(ex * ex + ey * ey) || 1;
          var nx = -ey / L, ny = ex / L, h = Math.min(16, Math.max(9, L * 0.30)) / 2;
          var ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          ln.setAttribute('x1', (mx - nx * h).toFixed(2)); ln.setAttribute('y1', (my - ny * h).toFixed(2));
          ln.setAttribute('x2', (mx + nx * h).toFixed(2)); ln.setAttribute('y2', (my + ny * h).toFixed(2));
          ln.setAttribute('class', 'shp-tag shp-tag-tick');
          /* the edge normal, turned to face away from the centre */
          var s = (mx * nx + my * ny) >= 0 ? 1 : -1;
          mark(ln, nx * s, ny * s);
        });
      }
      /* THE SQUARE — the standard right-angle mark, drawn inside the
         corner. ⭐ `G3-341` already ships "Circle every RIGHT angle (the
         ones with the little square)" to this exact age band, so the
         house has already bet a six-year-old reads it untold. */
      v.forEach(function (q, i) {
        if (!self.cornerRight(f, i)) return;
        var pv = v[(i - 1 + v.length) % v.length], nv = v[(i + 1) % v.length];
        var u1 = [pv[0] - q[0], pv[1] - q[1]], u2 = [nv[0] - q[0], nv[1] - q[1]];
        var l1 = Math.sqrt(u1[0] * u1[0] + u1[1] * u1[1]) || 1, l2 = Math.sqrt(u2[0] * u2[0] + u2[1] * u2[1]) || 1;
        var leg = Math.min(14, Math.max(GEO.MARK_MIN, Math.min(l1, l2) * 0.22));
        var a1 = [q[0] + u1[0] / l1 * leg, q[1] + u1[1] / l1 * leg];
        var a2 = [q[0] + u2[0] / l2 * leg, q[1] + u2[1] / l2 * leg];
        var cr = [a1[0] + a2[0] - q[0], a1[1] + a2[1] - q[1]];
        var pl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        pl.setAttribute('points', a1.map(function (z) { return z.toFixed(2); }).join(',') + ' ' +
          cr.map(function (z) { return z.toFixed(2); }).join(',') + ' ' +
          a2.map(function (z) { return z.toFixed(2); }).join(','));
        pl.setAttribute('class', 'shp-tag shp-tag-sq');
        /* a corner mark leaves through its own corner */
        mark(pl, q[0], q[1]);
      });
      return out;
    },

    _poly: function (f, rot, cls, dx) {
      var v = this.verts(f, rot), g;
      g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', cls);
      g.setAttribute('transform', 'translate(' + (dx || 0) + ',0)');
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      p.setAttribute('points', v.map(function (q) { return q[0].toFixed(2) + ',' + q[1].toFixed(2); }).join(' '));
      p.setAttribute('class', 'shp-poly');
      g.appendChild(p);
      /* corner discs: the shape's own structure, countable, never a
         numeral (v5 entry 14 owns the numeral gesture) */
      v.forEach(function (q) {
        var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', q[0].toFixed(2)); c.setAttribute('cy', q[1].toFixed(2));
        c.setAttribute('r', '4'); c.setAttribute('class', 'shp-corner');
        g.appendChild(c);
      });
      this._tagEls(f, v).forEach(function (el) { g.appendChild(el); });
      return g;
    },

    /* the departing tag, alone, drawn on the form and pose it let go
       from. ⚠ It carries `shp-live` so it keeps the live tag's single
       colour — a ghost tinted like the kept shape would be a hue saying
       "past", i.e. a hue meaning something. */
    _ghost: function (from, dx, moved) {
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'), kept = 0;
      g.setAttribute('class', 'shp-live shp-ghost');
      g.setAttribute('transform', 'translate(' + (dx || 0) + ',0)');
      this._tagEls(from.f, this.verts(from.f, from.rot)).forEach(function (el) {
        /* ⚠ ONLY THE TAG THAT ACTUALLY LET GO. Both tags can hold at
           once, and ghosting the whole old set would fly a tag off the
           shape while its live copy is still fastened to it — a tag
           reported as leaving when it never left. */
        if (!this._fxWanted(el, moved)) return;
        el.classList.add('is-pop'); g.appendChild(el); kept++;
      }, this);
      return kept ? g : null;
    },

    /* which of the two tag kinds this event is about */
    _fxWanted: function (el, moved) {
      return el.classList.contains('shp-tag-tick') ? !!moved.equal : !!moved.right;
    },

    _paint: function (dur) {
      var s = this.st, api = this.api, t = api.t.bind(api), self = this;
      var f = this.form(s);

      /* ⚠⚠ SET BEFORE ANY TAG IS APPENDED. `--shp-dur` is what both
         keyframes read, and it used to be written only `if (dur)` and
         read by NO RULE AT ALL. It is now written on every paint, so a
         tag can never animate at some stale length left over from an
         earlier event. Reduced motion COMPRESSES it (`_dur`). */
      this._pane.style.setProperty('--shp-dur', this._dur(dur || GEO.T_POP) + 'ms');

      var live;
      this._svg.innerHTML = '';
      if (s.kept) {
        this._svg.setAttribute('viewBox', '-260 -140 520 280');
        this._svg.appendChild(this._poly({ n: s.kept.n, k: s.kept.k, theta: s.kept.theta }, s.kept.rot, 'shp-kept', -125));
        live = this._poly(f, s.rot, 'shp-live', 125);
      } else {
        this._svg.setAttribute('viewBox', '-140 -140 280 280');
        live = this._poly(f, s.rot, 'shp-live', 0);
      }
      this._svg.appendChild(live);

      /* ⭐⭐ THE POP AND THE SEAT, AND THEY ARE ONE GESTURE RUN BOTH WAYS.
         Arriving: the tag is put on the shape at once, from a position
         FX_PUSH along its own outward normal and FX_TURN out of
         alignment, and settles. Leaving: the tag it replaced is rebuilt
         from the form it was fastened to and travels the SAME distance,
         through the SAME angle, for the SAME time (T_POP === T_SEAT), in
         the SAME colour. The two keyframes are literal reverses of each
         other, which is the no-verdict law made of geometry instead of
         made of a sentence — and `scripts/_shp-symmetry.js` measures it
         on the rendered element rather than inferring it from the two
         constants, because an equality between two zeroes also holds. */
      if (this._ghostTimer) { window.clearTimeout(this._ghostTimer); this._ghostTimer = 0; }
      if (this._fx && this._fxFrom) {
        var was = this.tags(this._fxFrom.f), now = this.tags(f);
        var moved = { equal: was.equal !== now.equal, right: was.right !== now.right };
        if (this._fx === 'seat') {
          var self2 = this;
          Array.prototype.forEach.call(live.querySelectorAll('.shp-tag'), function (el) {
            if (self2._fxWanted(el, moved)) el.classList.add('is-seat');
          });
        } else {
          var gh = this._ghost(this._fxFrom, s.kept ? 125 : 0, moved);
          if (gh) {
            this._svg.appendChild(gh);
            this._ghostTimer = window.setTimeout(function () {
              if (gh.parentNode) gh.parentNode.removeChild(gh);
            }, this._dur(GEO.T_POP) + 40);
          }
        }
      }
      this._fx = null;

      /* tracks */
      ['len', 'skew', 'turn'].forEach(function (key) {
        var tr = self._tracks[key], r = self._range(key), cur = s[r.get];
        var frac = (cur - r.lo) / (r.hi - r.lo);
        tr.grip.style.left = (frac * 100).toFixed(2) + '%';
        /* ⚠⚠ THE DIAL CARRIES NO NUMBER. See `_mkTrack`: `aria-valuenow`
           was announcing the raw rotation, 0-358, which is the degree
           numeral the refuse-list bans, reaching a screen reader by a
           route no string edit could close. */
        if (key !== 'turn') {
          tr.rail.setAttribute('aria-valuemin', String(r.lo));
          tr.rail.setAttribute('aria-valuemax', String(r.hi));
          tr.rail.setAttribute('aria-valuenow', String(cur));
        }
        /* ⭐⭐ THE NOTCHES ARE THE DETENT SET, AND THE DIAL'S IS EMPTY BY
           CONSTRUCTION — the apparatus states the lesson in its own
           furniture before anyone touches it. */
        var d = self.detentsFor(key, f);
        tr.notches.innerHTML = '';
        d.forEach(function (v) {
          var n = document.createElement('span');
          n.className = 'shp-notch';
          n.style.left = (((v - r.lo) / (r.hi - r.lo)) * 100).toFixed(2) + '%';
          tr.notches.appendChild(n);
        });
      });

      this._btn.keep.classList.toggle('is-off', !this.keep(null));
      this._btn.drop.classList.toggle('is-off', !this.drop(null));
      this._btn.print.classList.toggle('is-off', !this.premium);

      /* ⚠⚠ NOTHING BELOW IS REWRITTEN ON A PURE ROTATION. Every sentence
         here is keyed on FORM, and the second invention says the pose is
         an input to the renderer and nothing else — so a caption that is
         a live region, plus a label rebuilt on every paint, would have a
         screen reader re-read the whole description on every arrow press
         of the one control that by theorem changes nothing. The
         signature deliberately excludes `rot` for both shapes. */
      var tg = this.tags(f);
      var key = tg.equal && tg.right ? 'sayTagsBoth' : tg.equal ? 'sayTagsEqual' : tg.right ? 'sayTagsRight' : 'sayTagsNone';
      var kf = s.kept ? { n: s.kept.n, k: s.kept.k, theta: s.kept.theta } : null;
      var sig = [f.n, f.k, f.theta, kf ? kf.n + '/' + kf.k + '/' + kf.theta : '-'].join(',');
      if (sig !== this._sig) {
        this._sig = sig;
        this._say.textContent = t(key);
        this._pane.setAttribute('role', 'group');
        /* ⭐⭐ THE KEPT SHAPE NOW SAYS WHAT IT IS. The pane announced the
           LIVE form and then a bare "a kept shape stands beside it" —
           so the kept shape's own sides and its own tags, the single
           change bought by the strongest pedagogy finding in the file,
           were available NOWHERE to a child who cannot see the pane. The
           one mechanism with the effect size was sighted-only.
           ⚠ The live tag sentence is NOT repeated here: it lives in the
           caption above, which is a live region, so it is announced on
           change and sits in the tree exactly once. */
        this._pane.setAttribute('aria-label',
          t(s.n === 4 ? 'ariaShape4' : 'ariaShape3') +
          (kf ? ' ' + t('ariaKept') + ' ' + t(kf.n === 4 ? 'ariaShape4' : 'ariaShape3') + ' ' + t(this._tagKey(kf)) : ''));
      }
    },

    _tagKey: function (f) {
      var g = this.tags(f);
      return g.equal && g.right ? 'sayTagsBoth' : g.equal ? 'sayTagsEqual' : g.right ? 'sayTagsRight' : 'sayTagsNone';
    },

    /* ================= ENTITLEMENT + PRINT ========================== */

    _checkEntitlement: function () {
      var self = this;
      this.premium = false;
      try {
        if (typeof fetch !== 'function') return;
        fetch('/api/entitlement', { credentials: 'include' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j) return;
            var tier = j.tier || (j.entitlement && j.entitlement.tier);
            if (!tier) return;
            self.premium = tier !== 'free';
            self._gate();
            if (self._btn) self._paint();
          })['catch'](function () { /* degrades to the FREE TIER, never to nothing */ });
      } catch (e) { this.premium = false; }
    },

    _gate: function () {
      if (!this._gateHost) return;
      var t = this.api.t.bind(this.api);
      this._gateHost.innerHTML = '';
      if (this.premium) { this._gateHost.classList.remove('is-on'); return; }
      this._gateHost.classList.add('is-on');
      var h = document.createElement('p');
      h.className = 'shp-gate-h'; h.textContent = t('lockedTitle');
      var b = document.createElement('p');
      b.className = 'shp-gate-b'; b.textContent = t('lockedBody');
      var a = document.createElement('a');
      a.className = 'shp-gate-cta'; a.href = '/pricing'; a.textContent = t('gateCta');
      this._gateHost.appendChild(h); this._gateHost.appendChild(b); this._gateHost.appendChild(a);
    },

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      /* ⚠⚠ Ctrl+P IS A PRINT PATH TOO — a sibling shipped a beforeprint
         listener with no entitlement check, so the browser's own print
         command handed the paid sheet to every non-subscriber while the
         copy sold it. The guard belongs on the SHEET. */
      window.addEventListener('beforeprint', function () {
        if (!self.premium) { if (self._sheet) self._sheet.innerHTML = ''; return; }
        self._buildSheet();
      });
    },

    _print: function () {
      if (!this.premium) { this._refuse('print'); return; }
      this._buildSheet();
      window.print();
    },

    _buildSheet: function () {
      if (!this._sheet) return;
      var t = this.api.t.bind(this.api), s = this.st, i;
      this._sheet.innerHTML = '';
      var h = document.createElement('h2');
      h.className = 'shp-sh-h'; h.textContent = t('sheetTitle');
      this._sheet.appendChild(h);

      var frame = document.createElement('div');
      frame.className = 'shp-sh-frame';
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', s.kept ? '-260 -140 520 280' : '-140 -140 280 280');
      svg.setAttribute('class', 'shp-sh-svg');
      if (s.kept) {
        svg.appendChild(this._poly({ n: s.kept.n, k: s.kept.k, theta: s.kept.theta }, s.kept.rot, 'shp-kept', -125));
        svg.appendChild(this._poly(this.form(s), s.rot, 'shp-live', 125));
      } else {
        svg.appendChild(this._poly(this.form(s), s.rot, 'shp-live', 0));
      }
      frame.appendChild(svg);
      this._sheet.appendChild(frame);

      var hint = document.createElement('p');
      hint.className = 'shp-sh-hint'; hint.textContent = t('sheetHint');
      this._sheet.appendChild(hint);

      var lines = document.createElement('div');
      lines.className = 'shp-sh-lines';
      for (i = 0; i < 6; i++) {
        var l = document.createElement('div');
        l.className = 'shp-sh-line';
        lines.appendChild(l);
      }
      this._sheet.appendChild(lines);
    },

    /* ================= CSS ========================================== */

    injectCSS: function () {
      if (document.getElementById('shp-css')) return;
      var st = document.createElement('style');
      st.id = 'shp-css';
      st.textContent = [
        /* ⚠⚠ TWO SEPARATE RULES, and the COMPLETE form. `html.x,body.x{}`
           is a selector LIST whose html half applies unconditionally,
           which makes the class decorative and its mutation unkillable;
           and `overflow-y:auto` alone is inert against the shell's
           height:100%. */
        'html.shp-scroll{overflow-y:auto;height:auto;min-height:100%}',
        'body.shp-scroll{overflow-y:auto;height:auto;min-height:100%}',
        '.shp-wrap{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;max-width:660px;margin:0 auto;padding:8px 10px 14px}',
        /* ⚠ THE ANGLE IS DECLARED FROM THE CONSTANT, NOT TYPED INTO THE
           KEYFRAMES. `--shp-rz` written here from GEO.FX_TURN is what
           gives that constant a call site; a hard-coded `14deg` in the
           keyframe text would be a number nobody could change and a
           constant nobody reads, both at once. */
        '.shp-pane{width:100%;background:#F6EAD3;border:1px solid #E7DCC8;border-radius:14px;padding:10px;--shp-rz:' + GEO.FX_TURN + 'deg}',
        '.shp-svg{display:block;width:100%;height:auto;max-height:46vw}',
        /* the shape is separated from the pane by its OUTLINE, not its
           fill — the fill is nearly the pane's value on purpose, so the
           TAGS are the highest-contrast thing on the stage */
        '.shp-poly{fill:#FBF3E4;stroke:#146B5E;stroke-width:2.5;stroke-linejoin:round}',
        '.shp-corner{fill:#146B5E}',
        /* ⚠ ONE COLOUR, from the first frame of a pop to the last. The
           whole event is position and opacity, so no hue can encode
           anything. */
        '.shp-tag{stroke:#0E5147;stroke-width:2.5;fill:none;stroke-linecap:round;transform-box:fill-box;transform-origin:center}',
        /* ⭐⭐ THE POP AND THE SEAT, AS TWO KEYFRAME SETS THAT ARE LITERAL
           REVERSES OF EACH OTHER. Same offset (`--shp-tx/--shp-ty`, the
           tag's own outward normal times FX_PUSH), same angle
           (`--shp-rz`, FX_TURN), same duration (`--shp-dur`, and
           T_POP === T_SEAT), same timing curve, and NO `stroke` in
           either — the colour is set once on `.shp-tag` and neither
           keyframe touches it, so no hue can encode anything and the
           whole event is position and opacity, exactly as the
           refuse-list requires.
           ⚠ These are what `--shp-dur` was missing: it was written on
           every paint and read by nothing, so both events took zero
           time and their equality was vacuously true. */
        '@keyframes shp-pop{from{transform:translate(0,0) rotate(0deg);opacity:1}' +
          'to{transform:translate(var(--shp-tx,0px),var(--shp-ty,0px)) rotate(var(--shp-rz,14deg));opacity:0}}',
        '@keyframes shp-seat{from{transform:translate(var(--shp-tx,0px),var(--shp-ty,0px)) rotate(var(--shp-rz,14deg));opacity:0}' +
          'to{transform:translate(0,0) rotate(0deg);opacity:1}}',
        /* ⚠⚠ `ease-in-out`, AND THE CURVE IS AS LOAD-BEARING AS THE
           DISTANCE. Both keyframe sets first shipped `ease-out`, which
           passed every endpoint assertion — same offset, same angle,
           same duration, same colour — and was STILL asymmetric, because
           `ease-out` is not its own time-reverse. Measured at mid-flight
           on the rendered element: the pop had already travelled 9.6px
           of its 14 while the seat had covered only 4.4, so the pop LEFT
           IN A LEAP and the seat CREPT BACK. That is the more exciting
           animation, i.e. the verdict delivered by production values,
           and it survived a gate that only looked at the two ends.
           `ease-in-out` satisfies f(1-t) === 1-f(t), so each half is the
           other run backwards frame for frame — and `_shp-symmetry.js`
           now samples 25/50/75% rather than trusting the endpoints. */
        '.shp-tag.is-pop{animation:shp-pop var(--shp-dur,260ms) ease-in-out both}',
        '.shp-tag.is-seat{animation:shp-seat var(--shp-dur,260ms) ease-in-out both}',
        /* the ghost is only the departing tag — no outline, no corners */
        '.shp-ghost{pointer-events:none}',
        '.shp-kept .shp-poly{stroke:#7A6A55;stroke-dasharray:5 4}',
        '.shp-kept .shp-corner{fill:#7A6A55}',
        '.shp-kept .shp-tag{stroke:#7A6A55}',
        '.shp-say{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#2A2A35;text-align:center;margin:0;min-height:1.3em}',
        '.shp-track{display:flex;align-items:center;gap:10px;width:100%}',
        '.shp-tlabel{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#7A6A55;min-width:72px;text-align:right}',
        '.shp-rail{position:relative;flex:1;height:44px;border-radius:11px;background:#FBF3E4;border:1px solid #E7DCC8;cursor:pointer;touch-action:none}',
        '.shp-rail:focus-visible{outline:3px solid #0D4E44;outline-offset:2px}',
        '.shp-rail.is-refuse{transform:translateX(-3px)}',
        '.shp-notches{position:absolute;inset:0}',
        '.shp-notch{position:absolute;top:8px;bottom:8px;width:2px;background:#7A6A55;transform:translateX(-1px)}',
        '.shp-grip{position:absolute;top:4px;bottom:4px;width:22px;margin-left:-11px;border-radius:8px;background:#146B5E}',
        '.shp-row{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:100%}',
        '.shp-btn{display:inline-flex;align-items:center;gap:7px;min-height:44px;padding:9px 14px;border-radius:11px;border:1px solid #E7DCC8;background:#FBF3E4;color:#2A2A35;font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer}',
        '.shp-btn:focus-visible{outline:3px solid #0D4E44;outline-offset:2px}',
        '.shp-btn.is-off{opacity:.45;cursor:default}',
        '.shp-btn.is-refuse{transform:translateX(-3px)}',
        '.shp-glyph{font-size:17px;line-height:1}',
        '.shp-gate{display:none;width:100%;background:#FBF3E4;border:1px dashed #E7DCC8;border-radius:12px;padding:12px 14px}',
        '.shp-gate.is-on{display:block}',
        '.shp-gate-h{margin:0 0 5px;font-family:"Baloo 2",system-ui,sans-serif;font-size:16px;color:#0D4E44}',
        '.shp-gate-b{margin:0 0 8px;font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#7A6A55;line-height:1.45}',
        '.shp-gate-cta{display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border-radius:10px;background:#146B5E;color:#FBF3E4;font-family:Nunito,system-ui,sans-serif;font-size:14px;text-decoration:none}',
        '.shp-sheet{display:none}',
        /* ⚠⚠ `.lcs-shell` IS NOT A CLASS — see the note in `the-gap.js`.
           The shell emits `.lcs-header` / `.lcs-controls`; this rule
           matched nothing, so the header, title, instruction and the
           four chrome buttons printed on every sheet. */
        '@media print{.lcs-header,.lcs-controls,.shp-wrap{display:none !important}',
        '.shp-sheet{display:block !important;padding:0}',
        '.shp-sh-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19pt;color:#000;margin:0 0 10pt}',
        '.shp-sh-frame{border:1pt solid #000;border-radius:6pt;padding:8pt;margin:0 0 10pt}',
        '.shp-sh-svg{width:100%;height:auto}',
        '.shp-sh-frame .shp-poly{fill:none;stroke:#000}',
        '.shp-sh-frame .shp-corner{fill:#000}',
        '.shp-sh-frame .shp-tag{stroke:#000}',
        '.shp-sh-hint{font-family:Nunito,system-ui,sans-serif;font-size:10pt;margin:0 0 8pt}',
        '.shp-sh-line{border-bottom:0.75pt solid #000;height:26pt}}'
      ].join('');
      document.head.appendChild(st);
    }
  };

  if (typeof window !== 'undefined') window.ShapeStretcher = ShapeStretcher;
  if (typeof module !== 'undefined' && module.exports) module.exports = ShapeStretcher;
})();
