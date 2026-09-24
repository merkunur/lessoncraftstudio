---
name: feedback-the-shell-instruction-is-hidden-in-every-embed
description: "A tool's strings.instruction is display:none in the production embed — so whatever explains a tool must live inside the stage"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0b29e699-aa33-42c3-add9-9e8db6e4d764
  modified: 2026-08-05T07:01:18.666Z
---

**Every mini-tool authors `strings.instruction` in eleven locales, the shell renders it under
the `<h1>` — and NOBODY EVER SEES IT.**

Measured on production 2026-08-05, not inferred:

```
$ curl -s .../en/tools/<slug> | grep -o 'src="/mini-tools/[^"]*"'
src="/mini-tools/lids.html?v=7.64&amp;lang=en&amp;embed=1"

$ curl -s .../mini-tools/lcs-shell.css?v=19 | grep -n instruction
261:.lcs-app.embed .lcs-instruction { display: none; }
```

`frontend/app/[locale]/tools/[tool]/page.tsx` builds every tool iframe with `&embed=1`, and
the shell hides `.lcs-instruction` in embeds. The sentence survives only in the
`role="application"` accessible name and in landing-page copy nobody reads mid-lesson.

**Why:** this is the direct cause of an operator report on #39 — *"It requires clear
explanation what to do in the beginning. Was a bit confusing."* The tool authored a perfectly
good sentence stating its whole thesis and the production page never showed it.

**How to apply:**
- **Whatever explains a tool must live INSIDE the stage** — a state-scoped hint band, or the
  apparatus drawing the instruction (ghosts, a target, a pre-filled first frame). Treat
  `instruction` as the accessible-name and landing-copy surface it actually is.
- When an operator says a tool is confusing at the start, **check what the production embed
  actually renders before redesigning anything**. Do not reason from the local `lids.html`,
  which is unembedded and therefore shows more than production does.
- This applies to **all ~47 tools**, not just the one being worked on. Any tool whose only
  explanation is `strings.instruction` is a tool with no explanation.

Related: [[project-lids-rebuild]] · [[feedback-verify-rendered-not-source]] ·
[[feedback-next-tool-build-recipe]]
