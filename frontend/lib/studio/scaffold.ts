// Story Studio tenancy — blank scaffold + clone-from-template.
//
// Templates are operator stories under the deployed mini-tools static tree
// (mini-tools/stories/<templateId>/). Cloning copies ONLY story.json +
// strings.json into the tenant row; every binary keeps pointing at the
// template's public /mini-tools/stories/<templateId>/… URLs (allowed by the
// save-time allowlist), so a clone costs zero bytes of tenant storage.

import fs from 'fs';
import path from 'path';
import { STUDIO_MINI_TOOLS_DIR } from './paths';

const TEMPLATE_ID_RE = /^[a-z0-9-]+$/;

export interface ScaffoldResult {
  story: any;
  strings: any;
}

/** The local studio-server's blank scaffold, parameterized by the story's
 * single authoring locale (teacher stories author in the teacher's language). */
export function blankStory(title: string, locale: string = 'en'): ScaffoldResult {
  const cast = {
    characterId: 'pip',
    atlasBase: '/mini-tools/stories/pips-picnic/cast/pip/pip.base.json',
    poses: ['neutral', 'talk', 'happy', 'point'],
  };
  const story: any = {
    schemaVersion: 'sb-1',
    id: 'pending', // replaced with the DB cuid after create
    title: '@story.title',
    locales: [locale],
    theme: { letterboxColor: '#FBF3E4', transition: 'crossfade' },
    cast: [
      {
        id: cast.characterId,
        name: '@cast.' + cast.characterId + '.name',
        role: 'guide',
        atlasBase: 'atlas.' + cast.characterId + '.base',
        poses: cast.poses,
      },
    ],
    assets: {},
    reward: { id: 'story.pending', label: { [locale]: title }, emoji: '⭐' },
    pages: [
      {
        id: 'p01',
        scene: { image: 'scene.placeholder' },
        characters: [
          {
            characterId: cast.characterId,
            pose: cast.poses[0],
            anchor: { x: 300, y: 880 },
            scale: 1,
            flip: false,
          },
        ],
        narration: { gate: 'end', cues: [] },
        interaction: null,
        success: { celebration: 'burst', holdMs: 1000 },
      },
    ],
  };
  story.assets['atlas.' + cast.characterId + '.base'] = { kind: 'atlas', src: cast.atlasBase };
  story.assets['scene.placeholder'] = {
    kind: 'image',
    src: '/mini-tools/stories/pips-picnic/scenes/page-01.webp',
    size: { w: 1600, h: 1000 },
  };
  const strings: any = {};
  strings['story.title'] = { [locale]: title };
  strings['cast.' + cast.characterId + '.name'] = { [locale]: 'Pip' };
  return { story, strings };
}

/**
 * Clone an operator template. Returns null when the template doesn't exist.
 * Relative exercise packages are re-pointed at the template's public tree so
 * they keep resolving (the player supports absolute package paths).
 */
export function cloneTemplate(templateId: string, title: string, locale: string = 'en'): ScaffoldResult | null {
  if (!TEMPLATE_ID_RE.test(templateId)) return null;
  const dir = path.join(STUDIO_MINI_TOOLS_DIR, 'stories', templateId);
  const storyPath = path.join(dir, 'story.json');
  const stringsPath = path.join(dir, 'strings.json');
  if (!fs.existsSync(storyPath) || !fs.existsSync(stringsPath)) return null;

  let story: any;
  let strings: any;
  try {
    story = JSON.parse(fs.readFileSync(storyPath, 'utf8'));
    strings = JSON.parse(fs.readFileSync(stringsPath, 'utf8'));
  } catch {
    return null;
  }

  for (const pg of story.pages || []) {
    const inter = pg && pg.interaction;
    const pkg = inter && inter.taskData && inter.taskData.package;
    if (typeof pkg === 'string' && pkg && pkg.charAt(0) !== '/') {
      inter.taskData.package = '/mini-tools/stories/' + templateId + '/' + pkg.replace(/\/$/, '');
    }
  }

  const titleKey = String(story.title || '').replace(/^@/, '');
  const authoringLocale =
    (Array.isArray(story.locales) && story.locales.includes(locale) && locale) ||
    (Array.isArray(story.locales) && story.locales[0]) ||
    'en';
  if (titleKey) {
    strings[titleKey] = strings[titleKey] || {};
    strings[titleKey][authoringLocale] = title;
  }
  return { story, strings };
}

/** Stamp the freshly-created DB id into the cloned/blank document. */
export function stampStoryId(result: ScaffoldResult, id: string) {
  result.story.id = id;
  if (result.story.reward) result.story.reward.id = 'story.' + id;
}
