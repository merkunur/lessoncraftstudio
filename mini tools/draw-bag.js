/* =====================================================================
   TOOL #38 — THE DRAW BAG   (draw-bag.js)   REBUILT TO THE v4 BAR
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #4. Catalog slot C1.

   THE BAG · THE RECORD · THE GUESS. Three named parts, and nothing else
   in this tool gets a noun.
   ⚠ THE ON-SCREEN NOUN IS "THE RECORD", NEVER "THE STRIP". `pattern-bench`
   owns "strip" as its house noun and `arrow-strip` already refused it for
   exactly this reason. The KEY stays `draw-bag`.

   THE ROUTINE:  "Say what you think is in the bag. Then draw."
   ... and then the move that matters: "Now run the SAME bag again."

   THE ONE THESIS — THE SAME CAUSE PRODUCES TWO DIFFERENT PICTURES.

   =====================================================================
   ⭐⭐ WHY BUILD #4 EXISTS. The operator used build #3 and said: "Super
   confusing. I could not get the point at all" and "the objects could
   not be placed on the second line at all." Both reproduced, and reading
   the model with three expert panels found eleven more. The four that
   destroyed the premise outright, each measured before it was believed:

   1. ⭐⭐ "FILL THE BAG" SHOWED THE CLASS THE ANSWER. `openDraft` did
      `s.draft = this._copyCounts(s.bag)` and `_buildFill` painted every
      piece of it. Measured: a free, always-live chip rendered [10,7,0,0,
      0,0] — byte-identical to the sealed bag — at any moment, including
      after the prior was committed. The header claimed "structural
      unreachability" and the tool's own first sentence is "Nobody may
      look inside." ⇒ THE DRAFT NOW STARTS EMPTY, and D9 asserts the
      sealed bag is unreachable from the BUILDER as well as the reveal.
   2. ⭐⭐ THE FIRST TAP ON THE BAG COMMITTED AN EMPTY PRIOR. `draw()` set
      `committed = true` unconditionally and `canDraw` was true on cold
      load, so one tap on the largest object on the stage silently froze
      an all-zero guess, forever, with no undo. The signature invention
      destroyed by the tool's own primary affordance. ⇒ THE BAG WILL NOT
      DRAW UNTIL THE CLASS HAS CLAIMED SOMETHING, and it says so.
   3. ⭐⭐ THE PLACEMENT WAS A BLIND 3-CYCLE. `(guess[kind] + 1) % 3`.
      Measured on one piece over six taps: pool -> in -> out -> pool ->
      in -> out -> pool. You could not aim; the middle line cost three
      taps. And the three zones carried NO visible label — measured
      `.drb-guess` innerText was the empty string, the tints were 1.13:1
      and 1.08:1 on cream, and the only real signal was a dashed border,
      which eleven lines away in the same file meant LOCKED. ⇒ ABSOLUTE
      PLACEMENT, by drag or by tap-then-tap, into zones that are PICTURES
      OF THE CLAIM.
   4. ⭐⭐ THE THESIS WAS BEHIND THE PAYWALL. Run two — the entire point —
      was premium. Measured at the end of run one: two record rows, the
      second holding zero cells and unfillable; the bag `disabled` at
      `opacity:.5`; `hintAgain` gated on `premium` so a free teacher was
      told to open the bag instead; and the gate line NOT SHOWN AT ALL.
      That is exactly "the objects could not be placed on the second
      line." ⇒ RUN TWO IS FREE. The plan sells depth (40 draws, the
      picture pieces, ~120 bags, printing), never the premise.

   And the ones that were quieter: `gateLine` was structurally
   unreachable from the builder (`_buildFoot` returned before the gate
   block); `api.announce` was called ZERO times; `reset()` was a silent
   no-op while the book was in flight; the record track did not exist
   until the first draw; `_buildFill` was a per-kind BAR CHART, which is
   the thing refusal 2 forbids on the record; and the piece palette had a
   worst-case colour-blind separation of dE00 0.7 — the purple diamond
   and the slate star were one object — while the diamond was
   geometrically a square rotated 45 degrees.

   ⚠ ONE PANEL CLAIM WAS CHECKED AND REJECTED: the star is not "wrong at
   six points". The code, this header and all eleven locale strings agree
   on a star, and five points is the child's star; the "six-pointed"
   wording was in the brief, not the tool. Its inner ratio is improved
   anyway. A second claim — that the bag is disabled through the whole
   prediction phase — is also false: `canDraw` was TRUE on cold load,
   which made defect 2 worse rather than milder. Verify the measurement
   before the defect.
   =====================================================================

   ⭐⭐ AND WHAT THE ELEVEN NATIVE PANELS FOUND — IN MY ENGLISH, WHICH IS THE
   ONE LOCALE NOBODY REVIEWS. Three panel groups read the MODEL, separately,
   and converged on the same list. Every item was reproduced against source
   before it was believed:
     • "row" was a FOURTH NAMED PART. This header's own first law says the
       tool has three parts and that the record is never called anything
       else — and `doctrine` and `hintLook` said "rows" while `recordAria`,
       `printBtn`, `litAria` and `gateLine` said "record". The #41 defect
       ("the bench was a fourth named part in a three-part tool") reproduced
       in the file that cites it.
     • `hintLook` said "look back UP at both rows" and BOTH HALVES WERE
       FALSE: render order is guess -> opened -> main, so the records are
       BELOW the reveal at every width; and `openBag` needs only one run, so
       "both rows" is wrong in a one-tap-reachable state.
     • `doctrine` said "fills both rows" — permanent, unguarded, and false
       for the whole prediction phase and all of run one, i.e. most of the
       lesson. It also carried an IMPERATIVE, which `placeGuess` refuses from
       the first draw onward: the one line that is never state-guarded was
       instructing a refused move for the rest of the lesson.
     • ⭐ `doctrine` and `hintClaimFirst` said "say what IS inside". The
       model makes that structurally unknowable — `composition()` THROWS
       until the reveal, precisely so nobody can. `instruction`, `guessLabel`
       and `inLabel` all say "think"; the two most-read strings dropped it.
       In an instrument whose refusal 4 is "no verdict on the guess", telling
       a class to report the contents as fact is already half a verdict.
     • ⭐ THE HINT LADDER WAS INVERTED. On cold load the band showed
       `hintClaimFirst` ("move at least one piece") — which never said WHERE
       — while `hintGuess`, the only string naming the two destinations,
       appeared only once a piece had already been placed. The how-to
       arrived after the class had worked it out.
     • ⭐ THREE ARIA TEMPLATES RENDERED AS UNGRAMMATICAL ENGLISH:
       `pieceRound` was "the round one" and the templates supply their own
       determiner, so a screen reader was read "one more the round one" and
       "show every the round one on the record". The ten other locales were
       clean because their piece names are bare nouns. pt and it had
       inherited the same shape; all three are fixed at the piece names.
     • `hintGuess` said "DRAG each piece" on a tool whose own law is that a
       drag-only handle is dead to a keyboard — and over-demanded, since
       `canDraw` needs one claim, not six.
     • "into the bag" named a target that silently swallowed the drop:
       `_zoneAt` hit-tested only the shelves, so aiming at the real sack did
       nothing at all. Now the sack is a drop target (see `_zoneAt`).
     • `tagAria` announced `idx % 8 + 1`, so bag 9 announced "bag 1" while
       the DRAWING kept differentiating past eight (the outline cycles too).
     • `litAria` said "on the record", singular, for a control that lights
       BOTH records — and no count is right, since there are one or two.
     • `cancelBtn` "Leave it as it was" had a bare `it` sitting beside
       "Close the bag", where `it` could read as the record or the guess.
   Two locale-specific catches no English review could have made: Swedish
   `biten` is also the past participle of *bita* ("bitten"), the `banan`
   class again — so no string uses the definite; and Finnish `pala` has the
   partitive `palaa`, spelt identically to "burns"/"returns", so every
   Finnish string here uses the nominative. Danish and Norwegian `litAria`
   had to be RESTRUCTURED, because their piece names are definite phrases
   and `hver {piece}` yields `*hver den runde brik`.

   THREE INVENTIONS:
     1. THE SAME BAG RUNS TWICE, PROVABLY. You cannot rewind a draw on a
        carpet, and a slide deck's second run is authored — the class
        knows it and stops believing. Here run two is the same multiset
        by construction (`secondRun` copies nothing but the seed index),
        the gate asserts the bag is deep-equal across both runs, and
        ⭐ THE CONTROLS THAT COULD CHANGE THE BAG ARE REMOVED FROM THE
        SCREEN between the first draw and the reveal — so the class's
        obvious objection ("you swapped it") is not merely answerable,
        it is not displayed.
     2. THE DRAWS ARE PERMANENT. Nothing is ever erased, so "there are no
        blue ones in there" dies to a blue piece appearing on the record
        rather than to an adult saying so. Append-only, proved by prefix.
     3. THE COMMITTED PRIOR. The guess is placed BEFORE draw one and is
        immovable afterwards — `placeGuess` returns null once a draw has
        happened. Only paper does this today. ⭐ AND THE FROZEN PRIOR IS
        NOT INERT: after the commit, tapping a piece LIGHTS every cell of
        that kind in BOTH records at once. That is what converts two
        aligned rows from spot-the-difference into one texture, and it is
        the move a teacher makes with a finger on a whiteboard.

   ⚠ THE FENCE — FOUR SURFACES. Chance itself came back VIRGIN on all
   four (0 of 41 instruments, 0 of ~204 activity rows and no 7.SP.* code
   anywhere in the corpus, 0 of 240 printable types, 0 of 33 REFERENCE
   APPS). What is NOT virgin is the apparatus vocabulary around it, and
   the four neighbours below are SUBTRACTED, not negotiated:
   `name-sticks.js` (#26) owns "sampling WITHOUT replacement the whole
   class can see", owns the visible cup, and ships `tipBack` = "Tip them
   back in" in eleven locales. So this tool is WITH replacement, has no
   cup, never touches `lcs:my-classes:v1`, and its reveal is "open the
   bag". Its no-drumroll doctrine (name-sticks.js:22-29) is INHERITED BY
   CITATION and is not claimed here as an invention.
   `estimation-jar.js` (#23) owns the jar-reveal ritual, the NO ACCURACY
   GRADIENT rule and the THROWING ACCESSOR that makes a count
   structurally unreachable before the reveal — `composition()` is that
   idiom, reused by citation, and `_buildOpened` reuses its three-layer
   apparatus (back / contents / front) to draw the pieces INSIDE the
   opened bag. The prior here is a COMPOSITION claim, never the 0-20
   numeric estimate `wondering-jar` owns.
   `sorting-hoops.js` (#30) owns the grab-and-place state machine and the
   ruling this tool now obeys: "OUTSIDE IS THE REST OF THE MAT, NOT A
   FIFTH BOX ... children who learn 'neither' as a box do not later
   generalise to the complement" (sorting-hoops.js:1345). Build #3 shipped
   exactly the thing that comment condemns, three times over.
   `class-graph.js` (#34), `calendar-wall.js` (#7) and `graph-it` own
   record-becomes-bar outright, which is why refusal 2 exists.
   `arrow-strip.js` (#37) owns two-run comparison AS A GHOST OVERLAY.
   Here record two lies UNDER record one and is never ghosted — and where
   arrow-strip re-runs after CHANGING one card, this re-runs the
   IDENTICAL cause. The two theses are mirror images and must stay so.

   ⭐ THE CAPTION RULE, adopted here to reconcile this tool with
   sorting-hoops, which DOES paint words on its zones and is at the v4
   bar: A ZONE MAY CARRY A VISIBLE CAPTION WHEN, AND ONLY WHEN, ITS
   MEANING IS A PROPOSITION THE APPARATUS CANNOT DRAW. Sorting-hoops'
   captions carry a rule the class invented ("things with four legs") —
   no arrangement of ink depicts that, so the words are the only carrier
   and are apparatus-legitimate. Draw Bag's zones carry a LOCATION —
   inside this bag, not inside this bag — and the bag is a rendered
   object on the same stage. Captioning it would label a picture with the
   name of the picture. So the zones stay wordless, and the dissent was
   bought with three concessions, all taken: the zones keep their
   eleven-locale aria-labels, `api.announce` now fires on every lift,
   retarget, placement, draw and reveal, and the hint band names both
   destinations in words that survive the embed.

   REFUSES, FOREVER — each one gated:
     1. NO FREQUENCY NUMERAL, EVER. No count of anything on the stage, no
        percentage, no fraction, no "N out of M". The record is pictures.
     2. NO STACKING BY KIND ON THE RECORD, and — new in #4 — NOT IN THE
        BUILDER EITHER. Build #3's `_buildFill` was six per-kind columns
        of stacked pieces, i.e. a bar chart, watched by the class while
        the teacher filled the bag. The counts are now HEAPS IN A DISH.
     3. NO LIKELIHOOD WORD in any of eleven languages. The zones are
        shapes, not labels.
     4. NO VERDICT ON THE GUESS. Never marked, coloured, scored, counted,
        ranked or compared BY THE TOOL. At the reveal the guess and the
        contents simply sit next to each other and the class does the
        rest. ⚠ THE HIGHLIGHT IS NOT A VERDICT: it filters a kind the
        USER chose, in both records equally, and says nothing about
        whether the claim was any good.
     5. NO WITHOUT-REPLACEMENT MODE AND NO USED-CUP. Every piece goes
        back; the multiset is conserved and the gate proves it after
        every single draw.
     6. NO "TIP BACK IN" in any locale — name-sticks owns `tipBack`.
     7. NO DRUMROLL, NO SUSPENSE, NO SOUND AT ALL.
     8. NO GHOST OVERLAY for run two. Record two sits UNDER record one,
        cell-aligned, and what is marked is their SAMENESS — one bag, a
        spine, a fork into each rail — never their difference.
     9. NO UNSEEDED RANDOMNESS. `Math.random` and `crypto` are absent.
        Every draw is a pure function of (bag, seed, index), so Oslo and
        Lisbon see the identical run and the live verifier can assert the
        exact sequence on production.
    10. No score, no timer, no streak, no tick, no cross, no "correct".

   ⚠ THIS IS THE FIRST v4 INSTRUMENT WITH LEGITIMATE RANDOMNESS. Both
   sibling tools ban `Math.random` outright; here the gate instead bans
   UNSEEDED randomness, which is a different assertion and had to be
   written as one.

   ⚠ NO SPEECH. LCSAudio never calls getVoices() and silently substitutes
   a missing voice; TTS is reliable in only 5 of 11 locales. This tool is
   legible with the sound off, and legible for a child who cannot read at
   all: the stage carries the material and nothing else.
   ===================================================================== */

