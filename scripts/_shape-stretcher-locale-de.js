/* de — Linguist named the parts (Platte/Form/Etiketten, all measured free); Grundschul-Lehrkraft
   ruled the register off sort-bins-core's shipped German ("Eine Form bleibt dieselbe Form ...
   auch wenn sie gedreht ist") and kept "rechtwinklig"; marketing took "Lehrkraft-Abo" as the
   current in-tool plan name (#46-#51 all use it) and never "Premium". Three strings were
   REBUILT, not translated, because the English is false in states the model actually reaches:
   instruction (no tags at open), saidTurn (same), saidDealt (it arrives already turned).
   Round 2: {rot} dropped per the shared ruling; ariaShape3/4 now name the figure and describe
   no pose at all (EN "leaning" is false at theta=90 — see report). rechtwinklig kept: German
   "ein" doubles as the numeral exactly as Swedish "en" does, which is why the property is
   predicated of the figure instead of an existential "hat einen rechten Winkel". */
module.exports = {
  title: 'Der Formenzieher',
  instruction: 'Dreht die Form, so weit ihr wollt, und schaut dabei genau hin. Zieht sie dann in die Länge oder neigt sie: Jetzt kann ein Etikett abfallen — oder wieder halten. Lasst eine Form daneben stehen, dann habt ihr beide zugleich vor Augen.',

  lenLabel: 'Ziehen',
  skewLabel: 'Neigen',
  turnLabel: 'Drehen',

  keep: 'Diese Form daneben stehen lassen',
  drop: 'Die Form daneben wegnehmen',
  deal: 'Mit einer anderen Form anfangen',
  quarter: 'Vierteldrehung',
  print: 'Das Blatt drucken',

  ariaShape3: 'Ein Dreieck auf der Platte.',
  ariaShape4: 'Ein Viereck auf der Platte.',
  sayTagsBoth: 'Beide Etiketten halten: alle Seiten sind gleich lang, und die Form ist rechtwinklig.',
  sayTagsEqual: 'Ein Etikett hält: alle Seiten sind gleich lang.',
  sayTagsRight: 'Ein Etikett hält: die Form ist rechtwinklig.',
  sayTagsNone: 'Kein Etikett hält.',
  ariaKept: 'Eine zweite Form steht zum Vergleich daneben.',

  saidPop: 'Ein Etikett hält nicht mehr.',
  saidSeat: 'Ein Etikett hält wieder.',
  saidTurn: 'Gedreht. Daran ändert sich nichts.',
  saidKept: 'Sie steht jetzt daneben. Bewegt nun die andere — dann seht ihr beide nebeneinander.',
  saidNoKeep: 'Es steht schon eine zweite Form daneben.',
  saidDealt: 'Eine andere Form. Sie steht schon gedreht auf der Platte.',

  sidesLabel: 'Wie viele Seiten',
  sidesFour: 'vier Seiten',
  sidesThree: 'drei Seiten',

  sheetTitle: 'Was die Klasse auf der Platte stehen ließ — und Platz zum Schreiben.',
  /* ⚠ FOLD REPAIR (not the panel's wording): the authored line promised
     "in jede Zeile eine Form" — one shape per line. The sheet draws NO
     shape on the lines; the six ruled lines are blank and the pane above
     carries one shape or two. The false NP is excised and the panel's own
     remaining clause kept, its dangling "sie" resolved to the panel's own
     noun "die Form". NEEDS NATIVE SIGN-OFF; the invariance half of the new
     English ("and what stayed true when they turned it") is NOT added here
     — that would be translation. */
  sheetHint: 'In jede Zeile: was sich über die Form sagen lässt.',
  lockedTitle: 'Das Blatt gehört zum Lehrkraft-Abo',
  lockedBody: 'Der ganze Formenzieher ist kostenlos — jede Form, das Ziehen, das Neigen und das Drehen, die Etiketten und die zweite Form daneben. Mit dem Lehrkraft-Abo kommt das Blatt zum Ausdrucken dazu: Darauf steht, was die Klasse auf der Platte stehen ließ, dazu Linien zum Schreiben.',
  /* ⚠ FOLD: `gateClose` was authored here (and in all nine sibling panels)
     against a briefing that still listed it. The tool does not declare it —
     `_gate()` builds a heading, a body and a link, and there is no overlay
     to dismiss — so the key is deleted rather than folded. */
  gateCta: 'Das Lehrkraft-Abo ansehen'
};
