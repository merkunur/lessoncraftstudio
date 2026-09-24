# Round 2: starters "still not aligned" — the stale CDN copies, the un-gated syllable lane, and a forward fix

## Context

Round 1 (commits `602d45a7` · `90e50c39` · `2169db27`) fixed `rulingBlock` / `factLane` sizing and G2-235, and republished 142 decks in place. The operator's second batch of screenshots (2026-09-21 01:01–01:06) shows:

1. **Five sheets that are byte-for-byte the OLD renders** (K-335 "because", G2-299, G2-278, G2-341, G2-342) — MEASURED: the Cloudflare edge serves the v1 PDF (`last-modified 20:03`, `cf-cache-status: HIT`, `Age 7990`) while the origin has the v2 PDF (`22:38`). nginx serves every deck PDF/og/thumbnail with `Cache-Control: public, max-age=2592000` (30 days) under an unchanged URL, so **every in-place republish is invisible at the edge for up to 30 days** — this round's 142, the August 2,177, the nt20-C divfix. No Cloudflare API token exists on the box (`docs/claude-md/scaling-audit.md:152`). The operator's browser will also hold the old PDF for 30 days.
2. **Word Families ("at" / "uck") — a THIRD code path with the same defect that I judged "reads right" by eye and did not gate.** `templates/components-b3/syllable-reading.js:148-165 syllableLane`: the rime is Baloo 2 700 at `0.9·glyphH`, `y = yBase − 1`. Baloo 2 700 measured x-height = 0.500 em → x-height fills only 79% of the midline band, ink 1 px off the rule. Consumers: `types/g1/G1-306-syllable-reading.js:193` (base d1-3) + the `with-blends` face G1-333 (the only faces that print a rime; join/circle/carpet/syllabified render no lane). Not visible to the round-1 gate because it selects `text[data-lcs-starter]`; the lane stamps `data-lcs-lane-printed`.

Operator ruling (this session): starters keep **small letters exactly in the midline band** (x-height = x band; caps/ascenders ~82% of the top line). That is what round 1 shipped; nothing about the sizing rule changes.

## Plan

