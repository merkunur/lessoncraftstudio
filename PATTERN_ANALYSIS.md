# ALIGNMENT PROBLEM PATTERN ANALYSIS

## User's Reported Issues

1. ✅ Portrait + Vertical cut = WORKS PERFECTLY
2. ❌ Portrait + Horizontal cut = MISALIGNED (NEW!)
3. ❌ Landscape + Vertical cut = MISALIGNED
4. ❓ Landscape + Horizontal cut = ???

## Pattern Recognition

### What aligns in each case:

**Portrait + Vertical cut (WORKS):**
- Images are tall/narrow (vertical cuts)
- Arranged in 2 columns (left and right)
- Each column: 4 images stacked vertically
- **X positions calculated to center images in columns**
- Y positions are different for each image (stacked)
- **NO horizontal alignment needed within columns**

**Portrait + Horizontal cut (BROKEN):**
- Images are wide/short (horizontal cuts)
- Arranged in 2 columns (left and right)
- Each column: 4 images stacked vertically
- **X positions calculated to center images in columns**
- **LEFT EDGES should align vertically within each column!**
- But wide images with different widths → centering breaks alignment!

**Landscape + Vertical cut (BROKEN):**
- Images are tall/narrow (vertical cuts)
- Arranged in 2 rows (top and bottom)
- Each row: 4 images spread horizontally
- **Y positions should be same for all in row**
- **TOP EDGES should align horizontally!**
- But tall images with different heights → alignment breaks!

## THE REAL PATTERN

**The problem occurs when:**
1. Images are arranged in a LINE (row or column)
2. Images should have ALIGNED EDGES on one axis
3. But we're using CENTER-based positioning
4. Images have DIFFERENT dimensions on that axis

**Portrait + Vertical = WORKS because:**
- Tall images in columns
- Different Y positions (stacked) = no vertical edge alignment needed
- X centering works fine because column edges don't need to align

**Portrait + Horizontal = BROKEN because:**
- Wide images in columns
- X centering with different widths = LEFT edges misalign!

**Landscape + Vertical = BROKEN because:**
- Tall images in rows
- Y centering (or top positioning) with different heights = TOP edges misalign!

## THE SOLUTION

**For images that need aligned edges, use EDGE-based positioning, not CENTER:**

1. **Portrait mode horizontal cuts:** Use LEFT edge positioning (originX: 'left')
2. **Landscape mode vertical cuts:** Use TOP edge positioning (originY: 'top')
3. **Portrait mode vertical cuts:** Can keep center (works fine)
4. **Landscape mode horizontal cuts:** Need to check...

## Code Analysis Needed

Check the portrait mode X positioning code and see if it's using centering when it should use left-edge alignment for horizontal cuts.
