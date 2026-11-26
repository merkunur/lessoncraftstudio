#!/usr/bin/env python3
"""
Add `nofollow` to the X-Robots-Tag of every NON-indexable deck page.

    map $deck_uri $deck_robots {
        default "noindex, indexifembedded";            # before
        default "noindex, nofollow, indexifembedded";  # after
        include /etc/nginx/deck-noindex-exempt.map;    # unchanged: indexable decks -> ""
    }

WHY (measured 2026-11-26, nginx log 13-26 Nov, verified Googlebot IPs only).
Of ~101,000 Googlebot requests in 14 days, 43,970 went to 43,278 DIFFERENT noindex
deck pages (Level Set copies and year pages), against ~33,000 to all 56,090 URLs of
the sitemap together. Only ~21,000 sitemap URLs were fetched even once in those 14
days. There are 150,406 published noindex decks (against 51,640 indexable ones) and
each one links its sibling copies (-2 ... -5) and other sets, so Google walks the
whole web of them and keeps finding new ones. A noindex page can never enter the
index; every fetch of one is a fetch an indexable page did not get.

`nofollow` tells Google not to follow the links OUT of these pages, which cuts the
web at its first step. The pages themselves stay reachable from the indexable pages
that list them, stay noindex, and keep working for visitors (robots directives do
not touch people). The in-file `<meta name="robots" content="noindex, follow">` of
the Level Set decks is left alone: Google applies the most restrictive of the
header and the meta, so the header decides and no deck file is rewritten.

WHAT DOES NOT CHANGE. Indexable decks (the landing-less, self-canonical ones that
sitemap shards 0/1 submit) are in the exempt map with the value "", so nginx sends
them no X-Robots-Tag at all, before and after. No title, description, canonical or
robots of any indexable page changes.

Idempotent. Backs up OUTSIDE sites-enabled/, runs `nginx -t`, reloads only if the
test passes (else restores the backup). Matches the patch-nginx-*.py convention.

To REVERT: restore the printed backup, or run with --revert.

Usage:  sudo python3 patch-nginx-deck-nofollow.py [--dry-run] [--revert]
"""
import os
import re
import sys
import shutil
import subprocess
from datetime import datetime

CFG = os.path.realpath("/etc/nginx/sites-enabled/lessoncraftstudio")
MAP_OPEN = re.compile(r"^\s*map\s+\$deck_uri\s+\$deck_robots\s*\{")
OLD = '"noindex, indexifembedded"'
NEW = '"noindex, nofollow, indexifembedded"'
DEFAULT_RE = re.compile(r'^(\s*)default\s+("[^"]*")\s*;\s*$')
NOTE = ["    # nofollow (2026-11-26): stops Google walking the 150k interlinked noindex decks;\n",
        "    # see scripts/publish-cli/patch-nginx-deck-nofollow.py. Indexable decks get \"\".\n"]


def patch(lines, revert=False):
    """Return (lines, state). state: 'changed' | 'already' | 'no-map' | 'unexpected:<value>'."""
    want_from, want_to = (NEW, OLD) if revert else (OLD, NEW)
    for i, line in enumerate(lines):
        if not MAP_OPEN.match(line):
            continue
        j = i + 1
        while j < len(lines) and "}" not in lines[j]:
            m = DEFAULT_RE.match(lines[j])
            if m:
                value = m.group(2)
                if value == want_to:
                    return lines, "already"
                if value != want_from:
                    return lines, f"unexpected:{value}"
                lines[j] = f"{m.group(1)}default {want_to};\n"
                body = lines[i + 1:j]  # the map's lines above `default`
                if revert:
                    body = [b for b in body if b not in NOTE]
                elif not all(n in body for n in NOTE):
                    body = body + NOTE
                lines[i + 1:j] = body
                return lines, "changed"
            j += 1
        return lines, "no-default"
    return lines, "no-map"


def main():
    args = sys.argv[1:]
    dry = "--dry-run" in args
    revert = "--revert" in args
    with open(CFG) as f:
        lines = f.readlines()
    lines, state = patch(lines, revert)
    print(f"map $deck_uri $deck_robots default: {state}")
    if state == "already":
        print("Nothing to do.")
        return
    if state != "changed":
        sys.stderr.write("FATAL: the deck robots map is not in the expected shape "
                         "(see patch-nginx-deck-noindex-exempt.py). Nothing written.\n")
        sys.exit(1)
    if dry:
        print("--dry-run: not writing.")
        return
    bk = f"/root/lcs-nginx-backup-decknofollow-{datetime.now():%Y%m%d-%H%M%S}.conf"
    shutil.copy(CFG, bk)
    print(f"backup: {bk}")
    with open(CFG, "w") as f:
        f.writelines(lines)
    test = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
    sys.stderr.write(test.stderr)
    if test.returncode != 0:
        shutil.copy(bk, CFG)
        print("nginx -t FAILED -> restored backup; no reload.")
        sys.exit(1)
    subprocess.run(["systemctl", "reload", "nginx"], check=True)
    print("reloaded nginx.")
    print("Verify (origin; expect the new header on a noindex deck and NOTHING on an indexable one):")
    print("  R='--resolve www.lessoncraftstudio.com:443:127.0.0.1'")
    print("  curl -sI $R https://www.lessoncraftstudio.com/de/decks/die-fuenf-sinne-g1358-2/ | grep -i x-robots")
    print("  curl -sI $R https://www.lessoncraftstudio.com/en/decks/arrays-multiplication-shapes-k027/ | grep -i x-robots")


if __name__ == "__main__":
    main()
