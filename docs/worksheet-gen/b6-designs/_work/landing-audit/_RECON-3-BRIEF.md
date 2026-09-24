# nt5-F (b6) reconciliation round 3 — native strings after the fix-round-3 EN source changes

You are the native content panel for ONE locale (a linguist + a K-3 teacher of that country, in one head).
Fix round 3 (commits `db3180f3`, `e15af333`) changed the EN source after the six pass-1 landing panels
(pt it sv da no fi) audited the renders. Your draft `scripts/worksheet-gen/i18n/.draft-b6-<loc>.json` must follow.
Background: `docs/worksheet-gen/b6-designs/_work/landing-audit/_FIX-ROUND-3-LIST.md`, and your locale's own
landing file `scripts/worksheet-gen/i18n/.landing-b6-<loc>.json` → `findings` (if it exists).

## Items for EVERY locale (de es fr pt it nl sv da no fi)
1. **`banks.healthy-habits.reasons.wash-hands`** — the old sentence was FALSE in every language (it said washing
   removes germs "from everything we touched"; washing cleans the HANDS). EN now: "It gets rid of the germs we
   picked up when we touched things." Rule: a reason may not name its own habit's body part or tool (no hand /
   soap / wash word of your `labelStems['wash-hands']`), and it must fit NO other habit. Re-read it against
   brush-teeth, sleep, move-body, sun-protect, drink-water, blow-nose.
2. **`banks.story-sequencing.stories.<id>.sentences` (every story that has sentences)** — G1-402: NO sentence may
   open with an order word. The validator (rule 10) now rejects any sentence starting with one of your
   `openers4`, `starters4` or `words3` literals. Re-author each sentence so it still (a) contains its `stateWords[k]`
   verbatim, (b) contains no other sentence's stateWord, (c) lets a child put the four in order FROM CONTENT
   (card story: the writing sentence says it goes beside the drawing, EN "Three lines of writing are added beside
   the drawing."). Do not start with another temporal word either (then / after / now / at the end …): the
   validator only knows your literals, you know the language. Keep `openers4` / `starters4` themselves unchanged
   (K-381 and G2-378 use them).
3. **`types.G1-408.title`** (+ the same text in `banks.sink-or-float.strings`) — the page runs NO test (the scales
   are drawn already tipped). The title may carry none of your `experimentWords` (rule 7b now covers G1-408).
   EN: "Heavy or Light? Sink or Float on a Balance Scale".
4. **`types.G2-383.title`** — the page gives no reasons, so the title may not ask WHY (Warum / Por qué / Pourquoi /
   Por que / Perché / Waarom / Varför / Hvorfor / Miksi …) and still carries no experiment word. EN "Floating Facts:
   Sink or Float True or False".
5. **`types.G1-407.title`** — the page draws ONLY food and a home: the title names those two, never "what animals
   need to live". EN "What Animals Need: Food and a Home".
6. **`types.G3-400.title`** — part 1 offers TWO questions (the orange, and the clay boat's cargo); a title naming
   only the orange mislabels the page for a child who picks the boat. Title the report, not one question.

## Locale-specific items (from your landing panel's findings)
- **sv · pt · no — `types.G1-404.title`**: names only the elbow cough; the page has four rows (elbow, soap vs germy
  hands, own cup vs shared cup, tissue in the bin). Title the whole page (fi did: "Pysäytä pöpöt: mikä estää niitä
  leviämästä?").
- **pt — `types.G2-379.title`** "Hábitos de higiene": only 2 of 5 habits are hygiene; use a head covering all five.
- **da — G1-406 elk**: elk is not a wild Danish forest animal. Keep it off da pages (use the bank's `refuse` /
  exclusion mechanism if one exists; else report it and leave it).
- **no — `banks.sink-or-float.labels.pliers`**: "tang" also means seaweed (which floats) → "nebbtang".
- **no — `types.G1-405.title`**: "Ukeplan" is the school homework plan → e.g. "Vaneskjema for uka".
- **no — `types.G2-377.instruction`**: the render has TWO empty lines under each trace line → "på de tomme linjene under".
- **fi — `banks.habitats` names**: rabbit → "kani" (jänis / pupu do not burrow); crab → lead with "taskurapu"
  (rapu = crayfish, a lake animal). Adaptation sentence for the penguin: "Sen siivet toimivat vedessä kuin evät…"
  (the wings are not fins). `types.G2-381.title` → "Elinympäristön tutkimus: tutki ja piirrä".

## Steps
1. Edit your draft only. Iterate until `node scripts/worksheet-gen/tools/validate-b6-draft.js <loc>` prints
   `0 error(s)`. Every string you change must be changed in BOTH places it lives in the draft (the `types.<ID>`
   entry and the matching `banks.<family>.strings.<mode>` / `.<ID>` entry) — the parity gate compares them.
2. Apply: `node scripts/worksheet-gen/tools/_apply-b6-locked.js <loc>` (never apply-b6-locale.js directly).
3. Render and READ at print size every id whose strings you changed, plus G1-402, G2-379, G2-383:
   `node scripts/worksheet-gen/render/one.js <id> null 2 <loc>` → `scripts/worksheet-gen/out/dev/<id>-null-d2-<loc>.png`.
4. `node scripts/worksheet-gen/i18n/lint-locale.js <loc>` → 0 errors.
5. Do not commit. Do not touch any other locale, any EN source, any generator or any gate.

Reply with each item → what you wrote (quote it) and why, the pages you read, and anything still wrong on a page.
