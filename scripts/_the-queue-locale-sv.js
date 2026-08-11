/* sv — linguist ruled OUT kö (definite kön = GENDER, and measurement-bench:196
   ships THE COW as sv `kon`), linje/tavla/stopp/parad/figur/bricka (all taken on
   the shelf) and pil (an arrow POINTS, and a facing asserts an end) — and IN
   perrongen, definite `perrongen`, en-word, no homograph, checked against the
   `bana`->`banan` trap; the ends are ALWAYS `änden`/`ändarna`, never `ändan`,
   which is the backside. Teacher ruled `står`, not `väntar` (pair-gate:194 owns
   `{n} väntar fortfarande`), and förskoleklass register throughout: kliv, hamna,
   räkna om. Marketing took Lärarplanen (sv.json planTag), never "Premium".
   REBUILT not translated: `instruction` (the English asserts the landing has
   changed, which isSelfSame:256 proves false at n=3,k=2 — the Swedish asks the
   question instead), `board`/`sayBoarded` (someone leaves the platform, no
   vehicle: Buss and Tåg are both shipped at draw-bag-bags.json:279,330),
   `ariaLandedSame` (andra HÅLLET — a direction cannot be ranked). */
module.exports = {
  title: 'Perrongen',
  instruction: 'Några står på perrongen. Välj en ände och gå ett kliv i taget — se vem ni hamnar på. Välj sedan andra änden och gå lika många kliv. Ingen har flyttat sig — men hamnar ni på samma?',

  /* controls */
  endLeft: 'Börja i den här änden',
  endRight: 'Börja i andra änden',
  step: 'Gå ett kliv',
  board: 'Någon går härifrån',
  again: 'En annan perrong',
  print: 'Skriv ut arbetsbladet',

  /* aria */
  ariaPlatform: 'En perrong där {n} står.',
  ariaNoEnd: 'Ingen ände är vald än, så vandraren är inte uppe på perrongen.',
  ariaWalking: 'Vandraren har gått vidare från den ände ni valde.',
  ariaLandedSame: 'Vandraren har hamnat på samma som från andra hållet.',

  /* said aloud */
  sayPickEnd: 'Välj en ände — innan dess finns det ingen att räkna från.',
  sayStepped: 'Ett kliv till.',
  sayLandedSame: 'Det blev samma, vilket håll ni än räknade från.',
  sayBoarded: 'Någon har gått härifrån. Räkna om från samma ände.',
  sayDealt: 'En annan perrong. Välj en ände innan ni räknar.',
  sayEndOfLine: 'Längre än så går inte perrongen.',

  /* settings */
  sizeLabel: 'Hur många står här',
  sizeThree: 'tre',
  sizeFour: 'fyra',

  /* paid sheet */
  sheetTitle: 'Så såg perrongen ut när klassen slutade, och plats att skriva',
  sheetHint: 'På varje rad: en räkning klassen gjorde, och vem den hamnade på.',
  lockedTitle: 'Arbetsbladet ingår i Lärarplanen',
  lockedBody: 'Hela apparaten är gratis — varje perrong, båda ändarna, vandraren och att låta någon gå härifrån. Lärarplanen lägger till arbetsbladet, som visar den perrong klassen tittade på och linjerade rader att skriva på.',
  gateCta: 'Läs om Lärarplanen'
};
