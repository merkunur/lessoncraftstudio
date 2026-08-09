/* =====================================================================
   _baking-tray-strings.js — TOOL #46 apparatus strings, eleven locales
   ---------------------------------------------------------------------
   The authoring source for the `strings` block inside
   `mini tools/baking-tray.js`. Applied by apply-baking-tray-locales.js.

   ⚠ THE ENGLISH IS A SOURCE THAT GETS AUDITED, NOT A TARGET THAT GETS
   TRANSLATED. Every native panel is handed it and asked what is WRONG
   with it first. On this tool alone that found: a paywall claiming the
   sheet was "broken six ways" when it leads with the whole tray; "1
   rows" on the tool's own headline derivation; two different grammars
   for the whole tray and its pieces, so the identity claim arrived in
   one construction and left in another; a missing unit in the one label
   class that exists for users who cannot see the numerals; two push
   pads with identical labels; a hint promising an event that cannot
   occur; and a print sheet ignoring its own setting.

   ⭐ `[x|one|many]` picks the form the numeral {x} governs. Resolved
   before interpolation, so a form may contain no placeholder.

   ⚠ NO `×`, NO `+`, NO `=`, NO TOTAL — and the ban covers operator
   WORDS, not only glyphs: German notates with *mal*, and every locale
   has its own (*fois*, *gånger*, *kertaa*, *vezes*, *per*, *keer*).
   verify-baking-tray.js enforces the word list per locale.
   ===================================================================== */

'use strict';

