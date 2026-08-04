/* =====================================================================
   TOOL #1b — THE TEN FRAME   (ten-frame.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). One of the toolkit's three ORIGINAL manipulatives,
   brought to the v4 standard; NOT a new catalog slot.

   ⚠⚠ THE KEY AND ALL ELEVEN NATIVE SLUGS ARE UNCHANGED AND MUST STAY
   THAT WAY. `ten-frame` is an indexed URL with live search equity and
   its title is the established head term in every one of the eleven
   languages — `Zehnerfeld`, `Cadre de dix`, `Tienraam`, `Tioram`,
   `Tierramme`, `Kymmenruudukko`. This is the SECOND build (after #1
   number-line) where the native panels MUST NOT rename the tool.

   THE FRAME · THE COUNTER · THE TRAY. Three named parts, and nothing
   else in this tool gets a noun.
   ⚠ The noun census across all 47 shipped tools leaves almost nothing:
   `board` is blending-board / center-board / home-language-bridge /
   part-whole-frame; `strip` is pattern-bench and #41; `track` and
   `rail` are #37 in every non-EN locale; `line` is #1 in all eleven;
   `tape` #40, `strand` #41, `plank` #42, `column`/`scale` #43,
   `ladder` measurement-bench, `bag` #38, `lid` #39. `frame`, `cell`,
   `counter` and `tray` were free — and `frame` is this tool's own head
   term already, in all eleven.

   ⚠⚠ WHY THIS BUILD EXISTS. Two independent reasons, both measured.

   (1) THE FILE WAS 3,940 BYTES — the smallest tool in a 47-key
   catalogue whose median is ~55,000 and whose largest is 123,123 — and
   its only original content was a media-query font ramp. Everything
   else was `TenFrameCore.*` assignment. It sits at `TOOL_KEYS[0]`.

   (2) THE LANDING PAGE HAS SOLD A DIFFERENT TOOL IN ELEVEN LOCALES
   SINCE LAUNCH. `frontend/messages/tool-content/en.json`, verbatim:
       tagline      "Build numbers to 10 and 20"
       metaDesc     "Drag counters to build numbers…"
       about[0]     "lets a child drag counters into the frame and watch
                     each number take shape"
       howToUse[0]  "ask them to show a number by dragging counters
                     into the boxes"
       howToUse[1]  "Fill the top row first, then the bottom, so
                     children build the habit of seeing ten as two
                     fives"
       howToUse[2]  "Ask 'how many more to make ten?'"
       ideas[1]     "ask children to say its partner to ten (a 4 needs
                     6 more)"
   There was no drag, no five-structure and no complement. ⭐ AND THE
   DIRECTION OF THE FIX IS FORCED, exactly as it was for #1: §21.5a
   freezes the copy on indexed pages until ~2026-09-01, so the page
   could not be corrected — the TOOL had to be. The published copy
   therefore SCOPES this build, and note what it does NOT mention: a
   task, a target, a score or a question.

   THE ROUTINE — "How many more?"
     Set a number. Nobody says it yet. "How much room is left?" — the
     tray answers, because the counters in it are the answer and they
     can be counted. Take one out, put it in. Ask again.
     Scatter them. "Is it still seven?" — hands up, argue, then Tidy,
     and watch seven counters march into place, still seven.
     Then change ONE thing — the field — and ask what moved.

   THE ONE THESIS — THE BOUNDED COMPLEMENT. The frame's capacity is
   fixed and VISIBLE, so the unfilled part is a THING, not an absence.
   A quantity and its distance-to-full occupy the same picture and are
   read in the same glance, without either being asked for.
   ⚠ On PAPER this is free — ink and white are equally present. On a
   SCREEN it is not: `--lcs-surface` cells read as background, so a
   child parses three empty cells as "nothing there". That is why the
   complement needed an invention and not a settings toggle.

   THREE INVENTIONS:
     1. ⭐ THE GHOST AND THE TRAY ARE ONE NUMBER IN TWO FORMS. Unfilled
        cells render as recessive MATERIAL in place (the ghost — where
        the room is), and a bounded tray holds exactly `cap − count`
        real counters (how much is left, as objects you can pick up).
        Both are DERIVED on every read and neither is stored, so there
        is no state in which they can disagree. THE COUNTERS RUN OUT,
        so over-filling is UNREPRESENTABLE rather than guarded, and
        "how many more?" is answered by the material.
     2. THE SCATTER AND THE TIDY. The model is a SET of occupied cells,
        so a counter may be put anywhere. One control collapses any
        arrangement to canonical while the number visibly does not
        change. "Is it still seven?" is a real cardinality probe and
        nothing on this platform asks it — rekenrek structurally
        cannot (its rod is ordinal) and part-whole-frame has no
        positions.
     3. THE SAME COUNTERS, A DIFFERENT FIELD. Capacity and shape belong
        to the FRAME, not to the number. Switch fields under a fixed
        quantity and 13 goes from "a full 2x5 and three" to "one row of
        ten complete, and three" without a counter moving.

   ⚠ THE GEOMETRY CORRECTION, and it changed this build. The catalog
   directive (`premium-tools-v4.md:802`) says the German Zwanzigerfeld
   carries a *Kraft der Fünf* break, so "a US ten-frame widget is not
   foreign here, it is WRONG". That is right about the market and
   slightly wrong about the geometry: on a 2x5 frame each ROW IS FIVE
   and the line between the rows already IS the five-structure —
   there is nothing to add. The break belongs on the TWENTY, and the
   twenty is where the shipped tool was actually wrong: it drew two
   2x5 frames side by side (`ten-frame-core.js:177`), which is the
   AMERICAN double ten-frame. The Zwanzigerfeld is ONE 2x10 block with
   a five-break between columns 5 and 6. In it, 13 reads as one row of
   ten complete and three — one line, one ten — which is the base-ten
   reading the material exists to produce.

   ⭐⭐ AND ON THE FIVE-STRUCTURE THE NAME IS TAKEN TWICE WHILE THE
   GEOMETRY IS FREE. `number-talk-easel-strings.json:63` and
   `rekenrek-seqs.json:154` both ship de "Kraft der Fünf" as a named
   repertoire entry. But nothing anywhere DRAWS a five-break — the
   rekenrek carries its five-structure as BEAD COLOUR and the
   printable primitive has none. So this tool takes the half nobody
   has: a structural break, drawn and never named. That is also
   strictly better than colour by the house rule *differ in KIND, not
   hue* — a line survives a washed-out projector and a colour-blind
   child.

   ⚠ THE FENCE — FOUR SURFACES, RUN FRESH. It came back occupied on
   nine verbs, and per §23.3 each is SUBTRACTED, not negotiated:
     TAKEN — flash / curtain / "how did you see it": `number-talk-easel`
       names ten frame AND double ten frame in its own ladder (:62-63)
       and really draws one (`.nte-tf`, :995-1016). ⭐ The mirror-guard
       is clean: its frame carries `aria-hidden="true"` (:1002) — IT IS
       A PICTURE. Ours is a keyboard-operable grid of <button>s.
       *The easel's frame cannot be touched; ours cannot be hidden.*
     TAKEN — covering a known quantity, FOUR TIMES OVER: `rekenrek`
       owns "How many are hiding?" BY NAME and as content
       (`rekenrek-seqs.json` round `q_hiding`); `part-whole-frame`
       ships THREE cloths in its FREE tier; `number-balance` has a pan
       cloth; the easel owns the curtain. `lids.js:474-484` already
       recorded this verb DEAD when #39 tried to claim it.
       ⚠⚠ AND A REVIEWER WILL CONFUSE THIS WITH THE GHOST, SO: a COVER
       hides a KNOWN quantity to be recalled. A GHOST reveals an
       UNFILLED region to be counted. They are opposites.
     TAKEN — tap-to-tint groupings ("I saw 5 and 3"): the easel, :27.
       So the child-side tint is refused; a teacher-set STATIC split
       stays, because the platform's own printable primitive already
       ships two-colour a/b counters and it is the house convention on
       paper.
     TAKEN — the five-structure ON A ROD: `rekenrek`, as bead colour.
     TAKEN — whole-and-two-parts: `part-whole-frame`. Including the
       FLIP, because a flip is a carry with fewer steps and
       carry-under-conservation is that tool's entire soul.
     TAKEN — the difference as its own object: #42 comparison-planks.
     TAKEN — carrying a counter between two frames: part-whole-frame
       (:70-71), its sole affordance.
     TAKEN — the 1-100 grid: A7 Hundred Field (unbuilt) +
       `choral-counting` + `place-value-lab`.
     TAKEN — the make-ten STRATEGY: five owners, and the catalog
       already rejected *Ten Bridge* as "the densest square inch on the
       platform… remainder ≈ zero", listing `ten-frame` among them.
       So this tool shows the hole and says nothing about crossing it.
     TAKEN — tasks, targets, Check, verdict: the EIGHT rows in
       `ten-frame-activities.json`, which share `ten-frame-core.js`.
     REMAINDER, measured: the bounded complement shown and never
       asked, and the five-structured canonical arrangement drawn as
       geometry, at 5, 10 and 20, in each nation's own field.

   REFUSES, FOREVER — each one gated:
     1. NEVER ASKS. No task, target, prompt, Check, keypad answer, `?`
        or right/wrong. The tool SHOWS.
     2. NO SCORE, TIMER, STREAK, CELEBRATION or PROGRESS.
     3. NEVER FLASHES OR HIDES. No curtain, no cover, no shutter.
     4. NEVER ASKS WHAT IS UNDER SOMETHING. Four owners.
     5. NEVER CARRIES A COUNTER BETWEEN TWO FRAMES.
     6. NO FLIPPABLE BICOLOUR COUNTER.
     7. NO BOND DIAGRAM — no circles, no Zahlenhaus, no splitshuis, no
        maison des nombres. (The catalog records those three are
        INCOMPATIBLE diagrams for one concept — an authoring hazard
        this tool does not need.)
     8. NO >, <, =, TILT or COMPARISON VERDICT.
     9. NO DIFFERENCE CARRIED OFF AS AN OBJECT.
    10. NO EQUATION ON THE STAGE. The split SHOWS a decomposition;
        writing it is words in disguise.
    11. NO CAPACITY OTHER THAN 5, 10 AND 20. A ten-frame that holds
        twelve is not a ten-frame — the BOUND is the thesis, so a
        settable bound destroys it.
    12. NO THEMED COUNTERS on the instrument. A counter's only property
        is *there is one here*. Themes belong to the activities.
    13. NO AUTO-COUNT and NO COUNTING ALOUD. The easel owns Count-it.
    14. THE NUMERAL IS OFF BY DEFAULT (operator-ruled). `rekenrek.js:26`
        states the principle: the physical rack has none, and that
        absence is pedagogy.
    15. NEVER SPEAKS. TTS is reliable in 5 of 11 locales (§23.2).
    16. NO RECORD ABOUT A CHILD.
    17. NO MAKE-TEN STRATEGY STEP or bridging animation.

   ⚠ 0 lines to lcs-shell.{js,css}. 0 lines to ten-frame-core.js from
   THIS file — it is loaded by `ten-frame-activity.html` only, and the
   eight shipped activities are structurally out of blast radius. The
   precedent and the bar is `part-whole-frame.js:103-108`: "0 bytes are
   read from number-bond-core.js… consuming it would risk six shipped
   activities for no gain." Here it is eight.
   ===================================================================== */

