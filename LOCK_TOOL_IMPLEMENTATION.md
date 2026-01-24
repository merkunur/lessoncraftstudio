# Lock/Unlock Tool Implementation Guide

**Created:** 2025-10-30
**Last Updated:** 2025-10-30 (Added Step 7 - Enhanced Unlock All Button)
**Purpose:** Step-by-step guide to implement the lock/unlock feature in worksheet generator contextual toolbars
**Reference Implementation:** addition.html (includes enhanced unlock all button feature)

---

## Overview

The lock/unlock tool allows users to lock worksheet elements (images, text, borders, backgrounds, etc.) to prevent accidental editing while still allowing drag-selection of multiple objects. This is a critical feature for maintaining worksheet layout integrity.

### Key Behaviors:

1. **Locked objects are completely non-interactive:**
   - `evented: false` - Don't capture mouse events (enables drag-selection)
   - `selectable: false` - Can't be clicked or selected
   - All movement, rotation, and scaling disabled

2. **Unlocking mechanism (Basic - Steps 1-6):**
   - Since locked objects can't be selected, clicking the lock button with nothing selected unlocks ALL locked objects
   - Simple approach but creates a UX catch-22 (see Step 7 for solution)

3. **Enhanced unlocking mechanism (RECOMMENDED - Step 7):**
   - Permanent "Unlock All" button in main header toolbar
   - Automatically shows/hides based on locked object presence
   - Orange-highlighted for visibility
   - Solves the catch-22 problem: accessible even when nothing is selected

4. **Multi-language support:**
   - Uses `data-translate-title="lockUnlock"` and `data-translate="unlockAll"` attributes
   - Translations must be added manually for all 11 languages

---

## Implementation Steps

### Step 1: Add Lock Button to HTML

**Location:** Inside `<div id="object-context-toolbar">`, add a new toolbar group BEFORE the delete button group.

```html
<!-- Add this BEFORE the delete button toolbar group -->
<div class="toolbar-group">
    <button class="context-btn" id="toolbarLockBtn" data-translate-title="lockUnlock" title="Lock/Unlock"><i class="fas fa-lock-open"></i></button>
</div>
```

**Complete context (where to insert):**
```html
                </div> <!-- End of align toolbar group -->

                <!-- INSERT LOCK BUTTON HERE -->
                <div class="toolbar-group">
                    <button class="context-btn" id="toolbarLockBtn" data-translate-title="lockUnlock" title="Lock/Unlock"><i class="fas fa-lock-open"></i></button>
                </div>

                <div class="toolbar-group">
                    <button class="context-btn" id="toolbarDeleteBtn" data-translate-title="deleteSelected" title="Delete Selected"><i class="fas fa-trash-alt"></i></button>
                </div>
```

**Icon Used:** FontAwesome `fa-lock-open` (unlocked state), `fa-lock` (locked state)

---

### Step 2: Add JavaScript Variable Declaration

**Location:** In the JavaScript section where toolbar button variables are declared (usually around line 1220-1235).

**Find this section:**
```javascript
const toolbarBringToFrontBtn = getEl('toolbarBringToFrontBtn');
const toolbarBringForwardBtn = getEl('toolbarBringForwardBtn');
const toolbarSendBackwardBtn = getEl('toolbarSendBackwardBtn');
const toolbarSendToBackBtn = getEl('toolbarSendToBackBtn');
const alignBtn = getEl('alignBtn');
const alignDropdown = getEl('alignDropdown');
const toolbarDeleteBtn = getEl('toolbarDeleteBtn');
```

**Add this line BEFORE `toolbarDeleteBtn`:**
```javascript
const toolbarLockBtn = getEl('toolbarLockBtn');
```

**Complete result:**
```javascript
const toolbarBringToFrontBtn = getEl('toolbarBringToFrontBtn');
const toolbarBringForwardBtn = getEl('toolbarBringForwardBtn');
const toolbarSendBackwardBtn = getEl('toolbarSendBackwardBtn');
const toolbarSendToBackBtn = getEl('toolbarSendToBackBtn');
const alignBtn = getEl('alignBtn');
const alignDropdown = getEl('alignDropdown');
const toolbarLockBtn = getEl('toolbarLockBtn');  // ADD THIS LINE
const toolbarDeleteBtn = getEl('toolbarDeleteBtn');
```

