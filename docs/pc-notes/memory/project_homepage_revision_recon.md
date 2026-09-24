---
name: Home page revision recon — shipped state at e7a055cc
description: Recon-only snapshot of the home page's shipped state (post-doctrine-hygiene close). Surfaces section-by-section copy, wiring confirmations, halt-and-surface findings against locked decisions. Out-of-tree per CLAUDE.md §10.4. Reference doc for the upcoming home page revision pass.
type: project
originSessionId: b1fc4fb5-c078-4a51-a4e1-b3680342e11b
---
# Home page revision recon — shipped state at commit `e7a055cc`

## Sources read

- `frontend/app/[locale]/page.tsx` (home page top-level component)
- `frontend/components/homepage-v2/*.tsx` (10 components: Hero, BreadthGrid, FeaturedDeckTile, LanguageProof, GermanComparison, FrenchComparison, FreeExperience, SubscriptionSection, SubscribeCTA, NotifyMe)
- `frontend/config/homepage-featured-decks.json`
- `frontend/config/lemonsqueezy-product-config.ts`
- `frontend/messages/en.json` (homepage namespace)
- `frontend/messages/de.json` (homepage namespace)
- `frontend/components/layout/Footer.tsx` (post-Pass-7b state)
- `frontend/app/sitemap.ts`
- `frontend/tailwind.config.js`
- `frontend/app/globals.css`
- Live `/en/` + `/de/` HTML for production verification

## File map (Step 1)

```
frontend/app/[locale]/page.tsx
├── Hero                       (homepage.hero)
├── BreadthGrid                (homepage.breadthGrid)
│   ├── FeaturedDeckTile       (homepage.breadthGrid)
│   └── plain <a> tiles        (config: homepage-featured-decks.json)
├── LanguageProof              (homepage.languageProof + .german + .french)
│   ├── GermanComparison       (homepage.languageProof.german)
│   └── FrenchComparison       (homepage.languageProof.french)
├── FreeExperience             (homepage.freeExperience)
└── SubscriptionSection        (homepage.subscription)
    └── SubscribeCTA           (homepage.subscription, homepage.notify via NotifyMe child)
        └── NotifyMe           (homepage.notify)
```

i18n namespaces consumed: `homepage.{meta, hero, breadthGrid, languageProof, languageProof.german, languageProof.french, freeExperience, subscription, notify}`. Footer consumes `footer.{byLanguage, byTopic, byExerciseType, moreLanguagesSoon, moreTopicsSoon, contact, terms, privacy, copyright}` (flat keys).

## Section-by-section copy inventory (Step 2)

### Section 1 — Hero (en, shipped)

```
title:        "Interactive worksheets that actually work in your second language."
subtitle:     "A curated library of K-3 illustrations paired with a vocabulary system across
               11 languages — correct gender, plurals, and diacritics in every one. Built for
               teachers in dual-language programs, bilingual classrooms, and international schools."
interaction:  "Students play them in the browser. Print them if you prefer."
```

Layout: 2-column grid at md+, text-first source order; <md stacks vertically with text on top. Autoplay video at `/videos/math-puzzle.mp4` right of text. No CTA, no scroll cue. Server component.

### Section 1 — Hero (de, shipped) — ⚠ STALE SELLER-ERA

```
title:    "Erstellen Sie beeindruckende Arbeitsblätter in wenigen Minuten"
subtitle: "Professionelle Arbeitsblatt-Generatoren für Lehrkräfte und Eltern. Zugriff auf
           33 interaktive Apps mit wunderschönen Illustrationen."
cta:      { tryFree, viewApps }   ← keys ignored by Hero.tsx (it reads .interaction not .cta.*)
interaction:  ← KEY MISSING; renders as literal "homepage.hero.interaction" text
```

### Section 2 — BreadthGrid (en/de share copy via i18n)

```
sectionTitle: "Across topics, across languages"        ← en
intro:        "A few decks from across the catalog. Open the first one to play it here, or
               click any other to see its full page."   ← en
featuredBadge: "Featured"
playInline:    "Play this deck"
openDeck:      "Open deck"
closeFeatured: "Close"
```

DE: ALL keys MISSING. /de/ renders raw key strings (`homepage.breadthGrid.sectionTitle` etc.) as text.

