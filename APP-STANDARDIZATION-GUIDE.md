# App Standardization Guide - Complete Fix Patterns

## 🎯 GOLDEN RULE: Preview ≠ Download

**REMEMBER THIS ALWAYS**:
- **Screen Preview**: SCALED UP 25% for comfortable editing (e.g., ~765×990 pixels on screen)
- **Downloaded Files**: EXACT DIMENSIONS for professional printing (e.g., 612×792 points)
- **Why**: Publishing businesses need pixel-perfect PDFs that match international paper sizes

```
User sees on screen: 765×990 (scaled for visibility)
User downloads: 612×792 (exact Letter size for printing)
THESE ARE DIFFERENT AND THAT'S CORRECT!
```

## ✅ Completed Apps (20/33)
1. Word Search ✅ (Reference implementation)
2. Math Worksheets ✅
3. Alphabet Train ✅
4. Coloring Pages ✅
5. Image Addition ✅
6. Word Scramble ✅
7. Find and Count ✅
8. Matching App ✅
9. Picture Bingo ✅
10. Drawing Lines ✅
11. Sudoku ✅
12. Big Small ✅ FULLY STANDARDIZED (2025-09-09)
13. Chart Count Color ✅ FULLY STANDARDIZED (2025-09-09)
14. Code Addition ✅ FULLY STANDARDIZED (2025-09-09)
15. Draw and Color ✅ FULLY STANDARDIZED (2025-09-09)
16. Find Objects ✅ FULLY STANDARDIZED (2025-09-10)
17. Grid Match ✅ FULLY STANDARDIZED (2025-09-10)
18. Image Crossword ✅ FULLY STANDARDIZED (2025-09-10)
19. Image Cryptogram ✅ FULLY STANDARDIZED (2025-09-10)
20. Pattern Worksheet ✅ FULLY STANDARDIZED (2025-09-11)

## 🔧 Standard Fixes to Apply to Remaining 13 Apps

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

### 2. ⚠️ CRITICAL DISTINCTION: SCREEN PREVIEW vs DOWNLOAD SIZES

**FUNDAMENTAL CONCEPT**: Screen preview and downloads serve COMPLETELY DIFFERENT purposes!

```
┌─────────────────────────────────────────────────────────────────┐
│                    TWO SEPARATE SIZE SYSTEMS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. SCREEN PREVIEW (For Editing)     2. DOWNLOADS (For Printing) │
│  ┌────────────────────┐              ┌────────────────────┐     │
│  │ SCALED for viewing │              │ EXACT dimensions   │     │
│  │ 25% larger display │              │ 612×792 points     │     │
│  │ ~765×990 pixels    │     ≠        │ No scaling!        │     │
│  │ Fits on screen     │              │ Publishing ready   │     │
│  └────────────────────┘              └────────────────────┘     │
│                                                                   │
│  Purpose: Comfortable               Purpose: Professional        │
│  editing & preview                  printing & publishing        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Why This Matters**:
- **Publishing Businesses**: Need EXACT dimensions (612×792) for professional printing
- **Screen Editing**: Needs LARGER preview (25% scaled) for comfortable viewing
- **NEVER MIX THESE UP**: Downloads must NEVER use preview scaling!

#### A. Default Canvas Configuration (Industry Standard Sizes)
```javascript
// CRITICAL: This stores the ACTUAL document size for downloads
let currentCanvasConfig = { width: 612, height: 792 }; // Letter Portrait - EXACT publishing size

// These are the ONLY acceptable sizes for publishing:
// Letter Portrait: 612×792 points (8.5" × 11")
// Letter Landscape: 792×612 points (11" × 8.5")
// A4 Portrait: 595×842 points (210mm × 297mm)
// A4 Landscape: 842×595 points (297mm × 210mm)
// Square: 1200×1200 points (custom format)
```

**Download Requirements** (STRICT):
- ✅ MUST use exact dimensions from currentCanvasConfig
- ✅ MUST reset zoom to 1.0 before export
- ✅ MUST produce pixel-perfect output for printing
- ❌ NEVER apply preview scaling to downloads
- ❌ NEVER use display dimensions for exports

**Screen Preview Requirements** (FLEXIBLE):
- ✅ Should be 25% larger than actual size for visibility
- ✅ Should fit within the available tab space
- ✅ Should be consistent across all apps
- ✅ Can be scaled based on window size

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

#### ⚠️ CRITICAL - Screen Preview Size MUST Match Across All Apps

**Visual Comparison - What Users Should See:**
```
CORRECT (All standardized apps):
┌─────────────────────────────────┐
│ Letter Portrait (612×792)       │
│ Screen Preview: ~765×990 pixels │ (25% larger for visibility)
│ Centered in tab                 │
└─────────────────────────────────┘

