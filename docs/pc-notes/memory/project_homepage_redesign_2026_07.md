---
name: homepage-redesign-2026-07
description: "The professional real-product homepage redesign (LIVE 2026-07-11) — direction, the featured interactive-generator, real-asset capture technique, bulk/QR ruling, operator taste"
metadata: 
  node_type: memory
  type: project
  originSessionId: aaf336ec-30a7-4d56-b21f-c711a6b23431
---

**Homepage redesign — LIVE 2026-07-11** on `pivot/printable-business-toolkit` (deployed via
`deploy.sh`; verified `/en` `/de` 200, assets 200, pricing QR-fix live). Live page =
`frontend/app/[locale]/page.tsx` (the v4 stack). Took THREE operator rounds; first two were rejected.

**Operator taste (hard-won, twice "complete shit"):** childish/cartoon (rounded Baloo everywhere +
mascot + doodle stars), **emoji standing in for product**, **fake/hand-drawn mockups** (invented maker
UI, scattered-square "QR"), and **sparse empty color blocks** all read as *unprofessional / hobby
project*. The bar: **"professionalism immediately, visually AND in text"** — show the REAL product in a
clean, dense, credible layout. The site's own `/en/worksheets` catalog page is the north-star look.

**Approved direction:** clean light ground `#FDFBF6` (cream) everywhere + **white cards** floating +
teal `#146B5E` + coral `#F2784B` (ink, action-only) + ink `#14322D`; Baloo 2 **font-bold (NOT
extrabold — 800 is too bubbly)** + Nunito. New `.hv5-*` CSS scope in
`frontend/app/[locale]/preview/homepage-v4/homepage-v4.css` (card/chip/chrome/CTA tokens). `page.tsx`
body override is now LIGHT (was dark teal `#0E544A` + chalk doodles — removed). 9 sections: Hero →
TryItBand → **Makers (interactive)** → Moat(languages) → Activities → Free/Teacher → Share → Browse
(crawl-bait) → Close (teal band). Copy in `homepageV4` namespace (`en.json`), deep-merges EN to all 11
locales; per-locale native localization deferred (§A.13.48).

**REAL imagery is mandatory (no emoji/mockups):** real deck thumbnails
`https://www.lessoncraftstudio.com/en/decks/<slug>/thumbnail.png`; real activity previews
`/mini-tools/previews/*.webp`; the operator-supplied real maker screenshot → `public/homepage/maker.webp`
(framed with faux browser chrome + warm `#F4F2EC` ground so it reads as designed).

**The interactive-generator is THE headline** (operator: "a fucking big deal you've almost hidden").
Every maker emits a self-contained **self-grading interactive worksheet** (6 interaction families A–F,
§14) — *one build → two outputs: plays online (self-grading) + prints as PDF*. Makers section leads
"**Build your own interactive, self-grading worksheet**" and shows it PLAYING + its self-graded result.

**Reusable technique — capturing a live deck in its solved/green state** (assets
`public/homepage/interactive-play.webp` = loaded playable; `interactive-celebrate.webp` = "You did it!
6/6 correct ⭐⭐⭐"): puppeteer-load `…/en/decks/addition-find-addend-animals/`; the runtime exposes
`window.DECK_BUNDLE.problems[]` with `operandA/operandB/resolvedMode` (find-addend answer = `operandB`);
fill each `.lcs-input`, dispatch input/change, click the "Check Answers" button → the celebration modal.
Crop with `sharp`. (Deck play pages are `noindex`; screenshot the public `/decks/<slug>/` catalog URL.)

**bulk/QR ruling (operator-decided):** bulk share **LINKS** for catalog worksheets ARE real +
live + subscriber-gated (`/api/play-links/bulk`, up to 50, wired into topic/browse `DeckGridClient`) —
KEEP the "single or in bulk" copy. **QR for catalog/bulk is FALSE** — removed from homepage
(`freeTeacher.teacher4`, `share.t3`) + `pricingPage.tier.item3` in **all 11 locales**. QR stays only on
the "worksheets you save from the makers" lines (`tier.item1/item2`) — hosted worksheets get a real
`/play/w/<id>/qr.png`.

**Process that worked:** employed the `frontend-design` plugin + parallel expert agents (sales/
marketing strategist + 2 design-lead critics that Read the screenshots + a feature-analysis agent);
showed the operator screenshots (`C:\Users\rkgen\Pictures\Screenshots\homepage-redesign\NEW-*.png`) +
the live local preview BEFORE each deploy. See [[feedback-visual-qa-container-containment]] (show-real-
renders discipline) and [[write-full-urls]].
