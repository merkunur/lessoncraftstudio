# Language Support Implementation Checklist

## ✅ MANDATORY CHECKS BEFORE STARTING

### 1. Variables at Global Scope (OUTSIDE DOMContentLoaded)
```javascript
<script>
    // MUST BE HERE - GLOBAL SCOPE
    let currentLocale = 'en';
    let currentCanvasConfig = { width: 612, height: 792 };
    
    const urlParams = new URLSearchParams(window.location.search);
    const localeParam = urlParams.get('locale');
    if (localeParam) {
        currentLocale = localeParam;
    }

document.addEventListener('DOMContentLoaded', () => {
    // Rest of code here
```
❌ **NEVER put currentLocale inside DOMContentLoaded**

### 2. Check translations.js is loaded
```html
<script src="/js/translations.js"></script>
```

### 3. Language selector HTML exists
```html
<select id="languageSelect">
    <option value="en">English</option>
    <option value="de">Deutsch</option>
    <!-- etc -->
</select>
```

## ✅ API CALLS - ALL MUST INCLUDE LOCALE

### 4. Theme API
```javascript
// ✅ CORRECT
fetch(`/api/themes-translated?locale=${currentLocale}`)

// ❌ WRONG
fetch('/api/themes-translated')
```

### 5. Image API
```javascript
// ✅ CORRECT
fetch(`/api/images?theme=${theme}&locale=${currentLocale}`)
fetch(`/api/images?search=${query}&locale=${currentLocale}`)

// ❌ WRONG
fetch(`/api/images?theme=${theme}`)
```

## ✅ FUNCTION SAFETY CHECKS

### 6. ALWAYS check if applyTranslations exists
```javascript
// Every single place it's called:
if (typeof applyTranslations !== 'undefined') {
    applyTranslations();
}
```

### 7. Check actual function names in the app
- Look for: `initializeImageLibrary` or `loadThemes` or `loadImageThemes`
- Use the ACTUAL function name, not what you think it should be

## ✅ API RESPONSE HANDLING

### 8. Themes API returns objects, not strings
```javascript
// API returns: [{value: "animals", displayName: "Tiere"}, ...]
themePaths.forEach(theme => {
    opt.value = theme.value || theme;
    opt.textContent = theme.displayName || theme;
});
```

### 9. Image names use name property
```javascript
const displayName = imgData.name || imgData.word;
```

## ✅ LANGUAGE CHANGE HANDLER

### 10. Set language selector value
```javascript
if (languageSelect) {
    languageSelect.value = currentLocale;
```

### 11. Handle language change
```javascript
languageSelect.addEventListener('change', function() {
    currentLocale = this.value;
    if (typeof applyTranslations !== 'undefined') {
        applyTranslations();
    }
    initializeImageLibrary(); // Or whatever loads themes
    // Reload current theme if needed
});
```

## ✅ DEFAULT BEHAVIOR

### 12. Load animals theme when "All Themes" selected
```javascript
if (selectedTheme === 'all' && !searchQuery) {
    // Load animals by default
    fetch(`/api/images?theme=animals&locale=${currentLocale}`)
}
```

## ❌ COMMON FAILURES TO AVOID

1. **Script breaks** → applyTranslations not checked → themes don't load
2. **Wrong scope** → currentLocale inside DOMContentLoaded → not accessible
3. **Wrong API format** → treating theme objects as strings → undefined errors
4. **Missing locale** → API calls without locale parameter → English only
5. **Wrong function** → calling loadThemes when it's initializeImageLibrary

## 🔴 TEST IMMEDIATELY

1. Open browser console
2. Load page with `?locale=de`
3. Check for ANY errors
4. Verify themes show in German
5. Change language selector
6. Verify themes reload in new language

## ✅ Successfully Implemented In:
- Big Small ✅
- Chart Count Color ✅

## ❌ Failed Initially Due To:
- Chart Count: applyTranslations ReferenceError (fixed)
- Chart Count: Theme object/string confusion (fixed)

---
**REMEMBER: If themes don't load, check the console FIRST!**