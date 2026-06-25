#!/usr/bin/env python3
"""
patch-nginx-pdf-makewhole-301.py — 301 dead "make-whole"/legacy-mode deck PDF
filenames to the canonical <slug>-printable.pdf / <slug>-answer-key.pdf.

SEO recovery 2026-06-25: ~8.8k non-EN decks had their printable/answer-key PDF
named with the OLD English exercise-mode (e.g. addition-IMAGE-IMAGE-tiere-
printable.pdf) while the deck slug + files were localized (addition-bild-bild-
tiere). The 2026-06-20 fix renamed the files to <slug>-*.pdf, so the OLD URLs
Google crawled now 404. PDFs are indexable again → recover that equity + clear the
GSC "Not found (404)" bucket by 301-ing the drifted names to the canonical name.

Mechanism (mirrors the existing bare-name printable.pdf/answer-key.pdf blocks):
two `location ~ …/decks/<dir>/(.+-printable\\.pdf)$` blocks that, via the SAFE
`if (!-f <requested>)` file-test, 301 to /<loc>/decks/<dir>/<dir>-printable.pdf
when the requested file is ABSENT (drifted name), else alias-serve it. Loop-safe:
the canonical <dir>-printable.pdf always exists on disk (residue=0 verified) → it
is served, never redirected. Inserted BEFORE the generic deck-asset catch-all so
the drift redirect fires first; PNG/og-image/thumbnail are unaffected.

Idempotent (no-op if marker present); backs up to /root/nginx-backups/ (NEVER
inside sites-enabled/, §A.14.11); `nginx -t` with auto-rollback; reload with
auto-rollback.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-pdf-makewhole-301.py
"""
import subprocess
import shutil
import time
import os
import sys

CONF = '/etc/nginx/sites-enabled/lessoncraftstudio'
BKDIR = '/root/nginx-backups'
MARKER = '# make-whole PDF 301 (SEO-recovery 2026-06-25)'
# Insert the block immediately BEFORE the generic deck-asset catch-all comment.
ANCHOR = '    # Serve deck asset sub-files (thumbnail.png, og-image.png, printable.pdf,'

BLOCK = r'''    # make-whole PDF 301 (SEO-recovery 2026-06-25)
    # Drifted legacy-mode PDF filenames (e.g. addition-image-image-tiere-
    # printable.pdf) now 404 because the file was renamed to <slug>-printable.pdf.
    # Catch ANY *-printable.pdf / *-answer-key.pdf: if the REQUESTED file is absent
    # (drifted name) 301 to the canonical <slug>-*.pdf; if present (the canonical
    # name) alias-serve it. Loop-safe via `if (!-f)` (canonical always exists).
    # MUST precede the generic deck-asset catch-all below.
    location ~ ^/(en|de|fr|es|pt|it|nl|sv|da|no|fi)/decks/([^/]+)/(.+-printable\.pdf)$ {
        if (!-f /var/www/lcs-media/decks/$1/$2/$3) {
            return 301 /$1/decks/$2/$2-printable.pdf;
        }
        alias /var/www/lcs-media/decks/$1/$2/$3;
        add_header Cache-Control "public, max-age=300";
        add_header X-Content-Type-Options nosniff;
        access_log off;
    }

    location ~ ^/(en|de|fr|es|pt|it|nl|sv|da|no|fi)/decks/([^/]+)/(.+-answer-key\.pdf)$ {
        if (!-f /var/www/lcs-media/decks/$1/$2/$3) {
            return 301 /$1/decks/$2/$2-answer-key.pdf;
        }
        alias /var/www/lcs-media/decks/$1/$2/$3;
        add_header Cache-Control "public, max-age=300";
        add_header X-Content-Type-Options nosniff;
        access_log off;
    }

'''


def main():
    if not os.path.exists(CONF):
        print('FATAL: nginx config not found at ' + CONF)
        sys.exit(2)

    with open(CONF, 'r') as f:
        original = f.read()

    if MARKER in original:
        print('IDEMPOTENT: make-whole PDF 301 block already present — no change.')
        r = subprocess.run(['nginx', '-t'], capture_output=True, text=True)
        print(r.stderr.strip())
        sys.exit(0)

    if ANCHOR not in original:
        print('FATAL: anchor not found (' + ANCHOR.strip() + ') — aborting WITHOUT changes.')
        sys.exit(3)

    # insert BLOCK immediately before the anchor (first occurrence)
    new_content = original.replace(ANCHOR, BLOCK + ANCHOR, 1)
    if MARKER not in new_content:
        print('FATAL: insertion failed — aborting WITHOUT changes.')
        sys.exit(3)

    os.makedirs(BKDIR, exist_ok=True)
    stamp = time.strftime('%Y%m%dT%H%M%SZ', time.gmtime())
    backup = os.path.join(BKDIR, 'lessoncraftstudio.' + stamp + '.pre-makewhole301.bak')
    shutil.copy2(CONF, backup)
    print('backup -> ' + backup)

    with open(CONF, 'w') as f:
        f.write(new_content)
    print('inserted make-whole PDF 301 block before the generic deck-asset catch-all.')

    # validate
    r = subprocess.run(['nginx', '-t'], capture_output=True, text=True)
    if r.returncode != 0:
        print('nginx -t FAILED — rolling back:')
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        print('restored original from ' + backup)
        sys.exit(4)
    print('nginx -t OK:')
    print(r.stderr.strip())

    # reload
    r2 = subprocess.run(['systemctl', 'reload', 'nginx'], capture_output=True, text=True)
    if r2.returncode != 0:
        r2 = subprocess.run(['nginx', '-s', 'reload'], capture_output=True, text=True)
    if r2.returncode != 0:
        print('reload FAILED — rolling back + reload:')
        print((r2.stderr or '').strip())
        shutil.copy2(backup, CONF)
        subprocess.run(['systemctl', 'reload', 'nginx'], capture_output=True, text=True)
        sys.exit(5)
    print('nginx reloaded. make-whole PDF 301 ACTIVE. (Verify a canonical PDF still 200 + a drifted name 301.)')


if __name__ == '__main__':
    main()
