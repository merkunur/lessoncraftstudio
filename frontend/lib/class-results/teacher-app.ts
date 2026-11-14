/**
 * The teacher's Classes screen (Daily Teaching System, Part 9.3) — framework-free.
 *
 *   mountClasses(root, { locale, strings, origin, signedIn, usable, plan, pricingUrl, signInUrl, worksheetsUrl, qrUrl })
 *
 * One DOM module with no React and no Next import, so the website mounts it inside the workspace page
 * (app/[locale]/workspace/classes/ClassesClient.tsx) and the local class preview (scripts/class-results/dev-server.js)
 * serves the very same code over an in-memory database, where a robot plays it (tests/teacher-app.js).
 *
 * What a teacher does here: make a class (first names or nicknames + a picture each, or numbers only), paste the
 * address of pages to assign, show the class link or its QR code, and read the results — by child, and for a Level
 * Set by level. Reading and deleting work without an active plan; making and assigning need one (the API decides,
 * this screen only hides the buttons that would be refused).
 *
 * Without a plan and without classes the screen shows an EXAMPLE dashboard with made-up children (operator ruling
 * 2026-11-11: no trial class).
 *
 * Every text a teacher typed is written with textContent. Strings: frontend/messages/classes/<locale>.json.
 */
import { SEAT_ICONS, SEATS_PER_CLASS, CLASSES_PER_TEACHER, ASSIGNMENTS_PER_CLASS, LOCALES } from './store';
import type { Band, Cell, LadderSummary, LevelStatus } from './store';

export interface ClassesOptions {
  locale: string;
  strings: Record<string, string>;
  /** the site origin for the class link a teacher copies (https://www.lessoncraftstudio.com) */
  origin: string;
  signedIn: boolean;
  /** the teacher's plan is usable now */
  usable: boolean;
  /** the plan's name as the pricing page writes it */
  plan?: string;
  /** null = the pricing page is not public: no plan button */
  pricingUrl?: string | null;
  signInUrl: string;
  worksheetsUrl?: string;
  /** the address of a QR picture for a link */
  qrUrl: (link: string) => string;
}

interface ClassView { id: string; name: string; code: string; namesMode: 'names' | 'numbers'; locale: string; lastUsedAt: string }
interface SeatView { id: string; seatNo: number; displayName: string | null; icon: string }
interface AssignmentView { id: string; kind: 'deck' | 'ladder' | 'maker' | 'activity'; title: string; closed: boolean; position: number; levels: string[] | null }
interface ClassData { class: ClassView; seats: SeatView[]; assignments: AssignmentView[]; canEdit?: boolean; names?: boolean }
interface Results extends ClassData { cells: Record<string, Record<string, Cell>> }
interface ListItem { id: string; name: string; code: string; namesMode: string; locale: string; seats: number; assignments: number; lastUsedAt: string }
type Tab = 'results' | 'skills' | 'children' | 'work' | 'link';
type SkillBand = Band | 'played';
type NextStep =
  | { kind: 'set'; title: string; link: string }
  | { kind: 'activity'; title: string; link: string }
  | { kind: 'tool'; title: string; href: string }
  | { kind: 'unit'; title: string; unit: string; n: number; href: string };
interface SkillGroupView {
  key: string; fw: string | null; code: string | null; titles: string[]; outside: boolean;
  work: Array<{ id: string; title: string; kind: string }>;
  bands: Record<string, SkillBand>;
  counts: { high: number; mid: number; low: number; played: number; none: number };
  next: NextStep[];
}
interface Skills {
  class: ClassView; seats: SeatView[]; curriculum: { key: string; name: string }; curricula: Array<{ key: string; name: string }>;
  groups: SkillGroupView[]; other: Array<{ id: string; title: string; kind: string }>; canEdit?: boolean;
}
type Kid = Node | string | null | undefined | false;

