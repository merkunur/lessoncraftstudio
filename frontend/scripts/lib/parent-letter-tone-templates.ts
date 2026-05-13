/**
 * parent-letter-tone-templates.ts — Sub-Phase 2.2 per-tone prose registry.
 *
 * Per-(tone, homeLanguage) registry. Each entry returns prose
 *   { greeting, opening, body, picturesIntro, signature, closing }
 * parameterized on { packageTitle, durationMinutes, pictureCueCount, language }.
 *
 * Tones: warm (default) / formal / playful.
 * Tier 1+2 locales (en/de/es/nl) authored.
 * Tier 3+4 fall back to en gloss per §17.5 NSR-flag posture.
 *
 * Reading level target: ~Lexile 400 / CEFR A2 per materials-catalog.json doctrine
 * (parent-letter targets recent-immigrant parents with low home-language literacy).
 */

import type { Tone, Strand } from './parent-letter-package-loader';

export interface ParentLetterProse {
  greeting: string;       // "Dear families," / "Liebe Familien,"
  opening: string;        // 1-2 sentences introducing the unit
  body: string;           // 2-4 sentences explaining what kids did + what's printed
  picturesIntro: string;  // 1 sentence introducing the picture-cues section
  signature: string;      // teacher-signature line label
  closing: string;        // sign-off phrase
}

interface TemplateInputs {
  packageTitle: string;
  durationMinutes: number;
  pictureCueCount: number;
  language: string; // target instruction language (for "in <language>" phrasing)
}

type Template = (i: TemplateInputs) => ParentLetterProse;

const LANGUAGE_NAMES_BY_LOCALE: Record<string, Record<string, string>> = {
  en: {
    en: 'English', de: 'German', es: 'Spanish', nl: 'Dutch',
    fr: 'French', it: 'Italian', pt: 'Portuguese',
    sv: 'Swedish', da: 'Danish', no: 'Norwegian', fi: 'Finnish',
  },
  de: {
    en: 'Englisch', de: 'Deutsch', es: 'Spanisch', nl: 'Niederländisch',
    fr: 'Französisch', it: 'Italienisch', pt: 'Portugiesisch',
    sv: 'Schwedisch', da: 'Dänisch', no: 'Norwegisch', fi: 'Finnisch',
  },
  es: {
    en: 'inglés', de: 'alemán', es: 'español', nl: 'neerlandés',
    fr: 'francés', it: 'italiano', pt: 'portugués',
    sv: 'sueco', da: 'danés', no: 'noruego', fi: 'finlandés',
  },
  nl: {
    en: 'Engels', de: 'Duits', es: 'Spaans', nl: 'Nederlands',
    fr: 'Frans', it: 'Italiaans', pt: 'Portugees',
    sv: 'Zweeds', da: 'Deens', no: 'Noors', fi: 'Fins',
  },
};

function languageName(targetLanguage: string, homeLocale: string): string {
  const map = LANGUAGE_NAMES_BY_LOCALE[homeLocale] || LANGUAGE_NAMES_BY_LOCALE.en;
  return map[targetLanguage] || targetLanguage;
}

// ---- WARM tone ----