---

### Step 3: Add Event Listener

**Location:** In the `setupEventListeners()` function or wherever toolbar button event listeners are set up (usually around line 1585-1590).

**Find this section:**
```javascript
toolbarBringToFrontBtn.addEventListener('click', bringObjectToFront);
toolbarBringForwardBtn.addEventListener('click', bringObjectForward);
toolbarSendBackwardBtn.addEventListener('click', sendObjectBackward);
toolbarSendToBackBtn.addEventListener('click', sendObjectToBack);
toolbarDeleteBtn.addEventListener('click', deleteSelectedObjects);
```

**Add this line BEFORE `toolbarDeleteBtn` listener:**
```javascript
toolbarLockBtn.addEventListener('click', toggleLockSelectedObjects);
```

**Complete result:**
```javascript
toolbarBringToFrontBtn.addEventListener('click', bringObjectToFront);
toolbarBringForwardBtn.addEventListener('click', bringObjectForward);
toolbarSendBackwardBtn.addEventListener('click', sendObjectBackward);
toolbarSendToBackBtn.addEventListener('click', sendObjectToBack);
toolbarLockBtn.addEventListener('click', toggleLockSelectedObjects);  // ADD THIS LINE
toolbarDeleteBtn.addEventListener('click', deleteSelectedObjects);
```

---

### Step 4: Add toggleLockSelectedObjects Function

**Location:** Add this function AFTER the `deleteSelectedObjects()` function (usually around line 3660-3670).

**Complete function code:**
```javascript
function toggleLockSelectedObjects() {
    const canvas = getActiveCanvas();
    const activeObject = canvas.getActiveObject();

    // If nothing is selected, unlock ALL locked objects on the canvas
    if (!activeObject) {
        const allObjects = canvas.getObjects();
        const lockedObjects = allObjects.filter(obj => obj.lockMovementX === true);

        if (lockedObjects.length > 0) {
            lockedObjects.forEach(obj => {
                obj.set({
                    lockMovementX: false,
                    lockMovementY: false,
                    lockRotation: false,
                    lockScalingX: false,
                    lockScalingY: false,
                    hasControls: true,
                    hasBorders: true,
                    selectable: true,
                    evented: true
                });
            });

            // Update button icon to unlocked
            const lockIcon = toolbarLockBtn.querySelector('i');
            lockIcon.classList.remove('fa-lock');
            lockIcon.classList.add('fa-lock-open');

            canvas.renderAll();
            console.log(`Unlocked ${lockedObjects.length} objects`);
        }

        closeAllPopovers();
        return;
    }

    // Handle both single objects and groups
    const objectsToLock = activeObject.type === 'activeSelection'
        ? activeObject.getObjects()
        : [activeObject];

    // Check if any object is currently locked
    const isAnyLocked = objectsToLock.some(obj => obj.lockMovementX === true);

    // Toggle lock state (opposite of current state)
    const shouldLock = !isAnyLocked;

    objectsToLock.forEach(obj => {
        // When locking, make objects completely non-interactive
        // This prevents them from blocking mouse drag selections
        obj.set({
            lockMovementX: shouldLock,
            lockMovementY: shouldLock,
            lockRotation: shouldLock,
            lockScalingX: shouldLock,
            lockScalingY: shouldLock,
            hasControls: !shouldLock,
            hasBorders: !shouldLock,
            selectable: !shouldLock,  // Locked objects are not selectable
            evented: !shouldLock      // Locked objects don't capture mouse events
        });
    });

    // Update button icon
    const lockIcon = toolbarLockBtn.querySelector('i');
    if (shouldLock) {
        lockIcon.classList.remove('fa-lock-open');
        lockIcon.classList.add('fa-lock');
    } else {
        lockIcon.classList.remove('fa-lock');
        lockIcon.classList.add('fa-lock-open');
    }

    canvas.renderAll();
    closeAllPopovers();
}
```

**Insert location example:**
```javascript
function deleteSelectedObjects() {
    const canvas = getActiveCanvas();
    const activeObjects = canvas.getActiveObjects();

    if (activeObjects.length > 0) {
        canvas.remove(...activeObjects);
        canvas.discardActiveObject().renderAll();
    }
    closeAllPopovers();
}

// INSERT toggleLockSelectedObjects FUNCTION HERE

function alignObjects(type) {
    // ... rest of code
}
```

