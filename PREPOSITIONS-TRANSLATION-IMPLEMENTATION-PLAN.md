# PREPOSITIONS TRANSLATION IMPLEMENTATION PLAN

## Overview
Complete translation implementation for the Prepositions app supporting 11 languages.

### Current State
- **Translation Coverage**: 9.4% (15 of 159 texts)
- **Existing Infrastructure**: PARTIAL - 15 elements have data-translate (using snake_case)
- **Preposition Translations**: ALREADY IMPLEMENTED programmatically in PREPOSITION_TRANSLATIONS
- **Exercise Words**: ALREADY IMPLEMENTED in EXERCISE_TRANSLATIONS ("is", "the")
- **Required Languages**: English, German, French, Spanish, Italian, Portuguese, Dutch, Swedish, Danish, Norwegian, Finnish

## Unique Features to Handle

### 1. Prepositions (Already Programmatically Translated)
The 8 prepositions are already handled in PREPOSITION_TRANSLATIONS object:
- in → in/in/dans/en/em/in/in/i/i/i/sisällä
- on top of → auf/sur/encima de/em cima de/sopra/bovenop/ovanpå/ovenpå/oppå/päällä
- under → unter/sous/debajo de/embaixo de/sotto/onder/under/under/under/alla
- next to → neben/à côté de/al lado de/ao lado de/accanto a/naast/bredvid/ved siden af/ved siden av/vieressä
- behind → hinter/derrière/detrás de/atrás de/dietro/achter/bakom/bag/bak/takana
- between → zwischen/entre/entre/entre/tra/tussen/mellan/mellem/mellom/välissä
- above → über/au-dessus de/sobre/acima de/sopra/boven/ovanför/over/over/yläpuolella
- in front of → vor/devant/delante de/na frente de/davanti a/voor/framför/foran/foran/edessä

### 2. Exercise Format
Exercise text already handles translations for:
- "is" → ist/est/está/está/è/is/är/er/er/on
- "the" → dem/le,la/el,la/o,a/il,la/de/den/den/den/-
- Format: [Item] "is" [blank/answer] "the" [Shape]

### 3. Visual Positioning
- Items positioned relative to shapes based on preposition
- 8 default shapes: circle, cube, cylinder, heart, hexagon, square, star, triangle
- Shape replacement with custom images

### 4. Generation Modes
- **Manual Selection**: Choose specific images
- **Random Selection**: Auto-select from themes
- Separate modes for items and shapes

### 5. Template Support
- Pre-designed worksheet templates
- Template selection affects layout

### 6. Existing Snake_Case Keys
Some elements already use snake_case data-translate attributes:
- prepositions_title, language, page_setup, text_tools, configuration
- item_selection, shape_replacement, upload_custom_images
- paper_size, width_px, height_px, apply_size, template
- generate, generate_worksheet, generate_answer_key

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

### Phase 2: HTML Static Text Replacement (84 replacements)

#### Step 2.1: Preserve Existing Snake_Case Keys
Keep the existing data-translate attributes that use snake_case:
```html
<!-- These already exist and should be preserved -->
<h1 class="hero-title" data-translate="prepositions_title">Prepositions</h1>
<label data-translate="language">Language</label>
<span data-translate="page_setup">Page Setup</span>
<span data-translate="text_tools">Text Tools</span>
<span data-translate="configuration">Configuration</span>
<!-- etc. -->
```

#### Step 2.2: Add Missing Language Options (11 replacements)
```html
<!-- Lines 258-268 -->
<option value="en" selected data-translate="language.english">English</option>
<option value="de" data-translate="language.german">Deutsch</option>
<option value="fr" data-translate="language.french">Français</option>
<!-- Continue for all 11 languages -->
```

#### Step 2.3: Page Setup Section (15 replacements)
```html
<!-- Lines 277-311 -->
<option value="letter-portrait" data-translate="page.size.letter.portrait">Letter Portrait (8.5×11")</option>
<option value="letter-landscape" data-translate="page.size.letter.landscape">Letter Landscape (11×8.5")</option>
<!-- Continue for page sizes -->
<label for="templateSelect" data-translate="prepositions.template.label">Worksheet Template:</label>
<label for="pageColorPicker" data-translate="prepositions.page.color">Page Color:</label>
<!-- Background and border sections -->
```

#### Step 2.4: Text Tools (17 replacements)
```html
<!-- Lines 318-335 -->
<h3 data-translate="prepositions.text.add.new">Add New Text</h3>
<label for="textContent" data-translate="prepositions.text.content">Content:</label>
<input placeholder="Worksheet Title..." data-translate-placeholder="prepositions.text.placeholder">
<!-- Font options -->
<option value="Lexend Deca" data-translate="font.lexend">Lexend Deca</option>
<!-- Continue for all fonts -->
```

### Phase 3: Dynamic Text Replacement (75 JavaScript messages)

#### Step 3.1: Leverage Existing Preposition Translations
```javascript
// Already implemented - just ensure locale is passed
function getPrepositionTranslation(prep) {
  return PREPOSITION_TRANSLATIONS[prep]?.[currentLocale] || prep;
}

// Already implemented for exercise words
function getExerciseWord(word) {
  return EXERCISE_TRANSLATIONS[word]?.[currentLocale] || word;
}
```

