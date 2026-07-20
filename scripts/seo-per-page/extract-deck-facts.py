#!/usr/bin/env python3
"""Extract the per-deck FACTS that make non-template page copy possible.

Runs READ-ONLY on Hetzner over /var/www/lcs-media/decks/<locale>/<slug>-v*/manifest.json
and emits one compact JSON per locale.

Why this exists
---------------
Every landing page's copy is currently assembled from four slots (type, theme, level,
mode), so 30,078 pages reduce to a few hundred sentences. But the worksheets themselves
are all different: the "animals" addition sheet is really WOODPECKER, REINDEER, CAMEL,
six rows, sums to 9. Those facts have never been used in the copy. They are what lets a
page be described truthfully AND uniquely.

Generic by design
-----------------
The 29 apps store exercises in incompatible shapes (addition has operandA/operandB,
alphabet-train has letter maps, bingo has bare lists, several have an EMPTY exercises
array). Rather than 29 parsers, walk whatever is there and collect integers, words and
image nouns recursively. A type we have never seen still yields facts.
"""
import json
import os
import re
import sys
import glob

# 'woodpecker-1769386111258-6e1e6abf.webp' -> 'woodpecker'
# The upload suffix is <13-digit ms timestamp>-<hex>; strip it and any trailing counter.
IMG_NOUN = re.compile(r'^(.+?)(?:-\d{10,}-[0-9a-f]+)?(?:\s*\d+)?\.(?:webp|png|jpe?g)$', re.I)
WORDLIKE = re.compile(r"^[\wÀ-ɏ''-]{2,24}$", re.U)

# Fields whose string values are content words rather than plumbing.
WORD_KEYS = {'word', 'name', 'answer', 'expected', 'text', 'label', 'clue',
             'solution', 'letter', 'letters', 'caption', 'prompt'}
# Never mistake these for content.
SKIP_KEYS = {'path', 'url', 'src', 'href', 'id', 'deck_id', 'image', 'font',
             'color', 'colour', 'theme', 'mode', 'type', 'hash', 'file'}

# ANSWER-BEARING per CLAUDE.md §17.8.9. A landing page must never publish the
# solution to the sheet it is describing — that destroys the worksheet for the
# teacher who prints it. These are dropped before any fact is recorded.
ANSWER_KEYS = {'correctimageindex', 'solutionpath', 'correctcount', 'cipherletter',
               'expected', 'answer', 'answers', 'answerkey', 'answeridx',
               'correct', 'solution', 'solutions', 'cipher', 'cipherbank'}

# deck.html DECK_BUNDLE fields worth reading when the manifest carries no exercises
# (crossword, sudoku, treasure-hunt, picture-trail, find-objects, telling-time,
#  fractions — 1,070 of 5,972 en decks, 18%, which would otherwise have nothing
#  to write from and would silently fall back to template prose).
BUNDLE_CONTENT_KEYS = ['words', 'clues', 'gridDims', 'imageRefs', 'legend', 'items',
                       'tiles', 'cards', 'pairs', 'rows', 'labels', 'prompts',
                       'letters', 'title', 'instruction', 'targets']

MAX_NOUNS, MAX_NUMS, MAX_WORDS = 40, 80, 80


def noun_from_image(filename):
    base = os.path.basename(str(filename or ''))
    m = IMG_NOUN.match(base)
    if not m:
        return None
    n = m.group(1).replace('_', ' ').replace('-', ' ').strip().lower()
    # a trailing standalone number is a duplicate marker ("cat 2"), not part of the noun
    n = re.sub(r'\s+\d+$', '', n).strip()
    return n or None


def walk(node, nums, words, nouns, depth=0):
    """Collect integers, content words and image nouns from any exercise shape."""
    if depth > 8:
        return
    if isinstance(node, bool):
        return
    if isinstance(node, int):
        if 0 <= node <= 1000:
            nums.append(node)
        return
    if isinstance(node, float):
        if float(node).is_integer() and 0 <= node <= 1000:
            nums.append(int(node))
        return
    if isinstance(node, str):
        s = node.strip()
        if not s:
            return
        n = noun_from_image(s)
        if n:
            nouns.append(n)
        return
    if isinstance(node, list):
        for x in node:
            walk(x, nums, words, nouns, depth + 1)
        return
    if isinstance(node, dict):
        for k, v in node.items():
            kl = str(k).lower()
            if kl in ANSWER_KEYS:
                continue  # §17.8.9 — never record the solution
            if isinstance(v, str):
                n = noun_from_image(v)
                if n:
                    nouns.append(n)
                    continue
                if kl in WORD_KEYS and WORDLIKE.match(v.strip()):
                    words.append(v.strip())
                    continue
                if kl in SKIP_KEYS:
                    continue
                continue
            if kl in SKIP_KEYS and not isinstance(v, (list, dict)):
                continue
            walk(v, nums, words, nouns, depth + 1)


