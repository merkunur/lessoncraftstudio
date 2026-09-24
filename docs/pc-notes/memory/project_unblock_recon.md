# project_unblock_recon.md

**Authored:** 2026-05-03 (post `3569be97` admin-bypass deploy + project_mass_publish_recon.md morning)
**Scope:** read-only inventory of structural blockers between deck authoring and successful publish, across the full combinatorial space of 11 locales × 29 apps × 50 color themes (+ themeless variants).
**Status:** read-only. Zero commits, pushes, deploys, or DB writes. Document persists at `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\project_unblock_recon.md` (same convention as project_mass_publish_recon.md from this morning).

---

## Section 1 — Theme registry: the actual 50 color themes

### 1.1 Canonical source of theme registry

**The canonical source is the `image_themes` Postgres table** (per Prisma `ImageTheme` model at schema.prisma:393-408), not `REFERENCE CONTENT MANAGERS/content-manager-v2.html`. The content-manager HTML is the *editor UI* that loads themes from the API which queries the `image_themes` table; it does not embed a static theme list (the 241 mentions of "theme" are all UI logic referring to `currentData.themes` which is fetched at runtime).

**Empirical state (Hetzner query, post-`3569be97`):**

```
117 ImageTheme rows total
  100 of type='images'    (50 color + 50 bw variants)
   12 of type='backgrounds' (color: 4th_of_july_bg, autumn_bg, beach_bg, classroom_bg, farm_bg, flowers_bg, jungle_bg, sky_bg, spring_bg, summer_bg, underwater_bg, winter_bg)
    5 of type='borders'   (borders_1 through borders_5)
```

**All 117 themes have full 11-locale `displayNames` JSON.** Every row in `image_themes.displayNames` covers all of: `da, de, en, es, fi, fr, it, nl, no, pt, sv`. **The per-locale theme name mapping the operator asked about is the `displayNames` Json field.** No external mapping file exists (no `themes.json`, no companion in REFERENCE CONTENT MANAGERS/, no equivalent in scripts/v2-data/).

**Verification sample (`4th_of_july_bg.displayNames`):**
```json
{
  "da": "4. juli",
  "de": "4. Juli",
  "en": "4th of July",
  "es": "4 de Julio",
  "fi": "Heinäkuun 4.",
  "fr": "4 juillet",
  "it": "4 luglio",
  "nl": "4 juli",
  "no": "4. juli",
  "pt": "4 de Julho",
  "sv": "4 juli"
}
```

**The 50 color themes (`type='images'`, excluding bw variants):**

```
4th_of_july             accessories            activities             animals
around_the_house        at_the_supermarket     bakery                 beach
birds                   birds_2                body_parts             breakfast
camping                 christmas              classroom              clothing
colors                  desserts_and_sweets    dinosaurs              easter
emotions                farm_animals           flowers                forest_creatures
fruits                  furniture              hospital               insects_and_bugs
kitchen_tools           miscellaneous          music                  occupations
ocean_life              pets                   post_office            reptiles_and_amphibians
shapes                  space                  spring                 summer
thanksgivinng           things_that_fly        tools                  toys
tree                    vegetables             vehicles               weather
winter                  zoo_animals
```

(50 themes; matches operator's claim. The `bw` variants — animals_bw, animals_bw_2, etc. — are 50 additional rows in `image_themes` and are explicitly out of scope per operator's brief.)

### 1.2 Per-locale folder-name mapping

**The image-library filesystem dirs** at `/var/www/lcs-media/image-library/` use English-canonical names (with case drift: `Bakery` and `bakery` both exist as duplicate-cased directories on the filesystem). **Per-locale folder names are NOT used at the filesystem layer** — the filesystem dir is one English-canonical folder per theme (with duplicate-cased entries from historical drift); per-locale image *vocabulary* lives in the `image_library_items.translations` Json column (per CLAUDE.md §A.7) and the `image_themes.displayNames` Json for theme-level naming.

**Filesystem case-drift** (non-blocking):
- `bakery` and `Bakery` both exist as image-library dirs
- `beach`, `Beach`, `Beach BW`, `beach bw`, `Beach BW 2`, `beach bw 2` all coexist
- This is an artifact of cross-platform case-insensitive filesystems imported into a case-sensitive Linux fs. Operator-strategic to clean up; not blocking publish work.

**Per-locale folder-name conventions don't exist** — the operator's brief's framing assumed they did, but the empirical state is that the per-locale information lives in DB JSON, not in the filesystem hierarchy. This refines the brief's premise.

### 1.3 Gap: topics-taxonomy.json registers only 4 themes

**topics-taxonomy.json `axes.theme` (post-`3569be97`):**

```
animals → slug:{en:animals, de:tiere, es:animales, nl:dieren} + name:{en:animal, de:Tier, es:animal, nl:dier}
vehicles → slug:{en:vehicles, de:fahrzeuge, es:vehiculos, nl:voertuigen} + name:{en:vehicle, de:Fahrzeug, es:vehículo, nl:voertuig}
food → slug:{en:food, de:essen, es:comida, nl:eten} + name:{en:food, de:Essen, es:comida, nl:eten}
fruit → slug:{en:fruit, de:obst, es:frutas, nl:fruit} + name:{en:fruit, de:Obst, es:fruta, nl:fruit}
```

