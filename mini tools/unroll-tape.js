/* =====================================================================
   TOOL #41 — ALL THE WAY ROUND   (unroll-tape.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, catalog slot B4, wave 2, the measurement
   spine.

   ⭐⭐ REBUILT 2026-08-06 after the operator reported "I could not set
   the flag, it was not possible to drag on my screen." Three expert
   panels (interaction, K-3 pedagogy, art direction) and a full
   measurement pass. What that report actually was, MEASURED:

     · THE FLAG WAS INVISIBLE. On the tool's own page the bench renders
       660px wide, so one model unit is 0.66px and the 30-unit pennant
       drew UNDER 20px — behind an 18px OPAQUE TEAL DOT that covered the
       pole and half the cloth, at 45% opacity, which is the universal
       *disabled* signal. Three identical dots sat on the bench (size,
       strand tip, flag) and the hint said "Drag the flag" while no flag
       was legible anywhere. There was nothing to grab.
     · THE DRAG DESTROYED ITS OWN EVENT TARGET. Every pointermove ran
       `render()`, which did `stage.innerHTML = ''` — removing the
       element that was mid-pointerdown, with no pointer capture. On
       touch and pen the gesture ended after the first move.
     · NO GATE IN ELEVEN SCRIPTS EVER TOUCHED THE FLAG WITH A POINTER.
       Every `.urt-flag` assertion was `!!querySelector`; the flag was
       only ever moved by calling `setFlag` inside `page.evaluate`. The
       three DOM paths written FOR it (pointerdown tap, click, keydown)
       each carried a comment saying a liveness gate had reported them
       dead, and not one was driven by any test. That is why it shipped.

   ⚠ AND EVERY WIDE TIER THIS TOOL SHIPPED WAS DEAD ON ITS OWN PAGE.
   The tool page pins the iframe at 704px (`article.mx-auto.max-w-3xl`
   + `md:px-8`) at 1440, 1920 and 2560 alike. Media queries inside an
   iframe resolve against the IFRAME viewport, and all three tiers were
   keyed `(min-width:1367px) and (min-height:880px)` or higher — so none
   could ever match, `body.urt-wide` did nothing, and the bench stayed
   660px on every desktop a teacher owns. It went unseen because both QA
   renders were taken STANDALONE, where the tiers do fire. Now the
   ladder starts BELOW 704 and carries no min-height term.
   ⚠ MEASURED, NOT ASSUMED: the iframe HEIGHT is fine here (427px,
   content-driven). The recorded 422px pin belongs to tools that bind
   `#lcs-root{height:100%}`; this one never did, so no height escape is
   shipped. Verifying that was the difference between a real fix and a
   cargo-cult one.

   THE SHAPE · THE STRAND · THE RUNWAY. Three named parts, and nothing
   else in this tool gets a noun. (It is THE STRAND, never "the tape" —
   #40 owns "THE TAPES".)

   THE ROUTINE:
     "How far is it all the way round? Guess — plant a flag."
      ... up to three flags, from three children, so the disagreement is
      visible and nothing on screen can ever settle it ...
     "Now let it lie down."

   THE ONE THESIS — THE WAY AROUND CAN LIE DOWN STRAIGHT, AND HOW MANY
   TIMES THE SHAPE'S OWN WIDTH FITS ALONG IT DOES NOT CHANGE WHEN THE
   SHAPE DOES. Grow the plate and everything grows with it — outline,
   strand, ticks, and the RECORD MARK — and the strand's end stays glued
   to the same mark the whole way. Its exact relationship to its sibling:
   IN #40 THE OBJECT HELD STILL AND THE NUMBER MOVED; HERE EVERYTHING
   MOVES AND THE NUMBER HOLDS STILL.

   FOUR INVENTIONS:
     1. ⭐ THE UNROLLING. A curved length becoming a straight one is the
        one abstraction in early measurement with no static
        representation. You can do it with real string, which is exactly
        why it never gets done twice.
     2. THE SHAPE'S OWN WIDTH IS THE UNIT. No centimetre, no paperclip —
        the tick step IS the across, so a circle reads three-and-a-bit at
        every size, and a Reuleaux triangle reads the same 3.14 while
        looking nothing like a circle (Barbier's theorem, measured here
        to 2e-12).
     3. LENGTH IS CONSERVED BY CONSTRUCTION, NOT BY ANIMATION. The strand
        occupies guide-arclength [L·t, L·t+L] on one fixed guide, so its
        total is L at every frame. Nothing appears; nothing disappears.
     4. ⭐ THE RECORD. Where each shape's strand landed stays on the
        runway as a mark under a miniature of that shape — every
        miniature normalised to the SAME WIDTH, which silently restates
        the thesis each time one is drawn. Measured across the book, two
        pairs land in the same place: `circle == reuleaux` at 3.1416
        (Barbier, a theorem) and `flower == eye` at 5.386 (deliberate —
        `gen-unroll-tape-shapes.js:258` ties the flower to the eye). Both
        used to be invisible unless a six-year-old remembered where the
        last strand stopped. A mark is not a verdict: it is the residue
        of the child's own action, left where they put it.

   ⚠ THE FENCE — FOUR SURFACES, AND IT CAME BACK **NOT CLEAN**.
   Per §23.3 the overlap is SUBTRACTED, not negotiated:
     TAKEN — `mending-fences-core.js` owns CCSS 3.MD.D.8, "perimeter, the
       distance AROUND". But it is RECTILINEAR ONLY: `:66 perimeterOf` is
       `boundaryEdges(mask)` over a polyomino grid, or `2*(w+h)`. Its
       "roll of fence" is a TEXT PILL PRINTING A NUMBER (`.mf-rope`,
       `activity:417`), never a physical strand.
       → SO THIS TOOL NEVER WRAPS A POLYGON. Curves only. Gated.
     REMAINDER, measured virgin — ZERO `getPointAtLength` in the repo;
       no tool sums polyline segments for display; no unroll, no bendable
       strand, no circumference.
     ASSET — there is NO outline, contour or SVG path for ANY object in
       this repo, so the boundary is ANALYTIC. That removes the catalog's
       flagged authoring cost AND kills a modelling lie: a tape round a
       real cup measures its circular cross-section, not its side-view
       silhouette.

   ⚠ THE CATALOG'S B4 GATE SPEC DOES NOT SURVIVE CONTACT, TWICE:
     "within 0.00px" is arithmetically impossible — an inscribed polyline
       is STRICTLY shorter than its curve (chord ≤ arc is a theorem).
     "unchanged under all 360 integer rotations" is true of the arc
       LENGTH and FALSE of the RATIO. `across` is bbox width.
       → THERE IS NO ROTATION CONTROL, and each shape's orientation is
       fixed in the book.

   ⚠ TWO PANEL PROPOSALS WERE REJECTED BECAUSE THE CODE REFUTES THEM.
   The pedagogy panel correctly found that the `pebble` ellipse stood on
   its end is q=2.5071 while the shipped `eye` is q=2.3, and proposed
   retuning so the pair is one curve in two orientations. The arithmetic
   is right (measured: length ratio 2.507145). It is still refused:
   the retuned eye reads R=5.7664, and a 5-lobe rosette tops out at
   5.7339 (`gen-unroll-tape-shapes.js:213` RANGE `[3.149, 5.735]`), so
   `solveFor` would throw — and the flower is DELIBERATELY solved to the
   eye's R (`:258 ⭐ = eye`), so the retune would also delete a designed
   coincidence. The shape book is unchanged; only its ORDER moved.

   REFUSES, FOREVER — each one gated:
     1. NEVER WRAPS A POLYGON (see the fence).
     2. NEVER PRINTS THE TOTAL. No "3.14", no count. The only numerals on
        the stage are the runway's ticks and the caliper's single 1.
     3. NEVER SAYS WHICH IS LONGER. No code path reads a flag and the
        strand end, or two marks, together.
     4. THE STRAND IS NEVER A RULER — a fixed fine weave, never tiled,
        never marked in acrosses. #40 owns "how many units fit".
     5. NOTHING 3-D, NOTHING TRACED. Flat plates, analytic outlines.
     6. NO AREA, EVER. `mending-fences` owns around-vs-fill and B5 The
        Reshape owns area/perimeter decoupling.
     7. NO ROTATION CONTROL (see above).
     8. ⭐ NO MARK IS EVER LEFT AT A GUESS. A permanent mark at a flag
        position is a permanent record of a child being wrong, which is a
        verdict wearing a different hat. Flags vanish with their shape;
        only LANDINGS are recorded.
     And standing: no verdict, no score, no timer, no streak, no speech.

   0 lines to lcs-shell.{js,css} or any protected core.
   ===================================================================== */

