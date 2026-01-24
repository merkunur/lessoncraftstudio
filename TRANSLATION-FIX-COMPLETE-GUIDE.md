# COMPLETE TRANSLATION FIX GUIDE - SYSTEMATIC APPROACH
**For use in NEW conversations - prevents missing violations**

---

## 🚨🚨🚨 READ THIS FIRST - DEPLOYMENT SAFETY 🚨🚨🚨

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ⛔ CRITICAL WARNING - PREVENTS PRODUCTION OVERWRITES ⛔        ║
║                                                                  ║
║   ALWAYS work in REFERENCE TRANSLATIONS folder:                 ║
║   C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\      ║
║                                                                  ║
║   NEVER use files from:                                         ║
║   • Project root (translations-*.js)                            ║
║   • frontend/public/worksheet-generators/js/                    ║
║   • Random backup files (*-backup.js, DEPLOYED-*.js)            ║
║                                                                  ║
║   Using wrong files = OVERWRITING PRODUCTION with old versions! ║
║                                                                  ║
║   See DEPLOYMENT.md for complete safety protocols.              ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## ⚠️ CRITICAL RULES

1. **START FRESH:** Each app = NEW conversation (prevents degradation)
2. **CHECK EVERYTHING:** ALL 60+ glossary terms, not just generate/create
3. **READ FIRST:** Always read LANGUAGE_STANDARDS.md lines 84-159 BEFORE starting
4. **SYSTEMATIC:** Follow this guide step-by-step, check off each item
5. **VERIFY:** After fixes, run verification commands to confirm 0 violations
6. **🚨 DEPLOYMENT SAFETY:** ALWAYS work in REFERENCE TRANSLATIONS folder, NEVER use random local files or you will overwrite production with old versions!

---

## 📋 STEP-BY-STEP PROCESS

### STEP 1: PREPARATION

**Read the complete glossary:**
```bash
Read LANGUAGE_STANDARDS.md lines 84-159
```

**Key sections to note:**
- Line 82: Philosophy - "Prefer Create over Generate"
- Lines 84-94: Core UI Terminology
- Lines 100-109: Page Setup
- Lines 116-122: Image & Media Library
- Lines 128-134: Text & Typography
- Lines 140-147: Layout & Alignment
- Lines 153-159: Background & Border

### STEP 2: ANALYZE HTML FOR TRANSLATION KEY ISSUES

**CRITICAL: Before checking translation file violations, verify the HTML uses correct translation keys!**

#### 2.1 Extract ALL translation keys from HTML

```bash
# Extract all data-translate keys
grep -o 'data-translate="[^"]*"' "REFERENCE APPS/{APP}.html" | sort | uniq

# Extract all placeholder keys
grep -o 'data-translate-placeholder="[^"]*"' "REFERENCE APPS/{APP}.html" | sort | uniq

# Extract all title keys
grep -o 'data-translate-title="[^"]*"' "REFERENCE APPS/{APP}.html" | sort | uniq
```

#### 2.2 Verify translation keys exist in translation file

**For EACH key found in HTML, manually check it exists in the translation file:**

```bash
# Example: Check if "mathpuzzle.text.tools" exists in ALL 11 languages
grep -n '"mathpuzzle.text.tools":' "REFERENCE TRANSLATIONS/translations-{APP}.js"

# Should return 11 lines (one per language). If less, key is missing!
```

**Common issues:**
- Keys using wrong namespace (e.g., `common.generate` instead of `mathpuzzle.generate`)
- Keys missing from English section
- Keys missing from some language sections
- Hardcoded English text without data-translate attribute

#### 2.3 Check for hardcoded text

```bash
# Look for labels and headers without data-translate
grep -n '<label' "REFERENCE APPS/{APP}.html" | grep -v 'data-translate'
grep -n '<h[1-6]' "REFERENCE APPS/{APP}.html" | grep -v 'data-translate'
grep -n '<button' "REFERENCE APPS/{APP}.html" | grep -v 'data-translate'
```

### STEP 3: IDENTIFY TRANSLATION FILE VIOLATIONS

**Run these grep commands for EACH app:**