**4 of 50 color themes registered in topics-taxonomy.json axes.theme; 46 unregistered.**

**Conceptual layer mismatch surfaced in this recon:**

| Layer | Granularity | Current state |
|---|---|---|
| 1: `image_themes.name` | Image-library directory granularity (50 color names) | 50 themes in DB with full 11-locale displayNames |
| 2: `topics-taxonomy.json axes.theme` axis-keys | Catalog-browsing labels (semantic) | 4 keys: `animals`, `vehicles`, `food`, `fruit` |
| 3: `Deck.subject_tags` | Free-string array on deck row | Only `animals` used in production (49 of 116 decks) |

**Layer 1 vs Layer 2 alignment is partial:**
- `animals` (layer 2 axis-key) → matches DB `animals` (1:1)
- `vehicles` (layer 2 axis-key) → matches DB `vehicles` (1:1)
- `fruit` (layer 2 axis-key) → DB has `fruits` (plural mismatch)
- `food` (layer 2 axis-key) → **NO matching DB theme** (DB has `bakery`, `breakfast`, `desserts_and_sweets`, `at_the_supermarket`, `kitchen_tools` — food-adjacent but no theme named just `food`); the `food` axis-key currently functions as a semantic aggregation that no deck actually uses

This means the operator faces a **decision point on registration approach**:

- **Path X (1:1 alignment with image-library):** register all 50 image_themes names as topics-taxonomy.json axis-keys; deck subject_tags map directly to image_themes.name; URL slugs derive from image_themes.displayNames. Pros: clean granularity match; per-locale slugs auto-derivable. Cons: catalog gets fine-grained (50 theme topic pages per locale = 300 topic pages at 6-main-locales scale); some image-library themes may not be K-3-distinct enough to warrant their own browsing axis.
- **Path Y (semantic aggregation in topics-taxonomy.json):** keep layer 2 as semantic labels (animals, vehicles, food, fruit, plus more aggregations like seasonal, occupations, etc.); deck subject_tags set to semantic labels; aggregation-to-DB-theme mapping lives in operator-authoring choices. Pros: catalog stays human-shaped; fewer topic pages. Cons: requires per-deck operator decision on which semantic label to apply; current `food` axis-key is in this state and has 0 decks.
- **Path Z (hybrid):** some axis-keys are 1:1 with image-library themes (animals → animals, dinosaurs → dinosaurs); some are aggregations (food = bakery + breakfast + desserts_and_sweets + kitchen_tools + at_the_supermarket); operator authors per case.

This recon does NOT pick. The mismatch is surfaced for operator decision before any registration commission ships.

### 1.4 Per-axis-key registration scope

Assuming Path X (the simplest): **register all 50 image_themes color-theme names as topics-taxonomy.json axis-keys with per-locale slug-maps.**

| Component | Current state | Path X target | Authoring scope |
|---|---|---|---|
| Axis-keys in topics-taxonomy.json axes.theme | 4 | 50 | Add 46 entries (or 47 if `food`/`fruits` resolve via rename) |
| Per-locale slug-maps | 4 themes × 4 locales = 16 entries | 50 themes × 11 locales = 550 entries | Add 534 entries (auto-derivable from image_themes.displayNames + slugify) |
| Per-locale `name` maps (used by §17.8.2 end-of-deck-link interpolation) | 4 × 4 = 16 entries | 50 × 11 = 550 entries | Add 534 entries (auto-derivable from image_themes.displayNames) |
| Footer Col 2 entries (FOOTER_TOPICS_BY_LOCALE) | 4 themes × 4 locales (currently per §16.6) | 50 × 11 = 550 (or 50 × N where N = launched locales) | Add per-locale incrementally |
| i18n string keys for theme-axis chrome | n/a (slug-driven render only) | n/a | Zero — chrome doesn't reference themes by static i18n key |

**Slug auto-derivation rule:** for each (theme, locale), `slug = slugify(displayNames.<locale>)` per CLAUDE.md §17.8.5 ASCII-fold spec. Example for `4th_of_july`:
- en: "4th of July" → `4th-of-july`
- de: "4. Juli" → `4-juli`
- pt: "4 de Julho" → `4-de-julho`
- fi: "Heinäkuun 4." → `heinakuun-4`

This is mechanical; operator-strategic only at edge cases (does pt-BR want `4-de-julho` or `dia-da-independencia`? Different theme name entirely?). Most themes auto-derive cleanly.

---

## Section 2 — Locale registration: the 7 currently-blocked locales

### 2.1 Per-locale layer state

Confirming project_mass_publish_recon.md §A1's findings:

