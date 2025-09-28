# MORE LESS TRANSLATION IMPLEMENTATION PLAN

## Overview
Complete translation implementation for the More Less app supporting 11 languages.

### Current State
- **Translation Coverage**: 0% (0 of 178 texts)
- **Existing Infrastructure**: NONE
- **Required Languages**: English, German, French, Spanish, Italian, Portuguese, Dutch, Swedish, Danish, Norwegian, Finnish

## Unique Features to Handle

### 1. Comparison Symbols
- Greater than (>)
- Less than (<)
- Equal (=)
- These may have language-specific representations

### 2. Display Modes
- Illustrations mode
- Normal Symbols mode (>, <, =)

### 3. Exercise Configuration
- 1-8 exercises with proper pluralization
- "1 Exercise" vs "2 Exercises"

## Implementation Steps

### Phase 1: Infrastructure Setup

#### Step 1.1: Add Translation Scripts
```html
<head>
  <!-- Add after existing scripts -->
  <script src="js/translations.js"></script>
  <script src="js/unified-language-manager.js"></script>
</head>
```

#### Step 1.2: Initialize Locale
```javascript
// Add before DOMContentLoaded
<script>
  let currentLocale = 'en';
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('locale')) {
    currentLocale = urlParams.get('locale');
  }
  window.currentLocale = currentLocale;
</script>
```

#### Step 1.3: Add Translation Function
```javascript
function t(key, locale = 'en', params = {}) {
  if (window.UnifiedLanguageManager) {
    return window.UnifiedLanguageManager.translate(key, locale, params);
  }
  // Fallback to key if translation system not loaded
  return key;
}

function formatTranslation(template, params) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params.hasOwnProperty(key) ? params[key] : match;
  });
}
```

### Phase 2: HTML Static Text Replacement

#### Step 2.1: Hero Section (2 replacements)
```html
<!-- Line: DYNAMIC -->
<h1 class="hero-title" data-translate="hero.title">More Less Worksheet</h1>
<p class="hero-subtitle" data-translate="hero.subtitle">Create customizable more/less comparison worksheets</p>
```

#### Step 2.2: Navigation (3 replacements)
```html
<!-- Lines 144-146 -->
<span data-translate="nav.create">Create</span>
<span data-translate="nav.edit">Edit</span>
<span data-translate="nav.export">Export</span>
```

#### Step 2.3: Main Controls (10 replacements)
- Worksheet Title label and placeholder
- Instructions label and placeholder
- Language, Font, Font Size labels
- Generate Worksheet, Generate Answer Key, Reset buttons

#### Step 2.4: More Less Specific Controls (16 replacements)
- Display heading and options (Illustrations, Normal Symbols)
- Exercises heading and options (1-8 exercises)
- Comparison symbols (>, <, =)
- "Choose More/Less Comparison" prompt

### Phase 3: Dynamic Text Replacement

#### Step 3.1: Theme Messages
```javascript
// Replace hardcoded messages
dictionaryEl.innerHTML = `<p class="dictionary-message">${t('themes.select_theme_msg', currentLocale)}</p>`;
```

#### Step 3.2: Button Labels
```javascript
// Add Image button
addButton.textContent = t('themes.add_image', currentLocale);

// Clear All button
clearBtn.textContent = t('themes.clear_all', currentLocale);
```

#### Step 3.3: Error Messages
```javascript
// Replace all showMessage calls
showMessage(t('errors.loading_images', currentLocale), 'error');
showMessage(t('errors.select_theme', currentLocale), 'warning');
```

#### Step 3.4: Success Messages
```javascript
showMessage(t('success.worksheet_generated', currentLocale), 'success');
showMessage(t('success.answer_generated', currentLocale), 'success');
```

### Phase 4: Special Features

#### Step 4.1: Comparison Symbols
```javascript
// In generateComparison function
const symbols = {
  '>': t('symbol.greater', currentLocale),
  '<': t('symbol.less', currentLocale),
  '=': t('symbol.equal', currentLocale)
};
```

#### Step 4.2: Exercise Pluralization
```javascript
// Handle exercise count display
const exerciseText = count === 1 ? 
  t('moreless.exercises.1', currentLocale) : 
  t(`moreless.exercises.${count}`, currentLocale);
```

#### Step 4.3: Dynamic Loading States
```javascript
// Loading messages
showMessage(t('loading.general', currentLocale), 'info');
// Processing
showMessage(t('loading.processing', currentLocale), 'info');
```

