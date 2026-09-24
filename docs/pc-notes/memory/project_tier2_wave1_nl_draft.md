---
name: Tier 2 i18n Track B Wave 1 (nl) — homepage + footer + topicPage NL draft
description: Native NL authoring of 88 Wave-1 message keys (homepage 67 + footer 9 + topicPage 12) drafted for operator review before nl.json apply
type: project
originSessionId: de342ceb-c0c5-463a-8cea-62f861933fc9
---
# Tier 2 i18n Track B Wave 1 (nl) — DRAFT v1

**Mirrors:** ES Wave 1 (`4e61c24d`) shape exactly: 67 + 9 + 12 = 88 keys.
**Status:** ⏸ AWAITING OPERATOR REVIEW. No nl.json edit yet.
**Apply:** in follow-up commission prompt after operator approves/revises.

---

## Summary

| Namespace | en/de/es count | nl current | nl draft | Stale to remove |
|---|---:|---:|---:|---:|
| homepage | 67 | 31 | 67 | 29 (seller-era) |
| footer | 9 | 13 | 9 | 12 (seller-era) |
| topicPage | 12 | 0 | 12 | 0 (full creation) |
| **TOTAL** | **88** | **44** | **88** | **41 stale, all 0-consumer** |

**Stale-key consumer audit:** All 41 stale keys (`homepage.features.*`, `homepage.pricing.*`, `homepage.hero.cta.tryFree`, `homepage.hero.cta.viewApps`, `footer.companyName`, `footer.companyTagline`, `footer.legal.*`, `footer.support.*`) have **0 next-intl consumers** via `useTranslations()`/`getTranslations()` across `frontend/`. The single match for `companyTagline` in `frontend/app/api/homepage/content/route.ts:110` reads from a separate `homepageContentManager` content store (the seller-era homepage-content-manager.html JSON), NOT from `frontend/messages/nl.json`. Safe to fully overwrite per ES Wave 1 pre-pivot replacement precedent.

**Recon finding (1.3 brief premise drift):** Brief says "FOOTER_LANGUAGES includes nl ✓". Actual: `frontend/components/layout/Footer.tsx:15-22` deliberately excludes nl per the Track C "added at first nl deck publish" stagger pattern (comment at line 19 makes this explicit). This is **per-design**, not a Track A coverage gap — Wave 1 pre-stages the chrome but Footer language-list entry lands at NL Track C Batch 1 first publish. Flagging for operator awareness; does NOT block Wave 1.

---

## Register decisions (locked defaults; no adjudication needed)

- **Address-form:** formal `u` throughout (mirrors DE Sie + ES usted). Avoid informal `je`/`jij`.
- **Variety:** Standard Dutch (Netherlands) primary register. Not Flemish-specific.
- **Worksheet noun:** `werkblad` (singular) / `werkbladen` (plural) — Dutch educational canonical, exact parallel to DE Arbeitsblatt.
- **Children noun:** `kinderen` (the children) when referring to students — mirror DE "die Kinder" / ES "los niños" in interaction copy. Adult-noun "leerlingen" (pupils) reserved for formal contexts.
- **"Second language":** `tweede taal` (direct, common in NL educational discourse). NOT `vreemde taal` (= "foreign language", different concept).
- **Pillar terms:**
  - lesson plan → **`lesplan`** / lesson plans → **`lesplannen`**
  - workspace → **`werkruimte`**
  - subscription → **`abonnement`**

---

## Adjudications surfaced (5 total — operator pick / revise)

### A1. languageProof.closingLine — Hero closing anchor

**en source:** "Children deserve materials that match the language they're learning. We build to that bar."
**de Wave 1:** "Kinder verdienen Materialien, die zur Sprache passen, die sie lernen. **Daran richten wir unsere Arbeit aus.**"
**es Wave 1:** "Los niños merecen materiales que coincidan con la lengua que están aprendiendo. **A ese estándar dirigimos nuestro trabajo.**"

