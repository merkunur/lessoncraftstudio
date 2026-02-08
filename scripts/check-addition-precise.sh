#!/bin/bash
# Precise check: only count headings where the heading ITSELF or its direct parent has opacity:0

html=$(curl -s "http://localhost:3000/en/apps/addition-worksheets")

echo "=== PRECISE HIDDEN HEADING CHECK ==="

echo "$html" | python3 -c "
import sys, re

html = sys.stdin.read()

# Method 1: Find tags that DIRECTLY have opacity:0 in their style
# and check if they are heading tags
direct_headings = re.findall(r'<(h[1-6])[^>]*style=\"[^\"]*opacity:\s*0[^\"]*\"[^>]*>(.*?)</\1>', html, re.DOTALL)
print(f'Headings with direct opacity:0: {len(direct_headings)}')
for tag, text in direct_headings:
    clean = re.sub(r'<[^>]+>', '', text).strip()[:100]
    print(f'  <{tag}>: \"{clean}\"')

# Method 2: Check if any element with opacity:0 CONTAINS a heading as child
# Find all elements with opacity:0 and check depth
# Look for pattern: <tag style='...opacity:0...'> ... <h2|h3> ... </h2|h3> ... </tag>
# This is imprecise in regex but we can check if the heading is before the closing of the opacity:0 element

# Actually, let's check the specific components we fixed
# HowToGuide H3s - these should NOT have opacity:0 anymore
howto_hidden = 0
# Look for motion.div with opacity:0 containing h3
parts = html.split('opacity:0')
for i, part in enumerate(parts[:-1]):
    after = parts[i+1][:500]  # Only check 500 chars (same element scope)
    # Count closing tags vs heading tags to determine if heading is a child
    # Simple approach: if we see <h before we see the matching close tag
    close_count = 0
    h_found = False
    for j, c in enumerate(after):
        if after[j:j+2] == '<h' and after[j+2:j+3] in '123456':
            # Found a heading tag
            if close_count == 0:  # Still in the same element
                h_tag = re.search(r'<(h[1-6])[^>]*>(.*?)</\1>', after[j:j+500], re.DOTALL)
                if h_tag:
                    howto_hidden += 1
                    clean = re.sub(r'<[^>]+>', '', h_tag.group(2)).strip()[:80]
                    if howto_hidden <= 5:
                        print(f'  opacity:0 child heading: <{h_tag.group(1)}> \"{clean}\"')
            break
        if after[j:j+2] == '</':
            close_count += 1
            if close_count > 3:  # We've left the opacity:0 element's scope
                break

print(f'')
print(f'Total headings inside opacity:0 containers: {howto_hidden}')
" 2>/dev/null

echo ""
echo "--- Compare with word-search-worksheets ---"
html2=$(curl -s "http://localhost:3000/en/apps/word-search-worksheets")
op0_count1=$(echo "$html" | grep -oP 'style="[^"]*opacity:\s*0[^.0-9][^"]*"' | wc -l)
op0_count2=$(echo "$html2" | grep -oP 'style="[^"]*opacity:\s*0[^.0-9][^"]*"' | wc -l)
echo "  addition-worksheets: $op0_count1 opacity:0 style attrs"
echo "  word-search-worksheets: $op0_count2 opacity:0 style attrs"
