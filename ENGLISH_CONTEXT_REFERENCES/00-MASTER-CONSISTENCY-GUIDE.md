# Master UI Consistency Guide - All 33 Apps

**Purpose**: Define standard terminology, patterns, and tone that MUST be consistent across all worksheet generator apps
**Date Created**: 2025-11-25
**Status**: Living document - updated as patterns emerge

---

## CORE PRINCIPLE

**User Experience Goal**: A K-2 teacher who learns one app should immediately understand all 33 apps
- Same words for same features
- Same structure and organization
- Same tone and friendliness
- Predictable behavior

---

## STANDARD USER PERSONA (ALL APPS)

**Primary User**: K-2 Elementary School Teachers
**Age of Students**: 5-8 years old
**Context**: Creating printable educational worksheets
**Environment**: Desktop/laptop browser
**Skill Level**: Varying tech comfort, needs clarity
**Time Pressure**: Often creating worksheets quickly

### Tone Requirements (ALL APPS):
- ✅ Professional but friendly
- ✅ Clear and instructional (not technical)
- ✅ Action-oriented (buttons clearly state what happens)
- ✅ Educational terminology (not software jargon)
- ✅ Encouraging (exclamation marks for success messages)
- ❌ Never robotic or overly formal
- ❌ Never use technical/developer terminology

---

## STANDARD UI STRUCTURE (ALL APPS)

### Layout Pattern:
```
┌─────────────┬────────────────────────────┐
│   SIDEBAR   │      CANVAS AREA          │
│   (340px)   │                           │
│             │  ┌──────────────────────┐ │
│  Settings   │  │  Action Buttons      │ │
│  Accordions │  └──────────────────────┘ │
│             │                           │
│             │  ┌──────────────────────┐ │
│             │  │                      │ │
│             │  │   Canvas/Preview     │ │
│             │  │                      │ │
│             │  └──────────────────────┘ │
└─────────────┴────────────────────────────┘
```

### Sidebar Structure (STANDARD ORDER):
1. **Worksheet Content Settings** (Language selector)
2. **Page Setup** (Size, backgrounds, borders)
3. **Text Tools** (Add and style text)
4. **[App-Specific Configuration]** (Exercise, content, etc.)
5. **[Content Library]** (Images, words, etc.)
6. **Upload Custom [Content]** (User uploads)

### Action Bar (Top of Canvas):
- **Left side**: Unlock All (if applicable)
- **Center**: Generate dropdown, Download dropdown
- **Right side**: Clear All (danger button)

---

## SECTION 1: COMMON UI ELEMENTS - MANDATORY CONSISTENCY

### 1.1 Language Selection

| Key | English Standard | Notes |
|-----|-----------------|-------|
| `worksheetContentSettings` | "Worksheet Content Settings" | Accordion header |
| `worksheetContentLanguage` | "Worksheet Content Language:" | Label with colon |

**Consistency Rule**: Every app MUST use identical wording for language settings.

---

### 1.2 Page Setup Section

#### Accordion Header
| Key | English Standard | Notes |
|-----|-----------------|-------|
| `pageSetup` | "Page Setup" | NEVER "Page Configuration" or "Page Settings" |

#### Page Size Options
| Key | English Standard | Notes |
|-----|-----------------|-------|
| `pageSize` | "Page Size:" | Label with colon |
| `letterPortrait` | "Letter Portrait (612×792)" | US standard, dimensions shown |
| `letterLandscape` | "Letter Landscape (792×612)" | US standard, dimensions shown |
| `a4Portrait` | "A4 Portrait (595×842)" | International, dimensions shown |
| `a4Landscape` | "A4 Landscape (842×595)" | International, dimensions shown |
| `square` | "Square (1200×1200)" | Dimensions shown |
| `custom` | "Custom" | Simple, one word |

**Translation Note**: German MUST add "DIN" prefix to A4 → "DIN A4 Hochformat"

#### Custom Size Fields
| Key | English Standard | Notes |
|-----|-----------------|-------|
| `widthPx` | "Width (px):" | Include unit in parentheses |
| `heightPx` | "Height (px):" | Include unit in parentheses |
| `pageColor` | "Page Color:" | NOT "Background Color" |
| `applySize` | "Apply Size" | Action button |

#### Background Subsection
| Key | English Standard | Notes |
|-----|-----------------|-------|
| `background` | "Background" | Subsection header (h4) |
| `backgroundTheme` | "Background Theme:" | Label with colon |
| `selectBackgroundTheme` | "Select a theme for backgrounds." | Complete sentence, period |
| `backgroundOpacity` | "Background Opacity:" | NOT "Transparency" |

