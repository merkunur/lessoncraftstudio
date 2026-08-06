import os
import re

base = '/opt/lessoncraftstudio/frontend/config/blog-content'
fixed_total = 0

for locale in os.listdir(base):
    locale_dir = os.path.join(base, locale)
    if not os.path.isdir(locale_dir):
        continue
    fixed_locale = 0
    for fname in os.listdir(locale_dir):
        if not fname.endswith('.ts'):
            continue
        fp = os.path.join(locale_dir, fname)
        with open(fp, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find unescaped apostrophes inside single-quoted strings
        # Pattern: a letter followed by ' followed by a letter (like foto's, kind's)
        # But NOT already escaped (not preceded by \)
        new_content = re.sub(r"(?<!\\)([a-zA-Z])'([a-zA-Z])", r"\1\\'\\2", content)

        # Simpler approach: just find known Dutch patterns
        replacements = {
            "foto's": "foto\\'s",
            "kind's": "kind\\'s",
            "mama's": "mama\\'s",
            "papa's": "papa\\'s",
            "oma's": "oma\\'s",
            "opa's": "opa\\'s",
        }

        result = content
        for old, new in replacements.items():
            result = result.replace(old, new)

        if result != content:
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(result)
            fixed_locale += 1
            fixed_total += 1

    if fixed_locale > 0:
        print(f'{locale}: Fixed {fixed_locale} files')

print(f'Total: Fixed {fixed_total} files')
