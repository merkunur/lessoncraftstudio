# ODD ONE OUT TRANSLATION IMPLEMENTATION PLAN

## Overview
Complete translation implementation for the Odd One Out app supporting 11 languages.

### Current State
- **Translation Coverage**: 1.1% (2 of 184 texts)
- **Existing Infrastructure**: MINIMAL (only 2 data-translate attributes)
- **Required Languages**: English, German, French, Spanish, Italian, Portuguese, Dutch, Swedish, Danish, Norwegian, Finnish

## Unique Features to Handle

### 1. Selection Modes
- **Identical Mode**: 3 common + 1 odd from SAME theme
- **Similar Mode**: 3 common from Theme A + 1 odd from Theme B
- Per-exercise mode override capability

### 2. Dual Theme System
- Theme A: Primary theme for common images
- Theme B: Secondary theme for odd images (Similar mode only)

### 3. Exercise Configuration
- 5-10 exercises selectable
- Individual exercise customization
- Clear selections per exercise

### 4. Image Selection UI
- Common Images (3): Visual selection area
- Odd Image (1): Separate selection area
- Click-to-add functionality from available images

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

#### Step 2.1: Page Title & Headers (2 replacements)
```html
<!-- Line 5 -->
<title data-translate="oddoneout.page.title">Odd-One-Out Worksheet Generator</title>

<!-- Line 740 -->
<span data-translate="oddoneout.title">Odd One Out</span>
```

#### Step 2.2: Accordion Headers (5 replacements - line 746 already done)
```html
<!-- Lines 766, 810, 834, 874, 896 -->
<span data-translate="oddoneout.page.setup">Page Setup</span>
<span data-translate="oddoneout.text.tools">Text Tools</span>
<span data-translate="oddoneout.exercise.config">Exercise Configuration</span>
<span data-translate="oddoneout.image.library">Image Library</span>
<span data-translate="oddoneout.upload.custom">Upload Custom Images</span>
```

#### Step 2.3: Language Options (11 replacements)
```html
<!-- Lines 750-760 -->
<option value="en" selected data-translate="language.english">English</option>
<option value="de" data-translate="language.german">Deutsch</option>
<!-- Continue for all languages -->
```

#### Step 2.4: Exercise Mode Options (Special Attention)
```html
<!-- Lines 848, 849 -->
<option value="identical" data-translate="oddoneout.mode.identical">
  Identical (3 + 1 from same theme)
</option>
<option value="similar" data-translate="oddoneout.mode.similar">
  Similar (3 from Theme A, 1 from Theme B)
</option>
```

### Phase 3: Dynamic Text Replacement

#### Step 3.1: Theme Selection Labels
```javascript
// Update theme labels dynamically
document.querySelector('label[for="themeASelect"]').innerHTML =
  t('oddoneout.theme.a', currentLocale);
document.querySelector('label[for="themeBSelect"]').innerHTML =
  t('oddoneout.theme.b', currentLocale);
```

#### Step 3.2: Exercise Numbers
```javascript
// In exercise generation loop
const exerciseLabel = t('oddoneout.exercise.number', currentLocale, {number: i + 1});
```

#### Step 3.3: Loading Messages
```javascript
// Replace all console.log and alert messages
showMessage(t('oddoneout.loading.images', currentLocale), 'info');
showMessage(t('oddoneout.msg.generating', currentLocale), 'info');
```

#### Step 3.4: Error Messages
```javascript
// Error handling
alert(t('oddoneout.msg.insufficient.theme', currentLocale, {
  theme: themeA,
  row: i + 1
}));

alert(t('oddoneout.msg.no.unique.odd', currentLocale, {row: i + 1}));
```

### Phase 4: Mode-Specific Translations

#### Step 4.1: Mode Descriptions
```javascript
// Update mode descriptions dynamically
function updateModeDescription(mode) {
  const description = mode === 'identical' ?
    t('oddoneout.mode.identical', currentLocale) :
    t('oddoneout.mode.similar', currentLocale);
  // Update UI with description
}
```

#### Step 4.2: Theme B Visibility
```javascript
// Show/hide Theme B based on mode
function updateThemeBVisibility(mode) {
  const themeBSection = document.getElementById('themeBSection');
  if (mode === 'similar') {
    themeBSection.style.display = 'block';
    // Update label with translation
    themeBSection.querySelector('label').textContent =
      t('oddoneout.theme.b', currentLocale);
  } else {
    themeBSection.style.display = 'none';
  }
}
```

### Phase 5: Image Selection UI

#### Step 5.1: Selection Headers
```javascript
// Common and Odd image headers
document.querySelector('.common-images-header').textContent =
  t('oddoneout.common.images', currentLocale);
document.querySelector('.odd-image-header').textContent =
  t('oddoneout.odd.image', currentLocale);
```

#### Step 5.2: Upload Status Messages
```javascript
// Upload feedback
const uploadCount = uploadedImages.length;
showMessage(t('oddoneout.msg.uploads.available', currentLocale, {
  count: uploadCount
}), 'success');
```

### Phase 6: Language Switching

#### Step 6.1: Update Language Select Handler
```javascript
languageSelect.addEventListener('change', function() {
  const newLocale = this.value;
  currentLocale = newLocale;

  if (window.UnifiedLanguageManager) {
    window.UnifiedLanguageManager.changeLanguage(newLocale).then(() => {
      // Update all dynamic text
      updateDynamicTranslations();
      // Update mode descriptions
      updateModeDescriptions();
      // Reload themes with new locale
      loadThemes();
    });
  }
});
```

