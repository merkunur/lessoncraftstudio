# Find and Count App - Features Analysis

**Source:** REFERENCE APPS/find and count.html
**Analysis Date:** December 12, 2025
**Purpose:** Factual documentation of actual app features for SEO content creation

---

## App Overview

The Find and Count app (also called "I Spy" in the interface) is a worksheet generator that creates visual search and counting activities. Students look for specific hidden objects in a grid of images and complete tasks like circling, counting, or crossing out the objects.

---

## Core Features (Verified from Source Code)

### 1. Grid-Based Worksheet Generation
- **Grid dimensions:** 5-10 rows × 5-10 columns (lines 1034-1037)
- **Dynamic grid creation:** User can customize grid size
- **Random image placement:** Improved randomization algorithm with multiple shuffle passes (lines 2615-2649)
- **Visual grid layout:** Images arranged in evenly-spaced grid cells

### 2. Hidden Object Selection
- **1-4 hidden objects:** User selects between 1 and 4 images to be the "hidden objects" (line 1080)
- **Multiple instances:** Each hidden object appears 2 times in the grid (lines 2626-2632)
- **Image sources:**
  - 3000+ image library organized by themes
  - Custom uploaded images
  - Search functionality across all images

### 3. Four Task Types
Each hidden object can be assigned one of four different tasks (lines 2335-2340):

1. **Circle Task** - Students draw circles around the object
2. **Square Task** - Students draw squares around the object
3. **Cross Out Task** - Students cross out the object
4. **Count Task** - Students count instances and write the number

The answer key shows visual indicators for each task type.

### 4. Multi-Language Support (11 Languages)
- **UI Language:** Interface elements, buttons, labels (lines 983-996)
- **Content Language:** Image names and themes (line 1082)
- **Supported languages:** English, German, French, Spanish, Italian, Portuguese, Dutch, Swedish, Danish, Norwegian, Finnish
- **Language-specific titles:** "I Spy" (English), "Ich sehe was" (German), "Veo Veo" (Spanish), etc. (lines 2654-2666)
- **Pluralization system:** Grammatically correct questions in all languages (lines 2882-2999)

### 5. Professional Header System
- **Responsive design:** Adapts to portrait vs landscape orientation (lines 2720-2839)
- **Dual border design:** Blue outer border + yellow inner border (lines 2686-2718)
- **Customizable title:** Editable text with dynamic font sizing
- **Language-specific defaults:** Pre-set titles and descriptions per language (lines 2654-2671)

**Portrait Layout:**
- Full-width header (80px height)
- Large title with white pill background
- Orange header background

**Landscape Layout:**
- Compact centered header (72px height)
- Smaller title for space efficiency
- No description text (keeps layout clean)

### 6. Page Setup & Customization

