/* pt (pt-BR) — linguist: A CALÇADA / QUEM ESTÁ ESPERANDO / O ANDARILHO. `fila`
   is spent (`our-day.js:602` ships pt `a fila`) and `plataforma` is worse than
   spent: it already means THIS WEBSITE in the shipped pt landing prose of
   heart-words, syllable-splitter and baking-tray. `calçada` and `andarilho`
   measure 0 hits across scripts/, mini tools/ and frontend/messages/ — and a
   calçada carries no vehicle, which `plataforma`, `cais` and `embarque` all do.
   Teacher (anos iniciais): no BNCC claim — there is no ordinal standard at this
   age; and `instruction` is REBUILT because the English's closing promise is
   false at the tool's own best moment (n=3, k=2, `isSelfSame`). Marketing: the
   shelf says "plano Professor" (`pt.json` planTag), never "Premium". */
module.exports = {

  /* shell-consumed. "de ponta a ponta" is a live BR idiom: it names the
     apparatus and the reversal at once, and carries no numeral. */
  title: "A calçada de ponta a ponta",

  /* ⚠⚠ REBUILT, not translated. The English (`the-queue.js:166`) ends "nobody
     has moved, but the one you land on has changed" — and the model refutes it:
     `isSelfSame` (:256-259) is true at n=3, k=2, where BOTH ends land on the
     same member. `size: three` is a shipped setting and the header calls that
     landing "the tool's own best moment", so the English states as universal a
     claim its own machine is built to break. Portuguese promises the usual case
     AND the exception, which is true in every reachable state and turns the
     self-same landing into something the class is waiting for. */
  instruction: "Tem gente esperando na calçada. Escolha uma ponta, ande pela calçada e veja em quem você parou. Agora escolha a outra ponta e ande a mesma quantidade de passos: ninguém saiu do lugar, mas quem você encontra quase sempre é outra pessoa — e, de vez em quando, é a mesma.",

  /* controls. Flex-wrap row, 15px, beside a glyph: longest is 21 chars, under
     the shipped house maximum of 23 (`_shape-stretcher-locale-pt.js`). The pair
     is parallel by construction so neither end can read as the real one. */
  endLeft: "Contar desta ponta",
  endRight: "Contar da outra ponta",
  step: "Dar um passo",
  /* ⚠ NO VEHICLE. `class-graph.js:133` ships pt `De ônibus` and `our-day.js`
     ships `o ônibus escolar`; `calendar-wall.js:677` already ruled A RUCKSACK,
     NOT A BUS. Somebody simply goes away. */
  board: "Alguém vai embora",
  again: "Outra calçada",
  print: "Imprimir a folha",

  /* aria — nothing on the calçada is a tap target.
     ⚠ `ariaPlatform` is spoken TWICE whenever an end is chosen and k is 0
     (`_paint:597-602` selects 'ariaPlatform' as `key` and then concatenates it
     onto `t('ariaPlatform')`), so it is kept short and nominalised. "com {n}
     esperando" is idiomatic BR and, unlike "com {n} pessoas", asserts nothing
     about what the silhouettes are — which the material refuses to say. */
  ariaPlatform: "Uma calçada com {n} esperando.",
  ariaNoEnd: "Nenhuma ponta foi escolhida ainda, por isso o andarilho está fora da calçada.",
  ariaWalking: "O andarilho andou a partir da ponta escolhida.",
  /* ⚠⚠ REBUILT: the English says the walker "has landed on the same one it
     landed on FROM THE OTHER END" — a past event that has usually not happened.
     `isSelfSame` is pure arithmetic (n odd, k = (n+1)/2): it fires on the very
     first count a child ever makes, with no other end ever visited. Portuguese
     states the PROPERTY, which is true the first time and every time. */
  ariaLandedSame: "O andarilho parou em quem é o mesmo contando de qualquer uma das pontas.",

  /* said aloud — never a position, never a cardinal standing for one. "passo"
     counts steps, which is a real count, exactly as sizeThree counts members. */
  sayPickEnd: "Escolha uma ponta: sem escolher, não tem de onde contar.",
  sayStepped: "Um passo na calçada.",
  /* genderless on purpose: the members are silhouettes, and "o mesmo"/"a mesma"
     would assign one. "para na mesma" is the BR idiom for arriving at the same
     result, so the sentence never has to name what was landed on. */
  sayLandedSame: "Contando de uma ponta ou da outra, você para na mesma.",
  sayBoarded: "Alguém foi embora. Conte de novo pela mesma ponta.",
  sayDealt: "Outra calçada. Escolha uma ponta antes de contar.",
  sayEndOfLine: "A calçada acaba aqui.",

  /* settings — the one place a cardinal is a genuine count */
  sizeLabel: "Quantos estão esperando",
  sizeThree: "três",
  sizeFour: "quatro",

  /* paid sheet */
  sheetTitle: "A calçada do jeito que a turma deixou, e espaço para escrever",
  /* ⚠ the English says the count "landed on" someone; in the machine it is the
     WALKER that stops (`landedIndex`), so the pt names the walker rather than
     making a contagem do the stopping. */
  sheetHint: "Em cada linha, anote uma contagem que a turma fez e em quem o andarilho parou.",

  /* ⚠ NEVER "Premium". `frontend/messages/pt.json:4474` planTag = "Plano
     Professor"; running text on the shelf says "plano Professor". */
  lockedTitle: "A folha faz parte do plano Professor",
  /* verified against the code, not the pitch: `premium:false`, `_gate` only
     shows a panel, `_print` and the `beforeprint` guard are the ONLY gated
     paths — the apparatus really is free. ⚠ "as pontas" and not "as duas
     pontas": no numeral outside the three size keys. */
  lockedBody: "Aqui tudo é grátis — todas as calçadas, as pontas, o andarilho e deixar alguém ir embora. O plano Professor traz ainda a folha impressa, que leva a calçada do jeito que a turma estava vendo e linhas pautadas para escrever.",
  gateCta: "Ver o plano Professor"
};