---

### Step 5: Remove Lock Icon Update from handleObjectSelection (IMPORTANT!)

**Location:** Find the `handleObjectSelection()` function (usually around line 3546-3584).

**CRITICAL:** Since locked objects have `selectable: false`, they can never trigger `handleObjectSelection()`. Therefore, any code that updates the lock button icon based on selection state must be REMOVED.

**Find and REMOVE this code if it exists:**
```javascript
// REMOVE THIS ENTIRE BLOCK IF PRESENT:
// Update lock button icon based on selection lock state
const objectsToCheck = isGroup ? activeObject.getObjects() : [activeObject];
const isAnyLocked = objectsToCheck.some(obj => obj.lockMovementX === true);
const lockIcon = toolbarLockBtn.querySelector('i');
if (isAnyLocked) {
    lockIcon.classList.remove('fa-lock-open');
    lockIcon.classList.add('fa-lock');
} else {
    lockIcon.classList.remove('fa-lock');
    lockIcon.classList.add('fa-lock-open');
}
```

---

### Step 6: Add Translations to Translation File

**File:** `translations-[app-name]-complete.js` or `translations-wordsearch-complete.js`
**Location:** In EACH language section, add the `lockUnlock` key BEFORE the `deleteSelected` key.

**Translation Key:** `"lockUnlock"`

**Placement:** Insert BEFORE `"deleteSelected"` in each language section.

#### English (en):
```javascript
"centerOnPageHorizontally": "Center on Page Horizontally",
"centerOnPageVertically": "Center on Page Vertically",
"lockUnlock": "Lock/Unlock",  // ADD THIS LINE
"deleteSelected": "Delete Selected",
```

#### German (de):
```javascript
"centerOnPageHorizontally": "Auf Seite horizontal zentrieren",
"centerOnPageVertically": "Auf Seite vertikal zentrieren",
"lockUnlock": "Sperren/Entsperren",  // ADD THIS LINE
"deleteSelected": "Auswahl löschen",
```

#### French (fr):
```javascript
"centerOnPageHorizontally": "Centrer horizontalement sur la page",
"centerOnPageVertically": "Centrer verticalement sur la page",
"lockUnlock": "Verrouiller/Déverrouiller",  // ADD THIS LINE
"deleteSelected": "Supprimer la sélection",
```

#### Spanish (es):
```javascript
"centerOnPageHorizontally": "Centrar horizontalmente en la página",
"centerOnPageVertically": "Centrar verticalmente en la página",
"lockUnlock": "Bloquear/Desbloquear",  // ADD THIS LINE
"deleteSelected": "Eliminar selección",
```

#### Italian (it):
```javascript
"centerOnPageHorizontally": "Centra orizzontalmente nella pagina",
"centerOnPageVertically": "Centra verticalmente nella pagina",
"lockUnlock": "Blocca/Sblocca",  // ADD THIS LINE
"deleteSelected": "Elimina selezione",
```

#### Portuguese (pt):
```javascript
"centerOnPageHorizontally": "Centralizar horizontalmente na página",
"centerOnPageVertically": "Centralizar verticalmente na página",
"lockUnlock": "Bloquear/Desbloquear",  // ADD THIS LINE
"deleteSelected": "Excluir seleção",
```

#### Dutch (nl):
```javascript
"centerOnPageHorizontally": "Horizontaal centreren op pagina",
"centerOnPageVertically": "Verticaal centreren op pagina",
"lockUnlock": "Vergrendelen/Ontgrendelen",  // ADD THIS LINE
"deleteSelected": "Selectie verwijderen",
```

#### Swedish (sv):
```javascript
"centerOnPageHorizontally": "Centrera horisontellt på sida",
"centerOnPageVertically": "Centrera vertikalt på sida",
"lockUnlock": "Lås/Lås upp",  // ADD THIS LINE
"deleteSelected": "Ta bort val",
```

#### Danish (da):
```javascript
"centerOnPageHorizontally": "Centrer vandret på side",
"centerOnPageVertically": "Centrer lodret på side",
"lockUnlock": "Lås/Lås op",  // ADD THIS LINE
"deleteSelected": "Slet valgte",
```

