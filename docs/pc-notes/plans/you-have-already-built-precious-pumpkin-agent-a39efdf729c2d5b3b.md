# sv panel — line-plot.read.2-md-d-9 (Lgr22 rebuild)

Report only. No repo edits made (plan mode). All numbers below were measured
from the repo in this session; nothing was taken on trust from the brief.

## Deliverables (drop-in)

`mini tools/line-plot-activities.json`

```
"slug":       { ..., "sv": "kryss-pa-tallinjen-vanligaste-langden-ak-2" }
"page_title": { ..., "sv": "Snäckis strandlinje – längder som kryss på tallinjen (åk 2)" }
"page_intro": { ..., "sv": "Snäckis mäter snäckor och sätter ett kryss över varje längd på tallinjen. Läs av hur många, vilken längd som är vanligast och hur mycket som skiljer. Åk 2, Lgr22." }
```

`frontend/app/[locale]/activities/[slug]/page.tsx` — STRAND_OVERRIDE, new row:

```
'line-plot.read.2-md-d-9': { sv: 'Sannolikhet och statistik' },
```

`frontend/messages/activity-content/sv.json` → `prose['line-plot.read.2-md-d-9']` — see §5.

## Measured conventions (§1–§3), fence (§4), name sites (§6), English audit (§7)
Full text in the panel report returned to the caller.