const WARM: Record<string, Template> = {
  en: (i) => ({
    greeting: 'Dear families,',
    opening: `Over the past week we have been working on "${i.packageTitle}" in our classroom (about ${i.durationMinutes} minutes per session).`,
    body: `Your child has been counting, sorting, matching, and listening to new ${languageName(i.language, 'en')} words. The printed pages that come home with this letter show the kinds of activities we did together. You do not need to be a teacher to help — just ask your child to show you each page and name what they see.`,
    picturesIntro: `Below are ${i.pictureCueCount} of the picture cues we used. Each picture is labeled with its name in ${languageName(i.language, 'en')}. Try saying the word together at home.`,
    signature: 'Teacher signature',
    closing: 'With warm wishes,',
  }),
  de: (i) => ({
    greeting: 'Liebe Familien,',
    opening: `In der vergangenen Woche haben wir im Klassenzimmer an „${i.packageTitle}" gearbeitet (etwa ${i.durationMinutes} Minuten pro Sitzung).`,
    body: `Ihr Kind hat gezählt, sortiert, zugeordnet und neue Wörter auf ${languageName(i.language, 'de')} gehört. Die mit diesem Brief mitgegebenen Blätter zeigen, welche Aktivitäten wir gemacht haben. Sie müssen keine Lehrkraft sein, um zu helfen — bitten Sie Ihr Kind einfach, jede Seite zu zeigen und zu benennen, was es sieht.`,
    picturesIntro: `Unten sehen Sie ${i.pictureCueCount} der Bildkarten, die wir verwendet haben. Jedes Bild ist mit seinem Namen auf ${languageName(i.language, 'de')} beschriftet. Sprechen Sie das Wort zu Hause gemeinsam aus.`,
    signature: 'Unterschrift der Lehrkraft',
    closing: 'Mit herzlichen Grüßen,',
  }),
  es: (i) => ({
    greeting: 'Estimadas familias:',
    opening: `Durante la última semana hemos trabajado en "${i.packageTitle}" en nuestra clase (aproximadamente ${i.durationMinutes} minutos por sesión).`,
    body: `Su hijo o hija ha estado contando, clasificando, emparejando y escuchando nuevas palabras en ${languageName(i.language, 'es')}. Las páginas impresas que acompañan a esta carta muestran las actividades que hicimos juntos. No necesita ser docente para ayudar — solo pídale a su hijo o hija que le muestre cada página y nombre lo que ve.`,
    picturesIntro: `A continuación encontrará ${i.pictureCueCount} de las imágenes que usamos. Cada imagen está rotulada con su nombre en ${languageName(i.language, 'es')}. Intenten decir la palabra juntos en casa.`,
    signature: 'Firma del docente',
    closing: 'Un saludo cordial,',
  }),
  nl: (i) => ({
    greeting: 'Beste families,',
    opening: `De afgelopen week hebben we in onze klas gewerkt aan "${i.packageTitle}" (ongeveer ${i.durationMinutes} minuten per sessie).`,
    body: `Uw kind heeft geteld, gesorteerd, gekoppeld en geluisterd naar nieuwe woorden in het ${languageName(i.language, 'nl')}. De afdrukken die met deze brief meegaan, laten zien welke activiteiten we samen deden. U hoeft geen leerkracht te zijn om te helpen — vraag uw kind gewoon om elke pagina te laten zien en te benoemen wat het ziet.`,
    picturesIntro: `Hieronder ziet u ${i.pictureCueCount} van de afbeeldingen die we gebruikten. Elke afbeelding is gelabeld met de naam in het ${languageName(i.language, 'nl')}. Probeer het woord thuis samen uit te spreken.`,
    signature: 'Handtekening leerkracht',
    closing: 'Met vriendelijke groet,',
  }),
};

// ---- FORMAL tone ----

