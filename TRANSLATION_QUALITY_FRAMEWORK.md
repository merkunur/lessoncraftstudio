# Translation Quality Framework
## LessonCraftStudio - Comprehensive Natural Language Evaluation

**Version**: 2.0.0
**Created**: 2025-11-25
**Purpose**: Ensure all translations sound natural, context-appropriate, and professionally written by native speakers

---

## THE FUNDAMENTAL PRINCIPLE

**Translations must sound like a native speaker wrote them specifically for teachers creating educational worksheets.**

NOT acceptable:
- ❌ Direct word-for-word translation
- ❌ Machine translation feel
- ❌ Technically correct but unnatural phrasing
- ❌ Generic tech terminology

REQUIRED:
- ✅ Natural idiomatic expression in target language
- ✅ Context-appropriate for educational software
- ✅ Teacher-friendly, not developer-friendly language
- ✅ Sounds like the app was originally written in that language

---

## EVALUATION CRITERIA FOR EVERY TRANSLATION

### 1. Natural Sound Test
**Question**: "Would a native speaker actually say this?"

**Example - Swedish "Generate"**:
- ❌ "Generera" - Technically correct, but sounds robotic/technical
- ✅ "Skapa" - Natural, warm, teacher-friendly ("create")

**How to Evaluate**:
- Read the phrase aloud in the target language
- Ask: Would a native speaker teacher use this exact phrase?
- Check: Does it sound like human-to-human communication or human-to-machine?

### 2. Context Appropriateness Test
**Question**: "Is this the right word for THIS specific use case?"

**Example - "Answer Key"**:
- Context: Teachers creating worksheets need solutions to give students
- ❌ Generic "Answers" - too vague
- ✅ Language-specific educational term (Facit, Svarark, Lösungsblatt, Corrigé)

**How to Evaluate**:
- Identify the user persona (teacher, K-5 education)
- Identify the specific action/object being described
- Verify the translation matches educational context, not just dictionary definition

### 3. Consistency Test
**Question**: "Do we use the same term for the same concept everywhere?"

**How to Evaluate**:
- Check against LANGUAGE_STANDARDS.md master glossary
- Verify identical concepts use identical translations across all 33 apps
- Document any intentional deviations with clear rationale

### 4. Professional Quality Test
**Question**: "Does this sound like professional educational software?"

**Red Flags**:
- Informal/slang language
- Inconsistent formality level (mixing tu/vous, du/Sie)
- Grammar/spelling errors
- Awkward sentence structure

### 5. Cultural Appropriateness Test
**Question**: "Does this respect cultural and regional conventions?"

**Examples**:
- German: Use "Sie" formal form, include "DIN" for paper sizes
- French: Proper spacing before punctuation (! ? : ;)
- Scandinavian: Compound words written as one word (Arbetsblad not Arbets blad)

---

## LANGUAGE-SPECIFIC NATURAL LANGUAGE GUIDELINES

### German (DE) - Teacher-Friendly Professional
**Persona**: Formal but helpful German teacher
**Key Principle**: Use clear, unambiguous educational terminology

**Common Issues**:
- Using "Generieren" (technical) instead of "Erstellen" (natural for creation)
- Wrong compound word formation
- Missing DIN standards reference
- Using "du" instead of "Sie"

**Natural Phrases**:
- "Arbeitsblatt erstellen" NOT "Arbeitsblatt generieren"
- "Bitte wählen Sie..." NOT "Wähle..."

### French (FR) - Clear Educational Language
**Persona**: Professional French educator
**Key Principle**: Precision and clarity with proper French typography

**Common Issues**:
- Missing spaces before ! ? : ;
- Wrong verb conjugation (infinitive vs imperative)
- Literal translation of English idioms
- Gender agreement errors

**Natural Phrases**:
- "Créer la feuille" NOT "Générer la feuille"
- "Veuillez sélectionner..." NOT "Sélectionner..." (missing politeness)

### Spanish (ES) - Neutral International Spanish
**Persona**: Internationally understood educator (avoid regional dialects)
**Key Principle**: Clear, neutral Spanish that works across regions

**Common Issues**:
- Regional slang (Mexican vs Spanish vs Argentine)
- Missing inverted punctuation (¿ ¡)
- "Respuestas" (too generic) vs "Hoja de respuestas" (specific educational term)

**Natural Phrases**:
- "Hoja de respuestas" NOT just "Respuestas"
- "Crear" NOT "Generar" (warmer, more teacher-friendly)

### Portuguese (PT) - Brazilian Portuguese
**Persona**: Brazilian teacher (warm, clear communication)
**Key Principle**: Use PT-BR variants, not European Portuguese

**CRITICAL DIFFERENCES PT-PT vs PT-BR**:
| Context | PT-PT (WRONG) | PT-BR (CORRECT) |
|---------|---------------|-----------------|
| Font | Tipo de letra | Fonte |
| Screen | Ecrã | Tela |
| Mobile | Telemóvel | Celular |
| Download | Descarregar | Baixar |
| Upload | Carregar | Carregar (same) |
| To train | Treinar | Treinar (same) |
| Computer | Computador | Computador (same) |
| Mouse | Rato | Mouse |
| File | Ficheiro | Arquivo |
| Folder | Pasta | Pasta (same) |
| Save | Guardar | Salvar |
| Print | Imprimir | Imprimir (same) |

