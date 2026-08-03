# Activity mobile-layout audit — https://www.lessoncraftstudio.com

Widths: 280, 320, 360, 375, 390, 412, 430, 768 · **684** renders · **649 pass / 35 fail** (61 pass-with-warnings)

| engine | renders | pass | failing checks |
|---|---|---|---|
| array | 14 | 14 | — |
| choice-board | 304 | 273 | boxOverlap×1, consoleError×30 |
| cvc-builder | 24 | 24 | — |
| fractions | 28 | 28 | — |
| match-pairs | 70 | 70 | — |
| place-value | 42 | 42 | — |
| sort-bins | 28 | 27 | consoleError×1 |
| syllable-builder | 104 | 104 | — |
| ten-frame | 70 | 67 | consoleError×2, loadError×1 |

## Failures

- **choice-board** `choice-board.describe-attribute.k-md-a-1` fi @280px — boxOverlap(.cb-tile 9px)
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` en @280px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` en @320px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` en @360px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` en @375px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` en @390px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` en @412px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` en @430px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` en @768px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` de @280px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` de @320px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.read-sight-word.rf-k-3-c` de @360px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` en @280px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` en @320px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` en @360px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` en @375px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` en @390px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` en @412px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` en @430px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` en @768px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` de @280px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` de @320px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.tell-words-apart.rf-k-3-c` de @360px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.onset-rime-blend.rf-k-2-c` en @280px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.onset-rime-blend.rf-k-2-c` en @320px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.onset-rime-blend.rf-k-2-c` en @360px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.onset-rime-blend.rf-k-2-c` en @375px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.onset-rime-blend.rf-k-2-c` en @390px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.onset-rime-blend.rf-k-2-c` en @412px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.onset-rime-blend.rf-k-2-c` en @430px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **choice-board** `choice-board.onset-rime-blend.rf-k-2-c` en @768px — consoleError(Failed to load resource: the server responded with a status of 404 ())
- **sort-bins** `sort-bins.defining-attributes.1-g-a-1` fi @280px — consoleError(Failed to load resource: the server responded with a status of 500 ())
- **ten-frame** `ten-frame.count-to-10.make-n.animals` fi @320px — consoleError(Failed to load resource: the server responded with a status of 500 ())
- **ten-frame** `ten-frame.how-many.0-10.animals` de @360px — consoleError(Failed to load resource: the server responded with a status of 500 ())
- **ten-frame** `ten-frame.how-many.0-10.animals` fi @320px — loadError(Waiting for selector `.lcs-app` failed)

## Pass-with-warnings

- ten-frame `ten-frame.count-to-10.make-n.animals` de @280px — tapTarget=34px
- ten-frame `ten-frame.count-to-10.make-n.animals` de @320px — tapTarget=34px
- ten-frame `ten-frame.count-to-10.make-n.animals` de @360px — tapTarget=34px
- ten-frame `ten-frame.count-to-10.make-n.animals` fi @280px — tapTarget=34px
- ten-frame `ten-frame.count-to-10.make-n.animals` fi @360px — tapTarget=34px
- ten-frame `ten-frame.count-to-20.make-n.fruits` en @280px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` en @320px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` en @360px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` en @375px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` en @390px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` en @412px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` en @430px — tapTarget=29px
- ten-frame `ten-frame.count-to-20.make-n.fruits` en @768px — tapTarget=32px
- ten-frame `ten-frame.count-to-20.make-n.fruits` de @280px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` de @320px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` de @360px — tapTarget=28px
- ten-frame `ten-frame.count-to-10.make-n.animals` en @280px — tapTarget=34px
- ten-frame `ten-frame.count-to-20.make-n.fruits` fi @280px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` fi @320px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` fi @360px — tapTarget=28px
- ten-frame `ten-frame.how-many.0-10.animals` en @280px — tapTarget=34px
- ten-frame `ten-frame.how-many.0-10.animals` en @320px — tapTarget=34px
- ten-frame `ten-frame.how-many.0-10.animals` en @360px — tapTarget=34px
- ten-frame `ten-frame.how-many.0-10.animals` en @375px — tapTarget=34px
- ten-frame `ten-frame.how-many.0-10.animals` en @390px — tapTarget=34px
- ten-frame `ten-frame.how-many.0-10.animals` de @280px — tapTarget=34px
- ten-frame `ten-frame.how-many.0-10.animals` de @320px — tapTarget=34px
- ten-frame `ten-frame.how-many.0-10.animals` fi @280px — tapTarget=34px
- ten-frame `ten-frame.how-many.0-10.animals` fi @360px — tapTarget=34px
- ten-frame `ten-frame.count-to-10.make-n.animals` en @320px — tapTarget=34px
- ten-frame `ten-frame.write-numeral.0-20.fruits` en @280px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` en @320px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` en @360px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` en @375px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` en @390px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` en @412px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` en @430px — tapTarget=29px
- ten-frame `ten-frame.write-numeral.0-20.fruits` en @768px — tapTarget=32px
- ten-frame `ten-frame.write-numeral.0-20.fruits` de @280px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` de @320px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` de @360px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` fi @280px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` fi @320px — tapTarget=28px
- ten-frame `ten-frame.write-numeral.0-20.fruits` fi @360px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` en @280px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` en @320px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` en @360px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` en @375px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` en @390px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` en @412px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` en @430px — tapTarget=29px
- ten-frame `ten-frame.teen-numbers.make-n` en @768px — tapTarget=32px
- ten-frame `ten-frame.teen-numbers.make-n` de @280px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` de @320px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` de @360px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` fi @280px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` fi @320px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` fi @360px — tapTarget=28px
- ten-frame `ten-frame.count-to-10.make-n.animals` en @360px — tapTarget=34px
- ten-frame `ten-frame.count-to-10.make-n.animals` en @375px — tapTarget=34px
- ten-frame `ten-frame.count-to-10.make-n.animals` en @390px — tapTarget=34px