```bash
# Generate/Create violations (HIGHEST PRIORITY)
grep -n "\"generate\":" translations-{APP}-complete.js
grep -in "generera\|generer\|genera\|gerar\|genereren" translations-{APP}-complete.js
```

**🚨 CRITICAL: VERIFICATION TRAP - CHECK ALL 11 LANGUAGES INDIVIDUALLY! 🚨**

The `grep -in "generera|generer|genera|gerar|genereren"` command will return ~88 matches because it includes legitimate English "generate" uses.

**❌ WRONG APPROACH (causes missed violations):**
```bash
# DON'T DO THIS:
grep -in "generera|generer" file.js | head -5  # Only checks first 5 lines
# You'll see English results, assume all are English, and MISS violations in other languages!
```

**WHY THIS IS CRITICAL:**
- English "generate" is CORRECT and appears in results
- If you only check first 5-10 lines, you'll see English and assume all matches are English
- You will MISS violations in German, Swedish, Danish, Norwegian, Spanish, Portuguese, Italian, Dutch, Finnish

**✅ CORRECT APPROACH - CHECK EACH LANGUAGE SECTION INDIVIDUALLY:**

```bash
# MANDATORY: Verify EACH language separately (approximate line ranges):
# English (en):     lines 1-200      ✅ "Generate" is CORRECT
# German (de):      lines 200-400    ❌ Must be "Erstellen" NOT "Generieren"
# French (fr):      lines 400-600    ✅ "Créer" is CORRECT
# Spanish (es):     lines 600-800    ❌ Must be "Crear" NOT "Generar"
# Italian (it):     lines 800-1000   ❌ Must be "Crea" NOT "Genera"
# Portuguese (pt):  lines 1000-1200  ❌ Must be "Criar" NOT "Gerar"
# Dutch (nl):       lines 1200-1400  ❌ Must be "Maken" NOT "Genereren"
# Swedish (sv):     lines 1400-1600  ❌ Must be "Skapa" NOT "Generera"
# Danish (da):      lines 1600-1800  ❌ Must be "Opret" NOT "Generer"
# Norwegian (no):   lines 1800-2000  ❌ Must be "Opprett" NOT "Generer"
# Finnish (fi):     lines 2000-2200  ❌ Must be "Luo" NOT "Generoi"

# Check EACH language individually:
awk 'NR>=200 && NR<=400' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -in "generieren"  # German
awk 'NR>=600 && NR<=800' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -in "generar"     # Spanish
awk 'NR>=800 && NR<=1000' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -in "genera"     # Italian
awk 'NR>=1000 && NR<=1200' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -in "gerar"     # Portuguese
awk 'NR>=1200 && NR<=1400' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -in "genereren" # Dutch
awk 'NR>=1400 && NR<=1600' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -in "generera"  # Swedish
awk 'NR>=1600 && NR<=1800' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -in "generer"   # Danish
awk 'NR>=1800 && NR<=2000' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -in "generer"   # Norwegian
awk 'NR>=2000 && NR<=2200' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -in "generoi"   # Finnish

# ALL should return 0. Any result = violation that needs fixing.
```

**Real incident:** Swedish "Generera" violation was missed because only first 5 grep results were checked (all English). **NEVER assume remaining matches are English - verify ALL 11 languages individually!**

---

```bash
# Answer Key violations
grep -n "\"answerKey\":" translations-{APP}-complete.js
grep -in "Antwortschlüssel\|Svarnøgle\|Svarnøkkel\|Svarsnyckel\|Antwoordsleutel\|Clave de respuestas\|Gabarito\|Chave de resposta" translations-{APP}-complete.js

# Worksheet violations
grep -in "Planilha\|Foglio di lavoro\|Tehtäväarkki" translations-{APP}-complete.js

# Clear All violations
grep -in "Alles löschen\|Tøm alt" translations-{APP}-complete.js

# Upload Custom Images (EXACT PHRASE from Line 119)
grep -n "\"uploadCustomImages\":" translations-{APP}-complete.js
grep -in "anpassade bilder\|mukautettuja kuvia" translations-{APP}-complete.js

# Text Tools
grep -n "\"textTools\":" translations-{APP}-complete.js

# Bring Forward / Send Backward
grep -n "\"bringForward\":\|\"sendBackward\":" translations-{APP}-complete.js

# Opacity violations
grep -n "\"backgroundOpacity\":\|\"borderOpacity\":" translations-{APP}-complete.js
grep -in "gennemsigtighed\|synlighet\|ugennomsiktighet" translations-{APP}-complete.js

# Border violations (Danish/Norwegian use "Kant" instead of "Ramme")
grep -n "\"border\":" translations-{APP}-complete.js
```

