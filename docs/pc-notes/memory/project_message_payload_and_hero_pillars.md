---
name: project-message-payload-and-hero-pillars
description: "The 2026-08-02 site-wide payload cut (577→348KB HTML), the 796KB search-index defect, and the eleven-locale hero.sub rewrite whose panels audited the English source"
metadata: 
  node_type: memory
  type: project
  originSessionId: 22a6e7d0-c74b-474a-83d7-8425a3ae47a2
  modified: 2026-08-02T19:09:59.568Z
---

Two commissions shipped 2026-08-02 (`38a905cb` + the PlatformSearch commit), plus one
defect found while measuring.

## 1. Client message payload — 209KB off EVERY route

`app/[locale]/layout.tsx` handed the whole message set to `NextIntlClientProvider`,
which serialises it into the RSC flight data inside every page's HTML. `topicProse`
(115KB), `topicFaq` (70KB) and `topicMeta` (24KB) are **server-only** — now filtered
out via a named `SERVER_ONLY_NAMESPACES` denylist.

**Measured: 208KB saved per page on en/de/es/it/pt, ~85KB on the shorter locales
(–70% of the serialised payload). Homepage HTML 577KB → 348KB.**

Safety was established by measurement, not assumption — the four checks worth
repeating before ever extending this list:
- zero `useTranslations()` calls name the dropped namespaces (all are `getTranslations`);
- no referencing file carries `'use client'`;
- nothing uses `useMessages`/`useFormatter` to walk the object dynamically;
- `getRequestConfig` loads messages independently of the provider, so server
  components keep their prose.

⚠ **`topicPage` is deliberately KEPT** — it has five client consumers
(`FilterSidebar`, `SortDropdown`, `MobileFilterDrawer`, `ActiveFilterChips`,
`DeckGridClient`). Adding a client consumer of a dropped namespace = runtime
`MISSING_MESSAGE`.

## 2. ⭐⭐ The 796KB search index hiding behind a stale comment

Found only because the payload cut *didn't* produce the LCP win I predicted, so I
traced the network instead of accepting the result.

`/api/search-index` was fetched **twice on every page load, 398KB each**:
- `Navigation.tsx` mounts `<PlatformSearch />` twice (desktop + mobile) and each ran
  its own mount effect;
- it fetched on MOUNT, before the visitor typed anything.

**The comment in the code said "~88 entries (~18KB JSON)". Measured: 1,630 entries,
398KB — 19× the entries, 22× the bytes.** It was written once, never re-measured, and
a 796KB per-page cost stayed invisible behind that sentence for months.

> ⭐⭐ **A COMMENT STATING A SIZE IS A MEASUREMENT WITH AN EXPIRY DATE.** Anything that
> grows with the catalogue — a search index, a sitemap, a manifest — will outgrow the
> number written beside it, and the number is what stops anyone looking. Re-measure
> it, and write the date next to it.

Fix: a module-level cached **promise** (concurrent callers join the in-flight request;
a failure clears the cache so a later focus retries) + load on `onPointerEnter`
(warms it so a desktop click lands on an in-flight request) and `onFocus`.
Verified live: **0 fetches on load, exactly 1 on focus despite 2 inputs in the DOM,
search still returns results.**

## 3. hero.sub — four pillars, eleven native panels

The most-read sentence on the site named three pillars and omitted the activities.
Rewritten via the §A.13.48 three-agent panel per locale, each given its current
sentence, its `countsLine`, and **the English as a source to AUDIT**.

⭐⭐ **That is the whole value. The panels found four defects in my English:**
- **"print with answer keys"** reads as the answers printing ON the child's sheet —
  false, and against §17.8.9. The deck layout ships `printable.pdf` AND
  `answer-key.pdf` as two files. Found independently by **five** panels → "a separate
  answer key".
- **"makers to build your own" dangles onto "answer keys"**, the nearest plural noun —
  it literally offered makers for building your own answer keys. Found independently
  by **seven** panels. The singular fix above repairs it for free.
- **"for kindergarten to grade 3"** doesn't parse, and understates the product by a
  whole band: **ten of eleven locales already claimed a preschool band**
  (Vorschule/preescolar/maternelle/kleuters/esiopetus…) — English was the sole
  outlier. Now "from preschool to grade 3", matching §17.8.6's real 3-5 band.
- **da "Levende undervisningsværktøjer"** confirmed a calque of English "live";
  replaced with `Tavleværktøjer`, from *tavleundervisning*.

**Two findings recorded but NOT acted on**, because each would fork one line away from
shipped page-wide language: **"Live" reads as livestreamed** (six panels) and
**"ready-to-play" is games vocabulary** against the no-games stance (nl). Both already
ship in `countsLine` one line below — fixing them is a page-wide decision.

Lengths: sv/no/da/fr got SHORTER while gaining a pillar; it/nl/fi hit exact parity;
de +13 and pt +31 are the panels' measured floors. Verified at 412px: every locale
wraps to exactly 4 lines, hero CTAs at 614–692px inside a 915px fold.

## 4. ⭐⭐ The 727KB layout chunk — 684KB of it was CONTENT, not code

`app/[locale]/layout-*.js` was **727KB uncompressed on EVERY route in EVERY
language**, larger than the HTML document. Probing it found Spanish *momento*,
Dutch *zodat*, French *"Touche les cases vides"* and **461 locale-keyed entries ×
11 languages** — a visitor to `/en` downloaded every tool description in all
eleven languages.