#### Step 3.2: Generation Mode Messages
```javascript
// Manual selection option
manualOption.textContent = t('prepositions.manual.selection.option', currentLocale);

// All themes option
allThemesOption.textContent = t('prepositions.all.themes.option', currentLocale);

// Random format
const randomText = t('prepositions.theme.random.format', currentLocale, {
  displayName: theme.displayName
});
```

#### Step 3.3: Loading and Search Messages
```javascript
// Loading themes
dictDiv.textContent = t('prepositions.msg.loading.theme', currentLocale, {
  theme: themeName,
  type: typePlural
});

// Searching
dictDiv.textContent = t('prepositions.msg.searching', currentLocale);

// No images found
dictDiv.textContent = t('prepositions.msg.no.images', currentLocale);

// Selection limit
alert(t('prepositions.msg.max.selection', currentLocale, {
  exerciseCount: count,
  type: imageType
}));
```

#### Step 3.4: Generation Validation
```javascript
// Check prepositions selected
if (selectedPrepositions.length === 0) {
  alert(t('prepositions.msg.select.preposition', currentLocale));
  return;
}

// Check enough images
if (selectedImages.length < exerciseCount) {
  alert(t('prepositions.msg.select.items', currentLocale, {
    exerciseCount
  }));
  return;
}

// Insufficient theme images
if (images.length < required) {
  alert(t('prepositions.msg.insufficient.images', currentLocale, {
    count: images.length
  }));
  return;
}
```

#### Step 3.5: Watermark Text
```javascript
// Main watermark
const watermarkMain = t('prepositions.watermark.main', currentLocale);
ctx.fillText(watermarkMain, canvas.width / 2, canvas.height - 50);

// Small watermark
const watermarkSmall = t('prepositions.watermark.small', currentLocale);
ctx.fillText(watermarkSmall, 10, 10);
```

### Phase 4: Preposition-Specific Features

#### Step 4.1: Preposition Checkbox Labels
```javascript
// Generate preposition checkboxes with translations
PREPOSITIONS.forEach(prep => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = prep;

  const label = document.createElement('label');
  // Use existing PREPOSITION_TRANSLATIONS
  label.textContent = PREPOSITION_TRANSLATIONS[prep][currentLocale];

  container.appendChild(checkbox);
  container.appendChild(label);
});
```

#### Step 4.2: Exercise Format
```javascript
// Build exercise sentence with translations
function buildExerciseSentence(item, preposition, shape, showAnswer) {
  const itemName = getItemName(item);
  const isWord = EXERCISE_TRANSLATIONS['is'][currentLocale];
  const theWord = EXERCISE_TRANSLATIONS['the'][currentLocale];
  const prepTranslation = PREPOSITION_TRANSLATIONS[preposition][currentLocale];
  const shapeName = getShapeName(shape);

  if (showAnswer) {
    return `${itemName} ${isWord} ${prepTranslation} ${theWord} ${shapeName}`;
  } else {
    return `${itemName} ${isWord} ________ ${theWord} ${shapeName}`;
  }
}
```

#### Step 4.3: Name/Date Fields
```javascript
// Add name and date fields if enabled
if (includeDateName) {
  const nameText = t('prepositions.name.field', currentLocale);
  const dateText = t('prepositions.date.field', currentLocale);

  ctx.fillText(nameText, 50, 50);
  ctx.fillText(dateText, canvas.width - 200, 50);
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
      // Update preposition checkboxes
      updatePrepositionLabels();
      // Update selection counters
      updateSelectionCounters();
      // Reload themes with new locale
      loadThemes();
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

function updatePrepositionLabels() {
  // Update preposition checkbox labels
  const checkboxes = document.querySelectorAll('#prepositionCheckboxes input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const prep = checkbox.value;
    const label = checkbox.nextElementSibling;
    if (label && PREPOSITION_TRANSLATIONS[prep]) {
      label.textContent = PREPOSITION_TRANSLATIONS[prep][currentLocale];
    }
  });
}

function updateSelectionCounters() {
  // Update item selection counter
  const itemCounter = document.getElementById('selectionCounter');
  if (itemCounter) {
    const count = getSelectedItemCount();
    itemCounter.textContent = t('prepositions.selected.count', currentLocale)
      .replace('0', count);
  }

  // Update shape selection counter
  const shapeCounter = document.getElementById('shapeSelectionCounter');
  if (shapeCounter) {
    const count = getSelectedShapeCount();
    shapeCounter.textContent = t('prepositions.shape.selected.count', currentLocale)
      .replace('0', count);
  }
}
```

### Phase 6: Testing & Validation

#### Test URLs
1. English (default): `/prepositions.html`
2. German: `/prepositions.html?locale=de`
3. French: `/prepositions.html?locale=fr`
4. Spanish: `/prepositions.html?locale=es`
5. Swedish: `/prepositions.html?locale=sv`