const FORMAL: Record<string, Template> = {
  en: (i) => ({
    greeting: 'Dear parent or guardian,',
    opening: `This letter accompanies materials from the classroom unit "${i.packageTitle}" (duration: ${i.durationMinutes} minutes per session).`,
    body: `The unit comprises counting, sorting, matching, and vocabulary-recognition exercises conducted in ${languageName(i.language, 'en')}. Enclosed are the printable materials your child has used in class. You may review them with your child to reinforce the unit's content at home.`,
    picturesIntro: `The following ${i.pictureCueCount} picture cues are representative of the vocabulary covered. Each is labeled in ${languageName(i.language, 'en')}.`,
    signature: 'Teacher signature',
    closing: 'Sincerely,',
  }),
  de: (i) => ({
    greeting: 'Sehr geehrte Eltern oder Erziehungsberechtigte,',
    opening: `Dieser Brief begleitet die Materialien zur Unterrichtseinheit „${i.packageTitle}" (Dauer: ${i.durationMinutes} Minuten pro Sitzung).`,
    body: `Die Einheit umfasst Übungen zum Zählen, Sortieren, Zuordnen und Erkennen von Wortschatz auf ${languageName(i.language, 'de')}. Beigelegt sind die druckbaren Materialien, die Ihr Kind im Unterricht verwendet hat. Sie können diese gemeinsam mit Ihrem Kind durchgehen, um den Lernstoff zu Hause zu festigen.`,
    picturesIntro: `Die folgenden ${i.pictureCueCount} Bildkarten sind repräsentativ für den behandelten Wortschatz. Jede ist auf ${languageName(i.language, 'de')} beschriftet.`,
    signature: 'Unterschrift der Lehrkraft',
    closing: 'Mit freundlichen Grüßen,',
  }),
  es: (i) => ({
    greeting: 'Estimado padre, madre o tutor:',
    opening: `Esta carta acompaña los materiales de la unidad de clase "${i.packageTitle}" (duración: ${i.durationMinutes} minutos por sesión).`,
    body: `La unidad incluye ejercicios de conteo, clasificación, emparejamiento y reconocimiento de vocabulario en ${languageName(i.language, 'es')}. Se adjuntan los materiales imprimibles que su hijo o hija ha utilizado en clase. Puede revisarlos con su hijo o hija para reforzar el contenido en casa.`,
    picturesIntro: `Las siguientes ${i.pictureCueCount} imágenes son representativas del vocabulario tratado. Cada una está rotulada en ${languageName(i.language, 'es')}.`,
    signature: 'Firma del docente',
    closing: 'Atentamente,',
  }),
  nl: (i) => ({
    greeting: 'Geachte ouder of verzorger,',
    opening: `Deze brief begeleidt de materialen van de lessenreeks "${i.packageTitle}" (duur: ${i.durationMinutes} minuten per sessie).`,
    body: `De lessenreeks omvat oefeningen in tellen, sorteren, koppelen en woordherkenning in het ${languageName(i.language, 'nl')}. Bijgevoegd zijn de afdrukbare materialen die uw kind in de klas heeft gebruikt. U kunt deze met uw kind doornemen om de lesstof thuis te versterken.`,
    picturesIntro: `De volgende ${i.pictureCueCount} afbeeldingen zijn representatief voor de behandelde woordenschat. Elke afbeelding is gelabeld in het ${languageName(i.language, 'nl')}.`,
    signature: 'Handtekening leerkracht',
    closing: 'Hoogachtend,',
  }),
};

// ---- PLAYFUL tone ----

