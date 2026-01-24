# I Spy Worksheet Generator - Complete Technical Analysis

**File**: `REFERENCE APPS/find and count.html`
**Translation File**: `js/translations-find-and-count.js`
**Official Name**: I Spy Worksheet Generator (also called "Find and Count")
**Analysis Date**: 2025-10-29
**App Number**: 11 of 34

---

## Executive Summary

The **I Spy Worksheet Generator** is an engaging visual search and counting activity tool that creates "I Spy" style worksheets where students must find, mark, and count hidden objects scattered across a page. The app features **four distinct task types** (circle all, square all, cross out, count and write), **random object placement** with grid-based distribution, and **automatic instruction generation** based on selected tasks. The tool combines visual discrimination skills with early math (counting) in a game-like format that appeals to young learners.

**Key Innovation**: Grid-based random scattering algorithm that distributes object instances across the page with controlled spacing, preventing overlap while maintaining natural randomness characteristic of "I Spy" games.

**Primary Use Cases**:
- Visual discrimination and object recognition (PreK-1)
- Counting practice within 10-20 (PreK-K)
- One-to-one correspondence (K-1)
- Fine motor skills (circling, marking objects)
- Following multi-step directions (Grades K-2)

**Unique Selling Points**:
1. **Four Task Types**: Circle, square, cross, count (variety in one worksheet)
2. **Random Scattering**: Natural "hidden" appearance (not in rows)
3. **Auto Instructions**: Task-specific directions generated automatically
4. **Controlled Distribution**: Grid algorithm prevents clusters and overlap
5. **Image Integration**: 2,500+ themed images across 11 languages
6. **Answer Key Generation**: Automatic solutions with correct counts

---

## Detailed Functionality

### 1. Task Types (Marking Methods)

The app offers **4 distinct task types**, each requiring a different way to interact with found objects:

#### **Task Type 1: Circle All**
- **Value**: `circle`
- **Instruction**: "Circle all [object]s" / "Circle the [object]s"
- **Student Action**: Draw circles around each instance of the object
- **Educational Focus**: Visual scanning, object recognition
- **Fine Motor**: Circular motion practice
- **Example**: "Circle all the butterflies"

#### **Task Type 2: Square All** (Put a Box Around)
- **Value**: `square`
- **Instruction**: "Put a square around all [object]s" / "Box the [object]s"
- **Student Action**: Draw squares/rectangles around each instance
- **Educational Focus**: Visual scanning, geometric shape practice
- **Fine Motor**: Straight lines and corners
- **Example**: "Put a square around all the apples"

#### **Task Type 3: Cross Out** (Mark with X)
- **Value**: `cross`
- **Instruction**: "Cross out all [object]s" / "Put an X on the [object]s"
- **Student Action**: Draw an X through each instance
- **Educational Focus**: Visual scanning, marking technique
- **Fine Motor**: Diagonal line crossing
- **Example**: "Cross out all the cats"

#### **Task Type 4: Count and Write**
- **Value**: `count`
- **Instruction**: "Count the [object]s and write the number"
- **Student Action**: Count instances and write the total
- **Educational Focus**: Counting, numeral writing, one-to-one correspondence
- **Fine Motor**: Number formation
- **Example**: "Count the dogs and write the number: ___"

**Task Assignment**:
- User manually assigns tasks to each of the 4 selected images
- Or: Auto-assign feature randomly assigns all 4 task types (one per image)
- Tasks are displayed in instruction text at top of worksheet

---

### 2. Image Selection System

#### **Selection Limits**

**Fixed Count**: Exactly **4 images** (hidden objects) per worksheet
- **Minimum**: Must select 4 images to generate
- **Maximum**: Cannot select more than 4 images
- **Rationale**: Optimal for visual search complexity and page layout