**Natural Phrases**:
- "Baixar arquivo" NOT "Descarregar ficheiro"
- "Fonte" NOT "Tipo de letra"

### Italian (IT) - Clear Educational Italian
**Persona**: Professional Italian teacher
**Key Principle**: Proper articles, gender agreement, natural flow

**Common Issues**:
- Wrong article choice (il/lo/la)
- Gender disagreement
- Apostrophe errors (l'immagine vs la immagine)
- Literal English phrase translation

**Natural Phrases**:
- "Crea la scheda" NOT "Genera la scheda"
- "Scheda didattica" (proper educational term)

### Dutch (NL) - Clear Dutch Educational Language
**Persona**: Professional Dutch teacher (Netherlands standard)
**Key Principle**: Compound words, clear verb placement

**Common Issues**:
- "Genereren" (technical) vs "Maken" (natural)
- Breaking compound words incorrectly
- Wrong article (de/het)

**Natural Phrases**:
- "Werkblad maken" NOT "Werkblad genereren"
- "Antwoordblad" (one word) NOT "Antwoord blad"

### Swedish (SV) - Warm Swedish Educational Language
**Persona**: Friendly Swedish teacher (clear, warm communication)
**Key Principle**: Natural Swedish educational terminology

**Common Issues**:
- "Generera" (robotic) vs "Skapa" (natural, warm)
- Compound word spacing errors
- Wrong formality level

**Natural Phrases**:
- "Skapa arbetsblad" NOT "Generera arbetsblad"
- "Facit" (established educational term for answer key)

### Danish (DA) - Clear Danish Educational Language
**Persona**: Professional Danish teacher
**Key Principle**: Use established Danish educational terms

**Common Issues**:
- French contamination ("Créer" appearing in Danish files!)
- "Generer" (technical) vs "Opret" (natural)
- Wrong compound word formation
- "Kant" vs "Ramme" (border terminology)

**Natural Phrases**:
- "Opret arbejdsark" NOT "Generer arbejdsark" or "Créer arbejdsark"
- "Ramme" NOT "Kant" (for UI borders)
- "Svarark" (proper Danish educational term)

### Norwegian (NO) - Clear Norwegian Bokmål
**Persona**: Professional Norwegian teacher (Bokmål standard)
**Key Principle**: Clear Norwegian educational terminology, not Swedish or Danish

**Common Issues**:
- French contamination ("Créer" appearing in Norwegian files!)
- "Generer" (technical) vs "Opprett" (natural)
- "Tøm alt" (empty all) vs "Slett alt" (delete/clear all - correct for this context)
- Mixing Bokmål and Nynorsk

**Natural Phrases**:
- "Opprett arbeidsark" NOT "Generer arbeidsark" or "Créer arbeidsark"
- "Slett alt" NOT "Tøm alt" (for clear all function)
- "Fasit" (Norwegian answer key term)

### Finnish (FI) - Clear Finnish Educational Language
**Persona**: Professional Finnish teacher
**Key Principle**: Proper case usage, natural Finnish compounds

**Common Issues**:
- Wrong case endings
- Breaking compound words
- "Vastaukset" (just "answers") vs "Vastausavain" (answer key - proper term)

**Natural Phrases**:
- "Luo tehtävämoniste" (natural creation)
- "Vastausavain" (proper educational term)

---

## SPECIFIC TRANSLATION CONTEXTS

### "Generate" vs "Create" in Educational Context
**English Context**: Teachers making worksheets

**Why "Generate" is WRONG in most languages**:
- Sounds robotic, mechanical, computer-oriented
- Implies machine process, not creative teacher activity
- Doesn't resonate with educational mindset

**Why "Create/Make" is CORRECT**:
- Warm, human, creative
- Teachers are "creating" materials for students
- Aligns with educational professional identity

**Correct Terms**:
- DE: "Erstellen" (create/produce) NOT "Generieren"
- FR: "Créer" (create) NOT "Générer"
- ES: "Crear" (create) NOT "Generar"
- PT: "Criar" (create) NOT "Gerar"
- IT: "Crea" (create) NOT "Genera"
- NL: "Maken" (make) NOT "Genereren"
- SV: "Skapa" (create) NOT "Generera"
- DA: "Opret" (create) NOT "Generer"
- NO: "Opprett" (create) NOT "Generer"
- FI: "Luo" (create) NOT "Generoi"

### "Answer Key" in Educational Context
**English Context**: Solution sheet for teachers

**Why Generic Terms are WRONG**:
- "Answers" - too vague
- "Solutions" - too mathematical
- "Key" literal translation - doesn't exist in other languages

**Why Specific Educational Terms are CORRECT**:
- Each language has established educational terminology
- Teachers recognize these terms immediately
- Professional educational software uses these terms

**Correct Terms**:
- DE: "Lösungsblatt" (solution sheet)
- FR: "Corrigé" (correction/answer key)
- ES: "Hoja de respuestas" (answer sheet)
- PT: "Folha de respostas" (answer sheet)
- IT: "Soluzioni" (solutions)
- NL: "Antwoordblad" (answer sheet)
- SV: "Facit" (established Swedish term)
- DA: "Svarark" (answer sheet)
- NO: "Fasit" (established Norwegian term)
- FI: "Vastausavain" (answer key)

### "Clear All" in UI Context
**English Context**: Reset/delete all current work

**Wrong Approaches**:
- Literal "clear" translation (often means "bright/transparent")
- "Empty" (sounds weird in UI context)
- "Delete" might sound too permanent/scary

**Correct Approaches**:
- Use established UI convention in each language
- Consider connotation (reset vs delete vs clear)

**Correct Terms**:
- DE: "Alles zurücksetzen" (reset all) NOT "Alles löschen" (delete all - too harsh)
- FR: "Tout effacer" (erase all)
- ES: "Borrar todo" (erase all)
- PT: "Limpar tudo" (clean all)
- IT: "Cancella tutto" (cancel all)
- NL: "Alles wissen" (erase all)
- SV: "Rensa allt" (clear all)
- DA: "Ryd alt" (clear all)
- NO: "Slett alt" (delete all) NOT "Tøm alt" (empty all)
- FI: "Tyhjennä kaikki" (empty all)

---

## QUALITY ASSURANCE PROCESS

### Phase 1: Contextual Analysis
For each app and its translation file:
1. Identify the purpose of the app
2. Identify the target user (K-5 teacher creating worksheets)
3. List all UI elements and their specific contexts
4. Understand what action/object each translation key represents

### Phase 2: Natural Language Review
For each translation:
1. Apply Natural Sound Test
2. Apply Context Appropriateness Test
3. Check against master glossary
4. Verify cultural appropriateness
5. Confirm professional quality

### Phase 3: Cross-Language Consistency
1. Verify same concepts use same terms across all 33 apps
2. Check that language-specific conventions are maintained
3. Ensure no contamination (French text in Danish files, etc.)

### Phase 4: Native Speaker Validation
Ideally:
- Have native speakers review translations
- Ask: "Does this sound natural to you?"
- Ask: "Would you use this exact phrase?"
- Ask: "Is there a better way to say this?"

---

## RED FLAGS TO WATCH FOR

### Mechanical Translation Indicators
- ❌ Word-for-word English structure preserved in target language
- ❌ English idioms directly translated
- ❌ Unnatural word order for target language
- ❌ Missing articles, wrong articles, or unnecessary articles
- ❌ Wrong verb forms (infinitive when imperative needed, etc.)

### Cultural Mismatches
- ❌ US measurements/conventions without local equivalents mentioned
- ❌ Wrong formality level for target culture
- ❌ Missing culturally-expected information (like DIN in German)
- ❌ Date/number formats not localized

### Educational Context Mismatches
- ❌ Technical jargon instead of educational terms
- ❌ Developer-speak instead of teacher-speak
- ❌ Generic terms where specific educational vocabulary exists
- ❌ Language inappropriate for K-5 educational context

### Language Contamination
- ❌ French text appearing in Danish/Norwegian files
- ❌ English text visible in non-English UI
- ❌ Mixed language terminology
- ❌ Inconsistent language code usage

---

## IMPLEMENTATION APPROACH

### Before Fixing Any App
1. Read the current translation file completely
2. Understand the app's purpose and context
3. Identify the user persona and use cases
4. List all UI elements and their contexts
5. Review against this quality framework
6. Create detailed analysis of issues (not just glossary violations)

### While Fixing
1. For EACH translation key:
   - Understand the context (what does this button/label do?)
   - Apply all 5 evaluation tests
   - Check master glossary
   - Verify natural sound
   - Document any complex decisions

2. Don't rush - quality over speed

3. Think like a teacher using the app, not a developer building it

### After Fixing
1. Re-read entire translation file
2. Verify consistency within app
3. Spot-check 20 random keys for natural sound
4. Cross-reference with other fixed apps for consistency
5. Document all changes made and rationale

---

## DELIVERABLE STANDARDS

### For Each Fixed App
Must include:
1. **Translation file** - Zero glossary violations, all natural-sounding
2. **Detailed audit report** showing:
   - Issues found (categorized by type)
   - Specific changes made
   - Before/after examples for major changes
   - Rationale for non-obvious translation choices
3. **Validation confirmation** - All tests passed

### Quality Standards
- ✅ Native speaker would approve
- ✅ Zero glossary violations
- ✅ Zero language contamination
- ✅ Context-appropriate for every key
- ✅ Consistent with other fixed apps
- ✅ Professional educational software quality

---

**This framework is the foundation for all translation quality work.**
**Don't proceed without applying these principles to every translation.**