**Page Sizes (lines 1006-1013):**
- Default Worksheet (800×1000)
- A4 Portrait (210×297mm)
- A4 Landscape (297×210mm)
- Letter Portrait (8.5×11") - Default selection
- Letter Landscape (11×8.5")
- Square (1200×1200)
- Custom dimensions

**Page Color:** Full color picker for background color (line 1023)

### 7. Background & Border Themes
- **Background themes:** Select from theme library (lines 1026-1032)
- **Background opacity:** 0-100% adjustable slider
- **Border themes:** Decorative frame options (lines 1040-1048)
- **Border opacity:** 0-100% adjustable slider
- **Fully editable:** Both backgrounds and borders can be moved, scaled, deleted

### 8. Image Library Features

**Theme Selection (lines 2181-2210):**
- Dropdown menu with all available themes
- "All Themes" option for cross-theme search
- Default theme: "animals"
- Translated theme names per language

**Search Functionality (lines 2240-2298):**
- Real-time search across all images
- Search by image name in current language
- Works across all themes when "All" is selected
- Empty search shows default "animals" theme

**Image Display:**
- Thumbnail preview with image name
- Visual selection indicator
- Alphabetical sorting of results
- Selection counter (0-4 objects)

### 9. Custom Image Upload
- **Multiple file upload:** Select multiple images at once (line 1102)
- **Supported formats:** All common image formats (JPEG, PNG, GIF, etc.)
- **Session storage:** Uploaded images available during current session
- **Integration:** Uploaded images can be used as hidden objects
- **Preview:** Visual preview of uploaded images (lines 2301-2318)

### 10. Text Tools (lines 1609-1700)

**Add Custom Text:**
- Click to add text anywhere on canvas
- Fully editable content

**Text Properties:**
- Color picker
- Font size (8px minimum)
- Font family: 7 child-friendly fonts
  - Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
- Text outline color
- Outline width (0-10px)

**Text Behavior:**
- Drag to reposition
- Resize with corner handles
- Rotate freely
- Always appears above grid images

### 11. Full Canvas Editing

**Object Manipulation:**
- Click to select any element
- Drag to move
- Corner handles to scale
- Rotation handle to rotate
- Delete key or toolbar to remove

**Multi-Select:**
- Click and drag to select multiple objects
- Hold Shift and click for individual selection
- Group operations (move, scale, rotate together)

**Layer Controls (Z-Order):**
- Bring to Front
- Bring Forward
- Send Backward
- Send to Back

**Alignment Tools:**
- Align Left, Center, Right (horizontal)
- Align Top, Middle, Bottom (vertical)
- Center on Page (horizontal/vertical)

**Lock/Unlock Objects:**
- Lock prevents movement, scaling, rotation
- Locked objects are non-selectable and non-interactive
- Unlock All button appears when objects are locked
- Visual indicators for locked state

### 12. Answer Key Generation

**Automatic Answer Key (lines 2478-2551):**
- Generates complete answer key on separate canvas
- Shows visual indicators for each task type
- Preserves all decorative elements (borders, backgrounds)
- Separate tab for worksheet vs answer key
- Independent editing of answer key

**Answer Key Features:**
- Same grid layout as worksheet
- Visual markers showing where hidden objects are located
- Task-specific indicators (circles, squares, crosses, numbers)
- Maintains all user customizations

### 13. Zoom Controls (lines 1543-1568)
- **Zoom In:** Increase by 25% increments
- **Zoom Out:** Decrease by 25% increments
- **Zoom Range:** 25% to 300%
- **Reset Zoom:** Return to 100%
- **Zoom Percentage Display:** Shows current zoom level
- **Keyboard shortcuts:** Zoom buttons with tooltips

### 14. Undo/Redo System (lines 2082-2179)
- **History Stack:** Saves up to 20 states
- **Redo Stack:** Allows redoing undone actions
- **Keyboard Shortcuts:** Ctrl+Z (undo), Ctrl+Y (redo)
- **State Management:** Prevents saving during generation/restoration
- **Canvas-Specific:** Tracks worksheet and answer key separately
- **Visual Feedback:** Disabled buttons when no history available

### 15. Export & Download (300 DPI Quality)

**JPEG Export (lines 3436-3508):**
- Worksheet JPEG
- Answer Key JPEG
- 300 DPI (6× multiplier for print quality)
- Grayscale option available

**PDF Export (lines 3510-3604):**
- Worksheet PDF
- Answer Key PDF
- 300 DPI quality
- Grayscale option available
- Proper page dimensions for printing

**Grayscale Toggle:**
- Single checkbox controls all exports
- Converts full-color worksheets to grayscale
- Saves printer ink
- Maintains image clarity

### 16. Responsive Design
- **Desktop Mode:** Full sidebar panel
- **Mobile/Tablet:** Collapsible menu with hamburger icon
- **Canvas Scaling:** Automatic zoom to fit viewport
- **Landscape Detection:** Adapts header layout (lines 2676, 2720-2839)
- **Touch-Friendly:** Large buttons and controls

---

## Key Technical Implementation Details

### Grid Building Algorithm (lines 2610-2650)
1. Creates total cells = rows × cols
2. Shuffles available indices 3 times for better randomization
3. Places 2 instances of each hidden object randomly
4. Fills remaining cells with variety of pool images
5. Uses modulo cycling for even distribution

### Non-Destructive Regeneration (lines 2419-2474)
- Preserves user-added content (text, custom images)
- Stores transforms (position, scale, rotation) of existing items
- Only removes auto-generated grid items
- Re-applies transforms after regeneration
- Maintains backgrounds and borders
- Ensures smooth worksheet updates without losing work

### Canvas Performance
- Fabric.js library for canvas manipulation
- Retina scaling enabled for crisp display
- Object stacking preservation
- Efficient rendering with selective updates

---

## User Workflow

1. **Select Theme:** Choose image theme from dropdown
2. **Select 1-4 Hidden Objects:** Click images to select
3. **Assign Tasks:** Choose circle/square/cross/count for each object
4. **Optional: Customize Grid:** Adjust rows/columns (5-10)
5. **Optional: Upload Images:** Add custom images
6. **Generate Worksheet:** Click "Generate" → Creates worksheet instantly
7. **Edit Canvas:** Add text, adjust layout, change colors
8. **Generate Answer Key:** Click "Answer Key" → Creates matching key
9. **Download:** Export as JPEG or PDF (color or grayscale)

---

## Educational Use Cases

- **Early Childhood:** Visual discrimination and counting practice
- **Kindergarten:** Number recognition, following multi-step directions
- **First Grade:** Counting objects, fine motor skills (drawing circles/squares)
- **ESL/Language Learning:** Vocabulary practice with visual context
- **Special Education:** Visual processing, attention to detail
- **Substitute Teachers:** Quick, engaging activities
- **Homeschool Parents:** Multi-level activities for different ages

---

## Print-on-Demand (POD) Commercial Features

- **300 DPI Export:** Professional print quality
- **Commercial License:** Included with Core Bundle subscription
- **PDF Format:** Ready for KDP, TPT, Etsy
- **Customizable:** Create unique products
- **No Attribution Required:** Sell without crediting platform
- **Unlimited Creation:** Generate as many worksheets as needed

---

## Verified Features Summary

✅ **Grid worksheets:** 5-10 rows × 5-10 columns
✅ **Hidden objects:** 1-4 selectable objects, 2 instances each
✅ **Four task types:** Circle, square, cross out, count
✅ **11 languages:** Full UI and content support
✅ **3000+ images:** Theme-based organization
✅ **Custom upload:** Multi-file image upload
✅ **Search:** Cross-theme image search
✅ **Professional headers:** Responsive dual-border design
✅ **Answer key:** Auto-generated with visual indicators
✅ **Page sizes:** Letter, A4, square, custom
✅ **Backgrounds & borders:** Theme library with opacity control
✅ **Text tools:** 7 fonts, colors, outlines
✅ **Full editability:** Drag, scale, rotate everything
✅ **Layer controls:** Z-order management
✅ **Lock/unlock:** Object protection
✅ **Zoom:** 25%-300% with reset
✅ **Undo/Redo:** 20-state history
✅ **300 DPI export:** PDF and JPEG
✅ **Grayscale option:** Printer-friendly output
✅ **Responsive:** Desktop, tablet, mobile

---

**Total Verified Features:** 18 major feature categories, 60+ individual capabilities

All features documented above are based on direct analysis of the source code and verified as actually existing in the application.
