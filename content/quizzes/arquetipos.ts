import type { Archetype, ArchetypeKey, QuizQuestion } from "@/lib/quiz/types"

/**
 * Contenido del test de arquetipos. Solo datos: ninguna logica vive aqui.
 * Para agregar o reescribir preguntas se edita este archivo y nada mas.
 */

export const questions: QuizQuestion[] = [
  // EL CHISPA (CH) — Arranca con todo, no termina nada
  {
    t: "Lunes en la mañana. Tienes la semana por delante. ¿Cuál es tu primer movimiento real?",
    s: "No el que quisieras tener. El que tienes.",
    opts: [
      { l: "Hago una lista enorme de todo lo que voy a lograr esta semana. Me emociona mucho armarla.", x: "CH" },
      { l: "Analizo todo lo que tengo pendiente antes de empezar cualquier cosa. Necesito el mapa completo.", x: "ES" },
      { l: "Sigo la rutina de siempre. No es emocionante pero tampoco me pregunto mucho.", x: "FA" },
      { l: "Reviso lo urgente primero. Hay como tres cosas que ya deberían estar resueltas.", x: "VO" },
      { l: "No necesito a nadie que me diga qué hacer. Me pongo a trabajar y ya.", x: "BL" },
    ],
  },
  {
    t: "Llevas dos semanas con una meta nueva. ¿Dónde estás ahora mismo con eso?",
    s: "La más reciente que te pusiste. No la del año pasado.",
    opts: [
      { l: "Empecé increíble los primeros días pero algo pasó y ya no lo estoy sosteniendo.", x: "CH" },
      { l: "Todavía estoy terminando de planear cómo lo voy a hacer bien antes de empezar de verdad.", x: "ES" },
      { l: "No me la puse. No tengo claro qué quiero lograr realmente.", x: "FA" },
      { l: "La tengo, pero entre todo lo que pasa en el día, no llego a trabajar en eso.", x: "VO" },
      { l: "Voy bien. No necesito contárselo a nadie para que sea real.", x: "BL" },
    ],
  },
  {
    t: "¿Con cuál de estas frases te has hablado a ti mismo en el último mes?",
    s: "La que te suene más familiar. La que ya casi es automática.",
    opts: [
      { l: "'Esta vez sí lo voy a sostener. En serio.'", x: "CH" },
      { l: "'Cuando tenga todo claro, arranco con todo.'", x: "ES" },
      { l: "'No sé bien qué quiero. Pero tampoco estoy tan mal.'", x: "FA" },
      { l: "'No tengo tiempo para nada de lo que importa.'", x: "VO" },
      { l: "'No necesito ayuda. Me las arreglo solo.'", x: "BL" },
    ],
  },

  // EL ESTRATEGA (ES) — Piensa demasiado, actúa muy poco
  {
    t: "Tienes una idea que llevas meses queriendo ejecutar. ¿Por qué no ha pasado todavía?",
    s: "La razón real. No la que le darías a alguien más.",
    opts: [
      { l: "Empecé varias veces pero nunca llegué lejos. Algo siempre me saca del ritmo.", x: "CH" },
      { l: "Todavía no tengo todo lo que necesito para hacerlo bien. Falta algo importante.", x: "ES" },
      { l: "Honestamente, no sé si eso es lo que quiero. No tengo claridad.", x: "FA" },
      { l: "Quiero hacerla pero el día a día no me deja espacio para eso.", x: "VO" },
      { l: "La estoy ejecutando. Solo que no comparto el proceso con nadie.", x: "BL" },
    ],
  },
  {
    t: "Alguien menos preparado que tú logra algo que tú llevas tiempo queriendo. ¿Qué pasa por tu cabeza?",
    s: "La primera reacción. Antes de filtrarla.",
    opts: [
      { l: "Me motiva por un par de días y luego vuelvo al mismo punto.", x: "CH" },
      { l: "Frustración. Yo tengo más herramientas que él. Debería ser yo.", x: "ES" },
      { l: "Una mezcla rara de admiración y algo que no quiero reconocer como envidia.", x: "FA" },
      { l: "Me da rabia. Yo podría haberlo hecho si tuviera el tiempo que él tiene.", x: "VO" },
      { l: "No me afecta. Cada quien tiene su camino.", x: "BL" },
    ],
  },
  {
    t: "¿Cuántos proyectos, cursos o planes tienes empezados y sin terminar ahora mismo?",
    s: "El número real. Sin redondear a la baja.",
    opts: [
      { l: "Varios. Empiezo con mucha energía y en algún punto se apaga.", x: "CH" },
      { l: "Tengo todo muy bien planeado, pero la ejecución me cuesta. Son más borradores que proyectos.", x: "ES" },
      { l: "Pocos. No me comprometo con mucho porque no tengo claro hacia dónde voy.", x: "FA" },
      { l: "Varios, pero es porque tengo demasiadas cosas encima. No es falta de ganas.", x: "VO" },
      { l: "Los que empiezo, los termino. Prefiero hacer pocas cosas bien.", x: "BL" },
    ],
  },

  // EL FANTASMA (FA) — Vive para otros, desapareció para sí mismo
  {
    t: "Si te preguntaran hoy qué es lo que más quieres para tu vida en los próximos 3 años, ¿qué responderías?",
    s: "No la respuesta correcta. La respuesta honesta.",
    opts: [
      { l: "Tengo ideas pero cambian seguido. Cada vez que arranco algo nuevo, la dirección se mueve.", x: "CH" },
      { l: "Lo tengo bastante claro en teoría. El problema es que no lo estoy ejecutando.", x: "ES" },
      { l: "No lo sé con certeza. Y eso me genera una incomodidad que prefiero no mirar mucho.", x: "FA" },
      { l: "Sé lo que quiero, pero ahora mismo no tengo ni el tiempo ni la energía para ir por eso.", x: "VO" },
      { l: "Lo sé y lo estoy construyendo. No necesito validar eso con nadie.", x: "BL" },
    ],
  },
  {
    t: "¿Cuándo fue la última vez que hiciste algo importante únicamente porque tú lo querías?",
    s: "No por trabajo, familia, pareja ni apariencia. Solo por ti.",
    opts: [
      { l: "Regularmente, aunque a veces lo abandono antes de terminar.", x: "CH" },
      { l: "Lo planeo seguido pero siempre hay algo más urgente que resolver primero.", x: "ES" },
      { l: "Hace rato. Casi todo lo que hago tiene que ver con lo que otros esperan de mí.", x: "FA" },
      { l: "Quiero hacerlo pero el día no alcanza. Todo lo que hago es para apagar urgencias.", x: "VO" },
      { l: "No tengo que pedirle permiso a nadie. Hago lo que decido hacer.", x: "BL" },
    ],
  },
  {
    t: "¿Cómo describirías tu relación con lo que tú quieres vs lo que los demás esperan de ti?",
    s: "La dinámica real, no la que quisieras tener.",
    opts: [
      { l: "A veces me dejo llevar por lo que otros quieren, pero cada tanto me rebelo e intento algo nuevo.", x: "CH" },
      { l: "Sé lo que quiero pero me cuesta priorizarlo porque pienso demasiado en las consecuencias.", x: "ES" },
      { l: "Honestamente, los demás pesan mucho. No siempre sé qué es mío y qué es de ellos.", x: "FA" },
      { l: "Lo mío queda para después. Siempre hay algo más urgente que atender primero.", x: "VO" },
      { l: "No dependo de la aprobación de nadie para tomar decisiones.", x: "BL" },
    ],
  },

  // EL VOLCÁN (VO) — Energía sin dirección, quema todo en lo urgente
  {
    t: "Al final del día, ¿cómo te sientes con lo que lograste?",
    s: "El estado más frecuente. No el mejor día ni el peor.",
    opts: [
      { l: "Bien si avancé algo, fatal si no. Depende mucho del día.", x: "CH" },
      { l: "Que hice cosas, pero que lo importante sigue pendiente.", x: "ES" },
      { l: "Cumplí lo que había que cumplir. No sé si eso cuenta como avanzar.", x: "FA" },
      { l: "Agotado. Estuve ocupado todo el día pero siento que corrí en círculos.", x: "VO" },
      { l: "No necesito que el día me valide. Evalúo por resultados a largo plazo.", x: "BL" },
    ],
  },
  {
    t: "¿Qué tan seguido llegas a lo que tú llamas 'lo importante' en tu día?",
    s: "Lo que tú mismo defines como importante. No lo urgente.",
    opts: [
      { l: "Cuando arranco bien sí llego, pero hay semanas enteras donde no pasa.", x: "CH" },
      { l: "Poco. Siempre hay algo que preparar o resolver antes de llegar a eso.", x: "ES" },
      { l: "No tengo muy claro qué es lo importante para mí. Por eso no sé si llego o no.", x: "FA" },
      { l: "Casi nunca. Lo urgente siempre gana. Lo importante es lo que queda para mañana.", x: "VO" },
      { l: "Mis días están organizados alrededor de lo que más importa. Lo demás se adapta.", x: "BL" },
    ],
  },

  // EL BLINDADO (BL) — Decidió no necesitar nada ni nadie
  {
    t: "¿Cuándo fue la última vez que pediste ayuda para algo que realmente importaba?",
    s: "Ayuda de verdad. No solo información técnica.",
    opts: [
      { l: "Sí pido ayuda, aunque a veces la pido y luego no la sigo porque cambio de dirección.", x: "CH" },
      { l: "Pido cuando ya analicé todo y necesito una perspectiva específica.", x: "ES" },
      { l: "Rara vez. No tengo claro a quién pedirle ni qué pedirle exactamente.", x: "FA" },
      { l: "No tengo tiempo ni para organizar mis propios pendientes. Menos para gestionar ayuda.", x: "VO" },
      { l: "No recuerdo. Para eso estoy yo. Si no puedo solo, no estoy listo.", x: "BL" },
    ],
  },
  {
    t: "Seamos brutalmente honestos: ¿cuánto te pesa cargar todo solo?",
    s: "Esta es la última pregunta. No la suavices.",
    opts: [
      { l: "A veces me pesa, pero cuando arranco algo nuevo se me olvida.", x: "CH" },
      { l: "Me pesa el no ejecutar más que el hacerlo solo.", x: "ES" },
      { l: "Bastante. Pero tampoco sé bien qué necesito ni a quién pedírselo.", x: "FA" },
      { l: "Mucho. Pero no tengo otra opción. Todo depende de que yo funcione.", x: "VO" },
      { l: "No lo vivo como carga. Es simplemente cómo soy.", x: "BL" },
    ],
  },
]

