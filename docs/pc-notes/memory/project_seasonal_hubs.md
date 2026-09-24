---
name: project-seasonal-hubs
description: "Seasonal SEO hubs SHIPPED 2026-07-06 (commit 15f0a16e): 57 demand-keyed seasonal theme head hubs + 62 season×grade children across 11 locales, all verified live. The next-queued item of the hub program after Units 1-12."
metadata: 
  node_type: memory
  type: project
  originSessionId: dd4e7a88-971b-45b5-9d8c-e38c3cf76004
---

# Seasonal hubs — SHIPPED + VERIFIED LIVE 2026-07-06 (commit `15f0a16e`)

The queued "seasonal hubs before Nov" item of [[project-seo-real-cause-and-hub-program]]. Goal: seasonal worksheet demand (weihnachten arbeitsblätter / fiches de noël / juleopgaver / joulutehtävät …) ahead of the Aug–Dec peaks. Plan file: `C:\Users\rkgen\.claude\plans\deep-moseying-bird.md`.

**Architecture (rides EXISTING page types — no new routes):**
- **Head hubs** = the existing single-axis theme topic pages (`/[locale]/topic/<theme-slug>`), upgraded via `frontend/lib/seasonal-hub.ts` (mirrors subject-hub.ts): demand-keyed final-form `<title>`/H1 override in `topic/[slug]/page.tsx`, deep-copy paragraphs (`frontend/content/seasonal-hub-copy/<locale>.json`, paragraphs ONLY — FAQ stays in `topicFaq.overrides` because TopicFaq already emits FAQPage JSON-LD; a second source would double the schema), localized updated-date (`topicLastModified`), and links to authored grade children.
- **Season×grade children** = the existing theme×level intersection pages, flipped indexable DATA-ONLY by authoring `topicProse.<sortedKeys>` message keys (`intersectionIsAuthored` is the single SoT gating noindex + sitemap shard 2 + hreflang — zero sitemap code changes). Only a metadata `gradeTitle` override was added in `[secondary]/page.tsx`.
- **Homepage**: `BrowseByTopicSSR` seasonal group ordered by `seasonsByProximity(getUTCMonth())` (demand-window map, in-season first, ISR-safe).

**Scope/gating:** 5 universal seasons (christmas/easter/winter/spring/summer) × 11 locales; `4th_of_july` + `thanksgivinng` (literal taxonomy key — triple-n typo, slugs correct) en-only cultural gate. Children authored only where deck count ≥12 per the Hetzner audit (kindergarten everywhere ~35-42 decks; en extras: preschool christmas/easter/winter/4th_of_july + 4th_of_july grade-1). **Total live: 57 head hubs + 62 children = 119 URLs, ALL verified 200 + children ALL index,follow + FAQPage/deep-copy/updated-date rendering live** (the /opt fs fallback works at runtime).

**Copy:** 10 parallel native 3-agent ensembles (one per non-EN locale; en authored inline) [NSR-FLAG sv/da/no/fi]. Key rulings: da/no/fi demand nouns are COMPOUNDS (Juleopgaver/Juleoppgaver/Joulutehtävät) → per-season full-form title overrides; fr needs elision overrides on all 5 (de Noël/d'hiver/d'été); sv "vår" homograph → "våren" title; nl "kerst" not "Kerstmis"; pt hemisphere-honest (Brazilian seasons reversed; snowy imagery acknowledged as content truth); de H1 "zu Weihnachten/für den Winter" preposition split.

**Composition traps fixed (check on any future hub family):** `subjectHubGradeLabel` returns the DISPLAY form for fr/pt/it/sv/da/no/fi — it/nl/fi templates needed DASH APPOSITION ("Schede di Natale – {g} –", "Werkbladen kerst – kleuterklas –", "Joulutehtävät – Esiopetus (eskari) –") because "per/voor {g}" is article-wrong and fi display already contains "(eskari)" (the fi agent's "{g} (eskari)" would have doubled it); en axis labels are lowercase → capFirst in the title template.

**Verification traps hit:** (1) `?cachebuster` query params trigger the topic page's canonical-redirect → body checks must use the BARE url (title still streams, masking it); (2) grep against a Next page matches the RSC flight-data blob — save the file and use targeted patterns; (3) python text-mode writes CRLF → curl on the list fails with code 000 (tr -d '\r'); (4) never guess grade slugs (fi=esiopetus not eskari, pt=educacao-infantil-pre-escola-5-7-anos) — generate URLs from taxonomy.

**Pre-existing state discovered:** topicMeta seasonal head descriptions were already authored ×11; head prose+FAQ existed for de/en/es/it/pt (authored fr/nl/sv/da/no/fi this session); some season×preschool intersections (de/es/nl/it/fr christmas etc.) were ALREADY indexable via pre-existing topicMeta intersection keys — left as-is, they get the better titles too.

**FOLLOW-UPS (open):**
1. **Halloween / autumn / back-to-school / Valentine's (color) DECK PRODUCTION** — the biggest seasonal demand classes (esp. halloween, peaks Sep-Oct; back-to-school peaks Aug) have NO taxonomy keys and NO decks. Needs image-library themes + a deck wave → an operator fork (§10.3-adjacent). Once decks exist, the seasonal-hub machinery extends by adding the key to SEASONAL_KEYS + copy rows.
2. **Erntedankfest for de** — thanksgivinng has ~55 de decks and Erntedank IS a real German K autumn topic; cheap follow-up (add 'de' to the gate + de ensemble copy).
3. Landing→seasonal-hub equity links (mirror live-subject-hubs.json with a seasonal manifest in render-landing-html.js).
4. IndexNow still 403 (Bing key revalidation lag) — the 119 URLs submitted anyway; re-test.
5. GSC: watch seasonal hub impressions from ~Sep (thanksgiving/christmas ramp Oct-Nov).