(function () {
  'use strict';

  var TAU = Math.PI * 2;

  var UnrollTape = {
    id: 'unroll-tape',

    /* ---------------------------------------------------------------
       STRINGS — GENERATED. EN is authored; the other ten are REBUILT (not
       translated) by a three-person NATIVE panel per locale, §A.13.48.
       ⚠ DO NOT HAND-EDIT A LOCALE HERE. The source of truth is
       scripts/_unroll-tape-strings.js; scripts/apply-unroll-tape-locales.js
       rewrites this whole block from it.

       ⚠ AND NO STRING MAY NAME A UNIT. Not centimetre, not inch, not
       paperclip. `ruler.js` owns standard units (2.MD.A.1) and the
       no-words law forbids the label anyway — the shape's own width IS
       the unit, and the only numeral that says so is the 1 on the jaw.
       --------------------------------------------------------------- */
    strings: {
      title:         { en: "All the Way Round", de: "Einmal rundherum", fr: "Le tour de la forme", es: "La vuelta a la figura", pt: "Em Volta da Figura", it: "Tutto il giro della figura", nl: "Helemaal rondom", sv: "Hela vägen runt", da: "Tråden om figuren", no: "Hele veien rundt", fi: "Ympäri ja suoraksi" },
      instruction:   { en: "A strand goes all the way round the shape. Let it lie down straight on the runway and see how far it reaches. Every step along the runway is the shape's own width.", de: "Eine Schnur liegt einmal rundherum um die Form. Lass sie sich gerade auf die Leiste legen und schau, wie weit sie reicht. Jeder Schritt auf der Leiste ist genau so breit wie die Form.", fr: "Une ficelle fait tout le tour de la forme. Laissez-la se coucher bien droite dans le couloir, puis regardez jusqu’où elle va. Dans le couloir, chaque pas est large comme la forme.", es: "Un cordón le da toda la vuelta al borde de la figura. Deja que se acueste recto en la franja y mira hasta dónde llega. Cada paso de la franja es el ancho de la propia figura.", pt: "Um barbante dá a volta inteira na figura. Deixe o barbante deitar reto na trilha e veja até onde ele chega. Cada passo da trilha tem a largura da própria figura.", it: "Uno spago fa tutto il giro della figura. Lasciatelo stendere dritto sulla pista e guardate fin dove arriva. Ogni passo della pista è largo quanto la figura.", nl: "Om de vorm heen ligt een touwtje. Laat het recht op de weg gaan liggen en kijk hoe ver het komt. Elke stap op de weg is precies zo breed als de vorm zelf.", sv: "Ett snöre går hela vägen runt figuren. Låt det lägga sig rakt på spåret och se hur långt det räcker. Varje steg längs spåret är figurens egen bredd.", da: "En tråd går hele vejen rundt om figuren. Lad den lægge sig lige ned på banen, og se, hvor langt den når. Hvert trin på banen er figurens egen bredde.", no: "En hyssing går hele veien rundt figuren. La den legge seg rett ned på sporet, og se hvor langt den rekker. Hvert steg bortover sporet er figurens egen bredde.", fi: "Naru kulkee koko matkan kuvion ympäri. Anna sen asettua suoraksi kaistalle ja katso, kuinka pitkälle se yltää. Jokainen askel kaistalla on kuvion oma leveys." },
      benchLabel:    { en: "A shape standing on a runway ruled in the shape's own width. A strand goes all the way round the shape, a dashed line up the middle of the shape shows how tall it is, flags can be put on the runway to mark the guesses, and under the runway a row of marks shows how far each shape's strand reached.", de: "Eine Form steht auf einer Leiste, die in der Breite der Form eingeteilt ist, um die Form liegt eine Schnur, Fähnchen zeigen die Schätzungen, ein Balken neben der Form zeigt ihre Höhe, und darunter stehen die Zeichen, wo die Schnur bei den anderen Formen angekommen ist", fr: "Une forme entourée d’une ficelle, posée sur un couloir dont chaque pas est large comme la forme. À côté de la forme, une barre montre sa hauteur. On plante des drapeaux dans le couloir pour dire jusqu’où la ficelle ira, et un repère y reste pour chaque forme déjà couchée.", es: "Una figura de pie sobre una franja dividida en pasos del ancho de la propia figura. Un cordón le da toda la vuelta a la figura, unas banderitas marcan las estimaciones y, al lado, una barra muestra lo alta que es la figura.", pt: "Uma figura em pé sobre uma trilha marcada com a largura da própria figura. Um barbante dá a volta inteira na figura, ao lado dela uma barra mostra a altura da figura, bandeirinhas marcam os palpites e marquinhas na trilha mostram até onde o barbante de cada figura chegou.", it: "Una figura appoggiata su una pista divisa in passi larghi quanto la figura. Uno spago fa tutto il giro della figura, le bandierine segnano le stime e accanto alla figura una misura ne mostra l’altezza.", nl: "Een vorm staat op een weg, en die weg is verdeeld in stappen die precies zo breed zijn als de vorm. Om de vorm heen ligt een touwtje, ernaast staat een balkje dat laat zien hoe hoog de vorm is, en op de weg zet je vlaggetjes om te raden waar het touwtje komt.", sv: "En figur som står på ett spår indelat i figurens egen bredd, ett snöre hela vägen runt figuren, en stapel bredvid figuren som visar hur hög den är, flaggor för gissningarna, och små märken där tidigare figurers snören nådde", da: "En figur med en tråd hele vejen rundt om sig, en bane der er inddelt i figurens egen bredde, en bjælke der viser, hvor høj figuren er, et flag til gættet, og mærker efter de figurer, I allerede har prøvet.", no: "En figur står på et spor som er delt inn i figurens egen bredde. En hyssing går hele veien rundt figuren, flagg viser gjettingene, en stolpe ved siden av figuren viser hvor høy den er, og under sporet står merkene som viser hvor hyssingen rakk for hver figur.", fi: "Kuvio seisoo kaistalla, joka on jaettu kuvion levyisiin askeliin. Naru kulkee koko matkan kuvion ympäri, kaistalle voi asettaa lippuja arvauksia varten, ja kuvion vieressä oleva palkki näyttää, kuinka korkea kuvio on." },
      hintGuess:     { en: "How far is it all the way round this shape? Put a flag where you think the strand will reach.", de: "Wie weit ist es einmal rundherum um diese Form? Setz ein Fähnchen dorthin, wo die Schnur wohl ankommt.", fr: "Jusqu’où va tout le tour de cette forme ? Plantez un drapeau là où vous pensez que la ficelle s’arrêtera.", es: "¿Cuánto es toda la vuelta a esta figura? Pon una banderita donde creas que llegará el cordón.", pt: "Até onde vai a volta inteira desta figura? Ponha uma bandeirinha onde você acha que o barbante vai chegar.", it: "Fin dove arriva tutto il giro di questa figura? Mettete una bandierina dove pensate che arriverà lo spago.", nl: "Hoe ver is het helemaal rondom deze vorm? Zet een vlaggetje op de plek waar het touwtje volgens jullie komt.", sv: "Hur långt är det hela vägen runt den här figuren? Sätt en flagga där du tror att snöret når.", da: "Hvor langt er der hele vejen rundt om denne figur? Sæt et flag der, hvor du tror, tråden når til.", no: "Hvor langt er det hele veien rundt denne figuren? Sett et flagg der du tror hyssingen rekker.", fi: "Kuinka pitkä matka on tämän kuvion ympäri? Aseta lippu kohtaan, johon arvelet narun yltävän." },
      hintUnroll:    { en: "Now let the strand lie down.", de: "Jetzt darf sich die Schnur hinlegen.", fr: "Maintenant, laissez la ficelle se coucher.", es: "Ahora deja que el cordón se acueste.", pt: "Agora deixe o barbante deitar na trilha.", it: "Ora lasciate stendere lo spago sulla pista.", nl: "Laat het touwtje nu gaan liggen.", sv: "Låt snöret lägga sig ner nu.", da: "Lad nu tråden lægge sig ned på banen.", no: "Nå kan hyssingen legge seg ned.", fi: "Anna narun nyt asettua suoraksi." },
      hintLanded:    { en: "The same strand that was round the shape is now lying straight. Nothing was added and nothing was taken away.", de: "Es ist dieselbe Schnur, die eben noch um die Form lag, und jetzt liegt sie gerade da. Es kam nichts dazu und es ging nichts weg.", fr: "C’est la même ficelle qui faisait le tour de la forme, et la voilà toute droite. On n’a rien ajouté, on n’a rien enlevé.", es: "Es el mismo cordón que rodeaba la figura, ahora acostado recto. No se le quitó ni se le puso nada.", pt: "É o mesmo barbante que estava em volta da figura, agora deitado reto. Nada foi acrescentado e nada foi tirado.", it: "Lo stesso spago che stava intorno alla figura ora è disteso dritto. Non è stato aggiunto nulla e non è stato tolto nulla.", nl: "Hetzelfde touwtje dat om de vorm heen lag, ligt nu kaarsrecht op de weg. Er is niets bijgekomen en er is niets afgegaan.", sv: "Det är samma snöre som låg runt figuren, och nu ligger det rakt. Ingenting har lagts till och ingenting har tagits bort.", da: "Det er den samme tråd, som lå rundt om figuren, og nu ligger den helt lige. Der er ikke lagt noget til, og der er ikke taget noget fra.", no: "Den samme hyssingen som gikk rundt figuren, ligger nå rett ut. Ingenting er lagt til, og ingenting er tatt bort.", fi: "Sama naru, joka oli kuvion ympärillä, on nyt suorana. Mitään ei lisätty eikä otettu pois." },
      unrollBtn:     { en: "Let the strand lie down", de: "Schnur hinlegen", fr: "Coucher la ficelle", es: "Acostar el cordón", pt: "Deitar o barbante", it: "Stendi lo spago", nl: "Touwtje neerleggen", sv: "Lägg ner snöret", da: "Læg tråden ned", no: "Legg hyssingen ned", fi: "Laske naru suoraksi" },
      rollBackBtn:   { en: "Put the strand back round", de: "Wieder rundherum", fr: "Remettre autour", es: "Volver a rodear la figura", pt: "Dar a volta de novo", it: "Rimetti lo spago intorno", nl: "Weer eromheen", sv: "Lägg snöret runt igen", da: "Læg den om figuren igen", no: "Legg den rundt igjen", fi: "Vie naru takaisin ympäri" },
      nextShapeBtn:  { en: "The next shape", de: "Nächste Form", fr: "Une autre forme", es: "Otra figura", pt: "Outra figura", it: "Un’altra figura", nl: "Andere vorm", sv: "Nästa figur", da: "Næste figur", no: "Neste figur", fi: "Seuraava kuvio" },
      printBtn:      { en: "Print the runway", de: "Leiste drucken", fr: "Imprimer le couloir", es: "Imprimir la hoja", pt: "Imprimir a trilha", it: "Stampa il foglio", nl: "De weg afdrukken", sv: "Skriv ut pappren", da: "Print banen", no: "Skriv ut sporet", fi: "Tulosta kaista" },
      sizeAria:      { en: "Make the shape bigger or smaller", de: "Die Form größer oder kleiner machen", fr: "Agrandir ou réduire la forme", es: "Hacer la figura más grande o más pequeña", pt: "Deixar a figura maior ou menor", it: "Quanto è grande la figura", nl: "De vorm groter of kleiner maken", sv: "Gör figuren större eller mindre", da: "Gør figuren større eller mindre", no: "Gjør figuren større eller mindre", fi: "Valitse kuvion koko" },
      strandAria:    { en: "Pull the end of the strand along the runway", de: "Das Ende der Schnur ziehen, damit sie sich hinlegt", fr: "Faire glisser le bout de la ficelle pour la coucher", es: "Extremo del cordón, arrástralo para acostarlo en la franja", pt: "Arrastar a ponta do barbante até a trilha", it: "Capo dello spago da stendere sulla pista", nl: "Het uiteinde van het touwtje. Sleep het naar de weg om het touwtje neer te leggen.", sv: "Dra i snörets ände så lägger snöret sig ner på spåret", da: "Træk trådens ende ned på banen", no: "Enden av hyssingen — dra den ned på sporet", fi: "Vedä narun päästä" },
      flagAria:      { en: "A flag — move it to where you think the strand will reach", de: "Dieses Fähnchen an die geschätzte Stelle ziehen", fr: "Déplacer le drapeau pour dire jusqu’où la ficelle ira", es: "Banderita, arrástrala hasta donde creas que llegará el cordón", pt: "Arrastar a bandeirinha até onde você acha que o barbante vai chegar", it: "Spostare la bandierina dove pensate che arriverà lo spago", nl: "Het vlaggetje. Sleep het naar de plek waar het touwtje volgens jullie komt.", sv: "Flytta flaggan dit du tror att snöret når", da: "Flyt flaget hen, hvor du tror, tråden når til", no: "Flytt flagget dit du tror hyssingen rekker", fi: "Siirrä lippu kohtaan, johon arvelet narun yltävän." },
      runwayAria:    { en: "Put a flag on the runway where you think the strand will reach", de: "Auf die Leiste tippen und dort ein Fähnchen setzen", fr: "Toucher le couloir pour y planter un drapeau", es: "Franja, elige un punto para poner una banderita donde creas que llegará el cordón", pt: "Tocar na trilha para pôr uma bandeirinha onde você acha que o barbante vai chegar", it: "Toccare la pista per mettere una bandierina dove pensate che arriverà lo spago", nl: "De weg met stappen. Tik erop om een vlaggetje te zetten waar het touwtje volgens jullie komt.", sv: "Tryck på spåret för att sätta en flagga där du tror att snöret når", da: "Banen. Vælg et sted på den, så flaget flytter derhen.", no: "Sporet — sett et flagg der du tror hyssingen rekker", fi: "Napauta kaistaa ja aseta lippu kohtaan, johon arvelet narun yltävän." },
      shelfLabel:    { en: "Choose a shape", de: "Eine Form aussuchen", fr: "Choisir une forme", es: "Elige una figura", pt: "Escolher uma figura", it: "Scegliete una figura", nl: "Kies een vorm", sv: "Välj en figur", da: "Vælg en figur", no: "Velg en figur", fi: "Valitse kuvio" },
      lockedSuffix:  { en: "with the Teacher plan", de: "gehört zum Lehrer-Paket", fr: "avec l’offre Enseignant", es: "con el plan Docente", pt: "no plano Professor", it: "con il piano Insegnante", nl: "hoort bij het Leerkracht-pakket", sv: "ingår i Lärarpaketet", da: "med Lærerabonnementet", no: "med Lærerabonnementet", fi: "kuuluu Opettaja-tilaukseen" },
      recordLabel:   { en: "Where each shape's strand reached", de: "Wo die Schnur bei jeder Form angekommen ist", fr: "Jusqu’où la ficelle de chaque forme est allée", es: "Hasta dónde llegó el cordón de cada figura", pt: "Até onde chegou o barbante de cada figura", it: "Dove è arrivato lo spago di ogni figura", nl: "Stipjes die laten zien tot waar het touwtje van elke vorm kwam", sv: "Så långt nådde varje figurs snöre", da: "Mærker efter hver figurs tråd", no: "Merkene viser hvor hyssingen rakk for hver figur", fi: "Mihin asti kunkin kuvion naru ylsi" },
      acrossUnit:    { en: "times the shape's width", de: "mal so breit wie die Form", fr: "fois la largeur de la forme", es: "veces el ancho de la figura", pt: "vezes a largura da figura", it: "volte la larghezza della figura", nl: "keer de breedte van de vorm", sv: "gånger figurens bredd", da: "gange figurens bredde", no: "ganger figurens bredde", fi: "kuvion leveyttä" },
      sizeSmall:     { en: "Small", de: "Klein", fr: "Petite", es: "Pequeña", pt: "Pequena", it: "Piccola", nl: "Klein", sv: "Liten", da: "Lille", no: "Liten", fi: "Pieni" },
      sizeMedium:    { en: "Medium", de: "Mittel", fr: "Moyenne", es: "Mediana", pt: "Média", it: "Media", nl: "Middelgroot", sv: "Mellan", da: "Mellem", no: "Mellomstor", fi: "Keskikokoinen" },
      sizeBig:       { en: "Big", de: "Groß", fr: "Grande", es: "Grande", pt: "Grande", it: "Grande", nl: "Groot", sv: "Stor", da: "Stor", no: "Stor", fi: "Suuri" },
      shapeCircle:   { en: "Circle", de: "Kreis", fr: "Cercle", es: "Círculo", pt: "Círculo", it: "Cerchio", nl: "Cirkel", sv: "Cirkel", da: "Cirkel", no: "Sirkel", fi: "Ympyrä" },
      shapePebble:   { en: "Pebble", de: "Kieselstein", fr: "Galet", es: "Piedra de río", pt: "Pedrinha", it: "Sasso", nl: "Kiezelsteen", sv: "Småsten", da: "Rullesten", no: "Småstein", fi: "Pikkukivi" },
      shapeEye:      { en: "Eye", de: "Auge", fr: "Amande", es: "Ojo", pt: "Olho", it: "Chicco", nl: "Amandel", sv: "Öga", da: "Oval", no: "Oval", fi: "Silmä" },
      shapeEgg:      { en: "Egg", de: "Ei", fr: "Œuf", es: "Huevo", pt: "Ovo", it: "Uovo", nl: "Ei", sv: "Ägg", da: "Æg", no: "Egg", fi: "Muna" },
      shapeCrescent: { en: "Crescent", de: "Mondsichel", fr: "Croissant de lune", es: "Media luna", pt: "Meia-lua", it: "Mezzaluna", nl: "Maantje", sv: "Månskära", da: "Halvmåne", no: "Halvmåne", fi: "Kuunsirppi" },
      shapeTrack:    { en: "Stadium", de: "Rennbahn", fr: "Stade", es: "Estadio", pt: "Pista de corrida", it: "Stadio", nl: "Renbaan", sv: "Löparbana", da: "Pølse", no: "Stadion", fi: "Juoksurata" },
      shapePillow:   { en: "Pillow", de: "Kopfkissen", fr: "Oreiller", es: "Almohada", pt: "Travesseiro", it: "Guanciale", nl: "Hoofdkussen", sv: "Kudde", da: "Pude", no: "Pute", fi: "Tyyny" },
      shapeCushion:  { en: "Cushion", de: "Sitzkissen", fr: "Coussin", es: "Cojín", pt: "Almofada", it: "Cuscino", nl: "Zitkussen", sv: "Sittdyna", da: "Madras", no: "Sofapute", fi: "Istuintyyny" },
      shapeReuleaux: { en: "Three-cornered curve", de: "Rundes Dreieck", fr: "Triangle bombé", es: "Curva de tres puntas", pt: "Curva de três pontas", it: "Curva a tre punte", nl: "Bolle driehoek", sv: "Rundad trekant", da: "Buet trekant", no: "Buet trekant", fi: "Kolmikulmainen kaari" },
      shapeFlower:   { en: "Flower", de: "Blume", fr: "Fleur", es: "Flor", pt: "Flor", it: "Fiore", nl: "Bloem", sv: "Blomma", da: "Blomst", no: "Blomst", fi: "Kukka" },
      shapePeanut:   { en: "Peanut", de: "Erdnuss", fr: "Cacahuète", es: "Cacahuete", pt: "Amendoim", it: "Nocciolina", nl: "Pinda", sv: "Jordnöt", da: "Jordnød", no: "Peanøtt", fi: "Maapähkinä" },
      shapeBurst:    { en: "Star burst", de: "Zackenstern", fr: "Étoile", es: "Estrella", pt: "Estrela", it: "Sole", nl: "Zon", sv: "Stjärna", da: "Stjerne", no: "Stjerne", fi: "Tähtisade" },
      gateTitle:     { en: "Seven more shapes", de: "Sieben weitere Formen", fr: "Sept formes de plus", es: "Siete figuras más", pt: "Mais sete figuras", it: "Altre sette figure", nl: "Nog zeven vormen", sv: "Sju figurer till", da: "Syv figurer mere", no: "Sju figurer til", fi: "Seitsemän kuviota lisää" },
      gateBody:      { en: "Seven more shapes — including one that is plainly not a circle and whose strand stops in exactly the same place — and the runway to print on paper.", de: "Sieben weitere Formen, darunter eine, die ganz und gar kein Kreis ist und die Klasse trotzdem ins Staunen bringt, und die Leiste zum Ausdrucken.", fr: "Sept formes de plus, dont une qui n’a vraiment rien d’un cercle et qui pourtant s’arrête juste au même endroit. Et le couloir à imprimer sur papier.", es: "Siete figuras más, y entre ellas una que a simple vista no es un círculo y aun así llega al mismo punto exacto de la franja, y también la hoja para imprimir.", pt: "Mais sete figuras — entre elas uma que não é nada parecida com um círculo e mesmo assim para no mesmo ponto — e a trilha para imprimir em papel.", it: "Altre sette figure, fra cui una che non somiglia per niente a un cerchio e arriva esattamente allo stesso punto, e il foglio da stampare.", nl: "Zeven vormen erbij, waaronder eentje die duidelijk geen cirkel is en waarbij het touwtje toch tot precies dezelfde plek komt. En de weg om op papier af te drukken.", sv: "Sju figurer till – en av dem är tydligt ingen cirkel, och ändå hamnar snöret på precis samma ställe – och pappren att skriva ut.", da: "Syv figurer mere — blandt dem en, der slet ikke ligner en cirkel, men hvis tråd alligevel når præcis lige så langt — og banen, som I kan printe.", no: "Sju figurer til, og en av dem ser slett ikke ut som en sirkel. Sporet kan dere skrive ut på papir og ta det med til pultene.", fi: "Seitsemän kuviota lisää — mukana yksi, joka ei selvästikään ole ympyrä mutta jonka naru pysähtyy silti täsmälleen samaan kohtaan kaistalla — sekä tulostettava kaista." },
      gateCta:       { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Katso Opettaja-tilaus" }
    },

    STORE_KEY: 'lcs:unroll-tape:v1',
    ENT_TRUST_DAYS: 14,

    /* ---- the stage, in model units ----------------------------------
       ⚠ ONE LAYOUT RULE COMES STRAIGHT OUT OF THE MATHEMATICS: the laid
       strand is R times longer than the shape is wide, and R runs to 6.9.
       So the shape can only ever occupy a fraction of the bench — that is
       not a compromise, it is the thesis rendered as a layout.

       ⭐ AND THE viewBox IS NOW COMPUTED PER SHAPE, not a constant.
       A fixed 1000x340 box left the DEFAULT shape with 37% of the stage
       as dead cream at every viewport (measured: 126 of 340 units; at
       2560 that was ~280px of nothing). The box now crops to whatever is
       actually drawn, `y` may be NEGATIVE, and because the height ceiling
       stops binding, the shape grows to what the RUNWAY allows — the
       default plate went from A=260 to A=335 while its bench got
       SHORTER (aspect 0.340 -> 0.276). Both at once. */
    W: 1000,
    BASE: 250,          /* the runway line — the shape stands ON it       */
    /* ⚠ MEASURED AT 360px: 16 model units is FIVE PIXELS on a 330px bench,
       and the plate's left edge sat on the border, inside the corner radius.
       A margin stated in model units shrinks with the bench, so it has to be
       generous enough to survive the NARROWEST one, not the widest. */
    PAD_L: 30,          /* clear space to the left of the plate's edge    */
    RIGHT: 984,         /* nothing may be drawn past this                 */
    HEAD: 26,           /* clearance above the tallest drawn thing        */
    FLAG_TOP: 146,      /* the flag's crown, in model units (BASE - 104)  */
    BELOW_BARE: 76,     /* rule + ticks + unit band + numerals            */
    BELOW_FULL: 186,    /* ... plus the record rail, WITH ROOM FOR A SECOND ROW
                           (the circle and the Reuleaux stagger there)      */
    NUM_Y: 308,         /* numeral BASELINE (BASE + 58)                   */
    RAIL_BASE: 372,     /* row 0 miniatures stand here; row 1 is +34      */
    MINI_W: 30,         /* every miniature is this wide. That IS the point */
    N: 512,             /* outline samples; divisible by 2,3,4 (all knots)*/
    A_MIN: 70,
    A_MAX: 360,
    ASPECT_MAX: 0.46,
    /* ⚠ THE RUNWAY MUST OUTRUN THE ANSWER. Sizing the plate to fill the
       runway exactly (the first attempt here) put every shape's landing
       at ~97% of the scale — so a child could guess short but never long,
       and on the default shape `addFlag` REFUSED anything past 2.39 while
       the answer was 2.30. A guess space that only opens one way is not a
       guess space. One whole width of room beyond the landing, always. */
    GUESS_ROOM: 0.85,
    SIZE_STEPS: [0.55, 0.75, 1.0],
    MAX_FLAGS: 3,
    MAX_MARKS: 5,
    FREE_SHAPES: 5,

    premium: false,
    premiumKnown: false,

    /* =================================================================
       THE SHAPE FAMILIES — analytic, closed, u ∈ [0,1).
       The polar form is used wherever a trigonometric one would have
       singular speed at the corners (superellipse, n>2), so |γ′| stays
       bounded and the arclength table stays well-conditioned.
       ================================================================= */
    FAMILY: {
      circle: function () {
        return { f: function (u) { return [Math.cos(TAU * u), Math.sin(TAU * u)]; }, knots: [] };
      },
      ellipse: function (p) {
        return { f: function (u) { return [Math.cos(TAU * u), p.q * Math.sin(TAU * u)]; }, knots: [] };
      },
      superellipse: function (p) {
        return {
          f: function (u) {
            var th = TAU * u, c = Math.abs(Math.cos(th)), s = Math.abs(Math.sin(th));
            var r = Math.pow(Math.pow(c, p.n) + Math.pow(s / p.q, p.n), -1 / p.n);
            return [r * Math.cos(th), r * Math.sin(th)];
          }, knots: []
        };
      },
      /* width normalised to 1: two runs d, two semicircles r.
         L = 2d + 2πr EXACTLY — a closed-form anchor for the gate. */
      stadium: function (p) {
        var r = p.r, d = 1 - 2 * r, Ls = 2 * d + 2 * Math.PI * r;
        return {
          f: function (u) {
            var s = u * Ls, t;
            if (s < d) return [d / 2 - s, -r];
            s -= d;
            if (s < Math.PI * r) { t = -Math.PI / 2 - s / r; return [-d / 2 + r * Math.cos(t), r * Math.sin(t)]; }
            s -= Math.PI * r;
            if (s < d) return [-d / 2 + s, r];
            s -= d;
            t = Math.PI / 2 - s / r; return [d / 2 + r * Math.cos(t), r * Math.sin(t)];
          },
          knots: [d / Ls, (d + Math.PI * r) / Ls, (2 * d + Math.PI * r) / Ls]
        };
      },
      /* Reuleaux triangle of width 1 — three 60° arcs. L = π exactly
         (Barbier), and its width is 1 in EVERY direction, so it reads the
         same 3.14 as a circle while looking nothing like one. It is NOT a
         polygon: every one of its sides is an arc. */
      reuleaux: function () {
        var C = [[0, 0], [1, 0], [0.5, Math.sqrt(3) / 2]];
        return {
          f: function (u) {
            var seg = Math.floor(u * 3), t = u * 3 - seg;
            if (seg > 2) { seg = 2; t = 1; }
            var c = C[(seg + 2) % 3], p0 = C[seg], p1 = C[(seg + 1) % 3];
            var a0 = Math.atan2(p0[1] - c[1], p0[0] - c[0]);
            var a1 = Math.atan2(p1[1] - c[1], p1[0] - c[0]);
            while (a1 < a0) a1 += TAU;
            if (a1 - a0 > Math.PI) a1 -= TAU;
            var a = a0 + (a1 - a0) * t;
            return [c[0] + Math.cos(a), c[1] + Math.sin(a)];
          }, knots: [1 / 3, 2 / 3]
        };
      },
      egg: function (p) {
        return {
          f: function (u) { var t = TAU * u; return [Math.sin(t) * (1 + p.k * Math.cos(t)) * 0.8, Math.cos(t)]; },
          knots: []
        };
      },
      /* circular lune: outer radius 1 at the origin, inner radius r
         centred at (0,d). Both arcs exact — another closed-form anchor. */
      crescent: function (p) {
        var R = 1, r = p.r, d = p.d;
        var aA = Math.acos((R * R + d * d - r * r) / (2 * d * R));
        var aB = Math.acos((R * R - d * d - r * r) / (2 * d * r));
        var Lo = 2 * R * (Math.PI - aA), Li = 2 * r * (Math.PI - aB), Lt = Lo + Li;
        return {
          f: function (u) {
            var s = u * Lt, t;
            if (s <= Lo) { t = (Math.PI / 2 + aA) + s / R; return [R * Math.cos(t), R * Math.sin(t)]; }
            s -= Lo;
            t = (Math.PI / 2 - aB) - s / r;
            return [r * Math.cos(t), d + r * Math.sin(t)];
          }, knots: [Lo / Lt]
        };
      },
      rosette: function (p) {
        return {
          f: function (u) {
            var th = TAU * u, r = 1 + p.amp * Math.cos(p.k * th);
            return [r * Math.cos(th), r * Math.sin(th)];
          }, knots: []
        };
      },
      /* the same waisted curve turned a quarter: lobes STACKED, so the
         shape is tall and non-convex. */
      peanut: function (p) {
        return {
          f: function (u) {
            var th = TAU * u, r = 1 + p.w * Math.cos(2 * th);
            return [r * Math.sin(th), r * Math.cos(th)];
          }, knots: []
        };
      }
    },

    /* =================================================================
       THE OUTLINE — sampled once per shape, in UNIT space.

       ⭐ VERTEX 0 IS B, THE LOWEST POINT, EXACTLY. The strand's guide
       starts there and the outline meets the runway C¹ there (at a
       y-extreme the tangent is horizontal), so the wrap and the lay join
       without a kink. B is FOUND, never stored: a stored B would drift
       silently from a changed parametrisation.

       ⚠ AND THE SAMPLED MINIMUM IS NOT THE MINIMUM. A true extreme
       almost never lands on an integer sample — the Reuleaux's lowest
       point sits at u = 1/6, which is not a sample at any N divisible by
       3. It is refined by ternary search and then made vertex 0.
       ================================================================= */
    _refine: function (f, coord, sign, uMid, du) {
      var lo = uMid - du, hi = uMid + du, i, a, b;
      var val = function (u) { return sign * f(((u % 1) + 1) % 1)[coord]; };
      for (i = 0; i < 80; i++) {
        a = lo + (hi - lo) / 3; b = hi - (hi - lo) / 3;
        if (val(a) < val(b)) lo = a; else hi = b;
      }
      return ((((lo + hi) / 2) % 1) + 1) % 1;
    },

    buildOutline: function (shape) {
      var mk = this.FAMILY[shape.family];
      if (!mk) return null;
      var made = mk(shape.params || {});
      var f = made.f, i, k;

      /* 1. locate B (lowest y), coarse then refined.
         ⚠ A FLAT BOTTOM HAS NO SINGLE LOWEST POINT. The stadium rests on
         a straight run, so every point on it is equally lowest and a
         ternary search — which compares equal values — walks to an
         arbitrary end of its bracket. That put B on the run's edge, which
         put a knot on top of the parametrisation seam and forced two
         COINCIDENT samples (measured: 2 segments of 1.4e-9, 2.8e-7 of the
         median). Take the MIDDLE of the flat span instead: it is stable,
         and the shape then rests balanced on its own flat. */
      var M = 2048, bi = 0, bv = Infinity, uB;
      for (i = 0; i < M; i++) { var y = f(i / M)[1]; if (y < bv) { bv = y; bi = i; } }
      var flat = [];
      for (i = 0; i < M; i++) if (f(i / M)[1] <= bv + 1e-12) flat.push(i);
      if (flat.length > 2) {
        /* a run: walk the contiguous block containing bi and take its centre */
        var lo2 = bi, hi2 = bi;
        while (f((((lo2 - 1) % M) + M) % M / M)[1] <= bv + 1e-12 && hi2 - lo2 < M - 1) lo2--;
        while (f(((hi2 + 1) % M) / M)[1] <= bv + 1e-12 && hi2 - lo2 < M - 1) hi2++;
        uB = ((((lo2 + hi2) / 2) % M) + M) % M / M;
      } else {
        uB = this._refine(f, 1, -1, bi / M, 1.5 / M);
        if (-f(uB)[1] < -bv) uB = bi / M;    /* a cusp beats its neighbourhood */
      }

      /* 2. sample from B, with every family knot forced onto the grid —
            without that a corner costs an ORDER of accuracy.

            ⚠ AND THE PARAMETRISATION'S OWN SEAM (original u = 0) IS A
            KNOT TOO. Every family that declares corners declares the ones
            it can see — the Reuleaux says [1/3, 2/3] — but a Reuleaux has
            THREE corners and the third is the seam, implicit while u=0 is
            the start and invisible once the B-shift moves it to 5/6.
            Measured with it missing: convergence collapsed from O(1/N²)
            to O(1/N) and the Reuleaux read 3.14089 instead of 3.1415911,
            a 450× deficit — on a shape whose whole job is to read π. */
      var cuts = [0, ((-uB) % 1 + 1) % 1];
      for (k = 0; k < made.knots.length; k++) cuts.push(((made.knots[k] - uB) % 1 + 1) % 1);
      /* ⚠ MERGE CUTS THAT ARE CLOSER THAN HALF A SAMPLE STEP. A cut that
         near another cannot carry a meaningful sub-segment, but the
         `max(2, …)` floor still forces two points into it — which is how
         a degenerate 1.4e-9 segment appeared. */
      cuts.sort(function (a, b) { return a - b; });
      var eps = 0.5 / this.N;
      var uniq = [];
      for (i = 0; i < cuts.length; i++) if (i === 0 || cuts[i] > cuts[i - 1] + eps) uniq.push(cuts[i]);
      if (1 - uniq[uniq.length - 1] < eps) uniq.pop();
      uniq.push(1);

      /* ⚠ EXACTLY N VERTICES. Per-segment `round()` drifts — the stadium's
         four junctions rounded to 514 — and the vertex count is something
         the gate asserts, so it must be exact rather than approximately
         right. The remainder is spread one-per-segment over the longest
         segments, which keeps the spacing as even as an integer split
         allows without ever moving a knot. */
      var segN = [], want = [], k2;
      for (k = 0; k < uniq.length - 1; k++) want.push(this.N * (uniq[k + 1] - uniq[k]));
      for (k = 0; k < want.length; k++) segN.push(Math.max(2, Math.floor(want[k])));
      var have = 0;
      for (k = 0; k < segN.length; k++) have += segN[k];
      var order = [];
      for (k = 0; k < want.length; k++) order.push(k);
      order.sort(function (a, b) { return (want[b] - segN[b]) - (want[a] - segN[a]); });
      for (k2 = 0; have < this.N && order.length; k2++) { segN[order[k2 % order.length]]++; have++; }
      var pts = [];
      for (k = 0; k < uniq.length - 1; k++) {
        var a0 = uniq[k], b0 = uniq[k + 1], n = segN[k];
        for (i = 0; i < n; i++) pts.push(f(((a0 + (b0 - a0) * i / n) + uB) % 1));
      }

      /* 3. cumulative arclength, and the bbox OF THE POLYLINE ITSELF —
            measuring `across` off the analytic curve while the strand is
            the polyline would put one sinc factor on one and not the
            other, and the circle's readout would drift. */
      var cum = [0], L = 0, x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      var yMinX = 0, yMaxX = 0;
      for (i = 0; i < pts.length; i++) {
        var p = pts[i], q = pts[(i + 1) % pts.length];
        if (p[0] < x0) { x0 = p[0]; yMinX = p[1]; }
        if (p[0] > x1) { x1 = p[0]; yMaxX = p[1]; }
        if (p[1] < y0) y0 = p[1];
        if (p[1] > y1) y1 = p[1];
        L += Math.hypot(q[0] - p[0], q[1] - p[1]);
        cum.push(L);
      }
      return {
        k: shape.k, pts: pts, cum: cum, L: L,
        across: x1 - x0, tall: y1 - y0,
        minX: x0, minY: y0,
        /* the y at which the plate is widest, each side — the caliper
           grips the plate THERE rather than at an invented height */
        yAtMinX: yMinX, yAtMaxX: yMaxX,
        /* how much of the plate hangs LEFT of B, as a fraction of its
           width. B must sit at the runway's zero for the strand to lay
           from zero, so a symmetric shape straddles it — this is what
           the left margin has to pay for. */
        fLeft: (pts[0][0] - x0) / (x1 - x0),
        R: L / (x1 - x0), tallR: (y1 - y0) / (x1 - x0)
      };
    },

    /* point on the outline at arclength s ∈ [0, L] (binary search + lerp;
       never Newton — a cusp has infinite dt/ds and Newton diverges) */
    atArc: function (o, s) {
      if (s <= 0) return o.pts[0];
      if (s >= o.L) return o.pts[0];
      var lo = 0, hi = o.cum.length - 1, mid;
      while (hi - lo > 1) { mid = (lo + hi) >> 1; if (o.cum[mid] <= s) lo = mid; else hi = mid; }
      var a = o.pts[lo % o.pts.length], b = o.pts[(lo + 1) % o.pts.length];
      var seg = o.cum[lo + 1] - o.cum[lo];
      var f = seg > 0 ? (s - o.cum[lo]) / seg : 0;
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
    },

    /* =================================================================
       THE LAYOUT — solved, never hand-tuned.

       Three ceilings, all real, and one of them USED to be paid twice:
         · legibility  — A_MAX, so the picture stays a picture
         · the RUNWAY  — the laid strand is R·A long and must not pass
                         RIGHT, which is what makes a burst (R=6.9)
                         smaller than a pebble (R=2.3). The plate's own
                         left overhang (fLeft·A) is part of that budget;
                         the old solver ignored it and used a fixed X0.
         · the ASPECT  — the bench may not become taller than ASPECT_MAX
                         of its width, or a tall shape turns the
                         instrument into a column.
       ⚠ THE RECORD RAIL IS ALWAYS PAID FOR IN `aMax`, even before the
       first mark exists, so that the shape NEVER changes size when a mark
       lands. Only the viewBox's bottom moves. A plate that resized itself
       mid-lesson would break the one thing the lesson is about.
       ================================================================= */
    aMax: function (o) {
      if (!o || !(o.R > 0)) return this.A_MAX;
      var byRunway = (this.RIGHT - this.PAD_L) / (o.R + o.fLeft + this.GUESS_ROOM);
      var byAspect = o.tallR > 0
        ? (this.ASPECT_MAX * this.W - this.BELOW_FULL - this.HEAD) / o.tallR
        : this.A_MAX;
      return Math.max(this.A_MIN, Math.floor(Math.min(this.A_MAX, byRunway, byAspect)));
    },
    /* the three-rung ladder. Fractions of aMax, not absolute sizes, so
       "big" means the same thing on every shape and nothing overflows. */
    sizeStep: function (o, i) {
      var hi = this.aMax(o);
      var f = this.SIZE_STEPS[Math.max(0, Math.min(this.SIZE_STEPS.length - 1, i | 0))];
      return Math.max(this.A_MIN, Math.min(hi, Math.round(hi * f)));
    },
    sizeIndexOf: function (o, A) {
      var best = 0, bestD = Infinity, i, d;
      for (i = 0; i < this.SIZE_STEPS.length; i++) {
        d = Math.abs(this.sizeStep(o, i) - A);
        if (d < bestD) { bestD = d; best = i; }
      }
      return best;
    },
    defaultA: function (o) { return this.sizeStep(o, this.SIZE_STEPS.length - 1); },

    /* the runway's zero, which is also where B stands */
    x0For: function (o, A) {
      if (!o) return this.PAD_L;
      return Math.round(this.PAD_L + o.fLeft * A);
    },
    /* the viewBox, cropped to what is actually drawn. `y` MAY BE NEGATIVE
       — a tall plate simply extends the box upward rather than being
       squashed, and a squat one stops the bench being half empty. */
    viewBox: function (o, A, hasMarks) {
      var top = Math.round(Math.min(this.BASE - (o ? o.tallR * A : 0), this.FLAG_TOP) - this.HEAD);
      /* even units only: a half-unit jitter on every resize makes the
         whole bench shimmer during a drag */
      top = Math.round(top / 2) * 2;
      var bot = this.BASE + (hasMarks ? this.BELOW_FULL : this.BELOW_BARE);
      return { top: top, h: bot - top };
    },

    /* =================================================================
       THE STATE — total, pure, immutable.
       ================================================================= */
    newState: function () {
      return { shape: 0, A: this.A_MAX, t: 0, flags: [], committed: false };
    },

    /* ⚠ TOTAL MEANS TOTAL — `st || newState()` catches null and 0 and
       hands `{}` or `[]` straight through to a property read. */
    _st: function (st) {
      return (st && typeof st === 'object' &&
        typeof st.shape === 'number' && isFinite(st.shape) &&
        typeof st.A === 'number' && isFinite(st.A) &&
        typeof st.t === 'number' && isFinite(st.t) &&
        Object.prototype.toString.call(st.flags) === '[object Array]') ? st : this.newState();
    },
    _clone: function (st) {
      var s = this._st(st);
      return { shape: s.shape, A: s.A, t: s.t, flags: s.flags.slice(), committed: !!s.committed };
    },

    setSizeStep: function (st, o, i) {
      var s = this._clone(st);
      if (!o) return null;
      if (!(i >= 0) || i >= this.SIZE_STEPS.length) return null;
      var a = this.sizeStep(o, i);
      if (a === s.A) return null;
      s.A = a;
      return s;
    },

    setPeel: function (st, v) {
      var s = this._clone(st);
      var t = Math.min(1, Math.max(0, v));
      if (t === s.t) return null;
      /* ⭐ THE COMMIT. The flags freeze BY REFUSAL at the first movement
         off the wrap — not by a `disabled` attribute, which is the hole
         draw-bag / number-sieve / measurement-bench / estimation-jar all
         share (§23.6).
         ⚠ AND IT IS UNCONDITIONAL. It used to require a flag to already
         exist, so a class that forgot to guess, laid the strand down and
         pressed "put it back round" could then plant a "guess" having
         already seen the answer. */
      if (t > 0) s.committed = true;
      s.t = t;
      return s;
    },

    /* Flags are stored IN ACROSSES, so they survive a size change and
       keep their meaning — which is also why a resize does not need a
       new guess. Up to three, from three children, so the disagreement
       is visible and nothing on screen can settle it. */
    _flagOK: function (st, o, acrosses) {
      if (!o) return null;
      if (st.committed || st.t > 0) return null;
      var v = Math.round(acrosses * 100) / 100;
      var hi = (this.RIGHT - this.x0For(o, st.A)) / st.A;
      if (!(v > 0) || v > hi) return null;
      return v;
    },
    addFlag: function (st, o, acrosses) {
      var s = this._clone(st);
      if (s.flags.length >= this.MAX_FLAGS) return null;
      var v = this._flagOK(s, o, acrosses);
      if (v === null) return null;
      s.flags.push(v);
      return s;
    },
    moveFlag: function (st, o, i, acrosses) {
      var s = this._clone(st);
      if (!(i >= 0) || i >= s.flags.length) return null;
      var v = this._flagOK(s, o, acrosses);
      if (v === null) return null;
      if (s.flags[i] === v) return null;
      s.flags[i] = v;
      return s;
    },
    /* which flag a tap on the runway should move, once all three are out */
    nearestFlag: function (st, acrosses) {
      var s = this._st(st), best = -1, bestD = Infinity, i, d;
      for (i = 0; i < s.flags.length; i++) {
        d = Math.abs(s.flags[i] - acrosses);
        if (d < bestD) { bestD = d; best = i; }
      }
      return best;
    },

    /* ⭐ Tapping a shape ALWAYS restarts that shape's round, including the
       one already showing. That is the honest "run it again": it clears
       the guesses rather than letting a child re-guess after seeing where
       the strand landed. */
    pickShape: function (st, shelf, i) {
      var s = this._clone(st);
      if (!shelf || !shelf.length) return null;
      if (!(i >= 0) || i >= shelf.length) return null;
      s.shape = i; s.t = 0; s.flags = []; s.committed = false;
      s.A = this.defaultA(this.outlineFor(shelf[i]));
      return s;
    },
    nextShape: function (st, shelf) {
      var s = this._st(st);
      if (!shelf || shelf.length < 2) return null;
      return this.pickShape(s, shelf, (s.shape + 1) % shelf.length);
    },

    /* =================================================================
       THE RECORD — pure, and deliberately NOT part of the round state,
       because it outlives every round and must survive a shape change.

       Landings only, never guesses (refusal 8). One entry per shape, so
       laying the circle down at three sizes leaves ONE mark — which is
       the proof, not a loss.
       ================================================================= */
    addMark: function (marks, key, acrosses) {
      var out = [], i, seen = false;
      var list = (Object.prototype.toString.call(marks) === '[object Array]') ? marks : [];
      if (!key || !(acrosses > 0)) return list;
      for (i = 0; i < list.length; i++) {
        if (list[i] && list[i].k === key) { seen = true; out.push({ k: key, a: acrosses }); }
        else if (list[i]) out.push(list[i]);
      }
      if (!seen) out.push({ k: key, a: acrosses });
      while (out.length > this.MAX_MARKS) out.shift();
      return out;
    },

    /* the shelf the current entitlement may see */
    shelf: function () {
      var all = (this.data && this.data.shapes) || [], out = [], i;
      for (i = 0; i < all.length; i++) if (i < this.FREE_SHAPES || this.premium) out.push(all[i]);
      return out;
    },
    /* every shape in the book, locked or not — the shelf UI shows all
       twelve, because permanent quiet visibility is the anti-nag answer
       and a teacher cannot plan Tuesday from a chip that is not there */
    book: function () { return (this.data && this.data.shapes) || []; },
    isLocked: function (i) { return !this.premium && i >= this.FREE_SHAPES; },

    /* =================================================================
       THE GUIDE — the whole of invention 3 in six lines.

       Guide G = the outline from B (arclength 0→L), then straight right
       along the runway. The strand occupies guide-arclength [L·t, L·t+L],
       so its TOTAL IS L AT EVERY t BY CONSTRUCTION. Nothing appears,
       nothing disappears; every material point travels one guide at one
       speed, and the loop OPENS rather than shrinking.

       ⚠ THE LAID PART IS ONE STRAIGHT SEGMENT of exactly L·t model units,
       so the reading is exact by construction — only the PICTURE of the
       wrap is discretised. Those are two different errors and the gate
       reports them separately.
       ================================================================= */
    strandPoints: function (o, st, aOver) {
      var s = this._st(st);
      if (!o) return [];
      var A = (typeof aOver === 'number' && aOver > 0) ? aOver : s.A;
      var X0 = this.x0For(o, A);
      var scale = A / o.across;
      var Lm = o.L * scale;                  /* the strand's length, in model units */
      var laid = Lm * s.t;
      var out = [], i;
      /* the wrapped part: outline vertices with arclength in [L·t, L] */
      var sFrom = o.L * s.t;
      /* B is vertex 0; place it at X0 on the runway */
      var bx = o.pts[0][0], by = o.pts[0][1];
      /* ⚠ THE Y AXIS FLIPS. B is the shape's MINIMUM y in maths space and
         its MAXIMUM y on screen, because SVG y grows downward. Mapping
         with `BASE + (p[1]-by)` put every shape UNDER the runway instead
         of standing on it. */
      var self = this;
      var map = function (p) {
        return [X0 + (p[0] - bx) * scale, self.BASE - (p[1] - by) * scale];
      };
      if (s.t < 1) {
        out.push(map(this.atArc(o, sFrom)));
        for (i = 0; i < o.pts.length; i++) if (o.cum[i] > sFrom) out.push(map(o.pts[i]));
        out.push(map(o.pts[0]));             /* arrive back at B */
      } else {
        out.push(map(o.pts[0]));
      }
      if (laid > 0) out.push([X0 + laid, this.BASE]);
      return out;
    },

    /* the polyline's own total length, in model units — the quantity the
       gate compares against the analytic arc length */
    strandLength: function (o, st, aOver) {
      var p = this.strandPoints(o, st, aOver), L = 0, i;
      for (i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
      return L;
    },

    /* the outline as drawn (always the full loop — the SHAPE never moves,
       only the strand leaves it) */
    outlinePoints: function (o, st, aOver) {
      var s = this._st(st);
      if (!o) return [];
      var A = (typeof aOver === 'number' && aOver > 0) ? aOver : s.A;
      var X0 = this.x0For(o, A);
      var scale = A / o.across, bx = o.pts[0][0], by = o.pts[0][1], out = [], i;
      for (i = 0; i < o.pts.length; i++) {   /* y flips — see strandPoints */
        out.push([X0 + (o.pts[i][0] - bx) * scale, this.BASE - (o.pts[i][1] - by) * scale]);
      }
      return out;
    },

    /* a miniature of any shape, normalised to MINI_W and standing on a
       given baseline. EVERY miniature is the same WIDTH — that is not a
       styling choice, it restates the thesis each time one is drawn. */
    miniPoints: function (o, cx, baseY) {
      if (!o) return [];
      var s = this.MINI_W / o.across, out = [], i;
      var bx = (o.minX + o.across / 2), by = o.minY;
      for (i = 0; i < o.pts.length; i++) {
        out.push([cx + (o.pts[i][0] - bx) * s, baseY - (o.pts[i][1] - by) * s]);
      }
      return out;
    },

    /* =================================================================
       THE SHAPE BOOK — family + parameters only. R, the perimeter, the
       across and the tall are DERIVED here and INDEPENDENTLY in the gate,
       never read from a file. A stored answer is an answer that can drift
       away from the picture without anyone noticing.

       ⭐ THE ORDER IS PEDAGOGICAL, and the circle is first because it is
       the ONLY shape whose unit is self-evident: on a flat ellipse a
       child can and will point at the short way, so the unit has to be
       defended before it can do any work. "A circle is three-and-a-bit
       all the way round" is also a fact worth owning for life; "a flat
       blob is two-and-a-bit" is not. The free five are unchanged as a
       SET — only reordered — so no entitlement moves.

       ⚠ A 404 DEGRADES TO THE FREE TIER, NEVER TO NOTHING.
       ================================================================= */
    FALLBACK_SHAPES: {
      version: 2, freeCount: 5,
      shapes: [
        { k: 'circle', family: 'circle', params: {} },
        { k: 'pebble', family: 'ellipse', params: { q: 0.3988601222559297 } },
        { k: 'eye', family: 'ellipse', params: { q: 2.3 } },
        { k: 'egg', family: 'egg', params: { k: 0.3238155563068533 } },
        { k: 'crescent', family: 'crescent', params: { r: 0.7, d: 0.3870136357809074 } }
      ]
    },

    _fetchShapes: function () {
      var self = this;
      fetch('/mini-tools/unroll-tape-shapes.json', { cache: 'no-cache' })
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
        .catch(function () { return self.FALLBACK_SHAPES; })
        .then(function (d) {
          self.data = (d && d.shapes && d.shapes.length) ? d : self.FALLBACK_SHAPES;
          self._outlines = {};
          var sh = self.shelf();
          if (sh.length) self.st.A = self.defaultA(self.outlineFor(sh[0]));
          self._dirtyBuild = true;
          if (self._wrap) self.render();
        });
    },

    outlineFor: function (shape) {
      if (!shape) return null;
      if (!this._outlines) this._outlines = {};
      if (!this._outlines[shape.k]) this._outlines[shape.k] = this.buildOutline(shape);
      return this._outlines[shape.k];
    },
    shapeName: function (k) {
      if (!k) return '';
      var key = 'shape' + k.charAt(0).toUpperCase() + k.slice(1);
      return this.api ? this.api.t(key) : key;
    },

    /* =================================================================
       STORE + ENTITLEMENT — the pattern from unit-handle.js:414-450.
       ================================================================= */
    _loadStore: function () {
      var s = null;
      try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
      if (!s || typeof s !== 'object') s = {};
      if (!s.v) s.v = 1;
      return s;
    },
    _saveStore: function () {
      try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {}
    },
    _setPremium: function (v) {
      var was = this.premium;
      this.premium = !!v;
      this.premiumKnown = true;
      /* ⚠ LOCKING A CONTROL IS NOT ENOUGH — RESET THE STATE IT PRODUCED.
         A lapsed subscription must not leave a locked shape on the bench. */
      if (was && !this.premium) {
        var sh = this.shelf();
        if (this.st && this.st.shape >= sh.length) {
          this.st = this.pickShape(this.st, sh, 0) || this.newState();
        }
        this.marks = [];
      }
      this._dirtyBuild = true;
      if (this._wrap) this.render();
    },
    _fetchEntitlement: function () {
      var self = this, token = null;
      try { token = localStorage.getItem('accessToken'); } catch (_) {}
      var trustCache = function () {
        var ent = self._store.ent;
        if (ent && ent.checkedAt) {
          var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
          self._setPremium((age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false);
        } else self._setPremium(false);
      };
      if (!token) { self._setPremium(false); return; }
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j) { self._setPremium(false); return; }
          var tier = j.user && j.user.subscriptionTier, sub = j.subscription;
          var paid = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
          self._store.ent = { tier: paid ? 'full' : 'free', checkedAt: new Date().toISOString() };
          self._saveStore();
          self._setPremium(paid);
        })
        .catch(trustCache);
    },

    /* =================================================================
       LIFECYCLE
       ================================================================= */
    init: function (api) {
      this.api = api;
      injectUnrollTapeCSS();
      /* the wide-viewport switch, and the one-line rollback */
      document.body.classList.add('urt-wide');
      this._store = this._loadStore();
      var ent = this._store.ent;
      if (ent && ent.tier) this.premium = ent.tier !== 'free';
      this.data = this.FALLBACK_SHAPES;
      this._outlines = {};
      this.st = this.newState();
      this.marks = [];
      this._timers = [];
      this._dirtyBuild = true;
      var sh = this.shelf();
      if (sh.length) this.st.A = this.defaultA(this.outlineFor(sh[0]));
      this._fetchShapes();
      this._fetchEntitlement();
      this._wirePointer();
      this.render();
    },
    reset: function () {
      this.st = this.newState();
      this.marks = [];
      var sh = this.shelf();
      if (sh.length) this.st.A = this.defaultA(this.outlineFor(sh[0]));
      this._dirtyBuild = true;
      this.render();
    },
    destroy: function () {
      var i;
      for (i = 0; i < (this._timers || []).length; i++) clearTimeout(this._timers[i]);
      this._timers = [];
      if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
      if (this._ro && this._ro.disconnect) { try { this._ro.disconnect(); } catch (_) {} this._ro = null; }
      this._gesture = null;
      this._wrap = null; this._svg = null;
    },
    _after: function (ms, fn) {
      var id = setTimeout(fn, ms);
      this._timers.push(id);
      return id;
    },

    /* =================================================================
       RENDER — the skeleton is BUILT ONCE and then repainted.

       ⭐ THIS IS NOT AN OPTIMISATION, IT IS THE FIX FOR THE REPORTED
       DEFECT. `stage.innerHTML=''` on every pointermove removed the very
       element that was mid-pointerdown, so the drag died with it. A
       handle can only be dragged if it survives the drag.
       ================================================================= */
    render: function () {
      var api = this.api;
      if (!api || !api.stage) return;
      var sig = this.book().length + '|' + (this.premium ? 'p' : 'f');
      if (this._dirtyBuild || sig !== this._builtSig || !this._svg || !this._svg.parentNode) {
        this._build();
        this._builtSig = sig;
        this._dirtyBuild = false;
      }
      this._paint();
    },

    _svgEl: function (tag, attrs) {
      var e = document.createElementNS('http://www.w3.org/2000/svg', tag), k;
      for (k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
      return e;
    },
    _pts: function (arr) {
      var s = [], i;
      for (i = 0; i < arr.length; i++) s.push(arr[i][0].toFixed(3) + ',' + arr[i][1].toFixed(3));
      return s.join(' ');
    },
    _set: function (el, attrs) {
      var k;
      if (!el) return;
      for (k in attrs) if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
    },

    /* the chequered marker flag, built in HTML.
       ⚠ IT IS NOT SVG. At the 660px bench the tool actually gets, one
       model unit is 0.66px, so the old 30-unit pennant drew under 20px
       and vanished behind its own handle dot. HTML holds a pixel floor. */
    _flagNode: function (cls) {
      var api = this.api;
      var w = api.el('span', 'urt-fl' + (cls ? ' ' + cls : ''));
      w.appendChild(api.el('i', 'urt-fl-shadow'));
      w.appendChild(api.el('i', 'urt-fl-pole'));
      var cloth = api.el('i', 'urt-fl-cloth');
      cloth.appendChild(api.el('i', 'urt-fl-q1'));
      cloth.appendChild(api.el('i', 'urt-fl-q2'));
      w.appendChild(cloth);
      w.appendChild(api.el('i', 'urt-fl-boot'));
      return w;
    },
    /* a padlock, as a SHAPE. The idiom is draw-bag.js:1144 — a locked
       control needs a signal that is not a colour. */
    _lockNode: function () {
      var svg = this._svgEl('svg', { viewBox: '0 0 24 24', 'class': 'urt-padlock', 'aria-hidden': 'true' });
      svg.appendChild(this._svgEl('path', {
        d: 'M8.4 10.5 V7.6 a3.6 3.6 0 0 1 7.2 0 V10.5', 'class': 'urt-padlockshackle'
      }));
      svg.appendChild(this._svgEl('rect', {
        x: 5, y: 10.5, width: 14, height: 9.5, rx: 2.2, 'class': 'urt-padlockbody'
      }));
      return svg;
    },

    _build: function () {
      var api = this.api, self = this, stage = api.stage;
      /* ⚠⚠ DROP THE PAINT MEMOS FIRST. `_paint` skips re-emitting the 512-point
         outline and strand when `_okey`/`_skey` are unchanged — which is what
         makes a drag cheap — but `_build` replaces those nodes with EMPTY ones.
         Leaving the keys set meant the new polygon was never given any points:
         MEASURED as a bench with a caliper, a height line and a runway and NO
         SHAPE AND NO CORD AT ALL. It was intermittent, because it needs a
         rebuild AFTER a paint — which is exactly what the shape-book fetch and
         the entitlement check both do. A cache key must never outlive the node
         it describes. */
      this._okey = null; this._skey = null;
      stage.innerHTML = '';
      var wrap = api.el('div', 'urt-wrap');
      this._wrap = wrap;

      var bench = api.el('div', 'urt-bench');
      bench.setAttribute('role', 'group');
      bench.setAttribute('aria-label', api.t('benchLabel'));
      this._bench = bench;

      var svg = this._svgEl('svg', { 'class': 'urt-svg' });
      this._svg = svg;
      bench.appendChild(svg);

      /* ---- furniture, in paint order --------------------------------
         Everything that decorates the plate is a SIBLING of `.urt-outline`,
         never the outline itself: the gate asserts that element's bounding
         box is byte-identical across a peel, which is what proves the
         SHAPE does not move when the strand leaves it. */
      this._deck = this._svgEl('rect', { 'class': 'urt-deck', x: 0, width: this.W });
      svg.appendChild(this._deck);

      this._unitBand = this._svgEl('rect', { 'class': 'urt-unit', rx: 6 });
      svg.appendChild(this._unitBand);

      this._rule = this._svgEl('line', { 'class': 'urt-rule' });
      svg.appendChild(this._rule);

      this._tickG = this._svgEl('g', {});      /* pooled major ticks   */
      this._tickMinG = this._svgEl('g', {});   /* pooled minor ticks   */
      this._numG = this._svgEl('g', {});       /* pooled numerals      */
      svg.appendChild(this._tickMinG);
      svg.appendChild(this._tickG);
      svg.appendChild(this._numG);

      this._zeroBlock = this._svgEl('rect', { 'class': 'urt-zeroblock', rx: 3 });
      svg.appendChild(this._zeroBlock);

      /* the record rail, under the numerals */
      this._railG = this._svgEl('g', { 'class': 'urt-rail' });
      this._railG.setAttribute('aria-label', api.t('recordLabel'));
      svg.appendChild(this._railG);

      /* the plate: contact shadow, the outline itself, then a clipped
         bevel so exactly half its stroke survives on the inside edge */
      var defs = this._svgEl('defs', {});
      var grad = this._svgEl('linearGradient', { id: 'urtPlate', x1: '0', y1: '0', x2: '0', y2: '1' });
      grad.appendChild(this._svgEl('stop', { offset: '0', 'stop-color': '#FFFFFF' }));
      grad.appendChild(this._svgEl('stop', { offset: '.55', 'stop-color': '#FFF7E9' }));
      grad.appendChild(this._svgEl('stop', { offset: '1', 'stop-color': '#F4E7CC' }));
      defs.appendChild(grad);
      this._clipPoly = this._svgEl('polygon', {});
      var clip = this._svgEl('clipPath', { id: 'urtPlateClip' });
      clip.appendChild(this._clipPoly);
      defs.appendChild(clip);
      svg.appendChild(defs);

      this._contact = this._svgEl('ellipse', { 'class': 'urt-contact' });
      svg.appendChild(this._contact);
      this._outlineEl = this._svgEl('polygon', { 'class': 'urt-outline' });
      svg.appendChild(this._outlineEl);
      this._bevel = this._svgEl('polygon', { 'class': 'urt-bevel', 'clip-path': 'url(#urtPlateClip)' });
      svg.appendChild(this._bevel);
      /* the hollow the strand leaves behind once it has gone */
      this._groove = this._svgEl('polygon', { 'class': 'urt-groove' });
      svg.appendChild(this._groove);

      /* the height, measured in the direction height IS. It used to be a
         bold horizontal bar starting at the runway's zero, parallel to
         the laid strand and inside its number space — which reads as a
         quantity to be compared, i.e. as an answer. */
      this._tall = this._svgEl('line', { 'class': 'urt-tall' });
      this._tallCapA = this._svgEl('line', { 'class': 'urt-tallcap' });
      this._tallCapB = this._svgEl('line', { 'class': 'urt-tallcap' });
      svg.appendChild(this._tall);
      svg.appendChild(this._tallCapA);
      svg.appendChild(this._tallCapB);

      /* the caliper — arms from the plate's own widest points down to the
         runway, with inward serifs gripping it. Vertical, so it can never
         collide with the horizontal cord. */
      this._jawL = this._svgEl('line', { 'class': 'urt-jaw' });
      this._jawR = this._svgEl('line', { 'class': 'urt-jaw' });
      this._jawSL = this._svgEl('line', { 'class': 'urt-jawsf' });
      this._jawSR = this._svgEl('line', { 'class': 'urt-jawsf' });
      this._unitWall = this._svgEl('line', { 'class': 'urt-unitwall' });
      svg.appendChild(this._jawL); svg.appendChild(this._jawR);
      svg.appendChild(this._jawSL); svg.appendChild(this._jawSR);
      svg.appendChild(this._unitWall);
      /* ⭐ THE PROMISED NUMERAL IS THE RUNWAY'S OWN FIRST-INTERVAL "1",
         WEIGHTED UP — not a second glyph on the plate.
         ⚠ I built it as a separate `.urt-jawnum` first and MEASURED it
         covered: `document.elementFromPoint` at its centre returned
         `urt-ferrule`. The strand's end sits at B, B sits at zero, and the
         plate's own centre is zero — so a numeral there lands underneath
         the one handle that is always parked on it. Weighting the numeral
         that already stands in the band removes the collision AND the
         redundancy: one glyph, in the interval whose length it names. */

      /* the strand: casing + core, identical points. A dash reads as a
         highlighter at a wide bench and disappears at a narrow one; cord
         character has to come from a RATIO, not a period. */
      this._strandCasing = this._svgEl('polyline', { 'class': 'urt-strand urt-strand-casing' });
      this._strandCore = this._svgEl('polyline', { 'class': 'urt-strand urt-strand-core' });
      svg.appendChild(this._strandCasing);
      svg.appendChild(this._strandCore);

      /* the zero riser is drawn AFTER the plate, so the plate can never
         hide zero again — there was no visible zero anywhere before */
      this._zeroRise = this._svgEl('line', { 'class': 'urt-zerorise' });
      svg.appendChild(this._zeroRise);
      this._flagFeet = this._svgEl('g', {});
      svg.appendChild(this._flagFeet);

      /* ---- the hit surfaces, as HTML over the bench -----------------
         ⭐ THE WHOLE RUNWAY PLANTS A FLAG. A teacher's first instinct on
         a whiteboard is to touch where the answer goes; making them find
         an 18px dot first was the entire defect. */
      var strip = api.el('div', 'urt-plant');
      strip.setAttribute('role', 'button');
      strip.setAttribute('tabindex', '0');
      strip.setAttribute('aria-label', api.t('runwayAria'));
      strip.addEventListener('pointerdown', function (ev) { self._plantFrom(ev); });
      strip.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') return;
        ev.preventDefault();
        self._plantAt(2);
      });
      this._strip = strip;
      bench.appendChild(strip);

      this._flagLayer = api.el('div', 'urt-flags');
      bench.appendChild(this._flagLayer);

      /* the strand's own end: a hollow ferrule, so it can never read as a
         filled answer-dot, and coral because it IS the cord's end */
      this._tip = this._handle('urt-tip', api.t('strandAria'));
      this._tip.appendChild(api.el('span', 'urt-ferrule'));
      this._tip.addEventListener('pointerdown', function (ev) { self._beginGesture('tip', ev, self._tip, 0); });
      this._tip.addEventListener('keydown', function (ev) { self._tipKey(ev); });
      bench.appendChild(this._tip);

      /* ⭐ THE PAID DELTA ON PAPER. The Print chip is entitlement-gated, so
         it has to hand a teacher something the screen cannot: the shape at
         TRUE SIZE, twice, on a cut line. A child winds real string round
         the small copy, lays it on the printed runway, then does the big
         copy — two strings of different lengths, two marks in different
         places, the SAME number. That is the whole lesson arriving through
         their own hands.
         ⚠ And it degrades to the FREE TIER, never to nothing: a free
         Ctrl+P still prints the apparatus, which is on screen anyway. Only
         the cut-outs are paid, so the chip gates a real thing rather than
         a keystroke — the recorded "gating the chip is not gating the
         feature" defect, answered by making the feature the difference. */
      this._sheet = api.el('div', 'urt-sheet');
      wrap.appendChild(this._sheet);
      wrap.appendChild(bench);

      /* ---- the shape shelf ------------------------------------------
         The Reuleaux — the best moment this apparatus has — used to be
         four presses deep and unnameable, and `nextShape` could never
         reach the gate because it only returns null on a shelf of one.
         So a free teacher cycled five shapes forever and was never told
         seven more existed. */
      var shelf = api.el('div', 'urt-shelf');
      shelf.setAttribute('role', 'group');
      shelf.setAttribute('aria-label', api.t('shelfLabel'));
      this._shelfEl = shelf;
      this._chips = [];
      var bk = this.book(), i;
      for (i = 0; i < bk.length; i++) {
        (function (idx) {
          var locked = self.isLocked(idx);
          var b = api.el('button', 'urt-chip-shape' + (locked ? ' urt-locked' : ''));
          b.type = 'button';
          var o = self.outlineFor(bk[idx]);
          var mini = self._svgEl('svg', { viewBox: '0 0 44 44', 'class': 'urt-mini', 'aria-hidden': 'true' });
          if (o) {
            mini.appendChild(self._svgEl('polygon', {
              points: self._pts(self.miniPointsBox(o, 22, 38, 30)), 'class': 'urt-miniline'
            }));
          }
          b.appendChild(mini);
          if (locked) b.appendChild(self._lockNode());
          b.addEventListener('click', function () {
            if (self.isLocked(idx)) { self._showGate(); return; }
            var n = self.pickShape(self.st, self.shelf(), idx);
            if (n) { self.st = n; self.render(); self._announceShape(); }
          });
          shelf.appendChild(b);
          self._chips.push(b);
        }(i));
      }
      wrap.appendChild(shelf);

      /* ---- the hint ladder ------------------------------------------ */
      this._hint = api.el('div', 'urt-hint');
      this._hintLine = api.el('span', 'urt-hline');
      this._hint.appendChild(this._hintLine);
      wrap.appendChild(this._hint);

      /* ---- the foot -------------------------------------------------- */
      var foot = api.el('div', 'urt-foot');
      this._goBtn = api.el('button', 'urt-chip urt-go');
      this._goBtn.type = 'button';
      this._goBtn.addEventListener('click', function () { self._animate(self.st.t >= 1 ? 0 : 1); });
      foot.appendChild(this._goBtn);

      /* ⭐ THE SIZE CONTROL IS DISCRETE, AND THE EDGE HANDLE IS GONE.
         A continuous drag is a ZOOM, and the eye reads it as one — one
         continuous picture, no before, no after. Invariance is evidence
         only when there are two separately witnessed trials with a
         prediction in between, and a wrist movement cannot hold a
         prediction. A handle on a shape's edge is also the universal
         gesture for DISTORT, in a tool whose premise is that the shape is
         never distorted. Three graduated circles, no words. */
      var sizeWrap = api.el('div', 'urt-size');
      sizeWrap.setAttribute('role', 'radiogroup');
      sizeWrap.setAttribute('aria-label', api.t('sizeAria'));
      this._sizeBtns = [];
      var names = ['sizeSmall', 'sizeMedium', 'sizeBig'];
      for (i = 0; i < this.SIZE_STEPS.length; i++) {
        (function (idx) {
          var b = api.el('button', 'urt-sz urt-sz' + idx);
          b.type = 'button';
          b.setAttribute('role', 'radio');
          b.setAttribute('aria-label', api.t(names[idx]));
          b.appendChild(api.el('span', 'urt-szdot'));
          b.addEventListener('click', function () {
            var o = self._currentOutline();
            var n = self.setSizeStep(self.st, o, idx);
            if (n) { self._animateSize(n.A); }
          });
          sizeWrap.appendChild(b);
          self._sizeBtns.push(b);
        }(i));
      }
      foot.appendChild(sizeWrap);

      this._nextBtn = api.el('button', 'urt-chip');
      this._nextBtn.type = 'button';
      this._nextBtn.addEventListener('click', function () {
        var sh2 = self.shelf();
        var atEnd = self.st.shape >= sh2.length - 1;
        /* ⭐ a free teacher who reaches the end of the free five is TOLD
           there are more, once, at the moment it is true */
        if (atEnd && !self.premium && self.book().length > sh2.length) { self._showGate(); }
        var n = self.nextShape(self.st, sh2);
        if (n) { self.st = n; self.render(); self._announceShape(); }
      });
      foot.appendChild(this._nextBtn);

      this._printBtn = api.el('button', 'urt-chip urt-lock');
      this._printBtn.type = 'button';
      this._printBtn.addEventListener('click', function () {
        if (!self.premium) { self._showGate(); return; }
        try { window.print(); } catch (_) {}
      });
      foot.appendChild(this._printBtn);
      wrap.appendChild(foot);

      stage.appendChild(wrap);

      /* ⭐ ONE MEASUREMENT, SHARED BY EVERY HIT BOX. `--urt-u` is bench px
         per model unit, so a target can be sized `max(44px, calc(N *
         var(--urt-u)))` and the "44 model units rendered 29px" trap stays
         closed at every viewport. */
      if (typeof ResizeObserver !== 'undefined') {
        try {
          if (this._ro && this._ro.disconnect) this._ro.disconnect();
          this._ro = new ResizeObserver(function () { self._measure(); });
          this._ro.observe(bench);
        } catch (_) {}
      }
    },

    /* a miniature fitted into a box — used by the shelf chips, where the
       box is square and the normalisation must not overflow it */
    miniPointsBox: function (o, cx, baseY, w) {
      var s = w / o.across;
      var maxH = 32;
      if (o.tallR * w > maxH) s = maxH / o.tall;
      var out = [], i, bx = (o.minX + o.across / 2), by = o.minY;
      for (i = 0; i < o.pts.length; i++) {
        out.push([cx + (o.pts[i][0] - bx) * s, baseY - (o.pts[i][1] - by) * s]);
      }
      return out;
    },

    _handle: function (cls, aria) {
      var b = this.api.el('button', 'urt-handle ' + cls);
      b.type = 'button';
      b.setAttribute('role', 'slider');
      b.setAttribute('aria-label', aria);
      return b;
    },

    _currentOutline: function () {
      var shelf = this.shelf();
      if (!shelf.length) return null;
      var shape = shelf[Math.min(this.st.shape, shelf.length - 1)];
      return this.outlineFor(shape);
    },

    _measure: function () {
      if (!this._bench) return;
      var r = this._bench.getBoundingClientRect();
      if (!r.width) return;
      this._bench.style.setProperty('--urt-u', (r.width / this.W) + 'px');
    },

    /* =================================================================
       PAINT — attribute mutation only. Nothing here creates or destroys
       a node, which is what lets a drag survive.
       ================================================================= */
    _paint: function () {
      var api = this.api, self = this;
      if (!this._svg) return;
      var shelf = this.shelf();
      if (!shelf.length) return;
      var idx = Math.min(this.st.shape, shelf.length - 1);
      var shape = shelf[idx];
      var o = this.outlineFor(shape);
      if (!o) return;

      /* render-local clamp: a stale A can never draw off-stage, and the
         clamp does NOT mutate the state */
      var A = Math.max(this.A_MIN, Math.min(this.st.A, this.aMax(o)));
      var X0 = this.x0For(o, A);
      var scale = A / o.across;
      var hasMarks = this.marks && this.marks.length > 0;
      var vb = this.viewBox(o, A, hasMarks);
      this._vbTop = vb.top; this._vbH = vb.h;
      this._set(this._svg, { viewBox: '0 ' + vb.top + ' ' + this.W + ' ' + vb.h });
      this._bench.style.setProperty('--urt-aspect', (vb.h / this.W).toFixed(4));
      this._bench.style.paddingBottom = (vb.h / this.W * 100).toFixed(3) + '%';
      this._measure();

      var BASE = this.BASE;
      this._set(this._deck, { y: BASE, height: (BASE + this.BELOW_FULL) - BASE });
      this._set(this._rule, { x1: X0, y1: BASE, x2: this.RIGHT, y2: BASE });

      /* ---- ticks + numerals, pooled --------------------------------- */
      var whole = Math.floor((this.RIGHT - X0) / A);
      this._syncPool(this._tickG, 'line', whole + 1, function (el, i) {
        var x = X0 + i * A;
        self._set(el, { 'class': 'urt-tick', x1: x, y1: BASE, x2: x, y2: BASE + 20 });
      });
      this._syncPool(this._tickMinG, 'line', whole, function (el, i) {
        var x = X0 + (i + 0.5) * A;
        self._set(el, { 'class': 'urt-tick-min', x1: x, y1: BASE, x2: x, y2: BASE + 9 });
      });
      this._syncPool(this._numG, 'text', whole, function (el, i) {
        /* the FIRST interval's numeral is the unit's own numeral, so it
           carries more weight than the ones that merely count along */
        self._set(el, { 'class': 'urt-num' + (i === 0 ? ' urt-num-u' : ''),
          x: X0 + (i + 0.5) * A, y: self.NUM_Y });
        el.textContent = String(i + 1);
      });

      /* the unit: a tinted band over the FIRST interval, its right wall,
         and the caliper on the plate's own edges. The offset between them
         is inherent — B must sit at zero for the strand to lay from zero,
         so a symmetric plate straddles it — which is exactly why the same
         length is shown twice. */
      this._set(this._unitBand, { x: X0, y: BASE + 4, width: A, height: 30 });
      this._set(this._unitWall, { x1: X0 + A, y1: BASE - 14, x2: X0 + A, y2: BASE + 34 });
      this._set(this._zeroBlock, { x: X0 - 14, y: BASE, width: 14, height: 34 });
      this._set(this._zeroRise, { x1: X0, y1: BASE - 26, x2: X0, y2: BASE + 34 });

      var left = X0 + (o.minX - o.pts[0][0]) * scale;
      var yL = BASE - (o.yAtMinX - o.pts[0][1]) * scale;
      var yR = BASE - (o.yAtMaxX - o.pts[0][1]) * scale;
      this._set(this._jawL, { x1: left, y1: yL, x2: left, y2: BASE + 6 });
      this._set(this._jawR, { x1: left + A, y1: yR, x2: left + A, y2: BASE + 6 });
      this._set(this._jawSL, { x1: left, y1: yL, x2: left + Math.min(14, A * 0.16), y2: yL });
      this._set(this._jawSR, { x1: left + A, y1: yR, x2: left + A - Math.min(14, A * 0.16), y2: yR });

      /* ---- the plate ------------------------------------------------ */
      var okey = shape.k + '|' + A;
      if (okey !== this._okey) {
        var op = this._pts(this.outlinePoints(o, this.st, A));
        this._set(this._outlineEl, { points: op });
        this._set(this._bevel, { points: op });
        this._set(this._clipPoly, { points: op });
        this._set(this._groove, { points: op });
        this._okey = okey;
      }
      var laid = this.st.t >= 1;
      this._set(this._contact, {
        cx: left + A / 2, cy: BASE + 3, rx: A * 0.46, ry: laid ? 4 : 6,
        'fill-opacity': laid ? 0.22 : 0.16
      });
      this._groove.style.display = laid ? '' : 'none';

      /* the height, standing up where a height belongs */
      var tallPx = o.tallR * A;
      var showTall = tallPx >= 46;
      var cx = left + A / 2;
      this._tall.style.display = this._tallCapA.style.display = this._tallCapB.style.display = showTall ? '' : 'none';
      if (showTall) {
        this._set(this._tall, { x1: cx, y1: BASE - 3, x2: cx, y2: BASE - tallPx + 3 });
        this._set(this._tallCapA, { x1: cx - 9, y1: BASE - 3, x2: cx + 9, y2: BASE - 3 });
        this._set(this._tallCapB, { x1: cx - 9, y1: BASE - tallPx + 3, x2: cx + 9, y2: BASE - tallPx + 3 });
      }

      /* ---- the strand ----------------------------------------------- */
      var skey = okey + '|' + this.st.t;
      if (skey !== this._skey) {
        var sp = this._pts(this.strandPoints(o, this.st, A));
        this._set(this._strandCasing, { points: sp });
        this._set(this._strandCore, { points: sp });
        this._skey = skey;
      }

      this._paintSheet(o);
      /* ---- the record rail ------------------------------------------ */
      this._paintRail(A, X0);

      /* ---- the flags ------------------------------------------------- */
      this._paintFlags(o, A, X0);

      /* ---- the hit surfaces ------------------------------------------ */
      this._strip.style.left = (X0 / this.W * 100) + '%';
      this._strip.style.width = ((this.RIGHT - X0) / this.W * 100) + '%';
      this._strip.style.top = this._pctY(BASE + 12) + '%';
      var live = this.st.t === 0 && !this.st.committed;
      this._strip.style.display = live ? '' : 'none';

      var tipX = X0 + (o.L * scale) * this.st.t;
      var tipY = this.st.t >= 1 ? BASE : this._strandTipY(o, A);
      this._tip.style.left = (tipX / this.W * 100) + '%';
      this._tip.style.top = this._pctY(tipY) + '%';
      this._tip.setAttribute('aria-valuemin', '0');
      this._tip.setAttribute('aria-valuemax', '100');
      this._tip.setAttribute('aria-valuenow', String(Math.round(this.st.t * 100)));
      /* ⚠ PERCENT OF THE LAY, NEVER ACROSSES. In acrosses this value at
         t=1 IS the total, which the tool refuses to print. */
      this._tip.setAttribute('aria-valuetext', Math.round(this.st.t * 100) + '%');

      /* ---- chrome ---------------------------------------------------- */
      this._goBtn.textContent = api.t(laid ? 'rollBackBtn' : 'unrollBtn');
      this._nextBtn.textContent = api.t('nextShapeBtn');
      this._printBtn.textContent = api.t('printBtn');
      this._hintLine.textContent = api.t(
        laid ? 'hintLanded' : (this.st.flags.length === 0 ? 'hintGuess' : 'hintUnroll'));

      var si = this.sizeIndexOf(o, A), i;
      for (i = 0; i < this._sizeBtns.length; i++) {
        this._sizeBtns[i].setAttribute('aria-checked', String(i === si));
        if (i === si) this._sizeBtns[i].classList.add('urt-on');
        else this._sizeBtns[i].classList.remove('urt-on');
      }
      for (i = 0; i < this._chips.length; i++) {
        var bk = this.book()[i];
        var nm = this.shapeName(bk && bk.k);
        var lk = this.isLocked(i);
        this._chips[i].setAttribute('aria-label', lk ? nm + ' — ' + api.t('lockedSuffix') : nm);
        this._chips[i].setAttribute('aria-pressed', String(i === idx));
        if (i === idx) this._chips[i].classList.add('urt-on');
        else this._chips[i].classList.remove('urt-on');
      }
      this._wrap.classList[laid ? 'add' : 'remove']('urt-landed');
      this._wrap.classList[this.premium ? 'add' : 'remove']('urt-paid');
      document.body.classList[this.premium ? 'add' : 'remove']('urt-paid');
    },

    /* the screen y of the strand's free end while it is still coming off */
    _strandTipY: function (o, A) {
      var p = this.strandPoints(o, this.st, A);
      return p.length ? p[0][1] : this.BASE;
    },
    _pctY: function (y) { return ((y - this._vbTop) / this._vbH * 100).toFixed(3); },

    _syncPool: function (g, tag, n, fill) {
      var i, el;
      while (g.childNodes.length < n) g.appendChild(this._svgEl(tag, {}));
      for (i = 0; i < g.childNodes.length; i++) {
        el = g.childNodes[i];
        if (i < n) { el.style.display = ''; fill(el, i); }
        else el.style.display = 'none';
      }
    },

    /* ⭐ TWO MARKS AT THE SAME PLACE IS THE WHOLE POINT, SO THEY MUST NOT
       HIDE EACH OTHER. The circle and the Reuleaux land at 3.1416 to
       eight figures — that IS Barbier — and drawn on one line their
       miniatures sat exactly on top of one another and became a single
       illegible glyph, destroying the best moment the apparatus has.
       A mark closer than one miniature-width to one already placed drops
       to the next row. Rows, never hiding. */
    _railRows: function (list, A, X0) {
      var placed = [], out = [], i, j, row, x;
      for (i = 0; i < list.length; i++) {
        x = X0 + list[i].a * A;
        row = 0;
        for (j = 0; j < placed.length; j++) {
          if (Math.abs(placed[j].x - x) < this.MINI_W + 4 && placed[j].row === row) { row++; j = -1; }
        }
        placed.push({ x: x, row: row });
        out.push({ m: list[i], x: x, row: row });
      }
      return out;
    },

    /* the shape at TRUE SIZE, on a cut line, twice. Sized in mm so a
       printer produces the real thing rather than a screenshot of one. */
    _paintSheet: function (o) {
      var sheet = this._sheet;
      if (!sheet || !o) return;
      var key = o.k + "|sheet";
      if (sheet.getAttribute("data-k") === key) return;
      sheet.setAttribute("data-k", key);
      sheet.innerHTML = "";
      var mm = [25, 50], i;
      for (i = 0; i < mm.length; i++) {
        var w = mm[i], h = w * o.tallR;
        var svg = this._svgEl("svg", {
          "class": "urt-cut", width: w + "mm", height: h + "mm",
          viewBox: "0 0 100 " + (100 * o.tallR).toFixed(3)
        });
        /* unit space -> viewBox, y flipped, normalised on the bbox */
        var pts = [], j, sc = 100 / o.across;
        for (j = 0; j < o.pts.length; j++) {
          pts.push([(o.pts[j][0] - o.minX) * sc, (100 * o.tallR) - (o.pts[j][1] - o.minY) * sc]);
        }
        svg.appendChild(this._svgEl("polygon", { points: this._pts(pts), "class": "urt-cutline" }));
        /* the notch at B — where the string starts and where it stops */
        var bx = (o.pts[0][0] - o.minX) * sc, by = (100 * o.tallR) - (o.pts[0][1] - o.minY) * sc;
        svg.appendChild(this._svgEl("line", {
          x1: bx, y1: by - 5, x2: bx, y2: by + 5, "class": "urt-cutnotch"
        }));
        sheet.appendChild(svg);
      }
    },

    _paintRail: function (A, X0) {
      var self = this;
      var list = this._railRows(this.marks || [], A, X0);
      this._syncPool(this._railG, 'g', list.length, function (g, i) {
        var m = list[i].m;
        var x = list[i].x;
        var rowY = self.RAIL_BASE + list[i].row * 34;
        while (g.childNodes.length < 2) {
          g.appendChild(self._svgEl(g.childNodes.length === 0 ? 'line' : 'polygon', {}));
        }
        self._set(g.childNodes[0], { 'class': 'urt-markline', x1: x, y1: self.BASE, x2: x, y2: rowY - 4 });
        var sh = null, bk = self.book(), j;
        for (j = 0; j < bk.length; j++) if (bk[j].k === m.k) sh = bk[j];
        var o2 = sh ? self.outlineFor(sh) : null;
        self._set(g.childNodes[1], {
          'class': 'urt-markmini',
          points: o2 ? self._pts(self.miniPointsBox(o2, x, rowY, self.MINI_W)) : ''
        });
      });
    },

    _paintFlags: function (o, A, X0) {
      var self = this, api = this.api;
      var flags = this.st.flags;
      var live = this.st.t === 0 && !this.st.committed;
      var layer = this._flagLayer;
      var want = flags.length + (live && flags.length < this.MAX_FLAGS ? 1 : 0);

      while (layer.childNodes.length < want) {
        var b = api.el('button', 'urt-handle urt-flag');
        b.type = 'button';
        b.setAttribute('role', 'slider');
        b.appendChild(this._flagNode());
        (function (el) {
          el.addEventListener('pointerdown', function (ev) {
            var i = parseInt(el.getAttribute('data-i'), 10);
            if (el.classList.contains('urt-ghost')) { self._plantFrom(ev); return; }
            self._beginGesture('flag', ev, el, i);
          });
          el.addEventListener('click', function (ev) {
            /* a real drag has already done the work; a bare click on the
               ghost is a complete gesture on its own */
            if (self._movedAt && Date.now() - self._movedAt < 400) return;
            if (!el.classList.contains('urt-ghost')) return;
            ev.preventDefault();
            self._plantAt(parseFloat(el.getAttribute('data-a')) || 0.5);
          });
          el.addEventListener('keydown', function (ev) { self._flagKey(ev, el); });
        }(b));
        layer.appendChild(b);
      }
      var i2, el2;
      for (i2 = 0; i2 < layer.childNodes.length; i2++) {
        el2 = layer.childNodes[i2];
        /* ⚠ A POOLED NODE THAT IS HIDDEN MUST ALSO BE DISABLED. It kept
           its enabled state from whenever it was last live, so a spare flag
           left over from a three-flag round stayed a reachable control while
           invisible — measured by the every()-is-disabled assertion. */
        if (i2 >= want) { el2.style.display = 'none'; el2.disabled = true; continue; }
        el2.style.display = '';
        var ghost = i2 >= flags.length;
        /* ⭐ THE UN-PLANTED FLAG PARKS AT THE PLATE'S RIGHT EDGE, half an
           across out — NOT at two acrosses, where it used to sit. The
           lowest ratio in the whole book is 2.30, so a child who tapped
           the old resting place without thinking was within a third of a
           step of the answer on the default shape. Half an across can
           never be accidentally right, and touching the plate reads as
           "pull me out from here". */
        var a = ghost ? 0.5 : flags[i2];
        el2.setAttribute('data-i', String(i2));
        el2.setAttribute('data-a', String(a));
        el2.classList[ghost ? 'add' : 'remove']('urt-ghost');
        el2.style.left = ((X0 + a * A) / this.W * 100) + '%';
        el2.style.top = this._pctY(this.BASE) + '%';
        el2.setAttribute('aria-label', api.t('flagAria'));
        el2.setAttribute('aria-valuemin', '0');
        el2.setAttribute('aria-valuemax', ((this.RIGHT - X0) / A).toFixed(2));
        el2.setAttribute('aria-valuenow', a.toFixed(2));
        el2.setAttribute('aria-valuetext', a.toFixed(2) + ' ' + api.t('acrossUnit'));
        /* ⭐ THE PLANTED FLAG STAYS — the guess is never removed, never
           marked and never scored; it simply stands where it was put,
           beside where the strand landed. But once committed it must not
           still LOOK grabbable: the model refuses the move, and a control
           that invites a gesture it will refuse is the other half of the
           same defect. Both, not either. */
        el2.disabled = !live;
        el2.classList[live ? 'remove' : 'add']('urt-fixed');
      }
      /* a planted flag's foot, so the position is legible against the ticks */
      this._syncPool(this._flagFeet, 'rect', flags.length, function (r, i) {
        self._set(r, { 'class': 'urt-flagfoot', x: X0 + flags[i] * A - 3, y: self.BASE, width: 6, height: 20, rx: 2 });
      });
    },

    /* =================================================================
       ONE GESTURE OBJECT, WIRED ONCE, ON WINDOW.

       ⚠ {passive:false} — a window-level pointermove listener is passive
       by default in Chrome and preventDefault would be a silent no-op.
       ⚠ pointercancel AND blur end it too; a stream that ends any other
       way used to leak the listener.
       ⚠ AND THE PENDING FRAME IS FLUSHED ON RELEASE, NEVER CANCELLED —
       cancelling discards the last move, so a quick flick (down, one
       move, up) moves nothing. Real children flick.
       ================================================================= */
    _wirePointer: function () {
      if (this._wired) return;
      this._wired = true;
      var self = this;
      var move = function (ev) {
        var g = self._gesture;
        if (!g || ev.pointerId !== g.id) return;
        ev.preventDefault();
        g.pending = ev.clientX;
        g.moved = true;
        if (g.raf) return;
        g.raf = requestAnimationFrame(function () {
          g.raf = null;
          if (self._gesture !== g || g.pending === null) return;
          self._applyDrag(g, g.pending);
        });
      };
      var end = function (ev) {
        var g = self._gesture;
        if (!g) return;
        if (ev && ev.pointerId !== undefined && ev.pointerId !== g.id) return;
        if (g.raf) cancelAnimationFrame(g.raf);
        if (g.pending !== null) self._applyDrag(g, g.pending);
        self._movedAt = g.moved ? Date.now() : 0;
        if (g.el) {
          g.el.classList.remove('urt-dragging');
          try { if (g.el.releasePointerCapture) g.el.releasePointerCapture(g.id); } catch (_) {}
        }
        self._gesture = null;
        self.render();
      };
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
      window.addEventListener('blur', end);
    },

    _beginGesture: function (kind, ev, el, i) {
      if (this._gesture) return;
      if (ev.button !== undefined && ev.button > 0) return;
      if (ev.isPrimary === false) return;
      if (!this._bench) return;
      ev.preventDefault();
      var rect = this._bench.getBoundingClientRect();
      if (!rect.width) return;
      var o = this._currentOutline();
      var A = o ? Math.max(this.A_MIN, Math.min(this.st.A, this.aMax(o))) : this.st.A;
      var X0 = this.x0For(o, A);
      var mx = (ev.clientX - rect.left) / rect.width * this.W;
      /* offset-preserving: the flag must not jump under the finger that
         is already holding it. The runway strip is the opposite — there,
         jumping to the point IS the gesture. */
      var grab = 0;
      if (kind === 'flag' && this.st.flags[i] !== undefined) {
        grab = this.st.flags[i] - (mx - X0) / A;
      }
      this._gesture = { kind: kind, id: ev.pointerId, el: el, rect: rect, i: i, grab: grab,
        raf: null, pending: null, moved: false };
      try { if (el && el.setPointerCapture) el.setPointerCapture(ev.pointerId); } catch (_) {}
      if (el) el.classList.add('urt-dragging');
    },

    _applyDrag: function (g, clientX) {
      var o = this._currentOutline();
      if (!o || !g.rect.width) return;
      var A = Math.max(this.A_MIN, Math.min(this.st.A, this.aMax(o)));
      var X0 = this.x0For(o, A);
      var mx = (clientX - g.rect.left) / g.rect.width * this.W;
      var n = null;
      if (g.kind === 'flag') {
        n = this.moveFlag(this.st, o, g.i, (mx - X0) / A + g.grab);
      } else if (g.kind === 'plant') {
        n = this.moveFlag(this.st, o, g.i, (mx - X0) / A);
      } else {
        n = this.setPeel(this.st, (mx - X0) / (o.L * (A / o.across)));
      }
      if (n) { this.st = n; this._paint(); }
    },

    /* tapping the runway: plant a new flag there and keep dragging it in
       the same gesture; once all three are out, move the nearest */
    _plantFrom: function (ev) {
      if (this._gesture) return;
      if (!this._bench) return;
      var rect = this._bench.getBoundingClientRect();
      if (!rect.width) return;
      var o = this._currentOutline();
      if (!o) return;
      var A = Math.max(this.A_MIN, Math.min(this.st.A, this.aMax(o)));
      var X0 = this.x0For(o, A);
      var a = ((ev.clientX - rect.left) / rect.width * this.W - X0) / A;
      var i = this._plantAt(a);
      if (i < 0) return;
      ev.preventDefault();
      this._gesture = { kind: 'plant', id: ev.pointerId, el: null, rect: rect, i: i, grab: 0,
        raf: null, pending: null, moved: false };
    },
    _plantAt: function (a) {
      var o = this._currentOutline();
      if (!o) return -1;
      var n, i;
      if (this.st.flags.length < this.MAX_FLAGS) {
        n = this.addFlag(this.st, o, a);
        if (!n) return -1;
        i = n.flags.length - 1;
      } else {
        i = this.nearestFlag(this.st, a);
        n = this.moveFlag(this.st, o, i, a);
        if (!n) return -1;
      }
      this.st = n;
      this.render();
      return i;
    },

    _flagKey: function (ev, el) {
      var i = parseInt(el.getAttribute('data-i'), 10);
      var cur = parseFloat(el.getAttribute('data-a')) || 0.5;
      var o = this._currentOutline();
      if (!o) return;
      if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
        ev.preventDefault();
        if (el.classList.contains('urt-ghost')) this._plantAt(cur);
        return;
      }
      /* ⚠ 12 MODEL UNITS WAS 0.046 ACROSSES — twenty-two presses to cross
         one tick. The step is now sized in the tool's own unit. */
      var step = ev.shiftKey ? 1 : 0.1;
      var d = (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') ? -step
        : (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') ? step
          : (ev.key === 'PageDown') ? -1 : (ev.key === 'PageUp') ? 1
            : (ev.key === 'Home') ? -99 : (ev.key === 'End') ? 99 : 0;
      if (!d) return;
      ev.preventDefault();
      var A = Math.max(this.A_MIN, Math.min(this.st.A, this.aMax(o)));
      var hi = (this.RIGHT - this.x0For(o, A)) / A;
      var target = Math.max(0.1, Math.min(hi, d === -99 ? 0.1 : d === 99 ? Math.floor(hi) : cur + d));
      if (el.classList.contains('urt-ghost')) { this._plantAt(target); return; }
      var n = this.moveFlag(this.st, o, i, target);
      if (n) { this.st = n; this.render(); }
    },
    _tipKey: function (ev) {
      var d = (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') ? -0.1
        : (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') ? 0.1
          : (ev.key === 'Home') ? -9 : (ev.key === 'End') ? 9
            : (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') ? 9 : 0;
      if (!d) return;
      ev.preventDefault();
      var target = d === 9 ? 1 : d === -9 ? 0 : this.st.t + d;
      if (Math.abs(d) === 9) { this._animate(target); return; }
      var n = this.setPeel(this.st, target);
      if (n) { this.st = n; this.render(); }
    },

    _announceShape: function () {
      var shelf = this.shelf();
      var sh = shelf[Math.min(this.st.shape, shelf.length - 1)];
      if (sh && this.api && this.api.announce) this.api.announce(this.shapeName(sh.k));
    },

    /* the peel, animated. prefers-reduced-motion → one step. */
    _animate: function (to) {
      var self = this;
      if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
      var finish = function () {
        if (self.st.t >= 1) self._recordLanding();
      };
      var reduce = false;
      try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) {}
      if (reduce) {
        var n0 = this.setPeel(this.st, to);
        if (n0) { this.st = n0; this.render(); }
        finish();
        return;
      }
      var from = this.st.t, t0 = null, dur = 900;
      var step = function (ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        var n = self.setPeel(self.st, from + (to - from) * e);
        if (n) { self.st = n; self._paint(); }
        if (p < 1) self._raf = requestAnimationFrame(step);
        else { self._raf = null; finish(); self.render(); }
      };
      this._raf = requestAnimationFrame(step);
    },

    /* ⭐ the size change is ANIMATED, because the payoff is watching the
       strand's end and its own mark travel outward together and stay
       together. That is the whole of Move 4 in one gesture. */
    _animateSize: function (to) {
      var self = this;
      if (this._sizeRaf) { cancelAnimationFrame(this._sizeRaf); this._sizeRaf = null; }
      var from = this.st.A;
      var reduce = false;
      try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) {}
      if (reduce || from === to) { this.st.A = to; this.render(); return; }
      var t0 = null, dur = 850;
      var step = function (ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        self.st.A = Math.round(from + (to - from) * e);
        self._paint();
        if (p < 1) self._sizeRaf = requestAnimationFrame(step);
        else { self._sizeRaf = null; self.st.A = to; self.render(); }
      };
      this._sizeRaf = requestAnimationFrame(step);
    },

    _recordLanding: function () {
      var o = this._currentOutline();
      var shelf = this.shelf();
      var sh = shelf[Math.min(this.st.shape, shelf.length - 1)];
      if (!o || !sh) return;
      var before = (this.marks || []).length;
      this.marks = this.addMark(this.marks, sh.k, o.R);
      if ((this.marks || []).length !== before) this.render(); else this._paint();
    },

    _showGate: function () {
      var api = this.api;
      if (!this._wrap) return;
      if (this._wrap.querySelector('.urt-gate')) return;
      var g = api.el('div', 'urt-gate');
      var h = api.el('div', 'urt-gatetitle');
      h.textContent = api.t('gateTitle');
      var p = api.el('div', '');
      p.textContent = api.t('gateBody');
      var a = api.el('a', '');
      a.href = '/pricing';
      a.textContent = api.t('gateCta');
      g.appendChild(h); g.appendChild(p); g.appendChild(a);
      this._wrap.appendChild(g);
    }
  };

  /* ===================================================================
     CSS — scoped to .urt-, injected once.
     =================================================================== */
  var cssDone = false;
  function injectUnrollTapeCSS() {
    if (cssDone) return;
    cssDone = true;
    var css = ''
      + '.urt-wrap{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;}'
      /* the bench holds its own aspect via padding-bottom, set per paint,
         so the SVG can crop to the shape without any viewport unit.
         ⚠ NO vh/svh ANYWHERE — forbidden inside a manipulative, and it is
         the unit that caused the shell's own iframe-feedback bug. */
      + '.urt-bench{position:relative;width:100%;max-width:660px;height:0;border-radius:20px;'
      + 'background-color:#F7EEDB;'
      + 'background-image:linear-gradient(180deg,#FAF2E1 0%,#F1E7D0 42%,#E5D6B8 100%);'
      + 'border:1px solid rgba(15,74,64,.20);overflow:hidden;'
      + 'box-shadow:inset 0 1px 0 rgba(255,255,255,.90),inset 0 -2px 0 rgba(15,74,64,.06),'
      + '0 1px 0 rgba(255,255,255,.70),0 12px 24px -14px rgba(15,74,64,.34);}'
      + '.urt-svg{position:absolute;inset:0;display:block;width:100%;height:100%;}'
      + '.urt-deck{fill:#0F4A40;fill-opacity:.06;}'
      /* the strand: a casing and a core, never a dash. A 6/5 dash is under
         2px at a 320px bench and a highlighter at 1740. */
      + '.urt-strand{fill:none;stroke-linecap:round;stroke-linejoin:round;}'
      + '.urt-strand-casing{stroke:#C8613A;stroke-width:9.5;}'
      + '.urt-strand-core{stroke:#F2784B;stroke-width:5.5;}'
      + '.urt-outline{fill:url(#urtPlate);stroke:#146B5E;stroke-width:3.5;stroke-linejoin:round;}'
      + '.urt-bevel{fill:none;stroke:#FFFFFF;stroke-opacity:.72;stroke-width:5;stroke-linejoin:round;}'
      + '.urt-contact{fill:#0F4A40;}'
      + '.urt-groove{fill:none;stroke:#0F4A40;stroke-opacity:.13;stroke-width:8;stroke-linejoin:round;}'
      + '.urt-rule{stroke:#0F4A40;stroke-width:3;stroke-linecap:round;}'
      + '.urt-tick{stroke:#0F4A40;stroke-width:3;}'
      + '.urt-tick-min{stroke:#146B5E;stroke-width:2;stroke-opacity:.38;}'
      + '.urt-zeroblock{fill:#0F4A40;}'
      + '.urt-zerorise{stroke:#0F4A40;stroke-width:5;stroke-linecap:round;}'
      /* ⚠⚠ LONGHAND, NOT THE `font:` SHORTHAND. These rules used to read
         `font:700 22px Baloo 2,...`, and an UNQUOTED `Baloo 2` inside a
         shorthand is invalid — a family identifier may not begin with a
         digit, so the family list is invalid and the WHOLE declaration is
         dropped: size, weight and family together. MEASURED: computed
         16px/400/Times against the 22px/700 asked for. Longhand cannot
         fail this way. */
      + '.urt-num{fill:#3C6E63;font-weight:700;font-size:26px;'
      + 'font-family:"Baloo 2",Nunito,sans-serif;text-anchor:middle;}'
      + '.urt-num-u{fill:#0F4A40;font-weight:800;font-size:34px;}'
      + '.urt-unit{fill:#146B5E;fill-opacity:.19;}'
      + '.urt-unitwall{stroke:#0F4A40;stroke-width:4;stroke-linecap:round;}'
      + '.urt-jaw,.urt-jawsf{stroke:#0F4A40;stroke-width:4.5;stroke-linecap:round;}'
      /* the height is dashed and vertical — a measurement OF THE OBJECT,
         never confusable with the solid cord lying along the runway */
      + '.urt-tall{fill:none;stroke:#146B5E;stroke-width:3.5;stroke-opacity:.45;'
      + 'stroke-dasharray:10 8;}'
      + '.urt-tallcap{stroke:#146B5E;stroke-width:3.5;stroke-opacity:.45;stroke-linecap:round;}'
      + '.urt-markline{stroke:#0F4A40;stroke-width:2;stroke-opacity:.34;stroke-dasharray:4 5;}'
      + '.urt-markmini{fill:#0F4A40;fill-opacity:.10;stroke:#0F4A40;stroke-opacity:.42;stroke-width:2;}'
      + '.urt-flagfoot{fill:#0F4A40;}'
      /* ---- hit surfaces ------------------------------------------- */
      + '.urt-plant{position:absolute;transform:translateY(-50%);'
      + 'height:max(44px,calc(60 * var(--urt-u,.66px)));background-color:transparent;'
      + 'cursor:pointer;touch-action:none;border-radius:10px;}'
      + '.urt-plant:focus-visible{outline:3px solid #146B5E;outline-offset:-3px;}'
      + '.urt-flags{position:absolute;inset:0;pointer-events:none;}'
      + '.urt-flags>*{pointer-events:auto;}'
      + '.urt-handle{position:absolute;padding:0;border:0;background-color:transparent;'
      + 'cursor:grab;touch-action:none;display:flex;align-items:center;justify-content:center;}'
      + '.urt-handle.urt-dragging,.urt-handle:active{cursor:grabbing;}'
      + '.urt-handle.urt-fixed{cursor:default;}'
      + '.urt-tip{width:48px;height:48px;transform:translate(-50%,-50%);border-radius:50%;}'
      + '.urt-ferrule{display:block;width:26px;height:26px;border-radius:50%;'
      + 'background-color:#FBF3E4;box-shadow:inset 0 0 0 6px #F2784B,0 0 0 3px #0F4A40;}'
      + '.urt-tip:focus-visible .urt-ferrule{box-shadow:inset 0 0 0 6px #F2784B,0 0 0 3px #0F4A40,0 0 0 6px #146B5E;}'
      /* ---- the flag: HTML, so it holds a pixel floor --------------- */
      + '.urt-flag{width:52px;height:76px;transform:translate(-50%,-100%);}'
      + '.urt-fl{position:absolute;left:50%;bottom:0;width:0;height:0;'
      + 'transform:scale(var(--urt-fs,1));transform-origin:50% 100%;}'
      + '.urt-fl-pole{position:absolute;left:-2.5px;bottom:6px;width:5px;height:52px;'
      + 'border-radius:2.5px;background-color:#0F4A40;}'
      + '.urt-fl-cloth{position:absolute;left:2.5px;bottom:42px;width:26px;height:20px;'
      + 'background-color:#FBF3E4;border:2.5px solid #0F4A40;box-sizing:content-box;}'
      + '.urt-fl-q1{position:absolute;left:0;top:0;width:13px;height:10px;background-color:#146B5E;}'
      + '.urt-fl-q2{position:absolute;left:13px;top:10px;width:13px;height:10px;background-color:#146B5E;}'
      + '.urt-fl-boot{position:absolute;left:-13px;bottom:0;width:26px;height:8px;'
      + 'border-radius:3px;background-color:#0F4A40;}'
      + '.urt-fl-shadow{position:absolute;left:-15px;bottom:-5px;width:30px;height:7px;'
      + 'border-radius:50%;background-color:rgba(15,74,64,.26);}'
      + '.urt-flag:focus-visible .urt-fl-cloth{outline:3px solid #146B5E;outline-offset:3px;}'
      /* ⭐ THE UN-PLANTED FLAG IS LIFTED, NOT FADED. 45% opacity was the
         old treatment and it is the universal DISABLED signal — a strong
         candidate for why nobody ever tried to drag it. */
      + '.urt-flag.urt-ghost .urt-fl{animation:urt-bob 2.4s ease-in-out infinite alternate;}'
      + '.urt-flag.urt-ghost .urt-fl-boot{background-color:#F2784B;}'
      + '.urt-flag.urt-ghost .urt-fl-shadow{width:36px;left:-18px;bottom:-9px;'
      + 'background-color:rgba(15,74,64,.14);}'
      + '@keyframes urt-bob{from{transform:scale(var(--urt-fs,1)) translateY(0);}'
      + 'to{transform:scale(var(--urt-fs,1)) translateY(-6px);}}'
      /* ---- the shape shelf ---------------------------------------- */
      /* ⚠ ALL TWELVE MUST FIT WITHOUT SCROLLING at the width the tool
         actually gets. MEASURED at 52px + 6px gap: scrollWidth 718 against
         a 680 client, so the twelfth chip was cut off at the edge and
         looked broken rather than scrollable. 48 + 5 gives 631 of 676. */
      /* ⚠⚠ `justify-content:center` ON AN OVERFLOWING FLEX ROW PUTS THE FIRST
         ITEMS IN NEGATIVE SPACE THAT NO SCROLL CAN REACH. At 360 the twelve
         chips need 631px of a ~330px rail, and the render showed the shelf
         parked mid-row with the CIRCLE — the first shape, the one the whole
         pedagogical order is built on — unreachable off the left edge.
         `safe center` centres only while it fits and falls back to
         flex-start when it does not; the plain declaration before it is the
         fallback for anything that does not understand `safe`. */
      + '.urt-shelf{display:flex;flex-wrap:nowrap;overflow-x:auto;gap:5px;width:100%;'
      + 'max-width:660px;padding:2px;justify-content:flex-start;'
      + 'justify-content:safe center;scroll-snap-type:x proximity;}'
      + '.urt-chip-shape{position:relative;flex:0 0 auto;width:48px;height:48px;padding:0;'
      + 'border:2px solid rgba(20,107,94,.28);border-radius:14px;background-color:#FBF3E4;'
      + 'cursor:pointer;scroll-snap-align:start;}'
      + '.urt-chip-shape.urt-on{border-color:#146B5E;box-shadow:0 3px 0 rgba(15,74,64,.18);'
      + 'transform:translateY(-2px);}'
      + '.urt-chip-shape:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
      + '.urt-mini{display:block;width:100%;height:100%;}'
      + '.urt-miniline{fill:rgba(20,107,94,.12);stroke:#146B5E;stroke-width:2;}'
      + '.urt-locked .urt-miniline{fill:none;stroke-dasharray:5 4;stroke:#8A5A3B;}'
      /* ⚠ RENAMED FROM `.urt-lock`, WHICH THE PRINT CHIP ALSO CARRIES AS ITS
   modifier. The padlock's `position:absolute;width:15px` was therefore
   applying to the Print BUTTON: measured 34px wide, out of flow, parked
   in the card's bottom-right corner and clipped by its edge. Two things
   named the same thing, and only one of them looked broken. */
      + '.urt-padlock{position:absolute;right:2px;bottom:2px;width:15px;height:15px;}'
      + '.urt-padlockbody{fill:#8A5A3B;}'
      + '.urt-padlockshackle{fill:none;stroke:#8A5A3B;stroke-width:2.2;}'
      /* ---- foot ---------------------------------------------------- */
      + '.urt-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;'
      + 'align-items:center;width:100%;max-width:660px;}'
      /* ⚠ flex:0 0 auto, OR THEY SQUASH INSTEAD OF WRAPPING. MEASURED: the
         Print chip shrank to 34px wide and sat half outside the card, which
         reads as a broken layout rather than a second row. `flex-wrap:wrap`
         alone does not prevent shrinking. */
      + '.urt-chip,.urt-size{flex:0 0 auto;}'
      + '.urt-chip{font-family:Nunito,sans-serif;font-weight:600;font-size:clamp(.86rem,3vw,1rem);'
      + 'line-height:1.1;padding:11px 15px;min-height:44px;border-radius:14px;'
      + 'border:2px solid #146B5E;background-color:#FBF3E4;color:#0F4A40;cursor:pointer;}'
      + '.urt-chip.urt-go{background-color:#F2784B;border-color:#F2784B;color:#FFF8EE;}'
      /* the padlocked chip carries a neutral ink, never the primary accent
         — coral on coral reads as DESTRUCTIVE, not as locked */
      + '.urt-chip.urt-lock{border-color:#8A5A3B;color:#8A5A3B;}'
      + '.urt-chip[disabled]{opacity:.45;cursor:default;}'
      + '.urt-chip:focus-visible,.urt-sz:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
      + '.urt-size{display:flex;align-items:center;gap:4px;padding:3px;border-radius:14px;'
      + 'border:2px solid rgba(20,107,94,.28);background-color:#FBF3E4;}'
      + '.urt-sz{width:38px;height:38px;min-width:38px;padding:0;border:0;border-radius:11px;'
      + 'background-color:transparent;cursor:pointer;display:flex;align-items:center;'
      + 'justify-content:center;}'
      + '.urt-sz.urt-on{background-color:rgba(20,107,94,.16);}'
      + '.urt-szdot{display:block;border-radius:50%;background-color:#146B5E;}'
      + '.urt-sz0 .urt-szdot{width:11px;height:11px;}'
      + '.urt-sz1 .urt-szdot{width:17px;height:17px;}'
      + '.urt-sz2 .urt-szdot{width:23px;height:23px;}'
      + '.urt-hint{text-align:center;font-family:Nunito,sans-serif;font-size:15px;'
      + 'line-height:1.45;color:#3C6E63;max-width:660px;}'
      + '.urt-hline{display:block;}'
      + '.urt-gate{width:100%;max-width:660px;border-radius:16px;border:2px dashed #C8613A;'
      + 'background-color:#FFF6EE;padding:14px 16px;text-align:center;'
      + 'font-family:Nunito,sans-serif;color:#7A3B21;}'
      + '.urt-gatetitle{font-weight:800;}'
      + '.urt-gate a{color:#C8613A;font-weight:700;}'
      /* =====================================================================
         WIDE VIEWPORTS.
         ⚠⚠ THE LADDER STARTS BELOW 704px AND CARRIES NO min-height TERM.
         The tool page pins the iframe at 704px on every desktop, and media
         queries inside an iframe resolve against the IFRAME viewport — so
         the previous ladder (1367/880, 1800/1000, 2400/1150) could never
         match and `body.urt-wide` did nothing at all. It went unseen because
         both QA renders were taken standalone. A `max-width:700px` escape
         would have missed by FOUR PIXELS; these are min-widths and the first
         rung is 680.
         ===================================================================== */
      + '@media (min-width:680px){'
      + '  body.urt-wide .urt-bench,body.urt-wide .urt-foot,body.urt-wide .urt-shelf,'
      + '  body.urt-wide .urt-hint,body.urt-wide .urt-gate{max-width:680px;}'
      + '  body.urt-wide .urt-chip-shape{width:50px;height:50px;}'
      + '}'
      + '@media (min-width:1100px){'
      + '  body.urt-wide .lcs-app{max-width:1180px;}'
      + '  body.urt-wide .urt-bench,body.urt-wide .urt-foot,body.urt-wide .urt-shelf,'
      + '  body.urt-wide .urt-hint,body.urt-wide .urt-gate{max-width:1080px;}'
      + '  body.urt-wide .urt-hint{font-size:17px;}'
      + '  body.urt-wide .urt-chip{font-size:17px;}'
      + '  body.urt-wide .urt-chip-shape{width:62px;height:62px;}'
      + '  body.urt-wide .urt-flag{--urt-fs:1.16;}'
      + '}'
      + '@media (min-width:1500px){'
      + '  body.urt-wide .lcs-app{max-width:1600px;}'
      + '  body.urt-wide .urt-bench,body.urt-wide .urt-foot,body.urt-wide .urt-shelf,'
      + '  body.urt-wide .urt-hint,body.urt-wide .urt-gate{max-width:1480px;}'
      + '  body.urt-wide .urt-hint{font-size:18px;}'
      + '  body.urt-wide .urt-chip{font-size:18px;}'
      + '  body.urt-wide .urt-chip-shape{width:70px;height:70px;}'
      + '  body.urt-wide .urt-flag{--urt-fs:1.3;}'
      + '}'
      + '@media (min-width:2000px){'
      + '  body.urt-wide .lcs-app{max-width:2000px;}'
      + '  body.urt-wide .urt-bench,body.urt-wide .urt-foot,body.urt-wide .urt-shelf,'
      + '  body.urt-wide .urt-hint,body.urt-wide .urt-gate{max-width:1820px;}'
      + '  body.urt-wide .urt-hint{font-size:19px;}'
      + '  body.urt-wide .urt-chip{font-size:19px;}'
      + '  body.urt-wide .urt-chip-shape{width:78px;height:78px;}'
      + '  body.urt-wide .urt-flag{--urt-fs:1.44;}'
      + '}'
      /* =====================================================================
         PRINT.
         ⚠⚠ SCOPED TO body.urt-paid. The Print CHIP was entitlement-gated
         while this block was not, so Ctrl+P walked straight past the paywall
         — the recorded "gating the chip is not gating the feature" class.
         A free user's Ctrl+P still gets a clean sheet of the apparatus (which
         is free to look at anyway): degrade to the FREE TIER, never to
         nothing.
         ===================================================================== */
      + '.urt-sheet{display:none;}'
      + '.urt-cut{display:block;margin:0 0 8mm 0;}'
      + '.urt-cutline{fill:none;stroke:#000;stroke-width:1.6;stroke-dasharray:5 3;}'
      + '.urt-cutnotch{stroke:#000;stroke-width:2.2;}'
      + '@media print{'
      + '  .urt-svg *{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
      + '  .lcs-header,.urt-hint,.urt-foot,.urt-gate,.urt-handle,.urt-plant,.urt-shelf{display:none !important;}'
      + '  .urt-wrap{gap:0;}'
      + '  .urt-bench{max-width:none;width:100%;border:1.5pt solid #000;border-radius:0;'
      + 'background-color:#fff;background-image:none;box-shadow:none;break-inside:avoid;}'
      + '  .urt-deck,.urt-contact,.urt-bevel,.urt-groove{display:none !important;}'
      + '  .urt-outline{fill:#fff !important;stroke:#000 !important;stroke-width:2.5 !important;}'
      + '  .urt-strand-casing{stroke:#000 !important;stroke-width:7 !important;}'
      + '  .urt-strand-core{stroke:#fff !important;stroke-width:3.2 !important;}'
      + '  .urt-rule,.urt-tick,.urt-unitwall,.urt-zerorise{stroke:#000 !important;}'
      + '  .urt-tick-min{stroke:#000 !important;stroke-opacity:1 !important;}'
      + '  .urt-num,.urt-jawnum{fill:#000 !important;}'
      + '  .urt-unit{fill:none !important;stroke:#000 !important;stroke-width:1.2 !important;'
      + 'stroke-dasharray:5 4 !important;}'
      + '  .urt-zeroblock,.urt-flagfoot{fill:#000 !important;}'
      + '  .urt-jaw,.urt-jawsf{stroke:#000 !important;stroke-width:2.5 !important;}'
      + '  .urt-tall,.urt-tallcap{stroke:#000 !important;stroke-opacity:1 !important;}'
      + '  .urt-markline{stroke:#000 !important;stroke-opacity:1 !important;}'
      + '  .urt-markmini{fill:none !important;stroke:#000 !important;stroke-opacity:1 !important;}'
      /* ⭐ the cut-outs are the PAID delta and appear on their own page;
         a free sheet is the apparatus alone, which is free to look at */
      + '  body.urt-paid .urt-sheet{display:block;break-before:page;}'
      + '  .urt-cutline{stroke:#000 !important;}'
      + '  .urt-cutnotch{stroke:#000 !important;}'
      + '  @page{margin:12mm;}'
      + '}'
      + '@media (prefers-reduced-motion:reduce){'
      + '  .urt-flag.urt-ghost .urt-fl{animation:none;'
      + 'transform:scale(var(--urt-fs,1)) translateY(-6px);}'
      + '}';
    var el = document.createElement('style');
    el.setAttribute('data-urt', '1');
    el.textContent = css;
    document.head.appendChild(el);
  }

  if (typeof window !== 'undefined') window.UnrollTape = UnrollTape;
  if (typeof module !== 'undefined' && module.exports) module.exports = UnrollTape;
  if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(UnrollTape);
}());
