#!/usr/bin/env bash
#
# backup-images.sh — every image of the site backed up on the PC (operator 2026-11-08: "all the images should also backed
# up locally on this computer"). Runs on the PC (Git Bash); pull-deck-backup.sh calls it every week after the deck pull.
#
#   1. the flagship drawings (scripts/worksheet-gen/art-src/drawn/*.svg — every drawing, locked or not) and their lock
#      (docs/makers/art-lock.json) → $BACKUP/flagship-art/drawn. A drawing that changed keeps its earlier version in
#      $BACKUP/flagship-art/versions/<noun>.<stamp>.svg. Needs no server.
#      This is the ONE PC copy of the flagship drawings (operator 2026-11-10); art-guard.js --lock writes to it too.
#   2. the server's image folders, pulled incrementally (only files the PC lacks, or whose size changed):
#      image-library, image-library-webp, design-elements, samples, makers-assets/themes-512
#      → $BACKUP/server/<folder>. Absent folders are skipped. The server's flagship-art is NOT pulled: it holds the same
#      435 drawings as step 1 (deploy.sh checks it against the committed lock by SHA-1), so a pull would be a second copy.
#   Names are compared ignoring case: the server has link aliases (image-library/Beach -> beach) that Windows stores as
#   one folder, so the PC holds fewer files than the server lists; those are byte-identical and counted as present.
#   After each folder the script checks that every server file is here at its size; a shortfall is reported and the
#   script exits 1.
#   Nothing is ever deleted from the backup: a picture removed on the server stays here.
#
# Usage: backup-images.sh [--local-only] [--dry-run]   env: LCS_BACKUP_DIR (default /c/Users/rkgen/lcs-backups)
#
set -u
LOCAL_ONLY=0; DRY=0
for a in "$@"; do case "$a" in --local-only) LOCAL_ONLY=1 ;; --dry-run) DRY=1 ;; esac; done
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
BACKUP="${LCS_BACKUP_DIR:-/c/Users/rkgen/lcs-backups}/images"
HOST="root@65.108.5.250"
KEY="$HOME/.ssh/id_ed25519"
SSH="ssh -o BatchMode=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=10 -i $KEY $HOST"
STAMP=$(date -u +%Y%m%d_%H%M%S)
mkdir -p "$BACKUP"
LOG="$BACKUP/images.log"
exec > >(tee -a "$LOG") 2>&1
say() { printf '[%s] %s\n' "$(date -u '+%Y-%m-%d %H:%M:%S')" "$*"; }

say "=== image backup start (local-only=$LOCAL_ONLY dry-run=$DRY) → $BACKUP"

# 1. the flagship drawings, straight from the PC
SRC="$REPO/scripts/worksheet-gen/art-src/drawn"
DST="$BACKUP/flagship-art/drawn"; VER="$BACKUP/flagship-art/versions"
mkdir -p "$DST" "$VER"
new=0; changed=0; same=0
for f in "$SRC"/*.svg; do
  [ -f "$f" ] || continue
  b=$(basename "$f"); t="$DST/$b"
  if [ ! -f "$t" ]; then
    [ $DRY = 1 ] || { cp "$f" "$t"; chmod 444 "$t"; }; new=$((new+1))
  elif ! cmp -s "$f" "$t"; then
    [ $DRY = 1 ] || { chmod 644 "$t"; mv "$t" "$VER/${b%.svg}.$STAMP.svg"; chmod 444 "$VER/${b%.svg}.$STAMP.svg"; cp "$f" "$t"; chmod 444 "$t"; }
    changed=$((changed+1))
  else same=$((same+1)); fi
done
[ $DRY = 1 ] || cp "$REPO/docs/makers/art-lock.json" "$BACKUP/flagship-art/art-lock.json" 2>/dev/null
say "flagship drawings: $new new, $changed changed (earlier version kept), $same unchanged → $DST ($(ls "$DST" | wc -l) files)"

[ $LOCAL_ONLY = 1 ] && { say "=== done (local only)"; exit 0; }

# 2. the server's image folders, incrementally
if ! $SSH 'true' 2>/dev/null; then say "server unreachable: the server folders were not pulled this time"; exit 1; fi
FAIL=0
# the server paths (tab size) the PC lacks or holds at another size; names compared ignoring case (Windows)
lacking() { awk -F'\t' 'NR==FNR { have[tolower($1)]=$2; next } $1 != "" && have[tolower($1)] != $2 { print $1 }' <(printf '%s\n' "$1") <(printf '%s\n' "$2"); }
for d in image-library image-library-webp design-elements samples makers-assets/themes-512; do
  if ! $SSH "test -e '/var/www/lcs-media/$d'"; then say "$d: not on the server, skipped"; continue; fi
  out="$BACKUP/server/$d"; mkdir -p "$out"
  listing=$($SSH "cd '/var/www/lcs-media/$d' && find -L . -type f -printf '%P\t%s\n'" 2>/dev/null)
  [ -n "$listing" ] || { say "$d: could not list it on the server, skipped"; FAIL=1; continue; }
  # one entry per case-insensitive name (what this disk can hold); twins of DIFFERENT size cannot both be kept here
  remote=$(printf '%s\n' "$listing" | awk -F'\t' '$1 != "" && !seen[tolower($1)]++')
  twins=$(printf '%s\n' "$listing" | awk -F'\t' '$1 != "" { k=tolower($1); if (k in s && s[k] != $2) n++; s[k]=$2 } END { print n+0 }')
  [ "$twins" -eq 0 ] || { say "$d: WARNING $twins server files differ from a twin whose name differs only in case; only one of each fits on this disk"; FAIL=1; }
  total=$(printf '%s\n' "$remote" | grep -c . || true)
  need=$(lacking "$(cd "$out" && find . -type f -printf '%P\t%s\n')" "$remote")
  want=$(printf '%s\n' "$need" | grep -c . || true)
  if [ "$want" -eq 0 ]; then say "$d: all $total files already here"; continue; fi
  say "$d: $want of $total files to fetch"
  if [ $DRY = 1 ]; then continue; fi
  # a file whose size changed keeps its earlier copy beside it
  printf '%s\n' "$need" | while read -r p; do [ -f "$out/$p" ] && mv "$out/$p" "$out/$p.$STAMP"; done
  printf '%s\n' "$need" | $SSH "cd '/var/www/lcs-media/$d' && tar -chf - -T -" | tar -xf - -C "$out" || say "$d: the pull reported an error"
  short=$(lacking "$(cd "$out" && find . -type f -printf '%P\t%s\n')" "$remote" | grep -c . || true)
  if [ "$short" -eq 0 ]; then say "$d: complete, all $total files here"; else say "$d: INCOMPLETE, $short of $total files missing or of another size"; FAIL=1; fi
done
[ $FAIL = 0 ] && say "=== done" || say "=== done WITH PROBLEMS (see above)"
exit $FAIL
