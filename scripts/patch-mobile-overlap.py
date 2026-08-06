import os

# Patches the 3 production decks affected by the mobile answer-box overlap bug
# (drop px floors on overlay slots — see commit 5de1e373 for the corresponding
# REFERENCE APPS fix). Idempotent: skips any deck whose bug strings are already gone.

PATCHES = {
    '/var/www/lcs-media/decks/en/addition-image-image/deck.html': [
        (';min-height:28px', ''),
        ('slot.style.width="max("+wPct.toFixed(2)+"%,64px)";', 'slot.style.width=wPct.toFixed(2)+"%";'),
    ],
    '/var/www/lcs-media/decks/de/addition-image-image/deck.html': [
        (';min-height:28px', ''),
        ('slot.style.width="max("+wPct.toFixed(2)+"%,64px)";', 'slot.style.width=wPct.toFixed(2)+"%";'),
    ],
    '/var/www/lcs-media/decks/de/picture-path/deck.html': [
        (';min-width:32px;min-height:26px', ''),
    ],
}

for target, patches in PATCHES.items():
    if not os.path.exists(target):
        print(f'MISSING: {target}')
        continue
    with open(target, 'r', encoding='utf-8') as f:
        original = f.read()
    new_content = original
    applied = []
    skipped = []
    for old, new in patches:
        if old not in new_content:
            skipped.append(old[:40])
            continue
        new_content = new_content.replace(old, new, 1)
        applied.append(old[:40])
    if new_content == original:
        print(f'SKIP-all-already-patched: {target}')
        continue
    with open(target, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'PATCHED: {target} | applied={applied} | skipped={skipped}')