#### Norwegian (no):
```javascript
"centerOnPageHorizontally": "Sentrer horisontalt på side",
"centerOnPageVertically": "Sentrer vertikalt på side",
"lockUnlock": "Lås/Lås opp",  // ADD THIS LINE
"deleteSelected": "Slett valgte",
```

#### Finnish (fi):
```javascript
"centerOnPageHorizontally": "Keskitä sivulle vaakasuunnassa",
"centerOnPageVertically": "Keskitä sivulle pystysuunnassa",
"lockUnlock": "Lukitse/Avaa",  // ADD THIS LINE
"deleteSelected": "Poista valittu",
```

---

## 🆕 Step 7: Add Permanent "Unlock All" Button (RECOMMENDED - Enhanced Feature)

### The Catch-22 Problem

After implementing Steps 1-6, users encounter a critical UX issue:

**Problem:** Locked objects have `selectable: false` and `evented: false` (required for drag-selection to work). This means they **cannot be selected**. However, the lock/unlock button is in the contextual toolbar, which only appears when objects are selected.

**Result:** Once an object is locked, there's no way to unlock it without unlocking ALL objects (by clicking the lock button with nothing selected).

### The Solution: Permanent "Unlock All" Button

Add a permanent button to the **main header toolbar** that:
- ✅ Always accessible (not dependent on selection)
- ✅ Automatically shows when locked objects exist
- ✅ Automatically hides when no locked objects exist
- ✅ Orange-highlighted for visibility
- ✅ One-click solution to unlock all locked objects

**Reference Implementation:** `REFERENCE APPS/addition.html`

---

### Step 7.1: Add CSS for Unlock All Button

**Location:** Find the `.history-btn:disabled` CSS rule and add the unlock button styles immediately after it.

**Find this CSS pattern:**
```css
.history-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Action Buttons */
```

**Replace with:**
```css
.history-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Unlock All Button */
.unlock-all-controls {
  display: none; /* Hidden by default */
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(255, 165, 0, 0.25);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 165, 0, 0.4);
}

.unlock-all-controls.visible {
  display: flex;
}

.unlock-all-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.unlock-all-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.unlock-all-btn i {
  font-size: 14px;
}

/* Action Buttons */
```

**Note:** The orange background (`rgba(255, 165, 0, 0.25)`) makes the button highly visible when locked objects exist.

---

### Step 7.2: Add HTML for Unlock All Button in Header Toolbar

**Location:** Find the History Controls section in the header toolbar.

**Find this HTML pattern:**
```html
          <!-- History Controls -->
          <div class="history-controls">
            <button id="undoBtn" class="history-btn" title="Undo (Ctrl+Z)" data-translate-title="undo" disabled><i class="fas fa-undo"></i></button>
            <button id="redoBtn" class="history-btn" title="Redo (Ctrl+Y)" data-translate-title="redo" disabled><i class="fas fa-redo"></i></button>
          </div>

          <!-- Generate Dropdown -->
```

**Replace with:**
```html
          <!-- History Controls -->
          <div class="history-controls">
            <button id="undoBtn" class="history-btn" title="Undo (Ctrl+Z)" data-translate-title="undo" disabled><i class="fas fa-undo"></i></button>
            <button id="redoBtn" class="history-btn" title="Redo (Ctrl+Y)" data-translate-title="redo" disabled><i class="fas fa-redo"></i></button>
          </div>

          <!-- Unlock All Button (shown when objects are locked) -->
          <div id="unlockAllControls" class="unlock-all-controls">
            <button id="unlockAllBtn" class="unlock-all-btn" data-translate-title="unlockAll" title="Unlock All Locked Objects">
              <i class="fas fa-unlock"></i>
              <span data-translate="unlockAll">Unlock All</span>
            </button>
          </div>

          <!-- Generate Dropdown -->
```

---

### Step 7.3: Add Variable Declarations

**Location:** Find the undo/redo button variable declarations.

**Find this code:**
```javascript
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
```

**Replace with:**
```javascript
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const unlockAllBtn = document.getElementById('unlockAllBtn');
const unlockAllControls = document.getElementById('unlockAllControls');
```

