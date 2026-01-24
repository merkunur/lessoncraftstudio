# PHASE 0: Addition App - Granular Step-by-Step Plan
## 100+ Discrete, Verifiable Steps

**App**: Addition
**Total Steps**: ~100 discrete actions
**Each step**: 3-10 minutes, single focus, clear deliverable

---

## BLOCK 1: PREPARATION & SETUP (Steps 1-5, ~15 minutes)

### Step 1: Create Working Directory (2 minutes)
**Action**: Create folder structure for Addition app analysis
**Commands**:
```bash
mkdir "C:\Users\rkgen\lessoncraftstudio\ANALYSIS\Addition"
mkdir "C:\Users\rkgen\lessoncraftstudio\ANALYSIS\Addition\context"
mkdir "C:\Users\rkgen\lessoncraftstudio\ANALYSIS\Addition\issues"
mkdir "C:\Users\rkgen\lessoncraftstudio\ANALYSIS\Addition\fixes"
```
**Success Criteria**: Folders exist
**Deliverable**: Folder structure created

### Step 2: Copy Source Translation File (2 minutes)
**Action**: Copy addition translation file to working directory
**Command**:
```bash
copy "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-addition-complete.js" "C:\Users\rkgen\lessoncraftstudio\ANALYSIS\Addition\translations-addition-ORIGINAL.js"
```
**Success Criteria**: File copied, can read it
**Deliverable**: Backup of original file

### Step 3: Get Basic File Statistics (3 minutes)
**Action**: Count lines, get file size, count languages
**Commands**:
```bash
# Count total lines
# Count language blocks (should be 11)
# Get file size
```
**Success Criteria**: Know exact line count, verify 11 languages present
**Deliverable**: File statistics document

### Step 4: Extract English Section Only (3 minutes)
**Action**: Read and save English section separately for reference
**Success Criteria**: English section extracted (lines 1-165 approx)
**Deliverable**: `Addition-English-REFERENCE.txt`

### Step 5: Create Issues Tracking Template (5 minutes)
**Action**: Create structured template for tracking issues
**Template**:
```markdown
# Addition Translation Issues Log

## Language: [LANGUAGE_NAME]
## Date Analyzed: [DATE]
## Analyst: Claude

### Category A: Glossary Violations
| Line | Key | Current Value | Should Be | Severity |
|------|-----|---------------|-----------|----------|

### Category B: Unnatural Phrasing
| Line | Key | Issue | Suggested Fix | Rationale |
|------|-----|-------|---------------|-----------|

### Category C: Context Mismatch
[Same structure]

### Category D: Cultural Issues
[Same structure]

### Category E: Professional Quality
[Same structure]

### Category F: Language Contamination
[Same structure]

## Summary
- Total Issues:
- Category Breakdown:
```
**Success Criteria**: Template created and saved
**Deliverable**: `Issue-Tracking-Template.md`

**CHECKPOINT 1**: User confirms folder structure and template are acceptable

---

## BLOCK 2: ENGLISH CONTEXT MAPPING (Steps 6-25, ~60 minutes)

### Step 6: Read English Section Completely (5 minutes)
**Action**: Read all English translations to understand full scope
**Success Criteria**: Familiar with all UI elements
**Deliverable**: Mental model of app structure

### Step 7-26: Map Each English Key to Context (20 steps, 2-3 min each)
**For each group of 10 keys**:

**Step 7**: Keys 1-10 - Core App Metadata
**Action**: Document context for:
- app.title
- worksheetSettings
- languageSettings
- language
- lang_en through lang_fi

**Format**:
```markdown
### Key: app.title
- **English**: "Illustrated Addition Worksheet Generator"
- **UI Element**: Browser tab title, page header
- **User Sees**: Always visible, first impression
- **Context**: Professional title for educational software
- **User Intent**: Understand what this tool does
- **Tone Needed**: Professional, clear, descriptive
- **Translation Guidance**: Must sound professional in all languages
```

**Success Criteria**: All 10 keys mapped with full context
**Deliverable**: `Context-Keys-001-010.md`

**Step 8**: Keys 11-20 - Page Setup Controls
**Keys**: pageSetup, pageSize, letterPortrait, letterLandscape, a4Portrait, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-011-020.md`

**Step 9**: Keys 21-30 - Page Customization
**Keys**: square, custom, widthPx, heightPx, pageColor, applySize, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-021-030.md`

