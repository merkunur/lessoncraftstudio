# How to Translate Browser File Input Buttons

## The Problem

Native browser file input controls (`<input type="file">`) display text like "Choose files" and "No file chosen" in the **browser's language**, not the web page's language. These cannot be translated via JavaScript because they are rendered by the browser itself.

## The Solution: Custom Button Approach

The **wordsearch app** solves this by:
1. Hiding the native file input
2. Creating a custom button that triggers the file input
3. Displaying custom text that can be translated

### HTML Structure

```html
<div style="position: relative; margin: 10px 0;">
    <!-- Custom button (translatable) -->
    <button type="button"
            id="customFileButton"
            class="action-button"
            data-translate="chooseFiles">
        Choose Files
    </button>

    <!-- Status text (translatable) -->
    <span id="fileSelectionText"
          style="margin-left: 10px; color: var(--app-text-secondary-dark-theme);"
          data-translate="noFileChosen">
        No file chosen
    </span>

    <!-- Hidden native file input -->
    <input type="file"
           id="imageUploadInput"
           multiple
           accept="image/*"
           style="position: absolute; left: -9999px;">
</div>
```

### JavaScript Implementation

```javascript
// Get elements
const customFileButton = document.getElementById('customFileButton');
const fileSelectionText = document.getElementById('fileSelectionText');
const imageUploadInput = document.getElementById('imageUploadInput');

// Click custom button triggers hidden file input
if (customFileButton) {
    customFileButton.addEventListener('click', () => {
        imageUploadInput.click();
    });
}

// Update text when files are selected
imageUploadInput.addEventListener('change', (e) => {
    if (fileSelectionText) {
        const fileCount = e.target.files.length;
        if (fileCount > 0) {
            // Show translated count: "3 file(s) selected"
            fileSelectionText.textContent = t('filesSelected').replace('{}', fileCount);
        } else {
            // Show translated "No file chosen"
            fileSelectionText.textContent = t('noFileChosen');
        }
    }
});
```

### Required Translation Keys

Add these keys to all 11 languages in your translation file:

```javascript
// English
"chooseFiles": "Choose files",
"noFileChosen": "No file chosen",
"filesSelected": "{} file(s) selected",

// German
"chooseFiles": "Dateien auswählen",
"noFileChosen": "Keine Datei ausgewählt",
"filesSelected": "{} Datei(en) ausgewählt",

// French
"chooseFiles": "Choisir des fichiers",
"noFileChosen": "Aucun fichier choisi",
"filesSelected": "{} fichier(s) sélectionné(s)",

// Spanish
"chooseFiles": "Elegir archivos",
"noFileChosen": "Ningún archivo elegido",
"filesSelected": "{} archivo(s) seleccionado(s)",

// Italian
"chooseFiles": "Scegli file",
"noFileChosen": "Nessun file scelto",
"filesSelected": "{} file selezionato/i",

// Portuguese
"chooseFiles": "Escolher arquivos",
"noFileChosen": "Nenhum arquivo escolhido",
"filesSelected": "{} arquivo(s) selecionado(s)",

// Dutch
"chooseFiles": "Bestanden kiezen",
"noFileChosen": "Geen bestand gekozen",
"filesSelected": "{} bestand(en) geselecteerd",

// Swedish
"chooseFiles": "Välj filer",
"noFileChosen": "Ingen fil vald",
"filesSelected": "{} fil(er) valda",

// Danish
"chooseFiles": "Vælg filer",
"noFileChosen": "Ingen fil valgt",
"filesSelected": "{} fil(er) valgt",

// Norwegian
"chooseFiles": "Velg filer",
"noFileChosen": "Ingen fil valgt",
"filesSelected": "{} fil(er) valgt",

// Finnish
"chooseFiles": "Valitse tiedostot",
"noFileChosen": "Ei valittua tiedostoa",
"filesSelected": "{} tiedosto(a) valittu",
```

## CSS Styling

### Hide Native Input
```css
input[type="file"] {
    position: absolute;
    left: -9999px;
}
```

