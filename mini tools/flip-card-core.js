/* =====================================================================
   flip-card-core.js — the model of ACTIVITY #56 of the one-by-one
   rebuild: "Pepper's Sound Swap" → PEPPER'S FLIP CARD (RF.K.2.e, 11
   locales). Design sheet: docs/activities-rebuild/designs/056-pepper-sound-swap.md
   ---------------------------------------------------------------------
   THE INVENTION: a word sits on a flip card, its sounds on tiles along the
   bottom. Swap one tile and the card flips over to the word the tiles now
   really make: the goal word, a different real word (bat, not hat), or a
   calm grey blank card when the library has no picture for it. The card
   never says "not a word" — it only has no picture.
     Levels (each shown only where the locale has ≥ 7 honest rounds):
       first  — Pepper swaps the first sound; predict the new picture
       other  — Pepper swaps the middle or last sound; predict
       swap   — you swap: a goal picture and a tray of four tiles
       chain  — word chains: one tile at a time, the goal moves on
       add    — Pepper adds a sound at the start or the end; predict
   Words are compared by SOUND KEYS (one key per tile, authored per
   locale), never by letters: en c/k are one sound, de Hund ends in /t/.
   No DOM. UMD: window.FlipCardCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FlipCardCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* per locale: words = 'picture|tiles (dot)|keys (space)|silent tail'; levels: predict rounds 'start|tile=key|slot|answer|choice|choice'
     (add: slot = 'start' / 'end'); swap 'start|goal|tray (g=k g=k g=k g=k, the goal's tile first)'; chain 'w w w|tray;tray' */
  var DATA = {
    en: {
      words: {'cat': 'animals/cat|c.a.t|k a t|', 'bat': 'animals/bat|b.a.t|b a t|', 'hat': 'accessories/hat|h.a.t|h a t|', 'cap': 'accessories/cap|c.a.p|k a p|', 'can': 'At the Supermarket/can|c.a.n|k a n|', 'fan': 'around the house/fan|f.a.n|f a n|', 'pan': 'around the house/pan|p.a.n|p a n|', 'van': 'vehicles/van|v.a.n|v a n|', 'jam': 'At the Supermarket/jam|j.a.m|j a m|', 'ham': 'At the Supermarket/ham|h.a.m|h a m|', 'bag': 'At the Supermarket/bag|b.a.g|b a g|', 'map': 'camping/map|m.a.p|m a p|', 'dog': 'animals/dog|d.o.g|d o g|', 'log': 'camping/log|l.o.g|l o g|', 'fox': 'animals/fox|f.o.x|f o ks|', 'pot': 'around the house/pot|p.o.t|p o t|', 'mop': 'around the house/mop|m.o.p|m o p|', 'sun': 'beach/sun|s.u.n|s u n|', 'bun': 'bakery/bun|b.u.n|b u n|', 'bus': 'vehicles/bus|b.u.s|b u s|', 'mug': 'kitchen tools/mug|m.u.g|m u g|', 'jug': 'kitchen tools/jug|j.u.g|j u g|', 'cup': 'around the house/cup|c.u.p|k u p|', 'pig': 'animals/pig|p.i.g|p i g|', 'bed': 'around the house/bed|b.e.d|b e d|', 'hen': 'farm animals/hen|h.e.n|h e n|', 'pen': 'around the house/pen|p.e.n|p e n|', 'net': 'beach/net|n.e.t|n e t|', 'leg': 'body parts/leg|l.e.g|l e g|', 'sock': 'accessories/sock|s.o.ck|s o k|', 'lock': 'around the house/lock|l.o.ck|l o k|', 'rock': 'beach/rock|r.o.ck|r o k|', 'duck': 'animals/duck|d.u.ck|d u k|', 'sack': 'christmas/sack|s.a.ck|s a k|', 'oar': 'camping/oar|oar|or|', 'door': 'around the house/door|d.oor|d or|', 'eye': 'body parts/eye|eye|ai|', 'pie': 'At the Supermarket/pie|p.ie|p ai|', 'tie': 'accessories/tie|t.ie|t ai|', 'clock': 'around the house/clock|c.l.o.ck|k l o k|', 'nail': 'tools/nail|n.ai.l|n ei l|', 'snail': 'spring/snail|s.n.ai.l|s n ei l|', 'bee': 'farm animals/bee|b.ee|b ee|', 'beach': 'summer/beach|b.ea.ch|b ee ch|', 'cow': 'farm animals/cow|c.ow|k au|', 'couch': 'around the house/couch|c.ou.ch|k au ch|', 'car': 'toys/car|c.ar|k ar|', 'cart': 'At the Supermarket/cart|c.ar.t|k ar t|', 'ear': 'body parts/ear|ear|eer|', 'deer': 'camping/deer|d.eer|d eer|', 'bear': 'camping/bear|b.ear|b air|'},
      levels: {
        first: ['cat|h=h|0|hat|bat|dog', 'pan|f=f|0|fan|van|sun', 'van|p=p|0|pan|fan|log', 'bat|c=k|0|cat|hat|fox', 'fan|v=v|0|van|pan|sun', 'hat|b=b|0|bat|cat|mop', 'sock|l=l|0|lock|rock|sun', 'dog|l=l|0|log|fox|duck', 'mug|j=j|0|jug|cup|bun', 'hen|p=p|0|pen|net|hat'],
        other: ['cat|p=p|2|cap|map|dog', 'hat|m=m|2|ham|jam|fox', 'bag|t=t|2|bat|cat|pig', 'can|p=p|2|cap|pan|cup', 'pan|e=e|1|pen|fan|bun', 'mop|a=a|1|map|mug|cap', 'sock|a=a|1|sack|lock|sun', 'log|e=e|1|leg|dog|lock', 'cap|u=u|1|cup|can|map', 'ham|t=t|2|hat|jam|hen'],
        swap: ['cat|hat|h=h b=b p=p m=m', 'pan|fan|f=f v=v e=e s=s', 'mug|jug|j=j b=b p=p h=h', 'sock|lock|l=l r=r d=d a=a', 'dog|log|l=l f=f h=h e=e', 'hat|ham|m=m b=b t=t c=k', 'cap|cup|u=u i=i o=o n=n', 'mop|map|a=a h=h t=t u=u', 'log|leg|e=e d=d f=f o=o', 'hen|pen|p=p n=n t=t a=a'],
        chain: ['cat hat ham jam|h=h t=t b=b f=f;m=m ch=ch p=p n=n;j=j t=t m=m p=p', 'pan pen hen|e=e i=i ai=ei ea=ee;h=h n=n b=b j=j', 'mop map cap can|a=a ar=ar e=e u=u;c=k p=p v=v n=n;n=n t=t m=m l=l', 'sock lock log dog|l=l r=r d=d m=m;g=g s=s l=l ch=ch;d=d h=h f=f j=j', 'sun bun bus|b=b n=n t=t j=j;s=s ch=ch l=l ck=k', 'cup cap can fan van|a=a e=e ar=ar ou=au;n=n t=t m=m g=g;f=f t=t v=v m=m;v=v n=n p=p j=j', 'leg log dog|o=o i=i u=u a=a;d=d b=b r=r m=m', 'bag bat cat cap cup|t=t n=n p=p s=s;c=k t=t h=h f=f;p=p n=n d=d x=ks;u=u ai=ei ou=au ar=ar'],
        add: ['oar|d=d|start|door|bear|lock', 'eye|p=p|start|pie|tie|ear', 'eye|t=t|start|tie|pie|net', 'lock|c=k|start|clock|sock|rock', 'nail|s=s|start|snail|nail|leg', 'ear|d=d|start|deer|bear|door', 'bee|ch=ch|end|beach|bee|bus', 'cow|ch=ch|end|couch|cow|cup', 'car|t=t|end|cart|car|cat']
      }
    },
    de: {
      words: {'Hund': 'animals/dog|h.u.n.d|h u n t|', 'Mund': 'body parts/mouth|m.u.n.d|m u n t|', 'Hand': 'body parts/hand|h.a.n.d|h a n t|', 'Sand': 'summer/sand|s.a.n.d|z a n t|', 'Mond': 'camping/moon|m.o.n.d|m o: n t|', 'Maus': 'forest creatures/mouse|m.au.s|m au s|', 'Haus': 'miscellaneous/house|h.au.s|h au s|', 'Mais': 'At the Supermarket/corn|m.ai.s|m ai s|', 'Fisch': 'animals/fish|f.i.sch|f i sch|', 'Tisch': 'around the house/table|t.i.sch|t i sch|', 'Topf': 'around the house/pot|t.o.pf|t o pf|', 'Kopf': 'body parts/head|k.o.pf|k o pf|', 'Nase': 'body parts/nose|n.a.s.e|n a: z ə|', 'Vase': 'around the house/vase|v.a.s.e|v a: z ə|', 'Hahn': 'farm animals/rooster|h.ah.n|h a: n|', 'Zahn': 'body parts/tooth|z.ah.n|ts a: n|', 'Huhn': 'farm animals/chicken|h.uh.n|h u: n|', 'Zaun': 'around the house/fence|z.au.n|ts au n|', 'Kamm': 'around the house/comb|k.a.mm|k a m|', 'Dose': 'At the Supermarket/can|d.o.s.e|d o: z ə|', 'Hose': 'clothing/trousers|h.o.s.e|h o: z ə|', 'Rose': 'flowers/rose|r.o.s.e|r o: z ə|', 'Schuh': 'clothing/shoe|sch.uh|sch u:|', 'Kuh': 'farm animals/cow|k.uh|k u:|', 'Schaf': 'animals/sheep|sch.a.f|sch a: f|', 'Schal': 'accessories/scarf|sch.a.l|sch a: l|', 'Löwe': 'zoo animals/lion|l.ö.w.e|l ø: v ə|', 'Möwe': 'animals/seagull|m.ö.w.e|m ø: v ə|', 'Kugel': 'shapes/sphere|k.u.g.e.l|k u: g ə l|', 'Kegel': 'shapes/cone|k.e.g.e.l|k e: g ə l|', 'Glas': 'kitchen tools/glass|g.l.a.s|g l a: s|', 'Gras': 'spring/grass|g.r.a.s|g r a: s|', 'Feige': 'fruits/fig|f.ei.g.e|f ai g ə|', 'Geige': 'activities/violin|g.ei.g.e|g ai g ə|', 'Wespe': 'insects and bugs/wasp|w.e.s.p.e|v e s p ə|', 'Weste': 'accessories/vest|w.e.s.t.e|v e s t ə|', 'Raupe': 'spring/caterpillar|r.au.p.e|r au p ə|', 'Raute': 'shapes/diamond|r.au.t.e|r au t ə|', 'Reis': 'At the Supermarket/rice|r.ei.s|r ai s|', 'Kreis': 'shapes/circle|k.r.ei.s|k r ai s|', 'Insel': 'beach/island|i.n.s.e.l|i n z ə l|', 'Bus': 'vehicles/bus|b.u.s|b u s|'},
      levels: {
        first: ['Kopf|t=t|0|Topf|Kamm|Kegel', 'Hose|r=r|0|Rose|Dose|Glas', 'Dose|h=h|0|Hose|Rose|Löwe', 'Topf|k=k|0|Kopf|Tisch|Sand', 'Geige|f=f|0|Feige|Möwe|Haus', 'Mund|h=h|0|Hund|Sand|Löwe', 'Maus|h=h|0|Haus|Bus|Hund', 'Haus|m=m|0|Maus|Mais|Schaf', 'Zahn|h=h|0|Hahn|Huhn|Zaun', 'Tisch|f=f|0|Fisch|Topf|Kreis'],
        other: ['Zahn|au=au|1|Zaun|Hahn|Insel', 'Raute|p=p|2|Raupe|Feige|Kuh', 'Kugel|e=e:|1|Kegel|Insel|Weste', 'Schaf|l=l|2|Schal|Hahn|Gras', 'Huhn|ah=a:|1|Hahn|Zahn|Mais', 'Schal|f=f|2|Schaf|Zahn|Tisch', 'Zaun|ah=a:|1|Zahn|Haus|Raute', 'Hand|u=u|1|Hund|Hose|Raute', 'Weste|p=p|3|Wespe|Glas|Gras', 'Mais|au=au|1|Maus|Reis|Topf'],
        swap: ['Schuh|Kuh|k=k g=g t=t w=v', 'Raupe|Raute|t=t r=r n=n l=l', 'Hahn|Zahn|z=ts n=n sch=sch l=l', 'Dose|Hose|h=h s=z r=r g=g', 'Vase|Nase|n=n s=z d=d g=g', 'Geige|Feige|f=f z=ts d=d m=m', 'Mund|Mond|o=o: i=i ei=ai e=ə', 'Hand|Sand|s=z n=n v=v f=f', 'Schaf|Schal|l=l sch=sch n=n pf=pf', 'Gras|Glas|l=l s=s g=g n=n'],
        chain: ['Sand Hand Hund Mund Mond|h=h n=n b=b f=f;u=u e=ə o=o: ai=ai;m=m n=n w=v b=b;o=o: au=au e=e: i=i', 'Huhn Hahn Zahn Zaun|ah=a: a=a i=i e=ə;z=ts n=n s=z v=v;au=au e=e ai=ai a=a', 'Hahn Zahn Zaun|z=ts n=n m=m v=v;au=au e=ə u=u ei=ai', 'Mais Maus Haus|au=au i=i ah=a: u=u;h=h g=g b=b l=l', 'Dose Hose Rose|h=h s=z r=r k=k;r=r s=z d=d sch=sch', 'Zahn Hahn Huhn|h=h n=n t=t r=r;uh=u: ei=ai ö=ø: u=u', 'Hund Mund Mond|m=m n=n sch=sch v=v;o=o: a=a: ah=a: i=i']
      }
    },
    nl: {
      words: {'hond': 'animals/dog|h.o.n.d|h o n t|', 'mond': 'body parts/mouth|m.o.n.d|m o n t|', 'vis': 'animals/fish|v.i.s|v i s|', 'vos': 'animals/fox|v.o.s|v o s|', 'bos': 'camping/forest|b.o.s|b o s|', 'bus': 'vehicles/bus|b.u.s|b u s|', 'mus': 'birds 2/sparrow|m.u.s|m u s|', 'kam': 'around the house/comb|k.a.m|k a m|', 'lam': 'farm animals/lamb|l.a.m|l a m|', 'ham': 'At the Supermarket/ham|h.a.m|h a m|', 'kat': 'animals/cat|k.a.t|k a t|', 'kan': 'kitchen tools/jug|k.a.n|k a n|', 'kom': 'around the house/bowl|k.o.m|k o m|', 'pan': 'around the house/pan|p.a.n|p a n|', 'pen': 'around the house/pen|p.e.n|p e n|', 'pet': 'accessories/cap|p.e.t|p e t|', 'pot': 'around the house/pot|p.o.t|p o t|', 'mand': 'At the Supermarket/basket|m.a.n.d|m a n t|', 'tand': 'body parts/tooth|t.a.n.d|t a n t|', 'zand': 'summer/sand|z.a.n.d|z a n t|', 'hand': 'body parts/hand|h.a.n.d|h a n t|', 'kaas': 'At the Supermarket/cheese|k.aa.s|k aa s|', 'vaas': 'around the house/vase|v.aa.s|v aa s|', 'haan': 'farm animals/rooster|h.aa.n|h aa n|', 'maan': 'camping/moon|m.aa.n|m aa n|', 'peer': 'At the Supermarket/pear|p.ee.r|p ee r|', 'beer': 'camping/bear|b.ee.r|b ee r|', 'veer': 'easter/feather|v.ee.r|v ee r|', 'rok': 'clothing/skirt|r.o.k|r o k|', 'sok': 'accessories/sock|s.o.k|s o k|', 'mok': 'kitchen tools/mug|m.o.k|m o k|', 'kok': 'occupations/cook|k.o.k|k o k|', 'jas': 'clothing/coat|j.a.s|j a s|', 'tas': 'At the Supermarket/bag|t.a.s|t a s|', 'huis': 'miscellaneous/house|h.ui.s|h ui s|', 'muis': 'forest creatures/mouse|m.ui.s|m ui s|', 'bal': 'toys/ball|b.a.l|b a l|', 'bel': 'christmas/bell|b.e.l|b e l|', 'bol': 'shapes/sphere|b.o.l|b o l|', 'nest': 'spring/nest|n.e.s.t|n e s t|', 'vest': 'accessories/vest|v.e.s.t|v e s t|', 'kaart': 'camping/map|k.aa.r.t|k aa r t|', 'taart': 'At the Supermarket/pie|t.aa.r.t|t aa r t|', 'tafel': 'around the house/table|t.a.f.e.l|t aa f ə l|', 'wafel': 'bakery/waffle|w.a.f.e.l|w aa f ə l|'},
      levels: {
        first: ['kan|p=p|0|pan|pen|kok', 'veer|p=p|0|peer|beer|taart', 'nest|v=v|0|vest|mond|bus', 'tafel|w=w|0|wafel|tand|bel', 'beer|v=v|0|veer|peer|mond', 'tand|m=m|0|mand|hand|lam', 'kam|h=h|0|ham|lam|pet', 'rok|k=k|0|kok|mok|kam', 'sok|m=m|0|mok|kok|pot', 'peer|b=b|0|beer|veer|mand'],
        other: ['kam|t=t|2|kat|kan|haan', 'bel|o=o|1|bol|pen|hand', 'pen|a=a|1|pan|peer|kam', 'mond|a=a|1|mand|kaart|beer', 'bol|s=s|2|bos|vos|hond', 'kom|k=k|2|kok|mok|peer', 'vaas|i=i|1|vis|vos|bel', 'kan|m=m|2|kam|kat|taart', 'hond|a=a|1|hand|tand|mok', 'pot|e=e|1|pet|peer|bel'],
        swap: ['kok|kom|m=m s=s r=r d=t', 'mand|mond|o=o ui=ui e=e u=u', 'bel|bol|o=o a=a u=u ui=ui', 'pan|pen|e=e aa=aa ui=ui ee=ee', 'zand|hand|h=h n=n m=m j=j', 'rok|mok|m=m s=s k=k v=v', 'tas|jas|j=j s=s h=h r=r', 'peer|veer|v=v r=r b=b s=s', 'haan|maan|m=m n=n z=z r=r', 'kam|ham|h=h m=m n=n j=j'],
        chain: ['muis mus bus bos vos|u=u aa=aa e=e ee=ee;b=b s=s r=r n=n;o=o ee=ee e=e i=i;v=v l=l s=s k=k', 'rok sok mok kok kom|s=s m=m k=k v=v;m=m r=r k=k w=w;k=k r=r s=s j=j;m=m s=s r=r t=t', 'vos bos bol bal bel|b=b s=s k=k h=h;l=l r=r t=t m=m;a=a e=e u=u ui=ui;e=e o=o aa=aa u=u', 'lam ham kam kom kok|h=h k=k m=m n=n;k=k l=l m=m w=w;o=o i=i ee=ee u=u;k=k s=s d=t l=l', 'kaas vaas vis vos bos|v=v s=s p=p m=m;i=i o=o a=a u=u;o=o aa=aa ui=ui e=e;b=b s=s t=t n=n', 'kat kan pan pen pet|n=n m=m r=r s=s;p=p t=t m=m w=w;e=e aa=aa o=o ee=ee;t=t r=r s=s l=l', 'ham lam kam kat kan|l=l m=m k=k r=r;k=k h=h m=m n=n;t=t l=l n=n s=s;n=n m=m s=s l=l', 'pan kan kat kam kom|k=k n=n s=s b=b;t=t m=m l=l s=s;m=m n=n s=s l=l;o=o ee=ee e=ə u=u']
      }
    },
    sv: {
      words: {'hatt': 'accessories/hat|h.a.tt|h a t|', 'katt': 'animals/cat|k.a.tt|k a t|', 'kopp': 'around the house/cup|k.o.pp|k å p|', 'mopp': 'around the house/mop|m.o.pp|m å p|', 'mapp': 'classroom/folder|m.a.pp|m a p|', 'kök': 'around the house/kitchen|k.ö.k|k ö: k|', 'lök': 'At the Supermarket/onion|l.ö.k|l ö: k|', 'löv': 'spring/leaf|l.ö.v|l ö: v|', 'hök': 'birds 2/hawk|h.ö.k|h ö: k|', 'lås': 'around the house/lock|l.å.s|l å: s|', 'gås': 'birds 2/goose|g.å.s|g å: s|', 'mus': 'forest creatures/mouse|m.u.s|m u: s|', 'hus': 'miscellaneous/house|h.u.s|h u: s|', 'väst': 'accessories/vest|v.ä.s.t|v ä s t|', 'häst': 'animals/horse|h.ä.s.t|h ä s t|', 'skål': 'around the house/bowl|s.k.å.l|s k å: l|', 'skåp': 'around the house/cabinet|s.k.å.p|s k å: p|', 'kål': 'vegetables/cabbage|k.å.l|k å: l|', 'sol': 'beach/sun|s.o.l|s o: l|', 'säl': 'ocean life/seal|s.ä.l|s ä: l|', 'ris': 'At the Supermarket/rice|r.i.s|r i: s|', 'ros': 'flowers/rose|r.o.s|r o: s|', 'gris': 'animals/pig|g.r.i.s|g r i: s|', 'hand': 'body parts/hand|h.a.n.d|h a n d|', 'tand': 'body parts/tooth|t.a.n.d|t a n d|', 'sand': 'summer/sand|s.a.n.d|s a n d|', 'hund': 'animals/dog|h.u.n.d|h ɵ n d|', 'val': 'ocean life/whale|v.a.l|v a: l|', 'vas': 'around the house/vase|v.a.s|v a: s|', 'kam': 'around the house/comb|k.a.m|k a m|', 'haj': 'ocean life/shark|h.a.j|h a j|', 'paj': 'At the Supermarket/pie|p.a.j|p a j|', 'föl': 'farm animals/foal|f.ö.l|f ö: l|', 'pöl': 'spring/puddle|p.ö.l|p ö: l|'},
      levels: {
        first: ['hus|m=m|0|mus|ros|kam', 'katt|h=h|0|hatt|haj|kopp', 'haj|p=p|0|paj|kam|val', 'häst|v=v|0|väst|hand|pöl', 'kopp|m=m|0|mopp|kål|mus', 'tand|h=h|0|hand|sand|ros', 'hand|t=t|0|tand|sand|pöl', 'kök|l=l|0|lök|hök|kam', 'lök|h=h|0|hök|kök|gris', 'föl|p=p|0|pöl|säl|kål'],
        other: ['hund|a=a|1|hand|tand|vas', 'skål|p=p|3|skåp|sand|haj', 'vas|l=l|2|val|mus|sand', 'ris|o=o:|1|ros|lås|kök', 'haj|tt=t|2|hatt|mapp|gås', 'skåp|l=l|3|skål|sand|haj', 'sol|ä=ä:|1|säl|val|sand', 'mapp|o=å|1|mopp|hatt|katt', 'ros|i=i:|1|ris|sol|lök', 'kam|tt=t|2|katt|paj|kål'],
        swap: ['hand|sand|s=s t=t p=p l=l', 'pöl|föl|f=f l=l t=t v=v', 'mus|hus|h=h s=s r=r t=t', 'hök|kök|k=k l=l g=g m=m', 'skål|skåp|p=p k=k s=s t=t', 'mopp|kopp|k=k s=s f=f r=r', 'sol|säl|ä=ä: a=a: i=i: u=u:', 'ros|ris|i=i: a=a ö=ö: u=u:', 'katt|kam|m=m k=k d=d j=j', 'lås|gås|g=g s=s m=m p=p'],
        chain: ['kam katt hatt haj paj|tt=t k=k l=l pp=p;h=h m=m f=f p=p;j=j k=k d=d v=v;p=p f=f k=k l=l', 'hund hand tand sand|a=a o=o: ä=ä: å=å:;t=t s=s r=r f=f;s=s h=h m=m l=l', 'hök kök lök löv|k=k l=l t=t v=v;l=l h=h v=v s=s;v=v l=l p=p m=m', 'lök hök kök|h=h k=k v=v p=p;k=k l=l t=t g=g', 'hand tand sand|t=t s=s p=p g=g;s=s h=h l=l r=r', 'mapp mopp kopp|o=å ö=ö: u=ɵ i=i:;k=k g=g t=t l=l', 'hatt haj paj|j=j k=k pp=p p=p;p=p s=s v=v r=r']
      }
    },
    da: {
      words: {'hat': 'accessories/hat|h.a.t|h a t|', 'kat': 'animals/cat|k.a.t|k a t|', 'hest': 'animals/horse|h.e.s.t|h e s t|', 'vest': 'accessories/vest|v.e.s.t|v e s t|', 'lås': 'around the house/lock|l.å.s|l å: s|', 'gås': 'birds 2/goose|g.å.s|g å: s|', 'mus': 'forest creatures/mouse|m.u.s|m u: s|', 'hus': 'miscellaneous/house|h.u.s|h u: s|', 'bus': 'vehicles/bus|b.u.s|b u s|', 'kam': 'around the house/comb|k.a.m|k a m|', 'lam': 'farm animals/lamb|l.a.m|l a m|', 'kok': 'occupations/chef|k.o.k|k o k|', 'sok': 'accessories/sock|s.o.k|s o k|', 'tand': 'body parts/tooth|t.a.n|t a n|d', 'sand': 'summer/sand|s.a.n|s a n|d', 'and': 'animals/duck|a.n|a n|d', 'pose': 'At the Supermarket/bag|p.o.s.e|p o: s ə|', 'rose': 'flowers/rose|r.o.s.e|r o: s ə|', 'bål': 'miscellaneous/bonfire|b.å.l|b å: l|', 'kål': 'vegetables/cabbage|k.å.l|k å: l|', 'skål': 'around the house/bowl|s.k.å.l|s k å: l|', 'sol': 'beach/sun|s.o.l|s o: l|', 'sæl': 'ocean life/seal|s.æ.l|s æ: l|', 'ris': 'At the Supermarket/rice|r.i.s|r i: s|', 'gris': 'animals/pig|g.r.i.s|g r i: s|', 'ost': 'At the Supermarket/cheese|o.s.t|o s t|', 'kost': 'around the house/broom|k.o.s.t|k o s t|', 'ko': 'farm animals/cow|k.o|k o:|', 'sko': 'clothing/shoe|s.k.o|s k o:|'},
      levels: {
        first: ['sok|k=k|0|kok|sand|sol', 'pose|r=r|0|rose|vest|and', 'kål|b=b|0|bål|gås|hus', 'kat|h=h|0|hat|sand|sæl', 'rose|p=p|0|pose|vest|tand', 'kok|s=s|0|sok|kat|bus', 'lås|g=g|0|gås|bus|rose', 'gås|l=l|0|lås|bål|rose', 'sand|t=t|0|tand|sok|ris', 'mus|h=h|0|hus|ris|vest'],
        swap: ['kam|lam|l=l m=m t=t s=s', 'rose|pose|p=p s=s h=h l=l', 'sok|kok|k=k g=g t=t v=v', 'hest|vest|v=v t=t s=s l=l', 'gås|lås|l=l s=s b=b r=r', 'kat|hat|h=h m=m t=t r=r', 'hus|mus|m=m s=s r=r v=v', 'kål|bål|b=b l=l h=h s=s', 'sæl|sol|o=o: u=u: a=a e=e', 'sand|tand|t=t b=b g=g p=p']
      }
    },
    no: {
      words: {'hatt': 'accessories/hat|h.a.tt|h a t|', 'katt': 'animals/cat|k.a.tt|k a t|', 'sokk': 'accessories/sock|s.o.kk|s å k|', 'kokk': 'occupations/chef|k.o.kk|k å k|', 'hest': 'animals/horse|h.e.s.t|h e s t|', 'vest': 'accessories/vest|v.e.s.t|v e s t|', 'lås': 'around the house/lock|l.å.s|l å: s|', 'gås': 'birds 2/goose|g.å.s|g å: s|', 'kopp': 'around the house/cup|k.o.pp|k å p|', 'mopp': 'around the house/mop|m.o.pp|m å p|', 'sopp': 'vegetables/mushroom|s.o.pp|s å p|', 'mus': 'forest creatures/mouse|m.u.s|m ʉ: s|', 'hus': 'miscellaneous/house|h.u.s|h ʉ: s|', 'kam': 'around the house/comb|k.a.m|k a m|', 'lam': 'farm animals/lamb|l.a.m|l a m|', 'bål': 'miscellaneous/bonfire|b.å.l|b å: l|', 'båt': 'toys/boat|b.å.t|b å: t|', 'kål': 'vegetables/cabbage|k.å.l|k å: l|', 'tann': 'body parts/tooth|t.a.nn|t a n|', 'tang': 'kitchen tools/tongs|t.a.ng|t a ng|', 'hai': 'ocean life/shark|h.ai|h ai|', 'pai': 'At the Supermarket/pie|p.ai|p ai|', 'sel': 'ocean life/seal|s.e.l|s e: l|', 'sol': 'beach/sun|s.o.l|s u: l|', 'ski': 'winter/skiing|s.k.i|s k i:|', 'sko': 'clothing/shoe|s.k.o|s k u:|', 'sky': 'beach/cloud|s.k.y|s k y:|'},
      levels: {
        first: ['sopp|m=m|0|mopp|kopp|tang', 'hatt|k=k|0|katt|lam|sopp', 'pai|h=h|0|hai|mopp|lås', 'mopp|s=s|0|sopp|kopp|kam', 'hest|v=v|0|vest|tang|bål', 'katt|h=h|0|hatt|kål|lås', 'mus|h=h|0|hus|lås|ski', 'lås|g=g|0|gås|hus|mus', 'vest|h=h|0|hest|ski|sko', 'sokk|k=k|0|kokk|sopp|sol'],
        other: ['sky|o=u:|2|sko|ski|hus', 'sel|o=u:|1|sol|ski|vest', 'sko|y=y:|2|sky|ski|mopp', 'katt|m=m|2|kam|lam|hest', 'kokk|pp=p|2|kopp|sopp|hai', 'kam|tt=t|2|katt|hatt|kokk', 'kopp|kk=k|2|kokk|sopp|hatt', 'tann|ng=ng|2|tang|katt|hatt', 'tang|nn=n|2|tann|lam|sol', 'båt|l=l|2|bål|gås|vest'],
        swap: ['sko|sky|y=y: i=i: ai=ai a=a', 'tann|tang|ng=ng t=t m=m kk=k', 'båt|bål|l=l kk=k pp=p s=s', 'katt|kam|m=m ng=ng pp=p l=l', 'kokk|kopp|pp=p s=s m=m tt=t', 'mus|hus|h=h s=s g=g v=v', 'pai|hai|h=h k=k v=v b=b', 'gås|lås|l=l s=s b=b h=h', 'sel|sol|o=u: a=a å=å: u=ʉ:', 'vest|hest|h=h s=s t=t b=b']
      }
    },
    es: {
      words: {'gato': 'animals/cat|g.a.t.o|g a t o|', 'pato': 'animals/duck|p.a.t.o|p a t o|', 'capa': 'accessories/cape|c.a.p.a|k a p a|', 'mapa': 'camping/map|m.a.p.a|m a p a|', 'papa': 'At the Supermarket/potato|p.a.p.a|p a p a|', 'cama': 'around the house/bed|c.a.m.a|k a m a|', 'casa': 'miscellaneous/house|c.a.s.a|k a s a|', 'cara': 'body parts/face|c.a.r.a|k a r a|', 'roca': 'beach/rock|r.o.c.a|rr o k a|', 'boca': 'body parts/mouth|b.o.c.a|b o k a|', 'foca': 'ocean life/seal|f.o.c.a|f o k a|', 'rosa': 'flowers/rose|r.o.s.a|rr o s a|', 'loro': 'birds 2/parrot|l.o.r.o|l o r o|', 'toro': 'farm animals/bull|t.o.r.o|t o r o|', 'lobo': 'animals/wolf|l.o.b.o|l o b o|', 'luna': 'camping/moon|l.u.n.a|l u n a|', 'cuna': 'furniture/crib|c.u.n.a|k u n a|', 'cono': 'shapes/cone|c.o.n.o|k o n o|', 'mono': 'zoo animals/monkey|m.o.n.o|m o n o|', 'mano': 'body parts/hand|m.a.n.o|m a n o|', 'gorro': 'accessories/beanie|g.o.rr.o|g o rr o|', 'zorro': 'animals/fox|z.o.rr.o|s o rr o|', 'gorra': 'accessories/cap|g.o.rr.a|g o rr a|', 'ojo': 'body parts/eye|o.j.o|o j o|', 'oso': 'camping/bear|o.s.o|o s o|', 'sal': 'At the Supermarket/salt|s.a.l|s a l|', 'sol': 'beach/sun|s.o.l|s o l|', 'col': 'vegetables/cabbage|c.o.l|k o l|', 'pala': 'toys/shovel|p.a.l.a|p a l a|', 'banca': 'furniture/bench|b.a.n.c.a|b a n k a|', 'banco': 'furniture/stool|b.a.n.c.o|b a n k o|', 'coco': 'fruits/coconut|c.o.c.o|k o k o|', 'mesa': 'around the house/table|m.e.s.a|m e s a|', 'pera': 'At the Supermarket/pear|p.e.r.a|p e r a|', 'nido': 'spring/nest|n.i.d.o|n i d o|', 'dedo': 'body parts/finger|d.e.d.o|d e d o|'},
      levels: {
        first: ['col|s=s|0|sol|sal|banca', 'pato|g=g|0|gato|lobo|rosa', 'roca|f=f|0|foca|boca|papa', 'capa|p=p|0|papa|mapa|foca', 'cono|m=m|0|mono|gorra|cama', 'loro|t=t|0|toro|gorra|nido', 'papa|m=m|0|mapa|capa|gorro', 'foca|r=rr|0|roca|boca|luna', 'sol|c=k|0|col|sal|gorra', 'gorro|z=s|0|zorro|cono|luna'],
        other: ['rosa|c=k|2|roca|cuna|cara', 'casa|m=m|2|cama|cara|pera', 'cara|s=s|2|casa|cama|cono', 'pala|p=p|2|papa|foca|gato', 'cono|c=k|2|coco|lobo|papa', 'oso|j=j|1|ojo|mono|rosa', 'mano|o=o|1|mono|toro|gato', 'sal|o=o|1|sol|col|boca', 'capa|r=r|2|cara|casa|ojo', 'ojo|s=s|1|oso|gorra|mapa'],
        swap: ['zorro|gorro|g=g f=f t=t n=n', 'coco|cono|n=n b=b rr=rr m=m', 'banca|banco|o=o u=u e=e i=i', 'cuna|luna|l=l n=n m=m d=d', 'papa|pala|l=l m=m c=k rr=rr', 'cama|casa|s=s p=p r=r b=b', 'mano|mono|o=o i=i u=u e=e', 'ojo|oso|s=s t=t r=r l=l', 'capa|cara|r=r s=s m=m b=b', 'sol|sal|a=a e=e i=i u=u'],
        chain: ['cara casa cama capa papa|s=s m=m p=p t=t;m=m p=p r=r t=t;p=p s=s r=r j=j;p=p m=m s=s t=t', 'mano mono cono coco|o=o u=u i=i e=e;c=k n=n d=d p=p;c=k m=m rr=rr d=d', 'mapa capa papa pala|c=k p=p b=b n=n;p=p m=m s=s n=n;l=l m=m c=k t=t', 'rosa roca foca boca|c=k n=n j=j p=p;f=f s=s b=b n=n;b=b r=rr t=t g=g', 'roca boca foca|b=b s=s f=f l=l;f=f r=rr s=s p=p', 'col sol sal|s=s l=l p=p d=d;a=a e=e i=i u=u', 'gorra gorro zorro|o=o e=e i=i u=u;z=s n=n t=t m=m', 'mono cono coco|c=k n=n d=d f=f;c=k m=m j=j t=t']
      }
    },
    it: {
      words: {'cane': 'animals/dog|c.a.n.e|k a n e|', 'pane': 'At the Supermarket/bread|p.a.n.e|p a n e|', 'porta': 'around the house/door|p.o.r.t.a|p o r t a|', 'torta': 'At the Supermarket/pie|t.o.r.t.a|t o r t a|', 'vaso': 'around the house/vase|v.a.s.o|v a s o|', 'naso': 'body parts/nose|n.a.s.o|n a s o|', 'riso': 'At the Supermarket/rice|r.i.s.o|r i s o|', 'viso': 'body parts/face|v.i.s.o|v i s o|', 'sale': 'At the Supermarket/salt|s.a.l.e|s a l e|', 'sole': 'beach/sun|s.o.l.e|s o l e|', 'topo': 'forest creatures/mouse|t.o.p.o|t o p o|', 'toro': 'farm animals/bull|t.o.r.o|t o r o|', 'cubo': 'shapes/cube|c.u.b.o|k u b o|', 'tubo': 'around the house/hose|t.u.b.o|t u b o|', 'mucca': 'farm animals/cow|m.u.cc.a|m u kk a|', 'zucca': 'At the Supermarket/pumpkin|z.u.cc.a|ts u kk a|', 'pacco': 'post office/package|p.a.cc.o|p a kk o|', 'sacco': 'christmas/sack|s.a.cc.o|s a kk o|', 'succo': 'At the Supermarket/juice|s.u.cc.o|s u kk o|', 'gazza': 'birds 2/magpie|g.a.zz.a|g a tts a|', 'tazza': 'around the house/cup|t.a.zz.a|t a tts a|', 'panca': 'furniture/bench|p.a.n.c.a|p a n k a|', 'panda': 'animals/panda|p.a.n.d.a|p a n d a|', 'colla': 'classroom/glue|c.o.ll.a|k o ll a|', 'culla': 'furniture/crib|c.u.ll.a|k u ll a|', 'scala': 'tools/ladder|s.c.a.l.a|s k a l a|', 'scale': 'around the house/stairs|s.c.a.l.e|s k a l e|', 'cervo': 'camping/deer|c.e.r.v.o|ch e r v o|', 'corvo': 'birds 2/crow|c.o.r.v.o|k o r v o|'},
      levels: {
        first: ['torta|p=p|0|porta|cervo|panda', 'vaso|n=n|0|naso|pacco|zucca', 'naso|v=v|0|vaso|pacco|cane', 'porta|t=t|0|torta|scala|mucca', 'mucca|z=ts|0|zucca|tazza|porta', 'cane|p=p|0|pane|colla|succo', 'pacco|s=s|0|sacco|viso|scala', 'zucca|m=m|0|mucca|colla|naso', 'sacco|p=p|0|pacco|cubo|naso', 'viso|r=r|0|riso|sacco|panca'],
        other: ['panda|c=k|3|panca|scala|cervo', 'sale|o=o|1|sole|succo|tazza', 'culla|o=o|1|colla|gazza|corvo', 'scala|e=e|4|scale|panda|topo', 'panca|d=d|3|panda|torta|riso', 'sacco|u=u|1|succo|tazza|viso', 'vaso|i=i|1|viso|pane|mucca', 'colla|u=u|1|culla|cane|succo', 'sole|a=a|1|sale|colla|corvo', 'toro|p=p|2|topo|naso|zucca'],
        swap: ['viso|riso|r=r s=s g=g c=k', 'zucca|mucca|m=m v=v c=k p=p', 'panca|panda|d=d p=p n=n zz=tts', 'scale|scala|a=a o=o u=u i=i', 'tubo|cubo|c=k v=v s=s r=r', 'cane|pane|p=p n=n v=v z=ts', 'pacco|sacco|s=s t=t c=ch g=g', 'sale|sole|o=o e=e i=i u=u', 'topo|toro|r=r t=t s=s zz=tts', 'culla|colla|o=o a=a i=i e=e']
      }
    },
    pt: {
      words: {'gato': 'animals/cat|g.a.t.o|g a t u|', 'pato': 'animals/duck|p.a.t.o|p a t u|', 'rato': 'forest creatures/mouse|r.a.t.o|h a t u|', 'galo': 'farm animals/rooster|g.a.l.o|g a l u|', 'faca': 'around the house/knife|f.a.c.a|f a k a|', 'vaca': 'farm animals/cow|v.a.c.a|v a k a|', 'porta': 'around the house/door|p.o.r.t.a|p ɔ r t a|', 'torta': 'At the Supermarket/pie|t.o.r.t.a|t ɔ r t a|', 'bola': 'toys/ball|b.o.l.a|b ɔ l a|', 'cola': 'classroom/glue|c.o.l.a|k ɔ l a|', 'capa': 'accessories/cape|c.a.p.a|k a p a|', 'mapa': 'camping/map|m.a.p.a|m a p a|', 'cama': 'around the house/bed|c.a.m.a|k ã m a|', 'casa': 'miscellaneous/house|c.a.s.a|k a z a|', 'mão': 'body parts/hand|m.ão|m ão|', 'pão': 'At the Supermarket/bread|p.ão|p ão|', 'sal': 'At the Supermarket/salt|s.a.l|s a w|', 'sol': 'beach/sun|s.o.l|s ɔ w|', 'saco': 'christmas/sack|s.a.c.o|s a k u|', 'suco': 'At the Supermarket/juice|s.u.c.o|s u k u|', 'pena': 'easter/feather|p.e.n.a|p ẽ n a|', 'pera': 'At the Supermarket/pear|p.e.r.a|p e r a|', 'dente': 'body parts/tooth|d.e.n.t.e|d ẽ n t i|', 'pente': 'around the house/comb|p.e.n.t.e|p ẽ n t i|', 'pomba': 'birds 2/dove|p.o.m.b.a|p õ m b a|'},
      levels: {
        first: ['mão|p=p|0|pão|rato|pera', 'capa|m=m|0|mapa|pena|sal', 'faca|v=v|0|vaca|cama|sol', 'rato|p=p|0|pato|gato|galo', 'vaca|f=f|0|faca|mapa|mão', 'gato|r=h|0|rato|pato|pente', 'cola|b=b|0|bola|cama|capa', 'pão|m=m|0|mão|torta|sol', 'bola|c=k|0|cola|mapa|pena', 'dente|p=p|0|pente|torta|galo'],
        other: ['galo|t=t|2|gato|mapa|mão', 'casa|p=p|2|capa|pato|mapa', 'suco|a=a|1|saco|pato|mão', 'sal|o=ɔ|1|sol|rato|pão', 'saco|u=u|1|suco|gato|cama', 'sol|a=a|1|sal|mão|porta', 'gato|l=l|2|galo|mapa|pena', 'capa|s=z|2|casa|mapa|faca'],
        swap: ['pato|rato|r=h g=g t=t b=b', 'sol|sal|a=a e=e u=u ão=ão', 'dente|pente|p=p t=t m=m g=g', 'galo|gato|t=t c=k m=m r=r', 'mão|pão|p=p r=h c=k s=s', 'faca|vaca|v=v b=b r=h g=g', 'cola|bola|b=b r=h t=t m=m', 'torta|porta|p=p f=f c=k g=g']
      }
    },
    fr: {
      words: {'pain': 'At the Supermarket/bread|p.ain|p in|', 'main': 'body parts/hand|m.ain|m in|', 'paon': 'birds 2/peacock|p.aon|p an|', 'bouche': 'body parts/mouth|b.ou.ch|b ou ch|e', 'louche': 'kitchen tools/ladle|l.ou.ch|l ou ch|e', 'gâteau': '4th of July/cake|g.â.t.eau|g a t o|', 'râteau': 'around the house/rake|r.â.t.eau|r a t o|', 'carte': 'camping/map|c.a.r.t|k a r t|e', 'tarte': 'At the Supermarket/pie|t.a.r.t|t a r t|e', 'seau': 'beach/bucket|s.eau|s o|', 'veau': 'farm animals/calf|v.eau|v o|', 'juge': 'occupations/judge|j.u.g|j u j|e', 'luge': 'winter/sled|l.u.g|l u j|e', 'lune': 'camping/moon|l.u.n|l u n|e', 'jupe': 'clothing/skirt|j.u.p|j u p|e', 'sable': 'summer/sand|s.a.b.l|s a b l|e', 'table': 'around the house/table|t.a.b.l|t a b l|e', 'filet': 'beach/net|f.i.l.et|f i l ê|', 'gilet': 'accessories/vest|g.i.l.et|j i l ê|', 'soda': 'At the Supermarket/soda|s.o.d.a|s o d a|', 'sofa': 'furniture/sofa|s.o.f.a|s o f a|', 'terre': 'space/earth|t.e.rr|t ê r|e', 'verre': 'kitchen tools/glass|v.e.rr|v ê r|e'},
      levels: {
        first: ['filet|g=j|0|gilet|pain|louche', 'tarte|c=k|0|carte|râteau|veau', 'bouche|l=l|0|louche|luge|jupe', 'louche|b=b|0|bouche|luge|paon', 'sable|t=t|0|table|gâteau|juge', 'râteau|g=g|0|gâteau|sable|soda', 'verre|t=t|0|terre|filet|juge', 'gâteau|r=r|0|râteau|sable|carte', 'carte|t=t|0|tarte|gâteau|râteau', 'terre|v=v|0|verre|sable|gilet'],
        other: ['luge|n=n|2|lune|louche|sofa', 'paon|ain=in|1|pain|main|lune', 'juge|p=p|2|jupe|luge|louche', 'jupe|g=j|2|juge|luge|terre', 'lune|g=j|2|luge|louche|jupe', 'soda|f=f|2|sofa|sable|terre', 'sofa|d=d|2|soda|sable|seau', 'pain|aon=an|1|paon|main|juge'],
        swap: ['paon|pain|ain=in eau=o a=a u=u', 'sofa|soda|d=d b=b r=r l=l', 'gilet|filet|f=f l=l v=v r=r', 'tarte|carte|c=k r=r s=s g=g', 'sable|table|t=t b=b l=l p=p', 'râteau|gâteau|g=g t=t l=l f=f', 'terre|verre|v=v g=j p=p s=s', 'veau|seau|s=s m=m j=j p=p', 'bouche|louche|l=l g=g r=r m=m']
      }
    },
    fi: {
      words: {'sukka': 'accessories/sock|s.u.k.k.a|s u k k a|', 'kukka': 'spring/flower|k.u.k.k.a|k u k k a|', 'kukko': 'farm animals/rooster|k.u.k.k.o|k u k k o|', 'lukko': 'around the house/lock|l.u.k.k.o|l u k k o|', 'suu': 'body parts/mouth|s.u.u|s u u|', 'kuu': 'camping/moon|k.u.u|k u u|', 'hana': 'around the house/faucet|h.a.n.a|h a n a|', 'kana': 'farm animals/chicken|k.a.n.a|k a n a|', 'kani': 'animals/rabbit|k.a.n.i|k a n i|', 'kala': 'animals/fish|k.a.l.a|k a l a|', 'pannu': 'around the house/pan|p.a.n.n.u|p a n n u|', 'kannu': 'kitchen tools/jug|k.a.n.n.u|k a n n u|', 'tussi': 'classroom/marker|t.u.s.s.i|t u s s i|', 'bussi': 'vehicles/bus|b.u.s.s.i|b u s s i|', 'kokki': 'occupations/chef|k.o.k.k.i|k o k k i|', 'lokki': 'animals/seagull|l.o.k.k.i|l o k k i|', 'kiivi': 'At the Supermarket/kiwi|k.i.i.v.i|k i i v i|', 'liivi': 'accessories/vest|l.i.i.v.i|l i i v i|', 'gekko': 'pets/gecko|g.e.k.k.o|g e k k o|', 'mekko': 'clothing/dress|m.e.k.k.o|m e k k o|', 'kirja': 'classroom/book|k.i.r.j.a|k i r j a|', 'kirje': 'post office/letter|k.i.r.j.e|k i r j e|', 'takka': 'around the house/fireplace|t.a.k.k.a|t a k k a|', 'takki': 'clothing/coat|t.a.k.k.i|t a k k i|', 'muki': 'kitchen tools/mug|m.u.k.i|m u k i|', 'pallo': 'toys/ball|p.a.l.l.o|p a l l o|', 'pullo': 'kitchen tools/bottle|p.u.l.l.o|p u l l o|'},
      levels: {
        first: ['tussi|b=b|0|bussi|kokki|kirje', 'sukka|k=k|0|kukka|tussi|lokki', 'kana|h=h|0|hana|kala|pallo', 'gekko|m=m|0|mekko|takka|kiivi', 'kuu|s=s|0|suu|sukka|lokki', 'mekko|g=g|0|gekko|takka|kokki', 'hana|k=k|0|kana|kala|pullo', 'lukko|k=k|0|kukko|kokki|mekko', 'bussi|t=t|0|tussi|takki|pannu', 'pannu|k=k|0|kannu|takki|mekko'],
        other: ['pallo|u=u|1|pullo|takka|kirje', 'kana|i=i|3|kani|kala|pullo', 'kala|n=n|2|kana|kani|lokki', 'kirja|e=e|4|kirje|kukka|takka', 'takka|i=i|4|takki|kannu|kani', 'pullo|a=a|1|pallo|pannu|kokki', 'kirje|a=a|4|kirja|liivi|tussi', 'kukko|a=a|4|kukka|takki|kani', 'takki|a=a|4|takka|lukko|kana', 'kukka|o=o|4|kukko|kannu|kana'],
        swap: ['kirja|kirje|e=e i=i u=u o=o', 'kani|kana|a=a u=u e=e o=o', 'pallo|pullo|u=u o=o e=e i=i', 'kiivi|liivi|l=l p=p g=g m=m', 'lokki|kokki|k=k b=b m=m t=t', 'takka|takki|i=i e=e u=u o=o', 'lukko|kukko|k=k g=g h=h m=m', 'suu|kuu|k=k p=p b=b h=h', 'mekko|gekko|g=g k=k l=l p=p', 'pannu|kannu|k=k m=m b=b s=s']
      }
    }
  };

  var LOCALES = Object.keys(DATA), LEVEL_KEYS = ['first', 'other', 'swap', 'chain', 'add'];
  function locale(l) { return DATA[l] ? l : 'en'; }
  function levels(loc) { var L = DATA[locale(loc)].levels; return LEVEL_KEYS.filter(function (k) { return L[k] && L[k].length; }); }
  function level(loc, v) { var ls = levels(loc); return ls.indexOf(v) >= 0 ? v : ls[0]; }

  var _wc = {};
  function word(loc, w) {
    loc = locale(loc);
    var k = loc + '/' + w; if (_wc[k]) return _wc[k];
    var s = DATA[loc].words[w]; if (!s) throw new Error('flip-card: no word ' + loc + ' ' + w);
    var p = s.split('|');
    return (_wc[k] = { word: w, pic: p[0], tiles: p[1].split('.'), keys: p[2].split(' '), tail: p[3] || '' });
  }
  /* the picture word whose sounds are exactly these keys (or null: a blank card) */
  function lookup(loc, keys) {
    loc = locale(loc); var want = keys.join(' '), ws = DATA[loc].words;
    for (var w in ws) if (ws[w].split('|')[2] === want) return word(loc, w);
    return null;
  }
  function tile(s) { var i = s.indexOf('='); return { g: s.slice(0, i), k: s.slice(i + 1) }; }

  function rounds(loc, lv) {
    loc = locale(loc); lv = level(loc, lv);
    var list = DATA[loc].levels[lv] || [];
    return list.map(function (t) {
      var p = t.split('|');
      if (lv === 'swap') return { id: 'swap-' + p[0].toLowerCase() + '-' + p[1].toLowerCase(), level: lv, loc: loc, start: word(loc, p[0]), goal: word(loc, p[1]), tray: p[2].split(' ').map(tile) };
      if (lv === 'chain') { var ws = p[0].split(' ').map(function (w) { return word(loc, w); }); return { id: 'chain-' + p[0].toLowerCase().split(' ').join('-'), level: lv, loc: loc, words: ws, start: ws[0], goal: ws[ws.length - 1], trays: p[1].split(';').map(function (tr) { return tr.split(' ').map(tile); }) }; }
      var start = word(loc, p[0]), tl = tile(p[1]), slot = lv === 'add' ? p[2] : +p[2];
      return { id: lv + '-' + start.word.toLowerCase() + '-' + tl.g, level: lv, loc: loc, start: start, tile: tl, slot: slot, answer: word(loc, p[3]),
        choices: [p[3], p[4], p[5]].map(function (w) { return word(loc, w); }), pos: lv === 'add' ? slot : posOf(start.keys.length, slot) };
    });
  }
  function posOf(n, i) { return i === 0 ? 'first' : i === n - 1 ? 'last' : 'middle'; }

  /* THE SWAP: the tile replaces the one in the slot (the old tile pops out); an added tile opens a new slot */
  function apply(card, slot, t) {
    var tiles = card.tiles.slice(), keys = card.keys.slice();
    if (slot === 'start') { tiles.unshift(t.g); keys.unshift(t.k); }
    else if (slot === 'end') { tiles.push(t.g); keys.push(t.k); }
    else { tiles[slot] = t.g; keys[slot] = t.k; }
    return { tiles: tiles, keys: keys };
  }
  function face(loc, card) { var w = lookup(loc, card.keys); return w ? { word: w.word, pic: w.pic, tail: w.tail } : null; }

  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return function () { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  /* one pass of choice layouts: the answer in each slot a third of the time (±1); the "nearly" picture beside it in half the rounds */
  function deal(n, rnd) {
    var slots = []; for (var i = 0; i < n; i++) slots.push(i % 3);
    shuffle(slots, rnd);
    var mids = slots.filter(function (s) { return s === 1; }).length, need = Math.max(0, Math.round(n / 2) - mids);
    var edges = []; slots.forEach(function (s, i) { if (s !== 1) edges.push(i); });
    shuffle(edges, rnd);
    return slots.map(function (t, i) {
      var adj = t === 1 || edges.indexOf(i) < need, other = [0, 1, 2].filter(function (s) { return s !== t; });
      var nr = t === 1 ? other[Math.floor(rnd() * 2)] : (adj ? 1 : (t === 0 ? 2 : 0));
      var lay = [null, null, null]; lay[t] = 0; lay[nr] = 1; lay[other.filter(function (s) { return s !== nr; })[0]] = 2;
      return lay;
    });
  }
  /* one pass of tray orders: the goal's tile in each of the four places a quarter of the time (±1) */
  function dealTray(n, rnd) {
    var pos = []; for (var i = 0; i < n; i++) pos.push(i % 4);
    shuffle(pos, rnd);
    return pos.map(function (p) { var o = shuffle([1, 2, 3], rnd); o.splice(p, 0, 0); return o; });
  }

  function newState(r, opts) {
    opts = opts || {};
    var st = { r: r, misses: 0, help: 0, show: false, last: null, done: false, guess: -1, step: 0, reached: [] };
    st.card = { tiles: r.start.tiles.slice(), keys: r.start.keys.slice() };
    if (r.level === 'swap' || r.level === 'chain') {
      st.trayOrder = opts.trayOrder || [0, 1, 2, 3];
      st.goal = r.level === 'chain' ? r.words[1] : r.goal;
      st.reached = [r.start.word];
    } else st.layout = opts.layout || [0, 1, 2];
    return st;
  }
  function moved(st) { st.show = false; st.last = null; }
  function trayOf(st) { var r = st.r, tr = r.level === 'chain' ? r.trays[st.step] : r.tray; return st.trayOrder.map(function (i) { return tr[i]; }); }
  function choiceAt(st, slot) { return st.r.choices[st.layout[slot]]; }
  /* predict levels: tap a picture */
  function guess(st, slot) { if (st.done || st.r.choices === undefined || slot < 0 || slot > 2 || st.guess === slot) return false; st.guess = slot; moved(st); return true; }
  /* swap levels: a tray tile pushed into a slot of the card; the card becomes whatever the tiles now say */
  function put(st, slot, ti) {
    var r = st.r;
    if (st.done || (r.level !== 'swap' && r.level !== 'chain') || slot < 0 || slot >= st.card.tiles.length) return false;
    var t = trayOf(st)[ti]; if (!t || st.card.keys[slot] === t.k && st.card.tiles[slot] === t.g) return false;
    st.card = apply(st.card, slot, t); moved(st);
    return true;
  }
  function same(a, b) { return a.join(' ') === b.join(' '); }

  function check(st) {
    var r = st.r, loc = r.loc;
    if (st.done) return { ok: true };
    if (r.choices) {
      if (st.guess < 0) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
      var res = apply({ tiles: r.start.tiles, keys: r.start.keys }, r.slot, r.tile), fw = face(loc, res), g = choiceAt(st, st.guess);
      if (same(g.keys, res.keys)) { st.done = true; st.show = false; st.card = res; st.last = { result: 'right', face: fw }; return { ok: true, face: fw }; }
      st.misses++; st.help = Math.min(2, st.misses); st.show = true;
      st.last = { result: 'wrong', face: fw, card: res, guess: g.word, diff: diffAt(g.keys, res.keys) };
      return { ok: false, kase: 'wrong', face: fw };
    }
    if (same(st.card.keys, r.level === 'chain' ? r.words[st.step].keys : r.start.keys)) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
    if (same(st.card.keys, st.goal.keys)) {
      if (r.level === 'chain' && st.step < r.words.length - 2) {
        st.step++; st.reached.push(st.goal.word); st.goal = r.words[st.step + 1]; st.misses = 0; st.help = 0; st.show = false; st.last = { result: 'step' };
        return { ok: false, kase: 'step', step: st.step };
      }
      if (r.level === 'chain') st.reached.push(st.goal.word);
      st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true };
    }
    st.misses++; st.help = Math.min(2, st.misses); st.show = true;
    st.last = { result: 'wrong', diff: diffAt(st.card.keys, st.goal.keys) };
    return { ok: false, kase: 'wrong' };
  }
  /* the places where two sound lists differ (equal lengths), or [-1] */
  function diffAt(a, b) { if (a.length !== b.length) return [-1]; var d = []; a.forEach(function (k, i) { if (k !== b[i]) d.push(i); }); return d; }
  /* the slot that must change to reach the goal (help) */
  function needSlot(st) { var r = st.r; if (r.choices) return r.slot; var d = diffAt(st.card.keys, st.goal.keys); return d.length === 1 ? d[0] : -1; }
  /* miss 2 brings the help; any move takes it away again */
  function helpOn(st) { return !st.done && st.show && st.help >= 2; }
  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, r = st.r;
    if (R === 'empty') return r.choices ? 'hintPick' : 'hintSwapOne';
    if (R === 'step') return null;
    if (r.choices) return st.help >= 2 ? (r.level === 'add' ? 'hintHelpAdd' : 'hintHelp') : 'hintTurned';
    return st.help >= 2 ? 'hintHelpSwap' : 'hintGoal';
  }
  /* every outcome a tray can reach (the reviewer's list and the deny gate) */
  function outcomes(loc, start, tray) {
    var out = [];
    start.tiles.forEach(function (_, s) { tray.forEach(function (t) { var c = apply(start, s, t), w = lookup(loc, c.keys); out.push({ slot: s, tile: t.g, keys: c.keys.join(' '), letters: c.tiles.join(''), word: w ? w.word : null }); }); });
    return out;
  }
  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }
  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.card = wide ? 300 : Math.min(280, W - 16);
    L.pic = wide ? 200 : (W < 340 ? 104 : 150);
    L.tile = wide ? 76 : (W < 340 ? 58 : 64);
    L.choice = wide ? 104 : (W < 340 ? 72 : 80);
    L.parrot = wide ? 96 : 64;
    return L;
  }

  return {
    DATA: DATA, LOCALES: LOCALES, LEVEL_KEYS: LEVEL_KEYS,
    locale: locale, levels: levels, level: level, word: word, lookup: lookup, rounds: rounds, posOf: posOf, apply: apply, face: face,
    seeded: seeded, deal: deal, dealTray: dealTray, newState: newState, trayOf: trayOf, choiceAt: choiceAt, guess: guess, put: put,
    check: check, diffAt: diffAt, needSlot: needSlot, helpOn: helpOn, hint: hint, outcomes: outcomes, order: order, layout: layout
  };
}));
