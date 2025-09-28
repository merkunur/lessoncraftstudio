# PICTURE SORT TRANSLATION IMPLEMENTATION PLAN

## Overview
Complete translation implementation for the Picture Sort app supporting 11 languages.

### Current State
- **Translation Coverage**: 1.3% (2 of 150 texts)
- **Existing Infrastructure**: MINIMAL - only 2 elements have data-translate
- **Required Languages**: English, German, French, Spanish, Italian, Portuguese, Dutch, Swedish, Danish, Norwegian, Finnish

## Unique Features to Handle

### 1. Dual Mode System
- **Manual Selection**: Browse and select images individually
- **Automatic Generation**: Theme-based auto-generation for left/right categories
- Mode switching affects UI and functionality

### 2. Category System
- **Left Category**: First sorting category with theme option
- **Right Category**: Second sorting category with theme option
- Visual indicators (← Left, → Right)
- Dashed border frames for sorted items

### 3. Image Management
- Maximum 12 images for optimal layout
- Count tracking: "Left: X | Right: Y | Total: Z/12"
- Category assignment for each image
- Clear visual feedback on selection

### 4. Worksheet Layout
- Category frames at top (2 dashed rectangles)
- Cutout grid at bottom with all images
- Smart grid calculation based on item count
- Optional name/date fields

### 5. Answer Key
- Shows correctly sorted images in categories
- Each image independently editable
- Maintains worksheet structure
- Clear visual distinction

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

### Phase 2: HTML Static Text Replacement (79 replacements)

#### Step 2.1: Page Title & Headers (2 replacements)
```html
<!-- Line 6 -->
<title data-translate="picture.sort.page.title">Picture-Sort Worksheet Generator</title>

<!-- Line 494 - Already has data-translate -->
<h1 class="hero-title" data-translate="picture.sort.settings">Sort Settings</h1>
```

#### Step 2.2: Accordion Headers (5 replacements)
```html
<!-- Lines 517, 529, 549, 561, 600 -->
<span data-translate="picture.sort.sorting.categories">Sorting Categories</span>
<span data-translate="picture.sort.image.library">Image Library</span>
<span data-translate="picture.sort.upload.custom">Upload Custom Images</span>
<span data-translate="picture.sort.page.setup">Page Setup</span>
<span data-translate="picture.sort.text.tools">Text Tools</span>
```

#### Step 2.3: Language Options (12 replacements)
```html
<!-- Lines 499-511 -->
<label for="languageSelect" data-translate="picture.sort.language.label">Language</label>
<option value="en" selected data-translate="language.english">English</option>
<option value="de" data-translate="language.german">Deutsch</option>
<!-- Continue for all 11 languages -->
```

#### Step 2.4: Sorting Categories (3 replacements)
```html
<!-- Lines 519-523 -->
<h3 data-translate="picture.sort.auto.generation">Automatic Generation (Optional)</h3>
<label for="leftThemeSelect" data-translate="picture.sort.left.category.theme">Left Category Theme</label>
<label for="rightThemeSelect" data-translate="picture.sort.right.category.theme">Right Category Theme</label>
```

#### Step 2.5: Category Assignment Buttons
```html
<!-- Dynamic creation in JavaScript -->
<button data-translate="picture.sort.left.category">← Left Category</button>
<button data-translate="picture.sort.right.category">→ Right Category</button>
```

### Phase 3: Dynamic Text Replacement (71 JavaScript messages)

#### Step 3.1: Count Display Format
```javascript
// Update count display
function updateCountDisplay() {
  const countText = t('picture.sort.count.format', currentLocale, {
    left: leftCount,
    right: rightCount,
    total: totalCount,
    max: MAX_TOTAL_IMAGES
  });
  countInfo.textContent = countText;
}
```

#### Step 3.2: Theme Selection Messages
```javascript
// Manual selection option
const manualOption = document.createElement('option');
manualOption.value = 'manual';
manualOption.textContent = t('picture.sort.manual.selection', currentLocale);

// All themes option
const allThemesOption = document.createElement('option');
allThemesOption.value = 'all';
allThemesOption.textContent = t('picture.sort.themes.all', currentLocale);
```

#### Step 3.3: Loading Messages
```javascript
// Loading themes
showMessage(t('picture.sort.msg.loading.themes', currentLocale), 'info');

// Loading specific theme
dictDiv.textContent = t('picture.sort.msg.loading.theme.images', currentLocale, {
  theme: themeName
});

// Searching
dictDiv.textContent = t('picture.sort.msg.searching', currentLocale);

// No images found
dictDiv.textContent = t('picture.sort.msg.no.images', currentLocale);
```

