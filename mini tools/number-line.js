/* =====================================================================
   TOOL #1 — NUMBER LINE   (number-line.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). The toolkit's OLDEST tool, brought to the v4
   standard; not a new catalog slot. The key, the slug and all eleven
   native slugs are UNCHANGED and must stay that way — `number-line` is
   an indexed URL with live search equity, and it owns the head term in
   all 11 locales (`cold-line.js:14` records that ownership). ⚠ THIS IS
   THE ONE BUILD WHERE THE NATIVE PANELS MUST NOT RENAME THE TOOL.

   THE LINE · THE HOP · THE RABBIT. Three named parts, and nothing else
   in this tool gets a noun.

   ⚠⚠ WHY THIS BUILD EXISTS. The landing page for this tool has sold
   jumps in all eleven locales since launch, and the tool has never had
   one. `frontend/messages/tool-content/en.json:26-49`, verbatim:
       tagline     "Jump along to add and subtract"
       about[1]    "addition as jumps to the right and subtraction as
                    jumps to the left"
       howToUse[1] "Model addition by starting on a number and jumping
                    forward, and subtraction by jumping back"
       howToUse[2] "Practise skip-counting by twos, fives, and tens by
                    taking equal jumps along the line"
       howToUse[3] "Ask children to predict where a jump will land
                    before they take it"
       ideas[0]    "Give a start number and a number of jumps, and ask
                    children where they will land"
       ideas[1]    "Show a finished jump and ask children to describe
                    the addition or subtraction it shows"
   Six of the seven described a tool that did not exist. ⭐ AND THE
   DIRECTION OF THE FIX IS FORCED: §21.5a freezes the copy on indexed
   pages until ~2026-09-01, so the page could not be corrected — the
   TOOL had to be. The published copy therefore SCOPES this build, and
   note what it does not mention: a character, a score, or a question.

   THE ROUTINE — "How many hops from here?"
     Set the start. Drag the hop to a length. Nobody says a number yet.
     "Where does she land on the first hop?" ... hands up, then Hop.
     "And the next one?" ... until somebody sees the pattern.
     "Does this hop fit exactly, or will she stop short?" — committed
      BEFORE All the way, which is the whole prediction.
     Then change ONE thing — the hop, or the range — and ask it again.

   THE ONE THESIS — A HOP HAS A LENGTH, SO *HOW MANY HOPS* AND *HOW FAR*
   ARE TWO DIFFERENT NUMBERS. The hop grip shows the unit; the rabbit
   shows the total; they are never the same number and they are never
   in the same place.

   THREE INVENTIONS:
     1. ⭐ THE HOP HAS ITS OWN GRIP, AND SETTING IT CLEARS THE TRAIL.
        That is not a convenience, it is the enforcement: there is no
        reachable state in this tool containing two hops of different
        length. `setHop` returns n=0, so an uneven skip-count cannot be
        drawn. ⚠ MEASURED against the whole platform: no object here
        makes an unequal hop IMPOSSIBLE. The nine printable number-line
        types cannot even express it — `scripts/worksheet-gen/
        primitives/number-line.js:37` is `for (v = from; v !== to;
        v += dir * tickStep)`, so the arc stride is hard-bound to the
        TICK step and there is no hop-length parameter at all; ask that
        family for a hop of 10 on a tick-1 line and you get ten unit
        arcs, and `types/_shared/number-line-tasks.js:136` asserts that
        as correct. The lily pads cannot show it either — they are
        index-positioned, so +5 and +10 are one gap with two labels.
     2. THE RABBIT IS THE MARKER, NOT A STICKER. She replaces the
        dot/heart/star token entirely, she is the only thing that moves,
        and she is drawn FROM THE SAME POSITION SAMPLE that inks the
        arc — so the ink can never lead or lag the animal.
     3. ⭐ AT THE WALL THE HOP IS REFUSED, NOT CLAMPED. `hop()` returns
        null rather than a short landing. A clamped 2-wide arc sitting
        among 5-wide ones would falsify invention 1 ON SCREEN, and "every
        hop is the same length" is the claim. The leftover gap is drawn
        as ABSENCE, and it is the subject of step 4 of the routine.

   ⚠ THE FENCE — FOUR SURFACES, RUN FRESH. It came back occupied on
   three, and per §23.3 the overlap is SUBTRACTED, not negotiated:
     TAKEN — the EMPTY line with VARIABLE jumps is `#26
       open-number-line`: no ticks, no scale, the child invents each
       jump size, "two children can solve 47+25 with completely
       different jumps and both be right." Its own gate G17 is THE
       COLLISION GUARD and forbids IT from drawing fixed ticks. ⭐ Its
       header ships a 2x2 whose MARKED-LINE x UNGRADED quadrant is
       empty. That quadrant is this tool.
       ⚠ And its fr/it/fi titles literally mean THE LINE OF JUMPS
       (`La ligne des sauts`, `La linea dei salti`, `Piirrä hypyt`) —
       so in those three the jump noun is a sibling's shipped NAME.
     TAKEN — equal repeated hops as a GRADED round: `skipcount`
       (2.NBT.A.2, "Hopper's Lily Hops", numbered pads and +5/+10 arc
       labels), `numberline-jump-core` (2.MD.B.6, one hop, dial the
       landing), `ten-stones` (1.OA.C.6, 0..20, coral +N arcs).
       ⭐ So this tool IS NEVER GRADED. No `tasks`, no `nextTask`,
       therefore no `educationalAlignment`, therefore NO CCSS CODE CAN
       COLLIDE — the absence is what holds the fence.
     TAKEN — the CHARACTER. Three frogs already hop lines here (Hopper
       twice, Lily once), `docs/character-art-spec.md:943` records
       "Hopper's Lily Hops owns the hop/skip-count theme", and
       `open-number-line.js:26` states "Hopper's frog is that activity's
       character and is deliberately NOT reused here." ⭐ So the
       character here is A RABBIT, Character #77, and never a frog.
     TAKEN — hop arcs on PAPER: `types/g1/G1-116..119` and
       `types/g3/G3-308 "Multiplication Hops"` / `G3-310`. ⚠ THE
       PRINTABLE CATALOG HAS NO CCSS FIELD AT ALL, which is why a
       code-keyed fence returns a false all-clear on this surface and
       why three fences in this program missed it. So the sheet here
       prints the one thing that family cannot draw — see `_buildSheet`.
     TAKEN — negatives are `#43 cold-line`, whose fence cites THIS
       FILE'S OLD LINE 60 (`min(){return 0}`) by number. It stays true:
       `DMIN` is 0 and no reducer can reach below it.
     TAKEN — skip counting on a GRID is `#19 choral-counting`. No
       spacing, no distance, no line. ⚠ AND A LIVE TIER CLASH: #19 sells
       an arbitrary skip step as PREMIUM in 11 locales. Here the hop
       length is the tool's FIRST AFFORDANCE and v4 forbids gating the
       apparatus, so it is FREE. Operator-ruled 2026-08-03: free here,
       #19 revisited separately. Recorded so the inconsistency is
       deliberate rather than silently created.
     REMAINDER, measured: a hop with a LENGTH, set once, physically
       enforced, on an already-ticked line, ungraded.

   REFUSES, FOREVER — each one gated:
     1. NEVER TWO HOPS OF DIFFERENT LENGTH. Structural: `setHop` clears
        the trail. This is the tool.
     2. NEVER CLAMPS A HOP AT THE WALL. `hop()` refuses. A short arc
        would falsify refuse 1 on screen.
     3. NEVER BELOW ZERO. `#43` owns signed position and cites this
        file's floor by line number.
     4. NEVER GRADES, NEVER ASKS, NEVER SCORES. No `tasks`, no keypad,
        no `?`, no verdict, no timer, no streak, no Check. Three graded
        activities own the question; this SHOWS.
     5. NEVER DRAWS AN UNTICKED LINE. `#26`'s G17 is the mirror of this
        one; between them the two line tools cannot drift into each
        other.
     6. NEVER WRITES AN EQUATION. `5 + 5 + 5 = 15` is `array-core`'s
        output in 11 locales. The arcs and the landings say it.
     7. NEVER SPEAKS. TTS is reliable in 5 of 11 locales (§23.2), so
        nothing here may depend on hearing.
     8. NO WORD ON THE APPARATUS. Numerals, the rabbit and the material
        only. Every authored string is chrome — title, hint, chips.
     9. NEVER A FROG. See the fence.

   ⚠ AND THREE LIVE RENDERING DEFECTS THIS BUILD FIXES, measured not
   assumed. The old stage was `viewBox="0 0 1000 100"` +
   `preserveAspectRatio="none"` inside `width:min(900px,100%)` x
   `height:clamp(72px,12vmin,108px)`, so the distortion `D = W/(10*H)`
   ran 0.42 at 320px to 0.83 at 900px, and:
     · `.nl-tick{stroke-width:1.5}` is a VERTICAL line, so it scaled by
       scaleX and rendered at 0.45px on a phone;
     · `.nl-axis{stroke-width:3}` is HORIZONTAL, so it scaled by scaleY
       and rendered at 2.16px — THE AXIS WAS FIVE TIMES ITS OWN TICKS;
     · `.nl-label{font-size:13px}` rendered 9.4px tall and condensed to
       40% width. The numerals on a number line were below the 14px
       legibility floor.
   Fixed by `vector-effect:non-scaling-stroke` on every stroke and by
   moving every numeral into the HTML overlay.

   ⭐ THE OVERLAY RULE, and it decides the whole layout:
       X-EXTENT CARRIES MEANING -> viewBox.   (axis, ticks, arcs)
       ASPECT CARRIES MEANING   -> HTML overlay. (numerals, the rabbit)
   `preserveAspectRatio="none"` LOOKS like the villain and is the
   opposite: it is the only setting under which the viewBox maps to the
   box edge-to-edge in BOTH axes, so `left = x/W*100 + '%'` and
   `top = y/H*100 + '%'` are exact with zero measurement and NO
   LETTERBOX IS POSSIBLE — therefore no handle drift is possible. Giving
   the arena a real aspect instead is exactly #43's recorded defect
   (24.2px of drift, every gate green) re-committed on purpose. And a
   counter-scaled SVG `<g>` loses because `lcs-shell.js:950`'s
   ResizeObserver only posts a height message — it never calls
   `tool.render()`, so nothing re-runs the measurement.
   ⚠ The two grips are NOT overlaid on the stage at all; they live on
   their own rails below it, so a 44px floor is a floor in pixels and
   the two can never collide however small the hop.

   0 lines to lcs-shell.{js,css} or any protected core.
   ===================================================================== */

