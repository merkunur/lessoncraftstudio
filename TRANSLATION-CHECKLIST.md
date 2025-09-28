# TRANSLATION CHECKLIST FOR WORKSHEET GENERATORS

## 🎯 PURPOSE
This checklist ensures 100% translation coverage when translating worksheet generator apps to new languages.

## ✅ TRANSLATION CHECKLIST

### 1. HTML ELEMENTS WITH `data-translate` ATTRIBUTE
**Location:** wordsearch.html and all other generator HTML files
**How to find:** Search for `data-translate="`
**Common elements:**
- [ ] Buttons
- [ ] Labels
- [ ] Headings
- [ ] Accordion titles
- [ ] Dropdown options
- [ ] Placeholder text
- [ ] Help text
- [ ] Status messages

### 2. JAVASCRIPT DYNAMIC TEXT
**Location:** Within JavaScript code blocks
**How to find:** Search for text assignments and innerHTML updates
**Common patterns:**
```javascript
element.textContent = 'Some text';  // Need translation
element.innerHTML = `<span>Text</span>`;  // Need translation
alert('Message');  // Need translation
showMessage('Text', 'success');  // Need translation
```

### 3. FILE INPUT ELEMENTS (SPECIAL CASE)
**Issue:** Native browser file inputs show "Choose Files" and "No file chosen" in browser's language
**Solution:** Use custom styled file inputs or accept browser defaults
**Note:** These texts are controlled by the browser, not our application

### 4. SELECT/DROPDOWN OPTIONS
**Location:** Both in HTML and dynamically generated
**How to find:**
- Static: `<option>` tags in HTML
- Dynamic: JavaScript that creates options
**Example:**
```html
<option value="letter-portrait" data-translate="letterPortrait">Letter Portrait</option>
```

### 5. CHECKBOX AND RADIO BUTTON LABELS
**Location:** Adjacent to input elements
**How to find:** `<label for="someId">`
**Must match:** The `data-translate` key must exist in translations.js

### 6. TOOLTIP AND TITLE ATTRIBUTES
**Location:** Any HTML element
**How to find:** Search for `title="`
**Example:**
```html
<button title="Click to generate" data-translate-title="generateTooltip">Generate</button>
```

### 7. CANVAS TEXT RENDERING
**Location:** JavaScript canvas operations
**How to find:** Search for `fillText` or `strokeText`
**Example:**
```javascript
ctx.fillText('Answer Key', x, y);  // Need translation
```

### 8. ERROR AND SUCCESS MESSAGES
**Location:** JavaScript error handlers
**How to find:** Search for `catch` blocks and `showMessage` calls
**Common messages:**
- [ ] "Failed to load"
- [ ] "Successfully saved"
- [ ] "Invalid input"
- [ ] "Please select..."

### 9. PLACEHOLDER TEXT IN INPUTS
**Location:** Input elements
**How to find:** Search for `placeholder="`
**Example:**
```html
<input placeholder="Enter text" data-translate-placeholder="enterText">
```

### 10. DYNAMICALLY LOADED CONTENT
**Location:** API responses and AJAX calls
**How to find:** Search for `fetch` and `.json()`
**Needs:** Locale parameter in API calls

## 🔍 VERIFICATION STEPS

### Step 1: Visual Inspection
1. Open app with `?locale=de` (or target language)
2. Check every UI element visually
3. Open all accordions
4. Test all buttons and interactions
5. Check all dropdowns

### Step 2: Console Verification
```javascript
// Run in browser console to find untranslated text
Array.from(document.querySelectorAll('*')).forEach(el => {
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        const text = el.textContent.trim();
        if (text && /^[A-Z]/.test(text) && !el.hasAttribute('data-translate')) {
            console.warn('Possibly untranslated:', text, el);
        }
    }
});
```

### Step 3: File Input Check
```javascript
// Check for file inputs that need custom styling
document.querySelectorAll('input[type="file"]').forEach(input => {
    console.log('File input found:', input.id || 'unnamed');
});
```

## 📋 TRANSLATION COVERAGE BY FILE

### translations.js Structure
```javascript
const translations = {
    en: {
        // All keys here
    },
    de: {
        // All keys must match en
    },
    // ... other languages
}
```

### Required Keys Categories
1. **Common UI** (generate, download, print, etc.)
2. **Settings** (pageSize, difficulty, etc.)
3. **Accordions** (all section titles)
4. **Image Library** (themes, selections)
5. **Borders/Backgrounds** (theme names)
6. **Error Messages** (all error states)
7. **Success Messages** (all success states)
8. **Upload Section** (file upload related)

## 🚨 COMMON MISTAKES TO AVOID

1. **Missing data-translate attribute** - Element has text but no translation key
2. **Mismatched keys** - HTML uses key that doesn't exist in translations.js
3. **Hardcoded text in JavaScript** - Text directly in JS without using translation system
4. **Incomplete language coverage** - Key exists in English but not in German
5. **Case sensitivity issues** - Keys must match exactly
6. **Dynamic content without locale** - API calls missing locale parameter
7. **Browser-controlled text** - Trying to translate native file input text

## 🛠️ TOOLS FOR TRANSLATION

### Find Missing Translations
```javascript
// Compare translation keys across languages
function findMissingTranslations() {
    const baseKeys = Object.keys(translations.en);
    const languages = Object.keys(translations);

    languages.forEach(lang => {
        if (lang === 'en') return;
        const missing = baseKeys.filter(key => !translations[lang][key]);
        if (missing.length > 0) {
            console.log(`${lang} missing keys:`, missing);
        }
    });
}
```

### Apply Translations Dynamically
```javascript
// Force re-translation of page
function retranslate(locale) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[locale] && translations[locale][key]) {
            element.textContent = translations[locale][key];
        }
    });
}
```

## 📝 TESTING PROTOCOL

1. **Load with German locale**: `?locale=de`
2. **Check all visible text**: Should be in German
3. **Interact with all features**: Generate, download, upload
4. **Check console for errors**: No translation warnings
5. **Test all dropdowns**: All options translated
6. **Check all accordions**: All sections translated
7. **Verify dynamic content**: Images load with German names

## 🎯 SPECIAL CONSIDERATIONS

### File Input Translation
The browser's native file input shows:
- **"Choose Files"** - Browser controlled
- **"No file chosen"** - Browser controlled

**Solutions:**
1. Accept browser defaults (recommended)
2. Create custom file input with hidden native input
3. Use a file upload library with i18n support

### Current Implementation
We accept browser defaults for file inputs as they automatically use the user's browser language settings.

## ✅ FINAL VERIFICATION

Before marking translation complete:
1. [ ] All HTML elements with text have data-translate
2. [ ] All JavaScript dynamic text uses translation system
3. [ ] All API calls include locale parameter
4. [ ] All dropdowns options are translated
5. [ ] All error/success messages are translated
6. [ ] All placeholder text is translated
7. [ ] Theme names load in correct language
8. [ ] No console warnings about missing translations
9. [ ] Visual inspection shows no English text (except file inputs)
10. [ ] User can work entirely in target language

---
Last Updated: December 2024
Note: File input "Choose Files" and "No file chosen" are browser-controlled and will display in the user's browser language.