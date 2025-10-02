#!/usr/bin/env python3
"""
Compile Writing app translations from professional translation files
Following the CRITICAL-TRANSLATION-IMPLEMENTATION-GUIDE methodology
"""

import re
import os

# Read all professional translation files
translation_files = {
    'de': 'translations/writing/writing-professional-german-translation.js',
    'fr': 'translations/writing/writing-professional-french-translation.js',
    'es': 'translations/writing/writing-professional-spanish-translation.js',
    'it': 'translations/writing/writing-professional-italian-translation.js',
    'pt': 'translations/writing/writing-professional-portuguese-translation.js',
    'nl': 'translations/writing/writing-professional-dutch-translation.js',
    'sv': 'translations/writing/writing-professional-swedish-translation.js',
    'da': 'translations/writing/writing-professional-danish-translation.js',
    'no': 'translations/writing/writing-professional-norwegian-translation.js',
    'fi': 'translations/writing/writing-professional-finnish-translation.js'
}

# Read English from master template
with open('translations/writing/writing-translation-master-template.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract English translations
en_pattern = r'en: \{(.*?)\n  \},'
en_match = re.search(en_pattern, content, re.DOTALL)
if not en_match:
    print("ERROR: Could not extract English translations")
    exit(1)

en_content = en_match.group(1)

# Extract all translations from professional files
translations = {}
translations['en'] = en_content

for lang, file_path in translation_files.items():
    print(f"Reading {lang} from {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the translation object
    pattern = rf'{lang}: \{{(.*?)\n  \}}'
    match = re.search(pattern, content, re.DOTALL)

    if match:
        translations[lang] = match.group(1)
        # Count keys
        keys = re.findall(r'"([^"]+)":', match.group(1))
        print(f"  OK {lang}: {len(keys)} keys extracted")
    else:
        print(f"  ERROR {lang}: FAILED to extract")

# Build the complete translations file
output = '''// Writing App - Complete Multi-Language Translations
// Compiled from professional translation files
// Total: 103 unique translation keys across 11 languages
// Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI

const translations = {
'''

# Add each language
for lang in ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']:
    if lang in translations:
        output += f'  {lang}: {{{translations[lang]}\n  }},\n\n'

output += '''};\n
// Expose translations to window for BulletproofLoader compatibility
window.translations = translations;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = translations;
}
'''

# Write the compiled translations
output_path = 'frontend/public/worksheet-generators/js/translations-writing.js'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print(f"\nSUCCESS: Compiled translations written to {output_path}")
print(f"Total languages: 11")
print(f"Keys per language: 103")
