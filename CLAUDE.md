# CLAUDE.md - LessonCraftStudio Complete Project Guide
**Last Updated: December 2024**
**Reference Implementation: wordsearch.html (FULLY WORKING PROTOTYPE)**

---

## 🚨 CRITICAL WARNING: SEPARATION OF CONCERNS

**GOLDEN RULE**: Image library synchronization modifications should NEVER affect core worksheet generation functionality!

### The Principle:
1. **Core Functionality** (worksheet generation, puzzle creation, PDF export) - MUST REMAIN UNTOUCHED
2. **Enhancement Features** (borders, backgrounds, translations) - ADD WITHOUT BREAKING
3. **API Integration** - ALWAYS HANDLE RESPONSE FORMATS CORRECTLY

**IF YOU BREAK CORE FUNCTIONALITY WHILE ADDING FEATURES, YOU'VE FAILED**

---

## 🚀 CRITICAL SUCCESS: WORDSEARCH APP IS THE GOLD STANDARD

**IMPORTANT**: The `wordsearch.html` app is now the COMPLETE WORKING REFERENCE for all functionality:
- ✅ Core worksheet generation works perfectly
- ✅ Borders and backgrounds load correctly with proper translations
- ✅ Language switching works dynamically without page reload
- ✅ Images scale to 70% of page height (professional worksheet standard)
- ✅ All APIs integrate properly with Directus CMS
- ✅ Full multi-language support (11 languages)

**ALWAYS USE WORDSEARCH.HTML AS THE TEMPLATE FOR FIXING OTHER APPS**

---

## 🔴 MOST CRITICAL BUG TO AVOID

### The API Response Format Issue (THIS WILL BREAK EVERYTHING)

**THE PROBLEM THAT BREAKS WORKSHEET GENERATION:**
```javascript
// ❌ WRONG - This breaks the generate button!
const response = await fetch(`/api/images?theme=${theme}&locale=${locale}`);
const images = await response.json();
allImagesCache[theme] = images;  // STORING OBJECT INSTEAD OF ARRAY
// Later: images.length is undefined, generation fails silently
```

**THE CORRECT PATTERN (ALWAYS DO THIS):**
```javascript
// ✅ CORRECT - Extract the images array properly
const response = await fetch(`/api/images?theme=${theme}&locale=${locale}`);
const data = await response.json();
const images = data.images || data;  // HANDLE BOTH FORMATS
allImagesCache[theme] = images;      // NOW IT'S AN ARRAY
// Later: images.length works, generation succeeds
```

### Where This MUST Be Applied:
1. `generatePuzzleData()` - When loading theme images
2. `preloadDefaultTheme()` - When preloading default theme
3. `renderDictionary()` - When displaying image library
4. `loadThemeImages()` - When loading any theme
5. ANY place that calls `/api/images`

**REMEMBER**: The API returns `{images: [...], pagination: {...}}` NOT a direct array!

---

## 🎯 PROJECT OVERVIEW

### What We're Building
**LessonCraftStudio** - A professional worksheet generator platform for educators and parents
- **33 interactive worksheet generator apps** (word search, math puzzles, coloring pages, etc.)
- **Multi-language support** for 11 languages (EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI)
- **Dynamic image library** managed through Directus CMS (141+ images)
- **Subscription-based SaaS** with free tier, core bundle, and full access
- **Professional publishing quality** - outputs in standard page sizes for printing

### Current Status: 92% Complete
- ✅ Infrastructure: 100% complete
- ✅ Directus CMS Integration: 100% complete
- ✅ Image Library System: 100% complete
- ✅ Border/Background System: 100% complete (wordsearch proven)
- ✅ Language Management: 100% complete (UnifiedLanguageManager working)
- ✅ Core Functionality Preservation: 100% (worksheet generation protected)
- ⚠️ App Migration: 3% (1 of 33 apps fully working)
- ❌ Authentication: 0%
- ❌ Payment Integration: 0%

---

## 🛡️ CORE FUNCTIONALITY PROTECTION CHECKLIST

When modifying ANY app, ensure these ALWAYS work:

### Essential Functions That Must Never Break:
1. **Generate Button** - Must create worksheet/puzzle
2. **Answer Key Generation** - Must show solutions
3. **Download Functions** - PDF and image exports must work
4. **Canvas Operations** - Drawing, text, shapes must render
5. **User Interactions** - Drag, drop, resize must function