**nl options for the bolded clause:**
- **(a) recommended default:** "Daar richten wij ons werk op." — closest DE mirror; formal `wij`; metaphor preserved.
- (b) "Aan die maatstaf werken wij." — more compressed; "maatstaf" = "yardstick" / "standard".
- (c) "Daarop bouwen wij ons werk." — slightly different metaphor ("we build on that").

**Full nl draft (with default a):** "Kinderen verdienen materialen die passen bij de taal die zij leren. Daar richten wij ons werk op."

---

### A2. "Back to school" framing — subscription.themedBundles.body

**en source:** "Hand-curated bundles for **back-to-school**, Halloween, winter holidays, Valentine's Day, end-of-year…"
**de Wave 1:** "Handverlesene Pakete für **Schulanfang**, Halloween, Winterferien, Valentinstag, Schuljahresende…"
**es Wave 1:** "Paquetes hechos a mano para **regreso a clases**, Halloween, vacaciones de invierno, San Valentín, fin de curso…"

**nl options:**
- **(a) recommended default:** "**begin van het schooljaar**" — formal-neutral; matches the document's overall register; educational-canonical.
- (b) "weer naar school" — informal-leaning calque of "back to school"; doesn't match the formal-`u` document register.
- (c) "schoolstart" — compound noun; less established than (a) in Dutch K-3 contexts.

---

### A3. Teacher noun — primary K-3 register

**Used at:** subscription.workspace.title, intro copy, etc.
**de Wave 1:** "**Lehrkraft**" (gender-neutral; primary-school-canonical).
**es Wave 1:** "**docente**" / "la docente" (genderless when articled).

**nl options:**
- **(a) recommended default:** "**leerkracht**" — gender-neutral; primary-school-canonical; exact register parallel to DE "Lehrkraft"; standard for the K-3 audience this site targets.
- (b) "docent" — slightly more academic / secondary-ed register; gender-neutral but masculine-default in older usage.
- (c) "leraar/lerares" — gendered pair; older style; not preferred for inclusive copy.

---

### A4. Themed bundles — lexical choice

**en source:** "**themed bundles**" (subscription pillar 2)
**de Wave 1:** "**Themenpakete**" (theme-packets; very natural)
**es Wave 1:** "**paquetes temáticos**" (thematic packets)

**nl options:**
- **(a) recommended default:** "**themapakketten**" — direct parallel to DE Themenpakete; "pakket" reads natural in Dutch and matches the "print the packet, follow the plan, teach the week" idiom of the body copy.
- (b) "thema-bundels" / "themabundels" — closer to en "bundle" but "bundel" reads slightly more like "bound stack" than "curated set" in Dutch.
- (c) "themapacks" — Anglicism; reject per native-NL discipline.

---

### A5. topicPage axis-headings — compound vs. phrase form

**en source patterns:**
- exerciseType heading: `"{topic} worksheets"` — phrase
- theme heading: `"{topic} worksheets"` — phrase
- educationalLevel heading: `"Worksheets for {topic}"` — phrase

**de Wave 1 chose compound for exerciseType + theme, phrase for educationalLevel:**
- exerciseType: `"{topic}-Arbeitsblätter"`
- theme: `"Arbeitsblätter mit {topic}"`
- educationalLevel: `"Arbeitsblätter für {topic}"`

**es Wave 1 chose phrase form for all three:**
- exerciseType: `"Hojas de trabajo de {topic}"`
- theme: `"Hojas de trabajo con {topic}"`
- educationalLevel: `"Hojas de trabajo para {topic}"`

**nl options for exerciseType heading specifically:**
- **(a) recommended default:** `"{topic}-werkbladen"` — compound form; mirrors DE pattern; Dutch is Germanic-compound-friendly; nl axis-names are single noun-phrases (e.g., "kruiswoordpuzzel-werkbladen" reads natural).
- (b) `"Werkbladen voor {topic}"` — phrase form mirroring ES; reads slightly more verbose but unambiguous.

