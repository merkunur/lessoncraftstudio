# App Standardization Guide - Complete Fix Patterns

## ✅ Completed Apps (5/33)
1. Word Search
2. Math Worksheets  
3. Alphabet Train
4. Coloring Pages
5. Image Addition

## 🔧 Standard Fixes to Apply to Remaining 28 Apps

### 1. MULTILINGUAL SUPPORT (Critical)

#### A. Add to HTML Head
```html
<script src="/js/translations.js"></script>
```

#### B. Add Language Selector (After title, before main controls)
```html
<div class="language-selector">
    <label data-translate-key="language">Language:</label>
    <select id="languageSelect">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="pt">Português</option>
        <option value="it">Italiano</option>
        <option value="nl">Nederlands</option>
        <option value="sv">Svenska</option>
        <option value="da">Dansk</option>
        <option value="no">Norsk</option>
        <option value="fi">Suomi</option>
    </select>
</div>
```

#### C. JavaScript Initialization (At TOP of script, BEFORE any DOM elements)
```javascript
// MUST BE FIRST - Before ANY DOM element references
let currentLocale = 'en';

// Initialize locale from URL if present
const urlParams = new URLSearchParams(window.location.search);
const localeParam = urlParams.get('locale');
if (localeParam) {
    currentLocale = localeParam;
}
```

#### D. Add Language Handler (AFTER all DOM elements are defined)
```javascript
// MUST BE AFTER all getElementById calls
const languageSelect = document.getElementById('languageSelect');
if (languageSelect) {
    languageSelect.value = currentLocale;
    languageSelect.addEventListener('change', function() {
        currentLocale = this.value;
        applyTranslations();
        loadThemes(); // Reload themes with translations
        // If images are loaded, reload them
        if (dictThemeEl && dictThemeEl.value && dictThemeEl.value !== 'all') {
            renderImagesAfterLoadOrSearch();
        }
    });
}

// Apply translations on load
applyTranslations();
```

#### E. Update ALL API Calls
```javascript
// Themes API - use translated endpoint
const response = await fetch(`/api/themes-translated?locale=${currentLocale}`);

// Images API - add locale parameter
const response = await fetch(`/api/images?theme=${theme}&locale=${currentLocale}`);
const response = await fetch(`/api/images?search=${query}&locale=${currentLocale}`);
```

#### F. Display Translated Names
```javascript
// Use name (translated) instead of word (English only)
const displayName = imgData.name || imgData.word;
item.innerHTML = `<img src="${imgData.path}" alt="${displayName}"/><span>${displayName}</span>`;
```

### 2. STANDARD PAGE SIZES

#### A. Default Canvas Configuration (Replace any existing dimensions)
```javascript
let currentCanvasConfig = { width: 612, height: 792 }; // Letter Portrait default
```

#### B. Page Size Selector HTML (Add after language selector)
```html
<div class="control-group">
    <label data-translate-key="pageSize">Page Size:</label>
    <select id="pageSizeSelect">
        <option value="612x792">Letter Portrait (612×792)</option>
        <option value="792x612">Letter Landscape (792×612)</option>
        <option value="595x842">A4 Portrait (595×842)</option>
        <option value="842x595">A4 Landscape (842×595)</option>
        <option value="1200x1200">Square (1200×1200)</option>
        <option value="custom">Custom</option>
    </select>
    <div id="customSizeInputs" style="display: none;">
        <input type="number" id="customWidth" placeholder="Width" min="100" max="2000">
        <input type="number" id="customHeight" placeholder="Height" min="100" max="2000">
    </div>
</div>
```

