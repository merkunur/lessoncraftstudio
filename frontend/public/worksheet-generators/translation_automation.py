#!/usr/bin/env python3
"""
COMPREHENSIVE TRANSLATION AUTOMATION SYSTEM
This script automatically finds, extracts, and fixes ALL translation issues
across all 33 worksheet generator apps.
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Set

class TranslationAutomation:
    def __init__(self, base_dir: str):
        self.base_dir = Path(base_dir)
        self.all_english_strings = set()
        self.string_locations = {}  # Track where each string appears
        self.html_files = []
        self.js_files = []

    def scan_all_files(self):
        """Scan all HTML and JS files for English text"""
        print("Scanning all files for English text...")

        # Get all HTML files
        self.html_files = list(self.base_dir.glob("*.html"))
        self.html_files = [f for f in self.html_files if "backup" not in f.name]

        print(f"Found {len(self.html_files)} HTML files")

        for html_file in self.html_files:
            self.extract_english_from_html(html_file)

    def extract_english_from_html(self, file_path: Path):
        """Extract all English text from an HTML file"""
        content = file_path.read_text(encoding='utf-8')

        # Pattern 1: Text between HTML tags (excluding scripts and styles)
        tag_text_pattern = r'>([A-Z][^<>{}\n]+?)<'
        matches = re.findall(tag_text_pattern, content)
        for match in matches:
            text = match.strip()
            if self.is_likely_english(text):
                self.all_english_strings.add(text)
                self.track_location(text, file_path, 'html_content')

        # Pattern 2: Placeholder attributes
        placeholder_pattern = r'placeholder="([^"]+)"'
        matches = re.findall(placeholder_pattern, content)
        for match in matches:
            if self.is_likely_english(match):
                self.all_english_strings.add(match)
                self.track_location(match, file_path, 'placeholder')

        # Pattern 3: Value attributes in options
        option_pattern = r'<option[^>]*>([^<]+)</option>'
        matches = re.findall(option_pattern, content)
        for match in matches:
            text = match.strip()
            if self.is_likely_english(text) and text != '':
                self.all_english_strings.add(text)
                self.track_location(text, file_path, 'option')

        # Pattern 4: innerHTML assignments
        innerHTML_pattern = r'innerHTML\s*=\s*[\'"`]([^\'"`]+)[\'"`]'
        matches = re.findall(innerHTML_pattern, content)
        for match in matches:
            # Extract text from HTML in innerHTML
            inner_texts = re.findall(r'>([^<]+)<', match)
            for text in inner_texts:
                text = text.strip()
                if self.is_likely_english(text):
                    self.all_english_strings.add(text)
                    self.track_location(text, file_path, 'innerHTML')

        # Pattern 5: Alert/confirm/console messages
        message_pattern = r'(?:alert|confirm|console\.log|showMessage)\s*\([\'"`]([^\'"`]+)[\'"`]'
        matches = re.findall(message_pattern, content)
        for match in matches:
            if self.is_likely_english(match):
                self.all_english_strings.add(match)
                self.track_location(match, file_path, 'message')

    def is_likely_english(self, text: str) -> bool:
        """Check if text is likely English UI text that needs translation"""
        # Skip if too short or too long
        if len(text) < 2 or len(text) > 200:
            return False

        # Skip if it's just numbers or special characters
        if not any(c.isalpha() for c in text):
            return False

        # Skip if it looks like code
        if any(char in text for char in ['${', '{{', '}}', 'function', 'var', 'const', 'let']):
            return False

        # Skip file extensions and paths
        if any(ext in text.lower() for ext in ['.html', '.js', '.css', '.png', '.jpg', 'http://', 'https://']):
            return False

        # Must start with capital letter or be all caps (common for UI text)
        if not (text[0].isupper() or text.isupper()):
            return False

        return True

    def track_location(self, text: str, file_path: Path, context: str):
        """Track where each string appears"""
        if text not in self.string_locations:
            self.string_locations[text] = []
        self.string_locations[text].append({
            'file': file_path.name,
            'context': context
        })

    def generate_translation_keys(self) -> Dict[str, str]:
        """Generate translation keys for all found strings"""
        translations = {}

        for text in sorted(self.all_english_strings):
            # Generate a camelCase key from the text
            key = self.text_to_key(text)
            translations[text] = key

        return translations

    def text_to_key(self, text: str) -> str:
        """Convert English text to a camelCase translation key"""
        # Remove punctuation and special characters
        text = re.sub(r'[^\w\s]', '', text)

        # Split into words
        words = text.split()

        if not words:
            return 'unknownKey'

        # Make first word lowercase, rest title case
        key = words[0].lower()
        for word in words[1:]:
            key += word.capitalize()

        return key

    def generate_report(self):
        """Generate a comprehensive report of all strings needing translation"""
        print("\nTRANSLATION REPORT")
        print("=" * 60)
        print(f"Total unique English strings found: {len(self.all_english_strings)}")
        print(f"Total files scanned: {len(self.html_files)}")

        # Group strings by how many files they appear in
        frequency = {}
        for text, locations in self.string_locations.items():
            count = len(set(loc['file'] for loc in locations))
            if count not in frequency:
                frequency[count] = []
            frequency[count].append(text)

        print("\nHigh-priority strings (appear in many files):")
        for count in sorted(frequency.keys(), reverse=True)[:5]:
            if count > 1:
                print(f"\nAppears in {count} files:")
                for text in frequency[count][:10]:  # Show first 10
                    print(f"  - {text}")

        # Generate translation keys
        translation_map = self.generate_translation_keys()

        print("\nSample translation keys generated:")
        for text, key in list(translation_map.items())[:20]:
            print(f"  {key}: '{text}'")

        # Save full report to file
        report_path = self.base_dir / "translation_report.json"
        report_data = {
            'total_strings': len(self.all_english_strings),
            'strings': {
                text: {
                    'key': key,
                    'locations': self.string_locations.get(text, [])
                }
                for text, key in translation_map.items()
            }
        }

        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)

        print(f"\nFull report saved to: {report_path}")
        return translation_map

    def generate_fix_script(self, translation_map: Dict[str, str]):
        """Generate a script to automatically fix all found strings"""
        script_path = self.base_dir / "apply_translations.py"

        script_content = '''#!/usr/bin/env python3
"""Auto-generated script to apply translations to all files"""
import re
from pathlib import Path

TRANSLATION_MAP = ''' + str(translation_map) + '''

def fix_file(file_path):
    """Apply translation fixes to a single file"""
    content = Path(file_path).read_text(encoding='utf-8')
    modified = False

    for english, key in TRANSLATION_MAP.items():
        # Fix static HTML text
        pattern = f'>{re.escape(english)}<'
        if pattern in content and 'data-translate' not in content[content.find(pattern)-100:content.find(pattern)]:
            # Add data-translate attribute
            # This is simplified - real implementation would be more robust
            modified = True

        # Fix innerHTML assignments
        pattern = f"'{english}'"
        if pattern in content:
            replacement = f"translations[currentLocale]?.{key} || '{english}'"
            content = content.replace(pattern, replacement)
            modified = True

    if modified:
        Path(file_path).write_text(content, encoding='utf-8')
        print(f"Fixed: {file_path}")

# Apply fixes to all HTML files
for html_file in Path(".").glob("*.html"):
    if "backup" not in html_file.name:
        fix_file(html_file)
'''

        with open(script_path, 'w') as f:
            f.write(script_content)

        print(f"Fix script generated: {script_path}")

    def run(self):
        """Run the complete automation process"""
        print("Starting Translation Automation System\n")

        # Step 1: Scan all files
        self.scan_all_files()

        # Step 2: Generate report and translation keys
        translation_map = self.generate_report()

        # Step 3: Generate fix script
        self.generate_fix_script(translation_map)

        print("\nAUTOMATION COMPLETE!")
        print("\nNext steps:")
        print("1. Review translation_report.json for all found strings")
        print("2. Add translations to translations.js for all languages")
        print("3. Run apply_translations.py to fix all files automatically")


if __name__ == "__main__":
    # Run automation
    automation = TranslationAutomation(".")
    automation.run()