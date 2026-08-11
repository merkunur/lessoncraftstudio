/* da — linguist vetoed `kø` (measurement-bench.js:196 ships the cow as da `koen`,
   one diacritic from `køen`), `række` (baking-tray.js:459-469 ships `række/rækken`
   as the array-row, a load-bearing maths noun on the same shelf), `vandrer` (the
   stem is `vandret` = HORIZONTAL, and cold-line.js:165 is NAMED `Fra lodret til
   vandret` — on a horizontal bar), `forfra` (= from the FRONT, a position) and
   `siden` (= the page, in a tool with a print control) — so `ende`, not `side`.
   Teacher took `Begynd i denne ende` / `Begynd i den anden ende` as a PAIR: once
   `denne` is its partner, `anden` cannot be read as the ordinal. Marketer took
   the measured plan name `Lærerabonnementet`, never "Premium". */
module.exports = {
  /* ⚠ Question-and-routine names are the house shape (`Hvad passer ikke ind?`,
     `Fra lodret til vandret`, `Stadig den samme figur?`). This one states the
     gesture a Danish teacher actually says out loud. `begge` quantifies the two
     ends — it is not a rank and not a count of members — and naming BOTH ends
     in the product name is the thesis: neither of them is home. */
  title: "Tæl fra begge ender",

  /* ⚠ REBUILT. The English opens on a bare fact ("Some are standing") and then
     narrates the reversal as a result. Danish makes the question the first
     thing said, because the question is the whole instrument. ⚠ It closes on
     `en anden` — the indefinite article forces the *different one* reading, so
     the sentence cannot be heard as "you land on number two". */
  instruction: "Der står nogle på ventepladsen. Vælg en ende, og flyt så pegepinden ét skridt ad gangen — hvem lander I på? Vælg nu den anden ende, og flyt lige så mange skridt: ingen har rørt sig, men nu lander I på en anden.",

  /* ⚠⚠ THE TWO END BUTTONS ARE A PAIR AND MUST BE READ AS ONE. Danish `anden`
     is the ordinal SECOND and the adjective OTHER in one form, and this tool's
     central control is the one that says *other*. The ambiguity is killed
     structurally rather than lexically: `denne` is the partner of `den anden`,
     and `denne` is not `den første` — so a child reading the two labels side by
     side has no first end to hang an ordinal on. ⚠ `ende`, never `side`:
     `siden` is also THE PAGE and this tool prints. (`ende` is also the
     colloquial backside, but `i den anden ende` of a row is fixed and idiomatic
     — Danish uses it for ropes, tables and rooms without a flicker.) */
  endLeft: "Begynd i denne ende",
  endRight: "Begynd i den anden ende",

  /* ⚠ `ét` and `Én` carry the acute: they are TRUE COUNTS of steps and of
     people, not cardinals doing an ordinal's work — the same licence the
     English takes in "One step along" and "One leaves". ⚠ NO VEHICLE: the
     English has already amputated the bus, so somebody simply walks away.
     `Én går sin vej` is what a Danish child says about leaving a game. */
  step: "Flyt ét skridt",
  board: "Én går sin vej",
  again: "En anden venteplads",
  print: "Udskriv",

  /* aria. ⚠ `pegepinden` is the walker: measured 0 in `mini tools/` and in
     `frontend/messages/`, and it is the one candidate that is neither a shape
     name (a `kile` or a `trekant` would collide with the four silhouettes the
     tool draws) nor a sibling's part (`markøren` is open-number-line:62,
     `viseren` is the clock, `tælleren` is the fraction numerator, `prikken` is
     letter-studio:97, `brikken` is counting-cups). It is also the actual
     classroom object for this exact gesture. */
  ariaPlatform: "En venteplads, hvor der står {n} og venter.",
  ariaNoEnd: "Der er ikke valgt nogen ende endnu, så pegepinden er sat til side og peger ikke på nogen.",
  ariaWalking: "Pegepinden er flyttet videre fra den ende, I valgte.",
  /* ⚠⚠ PRESENT TENSE, DELIBERATELY. The English says the walker "landed on
     the same one it LANDED ON from the other end" — a past event that has not
     necessarily happened: `isSelfSame` fires on k alone, so this is announced
     the very first time a child counts, from one end, having never used the
     other. That is the recorded #41 "back on PRESUPPOSES it was on before"
     defect verbatim. Danish states the standing truth instead. */
  ariaLandedSame: "Pegepinden er landet på den samme, som den lander på fra den anden ende.",

  /* said aloud — no position ever. ⚠ `Tæl forfra` was struck: `forfra` is
     literally FROM THE FRONT, and a front is an end declared home. */
  sayPickEnd: "Vælg en ende — indtil I gør det, er der ingen at tælle fra.",
  sayStepped: "Ét skridt videre.",
  sayLandedSame: "Den samme — uanset hvilken ende I tæller fra.",
  sayBoarded: "Én er gået. Tæl igen fra den samme ende.",
  /* ⚠ HONEST, WHERE THE ENGLISH IS NOT. `newState` shuffles the same four
     forms, so "A different platform" is a claim the model cannot keep — one
     deal in twenty-four repeats. Danish says it has been set up afresh, which
     is true every time. (The button may still ask for `en anden`: a request is
     not an assertion.) */
  sayDealt: "Ventepladsen er stillet op på ny. Vælg en ende, før I tæller.",
  sayEndOfLine: "Ventepladsen slutter her.",

  /* ⚠ A GENUINE COUNT, so the numerals are required rather than permitted —
     these say how many are waiting, never which one anybody is. */
  sizeLabel: "Hvor mange der venter",
  sizeThree: "tre",
  sizeFour: "fire",

  /* ⚠ `arket` is `Foldearket` (folding-sheet), so the printable is
     `udskriften`. ⚠ The title claims only the ARRANGEMENT survives the print,
     and that is all that does: `_buildSheet` redraws the members through
     `_shape` with no `is-landed` class, so the one thing the class was looking
     at — who they landed on — is exactly what the sheet drops. Danish does not
     promise it back. */
  sheetTitle: "Ventepladsen, sådan som klassen forlod den — med linjer til at skrive på",
  sheetHint: "Skriv på hver linje én optælling, som klassen lavede, og hvem den landede på.",

  /* paywall. Verified against the model before a word was written: the only
     entitlement check in the file is on `_print` and the `beforeprint`
     listener, and `_paint` greys nothing but the print button. `pickEnd`,
     `step`, `board` and `_deal` have none — so the claim below is true.
     ⚠ NO FOURTH NAMED PART: the tool has VENTEPLADSEN and PEGEPINDEN, and the
     ones waiting stay pronouns exactly as they do in the English, which never
     names them either. */
  lockedTitle: "Udskriften er en del af Lærerabonnementet",
  lockedBody: "Hele apparatet er gratis — hver eneste venteplads, begge ender, pegepinden og at lade én gå sin vej. Lærerabonnementet giver desuden udskriften, som viser ventepladsen, sådan som klassen så den, med linjer til at skrive på.",
  gateCta: "Se Lærerabonnementet"
};
