# Making Worksheet Apps Responsive to Portrait and Landscape Orientations

## Problem Statement

When users generate a worksheet in portrait mode and then switch to landscape (or vice versa), the design and layout should automatically adapt to the new orientation. Without this, landscape worksheets get stretched portrait headers and incorrect grid/content layouts.

## Solution Overview

This guide documents the exact process used to make the **wordsearch** app fully responsive to both portrait and landscape page orientations. Apply this same process to the remaining 32 worksheet apps.

---

## Step 1: Update `createHeaderGroup()` to Support Both Orientations

### The Issue
The header was using fixed pixel values designed for portrait (612×792px), causing it to stretch awkwardly across landscape pages (792×612px).

### The Solution
Make the header detect orientation and apply different designs for landscape vs portrait.

### Code Pattern

```javascript
function createHeaderGroup(canvas) {
    const defaultHeaders = {
        en: { title: 'App Title', description: 'Child-friendly description' },
        // ... all 11 languages
    };

    const locale = currentLocale || 'en';
    const defaults = defaultHeaders[locale] || defaultHeaders.en;
    const title = defaults.title;
    const description = defaults.description;

    // KEY: Get current canvas dimensions for responsive design
    const pageWidth = currentCanvasConfig.width;
    const pageHeight = currentCanvasConfig.height;
    const isLandscape = pageWidth > pageHeight;  // ← CRITICAL CHECK

    const objects = [];

    // Outer border - responsive to page size
    const margin = 34;
    const strokeWidth = 8;
    const borderWidth = pageWidth - (margin * 2);
    const borderHeight = pageHeight - (margin * 2);

    const outerBorder = new fabric.Rect({
        left: margin,
        top: margin,
        width: borderWidth,
        height: borderHeight,
        fill: 'transparent',
        stroke: '#7B68A6',  // ← Customize color per app context
        strokeWidth: strokeWidth,
        rx: 12,
        ry: 12,
        selectable: true,
        hasControls: true,
        isPageBorder: true
    });
    objects.push(outerBorder);

    // LANDSCAPE MODE: Compact, professional header centered at top
    if (isLandscape) {
        // Compact header dimensions for landscape (60% of width maximum)
        const maxHeaderWidth = Math.min(500, pageWidth * 0.6);
        const headerHeight = 70;
        const pillHeight = 50;

        const centerX = pageWidth / 2;
        const headerTop = 60;

        // Header background - compact size
        const bgRect = new fabric.Rect({
            left: centerX - maxHeaderWidth / 2,
            top: headerTop,
            width: maxHeaderWidth,
            height: headerHeight,
            fill: '#4DB8AC',  // ← Customize color per app context
            rx: 35,
            ry: 35,
            selectable: true,
            isHeaderElement: true  // ← CRITICAL TAG for removal
        });
        objects.push(bgRect);

        // White pill for title - compact
        const whitePill = new fabric.Rect({
            left: centerX - (maxHeaderWidth - 40) / 2,
            top: headerTop + 10,
            width: maxHeaderWidth - 40,
            height: pillHeight,
            fill: '#FFFFFF',
            rx: 25,
            ry: 25,
            selectable: true,
            isHeaderElement: true  // ← CRITICAL TAG
        });
        objects.push(whitePill);

        // Title - Compact size for landscape
        let titleFontSize = 36;
        if (title.length > 12) titleFontSize = 32;
        if (title.length > 15) titleFontSize = 28;
        if (title.length > 18) titleFontSize = 24;

        const titleText = new fabric.IText(title, {
            left: centerX,
            top: headerTop + 35,
            fontSize: titleFontSize,
            fontFamily: 'Fredoka, sans-serif',
            fontWeight: '700',
            fill: '#2C5F5D',  // ← Customize color per app context
            textAlign: 'center',
            originX: 'center',
            originY: 'center',
            selectable: true,
            editable: true,
            isHeaderElement: true  // ← CRITICAL TAG
        });
        objects.push(titleText);

        // Description - compact below header
        const descText = new fabric.Textbox(description, {
            left: centerX,
            top: headerTop + headerHeight + 5,
            width: maxHeaderWidth - 20,
            fontSize: 14,
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: '500',
            fill: '#6B5B95',  // ← Customize color per app context
            textAlign: 'center',
            originX: 'center',
            originY: 'top',
            selectable: true,
            editable: true,
            hasControls: true,
            isHeaderDesc: true  // ← CRITICAL TAG
        });
        objects.push(descText);

    } else {
        // PORTRAIT MODE: Full-width professional header
        const headerMargin = 70;
        const headerWidth = pageWidth - (headerMargin * 2);
        const headerHeight = 80;
        const pillMargin = headerMargin + 30;
        const pillWidth = pageWidth - (pillMargin * 2);
        const pillHeight = 60;
        const centerX = pageWidth / 2;

        // Header background (fun word search theme)
        const bgRect = new fabric.Rect({
            left: headerMargin,
            top: 70,
            width: headerWidth,
            height: headerHeight,
            fill: '#4DB8AC',  // ← Customize color per app context
            rx: 40,
            ry: 40,
            selectable: true,
            isHeaderElement: true  // ← CRITICAL TAG
        });
        objects.push(bgRect);

        // White rounded rectangle for title
        const whitePill = new fabric.Rect({
            left: pillMargin,
            top: 80,
            width: pillWidth,
            height: pillHeight,
            fill: '#FFFFFF',
            rx: 30,
            ry: 30,
            selectable: true,
            isHeaderElement: true  // ← CRITICAL TAG
        });
        objects.push(whitePill);

        // Title - Dynamic size based on length
        let titleFontSize = 48;
        if (title.length > 12) titleFontSize = 40;
        if (title.length > 15) titleFontSize = 36;
        if (title.length > 18) titleFontSize = 32;
        if (title.length > 22) titleFontSize = 28;

        const titleText = new fabric.IText(title, {
            left: centerX,
            top: 110,
            fontSize: titleFontSize,
            fontFamily: 'Fredoka, sans-serif',
            fontWeight: '700',
            fill: '#2C5F5D',  // ← Customize color per app context
            textAlign: 'center',
            originX: 'center',
            originY: 'center',
            selectable: true,
            editable: true,
            isHeaderElement: true  // ← CRITICAL TAG
        });
        objects.push(titleText);

        // Description - smaller with wrapping
        const descWidth = Math.min(450, pageWidth - 150);
        const descText = new fabric.Textbox(description, {
            left: centerX,
            top: 165,
            width: descWidth,
            fontSize: 18,
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: '500',
            fill: '#6B5B95',  // ← Customize color per app context
            textAlign: 'center',
            originX: 'center',
            originY: 'top',
            selectable: true,
            editable: true,
            hasControls: true,
            isHeaderDesc: true  // ← CRITICAL TAG
        });
        objects.push(descText);
    }

    return objects;
}
```

