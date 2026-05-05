# Homepage acquisition-conversion architecture audit + redesign proposal

**Commission shape:** `[CHORE][AUDIT]` per §A.14.5 — read-only audit + redesign-proposal markdown. No production change. No DB writes. No FS modification beyond this audit-doc. No `deploy.sh`.

**HEAD at audit:** `fba33939` (post-`109a91d4` Commission ε close + post-`fba33939` [DOCS] fold).

**Author:** Claude Code, executing the operator's commission spec verbatim.

**Date:** 2026-05-05.

---

## Executive summary

The current homepage at `frontend/app/[locale]/page.tsx` (5 sections via `homepage-v2/`) **does not communicate catalog magnitude or structural-axis variety in the 0-3 second decision window** that determines whether arriving teachers stay or bounce. It leads with a value-promise hero + a 9-cell BreadthGrid of sample decks; the structural axes that constitute the platform's actual differentiator (29 exercise types × 100 themes × 11 locales × multi-mode-axis) are surfaced only in the Footer (>3s zone) at the very bottom of the page.

Empirical state at `fba33939`: **884 published decks** across 11 locales (en dominant at 622; no minimal at 1), 65 of 100 theme axis-keys exercised, 4 of 5 educational-level axis-keys exercised. Cadence target ~500/day toward an operator-stated long-term ~55,000-cell ceiling. **The catalog is small in absolute count but architecturally vast in axis-product space (~14,487 publish-eligible combinations per §6 amendment).** Magnitude communication should signal that combinatorial space, not the current-population snapshot.

Three architectural alternatives are proposed, each satisfying the mandatory-element list (visible-at-a-glance 29-type grid; prominent locale switcher; browsable theme strip; combinatorial-space copy; repositioned samples; distinct browse-path CTAs; embed affordance). They differ at the architectural level on how the 29 exercise types are surfaced, how themes are surfaced, how axis-product framing reads in copy, where samples sit, and how embed-virality integrates.

**CC's recommendation:** Alternative A (density grid). Highest above-fold crawl-bait surface for SEO, strongest 0-3s magnitude signal via visible-variety, and embed-virality slot naturally integrates as a primary nav entry. Alternatives B (visual mosaic) and C (search + browse-by-axis) are valid tradeoff candidates the operator may prefer for visual-first or self-directing-teacher framings.

---

## Phase 1 — Current homepage audit

### Component tree (frontend/app/[locale]/page.tsx)

```
LocaleLayout
├── Navigation                      (frontend/components/layout/Navigation.tsx; 178 LOC; client; sticky)
│   └── Logo · LanguageSelector · SignIn · SignUp
├── HomePage (page.tsx; server component; revalidate=3600)
│   ├── Hero                        (homepage-v2/Hero.tsx; ~52 LOC; server)
│   ├── BreadthGrid                 (homepage-v2/BreadthGrid.tsx; ~118 LOC; server)
│   │   └── FeaturedDeckTile + 8 thumbnails
│   ├── LanguageProof               (homepage-v2/LanguageProof.tsx; ~50 LOC; server)
│   │   ├── GermanComparison        (~auto-translation-error vs platform side-by-side)
│   │   └── FrenchComparison        (~auto-translation-error vs platform side-by-side)
│   ├── FreeExperience              (homepage-v2/FreeExperience.tsx; ~52 LOC; server; 4 capability blocks)
│   └── SubscriptionSection         (homepage-v2/SubscriptionSection.tsx; ~65 LOC; server)
│       └── SubscribeCTA            (client component; mode = subscribe | notify_me)
└── Footer                          (frontend/components/layout/Footer.tsx; 543 LOC; client; bottom-of-page)
    └── byLanguage · byTopic · byExerciseType columns per §16.6
```

### Section inventory + 3-second-budget mapping

