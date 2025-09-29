# Professional Translation System

## Architecture Overview

This is a clean, professional translation system designed to handle 33 apps × 10 languages reliably.

## Directory Structure

```
translations/
├── source/              # Source translation files (JSON)
│   ├── en/             # English (base language)
│   ├── de/             # German
│   ├── fr/             # French
│   ├── es/             # Spanish
│   ├── it/             # Italian
│   ├── pt/             # Portuguese
│   ├── nl/             # Dutch
│   ├── sv/             # Swedish
│   ├── da/             # Danish
│   ├── no/             # Norwegian
│   └── fi/             # Finnish
├── compiled/           # Build output
│   └── translations.js # Compiled translations
└── tools/              # Build and validation tools
    ├── extract.js      # Extract text from apps
    ├── validate.js     # Validate translations
    └── build.js        # Build final file
```

## Translation Files

Each language directory contains:
- `common.json` - Shared translations across all apps
- `{app-name}.json` - App-specific translations

## Key Principles

1. **Single Source of Truth**: All translations in JSON files
2. **Build-Time Compilation**: Combine and validate at build time
3. **Runtime Efficiency**: Single compiled file for production
4. **Type Safety**: Validation ensures all keys exist
5. **No Duplicates**: Smart merging prevents duplicates

## Usage

### Development
```bash
npm run translations:extract   # Extract text from apps
npm run translations:validate  # Validate all translations
npm run translations:build     # Build production file
```

### Adding Translations
1. Add to appropriate JSON file in `source/{lang}/`
2. Run validation to ensure completeness
3. Build to generate new compiled file

### In Apps
```javascript
// Translations auto-load and initialize
// Just use the t() function
const text = t('generateWorksheet');
```

## Language Codes
- en - English
- de - German (Deutsch)
- fr - French (Français)
- es - Spanish (Español)
- it - Italian (Italiano)
- pt - Portuguese (Português)
- nl - Dutch (Nederlands)
- sv - Swedish (Svenska)
- da - Danish (Dansk)
- no - Norwegian (Norsk)
- fi - Finnish (Suomi)