/* =====================================================================
   TOOL #37 — THE BEETLE'S RAIL   (arrow-strip.js)
   REBUILT TO THE v4 BAR, build #2.
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog slot B1. The key stays `arrow-strip`.

   THE MAT · THE RAIL · THE BEETLE. Three named parts and nothing else
   gets a noun. (The trail is what the beetle leaves; not a fourth part.)

   THE ROUTINE:
     "Put the cards in the rail. Say where the beetle will stop.
      Then run it."   ... and then the move that matters:
     "Change ONE card and run it again."

   THE ONE THESIS — TWO OF THE FOUR CARDS MOVE NOTHING AND CHANGE
   EVERYTHING. A turn card leaves the beetle on the same square and
   rewrites what every card after it will mean.

   =====================================================================
   ⭐ WHY THIS FILE WAS REBUILT — TWENTY MEASURED DEFECTS
   Three expert panels (pedagogy, interaction design, art direction) read
   build #1. Six of the defects below were found by them, not by me, and
   three of those outranked everything on my own list.
   ---------------------------------------------------------------------
   D1 ⭐⭐ THE TRAIL COULD NOT SHOW A TURN — AND THE TRAIL IS THE PRODUCT.
      `_polyline` mapped every pose to (c+.5, r+.5), so a turn produced
      two IDENTICAL consecutive points and contributed zero geometry.
      [F,F] and [F,L,R,F] drew the same line; [L,L,L,L] ran the whole
      rail and drew NOTHING AT ALL — the apparatus byte-identical before
      and after. The file's ONE THESIS is that turns matter, and its own
      declared product rendered them as literally nothing.
      → PIVOT ARCS. Every turn stamps a quarter-arc on its square, so
        [L,L,L,L] now draws a full circle on one square — which is the
        single most teachable image this tool can produce.
   D2  THE CARD FACES TAUGHT THE MISCONCEPTION THE TOOL EXISTS TO BREAK.
      The forward card was `↑` — U+2191, named UPWARDS ARROW — while
      refusal 1 bans absolute direction "anywhere: card semantics,
      labels, aria, i18n keys, teacher copy". The file forbade the word
      and printed the icon. `↺`/`↻` failed differently: unbodied circles
      differing only by a ~3px arrowhead inside otherwise identical ink.
      → EVERY CARD NOW CARRIES THE BEETLE. An arrow welded to a drawn
        body is a body-relative statement in a way a bare glyph can never
        be. The two turn cards differ by a 52-unit shift of ALL the coral
        on the card, so "which side is the orange thing on" is a
        whole-card question, answerable across a room and out of focus.
   D3 ⭐ NOTHING EVER ANIMATED, AND NOTHING COULD. render() did
      `stage.innerHTML=''` and rebuilt every node; the beetle was created
      WITH its final left/top/transform inline, and a freshly inserted
      element has nothing to transition from. Both transitions in the
      stylesheet were dead code. The beetle teleported and the
      beetle's-eye toggle SNAPPED — on a frame-of-reference tool where
      the rotation IS the cognitive payload.
      → render() now BUILDS ONCE; `_sync()` mutates persistent nodes.
   D4  "CHANGE ONE CARD" HAD NO UI. `setCard` was called from nowhere.
      ⭐⭐ AND THE GATE CERTIFIED THE INVENTION THROUGH THAT DEAD PATH:
      verify-arrow-strip.js A14 proved "the ghost is the previous run" by
      calling setCard — an operation no teacher could perform. A15 forbids
      a dead STRING; nothing forbade a dead MODEL FUNCTION, and the one
      that fell through was the tool's headline routine.
      → TAP A RAIL PLACE TO CYCLE IT (F→B→L→R→empty). One tap. And A17
        now asserts every public mutator is reachable from a handler.
   D5 ⭐ THE BEETLE'S-EYE TOGGLE DID NOT MOVE THE MAT, AND DREW THE BEETLE
      ON THE WRONG SQUARE. It rotated by `-90 * pose.h` — the START
      heading, which doRun never touches — while the beetle was drawn from
      endPose. At the default h:0 the flagship control applied
      `rotate(0deg)`: the mat did not move. And the beetle was pinned to
      the BOX centre while the frame rotated about the MAT centre; all
      three mats are even-sided, so there is no centre square and the
      beetle sat on the corner of four squares ALWAYS.
      → THE FIX DELETES CODE. The beetle rides INSIDE the frame under the
        existing rotate(90*h); the frame rotates -90*h; the two cancel, so
        it renders nose-to-screen-top ON ITS TRUE SQUARE in both views
        with no special case at all.
   D6  A REFUSED CARD WAS SILENT. `blocked()` existed and was never
      called. The class predicted, the beetle was elsewhere, and the
      tool's answer was nothing.
      → The beetle leans into the edge and settles (a bump, never a
        bounce — the model has no rebound), the mat's edge rule thickens,
        and THE RAIL PLACE KEEPS THE MARK, so afterwards anyone can point
        at WHICH card was refused. Motion, not ink, on the mat: an edge
        tick would be a wall, and walls are refused.
   D7  RUN TWICE DID NOTHING VISIBLY — unedited, ghost drew exactly under
      an identical trail. → Run disables while rail === ranRail.
   D8 ⭐ THE IFRAME WAS PINNED AT 422px. lcs-shell.css:54 html,body
      {height:100%} → :63-70 .lcs-app{height:100%;overflow:hidden};
      .lcs-app.activity{height:auto} is the only escape and a free-play
      tool never gets it. So .lcs-app's height IS the iframe's height, the
      shell's ResizeObserver measures that same box and posts it to the
      parent, and the fixed point is INITIAL_HEIGHT 420 + 2. This file
      added `arw-wide` in init and NO `html,body.arw-wide{…}` rule ever
      existed. The class was inert.
   D9  ALL FOUR WIDE TIERS WERE DEAD — keyed min-height 880/1050/1150/1400
      against a 422px viewport. So is the shell's own card ladder, which
      VOIDS the premise of the old arithmetic ("the card is 1240 and 1800
      now": it was 720, always). And --arw-cell was clamp(34px,7.2vmin,…)
      → vmin = min(704,422) = 422 → the 34px FLOOR bound → a 6x6 mat drew
      214px inside a 704px card.
   D10 ⭐ THE TOOL WAS CLIPPED ON ITS OWN MARKETING PAGE. Content stacked
      to ~484px into a ~311px stage; .lcs-stage centres the overflow and
      .lcs-app{overflow:hidden} clipped both ends. THE "RUN IT" BUTTON WAS
      NOT ON SCREEN. The instrument's primary verb was invisible.
   D11 CTRL+P BY A FREE VISITOR PRINTED THE PAID SHEET — AND PRINTED THE
      ANSWER. The chip was gated; the @media print block was not. And
      .arw-beetle was not hidden while _buildBeetle draws endPose, so the
      block's own comment ("the beetle on its START square") was false.
      Fourth occurrence of this defect in this house.
   D12 THE LANDING COPY SOLD TWO FEATURES THAT DID NOT EXIST — "saved
      mats" and "printing … with blank cards to cut out". Live, indexed,
      eleven languages. → BOTH ARE BUILT HERE rather than retreated from.
   D13 The mat had no silhouette: cell #FBF3E4 on card #FBF6EE = 1.02:1,
      held by a border compositing to 1.34:1 against a 3:1 floor.
      → RULED MAT: the grid is teal and the gaps ARE the rules (5.9:1),
        and 64 painted borders leave the render.
   D14 No start marker. D15 The rail wrapped to a 4x3 BLOCK — an
      accidental period-4 pattern, which is a SIBLING TOOL'S grammar —
      with unnumbered places. D16 The empty rail was an invisible 120x44
      spacer. D17 The hint reserved 20px against a 3-line German string,
      so the mat jumped 21px on the first tap; and flex-basis was the
      wrong axis inside a column. D18 a11y was nil: .arw-sr had no role
      and no aria-live, api.announce was never called, every cell was
      aria-hidden so the mat's role="group" was EMPTY, role="listitem" on
      a <button> destroyed the button role, and innerHTML='' dropped
      focus to <body> on every single tap. D19 The trail was the same
      coral that means LOCKED and means RUN. D20 destroy() leaked
      `arw-wide` onto every subsequent tool.

   ⚠ ONE PANEL FINDING I CHECKED AND REJECTED: that the Mat Book serves 3
   mats not 36 because frontend/public/mini-tools/arrow-strip-mats.json is
   absent. /mini-tools/ is served by nginx from /var/www/lcs-media/, not
   from frontend/public. Production returns HTTP 200, 3120 bytes. VERIFY
   THE MEASUREMENT BEFORE THE DEFECT — a wrong measurement agreeing with a
   plausible story is how false defects ship.

   =====================================================================
   ⚠ THE FENCE — FOUR SURFACES. Clear on the mechanic, OCCUPIED on the
   vocabulary, and the second half is what constrains this file.
   `REFERENCE APPS/treasure-hunt.html` owns the ABSOLUTE direction
   vocabulary outright (:845-847 a selector offering Up/Down/Left/Right vs
   N/S/E/W; :2958-2962 raw row±s / col±s, no heading anywhere) — but it
   PRINTS a clue list, it never RUNS one.
   `pattern-bench` owns "strip" and a unit repeated into it — recomputed,
   never run, no body, no time. AND IT OWNS A WRAPPED GRID OF REPEATING
   CELLS, which is why the rail here is one LINE and never a block.
   `open-number-line` owns the only other path renderer — 1-D, where a
   jump has a sign and not a facing, and it never replays.
   `folding-sheet` owns real-DOM-under-one-CSS-matrix — a static
   involution about fixed creases, mirror-as-a-map, not turn-as-an-action.
   `number-sieve` (#36) is the closest sibling — a grid and a card that
   ACTS on it — but ITS CARDS COMMUTE. Here order is everything, and A5
   asserts that POSITIVELY so the two theses can never blur.
   Activities: `place-by-relation-core` (K.G.A.1) resolves a position WORD
   to one static placement at authoring time; `mail-route-core` draws a
   polyline and disclaims it in its own header.
   Printables: `_shared/position-words.js` owns the absolute left/right
   worksheet judgement, static and one-shot.

   REFUSES, FOREVER — each one gated:
     1. NO ABSOLUTE DIRECTION, IN ANY LANGUAGE. No up/down as movement
        words and no north/south/east/west, anywhere.
        ⚠ BODY-RELATIVE words are the CONTENT and stay: forward, back,
        and turn-left / turn-right meaning left and right OF THE BEETLE.
     2. NO ABSOLUTE-FRAME MOVEMENT PRIMITIVE. Nothing here takes a
        direction as an argument. The model is {pos, heading} and the
        dr/dc table is indexed by heading alone.
     3. ONE CARD IS ONE UNIT MOVE. No step-count on a card — which is also
        what protects the ghost: a mid-rail edit shifts CELLS, not scale.
     4. NO WALLS, NO MAZE, NO GOAL, NO TARGET. There is nothing to reach:
        THE TRAIL IS THE PRODUCT. This is also why a blocked step is shown
        in MOTION and never as ink on the mat — an edge tick is a wall.
     5. NO POSITION-WORD VOCABULARY (above/below/beside/between/inside).
     6. No score, no timer, no streak, no tick, no cross, no correct path,
        no verdict colour or wording.
     7. The on-screen noun is THE RAIL, never "the strip".
     8. NO SCRUB / STEP-BACK CONTROL. A teacher will ask for it. It is a
        second timeline in a tool whose law is that there is exactly one,
        it collides with tap-to-cycle on the same target, and a stepped
        run plus a persistent trail already answers "where was it after
        card 3".
     9. `inverseRail` IS NOT WIRED TO A CONTROL. The inverse is FALSE the
        moment anything blocked (see below), so an "undo the journey"
        button would silently lie on edge mats — and it would manufacture
        a goal square.

   ⚠ THE CATALOG'S OWN GATE SPEC WAS WRONG AND IS CORRECTED HERE. It
   claimed every rail's formal inverse returns the beetle to its start.
   FALSE the moment a move is blocked: a beetle against an edge runs
   [forward] (no-op) and the inverse [back] then moves it. So INVERSE (A2)
   is asserted only over non-blocking runs and EDGE HONESTY (A3) is its
   own invariant. Wrapping would restore the tidy inverse and is REFUSED:
   a beetle does not teleport off one edge and onto the other.

   ⚠ NO SPEECH. LCSAudio silently substitutes a missing voice and TTS is
   reliable in only 5 of 11 locales; this tool is legible with the sound
   off, like every v4 instrument.
   ===================================================================== */

