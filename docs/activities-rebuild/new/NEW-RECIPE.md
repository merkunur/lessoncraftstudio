# Building a NEW activity — the recipe (one per session)

The 204 rebuild rows (`../ORDER.md`) come first. When they are done, **"build the next activity" = the first row of `NEW-ORDER.md` not marked LIVE.** Every new activity is held to the same bar as the rebuild and the premium tools: `../LAW.md` (the four questions, the ten rules). The design for each row is already written in `<num>-<key>.md` (generated from `backlog.json`); read it, then improve on it — the design sheet is the starting point, not a ceiling. If the build shows the design is wrong, fix the design sheet in the same commit.

## 0. Start
```
node scripts/new-activity.js --list            # the backlog and what is scaffolded
node scripts/new-activity.js --num=<N>         # creates the running skeleton + registers the manifest
```
The scaffold creates `mini tools/<key>-core.js`, `<key>-activity.js`, `<key>-activity.html`, `<key>-activities.json` (EN slug/title/intro from the backlog), `scripts/verify-<key>-core.js`, `mutate-<key>.js`, `local-test-<key>.js`, `live-verify-<key>.js`, and adds the manifest to `frontend/lib/activities.ts` `MANIFEST_FILES`. The skeleton is a plain three-card round so every gate runs on day one; its `verify` fails ONLY on unauthored strings (TODO) and missing prose — on purpose.

## 1. Design check (before code)
- Open the contact sheet for every picture theme the design names: `node scripts/worksheet-gen/tools/contact-sheet.js <out.png> --theme="<theme>"` — a word review cannot see a picture; drop near-doubles, B&W themes, odd ones.
- Answer the LAW's four questions in the design sheet. Name the invention in one sentence. List the misconception the apparatus makes visible.
- Check the round data for: one right answer; never 0 in counting; the answer position (left/right/place in a row) balanced; neighbours/hard cases present; no duplicate of a sibling activity's rounds.

## 2. Build (activity layer only)
- Replace the skeleton in `<key>-core.js` (pure model: rounds · newState · moves · check · helpLevel · hintKey · layout) and `<key>-activity.js` (render · paint · the hand · CSS). Keep the scaffold's `nextTask` reshuffle, the test seams (`.st`, `._order`, `._pool`), `apparatusClasses`, `answerType:'state'`.
- **0 lines** to `lcs-shell.*` or any shared core. Pictures only via `mini tools/lcs-pictures.js` (add its `<script>` to the html).
- Strings: EN first, then de fr es pt it nl sv da no fi by hand. The shell's `t()` does not fill `{placeholders}` — `_t()` does. fr: a real U+202F before `? : ! ;` and inside « ».
- Manifest: slug / page_title / page_intro for all 11 locales (native slugs, no CCSS code in the slug, no "free"). Grade: add a `GRADE_OVERRIDE` row in `frontend/app/[locale]/activities/[slug]/page.tsx` where a locale's school year differs (K-cluster rule: sv/da/no/fi → '1' for K content; follow the sibling rows of the same code). Strand: `STRAND_OVERRIDE` only when the auto-map is wrong for a locale.
- **Non-Common-Core rows** (science, health, social studies, SEL): set `alignment.framework` to `NGSS` / `HEALTH` / `SS` / `SEL` (`frontend/lib/frameworks.ts`) and a code from that framework. They get no `/standards/` hub and the right framework name in JSON-LD automatically. Their strand needs a `STRAND_NAMES` row ×11 in `frontend/lib/seo/strand-names.ts` the first time a new strand appears (native-checked).
- Page prose ×11: write one JSON `{en:{about,practices,howToPlay,learningGoals}, de:…}` and run `node scripts/apply-activity-prose.js <id> <file>` (refuses a missing locale, a TODO, a price claim, a plain space before French punctuation).

## 3. Gates (in this order; none skippable; never move a threshold to pass)
1. `node scripts/verify-<key>-core.js` — rewrite [A]–[C] against the invention's own truth; keep [D] strings and [E] "the prose cites only rounds the activity shows".
2. `node scripts/mutate-<key>.js` — one single-line mutation per rule the design states; every mutation killed; no gate loop may depend on the tool terminating.
3. `node scripts/local-test-<key>.js --locales=all` — real pointer, every round, widths 320·360·412·704·768·1024·1366, Check above the fold, taps ≥ 44, nothing outside the card. Run it with the strings final (a test running while strings change reports phantom failures).
4. `node scripts/visual-qa-activity.js --activity=<id>` · `node scripts/audit-activity-hierarchy.js --activity=<id>` · `node scripts/audit-settings-efficacy.js --tool=<key>-activity` · `node scripts/preflight-activity-routes.js`.
5. `node scripts/verify-activity-content-<loc>.js` ×11 · `verify-activity-prose-claims.js` · `verify-activity-serp-copy.js` · `audit-activity-content-tells.js`.
6. `node scripts/audit-activity-coverage.js` — the row's teaching point moves from "planned" to "covered".

## 4. Review, ship, record
- ONE reviewer agent (native ×11 + pedagogy) over a compact dump: the apparatus description, the round data, the strings ×11, the prose ×11, any new metadata. Reproduce every finding before fixing; fix at the source; re-run the gates.
- Read the 360 / 704 / 1024 renders yourself. Preview: add a seed in `scripts/generate-activity-previews.js` that shows the invention mid-use, `--only=<id>`.
- Bump `ACTIVITY_WRAPPER_VERSION` and the html `?v`. Commit (explicit paths, `-F` message file). Deploy: scp the preview to `/var/www/lcs-media/mini-tools/previews/`, then `git pull && cp "mini tools/<key>-*" /var/www/lcs-media/mini-tools/ && chown lcs-media:lcs-media … && bash deploy.sh`. `node scripts/live-verify-<key>.js` (rewrite its round walk) and read one live page.
- Mark the row `LIVE <date>` in `NEW-ORDER.md`; the memory entry in `project_activities_tool_bar_rebuild.md`.
