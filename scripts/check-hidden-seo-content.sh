#!/bin/bash
# Check if any SEO-important content (headings, article text, descriptions) is hidden

echo "=== HIDDEN SEO CONTENT CHECK ==="
echo ""

# Product page
echo "--- Product page: headings in opacity:0 containers ---"
path="/en/apps/word-search-worksheets"
html=$(curl -s "http://localhost:3000${path}")

echo "$html" | python3 -c "
import sys, re

html = sys.stdin.read()

# Strategy: find all elements with opacity:0 in style, then check what content they contain
# Split by 'opacity:0' or 'opacity: 0' (exact zero, not 0.something)
# Use regex to find tags with style containing opacity:0
segments = re.split(r'(style=\"[^\"]*opacity:\s*0(?![.0-9])[^\"]*\")', html)

hidden_headings = []
hidden_paragraphs = []

for i in range(1, len(segments), 2):
    # This is an opacity:0 style attribute
    # Get the context: look backward for the opening tag and forward for content
    before = segments[i-1]
    after = segments[i+1] if i+1 < len(segments) else ''

    # Find what tag this belongs to
    tag_match = re.search(r'<([a-z]+)(?:\s[^>]*)?\s*$', before)
    if not tag_match:
        continue
    tag = tag_match.group(1)

    # Look at content within this element (simplified: take first 3000 chars)
    content = after[:3000]

    # Find headings
    for h_match in re.finditer(r'<(h[1-6])[^>]*>(.*?)</\1>', content, re.DOTALL):
        h_tag = h_match.group(1)
        h_text = re.sub(r'<[^>]+>', '', h_match.group(2)).strip()[:100]
        hidden_headings.append(f'{h_tag}: \"{h_text}\"')

    # Find first paragraph
    p_match = re.search(r'<p[^>]*>(.*?)</p>', content, re.DOTALL)
    if p_match:
        p_text = re.sub(r'<[^>]+>', '', p_match.group(1)).strip()[:80]
        if len(p_text) > 20:
            hidden_paragraphs.append(f'\"{p_text}\"')

print(f'Hidden headings: {len(hidden_headings)}')
for h in hidden_headings:
    print(f'  {h}')
print(f'Hidden paragraphs: {len(hidden_paragraphs)}')
for p in hidden_paragraphs[:5]:
    print(f'  {p}')
" 2>/dev/null

echo ""

# Homepage
echo "--- Homepage: headings in opacity:0 containers ---"
html=$(curl -s "http://localhost:3000/en")
echo "$html" | python3 -c "
import sys, re

html = sys.stdin.read()
segments = re.split(r'(style=\"[^\"]*opacity:\s*0(?![.0-9])[^\"]*\")', html)
hidden_headings = []

for i in range(1, len(segments), 2):
    before = segments[i-1]
    after = segments[i+1] if i+1 < len(segments) else ''
    content = after[:3000]

    for h_match in re.finditer(r'<(h[1-6])[^>]*>(.*?)</\1>', content, re.DOTALL):
        h_tag = h_match.group(1)
        h_text = re.sub(r'<[^>]+>', '', h_match.group(2)).strip()[:100]
        hidden_headings.append(f'{h_tag}: \"{h_text}\"')

print(f'Hidden headings: {len(hidden_headings)}')
for h in hidden_headings:
    print(f'  {h}')
" 2>/dev/null

echo ""

# Blog post
echo "--- Blog post: headings in opacity:0 containers ---"
path=$(curl -s "http://localhost:3000/en/blog" | grep -oP 'href="/en/blog/[a-z][a-z0-9-]+' | sed 's/href="//' | sort -u | head -1)
html=$(curl -s "http://localhost:3000${path}")
echo "$html" | python3 -c "
import sys, re

html = sys.stdin.read()
segments = re.split(r'(style=\"[^\"]*opacity:\s*0(?![.0-9])[^\"]*\")', html)
hidden_headings = []

for i in range(1, len(segments), 2):
    before = segments[i-1]
    after = segments[i+1] if i+1 < len(segments) else ''
    content = after[:3000]

    for h_match in re.finditer(r'<(h[1-6])[^>]*>(.*?)</\1>', content, re.DOTALL):
        h_tag = h_match.group(1)
        h_text = re.sub(r'<[^>]+>', '', h_match.group(2)).strip()[:100]
        hidden_headings.append(f'{h_tag}: \"{h_text}\"')

print(f'Hidden headings: {len(hidden_headings)}')
for h in hidden_headings:
    print(f'  {h}')
" 2>/dev/null
