# Adding ~200 self-contained Phaser 3 games — setup briefing + integration plan

## Context

You want to add ~200 self-contained HTML5 games (Phaser 3), living in their own
folder and embedded via iframe. Before writing any of them you need the seven
facts below about how this site is built, served, and gated. Every answer here
was **measured** (live `curl`, source reads) rather than taken from documentation
— the repo's own standing rule, and it earned its keep twice: one doc is stale
(`SERVER-SETUP.md`), and one thing I first wrote up as a doc defect turned out to
be my own misreading (see "Documentation note" at the end).

The site already runs **197 self-contained HTML apps + 341 JS files** flat out of
`/mini-tools/`, plus 33 worksheet generators out of `/worksheet-generators/`, and
~28,000 self-contained `deck.html` files. Adding 200 more static HTML files is
well inside the established pattern — but there is **one hard blocker** (§3) that
will silently break every non-HTML asset your games load.

---

## The seven answers

### 1. What is the site built with?

| | |
|---|---|
| Framework | **Next.js 14, App Router** |
| Language | **TypeScript** (`.tsx` routes, `.ts` libs) |
| Rendering | **Server-rendered + ISR.** Nearly every public route is SSR with `export const revalidate = 3600`. Not a static export. |
| i18n | `next-intl`, locale as first path segment (`/en/…`, `/de/…`) |
| Styling | Tailwind + hand-written CSS; the tools/activities use a separate token file (§6) |
| Data | Postgres via Prisma |
| Build output | **Not** `output: 'standalone'` — removed 2026-07-06, and `outputFileTracing: false` (`frontend/next.config.js:6-20`). Builds emit a plain `.next` which `deploy.sh` copies into a release dir. |

Your games do **not** touch any of this. They are static files under `public/`,
served without passing through React, next-intl, or the build.

---

### 2. How is it deployed?

**Git push → SSH → `deploy.sh` on the Hetzner box.** No CI, no Vercel, no upload UI.

```
ssh -i %USERPROFILE%/.ssh/id_ed25519 root@65.108.5.250 \
  "bash /opt/lessoncraftstudio/deploy.sh"
```

`deploy.sh` in order: `git pull` → landing-content regen → `npx prisma generate`
→ **preflight gates** (see §7) → `npm run build` (8 GB heap cap, 30 min timeout)
→ stage `releases/<BUILD_ID>/` → atomic symlink flip → pm2 reload → smoke tests
+ payment canary.

**Important for you — the two-step rule (CLAUDE.md §14.6).** Large static assets
are *not* served out of git. They live in `/var/www/lcs-media/<dir>/`, which is
symlinked into `frontend/public/<dir>/`. Deploying them is a **separate `cp`
step** after `git pull`, and it **must run BEFORE `npm run build`** (§20.4 — the
build indexes the static manifest; a stale one ships).

The release dir links straight at the live public tree:

```bash
# deploy.sh:394
ln -s /opt/lessoncraftstudio/frontend/public "$RELEASE_DIR/public"
```

so anything dropped into `/var/www/lcs-media/games/` is live the moment it lands
— no rebuild needed for asset-only changes.

⚠ **Build time is ~4 min / 2.3 GB** since tracing was disabled (build #14; it was
90 min / 50 GB before, which caused an all-day outage on 2026-07-05). The live
command caps it at `timeout 1800` with an 8 GB heap. Either way: **do not plan a
per-game deploy. Batch.** Asset-only changes need no build at all once the nginx
alias is in place (§7.12).

---

### 3. Multiple languages — and how an iframe finds the locale

**Yes: 11 locales**, hard-coded in `mini tools/lcs-shell.js:22`:

```js
var LOCALES = ['en','de','fr','it','es','pt','nl','sv','da','no','fi'];
```

(`pt` = Brazilian Portuguese, single code. `no` = Bokmål, single code.)