const PLAYFUL: Record<string, Template> = {
  en: (i) => ({
    greeting: 'Hi families! 👋',
    opening: `What a week! We have been having so much fun with "${i.packageTitle}" — about ${i.durationMinutes} busy minutes each session.`,
    body: `Your little learner has been counting, matching, and shouting out new words in ${languageName(i.language, 'en')}. The papers coming home are mini-souvenirs of what we did together. Spread them on the kitchen table, ask your child to be the teacher for a few minutes, and have a giggle.`,
    picturesIntro: `Here are ${i.pictureCueCount} of our favorite picture friends from this week. Each one is labeled in ${languageName(i.language, 'en')} — try a silly voice when you say the word together!`,
    signature: 'Teacher',
    closing: 'See you tomorrow!',
  }),
  de: (i) => ({
    greeting: 'Hallo Familien! 👋',
    opening: `Was für eine Woche! Wir hatten so viel Spaß mit „${i.packageTitle}" — etwa ${i.durationMinutes} aufregende Minuten pro Sitzung.`,
    body: `Ihre kleine Forscherin oder Ihr kleiner Forscher hat gezählt, zugeordnet und neue Wörter auf ${languageName(i.language, 'de')} gerufen. Die Blätter, die nach Hause kommen, sind kleine Erinnerungen an das, was wir gemacht haben. Legen Sie sie auf den Küchentisch, lassen Sie Ihr Kind ein paar Minuten lang die Lehrkraft sein und lachen Sie gemeinsam.`,
    picturesIntro: `Hier sind ${i.pictureCueCount} unserer Lieblingsbilder dieser Woche. Jedes ist auf ${languageName(i.language, 'de')} beschriftet — probiert eine lustige Stimme, wenn ihr das Wort zusammen sagt!`,
    signature: 'Lehrkraft',
    closing: 'Bis morgen!',
  }),
  es: (i) => ({
    greeting: '¡Hola familias! 👋',
    opening: `¡Qué semana! Nos hemos divertido muchísimo con "${i.packageTitle}" — unos ${i.durationMinutes} minutos llenos de actividad por sesión.`,
    body: `Su pequeña o pequeño ha estado contando, emparejando y diciendo en voz alta palabras nuevas en ${languageName(i.language, 'es')}. Los papeles que llegan a casa son pequeños recuerdos de lo que hicimos. Pónganlos en la mesa de la cocina, pidan a su hijo o hija que sea el docente por unos minutos, y rían juntos.`,
    picturesIntro: `Aquí están ${i.pictureCueCount} de nuestras imágenes favoritas de esta semana. Cada una está rotulada en ${languageName(i.language, 'es')} — ¡prueben una voz divertida cuando digan la palabra!`,
    signature: 'Docente',
    closing: '¡Hasta mañana!',
  }),
  nl: (i) => ({
    greeting: 'Hallo families! 👋',
    opening: `Wat een week! We hebben zo veel plezier gehad met "${i.packageTitle}" — ongeveer ${i.durationMinutes} drukke minuten per sessie.`,
    body: `Uw kleine ontdekker heeft geteld, gekoppeld en nieuwe woorden in het ${languageName(i.language, 'nl')} hardop geroepen. De blaadjes die mee naar huis komen zijn kleine herinneringen aan wat we deden. Leg ze op de keukentafel, laat uw kind een paar minuten de leerkracht zijn, en lach samen.`,
    picturesIntro: `Hier zijn ${i.pictureCueCount} van onze favoriete afbeeldingen van deze week. Elke is gelabeld in het ${languageName(i.language, 'nl')} — probeer een gek stemmetje als jullie het woord samen zeggen!`,
    signature: 'Leerkracht',
    closing: 'Tot morgen!',
  }),
};

const TONE_REGISTRY: Record<Tone, Record<string, Template>> = {
  warm: WARM,
  formal: FORMAL,
  playful: PLAYFUL,
};

// ---- F7 strand-aware body + picturesIntro overrides ----
//
// Strand axis layered on top of (tone, homeLanguage). When package's strand
// resolves to numeracy / literacy / world-knowledge / sel, the body +
// picturesIntro fields override the (tone, locale) cell's defaults to
// match the pedagogical strand. Other fields (greeting / opening / signature
// / closing) preserve (tone, locale) tone register.
//
// Vocabulary class has no override — preserves existing behavior verbatim
// for backward-compatibility per F7 Phase 0 §F7-§5 adjudication.
//
// Body prose authored per K-3 multilingual classroom instructional-practice
// norms. Numeracy template per audit revision spec (commit 09ccafa6 R4
// ratification). Literacy / world-knowledge / sel templates authored per
// CC↔assistant pedagogical adjudication; reader-perspective discipline per
// CLAUDE.md §A.13.30 (plain teacher/parent vocabulary; no operator-internal
// taxonomy leaks).

interface StrandOverride {
  body: string;
  picturesIntro: string;
}

type StrandTemplate = (i: TemplateInputs) => StrandOverride;

