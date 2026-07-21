#!/usr/bin/env python3
"""
Add `X-Robots-Tag: noindex` to ONLY the answer-key PDF nginx location blocks — never the
printable PDFs, the deck.html dir, or the PNG/asset catch-all.

WHY. Each worksheet exposes 4 separately-indexable URLs (deck.html, /worksheets/ landing,
printable.pdf, answer-key.pdf). Google spends ~48% of a collapsed crawl budget on the PDFs and
barely crawls the HTML landings (measured: 387 PDF fetches vs 59 landing vs 0 deck.html /10d), so
the PDF is the surface it indexes — it "replaces" the deck in results. The answer-key PDF is a
REDUNDANT competing surface that earns ≈0 clicks (nobody searches for an answer key), so noindexing
it removes one PDF competitor per worksheet and frees crawl for the landings — WITHOUT touching the
printable PDF, which earns the site's "printable … pdf" clicks (noindexing ALL PDFs crashed clicks
in May 2026, §17.8.20 — this is the surgical, safe subset).

`noindex` only (not `nofollow`, and NOT robots.txt Disallow — Disallow would block the crawl so
Google never sees the noindex and the bare URL stays indexed).

Idempotent: re-run safely after any nginx rebuild (a block already carrying the header is skipped).
Matches the existing patch-nginx-*.py convention. Backs up the config OUTSIDE sites-enabled/, runs
`nginx -t`, and reloads only if the test passes (else restores the backup).

Usage:  sudo python3 patch-nginx-answerkey-noindex.py [--dry-run]
"""
import os
import re
import sys
import shutil
import subprocess
from datetime import datetime

CFG = os.path.realpath("/etc/nginx/sites-enabled/lessoncraftstudio")
HEADER_LINE = '        add_header X-Robots-Tag "noindex";\n'
# Matches ONLY the two answer-key location lines (printable/deck/png blocks never contain "answer-key").
ANSWERKEY_LOCATION = re.compile(r"location\s+~.*answer-key")


def patch(lines):
    """Return (new_lines, changed_count, already_count). Inserts the header after the block's
    Cache-Control line in each answer-key location block that lacks it. Brace-depth aware so nested
    `if (...) { }` blocks don't confuse block boundaries."""
    out = []
    i = 0
    n = len(lines)
    changed = 0
    already = 0
    while i < n:
        line = lines[i]
        out.append(line)
        if ANSWERKEY_LOCATION.search(line):
            depth = line.count("{") - line.count("}")
            block = []
            j = i + 1
            has_xrobots = False
            cache_idx = None
            while j < n and depth > 0:
                block.append(lines[j])
                if "X-Robots-Tag" in lines[j]:
                    has_xrobots = True
                if "Cache-Control" in lines[j] and cache_idx is None:
                    cache_idx = len(block) - 1
                depth += lines[j].count("{") - lines[j].count("}")
                j += 1
            if has_xrobots:
                already += 1
            elif cache_idx is not None:
                block.insert(cache_idx + 1, HEADER_LINE)
                changed += 1
            else:
                # No Cache-Control to anchor on — refuse rather than guess placement.
                sys.stderr.write("WARN: answer-key block had no Cache-Control anchor; skipped.\n")
            out.extend(block)
            i = j
            continue
        i += 1
    return out, changed, already


def main():
    dry = "--dry-run" in sys.argv[1:]
    with open(CFG) as f:
        lines = f.readlines()

    new_lines, changed, already = patch(lines)
    print(f"answer-key blocks: {changed} to patch, {already} already have noindex.")

    if changed == 0:
        print("Nothing to do.")
        return

    if dry:
        print("--dry-run: not writing. Preview of inserted lines:")
        for a, b in zip(lines, new_lines):
            pass
        print(f"  would insert '{HEADER_LINE.strip()}' into {changed} block(s).")
        return

    bk = f"/root/lcs-nginx-backup-answerkey-{datetime.now():%Y%m%d-%H%M%S}.conf"
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
    print(f"Patched {changed} answer-key block(s) + reloaded nginx.")


if __name__ == "__main__":
    main()