var ArrowStrip = {
  id: 'arrow-strip',

  /* ---------------------------------------------------------------
     STRINGS. GENERATED by scripts/apply-arrow-strip-locales.js. EN is
     authored; the ten others are REBUILT — never translated — by their
     own three-person native panel per §A.13.48, and every panel is handed
     the English as a SOURCE TO AUDIT, not a target to translate. On build
     #1 four of them caught things no English author could: bokmål `pile-`
     is the compound form of WILLOW, so the draft shipped "the willow
     track"; `Matteboka`/`Mattboken` is the MATHS TEXTBOOK in Norwegian
     and Swedish; a Swedish six-year-old reads `banan` as BANANA before
     track; and Brazilian `sua esquerda` collapses to YOUR left — the
     exact confusion this tool exists to break.
     ⚠ No absolute direction word may appear here in any locale — gate A10
     checks each locale against its OWN vocabulary. Body-relative forward
     / back / turn-left / turn-right are the content and are allowed.
     --------------------------------------------------------------- */
  /* =====================================================================
     ⭐⭐ WHAT THE TEN PANELS FOUND IN MY ENGLISH — AND THEY ALL FOUND IT.
     Each panel was asked only to write its own language. All ten
     independently reported that the SOURCE contains a false statement:

       "The beetle steps only forward or back, THE WAY ITS NOSE POINTS."

     A back step goes the OPPOSITE way to the nose — `applyCard` runs it
     with d = -1. The nose fixes a LINE, not a direction, and my own
     `cardBack` string said the true thing three lines below, contradicting
     the headline. And the second sentence was worse:

       "To reach a square its nose is not pointing at, turn it first."

     Refuted by the card sitting next to it in the tray: the square
     directly BEHIND the beetle is a square its nose is not pointing at,
     and `back` reaches it with no turn at all. That claim was printed on
     the sheet that goes home with a child.
     This is the operator's own sentence, and I wrote it wrong. It is a
     mathematics inversion in the one locale nobody reviews, and nine
     languages were about to inherit it. THE PANELS ARE THE ONLY REVIEW
     THE SOURCE EVER GETS.

     They also, unanimously or near it, found:
       · `changedHint` "watch where the two trails part" — FALSE when the
         edited card is the last one, when the edit was refused by an edge,
         or when Run is pressed twice unedited. Now a question, which is
         true whatever happens and is the better teaching move anyway.
       · `"{n} cards run"` renders "1 cards run" — and is unfixable in the
         inflecting locales. Eight panels independently restructured it to
         a label-colon-count. THE ENGLISH TOOK THE FIX TOO.
       · `predictHint` asked only for the SQUARE — but a rail ending in a
         turn changes only the FACING, so the prediction could not catch
         the tool's own thesis.
       · NO aria string carried the heading at all, so a screen-reader user
         got two thirds of the pose and could predict nothing — on a tool
         whose entire subject is facing. Refusal 1 forbids naming a
         heading, so `facingAria` counts QUARTER TURNS FROM THE START,
         which is body-relative and legal.
       · `matLabel` was the accessible name of TWO different things (the
         size chips and the grid) — one label, two jobs.
       · The eye chip was HIGHLIGHTED while reading the name of the view
         you are NOT in. The label is now the destination and the chip is
         never lit, so it can only be read one way.

     ⭐ AND THREE PANELS FOUND LIVE BYTE-IDENTICAL COLLISIONS WITH A
     SHIPPED SIBLING. nl `"Mat afdrukken"`, no `"Skriv ut matta"` and fi
     `"Tulosta matto"` were CHARACTER-IDENTICAL to sorting-hoops' print
     chip, in production, right now. Danish and Swedish were one morpheme
     away. Nobody checks a collision in a language they do not read.
     ⭐ no: `our-day` ships no `'Matte'` meaning THE MATHS LESSON, so
     "Skriv ut matta" reads as "print the maths" → `rutegulvet`.
     ⭐ da: `bille` is one doubled letter from `bil` (car) and `Kør` is the
     verb for driving one, so **"Kør billen" reads as "drive the car"**.
     Hard authoring constraint, now permanent: da `kør` NEVER takes
     `billen` as its object. Every Danish run string is intransitive.
     ⭐ da: every `bille-` COMPOUND risks reading as `billed-` (picture-);
     `Billesporet` → `billedsporet`, which is a real Danish word (the
     video track). Hence the genitive `Billens skinne`. Norwegian has no
     such twin, so `Billebanen` is safe there — the same decision, opposite
     ways, in two neighbouring languages.
     ⭐ Three of my own briefing notes were STALE and the panels corrected
     them: sv `räls`, nl `baan` and no `bane` are all FREE. A doc is not a
     fact — measure.

     ⚠ FOR GATE A10, FROM THE PANELS, EACH A BAN-TOO-WIDE TRAP:
       fi — `\b` cannot police Finnish (consonant gradation: `\bitä\b`
            misses `idässä`), and a substring ban on `alla`/`alle` fires on
            `radalla` and `kentällä`, which are ordinary case endings.
       it — a ban on bare `su` condemns three CORRECT strings (`su quale
            casella`, `sulla stessa casella`).
       sv — a bare `vänster|höger` ban fires on cardTurnL/R, which are the
            tool's thesis. Scope it to the UNANCHORED forms.
     ===================================================================== */
  strings: {
    title:        { en: "The Rail That Waits", de: "Der Käfer und die Karten", fr: "La file qui attend", es: "El carril del escarabajo", pt: "O trilho do besouro", it: "Il binario dello scarabeo", nl: "De kever en het stappenplan", sv: "Skalbaggens räls", da: "Billens skinne", no: "Billebanen", fi: "Kuoriaisrata" },
    /* ⚠ THE CORRECTED CLAIM. Every locale below says LINE, not direction. */
    instruction:  { en: "The beetle only moves along the line its nose points down — a step forward, or a step back the way it came. To reach a square off that line, turn it first.", de: "Der Käfer geht nur vorwärts oder rückwärts: vorwärts dorthin, wohin seine Nase zeigt, rückwärts genau von dort weg. Alle anderen Felder erreicht er erst, wenn ihr ihn dreht.", fr: "Le scarabée avance ou recule, toujours tout droit. Pour l’envoyer ailleurs, faites-le d’abord tourner.", es: "El escarabajo solo avanza o retrocede por la línea hacia donde mira. Para llegar a una casilla que queda fuera de esa línea, primero hay que girarlo.", pt: "O besouro só anda para a frente ou para trás, na direção em que está olhando. Para alcançar as outras casas, virem o besouro primeiro.", it: "Lo scarabeo si muove solo lungo la linea dove guarda: un passo avanti o un passo indietro. Per portarlo su un’altra linea, prima fatelo girare.", nl: "De kever zet alleen stappen langs de lijn waar zijn kop naartoe wijst: vooruit, of achteruit dezelfde lijn terug. Wil je hem van die lijn af hebben, draai hem dan eerst.", sv: "Skalbaggen går bara framåt eller bakåt längs den linje nosen pekar ut. Ska den till en annan ruta måste ni vrida den först.", da: "Billen går kun frem eller tilbage: frem den vej næsen peger, tilbage den modsatte vej. Skal den nå et andet felt, skal den dreje først.", no: "Billen går bare framover eller bakover. Nesa bestemmer hvilken vei det er. Skal den et annet sted, må den snu først.", fi: "Kuoriainen astuu vain eteenpäin tai taaksepäin samaa linjaa pitkin, jonka sen pää määrää. Muihin ruutuihin se pääsee vasta, kun se ensin kääntyy." },
    buildHint:    { en: "Tap a card to put it in the rail. Nothing moves yet.", de: "Tippt eine Karte an, dann liegt sie in der Schiene. Noch bewegt sich nichts.", fr: "Touchez une carte pour l’ajouter à la file. Rien ne bouge encore.", es: "Toquen una tarjeta para ponerla en el carril. Todavía no se mueve nada.", pt: "Toquem em um cartão para colocá-lo no trilho. Nada se mexe ainda.", it: "Toccate una carta per metterla nel binario. Per ora non si muove niente.", nl: "Tik op een kaart en leg hem in het stappenplan. Er beweegt nog niets.", sv: "Tryck på ett kort så hamnar det på rälsen. Ingenting rör sig än.", da: "Tryk på et kort for at lægge det på skinnen. Der sker ikke noget endnu.", no: "Trykk på et kort for å legge det i banen. Ingenting rører seg ennå.", fi: "Napauta komentokorttia, niin se siirtyy radalle. Mikään ei vielä liiku." },
    predictHint:  { en: "Say which square the beetle will stop on, and which way it will be facing. Then run it.", de: "Sagt vorher, auf welchem Feld der Käfer stehen bleibt. Erst dann schickt ihr ihn los.", fr: "Dites sur quelle case le scarabée va s’arrêter, et de quel côté il regardera. Puis lancez la file.", es: "Digan en qué casilla va a parar y hacia dónde va a quedar mirando. Luego pónganlo en marcha.", pt: "Digam em que casa o besouro vai parar. Depois, rodem.", it: "Dite su quale casella si fermerà lo scarabeo — e da che parte guarderà. Poi fatelo partire.", nl: "Zeg eerst op welk vakje de kever stopt. Laat hem daarna lopen.", sv: "Säg vilken ruta skalbaggen stannar på. Kör sedan.", da: "Sig, hvilket felt billen ender på. Kør så.", no: "Si hvilken rute billen stopper på. Kjør den så.", fi: "Sanotaan ääneen, mihin ruutuun kuoriainen päätyy ja mihin päin se silloin katsoo. Vasta sitten ajetaan." },
    againHint:    { en: "Tap a card in the rail to change it, then run it again. The old trail stays.", de: "Tippt in der Schiene eine Karte an – sie wechselt zur nächsten. Dann schickt ihn noch einmal los.", fr: "Touchez une carte de la file pour la changer, puis relancez.", es: "Toquen una tarjeta del carril para cambiarla y pónganlo en marcha otra vez.", pt: "Toquem em um cartão do trilho para trocá-lo. Depois, rodem de novo.", it: "Toccate una carta nel binario per cambiarla, poi fatelo partire di nuovo.", nl: "Tik op een kaart in het stappenplan om hem te veranderen. Laat de kever daarna opnieuw lopen.", sv: "Tryck på ett kort på rälsen för att byta det. Kör sedan igen.", da: "Tryk på et kort på skinnen for at bytte det. Kør så igen.", no: "Trykk på et kort i banen for å bytte det, og kjør igjen.", fi: "Napauta radalla olevaa korttia, niin se vaihtuu. Aja sitten uudelleen — vanha jälki jää näkyviin." },
    /* ⚠ A QUESTION, NOT A PROMISE. Eight panels found the assertion false:
       edit the LAST card, or edit a step the edge refuses, and the trails
       never part at all. A question is true whatever happens — and it is
       the better thing to ask a class. */
    changedHint:  { en: "Run it again. Where do the two trails go apart?", de: "Schickt ihn noch einmal los und schaut, ab welchem Feld die beiden Spuren auseinandergehen.", fr: "Relancez. L’ancienne trace reste : regardez si les deux se séparent, et à partir d’où.", es: "Digan otra vez dónde va a parar. Al ponerlo en marcha, miren desde qué casilla se separa el recorrido nuevo del anterior — o si esta vez no se separa.", pt: "Rodem de novo: o rastro de antes fica pontilhado.", it: "Fatelo partire di nuovo e guardate dove la nuova scia lascia quella di prima.", nl: "Laat hem opnieuw lopen. Waar gaan de twee sporen uit elkaar?", sv: "Kör igen och se var de två linjerna går isär.", da: "Kør igen, og se, hvor de to spor skilles.", no: "Kjør en gang til, og se hvor de to løypene skiller lag.", fi: "Ajetaan uudelleen ja katsotaan, missä kohtaa jäljet eroavat toisistaan." },
    runBtn:       { en: "Run the rail", de: "Losschicken", fr: "Lancer la file", es: "Ponerlo en marcha", pt: "Rodar", it: "Fallo partire", nl: "Laten lopen", sv: "Kör", da: "Kør", no: "Kjør", fi: "Aja" },
    backBtn:      { en: "Take the last card off the rail", de: "Letzte Karte weg", fr: "Enlever la dernière carte", es: "Quitar la última tarjeta", pt: "Tirar o último cartão", it: "Togli l’ultima carta", nl: "Laatste kaart eraf", sv: "Ta bort sista kortet", da: "Tag det sidste kort af", no: "Ta av det siste kortet", fi: "Poista viimeinen kortti" },
    clearBtn:     { en: "Empty the rail", de: "Schiene leeren", fr: "Vider la file", es: "Vaciar el carril", pt: "Esvaziar o trilho", it: "Svuota il binario", nl: "Stappenplan leegmaken", sv: "Töm rälsen", da: "Tøm skinnen", no: "Tøm banen", fi: "Tyhjennä rata" },
    /* ⚠ THE LABEL IS THE DESTINATION AND THE CHIP IS NEVER LIT. Build #1
       highlighted it while it read the name of the view you are NOT in —
       a coin flip for a teacher at the front of a room. */
    eyeBtn:       { en: "See it the beetle’s way", de: "Aus Käfersicht", fr: "Voir avec ses yeux", es: "Verlo desde el escarabajo", pt: "Ver do lugar do besouro", it: "Passa agli occhi dello scarabeo", nl: "Kijk zoals de kever kijkt", sv: "Se som skalbaggen", da: "Set fra billen", no: "Sett fra billen", fi: "Kuoriaisen silmin" },
    eyeOffBtn:    { en: "See it the class’s way", de: "Aus eurer Sicht", fr: "Voir avec nos yeux", es: "Verlo desde la clase", pt: "Ver do lugar da turma", it: "Torna agli occhi della classe", nl: "Kijk zoals de klas kijkt", sv: "Se som klassen", da: "Set fra klassen", no: "Sett fra klassen", fi: "Luokan silmin" },
    matLabel:     { en: "Mat", de: "Matte", fr: "Quadrillage", es: "Tapete", pt: "Tapete", it: "Reticolo", nl: "Ruitjesveld", sv: "Rutmattan", da: "Måtten", no: "Rutegulv", fi: "Kenttä" },
    /* ⚠ NINE PANELS FOUND ONE LABEL ON TWO THINGS — the size chips and the
       grid both announced as "Mat". One element wearing two jobs. */
    matSizeLabel: { en: "Mat size", de: "Mattengröße", fr: "Taille du quadrillage", es: "Tamaño del tapete", pt: "Tamanho do tapete", it: "Dimensione del reticolo", nl: "Grootte van het ruitjesveld", sv: "Rutmattans storlek", da: "Måttens størrelse", no: "Størrelse på rutegulvet", fi: "Kentän koko" },
    matBook:      { en: "More mats", de: "Das Mattenbuch", fr: "Le livret des quadrillages", es: "El cuaderno de tapetes", pt: "O caderno de tapetes", it: "L’album dei reticoli", nl: "Alle ruitjesvelden", sv: "Fler rutmattor", da: "Måttebogen", no: "Boka med rutegulv", fi: "Kenttävihko" },
    keepBtn:      { en: "Set this mat aside", de: "Diese Matte behalten", fr: "Mettre ce quadrillage de côté", es: "Marcar este tapete", pt: "Guardar este tapete", it: "Salva questo reticolo", nl: "Dit ruitjesveld bewaren", sv: "Spara den här rutmattan", da: "Gem denne måtte", no: "Ta vare på dette rutegulvet", fi: "Tallenna tämä kenttä" },
    /* ⚠ THREE OF THESE WERE BYTE-IDENTICAL TO sorting-hoops IN PRODUCTION.
       nl "Mat afdrukken", no "Skriv ut matta", fi "Tulosta matto". Two more
       were one morpheme away. Nobody checks a collision in a language they
       do not read. */
    printBtn:     { en: "Print the planning sheet", de: "Matte drucken", fr: "Imprimer le quadrillage", es: "Imprimir el tapete", pt: "Imprimir o tapete", it: "Stampa il reticolo e le carte", nl: "Ruitjesveld afdrukken", sv: "Skriv ut rutmattan", da: "Print den tomme måtte", no: "Skriv ut rutegulvet", fi: "Tulosta kenttä" },
    gateLine:     { en: "More mats, setting a mat aside and printing are part of the Teacher plan.", de: "Das Mattenbuch, eigene Matten und das Drucken gehören zum Lehrer-Paket.", fr: "Le livret des quadrillages, les quadrillages mis de côté et l’impression font partie de l’offre Enseignant.", es: "El cuaderno de tapetes, marcar tapetes y la impresión forman parte del plan Docente.", pt: "Abrir o caderno de tapetes, guardar um tapete e imprimir fazem parte do plano Professor.", it: "L’album dei reticoli, i reticoli salvati e la stampa fanno parte del piano Insegnante.", nl: "Alle ruitjesvelden, ze bewaren en afdrukken horen bij het Leerkracht-pakket.", sv: "Fler rutmattor, att spara en rutmatta och att skriva ut ingår i Lärarpaketet.", da: "Måttebogen, gemte måtter og print hører til Lærerabonnementet.", no: "Boka med rutegulv, lagrede rutegulv og utskrift er en del av Lærerabonnementet.", fi: "Kenttävihko, kenttien tallennus ja tulostus kuuluvat Opettaja-tilaukseen." },
    unlock:       { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Vedi il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Katso Opettaja-tilaus" },
    cardFwd:      { en: "one step forward, the way its nose points", de: "ein Feld vorwärts, dorthin, wohin die Nase zeigt", fr: "un pas en avant, du côté où il regarde", es: "un paso adelante, hacia donde mira", pt: "um passo para a frente, para onde o besouro está olhando", it: "un passo avanti, dove guarda lo scarabeo", nl: "een stap vooruit, de kant op waar zijn kop wijst", sv: "ett steg framåt, dit nosen pekar", da: "billen går ét felt frem, den vej næsen peger", no: "ett steg framover, den veien nesa peker", fi: "askel eteenpäin, pää edellä" },
    cardBack:     { en: "one step back the way it came, without turning round", de: "ein Feld rückwärts, ohne sich umzudrehen", fr: "un pas en arrière, sans se retourner", es: "un paso atrás, sin darse la vuelta", pt: "um passo para trás, sem virar", it: "un passo indietro, senza girarsi", nl: "een stap achteruit, zonder zich om te draaien", sv: "ett steg bakåt, utan att vända sig om", da: "billen går ét felt tilbage, uden at vende sig", no: "ett steg bakover, uten å snu seg", fi: "askel taaksepäin, kääntymättä" },
    /* ⚠ THE POSSESSOR IS NAMED, NOT QUALIFIED. Bare `sua`/`su`/`sa` collapse
       to YOUR left in pt/es/fr — the exact confusion this tool exists to
       break — so those panels name the beetle outright. sv/da/no/nl get it
       free from a strictly third-person reflexive, and kept `eget`/`egen`
       for the child rather than for the parser. */
    cardTurnL:    { en: "a quarter turn to its own left — same square", de: "eine Vierteldrehung auf demselben Feld, nach links aus Käfersicht, nicht aus eurer", fr: "un quart de tour vers sa gauche à lui, sans changer de case", es: "un cuarto de vuelta hacia la izquierda del escarabajo, no la nuestra; se queda en la misma casilla", pt: "um quarto de volta para a esquerda do besouro, sem sair da casa", it: "un quarto di giro verso la sinistra dello scarabeo, restando sulla stessa casella", nl: "een kwartslag naar zijn eigen linkerkant, op hetzelfde vakje", sv: "ett kvarts varv åt sitt eget vänstra håll, kvar på samma ruta", da: "billen drejer en kvart omgang til sin egen venstre side og bliver på feltet", no: "en kvart omdreining til venstre for billen selv, på samme rute", fi: "neljänneskäännös kuoriaisen omalle vasemmalle — ruutu ei vaihdu" },
    cardTurnR:    { en: "a quarter turn to its own right — same square", de: "eine Vierteldrehung auf demselben Feld, nach rechts aus Käfersicht, nicht aus eurer", fr: "un quart de tour vers sa droite à lui, sans changer de case", es: "un cuarto de vuelta hacia la derecha del escarabajo, no la nuestra; se queda en la misma casilla", pt: "um quarto de volta para a direita do besouro, sem sair da casa", it: "un quarto di giro verso la destra dello scarabeo, restando sulla stessa casella", nl: "een kwartslag naar zijn eigen rechterkant, op hetzelfde vakje", sv: "ett kvarts varv åt sitt eget högra håll, kvar på samma ruta", da: "billen drejer en kvart omgang til sin egen højre side og bliver på feltet", no: "en kvart omdreining til høyre for billen selv, på samme rute", fi: "neljänneskäännös kuoriaisen omalle oikealle — ruutu ei vaihdu" },
    railSlotAria: { en: "card {i} in the rail: {card}. Tap to change it.", de: "Karte {i} in der Schiene: {card}. Antippen wechselt sie.", fr: "carte {i} de la file : {card}. Touchez pour la changer.", es: "lugar {i} del carril: {card}. Tócalo para cambiarlo.", pt: "cartão {i} do trilho: {card}. Toque para trocar.", it: "carta {i} del binario: {card}. Toccala per cambiarla.", nl: "kaart {i} in het stappenplan: {card}. Tik om hem te veranderen.", sv: "kort {i} på rälsen: {card}. Tryck för att byta det.", da: "kort {i} på skinnen: {card}. Tryk for at bytte det.", no: "kort {i} i banen: {card}. Trykk for å bytte det.", fi: "Radan kortti {i}: {card}. Napauta, niin kortti vaihtuu." },
    railEmptyAria:{ en: "rail place {i}, empty", de: "Platz {i} in der Schiene, noch leer", fr: "place {i} de la file, vide", es: "lugar {i} del carril, vacío", pt: "lugar {i} do trilho, vazio", it: "posto {i} del binario, vuoto", nl: "plek {i} in het stappenplan, leeg", sv: "plats {i} på rälsen, tom", da: "plads {i} på skinnen, tom", no: "plass {i} i banen, tom", fi: "Radan paikka {i}: tyhjä." },
    /* ⚠ `rivi {r}` / `Zeile {r}` — LABELLED, never two bare apposed numerals.
       A screen reader runs "3 4" together as one number, and in Finnish a
       fixed-nominative token cannot sit inside a case at all. */
    startAria:    { en: "the beetle starts on row {r}, column {c}", de: "Der Käfer startet in Zeile {r}, Spalte {c}.", fr: "le scarabée démarre ligne {r}, colonne {c}", es: "el escarabajo empieza en la fila {r}, columna {c}", pt: "o besouro começa na linha {r}, coluna {c}", it: "lo scarabeo parte dalla riga {r}, colonna {c}", nl: "de kever begint op rij {r}, kolom {c}", sv: "skalbaggen börjar på rad {r}, kolumn {c}", da: "billen starter på række {r}, kolonne {c}", no: "billen starter på rad {r}, kolonne {c}", fi: "Kuoriaisen aloitusruutu: rivi {r}, sarake {c}." },
    bodyAria:     { en: "the beetle is on row {r}, column {c}", de: "Der Käfer steht in Zeile {r}, Spalte {c}.", fr: "le scarabée est ligne {r}, colonne {c}", es: "el escarabajo está en la fila {r}, columna {c}", pt: "o besouro está na linha {r}, coluna {c}", it: "lo scarabeo è sulla riga {r}, colonna {c}", nl: "de kever staat op rij {r}, kolom {c}", sv: "skalbaggen står på rad {r}, kolumn {c}", da: "billen står på række {r}, kolonne {c}", no: "billen står på rad {r}, kolonne {c}", fi: "Kuoriaisen paikka: rivi {r}, sarake {c}." },
    /* ⭐ EIGHT PANELS FOUND THE SAME HOLE: no aria string carried the
       HEADING, so a screen-reader user got two thirds of the pose and could
       predict nothing — on a tool whose whole subject is facing, where a
       turn card was completely silent. Refusal 1 forbids naming a heading,
       so this counts QUARTER TURNS FROM THE START, which is body-relative
       and legal. A numeral after a colon is agreement-free at every value —
       the shape eight panels independently reached for counts. */
    facingAria:   { en: "Quarter turns to its own right since the start: {q}", de: "Vierteldrehungen nach rechts aus Käfersicht seit dem Start: {q}", fr: "Quarts de tour vers sa droite à lui depuis le départ : {q}", es: "Cuartos de vuelta hacia la derecha del escarabajo desde el principio: {q}", pt: "Quartos de volta para a direita do besouro desde o início: {q}", it: "Quarti di giro verso la destra dello scarabeo dall’inizio: {q}", nl: "Kwartslagen naar zijn eigen rechterkant sinds het begin: {q}", sv: "Kvarts varv åt sitt eget högra håll sedan starten: {q}", da: "Kvarte omgange til sin egen højre side siden starten: {q}", no: "Kvarte omdreininger til høyre for billen selv siden starten: {q}", fi: "Neljänneskäännöksiä kuoriaisen omalle oikealle alusta: {q}" },
    /* ⚠ IT REPORTS A STATE, NOT AN ERROR. The header's own rule: "it is up
       against the side" is a state of the mat. Nothing moved, so nothing
       was "stopped" mid-motion — the step was never taken. */
    blockedAria:  { en: "card {i}: the beetle was already at the edge, so the step was not taken", de: "Karte {i}: Am Rand der Matte ging es nicht weiter.", fr: "la carte {i} a été arrêtée par le bord du quadrillage", es: "tarjeta {i}: el escarabajo ya estaba pegado al borde del tapete, así que se quedó en su casilla", pt: "no cartão {i}, o besouro esbarrou na borda do tapete", it: "la carta {i} si è fermata contro il bordo del reticolo", nl: "kaart {i} werd tegengehouden door de rand van het ruitjesveld", sv: "kort {i} stoppades av rutmattans kant", da: "kort {i} blev stoppet af måttens kant", no: "kort {i} ble stoppet av kanten på rutegulvet", fi: "Kortti {i}: kuoriainen oli jo kentän reunassa, joten askelta ei otettu." },
    /* ⚠ LABEL-COLON-COUNT. "{n} cards run" renders "1 cards run" in English
       and is outright ungrammatical in Finnish, Swedish, German and Italian
       at n = 1 — the commonest rail on the first day of the routine. Eight
       panels independently reached for this shape; the English took it too. */
    runDoneAria:  { en: "Cards run: {n}. The beetle is on row {r}, column {c}.", de: "Die Schiene ist zu Ende. Karten: {n}. Der Käfer steht in Zeile {r}, Spalte {c}.", fr: "Cartes exécutées : {n}. Le scarabée est ligne {r}, colonne {c}.", es: "Tarjetas leídas: {n}. El escarabajo está en la fila {r}, columna {c}.", pt: "O trilho rodou até o fim. Cartões: {n}. O besouro está na linha {r}, coluna {c}.", it: "Carte eseguite: {n}. Lo scarabeo è sulla riga {r}, colonna {c}.", nl: "Uitgevoerd, aantal kaarten: {n}. De kever staat op rij {r}, kolom {c}.", sv: "Rälsen kördes: {n} kort. Skalbaggen står på rad {r}, kolumn {c}.", da: "{n} kort er kørt. Billen står på række {r}, kolonne {c}.", no: "{n} kort er kjørt. Billen står på rad {r}, kolonne {c}.", fi: "Kortteja ajettu: {n}. Kuoriaisen paikka: rivi {r}, sarake {c}." },
    printNote:    { en: "The beetle only moves along the line its nose points down — a step forward, or a step back the way it came. To reach a square that is not on that line, turn it first. A turn card leaves it on the same square — and changes what every card after it will do.", de: "Der Käfer geht nur vorwärts oder rückwärts: vorwärts dorthin, wohin seine Nase zeigt, rückwärts genau von dort weg. Alle anderen Felder erreicht er erst, wenn ihr ihn dreht. Eine Drehung lässt ihn auf demselben Feld stehen – und ändert trotzdem, was jede Karte danach bedeutet.", fr: "Le scarabée avance ou recule, toujours tout droit. Pour l’amener sur une case qui n’est ni devant lui ni derrière lui, faites-le d’abord tourner. Une carte « tourner » ne lui fait pas changer de case — mais elle change tout ce qui vient après.", es: "El escarabajo solo avanza o retrocede por la línea hacia donde mira. Para llegar a una casilla que queda fuera de esa línea, primero hay que girarlo. Las dos tarjetas que lo hacen girar lo dejan en la misma casilla y, aun así, cambian todo lo que venga después. La izquierda y la derecha son siempre las del escarabajo, no las nuestras.", pt: "O besouro só anda para a frente ou para trás, na direção em que está olhando. Para alcançar as outras casas, vire o besouro primeiro. Um cartão de virar não tira o besouro da casa — mas muda todos os passos que vêm depois.", it: "Lo scarabeo si muove solo lungo la linea dove guarda: un passo avanti o un passo indietro. Per raggiungere una casella che non sta su quella linea, prima fallo girare. Una carta che lo fa girare lo lascia sulla stessa casella — e cambia tutto quello che succede dopo.", nl: "De kever zet alleen stappen langs de lijn waar zijn kop naartoe wijst: vooruit, of achteruit dezelfde lijn terug. Wil je hem op een vakje krijgen dat niet op die lijn ligt, draai hem dan eerst. Een draaikaart laat hem op hetzelfde vakje staan — en verandert alles wat daarna komt.", sv: "Skalbaggen går bara framåt eller bakåt längs den linje nosen pekar ut. Ska den till en ruta som nosen inte pekar mot måste ni vrida den först. Ett kort som vrider flyttar den inte alls — men varje kort efter det pekar åt ett nytt håll.", da: "Billen går kun frem eller tilbage: frem den vej næsen peger, tilbage den modsatte vej. Alle andre felter kan den kun nå ved at dreje først. Et drejekort flytter den ikke fra feltet — men det ændrer alt det, den gør bagefter.", no: "Billen går bare framover eller bakover. Nesa bestemmer hvilken vei det er. Skal den til en rute nesa ikke peker mot, må den snu først. Et snukort lar billen bli stående på samme rute – og forandrer hva hvert eneste kort etter det kommer til å gjøre.", fi: "Kuoriainen astuu vain eteenpäin tai taaksepäin samaa linjaa pitkin, jonka sen pää määrää. Muihin ruutuihin se pääsee vasta käännöksen jälkeen. Käännöskortti jättää sen samaan ruutuun — ja muuttaa sen, mihin jokainen sitä seuraava kortti vie." },
    printFirst:   { en: "First run", de: "Erster Lauf", fr: "Premier essai", es: "Primera pasada", pt: "Primeira vez", it: "La prima volta", nl: "Eerste keer", sv: "Första omgången", da: "Første tur", no: "Første gang", fi: "Ensimmäinen ajo" },
    printSecond:  { en: "Second run — change one card", de: "Zweiter Lauf – eine Karte ändern", fr: "Deuxième essai — changez une seule carte", es: "Segunda pasada — cambia una tarjeta", pt: "Segunda vez — troque um cartão", it: "La seconda volta — cambia una carta sola", nl: "Tweede keer — verander één kaart", sv: "Andra omgången — byt ett kort", da: "Anden tur — byt ét kort", no: "Andre gang – bytt ett kort", fi: "Toinen ajo — vaihda yksi kortti" },
    printName:    { en: "Name", de: "Name", fr: "Prénom", es: "Nombre", pt: "Nome", it: "Nome", nl: "Naam", sv: "Namn", da: "Navn", no: "Navn", fi: "Nimi" },
    printCut:     { en: "Cut out the cards", de: "Karten ausschneiden", fr: "Découpez les cartes", es: "Recorta las tarjetas", pt: "Recorte os cartões", it: "Ritaglia le carte", nl: "Kaarten uitknippen", sv: "Klipp ut korten", da: "Klip kortene ud", no: "Klipp ut kortene", fi: "Leikkaa kortit irti" }
  },

  STORE_KEY: 'lcs:arrow-strip:v2',
  ENT_TRUST_DAYS: 14,

  defaults: {},
  settings: [],

  premium: false,
  premiumKnown: false,

  MATS: [4, 6, 8],
  DEFAULT_MAT: 6,
  MAX_RAIL: 12,
  CARDS: ['F', 'B', 'L', 'R'],

  /* ⚠ THE CYCLE ORDER IS THE TRAY ORDER PLUS AN EMPTY STATE. F and B
     adjacent, then the two turns adjacent, then out — so the gesture
     rehearses the grouping the tray already teaches, and DELETE LIVES
     INSIDE THE CYCLE. There is no destructive gesture in this tool: keep
     tapping and the card comes back. */
  CYCLE: ['F', 'B', 'L', 'R', ''],

  /* ⚠ INDEXED BY HEADING ALONE. There is no function in this file that
     takes a direction as an argument — refusal 2. 0 is the way the beetle
     faces at rest; the names of the four rows are deliberately absent,
     because naming them is treasure-hunt's territory. */
  DR: [-1, 0, 1, 0],
  DC: [0, 1, 0, -1],

  /* =================================================================
     THE MODEL — pure, total, immutable. No DOM, no locale, no
     Math.random, no Date.
     ================================================================= */

  newState: function () {
    var n = this.DEFAULT_MAT;
    return {
      n: n,
      pose: { r: n - 1, c: 0, h: 0 },
      rail: [],
      /* ⚠ THE RAIL THAT WAS RUN, not a boolean. The first cut carried
         `ran:true` and derived the trail from the LIVE rail — so editing
         a card silently redrew the old trail as though you had run the
         new one, and the ghost came out identical to the new run, which
         is invention 2 not working AT ALL. */
      ranRail: null,
      ghost: null,
      eye: 'mat'
    };
  },

  _clone: function (st) {
    var s = st || this.newState();
    return {
      n: s.n,
      pose: { r: s.pose.r, c: s.pose.c, h: s.pose.h },
      rail: s.rail.slice(),
      ranRail: s.ranRail ? s.ranRail.slice() : null,
      ghost: s.ghost ? s.ghost.map(function (p) { return { r: p.r, c: p.c, h: p.h }; }) : null,
      eye: s.eye
    };
  },

  _onMat: function (n, r, c) { return r >= 0 && r < n && c >= 0 && c < n; },

  /* ⚠ A BLOCKED MOVE LEAVES THE POSE UNCHANGED. It never bounces and it
     never wraps — wrapping would make the formal inverse tidy again and
     it is refused, because a beetle does not leave one edge and appear at
     the other. "It is up against the side" is a state of the mat, not an
     error. */
  applyCard: function (pose, card, n) {
    var p = { r: pose.r, c: pose.c, h: pose.h };
    if (!p || typeof card !== 'string') return p;
    if (card === 'L') { p.h = (p.h + 3) % 4; return p; }
    if (card === 'R') { p.h = (p.h + 1) % 4; return p; }
    var d = (card === 'F') ? 1 : (card === 'B') ? -1 : 0;
    if (!d) return p;
    var nr = p.r + this.DR[p.h] * d, nc = p.c + this.DC[p.h] * d;
    if (!this._onMat(n, nr, nc)) return p;
    p.r = nr; p.c = nc;
    return p;
  },

  /* ⚠ `rail && rail.slice` IS NOT AN ARRAY TEST — a string has .slice too,
     and 'x'.slice() then has no .reverse. Array.isArray or nothing. */
  _cards: function (rail) { return Array.isArray(rail) ? rail : []; },

  /* the whole run as a pure function: pose sequence, start included */
  run: function (pose, rail, n) {
    var out = [{ r: pose.r, c: pose.c, h: pose.h }], i, cur = out[0];
    var cards = this._cards(rail);
    for (i = 0; i < cards.length; i++) {
      cur = this.applyCard(cur, cards[i], n);
      out.push({ r: cur.r, c: cur.c, h: cur.h });
    }
    return out;
  },

  /* did any card in this rail get refused by an edge? */
  blocked: function (pose, rail, n) {
    return this.blockedAt(pose, rail, n).length > 0;
  },

  /* ⭐ WHICH cards were refused — D6. `blocked()` answered "was there
     one", which is not enough to point at the card, and pointing at the
     card is the whole teaching moment. */
  blockedAt: function (pose, rail, n) {
    var path = this.run(pose, rail, n), i, out = [];
    var cards = this._cards(rail);
    for (i = 0; i < cards.length; i++) {
      if ((cards[i] === 'F' || cards[i] === 'B') &&
          path[i].r === path[i + 1].r && path[i].c === path[i + 1].c) out.push(i);
    }
    return out;
  },

  /* reverse the order and invert each card — F<->B, L<->R.
     ⚠ NOT WIRED TO ANY CONTROL — refusal 9. It exists for A2. */
  inverseRail: function (rail) {
    var map = { F: 'B', B: 'F', L: 'R', R: 'L' };
    var cards = this._cards(rail).slice();
    return cards.reverse().map(function (c) { return map[c] || c; });
  },

  /* ⭐ INSERT AT THE CARET — so "put another forward after the third card"
     is two taps and never a rebuild of the tail. Appending is
     `insertCard(st, rail.length, card)`; build #1's separate `addCard` is
     gone, because ONE insertion primitive is one thing to prove. */
  insertCard: function (st, i, card) {
    var s = this._clone(st);
    if (this.CARDS.indexOf(card) === -1) return s;
    if (s.rail.length >= this.MAX_RAIL) return s;
    var k = Math.round(Number(i));
    if (!(k >= 0)) k = 0;
    if (k > s.rail.length) k = s.rail.length;
    s.rail.splice(k, 0, card);
    return s;
  },

  setCard: function (st, i, card) {
    var s = this._clone(st);
    if (this.CARDS.indexOf(card) === -1) return s;
    if (!(i >= 0 && i < s.rail.length)) return s;
    s.rail[i] = card;
    return s;
  },

  /* ⭐ THE ONE GESTURE THE ROUTINE NEEDS — D4. Tap a place, it advances
     F→B→L→R→out→F. The rail LENGTH is fixed for four of the five steps,
     which is what makes the ghost comparison honest: a mid-rail edit must
     shift CELLS, not rescale a journey. */
  /* ⚠ IT GOES THROUGH setCard AND removeCard, NEVER THROUGH THE ARRAY.
     My first cut of this function spliced and assigned in place — which
     left `setCard` and `removeCard` defined and called by nothing, i.e.
     it reproduced the very defect this rebuild exists to fix, in the very
     function that fixes it. A17 caught it. One place mutates a slot. */
  cycleCard: function (st, i) {
    if (!(i >= 0 && i < (st && st.rail ? st.rail.length : 0))) return this._clone(st);
    var k = this.CYCLE.indexOf(st.rail[i]);
    var next = this.CYCLE[(k < 0 ? 0 : k + 1) % this.CYCLE.length];
    return next ? this.setCard(st, i, next) : this.removeCard(st, i);
  },

  removeCard: function (st, i) {
    var s = this._clone(st);
    if (!(i >= 0 && i < s.rail.length)) return s;
    s.rail.splice(i, 1);
    return s;
  },

  removeLast: function (st) {
    var s = this._clone(st);
    if (!s.rail.length) return s;
    s.rail.pop();
    return s;
  },

  clearRail: function (st) {
    var s = this._clone(st);
    s.rail = [];
    s.ranRail = null;
    s.ghost = null;
    return s;
  },

  /* ⭐ THE START IS A POSE THE TEACHER OWNS — free, and it was not before.
     Build #1 hard-coded (n-1, 0, 0) or took the start from the paid Mat
     Book, so a free teacher's beetle lived in the bottom-left corner of
     three mats forever. "Start it here" is the first thing a Grade 1
     teacher says. The RAIL survives — the plan is still the plan — but
     the run does not, because it happened somewhere else. */
  setStart: function (st, r, c) {
    var s = this._clone(st);
    var rr = Math.round(Number(r)), cc = Math.round(Number(c));
    if (!this._onMat(s.n, rr, cc)) return s;
    if (rr === s.pose.r && cc === s.pose.c) return s;
    s.pose = { r: rr, c: cc, h: s.pose.h };
    s.ranRail = null; s.ghost = null;
    return s;
  },

  turnStart: function (st) {
    var s = this._clone(st);
    s.pose = { r: s.pose.r, c: s.pose.c, h: (s.pose.h + 1) % 4 };
    s.ranRail = null; s.ghost = null;
    return s;
  },

  /* ⚠ RUNNING KEEPS THE PREVIOUS RUN AS A GHOST — invention 2. The ghost
     is computed from the rail that was RUN LAST TIME (`ranRail`), never
     from the rail in front of you now; computing it from the live rail
     draws the new run twice and the invention silently does nothing. */
  doRun: function (st) {
    var s = this._clone(st);
    if (!s.rail.length) return s;
    if (s.ranRail && s.ranRail.length) s.ghost = this.run(s.pose, s.ranRail, s.n);
    s.ranRail = s.rail.slice();
    return s;
  },

  toggleEye: function (st) {
    var s = this._clone(st);
    s.eye = s.eye === 'mat' ? 'beetle' : 'mat';
    return s;
  },

  setMat: function (st, n) {
    var s = this._clone(st);
    var v = Math.round(Number(n));
    if (this.MATS.indexOf(v) === -1) return s;
    if (v === s.n) return s;
    s.n = v;
    s.pose = { r: v - 1, c: 0, h: 0 };
    s.rail = [];
    s.ranRail = null;
    s.ghost = null;
    return s;
  },

  setPose: function (st, n, r, c, h) {
    var s = this._clone(st);
    var v = Math.round(Number(n));
    if (this.MATS.indexOf(v) === -1) return s;
    var rr = Math.round(Number(r)), cc = Math.round(Number(c)), hh = Math.round(Number(h));
    if (!this._onMat(v, rr, cc)) return s;
    if (!(hh >= 0 && hh <= 3)) return s;
    s.n = v;
    s.pose = { r: rr, c: cc, h: hh };
    s.rail = []; s.ranRail = null; s.ghost = null;
    return s;
  },

  /* the path currently on screen — OF THE RUN THAT HAPPENED, never of the
     rail as it stands now. Editing a card must not silently redraw the
     trail; that is the whole point of build-then-run. */
  path: function (st) {
    var s = st || this.newState();
    return (s.ranRail && s.ranRail.length)
      ? this.run(s.pose, s.ranRail, s.n)
      : [{ r: s.pose.r, c: s.pose.c, h: s.pose.h }];
  },

  endPose: function (st) {
    var p = this.path(st);
    return p[p.length - 1];
  },

  /* ---- THE TRAIL GEOMETRY, and it is a model concern ----------------
     ⭐⭐ D1's OTHER HALF. A trail that revisits a square drew ONE line in
     build #1, so [F,F,B,B] — the first rail most children build —
     rendered identically to [F,F] and the tool looked broken at the exact
     moment it should be most interesting. Every vertex is offset
     perpendicular to travel, to the traveller's RIGHT, by an exact mitre.
     At a 180 degree reversal the mitre degenerates and the vertex is
     pushed FORWARD instead, which separates the outbound and return lanes
     by 2*delta — so a U-turn reads as a racetrack and a crossing is an
     explicit X. Pure arithmetic, so the gate can prove it. */
  positions: function (path) {
    var out = [], i;
    for (i = 0; i < path.length; i++) {
      var q = { r: path[i].r, c: path[i].c };
      if (!out.length || out[out.length - 1].r !== q.r || out[out.length - 1].c !== q.c) out.push(q);
    }
    return out;
  },

  TRAIL_DELTA: 0.115,

  trailPoints: function (path) {
    var Q = this.positions(path), i, out = [];
    var d = this.TRAIL_DELTA;
    if (!Q.length) return out;
    var P = Q.map(function (q) { return { x: q.c + 0.5, y: q.r + 0.5 }; });
    if (P.length === 1) return [{ x: P[0].x, y: P[0].y }];
    function unit(a, b) {
      var dx = b.x - a.x, dy = b.y - a.y, m = Math.sqrt(dx * dx + dy * dy) || 1;
      return { x: dx / m, y: dy / m };
    }
    /* y-down SVG: the traveller's right is (-vy, vx) */
    function right(v) { return { x: -v.y, y: v.x }; }
    for (i = 0; i < P.length; i++) {
      var a = i > 0 ? unit(P[i - 1], P[i]) : null;
      var b = i < P.length - 1 ? unit(P[i], P[i + 1]) : null;
      var u = a ? right(a) : right(b);
      var w = b ? right(b) : right(a);
      var dot = u.x * w.x + u.y * w.y;
      var off;
      if (1 + dot < 1e-6) {
        /* a reversal — push forward along the inbound heading */
        var f = a || b;
        off = { x: d * f.x, y: d * f.y };
      } else {
        off = { x: d * (u.x + w.x) / (1 + dot), y: d * (u.y + w.y) / (1 + dot) };
      }
      out.push({ x: P[i].x + off.x, y: P[i].y + off.y });
    }
    return out;
  },

  /* ⭐ WHERE THE TURNS HAPPENED — one entry per turn, so [L,L,L,L] draws
     four quarter-arcs on one square, i.e. a full circle on one square,
     which is the single most teachable image this tool can produce and in
     build #1 drew nothing whatsoever.
     ⚠ DERIVED FROM THE POSE PATH, NOT FROM THE RAIL. The ghost is stored
     as a path and the rail that produced it is gone, so a rail-based
     version could not mark the ghost's turns at all — and the ghost is
     half of invention 2. A turn is: the square did not change and the
     heading did. */
  pivotsFromPath: function (path) {
    var out = [], i;
    if (!Array.isArray(path)) return out;
    for (i = 0; i + 1 < path.length; i++) {
      var a = path[i], b = path[i + 1];
      if (a.r === b.r && a.c === b.c && a.h !== b.h) {
        var d = ((b.h - a.h) % 4 + 4) % 4;
        out.push({ r: a.r, c: a.c, h: a.h, dir: d === 1 ? 1 : -1, i: i });
      }
    }
    return out;
  },

  /* =================================================================
     ENTITLEMENT — the pattern from pattern-bench.js.
     ⚠ UNKNOWN IS PESSIMISTIC (no `&& premiumKnown` on a control gate),
     and locking a control is not enough: the state it produced must be
     reset once we actually know. See _sync().
     ================================================================= */
  _loadStore: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
    if (!s || typeof s !== 'object') s = {};
    if (!s.v) s.v = 2;
    if (!Array.isArray(s.saved)) s.saved = [];
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
      self._later();
    };
    if (!token) { self.premium = false; self.premiumKnown = true; self._later(); return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; self._later(); return; }
        var tier = j.user && j.user.subscriptionTier, sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        self._later();
      })
      .catch(trustCache);
  },

  /* ⚠ A NETWORK CALLBACK MUST NOT REPAINT MID-FLIGHT. _fetchMats and
     _fetchEntitlement both land whenever they land, and a repaint during
     a stepped run destroys the beetle in the middle of its journey.
     Queue behind the run. */
  _later: function () {
    var self = this;
    if (!this._els) return;
    if (this._running) { this._pending = true; return; }
    this._sync();
  },

  /* ---- THE MAT BOOK. Locale-NEUTRAL: a mat is a size and a start pose,
     and it carries no words in any language. -------------------------
     ⚠ THE FALLBACK CARRIES THE FREE MATS INLINE, never an empty array. An
     empty fallback means a 404 on the book turns the Mat Book chip into a
     dead control for a subscriber. A 404 must degrade to the FREE TIER,
     not to nothing. */
  FALLBACK_MATS: {
    version: 1, freeMax: 3, premiumMax: 60,
    mats: [
      { id: 'm4-01', n: 4, r: 3, c: 0, h: 0, free: true },
      { id: 'm6-01', n: 6, r: 5, c: 0, h: 0, free: true },
      { id: 'm6-02', n: 6, r: 2, c: 2, h: 1, free: true }
    ]
  },

  _fetchMats: function () {
    var self = this;
    fetch('/mini-tools/arrow-strip-mats.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_MATS; })
      .then(function (d) {
        self.data = (d && d.mats && d.mats.length) ? d : self.FALLBACK_MATS;
        self._later();
      });
  },

  /* locked mats are ABSENT from the array, never merely hidden. Kept mats
     ride at the front, because a teacher who saved one wants it first. */
  matsFor: function () {
    var all = (this.data && this.data.mats) || [], out = [], i;
    if (this.premium) {
      var saved = (this._store && this._store.saved) || [];
      for (i = 0; i < saved.length; i++) out.push(saved[i]);
    }
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    return out;
  },

  _matKey: function (m) { return m.n + ':' + m.r + ':' + m.c + ':' + m.h; },

  isKept: function () {
    var saved = (this._store && this._store.saved) || [], s = this.st, i;
    var k = this._matKey({ n: s.n, r: s.pose.r, c: s.pose.c, h: s.pose.h });
    for (i = 0; i < saved.length; i++) if (this._matKey(saved[i]) === k) return i;
    return -1;
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectArrowStripCSS();
    injectArrowStripSymbols();
    /* ⭐⭐ THE 422px UNPIN — D8. See the stylesheet for the full chain.
       Two classes, and the CSS scopes EXACTLY these two: a rule scoped to
       a class the JS never adds is present and inert, which is what
       shipped last time. The one-line rollback is removing them. */
    document.documentElement.classList.add('arw-html');
    document.body.classList.add('arw-wide');
    /* ⭐⭐ THE HEIGHT GUARD IS THE PARENT PAGE'S VIEWPORT — never `vh`, never
       `vmin`, and NOT `screen.availHeight`.
       vh and vmin resolve against the IFRAME, whose height is the content
       height, so either one closes the very loop the unpin above exists to
       open. My first cut therefore reached for `screen.availHeight`, which
       is outside the layout — and the sweep MEASURED the result: the mat
       came out 372px at 2560 wide, byte-identical to its 1024 size, with
       every gate green. Headless Chrome reports availHeight 600 whatever
       the viewport is, so the "guard" had quietly become the binder and I
       had rebuilt the frozen-instrument defect in a new dress. A signal
       the gate cannot see is a signal I cannot verify.
       The parent's `innerHeight` is the real browser viewport, it is
       same-origin (the iframe and its page are both this site), and it is
       NOT part of this tool's layout — the tool cannot resize the top
       window. Cross-origin embeds throw; those fall back to the iframe's
       own height, which is the one case where nothing better exists.
       ⚠ 380 is the MEASURED chrome, not a guess: the sweep failed FITS at
       768x900 by 10px with a 558px mat, i.e. 352px of chrome at that tier,
       and the wide tiers carry bigger cards. Re-measured by the sweep
       after every change to it. */
    this._sizeCap = function () {
      var vh = 0;
      try { vh = (window.parent && window.parent !== window) ? window.parent.innerHeight : window.innerHeight; } catch (_) { vh = 0; }
      if (!vh) { try { vh = window.innerHeight || 0; } catch (_) {} }
      vh = Math.max(560, Math.min(vh || 900, 2400));
      /* ⚠ JS SUPPLIES THE VIEWPORT; CSS SUBTRACTS THE CHROME, PER TIER.
         A single JS constant cannot know which layout is in force — the
         stacked one puts the card tray BELOW the mat and costs ~90px more
         than the side-by-side one — so a lone `vh - 380` overshot FITS at
         every single sweep cell. `--arw-chrome` is measured per tier by
         the sweep and lives beside the tier that owns it. */
      document.documentElement.style.setProperty('--arw-vh', vh + 'px');
    };
    this._sizeCap();
    this._onResize = this._sizeCap.bind(this);
    window.addEventListener('resize', this._onResize);

    this._store = this._loadStore();
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this.st = this.newState();
    this._timers = [];
    this._matIdx = -1;
    this._caret = 0;
    this._deg = 0;
    this._running = false;
    this._blocked = [];
    this._fetchMats();
    this._fetchEntitlement();
  },

  reset: function () {
    this._stopRun();
    this.st = this.newState();
    this._matIdx = -1;
    this._matId = null;
    this._caret = 0;
    this._deg = 0;
    this._blocked = [];
    this._sync();
  },

  destroy: function () {
    this._stopRun();
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
    if (this._onResize) { window.removeEventListener('resize', this._onResize); this._onResize = null; }
    /* ⚠ D20 — build #1 added the class and never removed it, so in the
       embed shell it leaked onto every subsequent tool. */
    document.documentElement.classList.remove('arw-html');
    document.body.classList.remove('arw-wide', 'arw-paid');
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  /* =================================================================
     RENDER — BUILD ONCE, THEN SYNC.
     ⚠⚠ THIS IS THE D3 FIX AND IT IS ARCHITECTURAL. Build #1 did
     `stage.innerHTML=''` on every interaction and created the beetle WITH
     its final position inline, so a CSS transition had nothing to
     transition from and NOTHING IN THE TOOL EVER ANIMATED — including the
     beetle's-eye rotation, which is the entire cognitive payload of that
     control. It also dropped keyboard focus to <body> on every single
     tap. The frame, the beetle and the trails are now persistent nodes
     that outlive a state change.
     ================================================================= */
  render: function () {
    if (this._els && this._wrap && this._wrap.parentNode === this.api.stage) { this._sync(); return; }
    this._build();
    this._sync();
  },

  _build: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'arw-wrap');
    this._wrap = wrap;
    var els = this._els = {};

    /* ---- the bar ---- */
    var bar = api.el('div', 'arw-bar');
    var sizes = api.el('div', 'arw-sizes');
    sizes.setAttribute('role', 'radiogroup');
    /* ⚠ ITS OWN LABEL. Build #1 put `matLabel` on BOTH this group and the
       grid, so a screen-reader user heard "Mat, group" twice and neither
       said which one chose the SIZE. Nine of the ten panels found it. */
    sizes.setAttribute('aria-label', api.t('matSizeLabel'));
    els.sizes = [];
    this.MATS.forEach(function (n) {
      var b = api.el('button', 'arw-chip arw-size');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.dataset.fk = 'size' + n;
      b.textContent = n + '×' + n;   /* a numeral and a multiplication sign: no word */
      b.addEventListener('click', function () {
        if (self._running) return;
        self.st = self.setMat(self.st, n);
        self._matId = null; self._matIdx = -1; self._caret = 0; self._blocked = [];
        self._snapDeg();
        self._sync();
      });
      sizes.appendChild(b);
      els.sizes.push(b);
    });
    bar.appendChild(sizes);

    /* ⭐ THE BEETLE'S-EYE TOGGLE — invention 3, and see _sync for the
       geometry that build #1 got wrong twice. */
    els.eye = api.el('button', 'arw-chip');
    els.eye.type = 'button';
    els.eye.dataset.fk = 'eye';
    els.eye.addEventListener('click', function () {
      if (self._running) return;
      self.st = self.toggleEye(self.st);
      self._sync();
    });
    bar.appendChild(els.eye);

    els.book = api.el('button', 'arw-chip');
    els.book.type = 'button';
    els.book.dataset.fk = 'book';
    els.book.addEventListener('click', function () { self._pageBook(); });
    bar.appendChild(els.book);

    els.keep = api.el('button', 'arw-chip');
    els.keep.type = 'button';
    els.keep.dataset.fk = 'keep';
    els.keep.addEventListener('click', function () { self._keepMat(); });
    bar.appendChild(els.keep);

    els.print = api.el('button', 'arw-chip');
    els.print.type = 'button';
    els.print.dataset.fk = 'print';
    els.print.addEventListener('click', function () {
      if (!self.premium) { self._showGate(); return; }
      window.print();
    });
    bar.appendChild(els.print);
    wrap.appendChild(bar);

    /* ⚠ THE HINT SITS ABOVE THE MAT and its height is LOCKED. Build #1
       reserved 20px at 15px type against a three-line German string, so
       the mat jumped 21px the instant a child tapped the first card. */
    els.hint = api.el('div', 'arw-hint');
    els.hint.setAttribute('aria-hidden', 'true');
    wrap.appendChild(els.hint);

    /* ---- the mat ---- */
    var main = api.el('div', 'arw-main');
    var scroll = api.el('div', 'arw-scroll');
    var box = api.el('div', 'arw-mat');
    els.box = box;
    box.setAttribute('role', 'img');

    var frame = api.el('div', 'arw-frame');
    els.frame = frame;

    var grid = api.el('div', 'arw-grid');
    els.grid = grid;
    grid.addEventListener('click', function (ev) {
      if (self._running) return;
      var cell = ev.target.closest ? ev.target.closest('.arw-cell') : null;
      if (!cell || !grid.contains(cell)) return;
      var idx = Array.prototype.indexOf.call(grid.children, cell);
      if (idx < 0) return;
      var n = self.st.n, r = Math.floor(idx / n), c = idx % n;
      /* ⭐ TAP THE BEETLE'S OWN SQUARE TO TURN IT; tap any other to move
         the start there. Free, wordless, and it breaches nothing — there
         is still no goal, no target and no route. */
      if (r === self.st.pose.r && c === self.st.pose.c) self.st = self.turnStart(self.st);
      else self.st = self.setStart(self.st, r, c);
      self._matId = null; self._blocked = [];
      self._snapDeg();
      self._sync();
      self.api.announce(self._fmt('startAria', { r: self.st.pose.r + 1, c: self.st.pose.c + 1 }));
    });
    frame.appendChild(grid);

    /* the home brackets live in their OWN svg, not inside .arw-trails —
       print hides the trails wholesale (the trail is the answer) but the
       printed mat SHOULD show where to start. */
    els.home = svgEl('svg', { 'class': 'arw-home', 'aria-hidden': 'true' });
    frame.appendChild(els.home);

    els.trails = svgEl('svg', { 'class': 'arw-trails', 'aria-hidden': 'true' });
    frame.appendChild(els.trails);

    /* ⭐⭐ THE BEETLE RIDES INSIDE THE FRAME IN BOTH VIEWS — D5, and the
       fix DELETES the special case rather than adding geometry. In
       beetle view the frame carries rotate(-90h) and the beetle carries
       rotate(+90h); the two cancel exactly, so it renders nose to the top
       of the screen ON ITS TRUE SQUARE, with the whole mat still inside
       its own box. Build #1 pinned it to the box centre while the frame
       turned about the mat centre — and since every mat is even-sided
       there is no centre square, so it stood on the corner of four
       squares in every single state. */
    els.beetle = api.el('div', 'arw-beetle');
    els.beetle.setAttribute('aria-hidden', 'true');
    /* ⚠⚠ A BARE <use> INSIDE A <div> RENDERS NOTHING. It needs an <svg>
       root to live in. I shipped the div version and THE BEETLE WAS SIMPLY
       NOT ON THE MAT — on a tool whose entire subject is a beetle — while
       225 browser assertions stayed green, because every one of them
       measures the div's BOUNDING BOX and a div with a CSS width still has
       one. Reading the 768 render myself is what found it. That step is in
       the definition of done for exactly this reason. */
    var bsvg = svgEl('svg', { viewBox: '0 0 100 100' });
    bsvg.appendChild(useEl('#arw-bug'));
    els.beetle.appendChild(bsvg);
    frame.appendChild(els.beetle);

    box.appendChild(frame);
    scroll.appendChild(box);
    main.appendChild(scroll);

    /* ---- the tray: four cards you can pick up ---- */
    /* no role and no label: four self-describing buttons, and an unnamed
       group is noise to a screen reader. Build #1 labelled this "Mat". */
    var tray = api.el('div', 'arw-tray');
    els.tray = [];
    /* ⭐ THE GROUPING IS THE LEGEND. Two cards move the beetle, two do
       not, and a hairline gap between the pairs says so with no word in
       any of eleven languages. A separate worded legend would repeat the
       faces AND breach the no-words law. */
    this.CARDS.forEach(function (k, ix) {
      var b = api.el('button', 'arw-card' + (ix === 2 ? ' arw-cardgap' : ''));
      b.type = 'button';
      b.dataset.fk = 'tray' + k;
      b.appendChild(cardFace(k));
      b.setAttribute('aria-label', api.t(self.CARD_KEY[k]));
      b.addEventListener('click', function () {
        if (self._running) return;
        if (self.st.rail.length >= self.MAX_RAIL) return;
        var at = Math.max(0, Math.min(self._caret, self.st.rail.length));
        self.st = self.insertCard(self.st, at, k);
        self._caret = at + 1;
        self._blocked = [];
        self._sync();
        self.api.announce(self._fmt('railSlotAria', { i: at + 1, card: self.api.t(self.CARD_KEY[k]) }));
      });
      tray.appendChild(b);
      els.tray.push(b);
    });
    main.appendChild(tray);
    wrap.appendChild(main);

    /* ---- the rail: ONE LINE, twelve places ---- */
    els.railwrap = api.el('div', 'arw-railwrap');
    /* every place already announces "… in the rail", so the container needs
       no name of its own — and it certainly does not need the mat's. */
    els.rail = api.el('div', 'arw-rail');
    els.railwrap.appendChild(els.rail);
    wrap.appendChild(els.railwrap);

    /* ---- the foot ---- */
    var foot = api.el('div', 'arw-foot');
    els.run = api.el('button', 'arw-chip arw-go');
    els.run.type = 'button';
    els.run.dataset.fk = 'run';
    els.run.addEventListener('click', function () { self._playRun(); });
    foot.appendChild(els.run);

    els.back = api.el('button', 'arw-chip');
    els.back.type = 'button';
    els.back.dataset.fk = 'back';
    els.back.addEventListener('click', function () {
      if (self._running) return;
      self.st = self.removeLast(self.st);
      self._caret = self.st.rail.length;
      self._blocked = [];
      self._sync();
    });
    foot.appendChild(els.back);

    els.clear = api.el('button', 'arw-chip');
    els.clear.type = 'button';
    els.clear.dataset.fk = 'clear';
    els.clear.addEventListener('click', function () {
      if (self._running) return;
      self.st = self.clearRail(self.st);
      self._caret = 0;
      self._blocked = [];
      self._sync();
    });
    foot.appendChild(els.clear);

    /* ⚠ TWO NODES, NEVER A CONCATENATION — the recorded localisation
       smell, and joining them makes the one actionable thing unclickable.
       ⚠ AND ITS HEIGHT IS ALWAYS RESERVED. Injecting it into flow shoved
       the whole apparatus down 44px and then vanished, which is a
       recorded defect from a sibling. */
    els.gate = api.el('div', 'arw-gate');
    var gs = api.el('span');
    els.gateText = gs;
    var ga = document.createElement('a');
    els.gateLink = ga;
    ga.href = '/' + api.lang + '/pricing?from=tool-arrow-strip';
    ga.target = '_top';
    ga.rel = 'noopener';
    foot.appendChild(els.gate);
    els.gate.appendChild(gs);
    els.gate.appendChild(ga);
    wrap.appendChild(foot);

    api.stage.appendChild(wrap);
    this._built = true;
  },

  CARD_KEY: { F: 'cardFwd', B: 'cardBack', L: 'cardTurnL', R: 'cardTurnR' },

  _fmt: function (key, vals) {
    var s = this.api.t(key);
    Object.keys(vals).forEach(function (k) { s = s.split('{' + k + '}').join(String(vals[k])); });
    return s;
  },

  /* quarter turns to its own RIGHT since the start pose — 0..3 */
  _quarters: function (e) { return ((e.h - this.st.pose.h) % 4 + 4) % 4; },

  /* =================================================================
     SYNC — everything that changes, in place.
     ================================================================= */
  _sync: function () {
    var api = this.api, self = this, s = this.st, els = this._els;
    if (!els) return;

    /* ⚠ locking a control is not enough — reset the STATE it produced. If
       we learn the account is free while a premium mat is out, put the
       mat away. */
    if (this.premiumKnown && !this.premium && this._matId) {
      var open = this.matsFor(), i, stillOpen = false;
      for (i = 0; i < open.length; i++) if (open[i].id === this._matId) stillOpen = true;
      if (!stillOpen) { this._matId = null; this._matIdx = -1; this.st = s = this.setMat(this.st, this.DEFAULT_MAT); this._snapDeg(); }
    }
    document.body.classList.toggle('arw-paid', !!this.premium);

    var fk = null;
    try {
      var ae = document.activeElement;
      if (ae && this._wrap.contains(ae) && ae.dataset && ae.dataset.fk) fk = ae.dataset.fk;
    } catch (_) {}

    /* ---- bar ---- */
    els.sizes.forEach(function (b, ix) {
      var on = s.n === self.MATS[ix];
      b.classList.toggle('arw-on', on);
      b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    /* ⚠ THE LABEL IS THE DESTINATION AND THE CHIP IS NEVER LIT. Build #1 did
       both at once — highlighted while reading the name of the view you are
       NOT in — and every panel that mentioned it called it a coin flip. */
    els.eye.textContent = api.t(s.eye === 'beetle' ? 'eyeOffBtn' : 'eyeBtn');

    var pool = this.matsFor();
    els.book.textContent = api.t('matBook') + (this.premium && pool.length ? '  ' + (this._matIdx + 1 > 0 ? this._matIdx + 1 : 1) + '/' + pool.length : '');
    els.book.classList.toggle('arw-locked', !this.premium);
    var kept = this.isKept();
    els.keep.textContent = api.t('keepBtn');
    els.keep.classList.toggle('arw-locked', !this.premium);
    els.keep.classList.toggle('arw-on', this.premium && kept >= 0);
    els.keep.setAttribute('aria-pressed', this.premium && kept >= 0 ? 'true' : 'false');
    els.print.textContent = api.t('printBtn');
    els.print.classList.toggle('arw-locked', !this.premium);

    /* ---- hint: FOUR states. Build #1 branched only on !ranRail, so
       "ran, rail untouched" and "ran, one card changed" showed the same
       line — and the second is the exact instant this tool exists for. */
    var changed = !!(s.ranRail && s.rail.join('') !== s.ranRail.join(''));
    els.hint.textContent = !s.rail.length ? api.t('buildHint')
      : !s.ranRail ? api.t('predictHint')
        : changed ? api.t('changedHint') : api.t('againHint');

    /* ---- mat ---- */
    els.box.style.setProperty('--arw-cols', String(s.n));
    els.box.classList.remove('arw-n4', 'arw-n6', 'arw-n8');
    els.box.classList.add('arw-n' + s.n);
    if (els.grid.childElementCount !== s.n * s.n) {
      els.grid.innerHTML = '';
      for (var k = 0; k < s.n * s.n; k++) {
        var cell = api.el('div', 'arw-cell');
        cell.setAttribute('aria-hidden', 'true');
        els.grid.appendChild(cell);
      }
    }
    var e = this.endPose(s);
    /* ⚠ THE MAT IS role="img" WITH A COMPOSED LABEL. Build #1 marked every
       cell aria-hidden and then put role="group" on the grid, so the mat
       was an EMPTY GROUP and did not exist to assistive tech at all.
       ⭐ AND THE HEADING IS IN IT. Eight panels found that no aria string
       carried the facing, so a screen-reader user got two thirds of the
       pose and could predict nothing — on a tool whose entire subject is
       facing, where a turn card was completely silent. Refusal 1 forbids
       naming a heading, so this is a COUNT OF QUARTER TURNS FROM THE
       START: body-relative, legal, and agreement-free at every value. */
    els.box.setAttribute('aria-label',
      api.t('matLabel') + ' ' + s.n + '×' + s.n + '. ' +
      this._fmt('bodyAria', { r: e.r + 1, c: e.c + 1 }) + ' ' +
      this._fmt('facingAria', { q: this._quarters(e) }));

    this._drawHome();
    this._drawTrails();
    this._placeBeetle(e, false);
    this._frameFor(e);

    /* ---- rail ---- */
    this._buildRail();

    /* ---- foot ---- */
    els.run.textContent = api.t('runBtn');
    /* ⚠ D7 — pressing Run on an unedited rail drew the ghost exactly
       under an identical trail and the screen did not change. Now the
       control and `againHint` agree. */
    els.run.disabled = !s.rail.length || (!!s.ranRail && s.rail.join('') === s.ranRail.join('')) || this._running;
    els.back.textContent = api.t('backBtn');
    els.back.disabled = !s.rail.length || this._running;
    els.clear.textContent = api.t('clearBtn');
    els.clear.disabled = !s.rail.length || this._running;
    els.gateText.textContent = api.t('gateLine');
    els.gateLink.textContent = api.t('unlock');
    els.gate.classList.toggle('arw-on', !!this._gate);

    this._ensureSheet();

    if (fk) {
      try {
        var back = this._wrap.querySelector('[data-fk="' + fk + '"]');
        if (back && !back.disabled) back.focus();
      } catch (_) {}
    }
  },

  /* ---- the rail, rebuilt (cheap, and it never animates) ------------- */
  _buildRail: function () {
    var api = this.api, self = this, s = this.st, rail = this._els.rail;
    rail.innerHTML = '';
    var caret = Math.max(0, Math.min(this._caret, s.rail.length));
    var i;
    for (i = 0; i < this.MAX_RAIL; i++) {
      if (i === caret) rail.appendChild(api.el('span', 'arw-caret'));
      var card = s.rail[i];
      if (card) {
        /* ⚠ A PLAIN <button>. Build #1 put role="listitem" on it, which
           DESTROYS the button role — on the control that deleted. */
        var b = api.el('button', 'arw-place arw-filled');
        b.type = 'button';
        b.dataset.fk = 'slot' + i;
        b.dataset.i = String(i);
        b.appendChild(cardFace(card));
        var num = api.el('span', 'arw-num');
        num.textContent = String(i + 1);
        num.setAttribute('aria-hidden', 'true');
        b.appendChild(num);
        var dots = api.el('span', 'arw-dots');
        dots.setAttribute('aria-hidden', 'true');
        for (var d = 0; d < 4; d++) {
          var dot = api.el('i', this.CARDS[d] === card ? 'arw-on' : '');
          dots.appendChild(dot);
        }
        b.appendChild(dots);
        if (this._blocked.indexOf(i) >= 0) b.classList.add('arw-stopped');
        b.setAttribute('aria-label', this._fmt('railSlotAria', { i: i + 1, card: api.t(this.CARD_KEY[card]) }));
        b.addEventListener('click', (function (ix) {
          return function () {
            if (self._running) return;
            self.st = self.cycleCard(self.st, ix);
            self._caret = Math.min(ix + 1, self.st.rail.length);
            self._blocked = [];
            self._sync();
            var nc = self.st.rail[ix];
            self.api.announce(nc
              ? self._fmt('railSlotAria', { i: ix + 1, card: self.api.t(self.CARD_KEY[nc]) })
              : self._fmt('railEmptyAria', { i: ix + 1 }));
          };
        })(i));
        rail.appendChild(b);
      } else {
        /* ⚠ D16 — build #1 rendered ONE invisible 120x44 spacer for the
           whole empty rail. Twelve real places say capacity, order and
           the entry point in one drawing, with no words. */
        var p = api.el('div', 'arw-place' + (i === s.rail.length ? ' arw-open' : ' arw-next'));
        var n2 = api.el('span', 'arw-num');
        n2.textContent = String(i + 1);
        n2.setAttribute('aria-hidden', 'true');
        p.appendChild(n2);
        p.setAttribute('aria-label', this._fmt('railEmptyAria', { i: i + 1 }));
        rail.appendChild(p);
      }
    }
    /* keep the place you are editing on screen, and drop the fade when the
       whole rail already fits (a cue for a thing that cannot scroll is a
       lie about the apparatus) */
    var open = rail.children[Math.min(caret * 2, rail.children.length - 1)];
    if (open && open.scrollIntoView) { try { open.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch (_) {} }
    this._els.railwrap.classList.toggle('arw-allin', rail.scrollWidth <= rail.clientWidth + 1);
    /* the tray disables at the cap instead of silently swallowing a tap */
    var full = s.rail.length >= this.MAX_RAIL;
    this._els.tray.forEach(function (b) { b.disabled = full || self._running; });
  },

  /* ---- the four corner brackets on the START square ----------------
     ⚠ A RIM MARK, NOT A CENTRE MARK. The start cell is the one cell
     guaranteed to carry the beetle and the trail's first vertex, so
     anything in its middle is permanently occluded. And it must not be a
     star, a flag, a bullseye or a coloured fill: refusal 4 bans the thing
     at the end, and a target is exactly that. */
  _drawHome: function () {
    var s = this.st, n = s.n, host = this._els.home;
    host.setAttribute('viewBox', '0 0 ' + n + ' ' + n);
    host.innerHTML = '';
    var g = svgEl('path', {
      transform: 'translate(' + s.pose.c + ' ' + s.pose.r + ')',
      d: 'M.13 .35V.13H.35 M.65 .13H.87V.35 M.87 .65V.87H.65 M.35 .87H.13V.65',
      fill: 'none', stroke: '#0E5147', 'stroke-width': '.055',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: '.55'
    });
    host.appendChild(g);
    /* the ghosted start POSE — the start is a pose, not a square, and
       heading is the half a child needs to re-run the rail in their head.
       It sits UNDER the live beetle, so when they coincide it is hidden,
       which is exactly when it is redundant. */
    var u = useEl('#arw-bug-s');
    u.setAttribute('x', String(s.pose.c + 0.17));
    u.setAttribute('y', String(s.pose.r + 0.17));
    u.setAttribute('width', '0.66');
    u.setAttribute('height', '0.66');
    u.setAttribute('class', 'arw-homebug');
    u.setAttribute('transform', 'rotate(' + (90 * s.pose.h) + ' ' + (s.pose.c + 0.5) + ' ' + (s.pose.r + 0.5) + ')');
    host.appendChild(u);
  },

  /* ---- the trail, its ghost, its pivots and its chevrons ------------ */
  _drawTrails: function () {
    var s = this.st, n = s.n, host = this._els.trails;
    host.setAttribute('viewBox', '0 0 ' + n + ' ' + n);
    /* ⚠ NOT preserveAspectRatio="none" — the mat is square by
       construction and a skew here would put the trail off the squares. */
    host.innerHTML = '';
    /* draw order: ghost, then start ring, then trail, then chevrons */
    if (s.ghost && s.ghost.length > 1) this._appendRun(host, s.ghost, true);
    var live = this.path(s);
    if (live.length > 1) this._appendRun(host, live, false);
    this._els.trail = host.querySelector('.arw-trail');
  },

  _appendRun: function (host, path, isGhost) {
    var pts = this.trailPoints(path), i;
    var cls = isGhost ? 'arw-ghost' : 'arw-trail';
    if (pts.length > 1) {
      host.appendChild(svgEl('polyline', {
        'class': cls,
        points: pts.map(function (p) { return p.x + ',' + p.y; }).join(' ')
      }));
    }
    /* the start ring — hollow, so start and finish differ in KIND: it
       began empty and ended with the beetle standing in it */
    if (!isGhost) {
      host.appendChild(svgEl('circle', {
        'class': 'arw-startdot', cx: String(pts[0].x), cy: String(pts[0].y), r: '.17'
      }));
    }
    /* ⭐ THE PIVOT ARCS — D1. Without these, half the deck is invisible on
       the thing the tool calls its product. */
    var pv = this.pivotsFromPath(path);
    for (i = 0; i < pv.length; i++) {
      var p = pv[i];
      var cx = p.c + 0.5, cy = p.r + 0.5, rr = 0.30;
      var a0 = -90 + 90 * p.h;              /* the nose, in degrees, y-down */
      var a1 = a0 + 90 * p.dir;
      var x0 = cx + rr * Math.cos(a0 * Math.PI / 180), y0 = cy + rr * Math.sin(a0 * Math.PI / 180);
      var x1 = cx + rr * Math.cos(a1 * Math.PI / 180), y1 = cy + rr * Math.sin(a1 * Math.PI / 180);
      host.appendChild(svgEl('path', {
        'class': isGhost ? 'arw-pivot arw-pivot-ghost' : 'arw-pivot',
        d: 'M' + x0.toFixed(4) + ' ' + y0.toFixed(4) + 'A' + rr + ' ' + rr + ' 0 0 ' +
           (p.dir > 0 ? 1 : 0) + ' ' + x1.toFixed(4) + ' ' + y1.toFixed(4)
      }));
    }
    /* travel-order chevrons at SEGMENT MIDPOINTS. marker-mid puts markers
       at the corners, which is the worst possible place, and marker paint
       inheritance is unreliable. ⚠ Zero-length segments are impossible
       here because trailPoints runs on collapsed positions — atan2(0,0)
       would be undefined. */
    if (!isGhost) {
      for (i = 0; i < pts.length - 1; i++) {
        var ax = pts[i].x, ay = pts[i].y, bx = pts[i + 1].x, by = pts[i + 1].y;
        var th = Math.atan2(by - ay, bx - ax) * 180 / Math.PI + 90;
        host.appendChild(svgEl('path', {
          'class': 'arw-chev',
          transform: 'translate(' + ((ax + bx) / 2).toFixed(4) + ' ' + ((ay + by) / 2).toFixed(4) + ') rotate(' + th.toFixed(2) + ')',
          d: 'M-.11 -.10L0 .01L.11 -.10'
        }));
      }
    }
  },

  /* ---- the beetle ---- */
  _placeBeetle: function (p, animate) {
    var b = this._els.beetle, n = this.st.n;
    if (!animate) b.classList.add('arw-nomove');
    b.style.left = ((p.c + 0.5) / n * 100) + '%';
    b.style.top = ((p.r + 0.5) / n * 100) + '%';
    b.style.transform = 'translate(-50%,-50%) rotate(' + this._deg + 'deg)';
    if (!animate) { void b.offsetWidth; b.classList.remove('arw-nomove'); }
  },

  /* ⚠ AN UNWRAPPED ACCUMULATOR, NEVER h%4. Animating rotate(270deg) ->
     rotate(0deg) spins the beetle 270 degrees BACKWARDS — an R card
     visibly performing an L turn, which is the worst thing this tool
     could show. R always adds 90, L always subtracts 90, and the value is
     allowed to run past 360. Snapped back only when the pose is set
     outright. */
  _snapDeg: function () {
    var h = this.endPose(this.st).h;
    var want = h * 90;
    this._deg = want + 360 * Math.round((this._deg - want) / 360);
  },

  _frameFor: function (p) {
    /* ⭐ ONE CSS ROTATION OF THE REAL MAT — nothing is recomputed in the
       beetle's frame; the layout answers. And it uses the CURRENT heading,
       not the start heading: build #1 used pose.h, which doRun never
       touches, so at the default h:0 the flagship control applied
       rotate(0deg) and THE MAT DID NOT MOVE. */
    var f = this._els.frame;
    if (this.st.eye === 'beetle') {
      var deg = -this._deg;
      f.style.transform = 'rotate(' + deg + 'deg)';
    } else {
      f.style.transform = 'rotate(0deg)';
    }
  },

  /* =================================================================
     THE RUN — D3 and D6. Build, then run, separated in time; and the run
     itself separated into beats, so the RAIL is the object of attention
     rather than a black box that reports an endpoint.
     ================================================================= */
  BEAT: 380,
  HOLD: 50,

  _stopRun: function () {
    this._running = false;
    (this._runTimers || []).forEach(function (t) { clearTimeout(t); });
    this._runTimers = [];
  },

  _playRun: function () {
    var self = this, s = this.st;
    if (this._running || !s.rail.length) return;
    this.st = s = this.doRun(s);
    this._blocked = this.blockedAt(s.pose, s.ranRail, s.n);
    this._running = true;
    this._runTimers = [];

    /* the ghost of the previous run must be the run that was on screen a
       moment ago, drawn WHOLE before the first step — a visual sentence,
       "that was last time", and where invention 2 earns its emphasis */
    this._sync();

    var path = this.run(s.pose, s.ranRail, s.n);
    var cards = s.ranRail.slice();
    var reduced = false;
    try { reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches; } catch (_) {}

    /* phase 0 — rewind. The one legitimate teleport in the tool, and it
       reads as REWIND, which is the correct verb. */
    this._deg = path[0].h * 90;
    this._placeBeetle(path[0], false);
    this._els.trails.classList.add('arw-mid');
    this._els.box.classList.add('arw-running');

    var t = 260;
    var step = function (i) {
      self._runTimers.push(setTimeout(function () {
        if (!self._running) return;
        var places = self._els.rail.querySelectorAll('.arw-place.arw-filled');
        for (var q = 0; q < places.length; q++) places[q].classList.toggle('arw-lit', q === i);
        /* ⚠ THE 50ms HOLD IS BUILD-THEN-RUN RENDERED AS TIME. The class
           reads the card BEFORE the body acts. */
        self._runTimers.push(setTimeout(function () {
          if (!self._running) return;
          var card = cards[i];
          if (card === 'L') self._deg -= 90;
          else if (card === 'R') self._deg += 90;
          var isBlocked = self._blocked.indexOf(i) >= 0;
          if (isBlocked) {
            /* a bump, never a bounce — the model has no rebound. And the
               signal is MOTION, not ink on the mat: an edge tick is a
               wall, and walls are refused. */
            self._els.beetle.classList.add('arw-bump');
            self._els.box.classList.add('arw-edge');
            self._runTimers.push(setTimeout(function () {
              self._els.beetle.classList.remove('arw-bump');
              self._els.box.classList.remove('arw-edge');
            }, 320));
            self.api.announce(self._fmt('blockedAria', { i: i + 1 }));
          }
          self._placeBeetle(path[i + 1], !reduced);
          if (self.st.eye === 'beetle') self._frameFor(path[i + 1]);
        }, self.HOLD));
      }, t + i * self.BEAT));
    };
    for (var i = 0; i < cards.length; i++) step(i);

    this._runTimers.push(setTimeout(function () {
      if (!self._running) return;
      self._running = false;
      self._els.trails.classList.remove('arw-mid');
      self._els.box.classList.remove('arw-running');
      var end = path[path.length - 1];
      self._snapDeg();
      self._sync();
      self.api.announce(self._fmt('runDoneAria', { n: cards.length, r: end.r + 1, c: end.c + 1 }) +
        ' ' + self._fmt('facingAria', { q: self._quarters(end) }));
      if (self._pending) { self._pending = false; self._sync(); }
    }, t + cards.length * this.BEAT + 240));
  },

  /* =================================================================
     THE MAT BOOK + KEEPING A MAT
     ================================================================= */
  _pageBook: function () {
    var self = this;
    if (this._running) return;
    if (!this.premium) { this._showGate(); return; }
    /* ⚠ STEP PAST A MAT THAT WOULD RENDER IDENTICALLY. The book's second
       entry happens to BE the default state, so a plain (i+1) step
       changed nothing on the first press and the chip read as broken. */
    var open = this.matsFor();
    if (!open.length) return;
    var cur = this.st, k, m = null, base = this._matIdx < 0 ? 0 : this._matIdx;
    for (k = 1; k <= open.length; k++) {
      var cand = open[(base + k) % open.length];
      if (cand.n !== cur.n || cand.r !== cur.pose.r || cand.c !== cur.pose.c || cand.h !== cur.pose.h) {
        this._matIdx = (base + k) % open.length;
        m = cand;
        break;
      }
    }
    if (!m) return;
    this._matId = m.id;
    this.st = this.setPose(this.st, m.n, m.r, m.c, m.h);
    this._caret = 0;
    this._blocked = [];
    this._snapDeg();
    this._sync();
  },

  /* ⭐ D12 — "saved mats" was sold, live, in eleven languages, and did not
     exist. It exists now: the current size and start pose, kept in the
     store and paged ahead of the curated set. */
  _keepMat: function () {
    if (this._running) return;
    if (!this.premium) { this._showGate(); return; }
    var s = this.st, at = this.isKept();
    if (at >= 0) this._store.saved.splice(at, 1);
    else this._store.saved.unshift({ id: 'kept-' + this._matKey({ n: s.n, r: s.pose.r, c: s.pose.c, h: s.pose.h }), n: s.n, r: s.pose.r, c: s.pose.c, h: s.pose.h, free: false });
    if (this._store.saved.length > 24) this._store.saved.length = 24;
    this._saveStore();
    this._matIdx = -1;
    this._sync();
  },

  _showGate: function () {
    var self = this;
    this._gate = true;
    this._sync();
    this._after(9000, function () { self._gate = false; if (self._els) self._sync(); });
  },

  /* =================================================================
     ⭐⭐ THE PRINT SHEET — D11, and it is DOUBLE-LOCKED.
     Build #1 gated the chip and left the @media print block UNSCOPED, so
     Ctrl+P handed a free visitor the paid sheet — the fourth time this
     exact defect has shipped in this house. Worse, `.arw-beetle` was not
     in its hide list while the beetle is drawn at endPose, so the free
     sheet printed THE ANSWER, which the block's own comment said must
     never print.
     Two locks now: the subtree is ABSENT from the DOM unless entitled,
     AND every print rule is scoped `body.arw-paid`.
     ⚠ It is a purpose-built sheet, never a restyle of the live DOM. And
     it is a PLANNING sheet: a blank mat with the start pose, the card key
     to cut out, and TWO blank rails — "first go" and "second go, change
     one card" — because two rails is what turns graph paper into a
     worksheet. It is invention 2 in pencil.
     ================================================================= */
  _ensureSheet: function () {
    var old = document.getElementById('arw-sheet');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    if (!this.premium) return;
    var api = this.api, s = this.st;
    var sheet = api.el('div', 'arw-sheet');
    sheet.id = 'arw-sheet';
    sheet.setAttribute('aria-hidden', 'true');

    var head = api.el('div', 'arw-phead');
    var ttl = api.el('div', 'arw-ptitle');
    ttl.textContent = api.t('title');
    var nm = api.el('div', 'arw-pname');
    nm.textContent = api.t('printName');
    var idl = api.el('div', 'arw-pid');
    idl.textContent = this._matId || (s.n + '×' + s.n);
    head.appendChild(ttl); head.appendChild(nm); head.appendChild(idl);
    sheet.appendChild(head);

    var note = api.el('p', 'arw-pnote');
    note.textContent = api.t('printNote');
    sheet.appendChild(note);

    /* the mat, in line art, with the START pose and NEVER the trail */
    var mat = svgEl('svg', { 'class': 'arw-pmat', viewBox: '0 0 ' + s.n + ' ' + s.n });
    var r, c;
    for (r = 0; r < s.n; r++) for (c = 0; c < s.n; c++) {
      mat.appendChild(svgEl('rect', { x: String(c + 0.02), y: String(r + 0.02), width: '0.96', height: '0.96', rx: '0.06', fill: 'none', stroke: '#333', 'stroke-width': '0.02' }));
    }
    mat.appendChild(svgEl('path', {
      transform: 'translate(' + s.pose.c + ' ' + s.pose.r + ')',
      d: 'M.13 .35V.13H.35 M.65 .13H.87V.35 M.87 .65V.87H.65 M.35 .87H.13V.65',
      fill: 'none', stroke: '#333', 'stroke-width': '.05', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }));
    var pb = useEl('#arw-bug-print');
    pb.setAttribute('x', String(s.pose.c + 0.18));
    pb.setAttribute('y', String(s.pose.r + 0.18));
    pb.setAttribute('width', '0.64');
    pb.setAttribute('height', '0.64');
    pb.setAttribute('transform', 'rotate(' + (90 * s.pose.h) + ' ' + (s.pose.c + 0.5) + ' ' + (s.pose.r + 0.5) + ')');
    mat.appendChild(pb);
    sheet.appendChild(mat);

    /* the two rails */
    var self = this;
    [['printFirst'], ['printSecond']].forEach(function (row) {
      var lab = api.el('div', 'arw-plab');
      lab.textContent = api.t(row[0]);
      sheet.appendChild(lab);
      var line = api.el('div', 'arw-prail');
      for (var i = 0; i < self.MAX_RAIL; i++) {
        var cellb = api.el('div', 'arw-pbox');
        var nn = api.el('span', 'arw-pnum');
        nn.textContent = String(i + 1);
        cellb.appendChild(nn);
        line.appendChild(cellb);
      }
      sheet.appendChild(line);
    });

    /* the card key, to cut out — the other half of D12 */
    var klab = api.el('div', 'arw-plab');
    klab.textContent = api.t('printCut');
    sheet.appendChild(klab);
    var key = api.el('div', 'arw-pkey');
    this.CARDS.forEach(function (k, ix) {
      var item = api.el('div', 'arw-pkeyitem' + (ix === 2 ? ' arw-pkeygap' : ''));
      item.appendChild(cardFace(k, true));
      var t = api.el('span', 'arw-pkeytxt');
      t.textContent = api.t(self.CARD_KEY[k]);
      item.appendChild(t);
      key.appendChild(item);
    });
    sheet.appendChild(key);

    this.api.stage.appendChild(sheet);
  }
};

/* =====================================================================
   SVG — one symbol, reused.
   ⚠ COLOURS ARE ATTRIBUTES, NEVER CSS: a stylesheet selector cannot
   reach into <use> shadow content.
   ===================================================================== */
var ARW_NS = 'http://www.w3.org/2000/svg';
var ARW_XL = 'http://www.w3.org/1999/xlink';

function svgEl(tag, attrs) {
  var e = document.createElementNS(ARW_NS, tag);
  Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
  return e;
}
function useEl(href) {
  var u = svgEl('use', {});
  u.setAttribute('href', href);
  u.setAttributeNS(ARW_XL, 'xlink:href', href);
  return u;
}

/* ⭐ THE CREATURE. Build #1 used the emoji 🪲, which renders as a different
   animal on every platform, sits on its own baseline offset, cannot be
   recoloured into the locked palette, dies below ~24px, and — worst on a
   tool whose entire content is HEADING — is bilaterally symmetric with no
   readable front, so rotated 90 degrees it reads as a beetle lying on its
   side.
   The front is carried by FOUR CUES AT FOUR SCALES, so whichever one
   survives the resolution, one of them does:
     ~14px  coral antenna clubs breaking the outline
     ~10px  a dark front 45% against a mid-teal rear
     ~20px  a forward taper, with the front legs raking forward and the
            rear legs raking back
     ~30px  cream eyes on the dark cap
   ⚠ BOTH ENDS ARE BLUNT. A body tapering to a point at the back is an
   arrowhead pointing the WRONG WAY, which on this tool is a catastrophe.
   Ink centroid lands on (50, 50) so a CSS rotate does not wobble. */
var ARW_BUG_PARTS = {
  legs: { d: 'M36 52L21 42M32 66L16 66M35 79L22 89M64 52L79 42M68 66L84 66M65 79L78 89', fill: 'none', stroke: '#0E5147', 'stroke-width': '5.5', 'stroke-linecap': 'round' },
  body: { d: 'M50 44C64 44 78 53 78 66C78 82 66 92 50 92C34 92 22 82 22 66C22 53 36 44 50 44Z', fill: '#146B5E' },
  spec: { d: 'M29.5 70C29.5 59 35 53 43 51', fill: 'none', stroke: '#FBF3E4', 'stroke-width': '5', 'stroke-linecap': 'round', opacity: '.20' },
  seam: { d: 'M50 52L50 88', fill: 'none', stroke: '#0E5147', 'stroke-width': '3.4', 'stroke-linecap': 'round' },
  ant:  { d: 'M42.5 14.5L34.5 8M57.5 14.5L65.5 8', fill: 'none', stroke: '#0E5147', 'stroke-width': '7', 'stroke-linecap': 'round' },
  head: { d: 'M50 9.5C57.5 9.5 63 14 63 20.5C63 24.5 61 27.5 57.5 29.2C62 30 65.5 33 66.8 37.5L69.5 45.5C70.3 47.8 68.6 49.5 66 49.5H34C31.4 49.5 29.7 47.8 30.5 45.5L33.2 37.5C34.5 33 38 30 42.5 29.2C39 27.5 37 24.5 37 20.5C37 14 42.5 9.5 50 9.5Z', fill: '#0E5147' }
};

function bugSymbol(id, opts) {
  var sym = svgEl('symbol', { id: id, viewBox: '0 0 100 100' });
  var g = svgEl('g', { transform: 'translate(0 2.6)' });
  var mono = opts && opts.mono;
  function ink(c) { return mono ? '#333' : c; }
  var p = ARW_BUG_PARTS;
  g.appendChild(svgEl('path', { d: p.legs.d, fill: 'none', stroke: ink('#0E5147'), 'stroke-width': '5.5', 'stroke-linecap': 'round' }));
  g.appendChild(svgEl('path', { d: p.body.d, fill: mono ? 'none' : '#146B5E', stroke: mono ? '#333' : 'none', 'stroke-width': mono ? '3' : '0' }));
  if (!(opts && opts.small)) {
    g.appendChild(svgEl('path', { d: p.spec.d, fill: 'none', stroke: mono ? 'none' : '#FBF3E4', 'stroke-width': '5', 'stroke-linecap': 'round', opacity: '.20' }));
    g.appendChild(svgEl('path', { d: p.seam.d, fill: 'none', stroke: ink('#0E5147'), 'stroke-width': '3.4', 'stroke-linecap': 'round' }));
  }
  g.appendChild(svgEl('path', { d: p.ant.d, fill: 'none', stroke: ink('#0E5147'), 'stroke-width': '7', 'stroke-linecap': 'round' }));
  g.appendChild(svgEl('path', { d: p.head.d, fill: mono ? 'none' : '#0E5147', stroke: mono ? '#333' : 'none', 'stroke-width': mono ? '3' : '0' }));
  /* the front mark: 11 units = 3.2px at the 34px mat floor. Coral on a
     dark cap, which gives a weak hue the dark keyline it cannot afford. */
  g.appendChild(svgEl('circle', { cx: '34.5', cy: '8', r: '5.5', fill: mono ? '#333' : '#F2784B' }));
  g.appendChild(svgEl('circle', { cx: '65.5', cy: '8', r: '5.5', fill: mono ? '#333' : '#F2784B' }));
  if (!mono) {
    g.appendChild(svgEl('circle', { cx: '44', cy: '20', r: '4.6', fill: '#FBF3E4' }));
    g.appendChild(svgEl('circle', { cx: '56', cy: '20', r: '4.6', fill: '#FBF3E4' }));
  }
  sym.appendChild(g);
  return sym;
}

function injectArrowStripSymbols() {
  if (document.getElementById('arw-defs')) return;
  var host = svgEl('svg', { id: 'arw-defs', width: '0', height: '0', 'aria-hidden': 'true', style: 'position:absolute;width:0;height:0;overflow:hidden' });
  host.appendChild(bugSymbol('arw-bug', {}));
  host.appendChild(bugSymbol('arw-bug-s', { small: true }));
  host.appendChild(bugSymbol('arw-bug-print', { small: true, mono: true }));
  document.body.appendChild(host);
}

/* ⭐ THE FOUR CARD FACES — D2.
   THE GOVERNING RULE: every card carries THE SAME BEETLE, IN THE SAME
   ORIENTATION, NOSE UP. What differs is only what happens to it. That is
   the only construction in which "relative to the body" is unmistakable
   with no word, because the body is on the card — and it makes the thesis
   visible IN THE TRAY, BEFORE ANYTHING RUNS: two of the four cards show
   the beetle still on its square.
   ⚠ CARD B DOES NOT FLIP THE BEETLE. That is what "back" means — you do
   not turn round, you reverse — and drawing it nose-down would ship the
   misconception onto the card face.
   ⚠ THE TWO TURNS DIFFER IN SHAPE AND IN PLACEMENT, NEVER IN HUE. A
   recorded finding says that at 26px the old glyphs' arrowheads were
   near-identical to a five-year-old and that BIGGER was the fix, while a
   colour difference would have been a hint — and a colour-blind child
   would lose exactly the distinction the tool exists to teach. Here the
   arrowhead base is 25 units (11px at the 44px floor, against the 3px
   that failed) and ALL the coral shifts from x~24 to x~76 between L and
   R, so half of each turn card is empty and "which side is the orange
   thing on" is a whole-card question.
   Measured coral ink: F 824, B 824, L 880, R 880 — +6.8%, inside the
   optical-mass band, and heavier on the harder idea. */
function cardFace(k, mono) {
  var ink = mono ? '#333' : '#F2784B';
  var svg = svgEl('svg', { viewBox: '-6 -6 112 112', 'aria-hidden': 'true', 'class': 'arw-face' });
  var bug = useEl(mono ? '#arw-bug-print' : '#arw-bug-s');
  if (k === 'F') {
    svg.appendChild(svgEl('rect', { x: '43', y: '21', width: '14', height: '26', fill: ink }));
    svg.appendChild(svgEl('path', { d: 'M50 6L74 31L26 31Z', fill: ink }));
    bug.setAttribute('transform', 'translate(50 66) scale(.48) translate(-50 -50)');
  } else if (k === 'B') {
    svg.appendChild(svgEl('rect', { x: '43', y: '53', width: '14', height: '26', fill: ink }));
    svg.appendChild(svgEl('path', { d: 'M50 94L26 69L74 69Z', fill: ink }));
    bug.setAttribute('transform', 'translate(50 34) scale(.48) translate(-50 -50)');
  } else if (k === 'L') {
    svg.appendChild(svgEl('path', { d: 'M50 20A36 36 0 0 0 14 56', fill: 'none', stroke: ink, 'stroke-width': '11', 'stroke-linecap': 'round' }));
    svg.appendChild(svgEl('path', { d: 'M14 78L1.5 51L26.5 51Z', fill: ink }));
    bug.setAttribute('transform', 'translate(50 56) scale(.46) translate(-50 -50)');
  } else {
    svg.appendChild(svgEl('path', { d: 'M50 20A36 36 0 0 1 86 56', fill: 'none', stroke: ink, 'stroke-width': '11', 'stroke-linecap': 'round' }));
    svg.appendChild(svgEl('path', { d: 'M86 78L98.5 51L73.5 51Z', fill: ink }));
    bug.setAttribute('transform', 'translate(50 56) scale(.46) translate(-50 -50)');
  }
  bug.setAttribute('width', '100');
  bug.setAttribute('height', '100');
  svg.appendChild(bug);
  return svg;
}

/* =====================================================================
   THE STYLESHEET
   ⚠ TWO TAP FLOORS, MEASURED SEPARATELY AND NEITHER MOVES: every CONTROL
   holds 44px; a MAT CELL is canvas and holds 34px. Collapsing them into
   one number waves a real defect through.
   ⚠ aspect-ratio:1/1 goes on the MAT CONTAINER, never on a cell — on a
   cell it fights the grid track and pushes the last column outside the
   box while scrollWidth stays clean. But the mat must be exactly square
   or the frame's quarter-turn stops landing on the squares.
   ⚠ NO `vh` AND NO `vmin` ANYWHERE. Both resolve against the iframe,
   whose height is the content height, so either one closes the feedback
   loop the unpin below exists to open. The size chain is a CONTAINER
   QUERY; the only height signal is `--arw-sidecap`, set once in init from
   `screen.availHeight`, which is outside the layout entirely.
   ⚠ Never an inline `background` SHORTHAND — it resets background-image
   and beats the stylesheet.
   ===================================================================== */
function injectArrowStripCSS() {
  if (document.getElementById('arw-style')) return;
  var css = ''
    /* =================================================================
       ⭐⭐ BREAK THE PERCENTAGE CHAIN — UNCONDITIONALLY. D8.
       lcs-shell.css:54 sets html,body{height:100%} and :63-70 sets
       .lcs-app{height:100%;overflow:hidden}. `.lcs-app.activity{height:
       auto}` is the only escape and a free-play manipulative never gets
       it — so .lcs-app's height IS the iframe's height, the shell's
       ResizeObserver measures that same box and posts it to the parent,
       and the loop's fixed point is whatever the iframe started at (420).
       Every desktop rendered this tool at phone size WITH THE RUN BUTTON
       CLIPPED OFF THE BOTTOM.
       ⚠ NOT INSIDE A MEDIA QUERY. A sibling shipped this escape at
       `@media (max-width:700px)` and the production embed measures ~704px
       — it missed by FOUR PIXELS. A width is the wrong key.
       ⚠ The `html` half is not optional: freeing only `body` clips the
       standalone document.
       ================================================================= */
    + 'html.arw-html,html.arw-html body.arw-wide{height:auto;min-height:100%;overflow-y:auto;}'
    + 'html.arw-html body.arw-wide{overflow-x:hidden;}'

    /* =================================================================
       THE CARD LADDER, KEYED ON WIDTH ALONE.
       ⚠ The shell's own card tiers (lcs-shell.css:125-130) are keyed
       min-height 880/1150, so inside the iframe they are dead too and the
       card never leaves 720px. That VOIDS the arithmetic build #1 derived
       from "the card is 1240 and 1800 now". It was 720, always.
       lcs-shell.css:99-109 documents `body.<ns>-wide .lcs-app` (0,1,1) as
       the sanctioned override of the shell's `.lcs-app` (0,1,0).
       ⚠ THE LADDER MUST START BELOW 704px or it never fires on the tool's
       own landing page, where the iframe is max-w-3xl minus md:px-8.
       ================================================================= */
    + '@media (min-width:680px){body.arw-wide .lcs-app{max-width:min(760px,97vw);}}'
    + '@media (min-width:900px){body.arw-wide .lcs-app{max-width:min(1000px,96vw);}}'
    + '@media (min-width:1280px){body.arw-wide .lcs-app{max-width:min(1240px,96vw);}}'
    + '@media (min-width:1900px){body.arw-wide .lcs-app{max-width:min(1760px,96vw);}}'
    /* the shell renders `instruction` under the h1; the hint band says the
       working sentence and the two together cost ~40px of fold */
    + 'body.arw-wide .lcs-instruction{display:none;}'

    /* ---- the frame ---- */
    + '.arw-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;'
    +   'container-type:inline-size;'
    +   '--arw-gap:3px;--arw-trayw:0px;--arw-chrome:585px;'
    +   '--arw-c4:78px;--arw-c6:62px;--arw-c8:50px;'
    +   '--arw-cardw:60px;--arw-placew:46px;--arw-hintfs:15px;}'
    + '.arw-bar,.arw-foot{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;width:100%;}'
    + '.arw-sizes{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
    + '.arw-chip{min-height:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;'
    +   'background-color:#FBF3E4;color:#0E5147;font-family:Baloo\\ 2,cursive;font-size:15px;'
    +   'line-height:1.15;cursor:pointer;}'
    + '.arw-chip.arw-on{background-color:#146B5E;color:#FBF3E4;}'
    /* ⚠ THE BORDER STAYS CORAL, THE LABEL GOES TEAL. #C2562F on cream is
       4.42:1 — an AA fail for a label. A UI EDGE needs 3:1; a LABEL needs
       4.5:1. Two different floors, and build #1 used the edge's. */
    + '.arw-chip.arw-locked{border-color:#F2784B;color:#0E5147;}'
    + '.arw-chip[disabled]{opacity:.45;cursor:default;}'
    + '.arw-chip.arw-go{background-color:#F2784B;border-color:#C2562F;color:#FFF;}'
    + '.arw-chip.arw-go[disabled]{background-color:#FBF3E4;color:#0E5147;border-color:#146B5E;}'
    /* ⚠ THE GATE LINE ALWAYS RESERVES ITS HEIGHT. Injecting it into flow
       shoved the apparatus down 44px and then vanished. */
    + '.arw-gate{flex-basis:100%;min-height:40px;text-align:center;font-family:Nunito,sans-serif;'
    +   'font-size:14px;color:#8A4A2E;display:flex;flex-wrap:wrap;justify-content:center;gap:6px;'
    +   'align-items:center;visibility:hidden;}'
    + '.arw-gate.arw-on{visibility:visible;}'
    + '.arw-gate a{color:#8A4A2E;font-weight:700;min-height:44px;display:inline-flex;align-items:center;}'
    /* ⚠ HEIGHT-LOCKED. 20px at 15px type reserved less than one line, and
       the German predictHint is three lines at 360px, so the mat jumped
       21px the instant a child tapped the first card.
       ⚠ AND `flex-basis` WAS THE WRONG AXIS inside a column flex parent —
       copied from a row context. */
    + '.arw-hint{width:100%;min-height:3.2em;display:flex;align-items:center;justify-content:center;'
    +   'text-align:center;font-family:Nunito,sans-serif;font-size:var(--arw-hintfs);color:#0E5147;padding:0 8px;}'

    /* =================================================================
       THE MAT. The side is derived, the cell follows from it.
       ⚠ THE GAPS ARE PART OF THE WIDTH — n cells carry n-1 gaps. Build #1
       said `cell * cols + 2px` once and a 34px floor rendered at 32.7px.
       ⚠ THE CEILING BELONGS TO THE CONFIGURATION, NOT ONLY THE TIER. The
       mat is SQUARE and its side is cols x cell, so ONE ceiling for all
       three decks sizes every mat as if it were the densest: a 6x6 came
       out a quarter smaller than its budget for no reason at all.
       ================================================================= */
    + '.arw-main{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;min-width:0;}'
    /* ⚠ margin:auto ON THE CHILD, never justify-content:center on an
       overflow scroller — centring a flex container that overflows puts
       the start out of reach and the first column can never be tapped. */
    /* ⚠ THE 6px PADDING IS LOAD-BEARING: `overflow:hidden` CLIPS A
       box-shadow. Without it the mat's outer frame simply did not draw, so
       the outermost cells met the cream card at 1.02:1 and the mat had no
       boundary at all — the D13 defect surviving at the perimeter, which I
       found by reading the 360 render and not from any measurement. */
    + '.arw-scroll{width:100%;overflow-x:auto;overflow-y:hidden;display:flex;justify-content:flex-start;'
    +   'min-width:0;padding:6px;}'
    + '.arw-scroll > .arw-mat{margin:0 auto;}'
    + '.arw-mat{position:relative;aspect-ratio:1/1;flex:0 0 auto;'
    +   '--arw-avail:calc(100cqw - var(--arw-trayw) - 24px);'
    +   '--arw-sidecap:max(240px,calc(var(--arw-vh,900px) - var(--arw-chrome)));'
    +   '--arw-side:max('
    +     'calc(34px * var(--arw-cols,6) + (var(--arw-cols,6) - 1) * var(--arw-gap)),'
    +     'min(var(--arw-avail),var(--arw-sidecap),'
    +       'calc(var(--arw-ceil) * var(--arw-cols,6) + (var(--arw-cols,6) - 1) * var(--arw-gap))));'
    +   'width:var(--arw-side);'
    +   '--arw-cell:calc((var(--arw-side) - (var(--arw-cols,6) - 1) * var(--arw-gap)) / var(--arw-cols,6));'
    +   'border-radius:10px;background-color:#0E5147;'
    +   'box-shadow:0 0 0 5px #0E5147,0 6px 16px rgba(14,81,71,.24);}'
    + '.arw-n4{--arw-ceil:var(--arw-c4);}'
    + '.arw-n6{--arw-ceil:var(--arw-c6);}'
    + '.arw-n8{--arw-ceil:var(--arw-c8);}'
    + '.arw-frame{position:absolute;inset:0;transition:transform .42s var(--lcs-ease,ease-out);}'
    + '.arw-grid{position:absolute;inset:0;display:grid;'
    +   'grid-template-columns:repeat(var(--arw-cols,6),1fr);grid-template-rows:repeat(var(--arw-cols,6),1fr);'
    +   'gap:var(--arw-gap);background-color:#146B5E;border-radius:8px;}'
    /* ⚠ THE GAPS ARE THE RULES. Build #1 drew 64 bordered boxes at
       rgba(20,107,94,.20) over a cream fill — 1.34:1 against the cell it
       was meant to separate, and 1.02:1 for the mat against the card
       behind it. At four metres there was no mat. Teal grout is 5.92:1
       and it deletes 64 painted rectangles from every render. */
    + '.arw-cell{min-width:0;min-height:0;border:0;border-radius:4px;background-color:#FBF3E4;cursor:pointer;}'
    + '.arw-running .arw-cell{cursor:default;}'
    + '.arw-home,.arw-trails{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;}'
    + '.arw-homebug{opacity:.30;}'
    + '.arw-trail{fill:none;stroke:#F2784B;stroke-width:.18;stroke-linecap:round;stroke-linejoin:round;}'
    /* ⭐ THE GHOST IS WIDER THAN THE TRAIL, AND THAT IS THE POINT. Both
       runs use the same offset construction, so wherever they AGREE the
       ghost shows as a dashed fringe on both sides of the coral, and
       where they DIVERGE the ghost goes off alone. That is invention 2
       rendered exactly: the old road, the new road running along it, and
       the fork. Build #1 drew it at .10 and 34% opacity in the SAME teal
       as every chip border — about 1.5:1 on cream, i.e. not there.
       ⚠ It is the DARK teal; the grout is the mid teal. Lattice-versus-
       free-path plus the dash keeps them apart. */
    + '.arw-ghost{fill:none;stroke:#0E5147;stroke-width:.22;opacity:.42;stroke-linecap:round;'
    +   'stroke-linejoin:round;stroke-dasharray:.26 .20;}'
    + '.arw-startdot{fill:#FBF3E4;stroke:#F2784B;stroke-width:.10;}'
    + '.arw-pivot{fill:none;stroke:#F2784B;stroke-width:.18;stroke-linecap:round;}'
    + '.arw-pivot-ghost{stroke:#0E5147;stroke-width:.22;opacity:.42;stroke-dasharray:.26 .20;}'
    /* cream, not coral: a same-colour chevron on a coral line is just a
       thickening. A cream notch reads as flow. */
    + '.arw-chev{fill:none;stroke:#FBF3E4;stroke-width:.075;stroke-linecap:round;stroke-linejoin:round;}'
    + '.arw-beetle{position:absolute;width:calc(var(--arw-cell) * .86);height:calc(var(--arw-cell) * .86);'
    +   'pointer-events:none;'
    +   'filter:drop-shadow(0 calc(var(--arw-cell) * .028) calc(var(--arw-cell) * .030) rgba(14,81,71,.30));'
    +   'transition:left .30s var(--lcs-ease,ease-out),top .30s var(--lcs-ease,ease-out),'
    +   'transform .34s cubic-bezier(.30,1.35,.50,1);}'
    + '.arw-beetle svg{display:block;width:100%;height:100%;}'
    + '.arw-beetle.arw-nomove{transition:none;}'
    /* a bump, never a bounce — the model has no rebound */
    + '.arw-beetle.arw-bump{animation:arw-bump .32s var(--lcs-ease,ease-out);}'
    + '@keyframes arw-bump{0%{margin-top:0;}45%{margin-top:-4%;}100%{margin-top:0;}}'
    + '.arw-mat.arw-edge{box-shadow:0 0 0 5px #F2784B,0 6px 16px rgba(14,81,71,.24);}'

    /* ---- the tray: a palette, and the GAP IS THE LEGEND ---- */
    + '.arw-tray{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;}'
    + '.arw-card{min-height:44px;min-width:44px;width:var(--arw-cardw);height:var(--arw-cardw);'
    +   'padding:4px;border-radius:12px;border:2px solid #146B5E;background-color:#FBF3E4;'
    +   'cursor:pointer;display:flex;align-items:center;justify-content:center;'
    +   'box-shadow:0 2px 0 #146B5E;}'
    + '.arw-card[disabled]{opacity:.4;cursor:default;box-shadow:none;}'
    + '.arw-cardgap{margin-left:18px;}'
    + '.arw-face{display:block;width:100%;height:100%;}'

    /* =================================================================
       THE RAIL — ONE LINE, NEVER A BLOCK.
       ⚠ Build #1 was flex-wrap:wrap inside a 260px column, so twelve
       cards rendered as a 4x3 BLOCK — an accidental period-4 pattern,
       which is a SIBLING TOOL'S grammar and the one thing the fence
       spends four lines separating this tool from. A child reading a
       4-wide block sees a repeat that does not exist.
       ================================================================= */
    /* ⚠ A SCROLLING RAIL WITH NO CUE IS A RAIL THAT LOOKS SEVEN PLACES
       LONG. At 360 the twelve places are ~600px inside a ~330px card, so
       half the rail sat off the right edge with nothing to say so. The
       mask fades the last few pixels, which is a scroll affordance a
       six-year-old reads without being told; the caret is also scrolled
       into view after every edit (see _buildRail). */
    + '.arw-railwrap{width:100%;min-width:0;display:flex;justify-content:center;'
    +   '-webkit-mask-image:linear-gradient(to right,#000 0,#000 calc(100% - 18px),transparent 100%);'
    +   'mask-image:linear-gradient(to right,#000 0,#000 calc(100% - 18px),transparent 100%);}'
    + '.arw-railwrap.arw-allin{-webkit-mask-image:none;mask-image:none;}'
    + '.arw-rail{display:flex;flex-wrap:nowrap;align-items:stretch;gap:var(--arw-gap);'
    +   'padding:8px 10px;border-radius:14px;background-color:#0E5147;max-width:100%;'
    +   'overflow-x:auto;box-shadow:inset 0 2px 0 rgba(251,243,228,.10);}'
    + '.arw-rail::before{content:"";flex:0 0 6px;border-radius:3px;background-color:#F2784B;margin-right:4px;}'
    + '.arw-place{position:relative;flex:0 0 var(--arw-placew);width:var(--arw-placew);'
    +   'min-height:44px;min-width:44px;border-radius:10px;padding:3px;'
    +   'display:flex;align-items:center;justify-content:center;}'
    + '.arw-place.arw-filled{border:2px solid rgba(251,243,228,.55);background-color:#FBF3E4;cursor:pointer;}'
    + '.arw-place.arw-open{border:2px dashed rgba(251,243,228,.55);background-color:rgba(251,243,228,.10);}'
    + '.arw-place.arw-next{border:2px solid transparent;background-color:transparent;}'
    + '.arw-place.arw-lit{background-color:#F2784B;transform:translateY(-3px);}'
    + '.arw-place.arw-stopped{box-shadow:inset 4px 0 0 #F2784B;}'
    + '.arw-num{position:absolute;top:1px;left:4px;font-family:Baloo\\ 2,cursive;font-size:11px;'
    +   'line-height:1;color:#0E5147;opacity:.55;}'
    + '.arw-place.arw-next .arw-num,.arw-place.arw-open .arw-num{color:#FBF3E4;opacity:.45;}'
    + '.arw-dots{position:absolute;bottom:2px;left:0;right:0;display:flex;justify-content:center;gap:3px;}'
    + '.arw-dots i{width:3px;height:3px;border-radius:50%;background-color:rgba(14,81,71,.25);}'
    + '.arw-dots i.arw-on{background-color:#146B5E;}'
    + '.arw-caret{flex:0 0 3px;border-radius:2px;background-color:#F2784B;align-self:stretch;}'

    /* =================================================================
       WIDE VIEWPORTS — KEYED ON min-width ALONE.
       ⚠ Build #1's four tiers were (min-width:1367)+(min-height:880),
       (1800)+(1050), (1800)+(1150) and (2400)+(1400). min-height inside an
       iframe resolves against the IFRAME's viewport, which is 422px, so
       ALL FOUR WERE DEAD CODE — together with the sixty lines of careful
       arithmetic that derived them. And 1366x768 and 1600x900, the two
       commonest classroom projectors, fail an 880px height test even
       standalone.
       The height budget now comes from --arw-sidecap (screen.availHeight,
       read once, outside the layout), which binds correctly at every tier
       floor without a height-keyed media query anywhere.
       ================================================================= */
    + '@media (min-width:680px){.arw-wrap{--arw-c4:120px;--arw-c6:88px;--arw-c8:68px;'
    +   '--arw-cardw:68px;--arw-placew:50px;--arw-hintfs:16px;}}'
    + '@media (min-width:900px){.arw-main{flex-direction:row;justify-content:center;align-items:center;gap:24px;}'
    +   '.arw-scroll{width:auto;}'
    +   '.arw-tray{flex-direction:column;flex:0 0 auto;}'
    +   '.arw-cardgap{margin-left:0;margin-top:18px;}'
    +   '.arw-wrap{--arw-trayw:150px;--arw-c4:150px;--arw-c6:110px;--arw-c8:84px;'
    +   '--arw-cardw:82px;--arw-placew:58px;--arw-hintfs:17px;--arw-chrome:492px;}}'
    + '@media (min-width:1280px){.arw-wrap{--arw-trayw:176px;--arw-c4:200px;--arw-c6:140px;--arw-c8:106px;'
    +   '--arw-cardw:100px;--arw-placew:68px;--arw-hintfs:18px;--arw-chrome:500px;}}'
    + '@media (min-width:1900px){.arw-wrap{--arw-trayw:210px;--arw-c4:280px;--arw-c6:190px;--arw-c8:142px;'
    +   '--arw-cardw:124px;--arw-placew:80px;--arw-hintfs:20px;--arw-chrome:520px;}}'
    + '@media (min-width:900px){.arw-wrap{--arw-hintlines:2.2em;}.arw-hint{min-height:2.2em;}}'

    /* ⚠ REDUCED MOTION REMOVES THE TRANSITION, NEVER THE SIGNAL. The run
       still plays card by card on the same clock; only the tweens go.
       Motion-off must never mean information-off. */
    + '@media (prefers-reduced-motion:reduce){'
    +   '.arw-frame,.arw-beetle{transition:none;}'
    +   '.arw-beetle.arw-bump{animation:none;}'
    + '}'

    /* =================================================================
       ⭐⭐ THE PRINT SHEET — DOUBLE-LOCKED.
       The sheet is ABSENT from the DOM unless entitled (see _ensureSheet)
       AND every rule below is scoped `body.arw-paid`. Build #1 gated the
       chip and left this block unscoped, so Ctrl+P handed a free visitor
       the paid sheet — and since `.arw-beetle` was not hidden while the
       beetle draws endPose, it printed THE ANSWER.
       ⚠ Line art only, no informational background colour: Chrome ships
       "Background graphics" OFF for a great many teachers.
       ================================================================= */
    + '.arw-sheet{display:none;}'
    + '@media print{'
    +   '.arw-wrap{display:none !important;}'
    +   '.lcs-header,.lcs-controls,.lcs-instruction{display:none !important;}'
    +   'body.arw-paid .arw-sheet{display:block !important;font-family:Nunito,system-ui,sans-serif;color:#000;}'
    +   'body.arw-paid .arw-phead{display:flex;align-items:flex-end;gap:8mm;border-bottom:.8pt solid #000;'
    +     'padding-bottom:2mm;margin-bottom:4mm;}'
    +   'body.arw-paid .arw-ptitle{font-weight:700;font-size:11pt;}'
    +   'body.arw-paid .arw-pname{flex:1;border-bottom:.6pt solid #000;height:5mm;max-width:52mm;font-size:8pt;}'
    +   'body.arw-paid .arw-pid{font-size:7pt;}'
    +   'body.arw-paid .arw-pnote{font-size:8.5pt;line-height:1.35;margin:0 0 4mm;max-width:165mm;}'
    +   'body.arw-paid .arw-pmat{display:block;width:128mm;height:128mm;margin:0 auto 5mm;break-inside:avoid;}'
    +   'body.arw-paid .arw-plab{font-size:9pt;font-weight:700;margin:3mm 0 1.5mm;}'
    +   'body.arw-paid .arw-prail{display:flex;gap:2mm;break-inside:avoid;margin-bottom:2mm;}'
    +   'body.arw-paid .arw-pbox{position:relative;width:12mm;height:12mm;border:.6pt solid #000;border-radius:1.5mm;}'
    +   'body.arw-paid .arw-pnum{position:absolute;top:.5mm;left:1mm;font-size:6pt;}'
    +   'body.arw-paid .arw-pkey{display:flex;flex-wrap:wrap;gap:4mm;break-inside:avoid;}'
    +   'body.arw-paid .arw-pkeyitem{display:flex;align-items:center;gap:2mm;width:78mm;}'
    +   'body.arw-paid .arw-pkeygap{margin-top:1mm;}'
    +   'body.arw-paid .arw-pkeyitem .arw-face{width:14mm;height:14mm;flex:0 0 14mm;'
    +     'border:.5pt dashed #666;border-radius:1.5mm;padding:.6mm;}'
    +   'body.arw-paid .arw-pkeytxt{font-size:8pt;}'
    +   '@page{size:A4 portrait;margin:12mm;}'
    + '}';
  var st = document.createElement('style');
  st.id = 'arw-style';
  st.textContent = css;
  document.head.appendChild(st);
}

if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(ArrowStrip);