Curated tiles per `frontend/config/homepage-featured-decks.json`:
- 1 featured (inline-playable): `de/picture-path` (locale=de, languageLabel=DE)
- 3 link-through: `en/addition-image-image`, `de/sudoku`, `en/cryptogram`
- Total: 4 tiles. Languages represented: en + de (Tier 1 only at launch). Topics distinct: picture-path, addition-image-image, sudoku, cryptogram.
- "no two tiles on same topic" invariant: ✓

### Section 3 — LanguageProof (en, shipped)

```
sectionTitle: "Where most worksheets break down"
intro:        "Generic worksheets translated by software get the words mostly right and the
               language wrong. A masculine noun marked feminine. A missing umlaut. A plural
               that doesn't exist. Small errors a child can't catch but a teacher can't unsee."
subIntro:     "Two examples, side by side."
closingLine:  "Errors like these compound across a vocabulary set. We built the vocabulary
               system first. The illustrations came after."
german:       heading "German"
              annotation1: "Every German noun is capitalized. Schule, never schule."
              annotation2: "Schule is feminine: die Schule. Not der, not das."
              annotation3: "The plural is Schulen — -n ending, not English -s. Schules isn't
                            a German word."
french:       heading "French"
              annotation1: "École starts with a vowel, so la elides to l'. L'école, not la école."
              annotation2: "À + le contracts to au, but before a vowel it's à l'. À l'école,
                            not à le école."
              annotation3: "Accents are part of the spelling. École takes an acute on the É;
                            ecole is wrong."
```

Worked examples (rendered inline as static markup in components, NOT via i18n):
- German: "Schule" comparison panel — auto-translated `der schule` / `schules` (wrong, line-through terracotta) vs LessonCraftStudio `die Schule` / `die Schulen` (correct, sage ring).
- French: "école" comparison panel — three corrections: elision (`la école → l'école`), contraction (`à le école → à l'école`), acute accent (`ecole → école`).

DE: ALL keys MISSING. /de/ renders raw `homepage.languageProof.*` key strings.

### Section 4 — FreeExperience (en, shipped)

```
sectionTitle: "The catalog is free"
intro:        "No account, no paywall, no signup wall. Browse, print, embed, and share —
               every deck, in every language."
browse: { title "Browse the full catalog",  body "Every deck across every language is open
                                                  to everyone. Browse by language or topic
                                                  from the links at the bottom of this page.
                                                  Open any deck and play it directly in the
                                                  browser." }
pdf:    { title "Generate a printable PDF",  body "One click from any deck. The PDF mirrors
                                                  the on-screen worksheet — same illustrations,
                                                  same language, same vocabulary. Take it home,
                                                  photocopy it for the class, leave it for a
                                                  substitute teacher." }
embed:  { title "Embed any deck on your site", body "Paste an embed code into your class blog,
                                                  school site, or learning-platform page.
                                                  Students play the deck where they already are.
                                                  The embed is fully free and stays free." }
share:  { title "Share a deck via link",  body "One link, anywhere — email, parent newsletter,
                                                  classroom chat, your LMS. Students open the
                                                  link and play in the browser. No login, no
                                                  account, no friction." }
```

No CTA in section (per HOMEPAGE-COPY.md "catalog navigation surface is the structural footer").

DE: ALL keys MISSING.

### Section 5 — SubscriptionSection (en, shipped)

```
sectionTitle: "For teachers who use the catalog every week"
intro:        "Free works for browsing and using individual decks. The subscription is for
               teachers who've integrated LessonCraftStudio into their weekly teaching and
               want their practice organized."
lessonPlans:    { title "Lesson plans",     body "Pre-written lesson plans paired with the
                                                  decks they go with. Print one out, walk
                                                  into your classroom, teach the lesson.
                                                  Written for K-3 in dual-language and
                                                  multilingual programs, with a consistent
                                                  format you learn once." }
themedBundles:  { title "Themed bundles",   body "Halloween in 11 languages, on the same week
                                                  your school runs it. The first week of school
                                                  in dual-language. A unit on numbers your
                                                  Spanish section and your English section
                                                  can teach in parallel from one plan. Curated
                                                  bundles for the moments that come around
                                                  every year, each one paired with its own
                                                  lesson plan — the bundle is a teaching unit,
                                                  not a pile of materials." }
workspace:      { title "Your workspace",   body "As the catalog keeps growing, the subscription
                                                  is where you organize your own work. Save decks
                                                  into collections. Tag them with the names of
                                                  your own teaching units. Filter by criteria
                                                  the catalog can't see — what you've already
                                                  used, what's tagged to your Week 3 vocabulary,
                                                  what's new in the topics you actually teach.
                                                  Bulk tools for working at scale. A personal
                                                  workspace that picks up where you left off." }
price:                "$69 per year. Cancel renewal anytime."
subscribeCta:         "Subscribe"
alreadySubscribedCta: "View your subscription"
```

