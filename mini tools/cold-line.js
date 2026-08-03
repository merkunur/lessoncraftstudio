/* =====================================================================
   TOOL #43 — THE COLD LINE   (cold-line.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #8. Catalog slot B7, closing
   wave 2, the measurement spine (#40 unit-handle · #41 unroll-tape ·
   #42 comparison-planks · this).

   THE COLUMN · THE SCALE · THE MARKS. Three named parts, and nothing
   else in this tool gets a noun.
   ⚠ The noun census across all 46 shipped tools leaves almost nothing:
   `strip` (pattern-bench, and refused twice more), `track` and `rail`
   (#37 in every non-EN locale), `ladder` (measurement-bench ships it as
   an object in 11 locales), `tower`, `line` (#1 owns the head term in
   all eleven), `tape` (#40), `strand` (#41), `bar`/`beam`,
   `plank`/`offcut`/`bracket` (#42) are each another tool's identity.
   `scale` and `column` were free. A colliding noun is a collision even
   when the geometry differs.

   ⚠⚠ AND THE DISPLAY NAME IS NOT "THE COLD LINE", THOUGH THE CATALOG
   AND THIS FILE'S KEY BOTH SAY B7 / `cold-line`. Three native panels
   independently refused it, for two reasons this header ORIGINALLY GOT
   WRONG IN BOTH DIRECTIONS:
     · `line` is on the TAKEN list eight lines above — `number-line`
       owns the head term in all eleven locales. #41's title defect,
       repeating in the file that records it.
     · and an earlier version of this very paragraph claimed `cold` was
       FREE. It is not: `types/g3/G3-345-read-thermometer.js:6` is
       TITLED **"Hot or Cold?"** — the printable this tool is fenced
       against, named in the TAKEN block twenty lines BELOW. I then told
       the operator the opposite (that `cold` was never banned, since
       `calendar-wall`'s enum carries no hot/cold type) — true about the
       enum, irrelevant to the collision, and asserted without checking
       the printable I was fencing against.
   ⭐ THE LESSON, WHICH COST TWO WRONG STATEMENTS: a noun census must be
   run against the SURFACE THAT OWNS THE WORD, not the surface that
   happens to be top of mind. The display name is now **Upright and
   Flat** — named for the tip, which is the invention. The key stays
   `cold-line` so the catalog stays traceable.

   THE ROUTINE:
     "Set the marks at minus five and three. How far is that?"
      ... then slide the scale up and set them at ten and eighteen:
     "Is that a bigger jump, or the same one?"

   THE ONE THESIS — A THERMOMETER AND A NUMBER LINE ARE THE SAME OBJECT,
   AND YOU CAN TIP IT. Its relation to its three siblings, which is why
   the four belong on one shelf: in #40 the object held still and the
   UNIT changed size; in #41 a curved length lay down straight; in #42
   a difference became a piece you could carry; HERE THE WHOLE
   INSTRUMENT TURNS AND NOTHING ABOUT IT CHANGES — which is the point.

   THREE INVENTIONS:
     1. ⭐ THE TIP. Nothing in the suite reorients an apparatus between
        portrait and landscape. `arrow-strip.js:536` turns a MAT under a
        fixed beetle in quarter-turns, and `folding-sheet.js:563` is a
        reflection ("mirror-as-a-map, not turn-as-an-action"); neither
        is a vertical↔horizontal instrument flip. ⚠ And #41 explicitly
        REFUSES a rotation control (`unroll-tape.js:63-70`, refuse #7) —
        because rotating ITS shape would break a ratio that is not
        rotation-invariant. Here the rotation is a RIGID reorientation
        of the entire instrument, under which every claim is preserved
        BY the rigidity. That is the difference, and it is the tool.
     2. A SIGNED POSITION. Signed DELTAS ship today (`comet-kangaroo`
        `delta:-10`, `jump-tens` `{+10,−10}`); a value below zero on a
        scale does not exist anywhere in 46 tools, 133 activity engines
        or 240 printable types. This is the first.
     3. A SCALE YOU SLIDE. `unit-handle.js:26` claims the category —
        "every other cover, unit and scale on this platform is a fixed
        size you place or a discrete option you pick" — and it is right,
        but it changes the SIZE OF THE UNIT with the object fixed (a
        zoom). This slides the ORIGIN of a fixed-size unit (a
        translate). Different transform, different thesis.

   ⚠ THE FENCE — FOUR SURFACES, RUN FRESH, AND IT CAME BACK **NOT
   CLEAN** ON THREE. Per §23.3 the overlap is SUBTRACTED, not negotiated:
     TAKEN — the vertical thermometer is OCCUPIED:
       `scripts/worksheet-gen/primitives/thermometer.js` (bulb + tube +
       ticks), consumed by `types/g3/G3-345-read-thermometer.js` — "Read
       each thermometer. Write the temperature it shows." Its scale is
       fixed 0–40 and enforced by a HARD THROW at `thermometer.js:12`.
       ⭐ So this tool MAY NEVER ASK WHAT THE READING IS. That question
       has an answer key and a printable already owns it.
     TAKEN — the horizontal number line is HEAVILY occupied: `#1
       number-line` (ticked, labelled, 0..N, and the head term in all 11
       locales), `#26 open-number-line` (the empty line, child-drawn
       jumps), Hopper's `numberline-jump-core` (2.MD.B.6, graded hops),
       plus 9 printable leaf types with their own `number-lines`
       taxonomy family. ⭐ So this tool MAY NEVER DRAW A JUMP.
     TAKEN — liquid in a graduated vessel is `measurement-bench.js:870`
       (capacity, poured, cups/ml); a column rising from a baseline is
       `class-graph.js:7` (stamps, single-unit ruling). Hot/cold as a
       qualitative sort is `types/k/K-211-hot-cold.js`; the weather enum
       is `calendar-wall.js:161` in 11 locales.
     REMAINDER, measured virgin: a signed POSITION · a numbered VERTICAL
       axis (nothing in the suite has one) · a vertical↔horizontal
       toggle · panning a scale under fixed content.
     ⭐ AND A SHIPPED TOOL RESERVED THE GLYPH FOR THIS ONE BY NAME:
       `draw-bag.js:886-889` — "a minus sign is also the one character
       the Cold Line will have to reserve."

   ⚠⚠ AND A SHIPPED TOOL STATES THIS TOOL'S PREMISE AS DOCTRINE TO BE
   REFUSED. `open-number-line.js:157` — "never open negative territory.
   A K-3 child is not working below zero." Reconciled, not overridden:
   that tool refuses A JUMP THAT LANDS BELOW ZERO — an arithmetic
   operation producing a negative, which is genuinely 6.NS. This
   instrument NEVER PERFORMS ARITHMETIC AT ALL. It shows a POSITION on a
   scale, the thing a Swedish or Finnish seven-year-old reads off a wall
   in January.
   ⚠ AND THE COMMENT IS WIDER THAN ITS OWN CODE, which I only learned by
   reading it: the guard is `if (floorAt >= 0 && lo < 0) lo = 0;` — it
   clamps only when the child's own landings are all non-negative, so it
   is a WINDOW-PADDING rule stopping auto-fit from inventing empty
   negative space. The comment even gives a second, purely LAYOUT reason
   ("shoves the whole drawing into the left third of the sheet"). A code
   comment is a doc, and a doc is not a fact.

   ⚠ THE CATALOG'S B7 GATE SPEC DOES NOT SURVIVE CONTACT — the third
   build running. It cites 6,561 ordered pairs (81², i.e. −40..+40).
   MEASURED on the real card (`.lcs-app` is `height:100%;
   overflow:hidden` — it CLIPS rather than grows), the stage's vertical
   budget at a 320px viewport is 226px, not the ~343px a width-only
   estimate gives. 81 values there is 2.8px per unit. The band is
   DERIVED from a legibility floor instead — see WINDOW below.

   REFUSES, FOREVER — each one gated:
     1. NEVER ASKS WHAT THE READING IS. No question, no keypad, no
        input, no `?`. G3-345 owns that question. The tool SHOWS.
     2. NEVER DRAWS A JUMP, HOP OR ARROW. Position and distance only.
     3. NEVER PERFORMS ARITHMETIC ACROSS ZERO. No operation, ever.
     4. NAMES NO UNIT. No `°`, no C, no F — matching `thermometer.js:26`
        (`text: v`, a bare integer) and `ruler.js`, which are already
        unitless. It is exactly this that lets one object be both a
        thermometer and a number line, and it dissolves the catalog's
        flagged Fahrenheit risk.
     5. NEVER SQUASHES AT ZERO — the classic art bug. Linearity is
        gated across EVERY adjacent pair, not at the endpoints.
     6. A HYPHEN IS NEVER A MINUS. U+2212 only, inheriting
        `open-number-line.js:131-134`'s shipped doctrine in 11 locales.
     7. NO WEATHER VOCABULARY OR ICONS. `calendar-wall` owns the six-type
        enum. This shows a number, never a condition.
     8. NO ACCURACY GRADIENT. `estimation-jar.js:22-27` bans a
        distance-from-truth reading in a free-play tool; nothing here is
        near or far from anything.
     And standing: no score, no timer, no streak, no verdict, no speech.

   0 lines to lcs-shell.{js,css} or any protected core.
   ===================================================================== */

