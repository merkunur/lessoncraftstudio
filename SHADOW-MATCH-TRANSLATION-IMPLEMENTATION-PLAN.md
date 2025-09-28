# SHADOW MATCH TRANSLATION IMPLEMENTATION PLAN

## Overview
Complete translation implementation for the Shadow Match app supporting 11 languages.

### Current State
- **Translation Coverage**: 2.6% (4 of 156 texts)
- **Existing Infrastructure**: MINIMAL - only 4 elements have data-translate
- **Required Languages**: English, German, French, Spanish, Italian, Portuguese, Dutch, Swedish, Danish, Norwegian, Finnish

## Unique Features to Handle

### 1. Shadow Matching Concept
- Match images to their silhouettes/shadows
- Creates black shadows from any image
- Shadows are rotated 180 degrees (upside-down)
- Visual puzzle requiring spatial reasoning

### 2. Fixed 4-Image System
- Always uses exactly 4 images
- Images labeled A, B, C, D
- Shadows labeled 1, 2, 3, 4
- Answer key shows mapping (e.g., A→2, B→4, C→1, D→3)

### 3. Derangement Algorithm
- Ensures no shadow matches its original position
- Complete derangement: every shadow is in a different position
- Mathematical guarantee of puzzle validity

### 4. Label System
- Optional A/B/C/D labels for original images
- Optional 1/2/3/4 labels for shadow positions
- Labels can be toggled on/off
- Labels help with answer key reference

### 5. Silhouette Generation
- Converts any image to black silhouette
- Preserves shape and outline
- Removes all color and detail
- Rotates 180 degrees for added difficulty

### 6. Watermark System
- Free tier watermarking
- "FREE VERSION - LessonCraftStudio.com"
- Appears on PDF/JPEG exports

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

### Phase 2: HTML Static Text Replacement (92 replacements)

#### Step 2.1: Page Title & Headers (3 replacements)
```html
<!-- Line 5 -->
<title data-translate="shadow.match.page.title">Shadow Match Worksheet Generator</title>

<!-- Line 697 -->
<span data-translate="shadow.match.settings">Worksheet Settings</span>

<!-- Line 704 - Already has data-translate -->
<span data-translate="shadowMatch">Shadow Match</span>
```

#### Step 2.2: Accordion Headers (5 replacements)
```html
<!-- Lines 728, 766, 790, 802, 817 -->
<span data-translate="shadow.match.page.setup">Page Setup</span>
<span data-translate="shadow.match.text.tools">Text Tools</span>
<span data-translate="shadow.match.exercise.config">Exercise Configuration</span>
<span data-translate="shadow.match.image.library">Image Library</span>
<span data-translate="shadow.match.upload.custom">Upload Custom Images</span>
```

#### Step 2.3: Language Section (12 replacements)
```html
<!-- Lines 706-707 already have data-translate -->
<!-- Lines 709-719 -->
<option value="en" selected data-translate="language.english">English</option>
<option value="de" data-translate="language.german.full">Deutsch (German)</option>
<option value="fr" data-translate="language.french.full">Français (French)</option>
<!-- Continue for all 11 languages -->

<!-- Line 722 -->
<div data-translate="shadow.match.language.info">Image names and themes will be displayed in the selected language.</div>
```

#### Step 2.4: Exercise Configuration (2 replacements)
```html
<!-- Line 793 -->
<span data-translate="shadow.match.show.labels">Show A/B/C and 1/2/3 Labels</span>

<!-- Line 796 -->
<span data-translate="shadow.match.include.name.date">Include Name/Date Fields</span>
```

### Phase 3: Dynamic Text Replacement (64 JavaScript messages)

#### Step 3.1: Theme Loading Messages
```javascript
// All Themes option
allOption.textContent = t('allThemes', currentLocale);

// Error loading themes
console.error(t('shadow.match.msg.themes.error', currentLocale));

// Loading default theme
dictDiv.textContent = t('shadow.match.msg.loading.default', currentLocale);

// Searching
dictDiv.textContent = t('shadow.match.msg.searching', currentLocale);

// No images found
dictDiv.textContent = t('shadow.match.msg.no.images', currentLocale, {query});
```

#### Step 3.2: Selection Messages
```javascript
// Max images selected
alert(t('shadow.match.msg.max.images', currentLocale, {
  SELECT_COUNT: 4
}));

// Selection counter
counter.textContent = t('shadow.match.selected.format', currentLocale, {
  count: selectedCount,
  SELECT_COUNT: 4
});

// Auto-filling
console.log(t('shadow.match.msg.auto.filling', currentLocale));

// Insufficient images
alert(t('shadow.match.msg.insufficient.images', currentLocale, {
  SELECT_COUNT: 4,
  count: availableCount
}));
```

