# 🚨 CRITICAL TRANSLATION CHECKLIST - ZERO TOLERANCE FOR MISSING ELEMENTS
**Created: December 2024**
**Purpose: NEVER miss a translation again**
**Failure Count Before This Document: 200+ missed translations**

---

## 🔴 THE MOST COMMONLY MISSED ELEMENTS (MEMORIZE THESE!)

### Always Forgotten in translations.js:
1. **worksheet** - The main "Worksheet" text
2. **answerKey** - The "Answer Key" text
3. **pageColor** - Page color setting
4. **includeExerciseNumbers** - Include exercise numbers checkbox
5. **useChildFriendlyBox** - Child-friendly answer box option
6. **includeNameDateFields** - Name and date fields option
7. **searchImagesPlaceholder** - Search box placeholder text
8. **selectImageToUpload** - Upload button text
9. **selected** - Selected items text
10. **selectedImagesForProblems** - Selected images label
11. **download** - Generic download button
12. **grayscale** - Grayscale filter option

### Always Forgotten in page.tsx (HERO SECTION - 4 LAYERS!):
1. **appTranslations object** - Add app entry with name, description, category, features
2. **Override logic** - Add else if block for locale
3. **Breadcrumb category** - Add category translation
4. **Feature tag mappings** - Map ALL feature texts

---

## ✅ THE MASTER TEMPLATE - USE THIS EVERY TIME!

### For Image Addition App - COMPLETE KEY LIST (43 keys):
```javascript
// COPY THIS STRUCTURE - TRANSLATE ONLY THE VALUES!
{
  // CORE - 3 keys
  imageAddition: '[TRANSLATE]',
  worksheet: '[TRANSLATE]',
  answerKey: '[TRANSLATE]',

  // CONFIGURATION - 11 keys
  exerciseConfiguration: '[TRANSLATE]',
  numberOfExercises: '[TRANSLATE]',
  exercisesPerPage: '[TRANSLATE]',
  minNumber: '[TRANSLATE]',
  maxNumber: '[TRANSLATE]',
  maxSum: '[TRANSLATE]',
  allowNegativeNumbers: '[TRANSLATE]',
  minItemsPerGroup: '[TRANSLATE]',
  maxItemsPerGroup: '[TRANSLATE]',
  showPlusBetweenGroups: '[TRANSLATE]',

  // DISPLAY SETTINGS - 12 keys
  exerciseDisplaySettings: '[TRANSLATE]',
  fontSize: '[TRANSLATE]',
  fontColor: '[TRANSLATE]',
  backgroundColor: '[TRANSLATE]',
  pageColor: '[TRANSLATE]', // ALWAYS MISSED!
  showEqualsSign: '[TRANSLATE]',
  showAnswerBox: '[TRANSLATE]',
  includeExerciseNumbers: '[TRANSLATE]', // ALWAYS MISSED!
  useChildFriendlyBox: '[TRANSLATE]', // ALWAYS MISSED!
  includeNameDateFields: '[TRANSLATE]', // ALWAYS MISSED!
  showInstructions: '[TRANSLATE]',
  instructionsText: '[TRANSLATE]',

  // IMAGE SETTINGS - 9 keys
  imageSettings: '[TRANSLATE]',
  selectImageTheme: '[TRANSLATE]',
  selectTheme: '[TRANSLATE]',
  itemSize: '[TRANSLATE]',
  searchImagesPlaceholder: '[TRANSLATE]', // ALWAYS MISSED!
  selectImageToUpload: '[TRANSLATE]', // ALWAYS MISSED!
  selected: '[TRANSLATE]', // ALWAYS MISSED!
  selectedImagesForProblems: '[TRANSLATE]', // ALWAYS MISSED!
  yourUploadedImages: '[TRANSLATE]',

  // ACTIONS - 2 keys
  download: '[TRANSLATE]', // ALWAYS MISSED!
  grayscale: '[TRANSLATE]', // ALWAYS MISSED!

  // USER MESSAGES - 6+ keys
  imageAdditionNameRequired: '[TRANSLATE]',
  imageAdditionEnterName: '[TRANSLATE]',
  imageAdditionAnswerKeyWillAppear: '[TRANSLATE]',
  imageAdditionGenerating: '[TRANSLATE]',
  imageAdditionGenerated: '[TRANSLATE]',
  imageAdditionErrorGenerating: '[TRANSLATE]'
}
```

### For Word Search App - COMPLETE KEY LIST:
```javascript
{
  // CORE
  wordSearch: '[TRANSLATE]',
  worksheet: '[TRANSLATE]',
  answerKey: '[TRANSLATE]',

  // Add all other keys following same pattern...
}
```