(function () {
  'use strict';

  var NumberLine = {
    id: 'number-line',

    /* ---------------------------------------------------------------
       STRINGS — EN authored; the other ten are REBUILT (not translated)
       by a three-person NATIVE panel per locale, §A.13.48.
       ⚠ DO NOT HAND-EDIT A LOCALE HERE. SoT is
       scripts/_number-line-strings.js, applied by
       scripts/apply-number-line-locales.js.
       ⚠ NO STRING MAY name a unit, carry a verdict, ask a question with
       an answer, or name the tool anything other than its shipped head
       term — the slug is indexed (see the header).
       --------------------------------------------------------------- */
    strings: {
      /* ⚠⚠ GENERATED — DO NOT HAND-EDIT A LOCALE HERE.
         SoT: scripts/_number-line-strings.js
         Apply: node scripts/apply-number-line-locales.js
         Rebuilt (not translated) by four native panels, §A.13.48.
         The rulings that are not visible in the strings — the da/no
         mare trap, the fi sibling-title collision, the fr/it noun
         split, and the rabbit’s grammatical gender per locale —
         are recorded in the SoT header. Read it before changing one
         word here. */
      title: { en: "Number Line", de: "Zahlenstrahl", fr: "Ligne numérique", it: "Linea dei numeri", es: "Recta numérica", pt: "Reta numérica", nl: "Getallenlijn", sv: "Tallinjen", da: "Tallinjen", no: "Tallinjen", fi: "Lukusuora" },
      instruction: { en: "Set where the rabbit starts, then set how long one hop is. Every hop after that is exactly that length.", de: "Stellen Sie ein, wo der Hase steht, und ziehen Sie dann die Sprungweite auf. Ab da ist jeder Sprung genau gleich lang.", fr: "Placez le lapin à son point de départ, puis réglez la longueur d’un bond. Tous les bonds auront ensuite exactement cette longueur.", it: "Scegli da dove parte il coniglio, poi regola la lunghezza di un balzo. Da quel momento tutti i balzi hanno esattamente quella lunghezza.", es: "Elige dónde empieza la coneja y decide cuánto mide un salto. A partir de ahí, todos los saltos miden exactamente lo mismo.", pt: "Escolha onde a coelha começa e decida o tamanho de um salto. Daí em diante, todos os saltos têm exatamente o mesmo tamanho.", nl: "Kies waar het konijn begint en bepaal hoe groot één sprong is. Daarna is elke sprong precies even groot.", sv: "Bestäm var kaninen börjar. Dra sedan i hoppet för att bestämma hur långt ett hopp är – sedan blir varje hopp precis lika långt.", da: "Bestem, hvor kaninen starter. Træk så i hoppet for at bestemme, hvor langt ét hop er – derefter er hvert hop præcis lige langt.", no: "Bestem hvor kaninen starter. Dra så i hoppet for å bestemme hvor langt ett hopp er – etterpå er hvert hopp nøyaktig like langt.", fi: "Valitse, mistä kani aloittaa. Vedä sitten loikkaa ja päätä, kuinka pitkä yksi loikka on – sen jälkeen kaikki loikat ovat yhtä pitkiä." },
      sceneLabel: { en: "A number line with ticks and numerals. A rabbit stands on it, and every hop she takes is drawn as an arc above the line, all of them the same length. Below the line are three controls: where the rabbit starts, how long one hop is, and how far the line goes.", de: "Ein Zahlenstrahl mit Teilstrichen und Zahlen. Darauf steht ein Hase, und jeder Sprung, den er macht, wird als Bogen über dem Strahl gezeichnet — alle gleich breit. Unter dem Strahl liegen drei Regler: wo der Hase steht, wie weit ein Sprung geht, und wie weit der Strahl reicht.", fr: "Une ligne numérique avec ses graduations et ses nombres. Un lapin est posé dessus, et chaque bond qu’il fait est tracé comme un arc au-dessus de la ligne, tous de la même longueur. Sous la ligne, trois réglages : le point de départ du lapin, la longueur d’un bond, et jusqu’où va la ligne.", it: "Una linea dei numeri con le tacche e i numeri. Sopra c’è un coniglio, e ogni balzo che fa viene disegnato come un arco sopra la linea, tutti della stessa lunghezza. Sotto la linea ci sono tre regolazioni: da dove parte il coniglio, quanto è lungo un balzo, e fin dove arriva la linea.", es: "Una recta numérica con marcas y números. Sobre ella hay una coneja, y cada salto que da se dibuja como un arco encima de la recta, todos del mismo ancho. Debajo de la recta hay tres controles: dónde empieza la coneja, cuánto mide un salto y hasta dónde llega la recta.", pt: "Uma reta numérica com marcas e números. Sobre ela está uma coelha, e cada salto que ela dá é desenhado como um arco acima da reta, todos com a mesma largura. Abaixo da reta há três controles: onde a coelha começa, o tamanho de um salto e até onde vai a reta.", nl: "Een getallenlijn met streepjes en getallen. Daarop staat een konijn, en elke sprong die het maakt wordt als een boog boven de lijn getekend, allemaal even breed. Onder de lijn staan drie regelaars: waar het konijn begint, hoe groot één sprong is, en hoe ver de lijn loopt.", sv: "En tallinje med streck och tal. En kanin står på linjen, och varje hopp hon gör ritas som en båge ovanför linjen. Alla bågar är lika breda. Under linjen finns tre reglage: var kaninen börjar, hur långt ett hopp är, och hur långt linjen går.", da: "En tallinje med streger og tal. En kanin står på linjen, og hvert hop, hun tager, tegnes som en bue over linjen. Alle buer er lige brede. Under linjen er der tre indstillinger: hvor kaninen starter, hvor langt ét hop er, og hvor langt linjen går.", no: "En tallinje med streker og tall. En kanin står på linjen, og hvert hopp hun tar, tegnes som en bue over linjen. Alle buene er like brede. Under linjen er det tre innstillinger: hvor kaninen starter, hvor langt ett hopp er, og hvor langt linjen går.", fi: "Lukusuora, jossa on tasavälein viivoja ja lukuja. Kani seisoo suoralla, ja jokainen sen ottama loikka piirtyy kaarena suoran yläpuolelle. Kaikki kaaret ovat yhtä leveitä. Suoran alla on kolme säädintä: mistä kani aloittaa, kuinka pitkä yksi loikka on, ja kuinka pitkälle suora ulottuu." },
      hintSetHop: { en: "Set how long one hop is, then press Hop and watch where the rabbit lands.", de: "Ziehen Sie die Sprungweite auf — so weit geht jeder Sprung. Dann auf „Springen“ tippen und schauen, wo der Hase landet.", fr: "Réglez la longueur d’un bond, puis appuyez sur Bondir pour voir où le lapin arrive.", it: "Regola la lunghezza di un balzo, poi premi Balza e guarda dove arriva il coniglio.", es: "Fija cuánto mide un salto. Luego toca Saltar y mira dónde cae.", pt: "Defina o tamanho de um salto. Depois toque em Saltar e veja onde ela cai.", nl: "Bepaal hoe groot één sprong is. Druk daarna op Spring en kijk waar het konijn landt.", sv: "Dra i hoppet för att bestämma hur långt varje hopp är. Tryck sedan på Hoppa och se var hon landar.", da: "Træk i hoppet for at bestemme, hvor langt hvert hop er. Tryk så på Hop, og se hvor hun lander.", no: "Dra i hoppet for å bestemme hvor langt hvert hopp er. Trykk så på Hopp og se hvor hun lander.", fi: "Vedä loikkaa ja päätä, kuinka pitkä jokainen loikka on. Paina sitten Loikkaa ja katso, mihin kani laskeutuu." },
      hintGoing: { en: "Every hop is the same length, so you can say where the next one will land before it goes.", de: "Jeder Sprung ist gleich lang — man kann also vorher sagen, wo der nächste landet.", fr: "Tous les bonds ont la même longueur : on peut donc dire à l’avance où le prochain va se poser.", it: "Tutti i balzi hanno la stessa lunghezza: si può dire in anticipo dove arriverà il prossimo.", es: "Todos los saltos miden lo mismo, así que se puede decir de antemano dónde caerá el siguiente.", pt: "Todos os saltos têm o mesmo tamanho, então dá para dizer antes onde o próximo vai cair.", nl: "Elke sprong is even groot, dus je kunt van tevoren zeggen waar de volgende landt.", sv: "Varje hopp är precis lika långt — man kan alltså säga i förväg var nästa landar.", da: "Hvert hop er lige langt — så man kan sige på forhånd, hvor det næste lander.", no: "Hvert hopp er like langt — så man kan si på forhånd hvor det neste lander.", fi: "Jokainen loikka on yhtä pitkä, joten voi sanoa etukäteen, mihin seuraava osuu." },
      hintExact: { en: "The hops came out exactly even. Nothing is left over.", de: "Diese Sprungweite geht genau auf — es bleibt kein Rest übrig.", fr: "Les bonds tombent juste : il ne reste rien.", it: "I balzi tornano esatti: non avanza niente.", es: "Los saltos salen justos. No queda nada.", pt: "Os saltos deram certinho. Não sobrou nada.", nl: "De sprongen komen precies uit. Er blijft niets over.", sv: "Det gick jämnt ut — ingenting blev över.", da: "Det gik lige op — der blev ikke noget tilbage.", no: "Det gikk akkurat opp — ingenting ble til overs.", fi: "Loikat menivät tasan — mitään ei jäänyt yli." },
      hintWall: { en: "The next hop would go off the line, so the rabbit stops. Look at the space left in front of her.", de: "Der nächste Sprung würde über den Rand hinausgehen, darum bleibt der Hase stehen. Schauen Sie sich die Lücke an, die vor ihm übrig bleibt.", fr: "Le bond suivant sortirait de la ligne, alors le lapin s’arrête. Regardez l’espace qui reste devant lui.", it: "Il balzo successivo uscirebbe dalla linea, così il coniglio si ferma. Guardate lo spazio rimasto davanti a lui.", es: "El siguiente salto se saldría de la recta, así que se detiene. Mira el hueco que queda por delante.", pt: "O próximo salto passaria da reta, então ela para. Veja o espaço que sobrou à frente dela.", nl: "De volgende sprong zou voorbij de lijn gaan, dus het konijn stopt. Kijk naar het stukje dat ervoor overblijft.", sv: "Nästa hopp skulle hamna utanför linjen, så hon stannar. Titta på hur mycket som blev över framför henne.", da: "Det næste hop ville lande uden for linjen, så hun stopper. Se, hvor meget der blev tilbage foran hende.", no: "Det neste hoppet ville havnet utenfor linjen, så hun stopper. Se hvor mye som ble til overs foran henne.", fi: "Seuraava loikka menisi lukusuoran ulkopuolelle, joten kani pysähtyy. Katso, kuinka paljon jäi yli sen eteen." },
      hintNoRoom: { en: "This hop is too long for the line. Make it shorter, or start further back.", de: "Diese Sprungweite ist zu groß für den Strahl. Machen Sie sie kleiner oder stellen Sie den Hasen weiter zurück.", fr: "Ce bond est trop long pour la ligne. Raccourcissez-le, ou reculez le point de départ.", it: "Questo balzo è troppo lungo per la linea. Accorcialo, oppure fai partire il coniglio più indietro.", es: "Este salto es demasiado largo para la recta. Hazlo más corto o empieza más atrás.", pt: "Este salto é comprido demais para a reta. Deixe-o menor ou comece mais atrás.", nl: "Deze sprong is te groot voor de lijn. Maak hem kleiner of begin verder terug.", sv: "Det här hoppet är för långt för linjen. Gör det kortare, eller börja längre bak.", da: "Dette hop er for langt til linjen. Gør det kortere, eller start længere tilbage.", no: "Dette hoppet er for langt for linjen. Gjør det kortere, eller start lenger bak.", fi: "Tämä loikka on liian pitkä tälle suoralle. Tee siitä lyhyempi tai aloita kauempaa takaa." },
      hopBtn: { en: "Hop", de: "Springen", fr: "Bondir", it: "Balza", es: "Saltar", pt: "Saltar", nl: "Spring", sv: "Hoppa", da: "Hop", no: "Hopp", fi: "Loikkaa" },
      allBtn: { en: "All the way", de: "Ganz durch", fr: "Jusqu’au bout", it: "Fino in fondo", es: "Hasta el final", pt: "Até o fim", nl: "Tot het eind", sv: "Hela vägen", da: "Hele vejen", no: "Hele veien", fi: "Loppuun" },
      numsBtn: { en: "Numerals", de: "Zahlen", fr: "Nombres", it: "Numeri", es: "Números", pt: "Números", nl: "Getallen", sv: "Tal", da: "Tal", no: "Tall", fi: "Luvut" },
      nextBtn: { en: "Another line", de: "Neuer Strahl", fr: "Autre ligne", it: "Altra linea", es: "Otra recta", pt: "Outra reta", nl: "Nieuwe lijn", sv: "Ny linje", da: "Ny linje", no: "Ny linje", fi: "Uusi suora" },
      printBtn: { en: "Print", de: "Drucken", fr: "Imprimer", it: "Stampa", es: "Imprimir", pt: "Imprimir", nl: "Print", sv: "Skriv ut", da: "Print", no: "Skriv ut", fi: "Tulosta" },
      startAria: { en: "Where the rabbit starts. Drag it along its rail, or use the arrow keys. Moving it clears the hops already drawn.", de: "Wo der Hase steht. Ziehen Sie ihn an seiner Leiste entlang oder nehmen Sie die Pfeiltasten. Beim Verschieben werden die bisherigen Sprünge gelöscht.", fr: "Point de départ du lapin. Faites glisser le curseur le long de son rail, ou utilisez les flèches du clavier. Le déplacer efface les bonds déjà tracés.", it: "Punto di partenza del coniglio. Trascina il cursore lungo la sua guida, oppure usa i tasti freccia. Spostandolo, i balzi già fatti si cancellano.", es: "Dónde empieza la coneja. Arrastra el mando por su carril o usa las flechas del teclado. Al moverlo se borran los saltos ya dibujados.", pt: "Onde a coelha começa. Arraste o controle pelo trilho dele ou use as setas do teclado. Ao movê-lo, os saltos já desenhados são apagados.", nl: "Waar het konijn begint. Sleep de regelaar over zijn rail of gebruik de pijltjestoetsen. Verschuiven wist de sprongen die er al staan.", sv: "Var kaninen börjar. Dra reglaget längs sin list eller använd piltangenterna. När du flyttar det försvinner hoppen som redan är ritade.", da: "Hvor kaninen starter. Træk grebet langs sin skinne, eller brug piletasterne. Når du flytter det, forsvinder de hop, der allerede er tegnet.", no: "Hvor kaninen starter. Dra grepet langs sin skinne, eller bruk piltastene. Når du flytter det, forsvinner buene som allerede er tegnet.", fi: "Mistä kani aloittaa. Vedä säädintä sen kiskoa pitkin tai käytä nuolinäppäimiä. Siirtäminen pyyhkii jo piirretyt loikat." },
      hopAria: { en: "How long one hop is. Drag it away from the start to make the hop longer, or past the start to hop backwards, or use the arrow keys. Changing it clears the hops already drawn.", de: "Wie weit ein Sprung geht. Ziehen Sie vom Startpunkt weg, damit die Sprünge länger werden, oder auf die andere Seite, damit der Hase rückwärts springt. Die Pfeiltasten gehen auch. Beim Ändern werden die bisherigen Sprünge gelöscht.", fr: "Longueur d’un bond. Faites glisser le curseur d’un côté pour allonger le bond, de l’autre côté pour bondir en arrière, ou utilisez les flèches du clavier. Changer la longueur efface les bonds déjà tracés.", it: "Lunghezza di un balzo. Trascina il cursore da una parte per allungare il balzo, dall’altra per balzare all’indietro, oppure usa i tasti freccia. Cambiando la lunghezza, i balzi già fatti si cancellano.", es: "Cuánto mide un salto. Aléjalo del inicio para alargar el salto, pásalo al otro lado para saltar hacia atrás, o usa las flechas del teclado. Al cambiarlo se borran los saltos ya dibujados.", pt: "O tamanho de um salto. Afaste do início para aumentar o salto, passe para o outro lado para saltar para trás, ou use as setas do teclado. Ao mudá-lo, os saltos já desenhados são apagados.", nl: "Hoe groot één sprong is. Sleep verder van het beginpunt om de sprong groter te maken, naar de andere kant om terug te springen, of gebruik de pijltjestoetsen. Veranderen wist de sprongen die er al staan.", sv: "Hur långt ett hopp är. Dra bort från startpunkten för att göra hoppet längre, eller till andra sidan för att hoppa bakåt. Piltangenterna fungerar också. När du ändrar det försvinner hoppen som redan är ritade.", da: "Hvor langt ét hop er. Træk væk fra starten for at gøre hoppet længere, eller over på den anden side for at hoppe baglæns. Piletasterne virker også. Når du ændrer det, forsvinder de hop, der allerede er tegnet.", no: "Hvor langt ett hopp er. Dra bort fra starten for å gjøre hoppet lengre, eller over på den andre siden for å hoppe bakover. Piltastene virker også. Når du endrer det, forsvinner buene som allerede er tegnet.", fi: "Kuinka pitkä yksi loikka on. Vedä poispäin aloituskohdasta, niin loikasta tulee pidempi, tai toiselle puolelle, niin kani loikkii taaksepäin. Myös nuolinäppäimet toimivat. Muuttaminen pyyhkii jo piirretyt loikat." },
      rangeAria: { en: "How far the line goes", de: "Wie weit der Zahlenstrahl reicht", fr: "Jusqu’où va la ligne", it: "Fin dove arriva la linea", es: "Hasta dónde llega la recta", pt: "Até onde vai a reta", nl: "Hoe ver de lijn loopt", sv: "Hur långt linjen går", da: "Hvor langt linjen går", no: "Hvor langt linjen går", fi: "Kuinka pitkälle lukusuora ulottuu" },
      gateTitle: { en: "More lines", de: "Mehr Zahlenstrahlen", fr: "Encore des lignes", it: "Altre linee", es: "Más rectas", pt: "Mais retas", nl: "Meer lijnen", sv: "Fler linjer", da: "Flere linjer", no: "Flere linjer", fi: "Lisää suoria" },
      gateBody: { en: "Six more lines, ordered so each one surprises after the one before — a start somewhere other than zero, lines that run to 1000, and hops that go backwards. Plus the sheet to print for working on paper.", de: "Sechs weitere Zahlenstrahlen, so geordnet, dass jeder nach dem vorigen überrascht: ein Start abseits der Null, Strahlen bis 1000 und Sprünge rückwärts. Dazu die Druckvorlage für die Arbeit auf Papier.", fr: "Six autres lignes, classées pour que chacune surprenne après la précédente : un départ ailleurs qu’à zéro, des lignes qui vont jusqu’à 1000, et des bonds en arrière. Avec la fiche à imprimer pour continuer sur papier.", it: "Altre sei linee, ordinate perché ognuna sorprenda dopo la precedente: una partenza diversa da zero, linee che arrivano fino a 1000 e balzi all’indietro. C’è anche il foglio da stampare per lavorare su carta.", es: "Seis rectas más, ordenadas para que cada una sorprenda después de la anterior: un inicio distinto de cero, rectas que llegan hasta 1000 y saltos hacia atrás. Además, la hoja para imprimir y trabajar en papel.", pt: "Mais seis retas, na ordem em que cada uma surpreende depois da anterior: um início diferente de zero, retas que vão até 1000 e saltos para trás. Além da folha para imprimir e trabalhar no papel.", nl: "Zes lijnen erbij, zo geordend dat elke lijn verrast na de vorige: een start ergens anders dan nul, lijnen tot 1000 en sprongen achteruit. Plus het blad om af te drukken en op papier verder te werken.", sv: "Sex linjer till, ordnade så att varje ny linje överraskar efter den förra: en start någon annanstans än noll, linjer som går till 1000 och hopp bakåt. Dessutom arbetsbladet att skriva ut.", da: "Seks linjer mere, sat i en rækkefølge hvor hver ny linje overrasker efter den forrige: en start et andet sted end nul, linjer der går til 1000 og hop baglæns. Plus arket til at printe.", no: "Seks linjer til, satt opp slik at hver nye linje overrasker etter den forrige: en start et annet sted enn null, linjer som går til 1000 og hopp bakover. Pluss arket du kan skrive ut.", fi: "Kuusi suoraa lisää, järjestyksessä jossa jokainen yllättää edellisen jälkeen: aloitus muualta kuin nollasta, suoria tuhanteen asti ja loikkia taaksepäin. Lisäksi tulostettava tehtäväpaperi." },
      gateCta: { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", it: "Il piano Insegnante", es: "Ver el plan Docente", pt: "Ver o plano Professor", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Tutustu Opettaja-tilaukseen" }
    },

    STORE_KEY: 'lcs:number-line:v1',
    ENT_TRUST_DAYS: 14,

    /* v4 tools declare no shell settings — every control is an in-stage
       chip, so there is no gear drawer. (The old build shipped a 4-field
       drawer: range, marker shape, marker colour, show-number. Shape and
       colour are gone because the rabbit replaced the token; the other
       two became chips with a visible consequence.) */
    defaults: {},
    settings: [],

    premium: false,
    premiumKnown: false,

    /* ---- the stage, in model units ----------------------------------
       ⭐ THE ARENA'S ASPECT IS PINNED TO THE viewBox (5:2 == 1000:400),
       and that is load-bearing for a reason that is NOT #43's.
       `preserveAspectRatio="none"` guarantees exact POSITIONING at any
       box shape — but it does not guarantee exact SHAPE, and an arc is a
       shape. Measured on the old 1000x100 box, the horizontal and
       vertical scales diverged by 2.5x between a phone and a laptop, so
       a dome on the desktop rendered as a tall LOOP on a phone: same
       mathematics, different animal.
       Pinning the box to the viewBox's own ratio makes scaleX == scaleY
       at every viewport, so a hop is dome-shaped everywhere.
       ⚠ AND THE CAP IS ON THE WIDTH ONLY. Adding a max-height to an
       aspect-ratio box is exactly #43's defect — it yields a box that is
       no longer the declared ratio, and under `none` that silently
       returns the distortion this constant exists to remove.
       ---------------------------------------------------------------- */
    W: 1000,
    H: 400,
    INSET: 44,
    /* ⚠ the axis sits LOW in the box on purpose. The numerals hang below
       it and the two grip rails follow immediately underneath, so dead
       space between the line and the things that drive it is what makes
       them read as unrelated furniture — measured at 44px of gap on the
       first cut, where the start grip looked like a stray dot. */
    AXIS_Y: 330,
    ARC_MIN: 30,
    ARC_MAX: 250,

    DMIN: 0,                       /* ⚠ #43 cites this floor by name */
    RANGES: [10, 20, 100, 1000],
    NUM_STOPS: 3,

    /* =================================================================
       THE MODEL — four fields, and NOTHING derived is stored.
         max    the far end of the line
         start  where she began
         hop    one hop's length, SIGNED (negative hops go left)
         n      how many hops she has taken
       ⚠ The landings are NOT stored. They are recomputed from
       (start, hop, n) on every read, so there is no second source of
       truth that can desynchronise — and, more to the point, a stored
       landing array is a place where two hops of different length COULD
       be represented. Refuse 1 is enforced by the shape of the state.
       ================================================================= */
    newState: function () { return { max: 20, start: 0, hop: 5, n: 0 }; },

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
      var max = this._int(st.max, d.max);
      if (this.RANGES.indexOf(max) < 0) max = d.max;

      var start = this._int(st.start, d.start);
      if (start < this.DMIN) start = this.DMIN;
      if (start > max) start = max;

      var hop = this._int(st.hop, d.hop);
      if (hop === 0) hop = d.hop;                 /* a hop of nothing is not a hop */
      if (hop > max) hop = max;
      if (hop < -max) hop = -max;

      var n = this._int(st.n, 0);
      if (n < 0) n = 0;
      /* ⚠ n is clamped to what the WALL allows, not to an arbitrary cap.
         A state carrying more hops than the line can hold would put a
         landing off the line, which refuse 2 exists to prevent. */
      var room = this.maxHops({ max: max, start: start, hop: hop, n: 0 });
      if (n > room) n = room;

      return { max: max, start: start, hop: hop, n: n };
    },

    /* ---- derived, never stored -------------------------------------- */
    at: function (st) { var s = this._st(st); return s.start + s.n * s.hop; },

    landings: function (st) {
      var s = this._st(st), out = [], i;
      for (i = 0; i <= s.n; i++) out.push(s.start + i * s.hop);
      return out;
    },

    /* how many hops of this length fit on this line from this start.
       ⚠ Pure integer arithmetic on the RAW fields, because `_st` calls
       it — routing it back through `_st` would recurse forever. */
    maxHops: function (st) {
      var max = st.max, start = st.start, hop = st.hop;
      if (!hop) return 0;
      var room = hop > 0 ? (max - start) : (start - this.DMIN);
      var k = Math.floor(room / Math.abs(hop));
      return k < 0 ? 0 : k;
    },

    /* does this hop divide the room exactly? The subject of the routine's
       fourth step, and the reason the gap is drawn as absence. */
    fitsExactly: function (st) {
      var s = this._st(st);
      var room = s.hop > 0 ? (s.max - s.start) : (s.start - this.DMIN);
      return s.hop !== 0 && room % Math.abs(s.hop) === 0;
    },

    /* what is left over at the wall, in units. 0 when the hop fits. */
    gap: function (st) {
      var s = this._st(st);
      var room = s.hop > 0 ? (s.max - s.start) : (s.start - this.DMIN);
      return room - this.maxHops(s) * Math.abs(s.hop);
    },

    atWall: function (st) { var s = this._st(st); return s.n >= this.maxHops(s); },

    /* ⭐ THE HINT DISPATCH IS A PURE MODEL FUNCTION, not an expression
       buried in `_paint`. #44 was bought exactly here: the dispatch lived
       inline, so the Node gate had to REIMPLEMENT it — and three
       mutations of the real dispatch sailed straight through, because
       the gate was testing its own copy. Extracting it is what lets
       `verify-` drive the SHIPPED code exhaustively and prove all four
       hints are reachable (#39's dead-string rule, done by enumeration
       rather than by grep). */
    hintKey: function (st) {
      var s = this._st(st);
      /* ⚠ THE NO-ROOM BRANCH COMES FIRST, AND IT EXISTS BECAUSE TWO NATIVE
         PANELS INDEPENDENTLY FOUND THE STATE BY READING THE MODEL. The
         first cut tested `n === 0` before the wall, so on
         `max 10, start 8, hop 5` — maxHops 0, atWall true at n 0 — the
         tool said "press Hop and watch where the rabbit lands" beside a
         Hop chip it had itself disabled. A hint instructing a move the
         reducer refuses is the recorded #41 defect. */
      if (this.maxHops(s) === 0) return 'hintNoRoom';
      if (s.n === 0) return 'hintSetHop';
      if (!this.atWall(s)) return 'hintGoing';
      return this.fitsExactly(s) ? 'hintExact' : 'hintWall';
    },

    /* ---- reducers: PURE, immutable, `null` for refusal ---------------
       ⚠ Never a clamp where a refusal belongs. A no-op returns null so
       the caller does not repaint, and so a mutation that turns a
       refusal into a silent clamp is visible to the gate.
       ---------------------------------------------------------------- */

    /* ⭐ REFUSE 2. The one reducer the whole thesis rests on. */
    hop: function (st) {
      var s = this._st(st);
      if (this.atWall(s)) return null;
      return { max: s.max, start: s.start, hop: s.hop, n: s.n + 1 };
    },

    allTheWay: function (st) {
      var s = this._st(st);
      var k = this.maxHops(s);
      if (s.n >= k) return null;
      return { max: s.max, start: s.start, hop: s.hop, n: k };
    },

    /* ⭐ REFUSE 1. Setting the hop CLEARS THE TRAIL, which is what makes
       a mixed-length sequence unrepresentable rather than merely
       discouraged. Same for the start: a trail that began somewhere else
       is not this trail. */
    setHop: function (st, h) {
      var s = this._st(st);
      if (typeof h !== 'number' || !isFinite(h)) return null;
      h = Math.round(h);
      if (h === 0) return null;
      if (h > s.max || h < -s.max) return null;
      if (h === s.hop && s.n === 0) return null;
      return { max: s.max, start: s.start, hop: h, n: 0 };
    },

    setStart: function (st, v) {
      var s = this._st(st);
      if (typeof v !== 'number' || !isFinite(v)) return null;
      v = Math.round(v);
      if (v < this.DMIN || v > s.max) return null;
      if (v === s.start && s.n === 0) return null;
      return { max: s.max, start: v, hop: s.hop, n: 0 };
    },

    /* ⭐ THE RANGE CHIP'S CONSEQUENCE IS THE AXIS, NOT ITS OWN HIGHLIGHT.
       The start is PRESERVED wherever it still fits, so the same number
       lands in a new place on a relabelled line — which is the one thing
       a scaled line can do that an empty one structurally cannot. A chip
       whose only effect is its own highlight is the #39 furniture defect
       wearing a number, and `audit-tool-control-liveness` scores it
       green, so this is asserted in `verify-` and not left to care. */
    setMax: function (st, m) {
      var s = this._st(st);
      if (this.RANGES.indexOf(m) < 0) return null;
      if (m === s.max) return null;
      var start = s.start > m ? m : s.start;
      var hop = s.hop;
      if (hop > m) hop = m;
      if (hop < -m) hop = -m;
      return { max: m, start: start, hop: hop, n: 0 };
    },

    /* ---- the geometry ------------------------------------------------
       ⭐ ONE AFFINE MAP, and every tick, numeral, arc endpoint and
       rabbit position goes through it. There is no second path, which is
       what makes "the arc ends on the tick" true by construction.
       ---------------------------------------------------------------- */
    xOf: function (st, v) {
      var s = this._st(st);
      var span = s.max || 1;
      return this.INSET + (v / span) * (this.W - 2 * this.INSET);
    },

    valueAtX: function (st, x) {
      var s = this._st(st);
      var span = s.max || 1;
      return ((x - this.INSET) / (this.W - 2 * this.INSET)) * span;
    },

    /* ---- THE ARC -----------------------------------------------------
       A half-ellipse ABOVE the axis. `rx` is half the horizontal travel;
       `ry` is capped so a full-width hop does not dome off the top of
       the stage, and floored so a tiny hop is still visibly an arc
       rather than a flat smear. Sweep is 1 going right and 0 going left,
       which is what keeps a backward hop ABOVE the line instead of
       flipping under it.
       ⚠ Congruence is affine-invariant, so the `preserveAspectRatio`
       squash never touches the mathematics: equal |dx| gives equal rx
       gives equal ry, and the domes stay congruent at every viewport.
       Adapted from `ten-stones-activity.js:154` (arcs over a TICKED
       line) and `open-number-line.js:177` (the cap/floor rule).
       ⚠ `open-number-line.js:178` claims "no arc renderer existed
       anywhere in this repo". Three do. A doc is not a fact.
       ---------------------------------------------------------------- */
    arcRy: function (st, from, to) {
      var rx = Math.abs(this.xOf(st, to) - this.xOf(st, from)) / 2;
      return Math.max(this.ARC_MIN, Math.min(this.ARC_MAX, rx));
    },

    arcPath: function (st, from, to) {
      var x1 = this.xOf(st, from), x2 = this.xOf(st, to);
      var rx = Math.abs(x2 - x1) / 2;
      var ry = this.arcRy(st, from, to);
      var sweep = (to >= from) ? 1 : 0;
      if (rx < 0.5) {
        return 'M' + x1.toFixed(2) + ' ' + this.AXIS_Y +
               ' L' + x1.toFixed(2) + ' ' + (this.AXIS_Y - this.ARC_MIN).toFixed(2);
      }
      return 'M' + x1.toFixed(2) + ' ' + this.AXIS_Y +
             ' A' + rx.toFixed(2) + ' ' + ry.toFixed(2) + ' 0 0 ' + sweep + ' ' +
             x2.toFixed(2) + ' ' + this.AXIS_Y;
    },

    arcApex: function (st, from, to) {
      return {
        x: (this.xOf(st, from) + this.xOf(st, to)) / 2,
        y: this.AXIS_Y - this.arcRy(st, from, to)
      };
    },

    /* ---- the ruling --------------------------------------------------
       Tick and numeral density, DERIVED from the 14px legibility floor
       at the narrowest bench rather than chosen.
       MEASURED: at a 320px viewport the stage is ~296px wide, so a
       numeral every 96 model units sits 28px apart. A four-digit numeral
       at 15px is ~34px wide — which is why range 1000 labels every 200
       and not every 100, and why range 20 labels every 2 and not every
       1. ⚠ verify- PRINTS this derivation; local-test- MEASURES the real
       bench and asserts no two numerals overlap. The two gates talk to
       each other, so the number is measured and never preferred.
       ---------------------------------------------------------------- */
    tickStep: function (max) { return max >= 1000 ? 50 : max >= 100 ? 5 : 1; },

    /* ⚠ A MAJOR TICK IS DEFINED AS A NUMBERED ONE, and it is DERIVED
       rather than typed a second time. The first cut set them
       independently, so on a 0..20 line a tall tick stood at 5 with no
       numeral under it while short ticks at 2 and 4 carried numerals —
       the line contradicted its own ruling. Two numbers that agree are a
       coincidence waiting to end (#43); this one never agreed at all.
       ⚠ The tick ruling is keyed to STOP 0 and never changes when the
       numeral ladder does: hiding numerals must not move the marks the
       child is counting (V7). */
    majorStep: function (max) { return this.labelStep(max, 0); },

    /* stop 0 = the natural labelling; 1 = sparse; 2 = the ends only.
       ⚠ THE TICKS AND BOTH ENDS ARE PRESENT AT EVERY STOP. A line with
       no ticks is `#26`'s object (refuse 5), and a child who cannot find
       either end cannot reason about distance at all. */
    labelStep: function (max, stop) {
      if (stop >= 2) return null;                 /* ends only */
      if (stop === 1) return max >= 1000 ? 500 : max >= 100 ? 50 : max >= 20 ? 10 : 5;
      return max >= 1000 ? 200 : max >= 100 ? 10 : max >= 20 ? 2 : 1;
    },

    labelsFor: function (st, stop) {
      var s = this._st(st), out = [], v;
      var step = this.labelStep(s.max, stop);
      if (step) {
        for (v = 0; v <= s.max; v += step) out.push(v);
      }
      if (out.indexOf(0) < 0) out.unshift(0);
      if (out.indexOf(s.max) < 0) out.push(s.max);
      return out;
    },

    /* =================================================================
       RENDER
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
      var wrap = api.el('div', 'nl-wrap');
      this._wrap = wrap;

      /* ---- THE BAR: range chips, wordless. Numerals up, words down. -- */
      var bar = api.el('div', 'nl-bar');
      bar.setAttribute('role', 'group');
      bar.setAttribute('aria-label', api.t('rangeAria'));
      this._rangeBtns = [];
      this.RANGES.forEach(function (m) {
        var b = api.el('button', 'nl-range');
        b.type = 'button';
        b.textContent = String(m);
        b.addEventListener('click', function (ev) {
          ev.preventDefault();
          var n = self.setMax(self.st, m);
          if (n) { self.st = n; self._stopFlight(); self._paint(); }
        });
        bar.appendChild(b);
        self._rangeBtns.push({ el: b, max: m });
      });
      wrap.appendChild(bar);

      /* ---- THE STAGE ------------------------------------------------- */
      var stage = api.el('div', 'nl-stage');
      this._stage = stage;
      stage.setAttribute('role', 'img');

      var svg = this._svgEl('svg', {
        viewBox: '0 0 ' + this.W + ' ' + this.H,
        'class': 'nl-svg',
        preserveAspectRatio: 'none'          /* ⭐ deliberate — see header */
      });
      this._svg = svg;

      this._gTicks = this._svgEl('g', { 'class': 'nl-ticks' });
      this._gArcs = this._svgEl('g', { 'class': 'nl-arcs' });

      var axis = this._svgEl('line', {
        x1: this.INSET - 22, x2: this.W - this.INSET + 22,
        y1: this.AXIS_Y, y2: this.AXIS_Y, 'class': 'nl-axis'
      });
      /* the open end: an arrow tip, so the line reads as going on */
      var tipX = this.W - this.INSET + 22;
      var tip = this._svgEl('path', {
        d: 'M' + (tipX - 14) + ' ' + (this.AXIS_Y - 10) + ' L' + tipX + ' ' + this.AXIS_Y +
           ' L' + (tipX - 14) + ' ' + (this.AXIS_Y + 10),
        'class': 'nl-tip'
      });

      svg.appendChild(axis);
      svg.appendChild(tip);
      svg.appendChild(this._gTicks);
      svg.appendChild(this._gArcs);

      /* ⭐ THE HERE-TICK IS LOAD-BEARING, NOT DECORATION. A rabbit drawn
         44px wide straddles six ticks at hop 1 on a hundred-line and
         cannot say WHICH. The rabbit says who, the tick says where — and
         that division survives the CA5 sprite swap, because a sprite
         cannot carry a pointer notch. */
      this._here = this._svgEl('line', { 'class': 'nl-here' });
      svg.appendChild(this._here);

      stage.appendChild(svg);

      /* the HTML overlay: every numeral, and the rabbit */
      this._nums = api.el('div', 'nl-nums');
      stage.appendChild(this._nums);

      this._arcLab = api.el('div', 'nl-arclab');
      this._arcLab.setAttribute('aria-hidden', 'true');
      stage.appendChild(this._arcLab);

      this._bunny = api.el('div', 'nl-bunny');
      this._bunny.setAttribute('aria-hidden', 'true');
      this._bunny.innerHTML = this._bunnySVG();
      this._setPose('idle');
      stage.appendChild(this._bunny);

      /* ⚠ the stage and the two rails are ONE bench with zero gap between
         them. The wrap's gap applies between bar / bench / hint / foot,
         never inside the instrument — see the rail CSS. */
      var bench = api.el('div', 'nl-bench');
      this._bench = bench;
      bench.appendChild(stage);
      wrap.appendChild(bench);

      /* ---- THE TWO RAILS ---------------------------------------------
         ⚠ The grips live BELOW the stage on rails of their own, never
         overlaid on it. Two reasons, both structural: a 44px floor stays
         a floor in pixels (a radius in model units cannot hold one —
         #41 rendered 44 model units as 29px), and two grips on separate
         rails CANNOT COLLIDE however small the hop. Overlaying both on
         one rail would put them 1px apart at range 1000, hop 1.
         ---------------------------------------------------------------- */
      this._railStart = api.el('div', 'nl-rail nl-rail-start');
      this._gStart = this._grip(this._railStart, 'nl-g-start', 'startAria');
      bench.appendChild(this._railStart);

      this._railHop = api.el('div', 'nl-rail nl-rail-hop');
      this._caliper = api.el('div', 'nl-caliper');
      this._caliper.setAttribute('aria-hidden', 'true');
      /* ⭐ THE HOP'S LENGTH IS WRITTEN ON THE CALIPER, and this is not a
         duplicate of the arc label. Before the first hop there IS no arc
         and therefore no label, so without this numeral a teacher can
         drag the hop grip and be told nothing about what they just set —
         which was true of the first cut. The caliper carries the UNIT
         you chose; the arc carries the hop you took. The thesis is that
         those are two different numbers, so they are shown in two
         places. */
      this._calNum = api.el('div', 'nl-caliper-num');
      this._caliper.appendChild(this._calNum);
      this._railHop.appendChild(this._caliper);
      this._gHop = this._grip(this._railHop, 'nl-g-hop', 'hopAria');
      bench.appendChild(this._railHop);

      this._hint = api.el('div', 'nl-hint');
      wrap.appendChild(this._hint);

      /* ---- THE FOOT --------------------------------------------------- */
      var foot = api.el('div', 'nl-foot');
      this._chipHop = this._chip(foot, 'nl-primary', function () {
        var n = self.hop(self.st);
        if (!n) return;                       /* refuse 2, visibly disabled */
        var from = self.at(self.st);
        self.st = n;
        self._flyTo(from, self.at(self.st));
        self._paint();
      });
      /* ⚠ ALL THE WAY FLIES HOP BY HOP, NOT ONE GIANT ARC. The first cut
         set n to the wall and animated a single flight from where she
         was to where she ended — a dome spanning the whole remaining
         line, which matches NONE of the arcs it had just drawn. The
         rabbit flew over her own trail. A native panel caught it by
         reading `_flyTo`'s two arguments against `allTheWay`'s reducer. */
      this._chipAll = this._chip(foot, '', function () {
        if (self.atWall(self.st)) return;
        self._flySequence();
      });
      this._chipNums = this._chip(foot, '', function () {
        self._numStop = ((self._numStop || 0) + 1) % self.NUM_STOPS;
        self._paint();
      });
      this._chipNext = this._chip(foot, '', function () { self._next(); });
      this._chipPrint = this._chip(foot, 'nl-lock', function () {
        if (!self.premium) { self._showGate(); return; }
        self._buildSheet();
        try { window.print(); } catch (_) { }
      });
      wrap.appendChild(foot);

      this._sheetEl = api.el('div', 'nl-sheet');
      wrap.appendChild(this._sheetEl);

      this._wireDrags();
      api.stage.appendChild(wrap);
    },

    _chip: function (foot, cls, fn) {
      var b = this.api.el('button', 'nl-chip' + (cls ? ' ' + cls : ''));
      b.type = 'button';
      b.addEventListener('click', function (ev) { ev.preventDefault(); fn(); });
      foot.appendChild(b);
      return b;
    },

    _grip: function (rail, cls, ariaKey) {
      var b = this.api.el('button', 'nl-grip ' + cls);
      b.type = 'button';
      b.setAttribute('aria-label', this.api.t(ariaKey));
      b.appendChild(this.api.el('span', 'nl-knob'));
      rail.appendChild(b);
      return b;
    },

    /* ---- pointer maths ----------------------------------------------
       The grips are on rails, but the VALUE they carry is the stage's,
       so the x measured is always the STAGE's rect. One source.
       ⚠ `LCS.drag.linear` takes `valueFromPointer(clientX, rect)` and
       would fit a horizontal line exactly — but it wires no keyboard
       twin and no click, and a drag-only handle is dead to a keyboard,
       to assistive tech and to the liveness gate (#41's flag scored 0
       of 9 paths in all three entitlement states). So the drag is
       hand-rolled to the shipped `cold-line.js:569` shape, which carries
       pointer, click, Enter/Space and arrows in one place.
       ---------------------------------------------------------------- */
    _valueAtClientX: function (clientX) {
      if (!this._stage) return null;
      var r = this._stage.getBoundingClientRect();
      if (!r.width) return null;
      var x = ((clientX - r.left) / r.width) * this.W;
      return this.valueAtX(this.st, x);
    },

    _wireDrags: function () {
      var self = this;
      var drag = function (el, onMove, onTap) {
        var active = false, moved = false;
        el.addEventListener('pointerdown', function (ev) {
          if (ev.button !== undefined && ev.button !== 0) return;
          active = true; moved = false;
          ev.preventDefault();
        });
        /* ⚠ bound to WINDOW, not the element: a repaint that removes the
           captured node releases pointer capture (#40 paid for that). */
        window.addEventListener('pointermove', function (ev) {
          if (!active) return;
          var v = self._valueAtClientX(ev.clientX);
          if (v === null) return;
          moved = true;
          onMove(v, null);
          ev.preventDefault();
        });
        window.addEventListener('pointerup', function () { active = false; });
        window.addEventListener('pointercancel', function () { active = false; moved = false; });
        /* ⚠⚠ A DRAG THAT ENDS ON THE HANDLE ALSO FIRES THE HANDLE'S
           CLICK, AND THE CLICK HANDLER STEPS BY ONE. The grip FOLLOWS the
           pointer, so the pointer is back over it at pointerup — every
           drag therefore landed one unit past where the teacher dropped
           it, and dragging the hop from 5 to 4 came straight back to 5,
           which read as "the grip does not work".
           MEASURED, not inferred: `_valueAtClientX` returned exactly 5.0
           at the drop and the committed state was 6. The tap path is
           still needed (a bare click is how a keyboard-less tap steps the
           value, and the liveness gate presses it), so the fix is to
           swallow only the click that terminates a real drag. */
        el.addEventListener('click', function (ev) {
          ev.preventDefault();
          if (moved) { moved = false; return; }
          if (onTap) onTap();
        });
        el.addEventListener('keydown', function (ev) {
          var k = ev.key;
          if (k === 'Enter' || k === ' ') { ev.preventDefault(); if (onTap) onTap(); return; }
          if (k === 'ArrowRight' || k === 'ArrowUp') { ev.preventDefault(); onMove(null, 1); }
          else if (k === 'ArrowLeft' || k === 'ArrowDown') { ev.preventDefault(); onMove(null, -1); }
          else if (k === 'Home') { ev.preventDefault(); onMove(null, 'min'); }
          else if (k === 'End') { ev.preventDefault(); onMove(null, 'max'); }
        });
      };

      drag(this._gStart, function (v, step) {
        var s = self._st(self.st), want;
        if (step === 'min') want = self.DMIN;
        else if (step === 'max') want = s.max;
        else if (step !== null && step !== undefined) want = s.start + step;
        else want = v;
        var n = self.setStart(self.st, want);
        if (n) { self.st = n; self._stopFlight(); self._paint(); }
      }, function () {
        var s = self._st(self.st);
        var n = self.setStart(self.st, s.start >= s.max ? self.DMIN : s.start + 1);
        if (n) { self.st = n; self._stopFlight(); self._paint(); }
      });

      /* the hop grip carries a LENGTH, so what it reads off the pointer
         is a value and what it stores is that value MINUS the start.
         Dragging to the other side of the start is how a backward hop is
         made — there is no direction control, because direction is a
         property of the hop you set. */
      drag(this._gHop, function (v, step) {
        var s = self._st(self.st), want;
        if (step === 'min') want = -s.max;
        else if (step === 'max') want = s.max;
        else if (step !== null && step !== undefined) want = s.hop + step;
        else want = Math.round(v) - s.start;
        if (want === 0) want = step === -1 ? -1 : 1;   /* never rest on nothing */
        var n = self.setHop(self.st, want);
        if (n) { self.st = n; self._stopFlight(); self._lastAnnounce = 'hop'; self._paint(); }
      }, function () {
        var s = self._st(self.st);
        var h = s.hop >= s.max ? 1 : s.hop + 1;
        if (h === 0) h = 1;
        var n = self.setHop(self.st, h);
        if (n) { self.st = n; self._stopFlight(); self._lastAnnounce = 'hop'; self._paint(); }
      });
    },

    /* =================================================================
       PAINT
       ================================================================= */
    _paint: function () {
      var api = this.api, s = this._st(this.st), self = this;
      var stop = this._numStop || 0;

      /* ---- ticks ---------------------------------------------------- */
      while (this._gTicks.firstChild) this._gTicks.removeChild(this._gTicks.firstChild);
      var step = this.tickStep(s.max), major = this.majorStep(s.max), v, x;
      for (v = 0; v <= s.max; v += step) {
        x = this.xOf(s, v);
        var isMaj = (v % major === 0) || v === 0 || v === s.max;
        this._gTicks.appendChild(this._svgEl('line', {
          x1: x, x2: x,
          y1: this.AXIS_Y - (isMaj ? 16 : 9),
          y2: this.AXIS_Y + (isMaj ? 16 : 9),
          'class': 'nl-tick' + (isMaj ? ' nl-tick-major' : '')
        }));
      }

      /* ---- arcs ------------------------------------------------------
         Oldest first. The newest is full strength and the rest recede,
         but nothing is ever faded OUT — the trail is the mathematics,
         and a hop that stops being visible stops being evidence. */
      while (this._gArcs.firstChild) this._gArcs.removeChild(this._gArcs.firstChild);
      var ls = this.landings(s), i;
      for (i = 0; i < s.n; i++) {
        this._gArcs.appendChild(this._svgEl('path', {
          d: this.arcPath(s, ls[i], ls[i + 1]),
          'class': 'nl-arc' + (i === s.n - 1 ? ' nl-arc-new' : ''),
          'data-hop': String(i)
        }));
      }

      /* ---- the here-tick --------------------------------------------- */
      var hx = this.xOf(s, this.at(s));
      this._here.setAttribute('x1', hx); this._here.setAttribute('x2', hx);
      this._here.setAttribute('y1', this.AXIS_Y - 22);
      this._here.setAttribute('y2', this.AXIS_Y + 22);

      /* ---- numerals, in the HTML overlay ------------------------------
         In HTML and not in the SVG because `preserveAspectRatio="none"`
         would condense them to 40% width — which is precisely the live
         defect this build fixes. */
      this._nums.innerHTML = '';
      var labels = this.labelsFor(s, stop);
      labels.forEach(function (val) {
        var d = api.el('div', 'nl-num');
        d.textContent = String(val);
        d.style.left = (self.xOf(s, val) / self.W * 100) + '%';
        self._nums.appendChild(d);
      });

      /* ---- the arc label ----------------------------------------------
         ⭐ THE NEWEST ARC ONLY. Every hop is the same length, so nine
         repeated "+5"s are redundant ink; and one label makes the 14px
         floor trivially true instead of a suppression heuristic that has
         to be gated. */
      if (s.n > 0) {
        var ap = this.arcApex(s, ls[s.n - 1], ls[s.n]);
        this._arcLab.textContent = (s.hop >= 0 ? '+' : '−') + Math.abs(s.hop);
        this._arcLab.style.left = (ap.x / this.W * 100) + '%';
        this._arcLab.style.top = ((ap.y - 26) / this.H * 100) + '%';
        this._arcLab.style.display = '';
      } else {
        this._arcLab.style.display = 'none';
      }

      /* ---- the rabbit -------------------------------------------------- */
      if (!this._flying) this._placeBunny(hx, this.AXIS_Y, s.hop < 0);

      /* ---- the rails --------------------------------------------------- */
      var pct = function (val) { return (self.xOf(s, val) / self.W * 100) + '%'; };
      this._gStart.style.left = pct(s.start);
      var hopEnd = s.start + s.hop;
      if (hopEnd < this.DMIN) hopEnd = this.DMIN;
      if (hopEnd > s.max) hopEnd = s.max;
      this._gHop.style.left = pct(hopEnd);
      var a = Math.min(s.start, hopEnd), b = Math.max(s.start, hopEnd);
      this._caliper.style.left = pct(a);
      this._caliper.style.width = ((this.xOf(s, b) - this.xOf(s, a)) / this.W * 100) + '%';
      this._calNum.textContent = String(Math.abs(s.hop));

      /* ---- chrome ------------------------------------------------------ */
      this._rangeBtns.forEach(function (r) {
        var on = (r.max === s.max);
        r.el.classList.toggle('nl-on', on);
        r.el.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      var wall = this.atWall(s);
      this._chipHop.textContent = api.t('hopBtn');
      this._chipHop.disabled = wall;
      this._chipAll.textContent = api.t('allBtn');
      this._chipAll.disabled = wall;
      this._chipNums.textContent = api.t('numsBtn');
      this._chipNext.textContent = api.t('nextBtn');
      this._chipPrint.textContent = api.t('printBtn');

      /* ⚠ EVERY AUTHORED STRING MUST BE REACHABLE, and by RUNTIME
         REACHABILITY rather than a source scan — a `t()` call sitting in
         a dead branch passes a grep and ships a string nobody ever sees
         (#39, then again at #43). The dispatch is `hintKey`, a pure model
         function, so the gate drives THIS code rather than a copy. */
      this._hint.textContent = api.t(this.hintKey(s));

      this._stage.setAttribute('aria-label', api.t('sceneLabel'));
      /* ⚠⚠ ANNOUNCE WHAT ACTUALLY CHANGED, and this is a real
         accessibility defect the Nordic panel found by reading the code
         rather than the copy. The first cut announced `at(s)` on every
         paint — but `setHop` resets n to 0, so THE POSITION DOES NOT
         CHANGE WHEN YOU DRAG THE HOP GRIP. A screen-reader user editing
         the hop heard the same start number repeat while the one value
         they were setting — the tool's first affordance and its whole
         thesis — went only to `_calNum`, which is visual. The grips sit
         outside the stage, so `sceneLabel` cannot cover it either.
         Now the live region reports the hop when the hop moved and the
         position when the rabbit moved. A bare integer is also gone: it
         announced "3. 4. 5. 6." with no frame. */
      var say = (this._lastAnnounce === 'hop')
        ? (api.t('hopAria').split('.')[0] + ': ' + Math.abs(s.hop))
        : (this.at(s) + ' / ' + s.max);
      api.announce(say);
      this._lastAnnounce = null;
    },

    /* =================================================================
       THE RABBIT — Character #77
       Inline SVG placeholder behind the documented `_setPose` seam, so a
       CA5 sprite sheet drops in with no other change. The seam is
       `echo-grove-activity.js:307`'s, verbatim in shape.
       ⚠ Drawn HOPPING IN PLACE and facing right, on ONE baseline across
       every pose — the tool owns x and y, so travel baked into the art
       would move her twice.
       ⚠ The face groups carry the MOUTH as well as the eye. A happy eye
       over an unchanged flat mouth reads as a squint, so eyes alone is
       enough in count and wrong in scope.
       ================================================================= */
    _bunnySVG: function () {
      var B = '#A8CFC8', O = '#146B5E', C = '#F2784B', I = '#2A2A35', W = '#FFFDF7';
      /* ⚠ THE viewBox BOTTOM IS THE BASELINE. Her feet must be the last
         thing in the box, because the placer pins the box's BOTTOM to
         the axis — any slack below the feet is her floating above the
         line, which is exactly what the first cut shipped. Feet (the
         stand pose's lowest stroke edge) sit at y=84.5, so the box is
         86 and every other pose is drawn to that same baseline. */
      var s = '<svg class="nl-bunny-svg" viewBox="0 0 104 86" aria-hidden="true" focusable="false">';

      /* tail, behind everything */
      s += '<circle cx="17" cy="55" r="9" fill="' + W + '" stroke="' + O + '" stroke-width="3"/>';

      /* ears — two mutually exclusive groups */
      s += '<g class="nl-ears nl-ears-up">'
         + '<ellipse cx="66" cy="19" rx="6.5" ry="17" transform="rotate(-9 66 19)" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>'
         + '<ellipse cx="66" cy="21" rx="2.6" ry="10" transform="rotate(-9 66 21)" fill="' + C + '"/>'
         + '<ellipse cx="80" cy="23" rx="6" ry="15" transform="rotate(11 80 23)" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>'
         + '</g>';
      s += '<g class="nl-ears nl-ears-back">'
         + '<ellipse cx="56" cy="27" rx="6.5" ry="17" transform="rotate(-62 56 27)" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>'
         + '<ellipse cx="57" cy="28" rx="2.6" ry="10" transform="rotate(-62 57 28)" fill="' + C + '"/>'
         + '<ellipse cx="59" cy="15" rx="6" ry="15" transform="rotate(-44 59 15)" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>'
         + '</g>';

      /* body */
      s += '<ellipse cx="45" cy="56" rx="27" ry="20" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>';

      /* hind leg — three mutually exclusive groups */
      s += '<g class="nl-legs nl-legs-stand">'
         + '<ellipse cx="38" cy="73" rx="16" ry="10" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>'
         + '<ellipse cx="72" cy="75" rx="7" ry="8" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>'
         + '</g>';
      s += '<g class="nl-legs nl-legs-crouch">'
         + '<ellipse cx="36" cy="76" rx="19" ry="8" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>'
         + '<ellipse cx="71" cy="78" rx="8" ry="6" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>'
         + '</g>';
      s += '<g class="nl-legs nl-legs-air">'
         + '<ellipse cx="26" cy="70" rx="18" ry="8" transform="rotate(18 26 70)" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>'
         + '<ellipse cx="76" cy="66" rx="9" ry="6" transform="rotate(-16 76 66)" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>'
         + '</g>';

      /* head */
      s += '<circle cx="74" cy="44" r="16" fill="' + B + '" stroke="' + O + '" stroke-width="3"/>';

      /* face — two mutually exclusive groups, each carrying the mouth */
      s += '<g class="nl-face nl-face-calm">'
         + '<circle cx="80" cy="41" r="3.2" fill="' + I + '"/>'
         + '<path d="M84 51 q4 3 7 1" stroke="' + I + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
         + '</g>';
      s += '<g class="nl-face nl-face-happy">'
         + '<path d="M76.5 41 q3.5 -4 7 0" stroke="' + I + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
         + '<path d="M83 49 q4 5 8 1" stroke="' + I + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
         + '</g>';

      /* nose, always */
      s += '<circle cx="89" cy="46" r="3" fill="' + C + '"/>';
      s += '</svg>';
      return s;
    },

    /* THE CHARACTER SEAM — today the SVG placeholder via [data-pose];
       the CA5 sprite swaps in here with no other change. */
    _setPose: function (name) {
      if (this._bunny) this._bunny.setAttribute('data-pose', name);
      /* future: LCSSprite.play(this._bunny, name, { loop: name === 'idle' }); */
    },

    _placeBunny: function (x, y, facingLeft) {
      if (!this._bunny) return;
      this._bunny.style.left = (x / this.W * 100) + '%';
      this._bunny.style.top = (y / this.H * 100) + '%';
      /* ⚠ the mirror lives on its OWN nested element. Three owners want a
         transform on this node each frame (placement, mirror, squash);
         flattening them is where the feet lift off the line. */
      this._bunny.classList.toggle('nl-flip', !!facingLeft);
    },

    /* ---- the hop, animated -------------------------------------------
       ⭐ SAMPLED FROM THE REAL ARC, BUT RESAMPLED BY X. `getPointAtLength`
       alone walks at constant SPEED along the curve, which is slow at the
       ends and fast over the apex — the exact opposite of a hop, which
       leaves fast and floats at the top. Solving for the point whose x
       matches a linear sweep gives the right velocity profile and keeps
       the animal exactly on the ink, because both come from the same
       path element.
       ⚠ 420ms FLAT regardless of distance. Anticipation lives in the
       crouch and follow-through in the landing squash, not in an easing
       curve — a +1 hop and a +100 hop are the same ACT.
       ⚠ Interrupts COMMIT, never queue: the reported state is always
       current and only the animation may fall behind.
       ⚠ prefers-reduced-motion is the interrupt path with the interrupt
       at t=0 — one code path, and the reduced-motion user sees the
       rabbit standing on the landing with the arc already drawn.
       ---------------------------------------------------------------- */
    FLIGHT_MS: 420,

    _reduced: function () {
      try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
      catch (_) { return false; }
    },

    _stopFlight: function () {
      if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
      this._onLanded = null;                  /* a chain in flight ends here */
      this._flying = false;
      this._setPose('idle');
    },

    _flyTo: function (from, to, done) {
      var self = this, s = this._st(this.st);
      this._stopFlight();                     /* ⚠ this clears _onLanded */
      this._onLanded = done || null;          /* ...so the continuation is set AFTER */
      try { this.api.sound(from <= to ? 760 : 380); } catch (_) { }

      var land = function () {
        self._flying = false;
        self._placeBunny(self.xOf(s, to), self.AXIS_Y, s.hop < 0);
        /* ⚠ SHE IS ONLY PLEASED WHEN THE HOPS CAME OUT EVEN, and that is
           not decoration. The first cut posed her `happy` at the wall
           unconditionally — so at the wall WITH A GAP, which is the exact
           moment the lesson is about the leftover, a six-year-old read a
           delighted rabbit as "well done". That is a verdict delivered by
           pose, in a tool whose refuse 4 forbids verdicts; the same family
           as the recorded verdict-delivered-by-palette defect. The
           Italian panel put it plainly: if a space is left over, the
           rabbit should not be pleased — she has simply stopped. */
        var pleased = self.atWall(s) && self.fitsExactly(s);
        self._setPose(pleased ? 'happy' : 'land');
        self._after(pleased ? 900 : 160, function () { if (!self._flying) self._setPose('idle'); });
        if (self._onLanded) { var f = self._onLanded; self._onLanded = null; f(); }
      };

      if (this._reduced()) { land(); return; }

      /* a throwaway path element in the live SVG: the animal and the ink
         are sampled from the SAME geometry, so they cannot disagree. */
      var p = this._svgEl('path', { d: this.arcPath(s, from, to), 'class': 'nl-ghost' });
      this._svg.appendChild(p);
      var len = 0;
      try { len = p.getTotalLength(); } catch (_) { len = 0; }
      if (!len) { if (p.parentNode) p.parentNode.removeChild(p); land(); return; }

      var x1 = this.xOf(s, from), x2 = this.xOf(s, to);
      /* solve for the sample whose x matches a linear sweep — a coarse
         bisection is plenty at 60fps and costs no allocation. */
      var atX = function (wantX) {
        var lo = 0, hi = len, mid, q, k;
        for (k = 0; k < 12; k++) {
          mid = (lo + hi) / 2;
          q = p.getPointAtLength(mid);
          if ((x2 >= x1) ? (q.x < wantX) : (q.x > wantX)) lo = mid; else hi = mid;
        }
        return p.getPointAtLength((lo + hi) / 2);
      };

      this._flying = true;
      this._setPose('crouch');
      var t0 = null;
      var step = function (ts) {
        if (t0 === null) t0 = ts;
        var u = Math.min(1, (ts - t0) / self.FLIGHT_MS);
        if (u > 0.08 && u < 0.9) self._setPose('air');
        var q = atX(x1 + (x2 - x1) * u);
        self._placeBunny(q.x, q.y, s.hop < 0);
        if (u < 1) { self._raf = requestAnimationFrame(step); }
        else {
          self._raf = null;
          if (p.parentNode) p.parentNode.removeChild(p);
          land();
        }
      };
      this._raf = requestAnimationFrame(step);
    },

    /* ⭐ ONE HOP AT A TIME, CHAINED. Each flight is a real arc between two
       adjacent landings, so the animal always rides ink that exists. The
       chain is driven off the landing callback rather than a fixed
       schedule, so a reduced-motion visitor (whose flights are
       instantaneous) still advances one landing at a time and ends in
       exactly the same state. */
    _flySequence: function () {
      var self = this;
      var stepOnce = function () {
        var next = self.hop(self.st);
        if (!next) return;                    /* refuse 2 ends the chain */
        var from = self.at(self.st);
        self.st = next;
        /* ⚠⚠ THE CONTINUATION IS PASSED IN, NOT ASSIGNED BEFOREHAND.
           The first cut set `self._onLanded` and then called `_flyTo`,
           which OPENS WITH `_stopFlight()` — and `_stopFlight` nulls
           `_onLanded`, because an interrupt must kill a chain. So the
           chain cleared its own continuation on every step and "All the
           way" hopped exactly once.
           ⭐ Nothing caught it: local-test drives a single Hop, and the
           animation probe measured one flight. THE THUMBNAIL GENERATOR
           found it — the card came back with one arc where the whole
           point of the card is a ROW of identical ones. Same as #42. */
        self._flyTo(from, self.at(self.st), function () { self._after(60, stepOnce); });
        self._paint();
      };
      stepOnce();
    },

    _after: function (ms, fn) {
      var t = setTimeout(fn, ms);
      (this._timers = this._timers || []).push(t);
      return t;
    },

    /* ---- the repertoire ----------------------------------------------
       Four integers per record, locale-neutral and machine-provable.
       ⚠ `floor((max - s) / h) >= 2` is enforced at build: a one-hop
       record makes the equality claim vacuous, because a single arc
       cannot be the same length as anything.
       ---------------------------------------------------------------- */
    FREE_LINES: 5,
    /* ⚠ BYTE-IDENTICAL TO THE FIRST `freeCount` RECORDS OF
       number-line-lines.json, AND THE GATE PROVES IT RECORD BY RECORD.
       The first cut of this array was written before the JSON and then
       drifted from it — different ids, a different order, one record
       that existed in neither the other. An offline visitor would have
       been served a different free tier from an online one, silently.
       That is the whole reason V11 compares them one at a time instead
       of just counting them. */
    FALLBACK_LINES: {
      version: 1, freeCount: 5,
      lines: [
        { id: 'fives-fit',        max: 20,  s: 0,  h: 5 },
        { id: 'threes-gap',       max: 20,  s: 0,  h: 3 },
        { id: 'twos-many',        max: 20,  s: 0,  h: 2 },
        { id: 'back-from-twenty', max: 20,  s: 20, h: -5 },
        { id: 'tens-hundred',     max: 100, s: 0,  h: 10 }
      ]
    },
    _lines: function () {
      var all = (this._book && this._book.lines) || this.FALLBACK_LINES.lines;
      var out = [], i;
      /* ⚠ locked records are ABSENT from the array, never merely hidden,
         and the offline fallback IS the free tier — a 404 degrades to
         free, not to nothing (#38). */
      for (i = 0; i < all.length; i++) if (i < this.FREE_LINES || this.premium) out.push(all[i]);
      return out;
    },
    _next: function () {
      var list = this._lines();
      if (!list.length) return;
      this._idx = ((this._idx || 0) + 1) % list.length;
      var e = list[this._idx];
      this._stopFlight();
      this.st = this._st({ max: e.max, start: e.s, hop: e.h, n: 0 });
      this._paint();
      if (!this.premium && this._idx === 0) this._showGate();
    },

    _showGate: function () {
      var api = this.api;
      if (!this._wrap || this._wrap.querySelector('.nl-gate')) return;
      var g = api.el('div', 'nl-gate');
      var h = api.el('div', ''); h.textContent = api.t('gateTitle');
      var p = api.el('div', ''); p.textContent = api.t('gateBody');
      /* ⚠ TWO NODES, never a concatenation. */
      var a = api.el('a', ''); a.href = '/pricing'; a.textContent = api.t('gateCta');
      g.appendChild(h); g.appendChild(p); g.appendChild(a);
      this._wrap.appendChild(g);
    },

    /* ---- the sheet -----------------------------------------------------
       ⚠ Blank number lines are exactly what the nine-leaf printable
       family already gives away, so the sheet carries THE ONE THING THAT
       FAMILY CANNOT DRAW: hops at a true length that is independent of
       the tick step. Arcs printed, LANDINGS BLANK, and a second line with
       the same start at a different hop so the sheet itself carries the
       comparison.
       ⚠ #40 and #41 each shipped a Print chip calling window.print() with
       no @media print block at all, and the liveness gate is structurally
       blind to it because window.print fires either way.
       -------------------------------------------------------------------- */
    _buildSheet: function () {
      var s = this._st(this.st), self = this;
      while (this._sheetEl.firstChild) this._sheetEl.removeChild(this._sheetEl.firstChild);

      var rows = [
        { max: s.max, start: s.start, hop: s.hop },
        { max: s.max, start: s.start, hop: this._contrastHop(s) }
      ];

      rows.forEach(function (r) {
        var svg = self._svgEl('svg', {
          viewBox: '0 0 ' + self.W + ' ' + self.H, 'class': 'nl-sheet-svg'
        });
        svg.appendChild(self._svgEl('line', {
          x1: self.INSET - 22, x2: self.W - self.INSET + 22,
          y1: self.AXIS_Y, y2: self.AXIS_Y, 'class': 'nl-p-axis'
        }));
        var step = self.tickStep(r.max), major = self.majorStep(r.max), v, x;
        for (v = 0; v <= r.max; v += step) {
          x = self.xOf(r, v);
          var isMaj = (v % major === 0) || v === 0 || v === r.max;
          svg.appendChild(self._svgEl('line', {
            x1: x, x2: x,
            y1: self.AXIS_Y - (isMaj ? 16 : 9), y2: self.AXIS_Y + (isMaj ? 16 : 9),
            'class': 'nl-p-tick'
          }));
        }
        /* the ends are numbered; every landing in between is BLANK, which
           is the whole point of handing it out. */
        [0, r.max].forEach(function (v2) {
          var t = self._svgEl('text', {
            x: self.xOf(r, v2), y: self.AXIS_Y + 52,
            'text-anchor': 'middle', 'class': 'nl-p-num'
          });
          t.textContent = String(v2);
          svg.appendChild(t);
        });
        var k = self.maxHops(r), i, lands = [];
        for (i = 0; i <= k; i++) lands.push(r.start + i * r.hop);
        for (i = 0; i < k; i++) {
          svg.appendChild(self._svgEl('path', {
            d: self.arcPath(r, lands[i], lands[i + 1]), 'class': 'nl-p-arc'
          }));
        }
        self._sheetEl.appendChild(svg);
      });
    },

    /* a second hop that is genuinely different from the first — so the
       printed sheet is a comparison and not the same line twice. */
    _contrastHop: function (st) {
      var s = this._st(st);
      var mag = Math.abs(s.hop);
      var alt = mag === 1 ? 2 : (mag <= 4 ? mag * 2 : Math.max(1, Math.round(mag / 2)));
      if (alt === mag) alt = mag + 1;
      if (alt > s.max) alt = Math.max(1, s.max - 1);
      return s.hop < 0 ? -alt : alt;
    },

    /* ---- store + entitlement (the shipped shape, #42/#43) -------------- */
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
    /* ⚠ UNKNOWN IS PESSIMISTIC — no `&& premiumKnown` anywhere on a gate. */
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

    _loadBook: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      fetch('/mini-tools/number-line-lines.json', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j || !j.lines || !j.lines.length) return;
          self._book = j;
          if (typeof j.freeCount === 'number') self.FREE_LINES = j.freeCount;
          if (self._wrap) self._paint();
        })
        .catch(function () { /* the fallback is already live */ });
    },

    /* ⚠ THE SHELL'S RESET IS A REAL CONTROL AND IT NEEDS A HOOK.
       `lcs-shell.js:531` calls `tool.reset()` if a tool provides one, and
       without it the header's Reset button is DEAD — the #39 defect,
       drawn by the shell and unanswered by the tool. */
    reset: function () {
      this._stopFlight();
      this.st = this.newState();
      this._idx = -1;
      this._numStop = 0;
      if (this._wrap) this._paint();
    },

    init: function (api) {
      this.api = api;
      injectNumberLineCSS();
      this._store = this._loadStore();
      var ent = this._store.ent;
      if (ent && ent.tier) this.premium = ent.tier !== 'free';
      this.st = this.newState();
      this._idx = -1;
      this._numStop = 0;
      this._timers = [];
      this._book = this.FALLBACK_LINES;
      this._fetchEntitlement();
      this._loadBook();
    }
  };

  /* =====================================================================
     CSS. Direction A tokens, `nl-` prefix, injected once.
     ⚠ The old build injected with a bare IIFE carrying no id and no
     dedupe guard, so a remount injected the sheet twice.
     ⚠ No `vh`, no `vmin`, no `vw` anywhere: the shell caps the card at
     720px, so a viewport unit measured against the window is a lie
     inside the iframe. (The old `.nl-marker` was `clamp(36px,7vmin,56px)`.)
     ===================================================================== */
  function injectNumberLineCSS() {
    if (document.getElementById('nl-style')) return;
    var css = ''
      + '.nl-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'

      + '.nl-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}'
      + '.nl-range{min-width:52px;min-height:44px;padding:6px 14px;border-radius:999px;'
      + 'border:2px solid #146B5E;background:#FFFDF7;color:#0F4A40;cursor:pointer;'
      + 'font-family:"Baloo 2",Nunito,sans-serif;font-weight:800;font-size:17px;}'
      + '.nl-range.nl-on{background:#146B5E;color:#FFFDF7;}'
      + '.nl-range:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'

      /* ⚠ WIDTH capped, height DERIVED from the pinned aspect. No
         max-height here, ever — see the W/H block above. And no `vh`,
         `vmin` or `vw`: the shell caps the card at 720px, so a viewport
         unit measured against the window is a lie inside the iframe. */
      + '.nl-bench{display:flex;flex-direction:column;gap:0;width:100%;max-width:600px;'
      + 'margin:0 auto;}'
      + '.nl-stage{position:relative;width:100%;max-width:600px;'
      + 'aspect-ratio:5/2;margin:0 auto;}'
      + '.nl-svg{position:absolute;inset:0;width:100%;height:100%;display:block;overflow:visible;}'

      /* ⭐ non-scaling-stroke on EVERY stroke. Without it a vertical tick
         scales by scaleX and a horizontal axis by scaleY, so the two
         rendered at 0.45px and 2.16px on a phone — the axis was five
         times its own ticks. */
      + '.nl-axis,.nl-tip,.nl-tick,.nl-here,.nl-arc{vector-effect:non-scaling-stroke;}'
      + '.nl-axis{stroke:#146B5E;stroke-width:3;stroke-linecap:round;}'
      + '.nl-tip{fill:none;stroke:#146B5E;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;}'
      + '.nl-tick{stroke:#B9CFC9;stroke-width:2;}'
      + '.nl-tick-major{stroke:#146B5E;stroke-width:3;}'
      + '.nl-here{stroke:#F2784B;stroke-width:4;stroke-linecap:round;}'
      + '.nl-arc{fill:none;stroke:#F2784B;stroke-width:4;stroke-linecap:round;opacity:.5;}'
      + '.nl-arc-new{opacity:1;stroke-width:5;}'
      + '.nl-ghost{display:none;}'

      /* the HTML overlay: every numeral, at a real pixel size */
      + '.nl-nums{position:absolute;inset:0;pointer-events:none;}'
      /* ⚠ the numeral row's y is DERIVED from AXIS_Y, not typed twice —
         two numbers that agree are a coincidence waiting to end (#43). */
      + '.nl-num{position:absolute;transform:translateX(-50%);'
      + 'top:' + ((NumberLine.AXIS_Y + 26) / NumberLine.H * 100).toFixed(2) + '%;'
      + 'font-family:"Baloo 2",Nunito,sans-serif;font-weight:800;font-size:15px;'
      + 'line-height:1;color:#0F4A40;white-space:nowrap;}'
      + '.nl-arclab{position:absolute;transform:translate(-50%,-50%);pointer-events:none;'
      + 'font-family:"Baloo 2",Nunito,sans-serif;font-weight:800;font-size:20px;'
      + 'line-height:1;color:#C8613A;white-space:nowrap;}'

      /* the rabbit: placed in %, sized in px, feet on the line */
      + '.nl-bunny{position:absolute;width:52px;height:46px;'
      + 'transform:translate(-50%,-100%);pointer-events:none;}'
      + '.nl-bunny-svg{width:100%;height:100%;display:block;overflow:visible;}'
      /* ⚠ the mirror is its own nested element (see _placeBunny) */
      + '.nl-bunny.nl-flip .nl-bunny-svg{transform:scaleX(-1);}'
      + '.nl-bunny .nl-ears,.nl-bunny .nl-legs,.nl-bunny .nl-face{display:none;}'
      + '.nl-bunny[data-pose="idle"] .nl-ears-up,'
      + '.nl-bunny[data-pose="crouch"] .nl-ears-up,'
      + '.nl-bunny[data-pose="land"] .nl-ears-up,'
      + '.nl-bunny[data-pose="happy"] .nl-ears-up,'
      + '.nl-bunny[data-pose="air"] .nl-ears-back{display:block;}'
      + '.nl-bunny[data-pose="idle"] .nl-legs-stand,'
      + '.nl-bunny[data-pose="happy"] .nl-legs-stand,'
      + '.nl-bunny[data-pose="crouch"] .nl-legs-crouch,'
      + '.nl-bunny[data-pose="land"] .nl-legs-crouch,'
      + '.nl-bunny[data-pose="air"] .nl-legs-air{display:block;}'
      + '.nl-bunny[data-pose="happy"] .nl-face-happy{display:block;}'
      + '.nl-bunny[data-pose="idle"] .nl-face-calm,'
      + '.nl-bunny[data-pose="crouch"] .nl-face-calm,'
      + '.nl-bunny[data-pose="land"] .nl-face-calm,'
      + '.nl-bunny[data-pose="air"] .nl-face-calm{display:block;}'
      + '@media (prefers-reduced-motion: no-preference){'
      + '  .nl-bunny[data-pose="crouch"] .nl-bunny-svg{transform:scaleY(.86) translateY(7%);}'
      + '  .nl-bunny.nl-flip[data-pose="crouch"] .nl-bunny-svg{transform:scaleX(-1) scaleY(.86) translateY(7%);}'
      + '  .nl-bunny[data-pose="land"] .nl-bunny-svg{transform:scaleY(.9) scaleX(1.06) translateY(5%);}'
      + '  .nl-bunny.nl-flip[data-pose="land"] .nl-bunny-svg{transform:scaleX(-1.06) scaleY(.9) translateY(5%);}'
      + '}'

      /* ⚠ a media query is NOT a viewport unit. Inside the iframe the
         query width IS the tool's width, which is what the sizing needs
         to track; a `vw` length would be measured against the window and
         ignore the shell's 720px card cap. */
      + '@media (max-width:430px){.nl-bunny{width:40px;height:35px;}}'

      /* ---- THE TWO RAILS -------------------------------------------
         ⚠ They sit OUTSIDE the stage and they must still read as PART
         OF THE LINE. On the first cut they did not: with 44px of dead
         space above them the start grip read as a stray dot and the
         caliper read as a volume slider, and neither said what it drove.
         Three things fix it and all three are load-bearing —
           · zero gap, so proximity does the binding;
           · the knobs sit at the TOP of their 44px hit area and POINT
             UP, so the shape aims at the line it moves;
           · the caliper has end-caps and carries its own numeral, so it
             reads as a measured length and not as a track.
         The 44px hit area is unchanged and invisible; only the drawn
         knob is small. And two rails rather than one is what makes the
         grips uncollidable at range 1000, hop 1 — they would be 1px
         apart on a single rail. */
      + '.nl-rail{position:relative;width:100%;max-width:600px;height:40px;margin:0 auto;}'
      + '.nl-rail-hop{height:44px;}'

      /* ⚠ min-width, because the caliper IS the claim. At range 1000 a
         hop of 1..5 renders one or two pixels wide, and the tool's whole
         thesis is that the unit is a LENGTH you can see. `_calNum` still
         prints the numeral, so nothing is unknown — but a length you
         cannot see is not making the argument. */
      + '.nl-caliper{position:absolute;top:9px;height:14px;min-width:8px;'
      + 'border-left:3px solid #F2784B;border-right:3px solid #F2784B;'
      + 'border-bottom:3px solid #F2784B;border-radius:0 0 4px 4px;box-sizing:border-box;}'
      + '.nl-caliper-num{position:absolute;left:50%;top:14px;transform:translateX(-50%);'
      + 'font-family:"Baloo 2",Nunito,sans-serif;font-weight:800;font-size:15px;line-height:1;'
      + 'color:#C8613A;white-space:nowrap;}'

      + '.nl-grip{position:absolute;top:-4px;width:44px;height:44px;margin-left:-22px;padding:0;'
      + 'border:0;background:transparent;cursor:grab;touch-action:none;display:flex;'
      + 'align-items:flex-start;justify-content:center;border-radius:8px;}'
      + '.nl-grip:active{cursor:grabbing;}'
      + '.nl-grip:focus-visible{outline:3px solid #1E8FD4;outline-offset:-2px;}'
      /* the start knob is a pin AIMED AT THE LINE, not a dot beside it */
      + '.nl-knob{display:block;width:0;height:0;margin-top:2px;'
      + 'border-left:9px solid transparent;border-right:9px solid transparent;'
      + 'border-bottom:13px solid #146B5E;}'
      + '.nl-g-hop{top:0;}'
      + '.nl-g-hop .nl-knob{margin-top:5px;width:16px;height:22px;border:0;border-radius:5px;'
      + 'background:#F2784B;box-shadow:0 0 0 3px #FFFDF7;}'

      + '.nl-hint{text-align:center;font-family:Nunito,sans-serif;font-size:15px;'
      + 'line-height:1.45;color:#3C6E63;max-width:660px;}'
      + '.nl-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;'
      + 'width:100%;max-width:660px;}'
      + '.nl-chip{font-family:Nunito,sans-serif;font-weight:600;font-size:15px;line-height:1.1;'
      + 'padding:11px 16px;min-height:44px;border-radius:999px;border:2px solid #146B5E;'
      + 'background:#FFFDF7;color:#0F4A40;cursor:pointer;}'
      + '.nl-chip.nl-primary{background:#F2784B;border-color:#F2784B;color:#fff;}'
      + '.nl-chip.nl-lock{border-color:#C8613A;color:#C8613A;background:transparent;}'
      + '.nl-chip[disabled]{opacity:.45;cursor:default;}'
      + '.nl-chip:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'
      + '.nl-gate{width:100%;max-width:660px;border-radius:16px;border:2px dashed #C8613A;'
      + 'padding:14px 16px;text-align:center;font-family:Nunito,sans-serif;font-size:15px;'
      + 'color:#3C6E63;}'
      + '.nl-gate a{color:#C8613A;font-weight:700;}'

      + '.nl-sheet{display:none;}'
      + '.nl-sheet-svg{width:100%;height:auto;break-inside:avoid;}'
      + '.nl-p-axis{fill:none;stroke:#000;stroke-width:3;}'
      + '.nl-p-tick{stroke:#000;stroke-width:2;}'
      + '.nl-p-arc{fill:none;stroke:#000;stroke-width:3;stroke-linecap:round;}'
      + '.nl-p-num{fill:#000;font-family:"Baloo 2",Nunito,sans-serif;font-weight:800;font-size:30px;}'

      + '@media print{'
      /* ⚠ browsers strip background colours when printing by default. */
      + '  *{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
      + '  .lcs-header,.lcs-hint,.nl-bar,.nl-stage,.nl-rail,.nl-hint,.nl-foot,.nl-gate'
      + '  {display:none !important;}'
      + '  .nl-wrap{gap:0;}'
      + '  .nl-sheet{display:grid;gap:16mm;width:100%;}'
      + '  @page{margin:14mm;}'
      + '}';
    var el = document.createElement('style');
    el.id = 'nl-style';
    el.textContent = css;
    document.head.appendChild(el);
  }

  if (typeof window !== 'undefined') window.NumberLine = NumberLine;
  if (typeof module !== 'undefined' && module.exports) module.exports = NumberLine;
}());
