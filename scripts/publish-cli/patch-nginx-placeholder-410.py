#!/usr/bin/env python3
"""
patch-nginx-placeholder-410.py — 410 the crawler-noise placeholder URLs.

Deck.html builds its celebration overlay via JS string concatenation; the raw
HTML therefore contains the literal text `src="+DECK_BUNDLE.worksheetImage+"`
(and `+boxSrc+`) inside a <script> string. Browsers never request these, but
regex-scraping crawlers extract them as URLs, producing ~10k/14d 404s like
  /en/decks/<slug>/+DECK_BUNDLE.worksheetImage+
Each such request currently falls through to the Next.js proxy and renders a
full 404 page. This patch short-circuits the whole class at nginx with a cheap
410 (Gone — tells well-behaved crawlers to drop the URL permanently).

We deliberately do NOT touch the 29 apps or republish 45k decks (runtime is
correct; §10.3 protects app generation logic).

Idempotent (marker comment); backup to /root/nginx-backups/ (never inside
sites-enabled/, §A.14.11); `nginx -t` with auto-rollback; reload.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-placeholder-410.py
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# Placeholder-path 410 (commission #1, 2026-07-03)"

# Anchor: the deck PAGE location — insert our regex location before it so it
# wins evaluation order for the placeholder paths.
ANCHOR_RE = re.compile(
    r'^\s*location\s+~\s+\^/\(en\|de\|fr\|es\|pt\|it\|nl\|sv\|da\|no\|fi\)/decks/\(\.\+\?\)/\$\s*\{'
)

BLOCK = """    {marker}
    # JS-string placeholders scraped out of deck.html by naive crawlers
    # (+DECK_BUNDLE.worksheetImage+ / +boxSrc+ etc.). Never a real resource:
    # 410 them at the edge of origin instead of rendering a Next.js 404 page.
    location ~ "^/(en|de|fr|es|pt|it|nl|sv|da|no|fi)/decks/[^/]+/\\+[A-Za-z0-9_.-]*\\+$" {{
        access_log off;
        return 410;
    }}

""".format(marker=MARKER)


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)

    with open(CONF, "r") as f:
        original = f.read()

    if MARKER in original:
        print("IDEMPOTENT: placeholder-410 block already present — no change.")
        r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
        print(r.stderr.strip())
        sys.exit(0)

    lines = original.splitlines(keepends=True)
    insert_at = None
    for i, ln in enumerate(lines):
        if ANCHOR_RE.match(ln):
            insert_at = i
            break

    if insert_at is None:
        print("FATAL: could not locate the deck-page location to insert before.")
        print("       Aborting WITHOUT changes (config untouched).")
        sys.exit(3)

    new_content = "".join(lines[:insert_at]) + BLOCK + "".join(lines[insert_at:])

    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)

    with open(CONF, "w") as f:
        f.write(new_content)
    print("inserted placeholder-410 block before the deck-page location (line ~" + str(insert_at + 1) + ").")

    r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
    if r.returncode != 0:
        print("nginx -t FAILED — rolling back:")
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        print("restored original from " + backup)
        sys.exit(4)
    print("nginx -t OK:")
    print(r.stderr.strip())

    r2 = subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
    if r2.returncode != 0:
        r2 = subprocess.run(["nginx", "-s", "reload"], capture_output=True, text=True)
    if r2.returncode != 0:
        print("reload FAILED — rolling back + reload:")
        print((r2.stderr or "").strip())
        shutil.copy2(backup, CONF)
        subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
        sys.exit(5)
    print("nginx reloaded. Placeholder-410 live.")


if __name__ == "__main__":
    main()
