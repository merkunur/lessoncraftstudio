/* =====================================================================
   TOOL #27 — NUMBER BONDS BOARD   (part-whole-frame.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). Premium Tools v2 build #1, REBUILT 2026-08-05 to the v4 bar.

   The whole-and-two-parts instrument: number bonds (en), splitsen (nl),
   Zerlegen (de). A nest at the top holds the whole; two trays below hold
   the parts; the child carries ONE counter across at a time and watches
   the nest refuse to change.

   THE ONE THESIS — THE WHOLE NEVER CHANGES. Conservation is not asserted
   in copy and not enforced by a check: it is UNREPRESENTABLE. The model
   is {whole, a} and nothing else; part B is `whole - a`, derived on every
   read, with no slot of its own to corrupt. The child's only affordance
   is carry; there is no add and no remove on the child's side.

   ⚠ COLLISION / DIFFERENTIATION — this tool sits in occupied territory
   and the fences are load-bearing. `number-bond-activities.json` ships
   SIX graded activities on `number-bond-core.js`, and Rekenrek is already
   a free-play conserved-total drag manipulative.

     the six numberbond.* activities  |  THIS TOOL
     -------------------------------- | --------------------------------
     a target whole, a given part     | no target, no given
     tap-to-increment ONE empty part  | carry between two co-equal parts
     a `?` unknown node               | the CLOTH is the only unknown, and
                                      | it answers to nothing
     Check, isCorrect(), readOnly lock| nothing to check — every split of
                                      | N is correct BY DEFINITION
     circle-triple bond diagram       | a frame: nest + two trays

     Rekenrek (tool #6)               |  THIS TOOL
     -------------------------------- | --------------------------------
     no numerals (that absence is its | the whole is LABELLED and
     pedagogy); locked to 10/20/…     | teacher-set, any 2-20
     parked-right vs counted-left     | two CO-EQUAL named parts
     an ordinal rod                   | cardinal containers
     one push moves MANY beads        | exactly ONE counter per carry

   0 bytes are read from number-bond-core.js: its `_cssInjected` is a
   singleton on a shared object and its `.nb-` selectors are global, so
   consuming it would risk six shipped activities for no gain.

   ---------------------------------------------------------------------
   THE 2026-08-05 REBUILD — what changed and why, so the next reader does
   not re-derive it.

   ⭐⭐ COLOUR MARKS THE TRAY, NOT THE TOKEN.
   Three expert panels split on two-colour counters. The pedagogue ruled
   two-tone always-on (it is the canonical physical bond manipulative, and
   uniform colour makes the nest a redundant re-count). The designer ruled
   NEVER, on the ground that a counter changing colour mid-flight is a lie
   about conservation. Both are right about their own half. The resolution
   is that colour is a property of PLACE:

     - default `tone:'one'` — one colour everywhere, pure conservation;
     - `tone:'two'` — part A is c1, part B is c2, and the nest renders
       a-many c1 then b-many c2 in ONE unbroken run, no gap, no divider;
     - a carried counter KEEPS ITS ORIGIN COLOUR FOR THE WHOLE FLIGHT and
       crossfades on landing, at the same instant the nest's boundary
       counter crossfades.

   What a class then sees is: the row never got longer or shorter, and
   exactly one counter changed its coat. That is conservation DRAWN, and
   it is the strongest single frame this instrument can show.

   ⚠ AND IT LEAKS THROUGH THE CLOTH IF YOU LET IT. A colour-coded nest
   defeats "how many are hiding" — the class simply counts the teal ones
   up top. So whenever EITHER PART is covered the nest drops to outline
   only and the colour boundary disappears. The cloth's whole job is that
   a number is genuinely not available; a nest that still shows the split
   is not a cloth, it is a hint. `_anyPartCovered()` exists for exactly
   this and for nothing else.

   ⚠ THE SAME LEAK, THROUGH THE EAR AND THROUGH THE SCREEN READER. The
   spoken split and the live-region announcement are SUPPRESSED whenever
   anything is covered. A tool that hides a number and then says it aloud
   has not hidden it. (Pre-rebuild it said it aloud.)

   ⭐ ARRANGEMENT IS PAIRWISE COLUMNS, BANDED AT FIVE — and the reason is
   STABILITY, not aesthetics. `slot(i)` must be a pure function of the
   index alone, so that a carry adds or removes EXACTLY ONE cell and every
   other counter stays where it was. A divisor-derived column count
   (6 -> 3+3, 7 -> 4+3) re-flows the whole tray on every carry, which
   destroys the identity of the moved object — and the moved object is the
   entire lesson. It also kills the FLIP animation, which can only
   interpolate a counter that is still the same counter.
   Pairwise columns additionally make odd/even and doubles visible in the
   material (two equal stacks ARE a double) without a single pixel of
   highlight chrome, and the band boundary at ten puts ten-structure
   exactly where ten-structure is the curriculum and nowhere earlier.
   The old 5-wide row-major wrap drew 6 as five-and-one, which asserts a
   five-structure — Rekenrek's perceptual theory, imported into a tool
   whose own comments disclaim it.

   ⚠ FIVE DEFECTS THE OLD BUILD SHIPPED, EACH INVISIBLE TO EVERY GATE:
     1. `_dragMoved` was reset only inside the tray's click handler, and
        `_carry` -> `render()` -> `stage.innerHTML=''` destroys that tray
        BEFORE the browser dispatches click. So every completed drag-carry
        swallowed the next tap. It is now owned by one code path (`up`),
        released on a macrotask.
     2. The drag ghost was built from the DISH's rect and hard-coded a
        coral circle — a ~158x105px orange ellipse followed the finger
        during the one gesture the tool exists to teach.
     3. `.pwf-legs{width:min(100%,340px)}` never widened while the sheet
        ramped to 1300px, so the connectors MISSED THE TRAYS by ~38px at
        1367 and far more at 2560. Percentages of one box cannot address
        another box: the legs are now MEASURED off the rendered rects.
     4. The two "co-equal" trays were flex items sized by their own
        content (caption text, "2" vs "18", shrink weighting) and were
        therefore different widths in every locale. They are now identical
        BY CONSTRUCTION — same grid template, same dot, same row count.
     5. `.pwf-ways`'s `@media (max-width:899px)` was a VIEWPORT query
        against a card capped at 720px, so the instrument was SMALLER at
        1024 than at 899. It is a container query now.

   ⚠ A CAP ON THE THING YOU ARE RAMPING IS NOT THE ONLY CAP IN THE CHAIN.
   The old build recorded that lesson after ramping the sheet and watching
   620 -> 629 because the PARENT carried its own max-width. The chain is
   deleted rather than walked: `.pwf-sheet{width:fit-content}` sizes to the
   two dishes, and the dishes size to the MEASURED dot ladder. There is no
   cap to forget, because there is no cap.

   ⚠ AND THE LADDER IS MEASURED, NOT DERIVED. A `clamp()` that computes
   the dot from a track width reads elegantly and puts a formula between
   the operator and the thing on screen. The per-tier numbers below were
   measured in the sweep; the sweep is what may change them.

   REFUSES, FOREVER: no right/wrong on any split · no "ways found 3/6" ·
   no timer, score, streak or completion celebration · no auto-arranging
   the found rows behind the teacher's back · the child can never change
   the whole. Any future "check the bond" request is to be refused.
   The pre-drawn empty ways rows are GONE — a wall of 21 dashed boxes is
   the "you missed three" verdict in its most literal possible costume,
   and the old file forbade it in one comment and shipped it in the next.

   THE DIAGRAM IS PER-LOCALE DATA. `DIAGRAM` + `diagramFor(locale)` follow
   letter-studio.js exactly: EVERY LOCALE SHIPS `default` UNTIL ITS NATIVE
   ENSEMBLE RULES. The German Zahlenhaus and the Dutch splitsschema are
   real traditions whose exact geometry exists nowhere in this repo;
   inventing one would look authoritative and be wrong. Renderer-true
   fields only — a field nothing draws is dead data. (`ways:'ladder'` was
   exactly that, and is gone.)

   NUMBER WORDS 0-20 x 11 are a literal table DERIVED FROM the live
   place-value-core.js `_NUMBER_WORD_HELPERS`. verify-part-whole-frame.js
   re-compares all 21 x 11 against the live core on every build, so the
   copy cannot rot silently.

   FREE = the frame, wholes 2-10, all three cloths, numerals, notation,
   voice, every colour scheme and every counter shape. PREMIUM = wholes to
   20, the all-ways record, and the printable. Premium wholes are ABSENT
   from the band chips for free visitors, not merely disabled — and unlike
   the old build, that is now actually true (the option list is mutated,
   not gated on tap).
   ===================================================================== */
