/* es — the linguist named the parts EL ANDÉN · LOS QUE ESPERAN · EL PUNTERO:
   `la fila` is spent (our-day:602) and `parada` is spent (cold-line:176), while
   `andén` and `puntero` measured 0 collisions across `mini tools/` and
   tool-content/es.json; `andén` is also the one Spanish noun for a platform that
   names no vehicle. The 1º-2º teacher ruled Peninsular tú-imperative to the
   teacher (matching _shape-stretcher-locale-es.js) and kept the waiters
   PERSONIFIED — "en quién te quedas" — because a queue is of somebodies.
   REBUILT, not translated: `instruction` asks the class the question instead of
   announcing the answer (the English asserts "the one you land on has changed",
   which is FALSE at the self-same moment the tool exists for); `ariaLandedSame`
   and `sayLandedSame` are stated as a present invariant ("se cuente desde donde
   se cuente") because the English past reference — "the same one it landed on
   from the other end" — fires on the very first count, before the other end has
   ever been used; `sayBoarded` drops "from the same end" and invites the other
   one, which is where the invariant actually lives. Marketing took `plan
   Docente` verbatim from es.json planTag and never wrote "Premium". */
module.exports = {
  title: "El andén",
  instruction: "En el andén hay unos cuantos esperando. Elige un lado, avanza con el puntero y mira en quién te quedas. Ahora elige el otro lado y avanza las mismas veces: del andén no se ha movido nadie, así que pregunta a la clase si te has quedado en el mismo.",

  endLeft: "Empezar por este lado",
  endRight: "Empezar por el otro",
  step: "Avanzar un paso",
  board: "Se va uno",
  again: "Otro andén",
  print: "Imprimir la hoja",

  ariaPlatform: "Un andén con {n} esperando.",
  ariaNoEnd: "Todavía no se ha elegido ningún lado, así que el puntero está fuera del andén.",
  ariaWalking: "El puntero ha avanzado desde el lado elegido.",
  ariaLandedSame: "El puntero se ha quedado en el mismo, se cuente desde donde se cuente.",

  sayPickEnd: "Elige un lado: sin lado no hay desde dónde contar.",
  sayStepped: "Un paso más.",
  sayLandedSame: "El mismo, se cuente desde donde se cuente.",
  sayBoarded: "Se ha ido uno. Vuelve a contar; prueba también desde el otro lado.",
  sayDealt: "Otro andén. Elige un lado antes de contar.",
  sayEndOfLine: "Hasta aquí llega el andén.",

  sizeLabel: "Cuántos esperan",
  sizeThree: "tres",
  sizeFour: "cuatro",

  sheetTitle: "El andén tal como lo dejó la clase, y espacio para escribir",
  sheetHint: "En cada línea, una cuenta que hizo la clase y en quién se quedó.",
  lockedTitle: "La hoja es parte del plan Docente",
  lockedBody: "Todo el aparato es gratis: el andén entero, un lado y el otro, el puntero y que se vaya uno. El plan Docente añade la hoja impresa, con el andén que estaba mirando la clase y líneas para escribir.",
  gateCta: "Ver el plan Docente"
};
