# Picture Path Features Analysis

## Source File
`REFERENCE APPS/picture path.html`

## App Name
- English: Picture Pathway
- Purpose: Create maze and pathway worksheets with images

## Three Game Modes

### 1. Picture Pathway Mode (Default)
- Connect images in a pathway from start to end
- Students follow path through images
- Line 1178: `<option value="pathway" data-translate="picture.pathway.mode.pathway">Picture Pathway</option>`

### 2. Classic Maze Mode
- Traditional maze with collectible images along the solution path
- Grid-based maze generation
- Line 1179: `<option value="classic-maze" data-translate="picture.pathway.mode.classic.maze">Classic Maze</option>`

### 3. Choose the Right Path Mode
- Multiple pathways, only one is correct
- Directional (bottom-top, top-bottom, left-right, right-left)
- Line 1180: `<option value="choose-path" data-translate="picture.pathway.mode.choose.path">Choose the Right Path</option>`

## Page Setup Features (Lines 1106-1147)

### Page Size Options (Line 1109)
- Letter Portrait (8.5×11")
- Letter Landscape (11×8.5")
- A4 Portrait (210×297mm)
- A4 Landscape (297×210mm)
- Square (1200x1200)
- Custom (user-defined width and height)

### Page Customization
- Page color picker (Line 1124)
- Background theme selector (Line 1129)
- Background opacity slider (Line 1134)
- Border theme selector (Line 1138)
- Border opacity slider (Line 1145)

## Image Library Features (Lines 1304-1340)

### Image Selection Types (Line 1307)
Five types of images:
1. **Start Image** - Where pathway begins (1 needed)
2. **End Image** - Where pathway ends (1 needed)
3. **Path Image** - Images along correct path (≥1 needed, 4 recommended)
4. **Distractor Image** - Incorrect path images (≥6 recommended)
5. **Decoration Image** - Decorative elements placed anywhere

### Image Library
- Theme-based selection (Line 1315)
- Search functionality (Line 1317)
- Visual dictionary display (Line 1319)
- Language selector for image library content (Line 1087) - 11 languages
- Selection panels showing chosen images (Lines 1322-1337)
- Clear selections button (Line 1338)

## Classic Maze Settings (Lines 1191-1262)

### Grid Size (Line 1196)
- 12×12 (Recommended)
- 13×13
- 14×14
- 15×15

### Collectible Settings
- Number of collectible images: 1-4 images (Line 1206)
- Minimum copies per image: 1-3 (Line 1214)
- Maximum copies per image: 1-10 (Line 1221)

### Wall Appearance (Lines 1234-1249)
- Wall color picker (Line 1237)
- Wall thickness: 1-10px with slider (Line 1241)
- Wall opacity: 10-100% with slider (Line 1245)

### Advanced Settings (Lines 1251-1260)
- Path length minimum: 4-30 (Line 1255)
- Path length maximum: 4-30 (Line 1258)

## Choose the Right Path Settings (Lines 1265-1301)

### Maze Direction (Line 1269)
- Bottom to Top ↑
- Top to Bottom ↓
- Left to Right →
- Right to Left ←

### Grid Size (Line 1277)
- Same as Classic Maze: 12×12, 13×13, 14×14, 15×15

### Wall Appearance (Lines 1284-1299)
- Wall color picker (Line 1287)
- Wall thickness: 1-10px (Line 1291)
- Wall opacity: 10-100% (Line 1297)

## Text Tools (Lines 1150-1170)

### Add Text
- Text input field (Line 1153)
- Add text button (Line 1154)

### Text Properties (when text selected)
- Color picker (Line 1156)
- Font size: 8px minimum (Line 1157)
- Font family dropdown (Line 1159):
  - Lexend Deca
  - Baloo 2
  - Nunito
  - Quicksand
  - Fredoka
  - Arial
  - Verdana
- Outline color (Line 1168)
- Outline width: 0-10 with slider (Line 1169)

## Custom Image Upload (Lines 1342-1356)
- Multi-file upload (Line 1350)
- Accept all image formats (accept="image/*")
- Preview of uploaded images (Line 1352)
- Images available for current session
- Can use uploaded images as any type (start, end, path, distractor, decoration)

## Canvas Editing Features (Lines 1367-1408)

### Contextual Toolbar
- Layering controls (Lines 1372-1376):
  - Bring to Front
  - Bring Forward
  - Send Backward
  - Send to Back

- Alignment controls (Lines 1382-1400):
  - Align Left/Center/Right
  - Align Top/Center/Bottom
  - Center on Page Horizontally
  - Center on Page Vertically

- Lock/Unlock toggle (Line 1404)
- Delete selected (Line 1407)

## Generation and Download Features (Lines 1433-1454)

### Generate/Create Options (Lines 1436-1438)
- New Worksheet
- Answer Key (shows solution path)

### Download Options (Lines 1443-1447)
- Worksheet (JPEG)
- Answer Key (JPEG)
- Worksheet (PDF)
- Answer Key (PDF)
- Grayscale toggle option (Line 1450)

## Additional Features

### Name/Date Fields (Line 1184)
- Checkbox to include name/date fields on worksheet

### History Controls (Lines 1422-1425)
- Undo button (Ctrl+Z)
- Redo button (Ctrl+Y)

### Zoom Controls (Lines 1416-1421)
- Zoom in
- Zoom out
- Zoom percentage display
- Reset zoom

### Two Tab System (Lines 1412-1413)
- Worksheet tab
- Answer Key tab

### Clear All Button (Line 1454)
- Clear entire canvas

## General App Features (All Apps)

1. **11 Languages** - UI in 11 languages (Line 1087-1099)
2. **Upload Custom Images** - Multi-file upload (Line 1350)
3. **3000+ Image Library** - Theme-based organization
4. **Professional 300 DPI Quality** - High-resolution export
5. **POD License** - Commercial print-on-demand license included
6. **Full Canvas Editability** - Drag, rotate, scale, lock, delete
7. **Background & Border Themes** - Extensive customization options

## Summary

Picture Path is a versatile maze/pathway generator with three distinct modes. It combines image selection, maze generation algorithms, and full canvas editing capabilities. Suitable for creating visual learning activities for preschool through elementary students.

Key differentiators:
- Three different game modes in one app
- Image-based pathways and mazes
- Extensive customization of maze appearance
- Professional answer key generation showing solution
- Full control over image types (start, end, path, distractor, decoration)
