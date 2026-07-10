# Forensic SEO Audit — what destroyed the traffic (May 25 – June 20, 2026)

**Audit date:** 2026-07-10 · **Auditor:** Claude (Fable 5), independent re-verification
**Method:** nothing below is sourced from CLAUDE.md / memory files / commit messages alone.
Every claim cites its evidence: a git diff, a live HTTP response captured 2026-07-10, a
server-side census over the actual files on Hetzner, or a read-only DB query. Where a claim
could NOT be independently verified (no Search Console access), it is marked **[UNVERIFIED]**.

---

## 1. Executive summary

The traffic collapse was not one mistake. It was **four stacked events**, two of them landing
exactly in your June 1–10 window, plus a **May 1 event with a delayed fuse** that prior
sessions under-weighted. Three of the four were later reversed — but the recovery is being
held back by **live defects that still exist today** (section 4), several of which prior
sessions never detected.

| # | Date | Event | Status today |
|---|------|-------|--------------|
| 0 | **May 1** | Middleware 410-Gone on the ENTIRE seller-era index: `/apps` (worksheet-maker pages — described in-repo as the single biggest traffic source), `/blog` (100+ posts indexed since Feb), `/guides`, `/ideas`, `/tools`, `/gallery`, `/bundles`, `/start`, `/compare` (commit `49b501b0`). Google drops 410'd URLs as it recrawls — decay ramps over 2–6 weeks, i.e. **through May, bottoming out at end of May / early June** | Makers resurrected as `/tools/` only on Jun 14 (+301 map); blog still 410 (Googlebot still hitting 1,187 blog 410s in the last 14 days) |
| 1 | **May 31** | `X-Robots-Tag: noindex` on ALL deck PDFs, all 11 locales (nginx patch, commit `1bc9f21e`). PDFs were earning direct "printable … pdf" clicks | Reversed Jun 20 (`865daee1`); PDFs verified indexable today |
| 2 | **May 31** | Non-EN slug migration orphaned ~8.9k PDFs → 404 (de/es/pt/fr/it, 25–35% of PDF links; `migrate-native-mode-slugs.js` renamed dirs/slugs but not the PDF files) | Repaired Jun 20; verified today: **all 52,773 deck dirs have their PDF**, DB URL columns 100% clean |
| 3 | **Jun 1–10** | **Canonical mass-repoint**: ~5,800 EN+DE+ES deck pages (the ranking inventory of the 3 biggest locales) had `rel=canonical` + `og:url` + JSON-LD `url/@id` flipped to brand-new `/worksheets/` landing pages — EN Jun 6–8, DE all-in-one-day Jun 8, ES Jun 9–11 — while **the sitemap kept advertising the deck URLs until Jun 14** (contradictory signals), the hub link-graph flipped to the landings the same week (`51ae864c`), and the repoint script **corrupted the decks' own hreflang** (see 4.1). Today 34,943 of 45,756 deck.html files canonicalize to landings | Landings healthy today; but see live defects 4.1–4.3 |
| 4 | **Jun 2–11** | Maximal churn at the worst moment: all ~22,499 deck.html files byte-rewritten **3–6× in 36h** (img-dims, font flip-flop ×3, link de-slash ~110k edits); **every deploy from Jun 4 took the whole site down for the build window** (commit `e34b784c`, at a deploy-per-activity cadence); Jun 11: second full title/meta rewrite in 2 weeks (~5,904 pages) after the May 28 deck-title overhaul and May 27 homepage rewrite ×11 | Deploy downtime fixed Jul 5 (zero-downtime release model, verified in current `deploy.sh`); title churn stopped |

**Why the operator saw the crash on June 1–10 specifically:** Google *processes* a May 31
noindex + a May 31 mass-404 during the following days — the click loss becomes visible June
1–10. The canonical repoint of EN (Jun 6–8) and DE (Jun 8) then pulled the deck pages
themselves out of the index as "duplicates" of zero-history URLs. Any seller-era residual
traffic was simultaneously finishing its 410 decay. Everything hit the same ten days.

