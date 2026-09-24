# nt20-VAR: 5 variations × 20 worksheet types × 11 locales (100 variations/locale ≈ 1,100 decks) — the fan-out toward 1000+ clicks/day

## EXECUTION PROGRESS (live)
- ✅ Phase 0-1: byte-identity harness (126 coords), ALL base edits additive+proven inert; new primitives (spiral/eight strokes, strokeGlyphPairLane, sym-grid axis:'h'); commit dd6b1692.
- ✅ Phase 2-3: 92 specs (87 generated + 5 hand M-items), 88 waves, EN data (+12 words, +5 passages, +8 figures = 24 total, symmetry pages figure-disjoint).
- ✅ Phase 4: EN 100/100 QA-green; 3-agent visual critic (100 PNGs) → fixed: G1-241 overflow (compact-3 layout), maze animal-instruction, K-243 unordered dedup, K-264 ghost grid 2×2, G1-235 true quarter past/to (minutes [15,45]), single-op column instructions, G1-228 coin sizes, G1-227 write cards, symmetry disjoint sets + snowman/rocket swap. Personally Read: K-246/K-253/G1-227/G1-232/G2-268/G3-369/K-264/G2-265/de-K257/fi-G1213.
- ✅ Phase 5: ALL 10 locale panels done + applied + lint-locale 0/0 ×11. Sign rulings: mul '·' de/sv/da/no/fi else '×'; div '/' sv (÷ = historic Swedish MINUS — panel catch), ':' de/it/nl/da/no/fi, '÷' en/fr/es/pt. fi: 37 animal partitives (fananim-fi enabled). Commits 3d83cffb + b391ddc9.
- ✅ Phase 6 generation: 1,100/1,100 across all 11 locales, 0 QA failures after wordy-locale fixes (G1-241 compact-3, G1-227 chips, G2-254 long-story font step) + desc-band scan 0 out-of-band (bandedDescription middlesFallback fix, 16ef0e6c).
- ✅ Phase 7 PUBLISHED 2026-09-01: dry-run ok=100×11 (0 collisions/halts) → confirm ×11 → DB verified 1,100 → OG ok (full-catalog overrun: retrofit flags need --slugs-file= EQUALS syntax) → hreflang 1135 groups, 0 failures → audit 1,100/1,100 clean ×11 (needs --slugs-file= + BARE slugs, else OOM) → deploy EXIT=0 + IndexNow → live spot-checks 200 with correct native titles.
- ✅ Phase 8: tier-1 landings 26×11 = 286 (gen-var-landings.js; panels ×11; gate PASS ×11, 0 dup-titles; 286/286 deck links 200) → commit c6d1242c → deploy EXIT=0 → repoint 33 slugs/locale → landings live ×11, canonicals repointed. Tier-2 (74 faces/locale) = click-data-gated follow-up. Memory closeout written.
## 🏁 Decks + tier-1 complete 2026-09-01. → REOPENED by operator: "All the variations should be on /en/worksheets."

# PHASE 9 (ACTIVE): FULL variation visibility on /worksheets — tier-2 landings (73/locale = 803) + grouped hub strip

## PHASE 9 STATE (post rate-limit interruption, resuming)
- ✅ Composer extended: gen-var-landings.js ALL_TYPES (26 tier-1 + 73 TIER2 incl. @theme fan keys, K-264 collapseSiblings); themed slug derivation verified against MEASURED published slugs (pre-writing-animals-k244, cutting-practice-vehicles-k240, mazes-fruits-k270, word-problems-fruits-g1238, measurement-vehicles-g2261…); tier-1 re-apply idempotent; dry-run prints per-entry derivations.
- ✅ Hub strip v2 built: gen-var-highlights.js emits NEW_WORKSHEET_GROUPS (20 family cards + variation slug lists, resolved by canonicalDeckSlug, missing slugs omitted ⇒ safe to re-run any time); page.tsx renders card + variation CHIPS; tsc clean. Config currently holds 46 links/locale (20 bases + 26 tier-1) — regenerate AFTER tier-2 applies.
- ✅ Tier-2 brief written (var2-landing-brief.md; passes A=23, B=25, C=25 keys).
- ⚠ Wave A (11 panels) hit the session rate limit: files WRITTEN for de/es/it/pt/sv (validate + apply); MISSING for en/fr/nl/da/no/fi (resume those agents via SendMessage — transcripts intact — or relaunch fresh).
- NEXT: (1) validate+apply the 5 surviving A files; (2) resume/relaunch A for en/fr/nl/da/no/fi; (3) Pass B ×11 then Pass C ×11 in waves of ≤6 to shrink rate-limit blast radius; (4) apply per pass per locale; (5) after C: gate.js ×11, curl-sweep all new deck links, `node scripts/seo-landing/gen-var-highlights.js`, tsc, commit, deploy (EXIT capture), repoint ALL batch families ×11, live-verify /en/worksheets page 1 contains every batch landing link (origin + cache-busted edge).

