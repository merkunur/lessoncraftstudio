# Relocated reference/status/empirical detail (from CLAUDE.md)

> Backlog lists, the teardown commit-chain, activity-architecture summary, per-type SEO automation tables, the landing-program wave runbook + locale-fanout status, and image-theme data-quality logs. CLAUDE.md keeps the terse rule/current-state + pointer. Live SoT for landing = the plan files; for activities = [[project-activities-*]] memory. Relocated 2026-06-08 — nothing deleted.

## §11 Scope discipline — queued + future-arc backlog

**Queued post-Brief-B (Phase 6 close-out 2026-04-30):**
- Catalog page Phase 1/2/Gate 1 share-work revival — unblocked at `4b91adc0` (nginx catalog deck route §15.7); reactivates when operator decides.
- Topic destination pages full-shape brief beyond §16's minimal taxonomy. Separate brief.
- Eleven-deck dry-run — gated on taxonomy expansion brief (now CLOSED 2026-05-01 across all 29 §14.10 apps; subject vocabulary closed at 4 values: math 8 / logic 8 / letters 8 / spatial-reasoning 5; override rate 1/29 = 3.4%; topic destination route §16 implemented separately in Pass 7b).
- Group C brief drafting — 3 apps TBD; structurally identical to Group B per run-batch precedent.
- §19 longer-arc: NSR operationalization, school-license design, home page copy, first acquisition activities, native cartoon library deployment, premium classroom personalization (v2), v2 translate-this-deck workflow §17.8.7, grayscale PDF as user-facing download.

**Future-arc candidates filed at fold pass (post-Track-C-443-wave; doctrine-class but not yet promoted):**
- Manifest-disambiguator-field for fresh-roll-variation slug shape (`variation_id`/`set_label` field flowing into slug as 4th component). Trigger: 2nd+ recurrence of fresh-roll collision pattern at scale (currently 1 instance: 443-wave 3 pairs all earlier-roll-wins-resolved per §15.13).
- ALL_LOCALES DRY-extraction at 4th-consumer threshold (`['en','de','es','nl','fr','it','pt','sv','da','no','fi']` literal). Extract to `frontend/lib/locales.ts ALL_LOCALES` when 4th consumer surfaces.
- Arc-splitting threshold heuristic — generalizable shape for when an arc splits into sub-arcs vs ships as one.
- treasure-hunt manifest-emit-vs-worksheetTheme decoupling (Shape A §A.13.5 expansion).
- `shared.msg.offtheme.dropped` translation-key promotion at 12th-consumer threshold.
- backup-samples.sh path-divergence vs §A.1 (`/opt/lessoncraftstudio/backups/` vs `/var/www/lcs-media/backups/`).

---

## §17.1 What was deleted (teardown commit chain)

### 17.1 What was deleted
**Status: complete** at tag `v1-teardown-complete` on `pivot/printable-business-toolkit`. Removed across 9 sequenced passes (`e8c1c28f`, `b6c8166e`, `c605c911`, `42f4fd5f`, `49b501b0`, `c7d316dc`, `38181bd5`, `7c24630e`, plus Pass 9 final): public seller surfaces (apps/, pricing/, tools/, guides/, bundles/, ideas/, start/, blog/, about/, faq/, compare/, gallery/, sitemap-image/video shells); zero-consumer config trees (~80 MB); seller-era message namespace `apps` across 11 locales; `lemonsqueezy-products.ts` (plural; 7 dead exports); admin/user-control purchase-admin tooling; `DROP TABLE purchases` + `DROP TABLE wplus_transactions`; `Purchase` model + `User.purchases` relation. Public routes matching deleted prefixes return **HTTP 410 Gone** via `middleware.ts`. Reshelled directories (`pricing/`, `about/`, `faq/`) return **404** until new content lands.

See git tag `v1-teardown-complete` for the post-teardown HEAD and Pass 1-9 commit chain.

---

## §20.3 Architecture summary

