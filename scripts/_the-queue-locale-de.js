/* de — Linguist named the parts: der BAHNSTEIG (0 hits in `mini tools/` and 0 in
   tool-content/de.json; `Haltestelle` is TAKEN by wodb-grids.json:1670 and its clue is the
   bus, and `Gleis` carries a number) and die ZÄHLMARKE (0/0; `Läufer` was rejected because
   juniper-story-lantern-activities.json:90 ships "Der schnellste Läufer gewinnt immer" — a
   race has a winner, which is the very order this tool refuses; `Zeiger` 32×, `Zähler` is the
   numerator). Grundschul-Lehrkraft kept the ihr-Anrede and the personified "einer/derselbe";
   marketing took "Lehrkraft-Abo" per de.json:4289, never "Premium". THREE strings are REBUILT
   rather than translated because the English is false in states the model reaches: instruction
   (EN claims the landing HAS changed — false at n=3,k=2, the tool's own best moment),
   ariaLandedSame (EN asserts a past count the model never records — isSelfSame is a pure
   function of n and k), sheetHint (EN records who but not from WHICH end, which makes the
   written line unreadable). See report. */
module.exports = {
  title: 'Der Bahnsteig',
  instruction: 'Auf dem Bahnsteig warten ein paar. Wählt ein Ende, geht dann Schritt für Schritt weiter und schaut, bei wem ihr ankommt. Nehmt danach das andere Ende und geht genauso oft — niemand hat sich bewegt, und trotzdem kommt ihr meist bei jemand anderem an.',

  endLeft: 'An diesem Ende anfangen',
  endRight: 'Am anderen Ende anfangen',
  step: 'Weitergehen',
  board: 'Einer geht weg',
  again: 'Ein anderer Bahnsteig',
  print: 'Das Blatt drucken',

  ariaPlatform: 'Ein Bahnsteig mit {n} Wartenden.',
  ariaNoEnd: 'Es ist noch kein Ende gewählt, darum steht die Zählmarke noch nicht auf dem Bahnsteig.',
  ariaWalking: 'Die Zählmarke ist vom gewählten Ende aus weitergerückt.',
  ariaLandedSame: 'Die Zählmarke steht bei demselben, bei dem sie auch vom anderen Ende aus stehen würde.',

  sayPickEnd: 'Wählt ein Ende — vorher gibt es niemanden, von dem aus ihr zählen könnt.',
  sayStepped: 'Ein Schritt weiter.',
  sayLandedSame: 'Derselbe — egal, von welchem Ende ihr zählt.',
  sayBoarded: 'Einer ist weg. Zählt noch einmal von demselben Ende.',
  sayDealt: 'Ein anderer Bahnsteig. Wählt ein Ende, bevor ihr zählt.',
  sayEndOfLine: 'Weiter geht der Bahnsteig nicht.',

  sizeLabel: 'Wie viele warten',
  sizeThree: 'drei',
  sizeFour: 'vier',

  sheetTitle: 'Der Bahnsteig, wie die Klasse ihn stehen ließ — und Platz zum Schreiben',
  sheetHint: 'In jede Zeile kommt eine Zählung der Klasse: von welchem Ende — und bei wem sie angekommen ist.',
  lockedTitle: 'Das Blatt gehört zum Lehrkraft-Abo',
  lockedBody: 'Der ganze Bahnsteig ist kostenlos — jede Aufstellung, beide Enden, die Zählmarke und das Weggehen. Mit dem Lehrkraft-Abo kommt das Blatt zum Ausdrucken dazu: Darauf steht der Bahnsteig, den die Klasse gerade vor Augen hatte, dazu Linien zum Schreiben.',
  gateCta: 'Das Lehrkraft-Abo ansehen'
};