#### Step 3.3: Generation Messages
```javascript
// Worksheet generated
showMessage(t('shadow.match.msg.worksheet.generated', currentLocale), 'success');

// Generate first
alert(t('shadow.match.msg.generate.first', currentLocale));

// Answer key generated
showMessage(t('shadow.match.msg.answer.generated', currentLocale), 'success');

// Form cleared
showMessage(t('shadow.match.msg.form.cleared', currentLocale), 'info');
```

#### Step 3.4: Name/Date Fields
```javascript
// Add name and date fields if enabled
if (includeDateName) {
  const nameText = t('shadow.match.name.field', currentLocale);
  const dateText = t('shadow.match.date.field', currentLocale);
  
  ctx.fillText(nameText, 50, 50);
  ctx.fillText(dateText, canvas.width - 200, 50);
}
```

#### Step 3.5: Watermark Text
```javascript
// Main watermark
const watermarkMain = t('shadow.match.watermark.main', currentLocale);
ctx.fillText(watermarkMain, canvas.width / 2, canvas.height - 50);

// Small watermark
const watermarkSmall = t('shadow.match.watermark.small', currentLocale);
ctx.fillText(watermarkSmall, 10, 10);
```

#### Step 3.6: Download Messages
```javascript
// Preparing download
showMessage(t('shadow.match.msg.preparing', currentLocale, {
  canvasName: 'worksheet'
}), 'info');

// Download initiated
showMessage(t('shadow.match.msg.download.initiated', currentLocale), 'success');

// Error preparing
showMessage(t('shadow.match.msg.image.error', currentLocale, {
  message: error.message
}), 'error');

// PDF messages
showMessage(t('shadow.match.msg.preparing.pdf', currentLocale), 'info');
showMessage(t('shadow.match.msg.pdf.downloaded', currentLocale), 'success');
showMessage(t('shadow.match.msg.pdf.error', currentLocale), 'error');
```

### Phase 4: Shadow Match Specific Features

#### Step 4.1: Label Generation
```javascript
// A/B/C/D labels are universal, may not need translation
// But the toggle label needs translation
function getToggleLabel() {
  return t('shadow.match.show.labels', currentLocale);
}
```

#### Step 4.2: Shadow Creation
```javascript
// Shadow generation is visual only, no text needed
// The process creates black silhouettes programmatically
function createShadow(imageElement) {
  // Convert to black silhouette
  // Rotate 180 degrees
  // No translation needed for this process
}
```

#### Step 4.3: Derangement Algorithm
```javascript
// Mathematical algorithm, no translation needed
// Ensures complete derangement of positions
function derangement(arr) {
  // Algorithm implementation
  // No text output requiring translation
}
```

#### Step 4.4: Answer Key Format
```javascript
// Answer key shows mappings like "A→2"
// Arrow symbol is universal, letters/numbers don't need translation
function formatAnswerKey(mapping) {
  // A→2, B→4, C→1, D→3
  // Format is visual and mathematical
}
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
      // Update selection counter
      updateSelectionCounter();
      // Reload themes with new locale
      loadThemes();
      // Update placeholders
      updatePlaceholders();
    });
  }
});
```

#### Step 5.2: Create Update Functions
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

function updateSelectionCounter() {
  const counter = document.getElementById('selectionCounter');
  if (counter) {
    const count = getSelectedCount();
    counter.textContent = t('shadow.match.selected.format', currentLocale, {
      count: count,
      SELECT_COUNT: 4
    });
  }
}

