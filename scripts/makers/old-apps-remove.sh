#!/bin/bash
# old-apps-remove.sh — remove the 33 old worksheet generator apps from the served tree (operator 2026-11-06:
# "you don't need to keep the 33 app files"). Run ON THE SERVER, after patch-nginx-old-apps.py, and after the PC has
# archived the same list with scripts/ops/archive-from-server.sh.
#
#   bash scripts/makers/old-apps-remove.sh --list      print the exact paths, one per line
#   bash scripts/makers/old-apps-remove.sh --confirm   remove them
#
# EXACT LIST, never a glob over the folder. js/ stays: every deck loads js/lcs-meter.js. The content managers, the admin
# pages, cvc-words, the blog pages and the translations stay. The files are chattr +i, so each is unlocked one at a time.
set -u
DIR=/var/www/lcs-media/worksheet-generators
APPS=(addition subtraction code-addition more-less math-puzzle math-worksheet alphabet-train prepositions word-guess
  word-scramble wordsearch cryptogram writing big-small pattern-train pattern-worksheet draw-and-color drawing-lines
  coloring chart-count matching grid-match shadow-match bingo picture-sort missing-pieces odd-one-out sudoku picture-path
  find-and-count find-objects crossword treasure-hunt)
[ "${#APPS[@]}" -eq 33 ] || { echo "expected 33 apps, have ${#APPS[@]}"; exit 1; }

list() {
  for app in "${APPS[@]}"; do
    spaced="${app//-/ }"
    for f in "$app.html" "$spaced.html"; do [ -e "$DIR/$f" ] && echo "$DIR/$f"; done
    # the backups beside them, and nothing else
    find "$DIR" -maxdepth 1 -type f \( -name "$app.html.backup*" -o -name "$spaced.html.backup*" \) 2>/dev/null
  done | sort -u
  [ -e "$DIR/sudoku-golden.html" ] && echo "$DIR/sudoku-golden.html"
}

case "${1:-}" in
  --list) list ;;
  --confirm)
    n=0
    while IFS= read -r p; do
      case "$p" in
        "$DIR"/js/*|"$DIR"/js) echo "REFUSED: $p"; exit 1 ;;
        "$DIR"/*.html|"$DIR"/*.html.backup*) ;;
        *) echo "REFUSED: $p"; exit 1 ;;
      esac
      chattr -i "$p" && rm -f "$p" && n=$((n + 1))
    done < <(list)
    echo "removed $n files"
    [ -f "$DIR/js/lcs-meter.js" ] || { echo "ERROR: js/lcs-meter.js is missing"; exit 1; }
    ;;
  *) echo "usage: $0 --list | --confirm"; exit 2 ;;
esac
