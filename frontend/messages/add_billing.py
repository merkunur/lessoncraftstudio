import json
import sys

# Translations for "Billing" in different languages
billing_translations = {
    'fr': 'Facturation',
    'es': 'Facturación',
    'pt': 'Faturação',
    'it': 'Fatturazione',
    'nl': 'Facturering',
    'da': 'Fakturering',
    'no': 'Fakturering',
    'fi': 'Laskutus'
}

for lang, translation in billing_translations.items():
    filename = f'{lang}.json'
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Add billing to dashboard.header if not exists
        if 'dashboard' in data and 'header' in data['dashboard']:
            if 'billing' not in data['dashboard']['header']:
                data['dashboard']['header']['billing'] = translation
                print(f'✅ Added billing to {lang}.json')
            else:
                print(f'ℹ️  {lang}.json already has billing')
        else:
            print(f'❌ {lang}.json missing dashboard.header structure')
            continue
        
        # Save back
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f'❌ Error with {lang}.json: {e}')

print('\n✅ Done!')
