#!/usr/bin/env python3
"""
patch-nginx-old-apps.py — the 33 old worksheet generator apps are gone (operator 2026-11-06: "you don't need to keep the
33 app files"); their URLs must not break.

    /worksheet-generators/<app>.html[?locale=de]   ->  301  /de/worksheet-makers

The hub in the visitor's language: the old apps took `?locale=`. Only the apps named below redirect. Everything else under
/worksheet-generators/ keeps being served: js/ (js/lcs-meter.js is loaded by every deck), the content managers, the admin
pages, cvc-words. The legacy "alphabet train.html" spellings already 301 to their hyphen form, which then lands here.

Idempotent (marker lines removed and re-inserted); backup to /root/nginx-backups/ (never inside sites-enabled/);
`nginx -t` before reload, restore on failure.

    python3 scripts/makers/patch-nginx-old-apps.py [--dry-run]
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MAP_START = "# Old apps: locale of the redirect (2026-11-06)"
MAP_END = "# Old apps: end of map"
RULE = "# Old apps: 301 to the makers hub (2026-11-06)"
DRY = "--dry-run" in sys.argv

APPS = [
    "addition", "subtraction", "code-addition", "more-less", "math-puzzle", "math-worksheet",
    "alphabet-train", "prepositions", "word-guess", "word-scramble", "wordsearch", "cryptogram", "writing",
    "big-small", "pattern-train", "pattern-worksheet", "draw-and-color", "drawing-lines", "coloring", "chart-count",
    "matching", "grid-match", "shadow-match", "bingo", "picture-sort",
    "missing-pieces", "odd-one-out", "sudoku", "picture-path",
    "find-and-count", "find-objects", "crossword", "treasure-hunt",
]
assert len(APPS) == 33 and len(set(APPS)) == 33

MAP = """{start}
map $arg_locale $lcs_old_app_locale {{
    default en;
    "~^(de|fr|es|pt|it|nl|sv|da|no|fi)$" $arg_locale;
}}
{end}
""".format(start=MAP_START, end=MAP_END)

LOCATION_RE = re.compile(r"^(\s*)location /worksheet-generators/ \{\s*$")


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        return 1
    with open(CONF, encoding="utf-8") as f:
        text = f.read()
    text = re.sub(re.escape(MAP_START) + r".*?" + re.escape(MAP_END) + r"\n", "", text, flags=re.S)
    text = re.sub(r"^\s*" + re.escape(RULE) + r"\n.*\n", "", text, flags=re.M)

    rule = '{rule}\n        rewrite "^/worksheet-generators/({apps})\\.html$" /$lcs_old_app_locale/worksheet-makers? permanent;'.format(rule=RULE, apps="|".join(APPS))
    out, done = [], 0
    for line in text.split("\n"):
        out.append(line)
        m = LOCATION_RE.match(line)
        if m:
            out.append(m.group(1) + "    " + rule)
            done += 1
    if done != 1:
        print("FATAL: expected one `location /worksheet-generators/ {`, found %d" % done)
        return 1
    new = MAP + "\n".join(out)
    if DRY:
        print(MAP)
        print(rule)
        return 0
    os.makedirs(BACKUP_DIR, exist_ok=True)
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio.%s.bak" % time.strftime("%Y%m%dT%H%M%SZ", time.gmtime()))
    shutil.copy2(CONF, backup)
    with open(CONF, "w", encoding="utf-8") as f:
        f.write(new)
    t = run(["nginx", "-t"])
    if t.returncode != 0:
        shutil.copy2(backup, CONF)
        print("FATAL: nginx -t failed, config restored\n" + t.stderr)
        return 1
    r = run(["systemctl", "reload", "nginx"])
    if r.returncode != 0:
        print("FATAL: reload failed\n" + r.stderr)
        return 1
    print("backup -> " + backup)
    print("installed + reloaded. Read error.log for [emerg] after a reload.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