### Style Custom Button
```css
.action-button {
    padding: 8px 16px;
    font-size: 14px;
    background-color: var(--app-bg-dark);
    color: var(--app-text-primary-dark-theme);
    border: 1px solid var(--app-border-dark);
    border-radius: 5px;
    cursor: pointer;
}

.action-button:hover {
    background-color: var(--app-surface-dark);
}
```

### Style Status Text
```css
#fileSelectionText {
    margin-left: 10px;
    color: var(--app-text-secondary-dark-theme);
    font-size: 14px;
}
```

## Benefits of This Approach

✅ **Fully translatable** - All text can be translated
✅ **Consistent styling** - Matches your app's design
✅ **Better UX** - Shows file count, not just filename
✅ **Cross-browser compatible** - Works everywhere
✅ **Accessible** - Still uses semantic HTML input
✅ **Customizable** - Complete control over appearance

## Complete Example for Treasure Hunt App

### 1. Add to HTML (around line 404-406)

Replace:
```html
<label for="imageUploadInput" data-translate="library.selectUpload">Select image(s) to upload:</label>
<input type="file" id="imageUploadInput" multiple accept="image/*">
```

With:
```html
<label for="imageUploadInput" data-translate="library.selectUpload">Select image(s) to upload:</label>
<div style="position: relative; margin: 10px 0;">
    <button type="button"
            id="customFileButton"
            class="action-button"
            style="padding: 8px 16px; font-size: 14px;"
            data-translate="library.chooseFiles">
        Choose Files
    </button>
    <span id="fileSelectionText"
          style="margin-left: 10px; color: #888;"
          data-translate="library.noFileChosen">
        No file chosen
    </span>
    <input type="file"
           id="imageUploadInput"
           multiple
           accept="image/*"
           style="position: absolute; left: -9999px;">
</div>
```

### 2. Add Translation Keys to `translations-treasure-hunt.js`

Add to each language section:

```javascript
en: {
    // ... existing keys ...
    "library.chooseFiles": "Choose files",
    "library.noFileChosen": "No file chosen",
    "library.filesSelected": "{x} file(s) selected",
},

de: {
    // ... existing keys ...
    "library.chooseFiles": "Dateien auswählen",
    "library.noFileChosen": "Keine Datei ausgewählt",
    "library.filesSelected": "{x} Datei(en) ausgewählt",
},

// ... repeat for all languages
```

### 3. Add JavaScript Event Handlers

Add after the `imageUploadInput` variable declaration (around line 713):

```javascript
// Custom file button handlers
const customFileButton = document.getElementById('customFileButton');
const fileSelectionText = document.getElementById('fileSelectionText');

if (customFileButton && imageUploadInput) {
    customFileButton.addEventListener('click', () => {
        imageUploadInput.click();
    });

    imageUploadInput.addEventListener('change', (e) => {
        if (fileSelectionText) {
            const fileCount = e.target.files.length;
            if (fileCount > 0) {
                fileSelectionText.textContent = formatTranslation(t('library.filesSelected'), { x: fileCount });
            } else {
                fileSelectionText.textContent = t('library.noFileChosen');
            }
        }
    });
}
```

## Alternative: Pure CSS Solution (Limited)

You can style the native button text with CSS, but **cannot translate** it:

```css
input[type="file"]::file-selector-button {
    margin-right: 10px;
    border: 1px solid var(--app-border-dark);
    background: var(--app-bg-dark);
    padding: 4px 8px;
    border-radius: 3px;
    color: var(--app-text-primary-dark-theme);
    cursor: pointer;
}

input[type="file"]::file-selector-button:hover {
    background: var(--app-surface-dark);
}
```

**Limitation**: The button text remains in browser's language.

## Comparison

| Approach | Translatable | Custom Styling | File Count | Complexity |
|----------|-------------|----------------|------------|------------|
| Native input | ❌ No | ⚠️ Limited | ❌ No | Low |
| CSS only | ❌ No | ✅ Yes | ❌ No | Low |
| **Custom button** | **✅ Yes** | **✅ Yes** | **✅ Yes** | Medium |

## Conclusion

The **custom button approach** is the **only way** to fully translate file input controls. This is the industry-standard solution used by professional web applications and is demonstrated in the wordsearch app.