**Step 10**: Keys 31-40 - Background & Themes
**Keys**: background, backgroundTheme, none, selectThemeForBackgrounds, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-031-040.md`

**Step 11**: Keys 41-50 - Border Controls
**Keys**: border, borderTheme, selectThemeToSeeBorders, borderOpacity, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-041-050.md`

**Step 12**: Keys 51-60 - Text Tools Part 1
**Keys**: textTools, addNewText, content, helloPlaceholder, addText, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-051-060.md`

**Step 13**: Keys 61-70 - Text Tools Part 2
**Keys**: selectedTextProperties, color, size, font, outlineColor, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-061-070.md`

**Step 14**: Keys 71-80 - Exercise Configuration Part 1
**Keys**: exerciseConfiguration, numberOfExercises, sumRange, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-071-080.md`

**Step 15**: Keys 81-90 - Exercise Configuration Part 2
**Keys**: imageCategory, theme selection, imageGrouping options, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-081-090.md`

**Step 16**: Keys 91-100 - Image Display Options
**Keys**: Image sizing, spacing, alignment options
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-091-100.md`

**Step 17**: Keys 101-110 - Visual Customization
**Keys**: showPlusSign, showEqualsSign, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-101-110.md`

**Step 18**: Keys 111-120 - Exercise Modes
**Keys**: exerciseMode, selectMode, modeImageImage, modeFindAddend, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-111-120.md`

**Step 19**: Keys 121-130 - Action Buttons
**Keys**: generate, generateWorksheet, generateAnswerKey, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-121-130.md`