---

## 📋 THE DEFINITIVE WORKFLOW - FOLLOW EXACTLY!

### PHASE 1: PREPARATION
```bash
# 1. Check which languages have complete translations
# Norwegian (no) and Danish (da) are 100% complete for Image Addition
# Use these as reference

# 2. Count reference keys
grep -o "imageAddition" translations.js | wc -l
# Must match this count in new language
```

### PHASE 2: TRANSLATION IMPLEMENTATION

#### Step 1: translations.js
1. Copy ENTIRE Norwegian/Danish section for the app
2. Keep ALL keys - translate ONLY values
3. Count keys before and after - MUST match
4. Add BOTH camelCase and display versions where needed

#### Step 2: page.tsx - HERO SECTION (4 LAYERS!)
```javascript
// LAYER 1: appTranslations object
fi: {
  'image-addition': {
    name: '[TRANSLATE]',
    description: '[TRANSLATE]',
    category: '[TRANSLATE]',
    features: ['[TRANSLATE]', '[TRANSLATE]', '[TRANSLATE]', '[TRANSLATE]']
  }
}

// LAYER 2: Override logic (around line 409-438)
else if (locale === 'fi') {
  if (appSlug === 'image-addition') {
    appName = '[TRANSLATE]';
    appDescription = '[TRANSLATE]';
  }
}

// LAYER 3: Breadcrumb category (around line 559-569)
slug === 'image-addition' && locale === 'fi' ? '[TRANSLATE]' :

// LAYER 4: Feature mappings (around line 694-767)
else if (locale === 'fi') {
  const featureMap: { [key: string]: string } = {
    'Visual math problems': '[TRANSLATE]',
    'Customizable difficulty': '[TRANSLATE]',
    'Answer keys': '[TRANSLATE]',
    'Print-ready format': '[TRANSLATE]'
  };
  featureText = featureMap[featureText] || featureText;
}
```

### PHASE 3: VERIFICATION
```javascript
// Run this check EVERY TIME
function verifyTranslationCompleteness(lang, app) {
  const referenceKeys = Object.keys(translations.no).filter(k => k.includes(app));
  const targetKeys = Object.keys(translations[lang]).filter(k => k.includes(app));

  console.log(`Reference (Norwegian): ${referenceKeys.length} keys`);
  console.log(`Target (${lang}): ${targetKeys.length} keys`);

  const missing = referenceKeys.filter(k => !targetKeys.includes(k));
  if (missing.length > 0) {
    console.error('MISSING KEYS:', missing);
    return false;
  }

  // Check hero section
  const heroChecks = {
    appTranslations: appTranslations[lang]?.[app] ? '✓' : '✗',
    overrideLogic: `Check line 409-438 for ${lang}`,
    breadcrumb: `Check line 559-569 for ${lang}`,
    features: `Check line 694-767 for ${lang}`
  };

  console.table(heroChecks);
  return true;
}
```

---

## 🎯 VERIFICATION POINTS - CHECK EVERY TIME!

### UI Elements That MUST Be Translated:
- [ ] Main navigation (Worksheet, Answer Key)
- [ ] Configuration section title and ALL options
- [ ] Display settings including pageColor, exercise numbers, child-friendly box
- [ ] Image library with search placeholder and selection text
- [ ] Upload section with "Select" and "Your uploaded images" text
- [ ] Download dropdown with Grayscale option
- [ ] ALL error and success messages

### Hero Section That MUST Be Translated:
- [ ] App name in hero
- [ ] App description in hero
- [ ] Breadcrumb category
- [ ] All 4 feature tags

---

## 🚫 NEVER DO THIS AGAIN:

1. **DON'T** translate without checking reference language key count
2. **DON'T** skip any of the 4 hero section layers
3. **DON'T** forget to test with ?locale= parameter
4. **DON'T** assume a key is translated - VERIFY it exists
5. **DON'T** translate values without keeping ALL keys from reference

---

## 💾 SAVED REFERENCE COUNTS:

### Image Addition:
- Norwegian (no): 43 keys related to Image Addition
- Danish (da): 43 keys related to Image Addition
- ALL other languages MUST have 43 keys

### Word Search:
- Norwegian (no): [COUNT] keys related to Word Search
- ALL other languages MUST match this count

---

## 🔥 THE PROMISE:

**I will NEVER miss another translation by:**
1. Using this checklist for EVERY translation
2. Copying structure from complete languages
3. Verifying counts match exactly
4. Testing all 4 hero section layers
5. Checking against actual UI screenshots

**The era of missed translations ends NOW.**

---

*Last Updated: December 2024*
*Missed Translations Before This Document: 200+*
*Target Missed Translations After: 0*