# Word Guess App - Feature Analysis

## Source: REFERENCE APPS/word guess.html

## App Overview
Word Guess is an image-based word guessing puzzle generator. Students see images and must guess the word, with optional letter clues.

## Core Features (from actual code analysis)

### 1. Language Settings (Line 681-696)
- 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish
- Language affects how words are generated from image filenames
- UI fully translated

### 2. Page Setup (Line 704-735)
**Page Sizes:**
- Letter Portrait (612×792)
- Letter Landscape (792×612)
- A4 Portrait (595×842)
- A4 Landscape (842×595)
- Square (1200×1200)
- Custom dimensions

**Decoration:**
- Page color customization
- Background themes with opacity slider
- Border themes with opacity slider

### 3. Text Tools (Line 740-758)
- Add custom text anywhere on canvas
- Text color picker
- Font size control
- Font selection: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana
- Text outline color and width (0-10)

### 4. Exercise Configuration (Line 763-791)
**Puzzle Count:**
- 1 to 10 puzzles per worksheet

**Difficulty Levels (Letter Clues):**
- No clues (students must guess entire word)
- Easy (1/2 letters shown)
- Normal (1/4 letters shown)
- Tough (1/6 letters shown)

**Other Options:**
- Exclude specific letters from clues
- Letter case: Uppercase or Lowercase
- Include Name & Date field (checkbox)
- Include Exercise Numbers (checkbox, default on)

### 5. Image Library (Line 795-807)
- Theme selection dropdown
- Search functionality
- 3000+ child-friendly images
- Shows selected images preview
- Images organized by themes

### 6. Upload Custom Images (Line 810-822)
- Multi-file upload support
- Custom file button
- Preview of uploaded images
- Combine uploaded images with library images

### 7. Manual Image Name Editing (Line 826-841)
- Toggle to enable/disable
- Edit image names before generating
- Click images to add them to editing area
- Allows creating custom clues/words

### 8. Custom Word List (Line 845-859)
- Toggle to use custom words instead of images
- Text area for entering words
- One word per line
- Maximum 8 words
- Overrides image-based word generation

### 9. Canvas Editing Features
**Object Manipulation:**
- Drag, rotate, scale any element
- Delete objects
- Bring to Front/Forward
- Send Backward/Back

**History:**
- Undo/Redo functionality
- Zoom controls (zoom in/out, fit to view)
- Unlock All objects

### 10. Generation & Download (Line 937-957)
**Generate:**
- New Worksheet button
- Answer Key button (shows completed words)

**Download Options:**
- Worksheet (JPEG)
- Worksheet (PDF)
- Answer Key (JPEG)
- Answer Key (PDF)
- Grayscale toggle for ink-saving

## How Word Guess Works

1. **Select Images**: Choose 1-8 images from library or upload custom
2. **Configure Puzzle**: Set number of puzzles, difficulty, letter case
3. **Generate**: App creates grid showing images with blank letter boxes below
4. **Letter Clues**: Based on difficulty, some letters are pre-filled as clues
5. **Students Fill**: Students guess words and write missing letters
6. **Answer Key**: Shows completed words for teacher verification

## Key Educational Value

- **Vocabulary Building**: Students learn word spellings by connecting images to words
- **Letter Recognition**: Practice identifying and writing specific letters
- **Spelling Practice**: Reinforces correct spelling patterns
- **Visual Learning**: Images provide context clues for word meaning
- **Differentiation**: Difficulty levels accommodate various skill levels
- **Multilingual**: Works in 11 languages for ESL/language learning

## Unique Features

1. **Difficulty Control**: Precise control over how many letter clues to show
2. **Exclude Letters**: Can exclude confusing letters (like b/d) from clues
3. **Custom Words**: Manual editing or custom word list for targeted vocabulary
4. **Letter Case Options**: Practice uppercase or lowercase writing
5. **Name/Date Field**: Track student work and progress