| Layer | en | de | es | nl | fr | pt | it | sv | da | no | fi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `TOPIC_LOCALES` registration | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| topics-taxonomy.json slug-map coverage (38 axis-keys) | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| topics-taxonomy.json `name`-map coverage | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| messages/{locale}.json: `homepage` + `footer` namespaces | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| messages: `topicPage` namespace | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| messages: `workspace` namespace | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| messages: `collections` namespace | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| messages: `lessonPlanReader` namespace | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| `image_library_items.translations` per-locale | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `image_themes.displayNames` per-locale | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Vocabulary system 11-language coverage (image-vocabulary.js) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Layer-by-layer interpretation:**
- **Image-library + vocabulary layers are complete for all 11 locales.** The `image_library_items.translations` JSON column has 11-locale coverage (post-2026-03-03 per CLAUDE.md §A.7); `image_themes.displayNames` has 11-locale coverage on every row; `REFERENCE TRANSLATIONS/image-vocabulary.js` has 1,246 unique images × 11 locales × correct gender/plural per CLAUDE.md §A.7. No image-side gap to close for the 7 blocked locales.
- **Chrome layer is split:** homepage + footer chrome shipped to all 11 locales; the 4 namespaces required for catalog navigation + reader (topicPage, workspace, collections, lessonPlanReader) shipped only to en+de+es+nl.
- **Structural registration layer is en+de+es+nl only:** TOPIC_LOCALES + topics-taxonomy.json slug/name maps gate any topic-page render.

### 2.2 Track-by-track unblock potency

For each of the 7 blocked locales, what does each track unblock?

| Track | Scope | What it unblocks | Sufficient minimum for deck-publish? |
|---|---|---|---|
| Track A | TOPIC_LOCALES + topics-taxonomy.json slug+name maps for all 38+ axis-keys | Topic-page render at all (the `resolveTopicSlug` lookup; `axisLookup` no longer throws on locale-miss) | **Yes** — without Track A, every topic-page URL for the locale 404s |
| Track B Wave 1 | `topicPage` namespace authoring | Topic-page chrome (heading copy, deck count, intro paragraph, JSON-LD schema strings) | Required for non-broken topic-page render; without it, missing-message stubs surface |
| Track B Wave 2 | `workspace` + `collections` + `bulk` + `share` namespaces | Subscriber-surface chrome (workspace home, collection management, bulk actions, share affordance) | NOT required for deck publish; subscriber surfaces are downstream of publish |
| Track B Wave 3 | `lessonPlanReader` namespace | Lesson-plan reader chrome (CLIL section headings, duration labels, gate prompts) | NOT required for deck publish; lesson-plan reader is downstream of Pillar 1 lesson-plan authoring |
| Track C | Deck-creation × N batches | Actual deck inventory in the locale | The publishable end-state |

**Sufficient minimum for "permit deck publishing in a new locale" is Track A + Wave 1.** This is a refinement of the project_mass_publish_recon.md §A2 framing which lumped Wave 2 into the "launch arc" sequence. For pure unblock-deck-publishing purposes, Wave 2 + Wave 3 are subscriber-side downstream chrome that can ship later without blocking deck publish.

**Operator's "permit any combination" goal therefore needs:**
- Track A for all 7 blocked locales (~7 commits; mechanical authoring once axis-key list is locked + per-locale slug-maps auto-derive from image_themes.displayNames + translations)
- Wave 1 for all 7 blocked locales (~7 commits; authoring `topicPage` namespace per locale)
- **Total: ~14 commits to unblock deck-publish in all 7 locales** (excluding Wave 2/3 + actual deck-content authoring which is per-locale per-deck operator labor)

This is a smaller scope than the project_mass_publish_recon.md §A2 forecast of ~33 commits (which included Wave 2 + Wave 3 in the "launch arc"). For pure unblock purposes, the lighter ~14-commit scope is sufficient.

### 2.3 Per-locale operator-strategic decisions (decision points, not answers)

Per project_mass_publish_recon.md §A4 + extending to the full 7-blocked set:

**Portuguese (pt) — most divergent decision:**
- Brazilian Portuguese (pt-BR) vs European Portuguese (pt-PT) split. K-3 vocabulary divergence is meaningful: BR `caminhão`/`ônibus`/`trem` vs EU `camião`/`autocarro`/`comboio`. School terminology: BR `educação infantil`/`anos iniciais` vs EU `pré-escolar`/`1.º ciclo`.
- **Decision shape:** pick one canonical pt OR ship pt-BR + pt-PT as separate locales (which makes the "11 platform languages" become 12).

**Italian (it):**
- Less internal variation at K-3 vocabulary. Regional dialects exist but classroom Italian is standardized.
- **Classroom-idiom lock:** `scuola dell'infanzia` (3-5) / `scuola primaria` (6-10) per MIUR formal terms; informal `materna` / `elementari` widely used. Pick register for educational-level slugs.