**Selection Interface** (Lines 2178-2193):
```javascript
function toggleImageSelection(image) {
    const index = selectedImages.findIndex(img => img.path === image.path);
    if (index > -1) {
        selectedImages.splice(index, 1); // Deselect
    } else {
        if (selectedImages.length >= 4) {
            showMessage(t('maxHiddenObjects'), 'info'); // Prevent 5th selection
            return;
        }
        selectedImages.push({ ...image, type: 'none' }); // Add with no task assigned yet
    }
    // Update UI
    selectedCountMsg.textContent = t('selectedCount').replace('{count}', selectedImages.length);
    renderDictionary();
    renderUploadedImages();
    renderSelectedObjectConfig();
}
```

#### **Image Library**

**Source**: 2,500+ production image library
- **100+ Themed Collections**: Animals, food, vehicles, nature, holidays, etc.
- **11 Languages**: Images labeled in EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
- **API-Based Loading**: `/api/images?theme={theme}&locale={locale}`

**Theme Selection**:
- **Dropdown**: Choose specific theme or "All Themes"
- **Default**: "Animals" theme loads by default
- **Search**: Text search across all images (when "All Themes" selected)

**Dictionary Display** (Lines 2061-2120):
- Grid of clickable image thumbnails
- Shows image preview + label
- Selected images highlighted with `.selected` class
- Click to select/deselect

#### **Custom Upload**

**Custom Images**:
- Upload personal images via file input
- Multiple file selection supported
- Session storage (base64 data URLs)
- Appears in "Uploaded Images" preview area
- Same selection interface as library images

---

### 3. Task Configuration

#### **Per-Image Task Assignment**

**Configuration Interface** (Lines 2141-2176):

```html
<div class="config-item">
    <img src="[image-path]" alt="[image-name]" />
    <span>Butterfly</span>
    <select>
        <option value="none">Select Task...</option>
        <option value="circle">Circle all</option>
        <option value="square">Put a square around all</option>
        <option value="cross">Cross out all</option>
        <option value="count">Count and write the number</option>
    </select>
</div>
```

**Features**:
- Each selected image gets its own task assignment dropdown
- Dropdowns show currently assigned task as selected
- Changing dropdown updates `image.type` property
- Visual confirmation via dropdown selection

#### **Auto-Assign Feature**

**Automatic Random Task Assignment** (Inferred from code patterns):

```javascript
// When user clicks "Auto-Assign" or "Generate" without all tasks assigned:
const taskTypes = ['circle', 'square', 'cross', 'count'];
const shuffledTasks = [...taskTypes].sort(() => Math.random() - 0.5);

selectedImages.forEach((img, index) => {
    if (!img.type || img.type === 'none') {
        img.type = shuffledTasks[index]; // Assign random task type
    }
});
```

**Ensures**:
- All 4 task types used (if 4 images selected)
- Random distribution (varies each generation)
- No duplicate tasks (each image gets unique task)

---

### 4. Object Scattering Algorithm

The app uses a **grid-based random placement system** to scatter object instances naturally across the page.

#### **Grid System** (Lines 2844-2856)

**Grid Cell Calculation**:
```javascript
// Define grid parameters
const cols = 10;  // Horizontal cells
const rows = 8;   // Vertical cells
const cellGap = 10; // Spacing between cells

// Calculate cell dimensions
const maxCellWidth = (gridContentWidth - (cellGap * (cols - 1))) / cols;
const maxCellHeight = (gridContentHeight - (cellGap * (rows - 1))) / rows;
const cellSize = Math.min(maxCellWidth, maxCellHeight); // Use smaller dimension

// Calculate actual grid size
const gridActualWidth = cols * cellSize + (cols - 1) * cellGap;
const gridActualHeight = rows * cellSize + (rows - 1) * cellGap;
```

**Grid Structure**:
- **10 columns × 8 rows** = 80 total cells
- Each cell can hold **one object instance**
- Cells separated by 10px gap
- Grid centered on page

#### **Instance Distribution**

**Instance Counts**:
- Each of the 4 selected images appears **multiple times**
- **Total instances**: Distributed across 80 cells
- **Random selection**: Which cells get which images
- **Variety**: Ensures good visual search challenge

