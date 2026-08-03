import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isSubscriptionUsable } from '@/lib/entitlements';
import { readHostedHtml } from '@/lib/hosted-worksheets/core';

export const dynamic = 'force-dynamic';

/**
 * GET /play/w/[linkId] — serve a teacher's hosted interactive worksheet.
 *
 * Link-is-the-capability (§4.4): no student auth, ever. Non-negotiable headers:
 *  - X-Robots-Tag: noindex, nofollow      (user content never indexes)
 *  - Cache-Control: private, max-age=300  (revocation/lapse ≤5min; no CDN cache)
 *  - Content-Security-Policy: sandbox     (opaque origin — teacher-supplied HTML
 *    can never touch the site origin's localStorage auth token; deck runtimes'
 *    localStorage use is try/catch-guarded, verified 2026-07-11)
 *
 * The sandbox token list is load-bearing in BOTH directions — every keyword is
 * here for a named reason, and the absent one is the whole security property:
 *  - allow-scripts  the deck runtime is inline JS
 *  - allow-popups   the in-deck share affordance opens external targets
 *  - allow-modals   the celebration's "Print my worksheet" calls window.print(),
 *                   which the HTML spec's sandboxed-modals flag silently ignores
 *                   (alongside alert/confirm/prompt/beforeunload) unless this
 *                   token is present. Without it the button fires its listener
 *                   and the browser discards the call — it reads as dead. This
 *                   clears ONLY the modals flag; it does not concede the origin.
 *  - NOT allow-same-origin — the opaque origin comes from this keyword's ABSENCE.
 *                   Never add it: that is what keeps teacher HTML away from the
 *                   site origin's auth token.
 * Gated by scripts/audit-tool-print-sheets.js (hosted-worksheet CSP surface).
 * Teacher lapsed beyond grace → kid-safe "paused" page (no payment language on
 * the child-facing line); renewal revives instantly (recomputed per request).
 */

const BASE_HEADERS: Record<string, string> = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
  'Cache-Control': 'private, max-age=300',
  'X-Content-Type-Options': 'nosniff',
};

const PAUSED: Record<string, { title: string; kid: string; teacher: string }> = {
  en: { title: 'This worksheet is taking a break', kid: 'Please ask your teacher to open it again soon.', teacher: 'Teacher: renew your LessonCraftStudio plan to instantly reactivate every link you have shared.' },
  de: { title: 'Dieses Arbeitsblatt macht gerade Pause', kid: 'Bitte deine Lehrerin oder deinen Lehrer, es bald wieder zu öffnen.', teacher: 'Für Lehrkräfte: Verlängern Sie Ihr LessonCraftStudio-Abo, um alle geteilten Links sofort zu reaktivieren.' },
  fr: { title: 'Cette fiche fait une petite pause', kid: 'Demande à ton enseignant·e de la rouvrir bientôt.', teacher: 'Enseignant·e : renouvelez votre abonnement LessonCraftStudio pour réactiver instantanément tous vos liens partagés.' },
  es: { title: 'Esta ficha está descansando', kid: 'Pídele a tu maestra o maestro que la abra de nuevo pronto.', teacher: 'Docente: renueva tu plan de LessonCraftStudio para reactivar al instante todos los enlaces compartidos.' },
  pt: { title: 'Esta atividade está descansando', kid: 'Peça à sua professora ou professor para abri-la de novo em breve.', teacher: 'Professor(a): renove seu plano do LessonCraftStudio para reativar na hora todos os links compartilhados.' },
  it: { title: 'Questa scheda si sta riposando', kid: 'Chiedi al tuo insegnante di riaprirla presto.', teacher: 'Insegnante: rinnova il tuo piano LessonCraftStudio per riattivare subito tutti i link condivisi.' },
  nl: { title: 'Dit werkblad houdt even pauze', kid: 'Vraag je juf of meester om het snel weer te openen.', teacher: 'Leerkracht: verleng je LessonCraftStudio-abonnement om alle gedeelde links direct te heractiveren.' },
  sv: { title: 'Det här arbetsbladet tar en paus', kid: 'Be din lärare öppna det igen snart.', teacher: 'Lärare: förnya din LessonCraftStudio-plan så aktiveras alla delade länkar direkt igen.' },
  da: { title: 'Dette arbejdsark holder en pause', kid: 'Bed din lærer om at åbne det igen snart.', teacher: 'Lærer: forny dit LessonCraftStudio-abonnement, så alle delte links straks virker igen.' },
  no: { title: 'Dette arbeidsarket tar en pause', kid: 'Be læreren din om å åpne det igjen snart.', teacher: 'Lærer: forny LessonCraftStudio-abonnementet ditt for å reaktivere alle delte lenker umiddelbart.' },
  fi: { title: 'Tämä tehtävä on tauolla', kid: 'Pyydä opettajaasi avaamaan se pian uudelleen.', teacher: 'Opettaja: uusi LessonCraftStudio-tilauksesi, niin kaikki jaetut linkit toimivat heti taas.' },
};

function miniPage(title: string, lines: string[], status: number): NextResponse {
  const body = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>body{font-family:'Nunito',system-ui,sans-serif;background:#FBF3E4;color:#146B5E;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px;text-align:center}main{max-width:480px}h1{font-size:1.6rem}p{font-size:1.05rem;line-height:1.5}.t{margin-top:2rem;font-size:.85rem;opacity:.75}</style></head><body><main><h1>${title}</h1>${lines.map((l, i) => `<p${i === lines.length - 1 && lines.length > 1 ? ' class="t"' : ''}>${l}</p>`).join('')}</main></body></html>`;
  return new NextResponse(body, { status, headers: BASE_HEADERS });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { linkId: string } }
) {
  const linkId = params.linkId;
  if (!/^[a-z0-9]{6,20}$/i.test(linkId)) {
    return miniPage('Not found', ['This worksheet link does not exist.'], 404);
  }

  const row = await prisma.hostedWorksheet.findUnique({
    where: { linkId },
    select: {
      id: true,
      status: true,
      locale: true,
      title: true,
      teacher: {
        select: {
          isAdmin: true,
          subscription: {
            select: {
              status: true,
              lsSubscriptionId: true,
              pastDueAt: true,
              currentPeriodEnd: true,
            },
          },
        },
      },
    },
  });

  if (!row || row.status !== 'live') {
    return miniPage('Not found', ['This worksheet link does not exist.'], 404);
  }

  if (!isSubscriptionUsable(row.teacher)) {
    const s = PAUSED[row.locale] || PAUSED.en;
    return miniPage(s.title, [s.kid, s.teacher], 200);
  }

  const html = readHostedHtml(row.id);
  if (html === null) {
    console.error(`hosted-worksheet file missing for row ${row.id}`);
    return miniPage('Not found', ['This worksheet link does not exist.'], 404);
  }

  prisma.hostedWorksheet
    .update({ where: { id: row.id }, data: { viewCount: { increment: 1 } } })
    .catch(() => {});

  return new NextResponse(html, {
    status: 200,
    headers: {
      ...BASE_HEADERS,
      'Content-Security-Policy': 'sandbox allow-scripts allow-popups allow-modals',
    },
  });
}
