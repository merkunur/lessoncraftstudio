---
name: project-find-and-count-uncollapse
description: EN find-and-count landings un-collapsed to per-deck two families; same collapse bug still open in 10 other locales
metadata: 
  node_type: memory
  type: project
  originSessionId: e0c20c37-fa79-4865-8550-a3be048091e0
---

**Done 2026-06-18 (commits `88ad34c8` + `37ae2a5b`, branch pivot/printable-business-toolkit).** The 47 EN find-and-count SEO landings each embedded ONE by-object "I-Spy" deck under a "Beginning Sounds" framing while `collapseSiblings` funnelled all ~360 distinct worksheets in a theme to that single landing — so every worksheet in a theme showed the SAME interactive (the decks themselves were always internally correct: deck.html ↔ manifest ↔ printable ↔ thumbnail all matched). Operator ruled: two page families per theme + own landing each.

Replaced with **377 per-deck landings**: 330 "Beginning Sounds" (letter-spotting, RF.K.3.a, one per (theme,letter), `mode:'letter-spotting'`, slug `beginning-sounds-<theme>-<letter>`, true (theme,letter) dupes collapse as siblings) + 47 "Find and Count" (by-object readiness, `mode:'spot-and-count'`, OLD slugs preserved: `-kindergarten` for themes with letter-spotting, BARE `find-and-count-<theme>` for the 20 singleton themes; `thanksgivinng`→`thanksgiving` slug alias). Fixed the animals-generic + thanksgiving-typo anomalies.

**Reusable machinery (all in `scripts/seo-landing/`):** `enum-find-and-count-perdeck.js` (runs on Hetzner, reads deck manifests → coordinates JSON), `gen-find-and-count-perdeck.js` (two prose-template families; **3D coprime cell-assignment** p1×p2×p3 = 13×8×5=520>330 was the key to crushing similarity — every page a distinct skeleton triple; threads the target LETTER + actual target words through all 3 paras; floor top-up sentence for <210-word bodies), `repoint-fac-perdeck-canonical.js` (companion to `repoint-deck-canonical.js` — repoints from the deck's CURRENT canonical, handling the mixed by-object-`/decks/` vs letter-spotting-already-`/worksheets/` state). `rekey-en-titles.js` TYPE_MAP made mode-aware (Beginning Sounds vs Find and Count, `letter <x>` qualifier). Added optional `coordinate.letter` to `LandingCoordinate` + folded into `coordKey()` in `frontend/lib/seo/landing-content.ts` (per-letter landings sibling cross-locale on (theme,letter), don't falsely match still-collapsed locales).

Gate clean: letter-spotting within-class max 0.505, by-object 0.698, ALL-PAIRS over80=0, cross-class slot-norm 0.098, all 2335 pages pass lint. 0 dup titles, 0 old URLs orphaned. Verified live: sibling letters in a theme embed DISTINCT decks.

**The bug was EN-ONLY.** (Corrected 2026-06-18 after operator pushback — an earlier note wrongly claimed the same collapse in 10 locales.) The other locales were already built by a CORRECT per-deck generator: their find-and-count landings have `collapseSiblings:0` (1:1 landing↔deck) AND already split into two matching modes — `hidden-object` ("Zoek en tel"/"Find og tæl"/"Cherche et compte" = find-and-count) and `letter-spotting` ("Anlaute"/"Trova le lettere iniziali" = beginning sounds) — each h1 matching its deck type. No mismatch. (de 33, nl 89, sv 88, it 43, fr 85, pt 85, no 91, da 90, fi 91 fac landings; **es 0**.) Only EN was still on the old gen-wave4 collapsed design. **No cross-locale fan-out needed.** Cross-ref [[seo-landing-page-program]].