def dedupe(seq, cap):
    out, seen = [], set()
    for x in seq:
        k = x.lower() if isinstance(x, str) else x
        if k in seen:
            continue
        seen.add(k)
        out.append(x)
        if len(out) >= cap:
            break
    return out


BUNDLE_RE = re.compile(r'DECK_BUNDLE\s*=\s*(\{.*?\});', re.S)


def bundle_facts(deck_dir, nums, words, nouns):
    """Read content out of deck.html's DECK_BUNDLE.

    Used when the manifest's `exercises` is empty. The bundle is large (~170 KB)
    so only the content-bearing keys are walked, never the whole object.
    Returns the grid size when the app declares one.
    """
    path = os.path.join(deck_dir, 'deck.html')
    if not os.path.exists(path):
        return None
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
            html = fh.read()
    except Exception:
        return None
    m = BUNDLE_RE.search(html)
    if not m:
        return None
    try:
        b = json.loads(m.group(1))
    except Exception:
        return None
    if not isinstance(b, dict):
        return None
    for k in BUNDLE_CONTENT_KEYS:
        if k in b:
            walk(b[k], nums, words, nouns)
    gd = b.get('gridDims')
    if isinstance(gd, dict):
        r, c = gd.get('rows'), gd.get('cols')
        if isinstance(r, int) and isinstance(c, int):
            return [r, c]
    if isinstance(gd, list) and len(gd) == 2 and all(isinstance(x, int) for x in gd):
        return gd
    return None


def facts_for(manifest_path, slug):
    with open(manifest_path, 'r', encoding='utf-8') as fh:
        m = json.load(fh)

    nums, words, nouns = [], [], []

    # image nouns first: they are the most reliable per-deck fact and exist for
    # every picture-based type even when `exercises` is empty
    for img in (m.get('images_used') or []):
        n = noun_from_image(img)
        if n:
            nouns.append(n)

    ex = m.get('exercises')
    n_ex = len(ex) if isinstance(ex, list) else 0
    if ex:
        walk(ex, nums, words, nouns)

    # The picture-only seed image ('/images/<theme>/seoseed.png') is plumbing, not
    # a depicted object — it must not become a noun we then write about.
    nouns[:] = [n for n in nouns if n != 'seoseed']

    grid = None
    if not nouns and not words and not nums:
        grid = bundle_facts(os.path.dirname(manifest_path), nums, words, nouns)
        nouns[:] = [n for n in nouns if n != 'seoseed']

    settings = m.get('settings') or {}
    gen = m.get('generator') or {}

    return {
        'slug': slug,
        'type': m.get('exercise_type'),
        'mode': m.get('exercise_mode'),
        'theme': m.get('theme'),
        'lang': m.get('language'),
        'app': gen.get('app'),
        'n': n_ex,
        'nouns': dedupe(nouns, MAX_NOUNS),
        'nums': dedupe(nums, MAX_NUMS),
        'words': dedupe(words, MAX_WORDS),
        'grayscale': bool(settings.get('grayscale')),
        'variant_id': m.get('variant_id'),
        'grid': grid,
    }


def run(locale, out_dir):
    root = '/var/www/lcs-media/decks/%s' % locale
    if not os.path.isdir(root):
        return 0, 0
    rows, bad = [], 0
    # the live version is the symlink target; walk versioned dirs and keep the highest
    best = {}
    for d in glob.glob(os.path.join(root, '*-v*')):
        if not os.path.isdir(d):
            continue
        base = os.path.basename(d)
        m = re.match(r'^(.*)-v(\d+)$', base)
        if not m:
            continue
        slug, ver = m.group(1), int(m.group(2))
        if slug not in best or ver > best[slug][0]:
            best[slug] = (ver, d)
    for slug, (_ver, d) in best.items():
        mf = os.path.join(d, 'manifest.json')
        if not os.path.exists(mf):
            continue
        try:
            rows.append(facts_for(mf, slug))
        except Exception:
            bad += 1
    rows.sort(key=lambda r: r['slug'])
    out = os.path.join(out_dir, '%s.json' % locale)
    with open(out, 'w', encoding='utf-8') as fh:
        json.dump({'locale': locale, 'count': len(rows), 'decks': rows}, fh, ensure_ascii=False)
    return len(rows), bad


if __name__ == '__main__':
    out_dir = sys.argv[1] if len(sys.argv) > 1 else '/tmp/deck-facts'
    locales = sys.argv[2].split(',') if len(sys.argv) > 2 else [
        'en', 'de', 'es', 'pt', 'it', 'fr', 'nl', 'sv', 'da', 'no', 'fi']
    os.makedirs(out_dir, exist_ok=True)
    total = 0
    for loc in locales:
        n, bad = run(loc, out_dir)
        total += n
        print('[%s] %d decks%s' % (loc, n, (' | %d unreadable' % bad) if bad else ''))
    print('total %d' % total)
