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

### Shelly — the shy little hermit crab finding her home
- **id:** `shelly`
- **role:** companion
- **species/look:** a small hermit crab — `coral`/`orange` body, big friendly eyes on short stalks,
  a rounded cream-and-sand spiral shell she carries (wsv-1 palette; see
  `docs/storybook/visual-style-standard.md`).
- **voice:** cheerful, a little shy, easily delighted. Speaks in tiny warm bursts ("Oh! Oh!").
- **speech tics:** a happy claw "clack, clack" when something goes right.
- **best arcs:** Help-a-friend (her debut shape), Collect-and-sort.
- **debut:** `shellys-seashells` (library story #1)
- **poses:** `neutral`, `happy` (+ idle bob). No clips; her joy reads in the pose swap.
- **notes:** Shelly's new shell home gains its decorations in her debut — keep the decorated
  shell look (four `sunshine` spots) if she recurs.

### Bo — the eager little builder beaver
- **id:** `bo`
- **role:** companion
- **species/look:** a small beaver — `sandDeep` body, `creamDeep` belly, two big friendly `cream`
  front teeth, a wide flat cross-hatched tail (wsv-1 palette; see
  `docs/storybook/visual-style-standard.md`).
- **voice:** eager, busy, proud of fixing things. Announces repairs happily ("Good as new!").
- **speech tics:** a satisfied "tap, tap!" when something clicks into place.
- **best arcs:** Fix-a-mess (his debut shape), Quest.
- **debut:** `bos-wobbly-cart` (library story #2)
- **poses:** `neutral`, `happy` (+ idle bob). No clips; his joy reads in the pose swap.
- **notes:** Bo's little wooden cart (round wheel, square crate, triangle flag) is his signature
  prop — keep the fixed cart's look if he recurs.

### Poppy — the gentle gardener hedgehog
- **id:** `poppy`
- **role:** companion
- **species/look:** a small hedgehog — `sandDeep`/`orangeDeep` spike crown over a rounded
  `creamDeep` face and belly, tiny black nose, stubby limbs (wsv-1 palette; see
  `docs/storybook/visual-style-standard.md`).
- **voice:** gentle, unhurried, delighted by growing things ("Look how it grew!").
- **speech tics:** a happy little sniff-sniff when something smells ripe.
- **best arcs:** Collect-and-sort (her debut shape), Discovery.
- **debut:** `poppys-big-harvest` (library story #3)
- **poses:** `neutral`, `happy` (+ idle bob). No clips.
- **notes:** Poppy's vegetable garden (picket fence, soil beds, harvest basket) is her home
  setting — keep it if she recurs.

### Hazel — the giggly party squirrel
- **id:** `hazel`
- **role:** companion
- **species/look:** a small squirrel — `berry`-purple body with a `creamDeep` belly and a big
  curled tail with a `cream` swirl; tufted ears (wsv-1 palette; deliberately distinct from
  Pip's orange).
- **voice:** quick, giggly, welcoming ("This way! Almost there!").
- **speech tics:** an excited double hand-clap before announcing something.
- **best arcs:** Quest (her debut shape), Discovery.
- **debut:** `hazels-treehouse-trail` (library story #4)
- **poses:** `neutral`, `happy` (+ idle bob). No clips.
- **notes:** Hazel's forest treehouse (round cream door, party bunting) is her home — keep its
  look if she recurs.

### Willa — the tidy washing-day duck
- **id:** `willa`
- **role:** companion
- **species/look:** a small duck — `cream` feathers, `sunshine` bill and feet, a `creamDeep`
  wing (wsv-1 palette).
- **voice:** cheerful, tidy, a little proud of her neat washing line ("Everything in its place!").
- **speech tics:** a happy "quack-quack!" when something is sorted right.
- **best arcs:** Fix-a-mess (her debut shape), Collect-and-sort.
- **debut:** `willas-washing-day` (library story #5)
- **poses:** `neutral`, `happy` (+ idle bob). No clips.
- **notes:** Willa's riverside washing line and her rainbow patchwork quilt are her signature —
  keep them if she recurs.

> **Adding characters:** most future stories reuse **Pip as guide** + a fresh **companion** for the
> story's situation. Introduce a *new guide* only when there's a real reason (a themed sub-series). Each
> new character: fill the template above, author the base atlas (poses + idle) via the placeholder-art
> pipeline, add an entry here, and append its look to `docs/character-art-spec.md`.