### Phase 5: Language Switching

#### Step 5.1: Update Language Select Handler
```javascript
languageSelect.addEventListener('change', function() {
  const newLocale = this.value;
  currentLocale = newLocale;
  
  if (window.UnifiedLanguageManager) {
    window.UnifiedLanguageManager.changeLanguage(newLocale).then(() => {
      // Update all dynamic text
      updateDynamicTranslations();
      // Reload themes with new locale
      loadThemes();
    });
  }
});
```

#### Step 5.2: Create Update Function
```javascript
function updateDynamicTranslations() {
  // Update all dynamically generated text
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = t(key, currentLocale);
  });
  
  // Update placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    element.placeholder = t(key, currentLocale);
  });
  
  // Update titles
  document.querySelectorAll('[data-translate-title]').forEach(element => {
    const key = element.getAttribute('data-translate-title');
    element.title = t(key, currentLocale);
  });
}
```

### Phase 6: Testing & Validation

#### Test URLs
1. English (default): `/more less.html`
2. German: `/more less.html?locale=de`
3. French: `/more less.html?locale=fr`
4. Spanish: `/more less.html?locale=es`
5. Swedish: `/more less.html?locale=sv`

#### Validation Checklist
- [ ] Hero section updates with language
- [ ] All buttons show translated text
- [ ] Display modes show correct translations
- [ ] Exercise counts are properly pluralized
- [ ] Comparison symbols adapt to language
- [ ] Theme dropdowns populate in correct language
- [ ] Error messages appear in selected language
- [ ] Success messages show correctly
- [ ] Border/background themes load with translations
- [ ] Generate functions still work
- [ ] Canvas operations unaffected
- [ ] Download functions operational

## File Structure

```
more-less-app/
├── more less.html (main app file)
├── js/
│   ├── translations.js (global translations)
│   ├── unified-language-manager.js (language system)
│   └── more-less-translations.js (app-specific)
├── more-less-translation-master-template.js (reference)
├── prepare-more-less-for-translation.js (preparation script)
└── MORE-LESS-TRANSLATION-IMPLEMENTATION-PLAN.md (this file)
```

## Common Issues & Solutions

### Issue 1: Translations Not Showing
**Solution**: Ensure translations.js is loaded before app initialization

### Issue 2: Dynamic Text Not Updating
**Solution**: Call updateDynamicTranslations() after language change

### Issue 3: Comparison Symbols Not Translating
**Solution**: Check that symbol replacements are using t() function

### Issue 4: Exercise Count Wrong
**Solution**: Verify pluralization logic matches translation keys

## Migration Commands

```bash
# 1. Backup current file
cp "more less.html" "more less.html.backup"

# 2. Apply translations
node prepare-more-less-for-translation.js

# 3. Test with German
open "more less.html?locale=de"

# 4. Validate all languages
for lang in en de fr es it pt nl sv da no fi; do
  echo "Testing $lang"
  open "more less.html?locale=$lang"
done
```

## Success Criteria

### Translation Coverage
- **Target**: 100% (178 of 178 texts)
- **All 11 languages supported**
- **Dynamic language switching works**
- **No hardcoded English text remains**

### Functional Integrity
- **Worksheet generation works**
- **Answer key generation works**
- **Canvas operations intact**
- **Download functions operational**
- **All interactions responsive**

### Performance
- **Language switch < 1 second**
- **No lag in generation**
- **Smooth UI updates**

## Notes

### Duplicates Consolidated (4 items)
1. "Select a theme" → Single key used everywhere
2. "Loading..." → Shared across all loading states
3. "None" → Used for both border and background
4. "Canvas cleared" → Shared between toolbar and general messages

### Special Considerations
1. **Comparison symbols**: May need RTL support for Arabic/Hebrew in future
2. **Exercise pluralization**: Different rules per language
3. **Display modes**: Consider icon representation for better UX
4. **Theme names**: Will come translated from API

## Completion Status
- [x] Master template created (178 keys)
- [x] Preparation script ready
- [x] Implementation plan documented
- [ ] HTML replacements applied
- [ ] JavaScript functions added
- [ ] Language switching implemented
- [ ] All languages tested
- [ ] Documentation updated

---

**Created**: December 2024
**App**: More Less Worksheet Generator
**Coverage**: 0% → 100% (178 texts)
**Languages**: 11 (EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI)