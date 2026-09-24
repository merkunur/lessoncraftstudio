---
name: Deferred items queue — out-of-current-brief findings to address later
description: Operator-side queue of bugs, inconsistencies, or improvements surfaced during work on other briefs that are deliberately deferred. Each entry names the finding, the brief that surfaced it, and the proposed scope for when it gets picked up. Read at session start when the operator says "anything in the deferred queue?" — otherwise dormant.
type: project
originSessionId: 473bae53-b898-4ea7-a163-7b023122f752
---
**Reading rule:** Dormant unless the operator explicitly asks "what's in the deferred queue?" or starts work on a brief that this queue might inform.

**Writing rule:** When work on a brief surfaces a finding that's out of scope but worth not losing, append a new entry below with: (a) one-line finding, (b) originating brief / commit, (c) proposed scope when picked up.

---

## Pending deferred items

### IMAGE_VOCABULARY entry casing inconsistency

- **Finding:** `IMAGE_VOCABULARY` dictionary entries are inconsistently cased across the dictionary. English plurals like `["Crown","Crowns"]` are title-cased; some keys (e.g. `armor`) have no English entry at all and fall through to `_fallbackPlural` which preserves the lowercase key + appends `s` → `armors`. Mixed casing surfaces visibly when sr-only sentences mix vocab-entry words ("Crowns") with fallback-derived words ("armors") in the same sentence.
- **Originating brief:** Brief A 5A.3 — surfaced twice during render verification:
  - math-worksheet sr-only: "Hippopotamus plus Leopard plus Koala equals 12" — title-cased nouns mid-sentence
  - more-less sr-only: "Compare the groups of armors and armors" — lowercase fallback alongside Crowns/Bats/Antelopes title-cased entries
- **Why deferred:** out of Brief A scope. The cosmetic inconsistency is in the underlying vocabulary data, not in any sr-only construction code. Touching the vocab dictionary affects every other consumer (image alts, audio labels, deck cards, search) and warrants a focused vocabulary-normalization brief rather than a side-edit in Brief A.
- **Proposed scope when picked up:**
  - Decide canonical English casing convention (lowercase entries with code-side title-casing where needed? title-case entries throughout? mixed by part-of-speech?)
  - Sweep `IMAGE_VOCABULARY` for entries that don't conform; normalize
  - Audit `_fallbackSingular` / `_fallbackPlural` to match the chosen convention
  - Ripple check: image alts, sr-only, audio labels, deck cards, anywhere the vocab data is rendered to user-visible text
  - Coordinate with the 11-language data (German nouns capitalize regardless; English convention drives only the en strings)

### chart-count generator-side German-vocab leak in English decks (task #18 from current task list)

