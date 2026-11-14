/**
 * Class links and results — the RULES (Daily Teaching System, Part 9 release 1; docs/daily-teaching-system/PART-9-DESIGN.md).
 *
 * A subscriber makes a class (seats = a first name or nickname + a picture, or numbers only), assigns it interactive
 * pages and shows one class link. A child opens the link, taps their seat and plays; the page reports what the child
 * got right on the FIRST Check. The teacher reads the results by child and, for a Level Set, by level.
 *
 * Like lib/makers/store.ts this module is a pure function of (db, caller, request): no Next, no Prisma, no Node
 * module. The website runs it through Prisma (./db.ts, the /api/classes/* and /api/class/* routes); the gate
 * scripts/class-results/tests/class-store.test.js runs it over an in-memory database.
 *
 * TEACHER routes (the caller must be signed in; making and assigning need a usable subscription, reading and
 * deleting never do — a teacher whose plan lapsed can always look at and remove what is stored):
 *   GET    /api/classes                         → { items }
 *   POST   /api/classes            { name, namesMode, locale, names?|count? } → 201 { id, code }
 *   GET    /api/classes/<id>                    → { class, seats, assignments }
 *   PATCH  /api/classes/<id>       { name?, namesMode?, locale?, newCode? }
 *   DELETE /api/classes/<id>                    (the class, its seats, assignments and every result)
 *   POST   /api/classes/<id>/seats { names?|count? }
 *   PATCH  /api/classes/<id>/seats/<seatId>     { displayName?, icon? }
 *   DELETE /api/classes/<id>/seats/<seatId>     (the child and their results)  ?results=1 → the results only
 *   POST   /api/classes/<id>/assignments        { link }
 *   PATCH  /api/classes/<id>/assignments/<aid>  { closed }
 *   DELETE /api/classes/<id>/assignments/<aid>
 *   GET    /api/classes/<id>/results            → the dashboard matrix
 *
 * CHILD routes (public: the class code is the key; nothing a child does needs an account):
 *   GET  /api/class/<code>                      → the class page (seats, assignments)
 *   GET  /api/class/<code>/seat/<seatId>        → that child's assignments with their state
 *   POST /api/class/start   { code, seatId, assignmentId } → { url }   (url ends in #lcs=<token>)
 *   POST /api/class/report  { token, right?, total?, items?, finished? } → { next? | done }
 *
 * What is stored about a child: the display name the teacher typed (or nothing, in a numbers-only class) and the
 * results. Nothing else exists to store: no field for it.
 */

export const CLASSES_PER_TEACHER = 20;
export const SEATS_PER_CLASS = 40;
export const ASSIGNMENTS_PER_CLASS = 60;
export const ATTEMPTS_PER_SEAT_AND_ASSIGNMENT = 80;
export const CLASS_NAME_MAX = 60;
export const SEAT_NAME_MAX = 24;
export const MAX_ITEMS = 200;
/** pages of one Level Set a child plays in one sitting, then the class page says "done for now" */
export const SITTING_PAGES = 3;
export const SITTING_HOURS = 6;
/** an unreported attempt is handed out again instead of minting another (a reload, a second tap) */
export const REUSE_OPEN_ATTEMPT_HOURS = 12;
/** retention (scripts/class-results/retention.js): operator ruling 2026-11-11 */
export const RETENTION_UNUSED_DAYS = 427; // 14 months
export const RETENTION_AFTER_SUBSCRIPTION_DAYS = 60;

export const CODE_ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789'; // = lib/makers/store.ts LINK_ALPHABET (no l, o, 0, 1)
export const CODE_RE = /^[a-z2-9]{10}$/;
export const TOKEN_RE = /^[a-z2-9]{20}$/;
export const ID_RE = /^[a-z0-9]{8,40}$/i;
export const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'] as const;
export const NAMES_MODES = ['names', 'numbers'] as const;
export type NamesMode = (typeof NAMES_MODES)[number];
export type Level = 'easy' | 'core' | 'hard';
export const LEVELS: readonly Level[] = ['easy', 'core', 'hard'];

/**
 * The 40 seat pictures, in seat order: colour library animals a child can tell apart at a glance. Each key is
 * `<theme folder>/<file stem>` under /image-library-webp/themes/. Every picture was opened and checked beside the
 * others (scripts/class-results/seat-icons-sheet.js builds the contact sheet; read 2026-11-11). Left out on that read:
 * tiger (too like the cat), fox and squirrel (orange, pointed ears, like the cat), shark (too like the dolphin) and
 * flamingo (its file has a white box behind it). A new picture enters only after the sheet has been read again.
 */
export const SEAT_ICONS: readonly string[] = [
  'animals/cat', 'animals/dog', 'animals/elephant', 'animals/giraffe', 'animals/zebra', 'forest creatures/frog', 'animals/panda', 'animals/koala',
  'animals/penguin', 'animals/owl', 'forest creatures/eagle', 'animals/rabbit', 'animals/pig', 'animals/sheep', 'animals/horse', 'animals/duck',
  'animals/turtle', 'animals/dolphin', 'animals/whale', 'animals/camel', 'animals/hippopotamus', 'animals/fish', 'farm animals/cow', 'farm animals/hen',
  'farm animals/goat', 'farm animals/rooster', 'farm animals/bee', 'forest creatures/bear', 'birds/peacock', 'forest creatures/hedgehog',
  'forest creatures/butterfly', 'forest creatures/ladybug', 'forest creatures/snail', 'forest creatures/deer', 'ocean life/octopus', 'ocean life/crab',
  'ocean life/starfish', 'ocean life/sea_horse', 'forest creatures/caterpillar', 'birds/parrot',
];

export type AssignmentContent =
  | { kind: 'deck'; locale: string; slug: string }
  | { kind: 'ladder'; locale: string; code: string; levels: Record<Level, string[]> }
  | { kind: 'maker'; linkId: string }
  /** release 2: an activity (/<locale>/activities/<slug>); `activity` is its id in the manifests */
  | { kind: 'activity'; locale: string; slug: string; activity: string };
export type AssignmentKind = AssignmentContent['kind'];

export interface ClassRow {
  id: string;
  teacherId: string;
  name: string;
  code: string;
  namesMode: NamesMode;
  locale: string;
  lastUsedAt: Date | string;
  createdAt: Date | string;
}
export interface SeatRow {
  id: string;
  classId: string;
  seatNo: number;
  displayName: string | null;
  icon: string;
}
export interface AssignmentRow {
  id: string;
  classId: string;
  kind: AssignmentKind;
  title: string;
  content: AssignmentContent;
  position: number;
  closedAt: Date | string | null;
  createdAt: Date | string;
}
export interface AttemptRow {
  id: string;
  token: string;
  assignmentId: string;
  seatId: string;
  pageRef: string;
  level: Level | null;
  right: number | null;
  total: number | null;
  items: number[] | null;
  checks: number;
  finished: boolean;
  createdAt: Date | string;
  reportedAt: Date | string | null;
}
export interface ClassListItem {
  id: string;
  name: string;
  code: string;
  namesMode: NamesMode;
  locale: string;
  seats: number;
  assignments: number;
  lastUsedAt: string;
}