(function () {
  'use strict';

  /* =====================================================================
     THE GEOMETRY TABLE.

     `panes` frames side by side, each `cols` x `rows`. `brk` lists the
     COLUMN indices a structural five-break falls on, and it is empty
     wherever the row itself already is the five.

     ⚠ MEASURED, NOT ASSUMED — and one entry is the whole reason this
     build exists. `twentypair` (what shipped) and `twentyfield` (the
     Zwanzigerfeld) hold the same twenty counters and teach different
     decompositions of the same number. Both stay; the DEFAULT is a
     per-locale ruling, not a global one.
     ===================================================================== */
  var GEOM = {
    five:        { panes: 1, cols: 5,  rows: 1, brk: [] },
    ten:         { panes: 1, cols: 5,  rows: 2, brk: [] },
    tenrow:      { panes: 1, cols: 10, rows: 1, brk: [5] },
    twentyfield: { panes: 1, cols: 10, rows: 2, brk: [5] },
    twentypair:  { panes: 2, cols: 5,  rows: 2, brk: [] }
  };
  var GEOM_KEYS = ['five', 'ten', 'tenrow', 'twentyfield', 'twentypair'];
  var ORDERS = ['rows', 'pairs'];

  /* ⚠ EVERY LOCALE SHIPS `default` UNTIL ITS NATIVE ENSEMBLE RULES —
     `part-whole-frame.js:117-122` verbatim, and the reason it exists:
     a renderer-true per-locale claim is a fact about a school system
     and this file may not assert one it has not been given. `de` is
     the single exception because the finding is operator-recorded in
     the approved catalog. Every other locale is a HYPOTHESIS for its
     panel, and hypotheses do not ship. */
  var GEOMETRY_BY_LOCALE = {
    'default': { single: 'ten', twenty: 'twentypair' },
    de:        { single: 'ten', twenty: 'twentyfield' }
  };
  function geometryFor(loc) {
    return GEOMETRY_BY_LOCALE[loc] || GEOMETRY_BY_LOCALE['default'];
  }

  var TenFrame = {
    id: 'ten-frame',

    /* ---------------------------------------------------------------
       STRINGS — EN authored here; the other ten are REBUILT (never
       translated) by a three-person NATIVE panel per locale, §A.13.48.
       ⚠ DO NOT HAND-EDIT A LOCALE IN THIS FILE. SoT is
       scripts/_ten-frame-strings.js, applied by
       scripts/apply-ten-frame-locales.js. ONE PHYSICAL LINE PER KEY —
       the applier does a surgical single-locale swap on that line and
       dies rather than reflow a file the verify gate reads by line.
       ⚠⚠ `title` IS NOT NEGOTIABLE (see the header). No string may
       carry a verdict, a score word, an equation, or ask a question
       that has an answer.
       --------------------------------------------------------------- */
    strings: {
      title: {en:'Ten Frame',de:'Zehnerfeld',fr:'Cadre de dix',it:'Tabella del dieci',es:'Marco de diez',pt:'Quadro de dez',nl:'Tienraam',sv:'Tioram',da:'Tierramme',no:'Tierramme',fi:'Kymmenruudukko'},
      instruction: {en:'Put counters in the frame — and look at how much room is left.',de:'Lege Plättchen ins Feld — und schau, wie viel Platz noch frei ist.',fr:'Place des jetons dans le cadre — et regarde la place qui reste.',it:'Metti i gettoni nella tabella — e guarda quanto posto resta.',es:'Pon fichas en el marco — y mira cuánto sitio queda.',pt:'Coloque fichas no quadro — e veja quanto espaço sobra.',nl:'Leg fiches in het raam — en kijk hoeveel plaats er nog vrij is.',sv:'Lägg brickor i ramen — och titta hur mycket plats som är kvar.',da:'Læg brikker i rammen — og se, hvor meget plads der er tilbage.',no:'Legg brikker i rammen — og se hvor mye plass som er igjen.',fi:'Aseta nappuloita ruudukkoon — ja katso, paljonko tilaa on jäljellä.'},

      /* the five field chips. ⚠ EACH IS A WHOLE AUTHORED PHRASE, never
         a label glued to a number — `part-whole-frame.js:449-451`
         records that construction breaking Finnish case-marking, found
         by three ensembles. */
      fieldFive: {en:'Frame of five',de:'Fünferfeld',fr:'Cadre de cinq',it:'Tabella del cinque',es:'Marco de cinco',pt:'Quadro de cinco',nl:'Vijfraam',sv:'Femram',da:'Femramme',no:'Femramme',fi:'Viiden ruudukko'},
      fieldTen: {en:'Frame of ten',de:'Zehnerfeld',fr:'Cadre de dix',it:'Tabella del dieci',es:'Marco de diez',pt:'Quadro de dez',nl:'Tienraam',sv:'Tioram',da:'Tierramme',no:'Tierramme',fi:'Kymmenen ruudukko'},
      fieldTenRow: {en:'Ten in a row',de:'Zehnerstreifen',fr:'Dix en ligne',it:'Dieci in fila',es:'Diez en fila',pt:'Dez em fila',nl:'Tien op een rij',sv:'Tio på rad',da:'Ti på række',no:'Ti på rad',fi:'Kymmenen rivissä'},
      fieldTwentyField: {en:'Field of twenty',de:'Zwanzigerfeld',fr:'Cadre de vingt',it:'Tabella del venti',es:'Marco de veinte',pt:'Quadro de vinte',nl:'Twintigveld',sv:'Tjugofält',da:'Tyvefelt',no:'Tjuefelt',fi:'Kahdenkymmenen kenttä'},
      fieldTwentyPair: {en:'Two frames of ten',de:'Zwei Zehnerfelder',fr:'Deux cadres de dix',it:'Due tabelle del dieci',es:'Dos marcos de diez',pt:'Dois quadros de dez',nl:'Twee tienramen',sv:'Två tioramar',da:'To tierrammer',no:'To tierrammer',fi:'Kaksi kymmenruudukkoa'},

      /* the stage controls */
      tidyBtn: {en:'Tidy',de:'Ordnen',fr:'Ranger',it:'Riordina',es:'Ordenar',pt:'Arrumar',nl:'Ordenen',sv:'Ordna',da:'Ordn',no:'Ordne',fi:'Järjestä'},
      fillBtn: {en:'Fill the rest',de:'Rest auffüllen',fr:'Compléter',it:'Completa',es:'Completar',pt:'Completar',nl:'Aanvullen',sv:'Fyll resten',da:'Fyld resten',no:'Fyll resten',fi:'Täytä loput'},
      keepsBtn: {en:'Keeps',de:'Merkfelder',fr:'Mes cadres',it:'I miei quadri',es:'Mis marcos',pt:'Meus quadros',nl:'Bewaarde ramen',sv:'Sparade ramar',da:'Gemte rammer',no:'Lagrede rammer',fi:'Talteen'},
      routinesBtn: {en:'Routines',de:'Übungsfolgen',fr:'Séries',it:'Percorsi',es:'Secuencias',pt:'Sequências',nl:'Reeksen',sv:'Serier',da:'Serier',no:'Serier',fi:'Sarjat'},
      printBtn: {en:'Print',de:'Drucken',fr:'Imprimer',it:'Stampa',es:'Imprimir',pt:'Imprimir',nl:'Afdrukken',sv:'Skriv ut',da:'Print',no:'Skriv ut',fi:'Tulosta'},

      /* the drawer */
      counterLabel: {en:'Counters',de:'Plättchen',fr:'Jetons',it:'Gettoni',es:'Fichas',pt:'Fichas',nl:'Fiches',sv:'Brickor',da:'Brikker',no:'Brikker',fi:'Nappulat'},
      showNumber: {en:'Show the number',de:'Zahl anzeigen',fr:'Afficher le nombre',it:'Mostra il numero',es:'Mostrar el número',pt:'Mostrar o número',nl:'Getal tonen',sv:'Visa talet',da:'Vis tallet',no:'Vis tallet',fi:'Näytä luku'},
      uprightLabel: {en:'Stand it upright',de:'Hochkant stellen',fr:'Mettre debout',it:'Metti in verticale',es:'Poner de pie',pt:'Pôr em pé',nl:'Rechtop zetten',sv:'Ställ på höjden',da:'Stil på højkant',no:'Sett på høykant',fi:'Pystyasentoon'},
      orderLabel: {en:'Filling order',de:'Reihenfolge',fr:'Ordre de remplissage',it:'Ordine di riempimento',es:'Orden de llenado',pt:'Ordem de preenchimento',nl:'Volgorde van vullen',sv:'Ordning',da:'Rækkefølge',no:'Rekkefølge',fi:'Täyttöjärjestys'},
      orderRows: {en:'Row by row',de:'Reihe für Reihe',fr:'Ligne par ligne',it:'Riga per riga',es:'Fila por fila',pt:'Linha por linha',nl:'Rij voor rij',sv:'Rad för rad',da:'Række for række',no:'Rad for rad',fi:'Rivi riviltä'},
      orderPairs: {en:'In pairs',de:'Paarweise',fr:'Par paires',it:'A coppie',es:'Por parejas',pt:'Aos pares',nl:'Per twee',sv:'Parvis',da:'Parvis',no:'Parvis',fi:'Pareittain'},

      /* screen-reader names. ⚠ `filledAt` is a WHOLE per-locale
         template with {n} in it — never `ordinal + ", " + word`. */
      frameAria: {en:'The frame',de:'Das Feld',fr:'Le cadre',it:'La tabella',es:'El marco',pt:'O quadro',nl:'Het raam',sv:'Ramen',da:'Rammen',no:'Rammen',fi:'Ruudukko'},
      filledAt: {en:'{n}, a counter',de:'{n}, ein Plättchen',fr:'{n}, un jeton',it:'{n}, un gettone',es:'{n}, una ficha',pt:'{n}, uma ficha',nl:'{n}, een fiche',sv:'{n}, en bricka',da:'{n}, en brik',no:'{n}, en brikke',fi:'{n}, nappula'},
      trayAria: {en:'The tray — {n} counters left',de:'Die Schale — noch {n} Plättchen',fr:'Le plateau — il reste {n} jetons',it:'Il vassoio — restano {n} gettoni',es:'La bandeja — quedan {n} fichas',pt:'A bandeja — restam {n} fichas',nl:'Het bakje — nog {n} fiches',sv:'Facket — {n} brickor kvar',da:'Bakken — {n} brikker tilbage',no:'Skålen — {n} brikker igjen',fi:'Alusta — {n} nappulaa jäljellä'},
      trayEmptyAria: {en:'The tray — empty',de:'Die Schale — leer',fr:'Le plateau — vide',it:'Il vassoio — vuoto',es:'La bandeja — vacía',pt:'A bandeja — vazia',nl:'Het bakje — leeg',sv:'Facket — tomt',da:'Bakken — tom',no:'Skålen — tom',fi:'Alusta — tyhjä'},
      numeralAria: {en:'In the frame: {n}',de:'Im Feld: {n}',fr:'Dans le cadre : {n}',it:'Nella tabella: {n}',es:'En el marco: {n}',pt:'No quadro: {n}',nl:'In het raam: {n}',sv:'I ramen: {n}',da:'I rammen: {n}',no:'I rammen: {n}',fi:'Ruudukossa: {n}'},

      /* board-level announcements. ⚠ `saidTidied` MUST state the
         invariant — the whole point of Tidy is that the number did not
         change, and a screen-reader user has no other way to learn it. */
      saidBoard: {en:'{n} of {cap}',de:'{n} von {cap}',fr:'{n} sur {cap}',it:'{n} su {cap}',es:'{n} de {cap}',pt:'{n} de {cap}',nl:'{n} van {cap}',sv:'{n} av {cap}',da:'{n} af {cap}',no:'{n} av {cap}',fi:'{n} / {cap}'},
      saidRoom: {en:'{n} of {cap}, room for {left} more',de:'{n} von {cap}, noch Platz für {left}',fr:'{n} sur {cap}, encore de la place pour {left}',it:'{n} su {cap}, resta posto per {left}',es:'{n} de {cap}, queda sitio para {left}',pt:'{n} de {cap}, ainda cabe {left}',nl:'{n} van {cap}, nog plaats voor {left}',sv:'{n} av {cap}, plats för {left} till',da:'{n} af {cap}, plads til {left} mere',no:'{n} av {cap}, plass til {left} til',fi:'{n} / {cap}, tilaa vielä {left}'},
      saidTidied: {en:'Still {n} of {cap}, tidied',de:'Immer noch {n} von {cap}, geordnet',fr:'Toujours {n} sur {cap}, rangé',it:'Sempre {n} su {cap}, riordinata',es:'Siguen {n} de {cap}, ordenado',pt:'Continuam {n} de {cap}, arrumado',nl:'Nog steeds {n} van {cap}, geordend',sv:'Fortfarande {n} av {cap}, ordnat',da:'Stadig {n} af {cap}, ordnet',no:'Fortsatt {n} av {cap}, ordnet',fi:'Yhä {n} / {cap}, järjestetty'},
      saidFull: {en:'Full, {cap} of {cap}',de:'Voll, {cap} von {cap}',fr:'Plein, {cap} sur {cap}',it:'Piena, {cap} su {cap}',es:'Lleno, {cap} de {cap}',pt:'Cheio, {cap} de {cap}',nl:'Vol, {cap} van {cap}',sv:'Full, {cap} av {cap}',da:'Fuld, {cap} af {cap}',no:'Full, {cap} av {cap}',fi:'Täynnä, {cap} / {cap}'},
      saidField: {en:'{field}. {n} of {cap}.',de:'{field}. {n} von {cap}.',fr:'{field}. {n} sur {cap}.',it:'{field}. {n} su {cap}.',es:'{field}. {n} de {cap}.',pt:'{field}. {n} de {cap}.',nl:'{field}. {n} van {cap}.',sv:'{field}. {n} av {cap}.',da:'{field}. {n} af {cap}.',no:'{field}. {n} av {cap}.',fi:'{field}. {n} / {cap}.'},

      /* the paid gate — THREE NODES, never a concatenation */
      gateTitle: {en:'More frames',de:'Mehr Felder',fr:'Encore des cadres',it:'Altre tabelle',es:'Más marcos',pt:'Mais quadros',nl:'Meer ramen',sv:'Fler ramar',da:'Flere rammer',no:'Flere rammer',fi:'Lisää ruudukoita'},
      gateBody: {en:'A library of set-up frames — the same number arranged five ways, the partners to ten, pairs to compare, and the teens on both fields. Keep your own frames, and print the one on screen.',de:'Eine Sammlung fertiger Felder — dieselbe Zahl in fünf Anordnungen, die Partner zur Zehn, Paare zum Vergleichen und die Zahlen von elf bis neunzehn auf beiden Feldern. Eigene Felder merken und das Feld auf dem Bildschirm ausdrucken.',fr:'Une bibliothèque de cadres tout prêts — le même nombre disposé de cinq façons, les compléments à dix, des paires à comparer et les nombres de onze à dix-neuf sur les deux cadres. Gardez vos propres cadres et imprimez celui qui est à l’écran.',it:'Una raccolta di tabelle già pronte — lo stesso numero disposto in cinque modi, i compagni del dieci, coppie da confrontare e i numeri da undici a diciannove su entrambe le tabelle. Tieni le tue tabelle e stampa quella sullo schermo.',es:'Una colección de marcos ya preparados — el mismo número colocado de cinco maneras, los amigos del diez, parejas para comparar y los números del once al diecinueve en los dos marcos. Guarda tus propios marcos e imprime el de la pantalla.',pt:'Uma coleção de quadros já prontos — o mesmo número disposto de cinco maneiras, os amigos do dez, pares para comparar e os números de onze a dezenove nos dois quadros. Guarde os seus quadros e imprima o que está no ecrã.',nl:'Een verzameling klaargezette ramen — hetzelfde getal op vijf manieren, de vriendjes van tien, paren om te vergelijken en de getallen elf tot negentien op allebei de velden. Bewaar je eigen ramen en druk af wat op het scherm staat.',sv:'Ett bibliotek med färdiga ramar — samma tal lagt på fem sätt, tiokamraterna, par att jämföra och talen elva till nitton på båda fälten. Spara dina egna ramar och skriv ut den som står på skärmen.',da:'Et bibliotek med færdige rammer — det samme tal lagt på fem måder, tiervennerne, par til at sammenligne og tallene elleve til nitten på begge felter. Gem dine egne rammer, og print den, der står på skærmen.',no:'Et bibliotek med ferdige rammer — det samme tallet lagt på fem måter, tiervennene, par å sammenligne og tallene elleve til nitten på begge feltene. Ta vare på dine egne rammer, og skriv ut den som står på skjermen.',fi:'Kokoelma valmiita ruudukoita — sama luku viidellä tavalla aseteltuna, kympin kaverit, vertailtavia pareja ja luvut yhdestätoista yhdeksääntoista kummallakin kentällä. Ota omat ruudukkosi talteen ja tulosta se, joka on ruudulla.'},
      gateCta: {en:'See the Teacher plan',de:'Lehrer-Paket ansehen',fr:'Voir l’offre Enseignant',it:'Vedi il piano Insegnante',es:'Ver el plan Docente',pt:'Ver o plano Professor',nl:'Bekijk het Leerkracht-pakket',sv:'Se Lärarpaketet',da:'Se Lærerabonnementet',no:'Se Lærerabonnementet',fi:'Katso Opettaja-tilaus'}
    },

    /* ---- shell-driven settings (the drawer) -------------------------
       ⚠ `frames` has LEFT the drawer. The field is what a teacher
       changes mid-sentence while facing the class, and the drawer is
       two taps behind a scrim; it lives on the stage bar now.
       The shell supports exactly three field types: choice, color,
       toggle (`lcs-shell.js:582-631`). ---------------------------- */
    defaults: { color: '#F2784B', showNumber: false, upright: false, order: 'rows' },

    settings: [
      { key: 'color', type: 'color', labelKey: 'counterLabel',
        /* ⚠ SIX CUT TO FOUR. A paint box is not a setting; these four
           are separated enough to survive a washed-out projector, and
           each clears 4.5:1 against the white cell. */
        options: ['#F2784B', '#146B5E', '#3E78C9', '#2A2A35'] },
      { key: 'showNumber', type: 'toggle', labelKey: 'showNumber' },
      { key: 'upright', type: 'toggle', labelKey: 'uprightLabel' },
      { key: 'order', type: 'choice', labelKey: 'orderLabel', options: [
        { value: 'rows', labelKey: 'orderRows' },
        { value: 'pairs', labelKey: 'orderPairs' }
      ] }
    ],

    /* =====================================================================
       THE MODEL

       State is FOUR fields and nothing else:
         g      the geometry key
         m      a BITMASK of occupied ordinals   (cap <= 20, so a Number)
         split  the two-colour partition point, or null
         (upright and order live in api.settings — they are the
          teacher's, not the board's, and a saved board carries them
          separately)

       ⭐ NOTHING DERIVED IS STORED. There is no `count`, no `empty`, no
       `ghost` and no `tray` field, so there is no second copy of the
       truth to drift, and the tray and the ghost CANNOT disagree —
       they are two renderings of one number. The discipline is
       `part-whole-frame.js:14-15`'s: part B is derived on every read
       "with no slot of its own to corrupt".
       ===================================================================== */

    GEOM: GEOM,
    GEOM_KEYS: GEOM_KEYS,
    ORDERS: ORDERS,
    geometryFor: geometryFor,

    capOf: function (g) {
      var d = GEOM[g];
      if (!d) return 0;
      return d.panes * d.cols * d.rows;
    },

    /* every cell of the field, as a mask */
    fullMask: function (g) {
      var cap = this.capOf(g);
      return cap ? ((1 << cap) - 1) : 0;
    },

    newState: function () { return { g: 'ten', m: 0, split: null }; },

    /* ⚠ TOTALITY. `st || newState()` is not total — it catches null and
       0 and hands a string straight through to a bit operation (#39).
       Every field is coerced or replaced; this function can be handed
       anything at all and returns a legal state. */
    _st: function (st) {
      var d = this.newState(), g, m, split, cap;
      g = (st && typeof st === 'object' && typeof st.g === 'string' && GEOM[st.g]) ? st.g : d.g;
      cap = this.capOf(g);
      m = (st && typeof st === 'object') ? st.m : d.m;
      if (typeof m !== 'number' || !isFinite(m)) m = 0;
      m = Math.floor(m);
      if (m < 0) m = 0;
      m = m & ((1 << cap) - 1);
      split = (st && typeof st === 'object') ? st.split : null;
      if (typeof split !== 'number' || !isFinite(split)) split = null;
      else {
        split = Math.round(split);
        if (split < 1 || split >= cap) split = null;
      }
      return { g: g, m: m, split: split };
    },

    /* ---- the derived readings. None of these is ever stored. ---- */

    count: function (st) {
      var m = this._st(st).m, n = 0;
      while (m) { m &= m - 1; n++; }            /* Kernighan popcount */
      return n;
    },

    /* THE GHOST — the unfilled cells, as a set, in place. */
    ghostMask: function (st) {
      var s = this._st(st);
      return this.fullMask(s.g) & ~s.m;
    },

    /* THE TRAY — the same number, as a bag of objects you can pick up.
       ⭐ It is `capOf - count`, computed here and nowhere else, so the
       tray and the ghost are the same fact by construction. */
    trayCount: function (st) {
      var s = this._st(st);
      return this.capOf(s.g) - this.count(s);
    },

    occupiedList: function (st) {
      var s = this._st(st), cap = this.capOf(s.g), out = [], i;
      for (i = 0; i < cap; i++) if (s.m & (1 << i)) out.push(i);
      return out;
    },

    ghostList: function (st) {
      var s = this._st(st), cap = this.capOf(s.g), gm = this.ghostMask(s), out = [], i;
      for (i = 0; i < cap; i++) if (gm & (1 << i)) out.push(i);
      return out;
    },

    /* ---- the canonical arrangement ----
       The first n ordinals. Independent of `order` and `upright`,
       which change WHERE an ordinal is drawn, never WHICH ordinals a
       quantity occupies. That separation is what makes "the same
       counters, a different field" a property of the model. */
    canonicalMask: function (g, n) {
      var cap = this.capOf(g);
      if (typeof n !== 'number' || !isFinite(n)) return 0;
      n = Math.round(n);
      if (n < 0) n = 0;
      if (n > cap) n = cap;
      return n ? ((1 << n) - 1) : 0;
    },

    isCanonical: function (st) {
      var s = this._st(st);
      return s.m === this.canonicalMask(s.g, this.count(s));
    },

    /* ---- THE TIDY. Count-preserving, idempotent, and its image is
       exactly the cap+1 canonical sets. It is the only operation in
       the tool that moves a counter without adding or removing one. */
    snap: function (st) {
      var s = this._st(st);
      s.m = this.canonicalMask(s.g, this.count(s));
      return s;
    },

    fillRest: function (st) {
      var s = this._st(st);
      s.m = this.fullMask(s.g);
      return s;
    },

    /* ⚠ CLAMP FROM THE TOP, so shrinking the field keeps the counters
       a child has already placed at the low ordinals rather than
       silently rearranging the ones that survive. */
    setGeometry: function (st, g) {
      var s = this._st(st);
      if (!GEOM[g]) return null;
      if (g === s.g) return null;                 /* a no-op is a refusal */
      s.m = s.m & ((1 << this.capOf(g)) - 1);
      s.g = g;
      if (s.split != null && s.split >= this.capOf(g)) s.split = null;
      return s;
    },

    /* ---- the four gestures ----

       ⭐ `tap` REDUCES EXACTLY TO THE SHIPPED FILL-LEVEL BEHAVIOUR ON A
       CANONICAL BOARD, which is the zero-regression guarantee for the
       whiteboard teacher's one-touch-to-seven — and it is theorem T4.
       Tapping an empty cell fills every EMPTY cell up to and including
       it, so it never relocates a counter a child has placed. */
    tap: function (st, i) {
      var s = this._st(st), cap = this.capOf(s.g);
      if (typeof i !== 'number' || !isFinite(i) || i !== Math.round(i)) return null;
      if (i < 0 || i >= cap) return null;
      if (s.m & (1 << i)) s.m = s.m & ((1 << i) - 1);   /* filled: clear from here on */
      else s.m = s.m | ((1 << (i + 1)) - 1);            /* empty: fill up to here */
      return s;
    },

    /* exactly one counter, here — the precise, object-level move */
    toggleOne: function (st, i) {
      var s = this._st(st), cap = this.capOf(s.g);
      if (typeof i !== 'number' || !isFinite(i) || i !== Math.round(i)) return null;
      if (i < 0 || i >= cap) return null;
      s.m = s.m ^ (1 << i);
      return s;
    },

    /* take one OUT of the tray and put it in cell i */
    place: function (st, i) {
      var s = this._st(st), cap = this.capOf(s.g);
      if (typeof i !== 'number' || !isFinite(i) || i !== Math.round(i)) return null;
      if (i < 0 || i >= cap) return null;
      if (s.m & (1 << i)) return null;                  /* occupied: refuse */
      if (this.trayCount(s) <= 0) return null;          /* the counters ran out */
      s.m = s.m | (1 << i);
      return s;
    },

    /* put one BACK in the tray */
    lift: function (st, i) {
      var s = this._st(st), cap = this.capOf(s.g);
      if (typeof i !== 'number' || !isFinite(i) || i !== Math.round(i)) return null;
      if (i < 0 || i >= cap) return null;
      if (!(s.m & (1 << i))) return null;
      s.m = s.m & ~(1 << i);
      return s;
    },

    /* carry ONE counter from cell a to cell b. ⚠ A REFUSAL, never a
       clamp — a silently-corrected drop would read on screen as a
       counter that moved somewhere nobody aimed. */
    move: function (st, a, b) {
      var s = this._st(st), cap = this.capOf(s.g);
      if (typeof a !== 'number' || typeof b !== 'number') return null;
      if (!isFinite(a) || !isFinite(b)) return null;
      if (a !== Math.round(a) || b !== Math.round(b)) return null;
      if (a < 0 || a >= cap || b < 0 || b >= cap) return null;
      if (a === b) return null;
      if (!(s.m & (1 << a))) return null;               /* nothing to carry */
      if (s.m & (1 << b)) return null;                  /* destination taken */
      s.m = (s.m & ~(1 << a)) | (1 << b);
      return s;
    },

    /* =====================================================================
       THE GEOMETRY OF A CELL — ordinal -> where it is drawn.

       `order` and `upright` change this map and NOTHING else. That is
       why "the same counters, a different field" is true: the mask is
       untouched by both.
       ===================================================================== */
    posOf: function (g, order, upright, i) {
      var d = GEOM[g], perPane, pane, k, r, c, t;
      if (!d) return null;
      perPane = d.cols * d.rows;
      if (typeof i !== 'number' || !isFinite(i) || i !== Math.round(i)) return null;
      if (i < 0 || i >= d.panes * perPane) return null;
      pane = Math.floor(i / perPane);
      k = i - pane * perPane;
      if (order === 'pairs' && d.rows === 2) {
        r = k % 2;
        c = Math.floor(k / 2);
      } else {
        r = Math.floor(k / d.cols);
        c = k % d.cols;
      }
      if (upright) { t = r; r = c; c = t; }
      return { pane: pane, r: r, c: c };
    },

    /* the drawn grid's shape, after `upright` */
    shapeOf: function (g, upright) {
      var d = GEOM[g];
      if (!d) return null;
      return upright
        ? { panes: d.panes, cols: d.rows, rows: d.cols }
        : { panes: d.panes, cols: d.cols, rows: d.rows };
    },

    /* THE FIVE-BREAK. Column indices (in the DRAWN grid) that a
       structural break falls before. Empty wherever the row itself is
       already the five. ⚠ Under `upright` a vertical break becomes a
       horizontal one — same list, read against the other axis. */
    breaksOf: function (g) {
      var d = GEOM[g];
      if (!d) return [];
      return d.brk.slice();
    },

    /* =====================================================================
       THE DOM

       `render()` builds the stage once and `_paint()` reflects the mask
       onto it. A count change never rebuilds, so keyboard focus
       survives every tap and the announcement can be about the BOARD
       rather than about a cell.
       ⚠ render() takes NO ARGUMENTS — #43 shipped `render(api)` and the
       shell calls it with none, which wiped the tool's own api handle
       on the first settings commit.
       ===================================================================== */

    init: function (api) {
      this.api = api;
      this.st = this.newState();
      this.st.g = geometryFor(api.lang).single;
      this._mounted = false;
      this._focusOrd = 0;
      this._sayTimer = null;
      this._pendingSay = null;
      document.body.classList.add('tnf-wide');
      injectCSS();
    },

    reset: function () {
      this.st = this._st({ g: this.st ? this.st.g : 'ten', m: 0, split: null });
      this._focusOrd = 0;
      this.render();
    },

    /* the field the twenty chip should offer, per the visitor's locale */
    _twentyKey: function () {
      return geometryFor(this.api && this.api.lang).twenty;
    },

    /* the five chips, in the order a teacher grows through them */
    _fields: function () {
      return [
        { g: 'five', labelKey: 'fieldFive' },
        { g: 'ten', labelKey: 'fieldTen' },
        { g: 'tenrow', labelKey: 'fieldTenRow' },
        { g: this._twentyKey(), labelKey: this._twentyKey() === 'twentyfield' ? 'fieldTwentyField' : 'fieldTwentyPair' },
        { g: this._twentyKey() === 'twentyfield' ? 'twentypair' : 'twentyfield',
          labelKey: this._twentyKey() === 'twentyfield' ? 'fieldTwentyPair' : 'fieldTwentyField' }
      ];
    },

    render: function () {
      var api = this.api, self = this;
      if (!api || !api.stage) return;
      var s = this.st = this._st(this.st);
      var order = api.settings.order === 'pairs' ? 'pairs' : 'rows';
      var upright = !!api.settings.upright;
      var shape = this.shapeOf(s.g, upright);
      var cap = this.capOf(s.g);
      var brk = this.breaksOf(s.g);

      api.stage.innerHTML = '';
      var wrap = api.el('div', 'tnf-wrap');
      this._wrap = wrap;

      /* ⚠ THE HINT LIVES ON THE STAGE — BUT ONLY IN EMBED MODE. The
         landing page embeds every tool with `?embed=1`, and
         `lcs-shell.css:261` is `.lcs-app.embed .lcs-instruction
         {display:none}`, so the shipped tool's ONLY guidance string was
         invisible to every visitor who met it on its own page. Drawing
         it unconditionally fixed that and created a second defect I
         only saw by READING the 1024 render: standalone showed the same
         sentence twice, once in the header and once on the stage. */
      if (api.embed) {
        var hint = api.el('div', 'tnf-hint');
        hint.textContent = api.t('instruction');
        wrap.appendChild(hint);
      }

      /* the container the one unit is derived from. ⚠ `cqw` resolves
         against the NEAREST element that declares `container-type`, so
         this box carries it and nothing inside may re-declare it. */
      var box = api.el('div', 'tnf-box');
      var stage = api.el('div', 'tnf-stage');
      var boardrow = api.el('div', 'tnf-boardrow');

      /* ---- the frame ----
         role=grid on the whole field, so a screen-reader user gets ONE
         tab stop and arrows inside it, instead of twenty tab stops
         between them and the settings button. */
      var fields = api.el('div', 'tnf-fields');
      fields.setAttribute('role', 'grid');
      fields.setAttribute('aria-label', api.t('frameAria'));
      fields.dataset.geom = s.g;
      if (brk.length) fields.dataset.brk = brk.join(',');

      /* ⭐ THE ONE UNIT IS DERIVED FROM THE DRAWN WIDTH, IN UNITS.
         `den` is the frame's own width expressed in u — cells, plus the
         interior rules, plus the frame's border, plus the widened gap
         at each five-break — so `u = containerWidth / den` is exact and
         the frame CANNOT overflow its box at any size. Three dens
         because the numeral and then the tray move alongside it; the
         container queries pick, and each is still ONE number. */
      /* ⚠ THE RULE HAS A PIXEL FLOOR, AND THE FIRST FORMULA IGNORED IT.
         `--tnf-r` is `max(2px, u/40)`, so below u=80 the rule is a flat
         2px — which at the 34px floor is 0.059 of a unit, not 0.025.
         The den built on the ratio alone under-counted the frame by a
         few pixels and the five- and ten-frames reported a scrollbar
         they had no need of at 320 and 360. Taking the WORST-CASE ratio
         (2/34) makes the frame at most a rule or two narrower than it
         could be at large sizes and never wider than its box at small
         ones — measured at every width, not reasoned about. */
      var RG = 2 / 34;
      var perPane = shape.cols + (shape.cols + 3 + 3 * brk.length) * RG;
      var denStack = shape.panes * perPane + (shape.panes - 1) * 0.5;
      stage.style.setProperty('--tnf-den-stack', String(Math.round(denStack * 100) / 100));
      stage.style.setProperty('--tnf-den-side', String(Math.round((denStack + 1.9) * 100) / 100));
      stage.style.setProperty('--tnf-den-wide', String(Math.round((denStack + 1.9 + 2.82) * 100) / 100));

      this.cells = [];
      this._byPos = {};
      var p, r, c, i;
      for (p = 0; p < shape.panes; p++) {
        var pane = api.el('div', 'tnf-pane');
        pane.style.setProperty('--tnf-cols', String(shape.cols));
        if (upright) pane.dataset.up = '1';
        for (r = 0; r < shape.rows; r++) {
          var row = api.el('div', 'tnf-row');
          row.setAttribute('role', 'row');
          for (c = 0; c < shape.cols; c++) {
            var cell = api.el('button', 'tnf-cell');
            cell.type = 'button';
            cell.setAttribute('role', 'gridcell');
            cell.tabIndex = -1;
            /* the break is a property of the FIELD, drawn against the
               cell that sits just after it — never a colour, never a
               word. Upright turns the vertical break into a horizontal
               one, which is the same structure read on the other axis. */
            if (brk.indexOf(upright ? r : c) !== -1) cell.dataset.brk = '1';
            row.appendChild(cell);
            this._byPos[p + ':' + r + ':' + c] = cell;
          }
          pane.appendChild(row);
        }
        /* the overhanging bar. Placed from the SAME expressions that lay
           the cells out, so it cannot drift from the gap it fills:
           cell B-1 ends at B*u + (B+1)*r and cell B starts at
           B*u + (B+5)*r, so a 2r bar centres at B*u + (B+2)*r. */
        for (var b = 0; b < brk.length; b++) {
          var bar = api.el('div', 'tnf-brkbar');
          var B = brk[b];
          var off = 'calc(var(--tnf-u) * ' + B + ' + var(--tnf-r) * ' + (B + 2) + ')';
          if (upright) { bar.dataset.up = '1'; bar.style.top = off; }
          else bar.style.left = off;
          pane.appendChild(bar);
        }
        fields.appendChild(pane);
      }
      /* now bind each ordinal to the cell its position names */
      for (i = 0; i < cap; i++) {
        var pos = this.posOf(s.g, order, upright, i);
        var el = this._byPos[pos.pane + ':' + pos.r + ':' + pos.c];
        el.dataset.ord = String(i);
        this.cells[i] = el;
      }
      this._bindCells();

      /* the scroller exists so a ten-WIDE field on a phone can keep a
         34px cell and one unbroken row; the five- and ten-frames never
         reach it at any width. */
      var scroll = api.el('div', 'tnf-fieldscroll');
      scroll.appendChild(fields);
      boardrow.appendChild(scroll);

      /* ---- the numeral, on the right flank ----
         ⚠ NO LABEL. "COUNT" / "ANZAHL" / "CONTAGEM" is authored
         language sitting on the apparatus (§23.2) and it reflowed the
         readout across eleven languages. A single numeral beside a
         single frame needs no noun. */
      this._numEl = null;
      if (api.settings.showNumber) {
        var num = api.el('div', 'tnf-num');
        num.setAttribute('role', 'img');
        this._numEl = num;
        boardrow.appendChild(num);
      }
      stage.appendChild(boardrow);

      /* ---- THE TRAY — one button, never twenty ----
         `part-whole-frame.js:522-530` bought this the hard way: single
         counters measured 19-22px, a fifth of the tap floor, and twenty
         44px buttons cannot fit a phone. You reach into the bowl. */
      var tray = api.el('button', 'tnf-tray');
      tray.type = 'button';
      this._trayEl = tray;
      tray.addEventListener('click', function (e) {
        if (self._dragMoved) return;
        self._takeFromTray();
      });
      stage.appendChild(tray);

      box.appendChild(stage);
      wrap.appendChild(box);

      /* ---- the chip bar ---- */
      wrap.appendChild(this._buildBar());

      api.stage.appendChild(wrap);
      this._paint();
      this._mounted = true;
    },

    _bindCells: function () {
      var self = this;
      for (var i = 0; i < this.cells.length; i++) {
        (function (ord, cell) {
          cell.addEventListener('click', function (e) {
            if (self._dragMoved) return;      /* a drag is not a tap */
            self._focusOrd = ord;
            /* ⭐ Shift = exactly one counter, here. Two conventional
               keystrokes reach every state a pick-up/carry keyboard
               mode would, with no carry state to announce. */
            self._apply(e.shiftKey ? self.toggleOne(self.st, ord) : self.tap(self.st, ord));
          });
          cell.addEventListener('keydown', function (e) { self._onCellKey(e, ord); });
        }(i, this.cells[i]));
      }
      this._setFocusOrd(Math.min(this._focusOrd, this.cells.length - 1), false);
    },

    /* arrows move by VISUAL position, not by ordinal — under the pair
       order the two differ, and a grid whose arrows disagree with the
       picture is worse than no arrows. */
    _onCellKey: function (e, ord) {
      var k = e.key, s = this._st(this.st), api = this.api;
      var order = api.settings.order === 'pairs' ? 'pairs' : 'rows';
      var upright = !!api.settings.upright;
      var shape = this.shapeOf(s.g, upright);
      var cap = this.capOf(s.g);
      if (k === 'Enter' || k === ' ' || k === 'Spacebar') {
        e.preventDefault();
        this._focusOrd = ord;
        this._apply(e.shiftKey ? this.toggleOne(this.st, ord) : this.tap(this.st, ord));
        return;
      }
      var d = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] }[k];
      if (!d && k !== 'Home' && k !== 'End') return;
      e.preventDefault();
      var target = null, j;
      if (k === 'Home') target = 0;
      else if (k === 'End') target = cap - 1;
      else {
        var pos = this.posOf(s.g, order, upright, ord);
        var nr = pos.r + d[0], nc = pos.c + d[1], np = pos.pane;
        /* ⚠ STEPPING OFF THE END OF A ROW CONTINUES IN READING ORDER —
           down to the start of the next row, and on into the next pane.
           The first build stopped dead at the right-hand edge, so six
           presses of ArrowRight on a 5-wide frame reached cell FIVE and
           the keyboard could not get past it. A grid whose arrows dead-
           end in the middle of the apparatus is not operable. */
        if (nc < 0) { nr -= 1; nc = shape.cols - 1; }
        else if (nc >= shape.cols) { nr += 1; nc = 0; }
        if (nr < 0) { np -= 1; nr = shape.rows - 1; }
        else if (nr >= shape.rows) { np += 1; nr = 0; }
        if (np < 0 || np >= shape.panes || nr < 0 || nr >= shape.rows) return;
        for (j = 0; j < cap; j++) {
          var q = this.posOf(s.g, order, upright, j);
          if (q.pane === np && q.r === nr && q.c === nc) { target = j; break; }
        }
      }
      if (target == null) return;
      this._setFocusOrd(target, true);
    },

    _setFocusOrd: function (ord, doFocus) {
      if (!this.cells || !this.cells.length) return;
      ord = Math.max(0, Math.min(this.cells.length - 1, ord));
      this._focusOrd = ord;
      for (var i = 0; i < this.cells.length; i++) this.cells[i].tabIndex = (i === ord ? 0 : -1);
      if (doFocus) this.cells[ord].focus();
    },

    /* every state change goes through here, so there is exactly one
       place that repaints and exactly one that announces */
    _apply: function (next, sayKey) {
      if (!next) return;                       /* a refusal is silent */
      this.st = next;
      this._paint();
      this._say(sayKey);
    },

    _takeFromTray: function () {
      var s = this._st(this.st);
      if (this.trayCount(s) <= 0) return;
      /* the next canonical empty cell — the tray fills the frame the
         way the frame wants to be filled */
      var cap = this.capOf(s.g), i;
      for (i = 0; i < cap; i++) if (!(s.m & (1 << i))) { this._apply(this.place(this.st, i)); return; }
    },

    _paint: function () {
      var api = this.api, s = this._st(this.st);
      var cap = this.capOf(s.g), n = this.count(s), left = this.trayCount(s);
      var color = api.settings.color || '#F2784B';
      var i, cell, filled;

      for (i = 0; i < this.cells.length; i++) {
        cell = this.cells[i];
        filled = !!(s.m & (1 << i));
        /* ⭐ THE GHOST. An empty cell is not blank — it carries the
           counter that is NOT there, drawn as a ring. Ring against
           fill is a difference in KIND, so it survives a washed-out
           projector and a colour-blind child; a tint would not. */
        if (cell.dataset.filled !== (filled ? '1' : '0') || cell.dataset.color !== color) {
          cell.dataset.filled = filled ? '1' : '0';
          cell.dataset.color = color;
          cell.innerHTML = disc(filled ? color : null);
        }
        /* the marked state is the SHORT one to produce: an empty cell
           is a ten-frame's neutral, so it is named by its bare ordinal
           and only a counter gets a phrase. A serial read of 7-of-10
           becomes "1 counter, 2 counter, … 7 counter, 8, 9, 10" — the
           run-length is audible and the boundary carries the meaning. */
        cell.setAttribute('aria-label', filled
          ? api.t('filledAt').replace('{n}', String(i + 1))
          : String(i + 1));
      }

      if (this._trayEl) {
        this._trayEl.innerHTML = trayDiscs(left, color);
        this._trayEl.dataset.left = String(left);
        this._trayEl.disabled = left <= 0;
        this._trayEl.setAttribute('aria-label', left > 0
          ? api.t('trayAria').replace('{n}', String(left))
          : api.t('trayEmptyAria'));
      }
      if (this._numEl) {
        this._numEl.textContent = String(n);
        this._numEl.setAttribute('aria-label', api.t('numeralAria').replace('{n}', String(n)));
      }
      if (this._tidyEl) this._tidyEl.disabled = this.isCanonical(s);
      if (this._fillEl) this._fillEl.disabled = left <= 0;
      if (this._wrap) this._wrap.dataset.cap = String(cap);
    },

    /* ⚠ NOTHING ON MOUNT, and one utterance per committed change. The
       shipped tool announced on every paint including arrival, which is
       a live region firing at a screen-reader user who has not touched
       anything yet. */
    _say: function (key) {
      var api = this.api, s = this._st(this.st);
      var n = this.count(s), cap = this.capOf(s.g), left = this.trayCount(s);
      if (!this._mounted) return;
      var msg;
      if (key === 'tidied') msg = api.t('saidTidied');
      else if (key === 'full') msg = api.t('saidFull');
      else if (key === 'field') msg = api.t('saidField').replace('{field}', this._fieldName(s.g));
      else if (left > 0) msg = api.t('saidRoom');
      else msg = api.t('saidBoard');
      msg = msg.replace('{n}', String(n)).replace(/\{cap\}/g, String(cap)).replace('{left}', String(left));
      this._pendingSay = msg;
      if (this._sayTimer) clearTimeout(this._sayTimer);
      var self = this;
      /* debounced, so filling seven cells in one tap says one thing */
      this._sayTimer = setTimeout(function () { api.announce(self._pendingSay); }, 120);
    },

    _fieldName: function (g) {
      var f = this._fields(), i;
      for (i = 0; i < f.length; i++) if (f[i].g === g) return this.api.t(f[i].labelKey);
      return this.api.t('frameAria');
    },

    _buildBar: function () {
      var api = this.api, self = this, s = this._st(this.st);
      var bar = api.el('div', 'tnf-bar');

      /* the field chips — a radiogroup whose members are DRAWINGS of the
         fields they choose. The label is the accessible name only. */
      var group = api.el('div', 'tnf-fieldgroup');
      group.setAttribute('role', 'radiogroup');
      group.setAttribute('aria-label', api.t('frameAria'));
      var fields = this._fields();
      for (var i = 0; i < fields.length; i++) {
        (function (f) {
          var b = api.el('button', 'tnf-chip tnf-fieldchip');
          b.type = 'button';
          b.setAttribute('role', 'radio');
          b.setAttribute('aria-checked', String(f.g === s.g));
          b.setAttribute('aria-label', api.t(f.labelKey));
          b.title = api.t(f.labelKey);
          b.innerHTML = fieldGlyph(f.g);
          b.addEventListener('click', function () {
            var next = self.setGeometry(self.st, f.g);
            if (!next) return;
            self.st = next;
            self._focusOrd = 0;
            self.render();
            self._say('field');
          });
          group.appendChild(b);
        }(fields[i]));
      }
      bar.appendChild(group);

      /* Tidy — the only control that relocates a counter */
      var tidy = api.el('button', 'tnf-chip');
      tidy.type = 'button';
      tidy.textContent = api.t('tidyBtn');
      this._tidyEl = tidy;
      tidy.addEventListener('click', function () {
        if (self.isCanonical(self.st)) return;
        self._apply(self.snap(self.st), 'tidied');
      });
      bar.appendChild(tidy);

      /* Fill the rest — the only control that acts on the tray */
      var fill = api.el('button', 'tnf-chip');
      fill.type = 'button';
      fill.textContent = api.t('fillBtn');
      this._fillEl = fill;
      fill.addEventListener('click', function () {
        if (self.trayCount(self.st) <= 0) return;
        self._apply(self.fillRest(self.st), 'full');
      });
      bar.appendChild(fill);

      return bar;
    }
  };

  /* =====================================================================
     THE COUNTER.

     ⭐⭐ IT CARRIES NO PIXEL SIZE ANYWHERE, and that is a bug fix wearing
     a design hat. The shipped tool asked the shell for
     `token(shape, colour, 56)`, which emits `<svg width="56"
     height="56">`, and styled it `max-width:78%; width:auto`. On a
     replaced element `width:auto` resolves to the INTRINSIC size, and
     `max-width` can only shrink — so the counter was 78% of the cell
     only while the cell was under 72px, and pinned at 56px above it. The
     wide-viewport tiers grew the cell to 240px and the counter stayed at
     56: 23% of its own cell, on the largest screen in the catalogue,
     while `ten-frame.js:51-53` carried a comment asserting the counters
     "follow for free".
     With no width and no height attribute there is no intrinsic size to
     pin to, so the CSS percentage is the only answer available and the
     defect is UNREPRESENTABLE rather than fixed.
     ===================================================================== */
  function disc(color) {
    if (!color) {
      return '<svg viewBox="0 0 100 100" class="tnf-disc tnf-ghost" aria-hidden="true" focusable="false">'
        + '<circle cx="50" cy="50" r="38"/></svg>';
    }
    return '<svg viewBox="0 0 100 100" class="tnf-disc" aria-hidden="true" focusable="false">'
      + '<circle cx="50" cy="50" r="42" fill="' + color + '"/></svg>';
  }

  /* the tray's contents. The counters inside are decorative — the
     tray's own accessible name carries the number, so a screen reader
     does not read twenty identical children. */
  function trayDiscs(n, color) {
    var out = '', i;
    for (i = 0; i < n; i++) out += '<span class="tnf-traydisc">' + disc(color) + '</span>';
    return out;
  }

  /* THE FIELD CHIPS ARE DRAWINGS, NOT WORDS. Each is a miniature of the
     field it selects, with the five-break where the field has one, so
     the chooser is legible to a child who cannot read and identical in
     all eleven locales. */
  function fieldGlyph(g) {
    var d = GEOM[g], p, r, c, x, y, out = '';
    var CW = 7, CH = 7, GAP = 1.6, PGAP = 4;
    var paneW = d.cols * CW + (d.cols - 1) * GAP;
    var totalW = d.panes * paneW + (d.panes - 1) * PGAP;
    var totalH = d.rows * CH + (d.rows - 1) * GAP;
    for (p = 0; p < d.panes; p++) {
      for (r = 0; r < d.rows; r++) {
        for (c = 0; c < d.cols; c++) {
          x = p * (paneW + PGAP) + c * (CW + GAP);
          y = r * (CH + GAP);
          out += '<rect x="' + x.toFixed(2) + '" y="' + y.toFixed(2) + '" width="' + CW + '" height="' + CH + '" rx="1"/>';
        }
      }
      for (var b = 0; b < d.brk.length; b++) {
        x = p * (paneW + PGAP) + d.brk[b] * (CW + GAP) - GAP / 2;
        out += '<rect class="tnf-glyphbrk" x="' + (x - 0.7).toFixed(2) + '" y="-1" width="1.9" height="' + (totalH + 2) + '" rx="0.6"/>';
      }
    }
    return '<svg class="tnf-glyph" viewBox="-1 -1.5 ' + (totalW + 2) + ' ' + (totalH + 3) + '" aria-hidden="true" focusable="false">' + out + '</svg>';
  }

  /* =====================================================================
     CSS. Direction A tokens, `tnf-` prefix, injected once.

     ⭐ ONE UNIT. `--tnf-u` is the cell edge and it is the only absolute
     length in the tool; everything else is a pure ratio of it, so a px
     SIZE can never desync from a model-unit OFFSET (#42's numerals
     ended up inside their own grips exactly that way).

     ⚠ NO `vh` — the iframe grows to its content, so a vh rule is a
     feedback loop the shell deliberately has no path for.
     ⚠ NO `vmin` either, and that is the shipped defect: on a 2560x1440
     board vmin is the HEIGHT, a dimension the frame does not compete
     for, and it is blind to the shell's card caps which are the real
     constraint. `clamp(44px, 11vmin, 84px)` computed 158px at 2560 and
     was clamped straight back to 84.
     ⚠ NO inline `background` shorthand. NO `font:` shorthand — an
     unquoted `Baloo 2` inside one invalidates the whole declaration.
     ===================================================================== */
  function injectCSS() {
    if (typeof document === 'undefined' || document.getElementById('tnf-style')) return;
    var s = document.createElement('style');
    s.id = 'tnf-style';
    s.textContent = ''
      + '.tnf-wrap{--tnf-max:84px;--tnf-ink:#0E5147;display:flex;flex-direction:column;align-items:center;'
      +   'gap:clamp(10px,2vmin,18px);width:100%;}'

      /* the hint, on the stage, because the shell's is hidden in embed */
      + '.tnf-hint{text-align:center;font-family:Nunito,system-ui,sans-serif;font-size:15px;line-height:1.4;'
      +   'color:var(--lcs-ink-soft);max-width:52ch;margin:0 auto;}'

      /* ⚠ THE CONTAINER. `cqw` resolves against the NEAREST ancestor
         that declares container-type, so exactly one element may. */
      /* ⚠⚠ A TEN-WIDE FIELD ON A 320px PHONE CANNOT SHOW A 34px CELL —
         measured: the card is ~288px and the field needs ~354px. The
         three honest answers were a smaller cell (below the K-2 canvas
         floor), a wrapped frame (which is not a ten-frame), or a
         scroller. The floor and the shape are the pedagogy, so the
         frame SCROLLS: the cell never drops under 34px and one row of
         ten never becomes two.
         ⚠ AND THE CENTRING IS ON THE CHILD. `justify-content:center` on
         an overflow scroller puts the START out of reach — #36 shipped
         exactly that and column one could not be scrolled to. The first
         version of this line was `display:flex;justify-content:center`,
         i.e. the recorded anti-pattern, written from habit. */
      + '.tnf-box{container-type:inline-size;width:100%;}'
      /* ⚠⚠ THE UNIT IS DEFINED HERE, ON THE STAGE, NOT ON THE FRAME.
         It was on `.tnf-fields` at first, and custom properties inherit
         DOWNWARDS only — so the tray and the numeral, which are its
         SIBLINGS, silently fell back to the 44px default and drew at a
         third of their intended size however big the frame got. Nothing
         errored and every measured gate passed; I found it by reading
         the 1024 render and asking why the tray looked like decoration.
         `.tnf-stage` is inside `.tnf-box`, so `cqw` still resolves
         against the container. */
      + '.tnf-stage{--tnf-u:clamp(34px,calc(100cqw / var(--tnf-den-stack,6)),var(--tnf-max));'
      +   '--tnf-r:max(2px,calc(var(--tnf-u) / 40));'
      +   'display:flex;flex-direction:column;align-items:center;gap:calc(var(--tnf-u)*0.42);'
      +   'width:100%;}'
      /* ⚠ THE SCROLLER WRAPS THE FRAME AND NOTHING ELSE. Wrapping the
         whole stage made the TRAY's max-content the scroll width, so
         the five- and ten-frames — which fit at every size — reported a
         scrollbar they had no need of. Only the frame may overflow. */
      + '.tnf-fieldscroll{width:100%;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;'
      +   'padding-block:calc(var(--tnf-u)*0.16);}'
      + '.tnf-boardrow{display:flex;flex-direction:column;align-items:center;justify-content:center;'
      +   'gap:calc(var(--tnf-u)*0.5);width:100%;}'

      /* the unit. `--tnf-den-*` is the drawn width expressed IN UNITS,
         so u = width / den is exact and the frame cannot overflow. */
      /* ⚠ `margin:0 auto` ON THE CHILD, never `justify-content:center`
         on the scroller — centring an overflowing flex container puts
         the START out of reach, and #36 shipped exactly that. */
      + '.tnf-fields{display:flex;flex-direction:row;align-items:center;'
      +   'width:max-content;margin:0 auto;gap:calc(var(--tnf-u)*0.5);}'

      /* ⭐ THE GAP IS THE RULING. The frame is an ink field and the
         cells are holes in it, so every interior line is SHARED by
         construction rather than by arithmetic — which is what a real
         ten-frame is, and what the platform own printable primitive
         already draws. The shipped tool drew separate rounded tiles
         floating on a slab with voids between them, which is a grid of
         tiles, not a frame. */
      + '.tnf-pane{display:grid;grid-template-columns:repeat(var(--tnf-cols),var(--tnf-u));'
      +   'gap:var(--tnf-r);padding:calc(var(--tnf-r)*2);'
      +   'background-color:var(--tnf-ink);border-radius:calc(var(--tnf-r)*1.5);'
      +   'box-shadow:0 calc(var(--tnf-u)*0.012) 0 rgba(14,81,71,.22),'
      +     '0 calc(var(--tnf-u)*0.05) calc(var(--tnf-u)*0.11) calc(var(--tnf-u)*-0.05) rgba(14,81,71,.40);'
      +   'position:relative;}'
      + '.tnf-row{display:contents;}'

      /* ⭐ A CELL IS A SQUARE. A 12px radius is 27% of a 44px cell and
         5% of a 240px one — the same declaration drawing two different
         objects at the two ends of the range. Radius on a cell also
         says "button", and this is a hole in a card. */
      + '.tnf-cell{width:var(--tnf-u);aspect-ratio:1;border-radius:0;border:0;padding:0;'
      +   'background-color:#FFFFFF;display:grid;place-items:center;cursor:pointer;'
      +   'touch-action:none;transition:background-color .1s var(--lcs-ease);}'
      + '.tnf-cell:hover{background-color:#FBF6EE;}'
      /* ⚠ NO `transform:scale()` ON PRESS. It tears the shared ruling —
         a scaled cell overlaps its neighbour rule — and the geometry
         IS the content here. Colour moves nothing. */
      + '.tnf-cell:active{background-color:#E7DCC8;}'
      + '.tnf-cell:focus-visible{outline:3px solid var(--lcs-focus);outline-offset:calc(var(--tnf-r)*-1);z-index:2;}'

      /* ⭐ THE FIVE-BREAK OVERHANGS THE CARD. A rule drawn inside the
         frame reads as decoration; a bar that runs THROUGH the frame
         own border cannot — it is the card being cut in half. Ink, so
         it is not a colour-carried meaning and it prints. */
      + '.tnf-pane:not([data-up]) .tnf-cell[data-brk]{margin-left:calc(var(--tnf-r)*3);}'
      + '.tnf-pane[data-up] .tnf-cell[data-brk]{margin-top:calc(var(--tnf-r)*3);}'
      + '.tnf-brkbar{position:absolute;pointer-events:none;'
      +   'top:calc(var(--tnf-u)*-0.14);bottom:calc(var(--tnf-u)*-0.14);width:calc(var(--tnf-r)*2);'
      +   'background-color:var(--tnf-ink);border-radius:var(--tnf-r);}'
      + '.tnf-brkbar[data-up]{left:calc(var(--tnf-u)*-0.14);right:calc(var(--tnf-u)*-0.14);'
      +   'top:auto;bottom:auto;width:auto;height:calc(var(--tnf-r)*2);}'

      /* ⭐ THE COUNTER CARRIES NO PIXEL SIZE — see the note above disc().
         78% of the cell, always, at every viewport. */
      + '.tnf-disc{width:78%;height:78%;display:block;'
      +   'filter:drop-shadow(0 calc(var(--tnf-u)*0.018) calc(var(--tnf-u)*0.030) rgba(16,50,45,.30));'
      +   'animation:tnf-place .11s var(--lcs-ease);}'
      /* a neutral rim, so one value works over all four palette colours
         and carries no hue meaning of its own */
      + '.tnf-disc circle{stroke:rgba(18,32,29,.34);stroke-width:5;}'
      /* the ghost: ring against fill is a difference in KIND */
      + '.tnf-ghost{filter:none;animation:none;}'
      + '.tnf-ghost circle{fill:none;stroke:rgba(14,81,71,.26);stroke-width:7;}'
      /* ⚠ a counter is PLACED, not summoned. scale-from-0.2 is a
         notification-badge entrance and ten taps read as popcorn. */
      + '@keyframes tnf-place{from{opacity:0;transform:translateY(-14%);}to{opacity:1;transform:none;}}'

      /* the numeral: naked, tabular, no label and no pill */
      + '.tnf-num{font-family:var(--lcs-font-display),Nunito,sans-serif;font-weight:700;'
      +   'font-size:var(--tnf-u);line-height:1;color:var(--tnf-ink);'
      +   'font-variant-numeric:tabular-nums;min-width:calc(var(--tnf-u)*1.4);text-align:center;'
      +   'flex:0 0 auto;}'

      /* the tray — ONE control, whatever is in it */
      /* ⚠ THE TRAY IS A DISH, NOT A STATUS STRIP. The first build drew
         it as a thin pill of small dots and it read as decoration —
         nothing about it said "these are the counters that are left and
         you may pick one up". The counters in it are now the same
         visual weight as the ones in the frame (0.62u against the
         cell's 0.78u disc), it has a real rim and a recessed floor, and
         it sits directly under the frame. */
      + '.tnf-tray{display:flex;flex-wrap:wrap;align-content:center;justify-content:center;'
      +   'gap:calc(var(--tnf-u)*0.12);padding:calc(var(--tnf-u)*0.16);'
      +   'min-width:calc(var(--tnf-u)*3.4);min-height:max(48px,calc(var(--tnf-u)*1.05));'
      +   'max-width:calc(var(--tnf-u)*6.6);border:0;cursor:pointer;'
      +   'background-color:#F3EADB;border-radius:calc(var(--tnf-u)*0.22);'
      +   'box-shadow:inset 0 0 0 max(2px,calc(var(--tnf-u)*0.045)) rgba(14,81,71,.20),'
      +     'inset 0 calc(var(--tnf-u)*0.04) calc(var(--tnf-u)*0.08) rgba(14,81,71,.10);}'
      + '.tnf-tray:hover:not(:disabled){background-color:#EFE3D0;}'
      + '.tnf-tray:disabled{cursor:default;background-color:#F7F2E8;'
      +   'box-shadow:inset 0 0 0 max(2px,calc(var(--tnf-u)*0.045)) rgba(14,81,71,.09);}'
      + '.tnf-tray:focus-visible{outline:3px solid var(--lcs-focus);outline-offset:3px;}'
      + '.tnf-traydisc{width:calc(var(--tnf-u)*0.62);height:calc(var(--tnf-u)*0.62);display:block;}'

      /* the chip bar */
      + '.tnf-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;max-width:100%;}'
      + '.tnf-fieldgroup{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center;}'
      + '.tnf-chip{min-height:44px;padding:9px 14px;border-radius:var(--lcs-radius-pill);'
      +   'border:2px solid rgba(14,81,71,.22);background-color:var(--lcs-surface);cursor:pointer;'
      +   'font-family:Nunito,system-ui,sans-serif;font-weight:700;font-size:15px;color:var(--tnf-ink);}'
      + '.tnf-chip:disabled{opacity:.45;cursor:default;}'
      + '.tnf-chip:focus-visible{outline:3px solid var(--lcs-focus);outline-offset:2px;}'
      /* ⚠ THE CHIPS MUST BE READABLE AS FIELDS. At 38px wide the row of
         ten, the field of twenty and the two frames of ten were three
         indistinguishable grey smudges — the chooser was wordless AND
         illegible, which is worse than a label. */
      + '.tnf-fieldchip{min-width:52px;padding:7px 9px;display:grid;place-items:center;}'
      + '.tnf-fieldchip[aria-checked="true"]{background-color:var(--tnf-ink);border-color:var(--tnf-ink);}'
      + '.tnf-glyph{width:56px;height:auto;max-height:30px;display:block;}'
      + '.tnf-glyph rect{fill:rgba(14,81,71,.42);}'
      + '.tnf-glyph rect.tnf-glyphbrk{fill:var(--tnf-ink);}'
      + '.tnf-fieldchip[aria-checked="true"] .tnf-glyph rect{fill:rgba(255,255,255,.55);}'
      + '.tnf-fieldchip[aria-checked="true"] .tnf-glyph rect.tnf-glyphbrk{fill:#FFFFFF;}'

      /* ---- the reflows, container queries, no media query ---- */
      /* the numeral moves to the right flank once there is room */
      + '@container (min-width:520px){'
      +   '.tnf-boardrow{flex-direction:row;}'
      +   '.tnf-stage{--tnf-u:clamp(34px,calc(100cqw / var(--tnf-den-side,8)),var(--tnf-max));}'
      + '}'
      /* and the tray joins them, because vertical space is the scarce
         dimension on a 16:9 classroom board */
      + '@container (min-width:1000px){'
      +   '.tnf-stage{flex-direction:row;justify-content:center;align-items:center;}'
      +   '.tnf-stage{--tnf-u:clamp(34px,calc(100cqw / var(--tnf-den-wide,11)),var(--tnf-max));}'
      +   '.tnf-tray{max-width:calc(var(--tnf-u)*2.4);}'
      + '}'
      /* two frames of ten stack when they cannot sit side by side */
      + '@container (max-width:479px){.tnf-fields{flex-direction:column;}}'

      /* ---- the wide tiers. ONE NUMBER each, and the only px in them.
         The 1367/1800/2400 floors are the shell own (lcs-shell.css
         :87-131) and the min-heights are load-bearing: `.lcs-app` clips
         with overflow:hidden, and cold-line.js:933-949 records the
         942px failure that appeared only in es/pt/it/nl. --------- */
      + '@media (min-width:1367px) and (min-height:880px){body.tnf-wide .tnf-wrap{--tnf-max:132px;}'
      +   'body.tnf-wide .tnf-hint{font-size:17px;max-width:64ch;}}'
      + '@media (min-width:1800px) and (min-height:1080px){body.tnf-wide .tnf-wrap{--tnf-max:168px;}'
      +   'body.tnf-wide .tnf-hint{font-size:18px;}'
      +   'body.tnf-wide .tnf-chip{font-size:17px;min-height:50px;}'
      +   'body.tnf-wide .tnf-glyph{width:70px;max-height:38px;}'
      +   'body.tnf-wide .tnf-fieldchip{min-width:64px;}}'
      + '@media (min-width:2400px) and (min-height:1150px){body.tnf-wide .tnf-wrap{--tnf-max:208px;}'
      +   'body.tnf-wide .tnf-cell:focus-visible{outline-width:5px;}'
      /* the card is capped at 1800 by the shell; widen it at the top
         tier. (0,1,1) beats the shell (0,1,0) — the documented escape
         hatch, and 0 shell lines. */
      +   'body.tnf-wide .lcs-app{max-width:min(1480px,94vw);}}'

      + '@media (prefers-reduced-motion:reduce){.tnf-disc{animation:none;}}';
    document.head.appendChild(s);
  }

  if (typeof window !== 'undefined') window.TenFrame = TenFrame;
  if (typeof module !== 'undefined' && module.exports) module.exports = TenFrame;
}());