export const archetypes: Record<ArchetypeKey, Archetype> = {
  CH: {
    name: "El Chispa",
    badge: "Arranques sin aterrizaje",
    badgeBg: "rgba(255,140,0,0.15)",
    badgeTx: "#ffaa44",
    accentColor: "#ff8c00",
    tagline:
      "Tu energía no es el problema. El problema es que gastas todo el combustible en el despegue y no queda nada para el vuelo.",
    body: "Tienes iniciativa de sobra. Lo que te falta no es motivación — ya demostraste que eso no es el problema. Lo que te falta es un sistema que funcione cuando la motivación se va, que es exactamente lo que siempre pasa. Empiezas en modo sprint, el entusiasmo inicial es genuino, pero no está anclado en ninguna estructura. Cuando el ciclo baja, no hay nada que te sostenga. Y entonces reintentas. Y vuelves a empezar. Y la energía de cada reinicio es un poco menor que la anterior. El ciclo no se rompe con más motivación. Se rompe con menos dependencia de ella.",
    truths: [
      "El problema no es que empiezas mal. Es que no tienes sistema para los días en que no tienes ganas.",
      "La consistencia imperfecta gana siempre al arranque perfecto que no se sostiene.",
      "Lo que necesitas no es otro plan. Es el primero que sobreviva a la segunda semana.",
    ],
    waMsg:
      "Hola, hice el test de El Camino del Guerrero y soy El Chispa. Quiero saber cómo romper el ciclo.",
  },
  ES: {
    name: "El Estratega",
    badge: "Análisis sin ejecución",
    badgeBg: "rgba(100,120,220,0.15)",
    badgeTx: "#8899ee",
    accentColor: "#6478dc",
    tagline:
      "Sabes exactamente qué hacer. Llevas meses sabiéndolo. Eso debería decirte algo sobre dónde está el problema real.",
    body: "Eres de los que entienden bien las cosas. Tienes claridad teórica, buen análisis, y probablemente podrías explicarle a alguien más cómo resolver el problema que tú mismo no estás resolviendo. Eso no es hipocresía — es parálisis disfrazada de preparación. El momento perfecto para empezar no existe. Lo estás esperando porque empezar expone que quizás saber no es suficiente, y eso duele. Pero la única diferencia entre el que sabe y el que logra no es más información. Es tolerancia a la incomodidad de actuar con lo que hay.",
    truths: [
      "Saber qué hacer y hacerlo son habilidades completamente distintas. Solo desarrollaste una.",
      "El plan perfecto ejecutado a la mitad vale más que el plan ideal que nunca arrancó.",
      "El siguiente paso no es más investigación. Es acción ridículamente pequeña, hoy.",
    ],
    waMsg:
      "Hola, hice el test de El Camino del Guerrero y soy El Estratega. Quiero saber cómo pasar del plan a la acción.",
  },
  FA: {
    name: "El Fantasma",
    badge: "Presente para todos, ausente para sí mismo",
    badgeBg: "rgba(150,150,150,0.12)",
    badgeTx: "#aaaaaa",
    accentColor: "#999999",
    tagline:
      "Cumples con todo el mundo. La pregunta incómoda es: ¿cuándo fue la última vez que cumpliste contigo?",
    body: "No estás mal. Funcionas. Cumples. Desde afuera parece que tienes todo relativamente bajo control. El problema no es visible — es interno, silencioso, y por eso es más difícil de nombrar. Llevas tiempo haciendo lo que se espera de ti sin preguntarte qué es lo que tú esperarías de ti mismo. Y en algún punto eso empieza a pesar. No como crisis, sino como una incomodidad de fondo que está siempre ahí. La dirección no te va a caer del cielo. Tampoco te la va a dar nadie. Pero sí se puede construir — y empieza por un paso mucho más pequeño de lo que crees.",
    truths: [
      "No tener dirección clara no es un defecto de carácter. Es una decisión no tomada todavía.",
      "Vivir para cumplir expectativas ajenas también es una elección. Solo que nadie te la señaló así.",
      "La claridad no llega esperando. Llega explorando, aunque sea en pequeño.",
    ],
    waMsg:
      "Hola, hice el test de El Camino del Guerrero y soy El Fantasma. Quiero encontrar mi dirección real.",
  },
  VO: {
    name: "El Volcán",
    badge: "Ocupado todo el día, avanzando poco",
    badgeBg: "rgba(200,60,60,0.15)",
    badgeTx: "#ee7777",
    accentColor: "#cc4444",
    tagline:
      "Tienes energía de sobra. El problema es que la quemas entera en lo urgente y no queda nada para lo que importa.",
    body: "No eres flojo. Eso sería fácil de resolver. Eres alguien que funciona a alta intensidad, que atiende todo lo que se mueve, que resuelve. El problema es que eso que resuelves todo el día rara vez es lo que más importa. Lo urgente es adictivo porque da resultado inmediato visible. Lo importante es más lento, más difuso, más fácil de postergar. Y así se van las semanas. El movimiento constante crea una ilusión de progreso que no necesariamente existe. El cambio no viene de hacer más cosas. Viene de hacer menos, pero las correctas.",
    truths: [
      "Estar ocupado y estar avanzando son dos cosas distintas. Solo una te lleva a algún lado.",
      "Lo urgente siempre va a ganar si no proteges activamente el tiempo para lo importante.",
      "Hacer menos cosas con más intención produce más que hacer todo con la misma energía.",
    ],
    waMsg:
      "Hola, hice el test de El Camino del Guerrero y soy El Volcán. Quiero aprender a priorizar lo que importa.",
  },
  BL: {
    name: "El Blindado",
    badge: "Autosuficiente hasta el aislamiento",
    badgeBg: "rgba(60,60,80,0.2)",
    badgeTx: "#9999bb",
    accentColor: "#6666aa",
    tagline:
      "Llevas tanto tiempo sin necesitar a nadie que ya no sabes distinguir la fortaleza del miedo disfrazado de ella.",
    body: "Eres capaz. Eso está fuera de discusión. El problema no es tu capacidad — es que la independencia que antes era una herramienta se convirtió en una identidad. Y las identidades son más difíciles de cuestionar que las herramientas. Cargas todo solo no porque no haya otra forma, sino porque pedir ayuda se siente como ceder algo que no estás dispuesto a ceder. Eso tiene un costo. No en los resultados visibles, sino en el ritmo, en el desgaste, en lo que podrías haber logrado si hubieras dejado entrar a alguien. La fortaleza real no es no necesitar a nadie. Es saber cuándo sí.",
    truths: [
      "Pedir ayuda no reduce lo que eres. Lo amplifica.",
      "El aislamiento disfrazado de independencia también es una forma de estancarse.",
      "Los hombres que más lejos llegan no lo hacen solos. Eligen bien con quién.",
    ],
    waMsg:
      "Hola, hice el test de El Camino del Guerrero y soy El Blindado. Quiero entender qué me está costando cargar todo solo.",
  },
}
