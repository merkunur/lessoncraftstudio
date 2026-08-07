#!/usr/bin/env node
/* =====================================================================
   apply-say-it-panel-tier3.js — the teacher-facing chrome.
   ---------------------------------------------------------------------
   The last of what the panels filed. Two threads run through all of it:

   1 · ⭐ ADDRESS THE TEACHER CONSISTENTLY. German and French both
       addressed her as BOTH `du/tu` and `Sie/vous` inside one panel —
       `printBack` siezt the parent while `deskHint` duzt the teacher
       three lines away. The German panel checked the sibling lexicon and
       settled it: teacher-facing is `Sie` (`name-sticks` ships
       "Legen Sie zuerst … eine Klasse an"). French follows.

   2 · ⭐⭐ "IN THE CHILD'S VOICE" IS A DANGEROUS PHRASE ON THIS TOOL.
       Three panels flagged it independently — Dutch (*in de stem van*),
       Finnish (*lapsen äänellä*), Swedish (*med barnets röst*). The
       board's REFUSES list bans recording a child's voice, and this
       string sits in the surface where a teacher types. It reads as an
       instruction to record. It also happens to be factually wrong: she
       writes in the CLASSROOM language, which is by definition not the
       child's own. "In the child's words" is what was meant.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const P = path.join(__dirname, '_home-language-bridge-strings.js');
const DRY = process.argv.indexOf('--dry-run') >= 0;
let s = fs.readFileSync(P, 'utf8');

const FIX = [
  /* ── "in the child's voice" → "in the child's words" ────────────── */
  ["en:'Pick an opening, then finish it in the child’s own voice. The board always speaks as the child.'",
   "en:'Pick an opening, then finish it in the child’s own words. The board always speaks as the child.'"],
  ["de:'Wähle einen Anfang und vervollständige ihn aus der Sicht des Kindes. Die Tafel spricht immer als das Kind.'",
   "de:'Wählen Sie einen Anfang und vervollständigen Sie ihn mit den Worten des Kindes. Die Tafel spricht immer als das Kind.'"],
  ["fr:'Choisis un début, puis complète-le à la voix de l’enfant. Le tableau parle toujours comme l’enfant.'",
   "fr:'Choisissez un début, puis complétez-le avec les mots de l’enfant. Le tableau parle toujours comme l’enfant.'"],
  ["nl:'Kies een begin en maak het af in de stem van het kind. Het bord spreekt altijd als het kind.'",
   "nl:'Kies een begin en maak het af in de woorden van het kind. Het bord spreekt altijd als het kind.'"],
  ["fi:'Valitse aloitus ja täydennä se lapsen äänellä. Taulu puhuu aina lapsena.'",
   "fi:'Valitse aloitus ja täydennä se lapsen omin sanoin. Taulu puhuu aina lapsen suulla.'"],
  ["sv:'Välj en början och avsluta den med barnets röst. Tavlan talar alltid som barnet.'",
   "sv:'Välj en början och skriv klart meningen med barnets egna ord. Tavlan talar alltid som barnet.'"],
  ["da:'Vælg en begyndelse, og gør den færdig med barnets stemme. Tavlen taler altid som barnet.'",
   "da:'Vælg en begyndelse, og gør den færdig med barnets egne ord. Tavlen taler altid som barnet.'"],
  ["no:'Velg en begynnelse og fullfør den med barnets stemme. Tavla snakker alltid som barnet.'",
   "no:'Velg en begynnelse og fullfør den med barnets egne ord. Tavla snakker alltid som barnet.'"],

  /* ── GERMAN: teacher-facing chrome takes Sie ────────────────────── */
  ["de:'Wähle zuerst einen Anfang.'", "de:'Wählen Sie zuerst einen Anfang.'"],
  ["de:'Vervollständige den Satz.'", "de:'Vervollständigen Sie den Satz.'"],
  ["de:'Wähle ein Bild. Das Kind, das dies braucht, kann die Wörter nicht lesen.'",
   "de:'Wählen Sie ein Bild. Das Kind, das sie braucht, kann diese Wörter nicht lesen.'"],
  ["de:'Wähle eine Gruppe dafür.'", "de:'Wählen Sie eine Gruppe dafür.'"],
  ["de:'Diese Gruppe enthält schon {n} deiner Sätze.'", "de:'Diese Gruppe enthält schon {n} Ihrer Sätze.'"],
  ["de:'Du hast {n} Sätze behalten. Entferne einen, um einen weiteren hinzuzufügen.'",
   "de:'Sie haben {n} Sätze behalten. Entfernen Sie einen, um einen weiteren hinzuzufügen.'"],
  ["de:'Nur eintragen, wenn jemand, der die Sprache spricht, es für dich geschrieben hat. Hier wird nichts maschinell übersetzt.'",
   "de:'Nur eintragen, wenn jemand, der die Sprache spricht, es für Sie aufgeschrieben hat. Hier wird nichts maschinell übersetzt.'"],
  ["de:'Über das Kind wird nichts gemessen oder irgendwohin gesendet. Deine Einstellungen bleiben auf diesem Gerät.'",
   "de:'Über das Kind wird nichts gemessen und nichts weitergegeben. Ihre Einstellungen bleiben auf diesem Gerät.'"],
  ["de:'Nur wenn sie dabei ist — die Bilder funktionieren in jeder Sprache.'",
   "de:'Nur wenn sie in der Liste steht — die Bilder helfen in jeder Sprache.'"],
  ["de:'Kärtchen für das Band'", "de:'Kärtchen fürs Schlüsselband'"],
  ["de:'Das Wandposter und der Elternbogen gehören zum Lehrer-Paket. Die Kärtchen für das Band sind immer kostenlos.'",
   "de:'Das Wandposter und der Bogen für die Familie gehören zum Lehrer-Paket. Die Kärtchen fürs Schlüsselband sind immer kostenlos.'"],

  /* ── FRENCH: teacher-facing chrome takes vous ────────────────────── */
  ["fr:'Choisis d’abord un début.'", "fr:'Choisissez d’abord un début.'"],
  ["fr:'Termine la phrase.'", "fr:'Complétez la phrase.'"],
  ["fr:'Choisis un groupe.'", "fr:'Choisissez un groupe.'"],
  ["fr:'Cartes pour un cordon'", "fr:'Cartes à porter au cou'"],
  ["fr:'L’affiche murale et la feuille pour la famille font partie de l’offre Enseignant. Les cartes de cordon sont toujours gratuites.'",
   "fr:'L’affiche murale et la feuille pour la famille font partie de l’offre Enseignant. Les cartes à porter au cou sont toujours gratuites.'"],

  /* ── ITALIAN / DUTCH / SPANISH lanyard + last register items ────── */
  ["it:'Cartellini da collo'", "it:'Cartellini con il laccetto'"],
  ["it:'Il poster da parete e il foglio per la famiglia fanno parte del piano Insegnante. I cartellini da collo sono sempre gratuiti.'",
   "it:'Il poster da parete e il foglio per la famiglia fanno parte del piano Insegnante. I cartellini con il laccetto sono sempre gratuiti.'"],
  ["nl:'Kaartjes voor een koord'", "nl:'Kaartjes aan een koord'"],
  ["nl:'De wandposter en het gezinsblad horen bij het Leerkracht-pakket. De koordkaartjes zijn altijd gratis.'",
   "nl:'De wandposter en het blad voor thuis horen bij het Leerkracht-pakket. De kaartjes aan het koord zijn altijd gratis.'"],
  ["nl:'Blad voor het gezin'", "nl:'Blad voor thuis'"],
  ["nl:'Poster voor de muur'", "nl:'Poster voor aan de muur'"],
  ["es:'Tarjetas para el cordón'", "es:'Tarjetas para el cordón'"],
  ["es:'El póster de pared y la hoja para la familia son parte del plan Docente. Las tarjetas de cordón siempre son gratis.'",
   "es:'El póster para la pared y la hoja para la familia son parte del plan Docente. Las tarjetas para el cordón son gratis siempre.'"],
  ["es:'Póster para la pared'", "es:'Póster para la pared'"],
];

let applied = 0;
const missed = [];
FIX.forEach(([a, b]) => {
  if (a === b) { applied++; return; }
  if (s.indexOf(a) >= 0) { s = s.replace(a, b); applied++; }
  else missed.push(a);
});

if (!DRY) fs.writeFileSync(P, s, 'utf8');
console.log(`  applied ${applied}/${FIX.length} tier-3 corrections${DRY ? ' (dry run)' : ''}`);
if (missed.length) {
  console.error(`\n  ${missed.length} needle(s) did not match:`);
  missed.forEach((m) => console.error('    ' + m.slice(0, 90)));
  process.exit(1);
}