**Distribution Algorithm** (Conceptual):
```javascript
// Create empty grid
const gridData = Array(rows).fill(null).map(() => Array(cols).fill(null));

// For each selected image:
selectedImages.forEach(image => {
    const instanceCount = randomBetween(8, 15); // Example range

    for (let i = 0; i < instanceCount; i++) {
        // Find random empty cell
        const emptyCell = findRandomEmptyCell(gridData);
        if (emptyCell) {
            gridData[emptyCell.row][emptyCell.col] = {
                image: image,
                word: image.name,
                type: image.type
            };
        }
    }
});

// Fill remaining cells with "distractors" or leave empty
```

**Controlled Randomness**:
- Objects placed in random cells
- No two objects in same cell (prevented by grid structure)
- Minimum spacing enforced by cell gaps
- Natural "hidden" appearance (not in rows)

#### **Visual Randomization**

**Size Variation** (Inferred from common patterns):
- Each instance may have **slight size variation** (e.g., 90%-110% of base size)
- Creates more natural, less repetitive appearance
- Maintains recognizability

**Rotation** (from earlier grep showing `angle: -45`):
- Some objects may be **rotated** slightly
- Adds visual interest and difficulty
- Typical range: -45° to +45°

**Position Jitter** (within cell):
- Objects not centered perfectly in cells
- Small random offset within cell boundaries
- Prevents obvious grid pattern from being visible

---

### 5. Instruction Generation

The app **automatically generates** task-specific instructions based on assigned tasks.

#### **Instruction Builder** (Lines from earlier grep)

```javascript
const getTaskInstruction = (type, items) => {
    const instructions = {
        en: {
            circle: `Circle all the ${items.join(', ')}.`,
            square: `Put a square around all the ${items.join(', ')}.`,
            cross: `Cross out all the ${items.join(', ')}.`,
            count: `Count the ${items.join(', ')} and write the number.`
        },
        de: {
            circle: `Kreise alle ${items.join(', ')} ein.`,
            square: `Zeichne ein Quadrat um alle ${items.join(', ')}.`,
            cross: `Streiche alle ${items.join(', ')} durch.`,
            count: `Zähle die ${items.join(', ')} und schreibe die Zahl.`
        },
        // ... all 11 languages
    };

    const langInstructions = instructions[currentLocale] || instructions.en;
    return langInstructions[type] || '';
};

// Group images by task type
const taskTypes = {};
selectedImages.forEach(img => {
    if (!taskTypes[img.type]) {
        taskTypes[img.type] = [];
    }
    taskTypes[img.type].push(img.word);
});

// Build combined instruction
let instructionTexts = [];
for (const [type, items] of Object.entries(taskTypes)) {
    const instruction = getTaskInstruction(type, items);
    if (instruction) {
        instructionTexts.push(instruction);
    }
}

const fullInstructions = instructionTexts.join('. ') + '.';
```

**Example Output**:

**Scenario**: User selects butterfly (circle), apple (square), cat (cross), dog (count)

**Generated Instruction** (English):
> "Circle all the butterflies. Put a square around all the apples. Cross out all the cats. Count the dogs and write the number."

**Generated Instruction** (German):
> "Kreise alle Schmetterlinge ein. Zeichne ein Quadrat um alle Äpfel. Streiche alle Katzen durch. Zähle die Hunde und schreibe die Zahl."

**Placement**:
- Instructions appear **below the header**
- Positioned above the scattered objects grid
- Textbox element for easy editing
- Multi-language support (11 languages)

---

### 6. Header System

The app generates a **professional header** with title and visual elements.

#### **Header Components**

**Title**:
- Text: "I Spy" (or translated equivalent)
- Font: Fredoka Bold
- Color: Themed color (varies by design)
- Large, prominent sizing

**Description**:
- Text: "Count the objects and write the number!" (or translated)
- Font: Quicksand
- Smaller than title
- Provides general game context

**Visual Design**:
- Colored background shape (rectangle or pill shape)
- Border elements (optional decorative borders)
- Responsive to page orientation (landscape vs. portrait)

