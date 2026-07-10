# Post-approval runbook — forensic-audit remediation (2026-07-10)

> **✅ EXECUTED + VERIFIED 2026-07-11** (operator granted SSH access). Steps 1–3 applied:
> nginx patched (loop URL → 404, slash-less → 301, live PDFs unregressed), 964 canonicals
> reconciled (post-census zero defects), 3,790 corrupted hreflang clusters stripped
> (mixed=0). Sitemap revalidated (all 8 shards; conflicts 0, orphans 0); 832 repaired URLs
> submitted to IndexNow (HTTP 200). **Still pending: a regular `deploy.sh` run** (ships the
> seasonal hub links `c9595a43` via landing regen) + the operator GSC steps in §5.

Everything below was STAGED (committed `2a4a380b` + `5b6d045d`, pulled onto Hetzner,
dry-runs verified), then executed as recorded above. Kept for reference/re-runs (each
step idempotent, each with backups).

## 1. nginx: PDF loop guard + slash-less deck 301
```
ssh -i %USERPROFILE%/.ssh/id_ed25519 root@65.108.5.250 "cd /opt/lessoncraftstudio && python3 scripts/publish-cli/patch-nginx-pdf-loop-guard.py"
```
Self-verifying: `nginx -t` + auto-rollback + timestamped backup in /root. Expected output:
`Patched: LCS-PDF-LOOP-GUARD-printable, LCS-PDF-LOOP-GUARD-answer-key, LCS-DECK-SLASHLESS` + `nginx reloaded OK`.

## 2. Canonical reconciler (dry-run already verified: 167 BROKEN / 795 REPOINT / 2 STALE)
```
ssh -i %USERPROFILE%/.ssh/id_ed25519 root@65.108.5.250 "cd /opt/lessoncraftstudio && node scripts/seo-landing/reconcile-deck-canonicals.js --apply | tail -15"
```
Backups: `deck.html.bak.reconcile`.

## 3. Hreflang strip (dry-run verified: ~3,790 strips; run AFTER step 2 — counts will shift slightly upward as newly-repointed decks join)
```
ssh -i %USERPROFILE%/.ssh/id_ed25519 root@65.108.5.250 "cd /opt/lessoncraftstudio && node scripts/seo-landing/strip-deck-hreflang.js --apply | tail -10"
```
Backups: `deck.html.bak.hreflang-strip`.

## 4. Verify (read-only; Cloudflare 5-min TTL applies)
- `curl -sI https://www.lessoncraftstudio.com/en/decks/addition-make-whole-toys/addition-make-whole-toys-printable.pdf` → **404** (was infinite 301 loop)
- `curl -sI https://www.lessoncraftstudio.com/en/decks/subtraction-mixed-winter` → **301 → /en/decks/subtraction-mixed-winter/** (was 404)
- `curl -s https://www.lessoncraftstudio.com/it/decks/bingo-in-giro-per-casa-3305/ | grep canonical` → the real it landing (was `/it/worksheets/undefined`)
- Re-run reconciler + strip WITHOUT --apply → all classes 0 except OK_*/KEEP/NO_BLOCK
- A drifted-name PDF under a LIVE deck still 301s to the canonical file (regression check)

## 5. Nudge recrawl
- `node scripts/indexnow-submit.js` (WORKS again as of 2026-07-10 — HTTP 200; the 403 Bing-key-lag is over)
- Operator: re-submit `sitemap.xml` in Search Console (docs/SEO/gsc-recovery-checklist.md, 2026-07-10 update)

## Standing context
- CHURN FREEZE until ~2026-09-01 (CLAUDE.md §21.5a) — no mass title/meta/canonical/slug rewrites of existing pages.
- Root-cause + evidence: docs/audit-results/seo-forensic-audit-2026-07-10.md
- Next growth work (goal 1000 clicks/day): GSC export from operator (audit §6);
  Phase 6 activity-prose (liveness-scoped, per longtail topic file); back-to-school
  content wave (Aug–Sep demand, lead time now); de Klasse-1 retag fork (operator call).
