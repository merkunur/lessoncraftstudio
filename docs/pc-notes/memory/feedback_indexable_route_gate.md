---
name: feedback_indexable_route_gate
description: The indexable-route build gate (CLAUDE.md §21.7) and the three ways it was wrong before it was right
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 95f3e213-9159-483b-93fb-26a968935df7
  modified: 2026-07-31T12:21:40.887Z
---

`scripts/preflight-indexable-routes.js` enforces CLAUDE.md §21.7: every `text/html`
surface must declare a canonical or a robots directive. Wired into `deploy.sh` beside
the hreflang parity guard. Added 2026-07-31.

**Why:** the tool-pages launch shipped ~450 `/mini-tools/*.html` whose whole `<head>`
was a `<title>`. Nothing in the build would have caught it.

⭐ **I shipped this gate broken THREE times. Each failure is the same lesson: a gate
that cannot fail is worse than no gate, because it reports green.**

1. **It could not fail at all.** `inheritsMetadata` walked up to the ROOT layout, which
   always exports site-wide metadata — so every route "inherited" coverage. A
   poison-test (a `page.tsx` with literally no metadata) proved it green. Fix: exclude
   the root layout; only a segment layout below it counts. Root metadata also cannot
   express a per-route canonical, and its default is `index, follow` — which is exactly
   how `/upload`, `/en/test` and `/en/test-simple` became live indexable pages.
2. **A prefix entry manufactured coverage.** `NGINX_COVERED` listed
   `worksheet-generators/` annotated "verified per-file", while a prefix entry does the
   opposite — it exempts everything beneath it forever. A poison file dropped there went
   undetected. All 33 carry the meta in-file, so the entry bought nothing. **Keep that
   list minimal; only list a prefix whose files genuinely cannot carry the tag** (the
   176 `mini tools/*.html` carry none by design and rely wholly on the header).
3. **Filesystem walking was machine-dependent.** On Hetzner,
   `frontend/public/{admin,mini-tools,worksheet-generators}` are SYMLINKS, and
   `readdirSync` reports a symlink as a symlink, not a directory — so the entire
   mini-tools class, the very class the gate exists for, was NEVER checked (0 covered on
   the server vs 191 locally). Meanwhile an untracked stray
   `frontend/public/public/public/` duplicate tree got walked three times and produced
   40 phantom failures. Then `git ls-files --others` still picked that cruft up.
   **Fix: `git ls-files --cached` only** — deterministic everywhere, and since the rule
   is "before merge" and a file must be committed to merge, it loses nothing.

**How to apply:** always poison-test EVERY branch of a gate separately before wiring it
in, and run it on the SERVER as well as locally — the trees differ. Confirm parity
(same counts, same exit code) before trusting it.

**`KNOWN_UNGATED` is a ratchet baseline of 28 pre-existing surfaces — it MAY ONLY
SHRINK.** Never add an entry to make a build pass. The 15 static entries (debug/test/
content-manager HTML) are live 200s with no directive and want an operator decision;
§A.3 marks `user-control.html` + `homepage-content-manager.html` immutable, so an nginx
header is the likely route.

Related: [[feedback_verify_rendered_not_source]], [[project_seo_fix_spec_execution]].
