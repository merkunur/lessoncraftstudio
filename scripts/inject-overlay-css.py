import os, sys

TARGETS = [
    '/var/www/lcs-media/decks/en/addition-image-image/deck.html',
    '/var/www/lcs-media/decks/de/addition-image-image/deck.html',
    '/var/www/lcs-media/decks/en/sudoku/deck.html',
    '/var/www/lcs-media/decks/de/sudoku/deck.html',
    '/var/www/lcs-media/decks/en/cryptogram/deck.html',
    '/var/www/lcs-media/decks/de/cryptogram/deck.html',
    '/var/www/lcs-media/decks/de/picture-path/deck.html',
]
CSS_INJECT = '<style>.lcs-img-overlay:not([src]),.lcs-img-overlay[src=""]{display:none}</style>'
GUARD = 'lcs-img-overlay:not([src])'

for target in TARGETS:
    if not os.path.exists(target):
        print(f'MISSING: {target}')
        continue
    with open(target, 'r', encoding='utf-8') as f:
        content = f.read()
    if GUARD in content:
        print(f'SKIP-already-injected: {target}')
        continue
    new_content = content.replace('</head>', CSS_INJECT + '</head>', 1)
    if new_content == content:
        print(f'FAIL-no-head-tag: {target}')
        continue
    with open(target, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'INJECTED: {target}')