/** The database the rules run over: the Prisma (./db.ts) and the in-memory (tests) implementations. */
export interface ClassDb {
  listClasses(teacherId: string): Promise<ClassListItem[]>;
  countClasses(teacherId: string): Promise<number>;
  createClass(teacherId: string, c: { name: string; code: string; namesMode: NamesMode; locale: string }): Promise<ClassRow>;
  getClass(id: string): Promise<ClassRow | null>;
  /** the class behind a link with whether its teacher may use paid features NOW (isSubscriptionUsable) */
  getClassByCode(code: string): Promise<{ cls: ClassRow; teacherUsable: boolean } | null>;
  updateClass(id: string, patch: Partial<Pick<ClassRow, 'name' | 'code' | 'namesMode' | 'locale'>>): Promise<void>;
  /** stamps lastUsedAt = now (the retention clock) */
  touchClass(id: string, now: Date): Promise<void>;
  deleteClass(id: string): Promise<void>;

  listSeats(classId: string): Promise<SeatRow[]>;
  getSeat(id: string): Promise<SeatRow | null>;
  createSeats(classId: string, seats: Array<{ seatNo: number; displayName: string | null; icon: string }>): Promise<void>;
  updateSeat(id: string, patch: { displayName?: string | null; icon?: string }): Promise<void>;
  /** every seat's name → null (a class switched to numbers only) */
  clearSeatNames(classId: string): Promise<void>;
  deleteSeat(id: string): Promise<void>;
  deleteAttemptsOfSeat(seatId: string): Promise<void>;

  listAssignments(classId: string): Promise<AssignmentRow[]>;
  getAssignment(id: string): Promise<AssignmentRow | null>;
  createAssignment(classId: string, a: { kind: AssignmentKind; title: string; content: AssignmentContent; position: number }): Promise<AssignmentRow>;
  updateAssignment(id: string, patch: { closedAt?: Date | null }): Promise<void>;
  deleteAssignment(id: string): Promise<void>;

  listAttemptsOfClass(classId: string): Promise<AttemptRow[]>;
  /** one child's attempts at one assignment, oldest first */
  listAttempts(assignmentId: string, seatId: string): Promise<AttemptRow[]>;
  createAttempt(a: { token: string; assignmentId: string; seatId: string; pageRef: string; level: Level | null }): Promise<AttemptRow>;
  getAttempt(token: string): Promise<AttemptRow | null>;
  saveReport(id: string, patch: Partial<Pick<AttemptRow, 'right' | 'total' | 'items' | 'checks' | 'finished'>> & { reportedAt?: Date }): Promise<void>;

  /** the catalogue, read side: what a pasted link points at */
  resolveDeck(locale: string, slug: string): Promise<{ slug: string; title: string; interactive: boolean } | null>;
  /** a Level Set by its code: the pages that have a screen version, per level, in copy order */
  resolveLadder(locale: string, code: string): Promise<{ code: string; title: string; levels: Record<Level, string[]> } | null>;
  /** a worksheet landing page → the deck it presents */
  resolveLanding(locale: string, landingSlug: string): Promise<{ slug: string } | null>;
  /** a deck share link (/play/<id>) → its deck */
  resolvePlayLink(linkId: string): Promise<{ locale: string; slug: string } | null>;
  /** a maker student link, only when it is this teacher's own and live */
  resolveMakerLink(linkId: string, teacherId: string): Promise<{ linkId: string; title: string } | null>;
  /** an activity page of this language that is live (release 2) */
  resolveActivity(locale: string, slug: string): Promise<{ id: string; slug: string; title: string } | null>;
}

export interface Reply { status: number; body: unknown }
/** who is calling a teacher route: a signed-in user and whether their subscription is usable now */
/** `names`: may this teacher keep children's FIRST NAMES? (legal decision of 2026-11-14, condition E1.) Absent or
 *  false = numbers only, and the rules below refuse a name whatever the request says: a class is made as a numbers
 *  class, cannot be switched to names, and no seat takes a name. It is true only when the server switch
 *  CLASS_NAMES_ENABLED is on AND the teacher holds her own permission (http.ts callerOf). */
export type Caller = { userId: string; usable: boolean; names?: boolean } | null;

const json = (status: number, body: unknown): Reply => ({ status, body });
const NAMES_OFF: Reply = { status: 403, body: { error: 'names_off' } };
const iso = (d: Date | string) => (typeof d === 'string' ? d : d.toISOString());
const ms = (d: Date | string) => (typeof d === 'string' ? Date.parse(d) : d.getTime());
const HOUR = 3600 * 1000;

// ── text ────────────────────────────────────────────────────────────────────────────────────────────────────────────

/** A class name as stored: trimmed, single spaces, no control or markup characters; null when empty or too long. */
export function cleanClassName(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const s = raw.replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim();
  return s.length >= 1 && s.length <= CLASS_NAME_MAX ? s : null;
}

/**
 * A child's display name as stored: a first name or a nickname. Trimmed, single spaces, at most SEAT_NAME_MAX
 * characters and three words (two-word first names are ordinary in Spanish, Portuguese, French and Italian; a third
 * token leaves room for an initial). Refused: empty, digits only, anything with an @ or a markup character — an
 * e-mail address or a pasted roster line is not a first name.
 */
export function cleanSeatName(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const s = raw.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  if (s.length < 1 || s.length > SEAT_NAME_MAX) return null;
  if (/[@<>\\/|;:=]/.test(s) || /^\d+$/.test(s)) return null;
  if (s.split(' ').length > 3) return null;
  return s;
}

/** a pasted list of names (one per line, or comma separated) → the clean names in order, and the lines refused */
export function parseNames(raw: unknown): { names: string[]; refused: string[] } {
  const lines = Array.isArray(raw) ? raw : typeof raw === 'string' ? raw.split(/[\n\r,]+/) : [];
  const names: string[] = [], refused: string[] = [];
  for (const l of lines) {
    if (typeof l !== 'string' || !l.trim()) continue;
    const c = cleanSeatName(l);
    if (c) names.push(c); else refused.push(String(l).trim().slice(0, 40));
  }
  return { names, refused };
}

// ── links a teacher pastes ──────────────────────────────────────────────────────────────────────────────────────────

export type ParsedLink =
  | { kind: 'deck'; locale: string; slug: string }
  | { kind: 'set'; locale: string; code: string }
  | { kind: 'landing'; locale: string; slug: string }
  | { kind: 'maker'; linkId: string }
  | { kind: 'play'; linkId: string }
  | { kind: 'activity'; locale: string; slug: string };

/**
 * What a pasted address points at, by its shape alone (the database decides whether it exists): a deck page, a
 * Level Set, a worksheet landing page, a maker student link or a deck share link. Only this site's addresses; a
 * path without the host is accepted too.
 */