**nl theme heading default:** `"Werkbladen met {topic}"` (mirror DE+ES "with" preposition convergence).
**nl educationalLevel heading default:** `"Werkbladen voor {topic}"` (mirror DE+ES "for").

If operator picks (b) for exerciseType, the three headings collapse to `"Werkbladen voor / met / voor"` which reads more uniform but loses the compound canonical that Dutch readers expect for exercise-type pages.

---

## Full nl draft (88 keys)

### namespace: `homepage` (67 keys)

#### `homepage.meta` (5)

| key | en | nl draft |
|---|---|---|
| `title` | LessonCraftStudio — Worksheets that work in your second language | LessonCraftStudio — Werkbladen die in uw tweede taal werkelijk werken |
| `description` | A curated K-3 illustration library and an 11-language vocabulary system with correct gender, plurals, and diacritics. Built for dual-language and bilingual classrooms. | Een gecureerde K-3-illustratiebibliotheek en een vocabulairesysteem in 11 talen — met correcte geslachten, meervoudsvormen en diakrieten. Gebouwd voor tweetalige klassen. |
| `ogTitle` | Worksheets that actually work in your second language. | Werkbladen die in uw tweede taal werkelijk werken. |
| `ogDescription` | Built for teachers in dual-language programs, bilingual classrooms, and international schools. | Gebouwd voor leerkrachten in tweetalige programma's, bilinguale klassen en internationale scholen. |
| `ogAlt` | LessonCraftStudio — K-3 worksheets in 11 languages | LessonCraftStudio — K-3-werkbladen in 11 talen |

#### `homepage.hero` (3)

| key | nl draft |
|---|---|
| `title` | Werkbladen die in uw tweede taal werkelijk werken. |
| `subtitle` | Een gecureerde bibliotheek met K-3-illustraties, gekoppeld aan een vocabulairesysteem in 11 talen — met correcte geslachten, meervoudsvormen en diakrieten in elke taal. Gebouwd voor leerkrachten in tweetalige programma's, bilinguale klassen en internationale scholen. |
| `interaction` | De kinderen spelen ze in de browser. Druk ze af als u dat liever heeft. |

#### `homepage.breadthGrid` (7)

| key | nl draft |
|---|---|
| `sectionTitle` | Decks die leerkrachten op dit moment gebruiken. |
| `intro` | Een paar decks uit de catalogus. Open het eerste om het hier te spelen, of klik op een ander om de volledige pagina te zien. |
| `featuredBadge` | Uitgelicht |
| `playInline` | Dit deck spelen |
| `openDeck` | Deck openen |
| `closeFeatured` | Sluiten |
| `loadingDeck` | Deck wordt geladen… |

#### `homepage.languageProof` (24)

