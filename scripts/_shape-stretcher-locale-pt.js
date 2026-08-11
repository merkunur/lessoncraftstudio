/* pt (pt-BR) — linguist: A FIGURA / O PAINEL / AS MARQUINHAS, and the primary track is ENTORTAR (esticar/inclinar both belong to siblings); teacher (anos iniciais, BNCC EF01MA13/EF02MA14): "figura" is the curriculum noun and the right-angle copy must carry NO count, because the tool's own two 30-60-90 states have exactly ONE right angle; marketing: the shelf says "plano Professor" (74x), never "Premium". */
module.exports = {

  /* shell-consumed */
  title: "A Figura que Entorta",

  /* ⚠ REBUILT, not translated. The English says "watch the tags", but at
     open a tag exists with p ~= 2% (n=4) / ~= 1.4% (n=3), so it tells the
     child to watch something that is almost certainly not on the pane.
     Portuguese says GO MAKE ONE APPEAR, which is both true and the routine. */
  instruction: "Gire a figura o quanto quiser: nenhuma marquinha aparece nem some. Agora vá alongando ou entortando até fazer uma marquinha aparecer — e descubra o que faz ela soltar. Deixe uma figura parada ao lado e dá para olhar as duas ao mesmo tempo.",

  /* the three tracks — short labels (.shp-tlabel min-width:72px, 14px) */
  lenLabel: "Alongar",
  skewLabel: "Entortar",
  turnLabel: "Girar",

  /* controls */
  keep: "Deixar esta ao lado",
  drop: "Tirar a que ficou",
  deal: "Começar de outra figura",
  quarter: "Um quarto de volta",
  print: "Imprimir a folha",

  /* aria. The pose token is gone — `rot` enters no predicate, so it was
     never a property. ⚠ These do NOT carry the new English's "leaning":
     theta=90 is legal and reachable, and at n=4/theta=90 the shape is a
     rectangle — a square at k=0 — which is not leaning. That is precisely
     the state the routine aims at ("make every tag hold at once"), so the
     English contradicts itself inside one announcement: "leaning ... every
     side the same length, and square corners" describes a square as
     leaning. A plain statement of what the shape IS is true in every
     reachable state, and the tags sentence carries the properties. */
  ariaShape3: "Uma figura de três lados.",
  ariaShape4: "Uma figura de quatro lados.",

  /* ⚠ COUNT-NEUTRAL ON PURPOSE, and ARTICLE-FREE on "ângulo reto".
     pt `um/uma` doubles as article and numeral exactly like sv `en`, so
     "tem UM ângulo reto" would assert a count that is false at n=4 (four).
     Bare singular after existential "tem" is number-neutral in pt-BR
     ("a sala tem janela"), and the only article present is the definite
     "a figura", which has no numeral reading at all.
     ⚠⚠ The calque of "right-angled" is retângulo/retângula — the pt word
     for RECTANGLE. At n=3, theta=60, k=+-40 it would announce a TRIANGLE
     as a rectangle. Never use it; this is a pt landmine the English
     source cannot see. */
  sayTagsBoth: "As duas marquinhas estão segurando: todos os lados do mesmo tamanho e ângulo reto.",
  sayTagsEqual: "Uma marquinha está segurando: todos os lados do mesmo tamanho.",
  sayTagsRight: "Uma marquinha está segurando: a figura tem ângulo reto.",
  sayTagsNone: "Nenhuma marquinha está segurando.",
  ariaKept: "Uma figura ficou ao lado, para comparar.",

  /* said aloud — a property, never a performance. soltou/voltou are exactly
     parallel in length and register, so neither event can read as a verdict. */
  saidPop: "Uma marquinha soltou.",
  saidSeat: "Uma marquinha voltou.",
  saidTurn: "Girou. Nada soltou.",
  saidKept: "Ficou uma ao lado. Agora mexa na outra e olhe as duas juntas.",
  saidNoKeep: "Já tem uma figura ao lado.",
  saidDealt: "Outra figura. Gire primeiro e veja que nada solta.",

  /* settings */
  sidesLabel: "Quantos lados",
  sidesFour: "quatro lados",
  sidesThree: "três lados",

  /* paid sheet. ⚠ The English title says "shapes" (plural) but the sheet
     renders ONE shape whenever nothing is kept — the default. Portuguese
     names THE PANE, which is always exactly one, so the line is true in both
     states. The hint drops the English's per-line-shape claim: the six ruled
     lines are blank lines, not shapes. */
  sheetTitle: "O painel do jeito que a turma deixou, e espaço para escrever",
  sheetHint: "Escreva aqui o que dá para dizer sobre a figura que ficou no painel.",

  lockedTitle: "A folha faz parte do plano Professor",
  lockedBody: "Aqui tudo é grátis — todas as figuras, girar, alongar e entortar, as marquinhas e a figura que fica ao lado. O plano Professor traz ainda a folha impressa, que leva o painel do jeito que a turma deixou e linhas pautadas para escrever.",
  /* ⚠ FOLD: `gateClose` deleted — the tool does not declare it (the paid
     gate is an inline panel with no overlay and no close control). */
  gateCta: "Ver o plano Professor"
};
