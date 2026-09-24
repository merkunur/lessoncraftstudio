# nt5-F (b6) reconciliation round 2 — native strings after the landing-audit fixes

You are the native content panel for ONE locale (a linguist + a K-3 teacher of that country, in one head).
Fix round 2 changed the pages in all five families after five landing panels audited the renders.
Your draft `scripts/worksheet-gen/i18n/.draft-b6-<loc>.json` must now follow the fixed pages.

## What to read
1. The "## Fix round 2" section at the end of each of the five files
   `docs/worksheet-gen/b6-designs/_work/{K-379,K-380,G1-398,G1-399,G2-377}-faces.md`.
   Each ends with a list "Locale strings to re-author". **Every item naming your locale, or "all 10",
   is yours.** Read the whole section to see WHY each change was made.
2. `node scripts/worksheet-gen/tools/validate-b6-draft.js <loc>` — it already names 7–11 errors in
   your draft, from the new rules. Some list items have no validator rule (for example, K-381 naming
   the matching mark, G1-402 numbering the sentences, the fence bucket word). Do those by reading.
3. The new EN pages: `node scripts/worksheet-gen/render/one.js <id> null 2 en` renders into
   `scripts/worksheet-gen/out/dev/`. LOOK at every page whose strings you change.

## Rules
- **Re-author natively**: never translate the EN wording word for word. One sentence per instruction.
  Name only apparatus the page draws. Keep the grammar of your language (gender, case, agreement).
- A title may name only what the page shows. It must not name one part of a page that shows several.
  It must not name an experiment where the page runs no test. It must not restate G1-204's
  sink/float question.
- **Lead rulings** (already decided; do not reopen):
  - The beaver stays a pond animal: its lodge stands in the water.
  - es G3-400 keeps "cubos"/"cubitos", because the page draws a cube.
  - es badger: "zorrillo" means SKUNK, not badger. Choose the name a Mexican child would give this
    picture, or the word the curriculum uses. Record why.
  - de G2-377: sign off the VA "Aufstrich-t", or set `exemplarByMode.base` to `de-la`. This is your
    call; record it.
  - fr levels: `cp` forces the 4 mm Seyès ruling (4 items per face); `ce1` fits the design's counts.
    This is your call; record it.
- Items marked "no action" or "note" need nothing from you.

## Steps
1. Edit your draft only. Iterate until `validate-b6-draft.js <loc>` prints `0 error(s)`.
2. Apply it: `node scripts/worksheet-gen/tools/_apply-b6-locked.js <loc>`. This locked wrapper serialises
   applies across panels. **Never call apply-b6-locale.js directly.**
3. Render every id whose strings you changed: `node scripts/worksheet-gen/render/one.js <id> null 2 <loc>`,
   plus K-380, G1-402, G2-382, G1-407 and G2-386 (cursive only where your locale ships it). Then
   READ them at print size. Look for overflow, orphan lines, a word that names the wrong thing, a
   second right answer, or a title the page contradicts. Fix, re-apply and re-render until clean.
4. Run `node scripts/worksheet-gen/i18n/lint-locale.js <loc>`. It must report 0 errors.
5. Do not commit. Do not touch any other locale, any EN source, any generator, or any gate.

Reply with each list item → what you wrote (quote it) and why, the pages you read, and anything you
think is still wrong on a page (id + what the render shows). The last item matters most: you are the
last native eyes before these pages publish.
