---
name: feedback-activity-page-copy-and-thumbnails
description: "ANY new thing that gets a CARD needs its generated preview thumbnail — activities AND tools. Missing card thumbnails enrage the operator, twice now"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 69ebeee1-4452-4c2a-809f-05377b5aff6d
  modified: 2026-07-31T19:55:33.090Z
---

> ⚠⚠ **THIS HAPPENED TWICE. Read the scope line before you read anything else.**
> **ANY new thing that renders a CARD needs its generated preview webp — activities AND TOOLS.**
> 2026-06-28: activity cards shipped with no thumbnail. 2026-07-31: **tool #38 `draw-bag`
> shipped with no thumbnail and the operator found it.** I repeated it because I had filed
> this note under "activities" (`generate-activity-previews.js` → `previews/`) and never
> asked whether it generalised to the adjacent, identically-shaped tool path
> (`generate-tool-previews.js` → `tool-previews/`). Same fallback component
> (`ActivityGlyph`), same directory tree, same enraged operator.
> **A rule about "new content that gets a card" is never engine-scoped. Check the sibling path.**
> Now gated: `scripts/preflight-tool-registration.js` in `deploy.sh` fails the build on a
> missing tool preview or category. **The activity side has no equivalent gate — it is still
> checklist-only, and is therefore still the exposed half.**

The operator was furious (profanity) that activity pages `/[locale]/activities/[slug]` rendered **generic template body copy** and second-batch **cards had no thumbnail**. Both are now fixed catalog-wide for EN (commit `16dd5a48`, 2026-06-28), but the two mechanisms must be honored for EVERY new activity build or the problem returns.

**Why:** the activity-build loop ships clean-sibling engines that, by default, have (a) no `prose[<id>]` entry → the page falls to the `byStrand`/`generic` template in `frontend/lib/seo/activity-content.ts` (looks templated/"shit"), and (b) no preview webp → the card falls to `ActivityGlyph` (was the bare star).

**How to apply — two NON-OPTIONAL steps per new EN activity (fold into the §A.13.62 DoD):**
1. **Per-activity copy.** Author a Tier-1 full-override `prose[<row.id>]` = `{about[≥2], practices[≥3], howToPlay[≥2], learningGoals[≥2]}` in `frontend/messages/activity-content/en.json` — hand-written, grounded in the activity's REAL mechanic + content (the actual nouns/numbers/words it shows), warm K-3 voice, natural SEO (skill name, grade, "free", "interactive", "no sign-up"), NO filler, NO stock opener. Gate: `node scripts/verify-activity-content-en.js` (must stay 194+/N full-override, 0 templates). `whatsInside` stays auto-derived (keep).
2. **Real thumbnail.** `node scripts/generate-activity-previews.js --only=<id-substr>` renders the play area → `frontend/public/mini-tools/previews/<id>.webp` (gitignored per §A.3); then scp/extract it into `/var/www/lcs-media/mini-tools/previews/` (served via the `frontend/public/mini-tools` → `/var/www/lcs-media/mini-tools` symlink) at deploy. Cards prefer this webp; the index gates on file existence (`loadPreviewIds`).

`ActivityGlyph` now also has topical strand-category fallback glyphs (threaded via `category={strandKey(...)}` + `subject`) so an un-previewed card is never the bare star — but that's only the safety net; the real thumbnail is the generated preview.

**Per-locale fan-out (same mechanism, one locale at a time):** **EN done** (194, `16dd5a48`); **DE done** (57, `8351a08a`); **FR done** (57, `617f616a`, 2026-06-28) — each authored by **native-language expert agents** (5 drafting + 1 native-linguist review pass), gated by `scripts/verify-activity-content-<loc>.js`. Each non-EN locale is **57 activities, 54 to author** (49 missing + 5 old flat-array bad-shape + 3 already-good), `<loc>.json` already has localized `labels`+`templates` (touch only `prose`). Per-locale rules that bit: **§20.10** — non-EN prose cites the national framework NAME (DE "Lehrplan", FR "les programmes officiels", per the route's `EDUCATIONAL_FRAMEWORK_BY_LOCALE`) or omits it, and must contain **NO "Common Core" / no raw CCSS code** (the gate's CC_RE+CODE_RE enforce this); **localize real content** (money activity = Euro/Cent for DE, euros/centimes for FR — not US coins); **localize grade bands** (DE Kindergarten/1./2. Klasse; FR maternelle-grande section/CP/CE1); the review pass repeatedly catches the same inherited `{strand}` placeholder leak in `choice-board.sort-count.k-md-b-3`. **One locale-only activity per locale** (no `slug.en`, e.g. DE `…bau-das-wort-aus-silben…`, FR `…forme-le-mot-en-syllabes…`) is skipped by `generate-activity-previews.js` (it filters `slug.en`) → render its preview with the one-off `scratchpad/gen-one-<loc>-preview.js` + scp. Remaining 8 locales (es/pt/it/nl/sv/da/no/fi) pending operator prompt; clone the gate (don't sed `\bde\b` — it mangles "override"→"overrifr"; copy + edit) + native-expert ensemble per locale. Related: [[project_games_build_walk]], [[feedback-lean-activity-qa]].
