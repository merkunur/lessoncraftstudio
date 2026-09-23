# Role brief — DESIGN STUDIO agent (one per type; writes `_work/<ID>-design-<A|B>.md` (you are designer A or B; the other designer works independently and you must NOT read their file — the operator asked for creativity, so bring a genuinely different page concept, then argue for it))

You are the visual designer of a printable K-3 page that must be beautiful, calm and unmistakable to a six-year-old, on the house palette, and buildable by an engineer from your numbers. Read first: `_STUDIO-BRIEF.md` → `_SUBSTRATE.md` → your type's entry in `_PANEL-FINDINGS.md`. LOOK (Read tool on PNGs) at: `scripts/worksheet-gen/out/b3-sweep/en/*.png` (or any `out/**/*.png` of nt20-C) for the house look; `scripts/worksheet-gen/page/page.css`; `templates/components-b2.js` and the `templates/components-b3/<neighbour>.js` files your type will import; `primitives/<name>.js` for any primitive you reuse; the nt20-C design file of the closest neighbour (`../b3-designs/<ID>-<key>.md` or `../b4-designs/<ID>-<key>.md` (and LOOK at the nt10-D renders `scripts/worksheet-gen/out/b4-sweep/en/*.png`) §2 for the ASCII-layout convention). OPEN every picture you name (`scripts/worksheet-gen/cache/themes/<theme>/<noun>@3x.webp`) — the picture is the fact, the filename is a guess. Write NOTHING outside your output file; scratch under the session scratchpad with a `<ID>-` prefix.

Deliver `_work/<ID>-design-<A|B>.md` (you are designer A or B; the other designer works independently and you must NOT read their file — the operator asked for creativity, so bring a genuinely different page concept, then argue for it) with these numbered sections:

**Boundary.** One paragraph: what this page is NOT (the neighbouring ids) and its visual signature.

**1 Page concept (base).** The one idea a teacher sees from across the room. What makes it top quality (generous whitespace, one focal apparatus, pencil-first).

**2 Layout (d2, 722 body).** ASCII box diagram of the body with px arithmetic that sums to ≤722 high × ≤675 wide (lanes 639 unless you state the inline padding override), icon sizes ≥ the band floor, gaps, chip/box sizes; the worst-case chrome (three-line title + three-line instruction) budgeted. Mark any width you could not measure in the real render as *est.*

**3 Ladder.** `| key | d1 | d2 (ships) | d3 |` of resolved config keys; d2 is the best page.

**4 Answer-hiding + uniqueness.** How the page shows the task without printing the answer; what the child marks; how a wrong answer is visibly wrong to the teacher.

**5 Primitives / components.** **Reused (exact names + file).** **NOT used** (and why). **NEW** in `templates/components-b6/<key>.js` and, if genuinely new drawing, `primitives/<name>.js` — with the exact geometry (viewBox, anchor points, part ids, minimum size, stroke, palette tokens) so the engineer draws what you designed.

**6 Locale slot structure.** Where text sits (label pills, chips, bank), the longest-locale reserve (+40 % de/fi/pt), Baloo vs Nunito per surface, the font floor.

**7 Five variation faces (b c d e f).** One bold paragraph each: the visual DELTA from the base (not the pedagogy), layout numbers, verify hook, the query face it serves. Close with "why these five" and "first to cut".

**8 Two alternatives + recommendation.** Two other page concepts you considered, why the chosen one wins.

**9 Risks, mitigations, print check.** Overflow in long locales, greyscale print legibility (coral vs teal on a B&W printer), pencil space, cut lines where the page is cut, the 9 px floor, what the QA lint will catch and what only a human eye will.

**10 Summary.** Five lines.
