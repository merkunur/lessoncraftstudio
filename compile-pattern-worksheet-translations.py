#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Compile Pattern Worksheet Translations
Extracts translations from 10 professional translation files + English from master template
Total: 192 keys × 11 languages = 2,112 translations
"""

import re
import json
import sys

# Fix Windows console encoding
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

print("="*80)
print("Pattern Worksheet Translation Compilation")
print("="*80)

# Extract translations from a JavaScript file
def extract_translations_from_js(file_path, language_code):
    """Extract translations from professional translation JS file"""
    print(f"\n📖 Reading {language_code.upper()} from {file_path}")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the object within the language code section (matches both "de": { and de: {)
    pattern = rf'(?:"{language_code}"|{language_code})\s*:\s*\{{(.*?)\n  \}}'
    match = re.search(pattern, content, re.DOTALL)

    if not match:
        print(f"❌ Could not find {language_code} section in {file_path}")
        return {}

    section = match.group(1)

    # Extract all key-value pairs
    translations = {}
    key_value_pattern = r'"([^"]+)"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"'
    matches = re.findall(key_value_pattern, section)

    for key, value in matches:
        # Unescape the value
        value = value.replace('\\\\', '\\').replace('\\"', '"')
        translations[key] = value

    print(f"✅ Extracted {len(translations)} keys from {language_code.upper()}")
    return translations

# Extract English from master template
def extract_english_from_template(file_path):
    """Extract English translations from master template"""
    print(f"\n📖 Reading ENGLISH from {file_path}")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the en section (matches both "en": { and en: {)
    pattern = r'(?:"en"|en)\s*:\s*\{(.*?)\n  \}[,]?'
    match = re.search(pattern, content, re.DOTALL)

    if not match:
        print(f"❌ Could not find en section in {file_path}")
        return {}

    section = match.group(1)

    # Extract all key-value pairs
    translations = {}
    key_value_pattern = r'"([^"]+)"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"'
    matches = re.findall(key_value_pattern, section)

    for key, value in matches:
        # Unescape the value
        value = value.replace('\\\\', '\\').replace('\\"', '"')
        translations[key] = value

    print(f"✅ Extracted {len(translations)} keys from ENGLISH")
    return translations

# Main compilation
print("\n" + "="*80)
print("PHASE 1: EXTRACT FROM PROFESSIONAL FILES")
print("="*80)

base_path = "translations/pattern-worksheet/"

# Extract English from master template
english = extract_english_from_template(f"{base_path}pattern-worksheet-translation-master-template.js")

# Extract from professional translation files
german = extract_translations_from_js(f"{base_path}pattern-worksheet-professional-german-translation.js", "de")
french = extract_translations_from_js(f"{base_path}pattern-worksheet-professional-french-translation.js", "fr")
spanish = extract_translations_from_js(f"{base_path}pattern-worksheet-professional-spanish-translation.js", "es")
italian = extract_translations_from_js(f"{base_path}pattern-worksheet-professional-italian-translation.js", "it")
portuguese = extract_translations_from_js(f"{base_path}pattern-worksheet-professional-portuguese-translation.js", "pt")
dutch = extract_translations_from_js(f"{base_path}pattern-worksheet-professional-dutch-translation.js", "nl")
swedish = extract_translations_from_js(f"{base_path}pattern-worksheet-professional-swedish-translation.js", "sv")
danish = extract_translations_from_js(f"{base_path}pattern-worksheet-professional-danish-translation.js", "da")
norwegian = extract_translations_from_js(f"{base_path}pattern-worksheet-professional-norwegian-translation.js", "no")
finnish = extract_translations_from_js(f"{base_path}pattern-worksheet-professional-finnish-translation.js", "fi")

# Compile all languages
all_translations = {
    "en": english,
    "de": german,
    "fr": french,
    "es": spanish,
    "it": italian,
    "pt": portuguese,
    "nl": dutch,
    "sv": swedish,
    "da": danish,
    "no": norwegian,
    "fi": finnish
}

print("\n" + "="*80)
print("PHASE 2: VERIFY COVERAGE")
print("="*80)

# Get expected keys from English
expected_keys = set(english.keys())
print(f"\n📊 English has {len(expected_keys)} keys (master reference)")

# Check coverage for each language
for lang_code, translations in all_translations.items():
    if lang_code == "en":
        continue

    lang_keys = set(translations.keys())
    missing = expected_keys - lang_keys
    extra = lang_keys - expected_keys

    coverage = (len(lang_keys) / len(expected_keys)) * 100 if expected_keys else 0

    status = "✅" if coverage == 100 else "⚠️"
    print(f"\n{status} {lang_code.upper()}: {len(lang_keys)}/{len(expected_keys)} keys ({coverage:.1f}% coverage)")

    if missing:
        print(f"   ⚠️  Missing {len(missing)} keys:")
        for key in sorted(missing)[:5]:
            print(f"      - {key}")
        if len(missing) > 5:
            print(f"      ... and {len(missing) - 5} more")

    if extra:
        print(f"   ⚠️  Extra {len(extra)} keys not in English:")
        for key in sorted(extra)[:3]:
            print(f"      - {key}")

print("\n" + "="*80)
print("PHASE 3: GENERATE OUTPUT FILE")
print("="*80)

# Generate the translations JavaScript file
output_lines = [
    "/**",
    " * Pattern Worksheet Generator - Compiled Translations",
    " * Auto-generated from professional translation files",
    f" * Total Keys: {len(expected_keys)}",
    " * Languages: 11 (en, de, fr, es, it, pt, nl, sv, da, no, fi)",
    " */",
    "",
    "const translations = {"
]

# Add each language
for lang_code in ["en", "de", "fr", "es", "it", "pt", "nl", "sv", "da", "no", "fi"]:
    translations_dict = all_translations[lang_code]
    output_lines.append(f'  "{lang_code}": {{')

    # Sort keys for consistency
    sorted_keys = sorted(translations_dict.keys())

    for key in sorted_keys:
        value = translations_dict[key]
        # Escape quotes and backslashes
        escaped_value = value.replace('\\', '\\\\').replace('"', '\\"')
        output_lines.append(f'    "{key}": "{escaped_value}",')

    # Remove trailing comma from last item
    if output_lines[-1].endswith(','):
        output_lines[-1] = output_lines[-1][:-1]

    output_lines.append('  },')

# Remove trailing comma from last language
if output_lines[-1].endswith(','):
    output_lines[-1] = output_lines[-1][:-1]

output_lines.append('};')
output_lines.append('')
output_lines.append('// Export for use in modules')
output_lines.append('if (typeof module !== "undefined" && module.exports) {')
output_lines.append('  module.exports = { translations };')
output_lines.append('}')

# Write to file
output_path = "frontend/public/worksheet-generators/js/translations-pattern-worksheet.js"
with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(output_lines))

print(f"\n✅ Generated: {output_path}")
print(f"📊 Total translations: {len(expected_keys)} keys × 11 languages = {len(expected_keys) * 11} translations")

print("\n" + "="*80)
print("COMPILATION COMPLETE!")
print("="*80)
print("\nNext steps:")
print("1. Review the generated file: frontend/public/worksheet-generators/js/translations-pattern-worksheet.js")
print("2. Implement in HTML: Add script tag and translation functions")
print("3. Add data-translate attributes to all static elements")
print("4. Wrap all dynamic messages with t() function")
print("5. Test in all 11 languages")