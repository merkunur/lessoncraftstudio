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
  }
};