#### Step 3.4: Selection Constraints
```javascript
// Maximum images reached
if (totalCount >= MAX_TOTAL_IMAGES) {
  alert(t('picture.sort.msg.max.images', currentLocale, {
    MAX_TOTAL_IMAGES
  }));
  return;
}

// Placeholder for selected images
selectedDiv.textContent = t('picture.sort.selected.placeholder', currentLocale);
```

#### Step 3.5: Generation Messages
```javascript
// Worksheet updated
showMessage(t('picture.sort.msg.worksheet.updated', currentLocale), 'success');

// Generate first
alert(t('picture.sort.msg.generate.first', currentLocale));

// Generating from themes
showMessage(t('picture.sort.msg.generating.themes', currentLocale), 'info');

// Insufficient images in theme
alert(t('picture.sort.msg.theme.insufficient', currentLocale, {
  theme: themeName,
  min: minImages
}));
```

#### Step 3.6: Watermark Text
```javascript
// Main watermark
const watermarkMain = t('picture.sort.watermark.main', currentLocale);
ctx.fillText(watermarkMain, canvas.width / 2, canvas.height - 50);

// Small watermark
const watermarkSmall = t('picture.sort.watermark.small', currentLocale);
ctx.fillText(watermarkSmall, 10, 10);
```

### Phase 4: Category-Specific Features

#### Step 4.1: Category Labels
```javascript
// Create category buttons with translations
function createCategoryButtons(imageElement) {
  const leftBtn = document.createElement('button');
  leftBtn.textContent = t('picture.sort.left.category', currentLocale);
  leftBtn.onclick = () => assignToCategory(imageElement, 'left');

  const rightBtn = document.createElement('button');
  rightBtn.textContent = t('picture.sort.right.category', currentLocale);
  rightBtn.onclick = () => assignToCategory(imageElement, 'right');

  return { leftBtn, rightBtn };
}
```

#### Step 4.2: Name/Date Fields
```javascript
// Add name and date fields if enabled
if (includeDateName) {
  const nameText = t('picture.sort.name.field', currentLocale);
  const dateText = t('picture.sort.date.field', currentLocale);

  ctx.fillText(nameText, 50, 50);
  ctx.fillText(dateText, canvas.width - 200, 50);
}
```

#### Step 4.3: Grid Layout Calculation
```javascript
// Smart grid calculation remains the same
// But status messages translate
function calculateGrid(itemCount) {
  // Grid calculation logic...
  console.log(t('picture.sort.msg.grid.calculated', currentLocale, {
    rows: rows,
    cols: cols
  }));
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
      // Update count display
      updateCountDisplay();
      // Update category labels
      updateCategoryLabels();
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

function updateCountDisplay() {
  const countInfo = document.getElementById('countInfo');
  if (countInfo) {
    const counts = getImageCounts();
    countInfo.textContent = t('picture.sort.count.format', currentLocale, {
      left: counts.left,
      right: counts.right,
      total: counts.total,
      max: MAX_TOTAL_IMAGES
    });
  }
}

function updateCategoryLabels() {
  // Update all category buttons
  document.querySelectorAll('.category-left').forEach(btn => {
    btn.textContent = t('picture.sort.left.category', currentLocale);
  });
  document.querySelectorAll('.category-right').forEach(btn => {
    btn.textContent = t('picture.sort.right.category', currentLocale);
  });
}

function updatePlaceholders() {
  const selectedDiv = document.getElementById('selectedImages');
  const uploadedDiv = document.getElementById('uploadedImages');

  if (selectedDiv && !selectedDiv.querySelector('.selected-image')) {
    selectedDiv.textContent = t('picture.sort.selected.placeholder', currentLocale);
  }

  if (uploadedDiv && !uploadedDiv.querySelector('.uploaded-image')) {
    uploadedDiv.textContent = t('picture.sort.uploaded.placeholder', currentLocale);
  }
}
```

### Phase 6: Testing & Validation

#### Test URLs
1. English (default): `/picture sort.html`
2. German: `/picture sort.html?locale=de`
3. French: `/picture sort.html?locale=fr`
4. Spanish: `/picture sort.html?locale=es`
5. Swedish: `/picture sort.html?locale=sv`

