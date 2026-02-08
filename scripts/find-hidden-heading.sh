#!/bin/bash
# Find which heading is inside opacity:0 on product page
path="/en/apps/word-search-worksheets"
html=$(curl -s "http://localhost:3000${path}")

echo "$html" | python3 -c "
import sys, re

html = sys.stdin.read()

# Find all style attributes with opacity:0
# Then check nearby context for headings
segments = html.split('opacity:0')
for i, seg in enumerate(segments[:-1]):
    # Get the tag context before opacity:0
    # Look at what comes after opacity:0
    after = segments[i+1][:2000]
    headings = re.findall(r'<(h[1-6])[^>]*>(.*?)</\1>', after, re.DOTALL)
    if headings:
        for tag, content in headings:
            text = re.sub(r'<[^>]+>', '', content).strip()
            # Find the opening tag to understand context
            before_tag = seg[-200:]
            tag_match = re.search(r'<([a-z]+)[^>]*style=\"[^\"]*$', before_tag)
            parent = tag_match.group(1) if tag_match else 'unknown'
            print(f'opacity:0 parent=<{parent}> contains <{tag}>: \"{text[:100]}\"')
" 2>/dev/null

echo ""
echo "--- All opacity values in style attributes ---"
echo "$html" | grep -oP 'style="[^"]*opacity:[^"]*"' | grep -oP 'opacity:[^;"]+' | sort | uniq -c | sort -rn
