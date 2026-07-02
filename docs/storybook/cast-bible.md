# Storybook Cast Bible

The cast is the platform's continuity thread — the same friendly faces return across the ~1000-story
library so children recognize them. This bible is the SoT for who each character is, how they speak,
and the rules for using + adding them. Structured to scale to ~100 characters.

## Rules of the cast

1. **Exactly ONE guide per story** (the returning host who talks to the child, sets the page-1 promise,
   celebrates). The guide is a *recurring* cast member — reuse an existing one; don't invent a new guide
   per story.
2. **Companions are per-story** — the friend being helped, the creature discovered. They may recur if
   loved, but they carry no cross-story obligations.
3. **Voice is fixed per character** (below). Narration is written *in that guide's voice* — warm,
   second-person, invitational, within the grade word ceiling (playbook §2/§3).
4. **No conflict, no peril, no loss.** Characters are kind; stakes are gentle and always resolvable.
5. **Art continuity:** a character's atlas (`cast/<id>/<id>.base.{json,webp}`) is authored once and
   reused; poses/clips referenced anywhere must exist in the atlas (validator-checked). Every clip names
   a `fallbackPose` (reduced-motion + weak-tablet safe).
6. **Localization:** a character's `name` is a strings key (`name:"@key"`); the display name is authored
   per locale like any string (transliterate/adapt, never leave English in a non-EN story).

## Character entry template (copy for a new character)

```
### <Name> — <one-line essence>
- id: <kebab-id>            # cast[].id + folder cast/<id>/
- role: guide | companion
- species/look: <short>     # for art continuity + the art spec
- voice: <2–3 adjectives>   # e.g. "gentle, curious, encouraging"
- speech tics: <optional>   # a signature warm phrase, used sparingly
- best arcs: <which of the 5 arc templates suit them>
- debut: <storyId>
- poses: [neutral, …]       # minimum the base atlas must carry
- notes: <continuity facts to preserve>
```

## The cast (current)

### Pip — the warm little guide
- **id:** `pip`
- **role:** guide (the platform's primary host)
- **species/look:** a small, round, friendly creature (see `docs/character-art-spec.md` / the
  pips-picnic base atlas). Approachable, child-sized, expressive eyes.
- **voice:** gentle, encouraging, curious. Speaks *with* the child ("let's…", "can you…"), never *at*
  them. Never quizzes, never corrects harshly — a miss gets "let's try again together", never "wrong".
- **speech tics:** a soft invitational opener ("Ooh — look!") used sparingly; celebrates the child not
  the score ("You did it!").
- **best arcs:** all five, but especially **Quest** and **Help-a-friend** (Pip is a helper by nature).
- **debut:** `pips-picnic`
- **poses:** `neutral` (base atlas). Add poses only as stories need them; every added pose is authored
  into `pip.base` and every clip gets a `fallbackPose`.
- **notes:** Pip is the recognizable brand face — keep Pip consistent in look and warmth across every
  story. When a story needs a friend for Pip to help, that friend is a **companion** (new per story).

> **Adding characters:** most future stories reuse **Pip as guide** + a fresh **companion** for the
> story's situation. Introduce a *new guide* only when there's a real reason (a themed sub-series). Each
> new character: fill the template above, author the base atlas (poses + idle) via the placeholder-art
> pipeline, add an entry here, and append its look to `docs/character-art-spec.md`.
