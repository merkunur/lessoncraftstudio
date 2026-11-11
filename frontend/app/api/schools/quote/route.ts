import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';
import { extractRequestIp } from '@/lib/quota';
import { QUOTE_LIMITS } from '@/lib/schools';

/**
 * POST /api/schools/quote — the quote request of the "For schools" page (Daily Teaching System, Part 6; PLAN §11
 * ruling 6: small and manual, the operator invoices by hand).
 *
 * What it does with a request: saves it as a support ticket (category "school-quote", the table the admin panel
 * already reads) and mails it to the operator's support address with the sender as reply-to. Nothing else: no mail
 * goes back to the address in the form (a form that mails any address a stranger types is a spam relay; the page
 * itself says the request arrived), no account is made, no price is computed.
 *
 * What it refuses: a body that is not the form's (400), more than three requests an hour from one address (429; the
 * count is held in memory only and the address is never stored), and form robots — a filled "website" field is
 * answered as if it had worked and nothing is saved or sent.
 */
export const dynamic = 'force-dynamic';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PER_HOUR = 3;
const HOUR = 60 * 60 * 1000;
const seen = new Map<string, number[]>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const times = (seen.get(ip) || []).filter((t) => now - t < HOUR);
  if (times.length >= PER_HOUR) { seen.set(ip, times); return true; }
  times.push(now);
  seen.set(ip, times);
  if (seen.size > 5000) for (const [k, v] of seen) if (!v.some((t) => now - t < HOUR)) seen.delete(k);
  return false;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = (v: unknown, max: number): string | null => (typeof v === 'string' && v.trim().length <= max ? v.trim() : null);
/** one line: no line break reaches the subject of the mail */
const line = (v: unknown, max: number): string | null => { const t = text(v, max); return t === null ? null : t.replace(/[\r\n\t]+/g, ' '); };

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'invalid' }, { status: 400 }); }
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'invalid' }, { status: 400 });

  // a form robot fills every field; a person never sees this one
  if (typeof body.website === 'string' && body.website.trim()) return NextResponse.json({ ok: true });

  const name = line(body.name, QUOTE_LIMITS.name);
  const school = line(body.school, QUOTE_LIMITS.school);
  const email = line(body.email, QUOTE_LIMITS.email);
  const place = line(body.place ?? '', QUOTE_LIMITS.place);
  const message = text(body.message ?? '', QUOTE_LIMITS.message);
  const teachers = typeof body.teachers === 'number' && Number.isInteger(body.teachers) ? body.teachers : NaN;
  const locale = typeof body.locale === 'string' && /^[a-z]{2}$/.test(body.locale) ? body.locale : 'en';
  if (!name || !school || !email || !EMAIL.test(email) || place === null || message === null || !(teachers >= 1 && teachers <= QUOTE_LIMITS.teachersMax)) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  if (tooMany(extractRequestIp(request))) return NextResponse.json({ error: 'too many' }, { status: 429 });

  const subject = `School quote: ${school} (${teachers} teacher${teachers === 1 ? '' : 's'})`;
  const lines: [string, string][] = [
    ['Name', name], ['School or district', school], ['Email', email], ['State or country', place || '—'],
    ['Number of teachers', String(teachers)], ['Language of the page', locale], ['Message', message || '—'],
  ];
  const plain = lines.map(([k, v]) => `${k}: ${v}`).join('\n');

  try {
    await prisma.supportTicket.create({ data: { email, name, subject, message: plain, category: 'school-quote', priority: 'high', status: 'open' } });
  } catch (e) {
    console.error('[schools/quote] the request could not be saved', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
  // the ticket is saved: a mail fault is logged and the sender is still told the request arrived (it did)
  try {
    const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#222"><h2>${esc(subject)}</h2><table cellpadding="6" style="border-collapse:collapse">${lines.map(([k, v]) => `<tr><td style="font-weight:bold;vertical-align:top;border-bottom:1px solid #ddd">${esc(k)}</td><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}</table><p>Reply to this mail to answer the sender.</p></body></html>`;
    await sendEmail(
      { to: process.env.EMAIL_REPLY_TO || 'support@lessoncraftstudio.com', subject, html, text: plain, replyTo: email, metadata: { source: 'schools_quote' } },
      { priority: 'high' },
    );
  } catch (e) {
    console.error('[schools/quote] the request was saved but the mail was not sent', e);
  }
  return NextResponse.json({ ok: true });
}
