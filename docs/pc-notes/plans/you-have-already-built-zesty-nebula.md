# Dutch (nl) Second-Batch Fan-Out — Activity #6: place-value-regroup 3 siblings (2.NBT.B.7)

## Context

Dutch fan-out, one plan-mode session per step, rebuilt (not translated). Done + pushed: nl #1 `8cb89b72` · #2 `bf0a7eb4` · #3 `723363d0` · #4 `3703e68b` · #5 `f40f4f7c`. Undeployed (batched). This session = **nl #6**.

**nl #6** mirrors **German #6 (`bd3b49d3`)**: it builds the **three remaining `place-value-regroup` siblings** in one commit — the shared engine is ALREADY fully nl-localized (authored at nl #5), so this touches **manifest + prose + page.tsx grade only, 0 engine lines, 0 html change**. Character = **Tuck de hamster**; base-ten regrouping within 1000 with MAB-blokken:
- **#A subtract-decompose** (2.NBT.B.7) — 3-digit − 1-digit with a borrow (342−5): "Splits een tiental".
- **#B add-compose-hundred** (2.NBT.B.7) — add tens past ten tens (160+50): "Maak een honderdtal".
- **#C subtract-decompose-hundred** (2.NBT.B.7) — borrow across a zero (302−5): "Splits een honderdtal" then "Splits een tiental".

## Native ensemble rulings (locked)

- **Pedagoog → all three = Groep 4?** No — **all three = Groep 5** (`GRADE_OVERRIDE nl:'3'` ×3, incl. the borrow-across-zero one): once the range is **tot 1000 met inwisselen over meerdere posities**, it's the Groep 5 leerlijn (nl #5 compose-ten stayed Groep 4 because it's within 100). Matches de/es/fr/pt/it grade_3. **Strand kept "Getallen en het tientallig stelsel"** (no override). Didactiek: **inwisselen / splitsen / maken** (NOT "lenen" as the working verb; "lenen" only as an informal gloss), **over de nul heen** for the zero case; don't over-claim "cijferend rekenen" (frame as its concrete foundation). Pieces: **blokje** (eenheid) / **staafje** (tiental) / **plaat** (honderdtal) — ⚠ never "plaatje" (= picture, false friend).
- **Content creator + linguist (converged):** the 3 SEO titles/slugs/intros + 3 prose blocks below.

## Files to modify (3 — no engine, no html)