### Key Points

1. **Detect orientation**: `const isLandscape = pageWidth > pageHeight;`
2. **Different designs**: Landscape gets compact (60% width), portrait gets full-width
3. **Critical tags**: ALL header elements MUST have `isHeaderElement: true` or `isHeaderDesc: true` so they can be removed on regeneration
4. **Responsive dimensions**: Calculate positions/sizes based on `pageWidth` and `pageHeight`, not hardcoded values

---

## Step 2: Update `createPuzzleObjects()` to Use Correct Header Height

### The Issue
The puzzle layout calculation used a fixed header height, so content didn't position correctly when switching orientations.

### The Solution
Calculate header height based on orientation.

### Code Pattern

```javascript
async function createPuzzleObjects(data, isAnswerKey) {
    if (!data) return [];
    const { grid, placedWordsInfo, settings } = data;
    const { rows, cols } = settings;
    const tag = isAnswerKey ? 'isAnswerKeyItem' : 'isPuzzleElement';

    // Professional layout with proper margins
    const pageWidth = currentCanvasConfig.width;
    const pageHeight = currentCanvasConfig.height;
    const marginRatio = 0.1; // 10% margins

    // KEY: Different header heights for landscape vs portrait
    const headerHeight = pageWidth > pageHeight ? 145 : 190;

    const usableWidth = pageWidth * (1 - 2 * marginRatio);
    const usableHeight = pageHeight * (1 - 2 * marginRatio) - headerHeight;

    // Determine if landscape or portrait
    const isLandscape = pageWidth > pageHeight;

    // ... rest of puzzle creation logic using isLandscape to position elements
}
```