- **Finding:** `selectedImages` in chart-count is locale-stale when the user selects images in one locale and switches locale before generating. **Status: operator-confirmed reproduction across 2 deck samples (Commit 4 verification phase, 2026-04-27).** Symptom shape: deck renders English template ("Question N: Count the {word}...") with German singular items ("henne", "trägershirt", "papagei", etc.) and English-fallback plural rule ('+s' instead of German '+n'/'+e'). Three locale signals desync: `uiLocale` resolves template to en, `currentLocale` drives ImageVocab singular lookup to de, but `bundle.contentLanguage` ends up en so the plural fallback uses English rules.
- **Originating brief:** Brief A 5A.3 spot-check phase (hypothesis); confirmed in Commit 4 verification
- **Why deferred:** separate from Brief A SEO surface; needs its own correctness-pass commit
- **Proposed scope when picked up:** confirm which of the 3 locale signals is the source of truth; choose between (a) clear `selectedImages` on locale change, (b) re-fetch each selected item's name via `/api/images?search=<filename>&locale=<new>` on locale switch, or (c) tighten `bundle.contentLanguage` capture so it can't desync from `currentLocale` between image selection and bundle extraction. Option (c) addresses the most fundamental issue (the bundle's view of contentLanguage being stale); (a) is the safer K-3 default; (b) preserves user's selection but adds fetches.

### ~~Server-side stale translations file removal~~ — RESOLVED 2026-04-28

- **Finding:** `/var/www/lcs-media/worksheet-generators/js/translations-find-and-count.js` was a stale leftover from the pre-rename era.
- **Originating brief:** Brief A 5A.3 Commit 5 (commit `58d6c70f` did the script-tag fix; server-side cleanup followed).
- **Resolution:** `chattr -i` + `rm` executed on production server 2026-04-28 as part of Commit 5 close-out. Verbatim verification:
  - `ls | grep find-and-count` → `translations-find-and-count-complete.js` only (stale removed)
  - `curl -s -o /dev/null -w '%{http_code}' .../translations-find-and-count.js` → `404`
  - `curl -s -o /dev/null -w '%{http_code}' .../translations-find-and-count-complete.js?v=de-i18n-1` → `200`
- **Audit trail:** pre-removal audit confirmed no auto-restore mechanisms (no deploy.sh / server-scripts / cron / systemd timer / nginx references; stale file was not in the repo so `git pull` cannot restore it). Recovery footprint accepted as acceptable (stale file content was strictly older than `-complete.js`; recovery via git history / production logs available if ever needed).

### Sudoku image-source-namespace observation (cross-app evidence — environment-specific)

- **Finding:** Sudoku Phase 1 verification deck used image paths in a workspace-style namespace (`/images/cmkuesvi30000gxa3t9b8i597/horse-1769386106529-6f939a9d.webp`) — looks like a Cuid or workspace identifier path segment, not a theme-folder path. Picture-path Phase 1 verification decks across all three modes (pathway / classic-maze / choose-path) used clean theme-style paths (e.g. `lime`, `strawberry`, `kiwi` resolving cleanly via `vocabKeyFromImage` without namespace artifacts).
- **Originating brief:** Group B Phase 1 verification (sudoku 28.3.0 dump on 2026-04-28).
- **Why deferred:** the workspace-namespace pattern is sudoku-environment-specific or operator-environment-specific, not a general image-pipeline pattern. `vocabKeyFromImage`'s server-upload-with-suffix branch handled it correctly (sudoku verification PASSed with clean vocab keys). Worth logging as cross-app evidence for future verification work — if a new app surfaces the same namespace pattern, it's likely operator-environment-driven (e.g. how this operator's image library was migrated or organized) rather than something the bundle code needs to special-case.
- **Proposed scope when picked up:** if more apps surface the workspace-style namespace, investigate whether `/api/images` or the image library serving layer has special handling for this path pattern. If only sudoku surfaces it, log as an environment artifact and move on. No code change anticipated.

### Choose-path-with-legend-populated path unexercised by Group B Phase 1

- **Finding:** Picture-path's choose-path mode supports collectibles (legend.items[] populated) per the bundle-shape contract, but the operator's Phase 1 default-settings choose-path verification deck did NOT have collectibles configured (`legend: null` in the dump). The choose-path-with-legend-populated branch of the Phase 2 sr-only template (the conditional collectibles segment) is therefore unexercised at Phase 1 close.
- **Originating brief:** Group B Phase 1 verification (picture-path 29.4.1 dump on 2026-04-28).
- **Why deferred:** not Phase 1 PASS-blocking (Phase 1 was bundle-extension, not template implementation). The legend.items[].vocabKey extension is implemented and verified via classic-maze's populated legend (4 items: strawberry, banana, pomegranate, pineapple). The choose-path branch uses the same code path; failure mode would be specific to choose-path's collectibles configuration if it differs structurally.
- **Proposed scope when picked up:** Phase 4 coverage gate item — generate a choose-path deck with collectibles configured (Treasure Trail variant of choose-path mode), verify the bundle's `legend.items[].vocabKey` populates correctly and the Phase 2 template's collectibles segment renders with the correct items.

### IMAGE_VOCABULARY data typo "octogon" → "octagon"

- **Finding:** the canonical key in IMAGE_VOCABULARY is misspelled as `octogon` (correct: `octagon`). Surfaced via cryptogram Phase 2 verification deck where `cipherMap.O.vocabKey === "octogon"` and the rendered sr-only text shows "Octogon" (preserving the typo via `_fallbackSingular` since "octogon" has no IMAGE_VOCABULARY entry, falling through to the title-cased key text).
- **Originating brief:** Group B Phase 2 cryptogram verification (commit `9c9b1b55`, deck dump 2026-04-28).
- **Why deferred:** vocab-data bug, not template/dispatch bug. Fixing the misspelled key is a single-line fix in the image library data layer; out of scope for Phase 2 sr-only consumer wiring.
- **Proposed scope when picked up:** rename the canonical key from `octogon` to `octagon` across IMAGE_VOCABULARY (raw JSON source, generated `image-vocabulary.js`, any image filenames using the typo'd key on disk and in the database). Ripple check: image alts, sr-only, audio labels, deck cards, anywhere the key is rendered. Single-line vocab-data-cleanup item; file alongside the existing IMAGE_VOCABULARY casing-inconsistency entry.

### Lookup-then-fallback dispatch unexercised — `_fallbackSingular` silent fallthrough

- **Finding:** the lookup-then-fallback dispatch pattern in cryptogram Phase 2 (try `ImageVocab.singular(entry.vocabKey, srLang)` first; on falsy fall through to `entry.fallback`) does NOT detect `_fallbackSingular`'s silent-fallthrough behavior. `ImageVocab.singular` returns `_fallbackSingular(key)` for unknown keys (title-cased key text — never null/undefined), so the `|| entry.fallback` branch never fires. The `entry.fallback` value (`img.word || img.name`) is therefore dead code in the current dispatch.
- **Originating brief:** Group B Phase 2 cryptogram verification (commit `9c9b1b55`, vocab-typo "octogon" surfaced the dispatch gap).
- **Why deferred:** `vocabKeyFromImage` strips suffix patterns earlier in the pipeline (per CLAUDE.md §14.3a branch 2), so genuine user-upload gibberish never reaches the dispatch site — the path that motivated the fallback design isn't exercised in current code paths. The gap is real (would surface if a future code path produces a non-stripped suffix-bearing key) but cosmetic in the current codebase.
- **Proposed scope when picked up:** cross-cutting dispatch hardening. Detect `_fallbackSingular`'s output signature (compare returned value against `key.charAt(0).toUpperCase() + key.slice(1)`) and prefer `entry.fallback` when matched. Cross-references: cryptogram cipherMap consumer site (line ~4942 of cryptogram.html), and any future consumer that uses the `{vocabKey, fallback}` shape. Decision: where to land the dispatch hardening — in `LCSCatalogExport.vocabKeyFromImage` itself (centralized but changes a stable API), or in per-app consumer code (decentralized but each consumer must implement the same check). Choose at pickup time.

### Classic-maze-without-collectibles not generatable through picture-path UI — Phase 4 coverage gate

- **Finding:** the picture-path sidebar offers no toggle to disable collectibles for classic-maze mode; classic-maze always renders with the legend (Treasure Trail variant). Surfaced during Group B Phase 2 picture-path verification (2026-04-28) when the operator attempted to generate the requested "classic-maze without collectibles" deck and confirmed the UI doesn't expose that configuration.
- **Originating brief:** Group B Phase 2 picture-path verification (commit `75d4a27c`).
- **Why deferred:** the conditional skip for null legend in classic-maze template is the same code path used by pathway and choose-path (which DO render with `legend: null` in default configs). Phase 2 verification covered the legend-null branch via cross-mode equivalence (deck 1 pathway + decks 4/5/6 choose-path all exercise the conditional skip and correctly omit the collectibles segment). Classic-maze-specific structural-only rendering (the maze template without collectibles trailing segment) is unexercised directly but functionally covered.
- **Proposed scope when picked up:** Phase 4 coverage gate item. UI-config investigation first — does the picture-path sidebar have a hidden/non-default path that disables collectibles, or is Treasure Trail mandatory for classic-maze? If no UI path exists, generate a deck-fixture forced to `legend: null` for verification-only purposes (test-deck construction, not production UI change). No code change anticipated; verification artifact only.

### Hardcoded list joiner remediated to `Intl.ListFormat` at 3 sites (cross-cutting)

- **Finding:** the Oxford-comma list-joiner pattern was hardcoded with English `' and '` separator at 3 sites (sudoku uniqueImageKeys, cryptogram legendSlots vocab list, picture-path collectibles `{itemList}`). Surfaced during Group B Phase 3 sudoku verification (commit `b07afa37`) when the German deck rendered "Hund, Kaninchen, Specht, **and** Kamel" instead of "Hund, Kaninchen, Specht **und** Kamel".
- **Originating brief:** Group B Phase 3 sudoku verification (`b07afa37`) → hotfix landed at commit `8f4f9685`.
- **Resolution:** all 3 sites replaced with `Intl.ListFormat(srLang, { style: 'long', type: 'conjunction' }).format(items)` + defensive fallback to hardcoded English Oxford-comma if `Intl.ListFormat` is undefined or throws. Browser support: Chrome 72+, Firefox 78+, Safari 14.1+ (all 2020+; matches the apps' modern Canvas/Pointer Events baseline).
- **Why deferred (forward-looking):** the pattern is currently inlined at 3 call sites with identical implementation. Eligible for promotion to `LCSCatalogExport.formatList(items, locale)` shared helper when a 4th consumer adopts the same pattern.
- **Proposed scope when picked up:** Phase 4 Group C apps (or any earlier consumer-additive change) that adds a 4th sr-only-list-joining call site triggers promotion. Same threshold as the §14.3a "single-consumer keys per-app, ≥2-consumer keys shared" convention. CLAUDE-MD-UPDATES queue has a placeholder item for this promotion (§17.8.x list-joiner convention).

### IMAGE_VOCABULARY data-quality observations (consolidated — Phase 2 + Phase 3 surfaces)

- **Finding:** several IMAGE_VOCABULARY entries surface as cosmetically-off in rendered sr-only output. Sibling family to the existing `octogon` typo entry; consolidating here for vocab-data-cleanup batch.
- **Surfaced entries:**
  - `octogon` (correct: `octagon`) — typo'd canonical key, surfaced in Group B Phase 2 cryptogram (commit `9c9b1b55`). [Already filed as separate entry above.]
  - `Fröhlich` (German "cheerful" — adjective, not a noun) — surfaced in Group B Phase 3 cryptogram verification (commit `898f3596`) as the German vocabulary entry for some F-image. The cipher key needs each image to start with a unique letter; the F-image's German label is an adjective rather than a noun name. Vocab-data quality observation.
  - `Dragonfruit` — German vocabulary entry preserves the English loanword instead of the idiomatic `Drachenfrucht`. Surfaced in Group B Phase 3 picture-path classic-maze + collectibles verification (commit `263c67f2`).
  - `Avocado` / `Grapefruit` — feminine loanwords; cosmetic correctness depends on style guide (loanword vs Germanized form). Surfaced in Group B Phase 3 picture-path verification.
- **Why deferred:** IMAGE_VOCABULARY data layer; not template/dispatch scope. Single-line fixes per entry in the canonical vocab dictionary + ripple check across image alts, sr-only, audio labels, deck cards.
- **Proposed scope when picked up:** vocab-data-cleanup batch alongside the existing IMAGE_VOCABULARY casing-inconsistency entry and the `octogon` typo entry. Per-language editorial pass — for German specifically, decide canonical loanword vs Germanized-noun policy (likely keep loanwords for foreign foods that are commonly known in the loanword form; Germanize for items where the German noun is more child-friendly).

### Cryptogram cipher-letter / German-singular first-letter mismatch (generator-side pedagogy)

- **Finding:** in DE-locale cryptogram decks, the cipher-letter assignment uses EN first-letter logic but the rendered legend substitutes DE singulars via `ImageVocab.singular(key, 'de')`. When the DE singular doesn't start with the same letter as the EN counterpart, the puzzle's pedagogy breaks: the kid sounds out the picture's German first letter but the cipher symbol means a different letter. Materialized in Gate 1 cryptogram DE verification (commit `898f3596` + hotfix `573f69e0`): position 11 (cipher letter W per alphabetical `cipherMapKeys`) rendered as German singular "Hut" (German for "hat") which starts with H, not W.
- **Originating brief:** Group B Phase 4 Gate 1 cryptogram DE verification (cumulative deck artifact 4/14, 2026-04-28).
- **Why deferred:** generator-side cipher-letter selection algorithm fix; not sr-only emission scope. Same family as the chart-count locale-stale `selectedImages` finding (task #18) — both surface the pattern where image-first-letter logic doesn't re-validate after locale-aware vocabulary substitution.
- **Proposed scope when picked up:** at cryptogram puzzle generation time, after assigning images to cipher letters, validate that each image's `ImageVocab.singular(key, currentLocale)` starts with the assigned cipher letter. On mismatch: (a) re-pick a different image whose locale-singular matches the cipher letter, OR (b) re-key the cipher to the actual locale-singular first letter. Decision belongs to operator at pickup time. Cross-app pattern: any generator using image-first-letter for puzzle structure must re-validate after locale-aware vocabulary substitution.

### Social-share v1: predicted-slug vs publish-cli collision-suffixing trade-off

- **Finding:** social-share v1 brief (Phase 3 in-deck affordance) constructs `canonicalURL` at deck.html generation time using predicted slug from `slugify(title)` — `https://lessoncraftstudio.com/<locale>/decks/<slugify(title)>/`. The predicted slug may collide with publish-cli's de-duplication logic per §17.8.5 (publish-cli appends numeric suffix on slug collisions), in which case post-publish URL differs from pre-publish predicted URL.
- **Originating brief:** social-share v1 Sub-phase A (helper construction).
- **Why deferred:** v1-acceptable risk per Option A authorization; the typical case (no collision) produces predicted URL = published URL. Pre-publish-shared links to colliding decks would 404 OR redirect-to-predicted-slug-with-different-content. Bounded by rarity of slug collisions.
- **Proposed scope when picked up:** when publish-cli ships and starts substituting `__CANONICAL_URL__`, retire the predicted-slug fallback in `buildShareAffordance`. Switch to consuming a real published-URL source: either (a) pass real canonicalURL via opts (publish-cli sets it), or (b) hold the affordance until publish-cli completes and rewrites the deck.html post-publish. Option (a) is cleaner; the helper already accepts `canonicalURL` opt, so this is a flag-flip on the catalog-publish side.

### Social-share v1: 404 user-experience trade-off (catalog deck route absent)

- **Finding:** social-share v1 ships the in-deck share affordance with visible UI NOW, but the constructed canonical URLs return 404 when followed because the catalog deck route `/[locale]/decks/[slug]` does not yet exist in `frontend/app/`. Operator-confirmed via Sub-phase B spot-check + Gate 2 (4 ZIP spot-checks); both verified the URL construction is correct, the routing failure is upstream-dependent.
- **Originating brief:** social-share v1 Phase 0 reconnaissance (catalog deck route absent finding) → Sub-phase B PASS → Gate 2 PASS (Sub-phase D close-out, 2026-04-28).
- **Why deferred:** v1-scope-shift acceptance — the affordance ships in both direct-download and catalog-export ZIP flows because the per-app integration was the high-value structural work; the upstream catalog-page surface is genuinely upstream-dependent.
- **Operator-facing constraint:** subscriber-facing copy promoting "share your decks" must NOT ship until the catalog deck route is live, or recipients hit 404 on every shared link. Flag for product/marketing copy review when the public site rebuild's home/pricing/about copy is drafted.
- **Proposed scope when picked up:** resolves automatically when the catalog deck route + publish-cli ship (likely follows Brief B). The Phase 1/2/Gate 1 surface from the original social-share-v1 brief reactivates as a follow-on brief at that point (FB Sharing Debugger, LinkedIn Post Inspector, Twitter Card Validator across the 8 ZIPs).

### Social-share v1: catalog-page-side share work deferred (post-Brief-B)

- **Finding:** the catalog-page surface for share — OG metadata on `/[locale]/decks/[slug]`, share row component on the catalog page, OG image at 1200×630 derived from the existing 480×620 `thumbnail.png` — is OUT OF SCOPE for the social-share-v1 brief.
- **Originating brief:** social-share v1 Phase 0 reconnaissance scope-shift (catalog deck route absent in `frontend/app/`).
- **Why deferred:** upstream-dependent on the catalog deck route landing. The in-deck affordance (§17.8.15) is the operator-side complement; the catalog-page side is the visitor-side complement.
- **Proposed scope when picked up:** future brief once catalog deck route ships (likely follows Brief B publish-cli). Inherits the OG-image-derivation work (1200×630 from existing 480×620 thumbnail.png) as a sub-task.

### Social-share v1: apps hardcode English title literal in bundle.title (slug-derivation drift from §17.4)

- **Finding:** all 29 in-scope apps hardcode an English title literal in `bundle.title` at `extractDeckBundle` time (e.g. sudoku `'Picture Sudoku'`, addition `'Addition Practice'`, cryptogram `'Cryptogram Practice'`, picture-path `'Picture Path'`). The in-deck share affordance's predicted-slug fallback derives the slug from `bundle.title`, so the slug is English-letter regardless of the deck's content locale. Diverges from §17.4's native-language-slug principle (`/de/topic/mathe-kindergarten-addition/` not `/de/topic/math-kindergarten-addition/`).
- **Originating brief:** social-share v1 Sub-phase D Gate 2 static analysis (operator-confirmed across 4 apps × 2 locales, 2026-04-28). The operator's Sub-phase A.1 spot-check `picture-sudoku` slug for DE locale validates this finding empirically.
- **Why deferred:** bounded for v1 — the predicted slug is consistent across the 8 ZIPs; rendered share UX still works because URL construction is well-formed and the eventual real canonical URL is also unknown until publish-cli ships. Resolves when (a) apps propagate localized titles into `bundle.title` AND (b) publish-cli ASCII-folds the resulting slug.
- **Proposed scope when picked up:** at the apps + publish-cli touchpoint. Per-app fix: change `extractDeckBundle`'s hardcoded English title to a localized-title fallback (the deck.html runtime STRINGS table needs DE/etc. blocks first — see related deferred entry below). Per-publish-cli fix: ASCII-fold non-ASCII characters in the slug per §17.8.5 spec instead of converting them to hyphens (current `slugify` at `catalog-export.js:90` does the latter — see related deferred entry below).

### Social-share v1: slugify converts non-ASCII to hyphens, not ASCII-folds

- **Finding:** the `slugify` function at `REFERENCE TRANSLATIONS/catalog-export.js:90` does `.replace(/[^a-z0-9-]+/g, '-')` — any non-ASCII character (`ä`, `ö`, `ü`, `ß`, `ç`, `ñ`, etc.) becomes a hyphen. CLAUDE.md §17.8.5 spec for publish-cli's slug generation says "ASCII-folded for URL-path safety (e.g., German `ä` → `a`, Finnish `ä` → `a`, Spanish `ñ` → `n`)" — the current implementation does NOT match that spec.
- **Originating brief:** social-share v1 Sub-phase D Gate 2 static analysis (slugify inspection, 2026-04-28).
- **Why deferred:** bounded for v1 — all 29 apps' `bundle.title` is currently ASCII-only (English literals), so the divergence is unobservable. Becomes load-bearing when (a) apps populate localized titles or (b) publish-cli is implemented and its slugify ASCII-folds. The two would mismatch (helper produces `'w-rter'` from `'Wörter'`; publish-cli per §17.8.5 spec produces `'worter'`).
- **Proposed scope when picked up:** filed in same family as the apps-hardcode-English-title item; both resolve at the apps + publish-cli touchpoint. Decision at pickup: ASCII-fold via a transliteration table (German diphthongs `ä→ae`, `ö→oe`, `ü→ue`, `ß→ss` per German convention; or simpler `ä→a` per §17.8.5's stated example). Implementation: replace the regex-only `slugify` with a `String.prototype.normalize('NFD').replace(/[̀-ͯ]/g, '')` pre-pass for combining-mark stripping, plus an explicit small character map for non-decomposable equivalents (`ß→ss`, `ł→l`).

### prisma-migration-history-drift: 20251122011743_add_language_to_blog_pdfs missing from migrations folder

- **Finding:** `_prisma_migrations` table records `20251122011743_add_language_to_blog_pdfs` as fully applied (started 2025-11-22 01:18:08, finished_at populated, applied_steps_count=1, no rollback). The `blog_pdfs.language` column physically exists in prod (`text NOT NULL`). But there is NO corresponding migration file in `frontend/prisma/migrations/`. Inverse of the design_elements drift resolved during Brief B Phase 1 (which was DB-unrecorded but folder-present).
- **Originating brief:** Brief B Phase 1 (commit `4b91adc0`); surfaced during Step 1 reconciliation investigation when querying `_prisma_migrations` against the migrations folder. The design_elements drift was resolvable via `prisma migrate resolve --applied` (folder-present, DB-unrecorded — straightforward). This drift is the opposite direction (DB-recorded, folder-missing) and requires different resolution.
- **Why deferred:** does NOT block `migrate deploy` (Prisma ignores DB records that don't have folder files; only folder-present-but-DB-absent migrations cause `migrate deploy` to error). Phase 1's path-(a) reconciliation cleared the design_elements blocker without needing this drift resolved. Folder-side hygiene only — git history is missing a real migration file.
- **Proposed scope when picked up:**
  - Recover the missing `migration.sql` for `20251122011743_add_language_to_blog_pdfs` from production state (e.g., compute the diff between schema-as-of-2025-11-22 and the addition of `language` column; or reconstruct from git blame / commit history near 2025-11-22).
  - Place the recovered migration in `frontend/prisma/migrations/20251122011743_add_language_to_blog_pdfs/migration.sql`.
  - Verify migration is now folder-present + DB-recorded (no further drift); future `migrate deploy` invocations on a fresh DB clone would replay correctly.
  - Reasonable bundle alongside the methodology note operator queued for MEMORY: future migrations always through `prisma migrate deploy`; never direct psql DDL on prod (which is what created the design_elements drift). The blog_pdfs drift may be from the pre-Lemon-Squeezy era's direct-DDL workflow per a similar pattern.
- **Deferred methodology entry queued (Phase 6 close-out 2026-04-30):** `feedback_prisma_migrations_through_deploy.md` was queued in CLAUDE-MD-UPDATES.md but deferred at Phase 6 brief drafting (Section E.4 decision) on the rationale that the prescriptive methodology lands on weaker ground while one drift instance (Drift Y, this entry) is still open. **Draft the methodology entry when Drift Y resolves at next migration touch.** The other 5 Phase 6 methodology entries describe drift PATTERNS that are now resolved or contained; this one bundles a still-open instance, so the prescription waits.

### Social-share v1: deck.html runtime STRINGS table has only en block (broader localization debt)

- **Finding:** all 29 in-scope apps' deck.html **runtime** `STRINGS` table contains only an `en` block (e.g. sudoku.html:3845 has `en:{title:"Picture Sudoku", check:"Check Answers", ...}` and no `de:{...}`). The `T(key)` lookup in deck.html runtime falls back to `STRINGS.en` for any non-en content locale. Result: the deck.html title bar (`<h1 class="lcs-title">`) renders "Picture Sudoku" / "Addition Practice" etc. in English even at DE / FR / ES / etc. locales.
- **Originating brief:** social-share v1 Sub-phase D Gate 2 static analysis surfaced this as a separate localization debt that cross-cuts all interactive-HTML decks and pre-dates social-share-v1.
- **Why deferred:** broader scope than social-share-v1 — affects every interactive-HTML deck across all 29 apps and all 11 site locales. Filed under social-share-v1 family for traceability (Gate 2 surfaced it) but the actual fix is a translation-debt brief covering localized title + check-answers / try-again / etc. strings across all 29 apps × 10 non-en locales.
- **Cross-reference:** related to but distinct from `project_brief_a_translation_debt.md` (Brief A's en+de-only translation debt across the SEO surface). Brief A's debt is on the SEO `<head>` strings (operator-side, generation-time bake); this entry is on the deck.html runtime title bar (deck.html runtime side).
- **Proposed scope when picked up:** future translation-debt brief. Per-app: add localized blocks to each app's `INTERACTIVE_RUNTIME_LINES` STRINGS table (de, fr, es, pt, it, nl, sv, da, no, fi). Coordinate with the apps-hardcode-English-title-in-bundle.title finding above — once the runtime STRINGS table has localized titles, the bundle-side title hardcoding can be replaced with a localized-title lookup, which then unblocks native-language slug derivation in `buildShareAffordance`.

### Social-share v1 family: deck.html title bakes English axis-key as theme value (catalog-export.js generation-time concern)

- **Finding:** real DE addition deck.html titles surface as `Additionsspaß Arbeitsblatt — animals — Kindergarten | LessonCraftStudio` — the theme segment `animals` is the English axis-key, NOT the localized German theme name (`Tiere`). Surfaced during Brief B Phase 2 real-ZIP spot-check inspection of the deck.html.diff for addition-de (commit `59a0cde9` follow-on observation).
- **Originating brief:** Brief B Phase 2 real-ZIP spot-check (2026-04-29). Diff inspection of the post-substitution deck.html surfaced the pre-existing English literal in the title segment.
- **Root cause:** `catalog-export.js`'s `buildSeoHead` constructs the `<title>` element at deck-generation time using the operator-passed `manifest.theme` value as-is (`buildSeoHead({manifest, ...})` reads `manifest.theme` — which is the English axis-key like "animals" or "vehicles"). At deck-generation time, catalog-export.js has no taxonomy-lookup access AND no i18n-lookup access for theme localization. The English axis-key becomes the visible title segment. publish-cli's substitution layer correctly substitutes the 13 placeholders downstream; the English `animals` literal is pre-existing baked-in content, NOT a substitution-layer bug.
- **Why deferred:** out of Brief B scope. Brief A SEO-surface concern + same root-cause family as the existing entry "Social-share v1: apps hardcode English title literal in bundle.title" (apps don't have taxonomy/i18n access at deck-generation time). Substitution layer correctness verified independently at Phase 2 PASS.
- **Proposed scope when picked up:** future Brief A SEO-surface refresh OR a per-app catalog-export.js extension that adds a placeholder for the localized theme name (e.g., `__THEME_LOCALIZED__`) which publish-cli substitutes via taxonomy.themeFor at upload time. Adds a 14th placeholder to the inventory; modest scope but bounded. Same family as the existing apps-hardcode-English-title-in-bundle.title item; both resolve at the apps + taxonomy/i18n touchpoint.

### Hetzner Node 18.20.8 past EOL (runtime-hygiene family)

- **Finding:** Hetzner runs Node 18.20.8 (per recon `node --version` at Phase 3 Step 1 + ongoing publish-cli execution at Phase 3 close-out). Node 18 entered maintenance LTS until **April 30, 2025** — past EOL as of today, April 29, 2026.
- **Originating brief:** Phase 3 cheerio→node-html-parser fix-up at commit `9bed3bd4`. cheerio@1.1.2 transitively requires undici@7.16.0 which needs Node ≥20.18.1; the version skew crashed publish-cli's first publish attempt with `ReferenceError: File is not defined` from undici's webidl. Resolved at `9bed3bd4` by switching extract-html-meta from cheerio to node-html-parser. The Node-version concern is the underlying root cause, not the cheerio dep.
- **Why deferred:** out of Brief B scope. Brief B's surfaces all run cleanly on Node 18 with the cheerio→node-html-parser swap. Node upgrade is operational hygiene work that touches the deploy pipeline, not Brief B.
- **Proposed scope when picked up:** upgrade Hetzner Node to current LTS (Node 22 — current LTS as of 2026) or active LTS (Node 20). Test surface: existing Next.js app (frontend/) + publish-cli (scripts/publish-cli/) + any other Node tooling on Hetzner. Pre-upgrade snapshot via apt + node version pinning; post-upgrade smoke-test the Next.js app's PM2 process + a publish-cli dry-run + nginx-proxied /en/ home page. Phase 6 CLAUDE.md amendment when Node upgrade lands: document the pre-upgrade Hetzner state ("Phase 3 verified on Node 18.20.8") and post-upgrade state ("Node 22.x operational from <date>") with explicit cross-reference to this deferred item.

### Brief B Phase 2: Romance-apostrophe slug treatment (slug-related family)

- **Finding:** publish-cli's slug generator at `scripts/publish-cli/slug.js` produces hyphen substitution for apostrophes, per the conservative §17.8.5 reading (any non-`[a-z0-9-]` becomes a hyphen). Romance-language contractions render as `l-addition` from `l'addition`, `dell-addizione` from `dell'addizione`, etc. URL-valid; slightly less idiomatic than apostrophe-stripping equivalents (`laddition`, `delladdizione`).
- **Originating brief:** Brief B Phase 2 (slug.test.js cases 15+16 surfaced the trade-off; commit `3a85111d`).
- **Why deferred:** v1-acceptable. §17.8.5 doesn't authorize special-casing for apostrophes, so the conservative regex-based rule shipped at v1. Hyphen-substitution preserves URL safety + matches the rule's literal interpretation.
- **Proposed scope when picked up:** v2 refinement candidate IF Romance launch (Tier 4 per §19, months 9-12) surfaces awkward URLs in the wild — e.g., share-link click-through data, marketing-team feedback, or SEO performance comparison. Resolution would be a small per-character special case in slug.js: strip apostrophes (and similar contraction markers like `'`, `'`, `'`) before the non-ASCII-folding regex pass. Trade-off: introduces a behavioral choice the spec doesn't authorize, vs. cosmetically cleaner Romance URLs. Bounded; not blocking. Same family as the social-share-v1 slug-related entries above (apps-hardcode-English-title-literal; slugify-non-ASCII-becomes-hyphens).

### Per-app `t()` locale-binding architectural divergence (cross-cutting operational hygiene)

- **Finding:** the `t(key)` helper function in each app's HTML binds to a different locale source. Surfaced during Group B Phase 3 cryptogram verification (commit `898f3596`) when the German deck rendered mixed-locale output: image names + list joiner correct DE (sourced from `bundle.contentLanguage`), but template body + aria-label English (sourced from `t()`).
- **Per-app divergence:**
  - **sudoku.html** (line ~1345): `t()` uses `currentLocale` (content locale; line `let currentLocale = window.currentLocale || 'en'`). Content-locale-correct by accident — Phase 3 sudoku PASSed because of this coincidence, NOT design intent.
  - **cryptogram.html** (line ~40): `t()` uses `uiLocale` (URL-locked; line `let uiLocale = urlParams.get('locale') || urlParams.get('ui') || 'en'`). UI-locale-only, breaks for content-locale-driven sr-only when in-page picker switches `currentLocale` without touching `uiLocale`.
  - **picture-path.html** (line ~1703): `t()` uses `window.uiLocale || window.currentLocale || 'en'` — uiLocale-preferred with currentLocale fallback only when uiLocale is undefined. Same defect shape as cryptogram in default flows.
- **Originating brief:** Group B Phase 3 cryptogram (`898f3596`) verification → hotfix bypassing `t()` at sr-only sites lands as separate commit.
- **Why deferred:** unblocking Phase 3 picture-path requires a surgical bypass at sr-only sites (already authorized), NOT a global `t()` refactor. Refactoring `t()` to use a uniform locale source across all 29 apps could regress UI strings that genuinely depend on uiLocale separation (the architecture intentionally separates UI translations from content translations; collapsing them is a behavioral regression).
- **Why this defect was invisible in EN-only Phase 2:** EN is the default for both `uiLocale` and `currentLocale` in all three apps. Mixed-locale output only surfaces when the in-page picker switches `currentLocale` to a non-default while `uiLocale` stays default ('en'). The Group A Brief A 5A translation work was EN+DE per the en-then-de cadence and would have produced the same mixed-locale output if the per-app sr-only sites had been wired against `t()` — but Brief A's per-app shape used per-row `srExercise*` templates wired through a different code path (the `buildSrRows` consumer site) that may already have srLang-keyed lookups; needs audit at pickup time.
- **Proposed scope when picked up:**
  1. Audit all 29 apps' `t()` locale binding. Categorize each: content-correct (sudoku-shape) / uiLocale-only (cryptogram-shape) / uiLocale-with-currentLocale-fallback (picture-path-shape) / other variants.
  2. Decide canonical convention: should `t()` continue UI-locale-bound and content-locale lookups happen via separate `tContent()` helper? Or should `t()` unify on `currentLocale`-via-window? Decision affects every per-app code path that uses `t()` for content strings.
  3. Audit Brief A 5A `srExercise*` per-row template lookup sites (in per-app `renderStandaloneHTML` functions): are they already srLang-keyed (via `buildSrRows({rows: [...]})` where each row was constructed with explicit srLang lookup)? Or do they share the cryptogram/picture-path defect shape?
  4. Sweep cross-cutting fix: either (a) refactor t() per-app to use canonical convention, or (b) bypass t() at all content-locale sites with explicit srLang-keyed lookup (the Phase 3 hotfix pattern, generalized across 29 apps).
- **Cross-references:** the Phase 3 hotfix commit (TBD; will be filled in at apply time) demonstrates the bypass pattern. The deferred-queue picture-path source-side data-shape fragility entry is structurally adjacent (both are per-app architectural inconsistencies that surface late).

### Picture-path source-side data-shape fragility (refactor-eligible)

- **Finding:** Picture-path's three modes return different shapes from their generators. `generateClassicMaze` (line 4877+) returns `{selectedStartImage, selectedEndImage, ...}`. The choose-path generator (line 5951+) returns `{items: [{image, type, corridorCell, ...}], endCells, ...}` WITHOUT the singular `selectedEndImage` field. The `lastGeneratedData` spread at line 6993-7002 then ADDs `selectedEndImage: selectedEndImage` (script-scope variable set by pathway-mode UI flow) on top of both, producing a mode-conditional union shape that's coincidentally nullish for choose-path.
- **Originating brief:** Group B Phase 1 — picture-path commit (5bfa496c → 5bfa496c.1 / 8fc9f522 iteration round on 2026-04-28). The choose-path endCellImage initially captured `data.selectedEndImage` (which is null for choose-path because the generator doesn't populate it), forcing an iteration round that re-routed the lookup to `data.items.find(i => i.type === 'end-correct').image`.
- **Why deferred:** structural refactor that's outside Group B Phase 1 scope (which is bundle-extension only, not source-side data-shape normalization). Future picture-path work will keep encountering this pattern when adding new bundle fields or new mode variants.
- **Proposed scope when picked up:** normalize the three picture-path mode generators to return a consistent shape — at minimum, `{startImage, endImage, items, ...}` where `startImage` and `endImage` are the per-mode "what's at the endpoint" images (null when arrows, populated when images), regardless of how the source implementation chose to encode this. Eliminates the mode-conditional null-recovery logic from downstream consumers (bundle code, runtime code, future analytics). Eligible refactor work whenever picture-path comes up for substantive change.

### nginx www-canonicalization 301 redirect — pre-existing, not yet documented

- **Finding:** `https://lessoncraftstudio.com/<path>` returns HTTP 301 redirecting to `https://www.lessoncraftstudio.com/<path>`. Pre-existing nginx rule (server-level `Server: nginx/1.18.0 (Ubuntu)`); not authored as part of any Brief B phase. The redirect is at the Hetzner-side nginx layer (origin), not at Cloudflare.
- **Originating brief:** Phase 5 Sub-phase 5.5 verification — surfaced when `curl https://lessoncraftstudio.com/en/decks/picture-path/` returned 301 instead of 404 post-unpublish, prompting investigation. Following the redirect via `curl -L` yielded the expected status (404 for unpublished, 200 for published).
- **Why deferred:** the redirect is correct and load-bearing for canonical-URL discipline (single-host content addressing). It just isn't documented in CLAUDE.md anywhere — neither §15.x serving-layer contract nor §17 site-rebuild docs.
- **Trigger condition:** any future serving-layer reasoning that depends on canonical URL behavior. e.g., catalog-page-share work (§17.8.15 + social-share-v1 family) may need to anchor URL substitutions to the www-canonical form; Sub-phase 5.8 CDN observability checks may need to follow redirects to land on the correct origin response.
- **Proposed scope when picked up:**
  - Document the 301 redirect at §A or §15.x (operational behavior section). One-line: "`lessoncraftstudio.com → www.lessoncraftstudio.com` 301 redirect at nginx server-block; canonical URLs are `https://www.lessoncraftstudio.com/...`."
  - Audit existing CLAUDE.md references to URLs — anywhere a canonical URL is asserted (e.g., §17.8.1's `__CANONICAL_URL__` placeholder format, social-share's predicted-slug fallback) should reflect the www-prefix form so substitutions match the served reality.
  - Phase 6 close-out batch is a natural home if the audit happens early; otherwise file as standalone documentation amendment.

### Archive folder cleanup policy — revisit if `.archived/` growth becomes problematic

- **Finding:** Phase 5 v2 brief Q3 lock confirmed `KEEP_VERSIONS=3` cap forever (Phase 3 behavior unchanged). Aged versions and unpublished decks accumulate in `/var/www/lcs-media/decks/.archived/<locale>/<slug>-pruned-<ts>/` and `<slug>-unpublished-<ts>/` indefinitely. At Phase 5 entry: 1 archived dir total (en/addition-image-image-pruned-20260429155213). Disk growth is bounded by edit-frequency × archive-size; not problematic at current scale (8 decks, low republish frequency).
- **Originating brief:** Brief B Phase 5 v2 lockdown (2026-04-29). Q3 reasoning: "per-app param is over-engineering for 8 decks. Cleanup-cron adds operational complexity that doesn't pay off until archive grows problematically. Cap forever + archive accumulation is fine for now."
- **Why deferred:** premature optimization at current scale. The trigger condition is operational-complexity-justified, not theoretical-disk-pressure-justified. Until the operator notices `.archived/` growth (or `du` flags it), no action.
- **Trigger condition:** `du -sh /var/www/lcs-media/decks/.archived/` returns >1 GB OR operator-flagged disk-pressure event OR catalog volume crosses ~100+ decks (at which point edit-frequency × archive-size could meaningfully accumulate).
- **Proposed scope when picked up:**
  - Author cleanup-cron at `/var/www/lcs-media/scripts/cleanup-archived-decks.sh` running daily/weekly.
  - Retention threshold (e.g., 90 days for `pruned-*` archives; 365 days for `unpublished-*` archives — longer retention because unpublishes are rarer and operator-initiated).
  - Cron entry in `/etc/cron.d/lcs-media-cleanup` matching the §A.1 server pattern.
  - Logging to `/var/log/lcs-media-cleanup.log` for audit.
  - Coordinate with Phase 6 CLAUDE.md amendment if §A.1 documentation needs cleanup-cron coverage.

### `topics-taxonomy.json` coverage gap — 4 of 29 apps registered, 25 missing

- **Finding:** `frontend/config/topics-taxonomy.json` (Phase 2-sealed at `f75e8d1e` → `59a0cde9`) registers exactly 4 apps: `addition`, `sudoku`, `cryptogram`, `picture-path`. The other 25 in-scope apps from §14.10 (alphabet-train, big-small, bingo, chart-count, code-addition, crossword, find-and-count, find-objects, grid-match, matching, math-puzzle, math-worksheet, missing-pieces, more-less, odd-one-out, pattern-train, pattern-worksheet, picture-sort, prepositions, shadow-match, subtraction, treasure-hunt, word-guess, word-scramble, wordsearch) lack taxonomy entries entirely. Bulk-publishing any of them aborts cleanly at the substitute layer with `taxonomy.appConfig: app "<name>" not in taxonomy.apps` for `__EDUCATIONAL_LEVEL__` (no age_range fallback) and `__LINK_MORE_TYPE__` (no exercise_type_axis_key).
- **Originating brief:** Brief B Phase 4 — surfaced at the first 8-ZIP real-mode `publish-bulk --confirm` attempt (2026-04-29). 4 fresh ZIPs (bingo de, crossword en, pattern-train en, word-scramble de) hit the gap; pre-flight ABORTED before any DB or FS side-effect (Surface 3 design working as intended). Production state confirmed unchanged.
- **Why deferred:** taxonomy authoring is substantial work (per-app: `default_subject` + `default_age_range` + `exercise_type_axis_key`; per-axis-key: `slug.<locale>` + `name.<locale>` for tier-1 locales en+de minimum; tier-2 nl+es when those launch; tier-3 sv+fi+no when those launch; tier-4 fr+it+pt+da when those launch — see CLAUDE.md §16.4 / §16.5 for the schema and §19 for the locale tier sequence). Out of Brief B scope; warrants its own brief.
- **Aborted ZIPs preserved:** `/opt/lessoncraftstudio/publish-inbound/.deferred-pending-taxonomy/` (4 ZIPs: bingo-de, crossword-en, pattern-train-en, word-scramble-de). Operator can regenerate from the apps once taxonomy expansion lands, OR re-publish these specific ZIPs once the relevant apps are registered.
- **Phase 4 verification path forward:** substituted with cryptogram + picture-path × en+de (already-registered) for the retry. Retry PASSED — 8/8 ZIPs published cleanly, mixed INSERT (cryptogram + picture-path × en+de) + UPDATE (addition-image-image + sudoku × en+de) coverage achieved.
- **Proposed scope when picked up:**
  - Author taxonomy entries for the remaining 25 apps. Group by exercise-type axis-key (some apps share axes — e.g. `subtraction` likely shares with `addition` under "math operations"; `wordsearch` + `crossword` + `word-scramble` + `word-guess` likely share under "word puzzles" but with sub-axes).
  - Author per-axis-key i18n (`slug.<locale>` + `name.<locale>`) for tier-1 (en + de) at minimum. Tier 2-4 fold in at their respective launches.
  - Per-app `default_age_range` decisions: each app's natural age range from operator/curriculum review.
  - Verify by re-running bulk dry-run on the 25 deferred apps. No collisions expected (fresh slugs); no errors expected once taxonomy lands.
  - Coordinate with Brief B Phase 6 close-out batch since taxonomy schema changes touch §16.4 / §16.5 documentation.

### Legacy `window.downloadPDF` / `window.downloadJPEG` override blocks dead-code across 29 apps

- **Finding:** Each of the 29 in-scope worksheet apps carries a legacy `window.downloadPDF` override block (originally added 2025-10-23 commit `343ee9aad`) and a parallel `window.downloadJPEG` block. Both blocks predate the catalog-export contract introduced at commit `3402e70c` (2026-04-26), which upgraded the local `downloadPDF` to a 3-arg signature `(canvas, baseFilename, opts)` supporting `returnBlob: true`. The override blocks remain at 2-arg signature `(canvas, fileName)` that always calls `pdf.save(fileName)` and returns `undefined`. They are dead code in 28 apps because those apps wrap their script body in a closure (IIFE / DOMContentLoaded handler) so the local closure-scoped `downloadPDF` lexically shadows the `window.downloadPDF` override. Pattern-train was the exception: its main script is at top-level (no closure), so the override clobbered the local function and broke catalog-export. Fixed surgically in pattern-train at commit `be49dae6` (2026-04-29).
- **Originating brief:** parallel bug fix during Brief B Phase 4 close-out — pattern-train symptom report from operator.
- **Why deferred:** the override blocks are dead code in the other 28 apps (closure-shadowed) and harmless. Removing them across all 29 apps is hygiene work, not a bug fix; not justified during active Brief B / social-share-v1 work. The `downloadJPEG` override block is also dead in pattern-train (no `downloadJPEG` function → `originalDownloadJPEG` is null → gate fails) and was left intact at the pattern-train fix per minimum-scope discipline.
- **Proposed scope when picked up:**
  - Sweep all 29 apps in `REFERENCE APPS/` for the `// Override the original downloadPDF function` and `// Override the original downloadJPEG function if it exists` blocks.
  - Confirm each app's local `downloadPDF` already supports the catalog-export `returnBlob: true` contract (per CLAUDE.md §14.3a / §15).
  - Delete both override blocks per app. Single coherent commit (29 files, structurally identical edits).
  - Verify post-commit by exporting from a representative sample (1 closure-wrapped + pattern-train re-test).
  - Optional: file a methodology entry on "dead-code-that-only-shows-as-bugs-when-scoping-changes" — pattern-train was the canary; the same pattern could surface in any future top-level-script app.
- **Trigger condition:** when next substantive cross-29-app sweep is authorized (e.g., a Brief that touches the catalog-export contract OR a hygiene close-out batch). Not standalone-justified.

### ~~Cloudflare proxy-mode investigation — OPERATOR-ACTION-REQUIRED PRE-LAUNCH~~ — RESOLVED-BY-ACTION 2026-04-30

- **Original finding:** Sub-phase 5.8 (2026-04-29) surfaced that production domain was not on Cloudflare; every passive curl returned `server: nginx/1.18.0 (Ubuntu)` directly with no `cf-cache-status`/`cf-ray` headers; CDN curl byte-identical to origin-direct. CLAUDE.md §3.5 contract for Cloudflare CDN was aspirational, not in-path.
- **Resolution (2026-04-30):** operator added `lessoncraftstudio.com` to Cloudflare Free plan; flipped both apex (@) and `www` records to orange-cloud (proxy mode); set SSL/TLS encryption mode to **Full (strict)**; configured AI crawler bot policy to "Do not block (allow crawlers)" preserving §17.4 acquisition-strategy alignment; verified DNSSEC off; updated nameservers at Namecheap from `dns1/dns2.registrar-servers.com` to `selah.ns.cloudflare.com` + `sevki.ns.cloudflare.com`. Browser-test on `https://www.lessoncraftstudio.com/en/decks/cryptogram/` PASSED — page loads with valid HTTPS through Cloudflare edge.
- **Implications now load-bearing:** §15.x Cache-Control `public, max-age=300` contract is no longer inert (was empirically inert when CF absent at 5.8); 5-min edge TTL governs deck.html freshness; viral student traffic is now absorbed by CF edge per §3.5 promise; geographic latency improves for international audience.
- **Verification follow-on (deferred, not blocking):** when bulk-publish next runs, repeat a Sub-phase 5.8-equivalent passive curl to confirm `cf-cache-status: HIT/MISS/EXPIRED` transitions become observable across t=0/60/180/300/360 checkpoints. If observed, fully closes the loop. If not observed, the rule may still be honored but with cache headers stripped — investigate then.
- **CLAUDE.md amendment landing:** Phase 6 Commit 1 (item 8) date-markers the §3.5 amendment so future audits can distinguish pre-2026-04-30 (Cloudflare-absent) vs post-2026-04-30 (Cloudflare-present) infrastructure state.
- **Family:** runtime-hygiene (operational-readiness sub-cohort).

### Dry-run preview of predicted version bumps

- **Finding:** Currently `publish-bulk --dry-run`'s `_summary.txt` does not surface the predicted next-version per deck. Dry-run line shape: `<zip> routed=X deck=Y language=Z slug=S collision=N warnings=N errors=N` — no `version=V` field. Real-mode line shape: `<zip> outcome=PUBLISHED routed=X slug=S version=V`. Operators reviewing dry-run output do not see what version the publish would land at; they see actual versions only after committing to real-mode.
- **Originating brief:** Brief B Phase 5 Sub-phase 5.7 (dry-run-vs-real parity verification, 2026-04-29). Surfaced as Divergence #1 in the parity comparison and accepted by operator as v1 architectural property.
- **Why deferred:** computing predicted next-version requires reading versioned-dir count from `/var/www/lcs-media/decks/<locale>/<slug>-vN/` during the dry-run pipeline, which is contractually pre-FS-placement. Not load-bearing for v1 verification flows (dry-run is correct as a substitution + collision + routing check; version is a downstream FS property). Operator-UX value scales with bulk batch size; revisit when batch volumes justify the addition.
- **Trigger condition:** when bulk batch volume grows beyond ~10 ZIPs per pass AND operator reports wanting version preview before committing to `--confirm` OR when `publish-cli`-feature-batch close-out is authorized.
- **Proposed scope when picked up:**
  - Extend `dryRunOneZip()` (or add a `dryRun()` helper) to read versioned-dir count via `fs.readdirSync('/var/www/lcs-media/decks/' + locale + '/')` filtered by `<slug>-v\d+` regex, max-N+1 = predicted next-version.
  - Surface predicted version in the dry-run `_summary.txt` line: `<zip> routed=X deck=Y language=Z slug=S collision=N warnings=N errors=N predicted_version=N+1`.
  - For new-publish (INSERT-route) decks with no existing versioned dirs, predicted_version=1.
  - Coordinate with the §17.8.5 / §15.2 publish-cli documentation if the field is added (small addition to the bulk-dry-run summary contract).
- **Family:** publish-cli-feature.

### ~~Group A image-source-coverage sweep on apps not yet user-upload-tested~~ — RESOLVED-BY-FACT 2026-04-28

- **Original finding:** eb510be4.3 surfaced a 5th coverage dimension (upload-source-vs-Set-membership linkage loss) in more-less. The concern was that the same UI-mediation-layer-severs-linkage pattern might exist in find-and-count, prepositions, shadow-match, addition, word-scramble, math-worksheet — each has its own selection state architecture.
- **Originating brief:** Brief A 5A.3 eb510be4.3 (commit `25ee48e5`)
- **Resolution (structural, not testing-driven):** the apps not covered by the eb510be4 user-upload helper rollout don't have user-upload code paths to sweep. Only `more-less` exhibited the `Set<path-only>` mediation pattern that severs the upload's `{path, word}` linkage; the other apps' bundle code either consumes image objects directly (preserving `word`/`name` fields) or doesn't take user uploads at all. The eb510be4.2 shared `LCSCatalogExport.vocabKeyFromImage(img)` helper covers the dispatch across all 3 image-source forms (theme path / server-stored upload / data URL upload) and is consumed by all 6 sites that touch image-derived vocab keys (more-less, prepositions, shadow-match, addition, word-scramble, math-worksheet). Per-app code paths verified during Phase 2 (c) of the 2026-04-28 session — all 20 Group A apps + addition deep-test reference have populated sr-only blocks with no skeleton risk surfaced. The dimension exists; the per-app remediations beyond more-less's `_reattachUploadWord` would require apps with the severance pattern, which the static-analysis sweep + Gate 1 runtime verification did not surface.
- **Verification ledger:** 2026-04-28 session Phase 2 (c) static analysis (20 apps) + Phase 3 Gate 1 runtime confirmation on 7-app representative subset (addition, find-and-count, more-less, shadow-match, missing-pieces, chart-count, grid-match) with no console errors / collision-warns / script-tag-ordering warns / t() key-string returns surfaced.
- **If a future bug surfaces a NEW per-app severance pattern:** add a per-app `_reattachUploadWord`-equivalent there, reference more-less's eb510be4.3 implementation as the template, and re-open this entry.

### ~~Deferred-pending-taxonomy locale-mirror gap~~ — RESOLVED-BY-PUBLISH 2026-05-02

- **Original finding:** Phase 4 prep batch produced 1 ZIP per app instead of 2 across the deferred-pending-taxonomy backlog. 4 actual ZIPs published in the unblock pass (2026-05-01, commit `71bfba3a`): bingo-de, crossword-en, pattern-train-en, word-scramble-de. 4 missing locale-mirrors: bingo-en, crossword-de, pattern-train-de, word-scramble-en.
- **Resolution (2026-05-02):** operator generated the 4 missing locale-mirror ZIPs on PC; locale-mirror closure pass published all 4 cleanly through publish-cli (batch `locale-mirror-closure-real`, 0.657s wall-clock; commit folding the Footer + queue updates is the amend-target of this same pass). Per-app en+de coverage now full for the 4 affected apps (bingo, crossword, pattern-train, word-scramble). picture-path remains de-only by separate Phase 5 sealing decision, not a content-completeness gap.
- **Implementation note — bingo-en theme adjudication:** original bingo-en ZIP carried `theme: at_the_supermarket` (unregistered theme axis-key), failing publish-cli substitute step at `__LINK_MORE_THEME__`. Operator regenerated bingo-en with `theme: animals` (registered axis-key) per Option B; dry-run v2 clean. Lesson: theme axis vocabulary should grow with content evolution; future themed-deck generation surfaces unregistered axis-keys as substitute-layer errors before any DB write.
- **Family:** content-completeness.

### ~~publish-cli theme→subject_tags propagation gap~~ — RESOLVED 2026-05-03 (commit `fca9547e`)

- **Resolution:** Phase-3.0 amendment to `scripts/publish-cli/publish.js` derives `subjectTags = [manifest.theme]` (or `[]` when null) at both INSERT (line 198+) and UPDATE (line 177+) paths. Reshape A (forward-fix only; no backfill) per halt-and-surface 2026-05-03: source-ZIP inspection confirmed 12 of 12 legacy empty-`subject_tags` rows have `theme=null` AT ORIGIN — backfill structurally impossible from manifest sources. Legacy rows stay null until natural republish; future themed publishes propagate automatically. §15.13 dry-run-vs-real parity preserved trivially (amendment downstream of staging-artifact production). Slug unit tests 21/21 PASS post-amendment. Phase-3a batch 1 is the first real-mode exercise of the fix.

### ~~publish-cli theme→subject_tags propagation gap~~ — historical entry

- **Finding:** publish-cli ingests `manifest.theme` into the deck.html substitution surface (for `__LINK_MORE_THEME__`) but does NOT write the theme to `Deck.subject_tags` at INSERT time. Topic-page queries filter by `subjectTags: { has: '<theme>' }`, so theme-axis topic pages stay 404 for any themed deck published through current publish-cli, regardless of the manifest having the theme.
- **Originating brief:** locale-mirror gap closure pass (2026-05-02). Discovered when bingo-en (theme=animals) was published: deck.html linked correctly to `/en/topic/animals/` but the topic page returned 404 because the DB row had `subject_tags = {}`. Corpus integrity check then surfaced 3 affected production rows total (bingo-en this pass, plus addition-image-image-en + addition-image-image-de from earlier sessions whose source ZIPs at `/opt/lessoncraftstudio/publish-inbound/` confirmed `theme=animals`). All 11 production decks across 3 sessions had `subject_tags = {}` regardless of manifest.theme value.
- **Stop-gap applied:** single-transaction UPDATE on the 3 affected rows, append-not-replace via PostgreSQL `subject_tags = subject_tags || ARRAY['animals']`, post-UPDATE SELECT verified all 3 rows have `subject_tags = {animals}`. Lit up `/en/topic/animals/` (2 decks) and `/de/topic/tiere/` (1 deck) topic pages.
- **Resolution path when picked up:**
  - Extend publish-cli's INSERT path (likely `scripts/publish-cli/db.js` `insertDeck` + matching update site for edit-in-place via `--update-slug`) to populate `Deck.subject_tags` from `manifest.theme` at INSERT time.
  - Decide append-vs-replace semantics for `metadata.json.operator_tags` if that surface is intended to coexist with theme propagation. CLAUDE.md §15.1 documents `operator_tags` as a metadata.json field; need to determine whether theme is one of multiple tags or the canonical first tag.
  - Verify under Phase 5.7 dry-run-vs-real-publish parity contract: dry-run staging artifacts should show predicted `subject_tags` if manifest.theme is set.
  - Consider whether to also write `Deck.topic_slugs` (currently empty everywhere) — separate question; topic_slugs would carry the per-locale URL-slug form, while subject_tags carries the axis-key form.
  - On feature land, sweep production for any newly-published themed decks that pre-date the fix and might need similar UPDATEs.
- **Trigger condition:** when bulk catalog publishing accelerates AND themed decks become a meaningful share of new content, OR when an operator surfaces "theme topic pages are empty despite themed decks existing" — whichever first.
- **Family:** publish-cli-feature.

### Trailing-slash routing-contract divergence — partially mitigated

- **Finding:** Next.js `trailingSlash: false` config in `frontend/next.config.js` strips trailing slashes from `<Link href>` values when rendering to `<a>`. nginx-served URLs per CLAUDE.md §15.7 (deck routes at `/<locale>/decks/<slug>/`, PDFs, og-images, etc.) require the trailing-slash form — the no-slash form 404s because nginx's location-block doesn't include a no-slash matcher.
- **Originating brief:** locale-mirror gap closure pass diagnostic recon (2026-05-02). Topic-page deck-card click-throughs were 404'ing 100% of the time post-Pass-7b deploy because the topic page used Next.js `<Link>` for deck URLs — Link normalization stripped the trailing slash, nginx 404'd. Latent for ~24-30 hours; not user-facing because no operator-driven traffic to topic pages yet.
- **Code-side mitigation applied (Fix B, commit TBD this pass):** `<Link>` replaced with plain `<a>` for nginx-served URLs in `frontend/app/[locale]/topic/[slug]/page.tsx` (3 instances + Link import removed). Convention now enforced per-component: Next.js `<Link>` is for Next.js-routed paths only (e.g. `/topic/...`, `/`, locale switches); plain `<a>` for nginx-served URLs (e.g. `/decks/...`, PDFs). The `frontend/components/homepage-v2/BreadthGrid.tsx` was already following this convention pre-incident with explanatory comments at lines 13-15; Pass 7b's topic-page implementation didn't propagate the discipline. Audit confirms only the topic page violated; all other deck-URL link sites correct.
- **nginx-side mitigation pending (Fix A — defense-in-depth):** add no-slash → with-slash 301 redirect on the `/<locale>/decks/<slug>` location-block. Would catch any future deck-URL link constructed without a trailing slash (external referrers, copy-pasted links, accidental Link reintroductions). Out-of-tree work per §15.7's nginx convention; operator-coordinated. Not strictly required if Fix B's per-component discipline holds, but cheap insurance.
- **Doctrine-hygiene amendment pending:** CLAUDE.md should formalize the convention: "Next.js `<Link>` for Next.js-routed paths; plain `<a>` for nginx-served URLs." Natural placement in §15.7 (right after "Deck pages ... are served by an nginx location-block, NOT a Next.js handler"). Picked up in a future doctrine-hygiene pass.
- **Resolution path when picked up:**
  - Fix A: nginx config edit on the deck location-block. `location ~ ^/(en|de|...)/decks/([a-z0-9-]+)$ { return 301 /$1/decks/$2/; }`. Test against existing deck URLs to confirm no double-redirect and no regression.
  - Doctrine amendment: add the convention paragraph to CLAUDE.md §15.7, ideally with a concrete example (the topic-page incident as cautionary tale).
  - Optional: ESLint custom rule or convention test to flag `<Link href={"/decks/..."` patterns at PR time.
- **Family:** routing-hygiene.

### Tier 2-4 footer.* + homepage.* MISSING_MESSAGE residual (i18n locale-launch family)

- **Finding:** post-Tier-1 home page revision + DE i18n recovery pass (2026-05-02, commit `a06cd835`), Tier 2-4 locales (es, nl, fr, pt, it, sv, da, no, fi) carry MISSING_MESSAGE for the new home-page i18n surface: ~182 keys per locale × 9 locales = ~1638 build-time MISSING_MESSAGE entries. Includes: 8 distinct flat `footer.*` keys (byLanguage/byTopic/byExerciseType/moreLanguagesSoon/moreTopicsSoon/contact/terms/privacy — `copyright` survives in legacy seller-era nested footer namespace) + the full `homepage.*` editorial-rebuild namespace (meta/hero/breadthGrid/languageProof + .german + .french/freeExperience/subscription/notify).
- **Originating brief:** home page revision + DE i18n recovery pass (commit `a06cd835`). Surfaced as build output at the post-DE-recovery `npx next build` run.
- **Why deferred:** out-of-Tier-1-scope per CLAUDE.md §19 launch sequence. Tier 2 (es, nl) folds in at Tier 2 launch; Tier 3 (sv, fi, no) at Tier 3; Tier 4 (fr, it, da, pt) at Tier 4. Each tier gets its own home-page-i18n authoring window plus per-tier NSR per §17.5 Nordic-NSR posture. Tier 2-4 production /XX/ pages would render raw key strings as text, same broken-state pattern that DE was in pre-Tier-1-recovery — but Tier 2-4 traffic is structurally below Tier 1 launch volume, so the visibility-vs-authoring-cost trade-off favors deferred.
- **Trigger condition:** at each respective tier launch per §19. Each tier's home-page-i18n authoring is roughly the scope of this DE recovery pass (7 sub-namespaces + 9 footer flat keys + meta block). German was in §17.5 higher-Claude-confidence tier; Tier 2 (es, nl) similarly higher-confidence; Tier 3-4 NSR-flagging per Nordic posture + §17.5 stronger-Claude-quality posture for fr/it/pt.
- **Resolution path when picked up:**
  - Per-tier: read EN canonical at the launch moment (it may have evolved post-Tier-1).
  - Author per-tier home page namespace from EN canonical, mirroring the DE recovery pattern (full rewrite, not transformation of any seller-era residue).
  - Restructure each tier's `footer.*` namespace to flat keys matching Footer.tsx consumption. Verify against current Footer.tsx flat-key list at each tier moment (the list may have grown).
  - NSR-flag per §17.5 + project_k3_phrasing_native_speaker_review.md tier posture.
  - Single-commit-single-deploy per tier-launch pass.
- **Family:** i18n locale-launch (Tier 2/3/4 launch-content sub-cohort).

### AgeRange enum retrofit (Deck + Topic)

- **Finding:** CLAUDE.md §8.1 line 414 closing guidance specifies that `Deck` and `Topic` should use a Prisma `enum AgeRange { AGE_3_5 AGE_5_7 AGE_6_8 AGE_7_9 AGE_8_10 }` instead of free-form `String` for `ageRange`. Deck shipped at commit `cmojv4qew0000gxwofgmuudas`-era with `String` (drift from this guidance). Topic commissioned at commit `9ba9fa2d` (catalog-side §8.1 commission pass, 2026-05-02) with `String` for shipped-Deck convention parity.
- **Originating brief:** §8.1 commission pass (2026-05-02). Surfaced at recon as a known §8.1 line 414 closing guidance. Adjudicated SCOPE-OUT for the commission pass to keep Topic.ageRange convention-parallel with shipped Deck.ageRange; both retrofitted together when picked up.
- **Why deferred:** retrofitting requires (a) introducing the enum, (b) ALTER TABLE on `decks` and `topics` to migrate `String` → enum (with a USING clause to coerce existing values), (c) updating all consumer code (publish-cli, topic-decks.ts, etc.) to handle enum types instead of string types. Larger surface than commission-pass scope. §10.3 schema discipline requires explicit operator authorization for ALTER on `decks` (existing table with 16 rows; data migration risk).
- **Trigger condition:** scale event where `String` values cause runtime-bug (e.g., a typo at bulk-publish time produces an unmappable age_range value), OR operator decides type-safety > convention-parity at a doctrine-hygiene window.
- **Resolution path when picked up:**
  - Add `enum AgeRange { AGE_3_5 AGE_5_7 AGE_6_8 AGE_7_9 AGE_8_10 }` to schema.prisma.
  - Author migration: `ALTER TABLE decks ALTER COLUMN age_range TYPE "AgeRange" USING ("age_range"::text)::"AgeRange";` plus the same for `topics`. Pre-migration data audit: confirm all existing values in {3-5, 5-7, 6-8, 7-9, 8-10} (current 16 decks all 5-7/6-8/7-9 per locale-mirror closure pass; 0 topics so trivial).
  - Update consumer code: `frontend/lib/topic-decks.ts` `levelKeyToAgeRanges()`, `scripts/publish-cli/taxonomy.js` `levelFor()`, any TS typing.
  - Verification: build clean + extant-deck row queries return correct enum values.
- **Family:** schema-hygiene (§8.1 doctrine alignment).

### Pillar 3 Tools 3+4 commission (advanced filtering + curriculum mapping)

- **Finding:** docs/SUBSCRIPTION-SCOPE.md Pillar 3 names Tool 3 (advanced personalized filtering) and Tool 4 (curriculum mapping). Neither is in §8.1. The catalog-side commission pass (2026-05-02, commit `9ba9fa2d`) commissioned the §8.1 set (Collection, CollectionDeck, DeckFavorite, EmbedConfig, PlayLink covering Tools 1+2+5+6) but explicitly scoped-OUT Tools 3+4 per H2 adjudication.
- **Originating brief:** catalog-side §8.1 commission pass (2026-05-02). Adjudicated H2 SCOPE-OUT pending SUBSCRIPTION-SCOPE.md open-decision-5 (workspace tooling implementation order) resolution.
- **Why deferred:** Tools 3+4 are net-new model territory beyond §8.1. **UPDATED 2026-05-02 (commit `fbff3466` SUBSCRIPTION-SCOPE.md amendment):** open-decision-5 RESOLVED — sequencing locked at **1 → 2 → 5 → 3 → 4**. Tools 1+2+5 ship at launch against existing schema substrate (commit `9ba9fa2d`); Tools 3+4 sequenced post-launch, each carrying its own schema commission pass.
- **Plausible model shapes when picked up:**
  - **SavedFilter** for Tool 3: `{ id, teacherId, name, filterJson, createdAt, updatedAt }` per-teacher. Persistent filter state.
  - **CurriculumTag + CurriculumTagDeck** for Tool 4: `{ id, teacherId, name, color?, position, createdAt }` + composite-PK join `{ tagId, deckId, position, addedAt @@id([tagId, deckId]) }` for the per-teacher folksonomy.
- **Trigger condition (updated 2026-05-02):** sequencing-blocker now RESOLVED. Pass executes when implementation cadence reaches Tool 3 (post-Tools-1+2+5 launch). Tool 3 first (per locked order); Tool 4 follows. Each carries its own schema commission pass; no inter-tool dependency at the schema layer.
- **Resolution path when picked up:** schema-only commission pass (mirrors §8.1 commission pattern); CREATE-only; per-tool migration cadence acceptable.
- **Family:** subscription-features (Pillar 3 differentiator-tools sub-cohort).

### Pillar 2 Bundle commission

- **Finding:** docs/SUBSCRIPTION-SCOPE.md Pillar 2 names themed bundles ("Halloween bundle," "first-week bundle," "Numbers 1-20 in German bundle"). §8.1 silent on a Bundle model. The catalog-side commission pass (2026-05-02, commit `9ba9fa2d`) explicitly scoped-OUT per H3 adjudication.
- **Originating brief:** catalog-side §8.1 commission pass (2026-05-02). Adjudicated H3 SCOPE-OUT pending SUBSCRIPTION-SCOPE.md open-decision-4 (bundle pricing structure).
- **Why deferred:** Bundle model shape depends on open-decision-4 resolution. **UPDATED 2026-05-02 (commit `fbff3466` SUBSCRIPTION-SCOPE.md amendment):** open-decision-4 RESOLVED — **all-in-subscription**. Bundle model is **content-record-only**, no commerce fields. Per the now-locked Pillar 2 spec: `Bundle { slug @id, title Json, theme String, locale String, deckIds String[], lessonPlanRef String?, thumbnailUrl String, createdAt, updatedAt, @@index([theme, locale]) }`. No `priceUsd`, no `variantId`, no `isPremium` flag, no Purchase model resurrection. Entitlement is purely "user has active LCS subscription" via the existing Subscription table.
- **Trigger condition (updated 2026-05-02):** pricing-blocker now RESOLVED. Pass executes when implementation cadence reaches Pillar 2 content authoring — coordinates with the launch-readiness threshold (7 bundles per locale × en+de Tier 1 = 14 bundles total per the locked launch list). Schema commission can land before content authoring begins (or fold into a single brief that does both); operator's call.
- **Resolution path when picked up:** schema commission pass (1 table: Bundle; per-locale rows; deckIds as String[] mirrors the existing topic_slugs pattern on Deck rather than a join table — simpler shape now that bundle pricing is locked all-in-subscription); CREATE-only; single-migration cadence.
- **Family:** subscription-features (Pillar 2 themed-bundles sub-cohort).

### isLcsSubscriptionActive grace-period extension (HAS-1)

- **Finding:** `lib/subscription-helpers.ts` `isLcsSubscriptionActive` predicate gates strictly on `status === 'active' && lsSubscriptionId !== null`. Does NOT honor the 60-day grace period documented in CLAUDE.md §7 + docs/SUBSCRIPTION-SCOPE.md (subscriber features should remain accessible until `User.gracePeriodEndsAt` elapses).
- **Originating brief:** Pillar 3 Tool 1 (Collections) recon (2026-05-02, commit `53519e0c`). Surfaced as HAS-1 at recon. Tool 1A inherits the existing predicate; HAS-1 was explicitly NOT folded into Tool 1A commission per scope discipline.
- **Why deferred:** the grace-period semantics aren't relevant until production has live LCS subscribers in lapse state. Current production state: 41 subscriptions in DB, 0 of those with status=`past_due` AND lsSubscriptionId set (per Subscription model + LS webhook population pattern). Pre-launch the predicate's strict gate is correct; post-launch when subscribers start lapsing, the grace-period semantics matter.
- **Trigger condition:** first subscriber lapse event in production (LS webhook `subscription_payment_failed` or similar populates `User.gracePeriodEndsAt`), OR doctrine-hygiene window decides to land the predicate ahead of need.
- **Resolution path when picked up:**
  - Extend `isLcsSubscriptionActive` to accept the `User.gracePeriodEndsAt` field. Caller updates: `isLcsSubscriptionActive(user)` keeps signature; caller now passes user with subscription + gracePeriodEndsAt.
  - New predicate: `(status === 'active' || (gracePeriodEndsAt && gracePeriodEndsAt > new Date())) && lsSubscriptionId !== null`.
  - All Tool 1A consumers (subscriber-API gate + Navigation + page-level gate-render + AddToCollectionButton) inherit the updated predicate automatically — no consumer-site code changes needed.
  - Tools 2/5/3/4 + Pillar 1/2 commissions inherit similarly.
- **Family:** subscription-mechanics.

### Post-Tool-1 doctrine codification (HAS-3)

- **Finding:** Tool 1A commission established the subscriber-API gate pattern (`lib/subscriber-api-gate.ts`: Bearer + session + isLcsSubscriptionActive + ownership-check; 401/403/404 semantics). All future subscriber-only API routes (Tools 2/5/3/4 + Pillar 1 lesson-plan content + Pillar 2 bundle access) inherit this pattern. CLAUDE.md doctrine doesn't yet codify it.
- **Originating brief:** Pillar 3 Tool 1 (Collections) recon (2026-05-02, commit `53519e0c`). Surfaced as HAS-3 at recon.
- **Why deferred:** doctrine-hygiene; doesn't gate Tool 1A or any subsequent commission. Each subsequent commission can cite Tool 1A's `lib/subscriber-api-gate.ts` directly until the doctrine amendment lands.
- **Trigger condition:** any next doctrine-hygiene window OR when a subsequent commission pass surfaces ambiguity that the doctrine codification would resolve.
- **Resolution path when picked up:**
  - Amend CLAUDE.md (best location: §7 paid-tier paragraph or §A.6 LS conventions; possibly a new §8.x sub-section on subscriber-API conventions).
  - Codify the gate pattern: Bearer auth + session lookup + `isLcsSubscriptionActive` predicate + ownership-check helper for row-scoped routes; 401/403/404 semantics; reference `lib/subscriber-api-gate.ts` as canonical.
  - Cross-reference from Pillar 1 + Pillar 2 + Pillar 3 sections of docs/SUBSCRIPTION-SCOPE.md as the inheritance baseline.
- **Family:** doctrine-hygiene.

### Pillar 3 Tool 1B — Collection deck reorder

- **Finding:** Tool 1A shipped Collections (sans reorder). PATCH /api/collections/:id/decks/:deckId omitted per Q-g (drag-and-drop / arrows / position-input UX adjudicated as deferred). New decks added via POST `/api/collections/:id/decks` auto-position max+1; gap-after-delete accepted (no renormalization).
- **Originating brief:** Pillar 3 Tool 1 (Collections) recon (2026-05-02, commit `53519e0c`). Q-g adjudication: REORDER DEFERRED.
- **Why deferred:** UX-mechanic-call (drag-and-drop vs arrows vs position-input vs no-reorder); Tool 1A's append-only ordinal model is functional without reorder. Operator chose to ship without it and gather feedback.
- **Trigger condition:** when implementation cadence reaches Tool 1B (after Tool 2 ships, or sooner if operator prioritizes reorder), OR when teacher feedback explicitly requests it.
- **Resolution path when picked up:**
  - Author PATCH /api/collections/[id]/decks/[deckId] route — body `{ position: number }`; ownership check on collection; update CollectionDeck.position + reflow neighbors as needed (or accept gaps + reorder-to-precise-position pattern).
  - Add reorder UI on /[locale]/collections/[id]/CollectionDetailClient.tsx — recommend up/down arrows (Q-g Option II) for simplicity; drag-and-drop (Option I) if the operator prefers + budget permits.
  - Add en+de i18n strings: `collections.detail.moveUp`, `collections.detail.moveDown`, `collections.detail.reorder` etc.
  - Single-commit pass; schema unchanged.
- **Family:** subscription-features (Pillar 3 Tool 1 v1+1).

### Pillar 3 Tool 2B — Workspace Favorites surface

- **Finding:** Tool 2A shipped Workspace home with Collections widget + Recent Activity widget; Favorites surface deliberately scoped-OUT per Q-j Option II adjudication. WorkspaceClient.tsx reserves an empty layout slot (commented placeholder, no rendered DOM) at the position the FavoritesWidget will land.
- **Originating brief:** Pillar 3 Tool 2A commission (2026-05-03, commit `256c6241`). Q-j adjudication: FAVORITES DEFERRED to follow-on.
- **Why deferred:** keeps Tool 2A scope to single-commit-single-deploy. Favorites needs its own affordances (FavoriteToggleButton on deck cards, /api/favorites POST + DELETE routes, DeckFavorite Prisma reads), and merging it into Tool 2A would balloon the commission past the §9 boundary.
- **Trigger condition:** when implementation cadence reaches Tool 2B, OR when subscriber teachers request a "save without organizing" affordance distinct from collections.
- **Resolution path when picked up:**
  - POST /api/favorites + DELETE /api/favorites/[deckId] routes; subscriber gate via lib/subscriber-api-gate.ts.
  - FavoriteToggleButton component (parallel to AddToCollectionButton); render on deck cards in /catalog + /[locale]/decks/[slug] surfaces.
  - FavoritesWidget component into Tool 2A's reserved slot in WorkspaceClient.tsx.
  - Extend /api/workspace endpoint with a fourth source: DeckFavorite.favoritedAt → 'favorited' activity-type in recent-activity feed.
  - en+de i18n strings: workspace.favorites.* + activityType.favorited.
  - Single-commit pass; schema unchanged (DeckFavorite already shipped at `9ba9fa2d`).
- **Family:** subscription-features (Pillar 3 Tool 2 v1+1).

### deploy.sh Prisma Client regeneration wart (ops-hygiene family)

- **Finding:** deploy.sh runs `npm ci` (which wipes node_modules) followed by `next build` without an intervening `npx prisma generate` step. When the Prisma schema has been amended in the deployed commit, `next build` fails with "Property 'X' does not exist on type 'PrismaClient'" because the regenerated node_modules ships the stale Prisma Client baseline, not the one current with the schema. Recovery: SSH in, `cd /opt/lessoncraftstudio/frontend && npx prisma generate`, re-run deploy.sh.
- **Originating brief:** Pillar 3 Tool 1A commission (2026-05-02, first encounter — 9-table catalog substrate had just shipped at `9ba9fa2d`); did NOT recur at Tool 2A commission (2026-05-03, commit `256c6241`) because Tool 2A added zero schema changes. Recurrence trigger is schema-amendment commits, not all commits.
- **Why deferred:** ops-hygiene refactor; doesn't block any feature work. The recovery is mechanical and well-understood (one extra command).
- **Trigger condition:** any future schema-amendment commit deploys, OR operator decides to prophylactically harden deploy.sh during a quiet operations window.
- **Resolution path when picked up:**
  - Option A (preferred — surgical): amend `/opt/lessoncraftstudio/deploy.sh` to insert `cd /opt/lessoncraftstudio/frontend && npx prisma generate` between the `npm ci` and `npx next build` steps. Idempotent on no-schema-change commits; required on schema-change commits.
  - Option B: add `"postinstall": "prisma generate"` to frontend/package.json's scripts. npm runs postinstall automatically after `npm ci`. Repository-side fix; deploy.sh stays unchanged. More portable but couples Prisma generate to all install operations (CI, local, etc.) — usually a feature, not a drawback.
  - Either option zero-risk; pick whichever the operator prefers when the wart re-surfaces.
- **Family:** ops-hygiene.

### Pillar 3 Tool 5B — Bulk PDF-pack export (ZIP)

- **Finding:** Tool 5A shipped bulk add/remove + bulk share-link-batch + per-card single-deck Share affordance. PDF-pack export (HAS-Tool-5-2) was deliberately excluded because the codebase has no zip library in `package.json` (`archiver`, `jszip`, `adm-zip`, `yazl` all absent) and §10.3 requires explicit operator approval for new direct dependencies.
- **Originating brief:** Pillar 3 Tool 5A commission (2026-05-03, commit `a2829d88`). Q-p adjudication: PDF-pack EXCLUDED from Tool 5A; opener of Tool 5B is the zip-lib approval gate.
- **Why deferred:** new-dependency approval cycle.
- **Trigger condition:** operator approves a zip library (recommend `jszip` for simplicity, ~100 KB; `archiver` for streaming if pack sizes are expected to be large).
- **Resolution path when picked up:**
  - `npm install jszip` (or chosen alternative) per operator approval.
  - Author `POST /api/decks/bulk-export` route. Body `{ deckIds: string[], format?: 'zip' }`. Reads `/var/www/lcs-media/decks/<locale>/<slug>/printable.pdf` per the design-elements filesystem precedent. Streams `application/zip` per the `/api/admin/backup/export` precedent. Subscriber gate. Filter `where: { status: 'published' }`. Skip decks without printable.pdf gracefully.
  - Add 4th `BulkAction` value (`'exportPdfPack'`) + `bulk.action.exportPdfPack` i18n string + en+de Tier 1 + integrate into both BulkSelectToolbar action sets (topic page + collection-detail).
  - Single-commit pass; schema unchanged.
- **Family:** subscription-features (Pillar 3 Tool 5 v1+1).

### PlayLink @@unique([teacherId, deckId]) DB-constraint hardening

- **Finding:** Tool 5A enforces idempotency at the application layer (return-existing-for-(teacher, deck) lookup before create) per Q-t Option B adjudication. Schema lacks a `@@unique([teacherId, deckId])` constraint on `PlayLink` (only `linkId @unique` exists), so concurrent first-share calls from the same subscriber can race and create two PlayLink rows for the same (teacher, deck) — both valid linkIds, both functional, just a small data-hygiene wart.
- **Originating brief:** Pillar 3 Tool 5A commission (2026-05-03, commit `a2829d88`). HAS-Tool-5-1 sub-question idempotency: Q-t Option B locked at app-layer; DB constraint deferred.
- **Why deferred:** strict §10.3 territory — adding a unique constraint to an existing table requires DDL. Operator decision at amendment time. Race conditions are vanishingly rare for K-3 teachers (single-user contention is structurally low) and acceptable v1 behavior.
- **Trigger condition:** any next doctrine-hygiene window OR if app-layer idempotency proves insufficient (race-condition-induced duplicates become measurable in production via PlayLink row count audit).
- **Resolution path when picked up:**
  - Audit production for existing duplicate (teacherId, deckId) PlayLink rows; pre-deduplicate if any exist (keep the oldest by createdAt; delete the rest — no breakage since subscriber feed reads at most one).
  - Add `@@unique([teacherId, deckId])` to `PlayLink` model in `prisma/schema.prisma`.
  - Generate migration; deploy.
  - Optional hardening: change app-layer idempotency from "find-then-create" to "create-with-skipDuplicates-then-fetch-existing" — eliminates the race window entirely.
- **Family:** doctrine-hygiene.

### Activity-feed bulk-emission collapse

- **Finding:** Tool 5A bulk operations emit N near-simultaneous activity rows (8 bulk-add → 8 'collected' entries + 1 'modified' entry; 8 bulk-share → 8 'shared' entries) consumed by Tool 2A's recent-activity feed at /api/workspace. Per Q-s Option II, entries render uncollapsed at v1 — RECENT_LIMIT=10 can be exhausted by a single bulk operation, dropping unrelated recent activity.
- **Originating brief:** Pillar 3 Tool 5A commission (2026-05-03, commit `a2829d88`). Q-s adjudication: don't collapse at v1.
- **Why deferred:** UX-call deferred until subscriber feedback signals the bulk-emission feed-flood is annoying OR Pillar 1 / Pillar 2 content launches generate competing activity types that compete for the same RECENT_LIMIT real-estate.
- **Trigger condition:** subscriber feedback OR additional activity types added (Tool 2B Favorites surface introduces 'favorited'; Pillar 1 lesson-plan surface may introduce 'lesson-plan-viewed' or similar).
- **Resolution path when picked up:**
  - Extend `/api/workspace` query at `frontend/app/api/workspace/route.ts:25–117` with group-by-collection-and-time-window logic for CollectionDeck.addedAt rows: collapse near-simultaneous (within ~5 seconds) (collectionId, addedAt) groups into single `'bulk-collected'` activity-type entries with a `count` field.
  - Same treatment for PlayLink.createdAt → `'bulk-shared'` when ≥3 entries within ~5 seconds.
  - Update `RecentActivityWidget.tsx` to render the collapsed activity types ("Added 8 decks to {collection}", "Shared 8 decks").
  - en+de i18n strings.
  - No schema change.
- **Family:** subscription-features.

### Apps-side generator emission gap (W-2 reclassification)

- **Finding:** 13 of 15 production deck rows have `exercise_mode=null` because their source manifests carry `exercise_mode=null` AT ORIGIN. publish-cli is wired correctly (publish.js:181 UPDATE + publish.js:203 INSERT both pass `manifest.exercise_mode` to `db.{updateDeck,insertDeck}` unchanged) — the propagation gap is upstream of publish-cli, in the apps' generation.json emission path. Same shape applies to `manifest.theme` for the 12 affected rows (12 source ZIPs have `theme=null` at origin per Phase-3.0 halt-and-surface 2026-05-03 verification).
- **Originating brief:** Phase-3.0 commission halt-and-surface (2026-05-03, commit `fca9547e`). Originally framed as W-2 publish-cli propagation gap during Phase-3 recon; halt-and-surface verification across all 15 source ZIPs revealed the gap lives at the apps' generators, not publish-cli. Phase-3.0 forward-fix amendment to publish.js closed the publish-cli `subjectTags: []` hardcode (W-1) but cannot close the upstream emission gap.
- **Why deferred:** apps-side fix scope. Each of the 29 §14.10 catalog-eligible apps' `extractDeckBundle()` + ZIP-emission path needs to emit `theme` + `exercise_mode` in the generated `manifest.json`. This is operator-side tooling per §3.2 doctrine ("apps' generation algorithms are extended, not rewritten") — touching 29 apps' generation logic is an arc, not a single pass.
- **Trigger condition:** when Phase-3a batch 1 authoring surfaces operator workflow burden of remembering to populate `manifest.theme` + `manifest.exercise_mode` by hand pre-ZIP-emission, OR if topic-page completeness depends on `exercise_mode` populated (currently `exercise_mode` doesn't drive any teacher-facing rendering — `subject_tags` does, via the theme axis-key filter).
- **Resolution path when picked up:**
  - Audit each of the 29 apps' bundle-emission code path (the file each app calls to produce the ZIP at "Export to catalog" time per §15.2).
  - Where the app already knows the theme (image-pool selection driven by a theme dropdown), have the bundle-emit step write `manifest.theme = <selected-theme>`.
  - Where the app already knows the exercise_mode (mode dropdown — see addition's `image-image` / future apps' alternatives), have the bundle-emit step write `manifest.exercise_mode = <selected-mode>`.
  - Per-app PR'd as small surgical edits; no §14 runtime-family changes; no new dependencies.
  - Verify cumulatively: a fresh ZIP from each amended app shows non-null `theme` + `exercise_mode` in its manifest.json before publish-cli runs.
- **Family:** content-pipeline / apps-side-emission.

### "Arbeitsblatt-Generatoren" residual seller-era hardcoded strings

- **Finding:** Surfaced during Tier 2 i18n Track A pre-flight audit. The string "33 Arbeitsblatt-Generatoren" (and locale variants) was hardcoded in `frontend/lib/schema-generator.ts` ternaries at `generateAppListSchema` + `generateToolsCollectionSchema`. Track A dropped both functions (0 frontend consumers; both carried the hardcode + 11-locale ternary). Audit also surfaced 3 more sites where similar 33-app / "Arbeitsblatt-Generatoren" / "Werkblad Generatoren" / "Worksheet Generators" hardcoded copy may persist in seller-era residual code: `frontend/emails/welcome-email.tsx`, `frontend/components/admin/homepage-content-manager.ts`, `frontend/app/[locale]/[...slug]/page.tsx`. Not verified at Track A scope; flagged for dedicated teardown-cleanup pass.
- **Originating brief:** Tier 2 i18n Track A (commit `cbabd7e5`, 2026-05-02). Operator authorized as bonus deferred-queue entry: "file the broader 'Arbeitsblatt-Generatoren' residuals you surfaced (welcome-email.tsx, homepage-content-manager.ts, [...slug]/page.tsx) as a deferred-queue entry. Not Track A scope, but worth a dedicated teardown-cleanup pass after Tier 2 lands."
- **Why deferred:** Track A scope was structural extension only (TOPIC_LOCALES + topics-taxonomy.json + Footer comment + auth/register + bundled audit-confirmed deletions). The 3 candidate files are all post-pivot residuals that survived the 9-pass seller-era teardown (`v1-teardown-complete`, commit `79268e49`). Not load-bearing — these surfaces don't appear in any current-arc data path — but they carry stale "33 worksheet generators" / "Arbeitsblatt-Generatoren" copy that's pivot-incoherent.
- **Trigger condition:** after Tier 2 Track C ships (per-locale catalog rollout begins) and before Tier 3 launch (sv/fi/no), so that any Tier 2 i18n authoring is consistent with the post-cleanup hardcoded copy. Or earlier if surfaces during a separate teardown sweep.
- **Resolution path when picked up:**
  - Audit each of the 3 sites: confirm consumer set; determine if the file itself is dead code or an active surface.
  - For dead code: drop entire file. For active surface: replace hardcoded "Arbeitsblatt-Generatoren" / "Worksheet Generators" copy with locale-aware key reads from messages files (or remove the references if not applicable to post-pivot positioning).
  - Cross-check with broader teardown: any other post-pivot residual files inheriting from the same `generateAppListSchema` / `generateToolsCollectionSchema` data shape.
  - Single commit; sweep-scope teardown-style.
- **Family:** seller-era teardown residuals / pivot incoherence.

### Cross-locale footer.tagline add (en + de + es)

- **Finding:** Tier 2 Track B Wave 1 (es) draft (`TIER2-WAVE1-ES-DRAFT-v1.md`) proposed `footer.tagline = "Hojas de trabajo en 11 lenguas, hechas para aulas bilingües."` Key does NOT exist in en.json or de.json. Adding only to es.json would create cross-locale inconsistency (the Footer would render an extra subline in ES not present in EN/DE).
- **Originating brief:** Tier 2 Track B Wave 1 (commit `4e61c24d`, 2026-05-03). Operator HALT POINT 1 adjudication: "If the tagline is worth adding, that's a separate cross-locale Footer pass that would touch en + de + es in one commit with proper review. Folding it into Wave 1 would expand scope and create the kind of unilateral cross-locale change that should go through its own adjudication. Drop. File for deferred queue if anyone wants to pursue it later."
- **Why deferred:** cross-locale design decision; expanding Wave 1 to add a new Footer key across en + de + es violates Wave 1 scope discipline (closing es debt against existing surface, not re-authoring the surface).
- **Trigger condition:** if/when a future Footer redesign pass surfaces a need for the tagline subline (e.g., empty-state visual when Footer columns are short), OR if operator decides cross-locale Footer extension is worth a dedicated commit.
- **Resolution path when picked up:**
  - Author tagline copy in en + de + es (en canonical first; de + es per Tier 1+2 native authoring patterns)
  - Add `<p>` slot in `Footer.tsx` between language column and brand strip (visual placement TBD by design)
  - Single commit; cross-locale; en + de + es synchronized
- **Family:** cross-locale Footer extension.

### Footer copyright extension (en + de + es "Hecho para docentes." / "Made for teachers." / "Für Lehrkräfte." subline)

- **Finding:** Same Track B Wave 1 draft proposed extending `footer.copyright` to "© 2026 LessonCraftStudio. Hecho para docentes." Same cross-locale problem as tagline — extending only ES creates en/de/es divergence.
- **Originating brief:** Same as tagline (Track B Wave 1, `4e61c24d`).
- **Why deferred:** same scope-discipline reasoning. Operator confirmed strip extension at HALT POINT 1.
- **Trigger condition:** if/when a Footer redesign pass adds a "Made for teachers" tagline either as part of `copyright` extension OR as a new key.
- **Resolution path:** if pursued alongside the tagline above, can be the same commit; otherwise standalone copyright extension across en + de + es.
- **Family:** cross-locale Footer extension (same as tagline above).

### Drop dashboard.* keys from remaining 9 locales (es / nl / fr / it / pt / sv / da / no / fi)

- **Finding:** Tier 2 i18n Track A dropped `dashboard.*` namespace from `en.json` + `de.json` (per audit: 0 consumers in frontend codebase). The same namespace persists in 9 other locale messages files (es / nl / fr / it / pt / sv / da / no / fi each carry the orphan namespace). Track A scope was en+de drop only.
- **Originating brief:** Tier 2 i18n Track A (commit `cbabd7e5`, 2026-05-02).
- **Why deferred:** Track A scoped to en+de drop. Expanding to all 11 locales adds 9× the work without changing behavior (the namespace is already 0-consumer across all locales; deleting from en+de proves the pattern, deleting from 9 others is mechanical cleanup that batches separately).
- **Trigger condition:** post-Tier-2-launch hygiene pass. Not blocking any current arc.
- **Resolution path when picked up:**
  - Inline Node script: `for(const loc of ['es','nl','fr','it','pt','sv','da','no','fi']){const p='frontend/messages/'+loc+'.json';const j=JSON.parse(fs.readFileSync(p));delete j.dashboard;fs.writeFileSync(p, JSON.stringify(j,null,2)+'\n');}` — same pattern as Track A's en+de drop.
  - Single commit; 9-file delete; no behavioral change.
- **Family:** i18n-cleanup.

### [CHORE][DATA] Investigate clause-a plan-count drift between DB and on-disk substrate

- **Finding:** CLAUDE.md §13 + the [RECON+BUILD][LESSON-PLANS] Arc 1 commission directive both cite "29/156 text plans shipped" — meaning 29 LessonPlan rows seeded to production DB. The Phase 1 substrate audit (commit `faf4b5ee`, `docs/lesson-plans/existing-plan-substrate.md` §1) found only 14 drafts on disk at `lesson-plan-drafts/`: 7 EN + 2 DE + 5 ES + 0 NL.
- **Originating brief:** [RECON+BUILD][LESSON-PLANS] Arc 1 Phase 1 substrate audit (commit `faf4b5ee`, 2026-05-06).
- **Why deferred:** Touching schema/data drift mid-feature-arc risks silent regressions in surfaces that already work. Resolution requires independent recon (which substrate is canonical?) before any fix; that recon is its own commission shape. Phase 2's TeachingPackage table is sibling-shape and doesn't depend on legacy plan-count integrity.
- **Three possible explanations:** (a) additional plans seeded to DB pre-Phase-1c-apply but `.md` source drafts removed; (b) docs drift in §13 / commission overstating ship-state; (c) plans for non-en+de+es+nl locales shipped via a different path that didn't land in `lesson-plan-drafts/`.
- **Trigger condition:** when teaching-package architecture stabilizes and operator wants legacy plans cleanly accounted for, OR when an Arc N+ commission needs to extend / supersede specific legacy plans and finds the DB-vs-disk mismatch surface.
- **Resolution path when picked up:**
  - Run `SELECT topicSlug, language, COUNT(*) FROM lesson_plans GROUP BY topicSlug, language` against production DB.
  - Reconcile against on-disk drafts; decide canonical-source per locale (DB or disk).
  - Recover or re-author missing drafts if DB is canonical, OR drop DB rows + amend §13 if disk is canonical.
  - Document outcome; amend CLAUDE.md §13 if the cited count needs correcting.
- **Family:** lesson-plan-substrate.