**How the current language is stored:** it is **in the URL path**, not a cookie
or localStorage. `/de/tools/zehnerfeld/` *is* the German state. A
`preferredLanguage` cookie exists but is only used for a couple of bare-path
redirects — never read it as the truth.

**How a page inside an iframe finds out — the established contract:** the parent
appends **`?lang=<locale>`** to the iframe `src`. Note it is `lang`, **not**
`locale`.

```tsx
// frontend/app/[locale]/tools/[tool]/page.tsx:256-258
const iframeSrc =
  `${TOOL_MINI_URL[toolKey]}?v=${TOOL_WRAPPER_VERSION}` +
  `&lang=${encodeURIComponent(params.locale)}&embed=1`;
```

The child resolves it with this precedence (`lcs-shell.js:415-422`):

```
?lang=xx  →  opts.lang  →  <html lang>  →  'en'
```

Unrecognised codes fall back hard to `'en'`.

**Recommendation for the games:** implement the same four-step chain yourself
(you will not be using `lcs-shell.js` — Phaser brings its own everything). Read
`new URLSearchParams(location.search).get('lang')`, validate against the 11-code
list, fall back to `'en'`. Also honour `?embed=1` and `?sound=off`, which the
whole toolkit already accepts.

**Two other params already conventional:** `?embed=1` (trim chrome — the shell
also auto-detects framing via `self !== top`) and `?v=N` (pure cache-buster the
child ignores).

---

### 4. Content-Security-Policy — **NO**

Measured live, 2026-09-05:

```
$ curl -sSIL https://www.lessoncraftstudio.com/en
HTTP/1.1 200 OK
x-frame-options: SAMEORIGIN
referrer-policy: origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=()
Cache-Control: public, max-age=300

$ curl -sSI https://www.lessoncraftstudio.com/mini-tools/ten-frame.html
HTTP/1.1 200 OK
Content-Type: text/html
Cache-Control: no-cache, must-revalidate
x-robots-tag: noindex
```

**There is no `Content-Security-Policy` header on any surface, and no
`<meta http-equiv="Content-Security-Policy">` in any served file.**
An iframe can load a script from any CDN with no restriction whatsoever.

The full header set Next applies to `/:path*` (`frontend/next.config.js:96-131`)
is HSTS, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`,
`X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`. **No CSP.**

Two caveats worth knowing:

- **`X-Frame-Options: SAMEORIGIN`** applies to Next-rendered routes. Same-origin
  iframes (your case) are fine. Third parties cannot embed a Next *page* — but
  the static files served straight off the symlink carry no XFO at all, which is
  exactly why the deck-embed virality strategy works.
- **The only two places a CSP exists** are per-response route handlers, each
  scoped to itself:
  - `frontend/app/play/a/[linkId]/route.ts:35` (activity share links) —
    `default-src 'self'; frame-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; base-uri 'none'`
  - `frontend/app/play/w/[linkId]/route.ts:117` (hosted worksheets) —
    `sandbox allow-scripts allow-popups allow-modals`

  If you ever want games behind `/play/a/…` share links, **that CSP would block
  every CDN script.** Bundle Phaser locally and the question never arises —
  which is the recommendation anyway (§7).

Verified independently across all three layers: no CSP in `next.config.js`, none
in `middleware.ts`, and **none installed by any of the eleven
`scripts/**/patch-nginx-*.py` scripts** that build the live server block. Every
nginx `add_header` in the repo is `X-Robots-Tag`, `Cache-Control`, or
`X-Content-Type-Options`. The 2026-05-05 embed recon
(`docs/embed-readiness-recon-2026-05-05.md:39-44`) recorded the same conclusion:
*"NO X-Frame-Options / NO Content-Security-Policy / NO Permissions-Policy →
default browser behavior: third-party iframe embedding ALLOWED."*

---

### 5. Where static assets go so no build step touches them

Anything under **`frontend/public/`** is served verbatim by Next with no
processing. The established pattern for a large asset family is a **three-layer
split**, which your games should copy exactly:

| Layer | Path | In git? |
|---|---|---|
| Source of truth | `games/` at repo root | **tracked** |
| Local dev mirror | `frontend/public/games/` | gitignored, populated by a sync script |
| Server storage | `/var/www/lcs-media/games/` | not in git |
| Server symlink | `frontend/public/games → /var/www/lcs-media/games` | created once, survives every deploy |
| Serving | **nginx `location /games/` alias** (see §7.12 — *not* Next) | — |
| Public URL | `https://www.lessoncraftstudio.com/games/<slug>/index.html` | — |