**Step 20**: Keys 131-140 - Download Options
**Keys**: download, worksheetJpeg, answerKeyJpeg, worksheetPdf, etc.
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-131-140.md`

**Step 21**: Keys 141-145 - Utility & Status
**Keys**: grayscale, clearAll, worksheet, answerKey, nameLabel
**Success Criteria**: Context documented
**Deliverable**: `Context-Keys-141-145.md`

**Step 22**: Consolidate All Context Mappings (10 minutes)
**Action**: Combine all context files into master document
**Success Criteria**: Single comprehensive context map
**Deliverable**: `Addition-Complete-Context-Map.md`

**Step 23**: Identify Critical Teacher-Facing Keys (5 minutes)
**Action**: Mark which keys teachers interact with most
**Success Criteria**: Priority keys identified
**Deliverable**: Priority list added to context map

**Step 24**: Identify Professional Tone Keys (5 minutes)
**Action**: Mark keys that need especially professional language
**Success Criteria**: Tone requirements clear
**Deliverable**: Tone guide added to context map

**Step 25**: Create Quick Reference Context Guide (5 minutes)
**Action**: Create one-page summary of key contexts
**Success Criteria**: Easy reference for translation review
**Deliverable**: `Context-Quick-Reference.md`

**CHECKPOINT 2**: User confirms context mapping is comprehensive and useful

---

## BLOCK 3: GERMAN TRANSLATION ANALYSIS (Steps 26-32, ~25 minutes)

### Step 26: Extract German Section (3 minutes)
**Action**: Copy German translation block to separate file
**Success Criteria**: Lines 251-446 extracted
**Deliverable**: `Addition-German-CURRENT.txt`

### Step 27: Run Glossary Violation Checks - German (5 minutes)
**Action**: Check against LANGUAGE_STANDARDS.md for German
**Checks**:
- "Erstellen" vs "Generieren" (should be Erstellen)
- "Lösungsblatt" for Answer Key
- "Alles zurücksetzen" for Clear All (NOT "Alles löschen")
- "Sie" form usage (formal)
- DIN A4 references

**Success Criteria**: All violations documented
**Deliverable**: Add to `Addition-Issues-German.md`

### Step 28: Natural Sound Review - German (8 minutes)
**Action**: Read through all German translations
**Questions for each key**:
- Does this sound like a native German speaker wrote it?
- Is "Sie" form used consistently?
- Are compound words formed correctly?
- Does it sound professional for educational software?

**Success Criteria**: Unnatural phrasings identified
**Deliverable**: Add to `Addition-Issues-German.md`

### Step 29: Context Appropriateness - German (5 minutes)
**Action**: For critical keys, verify context match
**Check**:
- "generate" → "Erstellen" (create, not generate)
- "Answer Key" → "Lösungsblatt" (solution sheet)
- Educational terminology vs tech jargon

**Success Criteria**: Context mismatches documented
**Deliverable**: Add to `Addition-Issues-German.md`

### Step 30: Cultural Conventions - German (3 minutes)
**Action**: Verify German cultural conventions
**Check**:
- DIN A4 (not just A4)
- Comma for decimals
- Proper compound words

**Success Criteria**: Cultural issues documented
**Deliverable**: Add to `Addition-Issues-German.md`

### Step 31: Count German Issues (1 minute)
**Action**: Tally all issues by category
**Success Criteria**: Know exact count
**Deliverable**: German issues summary

### Step 32: Prioritize German Fixes (3 minutes)
**Action**: Order issues by severity (Critical, High, Medium, Low)
**Success Criteria**: Fix priority clear
**Deliverable**: Prioritized German fix list

**CHECKPOINT 3**: User reviews German analysis methodology

---

## BLOCK 4: FRENCH TRANSLATION ANALYSIS (Steps 33-39, ~25 minutes)

### Step 33: Extract French Section (3 minutes)
**Action**: Copy French translation block to separate file
**Success Criteria**: Lines 417-582 extracted
**Deliverable**: `Addition-French-CURRENT.txt`

### Step 34: Run Glossary Violation Checks - French (5 minutes)
**Checks**:
- "Créer" for generate (NOT "Générer")
- "Corrigé" for Answer Key
- "Tout effacer" for Clear All
- Gender agreement
- Accent marks present and correct

**Success Criteria**: All violations documented
**Deliverable**: `Addition-Issues-French.md`

### Step 35: Typography Checks - French (5 minutes)
**Action**: Verify French typography rules
**Check**:
- Space before ! ? : ;
- Capitalization (lowercase except proper nouns)
- Proper use of apostrophes

**Success Criteria**: Typography issues documented
**Deliverable**: Add to `Addition-Issues-French.md`

### Step 36: Natural Sound Review - French (8 minutes)
**Action**: Read all French translations for natural flow
**Questions**:
- Native French speaker phrasing?
- Proper verb forms (imperative vs infinitive)?
- Gender agreement correct?

**Success Criteria**: Unnatural phrasings identified
**Deliverable**: Add to `Addition-Issues-French.md`

### Step 37: Context Appropriateness - French (3 minutes)
**Check**: Educational French vs generic translations
**Success Criteria**: Context issues documented
**Deliverable**: Add to `Addition-Issues-French.md`

### Step 38: Count French Issues (1 minute)
**Action**: Tally by category
**Success Criteria**: Exact count
**Deliverable**: French issues summary

### Step 39: Prioritize French Fixes (3 minutes)
**Action**: Order by severity
**Success Criteria**: Fix priority clear
**Deliverable**: Prioritized French fix list

---

## BLOCK 5: SPANISH TRANSLATION ANALYSIS (Steps 40-46, ~25 minutes)

[Same 7-step structure as German and French]

### Step 40: Extract Spanish Section
### Step 41: Glossary Checks - Spanish
- "Crear" (NOT "Generar")
- "Hoja de respuestas" (NOT "Respuestas")
- "Borrar todo"
- Inverted punctuation usage

### Step 42: Natural Sound - Spanish
### Step 43: Context Appropriateness - Spanish
### Step 44: Cultural Conventions - Spanish
- Neutral international Spanish
- Avoid regionalisms

### Step 45: Count Spanish Issues
### Step 46: Prioritize Spanish Fixes

---

## BLOCK 6: PORTUGUESE TRANSLATION ANALYSIS (Steps 47-54, ~30 minutes)

### Step 47: Extract Portuguese Section (3 minutes)
### Step 48: PT-PT vs PT-BR Scan (8 minutes)
**Critical Check**: Identify ALL European Portuguese variants
**Look for**:
- "Tipo de letra" → Should be "Fonte"
- "Ecrã" → Should be "Tela"
- "Telemóvel" → Should be "Celular"
- "Descarregar" → Should be "Baixar"
- "Ficheiro" → Should be "Arquivo"
- "Guardar" → Should be "Salvar"
- "Rato" → Should be "Mouse"
- "A carregar" → Should be "Carregando"

**Success Criteria**: All PT-PT variants identified
**Deliverable**: PT-PT to PT-BR conversion list

### Step 49: Glossary Checks - Portuguese
- "Criar" for generate
- "Folha de respostas" for Answer Key
- "Limpar tudo" for Clear All

### Step 50: Natural Sound - Portuguese (Brazilian)
**Check**: Does it sound natural to Brazilian Portuguese speakers?
### Step 51: Context Appropriateness - Portuguese
### Step 52: Count Portuguese Issues
### Step 53: Prioritize Portuguese Fixes
### Step 54: Create PT-BR Conversion Reference
**Action**: Document all PT-PT → PT-BR conversions needed
**Deliverable**: `Portuguese-PT-BR-Conversions-Addition.md`

---

## BLOCK 7: ITALIAN TRANSLATION ANALYSIS (Steps 55-61, ~25 minutes)

[Same structure]
### Step 55: Extract Italian Section
### Step 56: Glossary Checks - Italian
- "Crea" (NOT "Genera")
- "Soluzioni"
- "Cancella tutto"
- Articles (il/la/lo)
- Apostrophes (l'immagine)

### Step 57: Natural Sound - Italian
### Step 58: Context Appropriateness - Italian
### Step 59: Gender Agreement Check - Italian
### Step 60: Count Italian Issues
### Step 61: Prioritize Italian Fixes

---

## BLOCK 8: DUTCH TRANSLATION ANALYSIS (Steps 62-68, ~25 minutes)

### Step 62: Extract Dutch Section
### Step 63: Glossary Checks - Dutch
- "Maken" (NOT "Genereren")
- "Antwoordblad"
- "Alles wissen"
- Compound words (single words, not separated)

### Step 64: Natural Sound - Dutch
### Step 65: Context Appropriateness - Dutch
### Step 66: Compound Word Check - Dutch
### Step 67: Count Dutch Issues
### Step 68: Prioritize Dutch Fixes

---

## BLOCK 9: SWEDISH TRANSLATION ANALYSIS (Steps 69-75, ~25 minutes)

### Step 69: Extract Swedish Section
### Step 70: Glossary Checks - Swedish
- "Skapa" (NOT "Generera") ← Critical!
- "Facit"
- "Rensa allt"
- ÅÄÖ characters correct

### Step 71: Natural Sound - Swedish
**Focus**: Does "Skapa" appear (teacher-friendly) vs "Generera" (robotic)?
### Step 72: Context Appropriateness - Swedish
### Step 73: Compound Word Check - Swedish
### Step 74: Count Swedish Issues
### Step 75: Prioritize Swedish Fixes

---

## BLOCK 10: DANISH TRANSLATION ANALYSIS (Steps 76-83, ~30 minutes)

### Step 76: Extract Danish Section
### Step 77: Language Contamination Check - Danish (Critical!)
**Action**: Search for French text in Danish section
**Grep**: Look for "Créer" (French) appearing in Danish
**Success Criteria**: All contamination found
**Deliverable**: Contamination list

### Step 78: Glossary Checks - Danish
- "Opret" (NOT "Generer" or "Créer"!)
- "Svarark"
- "Ryd alt"
- "Ramme" (NOT "Kant") for borders
- "Rammedekning" (NOT "Rammedekkevne")

### Step 79: Natural Sound - Danish
### Step 80: Context Appropriateness - Danish
### Step 81: ÆØÅ Character Check - Danish
### Step 82: Count Danish Issues
### Step 83: Prioritize Danish Fixes

---

## BLOCK 11: NORWEGIAN TRANSLATION ANALYSIS (Steps 84-91, ~30 minutes)

### Step 84: Extract Norwegian Section
### Step 85: Language Contamination Check - Norwegian (Critical!)
**Action**: Search for French text "Créer" in Norwegian section
### Step 86: Glossary Checks - Norwegian
- "Opprett" (NOT "Generer" or "Créer"!)
- "Fasit"
- "Slett alt" (NOT "Tøm alt") ← Critical!
- "Ramme" for borders
- "Rammedekkevne" (verify correct)

### Step 87: Natural Sound - Norwegian (Bokmål)
### Step 88: Context Appropriateness - Norwegian
### Step 89: Bokmål vs Nynorsk Check
### Step 90: Count Norwegian Issues
### Step 91: Prioritize Norwegian Fixes

---

## BLOCK 12: FINNISH TRANSLATION ANALYSIS (Steps 92-98, ~25 minutes)

### Step 92: Extract Finnish Section
### Step 93: Glossary Checks - Finnish
- "Luo" for generate
- "Vastausavain" (NOT "Vastaukset") ← Critical!
- "Tyhjennä kaikki"
- Compound words correct

### Step 94: Natural Sound - Finnish
### Step 95: Context Appropriateness - Finnish
### Step 96: Case Ending Check - Finnish
### Step 97: Count Finnish Issues
### Step 98: Prioritize Finnish Fixes

---

## BLOCK 13: CROSS-LANGUAGE ANALYSIS (Steps 99-105, ~30 minutes)

### Step 99: Create Issues Summary Matrix (10 minutes)
**Action**: Compile all issues from all 11 languages
**Format**:
```
| Language | Category A | Category B | Category C | Category D | Category E | Category F | Total |
|----------|-----------|-----------|-----------|-----------|-----------|-----------|-------|
| German   |     2     |     5     |     3     |     1     |     0     |     0     |  11   |
| French   |     1     |     4     |     2     |     2     |     0     |     0     |   9   |
...
```
**Success Criteria**: Complete count
**Deliverable**: `Addition-Issues-Summary-Matrix.md`

### Step 100: Identify Common Patterns (8 minutes)
**Action**: Look for issues appearing across multiple languages
**Examples**:
- Generate/Create issue in multiple languages?
- Answer Key terminology problems widespread?
- Any pattern that suggests systemic issue?

**Success Criteria**: Patterns documented
**Deliverable**: `Common-Issue-Patterns.md`

### Step 101: Verify Key Count Consistency (5 minutes)
**Action**: Count keys in each language section
**Success Criteria**: All 11 languages have EXACTLY the same number of keys
**Deliverable**: Key count verification report

### Step 102: Check for Orphaned/Missing Keys (5 minutes)
**Action**: Verify every English key has translation in all 11 languages
**Success Criteria**: No missing translations
**Deliverable**: Completeness report

### Step 103: Estimate Fix Time Per Language (2 minutes)
**Action**: Based on issue counts, estimate time to fix each language
**Success Criteria**: Realistic time estimates
**Deliverable**: Fix time estimates

### Step 104: Create Master Fix Priority List (5 minutes)
**Action**: Order all fixes across all languages by:
1. Severity (Critical first)
2. Impact (high-usage keys first)
3. Difficulty (easy fixes first within same severity)

**Success Criteria**: Clear fix sequence
**Deliverable**: `Master-Fix-Priority-List.md`

### Step 105: Analysis Phase Summary Report (5 minutes)
**Action**: Create comprehensive summary of analysis phase
**Include**:
- Total issues found: [number]
- By category breakdown
- By language breakdown
- Most common issues
- Estimated fix time
- Ready to proceed to fixing?

**Success Criteria**: Complete analysis summary
**Deliverable**: `Addition-Analysis-Phase-Complete.md`

**CHECKPOINT 4**: User reviews complete analysis before any fixes are made

---

## BLOCK 14: FIXING - GERMAN (Steps 106-112, ~20-30 minutes)

### Step 106: Open German Section for Editing (2 minutes)
**Action**: Prepare to make fixes
**Success Criteria**: German section accessible

### Step 107: Fix Category A - Glossary Violations German (5-10 minutes)
**Action**: Fix each documented glossary violation
**Process for each fix**:
1. Locate exact line number
2. Read current value
3. Check LANGUAGE_STANDARDS.md for correct value
4. Make replacement
5. Re-read sentence to verify sounds natural
6. Mark as fixed in issues log

**Success Criteria**: All Category A fixes completed
**Deliverable**: Fixed German translations

### Step 108: Fix Category B - Unnatural Phrasing German (8-12 minutes)
**Action**: Fix each unnatural phrasing
**Process for each**:
1. Read context from context map
2. Read current phrasing
3. Think: "Would a German teacher say this?"
4. Craft natural alternative
5. Verify against context
6. Make fix
7. Mark as fixed

**Success Criteria**: All Category B fixes completed

### Step 109: Fix Category C - Context Mismatches German (5 minutes)
**Action**: Fix any context-inappropriate translations

### Step 110: Fix Category D-E - Cultural & Quality German (3 minutes)
**Action**: Fix cultural and quality issues

### Step 111: Re-read Entire German Section (5 minutes)
**Action**: Read through all German translations start to finish
**Questions**:
- Does it flow naturally?
- Consistent tone throughout?
- Any fixes create new issues?

**Success Criteria**: German section sounds natural and professional

### Step 112: Mark German as COMPLETE (1 minute)
**Action**: Update status
**Deliverable**: German FIXED and VERIFIED

---

## BLOCK 15: FIXING - FRENCH (Steps 113-119, ~20-30 minutes)

[Same 7-step structure as German]
### Step 113: Open French Section
### Step 114: Fix Category A - Glossary Violations French
### Step 115: Fix Category B - Unnatural Phrasing French
### Step 116: Fix Category C - Context Mismatches French
### Step 117: Fix Category D-E - Cultural & Typography French
**Special attention**: Spaces before punctuation
### Step 118: Re-read Entire French Section
### Step 119: Mark French as COMPLETE

---

## BLOCK 16: FIXING - SPANISH (Steps 120-126, ~20-30 minutes)

[Same structure]
### Step 120: Open Spanish Section
### Step 121-125: Fix all categories
### Step 126: Mark Spanish as COMPLETE

---

## BLOCK 17: FIXING - PORTUGUESE (Steps 127-134, ~30-40 minutes)

### Step 127: Open Portuguese Section
### Step 128: Fix PT-PT → PT-BR Conversions (15 minutes)
**Critical**: Convert ALL European Portuguese to Brazilian
**Process for each conversion**:
1. Find PT-PT term
2. Replace with PT-BR equivalent
3. Re-read in context
4. Verify sounds natural to Brazilian speakers
5. Mark as converted

**Success Criteria**: ZERO European Portuguese remains

### Step 129: Fix Category A - Glossary Violations Portuguese
### Step 130: Fix Category B - Unnatural Phrasing Portuguese
### Step 131: Fix Category C - Context Mismatches Portuguese
### Step 132: Fix Category D-E - Cultural & Quality Portuguese
### Step 133: Re-read Entire Portuguese Section
**Special focus**: Confirm sounds Brazilian, not European
### Step 134: Mark Portuguese as COMPLETE

---

## BLOCK 18: FIXING - ITALIAN (Steps 135-141, ~20-30 minutes)

[Same structure as German/French]
### Step 135: Open Italian Section
### Step 136-140: Fix all categories
**Special attention**: Gender agreement, articles, apostrophes
### Step 141: Mark Italian as COMPLETE

---

## BLOCK 19: FIXING - DUTCH (Steps 142-148, ~20-30 minutes)

[Same structure]
### Step 142-147: Fix all categories
**Special attention**: Compound words
### Step 148: Mark Dutch as COMPLETE

---

## BLOCK 20: FIXING - SWEDISH (Steps 149-155, ~20-30 minutes)

[Same structure]
### Step 149-154: Fix all categories
**Critical attention**: Skapa vs Generera
### Step 155: Mark Swedish as COMPLETE

---

## BLOCK 21: FIXING - DANISH (Steps 156-162, ~25-35 minutes)

### Step 156: Open Danish Section
### Step 157: Fix Language Contamination FIRST (10 minutes)
**Critical**: Remove ALL French text from Danish
**Process**:
1. Find every instance of "Créer"
2. Replace with "Opret"
3. Verify no other French text
4. Mark as fixed

### Step 158-161: Fix all other categories
**Special attention**: Ramme terminology
### Step 162: Mark Danish as COMPLETE

---

## BLOCK 22: FIXING - NORWEGIAN (Steps 163-169, ~25-35 minutes)

### Step 163: Open Norwegian Section
### Step 164: Fix Language Contamination FIRST (10 minutes)
**Critical**: Remove ALL French text from Norwegian
### Step 165-168: Fix all other categories
**Critical**: "Slett alt" NOT "Tøm alt"
### Step 169: Mark Norwegian as COMPLETE

---

## BLOCK 23: FIXING - FINNISH (Steps 170-176, ~20-30 minutes)

[Same structure]
### Step 170-175: Fix all categories
**Critical**: "Vastausavain" for Answer Key
### Step 176: Mark Finnish as COMPLETE

---

## BLOCK 24: POST-FIX VALIDATION (Steps 177-190, ~45 minutes)

### Step 177: Save Fixed Translation File (2 minutes)
**Action**: Save as `translations-addition-FIXED.js`

### Step 178: Run All Glossary Validation Greps (10 minutes)
**Action**: Run every validation check
**Checks**:
```bash
# Should return ZERO results:
grep "Generera" (Swedish)
grep "Generer" (Danish/Norwegian in wrong context)
grep "Créer\".*da\":" (French in Danish)
grep "Créer\".*no\":" (French in Norwegian)
grep "Tipo de letra" (Portuguese European)
grep "Facitliste" (Danish wrong term)
grep "Tøm alt" (Norwegian wrong term)
grep "Alles löschen" (German wrong term)
# etc...
```

**Success Criteria**: ALL greps return ZERO violations
**Deliverable**: Validation grep results

### Step 179: Count Keys Per Language - Verification (5 minutes)
**Action**: Verify all 11 languages have identical key counts
**Success Criteria**: All counts match English

### Step 180-190: Spot-Check Random Keys Per Language (11 steps, 2 min each)
**For each language**:
- Step 180: Spot-check 5 random German keys
- Step 181: Spot-check 5 random French keys
- Step 182: Spot-check 5 random Spanish keys
- Step 183: Spot-check 5 random Portuguese keys (verify Brazilian!)
- Step 184: Spot-check 5 random Italian keys
- Step 185: Spot-check 5 random Dutch keys
- Step 186: Spot-check 5 random Swedish keys
- Step 187: Spot-check 5 random Danish keys
- Step 188: Spot-check 5 random Norwegian keys
- Step 189: Spot-check 5 random Finnish keys
- Step 190: Spot-check 5 random English keys (baseline)

**For each spot-check**:
- Read key in context
- Verify sounds natural
- Verify context-appropriate
- Verify no obvious errors

**Success Criteria**: All spot-checks pass natural sound test

---

## BLOCK 25: CROSS-LANGUAGE CONSISTENCY CHECK (Steps 191-198, ~30 minutes)

### Step 191: Create Terminology Verification Matrix (15 minutes)
**Action**: For 20 critical terms, verify consistent across all languages
**Format**:
```
| English Term | DE | FR | ES | PT | IT | NL | SV | DA | NO | FI | ✓/✗ |
|--------------|----|----|----|----|----|----|----|----|----|----|-----|
| Generate     | Erstellen | Créer | Crear | Criar | Crea | Maken | Skapa | Opret | Opprett | Luo | ✓ |
| Answer Key   | Lösungsblatt | Corrigé | Hoja de respuestas | Folha de respostas | Soluzioni | Antwoordblad | Facit | Svarark | Fasit | Vastausavain | ✓ |
...
```

**Success Criteria**: All terms match LANGUAGE_STANDARDS.md
**Deliverable**: `Addition-Terminology-Matrix.md`

### Step 192: Verify No Language Contamination (5 minutes)
**Action**: Final scan for any cross-language contamination
**Greps**:
- French in Danish/Norwegian
- English in non-English sections
- Any obvious wrong language

**Success Criteria**: ZERO contamination
**Deliverable**: Contamination scan report

### Step 193: Check Special Characters Render (5 minutes)
**Action**: Verify accents, umlauts, special characters intact
**Check**: é, ü, å, ø, ñ, etc. all present and correct
**Success Criteria**: All special characters correct

### Step 194: Verify "Generate" Family Consistent (3 minutes)
**Action**: Verify all 11 languages use "Create" family, not "Generate"
**Success Criteria**: All correct

### Step 195: Verify "Answer Key" Consistent (3 minutes)
**Action**: Verify all 11 languages use proper educational term
**Success Criteria**: All correct

### Step 196: Verify "Clear All" Consistent (3 minutes)
**Action**: Verify all 11 languages use appropriate term
**Success Criteria**: All correct

### Step 197: Check Portuguese is 100% Brazilian (5 minutes)
**Action**: Final PT-BR verification
**Scan for**: Any remaining PT-PT variants
**Success Criteria**: ZERO European Portuguese remains

### Step 198: Final Consistency Summary (3 minutes)
**Action**: Create summary of consistency verification
**Deliverable**: Consistency verification report

---

## BLOCK 26: COMPREHENSIVE DOCUMENTATION (Steps 199-210, ~60 minutes)

### Step 199: Create Before/After Examples (15 minutes)
**Action**: Document 10-15 significant changes with before/after
**Format**:
```markdown
### Example 1: Swedish "Generate"
**Before**: "Generera"
**After**: "Skapa"
**Why**: "Generera" sounds robotic/technical. "Skapa" is warm, teacher-friendly,
         and natural for educational context of creating worksheets.
