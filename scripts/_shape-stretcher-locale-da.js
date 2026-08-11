/* da — linguist rejected `rude`(=diamonds/calendar cell), `mærke`+`hiv`(=HIV) and `gem`(=hide); teacher took `firkant/trekant` over a "Antal sider"(=page count) label; marketer took the measured plan name `Lærerabonnementet`, never "Premium". */
module.exports = {
  /* ⚠ The shell renders `title`; a question-name is house-precedented
     (`Hvad passer ikke ind?`, `Fra lodret til vandret`). It states the
     routine, is true in BOTH the firkant and trekant settings, and
     promises nothing the tool does not show — the tool never names the
     figure's class, so a title asking "does the name still fit?" would
     have sold an absent feature. */
  title: "Stadig den samme figur?",

  /* ⚠ REBUILT, not translated. The English opens "watch the tags" in a
     state that holds a tag ~2% of the time (k=0 is 1 of 165 rungs,
     theta=90 is 1 of 73). Danish therefore starts from the EMPTY state
     and makes reaching a marking the first move: "indtil der kommer en
     markering". `figurens sider`, never bare `siderne` — Danish `siden`
     is also "the page", and this tool has a print control. */
  instruction: "Drej figuren, så meget I vil — drejningen laver ingenting om. Gør så figurens sider lange og korte, eller læn figuren, indtil der kommer en markering. Bliv ved, til den slipper igen. Lad en figur blive stående ved siden af, så I kan se to på én gang.",

  /* the three tracks. ⚠ `Stræk` is `Strækbåndet` (unit-handle) and
     `Længde` is `Længdebænken` (measurement-bench) — both are sibling
     NAMES, so the two obvious Danish words are gone. `Lang og kort`
     names BOTH poles, which is truer than the English "Stretch": the
     rail trades a+k against b−k, so it shortens exactly as much as it
     lengthens. The other two rails have no opposite pole and stay bare
     imperatives. */
  lenLabel: "Lang og kort",
  skewLabel: "Læn",
  turnLabel: "Drej",

  /* controls. ⚠ `Gem` — the obvious Danish "keep" — is `Gemmegardinet`
     (missing-question) and also means HIDE; the kept figure is the one
     thing on the pane that must stay visible. `Behold` instead.
     ⚠ The English `keep` label says "beside IT" in the only state where
     the button is live, i.e. when there is no "it" yet. Danish drops the
     dangling referent and states the STATE instead.
     ⚠⚠ NO FOURTH NOUN. An earlier draft of this file gave the kept
     figure an object-noun of its own across six strings — the recorded
     #41/#44 defect, forbidden in the header by name ("a STATE of THE
     SHAPE, not a fourth noun"). Danish now carries it on `blive
     stående` / `figuren ved siden af`, so the tool still has exactly
     three named parts: FLADEN · FIGUREN · MARKERINGERNE.
     (The banned token is deliberately not written even in a comment: a
     grep-based ban cannot tell prose from shipped copy — the recorded
     "a gate can read prose instead of code" trap.) */
  keep: "Lad denne blive stående",
  drop: "Fjern figuren ved siden af",
  deal: "Begynd med en ny figur",
  quarter: "Kvart omgang",
  print: "Udskriv",

  /* ⚠⚠ POSE IS OMITTED ENTIRELY, and that is the point rather than a
     shortfall. The earlier `{rot}` grad-numeral was struck for breaking
     the refuse-list; the replacement English says "leaning", which is
     FALSE in reachable states — the turn rail's `lo` is 0, so a drag to
     the far left gives rot = 0, and `legalTheta(90)` passes, so the
     un-skewed rectangle is reachable too. At rot = 0 with theta = 90
     nothing leans. Danish therefore names only what `tags(f)` names:
     the figure, and how many sides it has. The accessible description
     omits the pose exactly as the model omits `rot`, so the theorem is
     audible instead of merely asserted. */
  ariaShape3: "En figur med tre sider.",
  ariaShape4: "En figur med fire sider.",

  /* ⚠⚠ ADJECTIVE, NOT A CORNER COUNT — and Danish needs this even more
     than the count-of-corners rule requires it. `anyCornerRight` unions
     over the corners, so `sayTagsRight` is reachable at n=3 with
     EXACTLY ONE right corner (theta=90 at v0) and at n=4 with FOUR
     (theta=90 makes all four at once). Any counted phrasing is wrong at
     one end or the other. An earlier draft used the existential "der er
     et ret hjørne", which is true at both — but Danish `et` is the
     indefinite article AND the numeral ONE, so at n=4 a listener hears
     "there is exactly one", which is the same trap Swedish found in
     `en`. `retvinklet` is indeclinable in this predicative use and
     number-neutral: a retvinklet trekant has one right angle, a
     retvinklet firkant has four, and the sentence is true of both.
     Measured free — `retvinkl` = 0 in da.json and 0 across every file
     in `mini tools/`.
     ⚠ `sayTagsBoth` is reachable ONLY at n=4: it needs equal AND
     right, and for n=3 equal demands k=0 with theta=60 while every
     right-corner case demands theta=90 or k=±40, so the two can never
     hold together on a triangle. It is a square, and Danish still does
     not name it one — the child draws that conclusion, not the label. */
  sayTagsBoth: "Begge markeringer sidder: alle sider er lige lange, og figuren er retvinklet.",
  sayTagsEqual: "Én markering sidder: alle sider er lige lange.",
  sayTagsRight: "Én markering sidder: figuren er retvinklet.",
  sayTagsNone: "Ingen markeringer sidder.",
  ariaKept: "Der står en figur ved siden af, så de to kan sammenlignes.",

  /* ⚠⚠ THE SYMMETRY LAW, MADE TRUE IN THE LANGUAGE. The header binds
     T_POP === T_SEAT and SND_POP === SND_SEAT so a tag is exactly as
     loud coming back as going — and then the English strings break it:
     "A tag let go." (4 words) against "A tag went back on." (5), and
     "back on" PRESUPPOSES it was on before, which is false the first
     time a marking is ever gained from the tag-less opening state.
     Danish is the same shape, the same length, and true always. */
  saidPop: "En markering slap.",
  saidSeat: "En markering kom på.",
  saidTurn: "Drejet. Ingenting slap.",

  /* ⚠ The English "move the other one" points at the kept copy, which
     is frozen and cannot be moved — and the copy is drawn on the LEFT
     while the live figure is on the RIGHT, so a child reads "the other
     one" as the one they must not touch. Danish says which one stands
     still. */
  saidKept: "Den ene figur bliver stående. Bliv ved med at flytte den anden, så I kan se dem ved siden af hinanden.",
  saidNoKeep: "Der står allerede en figur ved siden af.",
  saidDealt: "En ny figur. Prøv at dreje den først.",

  /* ⚠⚠ "Antal sider" is the Danish for A PAGE COUNT, in a tool with a
     print control — so the honest count-label is unusable here. The
     setting is named by the two figures it chooses between, which is
     also the formal Fælles Mål naming register for a classification
     control. Both are exact: n=4 is always a parallelogram, n=3 always
     a triangle. */
  sidesLabel: "Trekant eller firkant",
  sidesFour: "firkant",
  sidesThree: "trekant",

  /* ⚠ The English says "the shapeS ... as the class left them" and
     "on each line, one shape" — but the sheet prints ONE figure
     whenever nothing is kept (the default), and the six lines are
     blank and carry no figure at all. Danish is true with one figure
     or two, and describes what is actually on the lines: nothing yet.
     ⚠ `arket` is `Foldearket` (folding-sheet); the printable is
     `udskriften`. */
  sheetTitle: "Sådan så det ud, da klassen gik — og plads til at skrive",
  sheetHint: "Skriv på linjerne, hvad I kunne sige om det, I ser.",

  /* paywall. Verified against the model before writing a word: the ONLY
     entitlement check is on `_print`/`beforeprint`; setLen, setSkew,
     setRot, keep and drop have none. The claim below is therefore true.
     ⚠ No fourth named part — the tool has THE PANE, THE FIGURE and THE
     MARKINGS, so the rails are "alt hvad I kan gøre ved dem" rather
     than a coined noun (skydere/spor/baner would each be a fourth), and
     the kept figure is "figuren, der bliver stående ved siden af"
     rather than an object with a name of its own. */
  lockedTitle: "Udskriften er en del af Lærerabonnementet",
  lockedBody: "Hele apparatet er gratis — alle figurer, alt hvad I kan gøre ved dem, markeringerne og figuren, der bliver stående ved siden af. Lærerabonnementet giver desuden udskriften, som viser fladen, sådan som klassen forlod den, med linjer til at skrive på.",
  /* ⚠ FOLD: `gateClose` — authored as briefed and correctly flagged DEAD
     ON ARRIVAL by this panel, which read `_gate()` and found no close
     control. The tool no longer declares the key, so it is deleted rather
     than folded. The panel's diagnosis is what settled it for all ten. */
  gateCta: "Se Lærerabonnementet"
};