## Context
The /worksheets hub renders the LANDING tier. Only 26 of the ~100 variations per locale got tier-1 landings; the other 74 exist only as deck pages + topic-hub grid entries — invisible on /worksheets. Operator overrules the click-data-gated tier-2 deferral: EVERY variation must be findable on the main worksheets page. Two gaps to close:
1. **74 variations/locale have no landing** → build tier-2 landings for all of them.
2. **Even WITH landings, single-entry family buckets sort to hub pages 2-3** (variety sort = bucket-size-desc) → upgrade the "New worksheets" strip so every batch landing is linked from hub page 1.

## Tier-2 landing set (74/locale; completes 100% variation coverage)
- The 66 remaining authored ids: K-244..248 (pre-writing strokes), K-259..263 (sight-word sets), K-264 (two-group cut&paste — ONE landing, canonical=animals deck + vehicles deck as collapseSiblings), K-265/267/268/269 (color-by-code faces), K-270/271/272 (maze sizes), K-273..277 (number bonds), G1-214..218 (mental math), G1-219..222 (fact families), G1-223..227 (number words), G1-228..232 (money), G1-233..237 (clock), G1-238..241 (word problems), G2-255..259 (no-regroup columns), G2-260..263 (measuring), G2-264..267 (symmetry), G3-369 (×÷ families).
- 8 theme-fan landings: K-240 × vehicles/fruits/toys (3), K-242 × animals/fruits (2), G1-213 × animals (1), G2-252 × animals (1), K-264 counted above → 7 themed + K-264 = 8 rows covering the 9 fan decks. Themed rows carry coordinate.theme + the theme word in slug/title/p1 (fan decks' slugs = famSlug-themeSlug-id).
- **Composer:** extend `scripts/seo-landing/gen-var-landings.js` with a TIER2 map (id → family/theme/band/standard; themed rows derive canonicalDeckSlug with the theme segment; K-264 gets collapseSiblings). Same validation (≥200-word bodies, 120-175 meta, slug uniqueness vs corpus, ASCII kebab).
- **Panels:** 11 locales × 74 bodies. One panel pass per locale is too big for one agent — split into 3 passes/locale (~25 ids each; brief defines the exact id splits): pass A = pre-writing + sight-words + cut&paste fans + mazes (K-244..248, K-259..264, K-240×3, K-242×2, K-270..272 ≈ 22); pass B = color-by-code + bonds + mental math + fact families (K-265..277 minus 266, G1-214..222, G3-369 ≈ 23); pass C = number words + money + clock + word problems + columns + measuring + symmetry (G1-223..241 minus fruits-tier1?, G2-255..267, G1-213/G2-252 fans ≈ 29). Panels write `.landing-var2<pass>-<loc>.json`; same similarity discipline (angle rotation within families, exact-face p1 first sentence, ladder cross-links).
- Gate `scripts/seo-landing/gate.js` per locale after apply (locked thresholds; bounce failures to panels). All canonicalDeckSlugs curl-verified 200 pre-commit.

## Grouped hub strip (all batch landings on /worksheets page 1)
- Regenerate `frontend/config/worksheets-new-highlights.ts` as v2: per locale, 20 family GROUPS `{ base: <base-landing-slug>, variations: [<landing slugs in curriculum order>] }` (variations include tier-1 + tier-2 + theme-fan landings of that family; generated from the landing corpora by a small tool, tools/gen-var-highlights.js class).
- `frontend/app/[locale]/worksheets/page.tsx` strip render: keep the base-landing card grid (20 cards), add under each card a compact wrap-row of variation CHIPS (plain <a>, label = variation h1 clamped, house chip styling as the exercise-type strip). Result: every one of the ~120 batch landings per locale is one click from /worksheets page 1 (also a crawl-equity win). Fallback unchanged when a locale has no groups.
- Keep `worksheetsPage.newHeading`; no new i18n needed (chips reuse landing h1s).

## Post steps (standing)
Commit → deploy.sh (static landings regenerate; EXIT capture) → `repoint-deck-canonical.js` for ALL 19 batch families + the themed fans ×11 (noop-safe) → live verify: every variation landing 200 ×11 sample; /en/worksheets page-1 HTML contains all 120 en batch links; a repointed canonical spot-check. Memory + plan closeout; the SEO surface note updates to ~2,640 batch pages.

## Verification
- gate.js PASS ×11 with 0 FAIL/dup-titles; composer dry-runs 74/74 per locale.
- curl sweep: all 814 new canonicalDeckSlugs 200 (xargs -P8).
- Hub: `curl /en/worksheets | grep -c` each of the 120 en batch landing slugs → all ≥1 on page 1 (origin + edge with cache-buster).
- Deploy EXIT=0; repoint reports 0 missing.

## Context
Operator /goal (2026-09-01): build 5 pedagogically meaningful, top-quality variations for each of the 20 nt20 worksheet types, in all 11 locales, and use the batch to reach the 1000+ clicks/day contribution target. This executes the fan-out lever designed into the nt20 close (memory: project_nt20_worksheet_types.md). Base state live: 220 decks + 220 landings + hub "New worksheets" strip.

**Mechanism ruling (verified by 2 explorers + Plan agent, spot-checked in source):** RNG `variantsPerType` ("Set N" rerolls) fails the quality bar (no distinct query face; no cross-variant dedup; 3 types have zero RNG variance). The house convention — **one authored TYPE ID per variation** — is the path: 92 new type ids + 8 theme-fan decks (published ids re-emitted at NEW themes; slug/title differentiate via the theme segment) = exactly 100 variations/locale. All families already taxonomy-registered ×11; no new families, no new skill-sentences. Id ranges verified free: K-244+, G1-214+, G2-255+, G3-359+. All emissions are new (type,theme) tuples at d2 ⇒ no slug collisions with the published 220.

## The 20×5 matrix (locked; flags: P=pure params · S=small additive base edit · M=moderate code w/ named fallback)
- **K-236 pre-writing** → K-244 lines+zigzags · K-245 waves+bumps+cups · K-246 loops · K-247 mountains+castle · K-248 mixed review (all S: stroke-set from d-block; decorative themes round-robin)
- **K-237 number tracing** → K-249 digits 0-4 big (P) · K-250 digits 5-9 big (P) · K-251 trace-then-write 0-9 emptyLast (S) · K-252 numbers 1-10 (M: two-glyph lane) · K-253 teen numbers 11-20 (M, same primitive)
- **K-238 letter tracing** → K-254 from:6 (G-L; it G,H,I,L,M,N) (P) · K-255 from:12 (P) · K-256 from:18 count:8 + clamp (S — it alphabet 21 letters, slice(18,26)=3 lanes breaks verify; clamp `start=min(from, len-count)`) · K-257 specials + vowels-fallback-for-empty (S — en specials=[]) · K-258 first-letters big glyphs count:4 (P)
- **K-239 sight words** → K-259..263 word sets 2-6 via deterministic slice param (S) + pool growth 12→≥24 words/locale (panels; append-only)
- **K-240 cut & paste** → theme fans ×3 (vehicles/fruits/toys; published=animals) + K-264 two-strip 8-tile sort (P) with fans animals+vehicles (K-264 counts once; its 2 themes = 2 decks but matrix counts 5 total: 3 fans + K-264×2)
- **K-241 color by code** → K-265 shapes mode (P) · K-266 plain color-by-number (S/M — the classic query) · K-267 subtraction (P) · K-268 mixed ± (P) · K-269 sums to 20 via d.values pool (S)
- **K-242 maze** → K-270 easy 7×8 (P) · K-271 hard 11×13 (P) · K-272 giant 13×15 (P; page-fit gate) + theme fans ×2 (animals/fruits @9×11)
- **K-243 number bonds** → K-273 bonds of 5 + dots · K-274 within 10 mixed · K-275 bonds of 20 · K-276 missing-whole · K-277 bonds of 10 with dots (all P)
- **G1-208 mental math** → G1-214 to 10 · G1-215 missing to 20 · G1-216 addition-only · G1-217 subtraction-only · G1-218 missing to 10 (all P)
- **G1-209 fact families** → G1-219 to 10 · G1-220 to 20 six houses · G1-221 practice to 10 (flagged weak — panels may rename face) · G1-222 review · G3-369 ×/÷ fact families (M; G3 band, family=fact-families)
- **G1-210 number words** → G1-223 to 20 · G1-224 tens 10-100 (S: pool param) · G1-225 match mode · G1-226 to 50 · G1-227 write-the-word (M)
- **G1-211 money** → G1-228 beginners 2-3 coins · G1-229 all coins · G1-230 8-card page (grid-fit gate) · G1-231 two-denomination (Phase-0 verify denomsUsed:2) · G1-232 compare purses (M)
- **G1-212 clock (draw mode ONLY — read modes owned by legacy G1-148/149/150/G2-249/250/G3-344/354-356)** → G1-233 o'clock · G1-234 half hours · G1-235 quarter hours · G1-236 five minutes (stepM:5 supported-unused) · G1-237 mixed steps (S: stepM array)
- **G1-213 word problems** → G1-238 addition-only (S: opsPattern) · G1-239 subtraction-only · G1-240 within 10 · G1-241 three problems · theme fan animals (⚠ fi needs new partitive nounForms for animals nouns — panel task; the 4 authored ids stay fruits ⇒ fi-safe)
- **G2-251 column no-regroup** → G2-255 2-digit add · G2-256 2-digit sub · G2-257 3-digit mixed · G2-258 3-digit add · G2-259 2&3-digit review (all P)
- **G2-252 capacity-mass** → G2-260 jugs-only (S: 0-count guard) · G2-261 balances-only (S) · G2-262 fine scale 50ml · G2-263 litres+kg (M; fallback swap: jugMax 2000/step 250) + theme fan animals
- **G2-253 symmetry** → G2-264 easy 4-card · G2-265 hard · G2-266 figure set B (S: allowlist) · G2-267 figure set C (S) · G2-268 horizontal mirror (M)
- **G2-254 reading comprehension** → G2-269..273 = passage idx 3-7 (P; data = 5 NEW original native passages ×11 locales, 55 stories, 3 questions each — panels)
- **G3-357 regrouping** → G3-359 carry add · G3-360 borrow sub · G3-361 3-digit carry · G3-362 across-zero sub (S: factory condition) · G3-363 mixed review
- **G3-358 times tables** → G3-364..368 fixed table ×2/×5/×10/×3/×4 (S: `d.table ?? rng.int(2,9)` — verified source line; the top query family: tabuada do 2, 2er-Einmaleins, table de 2)

## Base edits (ALL additive-with-fallback; published output must stay byte-identical — regression-render 3 published-param pages per touched type and diff)
- K-236: `const strokes = d.strokes || SETS[difficulty]`
- K-237: thread `d.digits`/`d.emptyLast`; primitives/trace-path.js gains `strokeGlyphPairLane` (two-glyph) — K-252/253 own builds + own verify
- K-238: from-clamp + specials-empty→vowels fallback
- K-239: `d.slice != null ? list.slice(d.slice*4, d.slice*4+d.words) : rng.sample(list, d.words)` + length guard
- K-241: `mode:'numbers'` branch + `d.values` pool
- G1-210: `d.pool==='tens'` + `mode:'write'` branch
- G1-212: `Array.isArray(d.stepM) ? rng.pick(d.stepM) : d.stepM`
- G1-213: `d.opsPattern` over positional i%2
- _shared/column-arithmetic.js: `config.acrossZero`
- G2-252: jugs:0/balances:0 guards (+`d.units` only if G2-263 kept)
- G2-253: `d.figures` allowlist; horizontal-axis (G2-268 only)
- G3-358: `d.table ?? rng.int(2, 9)`

## Waves (8 kinds × 11 locales, generated by a loop script; seedEpoch 1; d2 only)
core (75 themeless ids) · deco (K-244-248, K-270-272; themes round-robin animals/fruits/vehicles/toys) · wp (G1-238-241, themes:['fruits'] pinned) · cap (G2-260-263, themes:['vehicles']) · fan240 (K-240, themes vehicles/fruits/toys, tpT 3) · fan264 (K-264, animals+vehicles, tpT 2) · fanmaze (K-242, animals+fruits, tpT 2) · fananim (G1-213+G2-252, themes:['animals']; runs AFTER fi partitives land). Single-theme lists = pinning (round-robin can't pin within multi-theme waves). Published (type,theme) pairs excluded by construction.

## i18n + data (panels, per §A.13.48)
- 92 ids × {title, instruction} × 11 = ~2,024 strings; ~60 instructions inherit base verbatim; titles keyword-led (no worksheet-word — engine appends). Clone tools/apply-nt20-locale.js → apply-var-locale.js (92-id list; validate new titles against the locale's EXISTING strings per band — 34 new K titles vs ~104 existing).
- Data: sight-words +12/locale (append-only) · reading-passages +5/locale · fi partitive forms for animals nouns · computed per-locale letter-slice tables in the panel brief (panels title from ACTUAL letters, e.g. it K-254 = G,H,I,L,M,N).
- Panels write their own output files (proven pattern); resume-with-shortfall-list for the ≥-floor bounce.

## QA gates (house DoD)
EN render sweep 100 decks + per-spec verify() → page-fit gates (K-272, G1-230, K-264) → visual-critic contact sheets per family (20) → personal Read of representative renders → probe locales de/it/fi full render → lint-locale ×11 → publish-time gates (§15.16/§17.8.17) → audit-deck-html ×11.

## Publish + landing tier
Decks: en end-to-end first (100), then de/fr/es/pt/it, then nl/sv/da/no/fi; per locale publish-bulk dry-run→confirm + scoped OG; hreflang ×11 ONCE after all locales; audit; deploy.sh (EXIT capture). Landings AFTER decks live: clone gen-nt20-landings.js → gen-var-landings.js (100-row TYPES map incl. theme overrides for fans); per-variation landings ×11 (~1,100); similarity strategy for 6 siblings/family: content-specific p1 (exact table/range/letters), rotated paragraph roles, sibling "next-step ladder" cross-links, gate.js run locally per locale pre-write with bounce-back. Tier-1 first (times tables, tracing cluster, color-by-number, regrouping, reading); tier-2 rest. Then update worksheets-new-highlights.ts (keep strip at ~20 best faces, e.g. one per family), repoint-deck-canonical for new decks, memory closeout.

## Phase order
0. Pre-flight checks (denomsUsed:2 semantics, cards:8 fit, taxonomy for 4th cutting theme) + letter-slice tables
1. Base edits + byte-identity regression
2. 92 thin specs + EN strings + wave generator (88 files)
3. The 7 M-items (timeboxed; fallbacks: K-252/253→single-digit alternates, K-266→S-scope numeral mode, G1-227→drop to match-variant, G1-232→band variant, G2-263→2-litre jug swap, G2-268→figure set D, G3-369→G1-band review)
4. EN sweep + critic + personal Read
5. Panel authoring ×11 (strings + data) + apply + lint — the long pole; batch 3-4 locales at a time
6. Probe renders (de/it/fi) → full ×11 generation
7. Publish waves ×11 + hreflang + audit + deploy
8. Landing tier (tier-1 → tier-2) + hub strip refresh + closeout (memory + SEO-honesty note)

## Verification (end-to-end)
Every variation: verify() green + QA lints at d2 render ×11; byte-identity diff on published-param renders after base edits; publish dry-runs 0 collisions/halts; audit-deck-html clean ×11; live curls (deck 200, title keyword, canonical); landing gate.js all-pairs <0.80 FAIL=0 ×11; hub/topic grids show new decks. Click-goal honesty at closeout: ~1,320 total batch pages at ~2-3 clicks/page maturity ⇒ the 1000+/day target is credibly covered; Search Console watch note for the next wave.