### Step 1 — the CDN: forward fix (mine) + one purge (operator)
- New idempotent `scripts/publish-cli/patch-nginx-deck-asset-cache.py` (the project's `patch-nginx-*.py` convention: marker-guarded, `nginx -t` before reload, refuses on an unexpected shape, `--dry-run`). On every deck sub-asset location in `/etc/nginx/sites-enabled/lessoncraftstudio` (the 4 PDF blocks at ~:284/:296/:325/:339 + the generic deck-asset catch-all that serves og-image.png / thumbnail.png): replace `Cache-Control "public, max-age=2592000"` with **`Cache-Control "public, max-age=3600"` for PDFs and `max-age=86400` for images**, and add **`Cloudflare-CDN-Cache-Control "max-age=300"`** so the EDGE revalidates within 5 min of a republish while browsers/Google keep a sane TTL. Poison: run against a copy with one block already patched (idempotent, no double header) and against a block whose header text differs (refuse). Verify at origin with `curl -sI --resolve …:127.0.0.1` on a PDF, an og-image and a thumbnail.
- Record the rule in `docs/claude-md/catalog-pipeline.md` §15.8 (edge TTL for deck assets is 300 s via `Cloudflare-CDN-Cache-Control`; the 30-day origin header was the reason republished PDFs stayed stale) and in memory.
- **Operator action (the only one):** Cloudflare dashboard → Caching → Configuration → **Purge Everything** once, after I report the patch is live. Already-cached 30-day objects cannot be expired from origin. Then open the sheet in a private window (the browser cache holds the old PDF too).

### Step 2 — fix `syllableLane` (`templates/components-b3/syllable-reading.js:148-165`)
- `px = round2((LM.base − LM.xTop)·scale / FONT_METRICS['baloo2-700'].xHeight)` (d2: glyphH 30 → 34 px, was 27), `y = g.yBase`. Keep the `writable ≥ 60` refusal and `textAdvance` (node-side width table) — the wider rime narrows the writable area; d2 "ocks" ≈ 75 px on a 151 px lane → 64 px writable (passes); d3 (lane 126) may REFUSE 4-letter rimes → **measure with the gate across 11 locales**; if d3 refuses, widen d3 `laneW` (d3 is unshipped) — a measured decision, never a lowered floor.
- `starterFontPx` in `components-b2.js` gains a `font` argument (`'nunito-700'` default, `'baloo2-700'` here) so all three consumers share one rule.

### Step 3 — generalise the gate (`qa/verify-ruling-starters.js`)
- Discovery + in-page selector: **every `<text>` inside a `svg[data-lcs-prim="writing-row"]`** (starters AND printed rimes) + `[data-lcs-factlane] span[data-lcs-starter]`. Right-anchored text: assert `E` as "ends 6 px inside the row" instead of "starts at 8"; width assertion for a rime = the lane's own `data-lcs-writable ≥ 60` (its design guard), for starters ≤ 0.5·row.
- `MUST_HAVE` += `G1-306`; new poison P5: rime font forced back to `0.9·glyphH` and `y−1` → must FAIL B (x-height) — proves the new selector reaches the lane.
- Run `--quick --poison`, then all 11 locales.

### Step 4 — regenerate + republish the lane decks
- `tools/starterfix-regen.js`: add jobs `wave-b3-<loc> --types=G1-306` and `wave-b3var-<loc> --types=G1-333`, `RE_LIVE` += `g1306|g1333`; run `--dry-run` (22 live basenames reproduced) → generate → `--evidence` (title/meta byte-equal). `b3-baseline --check --expect=` with the new drift appended to `_records/starterfix-expected-drift.txt` (G1-306 d1-3 ×11 + G1-333 d1-3 ×11, animals/fruits refusals explained) → `--capture`.
- scp → `/var/www/lcs-media/_staging/starterfix/<loc>/` → `starterfix-republish.sh <loc>` (probe = the DB, never INSERT) → `--confirm` ×11 → `repoint-deck-canonical.js --types=syllable-reading --locale=<loc>` → `refresh-deck-noindex-exempt.sh` → IndexNow → remove the staging.
- Family gate `qa/verify-b3-syllable-reading.js` (if present) + `verify-b3-feelings/animal-fact-file/rhyming-words` unchanged-green.

### Step 5 — close-out
- Memory: `project_writing_frame_starter_fix.md` (round 2: the CDN cause with the measured headers, the lane, the lesson **"I read the G1-306 render and called it close enough — a frame model is measured, never eyeballed; the gate now covers every text on a writing row"**), `feedback_verify_rendered_not_source.md` (a republish is not live until the EDGE serves it — check `cf-cache-status`/`last-modified` through Cloudflare, not origin), MEMORY.md line. Commits: `[FIX][OPS]` nginx patch · `[FIX][WORKSHEET-GEN]` syllableLane + gate · `[CHORE]` regen jobs + drift record.

## Files
- `scripts/publish-cli/patch-nginx-deck-asset-cache.py` (NEW) · `docs/claude-md/catalog-pipeline.md` §15.8
- `scripts/worksheet-gen/templates/components-b3/syllable-reading.js` · `templates/components-b2.js` (`starterFontPx(font)`)
- `scripts/worksheet-gen/qa/verify-ruling-starters.js` · `tools/starterfix-regen.js` · `docs/worksheet-gen/b3-designs/_records/starterfix-expected-drift.txt`

## Verification
1. Origin headers on a PDF / og-image / thumbnail show the new `Cache-Control` + `Cloudflare-CDN-Cache-Control`; after the operator's purge, `curl -sI` through Cloudflare on `feelings-k335-printable.pdf` shows `last-modified` 22:38 (v2) and, downloaded, the PDF read with the Read tool shows the big "because" on the frame.
2. `verify-ruling-starters.js` PASS over all 11 locales incl. G1-306/G1-333 with 5 poisons firing; `render/one.js G1-306 null 2 en` and `G1-333 null 2 en` read by me: rime x-height on the midline, ink on the rule.
3. 22 lane decks routed UPDATE, audit clean, version dirs bumped; origin `last-modified` fresh on their PDFs.
