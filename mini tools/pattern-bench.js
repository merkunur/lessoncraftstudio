/* =====================================================================
   TOOL #32 — PATTERN BENCH   (pattern-bench.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). REBUILT TO THE v4 BAR, build #4.

   A strip that repeats whatever unit you build. Colour it, shape it,
   picture it, clap it — the SAME pattern in three costumes.

   THE ONE THESIS — A PATTERN IS ITS UNIT, NOT ITS SURFACE. A child who
   can continue red-blue-red-blue has not necessarily seen the pattern;
   they may just be alternating. The child who sees that red-blue-red-blue
   and circle-square-circle-square are THE SAME PATTERN has. That transfer
   is the whole of early algebraic thinking.

   ⚠ THE STRAND IS EMPTY, AND THAT IS NOT AN OVERSIGHT. Repeating patterns
   are taught daily in K-1 across our European markets — Muster fortsetzen,
   patronen voortzetten, fortsätta mönster — but US Common Core barely
   codes them before 4.OA.C.5. This tool therefore carries NO
   educationalAlignment (readiness class, §22.1).

   =====================================================================
   THE TWO INVENTIONS OF THIS REBUILD
   =====================================================================
   1. ⭐ EVERY BEAD IS A HANDLE, AND ONE TAP MOVES ITS WHOLE FAMILY.
      Tap bead 7 and it cycles the SLOT it belongs to — so beads 1, 3, 5,
      7, 9, 11 all change in the same frame, and so does the socket in the
      unit bay. That is the equivalence class of i modulo k, enacted. The
      shipped tool had NO representation of it: the unit was an INPUT
      visible only in its own box, and nothing on the strip showed which
      beads belonged to which slot. This is the difference between
      displaying a stripe and teaching a unit — and it is what defeats the
      rhythmic strategy, because a child running "red, blue, red, blue…"
      has a local rule that makes no prediction at all about what happens
      when you touch bead 3.
      ⚠ THE CLASS RINGS BEFORE IT COMMITS. On press-in the family rings;
      the cycle lands on release. Without that first beat a child reads
      "the beads are magically linked" (peer-to-peer, and WRONG) instead
      of "they are all copies of one bead". The causal story must be
      bead -> slot -> all beads, never bead -> beads.

   2. ⭐ THE BRACKET SLIDES, AND THE STRIP DOES NOT FLINCH.
      state carries `phase`; cell(i) = unit[(i - phase) mod k]. Sliding the
      bracket one step right rotates the unit one step left, and the
      rendered strip is BYTE-IDENTICAL:
        cell'(i) = unit'[(i-phase-1) mod k] = unit[(i-phase-1+1) mod k]
                 = cell(i)                                            ∎
      ⚠ WHY THIS HAD TO EXIST. The shipped header claimed the class argues
      about where the repeating part starts and ends "and the bench lets
      them TEST each claim by rebuilding the strip from it". IT DID NOT.
      Rebuilding from [b,a] produced a strip STARTING WITH BLUE — it looks
      different, so the class could not tell whether the BA claim was
      vindicated or refuted. The tool staged an argument it had no
      mechanism to settle, which is exactly what design gate 5 exists to
      prevent. The slide is that mechanism: move the bracket, watch
      nothing change, and the material settles it instead of the adult.

   THE THIRD, KEPT: THE GAP GOES IN THE MIDDLE. Cover any cell, including
   an interior one. A missing cell at the END can be solved by copying the
   last one; a missing cell in the MIDDLE can only be solved from the
   unit. The covered cell leaves the DOM entirely, so nothing leaks.
   ⚠ AND ITS HIDDEN LETTER STILL FOLLOWS ITS CLASS — cycle a sibling while
   bead 5 is covered and lifting the cloth must reveal the NEW value, or
   the tool has contradicted its own strip in front of the class.

   =====================================================================
   WHAT WAS MEASURED AND FIXED (the shipped tool's defects)
   =====================================================================
   D1  ⭐ THE IFRAME WAS PINNED TO ~422px ON EVERY DESKTOP. lcs-shell.css
       :54 `html,body{height:100%}` -> :63-71 `.lcs-app{height:100%;
       overflow:hidden}`; `.lcs-app.activity{height:auto}` (:285) is the
       only escape and a manipulative never gets it. The shell's
       ResizeObserver then measures `app.getBoundingClientRect()`
       (lcs-shell.js:949) — the iframe measuring ITSELF — and the `< 4`
       de-dupe at :951 freezes it at ActivityIframe's INITIAL_HEIGHT + 2.
       ⚠ THE SHELL'S OWN COMMENT AT :971-982 SAYS THIS CANNOT HAPPEN
       ("no feedback path exists"). It checked for a `vh` rule. The
       feedback path is `height:100%`. Fixed here the way sorting-hoops
       fixed it (:2490): break the percentage chain UNCONDITIONALLY.
   D2  All three wide tiers were dead code — `min-height:880/1080/1150`
       against a 422px iframe viewport can never be true. Re-keyed on
       WIDTH ALONE.
   D3  The scroll escape was keyed `@media (max-width:700px)`; the
       production embed measures ~704px, so it MISSED BY FOUR PIXELS and
       every desktop stayed trapped under overflow:hidden.
   D4  Ctrl+P delivered the paid sheet to a free visitor: the chip was
       gated, the @media print block was not, and the strip was always in
       the DOM. Now double-locked — the sheet is ABSENT unless entitled.
   D5  There was no print SHEET, only a restyle of the live screen DOM —
       which meant a horizontally SCROLLED strip printed cut off.
   D7  Nothing said the sockets were tappable. Now: a recessed socket, a
       four-dot cycle indicator, a thumb notch, and a one-shot nudge.
   D8  The unit was the SMALLEST object on screen (64px sockets against
       104px beads at 2560) — the protagonist, smallest. Now ~2x the bead
       at every width, by construction, off one variable.
   D9  At 360 the strip was sliced mid-bead with ZERO scroll affordance.
   D10 `api.announce` was never called; `innerHTML=''` on every tap
       dropped keyboard focus to <body>.
   D11 The transfer line was injected INTO FLOW and shoved the whole
       apparatus down 45px, then vanished and it all jumped back.
   D12 ⭐ THE COLOUR COSTUME WAS UNUSABLE FOR A COLOUR-BLIND CHILD.
       Measured: protan red~green dE 14.5 (floor 18) — the identical
       number sorting-hoops was rebuilt to remove. Colour is this tool's
       DEFAULT costume, so the default mode was the broken one.
   D13 The shape costume had a 58.1% optical-area spread (triangle 30%
       lighter than circle), so slot b read as weaker than slot a in a
       tool whose whole claim is that the slots are equal members.
   D14 ⭐ apple and cherry rendered as two near-identical red blobs at
       bead size. THE PAID COSTUME COULD NOT CARRY THE PATTERN.
   D15 The clap pulse was coral — rgba(242,120,75,.55) — which in this
       same file means LOCKED. Clapping flashed each bead in the
       you-cannot-have-this colour.
   D16 Under prefers-reduced-motion the clap's only feedback was deleted
       outright, so with sound off the control did nothing observable.
       Reduced motion removes the TRANSITION, never the SIGNAL.
   D17 len was {12,16,20,24}: for k=2 and k=4 EVERY reachable length ended
       exactly on a unit boundary, so a child could recover k by counting
       repeats to the end — the very strategy the tool exists to defeat.
       Now len = 3k+1 by construction: three full repeats and one more
       bead, always mid-unit.

   REFUSES, FOREVER: no score, no streak, no timer · no tick and no cross
   — the strip never marks a guess, it only repeats the unit it was given
   · no "what comes next?" quiz with a right answer, because the
   interesting question is what the UNIT is, not what the next bead is ·
   the covered cell is never revealed by the tool, only by the teacher ·
   no celebration when a pattern is completed, because completing it is
   not the achievement — naming it is · NO GROWING PATTERNS, EVER: they
   are on the catalog's rejected list (premium-tools-v4.md:609), they are
   already shipped on the printable surface (K-053), and a growing pattern
   HAS NO UNIT — admitting one would falsify invention #1 in the same
   frame that teaches it · no minimal-unit correction: AB and ABAB draw
   byte-identical strips and the tool must never say which is "the" unit.

   FENCE — all four surfaces, re-checked before a line was written:
     mini tools/*.js        pattern-bench is the only interactive
                            repeating-pattern surface (sorting-hoops'
                            `patterns` is a colour-blind fill setting).
     *-activities.json      ZERO repeating-pattern CCSS codes.
                            shapeforge.compose 1.G.A.2 is pattern BLOCKS
                            (trapezoids into a hexagon); star-stitcher and
                            choice-board are the COUNTING sequence.
     worksheet-gen/types/   OCCUPIED — K-046 AB, K-047 ABC, K-048 AABB,
                            K-049 missing-middle, K-050 size, K-052
                            position, K-053 growing, K-077 shapes,
                            G1-155 two-blanks, all from one factory
                            (_shared/pattern-next.js). ⭐ SUBTRACTED, not
                            negotiated: this tool does NOT do growing, size
                            or orientation patterns, and does NOT print a
                            fill-in-the-gap sheet, because those nine
                            types already ship them generated and themed
                            in 11 locales with better artwork. What is
                            left is what only an abstract-slot model can
                            do, and that is what got built.
     REFERENCE APPS/        pattern-train, pattern-worksheet — PDF
                            generators, complementary, already linked from
                            tool-content.ts:178.
   ===================================================================== */