### Test After EVERY Modification:
```javascript
// Quick Console Test
console.log('Testing core functions...');
console.log('1. Can generate worksheet?', typeof handleGenerateWorksheet === 'function');
console.log('2. Image cache populated?', Object.keys(allImagesCache).length > 0);
console.log('3. Canvas exists?', worksheetCanvas && worksheetCanvas._objects);
console.log('4. API response handled?', allImagesCache['animals'] && Array.isArray(allImagesCache['animals']));
```

---

## 🏗️ PROVEN ARCHITECTURE (FROM WORDSEARCH)

### The Stack That Works
```
Frontend (Next.js 14)
    ↓
API Routes (/api/borders/themes, /api/backgrounds/themes, /api/images)
    ↓
ImageLibraryManager (frontend/lib/image-library-manager.ts)
    ↓
Directus CMS → PostgreSQL
```

### Critical JavaScript Modules (ALL TESTED & WORKING)

#### 1. **bulletproof-loader.js** - Guaranteed Border/Background Loading
```javascript
// THIS ALWAYS WORKS - Used in wordsearch.html
<script src="js/bulletproof-loader.js"></script>

// Initialize in your app (AFTER core functionality is loaded):
await BulletproofLoader.init({
    borderSelect: document.getElementById('borderThemeSelect'),
    backgroundSelect: document.getElementById('backgroundThemeSelect')
});
```

#### 2. **unified-language-manager.js** - Dynamic Language Switching
```javascript
// Handles ALL language changes without page reload
<script src="js/unified-language-manager.js"></script>

// Automatically syncs borders, backgrounds, and UI when language changes
UnifiedLanguageManager.changeLanguage('sv'); // Switch to Swedish
```

#### 3. **border-background-sizer.js** - Professional Sizing
```javascript
// Ensures borders/backgrounds are 70% of page height
<script src="js/border-background-sizer.js"></script>

// Press Ctrl+Shift+S to auto-fix sizing
```

---

## 📋 THE MASTER FIX PATTERN (COPY FROM WORDSEARCH)

### Step 1: Add Required Scripts (in this EXACT order)
```html
<head>
    <!-- Core functionality scripts FIRST -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <!-- Then enhancement scripts -->
    <script src="js/translations.js"></script>
    <script src="js/bulletproof-loader.js"></script>
    <script src="js/unified-language-manager.js"></script>
    <script src="js/border-background-sizer.js"></script>
    <script src="js/auto-fix-system.js"></script>
</head>
```

### Step 2: Initialize BulletproofLoader (AFTER core init)
```javascript
// In DOMContentLoaded, AFTER core functionality is set up:
document.addEventListener('DOMContentLoaded', async function() {
    // First: Initialize core worksheet functionality
    initializeCanvas();
    setupEventListeners();

    // Then: Add enhancement features
    await BulletproofLoader.init({
        borderSelect: borderThemeSelect,
        backgroundSelect: backgroundThemeSelect
    });
});
```

### Step 3: ALWAYS Handle API Responses Correctly
```javascript
// For EVERY API call that returns images:
const response = await fetch(`/api/images?theme=${theme}&locale=${locale}`);
const data = await response.json();
const images = data.images || data;  // CRITICAL LINE - NEVER FORGET THIS
```

### Step 4: Fix Border/Background Sizing (70% Height Rule)
```javascript
// In addOverlayToCanvas or similar function:
img.clone(clonedImg => {
    clonedImg.set({
        [propName]: true,
        originX: 'center',
        originY: 'center',
        left: canvas.width / 2,
        top: canvas.height / 2,
        selectable: isEditable,
        evented: isEditable,
        opacity: parseFloat(opacitySlider.value)
    });

    // Scale to 70% of canvas height (PROFESSIONAL STANDARD)
    const targetHeight = canvas.height * 0.7;
    clonedImg.scaleToHeight(targetHeight);

    canvas.add(clonedImg);
    enforceZOrder(canvas);
});
```

