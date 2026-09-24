# nt5-F (b6) landing touch-up — pass 3 (after fix rounds 2 + 3)

You are the native landing panel for ONE locale. Your locale's landing file
`scripts/worksheet-gen/i18n/.landing-b6-<loc>.json` was written BEFORE some pages and strings changed.
Your job now is a TOUCH-UP, not a rewrite: make every landing agree with the page as it prints TODAY.

## What changed since your landings were written
- **Fix round 3 (every locale):** G1-402 sentences carry NO order word any more — the child numbers them from
  content (a landing that says the sentences "start with Först / First …" is now wrong); G2-379 wash-hands reason
  corrected; G1-408 title claims no test (the scales are drawn); G2-383 title no longer asks "why", and its shelf now
  always shows the witness for a general sentence (the nail = a light thing that sinks, the log = a heavy thing that
  floats); G1-407 title = food and a home; G3-400 title names the report. Locale extras: sv/pt/no G1-404 title;
  pt G2-379 title; no pliers "nebbtang", G1-405 "Vaneskjema for uka", G2-377 two empty lines; fi rabbit "kani",
  crab "taskurapu", penguin sentence, G2-381 title; da: no elk on any habitats page (roe deer instead).
- **en · de · es · fr · nl only:** your landings predate fix round 2 as well (see the "## Fix round 2" sections at the
  end of `docs/worksheet-gen/b6-designs/_work/{K-379,K-380,G1-398,G1-399,G2-377}-faces.md`).

## Inputs
- Fresh face table: `scripts/worksheet-gen/out/b6-faces.<loc>.json` (titles/instructions as shipped NOW) and fresh
  renders `scripts/worksheet-gen/out/b6-sweep/<loc>/<ID>-null-d2-<loc>.png`.
- Your file's own `findings` array (pass 1): each finding that is now FIXED must be removed from the prose if the
  prose warned teachers about it (e.g. "accept either answer because the order word gives it away").
- The contract is unchanged: `docs/worksheet-gen/b6-landing-brief.md` (hard rules, fences, no free-claim in visible
  fields, no answer-key claim, 200+ words, meta 120-170, title <= 75, slug stability).

## Rules for a touch-up
1. **Keep every `slug` unchanged** (URLs must stay stable). Change `title` / `metaDescription` / `h1` only when they
   now contradict the page or its new sheet title; otherwise leave them.
2. OPEN the fresh PNG of every id whose strings changed (list above) and of every id your findings mention.
   Re-check every number you quote against the fresh render.
3. Replace `findings` with the CURRENT state: what is still wrong on a render today (keep it honest; empty only if
   genuinely nothing), plus one line per landing you changed and why.
4. Self-check until `node scripts/seo-landing/gen-b6-landings.js <loc> scripts/worksheet-gen/i18n/.landing-b6-<loc>.json --dry-run`
   prints `dry-run ok` for all shipped ids.
5. Edit only your landing file. Do not commit. Scratch only under `scratchpad/<loc>-touchup/`.

Hand back: the dry-run line, the list of landings you changed (id → what and why), and the new findings list.
