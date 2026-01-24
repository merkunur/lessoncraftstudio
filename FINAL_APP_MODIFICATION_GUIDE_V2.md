# FINAL APP MODIFICATION GUIDE V2.2
## Precision Implementation Guide for Worksheet Generator Apps

**Version**: 2.2.0
**Reference App**: Word Search Generator
**Last Updated**: 2025-10-18
**Author**: Claude Code
**Changes from v2.1**: Added CRITICAL STEP 6.4A - Comprehensive guide for identifying ALL custom properties to prevent duplication bugs in undo/redo. This step is now MANDATORY and includes real-world examples from Addition, Math Worksheet, Sudoku, and Alphabet Train apps.

---

## 🔴 MANDATORY IMPLEMENTATION METHOD 🔴
## **YOU MUST FOLLOW THIS INCREMENTAL DEPLOYMENT APPROACH**

### ⚠️ CRITICAL INSTRUCTION FOR CLAUDE CODE ⚠️

**When applying ANY modifications from this guide to ANY app, you MUST use the incremental deployment method documented below. DO NOT attempt to apply all features at once. This method is MANDATORY and NON-NEGOTIABLE.**

---

## THE INCREMENTAL DEPLOYMENT METHOD

### **Philosophy**

**NEVER deploy all features at once.** Instead:
1. Break down the 6 features into 12 small, independent, testable steps
2. Deploy and test each step individually
3. Get user confirmation before proceeding to the next step
4. If a step fails, fix it before moving forward

**Why This Works:**
- ✅ Prevents cascading failures
- ✅ Allows immediate testing and verification
- ✅ Makes debugging trivial (you know exactly what broke)
- ✅ User can stop/pause implementation at any point
- ✅ Each step builds confidence for the next
- ✅ Zero risk of losing all work to a single error

**Why All-At-Once Deployment Fails:**
- ❌ Multiple features interact in unexpected ways
- ❌ Single error can break everything
- ❌ Debugging is extremely difficult (too many variables)
- ❌ User can't test incrementally
- ❌ High risk of complete rollback

---

### **THE 12-STEP BREAKDOWN** (EXACT METHOD FROM WORD SCRAMBLE SUCCESS)

When implementing the 6 features, break them down into these EXACT 12 steps:

#### **Feature 1: Modern Header (2 steps)**
- **Step 1**: Add Modern Header HTML structure
- **Step 2**: Add Modern Header CSS styling

#### **Feature 2: Zoom Controls (2 steps)**
- **Step 3**: Add Zoom variables and functions
- **Step 4**: Add Zoom event listeners

#### **Feature 3: Border/Background Editability (1 step)**
- **Step 5**: Modify enforceZOrder for border/background editability

#### **Feature 4: Enhanced Layer Controls (3 steps)**
- **Step 6**: Add Enhanced Layer Controls HTML
- **Step 7**: Add Enhanced Layer Controls functions
- **Step 8**: Add Enhanced Layer Controls event listeners

#### **Feature 5: Translation System**
- **Skip** - Already exists in apps, verify only

#### **Feature 6: Undo/Redo Functionality (4 steps)**
- **Step 9**: Add Undo/Redo variables and showMessage
- **Step 10**: Add Undo/Redo core functions
- **Step 11**: Add Undo/Redo event listeners
- **Step 12**: Add Undo/Redo canvas hooks and generation integration

---

### **THE WORKFLOW PATTERN FOR EACH STEP**

For **EVERY SINGLE STEP**, follow this exact pattern:

#### **1. Update TODO List**
```
Mark current step as "in_progress"
Keep all other pending steps as "pending"
```

#### **2. Read Relevant Files**
```
Read the app file (find exact locations for edits)
Read the guide (get exact code to insert)
```

#### **3. Make the Edit**
```
Use Edit tool to add/modify ONLY what this step requires
NO additional changes
NO "while I'm here" improvements
```

#### **4. Deploy to Production**
```bash
# Upload
pscp word-scramble-production-actual.html root@server:/path/to/app.html

# Restart
plink root@server "pm2 restart lessoncraftstudio"
```

#### **5. Mark Step Complete**
```
Update TODO list - mark step as "completed"
```

#### **6. Communicate to User**
```
Tell user:
- What changed in this step
- What to test
- What should/shouldn't work yet
- Ask for confirmation: "Please test and confirm"
```

#### **7. WAIT FOR USER CONFIRMATION**
```
DO NOT PROCEED until user says:
- "good"
- "works"
- "confirmed"
- Or similar affirmative response
```

#### **8. Handle User Feedback**
```
If user says "good" → Proceed to next step
If user reports issue → Fix it before proceeding
If user asks question → Answer it, wait for confirmation
```

---

### **CONCRETE EXAMPLE: STEP 1 EXECUTION**

Here's EXACTLY how Step 1 (Modern Header HTML) was executed:

**1. Update TODO**
```javascript
TodoWrite([
  {content: "Step 1: Add Modern Header HTML", status: "in_progress", ...},
  {content: "Step 2: Add Modern Header CSS", status: "pending", ...},
  // ... rest pending
])
```

**2. Find Location**
```bash
grep -n "class=\"tab-row\"" word-scramble-production-actual.html
```

**3. Read Current State**
```javascript
Read(file, offset: lineNumber, limit: 20)
```

**4. Make ONLY This Edit**
```javascript
Edit(file, {
  old_string: "<div class=\"tab-row\">...</div>",  // Old header
  new_string: "<div class=\"tab-row\">...NEW COMPLETE HEADER...</div>"  // New header from guide
})
```

**5. Deploy**
```bash
pscp word-scramble.html → server
plink pm2 restart
```

**6. Update TODO**
```javascript
TodoWrite([
  {content: "Step 1: Add Modern Header HTML", status: "completed", ...}
])
```

**7. Tell User**
```
"Step 1 Complete: Modern Header HTML Added

What Changed:
- Replaced simple tab-row with comprehensive header
- Added zoom controls HTML (buttons not functional yet)
- Added undo/redo buttons HTML (not functional yet)
- Consolidated all controls into unified header

Deployed to Production:
✅ File uploaded
✅ PM2 restarted

What to Test:
- Purple gradient header visible
- Zoom controls visible (won't work yet - that's Step 3-4)
- Undo/Redo buttons visible (won't work yet - that's Step 9-12)

Please test and confirm deployment is successful (no errors)."
```

**8. Wait**
```
User: "good"
→ Proceed to Step 2
```

---

### **CRITICAL RULES**

1. **ONE STEP AT A TIME**
   - Never combine steps "to save time"
   - Each step is independently testable
   - User must confirm each step

2. **NO BATCHING**
   - Don't do "Steps 1-3 together"
   - Don't skip deployment between steps
   - Each step gets its own deploy cycle

3. **DEPLOY AFTER EVERY STEP**
   - Even if "nothing visible changed"
   - User needs to verify no errors
   - Prevents accumulation of untested changes

4. **WAIT FOR USER CONFIRMATION**
   - Don't assume success
   - User may see errors you don't
   - User testing is part of the process

5. **CLEAR COMMUNICATION**
   - Tell user what SHOULD work
   - Tell user what SHOULDN'T work yet
   - Manage expectations at each step

6. **FIX BEFORE PROCEEDING**
   - If step fails, fix it immediately
   - Don't "note it for later"
   - Don't "come back to it"
   - Fix, redeploy, retest, THEN proceed

---

