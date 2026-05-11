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

import type { Tone } from './parent-letter-package-loader';

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

export function resolveParentLetterProse(
  tone: Tone,
  homeLanguage: string,
  inputs: TemplateInputs
): ParentLetterProse {
  const toneMap = TONE_REGISTRY[tone] || TONE_REGISTRY.warm;
  const tpl = toneMap[homeLanguage] || toneMap.en;
  return tpl(inputs);
}