module.exports = {
  /* ---------------------------------------------------------------- EN */
  en: {
    title: 'The Baking Tray',
    instruction: 'Break the tray where both pieces are facts the class already knows.',
    hintWhole: 'Where can you break it so that both pieces are facts you already know?',
    hintCut: 'Same buns as before, in two pieces. Read each piece, then break it again or push them back together and break it somewhere else.',
    hintCut3: 'Same buns as before, in three pieces. Read each one.',
    hintSquare: 'The same number of rows as there are in each row. Turn it, then say where you would break it.',
    sceneWhole: 'A tray of buns: {r} [r|row|rows] of {c}.',
    sceneCut2: 'A tray of buns in two pieces: {a} [a|row|rows] of {c}, and {b} [b|row|rows] of {c}.',
    sceneCut3: 'A tray of buns in three pieces: {a} [a|row|rows] of {c}, {b} [b|row|rows] of {c}, and {d} [d|row|rows] of {c}.',
    sceneCol2: 'A tray of buns in two pieces: {r} [r|row|rows] of {a}, and {r} [r|row|rows] of {b}.',
    sceneCol3: 'A tray of buns in three pieces: {r} [r|row|rows] of {a}, {r} [r|row|rows] of {b}, and {r} [r|row|rows] of {d}.',
    turnBtn: 'Turn the tray',
    turnAria: 'Turn the tray a quarter turn.',
    rowsDown: 'One row fewer.',
    rowsUp: 'One row more.',
    colsDown: 'One fewer in each row.',
    colsUp: 'One more in each row.',
    rowCombAria: 'Where to break the tray across.',
    colCombAria: 'Where to break the tray down.',
    breakRow: 'Break after row {k}: {a} [a|row|rows] above, {b} [b|row|rows] below.',
    breakCol: 'Break after column {k}: {a} in each row on the left, {b} in each row on the right.',
    pushRow: 'Push the two pieces at row {k} back together.',
    pushCol: 'Push the two pieces at column {k} back together.',
    saidTurned: 'Turned. {r} [r|row|rows] of {c}.',
    printBtn: 'Print this tray',
    gateTitle: 'The sheets to print',
    gateBody: 'A page to break on paper: the whole tray first, then the same tray again broken at each different line, with a rule under every one to write on.',
    gateCta: 'See the Teacher plan',
    setGroove: 'Deeper groove every fifth seam',
    setRange: 'Allow 11 and 12'
  },

  /* ---------------------------------------------------------------- DE
     Panel notes carried here so nobody "tidies" them back:
      · `Brötchen` is INVARIANT (sg = pl), which removes a whole class of
        plural bug, and it is already the platform's German for `bun`.
        VETO *Buchteln* — physically the perfect object, unknown north of
        the Main and in CH; the tool must not teach vocabulary before it
        teaches the mathematics.
      · `die Rille`, never *Naht*. Break is `auseinanderbrechen`, one
        verb everywhere. VETO *teilen* — it says DIVISION to every German
        child, in a multiplication tool. VETO the noun *Bruch* — that is
        the fraction, and Die Bruch-Küche already ships.
      · Name VETOES: *Blechkuchen/Kuchen* (fraction-kitchen owns Kuchen),
        *Bäckerei/Kekse* (maple-bakery owns them), *Backstube* (three
        tools already carry Werkstatt), *Das Malfeld* (contains the
        banned operator word AND collides with the array activity).
      · `zu je {c}` disambiguates: bare `Reihe` is also the times table
        (*die Sechserreihe*), so "{r} Reihen {c}" would read as one.
      · The tool line is the Aufforderungsinfinitiv — German has a
        genuinely person-free imperative — and only the hint addresses
        the class, as `ihr`. */
  de: {
    title: 'Das Brötchenblech',
    instruction: 'Die Brötchen dort auseinanderbrechen, wo beide Teile Aufgaben sind, die die Klasse schon kann.',
    hintWhole: 'An welcher Rille brecht ihr auseinander, damit beide Teile Aufgaben sind, die ihr schon könnt?',
    hintCut: 'Dieselben Brötchen wie vorher, jetzt in zwei Teilen. Lest beide Teile vor, brecht noch einmal auseinander oder schiebt sie wieder zusammen und brecht an einer anderen Rille.',
    hintCut3: 'Dieselben Brötchen wie vorher, jetzt in drei Teilen. Lest jedes Teil vor.',
    hintSquare: 'Gleich viele Reihen wie Brötchen in jeder Reihe. Dreht das Blech — und sagt dann, wo ihr auseinanderbrecht.',
    sceneWhole: 'Ein Blech Brötchen: {r} [r|Reihe mit|Reihen zu je] {c}.',
    sceneCut2: 'Ein Blech Brötchen in zwei Teilen: {a} [a|Reihe mit|Reihen zu je] {c} und {b} [b|Reihe mit|Reihen zu je] {c}.',
    sceneCut3: 'Ein Blech Brötchen in drei Teilen: {a} [a|Reihe mit|Reihen zu je] {c}, {b} [b|Reihe mit|Reihen zu je] {c} und {d} [d|Reihe mit|Reihen zu je] {c}.',
    sceneCol2: 'Ein Blech Brötchen in zwei Teilen: {r} [r|Reihe mit|Reihen zu je] {a} und {r} [r|Reihe mit|Reihen zu je] {b}.',
    sceneCol3: 'Ein Blech Brötchen in drei Teilen: {r} [r|Reihe mit|Reihen zu je] {a}, {r} [r|Reihe mit|Reihen zu je] {b} und {r} [r|Reihe mit|Reihen zu je] {d}.',
    turnBtn: 'Blech drehen',
    turnAria: 'Das Blech um eine Vierteldrehung drehen.',
    rowsDown: 'Eine Reihe weniger.',
    rowsUp: 'Eine Reihe mehr.',
    colsDown: 'Eins weniger in jeder Reihe.',
    colsUp: 'Eins mehr in jeder Reihe.',
    rowCombAria: 'Wo zwischen den Reihen auseinanderbrechen.',
    colCombAria: 'Wo zwischen den Spalten auseinanderbrechen.',
    breakRow: 'Nach Reihe {k} auseinanderbrechen: oben {a} [a|Reihe|Reihen], unten {b} [b|Reihe|Reihen].',
    breakCol: 'Nach Spalte {k} auseinanderbrechen: links {a} in jeder Reihe, rechts {b} in jeder Reihe.',
    pushRow: 'Die beiden Teile nach Reihe {k} wieder zusammenschieben.',
    pushCol: 'Die beiden Teile nach Spalte {k} wieder zusammenschieben.',
    saidTurned: 'Gedreht. {r} [r|Reihe mit|Reihen zu je] {c}.',
    printBtn: 'Dieses Blech drucken',
    gateTitle: 'Die Blätter zum Ausdrucken',
    gateBody: 'Ein Blatt zum Brechen auf Papier: zuerst das ganze Blech, dann dasselbe Blech noch einmal, jedes an einer anderen Rille auseinandergebrochen, mit einer Zeile zum Aufschreiben unter jedem.',
    gateCta: 'Zum Lehrkraft-Abo',
    setGroove: 'Jede fünfte Rille tiefer',
    setRange: 'Auch 11 und 12'
  },

  /* ---------------------------------------------------------------- FR
     ⚠ VETOES, all checked against the shipped French catalogue:
      · `boulangerie`/`biscuit`/`assiette`/`boîte` — owned outright by
        maple-bakery, a DIVISION game.
      · `couper`/`part`/`tablette`/`chocolat`/`gâteau`/`couteau` — owned
        by La cuisine des fractions; `couper` says FRACTIONS in French.
      · `diviser`/`partager`/`séparer`/`fractionner` — all say DIVISION.
        The verb is `casser`: it is what you do to bread, it removes
        nothing, and no other tool has it.
      · `ligne` for the seam — two shipped tools are NAMED with it
        (Ligne numérique, La ligne des sauts). Hence `un creux`, kept as
        the single seam noun in every string.
      · `plateau` — the pan of Balance des nombres, the tray in Les
        couvercles, the tray in La cuisine des fractions. `plaque` is the
        right French for a baking sheet and appears nowhere else.
     `brioche Nanterre` is literally rows of dough balls baked touching
     and torn apart at table — the object exists in France exactly as
     the tool models it. Infinitives throughout, matching #45's shipped
     French aria style. */
  fr: {
    title: 'La plaque de brioches',
    instruction: 'Casser la plaque là où les deux morceaux sont des rangées que la classe connaît déjà.',
    hintWhole: 'Regarder les creux : lequel donne deux morceaux déjà connus ?',
    hintCut: 'Les mêmes brioches qu’avant, en deux morceaux. Lire chaque morceau, puis casser encore dans un creux du même sens, ou les remettre ensemble et casser ailleurs.',
    hintCut3: 'Les mêmes brioches qu’avant, en trois morceaux. Lire chaque morceau. Pour casser autrement, refermer d’abord un creux.',
    hintSquare: 'Autant de rangées que de brioches dans chaque rangée. Tourner la plaque, regarder si quelque chose change, puis dire dans quel creux casser.',
    sceneWhole: 'Une plaque de brioches : {r} [r|rangée|rangées] de {c}.',
    sceneCut2: 'Une plaque de brioches en deux morceaux : {a} [a|rangée|rangées] de {c} et {b} [b|rangée|rangées] de {c}.',
    sceneCut3: 'Une plaque de brioches en trois morceaux : {a} [a|rangée|rangées] de {c}, {b} [b|rangée|rangées] de {c} et {d} [d|rangée|rangées] de {c}.',
    sceneCol2: 'Une plaque de brioches en deux morceaux : {r} [r|rangée|rangées] de {a} et {r} [r|rangée|rangées] de {b}.',
    sceneCol3: 'Une plaque de brioches en trois morceaux : {r} [r|rangée|rangées] de {a}, {r} [r|rangée|rangées] de {b} et {r} [r|rangée|rangées] de {d}.',
    turnBtn: 'Tourner la plaque',
    turnAria: 'Tourner la plaque d’un quart de tour : les creux changent de sens.',
    rowsDown: 'Enlever une rangée.',
    rowsUp: 'Ajouter une rangée.',
    colsDown: 'Enlever une brioche dans chaque rangée.',
    colsUp: 'Ajouter une brioche dans chaque rangée.',
    rowCombAria: 'Les creux entre les rangées.',
    colCombAria: 'Les creux entre les colonnes.',
    breakRow: 'Casser après la rangée {k} : {a} [a|rangée|rangées] au-dessus, {b} [b|rangée|rangées] en dessous.',
    breakCol: 'Casser après la colonne {k} : {a} [a|brioche|brioches] dans chaque rangée à gauche, {b} [b|brioche|brioches] dans chaque rangée à droite.',
    pushRow: 'Remettre les deux morceaux ensemble, dans le creux après la rangée {k}.',
    pushCol: 'Remettre les deux morceaux ensemble, dans le creux après la colonne {k}.',
    saidTurned: 'Plaque tournée. {r} [r|rangée|rangées] de {c}.',
    printBtn: 'Imprimer la fiche de cette plaque',
    gateTitle: 'La fiche à imprimer',
    gateBody: 'Une fiche à casser sur le papier : d’abord la plaque entière, puis la même plaque cassée dans plusieurs creux différents, dans un sens comme dans l’autre, avec une ligne pour écrire sous chaque dessin.',
    gateCta: 'Voir l’offre Enseignant',
    setGroove: 'Creux plus profond toutes les cinq brioches',
    setRange: 'Rangées et colonnes jusqu’à 12'
  },

  /* ---------------------------------------------------------------- ES
     ⚠ SPANISH BREAKS THE BREAD, NEVER THE TRAY. English's "break the
     tray" is metonymy Spanish will not take — *romper la bandeja* means
     destroying the metal pan — so every string acts on the BOLLOS. The
     tray is still turned and printed; it is only never broken.
     ⚠ `panecillos`, NOT `bollos`. `bollo` is the right everyday word in
     Spain, but this platform's `es` is not a Spain file (center-board
     opens "En muchos salones de México…"), and in Caribbean Spanish
     *bollo* is vulgar slang. Same class as the Swedish `banan` near-miss:
     a word that is perfectly innocent in one region and unshippable in
     another. `panecillos` carries no such reading anywhere.
     VETOES: panadería/galletas/platos/cajas (maple-bakery, a DIVISION
     activity) · cortar/partes/chocolate/tableta (La cocina de fracciones
     — `cortar` IS the fractions verb here) · partir/repartir/dividir
     (all say division) · pedazo (fraction-equiv uses it) · vuelta
     (money-mat's change, and unroll-tape's name) · raya (letter-studio's
     handwriting rule). */
  es: {
    title: 'La bandeja de panecillos',
    instruction: 'Separa los panecillos donde te queden dos trozos que la clase ya se sepa.',
    hintWhole: '¿Dónde puedes separar los panecillos de manera que los dos trozos ya te los sepas?',
    hintCut: 'Los mismos panecillos, ahora en dos trozos. Lee cada uno; luego vuelve a separar uno de los dos, o júntalos y sepáralos en otra línea.',
    hintCut3: 'Los mismos panecillos, ahora en tres trozos. Lee cada uno; para seguir, junta dos.',
    hintSquare: 'Hay tantas filas como panecillos en cada fila. Gira la bandeja y di dónde separarías los panecillos.',
    sceneWhole: 'Una bandeja de panecillos: {r} [r|fila|filas] de {c}.',
    sceneCut2: 'Una bandeja de panecillos en dos trozos: {a} [a|fila|filas] de {c} y {b} [b|fila|filas] de {c}.',
    sceneCut3: 'Una bandeja de panecillos en tres trozos: {a} [a|fila|filas] de {c}, {b} [b|fila|filas] de {c} y {d} [d|fila|filas] de {c}.',
    sceneCol2: 'Una bandeja de panecillos en dos trozos: {r} [r|fila|filas] de {a} y {r} [r|fila|filas] de {b}.',
    sceneCol3: 'Una bandeja de panecillos en tres trozos: {r} [r|fila|filas] de {a}, {r} [r|fila|filas] de {b} y {r} [r|fila|filas] de {d}.',
    turnBtn: 'Girar la bandeja',
    turnAria: 'Girar la bandeja: un cuarto de giro.',
    rowsDown: 'Una fila menos.',
    rowsUp: 'Una fila más.',
    colsDown: 'Un panecillo menos en cada fila.',
    colsUp: 'Un panecillo más en cada fila.',
    rowCombAria: 'Dónde separar los panecillos: arriba y abajo.',
    colCombAria: 'Dónde separar los panecillos: izquierda y derecha.',
    breakRow: 'Separar después de la fila {k}: {a} [a|fila|filas] arriba y {b} [b|fila|filas] abajo.',
    breakCol: 'Separar después de la columna {k}: a la izquierda, {a} [a|panecillo|panecillos] en cada fila; a la derecha, {b} [b|panecillo|panecillos] en cada fila.',
    pushRow: 'Juntar los trozos después de la fila {k}.',
    pushCol: 'Juntar los trozos después de la columna {k}.',
    saidTurned: 'Ya está girada. Una bandeja de panecillos: {r} [r|fila|filas] de {c}.',
    printBtn: 'Imprimir esta bandeja',
    gateTitle: 'La bandeja en papel',
    gateBody: 'Una hoja para separar los panecillos en papel: primero la bandeja entera y luego la misma bandeja separada en varias líneas distintas, con un renglón debajo de cada una para escribir.',
    gateCta: 'Ver el plan Docente',
    setGroove: 'Línea más marcada cada cinco panecillos',
    setRange: 'Permitir bandejas de 11 y de 12'
  },

  /* ---------------------------------------------------------------- IT
     ⚠ ITALIAN'S OPERATOR WORD IS `per`, WHICH IS ALSO THE LANGUAGE'S
     SECOND COMMONEST PREPOSITION. Every string below is written with
     ZERO occurrences of per / volta / volte / fa / uguale / totale /
     in tutto — so ordinary phrasings like *una riga per volta* and
     *per ogni riga* are unavailable to Italian AND ONLY TO ITALIAN.
     Do not "improve" them back later.
     `{r} righe da {c}` is the platform's own established Italian for an
     array (activity-content/it.json: "3 righe da 4") and the only
     reading of "rows of" that does not go through `per`.
     `spezzare` is the bread verb, and the platform already uses it for
     this exact idea one grade earlier ("il bambino SPEZZA il secondo
     numero… per trasformare un calcolo difficile in uno facile").
     VETOES: vassoio (six live uses, and you carry one rather than bake
     in it) · cucina/tagliare/torta/cioccolato (La cucina delle frazioni;
     `tagliare` is that tool's verb AND says fraction) · panetteria (a
     live worksheet THEME with its own topic pages) · dividere/parti
     (division and fractions) · linea (Linea dei numeri, La linea dei
     salti) · danubio (the perfect object, but Neapolitan — a child in
     Bergamo has never seen one). */
  it: {
    title: 'La teglia dei panini',
    instruction: 'Spezzate i panini dove tutti e due i pezzi stanno in una tabellina che la classe sa già.',
    hintWhole: 'Dove spezzate i panini, così tutti e due i pezzi li sapete già dire?',
    hintCut: 'Sono gli stessi panini di prima, adesso in due pezzi. Leggeteli tutti e due, poi spezzate ancora oppure rimetteteli insieme e spezzate in un altro punto.',
    hintCut3: 'Sono gli stessi panini di prima, adesso in tre pezzi. Leggeteli tutti e tre. Adesso si può soltanto rimettere insieme e spezzare in un altro punto.',
    hintSquare: 'Le righe sono tante quanti i panini di ogni riga. Girate la teglia, poi dite dove spezzereste.',
    sceneWhole: 'Una teglia di panini: {r} [r|riga|righe] da {c}.',
    sceneCut2: 'Una teglia di panini in due pezzi: {a} [a|riga|righe] da {c} e {b} [b|riga|righe] da {c}.',
    sceneCut3: 'Una teglia di panini in tre pezzi: {a} [a|riga|righe] da {c}, {b} [b|riga|righe] da {c} e {d} [d|riga|righe] da {c}.',
    sceneCol2: 'Una teglia di panini in due pezzi: {r} [r|riga|righe] da {a} e {r} [r|riga|righe] da {b}.',
    sceneCol3: 'Una teglia di panini in tre pezzi: {r} [r|riga|righe] da {a}, {r} [r|riga|righe] da {b} e {r} [r|riga|righe] da {d}.',
    turnBtn: 'Gira la teglia',
    turnAria: 'Girare la teglia di un quarto di giro.',
    rowsDown: 'Una riga in meno.',
    rowsUp: 'Una riga in più.',
    colsDown: 'Un panino in meno in ogni riga.',
    colsUp: 'Un panino in più in ogni riga.',
    rowCombAria: 'Dove spezzare fra le righe.',
    colCombAria: 'Dove spezzare fra le colonne.',
    breakRow: 'Spezzare dopo la riga {k}: sopra {a} [a|riga|righe], sotto {b} [b|riga|righe].',
    breakCol: 'Spezzare dopo la colonna {k}: a sinistra {a} [a|panino|panini] in ogni riga, a destra {b} [b|panino|panini] in ogni riga.',
    pushRow: 'Rimettere insieme i due pezzi dopo la riga {k}.',
    pushCol: 'Rimettere insieme i due pezzi dopo la colonna {k}.',
    saidTurned: 'Teglia girata. {r} [r|riga|righe] da {c}.',
    printBtn: 'Stampa questa teglia',
    gateTitle: 'I fogli da stampare',
    gateBody: 'Fogli da spezzare sulla carta: prima la teglia intera, poi la stessa teglia spezzata in punti diversi, con sotto ognuna una linea su cui scrivere.',
    gateCta: 'Il piano Insegnante',
    setGroove: 'Solco più profondo ogni cinque panini',
    setRange: 'Anche 11 e 12'
  },

  /* ---------------------------------------------------------------- NL
     ⚠ `breekbrood` — real NL supermarket bread, bolletjes baked touching
     and torn apart at table, and the compound NAMES ITS OWN AFFORDANCE
     so it teaches no vocabulary before the mathematics.
     VETOES: `bakplaat` (De breukenkeuken ships a NAMED premium activity
     called "Bakplaat-uitdaging" — the obvious word, taken by the
     fractions tool for a nearly identical rectangle) · `plaat`
     (De bouwplaat owns the compound; `plaatje` = picture, 16 uses) ·
     `delen/deel/verdelen` (DIVISION) · `snijden/mes` (the fractions
     kitchen's knife) · `vouw` (Het vouwblad) · ⚠⚠ ANY compound on
     `breuk-` — `breuk` IS the Dutch word for fraction, so `breukbrood`
     would put the fractions tool inside a multiplication tool.
     `naad` is the one seam word (a child knows it from de naad van je
     broek); `{k}` counts the SEAM, never the row, so the label stays
     true inside a piece. ⚠ The acute in `Eén` is load-bearing: bare
     `een` is the indefinite article, so "Een rij minder" would read as
     "a row fewer". */
  nl: {
    title: 'Het breekbrood',
    instruction: 'Breek het brood daar waar allebei de stukken tafelsommen zijn die de klas al kent.',
    hintWhole: 'Bij welke naad breek je, zodat je allebei de stukken al kent?',
    hintCut: 'Dezelfde broodjes als eerst, nu in twee stukken. Lees ze allebei hardop, breek daarna bij nog één naad, of duw ze weer tegen elkaar en breek bij een andere.',
    hintCut3: 'Dezelfde broodjes als eerst, nu in drie stukken. Lees ze alle drie hardop. Verder breken kan niet meer: duw ze weer tegen elkaar om het anders te doen.',
    hintSquare: 'Even veel rijen als broodjes in elke rij. Draai het brood, en zeg daarna waar je gaat breken.',
    sceneWhole: 'Een breekbrood: {r} [r|rij|rijen] van {c}.',
    sceneCut2: 'Hetzelfde breekbrood in twee stukken: boven {a} [a|rij|rijen] van {c}, onder {b} [b|rij|rijen] van {c}.',
    sceneCut3: 'Hetzelfde breekbrood in drie stukken: boven {a} [a|rij|rijen] van {c}, in het midden {b} [b|rij|rijen] van {c}, onder {d} [d|rij|rijen] van {c}.',
    sceneCol2: 'Hetzelfde breekbrood in twee stukken: links {r} [r|rij|rijen] van {a}, rechts {r} [r|rij|rijen] van {b}.',
    sceneCol3: 'Hetzelfde breekbrood in drie stukken: links {r} [r|rij|rijen] van {a}, in het midden {r} [r|rij|rijen] van {b}, rechts {r} [r|rij|rijen] van {d}.',
    turnBtn: 'Brood draaien',
    turnAria: 'Het brood een kwartslag draaien: de rijen en wat er in elke rij ligt wisselen om.',
    rowsDown: 'Eén rij minder.',
    rowsUp: 'Eén rij meer.',
    colsDown: 'Eén broodje minder in elke rij.',
    colsUp: 'Eén broodje meer in elke rij.',
    rowCombAria: 'De naden die van links naar rechts lopen.',
    colCombAria: 'De naden die van boven naar beneden lopen.',
    breakRow: 'Breken bij naad {k}: {a} [a|rij|rijen] erboven, {b} [b|rij|rijen] eronder.',
    breakCol: 'Breken bij naad {k}: links {a} [a|broodje|broodjes] in elke rij, rechts {b} [b|broodje|broodjes] in elke rij.',
    pushRow: 'De stukken boven en onder naad {k} weer tegen elkaar duwen.',
    pushCol: 'De stukken links en rechts van naad {k} weer tegen elkaar duwen.',
    saidTurned: 'Gedraaid. {r} [r|rij|rijen] van {c}.',
    printBtn: 'Dit brood afdrukken',
    gateTitle: 'De bladen om af te drukken',
    gateBody: 'Een blad om op papier te breken: eerst het hele brood, daarna hetzelfde brood telkens bij een andere naad gebroken, van links naar rechts én van boven naar beneden, met onder elke tekening een lijn om op te schrijven.',
    gateCta: 'Bekijk het Leerkracht-pakket',
    setGroove: 'Elke vijfde naad wat dieper',
    setRange: 'Tot 12 rijen en 12 in elke rij'
  },

  /* ---------------------------------------------------------------- PT
     Brazilian. VETOES: `tabuleiro` (fraction-kitchen owns it, and in
     Brazil it is first a GAME board) · `bandeja` (ten uses across six
     tools, and you do not bake on one) · `forma` (physically perfect,
     unusable: *forma* = SHAPE, 46 + 186 uses across the geometry
     strand) · `padaria/biscoito` (the division activity, and money-mat's
     "caixa da padaria") · `cortar/faca` (the fraction kitchen's verb and
     whole image) · `dividir/repartir/partir` (division outright) ·
     `parte/partes` (part-whole-frame ships as "Um total, duas partes",
     and *partes iguais* IS the fraction sentence) · `vinco` (A folha que
     dobra) · `juntar` (⚠ the BNCC's own word for ADDITION) · `empurrar`
     (rekenrek's headline move) · `virar` (means flip over — the buns
     would land on the floor) · `fato` (a Brazilian teacher says *conta*,
     never *fato*).
     ⚠ `linha` is FATAL for the seam: *linhas e colunas* is how every
     Brazilian teacher names an array, so *linha* reads as ROW. Hence
     `fileira` for row (already the platform's word) and `marca` for the
     seam. `quebrar` is kept: place-value-lab already ships "por que eu
     quebraria uma dezena?" — the same metaphor, one strand over. */
  pt: {
    title: 'A assadeira de pãezinhos',
    instruction: 'Quebre a assadeira onde os dois pedaços forem contas que a turma já sabe de cor.',
    hintWhole: 'Onde vocês podem quebrar para os dois pedaços serem contas que vocês já sabem?',
    hintCut: 'Os mesmos pãezinhos de antes, agora em dois pedaços. Leiam cada pedaço; depois quebrem de novo, ou encostem os dois de volta e quebrem em outro lugar.',
    hintCut3: 'Os mesmos pãezinhos de antes, agora em três pedaços. Leiam cada um; para continuar, encostem dois de volta.',
    hintSquare: 'O mesmo tanto de fileiras e de pãezinhos em cada fileira. Girem a assadeira e digam onde vocês quebrariam.',
    sceneWhole: 'Uma assadeira de pãezinhos: {r} [r|fileira|fileiras] de {c}.',
    sceneCut2: 'Uma assadeira de pãezinhos em dois pedaços: {a} [a|fileira|fileiras] de {c} e {b} [b|fileira|fileiras] de {c}.',
    sceneCut3: 'Uma assadeira de pãezinhos em três pedaços: {a} [a|fileira|fileiras] de {c}, {b} [b|fileira|fileiras] de {c} e {d} [d|fileira|fileiras] de {c}.',
    sceneCol2: 'Uma assadeira de pãezinhos em dois pedaços: {r} [r|fileira|fileiras] de {a} e {r} [r|fileira|fileiras] de {b}.',
    sceneCol3: 'Uma assadeira de pãezinhos em três pedaços: {r} [r|fileira|fileiras] de {a}, {r} [r|fileira|fileiras] de {b} e {r} [r|fileira|fileiras] de {d}.',
    turnBtn: 'Girar a assadeira',
    turnAria: 'Girar a assadeira de lado.',
    rowsDown: 'Uma fileira a menos.',
    rowsUp: 'Uma fileira a mais.',
    colsDown: 'Um pãozinho a menos em cada fileira.',
    colsUp: 'Um pãozinho a mais em cada fileira.',
    rowCombAria: 'Onde quebrar, entre as fileiras.',
    colCombAria: 'Onde quebrar, entre as colunas.',
    breakRow: 'Quebrar depois da fileira {k}: em cima, {a} [a|fileira|fileiras]; embaixo, {b} [b|fileira|fileiras].',
    breakCol: 'Quebrar depois da coluna {k}: à esquerda, {a} [a|pãozinho|pãezinhos] em cada fileira; à direita, {b} [b|pãozinho|pãezinhos] em cada fileira.',
    pushRow: 'Encostar os dois pedaços de volta, depois da fileira {k}.',
    pushCol: 'Encostar os dois pedaços de volta, depois da coluna {k}.',
    saidTurned: 'Assadeira girada. {r} [r|fileira|fileiras] de {c}.',
    printBtn: 'Imprimir esta assadeira',
    gateTitle: 'A folha para imprimir',
    gateBody: 'Uma folha para quebrar no papel: primeiro a assadeira inteira e depois a mesma assadeira de novo, cada vez quebrada em um lugar diferente, com uma pauta embaixo de cada uma para escrever.',
    gateCta: 'Ver o plano Professor',
    setGroove: 'Marca mais funda a cada cinco pãezinhos',
    setRange: 'Permitir até 12 fileiras e 12 colunas'
  },

  /* ---------------------------------------------------------------- SV
     ⚠⚠ `bit` IS SAFE IN THE PLURAL AND FORBIDDEN IN THE SINGULAR
     DEFINITE: *biten* is also the past participle of *bita*, so "skjut
     ihop biten" reads as "push the BITTEN one" — in a tool about baked
     goods. This is the `banan` defect one letter away from shipping, so
     every string uses *en bit / varje bit / två bitar / bitarna*.
     Also vetoed on the definite form: `form → formen` (= THE SHAPE, and
     this tool asks about shape on every screen), `panna → pannan`
     (= the forehead, and Bråkköket owns *långpannan*), `ark → arken`
     (= Noah's Ark), `springa → springan` (= "the run").
     Other vetoes: `bricka` (24 shipped uses as counter/token) ·
     `kaka/chokladkakan` (Bråkköket, and *kaka* says fraction) ·
     `Bageriet` (the division activity) · `dela` (says DIVISION, 47
     shipped uses, and Helhet och delar owns *delar* — which is why the
     pieces are *bitar*, never *delar*) · `knäcka` (⚠ *knäcka läskoden*
     is THE Swedish phrase for learning to read, and this platform ships
     seven reading tools) · `skära` (Bråkköket's knife).
     ⭐ The scene strings put a PLACEHOLDER INSIDE the bracket form,
     because *i varje* is nonsense for one row and dropping it makes the
     plural ambiguous between "7 rows of 6 each" and "7 rows totalling
     6". `_fmt` resolves brackets before interpolation; pinned by test. */
  sv: {
    title: 'Bullplåten',
    instruction: 'Bryt isär bullarna där båda bitarna är uppgifter som klassen redan kan.',
    hintWhole: 'Var kan ni bryta isär bullarna, så att båda bitarna är uppgifter ni redan kan?',
    hintCut: 'Lika många bullar som förut, nu i två bitar. Läs båda bitarna. Skjut ihop dem och bryt isär på ett annat ställe — eller bryt isär en gång till, om det går.',
    hintCut3: 'Lika många bullar som förut, nu i tre bitar. Läs varje bit, och skjut ihop två av dem när ni vill.',
    hintSquare: 'Lika många rader som det finns i varje rad. Vrid plåten och säg sedan var ni skulle bryta isär.',
    sceneWhole: 'En plåt bullar: {r} [r|rad med {c}|rader med {c} i varje].',
    sceneCut2: 'En plåt bullar i två bitar: {a} [a|rad med {c}|rader med {c} i varje] och {b} [b|rad med {c}|rader med {c} i varje].',
    sceneCut3: 'En plåt bullar i tre bitar: {a} [a|rad med {c}|rader med {c} i varje], {b} [b|rad med {c}|rader med {c} i varje] och {d} [d|rad med {c}|rader med {c} i varje].',
    sceneCol2: 'En plåt bullar i två bitar: {r} [r|rad med {a}|rader med {a} i varje] och {r} [r|rad med {b}|rader med {b} i varje].',
    sceneCol3: 'En plåt bullar i tre bitar: {r} [r|rad med {a}|rader med {a} i varje], {r} [r|rad med {b}|rader med {b} i varje] och {r} [r|rad med {d}|rader med {d} i varje].',
    turnBtn: 'Vrid plåten',
    turnAria: 'Vrid plåten ett kvarts varv.',
    rowsDown: 'En rad mindre.',
    rowsUp: 'En rad till.',
    colsDown: 'En bulle mindre i varje rad.',
    colsUp: 'En bulle till i varje rad.',
    rowCombAria: 'Var bullarna bryts isär tvärs över, mellan raderna.',
    colCombAria: 'Var bullarna bryts isär uppifrån och ner, mellan kolumnerna.',
    breakRow: 'Bryt isär efter rad {k}: {a} [a|rad|rader] ovanför, {b} [b|rad|rader] nedanför.',
    breakCol: 'Bryt isär efter kolumn {k}: {a} [a|bulle|bullar] i varje rad till vänster, {b} [b|bulle|bullar] i varje rad till höger.',
    pushRow: 'Skjut ihop de två bitarna vid rad {k}.',
    pushCol: 'Skjut ihop de två bitarna vid kolumn {k}.',
    saidTurned: 'Vriden ett kvarts varv. {r} [r|rad med {c}|rader med {c} i varje].',
    printBtn: 'Skriv ut plåten',
    gateTitle: 'Bladen att skriva ut',
    gateBody: 'Ett blad att bryta isär på papper: först hela plåten, sedan samma plåt igen och igen, varje bild bruten vid en annan skåra, med en linje under varje bild att skriva på.',
    gateCta: 'Se Lärarplanen',
    setGroove: 'Var femte skåra djupare',
    setRange: 'Tillåt 11 och 12 rader eller kolumner'
  },

  /* ---------------------------------------------------------------- NO
     ⚠⚠ NORWEGIAN'S OPERATOR WORD IS `gange/ganger` — AND `gang` IS ALSO
     THE ORDINARY WORD FOR "A TIME". The natural Norwegian for "break it
     again" is *bryt en gang til*, which puts the operator string beside
     a numeral in a multiplication tool. Every instance is eliminated:
     `hintCut` uses *bryte på nytt*, `hintCut3* uses *ikke bryte mer*.
     ⚠ AND IN CHILDREN'S SPEECH `og` BETWEEN TWO BARE NUMERALS READS AS
     PLUS ("to og to er fire"), so the material noun is MANDATORY after
     every numeral — which is why each clause carries TWO markers rather
     than one. After a numeral Norwegian takes the INDEFINITE plural
     (*6 boller*, never *6 bollene*).
     VETOES: `brett/Bollebrettet` (⚠ *brettet* is both "the tray" AND the
     past participle of *å brette*, "folded" — "Skriv ut brettet" reads
     as *print it folded*; folding-sheet also owns `brettelinjen`, and
     `nettbrett` occurs 34 times) · `langpanne/kake/sjokolade/skjære`
     (Brøkkjøkkenet owns all four) · `del/deler/delelinje` (*dele* is TO
     DIVIDE; part-whole-frame ships as "Helhet og deler") · `stykke`
     (⚠ *gangestykke* — the pieces cannot be *stykker* in a tool that
     must never say *gange*) · `rutenett` (already the grid) · `form`
     (= shape) · `spor` (unroll-tape ships as Hyssingsporet).
     `bryte` is idiomatic for this exact object: **brytebrød** is the
     Norwegian word for tear-and-share bread. */
  no: {
    title: 'Bolleplata',
    instruction: 'Bryt plata der begge bitene er noe klassen kjenner fra før.',
    hintWhole: 'Bollene henger sammen hele veien. Hvor kan dere bryte, slik at dere kjenner begge bitene fra før?',
    hintCut: 'Like mange boller som før, i to biter. Si hver bit høyt. Så kan dere bryte på nytt, eller skyve bitene sammen igjen og bryte et annet sted.',
    hintCut3: 'Like mange boller som før, i tre biter. Si hver bit høyt. Nå kan dere ikke bryte mer – skyv sammen igjen når dere vil prøve et annet sted.',
    hintSquare: 'Like mange rader som det er boller i hver rad. Å snu denne plata gir ingen nye brytelinjer – si heller hvor dere ville brutt, og hvorfor.',
    sceneWhole: 'Hele bolleplata: {r} [r|rad|rader] med {c} [c|bolle|boller].',
    sceneCut2: 'Bolleplata i to biter, like mange boller som før: {a} [a|rad|rader] med {c} [c|bolle|boller] og {b} [b|rad|rader] med {c} [c|bolle|boller].',
    sceneCut3: 'Bolleplata i tre biter, like mange boller som før: {a} [a|rad|rader] med {c} [c|bolle|boller], {b} [b|rad|rader] med {c} [c|bolle|boller] og {d} [d|rad|rader] med {c} [c|bolle|boller].',
    sceneCol2: 'Bolleplata i to biter, like mange boller som før: {r} [r|rad|rader] med {a} [a|bolle|boller] og {r} [r|rad|rader] med {b} [b|bolle|boller].',
    sceneCol3: 'Bolleplata i tre biter, like mange boller som før: {r} [r|rad|rader] med {a} [a|bolle|boller], {r} [r|rad|rader] med {b} [b|bolle|boller] og {r} [r|rad|rader] med {d} [d|bolle|boller].',
    turnBtn: 'Snu plata',
    turnAria: 'Snu plata en kvart omdreining.',
    rowsDown: 'Én rad mindre.',
    rowsUp: 'Én rad til.',
    colsDown: 'Én bolle mindre i hver rad.',
    colsUp: 'Én bolle til i hver rad.',
    rowCombAria: 'Velg hvilken rad brytelinja skal gå under.',
    colCombAria: 'Velg hvilken bolle i raden brytelinja skal gå etter.',
    breakRow: 'Bryt under rad {k}: {a} [a|rad|rader] over og {b} [b|rad|rader] under.',
    breakCol: 'Bryt etter bolle {k} i hver rad: {a} [a|bolle|boller] til venstre og {b} [b|bolle|boller] til høyre.',
    pushRow: 'Skyv bitene sammen igjen under rad {k}.',
    pushCol: 'Skyv bitene sammen igjen etter bolle {k} i hver rad.',
    saidTurned: 'Snudd. Like mange boller, lest den andre veien: {r} [r|rad|rader] med {c} [c|bolle|boller].',
    printBtn: 'Skriv ut denne plata',
    gateTitle: 'Arkene du kan skrive ut',
    gateBody: 'En side å bryte på papir: først hele bolleplata, så den samme plata om igjen for hver brytelinje, med ei skrivelinje under hvert bilde.',
    gateCta: 'Se Lærerabonnementet',
    setGroove: 'Dypere rille ved hver femte brytelinje',
    setRange: 'Tillat opptil 12 rader og 12 boller i hver rad'
  },

  /* ---------------------------------------------------------------- DA
     ⚠ VERB VETOES ARE THE INTERESTING ONES HERE. `brække` is out because
     the imperative *Bræk* stands alone at the head of every option and
     *bræk* is also the vulgar noun for vomit — second-graders find that
     in about four seconds. `flække` is out because *at flække en bolle*
     means slicing it open to butter it: precisely the wrong image.
     `dele/opdele/skille` say DIVISION; `skære` is Brøkkøkkenet's.
     Hence **knække**.
     ⚠ `Bollepladen` is vetoed AS THE NAME — *bolle* carries a coarse
     verb in Danish, and a name said aloud every day is where that
     lands. As a noun after a numeral inside a sentence it is
     unremarkable school Danish, so the material stays *boller*.
     `bakken` (Pengemåtten, Brøkkøkkenet) and `bradepanden`/`plade
     chokolade` (Brøkkøkkenet) are taken; `pladen` alone is the bingo
     card in maker-content, hence the compound **Bagepladen**.
     ⚠ AND DANISH HAS NO USABLE WORD FOR "COLUMN": *søjle* is the bar in
     Klassens diagram, *kolonne* is the place-value column in
     Vekslemaskinen. So the tool says *i rækken / i hver række*
     throughout — which is better Danish anyway. */
  da: {
    title: 'Bagepladen',
    instruction: 'Knæk pladen dér, hvor I kan begge stykker i forvejen.',
    hintWhole: 'Hvor vil I knække pladen? Der er ikke ét rigtigt sted — sig, hvad I kan i forvejen, og knæk dér.',
    hintCut: 'Det er de samme boller som før, nu i to stykker. Sig hvert stykke højt. Knæk så et af stykkerne igen, eller skub dem sammen og knæk et andet sted.',
    hintCut3: 'Det er de samme boller som før, nu i tre stykker. Sig hvert stykke højt. Længere kan pladen ikke knækkes — skub to stykker sammen igen, hvis I vil prøve et andet sted.',
    hintSquare: 'Der er lige så mange rækker, som der er boller i rækken. Pladen ser ens ud, når den drejes, så her er det jer, der vælger, hvor den skal knækkes.',
    sceneWhole: 'Bagepladen i ét stykke: {r} [r|række|rækker] med {c} [c|bolle|boller] [r|i rækken|i hver række].',
    sceneCut2: 'Bagepladen i to stykker: {a} [a|række|rækker] med {c} [c|bolle|boller] [a|i rækken|i hver række] og {b} [b|række|rækker] med {c} [c|bolle|boller] [b|i rækken|i hver række].',
    sceneCut3: 'Bagepladen i tre stykker: {a} [a|række|rækker] med {c} [c|bolle|boller] [a|i rækken|i hver række], {b} [b|række|rækker] med {c} [c|bolle|boller] [b|i rækken|i hver række] og {d} [d|række|rækker] med {c} [c|bolle|boller] [d|i rækken|i hver række].',
    sceneCol2: 'Bagepladen i to stykker: {r} [r|række|rækker] med {a} [a|bolle|boller] [r|i rækken|i hver række] og {r} [r|række|rækker] med {b} [b|bolle|boller] [r|i rækken|i hver række].',
    sceneCol3: 'Bagepladen i tre stykker: {r} [r|række|rækker] med {a} [a|bolle|boller] [r|i rækken|i hver række], {r} [r|række|rækker] med {b} [b|bolle|boller] [r|i rækken|i hver række] og {r} [r|række|rækker] med {d} [d|bolle|boller] [r|i rækken|i hver række].',
    turnBtn: 'Drej pladen',
    turnAria: 'Drej pladen en kvart omdrejning.',
    rowsDown: 'Én række færre på pladen.',
    rowsUp: 'Én række mere på pladen.',
    colsDown: 'Én bolle færre i rækken.',
    colsUp: 'Én bolle mere i rækken.',
    rowCombAria: 'Vælg, hvor pladen skal knækkes mellem to rækker.',
    colCombAria: 'Vælg, hvor pladen skal knækkes tværs igennem alle rækker.',
    breakRow: 'Knæk efter række {k}: {a} [a|række|rækker] over og {b} [b|række|rækker] under.',
    breakCol: 'Knæk efter den {k}. bolle i rækken: {a} [a|bolle|boller] til venstre og {b} [b|bolle|boller] til højre [r|i rækken|i hver række].',
    pushRow: 'Skub stykkerne sammen igen efter række {k}.',
    pushCol: 'Skub stykkerne sammen igen efter den {k}. bolle i rækken.',
    saidTurned: 'Drejet. Nu {r} [r|række|rækker] med {c} [c|bolle|boller] [r|i rækken|i hver række].',
    printBtn: 'Print pladen',
    gateTitle: 'Arket til print',
    gateBody: 'Et ark til at knække på papir: først den hele plade, så den samme plade igen, knækket ved hver af de revner, der er — med en skrivelinje under hver.',
    gateCta: 'Se Lærerabonnementet',
    setGroove: 'Dybere revne efter hver femte bolle',
    setRange: 'Tillad op til 12 rækker og 12 boller i rækken'
  },

  /* ---------------------------------------------------------------- FI
     ⚠⚠ THE FINNISH WORD THE BRIEF MISSED IS `kerro` — simultaneously the
     imperative of *kertoa* "MULTIPLY" and of *kertoa* "TELL/SAY". "Kerro,
     mitä näet" is one of the commonest sentences in Finnish classroom
     copy and is spelled IDENTICALLY to "Multiply". Every hint that would
     naturally begin *Kerro…* begins *Sanokaa* or *Lukekaa* instead.
     ⚠ AND `osa` IS THE FINNISH FRACTION SUFFIX (*kolmasosa, neljäsosa*),
     which Murtolukukeittiö speaks aloud — calling the pieces *osat*
     would tell a Finnish child this is a fractions tool. Hence **pala**.
     `murtaa` (the obvious "break") is the FRACTION ROOT — *murtoluku* =
     fraction — hence **katkaista**. `jakaa` is division and is owned by
     Maple's Bakery outright.
     ⚠ THE FINNISH `banan` TRAP: *pala* → partitive *palaa*, spelled
     identically to *palaa* = "burns"/"returns" — in a BAKING tool.
     "Työnnä palaa…" reads as "Push burns…". Every piece-noun is kept out
     of the partitive: *pala, palat, kahtena palana, kolmena palana*.
     ⭐ The scene strings mark the RELATIVE PRONOUN, because it agrees
     with the counted head: *1 rivi, JOSSA on 6* / *7 riviä, JOISSA
     KUSSAKIN on 6*. Without it Finnish ships "1 rivi, joissa kussakin on
     6" — the "1 rows" bug reborn from the same mechanism. Consistent
     with the platform's shipped Finnish array reading in array-core.js.
     ⚠ The second slot is the PARTITIVE SINGULAR, not a plural: the real
     plural *rivit* is ungrammatical after a numeral, so anyone
     "correcting" *7 riviä* → *7 rivit* ships the defect. */
  fi: {
    title: 'Pullapelti',
    instruction: 'Katkaise pelti niin, että jokainen pala on sellainen, jonka luokka jo osaa. Katkaistessa ei katoa yhtään pullaa.',
    hintWhole: 'Mistä saumasta voitte katkaista pellin niin, että kumpikin pala on sellainen, jonka jo osaatte?',
    hintCut: 'Samat pullat kuin äsken, nyt kahtena palana. Lukekaa kumpikin pala. Sitten voitte katkaista uudestaan samaan suuntaan tai työntää palat takaisin kiinni ja katkaista toisesta saumasta.',
    hintCut3: 'Samat pullat kuin äsken, nyt kolmena palana. Lukekaa jokainen pala. Enempää ei voi katkaista — työntäkää jokin sauma takaisin kiinni, jos haluatte kokeilla toisin.',
    hintSquare: 'Rivejä on saman verran kuin yhdessä rivissä on pullia. Käännä pelti: saumat ovat samat kuin äsken — vain tällä pellillä käy niin. Sanokaa sitten, mistä saumasta katkaisisitte.',
    sceneWhole: 'Pellillinen pullia: {r} [r|rivi|riviä], [r|jossa|joissa kussakin] on {c}.',
    sceneCut2: 'Pellillinen pullia kahtena palana: {a} [a|rivi|riviä], [a|jossa|joissa kussakin] on {c}, ja {b} [b|rivi|riviä], [b|jossa|joissa kussakin] on {c}.',
    sceneCut3: 'Pellillinen pullia kolmena palana: {a} [a|rivi|riviä], [a|jossa|joissa kussakin] on {c}, {b} [b|rivi|riviä], [b|jossa|joissa kussakin] on {c}, ja {d} [d|rivi|riviä], [d|jossa|joissa kussakin] on {c}.',
    sceneCol2: 'Pellillinen pullia kahtena palana: {r} [r|rivi|riviä], [r|jossa|joissa kussakin] on {a}, ja {r} [r|rivi|riviä], [r|jossa|joissa kussakin] on {b}.',
    sceneCol3: 'Pellillinen pullia kolmena palana: {r} [r|rivi|riviä], [r|jossa|joissa kussakin] on {a}, {r} [r|rivi|riviä], [r|jossa|joissa kussakin] on {b}, ja {r} [r|rivi|riviä], [r|jossa|joissa kussakin] on {d}.',
    turnBtn: 'Käännä pelti',
    turnAria: 'Käännä pelti neljänneskäännös.',
    rowsDown: 'Yksi rivi vähemmän.',
    rowsUp: 'Yksi rivi enemmän.',
    colsDown: 'Yksi pulla vähemmän joka rivissä.',
    colsUp: 'Yksi pulla enemmän joka rivissä.',
    rowCombAria: 'Minkä rivin jälkeen pelti katkaistaan.',
    colCombAria: 'Minkä sarakkeen jälkeen pelti katkaistaan.',
    breakRow: 'Katkaise rivin {k} jälkeen: ylhäällä {a} [a|rivi|riviä], alhaalla {b} [b|rivi|riviä].',
    breakCol: 'Katkaise sarakkeen {k} jälkeen: vasemmalla {a} [a|pulla|pullaa] joka rivissä, oikealla {b} [b|pulla|pullaa] joka rivissä.',
    pushRow: 'Työnnä rivin {k} sauma takaisin kiinni.',
    pushCol: 'Työnnä sarakkeen {k} sauma takaisin kiinni.',
    saidTurned: 'Käännetty. {r} [r|rivi|riviä], [r|jossa|joissa kussakin] on {c}.',
    printBtn: 'Tulosta pelti',
    gateTitle: 'Tulostettavat arkit',
    gateBody: 'Arkit, joilla pelti katkaistaan kynällä: ensin koko pelti, sitten sama pelti erikseen jokaisesta saumasta katkaistuna, ja jokaisen alla viiva, jolle kirjoitetaan.',
    gateCta: 'Katso Opettaja-tilaus',
    setGroove: 'Syvempi ura joka viidennessä saumassa',
    setRange: 'Salli riveiksi ja sarakkeiksi myös 11 ja 12'
  }
};