var PartWholeFrame = {
  id: 'part-whole-frame',

  /* ⚠ CURATION: en is authored here; the other ten are corrected in place
     by scripts/apply-part-whole-frame-locales.js from the per-locale
     native 3-agent ensembles (§A.13.48). ONE PHYSICAL LINE PER KEY — the
     applier does a surgical single-locale regex swap on that line and dies
     rather than reflow a file the verify gate reads by line.
     sv/da/no/fi carry [NSR-FLAG] until reviewed. */
  strings: {
    title:        {en:'Number Bonds Board',de:'Zahlen zerlegen',fr:'Le tout et les parties',es:'Descomponer números',pt:'Decompor o número',it:'Scomponi il numero',nl:'Splitsen',sv:'Helhet och delar',da:'Helhed og dele',no:'Helhet og deler',fi:'Osat ja kokonaisuus'},
    instruction:  {en:'Tap a tray to send one counter across, and find all the ways to make the same number.',de:'Tippt auf einen Teil: Ein Plättchen wandert hinüber, die Teile ändern sich — das Ganze nie.',fr:'Touchez une partie pour faire passer un jeton — les deux parties changent, et le tout ne change jamais.',es:'Toca una parte para pasar una ficha al otro lado: las partes cambian y el total sigue igual.',pt:'Toque em uma parte para levar uma ficha para o outro lado: as partes mudam e o total continua o mesmo.',it:'Tocca la parte da cui vuoi prendere: un gettone passa di là, e in tutto resta sempre lo stesso numero.',nl:'Tik op een deel om één fiche naar de andere kant te schuiven: elke keer een nieuw paar — en altijd hetzelfde geheel.',sv:'Tryck på en del för att skicka över en bricka — och leta upp alla uppdelningar av samma tal.',da:'Tryk på en del for at sende en brik over — og find alle de måder, det samme tal kan deles op på.',no:'Trykk på en del for å sende en brikke over — og finn alle måtene det samme tallet kan deles opp på.',fi:'Napauta osaa, niin yksi nappula siirtyy toiselle puolelle — ja etsi kaikki tavat jakaa sama luku.'},
    wholeLabel:   {en:'The whole',de:'Das Ganze',fr:'Le tout',es:'El total',pt:'O total',it:'In tutto',nl:'Het geheel',sv:'Det hela',da:'Det hele',no:'Det hele',fi:'Kokonaisuus'},
    partOne:      {en:'The left part',de:'Der linke Teil',fr:'La partie de gauche',es:'La parte de la izquierda',pt:'A parte da esquerda',it:'La parte di sinistra',nl:'Het linkerdeel',sv:'Den vänstra delen',da:'Den venstre del',no:'Den venstre delen',fi:'Vasen osa'},
    partTwo:      {en:'The right part',de:'Der rechte Teil',fr:'La partie de droite',es:'La parte de la derecha',pt:'A parte da direita',it:'La parte di destra',nl:'Het rechterdeel',sv:'Den högra delen',da:'Den højre del',no:'Den høyre delen',fi:'Oikea osa'},
    moreWhole:    {en:'Add one to the whole',de:'Das Ganze um eins vergrößern',fr:'Ajouter un jeton au tout',es:'Añadir uno al total',pt:'Acrescentar um ao total',it:'Aggiungi uno in tutto',nl:'Eén meer in het geheel',sv:'Öka det hela med ett',da:'Læg én til det hele',no:'Legg én til i det hele',fi:'Lisää yksi kokonaisuuteen'},
    fewerWhole:   {en:'Take one off the whole',de:'Das Ganze um eins verkleinern',fr:'Enlever un jeton au tout',es:'Quitar uno del total',pt:'Tirar um do total',it:'Togli uno in tutto',nl:'Eén minder in het geheel',sv:'Minska det hela med ett',da:'Tag én fra det hele',no:'Ta én bort fra det hele',fi:'Poista yksi kokonaisuudesta'},
    coverWhole:   {en:'Put the cloth over the whole',de:'Das Tuch über das Ganze legen',fr:'Poser le voile sur le tout',es:'Tapar el total',pt:'Cobrir o total com o pano',it:'Metti il panno sul totale',nl:'De doek over het geheel leggen',sv:'Täck över det hela',da:'Dæk det hele til',no:'Dekk til det hele',fi:'Peitä kokonaisuus liinalla'},
    uncoverWhole: {en:'Take the cloth off the whole',de:'Das Tuch vom Ganzen nehmen',fr:'Retirer le voile qui couvre le tout',es:'Destapar el total',pt:'Tirar o pano do total',it:'Togli il panno dal totale',nl:'De doek van het geheel halen',sv:'Visa det hela igen',da:'Vis det hele igen',no:'Vis det hele igjen',fi:'Nosta liina kokonaisuuden päältä'},
    coverOne:     {en:'Put the cloth over the left part',de:'Das Tuch über den linken Teil legen',fr:'Poser le voile sur la partie de gauche',es:'Tapar la parte de la izquierda',pt:'Cobrir a parte da esquerda com o pano',it:'Metti il panno sulla parte di sinistra',nl:'De doek over het linkerdeel leggen',sv:'Täck över den vänstra delen',da:'Dæk den venstre del til',no:'Dekk til den venstre delen',fi:'Peitä vasen osa liinalla'},
    uncoverOne:   {en:'Take the cloth off the left part',de:'Das Tuch vom linken Teil nehmen',fr:'Retirer le voile qui couvre la partie de gauche',es:'Destapar la parte de la izquierda',pt:'Tirar o pano da parte da esquerda',it:'Togli il panno dalla parte di sinistra',nl:'De doek van het linkerdeel halen',sv:'Visa den vänstra delen igen',da:'Vis den venstre del igen',no:'Vis den venstre delen igjen',fi:'Nosta liina vasemman osan päältä'},
    coverTwo:     {en:'Put the cloth over the right part',de:'Das Tuch über den rechten Teil legen',fr:'Poser le voile sur la partie de droite',es:'Tapar la parte de la derecha',pt:'Cobrir a parte da direita com o pano',it:'Metti il panno sulla parte di destra',nl:'De doek over het rechterdeel leggen',sv:'Täck över den högra delen',da:'Dæk den højre del til',no:'Dekk til den høyre delen',fi:'Peitä oikea osa liinalla'},
    uncoverTwo:   {en:'Take the cloth off the right part',de:'Das Tuch vom rechten Teil nehmen',fr:'Retirer le voile qui couvre la partie de droite',es:'Destapar la parte de la derecha',pt:'Tirar o pano da parte da direita',it:'Togli il panno dalla parte di destra',nl:'De doek van het rechterdeel halen',sv:'Visa den högra delen igen',da:'Vis den højre del igen',no:'Vis den høyre delen igjen',fi:'Nosta liina oikean osan päältä'},
    carryAria:    {en:'Send one across from here',de:'Von hier ein Plättchen hinübertragen',fr:'Faire passer un jeton depuis ici',es:'Pasar una ficha desde aquí',pt:'Levar uma ficha daqui',it:'Sposta un gettone da qui',nl:'Eén fiche hiervandaan overzetten',sv:'Skicka över en bricka härifrån',da:'Send en brik over herfra',no:'Send en brikke over herfra',fi:'Siirrä täältä yksi nappula toiselle puolelle'},
    splitFrame:   {en:'{whole} is {a} and {b}',de:'{whole} ist {a} und {b}',fr:'{whole}, c’est {a} et {b}',es:'{whole} son {a} y {b}',pt:'{whole} é {a} e {b}',it:'{whole} è {a} e {b}',nl:'{whole} is {a} en {b}',sv:'{whole} är {a} och {b}',da:'{whole} er {a} og {b}',no:'{whole} er {a} og {b}',fi:'{whole} on {a} ja {b}'},
    allWays:      {en:'All the ways',de:'Alle Zerlegungen',fr:'Toutes les décompositions',es:'Todas las descomposiciones',pt:'Todas as decomposições',it:'Tutte le scomposizioni',nl:'Alle splitsingen',sv:'Alla uppdelningar',da:'Alle opdelinger',no:'Alle oppdelinger',fi:'Kaikki hajotelmat'},
    waysHint:     {en:'Every way you find for this number is added here.',de:'Jede Zerlegung dieser Zahl, die ihr findet, kommt hier dazu.',fr:'Chaque décomposition de ce nombre vient s’inscrire ici.',es:'Cada descomposición de este número se anota aquí.',pt:'Cada decomposição deste número aparece aqui.',it:'Ogni scomposizione di questo numero compare qui.',nl:'Elke splitsing van dit getal die jullie vinden, komt hier te staan.',sv:'Varje uppdelning av det här talet skrivs upp här.',da:'Hver opdeling af dette tal bliver skrevet op her.',no:'Hver oppdeling av dette tallet blir skrevet opp her.',fi:'Jokainen tämän luvun hajotelma kirjataan tähän.'},
    orderWays:    {en:'Order of the list',de:'Reihenfolge der Liste',fr:'Ordre de la liste',es:'Orden de la lista',pt:'Ordem da lista',it:'Ordine della lista',nl:'Volgorde van de lijst',sv:'Listans ordning',da:'Listens rækkefølge',no:'Rekkefølgen i lista',fi:'Listan järjestys'},
    useWay:       {en:'Go back to this split',de:'Zurück zu dieser Zerlegung',fr:'Revenir à cette décomposition',es:'Volver a esta descomposición',pt:'Voltar para esta decomposição',it:'Torna a questa scomposizione',nl:'Terug naar deze splitsing',sv:'Tillbaka till den här uppdelningen',da:'Tilbage til denne opdeling',no:'Tilbake til denne oppdelingen',fi:'Takaisin tähän hajotelmaan'},
    todaysWhole:  {en:'The number',de:'Die Zahl',fr:'Le nombre',es:'El número',pt:'O número',it:'Il numero',nl:'Het getal',sv:'Talet',da:'Tallet',no:'Tallet',fi:'Luku'},
    setWholeTo:   {en:'Set the number to {n}',de:'Die Zahl auf {n} setzen',fr:'Mettre le nombre à {n}',es:'Poner el número en {n}',pt:'Mudar o número para {n}',it:'Porta il numero a {n}',nl:'Het getal op {n} zetten',sv:'Ställ talet på {n}',da:'Sæt tallet til {n}',no:'Sett tallet til {n}',fi:'Aseta luvuksi {n}'},
    printBtn:     {en:'Print',de:'Drucken',fr:'Imprimer',es:'Imprimir',pt:'Imprimir',it:'Stampa',nl:'Afdrukken',sv:'Skriv ut',da:'Udskriv',no:'Skriv ut',fi:'Tulosta'},
    resetBtn:     {en:'Start again',de:'Neu beginnen',fr:'Recommencer',es:'Empezar de nuevo',pt:'Começar de novo',it:'Ricomincia',nl:'Opnieuw beginnen',sv:'Börja om',da:'Start forfra',no:'Start på nytt',fi:'Aloita alusta'},
    matTitle:     {en:'Share these counters between the two parts',de:'Verteilt diese Plättchen auf die beiden Teile',fr:'Répartissez ces jetons entre les deux parties',es:'Reparte estas fichas entre las dos partes',pt:'Divida estas fichas entre as duas partes',it:'Dividi questi gettoni tra le due parti',nl:'Verdeel deze fiches over de twee delen',sv:'Fördela brickorna på de två delarna',da:'Fordel brikkerne på de to dele',no:'Fordel brikkene på de to delene',fi:'Jaa nappulat kahteen osaan'},
    waysTitle:    {en:'The ways we found',de:'Unsere Zerlegungen',fr:'Les décompositions que nous avons trouvées',es:'Las descomposiciones que encontramos',pt:'As decomposições que encontramos',it:'Le scomposizioni che abbiamo trovato',nl:'De splitsingen die we gevonden hebben',sv:'Uppdelningarna vi hittade',da:'De opdelinger, vi fandt',no:'Oppdelingene vi fant',fi:'Löytämämme hajotelmat'},
    setBand:      {en:'Numbers up to',de:'Zahlenraum bis',fr:'Nombres jusqu’à',es:'Números hasta',pt:'Números até',it:'Numeri fino a',nl:'Getallen tot',sv:'Tal upp till',da:'Tal op til',no:'Tall opp til',fi:'Luvut enintään'},
    setNumerals:  {en:'Show the counts',de:'Anzahlen anzeigen',fr:'Afficher les quantités',es:'Mostrar las cantidades',pt:'Mostrar as quantidades',it:'Mostra le quantità',nl:'Aantallen tonen',sv:'Visa antalen',da:'Vis antallene',no:'Vis antallene',fi:'Näytä lukumäärät'},
    setNotation:  {en:'Written form',de:'Schreibweise',fr:'L’écriture du calcul',es:'Forma escrita',pt:'Forma escrita',it:'Forma scritta',nl:'Schrijfwijze',sv:'Skriven form',da:'Skrevet form',no:'Skrevet form',fi:'Kirjoitettu muoto'},
    notationOff:  {en:'None',de:'Keine',fr:'Aucune',es:'Ninguna',pt:'Nenhuma',it:'Nessuna',nl:'Zonder som',sv:'Ingen',da:'Intet',no:'Ingen',fi:'Ei lainkaan'},
    notationSum:  {en:'One number sentence',de:'Eine Rechnung',fr:'Une égalité',es:'Una igualdad',pt:'Uma igualdade',it:'Una sola uguaglianza',nl:'Eén som',sv:'En likhet',da:'Ét regnestykke',no:'Ett regnestykke',fi:'Yksi lasku'},
    notationFam:  {en:'All four facts',de:'Alle vier',fr:'Les quatre égalités',es:'Las cuatro',pt:'Todas as quatro',it:'Tutte e quattro',nl:'Alle vier de sommen',sv:'Alla fyra',da:'Alle fire',no:'Alle fire',fi:'Kaikki neljä'},
    setScheme:    {en:'Counter colours',de:'Plättchenfarben',fr:'Couleurs des jetons',es:'Colores de las fichas',pt:'Cores das fichas',it:'Colori dei gettoni',nl:'Kleuren van de fiches',sv:'Brickornas färger',da:'Brikkernes farver',no:'Fargene på brikkene',fi:'Nappuloiden värit'},
    setShape:     {en:'Counter shape',de:'Plättchenform',fr:'Forme des jetons',es:'Forma de las fichas',pt:'Forma das fichas',it:'Forma dei gettoni',nl:'Vorm van de fiches',sv:'Brickornas form',da:'Brikkernes form',no:'Formen på brikkene',fi:'Nappuloiden muoto'},
    shapeDisc:    {en:'Circle',de:'Kreis',fr:'Rond',es:'Círculo',pt:'Círculo',it:'Cerchio',nl:'Rond',sv:'Cirkel',da:'Cirkel',no:'Sirkel',fi:'Ympyrä'},
    shapeTile:    {en:'Square',de:'Quadrat',fr:'Carré',es:'Cuadrado',pt:'Quadrado',it:'Quadrato',nl:'Vierkant',sv:'Fyrkant',da:'Firkant',no:'Firkant',fi:'Neliö'},
    shapeHeart:   {en:'Heart',de:'Herz',fr:'Cœur',es:'Corazón',pt:'Coração',it:'Cuore',nl:'Hart',sv:'Hjärta',da:'Hjerte',no:'Hjerte',fi:'Sydän'},
    shapeStar:    {en:'Star',de:'Stern',fr:'Étoile',es:'Estrella',pt:'Estrela',it:'Stella',nl:'Ster',sv:'Stjärna',da:'Stjerne',no:'Stjerne',fi:'Tähti'},
    setTone:      {en:'Colours for the parts',de:'Farben für die Teile',fr:'Couleurs des deux parties',es:'Colores para las partes',pt:'Cores das partes',it:'Colori delle parti',nl:'Kleuren voor de delen',sv:'Färger för delarna',da:'Farver til delene',no:'Farger til delene',fi:'Osien värit'},
    toneOne:      {en:'One colour',de:'Eine Farbe',fr:'Une seule couleur',es:'Un color',pt:'Uma cor só',it:'Un solo colore',nl:'Eén kleur',sv:'En färg',da:'Én farve',no:'Én farge',fi:'Yksi väri'},
    toneTwo:      {en:'One for each part',de:'Je eine pro Teil',fr:'Une couleur par partie',es:'Uno para cada parte',pt:'Uma para cada parte',it:'Uno per ogni parte',nl:'Eén per deel',sv:'En för varje del',da:'Én til hver del',no:'Én til hver del',fi:'Oma väri kummallekin osalle'},
    setVoice:     {en:'Say the split aloud',de:'Zerlegung ansagen',fr:'Dire la décomposition à voix haute',es:'Decir la descomposición en voz alta',pt:'Dizer a decomposição em voz alta',it:'Leggi la scomposizione ad alta voce',nl:'De splitsing hardop zeggen',sv:'Läs upp uppdelningen',da:'Læs opdelingen højt',no:'Les oppdelingen høyt',fi:'Lue hajotelma ääneen'},
    gateBand:     {en:'Numbers past ten are part of the Teacher plan.',de:'Zahlen über zehn gehören zum Lehrkraft-Abo — der Zahlenraum bis zehn bleibt immer kostenlos.',fr:'Les nombres au-delà de dix font partie de l’offre Enseignant.',es:'Los números mayores que diez son parte del plan Docente.',pt:'Os números acima de dez fazem parte do plano Professor.',it:'I numeri oltre il dieci fanno parte del piano Insegnante.',nl:'Getallen boven tien horen bij het Leerkracht-abonnement.',sv:'Tal över tio ingår i Premium.',da:'Tal over ti er en del af Premium.',no:'Tall over ti er en del av Premium.',fi:'Kymmentä suuremmat luvut kuuluvat Premiumiin.'},
    gateWays:     {en:'The record of every way is part of the Teacher plan.',de:'Die Übersicht aller Zerlegungen gehört zum Lehrkraft-Abo.',fr:'Le relevé des décompositions fait partie de l’offre Enseignant.',es:'El registro de todas las descomposiciones es parte del plan Docente.',pt:'O registro de todas as decomposições faz parte do plano Professor.',it:'Il registro di tutte le scomposizioni fa parte del piano Insegnante.',nl:'Het overzicht van alle splitsingen hoort bij het Leerkracht-abonnement.',sv:'Sammanställningen av alla uppdelningar ingår i Premium.',da:'Oversigten over alle opdelinger er en del af Premium.',no:'Oversikten over alle oppdelinger er en del av Premium.',fi:'Kaikkien hajotelmien kooste kuuluu Premiumiin.'},
    gatePrint:    {en:'Printing is part of the Teacher plan.',de:'Das Ausdrucken gehört zum Lehrkraft-Abo.',fr:'L’impression fait partie de l’offre Enseignant.',es:'La impresión es parte del plan Docente.',pt:'A impressão faz parte do plano Professor.',it:'La stampa fa parte del piano Insegnante.',nl:'Afdrukken hoort bij het Leerkracht-abonnement.',sv:'Utskrift ingår i Premium.',da:'Udskrivning er en del af Premium.',no:'Utskrift er en del av Premium.',fi:'Tulostus kuuluu Premiumiin.'},
    unlock:       {en:'See the Teacher plan',de:'Zum Lehrkraft-Abo',fr:'Voir l’offre Enseignant',es:'Ver el plan Docente',pt:'Ver o plano Professor',it:'Vedi il piano Insegnante',nl:'Bekijk het Leerkracht-abonnement',sv:'Se Premium',da:'Se Premium',no:'Se Premium',fi:'Katso Premium'}
  },

  /* =================================================================
     THE DIAGRAM — per-locale classroom convention.

     EVERY LOCALE SHIPS 'default' UNTIL ITS NATIVE ENSEMBLE RULES.
     Renderer-true fields ONLY: system, layout, legs. `legs` are x
     fractions OF THE NEST, resolved against MEASURED rects (see
     _layoutLegs) — never percentages of a differently-sized box, which
     is exactly how the old build's connectors came to miss the trays.
     ================================================================= */
  DIAGRAM: {
    'default': { system: 'bond', layout: 'whole-above', legs: [50, 50] }
  },
  diagramFor: function (locale) { return this.DIAGRAM[locale] || this.DIAGRAM['default']; },

  /* =================================================================
     COLOUR SCHEMES — chosen as a PAIR, never as two independent
     pickers. Two pickers permit red-vs-green (the worst possible axis
     for colour-vision deficiency) and permit the same colour twice,
     which silently destroys the two-tone representation.

     Every pair must differ in LIGHTNESS, not only in hue, so the nest
     survives deuteranopia and greyscale without shape double-coding.
     dL is CIE L* separation; gcr is the greyscale contrast ratio.
     Both are re-measured from these hexes by the verify gate — the
     numbers below are documentation, the gate is the authority.

     `bwx` is a border-width multiplier for members whose FILL is
     lighter than the tray: their legibility is carried entirely by the
     edge, so the edge gets thicker rather than the fill getting darker.
     ================================================================= */
  SCHEMES: [
    { key: 'coral-ink',   c1: { fill: '#F2784B', lit: '#F8956E', shade: '#DF6435', edge: '#C2562F', edgeSm: '#A8481F' },
                          c2: { fill: '#1F4E79', lit: '#2E6797', shade: '#17405F', edge: '#14385A', edgeSm: '#0D2A45' } },
    { key: 'violet-amber',c1: { fill: '#5B4B8A', lit: '#7160A6', shade: '#4A3C74', edge: '#3C2F63', edgeSm: '#2C2149' },
                          c2: { fill: '#E8B33C', lit: '#F2C55E', shade: '#D19B26', edge: '#A8761A', edgeSm: '#8B6012', bwx: 1.3 } },
    { key: 'ink-bone',    c1: { fill: '#2A2A35', lit: '#3B3B49', shade: '#1E1E27', edge: '#14141C', edgeSm: '#0A0A11' },
                          c2: { fill: '#C9B79A', lit: '#DCCCB2', shade: '#B5A184', edge: '#6E5B41', edgeSm: '#55442E', bwx: 1.3 } }
  ],

  /* The drawer swatch shows the PAIR, not one colour — the shell's
     `type:'color'` field assigns the option value straight to
     `style.background`, and background accepts a gradient. So the option
     VALUE is the gradient and `schemeFor()` resolves it back. */
  schemeValue: function (s) {
    return 'linear-gradient(90deg,' + s.c1.fill + ' 0 50%,' + s.c2.fill + ' 50% 100%)';
  },

  /* TOTAL: any unknown value resolves to the first scheme. `st || X`
     would catch null and 0 and hand undefined straight through. */
  schemeFor: function (val) {
    for (var i = 0; i < this.SCHEMES.length; i++) {
      if (this.SCHEMES[i].key === val || this.schemeValue(this.SCHEMES[i]) === val) return this.SCHEMES[i];
    }
    return this.SCHEMES[0];
  },

  SHAPES: ['disc', 'tile', 'heart', 'star'],
  shapeFor: function (val) { return this.SHAPES.indexOf(val) === -1 ? this.SHAPES[0] : val; },

  NOTATIONS: ['off', 'sum', 'family'],
  notationFor: function (val) {
    /* the v1 store held a boolean here; true meant the single sum */
    if (val === true) return 'sum';
    if (val === false) return 'off';
    return this.NOTATIONS.indexOf(val) === -1 ? 'off' : val;
  },

  TONES: ['one', 'two'],
  toneFor: function (val) { return this.TONES.indexOf(val) === -1 ? this.TONES[0] : val; },

  /* Number words 0-20 x 11 — DERIVED from the live place-value-core.js
     `_NUMBER_WORD_HELPERS.<loc>(n,'cardinal')` and kept honest by the
     drift gate in verify-part-whole-frame.js. Do not hand-edit: fix the
     core, re-derive, re-run the gate. */
  NUM_WORDS: {
    en: ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'],
    de: ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn','zwanzig'],
    fr: ['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf','vingt'],
    it: ['zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove','dieci','undici','dodici','tredici','quattordici','quindici','sedici','diciassette','diciotto','diciannove','venti'],
    es: ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte'],
    pt: ['zero','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove','vinte'],
    nl: ['nul','een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf','dertien','veertien','vijftien','zestien','zeventien','achttien','negentien','twintig'],
    sv: ['noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio','tio','elva','tolv','tretton','fjorton','femton','sexton','sjutton','arton','nitton','tjugo'],
    da: ['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tyve'],
    no: ['null','én','to','tre','fire','fem','seks','sju','åtte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tjue'],
    fi: ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä'],
  },

  STORE_KEY: 'lcs:part-whole-frame:v2',
  ENT_TRUST_DAYS: 14,

  MIN_WHOLE: 2,
  FREE_MAX_WHOLE: 10,
  MAX_WHOLE: 20,
  COLS: 5,

  /* the numbers a teacher actually reaches for; pure numerals, so they
     carry no translation debt and are legal on a no-words apparatus */
  QUICK_FREE: [5, 10],
  QUICK_PREMIUM: [5, 10, 20],

  defaults: { band: '10', tone: 'one', scheme: 'coral-ink', shape: 'disc', numerals: true, notation: 'off', voice: true },
  settings: [
    { key: 'band', type: 'choice', labelKey: 'setBand', options: ['10', '20'] },
    { key: 'tone', type: 'choice', labelKey: 'setTone', options: [{ value: 'one', labelKey: 'toneOne' }, { value: 'two', labelKey: 'toneTwo' }] },
    { key: 'scheme', type: 'color', labelKey: 'setScheme', options: [] },
    { key: 'shape', type: 'choice', labelKey: 'setShape', options: [
      { value: 'disc', labelKey: 'shapeDisc' }, { value: 'tile', labelKey: 'shapeTile' },
      { value: 'heart', labelKey: 'shapeHeart' }, { value: 'star', labelKey: 'shapeStar' }] },
    { key: 'numerals', type: 'toggle', labelKey: 'setNumerals' },
    { key: 'notation', type: 'choice', labelKey: 'setNotation', options: [
      { value: 'off', labelKey: 'notationOff' }, { value: 'sum', labelKey: 'notationSum' },
      { value: 'family', labelKey: 'notationFam' }] },
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' }
  ],

  premium: false,

  /* =================================================================
     PURE ENGINE — no DOM, no storage, no api. Everything below is a
     function of {whole, a}; part B is derived on every read and has no
     slot of its own, so the parts CANNOT fail to sum to the whole.
     ================================================================= */
  newFrame: function (whole, a) {
    var w = this.clampWhole(whole);
    var pa = (typeof a === 'number') ? a : Math.floor(w / 2);
    return { whole: w, a: Math.max(0, Math.min(w, pa)) };
  },

  clampWhole: function (n) {
    n = Math.round(Number(n) || 0);
    if (n < this.MIN_WHOLE) return this.MIN_WHOLE;
    if (n > this.MAX_WHOLE) return this.MAX_WHOLE;
    return n;
  },

  /* the ONLY reader of part two. Never stored. */
  partB: function (f) { return f.whole - f.a; },

  /* carry exactly one counter. dir 'toB' takes one out of part one.
     Immutable; a no-op at either bound rather than a wrap or an error. */
  carry: function (f, dir) {
    var next = dir === 'toB' ? f.a - 1 : f.a + 1;
    if (next < 0 || next > f.whole) return { whole: f.whole, a: f.a };
    return { whole: f.whole, a: next };
  },

  /* the teacher's move. `a` is clamped, never scaled: growing the whole
     drops the new counter into part two, which is why the nest and a tray
     change together and the invariant never breaks mid-change. */
  setWhole: function (f, n) {
    var w = this.clampWhole(n);
    return { whole: w, a: Math.max(0, Math.min(w, f.a)) };
  },

  splitKey: function (f) { return f.a + '+' + this.partB(f); },

  /* append if new; preserves discovery order — never sorted into the
     canonical staircase, because the child's route through the splits is
     theirs and re-ordering it silently corrects them. The teacher may
     order the VIEW; `this.ways` itself is never re-written. */
  recordSplit: function (list, f) {
    var k = this.splitKey(f);
    for (var i = 0; i < list.length; i++) if (list[i] === k) return list;
    return list.concat([k]);
  },

  /* the ordered VIEW. A copy, always — sorting the argument in place
     would make the teacher's display toggle a destructive edit of the
     child's record. */
  orderedWays: function (list) {
    return list.slice().sort(function (x, y) { return parseInt(x, 10) - parseInt(y, 10); });
  },

  /* ⭐ THE ARRANGEMENT — READING ORDER, IN A GRID HALF THE WHOLE WIDE.
     A pure function of (index, whole), so within a carry — where the whole
     cannot change — it is a function of the index alone, and a carry
     therefore adds or removes EXACTLY ONE cell while every other counter
     stays where it was. That stability is what makes the moved counter the
     same object, and the moved counter is the entire lesson; it is also
     the precondition for the FLIP animation, which can only interpolate a
     counter that has not been re-flowed out from under it.

       n=6,  3 wide -> 3 and 3 ........ a double is one full row each
       n=7,  4 wide -> 4 and 3 ........ odd leaves a visible gap
       n=10, 5 wide -> 5 and 5 ........ ten-structure, exactly at ten
       n=20, 5 wide -> four rows of 5 .. and only then a second ten

     ⚠ IT WAS COLUMN-MAJOR PAIRS FIRST, and the render is what refuted
     that. Pairs down each column give the same stability and arguably a
     better odd/even read — but they put the two-tone boundary on a
     DIAGONAL, so the nest showed coral,coral,ink over coral,ink,ink. The
     whole two-tone design rests on the nest being ONE UNBROKEN RUN whose
     length never changes while exactly one counter changes coat, and a
     diagonal is not a run. Reading order restores it, and it makes a
     double read as one whole row of each colour, which is a better
     picture than the pairs were.
     ⚠ The grid is half the whole wide, never a fixed five: a tray must
     hold every counter (one part can BE the whole) and no more, and a
     whole of six drawn in five columns sat against the left edge with two
     empty columns beside it, which reads as a bug rather than a quantity. */
  slot: function (i, whole) {
    var c = this.colsFor(whole);
    return { col: (i % c) + 1, row: Math.floor(i / c) + 1 };
  },

  /* how many grid rows and columns the containers reserve. Fixed by the
     WHOLE, not by the count in any one container, so all three are
     identical and covering one can never change its height.

     ⚠ COLUMNS ARE DERIVED, NOT FIXED AT FIVE. A tray must be able to hold
     every counter (one part can be the whole), and no more: a whole of 6
     needs three columns, and declaring five drew three counters hard
     against the left edge of a tray with two empty columns beside them,
     which reads as a bug rather than as a quantity. Five is the ceiling
     because ten is where the second band starts. */
  colsFor: function (whole) {
    var w = this.clampWhole(whole);
    return Math.max(1, Math.min(this.COLS, Math.ceil(Math.min(w, 10) / 2)));
  },
  rowsFor: function (whole) {
    var w = this.clampWhole(whole);
    return Math.max(2, Math.ceil(w / this.colsFor(w)));
  },

  /* teacher-facing tags only — never rendered on the stage, never used
     to light anything up. A board that celebrates reaching 3+3 has
     started grading, and every split of N is correct by definition. */
  familiesFor: function (f) {
    var out = [], b = this.partB(f);
    if (f.a === b) out.push('doubles');
    if (Math.abs(f.a - b) === 1) out.push('near-doubles');
    if (f.whole === 10) out.push('ten-friends');
    return out;
  },

  numberWord: function (n, lang) {
    var t = this.NUM_WORDS[lang] || this.NUM_WORDS.en;
    return (n >= 0 && n < t.length) ? t[n] : String(n);
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectPartWholeFrameCSS();
    document.body.classList.add('pwf-wide');
    /* ⚠ GATING THE CHIP IS NOT GATING THE FEATURE — the recorded
       fraction-kitchen defect, back. The printed pages are built only for a
       subscriber, but the print stylesheet hid the whole screen
       unconditionally, so a free visitor pressing Ctrl+P got a blank sheet:
       no board, no mat, nothing. Measured in both tiers before fixing. The
       print rules are scoped to this class, so an unentitled Ctrl+P prints
       the board it can actually see. */
    document.body.classList.toggle('pwf-paid', !!this.premium);

    /* the scheme options are data, and the drawer is built lazily by the
       shell on first open — so filling them here is enough */
    /* ⚠⚠ THE OPTION VALUE MUST BE THE GRADIENT ITSELF, and this line
       shipped the KEY. `lcs-shell.js` renders a `type:'color'` chip as
       `sw.style.background = val`, so it was assigning the string
       'coral-ink' — not a colour — and all three swatches rendered EMPTY,
       in both entitlement states. The operator asked for a choice of
       counter colour, and it shipped as three blank chips.
       The comment on `schemeValue()` has said "the option VALUE is the
       gradient and schemeFor() resolves it back" since it was written, and
       nothing ever called `schemeValue()` to build the options — it was
       reachable only from inside `schemeFor`. A helper the renderer never
       calls is worth nothing: the same defect as the arrangement the
       renderer ignored, in a different room. FOUR native panels read the
       model and all four found it; no gate here could, because local-test
       set the setting programmatically and never opened the drawer.
       ⚠ AND THE STORED VALUE HAS TO MOVE WITH IT — the shell marks a chip
       checked with `settings[key] === val`, so normalising to `.key` below
       would leave no chip ever selected. */
    var self0 = this;
    this.settings[2].options = this.SCHEMES.map(function (sc) { return self0.schemeValue(sc); });

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    /* coerce anything the v1 store or a hand-edited localStorage could
       hold. Totality here is why the renderer never has to branch. */
    api.settings.tone = this.toneFor(api.settings.tone);
    api.settings.shape = this.shapeFor(api.settings.shape);
    api.settings.notation = this.notationFor(api.settings.notation);
    api.settings.scheme = this.schemeValue(this.schemeFor(api.settings.scheme));

    /* an optimistic pre-paint from the cached verdict, so a subscriber
       never sees a flash of the locked band (the heart-words idiom) */
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this._applyBandOptions();

    this.frame = this.newFrame(this._todaysWhole());
    /* ⚠ SEED THE RECORD WITH THE OPENING SPLIT. The old build recorded
       only inside _carry, so the board showed 5+5 while the record sat
       empty under a hint promising it was written down. */
    this.ways = this.recordSplit([], this.frame);
    this.covers = { whole: false, a: false, b: false };
    this.waysOrdered = false;
    this._drag = null;
    this._timers = [];
    this._flip = null;
    this._nudged = !!this._store.seenNudge;

    this._fetchEntitlement();
    this.render();

    /* legs are MEASURED off the rendered rects, so they must be recomputed
       whenever the stage resizes. The stage is the shell's and survives
       every render of ours; the wrap does not. */
    var self = this;
    if (typeof ResizeObserver === 'function') {
      try {
        this._ro = new ResizeObserver(function () { self._layoutLegs(); });
        this._ro.observe(api.stage);
      } catch (_) {}
    }
  },

  destroy: function () {
    this._clearTimers();
    if (this._ro) { try { this._ro.disconnect(); } catch (_) {} this._ro = null; }
  },
  _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  /* ⚠ NUMERIC day key. A 'Y-M-D' string is NOT comparable without zero
     padding ('2026-7-9' > '2026-7-10' is true) — the recorded date-key
     trap. Numeric, and compared only for equality. */
  _dayKey: function () {
    var d = new Date();
    return d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
  },

  /* Today's number: a deterministic rotation over the band the teacher
     ACTUALLY HAS, so the ritual is honest for the people who paid for the
     wider one. (The old build rotated over the free band forever.) */
  _todaysWhole: function () {
    var max = this._maxWhole();
    var span = max - this.MIN_WHOLE + 1;
    return this.MIN_WHOLE + (this._dayKey() % span);
  },

  _maxWhole: function () {
    var band = parseInt(this.api.settings.band, 10) || 10;
    if (!this.premium) return this.FREE_MAX_WHOLE;
    return Math.min(band, this.MAX_WHOLE);
  },

  /* ⚠ ABSENT, NOT DISABLED. The old build shipped a static options array
     and gated on tap, so a free visitor saw a 20 chip, tapped it, got an
     upsell — and the drawer then showed 20 selected while the model said
     10, because onSettings rewrote the value and never repainted. */
  _applyBandOptions: function () {
    this.settings[0].options = this.premium ? ['10', '20'] : ['10'];
  },

  _quickWholes: function () { return this.premium ? this.QUICK_PREMIUM : this.QUICK_FREE; },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },

  _saveStore: function () {
    var s = this._store || {};
    s.v = 2;
    s.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      s.settings[key] = this.api.settings[key];
    }
    s.seenNudge = !!this._nudged;
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
    this._store = s;
  },

  _fetchEntitlement: function () {
    var self = this;
    var tok = null;
    try { tok = localStorage.getItem('accessToken'); } catch (_) {}
    if (!tok) return;
    try {
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + tok } })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var tier = d && d.user && d.user.subscriptionTier;
          var sub = d && d.subscription;
          self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
          self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
          self._applyBandOptions();
          document.body.classList.toggle('pwf-paid', !!self.premium);
          self._saveStore();
          if (self._wrap) self.render();
        })
        .catch(function () {});
    } catch (_) {}
  },

  /* ⚠ THE CLOTH MUST HOLD IN EVERY CHANNEL. A tool that hides a number
     on screen and then speaks it aloud, or posts it to the live region,
     has not hidden it. Both the voice and the announcement go silent
     while anything is covered. */
  _say: function (text) {
    if (!this.api.settings.voice || !text || this._anyCovered()) return;
    try { LCSAudio.speak({ type: 'number', text: String(text), lang: this.api.lang }); } catch (_) {}
  },

  /* the spoken frame IS the moat: the locale's own way of saying a split.
     Debounced, because a class carries twenty times in a minute and each
     utterance is a whole sentence. */
  _sayerSplit: function () {
    if (!this.api.settings.voice || this._anyCovered()) return;
    var self = this;
    if (this._sayTimer) clearTimeout(this._sayTimer);
    this._sayTimer = this._after(380, function () {
      var lang = self.api.lang, f = self.frame;
      var line = self.api.t('splitFrame')
        .replace('{whole}', self.numberWord(f.whole, lang))
        .replace('{a}', self.numberWord(f.a, lang))
        .replace('{b}', self.numberWord(self.partB(f), lang));
      try { LCSAudio.speak({ type: 'ui', text: line, lang: lang }); } catch (_) {}
    });
  },

  _splitText: function () {
    var f = this.frame;
    return this.api.t('splitFrame')
      .replace('{whole}', String(f.whole))
      .replace('{a}', String(f.a))
      .replace('{b}', String(this.partB(f)));
  },

  /* =================================================================
     MOVES
     ================================================================= */
  _carry: function (dir) {
    var before = this.frame;
    var next = this.carry(this.frame, dir);
    if (next.a === before.a) return false;      /* at a bound: a real no-op */

    this._captureFlip();
    this._nudged = true;
    this.frame = next;
    this.ways = this.recordSplit(this.ways, this.frame);
    this.api.sound(dir === 'toB' ? 520 : 620);
    this.render();
    this._playFlip(dir);
    this._sayerSplit();
    if (!this._anyCovered()) this.api.announce(this._splitText());
    return true;
  },

  _setWhole: function (n) {
    var max = this._maxWhole();
    if (n > max) {
      if (!this.premium && n <= this.MAX_WHOLE) this._gateInline(this._wrap.querySelector('.pwf-head'), 'gateBand');
      return;
    }
    if (n < this.MIN_WHOLE) return;
    if (n === this.frame.whole) return;
    this.frame = this.setWhole(this.frame, n);
    this.ways = this.recordSplit([], this.frame);   /* a new whole is a new question */
    this.render();
    this._say(this.numberWord(this.frame.whole, this.api.lang));
  },

  /* the teacher puts a found split back on the board. Not a new
     affordance for the child — a jump to something the class already
     did, which is what makes "what is the same about these two?"
     possible at all. */
  _useWay: function (key) {
    var a = parseInt(key.split('+')[0], 10);
    if (isNaN(a) || a < 0 || a > this.frame.whole) return;
    if (a === this.frame.a) return;
    /* ⚠ read the direction BEFORE the assignment — comparing against
       `this.frame.a` afterwards compares the new value with itself. */
    var dir = a > this.frame.a ? 'toA' : 'toB';
    this._captureFlip();
    this.frame = { whole: this.frame.whole, a: a };
    this.render();
    this._playFlip(dir);
    this._sayerSplit();
    if (!this._anyCovered()) this.api.announce(this._splitText());
  },

  _toggleCover: function (which) {
    this.covers[which] = !this.covers[which];
    this.render();
  },

  /* ⚠ START AGAIN CLEARS THE LESSON, NOT THE TEACHER'S SETUP. It used to
     jump back to today's rotating number, so a teacher who had deliberately
     set seven lost it — and the shell's own Reset button calls this too. No
     other reset in the house discards a teacher's configuration. */
  _resetAll: function () {
    this.frame = this.newFrame(this.frame ? this.frame.whole : this._todaysWhole());
    this.ways = this.recordSplit([], this.frame);
    this.covers = { whole: false, a: false, b: false };
    this.waysOrdered = false;
    this.render();
  },

  reset: function () { this._resetAll(); },

  /* the shell calls render() itself right after this, so nothing here
     renders — a second render would restart the FLIP transition. */
  onSettings: function (key) {
    if (key === 'band' && !this.premium && parseInt(this.api.settings.band, 10) > this.FREE_MAX_WHOLE) {
      this.api.settings.band = '10';
      this._saveStore();
      var self = this;
      requestAnimationFrame(function () {
        if (self._wrap) self._gateInline(self._wrap.querySelector('.pwf-head') || self._wrap, 'gateBand');
      });
      return;
    }
    this.api.settings.tone = this.toneFor(this.api.settings.tone);
    this.api.settings.shape = this.shapeFor(this.api.settings.shape);
    this.api.settings.notation = this.notationFor(this.api.settings.notation);
    /* ⚠ NARROWING THE BAND IS A NEW QUESTION TOO. `_setWhole` clears the
       record for exactly this reason and this path did not, so a teacher
       who dropped from twenty to ten kept rows reading `13+7` under a board
       showing ten — and every one of those rows became a live button
       `_useWay` would refuse, which is the consequence-free-control defect
       arriving through the back door. Two native panels found it
       independently. */
    var narrowed = this.setWhole(this.frame, Math.min(this.frame.whole, this._maxWhole()));
    if (narrowed.whole !== this.frame.whole) { this.frame = narrowed; this.ways = this.recordSplit([], this.frame); }
    else { this.frame = narrowed; }
    this._saveStore();
  },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    this._clearTimers();
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'pwf-wrap');
    wrap.setAttribute('data-shape', this.shapeFor(api.settings.shape));
    wrap.setAttribute('data-tone', this.toneFor(api.settings.tone));
    this._applyScheme(wrap);
    this._wrap = wrap;

    wrap.appendChild(this._buildHead());

    /* ⚠ On a wide screen the record sits BESIDE the frame, not under it.
       Stacked, a whole of 20 pushed the record's own controls past the
       bottom of a 900px desktop. Side by side is also the truer classroom
       layout: the teacher wants the frame and the list of ways in view at
       the same time. The breakpoint is a CONTAINER query — the old
       viewport query made the instrument SMALLER at 1024 than at 899,
       because the card is capped at 720 and the viewport is not the box. */
    var main = api.el('div', 'pwf-main');
    var left = api.el('div', 'pwf-col');
    left.appendChild(this._buildSheet());
    left.appendChild(this._buildNotation());
    left.appendChild(this._buildControls());
    main.appendChild(left);
    if (this.premium) main.appendChild(this._buildWays());
    wrap.appendChild(main);

    if (this.premium) {
      wrap.appendChild(this._buildPrintMat());
      wrap.appendChild(this._buildPrintWays());
    }

    api.stage.appendChild(wrap);

    var self = this;
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { self._layoutLegs(); });
    else this._layoutLegs();
    this._maybeNudge();
  },

  _anyCovered: function () { return this.covers.whole || this.covers.a || this.covers.b; },
  /* ⚠ narrower than _anyCovered, and the difference is load-bearing: it
     is what stops the two-tone nest from leaking the hidden part. */
  _anyPartCovered: function () { return this.covers.a || this.covers.b; },

  _applyScheme: function (el) {
    var s = this.schemeFor(this.api.settings.scheme);
    var set = function (n, m) {
      el.style.setProperty('--' + n + '-fill', m.fill);
      el.style.setProperty('--' + n + '-lit', m.lit);
      el.style.setProperty('--' + n + '-shade', m.shade);
      el.style.setProperty('--' + n + '-edge', m.edge);
      el.style.setProperty('--' + n + '-edge-sm', m.edgeSm);
      el.style.setProperty('--' + n + '-bwx', String(m.bwx || 1));
    };
    set('c1', s.c1); set('c2', s.c2);
  },

  /* ---- the whole stepper + the quick-set numerals: the teacher's lever ---- */
  _buildHead: function () {
    var self = this, api = this.api;
    var head = api.el('div', 'pwf-head');

    var lbl = api.el('span', 'pwf-headlbl');
    lbl.textContent = api.t('todaysWhole');
    head.appendChild(lbl);

    /* ⚠ each button's accessible name is its own phrase, never
       `label + number` concatenation — that construction broke Finnish
       case-marking on open-number-line and three ensembles caught it. */
    var mk = function (delta, labelKey) {
      var b = api.el('button', 'pwf-step'); b.type = 'button';
      b.textContent = delta < 0 ? '−' : '+';
      b.setAttribute('aria-label', api.t(labelKey));
      b.title = api.t(labelKey);
      /* ⚠ A LIVE CONTROL THAT CANNOT ACT IS FURNITURE. At the floor, and at
         a SUBSCRIBER's ceiling, the stepper simply returned and the teacher
         got silence. It now states its own unavailability.
         ⚠ But NOT for a free visitor at ten: there the press is what
         surfaces the upsell, so the button has a real consequence and must
         stay enabled. */
      var atFloor = delta < 0 && self.frame.whole <= self.MIN_WHOLE;
      var atCeiling = delta > 0 && self.frame.whole >= (self.premium ? self._maxWhole() : self.MAX_WHOLE);
      if (atFloor || atCeiling) { b.disabled = true; b.setAttribute('aria-disabled', 'true'); }
      b.addEventListener('click', function () { self._setWhole(self.frame.whole + delta); });
      return b;
    };
    head.appendChild(mk(-1, 'fewerWhole'));
    var val = api.el('span', 'pwf-headval');
    /* ⚠⚠ THE BIGGEST GLYPH ON THE BOARD WAS ANSWERING THE QUESTION. The
       cloth was held in four channels — the nest's colour, the voice, the
       live region and the record — and missed in the one a child looks at
       first: this numeral, 46px on a phone and 64px on a projector, sitting
       directly above the covered nest. Three native panels read the model
       and one of them found it; no gate here could, because every gate was
       checking the containers. `?` is already the cloth's punctuation in
       the notation, so it is the same word here. */
    val.textContent = this.covers.whole ? '?' : String(this.frame.whole);
    val.setAttribute('aria-live', 'polite');
    head.appendChild(val);
    head.appendChild(mk(1, 'moreWhole'));

    /* pure numerals — no translation debt, and legal on a no-words
       apparatus. `{n}` is interpolated into the accessible name only. */
    var quick = api.el('div', 'pwf-quick');
    quick.setAttribute('role', 'group');
    quick.setAttribute('aria-label', api.t('todaysWhole'));
    this._quickWholes().forEach(function (n) {
      var b = api.el('button', 'pwf-quickbtn'); b.type = 'button';
      b.textContent = String(n);
      b.setAttribute('aria-label', api.t('setWholeTo').replace('{n}', String(n)));
      b.title = b.getAttribute('aria-label');
      if (n === self.frame.whole) b.setAttribute('aria-current', 'true');
      b.addEventListener('click', function () { self._setWhole(n); });
      quick.appendChild(b);
    });
    head.appendChild(quick);

    return head;
  },

  /* ---- the frame itself ----
     ⚠ FLOW, NOT ABSOLUTE COORDINATES, for the containers. The very first
     build placed them at x/y percentages and they collided the moment a
     tray grew past two rows. The descriptor names the ARRANGEMENT; the
     browser does the layout; the CONNECTORS are measured afterwards from
     what the browser actually produced. */
  _buildSheet: function () {
    var api = this.api;
    var d = this.diagramFor(api.lang);
    var sheet = api.el('div', 'pwf-sheet pwf-layout-' + d.layout
      + (this._anyPartCovered() ? ' pwf-partcovered' : ''));
    sheet.setAttribute('data-system', d.system);
    /* JS reports the ROW COUNT; CSS owns every size. An inline --pwf-dot
       beat the phone media query (inline styles win), so the tray width
       and the dot size drifted apart. The row count is fixed by the WHOLE,
       so all three containers are identical and covering one cannot
       change its height. */
    /* the grid is reserved by the WHOLE, so all three containers are
       identical and covering one cannot change its height. `data-dense`
       is the size-ladder switch: three rows or more and the counters step
       down a rung, because that is the state that has to fit a desktop. */
    var rows = this.rowsFor(this.frame.whole);
    var cols = this.colsFor(this.frame.whole);
    sheet.style.setProperty('--pwf-rows', String(rows));
    sheet.style.setProperty('--pwf-cols', String(cols));
    sheet.setAttribute('data-rows', String(rows));
    /* ⚠ THE COUNTER SIZE DEPENDS ON THE COLUMN COUNT, NOT ONLY THE
       VIEWPORT. A whole of six reserves three columns, so at 1920 a
       viewport-only ladder drew a 392px instrument inside a 1300px card —
       the rekenrek defect in reverse: not a box grown around an unchanged
       object, but an object that never grows because the box it needs is
       small. Six counters on a projector should be BIG. */
    sheet.setAttribute('data-cols', String(cols));
    if (rows >= 3) sheet.setAttribute('data-dense', '1');

    sheet.appendChild(this._buildContainer('whole', this.frame.whole, 'wholeLabel'));

    var space = api.el('div', 'pwf-legspace');
    space.setAttribute('aria-hidden', 'true');
    sheet.appendChild(space);

    var row = api.el('div', 'pwf-parts');
    var seam = api.el('div', 'pwf-seam');
    seam.setAttribute('aria-hidden', 'true');
    row.appendChild(seam);
    row.appendChild(this._buildContainer('a', this.frame.a, 'partOne'));
    row.appendChild(this._buildContainer('b', this.partB(this.frame), 'partTwo'));
    sheet.appendChild(row);

    /* the connectors, drawn over the sheet in its own pixel space and
       positioned by _layoutLegs from the MEASURED rects */
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'pwf-legs');
    svg.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 2; i++) {
      var ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('class', 'pwf-leg');
      svg.appendChild(ln);
    }
    sheet.appendChild(svg);

    return sheet;
  },

  /* ⚠ PERCENTAGES OF ONE BOX CANNOT ADDRESS ANOTHER BOX. The old build
     drew the legs into a 340px-capped viewBox while the sheet ramped to
     1300px, so at 1367 the feet landed 38px away from the trays they were
     pointing at — and the error grew with every wide tier. Nothing in any
     gate measured whether a line touched a thing.
     Here the endpoints are read off the rendered rects, in the sheet's own
     pixel space, after layout. There is nothing left to drift. */
  _layoutLegs: function () {
    if (!this._wrap) return;
    var sheet = this._wrap.querySelector('.pwf-sheet');
    var svg = sheet && sheet.querySelector('.pwf-legs');
    if (!sheet || !svg) return;
    /* ⚠ THE APEX HANGS OFF THE NEST'S BOX, NOT ITS DISH. Anchored to the
       dish, the V started above the whole's numeral and the two lines
       ran straight THROUGH it. The numeral belongs to the nest, so the
       bond leaves from underneath the whole thing. */
    var nest = sheet.querySelector('.pwf-box-whole');
    var nestDish = sheet.querySelector('.pwf-box-whole .pwf-dish');
    var ta = sheet.querySelector('.pwf-box-a .pwf-dish');
    var tb = sheet.querySelector('.pwf-box-b .pwf-dish');
    if (!nest || !nestDish || !ta || !tb) return;

    var S = sheet.getBoundingClientRect();
    if (!S.width || !S.height) return;
    var N = nestDish.getBoundingClientRect();
    var NB = nest.getBoundingClientRect();
    var A = ta.getBoundingClientRect();
    var B = tb.getBoundingClientRect();
    var d = this.diagramFor(this.api.lang);

    svg.setAttribute('width', String(S.width));
    svg.setAttribute('height', String(S.height));
    svg.setAttribute('viewBox', '0 0 ' + S.width + ' ' + S.height);

    var apexY = NB.bottom - S.top;
    var lines = svg.querySelectorAll('line');
    var targets = [A, B];
    for (var i = 0; i < lines.length && i < 2; i++) {
      /* legs[i] is an x fraction OF THE NEST — the descriptor's own unit,
         now resolved against the nest's measured width instead of against
         a box that is not the nest */
      var ax = N.left - S.left + N.width * ((d.legs[i] || 50) / 100);
      var t = targets[i];
      lines[i].setAttribute('x1', String(ax));
      lines[i].setAttribute('y1', String(apexY + 1));
      lines[i].setAttribute('x2', String(t.left - S.left + t.width / 2));
      lines[i].setAttribute('y2', String(t.top - S.top - 1));
    }
  },

  /* One container. When covered, the counters and the numeral are REMOVED
     from the DOM — not hidden, not aria-hidden. A hidden count is still a
     count to anything that reads the tree, and the whole point of the
     cloth is that the number is genuinely not available.

     ⚠ THE TRAY IS THE HANDLE, NOT THE COUNTER. An earlier build made every
     counter a button and the sweep measured them at 19-22px — a fifth of
     the K-2 tap floor, on the one control a six-year-old actually uses.
     Twenty 44px buttons cannot fit a phone tray, so the fix is not a
     bigger dot: the counters are interchangeable, so ONE affordance per
     tray is the honest model. You reach into the bowl and take one out.

     ⚠ AND A COVERED TRAY STAYS LIVE. The old build turned it into a
     non-focusable div while leaving it a drop target, so keyboard users
     silently lost a control that pointer users kept. Taking one out from
     under the cloth without knowing how many are there is not a bug —
     it is the best question this instrument can ask. */
  _buildContainer: function (which, count, labelKey) {
    var self = this, api = this.api;
    var covered = this.covers[which];
    var live = which !== 'whole';
    var box = api.el('div', 'pwf-box pwf-box-' + which + (covered ? ' pwf-covered' : ''));

    /* only the nest keeps a caption. "This part"/"That part" were
       unreadable at three metres, meaningless once the parts are told
       apart by colour, and two of the nine words that sat on an apparatus
       whose acceptance test is "legible with no reading ability". They
       survive as accessible names. */
    if (which === 'whole') {
      var cap = api.el('div', 'pwf-cap');
      cap.textContent = api.t(labelKey);
      /* the same string is the dish group's accessible name six pixels
         below, so a screen reader announced the nest twice */
      cap.setAttribute('aria-hidden', 'true');
      box.appendChild(cap);
    }

    var dish;
    if (live) {
      dish = api.el('button', 'pwf-dish pwf-dish-live');
      dish.type = 'button';
      dish.setAttribute('aria-label', api.t(labelKey) + ' — ' + api.t('carryAria'));
      var dir = which === 'a' ? 'toB' : 'toA';
      dish.addEventListener('click', function (e) {
        if (self._dragMoved) return;
        e.preventDefault();
        self._carry(dir);
      });
      dish.addEventListener('keydown', function (e) {
        var fwd = (e.key === 'ArrowRight' && which === 'a') || (e.key === 'ArrowLeft' && which === 'b');
        if (fwd) { e.preventDefault(); self._carry(dir); return; }
        /* ⚠ THE FOCUS ARROW POINTED THE WRONG WAY. Tray `a` is the LEFT
           tray (`1fr 1fr`, appended first, never stacked), and ArrowLeft on
           it moved focus RIGHT. The carry arrows already point at the tray
           the counter goes to; there is nothing outside the pair, so the
           outward arrow does nothing and Tab is the way out. A native panel
           read the renderer and caught this. */
      });
      dish.addEventListener('pointerdown', function (e) { self._startDrag(dish, dir, e); });
    } else {
      dish = api.el('div', 'pwf-dish');
      dish.setAttribute('role', 'group');
      dish.setAttribute('aria-label', api.t(labelKey));
    }
    if (which !== 'whole') dish.setAttribute('data-drop', which);

    if (covered) {
      /* ⚠ THE CLOTH IS DECORATIVE, and it has to be. Making it a button
         would nest a <button> inside the tray's own <button>, which is
         invalid HTML and which browsers do not render as two controls.
         The peg is the uncover control and it is a 44px target six pixels
         away, so nothing is lost — and the tray stays a live SOURCE, so
         you can take one out from under the cloth without knowing how
         many are there, which is the best question this board can ask. */
      var cloth = api.el('div', 'pwf-cloth');
      cloth.setAttribute('aria-hidden', 'true');
      dish.appendChild(cloth);
    } else {
      for (var i = 0; i < count; i++) dish.appendChild(this._buildCounter(this._sideFor(which, i), i));
    }
    box.appendChild(dish);

    /* ⚠ THE FOOT ROW, NOT THE CORNER OF THE TRAY. The peg first sat at the
       container's top-right and landed ON the material: it covered the
       third counter of every tray and collided with the nest's caption.
       Down here it costs no extra height (the numeral row already exists
       and is taller than the peg at every wide tier) and it puts the cloth
       control beside the very number it hides, which is the truer place
       for it. */
    var foot = api.el('div', 'pwf-foot');
    var num = api.el('div', 'pwf-num');
    /* the numeral slot is always present, so the board does not jump when
       a cloth goes on or the numerals are switched off */
    num.textContent = (!covered && api.settings.numerals) ? String(count) : '';
    if (covered) num.classList.add('pwf-num-hidden');
    foot.appendChild(num);

    /* the cloth's own control: a folded corner of the cloth itself, not a
       labelled pill. Six rendered words leave the apparatus and survive as
       six authored accessible phrases — never `label + noun`
       concatenation, which is what broke Finnish case-marking before. */
    var peg = api.el('button', 'pwf-peg'); peg.type = 'button';
    peg.setAttribute('aria-pressed', covered ? 'true' : 'false');
    peg.setAttribute('aria-label', api.t(this._coverKey(which, covered)));
    peg.title = peg.getAttribute('aria-label');
    peg.appendChild(this._pegInk());
    peg.addEventListener('click', function () { self._toggleCover(which); });
    foot.appendChild(peg);
    box.appendChild(foot);

    return box;
  },

  _coverKey: function (which, covered) {
    if (which === 'whole') return covered ? 'uncoverWhole' : 'coverWhole';
    if (which === 'a') return covered ? 'uncoverOne' : 'coverOne';
    return covered ? 'uncoverTwo' : 'coverTwo';
  },

  _pegInk: function () {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('class', 'pwf-pegink');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    /* a cloth: a hem with four folds, the universal "something is under
       here" silhouette. Never an eye, which reads as visibility toggling
       rather than as a physical cover. */
    p.setAttribute('d', 'M3 8.5C3 5.5 7 3.2 12 3.2S21 5.5 21 8.5V16c-1.5-1-3 1-4.5 0S13.5 17 12 16s-3 1-4.5 0S4.5 17 3 16Z');
    s.appendChild(p);
    return s;
  },

  /* which colour a counter wears. In one-tone the CSS ignores it; in
     two-tone the nest's run is a-many c1 then b-many c2, so a carry
     changes exactly ONE coat and never the length of the row. */
  _sideFor: function (which, i) {
    if (which !== 'whole') return which;
    return i < this.frame.a ? 'a' : 'b';
  },

  /* Counters are decorative: the tray owns the interaction. The nest's
     counters are the same shape as the parts' so the eye reads them as the
     same things, gathered — but the nest is never a drop target, because
     it is a count, not a place. */
  /* ⚠⚠ THE RENDERER MUST ACTUALLY USE slot(). It is the most-verified
     function in the file — pairwise, banded, stable under n -> n+1, a
     dedicated gate section of its own — and the first build of this
     renderer never called it, so the counters fell into DOM order and a
     whole of six drew as five-and-one: the exact five-structure the
     arrangement exists to refuse. Every gate was green, because every
     gate was measuring the model and nothing was measuring whether the
     renderer obeyed it. `i` is not optional. */
  _buildCounter: function (side, i) {
    var d = this.api.el('span', 'pwf-dot');
    d.setAttribute('data-side', side);
    d.setAttribute('aria-hidden', 'true');
    if (typeof i === 'number') {
      var s = this.slot(i, this.frame.whole);
      d.style.gridColumn = String(s.col);
      d.style.gridRow = String(s.row);
    }
    return d;
  },

  /* ---- FLIP: the carry is the lesson, so it has to be visible ----
     The old build re-rendered and the counter teleported, which meant the
     one thing this instrument exists to show was the one thing it did not
     show. Capture the part counters' rects, mutate, re-render, invert,
     play. The NEST IS NEVER ANIMATED — the instant it twitches the thesis
     is dead — except for one coat crossfade in two-tone, timed to land
     with the token below. */
  _captureFlip: function () {
    if (!this._wrap) { this._flip = null; return; }
    var map = [];
    ['a', 'b'].forEach(function (side) {
      var dish = this._wrap.querySelector('.pwf-box-' + side + ' .pwf-dish');
      if (!dish) return;
      var dots = dish.querySelectorAll('.pwf-dot');
      for (var i = 0; i < dots.length; i++) map.push({ side: side, i: i, r: dots[i].getBoundingClientRect() });
    }, this);
    this._flip = map.length ? map : null;
  },

  _playFlip: function (dir) {
    var prev = this._flip;
    this._flip = null;
    if (!prev || !this._wrap) return;
    if (this._reduced()) { this._fadeArrival(dir); return; }

    var self = this;
    var moved = 0;
    ['a', 'b'].forEach(function (side) {
      var dish = self._wrap.querySelector('.pwf-box-' + side + ' .pwf-dish');
      if (!dish) return;
      var dots = dish.querySelectorAll('.pwf-dot');
      for (var i = 0; i < dots.length; i++) {
        var was = null;
        for (var k = 0; k < prev.length; k++) if (prev[k].side === side && prev[k].i === i) { was = prev[k]; break; }
        if (!was) continue;
        var now = dots[i].getBoundingClientRect();
        var dx = was.r.left - now.left, dy = was.r.top - now.top;
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue;
        dots[i].style.setProperty('--dx', dx + 'px');
        dots[i].style.setProperty('--dy', dy + 'px');
        dots[i].classList.add('pwf-carrying');
        moved++;
      }
    });
    /* the arriving counter has no previous rect on its own side, so give
       it the departing tray's last cell to travel from */
    var toSide = dir === 'toB' ? 'b' : 'a';
    var fromSide = dir === 'toB' ? 'a' : 'b';
    var dish = this._wrap.querySelector('.pwf-box-' + toSide + ' .pwf-dish');
    var dots = dish ? dish.querySelectorAll('.pwf-dot') : [];
    if (dots.length) {
      var last = dots[dots.length - 1];
      var src = null;
      for (var k = prev.length - 1; k >= 0; k--) if (prev[k].side === fromSide) { src = prev[k]; break; }
      if (src) {
        var now2 = last.getBoundingClientRect();
        last.style.setProperty('--dx', (src.r.left - now2.left) + 'px');
        last.style.setProperty('--dy', (src.r.top - now2.top) + 'px');
        last.classList.add('pwf-carrying');
        moved++;
      }
    }
    if (moved) {
      var well = this._wrap.querySelector('.pwf-box-' + toSide + ' .pwf-dish');
      if (well) { well.classList.add('pwf-landed'); this._after(200, function () { well.classList.remove('pwf-landed'); }); }
    }
  },

  /* a SUBSTITUTE, not a removal. Under reduced motion nothing translates
     and nothing scales, but you still need to know which counter is new,
     so the arrival cross-fades. A motion preference says nothing about the
     tone or the live region, and both are kept. */
  _fadeArrival: function (dir) {
    var toSide = dir === 'toB' ? 'b' : 'a';
    var dish = this._wrap.querySelector('.pwf-box-' + toSide + ' .pwf-dish');
    var dots = dish ? dish.querySelectorAll('.pwf-dot') : [];
    if (dots.length) dots[dots.length - 1].classList.add('pwf-arriving');
  },

  _reduced: function () {
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    catch (_) { return false; }
  },

  /* The only thing a first-timer cannot infer is that the tap belongs to
     the SOURCE tray, not the destination. One nudge answers exactly that
     and needs no words. Once ever, cancelled by any carry, and never under
     reduced motion. */
  _maybeNudge: function () {
    if (this._nudged || this._reduced() || !this._wrap) return;
    var dish = this._wrap.querySelector('.pwf-box-a .pwf-dish');
    var dots = dish ? dish.querySelectorAll('.pwf-dot') : [];
    if (!dots.length) return;
    var self = this;
    dots[dots.length - 1].classList.add('pwf-nudge');
    this._after(1400, function () { self._nudged = true; self._saveStore(); });
  },

  /* Drag: a body-level ghost that is ONE COUNTER — the old build built it
     from the DISH's rect and hard-coded a coral circle, so a 158x105px
     orange ellipse followed the finger through the one gesture the tool
     exists to teach.
     The drop test is CROSSING THE SEAM, not hit-testing a rect, and the
     seam is drawn down the middle of the parts row so the rule and the
     picture are the same object. Released short of it, the counter simply
     stays where it was: there is no way to drop a counter into the nest or
     onto the floor, so no state exists in which the parts do not sum to
     the whole.

     ⚠ `_dragMoved` IS OWNED BY THIS FUNCTION AND NOTHING ELSE. The old
     build reset it inside the tray's click handler, and `_carry` ->
     `render()` -> `stage.innerHTML=''` destroys that tray BEFORE the
     browser dispatches click — so every completed drag-carry swallowed
     the next tap. It is released here, on a macrotask, after the click
     that never comes would have come. */
  _startDrag: function (dish, dir, e) {
    if (e.button !== undefined && e.button !== 0) return;
    var self = this;
    var which = dish.getAttribute('data-drop');
    var covered = which && this.covers[which];
    var dots = dish.querySelectorAll('.pwf-dot');
    /* ⚠ A COVERED TRAY ADVERTISED A GRAB AND REFUSED IT. This returned
       early on "no counters", and a covered tray has none in the DOM — so
       the two comments promising that a covered tray "stays a live source"
       were true for a tap and false for a DRAG, which is the primary
       gesture on a touch whiteboard, while `cursor:grab` went on inviting
       it. A native panel read the model and found it.
       Under the cloth there is no counter to lift, so the ghost is built
       fresh and starts from the middle of the cloth: you reach in without
       knowing what you are holding, which is the whole question. */
    if (!covered && !dots.length) return;        /* an empty tray has nothing to carry */
    /* nothing to take from under the cloth if that part is empty.
       ⚠ the first version wrapped this in `partB(...) !== undefined`, which
       can never be false — a guard dressed as a totality check that checked
       nothing. Three panels flagged it. */
    if (covered && (which === 'a' ? this.frame.a === 0 : this.partB(this.frame) === 0)) return;
    e.preventDefault();
    this._dragMoved = false;

    var lead = dots.length ? dots[dots.length - 1] : null;
    var r, ghost;
    if (lead) {
      r = lead.getBoundingClientRect();
      ghost = lead.cloneNode(true);
    } else {
      var dr = dish.getBoundingClientRect();
      var size = parseFloat(getComputedStyle(dish).getPropertyValue('--pwf-dot')) || 26;
      r = { left: dr.left + dr.width / 2 - size / 2, top: dr.top + dr.height / 2 - size / 2, width: size, height: size };
      ghost = this._buildCounter(which);
    }
    ghost.className = 'pwf-dot pwf-ghost';
    ghost.style.width = r.width + 'px';
    ghost.style.height = r.height + 'px';
    ghost.style.left = '0px';
    ghost.style.top = '0px';
    ghost.style.transform = 'translate3d(' + r.left + 'px,' + r.top + 'px,0)';
    document.body.appendChild(ghost);
    if (lead) lead.classList.add('pwf-lifted');

    var target = dir === 'toB' ? 'b' : 'a';
    var dropEl = this._wrap.querySelector('[data-drop="' + target + '"]');
    var seamEl = this._wrap.querySelector('.pwf-seam');
    var seamX = seamEl ? (seamEl.getBoundingClientRect().left + seamEl.getBoundingClientRect().width / 2) : null;
    var ox = e.clientX - r.left, oy = e.clientY - r.top;

    try { dish.setPointerCapture(e.pointerId); } catch (_) {}

    var past = function (x) {
      if (seamX === null) return dropEl ? self._inside(dropEl, x, e.clientY) : false;
      return dir === 'toB' ? x > seamX : x < seamX;
    };

    var move = function (ev) {
      self._dragMoved = true;
      ghost.style.transform = 'translate3d(' + (ev.clientX - ox) + 'px,' + (ev.clientY - oy) + 'px,0)';
      if (dropEl) dropEl.classList.toggle('pwf-over', past(ev.clientX));
    };
    var up = function (ev) {
      dish.removeEventListener('pointermove', move);
      dish.removeEventListener('pointerup', up);
      dish.removeEventListener('pointercancel', up);
      try { dish.releasePointerCapture(ev.pointerId); } catch (_) {}
      if (dropEl) dropEl.classList.remove('pwf-over');
      if (lead) lead.classList.remove('pwf-lifted');
      var ok = self._dragMoved && past(ev.clientX);
      if (ok) {
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
        self._carry(dir);
      } else {
        /* return home rather than vanishing at the cursor, which reads as
           the counter falling out of the world */
        ghost.classList.add('pwf-ghost-home');
        ghost.style.transform = 'translate3d(' + r.left + 'px,' + r.top + 'px,0)';
        self._after(240, function () { if (ghost.parentNode) ghost.parentNode.removeChild(ghost); });
      }
      /* a macrotask, so the synthetic click (if any) has already been and
         gone by the time the flag clears */
      setTimeout(function () { self._dragMoved = false; }, 0);
    };
    dish.addEventListener('pointermove', move);
    dish.addEventListener('pointerup', up);
    dish.addEventListener('pointercancel', up);
  },

  _inside: function (el, x, y) {
    var r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  },

  /* ---- the written form, only when the teacher asks for it ----
     The slot is always in the DOM and always reserves its height, so the
     board does not jump when a cloth goes on. A covered term prints as
     `?` — which is punctuation for the cloth, not a question the tool
     asks: there is nothing to submit it to, no key, and no verdict. The
     only thing that reveals it is lifting the cloth. */
  _buildNotation: function () {
    var api = this.api, f = this.frame;
    var mode = this.notationFor(api.settings.notation);
    var n = api.el('div', 'pwf-notation');
    if (mode === 'off') { n.classList.add('pwf-notation-off'); return n; }

    var W = this.covers.whole ? '?' : String(f.whole);
    var A = this.covers.a ? '?' : String(f.a);
    var B = this.covers.b ? '?' : String(this.partB(f));

    var line = function (parts) {
      var row = api.el('div', 'pwf-nline');
      parts.forEach(function (p) {
        var s = api.el('span', /[0-9?]/.test(p) ? 'pwf-nnum' : 'pwf-nop');
        s.textContent = p;
        row.appendChild(s);
      });
      return row;
    };

    if (mode === 'sum') {
      n.appendChild(line([W, '=', A, '+', B]));
    } else {
      n.classList.add('pwf-notation-fam');
      n.appendChild(line([A, '+', B, '=', W]));
      n.appendChild(line([B, '+', A, '=', W]));
      n.appendChild(line([W, '−', A, '=', B]));
      n.appendChild(line([W, '−', B, '=', A]));
    }
    return n;
  },

  /* ---- controls. No Check: there is nothing to check. ---- */
  _buildControls: function () {
    var self = this, api = this.api;
    var row = api.el('div', 'pwf-controls');

    var again = api.el('button', 'pwf-linkbtn'); again.type = 'button';
    again.textContent = api.t('resetBtn');
    again.addEventListener('click', function () { self._resetAll(); });
    row.appendChild(again);

    var pr = api.el('button', 'pwf-linkbtn' + (this.premium ? '' : ' pwf-locked')); pr.type = 'button';
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(row, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    });
    row.appendChild(pr);

    if (!this.premium) {
      var ways = api.el('button', 'pwf-linkbtn pwf-locked'); ways.type = 'button';
      ways.textContent = api.t('allWays');
      ways.addEventListener('click', function () { self._gateInline(row, 'gateWays'); });
      row.appendChild(ways);
    }

    return row;
  },

  /* ---- all the ways (premium). Rows appear AS FOUND, drawn as the same
     material as the board so a pre-numerate child can read the record at
     all. Stacked, the colour boundary marches one step per row and the
     staircase is visible with no reading and no arithmetic.

     ⚠ NO PRE-DRAWN EMPTY ROWS, EVER. The old build shipped an opt-in that
     rendered up to 21 blank dashed boxes — the "you missed three" verdict
     in its most literal possible costume, forbidden by this file's own
     REFUSES list one comment earlier. It is gone, and so is `waysFor()`,
     which existed only to count them.

     Ordering is a VIEW. `this.ways` is never re-written, so the child's
     route through the splits survives the teacher's display toggle. ---- */
  _buildWays: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'pwf-ways');

    var h = api.el('div', 'pwf-wayshead');
    var t = api.el('span', 'pwf-wayslbl'); t.textContent = api.t('allWays');
    h.appendChild(t);

    var toggle = api.el('button', 'pwf-waystoggle'); toggle.type = 'button';
    toggle.setAttribute('aria-pressed', this.waysOrdered ? 'true' : 'false');
    /* ⚠ ONE SIGNAL, NOT TWO. Flipping the accessible NAME as well as
       aria-pressed makes a screen reader announce "Back to the order you
       found them, pressed" — the state twice, in two vocabularies, and the
       second one contradicts the first. A native panel caught it. The name
       is stable and aria-pressed carries the state, which is what
       aria-pressed is for. (`orderFound` is deleted, not left behind: an
       authored string nothing asks for is the defect this programme has
       shipped twice.) */
    toggle.setAttribute('aria-label', api.t('orderWays'));
    toggle.title = toggle.getAttribute('aria-label');
    toggle.appendChild(this._orderInk());
    toggle.addEventListener('click', function () { self.waysOrdered = !self.waysOrdered; self.render(); });
    h.appendChild(toggle);
    box.appendChild(h);

    var hint = api.el('div', 'pwf-wayshint'); hint.textContent = api.t('waysHint');
    box.appendChild(hint);

    var list = api.el('div', 'pwf-wayslist');
    list.setAttribute('role', 'list');
    var rows = this.waysOrdered ? this.orderedWays(this.ways) : this.ways;
    var here = this.splitKey(this.frame);
    for (var i = 0; i < rows.length; i++) list.appendChild(this._wayRow(rows[i], rows[i] === here));
    box.appendChild(list);
    return box;
  },

  _orderInk: function () {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('class', 'pwf-orderink');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    [[4, 18, 6], [4, 12, 12], [4, 6, 18]].forEach(function (b) {
      var r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('x', String(b[0])); r.setAttribute('y', String(b[1] - 3));
      r.setAttribute('width', String(b[2])); r.setAttribute('height', '3');
      r.setAttribute('rx', '1.5');
      s.appendChild(r);
    });
    return s;
  },

  /* ⚠ THE RECORD IS A FOURTH CHANNEL THE CLOTH HAS TO HOLD IN, AND
     BLINDING ONLY THE CURRENT ROW WAS NOT ENOUGH.
     The first version argued that rows found EARLIER are history and that
     reasoning from them is the lesson. A native panel produced the
     counter-example and it is decisive: cover a part, carry ONCE, and the
     row recorded a moment ago now sits there un-blinded showing `3 and 7`
     while the class watched a single counter travel in a known direction.
     That is not reasoning, it is reading the answer with one subtraction.
     So while ANY part is covered the whole record goes blind. The teacher
     loses the visible history for as long as the cloth is down, which is
     the correct price: they chose to ask the question. */
  _wayRow: function (key, current) {
    var self = this, api = this.api;
    var parts = key.split('+');
    var a = parseInt(parts[0], 10), b = parseInt(parts[1], 10);
    var blind = this._anyPartCovered();
    /* ⭐ THE ROW YOU ARE ALREADY ON IS NOT A CONTROL. `_useWay` correctly
       refuses to re-apply the split that is already on the board, so a
       button there can never have a consequence — and a consequence-free
       control is furniture a teacher taps and learns nothing from. It was
       also the only real FAIL the shared liveness audit found, and it
       found it precisely because the audit asks "did anything change",
       which is the right question. Render the current row as a plain
       listitem: there is then no control that can do nothing. */
    var split = api.t('splitFrame')
      .replace('{whole}', String(a + b)).replace('{a}', String(a)).replace('{b}', String(b));
    var row = api.el(current ? 'div' : 'button',
      'pwf-wayrow' + (current ? ' pwf-waynow' : '') + (blind ? ' pwf-wayblind' : ''));
    if (current) {
      row.setAttribute('aria-current', 'true');
      row.setAttribute('role', 'listitem');
      if (!blind) row.setAttribute('aria-label', split);
    } else {
      row.type = 'button';
      row.setAttribute('aria-label', blind ? api.t('useWay') : split + ' — ' + api.t('useWay'));
      row.title = api.t('useWay');
    }

    var bar = api.el('span', 'pwf-waybar');
    var i;
    for (i = 0; i < a; i++) bar.appendChild(this._buildCounter('a'));
    for (i = 0; i < b; i++) bar.appendChild(this._buildCounter(blind ? 'a' : 'b'));
    row.appendChild(bar);

    if (api.settings.numerals && !blind) {
      var nums = api.el('span', 'pwf-waynums');
      var l = api.el('span', 'pwf-waycell'); l.textContent = String(a);
      var r2 = api.el('span', 'pwf-waycell'); r2.textContent = String(b);
      nums.append(l, r2);
      row.appendChild(nums);
    }
    if (!current) row.addEventListener('click', function () { self._useWay(key); });
    return row;
  },

  /* =================================================================
     THE PRINTABLE (premium). Built only when entitled, so the premium
     DOM does not exist for a free visitor.

     Two pages, and neither is a greyscale screenshot of the screen.
     PAGE 1 IS A MAT: the frame at counter scale, the nest showing the
     whole as outlines, and two EMPTY trays — so the projector board
     becomes twenty-four paper boards on the carpet, with real counters
     on them. That is where four-year-olds actually consolidate this.
     PAGE 2 IS THE LESSON: the ways this class found, in their order.
     It is the only artefact that leaves the room.

     Counters print OUTLINE-ONLY and in ONE tone even when the screen is
     in two-tone: two greys on paper read as "these ones are different
     somehow", which is a distinction the mat does not want to make.
     ================================================================= */
  _printGlyph: function () {
    var shape = this.shapeFor(this.api.settings.shape);
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('class', 'pwf-pglyph');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    var node;
    if (shape === 'disc') {
      node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      node.setAttribute('cx', '12'); node.setAttribute('cy', '12'); node.setAttribute('r', '10.5');
    } else if (shape === 'tile') {
      node = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      node.setAttribute('x', '1.5'); node.setAttribute('y', '1.5');
      node.setAttribute('width', '21'); node.setAttribute('height', '21'); node.setAttribute('rx', '5.5');
    } else {
      node = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      node.setAttribute('d', shape === 'heart'
        ? 'M12 24 L2.9 15.8 L0.2 10.6 L0.7 6.2 L3.6 3.4 L7.4 3.1 L10.6 5.0 L12 7.7 L13.4 5.0 L16.6 3.1 L20.4 3.4 L23.3 6.2 L23.8 10.6 L21.1 15.8 Z'
        : 'M12 0 L15.84 7.68 L24 9.17 L18.24 15.41 L19.42 24 L12 20.16 L4.58 24 L5.76 15.41 L0 9.17 L8.16 7.68 Z');
    }
    s.appendChild(node);
    return s;
  },

  _buildPrintMat: function () {
    var api = this.api;
    var rows = this.rowsFor(this.frame.whole);
    var sheet = api.el('div', 'pwf-printmat');
    sheet.setAttribute('data-rows', String(rows));
    sheet.style.setProperty('--pwf-prows', String(rows));
    sheet.style.setProperty('--pwf-pcols', String(this.colsFor(this.frame.whole)));

    var head = api.el('div', 'pwf-printhead');
    head.textContent = api.t('matTitle');
    sheet.appendChild(head);

    var frame = api.el('div', 'pwf-pframe');

    var nest = api.el('div', 'pwf-pbox pwf-pbox-whole');
    var ncap = api.el('div', 'pwf-pcap'); ncap.textContent = api.t('wholeLabel');
    var ndish = api.el('div', 'pwf-pdish');
    for (var i = 0; i < this.frame.whole; i++) {
      var g = api.el('span', 'pwf-pdot');
      var sl = this.slot(i, this.frame.whole);
      g.style.gridColumn = String(sl.col); g.style.gridRow = String(sl.row);
      g.appendChild(this._printGlyph());
      ndish.appendChild(g);
    }
    var nnum = api.el('div', 'pwf-pnum'); nnum.textContent = String(this.frame.whole);
    nest.append(ncap, ndish, nnum);
    frame.appendChild(nest);

    var bar = api.el('div', 'pwf-pjoin');
    bar.setAttribute('aria-hidden', 'true');
    frame.appendChild(bar);

    var parts = api.el('div', 'pwf-pparts');
    ['a', 'b'].forEach(function () {
      var b = api.el('div', 'pwf-pbox');
      var d = api.el('div', 'pwf-pdish pwf-pdish-empty');
      var n = api.el('div', 'pwf-pnum'); n.textContent = '';
      b.append(d, n);
      parts.appendChild(b);
    });
    frame.appendChild(parts);
    sheet.appendChild(frame);
    return sheet;
  },

  _buildPrintWays: function () {
    var api = this.api;
    var sheet = api.el('div', 'pwf-printways');
    var head = api.el('div', 'pwf-printhead');
    head.textContent = api.t('waysTitle') + ' — ' + this.frame.whole;
    sheet.appendChild(head);

    var rows = this.waysOrdered ? this.orderedWays(this.ways) : this.ways;
    var list = api.el('div', 'pwf-pwaylist');
    for (var i = 0; i < rows.length; i++) {
      var p = rows[i].split('+');
      var a = parseInt(p[0], 10), b = parseInt(p[1], 10);
      var row = api.el('div', 'pwf-pwayrow');
      var barw = api.el('span', 'pwf-pwaybar');
      var j;
      for (j = 0; j < a; j++) { var g1 = api.el('span', 'pwf-pdot'); g1.appendChild(this._printGlyph()); barw.appendChild(g1); }
      var split = api.el('span', 'pwf-pwaysplit'); split.setAttribute('aria-hidden', 'true');
      barw.appendChild(split);
      for (j = 0; j < b; j++) { var g2 = api.el('span', 'pwf-pdot'); g2.appendChild(this._printGlyph()); barw.appendChild(g2); }
      row.appendChild(barw);
      var nums = api.el('span', 'pwf-pwaynums');
      nums.textContent = a + '   ' + b;
      row.appendChild(nums);
      list.appendChild(row);
    }
    sheet.appendChild(list);
    return sheet;
  },

  /* ---- the upsell strip: non-modal, single-instance, self-expiring ---- */
  _gateInline: function (host, key) {
    var api = this.api;
    if (!host) return;
    var old = this._wrap.querySelector('.pwf-gate');
    if (old) old.remove();
    var g = api.el('div', 'pwf-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-part-whole-frame';
    a.target = '_top';
    a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  }
};