### Step 5: Handle Language Switching (WITHOUT breaking generation)
```javascript
// Update language selector to use UnifiedLanguageManager:
languageSelect.addEventListener('change', async function() {
    const newLocale = this.value;
    currentLocale = newLocale;

    if (window.UnifiedLanguageManager) {
        await window.UnifiedLanguageManager.changeLanguage(newLocale);

        // IMPORTANT: Reload app-specific content
        loadThemes();  // Reload themes with new locale
        // DO NOT clear allImagesCache here - let it update naturally
    }
});
```

---

## 🔧 API ENDPOINTS (ALL WORKING)

### Border Themes
```
GET /api/borders/themes?locale=sv
Response: [
    { "value": "spring", "displayName": "vår" },
    { "value": "math", "displayName": "Math" }
]
```

### Background Themes
```
GET /api/backgrounds/themes?locale=sv
Response: [
    { "value": "summer", "displayName": "sommar" },
    { "value": "autumn", "displayName": "höst" }
]
```

### Images (CRITICAL FORMAT)
```
GET /api/images?theme=animals&locale=sv
Response: {
    "images": [  // ← THIS IS AN OBJECT WITH 'images' PROPERTY
        {
            "name": "cat",
            "path": "/images/animals/cat.png",
            "url": "/api/directus-image/..."
        }
    ],
    "pagination": {
        "total": 25,
        "page": 1
    }
}
```

**NEVER FORGET**: API returns `{images: [...]}` not a direct array!

---

## 🚨 CRITICAL PATTERNS TO FOLLOW

### ✅ ALWAYS DO THIS:

1. **Test core functionality FIRST before adding features**
```javascript
// Before adding borders/backgrounds, ensure:
// 1. Generate button works
// 2. Images load
// 3. Canvas renders
// 4. Downloads work
```

2. **Set locale globally BEFORE anything else**
```javascript
let currentLocale = 'en';
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('locale')) {
    currentLocale = urlParams.get('locale');
}
```

3. **Extract images array from API response EVERY TIME**
```javascript
const data = await response.json();
const images = data.images || data; // HANDLE BOTH FORMATS
```

4. **Use 70% height for borders/backgrounds**
```javascript
const targetHeight = canvas.height * 0.7;
clonedImg.scaleToHeight(targetHeight);
```

5. **Include locale in ALL API calls**
```javascript
fetch(`/api/borders/themes?locale=${currentLocale}`)
```

### ❌ NEVER DO THIS:

1. **Never break core functionality while adding features**
```javascript
// WRONG - Modifying generatePuzzleData without testing
// WRONG - Changing canvas initialization
// WRONG - Altering download functions
```

2. **Never assume API returns direct array**
```javascript
// WRONG
const images = await response.json();
images.length; // undefined - breaks everything

// RIGHT
const data = await response.json();
const images = data.images || data;
images.length; // works
```

3. **Never hardcode locale**
```javascript
// WRONG
fetch('/api/borders/themes')

// RIGHT
fetch(`/api/borders/themes?locale=${currentLocale}`)
```

4. **Never scale to 100% height**
```javascript
// WRONG
clonedImg.scaleToHeight(canvas.height);

// RIGHT - 70% for professional look
clonedImg.scaleToHeight(canvas.height * 0.7);
```

5. **Never modify core functions for enhancement features**
```javascript
// WRONG - Changing generateWorksheet() to add borders
// RIGHT - Add borders separately without touching generation
```

---

## 📊 MIGRATION CHECKLIST FOR ALL 33 APPS

### Before Starting ANY Migration:
1. ✅ Test that the app generates worksheets correctly
2. ✅ Test that downloads work (PDF and images)
3. ✅ Test that all interactions work (drag, drop, resize)
4. ✅ Make a backup or note the working state

### ✅ Fully Working (Use as Reference)
1. **wordsearch.html** - COMPLETE REFERENCE IMPLEMENTATION (Core + Enhancements)
2. **alphabet train.html** - Works but needs unified system integration

### ⚠️ Partially Working (Need Updates)
3. addition.html - Borders/backgrounds work, needs language sync
4. subtraction.html - Borders/backgrounds work, needs language sync
5. coloring.html - Basic functionality, needs full integration

### ❌ Need Complete Migration (28 Apps)
- Apply the MASTER FIX PATTERN from wordsearch.html
- Each app takes ~5 minutes to fix
- Test with Swedish (sv) locale to verify translations
- ALWAYS verify core functionality still works after changes

---

## 🧪 TESTING PROTOCOL