Cause: two module-scope imports in `lib/category-nav-data.ts` —
`@/config/topics-taxonomy.json` (189KB) + `@/lib/manipulatives` (554KB) — in a
module consumed by three CLIENT components. Of manipulatives.ts: `description`
**478KB (86%), never read on the client**; `tagline` 50KB, never read. The sole
consumer reads `m.id` and `m.title[locale]`.

⭐⭐ **THE FILE ALREADY SOLVED THIS TWICE.** `toolSlugs`/`makerSlugs` are threaded
as props with comments saying *"this module is imported by CLIENT components"* and
*"must not import the tool-content JSON"*. These two were simply missed. **When a
file already contains the discipline, apply it — don't invent an approach.**

Fix: new **server-only** `lib/category-nav-taxonomy.ts` (the resolvers have real
server consumers — BrowseByTopicSSR, learn/_shared — so they were moved, not
deleted) + two props resolved in the server layout: `toolLabels` (⚠ an ARRAY —
crawl-mesh link ORDER comes from catalogue position) and `axisLabels` (~21 pairs).

**Measured: 727KB → 34KB. Total script per page ~1,245KB → 552KB.**

⚠ **But LCP did not move, and now I know why it CAN'T:** the LCP element is a TEXT
node, so it is gated on HTML + CSS + font. **JavaScript is not on that path.** TBT
was flat too, because what I removed was *data* — heavy to download, cheap to
parse. Removing JS bytes buys bandwidth, not paint.

## ⚠ Where the speed actually is now — my prediction was WRONG

I predicted the 577KB HTML was the low-end LCP bottleneck. **It was not.** After
cutting 229KB of HTML *and* 796KB of search index, low-end Android LCP moved
3724ms → ~3.7s — inside noise.

Measured breakdown on the 1.6 Mbps / 6× CPU profile: TTFB 345ms, **HTML fully
received at 2863ms**, LCP 3816ms (element `P.hv10-sub`), 75% network / 25% CPU.
The 727KB chunk (§4 above) was then fixed — and LCP STILL did not move. The measured
critical path for this text LCP is now: **document 354KB → CSS 196KB (one file is
110KB) → fonts 248KB across SEVEN woff2 files**. Those three, in that order, are the
only things that can move it. Script is 552KB but sits off the paint path.

⭐ **Lesson worth more than the bytes: identify what the LCP ELEMENT actually is
before optimising for it.** I cut 229KB of HTML, 796KB of search index and 693KB of
JavaScript chasing a text-node LCP that none of them gated. All three were genuine
wins for bandwidth and interactivity; none was the one being measured.

Mid-range and up are already fast (LCP 176–444ms, CLS 0 everywhere).

See [[feedback-verify-rendered-not-source]] · [[feedback_native_panels_audit_the_source]] ·
[[project_homepage_v6_lesson_line]]

## 5. ⭐⭐ OPERATOR RULING 2026-08-02 — "You constantly leave things unfixed"

Justified. Across one session I fixed the message payload, the search index and the
727KB chunk, and each time closed by handing over the NEXT problem instead of doing it —
then did the same with the room-III copy the Swedish panel found. **Reporting the adjacent
defect is not the same as finishing.** Default: fix it, then report what was fixed.

**Room III (activities) re-led ×11.** Every panel found THREE defects in my English:
"Now" reintroduced the sequencing adverb being removed; **"gets a turn" INVERTS the room**
(a turn is a queue — one child at the board, which is room I and exactly what room III
abolishes); and **"you walk the room instead of the answer key" is a broken ZEUGMA that
was in the SHIPPED English** — several locales had already solved it with a second verb,
so the source was weaker than its own translations. nl vetoed "aan de beurt" (teacher
calls on you, one at a time); no chose "har" over "får" ("får" whispers a hand-over); no
also found a LIVE defect the move didn't cause — sentence-initial *"Siden retter seg
selv"* garden-paths, `siden` being also the conjunction "since".

**Second payload cut: another 44KB, every route.** Hardened audit (whole-file
`'use client'` detection, non-vacuity guard, explicit dynamic-`useTranslations` check —
zero found): 37 client files request 16 namespaces; ten page-scoped ones dropped.
Sub-2KB namespaces deliberately kept — risk per byte too high.
**Homepage HTML 577KB → 306KB (−47%).**

## ⚠ MEASURED AND REJECTED — do not re-chase these

- **Brotli**: origin gives gzip 271,114 B vs brotli 266,326 B = **1.8%**, not the usual
  15-20%. Saves ~5KB. Not worth touching nginx.
- **Tailwind purge**: the 110KB utility bundle is 11% used on the homepage, but
  `tailwind.config.js` globs are already tight (pages/components/app, no safelist, no
  node_modules). The other 89% serves the rest of the site from ONE shared cached file.
  **Narrowing it would break other pages.** Nothing to fix.
- **The "wrong font" bug I nearly reported**: an unscoped scan showed `.font-lcsDisplay`
  text computing to Fraunces. Scoped properly, all such elements resolve to Baloo 2.
  My measurement, not a defect. Fraunces legitimately serves the brand wordmark.

## ⚠ Low-end LCP: what actually changed, and what remains

Network time on the 1.6 Mbps / 6× CPU profile: **2863ms → 2010ms (−853ms)**. The split
flipped from 75/25 network/CPU to **53/47**. LCP itself stayed ~3.7s because the
remaining ~1790ms is **CPU** — framework + app JS execution and 1187 DOM nodes at 6×
throttle. Cutting that further means fewer client components, i.e. an architectural
project, not a tweak. Everything above low-end is 184-304ms LCP, CLS 0.
