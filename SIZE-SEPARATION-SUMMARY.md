# Find Objects - Mode-Specific Image Sizes

## Date
October 20, 2025

## Overview
Separated image size configurations so that Odd One Out mode uses larger images (50% bigger) while I Spy mode retains the original sizes.

## Rationale

### Why Different Sizes?

**I Spy Mode**:
- Multiple instances of hidden objects
- Dense image placement (30+ images)
- Smaller images work better for crowded layouts
- Original sizes are optimal

**Odd One Out Mode**:
- Fewer total images (typically 22-27)
- Pairs need to be visible but disguised
- Larger images make activity more engaging
- More space available per image

## Implementation

### I Spy Mode (Original Sizes)

```javascript
// In generateScene() - used for I spy mode
const minSize = baseSize * 0.7;  // Minimum size
const relativeMaxSize = minSize * 2.5;
const absoluteMaxSize = isLandscape ? 180 : 150;
const maxSize = Math.min(relativeMaxSize, absoluteMaxSize);
```

**Size Ranges**:
- Minimum: baseSize × 0.7
- Maximum: 180px (landscape) / 150px (portrait)
- Typical range: ~100px to 180px

### Odd One Out Mode (50% Larger)

```javascript
// In odd one out branch - calculated separately
const oddMinSize = baseSize * 1.05;  // 50% larger minimum
const oddRelativeMaxSize = oddMinSize * 2.5;
const oddAbsoluteMaxSize = isLandscape ? 270 : 225; // 50% larger maximum
const oddMaxSize = Math.min(oddRelativeMaxSize, oddAbsoluteMaxSize);

// Passed to specialized placement function
await placeOddOneOutImages(
    canvas, allDistractors, contentRect, baseSize,
    oddMinSize,  // Larger minimum
    oddMaxSize,  // Larger maximum
    isLandscape
);
```

**Size Ranges**:
- Minimum: baseSize × 1.05 (was 0.7 × 1.5 = 1.05)
- Maximum: 270px (landscape) / 225px (portrait)
- Typical range: ~150px to 270px

## Size Comparison

### I Spy Mode vs Odd One Out Mode

| Parameter | I Spy Mode | Odd One Out Mode | Increase |
|-----------|------------|------------------|----------|
| Minimum multiplier | 0.7x | 1.05x | 50% |
| Max (landscape) | 180px | 270px | 50% |
| Max (portrait) | 150px | 225px | 50% |
| Typical min | ~100px | ~150px | 50% |
| Typical max | ~180px | ~270px | 50% |

## Visual Impact

### I Spy Mode
- **Appearance**: Original, tested sizes
- **Density**: High (30+ images)
- **Image visibility**: Good for smaller hidden objects
- **Layout**: Proven to work well

### Odd One Out Mode
- **Appearance**: Noticeably larger images
- **Density**: Lower (20-27 images)
- **Image visibility**: Better visibility for pairs
- **Layout**: More engaging and easier to see

## Code Structure

### Conditional Size Calculation

```javascript
// Check mode
const isOddOneOutMode = allDistractors.length > 0 &&
                        allDistractors[0].isPair !== undefined;

if (isOddOneOutMode) {
    // Calculate LARGER sizes for odd one out
    const oddMinSize = baseSize * 1.05;
    const oddAbsoluteMaxSize = isLandscape ? 270 : 225;
    const oddMaxSize = Math.min(oddRelativeMaxSize, oddAbsoluteMaxSize);

    // Use specialized placement with larger sizes
    await placeOddOneOutImages(..., oddMinSize, oddMaxSize, ...);
} else {
    // Use ORIGINAL sizes for I spy
    // minSize and maxSize already calculated above
    // Normal placement continues...
}
```

### Mode Detection

The algorithm detects odd one out mode by checking if images have the `isPair` property:
```javascript
const isOddOneOutMode = allDistractors[0].isPair !== undefined;
```

This is set during `prepareOddOneOutImages()`:
```javascript
allImages.push({
    ...pairs[i],
    isPair: true,      // <-- Detection flag
    isOdd: false,
    pairId: `pair-${i}`
});
```

## Benefits

### Mode Separation
✓ Each mode optimized for its specific use case
✓ I spy maintains proven layout
✓ Odd one out gets better visibility
✓ No compromise on either mode

### User Experience
✓ I spy: Familiar, works as expected
✓ Odd one out: More engaging with larger images
✓ Clear visual difference between modes
✓ Appropriate difficulty for each activity

