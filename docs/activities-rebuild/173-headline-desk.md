# #173 — Marina's Headline Desk → THE STAPLER (RI.2.2; all 11 locales)

ORDER row 173 · id `marina-headline-desk.main-topic.ri-2-2` (kept). Design: `designs/173-marina-headline-desk.md`.

## The invention
- **The article lies on Marina's desk as loose strips, one sentence each.** A headline card goes into the slot on top, and Check is the stapler.
- **The stapler binds only what the headline is about.** The strips the card covers are stapled down; the rest are blown off onto the floor band by the fan. "Main topic" stops being a feeling and becomes a count: the right headline holds every strip.
- **The classic mistakes show themselves:**
  - a detail headline staples one strip;
  - a neighbour headline (same subject, wrong story) staples nothing;
  - at Level 2, a one-paragraph card staples its own two strips and lets the other paragraph blow away.
- **Level 3 (one paragraph):** one paragraph is lit yellow and slid under the jaw. A card that fits it staples both yellow strips; a detail staples one; the other paragraph's card or the whole-article card reaches beyond the yellow strips and jams the stapler open.
- **After two misses** the strips go back on the desk with the thread words underlined (the words that carry the topic through every sentence).
- **Success:** Marina's paw stamp in the slot and a front page with the masthead; Next follows 0.5 s later.
- **Levels:** Story (one paragraph, 3 strips, 8 rounds) · Two paragraphs (4 strips, 8 rounds) · One paragraph (16 rounds from the two-paragraph articles, one per paragraph). Cards: 3 or 4.

## Rounds (design §6, measured)
- The right card's slot follows the design's tables per level and card count, rotated by one each pass; the other cards are rotated too. The order of rounds reshuffles per pass and never repeats the previous order.
- Per locale, measured by the gate's word bots: a card that shares the most words with the strips wins at most 3 of 8 rounds (Levels 1–2) and 6 of 16 (Level 3), with 3 and with 4 cards. Every neighbour card shares a word with its article, so it cannot be dismissed by eye.

## Deviations from the design
- **The texts and cards live in `headline-desk-data.js`; the manifest row keeps params `{}`.** The old `main-topic` engine's two gates (`verify-main-topic-core.js`, `local-test-marina-headline-desk.js`) are retired; `main-topic-core.js` is left in place, unused.
- **On phones Check sits in the floor band** beside the fan, so it stays above the fold; used cards and the floor band are hidden once solved.
- **The task line is simplified** to "What is the whole article mostly about?" in all 11 locales (it had to fit the 320 fold).
- **No strip dragging and no long-press read-aloud.** The strips are fixed; the hand is the card and the stapler.
- **The miss result stays on the desk until the card changes**, so the child can read which strips were stapled.
- **Level 3 has its own help line** (`hintMiss2Y`), since "every strip" is wrong there.
- **The en level label is "Short article"** for Level 1.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE:**
  - penguins L2 paragraph card → "Birds that swim but cannot fly";
  - bread L2 paragraph card → "Getting the dough ready";
  - bread.1 and snow.1 Level-3 fit cards ("How snow forms in a cold cloud");
  - the Level-3 help said "every strip" → new `hintMiss2Y`;
  - en `qWhole`; de *zufriert*; fi `hintDetail` case; fi snow strip 3; nl prose; fr prose narrow no-break spaces.
- **MINOR:** fi `qWhole`, fi neighbour "Pulkkailua lumessa", fi prose *hänen*; no ants topic; da/no imperative headlines; sv *Tandborstning*; no *regnvær*; pt *Plantada na terra*; fr *fait la une*; nl *repareert*.
- **Skipped:** es/it wind edits — those Level-1 articles are kept verbatim from the old activity by design (the gate freezes them).

## Found by building and measuring (no gate had them)
- **The word bots read `\b` as ASCII-only** and missed å/ä/ö/é words; they now use `(?<!\p{L})…(?!\p{L})` and count words of 4+ letters. Many cards were then re-tuned per locale (length, overlap, question-word starts).
- **es and it trees fourth cards were near-copies of a strip;** the gate now refuses any card that copies 70 % of a strip.
- **Neighbours that shared no word** (nl sleep, da wind → *sejlbåde*, fi trees → *puusta*) were too easy to dismiss.
- **Phone layout:** the desk and the side panel had flex-basis height bugs; blown strips left gaps (now removed from flow); the paw stamp moved into the slot; at 320 the strips, cards and floor compact.

## Gates
- `verify-headline-desk-core.js` 9,603/0 — design tables, the frozen Level-1 articles, its own staple rule, roles, neighbour word-sharing, the copy rule, headline form, thread words, bots, slot tables, check flows, string parity, fr spacing, no "Common Core" in non-en text, the manifest, the html, `OK_MS` 500.
- `mutate-headline-desk.js` 20/20 killed (3 aimed at de data).
- `local-test-headline-desk.js` 2,158/0 in 11 locales (re-run after the picture resize).
- Visual QA ×11 locales: 192 renders each (4 phases × 8 rounds × 6 viewports), all PASS.
- Other audits: hierarchy 291/0; settings efficacy 2 live; prose claims, SERP copy, content tells, route preflight and Next delay all PASS.
- **The hierarchy audit first failed 56 checks**, all of them picture size: the stapler (64 px) and the fan (48 px) were under the 96 px floor on wide screens, and the otter, stapler and fan were under 64 px on phones. The data-mark exemption is for graph marks, so it does not apply. All three were raised to the floor (stapler 112×96 wide / 64 phone, fan 96 / 64, otter 64 on phones from 360 up). At 320 the bigger pictures pushed the cards and Check 7–34 px below the fold in pt and nl (local-test caught it), so the 320 layout alone keeps the smaller pictures (otter 44, stapler 58×46, fan 44); the audit's phone floor is measured at 360. Local-test and visual QA were re-run in all 11 locales.

## Live (2026-10-31)
- Deployed with `4eb376db2`; payment canary OK. The page serves `marina-headline-desk-activity.html?v=9.919`.
- `live-verify-headline-desk.js --locales=en,de,sv,fi`: 52/0. All 11 pages return 200. At 1366 and 390, a real tap on the detail card + the stapler staples one strip and blows two onto the floor; the topic card + the stapler staples every strip, solved; the iframe grows with the card.
- The first run reported 403 for all 11 pages: Cloudflare's Super Bot Fight Mode (2026-10-28) challenges plain node/curl requests as "definitely automated", while the origin answered 200 and the browser plays passed. `scripts/lib/qa-header.js` now also exports `headers()` for plain https status checks to our own host, and this script sends it.