| key | nl draft |
|---|---|
| `sectionTitle` | Wat automatische vertaling fout doet — en wat wij goed doen. |
| `intro` | De meeste werkblad-sites vertalen Engelse inhoud met een generieke machine en publiceren het resultaat. Lidwoorden kloppen niet. Meervoudsvormen vallen om. Accenten verdwijnen. Kinderen leren de fouten mee. Wij behandelen elk van onze 11 talen als een eigen catalogus — geen vertaling van het Engels — met een woordenschat die wordt samengesteld door mensen die werkelijk in die taal lesgeven. |
| `subIntro` | Twee voorbeelden, naast elkaar. |
| `german.heading` | Duits — geslacht, hoofdletters, onregelmatig meervoud |
| `german.leftAnnotation1` | Automatische vertaling raadt het lidwoord op basis van de Engelse context. Schule is vrouwelijk — de Engelse context vertelt u dat niet. |
| `german.leftAnnotation2` | Duitse zelfstandige naamwoorden worden altijd met een hoofdletter geschreven. Met kleine letters wordt de verkeerde regel aangeleerd. |
| `german.leftAnnotation3` | Het meervoud is onregelmatig: Schulen, niet Schules. Automatische vertaling regulariseert; de juiste vorm ontbreekt. |
| `german.annotation1` | die Schule — telkens het juiste lidwoord. Onze Duitse woordenschat is op geslacht gerubriceerd, niet geraden. |
| `german.annotation2` | Schule — met hoofdletter, zoals een Duits zelfstandig naamwoord hoort te zijn. |
| `german.annotation3` | Schulen — het werkelijke meervoud, geen Engelse stijlgok. |
| `german.ariaLabel` | Vergelijking naast elkaar: een automatisch vertaald Duits werkblad met drie fouten — verkeerd vrouwelijk lidwoord ('der' in plaats van 'die'), kleingeschreven zelfstandig naamwoord ('schule' in plaats van 'Schule') en een Engels-pluralisering ('schules' in plaats van 'Schulen') — naast de LessonCraftStudio-versie waarin 'die Schule' en 'die Schulen' correct zijn weergegeven. |
| `french.heading` | Frans — geslacht, samentrekkingen, accenten |
| `french.leftAnnotation1` | École is vrouwelijk, en het lidwoord wordt voor een klinker geëlideerd. Automatische vertaling doet geen van beide. |
| `french.leftAnnotation2` | De é is geen versiering — die hoort bij het woord. |
| `french.leftAnnotation3` | Voorzetsel + lidwoord trekken samen voor de klinker: à l'école. Automatische vertaling laat ze los. |
| `french.annotation1` | l'école — correcte elisie en correcte accent. |
| `french.annotation2` | à l'école — correcte samentrekking met het voorzetsel. |
| `french.annotation3` | Elk accent in onze Franse catalogus wordt als deel van het woord behandeld. |
| `french.ariaLabel` | Vergelijking naast elkaar: een automatisch vertaald Frans werkblad met drie fouten — niet-geëlideerd lidwoord ('la école' in plaats van 'l'école'), niet-samengetrokken voorzetsel ('à le école' in plaats van 'à l'école') en ontbrekend acuut accent ('ecole' in plaats van 'école') — naast de LessonCraftStudio-versie waarin 'l'école', 'à l'école' en 'école' correct zijn weergegeven. |
| `closingLine` | Kinderen verdienen materialen die passen bij de taal die zij leren. Daar richten wij ons werk op. |

#### `homepage.freeExperience` (10)

| key | nl draft |
|---|---|
| `sectionTitle` | Gratis voor elke leerkracht. |
| `intro` | Geen account, geen betaalmuur, geen aanmeldverplichting. Bladeren, afdrukken, insluiten en delen — elk deck, in elke taal. |
| `cta` | Naar de catalogus → |
| `browse.title` | Alle decks doorbladeren. |
| `browse.body` | De volledige catalogus is open. Filter op taal, niveau, onderwerp of oefentype. Geen account nodig om te bladeren, te bekijken of een deck te spelen. |
| `pdf.title` | Een afdrukbare PDF genereren. |
| `pdf.body` | Elk deck wordt gedownload als een schone afdrukbare PDF — inclusief antwoordblad. Geen watermerk, geen limiet per deck, niets wat voor de betaalde versie wordt achtergehouden. |
| `embed.title` | Elk deck insluiten op uw klassen-website of blog. |
| `embed.body` | Kopieer een insluit-fragment en plak het in uw klassen-website, uw blog of het leeromgevingssysteem van uw school. De kinderen spelen het interactieve deck precies daar waar zij het vinden. Insluiten blijft gratis. |
| `share.title` | Een deck via een link delen. |
| `share.body` | Stuur elk deck als een link. De kinderen spelen direct in de browser — geen aanmelding, geen app, geen account. Werkt op een telefoon, een tablet, een Chromebook of een digibord. |

#### `homepage.subscription` (10)

