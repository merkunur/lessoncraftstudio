---
name: project-crawl-budget-collapse-2026-07
description: "The 30,078 /worksheets/ landings have NEVER been crawled, and total crawl budget collapsed 94% after the 10-12 Jul corpus-wide remediation — diagnose from nginx logs before writing any more page copy"
metadata: 
  node_type: memory
  type: project
  originSessionId: 48bc9529-fbcd-4850-a3ea-778a761e73bc
  modified: 2026-07-20T18:10:09.661Z
---

**Measured 2026-07-20 from `/var/log/nginx/access.log*` on 65.108.5.250.** This supersedes
any plan that aims per-page copy at the `/worksheets/` landings.

## The landings are unread, not badly ranked

Googlebot fetches of `/[locale]/worksheets/<slug>` per day:
6 Jul **2** · 10 Jul **3** · 14 Jul **1** · 17 Jul **0** · 18 Jul **0** · 19-20 Jul **0**.

Confirmed independently by the operator's GSC page exports: across BOTH a 24h and a 7d
window (several hundred URLs), **not one landing appears**. Every impression goes to
`/decks/`, PDFs, `/topic/`, `/activities/`, `/standards/`.

**No title / description / alt / schema change on those pages can produce an impression.**
That is why eight rounds of title rewriting moved nothing. They need crawl before copy.

Checked and found NOT broken (do not re-investigate): landings return 200 + `index, follow`
+ self-canonical; they ARE in sitemap shards 4-7 and Google fetches those shards; the
deck→landing canonical chain is coherent (decks pointing at landings are correctly absent
from the sitemap); topic hubs link 22-30 landings each; robots.txt allowed them; TTFB 0.29s.

## Total crawl budget fell 94% in twelve days

Googlebot requests/day: 4,492 (6 Jul) → 1,815 (10 Jul) → 590 (12 Jul) → 387 (14 Jul) → ~500 now.
**Cliff is between 11 and 12 July.** Every server-side cause eliminated: **zero 5xx** across
76k-100k requests/day every single day, no 429s to Googlebot, no slowness. Google chose to
pull back — immediately after the 10-12 Jul corpus-wide remediation (`reconcile-deck-canonicals.js`,
`strip-deck-hreflang.js`, homepage rebuild, FR/DE title re-key). **The remediation was itself
a churn event.** This is the §21.5a churn freeze earning its keep; do not run another mass
rewrite before ~2026-09-01.

## A quarter of the remaining budget went to dead prefixes

Of 850 Googlebot requests over 1.7 days: **225 (26.5%) to five 100%-dead prefixes, zero 200s.**
`/blog` alone = 200 requests (133×410 + 67×301, **no 200s at all**), plus guides 12, ideas 8,
bundles 4, gallery 1. 132 distinct dead URLs, many cross-locale ghosts
(`/da/blog/<portuguese-slug>`) discovered from the old hreflang emission. **Not in the
sitemap** — Google retries them from its own index history.

Fixed by `Disallow` in `frontend/public/robots.txt` (bare + `/*/` forms). `/apps` deliberately
NOT blocked: its 89 requests are 76×301 into live `/tools/<x>-maker` landings via
`MAKER_APPS_REDIRECTS` — equity recovery, not waste.

## Where the crawl actually goes (target metadata work here)

topic **185** (172×200) · tools 79 · apps 89 (all 301) · decks 17 · activities 16 · guides 12 ·
learn 11 · standards 8. About **600 pages take 100% of the useful crawl** — and they are the
same pages earning the impressions.

## How to re-measure (do this before any SEO claim)

```
ssh -i ~/.ssh/id_ed25519 root@65.108.5.250
grep -i googlebot /var/log/nginx/access.log > /tmp/gb.txt
awk '{print $9}' /tmp/gb.txt | sort | uniq -c          # status mix
awk '{print $7}' /tmp/gb.txt | sed -E 's#^/[a-z]{2}/##' | cut -d/ -f1 | sort | uniq -c | sort -rn
```

Related: [[project-seo-forensic-audit-2026-07-10]], [[project-seo-real-cause-and-hub-program]],
[[feedback-verify-rendered-not-source]].
