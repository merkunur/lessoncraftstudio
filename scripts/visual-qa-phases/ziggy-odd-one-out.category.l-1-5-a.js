/* =====================================================================
   visual-qa phase driver — ziggy-odd-one-out / category (L.1.5.a)
   #131 of the one-by-one rebuild: THE GROUP PHOTO (group-photo-activity).

     open      — the camera, the bench in its two tiers, the empty step.
     picked    — a seat on the step. ⭐ Nothing is graded yet: no photo,
                 no hint.
     missed    — the shutter: a cloudy photo with no name, the hint.
     resolved  — the odd one on the step + the shutter: a sharp photo with
                 its name, the success line; 0.5 s later the shell's Next.

   ⚠ SEATS ARE REACHED BY INDEX (data-k="seat-<n>"; the odd one's seat is
     read from the model), NEVER BY LABEL.
   ⚠ FAST is set so a photographed state is the settled one.
   ===================================================================== */
'use strict';

const G = 'GroupPhotoActivity';

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.FAST = true; t._start(t.st.r, 0); t._render2(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}
const odd = (page) => page.evaluate((g) => { const t = window[g]; return t && t.st && t.st.rd.seats ? t.st.rd.odd : -1; }, G);
const tap = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
async function seat(page, i) { if (!(await tap(page, '[data-k="seat-' + i + '"]'))) throw new Error('seat ' + i + ' absent'); }

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const o = await odd(page); if (o < 0) throw new Error('a seat-plan round on window.' + G + ' — the driver needs a bench round');
        await seat(page, o === 0 ? 1 : 0);
        await new Promise((x) => setTimeout(x, 150));
        const st = await page.evaluate(() => ({ step: !!document.querySelector('[data-k="step"]'), photo: !!document.querySelector('.gp-photo'), note: document.querySelector('.gp-note').textContent.trim() }));
        if (!st.step) throw new Error('the seat did not go to the step');
        if (st.photo) throw new Error('a photo before the shutter — the board is grading a choice');
        if (st.note) throw new Error('a hint before the shutter: «' + st.note + '»');
        return true;
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await reset(page);
        const o = await odd(page);
        await seat(page, o === 0 ? 1 : 0);
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('the shutter is absent');
        await new Promise((x) => setTimeout(x, 200));
        const st = await page.evaluate(() => ({ hint: document.querySelector('.gp-note').classList.contains('is-hint') && !!document.querySelector('.gp-note').textContent.trim(), cloudy: !!document.querySelector('.gp-photo.is-cloudy') }));
        if (!st.hint) throw new Error('no hint after a wrong seat');
        if (!st.cloudy) throw new Error('the photo is not cloudy');
        return true;
      }
    },
    {
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
        await seat(page, await odd(page));
        if (!(await tap(page, '[data-k="check"]'))) throw new Error('the shutter is absent');
        await new Promise((x) => setTimeout(x, 900));
        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt'), nxt = document.querySelector('.lcs-activity-next');
          return { ok: document.querySelector('.gp-note').classList.contains('is-ok'), sharp: !!document.querySelector('.gp-photo.is-sharp'),
            celebrated: !!(p && p.classList.contains('celebrate')), next: !!(nxt && nxt.offsetParent !== null) };
        });
        if (!st.ok || !st.sharp) throw new Error('no success line / the photo is not sharp');
        if (!st.celebrated || !st.next) throw new Error('the shell did not celebrate / show Next 0.5 s after the result');
        return true;
      }
    }
  ]
};