const NUMERACY_BY_LOCALE: Record<string, StrandTemplate> = {
  en: (i) => ({
    body: `Your child has been counting groups of objects up to 10, matching numerals to quantities, and comparing groups (more, less, same). The printed pages show counting activities we did together. Ask your child to count the pictures on each page with you, point to the numerals, and try counting out small groups of objects at home.`,
    picturesIntro: `Below are ${i.pictureCueCount} of the numerals we worked with. Each card shows a numeral and the word for it in ${languageName(i.language, 'en')}. Try counting that many small objects (buttons, beans, blocks) together at home.`,
  }),
  de: (i) => ({
    body: `Ihr Kind hat Gruppen von Gegenständen bis 10 gezählt, Zahlen den passenden Mengen zugeordnet und Gruppen verglichen (mehr, weniger, gleich viel). Die mitgegebenen Blätter zeigen Zählaufgaben, die wir gemacht haben. Zählen Sie zusammen mit Ihrem Kind die Bilder auf jeder Seite, zeigen Sie auf die Zahlen und zählen Sie zu Hause kleine Gruppen von Gegenständen ab.`,
    picturesIntro: `Unten sehen Sie ${i.pictureCueCount} der Zahlen, mit denen wir gearbeitet haben. Jede Karte zeigt eine Zahl und das Wort dafür auf ${languageName(i.language, 'de')}. Zählen Sie zu Hause gemeinsam diese Anzahl kleiner Gegenstände (Knöpfe, Bohnen, Bauklötze).`,
  }),
  es: (i) => ({
    body: `Su hijo o hija ha contado grupos de objetos hasta 10, ha emparejado números con cantidades y ha comparado grupos (más, menos, lo mismo). Las páginas impresas muestran las actividades de conteo que hicimos juntos. Cuente con su hijo o hija las imágenes en cada página, señale los números y, en casa, cuente pequeños grupos de objetos juntos.`,
    picturesIntro: `A continuación encontrará ${i.pictureCueCount} de los números con los que trabajamos. Cada tarjeta muestra un número y la palabra para él en ${languageName(i.language, 'es')}. Cuenten juntos en casa esa cantidad de objetos pequeños (botones, frijoles, bloques).`,
  }),
  nl: (i) => ({
    body: `Uw kind heeft groepen voorwerpen tot 10 geteld, getallen gekoppeld aan hoeveelheden en groepen vergeleken (meer, minder, evenveel). De afdrukken laten de teloefeningen zien die we samen deden. Tel samen met uw kind de plaatjes op elke pagina, wijs de getallen aan en tel thuis samen kleine groepjes voorwerpen (knopen, bonen, blokjes).`,
    picturesIntro: `Hieronder ziet u ${i.pictureCueCount} van de getallen waarmee we werkten. Elke kaart toont een getal en het woord ervoor in het ${languageName(i.language, 'nl')}. Tel thuis samen dit aantal kleine voorwerpen (knopen, bonen, blokjes).`,
  }),
};

const LITERACY_BY_LOCALE: Record<string, StrandTemplate> = {
  en: (i) => ({
    body: `Your child has been listening for letter sounds, recognizing letters in words, and saying sounds out loud. The printed pages show the letter-sound work we did together. Ask your child to point to letters on each page and say the sound that letter makes. Find the same letters on cereal boxes or store signs at home.`,
    picturesIntro: `Below are ${i.pictureCueCount} picture cues from our alphabet work. Each picture starts with a letter we practiced — say the word together and listen for the first sound in ${languageName(i.language, 'en')}.`,
  }),
  de: (i) => ({
    body: `Ihr Kind hat auf Laute gehört, Buchstaben in Wörtern erkannt und Laute laut nachgesprochen. Die mitgegebenen Blätter zeigen die Buchstaben-Laut-Arbeit, die wir gemacht haben. Bitten Sie Ihr Kind, auf Buchstaben auf jeder Seite zu zeigen und den passenden Laut zu sagen. Suchen Sie zu Hause die gleichen Buchstaben auf Verpackungen oder Schildern.`,
    picturesIntro: `Unten sehen Sie ${i.pictureCueCount} Bildkarten aus unserer Alphabetarbeit. Jedes Bild beginnt mit einem Buchstaben, den wir geübt haben — sprechen Sie das Wort gemeinsam und hören Sie auf den Anfangslaut auf ${languageName(i.language, 'de')}.`,
  }),
  es: (i) => ({
    body: `Su hijo o hija ha estado escuchando los sonidos de las letras, reconociendo letras en palabras y diciendo los sonidos en voz alta. Las páginas impresas muestran el trabajo con letras y sonidos que hicimos juntos. Pídale a su hijo o hija que señale las letras en cada página y diga el sonido que hace cada letra. Busquen las mismas letras en cajas de cereal o letreros en casa.`,
    picturesIntro: `A continuación encontrará ${i.pictureCueCount} imágenes de nuestro trabajo con el alfabeto. Cada imagen empieza con una letra que practicamos — digan la palabra juntos y escuchen el primer sonido en ${languageName(i.language, 'es')}.`,
  }),
  nl: (i) => ({
    body: `Uw kind heeft geluisterd naar letterklanken, letters in woorden herkend en de klanken hardop gezegd. De afdrukken laten het letter-klank-werk zien dat we samen deden. Vraag uw kind om letters op elke pagina aan te wijzen en de klank te zeggen die de letter maakt. Zoek thuis dezelfde letters op verpakkingen of borden.`,
    picturesIntro: `Hieronder ziet u ${i.pictureCueCount} plaatjes uit ons alfabetwerk. Elk plaatje begint met een letter die we oefenden — zeg het woord samen en luister naar de eerste klank in het ${languageName(i.language, 'nl')}.`,
  }),
};