### 1. `mini tools/place-value-regroup-activities.json`
Add `nl` slug / page_title / page_intro to the **3 sibling activities** (rows 2–4; row 1 compose-ten already has nl from #5; round a/b LOCKED — untouched):

- **#A subtract-decompose** (`place-value-regroup.subtract-decompose.2-nbt-b-7`):
  - slug `"aftrekken-met-inwisselen-tot-1000-groep-5"`
  - page_title `"Aftrekken met inwisselen tot 1000 — Tuck splitst een tiental (Groep 5)"`
  - page_intro `"Oefen aftrekken tot 1000 met inwisselen in een gratis, interactieve activiteit — zonder download en zonder account. Je kind helpt Tuck de hamster een tiental te splitsen in tien blokjes en ontdekt zo hoe je aftrekt als er te weinig eenheden zijn. Rustig en speels rekenen met MAB-blokken, helemaal in het Nederlands."`
- **#B add-compose-hundred** (`place-value-regroup.add-compose-hundred.2-nbt-b-7`):
  - slug `"optellen-honderdtal-maken-tot-1000-groep-5"`
  - page_title `"Optellen tot 1000: een honderdtal maken — Tuck maakt een honderdtal (Groep 5)"`
  - page_intro `"Oefen optellen tot 1000 met honderdtaloverschrijding in een gratis, interactieve activiteit — zonder download en zonder account. Je kind bundelt samen met Tuck de hamster tien staafjes tot één plaat en ziet zo hoe tientallen doorschuiven naar de honderdtallen. Rustig en speels rekenen met MAB-blokken, helemaal in het Nederlands."`
- **#C subtract-decompose-hundred** (`place-value-regroup.subtract-decompose-hundred.2-nbt-b-7`):
  - slug `"aftrekken-met-inwisselen-over-de-nul-groep-5"`
  - page_title `"Aftrekken over de nul heen tot 1000 — Tuck splitst een honderdtal (Groep 5)"`
  - page_intro `"Oefen aftrekken tot 1000 met inwisselen over de nul heen in een gratis, interactieve activiteit — zonder download en zonder account. Je kind splitst samen met Tuck de hamster eerst een plaat en daarna een staafje, in twee stappen. Rustig en speels rekenen met MAB-blokken, helemaal in het Nederlands."`

### 2. `frontend/messages/activity-content/nl.json`
Add 3 Tier-1 prose overrides (keys = the 3 ids above), the content creator's Dutch verbatim, with **one fix in #A practices[1]**: "welk blokje, staafje of **plaatje** …" → rewrite to "**Plaatswaarde herkennen: blokjes horen bij de eenheden, staafjes bij de tientallen en platen bij de honderdtallen.**" (plaatje = picture, false friend; use platen/plaat). Each block: about ×3 / practices ×4 / howToPlay ×3 / learningGoals ×3; cites SLO-kerndoelen + domein Getallen en het tientallig stelsel + Groep 5; no CC/code; inwisselen/splitsen/maken (never "gouden materiaal").

### 3. `frontend/app/[locale]/activities/[slug]/page.tsx`
- Add `nl: '3'` (→ Groep 5) to the 3 GRADE_OVERRIDE lines (~76/77/78): `subtract-decompose`, `add-compose-hundred`, `subtract-decompose-hundred` (each currently `{ de:'3', fr:'3', es:'3', pt:'3', it:'3' }`), with a short nl comment (tot 1000 met inwisselen = Groep 5).
- **STRAND: no override** (auto "Getallen en het tientallig stelsel").
- **ACTIVITY_WRAPPER_VERSION**: `'9.568'` → `'9.569'`.

## Verification — LOCAL definition-of-done (§A.13.62, §20.4)

1. `node --check` (n/a — no JS change) + JSON.parse manifest + nl.json.
2. Parity: git diff = only the 3 files; manifest adds only nl slug/title/intro on the 3 sibling rows (a/b round data byte-identical); **0 engine/core/shell/html lines**.
3. `node scripts/verify-place-value-regroup-core.js` (locale-neutral, stays green).
4. `node scripts/verify-activity-content-nl.js` (3 new full-override prose; 0 placeholders/dup/CC/code/Flemish; no "plaatje").
5. `node scripts/preflight-activity-routes.js` (3 new nl slugs resolve, url-safe, unique).
6. `npx tsc --noEmit` — 0 errors in the activities route.
7. `node scripts/visual-qa-activity.js --activity=<id> --locale=nl` for EACH of the 3 sibling ids → full sweep 320·360·412·768·1024·1366 × all rounds GREEN; then `--locale=en` regression per id. (These reuse the shared engine already verified at #5; the sweep confirms the 3-column mat + break buttons render at nl.) Screenshots to `docs/audit-results/place-value-regroup-activity/qa/`.
8. Personal Read of nl renders for each sibling (a subtract-decompose round, the make-hundred round, the borrow-across-zero round) at 360/768/1024; visual-critic agent on the 3 nl sweeps.
9. EN/Common-Core leak grep on the nl additions.
10. `git diff --name-only` = only the 3 files.

## Execution

Build the 3 edits → run the DoD gates (visual-qa ×3 sibling ids) → **commit + push automatically, NO deploy** (per operator standing order). Update the nl fan-out memory record (the place-value-regroup engine block is now fully done: compose-ten shipped #5, the 3 siblings shipped #6). Next session = nl #7 (child of German #6 `bd3b49d3`).