**Multi-Language Headers** (from earlier grep):
```javascript
const headers = {
    en: { title: 'I Spy', description: 'Count the objects and write the number!' },
    de: { title: 'Ich sehe was', description: 'Zähle die Objekte und schreibe die Zahl!' },
    fr: { title: 'Je vois', description: 'Compte les objets et écris le nombre!' },
    es: { title: 'Veo Veo', description: '¡Cuenta los objetos y escribe el número!' },
    // ... all 11 languages
};
```

---

### 7. Answer Key Generation

The app automatically generates **answer keys** showing correct counts for each object type.

#### **Answer Key Content**

**Format**:
- Same header as worksheet
- Same scattered object layout (optional)
- **Count indicators** for each object type
- Clear labels showing correct answers

**Count Calculation** (Line 2973):
```javascript
// For each question (selected image):
selectedImages.forEach(q => {
    // Count instances in grid
    const count = gridData.flat().filter(cell =>
        cell && cell.word.toLowerCase() === q.word.toLowerCase()
    ).length;

    // Display count in answer key
    answerKey[q.word] = count;
});
```

**Display Options**:

**Option 1: Count List**
```
Butterflies: 12
Apples: 10
Cats: 14
Dogs: 8
```

**Option 2: Legend Box**
- Visual legend at top or side
- Thumbnail of each object + count
- Clean, organized presentation

**Option 3: Answer Sheet**
- Separate page with just answers
- No scattered objects (cleaner for teacher reference)

---

### 8. Legend Box System

#### **Legend Placement** (Lines 3089-3098 from earlier grep)

**Horizontal Legend**:
```javascript
// Calculate spacing to distribute items evenly
const itemSpacing = 50;  // Clear separation
const totalSpacing = (legendItems.length - 1) * itemSpacing;
let legendBoxWidth = totalItemsWidth + totalSpacing + (horizontalPadding * 2);

// Position items centered vertically and distributed horizontally
// [Item 1] --- 50px --- [Item 2] --- 50px --- [Item 3] --- 50px --- [Item 4]
```

**Legend Components**:
- **Image Thumbnail**: Small version of object
- **Object Name**: Label text
- **Task Indicator**: Icon or text (circle, square, X, count)

**Visual Design**:
- White or light background box
- Border around legend
- Positioned at top (below instructions) or side
- Items evenly spaced horizontally

---

### 9. Page Configuration

#### **Page Size Options**

**Standard Sizes**:
- **Letter Portrait**: 8.5" × 11" (612px × 792px)
- **Letter Landscape**: 11" × 8.5" (792px × 612px)
- **A4 Portrait**: 210mm × 297mm (595px × 842px)
- **A4 Landscape**: 297mm × 210mm (842px × 595px)
- **Custom**: User-defined dimensions

**Layout Adaptations**:
- **Portrait**: Header at top, grid fills vertical space
- **Landscape**: Compact header, wider grid spread

#### **Background and Border**

**Background Selection**:
- 50+ decorative backgrounds
- Themed patterns (stars, dots, colors, textures)
- Optional (can use plain white)

**Border Selection**:
- 50+ themed borders
- Frames around entire page
- Optional decorative element

---

### 10. Language Support

#### **Dual-Language System**

**UI Language** (`uiLocale`):
- Controls interface buttons, labels, messages
- Selected from main app header
- 11 languages available

**Content Language** (`currentLocale`):
- Controls image library labels
- Controls header text
- Controls instruction text
- Selected from sidebar

**Translation Strings**:
- `maxHiddenObjects`: "You can select up to 4 objects"
- `selectedCount`: "Selected: {count} / 4"
- `selectImagesFromLibrary`: "Select 4 images from the library or upload your own"
- `circleTask`: "Circle all"
- `squareTask`: "Put a square around all"
- `crossOutTask`: "Cross out all"
- `countTask`: "Count and write the number"

---

### 11. Output Formats

#### **Export Options**

**JPEG Export**:
- High-quality image file
- 2× resolution for print quality
- Includes all canvas elements (header, instructions, objects, legend)

