#!/usr/bin/env python3
"""
unpatch-nginx-pdf-noindex.py — REVERSE patch-nginx-pdf-noindex.py.

SEO recovery 2026-06-20: the `X-Robots-Tag: noindex` on deck PDFs (added
2026-05-31) deindexed the printable / answer-key PDFs, which were previously
indexed AND clicked directly in Google ("printable … pdf" intent). Daily Search
clicks fell ~80 → ~15 over the following weeks. PDFs are crawlably linked from
the canonical /worksheets/ landing pages, so removing the noindex header lets
Google re-crawl + re-index them. Fully reversible: re-run
patch-nginx-pdf-noindex.py to restore the noindex block.

Mechanism: remove the marked PDF location block. After removal the generic
deck-asset catch-all serves PDFs with NO X-Robots-Tag (indexable again). The
PNG/og-image/thumbnail catch-all is left untouched (still indexable).

Idempotent (no-op if the marker is absent); backs up to /root/nginx-backups/
(NEVER inside sites-enabled/, per CLAUDE.md §A.14.11); `nginx -t` with
auto-rollback; reload with auto-rollback.

Usage (on Hetzner):  python3 scripts/publish-cli/unpatch-nginx-pdf-noindex.py
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

# Exact block written by patch-nginx-pdf-noindex.py (verbatim, for precise removal).
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


def remove_block_marker_anchored(text):
    """Fallback removal: from the MARKER line through the closing brace of the
    immediately-following pdf `location { … }` block, plus one trailing blank
    line. Brace-counted so hand-edits to the body are tolerated."""
    lines = text.splitlines(keepends=True)
    start = None
    for i, ln in enumerate(lines):
        if MARKER in ln:
            start = i
            break
    if start is None:
        return None
    # find the pdf location opening brace at/after the marker
    j = start
    opened = False
    depth = 0
    end = None
    while j < len(lines):
        depth += lines[j].count("{") - lines[j].count("}")
        if "{" in lines[j]:
            opened = True
        if opened and depth <= 0:
            end = j
            break
        j += 1
    if end is None:
        return None
    # absorb a single trailing blank line if present
    tail = end + 1
    if tail < len(lines) and lines[tail].strip() == "":
        tail += 1
    return "".join(lines[:start]) + "".join(lines[tail:])


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)

    with open(CONF, "r") as f:
        original = f.read()

    if MARKER not in original:
        print("IDEMPOTENT: PDF-noindex block not present — already reverted. No change.")
        r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
        print(r.stderr.strip())
        sys.exit(0)

    if BLOCK in original:
        new_content = original.replace(BLOCK, "", 1)
        how = "exact-block match"
    else:
        new_content = remove_block_marker_anchored(original)
        how = "marker-anchored brace-scan"
        if new_content is None:
            print("FATAL: marker present but block could not be delimited — aborting WITHOUT changes.")
            sys.exit(3)

    if MARKER in new_content:
        print("FATAL: marker still present after removal — aborting WITHOUT changes.")
        sys.exit(3)

    # backup OUTSIDE sites-enabled/
    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".pre-unpatch.bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)

    with open(CONF, "w") as f:
        f.write(new_content)
    print("removed PDF-noindex block (" + how + ").")

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
        r2 = subprocess.run(["nginx", "-s", "reload"], capture_output=True, text=True)
    if r2.returncode != 0:
        print("reload FAILED — rolling back + reload:")
        print((r2.stderr or "").strip())
        shutil.copy2(backup, CONF)
        subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
        sys.exit(5)
    print("nginx reloaded. PDF noindex REMOVED — deck PDFs are indexable again.")


if __name__ == "__main__":
    main()
