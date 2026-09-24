---
name: project-homepage-v10-1-placard-band
description: "Homepage hero v10.1 (2026-09-03) — the placard band: four pillars + the ONE allowed numeral (40,000+) inside the laptop fold, poster 3:2→2:1, premium hall finish, three new/extended gates, 11-locale native rebuild"
metadata:
  node_type: memory
  type: project
  originSessionId: f0d6e61c-04ca-435b-91a3-9572c46002d3
  modified: 2026-09-03T16:45:56.843Z
---

# Hero v10.1 — the placard band (LIVE 2026-09-03; commits 7f8b5cee hero · 7f41e60f i18n · c5c56c35 gates)

**Live verification (production):** fold gate 21/21 (en 1366×768 CTA bottom 718, was 801), identity 8/8 (360 at 5.96 — the closest; thin frame rings alias at near-1:1 scale), room-order PASS, every locale renders its own count separator, 0 price words in the band. Final phone rule: 2×2 grid with the lead card in ONE cell (a full-width lead makes three rows and drops the CTA 10–47px under a 740 fold); tablet 640–1023 spans the lead; desktop band may be WIDER than the poster (1080px) so titles hold one line.

**Commission:** operator wanted the site's content stated under the H1 ("Print or make yourself —
40000+ printable worksheets, worksheet makers, classroom tools, ready-to-play activities,
interactive worksheets") and a premium hero. Plan file: `~/.claude/plans/you-should-add-the-goofy-elephant.md`.

## Operator rulings (binding)
- **"40,000+" MUST appear** — an explicit, SCOPED override of the v9.1 no-counts law for this one
  figure. **"Don't give any number for anything else."** Grade band spelled without digits
  ("third grade"); fr `CE2` is the sole listed exemption in the gate.
- **The classroom-tools card must convey breadth without a number** — operator: "sounds like there
  are only a few of them". Every locale carries a "whole shelf/kit … and many more" image.
- Four placards (interactive worksheets = a property of the library, in card 1's gloss). Poster
  3:2 → **2:1**. Nav "Worksheet creators" → **"Worksheet makers"** (EN; 9 other locales already said
  generators/makers). Local screenshot approval before deploy.
- Direction chosen on the Claude Design canvas: **Option A, four wall labels**
  (https://claude.ai/code/artifact/4a5f47f2-5a47-4d75-9285-3a758a10ff72).

## The measured defect and the fix
Production 1366×768: poster ended y≈700, primary CTA bottom **801px** — only the picture and a
poetic H1 in the fold. v10.1: `--g10-fold: calc(100svh - var(--g10-chrome:122px) - var(--g10-band:224px))`
and `--g10-ratio: 2/1` → poster 844×422 at 1366, art the same size (wider ratio, no dead centre),
**CTA bottom 748**. Ground truth for the claim: live DB **48,069 published decks, all with PDFs**
(44,981 monolingual ≈ 4k/locale) — every panel flagged that "40,000+ … in your language" reads as
per-language; accepted by the operator as the library total.

## Files
`components/homepage-v10/{GrandHall.tsx, hero-strings.ts (ONE builder for both routes), homepage-v10.css}`,
`app/[locale]/page.tsx` + `preview/homepage-v10/page.tsx`, legacy `homepage-v6/OpeningV6.tsx`
(still read the retired keys!), `messages/*.json` → `homepageV6.hero` = 14 keys
(`h1 fanLabel ctaWorksheets ctaActivities scope pillar{1..4}Label/Gloss pillar1Count`); retired
`sub microLine countsLine ctaTools` (three of them said "free"). Gates: **`scripts/audit-hero-copy.js`**
(`npm run validate:hero-copy`; digits only in `pillar1Count` = 40000; price words with
`(?<!\p{L})…(?!\p{L})`; key parity; 7 poison modes judged PER LOCALE), **`scripts/audit-hero-fold.js`**
(7 viewports × locales; small-phone rule <700px tall: H1 + lead placard in fold, CTA within 120px),
`audit-hero-identity.js` (+ `typeChildren===1`, `strayText===0`, pairwise `overlaps`; poisons
`--poison`, `=overlap`, `=stray`).

## ⭐ Traps bought
- ⭐⭐ **THE ENGLISH SOURCE WAS WRONG FOUR WAYS AND ALL ELEVEN PANELS FOUND IT:** "A child plays; **it**
  checks the answers" (it = the child), subjectless "check", "or play" overclaiming (only MOST
  worksheets play), "balance" ambiguous, "For preschool to…" not a range. Hand panels the English
  as a SOURCE TO AUDIT.
- ⭐ **A MUST-PASS POISON CAN BE FAILED BY AN UNRELATED LOCALE** — the copy gate's verdict read the
  global `failed` while da/no were still un-authored, so "figure-ok" reported "ban too wide".
  Judge a poison on the locale it mutates.
- ⭐ **THE OVERLAP CENSUS USES ROTATED BOUNDING BOXES** — the design lead's tight hang coordinates
  overlapped once ±1° tilt inflated the boxes; loosen the table, never the tolerance.
- ⭐ **A GRID TRACK GROWS TO ITS MIN-CONTENT** — Finnish "Tehtävägeneraattorit" widened a 2-up card,
  the field, and the page to 360px on a 320px viewport; titles need `overflow-wrap:anywhere` and
  `li{min-width:0}`.
- ⭐ **THE IPHONE-SE CLASS CANNOT HOLD FOUR LABELS + TWO BUTTONS** (130 chrome + 187 poster leave
  350px; de/fi need ~400) — change WHAT the gate measures there (lead placard in fold, CTA one
  flick away), documented, not the threshold.
- ⚠ `--path=/en` is mangled by Git Bash → `MSYS_NO_PATHCONV=1`. ⚠ Two puppeteer gates on one dev
  server time each other out (16s/load) — run them sequentially. ⚠ `nth-of-type(3)` on
  `.hv10-frame` is the FLOOR (three architecture divs precede the frames) — the third frame is
  `nth-of-type(6)`.
- Design-canvas lesson: a floor-coloured band under the picture read muddy; the deep-green lower
  wall with a stone step nosing won.

**Still open (flagged, not fixed):** pricing page claims "45,000+" and "200+ activities";
`aboutPage`, `teach.caption` ×n, tool/maker landing copy still say free/gratis; nav `apps`
top-level keys drift per locale.
