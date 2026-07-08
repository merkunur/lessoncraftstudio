import { Metadata } from 'next';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';

/* Map manifest `alignment.grade` ("K"/"1"/"2"/"3") to the localized
   `seo.educational_level.*` key. Reused across activities of all engines. */
const GRADE_KEY_MAP: Record<string, string> = {
  'PK': 'preschool',
  'K': 'kindergarten',
  '1': 'grade_1',
  '2': 'grade_2',
  '3': 'grade_3',
  '4': 'grade_4',
};

/* Per-locale grade override — the visible grade chip + JSON-LD level normally come
   from the shared `alignment.grade` (= the US CCSS grade). Where a national curriculum
   places the content in a DIFFERENT grade (e.g. German grades by Zahlenraum: bis-1000
   arithmetic is Klasse 3, not the CCSS-Grade-2 of 2.NBT.B.7), map activity-id → locale →
   grade here. EN + any locale/activity without an entry are unaffected. Sits beside the
   route's other localization maps (EDUCATIONAL_FRAMEWORK_BY_LOCALE, strand-names). */
const GRADE_OVERRIDE: Record<string, Record<string, string>> = {
  'wake-up-pip.retell-story.rl-k-2': { fr: '1' },                       // CP — reconstruire un récit DE MÉMOIRE (le modèle disparaît) + chaîne causale 4 temps + restituer les détails clés + écarter l'intrus = attendus cycle 2 (« comprendre l'enchaînement / la relation de cause à effet / restituer l'essentiel »); plus exigeant que le « remettre dans l'ordre » GS (modèle présent); parité DE Klasse 2; US RL.K.2 → FR CP
  'opposites.antonyms.k-l-5-b': { fr: '1' },                            // CP — relier un mot à son contraire (antonymes) + discriminer le contraire d'un mot de la même sorte = opération métalinguistique explicite « trouver un mot de sens contraire » du cycle 2 « Étude de la langue » (la maternelle travaille les contraires à l'oral); parité DE Klasse 1; US K.L.5.b K-cluster → FR CP
  'bingo-word-hunt.read-match.rf-k-3-d': { fr: '1' },                    // CP — lire des mots réguliers imprimés et discriminer des mots proches par la lettre/le son qui change = décodage graphophonologique du CP (la maternelle travaille la conscience phono à l'oral); US RF.K.3.d K-cluster → FR CP
  'mosaic-menders.area-match.3-md-c-6': { fr: '4' },                     // CM1: mesurer une aire par comptage d'une unité (le carreau) = compétence CM1 dans les repères de progression, pas la comparaison perceptive de CE2; en Grade 3 / de Klasse 3 unchanged
  'sound-boxes.phoneme-position.rf-k-2-d': { de: '1' },                  // Klasse 1 (Schuleingangsphase): Lautanalyse (An-/In-/Auslaut heraushören) = Kern der phonologischen Bewusstheit (US RF.K.2.d; K-cluster → Klasse 1)
  'choice-board.read-cvc-word.rf-k-3': { de: '1' },                      // Klasse 1 — Erstlesen: Wörter erlesen (synthetisierendes Lesen) = Kern des Anfangsunterrichts (US RF.K.3; K-cluster → Klasse 1)
  'choice-board.onset-rime-blend.rf-k-2-c': { de: '1' },                 // Klasse 1 — Lautsynthese (Anlaut + Reim zusammenschleifen) = Vorstufe des Erlesens, Anfangsunterricht (US RF.K.2.c; K-cluster → Klasse 1)
  'fraction-equiv.same-amount.3-nf-a-3': { de: '4' },                    // Klasse 4 — äquivalente Brüche (Bruch-Symbolik + Gleichwertigkeit + Nenner 6/8) = Klasse-4-Propädeutik (educator-ruled, NOT Klasse 3); operator-approved grade_4 support (US Grade 3 → DE Klasse 4)
  'daisy-plate-stack.plurals.l-k-1-c': { de: '2' },                      // Klasse 2 — Einzahl/Mehrzahl (Numerus/Pluralbildung) = systematische Grammatik (educator-ruled; US L.K.1.c K-cluster → DE Klasse 2)
  'penny-alphabet-trace.letter-formation.l-k-1-a': { de: '1' },          // Klasse 1 — Erstschreiben: formgerechtes Nachspuren der Druckbuchstaben = Kern des Anfangsunterrichts (US L.K.1.a; K-cluster → Klasse 1)
  'rhyme-shop.rhyme.rf-k-2-a': { de: '1' },                              // Klasse 1 — Reime/phonologische Bewusstheit = Kernkompetenz des Anfangsunterrichts (US RF.K.2.a; K-cluster → Klasse 1)
  'sock-and-shadow.puppet-speak.sl-k-6': { de: '1' },                    // Klasse 1 — KMK Sprechen und Zuhören: verständlich/adressatenbezogen beschreiben (US SL.K.6; K-cluster → Klasse 1)
  'contraction.apostrophe.l-2-2-c': { de: '3' },                         // Präposition-Artikel-Verschmelzung (in dem → im) — bewusste Analyse setzt Präposition+Artikel als Wortarten voraus (Klasse-3-Lehrplan) → DE Klasse 3 (en Grade 2)
  'hattie-whose-is-it.possessive.l-1-1-b': { de: '3' },                  // Namen-Genitiv OHNE Apostroph + Deppenapostroph-Erkennung = Rechtschreib-Regel/Apostroph-Bewusstheit → DE Klasse 3 (en Grade 1)
  'otto-picture-book.which-picture.rl-k-7': { de: '1' },                 // Bild-Text-Bezug: vorgelesenen Satz dem passenden Bild einer Bildergeschichte zuordnen (bildgestützt, gehört-nicht-gelesen) = Klasse-1-Kerngeschäft; en stays Kindergarten (K-cluster K-label)
  'wake-up-pip.retell-story.rl-k-2': { de: '2' },                        // Nacherzählen mit Schlüsseldetails + wichtig-vs-unwichtig-vs-gehört-nicht-dazu Relevanzurteil (supply-key/fix-memory) = DE Klasse 2 (en Kindergarten); K-cluster content-drives-higher
  'two-tales.compare.rl-1-9': { de: '2' },                               // zwei erzählende Geschichten vergleichen (Gemeinsamkeiten/Unterschiede, same-vs-only-one set-logic) = intertextueller Textvergleich → DE Klasse 2 (en Grade 1)
  'linc-fact-chain.connect.ri-k-3': { de: '2' },                         // Sachverhalte verknüpfen (Reihenfolge + Ursache-Wirkung) — Kausalschluss über zwei Sachtext-Aussagen = DE Klasse 2 (en Kindergarten); K-cluster content-drives-higher
  'marlo-magnifier.trait-evidence.rl-1-3': { de: '3' },                  // Charaktereigenschaft aus einer Handlung erschließen + mit Textstelle belegen = schlussfolgerndes Lesen/Textbeleg → DE Klasse 3 (en Grade 1); #84/#91/#93 evidence-ladder
  'marina-headline-desk.main-topic.ri-2-2': { de: '3' },                 // Hauptthema eines Sachtexts — topic-vs-detail is the metatextual/higher-order skill (Wesentliches vom Detail unterscheiden) → DE Klasse 3 (en Grade 2)
  'wobble-museum.catch-drift.w-k-2': { de: '2' },                        // beim Thema bleiben / Textfokus — reading-on-text-level load (4 sentences/room) → DE Klasse 2 (en Kindergarten); Vorlesen-button mitigates but doesn't drop to Klasse 1
  'point-of-view.who-told.rl-1-6': { de: '2' },                          // Erzählperspektive/Standpunkt — DE Klasse 2 (Klasse 1 = still decoding; Klasse 3 = the reflective form; the concrete high/low viewpoint mechanic sits at Klasse 2) → en Grade 1
  'pim-comma-mail.letter-commas.l-2-2-b': { de: '3' },                    // das Komma in der Anrede — Kommasetzung is a Klasse-3 topic in DE (Klasse 1-2 = Satzschlusszeichen only) → DE Klasse 3 (en Grade 2)
  'inky-book-workshop.author-illustrator.rl-k-6': { de: '1' },            // Buchrollen Autor/Illustrator (Klasse-1 Buch-/Medienkunde) → DE Klasse 1 (en Kindergarten); K-cluster K-label
  'field-guide.text-features.1-ri-5': { de: '2' },                        // USE text features (Inhaltsverzeichnis/Glossar nutzen) presupposes automatized reading → DE Klasse 2 (en Grade 1; also_teaches 2.RI.5)
  'picture-story.read.rl-k-1': { de: '1' },                               // story key-detail comprehension w/ read-aloud support → DE Klasse 1 (en Kindergarten); K-cluster K-label
  'atlas-fact-files.key-detail.ri-k-1': { de: '1' },                      // Sachtext-Leseverständnis (late-Klasse-1 Erstleser) → DE Klasse 1 (en Kindergarten); K-cluster K-label
  'nila-pond.main-idea-net.ri-k-2': { de: '1' },                          // Hauptaussage eines VORGELESENEN Sachtexts (Hörverstehen, mit Hilfestellung) → DE Klasse 1; sitzt unter marina RI.2.2/Klasse 3 (Selberlesen); K-cluster K-label
  'booker-glossary-desk.guide-words.l-2-4-e': { de: '3' },                // systematische Wörterbucharbeit (Leitwörter, 2nd/3rd-letter) → DE Klasse 3 (en Grade 2)
  'clock-digital.read-hour.1-md-b-3': { fr: '2' },                       // FR CE1 — lire l'horloge à aiguilles (heures) = CE1 attendu; en Grade 1 / de Klasse 1
  'clock-digital.read-half-hour.1-md-b-3': { fr: '2' },                  // FR CE1 — heures + demi-heures; en Grade 1 / de Klasse 1
  'clock-digital.read-quarter-hour.2-md-c-7': { fr: '3' },               // FR CE2 — « moins le quart » (référence à l'heure suivante) = attendu CE2, un cran au-dessus des demi-heures CE1; en Grade 2 unchanged
  'clock-digital.read-five-minute.2-md-c-7': { fr: '3' },                // FR CE2 — lire l'heure de 5 en 5 = repère CE2 (la granularité fixe le niveau, lecture digitale « 3 h 20 »); en Grade 2 unchanged
  'clock-digital.match-clocks.2-md-c-7': { fr: '3' },                    // FR CE2 — associer numérique↔aiguilles : l'attendu est fixé par la granularité de lecture (« moins le quart », 5 min), pas par le sens; cohérent avec read-quarter/five-minute CE2; en Grade 2 unchanged
  'place-value-regroup.subtract-decompose.2-nbt-b-7': { de: '3', fr: '3' },        // bis-1000 subtraction (borrow) → DE Klasse 3 / FR CE2 (grade_3)
  'place-value-regroup.add-compose-hundred.2-nbt-b-7': { de: '3', fr: '3' },       // bis-1000 add (carry to hundreds) → DE Klasse 3 / FR CE2 (grade_3)
  'place-value-regroup.subtract-decompose-hundred.2-nbt-b-7': { de: '3', fr: '3' },// bis-1000 borrow across zero → DE Klasse 3 / FR CE2 (grade_3)
  'pond-juice.pour-measure.3-md-a-2': { de: '2', fr: '2' },               // Hohlmaße/Liter (whole-l 0-10, no ml) → DE Klasse 2 (ml/Umrechnung = Klasse 3); FR CE1 (le litre introduced CE1, mL/conversions = cycle 3); en Grade 3 unchanged
  'bundle-bot.bundle-machine.1-nbt-b-2-a': { de: '2' },                   // two-digit Stellenwert (20-49, multiple tens) → DE Klasse 2 (Klasse 1 = ZR bis 20)
  'tense.past-present-future.l-1-1-e': { de: '2', fr: '2' },              // Zeitformen 3-way contrast + werden-future → DE Klasse 2 (Klasse 1 = nur Gegenwart); FR CE1 (présent seul = CP, la conjugaison systématique imparfait+futur simple = attendu CE1)
  'sentence-builder.build-a-sentence.l-1-1-j': { de: '2', fr: '2' },      // Satzbau/Wortreihenfolge reorder task → DE Klasse 2 (mastery by end of Klasse 2); FR CE1 (l'accord dans le groupe nominal — le chat noir — = attendu CE1, past CP word-order-only)
  'pronoun.case.l-1-1-d': { de: '3', fr: '3' },                           // case-correct pronoun-form choice (er/ihn) → DE Klasse 3 (Fall-arbeit is Klasse 3/4); FR CE2 (les pronoms sujets = CE1, but the COD/object form me/te/le is the CE2 attendu — the activity's central difficulty)
  'olive-kind-of.category-attribute.l-1-5-b': { de: '2', fr: '2' },       // Oberbegriff/Hyperonym abstraction → DE Klasse 2 (EN Grade 1 placement doesn't transfer); FR CE1 (catégoriser / le mot générique vs particulier = attendu CE1, réflexif, past CP naming)
  'vera-verb-match.be-agreement.l-1-1-c': { de: '2', fr: '2' },           // reflective Subjekt-Verb-Kongruenz (bin/ist/sind) → DE Klasse 2 (K-1 kids speak it; the grammar task is Klasse 2); FR CE1 (l'accord sujet-verbe / conjuguer être au présent = attendu CE1, réflexif, past CP oral use)
  'hazel-word-bridge.joining-words.l-1-1-g': { de: '3', fr: '3' },        // selection-by-meaning across 4 Bindewörter incl. causal „denn" + Pflichtkomma → DE Klasse 3; FR: coordination + car + comma-before-mais/car → CE2
  'cleo-packing-list.series-commas.l-1-2-b': { de: '3', fr: '3' },        // Komma bei Aufzählung = first comma rule, DE Klasse 3; FR: la virgule d'énumération = premier attendu interne → CE2
  'robin-mirror.reflexive.l-2-1-c': { de: '3', fr: '3' },                 // Reflexivpronomen → DE Klasse 3; FR: le pronom réfléchi qui varie avec le sujet = consolidation CE2 (au-dessus du pronom sujet CE1)
  'rusty-yesterday.irregular-past.l-2-1-d': { de: '3', fr: '3' },         // starke Verben Präteritum → DE Klasse 3; FR: passé composé irrégulier (résister à « faisé ») = consolidation CE2
  'roary-roar-meter.shades.l-2-5-b': { de: '3', fr: '3' },                // Bedeutungsnuancen → DE Klasse 3; FR: classer des synonymes par intensité = CE2 (au-dessus des contraires/synonymes simples de CE1)
  'wren-question-window.question-words.l-k-1-d': { de: '1', fr: '2' },    // Fragewörter = DE Klasse 1 (mechanical K→1); FR: emploi écrit des 6 mots interrogatifs = CE1 attendu (maternelle=oral, CP=déchiffrage) — deliberately one notch above the DE bump
  'wordclass.adjective-adverb.l-2-1-e': { fr: '3' },                     // FR CE2: l'adverbe comme classe nommée + le CHOIX fonctionnel adjectif/adverbe = attendu de fin de cycle 2 (l'adjectif seul = CE1); the CCSS-Grade-2→CE1 auto-map under-levels it. en Grade 2 unchanged
  'sunny-side-diner.compound-order.l-k-1-f': { fr: '1' },                // FR CP: produire une phrase complète + coordonner deux groupes avec « et » = charnière oral→écrit CP (au-dessus de la production orale GS, en deçà de l'analyse CE1); native 'K'→« Grande section » too low; en Kindergarten unchanged
  'echo-grove.match-the-rune.3-oa-a-1': { de: '2' },                      // Multiplikation als gleiche Gruppen / kleines Einmaleins = DE Klasse 2 (US Grade 3 a year higher)
  'maple-bakery.share.3-oa-a-2': { de: '2' },                             // Division (Verteilen/Aufteilen, ohne Rest) introduced alongside Einmaleins = DE Klasse 2
  'comet-kangaroo.tens-hundreds.2-nbt-b-8': { de: '3' },                  // 10/100 mehr-weniger im ZR bis 1000 = DE Klasse 3 (Tausenderraum; Klasse 2 = bis 100)
  'track-repair.count-to-120.1-nbt-a-1': { de: '2' },                     // Orientierung am Zahlenstrahl bis 100 + skip-counting = DE Klasse 2 (ZR bis 20 = Klasse 1); US Grade 1 offset
  'bos-berry-pantry.slingshot-tens.1-nbt-b-2': { de: '2' },               // read/match two-digit Stellenwert (values to 85, multiple tens, ZR bis 100) → DE Klasse 2 (Klasse 1 = ZR bis 20); bundle-bot precedent
  'vet-diagnosis.word-problems.1-oa-a-1': { de: '2' },                    // Sachaufgaben ZR bis 20 BUT grade follows STRUCTURE: Anfang-unbekannt + additiver Vergleich = schwierigste Klasse-2 Sachaufgabentypen; length-sibling precedent
  'bramble.holds-more.k-md-a-2': { de: '1' },                             // K capacity: German „Kindergarten"=daycare (not a school stage) → Klasse 1; direkter Größenvergleich is Klasse-1 Lehrplan; en stays Kindergarten (the K-cluster K-label pattern)
  'pip-museum.curate-wing.k-g-a-2': { de: '1' },                          // K geometry shape-naming → Klasse 1 (Formen erkennen/benennen = Kern-Geometrie Klasse 1); en stays Kindergarten (K-cluster pattern)
  'chuffer.rail-decompose.k-oa-a-3': { de: '1' },                         // K number-decompose (Zahlzerlegung bis 10) → Klasse 1 (Kernstoff erste Wochen); en stays Kindergarten (K-cluster pattern)
  'friendship-bridge.compare-balance.k-cc-c-6': { de: '1' },              // K compare-sets-by-matching (Mengen vergleichen mehr/weniger/gleich viel) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'necklace.bead-string.k-cc-b-4': { de: '1' },                           // K count-to-cardinality (Anzahl durch Zählen + Anzahlinvarianz) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'star-stitcher.connect-sequence.k-cc-a-2': { de: '1' },                 // K count-forward-from-N (Weiterzählen ab einer Zahl) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'mochi-feast.count-out.k-cc-b-5': { de: '1' },                          // K count-out-N / Menge herstellen (eine vorgegebene Anzahl abzählen) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'ten-tank.ten-frame-tank.k-nbt-a-1': { de: '1' },                       // K teen numbers 11-19 as ten+ones (Bündeln) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'wondering-jar.estimate-jar.k-cc-b-5': { de: '1' },                     // K estimate-then-count (Anzahlen schätzen) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'pips-round.mail-route.k-cc-a-3': { de: '1' },                          // K numeral reading/recognition (Zahlen lesen bis 20) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'digby-number-trace.numeral-formation.k-cc-a-3': { de: '1' },           // K numeral WRITING (Ziffern schreiben) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'clock-ampm.morning-or-night.2-md-c-7': { de: '1' },                    // a.m./p.m.→Tageszeit rebuild: Tageszeiten zuordnen = Klasse 1 (simpler than the Klasse-2 elapsed sibling); en stays Grade 2
  'nesting-pots.seriate.k-cc-c-7': { de: '1' },                           // K seriate/order numbers → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'clunks-lost-lunch.make-total.k-oa-a-3': { de: '1' },                   // K make-a-total-many-ways (Zahlen zusammensetzen) → Klasse 1; en stays Kindergarten (chuffer precedent)
  'posy-egg-cartons.count-tens.k-cc-a-1': { de: '2' },                    // K count-by-tens but CONTENT bis 100 → Klasse 2 (ZR bis 100 = Klasse 2; content drives the grade, the pond-juice/bundle-bot precedent); en stays Kindergarten
  'twinsies.count-twin.k-cc-b-5': { de: '1' },                            // K count + make a gleich-große Menge (Anzahlinvarianz, ZR bis 12) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'rivets-number-forge.numeral-album.k-cc-a-3': { de: '1' },              // K count-enacted numeral production (Anzahl bis 20 + passende Ziffer) → Klasse 1 (ZR bis 20); en stays Kindergarten (K-cluster; digby/pips siblings precedent)
  'mamas-roll-call.numeral-trace.k-cc-b-5': { de: '1' },                  // K count-out (self-stop) + Ziffer formen (Anzahl bis 9) → Klasse 1; en stays Kindergarten (K-cluster; mochi/twinsies K.CC.B.5 precedent)
  'parking-tower.place-by-relation.k-g-a-1': { de: '1' },                 // K Lagebeziehungen über/unter/neben/zwischen → Klasse 1 Geometrie; en stays Kindergarten (K-cluster)
  'opposites.antonyms.k-l-5-b': { de: '1' },                              // K antonyms (Gegensätze/Gegenteile) = foundational Klasse-1 Wortschatzarbeit; en stays Kindergarten (K-cluster K-label)
  'author-purpose.why-wrote.ri-2-6': { de: '3' },                         // judging Textfunktion/Autorintention (informieren/unterhalten/anleiten) = metatextual Klasse-3/4 (one step up from field-guide's Klasse 2); en stays Grade 2
  'juniper-story-lantern.central-message.rl-1-2': { de: '3', fr: '2' },    // die Lehre/Moral einer Fabel = abstraction + inference (Tiere stellvertretend), Klasse-3/4 Textsorte; en stays Grade 1; FR CE1: dégager la morale = inférer l'implicite (attendu CE1, PAS la compréhension littérale CP)
  'story-spine.role.rl-k-3': { de: '1' },                                 // Erzählstruktur / Anfang-Problem-Lösung = früheste Erzählkompetenz, bildgestützt + Vorlesehilfe = Klasse 1 (picture-story #82 precedent); en stays Kindergarten (K-cluster K-label)
  'pearl-opinion-page.back-it-up.ri-2-8': { de: '3' },                    // Begründung — einen echten Grund von einer bloßen Wiederholung unterscheiden = metasprachlich-argumentatives Denken, Klasse 3 (Meinung begründen/Aussagen belegen); en stays Grade 2
};
function effGrade(row: ActivityRow, locale: string): string {
  return (locale !== 'en' && GRADE_OVERRIDE[row.id] && GRADE_OVERRIDE[row.id][locale]) || row.alignment.grade;
}

