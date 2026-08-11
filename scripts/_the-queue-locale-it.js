/* it — linguist named ONE noun, "la pedana" (0 hits in `mini tools/` and in every
   tool-content locale), and refused a second: "la pedina" is shipped Italian for a
   counter (number-bond-core:51 "aggiungere le pedine") AND is one letter from
   "pedana", so the walker is carried verbally as "chi cammina" against the waiters'
   "chi aspetta" — the contrast Italian gives for free, and no fourth named part.
   "la fila" is dead (our-day:602 ships it byte-identical to the Spanish), "il
   binario" belongs to arrow-strip, "sfilata/arcata" to pair-gate, "il banco" to the
   two bench tools; "banchina" was refused for sitting one letter from "panchina"
   beside two shipped "Il banco ..." titles, "marciapiede" for its adult sense.
   Teacher barred the word "prima" from every string — it is the feminine of "primo",
   and this is the one tool whose law is that no string names a rank; "altrettante"
   carries "the same number of times" with no numeral. Marketing verified against
   `_print`/`_buildSheet` that only the sheet is gated before writing "gratuito tutto
   intero", and named the shipped plan, "Piano Insegnante".
   REBUILT, not translated: `instruction` and `ariaLandedSame` (both state as fact
   something the model makes false — see the report), `sheetHint` (records the END,
   which is the only thing worth writing down), `sayPickEnd`, `sayDealt`. */
module.exports = {

  /* THE TOOL. House shape (definite noun phrase, cf. "Il binario dello scarabeo"),
     and it says the routine rather than the apparatus alone. ⚠ "La pedana da due
     parti" was REFUSED: "parte" is also the addend noun on this shelf, so the short
     form reads as "the platform in two pieces". "tutte e due le parti" cannot. */
  title: "La pedana da tutte e due le parti",

  /* ⚠⚠ REBUILT. The English closes "the one you land on has changed" — flatly false
     at three waiting with two steps, the state `isSelfSame` exists to name and
     `sayLandedSame` exists to announce. The tool would contradict its own opening
     line. Italian ASKS instead of telling, which is true at three and at four and is
     the better routine. "altrettante volte" = as many times, with no numeral. */
  instruction: "Sulla pedana c'è qualcuno che aspetta. Scegli una parte, cammina e guarda su chi ti fermi. Poi scegli l'altra parte e cammina altrettante volte: non si è spostato nessuno, ma guarda se ti fermi sullo stesso o su un altro.",

  /* controls. Both ends carry the SAME verb — neither is home, which is the thesis.
     "Comincia" is literally what `pickEnd` does (it resets the count to zero), so
     the label does what it says. */
  endLeft: "Comincia da questa parte",
  endRight: "Comincia dall'altra parte",
  /* ⚠ "Avanza" and "avanza di un passo" belong to arrow-strip — the marker-on-a-
     track tool this one descends from, so its step language is the worst possible
     borrowing. "Cammina" is 0 on the whole shelf and is 7 characters at 320px. */
  step: "Cammina",
  /* no vehicle anywhere: somebody simply leaves */
  board: "Uno se ne va",
  again: "Un'altra pedana",
  print: "Stampa la scheda",

  /* aria. Nothing on the platform is a tap target. */
  ariaPlatform: "Una pedana con {n} che aspettano.",
  ariaNoEnd: "Non hai ancora scelto la parte da cui contare, e chi cammina è rimasto giù dalla pedana.",
  ariaWalking: "Chi cammina è andato avanti, partendo dalla parte che hai scelto.",
  /* ⚠⚠ REBUILT. The English says the walker landed "on the same one it landed on
     from the other end" — a history that in this state has usually never happened:
     the child can reach it having used ONE end only. Italian states the PROPERTY in
     the conditional, which is true whether or not the other end was ever used. */
  ariaLandedSame: "Chi cammina si è fermato su quello su cui si fermerebbe anche partendo dall'altra parte.",

  /* said aloud — never a rank, never a cardinal standing for one */
  /* the refusal is exact: `step` and `board` both return null while `end` is null */
  sayPickEnd: "Scegli una parte: senza una parte non si sa da dove contare.",
  sayStepped: "Un passo.",
  sayLandedSame: "Lo stesso, contando da una parte o dall'altra.",
  sayBoarded: "Se n'è andato uno. Riconta dalla stessa parte.",
  /* the English says "Pick an end before you count" — same sequence, no "prima" */
  sayDealt: "Un'altra pedana. Scegli una parte, poi conta.",
  sayEndOfLine: "La pedana finisce qui.",

  /* settings. ⚠ These three are the ONE place a number word is right: they count how
     many are waiting, which is a cardinal and not a position. */
  sizeLabel: "Quanti aspettano",
  sizeThree: "tre",
  sizeFour: "quattro",

  /* paid sheet. `_buildSheet` draws the CURRENT platform and six blank ruled lines,
     so both of these are true of what prints. */
  sheetTitle: "La pedana come l'ha lasciata la classe, e lo spazio per scrivere",
  /* ⚠ REBUILT. The English asks for "one count and who it landed on" and leaves out
     the only thing that makes the record readable a day later — WHICH END. Written
     down without it, two rows that disagree look like a mistake instead of the
     point. */
  sheetHint: "Su ogni riga, da che parte avete contato e su chi vi siete fermati.",

  /* MEASURED before written: `premium` gates `_print` and the `beforeprint` sheet and
     nothing else — every end, every walk, every leaving and every new platform runs
     for a visitor with no account, so "gratuito tutto intero" is true. Names the
     moves, not a fourth part. */
  lockedTitle: "La scheda da stampare fa parte del Piano Insegnante",
  lockedBody: "Lo strumento è gratuito tutto intero: ogni pedana, tutte e due le parti, chi cammina e uno che se ne va. Con il Piano Insegnante c'è anche la scheda da stampare, con la pedana che la classe stava guardando e le righe per scrivere.",
  gateCta: "Scopri il Piano Insegnante"
};