---

### Step 7.4: Add unlockAllObjects and updateUnlockAllButtonVisibility Functions

**Location:** Add these functions immediately AFTER the `toggleLockSelectedObjects` function.

**Add this code:**
```javascript
function unlockAllObjects() {
    const canvas = getActiveCanvas();
    const allObjects = canvas.getObjects();
    const lockedObjects = allObjects.filter(obj => obj.lockMovementX === true);

    if (lockedObjects.length > 0) {
        lockedObjects.forEach(obj => {
            obj.set({
                lockMovementX: false,
                lockMovementY: false,
                lockRotation: false,
                lockScalingX: false,
                lockScalingY: false,
                hasControls: true,
                hasBorders: true,
                selectable: true,
                evented: true
            });
        });

        canvas.renderAll();
        console.log(`Unlocked ${lockedObjects.length} objects`);
        updateUnlockAllButtonVisibility();
    }
}

function updateUnlockAllButtonVisibility() {
    const canvas = getActiveCanvas();
    const allObjects = canvas.getObjects();
    const hasLockedObjects = allObjects.some(obj => obj.lockMovementX === true);

    if (hasLockedObjects) {
        unlockAllControls.classList.add('visible');
    } else {
        unlockAllControls.classList.remove('visible');
    }
}
```

**Key Points:**
- `unlockAllObjects()`: Finds all locked objects and unlocks them
- `updateUnlockAllButtonVisibility()`: Shows/hides the unlock button based on locked object presence
- Both functions work with the active canvas (supports multi-canvas apps)

---

### Step 7.5: Add Event Listener for Unlock All Button

**Location:** Find the event listeners for toolbar buttons.

**Find this code:**
```javascript
toolbarLockBtn.addEventListener('click', toggleLockSelectedObjects);
toolbarDeleteBtn.addEventListener('click', deleteSelectedObjects);
```

**Replace with:**
```javascript
toolbarLockBtn.addEventListener('click', toggleLockSelectedObjects);
toolbarDeleteBtn.addEventListener('click', deleteSelectedObjects);
unlockAllBtn.addEventListener('click', unlockAllObjects);
```

---

### Step 7.6: Update toggleLockSelectedObjects to Call Visibility Update

**Location:** Modify the `toggleLockSelectedObjects` function to call `updateUnlockAllButtonVisibility()`.

**Find these two locations in the function and add the visibility update call:**

**Location 1:** After unlocking all when nothing is selected:
```javascript
// If nothing is selected, unlock ALL locked objects on the canvas
if (!activeObject) {
    // ... existing unlock all code ...

    closeAllPopovers();
    updateUnlockAllButtonVisibility();  // ADD THIS LINE
    return;
}
```

**Location 2:** At the end of the function after lock/unlock action:
```javascript
// Update button icon
const lockIcon = toolbarLockBtn.querySelector('i');
if (shouldLock) {
    lockIcon.classList.remove('fa-lock-open');
    lockIcon.classList.add('fa-lock');
} else {
    lockIcon.classList.remove('fa-lock');
    lockIcon.classList.add('fa-lock-open');
}

canvas.renderAll();
closeAllPopovers();
updateUnlockAllButtonVisibility();  // ADD THIS LINE
```

---

### Step 7.7: Add "unlockAll" Translations for All 11 Languages

**File:** `translations-[app-name]-complete.js`
**Location:** In EACH language section, add the `unlockAll` key AFTER the `lockUnlock` key.

**Placement:** Insert AFTER `"lockUnlock"` and BEFORE `"deleteSelected"` in each language section.

#### English (en):
```javascript
"lockUnlock": "Lock/Unlock",
"unlockAll": "Unlock All",  // ADD THIS LINE
"deleteSelected": "Delete Selected",
```

#### German (de):
```javascript
"lockUnlock": "Sperren/Entsperren",
"unlockAll": "Alle entsperren",  // ADD THIS LINE
"deleteSelected": "Auswahl löschen",
```

#### French (fr):
```javascript
"lockUnlock": "Verrouiller/Déverrouiller",
"unlockAll": "Tout déverrouiller",  // ADD THIS LINE
"deleteSelected": "Supprimer la sélection",
```