### Key Points

1. **Dynamic header height**: Landscape = 145px, Portrait = 190px
2. **Read from `currentCanvasConfig`**: Always use `currentCanvasConfig.width` and `currentCanvasConfig.height`
3. **Pass orientation info**: Use `isLandscape` flag throughout layout calculations

---

## Step 3: Tag ALL Header Elements for Proper Removal

### The Issue
When regenerating, some header elements (background rect, white pill, title) weren't being removed because they lacked identifying properties.

### The Solution
Add `isHeaderElement: true` to ALL header components.

### Critical Tags

```javascript
// Border elements
isPageBorder: true      // For outer purple border

// Header elements
isHeaderElement: true   // For background rect, white pill, title text
isHeaderDesc: true      // For description textbox
```

### Removal Filter

When removing old headers, filter for ALL tags:

```javascript
const oldHeaderItems = canvas.getObjects().filter(o =>
    o.isPageBorder || o.isHeaderDesc || o.isHeaderElement
);
oldHeaderItems.forEach(o => canvas.remove(o));
```

---

## Step 4: Update User Object Filters

### The Issue
User-added objects (text, drawings) were being removed during regeneration because they weren't properly excluded.

### The Solution
Update all filters to exclude header elements.

### Code Pattern

```javascript
// In handleGenerateWorksheet()
const userAddedObjects = worksheetCanvas.getObjects().filter(o =>
    !o.isPuzzleElement &&
    !o.isBorder &&
    !o.isBackground &&
    !o.isPageBorder &&
    !o.isHeaderDesc &&
    !o.isHeaderElement  // ← ADD THIS
);

// In generateAnswerKey()
const userAddedObjects = answerKeyCanvas.getObjects().filter(o =>
    !o.isAnswerKeyItem &&
    !o.isBorder &&
    !o.isBackground &&
    !o.isPageBorder &&
    !o.isHeaderDesc &&
    !o.isHeaderElement  // ← ADD THIS
);
```

---

## Step 5: Update Z-Order Management

### The Issue
Borders need to stay behind everything, but header elements should be above borders.

### The Solution
Update `enforceZOrder()` function.

### Code Pattern

```javascript
function enforceZOrder(canvas) {
    if (!canvas) return;

    const background = canvas.getObjects().find(o => o.isBackground);
    if (background) canvas.sendToBack(background);

    const border = canvas.getObjects().find(o => o.isBorder);
    if (border) {
        canvas.sendToBack(border);
        if (background) canvas.bringForward(border);
    }

    // Send page border (purple border) to back - it should be behind everything
    const pageBorder = canvas.getObjects().find(o => o.isPageBorder);
    if (pageBorder) {
        canvas.sendToBack(pageBorder);
        if (background) canvas.bringForward(pageBorder);
        if (border) canvas.bringForward(pageBorder);
    }

    // Ensure header elements are in proper order (behind puzzle content but above borders)
    const headerElements = canvas.getObjects().filter(o => o.isHeaderElement || o.isHeaderDesc);
    headerElements.forEach(elem => {
        if (pageBorder) canvas.bringForward(elem);
    });
}
```