#### Step 6.2: Create Update Functions
```javascript
function updateDynamicTranslations() {
  // Update all data-translate elements
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = t(key, currentLocale);
  });

  // Update placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    element.placeholder = t(key, currentLocale);
  });
}

function updateModeDescriptions() {
  // Update mode option texts
  const identicalOption = document.querySelector('option[value="identical"]');
  const similarOption = document.querySelector('option[value="similar"]');

  if (identicalOption) {
    identicalOption.textContent = t('oddoneout.mode.identical', currentLocale);
  }
  if (similarOption) {
    similarOption.textContent = t('oddoneout.mode.similar', currentLocale);
  }
}
```

### Phase 7: Testing & Validation

#### Test URLs
1. English (default): `/odd one out.html`
2. German: `/odd one out.html?locale=de`
3. French: `/odd one out.html?locale=fr`
4. Spanish: `/odd one out.html?locale=es`
5. Swedish: `/odd one out.html?locale=sv`

#### Validation Checklist
- [ ] Page title updates with language
- [ ] All accordion headers translated
- [ ] Language dropdown shows correct names
- [ ] Mode descriptions properly translated
- [ ] Theme A/B labels update correctly
- [ ] Exercise numbers show in selected language
- [ ] Common/Odd image labels translated
- [ ] Error messages appear in selected language
- [ ] Success messages show correctly
- [ ] Upload feedback in correct language
- [ ] Generation still works
- [ ] Answer key generation operational
- [ ] Download functions work
- [ ] Mode switching updates Theme B visibility
- [ ] Per-exercise configuration intact

## File Structure

```
odd-one-out-app/
├── odd one out.html (main app file)
├── js/
│   ├── translations.js (global translations)
│   ├── unified-language-manager.js (language system)
│   └── odd-one-out-translations.js (app-specific)
├── odd-one-out-translation-master-template.js (reference)
├── prepare-odd-one-out-for-translation.js (preparation script)
└── ODD-ONE-OUT-TRANSLATION-IMPLEMENTATION-PLAN.md (this file)
```

## Special Considerations

### 1. Mode Terminology
- "Identical" and "Similar" are core concepts
- May need explanation tooltips in some languages
- Consider using icons to reinforce meaning

### 2. Theme A/B Naming
- Consider more descriptive names in translations
- "Primary Theme" and "Secondary Theme" alternatives
- Context-aware translations based on mode

### 3. Image Selection Feedback
- "3 common" and "1 odd" are fixed requirements
- Visual indicators should supplement text
- Clear feedback when selection complete

### 4. Exercise Numbering
- Different languages may have different numbering formats
- Consider RTL languages in future
- Maintain consistency across worksheet and answer key

## Common Issues & Solutions

### Issue 1: Mode Descriptions Too Long
**Solution**: Use abbreviated versions for dropdown, full descriptions in help text

### Issue 2: Theme B Not Hiding
**Solution**: Ensure mode change handler updates visibility AND translations

### Issue 3: Exercise Numbers Not Updating
**Solution**: Call updateDynamicTranslations() after exercise count change

### Issue 4: Upload Messages Not Showing
**Solution**: Check that message display function handles parameterized translations

## Migration Commands

```bash
# 1. Backup current file
cp "odd one out.html" "odd one out.html.backup"

# 2. Apply translations
node prepare-odd-one-out-for-translation.js

# 3. Test with German
open "odd one out.html?locale=de"

# 4. Validate all languages
for lang in en de fr es it pt nl sv da no fi; do
  echo "Testing $lang"
  open "odd one out.html?locale=$lang"
done
```

## Success Criteria

### Translation Coverage
- **Target**: 100% (184 of 184 texts)
- **All 11 languages supported**
- **Dynamic language switching works**
- **No hardcoded English text remains**

### Functional Integrity
- **Worksheet generation works**
- **Answer key generation works**
- **Mode switching functional**
- **Theme selection operational**
- **Upload feature intact**
- **Download functions work**

### Performance
- **Language switch < 1 second**
- **No lag in mode switching**
- **Image loading unaffected**
- **Smooth UI updates**

## Notes

### Duplicates Consolidated (7 items)
1. "None" → Single key for border/background
2. "Preparing JPEG..." → Shared across downloads
3. "Preparing PDF..." → Shared across downloads
4. Mode descriptions → Used in multiple places
5. Canvas empty message → Used twice
6. PDF download messages → Consolidated
7. Error messages → Simplified versions share keys

### Unique App Features
1. **Dual mode system**: Most complex translation aspect
2. **Theme A/B concept**: Needs clear explanation
3. **Per-exercise override**: Complex UI interaction
4. **Visual selection areas**: 3+1 pattern unique to this app
5. **Upload integration**: Session-based custom images

## Completion Status
- [x] Master template created (184 keys)
- [x] Preparation script ready
- [x] Implementation plan documented
- [ ] HTML replacements applied
- [ ] JavaScript functions added
- [ ] Mode-specific logic updated
- [ ] Language switching implemented
- [ ] All languages tested
- [ ] Documentation updated

---

**Created**: December 2024
**App**: Odd One Out Worksheet Generator
**Coverage**: 1.1% → 100% (184 texts)
**Languages**: 11 (EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI)
**Unique Features**: Identical/Similar modes, Theme A/B, Per-exercise config