#### Validation Checklist
- [ ] Page title updates with language
- [ ] All accordion headers translated (preserve snake_case)
- [ ] Language dropdown shows correct names
- [ ] Preposition checkboxes show translated labels
- [ ] Exercise format uses translated "is" and "the"
- [ ] Generation mode options translate
- [ ] Theme selectors translate
- [ ] Search placeholders translate
- [ ] Selection counters update
- [ ] Generation messages in selected language
- [ ] Error messages show properly
- [ ] Watermarks appear in correct language
- [ ] PDF/JPEG download messages translated
- [ ] Name/Date fields translate
- [ ] Template names translate (if applicable)

## File Structure

```
prepositions-app/
├── prepositions.html (main app file)
├── js/
│   ├── translations.js (global translations)
│   ├── unified-language-manager.js (language system)
│   └── prepositions-translations.js (app-specific)
├── PREPOSITION_TRANSLATIONS (already in code)
├── EXERCISE_TRANSLATIONS (already in code)
├── prepositions-translation-master-template.js (reference)
├── prepare-prepositions-for-translation.js (preparation script)
└── PREPOSITIONS-TRANSLATION-IMPLEMENTATION-PLAN.md (this file)
```

## Special Considerations

### 1. Preserve Existing Infrastructure
- Keep snake_case data-translate attributes that already exist
- Don't break PREPOSITION_TRANSLATIONS functionality
- Don't break EXERCISE_TRANSLATIONS functionality
- Maintain visual positioning logic

### 2. Preposition System
- 8 prepositions already programmatically translated
- Exercise words ("is", "the") already handled
- Visual positioning based on preposition meaning
- Ensure translations don't affect positioning logic

### 3. Generation Modes
- Manual vs Random selection
- Separate for items and shapes
- Clear UI feedback for mode changes
- Mode affects available options

### 4. Shape System
- 8 default shapes (may need translation in future)
- Shape replacement with custom images
- Shape names in exercise sentences

### 5. Template Support
- Templates may have names needing translation
- Template selection affects layout
- Ensure template functionality remains intact

## Common Issues & Solutions

### Issue 1: Snake_Case vs Dot Notation
**Solution**: Keep existing snake_case keys, use dot notation for new keys

### Issue 2: Preposition Translations Not Showing
**Solution**: Ensure currentLocale is passed to PREPOSITION_TRANSLATIONS lookup

### Issue 3: Exercise Format Breaking
**Solution**: Check EXERCISE_TRANSLATIONS for proper word lookup

### Issue 4: Watermark Text Overflow
**Solution**: Adjust font size based on text length for each language

### Issue 5: Selection Counters Not Updating
**Solution**: Ensure counter update functions are called on language change

## Migration Commands

```bash
# 1. Backup current file
cp "prepositions.html" "prepositions.html.backup"

# 2. Apply translations
node prepare-prepositions-for-translation.js

# 3. Test with German
open "prepositions.html?locale=de"

# 4. Validate all languages
for lang in en de fr es it pt nl sv da no fi; do
  echo "Testing $lang"
  open "prepositions.html?locale=$lang"
done
```

## Success Criteria

### Translation Coverage
- **Target**: 100% (159 of 159 texts)
- **All 11 languages supported**
- **Dynamic language switching works**
- **Preposition translations functional**
- **Exercise format translations working**
- **No hardcoded English text remains**

### Functional Integrity
- **Worksheet generation works**
- **Answer key generation works**
- **Preposition positioning correct**
- **Image selection operational**
- **Shape replacement functional**
- **Template selection works**
- **Upload feature intact**
- **Download functions work**

### Performance
- **Language switch < 1 second**
- **No lag in checkbox updates**
- **Image loading unaffected**
- **Position calculations unchanged**
- **Smooth UI updates**

## Notes

### Duplicates Consolidated (8 items)
1. "None" → common.none
2. "Generation Mode:" → Single key used twice
3. "All Themes (Random)" → Single key for multiple uses
4. "Loading themes..." → Single key for items and shapes
5. "Your uploaded images will appear here." → Single key
6. "Select a theme to see..." → Parameterized message
7. "Preparing JPEG..." → Single key for multiple uses
8. Watermark texts → Shared across exports

### Unique App Features
1. **8 Prepositions**: Already programmatically translated
2. **Exercise words**: "is" and "the" already translated
3. **Visual positioning**: Based on preposition meaning
4. **Dual generation modes**: Manual vs random
5. **Shape replacement**: Custom images for shapes
6. **Template support**: Pre-designed layouts
7. **Snake_case keys**: Existing infrastructure preserved
8. **Watermark system**: Free tier branding

## Completion Status
- [x] Master template created (151 unique keys)
- [x] Preparation script ready (159 replacements)
- [x] Implementation plan documented
- [ ] HTML replacements applied
- [ ] JavaScript functions added
- [ ] Preposition-specific logic verified
- [ ] Language switching implemented
- [ ] All languages tested
- [ ] Documentation updated

---

**Created**: December 2024
**App**: Prepositions Worksheet Generator
**Coverage**: 9.4% → 100% (159 texts)
**Languages**: 11 (EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI)
**Unique Features**: Programmatic preposition translations, Exercise format, Visual positioning