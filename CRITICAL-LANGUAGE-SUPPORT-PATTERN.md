# CRITICAL: EXACT Language Support Pattern - DO NOT DEVIATE!

## ⚠️ STOP AND READ THIS FIRST!
This pattern has been tested and works. Follow it EXACTLY. Do not improvise.

## THE WORKING PATTERN (from Big Small app)

### 1. Script Structure - MUST BE EXACTLY LIKE THIS:
```javascript
<script>
    // MUST BE FIRST - Before ANY DOM element references
    let currentLocale = 'en';
    let currentCanvasConfig = { width: 612, height: 792 }; // Letter Portrait default
    
    // Initialize locale from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const localeParam = urlParams.get('locale');
    if (localeParam) {
        currentLocale = localeParam;
    }

document.addEventListener('DOMContentLoaded', () => {
    // ALL OTHER CODE GOES HERE
    // DOM elements, event handlers, functions, etc.
```

## ❌ COMMON MISTAKES THAT BREAK EVERYTHING:

### MISTAKE 1: Putting currentLocale inside DOMContentLoaded
```javascript
// ❌ WRONG - This breaks image library!
document.addEventListener('DOMContentLoaded', () => {
    let currentLocale = 'en';  // WRONG! Local variable, not accessible globally
```

### MISTAKE 2: Calling non-existent functions
```javascript
// ❌ WRONG
loadThemes(); // This function doesn't exist in most apps!

// ✅ CORRECT - Check what function actually loads themes in THIS app
initializeImageLibrary(); // or whatever the actual function name is
```

### MISTAKE 3: Not checking existing patterns
Each app may have different function names:
- `initializeImageLibrary()`
- `loadImageThemes()`
- `populateThemes()`
- CHECK THE APP FIRST!

### MISTAKE 4: Calling applyTranslations without checking if it exists
```javascript
// ❌ WRONG - This causes ReferenceError and breaks everything!
applyTranslations();

// ✅ CORRECT - Always check if function exists
if (typeof applyTranslations !== 'undefined') {
    applyTranslations();
}
```

### MISTAKE 5: Not handling API response format correctly
```javascript
// ❌ WRONG - Assuming themes are strings
themePath.split('/').map(...)

// ✅ CORRECT - API returns objects with value and displayName
opt.value = theme.value || theme;
opt.textContent = theme.displayName || theme;
```

## ✅ STEP-BY-STEP IMPLEMENTATION:

### Step 1: Check Current Structure
```bash
# Look for where script starts
grep -n "<script>" "chart count.html"
# Look for DOMContentLoaded
grep -n "DOMContentLoaded" "chart count.html"
```

### Step 2: Move Variables Outside
Place these BEFORE DOMContentLoaded:
```javascript
let currentLocale = 'en';
let currentCanvasConfig = { width: 612, height: 792 };
```

### Step 3: Find Existing Theme Loading Function
```bash
# Search for theme loading functions
grep -n "function.*[Tt]heme" "chart count.html"
grep -n "function.*[Ii]mage" "chart count.html"
```

### Step 4: Update API Calls
Add `&locale=${currentLocale}` to ALL:
- `/api/themes-translated?locale=${currentLocale}`
- `/api/images?theme=${theme}&locale=${currentLocale}`
- `/api/images?search=${query}&locale=${currentLocale}`

### Step 5: Fix Image Display
```javascript
// Always use this pattern for displaying names:
const displayName = imgData.name || imgData.word;
```

### Step 6: Language Change Handler
```javascript
languageSelect.addEventListener('change', function() {
    currentLocale = this.value;
    applyTranslations();
    // Use the ACTUAL function name from this app!
    initializeImageLibrary(); // or whatever it's called
});
```

## 🔴 CRITICAL REMINDERS:

1. **currentLocale and currentCanvasConfig MUST be GLOBAL** (outside DOMContentLoaded)
2. **Check what functions ACTUALLY EXIST** in the app before calling them
3. **Test after EACH change** - don't make multiple changes at once
4. **If image library doesn't load** - currentLocale is probably in wrong scope
5. **Copy the EXACT pattern from Big Small** - it works!

## Testing Checklist:
- [ ] Page loads without errors
- [ ] Theme dropdown populates
- [ ] Images load when theme selected
- [ ] Language change reloads themes
- [ ] Image names show in selected language
- [ ] "All Themes" loads animals by default

## Apps Successfully Using This Pattern:
1. Big Small ✅ (Reference implementation)
2. Chart Count Color ✅ (After fixing scope issue)

## Apps That Failed Due to Wrong Implementation:
- Chart Count (initially failed - fixed by moving currentLocale outside)
- [Any future apps where this pattern is not followed exactly]

---
⚠️ **FINAL WARNING**: This pattern works. Do not try to "improve" it. Do not move things around. Follow it EXACTLY as shown above.