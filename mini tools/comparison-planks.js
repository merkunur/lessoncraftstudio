/* =====================================================================
   TOOL #42 — THE PLANKS   (comparison-planks.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #7. Catalog slot A5, wave 2.

   THE PLANKS · THE BRACKET · THE OFFCUT. Three named parts, and nothing
   else in this tool gets a noun.
   ⚠ NOT "the tape" (#40 owns THE TAPES), NOT "the strand" (#41 owns
   THE STRAND), and NOT "the bar" — measured across all 44 tools' names
   and taglines, `bar`, `beam` (so Balkenmodell's own noun), `strip`,
   `tape` and `strand` are each another tool's identity. `plank`,
   `offcut` and `bracket` are free. A colliding noun is a collision even
   when the geometry differs.

   THE ROUTINE:
     "Make this one 8 and that one 16. Where do they stop being the same?"
      ... and then the move that matters:
     "Take the extra bit off, and put it on the short one."

   THE ONE THESIS — THE DIFFERENCE IS NOT A NUMBER YOU WORK OUT. IT IS A
   PIECE OF THE LONGER PLANK, AND IT IS EXACTLY THE PIECE THE SHORTER
   PLANK WAS MISSING. Its relation to its two siblings, which is why the
   three belong on one shelf: in #40 the object held still and the number
   moved; in #41 everything moved and the number held still; HERE THE
   CHILD SETS BOTH NUMBERS AND THE TOOL ANSWERS WITH A THIRD QUANTITY IT
   REFUSES TO NUMBER.

   THREE INVENTIONS:
     1. ⭐ THE DIFFERENCE BECOMES AN OBJECT. Nothing anywhere in this repo
        takes a sub-region of a rendered magnitude and promotes it to an
        independent, positionable thing. Zero prior art.
     2. A PLANK'S OWN LENGTH IS THE DRAGGABLE THING. Every other bar in
        this repo is width-from-data (`len/MAXLEN`, `v/20`, `flexGrow`).
        `ruler.js` drags the ENDPOINTS of a measuring span; #40 drags a
        repeated UNIT's size. Nobody grabs a quantity and makes the
        quantity itself bigger.
     3. THE PAYOFF IS EXACT BY CONSTRUCTION. Seated, the composite's
        right edge and the longer plank's right edge are not two numbers
        that agree — they are ONE EXPRESSION EVALUATED TWICE.

   ⚠ THE FENCE — FOUR SURFACES, RUN FRESH, AND IT CAME BACK **NOT CLEAN**.
   Per §23.3 the overlap is SUBTRACTED, not negotiated:
     TAKEN — CCSS 2.MD.A.4 is owned outright by `span-length-gap`
       (`length-gap-core.js:19` `answerValue = aLen − bLen`; the child
       TYPES it on a keypad; the difference is revealed as a SENTENCE).
       ⚠ AND #40 FORMALLY CEDES IT IN WRITING — `unit-handle.js:78`:
       "NO 'which is longer'. 2.MD.A.4 belongs to span-length-gap."
       Two static proportional bars already ship THREE times
       (`span-length-gap-activity.js:82`, `bram-board-shop-activity.js:166`,
       `vet-diagnosis-activity.js:187`), every width FROM DATA.
       ⭐ AND THE WRITTEN EQUATION IS ALREADY SHIPPED —
       `bram-board-shop-activity.js:208` emits
       `smaller + difference = bigger` into a recap box. THE PLATFORM CAN
       STATE THE IDENTITY AND HAS NEVER SHOWN IT. That gap is this tool.
       `part-whole-frame.js` (#27) + `number-bond-core.js` own part-whole,
       and the repo's only braces are VERTICAL bonds under a whole.
     REMAINDER, measured virgin — a plank whose length the child sets;
       two independently stretchable planks in one frame; a bracket over
       an OVERHANG; and the detach.
     ⭐ AN INVERSION WORTH NAMING: in this repo an overhang is currently
       an ERROR VERDICT — `lay-units-core.js:57` returns
       `{status:'overhang'}` when units are laid past the end. HERE THE
       OVERHANG IS THE PAYLOAD.

   ⚠ THE CATALOG'S A5 SPEC DOES NOT SURVIVE CONTACT, TWICE:
     "all ordered pairs in 1..40²" — at N=40 the scale is k=22.5, so on
       the MEASURED 296px bench at a 320px viewport one unit is 6.66px:
       a one-unit bracket would be 6.66px wide with 3px ticks at each
       end, i.e. 0.66px of rail, shorter than its own stroke. The band is
       DERIVED from a legibility floor instead — see N_MAX below.
     "the difference bar IS a real DOM copy of the overhang region" —
       a copy has to be PROVED equal to its origin. This tool RE-PARENTS
       one node, so `node === node` across the whole round trip. That is
       strictly stronger, and it is why there is no spawn frame.

   REFUSES, FOREVER — each one gated:
     1. NEVER ASKS, NEVER TAKES AN ANSWER. No question, no keypad, no
        input, no `?`. The tool SHOWS; it never ASKS.
     2. NEVER PRINTS THE THIRD NUMBER. Exactly two numerals on stage, in
        every state. The third number is the one the class says aloud.
     3. NEVER WRITES THE SENTENCE. No `+`, `=`, `−`, `↔`, `Δ` anywhere.
     4. NEVER SPLITS ONE PLANK INTO PARTS. The offcut is a DIFFERENCE.
     5. NO UNITS, NO TICKS, NO TILING. The planks are smooth magnitudes.
     6. NO VERDICT, and nothing appears because something is right.
     7. THE PLANK YOU ARE NOT TOUCHING DOES NOT FLINCH.
     8. NO COMMITTED PRIOR ESTIMATE — the offcut lands flush BY
        CONSTRUCTION, so a "guess where it reaches" marker would have
        exactly one right answer and the landing would become a reveal
        with a verdict. #41 owns the flag. The prediction here is verbal
        and the teacher's.
     And standing: no score, no timer, no streak, no speech.

   ⭐ WHAT THE THREE NATIVE PANELS FOUND IN MY ENGLISH — recorded here
   because the source is the ONLY review it ever gets, and because two
   of these were bugs in the MODEL that a panel found by reading the
   code rather than the copy:
     · ⚠ A LIVE MODEL BUG. The hint ladder handed `hintCarry` to BOTH
       `lifting` and `free` — but in `lifting` moveOffcut LOCKS nx, so
       "now carry the piece" was live during the one phase where
       carrying is impossible. §23.6's a-control-must-do-what-its-label-
       says, applied to a hint. `lifting` now keeps `hintTake`.
     · ⚠ ONE ELEMENT, TWO JOBS, ONE NAME. `_hO` is the BRACKET's grip
       while attached and the PIECE's grip once free, and it announced
       itself the same way in both — so a screen-reader user was told to
       carry something still bolted on. Two labels now, and the local
       gate ASSERTS the swap rather than trusting it.
     · ⭐⭐ AND THE #41 DEFECT RECURRED, VERBATIM, WHILE I WAS FIXING AN
       a11y FINDING. Naming the hollow "the gap" made it a FOURTH NAMED
       PART in a tool whose own line 7 says three named parts and
       nothing else gets a noun. De-nouned: the hollow is an ABSENCE,
       not an object the child handles, and a name for it would compete
       with the offcut being THE thing. A law you wrote yourself is not
       self-enforcing.
     · GATE 5 WAS CARRIED BY NO STRING. The thesis is that the third
       number is the one the class says out loud — and nothing invited
       anyone to say it. `hintSay` is that string.
     · `sceneLabel` (was `benchLabel`, a name leaked from #40, which HAS
       a bench) described a state the tool is usually not in.
     · "put it ON the shorter one" is spatially WRONG — the seat is
       end-to-end, `seatY = shortRowY`. Dutch *op* and Nordic *på* both
       read as ON TOP, so five panels each had to write around it.

   ⚠⚠ AND THE FENCE AROUND `hintSay` IS BEHAVIOURAL, NOT LEXICAL — the
   sharpest thing any panel said. "Say how long that piece is" and
   `span-length-gap`'s banned "how much longer is it" HAVE THE SAME
   ANSWER. What keeps this tool off that ground is that IT TAKES NO
   INPUT — no keypad, no field, no check. So no word-ban can guard the
   boundary, and an edit to `hintSay` in any of eleven locales could
   cross it without a single gate noticing. If the tool ever grows an
   input, this string is the first thing that has to go.

   ⚠ PER-LOCALE NOUN TRAPS, each caught by a native panel and each of
   which would have shipped:
     de  Klammer = PARENTHESIS in maths — unusable in a tool forbidden
         from writing arithmetic; and Bügel + Brett reads as Bügelbrett,
         an ironing board. Hence `Henkel`. `Rest` = division remainder.
     it  graffa = the brace AND a PAPER CLIP — a banned non-standard
         unit smuggled in through the apparatus's own name. Hence
         `parentesi`. `tavola` collides with tavola pitagorica.
     es  `tabla` = the TIMES TABLES. `par` = an EVEN NUMBER, so
         "another pair" had to become `pareja`. `vara` is a real unit.
     pt  `tábua` sits one syllable from `tabuada`.
     nl  ⭐ `plank` means SHELF first, and heart-words already owns it
         (Woordplanken) — the tool's own English name does not survive
         contact with Dutch. Hence `lat`.
     sv  `bana` is unusable: its definite `banan` is the banana.
     fi  `lauta : laudat` sits one step from `lautanen : lautaset`,
         which fraction-kitchen owns. Hence `lankku`.

   0 lines to lcs-shell.{js,css} or any protected core.
   ===================================================================== */