function injectPartWholeFrameCSS() {
  if (document.getElementById('pwf-style')) return;
  var st = document.createElement('style');
  st.id = 'pwf-style';
  st.textContent = ''
    + '.pwf-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;'
    +   '--pwf-dot:26px;--pwf-gap:7px;--pwf-pad:11px;--pwf-bw:2px;--pwf-hl:.38;'
    +   '--pwf-lift:0 2px 3px rgba(30,20,10,.20);--pwf-legh:26px;--pwf-legw:2;}'

    /* ---------- the teacher's stepper + quick numerals ---------- */
    + '.pwf-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;}'
    + '.pwf-headlbl{font-family:Nunito,system-ui,sans-serif;font-size:16px;color:#31665C;}'
    + '.pwf-headval{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-weight:700;font-size:46px;'
    +   'line-height:.95;min-width:2.5ch;text-align:center;color:#0F4A40;'
    +   'font-variant-numeric:tabular-nums;}'
    + '.pwf-step{min-width:44px;min-height:44px;border-radius:12px;border:2px solid rgba(20,107,94,.35);'
    +   'background:#FFFDF7;color:#146B5E;font-size:22px;line-height:1;cursor:pointer;}'
    + '.pwf-step:hover{background:#F3EADA;}'
    + '.pwf-step:focus-visible,.pwf-quickbtn:focus-visible,.pwf-peg:focus-visible,'
    +   '.pwf-waystoggle:focus-visible,.pwf-wayrow:focus-visible,'
    +   '.pwf-linkbtn:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    + '.pwf-quick{display:flex;gap:6px;}'
    + '.pwf-quickbtn{min-width:44px;min-height:44px;padding:0 10px;border-radius:12px;'
    +   'border:2px solid rgba(20,107,94,.28);background:#FFFDF7;color:#146B5E;'
    +   'font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-weight:700;font-size:19px;cursor:pointer;'
    +   'font-variant-numeric:tabular-nums;}'
    + '.pwf-quickbtn:hover{background:#F3EADA;}'
    + '.pwf-quickbtn[aria-current="true"]{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'

    /* ---------- the frame ----------
       width:fit-content is the whole layout story: the sheet sizes itself
       to the two dishes and the dishes size to the measured dot ladder, so
       there is no cap chain to walk and nothing that can be forgotten. */
    + '.pwf-sheet{position:relative;display:flex;flex-direction:column;align-items:center;'
    +   'width:fit-content;max-width:100%;padding:16px 14px 18px;background:#FFFDF7;'
    +   'border:2px solid rgba(20,107,94,.22);border-radius:18px;'
    +   'box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 6px 18px rgba(20,107,94,.08);}'
    + '.pwf-legspace{height:var(--pwf-legh);flex:0 0 auto;}'
    /* the connectors are an overlay in the sheet own pixel space, placed
       from MEASURED rects — never a percentage of a differently-sized box */
    + '.pwf-legs{position:absolute;left:0;top:0;pointer-events:none;overflow:visible;}'
    + '.pwf-leg{stroke:#2E7266;stroke-width:var(--pwf-legw);stroke-linecap:round;}'
    /* two co-equal tracks. Content can never size them, which is what made
       the two "co-equal" parts different widths in every locale before. */
    + '.pwf-parts{position:relative;display:grid;grid-template-columns:1fr 1fr;'
    +   'gap:calc(var(--pwf-gap) * 2.4);align-items:start;width:100%;}'
    + '.pwf-seam{position:absolute;left:50%;top:6%;bottom:6%;width:1px;'
    +   'background:rgba(20,107,94,.16);transform:translateX(-.5px);}'
    + '.pwf-box{position:relative;display:flex;flex-direction:column;align-items:center;'
    +   'gap:4px;min-width:0;justify-self:center;}'
    + '.pwf-cap{font-family:Nunito,system-ui,sans-serif;font-size:16px;color:#31665C;'
    +   'white-space:nowrap;min-height:22px;}'

    /* the tray IS the control, so it carries the tap floor. Its size is
       fixed by the row template, so covering it can never change its
       height and the two trays are identical by construction. */
    + '.pwf-dish{position:relative;display:grid;'
    +   'grid-template-columns:repeat(var(--pwf-cols,5),var(--pwf-dot));'
    +   'gap:var(--pwf-gap);padding:var(--pwf-pad);justify-content:center;align-content:center;'
    +   'border-radius:14px;'
    +   'background:linear-gradient(180deg,#EEE2CA 0%,#F4ECDC 34%,#F2E9D8 100%);'
    +   'border:2px solid #D6C4A3;border-bottom-color:#C2AB86;'
    +   'box-shadow:inset 0 3px 5px -2px rgba(93,72,45,.28),inset 0 -1px 0 rgba(255,255,255,.85),'
    +   '0 1px 0 rgba(255,255,255,.70);'
    +   'margin:0;font:inherit;color:inherit;box-sizing:content-box;}'
    + '.pwf-dish{grid-template-rows:repeat(var(--pwf-rows,2),var(--pwf-dot));}'
    /* an empty tray must read as an empty container, never as a bug: full
       border, full well shading, and a shadow of nothing on the floor */
    + '.pwf-dish:empty{background-image:linear-gradient(180deg,#EEE2CA 0%,#F4ECDC 34%,#F2E9D8 100%),'
    +   'radial-gradient(60% 34% at 50% 58%,rgba(93,72,45,.10) 0%,rgba(93,72,45,0) 72%);}'
    + '.pwf-dish-live{cursor:grab;touch-action:pan-y;}'
    + '.pwf-dish-live:hover{filter:brightness(1.02);}'
    + '.pwf-dish-live:active{cursor:grabbing;}'
    /* the cursor must agree with the model: carrying from an empty tray is
       already a modelled no-op, so it must not advertise a grab */
    + '.pwf-dish-live:empty{cursor:default;}'
    + '.pwf-dish-live:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
    /* the nest is a boundary drawn round a gathering, not a container you
       put things in — no rim, no well, a dashed edge and nothing else */
    + '.pwf-box-whole .pwf-dish{background:#FCF5E8;border:2.5px dashed rgba(20,107,94,.45);'
    +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.95);}'
    + '.pwf-dish.pwf-over{border-color:#146B5E;'
    +   'box-shadow:inset 0 3px 5px -2px rgba(93,72,45,.28),0 0 0 3px rgba(20,107,94,.18);}'
    + '.pwf-landed{animation:pwf-land 200ms ease-out;}'
    + '@keyframes pwf-land{0%,100%{box-shadow:inset 0 3px 5px -2px rgba(93,72,45,.28),'
    +   'inset 0 -1px 0 rgba(255,255,255,.85),0 1px 0 rgba(255,255,255,.70);}'
    +   '45%{box-shadow:inset 0 6px 9px -2px rgba(93,72,45,.44),'
    +   'inset 0 -1px 0 rgba(255,255,255,.85),0 1px 0 rgba(255,255,255,.70);}}'

    /* ---------- the numeral: the most-read object on the board ----------
       26px at 2560 was below the ~36px projector floor for a 6-metre room.
       tabular figures plus a reserved line so 9 -> 10 never shifts the
       board and the slot survives a cloth going on. */
    + '.pwf-num{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-weight:700;font-size:40px;'
    +   'line-height:1;min-height:1em;color:#0F4A40;font-variant-numeric:tabular-nums;}'
    + '.pwf-num-hidden{visibility:hidden;}'

    /* ---------- the counter ----------
       ONE pattern for all four shapes: the element is the EDGE and its
       ::before is the fill, inset by the border width. clip-path clips a
       real border away, so a concave shape cannot have one — and running
       both paths through the same construction means there is one thing to
       get right rather than two. */
    + '.pwf-dot{position:relative;display:block;width:var(--pwf-dot);height:var(--pwf-dot);'
    +   'flex:0 0 auto;padding:0;'
    +   '--fill:var(--c1-fill);--lit:var(--c1-lit);--shade:var(--c1-shade);'
    +   '--edge:var(--c1-edge);--edge-sm:var(--c1-edge-sm);--bwx:var(--c1-bwx,1);'
    /* ⚠ drop-shadow, not box-shadow: clip-path clips a box-shadow away, so
       a heart and a disc would rest on the tray differently. A filter
       follows the clipped silhouette, so all four shapes sit the same. */
    +   'background:var(--edge);filter:drop-shadow(var(--pwf-lift));}'
    + '.pwf-dot::before{content:"";position:absolute;'
    +   'inset:calc(var(--pwf-bw) * var(--bwx));'
    +   'background:radial-gradient(120% 100% at 50% 12%,rgba(255,255,255,var(--pwf-hl)) 0%,rgba(255,255,255,0) 46%),'
    +   'linear-gradient(180deg,var(--lit) 0%,var(--fill) 58%,var(--shade) 100%);'
    +   'box-shadow:inset 0 1px 0 rgba(255,255,255,.34),inset 0 -2px 0 rgba(0,0,0,.13);}'
    /* two-tone: colour is a property of the TRAY, so a counter takes the
       coat of the place it is in. In the nest the run is a-many c1 then
       b-many c2 — one unbroken group whose LENGTH never changes. */
    + '.pwf-wrap[data-tone="two"] .pwf-dot[data-side="b"]{'
    +   '--fill:var(--c2-fill);--lit:var(--c2-lit);--shade:var(--c2-shade);'
    +   '--edge:var(--c2-edge);--edge-sm:var(--c2-edge-sm);--bwx:var(--c2-bwx,1);}'
    /* ⚠ and it leaks through the cloth if you let it: a colour-coded nest
       answers "how many are hiding" for free. Covered, the nest goes to
       outline and the boundary disappears. */
    + '.pwf-wrap[data-tone="two"] .pwf-partcovered .pwf-box-whole .pwf-dot{background:#8FA8A2;}'
    + '.pwf-wrap[data-tone="two"] .pwf-partcovered .pwf-box-whole .pwf-dot::before{background:#FCF5E8;}'

    + '.pwf-wrap[data-shape="disc"] .pwf-dot,.pwf-wrap[data-shape="disc"] .pwf-dot::before{border-radius:50%;}'
    + '.pwf-wrap[data-shape="tile"] .pwf-dot{border-radius:26%;}'
    + '.pwf-wrap[data-shape="tile"] .pwf-dot::before{border-radius:21%;}'
    + '.pwf-wrap[data-shape="heart"] .pwf-dot,.pwf-wrap[data-shape="heart"] .pwf-dot::before{'
    +   'clip-path:polygon(50% 100%,12% 66%,1% 44%,3% 26%,15% 14%,31% 13%,44% 21%,50% 32%,'
    +   '56% 21%,69% 13%,85% 14%,97% 26%,99% 44%,88% 66%);}'
    /* ⚠ the star is the FAT variant (inner radius .52 of outer, not the
       classic .382). At .382 the notches are ~1.5px deep at the phone size
       and the negative space between neighbours stops being uniform, so a
       row of twenty stops being countable — which is the difference
       between a board a teacher can point at and one she has to count. */
    + '.pwf-wrap[data-shape="star"] .pwf-dot,.pwf-wrap[data-shape="star"] .pwf-dot::before{'
    +   'clip-path:polygon(50% 0%,66% 32%,100% 38.2%,76% 64.2%,80.9% 100%,50% 84%,'
    +   '19.1% 100%,24% 64.2%,0% 38.2%,34% 32%);}'

    + '.pwf-lifted{opacity:.42;filter:saturate(.7);}'
    + '.pwf-ghost{position:fixed;left:0;top:0;z-index:60;pointer-events:none;'
    +   'box-shadow:0 10px 18px rgba(30,20,10,.28);will-change:transform;}'
    + '.pwf-ghost-home{transition:transform 240ms cubic-bezier(.2,.8,.2,1);}'

    /* ---------- motion ----------
       260ms: long enough for a five-year-old to follow a token across
       ~200px, short enough that a child tapping repeatedly is never gated.
       The 22% keyframe lifts and enlarges slightly, because you pick a
       thing up before you move it. No arc (that says thrown), no bounce
       (that says landed correctly, and nothing here is correct or not). */
    + '@keyframes pwf-carry{'
    +   '0%{transform:translate(var(--dx),var(--dy)) scale(1);}'
    +   '22%{transform:translate(calc(var(--dx) * .78),calc(var(--dy) * .78 - 10px)) scale(1.06);}'
    +   '100%{transform:translate(0,0) scale(1);}}'
    + '.pwf-carrying{animation:pwf-carry 260ms cubic-bezier(.22,.72,.24,1) both;z-index:3;}'
    + '@keyframes pwf-arrive{from{opacity:.25;}to{opacity:1;}}'
    + '.pwf-arriving{animation:pwf-arrive 140ms linear both;}'
    + '@keyframes pwf-nudge{0%,100%{transform:translateX(0);}50%{transform:translateX(7px);}}'
    + '.pwf-nudge{animation:pwf-nudge 900ms cubic-bezier(.4,0,.4,1) 1;}'
    /* ⚠ THE NEST NEVER MOVES. The instant it twitches, the thesis is dead.
       The only thing it may do is change one coat, in place. */
    + '.pwf-box-whole .pwf-dot{animation:none !important;'
    +   'transition:background-color 180ms linear 200ms;}'
    + '.pwf-box-whole .pwf-dot::before{transition:background 180ms linear 200ms;}'

    /* ---------- the cloth ----------
       It OVERHANGS and it casts a shadow onto the tray, because that is
       the difference between "something is under here" and a disabled
       panel — a disabled panel is always exactly the size of the thing it
       disables and never shadows it. The 45-degree barber stripe the old
       build used is the universal vocabulary for unavailable, which is the
       wrong idea in the wrong language. */
    + '.pwf-cloth{position:absolute;inset:-6px -8px -10px -8px;z-index:2;pointer-events:none;'
    +   'border:0;padding:0;border-radius:16px 16px 20px 20px;'
    +   'background-color:#E3D3B4;'
    +   'background-image:radial-gradient(70% 120% at 50% 90%,rgba(120,96,60,.12),rgba(120,96,60,0) 60%),'
    +   'linear-gradient(103deg,rgba(255,255,255,0) 38%,rgba(255,255,255,.28) 42%,'
    +   'rgba(120,96,60,.10) 46%,rgba(255,255,255,0) 50%),'
    +   'radial-gradient(140% 100% at 50% 0%,rgba(255,255,255,.36),rgba(255,255,255,0) 55%),'
    +   'repeating-linear-gradient(90deg,rgba(255,255,255,.20) 0 1px,rgba(255,255,255,0) 1px 4px),'
    +   'repeating-linear-gradient(0deg,rgba(120,96,60,.10) 0 1px,rgba(120,96,60,0) 1px 4px);'
    +   'box-shadow:inset 0 2px 0 rgba(255,255,255,.55),'
    +   'inset 0 -8px 14px -8px rgba(93,72,45,.35),0 4px 8px rgba(93,72,45,.28);}'
    /* the peg: a folded corner of the same cloth, 44px of real button with
       mostly transparent padding, sitting at the container's corner */
    /* ⚠ THE CLEARANCE IS STRUCTURAL, NOT FITTED. Absolutely positioning
       the peg at the foot's right edge left it flush against the numeral
       on a phone — 0px apart, which every overlap check passed and which
       reads as one glyph. A three-track row (spacer | numeral | peg) puts
       a peg-width on BOTH sides of the number, so it stays centred under
       its container and the gap cannot close at any width. */
    + '.pwf-foot{display:grid;grid-template-columns:var(--pwf-peg,44px) 1fr var(--pwf-peg,44px);'
    +   'align-items:center;gap:8px;min-height:var(--pwf-peg,44px);}'
    + '.pwf-num{grid-column:2;text-align:center;}'
    + '.pwf-peg{grid-column:3;justify-self:center;'
    +   'width:var(--pwf-peg,44px);height:var(--pwf-peg,44px);'
    +   'display:flex;align-items:center;justify-content:center;'
    +   'border:0;background:transparent;padding:0;cursor:pointer;}'
    /* ⚠ the peg is the only control ON the apparatus, and a teacher points
       at it from across the room — so it rides the size ladder like every
       other part of the instrument rather than staying a 26px glyph on a
       2560 projector. Solid ink, not a hairline alpha. */
    + '.pwf-pegink{width:calc(var(--pwf-peg,44px) * .6);height:calc(var(--pwf-peg,44px) * .6);'
    +   'fill:none;stroke:#2E7266;stroke-width:1.9;'
    +   'stroke-linejoin:round;stroke-linecap:round;'
    +   'filter:drop-shadow(0 1px 1px rgba(255,253,247,.95));}'
    + '.pwf-peg[aria-pressed="true"] .pwf-pegink{fill:#DCC9A8;stroke:#8A6F45;}'
    + '.pwf-peg:hover .pwf-pegink{stroke:#146B5E;}'

    /* ---------- the written form ---------- */
    /* ⚠ THE FOUR-FACT NOTATION IS THE TALLEST THING ON THE BOARD, and
       stacked it is what pushed the controls 102px past the fold of a
       1920x950 desktop with a whole of 20. Two columns, wherever there is
       width for them — which is also the better reading: the two additions
       sit beside the two subtractions instead of running away down the
       page. */
    + '.pwf-notation{display:flex;flex-direction:column;align-items:center;gap:3px;'
    +   'min-height:38px;justify-content:center;}'
    + '.pwf-notation-fam{display:grid;grid-template-columns:1fr;gap:2px 22px;justify-items:center;}'
    + '@media (min-width:481px){.pwf-notation-fam{grid-template-columns:auto auto;}}'
    + '.pwf-nline{display:flex;align-items:baseline;gap:.10em;'
    +   'font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:34px;line-height:1.05;'
    +   'font-variant-numeric:tabular-nums;}'
    + '.pwf-nnum{font-weight:700;color:#146B5E;min-width:.7em;text-align:center;}'
    + '.pwf-nop{font-weight:500;color:#3C7C72;letter-spacing:.06em;padding:0 .18em;}'
    + '.pwf-notation-fam .pwf-nline{font-size:26px;}'
    + '.pwf-notation-off{min-height:0;}'

    /* ---------- controls ---------- */
    + '.pwf-controls{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
    + '.pwf-linkbtn{min-height:44px;padding:9px 16px;border-radius:12px;border:2px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer;}'
    + '.pwf-linkbtn:hover{background:#F3EADA;}'
    /* ⚠ A gated control must not read as a broken one — the recorded
       open-number-line defect. Full opacity, a coral edge that marks it
       as premium, and a lock glyph so the state is stated, not implied. */
    + '.pwf-locked{opacity:1;border-color:rgba(242,120,75,.55);color:#C2562F;}'
    + '.pwf-locked::before{content:"";display:inline-block;width:11px;height:13px;margin-right:7px;'
    +   'vertical-align:-1px;border:2px solid currentColor;border-radius:2px;border-top-width:6px;'
    +   'border-top-left-radius:7px;border-top-right-radius:7px;box-sizing:border-box;}'

    /* ---------- the frame and the record, side by side when there is room
       ⚠ CONTAINER query, not viewport. The old build asked the VIEWPORT at
       899px while the card was capped at 720, so the instrument was
       smaller at 1024 than at 899 — a non-monotonic layout no gate saw. */
    + 'body.pwf-wide .lcs-stage{container-type:inline-size;}'
    + '.pwf-main{display:grid;grid-template-columns:minmax(0,1fr);gap:16px;'
    +   'justify-items:center;width:100%;}'
    + '.pwf-col{display:flex;flex-direction:column;align-items:center;gap:10px;min-width:0;max-width:100%;}'
    /* ⚠ `auto`, not `1fr`, for the frame column. A 1fr track eats every
       spare pixel of a 2200px card and centres the sheet inside it, which
       pushes the frame and the record to opposite ends of the screen with
       a lake between them — two objects a teacher is meant to read
       together. `auto` lets the column hug the sheet and
       `justify-content:center` keeps the pair together in the middle. */
    + '@container (min-width:760px){'
    +   '.pwf-main{grid-template-columns:auto minmax(240px,320px);align-items:start;justify-content:center;}'
    + '}'
    + '@container (min-width:1400px){'
    +   '.pwf-main{grid-template-columns:auto minmax(300px,420px);gap:28px;}'
    + '}'

    /* ---------- all the ways ---------- */
    /* ⚠ THE RECORD IS A LOG AND LEGITIMATELY GROWS — so it scrolls inside
       its OWN box at every width, not only when it sits beside the frame.
       Capping it only in the side-by-side case is what pushed the last row
       38px past the fold of a 1024x900 desktop, where the card is still
       720px wide and the record therefore stacks.
       ⚠ px, not vh: `vh` inside a manipulative is the IFRAME's height, and
       this tool is embeddable. */
    + '.pwf-ways{width:100%;max-width:620px;padding:12px 14px;border-radius:14px;background:#FFFDF7;'
    +   'border:2px solid rgba(20,107,94,.18);max-height:290px;overflow-y:auto;}'
    + '@container (min-width:760px){.pwf-ways{max-width:none;max-height:560px;}}'
    + '@media (max-width:560px){.pwf-ways{max-height:none;overflow:visible;}}'
    + '.pwf-wayshead{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;}'
    + '.pwf-wayslbl{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:19px;color:#146B5E;}'
    + '.pwf-waystoggle{min-height:44px;min-width:44px;display:flex;align-items:center;justify-content:center;'
    +   'padding:6px 10px;border-radius:999px;border:1px solid rgba(20,107,94,.3);background:#FBF3E4;cursor:pointer;}'
    + '.pwf-waystoggle[aria-pressed="true"]{background:#146B5E;border-color:#146B5E;}'
    + '.pwf-orderink{width:20px;height:20px;fill:#3C7C72;}'
    + '.pwf-waystoggle[aria-pressed="true"] .pwf-orderink{fill:#FFFDF7;}'
    + '.pwf-wayshint{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#31665C;margin:4px 0 8px;}'
    + '.pwf-wayslist{display:flex;flex-direction:column;gap:5px;}'
    /* a row is the same MATERIAL as the board, so a pre-numerate child can
       read the record at all — and stacked, the colour boundary marches
       one step per row and the staircase appears without a word */
    + '.pwf-wayrow{display:flex;align-items:center;gap:10px;min-height:44px;width:100%;'
    +   'padding:5px 8px;border-radius:10px;background:#F3EADA;'
    +   'border:1.5px solid rgba(20,107,94,.18);cursor:pointer;text-align:start;}'
    + '.pwf-wayrow:hover{background:#EFE3CE;}'
    + '.pwf-waynow{border-color:#146B5E;box-shadow:inset 3px 0 0 #146B5E;}'
    /* ⚠ THE RECORD BAR IS ALWAYS DISCS, whatever the board is wearing.
       The bar is a NOTATION of the split — it sits beside the numerals and
       does the same job for a child who cannot read them — not the
       material itself. At the 13px a 240px panel affords, a star's notches
       are under a pixel and twenty of them stop being countable, which is
       the one thing this row exists to be. The two-tone boundary is what
       carries the meaning here, and it survives at any size. */
    + '.pwf-waybar{display:flex;flex-wrap:wrap;gap:3px;flex:1 1 auto;min-width:0;'
    +   '--pwf-dot:13px;--pwf-bw:1.25px;--pwf-hl:0;--pwf-lift:0 0 0 rgba(0,0,0,0);}'
    + '.pwf-waybar .pwf-dot,.pwf-waybar .pwf-dot::before{'
    +   'clip-path:none !important;border-radius:50% !important;}'
    + '.pwf-waybar .pwf-dot::before{box-shadow:none;}'
    /* the blinded row: outline counters, no boundary, exactly like the
       nest under a cloth */
    + '.pwf-wayblind .pwf-dot{background:#8FA8A2;}'
    + '.pwf-wayblind .pwf-dot::before{background:#F3EADA;}'
    + '.pwf-waynums{display:flex;gap:6px;flex:0 0 auto;}'
    + '.pwf-waycell{min-width:26px;text-align:center;'
    +   'font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-weight:700;font-size:19px;color:#0F4A40;'
    +   'font-variant-numeric:tabular-nums;}'

    + '.pwf-gate{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;'
    +   'margin:0 0 8px;padding:9px 13px;border-radius:12px;background:#FBE6DA;'
    +   'border:1px solid rgba(242,120,75,.45);font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#8A3B1B;}'
    + '.pwf-gate a{color:#C2562F;font-weight:700;}'

    + '.pwf-printmat,.pwf-printways{display:none;}'

    /* ---------- the measured ladder ----------
       ⚠ MEASURED, NOT DERIVED. A clamp() computing the dot from a track
       width reads elegantly and puts a formula between the operator and
       the thing on screen. These came out of the sweep, and the sweep is
       what may change them.
       ⚠ AND HEART AND STAR NEVER GO BELOW 16px: at 14 a star's notches are
       ~1.5px and a row of twenty stops being countable. */
    + '@media (max-width:480px){'
    +   '.pwf-wrap{--pwf-dot:19px;--pwf-gap:4px;--pwf-pad:7px;--pwf-bw:1.25px;--pwf-hl:0;'
    +     '--pwf-lift:0 1px 1px rgba(30,20,10,.18);--pwf-legh:22px;--pwf-legw:1.75;}'
    +   '.pwf-sheet[data-dense="1"]{--pwf-dot:16px;--pwf-gap:4px;--pwf-pad:6px;}'
    +   '.pwf-headval{font-size:34px;}'
    +   '.pwf-num{font-size:30px;}'
    +   '.pwf-nline{font-size:26px;}'
    +   '.pwf-notation-fam .pwf-nline{font-size:21px;}'
    +   '.pwf-cap,.pwf-headlbl{font-size:14px;}'
    +   '.pwf-sheet{padding:12px 10px 14px;}'
    + '}'
    + '@media (min-width:481px){.pwf-sheet[data-dense="1"]{--pwf-dot:20px;}}'
    /* ⚠ 1024x900 IS THE TIGHTEST NON-PHONE VIEWPORT THIS TOOL MEETS, and
       not because it is small: the shell still caps the card at 720px
       there, so the record STACKS under the frame instead of sitting
       beside it, and the whole column has to fit 900px. The four-row
       sizes here are set by that state, measured. */
    + '@media (min-width:1024px){'
    +   '.pwf-wrap{--pwf-dot:30px;--pwf-gap:8px;--pwf-pad:12px;--pwf-legh:24px;}'
    +   '.pwf-sheet[data-dense="1"]{--pwf-dot:24px;}'
    +   '.pwf-sheet[data-dense="1"] ~ * .pwf-num,.pwf-sheet[data-dense="1"] .pwf-num{font-size:34px;}'
    /* the last of the margin comes out of the GAPS, not the type — the
       numerals are the most-read thing on the board and are the last
       thing that should shrink to make a fold */
    +   '.pwf-wrap{gap:10px;}.pwf-col{gap:8px;}.pwf-main{gap:12px;}'
    +   '.pwf-wayshint{margin:2px 0 6px;}'
    + '}'
    /* ⚠ 1080 IS UNREACHABLE ON A 1920x1080 MONITOR once browser chrome is
       taken off, so the old build's second tier never fired on the most
       common classroom display in the world. The floors here are what a
       real window actually reports. */
    /* ⚠ AND THE COLUMN LADDER RIDES ON TOP OF THE VIEWPORT LADDER at every
       wide tier. Fewer columns means a bigger counter, so a whole of six
       fills a projector instead of sitting in a 392px sheet inside a
       1300px card. `[data-dense]` comes LAST in each block: three rows or
       more is height-constrained and its size wins, and equal-specificity
       ties are settled by order. */
    + '@media (min-width:1367px) and (min-height:800px){'
    +   '.pwf-wrap{--pwf-dot:40px;--pwf-gap:10px;--pwf-pad:15px;--pwf-bw:2.5px;--pwf-hl:.44;--pwf-peg:52px;'
    +     '--pwf-lift:0 3px 5px rgba(30,20,10,.22);--pwf-legh:32px;--pwf-legw:2.5;}'
    +   '.pwf-sheet[data-cols="1"],.pwf-sheet[data-cols="2"]{--pwf-dot:70px;--pwf-gap:16px;--pwf-pad:22px;}'
    +   '.pwf-sheet[data-cols="3"]{--pwf-dot:58px;--pwf-gap:14px;--pwf-pad:20px;}'
    +   '.pwf-sheet[data-cols="4"]{--pwf-dot:48px;--pwf-gap:12px;--pwf-pad:17px;}'
    +   '.pwf-sheet[data-dense="1"]{--pwf-dot:30px;--pwf-gap:9px;--pwf-pad:15px;}'
    +   '.pwf-headval{font-size:56px;}.pwf-num{font-size:44px;}'
    +   '.pwf-nline{font-size:44px;}.pwf-notation-fam .pwf-nline{font-size:32px;}'
    +   '.pwf-cap,.pwf-headlbl{font-size:18px;}'
    +   '.pwf-step,.pwf-quickbtn{min-width:52px;min-height:52px;}'
    + '}'
    /* ⚠ THE FOUR-ROW STATE IS THE BINDING ONE AT EVERY WIDE TIER, and the
       ladder is set by it: a whole of 20 with the four-fact notation is
       the tallest thing this board can be, and it has to fit a 1920x950
       desktop — the operator's viewport, and the one the DoD measures
       hardest. The two-row sizes are free to be generous because they are
       never the constraint. Measured in the sweep; the sweep is what may
       change them. */
    + '@media (min-width:1800px) and (min-height:940px){'
    /* ⚠ 950 OF 950 IS NOT A PASS, IT IS A COINCIDENCE WAITING TO END —
       the recorded "a constant fitted to a knife edge" trap. The trim
       below buys ~30px of real margin at 1920x950, which is the operator's
       viewport and the tightest one this tool has to survive. */
    +   '.pwf-wrap{--pwf-dot:50px;--pwf-gap:13px;--pwf-pad:19px;--pwf-legh:24px;--pwf-legw:3;--pwf-peg:60px;}'
    +   '.pwf-sheet[data-cols="1"],.pwf-sheet[data-cols="2"]{--pwf-dot:78px;--pwf-gap:18px;--pwf-pad:24px;}'
    +   '.pwf-sheet[data-cols="3"]{--pwf-dot:66px;--pwf-gap:16px;--pwf-pad:21px;}'
    +   '.pwf-sheet[data-cols="4"]{--pwf-dot:56px;--pwf-gap:14px;--pwf-pad:19px;}'
    +   '.pwf-sheet[data-dense="1"]{--pwf-dot:32px;--pwf-gap:10px;--pwf-pad:14px;}'
    +   '.pwf-headval{font-size:64px;}.pwf-num{font-size:44px;}'
    +   '.pwf-nline{font-size:50px;}.pwf-notation-fam .pwf-nline{font-size:31px;}'
    +   '.pwf-cap,.pwf-headlbl{font-size:20px;}'
    +   '.pwf-step,.pwf-quickbtn{min-width:60px;min-height:60px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   '.pwf-wrap{--pwf-dot:58px;--pwf-gap:16px;--pwf-pad:23px;--pwf-legh:44px;--pwf-legw:3.5;--pwf-peg:66px;}'
    +   '.pwf-sheet[data-cols="1"],.pwf-sheet[data-cols="2"]{--pwf-dot:130px;--pwf-gap:28px;--pwf-pad:34px;}'
    +   '.pwf-sheet[data-cols="3"]{--pwf-dot:106px;--pwf-gap:23px;--pwf-pad:29px;}'
    +   '.pwf-sheet[data-cols="4"]{--pwf-dot:88px;--pwf-gap:20px;--pwf-pad:26px;}'
    +   '.pwf-sheet[data-dense="1"]{--pwf-dot:46px;}'
    +   '.pwf-headval{font-size:80px;}.pwf-num{font-size:72px;}'
    +   '.pwf-nline{font-size:64px;}.pwf-notation-fam .pwf-nline{font-size:44px;}'
    +   '.pwf-cap,.pwf-headlbl{font-size:22px;}'
    +   '.pwf-step,.pwf-quickbtn{min-width:64px;min-height:64px;}'
    +   'body.pwf-wide .lcs-app{max-width:min(2200px,94vw);}'
    + '}'

    /* long compound titles break mid-word at 360 (the shell .lcs-title
       carries overflow-wrap:anywhere) — stack the header instead. */
    + 'body.pwf-wide .lcs-header{flex-direction:column;}'
    /* the card must fill the viewport, or a 1920x1080 desktop shows ~260px
       of dead cream below it. #lcs-root carries no height of its own, so
       .lcs-app{height:100%} resolves against auto and collapses. The house
       precedent is picture-word-wall. */
    + 'body.pwf-wide #lcs-root{height:100%;min-height:0;}'
    /* ⚠ PHONE SCROLL OPT-IN (the letter-studio precedent). The shell sets
       html, body { height:100%; overflow:hidden }, so anything past the
       fold is not merely off-screen — it is UNREACHABLE. */
    + '@media (max-width:560px){body.pwf-wide{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}'
    +   'body.pwf-wide #lcs-root{height:auto;}}'

    + '@media (prefers-reduced-motion:reduce){'
    +   '.pwf-carrying,.pwf-nudge,.pwf-landed,.pwf-ghost-home{animation:none !important;transition:none !important;}'
    +   '.pwf-box-whole .pwf-dot,.pwf-box-whole .pwf-dot::before{transition:none !important;}'
    + '}'

    /* =====================================================================
       PRINT — a worksheet in line art, not a greyscale screenshot.
       Page 1 is a MAT the child puts real counters on; page 2 is the ways
       this class found. The screen palette is tuned to sit on cream under
       a projector and prints nearly blank if it is carried over, which is
       exactly what the letter-studio print defect was — so the printed
       pages are their own DOM and none of the screen ink reaches paper.
       ===================================================================== */
    + '@media print{'
    +   '*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
    +   '@page{margin:14mm;}'
    /* ⚠ SCOPED TO THE PAID CLASS. Unscoped, these hid the entire screen
       for everybody while the printed pages exist only for a subscriber —
       so a free Ctrl+P produced a blank sheet. Gating the chip is not
       gating the feature. */
    +   'body.pwf-paid .lcs-header,body.pwf-paid .pwf-head,body.pwf-paid .pwf-controls,'
    +     'body.pwf-paid .pwf-ways,body.pwf-paid .pwf-gate,body.pwf-paid .pwf-main,'
    +     'body.pwf-paid .pwf-sheet,body.pwf-paid .pwf-notation,body.pwf-paid .pwf-peg,'
    +     'body.pwf-paid .pwf-cloth{display:none !important;}'
    +   'body.pwf-paid .pwf-printmat{display:block !important;break-after:page;page-break-after:always;}'
    +   'body.pwf-paid .pwf-printways{display:block !important;}'
    +   '.pwf-printhead{font-family:"Baloo 2",Nunito,sans-serif;font-weight:700;font-size:16pt;'
    +     'color:#000;margin:0 0 8mm;}'
    +   '.pwf-pframe{display:flex;flex-direction:column;align-items:center;gap:10mm;}'
    +   '.pwf-pbox{display:flex;flex-direction:column;align-items:center;gap:3mm;}'
    +   '.pwf-pcap{font-family:Nunito,sans-serif;font-size:11pt;color:#000;}'
    +   '.pwf-pdish{display:grid;grid-template-columns:repeat(5,7mm);gap:3mm;padding:4mm;'
    +     'border:1.2pt solid #333;border-radius:3mm;justify-content:center;}'
    +   '.pwf-pdish{grid-template-rows:repeat(var(--pwf-prows,2),7mm);'
    +     'grid-template-columns:repeat(var(--pwf-pcols,5),7mm);}'
    +   '.pwf-pbox-whole .pwf-pdish{border-style:dashed;}'
    +   '.pwf-pdish-empty{min-height:20mm;}'
    +   '.pwf-pnum{font-family:"Baloo 2",Nunito,sans-serif;font-weight:700;font-size:22pt;'
    +     'color:#000;min-height:1em;}'
    +   '.pwf-pdot{display:block;width:7mm;height:7mm;}'
    +   '.pwf-pglyph{width:100%;height:100%;fill:none;stroke:#222;stroke-width:2;stroke-linejoin:round;}'
    +   '.pwf-pjoin{width:60mm;height:0;border-top:1.2pt solid #333;}'
    +   '.pwf-pparts{display:flex;gap:12mm;justify-content:center;}'
    +   '.pwf-pwaylist{display:flex;flex-direction:column;gap:5mm;}'
    +   '.pwf-pwayrow{display:flex;align-items:center;gap:6mm;page-break-inside:avoid;break-inside:avoid;}'
    +   '.pwf-pwaybar{display:flex;align-items:center;gap:1.6mm;flex:1 1 auto;}'
    +   '.pwf-pwaybar .pwf-pdot{width:5mm;height:5mm;}'
    +   '.pwf-pwaysplit{width:0;height:7mm;border-left:.6pt solid #999;margin:0 2mm;}'
    +   '.pwf-pwaynums{font-family:"Baloo 2",Nunito,sans-serif;font-weight:700;font-size:14pt;'
    +     'color:#000;white-space:pre;font-variant-numeric:tabular-nums;}'
    + '}';
  document.head.appendChild(st);
}