3-pillar structure aligns with `docs/SUBSCRIPTION-SCOPE.md` ✓.

### Section 5 — NotifyMe (en, shipped)

```
label:        "Email address"
placeholder:  "your@email.com"
submit:       "Notify me when subscription opens"
submitting:   "Sending…"
confirmation: "Thanks — we'll email you when the subscription opens."
errors.invalid_email: "Please enter a valid email address."
errors.server:        "Something went wrong. Please try again."
```

DE: ALL keys MISSING (homepage.notify.* not in DE namespace at all).

## Section 5 dual-path wiring (Step 3)

- Env var: `process.env.HOMEPAGE_SUBSCRIBE_MODE` read in `SubscriptionSection.tsx:19` at static-generation time.
- Resolution: `'subscribe'` → SubscribeCTA branches by auth state. Anything else (default) → `'notify_me'` → renders NotifyMe form.
- SubscribeCTA in `'subscribe'` mode 3 branches:
  1. Logged-out → LS checkout via `SUBSCRIPTION_PRODUCT.buyNowUrl`
  2. Logged-in, no active sub → same LS checkout
  3. Logged-in, active sub → "View your subscription" → /member
- SubscribeCTA in `'notify_me'` mode: branch 3 still applies (already-subscribed users see View link), all others see NotifyMe form. **Edge case covered** for flag-flip-after-launch.
- Notify-me form posts to `/api/subscription-interest` (idempotent on email server-side). Writes to `subscription_interest` Prisma table (per `prisma/schema.prisma:1156`).
- **§17.2 SubscribeCTA preservation: ✓ INTACT.** SubscribeCTA imports `SUBSCRIPTION_PRODUCT` from `@/config/lemonsqueezy-product-config` (singular config, post-Pass-8 plural-deletion). Webhook handler at `/api/webhooks/lemonsqueezy/route.ts` preserved per CLAUDE.md §A.6.
- Active-subscription detection via `isLcsSubscriptionActive(user)` reads `user.subscription.{status, lsSubscriptionId}` from the Subscription table populated by LS webhook events.

## Section 2 BreadthGrid wiring (Step 4)

- Curated source: `frontend/config/homepage-featured-decks.json` (operator-managed via git; no DB query at render time).
- 4 decks: 1 featured (`de/picture-path`, `featured: true` flag), 3 non-featured (`en/addition-image-image`, `de/sudoku`, `en/cryptogram`).
- `_known_state_notes` in JSON acknowledges: deck titles English-only across catalog (deferred-queue item; DE-labeled decks carry English titles).
- `_growth_plan`: target 8 across 4+ languages and 8 different topics as Tier 2-4 launches; do not pad with placeholders.
- FeaturedDeckTile component: opens modal with iframe `src={deckUrl}` on click. Body scroll lock + Escape-to-close. Modal renders `loading="lazy"` iframe inside a max-w-5xl/max-h-90vh card.
- **§15.7 routing-contract convention: ✓** BreadthGrid line 13-14 comment now reads "Plain <a>, not Next.js Link, per CLAUDE.md §15.7 routing-contract convention (deck URL is nginx-served, not a Next.js route)." Non-featured tiles use plain `<a>`. Featured-tile modal uses `<iframe src={deckUrl}>` — bypasses the trailing-slash routing-contract concern entirely (iframe loads the URL literally; deckUrl values in the JSON include trailing slash).

## Section 3 worked-examples authoring (Step 5)

- **Schule (DE) + école (FR)**: ✓ matches locked-decision. NOT apple/pomme.
- Authoring: hybrid — annotation copy in i18n (`homepage.languageProof.{german,french}.annotation{1,2,3}`); the actual worked-example tokens (`der`, `schule`, `Schules`, `die Schule`, `die Schulen`, `la`, `école`, `à le école`, `ecole`, `l'école`, `à l'école`, `école`) rendered as static JSX text inside the component files — NOT i18n.
- aria-label keys (`german.ariaLabel`, `french.ariaLabel`) in i18n for screen-reader narration of the comparison.
- Layout: side-by-side grid md+, vertical stack <md (left wrong, right correct).