var DrawBag = {
  id: 'draw-bag',

  /* ---------------------------------------------------------------
     STRINGS. EN is authored. The other ten are REBUILT — never
     translated — by their own three-person native panel per §A.13.48,
     via scripts/apply-draw-bag-locales.js, which rewrites this whole
     block. Do not hand-edit a locale here.
     ⚠ ONE PHYSICAL LINE PER KEY. Fourteen mutation needles self-anchor
     with `[^\n]*?` and go blind the moment a key wraps.
     ⚠ Three named traps for the panels: nothing may calque name-sticks'
     "tip them back in"; no likelihood word may appear in any locale
     (the gate checks each locale's OWN vocabulary, never English); and
     the panels are handed the ENGLISH AS A SOURCE TO AUDIT, because on
     the last four builds it was the English that carried the defect all
     ten other locales would have inherited.
     --------------------------------------------------------------- */
  strings: {
    title:           { en: "The Draw Bag", de: "Der Zufallsbeutel", fr: "Le sac du hasard", es: "La bolsa del azar", pt: "Sacola do acaso", it: "Il sacchetto delle estrazioni", nl: "De toevalszak", sv: "Slumppåsen", da: "Trækposen", no: "Trekkposen", fi: "Sattumapussi" },
    instruction:     { en: "Nobody may look inside. Say what you think is in there, then draw one at a time — every draw stays on the record, and every piece goes back in the bag.", de: "Niemand darf hineinschauen. Sagt zuerst, was ihr im Beutel vermutet, und zieht dann Marke für Marke. Jeder Zug bleibt in der Spur, die Marke wandert zurück in den Beutel.", fr: "Personne n’a le droit de regarder dedans. Dites d’abord ce que vous pensez qu’il y a dans le sac, puis tirez une pièce à la fois : chaque tirage reste inscrit sur le relevé, et la pièce, elle, retourne aussitôt dans le sac.", es: "Nadie puede mirar adentro. Digan primero qué creen que hay; luego saquen una pieza a la vez: cada pieza sacada se registra y enseguida regresa a la bolsa.", pt: "Ninguém pode olhar dentro. Digam primeiro o que vocês acham que tem aí, depois tirem uma de cada vez — cada sorteio fica no registro e a peça volta para dentro da sacola.", it: "Nessuno può guardare dentro. Dite prima che cosa pensate ci sia, poi estraete un pezzo alla volta: ogni estrazione resta sulla fila e ogni pezzo torna subito nel sacchetto.", nl: "Niemand mag in de zak kijken. Zeg eerst wat er volgens jullie in zit. Trek daarna één voor één: elke trekking komt in het spoor te staan, en het figuurtje gaat meteen weer terug in de zak.", sv: "Ingen får titta i påsen. Säg först vad ni tror finns i den. Dra sedan en i taget: varje drag syns kvar på raden, men själva biten läggs alltid tillbaka i påsen.", da: "Ingen må kigge i posen. Gæt først, hvad der er i den, og træk så en brik ad gangen: hvert træk bliver i rækken, og brikken går tilbage i posen.", no: "Ingen får se oppi posen. Si først hva dere tror ligger der, og trekk så én om gangen. Hvert trekk blir stående på raden, og brikken går tilbake i posen.", fi: "Kukaan ei saa katsoa pussiin. Sanokaa ensin, mitä arvelette pussissa olevan, ja nostakaa sitten yksi pala kerrallaan: jokainen nosto jää riviin, ja pala menee heti takaisin pussiin." },
    doctrine:        { en: "The same bag, never changed, fills every record — and what is inside shows only at the end.", de: "Derselbe Beutel, nie verändert, füllt jede Spur – und was darin liegt, zeigt sich erst am Schluss.", fr: "Toujours le même sac : dites ce que vous croyez qu’il y a dedans, puis comparez ce qui en sort.", es: "Siempre la misma bolsa: digan qué creen que hay dentro y después comparen lo que va saliendo.", pt: "Sempre a mesma sacola: digam o que vocês acham que tem dentro e depois comparem o que vai saindo.", it: "Sempre lo stesso sacchetto: dite che cosa pensate ci sia dentro, poi confrontate quello che esce.", nl: "Dezelfde zak, nooit veranderd, vult elk spoor – en wat erin zit, zie je pas op het eind.", sv: "Samma påse fyller varje rad, oförändrad: säg vad ni tror finns i den och jämför sedan raderna.", da: "Samme pose fylder hver række, uændret: sig jeres bud, og sammenlign så rækkerne.", no: "Samme pose fyller hver rad, uendret: si hva dere tror ligger i den, og sammenlign så radene.", fi: "Sama pussi täyttää jokaisen rivin muuttumattomana: sanokaa, mitä uskotte pussissa olevan, ja vertailkaa sitten rivejä." },
    hintFill:        { en: "Put some pieces in the bag.", de: "Legt ein paar Marken in den Beutel.", fr: "Mettez quelques pièces dans le sac.", es: "Pongan algunas piezas en la bolsa.", pt: "Coloquem algumas peças na sacola.", it: "Mettete qualche pezzo nel sacchetto.", nl: "Doe een paar figuurtjes in de zak.", sv: "Lägg några bitar i påsen.", da: "Læg nogle brikker i posen.", no: "Legg noen brikker i posen.", fi: "Laittakaa pussiin muutama pala." },
    hintGuess:       { en: "Put each piece into the bag, or out on the table.", de: "Legt jede Marke oben hinein oder unten auf den Tisch.", fr: "Montez une pièce dans le sac, ou descendez-la sur la table.", es: "Suban una pieza a la bolsa, o bájenla a la mesa.", pt: "Coloquem uma peça na sacola, em cima, ou na mesa, embaixo.", it: "Portate un pezzo in alto nel sacchetto, o in basso sul tavolo.", nl: "Leg elk figuurtje omhoog in de zak of omlaag op de tafel.", sv: "Dra varje bit in i påsen eller ut på bordet.", da: "Træk hver brik ind i posen eller ud på bordet.", no: "Dra hver brikke inn i posen eller ut på bordet.", fi: "Siirtäkää jokainen pala pussiin tai pöydälle." },
    hintCarry:       { en: "Now choose where it goes.", de: "Tippt oder wählt jetzt den Platz dafür.", fr: "Touchez maintenant l’endroit où elle va.", es: "Ahora toquen el lugar donde va.", pt: "Agora toquem no lugar onde ela vai.", it: "Ora toccate il posto dove deve andare.", nl: "Tik of kies nu de plek waar het heen gaat.", sv: "Tryck nu där den ska ligga.", da: "Tryk nu, hvor den skal ligge.", no: "Trykk nå der den skal ligge.", fi: "Napauttakaa nyt paikkaa, johon se menee." },
    hintClaimFirst:  { en: "First say what you think: put a piece into the bag, or on the table.", de: "Sagt erst eure Vermutung: legt wenigstens eine Marke oben oder unten hin.", fr: "Dites d’abord votre idée : montez une pièce dans le sac, ou descendez-la.", es: "Primero digan qué creen: suban una pieza a la bolsa, o bájenla.", pt: "Primeiro o palpite: coloquem uma peça na sacola ou na mesa.", it: "Prima la vostra idea: portate un pezzo nel sacchetto o sul tavolo.", nl: "Zeg eerst wat jullie denken: leg minstens één figuurtje boven of onder.", sv: "Säg först vad ni tror finns i påsen – flytta en bit.", da: "Sig først jeres bud – flyt mindst én brik.", no: "Si først hva dere tror ligger i posen – flytt én brikke.", fi: "Sanokaa ensin, mitä uskotte pussissa olevan – siirtäkää yksi pala." },
    hintDraw:        { en: "Tap the bag.", de: "Tippt auf den Beutel.", fr: "Touchez le sac.", es: "Toquen la bolsa.", pt: "Toquem na sacola.", it: "Toccate il sacchetto.", nl: "Tik op de zak.", sv: "Tryck på påsen.", da: "Tryk på posen.", no: "Trykk på posen.", fi: "Napauttakaa pussia." },
    hintAgain:       { en: "The same bag, and every piece went back in. Draw again.", de: "Derselbe Beutel, nichts dazu, nichts weg – jetzt noch eine Spur.", fr: "Le même sac : tout y est revenu. Recommencez.", es: "La misma bolsa: todo volvió adentro. Otra ronda.", pt: "A mesma sacola de sempre: cada peça já voltou. Sorteiem de novo.", it: "Lo stesso sacchetto: ogni pezzo è già tornato dentro. Estraete ancora.", nl: "Dezelfde zak, niets erbij, niets eruit – nu nog een spoor.", sv: "Samma påse, inget tillagt, inget borttaget. Dra en gång till.", da: "Samme pose, intet lagt til, intet taget fra. Træk igen.", no: "Samme pose, ingenting lagt til, ingenting tatt ut. Trekk igjen.", fi: "Sama pussi, mitään ei lisätty eikä otettu pois. Nostakaa uudelleen." },
    hintOpen:        { en: "Open the bag.", de: "Öffnet den Beutel.", fr: "Ouvrez le sac.", es: "Abran la bolsa.", pt: "Abram a sacola.", it: "Aprite il sacchetto.", nl: "Maak de zak open.", sv: "Öppna påsen.", da: "Åbn posen.", no: "Åpne posen.", fi: "Avatkaa pussi." },
    hintLook:        { en: "This was inside all along. Compare it with the record below.", de: "Das lag die ganze Zeit darin. Schaut jetzt darunter noch einmal hin.", fr: "C’était là depuis le début. Comparez avec ce qui est sorti.", es: "Esto estuvo ahí desde el principio. Compárenlo con lo que salió.", pt: "Isto estava aí desde o começo. Comparem com o que saiu.", it: "Era tutto qui dentro fin dall’inizio. Confrontate con quello che è uscito.", nl: "Dit zat er de hele tijd in. Vergelijk het met de trekkingen hieronder.", sv: "Det låg i påsen hela tiden. Titta ner på det ni drog.", da: "Det lå i posen hele tiden. Se ned på det, I trak.", no: "Dette lå i posen hele tiden. Se ned på det dere trakk.", fi: "Tämä oli pussissa koko ajan. Katsokaa vielä, mitä nostitte." },
    fillBtn:         { en: "Fill the bag", de: "Beutel füllen", fr: "Remplir le sac", es: "Llenar la bolsa", pt: "Encher a sacola", it: "Riempi il sacchetto", nl: "Zak vullen", sv: "Fyll påsen", da: "Fyld posen", no: "Fyll posen", fi: "Täytä pussi" },
    sealBtn:         { en: "Close the bag", de: "Beutel schließen", fr: "Fermer le sac", es: "Cerrar la bolsa", pt: "Fechar a sacola", it: "Chiudi il sacchetto", nl: "Zak sluiten", sv: "Stäng påsen", da: "Luk posen", no: "Lukk posen", fi: "Sulje pussi" },
    cancelBtn:       { en: "Leave the bag as it was", de: "Beutel unverändert lassen", fr: "Ne rien changer", es: "No cambiar nada", pt: "Não mudar nada", it: "Non cambiare niente", nl: "Zak laten zoals hij was", sv: "Låt påsen vara som den var", da: "Lad posen være, som den var", no: "La posen være som den var", fi: "Jätä pussi ennalleen" },
    againBtn:        { en: "Draw again", de: "Noch eine Spur", fr: "Recommencer", es: "Otra ronda", pt: "Sortear de novo", it: "Estrai di nuovo", nl: "Nog een spoor", sv: "En gång till", da: "Samme pose igen", no: "En gang til", fi: "Sama pussi uudelleen" },
    openBtn:         { en: "Open the bag", de: "Beutel öffnen", fr: "Ouvrir le sac", es: "Abrir la bolsa", pt: "Abrir a sacola", it: "Apri il sacchetto", nl: "Zak openmaken", sv: "Öppna påsen", da: "Åbn posen", no: "Åpne posen", fi: "Avaa pussi" },
    anotherBtn:      { en: "Another bag", de: "Neuer Beutel", fr: "Un autre sac", es: "Otra bolsa", pt: "Outra sacola", it: "Un altro sacchetto", nl: "Andere zak", sv: "En annan påse", da: "En anden pose", no: "En annen pose", fi: "Vaihda pussi" },
    printBtn:        { en: "Print the record", de: "Spur drucken", fr: "Imprimer le relevé", es: "Imprimir registro", pt: "Imprimir o registro", it: "Stampa la fila", nl: "Spoor afdrukken", sv: "Skriv ut raden", da: "Print rækken", no: "Skriv ut raden", fi: "Tulosta rivi" },
    gateLine:        { en: "The longest record, the picture pieces, many more bags and printing are part of the Teacher plan.", de: "Die lange Spur, Marken mit Bildern, viel mehr Beutel und das Drucken gehören zum Lehrer-Paket.", fr: "Le relevé le plus long, les pièces en images, beaucoup plus de sacs et l’impression font partie de l’offre Enseignant.", es: "El registro más largo, las piezas con dibujos, muchas más bolsas y la impresión vienen con el plan Docente.", pt: "O registro mais longo, as peças com figuras, muitas outras sacolas e a impressão fazem parte do plano Professor.", it: "La fila più lunga, i pezzi illustrati, molti più sacchetti e la stampa fanno parte del piano Insegnante.", nl: "Het lange spoor, figuurtjes met plaatjes, veel meer zakken en afdrukken horen bij het Leerkracht-pakket.", sv: "Den långa raden, bildbitarna, många fler påsar och utskrift ingår i Lärarpaketet.", da: "Den lange række, billedbrikkerne, mange flere poser og udskrivning hører til Lærerabonnementet.", no: "Den lange raden, bildebrikkene, mange flere poser og utskrift hører til Lærerabonnementet.", fi: "Opettaja-tilaus sisältää pitkän rivin, kuvapalat, paljon lisää pusseja ja tulostuksen." },
    unlock:          { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", es: "Ver plan Docente", pt: "Ver o plano Professor", it: "Il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Katso Opettaja-tilaus" },
    lenLabel:        { en: "How many draws", de: "Wie oft ziehen", fr: "Combien de tirages", es: "Cuántas veces sacamos", pt: "Quantos sorteios", it: "Quante estrazioni", nl: "Aantal trekkingen", sv: "Hur många drag", da: "Hvor mange træk", no: "Hvor mange trekk", fi: "Montako nostoa" },
    skinLabel:       { en: "What is in the bag", de: "Was im Beutel liegt", fr: "Ce qu’il y a dans le sac", es: "Qué hay en la bolsa", pt: "O que tem na sacola", it: "Che cosa c’è nel sacchetto", nl: "Wat er in de zak zit", sv: "Vad som ligger i påsen", da: "Hvad der ligger i posen", no: "Hva som ligger i posen", fi: "Mitä pussissa on" },
    skinShapes:      { en: "Shapes", de: "Formen", fr: "Formes", es: "Figuras", pt: "Formas", it: "Forme", nl: "Vormen", sv: "Former", da: "Former", no: "Former", fi: "Muodot" },
    drawAria:        { en: "the bag — draw one", de: "der Beutel — ein Teil ziehen", fr: "le sac — tirer une pièce", es: "la bolsa — sacar una pieza", pt: "a sacola — tirar uma peça", it: "il sacchetto — estrai un pezzo", nl: "de zak — trek er één uit", sv: "påsen — dra en bit", da: "posen — træk en brik", no: "posen — trekk en brikke", fi: "pussi — nosta yksi pala" },
    tagAria:         { en: "bag {i}", de: "Beutel {i}", fr: "sac {i}", es: "bolsa {i}", pt: "sacola {i}", it: "sacchetto {i}", nl: "zak {i}", sv: "påse {i}", da: "pose {i}", no: "pose {i}", fi: "pussi {i}" },
    litAria:         { en: "{piece}: mark every one drawn", de: "{piece}: alle davon hervorheben", fr: "repérer chaque {piece}", es: "resaltar cada {piece}", pt: "destacar todas as peças assim: {piece}", it: "evidenzia tutti i pezzi così: {piece}", nl: "{piece}: elke trekking hiervan markeren", sv: "markera varje {piece} som har dragits", da: "vis, hvor {piece} er trukket", no: "vis hvor {piece} er trukket", fi: "korosta jokainen {piece}, joka on nostettu" },
    guessLabel:      { en: "What the class thinks is in the bag", de: "Was die Klasse im Beutel vermutet", fr: "Ce que la classe pense qu’il y a dans le sac", es: "Lo que el grupo cree que hay en la bolsa", pt: "O que a turma acha que tem na sacola", it: "Che cosa pensa la classe", nl: "Wat de klas denkt dat er in de zak zit", sv: "Vad klassen tror finns i påsen", da: "Klassens bud på, hvad der er i posen", no: "Hva klassen tror ligger i posen", fi: "Mitä luokka arvelee pussissa olevan" },
    inLabel:         { en: "we think this is in the bag", de: "Das vermuten wir im Beutel", fr: "on pense que c’est dans le sac", es: "creemos que esto sí está en la bolsa", pt: "achamos que isto está na sacola", it: "secondo noi è nel sacchetto", nl: "dit zit er volgens ons in", sv: "det här tror vi finns i påsen", da: "i posen, tror vi", no: "dette tror vi ligger i posen", fi: "uskomme tämän olevan pussissa" },
    outLabel:        { en: "we think this is not in the bag", de: "Das vermuten wir nicht im Beutel", fr: "on pense que ce n’est pas dans le sac", es: "creemos que esto no está en la bolsa", pt: "achamos que isto não está na sacola", it: "secondo noi non è nel sacchetto", nl: "dit zit er volgens ons niet in", sv: "det här tror vi inte finns i påsen", da: "ikke i posen, tror vi", no: "dette tror vi ikke ligger i posen", fi: "uskomme, ettei tämä ole pussissa" },
    poolLabel:       { en: "not decided yet", de: "Noch nicht entschieden", fr: "on ne sait pas encore", es: "todavía no decidimos", pt: "ainda não decidimos", it: "ancora da decidere", nl: "nog niet beslist", sv: "inte bestämt än", da: "ikke bestemt endnu", no: "ikke bestemt ennå", fi: "vielä päättämättä" },
    recordAria:      { en: "record {i}", de: "Spur {i}", fr: "relevé {i}", es: "registro {i}", pt: "registro {i}", it: "fila {i}", nl: "spoor {i}", sv: "rad {i}", da: "række {i}", no: "rad {i}", fi: "rivi {i}" },
    cellAria:        { en: "{i}: {piece}", de: "{i}: {piece}", fr: "{i} : {piece}", es: "{i}: {piece}", pt: "{i}: {piece}", it: "{i}: {piece}", nl: "{i}: {piece}", sv: "{i}: {piece}", da: "{i}: {piece}", no: "{i}: {piece}", fi: "{i}: {piece}" },
    openedLabel:     { en: "what the bag held", de: "Was im Beutel war", fr: "ce qu’il y avait dans le sac", es: "lo que había en la bolsa", pt: "o que tinha na sacola", it: "che cosa c’era nel sacchetto", nl: "wat er in de zak zat", sv: "det här låg i påsen", da: "hvad der var i posen", no: "det som lå i posen", fi: "mitä pussissa oli" },
    moreAria:        { en: "{piece}: one more", de: "{piece}: eins mehr", fr: "{piece} : ajouter", es: "{piece}: agregar", pt: "{piece}: mais", it: "{piece}: aggiungi", nl: "één {piece} erbij", sv: "{piece}: fler", da: "{piece}: læg til", no: "{piece}: legg til", fi: "{piece}: yksi lisää" },
    lessAria:        { en: "{piece}: one fewer", de: "{piece}: eins weniger", fr: "{piece} : enlever", es: "{piece}: quitar", pt: "{piece}: menos", it: "{piece}: togli", nl: "één {piece} eraf", sv: "{piece}: färre", da: "{piece}: tag fra", no: "{piece}: ta bort", fi: "{piece}: yksi vähemmän" },
    pieceRound:      { en: "circle", de: "Kreis", fr: "rond", es: "círculo", pt: "círculo", it: "cerchio", nl: "cirkel", sv: "cirkel", da: "den runde brik", no: "sirkelen", fi: "ympyrä" },
    pieceSquare:     { en: "square", de: "Viereck", fr: "carré", es: "cuadrado", pt: "quadrado", it: "quadrato", nl: "vierkant", sv: "kvadrat", da: "den firkantede brik", no: "kvadratet", fi: "neliö" },
    pieceTriangle:   { en: "triangle", de: "Dreieck", fr: "triangle", es: "triángulo", pt: "triângulo", it: "triangolo", nl: "driehoek", sv: "triangel", da: "den trekantede brik", no: "trekanten", fi: "kolmio" },
    pieceDiamond:    { en: "diamond", de: "Raute", fr: "losange", es: "rombo", pt: "losango", it: "rombo", nl: "ruit", sv: "romb", da: "den rudeformede brik", no: "diamanten", fi: "vinoneliö" },
    pieceHexagon:    { en: "hexagon", de: "Sechseck", fr: "hexagone", es: "hexágono", pt: "hexágono", it: "esagono", nl: "zeshoek", sv: "sexhörning", da: "den sekskantede brik", no: "sekskanten", fi: "kuusikulmio" },
    pieceStar:       { en: "star", de: "Stern", fr: "étoile", es: "estrella", pt: "estrela", it: "stella", nl: "ster", sv: "stjärna", da: "den stjerneformede brik", no: "stjernen", fi: "tähti" }
  },

  STORE_KEY: 'lcs:draw-bag:v1',
  ENT_TRUST_DAYS: 14,

  defaults: {},
  settings: [],

  premium: false,
  premiumKnown: false,

  /* six kinds. The KIND is the model's identity; what it LOOKS like is a
     skin, and the gate asserts the drawn sequence is byte-identical
     across every skin — so changing the pictures provably cannot change
     the chance. */
  KINDS: ['c', 's', 't', 'd', 'h', 'x'],
  PIECE_KEY: { c: 'pieceRound', s: 'pieceSquare', t: 'pieceTriangle', d: 'pieceDiamond', h: 'pieceHexagon', x: 'pieceStar' },

  /* the three claim zones. 0 is the tray — NOT a claim, and drawn in a
     different grammar so it cannot be read as one ("maybe" is the hedge
     a class retreats into, and a hedge leaves nothing refutable). */
  ZONE_TRAY: 0,
  ZONE_IN: 1,
  ZONE_OUT: 2,
  /* the order a keyboard lift pre-targets through. ⚠ A PICK-UP AND A
     PUT-DOWN MUST NOT NET TO ZERO: the liveness gate presses Enter and
     Space in one tick, so a lift that targets the piece's CURRENT zone
     would score DEAD. Pre-targeting the NEXT zone makes the pair a
     genuine move. (sorting-hoops.js:2040) */
  ZONE_ORDER: [1, 2, 0],

  MAX_EACH: 12,
  MAX_TOTAL: 24,

  LENS: [10, 20, 40],
  FREE_LENS: [10, 20],
  DEFAULT_LEN: 20,

  /* =================================================================
     THE MODEL — pure, total, immutable. No DOM, no locale, no Date, and
     ⚠ NO UNSEEDED RANDOMNESS: `Math.random` and `crypto` do not appear
     in this file at all. Every draw is a pure function of
     (bag, seed, index).
     ================================================================= */

  _emptyCounts: function () {
    var o = {}, i;
    for (i = 0; i < this.KINDS.length; i++) o[this.KINDS[i]] = 0;
    return o;
  },

  _copyCounts: function (b) {
    var o = {}, i, k, v;
    for (i = 0; i < this.KINDS.length; i++) {
      k = this.KINDS[i];
      v = (b && typeof b[k] === 'number' && isFinite(b[k])) ? Math.floor(b[k]) : 0;
      o[k] = v > 0 ? v : 0;
    }
    return o;
  },

  newState: function () {
    return {
      bag: this._emptyCounts(),
      /* ⭐ THE DRAFT IS WHY `composition()` CAN THROW AND THE TOOL STILL
         HAS A BUILDER. The teacher edits a DRAFT; the render path reads
         the draft and never the sealed bag.
         ⚠⚠ AND THE DRAFT STARTS EMPTY. Build #3 seeded it from the
         sealed bag, so one free always-live chip painted the answer
         across the stage — measured byte-identical to `st.bag`. An empty
         draft is the only shape in which "the render path never sees the
         bag" is TRUE rather than merely claimed. */
      draft: null,
      /* per kind: 0 = on the tray, 1 = we think it is in, 2 = we think
         it is not. ⚠ EIGHT KEYS, FROZEN — the destination now travels as
         an ARGUMENT to placeGuess rather than as a ninth state field. */
      guess: this._emptyCounts(),
      committed: false,
      n: this.DEFAULT_LEN,
      runs: [],
      opened: false,
      skin: 'shapes'
    };
  },

  _clone: function (st) {
    var s = st || this.newState(), i;
    var runs = [];
    for (i = 0; i < (s.runs || []).length; i++) {
      runs.push({ seed: s.runs[i].seed, draws: s.runs[i].draws.slice() });
    }
    return {
      bag: this._copyCounts(s.bag),
      draft: s.draft ? this._copyCounts(s.draft) : null,
      guess: this._copyCounts(s.guess),
      committed: !!s.committed,
      n: s.n,
      runs: runs,
      opened: !!s.opened,
      skin: s.skin
    };
  },

  total: function (b) {
    var i, t = 0;
    for (i = 0; i < this.KINDS.length; i++) t += (b && b[this.KINDS[i]]) || 0;
    return t;
  },

  /* how many kinds the class has actually taken a position on. ⭐ THE
     BAG WILL NOT DRAW WHILE THIS IS ZERO — see canDraw. */
  claimed: function (g) {
    var i, n = 0;
    for (i = 0; i < this.KINDS.length; i++) if (((g && g[this.KINDS[i]]) || 0) !== 0) n++;
    return n;
  },

  /* ⭐ THE PREFIX-SUM WALK. This is the theorem the gate proves
     exhaustively: for every index in [0, total) it returns exactly the
     kind a hand-computed prefix sum says, so an off-by-one is
     deterministically fatal rather than a statistical wobble. The
     chi-squared test is only the backstop behind this. */
  at: function (b, i) {
    var k, key, c, acc = 0;
    if (typeof i !== 'number' || !isFinite(i) || i < 0) return null;
    for (k = 0; k < this.KINDS.length; k++) {
      key = this.KINDS[k];
      c = (b && b[key]) || 0;
      if (i < acc + c) return key;
      acc += c;
    }
    return null;
  },

  /* mulberry32 — the house idiom, inlined verbatim as in
     compare-tales-core.js:59, curate-wing-core.js:50,
     mochi-feast-core.js:125, echo-grove-activity.js:62 and
     fractions-core.js:268. */
  _mulberry32: function (a) {
    var s = a >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  },

  _mix: function (a, b) {
    var h = (a ^ Math.imul((b | 0) + 0x9E3779B9, 0x85EBCA6B)) | 0;
    h = Math.imul(h ^ (h >>> 13), 0xC2B2AE35) | 0;
    return (h ^ (h >>> 16)) >>> 0;
  },

  /* the seed is a pure function of the BAG, so the same bag gives the
     same run everywhere on earth — which is what lets the live verifier
     assert an exact sequence against production. `k` is the run number,
     and it is the ONLY thing that differs between run one and run two. */
  seedFor: function (b, k) {
    var i, s = 0;
    for (i = 0; i < this.KINDS.length; i++) s = this._mix(s, ((b && b[this.KINDS[i]]) || 0) + (i + 1) * 31);
    return this._mix(s, k);
  },

  /* uniform integer in [0, n) — REJECTION-SAMPLED, so there is no modulo
     bias for the chi-squared to trip over. The discipline is
     name-sticks.js:281-289, made SEEDED here: crypto is unseedable and
     determinism is a stated requirement of this tool. */
  _uniform: function (rng, n) {
    if (!(n > 0)) return 0;
    var limit = Math.floor(4294967296 / n) * n, v, guard = 0;
    do {
      v = Math.floor(rng() * 4294967296);
      guard++;
    } while (v >= limit && guard < 200);
    return v % n;
  },

  /* one draw, as a pure function of (bag, seed, index) */
  pick: function (b, seed, idx) {
    var t = this.total(b);
    if (t < 1) return null;
    var rng = this._mulberry32(this._mix(seed, idx));
    return this.at(b, this._uniform(rng, t));
  },

  /* ---- the builder ------------------------------------------------ */

  /* ⚠⚠ STARTS EMPTY, ALWAYS. See newState's note on `draft`. This is the
     fix for the worst defect in build #3, and it is one line. */
  openDraft: function (st) {
    var s = this._clone(st);
    s.draft = this._emptyCounts();
    return s;
  },

  /* ⚠ RETURNS NULL ON REFUSAL, never an unchanged clone. The recorded
     number-sieve defect: `setTarget` returned the untouched clone, so a
     failure carried the OLD data forward and committed itself as a
     success. A caller must be able to see the refusal. */
  setDraft: function (st, kind, delta) {
    var s = this._clone(st);
    if (!s.draft) return null;
    if (this.KINDS.indexOf(kind) === -1) return null;
    var d = Math.round(Number(delta));
    if (!(d === 1 || d === -1)) return null;
    var next = s.draft[kind] + d;
    if (next < 0 || next > this.MAX_EACH) return null;
    if (d === 1 && this.total(s.draft) >= this.MAX_TOTAL) return null;
    s.draft[kind] = next;
    return s;
  },

  /* closing the bag seals the draft AND clears everything downstream of
     it — a new bag means a new guess, no runs and a closed lid. */
  sealDraft: function (st) {
    var s = this._clone(st);
    if (!s.draft) return null;
    if (this.total(s.draft) < 1) return null;
    s.bag = this._copyCounts(s.draft);
    s.draft = null;
    s.guess = this._emptyCounts();
    s.committed = false;
    s.runs = [];
    s.opened = false;
    return s;
  },

  /* ⭐ THE WAY OUT THAT DESTROYS NOTHING. Build #3 had exactly one exit
     from the builder and it wiped the guess, both records and the lid —
     so a curious mid-lesson tap on "Fill the bag" cost the whole lesson
     and there was no way back. */
  cancelDraft: function (st) {
    var s = this._clone(st);
    if (!s.draft) return null;
    s.draft = null;
    return s;
  },

  /* ---- the guess -------------------------------------------------- */

  /* ⭐⭐ ABSOLUTE PLACEMENT, NEVER A CYCLE. Build #3 was
     `guess[kind] = (guess[kind] + 1) % 3`, and measured on one piece
     over six taps it went pool -> in -> out -> pool -> in -> out ->
     pool. The destination of any single tap was not choosable and the
     middle line cost three taps. That is the operator's "the objects
     could not be placed" in one line of source.
     ⭐ AND THE COMMITTED PRIOR — invention 3 — is frozen by REFUSAL
     rather than by a disabled attribute, so no path in the file can
     move it once a piece has been drawn. */
  placeGuess: function (st, kind, zone) {
    var s = this._clone(st);
    if (s.committed) return null;
    if (this.KINDS.indexOf(kind) === -1) return null;
    /* ⚠ AN EXACT ZONE, NOT A ROUNDED ONE. `Math.round(1.5)` is 2, so
       rounding first quietly turned a nonsense destination into a real
       one — the gate caught it on its first run. */
    var z = zone;
    if (typeof z !== 'number' || !isFinite(z) || Math.floor(z) !== z) return null;
    if (!(z === this.ZONE_TRAY || z === this.ZONE_IN || z === this.ZONE_OUT)) return null;
    /* a no-op is a refusal, per the setLen / setSkin doctrine — a
       control that provably does nothing must not report success. */
    if (s.guess[kind] === z) return null;
    s.guess[kind] = z;
    return s;
  },

  /* ---- drawing ---------------------------------------------------- */

  currentRun: function (st) {
    var s = st || this.newState();
    return s.runs.length ? s.runs[s.runs.length - 1] : null;
  },

  runFull: function (st, r) {
    var s = st || this.newState();
    return !!r && r.draws.length >= s.n;
  },

  canDraw: function (st) {
    var s = st || this.newState();
    if (this.total(s.bag) < 1) return false;
    if (s.opened) return false;
    /* ⭐⭐ THE PRIOR MUST EXIST BEFORE THE FIRST DRAW. Build #3 set
       `committed = true` on the first tap whatever the guess held, so
       one tap on the biggest object on the stage froze an all-zero
       prior. A signature invention that can be skipped by touching
       nothing WILL be skipped, in most lessons, silently. */
    if (!s.committed && this.claimed(s.guess) < 1) return false;
    var r = this.currentRun(s);
    if (!r) return true;
    return !this.runFull(s, r);
  },

  /* ⚠ THE BAG IS NEVER TOUCHED HERE — refusal 5. Drawing appends to the
     record and does nothing else, so with-replacement is structural and
     the gate has something real to assert after every single draw. */
  draw: function (st) {
    var s = this._clone(st);
    if (!this.canDraw(s)) return null;
    if (!s.runs.length) {
      s.committed = true;
      s.runs = [{ seed: this.seedFor(s.bag, 1), draws: [] }];
    }
    var r = s.runs[s.runs.length - 1];
    var got = this.pick(s.bag, r.seed, r.draws.length);
    if (!got) return null;
    r.draws = r.draws.concat([got]);
    return s;
  },

  /* ⭐ INVENTION 1 — the identical cause, run again. Nothing about the
     bag changes; only the run index feeding the seed does.
     ⭐⭐ AND IT IS FREE. In build #3 the entire thesis of the instrument
     sat behind the paywall while a dashed, unfillable second row was
     drawn on screen — which is precisely what the operator reported as
     a bug. The plan sells DEPTH (forty draws, the picture pieces, the
     hundred-and-twenty-bag library, printing), never the premise. */
  secondRun: function (st) {
    var s = this._clone(st);
    if (s.opened) return null;
    if (s.runs.length !== 1) return null;
    if (!this.runFull(s, s.runs[0])) return null;
    s.runs = s.runs.concat([{ seed: this.seedFor(s.bag, 2), draws: [] }]);
    return s;
  },

  openBag: function (st) {
    var s = this._clone(st);
    if (this.total(s.bag) < 1) return null;
    if (s.opened) return null;
    if (!s.runs.length) return null;
    s.opened = true;
    return s;
  },

  /* ⚠ THROWS BEFORE THE BAG IS OPEN. The estimation-jar idiom
     (revealedCount(), which throws so the true count cannot sit in the
     DOM, an aria-label, the title or the live region). This is
     structural unreachability, not a render-time `if` — and it is why
     the builder edits a DRAFT, and why that draft now starts EMPTY. */
  composition: function (st) {
    var s = st || this.newState();
    if (!s.opened) throw new Error('the bag is not open');
    return this._copyCounts(s.bag);
  },

  setLen: function (st, n) {
    var s = this._clone(st);
    var v = Math.round(Number(n));
    if (this.LENS.indexOf(v) === -1) return null;
    /* ⚠ refuse rather than destroy: changing the length once drawing has
       started would wipe a record the class is looking at, which is the
       recorded number-sieve "changing the field wiped the deck" defect.
       The chips are disabled too, but the model refuses on its own. */
    if (s.runs.length) return null;
    if (v === s.n) return null;
    s.n = v;
    return s;
  },

  /* ⚠ VALIDATES AGAINST THE OPEN SET. Build #3 accepted any non-empty
     string and leaned entirely on the click handler for entitlement,
     which contradicts its own "locked entries are ABSENT, never merely
     hidden" doctrine twice over. `open` is passed in so the model stays
     free of entitlement state. */
  setSkin: function (st, id, open) {
    var s = this._clone(st), i, ok = (id === 'shapes');
    if (typeof id !== 'string' || !id) return null;
    if (id === s.skin) return null;
    for (i = 0; !ok && i < (open || []).length; i++) if (open[i] && open[i].id === id) ok = true;
    if (!ok) return null;
    s.skin = id;
    return s;
  },

  loadBag: function (st, rec) {
    var s = this._clone(st);
    if (!rec || !rec.b) return null;
    var b = this._copyCounts(rec.b);
    if (this.total(b) < 1) return null;
    s.bag = b;
    s.draft = null;
    s.guess = this._emptyCounts();
    s.committed = false;
    s.runs = [];
    s.opened = false;
    return s;
  },

  /* =================================================================
     ENTITLEMENT — the pattern from pattern-bench.js:239-265.
     ⚠ UNKNOWN IS PESSIMISTIC (no `&& premiumKnown` on a control gate),
     and locking a control is not enough: the state it produced must be
     reset once we actually know. See render().
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

  /* ---- THE BAG BOOK. Locale-NEUTRAL in its bags: a bag is six counts
     and nothing else. The SKINS carry per-locale labels, but those are
     BAKED FROM PLATFORM SoT at generation time — the nouns from
     `REFERENCE TRANSLATIONS/image-vocabulary.js` and the theme names
     from `frontend/config/topics-taxonomy.json` — so this tool adds no
     new authored language for its material. ---------------------- */
  /* ⚠ THE FALLBACK CARRIES THE FREE BAGS INLINE, never an empty array. An
     empty fallback means a 404 turns the bag book into a dead control
     for a subscriber — arrow-strip shipped exactly that. A 404 must
     degrade to the FREE TIER, not to nothing.
     ⭐ AND THE ORDER IS A TEACHING LADDER, NOT AN ID SEQUENCE. b-001 is a
     ONE-KIND bag whose two runs come out byte-identical — the control
     condition the whole thesis needs, because without it "two rows
     differ" is just noise and with it the class learns that what decides
     sameness is what is in the bag. Then very lopsided, lopsided,
     moderate, even, even-three, four kinds, and the busy six-kind bag
     LAST. Build #3 seated a 10:7 bag first and buried the best
     demonstration in the library at position four. */
  FALLBACK_BAGS: {
    version: 1, freeMax: 8, premiumMax: 120,
    bags: [
      { id: 'b-001', b: { c: 9, s: 0, t: 0, d: 0, h: 0, x: 0 }, free: true },
      { id: 'b-002', b: { c: 0, s: 0, t: 0, d: 9, h: 4, x: 0 }, free: true },
      { id: 'b-003', b: { c: 0, s: 9, t: 5, d: 0, h: 0, x: 0 }, free: true },
      { id: 'b-004', b: { c: 10, s: 7, t: 0, d: 0, h: 0, x: 0 }, free: true },
      { id: 'b-005', b: { c: 9, s: 0, t: 0, d: 0, h: 0, x: 9 }, free: true },
      { id: 'b-006', b: { c: 0, s: 0, t: 5, d: 5, h: 5, x: 0 }, free: true },
      { id: 'b-007', b: { c: 4, s: 2, t: 0, d: 0, h: 8, x: 7 }, free: true },
      { id: 'b-008', b: { c: 2, s: 6, t: 6, d: 3, h: 2, x: 2 }, free: true }
    ],
    /* no picture skins offline: the shapes skin is built in and needs no
       record, so a 404 lands on the FREE TIER exactly as it stands. */
    skins: []
  },

  _fetchBags: function () {
    var self = this;
    fetch('/mini-tools/draw-bag-bags.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_BAGS; })
      .then(function (d) {
        self.data = (d && d.bags && d.bags.length) ? d : self.FALLBACK_BAGS;
        self._settle();
      });
  },

  /* locked entries are ABSENT from the array, never merely hidden */
  bagsFor: function () {
    var all = (this.data && this.data.bags) || [], out = [], i;
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    return out;
  },

  skinsFor: function () {
    var all = (this.data && this.data.skins) || [], out = [], i;
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    return out;
  },

  skinDef: function (id) {
    var want = (typeof id === 'string' && id) ? id : (this.st && this.st.skin);
    var all = (this.data && this.data.skins) || [], i;
    for (i = 0; i < all.length; i++) if (all[i].id === want) return all[i];
    return null;
  },

  lensFor: function () { return this.premium ? this.LENS : this.FREE_LENS; },

  /* seat the opening bag once the book has arrived.
     ⚠ IT RENDERS EVEN WITH NO BOOK. Build #3 returned before its own
     render() when `this.data` was absent, so pressing the shell's Reset
     during the first seconds of a cold load on school wifi reset the
     MODEL and left the DOM standing — and the next draw appended to a
     record that no longer existed in state. */
  _settle: function () {
    if (this.data && this.st && this.total(this.st.bag) < 1) {
      var open = this.bagsFor();
      if (open.length) {
        var next = this.loadBag(this.st, open[0]);
        if (next) { this.st = next; this._bagIdx = 0; }
      }
    }
    if (this._wrap) this.render();
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectDrawBagCSS();
    injectDrawBagDefs();
    /* ⭐ THE WIDE-VIEWPORT SWITCH, and the one-line rollback. Everything it
       enables lives above 1367px, so it is inert at every gate width. */
    document.body.classList.add('drb-wide');
    this._store = this._loadStore();
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this.st = this.newState();
    this._timers = [];
    this._bagIdx = 0;
    this._carry = null;        /* kind currently lifted, or null */
    this._target = null;       /* the zone a lifted piece is aimed at */
    this._lit = null;          /* kind whose cells are lit in both records */
    this._fetchBags();
    this._fetchEntitlement();
    this.render();
  },

  reset: function () {
    this.st = this.newState();
    this._bagIdx = 0;
    this._carry = null;
    this._target = null;
    this._lit = null;
    /* _settle seats the opening bag AND renders — and now it renders
       even when the book has not arrived, so this is never a no-op. */
    this._settle();
  },

  destroy: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
    this._unwire();
    document.body.classList.remove('drb-wide');
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    /* ⚠ locking a control is not enough — reset the STATE it produced.
       If we learn the account is free while a premium skin or the long
       record is out, put them away. (pattern-bench:290) */
    if (this.premiumKnown && !this.premium) {
      if (this.st.skin !== 'shapes') {
        var open = this.skinsFor(), i, ok = false;
        for (i = 0; i < open.length; i++) if (open[i].id === this.st.skin) ok = true;
        if (!ok) this.st.skin = 'shapes';
      }
      if (this.FREE_LENS.indexOf(this.st.n) === -1 && !this.st.runs.length) this.st.n = this.DEFAULT_LEN;
    }
    if (this.st.committed) { this._carry = null; this._target = null; }
    api.stage.innerHTML = '';
    /* ⚠ THE BASE CLASS IS A PLAIN LITERAL. `audit-tool-control-liveness`
       resolves a tool's class prefix with /api\.el\('div', '([a-z]+)-wrap'\)/
       across all 47 tools, and a concatenated argument made this tool
       unresolvable — the shared gate refused to run at all. Cheaper and
       cleaner to keep the literal than to widen a gate every sibling relies
       on. The state modifier goes on afterwards. */
    var wrap = api.el('div', 'drb-wrap');
    if (this.st.opened) wrap.classList.add('drb-isopen');
    this._wrap = wrap;
    /* ⚠⚠ THE BAND SITS ABOVE THE STAGE AND IS THE ONLY EXPLANATION THIS
       TOOL GIVES THAT A TEACHER CAN SEE. `strings.instruction` is
       rendered by the shell into `.lcs-instruction` and killed by
       `lcs-shell.css:261` `.lcs-app.embed .lcs-instruction{display:none}`
       — and `lcs-shell.js:427` sets `embed` for ANY iframed load, which
       every production surface is. So the one sentence carrying the
       premise has never been seen by a teacher. It survives in the
       role="application" accessible name, which is why it is DUPLICATED
       here rather than moved. (sorting-hoops.js:1206, wodb.js:999) */
    wrap.appendChild(this._buildBand());
    if (this.st.draft) {
      wrap.appendChild(this._buildFill());
    } else {
      wrap.appendChild(this._buildGuess());
      if (this.st.opened) wrap.appendChild(this._buildOpened());
      wrap.appendChild(this._buildMain());
    }
    wrap.appendChild(this._buildFoot());
    wrap.appendChild(this._buildBar());
    api.stage.appendChild(wrap);
    this._wire();
  },

  /* =================================================================
     THE PIECES. A kind is rendered by the current SKIN — an SVG shape
     for `shapes`, an image for a picture skin — and the gate asserts the
     DRAWN SEQUENCE is byte-identical across every skin, so the pictures
     provably cannot change the chance.
     ⚠ NO TEXT NODE ANYWHERE ON THE STAGE. Not a numeral, not a letter.
     The shapes are polygons and the pictures are images; every name in
     this tool lives in an aria-label, which is invisible.
     ⭐ THE GEOMETRY AND THE PALETTE WERE BOTH MEASURED AND BOTH FAILED.
     Build #3's diamond was the SQUARE ROTATED 45 DEGREES — same vertex
     count, same everything — and at 22px in a column they were one
     shape. It is now a true rhombus at width/height 0.70: the tallest
     and narrowest piece in the set, against a square that is now the
     stubbiest. Equal optical area is DELIBERATELY broken for it, and
     that is safe here in a way it is not in sorting-hoops: there, size
     was a sortable attribute; here nothing is ever sorted by size and at
     most one piece sits in a cell, so no size comparison is invited.
     The palette's worst-case colour-blind separation was dE00 0.7 — the
     purple diamond and the slate star were ONE OBJECT under
     deuteranopia, in a class where one child in twenty-six sees that
     way. Green had to go (coral-green 3.1 under protanopia, amber-green
     10.9); blue replaces it, and the set now measures 15.4 worst-case
     with an L* ladder of six distinct steps, so it also survives
     greyscale and a photocopier.
     ================================================================= */
  SVG_NS: 'http://www.w3.org/2000/svg',
  SHAPE: {
    c: { tag: 'circle', at: { cx: '12', cy: '12', r: '8.4' } },
    s: { tag: 'rect', at: { x: '4.35', y: '4.35', width: '15.3', height: '15.3', rx: '3.2' } },
    t: { tag: 'polygon', at: { points: '12,2.35 22.4,21.65 1.6,21.65' } },
    d: { tag: 'polygon', at: { points: '12,1.5 19.35,12 12,22.5 4.65,12' } },
    h: { tag: 'polygon', at: { points: '12,2.76 20,7.38 20,16.62 12,21.24 4,16.62 4,7.38' } },
    x: { tag: 'polygon', at: { points: '12,1.4 15.3,7.45 22.08,8.72 17.34,13.74 18.23,20.58 12,17.62 5.77,20.58 6.66,13.74 1.92,8.72 8.7,7.45' } }
  },
  /* the specular, one per kind, clipped to the shape by the shared defs
     block so a piece reads as a physical counter and not a flat icon */
  HI: {
    c: { cx: '9', cy: '8.4', rx: '5.2', ry: '3.4' },
    s: { cx: '9.4', cy: '8.6', rx: '4.6', ry: '3', },
    t: { cx: '11', cy: '12.4', rx: '4.6', ry: '2.8' },
    d: { cx: '10.4', cy: '8.4', rx: '3.2', ry: '3.4' },
    h: { cx: '9.6', cy: '8.4', rx: '4.6', ry: '3.2' },
    x: { cx: '10.4', cy: '9.4', rx: '3.6', ry: '2.6' }
  },

  /* ⚠ THE SKIN IS AN ARGUMENT, NEVER READ OFF LIVE STATE. The first cut
     rendered a skin chip by assigning `st.skin`, drawing, then putting
     it back — a mutation of the model from inside the render path, and
     the kind of thing that works until something between the two lines
     throws. Pass it. */
  _pieceNode: function (kind, skinId) {
    var sk = this.skinDef(skinId);
    if (sk && sk.items && sk.items[kind]) {
      var im = document.createElement('img');
      im.className = 'drb-piece drb-pic';
      im.src = '/image-library-webp/themes/' + encodeURIComponent(sk.items[kind].dir) + '/' + sk.items[kind].file + '@2x.webp';
      im.alt = '';
      im.draggable = false;
      im.setAttribute('aria-hidden', 'true');
      return im;
    }
    var def = this.SHAPE[kind], hi = this.HI[kind];
    var svg = document.createElementNS(this.SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'drb-piece drb-k-' + kind);
    svg.setAttribute('aria-hidden', 'true');
    var node = document.createElementNS(this.SVG_NS, def.tag);
    var a;
    for (a in def.at) if (Object.prototype.hasOwnProperty.call(def.at, a)) node.setAttribute(a, def.at[a]);
    svg.appendChild(node);
    if (hi) {
      var g = document.createElementNS(this.SVG_NS, 'ellipse');
      g.setAttribute('cx', hi.cx); g.setAttribute('cy', hi.cy);
      g.setAttribute('rx', hi.rx); g.setAttribute('ry', hi.ry);
      g.setAttribute('class', 'drb-hi');
      g.setAttribute('clip-path', 'url(#drb-cl-' + kind + ')');
      svg.appendChild(g);
    }
    return svg;
  },

  /* the accessible name of a kind: authored for the shapes skin, and
     BAKED FROM image-vocabulary.js for a picture skin — so a screen
     reader hears "apple" on the fruit skin and "the round one" on the
     shape skin, and neither cost a new authoring pass. */
  _pieceName: function (kind, skinId) {
    var sk = this.skinDef(skinId);
    if (sk && sk.items && sk.items[kind] && sk.items[kind].name) {
      var nm = sk.items[kind].name;
      return nm[this.api.lang] || nm.en || this.api.t(this.PIECE_KEY[kind]);
    }
    return this.api.t(this.PIECE_KEY[kind]);
  },

  _skinName: function (sk) {
    if (!sk) return this.api.t('skinShapes');
    var nm = sk.name || {};
    return nm[this.api.lang] || nm.en || sk.id;
  },

  /* =================================================================
     THE BAND — chrome, not apparatus, so it may carry words and does.
     Line one is the permanent doctrine; line two is the rung, guarded
     on real state so it can never instruct a move the model refuses.
     (wodb.js:1229 credits the ladder to lids._buildHint.)
     ================================================================= */
  _buildBand: function () {
    var api = this.api, s = this.st;
    var band = api.el('div', 'drb-band');
    var l1 = api.el('div', 'drb-doctrine');
    l1.textContent = api.t('doctrine');
    var l2 = api.el('div', 'drb-hint');
    /* ⚠ THE RUNG IS A KEY, NOT A STRING. `_hintText()` returning finished
       prose put an opaque call where the no-numeral gate expects an
       authored lookup, and it also made the rung unreachable to a
       string-reachability probe: a key that is only ever produced inside
       a helper cannot be observed being ASKED FOR. Returning the key and
       resolving it here is the sorting-hoops._buildHint shape. */
    l2.textContent = api.t(this._hintKey());
    band.appendChild(l1);
    band.appendChild(l2);
    return band;
  },

  /* ⭐ EVERY RUNG IS GUARDED ON REAL STATE, so the band can never
     instruct a move the model would refuse — and because it returns a
     KEY, the reachability probe can enumerate the state space and prove
     every authored rung is actually asked for. (wodb.js:1229) */
  _hintKey: function () {
    var s = this.st;
    if (s.draft) return 'hintFill';
    if (this.total(s.bag) < 1) return 'hintFill';
    if (s.opened) return 'hintLook';
    if (this._carry) return 'hintCarry';
    if (!s.committed && this.claimed(s.guess) < 1) return 'hintClaimFirst';
    if (!s.runs.length) return 'hintGuess';
    if (this.canDraw(s)) return 'hintDraw';
    if (s.runs.length === 1) return 'hintAgain';
    return 'hintOpen';
  },

  /* =================================================================
     THE BUILDER. The teacher fills the bag here — this is the whole of
     "the bag draws whatever the teacher selects", and it is FREE.
     It edits a DRAFT that STARTS EMPTY, so the sealed bag is never on
     the render path.
     ⚠ THE COUNTS ARE HEAPS IN A DISH, NOT STACKS IN A COLUMN. Build #3
     drew six per-kind columns of stacked pieces — a bar chart, watched
     by the class while the teacher filled the bag, which is exactly the
     thing refusal 2 forbids eleven lines later on the record.
     ================================================================= */
  _buildFill: function () {
    var api = this.api, self = this, s = this.st;
    var box = api.el('div', 'drb-fill');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('fillBtn'));
    this.KINDS.forEach(function (k) {
      var col = api.el('div', 'drb-fillcol');

      var more = api.el('button', 'drb-step');
      more.type = 'button';
      more.setAttribute('aria-label', api.t('moreAria').replace('{piece}', self._pieceName(k)));
      more.appendChild(self._plusNode());
      more.disabled = s.draft[k] >= self.MAX_EACH || self.total(s.draft) >= self.MAX_TOTAL;
      more.addEventListener('click', function () {
        var next = self.setDraft(self.st, k, 1);
        if (!next) return;
        self.st = next;
        self.api.announce(api.t('moreAria').replace('{piece}', self._pieceName(k)));
        self.render();
      });

      /* the draft count is shown as PIECES, never as a numeral —
         refusal 1 holds inside the builder too. They lie HEAPED in a
         shallow dish, overlapping, so the six kinds cannot line up into
         readable bars. */
      var dish = api.el('div', 'drb-dish');
      dish.setAttribute('aria-hidden', 'true');
      var i, pc;
      for (i = 0; i < s.draft[k]; i++) {
        pc = api.el('span', 'drb-heap drb-heap' + (i % 6));
        pc.appendChild(self._pieceNode(k));
        dish.appendChild(pc);
      }
      if (!s.draft[k]) dish.appendChild(api.el('div', 'drb-none'));

      var less = api.el('button', 'drb-step');
      less.type = 'button';
      less.setAttribute('aria-label', api.t('lessAria').replace('{piece}', self._pieceName(k)));
      less.appendChild(self._minusNode());
      less.disabled = s.draft[k] <= 0;
      less.addEventListener('click', function () {
        var next = self.setDraft(self.st, k, -1);
        if (!next) return;
        self.st = next;
        self.api.announce(api.t('lessAria').replace('{piece}', self._pieceName(k)));
        self.render();
      });

      col.appendChild(more);
      col.appendChild(dish);
      col.appendChild(less);
      box.appendChild(col);
    });
    return box;
  },

  /* the two stepper glyphs are SVG strokes, not "+" and "−" characters:
     a text node on the stage is exactly what the no-words law forbids,
     and a minus sign is also the one character the Cold Line reserves. */
  _plusNode: function () {
    var svg = document.createElementNS(this.SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'drb-glyph');
    svg.setAttribute('aria-hidden', 'true');
    var a = document.createElementNS(this.SVG_NS, 'path');
    a.setAttribute('d', 'M12 5 V19 M5 12 H19');
    svg.appendChild(a);
    return svg;
  },
  _minusNode: function () {
    var svg = document.createElementNS(this.SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'drb-glyph');
    svg.setAttribute('aria-hidden', 'true');
    var a = document.createElementNS(this.SVG_NS, 'path');
    a.setAttribute('d', 'M5 12 H19');
    svg.appendChild(a);
    return svg;
  },

  /* a padlock, as a shape. The idiom is learning-clock.js:1329 — a
     locked control needs a signal that is not a colour, because
     `.drb-locked` differing from an unlocked chip only by border-colour
     and text-colour is pure colour signalling at 4.08:1. */
  _lockNode: function () {
    var svg = document.createElementNS(this.SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'drb-lock');
    svg.setAttribute('aria-hidden', 'true');
    var body = document.createElementNS(this.SVG_NS, 'rect');
    body.setAttribute('x', '5'); body.setAttribute('y', '10.5');
    body.setAttribute('width', '14'); body.setAttribute('height', '9.5');
    body.setAttribute('rx', '2.2');
    body.setAttribute('class', 'drb-lockbody');
    var sh = document.createElementNS(this.SVG_NS, 'path');
    sh.setAttribute('d', 'M8.4 10.5 V7.6 a3.6 3.6 0 0 1 7.2 0 V10.5');
    sh.setAttribute('class', 'drb-lockshackle');
    svg.appendChild(sh);
    svg.appendChild(body);
    return svg;
  },

  /* =================================================================
     THE GUESS — the bag, the tray, the table. No words and no ticks or
     crosses.
     ⭐⭐ CONTAINMENT IS THE CHANNEL. Build #3 drew three peer boxes
     distinguished by a border style and two tints that measured 1.13:1
     and 1.08:1 on cream — arithmetically invisible on a projector — so
     the only real signal was a dashed border, which eleven lines away in
     the same stylesheet meant LOCKED. Now:
        IN   is drawn as the INTERIOR OF THE BAG seen through its mouth,
             and pieces settle on its floor.
        TRAY is a shallow dish — the supply, in a different grammar, so
             "not decided" cannot be read as a third verdict.
        OUT  is NOT A BOX AT ALL. It is the table: a ground line, pieces
             standing on it with a small cast shadow. That absence is
             the meaning, and it is sorting-hoops.js:1345's ruling
             applied here.
     ⚠ ALL SIX KINDS ARE ALWAYS SHOWN, whatever is in the bag — showing
     only the kinds that are in there would hand the class the answer.
     ⭐ AFTER THE COMMIT THE PIECES DO NOT GO INERT: they become the
     highlight control (see _wire). A frozen prior that is also a lens on
     both records is worth more than a frozen prior that is furniture.
     ================================================================= */
  _buildGuess: function () {
    var api = this.api, self = this, s = this.st;
    var box = api.el('div', 'drb-guess' + (s.opened ? ' drb-collapsed' : '') + (this._carry ? ' drb-carrying' : ''));
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('guessLabel'));

    var zones = [
      { v: this.ZONE_IN, cls: 'drb-in', label: api.t('inLabel') },
      { v: this.ZONE_TRAY, cls: 'drb-pool', label: api.t('poolLabel') },
      { v: this.ZONE_OUT, cls: 'drb-out', label: api.t('outLabel') }
    ];

    zones.forEach(function (z) {
      var row = api.el('div', 'drb-shelf ' + z.cls + (self._target === z.v ? ' drb-aim' : ''));
      row.setAttribute('role', 'group');
      row.setAttribute('aria-label', z.label);
      row.setAttribute('data-zone', String(z.v));
      /* ⭐ THE ZONE SAYS WHAT IT IS WITH THE TOOL'S OWN OBJECT. A watermark
         of the open sack behind the "in the bag" pieces — the same drawing
         the class is already looking at, at a tenth of the ink. No new noun,
         no caption, and it survives every locale because it is a picture. */
      /* ⚠⚠ THERE IS NO WATERMARK HERE, AND THAT IS A REVERSAL. A faint
         open-sack drawn behind the pieces read, on the render, as a pale
         SEVENTH PIECE sitting between the circle and the square — which is
         the defect this file's own _buildMain comment already records
         ("a 38px open-sack badge beside the reveal rendered as a dark
         smudge that read like a seventh piece"). I reproduced it. The zone
         states what it is by BEING a container: cream interior, teal
         walls, a shadow where the mouth would throw one, and a floor —
         against an "out" zone that has no walls at all. */
      var any = false;
      self.KINDS.forEach(function (k) {
        if (s.guess[k] !== z.v) return;
        any = true;
        var b = api.el('button', 'drb-gpiece'
          + (self._carry === k ? ' drb-carry' : '')
          + (self._lit === k ? ' drb-on' : ''));
        b.type = 'button';
        b.setAttribute('data-kind', k);
        b.setAttribute('aria-label', s.committed
          ? api.t('litAria').replace('{piece}', self._pieceName(k))
          : self._pieceName(k) + ' — ' + z.label);
        if (s.committed) b.setAttribute('aria-pressed', String(self._lit === k));
        else b.setAttribute('aria-grabbed', String(self._carry === k));
        b.appendChild(self._pieceNode(k));
        row.appendChild(b);
      });
      if (!any) row.appendChild(api.el('div', 'drb-shelfempty'));
      box.appendChild(row);
    });
    return box;
  },

  /* =================================================================
     THE BAG AND THE RECORDS.
     ⚠ RECORD TWO LIES UNDER RECORD ONE AND IS NEVER A GHOST OVERLAY —
     arrow-strip owns run-over-ghost. And ⭐ both records are grids of the
     SAME WIDTH with the SAME auto-fill rule over the SAME quintets, so
     their column counts are identical BY LAYOUT rather than by
     arithmetic. Nothing computes an alignment that could drift from what
     is on screen.
     ⭐ WHAT IS MARKED IS THEIR SAMENESS, NOT THEIR DIFFERENCE: one bag
     in the gutter, a spine, a fork into each rail. Any mark that
     individuates the rows works against the thesis, because the whole
     point is that they are the same kind of thing twice; order is
     carried by vertical position and needs no numeral in any locale.
     ⭐⭐ AND THE TRACK IS DRAWN BEFORE THE FIRST DRAW. Build #3 rendered
     nothing at all until `runs` was non-empty, so a cold load was a bag
     beside an empty div — the length chips had no visible consequence,
     and at desktop the bag sat pinned to the left of ~560px of nothing.
     Twenty empty seats beside a bag is a promise: this many draws are
     going to happen, and they land here.
     ================================================================= */
  _buildMain: function () {
    var api = this.api, self = this, s = this.st;
    var main = api.el('div', 'drb-main');

    if (!s.opened) {
      var bagBtn = api.el('button', 'drb-bag');
      bagBtn.type = 'button';
      bagBtn.setAttribute('aria-label', api.t('drawAria'));
      /* ⚠⚠ THE BAG NEVER GOES DEAD. In build #3 the instant record one
         filled, three things changed in the same tick — the bag turned
         `disabled` at `opacity:.5`, "Run it again" became live, and a
         dashed unfillable row appeared — and the eye registered exactly
         one of them: the biggest object on the stage going grey and
         answering nothing. It is disabled ONLY when there is no bag. */
      bagBtn.disabled = this.total(s.bag) < 1;
      bagBtn.appendChild(this._bagNode(false, this._bagIdx));
      main.appendChild(bagBtn);
      this._bagBtn = bagBtn;
    }

    var recs = api.el('div', 'drb-recs');
    var spine = api.el('div', 'drb-spine');
    spine.setAttribute('aria-hidden', 'true');
    spine.appendChild(this._bagNode(s.opened, this._bagIdx, true));
    recs.appendChild(spine);
    var rails = api.el('div', 'drb-rails');
    s.runs.forEach(function (r, ri) { rails.appendChild(self._buildRecord(r, ri + 1)); });
    if (!s.runs.length) rails.appendChild(this._buildRecord(null, 1));
    recs.appendChild(rails);
    if (this._lit) recs.setAttribute('data-lit', this._lit);
    main.appendChild(recs);
    return main;
  },

  _buildRecord: function (run, idx) {
    var api = this.api, self = this, s = this.st;
    var row = api.el('div', 'drb-rec');
    row.setAttribute('role', 'list');
    row.setAttribute('aria-label', api.t('recordAria').replace('{i}', String(idx)));
    var i, quint = null;
    for (i = 0; i < s.n; i++) {
      /* ⭐ FIVES. A gap after every fifth seat is a fixed property of the
         RAIL, present before any draw, so it can never be read as a
         count of anything — and it lets a class take in a forty-seat
         record in eight glances instead of forty. The landmark idiom is
         lids.js:2220; a per-cell tick is refused outright (refusal 10)
         and would in any case land on a different column on every row
         under an auto-fill grid. */
      if (i % 5 === 0) { quint = api.el('div', 'drb-quint'); row.appendChild(quint); }
      var got = run ? run.draws[i] : null;
      var cell = api.el('div', 'drb-cell' + (got ? ' drb-full drb-c-' + got : ''));
      if (got) {
        cell.setAttribute('role', 'listitem');
        cell.setAttribute('aria-label', api.t('cellAria').replace('{i}', String(i + 1)).replace('{piece}', self._pieceName(got)));
        cell.appendChild(self._pieceNode(got));
      } else {
        cell.setAttribute('aria-hidden', 'true');
        cell.appendChild(api.el('span', 'drb-seat'));
      }
      quint.appendChild(cell);
    }
    return row;
  },

  /* THE BAG. `opened` draws the same sack with its mouth open, its
     ruffle fallen outward into two flaps and its cord SLACK.
     ⚠⚠ THE OPEN/CLOSED SIGNAL IN BUILD #3 DID NOT EXIST. `.drb-bagtie`
     and `.drb-bagmouth` were `#0E5147` on a `#146B5E` body — measured
     1.44:1 — so on a projector the open bag and the closed bag were the
     same teal blob. The cord and the mouth are now CREAM at 4.9:1, and
     taut-vs-slack is a second channel that carries no colour at all.
     ⚠ AND THE SHAPE ITSELF HAD TO CHANGE. A flat trapezoid neck over a
     smooth body is a vase; cloth gathered by a drawstring has RUFFLES,
     and three arcs low on the belly are the only cue in the drawing that
     says it holds something. */
  _bagNode: function (opened, idx, small) {
    var svg = document.createElementNS(this.SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('class', 'drb-bagsvg' + (small ? ' drb-bagsmall' : ''));
    svg.setAttribute('aria-hidden', 'true');
    var mk = function (tag, cls, at) {
      var n = document.createElementNS('http://www.w3.org/2000/svg', tag), a;
      if (cls) n.setAttribute('class', cls);
      for (a in at) if (Object.prototype.hasOwnProperty.call(at, a)) n.setAttribute(a, at[a]);
      return n;
    };
    svg.appendChild(mk('ellipse', 'drb-bagshadow', { cx: '50', cy: '95.5', rx: '30', ry: '4' }));

    if (opened) {
      svg.appendChild(mk('path', 'drb-bagbody', { d: 'M30 40 C22 49 17 58 15.5 68 C14 78 17 86.5 25.5 90.5 C32.5 93.8 41 94.5 50 94.5 C59 94.5 67.5 93.8 74.5 90.5 C83 86.5 86 78 84.5 68 C83 58 78 49 70 40 Z' }));
      svg.appendChild(mk('path', 'drb-baghi', { d: 'M32 44 C25 52 20.5 60 19 68.5 C17.8 74.5 18.4 79 21 82.5 C17.6 75 19.8 63.5 24.5 55 C26.7 50.9 29.3 47.2 32 44 Z' }));
      /* the ruffle has fallen OUTWARD into two flaps */
      /* ⚠ THE FLAPS TURN DOWN, NOT UP. Curled upward they rendered as two
         HORNS and the bag read as a cauldron with handles — visible the
         moment the render was looked at, invisible to every measurement. */
      svg.appendChild(mk('path', 'drb-bagbody', { d: 'M31 39 C25.5 40.5 21.5 44 20 48.5 C24 45 27.5 43.6 31.5 43.4 C31 42 30.9 40.4 31 39 Z' }));
      svg.appendChild(mk('path', 'drb-bagbody', { d: 'M69 39 C74.5 40.5 78.5 44 80 48.5 C76 45 72.5 43.6 68.5 43.4 C69 42 69.1 40.4 69 39 Z' }));
      svg.appendChild(mk('ellipse', 'drb-bagmouth', { cx: '50', cy: '40', rx: '20', ry: '8.2' }));
      /* the near rim's shadow on the far interior wall — what makes it
         a HOLE and not a disc pasted on the front */
      svg.appendChild(mk('path', 'drb-bagmouthshade', { d: 'M30 40 C30 35.5 39 31.8 50 31.8 C61 31.8 70 35.5 70 40' }));
      svg.appendChild(mk('path', 'drb-bagcord', { d: 'M28.5 41.5 C24 46 21.5 52 21.5 58.5' }));
      svg.appendChild(mk('path', 'drb-bagcord', { d: 'M25 43.5 C21.5 48.5 20 54 20.5 59.5' }));
      return svg;
    }

    svg.appendChild(mk('path', 'drb-bagbody', { d: 'M36 36 C27 45 20 55 18 66 C16.4 76 19 85 27 89.5 C33.5 93.2 41 94 50 94 C59 94 66.5 93.2 73 89.5 C81 85 83.6 76 82 66 C80 55 73 45 64 36 Z' }));
    svg.appendChild(mk('path', 'drb-baghi', { d: 'M37.5 40 C31 47.5 26 56 24 65 C22.7 71 23 76 25.5 79.5 C22 72 24 60 29 51 C31.6 46.4 34.4 42.6 37.5 40 Z' }));
    /* THE CONTENTS PRESSING THE CLOTH — three arcs, the cheapest cue in
       the file and the only one that says "it holds something". They are
       FIXED, so they leak nothing about what or how much. */
    svg.appendChild(mk('path', 'drb-baglump', { d: 'M26 76 C30 68.5 38 67.5 43.5 72.5' }));
    svg.appendChild(mk('path', 'drb-baglump', { d: 'M38 84 C43 75.5 52 74.5 58 80' }));
    svg.appendChild(mk('path', 'drb-baglump', { d: 'M56 74 C61 66 69 65.5 74 70.5' }));
    svg.appendChild(mk('path', 'drb-bagfold', { d: 'M40 39 C38 44 36.5 48 35.5 52' }));
    svg.appendChild(mk('path', 'drb-bagfold', { d: 'M46.5 40 C46 45 45.6 49 45.4 53' }));
    svg.appendChild(mk('path', 'drb-bagfold', { d: 'M53.5 40 C54 45 54.4 49 54.6 53' }));
    svg.appendChild(mk('path', 'drb-bagfold', { d: 'M60 39 C62 44 63.5 48 64.5 52' }));
    svg.appendChild(mk('path', 'drb-bagcinch', { d: 'M35 30 C41 27.5 59 27.5 65 30 L66 37.5 C59 40.5 41 40.5 34 37.5 Z' }));
    /* THE RUFFLE — five gathered peaks. This is the single element that
       turns "vase" into "drawstring bag". */
    svg.appendChild(mk('path', 'drb-bagbody', { d: 'M35 30 C33.5 24 34 19 36.5 14.5 C39 19 41.5 18.5 43 12 C46 18 48 17.5 50 10.5 C52 17.5 54 18 57 12 C58.5 18.5 61 19 63.5 14.5 C66 19 66.5 24 65 30 Z' }));
    svg.appendChild(mk('path', 'drb-bagcord', { d: 'M30 34.2 C36 31 44 29.8 50 29.8 C56 29.8 64 31 70 34.2' }));
    svg.appendChild(mk('path', 'drb-bagcord', { d: 'M70 34.2 c3.4 -1.6 6.6 0.4 5.8 3 c-0.8 2.6 -4.4 2.8 -6.2 0.6' }));
    if (!small) svg.appendChild(this._tagNode(idx));
    return svg;
  },

  /* ⭐ THE BAG'S IDENTITY, AND THE PROOF THAT IT LEAKS NOTHING. A bag is
     opaque by design, so "Another bag" changed nothing anybody could
     see: on a cold load it was completely inert, and mid-lesson it was
     the most destructive control on the stage while LOOKING inert.
     The tag carries 1..8 pips in a die arrangement — countable at a
     glance, identical in every locale, legible in greyscale, and it
     gives the class something to say ("get the four-dot bag out again").
     ⚠ IT TAKES THE INDEX AS AN ARGUMENT AND NEVER READS `st.bag`. The
     mark is a pure function of the ordinal position in the book, which
     is generator order — the same channel the book's own note already
     establishes as safe, because "the ids are a plain sequence that
     encodes nothing". The gate asserts two bags with different contents
     at the same index render byte-identical tags.
     ⚠ THE BAG'S SIZE NEVER VARIES. Size reads as fullness. */
  PIPS: [
    [[50, 50]],
    [[38, 38], [62, 62]],
    [[36, 36], [50, 50], [64, 64]],
    [[38, 38], [62, 38], [38, 62], [62, 62]],
    [[36, 36], [64, 36], [50, 50], [36, 64], [64, 64]],
    [[38, 34], [62, 34], [38, 50], [62, 50], [38, 66], [62, 66]],
    [[38, 34], [62, 34], [38, 50], [50, 50], [62, 50], [38, 66], [62, 66]],
    [[38, 32], [62, 32], [38, 48], [62, 48], [38, 64], [62, 64], [38, 80], [62, 80]]
  ],
  _tagNode: function (idx) {
    var g = document.createElementNS(this.SVG_NS, 'g');
    g.setAttribute('class', 'drb-tag');
    var n = ((typeof idx === 'number' && isFinite(idx) && idx >= 0) ? Math.floor(idx) : 0);
    var pips = this.PIPS[n % this.PIPS.length];
    /* the outline shape cycles every 8, so a 120-bag library keeps
       differentiating without adding a single colour */
    var band = Math.floor(n / this.PIPS.length) % 3;
    var rx = band === 0 ? '3' : (band === 1 ? '9' : '1');
    var str = document.createElementNS(this.SVG_NS, 'path');
    str.setAttribute('d', 'M63 30 C70 30 76 33 79 37');
    str.setAttribute('class', 'drb-tagstring');
    g.appendChild(str);
    var card = document.createElementNS(this.SVG_NS, 'rect');
    card.setAttribute('x', '73'); card.setAttribute('y', '35');
    card.setAttribute('width', '20'); card.setAttribute('height', '24');
    card.setAttribute('rx', rx);
    card.setAttribute('class', 'drb-tagcard');
    g.appendChild(card);
    var i, p, dot;
    for (i = 0; i < pips.length; i++) {
      p = pips[i];
      dot = document.createElementNS(this.SVG_NS, 'circle');
      /* map the 0..100 pip grid into the 73..93 x 35..59 card */
      dot.setAttribute('cx', String(73 + p[0] * 0.20));
      dot.setAttribute('cy', String(35 + p[1] * 0.24));
      dot.setAttribute('r', '1.9');
      dot.setAttribute('class', 'drb-tagpip');
      g.appendChild(dot);
    }
    return g;
  },

  /* =================================================================
     THE REVEAL — the contents, drawn INSIDE the opened bag.
     ⭐ Build #3 put them in a bordered tray at the very BOTTOM of the
     wrap, below both records, at a different cell size and in a
     different grammar from both the guess and the record — so the two
     objects the class must compare sat at maximum separation with up to
     forty record cells between them, and the file's own header already
     recorded that the densest state ran 1091px against a 900px fold. No
     seven-year-old holds a six-piece claim in memory across a scroll.
     Now the reveal renders immediately after the guess (which collapses
     to a strip), and the pieces sit in the bag's belly in per-kind
     BANDS — fixed KINDS order, ragged right, NO baseline and NO axis,
     because a baseline is class-graph and the fence would break.
     ⚠ NOTHING IS MARKED, COLOURED, COUNTED, RANKED OR COMPARED. The
     guess and the contents simply sit next to each other, eight pixels
     apart, in the same visual language, and the class does the rest.
     ================================================================= */
  _buildOpened: function () {
    var api = this.api, self = this;
    var comp = this.composition(this.st);
    var box = api.el('div', 'drb-opened');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('openedLabel'));
    /* ⭐⭐ THE OPENED BAG IS DRAWN AS AN INTERIOR, NOT A SILHOUETTE. The
       first cut filled the open sack solid teal and set the contents inside
       it — and reading the render showed nine dark pieces on a dark body,
       invisible. The whole event this tool exists for could not be seen,
       and not one gate could tell: containment passed, contrast passed
       (it measures declared pairs, not a piece against whatever happens to
       be behind it), the spill check passed. An open bag shows its INSIDE,
       which is lighter than its outside — so the body goes cream with a
       teal wall, and the pieces read. */
    var sack = api.el('div', 'drb-sack drb-sackopen');
    sack.appendChild(this._bagNode(true, this._bagIdx));
    var belly = api.el('div', 'drb-belly');
    this.KINDS.forEach(function (k) {
      if (!comp[k]) return;
      var band = api.el('div', 'drb-band' + 'row');
      var i;
      for (i = 0; i < comp[k]; i++) {
        var cell = api.el('div', 'drb-ocell');
        cell.setAttribute('aria-label', self._pieceName(k));
        cell.appendChild(self._pieceNode(k));
        band.appendChild(cell);
      }
      belly.appendChild(band);
    });
    sack.appendChild(belly);
    box.appendChild(sack);
    return box;
  },

  _buildFoot: function () {
    var api = this.api, self = this, s = this.st;
    var foot = api.el('div', 'drb-foot');

    /* ⭐ A NOUN-LABELLED CONTROL DOES WHAT ITS LABEL SAYS. "Fill the bag"
       opens the builder immediately; "Close the bag" seals it; "Run it
       again" produces a second record; "Open the bag" reveals. The
       number-sieve "New cards" defect was a chip that armed a mode and
       dealt nothing, and it reached the operator. */
    if (s.draft) {
      var seal = api.el('button', 'drb-chip drb-go');
      seal.type = 'button';
      seal.textContent = api.t('sealBtn');
      seal.disabled = this.total(s.draft) < 1;
      seal.addEventListener('click', function () {
        var next = self.sealDraft(self.st);
        if (!next) return;
        self.st = next;
        self.render();
      });
      foot.appendChild(seal);
      /* ⭐ THE WAY OUT. Build #3's builder had exactly one exit and it
         destroyed the guess and both records, so one curious tap cost
         the lesson and there was no way back. */
      var cancel = api.el('button', 'drb-chip');
      cancel.type = 'button';
      cancel.textContent = api.t('cancelBtn');
      cancel.addEventListener('click', function () {
        var next = self.cancelDraft(self.st);
        if (!next) return;
        self.st = next;
        self.render();
      });
      foot.appendChild(cancel);
      /* ⚠ AND THE GATE BLOCK IS REACHABLE FROM HERE. Build #3 returned
         at this point, before the `_gate` block, so `gateLine` — the one
         string in the file that explains the paywall, authored in eleven
         locales — could never reach the DOM from the builder. */
      this._appendGate(foot);
      return foot;
    }

    /* ---- the lesson controls ---- */
    var open = api.el('button', 'drb-chip drb-go');
    open.type = 'button';
    open.textContent = api.t('openBtn');
    open.disabled = s.opened || this.total(s.bag) < 1 || !s.runs.length;
    open.addEventListener('click', function () {
      var next = self.openBag(self.st);
      if (!next) return;
      self.st = next;
      self._carry = null; self._target = null;
      self.api.announce(api.t('openedLabel'));
      self.render();
    });
    foot.appendChild(open);

    /* ⭐⭐ FREE. See secondRun. */
    var again = api.el('button', 'drb-chip');
    again.type = 'button';
    again.textContent = api.t('againBtn');
    again.disabled = !(s.runs.length === 1 && this.runFull(s, s.runs[0]) && !s.opened);
    again.addEventListener('click', function () {
      var next = self.secondRun(self.st);
      if (!next) return;
      self.st = next;
      self.api.announce(api.t('hintAgain'));
      self.render();
    });
    foot.appendChild(again);

    /* ⭐⭐ THE BAG-CHANGING CONTROLS LEAVE THE SCREEN BETWEEN THE FIRST
       DRAW AND THE REVEAL. This is the highest-value two lines in the
       rebuild. The entire argument of run two depends on the bag being
       untouchable, and build #3 kept two buttons that swap its contents
       live on screen at exactly that moment — so a seven-year-old's
       objection ("you changed it") was not merely available, it was
       DISPLAYED. They come back the instant the bag is opened. */
    var setupOpen = !s.runs.length || s.opened;
    if (setupOpen) {
      var sep = api.el('div', 'drb-sep');
      sep.setAttribute('aria-hidden', 'true');
      foot.appendChild(sep);

      var fill = api.el('button', 'drb-chip');
      fill.type = 'button';
      fill.textContent = api.t('fillBtn');
      fill.addEventListener('click', function () {
        self.st = self.openDraft(self.st);
        self.render();
      });
      foot.appendChild(fill);

      /* ⭐ "ANOTHER BAG" IS FREE, AND THE BAG BOOK IS NOT A SEPARATE
         CONTROL. What the Teacher plan buys is the SIZE of the library
         this steps through (8 -> ~120), so nothing is locked, no control
         is dead, and the least-resented gate is the one in force. */
      var another = api.el('button', 'drb-chip');
      another.type = 'button';
      another.textContent = api.t('anotherBtn');
      another.disabled = this.bagsFor().length < 2;
      another.addEventListener('click', function () { self._stepBag(); });
      foot.appendChild(another);
    }

    var pr = api.el('button', 'drb-chip' + (this.premium ? '' : ' drb-locked'));
    pr.type = 'button';
    pr.textContent = api.t('printBtn');
    if (!this.premium) pr.appendChild(this._lockNode());
    pr.addEventListener('click', function () {
      if (!self.premium) { self._raiseGate(); return; }
      window.print();
    });
    foot.appendChild(pr);

    this._appendGate(foot);
    return foot;
  },

  /* ⚠ TWO NODES, NEVER A CONCATENATION — the recorded localisation
     smell, and joining them makes the one actionable thing unclickable.
     Shape from folding-sheet.js:714-723.
     ⭐⭐ AND IT IS PERMANENT WHILE THE ACCOUNT IS KNOWN-FREE, not a
     six-second flash at the bottom of the page. Build #3 set a flag,
     re-rendered, and wiped it on a timer — and the block sat BELOW a
     forty-cell record, so at 360px it was off-screen at the exact moment
     it appeared. The file's own header names that defect for the hint
     and fixes it there, then reintroduces it for the only place the
     paywall is ever explained. */
  _appendGate: function (foot) {
    var api = this.api;
    if (!(this.premiumKnown && !this.premium)) return;
    var g = api.el('div', 'drb-gate' + (this._pulse ? ' drb-pulse' : ''));
    var sp = api.el('span');
    sp.textContent = api.t('gateLine');
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-draw-bag';
    a.target = '_top';
    a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.appendChild(sp);
    g.appendChild(a);
    foot.appendChild(g);
    this._gateEl = g;
  },

  /* a locked control's consequence is ELSEWHERE in the DOM — it brings
     the permanent explanation into view and pulses it. A gate that a
     synthetic click cannot observe is a gate the liveness harness scores
     as furniture. */
  _raiseGate: function () {
    var self = this;
    this._pulse = true;
    this.render();
    if (this._gateEl && this._gateEl.scrollIntoView) {
      try { this._gateEl.scrollIntoView({ block: 'nearest' }); } catch (_) {}
    }
    this._after(1400, function () { self._pulse = false; if (self._wrap) self.render(); });
  },

  _buildBar: function () {
    var api = this.api, self = this, bar = api.el('div', 'drb-bar');

    /* how many draws. ⭐ THE CHIP IS A MINIATURE OF THE THING IT
       CONTROLS — a row of seats, not a bare numeral. Build #3 opened
       with three unlabelled numerals at the TOP of the stage, whose only
       label lived in an invisible aria-label on the group. Setup
       controls are not the point of the instrument, so the whole bar now
       sits at the bottom. */
    var lens = api.el('div', 'drb-group');
    lens.setAttribute('role', 'radiogroup');
    lens.setAttribute('aria-label', api.t('lenLabel'));
    var openLens = this.lensFor();
    this.LENS.forEach(function (n) {
      var open = openLens.indexOf(n) !== -1;
      var b = api.el('button', 'drb-chip drb-len' + (self.st.n === n ? ' drb-on' : '') + (open ? '' : ' drb-locked'));
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(self.st.n === n));
      b.setAttribute('aria-label', api.t('lenLabel'));
      b.appendChild(self._lenNode(n));
      if (!open) b.appendChild(self._lockNode());
      /* ⚠ NOT `disabled` WHEN IT IS THE CURRENT STATE. Build #3 disabled
         the selected chip, which drops it out of tab order — so the one
         option a keyboard user could not reach was the active one, and
         at `opacity:.5` on its own filled background it measured 1.50:1,
         making the most important chip in the bar the faintest thing on
         screen. It is a radio; `aria-checked` carries the state. */
      b.disabled = !!self.st.runs.length || !!self.st.draft;
      b.addEventListener('click', function () {
        if (!open) { self._raiseGate(); return; }
        var next = self.setLen(self.st, n);
        if (!next) return;
        self.st = next;
        self.render();
      });
      lens.appendChild(b);
    });
    bar.appendChild(lens);

    /* the material — an icon per skin, never a word on the chip. ⚠ THE
       GROUP DISAPPEARS ENTIRELY when it would hold no live control: on a
       book 404 the fallback ships no skins, so build #3 rendered a
       `role="group"` containing exactly one permanently-disabled chip. */
    var all = [null].concat((this.data && this.data.skins) || []);
    if (all.length > 1) {
      var skins = api.el('div', 'drb-group');
      skins.setAttribute('role', 'radiogroup');
      skins.setAttribute('aria-label', api.t('skinLabel'));
      all.forEach(function (sk) {
        var id = sk ? sk.id : 'shapes';
        var open = !sk || sk.free || self.premium;
        var b = api.el('button', 'drb-chip drb-skin' + (self.st.skin === id ? ' drb-on' : '') + (open ? '' : ' drb-locked'));
        b.type = 'button';
        b.setAttribute('role', 'radio');
        b.setAttribute('aria-checked', String(self.st.skin === id));
        b.setAttribute('aria-label', self._skinName(sk));
        /* ⚠ THREE PIECES, NOT ONE. A single circle on the "Shapes" chip
           is the `c` piece, and a teacher reads it as "circle". */
        /* ⚠ THE OPTION THAT IS ALREADY THE STATE CANNOT BE CHOSEN AGAIN, and
           the liveness gate is right to insist. `setSkin` refuses a no-op, so
           leaving the checked chip live is a control that provably does
           nothing — it scored DEAD on all 21 reachable paths. It keeps
           role="radio" and aria-checked, so a screen reader still announces
           it as the selected one; a LOCKED chip stays live, because it has a
           gate to raise. */
        b.disabled = open && self.st.skin === id;
        var trio = api.el('span', 'drb-trio');
        trio.appendChild(self._pieceNode('t', id));
        trio.appendChild(self._pieceNode('c', id));
        trio.appendChild(self._pieceNode('x', id));
        b.appendChild(trio);
        if (!open) b.appendChild(self._lockNode());
        b.addEventListener('click', function () {
          if (!open) { self._raiseGate(); return; }
          var next = self.setSkin(self.st, id, self.skinsFor());
          if (!next) return;
          self.st = next;
          self.render();
        });
        skins.appendChild(b);
      });
      bar.appendChild(skins);
    }
    return bar;
  },

  /* ⚠⚠ THE NUMERAL, NOT A MINIATURE OF THE RAIL. Drawing ten, twenty and
     forty tiny bars at 14px produced three grey scribbles that read as
     noise — an over-reach of the no-words law, which governs the STAGE and
     explicitly permits numerals in chrome. The fix for "three unlabelled
     numerals" is a visible label on the group, not an illegible picture.
     Found by reading the render. */
  _lenNode: function (n) {
    var b = this.api.el('span', 'drb-lennum');
    b.textContent = String(n);
    return b;
  },

  /* ⚠ STEP PAST A BAG THAT WOULD RENDER IDENTICALLY. The book's next
     entry can BE the state already on screen, so a plain (i+1) step
     changes nothing on the first press and the control reads as broken —
     the number-sieve library defect, found again on arrow-strip's Mat
     Book by the liveness gate. Page until something actually differs. */
  _stepBag: function () {
    var open = this.bagsFor();
    if (!open.length) return;
    var k, cand, hit = null, idx = 0;
    for (k = 1; k <= open.length; k++) {
      idx = (this._bagIdx + k) % open.length;
      cand = open[idx];
      if (!this._sameBag(cand.b, this.st.bag)) { hit = cand; break; }
    }
    if (!hit) return;
    var next = this.loadBag(this.st, hit);
    if (!next) return;
    this._bagIdx = idx;
    this._lit = null;
    this.st = next;
    this.api.announce(this.api.t('tagAria').replace('{i}', String(idx + 1)));
    this.render();
  },

  _sameBag: function (a, b) {
    var i, k;
    for (i = 0; i < this.KINDS.length; i++) {
      k = this.KINDS[i];
      if (((a && a[k]) || 0) !== ((b && b[k]) || 0)) return false;
    }
    return true;
  },

  /* =================================================================
     INPUT — ONE GRAB-AND-PLACE MODEL for keyboard, touch and mouse,
     plus the post-commit highlight on the same objects.
     ⚠ A DRAG-ONLY HANDLE IS DEAD to a keyboard, to assistive tech, and
     to the liveness gate, which drives synthetic .click() and never
     fires pointerdown (#41's flag scored 0 of 9 paths in all three
     entitlement states). Every path below is live.
     ⚠ THE POINTER LISTENERS ARE BOUND TO WINDOW, NOT THE ELEMENT. This
     tool re-renders on every state change, and a repaint can replace the
     captured element — pointer capture dies with it (#40 paid for that).
     ⚠ ONE LISTENER PAIR, ADDED ONCE, REMOVED IN destroy(). #43 leaked a
     pair per render until it was caught.
     ================================================================= */
  _wire: function () {
    var self = this, wrap = this._wrap;
    if (!wrap) return;
    if (this.st.draft) return;

    Array.prototype.forEach.call(wrap.querySelectorAll('.drb-gpiece'), function (el) {
      var kind = el.getAttribute('data-kind');
      if (self.st.committed) {
        el.addEventListener('click', function () { self._toggleLit(kind); });
        el.addEventListener('keydown', function (ev) {
          if (ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') return;
          ev.preventDefault(); self._toggleLit(kind);
        });
        return;
      }
      el.addEventListener('pointerdown', function (ev) { self._startDrag(el, kind, ev); });
      el.addEventListener('click', function () { if (!self._dragged) self._lift(kind); });
      el.addEventListener('keydown', function (ev) { self._onKey(kind, ev); });
    });

    /* the zones are drop receivers for the tap-then-tap path, and they
       accept a plain synthetic click while something is carried */
    Array.prototype.forEach.call(wrap.querySelectorAll('.drb-shelf'), function (el) {
      el.addEventListener('click', function (ev) {
        if (!self._carry) return;
        if (ev.target && ev.target.closest && ev.target.closest('.drb-gpiece')) return;
        self._drop(Number(el.getAttribute('data-zone')));
      });
    });

    if (this._bagBtn) {
      this._bagBtn.addEventListener('click', function () { self._tapBag(); });
    }
  },

  _unwire: function () {
    if (this._onMove) { window.removeEventListener('pointermove', this._onMove); this._onMove = null; }
    if (this._onUp) {
      window.removeEventListener('pointerup', this._onUp);
      window.removeEventListener('pointercancel', this._onUp);
      this._onUp = null;
    }
    if (this._ghost && this._ghost.parentNode) this._ghost.parentNode.removeChild(this._ghost);
    this._ghost = null;
  },

  /* ⭐ THE BAG ALWAYS ANSWERS. If the class has not claimed anything yet
     the tap does not draw — it says so, and it aims the eye at the tray.
     A control whose only outcome is silence is the defect the operator
     found; a control that refuses and EXPLAINS is a control. */
  _tapBag: function () {
    var self = this;
    if (!this.st.committed && this.claimed(this.st.guess) < 1) {
      this._nudge = true;
      this.api.announce(this.api.t('hintClaimFirst'));
      this.render();
      this._after(1200, function () { self._nudge = false; if (self._wrap) self.render(); });
      return;
    }
    var next = this.draw(this.st);
    if (!next) return;
    this.st = next;
    var r = this.currentRun(this.st);
    var got = r.draws[r.draws.length - 1];
    this.api.announce(this.api.t('cellAria')
      .replace('{i}', String(r.draws.length))
      .replace('{piece}', this._pieceName(got)));
    this.render();
  },

  _toggleLit: function (kind) {
    this._lit = (this._lit === kind) ? null : kind;
    if (this._lit) this.api.announce(this.api.t('litAria').replace('{piece}', this._pieceName(kind)));
    this.render();
  },

  /* pick up, and PRE-TARGET THE NEXT ZONE so a pick-up/put-down pair is
     a genuine move rather than a toggle that nets to zero */
  _lift: function (kind) {
    if (this.st.committed) return;
    if (this._carry === kind) { this._carry = null; this._target = null; this.render(); return; }
    this._carry = kind;
    var here = this.st.guess[kind];
    var i = this.ZONE_ORDER.indexOf(here);
    this._target = this.ZONE_ORDER[(i + 1) % this.ZONE_ORDER.length];
    this.api.announce(this._pieceName(kind) + ' — ' + this.api.t('hintCarry'));
    this.render();
  },

  _drop: function (zone) {
    var kind = this._carry;
    if (!kind) return;
    var next = this.placeGuess(this.st, kind, zone);
    this._carry = null;
    this._target = null;
    if (!next) { this.render(); return; }
    this.st = next;
    this.api.announce(this._pieceName(kind) + ' — ' + this.api.t(zone === this.ZONE_IN ? 'inLabel' : (zone === this.ZONE_OUT ? 'outLabel' : 'poolLabel')));
    this.render();
  },

  _onKey: function (kind, ev) {
    var k = ev.key;
    if (k === 'Escape') { if (this._carry) { ev.preventDefault(); this._carry = null; this._target = null; this.render(); } return; }
    if (k === 'Enter' || k === ' ' || k === 'Spacebar') {
      ev.preventDefault();
      if (this._carry === kind) this._drop(this._target);
      else this._lift(kind);
      return;
    }
    if (!this._carry) return;
    if (k === 'ArrowUp' || k === 'ArrowLeft') {
      ev.preventDefault();
      this._target = this.ZONE_ORDER[(this.ZONE_ORDER.indexOf(this._target) + this.ZONE_ORDER.length - 1) % this.ZONE_ORDER.length];
      this.render();
    } else if (k === 'ArrowDown' || k === 'ArrowRight') {
      ev.preventDefault();
      this._target = this.ZONE_ORDER[(this.ZONE_ORDER.indexOf(this._target) + 1) % this.ZONE_ORDER.length];
      this.render();
    }
  },

  _startDrag: function (el, kind, ev) {
    if (this.st.committed) return;
    if (ev.button !== 0 && ev.pointerType === 'mouse') return;
    var self = this;
    ev.preventDefault();
    this._unwire();
    this._dragged = false;
    var rect = el.getBoundingClientRect();
    var x0 = ev.clientX, y0 = ev.clientY, t0 = Date.now(), moved = 0;

    var ghost = document.createElement('div');
    ghost.className = 'drb-lift';
    ghost.setAttribute('aria-hidden', 'true');
    ghost.style.width = rect.width + 'px';
    ghost.style.height = rect.height + 'px';
    ghost.style.left = x0 + 'px';
    ghost.style.top = y0 + 'px';
    ghost.appendChild(this._pieceNode(kind));
    document.body.appendChild(ghost);
    this._ghost = ghost;

    this._onMove = function (e) {
      moved = Math.max(moved, Math.abs(e.clientX - x0) + Math.abs(e.clientY - y0));
      ghost.style.left = e.clientX + 'px';
      ghost.style.top = e.clientY + 'px';
      /* ⚠ THE PREVIEW SAYS WHERE, NEVER WHETHER. The highlighted DOM is
         byte-identical for a kind that is in the bag and one that is
         not — sorting-hoops.js:2199, inherited by citation and
         gate-asserted here. */
      var z = self._zoneAt(e.clientX, e.clientY);
      Array.prototype.forEach.call(self._wrap.querySelectorAll('.drb-shelf'), function (s) {
        s.classList.toggle('drb-aim', z !== null && Number(s.getAttribute('data-zone')) === z);
      });
    };
    this._onUp = function (e) {
      var isTap = moved < 8 && (Date.now() - t0) < 500;
      var z = self._zoneAt(e.clientX, e.clientY);
      self._unwire();
      self._dragged = !isTap;
      if (isTap) { self._lift(kind); return; }
      if (z === null) { self.render(); return; }
      self._carry = kind;
      self._drop(z);
    };
    window.addEventListener('pointermove', this._onMove);
    window.addEventListener('pointerup', this._onUp);
    window.addEventListener('pointercancel', this._onUp);
  },

  /* the zone under a point, from the SAME boxes that draw the picture,
     so a child aiming at visible ink hits the zone that ink represents */
  _zoneAt: function (x, y) {
    if (!this._wrap) return null;
    var hit = null;
    /* ⚠ THE REAL SACK COUNTS AS "INTO THE BAG". Three native panels, reading
       the model, found that the hint says "into the bag" while there are TWO
       bags on the stage — the claim zone and the tappable apparatus — and
       that a drop on the apparatus returned null and did nothing, with no
       feedback. A forgiving target costs one branch and removes the dead
       drop; it cannot draw, because a drag is not a click. */
    if (this._bagBtn) {
      var br = this._bagBtn.getBoundingClientRect();
      if (x >= br.left && x <= br.right && y >= br.top && y <= br.bottom) return this.ZONE_IN;
    }
    Array.prototype.forEach.call(this._wrap.querySelectorAll('.drb-shelf'), function (s) {
      var r = s.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) hit = Number(s.getAttribute('data-zone'));
    });
    return hit;
  }
};

