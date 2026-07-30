# mini-tools — one-time Hetzner setup

These commands wire `mini tools/` into the same static-serving pattern as the
33 worksheet generators (CLAUDE.md §A.1). Run **once** per server; subsequent
updates flow through `git pull` + a quick `cp` in `update-mini-tools.sh` (or
manual cp) just like `update-worksheet.sh`.

## Architecture (matches worksheet-generators exactly)

| Layer | Path | Tracked? |
|---|---|---|
| Source of truth | `mini tools/` | git-tracked |
| Local dev mirror | `frontend/public/mini-tools/` | gitignored (populated by `scripts/master-sync.{bat,sh}`) |
| Server immutable storage | `/var/www/lcs-media/mini-tools/` | NOT in git |
| Server-side symlink | `frontend/public/mini-tools → /var/www/lcs-media/mini-tools` | created once, persists across deploys |
| Public URL | `https://www.lessoncraftstudio.com/mini-tools/<tool>.html` | served by Next.js via the symlink |

## One-time setup (operator, via plink)

```bash
# 1. Create the immutable storage directory + set ownership
ssh-or-plink root@65.108.5.250 "
  mkdir -p /var/www/lcs-media/mini-tools && \
  chown -R lcs-media:lcs-media /var/www/lcs-media/mini-tools
"

# 2. Create the symlink inside the repo's public/ folder.
#    Remove the regular dir first if it exists from a prior local-only sync.
ssh-or-plink root@65.108.5.250 "
  rm -rf /opt/lessoncraftstudio/frontend/public/mini-tools && \
  ln -s /var/www/lcs-media/mini-tools /opt/lessoncraftstudio/frontend/public/mini-tools
"

# 3. After the next git push lands on the server (`bash deploy.sh` runs git pull),
#    copy the shippable files into the immutable storage:
ssh-or-plink root@65.108.5.250 "
  cd /opt/lessoncraftstudio && \
  cp \"mini tools\"/*.html \"mini tools\"/*.js \"mini tools\"/*.css /var/www/lcs-media/mini-tools/ && \
  rm -f /var/www/lcs-media/mini-tools/*.test.js
"
```

After step 3, the three tools are live at:

- `https://www.lessoncraftstudio.com/mini-tools/ten-frame.html`
- `https://www.lessoncraftstudio.com/mini-tools/number-line.html`
- `https://www.lessoncraftstudio.com/mini-tools/ruler.html`

Each accepts `?lang=<locale>`, `?embed=1`, `?embed=compact`, `?sound=off`.

## Subsequent updates (per-edit cadence)

_**Steady-state path** (every edit after first-time setup): just `deploy.sh` then the step-3 copy below. The symlink is permanent in `frontend/public/mini-tools` and `cp -a public` carries it into every future standalone snapshot. (First-time setup was different — it required `deploy.sh → one-time setup → deploy.sh again` because the standalone snapshot must already contain the symlink for the served URL to resolve.)_

For every edit to a `mini tools/` file:

1. **Local PC**: run `scripts\master-sync.bat` (Windows) or `bash scripts/master-sync.sh` (Unix). This refreshes `frontend/public/mini-tools/` so the local Next.js dev server (`npm run dev`) shows the change.
2. **Commit + push** the edited file in the `mini tools/` source folder.
3. **Server (Hetzner)**: run `deploy.sh` (this does `git pull` + the standard Next.js build). Then run the step-3 copy block above to push the new files into immutable storage. This is the same TWO-STEP rule the worksheet generators use (CLAUDE.md §14.6).

## Optional hardening (defer to v1.5)

- `chattr +i` on each shipped file in `/var/www/lcs-media/mini-tools/` (matches the worksheet-generator immutable-bit protection). Skip for v1 — the toolkit is small and the protection adds operational friction.
- Add a `[ ! -L "$RELEASE_DIR/public/mini-tools" ]` symlink-preservation assertion to `deploy.sh`, parallel to the existing `worksheet-generators` check at deploy.sh:202-207. Flagged as a recommended follow-up; not landed in this commission to avoid scope creep.
- Add a `mini-tools` protection-count block to `deploy.sh` (parallel to the worksheet-generator block) once the toolkit reaches ~10 tools.

## Why this matches the worksheet-generators pattern

- **Same git treatment**: source-of-truth folder IS in git; the served path is NOT.
- **Same serving model**: Next.js statically serves anything under `frontend/public/` (no Next.js route, no SSR).
- **Same edit cadence**: local sync, push, server pull, manual cp.
- **Same embed surface**: served from a stable predictable URL; iframes work out of the box.

## Storybook stories — ❌ ABANDONED 2026-07-11 (do NOT follow the old flow)

**The storybook project was abandoned by the operator on 2026-07-11. There is no
story flow any more.** This section previously described `mini tools/stories/` as
being "In git" and recursively synced; both were already false, and that stale
text is what made the leftover tree look like lost source of truth. Corrected
2026-07-30.

Current reality, all of it enforced in tracked code:

- **`mini tools/stories/` is NOT in git and is NOT synced.** It is gitignored, and
  `master-sync.bat` (~:189-194) explicitly purges any storybook runtime the copy
  loops picked up, with the comment *"the stories-subtree sync is REMOVED (it would
  spread ~22 undeployed library stories toward production)"*. The production copy
  step is `cp "mini tools"/*.html *.js *.css` — non-recursive, so subdirectories
  could never travel anyway.
- **No runtime loads it.** `frontend/lib/activities.ts:182` records
  `'storybook-activities.json' REMOVED 2026-07-11 — storybook project abandoned`,
  so no story manifest is registered.
- **The one indexed story URL is force-410'd** at `frontend/middleware.ts:159`
  (`/<locale>/activities/pips-picnic-interactive-storybook`).
- **The QA scripts this section used to mandate no longer exist.**
  `scripts/storybook/` now contains only `gen-preview-stories.js`,
  `preview-server.js`, and `serve-apps.js`; `validate-story.js` and
  `qa-storybook.js` were deleted.
- `vendor-pixi.min.js` is still tracked but is now **orphaned** — nothing loads it.

The ~416 files under `mini tools/stories/` are left on disk (194 of them are
timestamped `.bak` autosaves, and 29 of the live stories are machine-generated
`preview-*` fixtures). They are inert. Do not build on them without a fresh
operator commission.