### 20.3 Architecture summary
See [[project-activities-architecture]] for full doctrine. Key constraints:
- **Shell+tool split**: `mini tools/lcs-shell.{css,js}` own chrome (settings/sound/fullscreen/reset + activity chrome: prompt banner with TTS speaker → answer surface → Check → feedback → progress pill → Next). Tools declare `tasks` array; shell renders chrome.
- **Direction A card design** is the LOCKED aesthetic. Cream `#FBF3E4` + teal `#146B5E` + coral `#F2784B`. Baloo 2 + Nunito. Dual-shadow card, max-width 720px, chunky teal Check button.
- **ActivityIframe** (`frontend/components/activities/ActivityIframe.tsx`) — transparent wrapper, postMessage auto-resize, 3-layer scrollbar kill.
- **Activity route** (`frontend/app/[locale]/activities/[slug]/page.tsx`) — SSR + ISR 3600 + JSON-LD educationalAlignment + "Grade · Strand · Code" teacher chip. **CC code NEVER in URL.** Native-language slugs hand-written per locale per `*-activities.json` manifest.
- **Mini-tools served by nginx, NOT Next.js routes.** Files at `/var/www/lcs-media/mini-tools/`; `middleware.ts` `/mini-tools/*` carve-out prevents 307 locale-redirects.
- **Platform header** (`CategoryNav.tsx`) wraps decks + activities + manipulatives. Does NOT wrap the 33 worksheet-generator apps (operator exception).


---

## §21.1 What is automatic per type

### 21.1 What is automatic per type (do NOT rebuild — just run it)

| Surface | Indexable mechanism | Title / description / alt-text | JSON-LD | hreflang | Sitemap |
|---|---|---|---|---|---|
| **Deck / interactive worksheet** | self-contained `deck.html` at `/<locale>/decks/<native-slug>/` (nginx) | template-built ×locale from manifest; **alt-text from `image-vocabulary.js`**; sr-only from `exercises[]` | `LearningResource` + `ImageObject` (§17.8.1) | cross-locale sibling block via content_family_id (§17.8.7) | shards 0/1 auto (ID-parity, DB-driven) |
| **Activity** | SSR page `/<locale>/activities/<slug>/` (ISR 3600) | from `*-activities.json` row + 3-tier prose fallback | `LearningResource` + `FAQPage` + `educationalAlignment` | `buildHreflangAlternates` over row slugs | shard 3 (manifest enum) |
| **Tool (manipulative)** | SSR page `/<locale>/tools/<slug>/` (ISR), iframe child is the tool | from `messages/tool-content/<locale>.json` | `LearningResource` w/ `learningResourceType: Manipulative` | `hreflangAlternatesForTool` | shard 3 (content enum) |

All three: one global `robots` indexes everything; private surfaces (`/admin`, `/member`, dashboards) carry `noindex`. The hreflang map is a **single SoT** at `frontend/lib/seo/hreflang.ts` (`HREFLANG_MAP`, `getHreflangCode`, `buildHreflangAlternates`; `pt→pt-BR`, `es` stays `es`, x-default→en). Never re-inline it.


---

## §21.4 Verification standard + §21.5 Hand-maintained sync points

### 21.4 Verification standard (run after every publish/deploy)

| Type | Verifier |
|---|---|
| Deck | `audit-deck-html.js` (auto via publish-wave step 5) + live curl spot-check (200 + grep `<title>` / `og:image`) |
| Activity | `node scripts/audit-activity-pages.js --out=docs/audit-results` (≥200 words, LearningResource JSON-LD, single h1, mesh links, no locale-leak) **+ `node scripts/audit-activity-mobile.js` (mobile layout, all widths 280→768, 0 hard fails — §A.13.55)** |
| Tool | `node scripts/audit-tool-pages.js --out=docs/audit-results` (same floor + Manipulative type; 33/33 must pass) |

Remember Cloudflare 5-min TTL (§15.8) before edge reflects new bytes.