#### Spanish (es):
```javascript
"lockUnlock": "Bloquear/Desbloquear",
"unlockAll": "Desbloquear todo",  // ADD THIS LINE
"deleteSelected": "Eliminar selección",
```

#### Italian (it):
```javascript
"lockUnlock": "Blocca/Sblocca",
"unlockAll": "Sblocca tutto",  // ADD THIS LINE
"deleteSelected": "Elimina selezione",
```

#### Portuguese (pt):
```javascript
"lockUnlock": "Bloquear/Desbloquear",
"unlockAll": "Desbloquear tudo",  // ADD THIS LINE
"deleteSelected": "Excluir seleção",
```

#### Dutch (nl):
```javascript
"lockUnlock": "Vergrendelen/Ontgrendelen",
"unlockAll": "Alles ontgrendelen",  // ADD THIS LINE
"deleteSelected": "Selectie verwijderen",
```

#### Swedish (sv):
```javascript
"lockUnlock": "Lås/Lås upp",
"unlockAll": "Lås upp alla",  // ADD THIS LINE
"deleteSelected": "Ta bort val",
```

#### Danish (da):
```javascript
"lockUnlock": "Lås/Lås op",
"unlockAll": "Lås alle op",  // ADD THIS LINE
"deleteSelected": "Slet valgte",
```

#### Norwegian (no):
```javascript
"lockUnlock": "Lås/Lås opp",
"unlockAll": "Lås opp alle",  // ADD THIS LINE
"deleteSelected": "Slett valgte",
```

#### Finnish (fi):
```javascript
"lockUnlock": "Lukitse/Avaa",
"unlockAll": "Avaa kaikki",  // ADD THIS LINE
"deleteSelected": "Poista valittu",
```

---

## CSS Styling

### For Steps 1-6 (Basic Lock Feature)
**NO ADDITIONAL CSS REQUIRED.** The lock button uses the existing `.context-btn` class which is already defined in the app's contextual toolbar CSS.

The existing CSS handles:
- Button appearance and hover states
- Icon sizing and alignment
- Spacing within toolbar groups

### For Step 7 (Enhanced Unlock All Button)
**CSS IS REQUIRED.** See Step 7.1 for the complete CSS code for the permanent unlock all button. The CSS includes:
- `.unlock-all-controls`: Container styling with orange background
- `.unlock-all-controls.visible`: Show/hide functionality
- `.unlock-all-btn`: Button styling with hover effects
- Orange highlight (`rgba(255, 165, 0, 0.25)`) for visibility

---

## Deployment Process (Per DEPLOYMENT.md)

### Step 1: Copy REFERENCE APPS File to Working File
```bash
powershell -Command "Copy-Item 'C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\[app-name].html' 'C:\Users\rkgen\lessoncraftstudio\[app-name]-LOCK-FEATURE.html' -Force"
```

### Step 2: Make Modifications
- Edit the `[app-name]-LOCK-FEATURE.html` file
- Follow implementation steps 1-5 above
- Edit `REFERENCE TRANSLATIONS\translations-[app-name]-complete.js` if it exists
- Follow step 6 to add translations manually for all 11 languages

### Step 3: Upload HTML File to Production
```bash
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\[app-name]-LOCK-FEATURE.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/[app-name].html"
```

### Step 4: Upload Translation File to Production (if applicable)
```bash
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-[app-name]-complete.js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-[app-name]-complete.js"
```

