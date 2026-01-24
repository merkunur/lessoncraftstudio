# ZOOM ANALYSIS - CRITICAL DISCOVERY

## Canvas Zoom Configuration (Lines 1651-1676)

```javascript
// CRITICAL: Apply 25% scaling for better visibility
// Extra 25% for landscape orientations
const isLandscape = width > height;
const baseScale = 1.25; // Base 25% larger for all
const landscapeBonus = isLandscape ? 1.25 : 1.0; // Additional 25% for landscape
const displayScale = baseScale * landscapeBonus;

// For LANDSCAPE:
displayScale = 1.25 * 1.25 = 1.5625

// For PORTRAIT:
displayScale = 1.25 * 1.0 = 1.25
```

## The Zoom Calculation

```javascript
const scaleRatio = Math.min(availableWidth / scaledWidth, availableHeight / scaledHeight, 1);
const displayWidth = scaledWidth * scaleRatio;
const displayHeight = scaledHeight * scaleRatio;

const baseZoom = (displayWidth / width);
const finalZoom = baseZoom * userZoomLevel;
c.setZoom(finalZoom);
```

## Hypothesis

**Landscape mode has 56.25% display scale vs Portrait's 25% scale.**

This means:
1. More zoom = more floating-point calculations
2. More zoom = more rounding errors
3. Sub-pixel positioning differences get AMPLIFIED by the higher zoom

## The Real Issue

When images have the same logical `yPos = 135`, but zoom is applied:
- Image A: renders at `135 * zoom` pixels
- Image B: renders at `135 * zoom` pixels
- Image C: renders at `135 * zoom` pixels

BUT if the images have slightly different internal heights after scaling, and Fabric.js uses those heights in its rendering calculations, the COMBINATION of:
1. Different scaled widths (from different aspect ratios)
2. High zoom factor (1.5625x for landscape)
3. Sub-pixel rounding

Could cause visible misalignment!

## Test Needed

Check if the misalignment is:
1. In the actual Fabric.js object positions (same `top` property)
2. In the visual rendering only (browser sub-pixel rendering with high zoom)