#### Border Subsection
| Key | English Standard | Notes |
|-----|-----------------|-------|
| `border` | "Border" | Subsection header (h4) |
| `borderTheme` | "Border Theme:" | Label with colon |
| `selectBorderTheme` | "Select a theme to see borders." | Complete sentence, period |
| `borderOpacity` | "Border Opacity:" | NOT "Transparency" |

#### Shared Option
| Key | English Standard | Notes |
|-----|-----------------|-------|
| `none` | "None" | Used in both background and border dropdowns |

**Consistency Rule**: All apps with page setup MUST use identical terminology.

---

### 1.3 Text Tools Section

| Key | English Standard | Notes |
|-----|-----------------|-------|
| `textTools` | "Text Tools" | Accordion header |
| `addNewText` | "Add New Text" | Subsection header (h4) |
| `content` | "Content:" | Label for text input |
| `addText` | "Add Text" | Action button |
| `selectedTextProperties` | "Selected Text Properties" | Subsection header (h4) |
| `color` | "Color:" | Simple noun |
| `size` | "Size:" | Simple noun |
| `font` | "Font:" | Simple noun |
| `outlineColor` | "Outline Color:" | NOT "Stroke Color" |
| `outlineWidth` | "Outline Width (0-10):" | Include range |

**Consistency Rule**: Text editing features MUST use identical terms across all apps.

---

### 1.4 Canvas Toolbar (Layer Controls)

| Key | English Standard | Notes |
|-----|-----------------|-------|
| `bringToFront` | "Bring to Front" | Topmost layer |
| `bringForward` | "Bring Forward" | Up one layer |
| `sendBackward` | "Send Backward" | Down one layer |
| `sendToBack` | "Send to Back" | Bottom layer |

**Consistency Rule**: Layer controls MUST use identical wording.

---

### 1.5 Canvas Toolbar (Alignment Controls)

| Key | English Standard | Notes |
|-----|-----------------|-------|
| `alignSelected` | "Align Selected:" | Label with colon |
| `alignLeft` | "Align Left" | Object alignment |
| `centerHorizontally` | "Center Horizontally" | Object alignment |
| `alignRight` | "Align Right" | Object alignment |
| `alignTop` | "Align Top" | Object alignment |
| `centerVertically` | "Center Vertically" | Object alignment |
| `alignBottom` | "Align Bottom" | Object alignment |
| `alignToPage` | "Align to Page:" | Label with colon |
| `centerOnPageHorizontally` | "Center on Page (H)" | Page alignment |
| `centerOnPageVertically` | "Center on Page (V)" | Page alignment |

**Consistency Rule**: Alignment controls MUST use identical wording.

---

### 1.6 Tab System

| Key | English Standard | Notes |
|-----|-----------------|-------|
| `worksheet` | "Worksheet" | Tab for main content |
| `answerKey` | "Answer Key" | Tab for solutions |

**Consistency Rule**:
- ALWAYS "Worksheet" (not "Exercise Sheet", "Activity Sheet", etc.)
- ALWAYS "Answer Key" (not "Solutions", "Answers", "Answer Sheet")

---

### 1.7 Lock/Unlock Controls

| Key | English Standard | Notes |
|-----|-----------------|-------|
| `lockUnlock` | "Lock/Unlock" | Toolbar button label |
| `unlockAll` | "Unlock All" | Action bar button |

**Consistency Rule**: Lock features MUST use identical wording.

---

### 1.8 Main Action Buttons

#### Generate Actions
| Key | English Standard | Translation Note |
|-----|-----------------|------------------|
| `generate` | "Generate" | **Translations MUST use "Create" family** |
| `generateWorksheet` | "Generate Worksheet" | **Translations MUST use "Create" family** |
| `generateAnswerKey` | "Generate Answer Key" | **Translations MUST use "Create" family** |

**CRITICAL TRANSLATION RULE**:
- English code uses "Generate" (internal)
- ALL translations MUST use "Create" family (natural for teachers):
  - German: "Erstellen"
  - French: "Créer"
  - Spanish: "Crear"
  - Italian: "Crea"
  - Portuguese: "Criar"
  - Dutch: "Maken"
  - Swedish: "Skapa"
  - Danish: "Opret"
  - Norwegian: "Opprett"
  - Finnish: "Luo"