### STEP 4: FIX ALL VIOLATIONS SYSTEMATICALLY

**Fix in this order:**

#### 4.1 GENERATE/CREATE - ALL FORMS

**Check ALL these keys (not just "generate"):**
- `generate`
- `generateWorksheet`
- `generateAnswerKey`
- `generatingWorksheet` (progress messages)
- `generatingAnswerKey` (progress messages)
- Message strings: `worksheetGeneratedSuccessfully`, `answerKeyGenerated`
- Error messages: `pleaseGenerateWorksheetFirst`, `pleaseGenerateContentFirst`
- ALL message strings containing generate/create verbs

**Per Language (Line 88):**
- ✅ DE: Erstellen (NOT Generieren)
- ✅ SV: Skapa (NOT Generera) - all forms: skapa, skapar, skapat, skapas
- ✅ DA: Opret (NOT Generer, NOT Créer!) - all forms: opret, opretter, oprettet, oprettes
- ✅ NO: Opprett (NOT Generer, NOT Créer!) - all forms: opprett, oppretter, opprettet, opprettes
- ✅ NL: Maken (NOT Genereren) - all forms: maken, maakt, gemaakt
- ✅ ES: Crear (NOT Generar)
- ✅ PT: Criar (NOT Gerar)
- ✅ IT: Crea (NOT Genera)

**How to fix ALL forms efficiently:**
```javascript
// Use replace_all for message strings
Edit with replace_all=true:
- " genererat " → " skapat " (Swedish)
- "genereras" → "skapas" (Swedish)
- "generera " → "skapa " (Swedish)
- " genereret" → " oprettet" (Danish)
- "genereres" → "oprettes" (Danish)
- "generere " → "oprette " (Danish)
- " generert " → " opprettet " (Norwegian)
- "generer " → "opprett " (Norwegian)
```

#### 4.2 ANSWER KEY - ALL VARIATIONS

**Check ALL these keys:**
- `answerKey`
- `answerKeyJPEG`
- `answerKeyPDF`
- `generateAnswerKey`
- Message strings with answer key

**Per Language (Line 89):**
- ✅ DE: Lösungsblatt (NOT Antwortschlüssel)
- ✅ ES: Hoja de respuestas (NOT Clave de respuestas, NOT Respuestas)
- ✅ PT: Folha de respostas (NOT Gabarito, NOT Soluções, NOT Chave de resposta)
- ✅ NL: Antwoordblad (NOT Antwoordsleutel, NOT Antwoorden)
- ✅ SV: Facit (NOT Svarsnyckel)
- ✅ DA: Svarark (NOT Svarnøgle, NOT Facitliste)
- ✅ NO: Fasit (NOT Svarnøkkel)
- ✅ FI: Vastausavain (NOT Vastaukset)

**Fix all variations:**
```javascript
// Use replace_all for each language
Edit with replace_all=true:
- "Antwortschlüssel" → "Lösungsblatt" (German)
- "Svarnøgle" → "Svarark" (Danish)
- "Svarnøkkel" → "Fasit" (Norwegian)
- "Svarsnyckel" → "Facit" (Swedish)
- "Antwoordsleutel" → "Antwoordblad" (Dutch)
```

#### 4.3 WORKSHEET - ALL VARIATIONS

**Check:**
- `worksheet`
- `worksheetJPEG`
- `worksheetPDF`

**Per Language (Line 86):**
- ✅ PT: Folha de trabalho (NOT Planilha)
- ✅ IT: Scheda didattica (NOT Foglio di lavoro)
- ✅ FI: Tehtävämoniste (NOT Tehtäväarkki)