| key | nl draft |
|---|---|
| `sectionTitle` | Voor leerkrachten die LessonCraftStudio elke week gebruiken. |
| `intro` | De catalogus is gratis en blijft gratis. Het abonnement is voor leerkrachten die LessonCraftStudio een vast onderdeel van hun praktijk hebben gemaakt en hun lesgeven georganiseerd willen hebben — met kant-en-klare lesplannen, themapakketten voor de momenten die elk jaar terugkomen, en een werkruimte gebouwd voor het beheren van duizenden decks. |
| `lessonPlans.title` | Kant-en-klare lesplannen |
| `lessonPlans.body` | Een groeiende bibliotheek van vooraf geschreven lesplannen, elk gekoppeld aan concrete decks. Elk plan volgt een consistente vierstapsstructuur op basis van CLIL-principes — opwarming, inhoud-en-taal-activiteit, taalsteun en oefening, en afsluiting — zodat u de vorm één keer leert en daarna gewoon lesgeeft. De plannen worden per taal natief geschreven, niet automatisch vertaald, en weerspiegelen de conventies van elke klas waarvoor ze geschreven zijn. |
| `themedBundles.title` | Themapakketten voor de momenten die elk jaar terugkomen |
| `themedBundles.body` | Met de hand samengestelde pakketten voor begin van het schooljaar, Halloween, kerstvakantie, Valentijnsdag, einde van het schooljaar en herhaling aan het einde van een thema. Elk pakket combineert een samenhangende reeks decks met een lesplan dat voor het thema van dat pakket is geschreven. Druk het boekje af, volg het plan, geef de week les. Door het jaar heen worden nieuwe pakketten toegevoegd, allemaal inbegrepen in het abonnement. |
| `workspace.title` | Een werkruimte voor de leerkracht die u werkelijk bent |
| `workspace.body` | De catalogus zal duizenden decks tellen. Het abonnement geeft u collecties om ze te ordenen, een werkruimte-startpagina om in te landen, geavanceerde filters afgestemd op hoe leerkrachten werkelijk zoeken, leerplankoppeling voor uw eigen thema's, en bulkgereedschap dat taken van vijf minuten in taken van dertig seconden verandert. Uw structuur draagt jaar na jaar door — daar gaat het om. |
| `price` | $69 per jaar. Op elk moment opzegbaar. |
| `subscribeCta` | Abonneren → |
| `subscribeSubCopy` | U wordt doorgestuurd naar onze betaalpartner. Na de betaling is uw account direct klaar voor gebruik. |
| `alreadySubscribedCta` | Mijn abonnement bekijken |

#### `homepage.notify` (8)

| key | nl draft |
|---|---|
| `aboveField` | Wij zijn de lesplan-bibliotheek aan het afronden en lanceren het abonnement binnenkort. Laat ons uw e-mailadres achter en wij geven u op de openingsdag bericht. |
| `label` | E-mailadres |
| `placeholder` | uw-email@school.nl |
| `submit` | Geef mij bericht → |
| `submitting` | Wordt verzonden… |
| `confirmation` | Dank u — wij sturen u een e-mail wanneer het abonnement opent. |
| `subCopy` | Eén e-mail, alleen wanneer het abonnement opent. Geen marketinglijst, geen vervolgreeks. |
| `errors.invalid_email` | Voer een geldig e-mailadres in. |
| `errors.server` | Er is iets misgegaan. Probeer het opnieuw. |

---

### namespace: `footer` (9 keys)

| key | nl draft |
|---|---|
| `byLanguage` | Werkbladen per taal |
| `byTopic` | Werkbladen per onderwerp |
| `byExerciseType` | Werkbladen per oefentype |
| `moreLanguagesSoon` | Binnenkort meer talen |
| `moreTopicsSoon` | Binnenkort meer onderwerpen |
| `contact` | Contact |
| `terms` | Voorwaarden |
| `privacy` | Privacy |
| `copyright` | © 2026 LessonCraftStudio. |

---

### namespace: `topicPage` (12 keys)

