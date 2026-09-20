#!/usr/bin/env python3
"""
patch-nginx-deck-asset-cache.py — deck PDFs: 1 h browser TTL + 5 min EDGE TTL.

WHY (measured 2026-09-21)
-------------------------
Every deck PDF location served `Cache-Control: public, max-age=2592000` (30 days)
under a URL that never changes across versions (`/<loc>/decks/<slug>/<slug>-printable.pdf`
is a symlink-resolved path; a republish swaps `<slug>` → `<slug>-vN`). Cloudflare
honours that header, so after the 2026-09-20 in-place republish of 142 decks the
edge kept serving the v1 PDF:

    edge:   last-modified Sun, 20 Sep 2026 20:03:14 GMT  cf-cache-status: HIT  Age: 7990
    origin: last-modified Sun, 20 Sep 2026 22:38:30 GMT

The operator opened the "fixed" sheets and saw the old ones. The same has been
true of every `--updates-manifest` republish (August 2,177; nt20-C divfix 72).
The og-image / thumbnail catch-all already uses max-age=300; only the four PDF
blocks carried 30 days.

MECHANISM
---------
In the four `location ~ ^/(en|…)/decks/…pdf$` blocks, replace
    add_header Cache-Control "public, max-age=2592000";
with
    add_header Cache-Control "public, max-age=3600";
    add_header Cloudflare-CDN-Cache-Control "max-age=300";
Cloudflare reads `Cloudflare-CDN-Cache-Control` for ITS cache (all plans) and
strips it; browsers/Google keep the 1 h `Cache-Control`. A republished PDF is
then at the edge within 5 min. Objects ALREADY cached for 30 days are not
expired by this — one dashboard "Purge Everything" is needed once (no API
token exists on the box, scaling-audit.md).

Idempotent (marker on each rewritten line; a second run finds 0 old headers and
4 markers → "already patched"); refuses on any other count (the config shape
changed — do not guess); backs up to /root/nginx-backups/ (never inside
sites-enabled/, §A.14.11); `nginx -t` with auto-rollback; reload.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-deck-asset-cache.py [--dry-run]
Self-test (anywhere): python3 scripts/publish-cli/patch-nginx-deck-asset-cache.py --self-test
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# LCS-PDF-EDGE-TTL (2026-09-21)"
OLD = 'add_header Cache-Control "public, max-age=2592000";'
NEW = ('add_header Cache-Control "public, max-age=3600";  ' + MARKER + '\n'
       '        add_header Cloudflare-CDN-Cache-Control "max-age=300";  ' + MARKER)
EXPECT = 4
PDF_LOC_RE = re.compile(r"^\s*location\s+~\s+\^/\(en\|de\|fr\|es\|pt\|it\|nl\|sv\|da\|no\|fi\)/decks/.*pdf")
DRY = "--dry-run" in sys.argv


def patch(text):
    """Returns (new_text, status). status: 'patched' | 'already' | ('refuse', why)."""
    lines = text.splitlines(keepends=True)
    markers = sum(1 for ln in lines if MARKER in ln)
    old_idx = [i for i, ln in enumerate(lines) if ln.strip() == OLD]
    if not old_idx and markers == 2 * EXPECT:
        return text, "already"
    if len(old_idx) != EXPECT or markers:
        return text, ("refuse", "expected %d old headers and 0 markers, found %d and %d — config shape changed, not guessing" % (EXPECT, len(old_idx), markers))
    # every old header must sit inside a decks/…pdf location (walk up to the nearest `location`)
    for i in old_idx:
        j = i
        while j >= 0 and not lines[j].lstrip().startswith("location"):
            j -= 1
        if j < 0 or not PDF_LOC_RE.match(lines[j]):
            return text, ("refuse", "the 30-day header at line %d is not inside a decks/…pdf location (found under: %s)" % (i + 1, lines[j].strip() if j >= 0 else "?"))
    for i in old_idx:
        indent = lines[i][:len(lines[i]) - len(lines[i].lstrip())]
        lines[i] = indent + NEW.replace("\n        ", "\n" + indent) + "\n"
    return "".join(lines), "patched"


def self_test():
    sample = ("server {\n"
              "    location ~ ^/(en|de|fr|es|pt|it|nl|sv|da|no|fi)/decks/([^/]+)/printable\\.pdf$ {\n"
              "        alias /x;\n        add_header Cache-Control \"public, max-age=2592000\";\n    }\n") * 1
    four = "server {\n" + "".join(
        "    location ~ ^/(en|de|fr|es|pt|it|nl|sv|da|no|fi)/decks/([^/]+)/%s$ {\n        alias /x;\n        add_header Cache-Control \"public, max-age=2592000\";\n    }\n" % p
        for p in ["printable\\.pdf", "answer-key\\.pdf", "(.+-printable\\.pdf)", "(.+-answer-key\\.pdf)"]) + \
        "    location ~ ^/(en|de)/decks/([^/]+)/(.+\\.(png|jpg))$ {\n        add_header Cache-Control \"public, max-age=300\";\n    }\n}\n"
    out, st = patch(four)
    assert st == "patched", st
    assert out.count(MARKER) == 8 and OLD not in out and out.count('max-age=300";') == 5, "patched text wrong"
    out2, st2 = patch(out)
    assert st2 == "already" and out2 == out, "not idempotent: %s" % (st2,)
    # poison 1: three headers instead of four → refuse
    three = four.replace(OLD, 'add_header Cache-Control "public, max-age=2592000";  # x', 1)
    assert patch(three)[1][0] == "refuse", "did not refuse on 3 headers"
    # poison 2: the 30-day header under a NON-pdf location → refuse
    wrong = four.replace('add_header Cache-Control "public, max-age=300";', OLD).replace(OLD, OLD, 1)
    assert patch(wrong)[1][0] == "refuse", "did not refuse a 30-day header outside the pdf blocks"
    # poison 3: a half-patched file (2 markers, 3 old) → refuse
    half = four.replace(OLD, NEW, 1)
    assert patch(half)[1][0] == "refuse", "did not refuse a half-patched file"
    print("self-test OK: patches 4, idempotent, refuses 3/3 poisons")


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def main():
    if "--self-test" in sys.argv:
        self_test()
        return
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)
    with open(CONF) as f:
        original = f.read()
    new_content, status = patch(original)
    if status == "already":
        print("already patched (4 PDF blocks carry the 1 h / edge 300 s headers) — nothing to do")
        return
    if isinstance(status, tuple):
        print("REFUSE: " + status[1])
        sys.exit(3)
    if DRY:
        print("DRY-RUN — would rewrite the 4 PDF Cache-Control lines:")
        for ln in new_content.splitlines():
            if MARKER in ln:
                print("   " + ln.strip())
        return
    os.makedirs(BACKUP_DIR, exist_ok=True)
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + time.strftime("%Y%m%dT%H%M%SZ", time.gmtime()) + ".bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)
    with open(CONF, "w") as f:
        f.write(new_content)
    r = run(["nginx", "-t"])
    if r.returncode != 0:
        print("nginx -t FAILED — rolling back:\n" + r.stderr.strip())
        shutil.copy2(backup, CONF)
        sys.exit(4)
    print("nginx -t OK")
    r = run(["systemctl", "reload", "nginx"])
    if r.returncode != 0:
        print("reload FAILED: " + r.stderr.strip())
        sys.exit(5)
    print("nginx reloaded — deck PDFs now Cache-Control max-age=3600 + Cloudflare-CDN-Cache-Control max-age=300")


if __name__ == "__main__":
    main()