function updatePlaceholders() {
  const uploadedDiv = document.getElementById('uploadedImages');
  if (uploadedDiv && !uploadedDiv.querySelector('.uploaded-image')) {
    uploadedDiv.textContent = t('shadow.match.uploaded.placeholder', currentLocale);
  }
}
```

### Phase 6: Testing & Validation

#### Test URLs
1. English (default): `/shadow match.html`
2. German: `/shadow match.html?locale=de`
3. French: `/shadow match.html?locale=fr`
4. Spanish: `/shadow match.html?locale=es`
5. Swedish: `/shadow match.html?locale=sv`

#### Validation Checklist
- [ ] Page title updates with language
- [ ] All accordion headers translated
- [ ] Language dropdown shows correct names
- [ ] Exercise configuration labels translate
- [ ] A/B/C and 1/2/3 label toggle translates
- [ ] Theme selectors translate
- [ ] Search placeholder translates
- [ ] Selection counter updates ("Selected: X / 4")
- [ ] Generation messages in selected language
- [ ] Error messages show properly
- [ ] Watermarks appear in correct language
- [ ] PDF/JPEG download messages translated
- [ ] Name/Date fields translate
- [ ] Border/background messages appear
- [ ] Upload section translates
- [ ] Shadow generation still works correctly

## File Structure

```
shadow-match-app/
├── shadow match.html (main app file)
├── js/
│   ├── translations.js (global translations)
│   ├── unified-language-manager.js (language system)
│   └── shadow-match-translations.js (app-specific)
├── shadow-match-translation-master-template.js (reference)
├── prepare-shadow-match-for-translation.js (preparation script)
└── SHADOW-MATCH-TRANSLATION-IMPLEMENTATION-PLAN.md (this file)
```

## Special Considerations

### 1. Shadow Matching Concept
- Unique puzzle type requiring spatial reasoning
- Visual nature means less text dependency
- Labels (A/B/C/D and 1/2/3/4) are universal
- Arrow symbol (→) in answer key is universal

### 2. Fixed 4-Image Constraint
- Always exactly 4 images
- UI should reflect this constraint
- Selection counter always shows "X / 4"
- Auto-fill when less than 4 selected

### 3. Derangement Algorithm
- Mathematical concept that may need explanation
- Ensures puzzle has valid solution
- No shadow matches its original position
- Core algorithm doesn't need translation

### 4. Silhouette Generation
- Purely visual transformation
- No text involved in shadow creation
- 180-degree rotation is mathematical
- Process is language-independent

### 5. Label System
- A/B/C/D are universal for original images
- 1/2/3/4 are universal for shadow positions
- Only the toggle checkbox label needs translation
- Answer key format (A→2) is visual/mathematical

## Common Issues & Solutions

### Issue 1: Language Names Format
**Problem**: Shows both native and English names (e.g., "Deutsch (German)")
**Solution**: Use full format keys like `language.german.full` for clarity

### Issue 2: Selection Counter Not Updating
**Solution**: Ensure counter update function is called on language change

### Issue 3: Shadow Generation Breaking
**Solution**: Shadow generation is visual only - ensure no text dependencies

### Issue 4: Watermark Text Overflow
**Solution**: Adjust font size based on text length for each language

### Issue 5: Labels Not Translating
**Solution**: Only the toggle label needs translation, A/B/C/D and 1/2/3/4 are universal

## Migration Commands

```bash
# 1. Backup current file
cp "shadow match.html" "shadow match.html.backup"

# 2. Apply translations
node prepare-shadow-match-for-translation.js

# 3. Test with German
open "shadow match.html?locale=de"

# 4. Validate all languages
for lang in en de fr es it pt nl sv da no fi; do
  echo "Testing $lang"
  open "shadow match.html?locale=$lang"
done
```

## Success Criteria

### Translation Coverage
- **Target**: 100% (156 of 156 texts)
- **All 11 languages supported**
- **Dynamic language switching works**
- **No hardcoded English text remains**

### Functional Integrity
- **Shadow generation works**
- **Derangement algorithm functions**
- **4-image selection enforced**
- **Labels toggle correctly**
- **Answer key generates properly**
- **Upload feature intact**
- **Download functions work**

### Performance
- **Language switch < 1 second**
- **Shadow generation instant**
- **No lag in image selection**
- **Smooth canvas operations**
- **Quick PDF generation**

## Notes

### Duplicates Consolidated (6 items)
1. "None" → common.none
2. "Loading..." → shadow.match.msg.loading
3. "Error." → shadow.match.msg.error
4. "Your uploaded images will appear here." → shadow.match.uploaded.placeholder
5. "Select a theme to see borders." → shadow.match.border.message
6. "Loading images..." → shadow.match.loading.images

### Unique App Features
1. **Shadow matching concept**: Visual puzzle with silhouettes
2. **Fixed 4 images**: Always exactly 4 images required
3. **Derangement algorithm**: Mathematical guarantee of validity
4. **180-degree rotation**: Shadows are upside-down
5. **Universal labels**: A/B/C/D and 1/2/3/4 don't need translation
6. **Visual answer key**: A→2 format is mathematical
7. **Silhouette generation**: Black shadows from any image
8. **Watermark system**: Free tier branding

## Completion Status
- [x] Master template created (150 unique keys)
- [x] Preparation script ready (156 replacements)
- [x] Implementation plan documented
- [ ] HTML replacements applied
- [ ] JavaScript functions added
- [ ] Shadow-specific logic verified
- [ ] Language switching implemented
- [ ] All languages tested
- [ ] Documentation updated

---

**Created**: December 2024
**App**: Shadow Match Worksheet Generator
**Coverage**: 2.6% → 100% (156 texts)
**Languages**: 11 (EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI)
**Unique Features**: Shadow silhouettes, Derangement algorithm, Fixed 4 images, Universal labels