#### Validation Checklist
- [ ] Page title updates with language
- [ ] All accordion headers translated
- [ ] Language dropdown shows correct names
- [ ] Category labels display correctly
- [ ] Count format updates dynamically
- [ ] Theme selectors translate
- [ ] Search placeholder translates
- [ ] Selection messages appear
- [ ] Generation messages in selected language
- [ ] Error messages show properly
- [ ] Watermarks appear in correct language
- [ ] PDF/JPEG download messages translated
- [ ] Name/Date fields translate
- [ ] Border/background messages appear
- [ ] Upload section translates

## File Structure

```
picture-sort-app/
├── picture sort.html (main app file)
├── js/
│   ├── translations.js (global translations)
│   ├── unified-language-manager.js (language system)
│   └── picture-sort-translations.js (app-specific)
├── picture-sort-translation-master-template.js (reference)
├── prepare-picture-sort-for-translation.js (preparation script)
└── PICTURE-SORT-TRANSLATION-IMPLEMENTATION-PLAN.md (this file)
```

## Special Considerations

### 1. Dual Mode System
- Clear distinction between manual and automatic modes
- Mode affects available options and UI state
- Theme selection enables/disables manual selection
- Translations must clarify the relationship

### 2. Category Assignment
- Left/Right terminology may need cultural adaptation
- Visual indicators (arrows) are universal
- Category frames use dashed borders for clarity
- Assignment feedback must be immediate

### 3. Count Management
- Format: "Left: X | Right: Y | Total: Z/12"
- Dynamic updates on every change
- Clear maximum indicator
- Warning when limit reached

### 4. Grid Layout
- Automatic calculation based on item count
- Cutout grid at bottom for all images
- Smart spacing and centering
- No text needed for grid itself

### 5. Answer Key
- Same structure as worksheet
- Images in correct categories
- Each image independently editable
- Visual distinction from worksheet

## Common Issues & Solutions

### Issue 1: Category Labels Too Long
**Solution**: Use abbreviated forms or icons alongside text

### Issue 2: Count Format Breaking Layout
**Solution**: Adjust format for longer translations, consider vertical layout

### Issue 3: Theme Selection Confusion
**Solution**: Add visual indicators for manual vs automatic modes

### Issue 4: Watermark Text Overflow
**Solution**: Adjust font size based on text length for each language

### Issue 5: Grid Layout With Different Text Lengths
**Solution**: Calculate layout based on actual rendered text width

## Migration Commands

```bash
# 1. Backup current file
cp "picture sort.html" "picture sort.html.backup"

# 2. Apply translations
node prepare-picture-sort-for-translation.js

# 3. Test with German
open "picture sort.html?locale=de"

# 4. Validate all languages
for lang in en de fr es it pt nl sv da no fi; do
  echo "Testing $lang"
  open "picture sort.html?locale=$lang"
done
```

## Success Criteria

### Translation Coverage
- **Target**: 100% (150 of 150 texts)
- **All 11 languages supported**
- **Dynamic language switching works**
- **No hardcoded English text remains**

### Functional Integrity
- **Worksheet generation works**
- **Answer key generation works**
- **Category assignment functional**
- **Image selection operational**
- **Count tracking accurate**
- **Upload feature intact**
- **Download functions work**

### Performance
- **Language switch < 1 second**
- **No lag in image selection**
- **Category assignment instant**
- **Count updates immediate**
- **Smooth UI transitions**

## Notes

### Duplicates Consolidated (7 items)
1. "None" → common.none
2. "Grayscale" → common.grayscale
3. Font names → Shared across text tools
4. "Your uploaded images will appear here." → Single key
5. "Select a theme to see borders/backgrounds." → Separate keys
6. "Manually selected images will appear here." → Single key
7. "Canvas not available." → Single key

### Unique App Features
1. **Dual mode system**: Manual vs automatic generation
2. **Left/Right categories**: Binary sorting system
3. **12 image maximum**: Optimal worksheet layout
4. **Category frames**: Dashed border rectangles
5. **Cutout grid**: Bottom section for cutting
6. **Smart grid**: Automatic layout calculation
7. **Individual editing**: Each answer key image editable
8. **Watermark system**: Free tier branding

## Completion Status
- [x] Master template created (143 unique keys)
- [x] Preparation script ready (150 replacements)
- [x] Implementation plan documented
- [ ] HTML replacements applied
- [ ] JavaScript functions added
- [ ] Category-specific logic updated
- [ ] Language switching implemented
- [ ] All languages tested
- [ ] Documentation updated

---

**Created**: December 2024
**App**: Picture Sort Worksheet Generator
**Coverage**: 1.3% → 100% (150 texts)
**Languages**: 11 (EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI)
**Unique Features**: Dual mode, Category sorting, Smart grid, Watermarks