/* Per-activity strand/domain override — the shared `localizeStrand` maps the CCSS
   strand, but where a national curriculum files the content under a DIFFERENT domain
   (e.g. German splits CCSS "Measurement & Data": a bar-graph is „Daten und Häufigkeit",
   NOT „Größen und Messen"), map activity-id → locale → domain name here. Other locales/
   activities fall through to localizeStrand unchanged. Display-only (chip + JSON-LD
   teaches/targetDescription); related-activity matching keeps the raw alignment.strand. */
const STRAND_OVERRIDE: Record<string, Record<string, string>> = {
  'juniper-story-lantern.central-message.rl-1-2': { fr: 'Comprendre et interpréter' }, // FR CE1: dégager la morale d'une fable = interpréter le sens/le message au-delà du littéral (cycle-2 Lecture et compréhension de l'écrit); NOT « Écouter de l'écrit et comprendre » (maternelle/GS pré-lecteur); "Reading: Literature" has no fr in strand-names.ts; en/de fall through
  'contraction.apostrophe.l-2-2-c': { fr: 'L’orthographe' }, // FR CE1: l'apostrophe d'élision = une marque orthographique (comme la majuscule #32 wally-capital-crane, l'accent, la cédille) — NOT grammaire/lexique; "Language" has no fr in strand-names.ts; en/de fall through
  'bea-two-bookshelves.story-or-fact.rl-1-5': { fr: 'Lecture et compréhension de l’écrit' }, // FR CP: reconnaître le type d'un livre — distinguer un récit d'un texte documentaire (« reconnaître les principaux genres de textes ») = compétence cycle-2 dès le CP, domaine « Lecture et compréhension de l'écrit »; NOT « Comprendre et interpréter » (= extraire/interpréter le SENS dans un texte; ici on CLASSE le texte par genre depuis les indices de couverture); "Reading: Literature" has no fr in strand-names.ts; en/de fall through
  'wake-up-pip.retell-story.rl-k-2': { fr: 'Comprendre et interpréter' }, // FR CP: reconstruire/raconter un récit dans l'ordre avec les détails clés = compréhension de la structure/l'ordre d'un récit → « Comprendre et interpréter » (cycle 2, Lecture et compréhension de l'écrit); NOT « Écouter de l'écrit et comprendre » (maternelle/GS — misplace le niveau CP); the child REORDERS pictures (n'oralise pas) → comprehension not oral production; "Reading: Literature" has no fr in strand-names.ts
  'story-spine.role.rl-k-3': { fr: 'Écouter de l’écrit et comprendre' }, // GS/maternelle: repérer début/problème/solution d'un récit lu à voix haute + images = compréhension d'un récit (domaine « Mobiliser le langage », partie « L'écrit ») — the child LISTENS (pré-lecteur); genre-neutral label shared with the RL-comparison (willow) + RI-main-idea (nila) siblings; "Reading: Literature" has no fr in strand-names.ts; en/de fall through to Reading: Literature / Literarische Texte verstehen
  'nila-pond.main-idea-net.ri-k-2': { fr: 'Écouter de l’écrit et comprendre' }, // GS/maternelle: écouter un texte documentaire narré + dégager l'idée principale = compréhension de l'oral (domaine « Mobiliser le langage », partie « L'écrit ») — the child LISTENS (pré-lecteur), genre-neutral label shared with the RL narrative sibling (willow); "Reading: Informational Text" has no fr in strand-names.ts (would leak EN); en/de fall through to Reading: Informational Text / Sachtexte verstehen
  'opposites.antonyms.k-l-5-b': { fr: 'Le lexique' }, // FR CP: les contraires/antonymes = travail sur le vocabulaire → sous-domaine cycle-2 « Le lexique » (comme ziggy/olive/roary/sage); "Language" has no fr in strand-names.ts (would leak EN); en/de fall through to Language / (de sibling label)
  'willow-story-corner.compare-tales.rl-k-9': { fr: 'Écouter de l’écrit et comprendre' }, // GS/maternelle: écouter deux récits narrés + comparer les personnages = compréhension de l'oral (domaine « Mobiliser le langage », partie « L'écrit ») — the child LISTENS (pré-lecteur), NOT « Lecture et compréhension de l'écrit » (CP décodage); "Reading: Literature" has no fr in strand-names.ts (would leak EN); en/de fall through to Reading: Literature / Literarische Texte verstehen
  'comparison-creek.river-steer.k-cc-c-7': { fr: 'Découvrir les nombres et leurs utilisations' }, // GS-anchored: the maternelle domain (programmes cycle 1) — the cycle-2 auto-map „Nombres et calcul" reads a year off next to the « Grande section » chip; en/de fall through to Counting & Cardinality / Zählen und Mengen
  'sage-root-garden.roots.l-2-4-c': { fr: 'Le lexique' }, // familles de mots / radical = morphologie dérivationnelle → LE LEXIQUE (programmes cycle 2), beside the affix activity; the German sibling files word-families under grammar („Sprache untersuchen") but that placement is DE-specific — en/de fall through to Language / Sprache untersuchen unchanged
  'sound-boxes.phoneme-position.rf-k-2-d': { de: 'Sprache und Sprachgebrauch untersuchen' }, // Lautanalyse = metalinguistische Analyse der Lautstruktur (KMK); distinct from #102 Reime „Sprechen und Zuhören" (holistic listening)
  'stretch-giraffe.long-short-vowel.rf-1-2-a': { de: 'Sprache und Sprachgebrauch untersuchen' }, // Vokallaenge = analytische Isolation+Klassifikation des betonten Selbstlauts nach dem Merkmal Quantitaet (metasprachlich, wie #106); NOT #102 „Sprechen und Zuhören"; RF hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'choice-board.read-cvc-word.rf-k-3': { de: 'Lesen – mit Texten und Medien umgehen' }, // Erstlesen = rezeptiv-lesende Kompetenz (KMK Kompetenzbereich Lesen, „über Lesefaehigkeiten verfuegen"); distinct from #106/#107 „untersuchen"; RF hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'choice-board.onset-rime-blend.rf-k-2-c': { de: 'Lesen – mit Texten und Medien umgehen' }, // Lautsynthese = graphem-gestuetzte Leseanbahnung (Vorstufe von #108); nicht #102 auditives „Zuhören" noch #106/#107 „untersuchen"; RF hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'domino-two-part.two-syllable.rf-1-3-e': { de: 'Lesen – mit Texten und Medien umgehen' }, // Silbenlesen = silbenweises Erlesen zweisilbiger Woerter (Silbenmethode, rezeptives Lesen); Bridge von #108 CVC zum fluessigen Lesen, distinct from #109 sub-syllabic; RF hat keinen de-Eintrag -> Override setzt den Chip
  'fraction-equiv.same-amount.3-nf-a-3': { de: 'Zahlen und Operationen' }, // KMK Mathematik Kompetenzbereich — Bruchteile = Zahlvorstellung; Number&Operations—Fractions hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'daisy-plate-stack.plurals.l-k-1-c': { de: 'Sprache und Sprachgebrauch untersuchen' }, // Numerus/Pluralbildung = grammatisch-morphologisch (nicht olive „Wortschatz"=semantisch); Language hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'coin-stall.money.2-md-c-8': { de: 'Größen und Messen' }, // Geld = KMK-Standardgröße (Rechnen mit Euro und Cent); Measurement&Data hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'clock-convert.12-24.2-md-c-7': { de: 'Größen und Messen' },          // Zeit ist eine Größe — KMK-Leitidee „Größen und Messen"; „Measurement & Data" auto-map is wrong
  'penny-alphabet-trace.letter-formation.l-k-1-a': { de: 'Schreiben – Schreibfertigkeiten' }, // Handwriting/letter formation = KMK „Schreiben" (über Schreibfertigkeiten verfügen), NOT Rechtschreibung („Richtig schreiben") and NOT the grammar Bereich
  'mango-animal-groups.collective-nouns.l-2-1-a': { de: 'Wortschatz untersuchen und erweitern', fr: 'Le lexique' }, // Sammelnamen = Wortschatzarbeit, not the grammar Bereich (olive/roary/ziggy precedent); „Language" auto-map would read as „Sprache untersuchen"; FR CE1: nommer une collection = trouver le mot juste = « Le lexique » (facette lexicale; l'accord=cycle-3, hors scope; = antonymes/nuances #27/#34/#35/#46/#53)
  'rhyme-shop.rhyme.rf-k-2-a': { de: 'Sprechen und Zuhören' },          // Reime hören = auditive Vorläuferfertigkeit des Lesens; strand-names.ts has no „Reading: Foundational Skills" de entry, so the override sets the chip
  'nila-pond.main-idea-net.ri-k-2': { de: 'Sprechen und Zuhören' },     // Hauptaussage eines VORGELESENEN Sachtexts = verstehend zuhören (KMK „Sprechen und Zuhören"), NOT the RI-sibling „Lesen…" chip — a Klasse-1 child can't decode a 4-Satz-Sachtext selbst; read-aloud/listening modality (rhyme-shop/sock-and-shadow precedent)
  'sock-and-shadow.puppet-speak.sl-k-6': { de: 'Sprechen und Zuhören' }, // first SL activity in DE; strand-names.ts has no „Speaking & Listening" entry, so the override sets the chip (hattie „Richtig schreiben" precedent)
  'hattie-whose-is-it.possessive.l-1-1-b': { de: 'Richtig schreiben' }, // Namen-Genitiv-s ohne Apostroph = Apostroph-Rechtschreibung, not the grammar Bereich (wally-capital-crane Nomen-Großschreibung precedent)
  'pim-comma-mail.letter-commas.l-2-2-b': { de: 'Richtig schreiben' }, // Kommasetzung bei der Anrede = Zeichensetzung/Rechtschreibung → „Richtig schreiben" (cleo/wally precedent), not the grammar Bereich
  'compound-meaning.predict.l-2-4-d': { de: 'Wortschatz untersuchen' }, // Komposita-Bedeutung erschließen = vocabulary (the L.2.4 family — affix/sage-root precedent), not the grammar Bereich „Sprache untersuchen"
  'inky-book-workshop.author-illustrator.rl-k-6': { de: 'Lesen – mit Texten und Medien umgehen' }, // who MAKES a book (Autor/Illustrator) = Buch-/Medienkunde, NOT literary comprehension → overrides the „Reading: Literature"→„Literarische Texte verstehen" auto-map (field-guide/bea/author-purpose precedent)
  'jasper-just-right.real-life.l-1-5-c': { de: 'Wortschatz untersuchen' }, // real-life word use = vocabulary, not the grammar Bereich (fern/olive precedent)
  'fern-clue-garden.context-clues.l-2-4-a': { de: 'Wortschatz untersuchen' }, // Teekesselwörter/Wortbedeutung = vocabulary, not the grammar Bereich (affix/olive/roary/ziggy precedent)
  'booker-glossary-desk.guide-words.l-2-4-e': { de: 'Richtig schreiben' }, // Wörterbuch nachschlagen = Rechtschreib-Arbeitstechnik, not Sprache untersuchen (cleo/wally precedent)
  'gabby-sayings.idioms.l-3-5-a': { de: 'Wortschatz untersuchen', fr: 'Le lexique' }, // Redewendungen = feste Bedeutungseinheit / Wortbedeutung = vocabulary (roary/fern/olive L.5 precedent), not the grammar Bereich; FR CE2: le sens figuré / les expressions imagées = travail sur le sens des mots/expressions → « Le lexique » (= antonymes/nuances #27/#34/#35/#46)
  'opposites.antonyms.k-l-5-b': { de: 'Wortschatz untersuchen' }, // Gegensätze/Antonyme = Wortbedeutung/semantic relation = vocabulary (olive/roary/fern/gabby/ziggy/jasper precedent), not the grammar Bereich
  'field-guide.text-features.1-ri-5': { de: 'Lesen – mit Texten und Medien umgehen' }, // USING the book's tools to navigate = Lesestrategie/Texterschließung (the KMK Bereich), NOT comprehension (#78's „Sachtexte verstehen")
  'bea-two-bookshelves.story-or-fact.rl-1-5': { de: 'Lesen – mit Texten und Medien umgehen' }, // Geschichte-vs-Sachbuch = Textsortenbewusstheit (Umgang-mit-Texten), NOT literary comprehension; CCSS „Reading: Literature" auto-map absent → override sets the chip (a future story-comprehension RL activity opens its own literary Bereich)
  'author-purpose.why-wrote.ri-2-6': { de: 'Lesen – mit Texten und Medien umgehen' }, // Textfunktion/Lesabsicht spanning Textsorten (the activity sorts a story + a how-to alongside facts) → the KMK Bereich, NOT „Sachtexte verstehen" (a story note isn't a Sachtext); field-guide/bea precedent
  'graph-it.bar-graph.2-md-d-10': { de: 'Daten und Häufigkeit', fr: 'Organisation et gestion de données' },   // bar graph = data, not Größen / Grandeurs et mesures
  'line-plot.read.2-md-d-9': { de: 'Daten und Häufigkeit', fr: 'Organisation et gestion de données' },        // line plot of measured lengths = data, not Größen / Grandeurs et mesures
  'hoppers-number-line.jump-sums.2-md-b-6': { de: 'Zahlen und Rechnen im Zehnersystem', fr: 'Nombres et calcul' }, // add/sub on a number line = arithmetic, not Größen / Grandeurs et mesures
  'mosaic-menders.area-match.3-md-c-6': { de: 'Raum und Form' },    // Flächeninhalt = Raum und Form in KMK, not Größen und Messen
  'patchwork-meadow.tile.3-md-c-6': { de: 'Raum und Form' },        // Flächeninhalt durch Auslegen = Raum und Form (sibling of mosaic-menders)
  'digby-number-trace.numeral-formation.k-cc-a-3': { de: 'Zahlen und Operationen' },  // numeral WRITING = Zahldarstellung (NOT the reading sibling pips-round's „Zählen und Mengen")
  'olive-kind-of.category-attribute.l-1-5-b': { de: 'Wortschatz untersuchen', fr: 'Le lexique' }, // Oberbegriffe = Wortschatzarbeit, not Grammatik („Sprache untersuchen"); FR catégoriser/le mot générique = LE LEXIQUE (vocabulaire), beside affix/sage; en falls through to Language
  'cleo-packing-list.series-commas.l-1-2-b': { de: 'Richtig schreiben' }, // Zeichensetzung = orthography/Rechtschreiben, not „Sprache untersuchen"
  'wally-capital-crane.special-names.l-2-2-a': { de: 'Richtig schreiben', fr: 'L’orthographe' }, // Nomen-Großschreibung = orthography/Rechtschreiben; FR: la majuscule d'un nom propre = orthographe lexicale (divergence from #30 ponctuation → étude de la langue)
  'sunny-side-diner.compound-order.l-k-1-f': { fr: 'Langage oral' }, // FR: écouter la commande + la redire en jeu de rôle = production orale → « Langage oral » (composante cycle 2), NOT the grammar Bereich; the child PRODUCES the sentence, doesn't analyse it. en falls through to Language
  'snippy.letter-formation.l-k-1-a': { fr: 'Écriture' }, // FR: former/tracer les lettres = le geste graphique/geste d'écriture → domaine « Écriture » (calque le frère allemand « Schreiben »), NOT « Étude de la langue » (grammaire). en falls through to Language
  'rusty-yesterday.irregular-past.l-2-1-d': { fr: 'La conjugaison' },      // FR: le passé composé = conjugaison, its own named strand at l'école élémentaire (finer than the « Étude de la langue » umbrella; DE stays default « Sprache untersuchen »)
  'roary-roar-meter.shades.l-2-5-b': { de: 'Wortschatz untersuchen', fr: 'Le lexique' }, // Bedeutungsnuancen = vocabulary work, not grammar; FR: les nuances de sens = le lexique (like #26 sage / #27 olive)
  'ziggy-odd-one-out.category.l-1-5-a': { de: 'Wortschatz untersuchen', fr: 'Le lexique' }, // Wortfelder/Kategorien = vocabulary work, not grammar; FR: trouver l'intrus = le lexique (like #26/#27/#34)
  'halfway-harbors.nearest.3-nbt-a-1': { de: 'Zahlen und Operationen' },  // Runden = KMK Leitidee „Zahlen und Operationen", broader than the auto-localized „…Zehnersystem"
  'echo-grove.match-the-rune.3-oa-a-1': { de: 'Zahlen und Operationen' }, // Multiplikation = KMK Leitidee „Zahlen und Operationen"; literal „Rechnen und algebraisches Denken" reads wrong (Sekundarstufe term)
  'maple-bakery.share.3-oa-a-2': { de: 'Zahlen und Operationen' },        // Division = same KMK Leitidee „Zahlen und Operationen" (pairs with multiplication)
  'winter-piles.draw-partition.2-oa-c-4': { de: 'Zahlen und Operationen' }, // Punktefeld/wiederholte Addition = foundation of multiplication, same Leitidee
  'comet-kangaroo.tens-hundreds.2-nbt-b-8': { de: 'Zahlen und Operationen' }, // Stellenwert/Orientierung im Tausenderraum lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'mending-fences.mend-board.3-md-d-8': { de: 'Raum und Form' },          // Umfang+Fläche = geometric figure property (KMK „Raum und Form"), like the area activity — not the free-measured Längen of „Größen und Messen"
  'track-repair.count-to-120.1-nbt-a-1': { de: 'Zahlen und Operationen' }, // Orientierung am Zahlenstrahl / Zahlvorstellung lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'gus-snack-cart.within-100.2-nbt-b-5': { de: 'Zahlen und Operationen' }, // add/sub within 100 = Rechnen/Operationen → KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'bos-berry-pantry.slingshot-tens.1-nbt-b-2': { de: 'Zahlen und Operationen' }, // Stellenwert (Zehner+Einer lesen) lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'vet-diagnosis.word-problems.1-oa-a-1': { de: 'Zahlen und Operationen' }, // Sachaufgaben add/sub = KMK Leitidee „Zahlen und Operationen"; „algebraisches Denken" is Sek-I framing, not a Primarstufe Leitidee
  'chuffer.rail-decompose.k-oa-a-3': { de: 'Zahlen und Operationen' }, // Zahlzerlegung = KMK Leitidee „Zahlen und Operationen" (OA calque „algebraisches Denken" is Sek-I)
  'clunks-lost-lunch.make-total.k-oa-a-3': { de: 'Zahlen und Operationen' }, // make-a-total = same KMK Leitidee (mirrors chuffer; OA calque is Sek-I)
  'ten-tank.ten-frame-tank.k-nbt-a-1': { de: 'Zahlen und Operationen' }, // teen numbers as Zehner+Einer (Bündeln) lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'fix-it-corner.missing-part.1-oa-d-8': { de: 'Zahlen und Operationen' }, // missing-number in add/sub = KMK Leitidee „Zahlen und Operationen" (OA calque „algebraisches Denken" is Sek-I; mirrors chuffer/clunks)
};
function effStrand(row: ActivityRow, locale: string): string {
  return (STRAND_OVERRIDE[row.id] && STRAND_OVERRIDE[row.id][locale]) || localizeStrand(row.alignment.strand, locale);
}
import {
  resolveActivitySlug,
  listActivitySitemapEntries,
  hreflangAlternatesForRow,
  listRelatedActivities,
  otherLocalesForRow,
  ActivityRow,
} from '@/lib/activities';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { ActivityIframe } from '@/components/activities/ActivityIframe';
import TopicFaq from '@/components/catalog/TopicFaq';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema, BreadcrumbCrumb } from '@/lib/seo/breadcrumb-schema';
import { localizeStrand } from '@/lib/seo/strand-names';
import { getHreflangCode } from '@/lib/seo/hreflang';
import { getActivityContent, gradeToAgeRange } from '@/lib/seo/activity-content';
import { LOCALE_NAMES, SupportedLocale } from '@/config/locales';
import { ogLocaleMap } from '@/lib/schema-generator';

