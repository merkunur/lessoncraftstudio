#!/usr/bin/env node
/* =====================================================================
   prove-studio-tenant.js — end-to-end proof of the TENANT Story Studio
   (premium class #3): the authenticated /api/studio/* CRUD surface, the
   tokened /api/play/* capability serving, quota/allowlist/traversal
   enforcement, and revocation.

   Pure fetch (Node 18+ global fetch/FormData/Blob) — no puppeteer, so it
   runs from any machine against any environment:

     LCS_BASE_URL   (default http://127.0.0.1:3000)  — next dev or prod
     LCS_TEST_EMAIL / LCS_TEST_PASSWORD              — a subscriber (or
                                                        admin) account

   USAGE: node scripts/storybook/prove-studio-tenant.js
   The created story is deleted at the end (soft delete); a failed run may
   leave a "Prove Tenant …" story behind — safe to delete from the dashboard.
   ===================================================================== */
'use strict';

const BASE = (process.env.LCS_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const EMAIL = process.env.LCS_TEST_EMAIL;
const PASSWORD = process.env.LCS_TEST_PASSWORD;

const fails = [];
let passes = 0;
function check(name, cond, detail) {
  if (cond) { passes++; console.log('  PASS  ' + name); }
  else { fails.push(name); console.log('  FAIL  ' + name + (detail ? ' — ' + detail : '')); }
}

/* A 1x1 transparent PNG (magic bytes are what the sniffer checks). */
const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

async function j(method, path, { token, body, raw, form } = {}) {
  const headers = {};
  if (token) headers.Authorization = 'Bearer ' + token;
  let payload;
  if (form) payload = form;
  else if (raw) payload = raw;
  else if (body !== undefined) { headers['Content-Type'] = 'application/json'; payload = JSON.stringify(body); }
  const res = await fetch(BASE + path, { method, headers, body: payload });
  let data = null;
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) { try { data = await res.json(); } catch (e) {} }
  else { try { data = await res.arrayBuffer(); } catch (e) {} }
  return { status: res.status, data, headers: res.headers };
}

