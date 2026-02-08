#!/bin/bash
for page in math-worksheets coloring-worksheets word-search-worksheets sudoku-worksheets addition-worksheets crossword-worksheets; do
  html=$(curl -s "http://localhost:3000/en/apps/${page}")
  direct=$(echo "$html" | grep -oP '<h[1-6][^>]*style="[^"]*opacity:\s*0[^"]*"' | wc -l)
  total_op=$(echo "$html" | grep -oP 'style="[^"]*opacity:\s*0[^.0-9][^"]*"' | wc -l)
  echo "${page}: ${direct} hidden headings, ${total_op} opacity:0 attrs"
done
