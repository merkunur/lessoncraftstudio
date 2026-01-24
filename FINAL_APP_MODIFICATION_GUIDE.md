# FINAL APP MODIFICATION GUIDE
## Comprehensive Implementation Guide for Worksheet Generator Apps

**Version**: 1.2.0
**Reference App**: Word Search Generator
**Last Updated**: 2025-10-15 (Added Feature 5: Contextual Toolbar Localization - Complete translation system documentation)
**Author**: Claude Code

---

## ⚠️ CRITICAL: WORDSEARCH IS YOUR ABSOLUTE REFERENCE ⚠️

**READ THIS BEFORE DOING ANYTHING:**

1. **NEVER improvise or create your own implementation**
2. **ALWAYS copy the EXACT structure from wordsearch**
3. **DO NOT try to be "clever" or "optimize" the code**
4. **When in doubt, check wordsearch and copy it exactly**

**The wordsearch app is the gold standard.** Any deviation from its implementation will cause bugs.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Feature 1: Modern Header Design](#feature-1-modern-header-design)
4. [Feature 2: Zoom Controls](#feature-2-zoom-controls)
5. [Feature 3: Border/Background Editability](#feature-3-borderbackground-editability)
6. [Feature 4: Enhanced Layer Controls](#feature-4-enhanced-layer-controls)
7. [Feature 5: Contextual Toolbar Localization](#feature-5-contextual-toolbar-localization)
8. [Feature 6: Undo/Redo Functionality](#feature-6-undoredo-functionality)
9. [Common Pitfalls & Solutions](#common-pitfalls--solutions)
10. [Testing Checklist](#testing-checklist)
11. [Deployment Procedure](#deployment-procedure)
12. [Rollback Procedure](#rollback-procedure)

---

## Overview

This guide documents all modifications made to worksheet generator apps to achieve:
- Modern, professional UI with gradient header design
- Consolidated controls in unified header
- Full zoom in/out functionality
- Editable borders and backgrounds with contextual toolbar support
- Enhanced z-order controls (Bring to Front, Send to Back, Bring Forward, Send Backward)

**Total Implementation Time**: ~2-3 hours per app
**Complexity Level**: Medium-High
**Risk Level**: Low (with proper testing)

---

## Prerequisites

### Before Starting ANY Modifications:

1. **Create Backup**
   ```bash
   # On server
   cp /opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP_NAME].html \
      /opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP_NAME].html.backup

   # Download local copy
   pscp root@SERVER:/opt/.../[APP_NAME].html C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html
   ```

2. **Verify File Paths**
   - Source: `/opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP_NAME].html`
   - Standalone: `/opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html`

3. **Check Current Structure**
   - Read entire file to understand current layout
   - Identify existing header structure
   - Locate canvas initialization code
   - Find existing z-order functions (if any)
   - Identify border/background implementation

4. **Technology Stack Verification**
   - Confirm app uses Fabric.js for canvas
   - Verify Next.js standalone mode deployment
   - Check PM2 process management

---

## Feature 1: Modern Header Design

### Goal
Transform plain white header into modern gradient design with all controls consolidated in one unified header at the top of the page.

---

### 🚨 CRITICAL WARNING - READ THIS FIRST 🚨

**DO NOT CREATE SEPARATE BUTTONS FOR GENERATE/DOWNLOAD IN THE HEADER!**

**WRONG** ❌:
```html
<!-- DO NOT DO THIS! -->
<button id="generateWorksheetBtn">Generate Worksheet</button>
<button id="generateAnswerKeyBtn">Generate Answer Key</button>
<button id="downloadBtn">Download</button>
```

**CORRECT** ✅:
```html
<!-- Use DROPDOWNS like wordsearch! -->
<div class="dropdown-container">
    <button id="generateDropdownBtn">Generate <i class="fas fa-caret-down"></i></button>
    <div id="generateDropdownContent">
        <button id="generateWorksheetBtn">Generate Worksheet</button>
        <button id="generateAnswerKeyBtn">Generate Answer Key</button>
    </div>
</div>
```

**WHY**: The wordsearch reference app uses dropdown menus for Generate and Download buttons. You MUST copy this structure exactly. Do NOT improvise or create your own structure.

**BEFORE YOU START**:
1. Open wordsearch app HTML file
2. Find the `<div class="tab-row">` section
3. Copy the EXACT HTML structure from wordsearch
4. Only change element IDs if they conflict with existing elements

---

### Step 1.1: Analyze Current Header

**CRITICAL**: Before making changes, identify:
- Current tab structure (usually "Worksheet" and "Answer Key" tabs)
- Location of existing controls (Generate, Download, Clear All)
- Current zoom controls location (if exists)
- CSS class names used

**Example from Word Search**:
```html
<!-- OLD STRUCTURE -->
<div class="tab-row">
    <button class="tab active">Worksheet</button>
    <button class="tab">Answer Key</button>
</div>
<!-- Controls scattered elsewhere -->
```

### Step 1.2: Create New Header Structure

**Location**: Find the HTML section with tabs (usually within first 1000 lines)

**New HTML Structure**:
```html
<!-- MODERN UNIFIED HEADER -->
<div class="tab-row">
    <!-- Left side: Tabs -->
    <div class="tab-group">
        <button class="tab active" id="worksheetTab" data-translate="worksheet">Worksheet</button>
        <button class="tab" id="answerKeyTab" data-translate="answerKey">Answer Key</button>
    </div>

    <!-- Right side: All controls -->
    <div class="header-actions">
        <!-- Zoom Controls -->
        <div class="zoom-controls">
            <button class="action-button zoom-btn" id="zoomOutBtn" title="Zoom Out">
                <span>−</span>
            </button>
            <span class="zoom-level" id="zoomLevel">100%</span>
            <button class="action-button zoom-btn" id="zoomInBtn" title="Zoom In">
                <span>+</span>
            </button>
        </div>

        <!-- Main Actions -->
        <button class="action-button primary" id="generateBtn" data-translate="generate">Generate</button>
        <button class="action-button secondary" id="downloadBtn" data-translate="download">Download</button>
        <button class="action-button danger" id="clearAllBtn" data-translate="clearAll">Clear All</button>
    </div>
</div>
```

### Step 1.3: Add Modern CSS Styling

**Location**: Find `<style>` tag, add these styles (usually after line 200-500)

```css
/* ============================================
   MODERN UNIFIED HEADER STYLES
   ============================================ */

.tab-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 15;
    border-radius: 0;
    margin: 0;
}

.tab-group {
    display: flex;
    gap: 8px;
    align-items: center;
}

.tab {
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
    position: relative;
}

.tab:hover {
    background: rgba(255, 255, 255, 0.25);
    color: white;
    transform: translateY(-1px);
}

.tab.active {
    background: rgba(255, 255, 255, 0.95);
    color: #667eea;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Header Actions Container */
.header-actions {
    display: flex;
    gap: 10px;
    align-items: center;
}

/* Zoom Controls */
.zoom-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    backdrop-filter: blur(10px);
}

.zoom-btn {
    width: 28px;
    height: 28px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.zoom-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

.zoom-level {
    min-width: 45px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: white;
    user-select: none;
}

/* Action Buttons */
.action-button {
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.action-button.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.action-button.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.action-button.secondary {
    background: rgba(255, 255, 255, 0.95);
    color: #667eea;
    border: 2px solid rgba(255, 255, 255, 0.5);
}

.action-button.secondary:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-button.danger {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.action-button.danger:hover {
    background: rgba(255, 59, 48, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 59, 48, 0.3);
}
```

### Step 1.4: Update JavaScript Variables

**CRITICAL**: Find variable declarations (usually around line 1100-1200) and update:

```javascript
// Tab elements
const worksheetTab = getEl('worksheetTab');
const answerKeyTab = getEl('answerKeyTab');

// Header action buttons
const generateBtn = getEl('generateBtn');
const downloadBtn = getEl('downloadBtn');
const clearAllBtn = getEl('clearAllBtn');

// Zoom controls
const zoomInBtn = getEl('zoomInBtn');
const zoomOutBtn = getEl('zoomOutBtn');
const zoomLevel = getEl('zoomLevel');
```

**Verify Event Listeners**: Ensure existing event listeners still work with new IDs

---

## Feature 2: Zoom Controls

### Goal
Add zoom in/out functionality to canvas with visual zoom level indicator.

### Step 2.1: Add Zoom Variables

**Location**: Near canvas variable declarations (usually line 1100-1200)

```javascript
// Zoom functionality
let currentZoom = 1.0;
const MIN_ZOOM = 0.25;  // 25%
const MAX_ZOOM = 3.0;   // 300%
const ZOOM_STEP = 0.1;  // 10% per click
```

### Step 2.2: Create Zoom Functions

**Location**: Add near other utility functions (usually line 1500-2000)

```javascript
// ============================================
// ZOOM FUNCTIONALITY
// ============================================

function updateZoom(newZoom) {
    const canvas = getActiveCanvas();
    if (!canvas) return;

    // Clamp zoom value
    currentZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));

    // Apply zoom
    canvas.setZoom(currentZoom);
    canvas.renderAll();

    // Update display
    const zoomPercentage = Math.round(currentZoom * 100);
    zoomLevel.textContent = `${zoomPercentage}%`;

    console.log('[ZOOM] Updated to:', zoomPercentage + '%');
}

function zoomIn() {
    updateZoom(currentZoom + ZOOM_STEP);
}

function zoomOut() {
    updateZoom(currentZoom - ZOOM_STEP);
}

function resetZoom() {
    updateZoom(1.0);
}
```

### Step 2.3: Add Event Listeners

**Location**: In event listener section (usually line 1400-1500)

```javascript
// Zoom controls
zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);

// Optional: Mouse wheel zoom
canvasContainer.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    }
}, { passive: false });
```

### Step 2.4: Initialize Zoom on Canvas Switch

**CRITICAL**: Update tab switching to reset zoom

```javascript
function switchToWorksheet() {
    // ... existing code ...
    resetZoom();
}

function switchToAnswerKey() {
    // ... existing code ...
    resetZoom();
}
```

---

## Feature 3: Border/Background Editability

### Goal
Make borders and backgrounds fully editable with contextual toolbar support, z-order control, and deletion capability.

### Critical Understanding

**THE PROBLEM**: By default, borders and backgrounds may be added to canvas in ways that prevent selection and z-order manipulation.

**ROOT CAUSES** (All must be fixed):
1. Objects marked as `selectable: false` or `evented: false`
2. Objects excluded from `userAddedObjects` filters
3. Objects added behind puzzle grid Group (blocks mouse events)
4. Automatic `enforceZOrder()` function resetting positions
5. Missing contextual toolbar triggers

### Step 3.1: Identify Border/Background Code

**Search for**:
- Functions like `addBorderToCanvas()` or `addBackgroundToCanvas()` or `addOverlayToCanvas()`
- Variables like `borderThemeSelect`, `backgroundThemeSelect`
- Properties like `isBorder: true`, `isBackground: true`

**Example from Word Search** (line ~2989):
```javascript
function addOverlayToCanvas(propName, img) {
    const activeCanvas = getActiveCanvas();
    if (!activeCanvas) return;

    fabric.Image.fromURL(img.src, function(clonedImg) {
        clonedImg.set({
            left: 50,
            top: 50,
            scaleX: 0.5,
            scaleY: 0.5,
            selectable: true,    // ✓ CRITICAL: Must be true
            evented: true,       // ✓ CRITICAL: Must be true
            hasControls: true,
            hasBorders: true
        });

        // Tag the object
        if (propName === 'selectedBorder') {
            clonedImg.isBorder = true;
        } else if (propName === 'selectedBackground') {
            clonedImg.isBackground = true;
        }

        activeCanvas.add(clonedImg);

        // ✓ CRITICAL FIX: Bring to front so user can see and select it
        clonedImg.bringToFront();

        activeCanvas.renderAll();
    });
}
```

### Step 3.2: Fix Object Properties

**CRITICAL CHECKLIST** - Verify ALL these properties:

```javascript
{
    selectable: true,        // ✓ MUST be true
    evented: true,          // ✓ MUST be true
    hasControls: true,      // ✓ Allow resize/rotate
    hasBorders: true,       // ✓ Show selection border
    lockMovementX: false,   // ✓ Allow movement
    lockMovementY: false,   // ✓ Allow movement
    isBorder: true,         // Tag for identification (or isBackground)
    // DO NOT SET:
    // selectable: false,   // ✗ WRONG
    // evented: false,      // ✗ WRONG
}
```

### Step 3.3: Add bringToFront() After Adding to Canvas

**CRITICAL**: After `canvas.add(object)`, immediately call:

```javascript
activeCanvas.add(clonedImg);
clonedImg.bringToFront(); // ✓ Brings to top so user can select it
activeCanvas.renderAll();
```

**WHY**: If puzzle grid Group is already on canvas, new objects added behind it won't be clickable.

### Step 3.4: Fix userAddedObjects Filters

**THE PROBLEM**: `userAddedObjects` filters are used after worksheet generation to bring user elements to front. If borders/backgrounds are excluded, they stay behind puzzle.

**Search for**: `userAddedObjects` (usually 2-3 instances)

**WRONG** (excludes borders/backgrounds):
```javascript
const userAddedObjects = canvas.getObjects().filter(o =>
    !o.isPuzzleElement && !o.isBorder && !o.isBackground  // ✗ EXCLUDES them
);
```

**CORRECT** (includes borders/backgrounds):
```javascript
const userAddedObjects = canvas.getObjects().filter(o =>
    !o.isPuzzleElement && !o.isPageBorder && !o.isHeaderDesc && !o.isHeaderElement
    // ✓ Borders and backgrounds NOT excluded
);
```

**CRITICAL**: Update ALL instances of this filter (usually 2-3 places in code)

### Step 3.5: Fix enforceZOrder() Function

**THE PROBLEM**: Some apps have `enforceZOrder()` that automatically sends borders/backgrounds to back.

**Search for**: `function enforceZOrder`

**WRONG** (auto-resets z-order):
```javascript
function enforceZOrder(canvas) {
    // Send backgrounds to back automatically
    canvas.getObjects().forEach(o => {
        if (o.isBackground || o.isBorder) {
            canvas.sendToBack(o);  // ✗ AUTO-RESETS position
        }
    });
}
```

**CORRECT** (user has control):
```javascript
function enforceZOrder(canvas) {
    if (!canvas) return;

    // REMOVED: Automatic z-order enforcement for backgrounds and borders
    // Users should have full control over these elements

    // Only enforce for page border (purple border around page)
    const pageBorder = canvas.getObjects().find(o => o.isPageBorder);
    if (pageBorder) {
        canvas.sendToBack(pageBorder);
    }

    // Note: DO NOT call enforceZOrder after user z-order operations
}
```

**CRITICAL**: Remove `enforceZOrder()` calls from:
- Z-order button handlers (`bringForward`, `sendBackward`, etc.)
- Object movement handlers
- Anywhere it's called after user actions

### Step 3.6: Verify Contextual Toolbar Triggers

**Search for**: `handleObjectSelection` or `selection:created` events

**Ensure borders/backgrounds trigger toolbar**:
```javascript
canvas.on('selection:created', handleObjectSelection);
canvas.on('selection:updated', handleObjectSelection);

function handleObjectSelection(e) {
    const selected = e.selected || e.target;
    if (!selected) return;

    // Show contextual toolbar for ALL selectable objects
    // (No exclusions for isBorder or isBackground)
    showContextualToolbar();
}
```

---

## Feature 4: Enhanced Layer Controls

### Goal
Add "Bring to Front" and "Send to Back" buttons to layers dropdown for one-click z-order control.

### Step 4.1: Add HTML Buttons

**Location**: Find layers dropdown in contextual toolbar (search for `layersDropdown`)

**BEFORE**:
```html
<div class="dropdown-content" id="layersDropdown">
    <button id="toolbarBringForwardBtn">Bring Forward</button>
    <button id="toolbarSendBackwardBtn">Send Backward</button>
</div>
```

**AFTER**:
```html
<div class="dropdown-content" id="layersDropdown">
    <button id="toolbarBringToFrontBtn" data-translate="bringToFront">Bring to Front</button>
    <button id="toolbarBringForwardBtn" data-translate="bringForward">Bring Forward</button>
    <button id="toolbarSendBackwardBtn" data-translate="sendBackward">Send Backward</button>
    <button id="toolbarSendToBackBtn" data-translate="sendToBack">Send to Back</button>
</div>
```

### Step 4.2: Add Variable Declarations

**Location**: Where toolbar buttons are declared (usually line 1150-1200)

```javascript
// Layer control buttons
const toolbarBringToFrontBtn = getEl('toolbarBringToFrontBtn');
const toolbarBringForwardBtn = getEl('toolbarBringForwardBtn');
const toolbarSendBackwardBtn = getEl('toolbarSendBackwardBtn');
const toolbarSendToBackBtn = getEl('toolbarSendToBackBtn');
```

### Step 4.3: Create Z-Order Functions

**Location**: Add after existing z-order functions (usually line 3300-3400)

**CRITICAL**: Include console logging for debugging

```javascript
// ============================================
// Z-ORDER FUNCTIONS
// ============================================

function bringObjectForward() {
    const canvas = getActiveCanvas();
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        const beforeIndex = canvas.getObjects().indexOf(activeObject);
        console.log('[Z-ORDER] Bring Forward - Before index:', beforeIndex);

        canvas.bringForward(activeObject);

        const afterIndex = canvas.getObjects().indexOf(activeObject);
        console.log('[Z-ORDER] After index:', afterIndex);
        canvas.renderAll();
    }
    closeAllPopovers();
}

function sendObjectBackward() {
    const canvas = getActiveCanvas();
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        const beforeIndex = canvas.getObjects().indexOf(activeObject);
        console.log('[Z-ORDER] Send Backward - Before index:', beforeIndex);

        canvas.sendBackwards(activeObject);

        const afterIndex = canvas.getObjects().indexOf(activeObject);
        console.log('[Z-ORDER] After index:', afterIndex);
        canvas.renderAll();
    }
    closeAllPopovers();
}

function bringObjectToFront() {
    const canvas = getActiveCanvas();
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        const beforeIndex = canvas.getObjects().indexOf(activeObject);
        console.log('[Z-ORDER] Bring to Front - Before index:', beforeIndex);

        canvas.bringToFront(activeObject);

        const afterIndex = canvas.getObjects().indexOf(activeObject);
        console.log('[Z-ORDER] After index:', afterIndex);
        canvas.renderAll();
    }
    closeAllPopovers();
}

function sendObjectToBack() {
    const canvas = getActiveCanvas();
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        const beforeIndex = canvas.getObjects().indexOf(activeObject);
        console.log('[Z-ORDER] Send to Back - Before index:', beforeIndex);

        canvas.sendToBack(activeObject);

        const afterIndex = canvas.getObjects().indexOf(activeObject);
        console.log('[Z-ORDER] After index:', afterIndex);
        canvas.renderAll();
    }
    closeAllPopovers();
}
```

### Step 4.4: Add Event Listeners

**Location**: Where contextual toolbar listeners are (usually line 1400-1450)

```javascript
// Context Toolbar - Layer Controls
layersBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopover(layersDropdown);
});

toolbarBringToFrontBtn.addEventListener('click', bringObjectToFront);
toolbarBringForwardBtn.addEventListener('click', bringObjectForward);
toolbarSendBackwardBtn.addEventListener('click', sendObjectBackward);
toolbarSendToBackBtn.addEventListener('click', sendObjectToBack);
```

---

## Feature 5: Contextual Toolbar Localization

### Goal
Ensure all contextual toolbar elements (tooltips, labels, buttons) respect the selected UI language across all 11 supported languages.

### 🚨 CRITICAL WARNING - TRANSLATION SYSTEM IS COMPLEX 🚨

**DO NOT IMPROVISE THE TRANSLATION IMPLEMENTATION!**

**ALWAYS** copy the EXACT translation structure from wordsearch app. Even small deviations will cause:
- Translation keys showing as literal text (e.g., "alignLeft" instead of "Align Left")
- Tooltips always showing English regardless of selected language
- Translations shifted by one language (English showing German, German showing French, etc.)
- Dynamic tooltips (lock/unlock) not updating properly

**BEFORE YOU START**:
1. Open `/opt/lessoncraftstudio/frontend/public/worksheet-generators/wordsearch.html`
2. Open `/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-wordsearch-complete.js`
3. Copy the EXACT implementation structure
4. Do NOT try to "optimize" or "improve" the translation system

---

### Understanding the Translation System

#### Supported Languages (11 Total)
1. **en** - English
2. **de** - German (Deutsch)
3. **fr** - French (Français)
4. **es** - Spanish (Español)
5. **it** - Italian (Italiano)
6. **pt** - Portuguese (Português)
7. **nl** - Dutch (Nederlands)
8. **sv** - Swedish (Svenska)
9. **da** - Danish (Dansk)
10. **no** - Norwegian (Norsk)
11. **fi** - Finnish (Suomi)

#### Translation System Components

**1. Translation Attributes** (in HTML):
```html
<!-- For element text content -->
<button data-translate="generate">Generate</button>

<!-- For tooltips/title attributes -->
<button data-translate-title="alignLeft" title="Align Left">...</button>

<!-- For input placeholders -->
<input data-translate-placeholder="enterWords" placeholder="Enter words">
```

**2. Translation Function** (in JavaScript):
```javascript
function t(key) {
    const locale = uiLocale || currentLocale || 'en';
    return translations[locale]?.[key] || key;
}
```

**3. Translation Files** (external JavaScript):
```javascript
const translations = {
    en: {
        "generate": "Generate",
        "alignLeft": "Align Left",
        // ... more keys
    },
    de: {
        "generate": "Generieren",
        "alignLeft": "Links ausrichten",
        // ... more keys
    },
    // ... more languages
};
```

**4. Initialization Function** (processes all translation attributes):
```javascript
function initializeTranslations() {
    // Process text content
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key) {
            element.textContent = t(key);
        }
    });

    // Process placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (key) {
            element.placeholder = t(key);
        }
    });

    // Process tooltips/titles
    document.querySelectorAll('[data-translate-title]').forEach(element => {
        const key = element.getAttribute('data-translate-title');
        if (key) {
            element.title = t(key);
        }
    });
}
```

---

### Step 5.1: Verify Translation File Exists

**CRITICAL**: Check if app has dedicated translation file.

**Location**: `/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-[APP-NAME]-complete.js`

**Examples**:
- `translations-wordsearch-complete.js` ✓ Reference file
- `translations-addition-complete.js`
- `translations-alphabet-train-complete.js`
- `translations-coloring-complete.js`
- `translations-math-worksheet-final.js`

**Check file is loaded in HTML**:
```html
<script src="js/translations-wordsearch-complete.js"></script>
```

**If file doesn't exist**: Create it by copying from wordsearch and adapting app-specific keys.

---

### Step 5.2: Required Translation Keys for Contextual Toolbar

**COMPLETE LIST** - All apps MUST have these keys:

#### Layer Control Keys
```javascript
"layers": "Layers",
"align": "Align",
"bringForward": "Bring Forward",
"sendBackward": "Send Backward",
"bringToFront": "Bring to Front",
"sendToBack": "Send to Back",
```

#### Alignment Keys
```javascript
"alignSelected": "Align Selected:",
"alignLeft": "Align Left",
"centerHorizontally": "Center Horizontally",
"alignRight": "Align Right",
"alignTop": "Align Top",
"centerVertically": "Center Vertically",
"alignBottom": "Align Bottom",
"alignToPage": "Align to Page:",
"centerOnPageHorizontally": "Center on Page Horizontally",
"centerOnPageVertically": "Center on Page Vertically",
```

#### Toolbar Action Keys
```javascript
"deleteSelected": "Delete Selected",
"lockObject": "Lock Object",
"unlockObject": "Unlock Object",
```

**CRITICAL**: These keys must exist for ALL 11 languages in the translation file.

---

### Step 5.3: Extract Translation Keys from Wordsearch

**If your app is missing keys**, extract them from wordsearch:

**Method 1: Manual Copy (Recommended)**

```bash
# Download wordsearch translation file
pscp root@SERVER:/opt/.../js/translations-wordsearch-complete.js \
     C:\Users\rkgen\lessoncraftstudio\translations-wordsearch-complete.js

# Open both files side-by-side
# Find the English section in wordsearch (starts around line 5)
# Find the English section in your app
# Copy the missing keys
```

**Example - English section (lines 5-170 in wordsearch)**:
```javascript
en: {
    // ... existing keys ...
    "layers": "Layers",
    "align": "Align",
    "alignSelected": "Align Selected:",
    "alignLeft": "Align Left",
    "centerHorizontally": "Center Horizontally",
    "alignRight": "Align Right",
    "alignTop": "Align Top",
    "centerVertically": "Center Vertically",
    "alignBottom": "Align Bottom",
    "alignToPage": "Align to Page:",
    "centerOnPageHorizontally": "Center on Page Horizontally",
    "centerOnPageVertically": "Center on Page Vertically",
    "deleteSelected": "Delete Selected",
    "bringForward": "Bring Forward",
    "sendBackward": "Send Backward",
    "bringToFront": "Bring to Front",
    "sendToBack": "Send to Back",
    // ... more keys ...
},
```

**CRITICAL**: You MUST copy these keys for ALL 11 languages, not just English!

**Method 2: Python Script (For bulk addition)**

```python
# Extract keys from wordsearch for all 11 languages
import re

with open('translations-wordsearch-complete.js', 'r', encoding='utf-8') as f:
    wordsearch_content = f.read()

# Define keys to extract
keys_to_extract = [
    "layers", "align", "alignSelected", "alignLeft",
    "centerHorizontally", "alignRight", "alignTop",
    "centerVertically", "alignBottom", "alignToPage",
    "centerOnPageHorizontally", "centerOnPageVertically",
    "deleteSelected", "bringForward", "sendBackward",
    "bringToFront", "sendToBack"
]

# Extract lines containing these keys
extracted_lines = []
for line in wordsearch_content.split('\n'):
    for key in keys_to_extract:
        if f'"{key}":' in line and not line.strip().startswith('//'):
            extracted_lines.append(line)
            break

print(f"Extracted {len(extracted_lines)} lines")
# Should be 17 keys × 11 languages = 187 lines
```

---

### Step 5.4: Add Translation Keys to Your App

**Location**: Open your app's translation file (e.g., `translations-addition-complete.js`)

**Find insertion point**: After `"sendToBack"` key in each language section

**Insert the align keys**:

```javascript
de: {
    // ... existing keys ...
    "bringForward": "Nach vorne",
    "sendBackward": "Nach hinten",
    "bringToFront": "Ganz nach vorne",
    "sendToBack": "Ganz nach hinten",

    // INSERT HERE - Toolbar & Alignment keys
    "layers": "Ebenen",
    "align": "Ausrichten",
    "alignSelected": "Ausgewählte ausrichten:",
    "alignLeft": "Links ausrichten",
    "centerHorizontally": "Horizontal zentrieren",
    "alignRight": "Rechts ausrichten",
    "alignTop": "Oben ausrichten",
    "centerVertically": "Vertikal zentrieren",
    "alignBottom": "Unten ausrichten",
    "alignToPage": "Zur Seite ausrichten:",
    "centerOnPageHorizontally": "Horizontal auf Seite zentrieren",
    "centerOnPageVertically": "Vertikal auf Seite zentrieren",
    "deleteSelected": "Ausgewähltes löschen",
    "lockObject": "Objekt sperren",
    "unlockObject": "Objekt entsperren",
},
```

**Repeat for ALL 11 languages**

**Verification command**:
```bash
# Count how many times "alignLeft" appears (should be 11)
grep -c '"alignLeft"' translations-your-app.js
```

---

### Step 5.5: Implement initializeTranslations() Function

**CRITICAL**: Check if your app has this function.

**Search for**: `function initializeTranslations`

**If it doesn't exist, add it** (copy from wordsearch):

```javascript
// ============================================
// TRANSLATION INITIALIZATION
// ============================================

function initializeTranslations() {
    if (!translations || !translations[uiLocale || currentLocale]) {
        console.warn('[TRANSLATIONS] Translation object not found or locale not supported');
        return;
    }

    console.log('[TRANSLATIONS] Initializing for locale:', uiLocale || currentLocale);

    // Translate text content
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key) {
            const translation = t(key);
            element.textContent = translation;
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (key) {
            const translation = t(key);
            element.placeholder = translation;
        }
    });

    // Translate tooltips/titles
    document.querySelectorAll('[data-translate-title]').forEach(element => {
        const key = element.getAttribute('data-translate-title');
        if (key) {
            const translation = t(key);
            element.title = translation;
        }
    });

    console.log('[TRANSLATIONS] Initialization complete');
}
```

**CRITICAL COMPONENTS**:
1. Three separate `querySelectorAll` blocks - one for each attribute type
2. Console logging for debugging
3. Error handling if translation object missing

**If function exists but incomplete**: Add missing `querySelectorAll` blocks for `data-translate-placeholder` and `data-translate-title`

---

### Step 5.6: Add Data-Translate Attributes to HTML

**Search for contextual toolbar HTML** (usually around line 900-1100)

**BEFORE** (no translation attributes):
```html
<button id="toolbarBringForwardBtn">Bring Forward</button>
<button id="alignLeftBtn" title="Align Left">...</button>
```

**AFTER** (with translation attributes):
```html
<button id="toolbarBringForwardBtn" data-translate="bringForward">Bring Forward</button>
<button id="alignLeftBtn" data-translate-title="alignLeft" title="Align Left">...</button>
```

**Complete list of buttons to update**:

```html
<!-- Layers dropdown -->
<button id="layersBtn" data-translate-title="layers" title="Layers">...</button>
<button id="toolbarBringToFrontBtn" data-translate="bringToFront">Bring to Front</button>
<button id="toolbarBringForwardBtn" data-translate="bringForward">Bring Forward</button>
<button id="toolbarSendBackwardBtn" data-translate="sendBackward">Send Backward</button>
<button id="toolbarSendToBackBtn" data-translate="sendToBack">Send to Back</button>

<!-- Align dropdown -->
<button id="alignBtn" data-translate-title="align" title="Align">...</button>
<p data-translate="alignSelected">Align Selected:</p>
<button id="alignLeftBtn" data-translate-title="alignLeft" title="Align Left">...</button>
<button id="alignHCenterBtn" data-translate-title="centerHorizontally" title="Center Horizontally">...</button>
<button id="alignRightBtn" data-translate-title="alignRight" title="Align Right">...</button>
<button id="alignTopBtn" data-translate-title="alignTop" title="Align Top">...</button>
<button id="alignVCenterBtn" data-translate-title="centerVertically" title="Center Vertically">...</button>
<button id="alignBottomBtn" data-translate-title="alignBottom" title="Align Bottom">...</button>

<p data-translate="alignToPage">Align to Page:</p>
<button id="centerHCanvasBtn" data-translate-title="centerOnPageHorizontally" title="Center on Page Horizontally">...</button>
<button id="centerVCanvasBtn" data-translate-title="centerOnPageVertically" title="Center on Page Vertically">...</button>

<!-- Delete button -->
<button id="toolbarDeleteBtn" data-translate-title="deleteSelected" title="Delete Selected">...</button>
```

**CRITICAL**: Use exact translation keys from wordsearch. Do NOT invent your own keys.

---

### Step 5.7: Handle Dynamic Tooltips (Lock/Unlock Pattern)

**SPECIAL CASE**: Some tooltips change dynamically (e.g., "Lock Object" ↔ "Unlock Object")

**THE PROBLEM**: Static `data-translate-title` attributes conflict with dynamic JavaScript updates.

**Search for**: Lock button or similar dynamic tooltips

**WRONG** ❌:
```html
<!-- HTML with static translation attribute -->
<button id="toolbarLockBtn" data-translate-title="lockObject" title="Lock Object">...</button>

<!-- JavaScript that updates title -->
function toggleLock() {
    const isLocked = !object.lockMovementX;
    // ... lock/unlock logic ...
    toolbarLockBtn.innerHTML = isLocked ? '<i class="fas fa-unlock"></i>' : '<i class="fas fa-lock"></i>';
    // Title doesn't update! Translation system keeps resetting it to "lockObject"
}
```

**CORRECT** ✅:
```html
<!-- HTML WITHOUT static translation attribute -->
<button id="toolbarLockBtn" title="Lock Object">...</button>
```

```javascript
// JavaScript controls both icon AND title
function toggleLock() {
    const canvas = getActiveCanvas();
    const object = canvas.getActiveObject();
    if (!object) return;

    const isLocked = !object.lockMovementX;

    // Update object properties
    object.set({
        lockMovementX: isLocked,
        lockMovementY: isLocked,
        lockScalingX: isLocked,
        lockScalingY: isLocked,
        lockRotation: isLocked,
        hasControls: !isLocked,
        hasBorders: !isLocked
    });

    // Update BOTH icon and title together
    toolbarLockBtn.innerHTML = isLocked ? '<i class="fas fa-unlock"></i>' : '<i class="fas fa-lock"></i>';
    toolbarLockBtn.title = isLocked ? t("unlockObject") : t("lockObject");  // ✓ CRITICAL

    canvas.renderAll();
}

// Also update when selecting objects
function handleObjectSelection(e) {
    const object = e.selected || e.target;
    if (!object) return;

    const isLocked = object.lockMovementX;

    // Update both icon and title
    toolbarLockBtn.innerHTML = isLocked ? '<i class="fas fa-unlock"></i>' : '<i class="fas fa-lock"></i>';
    toolbarLockBtn.title = isLocked ? t("unlockObject") : t("lockObject");  // ✓ CRITICAL

    showContextualToolbar();
}
```

**PATTERN FOR DYNAMIC TOOLTIPS**:
1. Remove `data-translate-title` from HTML
2. Use JavaScript to control title completely
3. Update title in BOTH places: toggle function AND selection handler
4. Always use `t(key)` function, never hardcode text

---

### Step 5.8: Verify Translation File Deployment

**CRITICAL**: Translation files must be deployed to `.next/standalone/` directory.

```bash
# Copy translation file to standalone
cp -f /opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-your-app.js \
      /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/js/translations-your-app.js

# Verify files are identical
md5sum /opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-your-app.js \
       /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/js/translations-your-app.js
```

---

### Common Pitfalls - Translation-Specific

#### Pitfall 5.1: Translation Keys Showing as Literal Text

**SYMPTOM**: Tooltips show "alignLeft" instead of "Align Left"

**ROOT CAUSES**:
1. Translation key doesn't exist in translation file
2. Translation file not loaded in HTML
3. Key name mismatch (HTML has "alignLeft", file has "align_left")
4. Language section missing the key

**SOLUTION CHECKLIST**:
- ✓ Verify key exists in translation file: `grep '"alignLeft"' translations-app.js`
- ✓ Count occurrences (should be 11, one per language): `grep -c '"alignLeft"' translations-app.js`
- ✓ Verify file loaded in HTML: `<script src="js/translations-app.js"></script>`
- ✓ Verify exact key name match (case-sensitive)

**DEBUGGING**:
```javascript
// Add to console to check translation lookup
console.log('[TRANSLATE]', key, '→', t(key));
```

---

#### Pitfall 5.2: Tooltips Always Show English

**SYMPTOM**: Changed language to German, but tooltips still show English text

**ROOT CAUSES**:
1. `initializeTranslations()` function doesn't process `data-translate-title` attributes
2. Translation file has keys but `initializeTranslations()` never called
3. `uiLocale` variable not set correctly

**SOLUTION**:
```javascript
// Verify initializeTranslations() has all three blocks
function initializeTranslations() {
    // 1. Text content (data-translate)
    document.querySelectorAll('[data-translate]').forEach(element => {
        element.textContent = t(element.getAttribute('data-translate'));
    });

    // 2. Placeholders (data-translate-placeholder)
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        element.placeholder = t(element.getAttribute('data-translate-placeholder'));
    });

    // 3. Tooltips (data-translate-title) - ✓ MUST HAVE THIS!
    document.querySelectorAll('[data-translate-title]').forEach(element => {
        element.title = t(element.getAttribute('data-translate-title'));
    });
}

// Verify function is called on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTranslations();
});

// Verify function is called when language changes
uiLocaleSelect.addEventListener('change', (e) => {
    uiLocale = e.target.value;
    localStorage.setItem('uiLocale', uiLocale);
    initializeTranslations();  // ✓ MUST CALL THIS
});
```

---

#### Pitfall 5.3: Translations Shifted by One Language

**SYMPTOM**: Selected English, but `bringToFront` shows German translation. Selected German, shows French, etc.

**ROOT CAUSE**: Sequential `content.replace()` bug when adding translation keys via script.

**EXAMPLE OF WRONG APPROACH** ❌:
```python
# WRONG - Sequential replacement causes shift
for lang_index, lang in enumerate(languages):
    content = content.replace(
        '"bringToFront": "Bring to Front",',
        f'"bringToFront": "{correct_translations[lang]}",',
        1  # Replaces first occurrence, which might be in ANY language section!
    )
```

**CORRECT APPROACH** ✅:
```python
# Process line-by-line, maintaining language sections
lines = content.split('\n')
new_lines = []
lang_index = 0

for line in lines:
    new_lines.append(line)

    if '"bringToFront":' in line and lang_index < len(correct_translations):
        # This maintains proper alignment
        pass
    elif '"sendToBack":' in line and lang_index < len(correct_translations):
        indent = re.match(r'(\s+)', line).group(1)
        new_lines.append(f'{indent}"bringToFront": "{correct_translations[lang_index]["bringToFront"]}",')
        new_lines.append(f'{indent}"sendToBack": "{correct_translations[lang_index]["sendToBack"]}",')
        lang_index += 1

content = '\n'.join(new_lines)
```

**BEST APPROACH**: Manually copy translations from wordsearch file.

---

#### Pitfall 5.4: Duplicate Paragraph Tags

**SYMPTOM**: Labels like "Align Selected:" appear twice

**ROOT CAUSE**: Nested duplicate `<p>` tags from incorrect script execution

**EXAMPLE**:
```html
<!-- WRONG - Nested duplicates -->
<p data-translate="alignSelected">
    <p data-translate="alignSelected">Align Selected:</p>
</p>
```

**SOLUTION**: Remove outer tag, keep only one:
```html
<!-- CORRECT -->
<p data-translate="alignSelected">Align Selected:</p>
```

**Prevention**: Check HTML before and after script execution.

---

#### Pitfall 5.5: Translation Key Mismatch

**SYMPTOM**: Worksearch file has `centerOnPageHorizontally`, but HTML has `centerPageHorizontally`

**ROOT CAUSE**: Inconsistent key naming when copying between files

**SOLUTION**:
1. Always use wordsearch as reference
2. Use exact key names from wordsearch
3. Don't invent new key names
4. If HTML key doesn't match file, update HTML to match file (not vice versa)

**Verification**:
```bash
# Check all data-translate-title attributes in HTML
grep -o 'data-translate-title="[^"]*"' your-app.html | sort | uniq

# Check all keys in translation file (English section)
sed -n '/en: {/,/},/p' translations-app.js | grep -o '"[^"]*":' | sort | uniq

# Compare - should match exactly
```

---

#### Pitfall 5.6: Missing unlockObject Translation Key

**SYMPTOM**: Lock button works but unlock button shows "unlockObject" as literal text

**ROOT CAUSE**: Only `lockObject` key exists, `unlockObject` not added

**SOLUTION**: Add `unlockObject` for ALL 11 languages:

```javascript
en: {
    "lockObject": "Lock Object",
    "unlockObject": "Unlock Object",  // ADD THIS
},
de: {
    "lockObject": "Objekt sperren",
    "unlockObject": "Objekt entsperren",  // ADD THIS
},
// ... for all 11 languages
```

---

### Testing Checklist - Translations

**Complete this for EVERY app:**

#### Translation File Verification
- [ ] Translation file exists: `translations-[app]-complete.js`
- [ ] Translation file loaded in HTML `<script>` tag
- [ ] Translation file deployed to `.next/standalone/` directory
- [ ] Translation file has all 11 language sections
- [ ] Each language section has all required contextual toolbar keys

#### Translation Keys Count
- [ ] `grep -c '"bringToFront"' translations-app.js` returns `11`
- [ ] `grep -c '"sendToBack"' translations-app.js` returns `11`
- [ ] `grep -c '"alignLeft"' translations-app.js` returns `11`
- [ ] `grep -c '"centerHorizontally"' translations-app.js` returns `11`
- [ ] `grep -c '"centerOnPageHorizontally"' translations-app.js` returns `11`
- [ ] `grep -c '"deleteSelected"' translations-app.js` returns `11`
- [ ] `grep -c '"lockObject"' translations-app.js` returns `11`
- [ ] `grep -c '"unlockObject"' translations-app.js` returns `11`

#### initializeTranslations() Function
- [ ] Function exists in JavaScript
- [ ] Processes `[data-translate]` attributes (text content)
- [ ] Processes `[data-translate-placeholder]` attributes (input placeholders)
- [ ] Processes `[data-translate-title]` attributes (tooltips)
- [ ] Function called on page load
- [ ] Function called when language changes
- [ ] Console logs show successful initialization

#### HTML Attributes
- [ ] All contextual toolbar buttons have `data-translate` or `data-translate-title`
- [ ] No duplicate paragraph tags
- [ ] Translation keys match exactly with keys in translation file (case-sensitive)
- [ ] Dynamic tooltips (lock/unlock) do NOT have `data-translate-title` attribute

#### Language Testing (Test ALL 11 Languages)

**For EACH language, verify:**
- [ ] **English**: All tooltips show English
- [ ] **German**: All tooltips show German
- [ ] **French**: All tooltips show French
- [ ] **Spanish**: All tooltips show Spanish
- [ ] **Italian**: All tooltips show Italian
- [ ] **Portuguese**: All tooltips show Portuguese
- [ ] **Dutch**: All tooltips show Dutch
- [ ] **Swedish**: All tooltips show Swedish
- [ ] **Danish**: All tooltips show Danish
- [ ] **Norwegian**: All tooltips show Norwegian
- [ ] **Finnish**: All tooltips show Finnish

**Specific Tooltips to Test**:
- [ ] "Bring to Front" button
- [ ] "Bring Forward" button
- [ ] "Send Backward" button
- [ ] "Send to Back" button
- [ ] "Layers" button tooltip
- [ ] "Align" button tooltip
- [ ] "Align Left" button tooltip
- [ ] "Center Horizontally" button tooltip
- [ ] "Align Right" button tooltip
- [ ] "Align Top" button tooltip
- [ ] "Center Vertically" button tooltip
- [ ] "Align Bottom" button tooltip
- [ ] "Center on Page Horizontally" button tooltip
- [ ] "Center on Page Vertically" button tooltip
- [ ] "Delete Selected" button tooltip
- [ ] "Lock Object" button tooltip (when unlocked)
- [ ] "Unlock Object" button tooltip (when locked)

#### Dynamic Tooltip Testing
- [ ] Select unlocked object → tooltip shows "Lock Object" (translated)
- [ ] Click lock button → icon changes to unlock, tooltip changes to "Unlock Object" (translated)
- [ ] Click unlock button → icon changes to lock, tooltip changes to "Lock Object" (translated)
- [ ] Works correctly in all 11 languages

#### No Literal Translation Keys
- [ ] No tooltips show "bringToFront" as literal text
- [ ] No tooltips show "alignLeft" as literal text
- [ ] No tooltips show "centerHorizontally" as literal text
- [ ] No labels show "alignSelected" as literal text
- [ ] No labels show "alignToPage" as literal text

#### Console Verification
- [ ] Open browser console (F12)
- [ ] No JavaScript errors related to translations
- [ ] Console shows `[TRANSLATIONS] Initializing for locale: en` (or selected language)
- [ ] Console shows `[TRANSLATIONS] Initialization complete`
- [ ] Console shows translation lookups when debugging enabled

---

### Deployment Checklist - Translations

When deploying translation changes:

```bash
# 1. Upload HTML file (if modified)
pscp "C:\Users\rkgen\lessoncraftstudio\your-app.html" \
     "root@SERVER:/opt/.../public/worksheet-generators/your-app.html"

# 2. Upload translation file (if modified)
pscp "C:\Users\rkgen\lessoncraftstudio\translations-your-app.js" \
     "root@SERVER:/opt/.../public/worksheet-generators/js/translations-your-app.js"

# 3. Copy to standalone (BOTH files)
plink root@SERVER \
  "cp -f /opt/.../public/worksheet-generators/your-app.html \
         /opt/.../standalone/public/worksheet-generators/your-app.html && \
   cp -f /opt/.../public/worksheet-generators/js/translations-your-app.js \
         /opt/.../standalone/public/worksheet-generators/js/translations-your-app.js && \
   pm2 restart lessoncraftstudio && \
   echo '✅ Translation updates deployed'"

# 4. Verify deployment
plink root@SERVER \
  "md5sum /opt/.../public/worksheet-generators/your-app.html \
          /opt/.../standalone/public/worksheet-generators/your-app.html && \
   md5sum /opt/.../public/worksheet-generators/js/translations-your-app.js \
          /opt/.../standalone/public/worksheet-generators/js/translations-your-app.js"

# 5. Test live site
# Open app in browser
# Hard refresh: Ctrl+Shift+R
# Test all 11 languages
# Check browser console for errors
```

---

### Reference Implementation: Wordsearch

**Always refer to wordsearch for correct implementation:**

**File**: `/opt/lessoncraftstudio/frontend/public/worksheet-generators/wordsearch.html`
**Translation File**: `/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-wordsearch-complete.js`

**Key line numbers in wordsearch** (approximate):
- Translation file load: Line ~30-40
- `initializeTranslations()` function: Line ~1250-1350
- Contextual toolbar HTML: Line ~950-1100
- Lock/unlock toggle: Line ~1580-1620

---

### Summary - Critical Rules

1. **NEVER improvise** - Copy exact structure from wordsearch
2. **ALL 11 languages** - Every key must exist in all language sections
3. **Three attribute types** - `data-translate`, `data-translate-placeholder`, `data-translate-title`
4. **Three querySelectorAll blocks** - `initializeTranslations()` must process all three
5. **Dynamic tooltips special handling** - Remove static attribute, JavaScript controls fully
6. **Both files deployed** - HTML and translation JS must both be in `.next/standalone/`
7. **Test all 11 languages** - Don't assume, verify each language works
8. **Console logging** - Keep debug logs to troubleshoot issues
9. **Wordsearch is reference** - When in doubt, check wordsearch
10. **Keys are case-sensitive** - "alignLeft" ≠ "alignleft" ≠ "align_left"

---

## Feature 6: Undo/Redo Functionality

### Goal
Add professional undo/redo functionality with buttons in the header, keyboard shortcuts (Ctrl+Z, Ctrl+Y), and proper state management.

---

### 🚨 CRITICAL WARNING - THIS IS COMPLEX, READ CAREFULLY 🚨

**IMPLEMENTATION DIFFICULTY: HIGH**

Undo/redo is **THE MOST COMPLEX** feature in this guide. During implementation in wordsearch, I encountered:
- **7 major bugs** that completely broke the app
- **3 complete rewrites** of the state management logic
- **Multiple hours** debugging timing and order-of-operations issues

**YOU WILL ENCOUNTER THESE SAME ISSUES** if you don't follow this guide exactly.

**BEFORE YOU START:**
1. Open wordsearch.html and study the **final working implementation**
2. Do NOT improvise or "improve" the logic
3. Copy the EXACT pattern from wordsearch
4. Test thoroughly after EACH step
5. Keep debug logging enabled throughout implementation

---

### Understanding Undo/Redo Architecture

#### The Fundamental Challenge

**The Core Problem**: When should we save canvas state?

❌ **WRONG APPROACH #1** (Save AFTER modifications):
```javascript
// User modifies object → modification happens → THEN save state
canvas.on('object:modified', function(e) {
    saveCanvasState();  // ❌ Too late! Modified state already on canvas
});

// Result: historyStack = [worksheet, modified]
// Current canvas = modified (SAME as last item in history)
// Undo restores "modified" → No visible change!
```

❌ **WRONG APPROACH #2** (Save BEFORE generation, not after):
```javascript
// Before generation
saveCanvasState();      // ❌ Saves EMPTY canvas
isGenerating = true;
// ... generate worksheet ...
isGenerating = false;
// No save here! ❌

// Result: historyStack = [empty_canvas]
// Undo restores empty_canvas → Worksheet disappears!
```

✅ **CORRECT APPROACH** (Save BEFORE user modifications, AFTER generation):
```javascript
// 1. When user STARTS interacting (BEFORE modification)
canvas.on('mouse:down', function(e) {
    if (e.target) saveCanvasState();  // ✅ Saves state BEFORE change
});

// 2. After generation completes
async function handleGenerateWorksheet() {
    isGenerating = true;
    // ... generate worksheet ...
    isGenerating = false;
    saveCanvasState();  // ✅ Saves generated worksheet
}

// Result: historyStack = [worksheet, pre_modification_1, pre_modification_2]
// Each undo steps back through user's changes perfectly!
```

---

### Step 6.1: Add HTML Buttons to Header

**Location**: Inside `<div class="header-actions">` in the header (with zoom controls)

**CRITICAL**: Place buttons in a container with same styling as zoom controls (glassmorphism style).

```html
<div class="header-actions">
    <!-- Existing zoom controls -->
    <div class="zoom-controls">
        <button class="action-button zoom-btn" id="zoomOutBtn" title="Zoom Out">
            <span>−</span>
        </button>
        <span class="zoom-level" id="zoomLevel">100%</span>
        <button class="action-button zoom-btn" id="zoomInBtn" title="Zoom In">
            <span>+</span>
        </button>
    </div>

    <!-- ADD THIS: Undo/Redo Controls -->
    <div class="history-controls">
        <button id="undoBtn" class="history-btn" title="Undo (Ctrl+Z)" disabled>
            <i class="fas fa-undo"></i>
        </button>
        <button id="redoBtn" class="history-btn" title="Redo (Ctrl+Y)" disabled>
            <i class="fas fa-redo"></i>
        </button>
    </div>

    <!-- Other buttons (Generate, Download, etc.) -->
</div>
```

**CRITICAL**: Buttons start as `disabled` because history is empty initially.

---

### Step 6.2: Add CSS Styling

**Location**: After zoom-controls CSS (usually around line 450-500)

**CRITICAL**: Match the glassmorphism style of zoom controls exactly.

```css
/* ============================================
   UNDO/REDO CONTROLS
   ============================================ */

.history-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 6px;
    padding: 5px 10px;
    backdrop-filter: blur(10px);
}

.history-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 14px;
    cursor: pointer;
    color: white;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.history-btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
}

.history-btn:active:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.15);
}

.history-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}
```

---

### Step 6.3: Add State Management Variables

**Location**: Near canvas variable declarations (usually line 1130-1150)

```javascript
// --- UNDO/REDO STATE MANAGEMENT ---
let historyStack = [];
let redoStack = [];
const MAX_HISTORY = 20;
let isRestoringState = false;  // Flag to prevent saving during undo/redo
let isGenerating = false;       // Flag to prevent saving during bulk generation
```

**EXPLANATION**:
- `historyStack`: Array of saved states (for undo)
- `redoStack`: Array of states to restore (for redo)
- `MAX_HISTORY`: Limit to prevent memory issues (20 is reasonable)
- `isRestoringState`: Prevents saving state while undoing/redoing
- `isGenerating`: Prevents saving state during worksheet generation

---

### Step 6.4: Create showMessage Function (IF MISSING)

**🚨 CRITICAL - CHECK THIS FIRST 🚨**

**Search for**: `function showMessage` in your HTML file

**If function DOES NOT EXIST**, you MUST add it. This caused complete app failure in wordsearch.

**Location**: Before undo/redo functions (usually line 1380-1400)

```javascript
// --- TOAST NOTIFICATION FUNCTION ---
function showMessage(message, type = 'info', duration = 3000) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification toast-' + type;
    toast.textContent = message;
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; color: white; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';

    const colors = { success: '#4caf50', error: '#f44336', warning: '#ff9800', info: '#2196f3' };
    toast.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(toast);

    if (duration > 0) {
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    return toast;
}
```

**WHY THIS MATTERS**: The undo/redo functions call `showMessage()` to notify users. If this function doesn't exist, you'll get `ReferenceError: showMessage is not defined` and the **entire app will break**.

---

### Step 6.5: Create Core Undo/Redo Functions

**Location**: After showMessage function (usually line 1400-1480)

**CRITICAL ORDER**: These functions MUST be defined BEFORE they are used in event listeners!

```javascript
// ============================================
// UNDO/REDO FUNCTIONS
// ============================================

function saveCanvasState() {
    // CRITICAL: Check BOTH flags
    if (isRestoringState || isGenerating) return;

    const activeCanvas = getActiveCanvas();
    if (!activeCanvas) return;

    // Save complete canvas state as JSON
    const state = {
        canvasJSON: activeCanvas.toJSON([
            'isPuzzleElement', 'isAnswerKeyItem', 'isPageBorder',
            'isHeaderDesc', 'isHeaderElement', 'isBorder',
            'isBackground', 'originalIndex'
        ]),
        canvasType: activeCanvas === worksheetCanvas ? 'worksheet' : 'answerKey',
        timestamp: Date.now()
    };

    historyStack.push(state);

    // Limit history size
    if (historyStack.length > MAX_HISTORY) {
        historyStack.shift(); // Remove oldest
    }

    // Clear redo stack (can't redo after new action)
    redoStack = [];

    updateHistoryButtons();
}

function undo() {
    if (historyStack.length === 0) return;

    const activeCanvas = getActiveCanvas();
    if (!activeCanvas) return;

    // Save current state to redo stack
    const currentState = {
        canvasJSON: activeCanvas.toJSON([
            'isPuzzleElement', 'isAnswerKeyItem', 'isPageBorder',
            'isHeaderDesc', 'isHeaderElement', 'isBorder',
            'isBackground', 'originalIndex'
        ]),
        canvasType: activeCanvas === worksheetCanvas ? 'worksheet' : 'answerKey',
        timestamp: Date.now()
    };
    redoStack.push(currentState);

    // Restore previous state
    const previousState = historyStack.pop();
    restoreCanvasState(previousState);

    updateHistoryButtons();
    showMessage(t('undoAction') || 'Undo', 'info');
}

function redo() {
    if (redoStack.length === 0) return;

    const activeCanvas = getActiveCanvas();
    if (!activeCanvas) return;

    // Save current state to history stack
    const currentState = {
        canvasJSON: activeCanvas.toJSON([
            'isPuzzleElement', 'isAnswerKeyItem', 'isPageBorder',
            'isHeaderDesc', 'isHeaderElement', 'isBorder',
            'isBackground', 'originalIndex'
        ]),
        canvasType: activeCanvas === worksheetCanvas ? 'worksheet' : 'answerKey',
        timestamp: Date.now()
    };
    historyStack.push(currentState);

    // Restore next state
    const nextState = redoStack.pop();
    restoreCanvasState(nextState);

    updateHistoryButtons();
    showMessage(t('redoAction') || 'Redo', 'info');
}

function restoreCanvasState(state) {
    if (!state) return;

    isRestoringState = true; // CRITICAL: Set flag before restoration

    const targetCanvas = state.canvasType === 'worksheet' ? worksheetCanvas : answerKeyCanvas;
    if (!targetCanvas) {
        isRestoringState = false;
        return;
    }

    targetCanvas.loadFromJSON(state.canvasJSON, function() {
        targetCanvas.renderAll();
        isRestoringState = false; // CRITICAL: Reset flag after restoration
    });
}

function updateHistoryButtons() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');

    if (undoBtn) {
        undoBtn.disabled = historyStack.length === 0;
    }
    if (redoBtn) {
        redoBtn.disabled = redoStack.length === 0;
    }
}
```

**CRITICAL POINTS**:
1. `saveCanvasState()` checks BOTH `isRestoringState` AND `isGenerating`
2. `restoreCanvasState()` sets `isRestoringState = true` BEFORE loading, resets AFTER
3. `updateHistoryButtons()` is called after every state change
4. All canvas properties (including custom ones) are serialized

---

### Step 6.6: Add Event Listeners

**Location**: In setupEventListeners or similar initialization function (usually line 1500-1550)

**CRITICAL**: Must be after function definitions!

```javascript
// Undo/Redo Controls
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');

if (undoBtn) undoBtn.addEventListener('click', undo);
if (redoBtn) redoBtn.addEventListener('click', redo);

// Keyboard shortcuts for undo/redo
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
    }
});
```

---

### Step 6.7: Hook Into Canvas Events (THE MOST CRITICAL STEP)

**Location**: Find `setupCanvasEventListeners` function (usually line 1600-1650)

**🚨 THIS IS WHERE MOST BUGS OCCUR - READ CAREFULLY 🚨**

#### The Correct Event: mouse:down (NOT object:modified!)

**WRONG** ❌:
```javascript
// DO NOT DO THIS!
canvas.on('object:modified', function(e) {
    saveCanvasState();  // ❌ Saves AFTER modification (too late!)
});
```

**CORRECT** ✅:
```javascript
// Save state BEFORE user modifies anything
canvas.on('mouse:down', function(e) {
    if (e.target) saveCanvasState();  // ✅ Saves state when user clicks object
});
```

**EXPLANATION**:
- `object:modified` fires AFTER the modification is complete → historyStack contains modified state → undo has no effect
- `mouse:down` fires when user STARTS interacting → historyStack contains pre-modification state → undo works perfectly

**Full setupCanvasEventListeners Implementation**:

```javascript
function setupCanvasEventListeners(canvas) {
    canvas.on({
        // CRITICAL: Use mouse:down, not object:modified!
        'mouse:down': function(e) {
            if (e.target) saveCanvasState();
        },

        // Handle object additions (text, images user adds)
        'object:added': function(e) {
            if (!isRestoringState && !isGenerating) {
                setTimeout(() => saveCanvasState(), 100);
            }
        },

        // Handle object deletions
        'object:removed': function(e) {
            if (!isRestoringState && !isGenerating) {
                setTimeout(() => saveCanvasState(), 100);
            }
        },

        // Other event handlers (selection, etc.)
        'selection:created': function(e) { handleObjectSelection(e, this); },
        'selection:updated': function(e) { handleObjectSelection(e, this); },
        'selection:cleared': function(e) { handleSelectionCleared(e, this); }
    });
}
```

**WHY setTimeout for object:added/removed?**
- These events fire during bulk operations (worksheet generation)
- The 100ms delay + `isGenerating` check prevents saving during generation
- Only user-initiated additions/deletions are saved

---

### Step 6.8: Integrate with Worksheet Generation

**Location**: Find `handleGenerateWorksheet` function (usually line 1700-1800)

**CRITICAL ORDER OF OPERATIONS**:

```javascript
async function handleGenerateWorksheet() {
    const puzzleData = await generatePuzzleData();
    if (!puzzleData) return;

    // STEP 1: Set isGenerating flag (prevents object:added from saving)
    isGenerating = true;

    lastGeneratedData = puzzleData;

    // ... worksheet generation code ...
    // (clearing canvas, creating puzzle, adding objects, etc.)

    worksheetCanvas.renderAll();

    showMessage(t("worksheetGeneratedSuccessfully"), "success");
    downloadWorksheetJpegBtn.disabled = false;
    downloadWorksheetPdfBtn.disabled = false;
    generateAnswerKeyBtn.disabled = false;

    // STEP 2: Reset isGenerating flag
    isGenerating = false;

    // STEP 3: Save state AFTER generation completes
    saveCanvasState();  // ✅ Now historyStack = [generated_worksheet]
}
```

**CRITICAL MISTAKES TO AVOID**:

❌ **WRONG ORDER #1**:
```javascript
saveCanvasState();      // ❌ Saves empty canvas
isGenerating = true;
// ... generate ...
isGenerating = false;
```

❌ **WRONG ORDER #2**:
```javascript
isGenerating = true;
saveCanvasState();      // ❌ saveCanvasState checks isGenerating, returns immediately!
// ... generate ...
isGenerating = false;
```

❌ **WRONG APPROACH #3**:
```javascript
isGenerating = true;
// ... generate ...
isGenerating = false;
setTimeout(() => saveCanvasState(), 100);  // ❌ Timing issues, can fail if user acts fast
```

✅ **CORRECT ORDER**:
```javascript
isGenerating = true;    // ✅ Set flag first
// ... generate ...
isGenerating = false;   // ✅ Reset flag
saveCanvasState();      // ✅ Save immediately (no setTimeout!)
```

**Apply same pattern to `handleGenerateAnswerKey`**:

```javascript
async function handleGenerateAnswerKey() {
    if (!lastGeneratedData) {
        showMessage(t("pleaseGenerateWorksheetFirst"), "error");
        return;
    }

    isGenerating = true;

    // ... answer key generation code ...

    answerKeyCanvas.renderAll();

    document.querySelector('.tab-button[data-tab="answerKeyTab"]').click();
    showMessage(t("answerKeyGenerated"), "success");
    downloadAnswerKeyJpegBtn.disabled = false;
    downloadAnswerKeyPdfBtn.disabled = false;

    isGenerating = false;
    saveCanvasState();  // ✅ Save answer key state
}
```

---

### Step 6.9: Add Translation Keys

**Location**: In `translations-[app]-complete.js` file

**Add for ALL 11 languages**:

```javascript
en: {
    // ... existing keys ...
    "undoAction": "Undo",
    "redoAction": "Redo",
},
de: {
    // ... existing keys ...
    "undoAction": "Rückgängig",
    "redoAction": "Wiederholen",
},
fr: {
    // ... existing keys ...
    "undoAction": "Annuler",
    "redoAction": "Rétablir",
},
es: {
    // ... existing keys ...
    "undoAction": "Deshacer",
    "redoAction": "Rehacer",
},
it: {
    // ... existing keys ...
    "undoAction": "Annulla",
    "redoAction": "Ripristina",
},
pt: {
    // ... existing keys ...
    "undoAction": "Desfazer",
    "redoAction": "Refazer",
},
nl: {
    // ... existing keys ...
    "undoAction": "Ongedaan maken",
    "redoAction": "Opnieuw",
},
sv: {
    // ... existing keys ...
    "undoAction": "Ångra",
    "redoAction": "Gör om",
},
da: {
    // ... existing keys ...
    "undoAction": "Fortryd",
    "redoAction": "Gentag",
},
no: {
    // ... existing keys ...
    "undoAction": "Angre",
    "redoAction": "Gjør om",
},
fi: {
    // ... existing keys ...
    "undoAction": "Kumoa",
    "redoAction": "Tee uudelleen",
},
```

**Verify**: `grep -c '"undoAction"' translations-app.js` should return `11`

---

### Common Pitfalls - Undo/Redo Specific

#### Pitfall 6.1: Missing showMessage Function

**SYMPTOM**: `ReferenceError: showMessage is not defined` - entire app breaks

**ROOT CAUSE**: Undo/redo functions call `showMessage()` but function doesn't exist

**SOLUTION**: Add showMessage function (see Step 6.4)

**HOW TO DETECT**:
```bash
# Check if showMessage exists
grep -n "function showMessage" your-app.html

# If nothing found, you MUST add it
```

---

#### Pitfall 6.2: Undo Button Never Activates

**SYMPTOM**: Generate worksheet, but undo button stays disabled

**ROOT CAUSES**:
1. `saveCanvasState()` not called after generation
2. `isGenerating` flag still true when `saveCanvasState()` called
3. Wrong order: `saveCanvasState()` called before `isGenerating = false`

**SOLUTION**: Check generation function order (see Step 6.8)

**DEBUGGING**:
```javascript
// Add temporary debug logging
function saveCanvasState() {
    console.log('[UNDO DEBUG] saveCanvasState called, isRestoringState:', isRestoringState, 'isGenerating:', isGenerating);
    if (isRestoringState || isGenerating) return;
    console.log('[UNDO DEBUG] Saving state, historyStack.length will be:', historyStack.length + 1);
    // ... rest of function
}
```

---

#### Pitfall 6.3: Undo Only Works Once

**SYMPTOM**: First undo works, but subsequent undos do nothing

**ROOT CAUSES**:
1. Using `object:modified` event (saves state AFTER modification)
2. historyStack contains current state as last item

**SOLUTION**: Change to `mouse:down` event (see Step 6.7)

**VERIFY**:
```javascript
// Search for this WRONG pattern:
canvas.on('object:modified', function(e) {
    saveCanvasState();  // ❌ WRONG!
});

// Replace with this CORRECT pattern:
canvas.on('mouse:down', function(e) {
    if (e.target) saveCanvasState();  // ✅ CORRECT!
});
```

---

#### Pitfall 6.4: Undo Makes Worksheet Disappear

**SYMPTOM**: Generate worksheet, click undo, worksheet disappears completely

**ROOT CAUSE**: Saved empty canvas state before generation, not generated worksheet after

**SOLUTION**: Remove any `saveCanvasState()` calls BEFORE generation. Only call AFTER.

**WRONG PATTERN**:
```javascript
saveCanvasState();      // ❌ Saves empty canvas
isGenerating = true;
// ... generate worksheet ...
```

**CORRECT PATTERN**:
```javascript
isGenerating = true;
// ... generate worksheet ...
isGenerating = false;
saveCanvasState();      // ✅ Saves generated worksheet
```

---

#### Pitfall 6.5: Functions Called Before Definition

**SYMPTOM**: `ReferenceError: undo is not defined` or `saveCanvasState is not defined`

**ROOT CAUSE**: Event listeners added before functions are defined

**SOLUTION**: Move function definitions BEFORE event listener setup

**CORRECT ORDER**:
1. Variable declarations (line ~1140)
2. `showMessage()` function (line ~1380)
3. Undo/redo functions (line ~1400)
4. Event listener setup (line ~1500)
5. Canvas event handlers (line ~1600)

---

#### Pitfall 6.6: setTimeout Timing Issues

**SYMPTOM**: Undo button sometimes doesn't activate after generation

**ROOT CAUSE**: `setTimeout(() => saveCanvasState(), 100)` creates race condition

**SOLUTION**: Remove setTimeout, call `saveCanvasState()` directly

**WRONG**:
```javascript
isGenerating = false;
setTimeout(() => saveCanvasState(), 100);  // ❌ Race condition!
```

**CORRECT**:
```javascript
isGenerating = false;
saveCanvasState();  // ✅ Immediate, no race condition
```

---

#### Pitfall 6.7: Redo Doesn't Work After Undo

**SYMPTOM**: Undo works, but redo button stays disabled

**ROOT CAUSE**: `redoStack` not populated when undoing

**SOLUTION**: Verify `undo()` function saves current state to `redoStack` BEFORE popping from `historyStack`

**CHECK THIS CODE**:
```javascript
function undo() {
    if (historyStack.length === 0) return;

    const activeCanvas = getActiveCanvas();
    if (!activeCanvas) return;

    // CRITICAL: Save current to redo stack FIRST
    const currentState = { ... };
    redoStack.push(currentState);  // ✅ Must happen before pop!

    // THEN restore previous
    const previousState = historyStack.pop();
    restoreCanvasState(previousState);

    updateHistoryButtons();  // ✅ Must update buttons!
}
```

---

### Testing Checklist - Undo/Redo

**Complete ALL these tests:**

#### Initial State
- [ ] Undo button is disabled when page loads
- [ ] Redo button is disabled when page loads
- [ ] Buttons are visible in header (next to zoom controls)
- [ ] Buttons have proper styling (glassmorphism, matches zoom controls)

#### After Worksheet Generation
- [ ] Generate worksheet
- [ ] Undo button becomes active (enabled)
- [ ] Redo button stays disabled
- [ ] Clicking undo does nothing (no previous state to restore)

#### After User Modifications
- [ ] Generate worksheet
- [ ] Move an object
- [ ] Undo button is active
- [ ] Click undo → object returns to original position ✓
- [ ] Redo button becomes active
- [ ] Click redo → object returns to modified position ✓

#### Multiple Modifications
- [ ] Generate worksheet
- [ ] Move object A
- [ ] Move object B
- [ ] Resize object C
- [ ] Click undo → object C returns to original size ✓
- [ ] Click undo → object B returns to original position ✓
- [ ] Click undo → object A returns to original position ✓
- [ ] Click undo → worksheet remains (doesn't disappear) ✓
- [ ] Undo button becomes disabled
- [ ] Click redo 3 times → all changes restored ✓

#### Keyboard Shortcuts
- [ ] Ctrl+Z triggers undo
- [ ] Ctrl+Y triggers redo
- [ ] Ctrl+Shift+Z triggers redo (alternate)
- [ ] Cmd+Z triggers undo (Mac)
- [ ] Cmd+Y triggers redo (Mac)

#### Edge Cases
- [ ] Undo with nothing in history → no error, button disabled
- [ ] Redo with nothing in redo stack → no error, button disabled
- [ ] Make modification after undo → redo button becomes disabled (can't redo after new action)
- [ ] Switch tabs (Worksheet ↔ Answer Key) → undo/redo works on correct canvas
- [ ] Generate answer key → undo button active for answer key modifications

#### Translation Testing
- [ ] Toast messages show in selected language ("Undo" / "Rückgängig" / etc.)
- [ ] Tooltips show in selected language
- [ ] Test in at least 3 languages (English, German, French)

#### Performance Testing
- [ ] Make 25+ modifications → undo still works
- [ ] historyStack limited to MAX_HISTORY (doesn't grow infinitely)
- [ ] No memory leaks (use browser DevTools Memory profiler)
- [ ] No noticeable lag when saving state

#### Console Verification
- [ ] No JavaScript errors
- [ ] No "showMessage is not defined" errors
- [ ] No "undo is not defined" errors
- [ ] No "historyStack is not defined" errors

---

### Implementation Time Estimate

- **Step 6.1-6.2**: HTML & CSS (15 min)
- **Step 6.3**: Variables (5 min)
- **Step 6.4**: showMessage function (10 min)
- **Step 6.5**: Core functions (30 min)
- **Step 6.6**: Event listeners (10 min)
- **Step 6.7**: Canvas events (20 min) - MOST COMPLEX
- **Step 6.8**: Generation integration (20 min)
- **Step 6.9**: Translations (15 min)
- **Testing**: (45 min) - THOROUGH TESTING REQUIRED

**Total Time**: ~2.5-3 hours per app

---

### Debugging Guide

If undo/redo doesn't work after implementation:

#### Step 1: Enable Debug Logging

Add these console logs temporarily:

```javascript
function saveCanvasState() {
    console.log('[UNDO] saveCanvasState called, flags:', { isRestoringState, isGenerating });
    if (isRestoringState || isGenerating) {
        console.log('[UNDO] Skipped save (flags true)');
        return;
    }
    console.log('[UNDO] Saving state, historyStack length:', historyStack.length);
    // ... rest of function
    console.log('[UNDO] State saved, new length:', historyStack.length);
}

function updateHistoryButtons() {
    console.log('[UNDO] updateHistoryButtons, historyStack:', historyStack.length, 'redoStack:', redoStack.length);
    // ... rest of function
}
```

#### Step 2: Check Console After Each Action

1. Generate worksheet → Should see: `[UNDO] State saved, new length: 1`
2. Move object → Should see: `[UNDO] State saved, new length: 2`
3. Click undo → Should see: `[UNDO] updateHistoryButtons, historyStack: 1, redoStack: 1`

#### Step 3: Common Console Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `ReferenceError: showMessage is not defined` | Missing showMessage function | Add function (Step 6.4) |
| `ReferenceError: undo is not defined` | Event listeners before function definitions | Reorder code |
| `ReferenceError: historyStack is not defined` | Variables not declared | Add variables (Step 6.3) |
| `historyStack length always 0` | saveCanvasState not called | Check generation integration (Step 6.8) |
| `Undo does nothing` | Using object:modified | Change to mouse:down (Step 6.7) |

#### Step 4: Verify Function Order

```bash
# Check line numbers to verify correct order
grep -n "let historyStack" your-app.html       # Should be ~1140
grep -n "function showMessage" your-app.html   # Should be ~1380
grep -n "function saveCanvasState" your-app.html  # Should be ~1400
grep -n "function undo" your-app.html          # Should be ~1430
grep -n "undoBtn.addEventListener" your-app.html  # Should be ~1500
grep -n "canvas.on.*mouse:down" your-app.html  # Should be ~1640
```

If order is wrong, functions won't be available when event listeners try to use them.

---

### Success Criteria

Undo/redo implementation is complete when:

✅ Buttons visible in header with proper styling
✅ Undo button activates after worksheet generation
✅ Undo reverses user modifications perfectly
✅ Multiple undos step back through all changes
✅ Redo button activates after undo
✅ Redo restores undone changes perfectly
✅ Keyboard shortcuts (Ctrl+Z, Ctrl+Y) work
✅ Translations work in all 11 languages
✅ No console errors
✅ Worksheet doesn't disappear when undoing
✅ Works correctly on both Worksheet and Answer Key tabs
✅ All items in Testing Checklist pass

---

### Reference Implementation

**File**: `/opt/lessoncraftstudio/frontend/public/worksheet-generators/wordsearch.html`

**Key Line Numbers** (approximate):
- State variables: ~1136-1140
- showMessage function: ~1382-1404
- saveCanvasState: ~1407-1425
- undo function: ~1432-1451
- redo function: ~1453-1474
- restoreCanvasState: ~1476-1489
- updateHistoryButtons: ~1491-1500
- Event listeners: ~1502-1515
- Canvas events (mouse:down): ~1642
- Generation integration: ~1797-1798 (worksheet), ~1914-1915 (answer key)

---

## Common Pitfalls & Solutions

### Pitfall 1: Changes Not Visible After Deployment

**SYMPTOM**: File uploaded but no changes visible on live site.

**ROOT CAUSE**: Next.js standalone mode serves from `.next/standalone/` directory, not `public/`.

**SOLUTION**: Always use `-f` flag to force overwrite:
```bash
cp -f /opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP].html \
      /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP].html
```

**PREVENTION**: Use the deployment command from Section 9.

---

### Pitfall 2: Borders/Backgrounds Not Selectable

**SYMPTOM**: Borders and backgrounds appear but can't be clicked/selected.

**ROOT CAUSES** (check ALL):
1. `selectable: false` in object properties
2. `evented: false` in object properties
3. Object added behind puzzle grid Group
4. `enforceZOrder()` sending to back automatically

**SOLUTION CHECKLIST**:
- ✓ Set `selectable: true` and `evented: true`
- ✓ Call `object.bringToFront()` after `canvas.add(object)`
- ✓ Remove automatic `enforceZOrder()` calls for borders/backgrounds
- ✓ Update `userAddedObjects` filters to include them

**DEBUGGING**: Add console logs:
```javascript
console.log('[ADD OVERLAY] Object added:', {
    type: object.type,
    selectable: object.selectable,
    evented: object.evented,
    index: canvas.getObjects().indexOf(object)
});
```

---

### Pitfall 3: Z-Order Changes Don't Persist

**SYMPTOM**: Clicking "Bring Forward" works initially but object jumps back.

**ROOT CAUSE**: `enforceZOrder()` being called after user z-order operations.

**SOLUTION**: Remove ALL `enforceZOrder()` calls from:
- `bringObjectForward()`
- `sendObjectBackward()`
- `bringObjectToFront()`
- `sendObjectToBack()`
- Object movement handlers (`object:moving`, `object:modified`)

**KEEP** `enforceZOrder()` only for:
- Initial puzzle grid creation (if needed)
- Page border (purple border around page - should always be at back)

---

### Pitfall 4: Contextual Toolbar Not Showing

**SYMPTOM**: Selecting border/background doesn't show contextual toolbar.

**ROOT CAUSE**: Selection event handler filters out borders/backgrounds.

**SOLUTION**: Check `handleObjectSelection()` function:
```javascript
function handleObjectSelection(e) {
    const selected = e.selected || e.target;
    if (!selected) return;

    // DO NOT filter out borders/backgrounds here
    // if (selected.isBorder || selected.isBackground) return; // ✗ WRONG

    showContextualToolbar();
}
```

---

### Pitfall 5: userAddedObjects Filter Excludes Borders/Backgrounds

**SYMPTOM**: After generating worksheet, borders/backgrounds disappear behind puzzle.

**ROOT CAUSE**: `userAddedObjects` filter excludes them, so they're not brought to front after generation.

**SOLUTION**: Find ALL instances of `userAddedObjects` filter and update:
```javascript
// WRONG
const userAddedObjects = canvas.getObjects().filter(o =>
    !o.isPuzzleElement && !o.isBorder && !o.isBackground
);

// CORRECT
const userAddedObjects = canvas.getObjects().filter(o =>
    !o.isPuzzleElement && !o.isPageBorder && !o.isHeaderDesc && !o.isHeaderElement
);
```

**CRITICAL**: Update ALL instances (usually 2-3 in code).

---

### Pitfall 6: Zoom Not Resetting on Tab Switch

**SYMPTOM**: Switching between Worksheet and Answer Key maintains old zoom level.

**ROOT CAUSE**: Zoom state not reset during tab switch.

**SOLUTION**: Add `resetZoom()` to tab switch functions:
```javascript
function switchToWorksheet() {
    worksheetCanvas.renderAll();
    resetZoom();
}

function switchToAnswerKey() {
    answerKeyCanvas.renderAll();
    resetZoom();
}
```

---

### Pitfall 7: CSS Not Applied (Specificity Issues)

**SYMPTOM**: New CSS added but not visible.

**ROOT CAUSE**: Existing CSS has higher specificity.

**SOLUTION**:
1. Use `!important` sparingly and only when necessary
2. Increase specificity: `.tab-row .action-button.primary`
3. Ensure new CSS is loaded AFTER existing styles
4. Use browser DevTools to check computed styles

---

### Pitfall 8: Event Listeners Not Working

**SYMPTOM**: Clicking buttons does nothing.

**ROOT CAUSES**:
1. Element ID doesn't match variable
2. Event listener added before DOM element exists
3. Element recreated dynamically (loses listener)

**SOLUTION**:
```javascript
// Verify element exists
const myBtn = getEl('myBtnId');
if (!myBtn) {
    console.error('[ERROR] myBtnId not found in DOM');
    return;
}

// Add listener
myBtn.addEventListener('click', myFunction);

// Verify listener attached
console.log('[EVENT] Listener attached to myBtnId');
```

---

## Testing Checklist

### Before Deployment

**Complete this checklist for EVERY app modification:**

#### Header & UI
- [ ] Header has gradient background (purple gradient)
- [ ] Tabs ("Worksheet", "Answer Key") are on left side of header
- [ ] All controls (Zoom, Generate, Download, Clear) are on right side of header
- [ ] Tab switching works (Worksheet ↔ Answer Key)
- [ ] Header is at top of page (not middle)
- [ ] All buttons have hover effects
- [ ] Design looks professional and modern

#### Zoom Functionality
- [ ] Zoom In button increases canvas size
- [ ] Zoom Out button decreases canvas size
- [ ] Zoom level display updates (shows percentage)
- [ ] Zoom is clamped (25% min, 300% max)
- [ ] Zoom resets when switching tabs
- [ ] Mouse wheel zoom works (Ctrl + scroll)
- [ ] Canvas content scales proportionally

#### Border & Background
- [ ] Can add border from sidebar
- [ ] Can add background from sidebar
- [ ] Border is clickable after adding
- [ ] Background is clickable after adding
- [ ] Contextual toolbar appears when border selected
- [ ] Contextual toolbar appears when background selected
- [ ] Can move border by dragging
- [ ] Can move background by dragging
- [ ] Can resize border using corner handles
- [ ] Can resize background using corner handles
- [ ] Can rotate border
- [ ] Can rotate background

#### Z-Order Controls
- [ ] "Layers" dropdown exists in contextual toolbar
- [ ] Dropdown contains 4 buttons: Bring to Front, Bring Forward, Send Backward, Send to Back
- [ ] "Bring to Front" moves object to top layer
- [ ] "Bring Forward" moves object up one layer
- [ ] "Send Backward" moves object down one layer
- [ ] "Send to Back" moves object to bottom layer
- [ ] Z-order changes persist (don't reset)
- [ ] Can bring border in front of puzzle grid
- [ ] Can send puzzle grid behind border
- [ ] Console shows z-order changes in logs

#### Deletion
- [ ] Can delete border using Delete button in toolbar
- [ ] Can delete background using Delete button in toolbar
- [ ] Can delete using Delete key on keyboard
- [ ] Deleted objects are removed from canvas

#### Worksheet Generation
- [ ] Generating worksheet doesn't hide borders
- [ ] Generating worksheet doesn't hide backgrounds
- [ ] User-added elements stay on top of puzzle after generation
- [ ] Borders and backgrounds remain selectable after generation

#### Cross-Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari (if available)
- [ ] Test in Edge

#### Deployment Verification
- [ ] File exists in `public/` directory
- [ ] File exists in `.next/standalone/public/` directory
- [ ] Both files have identical MD5 hash
- [ ] PM2 restarted successfully
- [ ] Live site shows changes (hard refresh: Ctrl+Shift+R)

---

## Deployment Procedure

### Standard Deployment (For Each App)

**CRITICAL**: Follow these steps EXACTLY in this ORDER.

#### Step 1: Upload Local File to Server

```bash
# Windows (using PuTTY pscp)
"C:\Program Files\PuTTY\pscp.exe" -batch -pw PASSWORD -hostkey HOSTKEY \
  "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html" \
  "root@SERVER:/opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP_NAME].html"

# Verify upload
echo "File uploaded to public directory"
```

#### Step 2: Copy to Standalone and Restart

```bash
# Windows (using PuTTY plink)
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY \
  root@SERVER \
  "cp -f /opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP_NAME].html \
       /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html \
   && pm2 restart lessoncraftstudio \
   && echo '' \
   && echo '✅ [APP_NAME] MODIFICATIONS DEPLOYED' \
   && echo '' \
   && echo '📋 Changes Applied:' \
   && echo '  • Modern gradient header design' \
   && echo '  • Unified controls in header' \
   && echo '  • Zoom in/out functionality' \
   && echo '  • Editable borders and backgrounds' \
   && echo '  • Enhanced z-order controls (4 options)' \
   && echo '' \
   && echo '🌐 Clear browser cache (Ctrl+Shift+R) to see changes'"
```

#### Step 3: Verify Deployment

```bash
# Verify files are identical
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY \
  root@SERVER \
  "md5sum /opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP_NAME].html \
          /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html"

# Should show identical hashes
```

#### Step 4: Test Live Site

1. Open app in browser: `https://lessoncraftstudio.com/[locale]/worksheet-generators/[app-name]`
2. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
3. Run through Testing Checklist (Section 8)
4. Check browser console for errors (F12)

---

## Rollback Procedure

### If Something Goes Wrong

#### Quick Rollback (Use Backup)

```bash
# Restore from backup
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY \
  root@SERVER \
  "cp -f /opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP_NAME].html.backup \
       /opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP_NAME].html \
   && cp -f /opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP_NAME].html \
          /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html \
   && pm2 restart lessoncraftstudio \
   && echo '✅ Rolled back to backup version'"
```

#### Verify Rollback

```bash
# Download and inspect
"C:\Program Files\PuTTY\pscp.exe" -batch -pw PASSWORD -hostkey HOSTKEY \
  root@SERVER:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/[APP_NAME].html" \
  "C:\Users\rkgen\lessoncraftstudio\[APP_NAME]_rollback.html"
```

#### Debug Issues

1. **Check PM2 Logs**:
   ```bash
   pm2 logs lessoncraftstudio --lines 50
   ```

2. **Check Browser Console**:
   - Press F12
   - Look for JavaScript errors
   - Check Network tab for 404s

3. **Verify File Permissions**:
   ```bash
   ls -la /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html
   ```

---

## Implementation Workflow

### Recommended Order for Each App

1. **Preparation** (15 min)
   - Create backup
   - Download local copy
   - Read entire file
   - Identify key sections

2. **Feature 1: Header** (30 min)
   - Update HTML structure
   - Add CSS styles
   - Update JavaScript variables
   - Test tab switching

3. **Feature 2: Zoom** (20 min)
   - Add zoom variables
   - Create zoom functions
   - Add event listeners
   - Test zoom functionality

4. **Feature 3: Border/Background** (45 min)
   - Find border/background code
   - Fix object properties
   - Add bringToFront()
   - Fix userAddedObjects filters
   - Fix enforceZOrder()
   - Test selection and editing

5. **Feature 4: Layer Controls** (30 min)
   - Add HTML buttons
   - Add variables
   - Create z-order functions
   - Add event listeners
   - Test all 4 z-order operations

6. **Testing** (30 min)
   - Run through Testing Checklist
   - Fix any issues found
   - Re-test

7. **Deployment** (15 min)
   - Upload file
   - Copy to standalone
   - Restart PM2
   - Verify deployment
   - Test live site

**Total Time**: ~3 hours per app

---

## Apps To Modify

Based on worksheet generator structure, modify these apps IN THIS ORDER:

1. **Word Search** ✅ COMPLETED (Reference Implementation)
2. **Crossword Puzzle** (Next - similar structure)
3. **Sudoku** (After Crossword)
4. **Maze Generator** (After Sudoku)
5. **Bingo Card** (After Maze)
6. **Math Worksheet** (After Bingo)
7. **Handwriting Practice** (After Math)
8. **Others** (As needed)

**Strategy**: Start with most similar apps to Word Search, progress to more complex ones.

---

## Success Criteria

Each app modification is considered successful when ALL of the following are true:

✅ All items in Testing Checklist pass
✅ No JavaScript errors in browser console
✅ User can add, select, move, resize, and delete borders/backgrounds
✅ All 4 z-order operations work correctly
✅ Zoom in/out works smoothly
✅ Header design is modern and professional
✅ All controls are consolidated in header
✅ Changes persist after worksheet generation
✅ Live site reflects all changes

---

## Notes

- **Always create backups** before modifying
- **Test locally first** if possible (download → modify → test → upload)
- **One app at a time** - don't rush
- **Document deviations** - if an app requires different approach, note it
- **User testing** - have user test thoroughly before moving to next app
- **Console logging** - keep debug logs for troubleshooting
- **Version control** - consider git tagging after each successful app

---

## Questions & Troubleshooting

If you encounter issues not covered in this guide:

1. **Check Common Pitfalls** (Section 7)
2. **Review Word Search implementation** (reference code)
3. **Add console logging** to debug
4. **Test in isolation** (disable other features)
5. **Compare with working app** (Word Search)
6. **Rollback and retry** if needed

---

## Version History

- **v1.0.0** (2025-10-15): Initial comprehensive guide based on Word Search implementation
- **v1.1.0** (2025-10-15): Added alphabet train zoom fixes and enhanced documentation
- **v1.2.0** (2025-10-15): **MAJOR UPDATE** - Added comprehensive Feature 5: Contextual Toolbar Localization section covering:
  - Complete translation system architecture (11 languages)
  - Required translation keys for all contextual toolbar elements
  - Step-by-step implementation guide (8 detailed steps)
  - 6 translation-specific common pitfalls with real-world examples
  - Comprehensive testing checklist for all 11 languages
  - Dynamic tooltip handling (lock/unlock pattern)
  - Python script examples for bulk translation key extraction
  - Deployment checklist for translation updates
  - 837 lines of detailed documentation to prevent future translation failures

---

**END OF GUIDE**

This guide should be referenced for EVERY app modification to ensure consistency and prevent repeating past mistakes.
