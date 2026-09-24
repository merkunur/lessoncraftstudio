---
name: JSON quote safety in locale message authoring
description: When authoring multi-locale prose into JSON message files, German „word" / Dutch „word" patterns break JSON because the closing quote is the JSON string delimiter
type: feedback
originSessionId: a45fbf5d-0d63-43e6-861f-adc433942f40
---
When authoring per-locale prose blocks into `frontend/messages/{locale}.json` files, German low quotes „ (U+201E) opening + straight " (U+0022) closing break JSON parsing — the straight closing quote IS the JSON string delimiter and ends the string early.

**Why:** Standard typewriter-keyboard input produces "word" with U+0022 on both ends, but German typography expects „word" with the curly close U+201D. The mismatch surfaces silently when authoring at scale because the JSON parser's error message points to the position AFTER the broken string, not at the broken close quote.

**How to apply:**
- For German: use „word" (U+201E + U+201D) or use English-style "word" via JSON escaping `\"word\"` if locale-purist register isn't critical
- For Dutch: same pattern — „meer" / „minder" with curly close U+201D
- For Spanish/Italian/French: use guillemets « word » (U+00AB / U+00BB) — JSON-safe by default
- For Portuguese: BR convention uses curly " " (U+201C / U+201D) — JSON-safe
- For Nordic: Swedish ”word” (U+201D doubled), Danish/Norwegian »word« (guillemets) — both JSON-safe
- For Finnish: ”word” (U+201D doubled) — JSON-safe

**Recovery pattern (when JSON parse fails after batch authoring):** find the byte position via `node -e "const c=fs.readFileSync(...); for(let i=N-30;i<N+30;i++) console.log(i+': '+c.charCodeAt(i)+' '+JSON.stringify(c[i]))"`, identify the U+0022 between two German/Dutch low-quote-opened strings, replace via `c.replace(/„word\"/g,'„word"')`. The literal `\"` regex pattern matches the U+0022 character.

Originating context: Arc 6d (commit `c03fdb8e`) — authored 660 multi-sentence prose blocks across 11 locales; hit JSON parse failures on de + nl from `„mehr" und „weniger"` patterns; resolved via post-edit char replacement. Romance (es/it/fr/pt) used guillemets pattern from start without issue.
