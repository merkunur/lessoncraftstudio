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

## Storybook stories (added 2026-07-01)

Stories add ONE nested subtree to the mini-tools flow:

- **In git:** `mini tools/stories/<id>/{story.json, strings.json, manifest.json}` +
  the pilot's generated placeholder atlases/scenes/exercises. master-sync
  STEP 4 now copies the `stories/` subtree recursively.
- **Server-only binaries** (real art, narration mp3s — like the image
  library): pscp the whole story folder to
  `/var/www/lcs-media/mini-tools/stories/<id>/` BEFORE `deploy.sh` builds
  (the §20.4 cp-before-build rule):
  `pscp -r -pw <pw> "mini tools\stories\<id>" root@65.108.5.250:/var/www/lcs-media/mini-tools/stories/`
- Everything under `/mini-tools/` inherits the middleware carve-out — atlas
  `.json` and narration `.mp3` serve untouched, no config changes.
- Vendored runtime: `vendor-pixi.min.js` (PixiJS 7.4.3 legacy UMD, pinned)
  ships like any other mini-tools JS file.
- QA before deploy: `node scripts/storybook/validate-story.js <id>` +
  `node scripts/storybook/qa-storybook.js --story=<id>` (both must be green).
