---
name: feedback_deploy_gates_must_be_browser_free
description: deploy.sh gates cannot use puppeteer — Hetzner has the node_modules but NO Chromium; split gates into a static contract half and a browser half
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fd3abd5a-1a0f-4a51-951f-005820734717
  modified: 2026-08-03T01:23:43.922Z
---

**A gate wired into `deploy.sh` must not launch a browser.** Measured on Hetzner
2026-08-03: `/opt/lessoncraftstudio/node_modules/puppeteer` **is installed**, but there is
**no Chromium anywhere** — no `chromium`/`google-chrome`/`chromium-browser` on PATH, no
`/root/.cache/puppeteer/`, no bundled download under `node_modules`. So `require('puppeteer')`
succeeds and `puppeteer.launch()` throws. A browser gate in `deploy.sh` would abort **every
deploy** instead of guarding anything.

The installed-but-unusable shape is the trap: checking that puppeteer is a dependency, or
that `require` works, tells you nothing. Check for the *browser*.

**Why:** CLAUDE.md §22.5 mentions this in passing as a landing-program aside
("no Chrome on Hetzner → the puppeteer `verify-deorphan.js` can't run there"), which is easy
to miss when wiring an unrelated gate. A design-review agent recommended wiring a puppeteer
gate straight into `deploy.sh`; it was confidently wrong, and only the measurement caught it.

**How to apply:** split the gate.

- **Static contract half → `deploy.sh`.** Assert the thing that can actually *regress*, which
  is almost always a filesystem fact (a literal in a source file, a registration row, a token
  in a header string). No browser, no port binding — don't `listen()` during a deploy either.
- **Browser half → dev/operator run.** It proves the *mechanism* once (that the fact under
  test is what makes the behaviour work). It does not need to run per-deploy.

Implemented as a `--contract-only` flag on `scripts/audit-tool-print-sheets.js` (require
puppeteer lazily, skip launch, skip `srv.listen`). Poison-test **both** modes separately and
confirm each exits **1**, not merely prints FAIL — `cmd | tail` reports `tail`'s exit code,
which reads as green.

Sibling lesson from [[feedback_indexable_route_gate]]: run gates on the **server** as well as
locally, because the trees differ. This is the same lesson about the *runtime* rather than the
filesystem.

Related: [[feedback_verify_rendered_not_source]], [[feedback_indexable_route_gate]].
