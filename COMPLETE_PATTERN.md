# COMPLETE ALIGNMENT PATTERN - ALL 4 COMBINATIONS

## User's Complete Test Results

1. ✅ **Portrait + Vertical cut** = WORKS PERFECTLY
2. ❌ **Portrait + Horizontal cut** = MISALIGNED
3. ❌ **Landscape + Vertical cut** = MISALIGNED
4. ✅ **Landscape + Horizontal cut** = WORKS PERFECTLY

## The Pattern

**WORKS when cut direction MATCHES layout orientation:**
- Portrait (vertical layout) + Vertical cut ✅
- Landscape (horizontal layout) + Horizontal cut ✅

**BROKEN when cut direction is PERPENDICULAR to layout:**
- Portrait (vertical layout) + Horizontal cut ❌
- Landscape (horizontal layout) + Vertical cut ❌

## Detailed Analysis

### Portrait + Vertical Cut (✅ WORKS)
- Images cut vertically → LEFT and RIGHT halves
- Halves are TALL and NARROW
- Layout: 2 columns, images stacked vertically
- X positioning: Each column has images centered at column center
- Y positioning: Different for each image (stacked)
- **No horizontal alignment needed within column**

### Portrait + Horizontal Cut (❌ BROKEN)
- Images cut horizontally → TOP and BOTTOM halves
- Halves are WIDE and SHORT
- Layout: 2 columns, images stacked vertically
- X positioning: Each column has images centered at column center
- **Problem: Wide images with different widths, when centered, have misaligned LEFT edges!**

### Landscape + Vertical Cut (❌ BROKEN)
- Images cut vertically → LEFT and RIGHT halves
- Halves are TALL and NARROW
- Layout: 2 rows, images spread horizontally
- Y positioning: Same for all images in row
- **Problem: Tall images with different heights, even at same Y position, have misaligned TOP edges!**

### Landscape + Horizontal Cut (✅ WORKS)
- Images cut horizontally → TOP and BOTTOM halves
- Halves are WIDE and SHORT
- Layout: 2 rows, images spread horizontally
- X positioning: Different for each image (spread)
- Y positioning: Same for all images in row
- **No vertical alignment needed within row**

## Root Cause Identified

The problem is NOT in positioning calculations.
The problem is in IMAGE RENDERING with `originY: 'top'` and `originX: 'left'`.

When images have:
- Different heights
- Same `top` position
- `originY: 'top'`

Fabric.js with different scaleY factors renders them at slightly different positions!

Same issue for:
- Different widths
- Same `left` position
- `originX: 'left'`

## Why Center Origin Should Fix This

With `originX: 'center'` and `originY: 'center'`:
- Images are positioned at their CENTER point
- Fabric.js internally calculates edges
- The CENTER calculation is more stable across different scales
- All other worksheet modes use center origin successfully!