**Impact**: Used 3 times in Swedish translations
```

**Success Criteria**: All major changes documented
**Deliverable**: `Addition-Before-After-Examples.md`

### Step 200: Create Issues Summary by Category (10 minutes)
**Action**: Summarize all issues found and fixed
**Format**:
```markdown
# Addition Translation Issues Summary

## Total Issues Found: [number]

### By Category
- Category A (Glossary Violations): [count]
- Category B (Unnatural Phrasing): [count]
- Category C (Context Mismatch): [count]
- Category D (Cultural Issues): [count]
- Category E (Professional Quality): [count]
- Category F (Language Contamination): [count]

### By Language
[Table with counts per language]

### Top 5 Most Common Issues
1. Generate → Create terminology (8 languages)
2. Answer Key wrong terminology (5 languages)
...
```

**Deliverable**: `Addition-Issues-Summary.md`

### Step 201: Create Issues Summary by Language (10 minutes)
**Action**: Language-by-language breakdown
**Deliverable**: `Addition-Issues-By-Language.md`

### Step 202: Document Portuguese PT-BR Conversion (10 minutes)
**Action**: Complete list of PT-PT → PT-BR changes
**Success Criteria**: Reference for other apps
**Deliverable**: `Addition-Portuguese-PT-BR-Conversions.md`

### Step 203: Document Lessons Learned (10 minutes)
**Action**: What did we learn from this deep analysis?
**Include**:
- Most common mistake patterns
- Languages with most issues
- Unexpected findings
- Process improvements for next app

**Deliverable**: `Addition-Lessons-Learned.md`

### Step 204: Create Complete Audit Report (20 minutes)
**Action**: Comprehensive report of entire process
**Sections**:
1. Executive Summary
2. Methodology
3. Issues Found (categorized)
4. Fixes Applied
5. Validation Results
6. Before/After Examples
7. Lessons Learned
8. Conclusion

**Deliverable**: `Addition-Complete-Audit-Report.md`

### Step 205: Create Replication Guide (15 minutes)
**Action**: Step-by-step guide for applying this to other apps
**Include**:
- Exact process steps
- Time estimates
- Tools/commands used
- Checkpoints
- Quality criteria

**Deliverable**: `Replication-Guide-Template.md`

### Step 206: Update Master Tracking (5 minutes)
**Action**: Update project-wide tracking
**Mark**: Addition = COMPLETE, 0 issues remaining
**Deliverable**: Updated project tracker

### Step 207: Create Quick Stats Summary (3 minutes)
**Action**: One-page summary with key numbers
**Include**:
- Total issues found: [X]
- Total fixes made: [X]
- Time spent: [X hours]
- Languages validated: 11/11
- Status: ✅ COMPLETE

**Deliverable**: `Addition-Quick-Stats.md`

### Step 208: Archive All Analysis Files (3 minutes)
**Action**: Organize all documents in folder structure
**Success Criteria**: Well-organized archive

### Step 209: Create Final Comparison File (5 minutes)
**Action**: Side-by-side original vs fixed
**Tool**: Diff tool or manual comparison
**Deliverable**: Comparison showing all changes

### Step 210: Phase 0 Complete Summary (5 minutes)
**Action**: Final summary for user presentation
**Deliverable**: `PHASE-0-COMPLETE-SUMMARY.md`

---

## FINAL CHECKPOINT: USER APPROVAL

### Deliverables to Present
1. ✅ Fixed translation file: `translations-addition-FIXED.js`
2. ✅ Complete audit report with before/after examples
3. ✅ Validation confirmation (all checks passed)
4. ✅ Issues summary (categorized and by language)
5. ✅ Portuguese PT-BR conversion reference
6. ✅ Lessons learned document
7. ✅ Replication guide for other apps
8. ✅ Terminology consistency matrix

### User Decision Points
- [ ] Approve quality of fixes
- [ ] Approve methodology for replication
- [ ] Approve to proceed to Phase 1 (Subtraction, Math Worksheet, Math Puzzle)
- [ ] Request any adjustments to process

---

## TOTAL STEPS: 210 discrete, verifiable actions

**Each step**:
- Clear single focus
- Measurable deliverable
- Success criteria defined
- 2-15 minutes duration
- Impossible to misunderstand
- Easy to verify completion

**This granular approach ensures**:
- No rushing
- Quality at every step
- Clear progress tracking
- User checkpoints at key points
- Professional, thorough results
- Replicable methodology

**Total estimated time**: 8-10 hours of careful, detailed work for one app

**This is the "perfect plan which is impossible to fail" with sufficient detail to work within limitations.**
