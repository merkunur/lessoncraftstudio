---
name: project-git-tree-phantom-image-deletions
description: "frontend/public/images is a git-tracked LIVE docroot with no deploy guard; 116 phantom local deletions are skip-worktree'd, and a junction leaks 583MB of the isolated library past .gitignore"
metadata: 
  node_type: memory
  type: project
  originSessionId: 313a2cf0-7f2c-4532-b870-a2a9a02c39a0
  modified: 2026-07-30T01:42:20.282Z
---

**`frontend/public/images/` is git-tracked AND is the live production docroot.** `deploy.sh:298`
does `ln -s /opt/lessoncraftstudio/frontend/public "$RELEASE_DIR/public"`, so the server's git
working tree *is* what nginx serves at `/images/`. `deploy.sh` has **zero** references to
`public/images` — the `/var/www/lcs-media` guards do **not** cover it. `/api/borders/images` and
`/api/backgrounds/images` are filesystem-only (no DB fallback) and 10+ worksheet generators call
them.

**The local tree lies about deletions.** `scripts/swap-dev-images-to-canonical.js` (ran ~2026-04-24)
rebuilt `frontend/public/images/` out of Windows **junctions**; `animals`/`borders`/`furniture` were
later replaced with real dirs and `borders` is **empty**. Result: 103 tracked files read as deleted
+ 13 as modified while **serving 200 in production**. Originals are safe in
`frontend/public/images.dev-backup/` (621 files). Committing those deletions would 404 live assets
on the next deploy.

Handled 2026-07-30 (audit of 2,049 dirty entries → 1,617):
- The **116 phantom entries are `--skip-worktree`'d** (local index flag, never committed).
  Reverse with `git ls-files -v frontend/public/images | grep '^S' | cut -c3- | git update-index --no-skip-worktree --stdin`.
  Caveat: if an upstream commit ever touches those 116 paths, `git pull` refuses until cleared.
- **Committed `.gitignore` rules** (`be73b4c9`) — the durable fix, replacing a local-only
  `.git/info/exclude` guard: `images.dev-backup/`, `images/backgrounds/`, `frontend/.scratch/`
  (3,739 files), `frontend/scripts/feasibility-test/`, `*.bak-longtail-fr`, `mini tools/.*`,
  `mini tools/{stories,games}/`, the dead `game-shell.*`/`engine-*.js`/`_preview-server.js`
  cluster, and the §A.13.44 `output/*.before-*.json` snapshots.
- Rescued the two genuinely at-risk files: `mini tools/opposites-pairs.json` + its gate
  `scripts/verify-opposites-core.js` (`ee5abd5c`), and `frontend/lib/image-reference.ts`
  (`e414b70c`) — the only git record of a contract whose runtime (`worksheet-generators/js/`,
  not in git) is loaded by 32 apps.

**`git add -A` at repo root still stages ~12,000 files** (root-level scratch dirs: `tpt/`,
`_phase1*_drafts/`, `mockups/`, untracked `docs/`+`scripts/` files). That is noise, not danger —
**0** of it is under `frontend/public/images/`, so the destructive path is closed. Blanket-ignoring
`docs/` or `scripts/` would hide real work, so it was deliberately left.

**Why:** the danger is invisible — `git status` shows deletions of files that are live, and the
worst outcome comes from a *helpful* action (`git add -A`, a cleanup commit).

**How to apply:**
- **Never `git add` anything under `frontend/public/images/`.** §A.3's "never `git add .`" exists
  for this.
- **`git rm --cached` + `.gitignore` does NOT protect a file — it DELETES it on pull.** Proven
  empirically in a throwaway repo. Removing a path from the tree deletes the working-tree copy on
  the other clone regardless of gitignore. Never use it to "untrack" a live asset.
- **`--skip-worktree` covers only TRACKED paths.** It does nothing for untracked files: a poison
  test after flagging still staged **583 MB / 121 files**, because
  `frontend/public/images/backgrounds` is a junction into the isolated `image library\BACKGROUNDS`,
  re-exposing those bytes under a path `.gitignore`'s `image library/` rule cannot match (§A.1
  violation). Closed via `.git/info/exclude`.
- **`.git/info/exclude` is LOCAL-ONLY** — a fresh clone or another machine is unprotected. The
  durable fix is those same two lines in a committed `.gitignore` (deferred by operator ruling).
- Git Bash `find` does **not** traverse Windows junctions — it reports 0 files where PowerShell
  `Get-ChildItem -Recurse` correctly reports 121. Don't read that as data loss.

Still-dirty and deliberately untouched: `frontend/.scratch/` (**3,739** unignored files — a plain
`git add -A frontend` stages them all); real uncommitted code edits in
`scripts/seo-landing/gate.js` (+64−5), `scripts/v2-data/.../kaikki-wiktionary.js` (+40−6),
`docs/SEO/demand-map-nl.md` (+79); and the out-of-tree-by-design working memory
(`CONVERSATION-HANDOFF.md`, `CLAUDE-MD-UPDATES.md`, `important/`) per §10.4 / §A.8.3.

Also found: `mini tools/SERVER-SETUP.md:76-92` is **tracked and wrong** — claims
`mini tools/stories/` is "In git" and recursively synced, contradicting `master-sync.bat:190` which
`rmdir`s it (storybook project killed 2026-07-11). That stale doc makes the dead tree look like
lost source of truth. See [[project-story-library-250]].