**French (fr):**
- France vs Belgium vs Switzerland vs Quebec. Less consequential at K-3 than pt-BR/pt-PT but real. Belgium/Switzerland use `septante`/`nonante` for 70/90 vs Métropole `soixante-dix`/`quatre-vingt-dix`. Quebec orthography differs subtly.
- **Recommended canonical:** France French (Hexagonal) per audience size + international school alignment. Operator confirms.

**Swedish (sv) / Danish (da) / Norwegian (no):**
- Nordic-locale K-3 conventions less previously surfaced in this codebase. Norwegian has bokmål vs nynorsk written-form split; Norwegian Track A would need to lock bokmål as canonical (typical default for digital products). Danish + Swedish are more standardized.
- **Decision shape:** confirm canonical-only conventions for sv/da/no; flag NSR review per CLAUDE.md §17.5 since Claude's quality-assessment in these languages is weaker.

**Finnish (fi):**
- Standardized; no significant register splits. Case marking complexity (15 noun cases) affects sentence templates but not vocabulary register.
- **No major decision point;** Track A authoring is mechanical from image_themes.displayNames once it surfaces.

These are operator-strategic. This recon enumerates; doesn't pre-commit.

---

## Section 3 — Apps: 29-app surface vs operator's "any combination" goal

### 3.1 Per-app theme support (empirical)

Per project_mass_publish_recon.md §C1 + spot-check of REFERENCE APPS/ source files:

**13 apps emit themed decks today:**
```
addition, alphabet-train, bingo, chart-count, find-and-count, grid-match,
math-puzzle, missing-pieces, odd-one-out, shadow-match, subtraction,
treasure-hunt, word-guess
```

**17 apps emit themeless-only by design:**
```
big-small, code-addition, crossword, cryptogram, find-objects, matching,
math-worksheet, more-less, pattern-train, pattern-worksheet, picture-path,
picture-sort, picture-trail, prepositions, sudoku, word-scramble, wordsearch
```

**Per CLAUDE.md §3.2: app generation logic is not to be rewritten.** Themeless-by-design apps stay themeless-by-design. The 17 themeless apps emit decks with `subject_tags=[]` regardless of locale; this is invariant.

### 3.2 Themed-app theme allowlist analysis

**Sample inspection of the 13 themed apps' theme-selection logic** (REFERENCE APPS/addition.html, alphabet-train.html):

```js
// addition.html:2673-2678 — themes loaded dynamically from API
themeSelect.innerHTML = `<option value="all">${t('allThemes')}</option>`;
themes.forEach(theme => {
    const opt = document.createElement('option');
    opt.value = theme.name;
    opt.textContent = ...;
    themeSelect.appendChild(opt);
});

// addition.html:2702 — fallback when 'all' is selected
const res = await fetch(`/api/images?theme=animals&locale=${currentLocale}`);

// alphabet-train.html:2611 — same pattern
themeSelectEl.innerHTML = `<option value="all">${t('allThemes')}</option>`;
```

**Apps' theme dropdowns load from `/api/images` which queries the `image_themes` Postgres table.** No app source-file has a hardcoded theme allowlist narrower than the DB. **The operator's claim that "all 50 themes available to all 29 apps" verifies at the app source layer.**

The 17 themeless apps don't use the `themeSelect` dropdown for image-source selection (sudoku and similar use `themeSelect` for *filtering* image-library at deck-assembly time but emit themeless decks because the puzzle structure is theme-agnostic; the theme filter is generation-side narrowing, not catalog-side categorization).

### 3.3 Image-library "available to all apps" — verification

The image-library is mounted at `/var/www/lcs-media/image-library/` and served via `/api/images` API. All apps have access to the same image-library; no per-app namespace separation. This holds for all 29 apps.

**Themeless apps consume image-library THE SAME WAY as themed apps** but their generation logic doesn't tag the resulting deck with a theme. So sudoku CAN consume `dinosaurs` images at generation time; the resulting deck's manifest.theme stays `null` because sudoku's catalog-export logic doesn't propagate the theme-filter choice into manifest.theme.

This is per-app design intent and not a blocker. Operator's "any combination" goal includes themeless-app + theme variation at the image-source level; the resulting deck is themeless-by-catalog-classification regardless.

---

## Section 4 — publish-cli surface: validation gates

### 4.1 Validation layers in publish-cli

publish-cli source at `scripts/publish-cli/` (verified post-`3569be97`). Files: bulk.js, bundle.js, db.js, dry-run.js, extract-html-meta.js, i18n.js, index.js, og-image.js, place-assets.js, publish.js, scaffold-i18n-keys.js, slug.js, slug.test.js, strict-args.js, substitute.js, taxonomy.js, unpublish.js, updates-manifest.js.