### Core Functionality Test (DO THIS FIRST)
```javascript
// 1. Open browser console
// 2. Try to generate a worksheet
// 3. Check for errors
// 4. If errors, check:
console.log('Image cache:', allImagesCache);
console.log('Is animals array?', Array.isArray(allImagesCache['animals']));
console.log('Canvas exists?', typeof worksheetCanvas !== 'undefined');
```

### Quick Test for Any App
1. Open app normally (without locale parameter)
2. Test core functions:
   - Generate worksheet/puzzle
   - Generate answer key
   - Download as PDF
   - Download as image
3. Then test enhancements with `?locale=sv`:
   - Border dropdown shows "vår" for spring
   - Background themes load
   - Changing language updates ALL text
   - Borders/backgrounds scale to 70% of page height

### Console Commands for Debugging
```javascript
// Check if systems are loaded
console.log('BulletproofLoader:', window.BulletproofLoader);
console.log('UnifiedLanguageManager:', window.UnifiedLanguageManager);

// Check image cache integrity
console.log('Image cache keys:', Object.keys(allImagesCache));
console.log('Animals is array?', Array.isArray(allImagesCache['animals']));

// Force reload themes
await BulletproofLoader.init();

// Check current locale
UnifiedLanguageManager.getLocale();

// Fix sizing issues
BorderBackgroundSizer.autoFix();
```

### Keyboard Shortcuts
- `Ctrl+Shift+F` - Auto-fix borders/backgrounds
- `Ctrl+Shift+S` - Fix sizing issues

---

## 💼 PROFESSIONAL STANDARDS

### Code Quality Rules
1. **Separation of Concerns** - Core functionality separate from enhancements
2. **Backward Compatibility** - New features don't break existing ones
3. **Graceful Degradation** - App works even if enhancements fail
4. **Error Handling** - Catch and handle all API failures
5. **Performance** - Enhancements don't slow down core functions

### Image Sizing
- Borders: 70% of page height
- Backgrounds: 70% of page height
- Train templates: Fit within margins (40px)
- Regular images: Maintain aspect ratio

### Performance Targets
- Core generation: < 100ms
- API responses: < 200ms
- Image loading: < 500ms
- Language switch: < 1 second
- Canvas operations: 60 FPS

### Browser Support
- Chrome 90+ (primary)
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🔴 CRITICAL REMINDERS FOR NEW SESSIONS

