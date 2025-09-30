#!/usr/bin/env python3
"""
Cryptogram Translation Compiler
Extracts translations from professional translation files and compiles into JSON
"""

import os
import re
import json

# Language code mapping
LANG_MAPPING = {
    'german': 'de',
    'french': 'fr',
    'spanish': 'es',
    'italian': 'it',
    'portuguese': 'pt',
    'dutch': 'nl',
    'swedish': 'sv',
    'danish': 'da',
    'norwegian': 'no',
    'finnish': 'fi'
}

def extract_translations_from_js(filepath):
    """Extract translation key-value pairs from a JavaScript file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the language code from the constant name or object structure
    lang_code = None
    for lang_name, code in LANG_MAPPING.items():
        if lang_name in filepath.lower():
            lang_code = code
            break

    if not lang_code:
        print(f"  [SKIP] Could not determine language code for {filepath}")
        return None, {}

    translations = {}

    # Pattern to match: "key": "value",
    # Handles multi-line strings and escaped quotes
    pattern = r'"([^"]+)":\s*"([^"\\]*(?:\\.[^"\\]*)*)"'

    matches = re.findall(pattern, content)

    for key, value in matches:
        # Unescape the value
        value = value.replace('\\"', '"').replace('\\n', '\n').replace('\\\\', '\\')
        translations[key] = value

    return lang_code, translations

def main():
    translations_dir = 'translations/cryptogram'
    output_file = 'cryptogram-translations-extracted.json'

    if not os.path.exists(translations_dir):
        print(f"Error: Directory {translations_dir} not found!")
        return

    all_translations = {'en': {}}  # English is base

    # Process all professional translation files
    for filename in sorted(os.listdir(translations_dir)):
        if filename.startswith('cryptogram-professional-') and filename.endswith('.js'):
            filepath = os.path.join(translations_dir, filename)
            print(f"Processing {os.path.basename(filepath)}...")

            lang_code, translations = extract_translations_from_js(filepath)

            if lang_code and translations:
                all_translations[lang_code] = translations
                print(f"  [OK] Extracted {len(translations)} keys")
            else:
                print(f"  [SKIP] No translations extracted")

    # Save to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_translations, f, ensure_ascii=False, indent=2)

    print(f"\nSaved JSON to {os.path.abspath(output_file)}")

    # Print summary
    print("\n=== SUMMARY ===")
    print(f"Total languages: {len(all_translations)}")
    for lang, trans in sorted(all_translations.items()):
        if lang != 'en':
            print(f"  {lang}: {len(trans)} keys")

if __name__ == '__main__':
    main()