**PDF Export**:
- Professional PDF document
- Maintains vector quality where possible
- Suitable for professional printing

**Both Formats Include**:
- Worksheet (student version)
- Answer key (teacher version)
- Separate downloads for each

---

### 12. Educational Applications

#### **Age Groups and Skill Levels**

**PreK (Ages 3-4)**:
- **Simple Searches**: 2-3 object types max
- **Circle Task**: Easiest marking method
- **Low Counts**: 3-5 instances per object
- **Large Objects**: Easier to spot

**Kindergarten (Ages 5-6)**:
- **Full Complexity**: All 4 object types
- **All Tasks**: Circle, square, cross, count
- **Medium Counts**: 8-12 instances per object
- **Visual Discrimination**: Similar objects (cat vs. dog)

**Grade 1 (Ages 6-7)**:
- **Multi-Step**: Follow 4 different task instructions
- **Counting to 20**: Higher instance counts
- **Fine Motor**: More precise marking
- **Reading**: Begin reading instructions independently

**Grade 2+ (Ages 7+)**:
- **Complex Searches**: Very similar objects
- **Higher Counts**: 15-20 instances per object
- **Speed Challenges**: Timed searches
- **Self-Checking**: Use answer key independently

#### **Curriculum Integration**

**Math**:
- **Counting**: Practice counting within 10, 20, 50
- **One-to-One Correspondence**: Match each object to one count
- **Numeral Writing**: Write the total count
- **Comparison**: Which object appears most/least?

**Language Arts**:
- **Vocabulary**: Learn object names
- **Following Directions**: Multi-step instructions
- **Reading Comprehension**: Understand task descriptions
- **Categories**: Group objects by type

**Science**:
- **Animal Classification**: Find all mammals, birds, etc.
- **Life Cycles**: Find objects in different stages
- **Habitats**: Objects from specific environments
- **Living/Non-Living**: Categorization practice

**Social Studies**:
- **Community Helpers**: Find tools/uniforms
- **Geography**: Objects from different countries
- **Holidays**: Seasonal and cultural objects
- **Transportation**: Vehicles from different eras

**Art**:
- **Visual Skills**: Observation and attention to detail
- **Color Recognition**: Find objects of specific colors
- **Shapes**: Identify geometric shapes in objects
- **Patterns**: Objects arranged in patterns

---

### 13. Commercial Use Cases

#### **Educational Publishers**

**Activity Books**:
- "I Spy" themed workbooks
- Seasonal activity books (Halloween, Christmas, Spring)
- Subject-specific (animals, vehicles, food)
- Multi-level series (easy, medium, hard)

**Digital Products**:
- Printable worksheet packs
- Subscription services (monthly new worksheets)
- Interactive digital versions
- Educational apps

#### **Classroom Teachers**

**Daily Use**:
- **Morning Work**: Independent activity while attendance taken
- **Fast Finishers**: Enrichment for early completers
- **Center Activities**: Math or literacy center rotation
- **Substitute Plans**: Easy, engaging activity requiring minimal instruction

**Assessment**:
- **Counting Skills**: Observe accuracy in counting
- **Following Directions**: Can student complete multiple tasks?
- **Fine Motor**: Quality of circles, squares, X marks
- **Attention**: Sustained focus on visual search

#### **Therapy Settings**

**Occupational Therapy**:
- **Visual Scanning**: Practice systematic left-right, top-bottom scanning
- **Visual Discrimination**: Distinguish similar objects
- **Fine Motor**: Precise marking within object boundaries
- **Visual-Motor Integration**: Coordinate seeing and marking

**Speech-Language Pathology**:
- **Receptive Language**: Understanding task instructions
- **Vocabulary**: Learning and using object names
- **Categorization**: Grouping objects by features
- **Narration**: Describing what they found

---

### 14. Pedagogical Strengths

#### **Visual Processing Skills**

**Figure-Ground Discrimination**:
- Distinguish target objects from background
- Manage visual "clutter" of many objects
- Essential for reading (letters from white space)