/* =====================================================================
   THE SHARED DEFS — six clip paths, one per kind, so each piece can
   carry a specular that is clipped to its own silhouette. Injected once,
   in a zero-size svg, exactly as the stylesheet is.
   ===================================================================== */
function injectDrawBagDefs() {
  if (document.getElementById('drb-defs')) return;
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('id', 'drb-defs');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  var defs = document.createElementNS(NS, 'defs');
  var k, def, cp, node, a;
  for (k in DrawBag.SHAPE) {
    if (!Object.prototype.hasOwnProperty.call(DrawBag.SHAPE, k)) continue;
    def = DrawBag.SHAPE[k];
    cp = document.createElementNS(NS, 'clipPath');
    cp.setAttribute('id', 'drb-cl-' + k);
    node = document.createElementNS(NS, def.tag);
    for (a in def.at) if (Object.prototype.hasOwnProperty.call(def.at, a)) node.setAttribute(a, def.at[a]);
    cp.appendChild(node);
    defs.appendChild(cp);
  }
  svg.appendChild(defs);
  document.body.appendChild(svg);
}

/* =====================================================================
   THE STYLESHEET
   ⚠ TWO TAP FLOORS, MEASURED SEPARATELY AND NEITHER MOVES: every CONTROL
   holds 44px; a RECORD CELL is canvas and holds 34px (the calendar-wall
   precedent). Collapsing them into one number waves a real defect
   through, and an or-shaped assertion has hidden a missing floor twice.
   ⭐ BOTH RECORDS ARE THE SAME WIDTH WITH THE SAME auto-fill RULE OVER
   THE SAME QUINTETS, so they wrap to the same number of columns and
   align cell-for-cell without a single line of arithmetic.
   ⚠ No `vh` anywhere: a manipulative's iframe grows to its content, so a
   vh rule inside it is a feedback loop the shell has no path for.
   ⚠ Never an inline `background` SHORTHAND — it resets background-image
   and beats the stylesheet.
   ⚠⚠ AND PHASE IS SIGNALLED BY ELEVATION, NEVER BY OPACITY. Build #3
   faded whatever was dead to `opacity:.5`, which is a WORSE signal than
   nothing: it measured 1.50:1 on the selected length chip, 2.19:1 on the
   bag, 2.04:1 on a stepper. Everything here stays at full ink; exactly
   one region carries a shadow at a time.
   ===================================================================== */
