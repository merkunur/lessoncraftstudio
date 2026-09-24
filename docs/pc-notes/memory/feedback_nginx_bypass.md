---
name: nginx bypasses Next.js for /worksheet-generators/, /samples/, and image paths
description: Static asset paths aliased by nginx never reach Next.js, so next.config.js redirects()/rewrites() and middleware.ts rules have zero effect on them
type: feedback
originSessionId: 00a98919-6065-4e87-9344-d339a8ad0c5e
---
**Rule:** On lessoncraftstudio.com, nginx aliases the following paths directly to isolated storage under `/var/www/lcs-media/` and serves them without ever hitting Next.js:

- `/worksheet-generators/*` → `/var/www/lcs-media/worksheet-generators/`
- `/samples/*` → `/var/www/lcs-media/samples/`
- `/image-library/*`, `/admin/*`, and a few other paths (see `frontend/middleware.ts` matcher exclusions)

Do NOT try to control these URLs via Next.js `redirects()`, `rewrites()`, or `middleware.ts`. They are already excluded from the middleware matcher, and the `redirects()` hook only fires when Next.js receives the request.

**Why:** This was learned the hard way during the April 2026 SEO refresh. Commit `7ccd25af` hyphenated URLs emitted by internal link builders (e.g. `word%20guess.html` → `word-guess.html`) and added 25 redirects in `next.config.js` mapping hyphenated → spaced. After deploy, every multi-word Try-Free CTA produced 404s because nginx returned 404 before Next.js ever saw the request. Rolled back in commit `70ca2edf`.

**How to apply:**

- When you need to clean up a URL in one of these subtrees, the redirect must live in the nginx config on the server (`/etc/nginx/sites-enabled/...`), not in Next.js.
- When emitting internal links to these paths, always `encodeURIComponent()` filenames with spaces — the filesystem still has the original spaced files, and nginx serves them as-is.
- Confirm a redirect path ACTUALLY reaches Next.js before wiring it there. Quick sniff test: `curl -sI https://www.lessoncraftstudio.com/<path>` — if the `Server:` header says `nginx/1.18.0` and there's no `X-Powered-By: Next.js`, assume nginx is serving it directly.