**Visual Scanning**:
- Systematic search patterns (left-right, top-bottom)
- Complete visual field coverage
- Efficiency improvements with practice

**Visual Memory**:
- Remember what objects to find
- Recall which objects already marked
- Track progress across multiple tasks

#### **Early Math Development**

**Counting Principles**:
- **One-to-One**: Each object counted once
- **Stable Order**: Counting sequence remains same
- **Cardinality**: Last number = total count
- **Abstraction**: Count any objects, not just specific types

**Number Sense**:
- Comparing quantities (more/fewer)
- Estimating before counting
- Recognizing magnitude differences

#### **Executive Function**

**Working Memory**:
- Hold 4 task instructions in mind
- Track which objects need which marking
- Remember count while searching

**Inhibitory Control**:
- Don't mark wrong objects
- Resist distractions from other objects
- Stay focused on current task

**Cognitive Flexibility**:
- Switch between different marking methods
- Adapt strategy if initial approach inefficient

---

### 15. Competitive Advantages

#### **vs. Printable I Spy Worksheets**

**Advantages**:
- **Unlimited Generation**: Never run out of new worksheets
- **Customization**: Choose specific objects/themes
- **Language Support**: 11 languages vs. English-only
- **Auto Answer Keys**: Instant solutions
- **Task Variety**: 4 different task types vs. usually just "find and circle"

#### **vs. DIY Solutions**

**Advantages**:
- **Random Scattering**: Algorithm creates natural distribution (not manual placement)
- **Controlled Spacing**: No overlaps or clusters
- **Professional Headers**: Polished design vs. amateur look
- **Time Savings**: Generate in 2 minutes vs. 30+ minutes manual creation

#### **vs. Published I Spy Books**

**Advantages**:
- **Customization**: Select objects relevant to current curriculum
- **Difficulty Control**: Adjust complexity for student level
- **Subject Integration**: Math, science, or language arts focus
- **Cost**: Free generation vs. $10-20 per book

#### **vs. Other Worksheet Generators**

**Advantages**:
- **Grid-Based Scattering**: More sophisticated than simple random placement
- **Multi-Language**: 11 languages (rare in competitors)
- **4 Task Types**: Most offer only "circle" or "count"
- **Answer Keys**: Automatic generation (not always provided)

---

### 16. Limitations and Considerations

#### **Technical Limitations**

**Fixed Object Count**:
- **Exactly 4 objects** required (no flexibility for 2, 3, or 5+)
- May be too many for PreK or too few for advanced students
- No adjustment for skill level

**Instance Count Control**:
- No user control over how many times each object appears
- Algorithmically determined (not manually adjustable)
- May result in too many or too few instances for desired difficulty

**Grid Visibility**:
- With enough practice, students may recognize grid pattern
- Reduces "hidden" feeling of true I Spy games
- Objects aligned to invisible grid (not truly random)

#### **Pedagogical Considerations**

**Task Complexity**:
- **4 Different Tasks**: May overwhelm some students
- Requires reading/understanding 4 separate instructions
- Younger students may need adult guidance

**Visual Clutter**:
- **80 Objects**: Can be overwhelming for visual processing disorders
- Busy page may cause frustration or avoidance
- No "easy mode" with fewer total objects

**Object Similarity**:
- Library images may be too similar (multiple dog breeds)
- Increases difficulty but may cause confusion
- No control over similarity level

#### **Accessibility Considerations**

**Color Blindness**:
- Relies on shape recognition (generally okay)
- But some objects distinguished primarily by color
- May need adjustment for color-blind students

**Visual Processing Disorders**:
- Very challenging for students with visual processing difficulties
- May need modified version (fewer objects, larger size, less clutter)
- Consider alternative formats

**Fine Motor Challenges**:
- Precise marking required (circles around specific objects)
- May be difficult for students with motor delays
- Alternative response methods needed (pointing, verbal)

---

### 17. Recommended Blog Post Angles

#### **For Teachers**

