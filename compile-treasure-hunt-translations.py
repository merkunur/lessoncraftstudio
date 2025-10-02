#!/usr/bin/env python3
"""
Compile Treasure Hunt translations from all 11 professional translation files
into a single translations-treasure-hunt.js file.
"""

import re
import json

# Read all translation files
translation_files = {
    'en': 'translations/treasure-hunt/treasure-hunt-translation-master-template.js',
    'de': 'translations/treasure-hunt/treasure-hunt-professional-german-translation.js',
    'fr': 'translations/treasure-hunt/treasure-hunt-professional-french-translation.js',
    'es': 'translations/treasure-hunt/treasure-hunt-professional-spanish-translation.js',
    'it': 'translations/treasure-hunt/treasure-hunt-professional-italian-translation.js',
    'pt': 'translations/treasure-hunt/treasure-hunt-professional-portuguese-translation.js',
    'nl': 'translations/treasure-hunt/treasure-hunt-professional-dutch-translation.js',
    'sv': 'translations/treasure-hunt/treasure-hunt-professional-swedish-translation.js',
    'da': 'translations/treasure-hunt/treasure-hunt-professional-danish-translation.js',
    'no': 'translations/treasure-hunt/treasure-hunt-professional-norwegian-translation.js',
    'fi': 'translations/treasure-hunt/treasure-hunt-professional-finnish-translation.js',
}

def extract_translations_from_file(filepath, lang_code):
    """Extract translation object from a JavaScript file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the language object (e.g., en: { ... }, de: { ... })
    pattern = rf'"{lang_code}": \{{(.*?)\n  \}}'
    match = re.search(pattern, content, re.DOTALL)

    if not match:
        # Try alternate pattern for English
        pattern = rf'{lang_code}: \{{(.*?)\n  \}}'
        match = re.search(pattern, content, re.DOTALL)

    if not match:
        print(f"Warning: Could not find {lang_code} translations in {filepath}")
        return {}

    # Extract all key-value pairs
    translations = {}
    obj_content = match.group(1)

    # Match pattern: "key": "value",
    # Handle escaped quotes and special characters
    key_value_pattern = r'"([^"]+)":\s*"((?:[^"\\]|\\.)*)"[,\n]'

    for match in re.finditer(key_value_pattern, obj_content):
        key = match.group(1)
        value = match.group(2)
        translations[key] = value

    return translations

# Compile all translations
compiled = {}

for lang, filepath in translation_files.items():
    print(f"Processing {lang}...")
    translations = extract_translations_from_file(filepath, lang)
    compiled[lang] = translations
    print(f"  {lang}: {len(translations)} keys")

# Generate the output file
output = []
output.append("// Treasure Hunt Translations - Compiled from Professional Translation Files")
output.append("// Auto-generated - Do not edit manually")
output.append("// Total: 75+ keys per language")
output.append("// Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI")
output.append("")
output.append("const translations = {")

for lang in ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']:
    output.append(f'  "{lang}": {{')

    trans = compiled.get(lang, {})
    keys = sorted(trans.keys())

    for i, key in enumerate(keys):
        value = trans[key]
        # Escape backslashes and quotes properly
        value = value.replace('\\', '\\\\').replace('"', '\\"')
        comma = ',' if i < len(keys) - 1 else ''
        output.append(f'    "{key}": "{value}"{comma}')

    output.append('  },')
    output.append('')

output.append("};")
output.append("")
output.append("// Expose translations to global scope")
output.append("if (typeof window !== 'undefined') {")
output.append("  window.translations = translations;")
output.append("}")
output.append("")
output.append("// Export for Node.js")
output.append("if (typeof module !== 'undefined' && module.exports) {")
output.append("  module.exports = translations;")
output.append("}")

# Write output file
output_path = 'frontend/public/worksheet-generators/js/translations-treasure-hunt.js'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print(f"\n✅ Compilation complete!")
print(f"Output: {output_path}")
print(f"\nKey counts per language:")
for lang in ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']:
    count = len(compiled.get(lang, {}))
    print(f"  {lang}: {count} keys")