- NEVER use "Generate" family in translations (sounds robotic/technical)

#### Download Actions
| Key | English Standard | Notes |
|-----|-----------------|-------|
| `download` | "Download" | Dropdown button |
| `worksheetJpeg` | "Worksheet (JPEG)" | Format in parentheses |
| `answerKeyJpeg` | "Answer Key (JPEG)" | Format in parentheses |
| `worksheetPdf` | "Worksheet (PDF)" | Format in parentheses |
| `answerKeyPdf` | "Answer Key (PDF)" | Format in parentheses |
| `grayscale` | "Grayscale" | Checkbox option |

**Consistency Rule**: Download options MUST use identical format "(JPEG)" or "(PDF)".

#### Clear Action
| Key | English Standard | Notes |
|-----|-----------------|-------|
| `clearAll` | "Clear All" | Danger button (red) |

**Consistency Rule**: "Clear All" (not "Reset", "Delete All", "Remove All")

---

## SECTION 2: COMMON SUCCESS MESSAGES

### Success Message Patterns

| Key | English Standard | Tone |
|-----|-----------------|------|
| `textAddedToWorksheet` | "Text added to worksheet." | Past tense, period, calm |
| `formCleared` | "Form cleared." | Past tense, period, calm |
| `worksheetGeneratedSuccessfully` | "Worksheet generated successfully!" | Past tense, exclamation, enthusiastic |
| `answerKeyGenerated` | "Answer key generated successfully!" | Past tense, exclamation, enthusiastic |
| `downloadInitiated` | "Download initiated." | Formal, period, calm |
| `pdfDownloaded` | "PDF downloaded successfully!" | Exclamation, enthusiastic |

**Tone Rules**:
- ✅ Small actions (add text, clear form): Period, calm confirmation
- ✅ Major actions (generate, download): Exclamation mark, enthusiastic
- ✅ Past tense for confirmation
- ✅ "successfully" for major actions

---

## SECTION 3: COMMON ERROR MESSAGES

### Error Message Patterns

| Pattern | English Example | Tone |
|---------|----------------|------|
| Selection errors | "Max {} image(s) selected." | Factual, informational |
| Not found errors | "No images found." | Neutral, period |
| Empty state errors | "No images available." | Neutral, period |
| Action required errors | "Please select images first" | Polite, "Please..." |
| Loading errors | "Could not load themes." | Neutral technical |
| Technical errors | "Error loading images." | Brief technical |
| Prerequisite errors | "Please generate worksheet first." | Polite instruction |
| Export errors | "Error creating JPEG." | Brief technical |

**Tone Rules**:
- ✅ Polite ("Please...") when user needs to do something
- ✅ Neutral for technical failures
- ✅ No exclamation marks in error messages
- ✅ Complete sentences with periods

---

## SECTION 4: COMMON LOADING STATES

### Loading Message Patterns

| Key | English Standard | Pattern |
|-----|-----------------|---------|
| `searching` | "Searching..." | Present continuous + ellipsis |
| `loadingImages` | "Loading images..." | Present continuous + ellipsis |
| `loadingImagesForTheme` | "Loading images for theme..." | Present continuous + ellipsis |
| `loadingBorders` | "Loading borders..." | Present continuous + ellipsis |
| `loadingBackgrounds` | "Loading backgrounds..." | Present continuous + ellipsis |
| `preparingFile` | "Preparing file..." | Present continuous + ellipsis |

**Pattern Rules**:
- ✅ ALWAYS use present continuous ("-ing")
- ✅ ALWAYS include ellipsis (...)
- ✅ Lowercase (not "Loading Images...")
- ✅ Generic (not overly specific)

---

## SECTION 5: UPLOAD FUNCTIONALITY

### Upload Section Standard Terms

| Key | English Standard | Notes |
|-----|-----------------|-------|
| `uploadCustomImages` | "Upload Custom Images" | Accordion header pattern |
| `uploadCustom[Type]` | Pattern for other apps | e.g., "Upload Custom Words" |
| `selectImagesToUpload` | "Select image(s) to upload:" | Pattern with (s) for plural |
| `chooseFiles` | "Choose Files" | Button label, plural |
| `noFileChosen` | "No file chosen" | Initial state, singular |
| `filesSelected` | "{} file(s) selected" | Post-selection, handles plural |
| `yourUploadedImages` | "Your Uploaded Images (This Session):" | Possessive, temporary note |
| `uploadedImagesWillAppearHere` | "Your uploaded images will appear here." | Future tense, helpful |

