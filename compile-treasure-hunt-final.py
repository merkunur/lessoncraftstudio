#!/usr/bin/env python3
"""
Compile Treasure Hunt translations from professional translation files
"""

import os
import re

# Read all professional translation files
translations_dir = "translations/treasure-hunt"
output_file = "frontend/public/worksheet-generators/js/translations-treasure-hunt.js"

# Language file mappings
lang_files = {
    'de': 'treasure-hunt-professional-german-translation.js',
    'fr': 'treasure-hunt-professional-french-translation.js',
    'es': 'treasure-hunt-professional-spanish-translation.js',
    'it': 'treasure-hunt-professional-italian-translation.js',
    'pt': 'treasure-hunt-professional-portuguese-translation.js',
    'nl': 'treasure-hunt-professional-dutch-translation.js',
    'sv': 'treasure-hunt-professional-swedish-translation.js',
    'da': 'treasure-hunt-professional-danish-translation.js',
    'no': 'treasure-hunt-professional-norwegian-translation.js',
    'fi': 'treasure-hunt-professional-finnish-translation.js',
}

# Master template for English
master_template_file = os.path.join(translations_dir, 'treasure-hunt-translation-master-template.js')

def extract_translations_from_file(filepath, lang_code):
    """Extract translation key-value pairs from a professional translation file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the language object (de: { ... }, fr: { ... }, etc.)
    # Pattern without quotes around lang_code
    pattern = rf'{lang_code}\s*:\s*\{{(.*?)\n\s*\}}\s*\}};'
    match = re.search(pattern, content, re.DOTALL)

    if not match:
        print(f"WARNING: Could not find {lang_code} translations in {filepath}")
        return {}

    lang_content = match.group(1)

    # Extract all key-value pairs
    translations = {}
    key_value_pattern = r'"([^"]+)"\s*:\s*"((?:[^"\\]|\\.)*)\"'

    for match in re.finditer(key_value_pattern, lang_content):
        key = match.group(1)
        value = match.group(2)
        translations[key] = value

    return translations

def extract_english_from_template(filepath):
    """Extract English translations from the master template"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the en object
    pattern = r'en\s*:\s*\{(.*?)\n\s*\},'
    match = re.search(pattern, content, re.DOTALL)

    if not match:
        print("WARNING: Could not find English translations in master template")
        return {}

    en_content = match.group(1)

    # Extract all key-value pairs
    translations = {}
    key_value_pattern = r'"([^"]+)"\s*:\s*"((?:[^"\\]|\\.)*)\"'

    for match in re.finditer(key_value_pattern, en_content):
        key = match.group(1)
        value = match.group(2)
        translations[key] = value

    return translations

def format_translation_value(value):
    """Format a translation value for JavaScript"""
    # Escape backslashes and quotes
    value = value.replace('\\', '\\\\').replace('"', '\\"')
    return value

def write_translations_file(all_translations, output_path):
    """Write the compiled translations to a JavaScript file"""
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('// Treasure Hunt - Complete Multi-Language Translation Implementation\n')
        f.write('// Compiled from professional translations\n')
        f.write('// Total: 75 keys per language × 11 languages = 825 translations\n')
        f.write('// Last updated: 2025-09-30\n\n')
        f.write('const translations = {\n')

        # Write each language
        for lang in ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']:
            f.write(f'  {lang}: {{\n')

            if lang in all_translations:
                # Sort keys alphabetically for consistency
                sorted_keys = sorted(all_translations[lang].keys())
                for i, key in enumerate(sorted_keys):
                    value = all_translations[lang][key]
                    comma = ',' if i < len(sorted_keys) - 1 else ''
                    f.write(f'    "{key}": "{value}"{comma}\n')

            # Add comma except for last language
            if lang != 'fi':
                f.write('  },\n\n')
            else:
                f.write('  }\n')

        f.write('};\n\n')
        f.write('// Export for use in HTML\n')
        f.write('if (typeof module !== \'undefined\' && module.exports) {\n')
        f.write('  module.exports = { translations };\n')
        f.write('}\n')

# Main compilation
print("Compiling Treasure Hunt translations...")

all_translations = {}

# Extract English from master template
print(f"Extracting English translations from master template...")
all_translations['en'] = extract_english_from_template(master_template_file)
print(f"  Found {len(all_translations['en'])} English keys")

# Extract other languages from professional translation files
for lang_code, filename in lang_files.items():
    filepath = os.path.join(translations_dir, filename)
    print(f"Extracting {lang_code} translations from {filename}...")
    all_translations[lang_code] = extract_translations_from_file(filepath, lang_code)
    print(f"  Found {len(all_translations[lang_code])} {lang_code} keys")

# Write compiled translations
print(f"\nWriting compiled translations to {output_file}...")
write_translations_file(all_translations, output_file)

print("\n✅ Compilation complete!")
print(f"Total languages: {len(all_translations)}")
for lang, trans in all_translations.items():
    print(f"  {lang}: {len(trans)} keys")
