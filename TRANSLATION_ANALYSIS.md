# Translation System Analysis - Wordsearch App

## Overview
The Wordsearch app implements a comprehensive multi-language translation system supporting 11 languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI.

## Key Components

### 1. Translation File Structure
**Location**: `js/translations-wordsearch-complete.js`

```javascript
const translations = {
    en: {
        "app.title": "Word Search Generator",
        "languageSettings": "Language Settings",
        // ... more keys
    },
    de: {
        "app.title": "Wortsuchgenerator",
        "languageSettings": "Spracheinstellungen",
        // ... more keys
    },
    // ... other languages
};
```

**Key Characteristics**:
- Organized by language code (en, de, fr, etc.)
- Uses dot notation for keys: `category.key` (e.g., `app.title`, `button.addText`)
- Includes metadata comment header
- Provides fallback `t()` and `formatTranslation()` functions

### 2. Translation Function (`t()`)
**Location**: Both in HTML head and translations file

```javascript
function t(key) {
    if (typeof translations === 'undefined') {
        console.warn('Translations not loaded, returning key:', key);
        return key;
    }
    const translation = (translations[currentLocale] && translations[currentLocale][key]) ||
                       (translations.en && translations.en[key]) ||
                       key;
    return translation;
}
window.t = t;
```

**Features**:
- Looks up translation in current locale
- Falls back to English if translation missing
- Returns key itself if neither found
- Globally available via `window.t`

### 3. Format Translation Function
**Location**: HTML head and translations file

```javascript
function formatTranslation(text, ...values) {
    let result = text;
    values.forEach((value) => {
        result = result.replace('{}', value);
    });
    return result;
}
```

**Usage**: For dynamic placeholders
```javascript
// Translation: "Selected: {} / {}"
formatTranslation(t('library.selectedCount'), selectedImages.length, maxImages);
```

### 4. HTML Integration

#### Static Elements (data-translate attribute)
```html
<h2 data-translate="app.title">Word Search Settings</h2>
<button data-translate="languageSettings">Language Settings</button>
<label data-translate="pageSize">Page Size:</label>
<option value="en" data-translate="lang_en">English</option>
```

#### Placeholders (data-translate-placeholder)
```html
<input type="text" data-translate-placeholder="helloPlaceholder" placeholder="Hello!">
```

#### Tooltips (data-translate-title)
```html
<button data-translate-title="deleteTooltip" title="Delete selected">Delete</button>
```

### 5. Apply Translations Function
**Location**: In DOMContentLoaded event

```javascript
function applyTranslations() {
    // Translate elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key && typeof t !== 'undefined') {
            const translation = t(key);
            if (translation && translation !== key) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.type === 'button' || element.type === 'submit') {
                        element.value = translation;
                    }
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (key && typeof t !== 'undefined') {
            element.placeholder = t(key);
        }
    });

    // Translate titles/tooltips
    document.querySelectorAll('[data-translate-title]').forEach(element => {
        const key = element.getAttribute('data-translate-title');
        if (key && typeof t !== 'undefined') {
            element.title = t(key);
        }
    });
}
```

**When Called**:
- On page load (`DOMContentLoaded`)
- When language changes (after `languageSelect.addEventListener('change')`)

### 6. Dynamic Content Translation

#### Messages
```javascript
showMessage(t("worksheetGeneratedSuccessfully"), "success");
showMessage(t('pleaseGenerateWorksheetFirst'), "error");
```

#### With Placeholders
```javascript
// Translation: "File '{}' could not be read"
showMessage(t('errorReadingFile', {value: file.name}), 'error');

// Translation: "{} custom images available"
showMessage(t('customImagesAvailable', {value: uploadedImages.length}), 'success');
```

#### Dynamic UI Updates
```javascript
// File selection text
fileSelectionText.textContent = t('filesSelected').replace('{}', fileCount);

// Or with formatTranslation
selectedCountMsg.textContent = formatTranslation(t('library.selectedCount'), count);
```

### 7. Locale Management

#### Two Types of Locale:
1. **UI Locale** (`uiLocale`): Language of the interface
2. **Content Locale** (`currentLocale`): Language for images, themes, worksheet content

```javascript
// From URL parameters
let uiLocale = urlParams.get('locale') || urlParams.get('ui') || 'en';
let currentLocale = urlParams.get('content') || uiLocale;

window.uiLocale = uiLocale;
window.currentLocale = currentLocale;
```

#### Language Change Handling
```javascript
languageSelect.addEventListener('change', async function() {
    const newLocale = this.value;

    // Update global content locale
    currentLocale = newLocale;
    window.currentLocale = newLocale;

    // Re-apply translations to UI
    applyTranslations();

    // Use UnifiedLanguageManager if available
    if (window.UnifiedLanguageManager) {
        await window.UnifiedLanguageManager.changeLanguage(newLocale);
        loadThemes(); // Reload themes with new locale
        preloadDefaultTheme();
        if (themeSelect.value && themeSelect.value !== 'all') {
            renderDictionary(); // Reload images if a theme is selected
        }
    }
});
```