**Fix all variations:**
```javascript
Edit with replace_all=true:
- "Planilha" → "Folha de trabalho" (Portuguese)
- "Foglio di lavoro" → "Scheda didattica" (Italian)
- "Tehtäväarkki" → "Tehtävämoniste" (Finnish)
```

#### 4.4 CLEAR ALL

**Per Language (Line 92):**
- ✅ DE: Alles zurücksetzen (NOT Alles löschen)
- ✅ NO: Slett alt (NOT Tøm alt)

#### 4.5 UPLOAD CUSTOM IMAGES - EXACT PHRASE

**CRITICAL:** Line 119 specifies EXACT translations:

**Check:**
- `uploadCustomImages`
- `uploadImages`

**Exact translations (Line 119):**
- ✅ SV: "Ladda upp egna bilder" (NOT "anpassade")
- ✅ FI: "Lataa omia kuvia" (NOT "mukautettuja", NOT "Lataa palvelimelle mukautettuja kuvia")

#### 4.6 TEXT TOOLS

**Per Language (Line 128):**
- ✅ SV: Textalternativ (NOT Textverktyg)
- ✅ DA: Tekstindstillinger (NOT Tekstværktøjer)
- ✅ NO: Tekstinnstillinger (NOT Tekstverktøy)

#### 4.7 BRING FORWARD / SEND BACKWARD

**Per Language (Lines 146-147):**
- ✅ DE: Nach vorne / Nach hinten (NOT "bringen" or "senden" suffix)
- ✅ FR: Avancer / Reculer (NOT "d'un plan" suffix)
- ✅ ES: Traer adelante / Enviar atrás (NOT "hacia" prefix)
- ✅ PT: Trazer para frente / Enviar para trás
- ✅ IT: Porta avanti / Porta indietro (NOT "Manda indietro")
- ✅ NL: Naar voren / Naar achteren (NOT "brengen" or "sturen" suffix)
- ✅ SV: Flytta framåt / Flytta bakåt (NOT "Skicka bakåt")
- ✅ DA: Flyt fremad / Flyt bagud (NOT "Bring fremad" or "Send bagud")
- ✅ NO: Flytt fremover / Flytt bakover (NOT "Bring fremover" or "Send bakover")
- ✅ FI: Siirrä eteenpäin / Siirrä taaksepäin (NOT "Tuo eteen" or "Lähetä taakse")

#### 4.8 BACKGROUND & BORDER OPACITY

**Per Language (Lines 155, 158):**

**Background Opacity:**
- ✅ DA: Baggrundsdekning (NOT Baggrundsgennemsigtighed or Baggrundsuigennemsigtighed)
- ✅ NO: Bakgrunnsdekkevne (NOT Bakgrunnssynlighet or Bakgrunnsugjennomsiktighet)

**Border Opacity:**
- ✅ DA: Rammedekning (NOT Kantdekning or Kantgennemsigtighed or Kantuigennemsigtighed)
- ✅ NO: Rammedekkevne (NOT Rammesynlighet or Kantugjennomsiktighet)

#### 4.9 BORDER & BORDER THEME

**Per Language (Lines 156-157):**
- ✅ DA: border: "Ramme" (NOT "Kant"), borderTheme: "Rammetema" (NOT "Kanttema")
- ✅ NO: border: "Ramme" (NOT "Kant"), borderTheme: "Rammetema" (NOT "Kanttema")

---

## 🔍 STEP 5: VERIFICATION

**🚨 CRITICAL VERIFICATION RULE: CHECK EACH LANGUAGE SECTION INDIVIDUALLY! 🚨**

**THE TRAP:** Running `grep -c "violation"` on the whole file tells you violations exist, but NOT which language they're in. You might see a match and assume it's a legitimate English use when it's actually a German/Swedish/Danish violation!

**❌ WRONG APPROACH:**
```bash
# These commands are USELESS because they don't tell you WHICH language has the violation:
grep -c "Antwortschlüssel" file.js  # Returns 2 - but WHICH languages?
grep -c "Generera" file.js          # Returns 1 - but is it Swedish or English section?
grep -c "Tehtäväarkki" file.js      # Returns 5 - but where are they?
```

**✅ CORRECT APPROACH - VERIFY EACH LANGUAGE SECTION INDIVIDUALLY:**