### 21.5 Hand-maintained sync points (the only places adding content touches code)

After the standardization arc, the hreflang map and `LIVE_TOOL_SLUGS` are **auto-derived** (no longer hand-edited). The remaining hand-maintained points:

- **New theme** → `frontend/config/topics-taxonomy.json` (`axes.theme.<key>.slug.<locale>` + name) per §16.5.1.
- **New noun in art** → `REFERENCE TRANSLATIONS/image-vocabulary.js` (11 locales × sing/plural/gender) — operator-approved only (§10.3); this is what makes deck alt-text automatic.
- **New tool** → add its key to `TOOL_KEYS` (in `live-tool-slugs.ts` + `audit-tool-pages.js` + `tool-content.ts`) and a `messages/tool-content/<locale>.json` entry per locale; `LIVE_TOOL_SLUGS` + sitemap + middleware carve-out then flow automatically.
- **New activity** → add a row to the relevant `frontend/public/mini-tools/*-activities.json` (per-locale slug/title); route + sitemap + JSON-LD + mesh flow automatically.
- **New locale** → §21.3 native-ensemble; add its slot to every shared table + `LOADERS`.


---

## §22.2 Wave sequence + next-wave runbook + §22.3 Locale fan-out

### 22.2 Wave sequence + next-wave runbook
**Sequence (plan P3.b):** EN waves 1→8 are **COMPLETE (1812 landings)** — per-wave subjects/grades/counts/commits are in the plan file + §22.2 "Key files" pointer + §22.1 doctrine. Then the **locale fan-out** (current phase): full-market locales **de → es → nl → fr → it → pt → sv → da** (operator may reorder the middle eight on market priority) → **no, fi LAST** (sample-only; honesty-filter in as their decks publish) — each locale's **native ensemble** authors its own compat booleans + P1 skeletons + native keyword research + strand/label localization (first per-locale-ensemble engagement in the landing program). **The picture-sort de-orphan (the program's first live-query hub change) shipped in Wave 5** via `themeSubjectTagsWhere` `hasSome`-over-exact-`-vs-`-component-keys (§22.1), with its own verify + rollback.

**Cadence (every wave):** ledger-lock → lead-slice (novel/highest-risk type first) → coupled-slices (cousins authored together to lock differentiation in one pass) → execution (commit + deploy + repoint + verify) → post-ship verify. Each slice STOPS for an operator ruling before the next opens.

