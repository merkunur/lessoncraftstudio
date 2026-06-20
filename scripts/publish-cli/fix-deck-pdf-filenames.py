#!/usr/bin/env python3
"""
fix-deck-pdf-filenames.py — rename mis-named deck PDF assets so the public
deck.html / landing PDF links resolve (HTTP 200) instead of 404.

Root cause (found 2026-06-20 SEO recovery): for ~8.9k decks — concentrated in
de/es/pt/fr/it (25-35% each) — the printable / answer-key PDF on disk keeps its
ORIGINAL (usually English) slug-based filename (e.g. `addition-image-image-
printable.pdf`) while the deck's public slug + every page link use the LOCALIZED
slug (e.g. `addition-bild-bild-tiere-printable.pdf`). nginx aliases the URL to
`<dir>/<slug>-printable.pdf`, which doesn't exist -> 404.

BACKING-DIR-DRIVEN (v2): iterate only REAL directories (skip symlink aliases);
the canonical public slug = the directory basename with any trailing `-vN`
removed. Some decks have TWO symlink aliases (localized slug + legacy English
slug) pointing at the SAME `-vN` backing dir — iterating symlinks would
ping-pong the single PDF between the two names. Driving from backing dirs touches
each dir exactly once, so it is convergent + idempotent.

Fix per dir: if `<canon>-printable.pdf` / `<canon>-answer-key.pdf` is missing and
EXACTLY ONE `*-printable.pdf` / `*-answer-key.pdf` exists, rename it to the
canonical name. Ambiguous (>1) / absent (0) are logged + SKIPPED (never guessed).
Does NOT touch og-image/thumbnail (generically named) or non-PDF assets.

Safe: dry-run by default; idempotent; writes a full rename log to /root/.

Usage (on Hetzner):
  python3 fix-deck-pdf-filenames.py                 # dry-run, all locales
  python3 fix-deck-pdf-filenames.py --apply
  python3 fix-deck-pdf-filenames.py --locales=de,es,pt,fr,it --apply
"""
import os
import re
import sys
import time

DECKS_ROOT = "/var/www/lcs-media/decks"
ALL_LOCALES = ["en", "de", "es", "pt", "fr", "it", "nl", "sv", "da", "no", "fi"]
SUFFIXES = ["-printable.pdf", "-answer-key.pdf"]
VN_RE = re.compile(r"-v\d+$")


def main():
    apply = "--apply" in sys.argv
    locales = ALL_LOCALES
    for a in sys.argv[1:]:
        if a.startswith("--locales="):
            locales = [x for x in a.split("=", 1)[1].split(",") if x]

    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    logpath = "/root/pdf-rename-v2-log-%s.txt" % stamp
    logf = open(logpath, "w") if apply else None

    grand = {"renamed": 0, "already_ok": 0, "missing_source": 0, "ambiguous": 0}
    print("MODE: %s   locales: %s" % ("APPLY" if apply else "DRY-RUN", ",".join(locales)))

    for loc in locales:
        root = os.path.join(DECKS_ROOT, loc)
        if not os.path.isdir(root):
            continue
        c = {"renamed": 0, "already_ok": 0, "missing_source": 0, "ambiguous": 0}
        samples = []
        for name in sorted(os.listdir(root)):
            if name.startswith("."):
                continue
            entry = os.path.join(root, name)
            if os.path.islink(entry):          # skip symlink aliases — process backing dirs only
                continue
            if not os.path.isdir(entry):
                continue
            canon = VN_RE.sub("", name)         # canonical public slug
            try:
                files = os.listdir(entry)
            except OSError:
                continue
            for suf in SUFFIXES:
                expected = canon + suf
                if expected in files:
                    c["already_ok"] += 1
                    continue
                cands = [f for f in files if f.endswith(suf)]
                if len(cands) == 0:
                    c["missing_source"] += 1
                    continue
                if len(cands) > 1:
                    c["ambiguous"] += 1
                    if logf:
                        logf.write("AMBIGUOUS\t%s\t%s\t%s\n" % (loc, name, ",".join(cands)))
                    continue
                src = os.path.join(entry, cands[0])
                dst = os.path.join(entry, expected)
                if len(samples) < 3:
                    samples.append("%s/%s -> %s" % (name, cands[0], expected))
                if apply:
                    os.rename(src, dst)
                    logf.write("RENAME\t%s\t%s\t%s\t%s\n" % (loc, name, cands[0], expected))
                c["renamed"] += 1
        for k in grand:
            grand[k] += c[k]
        print("%-3s renamed=%-6d already_ok=%-6d missing_src=%-5d ambiguous=%-4d"
              % (loc, c["renamed"], c["already_ok"], c["missing_source"], c["ambiguous"]))
        for s in samples:
            print("      e.g. " + s)

    print("TOTAL renamed=%(renamed)d already_ok=%(already_ok)d missing_src=%(missing_source)d ambiguous=%(ambiguous)d" % grand)
    if logf:
        logf.close()
        print("log -> " + logpath)
    elif not apply:
        print("(dry-run — re-run with --apply)")


if __name__ == "__main__":
    main()