```bash
# Language section line ranges (approximate - verify for each app):
# English (en):     lines 1-200
# German (de):      lines 200-400
# French (fr):      lines 400-600
# Spanish (es):     lines 600-800
# Italian (it):     lines 800-1000
# Portuguese (pt):  lines 1000-1200
# Dutch (nl):       lines 1200-1400
# Swedish (sv):     lines 1400-1600
# Danish (da):      lines 1600-1800
# Norwegian (no):   lines 1800-2000
# Finnish (fi):     lines 2000-2200

# 1. GENERATE/CREATE - Check EACH language individually:
awk 'NR>=200 && NR<=400' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "generieren"  # German = 0
awk 'NR>=600 && NR<=800' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "generar"     # Spanish = 0
awk 'NR>=800 && NR<=1000' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "genera"     # Italian = 0
awk 'NR>=1000 && NR<=1200' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "gerar"     # Portuguese = 0
awk 'NR>=1200 && NR<=1400' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "genereren" # Dutch = 0
awk 'NR>=1400 && NR<=1600' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "generera"  # Swedish = 0
awk 'NR>=1600 && NR<=1800' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "generer"   # Danish = 0
awk 'NR>=1800 && NR<=2000' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "generer"   # Norwegian = 0

# 2. ANSWER KEY - Check German, Swedish, Danish, Norwegian, Dutch:
awk 'NR>=200 && NR<=400' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Antwortschlüssel"  # German = 0
awk 'NR>=1200 && NR<=1400' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Antwoordsleutel" # Dutch = 0
awk 'NR>=1400 && NR<=1600' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Svarsnyckel"    # Swedish = 0
awk 'NR>=1600 && NR<=1800' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Svarnøgle"      # Danish = 0
awk 'NR>=1800 && NR<=2000' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Svarnøkkel"     # Norwegian = 0

# 3. WORKSHEET - Check Portuguese, Italian, Finnish:
awk 'NR>=800 && NR<=1000' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Foglio di lavoro" # Italian = 0
awk 'NR>=1000 && NR<=1200' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Planilha"        # Portuguese = 0
awk 'NR>=2000 && NR<=2200' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Tehtäväarkki"    # Finnish = 0

# 4. CLEAR ALL - Check German, Norwegian:
awk 'NR>=200 && NR<=400' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Alles löschen" # German = 0
awk 'NR>=1800 && NR<=2000' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Tøm alt"     # Norwegian = 0

# 5. UPLOAD CUSTOM IMAGES - Check Swedish, Finnish:
awk 'NR>=1400 && NR<=1600' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "anpassade bilder"  # Swedish = 0
awk 'NR>=2000 && NR<=2200' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "mukautettuja kuvia" # Finnish = 0

# 6. OPACITY - Check Danish, Norwegian:
awk 'NR>=1600 && NR<=1800' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "gennemsigtighed"    # Danish = 0
awk 'NR>=1800 && NR<=2000' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "ugjennomsiktighet" # Norwegian = 0

# 7. BRING FORWARD / SEND BACKWARD - Check German, Danish, Norwegian, Swedish, etc.:
awk 'NR>=200 && NR<=400' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Nach vorne bringen\|Nach hinten senden" # German = 0
awk 'NR>=1400 && NR<=1600' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Skicka bakåt"    # Swedish = 0
awk 'NR>=1600 && NR<=1800' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Bring fremad\|Send bagud" # Danish = 0
awk 'NR>=1800 && NR<=2000' "REFERENCE TRANSLATIONS/translations-{APP}.js" | grep -ic "Bring fremover\|Send bakover" # Norwegian = 0

# ALL must return 0. Any non-zero = violation still exists in that language!
```

**WHY THIS MATTERS:**
- Whole-file grep tells you violations exist but NOT WHERE
- Only checking first few results = you see English, assume all correct, MISS other languages
- You MUST verify EACH of the 11 languages individually for EACH violation type
- No shortcuts - check German, French, Spanish, Italian, Portuguese, Dutch, Swedish, Danish, Norwegian, Finnish separately!

---

