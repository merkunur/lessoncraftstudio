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
  }
};