### Step 5: Copy to Standalone and Restart PM2
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/[app-name].html' '.next/standalone/public/worksheet-generators/[app-name].html' && cp 'public/worksheet-generators/js/translations-[app-name]-complete.js' '.next/standalone/public/worksheet-generators/js/translations-[app-name]-complete.js' && pm2 restart lessoncraftstudio"
```

### Step 6: Update REFERENCE APPS Folder (MANDATORY)
```bash
powershell -Command "Copy-Item 'C:\Users\rkgen\lessoncraftstudio\[app-name]-LOCK-FEATURE.html' 'C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\[app-name].html' -Force"
```

### Step 7: Update REFERENCE TRANSLATIONS Folder (MANDATORY - if translations file was modified)
**NOTE:** In most cases, you edit the translations file directly in REFERENCE TRANSLATIONS, so this step is already done. Only needed if you created a separate working copy.

### Step 8: Clean Up Temporary Files
```bash
cmd /c del "C:\Users\rkgen\lessoncraftstudio\[app-name]-LOCK-FEATURE.html"
```

---

## Key Implementation Details

### Why `evented: false` and `selectable: false`?

**Problem:** When locked objects have `evented: true`, they capture mouse events and prevent Fabric.js from initiating drag selections.

**Solution:** Setting `evented: false` makes locked objects completely "transparent" to mouse events, allowing drag-selection to work through them.

**Trade-off:** Since locked objects can't be clicked, we need an alternative unlock mechanism → clicking the lock button with nothing selected unlocks ALL locked objects.

### Why Toggle Based on `isAnyLocked`?

When multiple objects are selected, some might be locked and some unlocked. The function checks if ANY are locked, and if so, unlocking is the action (to unlock those that are locked). Otherwise, all are unlocked, so locking is the action.

### Icon State Management

The lock button icon automatically updates based on the action performed:
- **Lock action performed** → Change icon to `fa-lock` (closed lock)
- **Unlock action performed** → Change icon to `fa-lock-open` (open lock)

### Unlock All Feature

When nothing is selected and the lock button is clicked:
1. Find all objects with `lockMovementX: true`
2. Reset all lock properties to `false`
3. Reset `selectable: true` and `evented: true`
4. Update button icon to unlocked state
5. Log the number of objects unlocked (for debugging)

---

## Testing Checklist

After implementing the lock feature, test the following:

### Basic Lock Feature (Steps 1-6)
- [ ] Lock button appears in contextual toolbar
- [ ] Lock button is visible only when objects are selected
- [ ] Selecting a single object and clicking lock → object becomes locked
- [ ] Locked object cannot be moved, scaled, or rotated
- [ ] Locked object cannot be selected by clicking
- [ ] Can drag-select multiple objects even with locked backgrounds/borders
- [ ] Selecting multiple objects and clicking lock → all objects become locked
- [ ] Clicking lock button with nothing selected → all locked objects are unlocked
- [ ] Button icon changes from open lock to closed lock when locking
- [ ] Button icon changes from closed lock to open lock when unlocking

### Enhanced Unlock All Button (Step 7)
- [ ] Unlock All button does NOT appear when page first loads (no locked objects)
- [ ] Unlock All button appears in header toolbar when objects are locked
- [ ] Unlock All button has orange background highlight (high visibility)
- [ ] Clicking Unlock All button unlocks all locked objects on canvas
- [ ] Unlock All button automatically hides after all objects are unlocked
- [ ] Unlock All button works even when no objects are selected
- [ ] Unlock All button tooltip displays in correct language

### Translation Tests (All Languages)
- [ ] Lock/Unlock tooltips display in correct language for all 11 languages:
  - [ ] English: "Lock/Unlock"
  - [ ] German: "Sperren/Entsperren"
  - [ ] French: "Verrouiller/Déverrouiller"
  - [ ] Spanish: "Bloquear/Desbloquear"
  - [ ] Italian: "Blocca/Sblocca"
  - [ ] Portuguese: "Bloquear/Desbloquear"
  - [ ] Dutch: "Vergrendelen/Ontgrendelen"
  - [ ] Swedish: "Lås/Lås upp"
  - [ ] Danish: "Lås/Lås op"
  - [ ] Norwegian: "Lås/Lås opp"
  - [ ] Finnish: "Lukitse/Avaa"

- [ ] Unlock All button text displays in correct language for all 11 languages (if Step 7 implemented):
  - [ ] English: "Unlock All"
  - [ ] German: "Alle entsperren"
  - [ ] French: "Tout déverrouiller"
  - [ ] Spanish: "Desbloquear todo"
  - [ ] Italian: "Sblocca tutto"
  - [ ] Portuguese: "Desbloquear tudo"
  - [ ] Dutch: "Alles ontgrendelen"
  - [ ] Swedish: "Lås upp alla"
  - [ ] Danish: "Lås alle op"
  - [ ] Norwegian: "Lås opp alle"
  - [ ] Finnish: "Avaa kaikki"

---

## Common Mistakes to Avoid

### ❌ DO NOT use Python scripts to add translations
- **Problem:** Scripts can add wrong translations to wrong language sections
- **Solution:** Always add translations manually, one language at a time

### ❌ DO NOT keep `selectable: true` for locked objects
- **Problem:** Objects will still capture clicks and block drag selections
- **Solution:** Use `selectable: false` and provide "unlock all" feature

### ❌ DO NOT forget to update REFERENCE folders
- **Problem:** Next deployment will overwrite your changes
- **Solution:** Always update REFERENCE APPS and REFERENCE TRANSLATIONS folders (Steps 6-7)

### ❌ DO NOT leave lock icon update code in handleObjectSelection
- **Problem:** Since locked objects can't be selected, this code is unnecessary and may cause confusion
- **Solution:** Remove any lock icon update code from handleObjectSelection

### ❌ DO NOT skip translation file deployment
- **Problem:** Users will see wrong language translations or no translations
- **Solution:** Always deploy both HTML and translation files (Steps 3-4)

---

## File Locations Reference

### Worksheet Generator Apps
- **Source:** `C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\[app-name].html`
- **Production:** `/opt/lessoncraftstudio/frontend/public/worksheet-generators/[app-name].html`
- **Standalone:** `/opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[app-name].html`

### Translation Files
- **Source:** `C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-[app-name]-complete.js`
- **Production:** `/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-[app-name]-complete.js`
- **Standalone:** `/opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/js/translations-[app-name]-complete.js`

---

## Verification Commands

### Check lock button is deployed correctly (Basic Feature):
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "grep -n 'toolbarLockBtn' /opt/lessoncraftstudio/frontend/public/worksheet-generators/[app-name].html | head -5"
```