## 🚨🚨🚨 CRITICAL: DEPLOYMENT SAFETY PROTOCOL 🚨🚨🚨

### ⛔ MANDATORY SOURCE FILE POLICY - READ THIS BEFORE DEPLOYING ⛔

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ✋ STOP! BEFORE YOU DEPLOY, READ THIS! ✋                      ║
║                                                                  ║
║   ✅ TRANSLATION FILES - ALWAYS use REFERENCE TRANSLATIONS:      ║
║      C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\   ║
║                                                                  ║
║   ❌ NEVER USE: Random local files in project root like:        ║
║      • frontend/public/worksheet-generators/js/translations-*.js║
║      • translations-wordsearch-complete.js (in root)            ║
║      • DEPLOYED-wordsearch-translations.js                      ║
║      • wordsearch-translations-backup.js                        ║
║      • ANY file NOT in REFERENCE TRANSLATIONS folder            ║
║                                                                  ║
║   ⚠️  WARNING: Using wrong files WILL OVERWRITE PRODUCTION      ║
║      WITH OLDER VERSIONS AND LOSE MONTHS OF WORK!               ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

**WHY THIS MATTERS:**

The project directory contains **HUNDREDS** of old, test, and outdated translation files with names like:
- `translations-wordsearch-complete.js` in root ❌ (could be 3 months old)
- `frontend/public/.../translations-addition-complete.js` ❌ (might be broken test version)
- `DEPLOYED-alphabet-train-translations.js` ❌ (could be from last year)

**THESE ARE NOT THE PRODUCTION VERSIONS!**

The **REFERENCE TRANSLATIONS** folder contains translation files that represent the CURRENT PRODUCTION STATE - these are the GOLDEN, AUTHORITATIVE versions.

---

## 📤 STEP 6: DEPLOYMENT - 6-STEP MANDATORY WORKFLOW

### 🛡️ PRE-DEPLOYMENT CHECKLIST - ALL STEPS REQUIRED

**BEFORE deploying ANY translation file, you MUST complete ALL 6 steps:**

#### ✅ STEP 6.1: VERIFY SOURCE FILE (MANDATORY)

```bash
# 1. Confirm working from REFERENCE TRANSLATIONS folder
ls "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-{APP}-complete.js"

# 2. Check file size is reasonable (typically 80KB-120KB)
# Verify it's not corrupted or truncated
```

**State explicitly which file you're using BEFORE deployment:**
- ✅ CORRECT: "I will deploy translations-wordsearch-complete.js from REFERENCE TRANSLATIONS folder"
- ❌ WRONG: "I will deploy translations-wordsearch-complete.js" (ambiguous - could be wrong file!)

#### ✅ STEP 6.2: WORK ON REFERENCE TRANSLATIONS COPY (MANDATORY)

**ALWAYS work directly in REFERENCE TRANSLATIONS folder:**

```bash
# Navigate to REFERENCE TRANSLATIONS
cd "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS"

# Edit the file directly in REFERENCE TRANSLATIONS
# Make all your translation fixes here
Edit: C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-{APP}-complete.js
```

**⚠️ CRITICAL:** Do NOT copy to root directory or frontend/public for editing. Work directly in REFERENCE TRANSLATIONS!

#### ✅ STEP 6.3: UPLOAD TO PRODUCTION (MANDATORY)

```bash
# Upload from REFERENCE TRANSLATIONS folder to production server
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-{APP}-complete.js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-{APP}-complete.js"
```

**Verify the command includes full path starting with "REFERENCE TRANSLATIONS"!**

#### ✅ STEP 6.4: COPY TO STANDALONE & RESTART (MANDATORY)

```bash
# Copy to standalone directory and restart PM2
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp public/worksheet-generators/js/translations-{APP}-complete.js .next/standalone/public/worksheet-generators/js/translations-{APP}-complete.js && pm2 restart lessoncraftstudio"
```

#### ✅ STEP 6.5: VERIFY DEPLOYMENT (MANDATORY)

```bash
# Check PM2 logs for errors
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "pm2 logs lessoncraftstudio --lines 20 --nostream"
```

#### ✅ STEP 6.6: REFERENCE FOLDER IS ALREADY UPDATED (AUTOMATIC)