This is precisely what `mini tools/SERVER-SETUP.md` documents for mini-tools, and
what `.gitignore:76-106` encodes for both mini-tools and worksheet-generators.
The symlink survives because `deploy.sh:394` links the release at the live
`public/` tree rather than copying it.

⚠ **Keep the symlink even though nginx serves the files.** It is what makes
`npm run dev` and the local mirror work, and it is the shape every existing
static family uses. But the *production* read path is the nginx alias (§7.12),
because `next start` snapshots `public/` at boot and would 404 anything added
between deploys.

⚠ **`deploy.sh` will not copy your games.** It has protection-count floors for
image-library, worksheet-generators and design-elements, but **no mini-tools sync
and no mini-tools symlink assertion at all** — the `cp` is entirely manual for
that family and will be for yours. Write the sync into a script rather than
relying on remembering it.

**Why a subfolder-per-game (`/games/<slug>/index.html`) rather than flat:**
mini-tools is flat and now carries 538 files in one directory with a
non-recursive `cp *.html *.js *.css` deploy step — subdirectories *cannot*
travel through it. Phaser games have per-game sprite atlases and audio, so
per-game folders plus a recursive `cp -r` is the right call. It also keeps the
200 games from colliding with anything.

---

### 6. Fonts and brand colours — "Direction A"

Canonical source: `mini tools/lcs-shell.css:12-49`. **Do not re-derive these.**

**Fonts** (loaded from Google Fonts by `@import`):

```css
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap');

--lcs-font-display: 'Baloo 2', 'Trebuchet MS', system-ui, sans-serif;  /* headings */
--lcs-font-body:    'Nunito', system-ui, -apple-system, sans-serif;    /* body */
```

**Colours:**

| Token | Hex | Role |
|---|---|---|
| `--lcs-bg` | `#FBF3E4` | warm cream paper — the page ground |
| `--lcs-surface` | `#FFFFFF` | cards / stage |
| `--lcs-surface-2` | `#FBF6EE` | recessed wells |
| `--lcs-ink` | `#2A2A35` | primary text |
| `--lcs-ink-soft` | `#6B6B78` | secondary text |
| `--lcs-line` | `#E7DCC8` | hairlines / borders |
| `--lcs-structure` | `#146B5E` | deep teal — frames, controls |
| `--lcs-structure-soft` | `#E2F0EC` | teal wash |
| `--lcs-accent` | `#F2784B` | warm coral — highlights |
| `--lcs-good` | `#2FA56A` | success green |
| `--lcs-focus` | `#1E8FD4` | focus ring |

Geometry/motion: `--lcs-radius: 18px`, `--lcs-radius-sm: 12px`,
`--lcs-tap: clamp(44px, 7vmin, 56px)` (K-3 touch floor),
`--lcs-shadow: 0 6px 22px rgba(20,107,94,.10), 0 1px 3px rgba(0,0,0,.06)`,
`--lcs-ease: cubic-bezier(.2,.8,.2,1)`.

⚠ **Never pure white on coral.** `lcs-shell.css:26` still declares
`--lcs-accent-ink:#FFFFFF`, but white-on-`#F2784B` is **2.73:1** and is a
standing site-wide ban. Measured practice elsewhere: the homepage uses cream
`#FBF3E4` on coral (`homepage-v3.css:92-93, 153-161`), and the dark-ink variant
is `#14322D`. Pick one of those two, not white.