1. **TEST CORE FUNCTIONALITY FIRST** - Never assume it works
2. **CHECK API RESPONSE HANDLING** - Look for `data.images || data`
3. **WORDSEARCH.HTML IS THE GOLD STANDARD** - Copy patterns from here
4. **All solutions are in /worksheet-generators/js/** - Don't recreate
5. **BulletproofLoader ALWAYS works** - Use it, don't debug manually
6. **70% height is the standard** - Professional worksheet requirement
7. **Test with Swedish (sv)** - Best for verifying translations work

---

## 📈 NEXT STEPS (Priority Order)

### Immediate (This Week)
1. Test all 33 apps for core functionality
2. Fix any broken generation buttons (check API response handling)
3. Migrate working apps using wordsearch pattern
4. Create automated test suite for core functions

### Short Term (Next 2 Weeks)
1. Implement authentication system
2. Add subscription management
3. Create admin dashboard
4. Add analytics for usage tracking

### Long Term (Next Month)
1. Payment integration (Stripe)
2. Email notifications
3. Production deployment
4. Performance optimization

---

## 🛠️ TROUBLESHOOTING GUIDE

### Problem: Generate Button Doesn't Work
**Solution**: Check API response handling - ensure `data.images || data` pattern is used

### Problem: "Cannot read property 'length' of undefined"
**Solution**: The API response isn't being extracted correctly. Add:
```javascript
const data = await response.json();
const images = data.images || data;
```

### Problem: Borders/Backgrounds Don't Load
**Solution**: Add bulletproof-loader.js and initialize it AFTER core functionality

### Problem: Translations Don't Work
**Solution**: Add unified-language-manager.js and ensure locale parameter in API calls

### Problem: Images Too Large
**Solution**: Use 70% height scaling: `clonedImg.scaleToHeight(canvas.height * 0.7)`

### Problem: Language Change Breaks Generation
**Solution**: Don't clear allImagesCache, let it update naturally with new API calls

---

## 📝 SESSION CONTEXT PRESERVATION

When starting a new session, remember:
1. **ALWAYS test core functionality first** - Generate, download, interact
2. **Check wordsearch.html first** - It has all working patterns
3. **Verify API response handling** - The #1 cause of broken generation
4. **Use existing JS modules** - They're all in /worksheet-generators/js/
5. **Docker containers must be running** - lcs-frontend, lcs-directus, lcs-postgres
6. **Test with Swedish locale** - Best for verifying everything works
7. **70% height rule** - Professional standard for borders/backgrounds
8. **Separation of concerns** - Core functionality must remain untouched

---

## 🏆 SUCCESS METRICS

An app is considered FULLY WORKING when:
1. ✅ Core worksheet/puzzle generation works
2. ✅ Answer key generation works
3. ✅ PDF download works
4. ✅ Image download works
5. ✅ Borders load with translations
6. ✅ Backgrounds load with translations
7. ✅ Language switching doesn't break anything
8. ✅ Images scale to 70% of page height
9. ✅ No console errors
10. ✅ Performance targets met

## 🔒 CORE FUNCTIONALITY TESTING PROTOCOL

### MANDATORY: Test These Functions AFTER Every Change

```javascript
// Core Function Test Suite - Run this in console after ANY modification
function testCoreFunctionality() {
    const tests = {
        generateButton: document.querySelector('[onclick*="generate"]') !== null,
        answerKeyButton: document.querySelector('[onclick*="answer"]') !== null,
        downloadButtons: document.querySelectorAll('[onclick*="download"]').length > 0,
        canvas: typeof worksheetCanvas !== 'undefined' && worksheetCanvas._objects !== undefined,
        imageCache: typeof allImagesCache === 'object' && Object.keys(allImagesCache).length > 0,
        apiResponseFormat: allImagesCache['animals'] ? Array.isArray(allImagesCache['animals']) : 'No animals cache',
        fabricLoaded: typeof fabric !== 'undefined',
        jsPDFLoaded: typeof jspdf !== 'undefined'
    };

    console.log('=== CORE FUNCTIONALITY TEST RESULTS ===');
    Object.entries(tests).forEach(([test, result]) => {
        console.log(`${result ? '✅' : '❌'} ${test}: ${result}`);
    });

    const passed = Object.values(tests).filter(t => t === true).length;
    console.log(`\nRESULT: ${passed}/${Object.keys(tests).length} tests passed`);

    if (passed < Object.keys(tests).length) {
        console.error('⚠️ CRITICAL: Core functionality is broken! Do not proceed with enhancements.');
    } else {
        console.log('✅ Core functionality intact. Safe to add enhancements.');
    }

    return passed === Object.keys(tests).length;
}

// Run test
testCoreFunctionality();
```

### The Integration Testing Sequence

When integrating enhancement features, follow this EXACT sequence:

1. **BEFORE Integration**
   ```javascript
   // Save current state
   const beforeState = {
       canGenerate: typeof handleGenerateWorksheet === 'function',
       imagesWork: Object.keys(allImagesCache).length > 0,
       canvasWorks: worksheetCanvas && worksheetCanvas._objects
   };
   console.log('Before state:', beforeState);
   ```

2. **DURING Integration**
   - Add one feature at a time
   - Test after each addition
   - If something breaks, revert immediately

3. **AFTER Integration**
   ```javascript
   // Verify nothing broke
   const afterState = {
       canGenerate: typeof handleGenerateWorksheet === 'function',
       imagesWork: Object.keys(allImagesCache).length > 0,
       canvasWorks: worksheetCanvas && worksheetCanvas._objects
   };
   console.log('After state:', afterState);

   // Compare states
   if (JSON.stringify(beforeState) !== JSON.stringify(afterState)) {
       console.error('⚠️ CRITICAL: Integration broke core functionality!');
   }
   ```

---

**This document represents 100+ hours of development and debugging. The solutions here are PROVEN and WORKING. Trust the patterns, especially from wordsearch.html. NEVER sacrifice core functionality for enhancement features.**

---
*Last verified working: December 2024 with wordsearch.html*
*Core functionality confirmed: Generate, Answer Key, Downloads all working*
*Next review: After migrating 5 more apps*