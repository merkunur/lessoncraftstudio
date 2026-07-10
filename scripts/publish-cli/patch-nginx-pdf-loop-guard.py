#!/usr/bin/env python3
"""Patch nginx: (1) dead-deck 404 guard in the make-whole PDF 301 blocks, (2) slash-less
deck-page 301. Idempotent; run ON Hetzner (or pipe via `ssh root@host "python3 -" < this`).

Forensic-audit 2026-07-10 defects fixed (docs/audit-results/seo-forensic-audit-2026-07-10.md §4.2/§4.4):
  A. The make-whole PDF 301 blocks (SEO-recovery 2026-06-25) guard `!-f $requested` but never
     check the CANONICAL target exists. On a dead/re-slugged deck dir, a request for the
     canonical-named PDF 301s to ITSELF forever (edge-cached 5 min). Fix: if the canonical
     <slug>-printable.pdf is absent (dead deck), return 404 before the drift-301.
  B. Slash-less deck-page URLs (/en/decks/<slug>) hard-404 while the rest of the site
     redirects slash variants. Fix: 301 to the trailing-slash form ($deck_redirect map wins
     first so old-slug slash-less URLs jump straight to the native slug).

Markers: LCS-PDF-LOOP-GUARD / LCS-DECK-SLASHLESS. Re-run safe (no-ops when markers present).
Writes a timestamped backup to /root/nginx-backup-<utc>.conf, runs `nginx -t`, reloads.
"""
import shutil
import subprocess
import sys
import time

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
GUARD = "LCS-PDF-LOOP-GUARD"
SLASHLESS = "LCS-DECK-SLASHLESS"
LOCALES = "en|de|fr|es|pt|it|nl|sv|da|no|fi"

with open(CONF, "r", encoding="utf-8") as f:
    conf = f.read()

orig = conf
changed = []

# --- A. dead-deck 404 guard, both make-whole blocks -------------------------------
for kind in ("printable", "answer-key"):
    marker = f"{GUARD}-{kind}"
    if marker in conf:
        print(f"[skip] {marker} already present")
        continue
    loc_line = (
        f"    location ~ ^/({LOCALES})/decks/([^/]+)/(.+-{kind}\\.pdf)$ {{"
    )
    idx = conf.find(loc_line)
    if idx == -1:
        sys.exit(f"FATAL: make-whole {kind} location block not found — config drifted, aborting")
    # insert after the $deck_redirect line inside this block (legacy-alias 301 keeps priority)
    block_start = idx + len(loc_line)
    redirect_line_end = conf.find("\n", conf.find("$deck_redirect", block_start))
    if redirect_line_end == -1 or conf.find("$deck_redirect", block_start) > conf.find("}", block_start):
        sys.exit(f"FATAL: $deck_redirect line not found inside the {kind} block, aborting")
    guard = (
        f"\n        # {marker} (2026-07-10): dead/re-slugged deck dir -> clean 404, never a self-301 loop"
        f"\n        if (!-f /var/www/lcs-media/decks/$1/$2/$2-{kind}.pdf) {{ return 404; }}"
    )
    conf = conf[:redirect_line_end] + guard + conf[redirect_line_end:]
    changed.append(marker)

# --- B. slash-less deck-page 301 ---------------------------------------------------
if SLASHLESS in conf:
    print(f"[skip] {SLASHLESS} already present")
else:
    anchor = "    # make-whole PDF 301 (SEO-recovery 2026-06-25)"
    idx = conf.find(anchor)
    if idx == -1:
        sys.exit("FATAL: make-whole comment anchor not found, aborting")
    block = (
        f"    # {SLASHLESS} (2026-07-10): slash-stripped deck-page URLs 301 to the canonical\n"
        f"    # trailing-slash form (audit 4.4 — they hard-404'd). $deck_redirect first so old\n"
        f"    # slash-less slugs can still resolve via the native-slug map on the next hop.\n"
        f"    location ~ ^/({LOCALES})/decks/([^/.]+)$ {{\n"
        f"        if ($deck_redirect) {{ return 301 $deck_redirect; }}\n"
        f"        return 301 /$1/decks/$2/;\n"
        f"    }}\n\n"
    )
    conf = conf[:idx] + block + conf[idx:]
    changed.append(SLASHLESS)

if conf == orig:
    print("Nothing to do — all markers present.")
    sys.exit(0)

backup = f"/root/nginx-backup-{time.strftime('%Y%m%dT%H%M%SZ', time.gmtime())}.conf"
shutil.copy2(CONF, backup)
with open(CONF, "w", encoding="utf-8") as f:
    f.write(conf)
print(f"Patched: {', '.join(changed)}; backup at {backup}")

if subprocess.run(["nginx", "-t"]).returncode != 0:
    shutil.copy2(backup, CONF)
    sys.exit("nginx -t FAILED — config restored from backup, NOT reloaded")
subprocess.run(["systemctl", "reload", "nginx"], check=True)
print("nginx reloaded OK")
