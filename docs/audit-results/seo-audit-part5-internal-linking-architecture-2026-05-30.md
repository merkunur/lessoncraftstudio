# SEO Audit — Part 5: Internal Linking & Site Architecture

**Date:** 2026-05-30
**Site:** LessonCraftStudio — 11 locales, ~16,551 decks + ~9,432 topic pages + activities/tools. The §1 "SEO + embed-virality flywheel" depends on this dimension.
**Method:** Read-only. Two senior-SEO expert agents (internal-linking/crawl-depth · link-rendering/embed-backlink verifier) read code + curl-verified live, with emphasis on whether links actually *render* as crawlable anchors in raw SSR HTML (not just code intent). Three structural gaps re-verified directly. Zero changes.
**Part of:** the 6-part exhaustive SEO audit. **This is the weakest dimension found.**

---

## 1. State of the world

The internal-link mesh is **half-built**: the "down" direction (hub → topic → deck) is excellent, but the "up" direction (deck → hub) and the crawl-multiplier surfaces (homepage, footer, nav) are **absent from server-rendered HTML**.

### What's working (verified live, no action)
- **Topic pages are the load-bearing crawl engine — and they're excellent.** `/en/topic/addition` renders **173 server-side `<a href>`** (19 distinct `/topic/`, 93 distinct `/decks/`, zero `onclick`): deck-card grid + variety strips + cross-axis pivots + sibling-axis pills + pagination, all real SSR anchors. The `/topic/` index hub renders **99 topic links** (A–Z axis keys). Intersection page `/en/topic/addition/animals` = 7 topic + 15 deck anchors.
- **Deckend suggestion strip renders 100%** across a 12-deck live sample spanning 8 locales / 7 apps / old-short + new-native slugs (incl. fr-wave + rare nl/da/fi): each deck ships a populated `<section class="lcs-deckend-suggestions">` with real `lcs-deckend-tile` `<a href>` anchors, fully substituted. **The §A.14.8 stale-emit defect (Mode A/B) is NOT present.**
- **Embed-virality backlink mechanism works by design.** The embed snippet's two visible `<a href>` (brand-anchor → deck URL; keyword-anchor "free printable worksheets" → homepage) are assembled and land on the *host* page after paste — the intended flywheel backlink surface (§1).
- **Anchor-text quality is good** — descriptive keyword/native-language anchors, no "click here" generics.
- **Topic-page breadcrumb** is visible + JSON-LD-marked.

### Architecture map (as it crawls today)
```
Homepage /[locale]        ~12 internal links, 2 topic links, 0 footer mesh (SSR)  ← crawl-bait COLLAPSED
  ├─ /worksheets/         chrome-only hub, ~1 link                                ← DEAD-END
  ├─ /activities/         17 activity links                                       ← healthy
  ├─ /tools/              3 tool links                                            ← healthy
  └─ /topic/              99 topic links                                          ← STRONGEST CRAWL HUB
        └─ /topic/<axis>/        173 anchors (deck cards + pivots + strips)
              └─ /topic/<a1>/<a2>/   (intersection)
                    └─ /decks/<slug>/   9 deck→deck tiles, 0 topic links, no breadcrumb
                          └─ escapes only deck→deck; climbs to a hub ONLY via XML sitemap
```
`/topic/` does nearly all the load-bearing crawl-distribution. The homepage/footer/nav surfaces that §1/§16.6 designate as the *primary* crawl-bait contribute almost nothing in SSR HTML.

---

## 2. Findings (ranked)

### 🔴 HIGH