**Pattern Rules**:
- ✅ "Upload Custom [Type]" for accordion header
- ✅ "Choose Files" (plural) for button
- ✅ "(This Session)" to clarify temporary storage
- ✅ Possessive "Your" to personalize

---

## SECTION 6: FONT NAMES

### CRITICAL RULE: NEVER TRANSLATE FONT NAMES

Font names are **proper nouns** and must NEVER be translated:

| Font Key | English | All Languages |
|----------|---------|---------------|
| `fontArial` | Arial | Arial ✅ |
| `fontComicSans` | Comic Sans MS | Comic Sans MS ✅ |
| `fontCourier` | Courier New | Courier New ✅ |
| `fontGeorgia` | Georgia | Georgia ✅ |
| `fontTahoma` | Tahoma | Tahoma ✅ |
| `fontTimes` | Times New Roman | Times New Roman ✅ |
| `fontTrebuchet` | Trebuchet MS | Trebuchet MS ✅ |
| `fontVerdana` | Verdana | Verdana ✅ |
| `fontPalatino` | Palatino | Palatino ✅ |

**Consistency Rule**: Font names are IDENTICAL in all languages.

---

## SECTION 7: EDUCATIONAL TERMINOLOGY STANDARDS

### Worksheet vs Activity Sheet vs Exercise Sheet

**STANDARD TERM**: "Worksheet"

✅ **Always Use**: "Worksheet"
- English: Worksheet
- German: Arbeitsblatt
- French: Fiche d'exercices
- Spanish: Ficha
- Italian: Scheda
- Portuguese: Folha de exercícios
- Dutch: Werkblad
- Swedish: Arbetsblad
- Danish: Opgaveark
- Norwegian: Oppgaveark
- Finnish: Tehtävämoniste

❌ **Never Use**:
- "Activity Sheet" (too vague)
- "Exercise Sheet" (too formal)
- "Problem Sheet" (negative connotation)

### Answer Key vs Solutions vs Answers

**STANDARD TERM**: "Answer Key"

✅ **Always Use**: Proper educational term for solutions sheet
- English: Answer Key
- German: Lösungsblatt
- French: Corrigé
- Spanish: Hoja de respuestas
- Italian: Soluzioni
- Portuguese: Folha de respostas
- Dutch: Antwoordblad
- Swedish: Facit
- Danish: Svarark
- Norwegian: Fasit
- Finnish: Vastausavain