The palette is consistent site-wide — `homepage-v3.css` uses the same three
literals (`#FBF3E4`, `#146B5E`, `#F2784B`) rather than its own scale, so
matching `lcs-shell.css` matches the whole site.

⚠ **Four font systems exist in this repo and only one is Direction A.** A census
of every `fonts.googleapis.com` call site:

| Sites | Faces | Owner |
|---|---|---|
| 243 | Fredoka + Nunito | `tpt/**/tpt-thumbnail-*.html` marketing thumbnails |
| 173 | Baloo 2 + Fredoka + Lexend Deca + Nunito + Quicksand | the 33 worksheet generators |
| 133 | Fredoka | published `deck.html` export heads |
| **1** | **Baloo 2 + Nunito** | **`lcs-shell.css:12` — Direction A** |
| 4 | Fraunces + Inter | pre-Direction-A homepage (still the Tailwind fallbacks) |

**Fredoka is the numerically dominant face here (529 of ~600 call sites) and is
NOT part of Direction A.** A game that starts by copying a worksheet-generator or
TPT-thumbnail `<head>` silently pulls in Fredoka/Quicksand/Lexend Deca and drifts
off the locked aesthetic. Copy `mini tools/ten-frame.html` instead — its whole
font story is one inherited line, no font tag of its own.

Note the weight axes differ: `lcs-shell.css` loads Baloo 2 at **500/600/700
only**, while the Next side (`next/font/google`) requests 400–800. Asking for
Baloo 2 at 400 or 800 in a self-contained page gets a synthesized faux weight.

---

### 7. Anything else before adding 200 static HTML files

**⚠ BLOCKER — the middleware matcher will break your non-HTML assets.**

`frontend/middleware.ts:362` excludes static trees **by name**:

```
…|samples|videos|worksheet-generators|mini-tools|play/|worksheet-images|…
```

`games` is not in that list. Then at `middleware.ts:318-321`:

```ts
if (pathname.endsWith('.html') ||
    pathname.includes('/worksheet-generators/') ||
    pathname.includes('/mini-tools/') ||
    pathname.includes('/audio/')) {
  return NextResponse.next({ /* pass through */ });
}
```

So the consequences for a new `/games/` folder are **asymmetric**:

- `/games/foo/index.html` → passes (`.endsWith('.html')`) ✅
- `/games/foo/game.js`, `/atlas.json`, `/audio/beep.mp3`, `/font.woff2` → **falls
  through to next-intl → redirected to `/en/games/foo/game.js` → 404** ❌

The extension escape hatch in the matcher only covers
`png|jpg|jpeg|svg|ico|webp|gif|pdf`. **Every JS, JSON, audio and font file a
Phaser game loads would 404.** `/audio/` happens to be whitelisted by path
substring, so `/games/foo/audio/beep.mp3` would survive by accident — do not rely
on that.

**Fix: add `games` to the matcher exclusion list.** One word, one line. Do it in
the very first commit.

**Other things to know:**

1. **`/games` is safe as a URL prefix — but only just.** `REMOVED_PREFIXES`
   (`middleware.ts:91`) 410s `apps|tools|guides|bundles|ideas|start|blog|compare|gallery|teaching-packages|lesson-plans|flashcards|themed-bundles|faq`.
   `games` is absent, so no 410 trap. Note `/tools` **is** a 410 trap with a
   per-slug allowlist — if you had picked that prefix, all 11 locales would 410.

2. **`mini tools/games/` is already gitignored** (`.gitignore:147`) as dead
   premium-games artefacts, and `mini tools/game-shell.js`, `game-assets.js`,
   `engine-*.js`, `collection.html` likewise. A repo-root `games/` folder does
   not collide, but **do not name anything `game-shell.js` or `engine-*.js`** —
   those globs would silently swallow your files.