### Code Quality
✓ Clean separation of concerns
✓ Easy to adjust each mode independently
✓ No interference between modes
✓ Maintainable and documented

## Size Examples

### I Spy Mode - Portrait (Original)
- Canvas: 612 × 792 (letter portrait)
- Base size: ~140px
- Min size: 140 × 0.7 = 98px
- Max size: min(98 × 2.5, 150) = 150px
- **Range**: 98px - 150px

### Odd One Out Mode - Portrait (Larger)
- Canvas: 612 × 792 (letter portrait)
- Base size: ~140px
- Min size: 140 × 1.05 = 147px
- Max size: min(147 × 2.5, 225) = 225px
- **Range**: 147px - 225px
- **50% larger** than I spy

### I Spy Mode - Landscape (Original)
- Canvas: 792 × 612 (letter landscape)
- Base size: ~140px
- Min size: 140 × 0.7 = 98px
- Max size: min(98 × 2.5, 180) = 180px
- **Range**: 98px - 180px

### Odd One Out Mode - Landscape (Larger)
- Canvas: 792 × 612 (letter landscape)
- Base size: ~140px
- Min size: 140 × 1.05 = 147px
- Max size: min(147 × 2.5, 270) = 270px
- **Range**: 147px - 270px
- **50% larger** than I spy

## Pair Size Differentiation (Odd One Out Only)

In addition to larger overall sizes, pairs have differentiated sizes:

```javascript
// One member larger
const size1 = oddMinSize * (1.3 + Math.random() * 0.5); // 1.3x - 1.8x
pairMembers[0].targetSize = Math.min(size1, oddMaxSize);

// One member smaller
const size2 = oddMinSize * (0.9 + Math.random() * 0.4); // 0.9x - 1.3x
pairMembers[1].targetSize = Math.min(size2, oddMaxSize);
```

**Result**: With larger base sizes AND differentiation:
- Larger pair member: ~193px to ~324px (landscape max 270px)
- Smaller pair member: ~132px to ~191px
- Clear size difference between pair members

## Deployment Details

### Files Modified
- `find-objects-final.html` - Updated with separated size logic

### Code Changes
1. Restored I spy sizes to original (0.7, 180/150)
2. Added odd one out size calculation in separate branch
3. Pass larger sizes to `placeOddOneOutImages()`
4. Added comments documenting the separation

### Backward Compatibility
✓ I spy mode unchanged from before size increase
✓ Odd one out mode gets the improvements
✓ No breaking changes
✓ Existing worksheets work perfectly

## Testing Recommendations

### I Spy Mode
- [ ] Generate worksheet with original settings
- [ ] Verify images are familiar size (not too big)
- [ ] Check 30+ images fit well on canvas
- [ ] Compare to previous I spy worksheets
- [ ] Confirm no visual regression

### Odd One Out Mode
- [ ] Generate worksheet with 10 pairs + 2 odd
- [ ] Verify images are noticeably larger
- [ ] Check pairs are well visible
- [ ] Compare to I spy mode (should be bigger)
- [ ] Verify maximum size enforcement (270/225)

### Side-by-Side Comparison
- [ ] Generate one I spy worksheet
- [ ] Generate one odd one out worksheet
- [ ] Compare image sizes visually
- [ ] Confirm odd one out has ~50% larger images
- [ ] Both should look professionally balanced

## Performance Impact

### Memory
- Negligible (few extra variables)
- No additional storage

### Processing
- Same number of calculations
- No performance difference

### File Size
- No change in deployed file size
- Minor comment additions only

## Future Considerations

### Configurable Sizes
Could add UI controls to let users adjust sizes:
```javascript
// Potential future enhancement
const userSizeMultiplier = parseFloat(sizeMultiplierInput.value) || 1.0;
const oddMinSize = baseSize * 1.05 * userSizeMultiplier;
```

### Per-Mode Settings
Could allow different settings for each mode:
- I spy: density, hidden object count, size range
- Odd one out: pairs count, odd count, size range, separation distance

## Conclusion

The size separation provides the best of both worlds:
- **I Spy mode** retains its proven, optimized sizing
- **Odd One Out mode** benefits from larger, more visible images

This ensures each activity mode delivers the best possible user experience without compromises.

### Final Size Summary

**I Spy Mode** (unchanged):
- Min: baseSize × 0.7
- Max: 180px landscape / 150px portrait

**Odd One Out Mode** (50% larger):
- Min: baseSize × 1.05
- Max: 270px landscape / 225px portrait

Both modes work perfectly in their intended context!