❌ **Never Use**:
- "Answers" (too simple, not professional)
- "Solutions" (too generic)
- "Answer Sheet" (ambiguous - could be student's answer sheet)

### Exercise vs Problem vs Question

**CONTEXT-DEPENDENT**:
- Math apps: "Exercise" or "Problem" (both acceptable)
- Word apps: "Exercise"
- Puzzle apps: "Puzzle" or "Exercise"

**Current Standard**: "Exercise" is most universal
- More positive than "Problem"
- More specific than "Question"
- Familiar to K-2 teachers

---

## SECTION 8: REGIONAL VARIANTS

### Portuguese: MUST BE BRAZILIAN (PT-BR)

**CRITICAL**: All Portuguese translations MUST use Brazilian Portuguese (PT-BR), NOT European Portuguese (PT-PT).

#### Common PT-PT → PT-BR Conversions:

| Concept | PT-PT (WRONG) | PT-BR (CORRECT) |
|---------|---------------|-----------------|
| Font | Tipo de Letra | **Fonte** |
| Download | Descarregar | **Baixar** |
| File | Ficheiro | **Arquivo** |
| Screen | Ecrã | **Tela** |
| Mouse | Rato | **Mouse** |
| Mobile | Telemóvel | **Celular** |
| Save | Guardar | **Salvar** |
| Loading | A carregar | **Carregando** |
| Searching | A pesquisar | **Pesquisando** |
| Preparing | A preparar | **Preparando** |

**Pattern Rule**: PT-PT uses "A + infinitive" for gerunds → PT-BR uses "-ndo" ending

### German: Cultural Conventions

**CRITICAL**: German paper sizes MUST include "DIN" prefix

| Size | Other Languages | German (REQUIRED) |
|------|----------------|-------------------|
| A4 Portrait | A4 Portrait | **DIN A4 Hochformat** |
| A4 Landscape | A4 Landscape | **DIN A4 Querformat** |

### French: Typography Rules

**CRITICAL**: French MUST have space before certain punctuation

✅ **Correct French**:
- "Nom :" (space before colon)
- "Couleur :" (space before colon)
- "Créer !" (space before exclamation)
- "Créé ?" (space before question mark)

❌ **Incorrect**:
- "Nom:" (no space)
- "Créer!" (no space)

### Spanish: Punctuation Rules

**CRITICAL**: Spanish MUST use inverted punctuation for questions and exclamations

✅ **Correct Spanish**:
- "¡Éxito!" (inverted exclamation)
- "¿Cómo?" (inverted question)

---

## SECTION 9: BUTTON TEXT PATTERNS

### Button Wording Standards

**Format**: `[Action Verb] + [Object]`

Examples:
- ✅ "Add Text" (not "Text Addition")
- ✅ "Apply Size" (not "Size Application")
- ✅ "Choose Files" (not "File Selection")
- ✅ "Generate Worksheet" (not "Worksheet Generation")

**Rules**:
- ✅ Start with action verb (imperative)
- ✅ Include object being acted upon
- ✅ Keep brief (1-3 words ideally)
- ❌ Don't use gerunds ("-ing") in buttons
- ❌ Don't use passive voice

---

## SECTION 10: LABEL PATTERNS

### Label Formatting Standards

**Format**: `[Descriptor] + :`

Examples:
- ✅ "Page Size:" (ends with colon)
- ✅ "Background Theme:" (ends with colon)
- ✅ "Content:" (ends with colon)

**Rules**:
- ✅ ALWAYS end labels with colon
- ✅ Use sentence case (not title case)
- ✅ Be concise
- ❌ Don't use questions in labels
- ❌ Don't use complete sentences

**Exception**: Section headers (h2, h3, h4) do NOT use colons

---

## SECTION 11: ACCORDION HEADER PATTERNS

### Accordion Naming Standards

**Format**: `[Category] + [Type]`

Examples from Addition:
- ✅ "Worksheet Content Settings"
- ✅ "Page Setup"
- ✅ "Text Tools"
- ✅ "Exercise Configuration"
- ✅ "Image Library"
- ✅ "Upload Custom Images"

**Rules**:
- ✅ Use nouns (not verbs)
- ✅ Be descriptive but concise
- ✅ Use parallel structure across accordions
- ❌ Don't use colons
- ❌ Don't use questions

---

## SECTION 12: PLACEHOLDER TEXT

### Input Field Placeholders

**Rules**:
- ✅ Use example content (e.g., "Search..." or "Hello!")
- ✅ Keep very brief
- ✅ Use ellipsis for search fields
- ✅ Use friendly content for text fields
- ❌ Don't use instructions (label handles that)
- ❌ Don't use "Enter..." or "Type..." prefixes

---

## CONSISTENCY CHECKLIST FOR EACH NEW APP

Before creating English reference for a new app, verify:

### ✅ Terminology Consistency
- [ ] Uses "Worksheet" (not alternatives)
- [ ] Uses "Answer Key" (not alternatives)
- [ ] Uses "Generate" in English (but note translations use "Create")
- [ ] Uses "Clear All" (not alternatives)
- [ ] Uses consistent page size names
- [ ] Uses consistent upload terminology

### ✅ Structural Consistency
- [ ] Sidebar width: 340px
- [ ] Accordion sections in logical order
- [ ] Action bar at top of canvas
- [ ] Tab system (if applicable)

### ✅ Tone Consistency
- [ ] Success messages end with exclamation marks
- [ ] Error messages use "Please..." when needed
- [ ] Loading states use present continuous + ellipsis
- [ ] Button text uses imperative verbs

### ✅ Translation Notes Included
- [ ] Flagged "Generate" → "Create" conversion
- [ ] Flagged "Answer Key" proper terminology
- [ ] Flagged font names as non-translatable
- [ ] Flagged any regional variants (PT-BR, German DIN)
- [ ] Flagged any cultural conventions (French typography, etc.)

---

## VERSION CONTROL

**Version**: 1.0
**Date**: 2025-11-25
**Based on**: Addition app analysis
**Status**: Active standard for all 33 apps

### Update Log:
- 2025-11-25: Initial version based on Addition app

### Review Process:
- After each app analyzed, check if new patterns emerge
- Update this guide if common elements appear
- Flag inconsistencies found in existing apps
- Maintain backwards compatibility where possible

---

**This guide is the SOURCE OF TRUTH for UI consistency across all 33 worksheet generator apps.**
