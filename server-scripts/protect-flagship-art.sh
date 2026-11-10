#!/bin/bash
# protect-flagship-art.sh — the flagship drawings get the image library's protection (operator 2026-11-08: "you should
# also protect all the new images in the same way you protect the image library images. No changes on the website or
# new deployments or anything else shouldn't effect them").
#
# The PC uploads a stage (scripts/ops/upload-flagship-art.sh) to /var/www/lcs-media/_staging/flagship-art:
#   drawn/<noun>.svg   the accepted master drawings (never in git: operator 2026-11-08 "images should never be pushed to git")
#   art-lock.json      their SHA-1 (docs/makers/art-lock.json)
#   renders.sha1       `sha1  makers-assets/themes-512/<theme>/<noun>@3x.webp` — the served renders of those drawings
#
# This script, run as root (idempotent; safe to re-run):
#   1. verifies every staged drawing against the staged lock — a partial or corrupted upload installs nothing
#   2. isolated storage: copies each drawing into /var/www/lcs-media/flagship-art/drawn when it is NOT there yet; one
#      already there must be byte-identical, else it refuses (a deliberate fix goes through update-flagship-art.sh)
#   3. owner lcs-media, files 444 / folders 755, chattr +i on every master
#   4. the served renders that match their fingerprint get chown lcs-media + chattr +i; their lines are recorded in
#      flagship-art/renders.protected.sha1, which deploy.sh checks before and after every deploy. A render that is not
#      installed yet (the maker release has not reached the server) is reported and protected on the next run; a render
#      that DIFFERS is reported loudly and left alone (install the right one with update-flagship-art.sh)
#   5. keeps the lock beside the masters (flagship-art/art-lock.json + masters.sha1, which deploy.sh checks before and
#      after every deploy with plain sha1sum -c) and removes the stage
#      (CLAUDE.md §A.14.12: the server hosts only what it serves or builds)
#
#   --renders-only  steps 4 only, against the renders recorded at the last upload (flagship-art/renders.wanted.sha1):
#                   deploy.sh runs it right after the maker release is installed, so a render that just arrived is
#                   locked in the same deploy
#
# Usage: protect-flagship-art.sh [--stage=DIR] [--dry-run] [--renders-only]
set -u
MEDIA="${FLAGSHIP_MEDIA:-/var/www/lcs-media}"   # FLAGSHIP_MEDIA: local tests only
STAGE=$MEDIA/_staging/flagship-art
DRY=0; RONLY=0
for a in "$@"; do case "$a" in --stage=*) STAGE="${a#--stage=}" ;; --dry-run) DRY=1 ;; --renders-only) RONLY=1 ;; esac; done
HOME_DIR=$MEDIA/flagship-art
DEST=$HOME_DIR/drawn
say() { echo "flagship-art: $*"; }
die() { echo "flagship-art: REFUSED — $*"; exit 1; }
imm() { lsattr -d "$1" 2>/dev/null | awk '{print $1}' | grep -q i; }
WANTED=$HOME_DIR/renders.wanted.sha1
PROT=$HOME_DIR/renders.protected.sha1

protect_renders() {
  [ -f "$WANTED" ] || { say "no renders recorded yet"; return 0; }
  touch "$PROT"
  local OK=0 MISSING=0 DIFF=0 h rel f got
  while read -r h rel; do
    [ -n "$rel" ] || continue
    f="$MEDIA/$rel"
    if [ ! -f "$f" ]; then MISSING=$((MISSING+1)); continue; fi
    got=$(sha1sum "$f" | cut -d' ' -f1)
    if [ "$got" != "$h" ]; then DIFF=$((DIFF+1)); say "WARNING: the served render differs from the accepted drawing: $rel"; continue; fi
    if ! imm "$f"; then chown lcs-media:lcs-media "$f"; chattr +i "$f"; fi
    grep -qxF "$h  $rel" "$PROT" || echo "$h  $rel" >> "$PROT"
    OK=$((OK+1))
  done < "$WANTED"
  chown lcs-media:lcs-media "$PROT"; chmod 644 "$PROT"
  say "renders: $OK protected, $MISSING not installed yet (the maker release brings them), $DIFF differ"
  [ $DIFF -eq 0 ]
}

