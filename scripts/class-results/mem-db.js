/**
 * An in-memory ClassDb (frontend/lib/class-results/store.ts interface) with a tiny catalogue.
 *
 * Used by the rules' test (tests/class-store.test.js) and by the local class preview (dev-server.js): the same
 * rules the website runs through Prisma, over plain Maps.
 *
 *   memDb({ now, usable, decks, ladders, makers, resolveLanding, resolveMakerLink })
 *     now      () => Date            the clock (the test moves it)
 *     usable   Set<teacherId>        teachers whose plan is usable
 *     decks    { '<loc>/<slug>': { title, interactive } }
 *     ladders  { '<loc>/<code>': { code, title, levels: { easy, core, hard } } }
 *     makers   { <linkId>: { teacherId, title } }
 */
'use strict';
function memDb(opt) {
  opt = opt || {};
  const clock = opt.now || (() => new Date());
  let k = 0; const id = (p) => p + String(++k).padStart(9, '0');
  const classes = new Map(), seats = new Map(), assignments = new Map(), attempts = new Map();
  const usable = opt.usable || new Set(['sub', 'sub2']);
  // the one-time confirmation: every teacher counts as having confirmed, except those named in `unconfirmed`
  const confirmations = new Map(), unconfirmed = new Set(opt.unconfirmed || []);
  const decks = opt.decks || { 'en/count-k002': { title: 'Count the Animals', interactive: true }, 'en/trace-k100': { title: 'Trace the Lines', interactive: false } };
  const ladders = opt.ladders || { 'en/k002': { code: 'k002', title: 'Count and Write', levels: { easy: ['e1', 'e2'], core: ['c1', 'c2', 'c3'], hard: ['h1', 'h2'] } }, 'en/k100': { code: 'k100', title: 'Tracing', levels: { easy: [], core: [], hard: [] } }, 'en/k300': { code: 'k300', title: 'Two levels', levels: { easy: [], core: ['c1', 'c2'], hard: [] } } };
  const makers = opt.makers || { abcdefghjkmn: { teacherId: 'sub', title: 'My number bonds' } };
  const copy = (x) => (x ? JSON.parse(JSON.stringify(x)) : x);
  const db = {
    usable, classes, seats, assignments, attempts, confirmations, unconfirmed,
    async hasConfirmed(t, version) { return confirmations.has(t) ? confirmations.get(t).version === version : !unconfirmed.has(t); },
    async saveConfirmation(t, version, at) { confirmations.set(t, { version, at }); },
    async listClasses(t) { return [...classes.values()].filter((c) => c.teacherId === t).map((c) => ({ id: c.id, name: c.name, code: c.code, namesMode: c.namesMode, locale: c.locale, seats: [...seats.values()].filter((s) => s.classId === c.id).length, assignments: [...assignments.values()].filter((a) => a.classId === c.id).length, lastUsedAt: c.lastUsedAt })); },
    async countClasses(t) { return [...classes.values()].filter((c) => c.teacherId === t).length; },
    async createClass(t, c) { const r = { id: id('c'), teacherId: t, ...c, lastUsedAt: new Date(0).toISOString(), createdAt: new Date(0).toISOString() }; classes.set(r.id, r); return copy(r); },
    async getClass(i) { return copy(classes.get(i)) || null; },
    async getClassByCode(code) { const c = [...classes.values()].find((x) => x.code === code); return c ? { cls: copy(c), teacherUsable: usable.has(c.teacherId) } : null; },
    async updateClass(i, p) { Object.assign(classes.get(i), p); },
    async touchClass(i, now) { classes.get(i).lastUsedAt = now.toISOString(); },
    async deleteClass(i) { classes.delete(i); for (const s of [...seats.values()]) if (s.classId === i) await db.deleteSeat(s.id); for (const a of [...assignments.values()]) if (a.classId === i) await db.deleteAssignment(a.id); },
    async listSeats(c) { return [...seats.values()].filter((s) => s.classId === c).sort((a, b) => a.seatNo - b.seatNo).map(copy); },
    async getSeat(i) { return copy(seats.get(i)) || null; },
    async createSeats(c, list) { for (const s of list) { const r = { id: id('s'), classId: c, ...s }; seats.set(r.id, r); } },
    async updateSeat(i, p) { Object.assign(seats.get(i), p); },
    async clearSeatNames(c) { for (const s of seats.values()) if (s.classId === c) s.displayName = null; },
    async deleteSeat(i) { seats.delete(i); for (const a of [...attempts.values()]) if (a.seatId === i) attempts.delete(a.token); },
    async deleteAttemptsOfSeat(i) { for (const a of [...attempts.values()]) if (a.seatId === i) attempts.delete(a.token); },
    async listAssignments(c) { return [...assignments.values()].filter((a) => a.classId === c).sort((a, b) => a.position - b.position).map(copy); },
    async getAssignment(i) { return copy(assignments.get(i)) || null; },
    async createAssignment(c, a) { const r = { id: id('a'), classId: c, ...a, closedAt: null, createdAt: new Date(0).toISOString() }; assignments.set(r.id, r); return copy(r); },
    async updateAssignment(i, p) { Object.assign(assignments.get(i), { closedAt: p.closedAt ? p.closedAt.toISOString() : null }); },
    async deleteAssignment(i) { assignments.delete(i); for (const a of [...attempts.values()]) if (a.assignmentId === i) attempts.delete(a.token); },
    async listAttemptsOfClass(c) { const ids = new Set([...assignments.values()].filter((a) => a.classId === c).map((a) => a.id)); return [...attempts.values()].filter((a) => ids.has(a.assignmentId)).map(copy); },
    async listAttempts(a, s) { return [...attempts.values()].filter((x) => x.assignmentId === a && x.seatId === s).sort((x, y) => x.seq - y.seq).map(copy); },
    async createAttempt(a) { const r = { id: id('t'), seq: k, ...a, right: null, total: null, items: null, checks: 0, finished: false, createdAt: db.now().toISOString(), reportedAt: null }; attempts.set(r.token, r); return copy(r); },
    async getAttempt(t) { return copy(attempts.get(t)) || null; },
    async saveReport(i, p) { const a = [...attempts.values()].find((x) => x.id === i); Object.assign(a, p, p.reportedAt ? { reportedAt: p.reportedAt.toISOString() } : {}); },
    async resolveDeck(l, s) { const d = decks[l + '/' + s]; return d ? { slug: s, ...d } : null; },
    async resolveLadder(l, c) { return copy(ladders[l + '/' + c]) || null; },
    async resolveLanding(l, s) { if (opt.resolveLanding) return opt.resolveLanding(l, s); return l === 'en' && s === 'count-the-animals' ? { slug: 'count-k002' } : null; },
    async resolvePlayLink(i) { return i === 'a1b2c3d4e5' ? { locale: 'en', slug: 'count-k002' } : null; },
    async resolveActivity(l, s) { const a = (opt.activities || {})[l + '/' + s]; return a ? { id: a.id, slug: s, title: a.title } : null; },
    async resolveMakerLink(i, t) { if (opt.resolveMakerLink) return opt.resolveMakerLink(i, t); const m = makers[i]; return m && m.teacherId === t ? { linkId: i, title: m.title } : null; },
    now: clock,
  };
  return db;
}

module.exports = { memDb };
