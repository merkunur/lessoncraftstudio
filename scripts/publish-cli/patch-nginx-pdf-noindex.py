#!/usr/bin/env python3
"""
patch-nginx-pdf-noindex.py — add `X-Robots-Tag: noindex` to deck PDF responses.

Operator decision 2026-05-31: the printable / answer-key PDFs duplicate the
interactive deck page's content and were being indexed by Google as separate
thin documents (visible as "strange" /decks/<slug>/<slug>-printable.pdf URLs in
Search Console). We keep the deck.html page the single indexable surface; PDFs
stay fully crawlable + downloadable + embeddable but drop out of the index.

Mechanism: a dedicated `.pdf` location under /<locale>/decks/<slug>/ that aliases
the file AND emits `X-Robots-Tag: noindex` (crawl-allowed, follow-default — so
internal link equity from the deck page is preserved; robots.txt Disallow would
have BLOCKED the crawl and prevented Google from ever seeing the noindex). The
block is inserted BEFORE the generic deck-asset catch-all so PNG/og-image/
thumbnail stay indexable (they are in the image sitemap).

Idempotent (marker comment); backs up to /root/nginx-backups/ (NEVER inside
sites-enabled/, per CLAUDE.md §A.14.11); `nginx -t` with auto-rollback; reload.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-pdf-noindex.py
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# PDF noindex (operator 2026-05-31)"

# Signature of the generic deck-asset catch-all we must insert BEFORE.
CATCHALL_RE = re.compile(
    r'^\s*location\s+~\s+\^/\(en\|de\|fr\|es\|pt\|it\|nl\|sv\|da\|no\|fi\)/decks/\(\[\^/\]\+\)/\(\.\+\\\.\(png\|jpg\|jpeg\|webp\|pdf\|json\|svg\)\)\$\s*\{'
)

BLOCK = """    {marker}
    # Serve deck PDF assets but keep them OUT of the search index — the deck.html
    # page is the single indexable surface. PDFs stay crawlable + downloadable;
    # `noindex` only (follow preserved). MUST precede the generic asset catch-all
    # below so PNG/og-image/thumbnail remain indexable (image sitemap).
    location ~ ^/(en|de|fr|es|pt|it|nl|sv|da|no|fi)/decks/([^/]+)/(.+\\.pdf)$ {{
        alias /var/www/lcs-media/decks/$1/$2/$3;
        add_header X-Robots-Tag "noindex" always;
        add_header Cache-Control "public, max-age=300";
        add_header X-Content-Type-Options nosniff;
        access_log off;
    }}

""".format(marker=MARKER)


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)

    with open(CONF, "r") as f:
        original = f.read()

    if MARKER in original:
        print("IDEMPOTENT: PDF-noindex block already present — no change.")
        # still verify nginx config is valid
        r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
        print(r.stderr.strip())
        sys.exit(0)

    lines = original.splitlines(keepends=True)
    insert_at = None
    for i, ln in enumerate(lines):
        if CATCHALL_RE.match(ln):
            insert_at = i
            break

    if insert_at is None:
        print("FATAL: could not locate the generic deck-asset catch-all location to insert before.")
        print("       Aborting WITHOUT changes (config untouched).")
        sys.exit(3)

    new_content = "".join(lines[:insert_at]) + BLOCK + "".join(lines[insert_at:])

    # backup OUTSIDE sites-enabled/
    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)

    with open(CONF, "w") as f:
        f.write(new_content)
    print("inserted PDF-noindex block before deck-asset catch-all (line ~" + str(insert_at + 1) + ").")

    # validate
    r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
    if r.returncode != 0:
        print("nginx -t FAILED — rolling back:")
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        print("restored original from " + backup)
        sys.exit(4)
    print("nginx -t OK:")
    print(r.stderr.strip())

    # reload
    r2 = subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
    if r2.returncode != 0:
        # fallback to nginx -s reload
        r2 = subprocess.run(["nginx", "-s", "reload"], capture_output=True, text=True)
    if r2.returncode != 0:
        print("reload FAILED — rolling back + reload:")
        print((r2.stderr or "").strip())
        shutil.copy2(backup, CONF)
        subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
        sys.exit(5)
    print("nginx reloaded. PDF-noindex live.")


if __name__ == "__main__":
    main()