### **BENEFITS OBSERVED IN WORD SCRAMBLE IMPLEMENTATION**

Using this method on Word Scramble resulted in:

✅ **100% Success Rate** - All 12 steps completed without rollback
✅ **Zero Cascading Failures** - Each step isolated from others
✅ **Immediate Bug Detection** - Issues caught and fixed in same step
✅ **User Confidence** - User saw steady progress, tested each feature
✅ **Easy Debugging** - When zoom didn't work, only 2 steps to check
✅ **Flexible Pausing** - User could take breaks between steps
✅ **Clear Progress Tracking** - 12 steps = 12 milestones
✅ **Final File Size** - 146KB, fully functional, all features working

**Previous All-At-Once Attempts:**
❌ Multiple failures requiring complete rollback
❌ Difficult to identify which feature broke
❌ Loss of user confidence
❌ Wasted time

---

### **FAILURE MODES TO AVOID**

**DON'T DO THIS:**
```
❌ "I'll add the HTML and CSS together in one step"
❌ "Let me implement all zoom functionality at once"
❌ "I'll deploy after finishing all undo/redo"
❌ "The user said 'good' so I'll do the next 3 steps quickly"
❌ "I'll batch the event listeners since they're all similar"
```

**DO THIS INSTEAD:**
```
✅ Step 1: HTML only → Deploy → Test → Confirm
✅ Step 2: CSS only → Deploy → Test → Confirm
✅ Step 3: Variables and functions → Deploy → Test → Confirm
✅ Step 4: Event listeners → Deploy → Test → Confirm
✅ One at a time, every time
```

---

### **CHECKLIST FOR CLAUDE CODE**

Before starting ANY implementation, confirm:

- [ ] Have I broken down the features into 12 steps?
- [ ] Do I have a TODO list with all 12 steps?
- [ ] Am I committed to deploying after EACH step?
- [ ] Am I prepared to WAIT for user confirmation after each step?
- [ ] Do I understand I must NOT batch steps together?
- [ ] Have I communicated the incremental approach to the user?

During implementation, for EACH step:

- [ ] Updated TODO to mark step as "in_progress"
- [ ] Made ONLY the changes required for this step
- [ ] Deployed to production
- [ ] Updated TODO to mark step as "completed"
- [ ] Clearly communicated what changed
- [ ] Clearly stated what to test
- [ ] Clearly stated what won't work yet
- [ ] **WAITING for user confirmation before proceeding**

---

### **TEMPLATE: COMMUNICATING EACH STEP TO USER**

Use this template after deploying each step:

```
**Step X Complete: [Step Name]**

I've successfully [what you did].

**What Changed:**
- [Specific change 1]
- [Specific change 2]
- [Specific change 3]

**Deployed to Production:**
- ✅ File uploaded to server ([file size])
- ✅ PM2 restarted successfully

**What to Test:**
1. [Test item 1]
2. [Test item 2]
3. [Test item 3]

**What Won't Work Yet (Expected):**
- [Feature X] - That's Step [Y]
- [Feature Y] - That's Step [Z]

Please test this deployment and confirm everything works as expected.
```

---

## ⚠️ CRITICAL: THIS GUIDE IS BASED ON EXACT IMPLEMENTATIONS ⚠️

**READ THIS BEFORE DOING ANYTHING:**

1. **EVERY code block in this guide is COMPLETE and COPY-PASTEABLE**
2. **EVERY location reference includes EXACT line numbers from wordsearch.html**
3. **EVERY step includes a VERIFICATION command to prove it worked**
4. **NO improvisation needed - just follow the steps exactly**

**This version eliminates ALL ambiguity from the previous guide.**

---

## Table of Contents