#### C. Page Size Handler
```javascript
const pageSizeSelect = document.getElementById('pageSizeSelect');
const customSizeInputs = document.getElementById('customSizeInputs');
const customWidth = document.getElementById('customWidth');
const customHeight = document.getElementById('customHeight');

pageSizeSelect.addEventListener('change', function() {
    if (this.value === 'custom') {
        customSizeInputs.style.display = 'inline-block';
    } else {
        customSizeInputs.style.display = 'none';
        const [width, height] = this.value.split('x').map(Number);
        updateCanvasDisplayDimensions(width, height);
    }
});

customWidth.addEventListener('change', updateCustomSize);
customHeight.addEventListener('change', updateCustomSize);

function updateCustomSize() {
    const width = parseInt(customWidth.value) || 612;
    const height = parseInt(customHeight.value) || 792;
    updateCanvasDisplayDimensions(width, height);
}
```

### 3. CANVAS DISPLAY SCALING FIX

#### A. CSS Fixes (Add to style section)
```css
/* Fix canvas clipping with zoom */
.canvas-container-wrapper {
    overflow: visible !important;  /* Changed from auto */
    position: relative;
    margin: 20px auto;
}

.canvas-container {
    overflow: visible !important;
    position: relative !important;
    margin: 0 auto;
}

/* Ensure proper centering */
#canvasWrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 400px;
    padding: 20px;
}
```

#### B. Canvas Display Dimensions Function
```javascript
function updateCanvasDisplayDimensions(width, height) {
    currentCanvasConfig.width = width;
    currentCanvasConfig.height = height;
    
    const maxDisplayWidth = window.innerWidth * 0.8;
    const maxDisplayHeight = window.innerHeight * 0.7;
    
    let displayWidth = width;
    let displayHeight = height;
    
    // Calculate scale to fit screen
    const scaleX = maxDisplayWidth / width;
    const scaleY = maxDisplayHeight / height;
    const scale = Math.min(scaleX, scaleY, 1);
    
    displayWidth = Math.round(width * scale);
    displayHeight = Math.round(height * scale);
    
    // Apply zoom for display
    const finalZoom = displayWidth / width;
    canvas.setZoom(finalZoom);
    
    // CRITICAL: Set dimensions AFTER zoom
    canvas.setDimensions({
        width: displayWidth,
        height: displayHeight
    });
    
    // Re-render canvas
    canvas.renderAll();
}

// Initialize on load
updateCanvasDisplayDimensions(currentCanvasConfig.width, currentCanvasConfig.height);

// Update on window resize
window.addEventListener('resize', () => {
    updateCanvasDisplayDimensions(currentCanvasConfig.width, currentCanvasConfig.height);
});
```

### 4. PDF/JPEG EXPORT FIX

#### A. Fixed Export Functions
```javascript
async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    
    // Save current state
    const currentZoom = canvas.getZoom();
    const currentWidth = canvas.getWidth();
    const currentHeight = canvas.getHeight();
    
    // Reset to actual size for export
    canvas.setZoom(1);
    canvas.setDimensions({
        width: currentCanvasConfig.width,
        height: currentCanvasConfig.height
    });
    
    // Determine orientation
    const orientation = currentCanvasConfig.width > currentCanvasConfig.height ? 'landscape' : 'portrait';
    
    // Create PDF with user-selected dimensions
    const pdf = new jsPDF({
        orientation: orientation,
        unit: 'pt',
        format: [currentCanvasConfig.width, currentCanvasConfig.height]
    });
    
    // Get canvas data
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Add image at full page size
    pdf.addImage(imgData, 'JPEG', 0, 0, currentCanvasConfig.width, currentCanvasConfig.height);
    
    // Restore display state
    canvas.setZoom(currentZoom);
    canvas.setDimensions({
        width: currentWidth,
        height: currentHeight
    });
    
    // Save PDF
    pdf.save('worksheet.pdf');
}

async function downloadJPEG() {
    // Save current state
    const currentZoom = canvas.getZoom();
    const currentWidth = canvas.getWidth();
    const currentHeight = canvas.getHeight();
    
    // Reset for export
    canvas.setZoom(1);
    canvas.setDimensions({
        width: currentCanvasConfig.width,
        height: currentCanvasConfig.height
    });
    
    // Get data URL
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    
    // Restore display state
    canvas.setZoom(currentZoom);
    canvas.setDimensions({
        width: currentWidth,
        height: currentHeight
    });
    
    // Download
    const link = document.createElement('a');
    link.download = 'worksheet.jpg';
    link.href = dataURL;
    link.click();
}
```