| Layer | Source | Behavior | Gates? |
|---|---|---|---|
| Strict-args parser | strict-args.js | Schema-driven; rejects unknown flags + missing positionals; structured stderr | NO locale validation (no `VALID_LOCALES` constant); accepts any locale string |
| Bundle parse + validate | bundle.js:validateManifest | Required-field check on manifest.json | Per `REQUIRED_MANIFEST_FIELDS` set (not enumerated here; field-presence only, no value-range) |
| Slug generation | slug.js | ASCII-fold spec per §17.8.5; collision-suffix `-2`/`-3` | NO whitelist; any string slugs cleanly |
| Taxonomy lookup | taxonomy.js:axisLookup | **Throws** if axis-key not in `topics-taxonomy.json axes.<axis>` | **THIS IS THE THEME GATE.** Returns null on locale-miss (skip-and-warn); throws on axis-key-miss (hard fail) |
| DB write | db.js | Prisma schema-typed; FK to existing rows; @@unique enforcement | Schema-validated; no domain-level value gates |

### 4.2 The theme gate — empirical

`scripts/publish-cli/substitute.js:139-157`:

```js
var theme = manifest.theme;
var themeAxis = null;
if (theme) {
    themeAxis = taxonomy.themeFor(theme, locale);  // ← throws on unregistered theme
}
var linkMoreTheme = themeAxis ? '/' + locale + '/topic/' + themeAxis.slug + '/' : null;
note('__LINK_MORE_THEME__', themeAxis ? 'taxonomy' : (theme ? 'skip' : 'conditional skip (theme=null)'),
    linkMoreTheme || '', !themeAxis, theme && !themeAxis ? 'theme present but no taxonomy slug for locale; end-of-deck link skipped' : null);
```

`scripts/publish-cli/taxonomy.js:82-95`:

```js
function axisLookup(axis, axisKey, locale) {
  var t = load();
  if (!t.axes || !t.axes[axis]) {
    throw new Error('taxonomy.axisLookup: axis "' + axis + '" not in taxonomy.axes');
  }
  var entry = t.axes[axis][axisKey];
  if (!entry) {
    throw new Error('taxonomy.axisLookup: axis-key "' + axisKey + '" not in taxonomy.axes.' + axis);
  }
  // ...
}
```

**The gate behavior:**
- `manifest.theme = null` (themeless) → passes through; subject_tags = []; no end-of-deck theme link emitted.
- `manifest.theme = 'animals'` (registered axis-key) → succeeds; subject_tags = ['animals']; end-of-deck theme link emitted.
- `manifest.theme = 'halloween'` (unregistered axis-key) → **publish-cli throws** at substitute step. Publish FAILS.
- `manifest.theme = 'animals'` AND `locale = 'fr'` (registered axis-key, but slug-map missing for fr) → axisLookup returns `null` (locale-miss); substitute.js emits soft-warning, end-of-deck theme link skipped, publish SUCCEEDS.

### 4.3 Locale validation — empirical