const LANGUAGE_NAMES: Record<string, string> = { en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', pt: 'Português', it: 'Italiano', nl: 'Nederlands', sv: 'Svenska', da: 'Dansk', no: 'Norsk', fi: 'Suomi' };
const DATE_LOCALE: Record<string, string> = { en: 'en-US', de: 'de-DE', fr: 'fr-FR', es: 'es-MX', pt: 'pt-BR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE', da: 'da-DK', no: 'nb-NO', fi: 'fi-FI' };

export const CLASSES_CSS = `
.lcsc{font-family:var(--font-nunito),'Nunito',system-ui,sans-serif;color:#14322D;font-size:15px;line-height:1.45}
.lcsc *{box-sizing:border-box}
.lcsc h1{font-family:var(--font-baloo-2),'Baloo 2',sans-serif;font-weight:800;font-size:2rem;line-height:1.15;letter-spacing:-.02em;margin:0 0 8px}
.lcsc h2{font-family:var(--font-baloo-2),'Baloo 2',sans-serif;font-weight:700;font-size:1.5rem;line-height:1.2;margin:0}
.lcsc h3{font-family:var(--font-baloo-2),'Baloo 2',sans-serif;font-weight:700;font-size:1.15rem;line-height:1.25;margin:0 0 8px}
.lcsc p{margin:0 0 10px}
.lcsc .c-intro{max-width:46rem;color:#3D4F49;margin-bottom:20px}
.lcsc .c-card{background:#FFFDF8;border:1px solid #CFC5AE;border-radius:16px;box-shadow:0 1px 2px rgba(84,66,39,.12);padding:18px;margin-bottom:18px}
.lcsc .c-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px}
.lcsc .c-grow{flex:1;min-width:0}
.lcsc .c-muted{color:#5E706A;font-size:.875rem}
.lcsc .c-banner{background:#FBEBC8;border:1px solid #E3C77A;border-radius:12px;padding:12px 14px;margin-bottom:18px;color:#4A3500}
.lcsc .c-badge{display:inline-block;background:#E5E3F2;color:#3B3870;border-radius:999px;padding:3px 12px;font-size:.8125rem;font-weight:700;margin-bottom:10px}
.lcsc button,.lcsc .c-btn{font:inherit;font-weight:700;cursor:pointer;min-height:44px;padding:8px 18px;border-radius:999px;border:2px solid #146B5E;background:#FFFDF8;color:#146B5E;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:6px}
.lcsc button:hover,.lcsc .c-btn:hover{background:#EEF6F2}
.lcsc button:focus-visible,.lcsc .c-btn:focus-visible,.lcsc input:focus-visible,.lcsc textarea:focus-visible,.lcsc select:focus-visible,.lcsc a:focus-visible{outline:3px solid #F2784B;outline-offset:2px}
.lcsc button.c-primary,.lcsc .c-btn.c-primary{background:#146B5E;color:#FFFDF8}
.lcsc button.c-primary:hover,.lcsc .c-btn.c-primary:hover{background:#0F5A4F}
.lcsc .c-btn.c-cta{background:#F2784B;border-color:#F2784B;color:#14322D}
.lcsc button.c-danger{border-color:#B5503F;color:#8A2A12}
.lcsc button.c-danger:hover{background:#FBE9E4}
.lcsc button.c-quiet{border-color:transparent;padding:8px 10px;text-decoration:underline}
.lcsc button[disabled]{opacity:.55;cursor:default}
.lcsc label{display:block;font-weight:700;margin:12px 0 4px}
.lcsc input[type=text],.lcsc input[type=number],.lcsc input[type=url],.lcsc textarea,.lcsc select{font:inherit;width:100%;max-width:30rem;min-height:44px;padding:9px 12px;border:1px solid #BDB29A;border-radius:10px;background:#F5F1E6;color:#14322D}
.lcsc textarea{min-height:150px;resize:vertical}
.lcsc .c-radio{display:flex;gap:10px;align-items:flex-start;margin:8px 0;font-weight:400}
.lcsc .c-radio input{width:22px;height:22px;margin:2px 0 0;flex:none}
.lcsc .c-radio b{display:block}
.lcsc .c-err{color:#8A2A12;font-weight:700;margin:10px 0 0}
.lcsc .c-ok{color:#0F5A47;font-weight:700;margin:10px 0 0}
.lcsc .c-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;margin:0 0 18px;padding:0;list-style:none}
.lcsc .c-list .c-card{margin:0;display:flex;flex-direction:column;gap:6px}
.lcsc .c-tabs{display:flex;gap:4px;overflow-x:auto;border-bottom:1px solid #CBC0A9;margin:14px 0 18px;scrollbar-width:none}
.lcsc .c-tabs button{border:0;border-radius:0;background:none;color:#3D4F49;min-height:46px;padding:10px 10px;white-space:nowrap;border-bottom:3px solid transparent;flex:none}
.lcsc .c-tabs button[aria-current=true]{color:#14322D;border-bottom-color:#146B5E}
.lcsc .c-count{background:#FFFDF8;border-radius:999px;padding:1px 7px;font-size:.6875rem;margin-left:2px}
.lcsc .c-scroll{overflow-x:auto;margin:0 -18px;padding:0 18px}
.lcsc table{border-collapse:separate;border-spacing:0;width:100%;font-size:.875rem}
.lcsc th,.lcsc td{padding:8px 10px;text-align:left;border-bottom:1px solid #E3DCC9;vertical-align:middle}
.lcsc thead th{font-weight:700;color:#3D4F49;vertical-align:bottom;min-width:120px;max-width:190px}
.lcsc thead th small{display:block;font-weight:400;color:#5E706A}
.lcsc th.c-who,.lcsc td.c-who{position:sticky;left:0;background:#FFFDF8;min-width:150px;z-index:1}
.lcsc td.c-who button{border:0;background:none;padding:2px 0;min-height:44px;border-radius:8px;color:#14322D;text-align:left;gap:8px;justify-content:flex-start;width:100%}
.lcsc td.c-who button:hover{background:#F5F1E6}
.lcsc .c-face{width:34px;height:34px;object-fit:contain;flex:none}
.lcsc .c-face.c-big{width:56px;height:56px}
.lcsc .c-chip{display:inline-flex;align-items:center;gap:4px;border-radius:8px;padding:3px 8px;font-weight:700;white-space:nowrap;margin:1px 3px 1px 0;font-variant-numeric:tabular-nums}
.lcsc .c-chip[data-band=high]{background:#DDEFE6;color:#0F5A47}
.lcsc .c-chip[data-band=mid]{background:#FBEBC8;color:#5C4000}
.lcsc .c-chip[data-band=low]{background:#F9D9CF;color:#8A2A12}
.lcsc .c-chip[data-band=none]{background:#ECE7DB;color:#3D4F49}
.lcsc .c-skill{border-top:1px solid #E3DAC6;padding:16px 0 14px}
.lcsc .c-skill:first-of-type{border-top:0}
.lcsc .c-skill h3{margin:0 0 4px;font-size:1.02rem;line-height:1.35;color:#14322D;font-weight:800}
.lcsc .c-skill h3 .c-code{display:inline-block;background:#146B5E;color:#FBF3E4;border-radius:8px;padding:1px 8px;margin-right:8px;font-size:.84rem;font-weight:700;white-space:nowrap}
.lcsc .c-skill .c-line{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px;margin:6px 0 0}
.lcsc .c-skill .c-next{margin-top:10px}
.lcsc .c-skill .c-next a{color:#0F5A47;font-weight:700}
.lcsc .c-chip[data-now=true]{box-shadow:0 0 0 2px #146B5E}
.lcsc .c-again{color:#5E706A;font-size:.75rem;white-space:nowrap}
.lcsc .c-legend{display:flex;flex-wrap:wrap;gap:6px 14px;margin:14px 0 0;font-size:.8125rem;color:#3D4F49}
.lcsc .c-seg{display:inline-flex;border:2px solid #146B5E;border-radius:999px;overflow:hidden}
.lcsc .c-seg button{border:0;border-radius:0;min-height:40px;padding:6px 16px}
.lcsc .c-seg button[aria-pressed=true]{background:#146B5E;color:#FFFDF8}
.lcsc .c-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-top:14px}
.lcsc .c-col{background:#F5F1E6;border:1px solid #E3DCC9;border-radius:12px;padding:12px}
.lcsc .c-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.lcsc .c-col li{display:flex;align-items:center;gap:8px}
.lcsc .c-seatrow{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #E3DCC9}
.lcsc .c-seatrow input[type=text]{max-width:14rem}
.lcsc .c-no{font-family:var(--font-baloo-2),'Baloo 2',sans-serif;font-weight:700;font-size:1.15rem;min-width:2.2rem;text-align:right;color:#146B5E}
.lcsc .c-picker{display:flex;flex-wrap:wrap;gap:6px;width:100%;padding:10px;background:#F5F1E6;border:1px solid #E3DCC9;border-radius:12px}
.lcsc .c-picker[hidden]{display:none}
.lcsc .c-legend .c-chip{min-width:26px;height:16px;padding:0;margin:0;vertical-align:middle}
.lcsc .c-picker button{border:2px solid transparent;background:#FFFDF8;border-radius:12px;padding:4px;min-height:0}
.lcsc .c-picker button:hover{border-color:#146B5E}
.lcsc .c-linkbox{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:1.05rem;background:#F5F1E6;border:1px solid #E3DCC9;border-radius:10px;padding:12px 14px;overflow-wrap:anywhere;user-select:all}
.lcsc .c-qr{width:200px;height:200px;border:1px solid #E3DCC9;border-radius:12px;background:#fff}
.lcsc .c-confirm{display:inline-flex;flex-wrap:wrap;align-items:center;gap:8px;background:#FBE9E4;border:1px solid #D9A79E;border-radius:12px;padding:8px 12px}
.lcsc .c-steps{margin:0;padding-left:1.4rem}
.lcsc .c-steps li{margin:6px 0}
.lcsc .c-detail{background:#F5F1E6;border:1px solid #E3DCC9;border-radius:12px;padding:14px;margin-top:14px}
.lcsc .c-detail dl{margin:8px 0 12px}
.lcsc .c-detail dt{font-weight:700;margin-top:8px}
.lcsc .c-detail dd{margin:2px 0 0}
@media (max-width:520px){.lcsc h1{font-size:1.7rem}.lcsc .c-card{padding:14px}.lcsc .c-scroll{margin:0 -14px;padding:0 14px}}
`;

function h(tag: string, attrs?: Record<string, unknown> | null, ...kids: Kid[]): HTMLElement {
  const e = document.createElement(tag);
  if (attrs) for (const k of Object.keys(attrs)) {
    const v = attrs[k];
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') e.className = String(v);
    else if (k === 'text') e.textContent = String(v);
    else if (k.slice(0, 2) === 'on' && typeof v === 'function') e.addEventListener(k.slice(2), v as EventListener);
    else e.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of kids) if (c) e.append(c);
  return e;
}

function iconUrl(key: string, size: 1 | 2): string {
  if (!/^[a-z ]+\/[a-z_]+$/.test(key)) return '';
  const p = key.split('/');
  return '/image-library-webp/themes/' + encodeURIComponent(p[0]) + '/' + encodeURIComponent(p[1]) + '@' + size + 'x.webp';
}

export function mountClasses(root: HTMLElement, o: ClassesOptions): { destroy: () => void } {
  const plan = o.plan || 'Teacher';
  const t = (key: string, vars?: Record<string, string | number>): string => {
    let s = o.strings[key] != null ? o.strings[key] : key;
    const all: Record<string, string | number> = Object.assign({ plan }, vars || {});
    for (const k of Object.keys(all)) s = s.split('{' + k + '}').join(String(all[k]));
    return s;
  };
  const dateLocale = DATE_LOCALE[o.locale] || 'en-US';
  const day = (iso: string) => { try { return new Date(iso).toLocaleDateString(dateLocale, { year: 'numeric', month: 'short', day: 'numeric' }); } catch { return ''; } };
  const clock = (d: Date) => { try { return d.toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' }); } catch { return ''; } };

  let dead = false;
  let timer: ReturnType<typeof setInterval> | null = null;
  const st: { view: 'list' | 'class' | 'new'; id: string | null; tab: Tab; mode: 'child' | 'level'; setId: string | null; openSeat: string | null; usable: boolean; signedIn: boolean; names: boolean; confirmed: boolean; confirmVersion: string } =
    // confirmed: has she ticked the confirmation of today's text? Until the server says yes, the form asks for it.
    // names: may this teacher keep first names? The server says so with every list and every class; until it does, no.
    { view: 'list', id: null, tab: 'results', mode: 'child', setId: null, openSeat: null, usable: o.usable, signedIn: o.signedIn, names: false, confirmed: false, confirmVersion: '' };

  if (!document.getElementById('lcsc-style')) document.head.append(h('style', { id: 'lcsc-style', text: CLASSES_CSS }));
  root.classList.add('lcsc');

  async function api(method: string, path: string, body?: unknown): Promise<{ status: number; body: any }> { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const r = await fetch(path, { method, credentials: 'same-origin', cache: 'no-store', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
      let j = null;
      try { j = await r.json(); } catch { /* no body */ }
      if (r.status === 401) st.signedIn = false;
      return { status: r.status, body: j };
    } catch { return { status: 0, body: null }; }
  }
  const errorText = (r: { status: number; body: any }): string => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const e = r.body && r.body.error;
    if (e === 'bad_name') return t('errClassName');
    if (e === 'confirm_first') return t('errConfirm');
    if (e === 'seat_cap') return t('errSeatCap', { n: SEATS_PER_CLASS });
    if (e === 'class_cap') return t('errClassCap', { n: CLASSES_PER_TEACHER });
    if (e === 'no_names') return t('errNoNames');
    if (e === 'bad_count') return t('errCount', { n: SEATS_PER_CLASS });
    if (e === 'subscription_required') return t('errPlan');
    if (e === 'icon_taken') return t('errIconTaken');
    if (e === 'bad_link') return t('errLink');
    if (e === 'link_not_found') return t('errLinkNotFound');
    if (e === 'print_only') return t('errPrintOnly');
    if (e === 'assignment_cap') return t('errWorkCap', { n: ASSIGNMENTS_PER_CLASS });
    return t('error');
  };

  const face = (icon: string, big?: boolean) => { const u = iconUrl(icon, 1); return h('img', { class: 'c-face' + (big ? ' c-big' : ''), alt: '', src: u || null, srcset: u ? u + ' 1x, ' + iconUrl(icon, 2) + ' 2x' : null, loading: 'lazy' }); };
  const seatLabel = (s: SeatView) => s.displayName || t('seatNumber', { n: s.seatNo });
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
  const show = (...kids: Kid[]) => { root.replaceChildren(...(kids.filter(Boolean) as Node[])); };

  /** a button that asks once more, in place, before a removal */
  function confirmButton(label: string, question: string, act: () => void, cls = 'c-danger'): HTMLElement {
    const wrap = h('span', { 'data-confirm': label });
    const first = () => {
      const b = h('button', { type: 'button', class: cls, text: label });
      b.addEventListener('click', () => {
        const yes = h('button', { type: 'button', class: 'c-danger', 'data-yes': '', text: t('yes'), onclick: () => act() });
        const no = h('button', { type: 'button', text: t('no'), onclick: () => wrap.replaceChildren(first()) });
        wrap.replaceChildren(h('span', { class: 'c-confirm', role: 'alert' }, h('span', { text: question }), yes, no));
        no.focus();
      });
      return b;
    };
    wrap.append(first());
    return wrap;
  }

  // ── the results, drawn from the API's own shape (the example dashboard feeds the same function) ──
  const bandOfStatus = (s: LevelStatus | null): string => (s === 'passed' ? 'high' : s === 'practising' ? 'mid' : s === 'struggled' ? 'low' : 'none');
  const statusWord = (s: LevelStatus | null) => (s === 'passed' ? t('statusPassed') : s === 'practising' ? t('statusPractising') : s === 'struggled' ? t('statusStruggled') : t('statusPlayed'));
  const bandWord = (b: Band | null) => (b === 'high' ? t('legendHigh') : b === 'mid' ? t('legendMid') : b === 'low' ? t('legendLow') : t('legendPlayed'));

  function ladderChips(l: LadderSummary): HTMLElement {
    const box = h('span');
    for (const lv of l.levels) {
      if (!lv.status) continue;
      const now = !l.mastered && l.current === lv.level;
      const text = t('levelShort', { n: lv.n }) + (lv.total != null ? ' ' + lv.right + '/' + lv.total : '');
      const title = lv.total != null ? t('ladderLine', { n: lv.n, status: statusWord(lv.status), right: lv.right as number, total: lv.total }) : t('ladderLinePlayed', { n: lv.n });
      box.append(h('span', { class: 'c-chip', 'data-band': bandOfStatus(lv.status), 'data-now': now ? 'true' : null, title, text }));
    }
    if (l.mastered) box.append(h('span', { class: 'c-again', text: '✓ ' + t('ladderMastered') }));
    return box;
  }
  function pageChip(c: Cell): HTMLElement {
    const f = c.first;
    const box = h('span');
    if (!f) return box;
    if (f.total != null) box.append(h('span', { class: 'c-chip', 'data-band': f.band || 'none', title: t('cellOf', { right: f.right as number, total: f.total }) + ' — ' + bandWord(f.band), text: f.right + '/' + f.total }));
    else box.append(h('span', { class: 'c-chip', 'data-band': 'none', title: t('legendPlayed'), text: f.finished ? t('cellFinished') : t('cellTried') }));
    if (c.checks > 1) box.append(h('span', { class: 'c-again', text: t('cellChecks', { n: c.checks }) }));
    return box;
  }
  function ladderSentences(l: LadderSummary): string {
    const parts = l.levels.filter((lv) => lv.status).map((lv) => (lv.total != null ? t('ladderLine', { n: lv.n, status: statusWord(lv.status), right: lv.right as number, total: lv.total }) : t('ladderLinePlayed', { n: lv.n })));
    const cur = l.levels.find((lv) => lv.level === l.current);
    parts.push(l.mastered ? t('ladderMastered') : cur ? t('ladderNow', { n: cur.n }) : '');
    return parts.filter(Boolean).join(' · ');
  }

  function resultsView(d: Results, opt: { demo?: boolean; onDelete?: (seat: SeatView) => void; onRefresh?: () => void; stamp?: Date }): HTMLElement {
    const box = h('div', { 'data-results': '' });
    const sets = d.assignments.filter((a) => a.kind === 'ladder');
    if (st.mode === 'level' && !sets.length) st.mode = 'child';
    const any = d.seats.some((s) => d.cells[s.id] && Object.keys(d.cells[s.id]).length > 0);
    const seg = (mode: 'child' | 'level', label: string) => h('button', { type: 'button', 'aria-pressed': String(st.mode === mode), 'data-mode': mode, text: label, onclick: () => { st.mode = mode; box.replaceWith(resultsView(d, opt)); } });
    const top = h('div', { class: 'c-row' });
    if (sets.length) top.append(h('span', { class: 'c-seg' }, seg('child', t('byChild')), seg('level', t('byLevel'))));
    top.append(h('span', { class: 'c-grow' }));
    if (opt.stamp) top.append(h('span', { class: 'c-muted', 'data-stamp': '', text: t('updated', { time: clock(opt.stamp) }) }));
    if (opt.onRefresh) top.append(h('button', { type: 'button', 'data-act': 'refresh', text: t('update'), onclick: opt.onRefresh }));
    box.append(top);
    if (!any) { box.append(h('p', { class: 'c-muted', style: 'margin-top:14px', text: t('resultsNone') })); return box; }

    if (st.mode === 'level') {
      const set = sets.find((a) => a.id === st.setId) || sets[0];
      if (sets.length > 1) {
        const sel = h('select', { 'aria-label': t('pickSet'), style: 'margin-top:12px', onchange: (ev: Event) => { st.setId = (ev.target as HTMLSelectElement).value; box.replaceWith(resultsView(d, opt)); } }) as HTMLSelectElement;
        for (const a of sets) sel.append(h('option', { value: a.id, selected: a.id === set.id, text: a.title }));
        box.append(sel);
      } else box.append(h('h3', { style: 'margin-top:14px', text: set.title }));
      const groups: Array<{ key: string; title: string; seats: SeatView[] }> = (set.levels || []).map((lv, i) => ({ key: lv, title: t('level', { n: i + 1 }), seats: [] }));
      const finished = { key: 'finished', title: t('finished'), seats: [] as SeatView[] };
      const fresh = { key: 'new', title: t('notStarted'), seats: [] as SeatView[] };
      for (const s of d.seats) {
        const c = d.cells[s.id] && d.cells[s.id][set.id];
        const l = c && c.ladder;
        if (!l) { fresh.seats.push(s); continue; }
        if (l.mastered) { finished.seats.push(s); continue; }
        const g = groups.find((x) => x.key === l.current);
        (g ? g.seats : fresh.seats).push(s);
      }
      const cols = h('div', { class: 'c-cols', 'data-by-level': '' });
      for (const g of [...groups, finished, fresh]) {
        const ul = h('ul');
        for (const s of g.seats) ul.append(h('li', null, face(s.icon), h('span', { text: seatLabel(s) })));
        cols.append(h('section', { class: 'c-col', 'data-group': g.key }, h('h3', { text: g.title + ' (' + g.seats.length + ')' }), ul));
      }
      box.append(cols);
    } else {
      const head = h('tr', null, h('th', { class: 'c-who', scope: 'col', text: t('colChild') }));
      for (const a of d.assignments) head.append(h('th', { scope: 'col' }, h('span', { text: a.title }), h('small', { text: (a.kind === 'ladder' ? t('kindLadder') : a.kind === 'maker' ? t('kindMaker') : a.kind === 'activity' ? t('kindActivity') : t('kindDeck')) + (a.closed ? ' · ' + t('workHidden') : '') })));
      const body = h('tbody');
      for (const s of d.seats) {
        const row = h('tr', { 'data-seat': s.id });
        const who = h('button', { type: 'button', 'aria-expanded': String(st.openSeat === s.id), onclick: () => { st.openSeat = st.openSeat === s.id ? null : s.id; box.replaceWith(resultsView(d, opt)); } }, face(s.icon), h('span', { text: seatLabel(s) }));
        row.append(h('td', { class: 'c-who' }, who));
        for (const a of d.assignments) {
          const c = d.cells[s.id] && d.cells[s.id][a.id];
          row.append(h('td', { 'data-cell': a.id }, c ? (c.ladder ? ladderChips(c.ladder) : pageChip(c)) : h('span', { class: 'c-muted', text: '–' })));
        }
        body.append(row);
      }
      box.append(h('div', { class: 'c-scroll', style: 'margin-top:14px' }, h('table', null, h('thead', null, head), body)));
      const open = d.seats.find((s) => s.id === st.openSeat);
      if (open) {
        const dl = h('dl');
        let n = 0;
        for (const a of d.assignments) {
          const c = d.cells[open.id] && d.cells[open.id][a.id];
          if (!c) continue;
          n++;
          const f = c.first;
          const line = c.ladder ? ladderSentences(c.ladder)
            : f && f.total != null ? t('cellOf', { right: f.right as number, total: f.total }) + ' — ' + bandWord(f.band) + (c.checks > 1 ? ' · ' + t('cellChecks', { n: c.checks }) : '') + ' · ' + day(f.at)
            : f ? (f.finished ? t('cellFinished') : t('cellTried')) + ' · ' + day(f.at) : '';
          dl.append(h('dt', { text: a.title }), h('dd', { text: line }));
        }
        const detail = h('section', { class: 'c-detail', 'data-detail': open.id }, h('div', { class: 'c-row' }, face(open.icon, true), h('h3', { style: 'margin:0', text: seatLabel(open) })), n ? dl : h('p', { class: 'c-muted', style: 'margin-top:8px', text: t('detailNone') }));
        if (n && opt.onDelete) detail.append(confirmButton(t('deleteResults'), t('deleteResultsConfirm'), () => (opt.onDelete as (s: SeatView) => void)(open)));
        box.append(detail);
      }
    }
    const legend = h('div', { class: 'c-legend' });
    for (const [band, word] of [['high', t('legendHigh')], ['mid', t('legendMid')], ['low', t('legendLow')], ['none', t('legendPlayed')]]) legend.append(h('span', null, h('span', { class: 'c-chip', 'data-band': band, text: ' ' }), ' ' + word));
    if (sets.length) legend.append(h('span', null, h('span', { class: 'c-chip', 'data-band': 'none', 'data-now': 'true', text: ' ' }), ' ' + t('legendNow')), h('span', { text: t('legendLevels', { short: t('levelShort', { n: 1 }), long: t('level', { n: 1 }) }) }));
    box.append(legend, h('p', { class: 'c-muted', style: 'margin-top:8px', text: t('firstCheck') }));
    return box;
  }

  /** the example dashboard: the strategy note's own case (Max passed Level 2, struggled on Level 3) */
  function demo(): Results {
    const names = ['Max', 'Ana', 'Tom', 'Lena', 'Omar', 'Yuki'];
    const seats = names.map((n, i) => ({ id: 'demo' + i, seatNo: i + 1, displayName: n, icon: SEAT_ICONS[i] }));
    const at = new Date().toISOString();
    const lv = (level: 'easy' | 'core' | 'hard', n: number, right: number | null, total: number | null, status: LevelStatus | null) => ({ level, n, pages: status ? 1 : 0, right, total, status, at: status ? at : null });
    const ladder = (easy: [number, number, LevelStatus] | null, core: [number, number, LevelStatus] | null, hard: [number, number, LevelStatus] | null, current: 'easy' | 'core' | 'hard' | null): Cell =>
      ({ plays: 2, first: null, checks: 1, ladder: { levels: [lv('easy', 1, easy ? easy[0] : null, easy ? easy[1] : null, easy ? easy[2] : null), lv('core', 2, core ? core[0] : null, core ? core[1] : null, core ? core[2] : null), lv('hard', 3, hard ? hard[0] : null, hard ? hard[1] : null, hard ? hard[2] : null)], current, mastered: current === null } });
    const page = (right: number | null, total: number | null, band: Band | null, checks: number, finished: boolean): Cell => ({ plays: 1, first: { right, total, band, finished, at }, checks, ladder: null });
    return {
      class: { id: 'demo', name: t('demoClass'), code: '', namesMode: 'names', locale: o.locale, lastUsedAt: at },
      seats,
      assignments: [
        { id: 'set', kind: 'ladder', title: t('demoSet'), closed: false, position: 1, levels: ['easy', 'core', 'hard'] },
        { id: 'deck', kind: 'deck', title: t('demoDeck'), closed: false, position: 2, levels: null },
        { id: 'maze', kind: 'deck', title: t('demoMaze'), closed: false, position: 3, levels: null },
      ],
      cells: {
        demo0: { set: ladder(null, [5, 5, 'passed'], [2, 6, 'struggled'], 'core'), deck: page(4, 6, 'mid', 2, false), maze: page(null, null, null, 1, true) },
        demo1: { set: ladder(null, [6, 6, 'passed'], [5, 5, 'passed'], null), deck: page(6, 6, 'high', 1, true) },
        demo2: { set: ladder([5, 6, 'passed'], [2, 6, 'struggled'], null, 'core'), maze: page(null, null, null, 1, false) },
        demo3: { set: ladder(null, [4, 6, 'practising'], null, 'core'), deck: page(3, 6, 'low', 3, false) },
        demo4: { deck: page(5, 6, 'high', 1, false) },
        demo5: {},
      },
    };
  }

  // ── screens ──
  function header(): HTMLElement { return h('header', null, h('h1', { text: t('title') }), h('p', { class: 'c-intro', text: t('intro') })); }
  function planCard(): HTMLElement {
    return h('section', { class: 'c-card', 'data-plan': '' }, h('h2', { text: t('planTitle') }), h('p', { style: 'margin-top:8px', text: t('planBody') }),
      o.pricingUrl ? h('a', { class: 'c-btn c-cta', href: o.pricingUrl, text: t('planCta') }) : null);
  }
  function demoCard(): HTMLElement {
    const d = demo();
    return h('section', { class: 'c-card', 'data-demo': '' }, h('span', { class: 'c-badge', text: t('demoBadge') }), h('h2', { style: 'margin-bottom:12px', text: d.class.name }), resultsView(d, { demo: true }));
  }

  async function list(): Promise<void> {
    stop();
    st.view = 'list'; st.id = null;
    if (!st.signedIn) {
      show(header(), h('section', { class: 'c-card', 'data-signin': '' }, h('h2', { text: t('signInTitle') }), h('p', { style: 'margin-top:8px', text: t('signInBody') }), h('a', { class: 'c-btn c-primary', href: o.signInUrl, text: t('signInCta') })), demoCard());
      return;
    }
    show(header(), h('p', { class: 'c-muted', text: t('loading') }));
    const r = await api('GET', '/api/classes');
    if (dead) return;
    if (r.status === 401) return list();
    if (r.status !== 200) { show(header(), h('p', { class: 'c-err', text: t('error') }), h('button', { type: 'button', text: t('retry'), onclick: () => { void list(); } })); return; }
    const items: ListItem[] = r.body.items || [];
    st.usable = !!r.body.canEdit; // what the server lets this account do, not what the page assumed
    st.names = r.body.names === true;
    st.confirmed = r.body.confirmed === true;
    st.confirmVersion = typeof r.body.confirmVersion === 'string' ? r.body.confirmVersion : '';
    const kids: Kid[] = [header()];
    if (!st.usable && !items.length) { kids.push(planCard(), demoCard()); show(...kids); return; }
    if (!st.usable) kids.push(h('p', { class: 'c-banner', 'data-lapsed': '', text: t('lapsedBanner') }));
    if (st.usable) kids.push(h('p', null, h('button', { type: 'button', class: 'c-primary', 'data-act': 'new', text: t('newClass'), onclick: () => newClass() })));
    if (!items.length) kids.push(h('p', { class: 'c-muted', text: t('noClasses') }));
    const ul = h('ul', { class: 'c-list' });
    for (const c of items) {
      ul.append(h('li', { class: 'c-card', 'data-class': c.id },
        h('h2', { text: c.name }),
        h('span', { class: 'c-muted', text: (c.seats === 1 ? t('childrenOne') : t('childrenMany', { n: c.seats })) + ' · ' + (c.assignments === 1 ? t('worksheetsOne') : t('worksheetsMany', { n: c.assignments })) }),
        h('span', { class: 'c-muted', text: t('lastUsed', { date: day(c.lastUsedAt) }) }),
        h('span', { style: 'margin-top:8px' }, h('button', { type: 'button', class: 'c-primary', text: t('open'), 'aria-label': t('open') + ': ' + c.name, onclick: () => { void openClass(c.id, 'results'); } }))));
    }
    kids.push(ul);
    show(...kids);
  }

  function namesFields(mode: 'names' | 'numbers'): { box: HTMLElement; read: () => { names?: string; count?: number } } {
    const names = h('textarea', { id: 'lcsc-names', rows: 8, autocomplete: 'off', spellcheck: 'false' }) as HTMLTextAreaElement;
    const count = h('input', { id: 'lcsc-count', type: 'number', min: 1, max: SEATS_PER_CLASS, inputmode: 'numeric', style: 'max-width:8rem' }) as HTMLInputElement;
    const box = mode === 'names'
      ? h('div', null, h('label', { for: 'lcsc-names', text: t('formNames') }), h('p', { class: 'c-muted', text: t('formNamesHelp') }), names)
      : h('div', null, h('label', { for: 'lcsc-count', text: t('formCount') }), count);
    return { box, read: () => (mode === 'names' ? { names: names.value } : { count: Number(count.value) || 0 }) };
  }
  function languageSelect(current: string, id: string): HTMLSelectElement {
    const sel = h('select', { id, style: 'max-width:14rem' }) as HTMLSelectElement;
    for (const l of LOCALES) sel.append(h('option', { value: l, selected: l === current, text: LANGUAGE_NAMES[l] }));
    return sel;
  }

  function newClass(): void {
    stop();
    st.view = 'new';
    let mode: 'names' | 'numbers' = 'numbers';   // a class works under numbers; first names are a choice only where the server allows them
    const name = h('input', { id: 'lcsc-name', type: 'text', maxlength: 60, placeholder: t('formNamePlaceholder'), autocomplete: 'off' }) as HTMLInputElement;
    const lang = languageSelect(o.locale, 'lcsc-lang');
    const slot = h('div');
    let fields = namesFields(mode);
    slot.append(fields.box);
    const radio = (value: 'names' | 'numbers', title: string, help: string) => h('label', { class: 'c-radio' },
      h('input', { type: 'radio', name: 'lcsc-mode', value, checked: value === mode, onchange: () => { mode = value; fields = namesFields(mode); slot.replaceChildren(fields.box); } }),
      h('span', null, h('b', { text: title }), h('span', { class: 'c-muted', text: help })));
    const msg = h('p', { class: 'c-err', role: 'alert' });
    const go = h('button', { type: 'submit', class: 'c-primary', text: t('formCreate') }) as HTMLButtonElement;
    // before her first class: the confirmation, with the two documents it names (shown until the server has it)
    const tick = h('input', { type: 'checkbox', id: 'lcsc-confirm' }) as HTMLInputElement;
    const confirmBox = st.confirmed ? null : h('label', { class: 'c-radio', 'data-confirm-terms': 'tick', style: 'margin-top:14px' }, tick,
      h('span', null, h('span', { text: t('confirmText') }), h('span', { style: 'display:block;margin-top:6px' },
        h('a', { href: '/' + o.locale + '/privacy#classes', target: '_blank', rel: 'noopener', text: t('confirmPrivacy') }), ' · ',
        h('a', { href: '/' + o.locale + '/class-terms', target: '_blank', rel: 'noopener', text: t('confirmTerms') }))));
    const form = h('form', { class: 'c-card', 'data-form': 'new', novalidate: true, onsubmit: async (ev: Event) => {
      ev.preventDefault();
      msg.textContent = '';
      const f = fields.read();
      if (mode === 'numbers' && !((f.count as number) >= 1 && (f.count as number) <= SEATS_PER_CLASS)) { msg.textContent = t('errCount', { n: SEATS_PER_CLASS }); return; }
      if (!st.confirmed && !tick.checked) { msg.textContent = t('errConfirm'); return; }
      go.disabled = true;
      const r = await api('POST', '/api/classes', Object.assign({ name: name.value, namesMode: mode, locale: lang.value }, st.confirmed ? {} : { confirm: st.confirmVersion }, f));
      go.disabled = false;
      if (dead) return;
      if (r.status !== 201) { msg.textContent = errorText(r); return; }
      st.confirmed = true;
      await openClass(r.body.id, r.body.seats ? 'work' : 'children', r.body.refused && r.body.refused.length ? t('refused', { list: r.body.refused.join(', ') }) : '');
    } },
      h('h2', { text: t('newClass') }),
      h('label', { for: 'lcsc-name', text: t('formName') }), name,
      h('p', { class: 'c-muted', style: 'margin:4px 0 0', 'data-name-help': 'class', text: t('formNameHelp') }),
      st.names ? h('fieldset', { style: 'border:0;padding:0;margin:14px 0 0' }, h('legend', { style: 'font-weight:700;padding:0', text: t('formKind') }), radio('numbers', t('formNumbers'), t('formNumbersHelp')), radio('names', t('formNames'), t('formNamesHelp'))) : null,
      slot,
      h('label', { for: 'lcsc-lang', text: t('formLanguage') }), lang,
      confirmBox,
      msg,
      h('div', { class: 'c-row', style: 'margin-top:14px' }, go, h('button', { type: 'button', text: t('cancel'), onclick: () => { void list(); } })),
      h('p', { class: 'c-muted', style: 'margin-top:14px', text: t('privacyNote') }));
    show(header(), form);
    name.focus();
  }

  async function openClass(id: string, tab: Tab, note?: string): Promise<void> {
    stop();
    st.view = 'class'; st.id = id; st.tab = tab;
    const r = await api('GET', '/api/classes/' + id);
    if (dead) return;
    if (r.status === 401 || r.status === 404) return list();
    if (r.status !== 200) { show(header(), h('p', { class: 'c-err', text: t('error') }), h('button', { type: 'button', text: t('retry'), onclick: () => { void openClass(id, tab); } })); return; }
    const d: ClassData = r.body;
    const edit = !!d.canEdit;
    st.usable = edit;
    const link = o.origin + '/c/' + d.class.code;
    const body = h('div', { 'data-tab': tab });
    const tabs = h('nav', { class: 'c-tabs', 'aria-label': d.class.name });
    const tabButton = (k: Tab, label: string, n?: number) => h('button', { type: 'button', 'data-tab-button': k, 'aria-current': k === tab ? 'true' : null, onclick: () => { void openClass(id, k); } }, label, n != null ? h('span', { class: 'c-count', text: String(n) }) : null);
    tabs.append(tabButton('results', t('tabResults')), tabButton('skills', t('tabSkills')), tabButton('children', t('tabChildren'), d.seats.length), tabButton('work', t('tabWork'), d.assignments.length), tabButton('link', t('tabLink')));
    const top = h('div', null,
      h('p', null, h('button', { type: 'button', class: 'c-quiet', 'data-act': 'back', text: '← ' + t('back'), onclick: () => { void list(); } })),
      h('h1', { text: d.class.name }),
      !edit ? h('p', { class: 'c-banner', 'data-lapsed': '', text: t('lapsedBanner') }) : null,
      tabs,
      note ? h('p', { class: 'c-banner', 'data-note': '', text: note }) : null);
    show(top, body);
    const again = (k: Tab = tab, n?: string) => { void openClass(id, k, n); };

    if (tab === 'results') {
      const card = h('section', { class: 'c-card' });
      body.append(card);
      if (!d.seats.length || !d.assignments.length) {
        card.append(h('h2', { text: t('stepsTitle') }), h('ol', { class: 'c-steps' },
          h('li', null, h('button', { type: 'button', class: 'c-quiet', text: t('stepChildren'), onclick: () => again('children') }), d.seats.length ? ' ✓' : ''),
          h('li', null, h('button', { type: 'button', class: 'c-quiet', text: t('stepWork'), onclick: () => again('work') }), d.assignments.length ? ' ✓' : ''),
          h('li', null, h('button', { type: 'button', class: 'c-quiet', text: t('stepLink'), onclick: () => again('link') }))));
        return;
      }
      let last = '';
      const load = async (manual: boolean) => {
        const rr = await api('GET', '/api/classes/' + id + '/results');
        if (dead || st.view !== 'class' || st.id !== id || st.tab !== 'results') return;
        if (rr.status !== 200) { if (manual || !last) card.replaceChildren(h('p', { class: 'c-err', text: t('error') }), h('button', { type: 'button', text: t('retry'), onclick: () => { void load(true); } })); return; }
        const sig = JSON.stringify(rr.body.cells);
        if (!manual && sig === last) return;
        last = sig;
        card.replaceChildren(resultsView(rr.body as Results, {
          stamp: new Date(), onRefresh: () => { void load(true); },
          onDelete: async (seat) => { await api('DELETE', '/api/classes/' + id + '/seats/' + seat.id + '?results=1'); last = ''; void load(true); },
        }));
      };
      card.append(h('p', { class: 'c-muted', text: t('loading') }));
      await load(true);
      timer = setInterval(() => { if (!document.hidden) void load(false); }, 30000);
      return;
    }

    if (tab === 'skills') {
      const card = h('section', { class: 'c-card', 'data-skills': '' });
      body.append(card);
      let chosen: string | null = null;
      try { chosen = window.localStorage.getItem('lcs-class-curriculum:' + d.class.locale); } catch { /* no storage: the country's own curriculum */ }
      const load = async (): Promise<void> => {
        card.replaceChildren(h('p', { class: 'c-muted', text: t('loading') }));
        const rr = await api('GET', '/api/classes/' + id + '/skills' + (chosen ? '?curriculum=' + encodeURIComponent(chosen) : ''));
        if (dead || st.view !== 'class' || st.id !== id || st.tab !== 'skills') return;
        if (rr.status !== 200) { card.replaceChildren(h('p', { class: 'c-err', text: t('error') }), h('button', { type: 'button', text: t('retry'), onclick: () => { void load(); } })); return; }
        card.replaceChildren(skillsView(rr.body as Skills, {
          canEdit: edit,
          onCurriculum: (key) => { chosen = key; try { window.localStorage.setItem('lcs-class-curriculum:' + d.class.locale, key); } catch { /* not kept */ } void load(); },
          onAssign: async (step) => {
            const r2 = await api('POST', '/api/classes/' + id + '/assignments', { link: step.link });
            if (r2.status === 201 || r2.status === 200) again('skills', t('skillsAssigned', { title: step.title }));
            else again('skills', errorText(r2));
          },
        }));
      };
      await load();
      return;
    }

    if (tab === 'children') {
      const card = h('section', { class: 'c-card' });
      const used = new Set(d.seats.map((s) => s.icon));
      for (const s of d.seats) {
        const row = h('div', { class: 'c-seatrow', 'data-seat': s.id }, h('span', { class: 'c-no', text: String(s.seatNo) }), face(s.icon, true));
        const msg = h('span', { class: 'c-err', role: 'alert' });
        if (d.class.namesMode === 'names') {
          const input = h('input', { type: 'text', maxlength: 24, value: s.displayName || '', 'aria-label': t('childName') + ' ' + s.seatNo, autocomplete: 'off' }) as HTMLInputElement;
          row.append(input);
          if (edit) row.append(h('button', { type: 'button', 'data-act': 'rename', text: t('save'), onclick: async () => {
            const r2 = await api('PATCH', '/api/classes/' + id + '/seats/' + s.id, { displayName: input.value });
            if (r2.status === 200) again('children'); else msg.textContent = r2.body && r2.body.error === 'bad_name' ? t('errSeatName') : errorText(r2);
          } })); else input.disabled = true;
        } else row.append(h('span', { class: 'c-grow', text: t('seatNumber', { n: s.seatNo }) }));
        if (edit) {
          const picker = h('div', { class: 'c-picker', hidden: true, 'aria-label': t('pickPicture') });
          for (const icon of SEAT_ICONS) if (!used.has(icon)) picker.append(h('button', { type: 'button', 'data-icon': icon, 'aria-label': icon.split('/')[1].replace(/_/g, ' '), onclick: async () => {
            const r2 = await api('PATCH', '/api/classes/' + id + '/seats/' + s.id, { icon });
            if (r2.status === 200) again('children'); else msg.textContent = errorText(r2);
          } }, face(icon, true)));
          row.append(h('button', { type: 'button', 'data-act': 'picture', text: t('changePicture'), onclick: () => { picker.hidden = !picker.hidden; } }));
          row.append(confirmButton(t('removeChild'), t('removeChildConfirm'), async () => { await api('DELETE', '/api/classes/' + id + '/seats/' + s.id); again('children'); }), msg, picker);
        } else row.append(confirmButton(t('removeChild'), t('removeChildConfirm'), async () => { await api('DELETE', '/api/classes/' + id + '/seats/' + s.id); again('children'); }));
        card.append(row);
      }
      if (d.seats.length) card.append(h('div', { class: 'c-row', style: 'margin-top:14px' }, h('button', { type: 'button', 'data-act': 'print', text: t('printList'), onclick: () => printList(d, link) }), h('span', { class: 'c-muted', text: t('printHint') })));
      body.append(card);
      if (edit && d.seats.length < SEATS_PER_CLASS) {
        const fields = namesFields(d.class.namesMode);
        const msg = h('p', { class: 'c-err', role: 'alert' });
        body.append(h('form', { class: 'c-card', 'data-form': 'seats', novalidate: true, onsubmit: async (ev: Event) => {
          ev.preventDefault();
          const r2 = await api('POST', '/api/classes/' + id + '/seats', fields.read());
          if (r2.status === 201) again('children', r2.body.refused && r2.body.refused.length ? t('refused', { list: r2.body.refused.join(', ') }) : '');
          else msg.textContent = r2.body && r2.body.refused && r2.body.refused.length ? t('refused', { list: r2.body.refused.join(', ') }) : errorText(r2);
        } }, h('h2', { text: t('addChildren') }), fields.box, msg, h('div', { style: 'margin-top:12px' }, h('button', { type: 'submit', class: 'c-primary', text: t('add') })),
          h('p', { class: 'c-muted', style: 'margin-top:14px', text: t('privacyNote') })));
      }
      return;
    }

    if (tab === 'work') {
      const card = h('section', { class: 'c-card' });
      if (!d.assignments.length) card.append(h('p', { class: 'c-muted', text: t('workNone') }));
      for (const a of d.assignments) {
        const row = h('div', { class: 'c-seatrow', 'data-assignment': a.id },
          h('span', { class: 'c-no', text: String(d.assignments.indexOf(a) + 1) }),
          h('span', { class: 'c-grow' }, h('b', { text: a.title }), h('span', { class: 'c-muted', style: 'display:block', text: (a.kind === 'ladder' ? t('kindLadder') : a.kind === 'maker' ? t('kindMaker') : a.kind === 'activity' ? t('kindActivity') : t('kindDeck')) + (a.closed ? ' · ' + t('workHidden') : '') })));
        if (edit) row.append(h('button', { type: 'button', 'data-act': 'toggle', text: a.closed ? t('workShow') : t('workHide'), onclick: async () => { await api('PATCH', '/api/classes/' + id + '/assignments/' + a.id, { closed: !a.closed }); again('work'); } }));
        row.append(confirmButton(t('workRemove'), t('workRemoveConfirm'), async () => { await api('DELETE', '/api/classes/' + id + '/assignments/' + a.id); again('work'); }));
        card.append(row);
      }
      body.append(card);
      if (edit) {
        const input = h('input', { id: 'lcsc-link', type: 'url', placeholder: o.origin + '/…', autocomplete: 'off', style: 'max-width:100%' }) as HTMLInputElement;
        const msg = h('p', { class: 'c-err', role: 'alert' });
        body.append(h('form', { class: 'c-card', 'data-form': 'work', novalidate: true, onsubmit: async (ev: Event) => {
          ev.preventDefault();
          msg.textContent = '';
          const r2 = await api('POST', '/api/classes/' + id + '/assignments', { link: input.value });
          if (r2.status === 201) again('work');
          else if (r2.status === 200 && r2.body && r2.body.existing) again('work', t('workExisting'));
          else msg.textContent = errorText(r2);
        } }, h('h2', { text: t('add') }), h('label', { for: 'lcsc-link', text: t('workLabel') }), h('p', { class: 'c-muted', text: t('workHelp') }), input, msg,
          h('div', { class: 'c-row', style: 'margin-top:12px' }, h('button', { type: 'submit', class: 'c-primary', text: t('add') }), o.worksheetsUrl ? h('a', { class: 'c-btn', href: o.worksheetsUrl, target: '_blank', rel: 'noopener', text: t('workFind') }) : null)));
      }
      return;
    }

    // the class link and the settings
    const copy = h('button', { type: 'button', class: 'c-primary', 'data-act': 'copy', text: t('linkCopy') });
    copy.addEventListener('click', async () => {
      let ok = false;
      try { await navigator.clipboard.writeText(link); ok = true; } catch { /* an older browser, or no permission: copy the selected address instead */ }
      if (!ok) {
        try {
          const box = body.querySelector('[data-class-link]');
          const sel = window.getSelection();
          if (box && sel) { const range = document.createRange(); range.selectNodeContents(box); sel.removeAllRanges(); sel.addRange(range); ok = document.execCommand('copy'); }
        } catch { /* the address stays selected for the teacher to copy by hand */ }
      }
      if (ok) { copy.textContent = t('linkCopied'); setTimeout(() => { copy.textContent = t('linkCopy'); }, 2000); }
    });
    body.append(h('section', { class: 'c-card', 'data-link': '' }, h('h2', { text: t('linkTitle') }), h('p', { class: 'c-muted', style: 'margin-top:6px', text: t('linkHelp') }),
      !edit ? h('p', { class: 'c-banner', text: t('linkClosed') }) : null,
      h('div', { class: 'c-row', style: 'align-items:flex-start;gap:18px' },
        h('img', { class: 'c-qr', alt: t('linkQrAlt'), src: o.qrUrl(link), width: 200, height: 200 }),
        h('div', { class: 'c-grow' }, h('div', { class: 'c-linkbox', 'data-class-link': '', text: link }), h('div', { class: 'c-row', style: 'margin-top:12px' }, copy, h('a', { class: 'c-btn', href: '/c/' + d.class.code, target: '_blank', rel: 'noopener', text: t('linkOpen') }))))));
    const settings = h('section', { class: 'c-card', 'data-settings': '' }, h('h2', { text: t('settingsTitle') }));
    const msg = h('p', { class: 'c-err', role: 'alert' });
    if (edit) {
      const name = h('input', { id: 'lcsc-rename', type: 'text', maxlength: 60, value: d.class.name, autocomplete: 'off' }) as HTMLInputElement;
      const lang = languageSelect(d.class.locale, 'lcsc-lang2');
      settings.append(h('label', { for: 'lcsc-rename', text: t('formName') }), name, h('label', { for: 'lcsc-lang2', text: t('formLanguage') }), lang,
        h('div', { style: 'margin-top:12px' }, h('button', { type: 'button', class: 'c-primary', 'data-act': 'save', text: t('save'), onclick: async () => {
          const r2 = await api('PATCH', '/api/classes/' + id, { name: name.value, locale: lang.value });
          if (r2.status === 200) again('link', t('saved')); else msg.textContent = errorText(r2);
        } })), msg);
    }
    const danger = h('div', { class: 'c-row', style: 'margin-top:18px' });
    if (d.class.namesMode === 'names') danger.append(confirmButton(t('toNumbers'), t('toNumbersConfirm'), async () => { const r2 = await api('PATCH', '/api/classes/' + id, { namesMode: 'numbers' }); if (r2.status === 200) again('children'); else msg.textContent = errorText(r2); }));
    else if (edit && d.names === true) danger.append(h('button', { type: 'button', 'data-act': 'to-names', text: t('toNames'), onclick: async () => { const r2 = await api('PATCH', '/api/classes/' + id, { namesMode: 'names' }); if (r2.status === 200) again('children'); else msg.textContent = errorText(r2); } }));
    if (edit) danger.append(confirmButton(t('newLink'), t('newLinkConfirm'), async () => { const r2 = await api('PATCH', '/api/classes/' + id, { newCode: true }); if (r2.status === 200) again('link'); else msg.textContent = errorText(r2); }, ''));
    danger.append(confirmButton(t('deleteClass'), t('deleteClassConfirm'), async () => { await api('DELETE', '/api/classes/' + id); void list(); }));
    const docLink = (href: string, label: string) => h('a', { href: '/' + o.locale + href, target: '_blank', rel: 'noopener', text: label });
    settings.append(danger, h('p', { class: 'c-muted', style: 'margin-top:14px', text: t('retention') }),
      h('p', { class: 'c-muted', style: 'margin-top:8px', 'data-class-docs': 'links' }, docLink('/class-terms/parent-note', t('docsParentNote')), ' · ', docLink('/class-terms', t('confirmTerms')), ' · ', docLink('/privacy#classes', t('confirmPrivacy'))));
    body.append(settings);
  }

  /** a heading of the curriculum as one line of text: "Common Core 1.OA.C.6 · Operations and Algebraic Thinking" */
  const headingText = (g: SkillGroupView): string => [[g.fw, g.code].filter(Boolean).join(' '), g.titles.join(' › ')].filter(Boolean).join(' · ');
  const skillWord = (b: SkillBand | null) => (b === 'high' ? t('legendHigh') : b === 'mid' ? t('legendMid') : b === 'low' ? t('legendLow') : b === 'played' ? t('legendPlayed') : t('skillsNotYet'));

  /** the dashboard by curriculum: the class's work under the curriculum's headings, who needs what, the next step */
  function skillsView(d: Skills, opt: { canEdit: boolean; onCurriculum: (key: string) => void; onAssign: (step: { title: string; link: string }) => void }): HTMLElement {
    const box = h('div', { 'data-skills-view': d.curriculum.key });
    box.append(h('p', { class: 'c-intro', text: t('skillsIntro') }));
    const top = h('div', { class: 'c-row' });
    if (d.curricula.length > 1) {
      const sel = h('select', { id: 'c-curriculum', 'aria-label': t('skillsCurriculum') }) as HTMLSelectElement;
      for (const c of d.curricula) sel.append(h('option', { value: c.key, selected: c.key === d.curriculum.key ? 'selected' : null, text: c.name }));
      sel.onchange = () => opt.onCurriculum(sel.value);
      top.append(h('label', { for: 'c-curriculum', text: t('skillsCurriculum') }), sel);
    } else top.append(h('b', { 'data-curriculum-name': '', text: d.curriculum.name }));
    box.append(top);
    if (!d.groups.length && !d.other.length) { box.append(h('p', { class: 'c-muted', 'data-empty': '', text: t('skillsEmpty') })); return box; }
    if (d.groups.length) {
      top.append(
        h('button', { type: 'button', class: 'c-quiet', 'data-act': 'print-class', text: t('skillsPrintClass'), onclick: () => printSkills(d, 'class') }),
        h('button', { type: 'button', class: 'c-quiet', 'data-act': 'print-children', text: t('skillsPrintChildren'), onclick: () => printSkills(d, 'children') }));
      box.append(h('p', { class: 'c-muted', text: t('skillsPrintHint') }));
    }
    const names = (g: SkillGroupView, band: SkillBand) => d.seats.filter((x) => g.bands[x.id] === band).map(seatLabel).join(', ');
    for (const g of d.groups) {
      const sec = h('section', { class: 'c-skill', 'data-group': g.key });
      sec.append(h('h3', null, g.fw ? h('span', { class: 'c-code', text: [g.fw, g.code].filter(Boolean).join(' ') }) : null, g.titles.join(' › ')));
      if (g.outside) sec.append(h('p', { class: 'c-muted', 'data-outside': '', text: t('skillsOutside') }));
      sec.append(h('p', { class: 'c-muted', 'data-work': '', text: g.work.map((w) => w.title).join(' · ') }));
      for (const band of ['low', 'mid'] as const) if (g.counts[band]) sec.append(h('p', { class: 'c-line', 'data-band-line': band }, h('span', { class: 'c-chip', 'data-band': band, text: bandWord(band) + ': ' + g.counts[band] }), h('span', { text: names(g, band) })));
      const rest = h('p', { class: 'c-line', 'data-band-line': 'rest' });
      if (g.counts.high) rest.append(h('span', { class: 'c-chip', 'data-band': 'high', title: names(g, 'high'), text: t('legendHigh') + ': ' + g.counts.high }));
      if (g.counts.played) rest.append(h('span', { class: 'c-chip', 'data-band': 'none', title: names(g, 'played'), text: t('legendPlayed') + ': ' + g.counts.played }));
      if (g.counts.none) rest.append(h('span', { class: 'c-chip', 'data-band': 'none', 'data-not-yet': '', text: t('skillsNotYet') + ': ' + g.counts.none }));
      if (rest.childNodes.length) sec.append(rest);
      if (g.next.length) {
        const next = h('div', { class: 'c-row c-next', 'data-next': '' }, h('b', { text: t('skillsNext') + ':' }));
        for (const n of g.next) {
          if (n.kind === 'set' || n.kind === 'activity') {
            if (!opt.canEdit) continue;
            next.append(h('button', { type: 'button', 'data-next-kind': n.kind, text: n.kind === 'set' ? t('skillsAssignSet', { title: n.title }) : t('skillsAssignActivity', { title: n.title }), onclick: () => opt.onAssign({ title: n.title, link: n.link }) }));
          } else if (n.kind === 'tool') next.append(h('a', { href: n.href, target: '_blank', rel: 'noopener', 'data-next-kind': 'tool', text: t('skillsTool', { title: n.title }) }));
          else next.append(h('a', { href: n.href, target: '_blank', rel: 'noopener', 'data-next-kind': 'unit', text: t('skillsUnit', { n: n.n, unit: n.unit, title: n.title }) }));
        }
        if (next.childNodes.length > 1) sec.append(next);
      }
      box.append(sec);
    }
    if (d.other.length) box.append(h('section', { class: 'c-skill', 'data-other': '' }, h('h3', { text: t('skillsOther') }), h('p', { class: 'c-muted', text: d.other.map((w) => w.title).join(' · ') }), h('p', { class: 'c-muted', text: t('skillsOtherNote') })));
    return box;
  }

  /**
   * The view by curriculum on paper (the browser's print window also saves a PDF): the class overview, or one page
   * per child for a talk with parents. A child's page names no other child.
   */
  function printSkills(d: Skills, what: 'class' | 'children'): void {
    const w = window.open('', '_blank');
    if (!w) return;
    const doc = w.document;
    doc.title = d.class.name;
    doc.documentElement.lang = o.locale;
    const el = (tag: string, text?: string, cls?: string): HTMLElement => { const x = doc.createElement(tag); if (text != null) x.textContent = text; if (cls) x.className = cls; return x; };
    doc.head.append(Object.assign(doc.createElement('style'), { textContent: "body{font-family:'Nunito',system-ui,sans-serif;margin:24px;color:#14322D;font-size:11.5pt;line-height:1.45}h1{font-size:19pt;margin:0 0 4px}h2{font-size:12.5pt;margin:16px 0 2px}p{margin:0 0 6px}.m{color:#4A5A55}.pg{break-after:page;page-break-after:always}.pg:last-child{break-after:auto;page-break-after:auto}table{border-collapse:collapse;width:100%;margin-top:12px}th,td{text-align:left;vertical-align:top;border-bottom:1px solid #CFC5AE;padding:7px 8px 7px 0}th{font-size:10pt;color:#4A5A55}td.r{white-space:nowrap;font-weight:700}.w{color:#4A5A55;font-size:10pt}" }));
    const today = t('reportDate', { date: day(new Date().toISOString()) });
    if (what === 'class') {
      doc.body.append(el('h1', d.class.name), el('p', d.curriculum.name + ' · ' + today, 'm'));
      const names = (g: SkillGroupView, band: SkillBand) => d.seats.filter((x) => g.bands[x.id] === band).map(seatLabel).join(', ');
      for (const g of d.groups) {
        doc.body.append(el('h2', headingText(g)), el('p', g.work.map((x) => x.title).join(' · '), 'w'));
        for (const band of ['low', 'mid', 'high', 'played'] as const) if (g.counts[band]) doc.body.append(el('p', skillWord(band) + ' (' + g.counts[band] + '): ' + names(g, band)));
        if (g.counts.none) doc.body.append(el('p', t('skillsNotYet') + ' (' + g.counts.none + '): ' + d.seats.filter((x) => !g.bands[x.id]).map(seatLabel).join(', ')));
      }
    } else {
      for (const seat of d.seats) {
        const rows = d.groups.filter((g) => g.bands[seat.id]);
        if (!rows.length) continue; // a child with no result gets no page
        const pg = el('div', undefined, 'pg');
        pg.setAttribute('data-seat', String(seat.seatNo));
        pg.append(el('h1', t('reportTitle', { name: seatLabel(seat) })), el('p', d.class.name + ' · ' + today, 'm'), el('p', t('reportIntro')));
        const table = doc.createElement('table'), head = doc.createElement('tr');
        head.append(el('th', t('reportHeadSkill')), el('th', t('reportHeadResult')));
        table.append(head);
        for (const g of rows) {
          const tr = doc.createElement('tr'), td = doc.createElement('td');
          td.append(el('div', headingText(g)), el('div', g.work.map((x) => x.title).join(' · '), 'w'));
          tr.append(td, el('td', skillWord(g.bands[seat.id]), 'r'));
          table.append(tr);
        }
        pg.append(table);
        doc.body.append(pg);
      }
    }
    try { w.focus(); w.print(); } catch { /* the window stays open to print by hand */ }
  }

  /** the class list on paper: one card per child (picture + name or number) and the class link with its QR code */
  function printList(d: ClassData, link: string): void {
    const w = window.open('', '_blank');
    if (!w) return;
    const doc = w.document;
    doc.title = d.class.name;
    doc.head.append(Object.assign(doc.createElement('style'), { textContent: "body{font-family:'Nunito',system-ui,sans-serif;margin:24px;color:#14322D}h1{font-size:22pt;margin:0 0 6px}p{margin:0 0 14px;font-size:12pt}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.s{border:2px solid #CFC5AE;border-radius:14px;padding:10px;text-align:center;break-inside:avoid}.s img{width:96px;height:96px;object-fit:contain}.s b{display:block;font-size:15pt}.s span{font-size:11pt;color:#3D4F49}.q{display:flex;gap:16px;align-items:center;margin-top:18px;break-inside:avoid}.q img{width:140px;height:140px}" }));
    const g = doc.createElement('div'); g.className = 'g';
    for (const s of d.seats) {
      const c = doc.createElement('div'); c.className = 's';
      const i = doc.createElement('img'); i.alt = ''; i.src = location.origin + iconUrl(s.icon, 2);
      const b = doc.createElement('b'); b.textContent = s.displayName || String(s.seatNo);
      c.append(i, b);
      if (s.displayName) { const n = doc.createElement('span'); n.textContent = String(s.seatNo); c.append(n); }
      g.append(c);
    }
    const h1 = doc.createElement('h1'); h1.textContent = d.class.name;
    const q = doc.createElement('div'); q.className = 'q';
    const qi = doc.createElement('img'); qi.alt = ''; qi.src = new URL(o.qrUrl(link), location.origin).href;
    const qp = doc.createElement('p'); qp.textContent = link;
    q.append(qi, qp);
    doc.body.append(h1, g, q);
    const go = () => { try { w.focus(); w.print(); } catch { /* the window stays open to print by hand */ } };
    const imgs = Array.from(doc.images);
    let left = imgs.length;
    if (!left) go();
    for (const im of imgs) { const done = () => { if (--left === 0) go(); }; if (im.complete) done(); else { im.addEventListener('load', done); im.addEventListener('error', done); } }
  }

  void list();
  return { destroy: () => { dead = true; stop(); root.replaceChildren(); root.classList.remove('lcsc'); } };
}