---

## Step 6: Implement Automatic Layout Regeneration

### The Issue
When users change page size, headers and content don't update until they manually click "New Worksheet".

### The Solution
Automatically regenerate the entire layout when page size changes.

### Code Pattern

**Add to page size change handlers:**

```javascript
function handlePageSizeChange() {
    const selectedValue = pageSizeSelect.value;
    if (selectedValue === 'custom') {
        customPageSizeInputsDiv.style.display = 'block';
    } else {
        customPageSizeInputsDiv.style.display = 'none';
        const [w, h] = selectedValue.split('x').map(Number);
        updateCanvasDisplayDimensions(w, h);

        // ← ADD THIS: Regenerate layout when page size changes
        regenerateHeadersOnly();
    }
}

function applyCustomPageSize() {
    let newWidth = parseInt(pageWidthInput.value, 10) || currentCanvasConfig.width;
    let newHeight = parseInt(pageHeightInput.value, 10) || currentCanvasConfig.height;
    updateCanvasDisplayDimensions(newWidth, newHeight);

    // ← ADD THIS: Regenerate layout when page size changes
    regenerateHeadersOnly();
}
```

**Add regeneration functions:**

```javascript
async function regenerateHeadersOnly() {
    // Only regenerate if worksheet exists
    if (!lastGeneratedData) return;

    // Regenerate worksheet canvas
    await regenerateCanvasLayout(worksheetCanvas, false);

    // Regenerate answer key canvas if it exists
    if (answerKeyCanvas) {
        await regenerateCanvasLayout(answerKeyCanvas, true);
    }
}

async function regenerateCanvasLayout(canvas, isAnswerKey) {
    if (!canvas || !lastGeneratedData) return;

    // Preserve user-added objects
    const userAddedObjects = canvas.getObjects().filter(o =>
        !o.isPuzzleElement &&
        !o.isAnswerKeyItem &&
        !o.isBorder &&
        !o.isBackground &&
        !o.isPageBorder &&
        !o.isHeaderDesc &&
        !o.isHeaderElement
    );

    // Remove all generated content (headers, borders, puzzle elements)
    const itemTag = isAnswerKey ? 'isAnswerKeyItem' : 'isPuzzleElement';
    const oldItems = canvas.getObjects().filter(o =>
        o[itemTag] ||
        o.isPageBorder ||
        o.isHeaderDesc ||
        o.isHeaderElement
    );
    oldItems.forEach(o => canvas.remove(o));

    // Recreate header with current page dimensions
    const headerObjects = createHeaderGroup(canvas);
    if (headerObjects) {
        canvas.add(...headerObjects);
    }

    // Recreate puzzle with current page dimensions and layout
    const newPuzzleObjects = await createPuzzleObjects(lastGeneratedData, isAnswerKey);
    canvas.add(...newPuzzleObjects);

    enforceZOrder(canvas);
    userAddedObjects.forEach(obj => obj.bringToFront());
    canvas.renderAll();
}
```

### Key Points

1. **Despite the name**: `regenerateHeadersOnly()` actually regenerates the ENTIRE layout (headers + puzzle grid + word list)
2. **Preserves user content**: User-added text, drawings, and images are preserved
3. **Async**: Must be async because `createPuzzleObjects()` loads images asynchronously
4. **Updates both canvases**: Worksheet and answer key (if it exists)

---

## Complete Checklist for Making an App Responsive

### ✅ Step-by-Step Checklist

- [ ] **Update `createHeaderGroup()` function**
  - [ ] Read `currentCanvasConfig.width` and `currentCanvasConfig.height`
  - [ ] Calculate `isLandscape = pageWidth > pageHeight`
  - [ ] Create separate designs for `if (isLandscape)` and `else` (portrait)
  - [ ] Landscape: Compact header (60% width, max 500px)
  - [ ] Portrait: Full-width header
  - [ ] Add `isHeaderElement: true` to ALL header elements (bgRect, whitePill, titleText)
  - [ ] Add `isHeaderDesc: true` to description textbox
  - [ ] Add `isPageBorder: true` to outer border
  - [ ] Make border dimensions responsive: `width: pageWidth - (margin * 2)`