(async () => {
  /* LCS_TEST_TOKEN: a pre-minted Bearer token (server-side session mint) —
     skips the password signin, for environments where no test password
     exists. Otherwise LCS_TEST_EMAIL + LCS_TEST_PASSWORD sign in normally. */
  let token = process.env.LCS_TEST_TOKEN || null;
  if (!token && (!EMAIL || !PASSWORD)) {
    console.error('Set LCS_TEST_TOKEN, or LCS_TEST_EMAIL + LCS_TEST_PASSWORD (a subscriber or admin account).');
    process.exit(2);
  }

  /* ---- 0. sign in ---- */
  if (!token) {
    const login = await j('POST', '/api/auth/signin', { body: { email: EMAIL, password: PASSWORD } });
    token = login.data && login.data.accessToken;
    check('signin yields accessToken', !!token, 'status ' + login.status);
    if (!token) return finish();
  } else {
    check('using pre-minted LCS_TEST_TOKEN', true);
  }

  const ping = await j('GET', '/api/studio/ping', { token });
  check('studio ping (auth + tier)', ping.status === 200 && ping.data && ping.data.tenant === true,
    'status ' + ping.status + ' ' + JSON.stringify(ping.data));

  /* ---- 1. create ---- */
  const created = await j('POST', '/api/studio/stories', {
    token,
    body: { title: 'Prove Tenant ' + Date.now(), gradeBand: 'K', locale: 'en' },
  });
  check('create story 201 + previewLinkId', created.status === 201 && created.data.previewLinkId,
    'status ' + created.status + ' ' + JSON.stringify(created.data));
  const sid = created.data && created.data.id;
  const link = created.data && created.data.previewLinkId;
  if (!sid) return finish();

  /* ---- 2. load: srcs are platform (scaffold) — untouched; etag = "1" ---- */
  const got = await j('GET', '/api/studio/stories/' + sid, { token });
  check('load story rev 1', got.status === 200 && got.data.etag === '1');
  check('scaffold scene src is a platform URL', got.data.story.assets['scene.placeholder'].src.startsWith('/mini-tools/'));

  /* ---- 3. save + optimistic concurrency ---- */
  const doc = got.data.story;
  const strings = got.data.strings;
  strings['story.title'] = { en: 'Prove Tenant edited' };
  const save1 = await j('PUT', '/api/studio/stories/' + sid, {
    token, body: { story: doc, strings, baseEtag: '1' },
  });
  check('save bumps rev to 2', save1.status === 200 && save1.data.etag === '2',
    'status ' + save1.status + ' ' + JSON.stringify(save1.data));
  const stale = await j('PUT', '/api/studio/stories/' + sid, {
    token, body: { story: doc, strings, baseEtag: '1' },
  });
  check('stale save answers 409 + fresh etag', stale.status === 409 && stale.data.etag === '2');

  /* ---- 4. src allowlist ---- */
  const evil = JSON.parse(JSON.stringify(doc));
  evil.assets['evil'] = { kind: 'image', src: '/studio-media/someoneelse123/scenes/x.webp' };
  const evilSave = await j('PUT', '/api/studio/stories/' + sid, {
    token, body: { story: evil, strings, baseEtag: '2' },
  });
  check('cross-tenant src rejected 400', evilSave.status === 400 && (evilSave.data.violations || []).length === 1);

  /* ---- 5. scene upload → tokened media ---- */
  const up = await j('POST', '/api/studio/stories/' + sid + '/scenes', { token, raw: TINY_PNG });
  check('scene upload 200 + play URL', up.status === 200 && String(up.data.src).startsWith('/api/play/' + link + '/m/scenes/'),
    'status ' + up.status + ' ' + JSON.stringify(up.data));

  if (up.data && up.data.src) {
    const media = await j('GET', up.data.src, {});   /* NO token — the link is the capability */
    check('media serves accountless 200', media.status === 200);
    const cc = media.headers.get('cache-control') || '';
    check('media Cache-Control is private (CF shared-cache excluded)', /private/.test(cc), cc);
    check('media content-type webp', (media.headers.get('content-type') || '') === 'image/webp');
  }

  /* ---- 6. play JSON accountless ---- */
  const playStory = await j('GET', '/api/play/' + link + '/story.json', {});
  check('play story.json accountless 200 + sb-1', playStory.status === 200 && playStory.data.schemaVersion === 'sb-1');
  const playStrings = await j('GET', '/api/play/' + link + '/strings.json', {});
  check('play strings.json accountless 200', playStrings.status === 200);

  /* ---- 7. traversal + bad link ---- */
  const trav = await j('GET', '/api/play/' + link + '/m/..%2f..%2fsecrets.txt', {});
  check('media traversal blocked', trav.status === 404 || trav.status === 400, 'status ' + trav.status);
  const badLink = await j('GET', '/api/play/nosuchlink000/story.json', {});
  check('unknown link 404', badLink.status === 404);

  /* ---- 8. exercise FormData intake (the generator-bridge shape) ---- */
  const descriptor = {
    formatVersion: 'sep-1', appType: 'word-guess', family: 'A',
    meta: { contentLanguage: 'en' }, page: { width: 2480, height: 3508 },
    crop: { x: 0, y: 0, w: 400, h: 200, pad: 16 },
    visual: { file: 'visual@2x.webp', format: 'webp', scale: 2, width: 800, height: 400 },
    input: { policy: 'tap-palette', tapPalette: { case: 'upper', letters: ['A', 'B', 'C'] } },
    elements: { slots: [{ id: 's1', expected: 'A', rect: { x: 10, y: 10, w: 40, h: 40 } }] },
    locales: { en: { prompt: 'Tap the letter', success: 'Nice!', tryAgain: 'Try again', hint: null } },
  };
  const form = new FormData();
  form.append('descriptor', JSON.stringify(descriptor));
  form.append('visual@2x.webp', new Blob([TINY_PNG], { type: 'image/webp' }), 'visual@2x.webp');
  const exUp = await j('POST', '/api/studio/stories/' + sid + '/exercises', { token, form });
  check('exercise FormData intake 200', exUp.status === 200 && /^exercises\//.test(exUp.data.package || ''),
    'status ' + exUp.status + ' ' + JSON.stringify(exUp.data));
  const exList = await j('GET', '/api/studio/stories/' + sid + '/exercises', { token });
  check('exercise listed', exList.status === 200 && (exList.data.exercises || []).length === 1);
  if (exUp.data && exUp.data.package) {
    const desc = await j('GET', '/api/play/' + link + '/m/' + exUp.data.package + '/descriptor.json', {});
    check('exercise descriptor serves via play media', desc.status === 200 && desc.data.formatVersion === 'sep-1');
  }

  /* ---- 8a2. ADMIN: TexturePacker sheet + clips import (operator endpoints
     on the tenant API — requireStudioAdmin; the admin test token passes) ---- */
  const tinyFrame = {
    frame: { x: 0, y: 0, w: 1, h: 1 }, rotated: false, trimmed: false,
    spriteSourceSize: { x: 0, y: 0, w: 1, h: 1 }, sourceSize: { w: 1, h: 1 },
  };
  const sheetRes = await j('POST', '/api/studio/stories/' + sid + '/characters/sheet', {
    token,
    body: {
      name: 'prove-char',
      atlas: { frames: { neutral: tinyFrame, happy: tinyFrame }, meta: { size: { w: 1, h: 1 }, image: 'x.png' } },
      imageBase64: TINY_PNG.toString('base64'),
      imageExt: 'png',
    },
  });
  check('ADMIN sheet import 200 + poses', sheetRes.status === 200 &&
    (sheetRes.data.poses || []).includes('neutral') && String(sheetRes.data.atlasBase || '').includes('/m/cast/'),
    'status ' + sheetRes.status + ' ' + JSON.stringify(sheetRes.data));
  if (sheetRes.data && sheetRes.data.characterId) {
    const atlasGet = await j('GET', sheetRes.data.atlasBase, {});
    check('re-baked atlas serves via play media (pose_ frames)', atlasGet.status === 200 &&
      atlasGet.data && atlasGet.data.frames && !!atlasGet.data.frames['pose_neutral']);
    const clipsRes = await j('POST', '/api/studio/stories/' + sid + '/characters/' + sheetRes.data.characterId + '/clips', {
      token,
      body: {
        atlas: { frames: { wave_0001: tinyFrame, wave_0002: tinyFrame }, meta: { size: { w: 1, h: 1 }, image: 'x.png' } },
        imageBase64: TINY_PNG.toString('base64'),
        imageExt: 'png',
      },
    });
    check('ADMIN clips import 200 + clip names', clipsRes.status === 200 &&
      (clipsRes.data.clips || []).includes('wave'),
      'status ' + clipsRes.status + ' ' + JSON.stringify(clipsRes.data));
  }

  /* ---- 8b. class share links (validation-gated create → play → revoke) ---- */
  const shareMake = await j('POST', '/api/studio/stories/' + sid + '/share', { token });
  check('share create 200 (blank story validates clean)', shareMake.status === 200 && shareMake.data.share,
    'status ' + shareMake.status + ' ' + JSON.stringify(shareMake.data));
  if (shareMake.data && shareMake.data.share) {
    const sLink = shareMake.data.share.linkId;
    const sPlay = await j('GET', '/api/play/' + sLink + '/story.json', {});
    check('share link plays accountless', sPlay.status === 200);
    const qr = await j('GET', '/api/play/' + sLink + '/qr.png', {});
    check('QR image serves accountless PNG', qr.status === 200 &&
      (qr.headers.get('content-type') || '') === 'image/png' &&
      qr.data && qr.data.byteLength > 300, 'status ' + qr.status);
    const shareGet = await j('GET', '/api/studio/stories/' + sid + '/share', { token });
    check('share GET returns the live link', shareGet.status === 200 && shareGet.data.share && shareGet.data.share.linkId === sLink);
    const rot = await j('POST', '/api/studio/stories/' + sid + '/share', { token });
    check('rotate yields a NEW link', rot.status === 200 && rot.data.share.linkId !== sLink);
    const oldPlay = await j('GET', '/api/play/' + sLink + '/story.json', {});
    check('rotated-away link is dead', oldPlay.status === 404);
    const off = await j('DELETE', '/api/studio/stories/' + sid + '/share', { token });
    check('stop sharing 200', off.status === 200);
    const offPlay = await j('GET', '/api/play/' + rot.data.share.linkId + '/story.json', {});
    check('revoked link is dead', offPlay.status === 404);
  }

  /* ---- 9. auth walls ---- */
  const noTok = await j('GET', '/api/studio/stories/' + sid, {});
  check('studio API without token 401', noTok.status === 401);
  const wrongId = await j('GET', '/api/studio/stories/clzzzzzzzzzzzzzzzzzzzzzzz', { token });
  check('unknown/foreign story 404', wrongId.status === 404);

  /* ---- 10. delete revokes ---- */
  const del = await j('DELETE', '/api/studio/stories/' + sid, { token });
  check('delete 200', del.status === 200);
  /* the media route's 60s link cache may serve briefly; story.json resolves live */
  const deadPlay = await j('GET', '/api/play/' + link + '/story.json', {});
  check('deleted story play 404', deadPlay.status === 404);
  const deadList = await j('GET', '/api/studio/stories', { token });
  check('deleted story gone from dashboard',
    deadList.status === 200 && !(deadList.data.stories || []).some(s => s.id === sid));

  finish();

  function finish() {
    console.log('\n[prove-studio-tenant] ' + passes + ' passed, ' + fails.length + ' failed' +
      (fails.length ? ':\n  - ' + fails.join('\n  - ') : ''));
    process.exit(fails.length ? 1 : 0);
  }
})().catch(e => { console.error('[prove-studio-tenant] crashed: ' + (e.stack || e)); process.exit(1); });