3. **The indexable-routes preflight (`deploy.sh:244`, fail-hard, pre-build)
   behaves differently depending on where you put the source — and one of the two
   ways is a silent gap.** `scripts/preflight-indexable-routes.js` enumerates via
   `git ls-files --cached '*.html'`, then keeps only three prefixes
   (`HTML_SOURCES`, ~line 191): `frontend/public/`, `mini tools/`,
   `REFERENCE APPS/`. Each surviving file must match
   `/<meta[^>]+name=["']robots["']/i` or `/<link[^>]+rel=["']canonical["']/i`, or
   be under an `NGINX_COVERED` prefix (only `mini-tools/`), or the deploy aborts.

   - Track the games under **`frontend/public/games/`** → gate **fires**; every
     file needs the meta tag or the build fails.
   - Track them at repo root **`games/`** (the recommended layout) → prefix
     matches none → `continue` → **never checked**. Build passes and 200 files
     ship publicly indexable with no directive.

   Either way, do both: put `<meta name="robots" content="noindex,follow">` in
   every game HTML **and** add `{ repoPrefix: 'games/', servedPrefix: 'games/' }`
   to `HTML_SOURCES` so the gate is real. This is the treatment mini-tools gets
   (`next.config.js:142-148` sets `X-Robots-Tag: noindex` on
   `/mini-tools/:path*.html`) because iframe widgets ranking as thin standalone
   pages is a known, measured SEO harm here. The wrapper route should rank, not
   the iframe.

   ⚠ Note `STATIC_IGNORE` skips any path segment starting with `_` and any
   `*.min.html`. So `_lib/` and `_template/` are exempt for free — convenient,
   but it also means the template itself is never gate-checked. Put the meta tag
   in the template anyway; that is what the 200 copies inherit.

4. **`preflight-tool-registration.js` and `preflight-activity-routes.js` do not
   apply** unless you register the games as tools/activities. If you ever do:
   `frontend/config/live-tool-slugs.ts` is the **410 trap** — omitting a key
   there makes all 11 locales return 410 Gone.

5. **Two iframe resize protocols already exist. Pick one, do not invent a third.**

   | | System A (activities/tools) | System B (decks, third-party) |
   |---|---|---|
   | Message | `{type:'lcs-activity-resize', height}` | `{type:'lcs-embed-resize', height, url}` |
   | Host guard | `ev.source === iframe.contentWindow` (same-origin only) | query-stripped `url` match |
   | Host | `frontend/components/activities/ActivityIframe.tsx` | inline snippet |

   For same-origin hosting inside the site, emit **System A**. `ActivityIframe`
   silently discards any height below **`MIN_HEIGHT = 320`**, has **no origin
   check**, and applies `scrolling="no"` + `allow="fullscreen; autoplay"` +
   **no `sandbox`**.

   ⚠ **`ActivityIframe` bills a play on mount.** It calls `meterAction("play")`
   (10/day free) unless the surface is a care-surface. Auto-mounting it burns a
   play per pageview — `LiveToolEmbedV6.tsx` is click-gated for exactly this
   reason. A Phaser game host almost certainly wants click-to-start anyway.

   ⚠ **Never attach a `ResizeObserver` if your game has a `vh`-based height.**
   `vh` inside an iframe resolves against the iframe, so observer → taller
   broadcast → taller iframe → taller app is a runaway loop.
   `lcs-shell.js:983-989` attaches the observer *only* to free-play tools for
   this reason. Phaser canvases are usually fixed-aspect, so prefer posting a
   height once at boot and on orientation change.

6. **`vh` is forbidden inside an embedded manipulative** (standing rule) — and
   `lcs-shell.css:54` sets `html,body{overflow:hidden}`. Phaser's `Scale.FIT` with
   an explicit pixel-dimension parent is the safe pattern.

