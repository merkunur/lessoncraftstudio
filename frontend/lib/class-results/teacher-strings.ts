/**
 * The teacher screen's words (frontend/messages/classes/<locale>.json), bundled: the Classes page hands the one
 * language it needs to the screen (lib/class-results/teacher-app.ts). Gate: scripts/class-results/tests/strings.js.
 */
import en from '@/messages/classes/en.json';
import de from '@/messages/classes/de.json';
import fr from '@/messages/classes/fr.json';
import es from '@/messages/classes/es.json';
import pt from '@/messages/classes/pt.json';
import it from '@/messages/classes/it.json';
import nl from '@/messages/classes/nl.json';
import sv from '@/messages/classes/sv.json';
import da from '@/messages/classes/da.json';
import no from '@/messages/classes/no.json';
import fi from '@/messages/classes/fi.json';

export const TEACHER_STRINGS: Record<string, Record<string, string>> = { en, de, fr, es, pt, it, nl, sv, da, no, fi };
