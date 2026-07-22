#!/usr/bin/env python3
"""
CANARY printable-PDF noindex — X-Robots-Tag: noindex on a BOUNDED slice of printable PDFs only.

WHY (2026-07-22). Operator wants /worksheets to be THE surface Google shows; the printable PDF is the
last competing indexable URL per worksheet. But noindexing ALL printable PDFs crashed clicks 80->15/day
(§17.8.20) because PDFs own "printable … pdf" intent. So we canary a SMALL click-earning slice, watch the
kill-switch, and expand ONLY if it holds. `noindex` + `rel=canonical` cancel (noindex wins, signal
destroyed) — so this is noindex-only, never combined.

MECHANISM (the proven $mt_robots pattern on this config): an http-context `map` sets $pdf_canary_robots
= "noindex" for the slice, "" otherwise; the printable-PDF serve block emits `add_header X-Robots-Tag
$pdf_canary_robots always;`. Empty value → nginx omits the header (non-canary PDFs stay indexable). To
EXPAND: widen SLICE_RE. To REVERT: set SLICE_RE to match nothing (or run --revert) + reload.

The slice (edit SLICE_RE to change): EN addition + subtraction printable PDFs (slugs are native-language,
# so a type-prefix slice is per-locale; EN is the bounded, click-earning canary).

Idempotent, brace-aware, backs up OUTSIDE sites-enabled/, `nginx -t`, reload only on pass.
Usage:  sudo python3 patch-nginx-pdf-noindex-canary.py [--dry-run] [--revert]
"""
import os
import re
import sys
import shutil
import subprocess
from datetime import datetime

CFG = os.path.realpath("/etc/nginx/sites-enabled/lessoncraftstudio")

# The canary slice. Path = /<loc>/decks/<slug-dir>/<slug>-printable.pdf ; the type prefixes the dir.
SLICE_RE = r'"~*^/en/decks/(addition|subtraction)-[^/]+/[^/]+-printable\.pdf$"'
MAP_BLOCK = (
    "map $uri $pdf_canary_robots {\n"
    "    default \"\";\n"
    f"    {SLICE_RE} \"noindex\";\n"
    "}\n\n"
)
MAP_MARKER = "$pdf_canary_robots"
ADD_HEADER = '        add_header X-Robots-Tag $pdf_canary_robots always;\n'
# The printable serve block: a location whose body serves *-printable.pdf with the 30d cache.
PRINTABLE_MARKER = "-printable.pdf"
CACHE_30D = "max-age=2592000"
LOCATION = re.compile(r"^\s*location\b")


def find_deck_redirect_map_end(lines):
    """Return the index just after the `map $uri $deck_redirect { ... }` block's closing brace."""
    for i, ln in enumerate(lines):
        if re.search(r"map\s+\$uri\s+\$deck_redirect\s*\{", ln):
            depth = ln.count("{") - ln.count("}")
            j = i + 1
            while j < len(lines) and depth > 0:
                depth += lines[j].count("{") - lines[j].count("}")
                j += 1
            return j
    return None


def patch(lines):
    changed_map = False
    changed_hdr = 0
    already_hdr = 0
    # 1) insert the map (http context) after the deck_redirect map, unless already present.
    if not any(MAP_MARKER in ln and ln.lstrip().startswith("map ") for ln in lines):
        pos = find_deck_redirect_map_end(lines)
        if pos is None:
            sys.stderr.write("ERROR: could not locate $deck_redirect map to anchor the canary map.\n")
            sys.exit(1)
        lines = lines[:pos] + ["\n"] + [MAP_BLOCK] + lines[pos:]
        changed_map = True
    # 2) insert add_header into the printable serve block(s).
    out = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        if LOCATION.search(line):
            depth = line.count("{") - line.count("}")
            block = []
            j = i + 1
            is_printable = PRINTABLE_MARKER in line
            has_30d = False
            has_hdr = False
            cache_idx = None
            while j < n and depth > 0:
                block.append(lines[j])
                if PRINTABLE_MARKER in lines[j]:
                    is_printable = True
                if CACHE_30D in lines[j]:
                    has_30d = True
                    if cache_idx is None:
                        cache_idx = len(block) - 1
                if MAP_MARKER in lines[j]:
                    has_hdr = True
                depth += lines[j].count("{") - lines[j].count("}")
                j += 1
            out.append(line)
            if is_printable and has_30d and "answer-key" not in line:
                if has_hdr:
                    already_hdr += 1
                elif cache_idx is not None:
                    block.insert(cache_idx + 1, ADD_HEADER)
                    changed_hdr += 1
            out.extend(block)
            i = j
            continue
        out.append(line)
        i += 1
    return out, changed_map, changed_hdr, already_hdr


def revert(lines):
    """Remove the whole `map $uri $pdf_canary_robots { ... }` block AND every add_header line that
    references the marker — leaving the config exactly as before the canary."""
    res = []
    skip = 0
    for ln in lines:
        if skip > 0:
            skip += ln.count("{") - ln.count("}")
            continue
        if re.search(r"map\s+\$uri\s+\$pdf_canary_robots\s*\{", ln):
            skip = ln.count("{") - ln.count("}")
            continue
        if MAP_MARKER in ln:  # the add_header lines (map block already handled above)
            continue
        res.append(ln)
    return res


def write_and_reload(new_lines, tag):
    bk = f"/root/lcs-nginx-backup-{tag}-{datetime.now():%Y%m%d-%H%M%S}.conf"
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


def main():
    dry = "--dry-run" in sys.argv[1:]
    with open(CFG) as f:
        lines = f.readlines()

    if "--revert" in sys.argv[1:]:
        new_lines = revert(lines)
        print(f"revert: removing canary map + {sum(1 for l in lines if MAP_MARKER in l)} reference(s).")
        if dry:
            print("--dry-run: not writing.")
            return
        write_and_reload(new_lines, "pdfcanary-revert")
        print("Canary reverted + nginx reloaded.")
        return

    new_lines, changed_map, changed_hdr, already_hdr = patch(lines)
    print(f"canary map inserted: {changed_map} | printable blocks patched: {changed_hdr} | already: {already_hdr}")
    print(f"slice: {SLICE_RE}")
    if not changed_map and changed_hdr == 0:
        print("Nothing to do.")
        return
    if dry:
        print("--dry-run: not writing.")
        return
    write_and_reload(new_lines, "pdfcanary")
    print(f"Canary applied ({changed_hdr} block(s)) + nginx reloaded.")


if __name__ == "__main__":
    main()