**Since you worked directly in REFERENCE TRANSLATIONS folder (Step 6.2), it's already updated!**

No additional copy needed. The modified file is already in the correct location.

---

### 🚫 COMMON DEPLOYMENT MISTAKES THAT CAUSE OVERWRITES

**❌ MISTAKE 1: Using wrong source file**
```bash
# WRONG - Using file from project root
pscp "C:\Users\rkgen\lessoncraftstudio\translations-wordsearch-complete.js" root@server:/path/

# CORRECT - Using REFERENCE TRANSLATIONS
pscp "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-wordsearch-complete.js" root@server:/path/
```

**❌ MISTAKE 2: Using frontend/public copy**
```bash
# WRONG - frontend/public copy might be old
pscp "C:\Users\rkgen\lessoncraftstudio\frontend\public\worksheet-generators\js\translations-addition-complete.js" root@server:/path/

# CORRECT - REFERENCE TRANSLATIONS is source of truth
pscp "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-addition-complete.js" root@server:/path/
```

**❌ MISTAKE 3: Using random backup files**
```bash
# WRONG - Backup files are OLD versions
pscp "DEPLOYED-wordsearch-translations.js" root@server:/path/
pscp "wordsearch-translations-backup.js" root@server:/path/

# CORRECT - REFERENCE TRANSLATIONS only
pscp "REFERENCE TRANSLATIONS\translations-wordsearch-complete.js" root@server:/path/
```

**❌ MISTAKE 4: Not working directly in REFERENCE TRANSLATIONS**
```bash
# WRONG workflow:
# 1. Copy from REFERENCE TRANSLATIONS to root
# 2. Edit in root
# 3. Upload from root
# 4. Forget to copy back to REFERENCE TRANSLATIONS
# Result: Next deployment uses OLD version!

# CORRECT workflow:
# 1. Edit directly in REFERENCE TRANSLATIONS
# 2. Upload from REFERENCE TRANSLATIONS
# 3. Already updated! ✅
```

---

### ⚠️ FINAL DEPLOYMENT WARNINGS

**DEPLOYING THE WRONG VERSION CAUSES:**
- ✗ All your translation fixes lost
- ✗ Production reverted to old violations
- ✗ Months of improvements overwritten
- ✗ Hours of re-work required
- ✗ User complaints about broken translations

**Before ANY deployment, ask yourself:**
- ✅ "Am I working in REFERENCE TRANSLATIONS folder?"
- ✅ "Does my pscp command path include 'REFERENCE TRANSLATIONS'?"
- ✅ "Did I verify this is NOT a random file in project root?"

**If you cannot answer YES to all three questions, STOP and verify your source file.**

---

## 📊 COMPLETE GLOSSARY QUICK REFERENCE

### Core UI (Lines 84-94)
- **Worksheet** (86): DE=Arbeitsblatt, PT=Folha de trabalho, IT=Scheda didattica, FI=Tehtävämoniste
- **Generate/Create** (88): See section 3.1 above
- **Answer Key** (89): See section 3.2 above
- **Download** (90): Verified correct in most apps
- **Upload** (91): FI="Lataa palvelimelle" (to server)
- **Clear All** (92): DE=Alles zurücksetzen, NO=Slett alt
- **Save** (93): Usually correct
- **Print** (94): Usually correct

### Page Setup (Lines 100-109)
- Usually correct, verify if issues arise

### Image & Media Library (Lines 116-122)
- **Upload Custom Images** (119): SV="Ladda upp egna bilder", FI="Lataa omia kuvia" (EXACT)
- **Theme** (116): Usually correct
- **All Themes** (117): Usually correct

### Text & Typography (Lines 128-134)
- **Text Tools** (128): SV=Textalternativ (NOT Textverktyg)
- **Add Text** (129): Usually correct
- **Font, Size, Color** (130-132): Usually correct
- **Outline** (133-134): Usually correct

### Layout & Alignment (Lines 140-147)
- **Align, Align Left, Align Right** (140-142): Usually correct
- **Center Horizontally/Vertically** (143-144): Usually correct
- **Layers** (145): Usually correct
- **Bring Forward** (146): See section 3.7 above
- **Send Backward** (147): See section 3.7 above