**P5-01 — Deck pages emit ZERO deck→topic links (asymmetric link graph).** *(Effort: M)*
Confirmed live: `/en/decks/subtraction-cross-out-farm-animals/` has **9 deck→deck suggestion tiles but 0 `/topic/` links** and no catalog-home link. `buildEndDeckLinks()` returns `''` on the direct-emit path (`catalog-export.js:962` — it only emits when called with `includePlaceholders:true`, which the publish/export path never passes); the §16.5/§17.8.2 `__LINK_MORE_TYPE/THEME/LEVEL/BROWSE_ALL__` placeholders never ship — only the orphaned `.end-deck-links` CSS does. Result: topic pages link richly *down* to decks, but ~9,800+ decks never link *up* to their hubs. A crawler entering a deck walks deck→deck→deck laterally and can only climb to an indexable hub **via the XML sitemap**. This starves the deep long-tail (39K+ deck/intersection URLs) of internal PageRank and crawl priority. **This is the #1 architecture defect.**
**Fix:** emit end-deck topic links on the forward export path + retrofit existing decks (precedent: `inject-deck-end-strip.js`, §15.17). The placeholders + substitution machinery already exist (§16.5) — they just aren't being rendered.

**P5-02 — Homepage crawl-bait collapsed ~140 → ~12 after the homepage-v3 promotion.** *(Effort: M)*
Confirmed live: `/en` SSR carries only **~12 unique internal links, 2 topic links** — ~9% of the §1 ~140-links/locale crawl-bait target. The homepage-v3 promotion (`bc215a5c`, 2026-05-24) replaced the §18.4.2 BreadthGrid 9-cell crawl grid with the pillar stack; `PillarInteractive.tsx:46` now renders only 1 featured deck + 2 variety thumbs (4-type allowlist, same-locale, no cross-locale fallback). The §1 crawl-bait-density doctrine and §18.4.2 9-cell composition are no longer satisfied on the live homepage — a regression.
**Fix:** restore a crawlable multi-deck/multi-topic grid into a pillar, or add an SSR topic-link block (the homepage should expose dozens of topic anchors, not 2).

**P5-03 — Footer + header-nav topic mesh is client-gated → 0 crawlable links site-wide.** *(Effort: L–M)*
Confirmed: `/en/about` raw SSR HTML has **0 footer `/topic/` links** (6 internal links on the whole page). `FooterCategoryDropdowns.tsx:153` and `CategoryNav.tsx:114` gate the entire link panel behind `{isOpen && (...)}` (client `useState`), so the §16.6 "footer surfaces topic links across 3 columns" mesh produces **zero crawlable output on every page**. A persistent site-wide topic mesh is one of the cheapest, highest-value internal-link multipliers — and it's invisible to crawlers.
**Fix:** render an always-on SSR `<nav>`/`<ul>` of top topic/type/language links alongside the JS dropdown (the data already flows server-side via `availableThemes`/`availableExerciseTypes`). Cross-ref §A.13.50 (client-dropdown SSR gotcha).

### 🟡 MEDIUM

**P5-04 — Deck pages have no breadcrumb** *(Effort: M)* — no BreadcrumbList markup and no visible trail (deck.html is static nginx-served and never got one). Compounds the deck→hub climb-back gap (P5-01) and the breadcrumb-eligibility gap (Part 3). Add a breadcrumb to the deck.html export template + retrofit.

**P5-05 — `/worksheets` hub is a chrome-only dead-end** *(Effort: M)* — ~1 deck/topic link despite being the nav "Browse all" CTA target. Should list topic axes / recent decks. Overlaps Part 3 P3-05 (no JSON-LD) + Part 4 P4-03 (thin, 190w) — a single rebuild fixes all three.

**P5-06 — The ≥3-inbound-surface gate counts DB projections, not rendered HTML.** *(Effort: M)* `count-inbound-surfaces.js:79-130` hardcodes 4 surfaces `true` and reads 3 from DB counts, so it passes for every deck **while the in-HTML deck→hub direction is broken** (P5-01). The gate gives false comfort — it asserts ≥3 inbound paths that don't all exist as rendered anchors. Align the counter with rendered reality (e.g., count the actually-emitted deckend strip + end-deck topic links).

**P5-07 — No orphan-detection coverage for the live catalog.** *(Effort: M)* `scripts/audit-orphan-pages.js` is seller-era/dead — it audits 410-Gone `/apps`,`/tools`,`/guides`,`/bundles` + `/en` only, not the live 16,551-deck/topic/activity corpus. There is currently **no instrument** that would catch a genuinely orphaned live page. Replace with a live-corpus crawl-graph check.