export function parseAssignmentLink(raw: unknown): ParsedLink | null {
  if (typeof raw !== 'string') return null;
  let s = raw.trim();
  if (!s || s.length > 600) return null;
  const host = /^https?:\/\/(?:www\.)?lessoncraftstudio\.com(?=[/?#]|$)/i;
  if (/^https?:\/\//i.test(s)) { if (!host.test(s)) return null; s = s.replace(host, ''); }
  if (!s.startsWith('/')) return null;
  const hash = s.indexOf('#'); if (hash >= 0) s = s.slice(0, hash);
  const q = s.indexOf('?'); const query = q >= 0 ? s.slice(q + 1) : ''; const path = (q >= 0 ? s.slice(0, q) : s).replace(/\/+$/, '');
  const parts = path.split('/').filter(Boolean);
  const loc = (LOCALES as readonly string[]).includes(parts[0]) ? parts[0] : null;
  const slugOk = (x: string | undefined): x is string => !!x && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x) && x.length <= 180;
  if (parts[0] === 's' && parts.length === 2 && /^[a-z2-9]{12}$/.test(parts[1])) return { kind: 'maker', linkId: parts[1] };
  if (parts[0] === 'play' && parts.length === 2 && /^[a-z0-9]{6,20}$/i.test(parts[1])) return { kind: 'play', linkId: parts[1] };
  if (!loc) return null;
  if (parts[1] === 'decks' && parts.length === 3 && slugOk(parts[2])) return { kind: 'deck', locale: loc, slug: parts[2] };
  if (parts[1] === 'activities' && parts.length === 3 && slugOk(parts[2])) return { kind: 'activity', locale: loc, slug: parts[2] };
  if (parts[1] === 'worksheets') {
    const setParam = /(?:^|&)set=((?:k|g\d)\d{3})(?:&|$)/.exec(query);
    if (parts.length === 2 && setParam) return { kind: 'set', locale: loc, code: setParam[1] };
    if (parts.length === 4 && parts[2] === 'sets' && /^(?:k|g\d)\d{3}$/.test(parts[3])) return { kind: 'set', locale: loc, code: parts[3] };
    if (parts.length === 3 && slugOk(parts[2])) return { kind: 'landing', locale: loc, slug: parts[2] };
  }
  return null;
}

/** where a child is sent to play one attempt; the token rides after '#', so it never reaches a server log or a cache key */
export function playUrl(content: AssignmentContent, pageRef: string, token: string): string {
  if (content.kind === 'maker') return `/s/${content.linkId}#lcs=${token}`;
  if (content.kind === 'activity') return `/${content.locale}/activities/${content.slug}#lcs=${token}`;
  return `/${content.locale}/decks/${pageRef}/#lcs=${token}`;
}

// ── the Level Set rule (the same five steps the printed class sheet gives the teacher) ───────────────────────────────

export type Band = 'high' | 'mid' | 'low';

/**
 * How a first Check went. high = almost all right (every answer, or at most one wrong from five answers up, or
 * at least 85 %); low = several wrong (two or more wrong AND under 60 %); mid = everything between.
 * A page that reports no marks (finished only) has no band.
 */
export function bandOf(right: number | null, total: number | null): Band | null {
  if (right == null || total == null || total <= 0) return null;
  const wrong = total - right;
  if (wrong <= 0) return 'high';
  if ((total >= 5 && wrong <= 1) || right / total >= 0.85) return 'high';
  if (wrong >= 2 && right / total < 0.6) return 'low';
  return 'mid';
}

export type LadderStep =
  | { page: { level: Level; slug: string } }
  | { done: 'mastered' | 'rest' | 'empty' };

const reported = (h: AttemptRow[]) => h.filter((a) => a.reportedAt).sort((a, b) => ms(a.reportedAt as Date | string) - ms(b.reportedAt as Date | string));

/** the level the rule sends a child to next, from their reported attempts; null = the set is mastered */
export function nextLevel(levels: Record<Level, string[]>, history: AttemptRow[]): Level | null | undefined {
  const has = (l: Level) => levels[l].length > 0;
  const start: Level | undefined = has('core') ? 'core' : has('easy') ? 'easy' : has('hard') ? 'hard' : undefined;
  if (!start) return undefined;
  const done = reported(history);
  if (!done.length) return start;
  const last = done[done.length - 1];
  const band = bandOf(last.right, last.total) || 'mid'; // a finished-only page neither promotes nor demotes
  if (last.level === 'hard') return band === 'high' ? null : band === 'low' && has('core') ? 'core' : 'hard';
  if (last.level === 'easy') return has('core') ? 'core' : has('hard') ? 'hard' : 'easy'; // "then back to the core page"
  // core (or a level this assignment no longer has)
  if (band === 'high') return has('hard') ? 'hard' : null;
  if (band === 'low') return has('easy') ? 'easy' : start;
  return start;
}

/**
 * The next page of a Level Set for one child. Start on the core page; almost all right → the harder page; several
 * wrong → the easier page, then back to core; otherwise another core page. A hard page with almost all right ends
 * the set. After SITTING_PAGES pages in SITTING_HOURS the child rests. Within a level the pages go in copy order,
 * the ones this child has not played first, then the one played longest ago.
 */
export function nextLadderStep(levels: Record<Level, string[]>, history: AttemptRow[], now: Date): LadderStep {
  const level = nextLevel(levels, history);
  if (level === undefined) return { done: 'empty' };
  if (level === null) return { done: 'mastered' };
  const done = reported(history);
  const recent = done.filter((a) => now.getTime() - ms(a.reportedAt as Date | string) < SITTING_HOURS * HOUR);
  if (recent.length >= SITTING_PAGES) return { done: 'rest' };
  const pages = levels[level];
  const lastPlayed = new Map<string, number>();
  for (const a of done) lastPlayed.set(a.pageRef, ms(a.reportedAt as Date | string));
  const fresh = pages.find((p) => !lastPlayed.has(p));
  const slug = fresh || [...pages].sort((a, b) => (lastPlayed.get(a) as number) - (lastPlayed.get(b) as number))[0];
  return { page: { level, slug } };
}

export type LevelStatus = 'passed' | 'practising' | 'struggled' | 'played';
export interface LadderSummary {
  levels: Array<{ level: Level; n: number; pages: number; right: number | null; total: number | null; status: LevelStatus | null; at: string | null }>;
  /** the level the child is on now; null when the set is mastered */
  current: Level | null;
  mastered: boolean;
}

/**
 * One child's standing on a Level Set, per level the set has: how many pages played there, the last first-Check
 * result and what it means (passed = almost all right, struggled = several wrong, practising = between, played = a
 * page that reports no marks). `n` is the level's position among the levels this set has (1 = lowest).
 */
export function ladderSummary(levels: Record<Level, string[]>, history: AttemptRow[]): LadderSummary {
  const done = reported(history);
  const present = LEVELS.filter((l) => levels[l].length > 0);
  const out = present.map((level, i) => {
    const at = done.filter((a) => a.level === level);
    const last = at[at.length - 1];
    const band = last ? bandOf(last.right, last.total) : null;
    const status: LevelStatus | null = !last ? null : band === 'high' ? 'passed' : band === 'low' ? 'struggled' : band === 'mid' ? 'practising' : 'played';
    return { level, n: i + 1, pages: at.length, right: last ? last.right : null, total: last ? last.total : null, status, at: last ? iso(last.reportedAt as Date | string) : null };
  });
  const next = nextLevel(levels, history);
  return { levels: out, current: next || null, mastered: next === null };
}

// ── teacher routes ──────────────────────────────────────────────────────────────────────────────────────────────────

const SIGNIN: Reply = json(401, { error: 'signin_required' });
const SUBSCRIBE: Reply = json(403, { error: 'subscription_required' });
const NOT_FOUND: Reply = json(404, { error: 'not_found' });

async function own(db: ClassDb, me: { userId: string }, id: string): Promise<ClassRow | null> {
  if (!ID_RE.test(id)) return null;
  const c = await db.getClass(id);
  return c && c.teacherId === me.userId ? c : null;
}

function seatsFrom(body: { names?: unknown; count?: unknown }, mode: NamesMode, firstNo: number, used: Set<string>): { seats: Array<{ seatNo: number; displayName: string | null; icon: string }>; refused: string[] } | Reply {
  let names: Array<string | null> = [], refused: string[] = [];
  if (mode === 'names') {
    const p = parseNames(body.names);
    names = p.names; refused = p.refused;
    if (!names.length && !refused.length) return { seats: [], refused };
  } else {
    const n = typeof body.count === 'number' && Number.isInteger(body.count) ? body.count : 0;
    if (n < 0 || n > SEATS_PER_CLASS) return json(400, { error: 'bad_count' });
    names = Array.from({ length: n }, () => null);
  }
  if (firstNo - 1 + names.length > SEATS_PER_CLASS) return json(429, { error: 'seat_cap', cap: SEATS_PER_CLASS });
  const free = SEAT_ICONS.filter((i) => !used.has(i));
  const seats = names.map((displayName, k) => ({ seatNo: firstNo + k, displayName, icon: free[k] || SEAT_ICONS[(firstNo - 1 + k) % SEAT_ICONS.length] }));
  return { seats, refused };
}

export async function listClasses(db: ClassDb, me: Caller): Promise<Reply> {
  if (!me) return SIGNIN;
  return json(200, { items: await db.listClasses(me.userId), canEdit: me.usable, names: me.names === true });
}

export async function createClass(db: ClassDb, me: Caller, body: unknown, newCode: () => string): Promise<Reply> {
  if (!me) return SIGNIN;
  if (!me.usable) return SUBSCRIBE;
  const b = body as { name?: unknown; namesMode?: unknown; locale?: unknown; names?: unknown; count?: unknown } | null;
  if (!b || typeof b !== 'object') return json(400, { error: 'bad_json' });
  const name = cleanClassName(b.name);
  if (!name) return json(400, { error: 'bad_name' });
  // numbers only unless this teacher may keep first names AND asked for them (a list of names sent with the request is then never read)
  const namesMode: NamesMode = me.names === true && b.namesMode === 'names' ? 'names' : 'numbers';
  const locale = (LOCALES as readonly unknown[]).includes(b.locale) ? (b.locale as string) : 'en';
  const s = seatsFrom(b, namesMode, 1, new Set());
  if ('status' in s) return s;
  if ((await db.countClasses(me.userId)) >= CLASSES_PER_TEACHER) return json(429, { error: 'class_cap', cap: CLASSES_PER_TEACHER });
  const code = newCode();
  if (!CODE_RE.test(code)) throw new Error('newCode must return 10 chars of CODE_ALPHABET');
  const cls = await db.createClass(me.userId, { name, code, namesMode, locale });
  if (s.seats.length) await db.createSeats(cls.id, s.seats);
  return json(201, { id: cls.id, code: cls.code, seats: s.seats.length, refused: s.refused });
}

const classView = (c: ClassRow) => ({ id: c.id, name: c.name, code: c.code, namesMode: c.namesMode, locale: c.locale, lastUsedAt: iso(c.lastUsedAt), createdAt: iso(c.createdAt) });
const seatView = (s: SeatRow) => ({ id: s.id, seatNo: s.seatNo, displayName: s.displayName, icon: s.icon });
const assignmentView = (a: AssignmentRow) => ({ id: a.id, kind: a.kind, title: a.title, closed: !!a.closedAt, position: a.position, createdAt: iso(a.createdAt), levels: a.content.kind === 'ladder' ? LEVELS.filter((l) => a.content.kind === 'ladder' && a.content.levels[l].length > 0) : null });

export async function getClass(db: ClassDb, me: Caller, id: string): Promise<Reply> {
  if (!me) return SIGNIN;
  const c = await own(db, me, id);
  if (!c) return NOT_FOUND;
  const [seats, assignments] = await Promise.all([db.listSeats(c.id), db.listAssignments(c.id)]);
  return json(200, { class: classView(c), seats: seats.map(seatView), assignments: assignments.map(assignmentView), canEdit: me.usable, names: me.names === true });
}

export async function updateClass(db: ClassDb, me: Caller, id: string, body: unknown, newCode: () => string, now: Date): Promise<Reply> {
  if (!me) return SIGNIN;
  const c = await own(db, me, id);
  if (!c) return NOT_FOUND;
  const b = body as { name?: unknown; namesMode?: unknown; locale?: unknown; newCode?: unknown } | null;
  if (!b || typeof b !== 'object') return json(400, { error: 'bad_json' });
  const patch: Partial<Pick<ClassRow, 'name' | 'code' | 'namesMode' | 'locale'>> = {};
  if (b.name !== undefined) { const n = cleanClassName(b.name); if (!n) return json(400, { error: 'bad_name' }); patch.name = n; }
  if (b.locale !== undefined) { if (!(LOCALES as readonly unknown[]).includes(b.locale)) return json(400, { error: 'bad_locale' }); patch.locale = b.locale as string; }
  if (b.namesMode !== undefined) { if (!(NAMES_MODES as readonly unknown[]).includes(b.namesMode)) return json(400, { error: 'bad_mode' }); patch.namesMode = b.namesMode as NamesMode; }
  if (patch.namesMode === 'names' && me.names !== true) return NAMES_OFF;
  // switching a class to numbers only REMOVES the stored names (it is the privacy switch, not a display option);
  // this one is allowed without a subscription, like every removal
  const toNumbers = patch.namesMode === 'numbers' && c.namesMode !== 'numbers';
  const onlyRemoval = toNumbers && Object.keys(patch).length === 1 && !b.newCode;
  if (!me.usable && !onlyRemoval) return SUBSCRIBE;
  if (b.newCode === true) { const code = newCode(); if (!CODE_RE.test(code)) throw new Error('newCode must return 10 chars of CODE_ALPHABET'); patch.code = code; }
  if (!Object.keys(patch).length) return json(400, { error: 'nothing_to_change' });
  await db.updateClass(c.id, patch);
  if (toNumbers) await db.clearSeatNames(c.id);
  await db.touchClass(c.id, now);
  return json(200, { ok: true, code: patch.code || c.code });
}

export async function deleteClass(db: ClassDb, me: Caller, id: string): Promise<Reply> {
  if (!me) return SIGNIN;
  const c = await own(db, me, id);
  if (!c) return NOT_FOUND;
  await db.deleteClass(c.id);
  return json(200, { ok: true });
}

export async function addSeats(db: ClassDb, me: Caller, id: string, body: unknown, now: Date): Promise<Reply> {
  if (!me) return SIGNIN;
  if (!me.usable) return SUBSCRIBE;
  const c = await own(db, me, id);
  if (!c) return NOT_FOUND;
  const b = body as { names?: unknown; count?: unknown } | null;
  if (!b || typeof b !== 'object') return json(400, { error: 'bad_json' });
  if (c.namesMode === 'names' && me.names !== true) return NAMES_OFF;   // a names class whose teacher lost the permission takes no new name
  const have = await db.listSeats(c.id);
  const firstNo = have.reduce((m, s) => Math.max(m, s.seatNo), 0) + 1;
  const s = seatsFrom(b, c.namesMode, firstNo, new Set(have.map((x) => x.icon)));
  if ('status' in s) return s;
  if (!s.seats.length) return json(400, { error: 'no_names', refused: s.refused });
  await db.createSeats(c.id, s.seats);
  await db.touchClass(c.id, now);
  return json(201, { added: s.seats.length, refused: s.refused });
}

async function ownSeat(db: ClassDb, c: ClassRow, seatId: string): Promise<SeatRow | null> {
  if (!ID_RE.test(seatId)) return null;
  const s = await db.getSeat(seatId);
  return s && s.classId === c.id ? s : null;
}

export async function updateSeat(db: ClassDb, me: Caller, id: string, seatId: string, body: unknown): Promise<Reply> {
  if (!me) return SIGNIN;
  if (!me.usable) return SUBSCRIBE;
  const c = await own(db, me, id);
  const s = c ? await ownSeat(db, c, seatId) : null;
  if (!c || !s) return NOT_FOUND;
  const b = body as { displayName?: unknown; icon?: unknown } | null;
  if (!b || typeof b !== 'object') return json(400, { error: 'bad_json' });
  const patch: { displayName?: string | null; icon?: string } = {};
  if (b.displayName !== undefined) {
    if (me.names !== true) return NAMES_OFF;
    if (c.namesMode === 'numbers') return json(400, { error: 'numbers_only' });
    const n = cleanSeatName(b.displayName);
    if (!n) return json(400, { error: 'bad_name' });
    patch.displayName = n;
  }
  if (b.icon !== undefined) {
    if (typeof b.icon !== 'string' || !SEAT_ICONS.includes(b.icon)) return json(400, { error: 'bad_icon' });
    const taken = (await db.listSeats(c.id)).some((x) => x.id !== s.id && x.icon === b.icon);
    if (taken) return json(409, { error: 'icon_taken' });
    patch.icon = b.icon;
  }
  if (!Object.keys(patch).length) return json(400, { error: 'nothing_to_change' });
  await db.updateSeat(s.id, patch);
  return json(200, { ok: true });
}

/** remove a child (seat + results), or with resultsOnly just what the child did; never needs a subscription */
export async function deleteSeat(db: ClassDb, me: Caller, id: string, seatId: string, resultsOnly: boolean): Promise<Reply> {
  if (!me) return SIGNIN;
  const c = await own(db, me, id);
  const s = c ? await ownSeat(db, c, seatId) : null;
  if (!c || !s) return NOT_FOUND;
  if (resultsOnly) await db.deleteAttemptsOfSeat(s.id); else await db.deleteSeat(s.id);
  return json(200, { ok: true });
}

export async function addAssignment(db: ClassDb, me: Caller, id: string, body: unknown, now: Date): Promise<Reply> {
  if (!me) return SIGNIN;
  if (!me.usable) return SUBSCRIBE;
  const c = await own(db, me, id);
  if (!c) return NOT_FOUND;
  const b = body as { link?: unknown } | null;
  if (!b || typeof b !== 'object') return json(400, { error: 'bad_json' });
  const p = parseAssignmentLink(b.link);
  if (!p) return json(400, { error: 'bad_link' });
  let made: { kind: AssignmentKind; title: string; content: AssignmentContent } | null = null;
  let deckRef: { locale: string; slug: string } | null = p.kind === 'deck' ? { locale: p.locale, slug: p.slug } : null;
  if (p.kind === 'landing') { const l = await db.resolveLanding(p.locale, p.slug); if (!l) return json(404, { error: 'link_not_found' }); deckRef = { locale: p.locale, slug: l.slug }; }
  if (p.kind === 'play') { const l = await db.resolvePlayLink(p.linkId); if (!l) return json(404, { error: 'link_not_found' }); deckRef = l; }
  if (deckRef) {
    const d = await db.resolveDeck(deckRef.locale, deckRef.slug);
    if (!d) return json(404, { error: 'link_not_found' });
    if (!d.interactive) return json(422, { error: 'print_only' });
    made = { kind: 'deck', title: d.title, content: { kind: 'deck', locale: deckRef.locale, slug: d.slug } };
  } else if (p.kind === 'set') {
    const l = await db.resolveLadder(p.locale, p.code);
    if (!l) return json(404, { error: 'link_not_found' });
    const n = LEVELS.reduce((k, lv) => k + l.levels[lv].length, 0);
    if (!n) return json(422, { error: 'print_only' });
    made = { kind: 'ladder', title: l.title, content: { kind: 'ladder', locale: p.locale, code: l.code, levels: l.levels } };
  } else if (p.kind === 'maker') {
    const m = await db.resolveMakerLink(p.linkId, me.userId);
    if (!m) return json(404, { error: 'link_not_found' });
    made = { kind: 'maker', title: m.title, content: { kind: 'maker', linkId: m.linkId } };
  } else if (p.kind === 'activity') {
    const act = await db.resolveActivity(p.locale, p.slug);
    if (!act) return json(404, { error: 'link_not_found' });
    made = { kind: 'activity', title: act.title, content: { kind: 'activity', locale: p.locale, slug: act.slug, activity: act.id } };
  }
  if (!made) return json(400, { error: 'bad_link' });
  const have = await db.listAssignments(c.id);
  if (have.length >= ASSIGNMENTS_PER_CLASS) return json(429, { error: 'assignment_cap', cap: ASSIGNMENTS_PER_CLASS });
  const same = have.find((a) => JSON.stringify(refOf(a.content)) === JSON.stringify(refOf(made!.content)));
  if (same) { if (same.closedAt) await db.updateAssignment(same.id, { closedAt: null }); return json(200, { id: same.id, existing: true }); }
  const position = have.reduce((m, a) => Math.max(m, a.position), 0) + 1;
  const a = await db.createAssignment(c.id, { kind: made.kind, title: made.title.slice(0, 200), content: made.content, position });
  await db.touchClass(c.id, now);
  return json(201, { id: a.id, kind: a.kind, title: a.title });
}
/** what makes two assignments the same thing (a ladder's page list may differ from one day to the next) */
const refOf = (c: AssignmentContent) => (c.kind === 'ladder' ? ['ladder', c.locale, c.code] : c.kind === 'deck' ? ['deck', c.locale, c.slug] : c.kind === 'activity' ? ['activity', c.locale, c.slug] : ['maker', c.linkId]);

async function ownAssignment(db: ClassDb, c: ClassRow, aid: string): Promise<AssignmentRow | null> {
  if (!ID_RE.test(aid)) return null;
  const a = await db.getAssignment(aid);
  return a && a.classId === c.id ? a : null;
}

export async function updateAssignment(db: ClassDb, me: Caller, id: string, aid: string, body: unknown, now: Date): Promise<Reply> {
  if (!me) return SIGNIN;
  if (!me.usable) return SUBSCRIBE;
  const c = await own(db, me, id);
  const a = c ? await ownAssignment(db, c, aid) : null;
  if (!c || !a) return NOT_FOUND;
  const b = body as { closed?: unknown } | null;
  if (!b || typeof b !== 'object' || typeof b.closed !== 'boolean') return json(400, { error: 'bad_json' });
  await db.updateAssignment(a.id, { closedAt: b.closed ? now : null });
  return json(200, { ok: true });
}

export async function deleteAssignment(db: ClassDb, me: Caller, id: string, aid: string): Promise<Reply> {
  if (!me) return SIGNIN;
  const c = await own(db, me, id);
  const a = c ? await ownAssignment(db, c, aid) : null;
  if (!c || !a) return NOT_FOUND;
  await db.deleteAssignment(a.id);
  return json(200, { ok: true });
}

export interface PageResult { right: number | null; total: number | null; band: Band | null; finished: boolean; at: string }
export interface Cell {
  /** how many times the child opened and reported a page of this assignment */
  plays: number;
  /** a single page (deck, maker worksheet): the FIRST time the child played it — first Check; null until then */
  first: PageResult | null;
  /** the Check presses on that first play (1 = right away, more = the child corrected) */
  checks: number;
  /** a Level Set: the child's standing per level */
  ladder: LadderSummary | null;
}

/** the dashboard: one cell per child and assignment */
export async function classResults(db: ClassDb, me: Caller, id: string): Promise<Reply> {
  if (!me) return SIGNIN;
  const c = await own(db, me, id);
  if (!c) return NOT_FOUND;
  const [seats, assignments, attempts] = await Promise.all([db.listSeats(c.id), db.listAssignments(c.id), db.listAttemptsOfClass(c.id)]);
  const by = new Map<string, AttemptRow[]>();
  for (const a of attempts) { const k = a.assignmentId + '|' + a.seatId; const l = by.get(k); if (l) l.push(a); else by.set(k, [a]); }
  const cells: Record<string, Record<string, Cell>> = {};
  for (const s of seats) {
    cells[s.id] = {};
    for (const a of assignments) {
      const h = reported(by.get(a.id + '|' + s.id) || []);
      if (!h.length) continue;
      const f = h[0];
      cells[s.id][a.id] = {
        plays: h.length,
        first: a.content.kind === 'ladder' ? null : { right: f.right, total: f.total, band: bandOf(f.right, f.total), finished: f.finished, at: iso(f.reportedAt as Date | string) },
        checks: f.checks,
        ladder: a.content.kind === 'ladder' ? ladderSummary(a.content.levels, h) : null,
      };
    }
  }
  return json(200, { class: classView(c), seats: seats.map(seatView), assignments: assignments.map(assignmentView), cells });
}

// ── results by curriculum (release 2, step 9.6) ────────────────────────────────────────────────

/** a heading of the view: what a page may show for a national objective (scripts/curricula/show.js) */
export interface SkillGroup { fw: string | null; code: string | null; titles: string[]; outside: boolean }
export interface SkillPoint {
  g: number; order: number; set: string | null; acts: string[];
  tool: { slug: string; name: string } | null;
  unit: { slug: string; n: number; title: string; unit: string } | null;
}
/** one registry's skill index (frontend/content/class-skills/<registry>.json, built by scripts/class-results/build-skill-index.js) */
export interface SkillIndex {
  registry: string; locale: string; name: string;
  groups: SkillGroup[]; points: Record<string, SkillPoint>; types: Record<string, string>; activities: Record<string, string>;
}
/** the registries a class of this language can be read against (the first is the country's own), and one of them loaded */
export type SkillPick = (locale: string, wanted: string | null) => Promise<{ index: SkillIndex; choices: Array<{ key: string; name: string }> } | null>;

export type NextStep =
  | { kind: 'set'; title: string; link: string }
  | { kind: 'activity'; title: string; link: string }
  | { kind: 'tool'; title: string; href: string }
  | { kind: 'unit'; title: string; unit: string; n: number; href: string };

/** the teaching point an assignment practises, by the index: a page's type code, a Level Set's code, an activity's id */
export function pointOfAssignment(content: AssignmentContent, index: SkillIndex): string | null {
  if (content.kind === 'ladder') return index.types[content.code.toLowerCase()] || null;
  if (content.kind === 'deck') {
    // the LAST code-shaped part of the address (…-g1116, …-g1116-4, …-k393-10-forestrabbit), as scripts/units/catalog.js reads it
    const all = content.slug.match(/-(?:k|g[0-9])[0-9]{3}(?=-|$)/g);
    return (all && index.types[all[all.length - 1].slice(1)]) || null;
  }
  if (content.kind === 'activity') return index.activities[content.activity] || null;
  return null; // a teacher's own maker worksheet names no teaching point
}

/**
 * What one child has shown on one assignment, for the view by curriculum:
 *   a single page or an activity → its FIRST play (the same page played again is not new evidence);
 *   a Level Set → finished = almost all right; otherwise the LAST page played (each page is a different page).
 * band null = played, with no marks. null = nothing reported yet.
 */
function evidence(a: AssignmentRow, history: AttemptRow[]): { band: Band | null; at: number } | null {
  const h = reported(history);
  if (!h.length) return null;
  if (a.content.kind === 'ladder') {
    const last = h[h.length - 1];
    if (nextLevel(a.content.levels, history) === null) return { band: 'high', at: ms(last.reportedAt as Date | string) };
    const marked = h.filter((x) => bandOf(x.right, x.total));
    const m = marked[marked.length - 1];
    return m ? { band: bandOf(m.right, m.total), at: ms(m.reportedAt as Date | string) } : { band: null, at: ms(last.reportedAt as Date | string) };
  }
  return { band: bandOf(h[0].right, h[0].total), at: ms(h[0].reportedAt as Date | string) };
}

/**
 * The dashboard by curriculum: the class's work under the headings of the country's own curriculum, per child the
 * most recent result under each heading, and for a heading where a child had some or many wrong, the next step.
 * A next step is offered only for something that exists in the class's language NOW (the Level Set and the activity
 * are looked up again here) and that the class does not already have.
 */
export async function classSkills(db: ClassDb, me: Caller, id: string, wanted: unknown, pick: SkillPick): Promise<Reply> {
  if (!me) return SIGNIN;
  const c = await own(db, me, id);
  if (!c) return NOT_FOUND;
  const picked = await pick(c.locale, typeof wanted === 'string' && /^[a-z]{2}(?:-[a-z]{2})?$/.test(wanted) ? wanted : null);
  if (!picked || picked.index.locale !== c.locale) return json(404, { error: 'no_curriculum' });
  const { index, choices } = picked;
  const [seats, assignments, attempts] = await Promise.all([db.listSeats(c.id), db.listAssignments(c.id), db.listAttemptsOfClass(c.id)]);
  const by = new Map<string, AttemptRow[]>();
  for (const a of attempts) { const k = a.assignmentId + '|' + a.seatId; const l = by.get(k); if (l) l.push(a); else by.set(k, [a]); }

  interface Row { g: number; order: number; work: Array<{ id: string; title: string; kind: AssignmentKind; point: string }>; seats: Record<string, { band: Band | null; at: number }> }
  const rows = new Map<number, Row>();
  const other: Array<{ id: string; title: string; kind: AssignmentKind }> = [];
  for (const a of assignments) {
    const pid = pointOfAssignment(a.content, index);
    const pt = pid ? index.points[pid] : null;
    if (!pid || !pt || !index.groups[pt.g]) { other.push({ id: a.id, title: a.title, kind: a.kind }); continue; }
    let row = rows.get(pt.g);
    if (!row) { row = { g: pt.g, order: pt.order, work: [], seats: {} }; rows.set(pt.g, row); }
    row.order = Math.min(row.order, pt.order);
    row.work.push({ id: a.id, title: a.title, kind: a.kind, point: pid });
    for (const s of seats) {
      const e = evidence(a, by.get(a.id + '|' + s.id) || []);
      if (!e) continue;
      const have = row.seats[s.id];
      // the most recent result under the heading; at the same moment, a result with marks before one without
      if (!have || e.at > have.at || (e.at === have.at && e.band && !have.band)) row.seats[s.id] = e;
    }
  }

  const hasSet = new Set(assignments.map((a) => (a.content.kind === 'ladder' ? a.content.code.toLowerCase() : '')));
  const hasAct = new Set(assignments.map((a) => (a.content.kind === 'activity' ? a.content.slug : '')));
  const groups = [];
  for (const row of [...rows.values()].sort((a, b) => a.order - b.order || a.g - b.g)) {
    const counts = { high: 0, mid: 0, low: 0, played: 0, none: 0 };
    const bands: Record<string, Band | 'played'> = {};
    for (const s of seats) {
      const e = row.seats[s.id];
      if (!e) { counts.none++; continue; }
      const b = e.band || 'played';
      bands[s.id] = b; counts[b]++;
    }
    const next: NextStep[] = [];
    if (counts.low + counts.mid > 0) {
      // the points behind this heading's work, in teaching order; one step of each kind
      const pts = [...new Set(row.work.map((w) => w.point))].map((p) => index.points[p]).sort((a, b) => a.order - b.order);
      for (const pt of pts) {
        if (pt.set && !hasSet.has(pt.set) && !next.some((n) => n.kind === 'set')) {
          const l = await db.resolveLadder(c.locale, pt.set);
          if (l && LEVELS.some((lv) => l.levels[lv].length > 0)) next.push({ kind: 'set', title: l.title, link: `/${c.locale}/worksheets/sets/${l.code}` });
        }
        if (!next.some((n) => n.kind === 'activity')) for (const slug of pt.acts) {
          if (hasAct.has(slug)) continue;
          const act = await db.resolveActivity(c.locale, slug);
          if (act) { next.push({ kind: 'activity', title: act.title, link: `/${c.locale}/activities/${act.slug}` }); break; }
        }
        if (pt.tool && !next.some((n) => n.kind === 'tool')) next.push({ kind: 'tool', title: pt.tool.name, href: `/${c.locale}/tools/${pt.tool.slug}` });
        if (pt.unit && !next.some((n) => n.kind === 'unit')) next.push({ kind: 'unit', title: pt.unit.title, unit: pt.unit.unit, n: pt.unit.n, href: `/${c.locale}/units/${pt.unit.slug}` });
      }
    }
    const g = index.groups[row.g];
    groups.push({ key: 'g' + row.g, fw: g.fw, code: g.code, titles: g.titles, outside: g.outside, work: row.work.map((w) => ({ id: w.id, title: w.title, kind: w.kind })), bands, counts, next });
  }
  return json(200, {
    class: classView(c), seats: seats.map(seatView), curriculum: { key: index.registry, name: index.name }, curricula: choices,
    groups, other, canEdit: me.usable,
  });
}

// ── child routes ────────────────────────────────────────────────────────────────────────────────────────────────────

/** a class link that exists but whose teacher's plan is not usable: the page says "ask your teacher", stores nothing */
const INACTIVE: Reply = json(200, { inactive: true });

async function liveClass(db: ClassDb, code: unknown): Promise<{ cls: ClassRow } | Reply> {
  if (typeof code !== 'string' || !CODE_RE.test(code)) return NOT_FOUND;
  const r = await db.getClassByCode(code);
  if (!r) return NOT_FOUND;
  if (!r.teacherUsable) return INACTIVE;
  return { cls: r.cls };
}

const childSeat = (s: SeatRow, mode: NamesMode) => ({ id: s.id, n: s.seatNo, name: mode === 'names' ? s.displayName : null, icon: s.icon });

/** the class page: who is in the class and what is assigned (nothing about any child's results) */
export async function classPage(db: ClassDb, code: unknown): Promise<Reply> {
  const r = await liveClass(db, code);
  if ('status' in r) return r;
  const { cls } = r;
  const [seats, assignments] = await Promise.all([db.listSeats(cls.id), db.listAssignments(cls.id)]);
  return json(200, {
    name: cls.name, locale: cls.locale, namesMode: cls.namesMode,
    seats: seats.map((s) => childSeat(s, cls.namesMode)),
    assignments: assignments.filter((a) => !a.closedAt).map((a) => ({ id: a.id, kind: a.kind, title: a.title })),
  });
}

export type ChildState = 'new' | 'done' | 'rest' | 'mastered';

/** one child's view of the assignments: done or not, never a score */
export async function seatPage(db: ClassDb, code: unknown, seatId: unknown, now: Date): Promise<Reply> {
  const r = await liveClass(db, code);
  if ('status' in r) return r;
  const { cls } = r;
  const seat = typeof seatId === 'string' ? await ownSeat(db, cls, seatId) : null;
  if (!seat) return NOT_FOUND;
  const assignments = (await db.listAssignments(cls.id)).filter((a) => !a.closedAt);
  const out: Array<{ id: string; kind: AssignmentKind; title: string; state: ChildState }> = [];
  for (const a of assignments) {
    const h = await db.listAttempts(a.id, seat.id);
    let state: ChildState = 'new';
    if (a.content.kind === 'ladder') {
      // a Level Set stays open while the rule has a page for the child; it shows as done only when the child has
      // mastered it or has played this sitting's pages
      const step = nextLadderStep(a.content.levels, h, now);
      if ('done' in step && step.done !== 'empty') state = step.done;
    } else if (reported(h).length) state = 'done';
    out.push({ id: a.id, kind: a.kind, title: a.title, state });
  }
  return json(200, { seat: childSeat(seat, cls.namesMode), assignments: out });
}

async function mint(db: ClassDb, a: AssignmentRow, seat: SeatRow, history: AttemptRow[], now: Date, newToken: () => string): Promise<{ url: string } | { done: 'mastered' | 'rest' | 'empty' } | Reply> {
  let pageRef: string, level: Level | null = null;
  if (a.content.kind === 'ladder') {
    const step = nextLadderStep(a.content.levels, history, now);
    if ('done' in step) return { done: step.done };
    pageRef = step.page.slug; level = step.page.level;
  } else pageRef = a.content.kind === 'deck' || a.content.kind === 'activity' ? a.content.slug : a.content.linkId;
  const open = history.find((h) => !h.reportedAt && h.pageRef === pageRef && h.level === level && now.getTime() - ms(h.createdAt) < REUSE_OPEN_ATTEMPT_HOURS * HOUR);
  if (open) return { url: playUrl(a.content, pageRef, open.token) };
  if (history.length >= ATTEMPTS_PER_SEAT_AND_ASSIGNMENT) return json(429, { error: 'attempt_cap' });
  const token = newToken();
  if (!TOKEN_RE.test(token)) throw new Error('newToken must return 20 chars of CODE_ALPHABET');
  await db.createAttempt({ token, assignmentId: a.id, seatId: seat.id, pageRef, level });
  return { url: playUrl(a.content, pageRef, token) };
}

/** a child taps an assignment: the page to play, with its attempt token after '#' */
export async function startAttempt(db: ClassDb, body: unknown, newToken: () => string, now: Date): Promise<Reply> {
  const b = body as { code?: unknown; seatId?: unknown; assignmentId?: unknown } | null;
  if (!b || typeof b !== 'object') return json(400, { error: 'bad_json' });
  const r = await liveClass(db, b.code);
  if ('status' in r) return r;
  const { cls } = r;
  const seat = typeof b.seatId === 'string' ? await ownSeat(db, cls, b.seatId) : null;
  const a = typeof b.assignmentId === 'string' ? await ownAssignment(db, cls, b.assignmentId) : null;
  if (!seat || !a || a.closedAt) return NOT_FOUND;
  const m = await mint(db, a, seat, await db.listAttempts(a.id, seat.id), now, newToken);
  if ('status' in m) return m;
  await db.touchClass(cls.id, now);
  return json(200, m);
}

/** the marks a page sends: whole numbers in range, items 1/0 and as many as `total`; null when malformed or empty */
export function cleanReport(b: { right?: unknown; total?: unknown; items?: unknown; finished?: unknown }): { right: number | null; total: number | null; items: number[] | null; finished: boolean } | null {
  const int = (x: unknown) => typeof x === 'number' && Number.isInteger(x) && x >= 0 && x <= MAX_ITEMS;
  let right: number | null = null, total: number | null = null, items: number[] | null = null;
  if (b.right !== undefined || b.total !== undefined) {
    if (!int(b.right) || !int(b.total) || (b.total as number) < 1 || (b.right as number) > (b.total as number)) return null;
    right = b.right as number; total = b.total as number;
  }
  if (b.items !== undefined && b.items !== null) {
    if (total == null || !Array.isArray(b.items) || b.items.length !== total || b.items.some((x) => x !== 0 && x !== 1)) return null;
    if ((b.items as number[]).reduce((s, x) => s + x, 0) !== right) return null;
    items = b.items as number[];
  }
  if (b.finished !== undefined && typeof b.finished !== 'boolean') return null;
  // a report says something: marks, or whether the page is finished (a page with no marks to read reports its
  // Check as { finished: false }: "played", no number)
  if (total == null && typeof b.finished !== 'boolean') return null;
  return { right, total, items, finished: b.finished === true || (total != null && right === total) };
}

/**
 * A page reports a Check. The FIRST report of an attempt is the result (first try); later ones only count the
 * presses and may mark the page finished. The reply tells the page where the child goes next: the next page of a
 * Level Set, or back to the class page.
 */
export async function report(db: ClassDb, body: unknown, newToken: () => string, now: Date): Promise<Reply> {
  const b = body as { token?: unknown; right?: unknown; total?: unknown; items?: unknown; finished?: unknown } | null;
  if (!b || typeof b !== 'object' || typeof b.token !== 'string' || !TOKEN_RE.test(b.token)) return json(400, { error: 'bad_json' });
  const att = await db.getAttempt(b.token);
  if (!att) return NOT_FOUND;
  const a = await db.getAssignment(att.assignmentId);
  const seat = await db.getSeat(att.seatId);
  const cls = a ? await db.getClass(a.classId) : null;
  if (!a || !seat || !cls) return NOT_FOUND;
  const live = await db.getClassByCode(cls.code);
  if (!live || !live.teacherUsable) return INACTIVE;
  const r = cleanReport(b);
  if (!r) return json(400, { error: 'bad_report' });
  if (!att.reportedAt) await db.saveReport(att.id, { right: r.right, total: r.total, items: r.items, checks: 1, finished: r.finished, reportedAt: now });
  else await db.saveReport(att.id, { checks: Math.min(99, att.checks + 1), finished: att.finished || r.finished });
  await db.touchClass(cls.id, now);
  const back = `/c/${cls.code}`;
  if (a.content.kind !== 'ladder' || a.closedAt) return json(200, { done: true, back });
  const m = await mint(db, a, seat, await db.listAttempts(a.id, seat.id), now, newToken);
  if ('status' in m) return json(200, { done: true, back });
  return 'url' in m ? json(200, { next: m.url, back }) : json(200, { done: true, why: m.done, back });
}

/** may the page behind this token play without the per-device play meter? (a live class of a usable teacher) */
export async function tokenSkipsMeter(db: ClassDb, token: unknown): Promise<boolean> {
  if (typeof token !== 'string' || !TOKEN_RE.test(token)) return false;
  const att = await db.getAttempt(token);
  if (!att) return false;
  const a = await db.getAssignment(att.assignmentId);
  const cls = a ? await db.getClass(a.classId) : null;
  const live = cls ? await db.getClassByCode(cls.code) : null;
  return !!live && live.teacherUsable;
}

/** is this class past its retention? (the cron job's rule, kept beside the rules it belongs to) */
export function classExpired(c: { lastUsedAt: Date | string }, teacher: { usable: boolean; endedAt: Date | string | null }, now: Date): boolean {
  const DAY = 24 * HOUR;
  if (now.getTime() - ms(c.lastUsedAt) > RETENTION_UNUSED_DAYS * DAY) return true;
  return !teacher.usable && !!teacher.endedAt && now.getTime() - ms(teacher.endedAt) > RETENTION_AFTER_SUBSCRIPTION_DAYS * DAY;
}
