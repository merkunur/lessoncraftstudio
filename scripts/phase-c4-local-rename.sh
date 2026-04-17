#!/bin/bash
# Phase C.4 — local file rename: duplicate space-named → hyphen-named
# in both frontend/public/worksheet-generators/ and REFERENCE APPS/.
# Uses `git mv` so renames are tracked by git.
#
# Run from repo root.

set -e

RENAMES=(
  "alphabet train.html::alphabet-train.html"
  "big small.html::big-small.html"
  "chart count.html::chart-count.html"
  "code addition.html::code-addition.html"
  "cvc words.html::cvc-words.html"
  "draw and color.html::draw-and-color.html"
  "drawing lines.html::drawing-lines.html"
  "find and count.html::find-and-count.html"
  "find objects.html::find-objects.html"
  "grid match.html::grid-match.html"
  "math puzzle.html::math-puzzle.html"
  "math worksheet.html::math-worksheet.html"
  "missing pieces.html::missing-pieces.html"
  "more less.html::more-less.html"
  "odd one out.html::odd-one-out.html"
  "pattern train.html::pattern-train.html"
  "pattern worksheet.html::pattern-worksheet.html"
  "picture path.html::picture-path.html"
  "picture sort.html::picture-sort.html"
  "shadow match.html::shadow-match.html"
  "treasure hunt.html::treasure-hunt.html"
  "word guess.html::word-guess.html"
  "word scramble.html::word-scramble.html"
)

DIRS=(
  "frontend/public/worksheet-generators"
  "REFERENCE APPS"
)

for DIR in "${DIRS[@]}"; do
  echo "=== $DIR ==="
  for pair in "${RENAMES[@]}"; do
    OLD="${pair%%::*}"
    NEW="${pair##*::}"
    OLDPATH="$DIR/$OLD"
    NEWPATH="$DIR/$NEW"
    if [ -f "$OLDPATH" ]; then
      if [ -f "$NEWPATH" ]; then
        echo "  SKIP exists: $NEW"
        continue
      fi
      # Use git mv so the rename is tracked
      git mv "$OLDPATH" "$NEWPATH" 2>/dev/null || mv "$OLDPATH" "$NEWPATH"
      echo "  OK: $OLD -> $NEW"
    else
      echo "  SKIP missing: $OLD"
    fi
  done
done
