# PASS A (it) — .landing-var2a-it.json — ONE pending word-count fix

State: 23 landings written. 22 of 23 now pass the ≥205-word floor
(K-267 221 · K-270 213 · K-271 216 · K-272 205 · K-242@fruits 213 — all fixed this round).

**Remaining: K-242@animals = 193 words.** Its Edit was permission-DENIED in the last round, and plan mode re-activated before a retry. Pending edit (apply verbatim on approval):

- **K-242@animals** (193 → ~211) — in `p2`, append after "…pazienza che cresce a ogni bivio superato.":
  `E ogni animale riconosciuto lungo il cammino è una parola in più nel vocabolario del bambino.`

After applying, verify all 23 ≥205:
```
node -e "const j=require('./scripts/worksheet-gen/i18n/.landing-var2a-it.json');for(const [k,e] of Object.entries(j.landings)){const wc=(e.p1+' '+e.p2+' '+e.p3).trim().split(/\s+/).length;if(wc<205)console.log('SHORT',k,wc);}"
```

Slugs already collision-checked against `frontend/content/seo-landing/it.json` (2,524 landings) + `.landing-nt20-it.json` + `.landing-var-it.json`.