const WORLD_KNOWLEDGE_BY_LOCALE: Record<string, StrandTemplate> = {
  en: (i) => ({
    body: `Your child has been observing, sorting, and grouping things by what they have in common. The printed pages show the sorting activities we did together. Ask your child to look at the pictures and talk about why some things belong together. At home, sort small objects into groups (toys, clothes, food) and ask your child to explain the groups.`,
    picturesIntro: `Below are ${i.pictureCueCount} of the pictures we sorted in class. Each one is labeled in ${languageName(i.language, 'en')}. Talk together about which pictures belong together and why.`,
  }),
  de: (i) => ({
    body: `Ihr Kind hat beobachtet, sortiert und Dinge nach Gemeinsamkeiten gruppiert. Die mitgegebenen Blätter zeigen die Sortier-Aktivitäten, die wir gemacht haben. Bitten Sie Ihr Kind, sich die Bilder anzusehen und zu erzählen, warum manche Dinge zusammengehören. Sortieren Sie zu Hause kleine Gegenstände in Gruppen (Spielzeug, Kleidung, Lebensmittel) und lassen Sie Ihr Kind die Gruppen erklären.`,
    picturesIntro: `Unten sehen Sie ${i.pictureCueCount} der Bilder, die wir in der Klasse sortiert haben. Jedes ist auf ${languageName(i.language, 'de')} beschriftet. Sprechen Sie gemeinsam darüber, welche Bilder zusammengehören und warum.`,
  }),
  es: (i) => ({
    body: `Su hijo o hija ha estado observando, clasificando y agrupando cosas por lo que tienen en común. Las páginas impresas muestran las actividades de clasificación que hicimos juntos. Pídale a su hijo o hija que mire las imágenes y explique por qué algunas cosas van juntas. En casa, clasifiquen objetos pequeños en grupos (juguetes, ropa, comida) y pidan a su hijo o hija que explique los grupos.`,
    picturesIntro: `A continuación encontrará ${i.pictureCueCount} de las imágenes que clasificamos en clase. Cada una está rotulada en ${languageName(i.language, 'es')}. Hablen juntos sobre qué imágenes van juntas y por qué.`,
  }),
  nl: (i) => ({
    body: `Uw kind heeft geobserveerd, gesorteerd en dingen gegroepeerd op wat ze gemeen hebben. De afdrukken laten de sorteer-activiteiten zien die we samen deden. Vraag uw kind om naar de plaatjes te kijken en uit te leggen waarom sommige dingen bij elkaar horen. Sorteer thuis kleine voorwerpen in groepen (speelgoed, kleren, eten) en laat uw kind de groepen uitleggen.`,
    picturesIntro: `Hieronder ziet u ${i.pictureCueCount} van de plaatjes die we in de klas hebben gesorteerd. Elk is gelabeld in het ${languageName(i.language, 'nl')}. Praat samen over welke plaatjes bij elkaar horen en waarom.`,
  }),
};