// Internal-link-mesh strip headings (Part 2). Per-locale nav labels, inlined
// here following the ACTIVITIES_SECTION_LABEL precedent (single-consumer
// chrome). `{code}` in PRACTICE_HEADING is interpolated with the CC code.
const RELATED_HEADING: Record<string, string> = {
  en: 'More activities to try',
  de: 'Weitere Aufgaben zum Ausprobieren',
  es: 'Más actividades para probar',
  fr: 'Plus d\'activités à essayer',
  it: 'Altre attività da provare',
  pt: 'Mais atividades para experimentar',
  nl: 'Meer activiteiten om te proberen',
  sv: 'Fler aktiviteter att prova',
  da: 'Flere aktiviteter at prøve',
  no: 'Flere aktiviteter å prøve',
  fi: 'Lisää tehtäviä kokeiltavaksi',
};

const PRACTICE_HEADING: Record<string, string> = {
  en: 'Practice this standard',
  de: 'Diesen Standard üben',
  es: 'Practica este estándar',
  fr: 'Travailler ce standard',
  it: 'Esercita questo standard',
  pt: 'Pratique este padrão',
  nl: 'Oefen deze standaard',
  sv: 'Öva på denna standard',
  da: 'Øv denne standard',
  no: 'Øv på denne standarden',
  fi: 'Harjoittele tätä standardia',
};

