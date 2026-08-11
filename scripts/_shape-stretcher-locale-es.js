/* es — linguist ruled the parts (la lámina · la figura · las marcas), the 1º-2º teacher ruled the register (ángulo recto, no verdict, count-safe aria), the marketer ruled the gate (plan Docente, never "Premium") */
module.exports = {
  title: "La figura de goma",
  instruction: "Gira la figura todo lo que quieras y mira si se le cae algo. Después estírala o inclínala: verás qué marca se suelta y cuál vuelve a su sitio. Deja una figura al lado de la que tienes en la mano y podrás mirar las dos a la vez.",

  lenLabel: "Estirar",
  skewLabel: "Inclinar",
  turnLabel: "Girar",

  keep: "Dejar esta al lado",
  drop: "Quitar la de al lado",
  deal: "Empezar con otra figura",
  quarter: "Un cuarto de vuelta",
  print: "Imprimir la hoja",

  ariaShape3: "Figura de tres lados.",
  ariaShape4: "Figura de cuatro lados.",
  sayTagsBoth: "Están puestas las dos marcas: la de lados iguales y la de ángulo recto.",
  sayTagsEqual: "Está puesta la marca de lados iguales.",
  sayTagsRight: "Está puesta la marca de ángulo recto.",
  sayTagsNone: "No hay ninguna marca puesta.",
  ariaKept: "A la izquierda hay otra figura, guardada para comparar.",

  saidPop: "Se soltó una marca.",
  saidSeat: "Se volvió a poner una marca.",
  saidTurn: "Giró. No se soltó nada.",
  saidKept: "Ya está al lado. Ahora mueve la que sigue en tu mano y compáralas.",
  saidNoKeep: "Ya hay una figura al lado.",
  saidDealt: "Otra figura. Gírala antes de estirarla.",

  sidesLabel: "Número de lados",
  sidesFour: "cuatro lados",
  sidesThree: "tres lados",

  sheetTitle: "Lo que la clase dejó en la lámina, y espacio para escribir",
  /* ⚠ FOLD REPAIR (not the panel's wording): "una figura ... en cada
     línea" promised one shape per ruled line; the lines are blank. The
     false NP is excised and the panel's own "lo que pudieron decir"
     kept, its dangling "ella" resolved to the panel's own noun "la
     figura". NEEDS NATIVE SIGN-OFF. */
  sheetHint: "En cada línea, lo que pudieron decir de la figura.",
  lockedTitle: "La hoja es parte del plan Docente",
  lockedBody: "Todo el aparato es gratis: cualquier figura, estirarla, inclinarla y girarla, las marcas y la figura que dejas al lado. El plan Docente añade la hoja impresa, con lo que la clase dejó en la lámina y líneas para escribir.",
  /* ⚠ FOLD: `gateClose` deleted — the tool does not declare it (the paid
     gate is an inline panel with no overlay and no close control). */
  gateCta: "Ver el plan Docente"
};