const SEL_BY_LOCALE: Record<string, StrandTemplate> = {
  en: (i) => ({
    body: `Your child has been noticing feelings, naming emotions, and learning that it is okay to feel many different ways. The printed pages show the feelings work we did together. Ask your child about the faces on each page and talk about times they have felt the same way. Naming feelings out loud helps children handle big emotions.`,
    picturesIntro: `Below are ${i.pictureCueCount} of the feeling-faces we talked about. Each one is labeled in ${languageName(i.language, 'en')}. Take turns at home making the face and saying the feeling word together.`,
  }),
  de: (i) => ({
    body: `Ihr Kind hat Gefühle wahrgenommen, Emotionen benannt und gelernt, dass es in Ordnung ist, sich auf viele verschiedene Arten zu fühlen. Die mitgegebenen Blätter zeigen die Gefühlsarbeit, die wir gemacht haben. Fragen Sie Ihr Kind nach den Gesichtern auf jeder Seite und sprechen Sie darüber, wann es sich genauso gefühlt hat. Gefühle laut zu benennen hilft Kindern, große Emotionen zu bewältigen.`,
    picturesIntro: `Unten sehen Sie ${i.pictureCueCount} der Gefühlsgesichter, über die wir gesprochen haben. Jedes ist auf ${languageName(i.language, 'de')} beschriftet. Wechseln Sie sich zu Hause ab, das Gesicht zu machen und das Gefühlswort gemeinsam zu sagen.`,
  }),
  es: (i) => ({
    body: `Su hijo o hija ha estado notando sentimientos, nombrando emociones y aprendiendo que está bien sentirse de muchas maneras diferentes. Las páginas impresas muestran el trabajo con emociones que hicimos juntos. Pregúntele a su hijo o hija sobre las caras de cada página y hablen de momentos en los que se sintió igual. Nombrar los sentimientos en voz alta ayuda a los niños a manejar emociones fuertes.`,
    picturesIntro: `A continuación encontrará ${i.pictureCueCount} de las caras de emociones que comentamos. Cada una está rotulada en ${languageName(i.language, 'es')}. Túrnense en casa para hacer la cara y decir juntos la palabra del sentimiento.`,
  }),
  nl: (i) => ({
    body: `Uw kind heeft gevoelens opgemerkt, emoties benoemd en geleerd dat het oké is om je op veel verschillende manieren te voelen. De afdrukken laten het gevoelens-werk zien dat we samen deden. Vraag uw kind naar de gezichten op elke pagina en praat over momenten waarop het zich net zo voelde. Gevoelens hardop benoemen helpt kinderen om grote emoties te hanteren.`,
    picturesIntro: `Hieronder ziet u ${i.pictureCueCount} van de gevoelsgezichten waarover we praatten. Elk is gelabeld in het ${languageName(i.language, 'nl')}. Wissel thuis af om het gezicht te maken en samen het gevoelswoord te zeggen.`,
  }),
};

const STRAND_OVERRIDES: Partial<Record<Strand, Record<string, StrandTemplate>>> = {
  numeracy: NUMERACY_BY_LOCALE,
  literacy: LITERACY_BY_LOCALE,
  'world-knowledge': WORLD_KNOWLEDGE_BY_LOCALE,
  sel: SEL_BY_LOCALE,
  // vocabulary: no override — preserves existing tone/locale cell body verbatim
};

function resolveStrandOverride(
  strand: Strand,
  homeLanguage: string,
  inputs: TemplateInputs
): StrandOverride | null {
  const strandMap = STRAND_OVERRIDES[strand];
  if (!strandMap) return null;
  const fn = strandMap[homeLanguage] || strandMap.en;
  if (!fn) return null;
  return fn(inputs);
}

export function resolveParentLetterProse(
  tone: Tone,
  homeLanguage: string,
  strand: Strand,
  inputs: TemplateInputs
): ParentLetterProse {
  const toneMap = TONE_REGISTRY[tone] || TONE_REGISTRY.warm;
  const tpl = toneMap[homeLanguage] || toneMap.en;
  const base = tpl(inputs);
  const override = resolveStrandOverride(strand, homeLanguage, inputs);
  if (override) {
    return { ...base, body: override.body, picturesIntro: override.picturesIntro };
  }
  return base;
}
