#!/bin/bash
echo "=== OPACITY:0 CONTENT ANALYSIS ==="
echo ""

# Check what text content is inside opacity:0 elements on the product page
echo "--- Product page opacity:0 content ---"
path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP '<loc>[^<]+/en/apps/[a-z][^<]+</loc>' | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed 's|https://www.lessoncraftstudio.com||' | head -1)
html=$(curl -s "http://localhost:3000${path}")

# Count opacity:0 and check what they contain
echo "$html" | python3 -c "
import sys, re

html = sys.stdin.read()

# Find elements with opacity:0 (exact 0, not 0.5 etc)
# Look for style attributes containing opacity:0 or opacity: 0
pattern = r'<([a-z]+)[^>]*style=\"[^\"]*opacity:\s*0[^.0-9][^\"]*\"[^>]*>(.*?)</\1>'
matches = re.findall(pattern, html, re.DOTALL)

for i, (tag, content) in enumerate(matches[:10]):
    # Strip HTML tags to get text
    text = re.sub(r'<[^>]+>', ' ', content).strip()
    text = ' '.join(text.split())[:100]
    has_img = 'img' in content.lower()
    has_h = bool(re.search(r'<h[1-6]', content))
    print(f'  {i+1}. <{tag}> — text: \"{text[:80]}\"')
    print(f'     has_image={has_img}, has_heading={has_h}')
" 2>/dev/null

echo ""
echo "--- Homepage opacity:0 content ---"
html=$(curl -s "http://localhost:3000/en")
echo "$html" | python3 -c "
import sys, re

html = sys.stdin.read()
pattern = r'<([a-z]+)[^>]*style=\"[^\"]*opacity:\s*0[^.0-9][^\"]*\"[^>]*>(.*?)</\1>'
matches = re.findall(pattern, html, re.DOTALL)

for i, (tag, content) in enumerate(matches[:10]):
    text = re.sub(r'<[^>]+>', ' ', content).strip()
    text = ' '.join(text.split())[:100]
    has_img = 'img' in content.lower()
    has_h = bool(re.search(r'<h[1-6]', content))
    print(f'  {i+1}. <{tag}> — text: \"{text[:80]}\"')
    print(f'     has_image={has_img}, has_heading={has_h}')
" 2>/dev/null

echo ""
echo "--- Check if any H1/H2/H3 has opacity:0 ---"
for page in "/en" "/en/apps/word-search-worksheets"; do
  html=$(curl -s "http://localhost:3000${page}")
  heading_hidden=$(echo "$html" | python3 -c "
import sys, re
html = sys.stdin.read()
# Check if headings are inside opacity:0 containers
op0_blocks = re.findall(r'style=\"[^\"]*opacity:\s*0[^.0-9][^\"]*\"[^>]*>.*?(?=style=|$)', html, re.DOTALL)
for block in op0_blocks:
    if re.search(r'<h[1-6]', block):
        print('FOUND: heading inside opacity:0 block')
        break
else:
    print('CLEAR: no headings inside opacity:0')
" 2>/dev/null)
  echo "  $page: $heading_hidden"
done
