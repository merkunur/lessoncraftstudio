# Answer Key Bug Analysis: Solution Path Goes Through Walls

## Problem Statement
In the Choose the Right Path mode, the answer key sometimes shows the solution path going through walls instead of following the maze corridors.

## Root Cause Identified

**Location:** `picture path.html` lines 5097-5124

### The Bug
The iterative blocking algorithm finds the **actual zigzagging path** through the maze using `findMazeSolution()`, but then **ignores this path** and blocks cells along a **straight line** from the border instead!

### Code Analysis

**Step 1: Find the actual path (CORRECT)**
```javascript
// Find if a path still exists from START to this wrong END
const pathToWrong = findMazeSolution(maze, startCell, endCell, rows, cols);
// Returns: [{r:11, c:5}, {r:11, c:6}, {r:10, c:6}, {r:10, c:7}, {r:9, c:7}, ...]
//          ↑ START                     ↑ turns!        ↑ turns!              ↑ END
```

**Step 2: Walk to blocking point (INCORRECT - IGNORES THE PATH!)**
```javascript
// Walk to the blocking point along THIS specific path
let currentCell = { ...endCell };
for (let i = 0; i < blockDepth && i < pathToWrong.length; i++) {
  let nextCell;

  if (endBorderSide === 'top') {
    nextCell = { r: currentCell.r + 1, c: currentCell.c };  // ALWAYS go DOWN
  } else if (endBorderSide === 'bottom') {
    nextCell = { r: currentCell.r - 1, c: currentCell.c };  // ALWAYS go UP
  } else if (endBorderSide === 'left') {
    nextCell = { r: currentCell.r, c: currentCell.c + 1 };  // ALWAYS go RIGHT
  } else { // 'right'
    nextCell = { r: currentCell.r, c - 1 < 0) break;
    nextCell = { r: currentCell.r, c: currentCell.c - 1 };  // ALWAYS go LEFT
  }

  currentCell = nextCell;
}
// Result: Walks in a STRAIGHT LINE regardless of actual path!
```

### Example Scenario

**Actual Path Found by findMazeSolution():**
```
END (0, 7) → (1, 7) → (1, 6) → (2, 6) → (2, 5) → (3, 5) → (3, 4) → ... → START (11, 5)
     ↓           ↓        ↓ TURN! ↓        ↓ TURN! ↓        ↓ TURN!
```

**Cells Actually Blocked by Current Code:**
```
END (0, 7) → (1, 7) → (2, 7) → (3, 7) → (4, 7) → (5, 7) ← WRONG! Straight line!
     ↓           ↓        ↓        ↓        ↓        ↓
   Border    Depth 1  Depth 2  Depth 3  Depth 4  Depth 5
```

### Why This Causes Walls in Answer Key

1. **Generation:** We block cells at `(1,7), (2,7), (3,7), (4,7), (5,7)` (straight line)
2. **Answer Key:** Uses `findMazeSolution()` which follows the ACTUAL path
3. **Result:** The actual path `(1,7) → (1,6) → (2,6)` has open corridors because we never blocked those cells!
4. **Symptom:** Answer key draws dots along the real path, which goes through what should be blocked areas

## The Fix

Replace the straight-line walking with direct indexing into the `pathToWrong` array:

```javascript
// CORRECT FIX: Use the actual path returned by findMazeSolution()
const blockIndex = Math.min(blockDepth, pathToWrong.length - 1);
const cellToBlock = pathToWrong[blockIndex];

console.log(`  → Blocking at path index ${blockIndex}: (${cellToBlock.r}, ${cellToBlock.c})`);

// Block this cell from all directions
maze[cellToBlock.r][cellToBlock.c].top = true;
maze[cellToBlock.r][cellToBlock.c].right = true;
maze[cellToBlock.r][cellToBlock.c].bottom = true;
maze[cellToBlock.r][cellToBlock.c].left = true;

// Re-open ONLY the direction back toward START (previous cell in path)
if (blockIndex > 0) {
  const prevCell = pathToWrong[blockIndex - 1];
  const dr = cellToBlock.r - prevCell.r;
  const dc = cellToBlock.c - prevCell.c;

  if (dr === -1) {
    // Previous cell is ABOVE current cell
    maze[cellToBlock.r][cellToBlock.c].top = false;
  } else if (dr === 1) {
    // Previous cell is BELOW current cell
    maze[cellToBlock.r][cellToBlock.c].bottom = false;
  } else if (dc === -1) {
    // Previous cell is LEFT of current cell
    maze[cellToBlock.r][cellToBlock.c].left = false;
  } else if (dc === 1) {
    // Previous cell is RIGHT of current cell
    maze[cellToBlock.r][cellToBlock.c].right = false;
  }
}
```

### Why This Fix Works

1. **Uses Actual Path:** `pathToWrong[blockIndex]` gets the cell at the correct depth **along the real path**
2. **Follows Turns:** If path turns left at index 3, we block the cell where the turn happens
3. **Correct Backtracking:** Opens the wall toward the previous cell in the actual path, not just toward the border
4. **Answer Key Matches:** When answer key calls `findMazeSolution()` again, it gets the same path and finds it properly blocked

## Impact

This fix ensures that:
- ✅ Wrong paths are blocked along their actual routes (not straight lines)
- ✅ Answer key solution path follows open corridors only
- ✅ No more solution paths going through walls
- ✅ Educational integrity maintained - exactly one valid solution

## Files to Modify

- `picture path.html` lines 5097-5140 (iterative blocking loop)