WRONG (Non-standardized apps):
┌─────────────────────────────────┐
│ Letter Portrait (612×792)       │
│ Screen Preview: 489×633 pixels  │ (80% of window - TOO SMALL!)
│ Off-center or misaligned        │
└─────────────────────────────────┘
```

**The Problem**: Different apps were using different scaling methods:
- ❌ Some used `window.innerWidth * 0.8` (wrong!)
- ❌ Some set canvas size directly to 612×792 (no scaling!)
- ✅ Word Search uses tab parent + 1.25x scale (CORRECT!)

**The Solution**: ALL apps MUST use Word Search's exact method

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

#### B. Canvas Display Dimensions Function (MUST BE IDENTICAL IN ALL APPS)

**⚠️ CRITICAL**: This EXACT implementation must be used in ALL apps. Do NOT use window.innerWidth/Height!

```javascript
// CRITICAL: Copy this function EXACTLY - no modifications allowed!
function updateCanvasDisplayDimensions(width, height) {
    currentCanvasConfig.width = width;
    currentCanvasConfig.height = height;
    
    // CRITICAL: Use tab's parent element, NOT window dimensions
    // Replace 'worksheetTab' with your app's actual tab ID
    const mainStyle = document.getElementById('worksheetTab').parentElement;
    const availableWidth = mainStyle.clientWidth - 50; 
    const availableHeight = mainStyle.clientHeight - 50;
    
    // Apply 25% scaling for better visibility
    // Extra 25% for landscape orientations
    const isLandscape = width > height;
    const baseScale = 1.25; // Base 25% larger for all
    const landscapeBonus = isLandscape ? 1.25 : 1.0; // Additional 25% for landscape
    const displayScale = baseScale * landscapeBonus;
    
    // Calculate display dimensions with scaling
    const scaledWidth = width * displayScale;
    const scaledHeight = height * displayScale;
    
    // Ensure it fits in available space
    const scaleRatio = Math.min(availableWidth / scaledWidth, availableHeight / scaledHeight, 1);
    const displayWidth = scaledWidth * scaleRatio;
    const displayHeight = scaledHeight * scaleRatio;
    
    // Apply to ALL canvases in the app (worksheet, answer key, etc.)
    [worksheetCanvas, answerKeyCanvas].forEach(c => {
        if (c) {
            // Apply zoom for display scaling
            const finalZoom = (displayWidth / width);
            c.setZoom(finalZoom);
            
            // Set dimensions AFTER zoom to ensure viewport matches zoomed size
            c.setDimensions({
                width: displayWidth,
                height: displayHeight
            });
            
            c.renderAll();
        }
    });
    
    // Update wrapper dimensions if your app has them
    [worksheetCanvasWrapper, answerKeyCanvasWrapper].forEach(w => {
        if(w) {
            w.style.width = displayWidth + 'px';
            w.style.height = displayHeight + 'px';
        }
    });
}

// CRITICAL: Canvas initialization WITHOUT dimensions
function initializeCanvas(canvasEl) {
    return new fabric.Canvas(canvasEl, {
        backgroundColor: '#FFFFFF',  // or '#fff'
        preserveObjectStacking: true,
        enableRetinaScaling: true
        // DO NOT set width/height here!
    });
}

// Initialize canvases and THEN set display dimensions
worksheetCanvas = initializeCanvas(worksheetCanvasElement);
answerKeyCanvas = initializeCanvas(answerKeyCanvasElement);