7. **Bundle Phaser locally; do not CDN it.** No CSP blocks a CDN today, but: the
   `/play/a/[linkId]` CSP would block it if games ever go behind share links; the
   site is offline-tolerant by design (decks are self-contained); and 200 games
   × one CDN round-trip is a real LCP tax against the site's `LCP < 2.5s`
   standard. One shared `/games/_lib/phaser.min.js` served from your own origin,
   cached immutably, costs one download for all 200.

8. **Cache-busting is manual and already drifting.** Four hand-maintained version
   constants exist and two are behind (`ACTIVITY_WRAPPER_VERSION` is `'9.677'` in
   the page and `'9.232'` in `play/a/[linkId]/route.ts`). If 200 games share a
   `phaser.min.js?v=N`, bumping N means editing 200 files. **Put the version in
   the filename** (`phaser-3.90.0.min.js`) and serve it immutable instead.

9. **The `image-library-webp/` tree is a symlink with a uniformity invariant**
   (§A.7.2). If your games reuse the 3,000-image library, read that section
   first — half-mirrored directories cause pictures to change mid-interaction,
   and nothing errors or logs.

10. **`frontend/public/` is a tracked live docroot in places.** Never
    `git add` under `frontend/public/images/` — a plain `git add -A` there stages
    583 MB. Your `frontend/public/games/` mirror must be gitignored.

11. **Deploy discipline:** `cp -r` the games into `/var/www/lcs-media/games/`
    **before** `deploy.sh` runs the build, then
    `chown -R lcs-media:lcs-media`. Verify the glob actually matched — a
    filtered copy that matches nothing looks exactly like one that succeeded.

