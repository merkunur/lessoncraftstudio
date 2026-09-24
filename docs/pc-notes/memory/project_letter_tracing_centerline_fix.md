---
name: project-letter-tracing-centerline-fix
description: Letter + sight-word tracing rebuilt on real centerline glyphs (was stroked font outlines = double dashed lines); 132 decks republished 2026-09-01
metadata: 
  node_type: memory
  type: project
  originSessionId: 2144b7fa-1591-4aac-aca3-9c0c9e926128
  modified: 2026-09-01T10:34:08.350Z
---

**LIVE 2026-09-01.** Letter tracing (K-238 + K-254..K-258) and sight words
(K-239 + K-259..K-263) drew traced glyphs as **stroked FONT OUTLINES** — two
parallel dashed contours per stem. Operator: unacceptable; number tracing
(K-237, hand-authored centerlines) is the bar. Commits `e6e7d865` (fix) +
`7e5b8be1` (`--types`). 132 decks (12 types x 11 locales) republished via
`--updates-manifest`; SEO heads verified **byte-stable** (0 title, 0 description
drift vs the pre-wave baseline).

**The reuse that made it small.** `mini tools/alphabet-trace-core.js` already
held a panel-ruled, build-gated centerline table for all 52 letterforms.
`scripts/worksheet-gen/data/tracing/letter-strokes.js` **requires it directly**
(§10.4 read-from-SoT) — no second copy, so no drift, and the printables inherit
its single-storey school `a`/`g` that no display font gives. It adds only:
point-array→SVG path (`splinePath` ported from `penny-alphabet-trace-activity.js`),
a DERIVED start angle, advance widths, 6 accent marks, and Æ/Ø.

**What only the RENDER showed** (every gate was green first):
- **Coincident stroke starts are the RULE for letters** — A's two legs, the
  stem-then-bowl of B D E F M N P R. A fixed badge offset buried badge ① under
  ②, telling the child to start at stroke 2. Same latent bug exists in
  `digit-strokes.js` (digit 5's two strokes share `M 32 14`) — NOT fixed there.
- **An SVG transform does not change a `font-size` ATTRIBUTE.** A badge authored
  as `11 * inv` inside the scaled group carries **7px** and trips the 9px lint —
  letters scale UP where digits scale DOWN, the only reason the digit lane never
  hit it. Guides now render in DISPLAY coordinates.
- **Center letters on the DESIGNED box, not on ink.** C's arc stops at x=61.5
  (60° opening) and Q's tail runs to x=80; ink-centering shoved C left of A B D E F.
- **`writingRow` had NO topline** (writeH 66 vs glyphH 64 → yTop −9.9).
  Pre-existing, visible in the operator's own screenshot.
- Caps dotted rule belongs at the **optical crossbar line 48** (E/F/H bars), not
  the x-height 44. Word lanes DO use the x-height.

**Traps worth remembering:**
- ⚠ **`scripts/worksheet-gen/data/` is gitignored** by a bare `data/` pattern;
  its 42 files are force-added. New data files need `git add -f` or the commit
  looks complete while the server gets a missing module.
- ⚠ **`deckIdFor` embeds the wave id** — a new "fix wave" mints NEW decks and
  leaves the broken ones live. Hence `cli.js --types=<csv>`. `instanceSeed` does
  NOT include the wave id (verified), so content is seed-stable either way.
- ⚠ A replacement batch dry-run reports `collisions=132 errored=132`
  (TITLE/DESC_NON_UNIQUE) — **that is the expected INSERT-path reading**;
  `_collisions.txt` is the natural source for the updates-manifest, and the
  manifest clears it to `ok=132`.
- ⚠ **The instruction feeds the meta description.** Adding the arrow clause
  overflowed the 120-170 band on 23 decks, silently demoting them to a skill
  sentence. `transplant-seo-head.js` restored them — its `--old-links` TSV must
  be captured by `readlink` BEFORE the wave; it cannot be reconstructed after.
- `gen-var-specs.js` propagates the base instruction to variants whose ROW has
  `null`, but also rewrote 7 unrelated G2/G3 files with *worse* copy — revert those.

**i18n without translating:** all 11 locales already carried a natively-authored
arrow clause in their **K-237** instruction; it was spliced verbatim into the
letter types. No ensemble, no `[NSR-FLAG]`.

**Gate:** `scripts/verify-letter-strokes.js`, wired into `deploy.sh`
(browser-free). Check D measures the defect directly — no glyph may hold two
strokes that are parallel offsets. Poison-tested both ways; **the poison caught
two bugs in the gate itself** (an inverted angle formula that failed every
correct glyph, and D firing on umlaut ticks, which are parallel by design).

See [[feedback-verify-rendered-not-source]], [[feedback-poison-every-assertion-not-just-the-first]].