### Background & Border (Lines 153-159)
- **Background** (153): Usually correct
- **Background Theme** (154): Usually correct
- **Background Opacity** (155): DA=Baggrundsdekning, NO=Bakgrunnsdekkevne
- **Border** (156): DA=Ramme, NO=Ramme (NOT Kant)
- **Border Theme** (157): DA=Rammetema, NO=Rammetema
- **Border Opacity** (158): DA=Rammedekning, NO=Rammedekkevne
- **None** (159): Usually correct

---

## ⚠️ COMMON MISTAKES TO AVOID

### Translation Mistakes:
1. **Only checking main keys** - Must check ALL variations (JPEG, PDF, compound keys, message strings)
2. **Missing exact phrase translations** - Line 119 "Upload Custom Images" has EXACT translations
3. **Not using replace_all** - For message strings with generate/create, use replace_all=true
4. **Claiming complete prematurely** - Run ALL verification commands before deploying
5. **Assuming English is correct** - English IS correct, but grep will find it. Filter it out.
6. **Not checking Danish "Kant"** - Danish uses "Ramme" for border, not "Kant" (edge)
7. **Forgetting Norwegian opacity** - Uses "dekkevne" not "synlighet" or "ugjennomsiktighet"
8. **Missing compound forms** - Check generateWorksheet, generatingAnswerKey, etc.

### 🚨 CRITICAL DEPLOYMENT MISTAKES (CAUSES PRODUCTION OVERWRITES):
9. **Using wrong source file** - ALWAYS work in REFERENCE TRANSLATIONS folder, NEVER use files from project root or frontend/public
10. **Not stating file path explicitly** - Say "from REFERENCE TRANSLATIONS folder" before deployment
11. **Copying to root for editing** - Edit DIRECTLY in REFERENCE TRANSLATIONS, not in temporary copies
12. **Using random backup files** - Files like "DEPLOYED-*.js" or "*-backup.js" are OLD versions
13. **Ambiguous pscp commands** - Deployment command MUST include full path starting with "REFERENCE TRANSLATIONS"

---

## 📝 DOCUMENTATION TEMPLATE

After completing each app, create a file: `{APP}-TRANSLATION-AUDIT-COMPLETE.md`

```markdown
# {APP} - TRANSLATION AUDIT COMPLETE
**Date:** YYYY-MM-DD
**Status:** ✅ COMPLETE
**Total Violations Fixed:** XXX

## Violations Fixed
[List all categories and counts]

## Verification
[Show all grep command results = 0]

## Deployment Safety
✅ Worked in REFERENCE TRANSLATIONS folder (no overwrites)
✅ Deployed from: C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-{APP}-complete.js
✅ REFERENCE TRANSLATIONS folder updated with latest version

## Deployment
✅ Deployed to production server: 65.108.5.250
✅ PM2 restarted successfully
✅ No errors in PM2 logs

## Next App
[Name of next app to audit]
```

---

## 🎯 SUCCESS CRITERIA

An app is COMPLETE when:
1. ✅ ALL verification commands return 0 (or only legitimate English/French)
2. ✅ Deployed from REFERENCE TRANSLATIONS folder (verified with explicit path statement)
3. ✅ PM2 restarted successfully with no errors in logs
4. ✅ REFERENCE TRANSLATIONS folder contains the updated file (automatic if you worked there)
5. ✅ Documentation file created
6. ✅ No violations found in spot-check grep commands

---

## 📌 FOR NEXT CONVERSATION

**Start each new conversation with:**

"I need to fix translation violations in {APP_NAME} according to LANGUAGE_STANDARDS.md. Please follow TRANSLATION-FIX-COMPLETE-GUIDE.md step-by-step. Start by reading LANGUAGE_STANDARDS.md lines 84-159, then systematically check ALL 60+ glossary terms. CRITICAL: Work ONLY in REFERENCE TRANSLATIONS folder to prevent overwriting production with old versions (see DEPLOYMENT.md)."

This ensures:
- Nothing is missed in translation audit
- Systematic approach is followed
- **DEPLOYMENT SAFETY: No risk of overwriting production with old versions**