12. **⭐ Serve `/games/` from an nginx alias, not through Next — this is the
    decisive one.** `next start` **snapshots the `public/` file list at server
    boot**. Any file written into the tree while the server runs **404s until the
    next pm2 restart**, and — the nasty part — *updates to files that already
    existed at boot DO serve*, which masks the whole class. This was prod-observed
    2026-07-06 (fresh `card.webp` on disk, world-readable, Next 404) and is
    exactly why `/mini-tools/` was moved off Next onto
    `scripts/studio/patch-nginx-minitools-static.py`. With 200 games you will be
    adding and replacing files between deploys constantly; Next-served, half of
    those changes would silently not appear.

    Clone the mini-tools block — it already encodes the right cache policy:

    ```nginx
    location /games/ {
        limit_req zone=lcsasset burst=300 nodelay;
        alias /var/www/lcs-media/games/;
        access_log off;
        set $g_cache "public, max-age=3600";
        if ($uri ~* .(html|json)$) { set $g_cache "no-cache, must-revalidate"; }
        add_header Cache-Control $g_cache;
        add_header X-Robots-Tag "noindex" always;
    }
    ```

    Two consequences to accept: (a) register the block in
    `scripts/ops/verify-nginx-contract.sh` (`req 'location /games/' … `) so
    `deploy.sh:678` heals it after any nginx rebuild — an unregistered block is
    one `nginx -t` away from vanishing; (b) **nginx-aliased paths get no
    `X-Frame-Options` and no `Permissions-Policy`**, since those come only from
    `next.config.js`. Deck pages, `/mini-tools/` and the landings already sit
    outside them, so this is the house norm, not a regression — and for iframe
    game content it costs nothing.

    ⚠ Two nginx traps already paid for here: a **bare `{n}` quantifier in a
    `location` regex must be quoted** (nginx's parser eats `{`/`}`), and
    **anchor an inserted directive on the block it must affect** — anchoring on
    the first `server_name` lands it in the port-80 redirect block, where
    `nginx -t` passes and the patch reports success while applying to nothing.

13. **⭐ `'Baloo 2'` MUST be quoted, and in Phaser the failure is worse than in
    CSS.** An unquoted family beginning with a digit invalidates the whole
    `font:` shorthand — `font: 700 22px Baloo 2, sans-serif` is dropped entirely
    and computes as 16px/400/Times. 37 such bugs accumulated here before
    `scripts/audit-font-shorthand.js` was added at `deploy.sh:289-290`.

    **Phaser is more exposed than CSS is.** A Text style's `font` property feeds
    canvas `ctx.font`, which parses by the same CSS shorthand grammar — but when
    the value fails to parse the assignment is *silently ignored* and the context
    keeps its previous value, which starts at **`10px sans-serif`**. There is no
    cascade and no fallback stack to soften it; the text just renders tiny in the
    wrong face. So:

    ```js
    this.add.text(x, y, str, { font: '700 22px Baloo 2' });        // ✗ 10px sans-serif
    this.add.text(x, y, str, { fontFamily: '"Baloo 2", sans-serif', // ✓
                               fontSize: '22px', fontStyle: '700' });
    ```

    ⚠ **Provenance:** the CSS half is measured (37 real bugs, the gate, the
    audit baseline). The Phaser half is derived from the HTML spec — `ctx.font`
    ignores an unparseable assignment and retains its previous value, initially
    `10px sans-serif` — **not yet reproduced in Phaser here.** Confirm it on
    game 1 rather than taking it from me; if it turns out Phaser normalises the
    string first, the quoting rule still stands, only the severity changes.

    ⚠ **The existing gate will NOT catch this for you.**
    `audit-font-shorthand.js:40` sets `ROOT = <repo>/'mini tools'` and scans it
    with a **non-recursive `readdirSync` filtered to `.js`** — a `games/` folder
    is never looked at. Either point the gate at `games/` too, or accept that 200
    files' worth of this class ships unchecked. Given Phaser's 10px failure mode,
    extend the gate.

14. **`deploy.sh` has ~20 pre-build fail-hard gates**, several of which are bare
    count floors (image library ≥3000 PNGs, worksheet-generators ≥30 HTML,
    design-elements ≥70 SVG). None of them looks at `/games/`, but it means a
    deploy that aborts is usually aborting on something unrelated to your change
    — read the actual failing line before assuming the games caused it. Run it as
    `bash deploy.sh > log 2>&1; echo EXIT=$?` — **never pipe to `tail`**, which
    hides the exit status.

---

## Recommended shape

```
games/                                   # git-tracked source of truth
├── _lib/
│   ├── phaser-3.90.0.min.js             # one shared copy, versioned filename
│   └── lcs-games.js                     # locale resolve + resize post + embed chrome
├── _template/index.html                 # the 200 games all start from this
└── <slug>/
    ├── index.html                       # <meta robots noindex,follow>
    ├── game.js
    └── assets/…
```

`lcs-games.js` — the one piece of shared runtime worth writing once — does
exactly three things: resolve `?lang` against the 11-code list with an `en`
fallback; read `?embed=1` / `?sound=off`; post
`{type:'lcs-activity-resize', height}` to the parent at boot and on resize (with
the 4px hysteresis and rAF coalescing `lcs-shell.js` already proves out).

### Implementation order

1. **Unblock routing** — add `games` to the `middleware.ts:362` matcher exclusion
   list, plus `{ repoPrefix: 'games/', servedPrefix: 'games/' }` to `HTML_SOURCES`
   in `scripts/preflight-indexable-routes.js`, and `frontend/public/games/*` to
   `.gitignore`.

   Once the nginx alias (step 2) is live this matcher change is belt-and-braces —
   nginx intercepts `/games/` before Next ever sees it. Do it anyway: it is what
   makes `npm run dev` work locally, and it is the fallback if the nginx block is
   ever lost to a rebuild.

2. **Wire the serving layer** — mkdir `/var/www/lcs-media/games/`,
   `chown -R lcs-media:lcs-media`, symlink `frontend/public/games →` it, install
   the `location /games/` nginx block (§7.12) via an idempotent
   `scripts/studio/patch-nginx-games-static.py` modelled on
   `patch-nginx-minitools-static.py`, register it in
   `verify-nginx-contract.sh`, and extend `master-sync` with a **recursive**
   games copy (the mini-tools copy is a flat glob and cannot carry subfolders).
   Structure per `mini tools/SERVER-SETUP.md`.

3. **Ship ONE game end-to-end** before writing the other 199 — template, shared
   lib, deploy, live verify all four asset classes. A blocker found on game 1
   costs an hour; found on game 200 it costs a rewrite.

4. **Then scale.**

## Verification

Do not declare any of this working from source. Measure:

```bash
# routing — the asset class that the matcher currently breaks
curl -sSI https://www.lessoncraftstudio.com/games/<slug>/index.html   # expect 200
curl -sSI https://www.lessoncraftstudio.com/games/<slug>/game.js      # expect 200, NOT 307→/en/…
curl -sSI https://www.lessoncraftstudio.com/games/_lib/phaser-3.90.0.min.js
curl -sSI https://www.lessoncraftstudio.com/games/<slug>/assets/atlas.json

# indexability
curl -sSI https://www.lessoncraftstudio.com/games/<slug>/index.html | grep -i x-robots

# WHO is serving it — nginx or Next? The Cache-Control VALUE is the tell.
#   "no-cache, must-revalidate" on .html  → the nginx $g_cache block is live  ✅
#   anything else                          → Next is serving; the alias did not apply
# (Do not read X-Robots-Tag for this: both layers can emit it. Match the value,
#  not the header name — that is the mistake this plan already made once.)
curl -sSI https://www.lessoncraftstudio.com/games/<slug>/index.html | grep -i cache-control

# and prove the boot-snapshot class is actually gone: write a NEW file to
# /var/www/lcs-media/games/ WITHOUT deploying, then fetch it. Must be 200.

# locale — all 11, checking rendered text not source
for l in en de fr it es pt nl sv da no fi; do
  echo "== $l"; curl -sS "https://www.lessoncraftstudio.com/games/<slug>/index.html?lang=$l" | grep -o 'lang="[a-z]*"'
done
```

Then in a browser, embedded in the real host page (not standalone — media
queries inside an iframe resolve against the **iframe**, and QA taken standalone
photographs a surface nobody visits): confirm the resize message lands, the game
fits at **320·360·412·768·1024·1366**, and tap targets are ≥44px.

Mind the **Cloudflare 5-minute TTL** before the edge reflects new bytes.

---

## Documentation note

One stale doc found, and one correction I had to make to myself.

**Stale:** `mini tools/SERVER-SETUP.md:16` still says the mini-tools public URL is
"served by Next.js via the symlink". That was true until 2026-07-06 and is now
wrong — see below. Worth a one-line fix while you are in there. The same file
proposes a `[ ! -L "$RELEASE_DIR/public/mini-tools" ]` assertion in `deploy.sh`
(line 64) that was never landed.

**Correction to an earlier draft of this plan:** I initially wrote that CLAUDE.md
§20.3 ("mini-tools served by nginx not Next") and §21.7's `NGINX_COVERED`
attribution were loose, on the grounds that `next.config.js:142-148` sets the
`X-Robots-Tag`. **Both were right and I was wrong.** `scripts/studio/patch-nginx-minitools-static.py`
installs a real `location /mini-tools/ { alias /var/www/lcs-media/mini-tools/; }`
block, and `scripts/ops/verify-nginx-contract.sh:60` requires it to exist. The
live `Cache-Control: no-cache, must-revalidate` I measured is *verbatim* the
nginx `$mt_cache` value for `.html` — evidence **for** nginx, which I read
backwards. Two `add_header` rules can produce the same header; matching the
value is what distinguishes them.