function injectDrawBagCSS() {
  if (document.getElementById('drb-style')) return;
  var css = ''
    + '.drb-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;min-width:0;}'
    /* ---- the band: doctrine over rung, both chrome, both survive embed ---- */
    + '.drb-band{width:100%;max-width:640px;text-align:center;font-family:Nunito,sans-serif;}'
    + '.drb-doctrine{font-size:15px;line-height:1.35;color:#0E5147;font-weight:700;}'
    /* ⚠ THE HEIGHT IS RESERVED. A 15px line that wraps to two in German '
       and Finnish shifts the whole apparatus the moment the phase
       changes. (sorting-hoops.js:2303) */
    + '.drb-hint{font-size:15px;line-height:1.35;color:#3C4A43;min-height:2.4em;'
    +   'display:flex;align-items:center;justify-content:center;padding:2px 4px;}'
    /* ---- chrome ---- */
    + '.drb-bar,.drb-foot{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;width:100%;max-width:760px;}'
    + '.drb-bar{gap:10px 18px;}'
    + '.drb-group{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
    + '.drb-sep{width:2px;height:28px;border-radius:2px;background-color:#CFC0A4;}'
    + '.drb-chip{min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;'
    +   'background-color:#FBF3E4;color:#0E5147;font-family:Baloo\\ 2,cursive;font-size:15px;line-height:1.15;'
    +   'cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;}'
    + '.drb-chip.drb-on{background-color:#146B5E;color:#FBF3E4;}'
    /* the locked chip carries a PADLOCK, not merely a hue */
    + '.drb-chip.drb-locked{border-color:#A8451F;color:#A8451F;}'
    + '.drb-lock{width:14px;height:14px;flex:0 0 auto;}'
    + '.drb-lockbody{fill:#A8451F;}.drb-lockshackle{fill:none;stroke:#A8451F;stroke-width:2;}'
    + '.drb-chip.drb-on .drb-lockbody{fill:#FBF3E4;}.drb-chip.drb-on .drb-lockshackle{stroke:#FBF3E4;}'
    /* ⚠ full ink when disabled — the state is carried by the missing
       shadow and by aria, never by a 50% wash */
    + '.drb-chip[disabled]{cursor:default;background-color:#F1E7D2;border-color:#4E8B7C;color:#3C4A43;}'
    + '.drb-chip.drb-on[disabled]{background-color:#146B5E;color:#FBF3E4;border-color:#0E5147;}'
    + '.drb-chip.drb-go{background-color:#C2562F;border-color:#A8451F;color:#FFFFFF;}'
    + '.drb-chip.drb-go[disabled]{background-color:#F1E7D2;color:#3C4A43;border-color:#4E8B7C;}'
    + '.drb-chip:focus-visible,.drb-gpiece:focus-visible,.drb-bag:focus-visible,.drb-step:focus-visible'
    +   '{outline:3px solid #0E5147;outline-offset:3px;}'
    + '.drb-chip.drb-skin{padding:6px 10px;}'
    + '.drb-trio{display:inline-flex;align-items:center;}'
    + '.drb-trio .drb-piece{width:20px;height:20px;margin-right:-6px;}'
    + '.drb-trio .drb-piece:last-child{margin-right:0;}'
    + '.drb-lennum{font-family:Baloo\\ 2,cursive;font-size:1.05em;line-height:1;}'
    /* the paid chip: permanent, legible, and next to what it explains */
    + '.drb-gate{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;color:#A8451F;'
    +   'display:flex;flex-wrap:wrap;justify-content:center;gap:6px;align-items:center;'
    +   'border-radius:12px;padding:6px 10px;}'
    + '.drb-gate a{color:#A8451F;min-height:44px;display:inline-flex;align-items:center;'
    +   'text-decoration:underline;text-underline-offset:3px;}'
    + '.drb-gate.drb-pulse{background-color:rgba(242,120,75,.16);}'
    /* ---- the pieces ---- */
    /* ⚠ non-scaling-stroke is load-bearing: without it a 68px Tier-C
       cell draws a 4.2px cartoon outline. (estimation-jar.js:932) */
    + '.drb-piece{width:100%;height:100%;display:block;object-fit:contain;'
    +   'stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;'
    +   'paint-order:stroke fill;vector-effect:non-scaling-stroke;}'
    + '.drb-hi{fill:#FFFFFF;fill-opacity:.22;stroke:none;}'
    + '.drb-k-c{fill:#146B5E;stroke:#0B3B34;}'
    + '.drb-k-d{fill:#9E3F96;stroke:#572252;}'
    + '.drb-k-s{fill:#CE5024;stroke:#712C14;}'
    + '.drb-k-h{fill:#5A9BDB;stroke:#325578;}'
    + '.drb-k-t{fill:#E5AE1C;stroke:#7E5F0F;}'
    + '.drb-k-x{fill:#2A2A35;stroke:#15151B;}'
    /* ---- THE BUILDER: heaps in a dish, never stacks in a column ---- */
    + '.drb-fill{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;width:100%;}'
    + '.drb-fillcol{display:flex;flex-direction:column;align-items:center;gap:6px;}'
    + '.drb-step{min-height:44px;min-width:44px;padding:0;border-radius:12px;border:2px solid #146B5E;'
    +   'background-color:#FBF3E4;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
    + '.drb-step[disabled]{cursor:default;border-color:#8FA79B;background-color:#F1E7D2;}'
    + '.drb-glyph{width:22px;height:22px;fill:none;stroke:#0E5147;stroke-width:2.6;stroke-linecap:round;}'
    + '.drb-step[disabled] .drb-glyph{stroke:#6E8479;}'
    + '.drb-dish{position:relative;width:64px;height:64px;border-radius:16px;background-color:#F4EBD9;'
    +   'box-shadow:inset 0 3px 5px -2px rgba(93,72,45,.28),inset 0 -1px 0 rgba(255,255,255,.85);'
    +   'display:flex;align-items:center;justify-content:center;}'
    + '.drb-heap{position:absolute;width:19px;height:19px;}'
    + '.drb-heap0{left:14px;top:26px;}.drb-heap1{left:30px;top:30px;}.drb-heap2{left:22px;top:16px;}'
    + '.drb-heap3{left:36px;top:19px;}.drb-heap4{left:8px;top:15px;}.drb-heap5{left:29px;top:8px;}'
    /* ⚠ a dashed CIRCLE is the `c` piece. The empty marker is a square. */
    + '.drb-none{width:22px;height:22px;border-radius:6px;border:2px dashed #55917F;}'
    /* ---- THE GUESS: a bag, a dish, a table ---- */
    + '.drb-guess{display:flex;flex-direction:column;align-items:stretch;gap:14px;width:100%;max-width:520px;}'
    + '.drb-shelf{position:relative;display:flex;flex-wrap:wrap;gap:8px;min-height:64px;padding:10px 12px 8px;'
    +   'align-items:flex-end;justify-content:center;}'
    /* IN — the inside of the bag: walls, a rounded floor, an open mouth
       on top, and the shadow the near rim casts down the far wall */
    + '.drb-shelf.drb-in{border:3px solid #146B5E;border-top:0;border-radius:16px 16px 22px 22px;'
    +   'background-color:#F6EEDD;padding-top:14px;'
    /* the mouth throws a shadow down the far wall — depth, not a lip */
    +   'box-shadow:inset 0 16px 18px -14px rgba(14,81,71,.55),'
    +   'inset 3px 0 0 rgba(14,81,71,.10),inset -3px 0 0 rgba(14,81,71,.10),'
    +   'inset 0 -5px 0 rgba(14,81,71,.13);}'
    /* ⚠⚠ THE ELLIPSE RIM MADE IT A TUMBLER. A tall cream box with an
       elliptical lip on top is a DRINKING GLASS, and this tool's own header
       says the one thing the bag must never look like is an open vessel.
       Found by reading the render; no gate has a predicate for "this reads
       as the wrong object". The rim is gone and the zone now carries the
       tool's OWN open-bag drawing as a watermark, so what it means is
       stated by the same picture the class is already looking at. */

    + '.drb-shelf.drb-in .drb-gpiece{transform:translateY(2px);}'
    /* TRAY — a shallow dish, the supply, a different grammar entirely */
    + '.drb-shelf.drb-pool{border:0;border-radius:16px;background-color:#F4EBD9;align-items:center;'
    +   'box-shadow:inset 0 3px 5px -2px rgba(93,72,45,.28),inset 0 -1px 0 rgba(255,255,255,.85);}'
    /* OUT — the table. No box, no tint, no radius: that absence IS the
       meaning. (sorting-hoops.js:1345) */
    /* ⚠⚠ EMPTY, IT WAS A FLOATING 3px DASH. "No container" is the right
       IDEA — outside is the rest of the mat, not a fifth box — but a bare
       line with nothing on it reads as a stray mark, not as a table. It
       keeps its openness (no border, no radius, no enclosure) and gains a
       surface: a shallow cream top that fades out, over a firm ground line. */
    + '.drb-shelf.drb-out{border:0;border-radius:0;padding-bottom:0;align-items:flex-end;'
    +   'border-bottom:4px solid #3C7C72;background-image:linear-gradient(to bottom,'
    +   'rgba(246,238,221,0) 0%,rgba(246,238,221,.95) 78%);}'
    + '.drb-shelf.drb-out .drb-gpiece{filter:drop-shadow(0 3px 2px rgba(58,32,14,.24));}'
    /* the receiving state — says WHERE, never WHETHER */
    + '.drb-guess.drb-carrying .drb-shelf{outline:2px dashed #55917F;outline-offset:2px;border-radius:14px;}'
    + '.drb-guess.drb-carrying .drb-shelf.drb-aim{outline:3px solid #146B5E;background-color:#EFE4CC;}'
    + '.drb-shelfempty{min-height:44px;min-width:44px;}'
    /* the piece is an OBJECT, not a card: the 44px tap floor is kept as
       a floor and not drawn. (sorting-hoops.js:2384) */
    + '.drb-gpiece{position:relative;z-index:1;min-height:44px;min-width:44px;width:44px;height:44px;padding:4px;border:0;'
    +   'background:none;border-radius:12px;cursor:pointer;display:flex;align-items:center;'
    +   'justify-content:center;touch-action:none;transition:transform .14s ease-out;}'
    + '.drb-gpiece:hover{transform:translateY(-2px) scale(1.04);}'
    + '.drb-gpiece.drb-carry{transform:translateY(-4px) scale(1.08);}'
    /* ⚠ the committed prior stays at FULL INK — it is the thing the
       class compares against when the bag opens */
    + '.drb-gpiece.drb-on{background-color:#EFE4CC;box-shadow:inset 0 0 0 2px #146B5E;}'
    + '.drb-lift{position:fixed;z-index:9999;pointer-events:none;transform:translate(-50%,-50%);'
    +   'padding:4px;opacity:.92;}'
    /* the reveal collapses the claim to a strip so the two things being
       compared sit on adjacent lines */
    + '.drb-guess.drb-collapsed{gap:6px;max-width:420px;}'
    + '.drb-guess.drb-collapsed .drb-shelf{min-height:0;padding:3px 8px;gap:4px;}'
    + '.drb-guess.drb-collapsed .drb-shelf.drb-in{margin-top:8px;border-radius:0 0 18px 18px;}'
    + '.drb-guess.drb-collapsed .drb-shelf.drb-in::before{top:-8px;height:16px;}'
    /* ⚠⚠ THE COLLAPSED PIECES ARE STILL CONTROLS. The first cut shrank
       them to 34px — the RECORD-CELL floor, which is canvas — and the
       sweep caught it at 320px. After the reveal these buttons are the
       highlight control, so they hold the 44px CONTROL floor like every
       other control; the strip gets its height back from the padding and
       the shelf minimum instead. This is exactly why the two floors are
       measured separately and never collapsed into one number. */
    + '.drb-guess.drb-collapsed .drb-gpiece{width:44px;height:44px;padding:3px;}'
    /* ---- THE BAG AND THE RECORDS ---- */
    + '.drb-main{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;min-width:0;}'
    /* ⭐ THE BAG IS THE BUTTON — no border, no card, elevation instead */
    + '.drb-bag{min-height:44px;min-width:44px;width:132px;height:132px;padding:0;border:0;background:none;'
    +   'border-radius:0;cursor:pointer;display:block;flex:0 0 auto;-webkit-tap-highlight-color:transparent;'
    +   'touch-action:manipulation;transition:transform .16s ease-out,filter .16s ease-out;'
    +   'filter:drop-shadow(0 4px 8px rgba(58,32,14,.22));}'
    + '.drb-bag:hover{transform:translateY(-3px);filter:drop-shadow(0 8px 14px rgba(58,32,14,.26));}'
    + '.drb-bag:active{transform:translateY(1px);}'
    /* ⚠ NEVER opacity on the hero object: "cannot draw right now" is
       GROUNDED, not faded */
    + '.drb-bag[disabled]{cursor:default;transform:none;filter:drop-shadow(0 1px 2px rgba(58,32,14,.16));}'
    + '.drb-bagsvg{width:100%;height:100%;overflow:visible;}'
    + '.drb-bagbody{fill:#146B5E;}'
    + '.drb-baghi{fill:#FFFFFF;fill-opacity:.14;}'
    + '.drb-bagshadow{fill:#0E5147;opacity:.12;}'
    + '.drb-baglump{fill:none;stroke:#0E5147;stroke-opacity:.24;stroke-width:2.6;stroke-linecap:round;}'
    + '.drb-bagfold{fill:none;stroke:#0E5147;stroke-opacity:.20;stroke-width:1.8;stroke-linecap:round;}'
    + '.drb-bagcinch{fill:#0E5147;}'
    /* CREAM, at 4.9:1 on the body. This is the whole open/closed signal
       and in build #3 it measured 1.44:1. */
    + '.drb-bagcord{fill:none;stroke:#F1E7D2;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;}'
    + '.drb-bagmouth{fill:#F1E7D2;stroke:#0E5147;stroke-width:2.6;}'
    + '.drb-bagmouthshade{fill:none;stroke:#0E5147;stroke-opacity:.26;stroke-width:5;stroke-linecap:round;}'
    + '.drb-tagstring{fill:none;stroke:#0E5147;stroke-width:2;stroke-linecap:round;}'
    + '.drb-tagcard{fill:#F1E7D2;stroke:#0E5147;stroke-width:2;}'
    + '.drb-tagpip{fill:#0E5147;}'
    /* the sheet: two rails, one cause */
    + '.drb-recs{position:relative;display:flex;align-items:stretch;justify-content:center;gap:8px;'
    +   'width:100%;max-width:560px;min-width:0;}'
    + '.drb-spine{position:relative;flex:0 0 44px;display:flex;align-items:center;justify-content:center;}'
    + '.drb-spine::after{content:"";position:absolute;left:50%;top:18px;bottom:18px;width:3px;margin-left:-1.5px;'
    +   'background-color:#3C7C72;border-radius:2px;}'
    + '.drb-bagsmall{position:relative;z-index:1;width:40px;height:40px;}'
    + '.drb-rails{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:6px;}'
    + '.drb-rec{position:relative;display:grid;grid-template-columns:repeat(auto-fill,var(--drb-quint));'
    +   'justify-content:center;gap:5px 10px;padding:6px 6px;border-radius:12px;'
    +   'border:2px solid #4E8B7C;background-color:#F6EEDD;'
    +   'box-shadow:inset 0 2px 4px -2px rgba(93,72,45,.26),inset 0 -1px 0 rgba(255,255,255,.85);'
    +   '--drb-cell:clamp(34px,8.4vmin,44px);--drb-quint:calc(var(--drb-cell) * 5 + 12px);}'
    + '.drb-rec::before{content:"";position:absolute;left:-10px;top:50%;width:10px;height:3px;'
    +   'margin-top:-1.5px;background-color:#3C7C72;border-radius:2px;}'
    + '.drb-quint{display:grid;grid-template-columns:repeat(5,var(--drb-cell));gap:3px;}'
    /* the EMPTY cell is a SEAT, not a box */
    + '.drb-cell{width:var(--drb-cell);height:var(--drb-cell);padding:4px;border:0;background:none;'
    +   'border-radius:9px;display:flex;align-items:center;justify-content:center;}'
    /* ⚠ the seat is decoration, but it has to be VISIBLE decoration: at
       #C4D2C4 on #F6EEDD it measured 1.43:1 and the empty rail read as a
       blank panel rather than as twenty places waiting. */
    + '.drb-seat{width:8px;height:8px;border-radius:50%;background-color:#9DB6A6;}'
    /* a draw lays a CHIP into a seat */
    + '.drb-cell.drb-full{background-color:#FFFDF7;border:1.5px solid #3C7C72;'
    +   'box-shadow:0 1px 0 rgba(255,255,255,.9),0 2px 4px -2px rgba(93,72,45,.34);}'
    /* ⭐ THE HIGHLIGHT — a filter over a kind the USER chose, applied to
       BOTH records equally. It is not a verdict: it says nothing about
       whether the claim was any good, and it cannot, because it knows
       only the kind it was handed. */
    + '.drb-recs[data-lit] .drb-cell.drb-full{opacity:.26;}'
    + '.drb-recs[data-lit="c"] .drb-cell.drb-c-c,.drb-recs[data-lit="s"] .drb-cell.drb-c-s,'
    + '.drb-recs[data-lit="t"] .drb-cell.drb-c-t,.drb-recs[data-lit="d"] .drb-cell.drb-c-d,'
    + '.drb-recs[data-lit="h"] .drb-cell.drb-c-h,.drb-recs[data-lit="x"] .drb-cell.drb-c-x'
    +   '{opacity:1;box-shadow:0 0 0 2px #0E5147,0 2px 4px -2px rgba(93,72,45,.34);}'
    /* ---- THE REVEAL: the contents, inside the opened bag ---- */
    + '.drb-opened{display:flex;justify-content:center;width:100%;max-width:520px;}'
    + '.drb-sackopen .drb-bagbody{fill:#F6EEDD;stroke:#146B5E;stroke-width:3;stroke-linejoin:round;}'
    + '.drb-sackopen .drb-baghi{fill:none;}'
    + '.drb-sackopen .drb-bagmouth{fill:#FFFDF7;}'
    + '.drb-sackopen .drb-bagmouthshade{stroke-opacity:.16;}'
    + '.drb-sackopen .drb-bagcord{stroke:#146B5E;}'
    + '.drb-sack{position:relative;width:100%;max-width:340px;display:flex;align-items:flex-end;'
    +   'justify-content:center;filter:drop-shadow(0 5px 12px rgba(58,32,14,.20));}'
    + '.drb-sack .drb-bagsvg{width:100%;height:auto;aspect-ratio:1/1;}'
    + '.drb-belly{position:absolute;left:22%;right:22%;bottom:9%;display:flex;flex-direction:column;'
    +   'align-items:center;justify-content:flex-end;gap:2px;}'
    + '.drb-bandrow{display:flex;flex-wrap:wrap;justify-content:center;gap:2px;}'
    + '.drb-ocell{width:26px;height:26px;padding:2px;}'
    /* ⚠ THE THREE ZONES GO SIDE BY SIDE ONCE THERE IS ROOM. Stacked,
       they are three full-width bands and two are empty until the class
       commits — about 200px of nothing across a desktop screen. Every
       measured gate passed that, because SPARSE is not something a floor
       can see.
       ⚠ THE BREAKPOINT IS 760, NOT 820, AND THAT IS A CUT-OFF FIX: at
       820 a 768px tablet kept the stacked layout and the densest state
       ran past the fold in all eleven locales. */
    /* ⚠⚠ THE BREAKPOINT IS 700, AND 760 WAS DEAD ON THE REAL SURFACE.
       Measured on production: the tool page wraps every instrument in
       `article.mx-auto.max-w-3xl`, so the iframe is pinned at 704px at
       1440, at 1920 AND at 2560 — identical to the pixel. A 760 breakpoint
       therefore never fired on any desktop a teacher owns, and every one
       of the row layouts below existed only in the local sweep. This is
       the recorded pinned-iframe class (#pattern-bench, #measurement-bench
       and #wodb each shipped at phone size inside one), found by reading
       the LIVE render rather than the local one. 700 is under the measured
       704 with room for a scrollbar; the sweep now drives 704 explicitly.
       (The 1367/1800/2400 tiers stay: they are for the full-screen link,
       which is not capped.) */
    + '@media (min-width:700px){'
    +   '.drb-main{flex-direction:row;justify-content:center;align-items:center;gap:20px;}'
    +   '.drb-recs{max-width:600px;}'
    +   '.drb-rec{--drb-cell:clamp(34px,7.4vmin,38px);}'
    +   '.drb-guess{flex-direction:row;align-items:stretch;max-width:680px;gap:8px;}'
    +   '.drb-shelf{flex:1 1 0;min-width:0;gap:6px;}'
    /* ⚠ WIDE ENOUGH FOR ALL SIX PIECES ON ONE LINE, WITH REAL MARGIN. At
       flex 2.2 the tray measured 323.625px against 324px of content and
       the sixth piece wrapped — a 0.375px miss, which looks like a
       design choice and is not. */
    +   '.drb-shelf.drb-pool{flex:2.5 1 0;}'
    +   '.drb-shelf.drb-in{border-radius:0 0 26px 26px;}'
    +   '.drb-bag{width:164px;height:164px;}'
    +   '.drb-opened{max-width:600px;}'
    /* ⚠⚠ THE REVEAL IS THE TALLEST BLOCK IN THE OPEN STATE, and the card
       — not the rail cap — is what binds the width, so height had to come
       out of the sack. It cannot simply be made smaller: the belly holds up
       to 24 pieces, and at 200px the old 22%-inset belly overflowed the
       cloth. The inset and the piece size move WITH it, and L4 now asserts
       every revealed piece is inside the sack, which nothing checked before. */
    +   '.drb-sack{max-width:200px;}'
    +   '.drb-belly{left:14%;right:14%;}'
    +   '.drb-ocell{width:22px;height:22px;padding:1px;}'
    /* ⭐⭐ THE REVEAL SITS BESIDE THE CLAIM, AND THE RAILS TAKE THE CARD.
       The sweep measured the controls 144-339px BELOW THE FOLD in the
       densest state — forty draws, both records, the bag open — at every
       desktop width. That is the cut-off-at-desktop class, and it is the
       one the operator is the person who sees. Two changes, and both of
       them also make the tool read better: the claim and the contents go
       SIDE BY SIDE (they are the two things being compared, so adjacency
       was the point all along), and the rails stop being capped once
       there is no bag sitting beside them. An auto-fill grid gets SHORTER
       as it gets wider, so releasing the cap turns four rows into two. */
    /* ⚠ `justify-items:center` MAKES EVERY GRID ITEM SHRINK TO FIT, which
       is why releasing the rail cap changed nothing twice over: the row
       holding the records was only ever as wide as the records already
       were. The item that must take the width says so explicitly. */
    +   '.drb-wrap.drb-isopen{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);'
    +     'column-gap:16px;align-items:start;}'
    +   '.drb-wrap.drb-isopen > *{grid-column:1 / -1;justify-self:center;}'
    +   '.drb-wrap.drb-isopen > .drb-main{justify-self:stretch;}'
    +   '.drb-wrap.drb-isopen > .drb-guess{grid-column:1;justify-self:end;}'
    +   '.drb-wrap.drb-isopen > .drb-opened{grid-column:2;justify-self:start;}'
    /* ⚠ RELEASING THE CAP DID ALMOST NOTHING ON ITS OWN, and measuring is
       what showed it: `.drb-recs` is a flex CHILD of `.drb-main`, so with no
       flex-grow it sizes to its content and stopped at 625px inside a 960px
       card. It has to be told to TAKE the width before a wider grid can pay
       back any height. Measured at 1024x900: 396px of rails became 204. */
    +   '.drb-wrap.drb-isopen .drb-recs{max-width:none;flex:1 1 auto;width:100%;}'
    + '}'
    /* =====================================================================
       WIDE-VIEWPORT TIERS — derived, not chosen. This tool's apparatus has
       NO aspect-ratio, and ⭐ ITS VERTICAL COST IS NEGATIVE: `.drb-rec` is
       an auto-fill grid, so a wider record produces MORE columns and FEWER
       rows — widening makes draw-bag SHORTER. The CARD is what binds:
       A 1192 · B ~1608 · C 1752.
       ⚠⚠ THE WHOLE CLAMP IS REPLACED, NEVER JUST ITS CEILING. A sibling in
       this batch had a clamp whose middle term sat 0.24px under its
       ceiling, where a ceiling-only bump does nothing at Tier A and
       silently works at B and C.
       ⚠⚠ THE GUESS ROW IS DELIBERATELY NARROWER THAN THE CARD, and that is
       a judgement no gate can make: widening it to 1500px at Tier C passed
       every assertion and looked WRONG, because two of the three zones are
       empty until the class commits. Width is spent where it PAYS (the
       record gains columns, the reveal fills, the bag is the tapped
       object) and withheld where it COSTS.
       ⚠ CHROME CAPS ARE INVENTED HERE, NOT RAISED: `.drb-bar`, `.drb-foot`
       and `.drb-band` are `width:100%` and would each stretch the full
       1800px card, leaving a 1500px hint line over a 1240px apparatus.
       ===================================================================== */
    /* ⚠⚠ THE HEIGHT GUARD WAS RE-DERIVED, AND THE OLD DERIVATION SAYS SO
       ITSELF: it was computed when the reveal was a small wrapped tray, and
       build #4 makes it an inline 250px sack sitting beside the claim. At
       1400x880 the densest state — forty draws, both records, the bag open
       — measured 937px of content against 880 of viewport with this tier
       engaged, and 793 without it. So the tier now asks for the room it
       actually needs. This is the tool's own design parameter being
       re-measured, NOT a gate floor being moved to pass: the gate got
       STRICTER in the same commit (it had been measuring the wrong last
       element and missing 57px). */
    + '@media (min-width:1367px) and (min-height:960px){'
    + '  body.drb-wide .drb-guess{max-width:820px;}'
    + '  body.drb-wide .drb-recs{max-width:860px;}'
    + '  body.drb-wide .drb-bar,body.drb-wide .drb-foot,body.drb-wide .drb-band{max-width:1000px;}'
    + '  body.drb-wide .drb-rec{--drb-cell:52px;}'
    + '  body.drb-wide .drb-bag{width:190px;height:190px;}'
    + '  body.drb-wide .drb-sack{max-width:250px;}'
    + '  body.drb-wide .drb-opened{max-width:900px;}'
    + '  body.drb-wide .drb-ocell{width:32px;height:32px;}'
    + '  body.drb-wide .drb-gpiece{width:56px;height:56px;}'
    + '  body.drb-wide .drb-shelf{min-height:72px;}'
    + '  body.drb-wide .drb-chip,body.drb-wide .drb-hint,body.drb-wide .drb-doctrine{font-size:17px;}'
    + '  body.drb-wide .drb-gate{font-size:16px;}'
    + '  body.drb-wide .drb-wrap.drb-isopen .drb-recs{max-width:none;flex:1 1 auto;width:100%;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1000px){'
    + '  body.drb-wide .drb-guess{max-width:940px;}'
    + '  body.drb-wide .drb-recs{max-width:1160px;}'
    + '  body.drb-wide .drb-bar,body.drb-wide .drb-foot,body.drb-wide .drb-band{max-width:1340px;}'
    + '  body.drb-wide .drb-rec{--drb-cell:60px;}'
    + '  body.drb-wide .drb-bag{width:228px;height:228px;}'
    + '  body.drb-wide .drb-sack{max-width:250px;}'
    + '  body.drb-wide .drb-opened{max-width:1150px;}'
    + '  body.drb-wide .drb-ocell{width:38px;height:38px;}'
    + '  body.drb-wide .drb-gpiece{width:64px;height:64px;}'
    + '  body.drb-wide .drb-shelf{min-height:84px;}'
    + '  body.drb-wide .drb-chip,body.drb-wide .drb-hint,body.drb-wide .drb-doctrine{font-size:18px;}'
    + '  body.drb-wide .drb-gate{font-size:17px;}'
    + '  body.drb-wide .drb-wrap.drb-isopen .drb-recs{max-width:none;flex:1 1 auto;width:100%;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    + '  body.drb-wide .drb-guess{max-width:1040px;}'
    + '  body.drb-wide .drb-recs{max-width:1300px;}'
    + '  body.drb-wide .drb-bar,body.drb-wide .drb-foot,body.drb-wide .drb-band{max-width:1510px;}'
    + '  body.drb-wide .drb-rec{--drb-cell:68px;}'
    + '  body.drb-wide .drb-bag{width:256px;height:256px;}'
    + '  body.drb-wide .drb-sack{max-width:250px;}'
    + '  body.drb-wide .drb-opened{max-width:1300px;}'
    + '  body.drb-wide .drb-ocell{width:44px;height:44px;}'
    + '  body.drb-wide .drb-gpiece{width:72px;height:72px;}'
    + '  body.drb-wide .drb-shelf{min-height:96px;}'
    + '  body.drb-wide .drb-chip,body.drb-wide .drb-hint,body.drb-wide .drb-doctrine{font-size:19px;}'
    + '  body.drb-wide .drb-gate{font-size:18px;}'
    + '  body.drb-wide .drb-wrap.drb-isopen .drb-recs{max-width:none;flex:1 1 auto;width:100%;}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){'
    +   '.drb-bag,.drb-gpiece{transition:none !important;}'
    + '}'
    /* =====================================================================
       ⭐⭐ THE PRINT SHEET. ⚠ AND IT CARRIES THE CLAIM. Build #3 hid
       `.drb-guess` and kept `.drb-opened`, so the sheet the class took home
       carried the ANSWER and not the prediction they made — which is
       backwards: the claim is the only part of that page that was theirs.
       ⚠ `.drb-recs` is capped on screen so the rows keep a readable line
       length beside the bag. On paper there is no bag, so the cap is
       released — with !important, because the wide tiers above are more
       specific than a bare class and would otherwise win inside the print
       block too. */
    + '@media print{'
    +   '*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
    +   '.lcs-header,.drb-band,.drb-bar,.drb-foot,.drb-gate,.drb-chip,.drb-bag,.drb-fill,.drb-spine'
    +     '{display:none !important;}'
    +   '.drb-wrap{gap:10px;}'
    +   '.drb-main{flex-direction:column !important;gap:0 !important;}'
    +   '.drb-guess{max-width:none !important;flex-direction:row !important;break-inside:avoid;}'
    +   '.drb-recs{max-width:none !important;width:100%;}'
    +   '.drb-rec{border-color:#333 !important;background:#fff !important;break-inside:avoid;}'
    +   '.drb-cell.drb-full{border-color:#333 !important;}'
    +   '.drb-recs[data-lit] .drb-cell.drb-full{opacity:1 !important;}'
    +   '.drb-opened{break-inside:avoid;}'
    +   '@page{margin:14mm;}'
    + '}';
  var st = document.createElement('style');
  st.id = 'drb-style';
  st.textContent = css;
  document.head.appendChild(st);
}

if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(DrawBag);
