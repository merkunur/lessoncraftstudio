# Writing App - Features Analysis
**Source:** REFERENCE APPS/writing.html

## App Purpose
Create customizable handwriting practice worksheets with tracing, fading trace, and guided copy options across multiple handwriting fonts.

## Main Features

### 1. Page Setup
- **Page Size Options:**
  - Letter Portrait (8.5×11")
  - Letter Landscape (11×8.5")
  - A4 Portrait (210×297mm)
  - A4 Landscape (297×210mm)
  - Custom (with custom width/height in px)

- **Background Decorations:**
  - Background Theme selection
  - Background Opacity control (0-100%)

- **Border Decorations:**
  - Border Theme selection
  - Border Opacity control (0-100%)

### 2. Image Library
- **Two Image Modes:**
  - Exercise Image: Pick from themed library
  - Custom Images: Use uploaded images

- **Exercise Image Options:**
  - Theme-based image selection
  - Image search functionality
  - Thumbnail preview
  - Unselect image option

- **Custom Image Placement:**
  - Select from uploaded images
  - Add selected image to worksheet
  - Clear selection option

### 3. Upload Custom Images
- **Upload Features:**
  - Multi-file upload support
  - Preview of uploaded images
  - Choose Files button
  - Shows file selection status

### 4. Text Tools
- **Add New Text:**
  - Text content input
  - Add text to worksheet button

- **Selected Text Properties:**
  - Color picker
  - Font size (8+ px)
  - Font family selection (Arial, Verdana, Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka)
  - Outline color picker
  - Outline width (0-10)
  - Delete selected text button

### 5. Row Configuration (Multiple Rows)
Each row can be independently configured with:

- **Row Type:**
  - Trace: Full opacity letters to trace over
  - Fading Trace: Partially visible letters
  - Guided Copy: First letter full, rest faded

- **Font Style:**
  - Print Regular: Clean printed font
  - Print Regular Arrow: Printed font with directional arrows
  - Print Tracing: Dotted outline font
  - Print Tracing Arrow: Dotted outline with directional arrows
  - Cursive: Connected handwriting style

- **Content Type:**
  - Empty: Blank lines for free practice
  - Beginning Letter: Single repeated letter across row
  - Whole File Name: Complete filename text
  - Custom Text: User-entered text

- **Case Options** (for letter content):
  - Uppercase
  - Lowercase
  - Title Case

- **Stroke Type** (for empty content):
  - Vertical Line
  - Horizontal Line
  - Circle
  - Zig-Zag Line

- **Custom Text Input:**
  - Textarea for entering custom trace text
  - Appears when "Custom Text" content selected

- **Delete Row:**
  - Remove individual rows

### 6. Top-Right Action Buttons
- **Zoom Controls:**
  - Zoom In
  - Zoom Out
  - Reset Zoom (100%)
  - Current zoom percentage display

- **Add Row:**
  - Create new handwriting row with full configuration

- **Download Options:**
  - Download as PDF
  - Download as JPEG
  - Grayscale toggle option

- **Clear All:**
  - Remove all content from worksheet

### 7. Object Context Toolbar
(Appears when objects are selected)

- **Layering:**
  - Bring Forward
  - Send Backward

- **Alignment:**
  - Align Selected:
    - Align Left
    - Center Horizontally
    - Align Right
    - Align Top
    - Center Vertically
    - Align Bottom
  - Align to Page:
    - Center on Page Horizontally
    - Center on Page Vertically

- **Object Management:**
  - Crop Overflow (for images)
  - Lock/Unlock objects
  - Delete selected objects

### 8. Menu Toggle
- Hamburger menu button
- Show/hide left panel
- Menu overlay for mobile

## Unique Selling Points

1. **Multiple Font Styles:** 5 different handwriting font options including cursive and arrow-guided fonts
2. **Progressive Learning:** Trace → Fading Trace → Guided Copy progression
3. **Flexible Content:** Empty lines, single letters, full words, or custom text
4. **Professional Quality:** High-resolution rendering (300 DPI) for printing
5. **Multi-Row Support:** Create worksheets with multiple practice rows
6. **Custom Decorations:** Add themed backgrounds and borders
7. **Image Integration:** Combine handwriting practice with themed images
8. **Text Objects:** Add custom text labels and titles anywhere on worksheet

## Technical Features
- Canvas-based high-quality SVG rendering
- Object manipulation (drag, resize, rotate)
- Undo/Redo functionality
- Responsive zoom controls
- PDF and JPEG export
- Grayscale printing option
- Custom image upload and management
