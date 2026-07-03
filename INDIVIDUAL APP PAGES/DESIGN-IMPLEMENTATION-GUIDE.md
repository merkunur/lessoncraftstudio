# Product Page Design & Implementation Guide

---

## ⛔⛔⛔ MANDATORY: READ THIS ENTIRE FILE BEFORE STARTING ⛔⛔⛔

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   🔴🔴🔴 CRITICAL INSTRUCTION FOR AI ASSISTANTS 🔴🔴🔴                            ║
║                                                                                   ║
║   YOU MUST ANALYZE THIS FILE THOROUGHLY AND READ EVERY SINGLE LINE               ║
║   WHEN THIS FILE IS REFERRED TO - EVEN IF IT IS A LONG FILE AND                  ║
║   EXCEEDS YOUR TOKEN LIMIT FOR ONE SINGLE ACTION.                                ║
║                                                                                   ║
║   WORKAROUNDS YOU MUST USE:                                                       ║
║   1. Divide the file into multiple parts (read offset 0-200, 200-400, etc.)      ║
║   2. Ask the user for continuation if needed                                      ║
║   3. Use Grep to search for specific sections                                     ║
║   4. Read section by section until you've covered the entire file                 ║
║                                                                                   ║
║   FAILURES THAT OCCUR FROM SKIMMING THIS FILE:                                    ║
║   ❌ LITERAL TRANSLATION of app names instead of NATURAL language terms          ║
║      (e.g., "Bilder Sortieren Generator" instead of "Sortierübungen Generator")  ║
║   ❌ BLINDLY COPYING app names from source .md files without verification        ║
║      (Source files may contain literal translation errors too!)                   ║
║   ❌ Wrong sample paths (e.g., "alphabet train" vs "alphabet-train")             ║
║   ❌ English words left untranslated (e.g., "Core Bundle" instead of             ║
║      "Grundpaketet" in Swedish)                                                   ║
║   ❌ Missing deployment steps (samples not copied to standalone)                  ║
║   ❌ Missing hreflang tags and canonical URLs                                     ║
║   ❌ Wrong URL slugs (English slugs on non-English pages)                        ║
║                                                                                   ║
║   IF YOU DON'T READ THE ENTIRE FILE, YOU WILL MAKE THESE MISTAKES!               ║
║                                                                                   ║
║   EVERY SECTION IN THIS FILE EXISTS BECAUSE SOMEONE MADE THAT MISTAKE.           ║
║   DON'T REPEAT HISTORY.                                                           ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🛡️🛡️🛡️ MANDATORY: DEPLOYMENT COMMANDS - SEE DEPLOYMENT.md 🛡️🛡️🛡️

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   📋 ALL DEPLOYMENT COMMANDS ARE DEFINED IN: DEPLOYMENT.md                        ║
║   📋 THIS FILE REFERENCES DEPLOYMENT.md - IT IS THE AUTHORITATIVE SOURCE          ║
║                                                                                   ║
║   FOR PRODUCT PAGE DEPLOYMENTS, USE SCENARIO 1 FROM DEPLOYMENT.md:               ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   🟢 THE COMPLETE DEPLOYMENT COMMAND (COPY-PASTE THIS EXACTLY):                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   "C:\Program Files\PuTTY\plink.exe" -batch -pw REDACTED-ROTATED-20260703-use-ssh-key-auth \                  ║
║     -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" \               ║
║     root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && \                 ║
║     cd frontend && npm run build && cp -r .next/static \                          ║
║     .next/standalone/.next/static && pm2 restart lessoncraftstudio"               ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   🔴 THESE SHORTHAND FORMS DO NOT WORK - NEVER USE THEM:                          ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   ❌ plink root@server "..."        ← "server" is not a hostname!                 ║
║   ❌ plink ... "..."                ← Incomplete command!                         ║
║   ❌ ssh root@65.108.5.250 "..."    ← ssh doesn't work on Windows!                ║
║   ❌ pscp ... root@server:...       ← "server" is not a hostname!                 ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   ⚠️  IF YOU SEE SHORTHAND COMMANDS ELSEWHERE IN THIS FILE, THEY ARE             ║
║       PLACEHOLDERS - ALWAYS USE THE FULL COMMAND FROM DEPLOYMENT.md!             ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🚨🚨🚨 CRITICAL: APP NAMES MUST BE NATURAL LANGUAGE - NO LITERAL TRANSLATIONS 🚨🚨🚨

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ⛔⛔⛔ THIS IS THE #1 MISTAKE MADE ON NON-ENGLISH PAGES ⛔⛔⛔                    ║
║                                                                                   ║
║   DO NOT LITERALLY TRANSLATE THE ENGLISH APP NAME!                                ║
║   USE THE NATURAL TERM THAT NATIVE SPEAKERS WOULD ACTUALLY USE!                   ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   🔴 REAL FAILURE CASE (January 2026) - German Picture Sort:                      ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   ❌ WRONG: "Bilder Sortieren Generator"                                          ║
║      └─ This is a LITERAL TRANSLATION of "Picture Sort Generator"                 ║
║      └─ "Bilder Sortieren" = infinitive phrase + noun = AWKWARD GERMAN            ║
║      └─ No German teacher would search for this term!                             ║
║                                                                                   ║
║   ✅ CORRECT: "Sortierübungen Generator"                                          ║
║      └─ "Sortierübungen" = "Sorting Exercises" = NATURAL GERMAN                   ║
║      └─ This is what German educators actually search for                         ║
║      └─ Proper German compound noun construction                                  ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   THE RULE: WHAT WOULD A NATIVE SPEAKER ACTUALLY CALL THIS?                       ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   BEFORE naming any app in a non-English language, ASK YOURSELF:                  ║
║                                                                                   ║
║   1. "If I were a [German/Swedish/French/etc.] teacher, what would I              ║
║       type into Google to find this type of worksheet?"                           ║
║                                                                                   ║
║   2. "Does this name sound like something a native speaker would say,             ║
║       or does it sound like Google Translate output?"                             ║
║                                                                                   ║
║   3. "Is this a proper compound noun/phrase in this language, or am I             ║
║       just replacing English words with translated equivalents?"                  ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   MORE EXAMPLES OF WRONG vs RIGHT:                                                ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   GERMAN:                                                                         ║
║   ❌ "Bilder Sortieren Generator" → ✅ "Sortierübungen Generator"                 ║
║   ❌ "Wörter Raten Generator" → ✅ "Worträtsel-Generator"                         ║
║      └─ "Wörter Raten" = infinitive phrase = AWKWARD (same pattern as above!)    ║
║   ❌ "Wort Suche Generator" → ✅ "Suchsel Generator" or "Wortgitter Generator"    ║
║   ❌ "Bild Kreuzworträtsel" → ✅ "Bilderkreuzworträtsel" (proper compound)        ║
║                                                                                   ║
║   SWEDISH:                                                                        ║
║   ❌ "Bild Sortering Generator" → ✅ "Sorteringsövningar Generator"               ║
║   ❌ "Ord Sök Generator" → ✅ "Ordletar Generator" or "Sökord Generator"          ║
║                                                                                   ║
║   FRENCH:                                                                         ║
║   ❌ "Image Tri Générateur" → ✅ "Générateur d'Exercices de Tri"                  ║
║   ❌ "Mot Recherche Générateur" → ✅ "Générateur de Mots Cachés"                  ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   MANDATORY VERIFICATION BEFORE FINALIZING APP NAME:                              ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   □ Does this name use natural language-specific terminology?                     ║
║   □ Would a native speaker actually use this term?                                ║
║   □ Is the grammar correct for this language (compounds, word order)?             ║
║   □ Have I avoided literal word-for-word translation from English?                ║
║   □ Does it sound professional, not like machine translation?                     ║
║                                                                                   ║
║   IF YOU ANSWERED "NO" TO ANY OF THESE → STOP AND FIND A BETTER NAME!             ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   WHERE APP NAMES APPEAR (ALL MUST USE THE NATURAL NAME):                         ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   1. Content file: hero.title, seo.title, features.sectionTitle, etc.             ║
║   2. page.tsx: generateMetadata() title, description, openGraph.title             ║
║   3. All FAQ questions and answers that mention the generator name                ║
║   4. All feature descriptions that mention the generator name                     ║
║   5. CTA titles and descriptions                                                  ║
║                                                                                   ║
║   USE GREP TO VERIFY - Replace "Old Name" with your literal translation:          ║
║   grep -rn "Old Name" frontend/content/product-pages/{locale}/                    ║
║   grep -n "Old Name" frontend/app/[locale]/apps/[slug]/page.tsx                   ║
║                                                                                   ║
║   ALL MATCHES MUST BE REPLACED WITH THE NATURAL LANGUAGE NAME!                    ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🚨🚨🚨 CRITICAL: SOURCE .MD FILES MAY CONTAIN LITERAL TRANSLATION ERRORS 🚨🚨🚨

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ⛔⛔⛔ DO NOT BLINDLY COPY APP NAMES FROM THE SOURCE .MD FILE! ⛔⛔⛔            ║
║                                                                                   ║
║   THE SOURCE .MD FILE IN "INDIVIDUAL APP PAGES/{Language}/" IS NOT               ║
║   AUTOMATICALLY CORRECT! IT MAY CONTAIN THE SAME LITERAL TRANSLATION             ║
║   ERRORS THIS GUIDE WARNS AGAINST!                                               ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   🔴 REAL FAILURE CASE (January 2026) - German Word Guess:                        ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   The source file "INDIVIDUAL APP PAGES/German/woerter-raten.md" contained:      ║
║                                                                                   ║
║   ❌ Title: "Wörter Raten Generator"                                              ║
║      └─ This is a LITERAL TRANSLATION of "Word Guess Generator"                   ║
║      └─ "Wörter Raten" = infinitive phrase = AWKWARD GERMAN                      ║
║      └─ The AI blindly copied this without verification!                          ║
║                                                                                   ║
║   ✅ The body text of the SAME FILE used: "Worträtsel"                            ║
║      └─ This is the NATURAL German term!                                          ║
║      └─ The AI should have noticed this inconsistency!                            ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   MANDATORY RULE: ALWAYS VERIFY APP NAMES FROM SOURCE .MD FILES                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   BEFORE copying any app name from a source .md file, you MUST:                   ║
║                                                                                   ║
║   1. READ THE BODY TEXT - What term does the body actually use?                   ║
║      If the body uses a different term than the title → USE THE BODY TERM!        ║
║                                                                                   ║
║   2. APPLY THE VERIFICATION CHECKLIST (from previous section):                    ║
║      □ Does this name use natural language-specific terminology?                  ║
║      □ Would a native speaker actually use this term?                             ║
║      □ Is the grammar correct for this language?                                  ║
║      □ Have I avoided literal word-for-word translation from English?             ║
║                                                                                   ║
║   3. CHECK FOR THE "INFINITIVE + NOUN" PATTERN:                                   ║
║      ❌ "Wörter Raten" = "Words Guess" = infinitive pattern = WRONG               ║
║      ❌ "Bilder Sortieren" = "Pictures Sort" = infinitive pattern = WRONG         ║
║      ✅ "Worträtsel" = compound noun = CORRECT                                    ║
║      ✅ "Sortierübungen" = compound noun = CORRECT                                ║
║                                                                                   ║
║   4. IF IN DOUBT → ASK THE USER before proceeding!                                ║
║      "The source file uses 'X' but this appears to be a literal translation.      ║
║       Should I use 'Y' instead, which is used in the body text?"                  ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   THE SOURCE .MD FILE IS INPUT, NOT GOSPEL!                                       ║
║   YOUR JOB IS TO VERIFY AND CORRECT, NOT BLINDLY COPY!                            ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🛑🛑🛑 MANDATORY PRE-FLIGHT CHECKLIST FOR HERO TITLES 🛑🛑🛑

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ⛔⛔⛔ BEFORE WRITING ANY HERO TITLE, COMPLETE THIS CHECKLIST ⛔⛔⛔              ║
║                                                                                   ║
║   HERO TITLES GET CUT OFF CONSTANTLY. THIS CHECKLIST IS MANDATORY.               ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   FOR EACH WORD IN YOUR PROPOSED TITLE:                                           ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   □ Word 1: _____________ = ___ characters (MUST be ≤12)                          ║
║   □ Word 2: _____________ = ___ characters (MUST be ≤12)                          ║
║   □ Word 3: _____________ = ___ characters (MUST be ≤12)                          ║
║   □ Word 4: _____________ = ___ characters (MUST be ≤12)                          ║
║                                                                                   ║
║   □ TOTAL CHARACTERS: ___ (MUST be ≤25)                                           ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   REAL EXAMPLES OF FAILURES (SO YOU DON'T REPEAT THEM):                           ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   ❌ "Mönsterigenkänning Arbetsblad Gratis för Förskoleklass Material"            ║
║      └─ "Mönsterigenkänning" = 18 chars → DISPLAYS AS "Mönsterigenkä"             ║
║      └─ Total = 58 chars → WAY OVER 25 LIMIT                                      ║
║                                                                                   ║
║   ✅ "Mönster Arbetsblad Gratis"                                                  ║
║      └─ "Mönster" = 7 chars ✓                                                     ║
║      └─ "Arbetsblad" = 10 chars ✓                                                 ║
║      └─ "Gratis" = 6 chars ✓                                                      ║
║      └─ Total = 23 chars ✓                                                        ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   NORDIC/GERMAN COMPOUND WORDS - ALWAYS SPLIT THEM:                               ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   ❌ Mönsterigenkänning (18) → ✅ Mönster (7)                                     ║
║   ❌ Bildkryptogram (14) → ✅ Bild Kryptogram (4+10)                              ║
║   ❌ Rutnätsmatching (15) → ✅ Rutnäts Match (7+5)                                ║
║   ❌ Arbeitsblätter (14) → ✅ Arbeits Blätter (7+7)                               ║
║                                                                                   ║
║   IF ANY WORD EXCEEDS 12 CHARACTERS, THE TITLE WILL BE CUT OFF.                   ║
║   IF TOTAL EXCEEDS 25 CHARACTERS, THE TITLE WILL BE CUT OFF.                      ║
║   THERE ARE NO EXCEPTIONS. COUNT THE CHARACTERS BEFORE WRITING.                   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🛑🛑🛑 MANDATORY: ZERO ENGLISH ON NON-ENGLISH PAGES 🛑🛑🛑

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   🔴🔴🔴 SOURCE OF TRUTH FOR ALL TRANSLATIONS: messages/[locale].json 🔴🔴🔴       ║
║                                                                                   ║
║   BEFORE writing ANY translation for tier names (Core Bundle, Full Access):       ║
║                                                                                   ║
║   1. OPEN: frontend/messages/{locale}.json                                        ║
║   2. SEARCH for "coreBundle" or "fullAccess" key                                  ║
║   3. COPY the EXACT value - do NOT guess or modify!                               ║
║                                                                                   ║
║   ❌ NEVER GUESS TRANSLATIONS - YOU WILL GET IT WRONG!                             ║
║   ❌ "Voller Zugang" was WRONG - the correct German is "Vollzugriff"               ║
║   ❌ DO NOT translate tier names yourself - USE the messages file!                 ║
║                                                                                   ║
║   COMMAND TO VERIFY (example for German):                                          ║
║   grep -n '"coreBundle"\|"fullAccess"\|"name"' frontend/messages/de.json          ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ⛔⛔⛔ CHECK BOTH FILES BEFORE EVERY COMMIT ⛔⛔⛔                                 ║
║                                                                                   ║
║   ENGLISH WORDS ON NON-ENGLISH PAGES IS A CRITICAL FAILURE.                       ║
║   YOU MUST CHECK TWO LOCATIONS - NOT JUST THE CONTENT FILE!                       ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   ⚠️ TWO LOCATIONS WHERE ENGLISH CAN SNEAK IN:                                    ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   1. CONTENT FILE: frontend/content/product-pages/{locale}/*.ts                   ║
║      └─ Contains hero text, features, FAQs, etc.                                  ║
║                                                                                   ║
║   2. PAGE.TSX: frontend/app/[locale]/apps/[slug]/page.tsx                         ║
║      └─ Contains HARDCODED SEO metadata in generateMetadata()                     ║
║      └─ This is the meta description shown in Google search results!              ║
║      └─ MUST ALSO BE IN THE TARGET LANGUAGE!                                      ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   ⚠️ BEFORE WRITING ANY NON-ENGLISH CONTENT - ASK YOURSELF:                       ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   □ Am I about to write "Full Access"? → Use translation below!                   ║
║   □ Am I about to write "Core Bundle"? → Use translation below!                   ║
║   □ Am I about to write any English subscription term? → STOP AND TRANSLATE!      ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   COMPLETE TRANSLATION TABLE - ALL 11 LANGUAGES:                                  ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   "Full Access" translations (for $240/year subscription):                        ║
║   ─────────────────────────────────────────────────────────────────────────────   ║
║   Swedish (sv):     "Full Tillgång"                                               ║
║   German (de):      "Vollzugriff"     ← FROM messages/de.json:72 (NOT "Voller Zugang"!) ║
║   French (fr):      "Accès Complet"                                               ║
║   Spanish (es):     "Acceso Completo"                                             ║
║   Italian (it):     "Accesso Completo"                                            ║
║   Portuguese (pt):  "Acesso Completo"                                             ║
║   Dutch (nl):       "Volledige Toegang"                                           ║
║   Danish (da):      "Fuld Adgang"                                                 ║
║   Norwegian (no):   "Full Tilgang"                                                ║
║   Finnish (fi):     "Täysi Käyttöoikeus"                                          ║
║                                                                                   ║
║   "Core Bundle" translations (for $144/year subscription):                        ║
║   ─────────────────────────────────────────────────────────────────────────────   ║
║   Swedish (sv):     "Grundpaketet"                                                ║
║   German (de):      "Basis-Paket"      ← FROM messages/de.json:128                ║
║   French (fr):      "Pack Essentiel"   ← FROM messages/fr.json:180                ║
║   Spanish (es):     "Paquete Esencial" ← FROM messages/es.json:180                ║
║   Italian (it):     "Pacchetto Essenziale" ← FROM messages/it.json:180            ║
║   Portuguese (pt):  "Pacote Essencial" ← FROM messages/pt.json:180                ║
║   Dutch (nl):       "Basispakket"      ← FROM messages/nl.json:180                ║
║   Danish (da):      "Grundpakke"                                                  ║
║   Norwegian (no):   "Grunnpakke"                                                  ║
║   Finnish (fi):     "Peruspaketti"                                                ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   🔴 REAL FAILURE CASE #1 (January 2026) - Content File:                          ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   ❌ Swedish Pattern Worksheets content file had "Full Access" in 11 places       ║
║      instead of "Full Tillgång"                                                   ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   🔴 REAL FAILURE CASE #2 (January 2026) - page.tsx:                              ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   ❌ page.tsx generateMetadata() had hardcoded "Full Access-prenumeration"        ║
║      in the Swedish meta description                                              ║
║   ❌ Content file was CORRECT, but page.tsx was ENGLISH                           ║
║   ❌ Took multiple rebuilds to diagnose because grep on content files             ║
║      showed 0 matches - the English was hidden in page.tsx!                       ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   🔴 REAL FAILURE CASE #3 (January 2026) - GUESSING TRANSLATIONS:                 ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   ❌ German Alphabet Train page had pricing.title: "Basispaket" (WRONG!)          ║
║   ❌ GUESSED the translation instead of checking messages/de.json                 ║
║   ❌ Then WRONGLY "fixed" to "Voller Zugang" (Full Access) - ALSO WRONG!          ║
║   ❌ Alphabet Train is Core Bundle, not Full Access!                              ║
║   ✅ CORRECT translation from messages/de.json:128 is "Basis-Paket" (with hyphen) ║
║                                                                                   ║
║   ROOT CAUSE: Did not verify in messages/[locale].json - GUESSED instead!         ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   🚨 MANDATORY VERIFICATION STEP - NEVER SKIP THIS! 🚨                            ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   BEFORE writing pricing.title for ANY non-English page:                          ║
║                                                                                   ║
║   1. Determine if app is Core Bundle or Full Access (check SEO-RULES.md)          ║
║   2. Open frontend/messages/[locale].json                                         ║
║   3. Search for "coreBundle" or "fullAccess" key                                  ║
║   4. Copy the EXACT translation - do NOT guess or modify!                         ║
║                                                                                   ║
║   Example for German Core Bundle app:                                             ║
║   grep -n '"coreBundle"' frontend/messages/de.json                                ║
║   → Line 128: "coreBundle": "Basis-Paket"                                         ║
║   → Use EXACTLY "Basis-Paket" in pricing.title                                    ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   GREP CHECK - RUN BOTH COMMANDS BEFORE EVERY NON-ENGLISH COMMIT:                 ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   # CHECK 1: Content file                                                         ║
║   grep -n "Full Access\|Core Bundle" frontend/content/product-pages/sv/*.ts      ║
║                                                                                   ║
║   # CHECK 2: page.tsx SEO metadata (CRITICAL - DON'T FORGET THIS!)                ║
║   grep -n "Full Access\|Core Bundle" frontend/app/[locale]/apps/[slug]/page.tsx  ║
║                                                                                   ║
║   If ANY matches found in EITHER file → FIX THEM before committing!               ║
║                                                                                   ║
║   THERE ARE NO EXCEPTIONS. EVERY WORD MUST BE IN THE TARGET LANGUAGE.             ║
║   THIS INCLUDES THE SEO META DESCRIPTION IN page.tsx!                             ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

### How to Read This File Properly

1. **First pass**: Read lines 1-130 (CRITICAL: App naming, hero titles, zero English rules)
2. **Second pass**: Read lines 130-300 (language requirements, SEO slugs, workflow)
3. **Third pass**: Read lines 300-500 (sample paths, file structure)
4. **Fourth pass**: Read lines 500+ (content template, checklist)

**⚠️ MOST IMPORTANT SECTIONS (READ THESE FIRST):**
- **Lines 40-125**: APP NAMES MUST BE NATURAL LANGUAGE (not literal translations)
- **Lines 180-215**: ZERO ENGLISH ON NON-ENGLISH PAGES

**DO NOT PROCEED WITH IMPLEMENTATION UNTIL YOU'VE READ ALL SECTIONS.**

---

## 🔢 MANDATORY WORKFLOW - FOLLOW EVERY STEP IN ORDER 🔢

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   COMPLETE THESE STEPS IN ORDER - DO NOT SKIP ANY STEP                            ║
║   DO NOT SAY "DONE" UNTIL YOU REACH STEP 7                                        ║
║                                                                                   ║
║   □ STEP 1: Create content file                                                   ║
║             frontend/content/product-pages/{locale}/{app-slug}.ts                 ║
║                                                                                   ║
║   □ STEP 2: Update 5 configuration files                                          ║
║             • product-page-content.ts (add import + registry)                     ║
║             • product-page-slugs.ts (add locale slug)                             ║
║             • AppCard.tsx (add slug mapping)                                      ║
║             • page.tsx (add import, metadata, staticParams)                       ║
║             • next.config.js (add 301 redirect for non-English)                   ║
║                                                                                   ║
║   □ STEP 3: Verify TypeScript compiles (use IDE diagnostics)                      ║
║                                                                                   ║
║   □ STEP 4: git add, commit, push                                                 ║
║                                                                                   ║
║   □ STEP 5: Deploy to server (SEE DEPLOYMENT.md SCENARIO 1)                       ║
║             Use the FULL plink command from DEPLOYMENT.md section above           ║
║                                                                                   ║
║   □ STEP 6: Copy samples to standalone directory                                  ║
║             Use FULL plink command: mkdir -p && cp -r (see examples below)        ║
║                                                                                   ║
║   □ STEP 7: VERIFY LIVE URLs return HTTP 200                                      ║
║             • Page URL must return 200                                            ║
║             • Sample image URL must return 200                                    ║
║             • PDF download URL must return 200                                    ║
║             • (Non-English) Redirect from English slug must return 308            ║
║                                                                                   ║
║   ════════════════════════════════════════════════════════════════════════════    ║
║                                                                                   ║
║   ✅ TASK IS COMPLETE ONLY WHEN STEP 7 PASSES                                     ║
║                                                                                   ║
║   ❌ "Files created" = STEP 1-2 ONLY - NOT DONE                                   ║
║   ❌ "TypeScript verified" = STEP 3 ONLY - NOT DONE                               ║
║   ❌ "Committed to git" = STEP 4 ONLY - NOT DONE                                  ║
║   ❌ "Deployed to server" = STEP 5-6 ONLY - NOT DONE                              ║
║   ✅ "Live URL returns 200" = STEP 7 = DONE                                       ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## ⚡ QUICK REFERENCE - CHECK BEFORE WRITING ⚡

### Product Name Translations (NEVER use English on non-English pages!)

**ALL 11 LANGUAGES - Core Bundle:**
| en | de | fr | es | it | pt | nl | da | sv | no | fi |
|----|----|----|----|----|----|----|----|----|----|----|
| Core Bundle | Basis-Paket | Pack Essentiel | Paquete Esencial | Pacchetto Essenziale | Pacote Essencial | Basispakket | Grundpakke | Baspaket | Grunnpakke | Peruspaketti |

**ALL 11 LANGUAGES - Full Access:**
| en | de | fr | es | it | pt | nl | da | sv | no | fi |
|----|----|----|----|----|----|----|----|----|----|----|
| Full Access | Vollzugriff | Accès Complet | Acceso Completo | Accesso Completo | Acesso Completo | Volledige Toegang | Fuld Adgang | Full Tillgång | Full Tilgang | Täysi Käyttöoikeus |

⚠️ **SOURCE OF TRUTH: `frontend/messages/[locale].json`** - ALWAYS verify translations there!
⚠️ **German "Full Access" = "Vollzugriff"** (NOT "Voller Zugang" - this was a previous error!)

### Required Sample Properties (TypeScript will FAIL if missing!)

Every item in `samples.items` MUST have ALL of these properties:

```typescript
{
  id: string,           // REQUIRED - Unique identifier (e.g., '1', '2', '3')
  worksheetSrc: string, // REQUIRED - Path to worksheet image
  answerKeySrc: string, // REQUIRED - Path to answer key (use '' for coloring pages!)
  altText: string,      // REQUIRED - Alt text in TARGET language
  pdfDownloadUrl?: string, // Optional but recommended - enables PDF download
}
```

**⚠️ `answerKeySrc` is NOT optional!** Use empty string `''` for apps without answer keys (coloring, drawing, etc.)

### Before You Start Any Non-English Page

1. **Open an existing file in your target language** as a template:
   - Swedish: `frontend/content/product-pages/sv/*.ts`
   - German: `frontend/content/product-pages/de/*.ts`
   - French: `frontend/content/product-pages/fr/*.ts`
2. **Copy and modify** that file - don't start from scratch
3. **Check the translation table above** for product name translations

---

## Hero Title Best Practices

The HeroSection component **automatically handles long titles** with smart responsive design:

### Automatic Features (No Action Required)

| Feature | Description |
|---------|-------------|
| **Fluid Font Sizing** | Uses CSS `clamp()` - automatically scales based on viewport size |
| **Dynamic Title Sizing** | Shorter titles display larger, longer titles use smaller readable fonts |
| **Word Breaking** | `break-words` class ensures long words wrap instead of overflow |
| **Language-Aware Hyphenation** | `hyphens-auto` with `lang` attribute enables proper hyphenation |

### How Title Sizing Works

The component automatically adjusts font size based on title length:

| Title Length | Font Size | Example |
|--------------|-----------|---------|
| Under 35 chars | Large & dramatic | "Addition Worksheets" |
| 35-50 chars | Medium size | "Sorteringsaktiviteter Barn - Arbetsblad" |
| Over 50 chars | Smaller, readable | "Sorteringsaktiviteter Barn - Arbetsblad Gratis" |

```typescript
// HeroSection.tsx - Automatic font sizing
const getTitleFontSize = (title: string): string => {
  const charCount = title.length;
  if (charCount > 50) return 'clamp(1.75rem, 4vw + 0.5rem, 3.5rem)';
  if (charCount > 35) return 'clamp(2rem, 4.5vw + 0.75rem, 4rem)';
  return 'clamp(2.25rem, 5vw + 1rem, 4.5rem)';
};
```

### Tips for Best Visual Results

**No character limits required** - but for optimal visual impact:

- **Shorter titles (under 35 chars)** display larger and more dramatic
- **Use SEO keywords** in your title - they rank well AND fit naturally
- **Compound words will hyphenate** when needed (e.g., "Sorterings-aktiviteter")

### Two-Tone Title Effect

Titles are split at the midpoint by word count:
- **First half**: White gradient text
- **Second half**: Cyan → Purple → Pink gradient text

```typescript
const titleWords = title.split(' ');
const firstPart = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
const secondPart = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');
```

---

## 🔴🔴🔴 SERVER CONNECTION - MEMORIZE THIS FIRST 🔴🔴🔴

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   🖥️ PRODUCTION SERVER DETAILS (DO NOT USE ANY OTHER!)                            ║
║                                                                                   ║
║   IP ADDRESS:   65.108.5.250                                                      ║
║   USER:         root                                                              ║
║   PASSWORD:     REDACTED-ROTATED-20260703-use-ssh-key-auth                                                    ║
║   HOSTKEY:      SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU                ║
║   APP PATH:     /opt/lessoncraftstudio                                            ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   ❌ WRONG METHODS (DO NOT USE - THESE WILL FAIL!):                               ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   ❌ ssh root@217.154.12.168          ← WRONG IP - THIS SERVER DOESN'T EXIST!     ║
║   ❌ ssh lessoncraftstudio            ← NOT A VALID HOSTNAME!                     ║
║   ❌ plink root@server                ← "server" IS NOT A HOSTNAME!               ║
║   ❌ plink lessoncraftstudio          ← NOT A VALID HOSTNAME!                     ║
║   ❌ ssh root@65.108.5.250            ← SSH WON'T WORK ON WINDOWS - USE PLINK!    ║
║                                                                                   ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║   ✅ CORRECT METHOD (WINDOWS - COPY THIS EXACT COMMAND):                          ║
║   ═══════════════════════════════════════════════════════════════════════════     ║
║                                                                                   ║
║   "C:\Program Files\PuTTY\plink.exe" -batch -pw REDACTED-ROTATED-20260703-use-ssh-key-auth \                  ║
║     -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" \               ║
║     root@65.108.5.250 "YOUR COMMAND HERE"                                         ║
║                                                                                   ║
║   ⚠️ IF YOUR COMMAND SAYS "Connection timed out" OR "Host does not exist":       ║
║      → You're using the WRONG IP address!                                         ║
║      → The ONLY valid IP is: 65.108.5.250                                         ║
║      → Copy the EXACT plink command from the examples below!                      ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### ⚠️ CONNECTION TROUBLESHOOTING

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Connection timed out" | Wrong IP address | Use `65.108.5.250` - NOT any other IP! |
| "Host does not exist" | Using hostname instead of IP | Use `root@65.108.5.250` - NOT `lessoncraftstudio` |
| "Network error" | Using `ssh` on Windows | Use `plink.exe` with full path, not `ssh` |
| "Host key verification failed" | Missing `-hostkey` parameter | Add `-hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU"` |
| "Unable to open connection" | Wrong format or missing -batch | Use EXACT format from examples below |

---

## 🚨🚨🚨 STOP! DEPLOYMENT IS MANDATORY - NOT OPTIONAL 🚨🚨🚨

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   THE TASK IS NOT COMPLETE UNTIL THE PAGE IS LIVE ON PRODUCTION                   ║
║                                                                                   ║
║   Creating files locally and verifying "npm run build" passes is NOT enough!     ║
║                                                                                   ║
║   YOU MUST:                                                                       ║
║   1. git commit && git push                                                       ║
║   2. Deploy to server (git pull, npm run build, pm2 restart)                     ║
║   3. Copy samples to standalone directory on server                              ║
║   4. Verify LIVE URL returns HTTP 200:                                           ║
║      curl https://www.lessoncraftstudio.com/en/apps/{app-slug}                   ║
║                                                                                   ║
║   ❌ "Build passed locally" = NOT DONE                                            ║
║   ❌ "Files created" = NOT DONE                                                   ║
║   ❌ "Committed to git" = NOT DONE                                                ║
║   ✅ "Live URL returns 200" = DONE                                                ║
║                                                                                   ║
║   IF YOU SAY "DONE" BEFORE VERIFYING THE LIVE URL, YOU ARE WRONG.                ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Complete Deployment Commands (COPY-PASTE READY)

```bash
# Step 1: Commit and push
git add frontend/content/product-pages/en/{app-slug}.ts
git add "frontend/public/samples/english/{app-name}/"
git add frontend/app/[locale]/apps/[slug]/page.tsx
git commit -m "feat: Add {App Name} product page (English)"
git push origin main

# Step 2: Deploy to server
"C:\Program Files\PuTTY\plink.exe" -batch -pw REDACTED-ROTATED-20260703-use-ssh-key-auth -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"

# Step 3: Copy samples to standalone (CRITICAL - samples won't load without this!)
"C:\Program Files\PuTTY\plink.exe" -batch -pw REDACTED-ROTATED-20260703-use-ssh-key-auth -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "cp -r '/opt/lessoncraftstudio/frontend/public/samples/english/{app-name}' '/opt/lessoncraftstudio/frontend/.next/standalone/public/samples/english/' && pm2 restart lessoncraftstudio"

# Step 4: VERIFY LIVE URL (MUST return 200!)
"C:\Program Files\PuTTY\plink.exe" -batch -pw REDACTED-ROTATED-20260703-use-ssh-key-auth -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "curl -s -o /dev/null -w '%{http_code}' 'https://www.lessoncraftstudio.com/en/apps/{app-slug}'"
# Expected output: 200

# Step 5: VERIFY SAMPLE IMAGE (MUST return 200!)
"C:\Program Files\PuTTY\plink.exe" -batch -pw REDACTED-ROTATED-20260703-use-ssh-key-auth -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "curl -s -o /dev/null -w '%{http_code}' 'https://www.lessoncraftstudio.com/samples/english/{app-name}/{filename}.jpeg'"
# Expected output: 200
```

**ONLY AFTER BOTH CURL COMMANDS RETURN 200, THE TASK IS COMPLETE.**

---

## ⚠️⚠️⚠️ CRITICAL: COLLAPSIBLE TEXT - READ THIS FIRST ⚠️⚠️⚠️

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ALL LONG TEXT SECTIONS MUST BE COLLAPSIBLE WITH ONLY 3 SENTENCES SHOWN         ║
║                                                                                   ║
║   This applies to:                                                                ║
║   • Hero description                                                              ║
║   • Feature descriptions                                                          ║
║   • Use case descriptions                                                         ║
║   • How-to step descriptions                                                      ║
║   • FAQ answers                                                                   ║
║   • ANY text longer than 3 sentences                                              ║
║                                                                                   ║
║   DEFAULT STATE = COLLAPSED (showing only 3 sentences)                            ║
║   User clicks "Read more" to expand                                               ║
║                                                                                   ║
║   ❌ WRONG: useState(true)   - Shows all text                                     ║
║   ✅ RIGHT: useState(false)  - Shows only 3 sentences                             ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

**THE COMPONENTS ALREADY HANDLE THIS AUTOMATICALLY.**
**YOU JUST PUT THE FULL TEXT IN THE CONTENT FILE.**
**THE COMPONENT WILL COLLAPSE IT TO 3 SENTENCES BY DEFAULT.**

**DO NOT:**
- Manually truncate text in the content file
- Worry about text length - components handle display
- Set any expansion state - default is collapsed

---

## 🌍🌍🌍 CRITICAL: 100% NATIVE LANGUAGE - ZERO ENGLISH ON NON-ENGLISH PAGES 🌍🌍🌍

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   EVERY SINGLE WORD ON THE PAGE MUST BE IN THE TARGET LANGUAGE                    ║
║                                                                                   ║
║   When creating a Swedish page → EVERYTHING is Swedish                            ║
║   When creating a German page → EVERYTHING is German                              ║
║   When creating a French page → EVERYTHING is French                              ║
║                                                                                   ║
║   THIS INCLUDES:                                                                  ║
║   ✗ Product names: "Core Bundle" → "Grundpaketet" (Swedish)                       ║
║   ✗ UI labels: "Read more" → "Läs mer" (Swedish)                                  ║
║   ✗ Badge text: "Features" → "Funktioner" (Swedish)                               ║
║   ✗ Step labels: "Step 1" → "Steg 1" (Swedish)                                    ║
║   ✗ Completion text: "Done!" → "Klart!" (Swedish)                                 ║
║   ✗ Trust badges: "Secure payment" → "Säker betalning" (Swedish)                  ║
║   ✗ Button text: "Start Creating" → "Börja Skapa" (Swedish)                       ║
║   ✗ Section headers: "Who It's For" → "Vem Det Är För" (Swedish)                  ║
║   ✗ Pricing: "Full Access" → "Full Tillgång" (Swedish)                            ║
║                                                                                   ║
║   NOTHING IN ENGLISH - NOT EVEN PRODUCT NAMES!                                    ║
║   "Core Bundle" is NOT a proper noun like "iPhone" - it MUST be translated!       ║
║                                                                                   ║
║   ❌ WRONG: Swedish page with "Core Bundle", "Read more", "Features"              ║
║   ✅ RIGHT: Swedish page with "Grundpaketet", "Läs mer", "Funktioner"             ║
║                                                                                   ║
║   THE TEXT MUST SOUND NATURAL TO A NATIVE SPEAKER                                 ║
║   Not literal translations - idiomatic expressions!                               ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### UI Labels That MUST Be Translated

All these fields in the content file MUST be in the target language:

| Field | English | Swedish | German | French |
|-------|---------|---------|--------|--------|
| `hero.readMoreLabel` | Read more | Läs mer | Mehr lesen | Lire plus |
| `hero.showLessLabel` | Show less | Visa mindre | Weniger anzeigen | Voir moins |
| `hero.floatingStats.time` | 3 min | 3 min | 3 Min | 3 min |
| `hero.floatingStats.action` | Create & Download | Skapa & Ladda Ner | Erstellen & Herunterladen | Créer et Télécharger |
| `hero.floatingStats.quality` | 300 DPI | 300 DPI | 300 DPI | 300 DPI |
| `samples.badgeText` | Free Samples | Gratis Exempel | Kostenlose Beispiele | Exemples Gratuits |
| `samples.downloadingLabel` | Downloading... | Laddar ner... | Wird heruntergeladen... | Téléchargement... |
| `samples.ofLabel` | of | av | von | de |
| `features.badgeText` | Features | Funktioner | Funktionen | Fonctionnalités |
| `features.trustBadges.allFeatures` | All features included | Alla funktioner ingår | Alle Funktionen enthalten | Toutes les fonctionnalités incluses |
| `features.trustBadges.noHiddenFees` | No hidden fees | Inga dolda avgifter | Keine versteckten Gebühren | Pas de frais cachés |
| `features.trustBadges.cancelAnytime` | Cancel anytime | Avsluta när som helst | Jederzeit kündbar | Annulez à tout moment |
| `howTo.badgeText` | How It Works | Så Fungerar Det | So funktioniert es | Comment ça marche |
| `howTo.stepLabel` | Step | Steg | Schritt | Étape |
| `howTo.completionTitle` | Done! | Klart! | Fertig! | Terminé ! |
| `howTo.completionSubtitle` | Your worksheet is ready | Ditt arbetsblad är redo | Ihr Arbeitsblatt ist fertig | Votre fiche est prête |
| `howTo.readyTime` | Ready in under 3 minutes | Klart på under 3 minuter | Fertig in unter 3 Minuten | Prêt en moins de 3 minutes |
| `howTo.noSkillsNeeded` | No design skills needed | Inga designkunskaper behövs | Keine Designkenntnisse erforderlich | Aucune compétence en design requise |
| `useCases.badgeText` | Who It's For | Vem Det Är För | Für wen es ist | Pour qui c'est |
| `faq.badgeText` | FAQ | Vanliga Frågor | Häufige Fragen | Questions fréquentes |
| `faq.secureCheckout` | Secure checkout | Säker betalning | Sichere Zahlung | Paiement sécurisé |
| `faq.cancelAnytime` | Cancel anytime | Avsluta när som helst | Jederzeit kündbar | Annulez à tout moment |
| `relatedApps.badgeText` | Works Great With | Fungerar Utmärkt Med | Funktioniert gut mit | Fonctionne bien avec |
| `relatedApps.exploreText` | Explore all apps | Utforska alla appar | Alle Apps erkunden | Explorer toutes les apps |
| `relatedApps.trustBadges.securePayment` | Secure payment | Säker betalning | Sichere Zahlung | Paiement sécurisé |
| `pricing.title` | Core Bundle | Grundpaketet | Basis-Paket | Pack Essentiel |

### Product Names MUST Be Translated (FROM messages/[locale].json!)

**ALL 11 LANGUAGES - Core Bundle:**
| en | de | fr | es | it | pt | nl | da | sv | no | fi |
|----|----|----|----|----|----|----|----|----|----|----|
| Core Bundle | Basis-Paket | Pack Essentiel | Paquete Esencial | Pacchetto Essenziale | Pacote Essencial | Basispakket | Grundpakke | Baspaket | Grunnpakke | Peruspaketti |

**ALL 11 LANGUAGES - Full Access:**
| en | de | fr | es | it | pt | nl | da | sv | no | fi |
|----|----|----|----|----|----|----|----|----|----|----|
| Full Access | Vollzugriff | Accès Complet | Acceso Completo | Accesso Completo | Acesso Completo | Volledige Toegang | Fuld Adgang | Full Tillgång | Full Tilgang | Täysi Käyttöoikeus |

⚠️ **NEVER GUESS TRANSLATIONS!** Always check `frontend/messages/[locale].json` for the exact spelling!
⚠️ **German "Full Access" = "Vollzugriff"** (NOT "Voller Zugang"!)

### How to Verify: Page Language Audit

Before deploying any non-English page, search for these common English words:

```bash
# Search for English words that should NOT appear on non-English pages
grep -i "Read more\|Show less\|Features\|How It Works\|Step \|Done!\|Cancel anytime\|Core Bundle\|Full Access" content-file.ts
```

If ANY of these appear in the content file for a non-English page → FIX THEM!

---

## 📁 REFERENCE FILES - USE THESE AS TEMPLATES 📁

### Existing Content Files by Language

When creating a new product page, **always open an existing file in your target language** as a reference:

| Language | Example Files | Path |
|----------|--------------|------|
| **Swedish** | addition-worksheets.ts, coloring-worksheets.ts, word-search-worksheets.ts | `frontend/content/product-pages/sv/` |
| **German** | addition-worksheets.ts, coloring-worksheets.ts | `frontend/content/product-pages/de/` |
| **French** | addition-worksheets.ts | `frontend/content/product-pages/fr/` |
| **English** | All apps available | `frontend/content/product-pages/en/` |

### TypeScript Interface Definition

If you're unsure about required properties, check the interface definition:
- **File:** `frontend/components/product-page/ProductPageClient.tsx` (lines 12-196)
- **Sample interface:** Lines 12-18 show exactly which properties are required vs optional

```typescript
// From ProductPageClient.tsx - Sample interface
export interface Sample {
  id: string;           // REQUIRED
  worksheetSrc: string; // REQUIRED
  answerKeySrc: string; // REQUIRED (not optional! use '' if no answer key)
  altText: string;      // REQUIRED
  pdfDownloadUrl?: string; // Optional (marked with ?)
}
```

---

## 🔍🔍🔍 CRITICAL: SEO - LANGUAGE-SPECIFIC SLUGS & HREFLANG 🔍🔍🔍

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   THE URL SLUG MUST BE IN THE TARGET LANGUAGE FOR SEO!                            ║
║                                                                                   ║
║   ❌ WRONG: /sv/apps/word-search-worksheets  (English slug on Swedish page)       ║
║   ✅ RIGHT: /sv/apps/ordletar-arbetsblad     (Swedish slug on Swedish page)       ║
║                                                                                   ║
║   ❌ WRONG: /de/apps/addition-worksheets     (English slug on German page)        ║
║   ✅ RIGHT: /de/apps/additionsaufgaben-arbeitsblaetter (German slug)              ║
║                                                                                   ║
║   WHY THIS MATTERS:                                                               ║
║   • Swedish users search for "ordletare" not "word search"                        ║
║   • German users search for "Arbeitsblätter" not "worksheets"                     ║
║   • URLs with native keywords rank MUCH higher in local search                    ║
║   • Google uses URL keywords as a ranking signal                                  ║
║   • Users trust URLs in their own language (higher CTR)                           ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### The SEO Architecture (6 Files You MUST Update)

When creating a non-English product page, you must update **6 files** for proper SEO:

| # | File | Purpose |
|---|------|---------|
| 1 | **Content file** | Add `seo` section with language-specific slug, title, description, keywords |
| 2 | **product-page-content.ts** | Register the content with the slug in content registry |
| 3 | **product-page-slugs.ts** | Add the language-specific slug to the slug configuration |
| 4 | **AppCard.tsx** | Add slug to `appIdToProductSlugByLocale` mapping |
| 5 | **page.tsx** | Add slug to `generateStaticParams` and ensure hreflang tags work |
| 6 | **next.config.js** | Add 301 redirect from English slug to language-specific slug |

### File 1: Content File - The SEO Section

Every content file MUST have an `seo` section at the top:

```typescript
// frontend/content/product-pages/sv/word-search-worksheets.ts
import { ProductPageContent } from '@/components/product-page/ProductPageClient';

export const wordSearchSvContent: ProductPageContent = {
  // ┌─────────────────────────────────────────────────────────────────┐
  // │  SEO SECTION - REQUIRED FOR NON-ENGLISH PAGES                   │
  // └─────────────────────────────────────────────────────────────────┘
  seo: {
    slug: 'ordletar-arbetsblad',           // ← SWEDISH slug (NOT English!)
    appId: 'word-search',                   // ← Internal app ID (stays English)
    title: 'Gratis Ordletare Generator | Arbetsblad för Förskoleklass',  // Swedish title
    description: 'Skapa professionella ordletarpussel...',  // Swedish description
    keywords: 'ordletare generator, arbetsblad gratis, förskoleklass material',  // Swedish keywords
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad',
  },

  hero: {
    // ... rest of content IN SWEDISH
  },
};
```

### SEO Section Fields Explained

| Field | Purpose | Example (Swedish) |
|-------|---------|-------------------|
| `slug` | Language-specific URL slug | `ordletar-arbetsblad` |
| `appId` | Internal identifier (always English) | `word-search` |
| `title` | SEO page title with keywords | `Gratis Ordletare Generator \| Arbetsblad` |
| `description` | Meta description (150-160 chars) | Swedish description with keywords |
| `keywords` | Meta keywords (comma-separated) | Swedish search terms |
| `canonicalUrl` | Full canonical URL | `https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad` |

### File 2: Content Registry - product-page-content.ts

Location: `frontend/config/product-page-content.ts`

Register your content file with its language-specific slug:

```typescript
// Add import at top
import wordSearchSvContent from '@/content/product-pages/sv/word-search-worksheets';

// Add to contentRegistry
export const contentRegistry: ContentRegistry = {
  en: {
    'word-search-worksheets': wordSearchEnContent,
    // ... other English content
  },
  sv: {
    'ordletar-arbetsblad': wordSearchSvContent,        // ← Swedish slug
    'word-search-worksheets': wordSearchSvContent,     // ← Backwards compatibility
  },
  de: {
    'wortsuche-arbeitsblaetter': wordSearchDeContent,  // ← German slug
  },
  // ... other languages
};
```

### File 3: Slug Configuration - product-page-slugs.ts

Location: `frontend/config/product-page-slugs.ts`

Add the language-specific slug for the app:

```typescript
export const productPageSlugs: AppSlugConfig[] = [
  {
    appId: 'word-search',
    slugs: {
      en: 'word-search-worksheets',
      sv: 'ordletar-arbetsblad',           // ← Swedish
      de: 'wortsuche-arbeitsblaetter',     // ← German
      fr: 'mots-caches-fiches',            // ← French
      es: 'sopa-letras-fichas',            // ← Spanish
      it: 'cerca-parole-schede',           // ← Italian
      pt: 'caca-palavras-fichas',          // ← Portuguese
      nl: 'woordzoeker-werkbladen',        // ← Dutch
      da: 'ordsoegning-arbejdsark',        // ← Danish
      no: 'ordsoek-arbeidsark',            // ← Norwegian
      fi: 'sananhaku-tyoarkit',            // ← Finnish
    },
  },
  // ... other apps
];
```

### File 4: AppCard.tsx - Link Mapping

Location: `frontend/components/apps/AppCard.tsx`

Add the slug to `appIdToProductSlugByLocale`:

```typescript
const appIdToProductSlugByLocale: { [appId: string]: { [locale: string]: string } } = {
  'word-search': {
    en: 'word-search-worksheets',
    sv: 'ordletar-arbetsblad',           // ← Swedish users see Swedish slug
    de: 'wortsuche-arbeitsblaetter',     // ← German users see German slug
    fr: 'mots-caches-fiches',
    es: 'sopa-letras-fichas',
    it: 'cerca-parole-schede',
    pt: 'caca-palavras-fichas',
    nl: 'woordzoeker-werkbladen',
    da: 'ordsoegning-arbejdsark',
    no: 'ordsoek-arbeidsark',
    fi: 'sananhaku-tyoarkit',
  },
  // ... other apps
};
```

**Why this matters:** When a Swedish user clicks "Läs mer" (Learn More) on an app card, they go to `/sv/apps/ordletar-arbetsblad` instead of `/sv/apps/word-search-worksheets`.

### File 5: page.tsx - Static Params & hreflang

Location: `frontend/app/[locale]/apps/[slug]/page.tsx`

Add the slug to `generateStaticParams`:

```typescript
export async function generateStaticParams() {
  const apps = [
    'word-search-worksheets',      // English
    'ordletar-arbetsblad',         // Swedish - ADD THIS
    'wortsuche-arbeitsblaetter',   // German - ADD THIS
    // ... other language-specific slugs
  ];
  // ...
}
```

### File 6: next.config.js - 301 Redirect (CRITICAL FOR SEO!)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  ⚠️  THIS IS THE MOST IMPORTANT FILE FOR SEO!  ⚠️                               │
│                                                                                 │
│  Without this redirect, Google will index BOTH URLs:                            │
│  • /sv/apps/word-search-worksheets  (BAD - English slug)                        │
│  • /sv/apps/ordletar-arbetsblad     (GOOD - Swedish slug)                       │
│                                                                                 │
│  The 301 redirect tells Google: "The English slug is PERMANENTLY moved         │
│  to the Swedish slug. Only index the Swedish one."                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

Location: `frontend/next.config.js`

Add the redirect in the `redirects()` function:

```javascript
async redirects() {
  return [
    // ... existing redirects ...

    // SEO: Redirect English product page slugs to language-specific slugs
    // Swedish: word-search-worksheets → ordletar-arbetsblad
    {
      source: '/sv/apps/word-search-worksheets',
      destination: '/sv/apps/ordletar-arbetsblad',
      permanent: true,  // 301 redirect - tells Google this is permanent
    },
    // German example:
    // {
    //   source: '/de/apps/word-search-worksheets',
    //   destination: '/de/apps/wortsuche-arbeitsblaetter',
    //   permanent: true,
    // },
  ];
},
```

**Why this is critical:**
- Without this, both URLs work and Google may index the wrong one
- The 301/308 redirect passes SEO value to the correct URL
- Old bookmarks and cached search results automatically go to the right page
- This is the ONLY way to ensure Google indexes just ONE URL per language

**Verification after deployment:**
```bash
# Must return 308 Permanent Redirect with correct Location header
curl -sI 'https://www.lessoncraftstudio.com/sv/apps/word-search-worksheets' | head -5

# Expected output:
# HTTP/1.1 308 Permanent Redirect
# location: /sv/apps/ordletar-arbetsblad
```

### hreflang Tags - Automatic with SEO Section

When your content file has an `seo` section, hreflang tags are automatically generated:

```html
<!-- Generated automatically for Swedish word search page -->
<link rel="canonical" href="https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad"/>
<link rel="alternate" hrefLang="en" href="https://www.lessoncraftstudio.com/en/apps/word-search-worksheets"/>
<link rel="alternate" hrefLang="sv" href="https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad"/>
<link rel="alternate" hrefLang="x-default" href="https://www.lessoncraftstudio.com/en/apps/word-search-worksheets"/>
```

**What hreflang does:**
- Tells Google which language version to show in each country
- Prevents duplicate content penalties across languages
- Ensures Swedish users see Swedish page in Google.se results
- `x-default` tells Google what to show for unsupported languages

### Complete Language-Specific Slug Examples

| App | English | Swedish | German | French |
|-----|---------|---------|--------|--------|
| Word Search | word-search-worksheets | ordletar-arbetsblad | wortsuche-arbeitsblaetter | mots-caches-fiches |
| Addition | addition-worksheets | additions-arbetsblad | additionsaufgaben-arbeitsblaetter | addition-fiches |
| Matching | matching-worksheets | matchnings-arbetsblad | zuordnungs-arbeitsblaetter | association-fiches |

### Slug Creation Rules

1. **Use target language keywords** - What would a native speaker search for?
2. **Keep it URL-safe** - No special characters (ä → ae, ö → oe, ü → ue for German URLs)
3. **Include "worksheets" equivalent** - "arbetsblad" (Swedish), "Arbeitsblätter" (German), "fiches" (French)
4. **Be consistent** - All apps follow same pattern within a language
5. **Test with Google** - Search for the keywords in target language to verify they're used

### SEO Verification Checklist

Before deploying a non-English product page, verify ALL of these:

```bash
# 1. Content file has seo section
grep -A 10 "seo:" frontend/content/product-pages/sv/{app-slug}.ts

# 2. Slug is registered in content registry
grep "ordletar-arbetsblad" frontend/config/product-page-content.ts

# 3. Slug is in slug configuration
grep "ordletar-arbetsblad" frontend/config/product-page-slugs.ts

# 4. Slug is in AppCard mapping
grep "ordletar-arbetsblad" frontend/components/apps/AppCard.tsx

# 5. Slug is in generateStaticParams
grep "ordletar-arbetsblad" frontend/app/[locale]/apps/[slug]/page.tsx

# 6. 301 REDIRECT IS IN next.config.js (CRITICAL!)
grep "word-search-worksheets" frontend/next.config.js | grep "/sv/"

# 7. After deployment - verify hreflang tags
curl -s 'https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad' | grep -i 'hreflang'

# 8. After deployment - verify 301 redirect works
curl -sI 'https://www.lessoncraftstudio.com/sv/apps/word-search-worksheets' | head -5
# MUST show: HTTP/1.1 308 Permanent Redirect + location: /sv/apps/ordletar-arbetsblad
```

### Complete SEO Deployment Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CREATING A NON-ENGLISH PRODUCT PAGE WITH PROPER SEO                        │
└─────────────────────────────────────────────────────────────────────────────┘

1. CREATE CONTENT FILE with seo section
   └── frontend/content/product-pages/sv/word-search-worksheets.ts
       ├── seo.slug = 'ordletar-arbetsblad'
       ├── seo.appId = 'word-search'
       ├── seo.title = Swedish SEO title
       ├── seo.description = Swedish meta description
       └── seo.canonicalUrl = full Swedish URL

2. REGISTER IN CONTENT REGISTRY
   └── frontend/config/product-page-content.ts
       └── sv: { 'ordletar-arbetsblad': wordSearchSvContent }

3. ADD TO SLUG CONFIGURATION
   └── frontend/config/product-page-slugs.ts
       └── 'word-search': { sv: 'ordletar-arbetsblad', ... }

4. ADD TO APPCARD MAPPING
   └── frontend/components/apps/AppCard.tsx
       └── appIdToProductSlugByLocale['word-search']['sv'] = 'ordletar-arbetsblad'

5. ADD TO STATIC PARAMS
   └── frontend/app/[locale]/apps/[slug]/page.tsx
       └── generateStaticParams apps array: 'ordletar-arbetsblad'

6. ADD 301 REDIRECT (CRITICAL!)
   └── frontend/next.config.js
       └── redirects(): { source: '/sv/apps/word-search-worksheets',
                          destination: '/sv/apps/ordletar-arbetsblad',
                          permanent: true }
   ⚠️  WITHOUT THIS, GOOGLE WILL INDEX BOTH URLs!

7. BUILD & DEPLOY
   └── git push → server pull → npm run build → pm2 restart

8. VERIFY SEO
   └── curl -sI English-slug URL → MUST return 308 redirect
   └── curl Swedish-slug URL → check hreflang tags
   └── curl canonical URL → verify 200
```

---

## 9 UNBREAKABLE RULES

| # | Rule | Why It Matters |
|---|------|----------------|
| 1 | **🌍 100% NATIVE LANGUAGE** | EVERY word must be in target language - NO English on non-English pages! "Core Bundle" → "Grundpaketet" |
| 2 | **🔍 LANGUAGE-SPECIFIC SEO SLUGS** | URL must be in target language! `/sv/apps/ordletar-arbetsblad` NOT `/sv/apps/word-search-worksheets` |
| 3 | **🚨 DEPLOY TO PRODUCTION** | Task is NOT complete until live URL returns HTTP 200 - local build is NOT enough! |
| 4 | **3 SENTENCES DEFAULT** | ALL long text shows only 3 sentences initially - components handle this automatically |
| 5 | NO FAKE STATS | Never invent user counts, ratings, or numbers |
| 6 | NO APP LINKS | Links go to `/signup`, `/apps`, `/pricing`, or homepage ONLY |
| 7 | FULL TEXT | Use 100% of .md content in content file - components will collapse it |
| 8 | REAL SAMPLES | Only use actual files from `samples/` folder - VERIFY THEY EXIST |
| 9 | FREE PDF | Direct download link, no login required |

---

## ⚠️ COLLAPSIBLE TEXT - DETAILED EXPLANATION ⚠️

### What Gets Collapsed (3 sentences shown by default)

| Component | Field | Collapsed? |
|-----------|-------|------------|
| HeroSection | `description` | ✅ YES - 3 sentences |
| FeaturesGrid | `feature.description` | ✅ YES - 3 sentences |
| UseCases | `useCase.description` | ✅ YES - 3 sentences |
| HowToGuide | `step.description` | ✅ YES - 3 sentences |
| FAQSection | `item.answer` | ✅ YES - 3 sentences |

### How It Works

The React components handle collapsing automatically:

```tsx
// INSIDE THE COMPONENT (already implemented)
const [isExpanded, setIsExpanded] = useState(false); // DEFAULT = COLLAPSED

const sentences = text.split(/(?<=[.!?])\s+/);
const maxSentences = 3;
const displayText = isExpanded ? text : sentences.slice(0, maxSentences).join(' ');
const needsToggle = sentences.length > maxSentences;

return (
  <>
    <p>{displayText}{!isExpanded && needsToggle && '...'}</p>
    {needsToggle && (
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show less' : 'Read more'}
      </button>
    )}
  </>
);
```

### Your Job (Content File)

Just put the FULL text. Don't truncate. Don't summarize.

```typescript
// CORRECT - Put full text, component handles display
description: `First sentence here. Second sentence here. Third sentence here. Fourth sentence here. Fifth sentence here. Sixth sentence here.`,

// WRONG - Don't manually truncate
description: `First sentence... [truncated]`,
```

---

## FILE STRUCTURE - KNOW WHERE EVERYTHING GOES

### Content Files Location
```
frontend/
└── content/
    └── product-pages/
        └── en/                              ← Language folder
            ├── addition-worksheets.ts       ← Content file
            └── word-search-worksheets.ts    ← Content file
```

**Path pattern:** `frontend/content/product-pages/{locale}/{app-slug}.ts`

**WRONG location (DO NOT USE):**
```
frontend/components/product-page/content/    ← NEVER put content files here!
```

### Sample Files Location
```
frontend/
└── public/
    └── samples/
        └── english/                         ← Language folder (full name, not code)
            ├── addition/                    ← App folder
            │   ├── addition_worksheet portrait.jpeg
            │   ├── addition_worksheet portrait.pdf
            │   └── ...
            └── wordsearch/                  ← App folder
                ├── wordsearch portrait.jpeg
                ├── wordsearch portrait.pdf
                └── ...
```

**Path pattern:** `frontend/public/samples/{language}/{app-name}/`

**URL pattern in content file:** `/samples/english/wordsearch/wordsearch portrait.pdf`

### Source Samples Location (master copies)
```
lessoncraftstudio/
└── samples/
    └── english/
        └── wordsearch/                      ← Master sample files
            ├── wordsearch portrait.jpeg
            └── ...
```

---

## 🔄 APP ID vs PRODUCT PAGE SLUG - CRITICAL DISTINCTION 🔄

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   THE SYSTEM HAS TWO DIFFERENT IDENTIFIERS FOR EACH APP:                          ║
║                                                                                   ║
║   1. APP ID (internal identifier)                                                 ║
║      - Used in /apps listing grid                                                 ║
║      - Stored in apps array in AppCategories.tsx                                  ║
║      - Examples: math-puzzle, image-addition, matching-app                        ║
║                                                                                   ║
║   2. PRODUCT PAGE SLUG (SEO-optimized URL)                                        ║
║      - Used in product page URLs                                                  ║
║      - Stored in content file names and page.tsx                                  ║
║      - Examples: math-puzzle-worksheets, addition-worksheets, matching-worksheets ║
║                                                                                   ║
║   THE MAPPING BETWEEN THEM IS IN AppCard.tsx:                                     ║
║   'image-addition' → 'addition-worksheets'                                        ║
║   'matching-app' → 'matching-worksheets'                                          ║
║   'math-puzzle' → 'math-puzzle-worksheets'                                        ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Why Two Different Identifiers?

| Identifier | Purpose | Example |
|------------|---------|---------|
| **App ID** | Internal system identifier, often technical or legacy names | `image-addition`, `matching-app`, `big-small-app` |
| **Product Page Slug** | SEO-optimized URL that users see, includes "worksheets" keyword | `addition-worksheets`, `matching-worksheets`, `big-small-worksheets` |

### The Mapping File: AppCard.tsx

Location: `frontend/components/apps/AppCard.tsx`

This file contains the `appIdToProductSlug` mapping that translates app IDs to product page slugs:

```typescript
const appIdToProductSlug: { [key: string]: string } = {
  'word-search': 'word-search-worksheets',
  'image-addition': 'addition-worksheets',
  'alphabet-train': 'alphabet-train-worksheets',
  'coloring': 'coloring-worksheets',
  'math-worksheet': 'math-worksheets',
  'word-scramble': 'word-scramble-worksheets',
  'find-and-count': 'find-and-count-worksheets',
  'matching-app': 'matching-worksheets',
  'drawing-lines': 'drawing-lines-worksheets',
  'picture-bingo': 'picture-bingo-worksheets',
  'sudoku': 'sudoku-worksheets',
  'big-small-app': 'big-small-worksheets',
  'chart-count-color': 'chart-count-worksheets',
  'code-addition': 'code-addition-worksheets',
  'draw-and-color': 'draw-and-color-worksheets',
  'find-objects': 'find-objects-worksheets',
  'grid-match': 'grid-match-worksheets',
  'image-crossword': 'crossword-worksheets',
  'image-cryptogram': 'cryptogram-worksheets',
  'math-puzzle': 'math-puzzle-worksheets',
};
```

### Complete App ID → Product Page Slug Mapping (All 33 Apps)

| # | App ID | Product Page Slug | HTML Generator |
|---|--------|-------------------|----------------|
| 1 | `word-search` | `word-search-worksheets` | wordsearch.html |
| 2 | `image-addition` | `addition-worksheets` | addition.html |
| 3 | `alphabet-train` | `alphabet-train-worksheets` | alphabet train.html |
| 4 | `coloring` | `coloring-worksheets` | coloring.html |
| 5 | `math-worksheet` | `math-worksheets` | math worksheet.html |
| 6 | `word-scramble` | `word-scramble-worksheets` | word scramble.html |
| 7 | `find-and-count` | `find-and-count-worksheets` | find and count.html |
| 8 | `matching-app` | `matching-worksheets` | matching.html |
| 9 | `drawing-lines` | `drawing-lines-worksheets` | drawing lines.html |
| 10 | `picture-bingo` | `picture-bingo-worksheets` | bingo.html |
| 11 | `sudoku` | `sudoku-worksheets` | sudoku.html |
| 12 | `big-small-app` | `big-small-worksheets` | big small.html |
| 13 | `chart-count-color` | `chart-count-worksheets` | chart count.html |
| 14 | `code-addition` | `code-addition-worksheets` | code addition.html |
| 15 | `draw-and-color` | `draw-and-color-worksheets` | draw and color.html |
| 16 | `find-objects` | `find-objects-worksheets` | find objects.html |
| 17 | `grid-match` | `grid-match-worksheets` | grid match.html |
| 18 | `image-crossword` | `crossword-worksheets` | crossword.html |
| 19 | `image-cryptogram` | `cryptogram-worksheets` | cryptogram.html |
| 20 | `math-puzzle` | `math-puzzle-worksheets` | math puzzle.html |
| 21 | `missing-pieces` | `missing-pieces-worksheets` | missing pieces.html |
| 22 | `more-less` | `more-less-worksheets` | more less.html |
| 23 | `odd-one-out` | `odd-one-out-worksheets` | odd one out.html |
| 24 | `pattern-train` | `pattern-train-worksheets` | pattern train.html |
| 25 | `pattern-worksheet` | `pattern-worksheets` | pattern worksheet.html |
| 26 | `picture-path` | `picture-path-worksheets` | picture path.html |
| 27 | `picture-sort` | `picture-sort-worksheets` | picture sort.html |
| 28 | `prepositions` | `prepositions-worksheets` | prepositions.html |
| 29 | `shadow-match` | `shadow-match-worksheets` | shadow match.html |
| 30 | `subtraction` | `subtraction-worksheets` | subtraction.html |
| 31 | `treasure-hunt` | `treasure-hunt-worksheets` | treasure hunt.html |
| 32 | `word-guess` | `word-guess-worksheets` | word guess.html |
| 33 | `writing-app` | `writing-worksheets` | writing.html |

---

## ✅ PRE-IMPLEMENTATION CHECKLIST (Non-English Pages) ✅

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   BEFORE WRITING ANY NON-ENGLISH CONTENT, VERIFY:                                 ║
║                                                                                   ║
║   □ I have read the translation table at the top of this guide                   ║
║   □ I have opened an existing content file in my target language                 ║
║   □ I know "Core Bundle" translations (FROM messages/[locale].json!):             ║
║       Swedish: Grundpaketet  |  German: Basis-Paket  |  French: Pack Essentiel   ║
║   □ I have reviewed the Sample interface in ProductPageClient.tsx                ║
║   □ I understand answerKeySrc is REQUIRED (use '' for coloring/drawing pages)    ║
║   □ I will NOT use any English words in the content                              ║
║   □ I have a language-specific SEO slug ready (not English slug!)                ║
║                                                                                   ║
║   IF YOU CANNOT CHECK ALL BOXES → STOP AND READ THE GUIDE AGAIN                  ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 📋 4 FILES TO UPDATE FOR EACH NEW PRODUCT PAGE 📋

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   WHEN CREATING A NEW PRODUCT PAGE, YOU MUST UPDATE 4 FILES:                      ║
║                                                                                   ║
║   1. CONTENT FILE (create new)                                                    ║
║      frontend/content/product-pages/en/{app-slug}.ts                              ║
║                                                                                   ║
║   2. PAGE.TSX (add import, metadata, render, staticParams)                        ║
║      frontend/app/[locale]/apps/[slug]/page.tsx                                   ║
║                                                                                   ║
║   3. APPCARD.TSX (add to appIdToProductSlug mapping)                              ║
║      frontend/components/apps/AppCard.tsx                                         ║
║      → Makes "Learn More" button link to the product page                         ║
║                                                                                   ║
║   4. APPCATEGORIES.TSX (add app to homepage if not there)                         ║
║      frontend/components/homepage/AppCategories.tsx                               ║
║      → Makes app appear in "Browse by Category" on homepage                       ║
║                                                                                   ║
║   FORGETTING ANY OF THESE = BROKEN LINKS OR MISSING CONTENT                       ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### File 1: Content File
- **Location:** `frontend/content/product-pages/en/{app-slug}.ts`
- **Purpose:** Contains all SEO content for the product page
- **Naming:** Use the PRODUCT PAGE SLUG (e.g., `math-puzzle-worksheets.ts`)

### File 2: page.tsx
- **Location:** `frontend/app/[locale]/apps/[slug]/page.tsx`
- **Updates needed:**
  1. Add import statement for the content
  2. Add metadata generation for the slug
  3. Add rendering condition
  4. Add slug to `generateStaticParams`

### File 3: AppCard.tsx
- **Location:** `frontend/components/apps/AppCard.tsx`
- **Updates needed:**
  1. Add entry to `appIdToProductSlug` mapping
- **Purpose:** Links the "Learn More" button on app cards to the correct product page

### File 4: AppCategories.tsx
- **Location:** `frontend/components/homepage/AppCategories.tsx`
- **Updates needed:** Add app to the appropriate category array (if not already present)
- **Purpose:** Makes the app visible in "Browse by Category" section on homepage
- **Translations:** Must include ALL 11 languages for app name and description

---

## 🚨🚨🚨 WHERE TO FIND SAMPLE FILES - READ THIS CAREFULLY 🚨🚨🚨

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   SAMPLES ARE IN THE ROOT "samples" FOLDER, NOT frontend/public/samples!          ║
║                                                                                   ║
║   MASTER LOCATION (source of truth):                                              ║
║   lessoncraftstudio/samples/english/{app-name}/                                   ║
║                                                                                   ║
║   Example paths:                                                                  ║
║   • samples/english/bingo/image and image.jpeg                                    ║
║   • samples/english/addition/addition_worksheet portrait.jpeg                     ║
║   • samples/english/wordsearch/wordsearch portrait.jpeg                           ║
║                                                                                   ║
║   HOW TO FIND SAMPLES:                                                            ║
║   1. List all app folders:                                                        ║
║      powershell -Command "Get-ChildItem -Path 'samples' -Recurse -Directory"      ║
║                                                                                   ║
║   2. Search for specific app:                                                     ║
║      Glob: samples/english/{app-name}/**/*                                        ║
║                                                                                   ║
║   3. List contents of an app folder:                                              ║
║      Glob: samples/english/bingo/**/*                                             ║
║                                                                                   ║
║   DO NOT:                                                                         ║
║   • Search in frontend/public/samples (these are COPIES, not source)              ║
║   • Use 'dir' or 'findstr' (use Glob tool or PowerShell instead)                  ║
║   • Assume samples don't exist without checking the root samples folder           ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## STEP-BY-STEP: CREATING A NEW PRODUCT PAGE

### Step 1: Verify Sample Files Exist
```bash
# CORRECT: Check if samples exist in the ROOT samples folder (master location)
Glob: samples/english/{app-name}/**/*

# OR using PowerShell:
powershell -Command "Get-ChildItem -Path 'samples/english/{app-name}' -Recurse"

# Examples:
Glob: samples/english/bingo/**/*
Glob: samples/english/addition/**/*
```

**IMPORTANT:** Always use Glob tool or PowerShell. Do not use `dir` or `findstr` as they often fail with special characters.

**If samples don't exist, CREATE THEM FIRST before proceeding.**

### Step 2: Copy Samples to Frontend Public Folder
```bash
# Create directory and copy samples
mkdir -p frontend/public/samples/english/{app-name}
cp -r samples/english/{app-name}/* frontend/public/samples/english/{app-name}/

# Verify
ls -la frontend/public/samples/english/{app-name}/
```

### Step 3: Create Content File
Create file at: `frontend/content/product-pages/en/{app-slug}.ts`

```typescript
import { ProductPageContent } from '@/components/product-page/ProductPageClient';

export const appNameEnContent: ProductPageContent = {
  hero: {
    title: 'Page Title',
    subtitle: 'Subtitle here',
    // ⚠️ PUT FULL TEXT - Component will show only 3 sentences by default
    description: `Full paragraph 1. Full paragraph 2. Full paragraph 3. Full paragraph 4...`,
    previewImageSrc: '/samples/english/{app-name}/filename.jpeg',
    // ...
  },
  samples: {
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/{app-name}/filename.jpeg',
        answerKeySrc: '/samples/english/{app-name}/filename answer_key.jpeg',
        altText: 'Description',
        pdfDownloadUrl: '/samples/english/{app-name}/filename.pdf',
      },
    ],
  },
  features: {
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Feature Title',
        // ⚠️ PUT FULL TEXT - Component will show only 3 sentences by default
        description: 'Full feature description with many sentences...',
        highlighted: false,
      },
    ],
  },
  // ... rest of content - ALL LONG TEXT WILL BE COLLAPSED AUTOMATICALLY
};

export default appNameEnContent;
```

### ⚠️ SAMPLE ITEMS - REQUIRED STRUCTURE WARNING ⚠️

Every sample item **MUST** include ALL of these properties:

```typescript
{
  id: '1',
  worksheetSrc: '/samples/english/coloring/coloring portrait 1.png',
  answerKeySrc: '',  // ← REQUIRED! Use empty string for pages without answer keys
  altText: 'Målarbilder barn porträttformat', // ← In TARGET language
  pdfDownloadUrl: '/samples/english/coloring/coloring portrait 1.pdf', // ← Optional but recommended
}
```

**TypeScript will FAIL if `answerKeySrc` is missing!**

| App Type | answerKeySrc Value |
|----------|-------------------|
| Coloring pages | `''` (empty string) |
| Drawing worksheets | `''` (empty string) |
| Math with answer key | `'/path/to/answer_key.jpeg'` |
| Word puzzles with solutions | `'/path/to/solution.jpeg'` |

### Step 4: Update page.tsx
File: `frontend/app/[locale]/apps/[slug]/page.tsx`

Add:
1. Import statement
2. Metadata generation for the slug
3. Rendering condition
4. Add slug to generateStaticParams

```typescript
// 1. Add import at top of file
import appNameEnContent from '@/content/product-pages/en/{app-slug}';

// 2. Add metadata generation (inside generateMetadata function)
if (params.slug === '{app-slug}' && params.locale === 'en') {
  return {
    title: 'SEO Title | LessonCraft Studio',
    description: 'SEO meta description...',
    // ... rest of metadata
  };
}

// 3. Add rendering condition (inside component)
if (slug === '{app-slug}' && locale === 'en') {
  return <ProductPageClient locale={locale} content={appNameEnContent} />;
}

// 4. Add slug to generateStaticParams slugs array
export async function generateStaticParams() {
  const slugs = [
    // ... existing slugs ...
    '{app-slug}',  // Add this
  ];
  // ...
}
```

### Step 5: Update AppCard.tsx (CRITICAL - Makes "Learn More" Work!)
File: `frontend/components/apps/AppCard.tsx`

Add entry to `appIdToProductSlug` mapping:

```typescript
const appIdToProductSlug: { [key: string]: string } = {
  // ... existing mappings ...
  '{app-id}': '{app-slug}',  // Add this line
};
```

**Why is this needed?** Without this mapping, the "Learn More" button on the app card will link to `/{locale}/apps/{app-id}` instead of `/{locale}/apps/{app-slug}`, resulting in a 404 error.

### Step 6: Verify AppCategories.tsx (Homepage Visibility)
File: `frontend/components/homepage/AppCategories.tsx`

Check if the app is already in the `apps` array. If not, add it with ALL 11 language translations:

```typescript
// Inside the appropriate category array (math, language, visual, creative, or logic)
{
  nameEn: 'App Name',
  nameDe: 'German Name',
  nameFr: 'French Name',
  nameEs: 'Spanish Name',
  nameIt: 'Italian Name',
  namePt: 'Portuguese Name',
  nameNl: 'Dutch Name',
  nameDa: 'Danish Name',
  nameSv: 'Swedish Name',
  nameNo: 'Norwegian Name',
  nameFi: 'Finnish Name',
  slug: '{app-slug}',  // Use PRODUCT PAGE SLUG here
  icon: '🧩',
  descriptionEn: 'Short description in English',
  descriptionDe: 'German description',
  // ... all 11 language descriptions
},
```

**Note:** All 33 apps should already be in AppCategories.tsx. This step is usually just verification.

### Step 7: Commit and Push
```bash
git add frontend/content/product-pages/en/{app-slug}.ts
git add frontend/public/samples/english/{app-name}/
git add frontend/app/[locale]/apps/[slug]/page.tsx
git add frontend/components/apps/AppCard.tsx
git add frontend/components/homepage/AppCategories.tsx  # If modified
git commit -m "feat: Add {App Name} product page (English)"
git push origin main
```

### Step 8: Deploy to Server

**⚠️ SEE DEPLOYMENT.md SCENARIO 1 FOR THE COMPLETE COMMAND**

```bash
# Full deployment command (copy-paste this EXACTLY):
"C:\Program Files\PuTTY\plink.exe" -batch -pw REDACTED-ROTATED-20260703-use-ssh-key-auth -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"
```

### Step 9: Copy Samples to Standalone Directory

**⚠️ CRITICAL - Samples must be copied to standalone or they won't load!**

```bash
# Copy samples to standalone (replace {app-name} with actual folder name, e.g., "word scramble"):
"C:\Program Files\PuTTY\plink.exe" -batch -pw REDACTED-ROTATED-20260703-use-ssh-key-auth -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "mkdir -p '/opt/lessoncraftstudio/frontend/.next/standalone/public/samples/english/{app-name}' && cp -r '/opt/lessoncraftstudio/samples/english/{app-name}/'* '/opt/lessoncraftstudio/frontend/.next/standalone/public/samples/english/{app-name}/'"
```

### Step 10: Verify Everything Works
```bash
# Test page loads
curl -s -o /dev/null -w '%{http_code}' 'https://www.lessoncraftstudio.com/en/apps/{app-slug}'
# Expected: 200

# Test image loads
curl -s -o /dev/null -w '%{http_code}' 'https://www.lessoncraftstudio.com/samples/english/{app-name}/filename.jpeg'
# Expected: 200

# Test PDF downloads
curl -s -I 'https://www.lessoncraftstudio.com/samples/english/{app-name}/filename.pdf' | head -5
# Expected: HTTP/1.1 200 OK, Content-Type: application/pdf
```

**DO NOT announce completion until ALL tests pass!**

---

## PRE-DEPLOYMENT CHECKLIST

Before saying "done", verify ALL of these:

### 🌍 Language Verification (MOST IMPORTANT FOR NON-ENGLISH PAGES)
- [ ] **ZERO English words on non-English pages** - search for "Read more", "Features", "Step", "Done!"
- [ ] **Product names translated** - "Core Bundle" → native language equivalent
- [ ] **All UI labels in target language** - badges, buttons, trust text, step labels
- [ ] **Text sounds natural** - not literal translations, idiomatic expressions
- [ ] **All fields populated** - hero.readMoreLabel, features.badgeText, howTo.stepLabel, etc.

### 🔍 SEO Verification (CRITICAL FOR NON-ENGLISH PAGES)
- [ ] **URL slug is in target language** - `/sv/apps/ordletar-arbetsblad` NOT `/sv/apps/word-search-worksheets`
- [ ] **Content file has seo section** - with slug, appId, title, description, keywords, canonicalUrl
- [ ] **Slug registered in product-page-content.ts** - `sv: { 'ordletar-arbetsblad': content }`
- [ ] **Slug added to product-page-slugs.ts** - `'word-search': { sv: 'ordletar-arbetsblad' }`
- [ ] **Slug added to AppCard.tsx** - `appIdToProductSlugByLocale['word-search']['sv']`
- [ ] **Slug in generateStaticParams** - `page.tsx` apps array includes the new slug
- [ ] **301 REDIRECT in next.config.js** - English slug redirects to language-specific slug (CRITICAL!)
- [ ] **After deploy: redirect works** - `curl -sI English-slug URL` returns 308 with correct location
- [ ] **After deploy: hreflang tags present** - `curl URL | grep hreflang` shows all language versions

### ⚠️ Text Display
- [ ] **All long text in content file is FULL text (not truncated)**
- [ ] **Components will auto-collapse to 3 sentences - you don't do anything**

### 6 Required File Updates (for non-English pages)
- [ ] **Content file created** at `frontend/content/product-pages/{locale}/{app-slug}.ts` with seo section
- [ ] **product-page-content.ts updated** - slug registered in content registry
- [ ] **product-page-slugs.ts updated** - slug added to app's slug configuration
- [ ] **page.tsx updated** with import, metadata, render condition, staticParams
- [ ] **AppCard.tsx updated** - entry added to `appIdToProductSlugByLocale` mapping
- [ ] **next.config.js updated** - 301 redirect from English slug to language-specific slug

### Sample Files
- [ ] Sample files exist in `samples/english/{app}/` (master location)
- [ ] Sample files copied to `frontend/public/samples/english/{app}/`
- [ ] Filenames in content file EXACTLY match actual filenames (including spaces!)
- [ ] Both JPEG and PDF versions exist for each sample

### Server Deployment
- [ ] Sample files uploaded to `/opt/lessoncraftstudio/frontend/public/samples/english/{app}/`
- [ ] Sample files copied to `/opt/lessoncraftstudio/frontend/.next/standalone/public/samples/english/{app}/`
- [ ] PM2 restarted after copying files

### URL Verification (run these commands!)
- [ ] Page URL returns HTTP 200
- [ ] Each image URL returns HTTP 200
- [ ] Each PDF URL returns HTTP 200 with `Content-Type: application/pdf`

---

## CRITICAL DESIGN MISTAKES TO AVOID

### 1. ⚠️⚠️⚠️ COLLAPSIBLE TEXT - DEFAULT TO COLLAPSED ⚠️⚠️⚠️

**THIS IS THE #1 MOST COMMON MISTAKE**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   The components ALREADY handle collapsing.                         │
│   You just put FULL TEXT in the content file.                       │
│   The component shows 3 sentences by default.                       │
│   User clicks "Read more" to see the rest.                          │
│                                                                     │
│   YOU DO NOT NEED TO:                                               │
│   • Truncate text manually                                          │
│   • Set any state                                                   │
│   • Add "Read more" buttons                                         │
│   • Split text into sentences                                       │
│                                                                     │
│   JUST PUT THE FULL TEXT. THAT'S IT.                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Components that auto-collapse:**
- `HeroSection.tsx` - hero.description
- `FeaturesGrid.tsx` - feature.description
- `UseCases.tsx` - useCase.description
- `HowToGuide.tsx` - step.description
- `FAQSection.tsx` - faq.answer

**How it's implemented in components:**
```tsx
const [isExpanded, setIsExpanded] = useState(false); // COLLAPSED by default

const sentences = text.split(/(?<=[.!?])\s+/);
const maxSentences = 3;
const displayText = isExpanded ? text : sentences.slice(0, maxSentences).join(' ');
```

---

### 2. PDF Downloads - MIDDLEWARE EXCLUSIONS

**Problem:** PDFs return HTML because middleware redirects `/samples/...` to `/en/samples/...`

**Fix in `middleware.ts`:**
```typescript
export const config = {
  matcher: [
    '/((?!api|_next/static|...|samples|...\\.pdf).*)',
    //                        ^^^^^^^ ADD THIS
  ]
};
```

**Exclusions that MUST be in matcher:**
- `samples` - PDF sample files directory
- `pdf` - PDF file extension
- `blog/pdfs` - Blog PDF downloads

---

### 3. Related Apps - NO INDIVIDUAL APP LINKS

**WRONG:**
```tsx
<Link href={`/${locale}/apps/${app.slug}`}>  // Links to individual app
```

**CORRECT:**
```tsx
<Link href={`/${locale}/apps`}>  // Links to apps listing page
// OR
<Link href={`/${locale}/auth/signup`}>  // Links to signup
```

**Rule:** RelatedApps cards are informational only. CTA buttons go to `/apps` or `/auth/signup`.

---

### 4. Design Quality - NO GENERIC AI AESTHETICS

**NEVER USE:**
- Generic fonts: Inter, Roboto, Arial, system fonts
- Cliche colors: Purple gradients on white, indigo/slate palettes
- Boring layouts: Predictable grids, cookie-cutter patterns

**ALWAYS USE:**
- Distinctive fonts: Cormorant Garamond, Space Grotesk, Playfair Display
- Rich palettes: Stone, amber, rose, emerald, cream tones
- Bold design: Animated gradients, mesh backgrounds, parallax effects

**Test:** Would a user remember this design? If it looks like every other SaaS page, redesign it.

---

### 5. Download Buttons - ON THE THUMBNAILS

**WRONG:** Separate download button below gallery

**CORRECT:** Download button directly ON each thumbnail that has a PDF
```tsx
{sample.pdfDownloadUrl && (
  <button className="absolute bottom-2 left-1/2 -translate-x-1/2 ...">
    <DownloadIcon /> PDF
  </button>
)}
```

---

## SERVER COMMANDS REFERENCE

### Full Connection Details
```
Server: 65.108.5.250
User: root
Password: REDACTED-ROTATED-20260703-use-ssh-key-auth
Hostkey: SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU
```

### Upload Files
```bash
pscp -batch -pw PASSWORD -hostkey "HOSTKEY" "local/path/*" root@65.108.5.250:"/remote/path/"
```

### Run Commands
```bash
plink -batch -pw PASSWORD -hostkey "HOSTKEY" root@65.108.5.250 "command here"
```

### Full Deploy Sequence

**⚠️ SEE DEPLOYMENT.md FOR AUTHORITATIVE COMMANDS**

```bash
# 1. Pull, build, deploy static files, restart (copy-paste this EXACTLY):
"C:\Program Files\PuTTY\plink.exe" -batch -pw REDACTED-ROTATED-20260703-use-ssh-key-auth -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"

# 2. Copy samples to standalone (replace {app-name} with actual folder name):
"C:\Program Files\PuTTY\plink.exe" -batch -pw REDACTED-ROTATED-20260703-use-ssh-key-auth -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "mkdir -p '/opt/lessoncraftstudio/frontend/.next/standalone/public/samples/english/{app-name}' && cp -r '/opt/lessoncraftstudio/samples/english/{app-name}/'* '/opt/lessoncraftstudio/frontend/.next/standalone/public/samples/english/{app-name}/'"

# 3. Verify (run from local machine):
curl -s -o /dev/null -w "%{http_code}" "https://www.lessoncraftstudio.com/{locale}/apps/{app-slug}"
# Expected: 200
```

---

## COMPONENT CHECKLIST

### HeroSection.tsx
- [ ] ⚠️ Description text collapsed by default (3 sentences max) - **AUTOMATIC**
- [ ] "Read more" toggle works
- [ ] No fake user counts or stats
- [ ] Design is distinctive (not generic corporate)

### SampleGallery.tsx
- [ ] Download buttons ON thumbnails (not separate)
- [ ] Only shows download for samples WITH PDFs
- [ ] PDF URLs work (test with curl)
- [ ] Descriptive filenames generated from altText

### FeaturesGrid.tsx
- [ ] ⚠️ Long descriptions collapsed (3 sentences default) - **AUTOMATIC**
- [ ] "Read more" / "Show less" toggles work

### UseCases.tsx
- [ ] ⚠️ Long descriptions collapsed (3 sentences default) - **AUTOMATIC**
- [ ] "Read more" / "Show less" toggles work

### HowToGuide.tsx
- [ ] ⚠️ Long descriptions collapsed (3 sentences default) - **AUTOMATIC**
- [ ] "Read more" / "Show less" toggles work

### FAQSection.tsx
- [ ] ⚠️ Long answers collapsed (3 sentences default) - **AUTOMATIC**
- [ ] "Read more" / "Show less" toggles work

### RelatedApps.tsx
- [ ] NO links to individual app pages (`/apps/[slug]`)
- [ ] Cards link to `/apps` or `/auth/signup` only
- [ ] CTA buttons go to signup or apps page

---

## QUICK REFERENCE

| Component | Collapsed Default | Links Allowed | Download Location |
|-----------|------------------|---------------|-------------------|
| HeroSection | ⚠️ 3 sentences (AUTO) | N/A | N/A |
| FeaturesGrid | ⚠️ 3 sentences (AUTO) | N/A | N/A |
| UseCases | ⚠️ 3 sentences (AUTO) | N/A | N/A |
| HowToGuide | ⚠️ 3 sentences (AUTO) | N/A | N/A |
| FAQSection | ⚠️ 3 sentences (AUTO) | N/A | N/A |
| SampleGallery | N/A | N/A | ON thumbnail |
| RelatedApps | N/A | `/apps`, `/signup` only | N/A |

---

## COMMON MISTAKES & FIXES

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Content file in wrong folder | Import fails | Move to `frontend/content/product-pages/en/` |
| Samples not on server | Images show broken | Upload with pscp |
| Samples not in standalone | 404 errors | Copy to `.next/standalone/public/samples/` |
| Wrong sample filename | 404 errors | Match exact filename including spaces |
| Forgot pm2 restart | Old content shows | `pm2 restart lessoncraftstudio` |
| Middleware blocking PDFs | PDF returns HTML | Add `samples` to middleware exclusions |

---

## TL;DR - THE MOST IMPORTANT THINGS

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   📄 -1. SOURCE .MD FILES ARE NOT GOSPEL - VERIFY APP NAMES! 📄                   ║
║      The source .md file may contain literal translation errors!                  ║
║      ALWAYS check: Does body text use a different (better) term than title?       ║
║      ALWAYS apply the natural language verification checklist!                    ║
║      Example: woerter-raten.md had "Wörter Raten" in title but "Worträtsel"       ║
║      in the body → USE "Worträtsel-Generator" (the natural German term)!          ║
║                                                                                   ║
║   🌍 0. 100% NATIVE LANGUAGE - ZERO ENGLISH ON NON-ENGLISH PAGES 🌍               ║
║      EVERY word must be in the target language - including product names!         ║
║      "Core Bundle" → "Grundpaketet" (Swedish), "Basis-Paket" (German)            ║
║      "Full Access" → "Full Tillgång" (Swedish), "Vollzugriff" (German)           ║
║      "Read more" → "Läs mer" (Swedish), "Mehr lesen" (German)                    ║
║      "Features" → "Funktioner" (Swedish), "Funktionen" (German)                  ║
║      ALL UI LABELS, BADGES, BUTTONS - EVERYTHING IN TARGET LANGUAGE!             ║
║                                                                                   ║
║   🔍 1. SEO: URL SLUG MUST BE IN TARGET LANGUAGE 🔍                               ║
║      ❌ /sv/apps/word-search-worksheets  (English slug = BAD SEO)                 ║
║      ✅ /sv/apps/ordletar-arbetsblad     (Swedish slug = GOOD SEO)                ║
║      Update 6 files: content file, product-page-content.ts, product-page-slugs.ts║
║      AppCard.tsx, page.tsx, AND next.config.js (301 REDIRECT - CRITICAL!)        ║
║      The redirect in next.config.js is the MOST IMPORTANT - without it Google    ║
║      will index both URLs. After deploy: curl -sI must show 308 redirect.        ║
║                                                                                   ║
║   🚨 2. DEPLOY TO PRODUCTION - THIS IS NOT OPTIONAL 🚨                            ║
║      git push → server git pull → npm run build → copy samples → verify URL      ║
║      "Local build passed" = NOT DONE. "Live URL returns 200" = DONE.             ║
║                                                                                   ║
║   3. PUT FULL TEXT IN CONTENT FILE                                                ║
║      Components auto-collapse to 3 sentences                                      ║
║                                                                                   ║
║   4. VERIFY SAMPLES EXIST BEFORE CREATING PAGE                                    ║
║      Check samples/english/{app}/ folder first                                    ║
║                                                                                   ║
║   5. COPY SAMPLES TO STANDALONE ON SERVER                                         ║
║      Or they won't be accessible                                                  ║
║                                                                                   ║
║   6. TEST ALL LIVE URLs BEFORE ANNOUNCING COMPLETION                              ║
║      Page, images, and PDFs must all return 200 ON PRODUCTION                     ║
║      curl https://www.lessoncraftstudio.com/en/apps/{app-slug}                   ║
║      For non-English: verify hreflang tags with curl | grep hreflang              ║
║                                                                                   ║
║   🏠 7. NEVER REGENERATE THE HOMEPAGE - IT IS COMPLETE 🏠                          ║
║      The homepage was finished in Dec 2025 with 11 languages and 12 samples      ║
║      Only fix bugs - never redesign or regenerate from scratch                   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🏠 HOMEPAGE ARCHITECTURE - DO NOT OVERWRITE

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ⚠️⚠️⚠️ THE HOMEPAGE IS COMPLETE - DO NOT REGENERATE ⚠️⚠️⚠️                          ║
║                                                                                   ║
║   The homepage was completed in December 2025 with:                               ║
║   - 11 languages fully translated                                                 ║
║   - 12 downloadable PDF samples                                                   ║
║   - All links to product pages working                                            ║
║   - Responsive design tested across devices                                       ║
║                                                                                   ║
║   DO NOT use the frontend-design skill on the homepage!                           ║
║   DO NOT regenerate from a plan file!                                             ║
║   DO NOT copy old homepage code from backups!                                     ║
║                                                                                   ║
║   ONLY fix bugs (broken links, missing translations, typos)                       ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Current Homepage Structure (December 2025)

The homepage is composed of 6 modular components located in `frontend/components/homepage/`:

| Component | File | Purpose |
|-----------|------|---------|
| HomepageHero | `HomepageHero.tsx` | Dark gradient hero with badge, title, 3D preview cards |
| SampleGallery | `SampleGallery.tsx` | 12 downloadable PDF samples with translations |
| AppCategories | `AppCategories.tsx` | Category cards linking to product pages |
| HomepageFeatures | `HomepageFeatures.tsx` | 6 feature cards with amber highlights |
| HowItWorks | `HowItWorks.tsx` | 4-step timeline with scroll animations |
| HomepageCTA | `HomepageCTA.tsx` | Final dark CTA section |

### Main Page File
- **`frontend/app/[locale]/page.tsx`** - Imports and renders all 6 components

### Language Support
All components support **11 languages** with inline `localeContent` objects:
- English (en), German (de), French (fr), Spanish (es), Italian (it)
- Portuguese (pt), Dutch (nl), Danish (da), Swedish (sv), Norwegian (no), Finnish (fi)

### Design System
- **Dark sections**: Hero, Sample Gallery, CTA - using `#0a0a0a`, `#1a1a2e`, `#16213e`
- **Light sections**: Features, How It Works - using white, stone-50
- **Accents**: Cyan `#06b6d4`, Purple `#a855f7`, Pink `#ec4899`, Amber highlights
- **Typography**: Space Grotesk (hero), Cormorant Garamond (sections)
- **Animations**: Framer Motion for scroll reveals, hovers, parallax

---

## 🔗 HOW TO ADD LINKS TO INDIVIDUAL APP PAGES ON HOMEPAGE

### Adding a New Sample to SampleGallery.tsx

To add a new downloadable sample that links to a product page:

1. Open `frontend/components/homepage/SampleGallery.tsx`
2. Find the `samples` array (around line 200)
3. Add a new sample object:

```typescript
{
  id: '13',                              // Next available ID
  nameEn: 'App Name',                    // English name
  nameDe: 'German Name',                 // German translation
  nameFr: 'French Name',                 // French translation
  nameEs: 'Spanish Name',                // Spanish translation
  nameIt: 'Italian Name',                // Italian translation
  namePt: 'Portuguese Name',             // Portuguese translation
  nameNl: 'Dutch Name',                  // Dutch translation
  nameDa: 'Danish Name',                 // Danish translation
  nameSv: 'Swedish Name',                // Swedish translation
  nameNo: 'Norwegian Name',              // Norwegian translation
  nameFi: 'Finnish Name',                // Finnish translation
  categoryEn: 'Math',                    // Category in each language
  categoryDe: 'Mathematik',
  // ... all category translations ...
  imageSrc: '/samples/english/app-name/filename.jpeg',    // Preview image
  pdfUrl: '/samples/english/app-name/filename.pdf',       // Download PDF
  productPageSlug: 'app-name-worksheets',                 // ← CREATES LINK TO PRODUCT PAGE
},
```

4. Update `statSamples` from `12+` to `13+` in all locale content objects
5. Commit and deploy

**The link is automatically generated as:** `/${locale}/apps/${productPageSlug}`

### Adding a New Category Card to AppCategories.tsx

**Location:** `frontend/components/homepage/AppCategories.tsx`

This file contains ALL 33 apps organized into 5 categories that appear in the "Browse by Category" section on the homepage.

#### The 5 Categories and Their Apps

| Category | Apps (33 total) |
|----------|-----------------|
| **Math** (6 apps) | Addition, Subtraction, Math Worksheet, Code Addition, Chart Count, Math Puzzle |
| **Language** (6 apps) | Word Search, Word Scramble, Crossword, Cryptogram, Word Guess, Writing |
| **Visual Learning** (10 apps) | Find & Count, Find Objects, Matching, Grid Match, Drawing Lines, Missing Pieces, Shadow Match, Picture Path, Picture Sort, Prepositions |
| **Creative** (7 apps) | Coloring, Draw & Color, Alphabet Train, Big Small, Pattern Train, Pattern Worksheet, Treasure Hunt |
| **Logic & Puzzles** (4 apps) | Sudoku, Picture Bingo, More or Less, Odd One Out |

#### To add a new app:

1. Open `frontend/components/homepage/AppCategories.tsx`
2. Find the appropriate category array (math, language, visual, creative, or logic)
3. Add a new app object with ALL 11 language translations:

```typescript
{
  nameEn: 'App Name',
  nameDe: 'German Name',           // Must sound natural in German
  nameFr: 'French Name',           // Must sound natural in French
  nameEs: 'Spanish Name',          // Must sound natural in Spanish
  nameIt: 'Italian Name',          // Must sound natural in Italian
  namePt: 'Portuguese Name',       // Must sound natural in Portuguese (Brazilian)
  nameNl: 'Dutch Name',            // Must sound natural in Dutch
  nameDa: 'Danish Name',           // Must sound natural in Danish
  nameSv: 'Swedish Name',          // Must sound natural in Swedish
  nameNo: 'Norwegian Name',        // Must sound natural in Norwegian
  nameFi: 'Finnish Name',          // Must sound natural in Finnish
  slug: 'app-name-worksheets',     // Use PRODUCT PAGE SLUG (not App ID!)
  icon: '🧩',                      // Emoji icon
  descriptionEn: 'Short description',
  descriptionDe: 'German description',
  // ... all 11 language descriptions
},
```

#### Translation Quality Requirements

**CRITICAL:** All translations must:
- Sound natural in the target language (not literal translations)
- Be consistent with existing app names in that language
- Use proper terminology for that country's education system

**Example of GOOD translations:**
```typescript
nameEn: 'Math Puzzle',
nameDe: 'Mathe-Puzzle',          // ✅ Natural German compound word
nameFr: 'Puzzle mathématique',   // ✅ Natural French word order
```

**Example of BAD translations:**
```typescript
nameEn: 'Math Puzzle',
nameDe: 'Mathematik Puzzle',     // ❌ Awkward - should be "Mathe-Puzzle"
nameFr: 'Math Puzzle',           // ❌ Not translated at all
```

### All 33 Apps Are Already in AppCategories.tsx

As of December 2025, all 33 apps have been added to AppCategories.tsx with complete translations in all 11 languages. When creating a new product page, you typically only need to **verify** the app exists, not add it.

---

## 🛡️ PROTECTING HOMEPAGE FROM ACCIDENTAL OVERWRITES

### NEVER DO THESE THINGS:
```
❌ Do NOT copy old homepage code from backups or archives
❌ Do NOT revert homepage commits without explicit user approval
❌ Do NOT regenerate the homepage from scratch - it's COMPLETE
❌ Do NOT use the frontend-design skill on the homepage
❌ Do NOT delete or replace any homepage component files
```

### Git Commands to Verify Homepage Status

Before ANY homepage changes, run these commands:

```bash
# Check recent homepage commits
git log --oneline -10 -- frontend/components/homepage/ frontend/app/[locale]/page.tsx

# Verify all homepage files are tracked
git ls-files frontend/components/homepage/

# Expected output:
# frontend/components/homepage/AppCategories.tsx
# frontend/components/homepage/HomepageCTA.tsx
# frontend/components/homepage/HomepageFeatures.tsx
# frontend/components/homepage/HomepageHero.tsx
# frontend/components/homepage/HowItWorks.tsx
# frontend/components/homepage/SampleGallery.tsx
```

### If You Accidentally Modify Homepage

```bash
# View what changed
git diff frontend/components/homepage/

# Restore a single file to last commit
git checkout HEAD -- frontend/components/homepage/SampleGallery.tsx

# Restore entire homepage folder to last commit
git checkout HEAD -- frontend/components/homepage/

# If already committed, revert the specific commit
git revert <commit-hash>
```

### What Changes ARE Allowed

✅ **Bug fixes only:**
- Fix broken PDF download links
- Fix missing/incorrect translations
- Fix typos in text content
- Fix layout bugs (overflow, spacing)

✅ **Adding content:**
- Add new samples to SampleGallery (when new apps are created)
- Update sample count from "12+" to "13+"
- Add new app cards to AppCategories

### What Changes ARE NOT Allowed

❌ **Never do these without explicit user approval:**
- Redesign the layout or structure
- Change the component architecture
- Replace components with new implementations
- Change the color scheme or typography
- Regenerate from the plan file
- Use frontend-design skill on homepage
