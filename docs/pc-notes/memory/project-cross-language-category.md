---
name: project-cross-language-category
description: "Cross-language decks live in a dedicated \"Languages\" (/learn) category; monolingual deck queries MUST filter contentLanguage:null"
metadata: 
  node_type: memory
  type: project
  originSessionId: effd0637-418e-47d4-a657-e78a9d2fb91e
---

The ~3,088 cross-language decks (grid language + clue language, e.g. EN-grid/DE-clue crossword; matching decks attach images to one language) are NOT monolingual catalog content. They have their own home + must be excluded from every monolingual surface.

**Root cause of the original pollution (fixed):** the deck's `manifest.content_language` (the target/learned language) was read for the slug but NEVER persisted on the `Deck` row — so cross-language decks shared `language`+`exerciseType`+`subjectTags` with monolingual decks and leaked into topic pages, variety strips, homepage breadth grid, and faceted browse (e.g. /de/topic/crossword showed English-Finnish crosswords).

**LOAD-BEARING INVARIANT.** `Deck.contentLanguage` (`@map("content_language")`, nullable) is now set at publish (`publish.js`/`db.js insertDeck`+`updateDeck`) = `manifest.content_language` when it's set AND ≠ page locale; null for monolingual decks. **Every monolingual deck query MUST spread `MONOLINGUAL_WHERE = { contentLanguage: null }`** (exported from `frontend/lib/topic-decks.ts`). It is already applied across topic-decks.ts (incl. the `-vs-` raw SQL `AND content_language IS NULL`), topic-variety.ts, breadth-grid-selection.ts, catalog-axes.ts, exercise-mode-universe.ts, worksheets/page.tsx. Admin search, workspace APIs, and deck-URL sitemap shards are INTENTIONALLY left unfiltered. New monolingual surfaces must add the filter or cross-language decks return again.

**The "Languages" category (Phase B, live):**
- Route tree `/[locale]/learn/` (hub) + `/[locale]/learn/[targetLang]/` (per-target deck grid) — SSR+ISR, cloned from topic pages; CollectionPage+BreadcrumbList JSON-LD; canonical; theme-first filter + pagination.
- **Asymmetry:** single-target locales (de/da/fi/fr/it/nl/no/sv → English) render the hub AS the target page directly + canonical → the target page (no dead picker); en (10 targets) + es/pt (2) render a chooser.
- Taxonomy `axes.target-language` (11 langs × 11-locale slug+name) in topics-taxonomy.json; resolver `frontend/lib/target-language.ts`; data layer `frontend/lib/cross-language-decks.ts` (`fetchCrossLanguageTargets`/`fetchCrossLanguageDecks`/`fetchCrossLanguageFacets`).
- 7th nav category "Languages" (`category-nav-data.ts buildCategories`, gated on `availableTargets.length>0`), threaded layout → LocaleLayoutClient → Navigation → CategoryNav/MobileCategoryAccordion.
- i18n `learnPage` namespace + `nav.categories.languages` ×11; learn H1 is verb-led per locale ("Learn English" / "Englisch lernen" / "Opi Englanti") for SEO.
- Sitemap shard 3 emits the learn URLs (per-target + multi-target hubs).
- Title note: routes return the BARE title (root layout's `title.template` appends "· LessonCraftStudio" — never add the brand in-route, or you double-brand).

Commits: Phase A (pollution fix + contentLanguage column) `c668e2e8`; Phase B (category) `b19c2ca0`; title+sitemap fix `d340ebc7`.

**Deferred polish (not built):** deck-card flag-pair badge (🇩🇪→🇬🇧) + "Learn English" eyebrow; footer "Languages" column; homepage "Learn a new language" section; deeper authored `learnProse.<target>`/`learnMeta.<target>` per-locale prose (chrome intro templates serve now). Per-deck `/worksheets/` landings for the 3,088 are subsumed by these browse pages (the SEO surface) — a later phase only if requested.

Related: [[seo-landing-page-program]].
