#!/bin/bash
cd /opt/lessoncraftstudio/frontend/public/samples

for lang in german french spanish italian portuguese dutch swedish danish norwegian finnish; do
  echo "=== $lang ==="
  for app in addition "alphabet train" "big small" bingo "chart count" "code addition" coloring crossword cryptogram "draw and color" "drawing lines" "find and count" "find objects" "grid match" matching "math puzzle" "math worksheet" "missing pieces" "more less" "odd one out" "pattern train" "pattern worksheet" "picture path" "picture sort" prepositions "shadow match" subtraction sudoku "treasure hunt" "word guess" "word scramble" wordsearch writing; do
    if [ -d "$lang/$app" ]; then
      sample=$(ls "$lang/$app/" 2>/dev/null | grep -E '\.(jpeg|jpg|png)$' | grep -v '_thumb' | grep -v '_preview' | grep -vi 'answer' | shuf -n 1)
      if [ -n "$sample" ]; then
        echo "$app|$sample"
      fi
    fi
  done
done
