'use strict';
/* Brazilian Portuguese — TOOL #56, round 2. Authored by the native panel, verbatim.
 *
 * ONLY the keys that change against the current `pt:` block in
 * `scripts/_the-gap-strings.js`. Everything else there is correct and untouched.
 *
 * DELIBERATELY ABSENT — do not add them back:
 *   test     — 'Testar este tanto:' is CORRECT and stays. Portuguese does not break
 *              here, so the English shortening to 'Try' must not propagate:
 *              'Testar 3' can read as *attempt number 3*, where the rail exists so the
 *              child picks a MAGNITUDE (the sign is already given by the ground,
 *              `rail()`). `este tanto` carries quantity; the bare form carries identity.
 *              Withdrawal recorded and binding.
 *   ariaEnd  — 'O intervalo acabou. Agora o chão tem {m}, e antes tinha {n}.' is CORRECT
 *              and stays. English needed its label:value form because it counted a
 *              plural noun and broke at {m}=1; Portuguese dropped the noun in round 1
 *              and is idiomatic at every reachable value. Withdrawal recorded and binding.
 *   sheetHint— DECLINED on a Portuguese ground. The English overclaimed because
 *              'one line for each gap' maps gap -> line and so asserts there are as many
 *              lines as gaps watched, false against a fixed six. The Portuguese
 *              'Em cada linha, um intervalo...' maps line -> gap and asserts nothing
 *              about how many lines exist. It is also standard BR worksheet-caption form.
 *   saidDealt/ariaGap/saidTryOff — round-1 corrections already applied and still exact
 *              against the English on disk (`saidDealt` en is unchanged and still reads
 *              'Count what is on the ground', not 'the marks', so the pt must not drift
 *              to 'as bolinhas' here).
 */
module.exports = {

  /* The English changed what it ASSERTS, and the shipped pt was a partial.
     Two fixes, neither of them shape-following:
       - 'Contem as bolinhas no chao' — the English now counts the MARKS.
       - 'nunca QUANTAS', not 'quanto' — the English moved from *how much* to
         *how many*, which in Portuguese must agree with `bolinhas` (fem. pl.).
         `quanto` is now a grammar error, not a preference. */
  instruction: 'Contem as bolinhas no chão. O intervalo cobre as bolinhas por um instante — o chão continua à vista e só mostra se alguma coisa entrou ou saiu, nunca quantas. Quando o intervalo acaba, contem de novo e descubram o que aconteceu enquanto as bolinhas estavam escondidas.',

  /* Changes on a Portuguese-internal ground, not because the English moved:
     `run`/`clear`/`print` are 'Começar o intervalo' / 'Apagar a tentativa' /
     'Imprimir a folha', so a declarative was the one label in the set that neither
     took the infinitive nor named its action.
     ⚠ It must name the WHOLE SCENE, not the dots. `_again` calls `newState()`, which
     picks a fresh `n` AND a fresh hidden `k`, so a dots-only label ('Trocar as
     bolinhas', my own earlier proposal, and the English 'New marks') under-describes
     the control in exactly the same way. 'outra coisa' keeps the scene-level reading.
     'fazer acontecer' is a set BR collocation, and it stays clear of `run`, which
     already owns 'o intervalo'. */
  again: 'Fazer acontecer outra coisa',

  /* True in ALL THREE phases. `_buildSheet` reads
     `bands = (s.phase === 'after') ? [s.n, s.m] : [s.n]`, so `before` and `gap` print
     ONE band. 'antes e depois' promised a pair the sheet does not always carry. */
  sheetTitle: 'O chão como a turma viu, e espaço para escrever o que aconteceu',

  /* The same overclaim, on the sentence the money is taken on — a teacher who buys on
     'o antes e o depois' and prints during setup gets one band. Worded to echo
     `sheetTitle` VERBATIM ('o chão como a turma viu') so the sales panel and the printed
     heading name ONE artefact in the same words.
     Also fixes a tense that was false at print time: the ruled lines are for sentences
     the class has NOT written yet in phases `before`/`gap`, so the past 'que ela
     escreveu' is replaced by the infinitive 'para ela escrever'. Drops the third
     'a turma' and the `traz ... que leva` clumsiness. */
  lockedBody: 'Aqui tudo é grátis — todos os intervalos, o chão e quantas tentativas a turma quiser. O plano Professor acrescenta a folha impressa: o chão como a turma viu, com linhas pautadas para ela escrever as sentenças.',

  /* FALSE IN HALF ITS BRANCHES. `_refuse('busy', ...)` fires from BOTH `_run` and
     `_again`; 'não dá para começar outro intervalo' names only the first, so a teacher
     who pressed the deal-a-new-scene control was refused for a thing they did not press.
     This value is true from either site and names neither button.
     ⚠ Carries NO placeholder — `_refuse` calls `api.announce(api.t(msg))` with no `_fmt`. */
  saidMidRun: 'Esperem o intervalo acabar.'

};