**Per-wave runbook:** (1) ledger-lock any new types (source-read; interrupt on surprise) **+ cell-space pre-check** (report each mode's theme breadth + the skel×P2 cell count the guard requires; never author a mode where cells ≤ themes — the corrected floor above) **+ ≤N quantity-ceiling spot-check — MANDATORY at any quantity-defined grade boundary** (run `check-sum-ceiling.js` per mode against the actual child-seen quantity BEFORE authoring; report per-coordinate clean/breach FIRST; exclude breachers + record as Gr2-candidates; a >majority breach is a mode-level interrupt — STOP for a ruling); (2) if a new locale, its native ensemble authors that locale's compat booleans + P1 skeletons + native keyword research first; (3) extend the `gen-wave1.js`/`gen-wave1b.js`-style generator → author + pass `gate.js` (≥200w, 0 FAIL, multi-cluster within+cross) + `validity-gate.js` (0 invalid); (4) ship landings (new URLs, safe) + repoint the canonical decks' `deck.html` (server-side `__CANONICAL_URL__` → landing, quote-terminated page-URL only so og:image/PDF assets stay intact, `.precanonical-bak` per file); (5) **the conditional repoint auto-applies — no code change after wave 1**; (6) verify the **rendered DOM** — the topic deck grid is hydration-gated, so **curl shows 0 deck links (§A.13.50); use the headless-browser standing harness `scripts/seo-landing/verify-hub-autobind.js`** (`en.json`-driven: auto-bind + LEAK=0 + auto-bounding; `--type=<exerciseType>`), not curl; (7) STOP for operator ruling + live eyeball.

**Key files:** route `frontend/app/[locale]/worksheets/[slug]/page.tsx` · lib `frontend/lib/seo/landing-content.ts` · content `frontend/content/seo-landing/en.json` · generators `scripts/seo-landing/gen-wave*.js` (per-wave; `gen-de-readiness.js` for the de locale arc) · gates `scripts/seo-landing/{gate.js,validity-gate.js}` + **quantity-ceiling `scripts/seo-landing/check-sum-ceiling.js`** (4-shape ≤N gate) · compat `frontend/content/seo-landing/theme-mechanic-compat.json` · coordinate enumerators `scripts/seo-landing/enum-wave*.js` + `wave*-coordinates.json` manifests · repoint `scripts/seo-landing/repoint-deck-canonical.js` (committed Wave 2 `ab11441e`; quote-terminated `__CANONICAL_URL__`→landing, `.precanonical-bak`) · hub verifier `scripts/seo-landing/verify-hub-autobind.js` (standing; `--type`, auto-bind + LEAK=0 + auto-bounding) · level map in the route's `LEVELS` const · ledger `docs/seo-landing/mechanic-ledger-mathK.md` · Gr2-candidate record (out-of-tree) `~/.claude/plans/wave3-mathpuzzle-gr2-breachers.md`. **0 protected-core lines** throughout (the 5 activity cores are never touched). Per-wave commits + per-wave generator/enumerator/coordinate-manifest filenames (pilot → Wave 8, each with its counts, new strands/labels, LEVELS-adds, and repoint tallies) are in the plan file `commission-to-cc-structured-hollerith.md`. **EN waves 1-8 CLOSED; next phase = locale fan-out.** **Landing-presence audit 2026-06-08** (all 7 operator-flagged types: chart-count/cryptogram/math-worksheet/picture-sort/treasure-hunt/word-scramble/wordsearch) = **CLEAN, no regression** — chart-count 43 + picture-sort 40 live + binding (LEAK=0 on both type hubs, 200 + self-canonical); the other 5 correctly landing-absent by ruling; the operator's observation reconciled to the deliberately-unlanded set (category (d) above), not a gap.

**Carry-forward (browse-hub, NOT a landing-program task; pre-existing, non-blocking):** `/en/topic/sudoku` returns 404 although `sudoku` is a registered exercise-type axis-key AND a published landing type. NOT Wave-5-caused — the de-orphan touched only the THEME-axis branch; the exercise-type query branch was untouched and the Wave-5 type-hub-unregressed check confirmed prior type hubs (e.g. `/en/topic/subtraction`) bind identically. It is a real pre-existing browse-hub defect (a registered axis-key whose browse hub 404s) worth a dedicated one-investigation fix on the exercise-type browse surface — separate from the landing program, NOT bundled into any content wave.

**Carry-forward — FOUR distinct categories (do not conflate; each resolves differently):** (a) **grade-deferred** — the type's grade is outside the EN waves shipped: **Gr1** (wordsearch, word-scramble — await a future Gr1-literacy wave). *(The Wave-3 71 math-puzzle/code-addition Gr2 breachers are now SHIPPED in Wave 8 — the full-corpus re-grade authored 33/50 ≤100-Gr2 coords; the out-of-tree `wave3-mathpuzzle-gr2-breachers.md` record is consumed.)* (b) **breadth-non-viable** — the skill is real but the type cannot fill a themed-landing wave: **cryptogram** (5-7 tag but **themeless, 0 themes / 100 decks**) + **treasure-hunt's ≤2-theme** modes (only `4th_of_july` + `animals`) — deferred-non-viable-by-breadth, **NOT a removal** (revisit only if a non-themed landing model is ever built). (c) **browse-hub defect** — the `/en/topic/sudoku` 404 above (a registered axis-key whose browse hub 404s; not a landing-program task; the W8 `/en/topic/food` 404 is distinct — a dropped-axis-key per §16.5.1, never a registered theme, so NOT a defect). (d) **content-expansion surface (benign — NOT a defer/removal/defect)** — a SHIPPED type carrying **deliberately-unlanded coordinates**: **chart-count** (~6 non-Wave-2 themes: winter/weather/summer/spring/emotions/body-parts — theme-validity) + **picture-sort** (54 uncapped `-vs-` pairs + bare singletons beyond the Wave-5 40-cap — demand-cap). These correctly stay `/decks/` (LEAK=0); they are a known content-EXPANSION OPTION if demand ever justifies landing them — a fresh-content decision, **never a fix**. Surfaced + ruled clean by the 2026-06-08 landing-presence audit (the shipped 43/40 are live + binding; these extras were never meant to land).

### 22.3 Locale fan-out — `de` COMPLETE (the first full locale); next = `es`

The EN arc (Waves 1–8) shipped the program in English. The **locale fan-out** re-ships the same landing structure per locale. **`de` is the first full locale, COMPLETE 2026-06-08** (de.json **1779** landings; STEPs 1–4; Math + readiness + literacy; all 3 German bands). The doctrine below is **per-locale-durable** — it governs every locale fan-out (es next), not just de. Full record: [[project-de-landing-fanout-investigation]] + the de plan file `~/.claude/plans/plan-mode-commission-de-enchanted-lagoon.md` (the EN plan file stays `commission-to-cc-structured-hollerith.md`).

- **de state** = 1779 landings across STEPs 1–4 (addition → readiness → numeric Klasse → literacy); N-band **vorschule 1057 / 1-klasse 548 / 2-klasse 174**. Per-step type→count→band→commit detail: [[project-de-landing-fanout-investigation]].
- **Locale grade axis = re-derived per coordinate, NEVER the EN band.** The EN 4-band axis (Preschool/K/Gr1/Gr2) collapses to the locale's own axis (de: **Vorschule 5-6 / 1.Klasse 6-7 / 2.Klasse 7-8** — no German "Kindergarten" grade, so EN-K arithmetic re-grades UP to 1.Klasse). `coordinate.level` is set **per coordinate by mechanic + child-seen quantity** (the ledger-level-OVERRIDE doctrine), confirmed by `check-sum-ceiling.js --locale=<loc> --source=manifest|deck-html` against per-band ceilings (de: 1.Klasse ≤20, 2.Klasse ≤100, >100 = REMOVAL).
- **The framework classifier line (the spine principle):** **answer in the picture domain → readiness / NO-CCSS / Vorläuferfähigkeit-style strand, no framework chip; answer in the grapheme/text/quantity domain that genuinely teaches a national-curriculum competency → CARRIES** (national-Lehrplan chip + the EN CCSS code as machine anchor). Instances: code-addition (arithmetic-as-key-lookup Kodierrätsel → no-CCSS) vs crossword (genuine spelling → carries); find-and-count (circle pictures by Anlaut → readiness) vs matching (connect to a grapheme → carries); **prepositions SPLITS by mode** (fillin write-the-word → carries 1.Klasse / multiplechoice pick-in-scene → readiness Vorschule, from ONE config).
- **R3 band-vs-code (standing doctrine):** a CARRIES coordinate keeps its **EN CCSS code as `targetName` regardless of the locale band** — code = competency identifier, chip = band, **no `targetUrl`** (no-targetUrl AlignmentObject per §20.10 / the EN arc). Proven across L.2.2.d (Gr2 crossword), 1.OA/2.NBT (subtraction/math-puzzle), and the **EN-Kindergarten** literacy codes RF.K.3.a/L.K.2.d/L.K.1.e on **de-1.-Klasse** pages (German formal literacy begins a year later than US-K → US-K competency = German-1.Klasse by construction; the apparent K↔1.Klasse code/chip gap is expected, not an error).
- **R5 per-locale compat authority — NEVER cross-applied.** Language-dependent compat booleans (`phonetic_variety`, `collective_risk`, gender) are re-judged **per locale**. For de, `phonetic_variety` was re-authored for German Anlaut (German has Sch-/St-/Sp-/Pf-/Z-/Qu- onsets English lacks) and applied **de-specifically at the coords filter, NOT by editing the shared EN `theme-mechanic-compat.json`** (the phonetic gate only WARNs, never blocks — so the per-locale judgment lives at the authoring filter). §A.13.58 / §14.6 per-locale-authority principle, on the phonetic axis.
- **Investigation-then-rule discipline (for held/novel slices).** A slice with unresolved questions (a grade straddle, a framework treatment, a new compat axis) opens as a **plan-mode investigation FIRST** — source-read every mechanic (never the slug), enum the locale corpus, engage the **native ensemble** (K-3 pedagogue + linguist + B2C/SEO, per §A.13.48/§A.13.56) — reports per-coordinate, **operator RULES**, then authoring rides gated coordinate-to-coordinate. STEP 4 was the canonical case (the Vorschule↔1.Klasse straddle + the phonetic_variety re-author + the title mis-signal fix where the de type name misleads, e.g. find-and-count "…zählen"→**Anlaute**, word-guess "raten"→**Wörter schreiben**).
- **The de-orphan is locale-agnostic.** picture-sort's combined `X-vs-Y` subjectTag is de-orphaned onto both component theme hubs by `frontend/lib/topic-decks.ts: themeSubjectTagsWhere` (`hasSome` over exact `-vs-` component keys) — it **rode UNCHANGED for de** (no code edit); `scripts/seo-landing/verify-deorphan.js --locale=<loc>` + a per-locale test config confirms dual-membership on the **rendered grid** (curl is hydration-blind per §A.13.50).
- **Engine + render (reuse — proven on the full locale):** `scripts/seo-landing/gen-de-readiness.js` is the config-driven generator — serves readiness (no `standard`) + framework-bearing (`cfg.standard`) + per-mode frames + per-coordinate `co.level` + **level-aware `cfg.standard`/`cfg.strand` functions** + a **standard-guard** (omits the key when a per-mode standard fn returns null, e.g. prepositions/mc). `de-render.js` owns `datN` (dative +n after `den`/always-dative-prep) + the Ihr-Kind→dein-Kind du-conversion. Per type: a `de-readiness-<type>.js` config + a `de-<type>-coordinates.json` (the enum output; per-coord `level` written in for two-band/split types). Gate `gate.js` (whole-page raw 3-gram Jaccard, FAIL ≥0.80 / WARN 0.65-0.80; **§22 mode-true sharpening** for parameter-twin modes — math-puzzle's 0.773→0.642 collapse is the canonical fix); cell-space **8×7=56** floor; **gender-safe plural-only `{N_PL}`/`{GEN}` slots** (the frame tension on letter/Anlaut mechanics is resolved by generic prose + the **„X" wie [fixed-Wort]** quoted-letter idiom — the theme noun never goes singular). Per-coordinate ledger `docs/seo-landing/mechanic-ledger-de.md`. **0 protected-core lines** throughout.
- **Per-coordinate ship cadence:** ledger-lock (source-read the mechanic) → enum → [phonetic re-author for Anlaut types] → native frames (P1≥100/P2≥72 words, gender-safe, 0 prose digits, h1 foregrounds the true skill where the type name mis-signals) → `gate.js` (0 FAIL) + gender-lint → commit → `bash deploy.sh` → `repoint-deck-canonical.js --locale=<loc> --types=<type>` → **rendered-DOM verify** (Vorschule = 0 educationalAlignment + 0 framework chip [FBEDE6=0]; CARRIES = educationalAlignment + correct targetName + targetUrl=0 + Lehrplan chip + 0 "Common Core"; LEAK=0 via `verify-hub-autobind.js --locale --type`; N-band regression across all bands) → STOP for the next coordinate. **Re-query de.json for the authoritative count — NEVER an additive tally** (the "566"/"1095-vs-978" mislabel lesson).
- **NEXT = `es`** (the 2nd full locale): the machinery + doctrine are proven, so es fans as a **faster locale-scoped arc** — but it brings its own native-ensemble surprises: **Romance gender (no neuter; the §A.13.58 note that the gender-code bug is ABSENT in Romance)**, the **Spanish onset inventory** for any phonetic coordinate, and **es-native keyword research + title mis-signal checks**. Sequence de→**es**→nl→fr→it→pt→sv→da→no/fi-last; the middle-eight order + pacing is an operator locale-priority call. The es arc opens with its own investigation-then-rule pass (the held questions surface per locale).

---


---

## §A.7.1-A.7.3 image_themes data-quality logs

#### A.7.1 image_themes Spanish-displayName data-quality issue
Surfaced `947ad260` (BW theme registration). `home_bw` and `household_bw` both have Spanish displayName `"Hogar BN"`. Class 2 collision resolved by Option A fallback (`household_bw.slug.es = "household-bw"` English-derived; `name.es` passthrough at `"Hogar BN"`). See §16.5.1.

**Fix needed:** operator-curated rename of `household_bw.displayNames.es` to distinct translation. Once renamed, Option A removed; slug re-derived via standard path. Italian `home_bw`/`household_bw` (both `"Casa BN"`) has same shape; Option A also at `b3f0d1f3`.

#### A.7.2 image_themes accent-data-quality cycle (multi-locale)
Multiple locales surfaced through 2026-05:
- **pt:** `accessories.pt = "Acessorios"` (expected `"Acessórios"`); `589fd554`
- **it:** `activities.it = "Attivita"` (expected `"Attività"`); `589fd554`
- **sv:** `accessories.sv = "Tillbehor"` (expected `"Tillbehör"`); `a47ea021`
- **da:** `accessories.da = "Tilbehor"` (expected `"Tilbehør"`); `a47ea021`
- **no:** `accessories.no = "Tilbehor"` (expected `"Tilbehør"`); `a47ea021`
- **fi:** `animals_bw.fi = "Elaimet MV"` (expected `"Eläimet MV"`); `a47ea021`

Pattern suggests systematic accent-loss at prior data-import. Slug-level safe (slugify ASCII-folds). Sweep `image_themes` UPDATE per-locale when accumulated.

#### A.7.3 fr Class 2 documentation correction (`9ea577fe`)
`9ea577fe` closeout stated fr Class 2 collision — empirical state at `a47ea021` cross-locale audit was distinct translations (no collision). Documentation correction only.

---

## §1 SEO + embed-virality acquisition flywheel (full doctrine)

**SEO + embed-virality acquisition flywheel.** SEO drives visitors to deck pages → visitors copy embed snippets → embedded decks spread to classroom blogs and school sites → backlinks compound search authority. Structural, not promotional (no ads, no influencer outreach). Three-layer embed architecture (locked):

1. **Mechanism** — deck.html iframe-safe; self-contained per §14.1; verified at `7f91f1b8`.
2. **Per-deck discovery UX** — operator-discoverable "Embed this" affordance; shipped `e8cec493`.
3. **Homepage signaling** — embed-virality CTA above-fold; shipped `a793d7c9` (Alt A Arc 3).

Layer 1→2→3 sequencing prevents credibility gaps (homepage CTA pointing at non-existent embed flow). Canonical example of §16.7 lock-with-dependency-pause discipline.

**Backlink-bearing vs visibility-only mechanisms.** Iframes alone are not backlinks; the snippet's visible `<a href>` tags OUTSIDE the iframe (wrapper `<div>` + caption with brand-anchor + keyword-anchor per `e8cec493`) ARE the backlinks. Future distribution mechanisms classify into one bucket at design time.

**Embed-attribution is visible-load-bearing, not technically-enforced (Technique 2 lock at Arc 2 A4).** Don't fight host-site stripping programmatically; design attribution so removal looks broken. Trade minor strip-leakage for low-friction-virality at scale.

**Three-second-budget homepage doctrine.** Teachers arriving via SEO decide stay-or-leave in three seconds. Homepage's job: magnitude + variety + browse-path signaling — not value-prop persuasion (Hero handles), not feature enumeration (deferred to below-fold). Three at-a-glance: structural breadth (29 exercise types + 100 themes), multilingual differentiator (11 flags), one primary acquisition CTA (embed-virality). Alt A architecture (`a793d7c9`) operationalizes this.

**Sampling vs structural-display are distinct UX jobs.** BreadthGrid (9 deck previews per `e5bb3cb4`) samples but doesn't communicate breadth; ExerciseTypeGrid (29 types) enumerates structural axis without rendering individual decks. Conflating them under-signals catalog scale.

**Magnitude-via-structural-axes-not-population.** At 500-decks-per-day cadence toward 55,000-deck target, today's count is stale signal. Communicate via durable structural axes (29 × 100 × 11 = 14,487 publish-eligible combinations per §6). Published-deck count is footnote only. Implemented in `MagnitudeFraming.tsx` (`a93ebb7c`).

**Crawl-bait-density as homepage SEO metric.** Above-fold internal-link count per locale × locales is load-bearing: Alt A targets ~140 above-fold internal links per locale × 11 = ~1,540 crawl-bait surface. Future homepage extensions must raise or preserve this density.

**Foundation-doctrine reality-check pattern.** Periodically (typically at fold-pass cycles), verify foundation doctrine against current ship-state. When foundation references unshipped mechanisms, either accelerate the mechanism or amend the doctrine; don't power-through.

---

## §9 What "done" looks like for launch (full checklist)

**Engineering:** Previous public site deleted; apps behind operator auth (§17). All 29 apps producing catalog ZIPs (§15). Catalog browse/search/filter/individual deck pages work. Topic pages render with deck grid + PDF list; lesson plan full for subscribers / blurred for free. Student play works across all 29 types on mobile + desktop, identical per tier. Free shareable links + QR codes + email signup all work. Subscription checkout works ($69 individual; school-license deferred). Subscriber features enforce per `docs/SUBSCRIPTION-SCOPE.md`. 60-day grace works (subscriber features off; old links still functional for students). Contextual conversion prompts trigger correctly. **Sample decks embedded on every public page**. Cloudflare CDN active. Tailscale connecting all three machines. Mac Studio AI picking up new decks within minutes.

**SEO foundation from launch (not bolted on):** All public pages SSR. Native-language URL slugs. hreflang per language variant. Schema.org markup. XML sitemap. Mobile-first responsive (validated at 375px). LCP < 2.5s. Internal linking infrastructure. Search Console verified for priority languages. Initial keyword research per §17 + §19.

**Content at launch:** 400-600 published decks per §19 sequence. 30-50 high-priority topic pages with substantive descriptions + 4-8 recommended decks each in priority languages. (Full-lesson-plan + parent-communication-template scope removed 2026-05-17 along with the underlying domain; topic-page depth comes from descriptions + FAQ + curated deck commentary.) 8-12 substantive blog/guide articles.

**Public site rebuild:** Home leads with multilingual K-3 positioning + embedded sample deck + surfaces topic pages. Pricing page presents two-tier with feature comparison. About + FAQ + support written for multilingual K-3 educators. Blog/guide established. Footer + navigation reflect new audience.

**Acquisition foundation:** Pinterest account with initial pins from samples. LinkedIn list of target international school heads compiled for outreach in months 4-6. Email waitlist captured pre-launch. One conference committed (ECIS or COBIS).

v1 launch is **not** trying to achieve substantial organic search traffic (comes months 6-12), revenue at scale (first subs months 6-9), broad K-12 reach (focus is K-3), or institutional revenue (v1.5).
