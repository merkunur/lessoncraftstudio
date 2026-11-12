'use client';
/* "Download the whole unit": one PDF put together in the teacher's browser (Daily Teaching System, Part 3).
 *
 * No merged copy is kept on the server: the button asks the gate whether this visitor may have Teacher-only files
 * (probe), then fetches the teacher guide through the gate and every worksheet's own PDF, and joins them with
 * pdf-lib — the same bundle the worksheet makers already load (/makers/app/vendor/pdf-lib.js), so the site ships no
 * second copy of the library. A visitor who is not a subscriber is sent where the gate says (sign-up or pricing),
 * exactly as the plain link beside this button would send them. */
import { useState } from 'react';

interface Labels { button: string; working: string; done: string; failed: string }

export default function UnitBundleButton({ locale, guideHref, pdfs, fileName, labels }: { locale: string; guideHref: string; pdfs: string[]; fileName: string; labels: Labels }) {
  const [state, setState] = useState<{ phase: 'idle' | 'working' | 'done' | 'failed'; done: number }>({ phase: 'idle', done: 0 });
  const total = pdfs.length + 1;

  async function build() {
    if (state.phase === 'working') return;
    setState({ phase: 'working', done: 0 });
    try {
      const probe = await fetch(`${guideHref}&probe=1`, { credentials: 'include', cache: 'no-store' });
      if (!probe.ok) throw new Error('probe ' + probe.status);
      const answer = (await probe.json()) as { ok: boolean; to: string | null };
      if (!answer.ok) { window.location.href = answer.to || `/${locale}/pricing`; return; }

      // loaded at run time from the makers' own build; webpack must not try to resolve it
      const lib = (await import(/* webpackIgnore: true */ '/makers/app/vendor/pdf-lib.js' as string)) as { PDFDocument: { create(): Promise<PdfDoc>; load(b: ArrayBuffer): Promise<PdfDoc> } };
      const out = await lib.PDFDocument.create();
      const sources = [guideHref, ...pdfs];
      for (let i = 0; i < sources.length; i++) {
        const res = await fetch(sources[i], { credentials: 'include' });
        // a worksheet whose file is missing must not cost the teacher the whole unit; the guide must be there
        if (!res.ok || !(res.headers.get('content-type') || '').includes('pdf')) { if (i === 0) throw new Error('guide ' + res.status); setState({ phase: 'working', done: i + 1 }); continue; }
        const doc = await lib.PDFDocument.load(await res.arrayBuffer());
        const pages = await out.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => out.addPage(p));
        setState({ phase: 'working', done: i + 1 });
      }
      const bytes = await out.save();
      const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url; a.download = fileName;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      setState({ phase: 'done', done: total });
    } catch {
      setState({ phase: 'failed', done: 0 });
    }
  }

  const status = state.phase === 'working' ? labels.working.replace('{done}', String(Math.min(state.done + 1, total))).replace('{total}', String(total))
    : state.phase === 'done' ? labels.done : state.phase === 'failed' ? labels.failed : '';
  return (
    <div className="un-bundle">
      <button type="button" className="un-btn un-btn-main" data-path-event="whole-file" onClick={build} disabled={state.phase === 'working'} aria-busy={state.phase === 'working'}>{labels.button}</button>
      <p className="un-bundle-status" role="status" aria-live="polite">{status}</p>
    </div>
  );
}

interface PdfDoc {
  getPageIndices(): number[];
  copyPages(src: PdfDoc, indices: number[]): Promise<unknown[]>;
  addPage(p: unknown): void;
  save(): Promise<Uint8Array>;
}