### 5. IMAGE LOADING OPTIMIZATION

#### A. Lazy Loading Pattern
```javascript
let allImages = [];
let loadedImageCount = 0;
const INITIAL_LOAD_COUNT = 10;

async function loadThemeImages(theme) {
    const response = await fetch(`/api/images?theme=${theme}&locale=${currentLocale}`);
    const data = await response.json();
    allImages = data.images || [];
    
    // Load first batch immediately
    displayImages(allImages.slice(0, INITIAL_LOAD_COUNT));
    
    // Load rest lazily
    if (allImages.length > INITIAL_LOAD_COUNT) {
        setTimeout(() => {
            displayImages(allImages.slice(INITIAL_LOAD_COUNT));
        }, 100);
    }
}

function displayImages(images) {
    images.forEach(imgData => {
        const item = document.createElement('div');
        item.className = 'dict-item';
        const displayName = imgData.name || imgData.word;
        
        // Use lazy loading
        item.innerHTML = `
            <img src="${imgData.path}" 
                 alt="${displayName}" 
                 loading="lazy"
                 decoding="async"/>
            <span>${displayName}</span>
        `;
        
        item.onclick = () => selectImage(imgData);
        imageGrid.appendChild(item);
    });
}
```

### 6. DEFAULT THEME LOADING

```javascript
// When "All Themes" is selected with no search, load animals by default
if (dictThemeEl.value === 'all' && !searchQuery) {
    loadThemeImages('animals');
} else if (dictThemeEl.value !== 'all') {
    loadThemeImages(dictThemeEl.value);
}
```

## 📋 QUICK IMPLEMENTATION CHECKLIST

For each of the remaining 28 apps:

1. **Add translations.js to head**
2. **Add language selector HTML**
3. **Initialize currentLocale at top of script**
4. **Add language change handler after DOM elements**
5. **Update all API calls to include locale**
6. **Set default canvas to 612×792**
7. **Add page size selector**
8. **Fix canvas overflow CSS**
9. **Implement updateCanvasDisplayDimensions()**
10. **Fix PDF/JPEG export with zoom reset**
11. **Add lazy loading for images**
12. **Load "animals" as default theme**
13. **Test all 11 languages**

## 🎯 Common Pitfalls to Avoid

1. **DOM Order**: NEVER reference DOM elements before they're defined
2. **ID Mismatches**: Ensure HTML id matches getElementById exactly
3. **Zoom Issues**: Always set dimensions AFTER setting zoom
4. **Export State**: Always save/restore zoom state for exports
5. **Image Performance**: Always use lazy loading for image grids
6. **API Locale**: Never forget &locale=${currentLocale} parameter

## 🚀 Remaining Apps to Fix (28)

### Core Bundle (7 remaining):
- find-and-count
- matching-app  
- drawing-lines
- picture-bingo
- sudoku
- word-scramble
- math-worksheet

### Full Access (21 remaining):
- big-small-app
- chart-count-color
- code-addition
- draw-and-color
- find-objects
- grid-match
- image-crossword
- image-cryptogram
- math-puzzle
- missing-pieces
- more-less
- odd-one-out
- pattern-train
- pattern-worksheet
- picture-path
- picture-sort
- prepositions
- shadow-match
- story-dice
- subtraction
- treasure-hunt
- word-guess
- writing-app

## Testing Each Fix

After applying fixes to each app:
1. ✅ Language selector changes UI language
2. ✅ Themes show translated names
3. ✅ Images show translated names
4. ✅ Canvas doesn't clip when zoomed
5. ✅ Page size selector works
6. ✅ PDF exports at correct dimensions
7. ✅ JPEG exports at correct dimensions
8. ✅ Images load without performance issues
9. ✅ Default "animals" theme loads
10. ✅ Canvas centers properly on screen