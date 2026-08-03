# Activity mobile-layout audit — https://www.lessoncraftstudio.com

Widths: 360, 390 · **10** renders · **6 pass / 4 fail** (6 pass-with-warnings)

| engine | renders | pass | failing checks |
|---|---|---|---|
| ten-frame | 10 | 6 | boxOverlap×4 |

## Failures

- **ten-frame** `ten-frame.how-many.0-10.animals` en @360px — boxOverlap(.lcs-activity-key 10px)
- **ten-frame** `ten-frame.how-many.0-10.animals` en @390px — boxOverlap(.lcs-activity-key 6px)
- **ten-frame** `ten-frame.write-numeral.0-20.fruits` en @360px — boxOverlap(.lcs-activity-key 10px)
- **ten-frame** `ten-frame.write-numeral.0-20.fruits` en @390px — boxOverlap(.lcs-activity-key 6px)

## Pass-with-warnings

- ten-frame `ten-frame.count-to-20.make-n.fruits` en @360px — tapTarget=28px
- ten-frame `ten-frame.count-to-20.make-n.fruits` en @390px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` en @360px — tapTarget=28px
- ten-frame `ten-frame.teen-numbers.make-n` en @390px — tapTarget=28px
- ten-frame `ten-frame.count-to-10.make-n.animals` en @360px — tapTarget=34px
- ten-frame `ten-frame.count-to-10.make-n.animals` en @390px — tapTarget=34px