(function () {
  'use strict';

  var ColdLine = {
    id: 'cold-line',

    /* ---------------------------------------------------------------
       STRINGS — EN authored; the other ten are REBUILT (not translated)
       by a three-person NATIVE panel per locale, §A.13.48.
       ⚠ DO NOT HAND-EDIT A LOCALE HERE. SoT is
       scripts/_cold-line-strings.js.
       ⚠ AND NO STRING MAY NAME A UNIT, carry a digit, name a weather
       condition, or ask what the reading is.
       --------------------------------------------------------------- */
    strings: {
      title:       { en: "Upright and Flat", de: "Hochkant und flach", fr: "Debout ou à plat", es: "Bajo cero", pt: "O Tubo que Deita", it: "Il tubo dei numeri", nl: "Rechtop en plat", sv: "Pelaren", da: "Fra lodret til vandret", no: "Under null", fi: "Nollan alapuolella" },
      instruction: { en: "Put the two marks on the scale, above or below zero. Drag the scale itself to reach further along it, and when you are ready, lay the whole thing down flat.", de: "Setzt die beiden Schieber an die Skala, über oder unter Null. Zieht die Skala selbst, um weiter an ihr entlang zu kommen, und legt das Ganze flach hin, wenn ihr so weit seid.", fr: "Posez les deux curseurs sur la graduation, au-dessus ou au-dessous de zéro. Faites glisser la graduation elle-même pour aller plus loin, et quand vous êtes prêts, mettez le tout à plat.", es: "Pon las dos señales en la escala, arriba o abajo del cero. Arrastra la escala para llegar más lejos por ella y, cuando quieras, pon la herramienta entera de lado.", pt: "Ponha os dois pinos na escala, acima ou abaixo do zero. Arraste a própria escala para alcançar números mais distantes e, quando quiser, deite o tubo inteiro.", it: "Mettete le due puntine sulla scala dei numeri, sopra o sotto lo zero. Trascinate la scala stessa per arrivare più lontano, e quando siete pronti coricate tutto lo strumento.", nl: "Zet de twee klemmen op de verdeling, boven of onder de nul. Sleep de verdeling zelf om verder te komen, en leg als je zover bent het hele ding plat.", sv: "Sätt de två hakarna på skalan, ovanför eller under nollan. Dra i själva skalan för att nå längre längs den, och lägg ner alltihop när ni är redo.", da: "Sæt de to nåle på skalaen, over eller under nullet. Træk i selve skalaen for at nå længere langs den, og læg det hele ned, når I er klar.", no: "Sett de to klemmene på skalaen, over eller under nullet. Dra i selve skalaen for å nå lenger langs den, og legg hele greia ned når dere er klare.", fi: "Aseta kaksi nastaa asteikolle, nollan yläpuolelle tai sen alapuolelle. Vedä asteikkoa itseään päästäksesi kauemmas sitä pitkin, ja pane koko laite pitkälleen, kun olette valmiit." },
      sceneLabel:  { en: "A long, narrow column with a numbered scale beside it and two marks on the scale. The first mark fills the column as far as its own number; the second one does not. Between them stands a number: how far apart they are. One control lays the whole instrument down flat.", de: "Eine hohe Röhre, daneben eine Skala mit Zahlen und zwei Schieber daran. Der erste Schieber füllt die Röhre bis zu seiner eigenen Zahl, der zweite nicht. Zwischen beiden steht eine Zahl: ihr Abstand. Eine Taste legt das Ganze flach hin.", fr: "Un tube dressé, une graduation chiffrée à côté et deux curseurs posés dessus. Le premier curseur remplit le tube jusqu'à son propre nombre, le second non. Entre les deux s'affiche un nombre : leur écart. Un bouton met le tout à plat.", es: "Un tubo largo y angosto y, a un costado, una escala con rayas y números, con dos señales puestas sobre ella. El color del tubo llega hasta la primera señal; la segunda lo deja como está. Entre las dos aparece un número: cuánto las separa. Un botón pone la herramienta entera de lado.", pt: "Um tubo comprido e estreito, com a escala numerada de um lado e os dois pinos do outro. Quando o tubo aparece pintado, a cor vai até o primeiro pino e para ali; o segundo pino não pinta nada. Entre os dois pinos fica o número da distância de um até o outro. Um botão deita o tubo inteiro.", it: "un tubo lungo e stretto con accanto la scala dei numeri, e sulla scala due puntine. La prima puntina riempie il tubo fino al proprio numero; la seconda lo lascia com’è. Fra le due sta un numero: quanto distano fra loro. Un comando corica tutto lo strumento.", nl: "Een hoge zuil met daarnaast een verdeling met getallen, en twee klemmen op de verdeling. De eerste klem vult de zuil tot aan zijn eigen getal; de tweede doet dat niet. Tussen de twee staat een getal: hoe ver ze uit elkaar zitten. Eén knop legt het hele ding plat.", sv: "En hög pelare med en skala med tal bredvid sig, och två hakar på skalan. Den första haken fyller pelaren ända fram till sitt eget tal; den andra gör det inte. Mellan dem står ett tal: hur långt det är mellan dem. En knapp lägger ner alltihop.", da: "Et højt rør med en skala med tal ved siden af, og to nåle på skalaen. Den første nål fylder røret helt hen til sit eget tal; den anden gør ikke. Mellem dem står et tal: hvor langt der er imellem dem. En knap lægger det hele ned.", no: "Et høyt rør med en skala med tall ved siden av, og to klemmer på skalaen. Den første klemmen fyller røret helt fram til sitt eget tall; den andre gjør det ikke. Mellom dem står det et tall: hvor langt det er mellom dem. En knapp legger hele greia ned.", fi: "Korkea putki, jonka vieressä on asteikko lukuineen, ja asteikolla kaksi nastaa. Ensimmäinen nasta täyttää putken omaan lukuunsa asti; toinen ei täytä. Niiden välissä on luku: kuinka kaukana ne ovat toisistaan. Yksi painike panee koko laitteen pitkälleen." },
      zeroOff:     { en: "Zero is not on view right now.", de: "Die Null liegt gerade außerhalb der Skala.", fr: "Le zéro est pour l'instant hors de la graduation.", es: "El cero queda fuera de la escala en este momento.", pt: "Neste momento, o zero está fora da vista.", it: "In questo momento lo zero resta fuori dalla scala.", nl: "De nul is op dit moment niet te zien op de verdeling.", sv: "Nollan syns inte på skalan just nu.", da: "Nullet kan ikke ses på skalaen lige nu.", no: "Nullet vises ikke på skalaen akkurat nå.", fi: "Nolla ei ole juuri nyt näkyvissä asteikolla." },
      hintSet:     { en: "Both marks are on the same number, so there is no distance between them. Drag one of them along the scale.", de: "Beide Schieber stehen auf derselben Zahl, es liegt also kein Abstand dazwischen. Zieht einen von ihnen an der Skala entlang.", fr: "Les deux curseurs sont sur le même nombre : il n'y a donc aucun écart entre eux. Faites glisser l'un des deux le long de la graduation.", es: "Las dos señales están en el mismo número, así que no hay nada que las separe. Arrastra una de las dos por la escala.", pt: "Os dois pinos estão no mesmo número, e por isso não aparece distância nenhuma. Arraste um deles ao longo da escala.", it: "Le due puntine stanno sullo stesso numero, così fra loro non c’è nessuna distanza. Trascinatene una lungo la scala dei numeri.", nl: "Beide klemmen staan op hetzelfde getal, dus er zit geen afstand tussen. Sleep er een over de verdeling.", sv: "Båda hakarna sitter på samma tal, så det finns inget avstånd mellan dem. Dra den ena längs skalan.", da: "Begge nåle sidder på det samme tal, så der er ingen afstand imellem dem. Træk den ene langs skalaen.", no: "Begge klemmene sitter på det samme tallet, så det er ingen avstand mellom dem. Dra den ene langs skalaen.", fi: "Molemmat nastat ovat saman luvun kohdalla, joten niiden välissä ei ole etäisyyttä. Vedä toista niistä asteikkoa pitkin." },
      hintSlide:   { en: "One of the marks is not on view right now. Drag the scale itself until it comes back.", de: "Einer der Schieber liegt jetzt außerhalb der Skala. Zieht die Skala selbst, bis er wieder zu sehen ist.", fr: "L'un des curseurs est sorti de la graduation. Faites glisser la graduation elle-même jusqu'à ce qu'il revienne en vue.", es: "Una de las señales quedó fuera de la vista. Arrastra la escala hasta que vuelva a aparecer.", pt: "Um dos pinos está fora da vista agora. Arraste a própria escala até ele aparecer de novo.", it: "Adesso una delle due puntine è fuori dalla scala dei numeri. Trascinate la scala finché non torna a vedersi.", nl: "Een van de klemmen is op dit moment niet te zien. Sleep de verdeling zelf tot hij weer in beeld komt.", sv: "Den ena haken syns inte på skalan just nu. Dra i själva skalan tills den kommer fram igen.", da: "Den ene nål kan ikke ses på skalaen lige nu. Træk i selve skalaen, indtil den kommer frem igen.", no: "Den ene klemmen vises ikke på skalaen akkurat nå. Dra i selve skalaen til den kommer fram igjen.", fi: "Toinen nastoista ei ole juuri nyt näkyvissä. Vedä asteikkoa itseään, kunnes se tulee taas näkyviin." },
      hintTip:     { en: "There it is, lying flat. The same scale, the same marks, the same distance between them.", de: "Da liegt es, ganz flach. Dieselbe Skala, dieselben Schieber, derselbe Abstand dazwischen.", fr: "Le voilà, à plat. La même graduation, les mêmes curseurs, le même écart entre les deux.", es: "Ahí está, de lado. La misma escala, las mismas señales, la misma distancia entre ellas.", pt: "Pronto, o tubo está deitado. A mesma escala, os mesmos pinos, a mesma distância entre eles.", it: "Eccolo lì, coricato. Stessa scala dei numeri, stesse puntine, stessa distanza fra loro.", nl: "Daar ligt het, helemaal plat. Dezelfde verdeling, dezelfde klemmen, dezelfde afstand ertussen.", sv: "Där ligger det, alldeles plant. Samma skala, samma hakar, samma avstånd mellan dem.", da: "Der ligger det, helt fladt. Den samme skala, de samme nåle, den samme afstand imellem dem.", no: "Der ligger det, helt flatt. Den samme skalaen, de samme klemmene, den samme avstanden mellom dem.", fi: "Siinä se on, pitkällään. Sama asteikko, samat nastat, sama etäisyys niiden välillä." },
      hintSpan:    { en: "The number between the marks is how far apart they are. Now lay the whole thing down flat and watch what happens to it.", de: "Die Zahl zwischen den Schiebern ist ihr Abstand. Legt jetzt das Ganze flach hin und schaut genau hin, was sich dabei ändert.", fr: "Le nombre entre les curseurs, c'est leur écart. Mettez maintenant le tout à plat et regardez bien ce qui change.", es: "El número que está entre las dos señales dice cuánto las separa. Ahora pon la herramienta entera de lado y fíjate qué le pasa a ese número.", pt: "O número entre os pinos é a distância de um até o outro. Agora deite o tubo inteiro e repare no que acontece com esse número.", it: "Il numero fra le due puntine dice quanto distano fra loro. Adesso coricate tutto lo strumento e guardate che cosa gli succede.", nl: "Het getal tussen de klemmen is hoe ver ze uit elkaar zitten. Leg nu het hele ding plat en kijk goed wat ermee gebeurt.", sv: "Talet mellan hakarna är hur långt det är mellan dem. Lägg nu ner alltihop och se noga vad som händer med det.", da: "Tallet mellem nålene er, hvor langt der er imellem dem. Læg nu det hele ned, og hold øje med, hvad der sker med det.", no: "Tallet mellom klemmene er hvor langt det er mellom dem. Legg nå hele greia ned, og følg med på hva som skjer med den.", fi: "Nastojen välissä oleva luku kertoo, kuinka kaukana ne ovat toisistaan. Pane nyt koko laite pitkälleen ja katso tarkkaan, mitä sille tapahtuu." },
      tipBtn:      { en: "Lay it down", de: "Umlegen", fr: "Mettre à plat", es: "Poner el tubo de lado", pt: "Deitar o tubo", it: "Corica lo strumento", nl: "Leg hem plat", sv: "Lägg ner den", da: "Læg det ned", no: "Legg det ned", fi: "Pane pitkälleen" },
      standBtn:    { en: "Stand it up", de: "Aufstellen", fr: "Redresser", es: "Poner el tubo de pie", pt: "Pôr o tubo de pé", it: "Rimettilo in piedi", nl: "Zet hem rechtop", sv: "Ställ upp den", da: "Stil det op", no: "Sett det opp", fi: "Nosta pystyyn" },
      zeroBtn:     { en: "Zero to the middle", de: "Null in die Mitte", fr: "Ramener le zéro", es: "Centrar el cero", pt: "Trazer o zero ao meio", it: "Centra lo zero", nl: "Nul in het midden", sv: "Nollan till mitten", da: "Nullet til midten", no: "Nullet midt på", fi: "Nolla keskelle" },
      nextBtn:     { en: "Another place", de: "Anderer Ausschnitt", fr: "Un autre endroit", es: "Otra parada", pt: "Outra posição", it: "Altre due puntine", nl: "Andere plek", sv: "Nytt ställe", da: "Nyt sted", no: "Nytt sted", fi: "Toinen kohta" },
      printBtn:    { en: "Print the sheet", de: "Blatt drucken", fr: "Imprimer la fiche", es: "Imprimir los tubos", pt: "Imprimir o tubo", it: "Stampa il foglio", nl: "Print de verdeling", sv: "Skriv ut skalan", da: "Print skalaen", no: "Skriv ut skalaen", fi: "Tulosta asteikko" },
      markAAria:   { en: "the first mark. It fills the column as far as its own number. Drag it along the scale.", de: "der erste Schieber. Er füllt die Röhre bis zu seiner eigenen Zahl. Zieh ihn an der Skala entlang.", fr: "le premier curseur. Il remplit le tube jusqu'à son propre nombre. Faites-le glisser le long de la graduation.", es: "la primera señal, la que llena el tubo hasta su propio número cuando el color está a la vista. Arrástrala por la escala o muévela con las flechas.", pt: "o primeiro pino, verde-escuro, o que fica mais perto do tubo. Arraste ao longo da escala.", it: "la prima puntina. Riempie il tubo fino al proprio numero. Trascinala lungo la scala dei numeri.", nl: "de eerste klem. Hij vult de zuil tot aan zijn eigen getal. Sleep hem over de verdeling.", sv: "den första haken. Den fyller pelaren ända fram till sitt eget tal. Dra den längs skalan.", da: "den første nål. Den fylder røret helt hen til sit eget tal. Træk den langs skalaen.", no: "den første klemmen. Den fyller røret helt fram til sitt eget tall. Dra den langs skalaen.", fi: "ensimmäinen nasta. Se täyttää putken omaan lukuunsa asti. Vedä sitä asteikkoa pitkin." },
      markBAria:   { en: "the second mark. It leaves the column alone. Drag it along the scale.", de: "der zweite Schieber. Er lässt die Röhre in Ruhe. Zieh ihn an der Skala entlang.", fr: "le second curseur. Il laisse le tube tranquille. Faites-le glisser le long de la graduation.", es: "la segunda señal, la que deja el tubo como está. Arrástrala por la escala o muévela con las flechas.", pt: "o segundo pino, laranja, o que fica mais afastado do tubo. Arraste ao longo da escala.", it: "la seconda puntina. Lascia il tubo com’è. Trascinala lungo la scala dei numeri.", nl: "de tweede klem. Die laat de zuil met rust. Sleep hem over de verdeling.", sv: "den andra haken. Den lämnar pelaren i fred. Dra den längs skalan.", da: "den anden nål. Den lader røret være. Træk den langs skalaen.", no: "den andre klemmen. Den lar røret være. Dra den langs skalaen.", fi: "toinen nasta. Se ei koske putkeen. Vedä sitä asteikkoa pitkin." },
      scaleAria:   { en: "the scale. Drag it to reach further along; a tap brings zero back to the middle.", de: "die Skala. Zieh sie, um weiter an ihr entlang zu kommen; ein Tippen holt die Null in die Mitte.", fr: "la graduation. Faites-la glisser pour aller plus loin ; une simple touche ramène le zéro au milieu.", es: "la escala. Arrástrala para alcanzar números más lejanos; al tocarla, el cero vuelve al centro.", pt: "a escala, com os riscos e os números. Arraste ao longo do tubo para alcançar números mais distantes. Um toque traz o zero de volta para o meio.", it: "la scala dei numeri. Trascinala per arrivare più lontano, nei due sensi; un tocco riporta lo zero al centro.", nl: "de verdeling. Sleep eraan om verder te komen; een tik zet de nul weer in het midden.", sv: "skalan. Dra i den för att nå längre längs den; en tryckning sätter nollan tillbaka i mitten.", da: "skalaen. Træk i den for at nå længere langs den; et tryk sætter nullet tilbage på midten.", no: "skalaen. Dra i den for å nå lenger langs den; et trykk setter nullet tilbake midt på.", fi: "asteikko. Vedä sitä päästäksesi kauemmas; napautus tuo nollan takaisin keskelle." },
      gateTitle:   { en: "More places", de: "Mehr Ausschnitte", fr: "D'autres endroits", es: "Más paradas", pt: "Mais posições", it: "Ancora undici sorprese", nl: "Meer plekken", sv: "Fler ställen", da: "Flere steder", no: "Flere steder", fi: "Lisää kohtia" },
      gateBody:    { en: "Eleven more places on the scale, ordered so each one surprises after the one before, and the sheet to print for working on paper.", de: "Elf weitere Ausschnitte der Skala, so geordnet, dass jeder nach dem vorherigen überrascht, dazu das Blatt zum Ausdrucken.", fr: "Onze autres endroits sur la graduation, ordonnés pour que chacun surprenne après le précédent, et la fiche à imprimer pour travailler sur papier.", es: "Once paradas más en la escala, ordenadas para que cada una sorprenda después de la anterior, y la hoja para imprimir y trabajar en papel.", pt: "Mais onze posições na escala, encadeadas para que cada uma surpreenda depois da anterior, e a folha para imprimir e trabalhar no papel.", it: "Altre undici, con le due puntine su numeri nuovi e distanze che tornano uguali da tutt’altra parte della scala dei numeri, e il foglio da stampare: due tubi vuoti, con i soli segni, da numerare a mano.", nl: "Nog elf plekken op de verdeling, zo op volgorde dat elke plek verrast na de vorige, en de verdeling om af te drukken om op papier te werken.", sv: "Elva ställen till på skalan, ordnade så att varje ställe överraskar efter det förra, och skalan att skriva ut för att arbeta på papper.", da: "Elleve steder mere på skalaen, sat i en rækkefølge, hvor hvert sted overrasker efter det forrige, og skalaen til at printe, så I kan arbejde på papir.", no: "Elleve steder til på skalaen, satt opp slik at hvert sted overrasker etter det forrige, og skalaen til å skrive ut, så dere kan jobbe på papir.", fi: "Yksitoista kohtaa lisää asteikolla järjestyksessä, jossa jokainen kohta yllättää edellisen jälkeen, sekä tulostettava asteikko paperilla työskentelyyn." },
      gateCta:     { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l'offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Tutustu Opettaja-tilaukseen" }
    },

    STORE_KEY: 'lcs:cold-line:v1',
    ENT_TRUST_DAYS: 14,

    /* ---- the stage, in model units ----------------------------------
       ⭐ A SQUARE viewBox, and that is load-bearing. The gate demands
       "same liquid, same ticks, same marks, same span" in both
       orientations. On a desktop the horizontal extent (720px) far
       exceeds the vertical (viewport-bound), so an instrument sized per
       orientation would silently show MORE of the scale lying down than
       standing up. A square stage makes the equality STRUCTURAL rather
       than asserted: the instrument cannot change length when it turns,
       because the box it turns inside is the same box.
       ---------------------------------------------------------------- */
    W: 1000,
    H: 1000,
    AXIS_X: 500,        /* the column's centre line, standing up        */
    TUBE_W: 96,
    TOP: 140,           /* model y of the HIGHEST visible value         */
    BOT: 860,           /* model y of the LOWEST visible value          */

    /* ---- the band, DERIVED from the measured bench -------------------
       MEASURED (not estimated) stage budget at a 320px viewport: 226px
       vertical, 296px horizontal — the vertical binds, so the window is
       sized by 226px.
         minor tick must be countable      -> >= 8px per unit
         a 14px numeral must not collide   -> >= 34px between LABELS
       At WINDOW = 21 the narrowest bench gives 226/21 = 10.8px per unit
       (ceiling is 28 values at the 8px floor) and labels every 5 sit
       54px apart. Both floors clear with margin.
       ⚠ verify- PRINTS this derivation and local-test- MEASURES the real
       bench and asserts it holds — the two gates talk to each other, so
       the number is measured and never preferred.
       ⭐ Labels every 5 with a tick every 1 is also how the shipped
       `thermometer.js` rules itself (`step = 5`).
       ---------------------------------------------------------------- */
    DMIN: -30,
    DMAX: 30,
    WINDOW: 21,         /* values visible at once; 20 intervals         */
    LABEL_EVERY: 5,

    /* ---------------------------------------------------------------
       THE MODEL — four fields, and NOTHING derived is stored.
         lo      the LOWEST visible value (the window's origin)
         a, b    the two marks, in domain units
         tipped  false = standing, true = lying down
       ⚠ `span` IS NOT STORED. It is |a−b|, recomputed on every read; a
       stored difference is a second source of truth that desynchronises
       (the #42 rule). ⚠ Nor is "which mark is higher" — `hiOf` is
       three-valued and returns null when they are equal.
       --------------------------------------------------------------- */
    newState: function () { return { lo: -12, a: -5, b: 3, tipped: false }; },

    _int: function (v, dflt) {
      if (typeof v !== 'number' || !isFinite(v)) return dflt;
      return Math.round(v);
    },

    /* TOTAL. Any input whatsoever maps to a canonical, legal state.
       ⚠ `st || newState()` is not enough — it catches null and 0 and
       hands [] straight through (the #39 lesson). */
    _st: function (st) {
      if (st === null || typeof st !== 'object') return this.newState();
      var d = this.newState();
      var lo = this._int(st.lo, d.lo);
      var a = this._int(st.a, d.a);
      var b = this._int(st.b, d.b);
      var loMax = this.DMAX - this.WINDOW + 1;
      if (lo < this.DMIN) lo = this.DMIN;
      if (lo > loMax) lo = loMax;
      if (a < this.DMIN) a = this.DMIN;
      if (a > this.DMAX) a = this.DMAX;
      if (b < this.DMIN) b = this.DMIN;
      if (b > this.DMAX) b = this.DMAX;
      return { lo: lo, a: a, b: b, tipped: st.tipped === true };
    },

    /* ---- derived, never stored ------------------------------------- */
    hi: function (st) { var s = this._st(st); return s.lo + this.WINDOW - 1; },
    spanOf: function (st) { var s = this._st(st); return Math.abs(s.a - s.b); },
    hiOf: function (st) {
      var s = this._st(st);
      if (s.a === s.b) return null;          /* three-valued, by design */
      return s.a > s.b ? 'a' : 'b';
    },
    loMax: function () { return this.DMAX - this.WINDOW + 1; },

    /* ---- the geometry ----------------------------------------------
       ⭐ ONE AFFINE MAP, AND EVERY MARK, TICK AND LIQUID EDGE GOES
       THROUGH IT. There is no separate path for negative values — that
       is what makes "no squash at zero" true by construction rather
       than by care, and it is why the gate can walk every adjacent pair
       and find a constant step.
       ---------------------------------------------------------------- */
    unit: function () { return (this.BOT - this.TOP) / (this.WINDOW - 1); },
    yFor: function (st, v) {
      var s = this._st(st);
      return this.BOT - (v - s.lo) * this.unit();
    },

    /* ---- reducers: PURE, immutable, `null` for refusal --------------
       ⚠ Never a clamp where a refusal belongs. A no-op returns null so
       the caller does not repaint, and so a mutation that turns a
       refusal into a silent clamp is visible to the gate.
       ---------------------------------------------------------------- */
    setMark: function (st, which, v) {
      var s = this._st(st);
      if (which !== 'a' && which !== 'b') return null;
      if (typeof v !== 'number' || !isFinite(v)) return null;
      v = Math.round(v);                     /* rounding lives HERE, in the
                                                reducer, never in render */
      if (v < this.DMIN || v > this.DMAX) return null;
      if (v === s[which]) return null;
      var n = { lo: s.lo, a: s.a, b: s.b, tipped: s.tipped };
      n[which] = v;
      return n;
    },

    slideTo: function (st, lo) {
      var s = this._st(st);
      if (typeof lo !== 'number' || !isFinite(lo)) return null;
      lo = Math.round(lo);
      if (lo < this.DMIN || lo > this.loMax()) return null;
      if (lo === s.lo) return null;
      return { lo: lo, a: s.a, b: s.b, tipped: s.tipped };
    },

    /* The scale is dragged, so the delta arrives in VALUES.
       ⚠ THIS IS A COMPOSITION, NOT A SECOND LAW. The first cut had
       `slideTo` REFUSE out of band while `slideBy` CLAMPED — two public
       reducers, both taking a number, with opposite out-of-band
       policies. That is how a caller picks the wrong one. There is one
       band rule (`slideTo`), and the saturation is visibly the drag
       handler's job. */
    _clampLo: function (lo) {
      if (lo < this.DMIN) return this.DMIN;
      if (lo > this.loMax()) return this.loMax();
      return lo;
    },
    slideBy: function (st, dv) {
      var s = this._st(st);
      if (typeof dv !== 'number' || !isFinite(dv)) return null;
      return this.slideTo(s, this._clampLo(s.lo + Math.round(dv)));
    },

    /* ---- the pose, as EXACT INTEGER ARITHMETIC ----------------------
       ⭐ `rotate(90 500 500)` is exactly `(x, y) -> (W − y, x)` on a
       square arena. Keeping that in the MODEL rather than reading it
       back out of `getScreenCTM()` buys three things:
         · it is testable in Node with ZERO browser work, so `mutate-`
           can run it 50 times under a 30s cap (a gate that hangs counts
           as survived);
         · "same span in both poses" becomes an INTEGER IDENTITY —
           dist²(Rp,Rq) === dist²(p,q) — with no sqrt and no float;
         · the browser gate then cross-checks it against the ACTUAL
           rendered layout, which is a genuinely different algorithm.
       ⚠ There is no `getScreenCTM` anywhere in 325 tool files, and its
       treatment of CSS transforms on ancestors is engine-dependent — a
       wrong pose would surface only under a real pointer drag.
       ⚠ AND THE SENSE IS NOT FREE: `rotate(-90)` is equally a rotation
       and runs the line RIGHT-to-LEFT. A matrix check cannot see that;
       it needs its own assertion, because `number-line.js:13` fixes the
       platform's reading order as "L→R, smallest→largest".
       ---------------------------------------------------------------- */
    toScreen: function (st, x, y) {
      return this._st(st).tipped ? { x: this.W - y, y: x } : { x: x, y: y };
    },
    toInstrument: function (st, X, Y) {
      return this._st(st).tipped ? { x: Y, y: this.W - X } : { x: X, y: Y };
    },

    /* ---- the liquid, IN THE MODEL -----------------------------------
       ⭐ It lives here and not in `_paint` because a build whose TICKS
       are linear but whose LIQUID is squashed near zero passes every
       linearity assertion. `verify-` can only kill what it can call.
       Returns the segment in VALUE space, clipped to the window — the
       clip is in values, never in pixels, because clamping both a pixel
       origin AND a pixel length is exactly how a squash gets in.
       ---------------------------------------------------------------- */
    liquidSeg: function (st) {
      var s = this._st(st);
      var floor = s.lo;                      /* the tube's visible foot */
      var top = s.a;                         /* the reading             */
      if (top <= floor) return null;         /* nothing to draw         */
      var hiV = s.lo + this.WINDOW - 1;
      if (top > hiV) top = hiV;
      return { from: floor, to: top };
    },

    /* zero is the one landmark the child must always be able to find */
    findZero: function (st) {
      var s = this._st(st);
      var lo = -Math.floor((this.WINDOW - 1) / 2);
      if (lo < this.DMIN) lo = this.DMIN;
      if (lo > this.loMax()) lo = this.loMax();
      if (lo === s.lo) return null;
      return { lo: lo, a: s.a, b: s.b, tipped: s.tipped };
    },

    tip: function (st) {
      var s = this._st(st);
      return { lo: s.lo, a: s.a, b: s.b, tipped: !s.tipped };
    },

    /* is a value inside the visible window? */
    inView: function (st, v) {
      var s = this._st(st);
      return v >= s.lo && v <= s.lo + this.WINDOW - 1;
    },

    /* =================================================================
       RENDER
       ⭐ THE TIP IS ONE SVG MATRIX OVER THE REAL DOM. `rotate(90 500
       500)` on the instrument group, and nothing is recomputed — the
       layout answers, exactly as `arrow-strip.js:536` turns its mat and
       `class-graph.js:47` lets the bar's height be "the layout's own
       answer". So "the zero tick lands in the same place" is NOT two
       numbers that agree: it is THE SAME NODE under a rigid transform,
       which is #42's one-expression-evaluated-twice discipline applied
       to geometry.
       ⚠ +90 and not −90: rotating the other way would put the SMALLEST
       value on the right, and `number-line.js:13` states the platform's
       reading order as "L→R, smallest→largest".
       ================================================================= */
    _ns: 'http://www.w3.org/2000/svg',
    _svgEl: function (name, attrs) {
      var e = document.createElementNS(this._ns, name), k;
      for (k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
      return e;
    },

    render: function () {
      if (!this.api) return;
      this.st = this._st(this.st);
      if (this._wrap && this._wrap.parentNode) this._wrap.parentNode.removeChild(this._wrap);
      this._build();
      this._paint();
    },

    _build: function () {
      var api = this.api, self = this;
      var wrap = api.el('div', 'cld-wrap');
      this._wrap = wrap;

      var bench = api.el('div', 'cld-bench');
      this._bench = bench;
      bench.setAttribute('role', 'img');

      var svg = this._svgEl('svg', {
        viewBox: '0 0 ' + this.W + ' ' + this.H,
        'class': 'cld-svg', preserveAspectRatio: 'xMidYMid meet'
      });
      this._svg = svg;

      /* the ONE group that turns. Everything the instrument is lives
         inside it; the chrome lives outside. */
      var inst = this._svgEl('g', { 'class': 'cld-inst' });
      this._inst = inst;
      svg.appendChild(inst);

      /* the column: tube + bulb, drawn once */
      var ax = this.AXIS_X, tw = this.TUBE_W;
      inst.appendChild(this._svgEl('rect', {
        x: ax - tw / 2, y: this.TOP - 26, width: tw, height: (this.BOT - this.TOP) + 52,
        rx: tw / 2, 'class': 'cld-tube'
      }));
      this._bulb = this._svgEl('circle', { cx: ax, cy: this.BOT + 78, r: 74, 'class': 'cld-bulb' });
      inst.appendChild(this._bulb);
      /* the liquid: one rect from the bulb up to MARK A (never the higher mark — see liquidSeg), plus
         the bulb's own fill. Its top edge goes through `yFor`, the same
         affine map as every tick — there is no second path. */
      this._liquid = this._svgEl('rect', { x: ax - tw / 2 + 14, width: tw - 28, 'class': 'cld-liquid' });
      inst.appendChild(this._liquid);
      this._bulbFill = this._svgEl('circle', { cx: ax, cy: this.BOT + 78, r: 58, 'class': 'cld-liquid' });
      inst.appendChild(this._bulbFill);

      /* the scale: a grabbable group of ticks and numerals */
      this._scale = this._svgEl('g', { 'class': 'cld-scale' });
      inst.appendChild(this._scale);

      /* the zero line — furniture, never a named part */
      this._zero = this._svgEl('line', { 'class': 'cld-zero' });
      inst.appendChild(this._zero);

      /* the two marks */
      this._mk = {};
      this._mk.a = this._svgEl('g', { 'class': 'cld-mark cld-mark-a' });
      this._mk.b = this._svgEl('g', { 'class': 'cld-mark cld-mark-b' });
      this._spanEl = this._svgEl('text', { 'class': 'cld-span', 'text-anchor': 'middle', 'dominant-baseline': 'central' });
      inst.appendChild(this._spanEl);
      inst.appendChild(this._mk.a);
      inst.appendChild(this._mk.b);
      ['a', 'b'].forEach(function (k) {
        self._mk[k].appendChild(self._svgEl('rect', { x: -96, y: -9, width: 96, height: 18, rx: 9, 'class': 'cld-mark-bar' }));
        self._mk[k].appendChild(self._svgEl('circle', { cx: 0, cy: 0, r: 22, 'class': 'cld-mark-dot' }));
      });

      bench.appendChild(svg);

      /* the handles are 44px HTML buttons over the SVG, never circles in
         it — a radius in model units cannot hold a floor in pixels
         (#41 rendered 44 model units as 29px). */
      this._hA = this._handle(bench, 'cld-h-a', 'markAAria');
      this._hB = this._handle(bench, 'cld-h-b', 'markBAria');
      this._hS = this._handle(bench, 'cld-h-s', 'scaleAria');

      wrap.appendChild(bench);

      this._hint = api.el('div', 'cld-hint');
      wrap.appendChild(this._hint);

      var foot = api.el('div', 'cld-foot');
      this._chipTip = this._chip(foot, '', function () { self.st = self.tip(self.st); self._paint(); });
      this._chipZero = this._chip(foot, '', function () {
        var n = self.findZero(self.st); if (n) { self.st = n; self._paint(); }
      });
      this._chipNext = this._chip(foot, '', function () { self._next(); });
      this._chipPrint = this._chip(foot, 'cld-lock', function () {
        if (!self.premium) { self._showGate(); return; }
        self._buildSheet();
        try { window.print(); } catch (_) { }
      });
      wrap.appendChild(foot);

      this._sheetEl = api.el('div', 'cld-sheet');
      wrap.appendChild(this._sheetEl);

      if (!this._wired) { this._wireDrags(); this._wired = true; }
      api.stage.appendChild(wrap);
    },

    /* the x of a mark's centre, in model units. THE single source for
       both the SVG dot and the HTML grip that drives it — see the two
       call sites in _paint. The two marks sit 96 units apart on the
       SAME side of the column, so they cannot collide when the span is
       0; that separation is structural, not a tap-target floor. */
    _markX: function (ax, k) {
      return ax - this.TUBE_W / 2 - 6 - (k === 'a' ? 0 : 96);
    },

    _chip: function (foot, cls, fn) {
      var b = this.api.el('button', 'cld-chip' + (cls ? ' ' + cls : ''));
      b.type = 'button';
      b.addEventListener('click', function (ev) { ev.preventDefault(); fn(); });
      foot.appendChild(b);
      return b;
    },

    _handle: function (bench, cls, ariaKey) {
      var b = this.api.el('button', 'cld-handle ' + cls);
      b.type = 'button';
      b.setAttribute('aria-label', this.api.t(ariaKey));
      b.appendChild(this.api.el('span', 'cld-grip'));
      bench.appendChild(b);
      return b;
    },

    /* ---- pointer maths ---------------------------------------------
       ⚠ getBoundingClientRect() ON A ROTATED ELEMENT RETURNS THE
       AXIS-ALIGNED BOX, not the rotated rect — so rect-based pointer
       maths is silently wrong the moment the instrument is tipped.
       `getScreenCTM().inverse()` maps a screen point into the group's
       OWN user space and already carries the rotation, which gives ONE
       drag code path for both orientations instead of two.
       ⚠ And `LCS.drag.linear` is `valueFromPointer(clientX, rect)` —
       clientX ONLY — so every drag here is hand-rolled, as #42's was.
       ---------------------------------------------------------------- */
    _toModel: function (clientX, clientY) {
      var m = this._inst.getScreenCTM();
      if (!m) return null;
      var p = this._svg.createSVGPoint();
      p.x = clientX; p.y = clientY;
      var q = p.matrixTransform(m.inverse());
      return { x: q.x, y: q.y };
    },
    _valueAt: function (clientX, clientY) {
      var p = this._toModel(clientX, clientY);
      if (!p) return null;
      var s = this._st(this.st);
      return s.lo + (this.BOT - p.y) / this.unit();
    },

    _wireDrags: function () {
      var self = this;
      var drag = function (el, onMove, onTap) {
        var active = false;
        var start = null;
        el.addEventListener('pointerdown', function (ev) {
          if (ev.button !== undefined && ev.button !== 0) return;
          active = true;
          start = self._valueAt(ev.clientX, ev.clientY);
          ev.preventDefault();
        });
        /* ⚠ bound to WINDOW, not the element: a repaint that removes the
           captured node releases pointer capture (#40 paid for that). */
        window.addEventListener('pointermove', function (ev) {
          if (!active) return;
          var v = self._valueAt(ev.clientX, ev.clientY);
          if (v === null) return;
          onMove(v, start);
          ev.preventDefault();
        });
        window.addEventListener('pointerup', function () { active = false; start = null; });
        /* every handle also acts on click and on Enter/Space — a
           drag-only handle is dead to a keyboard, to assistive tech and
           to the liveness gate (#41's flag scored 0/9 paths). */
        el.addEventListener('click', function (ev) { ev.preventDefault(); if (onTap) onTap(); });
        el.addEventListener('keydown', function (ev) {
          var k = ev.key;
          if (k === 'Enter' || k === ' ') { ev.preventDefault(); if (onTap) onTap(); return; }
          if (k === 'ArrowUp' || k === 'ArrowRight') { ev.preventDefault(); onMove(null, null, 1); }
          if (k === 'ArrowDown' || k === 'ArrowLeft') { ev.preventDefault(); onMove(null, null, -1); }
        });
      };

      var mark = function (which, el) {
        drag(el, function (v, _s, step) {
          var cur = self._st(self.st)[which];
          var want = (step !== undefined && step !== null) ? cur + step : v;
          var n = self.setMark(self.st, which, want);
          if (n) { self.st = n; self._paint(); }
        }, function () {
          var s = self._st(self.st);
          var n = self.setMark(self.st, which, s[which] >= self.DMAX ? self.DMAX - 1 : s[which] + 1);
          if (n) { self.st = n; self._paint(); }
        });
      };
      mark('a', this._hA);
      mark('b', this._hB);

      drag(this._hS, function (v, startV, step) {
        var n;
        if (step !== undefined && step !== null) n = self.slideBy(self.st, step);
        else if (startV === null || startV === undefined) return;
        else n = self.slideBy(self.st, startV - v);
        if (n) { self.st = n; self._paint(); }
      }, function () {
        var n = self.findZero(self.st);
        if (n) { self.st = n; self._paint(); }
      });
    },

    /* ---- paint ------------------------------------------------------
       Built ONCE, repainted after. The scale's ticks are the one thing
       rebuilt per window, because their VALUES change when it slides.
       ---------------------------------------------------------------- */
    _paint: function () {
      var api = this.api, s = this._st(this.st), self = this;
      var ax = this.AXIS_X, u = this.unit();
      var hi = s.lo + this.WINDOW - 1;

      /* ⭐ THE TIP — one matrix on one group. Nothing below is
         recomputed for the tipped case; the layout answers. */
      if (s.tipped) this._inst.setAttribute('transform', 'rotate(90 ' + (this.W / 2) + ' ' + (this.H / 2) + ')');
      else this._inst.removeAttribute('transform');

      /* the scale */
      while (this._scale.firstChild) this._scale.removeChild(this._scale.firstChild);
      var v, y, isLabel;
      for (v = s.lo; v <= hi; v++) {
        y = this.yFor(s, v);
        isLabel = (v % this.LABEL_EVERY === 0);
        this._scale.appendChild(this._svgEl('line', {
          x1: ax + this.TUBE_W / 2 + 6, y1: y,
          x2: ax + this.TUBE_W / 2 + (isLabel ? 46 : 24), y2: y,
          'class': 'cld-tick' + (isLabel ? ' cld-tick-major' : '')
        }));
        if (isLabel) {
          var t = this._svgEl('text', {
            x: ax + this.TUBE_W / 2 + 104, y: y, 'class': 'cld-num',
            'text-anchor': 'middle', 'dominant-baseline': 'central'
          });
          /* ⚠ U+2212 MINUS SIGN, never a hyphen — inheriting
             open-number-line.js:131's shipped doctrine, and the glyph
             draw-bag.js:886 reserved for this tool by name. */
          t.textContent = (v < 0 ? '−' : '') + Math.abs(v);
          /* the numerals stay upright when the instrument turns */
          if (s.tipped) t.setAttribute('transform', 'rotate(-90 ' + (ax + this.TUBE_W / 2 + 104) + ' ' + y + ')');
          this._scale.appendChild(t);
        }
      }

      /* zero is furniture, and only drawn when it is in view */
      if (this.inView(s, 0)) {
        y = this.yFor(s, 0);
        this._zero.setAttribute('x1', ax - 210);
        this._zero.setAttribute('x2', ax + this.TUBE_W / 2 + 96);
        this._zero.setAttribute('y1', y);
        this._zero.setAttribute('y2', y);
        this._zero.style.display = '';
      } else {
        this._zero.style.display = 'none';
      }

      /* the liquid: bulb up to mark A, through the SAME affine map as
         every tick — there is no second path, which is what makes "no
         squash at zero" true by construction. */
      /* the bulb is only honest at the bottom of the domain */
      var atFloor = (s.lo === this.DMIN);
      this._bulb.style.display = atFloor ? '' : 'none';
      this._bulbFill.style.display = (atFloor && s.a > s.lo) ? '' : 'none';
      var seg = this.liquidSeg(s);
      if (seg) {
        var yHi = this.yFor(s, seg.to), yLo = this.yFor(s, seg.from);
        this._liquid.setAttribute('y', yHi);
        this._liquid.setAttribute('height', Math.max(0, yLo - yHi));
        this._liquid.style.display = '';
      } else {
        this._liquid.style.display = 'none';
      }

      /* the marks */
      ['a', 'b'].forEach(function (k) {
        var val = s[k], g = self._mk[k];
        var vis = self.inView(s, val);
        g.style.display = vis ? '' : 'none';
        if (!vis) return;
        g.setAttribute('transform', 'translate(' + self._markX(ax, k) + ' ' + self.yFor(s, val) + ')');
      });

      this._bench.setAttribute('aria-label', api.t('sceneLabel')
        + (this.inView(s, 0) ? '' : ' ' + api.t('zeroOff')));

      /* the span — operator ruling 3. It is the SUBJECT of the routine
         ("is that a bigger jump, or the same one?"), and showing it is
         what lets two intervals in different places be compared at all.
         ⚠ It does not collide with `span-length-gap`, which owns "how
         much longer" as a TYPED question: this shows, and never asks.
         Drawn only when both marks are in view, because a distance
         between something visible and something off-screen is a claim
         the child cannot check. */
      var bothIn = this.inView(s, s.a) && this.inView(s, s.b);
      if (bothIn && s.a !== s.b) {
        var ym = (this.yFor(s, s.a) + this.yFor(s, s.b)) / 2;
        this._spanEl.setAttribute('x', ax - self.TUBE_W / 2 - 300);
        this._spanEl.setAttribute('y', ym);
        this._spanEl.textContent = String(this.spanOf(s));
        if (s.tipped) this._spanEl.setAttribute('transform', 'rotate(-90 ' + (ax - this.TUBE_W / 2 - 300) + ' ' + ym + ')');
        else this._spanEl.removeAttribute('transform');
        this._spanEl.style.display = '';
      } else {
        this._spanEl.style.display = 'none';
      }

      /* the handles, positioned in % over the bench so a 44px floor is
         a floor in PIXELS. When tipped, the axis the marks travel along
         is horizontal, so the % maths swaps — derived from the same
         model point, never a second formula. */
      var place = function (el, mx, my, vis) {
        var q = self.toScreen(s, mx, my);
        el.style.left = (q.x / self.W * 100) + '%';
        el.style.top = (q.y / self.H * 100) + '%';
        el.style.display = vis ? '' : 'none';
      };
      /* ⚠ the two handles are offset PERPENDICULAR to the axis — both
         on the SAME side, 96 units apart, so they cannot collide when
         the span is 0. (An earlier comment said one on each side; it
         was wrong. The non-collision is real, the stated reason was
         not.) —
         structural, not a floor. #42 never met this because its two
         handles were on separate rows. */
      /* ⭐ THE SAME EXPRESSION THAT DRAWS THE MARK, not a second one
         that happens to sit near it. These were two formulas — the dot
         at -6 and the grip at -20 — so the grip stood 14 model units
         off its own mark, and each mark read as TWO circles once the
         dot and the grip were both visible. Two numbers that agree are
         a coincidence waiting to end; one expression evaluated twice
         cannot drift. (The same discipline as #42's payoff.) */
      place(this._hA, this._markX(ax, 'a'), this.yFor(s, s.a), this.inView(s, s.a));
      place(this._hB, this._markX(ax, 'b'), this.yFor(s, s.b), this.inView(s, s.b));
      /* the scale's own grab handle sits on the numerals' side */
      place(this._hS, ax + this.TUBE_W / 2 + 104, (this.TOP + this.BOT) / 2, true);

      /* ⚠ EVERY AUTHORED STRING MUST BE REACHABLE. Four hints, four
         reachable states — a source scan cannot tell "the string
         exists" from "the string is reached" (#39). */
      var key = s.tipped ? 'hintTip'
        : (!this.inView(s, s.a) || !this.inView(s, s.b)) ? 'hintSlide'
          : (s.a === s.b) ? 'hintSet' : 'hintSpan';
      this._hint.textContent = api.t(key);

      this._chipTip.textContent = api.t(s.tipped ? 'standBtn' : 'tipBtn');
      this._chipZero.textContent = api.t('zeroBtn');
      this._chipZero.disabled = (this.findZero(s) === null);
      this._chipNext.textContent = api.t('nextBtn');
      this._chipPrint.textContent = api.t('printBtn');
    },

    /* ---- the repertoire --------------------------------------------- */
    FREE_SETTINGS: 5,
    FALLBACK_SETS: {
      version: 1, freeCount: 5,
      sets: [
        { lo: -10, a: -5, b: 3 }, { lo: -10, a: -8, b: -2 }, { lo: 0, a: 10, b: 18 },
        { lo: -10, a: 0, b: 8 }, { lo: -5, a: -3, b: 12 }
      ]
    },
    _sets: function () {
      var all = (this._book && this._book.sets) || this.FALLBACK_SETS.sets;
      var out = [], i;
      /* ⚠ an offline fallback must degrade to the FREE TIER, not to
         nothing (#38). */
      for (i = 0; i < all.length; i++) if (i < this.FREE_SETTINGS || this.premium) out.push(all[i]);
      return out;
    },
    _next: function () {
      var list = this._sets();
      if (!list.length) return;
      this._idx = ((this._idx || 0) + 1) % list.length;
      var e = list[this._idx];
      this.st = this._st({ lo: e.lo, a: e.a, b: e.b, tipped: this._st(this.st).tipped });
      this._paint();
      if (!this.premium && this._idx === 0) this._showGate();
    },

    _showGate: function () {
      var api = this.api;
      if (!this._wrap || this._wrap.querySelector('.cld-gate')) return;
      var g = api.el('div', 'cld-gate');
      var h = api.el('div', ''); h.textContent = api.t('gateTitle');
      var p = api.el('div', ''); p.textContent = api.t('gateBody');
      var a = api.el('a', ''); a.href = '/pricing'; a.textContent = api.t('gateCta');
      g.appendChild(h); g.appendChild(p); g.appendChild(a);
      this._wrap.appendChild(g);
    },

    /* ---- the sheet ---------------------------------------------------
       A real print surface. ⚠ #40 and #41 each shipped a Print chip that
       called window.print() with NO @media print block, so they printed
       the whole web page; and the generic liveness gate cannot see it,
       because window.print fires either way.
       ---------------------------------------------------------------- */
    _buildSheet: function () {
      var s = this._st(this.st), i, v, y;
      while (this._sheetEl.firstChild) this._sheetEl.removeChild(this._sheetEl.firstChild);
      this._sheetEl.className = 'cld-sheet cld-sheet-2';
      for (i = 0; i < 2; i++) {
        var svg = this._svgEl('svg', { viewBox: '0 0 ' + this.W + ' ' + this.H, 'class': 'cld-sheet-svg' });
        var g = this._svgEl('g', i === 1 ? { transform: 'rotate(90 ' + (this.W / 2) + ' ' + (this.H / 2) + ')' } : {});
        g.appendChild(this._svgEl('rect', {
          x: this.AXIS_X - this.TUBE_W / 2, y: this.TOP - 26,
          width: this.TUBE_W, height: (this.BOT - this.TOP) + 52, rx: this.TUBE_W / 2, 'class': 'cld-p-tube'
        }));
        for (v = s.lo; v <= s.lo + this.WINDOW - 1; v++) {
          y = this.yFor(s, v);
          var major = (v % this.LABEL_EVERY === 0);
          g.appendChild(this._svgEl('line', {
            x1: this.AXIS_X + this.TUBE_W / 2 + 6, y1: y,
            x2: this.AXIS_X + this.TUBE_W / 2 + (major ? 46 : 24), y2: y, 'class': 'cld-p-tick'
          }));
        }
        if (s.lo === this.DMIN) {
          g.appendChild(this._svgEl('circle', { cx: this.AXIS_X, cy: this.BOT + 78, r: 74, 'class': 'cld-p-tube' }));
        }
        svg.appendChild(g);
        this._sheetEl.appendChild(svg);
      }
    },

    /* ---- store + entitlement (the shipped shape, #42) ---------------- */
    _loadStore: function () {
      var s = null;
      try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) { }
      if (!s || typeof s !== 'object') s = {};
      if (!s.v) s.v = 1;
      return s;
    },
    _saveStore: function () {
      try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) { }
    },
    _fetchEntitlement: function () {
      var self = this, token = null;
      try { token = localStorage.getItem('accessToken'); } catch (_) { }
      var trustCache = function () {
        var ent = self._store.ent;
        if (ent && ent.checkedAt) {
          var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
          self.premium = (age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false;
        } else self.premium = false;
        self.premiumKnown = true;
        if (self._wrap) self._paint();
      };
      if (!token) { self.premium = false; self.premiumKnown = true; if (self._wrap) self._paint(); return; }
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j) { self.premium = false; self.premiumKnown = true; if (self._wrap) self._paint(); return; }
          var tier = j.user && j.user.subscriptionTier, sub = j.subscription;
          self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
          self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
          self._saveStore();
          self.premiumKnown = true;
          if (self._wrap) self._paint();
        })
        .catch(trustCache);
    },

    /* ⚠ THE SHELL'S RESET IS A REAL CONTROL AND IT NEEDS A HOOK.
       `lcs-shell.js:531` calls `tool.reset()` if a tool provides one —
       and without it the Reset button in the header is DEAD, which
       `audit-tool-control-liveness` scored as a warning across 11
       reachable paths while every sibling passed. A shipped control that
       does nothing is the #39 defect, and this one is not even mine to
       draw: the shell draws it and I failed to answer it. */
    reset: function () {
      this.st = this.newState();
      this._idx = -1;
      if (this._wrap) this._paint();
    },

    init: function (api) {
      this.api = api;
      document.body.classList.add('cld-wide');
      injectColdLineCSS();
      this._store = this._loadStore();
      var ent = this._store.ent;
      if (ent && ent.tier) this.premium = ent.tier !== 'free';
      this.st = this.newState();
      this._idx = -1;
      this._book = this.FALLBACK_SETS;
      this._fetchEntitlement();
      this._loadBook();
    },

    /* ⚠ the repertoire is fetched, and the FALLBACK is already in place
       before the fetch starts — an offline fallback must degrade to the
       FREE TIER, not to nothing (#38). */
    _loadBook: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      fetch('/mini-tools/cold-line-sets.json', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j || !j.sets || !j.sets.length) return;
          self._book = j;
          if (typeof j.freeCount === 'number') self.FREE_SETTINGS = j.freeCount;
          if (self._wrap) self._paint();
        })
        .catch(function () { /* the fallback is already live */ });
    }
  };

  /* =====================================================================
     CSS. Direction A tokens, `cld-` prefix, injected once.
     ===================================================================== */
  function injectColdLineCSS() {
    if (document.getElementById('cld-style')) return;
    var css = ''
      + '.cld-wrap{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;width:100%;}'
      /* ⚠ THE BENCH MUST YIELD SPACE TO THE CHROME, NOT OVERFLOW PAST
         IT. `max-height:100%` resolves against .cld-wrap, which is an
         auto-height flex row, so it constrained NOTHING: at desktop the
         bench took its full 660px square and the hint line plus the
         chip row pushed the bottom of the tool to 942px — past a 900px
         viewport, silently, because .lcs-app is overflow:hidden and
         clips rather than scrolls.
         It failed in es, pt, it and nl only, and that is the tell: the
         same layout, a longer hint, one more wrapped line. English fit,
         so a single-locale check would have called this clean.
         An explicit square cap fixes it at the instrument, which is the
         flexible part — the chrome is text and cannot be shrunk. `vh`
         is forbidden here (it is measured against the window, not the
         iframe) and `vw` lies inside the 720px-capped shell, so the cap
         is a plain length. At 560px the bench still gives ~20px per
         scale unit and ~26px numerals, well above the legibility floor
         the band was derived from. */
      /* ⚠⚠ THE CAP IS ON THE WIDTH, AND THE ARENA MUST STAY SQUARE.
         Capping the HEIGHT instead (max-width:660 + max-height:560 on
         an aspect-ratio:1/1 box) produces a 660x560 element — NOT a
         square. The SVG then letterboxes to 560 with a 50px inset,
         while the HTML handles are positioned as a % of the 660-wide
         BOX, so every handle drifted off the mark it controls: 14.6px
         at mark A, 24.2px at mark B, growing with distance from the
         centre. Each mark rendered as TWO circles — on a tool whose
         entire subject is two marks.
         Nothing caught it. The layout gate measures chips and hints;
         local-test drags through getScreenCTM, which is correct in
         both cases; every suite stayed green. I found it by looking at
         the 768px render, which is exactly why that step is in the
         definition of done and not optional.
         The square is not cosmetic — toScreen maps (x,y) -> (W-y,x),
         and that is only an isometry on a square. Both gates below now
         assert it. */
      + '.cld-bench{position:relative;width:100%;max-width:560px;aspect-ratio:1/1;'
      + 'margin:0 auto;border-radius:18px;background:#FBF3E4;'
      + 'border:2px solid rgba(20,107,94,.18);}'
      + '.cld-svg{display:block;width:100%;height:100%;}'

      + '.cld-tube{fill:#FFFDF7;stroke:#146B5E;stroke-width:5;}'
      + '.cld-bulb{fill:#FFFDF7;stroke:#146B5E;stroke-width:5;}'
      + '.cld-liquid{fill:#C8613A;}'
      + '.cld-tick{stroke:#3C6E63;stroke-width:3;}'
      + '.cld-tick-major{stroke:#0F4A40;stroke-width:5;}'
      /* ⚠ the numerals are SVG text sized in MODEL units here, but their
         legibility floor is asserted in PIXELS on the real bench — the
         #42 lesson, where a size in px and an offset in model units put
         a numeral inside its own grip. */
      + '.cld-num{fill:#0F4A40;font-family:"Baloo 2",Nunito,sans-serif;font-weight:800;font-size:46px;}'
      + '.cld-zero{stroke:#C8613A;stroke-width:5;stroke-dasharray:14 10;}'
      + '.cld-mark-bar{fill:rgba(20,107,94,.16);}'
      + '.cld-mark-dot{fill:#0F4A40;}'
      + '.cld-mark-b .cld-mark-dot{fill:#FBF3E4;stroke:#0F4A40;stroke-width:6;}'
      + '.cld-span{fill:#0F4A40;font-family:"Baloo 2",Nunito,sans-serif;font-weight:800;font-size:52px;}'

      + '.cld-handle{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;padding:0;'
      + 'border:0;background:transparent;cursor:grab;touch-action:none;display:flex;'
      + 'align-items:center;justify-content:center;border-radius:50%;}'
      + '.cld-handle:active{cursor:grabbing;}'
      + '.cld-handle:focus-visible{outline:3px solid #146B5E;outline-offset:-2px;}'
      + '.cld-grip{display:block;width:18px;height:18px;border-radius:50%;background:#0F4A40;'
      + 'box-shadow:0 0 0 3px rgba(251,243,228,.92);}'
      + '.cld-h-b .cld-grip{background:#FBF3E4;box-shadow:0 0 0 4px #0F4A40;}'
      + '.cld-h-s .cld-grip{width:14px;height:30px;border-radius:7px;background:#3C6E63;}'

      + '.cld-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;'
      + 'line-height:1.45;color:#3C6E63;max-width:660px;}'
      + '.cld-foot{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%;max-width:660px;}'
      + '.cld-chip{font:600 clamp(.9rem,3.2vw,1.02rem)/1.1 Nunito,sans-serif;padding:11px 18px;'
      + 'min-height:44px;border-radius:999px;border:2px solid #146B5E;background:#FFFDF7;'
      + 'color:#0F4A40;cursor:pointer;}'
      + '.cld-chip:first-child{background:#F2784B;border-color:#F2784B;color:#fff;}'
      + '.cld-chip.cld-lock{border-color:#C8613A;color:#C8613A;background:transparent;}'
      + '.cld-chip[disabled]{opacity:.45;cursor:default;}'
      + '.cld-gate{width:100%;max-width:660px;border-radius:16px;border:2px dashed #C8613A;'
      + 'padding:14px 16px;text-align:center;font-family:Nunito,sans-serif;color:#3C6E63;}'
      + '.cld-gate a{color:#C8613A;font-weight:700;}'

      + '.cld-sheet{display:none;}'
      + '.cld-sheet-svg{width:100%;height:auto;break-inside:avoid;}'
      + '.cld-p-tube{fill:none;stroke:#000;stroke-width:3;}'
      + '.cld-p-tick{stroke:#000;stroke-width:2;}'

      /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
         ⚠⚠ THE ONLY SAFE LEVER HERE IS max-width, and the note above
         `.cld-bench` says why in detail: capping the HEIGHT of an
         `aspect-ratio:1/1` box gives a RECTANGLE, the SVG letterboxes, and
         every HTML handle drifts off the mark it controls — two circles per
         mark, on a tool whose whole subject is two marks. `toScreen` maps
         (x,y) -> (W-y,x), an isometry only on a square. So: raise the width
         cap and nothing else, and let the square follow.
         The bench is square, so its height IS its width — these values are
         the tier's own MINIMUM height minus the ~410px of chrome around it,
         which is what the probe measures at each floor. A fourth step keyed
         only on height, because a 1440-tall board can afford far more than
         tier C's 1150 floor. */
      + '@media (min-width:1367px) and (min-height:880px){'
      + '  body.cld-wide .cld-bench{max-width:640px;}'
      + '  body.cld-wide .cld-hint,body.cld-wide .cld-foot{max-width:760px;}'
      + '  body.cld-wide .cld-handle{width:56px;height:56px;margin:-28px 0 0 -28px;}'
      + '  body.cld-wide .cld-grip{width:23px;height:23px;}'
      + '  body.cld-wide .cld-h-s .cld-grip{width:18px;height:38px;border-radius:19px;}'
      + '}'
      + '@media (min-width:1800px) and (min-height:1080px){'
      + '  body.cld-wide .cld-bench{max-width:800px;}'
      + '  body.cld-wide .cld-hint,body.cld-wide .cld-foot{max-width:920px;}'
      + '  body.cld-wide .cld-handle{width:64px;height:64px;margin:-32px 0 0 -32px;}'
      + '  body.cld-wide .cld-grip{width:27px;height:27px;}'
      + '  body.cld-wide .cld-h-s .cld-grip{width:21px;height:44px;border-radius:22px;}'
      + '}'
      + '@media (min-width:2400px) and (min-height:1150px){'
      + '  body.cld-wide .cld-bench{max-width:860px;}'
      + '  body.cld-wide .cld-hint,body.cld-wide .cld-foot{max-width:1000px;}'
      + '  body.cld-wide .cld-handle{width:70px;height:70px;margin:-35px 0 0 -35px;}'
      + '  body.cld-wide .cld-grip{width:29px;height:29px;}'
      + '  body.cld-wide .cld-h-s .cld-grip{width:23px;height:48px;border-radius:24px;}'
      + '}'
      + '@media (min-width:2400px) and (min-height:1300px){'
      + '  body.cld-wide .cld-bench{max-width:1000px;}'
      + '}'

      + '@media print{'
      /* ⚠ browsers STRIP background colours when printing by default —
         #40's whole apparatus is background colour and would have
         printed near-blank even with a print block. */
      + '  *{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
      + '  .lcs-header,.lcs-hint,.cld-hint,.cld-foot,.cld-gate,.cld-bench,.cld-handle{display:none !important;}'
      + '  .cld-wrap{gap:0;}'
      + '  .cld-sheet{display:grid;gap:14mm;width:100%;}'
      + '  .cld-sheet-2{grid-template-columns:1fr;}'
      + '  @page{margin:14mm;}'
      + '}';
    var el = document.createElement('style');
    el.id = 'cld-style';
    el.textContent = css;
    document.head.appendChild(el);
  }

  if (typeof window !== 'undefined') window.ColdLine = ColdLine;
  if (typeof module !== 'undefined' && module.exports) module.exports = ColdLine;
}());