**`strict-args.js` does NOT validate locale.** No `VALID_LOCALES` set, no allowlist check. Any locale string (e.g., `--language ja`) flows through to bundle.js validation (which checks manifest.language as field-presence) and then to taxonomy lookups (which return null on locale-miss for slug/name maps but don't throw).

**This means:** publish-cli would accept a manifest with `language: 'ja'` and (assuming the manifest's other fields are valid + theme is null OR theme is in taxonomy with no requirement on locale-slug) attempt to:
1. Generate a slug — succeeds (slug.js doesn't whitelist locale)
2. Compose URLs — succeeds
3. Substitute placeholders — succeeds with skip-and-warn for missing locale slug-maps in topics-taxonomy.json
4. INSERT a Deck row with language='ja'

The DB Deck row would land. Topic-page render at `/ja/topic/...` would 404 because TOPIC_LOCALES doesn't include `'ja'` (the topic-page route's `isTopicLocale(l)` check at line 39 returns false → notFound()). The deck.html itself at `/var/www/lcs-media/decks/ja/<slug>/` would be served by nginx and accessible directly.

**Consequence:** the operator's "permit any combination" goal at the publish-cli layer is **already permissive on locale.** It's the topic-page render layer that gates locale via TOPIC_LOCALES. The blocker is at chrome / catalog navigation, not at deck publish per se.

### 4.4 The schema-side check — Deck.subject_tags

**`Deck.subject_tags` is `String[] @default([])` — no enum, no FK, no check constraint.** Any string can land in the array. There is no DB-side validation of subject_tags against image_themes.name or topics-taxonomy.json axes.theme. The only validation fires at publish-cli substitute step (which the previous section maps).

This means: post-publish, a Deck can have `subject_tags = ['halloween']` (if it somehow bypassed the publish-cli substitute step — e.g., via direct DB INSERT). Catalog-side render handles this gracefully (Section 5).

---

## Section 5 — Catalog render surface at "unregistered theme present"

### 5.1 If a Deck has subject_tags=["halloween"] but "halloween" is unregistered in topics-taxonomy.json

**Important:** publish-cli currently REJECTS this scenario at the substitute step (Section 4.2). It can only occur via direct DB INSERT bypass. But assuming the operator wants to relax that gate (e.g., to permit publishing themed decks BEFORE topics-taxonomy.json is updated), here's the catalog-side behavior:

| Surface | Behavior | Honest? |
|---|---|---|
| Topic page at `/[locale]/topic/halloween/` | `resolveTopicSlug('halloween', 'en')` walks taxonomy.axes; no entry has `slug.en === 'halloween'`; returns null; topic-page route's `notFound()` fires; **404 by design** per §16.6 honesty | ✓ honesty discipline |
| Topic page at `/[locale]/topic/animals/` (registered axis with deck count) | Renders topic page with all `subject_tags @> ['animals']` decks; the halloween-tagged deck doesn't appear (its subject_tags doesn't include `animals`) | ✓ correct filter |
| Section 2 home grid composition | Driven by `homepage-featured-decks.json` operator-curated list; halloween-tagged deck would only appear if explicitly added to the JSON | ✓ no auto-leak |
| Footer Col 2 (FOOTER_TOPICS_BY_LOCALE) | Operator-curated map; halloween-tagged deck doesn't auto-add a "halloween" Footer entry | ✓ no auto-leak |
| Sitemap | Driven by `listNonEmptyAxisKeys` per §16.6; iterates topics-taxonomy.json axis-keys + checks deck count; halloween isn't in topics-taxonomy.json so doesn't appear in sitemap | ✓ honesty |
| Search/browse | No theme-axis search currently; browse falls back to faceted filter on the existing axis-keys. Halloween-tagged deck shows in exercise-type browsing (since exerciseType is independent of subject_tags) | ✓ degrades gracefully |
| Deck page itself at `/[locale]/decks/halloween-themed-addition/` | Renders the deck normally; the deck.html doesn't reference subject_tags at render time | ✓ no degradation |

**Conclusion:** catalog-side render degrades gracefully if `subject_tags` contains values unregistered in topics-taxonomy.json. The deck publishes; theme-axis browsing for the unregistered theme is unavailable but exercise-type/educational-level browsing still works; the deck page renders normally.

**Implication:** if the operator wants to permit "any theme combination" without first registering all 50 themes in topics-taxonomy.json, the path is to **relax the publish-cli substitute gate from throw to soft-warn.** Single-line change in taxonomy.js:axisLookup (catch theme-miss; return null instead of throw); substitute.js then handles null themeAxis as it already does for locale-miss. Filed as a candidate path forward; recon-only; not picked here.

### 5.2 If a deck has subject_tags=[] (themeless) — current behavior verified

Current state: 67 of 116 published decks are themeless (`subject_tags=[]`). They appear in:
- Exercise-type topic pages (filter by `exerciseType` only)
- Educational-level topic pages (filter by `ageRange` only)
- Deck pages directly at `/[locale]/decks/<slug>/`
- Section 2 grid IF the operator curated them in
- Footer (no impact; Footer doesn't auto-populate from subject_tags)

Themeless decks do NOT appear in theme-axis topic pages (the filter `subjectTags: { has: axisKey }` returns 0 for empty arrays). This is correct.

---

## Section 6 — Schema constraints

### 6.1 Deck table

```prisma
model Deck {
  id              String    @id @default(cuid())
  slug            String    // not @unique alone
  language        String    // ISO 639-1 free-string; no enum
  exerciseType    String    // free-string; no enum
  subjectTags     String[]  @default([])  // free-string array; no FK to image_themes
  topicSlugs      String[]  @default([])  // free-string array; no FK to topics
  ageRange        String    // free-string; no enum (deferred per §11)
  status          String    @default("draft")  // free-string; no enum (deferred)
  contentFamilyId String?   // §17.8.7 reserved nullable
  ...

  @@unique([language, slug])
  @@index([status, publishedAt])
  @@index([exerciseType, language])
}
```

**Constraints active at INSERT:**
- `@@unique([language, slug])` — same locale can't have two decks with the same slug. Cross-locale OK per §15.10 (verified at `1be13b8a` + `645ca7ff`).
- `id @default(cuid())` — auto-generated; no collision risk.
- All other fields are free-strings or string-arrays; no enum / no FK / no check constraint.

**No constraint blocks any (language, app, theme) combination at the Deck table level.**

### 6.2 Topic + LessonPlan tables

```prisma
model Topic {
  slug @id  // English-canonical axis-key per Phase 1a Schema-intent-B
  language  // always 'en' for all 39 rows
  ...
}

model LessonPlan {
  topicSlug @relation(...)  // FK to Topic.slug
  language  // ISO 639-1
  @@unique([topicSlug, language])
}
```

**Constraints active:**
- Topic.slug @id — adding new themes requires INSERT into topics table (the seed-topics.js script handles this; or a new seed script for themes).
- LessonPlan.topicSlug FK to Topic.slug — a LessonPlan referencing a non-seeded topic would fail at FK constraint.
- LessonPlan @@unique([topicSlug, language]) — one plan per (topic, locale).

**No constraint blocks (language=fr, app=addition, theme=halloween) at the catalog-domain table level.** Only blocks if `halloween` is asserted as a topicSlug AND no Topic row exists for it.

### 6.3 No Bundle table yet

Bundle model spec exists in SUBSCRIPTION-SCOPE.md but schema is deferred per project_deferred_items_queue.md. Not a current blocker; bundle commission ships its own schema.

### 6.4 Schema-side blockers — none beyond known set

The known constraints (Deck @@unique([language, slug]); LessonPlan @@unique([topicSlug, language]); Topic.slug @id) are all already-documented in CLAUDE.md / schema.prisma comments. **No undocumented constraint surfaced during this recon.**

---

## Section 7 — Synthesized blocker map

### 7.1 The blocker matrix

| # | Blocker | Current state | Target state | Scope to close | Dependencies | Operator-strategic decisions |
|---|---|---|---|---|---|---|
| 1 | publish-cli throws on unregistered theme axis-key | substitute.js:taxonomy.themeFor() throws | Theme-axis-keys for all 50 color themes registered in topics-taxonomy.json | 46 axis-key entries + 550 locale-slug entries (or 200 entries for 4 currently-publishable locales) | None (mechanical authoring + auto-derive from image_themes.displayNames) | Path X/Y/Z choice (Section 1.3) |
| 2 | TOPIC_LOCALES + topics-taxonomy.json slug+name maps for 7 blocked locales | en+de+es+nl only | All 11 locales (or operator's chosen subset) | ~7 commits Track A; per-locale slug+name maps auto-derive from image_themes.displayNames + image_library_items.translations | None (mechanical authoring once axis-key list is locked) | pt-BR vs pt-PT split; fr canonical; Nordic posture (Section 2.3) |
| 3 | `topicPage` namespace for 7 blocked locales | en+de+es+nl only | All 7 (or chosen subset) | ~7 commits Wave 1 per locale | Track A (logically Wave 1 ships after Track A) | NSR review for sv/fi/no/da per CLAUDE.md §17.5 |
| 4 | `workspace` + `collections` + `lessonPlanReader` namespaces for 7 blocked locales | en+de+es+nl only | All 7 (or chosen subset) | ~14 commits Wave 2+3 per locale | Track A + Wave 1 (publish unblocking) | None major; mechanical |
| 5 | Footer Col 2 entries (FOOTER_TOPICS_BY_LOCALE) for new themes | 4 themes × 4 locales = 16 entries | 50 themes × N locales | Per-locale Footer.tsx authoring; per-theme entry (slug + display name) | Theme axis-keys registered (#1) | Theme display-string conventions per locale |
| 6 | Conceptual layer-mismatch resolution (image_themes vs topics-taxonomy.json) | `food` axis-key has 0 matching DB theme; `fruit` (singular) ≠ DB `fruits` (plural) | Layer-aligned per Path X/Y/Z | Operator decision + small topics-taxonomy.json revision | None | Path X/Y/Z choice |
| 7 | Postgres index work (GIN on subject_tags + compounds) | Missing 3 indexes | All shipped | ~30-second Prisma migration | None | None |
| 8 | App-side theme dropdown UX with 50 themes | Currently lists themes from API; no operator-strategic gate | Same; might benefit from UX grouping at 50 themes | None blocking | None | None (UX polish if needed) |

### 7.2 Criticality ordering

**Hard blockers (prevent any deck publish in N locales / N themes):**
- #1: theme axis-key registration (blocks 46 of 50 themes)
- #2: 7 blocked locales' Track A (blocks any deck publish in those locales)

**Catalog-quality blockers (allow publish but produce missing/broken surface):**
- #3: Wave 1 chrome for 7 blocked locales (without it, topic-page render shows missing-message stubs)
- #5: Footer Col 2 entries for new themes (Footer doesn't auto-populate)
- #6: Layer-mismatch resolution

**Subscriber-side blockers (downstream of mass-publish; not "any combination" blocker):**
- #4: Wave 2+3 chrome for 7 blocked locales

**Substrate / scale blockers (confirmed non-critical from morning recon):**
- #7: Postgres indexes (recommended pre-emptively but not load-bearing at <5,000 decks)

**Operator-UX:**
- #8: App theme dropdown UX (no current blocker)

### 7.3 Smallest single commission with largest combinatorial-space gain

**The single highest-leverage commission: Register all 46 (or 47) unregistered DB themes in topics-taxonomy.json with per-locale slug+name maps for the 4 currently-publishable locales (en+de+es+nl).**

**Combinatorial-space gain:**
- Before: 4 themes × 4 locales × 13 themed apps + (themeless paths) = ~208 (theme, locale, themed-app) combinations publishable
- After: 50 themes × 4 locales × 13 themed apps + (themeless paths) = **2,600 (theme, locale, themed-app) combinations publishable** — 12.5× increase

**Authoring shape:**
- Add 46 axis-key entries to `topics-taxonomy.json axes.theme`
- Each axis-key gets `slug` map for en+de+es+nl (4 entries each = 184 slug entries)
- Each axis-key gets `name` map for en+de+es+nl (4 entries each = 184 name entries)
- All 368 entries auto-derivable from `image_themes.displayNames` Json (slugify per-locale display name → slug; pass display name → name)
- **Single commission: ~6 hours of author + verify work; one commit**

**This commission is locale-arc-independent.** The 4 currently-publishable locales benefit immediately. The other 7 locales benefit when their Track A ships (which can run in parallel or sequentially).

**Per-locale extension to all 11 locales is a mechanical follow-on:** taxonomy entries grow to 50 × 11 = 550 slug entries + 550 name entries; auto-derived from same source. Ships during each Tier-3/4 launch arc as part of Track A.

### 7.4 Recommended sequencing for "permit any combination" goal

Synthesizing into ordered actions for the operator's stated goal:

1. **Operator decision: Path X/Y/Z for Layer 1↔2 alignment** (Section 1.3). Single conversation; locks the registration approach.
2. **Theme registration commission** (#1): register 46 unregistered themes in topics-taxonomy.json with per-locale slug+name for en+de+es+nl. ~6 hours, 1 commit. **Unblocks 50 themes × 4 locales immediately.**
3. **Postgres index migration** (#7): GIN on subject_tags + compounds. <30 seconds; 1 commit.
4. **Operator decisions: pt-BR/pt-PT, fr canonical, Nordic posture** (Section 2.3). 1-2 conversations.
5. **Track A + Wave 1 commissions for 7 blocked locales** (#2 + #3): ~14 commits across 7 locales (or a subset per operator priority).
6. **Footer Col 2 + Section 2 grid expansion** (#5): per-locale incremental as themes land.
7. **Wave 2 + Wave 3 chrome** (#4): runs on its own timeline; not a deck-publish blocker.

**With #1 + #2 + #3 + #5 done, the operator can publish any (locale ∈ Tier1+2, app ∈ 29, theme ∈ 50, themeless ∈ all-29) combination with no structural barrier.** Tier 3+4 unblock as their Track A + Wave 1 commissions land.

---

## Closeout

**Document path:** `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\project_unblock_recon.md`

**Length:** ~7,200 words / ~480 lines

**Halt-and-surface conditions hit:** none.
- REFERENCE CONTENT MANAGERS/content-manager-v2.html does NOT enumerate themes (it's an editor UI; canonical store is Postgres `image_themes` table). Surfaced + worked around without halting.
- Per-locale folder-name mapping doesn't exist at filesystem layer (operator brief framing assumed it did); per-locale name conventions live in `image_themes.displayNames` JSON. Surfaced as refinement, not halt.
- App-side theme allowlists: none found (apps load themes dynamically from API). Surfaced as confirming operator's claim.

**Two most consequential findings (operator first-look):**

1. **The single biggest unblock-path lever is theme axis-key registration: register the 46 unregistered DB themes in topics-taxonomy.json with per-locale slug+name maps for the 4 currently-publishable locales** (Section 7.3). Single commission, ~6 hours of author work, auto-derivable from `image_themes.displayNames` Json. **Combinatorial-space gain: 12.5× increase** (208 → 2,600 publishable theme×locale×app combinations). Locale-arc-independent — the other 7 locales unblock as their Track A ships separately.

2. **publish-cli currently REJECTS unregistered themes at substitute step (`taxonomy.themeFor` throws).** This is the empirical gate. Operator's "permit any combination" goal can be achieved either by (a) registering all 50 themes upfront, or (b) relaxing the substitute gate to soft-warn instead of throw. Option (a) is the default per CLAUDE.md §16.5 honesty discipline; option (b) is a single-line change in taxonomy.js if operator prefers ship-then-register. This is a substantive design choice surfaced for operator decision.

**Layer-mismatch finding (worth flagging):**

Three layers — `image_themes.name` (50 color names, image-library granularity), `topics-taxonomy.json axes.theme` axis-keys (4 catalog-browsing labels), `Deck.subject_tags` (free-string array) — are NOT aligned. `food` axis-key has no matching DB theme (just food-adjacent: bakery, breakfast, desserts_and_sweets); `fruit` (singular) doesn't match DB `fruits` (plural). Operator chooses Path X (1:1 alignment), Y (semantic aggregation), or Z (hybrid) before commission ships.

**Path-drift recorded for next doctrine pass:**
- Brief framing assumed per-locale folder-name conventions in image-library; empirical state is per-locale lives in DB JSON columns (`image_themes.displayNames`, `image_library_items.translations`). Document references should be tightened.

**Confirmation:**
- 0 commits, 0 pushes, 0 deploys, 0 DB writes during recon
- All Hetzner queries SELECT/group-by/index-introspect; cleanup after each
- HEAD unchanged at `3569be97 [FEATURE] Admin bypass for subscriber-gated content`
- `git status` dirty-tree at 897 items (within pre-existing baseline per SESSION-STATE.md §7)

This document persists at filesystem level until operator reviews. Subsequent decisions (Path X/Y/Z; ship-then-register vs register-then-ship; per-locale priority order) become input to commissions that update topics-taxonomy.json + Footer.tsx + TOPIC_LOCALES + messages files as appropriate.

*End of project_unblock_recon.md*