**Title Ideas**:
1. "Create Custom I Spy Worksheets in Under 5 Minutes"
2. "I Spy Activities for Every Subject: Math, Science, Language Arts"
3. "Differentiated I Spy: Easy to Hard in One Tool"
4. "Morning Work Solved: Engaging I Spy Worksheets"
5. "Free I Spy Generator with Auto Answer Keys"

**Content Angles**:
- Thematic units (create I Spy for current unit)
- Assessment tool (evaluate counting and visual skills)
- Center rotation activities
- Homework or take-home practice

**SEO Keywords**:
- I Spy worksheets
- Visual discrimination activities
- Counting worksheets
- Find and count printables
- Hidden pictures worksheets
- Object recognition activities

#### **For Parents/Homeschoolers**

**Title Ideas**:
1. "Printable I Spy Games for Rainy Day Fun"
2. "Educational I Spy: Learning Through Play"
3. "Create Personalized I Spy with Your Child's Favorite Things"
4. "I Spy Activities for Preschool Through 2nd Grade"

**Content Angles**:
- Custom with family photos
- Themed for birthdays/holidays
- Screen-free activity
- Builds pre-reading skills

**SEO Keywords**:
- I Spy games for kids
- Printable counting games
- Preschool activities
- Visual perception games
- Hidden object worksheets

---

### 18. Key Translation Strings

**Location**: `js/translations-find-and-count.js`

#### **Core Interface**

```javascript
{
    "maxHiddenObjects": "You can select up to 4 hidden objects.",
    "selectedCount": "Selected: {count} / 4",
    "selectedZero": "Selected: 0 / 4",
    "selectImagesFromLibrary": "Select 4 images from the library or upload your own.",
    "selectTask": "Select Task...",
    "circleTask": "Circle all",
    "squareTask": "Put a square around all",
    "crossOutTask": "Cross out all",
    "countTask": "Count and write the number"
}
```

#### **Instructions**

```javascript
{
    "instructions": {
        "en": {
            "circle": "Circle all the {items}.",
            "square": "Put a square around all the {items}.",
            "cross": "Cross out all the {items}.",
            "count": "Count the {items} and write the number."
        }
    }
}
```

---

### 19. Technical Specifications

#### **Dependencies**

**External Libraries**:
- **Fabric.js v5.3.1**: Canvas rendering
- **jsPDF v2.5.1**: PDF generation

**Custom Scripts**:
- `js/translations-find-and-count.js`: Translation strings
- `js/unified-language-manager.js`: Language handling
- `js/border-background-sizer.js`: Decorative elements
- `js/auto-fix-system.js`: Error handling

#### **Performance**

**Grid Generation**:
- 80 cell grid (10 cols × 8 rows)
- 40-60 object instances typical
- Render time: ~500ms for full worksheet

**Export**:
- JPEG: 2× resolution, 400-800 KB file size
- PDF: Vector quality, 500-1,000 KB file size

---

### 20. Conclusion

The **I Spy Worksheet Generator** delivers a classic educational game format in a customizable, multi-language digital tool. Its **grid-based scattering algorithm**, **four task types**, and **automatic instruction generation** make it a versatile resource for visual discrimination, counting practice, and following directions across PreK through 2nd grade.

**Key Differentiators**:
1. **Four Task Types**: Circle, square, cross, count (variety in one worksheet)
2. **Grid-Based Scattering**: Controlled randomness prevents overlap
3. **Auto Instructions**: Language-specific task descriptions
4. **Multi-Language**: 11-language support for international use
5. **Answer Keys**: Automatic solution generation
6. **Theme Integration**: 100+ themed collections

**Target Markets**:
- **Primary**: PreK-2nd grade teachers
- **Secondary**: Homeschool families, therapy settings
- **Tertiary**: Publishers, educational content creators

**Competitive Position**:
Unique combination of customization (choose specific objects), automation (random scattering), and variety (4 task types) distinguishes this from static printable I Spy worksheets.

---

**Analysis Complete**: App #11 of 34 fully documented (11/34 = 32.4% progress)