- [ ] **Update `createPuzzleObjects()` function**
  - [ ] Calculate dynamic header height: `const headerHeight = pageWidth > pageHeight ? 145 : 190;`
  - [ ] Update usable height calculation to subtract dynamic header height
  - [ ] Ensure layout logic uses `isLandscape` flag for positioning

- [ ] **Update removal filters in `handleGenerateWorksheet()`**
  - [ ] Add `!o.isHeaderElement` to user object filter
  - [ ] Add `o.isHeaderElement` to removal filter

- [ ] **Update removal filters in `generateAnswerKey()`**
  - [ ] Add `!o.isHeaderElement` to user object filter
  - [ ] Add `o.isHeaderElement` to removal filter

- [ ] **Update `enforceZOrder()` function**
  - [ ] Add code to send page border to back
  - [ ] Add code to layer header elements above borders

- [ ] **Add automatic regeneration**
  - [ ] Call `regenerateHeadersOnly()` in `handlePageSizeChange()`
  - [ ] Call `regenerateHeadersOnly()` in `applyCustomPageSize()`
  - [ ] Add `regenerateHeadersOnly()` function (despite name, regenerates everything)
  - [ ] Add `regenerateCanvasLayout()` helper function

- [ ] **Test thoroughly**
  - [ ] Generate worksheet in portrait → switch to landscape → verify layout adapts
  - [ ] Generate worksheet in landscape → switch to portrait → verify layout adapts
  - [ ] Add user text/drawings → switch orientation → verify user content preserved
  - [ ] Generate answer key → switch orientation → verify both canvases update
  - [ ] Test with Ctrl+F5 hard refresh to clear browser cache

---

## Common Mistakes to Avoid

### ❌ Mistake #1: Using Hardcoded Dimensions
**Wrong:**
```javascript
width: 472,
left: 70,
```

**Right:**
```javascript
width: pageWidth - (headerMargin * 2),
left: headerMargin,
```

### ❌ Mistake #2: Forgetting `isHeaderElement` Tag
**Wrong:**
```javascript
const bgRect = new fabric.Rect({
    left: 70,
    top: 70,
    width: 472,
    fill: '#4DB8AC',
    selectable: true
});
```

**Right:**
```javascript
const bgRect = new fabric.Rect({
    left: 70,
    top: 70,
    width: 472,
    fill: '#4DB8AC',
    selectable: true,
    isHeaderElement: true  // ← CRITICAL!
});
```

### ❌ Mistake #3: Not Updating All Filters
You must update EVERY filter that identifies user vs. generated content to include `!o.isHeaderElement`

### ❌ Mistake #4: Fixed Header Height
**Wrong:**
```javascript
const headerHeight = 190; // Always portrait size
```

**Right:**
```javascript
const headerHeight = pageWidth > pageHeight ? 145 : 190;
```

---

## Summary

To make a worksheet app responsive to portrait and landscape orientations:

1. **Detect orientation** in `createHeaderGroup()` using `isLandscape = pageWidth > pageHeight`
2. **Create two designs**: Compact header for landscape, full-width for portrait
3. **Tag everything**: Add `isHeaderElement` or `isHeaderDesc` to ALL header components
4. **Update filters**: Add `!o.isHeaderElement` and `o.isHeaderElement` to all relevant filters
5. **Dynamic header height**: Use different values for landscape (145px) vs portrait (190px)
6. **Automatic regeneration**: Call regeneration when page size changes
7. **Preserve user content**: Filter out user-added objects before regenerating

Follow this guide exactly for each of the remaining 32 worksheet apps.