const PRACTICE_LINK: Record<string, string> = {
  en: 'See all {code} activities',
  de: 'Alle {code}-Aufgaben ansehen',
  es: 'Ver todas las actividades de {code}',
  fr: 'Voir toutes les activités {code}',
  it: 'Vedi tutte le attività {code}',
  pt: 'Ver todas as atividades de {code}',
  nl: 'Bekijk alle {code}-activiteiten',
  sv: 'Se alla {code}-aktiviteter',
  da: 'Se alle {code}-aktiviteter',
  no: 'Se alle {code}-aktiviteter',
  fi: 'Katso kaikki {code}-tehtävät',
};

const OTHER_LANGS_HEADING: Record<string, string> = {
  en: 'Available in other languages',
  de: 'In anderen Sprachen verfügbar',
  es: 'Disponible en otros idiomas',
  fr: 'Disponible dans d\'autres langues',
  it: 'Disponibile in altre lingue',
  pt: 'Disponível em outros idiomas',
  nl: 'Beschikbaar in andere talen',
  sv: 'Tillgängligt på andra språk',
  da: 'Tilgængelig på andre sprog',
  no: 'Tilgjengelig på andre språk',
  fi: 'Saatavilla muilla kielillä',
};

// "Activities" section label per locale — used for the middle breadcrumb
// crumb on individual activity landing pages. Same string as the title of
// /<locale>/activities/. Inlined here (not next-intl) since it's read by
// one consumer; promote to a message file when a second consumer appears.
const ACTIVITIES_SECTION_LABEL: Record<string, string> = {
  en: 'Activities',
  de: 'Aufgaben',
  es: 'Actividades',
  fr: 'Activités',
  it: 'Attività',
  pt: 'Atividades',
  nl: 'Activiteiten',
  sv: 'Aktiviteter',
  da: 'Aktiviteter',
  no: 'Aktiviteter',
  fi: 'Tehtävät',
};

