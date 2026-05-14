#!/usr/bin/env python
# Backfill missing SEO chrome keys (worksheet, seoFreeInteractive, seoFor, seoPrintOrPlayOnline)
# in translations-cryptogram.js + translations-chart-count.js per-locale blocks.
# Per CLAUDE.md §A.13.5 Shape A authoring fix.

import io
import re
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Per-locale SEO chrome translations (matching translations-shared.js)
seo_chrome = {
    'en': {'worksheet': 'Worksheet',           'seoFreeInteractive': 'Free interactive',         'seoFor': 'for',         'seoPrintOrPlayOnline': 'Print or play online'},
    'de': {'worksheet': 'Arbeitsblatt',        'seoFreeInteractive': 'Kostenloses interaktives', 'seoFor': 'für',         'seoPrintOrPlayOnline': 'Drucken oder online spielen'},
    'es': {'worksheet': 'Ficha',               'seoFreeInteractive': 'Hoja interactiva gratuita','seoFor': 'para',        'seoPrintOrPlayOnline': 'Imprimir o jugar en línea'},
    'fr': {'worksheet': 'Fiche',               'seoFreeInteractive': 'Fiche interactive gratuite','seoFor': 'pour',       'seoPrintOrPlayOnline': 'Imprimer ou jouer en ligne'},
    'it': {'worksheet': 'Scheda',              'seoFreeInteractive': 'Scheda interattiva gratuita','seoFor': 'per',       'seoPrintOrPlayOnline': 'Stampa o gioca online'},
    'pt': {'worksheet': 'Folha de Exercícios', 'seoFreeInteractive': 'Atividade interativa gratuita','seoFor': 'para',    'seoPrintOrPlayOnline': 'Imprimir ou jogar online'},
    'nl': {'worksheet': 'Werkblad',            'seoFreeInteractive': 'Gratis interactief',       'seoFor': 'voor',        'seoPrintOrPlayOnline': 'Print of speel online'},
    'sv': {'worksheet': 'Övningsblad',         'seoFreeInteractive': 'Gratis interaktivt',       'seoFor': 'för',         'seoPrintOrPlayOnline': 'Skriv ut eller spela online'},
    'da': {'worksheet': 'Opgaveark',           'seoFreeInteractive': 'Gratis interaktiv',        'seoFor': 'til',         'seoPrintOrPlayOnline': 'Udskriv eller spil online'},
    'no': {'worksheet': 'Oppgaveark',          'seoFreeInteractive': 'Gratis interaktiv',        'seoFor': 'for',         'seoPrintOrPlayOnline': 'Skriv ut eller spill online'},
    'fi': {'worksheet': 'Tehtäväpaperi',       'seoFreeInteractive': 'Ilmainen vuorovaikutteinen','seoFor': 'aiheelle',   'seoPrintOrPlayOnline': 'Tulosta tai pelaa verkossa'},
}


def inject_keys(file_path, missing_keys):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    inserts = 0
    for locale, kv in seo_chrome.items():
        m = re.search(r'"' + locale + r'"\s*:\s*\{', new_content)
        if not m:
            print(f'  [SKIP] Cannot find {locale} block')
            continue
        # Walk to find matching closing brace
        start = m.end() - 1
        depth = 0
        i = start
        while i < len(new_content):
            c = new_content[i]
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    break
            i += 1
        block_text = new_content[start:i + 1]
        keys_to_add = [(k, kv[k]) for k in missing_keys if '"' + k + '"' not in block_text]
        if not keys_to_add:
            print(f'  [{locale}] all keys already present')
            continue
        # Build insertion: indent matches existing keys (4 spaces)
        insert_str = ''
        for key, val in keys_to_add:
            escaped_val = val.replace('\\', '\\\\').replace('"', '\\"')
            insert_str += '    "' + key + '": "' + escaped_val + '",\n'
        # Insert just before the closing brace, after the last newline
        before_brace = new_content[:i]
        after_brace = new_content[i:]
        last_nl = before_brace.rfind('\n')
        new_content = before_brace[:last_nl + 1] + insert_str + after_brace
        inserts += len(keys_to_add)
        print(f'  [{locale}] inserted {len(keys_to_add)} keys: {[k for k, _ in keys_to_add]}')

    if inserts > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'  TOTAL: {inserts} keys inserted into {file_path}')
    else:
        print(f'  No changes needed for {file_path}')
    return inserts


print('=== translations-cryptogram.js ===')
inject_keys(
    r'C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-cryptogram.js',
    ['worksheet', 'seoFreeInteractive', 'seoFor', 'seoPrintOrPlayOnline']
)
print()
print('=== translations-chart-count.js ===')
inject_keys(
    r'C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-chart-count.js',
    ['worksheet']
)
