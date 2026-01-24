# Diagnosis: I Spy Mode Huge Images

## User Report
"It still generates huge images when I click the generate button even if I don't change anything"
- Happens in I spy mode
- Happens without switching modes
- Happens on repeated generates

## Current Implementation Analysis

### Mode Detection (Line 3334)
```javascript
const isOddOneOutMode = allDistractors.length > 0 && allDistractors[0].isPair !== undefined;
```

**Critical**: If allDistractors[0] has `isPair` property, I spy mode will execute odd one out code path!

### prepareISpyImages (Line 2660)
```javascript
let dists = [...selectedDistractors];  // Shallow copy
// OR
dists = getRandomSubset(themeImages, ...);  // References to cache

let allDistractors = [...dists];  // Shallow copy
while(allDistractors.length < 30) {
    allDistractors.push(dists[...]]);  // More references
}
```

**Problem**: allDistractors contains REFERENCES to cached objects or selectedDistractors

### Hypothesis 1: Cache Pollution
If cached theme objects somehow get `isPair` property:
1. Odd one out uses theme → creates `{ ...cached, isPair: true }`
2. But what if somewhere the cached object itself gets mutated?
3. Next I spy generation gets same cached objects
4. Mode check sees `allDistractors[0].isPair !== undefined` → TRUE
5. I spy mode executes odd one out code → huge images!

### Hypothesis 2: selectedDistractors Pollution
If selectedDistractors objects get `isPair` property:
1. User manually selects images
2. Runs odd one out mode
3. Somehow selectedDistractors objects get mutated
4. Switch to I spy mode
5. prepareISpyImages does `[...selectedDistractors]` → shallow copy with isPair!
6. Mode check sees isPair → executes odd one out code

### Where Could Mutation Happen?

Need to check:
- fabric.Image.fromURL callback
- Any property assignments to img or itemInfo
- Any code that modifies objects after placement
- Canvas state save/restore
- Undo/redo operations

## Solution

Create TRUE copies without any extra properties in prepareISpyImages:
```javascript
// Strip all properties except essential ones
allDistractors = allDistractors.map(img => ({
    path: img.path,
    name: img.name
}));
```

This ensures:
- No isPair property
- No targetSize property
- No other污染properties
- Fresh clean objects for each generation