/**
 * Activity landing page route — one URL per (manifest row × locale).
 *
 * Mirrors the topic-page pattern:
 *   - ISR with revalidate=3600
 *   - generateStaticParams for build-time static generation
 *   - generateMetadata for per-locale title/description/hreflang
 *   - SSR'd content + iframe-embedded mini-tool
 *
 * Common Core code is metadata only — never in the URL slug (native-language
 * slugs across all 11 locales per CLAUDE.md §17.4), never visible to kids.
 * Surfaced in a subtle "Grade K · Counting & Cardinality · K.CC.B.4" chip
 * on the landing page (teacher-facing) and in JSON-LD educationalAlignment
 * for SEO / structured-data search.
 */
export const revalidate = 3600;

// SEO URLs go through `canonicalUrl()` / `localePath()` from `@/lib/seo/url`
// to enforce the no-trailing-slash invariant. `BASE_URL` retained as alias
// of `CANONICAL_HOST` for the activity-sitemap-entries helper which builds
// hreflang URLs from a base argument.
const BASE_URL = CANONICAL_HOST;

interface PageParams {
  locale: string;
  slug: string;
}

function isTopicLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const entries = await listActivitySitemapEntries();
    return entries.map(({ locale, slug }) => ({ locale, slug }));
  } catch (err) {
    console.warn('[activities/[slug]] generateStaticParams failed:', (err as Error).message);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  if (!isTopicLocale(params.locale)) return {};
  const row = await resolveActivitySlug(params.slug, params.locale);
  if (!row) return {};
  const canonical = canonicalUrl(localePath(params.locale, 'activities', params.slug));
  return {
    title: row.page_title[params.locale],
    description: row.page_intro[params.locale],
    alternates: {
      canonical,
      languages: await hreflangAlternatesForRow(row, BASE_URL),
    },
    openGraph: {
      title: row.page_title[params.locale],
      description: row.page_intro[params.locale],
      url: canonical,
      siteName: 'LessonCraftStudio',
      // og:locale / og:locale:alternate kept consistent with the hreflang set:
      // the alternates mirror otherLocalesForRow (the same honest-filtered sibling
      // locales emitted by hreflangAlternatesForRow), mapped to OG locale codes.
      locale: ogLocaleMap[params.locale] || params.locale,
      alternateLocale: (await otherLocalesForRow(row, params.locale)).map(
        ({ locale }) => ogLocaleMap[locale] || locale,
      ),
      type: 'article',
      images: [
        {
          url: `${CANONICAL_HOST}/og-homepage.png`,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: row.page_title[params.locale],
      description: row.page_intro[params.locale],
      images: [{ url: `${CANONICAL_HOST}/og-homepage.png`, alt: 'LessonCraftStudio — K-3 worksheets in 11 languages' }],
    },
    robots: INDEXABLE_ROBOTS,
  };
}

// Per-locale curriculum-framework NAME for the human-/crawler-facing
// `educationalFramework`. The internal CCSS code (row.alignment.code) stays the
// machine anchor in `targetName` + the /standards/<code> hub. EN keeps Common
// Core; non-EN cite each country's national framework (§A.13.49). Names only —
// no national code (operator decision 2026-05-31).
const EDUCATIONAL_FRAMEWORK_BY_LOCALE: Record<string, string> = {
  en: 'Common Core State Standards',
  de: 'Lehrplan',
  fr: 'Programmes officiels',
  es: 'Planes y programas de estudio (SEP)',
  pt: 'BNCC',
  it: 'Indicazioni nazionali',
  nl: 'SLO-kerndoelen',
  sv: 'Lgr22',
  da: 'Fælles Mål',
  no: 'LK20',
  fi: 'OPS 2014',
};

function jsonLdFor(row: ActivityRow, locale: string): string {
  const canonical = canonicalUrl(localePath(locale, 'activities', row.slug[locale]));
  const grade = effGrade(row, locale);
  const ageRange = gradeToAgeRange(grade);
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: row.page_title[locale],
    description: row.page_intro[locale],
    inLanguage: locale,
    learningResourceType: 'Interactive activity',
    educationalUse: 'interactive activity',
    educationalLevel: grade,
    teaches: effStrand(row, locale),
    isAccessibleForFree: true,
    image: `${CANONICAL_HOST}/og-homepage.png`,
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: row.alignment.code,
      targetDescription: effStrand(row, locale),
      educationalFramework: EDUCATIONAL_FRAMEWORK_BY_LOCALE[locale] || 'Common Core State Standards',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    creator: {
      '@type': 'Organization',
      name: 'LessonCraftStudio',
      url: CANONICAL_HOST,
    },
    url: canonical,
  };
  if (ageRange) data.typicalAgeRange = ageRange;
  return JSON.stringify(data);
}

export default async function ActivityPage({ params }: { params: PageParams }) {
  if (!isTopicLocale(params.locale)) notFound();
  const row = await resolveActivitySlug(params.slug, params.locale);
  if (!row) notFound();

  /* Teacher-chip grade label: reuse the existing seo.educational_level.*
     table (complete in all 11 locales). The manifest's alignment.grade is
     a literal "K"/"1"/"2"/"3"; lookup the localized phrase via the map.
     The CC code (RF.K.2.B and siblings) stays English — it's a CCSS
     identifier; the strand NAME is localized via localizeStrand (below,
     §A.13.56 / curriculum-domain fix). */
  const tSeo = await getTranslations({ locale: params.locale, namespace: 'seo' });
  const effectiveGrade = effGrade(row, params.locale);
  const gradeKey = GRADE_KEY_MAP[effectiveGrade];
  const localizedGrade = gradeKey
    ? tSeo(`educational_level.${gradeKey}`)
    : `Grade ${effectiveGrade}`;

  // v7.5 cache buster: bump on any mini tools/*-activity.html change so
  // browsers fetch fresh wrapper HTML on every navigation. Defends
  // against iOS Safari + Android WebView page-cache/bfcache quirks that
  // can ignore upstream Cache-Control: max-age=0 under back-forward
  // restoration. Same discipline as §A.13.42 lcs-shell.css?v=N bump
  // applied here to the iframe-loaded wrapper URL (the only un-busted
  // link in the activity-page → mini-tool chain). The wrapper reads
  // only `activity` / `lang` / `embed` params; `v` is harmless to it.
  const ACTIVITY_WRAPPER_VERSION = '9.170';

  const iframeSrc =
    `/mini-tools/${row.tool}.html?v=${ACTIVITY_WRAPPER_VERSION}` +
    `&activity=${encodeURIComponent(row.id)}` +
    `&lang=${encodeURIComponent(params.locale)}` +
    `&embed=1`;

  const sectionLabel =
    ACTIVITIES_SECTION_LABEL[params.locale] ?? ACTIVITIES_SECTION_LABEL.en;

  // Crawlable editorial body (3-tier resolve, mirrors topic-prose). Returns
  // null for locales without an activity-content file (non-EN until Part 3),
  // in which case the page keeps its intro-only shape — never English prose
  // on a non-EN page.
  const content = await getActivityContent(params.locale, row);

  // Internal-link mesh (Part 2) — ships for all 11 locales (navigation).
  const related = await listRelatedActivities(row, params.locale);
  const otherLangs = await otherLocalesForRow(row, params.locale);
  const standardsHref = localePath(params.locale, 'standards', row.alignment.code);
  const relatedHeading = RELATED_HEADING[params.locale] ?? RELATED_HEADING.en;
  // Localized CCSS strand name (R4 / §20.8) — the raw English domain name
  // (e.g. "Counting & Cardinality") was leaking into the chip + FAQ on non-EN
  // pages. Feeds the visible chip + TopicFaq (FAQPage JSON-LD) below.
  const localizedStrand = effStrand(row, params.locale);

  // BreadcrumbList JSON-LD (R12) — mirrors the visible BreadcrumbTrail
  // (Home › Activities › title).
  const tBreadcrumb = await getTranslations({ locale: params.locale, namespace: 'topicPage.breadcrumb' });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(params.locale) },
    { name: sectionLabel, path: localePath(params.locale, 'activities') },
    { name: row.page_title[params.locale], path: localePath(params.locale, 'activities', params.slug) },
  ] as BreadcrumbCrumb[]);
  const practiceHeading = PRACTICE_HEADING[params.locale] ?? PRACTICE_HEADING.en;
  const practiceLink = (PRACTICE_LINK[params.locale] ?? PRACTICE_LINK.en).replace(
    '{code}',
    row.alignment.code,
  );
  const otherLangsHeading =
    OTHER_LANGS_HEADING[params.locale] ?? OTHER_LANGS_HEADING.en;

  // v7 cascade (post-K.NBT.A.1 prototype approval): all activities render
  // the operator-locked sage-field layout. The v6.x prototype gate
  // (`isTenFramePrototype` check on alignment.code) was removed once the
  // design was approved. Card height = 2/3 of viewport via the inline
  // <style> below + the iframe-side rules now in lcs-shell.css scoped to
  // .lcs-app.activity. Engine-specific cell/tile scaling stays per-wrapper.
  return (
    <main className="bg-cream-50 pt-4 pb-4 px-4 md:pt-6 md:pb-6 md:px-8 lg:pt-8">
      <article className="mx-auto">
        <BreadcrumbTrail
          locale={params.locale}
          trail={[
            { href: `/${params.locale}/activities/`, label: sectionLabel },
            { label: row.page_title[params.locale] },
          ]}
        />
        <section
          className="lcs-prototype-play-area relative overflow-hidden mt-3 md:mt-4 rounded-2xl md:rounded-3xl bg-[#DBE7DF] px-4 pt-5 pb-12 md:px-8 md:pt-7 md:pb-16 shadow-[0_2px_8px_rgba(20,30,28,0.08),_0_28px_64px_rgba(20,30,28,0.12)]"
          aria-label={row.page_title[params.locale]}
        >
          {/* Adult chrome — tightened, sits ON the sage field. Header
              feels integrated with the play area rather than stacked
              above it. */}
          <header className="relative z-10 mb-4 md:mb-5 text-center">
            <h1 className="font-display font-semibold text-base md:text-lg text-teal-800 leading-tight mb-0.5">
              {row.page_title[params.locale]}
            </h1>
            <p className="hidden lg:block text-xs text-ink-600/70 max-w-2xl mx-auto leading-snug mb-2">
              {row.page_intro[params.locale]}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cream-100/80 text-teal-800 text-xs font-medium backdrop-blur-sm">
              <span>{localizedGrade}</span>
              <span className="text-teal-800/40">·</span>
              <span className="hidden sm:inline">{localizedStrand}</span>
              <span className="hidden sm:inline text-teal-800/40">·</span>
              {/* Code is clickable: navigates to the per-standard landing
                  page (/[locale]/standards/<code>) which aggregates every
                  activity aligned to this code. Internal-linking surface
                  per external SEO audit 2026-05-27. */}
              <Link
                href={`/${params.locale}/standards/${row.alignment.code}`}
                className="font-mono underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                {row.alignment.code}
              </Link>
            </div>
          </header>

          {/* Desktop keeps the 66.67vh floor (fills the wide card nicely).
              MOBILE FIT (mobile-QA standard §A.13.55, 2026-06-02): the old
              85vh mobile floor forced the iframe far taller than short
              activities, leaving a big blank band below the card (audit
              emptyBand 150-264px on phones). Lower to a small px floor so
              ActivityIframe's postMessage auto-resize (§20.3) sizes the
              iframe to the card's real content height; pairs with
              lcs-shell.css dropping the card's mobile min-height. */}
          <style dangerouslySetInnerHTML={{ __html:
            '.lcs-prototype-iframe-wrapper iframe { min-height: 66.67vh !important; }' +
            '@media (max-width: 767px) { .lcs-prototype-iframe-wrapper iframe { min-height: 360px !important; } }'
          }} />
          <div className="lcs-prototype-iframe-wrapper relative z-10">
            <ActivityIframe src={iframeSrc} title={row.page_title[params.locale]} />
          </div>

          {/* Soft cream wave at the base of the field — gentle "foam"
              that gives the field life without becoming a graphic.
              Absolutely positioned over the field's bottom padding;
              pointer-events:none so it never blocks the iframe. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 right-0 w-full h-[60px] md:h-[72px] pointer-events-none"
          >
            <path
              d="M0,50 C200,15 380,75 600,40 C820,5 1000,70 1200,35 L1200,80 L0,80 Z"
              fill="#FCFAF4"
              opacity="0.62"
            />
            <path
              d="M0,60 C220,30 420,80 640,52 C860,24 1040,76 1200,50 L1200,80 L0,80 Z"
              fill="#FCFAF4"
              opacity="0.45"
            />
          </svg>
        </section>

        {/* Crawlable editorial body below the play surface. The interactive
            engine lives in an iframe (invisible to crawlers), so this SSR'd
            prose is the activity's SEO surface: an always-rendered intro
            paragraph, then the 3-tier content sections (when available for
            the locale), then a 3-item FAQ with FAQPage JSON-LD. */}
        <section className="activity-detail mx-auto max-w-2xl mt-8 px-1">
          <p className="text-base text-ink-700 leading-relaxed">
            {row.page_intro[params.locale]}
          </p>

          {content && (
            <div className="mt-8 space-y-8">
              {content.proseParagraphs.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.about}
                  </h2>
                  {content.proseParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-base text-ink-700 leading-relaxed'
                          : 'text-base text-ink-700 leading-relaxed mt-3'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {content.whatsInside.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.whatsInside}
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-base text-ink-700 leading-relaxed">
                    {content.whatsInside.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </div>
              )}

              {content.howToPlay.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.howToPlay}
                  </h2>
                  {content.howToPlay.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-base text-ink-700 leading-relaxed'
                          : 'text-base text-ink-700 leading-relaxed mt-2'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {content.practices.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.practices}
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-base text-ink-700 leading-relaxed">
                    {content.practices.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </div>
              )}

              {content.learningGoals.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.learningGoals}
                  </h2>
                  {content.learningGoals.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-base text-ink-700 leading-relaxed'
                          : 'text-base text-ink-700 leading-relaxed mt-2'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
        <div className="mx-auto max-w-2xl px-1">
          <TopicFaq
            locale={params.locale}
            variant="activity"
            title={row.page_title[params.locale]}
            grade={localizedGrade}
            strand={localizedStrand}
            pageUrl={canonicalUrl(localePath(params.locale, 'activities', params.slug))}
          />
        </div>

        {/* Internal-link mesh (Part 2) — crawlable <a> lists tying every
            activity to its siblings, its Common Core standard hub, and its
            own translations. Real anchors (not JS buttons) so they feed the
            internal link graph. Ships for all 11 locales. */}
        <div className="mx-auto max-w-2xl px-1 mt-10 space-y-10">
          {/* Practice this standard — explicit crawl-bait anchor to the hub. */}
          <section aria-labelledby="activity-practice-heading">
            <h2
              id="activity-practice-heading"
              className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3"
            >
              {practiceHeading}
            </h2>
            <Link
              href={standardsHref}
              className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 font-semibold underline decoration-2 underline-offset-2"
            >
              {practiceLink}
              <span aria-hidden="true">→</span>
            </Link>
          </section>

          {/* Related activities — same strand, then same grade. */}
          {related.length > 0 && (
            <section aria-labelledby="activity-related-heading">
              <h2
                id="activity-related-heading"
                className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-4"
              >
                {relatedHeading}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) => {
                  const rTitle = r.page_title[params.locale];
                  const rSlug = r.slug[params.locale];
                  if (!rTitle || !rSlug) return null;
                  return (
                    <li key={r.id}>
                      <Link
                        href={localePath(params.locale, 'activities', rSlug)}
                        className="flex items-center gap-2 rounded-2xl bg-cream-50 hover:bg-teal-50 px-4 py-3 text-teal-800 font-medium shadow-sm transition-colors"
                      >
                        <span className="font-mono text-xs text-teal-500">
                          {r.alignment.code}
                        </span>
                        <span>{rTitle}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Available in other languages — visible hreflang siblings. */}
          {otherLangs.length > 0 && (
            <section aria-labelledby="activity-langs-heading">
              <h2
                id="activity-langs-heading"
                className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3"
              >
                {otherLangsHeading}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {otherLangs.map(({ locale, href }) => (
                  <li key={locale}>
                    <a
                      href={href}
                      hrefLang={getHreflangCode(locale)}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-cream-50 hover:bg-teal-50 text-teal-800 text-sm transition-colors"
                    >
                      {LOCALE_NAMES[locale as SupportedLocale] ?? locale}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* LearningResource structured data — plain <script> so it is present
            in the server-rendered HTML (crawlable without JS execution),
            unlike next/script's afterInteractive injection. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdFor(row, params.locale) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </article>
    </main>
  );
}
