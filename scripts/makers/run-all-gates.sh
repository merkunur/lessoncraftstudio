#!/usr/bin/env bash
# run-all-gates.sh [--makers=a,b] — the makers' FULL gate suite, once, in order (the main session's job: handoff README
# rule 8). Every gate's whole output goes to out/makers-gates/<gate>.log; the summary lists PASS / FAIL per gate and the
# script exits non-zero when any gate fails. Run it after build-bundles.js (it reads out/makers/).
cd "$(dirname "$0")/../.." || exit 2
ARGS="$*"
# GATE_LOGS=<dir>: two suites (two makers) can run side by side without sharing a log folder
LOGS=${GATE_LOGS:-out/makers-gates}; mkdir -p "$LOGS"; rm -f "$LOGS"/*.log
GATES=(unit-tests lint-browser-safe parity string-parity sha1-parity answer-keys screen-from-marks declared-screens slots unique-solution
       controls-budget collision own-input settings-space screen-geometry pdf-parity thumbs registration old-landings
       click-shell edit-shell access-shell keys-shell themes-shell saves-shell exports-shell play-shell live-gate)
fail=0
for g in "${GATES[@]}"; do
  f=scripts/makers/gates/$g.js; a="$ARGS"
  # build-bundles.js lints every bundle's inputs as it builds; here the lint proves each rule still fires
  [ "$g" = lint-browser-safe ] && { f=scripts/makers/lint-browser-safe.js; a=--poison; }
  # the engines' unit tests (scripts/makers/tests/*.test.js: money sizes and fewest ways, recipes, the store …), all of them
  if [ "$g" = unit-tests ]; then
    t0=$(date +%s); r=PASS; : > "$LOGS/$g.log"
    for t in scripts/makers/tests/*.test.js; do echo "== $t" >> "$LOGS/$g.log"; node "$t" >> "$LOGS/$g.log" 2>&1 || { r=FAIL; fail=1; echo "FAILED $t" >> "$LOGS/$g.log"; }; done
    n=$(ls scripts/makers/tests/*.test.js | wc -l)
    printf '%-18s %s  %4ss  %s\n' "$g" "$r" "$(( $(date +%s) - t0 ))" "unit tests: $n files$( [ $r = FAIL ] && echo ", $(grep -c ^FAILED "$LOGS/$g.log") failing")"
    continue
  fi
  # the printed strings = the banks the family gates check (tools/check-b*-string-parity.js, every batch), and the b3
  # drafts = their locale files (an apply-b3-locale run would otherwise put old words back) — 2026-11-04
  if [ "$g" = string-parity ]; then
    t0=$(date +%s); r=PASS; : > "$LOGS/$g.log"
    # + the banks GENERATED from them (2026-11-04: round 7b changed the sv sound boxes and ending-sounds.json stayed stale)
    for t in scripts/worksheet-gen/tools/check-b*-string-parity.js scripts/worksheet-gen/tools/sync-b3-drafts-from-banks.js scripts/worksheet-gen/tools/build-letter-pictures.js scripts/worksheet-gen/tools/build-syllable-banks.js scripts/worksheet-gen/tools/build-sound-position-banks.js; do
      echo "== $t" >> "$LOGS/$g.log"; node "$t" --check >> "$LOGS/$g.log" 2>&1 || { r=FAIL; fail=1; echo "FAILED $t" >> "$LOGS/$g.log"; }
    done
    printf '%-18s %s  %4ss  %s\n' "$g" "$r" "$(( $(date +%s) - t0 ))" "$(ls scripts/worksheet-gen/tools/check-b*-string-parity.js | wc -l) parity checks + the b3 draft sync + 3 generated banks$( [ $r = FAIL ] && echo ", $(grep -c ^FAILED "$LOGS/$g.log") failing")"
    continue
  fi
  [ -f "$f" ] || { echo "MISSING $g"; fail=1; continue; }
  t0=$(date +%s)
  if node "$f" $a > "$LOGS/$g.log" 2>&1; then r=PASS; else r=FAIL; fail=1; fi
  printf '%-18s %s  %4ss  %s\n' "$g" "$r" "$(( $(date +%s) - t0 ))" "$(tail -1 "$LOGS/$g.log" | cut -c1-150)"
done
[ $fail = 0 ] && echo "ALL GATES PASS" || echo "SOME GATES FAILED (logs in $LOGS)"
exit $fail