(function () {
  'use strict';

  var ComparisonPlanks = {
    id: 'comparison-planks',

    /* ---------------------------------------------------------------
       STRINGS — GENERATED. EN is authored; the other ten are REBUILT
       (not translated) by a three-person NATIVE panel per locale,
       §A.13.48. ⚠ DO NOT HAND-EDIT A LOCALE HERE. SoT is
       scripts/_comparison-planks-strings.js.

       ⚠ AND NO STRING MAY NAME A UNIT, nor carry a digit, nor name the
       difference. `ruler.js` owns standard units; #40 owns "how many
       units fit"; `span-length-gap` owns "how much longer".
       --------------------------------------------------------------- */
    strings: {
      title:       { en: "The Planks", de: "Zwei Bretter, eine Linie", fr: "Deux planches, un même départ", es: "Los dos tablones", pt: "As Duas Ripas", it: "Le due travi", nl: "De latten", sv: "Plankorna", da: "Brædderne", no: "Fjølene", fi: "Lankut" },
      instruction: { en: "Two planks start from the same line. Make one longer than the other, then take the piece that sticks out off the long plank and lay it at the end of the short one.", de: "Zwei Bretter beginnen an derselben Linie. Macht eines länger als das andere, nehmt dann das überstehende Endstück vom langen Brett ab und legt es an das Ende des kurzen.", fr: "Deux planches partent de la même ligne. Faites-en une plus longue que l'autre, puis retirez de la planche longue le bout qui dépasse et posez-le à l'extrémité de la courte.", es: "Dos tablones salen de la misma línea. Haz uno más largo que el otro, quita del tablón largo el recorte que sobresale y ponlo justo al final del corto.", pt: "Duas ripas começam na mesma linha. Deixe uma mais comprida que a outra, tire da comprida o retalho que passa e ponha bem na ponta da curta.", it: "Due travi partono dalla stessa linea. Rendetene una più lunga dell'altra, poi staccate dalla lunga il ritaglio che sporge e mettetelo in fondo a quella corta.", nl: "Twee latten beginnen bij dezelfde streep. Maak de ene langer dan de andere, haal dan het stuk dat uitsteekt van de lange lat af en leg het aan het eind van de korte.", sv: "Två plankor börjar vid samma streck. Gör den ena längre än den andra, ta sedan av stumpen som sticker ut på den långa plankan och lägg den i änden av den korta.", da: "To brædder starter ved den samme streg. Gør det ene længere end det andet, tag så det stykke, der rager ud, af det lange bræt, og læg det for enden af det korte.", no: "To fjøler starter fra samme strek. Gjør den ene lengre enn den andre, ta så av biten som stikker ut på den lange fjøla, og legg den i enden av den korte.", fi: "Kaksi lankkua lähtee samalta viivalta. Tee toisesta lankusta pidempi kuin toisesta, irrota sitten pitkästä lankusta yli jäävä pala ja aseta se lyhyen lankun jatkoksi." },
      sceneLabel:  { en: "Two planks starting from one line. Whenever one reaches further than the other, a bracket appears over the piece that sticks out, and that piece can be carried to the end of the shorter plank.", de: "Zwei Bretter, die an derselben Linie beginnen. Sobald ein Brett weiter reicht als das andere, erscheint ein Henkel über dem überstehenden Endstück, und dieses Endstück lässt sich an das Ende des kürzeren Brettes tragen.", fr: "Deux planches qui partent de la même ligne. Dès qu'une planche va plus loin que l'autre, une accolade apparaît au-dessus du bout qui dépasse, et ce bout peut être porté jusqu'à l'extrémité de la planche courte.", es: "Dos tablones que salen de la misma línea. Cuando uno llega más lejos que el otro, aparece un corchete sobre el recorte que sobresale, y ese recorte se puede llevar hasta el extremo del tablón corto.", pt: "Duas ripas que começam na mesma linha. Sempre que uma chega mais longe que a outra, aparece um colchete sobre o retalho que passa, e esse retalho pode ser levado até a ponta da ripa curta.", it: "Due travi che partono dalla stessa linea. Ogni volta che una arriva più lontano dell'altra, sopra il ritaglio che sporge compare una parentesi, e quel ritaglio si può portare in fondo alla trave corta.", nl: "Twee latten die bij dezelfde streep beginnen. Zodra de ene verder komt dan de andere, verschijnt er een beugel over het stuk dat uitsteekt, en dat stuk kun je naar het eind van de korte lat brengen.", sv: "Två plankor som börjar vid samma streck. Så snart den ena når längre än den andra visas en klammer över stumpen som sticker ut, och stumpen går att bära till änden av den korta plankan.", da: "To brædder, der starter ved den samme streg. Så snart det ene når længere end det andet, kommer der en bøjle over det stykke, der rager ud, og stykket kan flyttes hen for enden af det korte bræt.", no: "To fjøler som starter fra samme strek. Så snart den ene når lenger enn den andre, kommer det en bue over biten som stikker ut, og biten kan flyttes til enden av den korte fjøla.", fi: "Kaksi samalta viivalta lähtevää lankkua. Heti kun toinen yltää pidemmälle kuin toinen, yli jäävän palan päälle ilmestyy kaari, ja palan voi siirtää lyhyen lankun päähän." },
      hintSame:    { en: "Both planks are the same length, so nothing sticks out. Drag one end to make them different.", de: "Beide Bretter sind gleich lang, also steht nichts über. Zieht an einem Ende, damit sie unterschiedlich lang werden.", fr: "Les deux planches ont la même longueur, donc rien ne dépasse. Faites glisser une extrémité pour leur donner des longueurs différentes.", es: "Los dos tablones son igual de largos, así que no sobresale nada. Arrastra un extremo para hacerlos distintos.", pt: "As duas ripas estão do mesmo tamanho, então nada passa da outra. Arraste uma ponta para deixá-las diferentes.", it: "Le due travi sono lunghe uguali, quindi non sporge niente. Trascinate un'estremità per renderle diverse.", nl: "De latten zijn even lang, dus er steekt niets uit. Sleep aan een uiteinde om ze verschillend te maken.", sv: "Plankorna är lika långa, så ingenting sticker ut. Dra i en ände så blir de olika.", da: "Brædderne er lige lange, så der rager ikke noget ud. Træk i en ende, så bliver de forskellige.", no: "Fjølene er like lange, så ingenting stikker ut. Dra i en ende, så blir de ulike.", fi: "Lankut ovat yhtä pitkiä, joten mitään ei jää yli. Vedä toisen päästä, niin niistä tulee eripituiset." },
      hintTake:    { en: "One plank reaches further than the other. Drag the bracket downwards to take off the piece that sticks out.", de: "Ein Brett reicht weiter als das andere. Zieht den Henkel nach unten, dann löst sich das überstehende Endstück ab.", fr: "Une planche va plus loin que l'autre. Faites glisser l'accolade vers le bas pour détacher le bout qui dépasse.", es: "Un tablón llega más lejos que el otro. Arrastra el corchete hacia abajo para quitar el recorte que sobresale.", pt: "Uma ripa chega mais longe que a outra. Arraste o colchete para baixo para tirar o retalho que passa.", it: "Una trave arriva più lontano dell'altra. Trascinate la parentesi verso il basso per staccare il ritaglio che sporge.", nl: "De ene lat komt verder dan de andere. Sleep de beugel naar beneden om het stuk dat uitsteekt eraf te halen.", sv: "Den ena plankan når längre än den andra. Dra klammern nedåt för att ta av stumpen som sticker ut.", da: "Det ene bræt når længere end det andet. Træk bøjlen nedad for at tage det stykke af, der rager ud.", no: "Den ene fjøla når lenger enn den andre. Dra buen nedover for å ta av biten som stikker ut.", fi: "Toinen lankku yltää pidemmälle kuin toinen. Vedä kaarta alaspäin, niin saat yli jäävän palan irti." },
      hintSay:     { en: "Before you move it, say out loud how long that piece is.", de: "Sagt laut, wie lang das Endstück ist, bevor ihr es bewegt.", fr: "Avant de le déplacer, dites à voix haute quelle est la longueur de ce bout.", es: "Antes de moverlo, di en voz alta cuánto mide ese recorte.", pt: "Antes de mover, diga em voz alta quanto mede esse retalho.", it: "Prima di spostarlo, dite ad alta voce quanto è lungo quel ritaglio.", nl: "Zeg eerst hardop hoe lang dat stuk is, voordat je het verplaatst.", sv: "Säg högt hur lång stumpen är innan ni flyttar den.", da: "Sig højt, hvor langt stykket er, før I flytter det.", no: "Si høyt hvor lang biten er før dere flytter den.", fi: "Sanokaa ääneen, kuinka pitkä pala on, ennen kuin siirrätte sen." },
      hintCarry:   { en: "The long plank is now missing that piece. Carry it to the end of the shorter plank.", de: "Dem langen Brett fehlt jetzt dieses Endstück. Tragt es an das Ende des kürzeren Brettes.", fr: "Il manque maintenant ce bout à la planche longue. Portez-le jusqu'à l'extrémité de la planche courte.", es: "Al tablón largo ahora le falta ese recorte. Lleva el recorte hasta el extremo del tablón corto.", pt: "Agora a ripa comprida está sem esse retalho. Leve-o até a ponta da ripa curta.", it: "Ora alla trave lunga manca quel ritaglio. Portatelo in fondo alla trave corta.", nl: "De lange lat mist dat stuk nu. Breng het naar het eind van de korte lat.", sv: "Den långa plankan saknar nu stumpen. Bär den till änden av den korta plankan.", da: "Det lange bræt mangler nu det stykke. Flyt det hen for enden af det korte bræt.", no: "Den lange fjøla mangler nå biten. Flytt den til enden av den korte fjøla.", fi: "Pitkästä lankusta puuttuu nyt tuo pala. Siirrä se lyhyen lankun päähän." },
      hintSeated:  { en: "The short plank and the piece together reach exactly to where the long plank ends.", de: "Das kurze Brett und das Endstück reichen zusammen genau bis dorthin, wo das lange Brett endet.", fr: "Ensemble, la planche courte et le bout arrivent exactement là où se termine la planche longue.", es: "El tablón corto con el recorte llega exactamente hasta donde termina el tablón largo.", pt: "A ripa curta com o retalho chega exatamente até onde a ripa comprida termina.", it: "La trave corta con il ritaglio arriva esattamente dove finisce la trave lunga.", nl: "De korte lat en het stuk komen samen precies tot waar de lange lat eindigt.", sv: "Den korta plankan och stumpen når tillsammans precis dit den långa plankan slutar.", da: "Det korte bræt og stykket når tilsammen præcis derhen, hvor det lange bræt ender.", no: "Den korte fjøla og biten når til sammen nøyaktig dit den lange fjøla slutter.", fi: "Lyhyt lankku ja pala yltävät yhdessä täsmälleen siihen kohtaan, johon pitkä lankku päättyy." },
      takeBtn:     { en: "Take the piece off", de: "Endstück abnehmen", fr: "Détacher le bout", es: "Quitar el recorte", pt: "Tirar o retalho", it: "Stacca il ritaglio", nl: "Haal het stuk eraf", sv: "Ta av stumpen", da: "Tag stykket af", no: "Ta av biten", fi: "Irrota pala" },
      layBtn:      { en: "Lay it end to end", de: "Ans Brettende anlegen", fr: "Poser bout à bout", es: "Unirlo punta con punta", pt: "Pôr ponta com ponta", it: "Mettilo di seguito", nl: "Leg het aan het eind", sv: "Lägg den i änden", da: "Læg det ende mod ende", no: "Legg den i enden", fi: "Aseta jatkoksi" },
      putBackBtn:  { en: "Put it back where it was", de: "Endstück zurücklegen", fr: "Remettre à sa place", es: "Devolverlo a su lugar", pt: "Pôr de volta no lugar", it: "Rimettilo a posto", nl: "Leg het weer terug", sv: "Lägg den där den satt", da: "Læg det, hvor det sad", no: "Legg den der den satt", fi: "Palauta paikalleen" },
      nextBtn:     { en: "Another pair", de: "Neues Paar", fr: "Une autre paire", es: "Otra pareja", pt: "Outra dupla", it: "Un'altra coppia", nl: "Ander paar", sv: "Nytt par", da: "Nyt par", no: "Nytt par", fi: "Uusi pari" },
      printBtn:    { en: "Print the sheet", de: "Arbeitsblatt drucken", fr: "Imprimer la fiche", es: "Imprimir la hoja", pt: "Imprimir a folha", it: "Stampa il foglio", nl: "Print het blad", sv: "Skriv ut bladet", da: "Print arket", no: "Skriv ut arket", fi: "Tulosta arkki" },
      plankAAria:  { en: "the top plank. Drag its end to make it longer or shorter.", de: "das obere Brett. Zieht am Ende, um es länger oder kürzer zu machen.", fr: "la planche du haut. Faites glisser son extrémité pour l'allonger ou la raccourcir.", es: "el tablón de arriba. Arrastra su extremo para hacerlo más largo o más corto.", pt: "a ripa de cima. Arraste a ponta para deixá-la mais comprida ou mais curta.", it: "la trave in alto. Trascina l'estremità per renderla più lunga o più corta.", nl: "de bovenste lat. Sleep aan het uiteinde om hem langer of korter te maken.", sv: "den övre plankan. Dra i änden för att göra den längre eller kortare.", da: "det øverste bræt. Træk i enden for at gøre det længere eller kortere.", no: "den øverste fjøla. Dra i enden for å gjøre den lengre eller kortere.", fi: "ylempi lankku. Vedä päästä, niin lankku pitenee tai lyhenee." },
      plankBAria:  { en: "the bottom plank. Drag its end to make it longer or shorter.", de: "das untere Brett. Zieht am Ende, um es länger oder kürzer zu machen.", fr: "la planche du bas. Faites glisser son extrémité pour l'allonger ou la raccourcir.", es: "el tablón de abajo. Arrastra su extremo para hacerlo más largo o más corto.", pt: "a ripa de baixo. Arraste a ponta para deixá-la mais comprida ou mais curta.", it: "la trave in basso. Trascina l'estremità per renderla più lunga o più corta.", nl: "de onderste lat. Sleep aan het uiteinde om hem langer of korter te maken.", sv: "den nedre plankan. Dra i änden för att göra den längre eller kortare.", da: "det nederste bræt. Træk i enden for at gøre det længere eller kortere.", no: "den nederste fjøla. Dra i enden for å gjøre den lengre eller kortere.", fi: "alempi lankku. Vedä päästä, niin lankku pitenee tai lyhenee." },
      bracketAria: { en: "the bracket over the piece that sticks out. Drag it down to take the piece off.", de: "der Henkel über dem überstehenden Endstück. Zieht ihn nach unten, um das Endstück abzunehmen.", fr: "l'accolade au-dessus du bout qui dépasse. Faites-la glisser vers le bas pour détacher le bout.", es: "el corchete sobre el recorte que sobresale. Arrástralo hacia abajo para quitar el recorte.", pt: "o colchete sobre o retalho que passa. Arraste para baixo para tirar o retalho.", it: "la parentesi sopra il ritaglio che sporge. Trascinala verso il basso per staccare il ritaglio.", nl: "de beugel over het stuk dat uitsteekt. Sleep hem naar beneden om het stuk eraf te halen.", sv: "klammern över stumpen som sticker ut. Dra den nedåt för att ta av stumpen.", da: "bøjlen over det stykke, der rager ud. Træk den nedad for at tage stykket af.", no: "buen over biten som stikker ut. Dra den nedover for å ta av biten.", fi: "kaari yli jäävän palan päällä. Vedä sitä alaspäin, niin pala irtoaa." },
      offcutAria:  { en: "the piece that sticks out. Drag it to carry it.", de: "das überstehende Endstück. Zieht es, um es zu tragen.", fr: "le bout qui dépasse. Faites-le glisser pour le porter.", es: "el recorte que sobresale. Arrástralo para llevarlo.", pt: "o retalho que passa da outra ripa. Arraste para levá-lo.", it: "il ritaglio che sporge. Trascinalo per portarlo.", nl: "het stuk dat uitsteekt. Sleep het om het te verplaatsen.", sv: "stumpen som sticker ut. Dra den för att bära den.", da: "det stykke, der rager ud. Træk det for at flytte det.", no: "biten som stikker ut. Dra den for å flytte den.", fi: "yli jäävä pala. Siirrä sitä vetämällä." },
      gateTitle:   { en: "More pairs", de: "Mehr Paare", fr: "D'autres paires", es: "Más parejas", pt: "Mais duplas", it: "Altre coppie", nl: "Meer paren", sv: "Fler par", da: "Flere par", no: "Flere par", fi: "Lisää pareja" },
      gateBody:    { en: "Eleven more pairs, ordered so each one surprises after the one before, and the sheet to print for working on paper.", de: "Elf weitere Paare, so geordnet, dass jedes nach dem vorherigen überrascht, dazu das Arbeitsblatt zum Ausdrucken.", fr: "Onze autres paires, ordonnées pour que chacune surprenne après la précédente, et la fiche à imprimer pour le travail sur papier.", es: "Once parejas más, ordenadas para que cada una sorprenda después de la anterior, y la hoja para imprimir y trabajar en papel.", pt: "Mais onze duplas, na ordem certa para que cada uma surpreenda depois da anterior, e a folha para imprimir e trabalhar no papel.", it: "Altre undici coppie, in un ordine in cui ognuna sorprende dopo la precedente, e il foglio da stampare per lavorare su carta.", nl: "Nog elf paren, zo op volgorde dat elk paar verrast na het vorige, en het blad om af te drukken om op papier te werken.", sv: "Elva par till, ordnade så att varje par överraskar efter det förra, och bladet att skriva ut för att arbeta på papper.", da: "Elleve par mere, sat i en rækkefølge, hvor hvert par overrasker efter det forrige, og arket til at printe, så I kan arbejde på papir.", no: "Elleve par til, satt opp slik at hvert par overrasker etter det forrige, og arket til å skrive ut, så dere kan jobbe på papir.", fi: "Yksitoista paria lisää järjestyksessä, jossa jokainen pari yllättää edellisen jälkeen, sekä tulostettava arkki paperilla työskentelyyn." },
      gateCta:     { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l'offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Tutustu Opettaja-tilaukseen" }
    },

    STORE_KEY: 'lcs:comparison-planks:v1',
    ENT_TRUST_DAYS: 14,

    /* ---- the stage, in model units ----------------------------------
       ⚠ EVERY ONE OF THESE IS AN INTEGER, AND `K` IS AN INTEGER BY
       CONSTRUCTION — which is what makes the payoff exact rather than
       approximate. `K * v` for v ≤ 16 is at most 960, far inside the
       exactly-representable range, and no rendered attribute can carry a
       decimal point. That is a gated property, not a hope.

       ⚠ N_MAX IS DERIVED, NOT QUOTED. The bench MEASURES 296px at a
       320px viewport (the narrowest supported). A bracket's rail must
       clear its own ticks: 2*stroke(3) + tick(8) = 14px. At N=16,
       k=60 → one unit is 17.76px, +27% over the floor. At the catalog's
       N=40 it is 6.66px — half the floor. Neither the stroke nor the
       tick may shrink to make a bigger band fit. */
    W: 1000,
    H: 440,
    X0: 30,             /* the START LINE — both planks grow from here   */
    RIGHT: 990,         /* the far edge of the longest possible plank    */
    N_MAX: 16,
    K: 60,              /* model units per value unit; (990-30)/16       */
    BAR_H: 62,
    A_Y: 96,            /* top of plank A                                */
    B_Y: 214,           /* top of plank B                                */
    CARRY_Y: 360,       /* at or below this top-y, the offcut is FREE    */
    FLOOR_Y: 372,       /* the lowest the offcut may be carried          */
    RULE_TOP: 66,
    RULE_BOT: 306,

    premium: false,
    premiumKnown: false,

    /* =================================================================
       THE STATE — five fields, total, pure, immutable.

       ⚠ THE DIFFERENCE IS NOT STORED. `diffOf` derives it on every read.
       A stored difference is a second source of truth that drifts away
       from a,b without anyone noticing, and every mutation that tries to
       introduce one is killed by a field-set assertion.
       ⚠ NOR IS "WHICH IS LONGER" STORED. `roleOf` is THREE-VALUED and
       returns null at a === b — a boolean `aIsLonger = a >= b` silently
       elects A at equality and then hangs a zero-width offcut off B.
       ================================================================= */
    PHASES: { attached: 1, lifting: 1, free: 1, laid: 1 },

    newState: function () {
      return { a: 5, b: 9, phase: 'attached', dx: 0, dy: 0 };
    },

    _int: function (v, dflt) {
      if (typeof v !== 'number' || !isFinite(v)) return dflt;   /* isFinite FIRST — Math.round(NaN) is NaN */
      return Math.min(this.N_MAX, Math.max(1, Math.round(v)));
    },
    _num: function (v, dflt) {
      return (typeof v === 'number' && isFinite(v)) ? Math.round(v) : dflt;
    },

    /* ⚠ TOTAL MEANS TOTAL. `st || newState()` catches null and 0 and
       hands `{}` and `[]` straight through to a property read — this
       validates FIELDS, not truthiness. And an impossible phase is
       REPAIRED, not carried: {a:3,b:3,phase:'free'} describes an offcut
       of zero width. */
    _st: function (st) {
      if (st === null || typeof st !== 'object') return this.newState();
      var a = this._int(st.a, 5), b = this._int(st.b, 9);
      var phase = this.PHASES[st.phase] ? st.phase : 'attached';
      if (a === b) phase = 'attached';
      var dx = this._num(st.dx, 0), dy = this._num(st.dy, 0);
      /* canonical representations — this is what makes the round-trip
         assertable at all, rather than only assertable on 3 of 5 fields */
      if (phase === 'attached') { dx = 0; dy = 0; }
      if (phase === 'laid') { dx = this.X0 + this.K * Math.min(a, b); dy = this.shortRowY(a, b); }
      return { a: a, b: b, phase: phase, dx: dx, dy: dy };
    },

    diffOf: function (st) { var s = this._st(st); return Math.abs(s.a - s.b); },
    /* three-valued on purpose */
    roleOf: function (st) {
      var s = this._st(st);
      if (s.a === s.b) return null;
      return s.a > s.b ? 'a' : 'b';
    },
    longRowY: function (a, b) { return a > b ? this.A_Y : this.B_Y; },
    shortRowY: function (a, b) { return a > b ? this.B_Y : this.A_Y; },
    homeY: function (st) { var s = this._st(st); return this.longRowY(s.a, s.b); },

    /* ---- the reducers. null is a REFUSAL, never a fake success ------ */

    setLen: function (st, which, v) {
      var s = this._st(st);
      if (which !== 'a' && which !== 'b') return null;
      /* ⭐ frozen while the offcut is out — a detached piece must never
         become a stale lie about a difference that has since changed.
         Refusal in the MODEL, never a `disabled` attribute (§23.6). */
      if (s.phase !== 'attached') return null;
      if (typeof v !== 'number' || !isFinite(v)) return null;
      var n = Math.round(v);
      /* REFUSES out of band; it does not clamp. The drag handler clamps
         the pointer→value conversion; these are two different jobs. */
      if (n < 1 || n > this.N_MAX) return null;
      if (n === s[which]) return null;
      s[which] = n;
      if (s.a === s.b) { s.phase = 'attached'; s.dx = 0; s.dy = 0; }
      return s;
    },

    beginLift: function (st) {
      var s = this._st(st);
      if (s.phase !== 'attached') return null;
      if (s.a === s.b) return null;            /* there is no overhang */
      s.phase = 'lifting';
      s.dx = this.X0 + this.K * Math.min(s.a, s.b);
      s.dy = this.homeY(s);
      return s;
    },

    /* ⚠ Math.round lives HERE, in the reducer, not in the renderer — so
       every numeric field of every reachable state is an integer ALWAYS,
       not "integer except while dragging". One assertion then guards the
       whole exactness story downstream.
       ⚠ AND THE CLAMP IS ON THE ORIGIN, WITH THE WIDTH UNTOUCHED. The
       obvious wrong version clamps both edges, which SQUASHES the offcut
       against the right wall — and that is exactly the defect that would
       refute "the offcut's length does not depend on where you drop it". */
    moveOffcut: function (st, x, y) {
      var s = this._st(st);
      if (s.phase !== 'lifting' && s.phase !== 'free') return null;
      if (typeof x !== 'number' || !isFinite(x)) return null;
      if (typeof y !== 'number' || !isFinite(y)) return null;
      var d = Math.abs(s.a - s.b), nx, ny, ph;
      if (s.phase === 'lifting') {
        /* ⭐ dx is LOCKED while it is still attached. Letting the child
           slide it sideways before it comes off is a lie about the
           material, and it makes "downwards" the gesture rather than a
           suggestion. */
        nx = this.X0 + this.K * Math.min(s.a, s.b);
        ny = Math.round(Math.min(this.FLOOR_Y, Math.max(this.homeY(s), y)));
        ph = (ny >= this.CARRY_Y) ? 'free' : 'lifting';
      } else {
        nx = Math.round(Math.min(this.RIGHT - this.K * d, Math.max(this.X0, x)));
        ny = Math.round(Math.min(this.FLOOR_Y, Math.max(this.A_Y, y)));
        ph = 'free';
      }
      if (nx === s.dx && ny === s.dy && ph === s.phase) return null;
      s.dx = nx; s.dy = ny; s.phase = ph;
      return s;
    },

    /* the seat: the far end of the SHORTER plank, computed never dropped */
    seatX: function (st) { var s = this._st(st); return this.X0 + this.K * Math.min(s.a, s.b); },
    seatY: function (st) { var s = this._st(st); return this.shortRowY(s.a, s.b); },
    /* the drop socket, half-width one unit — and the DRAWN socket is the
       same number, so the visible affordance and the model rule are one
       object (§23.6: a control must do what its label says) */
    dockTol: function () { return this.K; },

    endDrag: function (st) {
      var s = this._st(st);
      if (s.phase !== 'lifting' && s.phase !== 'free') return null;
      if (s.phase === 'lifting') { s.phase = 'attached'; s.dx = 0; s.dy = 0; return s; }
      var sx = this.seatX(s), sy = this.seatY(s);
      if (Math.abs(s.dx - sx) <= this.dockTol() && Math.abs(s.dy - sy) <= this.dockTol()) {
        s.phase = 'laid'; s.dx = sx; s.dy = sy; return s;
      }
      return null;                              /* it stays free — nothing changed */
    },

    unseat: function (st) {
      var s = this._st(st);
      if (s.phase !== 'laid') return null;
      s.phase = 'free';
      s.dy = this.CARRY_Y;
      return s;
    },

    reattach: function (st) {
      var s = this._st(st);
      if (s.phase === 'attached') return null;
      s.phase = 'attached'; s.dx = 0; s.dy = 0;
      return s;
    },

    /* The pointer-free path through the whole routine, so a keyboard, a
       screen reader and the liveness gate all reach the tool's actual
       point rather than only its first step.

       ⚠ IT IS A THREE-STEP CYCLE, NOT A TOGGLE, AND THAT IS A CORRECTION.
       The first version went attached → laid in one tap while the chip
       read "Take the piece off" — so the control took the piece off AND
       laid it on, and the label described half of what happened. §23.6:
       a control must do WHAT ITS LABEL SAYS. Each step now has its own
       true label: take it off · lay it on · put it back. */
    cycleOffcut: function (st) {
      var s = this._st(st);
      if (s.a === s.b) return null;
      if (s.phase === 'attached') {
        s.phase = 'free';
        s.dx = this.X0 + this.K * Math.min(s.a, s.b);
        s.dy = this.CARRY_Y;
        return s;
      }
      if (s.phase === 'lifting' || s.phase === 'free') {
        s.phase = 'laid'; s.dx = this.seatX(s); s.dy = this.seatY(s);
        return s;
      }
      s.phase = 'attached'; s.dx = 0; s.dy = 0;
      return s;
    },

    /* ---- geometry: pure functions of the state --------------------- */
    plankGeom: function (st, which) {
      var s = this._st(st), v = s[which];
      return { x: this.X0, y: which === 'a' ? this.A_Y : this.B_Y, w: this.K * v, h: this.BAR_H };
    },
    /* the matched region of the LONGER plank — what stays behind */
    matchedGeom: function (st) {
      var s = this._st(st), r = this.roleOf(s);
      if (!r) return null;
      return { x: this.X0, y: r === 'a' ? this.A_Y : this.B_Y, w: this.K * Math.min(s.a, s.b), h: this.BAR_H };
    },
    /* the offcut, wherever it currently is */
    offcutGeom: function (st) {
      var s = this._st(st), d = this.diffOf(s);
      if (!d) return null;
      if (s.phase === 'attached') {
        return { x: this.X0 + this.K * Math.min(s.a, s.b), y: this.homeY(s), w: this.K * d, h: this.BAR_H };
      }
      return { x: s.dx, y: s.dy, w: this.K * d, h: this.BAR_H };
    },
    bracketSpan: function (st) {
      var s = this._st(st);
      if (s.a === s.b) return null;
      return { x0: this.X0 + this.K * Math.min(s.a, s.b), x1: this.X0 + this.K * Math.max(s.a, s.b) };
    },
    /* ⭐ THE PAYOFF, as one expression. `min + d` and `max` are the same
       number, so the seated right edge and the longer plank's right edge
       are not two measurements that agree. */
    composedRight: function (st) {
      var s = this._st(st);
      return this.X0 + this.K * (Math.min(s.a, s.b) + this.diffOf(s));
    },
    longRight: function (st) {
      var s = this._st(st);
      return this.X0 + this.K * Math.max(s.a, s.b);
    },

    /* =================================================================
       THE PAIR BOOK — a and b only. The difference is never stored.
       ⚠ A 404 DEGRADES TO THE FREE TIER, NEVER TO NOTHING.
       ================================================================= */
    FREE_PAIRS: 5,
    FALLBACK_PAIRS: {
      version: 1, freeCount: 5,
      pairs: [
        { k: 'plain', a: 5, b: 9 },
        { k: 'twin', a: 8, b: 16 },
        { k: 'crumb', a: 15, b: 16 },
        { k: 'crumb-close', a: 2, b: 3 },
        { k: 'same', a: 12, b: 12 }
      ]
    },

    _fetchPairs: function () {
      var self = this;
      fetch('/mini-tools/comparison-planks-pairs.json', { cache: 'no-cache' })
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
        .catch(function () { return self.FALLBACK_PAIRS; })
        .then(function (d) {
          self.data = (d && d.pairs && d.pairs.length) ? d : self.FALLBACK_PAIRS;
          if (self._wrap) self.render();
        });
    },

    book: function () {
      var all = (this.data && this.data.pairs) || [], out = [], i;
      for (i = 0; i < all.length; i++) if (i < this.FREE_PAIRS || this.premium) out.push(all[i]);
      return out;
    },

    nextPair: function (st, book, idx) {
      var s = this._st(st);
      if (!book || book.length < 2) return null;
      var p = book[((idx + 1) % book.length + book.length) % book.length];
      s.a = this._int(p.a, 5); s.b = this._int(p.b, 9);
      s.phase = 'attached'; s.dx = 0; s.dy = 0;
      return s;
    },

    /* =================================================================
       STORE + ENTITLEMENT — the pattern from unroll-tape.js.
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

    /* ================================================================= */
    init: function (api) {
      this.api = api;
      injectComparisonPlanksCSS();
      this._store = this._loadStore();
      var ent = this._store.ent;
      if (ent && ent.tier) this.premium = ent.tier !== 'free';
      this.data = this.FALLBACK_PAIRS;
      this.st = this.newState();
      this._idx = 0;
      this._sheet = 4;                 /* print density: 1 | 2 | 4 | 0 (blank) */
      this._timers = [];
      this._fetchPairs();
      this._fetchEntitlement();
      this.render();
    },
    reset: function () { this.st = this.newState(); this._idx = 0; this._svg = null; this.render(); },

    /* =================================================================
       RENDER — the skeleton is built ONCE and then repainted.

       ⭐ THIS IS NOT AN OPTIMISATION, IT IS THE DESIGN CLAIM. The offcut
       must be ONE NODE whose identity survives the whole detach → carry
       → seat → return round trip, so that `node === node` and the stage's
       node count never changes. A render that rebuilds the stage each
       frame would make the offcut a new object every time, and the
       catalog's weaker "a real DOM copy" would be the best that could be
       said. A moved node IS its origin; a copy has to be proved equal.
       ================================================================= */
    render: function () {
      var api = this.api;
      if (!api || !api.stage) return;
      if (!this._svg || !this._svg.parentNode) this._build();
      this._paint();
    },

    _svgEl: function (tag, attrs) {
      var e = document.createElementNS('http://www.w3.org/2000/svg', tag), k;
      for (k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
      return e;
    },

    _build: function () {
      var api = this.api, self = this, stage = api.stage;
      stage.innerHTML = '';
      var wrap = api.el('div', 'cmp-wrap');
      this._wrap = wrap;

      var bench = api.el('div', 'cmp-bench');
      bench.setAttribute('role', 'group');
      bench.setAttribute('aria-label', api.t('sceneLabel'));
      this._bench = bench;

      var svg = this._svgEl('svg', { viewBox: '0 0 ' + this.W + ' ' + this.H, 'class': 'cmp-svg' });
      this._svg = svg;
      bench.appendChild(svg);

      /* furniture, deliberately unnamed — present in the FIRST frame and
         in every frame after, which is why nothing ever has to light up
         green when the composite arrives */
      this._startLine = this._svgEl('line', { x1: this.X0, y1: this.RULE_TOP, x2: this.X0, y2: this.RULE_BOT, 'class': 'cmp-rule' });
      this._farLine = this._svgEl('line', { y1: this.RULE_TOP, y2: this.RULE_BOT, 'class': 'cmp-rule cmp-far' });
      svg.appendChild(this._startLine);
      svg.appendChild(this._farLine);

      /* the drop socket — DRAWN from the same number the model docks on */
      this._socket = this._svgEl('rect', { 'class': 'cmp-socket', rx: 6 });
      svg.appendChild(this._socket);

      /* the hollow the offcut leaves behind. Nothing else in this repo
         leaves a hole, and it is what makes the frozen handles legible. */
      this._hollow = this._svgEl('rect', { 'class': 'cmp-hollow', rx: 5 });
      svg.appendChild(this._hollow);

      /* the two planks. Plank A is ALWAYS the top row and B the bottom —
         they never swap, because a row that jumps when a number crosses
         is the "the thing you were not touching flinched" failure. */
      this._plankA = this._svgEl('rect', { 'class': 'cmp-plank cmp-a', rx: 5 });
      this._plankB = this._svgEl('rect', { 'class': 'cmp-plank cmp-b', rx: 5 });
      svg.appendChild(this._plankA);
      svg.appendChild(this._plankB);

      /* ⭐ ONE NODE, for the life of the tool */
      this._offcut = this._svgEl('rect', { 'class': 'cmp-offcut', rx: 5 });
      svg.appendChild(this._offcut);

      this._seam = this._svgEl('line', { 'class': 'cmp-seam' });
      svg.appendChild(this._seam);
      this._brRail = this._svgEl('line', { 'class': 'cmp-br' });
      this._brL = this._svgEl('line', { 'class': 'cmp-br' });
      this._brR = this._svgEl('line', { 'class': 'cmp-br' });
      svg.appendChild(this._brRail); svg.appendChild(this._brL); svg.appendChild(this._brR);

      this._numA = api.el('span', 'cmp-num');
      this._numB = api.el('span', 'cmp-num');
      bench.appendChild(this._numA); bench.appendChild(this._numB);

      /* ---- the handles: fixed-size HTML buttons OVER the svg --------
         ⚠ never circles inside it. A radius in model units cannot hold a
         floor in pixels — #41 measured 44 model units rendering at 29px
         on a 660px bench. 44px is 44px. */
      this._hA = this._handle(bench, 'cmp-h-a', api.t('plankAAria'), function (v) {
        var n = self.setLen(self.st, 'a', v); if (n) { self.st = n; self._paint(); }
      }, 'len');
      this._hB = this._handle(bench, 'cmp-h-b', api.t('plankBAria'), function (v) {
        var n = self.setLen(self.st, 'b', v); if (n) { self.st = n; self._paint(); }
      }, 'len');
      this._hO = this._handle(bench, 'cmp-h-o', api.t('offcutAria'), null, 'off');

      wrap.appendChild(bench);

      this._hint = api.el('div', 'cmp-hint');
      this._hintSay = api.el('div', 'cmp-hint cmp-hint-say');
      wrap.appendChild(this._hint);
      wrap.appendChild(this._hintSay);

      var foot = api.el('div', 'cmp-foot');
      this._foot = foot;
      this._chipToggle = this._chip(foot, 'cmp-go', function () {
        var n = self.cycleOffcut(self.st);
        if (n) { self.st = n; self._paint(); }
      });
      this._chipNext = this._chip(foot, '', function () {
        var bk = self.book();
        var n = self.nextPair(self.st, bk, self._idx);
        if (n) { self._idx = (self._idx + 1) % bk.length; self.st = n; self._paint(); }
        if (!self.premium) self._maybeGate();
      });
      this._chipPrint = this._chip(foot, 'cmp-lock', function () {
        if (!self.premium) { self._showGate(); return; }
        self._buildSheet();
        try { window.print(); } catch (_) {}
      });
      wrap.appendChild(foot);

      /* ⭐ THE SHEET. A real print surface, not a window.print() call on
         the page. #40 and #41 each ship a Print chip with NO @media print
         block at all, so they print the whole web page — chrome, hints,
         buttons and footer. That is "a control must do what its label
         says", shipped twice, and this is the fix pattern. */
      this._sheetEl = api.el('div', 'cmp-sheet');
      wrap.appendChild(this._sheetEl);

      stage.appendChild(wrap);
    },

    _chip: function (foot, cls, fn) {
      var b = this.api.el('button', 'cmp-chip' + (cls ? ' ' + cls : ''));
      b.type = 'button';
      b.addEventListener('click', fn);
      foot.appendChild(b);
      return b;
    },

    /* A grabbable handle. ⚠ Bound to WINDOW — a repaint can replace the
       captured element and pointer capture dies with it (#40 paid for
       that one). ⚠ And it acts on pointerdown, click, Enter/Space AND
       arrows: a drag-only handle is dead to a keyboard, dead to
       assistive tech, and dead to the liveness gate, which drives
       synthetic .click() and never fires pointerdown (#41's flag scored
       0 of 9 paths in all three entitlement states).
       ⚠ The drag is DELTA-based, so grabbing a 60-unit offcut by a 44px
       pad never teleports it. */
    _handle: function (host, cls, aria, onVal, kind) {
      var self = this;
      var b = this.api.el('button', 'cmp-handle ' + cls);
      b.type = 'button';
      b.setAttribute('aria-label', aria);
      b.appendChild(this.api.el('span', 'cmp-grip'));
      var rect = null, org = null;
      var toModel = function (clientX, clientY) {
        return { x: (clientX - rect.left) / rect.width * self.W, y: (clientY - rect.top) / rect.height * self.H };
      };
      b.addEventListener('pointerdown', function (ev) {
        ev.preventDefault();
        rect = self._bench.getBoundingClientRect();   /* snapshot ONCE */
        if (!rect.width) return;
        var start = toModel(ev.clientX, ev.clientY);
        if (kind === 'off') {
          var n0 = self.beginLift(self.st);
          if (n0) { self.st = n0; self._paint(); }
          org = { x: self.st.dx, y: self.st.dy };
        } else {
          org = { v: self.st[cls === 'cmp-h-a' ? 'a' : 'b'] };
        }
        var move = function (e) {
          var p = toModel(e.clientX, e.clientY);
          if (kind === 'off') {
            var n = self.moveOffcut(self.st, org.x + (p.x - start.x), org.y + (p.y - start.y));
            if (n) { self.st = n; self._paint(); }
          } else if (onVal) {
            onVal(org.v + (p.x - start.x) / self.K);
          }
        };
        var up = function () {
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
          window.removeEventListener('pointercancel', up);
          if (kind === 'off') { var n = self.endDrag(self.st); if (n) { self.st = n; self._paint(); } }
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
      });
      /* ⭐ A TAP IS A COMPLETE GESTURE ON EVERY HANDLE.
         The first version answered a click only on the offcut, so both
         plank handles were DEAD to a click and to Enter/Space — the
         liveness gate scored them 0 of 10 paths in every entitlement
         state. Arrows worked, but a drag-or-arrows-only handle is
         unreachable to a child who taps and to assistive tech that
         clicks. A tap now steps the plank one longer, wrapping at the
         top of the band, which is the same affordance the arrows give
         and is what the label promises. */
      var tap = function () {
        if (kind === 'off') {
          var n = self.cycleOffcut(self.st);
          if (n) { self.st = n; self._paint(); }
          return;
        }
        var which = cls === 'cmp-h-a' ? 'a' : 'b';
        var cur = self.st[which];
        var next = cur >= self.N_MAX ? 1 : cur + 1;
        var m = self.setLen(self.st, which, next);
        if (m) { self.st = m; self._paint(); }
      };
      b.addEventListener('click', function (ev) { ev.preventDefault(); tap(); });
      b.addEventListener('keydown', function (ev) {
        var k = ev.key;
        if (k === 'Enter' || k === ' ' || k === 'Spacebar') {
          ev.preventDefault();
          tap();                      /* ⚠ the gate presses these; so do people */
          return;
        }
        var d = (k === 'ArrowLeft' || k === 'ArrowDown') ? -1 : (k === 'ArrowRight' || k === 'ArrowUp') ? 1 : 0;
        if (!d) return;
        ev.preventDefault();
        if (kind === 'off') {
          var lift = self.st.phase === 'attached' ? self.beginLift(self.st) : self.st;
          if (!lift) return;
          var m = self.moveOffcut(lift, lift.dx + d * self.K, lift.dy + (d > 0 ? self.K : -self.K));
          if (m) { self.st = m; self._paint(); }
        } else if (onVal) {
          onVal(self.st[cls === 'cmp-h-a' ? 'a' : 'b'] + d);
        }
      });
      host.appendChild(b);
      return b;
    },

    /* ---- the repaint: every attribute a pure function of the state -- */
    _paint: function () {
      var api = this.api, s = this._st(this.st), K = this.K;
      var d = this.diffOf(s), role = this.roleOf(s);
      var pa = this.plankGeom(s, 'a'), pb = this.plankGeom(s, 'b');
      var matched = this.matchedGeom(s), oc = this.offcutGeom(s), br = this.bracketSpan(s);
      var set = function (el, at) { var k; for (k in at) if (at.hasOwnProperty(k)) el.setAttribute(k, at[k]); };

      /* a plank draws its MATCHED region only when its own overhang is
         the offcut; otherwise it draws its whole length */
      var aw = (role === 'a') ? matched.w : pa.w;
      var bw = (role === 'b') ? matched.w : pb.w;
      set(this._plankA, { x: pa.x, y: pa.y, width: aw, height: pa.h });
      set(this._plankB, { x: pb.x, y: pb.y, width: bw, height: pb.h });

      this._farLine.setAttribute('x1', this.longRight(s));
      this._farLine.setAttribute('x2', this.longRight(s));

      if (oc) {
        set(this._offcut, { x: oc.x, y: oc.y, width: oc.w, height: oc.h });
        this._offcut.style.display = '';
      } else this._offcut.style.display = 'none';

      /* the hollow: only while the offcut is away from home */
      var away = oc && s.phase !== 'attached';
      if (away) {
        set(this._hollow, { x: this.X0 + K * Math.min(s.a, s.b), y: this.homeY(s), width: K * d, height: this.BAR_H });
        this._hollow.style.display = '';
      } else this._hollow.style.display = 'none';

      /* the seam: where the offcut meets whatever it is butted against */
      if (oc && d) {
        set(this._seam, { x1: oc.x, y1: oc.y, x2: oc.x, y2: oc.y + oc.h });
        this._seam.style.display = (s.phase === 'attached' || s.phase === 'laid') ? '' : 'none';
      } else this._seam.style.display = 'none';

      if (br) {
        var y = this.A_Y + this.BAR_H + 31;
        set(this._brRail, { x1: br.x0, y1: y, x2: br.x1, y2: y });
        set(this._brL, { x1: br.x0, y1: y, x2: br.x0, y2: y + 8 });
        set(this._brR, { x1: br.x1, y1: y, x2: br.x1, y2: y + 8 });
        this._brRail.style.display = this._brL.style.display = this._brR.style.display = '';
      } else this._brRail.style.display = this._brL.style.display = this._brR.style.display = 'none';

      /* the socket, drawn at exactly the tolerance the model docks on */
      if (s.phase === 'free') {
        set(this._socket, { x: this.seatX(s), y: this.seatY(s), width: K * d, height: this.BAR_H });
        this._socket.style.display = '';
      } else this._socket.style.display = 'none';

      /* ⭐ EXACTLY TWO NUMERALS, IN EVERY STATE. Each names its own
         plank's far end, and that x has never moved. */
      this._numA.textContent = String(s.a);
      this._numB.textContent = String(s.b);

      var pct = function (el, x, y) {
        el.style.left = (x / ComparisonPlanks.W * 100) + '%';
        el.style.top = (y / ComparisonPlanks.H * 100) + '%';
      };
      pct(this._numA, this.X0 + K * s.a, this.A_Y - 46);
      pct(this._numB, this.X0 + K * s.b, this.B_Y + this.BAR_H + 46);
      pct(this._hA, this.X0 + K * s.a, this.A_Y + this.BAR_H / 2);
      pct(this._hB, this.X0 + K * s.b, this.B_Y + this.BAR_H / 2);
      /* ONE element, TWO jobs: it is the BRACKET's grip while the piece
         is attached and the PIECE's grip once it is free. It must not
         answer to one name in both. */
      this._hO.setAttribute('aria-label', api.t(s.phase === 'attached' ? 'bracketAria' : 'offcutAria'));
      if (oc) { pct(this._hO, oc.x + oc.w / 2, s.phase === 'attached' ? this.A_Y + this.BAR_H + 35 : oc.y + oc.h / 2); }
      this._hO.style.display = oc ? '' : 'none';

      /* the hint ladder */
      /* ⚠ EVERY AUTHORED STRING MUST BE REACHABLE, and a source scan
         cannot tell "the string exists" from "the string is reached"
         (#39 shipped a key authored in all eleven locales that no branch
         ever asked for). Five hints, five reachable states:
           equal          -> hintSame   (nothing sticks out; say so)
           attached       -> hintTake   (the bracket is the grip)
           lifting/free   -> hintCarry  (and it names the gap)
           laid           -> hintSeated
         and hintSay rides ALONGSIDE hintTake — it is the one string that
         asks the class for the third number, which the tool itself will
         never print. Gate 5 (manufactures a conversation) was carried by
         no string at all until a native panel said so. */
      var key = (s.a === s.b) ? 'hintSame'
        : s.phase === 'laid' ? 'hintSeated'
          : (s.phase === 'attached' || s.phase === 'lifting') ? 'hintTake' : 'hintCarry';
      this._hint.textContent = api.t(key);
      /* the ask, and ONLY where there is something to ask about */
      var asking = (s.a !== s.b && s.phase === 'attached');
      this._hintSay.textContent = asking ? api.t('hintSay') : '';
      this._hintSay.style.display = asking ? '' : 'none';

      this._chipToggle.textContent = api.t(
        s.phase === 'attached' ? 'takeBtn' : (s.phase === 'laid' ? 'putBackBtn' : 'layBtn'));
      this._chipToggle.disabled = (s.a === s.b);
      this._chipToggle.style.visibility = (s.a === s.b) ? 'hidden' : '';
      this._chipNext.textContent = api.t('nextBtn');
      this._chipPrint.textContent = api.t('printBtn');
    },

    /* ⭐ THE SHEET — outlines only, no numerals, at true scale, so the
       child writes the two numbers and draws where the piece goes. */
    _buildSheet: function () {
      var s = this._st(this.st), K = this.K, api = this.api;
      var n = this._sheet === 1 ? 1 : this._sheet === 2 ? 2 : 4;
      var blank = this._sheet === 0;
      this._sheetEl.innerHTML = '';
      this._sheetEl.className = 'cmp-sheet cmp-sheet-' + n;
      for (var i = 0; i < (blank ? 4 : n); i++) {
        var svg = this._svgEl('svg', { viewBox: '0 0 ' + this.W + ' ' + this.H, 'class': 'cmp-sheet-svg' });
        svg.appendChild(this._svgEl('line', { x1: this.X0, y1: this.RULE_TOP, x2: this.X0, y2: this.RULE_BOT, 'class': 'cmp-p-rule' }));
        if (!blank) {
          svg.appendChild(this._svgEl('line', { x1: this.longRight(s), y1: this.RULE_TOP, x2: this.longRight(s), y2: this.RULE_BOT, 'class': 'cmp-p-rule' }));
          svg.appendChild(this._svgEl('rect', { x: this.X0, y: this.A_Y, width: K * s.a, height: this.BAR_H, 'class': 'cmp-p-plank' }));
          svg.appendChild(this._svgEl('rect', { x: this.X0, y: this.B_Y, width: K * s.b, height: this.BAR_H, 'class': 'cmp-p-plank' }));
        }
        this._sheetEl.appendChild(svg);
      }
    },

    _maybeGate: function () { if (!this.premium && this._idx === 0) this._showGate(); },
    _showGate: function () {
      var api = this.api;
      if (!this._wrap || this._wrap.querySelector('.cmp-gate')) return;
      var g = api.el('div', 'cmp-gate');
      var h = api.el('div', ''); h.textContent = api.t('gateTitle');
      var p = api.el('div', ''); p.textContent = api.t('gateBody');
      var a = api.el('a', ''); a.href = '/pricing'; a.textContent = api.t('gateCta');
      g.appendChild(h); g.appendChild(p); g.appendChild(a);
      this._wrap.appendChild(g);
    },
    destroy: function () {
      var i;
      for (i = 0; i < (this._timers || []).length; i++) clearTimeout(this._timers[i]);
      this._timers = [];
      this._wrap = null;
    },
    _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },

    CSS: ''
      + '.cmp-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'
      + '.cmp-bench{position:relative;width:100%;max-width:660px;border-radius:18px;'
      + 'border:2px solid rgba(20,107,94,.28);background-color:#FBF3E4;overflow:hidden;}'
      + '.cmp-svg{display:block;width:100%;height:auto;}'
      /* the two planks: the same material, so the offcut's provenance is
         carried by the fill and never needs a label */
      + '.cmp-plank{fill:#146B5E;}'
      + '.cmp-offcut{fill:#146B5E;}'
      + '.cmp-seam{stroke:rgba(251,243,228,.85);stroke-width:2;}'
      /* ⭐ the hollow — nothing else in this repo leaves a hole */
      + '.cmp-hollow{fill:none;stroke:#146B5E;stroke-width:2;stroke-dasharray:7 6;opacity:.55;}'
      + '.cmp-socket{fill:none;stroke:#F2784B;stroke-width:2;stroke-dasharray:5 5;opacity:.6;}'
      + '.cmp-rule{stroke:rgba(20,107,94,.45);stroke-width:2;}'
      + '.cmp-far{stroke-dasharray:6 5;}'
      /* butt caps, so the drawn bracket's bbox IS its span and the gate's
         width assertion is not off by a stroke width at each end */
      + '.cmp-br{stroke:#0F4A40;stroke-width:3;stroke-linecap:butt;}'
      + '.cmp-num{position:absolute;transform:translate(-50%,-50%);pointer-events:none;'
      + 'font-weight:800;font-size:clamp(19px,4.6vw,30px);line-height:1;font-family:"Baloo 2",Nunito,sans-serif;color:#0F4A40;}'
      /* handles: 44px, fixed, in px — a radius in model units cannot hold
         a floor in pixels (#41 measured 44 model units at 29px) */
      + '.cmp-handle{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;padding:0;'
      + 'border:0;background:transparent;cursor:grab;touch-action:none;display:flex;'
      + 'align-items:center;justify-content:center;border-radius:50%;}'
      + '.cmp-handle:active{cursor:grabbing;}'
      + '.cmp-handle:focus-visible{outline:3px solid #146B5E;outline-offset:-2px;}'
      + '.cmp-grip{display:block;width:18px;height:18px;border-radius:50%;background:#0F4A40;'
      + 'box-shadow:0 0 0 3px rgba(251,243,228,.92);}'
      + '.cmp-h-o .cmp-grip{background:#C8613A;}'
      
      + '.cmp-hint-say{font-weight:700;color:#146B5E;margin-top:-4px;}'
      + '.cmp-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;'
      + 'line-height:1.45;color:#3C6E63;max-width:660px;}'
      + '.cmp-foot{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%;max-width:660px;}'
      + '.cmp-chip{font:600 clamp(.9rem,3.2vw,1.02rem)/1.1 Nunito,sans-serif;padding:11px 18px;'
      + 'min-height:44px;border-radius:14px;border:2px solid #146B5E;background:#FBF3E4;color:#0F4A40;cursor:pointer;}'
      + '.cmp-chip.cmp-go{background:#F2784B;border-color:#F2784B;color:#FFF8EE;}'
      + '.cmp-chip.cmp-lock{border-color:#C8613A;color:#C8613A;}'
      + '.cmp-chip[disabled]{opacity:.45;cursor:default;}'
      + '.cmp-gate{width:100%;max-width:660px;border-radius:16px;border:2px dashed #C8613A;'
      + 'background:#FFF6EE;padding:14px 16px;text-align:center;font-family:Nunito,sans-serif;color:#7A3B21;}'
      + '.cmp-gate a{color:#C8613A;font-weight:700;}'
      /* ⭐⭐ THE SHEET. #40 and #41 each ship a Print chip that calls
         window.print() with NO @media print block at all, so they print
         the whole web page — nav, hints, buttons, footer, the tool at
         screen size. This is what the label promises instead. */
      + '.cmp-sheet{display:none;}'
      + '.cmp-sheet-svg{width:100%;height:auto;break-inside:avoid;}'
      + '.cmp-p-plank{fill:none;stroke:#000;stroke-width:2.5;}'
      + '.cmp-p-rule{stroke:#000;stroke-width:1.5;stroke-dasharray:5 4;}'
      + '@media print{'
      + '  .lcs-header,.lcs-hint,.cmp-hint,.cmp-foot,.cmp-gate,.cmp-bench,.cmp-handle{display:none !important;}'
      + '  .cmp-wrap{gap:0;}'
      + '  .cmp-sheet{display:grid;gap:14mm;width:100%;}'
      + '  .cmp-sheet-1{grid-template-columns:1fr;}'
      + '  .cmp-sheet-2{grid-template-columns:1fr;}'
      + '  .cmp-sheet-4{grid-template-columns:1fr 1fr;}'
      + '  @page{margin:14mm;}'
      + '}'
      + '@media (prefers-reduced-motion:reduce){.cmp-offcut{transition:none;}}'
  };

  if (typeof window !== 'undefined') window.ComparisonPlanks = ComparisonPlanks;
  if (typeof module !== 'undefined' && module.exports) module.exports = ComparisonPlanks;
  if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(ComparisonPlanks);

  /* CSS + render live in the second half of this file, appended by the
     render block below. */
  var cssDone = false;
  function injectComparisonPlanksCSS() {
    if (cssDone) return;
    cssDone = true;
    var el = document.createElement('style');
    el.setAttribute('data-cmp', '1');
    el.textContent = ComparisonPlanks.CSS;
    document.head.appendChild(el);
  }
  ComparisonPlanks._injectCSS = injectComparisonPlanksCSS;
}());