### 🟢 LOW

- **P5-08** — Activity pages lack BreadcrumbList JSON-LD (visible trail fine) — duplicate of Part 3 P3-06.
- **P5-09** — The deck's always-on attribution backlink is JS-`createElement`-only (not in raw DOM) + uses apex host (301→www). Minor: the *embed-snippet* backlinks are the load-bearing flywheel surface and they work.

---

## 3. Orphan reality (important nuance)

Decks are **not truly de-indexed.** Reverse equity holds — topic-page grids link *down* to decks, and every deck is in the XML sitemap. The problem is that the *intended bidirectional mesh is half-built*: the down-links (topic→deck) are excellent; the up-links (deck→topic) and the crawl-multiplier surfaces (homepage/footer/nav) are absent from SSR. The effect is **suppressed crawl efficiency and internal PageRank flow to the deep long-tail**, not outright deindexing. For a site whose entire growth thesis is SEO + long-tail discovery (§1, §19), that suppression is nonetheless the most consequential on-site finding in this audit.

---

## 4. Scorecard

| Dimension | Status | Evidence |
|---|---|---|
| Topic-hub mesh | 🟢 | 173 anchors/topic page; 99-link `/topic/` hub; real variety/pivot/sibling strips |
| Deckend suggestion strip render | 🟢 | 100% across 12-deck sample; no §A.14.8 stale-emit |
| Embed backlink mechanism | 🟢 | brand + keyword anchors land on host page (by design) |
| Anchor-text quality | 🟢 | descriptive keyword/native anchors |
| Deck→topic up-links | 🔴 | 0 — asymmetric graph (P5-01) |
| Homepage crawl-bait | 🔴 | ~12 vs ~140 target (P5-02 regression) |
| Footer/nav SSR mesh | 🔴 | client-gated, 0 crawlable (P5-03) |
| Deck breadcrumb | 🟡 | none (P5-04) |
| Inbound-surface gate fidelity | 🟡 | DB-projected ≠ rendered HTML (P5-06) |
| Orphan-detection coverage | 🟡 | no live-corpus instrument (P5-07) |

---

## 5. Remediation order

1. **🔴 P5-01** — emit deck→topic end-links (forward path + retrofit). *Biggest structural lever: gives 39K+ deep URLs a crawlable climb back to hubs.*
2. **🔴 P5-03** — always-on SSR footer/nav topic mesh. *Cheap, site-wide multiplier; data already server-resolved.*
3. **🔴 P5-02** — restore homepage crawl-bait (topic-link block / deck grid).
4. **🟡 P5-04 / P5-05** — deck breadcrumb; rebuild the `/worksheets` hub (also closes Part 3 P3-05 + Part 4 P4-03).
5. **🟡 P5-06 / P5-07** — make the inbound-surface counter reflect rendered HTML; build a live-corpus orphan check.
6. **🟢 P5-08 / P5-09** — opportunistic.

---

## 6. Notes for the master roadmap

- **Theme of this part:** several "doctrine-satisfied on paper" mechanisms (the §16.6 footer mesh, the §15.18 ≥3-inbound floor, the §1 homepage crawl-bait, the §17.8.2 end-deck links) **do not produce crawlable output on live**. The gap is consistently *render-time*, not design-time — client-gating (`{isOpen &&}`), an un-passed `includePlaceholders` flag, and a homepage-v3 regression.
- **High leverage, contained effort:** P5-01 + P5-03 together would transform the crawl graph (every deck gains an up-link; every page gains a topic mesh) and both reuse existing server-resolved data + existing retrofit precedents.
- **Net-new:** all P5 findings are net-new vs `MASTER-DIAGNOSIS.md` / the deck `seo-100pct` reports (which validated per-deck on-page SEO, not the cross-page link graph).
- **Read-only confirmation:** no code/config/server/DB changes. Only this report was written, under `docs/audit-results/`.