## Section 6 footer wirings (Step 6)

- Footer mounted via `LocaleLayoutClient.tsx`; uses `usePathname()` to derive locale.
- Column 1 (`byLanguage`): hardcoded `FOOTER_LANGUAGES = [{en, English}, {de, German}]` at Tier 1.
- Column 2 (`byTopic`): per-locale map `FOOTER_TOPICS_BY_LOCALE` (Pass 7b F4 + locale-mirror closure pass extension):
  - en: animals, grade-1, kindergarten
  - de: 1-klasse, 2-klasse, kindergarten
- Column 3 (`byExerciseType`): per-locale map `FOOTER_EXERCISE_TYPES_BY_LOCALE`:
  - en: addition, bingo, crossword, cryptogram, pattern-train, picture-sudoku, word-scramble (7)
  - de: addition, bingo, kreuzwortraetsel, kryptogramm, muster-zug, bildpfad, bilder-sudoku, buchstabensalat (8)
- Footer column 3 label: **"Worksheets by exercise type"** (en) ✓ matches locked decision.
- Brand strip: copyright + contact + terms + privacy links.

## Aesthetic + meta + schema (Step 7)

- **Fonts:** `tailwind.config.js` `fontFamily.display: ['var(--font-fraunces)', 'var(--font-inter)', 'serif']`. CSS vars defined in `globals.css:7-9` (Inter, Poppins, Fraunces). `font-display` class throughout home page resolves to Fraunces ✓.
- **Colors:** `tailwind.config.js` extends with cream (50-300), terracotta (50/400/500), sage (50/300/500), ink (palette family). All consumed in home page components ✓.
- **Paper grain:** `globals.css:25-37` body::before SVG-noise data URL at 0.5 opacity (NOTE: comment claims "2% opacity" but actual `opacity: 0.5` with the SVG's internal alpha 0.04 yields ~2% perceived ✓).
- **Hero layout:** 2-column desktop with autoplay video right of text per `Hero.tsx:15-46`. Mobile single-column ✓.
- **"Across 11 languages" claim:** present in `homepage.meta.title`, `homepage.meta.description`, `homepage.meta.ogDescription`, `homepage.meta.ogAlt`, `homepage.hero.subtitle`, `homepage.subscription.themedBundles.body` ✓.
- **USD currency:** `$69 per year` at `homepage.subscription.price` + `lemonsqueezy-product-config.ts:32` `priceUsd: 69` ✓.
- **Title tag:** "LessonCraftStudio: K-3 worksheets in 11 languages, done right" ✓.
- **Meta description:** "K-3 worksheets in 11 languages with correct gender, plurals, and diacritics in every one. Built for dual-language programs, bilingual classrooms, and international schools." ✓.
- **OG image:** `/de/decks/picture-path/og-image.png` (1200×630). Path lives at the nginx-served versioned dir post-publish. Referenced both as `openGraph.images` and `twitter.images` ✓.
- **OG locale + alternateLocale:** computed via `ogLocaleMap` for current + 10 other locales ✓.
- **hreflang:** all 11 SUPPORTED_LOCALES + `x-default → en`, generated server-side in `generateMetadata` ✓.
- **Schema.org JSON-LD:** Organization (with logo, areaServed: Worldwide, availableLanguage: 11 languages) + WebSite (publisher refs Organization). SearchAction omitted (catalog index doesn't ship). sameAs omitted (no official social profiles). Both schemas server-rendered as `<script type="application/ld+json">` per `page.tsx:117-123` ✓.

## Sitemap home entry (Step 8)

`frontend/app/sitemap.ts:60-66` — home is in `staticPages` array as `{ path: '', priority: 1.0, changeFreq: 'daily' }`. Loop emits one entry per locale × static path with hreflang alternates. Home gets the highest priority (1.0) and daily change-freq. ISR `revalidate = 1800` (30 min).

## Halt-and-surface findings

### F1 — CRITICAL: DE homepage namespace stale; production /de/ renders raw key strings as text

`frontend/messages/de.json.homepage` is **completely stale seller-era content** (hero/features/pricing namespace; old tiers Kostenlos/Basis-Paket/Vollzugriff with monthly+yearly+POD-Lizenz). The new home page rebuild (commit 39b0e0c4 → 4e3dacba) shipped EN message-file expansion to `hero/breadthGrid/languageProof/freeExperience/subscription/notify` namespaces but DE was never extended. Production /de/ renders:

- Hero h1: "Erstellen Sie beeindruckende Arbeitsblätter in wenigen Minuten" (stale seller-era — hero.title key happens to exist with old value)
- Hero subtitle: stale seller-era "Professionelle Arbeitsblatt-Generatoren..." (same)
- Hero interaction line: literal `homepage.hero.interaction` text (key MISSING in DE)
- Section 2 H2: literal `homepage.breadthGrid.sectionTitle`
- Section 2 intro: literal `homepage.breadthGrid.intro`
- Section 3 H2: literal `homepage.languageProof.sectionTitle` + `german.heading` + `french.heading`
- Section 4 H2 + all 4 capability blocks: literal key strings
- Section 5 H2 + 3 pillar bodies: literal key strings
- Notify-me form: all labels/placeholder/submit/confirmation rendered as literal key strings (`homepage.notify.*` namespace MISSING entirely from DE)

next-intl does NOT fall back to EN. `/de/` returned 200 in prior smoke checks but content is broken.

**Implication:** the home page rebuild was effectively English-only at deploy. Tier 1 (en+de per CLAUDE.md §19) catalog coverage was achieved (15 published decks per pass closeouts), but the home page surface itself is single-language. This contradicts the spirit of §19's Tier 1 framing for the catalog-frontend launch state.

### F2 — Footer DE namespace also stale seller-era

`frontend/messages/de.json.footer` has `companyName/companyTagline/support/legal/copyright` structure (seller-era). New Footer.tsx uses flat `byLanguage/byTopic/byExerciseType/moreLanguagesSoon/moreTopicsSoon/contact/terms/privacy/copyright` keys. Of those, only `copyright` exists in DE — and its value is "© 2024 LessonCraftStudio. Alle Rechte vorbehalten." (stale year).

### F3 — Stale "© 2024" copyright year in DE footer

Independent of F2's namespace mismatch — even if the year were correctly rendered, "2024" is now 2 years stale (current date 2026-05-02).

### F4 — `_growth_plan` in homepage-featured-decks.json overstates current position

JSON's `_growth_plan` says "keep the grid at 4 — empty slots are forbidden". Current state: 4 (matches). Acknowledged growth toward 8 as Tier 2-4 launches. Not a drift; documenting for clarity.

### F5 — `header_footer.copyright` year — also check EN

Not surfaced in this recon round; could be a paired concern.

## Locked decisions confirmed intact

| Decision | Status |
|---|:-:|
| Section 2: 1 featured inline-playable + 3 link-throughs | ✓ |
| Section 3: Schule (DE) + école (FR) comparisons | ✓ |
| Section 5: dual-path subscribe vs notify_me, default notify_me | ✓ |
| HOMEPAGE_SUBSCRIBE_MODE both paths wired (commit 2a82ef67 Pass 3A reference) | ✓ |
| §17.2 SubscribeCTA → SUBSCRIPTION_PRODUCT singular config | ✓ |
| Footer column 3 label: "Worksheets by exercise type" (en) | ✓ |
| §15.7 routing-contract: BreadthGrid plain `<a>` for nginx-served URLs | ✓ |
| Aesthetic: Fraunces serif headlines + Inter body + terracotta + sage + cream + paper grain | ✓ |
| Hero layout: 2-col desktop, single-col mobile, autoplay video | ✓ |
| "Across 11 languages" claim | ✓ |
| USD currency | ✓ |
| Schema.org Organization + WebSite, no SearchAction, no sameAs | ✓ |
| hreflang 11 locales + x-default → en | ✓ |
| OG image at de/picture-path/og-image.png | ✓ |
| Sitemap home entry priority 1.0, daily changeFreq | ✓ |

## Implications for revision pass

The HOMEPAGE-COPY.md draft adjudication will need to address F1+F2+F3 explicitly. The drift-from-shipped surface for the EN home page is whatever the operator's draft says vs the snapshot above. The DE side is a separate gap — needs DE i18n authoring against the canonical EN namespace structure. Tier 2-4 locale expansion remains separately scoped per CLAUDE.md §19, but DE specifically is required at Tier 1 launch.

If the revision pass scope includes DE home page text, the DE namespace work is significant: 6 namespace blocks to author from EN (hero, breadthGrid, languageProof + .german + .french, freeExperience, subscription, notify) plus 8-9 footer flat keys.

If the revision pass scope is EN-only, F1-F3 should be filed as deferred-queue entries for a follow-on i18n authoring pass.