// CRITICAL: Call this AFTER canvas creation
updateCanvasDisplayDimensions(currentCanvasConfig.width, currentCanvasConfig.height);

// Update on window resize for responsive behavior
window.addEventListener('resize', () => {
    updateCanvasDisplayDimensions(currentCanvasConfig.width, currentCanvasConfig.height);
});
```

**Common Mistakes to Avoid:**
1. ❌ DO NOT use `window.innerWidth * 0.8` or `window.innerHeight * 0.7`
2. ❌ DO NOT set canvas dimensions in the constructor
3. ❌ DO NOT use different scaling factors
4. ✅ ALWAYS use tab's parent element for available space
5. ✅ ALWAYS apply 1.25x base scale + 1.25x landscape bonus
6. ✅ ALWAYS initialize canvas without dimensions, then call updateCanvasDisplayDimensions

### 4. ALIGNMENT TOOLS - CENTER TO PAGE, NOT VIEWPORT

**⚠️ CRITICAL**: Alignment must be based on ACTUAL page dimensions, not the scaled viewport!

```
WRONG (Using viewport/display dimensions):     CORRECT (Using actual page dimensions):
┌────────────────────────────┐                ┌────────────────────────────┐
│ Center based on zoom view  │                │ Center to 612×792 page     │
│ ❌ Changes with zoom level │                │ ✅ Always page center      │
│ ❌ Wrong on export         │                │ ✅ Correct on export       │
└────────────────────────────┘                └────────────────────────────┘
```

#### Correct Alignment Implementation:
```javascript
function alignObjects(type) {
    const activeCanvas = getActiveCanvas();
    const activeObj = activeCanvas.getActiveObject();
    if (!activeObj) return;

    if (type.includes('Canvas')) {
        // CRITICAL: Use currentCanvasConfig, NOT canvas.width/height!
        const canvasWidth = currentCanvasConfig.width;
        const canvasHeight = currentCanvasConfig.height;
        
        if (type === 'centerHCanvas') {
            // Get object dimensions
            const objWidth = activeObj.getScaledWidth();
            const currentOriginX = activeObj.originX;
            
            // Calculate center position based on origin
            let centerLeft;
            if (currentOriginX === 'center') {
                centerLeft = canvasWidth / 2;
            } else if (currentOriginX === 'right') {
                centerLeft = (canvasWidth / 2) + (objWidth / 2);
            } else { // left or default
                centerLeft = (canvasWidth / 2) - (objWidth / 2);
            }
            
            activeObj.set('left', centerLeft);
        }
        
        if (type === 'centerVCanvas') {
            // Get object dimensions
            const objHeight = activeObj.getScaledHeight();
            const currentOriginY = activeObj.originY;
            
            // Calculate center position based on origin
            let centerTop;
            if (currentOriginY === 'center') {
                centerTop = canvasHeight / 2;
            } else if (currentOriginY === 'bottom') {
                centerTop = (canvasHeight / 2) + (objHeight / 2);
            } else { // top or default
                centerTop = (canvasHeight / 2) - (objHeight / 2);
            }
            
            activeObj.set('top', centerTop);
        }
        
        activeObj.setCoords();
    }
    // ... rest of alignment logic for groups
}
```

**Common Mistakes**:
- ❌ Using `canvas.width / 2` or `canvas.height / 2` (viewport dimensions)
- ❌ Using `activeObj.centerH()` or `activeObj.centerV()` (uses viewport)
- ✅ ALWAYS use `currentCanvasConfig.width / 2` and `currentCanvasConfig.height / 2`
- ✅ Account for object's originX and originY settings

**Why This Matters**:
- Users expect "Center" to mean center of the page they'll print
- Viewport center changes with zoom level
- Page center (612×792) remains constant
- Ensures alignment is preserved in PDF/JPEG exports

**Other Places to Check**:
Always use `currentCanvasConfig.width/height` instead of `canvas.width/height` for:
- Watermark positioning
- Object centering in generated content
- Layout calculations
- Any position that should be relative to the actual page

### 5. PDF/JPEG EXPORT - STRICT PUBLISHING STANDARDS

**🚨 CRITICAL FOR PUBLISHING BUSINESSES**: 
Downloads MUST be EXACT dimensions - NOT the scaled preview size!

```
WRONG Export (Using preview size):          CORRECT Export (Using actual size):
┌──────────────────────────┐                ┌──────────────────────────┐
│ PDF Output: 765×990      │                │ PDF Output: 612×792      │
│ ❌ Won't print correctly │                │ ✅ Professional printing │
│ ❌ Wrong paper size      │                │ ✅ Exact paper size      │
│ ❌ Scaling issues        │                │ ✅ No scaling needed     │
└──────────────────────────┘                └──────────────────────────┘
```

#### A. Fixed Export Functions (Must Reset Zoom for Pixel-Perfect Output)
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

### 7. ALIGNMENT TOOL CENTER FIX

**Problem**: The alignment tool centers objects to the display (zoomed) canvas center, not the actual canvas center.

**Solution**: Use actual canvas dimensions from `currentCanvasConfig` instead of display dimensions.

```javascript
function alignObjects(type) {
    const canvas = getActiveCanvas();
    const activeObj = canvas.getActiveObject();
    if (!activeObj) return;

    if (type.includes('Canvas')) {
        // Use actual canvas dimensions, not display dimensions
        const actualCenterX = currentCanvasConfig.width / 2;
        const actualCenterY = currentCanvasConfig.height / 2;
        
        if (type === 'centerHCanvas') {
            activeObj.set('left', actualCenterX);
            if (activeObj.originX !== 'center') {
                activeObj.set('left', actualCenterX - (activeObj.width * activeObj.scaleX) / 2);
            }
        }
        if (type === 'centerVCanvas') {
            activeObj.set('top', actualCenterY);
            if (activeObj.originY !== 'center') {
                activeObj.set('top', actualCenterY - (activeObj.height * activeObj.scaleY) / 2);
            }
        }
        activeObj.setCoords();
    }
    // ... rest of alignment logic
}
```

### 8. LAYOUT BOUNDARY CONTAINMENT

**Problem**: Generated content exceeds page borders, especially with many items or different page sizes.

**Solution**: Use consistent margins and proper sizing calculations.

```javascript
function renderToCanvas(canvas, data) {
    // Use actual canvas dimensions
    const canvasWidth = currentCanvasConfig.width;
    const canvasHeight = currentCanvasConfig.height;
    
    // Define consistent margins
    const topMargin = 100;     // Space for title/instructions
    const sideMargin = 40;     // Consistent side margins
    const bottomMargin = 40;   // Bottom margin for layout
    
    // Calculate content area
    const contentWidth = canvasWidth - (sideMargin * 2);
    const contentHeight = canvasHeight - topMargin - bottomMargin;
    
    // For grids or item layouts
    const maxCellSize = 80;  // Limit max size to prevent overflow
    const cellSize = Math.min(
        (contentWidth - gaps) / columns,
        (contentHeight - gaps) / rows,
        maxCellSize
    );
    
    // Position content within margins
    const contentX = sideMargin + (contentWidth - actualWidth) / 2;
    const contentY = topMargin + spacing;
    
    // For bottom elements (legend, footer, etc.)
    const legendY = canvasHeight - elementHeight - bottomMargin;
}
```

## 📋 QUICK IMPLEMENTATION CHECKLIST

For each of the remaining 25 apps (Find and Count and Matching App are now fixed):

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
13. **Fix alignment tool to use actual canvas center**
14. **Implement proper layout boundaries with margins**
15. **Test all 11 languages**

## 🎯 Common Pitfalls to Avoid

1. **DOM Order**: NEVER reference DOM elements before they're defined
2. **ID Mismatches**: Ensure HTML id matches getElementById exactly
3. **Zoom Issues**: Always set dimensions AFTER setting zoom
4. **Export State**: Always save/restore zoom state for exports
5. **Image Performance**: Always use lazy loading for image grids
6. **API Locale**: Never forget &locale=${currentLocale} parameter

## 🚀 Remaining Apps to Fix (13)

### Core Bundle: ✅ ALL COMPLETED!

### Full Access (13 remaining):
- math-puzzle
- missing-pieces
- more-less
- odd-one-out
- pattern-train
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