| key | nl draft |
|---|---|
| `meta.title` | {topic}-werkbladen \| LessonCraftStudio |
| `meta.description` | Gratis {topic}-werkbladen en afdrukbare PDFs. Interactieve activiteiten voor klassen in de eerste schooljaren. |
| `heading.exerciseType` | {topic}-werkbladen |
| `heading.theme` | Werkbladen met {topic} |
| `heading.educationalLevel` | Werkbladen voor {topic} |
| `intro.exerciseType` | Interactieve werkbladen en afdrukbare PDFs om {topic} te oefenen. |
| `intro.theme` | Werkbladen met {topic}. |
| `intro.educationalLevel` | Activiteiten voor {topic}. |
| `decksCount` | `{count, plural, =0 {Nog geen werkbladen} =1 {1 werkblad} other {# werkbladen}}` |
| `deckCard.playLink` | Online spelen |
| `deckCard.pdfLink` | PDF afdrukken |
| `emptyState` | Nog geen werkbladen in dit onderwerp — kom binnenkort terug. |

---

## ICU plural verification

`topicPage.decksCount` rule: `{count, plural, =0 {…} =1 {…} other {…}}`
- en/de/es all use the same `=0 / =1 / other` shape.
- nl plural categories per CLDR: `one` (singular) + `other` (plural) — same shape as en/de/es. Direct mirror; no rule shape change needed.

---

## Carryover deferrals (out of Wave 1 scope)

- `footer.tagline` and extended copyright copy — deferred per ES Wave 1 carryforward; cross-locale add filed.
- FOOTER_LANGUAGES `{ code: 'nl', label: 'Nederlands', tier: 2 }` entry — does NOT land at Wave 1 per Track C stagger pattern (lands at first NL deck publish, mirroring ES's at `035852c3` Batch 1). Wave 1 pre-stages chrome only.

---

## Apply checklist (for follow-up commission)

Do NOT execute now. For the apply commission:

1. Replace nl.json `homepage` namespace wholesale (drop 29 stale, write 67 fresh)
2. Replace nl.json `footer` namespace wholesale (drop 12 stale, write 9 fresh + 1 copyright)
3. Add nl.json `topicPage` namespace (12 keys, full creation)
4. Verify keys against en.json by structural diff (every en path has nl entry; no extras)
5. Verify no `\uXXXX` escapes (write real characters per MEMORY.md File Encoding rule)
6. Run `node scripts/find-broken-quotes.js` per MEMORY.md
7. Single commit on `pivot/printable-business-toolkit`
8. Commit message: `Tier 2 i18n Track B Wave 1 (nl) — homepage + footer + topicPage nl message keys`
9. Plain `git push`; deploy
10. Production verify: `/nl` renders Wave 1 chrome (hero, language-proof side-by-sides, free experience, subscription, footer, notify); `/nl/topic/<existing-axis-key>/` renders topicPage when nl topic pages exist (note: nl topic pages may be empty until NL Track C ships decks; verify chrome renders without runtime errors using a known en/de axis-key viewed via `/nl/topic/<en-or-de-slug>/` returning either content or graceful fallback)

---

## Halt-and-surface to operator

**Artifact path:** `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\project_tier2_wave1_nl_draft.md`

**Adjudications (5):**
- A1: languageProof.closingLine → default "Daar richten wij ons werk op." | alts (b)/(c) above
- A2: back-to-school → default "begin van het schooljaar" | alt "weer naar school"
- A3: teacher noun → default "leerkracht" | alt "docent"
- A4: themed bundles → default "themapakketten" | alt "themabundels"
- A5: topicPage exerciseType heading → default `"{topic}-werkbladen"` (compound) | alt `"Werkbladen voor {topic}"` (phrase)

**Recon findings:**
- 1.2 stale-seller-era nl: 41 keys (29 homepage + 12 footer); 0 next-intl consumers verified across `frontend/`. Safe to fully overwrite.
- 1.3 Track A nl coverage: TOPIC_LOCALES ✓; topics-taxonomy.json 38/38 standard ✓; auth nl-case ✓; **FOOTER_LANGUAGES nl entry intentionally absent per Track C stagger pattern (per-design, not a Track A gap)**.

**Operator response options:**
- "Approve" → next prompt commissions apply
- "Revise A1=b, A3=docent, …" → CC produces v2 draft
- "Pause" → hold artifact at v1