### Check unlock all button is deployed correctly (Enhanced Feature - Step 7):
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "grep -n 'unlockAllBtn' /opt/lessoncraftstudio/frontend/public/worksheet-generators/[app-name].html | head -5"
```

### Check lockUnlock translations are deployed correctly:
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "grep 'lockUnlock' /opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-[app-name]-complete.js | head -11"
```

### Check unlockAll translations are deployed correctly (Step 7):
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "grep 'unlockAll' /opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-[app-name]-complete.js | head -11"
```

### Check unlockAllObjects function exists (Step 7):
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "grep -n 'function unlockAllObjects' /opt/lessoncraftstudio/frontend/public/worksheet-generators/[app-name].html"
```

### Check updateUnlockAllButtonVisibility function exists (Step 7):
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "grep -n 'function updateUnlockAllButtonVisibility' /opt/lessoncraftstudio/frontend/public/worksheet-generators/[app-name].html"
```

### Check PM2 is running:
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "pm2 logs lessoncraftstudio --lines 10 --nostream"
```

---

## Summary

### Basic Lock Implementation (Steps 1-6)
The basic lock/unlock tool implementation consists of:
1. **HTML:** One button in contextual toolbar
2. **JavaScript:** Variable declaration, event listener, and toggleLockSelectedObjects function
3. **Translations:** 11 language entries for "lockUnlock" added manually to translation file
4. **No CSS changes required**

**Total lines of code added:** ~90 lines (75 in toggleLockSelectedObjects function + setup code)

**Key Innovation:** Using `evented: false` on locked objects allows drag-selection to work through them, solving the mouse selection blocking issue.

### Enhanced Implementation with Unlock All Button (Step 7 - RECOMMENDED)
The enhanced implementation adds:
1. **CSS:** Unlock all button styling with orange background for visibility (~60 lines)
2. **HTML:** Permanent unlock all button in header toolbar
3. **JavaScript:** unlockAllObjects() and updateUnlockAllButtonVisibility() functions (~45 lines)
4. **Translations:** 11 language entries for "unlockAll" added manually to translation file
5. **Integration:** Two calls to updateUnlockAllButtonVisibility() in toggleLockSelectedObjects

**Additional lines of code:** ~120 lines (CSS + HTML + JavaScript)

**Solves The Catch-22:** Locked objects can't be selected (they have `selectable: false`), so they can't be unlocked via the contextual toolbar. The permanent "Unlock All" button in the header toolbar solves this UX problem.

**User Experience:** Fully intuitive lock/unlock workflow with visual feedback (orange button) when locked objects exist and one-click unlock capability.

---

**End of Document**
