# Translation Standardization Guide

## What Should Be Standardized

### 1. **Common UI Elements** (Same across ALL apps)
These should use the SAME translation keys everywhere:

```javascript
// Universal buttons
data-translate="generate"           // Generate button
data-translate="download"           // Download button
data-translate="print"              // Print button
data-translate="clear"              // Clear/Reset button
data-translate="save"               // Save button

// Universal labels
data-translate="language"           // Language selector
data-translate="settings"           // Settings header
data-translate="pageSetup"          // Page setup section
data-translate="pageSize"           // Page size label
data-translate="orientation"        // Orientation label

// Universal messages
data-translate="loading"            // Loading...
data-translate="success"            // Success message
data-translate="error"              // Error message
data-translate="pleaseWait"         // Please wait...
```

### 2. **Section Headers** (Common structure, app-specific content)
```javascript
// Sidebar sections - structure is same, content varies
data-translate="worksheetSettings"  // For addition, subtraction
data-translate="puzzleSettings"     // For sudoku, crossword
data-translate="gameSettings"       // For matching, memory games
data-translate="drawingSettings"    // For coloring, drawing apps
```

### 3. **App-Specific Features** (Unique to each app)
These MUST be different for each app:

```javascript
// Word Search specific
data-translate="gridSize"           // Grid size setting
data-translate="wordDirection"      // Word direction options
data-translate="showWordList"       // Show word list option

// Addition specific
data-translate="problemCount"       // Number of problems
data-translate="minOperand"         // Minimum operand
data-translate="maxOperand"         // Maximum operand
data-translate="showPlusSign"       // Show plus sign option

// Sudoku specific
data-translate="sudokuDifficulty"   // Difficulty level
data-translate="showHints"          // Show hints option
data-translate="generateUnique"     // Generate unique puzzle
```

## What Should Be Standardized - Technical Implementation

### 1. **The applyTranslations Function**
Every app should have the SAME function that handles all element types:

```javascript
function applyTranslations() {
    const locale = window.currentLocale || 'en';

    if (typeof translations === 'undefined' || !translations[locale]) {
        return;
    }

    const t = translations[locale];

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
            // Handle different element types
            if (element.tagName === 'BUTTON') {
                // Preserve icons in buttons
                const icons = element.querySelectorAll('i, svg');
                if (icons.length > 0) {
                    // Update only text nodes
                    element.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            node.textContent = t[key];
                        }
                    });
                    // Or update span if present
                    const span = element.querySelector('span');
                    if (span) span.textContent = t[key];
                } else {
                    element.textContent = t[key];
                }
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.type === 'button' || element.type === 'submit') {
                    element.value = t[key];
                } else {
                    element.placeholder = t[key];
                }
            } else if (element.tagName === 'OPTION') {
                element.textContent = t[key];
            } else if (element.tagName === 'LABEL' && element.textContent.endsWith(':')) {
                element.textContent = t[key] + ':';
            } else {
                element.textContent = t[key];
            }
        }
    });
}
```

### 2. **Initialization Pattern**
Every app should follow this pattern:

```javascript
// 1. Set locale BEFORE any other scripts
let currentLocale = 'en';
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('locale')) {
    currentLocale = urlParams.get('locale');
}
window.currentLocale = currentLocale;

// 2. Call translations on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply translations immediately
    if (typeof translations !== 'undefined') {
        applyTranslations();
    }

    // Apply again after delay for dynamic content
    setTimeout(() => {
        if (typeof translations !== 'undefined') {
            applyTranslations();
        }
    }, 100);
});
```

### 3. **Attribute Usage**
- Use `data-translate` (NOT `data-translate-key`)
- One attribute per element
- Use meaningful, descriptive keys

## Translation Key Naming Convention

### Common Elements (Shared)
```
generate
download
print
save
clear
cancel
close
```

### App-Specific Elements
```
[appName][Feature]

Examples:
wordSearchGridSize
additionProblemCount
sudokuDifficulty
coloringLineWidth
```

## What Should NOT Be Standardized

1. **App-specific feature descriptions** - Each app has unique features
2. **Help text and instructions** - Specific to each app's functionality
3. **Error messages** - Some are specific to the app's validation rules
4. **Tooltip content** - Often explains app-specific features

## Implementation Priority

### Phase 1: Core Functionality
1. Add `applyTranslations()` to all 35 apps that lack it
2. Ensure common buttons work (Generate, Download, etc.)
3. Test with German locale

### Phase 2: Complete UI
1. Add translations to all sidebar sections
2. Translate form labels and placeholders
3. Translate error/success messages

### Phase 3: Polish
1. Add missing translations to translations.js
2. Test all 11 languages
3. Fix any remaining untranslated text

## The Golden Rule

**Common functionality should look and work the same in every app, but each app's unique features should have their own specific translations that accurately describe what they do.**

For example:
- "Generate" button should always be "Erstellen" in German
- But "Grid Size" in Word Search is different from "Problem Count" in Addition
- Both need their own specific translations that make sense for that app

This way users get:
- Consistency for common actions
- Clarity for app-specific features