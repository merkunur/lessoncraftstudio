---
name: Worksheet-generator deploys require TWO steps — deploy.sh + update-worksheet.sh
description: After pushing changes to a REFERENCE APPS/<app>.html file and running deploy.sh, the served copy at /var/www/lcs-media/worksheet-generators/<app>.html is NOT automatically updated. That file is chattr +i (immutable) and must be refreshed via /var/www/lcs-media/scripts/update-worksheet.sh. Skipping this means the push lands in git but www.lessoncraftstudio.com keeps serving the old HTML.
type: feedback
originSessionId: e91f788f-b8a4-4705-a954-d392c267c51b
---
**Rule:** A production deploy of a worksheet-generator HTML requires BOTH:
1. `plink ... "bash /opt/lessoncraftstudio/deploy.sh"` (does `git pull` + build + smoke tests)
2. `plink ... "cp '/opt/lessoncraftstudio/REFERENCE APPS/<app>.html' /tmp/<app>.html && /var/www/lcs-media/scripts/update-worksheet.sh /tmp/<app>.html <app>.html"` (unlocks the immutable served copy, copies the new file, re-locks)

**Why:** `/var/www/lcs-media/worksheet-generators/*.html` files have the immutable attribute set (`chattr +i`) for tamper-protection. `deploy.sh` runs `git pull` which updates `/opt/lessoncraftstudio/REFERENCE APPS/<app>.html` but the served copy in `/var/www/lcs-media/` is what nginx actually delivers to users — and it stays frozen at whatever was there before. After a deploy-only push on 2026-04-22 the git repo had v4 of the interactive export but `curl https://www.lessoncraftstudio.com/worksheet-generators/addition.html | grep 'export v4'` returned 0 matches. Fixed by running update-worksheet.sh.

**How to apply:** For every worksheet-generator HTML change going to production:
1. Edit `REFERENCE APPS/<app>.html`.
2. Run `scripts\master-sync.bat` locally (refreshes the tracked sibling copies for dev).
3. `git add "REFERENCE APPS/<app>.html"` only → commit → push.
4. `plink ... "bash /opt/lessoncraftstudio/deploy.sh"`.
5. **Also run**: `plink ... "cp '/opt/lessoncraftstudio/REFERENCE APPS/<app>.html' /tmp/<app>.html && /var/www/lcs-media/scripts/update-worksheet.sh /tmp/<app>.html <app>.html"`.
6. Verify: `curl -s https://www.lessoncraftstudio.com/worksheet-generators/<app>.html | grep -c '<known-new-marker>'` should return ≥1.

Same two-step pattern applies to translation files (`/var/www/lcs-media/worksheet-generators/js/*.js`) — use `update-worksheet.sh /tmp/<file>.js js/<file>.js` — and to admin panels (`update-worksheet.sh --admin ...`).

SSH auth (from CLAUDE.md §A.1):
`plink -pw <old-password-rotated-2026-07-03> -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "<command>"`
