# DEPLOY — the full nl second-batch fan-out (114 activities) to production

## Context
The operator said **"deploy all of them"** — publish the batched Dutch (nl) second-batch fan-out that has been "commit + push, NO deploy" all along. Verified state:
- Local = origin tip = **`3058ca24`** (#114 nila-pond); working tree clean (only untracked scratch/audit files).
- Production server HEAD = **`56a960ab`** (the Italian-fanout deploy, Aug 27). **`56a960ab` is a clean ANCESTOR of `3058ca24`** → simple fast-forward.
- The pull carries **exactly 114 commits, ALL `[FEAT/FIX][ACTIVITY][nl]`** (113 FEAT + 1 FIX), nothing else.
- **The nl work is genuinely undeployed:** nl activity routes 404 on prod (e.g. `/nl/activities/nila-hoofdgedachte-voorgelezen-verhaal-kleuters/`), and the served mini-tools `.js` are stale (0 "Otto de otter" / "De ideevijver van Nila" / "Lees per lettergreep").
- `frontend/public/mini-tools` is a **symlink → `/var/www/lcs-media/mini-tools`** (one cp covers nginx serving + the build's manifest index); the served files are **not immutable** (plain cp works); 117G disk free.

Intended outcome: all 114 nl activities live — routes 200, Dutch strings/rounds served, correct grade/strand chips.

## The deploy (§20.4 mini-tools cp-before-build order + §A.5)
Single SSH host `root@65.108.5.250` (key auth `~/.ssh/id_ed25519`). Two steps so the 8+ min build can run in the background while the quick sync is confirmed first.

**Step 1 — sync (quick, ~15s):** on Hetzner, in ONE chain (git pull → cp → chown), so the mini-tools served/symlinked copies are fresh BEFORE the build:
```
cd /opt/lessoncraftstudio
git pull                                                      # 56a960ab -> 3058ca24 (fast-forward, 114 nl commits)
cp "mini tools"/*.js   /var/www/lcs-media/mini-tools/
cp "mini tools"/*.json /var/www/lcs-media/mini-tools/
cp "mini tools"/*.html /var/www/lcs-media/mini-tools/
chown lcs-media:lcs-media /var/www/lcs-media/mini-tools/*.js /var/www/lcs-media/mini-tools/*.json /var/www/lcs-media/mini-tools/*.html
```
Confirm the pull landed on `3058ca24` and a sample served file now carries nl (`grep -c "Otto de otter" /var/www/lcs-media/mini-tools/coin-stall-activity.js` ≥1).

**Step 2 — build + smoke (`deploy.sh`, 8+ min, run in background):**
```
bash /opt/lessoncraftstudio/deploy.sh
```
`deploy.sh` re-runs `git pull` (no-op, already at tip), `prisma generate`, `npm run build` (compiles the new `frontend/messages/activity-content/nl.json` prose + `frontend/app/[locale]/activities/[slug]/page.tsx` grade/strand overrides + wrapper version; indexes the fresh mini-tools manifests via the public symlink), its guards (preflight-activity-routes, hreflang parity, tool-registration, indexable-routes, payment canary §A.6.1, stale-chunk retention §A.14.11), and flips the release symlink only on success (zero-downtime — a failed build keeps the old release serving). No schema migration needed (additive nl content, 0 core).

## Verification (after deploy.sh completes; mind the Cloudflare 5-min edge TTL §15.8)
- **Routes 200** — curl a spread across the batch: nila-pond #114 (`/nl/activities/nila-hoofdgedachte-voorgelezen-verhaal-kleuters/`), domino #113 (`/nl/activities/lezen-met-lettergrepen-tweelettergrepige-woorden-groep-3/`), coin-stall #112 (`/nl/activities/rekenen-met-geld-euro-en-cent-betalen-groep-4/`), + 2-3 earlier nl slugs from `git log`.
- **Served mini-tools carry nl** — curl `/mini-tools/{coin-stall,nila-pond,domino-two-part}-activity.js` → grep the nl title strings (≥1 each).
- **Rendered Dutch content** — curl one nl activity page HTML, confirm the Dutch prose/intro + the correct grade chip (Kleuters/Groep 3/4) + strand chip render, no "Common Core".
- **No regression** — deploy.sh smoke output clean; sample an EN + a de activity route still 200.

## Notes / guards
- If any served mini-tools file were immutable, `chattr -i` would be needed — verified NOT immutable, so plain cp.
- If `git pull` reports local changes on the server blocking merge (an untracked server-only script per §22.5 gotcha), `git stash`/rm the offender then pull — do NOT force.
- This is additive (0 protected-core); low risk. Do not touch `deploy.sh` knobs (§build incident) or re-run any nginx patch.

## Close-out
After green verification, report the deployed set (114 nl activities, `56a960ab`→`3058ca24`) + a couple of confirmed-live URLs. No memory change needed beyond noting the fan-out is now DEPLOYED (update the `[CAUGHT UP 114/114]` MEMORY line to add "+ DEPLOYED `3058ca24`").
