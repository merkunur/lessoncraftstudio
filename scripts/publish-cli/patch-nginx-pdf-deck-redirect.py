#!/usr/bin/env python3
"""
patch-nginx-pdf-deck-redirect.py — make the deck-PDF location blocks honor the
$deck_redirect map so legacy English-slug PDF URLs 301 to the canonical native
PDF instead of looping / 404ing.

Problem (SEO recovery 2026-07-05): the native-slug migration left English-named
directory symlinks (e.g. buchstabensalat-easy-formen-fcbc -> buchstabensalat-
leicht-formen-fcbc-v1) whose PDFs are native-prefixed. Google still holds the old
English PDF URLs. The nginx "make-whole" rules reconstruct the canonical filename
from the URL dir segment ($2 = the OLD English slug), so for aliased decks:
  <alias>/<alias>-printable.pdf  -> 301 to the SAME non-existent URL  (INFINITE LOOP)
  <alias>/printable.pdf (bare)   -> 404
The page-level `map $uri $deck_redirect` (gen-old-slug-redirects.js) already 301s
old page URLs -> native. That generator now ALSO emits PDF asset keys; this patch
makes the four deck-PDF location blocks consult $deck_redirect FIRST, so a mapped
alias PDF URI 301s to its canonical native PDF before the buggy make-whole logic
runs. Non-aliased decks have empty $deck_redirect -> existing behavior unchanged.

Targets exactly the 4 deck-PDF location openers (bare printable / bare answer-key /
make-whole *-printable / make-whole *-answer-key). Does NOT touch the generic
deck-asset catch-all (png/jpg/webp/json/svg) — its opener does not end in `.pdf$`.

Idempotent (no-op if marker present); backs up to /root/nginx-backups/ (NEVER
inside sites-enabled/, §A.14.11); `nginx -t` with auto-rollback; reload with
auto-rollback. Re-run after any nginx rebuild that drops the block.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-pdf-deck-redirect.py
"""
import subprocess
import shutil
import time
import os
import re
import sys

CONF = '/etc/nginx/sites-enabled/lessoncraftstudio'
BKDIR = '/root/nginx-backups'
MARKER = '# legacy-alias PDF 301 -> $deck_redirect (SEO-recovery 2026-07-05)'
INJECT = '        if ($deck_redirect) { return 301 $deck_redirect; }  ' + MARKER

# A deck-PDF location opener: `location ~ .../decks/([^/]+)/<...>.pdf$ {` (opener
# ends in `.pdf$ {` or `.pdf)$ {`). The generic catch-all ends in `svg))$ {` and
# is deliberately excluded.
OPENER_RE = re.compile(r'^\s*location\s+~\s+.*/decks/\(\[\^/\]\+\)/.*\.pdf\)?\$\s*\{\s*$')
EXPECTED = 4


def main():
    if not os.path.exists(CONF):
        print('FATAL: nginx config not found at ' + CONF)
        sys.exit(2)

    with open(CONF, 'r') as f:
        original = f.read()

    if MARKER in original:
        print('IDEMPOTENT: $deck_redirect PDF injection already present — no change.')
        r = subprocess.run(['nginx', '-t'], capture_output=True, text=True)
        print(r.stderr.strip())
        sys.exit(0)

    lines = original.split('\n')
    out = []
    injected = 0
    for line in lines:
        out.append(line)
        if OPENER_RE.match(line):
            out.append(INJECT)
            injected += 1

    if injected != EXPECTED:
        print('FATAL: matched %d deck-PDF location openers (expected %d) — aborting '
              'WITHOUT changes.' % (injected, EXPECTED))
        sys.exit(3)

    new_content = '\n'.join(out)

    os.makedirs(BKDIR, exist_ok=True)
    stamp = time.strftime('%Y%m%dT%H%M%SZ', time.gmtime())
    backup = os.path.join(BKDIR, 'lessoncraftstudio.' + stamp + '.pre-deckredirect.bak')
    shutil.copy2(CONF, backup)
    print('backup -> ' + backup)

    with open(CONF, 'w') as f:
        f.write(new_content)
    print('injected `if ($deck_redirect) return 301` into %d deck-PDF location blocks.' % injected)

    r = subprocess.run(['nginx', '-t'], capture_output=True, text=True)
    if r.returncode != 0:
        print('nginx -t FAILED — rolling back:')
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        print('restored original from ' + backup)
        sys.exit(4)
    print('nginx -t OK:')
    print(r.stderr.strip())

    r2 = subprocess.run(['systemctl', 'reload', 'nginx'], capture_output=True, text=True)
    if r2.returncode != 0:
        r2 = subprocess.run(['nginx', '-s', 'reload'], capture_output=True, text=True)
    if r2.returncode != 0:
        print('reload FAILED — rolling back + reload:')
        print((r2.stderr or '').strip())
        shutil.copy2(backup, CONF)
        subprocess.run(['systemctl', 'reload', 'nginx'], capture_output=True, text=True)
        sys.exit(5)
    print('nginx reloaded. legacy-alias PDF 301 ACTIVE. '
          '(Verify an aliased PDF 301s->native 200, and a non-aliased PDF still 200 directly.)')


if __name__ == '__main__':
    main()