**Why traffic has NOT recovered by today (~11–15 clicks/day):** the fixes shipped Jun 20–25,
but (a) Google must re-rank ~30,000 brand-new landing URLs with zero history from scratch —
that is a weeks-to-months process, made slower by the June churn; (b) several **live defects
are actively blocking recovery** — most damagingly, an nginx redirect **infinite loop** on
exactly the PDF URL forms Google held before June (section 4.2), and 165+ pages whose
canonical points at a 404 (4.3); (c) the domain lost a large authority surface on May 1
(blog + makers) that has never been replaced — the maker pages came back Jun 14 as new URLs.

---

## 2. Verified timeline (each row verified from the diff / server / live HTTP)

### Pre-window churn (May 25–31)
| Date | Commit(s) | What Googlebot experienced |
|---|---|---|
| May 26 | `cd415688`, `ff52dd66` | Site-wide canonical + sitemap trailing-slash strip on all hub/landing routes — every hub URL's canonical form changed |
| May 27 | `51320f7b`+9, `7e93cb38` | Homepage `<title>`/H1/meta rewritten in all 11 locales at once |
| May 27–28 | `b79d03a3`, `5ffc0785`, `0468eecf`, `73eead6d` + cluster | PDF filename renaming begins; **full deck-title overhaul** (brand + "Set NNN" dropped, every deck `<title>`+meta rewritten catalog-wide) |
| May 30 | `c07ccfb5`, `9ed60099`, `fef2b985` | Private trees noindexed; sitemap shards pruned; per-tool landings carved out of the /tools 410; robots API sitemap name fixed |
| May 30–31 | `924cab1d`, `33eb1888`, `77356ca2`, `0b943245`, `63877957` | 4 more full-or-partial corpus rewrites of live deck.html (end-links injection ~16k decks, meta-description differentiator, html-lang/hreflang re-code, embed-hide, topic-title casing fr/es/it/pt/nl) |
| **May 31** | `1bc9f21e` | **PDF noindex** patched into nginx (destroyer #1) |
| **May 31** | `2211eaeb`, `8d676727`, `9323d617` | **Non-EN slug migration** → ~8.9k PDF links 404 (destroyer #2); 73-deck thanksgiving re-slug (`95142dd4`, 301-mapped) |

### The operator's window (June 1–10) — all 263 commits reviewed at diff level
| Date | Commit(s) | What Googlebot experienced |
|---|---|---|
| Jun 2 | `516d2561`, `3f3b5137`→`bcdfa980`→`8fd50a7b`, `76094201`, `fe8dcfc5`, `39843891`, `b0bb0778` | **All ~22,499 deck.html files rewritten 3–6 times in ~36 hours** (img width/height injection; font async→revert→re-async; deck-end strip un-hidden — it had been `hidden`/display:none since inception, so the 6-link internal-link strip on every deck had never counted; ~110k topic-link + breadcrumb JSON-LD URLs de-slashed). Browse-surface thumbnails now routed through `/_next/image` reading **stale DB thumbnail columns** for the decks re-slugged May 31 |
| Jun 4 | `e34b784c` | deploy.sh: `pm2 stop` before delete+build → **the whole site 502s for every build window**, at a deploy-per-activity cadence (~87 deploy mentions in window commits). Repeated 5xx bursts throttle crawl and temporarily drop frequently-crawled URLs |
| Jun 6 | `32e9af1e`, `d2f12145`, `a681d48d`, `51ae864c` | `/en/worksheets/` landing route born (143 pages); **hub link-graph flips**: every topic-hub/variety-strip card for a landed deck now links to the landing, not the deck page. First canonical repoints run as *uncommitted scratch* (script only committed next day in `ab11441e` — "proven across Wave-1") |
| Jun 6–8 | waves W2–W8 | **EN: 1,811 landings + ~2,000 deck canonicals repointed.** Every repointed deck's canonical/og:url/JSON-LD now votes for a URL that is hours old, while the deck URL stays in the sitemap (until Jun 14) |
| Jun 8 | `79e76623`…`64231d91` (15 commits) | **DE: 1,779 landings + ~1,900 deck canonicals repointed IN ONE DAY.** Landing hreflang switched from self-only to cross-locale the same day |
| Jun 9–10 | `7132bcc1`…`8613ba01`, `80c49ab5`, `6f60ae1f` | **ES: ~1,400 landings + repoints**; 52 es decks re-slugged with stale asset columns (later named a §8.1 root cause); og-images regenerated for landed decks |
| Jun 11 (boundary) | `d3cff15f`, `f1bd2550`, `c0eb3650` | **Second mass title/meta rewrite in 2 weeks**: all 2,005 en + 1,972 de + 1,927 es landing titles+metas re-keyed in one day |

### Post-window (context for recovery)
| Date | Commit(s) | Event |
|---|---|---|
| Jun 12 | `67e6867f` | Landings enter sitemap (shard 4) |
| Jun 14 | `eb6b43cc`, `32896d0d`/`836ab0b8`, `a60594ca` | **ALL deck pages removed from the sitemap** (shards 0/1 emptied); worksheet-maker landings resurrected at `/tools/` + `/apps/*` 301 map; thin intersections noindexed |
| Jun 20 | `865daee1`, `2b12d7cd` | PDF noindex REVERSED; ~13.2k landing-less decks re-added to sitemap; ~17k old PDF URLs 301-mapped; ~8.8k PDF filenames repaired (verified complete today) |
| Jun 25–26 | `fix-deck-url-columns`, makewhole-301 | DB asset-column drift repaired (verified 0 drift today); Googlebot 5xx spike Jun 26 (232 hits — deploy downtime era) |
| Jul 5–6 | build-incident fix; hub program | Zero-downtime deploys (verified in deploy.sh); blog/faq/Shopify 410 entity reset; hubs ×11 locales |

---

## 3. Root-cause attribution (adjudicated, with confidence)

**Primary destroyers of the June 1–10 crash — three mechanisms, additive:**

1. **PDF noindex, May 31** (processing lag lands the visible drop in Jun 1–10). Confidence:
   **high**. Site-wide, all locales, and it targeted the URL class earning direct clicks
   ("printable … pdf" intent). The in-repo post-mortem attributes the 80→15 drop to it
   **[UNVERIFIED — needs your GSC Performance data to confirm proportion]**.
2. **Canonical mass-repoint + hub-link flip, Jun 6–11** (EN→DE→ES, ~5,800 decks). Confidence:
   **high** as a major contributor and as the main **recovery suppressor**. Mechanism Google
   saw: thousands of ranking URLs simultaneously (a) declared themselves duplicates of
   zero-history URLs, (b) lost their internal links, (c) stayed in the sitemap for another
   week (contradiction), and (d) had their hreflang clusters corrupted (see 4.1). Long-tail
   rankings held by `/decks/` URLs dropped; the replacement `/worksheets/` URLs start from zero.
3. **Non-EN PDF 404s, May 31** (25–35% of de/es/pt/fr/it PDF links). Confidence: **high** for
   the non-EN share of the drop.

**Aggravators (extended/deepened the dip):** total-corpus HTML churn ×3–6 on Jun 2–3 on top
of 4 corpus rewrites May 30–31 and two full title-rewrite events (May 28, Jun 11) — Google
re-evaluated every page's content while its canonical signals were moving; deterministic
deploy downtime from Jun 4 under an extreme deploy cadence (502 bursts → crawl throttling);
deck pages pulled from the sitemap Jun 14 (partially reverted Jun 20).

**The under-weighted May 1 event:** the 410 of `/apps` + `/blog` + 7 more prefixes
(`49b501b0`) deleted the seller-era index — including the maker pages the repo itself calls
"your single biggest traffic source" **[UNVERIFIED proportion — GSC would show it]**. Its
decay curve (Google drops 410s as it recrawls, over weeks) lands the tail of that loss in
late May / early June, blending into the crash you attributed to June 1–10. The makers only
returned Jun 14, as **different URLs** (`/tools/...-maker`), i.e. from zero.

**What did NOT cause it (verified non-causes):** robots.txt (unchanged since May 1, blocks
nothing relevant — verified live); Googlebot rate-limiting (no 429s to Googlebot in 14 days
of logs; the fleet-block map explicitly exempts crawler UAs — verified in nginx config);
sitemap↔canonical conflicts TODAY (0/40 sampled conflicts; the census shows only 3 conflicts
of 9,752 sitemap deck URLs); structured data (12/12 sampled JSON-LD blocks parse, URLs match
canonicals); page speed (TTFB 0.04–0.12s on every class sampled).

---

## 4. LIVE damage inventory — what is still broken TODAY (2026-07-10)

Ordered by recovery impact. Items 4.1–4.4 were **not known** to prior sessions.

### 4.1 Repointed decks carry corrupted, mixed hreflang clusters — **3,450 files, live today**
`repoint-deck-canonical.js` blanket-replaces every quote-terminated occurrence of the deck's
own URL — which includes its **hreflang self/x-default entries** — while sibling-locale
entries keep pointing at `/decks/` URLs whose canonicals point elsewhere. Full server census
(all 11 locales, 2026-07-10): **3,450 deck.html files carry a mixed landing/deck hreflang
cluster** (example: `decks/en/alphabet-train-v1/deck.html` — `hreflang="en"` →
`/en/worksheets/alphabet-train-animals-preschool`, `hreflang="de"` → `/de/decks/buchstabenzug-tiere/`),
and a further **4,532** carry deck-only clusters whose targets are themselves largely
non-canonical (repointed) pages. Google discards non-reciprocal clusters, dissolving the
cross-language network on exactly the decks that had one. Mechanism verified from the script
source (`scripts/seo-landing/repoint-deck-canonical.js:50-53`).
**Fix:** strip or rebuild hreflang on repointed decks (they are non-canonical; correct state
is NO hreflang on the deck + full cluster on the landing — landings verified healthy).

### 4.2 nginx PDF 301 **infinite redirect loop** on dead deck dirs — recovery blocker
`curl -sI https://www.lessoncraftstudio.com/en/decks/addition-make-whole-toys/addition-make-whole-toys-printable.pdf`
→ `301 Location: <the same URL>` forever (edge-cached, `max-age=300`). The make-whole 301
rule rewrites any missing `*-printable.pdf`/`*-answer-key.pdf` to `<dir-slug>-printable.pdf`
**without checking the target exists** — so every Google-held PDF URL under a deck that was
re-slugged/unpublished is a permanent redirect loop instead of a 404/410 or a 301 to the
live file. This poisons precisely the pre-June PDF inventory whose recovery was the point of
the Jun 20 fix. **Fix:** guard the rewrite with a file-existence check (`if (!-f ...)`),
else return 404.

### 4.3 165 Italian decks canonicalize to a 404: `/it/worksheets/undefined`
A repoint/landing-gen run wrote a literal `undefined` slug (verified: 165 files, e.g.
`decks/it/bingo-in-giro-per-casa-3305-v1/deck.html`; target returns 404). Plus 2 es
treasure-hunt landing targets that 404 (`busqueda-del-tesoro-...-accesorios-0615`,
`...-animales`). A canonical→404 is a deindex instruction with no replacement. **Fix:**
re-run repoint for these decks with correct slugs, or restore self-canonicals.

### 4.4 Slash-less deck URLs hard-404 (no redirect)
`/en/decks/<slug>` (no trailing slash) → 404 in all locales tested, while the rest of the
site 308s slash-variants. Any slash-stripped citation/index entry is dead. **Fix:** one
nginx rule: `location ~ ^/(..)/decks/[^/.]+$ { return 301 $uri/; }`.

### 4.5 Residual canonical/sitemap edge cases
3 sitemap deck URLs whose deck.html canonicalizes elsewhere (incl. `/en/decks/find-and-count`,
`/en/decks/find-and-count-thanksgiving`); 783 self-canonical decks absent from the sitemap;
Google still requests `/sitemap/8.xml` (404 — a shard count that shrank; harmless but easy
to clean via re-submission).

### 4.6 Structural/efficiency issues (lower order)
- **Googlebot spends ~40% of its crawl on 301s** (11,084 of ~31.8k hits in 14 days — old-slug
  map + apps/blog redirects). Transitional, but it slows re-indexing of the new URLs.
- **Topic hubs (2,541 indexable pages) serve `Cache-Control: private, no-store`** — every
  crawler hit is origin-rendered; inconsistent with the rest of the site (deck/landing 200s
  are edge-cached).
- Apex root redirect is 2 hops (`apex → www → /en`); `/pricing` 307s (temporary) rather than
  308/301 — minor signal dilution.
- Most deck pages emit no hreflang at all (~18% have any) — acceptable for repointed decks
  (non-canonical) but the ~10.8k SELF-canonical decks mostly lack clusters they could have.
- Theme-mismatched hreflang sibling (vehicles ↔ "4-de-julho", treasure-hunt v32 residue) —
  structurally valid, semantically wrong.

### 4.7 Verified healthy today (so you don't re-litigate them)
Landings: 30/30 sampled 200 + self-canonical + `index,follow` + native titles + reciprocal
hreflang (12-locale sets). Sitemap: 45,465 URLs, all sampled classes 200/indexable/consistent.
PDFs: indexable, all 52,773 deck dirs have their files, DB URL columns 0 drift, old filenames
301 correctly **when the deck is live**. Titles: 0 duplicate title-hashes in the DB. JSON-LD
valid. TTFB excellent. No 429/cloaking for Googlebot. Deploys zero-downtime since Jul 5.

---

## 5. Prioritized fix list (NOT applied — awaiting your go)

| P | Fix | Effort | Risk | Expected effect |
|---|-----|--------|------|-----------------|
| 1 | **nginx: existence-guard the make-whole PDF 301** (else 404) | ~10 lines nginx | low (config change + reload; rollback = revert block) | Unblocks Google's re-processing of the entire legacy PDF inventory; kills the edge-cached loop class |
| 2 | **Fix the 165 it→`undefined` + 2 es canonical→404 decks** (re-run repoint with correct mapping or restore self-canonical) | small script, bounded set | low (per-deck backups exist) | Recovers 167 pages from deindex-with-no-replacement |
| 3 | **Strip the corrupted mixed hreflang from repointed decks** (retrofit script; forward-fix the repoint script to also remove self-hreflang cleanly) | medium (corpus retrofit, idempotent, backed up) | low | Removes contradictory international signals on the biggest page class |
| 4 | **nginx: 301 slash-less `/decks/` URLs → trailing slash** | 1 line | low | Recovers every slash-stripped external/indexed citation |
| 5 | Sitemap hygiene: fix the 3 conflicting deck entries; add the 783 missing self-canonical decks; re-submit sitemap in GSC | small | low | Removes residual mixed signals |
| 6 | Cache topic hubs (drop `no-store` → short public TTL) | small | medium (verify no personalization on those routes) | Crawl efficiency across 2,541 hub pages |
| 7 | Collapse apex 2-hop redirect; make `/pricing`-class redirects 308 | small | low | Minor signal consolidation |
| 8 | **Strategic (your call): the lost authority surface.** The May-1 410 wave deleted blog+makers wholesale. Makers are back as new URLs; the blog's link equity was discarded rather than 301-mapped. Consider selectively 301-mapping the highest-authority old blog/app URLs to their nearest live equivalents instead of 410 | content/strategy decision | — | Domain-authority recovery lever |
| 9 | **Stop the churn.** Freeze title/meta/canonical/slug rewrites for 6–8 weeks. Every full-corpus rewrite since May 26 restarted Google's re-evaluation clock. Recovery needs signal *stability* now | discipline, not code | — | Lets rankings settle |

---

## 6. What I need from you (5 minutes) — GSC export to close the attribution

I found no Search Console API credentials anywhere in the repo or server (verified), and
archive.org's CDX API was down during the audit (504s), so the click-data side rests on
in-repo claims marked [UNVERIFIED]. To convert the attribution from "mechanism-proven" to
"data-proven": Search Console → Performance → Date range 2026-04-01→today → export
(Pages + Queries + Dates tabs). Two questions it answers immediately:
1. Did clicks start sliding in early-mid May (410-decay of blog/makers) or only after May 31
   (PDF noindex)? — apportions blame between event 0 and events 1–3.
2. Which page class held the clicks pre-crash (`.pdf` URLs vs `/decks/` vs `/apps/` vs blog)?
   — tells us which recovery lever (P1/P3/P8) pays most.
