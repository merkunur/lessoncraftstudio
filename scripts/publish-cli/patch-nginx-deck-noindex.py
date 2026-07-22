#!/usr/bin/env python3
"""
Add `X-Robots-Tag: noindex, indexifembedded` to ONLY the deck.html nginx location block —
never the PDFs, the PNG/asset catch-all, or the /worksheets landing.

WHY (2026-07-22, operator mandate "make /worksheets the ONE surface Google shows"). Each worksheet
exposes 4 URLs: the /worksheets/<slug> LANDING (the surface we WANT indexed — self-canonical, in the
sitemap, now carries unique content + embeds the interactive worksheet + links the printable PDF), the
interactive deck.html at /<loc>/decks/<slug>/, and the two PDFs. The deck.html carries a rel=canonical
-> landing that Google IGNORES (deck and landing aren't byte-duplicates), so it stays a standalone
indexable COMPETITOR of the landing while earning ~0 clicks itself.

`noindex` drops the standalone deck from the index. `indexifembedded` (Google's purpose-built directive,
https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#indexifembedded) then lets
the deck's interactive content still index AS PART OF the landing that iframes it — so the deck REINFORCES
the landing instead of competing. A noindexed iframe does NOT deindex the parent (Mueller-confirmed). The
deck keeps serving HTTP 200 (NOT a 301 — the landing's <iframe src> needs a live document; a 301 would
break/self-nest the embed). It stays crawlable so Google actually reads the header.

Targets ONLY the deck HTML block, identified by `try_files /deck.html` (the printable/answer-key/asset
blocks never contain it). Idempotent, brace-depth aware, backs up OUTSIDE sites-enabled/, runs `nginx -t`,
reloads only if the test passes (else restores the backup). Matches the patch-nginx-*.py convention.

Usage:  sudo python3 patch-nginx-deck-noindex.py [--dry-run]
"""
import os
import re
import sys
import shutil
import subprocess
from datetime import datetime

CFG = os.path.realpath("/etc/nginx/sites-enabled/lessoncraftstudio")
HEADER_LINE = '        add_header X-Robots-Tag "noindex, indexifembedded" always;\n'
LOCATION = re.compile(r"^\s*location\b")
# The deck.html block is the ONLY location whose body serves deck.html via try_files.
DECK_MARKER = "try_files /deck.html"


def patch(lines):
    """Return (new_lines, changed, already). For each location block whose body contains
    `try_files /deck.html` and lacks an X-Robots-Tag, insert the header after its Cache-Control line."""
    out = []
    i = 0
    n = len(lines)
    changed = 0
    already = 0
    while i < n:
        line = lines[i]
        if LOCATION.search(line):
            depth = line.count("{") - line.count("}")
            block = []
            j = i + 1
            has_xrobots = False
            has_deck_marker = DECK_MARKER in line
            cache_idx = None
            while j < n and depth > 0:
                block.append(lines[j])
                if "X-Robots-Tag" in lines[j]:
                    has_xrobots = True
                if DECK_MARKER in lines[j]:
                    has_deck_marker = True
                if "Cache-Control" in lines[j] and cache_idx is None:
                    cache_idx = len(block) - 1
                depth += lines[j].count("{") - lines[j].count("}")
                j += 1
            out.append(line)
            if has_deck_marker:
                if has_xrobots:
                    already += 1
                elif cache_idx is not None:
                    block.insert(cache_idx + 1, HEADER_LINE)
                    changed += 1
                else:
                    sys.stderr.write("WARN: deck.html block had no Cache-Control anchor; skipped.\n")
            out.extend(block)
            i = j
            continue
        out.append(line)
        i += 1
    return out, changed, already


def main():
    dry = "--dry-run" in sys.argv[1:]
    with open(CFG) as f:
        lines = f.readlines()

    new_lines, changed, already = patch(lines)
    print(f"deck.html blocks: {changed} to patch, {already} already have X-Robots-Tag.")

    if changed == 0:
        print("Nothing to do.")
        return
    if dry:
        print(f"--dry-run: would insert '{HEADER_LINE.strip()}' into {changed} block(s). Not writing.")
        return

    bk = f"/root/lcs-nginx-backup-decknoindex-{datetime.now():%Y%m%d-%H%M%S}.conf"
    shutil.copy(CFG, bk)
    print(f"backup: {bk}")
    with open(CFG, "w") as f:
        f.writelines(new_lines)

    test = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
    sys.stderr.write(test.stderr)
    if test.returncode != 0:
        shutil.copy(bk, CFG)
        print("nginx -t FAILED -> restored backup; no reload.")
        sys.exit(1)
    subprocess.run(["systemctl", "reload", "nginx"], check=True)
    print(f"Patched {changed} deck.html block(s) + reloaded nginx.")


if __name__ == "__main__":
    main()