| Position | Section | Job (semantic) | Real-estate | Interactivity | Data source |
|---|---|---|---|---|---|
| Top | **Navigation** | Brand + locale + auth | ~64-72px tall | LanguageSelector dropdown + SignIn/SignUp buttons | Static + auth context |
| Hero | **Section 1 — Hero** | Value-promise + product demo | `pt-20 pb-24 md:pt-28 md:pb-32` (~50% viewport on desktop, more on mobile) | Autoplay video (math-puzzle.mp4) | i18n `homepage.hero` |
| Section 2 | **BreadthGrid** | Sample-deck demonstration | `py-20 md:py-28` (~40% viewport) | 1 inline-play featured tile + 8 thumbnail links | DB-backed via `selectBreadthGridDecks` |
| Section 3 | **LanguageProof** | Platform-quality differentiator (auto-translation errors vs platform's correct rendering) | `py-20 md:py-28` with cream-200 bg | Static comparison panels (DE + FR) | i18n + static images |
| Section 4 | **FreeExperience** | Free-tier capability blocks | `py-20 md:py-28` | Single text-link CTA → `#footer` | i18n `homepage.freeExperience` |
| Section 5 | **SubscriptionSection** | $69/year tier + 3 pillars | `py-20 md:py-28` | SubscribeCTA client component (auth-aware, NotifyMe form when env=`notify_me`) | i18n + env var |
| Bottom | **Footer** | Structural catalog navigation (by-language / by-topic / by-exercise-type) | Full-width footer | Many anchors per §16.6 honesty discipline | DB-driven counts + static maps |

### 3-second-budget zone assignment

**0-1 seconds (immediate above-fold):**
- Navigation chrome (logo, locale, signin, signup)
- Hero text (h1 + subhead + interaction-line) + autoplay video
- **ZERO catalog-magnitude signal**
- **ZERO structural-axis signal** (no exercise-type tiles, no theme tiles, no language strip beyond the LanguageSelector dropdown)
- **ZERO axes-navigation** (no "browse by topic" / "browse by language" / "browse by exercise-type" links; the nav has `Sign In` + `Sign Up` only, no catalog entries)

**1-3 seconds (first-glance + minimal scroll):**
- BreadthGrid section title ("Decks teachers are using right now") + intro
- First row of grid tiles (1 featured inline-play tile + 3 thumbnails on lg+)
- Magnitude communicated as: **9 individual deck thumbnails**, not as axes-product
- **Failure mode:** 9 thumbnails reads as "we have 9 decks worth showing" not "we have ~14,487 publish-eligible combinations across 29 exercise types × 100 themes × 11 locales"

**>3 seconds (lost-attention zone):**
- LanguageProof, FreeExperience, SubscriptionSection
- Footer (where the actual catalog navigation lives)
- Visitors who don't scroll never reach the structural-axis surface that constitutes the platform's differentiator

### Audit of current BreadthGrid Section 2

**Current job (per `homepage-v2/BreadthGrid.tsx` + §18.4 doctrine):**
- 9-cell hybrid: 6 visiting-locale + 2 cross-locale + 1 featured inline-play (per §18.4.2)
- Day-of-week rotation per §18.4.2
- Three load-bearing equilibria (locale balance / theme balance / mechanic-diversity per §18.4)
- ISR-cached at 1-hour revalidation

**What it does well:**
- The 1 featured inline-play tile lets a teacher *experience* the actual product without leaving the homepage. This is operator's §1 / §18 doctrine in action ("every public-facing page embeds a working sample deck").
- Cross-locale demonstration (max-1-per-locale via `crossLocale` selection) signals multilingual without explicit copy.
- Mechanic-diversity equilibrium prevents visual monotony (per §18.4.1 self-skip threshold).

**What it does NOT do (the failure mode):**
- It's a *sampling* surface, not a *magnitude* surface. 9 picks, however well-curated, cannot signal "29 exercise types × 100 themes × 11 locales = thousands of unique worksheets."
- The 11-locale axis is whispered (each tile shows a small `text-xs` locale label like `EN` / `DE`); it's not the visual signal of "available in your language."
- The 29-exercise-type axis is invisible — a visitor doesn't see "addition, subtraction, sudoku, crossword, pattern-train, ..." anywhere on the homepage; they see 9 decks of varying types implicitly.
- The 100-theme axis is invisible — themes appear only as image content within thumbnails, not as a browsable axis.
- The combinatorial-space framing is absent in copy.
- The current `intro` ("A few decks from across the catalog. Open the first one to play it here, or click any other to see its full page.") explicitly frames magnitude as "a few decks" — the opposite of the structural-axis-magnitude framing.

**Strategic role under any redesign:** BreadthGrid stays valuable as a sample-demonstration surface but moves OFF the magnitude-signaling primary slot. It becomes a smaller "see one in action" section below the structural-axis grid.

### Critical above-fold gaps

1. **No 29-exercise-type grid** — visitors don't see the breadth.
2. **No 100-theme tile-strip** — visitors don't see the variety.
3. **No 11-locale flag-strip or list** — visitors see only their own locale dropdown; the multilingual differentiator is whispered, not shown.
4. **No combinatorial-space copy line** — the platform's actual scale framing is absent.
5. **No browse-path CTAs in nav or above-fold** — `Sign In` / `Sign Up` are the only nav buttons; catalog navigation lives in the footer (>3s zone).
6. **No embed-affordance above-fold** — embed is named in Section 4 (FreeExperience block) but no "copy embed code" CTA surfaces anywhere on the homepage. Per §1 acquisition flywheel + §17.4 SEO doctrine, embed-virality is a primary distribution mechanism; it deserves a primary surface.

---

## Phase 2 — Catalog structural-axes surfacing

### Axis 1 — Exercise-type (29 §14.10 canonical apps)

Per `EXERCISE_MODE_APP_CLASSIFICATION` constant in `scripts/publish-cli/slug.js` and the §14.10 authoritative list:

```
addition, alphabet-train, big-small, bingo, chart-count, code-addition,
crossword, cryptogram, find-and-count, find-objects, grid-match,
matching, math-puzzle, math-worksheet, missing-pieces, more-less,
odd-one-out, pattern-train, pattern-worksheet, picture-path,
picture-sort, prepositions, shadow-match, subtraction, sudoku,
treasure-hunt, word-guess, word-scramble, wordsearch
```

All 29 are DERIVED post-Commission ε (`109a91d4`); HARDCODED-NULL list empty per §A.13.4.

**Empirical at `fba33939`:** 30 distinct `exercise_type` values in DB (29 canonical + 1 `picture-trail` outlier per §15.10 routing matrix).

### Axis 2 — Language (11 platform locales)

```
en, de, fr, es, pt, it, nl, sv, da, no, fi
```

Per §6. All 11 substrate-complete at milestone `a47ea021`.

**Empirical at `fba33939`:** 11/11 locales have at least one published deck. Distribution heavy on en (622); minimum no (1). 9 locales at 29 each (substrate + minimal Track C).

### Axis 3 — Theme (100 axis-keys registered)

Per §16.5.1 — 50 color themes + 50 BW themes registered 1:1 with `image_themes.type='images'` rows.

**Empirical at `fba33939`:** 65 of 100 theme axis-keys currently exercised across published decks (35 currently empty). Top themes by deck count: `animals` (133 decks dominant), then a long flat tail at ~11 decks per theme each.

### Axis 4 — Educational-level (5 axis-keys)

Per §17.8.6:

```
preschool (3-5) | kindergarten (5-7) | grade-1 (6-8) | grade-2 (7-9) | grade-3 (8-10)
```

**Empirical at `fba33939`:** 4 of 5 axis-keys exercised. `5-7` dominant (783 decks); `3-5` (40); `6-8` (51); `7-9` (10); `8-10` unexercised at K-3 audience natural ceiling.

### Axis 5 — Mode (per-app variability)

Per Commission ε (`109a91d4`) locked taxonomy: 6 single-mode apps + 23 multi-mode apps.

**Single-mode (1 mode each):** alphabet-train, chart-count, crossword, cryptogram, grid-match, picture-sort.

**Multi-mode locked (mode counts from `109a91d4` body — 11 explicitly enumerated):**
- bingo: 2 (image-default-null, word)
- code-addition: 2 (standard-default-null, secret-word)
- missing-pieces: 6 (square-default-null, circle, rect-portrait, rect-landscape, ellipse-portrait, ellipse-landscape)
- odd-one-out: 2 (identical-default-null, cross-theme)
- pattern-train: 5 (AB-default-null, aab, abb, abc, aabb)
- pattern-worksheet: 3 (mixed-default-null, blank, options)
- sudoku: 3 (4=easy-default-null, 6=medium, 8=hard)
- treasure-hunt: 2 (basic-default-null, compass)
- word-guess: 4 (0-default-null, 2=easy, 4=normal, 6=tough)
- word-scramble: 4 (same as word-guess)
- wordsearch: 3 (mixed-default-null, image-only, word-only)

Sum across 11 explicitly-locked multi-mode apps = 36 mode-cells. Other 12 multi-mode apps (addition, big-small, find-and-count, find-objects, math-puzzle, math-worksheet, matching, more-less, picture-path, prepositions, shadow-match, subtraction) have additional mode dimensions in their authoring UIs but exact taxonomy not enumerated in the slug.js comments. Empirical evidence shows addition + subtraction publish 4 modes each in Track C waves so far.

### Combinatorial space (taxonomy-locked)

Per §6 (operator-authored):

> 100 themes × 11 locales × 13 themed-emitting apps = 14,300 themed combinations + 17 themeless × 11 = 187 themeless = **14,487 total publish-eligible combinations**

Layering mode-axis at avg ~2 modes/app: **~28,974 unique-deck cells**.

Operator-stated long-term cadence target: **~55,000 cells**.

### Current population vs space (footnote, not headline)

**884 published decks** at HEAD `fba33939` (2026-05-05).

- 884 / 14,487 = **6.1%** of base publish-eligible combinations populated (no mode-axis layered).
- 884 / 28,974 = **3.0%** of mode-layered combinatorial space populated.
- 884 / 55,000 = **1.6%** of operator's long-term ceiling.

**Cadence framing:** at 500 decks/day cadence the catalog reaches operator's 55k-target in ~110 days of full-cadence Track C. Population is a stale signal at this growth rate — it changes monthly.

### Magnitude communication (corrected framing)

Headline copy options:
- **"29 exercise types × 100 themes × 11 languages = 14,487 publish-eligible worksheet variants."** (Strongest axis-product framing per operator's spec; matches §6 amendment.)
- **"Every classroom theme. Every K-3 exercise type. In your language."** (Audience-natural framing without numerics.)
- **"Worksheets in 11 languages, across 100 themes, across 29 exercise types."** (Comma-separated axis enumeration.)

**Anti-pattern (current state):** "A few decks from across the catalog" + 9 sample tiles. Small-population framing.

---

## Phase 3 — Competitor / reference benchmark

5 reference sites surveyed. 4 successfully fetched; 1 (Liveworksheets) blocked at 403.

### 1. Education.com

| Dimension | Observation |
|---|---|
| Above-fold | Hero ("Where learning blooms") + tagline + "Join for free" CTA + 4-category icon strip |
| Magnitude | **Explicit counter** — "38,000+ teacher-created worksheets, hands-on activities, and learning games" (above + repeated below) |
| Variety | 4-category icon strip below fold (Lesson Plans, Worksheets, Games, Activities) — visible-at-a-glance |
| Browse-paths | Dive right in → /resources/. Per-category: /resources/worksheets/, /resources/lesson-plans/, /resources/games/, /resources/activity/ |
| Embed-affordance | None visible above fold |
| Locale switcher | None |

**Architectural takeaway:** counter-driven magnitude + below-fold category-icon strip. English-only.

### 2. Twinkl (Sweden locale shown)

| Dimension | Observation |
|---|---|
| Above-fold | Header (logo + search bar + Trial CTA + locale "SV" flag) + Swedish hero + horizontal nav (EYFS, KS1, KS2, etc.) |
| Magnitude | Implicit counter ("over 1,000,000 resources") + nested-menu-depth |
| Variety | Persistent horizontal grade-level nav; expanding hover dropdowns; search-driven |
| Browse-paths | Grade levels (EYFS, KS1-5), specializations (Inclusion, Leaders, INA, ESL), tools (Ari Ai), search |
| Embed-affordance | None |
| Locale switcher | **Yes — flag icon ("SV") with country selector** (Twinkl ships separate per-country sites) |

**Architectural takeaway:** UK-curriculum nav-driven; locale-as-country-site, not in-page locale switching; subscription-funnel-focused.

### 3. K5 Learning

| Dimension | Observation |
|---|---|
| Above-fold | Header (logo + search + Sign Up / Log In) + 6-subject persistent nav (Math, Reading, Kindergarten, Vocabulary, Spelling, Grammar & Writing) + hero ("Free Worksheets") + 3-card content grid (Worksheets / Workbooks / Membership) |
| Magnitude | Implicit ("Reading, math and more for K-Grade 5"); breadth via 6 subject categories visible above fold |
| Variety | 6-subject nav with dropdown sub-categories; 3-card route split (free worksheets / paid workbooks / membership) |
| Browse-paths | 6 subject pages; 3 CTAs (Browse worksheets / Shop workbooks / Learn about membership) |
| Embed-affordance | None |
| Locale switcher | None |

**Architectural takeaway:** subject-as-axis above fold; 6 visible subjects; lower density than Education.com.

### 4. Super Teacher Worksheets

| Dimension | Observation |
|---|---|
| Above-fold | Header (logo + search) + subject-menu (~15 subjects) + grade-level button strip (Pre-K through Grade 6) + 4 featured content cards (Five Senses, Frog Life Cycle, etc.) |
| Magnitude | Implicit via category breadth + grade strip; no explicit counter; "More X Worksheets" labels signal depth |
| Variety | Multi-level subject hierarchy (Math → Addition → Basic vs. Multi-Digit) + grade buttons + featured seasonal cards |
| Browse-paths | 6+ visible: subject menu, grade-buttons, "What's New", featured cards, search, full website index |
| Embed-affordance | None |
| Locale switcher | None |

**Architectural takeaway:** highest-density of the four; subject-AND-grade dual axes both visible above fold; thematic featured cards as secondary surface.

### 5. Liveworksheets (blocked, 403)

Could not fetch; flagging as Phase 3 limitation per the commission halt-surface spec. From general knowledge / operator-supplied framing: Liveworksheets is the canonical reference for embed-affordance + user-shared interactive worksheets. The architectural takeaway expected (not empirically verified): embed-affordance is a primary surface; teachers create + share interactive worksheets and embed them in their own sites.

### Synthesis — what works architecturally vs LCS's distinct opportunity

**Patterns shared across the 4 reachable benchmarks:**
- **Browse-path CTAs above fold** (4-of-4): catalog axes surface within the 0-3s window in all of them.
- **Magnitude communication of some form** (4-of-4): explicit counter (Education.com, Twinkl) OR breadth-of-categories (K5, SuperTeacher).
- **Subject/category as primary axis** (4-of-4): every benchmark leads with subject-category nav.

**Patterns NONE of the 4 do:**
- **Embed-affordance above fold** (0-of-4): embed is footer-only across all benchmarks where it appears.
- **In-page locale switching** (0-of-4 for English-first sites; Twinkl uses per-country site separation): no benchmark surfaces 11 locales as visible breadth.
- **Theme-as-axis surfacing** (0-of-4): themes are content-within-worksheets, not a browsable axis.

**LCS's distinct positioning differentiators (clean architectural opportunity):**
1. **11-language visible breadth as primary signal.** Twinkl proves locale matters but ships separate country sites; LCS's single-site 11-locale model is structurally distinct.
2. **Embed-affordance as primary surface.** Per §1 acquisition flywheel doctrine, embed-virality is the SEO mechanism. No benchmark does this; surfacing it above fold is unambiguous differentiation.
3. **Theme-as-axis surfacing.** 100 themes as a browsable-tile-strip is structurally distinct from competitor's content-within-worksheets framing.
4. **K-3-only specificity.** Every benchmark spans broader grade ranges (K-5, K-6, EYFS through KS5). LCS's K-3 audience focus is sharper; the homepage should signal this rather than dilute toward broader audiences.

**Architectural rule (anti-copy):** The four benchmarks teach what works structurally (browse-paths above fold + magnitude signal); LCS's homepage should adopt those structural patterns AND surface its distinct positioning differentiators (1-4 above) rather than mirror competitor surfaces.

---

## Phase 4 — Structural redesign alternatives

Three alternatives, each satisfying all mandatory elements (29-type grid, prominent locale switcher, theme strip, axis-product framing in copy, repositioned samples, distinct browse-path CTAs, embed affordance, mobile/desktop notes, SEO assessment, scope estimate). They differ at architectural level on:

| Architectural variable | Alt A — Density grid | Alt B — Visual mosaic | Alt C — Search + browse-by-axis |
|---|---|---|---|
| 29-type surfacing | Full icon-grid above fold | Below mosaic; categorized clusters | Behind faceted "By exercise-type" axis-button |
| Theme surfacing | Horizontal scroll-strip below type-grid | **Leading mosaic above fold** (image-first) | Behind faceted "By topic" axis-button |
| Combinatorial-space copy | Headline + sub-headline literal axis-product | Sub-mosaic copy line | Search-result counter framing |
| Sample positioning | Single below-fold "see one in action" section | Single below-mosaic inline-play tile | Sample inline-play below search bar |
| Embed affordance | Primary nav entry "Embed any deck" + below-fold CTA panel | Inline copy near type-grid + nav entry | Above-fold CTA card + nav entry |

### Alternative A — Density grid (CC's recommendation)

**Wireframe (text):**

```
+-----------------------------------------------------------+
| Nav: Logo · Locale-strip(11 flags) · Embed · SignIn · Sub  |
+-----------------------------------------------------------+
| Hero (compact)                                              |
|   H1: "Worksheets in 11 languages, 29 exercise types,       |
|        100 themes."                                         |
|   Sub: "Built for K-3 dual-language and bilingual teachers."|
|   Inline-axis copy: "14,487 publish-eligible variants."     |
+-----------------------------------------------------------+
| Section A — Exercise-type grid (above-fold continuation)    |
|   29 icon tiles in 4-5 columns; each = SVG icon + label     |
|   Hover: "n decks in your locale"                           |
|   Click: → /<locale>/topic/<exercise-type-slug>/            |
+-----------------------------------------------------------+
| Section B — Theme strip (horizontal scroll)                 |
|   100 theme tiles; each = thumbnail + theme-name            |
|   Click: → /<locale>/topic/<theme-slug>/                    |
+-----------------------------------------------------------+
| Section C — "See one in action" (single inline-play tile;   |
|   reuses BreadthGrid featured-tile renderer)                |
+-----------------------------------------------------------+
| Section D — Embed flywheel CTA panel                        |
|   "Put any LCS deck on your site. Free. No account."        |
|   → Embed snippet generator example + 3-step explainer       |
+-----------------------------------------------------------+
| Section E — Language proof (existing LanguageProof comp)    |
+-----------------------------------------------------------+
| Section F — Free-experience capability blocks (existing)    |
+-----------------------------------------------------------+
| Section G — Subscription (existing SubscriptionSection)     |
+-----------------------------------------------------------+
| Footer (existing; unchanged)                                |
+-----------------------------------------------------------+
```

**Magnitude-signal placement:** above-fold (axis-product copy in Hero + 29-icon grid) + 1-3s zone (theme strip).

**Variety-signal placement:** Hero copy literal + visible 29 icons + 100 theme tiles (scrollable).

**Theme-axis surfacing:** Horizontal scroll-strip with thumbnail-per-theme; immediate-tap navigates to topic destination page per §16.5.

**Browse-path CTAs:** Three first-click axes — exercise-type icon click (29 paths), theme tile click (100 paths), language flag click (11 paths). All three above-fold.

**Embed-affordance placement:** (a) primary nav entry "Embed" in top bar; (b) Section D dedicated panel with snippet preview + 3-step explainer. Per §1 acquisition flywheel.

**Locale-switcher placement:** **11-flag visible strip in nav** (replaces the dropdown LanguageSelector). Each flag = direct hover preview + click swaps locale. On mobile, flags collapse into a 3-row strip or stay scrollable.

**Mobile vs desktop:**
- Desktop (≥lg): 29 icons in 5 cols × 6 rows or 4 cols × 8 rows; theme strip horizontal; nav single row.
- Tablet (md): 29 icons in 4 cols × 8 rows; theme strip horizontal; nav single row with flag-strip wrap.
- Mobile (<md): 29 icons in 3 cols × 10 rows (full grid still visible after one tap-scroll); theme strip horizontal scroll (touch-native); nav: logo + locale-flag-strip wraps to 2 rows; SignIn/SignUp may collapse to hamburger.

**SEO assessment:**
- All 29 type-tiles + 100 theme-tiles + 11 locale-links are server-rendered crawler-bait. ~140 internal links above fold per locale × 11 locales = ~1,540 link-graph cross-references generated by the homepage alone.
- Hero h1 is text (LCP element); axis-product copy is text + crawlable.
- Schema.org Organization + WebSite already present (page.tsx:71-105); no schema regression.
- Locale-specific homepage variants per crawler discoverability: already done via [locale] route segment + hreflang alternates.
- LCP risk: 29 icon assets above fold add ~29 × <5KB SVG = <150KB; lazy-loadable below first row. Still hits §17.4's <2.5s LCP target if icons are inlined SVG or sprite.

**Implementation scope estimate:** ~600-900 LOC across:
- `homepage-v2/ExerciseTypeGrid.tsx` (~200 LOC; 29 icons + per-locale-counts query)
- `homepage-v2/ThemeStrip.tsx` (~150 LOC; 100 tiles + image lazy-load)
- `homepage-v2/EmbedFlywheelCTA.tsx` (~120 LOC; static panel + snippet preview)
- `homepage-v2/Hero.tsx` rewrite (~80 LOC; axis-product copy + compact layout)
- `Navigation.tsx` extension (~80 LOC; locale-flag-strip + Embed nav entry)
- 29 SVG icons (one per exercise-type) — design asset, may exist in product files
- ~100 thumbnail assets (one per theme) — likely already exist in `image_themes` table
- i18n strings × 11 locales for new copy keys (~60 keys × 11 = 660 entries; bulk-author with NSR-flag for Nordic per §17.5.1)

**Estimated arc count:** 1 Phase-4-style commission, 2-3 sessions to ship cleanly. Larger if SVG icons need design-side authoring.

---

### Alternative B — Visual mosaic (theme-tile-driven, image-first)

**Wireframe (text):**

```
+-----------------------------------------------------------+
| Nav: Logo · Locale-flags(11) · Embed · SignIn · SignUp     |
+-----------------------------------------------------------+
| Hero — Mosaic-overlay (above-fold)                         |
|   Background: 6-8 large theme thumbnails in masonry grid   |
|   Foreground overlay text:                                  |
|     H1: "Every classroom theme. K-3, in your language."    |
|     Sub: "29 exercise types × 100 themes × 11 languages."  |
|     CTA: "Browse the catalog →" → /<locale>/browse/        |
+-----------------------------------------------------------+
| Section A — Exercise-type grid (below mosaic)              |
|   29 tiles, possibly clustered (Math, Letters, Logic,      |
|   Spatial-reasoning per topics-taxonomy.json subjects)     |
|   Each cluster heading + 5-8 type-tiles per cluster        |
+-----------------------------------------------------------+
| Section B — Inline play sample (single featured tile)      |
+-----------------------------------------------------------+
| Section C — Embed CTA (inline strip near type-grid)        |
+-----------------------------------------------------------+
| Section D — Language proof (existing)                      |
+-----------------------------------------------------------+
| Section E — Free-experience (existing)                     |
+-----------------------------------------------------------+
| Section F — Subscription (existing)                        |
+-----------------------------------------------------------+
| Footer (existing)                                           |
+-----------------------------------------------------------+
```

**Magnitude-signal placement:** above-fold via mosaic image-density + sub-headline axis-product copy.

**Variety-signal placement:** mosaic itself communicates variety visually (no copy needed); 29-tile clustered grid below absorbs by image-scan.

**Theme-axis surfacing:** **leading mosaic** above fold = 6-8 large theme thumbnails; click any → topic destination page. Remaining ~92 themes accessible via "Browse all themes" link or scroll.

**Browse-path CTAs:** mosaic-tile click (theme nav) + clustered exercise-type tile click + locale flag click. Search bar optional in nav.

**Embed-affordance:** (a) nav entry "Embed"; (b) inline CTA strip between type-grid and language-proof.

**Locale-switcher:** 11 flags in nav (identical to Alt A).

**Mobile vs desktop:**
- Desktop: 6-8 mosaic tiles in 3-4 col grid; type-grid clustered below.
- Tablet: 6 mosaic tiles in 2-3 cols; type-grid 4-col clustered.
- Mobile: 4 mosaic tiles in 2 cols; type-grid 3-col clustered. Mosaic must remain visually impactful at narrow widths.

**SEO assessment:**
- Mosaic tiles are crawlable (img + alt + link). ~6-8 above-fold tile links + remaining ~92 below-fold + 29 type-tiles + 11 locale-links.
- Image-density above fold = LCP risk; biggest mosaic image must be `priority` + WebP + ~80% quality.
- Less above-fold text than Alt A (text-density lower); search-snippet impact slightly weaker.
- Locale-specific mosaics could use locale-specific image emphasis (e.g., German mosaic includes `tiere` over `animals`); operator-strategic per locale.

**Implementation scope estimate:** ~500-700 LOC across:
- `homepage-v2/ThemeMosaic.tsx` (~200 LOC; selection + masonry layout)
- `homepage-v2/ExerciseTypeClusters.tsx` (~250 LOC; clustered grid; reads `apps.*.default_subject` per §16.4.1)
- `homepage-v2/Hero.tsx` rewrite (~50 LOC; overlay-text on mosaic)
- `Navigation.tsx` extension (~80 LOC; same as Alt A)
- ~100 theme thumbnails (likely exist; high-quality renders required for visual-first surface)
- i18n × 11 locales for new copy (~30 keys × 11 = 330 entries)

**Estimated arc count:** 1 commission, 2 sessions. Risk: mosaic visual quality is the differentiator; thumbnail-quality bar is high.

---

### Alternative C — Search + browse-by-axis (self-direction-first)

**Wireframe (text):**

```
+-----------------------------------------------------------+
| Nav: Logo · Locale-flags(11) · Embed · SignIn · SignUp     |
+-----------------------------------------------------------+
| Hero — Search-prominent                                     |
|   H1: "Find a worksheet."                                   |
|   Sub: "29 exercise types × 100 themes × 11 languages."    |
|   [Large search bar]                                        |
|   "or browse by:"                                           |
|   [Big button: By language] [By topic] [By exercise-type]  |
|     [By age-range]                                          |
+-----------------------------------------------------------+
| Section A — Inline play sample (single featured tile)      |
|   Below search; "Or play a sample now"                      |
+-----------------------------------------------------------+
| Section B — Embed CTA card (above-fold-adjacent)           |
+-----------------------------------------------------------+
| Section C — Language proof (existing)                      |
+-----------------------------------------------------------+
| Section D — Free-experience (existing)                     |
+-----------------------------------------------------------+
| Section E — Subscription (existing)                        |
+-----------------------------------------------------------+
| Footer (existing)                                           |
+-----------------------------------------------------------+
```

**Magnitude-signal placement:** Hero sub-headline axis-product copy + 4 axis-buttons signaling 4 ways to browse.

**Variety-signal placement:** axis-buttons name the variety dimensions; copy carries the magnitude.

**Theme-axis surfacing:** behind "By topic" button → routes to faceted browse with theme-tile grid as filtered surface.

**Browse-path CTAs:** 4 large axis-buttons + search bar (5 first-click paths total).

**Embed-affordance:** (a) nav entry "Embed"; (b) above-fold-adjacent card with embed snippet preview.

**Locale-switcher:** 11 flags in nav (identical to Alt A/B).

**Mobile vs desktop:**
- Desktop: search-bar 60% width; 4 axis-buttons in single row.
- Tablet: search-bar full-width; 4 axis-buttons in 2 rows × 2 cols.
- Mobile: search-bar full-width; 4 axis-buttons stack vertically (4 rows).

**SEO assessment:**
- Lowest text-density above fold; weakest crawler-bait of the three alternatives.
- 4 axis-buttons + 11 locale-flags + nav-entries = ~16 above-fold links (vs Alt A's ~140 via 29-icon grid).
- Search is JS-driven (typically); search-result pages need server-rendering for crawl-bait or live behind a query-string-driven faceted-browse infrastructure that already exists for §16.8.
- The 4 axis-buttons each link to existing route surfaces (`/locale` for "By language" filter; `/locale/browse/` for theme/exercise-type/age).
- Locale-specific homepage same as Alt A.

**Implementation scope estimate:** ~300-450 LOC across:
- `homepage-v2/SearchHero.tsx` (~150 LOC; search input + axis-button strip)
- `homepage-v2/EmbedCard.tsx` (~120 LOC; same as Alt A's panel scaled smaller)
- `Navigation.tsx` extension (~80 LOC; same as Alt A/B)
- i18n × 11 locales (~20 keys × 11 = 220 entries)
- Search backend: existing `/api/search` if present, OR client-only on top of static data, OR new infrastructure (out-of-scope flag if not present)

**Estimated arc count:** 1 commission, 1-2 sessions if search infrastructure exists; +1-2 sessions if new search backend required.

---

### CC's recommendation

**Alternative A (density grid).** Reasoning per operator-stated priorities:

1. **SEO surface** — A produces ~140 above-fold internal links per locale (29 type-tiles + 100 theme-tiles + 11 locale-links). B produces ~50 (mosaic + clustered type-grid). C produces ~16. SEO discipline per §17.4 ranks A strongest; structural-axis-magnitude doctrine suggests every axis-key should be a visible above-fold link if reasonably possible.
2. **3-second-budget** — A communicates magnitude AND variety in 0-1s zone (Hero copy + visible 29-grid + 11-flag strip). B communicates variety strongly via mosaic but magnitude via sub-headline only; copy carries less. C communicates magnitude via copy but defers variety to post-click; teachers must self-direct (higher cognitive load).
3. **Embed-virality** — Embed CTA is a primary nav entry in all three; A integrates a dedicated below-fold panel that doubles as embed-virality marketing. The dedicated panel converts visitors-arriving-via-embed into return visitors more cleanly.
4. **Distinct positioning** — A surfaces all four LCS differentiators (multilingual flag-strip, embed CTA, theme-axis tiles, K-3 specificity in hero) with the highest density. None of the four reachable competitors does this.

Tradeoffs against A:
- **Visual density** vs. design simplicity — A is busier than B's image-first approach. If operator's brand-aesthetic priority is "calm, beautiful, focused," B may be the better fit.
- **Implementation scope** — A has highest LOC + asset dependency (29 SVG icons + 100 theme thumbnails). B and C are smaller commitments.
- **Power-user vs first-time-visitor** — C serves return-visitors who know what they want; A serves first-time-visitors absorbing breadth.

**If operator chooses B**: B is a strong second; visual-first works particularly well for the multilingual-K-3 audience because thumbnail variety reads cross-culturally without translation. The mosaic must be operator-curated (not auto-selected) to maintain brand quality.

**If operator chooses C**: C trades SEO surface for first-visit deliberation simplicity. Acceptable IF the operator's empirical conversion data shows visitors abandon high-density homepages, which we don't have data for. Risk: SEO-led organic growth (per §1 strategic path) leans on the homepage as a crawl-bait surface; reducing crawl-bait reduces the SEO compounding effect.

**Hybrid candidate (not enumerated; flag for operator):** Alt A + Alt B's mosaic as a section-D below the type-grid (replacing the embed CTA with the mosaic, and moving embed CTA to a footer-adjacent strip). Trades some embed prominence for visual-richness; preserves SEO surface. Surface for operator if hybridization is preferred.

---

## Phase 5 — Implementation roadmap (post-lock)

If operator locks Alternative A:

**Arc 1 — Substrate + design assets** (1 session):
- 29 SVG icons (design-side; may be from existing operator design library OR commission a separate design pass).
- ~100 theme thumbnail assets (likely already exist in `image_themes`; verify resolution).
- i18n key set authoring across 11 locales (en + de operator-authored; tier 2 mirroring; Nordic + Romance NSR-flagged per §17.5.1).

**Arc 2 — Component construction** (1-2 sessions):
- `ExerciseTypeGrid.tsx` + `ThemeStrip.tsx` + `EmbedFlywheelCTA.tsx` + `Hero.tsx` rewrite + `Navigation.tsx` extension.
- DB-backed per-locale-deck-count query (reuse existing patterns from `selectBreadthGridDecks`).
- ISR `revalidate=3600` matching existing homepage pattern.

**Arc 3 — Integration + verification** (1 session):
- Wire into `frontend/app/[locale]/page.tsx` page.
- Remove BreadthGrid from primary slot; reposition as Section C "see one in action."
- Verify §16.6 footer doctrine intact (footer remains structural fallback).
- Mobile + desktop visual regression check at 375px / 768px / 1024px / 1440px viewports.
- LCP measurement vs §17.4 <2.5s target.
- Spot-check per §A.13.1 zoom-in label-readability discipline (29 icon labels + theme labels + nav labels).

**Arc 4 — Translation NSR pass** (1 session, deferred if not blocking):
- Native-speaker review of Nordic (sv/da/no/fi) + Romance (fr/it/pt) chrome strings authored at Arc 1.

Total estimated commitment: **3-4 sessions** (Arc 4 may defer until first Track C wave in newly-substrated locales).

If operator locks B: similar arc shape, lower asset dependency, slightly fewer sessions. If C: smallest commitment, may fit in 2 sessions.

---

## Phase 3 limitation flag

Liveworksheets returned 403 on WebFetch attempt. The architectural takeaway expected from that benchmark (embed-affordance as primary surface) is operator-supplied rather than empirically verified at audit time. If operator wants explicit Liveworksheets recon, a separate audit-style WebFetch attempt from a different IP or a manual operator-side screenshot pass would close the gap.

---

## Doctrine carry-forward (filed for next [DOCS] fold cycle)

This audit surfaces three doctrine-class observations worth promoting at next [DOCS] fold:

1. **Magnitude communication via structural-axes vs population-count.** Operator-foundation framing: "operator authors against the space; today's count is a snapshot growing at cadence." The pattern applies broadly — anywhere CLAUDE.md uses "N decks" / "X published" framing, that's a stale signal at growth rate. Future surfaces (footer copy, blog posts, marketing pages, structured data) should follow axis-product framing. Target section: §1 SEO-first emit-site framing extension (sibling to existing SEO-as-structural-design-principle in §17.4) OR new principle subsection.

2. **Crawl-bait-density as homepage SEO surface metric.** Above-fold internal-link count is a measurable proxy for SEO-surface-strength on the homepage. Useful framing for evaluating future redesigns; pairs with §17.4's existing "crawlability and internal linking" doctrine.

3. **Embed-virality CTA as first-class homepage surface.** Per §1 acquisition-flywheel doctrine, embed is a distribution mechanism; the homepage should make the affordance discoverable in the 0-3s window. None of the 4 reachable competitor homepages do this; gap = LCS-distinct-opportunity. Surfaces as homepage-architecture conviction; operationalizes the §1 acquisition-flywheel framing for the home surface specifically.

---

*End of audit.*