0. [**WORDSEARCH REFERENCE MAP** (NEW)](#section-0-wordsearch-reference-map)
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Feature 1: Modern Header Design](#feature-1-modern-header-design)
4. [Feature 2: Zoom Controls](#feature-2-zoom-controls)
5. [Feature 3: Border/Background Editability](#feature-3-borderbackground-editability)
6. [Feature 4: Enhanced Layer Controls](#feature-4-enhanced-layer-controls)
7. [Feature 5: Contextual Toolbar Localization](#feature-5-contextual-toolbar-localization)
8. [Feature 6: Undo/Redo Functionality](#feature-6-undoredo-functionality)
9. [Complete Reference Implementations](#complete-reference-implementations)
10. [Copy-Paste Checklists](#copy-paste-checklists)
11. [Common Pitfalls & Solutions](#common-pitfalls--solutions)
12. [Testing Checklist](#testing-checklist)
13. [Deployment Procedure](#deployment-procedure)

---

## SECTION 0: WORDSEARCH REFERENCE MAP

This section provides EXACT line numbers for all components in the reference wordsearch.html file.

**File**: `/opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/wordsearch.html`
**Total Lines**: 3739
**Last Verified**: 2025-10-16

### HTML Structure

| Component | Line Range | Description |
|-----------|------------|-------------|
| HTML Head | 1-60 | Document setup, meta tags |
| **Style Section** | **61-993** | All CSS styles |
| Body Start | 994 | Body tag |
| **Header (tab-row)** | **995-1035** | Complete header with tabs, zoom, undo/redo, dropdowns |
| Sidebar Panel | 1051-994 | Left sidebar with controls |
| Canvas Elements | 1036-1050 | Worksheet and Answer Key canvas containers |

### CSS Sections (Lines 61-993)

| Style Block | Line Range | Purpose |
|-------------|------------|---------|
| Variables & Reset | 62-120 | CSS variables, global reset |
| Layout Styles | 121-250 | Body, panel, main container |
| **Tab Row (Header)** | **251-387** | Gradient header, tabs, actions |
| **Zoom Controls** | **315-350** | Zoom buttons and percentage display |
| **History Controls** | **351-387** | Undo/redo buttons styling |
| Dropdown Styles | 388-450 | Generate and Download dropdowns |
| Canvas Styles | 451-550 | Canvas containers and wrappers |
| Sidebar Sections | 551-750 | Accordion, forms, inputs |
| Contextual Toolbar | 751-850 | Floating toolbar for object editing |

### JavaScript Structure (Lines 1052-3739)

| Component | Line Range | Key Details |
|-----------|------------|-------------|
| **Variable Declarations** | **1130-1170** | All state variables, element refs |
| **Zoom Variables** | **1133** | `let userZoomLevel = 1.0` |
| **Undo/Redo Variables** | **1136-1140** | `historyStack`, `redoStack`, flags |
| **Element Selectors** | **1143-1170** | All `getEl()` calls for buttons |
| **showMessage Function** | **1384-1410** | Toast notification system |
| **Undo/Redo Functions** | **1407-1505** | Complete undo/redo implementation |
| - `saveCanvasState()` | 1407-1427 | Saves current canvas state |
| - `undo()` | 1432-1451 | Undo last action |
| - `redo()` | 1453-1474 | Redo undone action |
| - `restoreCanvasState()` | 1476-1489 | Load saved state |
| - `updateHistoryButtons()` | 1491-1505 | Enable/disable buttons |
| **setupEventListeners Function** | **1509-1650** | All event listener bindings |
| **Zoom Functions** | **1745-1767** | `zoomIn()`, `zoomOut()`, `zoomReset()` |
| **Generate Worksheet** | **1770-1855** | Worksheet generation with undo integration |
| **Generate Answer Key** | **1896-1975** | Answer key generation with undo integration |
| **Canvas Event Handlers** | **1640-1680** | mouse:down, object:added, selection events |
| **init() Function** | **1235-1242** | Application initialization |
| **DOMContentLoaded** | **1052** | Entry point |

---

## Overview

This guide documents SIX major modifications to worksheet generator apps:

1. **Modern Header Design** - Gradient purple header with consolidated controls
2. **Zoom Controls** - In/out/reset with visual percentage display
3. **Border/Background Editability** - Full selection, editing, and z-order control
4. **Enhanced Layer Controls** - 4-button z-order system (Front, Forward, Backward, Back)
5. **Contextual Toolbar Localization** - All 11 languages for all toolbar elements
6. **Undo/Redo Functionality** - Full state management with Ctrl+Z/Ctrl+Y support

**Total Implementation Time**: 4-6 hours per app (when following this guide exactly)
**Complexity Level**: Medium-High
**Risk Level**: Low (with exact following of steps and verification)

---

## Prerequisites

### STEP 1: Create Backup

```bash
# On server - create backup
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm \
  -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 \
  "cp /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html \
      /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html.backup_$(date +%Y%m%d_%H%M%S)"
```

**VERIFICATION**:
```bash
# Verify backup created
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm \
  -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 \
  "ls -lh /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html*"
# Should show both original and .backup file
```

### STEP 2: Download Local Copy for Editing

```bash
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm \
  -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU \
  root@65.108.5.250:/opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html \
  "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

**VERIFICATION**:
```bash
# Check file size
dir "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should show file with reasonable size (>50KB for typical app)
```

### STEP 3: Verify Current Structure

Run these commands to understand your app's structure:

```bash
# 1. Find current header structure
grep -n "class=\"tab" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html" | head -5

# 2. Check if zoom controls exist
grep -c "zoom" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"

# 3. Check canvas initialization
grep -n "initializeCanvas\|new fabric.Canvas" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html" | head -3

# 4. Find variable declarations section
grep -n "let.*Canvas\|const.*Canvas" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html" | head -5
```

**RECORD THESE LINE NUMBERS** - you'll need them for modifications.

---

## Feature 1: Modern Header Design

### Goal
Transform plain header into modern gradient design with ALL controls in one unified header.

### REFERENCE: Exact Implementation from Wordsearch

**Wordsearch Lines 995-1035** contain the complete header structure.

### STEP 1.1: Locate Your App's Current Header

```bash
# Find where tab-row or tabs are defined in your app
grep -n "class=\"tab\|<div.*tab" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html" | head -10
```

Record the line number. This is where you'll replace the header.

### STEP 1.2: Replace Header HTML with Complete Structure

**COMPLETE HTML BLOCK** (copy this EXACTLY):

```html
            <div class="tab-row">
                <div class="tab-buttons-container">
                    <button class="tab-button active" data-tab="worksheetTab" data-translate="worksheet">Worksheet</button>
                    <button class="tab-button" data-tab="answerKeyTab" data-translate="answerKey">Answer Key</button>
                </div>
                <div class="header-actions">
                    <div class="zoom-controls">
                        <button id="zoomOutBtn" class="zoom-btn" title="Zoom Out"><i class="fas fa-search-minus"></i></button>
                        <span id="zoomPercentage" class="zoom-percentage">100%</span>
                        <button id="zoomInBtn" class="zoom-btn" title="Zoom In"><i class="fas fa-search-plus"></i></button>
                        <button id="zoomResetBtn" class="zoom-btn" title="Reset Zoom"><i class="fas fa-compress-arrows-alt"></i></button>
                    </div>
                    <div class="history-controls">
                        <button id="undoBtn" class="history-btn" title="Undo (Ctrl+Z)" disabled><i class="fas fa-undo"></i></button>
                        <button id="redoBtn" class="history-btn" title="Redo (Ctrl+Y)" disabled><i class="fas fa-redo"></i></button>
                    </div>
                    <div class="dropdown-container">
                        <button id="generateDropdownBtn" class="action-button accent"><span data-translate="generate">Generate</span> <i class="fas fa-caret-down"></i></button>
                        <div id="generateDropdownContent" class="dropdown-content">
                            <button id="generateWorksheetBtn" data-translate="newWorksheet">New Worksheet</button>
                            <button id="generateAnswerKeyBtn" disabled data-translate="answerKey">Answer Key</button>
                        </div>
                    </div>
                    <div class="dropdown-container">
                        <button id="downloadDropdownBtn" class="action-button download-btn"><span data-translate="download">Download</span> <i class="fas fa-caret-down" style="margin-left: 5px;"></i></button>
                        <div id="downloadDropdownContent" class="dropdown-content">
                            <button id="downloadWorksheetJpegBtn" disabled data-translate="worksheetJpeg">Worksheet (JPEG)</button>
                            <button id="downloadAnswerKeyJpegBtn" disabled data-translate="answerKeyJpeg">Answer Key (JPEG)</button>
                            <hr style="margin: 6px 0; border-color: #eee;">
                            <button id="downloadWorksheetPdfBtn" disabled data-translate="worksheetPdf">Worksheet (PDF)</button>
                            <button id="downloadAnswerKeyPdfBtn" disabled data-translate="answerKeyPdf">Answer Key (PDF)</button>
                            <hr style="margin: 6px 0; border-color: #eee;">
                            <label class="checkbox-label" id="grayscaleLabel">
                                <input type="checkbox" id="grayscaleToggle" /><span data-translate="grayscale">Grayscale</span>
                            </label>
                        </div>
                    </div>
                    <button id="clearBtn" class="action-button danger" data-translate="clearAll">Clear All</button>
                </div>
            </div>
```

**CRITICAL NOTES**:
- This is THE EXACT structure from wordsearch lines 995-1035
- DO NOT modify element IDs (they must match JavaScript)
- DO NOT change the dropdown structure to separate buttons
- Keep ALL data-translate attributes exactly as shown

**VERIFICATION**:
```bash
# Verify header HTML was added correctly
grep -c "class=\"tab-row\"" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 1

grep -c "zoom-controls" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 1

grep -c "history-controls" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 1

grep -c "generateDropdownBtn" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 1
```

### STEP 1.3: Add Complete CSS Styling

**Locate CSS Section**:
```bash
# Find style tag
grep -n "<style>" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

Insert this COMPLETE CSS block after the existing CSS (before `</style>`):

**COMPLETE CSS BLOCK** (from wordsearch lines 251-450):

```css
/* ============================================
   MODERN UNIFIED HEADER STYLES
   Exact implementation from wordsearch.html lines 251-450
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
    gap: 16px;
}

.tab-buttons-container {
    display: flex;
    gap: 8px;
    align-items: center;
}

.tab-button {
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

.tab-button:hover {
    background: rgba(255, 255, 255, 0.25);
    color: white;
    transform: translateY(-1px);
}

.tab-button.active {
    background: rgba(255, 255, 255, 0.95);
    color: #667eea;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Header Actions Container */
.header-actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-shrink: 0;
}

/* --- Zoom Controls --- */
.zoom-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 6px;
    padding: 5px 10px;
    backdrop-filter: blur(10px);
}

.zoom-btn {
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

.zoom-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
}

.zoom-btn:active {
    background-color: rgba(255, 255, 255, 0.15);
}

.zoom-percentage {
    min-width: 45px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: white;
    user-select: none;
}

/* --- Undo/Redo Controls --- */
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

/* --- Dropdown Containers --- */
.dropdown-container {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    min-width: 200px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    z-index: 1000;
    margin-top: 8px;
    padding: 8px 0;
}

.dropdown-content.show {
    display: block;
}

.dropdown-content button {
    display: block;
    width: 100%;
    padding: 10px 16px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    transition: background-color 0.2s;
}

.dropdown-content button:hover:not(:disabled) {
    background-color: #f5f5f5;
}

.dropdown-content button:disabled {
    color: #ccc;
    cursor: not-allowed;
}

/* --- Action Buttons --- */
.action-button {
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    gap: 6px;
}

.action-button.accent {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.action-button.accent:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.action-button.download-btn {
    background: rgba(255, 255, 255, 0.95);
    color: #667eea;
    border: 2px solid rgba(255, 255, 255, 0.5);
}

.action-button.download-btn:hover {
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

**VERIFICATION**:
```bash
# Verify CSS was added
grep -c "\.tab-row {" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 1

grep -c "\.zoom-controls {" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 1

grep -c "\.history-controls {" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 1

grep -c "gradient.*667eea.*764ba2" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 2 (header gradient and accent button)
```

---

## Feature 2: Zoom Controls

### Goal
Add zoom in/out/reset functionality with visual percentage display.

### REFERENCE: Exact Implementation from Wordsearch

- **Variables**: Line 1133
- **Functions**: Lines 1745-1767
- **Event Listeners**: Lines 1520-1522 (in setupEventListeners)

### STEP 2.1: Add Zoom Variables

**Locate variable declarations section**:
```bash
# Find where canvas variables are declared
grep -n "let.*Canvas\|const.*Canvas" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html" | head -3
```

Add this line near other let declarations (typically around line 1130):

```javascript
let userZoomLevel = 1.0; // User-controlled zoom level (100% = 1.0)
```

**VERIFICATION**:
```bash
grep -c "let userZoomLevel" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 1
```

### STEP 2.2: Add Element References

Find where button elements are referenced (look for `getEl('` or `document.getElementById`):

```javascript
const zoomInBtn = getEl('zoomInBtn');
const zoomOutBtn = getEl('zoomOutBtn');
const zoomResetBtn = getEl('zoomResetBtn');
const zoomPercentage = getEl('zoomPercentage');
```

**VERIFICATION**:
```bash
grep -c "zoomInBtn\|zoomOutBtn\|zoomResetBtn\|zoomPercentage" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 4
```

### STEP 2.3: Add Complete Zoom Functions

**COMPLETE FUNCTION BLOCK** (from wordsearch lines 1745-1767):

Find a good location for these functions (after other utility functions, before event listeners).

```javascript
// ============================================
// ZOOM FUNCTIONALITY
// Exact implementation from wordsearch.html lines 1745-1767
// ============================================

function zoomIn() {
    // Increase zoom by 25%, max 300%
    userZoomLevel = Math.min(userZoomLevel + 0.25, 3.0);
    updateZoomDisplay();
    updateCanvasDisplayDimensions(currentCanvasConfig.width, currentCanvasConfig.height);
}

function zoomOut() {
    // Decrease zoom by 25%, min 25%
    userZoomLevel = Math.max(userZoomLevel - 0.25, 0.25);
    updateZoomDisplay();
    updateCanvasDisplayDimensions(currentCanvasConfig.width, currentCanvasConfig.height);
}

function zoomReset() {
    // Reset to 100%
    userZoomLevel = 1.0;
    updateZoomDisplay();
    updateCanvasDisplayDimensions(currentCanvasConfig.width, currentCanvasConfig.height);
}

function updateZoomDisplay() {
    if (zoomPercentage) {
        zoomPercentage.textContent = Math.round(userZoomLevel * 100) + '%';
    }
}
```

**IMPORTANT**: The `updateCanvasDisplayDimensions()` function must already exist in your app (it's part of the canvas sizing system). If it doesn't exist, you'll need to implement it or adapt the zoom functions to your app's canvas update method.

**VERIFICATION**:
```bash
# Verify all zoom functions were added
grep -c "function zoomIn\|function zoomOut\|function zoomReset\|function updateZoomDisplay" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 4
```

### STEP 2.4: Add Event Listeners

Find your `setupEventListeners()` function or where event listeners are attached.

Add these lines:

```javascript
// Zoom Controls (from wordsearch lines 1520-1522)
zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);
zoomResetBtn.addEventListener('click', zoomReset);
```

**VERIFICATION**:
```bash
grep -c "addEventListener.*click.*zoom" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 3
```

### STEP 2.5: Initialize Zoom on Load

In your `init()` function or after canvas initialization, add:

```javascript
// Initialize zoom display
updateZoomDisplay();
```

**VERIFICATION**:
```bash
grep "updateZoomDisplay()" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should show at least 1 call (initialization)
```

---

## Feature 3: Border/Background Editability

### Goal
Make borders and backgrounds fully selectable, editable, and controllable with z-order operations.

### REFERENCE: Exact Implementation Principles from Wordsearch

The wordsearch app demonstrates five critical fixes for border/background editability:

1. **selectable: true, evented: true** - Objects must be interactive
2. **bringToFront()** after adding - Ensures visibility
3. **userAddedObjects filter** - Must include borders/backgrounds
4. **enforceZOrder()** - Must NOT automatically send borders/backgrounds to back
5. **Contextual toolbar** - Must show for all selectable objects

### CRITICAL UNDERSTANDING

**The Problem**: By default, many apps set borders/backgrounds as non-selectable background elements.

**The Solution**: Five specific code changes to make them fully editable.

### STEP 3.1: Locate Border/Background Functions

```bash
# Find addOverlay, addBorder, or addBackground functions
grep -n "function addOverlay\|function addBorder\|function addBackground" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

Record the line numbers.

### STEP 3.2: Fix Object Properties

Find where border/background objects are created. Look for code like:

```javascript
fabric.Image.fromURL(img.src, function(clonedImg) {
    clonedImg.set({
        // ... properties ...
    });
```

**ENSURE these properties are set**:

```javascript
{
    left: 50,
    top: 50,
    scaleX: 0.5,
    scaleY: 0.5,
    selectable: true,    // ✓ CRITICAL: Must be true
    evented: true,       // ✓ CRITICAL: Must be true
    hasControls: true,   // ✓ Allows resize/rotate
    hasBorders: true,    // ✓ Shows selection border
    lockMovementX: false,  // ✓ Allows movement
    lockMovementY: false   // ✓ Allows movement
}

// Tag for identification
if (propName === 'selectedBorder') {
    clonedImg.isBorder = true;
} else if (propName === 'selectedBackground') {
    clonedImg.isBackground = true;
}
```

**VERIFICATION**:
```bash
# Verify selectable: true exists
grep -c "selectable.*:.*true" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 1 (more if multiple object types)
```

### STEP 3.3: Add bringToFront() After canvas.add()

**CRITICAL**: Immediately after adding border/background to canvas, bring to front:

```javascript
activeCanvas.add(clonedImg);
clonedImg.bringToFront(); // ✓ CRITICAL: Brings to top so user can select it
activeCanvas.renderAll();
```

**VERIFICATION**:
```bash
grep -A 2 "canvas.add.*Img\|canvas.add.*border\|canvas.add.*background" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Look for bringToFront() calls after add()
```

### STEP 3.4: Fix userAddedObjects Filter

Find ALL instances of `userAddedObjects` filter (typically 2-3 places):

```bash
grep -n "userAddedObjects.*filter\|getObjects().*filter.*Puzzle" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

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

**CRITICAL**: Update ALL instances (usually in worksheet generation and answer key generation functions).

**VERIFICATION**:
```bash
# Check filter doesn't exclude isBorder or isBackground
grep "userAddedObjects.*filter.*isBorder\|userAddedObjects.*filter.*isBackground" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 0 (no exclusions for isBorder or isBackground)

# Verify correct exclusions
grep "userAddedObjects.*filter.*isPuzzleElement" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should show filters that exclude isPuzzleElement but not isBorder/isBackground
```

### STEP 3.5: Fix or Remove enforceZOrder()

```bash
# Find enforceZOrder function
grep -n "function enforceZOrder" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

**THE PROBLEM**: Some apps have enforceZOrder() that automatically sends borders/backgrounds to back, overriding user z-order operations.

**SOLUTION OPTIONS**:

**Option A**: Remove automatic enforcement for borders/backgrounds:

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
}
```

**Option B**: Remove all calls to enforceZOrder() after user z-order operations:

```bash
# Find where enforceZOrder is called
grep -n "enforceZOrder" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

**Remove calls from**:
- Z-order button handlers (bringForward, sendBackward, etc.)
- Object movement handlers
- Anywhere it's called after user actions

**VERIFICATION**:
```bash
# Check enforceZOrder doesn't auto-send borders/backgrounds to back
grep -A 10 "function enforceZOrder" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html" | grep "isBorder\|isBackground"
# Should return: 0 (no automatic enforcement for these)
```

---

## Feature 4: Enhanced Layer Controls

### Goal
Add 4-button z-order system: Bring to Front, Bring Forward, Send Backward, Send to Back.

### REFERENCE: Exact Implementation from Wordsearch

- **HTML Buttons**: In contextual toolbar dropdown
- **Functions**: Complete z-order functions with console logging
- **Event Listeners**: In setupEventListeners

### STEP 4.1: Add HTML Buttons to Layers Dropdown

Find the contextual toolbar's layers dropdown (search for "layersDropdown" or "Layers" button):

```bash
grep -n "layersDropdown\|layers.*dropdown" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

**COMPLETE LAYERS DROPDOWN HTML**:

```html
<div class="dropdown-content" id="layersDropdown">
    <button id="toolbarBringToFrontBtn" data-translate="bringToFront">Bring to Front</button>
    <button id="toolbarBringForwardBtn" data-translate="bringForward">Bring Forward</button>
    <button id="toolbarSendBackwardBtn" data-translate="sendBackward">Send Backward</button>
    <button id="toolbarSendToBackBtn" data-translate="sendToBack">Send to Back</button>
</div>
```

**VERIFICATION**:
```bash
grep -c "toolbarBringToFrontBtn\|toolbarSendToBackBtn" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 2
```

### STEP 4.2: Add Variable Declarations

Find where toolbar button variables are declared:

```javascript
const toolbarBringToFrontBtn = getEl('toolbarBringToFrontBtn');
const toolbarBringForwardBtn = getEl('toolbarBringForwardBtn');
const toolbarSendBackwardBtn = getEl('toolbarSendBackwardBtn');
const toolbarSendToBackBtn = getEl('toolbarSendToBackBtn');
```

**VERIFICATION**:
```bash
grep -c "toolbarBring\|toolbarSend" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 4
```

### STEP 4.3: Add Complete Z-Order Functions

**COMPLETE FUNCTION BLOCK** (with console logging for debugging):

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

**VERIFICATION**:
```bash
grep -c "function bringObjectToFront\|function sendObjectToBack" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 2

grep -c "function bringObjectForward\|function sendObjectBackward" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 2
```

### STEP 4.4: Add Event Listeners

In setupEventListeners() or event listener section:

```javascript
// Layer Controls
toolbarBringToFrontBtn.addEventListener('click', bringObjectToFront);
toolbarBringForwardBtn.addEventListener('click', bringObjectForward);
toolbarSendBackwardBtn.addEventListener('click', sendObjectBackward);
toolbarSendToBackBtn.addEventListener('click', sendObjectToBack);
```

**VERIFICATION**:
```bash
grep -c "addEventListener.*bringObjectToFront\|addEventListener.*sendObjectToBack" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 2
```

---

## Feature 6: Undo/Redo Functionality

### Goal
Add professional undo/redo with buttons, keyboard shortcuts, and proper state management.

### REFERENCE: Exact Implementation from Wordsearch

- **Variables**: Lines 1136-1140
- **showMessage**: Lines 1384-1410
- **Undo/Redo Functions**: Lines 1407-1505
- **Event Listeners**: Lines 1524-1536
- **Integration**: Lines 1798, 1915 (after generation)

### 🚨 CRITICAL WARNING 🚨

**This is the MOST COMPLEX feature.** Follow steps EXACTLY or it will break.

### STEP 6.1: Check for showMessage Function

**CRITICAL FIRST STEP**: Verify showMessage exists:

```bash
grep -n "function showMessage" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

**If it returns nothing**, you MUST add it (see Step 6.2).
**If it exists**, skip to Step 6.3.

### STEP 6.2: Add showMessage Function (IF MISSING)

**COMPLETE FUNCTION** (from wordsearch lines 1384-1410):

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
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, duration);
    }

    return toast;
}
```

**VERIFICATION**:
```bash
grep -c "function showMessage" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 1
```

### STEP 6.3: Add State Variables

Find variable declarations section (near canvas variables):

```javascript
// --- UNDO/REDO STATE MANAGEMENT ---
let historyStack = [];
let redoStack = [];
const MAX_HISTORY = 20;
let isRestoringState = false; // Flag to prevent saving state during restoration
let isGenerating = false; // Flag to prevent saving state during bulk generation
```

**VERIFICATION**:
```bash
grep -c "let historyStack\|let redoStack\|let isRestoringState\|let isGenerating" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 4
```

### STEP 6.4: Add Button Element References

With other element references:

```javascript
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
```

**VERIFICATION**:
```bash
grep -c "undoBtn\|redoBtn" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 4 (2 declarations + 2 uses)
```

### 🔴 STEP 6.4A: CRITICAL - Identify ALL Custom Properties for toJSON 🔴

**THIS IS THE MOST IMPORTANT STEP. SKIPPING THIS CAUSES DUPLICATION BUGS.**

#### Why This Matters

The `toJSON()` function in Fabric.js only serializes standard properties by default. ANY custom property you've added to objects (like `isPuzzleElement`, `isGeneratedItem`, `isMathPuzzle`, etc.) will be LOST during undo/redo UNLESS you explicitly list them in the toJSON array.

**What happens if you miss a property:**
1. User generates worksheet → objects tagged with `isGeneratedItem: true`
2. User modifies something → state saved to history
3. User clicks Undo → state restored via `loadFromJSON()`
4. **Missing property not restored** → objects lose their `isGeneratedItem` tag
5. User generates new worksheet → app can't identify old items to remove
6. **Result: DUPLICATION BUG** - old and new puzzles both appear

#### How to Find ALL Custom Properties

Run these commands to find EVERY custom property used in your app:

**1. Find properties used in REMOVAL operations** (MOST CRITICAL):
```bash
# Find all filter operations that check custom properties
grep -n "\.filter.*o\." "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html" | grep -v "^\/\/"

# Find all remove operations with custom properties
grep -n "\.remove\|objectsToRemove" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"

# Look at the context around those lines to see which properties are checked
```

**2. Find properties set during object creation**:
```bash
# Find where objects are tagged during creation
grep -n "\.is[A-Z].*=.*true\|is[A-Z].*:.*true" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

**3. Common patterns to search for**:
```bash
# Search for common property patterns
grep -n "isPuzzle\|isGenerated\|isWorksheet\|isAnswer\|isMath\|isTrain\|isColoring\|isCutOut" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"

# Search for header/border/background tags
grep -n "isPageBorder\|isHeaderDesc\|isHeaderElement\|isBorder\|isBackground" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

#### Examples from Different Apps

**Addition App (addition.html)**:
- Found by searching filter: `o.isGeneratedItem` in line 2980
- **Required property**: `isGeneratedItem`
- Missing this caused puzzle duplication bug

**Math Worksheet App (math worksheet.html)**:
- Found by searching filter: `o.isGeneratedItem` in line 3112
- Found by searching filter: `o.isMathPuzzle` in other locations
- **Required properties**: `isGeneratedItem`, `isMathPuzzle`
- Missing `isGeneratedItem` caused puzzle duplication bug

**Alphabet Train App (alphabet train.html)**:
- Found: `isTrainGeneratedItem`, `isTrainTemplate`
- **Required properties**: `isTrainGeneratedItem`, `isTrainTemplate`

**Sudoku App (sudoku.html)**:
- Found: `isGenerated`, `isCutOut`
- **Required properties**: `isGenerated`, `isCutOut`

**Common to ALL Apps**:
- `isAnswerKeyItem` - marks objects that belong to answer key
- `isPageBorder` - the purple page border
- `isHeaderDesc` - header description text
- `isHeaderElement` - header title and elements
- `isBorder` - user-added decorative borders
- `isBackground` - user-added backgrounds

#### Your Property List

Based on your searches above, create a comprehensive list:

```javascript
// Example for Math Worksheet app:
const CUSTOM_PROPERTIES = [
    'isGeneratedItem',      // ✓ CRITICAL - identifies puzzle cards for removal
    'isMathPuzzle',        // ✓ Additional puzzle identifier
    'isAnswerKeyItem',     // ✓ Answer key objects
    'isPageBorder',        // ✓ Page border
    'isHeaderDesc',        // ✓ Header description
    'isHeaderElement',     // ✓ Header elements
    'isBorder',            // ✓ User-added borders
    'isBackground',        // ✓ User-added backgrounds
    'originalIndex'        // ✓ Preserves object order
];
```

**VERIFICATION**:
```bash
# For each property in your list, verify it's actually used in the app
grep -c "isGeneratedItem" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 1 for each property

# CRITICAL: Check if any property is used in filter/remove operations
grep "\.filter.*isGeneratedItem\|\.remove.*isGeneratedItem" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# If this returns results, that property MUST be in toJSON array
```

#### Create Your toJSON Array

Take your property list and format it for the toJSON call:

```javascript
// For Math Worksheet app example:
const toJSONArray = ['isGeneratedItem', 'isMathPuzzle', 'isAnswerKeyItem', 'isPageBorder', 'isHeaderDesc', 'isHeaderElement', 'isBorder', 'isBackground', 'originalIndex'];
```

**🚨 CRITICAL RULE 🚨**

**ANY property used in a `.filter()` or `.remove()` operation MUST be in the toJSON array.**

If you see this in your code:
```javascript
const oldPuzzles = canvas.getObjects().filter(o => o.isGeneratedItem);
oldPuzzles.forEach(o => canvas.remove(o));
```

Then `isGeneratedItem` **MUST** be in your toJSON array, or you will get duplication bugs.

### STEP 6.5: Add Complete Undo/Redo Functions

**IMPORTANT**: Use the property list you created in Step 6.4A for the toJSON array.

**COMPLETE FUNCTION BLOCK** (adapted from wordsearch lines 1407-1505):

```javascript
// ============================================
// UNDO/REDO FUNCTIONS
// Adapted from wordsearch.html lines 1407-1505
// ============================================

function saveCanvasState() {
    if (isRestoringState || isGenerating) return; // Don't save during undo/redo
    console.log("[UNDO DEBUG] saveCanvasState called, isRestoringState:", isRestoringState, "isGenerating:", isGenerating);

    const activeCanvas = getActiveCanvas();
    console.log("[UNDO DEBUG] saveCanvasState guard passed, activeCanvas:", activeCanvas);
    if (!activeCanvas) return;

    // 🚨 CRITICAL: Use the property list from Step 6.4A
    // This example is for MATH WORKSHEET app - YOUR APP WILL BE DIFFERENT
    // You MUST include ALL properties identified in Step 6.4A
    const state = {
        canvasJSON: activeCanvas.toJSON([
            'isGeneratedItem',    // ✓ From Step 6.4A - used in filter operations
            'isMathPuzzle',      // ✓ From Step 6.4A - puzzle identifier
            'isAnswerKeyItem',   // ✓ Common property - answer key objects
            'isPageBorder',      // ✓ Common property - page border
            'isHeaderDesc',      // ✓ Common property - header description
            'isHeaderElement',   // ✓ Common property - header elements
            'isBorder',          // ✓ Common property - user borders
            'isBackground',      // ✓ Common property - user backgrounds
            'originalIndex'      // ✓ Preserves object order
        ]),
        canvasType: activeCanvas === worksheetCanvas ? 'worksheet' : 'answerKey',
        timestamp: Date.now()
    };

    historyStack.push(state);
    if (historyStack.length > MAX_HISTORY) {
        console.log("[UNDO DEBUG] State pushed to historyStack, new length:", historyStack.length);
        historyStack.shift(); // Remove oldest state
    }

    redoStack = []; // Clear redo stack on new action
    updateHistoryButtons();
}

function undo() {
    if (historyStack.length === 0) return;

    const activeCanvas = getActiveCanvas();
    if (!activeCanvas) return;

    // Save current state to redo stack before undoing
    // 🚨 CRITICAL: Use SAME property list as saveCanvasState()
    const currentState = {
        canvasJSON: activeCanvas.toJSON([
            'isGeneratedItem', 'isMathPuzzle', 'isAnswerKeyItem',
            'isPageBorder', 'isHeaderDesc', 'isHeaderElement',
            'isBorder', 'isBackground', 'originalIndex'
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
    // 🚨 CRITICAL: Use SAME property list as saveCanvasState()
    const currentState = {
        canvasJSON: activeCanvas.toJSON([
            'isGeneratedItem', 'isMathPuzzle', 'isAnswerKeyItem',
            'isPageBorder', 'isHeaderDesc', 'isHeaderElement',
            'isBorder', 'isBackground', 'originalIndex'
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

    isRestoringState = true; // Prevent saving during restoration

    const targetCanvas = state.canvasType === 'worksheet' ? worksheetCanvas : answerKeyCanvas;
    if (!targetCanvas) {
        isRestoringState = false;
        return;
    }

    targetCanvas.loadFromJSON(state.canvasJSON, function() {
        targetCanvas.renderAll();
        isRestoringState = false;
    });
}

function updateHistoryButtons() {
    const undoBtn = document.getElementById('undoBtn');
    console.log("[UNDO DEBUG] updateHistoryButtons called, historyStack.length:", historyStack.length, "redoStack.length:", redoStack.length);
    const redoBtn = document.getElementById('redoBtn');

    if (undoBtn) {
        undoBtn.disabled = historyStack.length === 0;
    }
    console.log("[UNDO DEBUG] undoBtn.disabled set to:", undoBtn.disabled, "redoBtn.disabled set to:", redoBtn.disabled);
    if (redoBtn) {
        redoBtn.disabled = redoStack.length === 0;
    }
}
```

**🚨 CRITICAL VERIFICATION 🚨**

**Check 1: All functions exist**:
```bash
grep -c "function saveCanvasState\|function undo\|function redo\|function restoreCanvasState\|function updateHistoryButtons" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 5
```

**Check 2: All three toJSON calls use SAME property list**:
```bash
# Extract all toJSON arrays (should all be identical)
grep -A 5 "activeCanvas.toJSON" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

**Expected Result**: You should see THREE identical toJSON arrays:
1. In `saveCanvasState()`
2. In `undo()`
3. In `redo()`

All three MUST include the SAME properties you identified in Step 6.4A.

**Check 3: Verify critical properties are included**:
```bash
# For each property from Step 6.4A, verify it's in toJSON
# Example for isGeneratedItem:
grep "toJSON.*isGeneratedItem" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: 3 (one for each function)
```

**⚠️ WARNING**: If the three toJSON arrays don't match EXACTLY, undo/redo will corrupt your canvas state!

### STEP 6.6: Add Event Listeners

In setupEventListeners() function:

```javascript
// Undo/Redo Controls
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

**VERIFICATION**:
```bash
grep -c "addEventListener.*undo\|addEventListener.*redo" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 3
```

### STEP 6.7: Integrate with Worksheet Generation

**CRITICAL**: Find your `handleGenerateWorksheet` function:

```bash
grep -n "function.*generateWorksheet\|async function.*generateWorksheet" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

**MODIFY** the function to include undo/redo integration:

```javascript
async function handleGenerateWorksheet() {
    // ... existing code to get puzzle data ...

    // STEP 1: Set isGenerating flag BEFORE any canvas operations
    isGenerating = true;

    // ... all your worksheet generation code ...
    // (clearing canvas, creating puzzle, adding objects, etc.)

    worksheetCanvas.renderAll();

    showMessage(t("worksheetGeneratedSuccessfully") || "Worksheet generated successfully", "success");
    downloadWorksheetJpegBtn.disabled = false;
    downloadWorksheetPdfBtn.disabled = false;
    generateAnswerKeyBtn.disabled = false;

    // STEP 2: Reset isGenerating flag
    isGenerating = false;

    // STEP 3: Save state AFTER generation completes
    saveCanvasState();  // ✓ CRITICAL: Save generated worksheet to history
}
```

**Same pattern for handleGenerateAnswerKey**:

```javascript
async function handleGenerateAnswerKey() {
    // ... existing code ...

    isGenerating = true;

    // ... answer key generation ...

    answerKeyCanvas.renderAll();

    showMessage(t("answerKeyGenerated") || "Answer key generated", "success");
    downloadAnswerKeyJpegBtn.disabled = false;
    downloadAnswerKeyPdfBtn.disabled = false;

    isGenerating = false;
    saveCanvasState();  // ✓ Save answer key state
}
```

**VERIFICATION**:
```bash
# Verify isGenerating flags added
grep -c "isGenerating = true" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 2 (worksheet + answer key)

grep -c "isGenerating = false" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 2

# Verify saveCanvasState called after generation
grep -A 3 "isGenerating = false" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html" | grep -c "saveCanvasState"
# Should return: at least 2
```

### STEP 6.8: Add Canvas Event Hooks

Find where canvas events are set up (look for `canvas.on('selection:created'` or similar):

```bash
grep -n "canvas.on.*selection\|setupCanvasEventListeners" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
```

Add mouse:down event to save state BEFORE user modifications:

```javascript
// In canvas event setup
canvas.on('mouse:down', function(e) {
    if (e.target) saveCanvasState(); // Save state when user clicks object
});

// Optional: Save on object additions/deletions
canvas.on('object:added', function(e) {
    if (!isRestoringState && !isGenerating) {
        setTimeout(() => saveCanvasState(), 100);
    }
});

canvas.on('object:removed', function(e) {
    if (!isRestoringState && !isGenerating) {
        setTimeout(() => saveCanvasState(), 100);
    }
});
```

**VERIFICATION**:
```bash
grep -c "canvas.on.*mouse:down" "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html"
# Should return: at least 2 (one per canvas)
```

---

## Complete Reference Implementations

This section provides COMPLETE functions from wordsearch for easy reference.

### setupEventListeners() - Complete Function

**From wordsearch lines 1509-1650** (simplified - your app may have additional listeners):

```javascript
function setupEventListeners() {
    // Zoom Controls
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    zoomResetBtn.addEventListener('click', zoomReset);

    // Undo/Redo Controls
    if (undoBtn) undoBtn.addEventListener('click', undo);
    if (redoBtn) redoBtn.addEventListener('click', redo);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
        } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
            e.preventDefault();
            redo();
        }
    });

    // Generate & Download
    generateWorksheetBtn.addEventListener('click', handleGenerateWorksheet);
    generateAnswerKeyBtn.addEventListener('click', handleGenerateAnswerKey);

    // Clear button
    clearBtn.addEventListener('click', clearWorksheet);

    // Layer controls
    toolbarBringToFrontBtn.addEventListener('click', bringObjectToFront);
    toolbarBringForwardBtn.addEventListener('click', bringObjectForward);
    toolbarSendBackwardBtn.addEventListener('click', sendObjectBackward);
    toolbarSendToBackBtn.addEventListener('click', sendObjectToBack);

    // ... add your app-specific listeners here ...
}
```

### init() - Complete Function Pattern

```javascript
async function init() {
    setupAccordion();
    setupDropdowns();
    setupTabs();
    setupEventListeners();

    worksheetCanvas = initializeCanvas(worksheetCanvasElement);
    answerKeyCanvas = initializeCanvas(answerKeyCanvasElement);

    // ... other initialization ...

    // Initialize zoom display
    updateZoomDisplay();

    console.log('[INIT] Application initialized successfully');
}
```

### DOMContentLoaded - Complete Pattern

```javascript
document.addEventListener("DOMContentLoaded", function() {
    init().catch(err => {
        console.error('Failed to initialize:', err);
    });
});
```

---

## Copy-Paste Checklists

Use these checklists to ensure all components are in place.

### Variable Declarations Checklist

```javascript
// Canvas variables
let worksheetCanvas, answerKeyCanvas;
let currentCanvasConfig = { width: 612, height: 792 };

// Zoom
let userZoomLevel = 1.0;

// Undo/Redo
let historyStack = [];
let redoStack = [];
const MAX_HISTORY = 20;
let isRestoringState = false;
let isGenerating = false;

// Element references
const getEl = (id) => document.getElementById(id);

// Zoom controls
const zoomInBtn = getEl('zoomInBtn');
const zoomOutBtn = getEl('zoomOutBtn');
const zoomResetBtn = getEl('zoomResetBtn');
const zoomPercentage = getEl('zoomPercentage');

// History controls
const undoBtn = getEl('undoBtn');
const redoBtn = getEl('redoBtn');

// Layer controls
const toolbarBringToFrontBtn = getEl('toolbarBringToFrontBtn');
const toolbarBringForwardBtn = getEl('toolbarBringForwardBtn');
const toolbarSendBackwardBtn = getEl('toolbarSendBackwardBtn');
const toolbarSendToBackBtn = getEl('toolbarSendToBackBtn');
```

### Function Definitions Checklist

Functions must be defined in this order (before event listeners):

1. ✓ `showMessage(message, type, duration)`
2. ✓ `saveCanvasState()`
3. ✓ `undo()`
4. ✓ `redo()`
5. ✓ `restoreCanvasState(state)`
6. ✓ `updateHistoryButtons()`
7. ✓ `zoomIn()`
8. ✓ `zoomOut()`
9. ✓ `zoomReset()`
10. ✓ `updateZoomDisplay()`
11. ✓ `bringObjectToFront()`
12. ✓ `bringObjectForward()`
13. ✓ `sendObjectBackward()`
14. ✓ `sendObjectToBack()`
15. ✓ `setupEventListeners()`
16. ✓ `init()`

### Event Listeners Checklist

All in setupEventListeners():

```javascript
// Zoom
✓ zoomInBtn.addEventListener('click', zoomIn);
✓ zoomOutBtn.addEventListener('click', zoomOut);
✓ zoomResetBtn.addEventListener('click', zoomReset);

// Undo/Redo
✓ undoBtn.addEventListener('click', undo);
✓ redoBtn.addEventListener('click', redo);
✓ Keyboard shortcuts (Ctrl+Z, Ctrl+Y)

// Layer controls
✓ toolbarBringToFrontBtn.addEventListener('click', bringObjectToFront);
✓ toolbarBringForwardBtn.addEventListener('click', bringObjectForward);
✓ toolbarSendBackwardBtn.addEventListener('click', sendObjectBackward);
✓ toolbarSendToBackBtn.addEventListener('click', sendObjectToBack);

// Canvas events (on each canvas)
✓ canvas.on('mouse:down', saveCanvasState)
✓ canvas.on('object:added', conditional saveCanvasState)
✓ canvas.on('object:removed', conditional saveCanvasState)
```

### Integration Points Checklist

```javascript
// In handleGenerateWorksheet():
✓ isGenerating = true (BEFORE generation)
✓ ... worksheet generation code ...
✓ isGenerating = false (AFTER generation)
✓ saveCanvasState() (AFTER isGenerating = false)

// In handleGenerateAnswerKey():
✓ isGenerating = true (BEFORE generation)
✓ ... answer key generation code ...
✓ isGenerating = false (AFTER generation)
✓ saveCanvasState() (AFTER isGenerating = false)

// In init():
✓ setupEventListeners() called
✓ updateZoomDisplay() called
```

---

## Testing Checklist

### Header & UI
- [ ] Header has purple gradient background
- [ ] Tabs on left: "Worksheet" and "Answer Key"
- [ ] Zoom controls visible: -, 100%, +, reset
- [ ] Undo/Redo buttons visible (disabled initially)
- [ ] Generate dropdown (not separate buttons)
- [ ] Download dropdown (not separate buttons)
- [ ] Clear All button (red/danger style)

### Zoom Functionality
- [ ] Click + button → zoom increases, percentage updates
- [ ] Click - button → zoom decreases, percentage updates
- [ ] Click reset → zoom returns to 100%
- [ ] Zoom clamped (25% min, 300% max)
- [ ] Percentage display accurate

### Undo/Redo Functionality
- [ ] Buttons disabled on page load
- [ ] Generate worksheet → Undo button activates
- [ ] Move object → Undo button stays active
- [ ] Click Undo → object returns to original position
- [ ] Click Undo → Redo button activates
- [ ] Click Redo → change restored
- [ ] Ctrl+Z triggers undo
- [ ] Ctrl+Y triggers redo
- [ ] Make change after undo → Redo disabled
- [ ] No console errors

### Border & Background
- [ ] Add border → clickable and selectable
- [ ] Add background → clickable and selectable
- [ ] Can move, resize, rotate borders
- [ ] Can move, resize, rotate backgrounds
- [ ] Contextual toolbar appears when selected
- [ ] Can delete using Delete button
- [ ] After worksheet generation, still selectable

### Z-Order Controls
- [ ] Select object → Layers dropdown shows 4 buttons
- [ ] "Bring to Front" moves to top layer
- [ ] "Bring Forward" moves up one layer
- [ ] "Send Backward" moves down one layer
- [ ] "Send to Back" moves to bottom layer
- [ ] Z-order changes persist (don't reset)
- [ ] Console shows z-order logs

### Deployment
- [ ] File uploaded to server
- [ ] File copied to .next/standalone/
- [ ] PM2 restarted
- [ ] Live site shows changes (hard refresh)
- [ ] No JavaScript errors in browser console

---

## Deployment Procedure

### Upload and Deploy

```bash
# Step 1: Upload modified file
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm \
  -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU \
  "C:\Users\rkgen\lessoncraftstudio\[APP_NAME].html" \
  root@65.108.5.250:/opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html

# Step 2: Restart PM2
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm \
  -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 \
  "pm2 restart lessoncraftstudio && echo 'Deployed successfully'"

# Step 3: Test live site
# Open: https://lessoncraftstudio.com/en/worksheet-generators/[app-name]
# Hard refresh: Ctrl+Shift+R
```

### Rollback if Needed

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm \
  -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 \
  "cp /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html.backup_* \
      /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/[APP_NAME].html && \
   pm2 restart lessoncraftstudio"
```

---

## Success Criteria

Implementation is successful when:

✅ All items in Testing Checklist pass
✅ All verification commands return expected results
✅ No JavaScript errors in console
✅ Live site reflects all changes
✅ User can undo/redo modifications
✅ User can zoom in/out/reset
✅ User can fully edit borders/backgrounds
✅ User can control z-order with all 4 buttons

---

## Version History

- **v2.2.0** (2025-10-18): **CRITICAL UNDO/REDO IMPROVEMENT**
  - Added Step 6.4A: Comprehensive guide for identifying ALL custom properties
  - Documented the root cause of duplication bugs (missing properties in toJSON)
  - Added grep commands to find all custom properties in any app
  - Included real-world examples from 4 different apps where this bug occurred
  - Updated Step 6.5 with prominent warnings about property list usage
  - Added triple verification for toJSON arrays in saveCanvasState, undo, redo
  - This step is now MANDATORY to prevent duplication bugs
  - **Key Learning**: Any property used in filter/remove operations MUST be in toJSON array

- **v2.1.0** (2025-10-16): **INCREMENTAL DEPLOYMENT METHOD**
  - Added MANDATORY INCREMENTAL DEPLOYMENT METHOD section at top
  - Documents the exact 12-step process that achieved 100% success rate
  - Includes concrete examples and templates for each step
  - Emphasizes waiting for user confirmation between steps
  - Added failure modes to avoid and success patterns to follow

- **v2.0.0** (2025-10-16): **MAJOR REWRITE**
  - Added Section 0: Wordsearch Reference Map with EXACT line numbers
  - Replaced ALL approximate line numbers with exact references
  - Replaced ALL code snippets with COMPLETE, copy-pasteable blocks
  - Added verification commands after EVERY step
  - Added Complete Reference Implementations section
  - Added Copy-Paste Checklists section
  - Eliminated ALL ambiguous language ("usually", "around", "approximately")
  - Restructured for maximum precision and minimum failure rate

- **v1.2.0** (2025-10-15): Added Feature 5: Contextual Toolbar Localization
- **v1.1.0** (2025-10-15): Added zoom fixes and enhanced documentation
- **v1.0.0** (2025-10-15): Initial guide based on Word Search implementation

---

**END OF GUIDE V2.2**