if [ $RONLY = 1 ]; then protect_renders; exit $?; fi

[ -d "$STAGE/drawn" ] || die "no stage at $STAGE (upload it from the PC: scripts/ops/upload-flagship-art.sh)"
[ -f "$STAGE/art-lock.json" ] || die "the stage has no art-lock.json"
id lcs-media >/dev/null 2>&1 || die "the lcs-media user does not exist"

# 1. verify the stage: every locked drawing present and matching; nothing staged that the lock does not list
LOCKLIST=$(node -e 'const l=require(process.argv[1]);for(const [n,h] of Object.entries(l.files))console.log(h+"  "+n+".svg")' "$STAGE/art-lock.json") \
  || die "cannot read the staged lock"
WANT=$(printf '%s\n' "$LOCKLIST" | grep -c .)
( cd "$STAGE/drawn" && printf '%s\n' "$LOCKLIST" | sha1sum -c --quiet - ) || die "a staged drawing is missing or differs from the lock"
STRAY=$(cd "$STAGE/drawn" && ls -1 | grep -vxF -f <(printf '%s\n' "$LOCKLIST" | awk '{print $2}') || true)
[ -z "$STRAY" ] || die "staged drawings the lock does not list: $(echo "$STRAY" | head -3 | tr '\n' ' ')"
say "stage verified: $WANT drawings"

# 2. existing masters must be identical; new ones are copied
NEW=0; SAME=0
[ $DRY = 1 ] || mkdir -p "$DEST"
while read -r h f; do
  [ -n "$f" ] || continue
  if [ -f "$DEST/$f" ]; then
    got=$(sha1sum "$DEST/$f" | cut -d' ' -f1)
    [ "$got" = "$h" ] || die "$f is already installed and differs (a deliberate fix: update-flagship-art.sh)"
    SAME=$((SAME+1))
  else
    [ $DRY = 1 ] || cp "$STAGE/drawn/$f" "$DEST/$f"
    NEW=$((NEW+1))
  fi
done <<< "$LOCKLIST"
say "masters: $NEW new, $SAME already installed (identical)"
[ $DRY = 1 ] && { say "dry run: nothing written"; exit 0; }

# 3. ownership, modes, immutability (masters)
chown lcs-media:lcs-media "$HOME_DIR" "$DEST"
chmod 755 "$HOME_DIR" "$DEST"
for f in "$DEST"/*.svg; do
  imm "$f" && continue
  chown lcs-media:lcs-media "$f"; chmod 444 "$f"; chattr +i "$f"
done
cp "$STAGE/art-lock.json" "$HOME_DIR/art-lock.json.tmp" && mv "$HOME_DIR/art-lock.json.tmp" "$HOME_DIR/art-lock.json"
printf '%s\n' "$LOCKLIST" > "$HOME_DIR/masters.sha1"
chown lcs-media:lcs-media "$HOME_DIR/art-lock.json" "$HOME_DIR/masters.sha1"; chmod 644 "$HOME_DIR/art-lock.json" "$HOME_DIR/masters.sha1"
IMM=$(lsattr "$DEST"/*.svg 2>/dev/null | awk '$1 ~ /i/' | wc -l)
say "masters immutable: $IMM of $(ls -1 "$DEST"/*.svg 2>/dev/null | wc -l)"

# 4. the served renders
if [ -f "$STAGE/renders.sha1" ]; then cp "$STAGE/renders.sha1" "$WANTED"; chown lcs-media:lcs-media "$WANTED"; chmod 644 "$WANTED"; fi
protect_renders; RC=$?

# 5. the stage goes
rm -rf "$STAGE"
say "done: $(ls -1 "$DEST"/*.svg 2>/dev/null | wc -l) masters in $DEST, $(grep -c . "$PROT" 2>/dev/null || echo 0) renders recorded in $PROT"
[ $RC -eq 0 ] || exit 2
