# CRITICAL ANALYSIS - USER'S KEY OBSERVATIONS

## KEY FACTS

1. **Portrait + Vertical cut = PERFECT alignment** ✅
2. **Landscape + Vertical cut = MISALIGNED** ❌
3. **Labels align perfectly in landscape** ✅
4. **Images misalign in landscape** ❌

## CRITICAL INSIGHT FROM FACT 3 & 4

**If labels align perfectly, then yPos calculation is CORRECT!**

Labels are positioned using:
```javascript
labelY = yPos + half.img.getScaledHeight() + verticalSpacing;
```

Labels use the SAME `yPos` variable as images. If labels align, the positioning logic works!

**Therefore: The problem is NOT in positioning logic, it's in IMAGE RENDERING!**

## DIFFERENCE: Portrait vs Landscape

### Portrait Mode (WORKS)
```javascript
yPos = top + yOffset + (itemHeight * i) + (verticalSpacing * i);
```
- Each image gets DIFFERENT yPos
- Images are stacked vertically
- Not supposed to align horizontally

### Landscape Mode (BROKEN)
```javascript
yPos = top + yOffset;  // SAME for ALL
```
- All images get SAME yPos
- Images are arranged horizontally
- Must align horizontally at top edge

## THE REAL QUESTION

**Why do images with the SAME yPos value render at different vertical positions?**

All images have:
- Same `top` property (yPos)
- Same `originY: 'top'`
- Same targetHeight (143px integer)
- Same positioning code

But they have:
- **Different original heights** (from source images: 600px, 601px, 599px)
- **Different scaleY factors** (even with same targetHeight!)
  - Image A: scaleY = 143/600 = 0.238333...
  - Image B: scaleY = 143/601 = 0.237937...
  - Image C: scaleY = 143/599 = 0.238730...

## HYPOTHESIS

**Fabric.js rendering with different scaleY values causes sub-pixel positioning variations!**

Even with same `top` and `originY: 'top'`, different transformation matrices lead to different final rendering positions!

## THE SOLUTION

Make ALL images have the SAME scaleY factor by ensuring they have the SAME original height!

### How:
1. When creating tempCanvas for vertical cuts, use a FIXED height for all
2. Center the cut image content vertically in the fixed-size canvas
3. All Fabric.Images will have same dimensions → same scaleY → perfect alignment!