## Translation Key Naming Conventions

### Categories:
- **app.** - App metadata (title, name)
- **lang.** or **lang_** - Language names
- **button.** - Button labels
- **label.** - Form labels
- **message.** - User messages (success, error, info)
- **settings.** - Settings section headers
- **toolbar.** - Toolbar items
- **page.** - Page-related (size, setup)
- **decoration.** - Borders, backgrounds
- **text.** - Text tool related
- **puzzle.** - Puzzle/worksheet setup
- **library.** - Image library related

### Examples:
```
app.title
button.addText
button.generate
message.worksheetGenerated
settings.languageSettings
page.size
decoration.none
text.properties
puzzle.manualSelection
library.selectedCount
```

## Best Practices Observed

### 1. **Always Provide English Fallback**
```javascript
const translation = (translations[currentLocale] && translations[currentLocale][key]) ||
                   (translations.en && translations.en[key]) ||
                   key;
```

### 2. **Use data-translate for Static Content**
```html
<h2 data-translate="app.title">Word Search Settings</h2>
```

### 3. **Use t() for Dynamic Content**
```javascript
showMessage(t("worksheetGeneratedSuccessfully"), "success");
```

### 4. **Placeholders for Variable Content**
```javascript
// Translation: "Selected: {} / {}"
formatTranslation(t('library.selectedCount'), count, max);
```

### 5. **Reapply Translations on Language Change**
```javascript
languageSelect.addEventListener('change', function() {
    currentLocale = this.value;
    applyTranslations(); // Re-translate all elements
});
```

### 6. **Initialize Translations Early**
```html
<script>
    // Set locale BEFORE DOMContentLoaded
    let currentLocale = 'en';
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('locale')) {
        currentLocale = urlParams.get('locale');
    }
    window.currentLocale = currentLocale;
</script>

<script src="js/translations-wordsearch-complete.js"></script>
```

### 7. **Global Availability**
```javascript
window.t = t;
window.formatTranslation = formatTranslation;
window.applyTranslations = applyTranslations;
```

## Integration with UnifiedLanguageManager

The wordsearch app integrates with `UnifiedLanguageManager` for:
- Automatic border/background theme reloading
- URL parameter management
- Consistent language switching across apps

```javascript
if (window.UnifiedLanguageManager) {
    await window.UnifiedLanguageManager.changeLanguage(newLocale);
    // Manager handles:
    // - Border and background theme reloading
    // - URL parameter updates
    // - Calling applyTranslations()
}
```

## Common Patterns

### Pattern 1: Button with Translation
```html
<button id="generateBtn" data-translate="button.generate">Generate</button>
```

### Pattern 2: Label + Input with Placeholder
```html
<label for="textInput" data-translate="text.content">Content:</label>
<input type="text" id="textInput" data-translate-placeholder="text.placeholder" placeholder="Hello!">
```

### Pattern 3: Select with Translated Options
```html
<select id="languageSelect">
    <option value="en" data-translate="lang_en">English</option>
    <option value="de" data-translate="lang_de">Deutsch (German)</option>
</select>
```

### Pattern 4: Dynamic Message with Placeholder
```javascript
const count = selectedImages.length;
const maxCount = MAX_IMAGES;
// Translation: "Selected {} out of {} images"
const message = formatTranslation(t('library.imageCount'), count, maxCount);
showMessage(message, 'info');
```

### Pattern 5: Conditional Translation
```javascript
const statusText = isComplete
    ? t('message.complete')
    : t('message.incomplete');
```

## File Structure Comparison

### Wordsearch (Complete)
```
translations-wordsearch-complete.js
├── Translation object definition
├── Fallback t() function
├── Fallback formatTranslation() function
└── All 11 languages in one file
```

### Treasure Hunt (Current Implementation)
```
translations-treasure-hunt.js
├── Translation object definition
└── All 11 languages in one file

treasure hunt.html
├── t() function definition in <script> tag
├── formatTranslation() function
└── applyTranslations() function
```

## Summary

The Wordsearch app demonstrates a mature, well-structured translation system with:

✅ **Comprehensive coverage**: All UI elements translatable
✅ **Flexible placeholders**: Support for dynamic content
✅ **Separation of concerns**: Translation data separate from logic
✅ **Graceful fallbacks**: English fallback → key fallback
✅ **Easy maintenance**: Clear naming conventions
✅ **Performance**: One-time load, cached lookups
✅ **Integration**: Works with UnifiedLanguageManager
✅ **Developer-friendly**: Simple API (`t(key)`, `data-translate`)

This system can be replicated across all worksheet generator apps for consistent multilingual support.
