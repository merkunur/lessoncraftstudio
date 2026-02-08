#!/bin/bash
html=$(curl -s "http://localhost:3000/en/apps/addition-worksheets")

echo "=== ADDITION-WORKSHEETS HIDDEN HEADINGS ==="

echo "$html" | python3 -c "
import sys, re

html = sys.stdin.read()
segs = re.split(r'(style=\"[^\"]*opacity:\s*0(?![.0-9])[^\"]*\")', html)
count = 0
headings = []

for i in range(1, len(segs), 2):
    after = segs[i+1][:5000] if i+1 < len(segs) else ''
    for h_match in re.finditer(r'<(h[1-6])[^>]*>(.*?)</\1>', after, re.DOTALL):
        h_tag = h_match.group(1)
        h_text = re.sub(r'<[^>]+>', '', h_match.group(2)).strip()[:120]
        headings.append(f'{h_tag}: \"{h_text}\"')
        count += 1

print(f'Hidden headings: {count}')
for h in headings:
    print(f'  {h}')
" 2>/dev/null

echo ""
echo "--- All opacity:0 style attrs ---"
echo "$html" | grep -oP 'style="[^"]*opacity:\s*0[^.0-9][^"]*"' | head -15