var PatternBench = {
  id: 'pattern-bench',

  /* ⚠ CURATION: en authored; the other ten are the per-locale native
     3-agent ensembles (§A.13.48). [NSR-FLAG] sv/da/no/fi. pt Brazilian. */
  strings: {
    title:          { en: "Pattern Bench", de: "Musterwerkstatt", fr: "L’atelier des motifs", es: "Mesa de patrones", pt: "Mesa de padrões", it: "Il banco dei ritmi", nl: "Patroonwerkplaats", sv: "Mönsterverkstaden", da: "Mønsterbænken", no: "Mønsterbenken", fi: "Kuviopaja" },
    instruction:    { en: "Build the part that repeats. The strip carries it on. Then show the same pattern a different way.", de: "Baut den Baustein, der sich wiederholt. Das Band setzt ihn fort. Zeigt dann dasselbe Muster auf eine andere Art.", fr: "Construisez le motif qui se répète. La bande le continue toute seule. Puis montrez la même suite d’une autre façon.", es: "Armen la parte que se repite. La tira la continúa sola. Después, muestren el mismo patrón de otra manera.", pt: "Montem a parte que se repete. A tira continua sozinha. Depois, mostrem o mesmo padrão de outro jeito.", it: "Costruite la parte che si ripete. La striscia va avanti da sola. Poi mostrate lo stesso ritmo in un altro modo.", nl: "Bouw de kern van het patroon. De strook zet hem voort. Laat daarna hetzelfde patroon op een andere manier zien.", sv: "Bygg mönsterdelen. Remsan fortsätter den. Visa sedan samma mönster på ett annat sätt.", da: "Byg den del, der gentager sig. Striben fører den videre. Vis så det samme mønster på en ny måde.", no: "Bygg delen som gjentar seg. Stripen fører den videre. Vis så det samme mønsteret på en ny måte.", fi: "Rakenna osa, joka toistuu. Jono jatkaa sitä eteenpäin. Näytä sitten sama kuvio toisella tavalla." },
    unitLabel:      { en: "The part that repeats", de: "Der Baustein", fr: "Le motif qui se répète", es: "La parte que se repite", pt: "A parte que se repete", it: "La parte che si ripete", nl: "De kern van het patroon", sv: "Mönsterdelen", da: "Den del, der gentager sig", no: "Delen som gjentar seg", fi: "Osa, joka toistuu" },
    stripLabel:     { en: "The strip", de: "Das Band", fr: "La bande", es: "La tira", pt: "A tira", it: "La striscia", nl: "De strook", sv: "Remsan", da: "Striben", no: "Stripen", fi: "Jono" },
    mColour:        { en: "Colours", de: "Farben", fr: "Couleurs", es: "Colores", pt: "Cores", it: "Colori", nl: "Kleuren", sv: "Färger", da: "Farver", no: "Farger", fi: "Värit" },
    mShape:         { en: "Shapes", de: "Formen", fr: "Formes", es: "Formas", pt: "Formas", it: "Forme", nl: "Vormen", sv: "Former", da: "Former", no: "Former", fi: "Muodot" },
    mPicture:       { en: "Pictures", de: "Bilder", fr: "Images", es: "Imágenes", pt: "Imagens", it: "Immagini", nl: "Plaatjes", sv: "Bilder", da: "Billeder", no: "Bilder", fi: "Kuvat" },
    clapIt:         { en: "Clap it", de: "Klatschen", fr: "Taper le rythme", es: "Aplaudir", pt: "Bater palmas", it: "Batti il ritmo", nl: "Klappen", sv: "Klappa", da: "Klap med", no: "Klapp med", fi: "Taputa mukana" },
    sameAgain:      { en: "Same pattern, new costume", de: "Dasselbe Muster, nur anders angezogen.", fr: "La même suite, habillée autrement.", es: "El mismo patrón, con otro disfraz.", pt: "O mesmo padrão, com outra roupa.", it: "Lo stesso ritmo, un altro vestito.", nl: "Hetzelfde patroon, in een nieuw jasje.", sv: "Samma mönster – bara nya kläder.", da: "Samme mønster i nyt tøj", no: "Samme mønster i nye klær", fi: "Sama kuvio, uusi asu" },
    showLetters:    { en: "Say it in letters", de: "Mit Buchstaben sagen", fr: "Dire la suite en lettres", es: "Decirlo con letras", pt: "Dizer com letras", it: "Dirlo con le lettere", nl: "Zeg het in letters", sv: "Säg det med bokstäver", da: "Sig det med bogstaver", no: "Si det med bokstaver", fi: "Sano se kirjaimin" },
    hideUnit:       { en: "Hide it", de: "Verstecken", fr: "Cacher", es: "Esconder", pt: "Esconder", it: "Nascondi", nl: "Verstoppen", sv: "Göm den", da: "Skjul den", no: "Skjul den", fi: "Piilota" },
    showUnit:       { en: "Show it", de: "Zeigen", fr: "Montrer", es: "Mostrar", pt: "Mostrar", it: "Mostra", nl: "Laten zien", sv: "Visa den", da: "Vis den", no: "Vis den", fi: "Näytä" },
    hiddenUnitNote: { en: "What is the part that repeats?", de: "Welcher Baustein wiederholt sich?", fr: "Quel est le motif qui se répète ?", es: "¿Cuál es la parte que se repite?", pt: "Qual é a parte que se repete?", it: "Qual è la parte che si ripete?", nl: "Wat is de kern van het patroon?", sv: "Hur ser mönsterdelen ut?", da: "Hvad er det, der gentager sig?", no: "Hva er det som gjentar seg?", fi: "Mikä osa toistuu?" },
    coverNote:      { en: "Tap a bead to cover it — try one in the middle.", de: "Tippt auf eine Perle, um sie zuzudecken — am besten eine in der Mitte.", fr: "Touchez une perle pour la cacher — essayez-en une au milieu.", es: "Toquen una ficha para taparla — prueben con una de en medio.", pt: "Toquem em uma ficha para cobrir — experimentem uma do meio.", it: "Toccate una perlina per coprirla — provatene una in mezzo.", nl: "Tik op een kraal om hem af te dekken — probeer er een in het midden.", sv: "Tryck på en pärla för att täcka den — pröva en i mitten.", da: "Tryk på en perle for at dække den — prøv en inde i midten.", no: "Trykk på en perle for å dekke den — prøv en i midten.", fi: "Napauta helmeä, niin se peittyy — kokeile keskeltä." },
    unitLen:        { en: "How long is it?", de: "Wie lang ist er?", fr: "Combien de perles ?", es: "¿De cuántas fichas?", pt: "De quantas fichas?", it: "Di quante perline?", nl: "Hoe lang is hij?", sv: "Hur lång är den?", da: "Hvor lang er den?", no: "Hvor lang er den?", fi: "Kuinka pitkä osa on?" },
    longerStrip:    { en: "A longer strip", de: "Längeres Band", fr: "Rallonger", es: "Tira más larga", pt: "Tira mais longa", it: "Più lunga", nl: "Langere strook", sv: "Längre remsa", da: "Længere stribe", no: "Lengre stripe", fi: "Pidempi jono" },
    gatePicture:    { en: "The picture costume is part of the Teacher plan.", de: "Die Bilder gehören zum Lehrer-Paket.", fr: "Le costume Images fait partie de l’offre Enseignant.", es: "El disfraz de Imágenes es parte del plan Docente.", pt: "A roupa de Imagens faz parte do plano Professor.", it: "Il vestito Immagini fa parte del piano Insegnante.", nl: "De plaatjes horen bij het Leerkracht-pakket.", sv: "Bilderna ingår i Lärarpaketet.", da: "Billederne er en del af Lærerpakken.", no: "Bildene er en del av Lærerpakken.", fi: "Kuvat kuuluvat Opettaja-tilaukseen." },
    gatePrint:      { en: "Printing is part of the Teacher plan.", de: "Das Drucken gehört zum Lehrer-Paket.", fr: "L’impression fait partie de l’offre Enseignant.", es: "La impresión es parte del plan Docente.", pt: "A impressão faz parte do plano Professor.", it: "La stampa fa parte del piano Insegnante.", nl: "Afdrukken hoort bij het Leerkracht-pakket.", sv: "Utskrift ingår i Lärarpaketet.", da: "Udskrivning er en del af Lærerpakken.", no: "Utskrift er en del av Lærerpakken.", fi: "Tulostus kuuluu Opettaja-tilaukseen." },
    printBtn:       { en: "Print the strip", de: "Das Band drucken", fr: "Imprimer la bande", es: "Imprimir la tira", pt: "Imprimir a tira", it: "Stampa la striscia", nl: "De strook printen", sv: "Skriv ut remsan", da: "Print striben", no: "Skriv ut stripen", fi: "Tulosta jono" },
    unlock:         { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Vedi il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerpakken", no: "Se Lærerpakken", fi: "Katso Opettaja-tilaus" },
    privacyLine:    { en: "Nothing here is saved, counted or sent anywhere.", de: "Hier wird nichts gespeichert, gezählt oder weitergegeben.", fr: "Rien ici n’est enregistré, compté ni envoyé où que ce soit.", es: "Aquí no se guarda, no se cuenta ni se envía nada.", pt: "Aqui nada é guardado, contado nem enviado para lugar nenhum.", it: "Qui non si salva, non si conta e non si invia nulla.", nl: "Hier wordt niets bewaard, geteld of doorgestuurd.", sv: "Ingenting här sparas, räknas eller skickas vidare.", da: "Intet gemmes, tælles eller sendes nogen steder hen.", no: "Ingenting lagres, telles eller sendes noe sted.", fi: "Mitään ei tallenneta, lasketa eikä lähetetä minnekään." },
    setSound:       { en: "Play a sound for each bead", de: "Für jede Perle einen Ton spielen", fr: "Jouer un son pour chaque perle", es: "Tocar un sonido en cada ficha", pt: "Tocar um som em cada ficha", it: "Suona una nota per ogni perlina", nl: "Bij elke kraal een toon spelen", sv: "Spela en ton för varje pärla", da: "Spil en lyd for hver perle", no: "Spill en lyd for hver perle", fi: "Soita ääni jokaiselle helmelle" },
    clear:          { en: "Start again", de: "Neu anfangen", fr: "Recommencer", es: "Empezar de nuevo", pt: "Começar de novo", it: "Ricomincia", nl: "Opnieuw beginnen", sv: "Börja om", da: "Start forfra", no: "Start på nytt", fi: "Aloita alusta" },

    /* ---- new in build #4 ---- */
    /* ⚠ EN IS A SOURCE TO AUDIT, NOT A TARGET. Every panel is handed this
       English and asked to correct it as well as render it — it is the one
       locale nobody else reviews. */
    hintTap:        { en: "Tap a bead. Every bead in the same place changes too.", de: "Tippt eine Perle an. Alle, die zu ihr gehören, ändern sich mit.", fr: "Touchez une perle : toute sa famille change avec elle.", es: "Toquen una ficha: cambian todas las de su mismo lugar.", pt: "Toquem em uma ficha. Mudam todas as do mesmo lugar.", it: "Toccate una perlina. Cambiano tutte quelle nello stesso posto.", nl: "Tik op een kraal. Alle kralen op dezelfde plek veranderen mee.", sv: "Tryck på en pärla. Alla kopior av den ändras.", da: "Tryk på en perle. Alle dens kopier skifter med.", no: "Trykk på en perle. Alle kopiene av den endres.", fi: "Napauta helmeä. Kaikki sen kopiot muuttuvat." },
    hintSlide:      { en: "Move the bracket. The strip stays exactly the same.", de: "Verschiebt die Klammer. Das Band bleibt genau gleich.", fr: "Déplacez le crochet : la bande reste la même.", es: "Muevan el gancho: la tira queda igual.", pt: "Movam o grampo. A tira fica exatamente igual.", it: "Spostate la pinza. La striscia resta esattamente uguale.", nl: "Verschuif het haakje. De strook blijft precies hetzelfde.", sv: "Flytta bygeln: mönsterdelen vänds, remsan inte.", da: "Flyt klammen. Delen vendes, striben ikke.", no: "Flytt klammen. Delen snus, stripen ikke.", fi: "Siirrä hakasta. Osa kääntyy, jono ei muutu." },
    coverBtn:       { en: "Cover a bead", de: "Perle zudecken", fr: "Poser un cache", es: "Tapar una ficha", pt: "Cobrir uma ficha", it: "Copri una perlina", nl: "Kraal afdekken", sv: "Täck en pärla", da: "Dæk en perle til", no: "Dekk til en perle", fi: "Peitä yksi helmi" },
    slideLeft:      { en: "Move the bracket left", de: "Klammer nach links verschieben", fr: "Déplacer le crochet vers la gauche", es: "Mover el gancho a la izquierda", pt: "Mover o grampo para a esquerda", it: "Sposta la pinza a sinistra", nl: "Haakje naar links", sv: "Flytta bygeln åt vänster", da: "Flyt klammen til venstre", no: "Flytt klammen til venstre", fi: "Siirrä hakanen vasemmalle" },
    slideRight:     { en: "Move the bracket right", de: "Klammer nach rechts verschieben", fr: "Déplacer le crochet vers la droite", es: "Mover el gancho a la derecha", pt: "Mover o grampo para a direita", it: "Sposta la pinza a destra", nl: "Haakje naar rechts", sv: "Flytta bygeln åt höger", da: "Flyt klammen til højre", no: "Flytt klammen til høyre", fi: "Siirrä hakanen oikealle" },
    printKey:       { en: "Legend", de: "Legende", fr: "Légende", es: "Leyenda", pt: "Legenda", it: "Legenda", nl: "Legenda", sv: "Teckenförklaring", da: "Tegnforklaring", no: "Tegnforklaring", fi: "Merkkien selitys" },
    printCarryOn:   { en: "Carry the pattern on", de: "Setze das Muster fort", fr: "Continue la suite", es: "Sigue el patrón", pt: "Continue o padrão", it: "Continua il ritmo", nl: "Zet het patroon voort", sv: "Fortsätt mönstret", da: "Før mønstret videre", no: "Før mønsteret videre", fi: "Jatka kuviota" },
  },

  STORE_KEY: 'lcs:pattern-bench:v1',
  ENT_TRUST_DAYS: 14,

  defaults: { sound: true, letters: false },
  settings: [
    { key: 'sound', type: 'toggle', labelKey: 'setSound' },
    { key: 'letters', type: 'toggle', labelKey: 'showLetters' }
  ],

  premium: false,
  premiumKnown: false,

  /* =================================================================
     THE MODEL — abstract slots only. The pattern is a letter sequence;
     a medium is a way of DRAWING a letter. Nothing about colour, shape
     or picture can reach the pattern, so switching costume provably
     preserves it.
     ================================================================= */
  SLOTS: ['a', 'b', 'c', 'd'],
  MEDIA: ['colour', 'shape', 'picture'],

  /* ⭐ THE PALETTE IS A VALUE LADDER, AND THAT IS THE DESIGN RULE.
     The shipped set failed the house colour-vision floor at protan
     red~green dE 14.5 (floor 18) — the identical number sorting-hoops was
     rebuilt to remove — and offered no non-colour channel at all.
     Dichromats retain FULL luminance perception, so a set separable in
     greyscale is separable under any colour vision. Measured on this set:
       worst pair dE 24.8 (deutan sky~grape), floor 18            PASS
       L* ladder  grape 30 < brick 42 < sky 55 < honey 79, min gap 12.3
     against sorting-hoops' own set, which scores a higher dE 28.3 but a
     min L* gap of only 4.6 — red and blue nearly the same lightness. The
     ladder is the more robust axis and it is why this set wins here.
     ⚠ NO GREEN: red/green is the one pair you cannot engineer around at
     four categories. ⚠ NO ORANGE: coral #F2784B means LOCKED in this very
     file, and a bead must never speak the paywall's colour.
     ⚠ NO TEAL: teal is the tool's ink.
     Consequence, and it is the point: no two-bead unit can read as
     wrong-vs-right, because neither a coral nor a teal bead exists. */
  COLOUR: {
    a: { fill: '#B33A2B', name: 'brick' },
    b: { fill: '#3F86D0', name: 'sky' },
    c: { fill: '#EFBB3C', name: 'honey' },
    d: { fill: '#5B3184', name: 'grape' }
  },
  KEYLINE: '#33291E',      /* 13.98:1 on cream — it is what carries honey */
  SPEC: 'rgba(255,255,255,.40)',
  /* ⭐ THE RING INK IS NOT TEAL, AND THE GATE OVERRULED TWO PANELS ON IT.
     A ring that sits ON a bead must be discriminable from every slot
     fill. Measured against this palette, floor 26:
       teal    #146B5E  dE 20.7 (tritan ~ sky)      PUN
       #0E5147          dE 20.3 (protan ~ brick)    PUN   <- art panel's
       #1E8FD4 (shell)  literally a blue            PUN
       #2A2A35          dE 35.8                     OK
     sorting-hoops:2299 records the same finding from the other side.
     ⚠ AND IT IS DRAWN ON THE CELL, NEVER ON THE GLYPH: #2A2A35 measures
     13.94:1 on the cream cell but only 2.01:1 on the brick fill. */
  RING: '#2A2A35',

  /* ⭐ SHAPES, AREA-CORRECTED. The shipped four spread 58.1% by fill area
     (triangle 496 against square 784), so slot b read as visually weaker
     than slot a — a false salience in a tool whose entire claim is that
     the slots are equal members of one structure. Re-cut so that the
     EFFECTIVE optical mass (fill + the keyline's own ink, which a
     high-perimeter glyph gains more of) lands within 2.4%:
       circle 749 · square 753 · triangle 744 · star 735
     ⚠ AND THE HEXAGON IS GONE, FOR AN ARITHMETIC REASON. A circle of
     r=15 and a point-up hexagon of circumradius 15 differ by
     r(1-cos30) = 1.71px at a 34px bead. That is invisible at three
     metres and invisible on a phone, and it is WHY the shipped four read
     "weak and samey" — not a matter of taste. A star's concavities are
     4-5px deep at the same size. circle/square/triangle/star is also the
     canonical K shape set on every early-years wall poster. */
  SHAPE: {
    a: 'M20 5.9a14.1 14.1 0 1 1 0 28.2 14.1 14.1 0 0 1 0-28.2z',
    b: 'M10.1 7.5h19.8a2.6 2.6 0 0 1 2.6 2.6v19.8a2.6 2.6 0 0 1-2.6 2.6H10.1a2.6 2.6 0 0 1-2.6-2.6V10.1a2.6 2.6 0 0 1 2.6-2.6z',
    c: 'M20 4 38.4 36H1.6z',
    d: 'M20 3 26.64 11.46 36.74 15.16 30.75 24.09 30.35 34.84 20 31.9 9.65 34.84 9.25 24.09 3.26 15.16 13.36 11.46z'
  },
  SHAPE_SPEC: {
    a: 'M10.6 14.9a11.4 11.4 0 0 1 7.4-6.5',
    b: 'M10.4 12.8v-1.6a1.6 1.6 0 0 1 1.6-1.6h6.4',
    c: 'M20 9.4 13.6 20.6',
    d: 'M20 7.6 17.9 13.4'
  },
  SHAPE_INK: '#146B5E',   /* the house teal — NOT one of the four slot
                             colours, so shape-c can never be read as
                             colour-c, and it introduces no new hue */

  /* ⭐ THE PICTURE COSTUME IS DRAWN IN-HOUSE, AND THAT IS A CORRECTNESS
     FIX, NOT A TASTE ONE. The shipped costume read four photo-real webps
     from the fruit library — and `apple` and `cherry` render as two
     near-identical red round blobs at bead size, so THE PAID COSTUME
     COULD NOT CARRY THE PATTERN. Four further reasons: the library art
     has gradients and cast shadows and cannot be reconciled with a flat
     disc by any amount of framing; twelve lazy-loaded <img> in a
     horizontally scrolling track load raggedly and leave holes; a photo
     prints as a grey smear on a classroom laser while a flat glyph drops
     its fills and prints as clean line art; and the library set has no
     greyscale story at all.
     Chosen by SILHOUETTE, not by theme — narrow diagonal lens / radial
     rosette / dome-on-stalk / wide symmetric wings. All four are drawn
     identically in all eleven locales and carry no dietary, seasonal or
     cultural hazard. Every picture hue is lighter and less saturated than
     its nearest slot colour, so no picture can alias to a colour bead. */
  PICTURE: {
    a: { body: '#6D9E4E', parts: [
          { d: 'M32 8A24 24 0 0 1 8 32 24 24 0 0 1 32 8z', fill: '#6D9E4E' },
          { d: 'M31 9 9.6 30.4', stroke: '#33291E', w: 2.2 },
          { d: 'M9.6 30.4 5.2 34.8', stroke: '#33291E', w: 2.6 } ],
        spec: 'M28.6 12.2a13 13 0 0 0-6.8 5.9' },
    b: { body: '#E08BAE', parts: [
          { d: 'M25 13.12A5.72 5.72 0 1 1 28.08 22.63A5.72 5.72 0 1 1 20 28.5A5.72 5.72 0 1 1 11.92 22.63A5.72 5.72 0 1 1 15 13.12A5.72 5.72 0 1 1 25 13.12z', fill: '#E08BAE' },
          { d: 'M20 14.6a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8z', fill: '#F2D98A' } ],
        spec: 'M15.2 9.4a7.4 7.4 0 0 1 4.8-2' },
    c: { body: '#D2705E', parts: [
          { d: 'M15.4 21h9.2v9.8a4.6 4.6 0 0 1-9.2 0z', fill: '#F6EEDD' },
          { d: 'M4.6 22.2A15.7 15.7 0 1 1 35.4 22.2z', fill: '#D2705E' },
          { d: 'M13.6 12.7a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4z', fill: '#F6EEDD', nokey: true },
          { d: 'M25.4 11.4a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8z', fill: '#F6EEDD', nokey: true },
          { d: 'M20.6 17.2a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2z', fill: '#F6EEDD', nokey: true } ],
        spec: 'M9.6 16.4a11.6 11.6 0 0 1 5.6-5.6' },
    d: { body: '#7F9FD4', parts: [
          { d: 'M13.4 20.8a6.6 6.6 0 1 1 0 13.2 6.6 6.6 0 0 1 0-13.2z', fill: '#7F9FD4' },
          { d: 'M26.6 20.8a6.6 6.6 0 1 1 0 13.2 6.6 6.6 0 0 1 0-13.2z', fill: '#7F9FD4' },
          { d: 'M11.6 6.6a8.6 8.6 0 1 1 0 17.2 8.6 8.6 0 0 1 0-17.2z', fill: '#7F9FD4' },
          { d: 'M28.4 6.6a8.6 8.6 0 1 1 0 17.2 8.6 8.6 0 0 1 0-17.2z', fill: '#7F9FD4' },
          { d: 'M20 8.6a2.3 2.3 0 0 1 2.3 2.3v20a2.3 2.3 0 0 1-4.6 0v-20A2.3 2.3 0 0 1 20 8.6z', fill: '#33291E' },
          { d: 'M18.9 9.4 15.2 4.8', stroke: '#33291E', w: 1.8 },
          { d: 'M21.1 9.4 24.8 4.8', stroke: '#33291E', w: 1.8 },
          { d: 'M11.6 12.4a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8z', fill: '#F2D98A', nokey: true },
          { d: 'M28.4 12.4a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8z', fill: '#F2D98A', nokey: true } ],
        spec: 'M5.6 13.2a8.6 8.6 0 0 1 4.6-4.6' }
  },

  TONE: { a: 392, b: 523, c: 659, d: 784 },

  /* =================================================================
     BOUNDS
     ⚠ THE STRIP IS 3k+1 BY CONSTRUCTION, AND THAT IS D17'S FIX.
     The shipped len was {12,16,20,24} with LEN_STEP 4, so for k=2 and
     k=4 — the two commonest units — EVERY reachable length ended exactly
     on a unit boundary. A child could then recover k by counting repeats
     to the end instead of by seeing the unit, which is precisely the
     strategy this tool exists to defeat.
     3k+1 gives three whole repeats (the floor every printable in this
     house uses) plus one more bead, so the strip always stops mid-unit
     and always shows the unit starting again. */
  UNIT_MIN: 1,
  UNIT_MAX: 4,
  REPS_MIN: 3,
  LEN_MAX: 28,

  /* ⚠ CLAMP, NEVER REJECT, and slice rather than pop: `while (unit.length
     > n) pop()` with a negative n pops an empty array forever, and a gate
     that HANGS reports nothing at all. Bounded by construction instead.

     ⭐ len IS ALWAYS reps*k + 1, AND THAT IS THE WHOLE OF D17'S FIX.
     Not merely the default — EVERY reachable length. The shipped tool
     stepped len by a fixed 4 through {12,16,20,24}, so for k=2 and k=4
     every single reachable length ended exactly on a unit boundary and a
     child could recover k by counting repeats to the end. A fixed step of
     any size reintroduces that for some k (a step of 3 puts k=2 back on a
     boundary at 16). Stepping by k — "one more repeat" — keeps
     len ≡ 1 (mod k) at every length, so the strip always stops mid-unit
     and always shows the unit starting again.
     ⚠ The upper bound is clamped in REPS, never in beads: clamping to a
     bead count would land on 28, which IS a boundary for k=4. */
  maxReps: function (k) { return Math.max(this.REPS_MIN, Math.floor((this.LEN_MAX - 1) / k)); },
  repsOf: function (st) { return Math.floor((st.len - 1) / st.unit.length); },
  normLen: function (k, len) {
    var v = Math.round(Number(k) || 0);
    if (!(v >= this.UNIT_MIN)) v = this.UNIT_MIN;
    if (v > this.UNIT_MAX) v = this.UNIT_MAX;
    var r = Math.floor((Math.round(Number(len) || 0) - 1) / v);
    if (!(r >= this.REPS_MIN)) r = this.REPS_MIN;
    var mx = this.maxReps(v);
    if (r > mx) r = mx;
    return r * v + 1;
  },
  minLenFor: function (k) { return this.normLen(k, 0); },

  /* ⚠ THE DEFAULT STRIP IS 3k+1 BEADS, NOT A FIXED 13, AND THE REASON IS
     THE RENDER. 13 beads at the 44px K-2 tap floor is 632px of content,
     which scrolls at 1024 and cuts the last bead — the operator's
     original complaint about this tool, reintroduced by a longer default.
     Three whole repeats plus one is the honest minimum a pattern needs
     (it is the floor every printable in this house uses), it fits without
     scrolling from 412 up, and the teacher can always add a repeat. */
  newState: function () {
    return { unit: ['a', 'b'], phase: 0, len: 7, covered: [], medium: 'colour',
      unitHidden: false, armed: false };
  },

  _mod: function (n, m) { return ((n % m) + m) % m; },

  /* ⚠ PURE and total: cell i of the strip is unit[(i - phase) mod k].
     An empty unit yields no strip rather than a crash. */
  cellAt: function (st, i) {
    if (!st || !st.unit || !st.unit.length) return null;
    if (!(i >= 0) || i >= st.len) return null;
    return st.unit[this._mod(i - (st.phase || 0), st.unit.length)];
  },

  /* the whole strip as a letter sequence — the pattern, costume-free */
  sequence: function (st) {
    var out = [], i;
    for (i = 0; i < (st ? st.len : 0); i++) out.push(this.cellAt(st, i));
    return out;
  },

  /* ⭐ THE CONGRUENCE CLASS OF i — the family that moves together. This
     is the model behind invention #1, and the render must not compute it
     a second time or the two can drift. */
  classOf: function (st, i) {
    var out = [], j;
    if (!st || !st.unit || !st.unit.length) return out;
    if (!(i >= 0) || i >= st.len) return out;
    var k = st.unit.length, want = this._mod(i - (st.phase || 0), k);
    for (j = 0; j < st.len; j++) if (this._mod(j - (st.phase || 0), k) === want) out.push(j);
    return out;
  },

  slotIndexAt: function (st, i) {
    if (!st || !st.unit || !st.unit.length) return -1;
    if (!(i >= 0) || i >= st.len) return -1;
    return this._mod(i - (st.phase || 0), st.unit.length);
  },

  isCovered: function (st, i) { return !!st && st.covered.indexOf(i) > -1; },

  _clone: function (st) {
    return { unit: st.unit.slice(), phase: st.phase, len: st.len,
      covered: st.covered.slice(), medium: st.medium,
      unitHidden: st.unitHidden, armed: st.armed };
  },

  /* immutable */
  setUnitSlot: function (st, i, slot) {
    var next = this._clone(st);
    if (!(i >= 0) || i >= next.unit.length) return next;
    if (this.SLOTS.indexOf(slot) === -1) return next;
    next.unit[i] = slot;
    return next;
  },

  /* ⭐ THE OPERATOR'S DIRECTIVE, AS A REDUCER. Tapping strip bead i
     cycles the SLOT it belongs to — so every bead congruent to i mod k
     moves with it. Cycling runs over all four SLOTS regardless of k, so
     two presses never net to zero: a liveness gate that presses Enter and
     Space in one tick would score a toggle DEAD. */
  cycleSlotAt: function (st, i) {
    var si = this.slotIndexAt(st, i);
    if (si < 0) return this._clone(st);
    var at = this.SLOTS.indexOf(st.unit[si]);
    return this.setUnitSlot(st, si, this.SLOTS[this._mod(at + 1, this.SLOTS.length)]);
  },

  /* ⭐ INVENTION #2. Slide by d and rotate the unit the other way, so the
     rendered strip is byte-identical. Proven exhaustively by the gate. */
  slideBracket: function (st, d) {
    var next = this._clone(st);
    var k = next.unit.length;
    if (!k) return next;
    var step = Number(d) > 0 ? 1 : (Number(d) < 0 ? -1 : 0);
    if (!step) return next;
    var want = next.phase + step;
    if (want < 0 || want > next.len - k) return next;   /* clamp, no wrap */
    next.phase = want;
    /* rotate left for +1, right for -1 — see the proof in the header */
    var u = next.unit, i, rot = [];
    for (i = 0; i < k; i++) rot.push(u[this._mod(i + step, k)]);
    next.unit = rot;
    return next;
  },

  setUnitLength: function (st, n) {
    var next = this._clone(st), i;
    var v = Math.round(Number(n) || 0);
    if (!(v >= this.UNIT_MIN)) v = this.UNIT_MIN;
    if (v > this.UNIT_MAX) v = this.UNIT_MAX;
    next.unit = next.unit.slice(0, Math.max(0, v));
    for (i = next.unit.length; i < v; i++) next.unit.push(this.SLOTS[this._mod(i, this.SLOTS.length)]);
    /* ⚠ re-normalise against the NEW k, or a length that was mid-unit for
       the old unit becomes a boundary for the new one */
    next.len = this.normLen(v, next.len);
    next.covered = next.covered.filter(function (x) { return x < next.len; });
    if (next.phase > next.len - v) next.phase = Math.max(0, next.len - v);
    return next;
  },

  toggleCover: function (st, i) {
    var next = this._clone(st);
    if (!(i >= 0) || i >= next.len) return next;
    var at = next.covered.indexOf(i);
    if (at > -1) next.covered.splice(at, 1); else next.covered.push(i);
    return next;
  },

  setLen: function (st, n) {
    var next = this._clone(st);
    var v = this.normLen(next.unit.length, n);
    next.len = v;
    /* a bead that no longer exists cannot stay covered */
    next.covered = next.covered.filter(function (i) { return i < v; });
    if (next.phase > next.len - next.unit.length) next.phase = Math.max(0, next.len - next.unit.length);
    return next;
  },

  setMedium: function (st, m) {
    var next = this._clone(st);
    if (this.MEDIA.indexOf(m) === -1) return next;
    next.medium = m;
    return next;
  },

  setArmed: function (st, on) { var next = this._clone(st); next.armed = !!on; return next; },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectPatternBenchCSS();
    document.body.classList.add('ptn-wide');

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this.st = this.newState();
    this._timers = [];
    this._clapTimers = [];
    /* ⚠ INITIALISED HERE AND CLEARED IN reset(). Left as a bare instance
       flag it was one-way: after the first tap hintTap — the only line
       that teaches invention #1 — became unreachable for the rest of the
       mount, and "Start again" did not bring it back. */
    this._everEdited = false;
    this._nudged = false;
    this._fetchEntitlement();
    this.render();
    this._armNudge();
  },

  reset: function () {
    this.st = this.newState();
    this._everEdited = false;
    this._nudged = false;
    this._clearClap();
    this.render();
    this._armNudge();
  },
  onSettings: function () { this._store.settings = this.api.settings; this._saveStore(); this.render(); },

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

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },
  _clearTimers: function () { this._timers.forEach(clearTimeout); this._timers = []; },

  /* ⚠ CLAP OWNS ITS OWN SCHEDULE. clapIt() used to call _clearTimers(),
     which cancels EVERY pending timeout in the tool — so pressing Clap
     within a moment of anything else stranded that thing's cleanup:
     the swelled beads stayed enlarged, the caption stayed on, the
     first-run nudge stayed pressed in, and the paywall notice's own
     12-second self-removal never fired, leaving the upsell on the board
     for the rest of the lesson. A German and a French panel found this
     independently. Clap now clears only clap. */
  _clapAfter: function (ms, fn) { var t = setTimeout(fn, ms); this._clapTimers.push(t); return t; },
  _clearClap: function () { (this._clapTimers || []).forEach(clearTimeout); this._clapTimers = []; },
  _reduced: function () {
    try { return window.matchMedia('(prefers-reduced-motion:reduce)').matches; } catch (_) { return false; }
  },

  /* ⚠ THE FOURTH COSTUME. Clapping the strip is not decoration — hearing
     ABAB after seeing it is the transfer this tool exists for. A covered
     bead is SILENT AND UNLIT, so neither channel leaks what the cloth
     hides.
     ⚠ D15/D16: the pulse was coral (the LOCKED colour) and was deleted
     outright under prefers-reduced-motion, leaving a control that did
     nothing observable at all with sound off. Reduced motion now removes
     the TRANSITION, never the SIGNAL — the swell becomes an instant
     state that still lands and clears. */
  clapIt: function () {
    var self = this, seq = this.sequence(this.st);
    this._clearClap();
    var step = this._reduced() ? 300 : 340;
    seq.forEach(function (slot, i) {
      self._clapAfter(i * step, function () {
        var cell = self._wrap && self._wrap.querySelector('.ptn-cell[data-i="' + i + '"]');
        if (self.isCovered(self.st, i)) return;
        if (cell) { cell.classList.add('ptn-lit'); self._clapAfter(260, function () { cell.classList.remove('ptn-lit'); }); }
        if (!self.api.settings.sound) return;
        try { self.api.sound(self.TONE[slot] || 440); } catch (_) {}
      });
    });
  },

  /* ⭐ THE FIRST-RUN NUDGE. 1200ms after mount with no interaction, the
     bracketed sockets perform ONE slow press-and-release. This is what
     answers "nothing says the beads are tappable" at three metres: the
     class sees the apparatus move before anyone has touched it. Once per
     mount, never repeated, cancelled by the first input, and suppressed
     entirely under reduced motion. It is not a celebration — nothing has
     been achieved — it is the instrument demonstrating its own hinge. */
  _armNudge: function () {
    var self = this;
    if (this._nudged || this._reduced()) return;
    this._after(1200, function () {
      if (self._nudged || !self._wrap) return;
      self._nudged = true;
      var slots = self._wrap.querySelectorAll('.ptn-slot');
      Array.prototype.forEach.call(slots, function (s, i) {
        self._after(i * 90, function () {
          s.classList.add('ptn-nudge');
          self._after(520, function () { s.classList.remove('ptn-nudge'); });
        });
      });
    });
  },
  _stopNudge: function () { this._nudged = true; },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api, self = this;
    /* ⚠ if we learn the account is free while the premium costume is on,
       take it off. Locking the chip is not enough — the STRIP is what the
       class is looking at. */
    if (this.premiumKnown && !this.premium && this.st && this.st.medium === 'picture') {
      this.st = this.setMedium(this.st, 'colour');
    }

    /* focus, half one — ⚠ only ever restores focus that was ALREADY
       inside .ptn-wrap, so it cannot steal focus at boot and cannot yank
       a teacher out of the shell's settings drawer. The shipped tool did
       `stage.innerHTML=''` on every single tap and dropped focus to
       <body> every time. */
    var prev = document.activeElement;
    var fk = (this._wrap && prev && this._wrap.contains(prev)) ? prev.getAttribute('data-fk') : null;
    if (this._focusNext) { fk = this._focusNext; this._focusNext = null; }

    var scrollLeft = 0;
    var oldRail = this._wrap && this._wrap.querySelector('.ptn-rail');
    if (oldRail) scrollLeft = oldRail.scrollLeft;

    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ptn-wrap');
    this._wrap = wrap;

    wrap.appendChild(this._buildBar());

    /* ⭐ D11: THE CAPTION BAND IS ALWAYS IN THE DOM AND ALWAYS OCCUPIES
       ITS HEIGHT. The shipped transfer line was appended into flow on a
       costume change, shoving the entire apparatus down 45px at exactly
       the moment the class was asked to look at it, then vanishing on the
       next render so everything jumped back. There is now no state in
       which the layout can move. */
    var capband = api.el('div', 'ptn-capband');
    var cap = api.el('div', 'ptn-cap');
    cap.setAttribute('aria-live', 'polite');
    cap.textContent = api.t('sameAgain');
    capband.appendChild(cap);
    wrap.appendChild(capband);
    this._cap = cap;

    /* THE BENCH — unit bay above the strip. That is the causal order and
       the sentence the tool wants said: here is the part that repeats,
       and here is what the strip does with it. Strip-first asserts the
       opposite. */
    var bench = api.el('div', 'ptn-bench');
    bench.appendChild(this._buildUnit());
    bench.appendChild(api.el('div', 'ptn-rule'));
    bench.appendChild(this._buildTrack());
    wrap.appendChild(bench);

    var hint = api.el('div', 'ptn-hint');
    hint.textContent = api.t(this.st.armed ? 'coverNote'
      : (this._everEdited ? 'hintSlide' : 'hintTap'));
    wrap.appendChild(hint);

    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);

    /* the sheet lives OUTSIDE the wrap: print hides .ptn-wrap entirely
       and a sheet inside it would inherit that */
    this._ensureSheet(api.stage);

    var rail = wrap.querySelector('.ptn-rail');
    if (rail) {
      rail.scrollLeft = scrollLeft;
      this._wireRail(rail);
    }

    if (fk) {
      var el = wrap.querySelector('[data-fk="' + fk.replace(/"/g, '\\"') + '"]');
      if (el) { try { el.focus(); } catch (_) {} }
    }
    void self;
  },

  _say: function (msg) { try { this.api.announce(msg); } catch (_) {} },

  _flashCap: function () {
    var self = this;
    if (!this._cap) return;
    this._cap.classList.add('ptn-say');
    /* ⚠ motion-off must never mean information-off: with the dissolve
       gone the caption is the only carrier, so it holds longer. */
    this._after(this._reduced() ? 6000 : 4200, function () {
      if (self._cap) self._cap.classList.remove('ptn-say');
    });
  },

  _chip: function (label, on, fn, extra, fk) {
    var b = this.api.el('button', 'ptn-chip' + (on ? ' ptn-on' : '') + (extra ? ' ' + extra : ''));
    b.type = 'button';
    b.textContent = label;
    if (fk) b.setAttribute('data-fk', fk);
    b.addEventListener('click', fn);
    return b;
  },

  _buildBar: function () {
    var api = this.api, self = this;
    var bar = api.el('div', 'ptn-bar');

    /* ⭐ D7: the costumes are a JOINED SEGMENT, the actions are separate
       round pills. The shipped bar drew both from one component with a
       hairline between them — and the hairline was `display:none` below
       420px, so the grouping vanished exactly where it mattered most. Two
       different SHAPES cannot be un-grouped by a media query. */
    var seg = api.el('div', 'ptn-seg');
    seg.setAttribute('role', 'radiogroup');
    seg.setAttribute('aria-label', api.t('stripLabel'));
    var LAB = { colour: 'mColour', shape: 'mShape', picture: 'mPicture' };
    this.MEDIA.forEach(function (m) {
      /* ⚠ NO `&& premiumKnown`. With it, the unknown state read as
         UNLOCKED, so during the auth fetch a free account could switch to
         the premium costume — and when the answer came back free the chip
         locked but st.medium stayed 'picture'. Unknown is pessimistic. */
      var locked = (m === 'picture' && !self.premium);
      var on = self.st.medium === m;
      var b = api.el('button', 'ptn-segbtn' + (on ? ' ptn-on' : '') + (locked ? ' ptn-locked' : ''));
      b.type = 'button';
      b.textContent = api.t(LAB[m]);
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(on));
      b.setAttribute('data-fk', 'medium:' + m);
      b.addEventListener('click', function () {
        self._stopNudge();
        if (locked) { self._gateInline(bar, 'gatePicture'); return; }
        var was = self.st.medium;
        self.st = self.setMedium(self.st, m);
        self._focusNext = 'medium:' + m;
        self.render();
        /* ⭐ THE TRANSFER MOMENT. The whole thesis is that the pattern
           survived the costume change; saying so at the instant it
           happens is what turns a colour swap into a maths idea. It is a
           statement about the STRIP, never about the child. */
        if (was !== m) { self._dissolve(); self._flashCap(); }
      });
      seg.appendChild(b);
    });
    bar.appendChild(seg);

    var acts = api.el('div', 'ptn-acts');
    acts.appendChild(this._chip(api.t('clapIt'), false, function () {
      self._stopNudge(); self.clapIt();
    }, '', 'clap'));

    /* the cloth: a ONE-SHOT arm. A sticky mode on a projector is the
       classic invisible-state defect ("why is everything getting
       covered?"); a teacher covering three beads presses three times,
       which is the correct cost. Uncovering always works unarmed, so a
       child can never get stuck and undo needs no mode. */
    acts.appendChild(this._chip(api.t('coverBtn'), this.st.armed, function () {
      self._stopNudge();
      self.st = self.setArmed(self.st, !self.st.armed);
      self._focusNext = 'cloth';
      self.render();
    }, '', 'cloth'));

    /* "one more repeat", not "N more beads" — see normLen */
    if (this.repsOf(this.st) < this.maxReps(this.st.unit.length)) {
      acts.appendChild(this._chip(api.t('longerStrip'), false, function () {
        self._stopNudge();
        self.st = self.setLen(self.st, self.st.len + self.st.unit.length);
        self._focusNext = 'longer';
        self.render();
      }, '', 'longer'));
    }
    bar.appendChild(acts);
    return bar;
  },

  /* ---------------- the strip ---------------- */
  _buildTrack: function () {
    var api = this.api, self = this;
    var track = api.el('div', 'ptn-track');

    var rail = api.el('div', 'ptn-rail');
    rail.setAttribute('role', 'group');
    rail.setAttribute('aria-label', api.t('stripLabel'));
    rail.style.setProperty('--ptn-n', String(this.st.len));

    var grid = api.el('div', 'ptn-grid');

    var strip = api.el('div', 'ptn-strip');
    var i;
    for (i = 0; i < this.st.len; i++) strip.appendChild(this._buildCell(i));
    grid.appendChild(strip);

    /* ⭐⭐ HIDING THE UNIT MUST HIDE EVERYTHING THAT MEASURES IT, and both
       leaks below were found by native panels reading the model rather
       than by any gate of mine.
       (a) THE BRACKET SPANS EXACTLY k COLUMNS. Left drawn while the unit
           is hidden, its WIDTH hands the class the length of the thing
           they have just been asked to work out — the apparatus answering
           half the question in the same frame the label asks it.
       (b) THE LETTER ROW WRITES THE ANSWER OUT. `Say it in letters` is a
           description of the strip and perfectly fine beside a visible
           unit; under a hidden one it prints A B A B A B A directly
           below, which is the whole answer in notation.
       "Hide it and ask what repeats" is the tool's closing move and the
       one its landing copy calls the question worth their time. It has to
       actually be hidden. */


    /* ⭐ THE BRACKET IS A GRID ITEM, NOT AN ARITHMETIC OFFSET. Its left
       edge equals bead `phase`'s left edge BY CONSTRUCTION. #43 cold-line
       computed pixel offsets against a box it had letterboxed and drew
       every mark twice.
       ⚠ AND IT IS APPENDED BEFORE THE LETTER ROW, deliberately: a
       bracket whose edges ARE the claim must touch the beads it claims.
       With the letter row between them it was making its claim across a
       gap — a French panel caught that by reading the append order. */
    if (!this.st.unitHidden) grid.appendChild(this._buildBracket());

    if (api.settings.letters && !this.st.unitHidden) grid.appendChild(this._buildLetters());

    rail.appendChild(grid);
    track.appendChild(rail);

    /* the scroll thumb — the projector cue. Rendered only when there is
       something to scroll to; sized to the visible fraction. */
    var thumb = api.el('div', 'ptn-thumb');
    var bar = api.el('i');
    thumb.appendChild(bar);
    track.appendChild(thumb);
    void self;
    return track;
  },

  _buildCell: function (idx) {
    var api = this.api, self = this;
    var slot = this.cellAt(this.st, idx);
    var cell = api.el('button', 'ptn-cell');
    cell.type = 'button';
    cell.setAttribute('data-i', String(idx));
    cell.setAttribute('data-fk', 'cell:' + idx);

    /* ⚠ A COVERED BEAD LEAVES THE DOM. Not hidden with CSS, not dimmed —
       the cloth must not be readable by anyone, including a screen
       reader and including view-source. */
    if (this.isCovered(this.st, idx)) {
      cell.classList.add('ptn-covered');
      /* ⚠ A COVERED CELL IS A PRESSED TOGGLE, NOT AN INSTRUCTION. It was
         named with coverNote ("Tap a bead to cover it…") while tapping it
         UNCOVERS — the accessible name stated the opposite of the effect
         and never said the bead was covered at all. One string cannot be
         an instruction, a confirmation and a state name at once. */
      cell.setAttribute('aria-label', api.t('coverBtn'));
      cell.setAttribute('aria-pressed', 'true');
    } else {
      cell.appendChild(this._bead(slot));
      cell.setAttribute('aria-label', String(slot).toUpperCase());
    }

    /* ⭐ THE CLASS RINGS BEFORE IT COMMITS — see invention #1. Without
       this first beat the child reads "the beads are magically linked"
       instead of "they are all copies of one bead". */
    var ring = function () { self._ringClass(idx); };
    var unring = function () { self._ringClass(null); };
    cell.addEventListener('pointerdown', ring);
    cell.addEventListener('pointerup', unring);
    cell.addEventListener('pointerleave', unring);
    cell.addEventListener('pointercancel', unring);
    cell.addEventListener('mouseenter', ring);
    cell.addEventListener('mouseleave', unring);
    cell.addEventListener('focus', ring);
    cell.addEventListener('blur', unring);

    cell.addEventListener('click', function () { self._tapCell(idx); });
    cell.addEventListener('keydown', function (e) { self._cellKey(e, idx); });
    return cell;
  },

  /* the family highlight — drawn on the CELL, never on the glyph */
  _ringClass: function (i) {
    if (!this._wrap) return;
    var was = this._wrap.querySelectorAll('.ptn-sib');
    Array.prototype.forEach.call(was, function (n) { n.classList.remove('ptn-sib'); });
    if (i === null || i === undefined) return;
    var self = this;
    this.classOf(this.st, i).forEach(function (j) {
      var c = self._wrap.querySelector('.ptn-cell[data-i="' + j + '"]');
      if (c) c.classList.add('ptn-sib');
    });
    var si = this.slotIndexAt(this.st, i);
    var s = si > -1 && this._wrap.querySelector('.ptn-slot[data-si="' + si + '"]');
    if (s) s.classList.add('ptn-sib');
  },

  _tapCell: function (idx) {
    this._stopNudge();
    /* ⚠ AN ARMED TAP ON AN ALREADY-COVERED BEAD USED TO UNCOVER IT AND
       SPEND THE ARM — the teacher pressed "Cover a bead", hit a covered
       one, and got the opposite action with no signal that the arm was
       gone. The cloth now stays armed until it actually covers something. */
    if (this.st.armed && !this.isCovered(this.st, idx)) {
      this.st = this.toggleCover(this.st, idx);
      this.st = this.setArmed(this.st, false);   /* one-shot */
      this._focusNext = 'cell:' + idx;
      this.render();
      this._say(this.api.t('coverNote'));
      return;
    }
    if (this.isCovered(this.st, idx)) {
      /* uncovering always works, armed or not — a child can never get
         stuck, and undo needs no mode */
      this.st = this.toggleCover(this.st, idx);
      this._focusNext = 'cell:' + idx;
      this.render();
      return;
    }
    var fam = this.classOf(this.st, idx);
    this.st = this.cycleSlotAt(this.st, idx);
    this._everEdited = true;
    this._focusNext = 'cell:' + idx;
    this.render();
    this._swell(fam, idx);
    var slot = this.cellAt(this.st, idx);
    /* ⚠ THE SLOT LETTER ONLY. This announced `A — 4`, an unlocalised
       literal ending in a BARE NUMBER; to a screen-reader user in any of
       the ten non-English locales that is either meaningless or a score,
       and this tool's refuse-list forbids counting anything. */
    this._say(String(slot).toUpperCase());
    if (this.api.settings.sound) { try { this.api.sound(this.TONE[slot] || 440); } catch (_) {} }
  },

  /* ⭐ ONE TAP CHANGED SIX BEADS, AND THE EYE MUST SEE THE FAMILY.
     A 6% swell, monotonic, no overshoot, rippling outward from the tapped
     bead in 18ms steps. Synchrony under ~350ms reads as ONE event — the
     eye cannot count seven separate things in a third of a second, so it
     reads a family rather than a list.
     ⚠ WHAT IS FORBIDDEN HERE: a highlight ring (a ring around six things
     is a checkmark), a stagger long enough to COUNT them for the class, a
     tone per bead (the tap was one action, so the tone fires once), and
     any colour change other than the fill that is the whole point.
     ⚠ 6% and not 15%: a celebration is a big overshoot with a settle.
     This is a breath — at the threshold of "something happened here" and
     well below "well done". */
  _swell: function (fam, from) {
    var self = this;
    if (!this._wrap) return;
    var reduced = this._reduced();
    fam.forEach(function (j) {
      var c = self._wrap.querySelector('.ptn-cell[data-i="' + j + '"]');
      if (!c) return;
      var delay = reduced ? 0 : Math.abs(j - from) * 18;
      self._after(delay, function () {
        c.classList.add('ptn-swell');
        self._after(260, function () { c.classList.remove('ptn-swell'); });
      });
    });
    var si = this.slotIndexAt(this.st, from);
    var s = si > -1 && this._wrap.querySelector('.ptn-slot[data-si="' + si + '"]');
    if (s) {
      s.classList.add('ptn-swell');
      this._after(260, function () { s.classList.remove('ptn-swell'); });
    }
  },

  /* the costume change: a staggered cross-dissolve IN PLACE.
     ⚠ NEVER A MORPH. A morph asserts that a disc BECAME a leaf — that one
     thing turned into another. The thesis is the exact opposite: the
     letter never changed, only its drawing did. A dissolve in a fixed box
     says same object, different surface. The unit dissolves first and the
     strip follows, because that 120ms is the whole meaning — the unit
     changed its clothes and the strip did what it always does. */
  /* ⚠⚠ THIS FUNCTION SHIPPED BLANKING THE WHOLE APPARATUS, AND TWO
     NATIVE PANELS FOUND IT BY READING THE MODEL. The first version ADDED
     `.ptn-fade { opacity: 0 }` to every glyph and nothing anywhere
     removed it — grep returned two adds and one CSS rule, no remove — so
     pressing Shapes faded the bench to nothing and left it there.
     Measured before the fix: 9 of 9 glyphs at opacity 0, still 0 after
     4.4 seconds.
     ⚠ AND MY OWN local-test PASSED IT. L2 compared the beads' `fill` and
     `d` ATTRIBUTES, which are perfectly present on an invisible node — a
     gate that reads the wrong property certifies. It now measures
     computed opacity, and the sweep asserts nothing is invisible at rest.
     Since render() rebuilds the DOM, a true cross-dissolve of old over
     new is not available without keeping both; the honest equivalent is
     to bring the NEW costume up from zero, staggered, in a box that has
     not moved. NOTHING MOVING is the message — the letter never changed,
     only its drawing did — and that survives intact. */
  _dissolve: function () {
    var self = this;
    if (!this._wrap || this._reduced()) return;
    var start = function (g, delay) {
      g.classList.add('ptn-fade');
      self._after(delay, function () { g.classList.remove('ptn-fade'); });
    };
    /* the unit lands first; the strip follows, because that order is the
       whole sentence: the part that repeats changed its clothes, and the
       strip did what it always does */
    Array.prototype.forEach.call(this._wrap.querySelectorAll('.ptn-slot .ptn-glyph'),
      function (g) { start(g, 30); });
    Array.prototype.forEach.call(this._wrap.querySelectorAll('.ptn-cell .ptn-glyph'),
      function (g, i) { start(g, 150 + i * 26); });
  },

  _cellKey: function (e, idx) {
    var k = e.key, n = null;
    if (k === 'ArrowRight') n = idx + 1;
    else if (k === 'ArrowLeft') n = idx - 1;
    else if (k === 'Home') n = 0;
    else if (k === 'End') n = this.st.len - 1;
    else if (k === 'Escape' && this.st.armed) {
      e.preventDefault();
      this.st = this.setArmed(this.st, false);
      this._focusNext = 'cell:' + idx;
      this.render();
      return;
    } else return;
    e.preventDefault();
    if (n < 0 || n >= this.st.len) return;
    var t = this._wrap && this._wrap.querySelector('.ptn-cell[data-i="' + n + '"]');
    if (t) {
      try { t.focus(); } catch (_) {}
      /* a keyboard user must never be able to drive the object off-screen */
      try { t.scrollIntoView({ inline: 'nearest', block: 'nearest' }); } catch (_) {}
    }
  },

  /* the pattern written out — a DESCRIPTION of the strip, never a mark
     on anybody's work */
  _buildLetters: function () {
    var api = this.api, self = this;
    var row = api.el('div', 'ptn-letters');
    this.sequence(this.st).forEach(function (slot, i) {
      var s = api.el('span', 'ptn-letter');
      s.textContent = self.isCovered(self.st, i) ? '·' : String(slot).toUpperCase();
      row.appendChild(s);
    });
    return row;
  },

  /* ⭐ THE BRACKET. Spans the unit on the strip, and its grips slide it.
     ⚠ THE GRIPS ARE REAL BUTTONS, ≥44px, so click AND Enter/Space both
     act with no custom code. A drag-only handle is dead to a keyboard, to
     assistive tech, and to the liveness gate — a synthetic .click() never
     fires pointerdown (#41 scored DEAD on all nine paths for exactly
     this). Pointer-drag is never the only path here; there isn't one. */
  _buildBracket: function () {
    var api = this.api, self = this;
    var k = this.st.unit.length;
    var b = api.el('div', 'ptn-bracket');
    b.style.setProperty('--ptn-col', String(this.st.phase + 1));
    b.style.setProperty('--ptn-k', String(k));

    var mk = function (dir, key) {
      var g = api.el('button', 'ptn-grip ptn-grip-' + (dir < 0 ? 'l' : 'r'));
      g.type = 'button';
      g.setAttribute('aria-label', api.t(key));
      g.setAttribute('data-fk', 'grip:' + dir);
      var can = dir < 0 ? self.st.phase > 0 : self.st.phase < self.st.len - k;
      if (!can) g.disabled = true;
      g.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' +
        (dir < 0 ? 'M15 5 8 12l7 7' : 'M9 5l7 7-7 7') +
        '" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      g.addEventListener('click', function () {
        self._stopNudge();
        var before = self.sequence(self.st).join('');
        self.st = self.slideBracket(self.st, dir);
        self._focusNext = 'grip:' + dir;
        self.render();
        /* the whole point, said out loud for the screen reader too */
        /* ⚠ NAME THE READING THAT CHANGED, NOT ONLY THE ONE THAT DID NOT.
           This announced hintSlide alone — "the strip stays exactly the
           same" — so a screen-reader user was told nothing happened and
           never learned the unit had rotated, which IS invention #2. Three
           panels flagged it. The unit's new reading is spoken first.
           ⚠ The old `if (sequence === before)` guard was also vacuous: the
           theorem guarantees byte-identity, so the condition could not be
           false and tested nothing. */
        self._say(self.st.unit.join('').toUpperCase() + '. ' + api.t('hintSlide'));
        void before;
      });
      return g;
    };

    /* ⚠ THE GRIPS OVERHANG, THEY DO NOT SHARE THE SPAN. In flow they were
       two 44px buttons inside a 2-bead span of ~93px, so the bracket body
       — the thing whose EDGES ARE THE CLAIM — was squeezed to a 5px
       sliver and the whole object read as two stray buttons under the
       strip. The span must stay exactly the unit's width or it is lying,
       so the grips are positioned outside it and the rail carries enough
       side padding that neither one is ever clipped. */
    var body = api.el('div', 'ptn-brbody');
    b.append(body, mk(-1, 'slideLeft'), mk(1, 'slideRight'));
    return b;
  },

  /* ---------------- the unit bay ---------------- */
  _buildUnit: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'ptn-unitbox');

    var head = api.el('div', 'ptn-unithead');
    var lab = api.el('div', 'ptn-lab');
    lab.textContent = api.t(this.st.unitHidden ? 'hiddenUnitNote' : 'unitLabel');
    var toggle = this._chip(api.t(this.st.unitHidden ? 'showUnit' : 'hideUnit'),
      this.st.unitHidden, function () {
        self._stopNudge();
        self.st = self._clone(self.st);
        self.st.unitHidden = !self.st.unitHidden;
        self._focusNext = 'hide';
        self.render();
      }, 'ptn-mini', 'hide');
    head.append(lab, toggle);
    box.appendChild(head);

    if (this.st.unitHidden) {
      box.classList.add('ptn-unit-hidden');
      return box;
    }

    var row = api.el('div', 'ptn-unit');
    row.setAttribute('data-n', String(this.st.unit.length));
    this.st.unit.forEach(function (slot, i) {
      /* the strip index this socket owns, so a tap here is the same
         reducer a tap on the strip runs — one code path, one meaning */
      var stripIdx = self._mod(i + self.st.phase, self.st.len);
      var b = api.el('button', 'ptn-slot');
      b.type = 'button';
      b.setAttribute('data-si', String(i));
      b.setAttribute('data-fk', 'slot:' + i);
      b.setAttribute('aria-label', String(slot).toUpperCase());
      b.appendChild(self._bead(slot));

      /* ⭐ THE CYCLE IS PRINTED ON THE SOCKET — four dots, the current
         one filled. Four dots say "there are four of these"; the filled
         one stepping right on each tap says "tapping moves along". No
         words, and it is a selector indicator like a carousel's, never a
         progress bar — it does not animate as a fill and never
         accumulates, which is what keeps it clear of the no-score rule.
         ⚠ In the colour costume each dot carries its own slot colour, so
         it doubles as a permanent wordless legend at zero layout cost. */
      var dots = api.el('div', 'ptn-dots');
      self.SLOTS.forEach(function (s2) {
        var d = api.el('i', 'ptn-dot' + (s2 === slot ? ' on' : ''));
        if (self.st.medium === 'colour') d.style.color = self.COLOUR[s2].fill;
        dots.appendChild(d);
      });
      b.appendChild(dots);

      var ring = function () { self._ringClass(stripIdx); };
      var unring = function () { self._ringClass(null); };
      b.addEventListener('pointerdown', ring);
      b.addEventListener('pointerup', unring);
      b.addEventListener('pointerleave', unring);
      b.addEventListener('mouseenter', ring);
      b.addEventListener('mouseleave', unring);
      b.addEventListener('focus', ring);
      b.addEventListener('blur', unring);

      b.addEventListener('click', function () {
        self._stopNudge();
        var fam = self.classOf(self.st, stripIdx);
        var at = self.SLOTS.indexOf(slot);
        var nx = self.SLOTS[self._mod(at + 1, self.SLOTS.length)];
        self.st = self.setUnitSlot(self.st, i, nx);
        self._everEdited = true;
        self._focusNext = 'slot:' + i;
        self.render();
        self._swell(fam, fam.length ? fam[0] : 0);
        self._say(String(nx).toUpperCase());
        if (self.api.settings.sound) { try { self.api.sound(self.TONE[nx] || 440); } catch (_) {} }
      });
      row.appendChild(b);
    });
    box.appendChild(row);

    var lens = api.el('div', 'ptn-lens');
    var ll = api.el('span', 'ptn-lab');
    ll.textContent = api.t('unitLen');
    lens.appendChild(ll);
    var stepper = api.el('div', 'ptn-len');
    [1, 2, 3, 4].forEach(function (n) {
      var b = api.el('button', 'ptn-lenbtn' + (self.st.unit.length === n ? ' ptn-on' : ''));
      b.type = 'button';
      b.textContent = String(n);
      b.setAttribute('data-fk', 'len:' + n);
      b.setAttribute('aria-pressed', String(self.st.unit.length === n));
      b.addEventListener('click', function () {
        self._stopNudge();
        self.st = self.setUnitLength(self.st, n);
        self._focusNext = 'len:' + n;
        self.render();
      });
      stepper.appendChild(b);
    });
    lens.appendChild(stepper);
    box.appendChild(lens);
    return box;
  },

  /* =================================================================
     THE COSTUME — and it is only ever a drawing of a letter.
     ONE MATERIAL RULE: every bead in every costume is a flat vector in a
     40x40 box: SOLID FILL + one shared keyline + one shared specular.
     Nothing is ever outline-only; nothing is ever a rendered photo. The
     specular is the load-bearing part — it is what makes a brick disc, a
     teal star and a green leaf read as three objects turned from the same
     varnished stock, and it is strongest exactly where the keyline is
     weakest (on the dark grape and the deep plum fills).
     ⚠ stroke-width is in USER UNITS, never px, and there is no
     `vector-effect` anywhere: sorting-hoops:2342 records a .55 stroke
     resolving to a sub-pixel hairline at every viewport because of it.
     ================================================================= */
  _svg: function () {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('class', 'ptn-glyph');
    s.setAttribute('viewBox', '0 0 40 40');
    s.setAttribute('aria-hidden', 'true');
    return s;
  },
  _path: function (d, attrs) {
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) p.setAttribute(k, attrs[k]);
    return p;
  },

  _bead: function (slot) {
    var svg = this._svg();
    var KEY = this.KEYLINE, W = 2.8;
    if (this.st.medium === 'colour') {
      svg.appendChild(this._path(this.SHAPE.a, {
        fill: this.COLOUR[slot].fill, stroke: KEY, 'stroke-width': W, 'stroke-linejoin': 'round'
      }));
      svg.appendChild(this._path(this.SHAPE_SPEC.a, {
        fill: 'none', stroke: this.SPEC, 'stroke-width': 2.2, 'stroke-linecap': 'round'
      }));
    } else if (this.st.medium === 'shape') {
      svg.appendChild(this._path(this.SHAPE[slot], {
        fill: this.SHAPE_INK, stroke: KEY, 'stroke-width': W, 'stroke-linejoin': 'round'
      }));
      svg.appendChild(this._path(this.SHAPE_SPEC[slot], {
        fill: 'none', stroke: this.SPEC, 'stroke-width': 2.2, 'stroke-linecap': 'round'
      }));
    } else {
      var P = this.PICTURE[slot], self = this;
      P.parts.forEach(function (part) {
        if (part.stroke) {
          svg.appendChild(self._path(part.d, {
            fill: 'none', stroke: part.stroke, 'stroke-width': part.w,
            'stroke-linecap': 'round', 'stroke-linejoin': 'round'
          }));
        } else {
          svg.appendChild(self._path(part.d, part.nokey
            ? { fill: part.fill }
            : { fill: part.fill, stroke: KEY, 'stroke-width': W, 'stroke-linejoin': 'round' }));
        }
      });
      svg.appendChild(this._path(P.spec, {
        fill: 'none', stroke: this.SPEC, 'stroke-width': 2.2, 'stroke-linecap': 'round'
      }));
    }
    return svg;
  },

  /* =================================================================
     THE RAIL — D9. The shipped strip was sliced mid-bead at 360 with
     ZERO affordance: overflow-x:auto draws no scrollbar on touch, there
     was no fade, no end-cap and no snap, and 265px of the strip — five
     beads — were simply unreachable.
     Four mechanisms; three are pure CSS (the shadows are the canonical
     background-attachment local/scroll trick, so they exist only when
     there IS content off that edge). This wires the fourth: a thumb sized
     to the visible fraction, which is the cue a teacher at the back of
     the room can actually see, plus a one-shot peek on mount.
     ================================================================= */
  _wireRail: function (rail) {
    var self = this;
    var track = rail.parentNode;
    var thumb = track && track.querySelector('.ptn-thumb');
    if (!thumb) return;
    var bar = thumb.querySelector('i');
    var sync = function () {
      var vis = rail.clientWidth, all = rail.scrollWidth;
      if (all <= vis + 2) { thumb.classList.remove('ptn-on'); return; }
      thumb.classList.add('ptn-on');
      var f = Math.max(0.08, vis / all);
      bar.style.width = (f * 100).toFixed(2) + '%';
      var max = all - vis;
      bar.style.left = (max > 0 ? (rail.scrollLeft / max) * (100 - f * 100) : 0).toFixed(2) + '%';
    };
    rail.addEventListener('scroll', sync);
    /* ⚠ ONE OBSERVER FOR THE TOOL'S LIFETIME, DISCONNECTED BEFORE EACH
       RE-ATTACH. render() runs on every single tap, and the first version
       constructed a fresh ResizeObserver each time and never disconnected
       any of them — each one holding its callback closure over a detached
       rail. An Italian panel found it by reading the render path. */
    try {
      if (this._railRO) this._railRO.disconnect();
      this._railRO = new ResizeObserver(sync);
      this._railRO.observe(rail);
    } catch (_) {}
    sync();
    this._after(60, sync);

    if (!this._peeked && !this._reduced()) {
      this._peeked = true;
      this._after(700, function () {
        if (rail.scrollWidth <= rail.clientWidth + 2) return;
        try {
          rail.scrollTo({ left: 26, behavior: 'smooth' });
          self._after(420, function () { rail.scrollTo({ left: 0, behavior: 'smooth' }); });
        } catch (_) {}
      });
    }
  },

  /* =================================================================
     THE PRINT SHEET — D4/D5.
     ⚠ THE PAYWALL WAS BYPASSED BY Ctrl+P. The chip was gated; the
     @media print block was unconditional and the strip was always in the
     DOM, so an anonymous visitor pressing Ctrl+P got the paid output.
     Gating the CHIP is not gating the FEATURE, and that defect has now
     shipped three times in this house. The sheet is only in the DOM when
     the account carries it, AND every print rule is scoped body.ptn-paid.
     ⚠ AND IT IS A SHEET, NOT A RESTYLE. What printed before was the LIVE
     DOM — including a .ptn-rail with overflow-x:auto, so a scrolled strip
     printed CUT OFF, silently.
     ⚠ LINE ART ONLY, NO GREYS. Chrome ships "Background graphics" OFF for
     a great many teachers, so anything carried by background-color
     photocopies blank; and four greys photocopy to two. The colour
     costume therefore prints as four HATCHES with a key, which is also an
     ~88% ink saving against a filled disc.
     ================================================================= */
  _ensureSheet: function (host) {
    var old = document.getElementById('ptn-printsheet');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    document.body.classList.toggle('ptn-paid', !!this.premium);
    if (!this.premium) return;

    var api = this.api, self = this;
    var sheet = api.el('div', 'ptn-printsheet');
    sheet.id = 'ptn-printsheet';

    var head = api.el('div', 'ptn-phead');
    var h = api.el('div', 'ptn-ptitle');
    h.textContent = api.t('title');
    var nameRule = api.el('div', 'ptn-pname');
    head.append(h, nameRule);
    /* the hatch key — the same four hatches every time, so a class can
       build a shared key */
    if (this.st.medium === 'colour') {
      var key = api.el('div', 'ptn-pkey');
      var kl = api.el('span');
      kl.textContent = api.t('printKey');
      key.appendChild(kl);
      this.SLOTS.forEach(function (s) {
        var w = api.el('span', 'ptn-pkeyitem');
        w.appendChild(self._printBead(s));
        var t = api.el('b');
        t.textContent = s.toUpperCase();
        w.appendChild(t);
        key.appendChild(w);
      });
      head.appendChild(key);
    }
    sheet.appendChild(head);

    /* the unit, printed once, in a labelled bay */
    var ub = api.el('div', 'ptn-pbay');
    var ul = api.el('div', 'ptn-plab');
    ul.textContent = api.t('unitLabel');
    ub.appendChild(ul);
    var urow = api.el('div', 'ptn-punit');
    this.st.unit.forEach(function (s) {
      var c = api.el('div', 'ptn-pcell');
      c.appendChild(self._printBead(s));
      urow.appendChild(c);
    });
    ub.appendChild(urow);
    sheet.appendChild(ub);

    /* the strip — wrapped at a MULTIPLE OF THE UNIT LENGTH so every
       printed row starts on the same letter. Paper is a different object
       from the screen (the on-screen strip never wraps), and a teacher
       gets a gift out of the difference. */
    var sl = api.el('div', 'ptn-plab');
    sl.textContent = api.t('stripLabel');
    sheet.appendChild(sl);
    var k = this.st.unit.length;
    var per = Math.max(k, Math.floor(12 / k) * k);
    var row = null, i;
    for (i = 0; i < this.st.len; i++) {
      if (i % per === 0) { row = api.el('div', 'ptn-prow'); sheet.appendChild(row); }
      var c = api.el('div', 'ptn-pcell');
      if (this.isCovered(this.st, i)) c.classList.add('ptn-pcover');
      else c.appendChild(this._printBead(this.cellAt(this.st, i)));
      row.appendChild(c);
      /* the letter, but only if the class has already met the notation */
      if (api.settings.letters) {
        var lt = api.el('b', 'ptn-plet');
        lt.textContent = this.isCovered(this.st, i) ? '' : String(this.cellAt(this.st, i)).toUpperCase();
        c.appendChild(lt);
      }
    }

    /* ⭐ the blank continuation run — the one element that makes the sheet
       a TASK rather than a screenshot of the board. */
    var cl = api.el('div', 'ptn-plab');
    cl.textContent = api.t('printCarryOn');
    sheet.appendChild(cl);
    var crow = api.el('div', 'ptn-prow');
    for (i = 0; i < per; i++) crow.appendChild(api.el('div', 'ptn-pcell ptn-pblank'));
    sheet.appendChild(crow);

    var pv = api.el('div', 'ptn-pfoot');
    pv.textContent = api.t('privacyLine');
    sheet.appendChild(pv);

    host.appendChild(sheet);
  },

  /* a bead for paper: 1pt black line art, hatched when the costume is
     colour (four greys photocopy to two; four hatches do not) */
  _printBead: function (slot) {
    var svg = this._svg();
    svg.setAttribute('class', 'ptn-pglyph');
    if (this.st.medium === 'colour') {
      svg.appendChild(this._path(this.SHAPE.a, {
        fill: 'url(#ptnHatch-' + slot + ')', stroke: '#000', 'stroke-width': 2.2
      }));
    } else if (this.st.medium === 'shape') {
      svg.appendChild(this._path(this.SHAPE[slot], { fill: 'none', stroke: '#000', 'stroke-width': 2.2, 'stroke-linejoin': 'round' }));
    } else {
      /* ⚠ THE PICTURE COSTUME PRINTS AS THE SHAPE COSTUME, AND THAT IS A
         DELIBERATE SUBSTITUTION. Stripped of their fills the picture
         glyphs stop being pictures: the butterfly is four overlapping
         discs and a bar, and as fill:none outlines it prints as a tangle
         of intersecting arcs — an Italian panel called it out as the PAID
         costume printing worst of the three. Keeping the fills is not the
         answer either (a solid field photocopies as a smear and burns the
         ink this sheet is designed to save). The shape glyphs carry the
         same four slots in the same order, so the pattern on paper is the
         pattern on screen; only its clothes change, which is the one
         substitution this tool is entitled to make. */
      svg.appendChild(this._path(this.SHAPE[slot], { fill: 'none', stroke: '#000', 'stroke-width': 2.2, 'stroke-linejoin': 'round' }));
    }
    return svg;
  },

  _buildFoot: function () {
    var api = this.api, self = this;
    var foot = api.el('div', 'ptn-foot');
    foot.appendChild(this._chip(api.t('clear'), false, function () { self.reset(); }, '', 'clear'));
    var pr = this._chip(api.t('printBtn'), false, function () {
      if (!self.premium) { self._gateInline(foot, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    }, this.premium ? '' : 'ptn-locked', 'print');
    foot.appendChild(pr);
    var pv = api.el('div', 'ptn-privacy');
    pv.textContent = api.t('privacyLine');
    foot.appendChild(pv);
    return foot;
  },

  _gateInline: function (host, key) {
    var api = this.api;
    if (!host || !this._wrap) return;
    var old = this._wrap.querySelector('.ptn-gate');
    if (old) old.remove();
    var g = api.el('div', 'ptn-gate');
    var s = api.el('span');
    s.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-pattern-bench';
    a.target = '_top'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(s, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  }
};

function injectPatternBenchCSS() {
  if (document.getElementById('ptn-style')) return;
  var T = PatternBench, C = T.COLOUR;
  var st = document.createElement('style');
  st.id = 'ptn-style';
  st.textContent = ''
    /* =================================================================
       ⭐ THE SIZE CHAIN HANGS OFF ONE VARIABLE, AND THAT IS D8'S FIX.
       The shipped unit socket was clamp(52px,9vw,64px) against a strip
       bead that reached 104px at 2560 — the protagonist of the tool was
       0.62x its own consequence, and the smallest object on the bench.
       --ptn-cap drives BOTH the rail width and the socket size, so the
       socket is ~2x the bead at every width BY CONSTRUCTION, and making
       the strip longer shrinks only the beads and never the unit.
       ================================================================= */
    + ':root{--ptn-cap:680px;}'
    /* ⚠ THE SOCKET IS SIZED FROM THE CARD, NOT FROM THE VIEWPORT, AND
       THAT DISTINCTION IS A MEASURED BUG NOT A REFINEMENT. The first cut
       derived --ptn-u from --ptn-cap, which is keyed on viewport width —
       but the CARD is sized by the shell, whose own tiers start at 1367.
       Measured at 1366: cap 1180 -> socket 186px inside a card that was
       still 720px wide, against a 56px bead. Ratio 3.33, not the ~2 the
       design claims, and the socket ate a quarter of the bench.
       A container query asks the only question that matters — how wide is
       the thing this actually sits in.
       ⚠ `cqw` inside an element that declares its OWN container-type
       resolves against THAT element, so the container is declared on the
       wrap and consumed by its descendants, never on the bench itself. */
    + '.ptn-wrap{container-type:inline-size;'
    +   '--ptn-u:clamp(76px,min(calc((100vw - 84px) * .158),calc(var(--ptn-cap) * .158)),280px);'
    +   '--ptn-t:clamp(14px,calc(var(--ptn-u) * .13),22px);'
    /* ⭐ THE BEAD IS HALF THE SOCKET, BY CONSTRUCTION. Not a coincidence
       of available width — a declared relationship, so the unit is the
       larger object at every viewport and every strip length. Left as
       `1fr` the beads simply ate the room: with a 7-bead default they
       measured 227px at 2560 against a 277px socket (ratio 1.22), which
       undoes the whole point of making the unit the protagonist. The
       grid's max track IS the ratio. */
    +   '--ptn-bead:calc(var(--ptn-u) * .5);'
    +   'display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1vw,14px);width:100%;}'
    + '@supports (width:1cqw){.ptn-wrap{--ptn-u:clamp(76px,15.8cqw,280px);}}'

    /* --- the bar: a joined segment + separate round pills (D7) --- */
    + '.ptn-bar{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;}'
    + '.ptn-seg{display:flex;flex-wrap:wrap;gap:0;border-radius:999px;'
    +   'border:1.5px solid rgba(42,42,53,.24);background:#FFFDF7;overflow:hidden;}'
    + '.ptn-segbtn{min-height:44px;padding:8px 16px;border:0;background:transparent;'
    +   'color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;font-weight:600;cursor:pointer;}'
    + '.ptn-segbtn+.ptn-segbtn{box-shadow:inset 1.5px 0 0 rgba(42,42,53,.16);}'
    + '.ptn-segbtn:hover{background:#F3EADA;}'
    + '.ptn-segbtn.ptn-on{background:#146B5E;color:#FFFDF7;}'
    + '.ptn-acts{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;}'
    /* the raised plinth — the shell's own .lcs-ctrl vocabulary, carried by
       every control in the product. Copy the pattern, import nothing. */
    + '.ptn-chip{min-height:44px;padding:9px 15px;border-radius:999px;border:1.5px solid rgba(42,42,53,.26);'
    +   'background:#FFFDF7;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;font-weight:600;'
    +   'cursor:pointer;box-shadow:0 3px 0 rgba(20,30,28,.10),0 4px 10px rgba(20,30,28,.08);'
    +   'transition:transform .12s ease,box-shadow .12s;}'
    + '.ptn-chip:hover{background:#F3EADA;transform:translateY(-2px);'
    +   'box-shadow:0 5px 0 rgba(20,30,28,.10),0 8px 14px rgba(20,30,28,.10);}'
    + '.ptn-chip:active{transform:translateY(1px);box-shadow:0 1px 0 rgba(20,30,28,.10);}'
    + '.ptn-chip.ptn-on{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'
    /* ⚠ 44px, NOT 38. The first cut shrank this one to fit the unit head
       and the sweep caught it at every viewport: a K-2 control below the
       tap floor is a defect wherever it sits, and "it is only the Hide
       chip" is not an argument a six-year-old's finger accepts. */
    + '.ptn-chip.ptn-mini{min-height:44px;padding:6px 14px;font-size:14px;}'
    /* ⚠ D21: the locked LABEL was #C2562F on cream = 4.42:1, an AA fail.
       Only the BORDER and the keyhole stay coral (a UI edge needs 3:1);
       the label is teal at 6.26:1. lids.js:2019 records the same ruling. */
    + '.ptn-locked{border-color:rgba(194,86,47,.6);}'
    + '.ptn-locked::after{content:"";display:inline-block;width:9px;height:9px;margin-left:7px;'
    +   'border-radius:50%;border:2.5px solid #C2562F;vertical-align:-1px;}'

    /* --- the caption band: ALWAYS present, never injected (D11) --- */
    + '.ptn-capband{min-height:2.0em;display:flex;align-items:center;justify-content:center;'
    +   'width:100%;flex-shrink:0;}'
    + '.ptn-cap{opacity:0;transition:opacity .22s linear;'
    +   'font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-weight:600;'
    +   'font-size:clamp(16px,calc(var(--ptn-u) * .115),24px);'
    /* was #3C7C72 = 4.01:1, an AA fail (D20) */
    +   'color:#146B5E;background:rgba(20,107,94,.08);border-radius:999px;padding:5px 18px;}'
    + '.ptn-cap.ptn-say{opacity:1;}'

    /* --- THE BENCH: one opaque slab, so the apparatus is ONE object and
       the whitespace has something to be around. Opaque because the
       shell lays two radial gradients under it, and a translucent slab
       reads as a stain on a projector. Not dashed: dashed already means
       ghost-slot or locked in this codebase. --- */
    + '.ptn-bench{width:min(100%,var(--ptn-cap));border-radius:22px;'
    +   'padding:clamp(12px,1.6vw,26px);display:flex;flex-direction:column;'
    +   'gap:clamp(10px,1.1vw,20px);background-color:#FDF8EE;'
    +   'background-image:radial-gradient(120% 70% at 50% -12%,rgba(255,255,255,.55) 0,rgba(255,255,255,0) 34%),'
    +     'radial-gradient(112% 128% at 50% 44%,rgba(214,193,155,0) 0,rgba(214,193,155,0) 56%,'
    +     'rgba(214,193,155,.16) 82%,rgba(176,148,102,.22) 100%);'
    +   'border:2px solid rgba(42,42,53,.2);'
    +   'box-shadow:inset 0 0 0 1px rgba(255,255,255,.6),inset 0 3px 7px -3px rgba(93,72,45,.24),'
    +     '0 1px 0 rgba(255,255,255,.85);}'
    + '.ptn-rule{height:1px;background:rgba(42,42,53,.14);width:100%;}'

    /* --- the unit bay: sockets, not cards --- */
    + '.ptn-unitbox{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,.8vw,12px);}'
    + '.ptn-unithead{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;}'
    + '.ptn-lab{font-family:Nunito,system-ui,sans-serif;font-size:var(--ptn-t);color:#146B5E;'
    +   'font-weight:600;text-align:center;}'
    + '.ptn-unit{display:flex;gap:clamp(6px,.7vw,12px);justify-content:center;flex-wrap:wrap;}'
    /* ⭐ A RECESS, NOT A RAISED TILE. A recess with something seated in it
       says "this is swappable" in a way no border can, and it is a
       different KIND of object from the flat strip bead — never a
       different hue, because a hue difference between two comparable
       things reads as a verdict to a six-year-old. */
    + '.ptn-slot{position:relative;width:var(--ptn-u);height:var(--ptn-u);'
    +   'padding:calc(var(--ptn-u) * .11) calc(var(--ptn-u) * .11) calc(var(--ptn-u) * .19);'
    +   'border:0;border-radius:calc(var(--ptn-u) * .22);background-color:#F4EBD9;'
    +   'background-image:radial-gradient(ellipse calc(var(--ptn-u) * .13) calc(var(--ptn-u) * .05) at 50% 100%,'
    +     'rgba(93,72,45,.20) 0,rgba(93,72,45,0) 100%);'
    +   'box-shadow:inset 0 3px 6px -2px rgba(93,72,45,.30),inset 0 -1px 0 rgba(255,255,255,.92),'
    +     '0 1px 0 rgba(255,255,255,.85);'
    +   'cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;'
    +   'display:flex;align-items:center;justify-content:center;}'
    + '.ptn-slot:active{box-shadow:inset 0 4px 9px -2px rgba(93,72,45,.40);}'
    + '.ptn-slot:active .ptn-glyph{transform:scale(.94);}'
    + '.ptn-slot .ptn-glyph{width:100%;height:100%;transition:transform .12s ease;'
    +   'filter:drop-shadow(0 1px 1px rgba(58,32,14,.28));}'
    + '.ptn-dots{position:absolute;left:50%;bottom:calc(var(--ptn-u) * .055);'
    +   'transform:translateX(-50%);display:flex;gap:calc(var(--ptn-u) * .05);}'
    + '.ptn-dot{width:calc(var(--ptn-u) * .066);aspect-ratio:1;border-radius:50%;'
    +   'border:1.2px solid rgba(51,41,30,.42);background:transparent;color:#33291E;}'
    + '.ptn-dot.on{background:currentColor;border-color:rgba(51,41,30,.85);}'
    + '.ptn-lens{display:flex;gap:9px;align-items:center;flex-wrap:wrap;justify-content:center;}'
    + '.ptn-len{display:flex;border-radius:999px;overflow:hidden;border:1.5px solid rgba(42,42,53,.24);background:#FFFDF7;}'
    + '.ptn-lenbtn{min-width:44px;min-height:44px;border:0;background:transparent;cursor:pointer;'
    +   'font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:16px;font-weight:700;color:#146B5E;}'
    + '.ptn-lenbtn+.ptn-lenbtn{box-shadow:inset 1.5px 0 0 rgba(42,42,53,.16);}'
    + '.ptn-lenbtn.ptn-on{background:#146B5E;color:#FFFDF7;}'
    + '.ptn-unit-hidden .ptn-lab{font-family:"Baloo 2",Nunito,system-ui,sans-serif;'
    +   'font-size:clamp(16px,calc(var(--ptn-u) * .16),26px);}'

    /* --- THE RAIL (D9): fades that exist only when there IS content off
       that edge (the background-attachment local/scroll trick), round
       end-caps so a complete strip LOOKS complete, snap, and a thumb. --- */
    + '.ptn-track{width:100%;display:flex;flex-direction:column;gap:6px;align-items:center;}'
    /* ⚠ 30px of side padding is LOAD-BEARING, not taste: the bracket's
       grips overhang its span by 23px each way, and at phase 0 (or at the
       far right) a narrower gutter clips the grip against the scroller. */
    + '.ptn-rail{width:100%;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x proximity;'
    +   'padding:10px;border-radius:26px;border:2px solid rgba(42,42,53,.18);'
    +   'background:'
    +     'linear-gradient(90deg,#FFFDF7 34%,rgba(255,253,247,0)) left/30px 100% no-repeat local,'
    +     'linear-gradient(90deg,rgba(255,253,247,0),#FFFDF7 66%) right/30px 100% no-repeat local,'
    +     'radial-gradient(farthest-side at 0 50%,rgba(93,72,45,.30),rgba(93,72,45,0)) left/17px 100% no-repeat scroll,'
    +     'radial-gradient(farthest-side at 100% 50%,rgba(93,72,45,.30),rgba(93,72,45,0)) right/17px 100% no-repeat scroll,'
    +     '#FFFDF7;'
    +   'scrollbar-width:none;}'
    + '.ptn-rail::-webkit-scrollbar{height:0;}'
    /* ⚠ margin:0 auto on the CHILD, never justify-content:center on the
       scroller — centring an overflow scroller puts its start out of
       reach. Recorded house trap. */
    /* ⚠ width:max-content + margin:0 auto, and NEVER justify-content on
       the scroller. When the strip is shorter than the rail this centres
       it; when it is longer, max-content exceeds the box, `auto` margins
       resolve to 0 and it left-aligns — so bead 0 is always reachable.
       Centring the scroller's own content instead puts the start of the
       strip permanently out of reach, which is the recorded house trap. */
    + '.ptn-grid{display:grid;grid-auto-rows:auto;width:max-content;margin:0 auto;padding:0 46px;'
    +   'grid-template-columns:repeat(var(--ptn-n,7),minmax(44px,var(--ptn-bead)));column-gap:5px;row-gap:6px;}'
    + '.ptn-strip,.ptn-letters{display:grid;grid-column:1 / -1;'
    +   'grid-template-columns:subgrid;}'
    /* subgrid is not everywhere yet: the fallback repeats the same track
       list, which is identical because both live in the same --ptn-n */
    + '@supports not (grid-template-columns:subgrid){'
    +   '.ptn-strip,.ptn-letters{grid-template-columns:repeat(var(--ptn-n,7),minmax(44px,var(--ptn-bead)));column-gap:5px;}}'
    /* ⚠ NO min-height BESIDE aspect-ratio:1 — the two fight, and the
       height wins: a 44px-wide cell measured 56x56 and pushed the whole
       rail taller than the beads in it. The 44px floor lives in the grid
       track, where it belongs, and the rail scrolls rather than shrinking
       below the K-2 tap minimum. */
    + '.ptn-cell{aspect-ratio:1;min-width:44px;padding:0;border:0;background:none;'
    +   'cursor:pointer;font:inherit;display:flex;align-items:center;justify-content:center;'
    +   'scroll-snap-align:center;touch-action:manipulation;-webkit-tap-highlight-color:transparent;'
    +   'border-radius:12px;position:relative;}'
    + '.ptn-cell .ptn-glyph{width:100%;height:100%;display:block;'
    +   'transition:transform .24s cubic-bezier(.34,.9,.4,1),opacity .26s cubic-bezier(.4,0,.6,1);'
    +   'filter:drop-shadow(0 1px 1px rgba(58,32,14,.22));}'
    + '.ptn-cell.ptn-covered{background:repeating-linear-gradient(45deg,#C9BBA4,#C9BBA4 6px,#BFAF95 6px,#BFAF95 12px);'
    +   'border:2px solid #7A6A52;}'
    /* the family ring — on the CELL, never on the glyph: #2A2A35 is
       13.94:1 on cream but only 2.01:1 on the brick fill */
    + '.ptn-cell.ptn-sib,.ptn-slot.ptn-sib{box-shadow:inset 0 0 0 2.5px ' + T.RING + ';}'
    + '.ptn-slot.ptn-sib{box-shadow:inset 0 0 0 2.5px ' + T.RING + ',inset 0 3px 6px -2px rgba(93,72,45,.30);}'
    + '.ptn-cell.ptn-swell .ptn-glyph,.ptn-slot.ptn-swell .ptn-glyph{transform:scale(1.06);}'
    + '.ptn-cell.ptn-lit .ptn-glyph{transform:scale(1.10);}'
    + '.ptn-glyph.ptn-fade{opacity:0;}'
    + '.ptn-slot.ptn-nudge{box-shadow:inset 0 5px 10px -2px rgba(93,72,45,.44);}'
    + '.ptn-slot.ptn-nudge .ptn-glyph{transform:scale(.93);}'
    /* focus: NOT the shell blue (--lcs-focus is literally a blue and would
       alias to the sky slot), NOT teal (dE 20.7 from sky under tritanopia) */
    + '.ptn-cell:focus-visible,.ptn-slot:focus-visible,.ptn-chip:focus-visible,'
    +   '.ptn-segbtn:focus-visible,.ptn-lenbtn:focus-visible,.ptn-grip:focus-visible,'
    +   '.ptn-gate a:focus-visible{outline:3px solid ' + T.RING + ';outline-offset:3px;}'
    + '.ptn-letter{text-align:center;font-family:"Baloo 2",Nunito,system-ui,sans-serif;'
    +   'font-size:clamp(17px,calc(var(--ptn-u) * .19),40px);font-weight:600;color:#146B5E;}'

    /* --- THE BRACKET: a grid item spanning the unit --- */
    + '.ptn-bracket{grid-column:var(--ptn-col) / span var(--ptn-k);grid-row:auto;'
    +   'position:relative;min-height:46px;border:0;}'
    /* the body IS the claim: its two edges are exactly the unit's edges,
       because it is a grid item spanning the unit's own columns */
    + '.ptn-brbody{position:absolute;left:0;right:0;top:0;height:18px;'
    +   'border:3px solid ' + T.RING + ';border-top:0;border-radius:0 0 11px 11px;'
    +   'background:linear-gradient(180deg,rgba(42,42,53,.07),rgba(42,42,53,0) 70%);}'
    + '.ptn-grip{position:absolute;top:-13px;width:44px;height:44px;border-radius:12px;'
    +   'border:1.5px solid rgba(42,42,53,.26);background:#FFFDF7;color:' + T.RING + ';'
    +   'cursor:pointer;display:flex;align-items:center;justify-content:center;'
    +   'box-shadow:0 2px 0 rgba(20,30,28,.10);touch-action:manipulation;z-index:2;}'
    /* ⚠ THE GRIPS CLEAR THE BODY, THEY DO NOT STRADDLE IT. At -23px they
       overlapped 21px of each end of a 112px bracket, so two big white
       buttons hid the very edges that ARE the claim and the whole object
       read as a slider track. -46 puts each grip exactly outside its end.
       The room for them lives in the GRID's padding, not the rail's, so
       it travels with the columns: centred when the strip is short,
       left-aligned when it overflows, and never clipped either way. */
    + '.ptn-grip-l{left:-46px;}'
    + '.ptn-grip-r{right:-46px;}'
    + '.ptn-grip svg{width:22px;height:22px;}'
    + '.ptn-grip:hover{background:#F3EADA;}'
    + '.ptn-grip:disabled{opacity:.28;cursor:default;box-shadow:none;}'

    /* --- the thumb: the cue a teacher at the back of the room sees --- */
    + '.ptn-thumb{width:min(100%,220px);height:5px;border-radius:999px;'
    +   'background:rgba(20,107,94,.14);position:relative;opacity:0;transition:opacity .2s;}'
    + '.ptn-thumb.ptn-on{opacity:1;}'
    + '.ptn-thumb i{position:absolute;top:0;bottom:0;border-radius:999px;background:#146B5E;}'

    /* --- text --- */
    + '.ptn-hint{font-family:Nunito,system-ui,sans-serif;'
    +   'font-size:clamp(14px,calc(var(--ptn-u) * .10),20px);color:#5D5A52;text-align:center;'
    +   'min-height:2.4em;display:flex;align-items:center;justify-content:center;padding:0 8px;}'
    + '.ptn-foot{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;align-items:center;}'
    + '.ptn-privacy{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#5D5A52;'
    +   'text-align:center;width:100%;}'
    + '.ptn-gate{display:flex;align-items:center;gap:9px;flex-wrap:wrap;justify-content:center;'
    +   'padding:8px 12px;border-radius:12px;background:rgba(242,120,75,.1);'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#8A4A2E;}'
    + '.ptn-gate a{color:#8A4A2E;font-weight:700;}'

    /* =================================================================
       ⭐ D1/D3: BREAK THE PERCENTAGE CHAIN, UNCONDITIONALLY.
       lcs-shell.css:54 sets html,body{height:100%} and :63 sets
       .lcs-app{height:100%;overflow:hidden}. .lcs-app.activity{height:auto}
       is the only escape and a free-play manipulative never gets it — so
       .lcs-app's height IS the iframe's height, the shell's
       ResizeObserver measures that same box (lcs-shell.js:949) and posts
       it to the parent, and the loop's fixed point is whatever the iframe
       started at. Every desktop rendered this tool at phone size.
       ⚠ THE SHIPPED ESCAPE WAS @media (max-width:700px) AND THE
       PRODUCTION EMBED MEASURES ~704px — it missed by FOUR PIXELS.
       A width is the wrong key. Unconditional, exactly as sorting-hoops.
       ================================================================= */
    + 'html,body.ptn-wide{overflow-y:auto;height:auto;min-height:100%;}'
    + 'body.ptn-wide{overflow-x:hidden;}'

    /* =================================================================
       WIDE VIEWPORTS — KEYED ON WIDTH ALONE.
       ⚠ The shipped tiers were (min-width:1367) and (min-height:880/1080/
       1150). min-height inside an iframe resolves against the IFRAME's
       viewport, which was 422px, so ALL THREE WERE DEAD CODE. And 1366x768
       and 1600x900 — the two commonest classroom projectors — fail an
       880px height test even standalone.
       ================================================================= */
    + '@media (min-width:900px){body.ptn-wide{--ptn-cap:860px;}}'
    + '@media (min-width:1280px){body.ptn-wide{--ptn-cap:1180px;}}'
    + '@media (min-width:1900px){body.ptn-wide{--ptn-cap:1740px;}}'
    /* four sockets must never overrun a narrow phone */
    + '@media (max-width:480px){.ptn-unit[data-n="4"]{--ptn-u:min(76px,calc((100vw - 108px) / 4));}}'
    + '@media (max-width:420px){.ptn-chip,.ptn-segbtn{padding:8px 12px;font-size:14px;}'
    +   '.ptn-bar{gap:7px;}}'

    /* ⚠ reduced motion removes the TRANSITION, never the SIGNAL. The
       shipped rule deleted the clap's only feedback outright, so with
       sound off the control did nothing observable at all (D16). */
    + '@media (prefers-reduced-motion:reduce){'
    +   '.ptn-cell .ptn-glyph,.ptn-slot .ptn-glyph,.ptn-chip{transition:none !important;}'
    +   '.ptn-rail{scroll-behavior:auto;}'
    +   '.ptn-thumb i{background:rgba(20,107,94,.55);}'
    + '}'

    /* =================================================================
       PRINT — scoped body.ptn-paid, so Ctrl+P by a free visitor gets
       nothing (the sheet is not even in the DOM). Line art, no fills.
       ================================================================= */
    + '.ptn-printsheet{display:none;}'
    + '@media print{'
    +   '.ptn-wrap{display:none !important;}'
    /* the shell chrome sits OUTSIDE this tool's wrapper and would
       otherwise print the settings/mute/fullscreen/reset buttons */
    +   '.lcs-header,.lcs-controls,.lcs-instruction{display:none !important;}'
    +   'body.ptn-paid .ptn-printsheet{display:block !important;font-family:Nunito,system-ui,sans-serif;color:#000;}'
    +   'body.ptn-paid .ptn-phead{display:flex;align-items:flex-end;gap:8mm;'
    +     'border-bottom:.8pt solid #000;padding-bottom:2mm;margin-bottom:6mm;}'
    +   'body.ptn-paid .ptn-ptitle{font-weight:700;font-size:11pt;}'
    +   'body.ptn-paid .ptn-pname{flex:1;border-bottom:.6pt solid #000;height:5mm;max-width:52mm;}'
    +   'body.ptn-paid .ptn-pkey{display:flex;align-items:center;gap:3mm;font-size:8pt;}'
    +   'body.ptn-paid .ptn-pkeyitem{display:flex;align-items:center;gap:1mm;}'
    +   'body.ptn-paid .ptn-pkeyitem .ptn-pglyph{width:6mm;height:6mm;}'
    +   'body.ptn-paid .ptn-plab{font-size:9pt;font-weight:700;margin:4mm 0 1.5mm;}'
    +   'body.ptn-paid .ptn-pbay{border:.6pt solid #000;border-radius:2mm;padding:3mm;'
    +     'display:inline-block;break-inside:avoid;page-break-inside:avoid;}'
    +   'body.ptn-paid .ptn-punit,body.ptn-paid .ptn-prow{display:flex;gap:2mm;'
    +     'break-inside:avoid;page-break-inside:avoid;margin-bottom:2mm;}'
    +   'body.ptn-paid .ptn-pcell{width:13mm;height:13mm;border:.6pt solid #000;border-radius:1.5mm;'
    +     'display:flex;align-items:center;justify-content:center;position:relative;}'
    +   'body.ptn-paid .ptn-pcell .ptn-pglyph{width:11mm;height:11mm;}'
    +   'body.ptn-paid .ptn-pcover{border-style:dashed;border-width:.8pt;}'
    +   'body.ptn-paid .ptn-pblank{border-style:solid;}'
    +   'body.ptn-paid .ptn-plet{position:absolute;bottom:-5.5mm;left:0;right:0;text-align:center;font-size:8pt;}'
    +   'body.ptn-paid .ptn-pfoot{margin-top:8mm;font-size:8pt;}'
    +   '@page{size:A4 portrait;margin:14mm 12mm;}'
    + '}';
  document.head.appendChild(st);

  /* the four print hatches — four greys photocopy to two; four hatches
     do not. userSpaceOnUse so the period never becomes a size cue. */
  var NS = 'http://www.w3.org/2000/svg';
  var defs = document.createElementNS(NS, 'svg');
  defs.setAttribute('width', '0'); defs.setAttribute('height', '0');
  defs.setAttribute('aria-hidden', 'true');
  defs.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
  var d = document.createElementNS(NS, 'defs');
  var HATCH = {
    a: [['rect', { width: 6, height: 1.6 }]],
    b: [['rect', { width: 1.6, height: 6 }]],
    c: [['rect', { width: 6, height: 1.4, transform: 'rotate(45 3 3)' }], ['rect', { width: 1.4, height: 6, transform: 'rotate(45 3 3)' }]],
    d: [['circle', { cx: 3, cy: 3, r: 1.1 }]]
  };
  Object.keys(HATCH).forEach(function (k) {
    var p = document.createElementNS(NS, 'pattern');
    p.setAttribute('id', 'ptnHatch-' + k);
    p.setAttribute('width', '6'); p.setAttribute('height', '6');
    p.setAttribute('patternUnits', 'userSpaceOnUse');
    HATCH[k].forEach(function (m) {
      var e = document.createElementNS(NS, m[0]);
      for (var a in m[1]) if (Object.prototype.hasOwnProperty.call(m[1], a)) e.setAttribute(a, m[1][a]);
      e.setAttribute('fill', '#000');
      p.appendChild(e);
    });
    d.appendChild(p);
  });
  defs.appendChild(d);
  document.body.appendChild(defs);
  void C;
}
