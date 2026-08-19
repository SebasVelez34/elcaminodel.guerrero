"use client"

import { useState } from "react"

import { scoreQuiz } from "@/lib/quiz/score"
import type { ArchetypeKey, QuizAnswers, QuizQuestion } from "@/lib/quiz/types"

const WA_NUMBER = "573207759895"

const Qs: QuizQuestion[] = [
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

const archs: Record<
  ArchetypeKey,
  {
    name: string
    badge: string
    badgeBg: string
    badgeTx: string
    accentColor: string
    tagline: string
    body: string
    truths: string[]
    waMsg: string
  }
> = {
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

export default function QuizPage() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "result">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [resultKey, setResultKey] = useState<ArchetypeKey | "">("")

  const init = () => {
    setScreen("quiz")
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedOption(null)
  }

  const pick = (index: number) => {
    setSelectedOption(index)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = index
    setAnswers(newAnswers)
  }

  const next = () => {
    if (selectedOption === null) return
    if (currentQuestion < Qs.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(answers[currentQuestion + 1] ?? null)
    } else {
      calculateResult()
    }
  }

  const back = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1] ?? null)
    }
  }

  const calculateResult = () => {
    const score = scoreQuiz(Qs, answers)
    if (!score) return
    setResultKey(score.key)
    setScreen("result")
  }

  const retake = () => {
    setAnswers([])
    setCurrentQuestion(0)
    setSelectedOption(null)
    setResultKey("")
    setScreen("quiz")
  }

  const pct = Math.round((currentQuestion / Qs.length) * 100)
  const arch = resultKey ? archs[resultKey] : undefined
  const waLink = arch ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(arch.waMsg)}` : ""

  const checklist = [
    "Empezaste algo con mucha energía y lo abandonaste antes de la semana 3.",
    "Tienes un plan detallado de algo que llevas meses sin ejecutar.",
    "Tu día termina ocupado pero con la sensación de que lo importante quedó para mañana.",
    "Haces cosas que otros esperan de ti más seguido de lo que haces cosas que tú quieres.",
    "Te cuesta pedir ayuda aunque sepas que la necesitas.",
    "Sabes qué tendrías que hacer diferente pero no lo estás haciendo.",
    "Tu rendimiento o energía bajan cuando algo importante no avanza.",
    "Llevas más de un mes con la misma meta sin progreso real.",
  ]

  const patterns = [
    ["Arranque sin sistema", "La motivación inicial es real pero no hay estructura que la sostenga cuando baja."],
    ["Parálisis por análisis", "El plan detallado reemplaza la ejecución. Prepararse se siente como avanzar."],
    ["Dirección prestada", "Vivir según expectativas ajenas sin saber bien qué quieres tú."],
    ["Urgencia crónica", "Lo urgente siempre gana. Lo importante se queda esperando indefinidamente."],
    ["Independencia rígida", "Cargar todo solo como identidad, no como herramienta."],
  ]

  const centroItems = [
    { letter: "C", word: "Clarifica", desc: "¿Qué quieres lograr realmente? Una cosa. Concreta." },
    { letter: "E", word: "Evalúa", desc: "¿Qué patrón te está frenando hoy? Nómbralo sin juicio." },
    { letter: "N", word: "Nombra", desc: "¿Cuál es el paso más pequeño posible que puedes dar hoy?" },
    { letter: "T", word: "Toma", desc: "Ese paso. Solo ese. Nada más por ahora." },
    { letter: "R", word: "Registra", desc: "Apunta qué hiciste. El tracking convierte acciones en evidencia." },
    { letter: "O", word: "Observa", desc: "¿Qué funcionó? ¿Qué cambiarías mañana? Ajusta, no abandones." },
  ]

  return (
    <>
      {/* Brand Bar */}
      <div className="brand-bar">
        <span className="brand-name">
          El Camino del <span className="brand-accent">Guerrero</span>
        </span>
      </div>

      <div className="wrap">
        {/* INTRO SCREEN */}
        {screen === "intro" && (
          <div className="screen active">
            <div className="intro-eyebrow">El Camino del Guerrero — Test de arquetipo</div>
            <h1 className="intro-title">
              Seamos honestos sobre cómo eres realmente{" "}
              <span>cuando nadie te está mirando.</span>
            </h1>
            <p className="intro-body">
              Esto no es un test de personalidad genérico. Son 13 preguntas sobre cómo te
              comportas realmente — con tus metas, tu tiempo, y contigo mismo.
              <br />
              <br />
              Al final sabes en cuál de los 5 patrones estás y por qué sigues en el mismo lugar.
            </p>
            <p className="intro-meta">
              <span>4 minutos</span> &nbsp;·&nbsp; sin filtros &nbsp;·&nbsp; sin psicoblabla
            </p>
            <button className="btn-primary full" onClick={init}>
              Sí, quiero saber la verdad
            </button>
          </div>
        )}

        {/* QUIZ SCREEN */}
        {screen === "quiz" && (
          <div className="screen active">
            <div className="progress-wrap">
              <div className="progress-top">
                <span className="progress-label">
                  Pregunta {currentQuestion + 1} de {Qs.length}
                </span>
                <span className="progress-pct">{pct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }}></div>
              </div>
            </div>
            <div className="q-text">{Qs[currentQuestion].t}</div>
            <div className="q-sub">{Qs[currentQuestion].s}</div>
            <div className="options">
              {Qs[currentQuestion].opts.map((opt, i) => (
                <button
                  key={i}
                  className={`opt ${selectedOption === i ? "sel" : ""}`}
                  onClick={() => pick(i)}
                >
                  {opt.l}
                </button>
              ))}
            </div>
            <div className="nav">
              <button
                className="btn-back"
                onClick={back}
                style={{ visibility: currentQuestion === 0 ? "hidden" : "visible" }}
              >
                ← Atrás
              </button>
              <button
                className={`btn-primary ${selectedOption === null ? "disabled" : ""}`}
                onClick={next}
              >
                {currentQuestion === Qs.length - 1 ? "Ver mi arquetipo →" : "Siguiente →"}
              </button>
            </div>
          </div>
        )}

        {/* RESULT SCREEN */}
        {screen === "result" && arch && (
          <div className="screen active">
            <div className="result-top">
              <span
                className="result-badge"
                style={{ background: arch.badgeBg, color: arch.badgeTx }}
              >
                {arch.badge}
              </span>
              <div className="result-name">{arch.name}</div>
              <div className="result-tagline">{arch.tagline}</div>
              <div className="result-body">{arch.body}</div>
              <div className="truths-label">Lo que necesitas escuchar</div>
              {arch.truths.map((truth, i) => (
                <div key={i} className="truth">
                  <span className="truth-dot" style={{ background: arch.accentColor }}></span>
                  <span>{truth}</span>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="wa-block" style={{ marginBottom: "0.75rem" }}>
              <div className="wa-block-title">Recibe el protocolo completo por WhatsApp</div>
              <div className="wa-block-desc">
                El kit personalizado para tu arquetipo — con los pasos exactos para romper tu
                patrón en los próximos 7 días. Te lo envío directo.
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-btn">
                <svg
                  className="wa-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    fill="currentColor"
                  />
                </svg>
                Escribirme por WhatsApp
              </a>
            </div>

            <div className="divider"></div>

            <div className="kit-label">Tu kit gratuito — Protocolo C.E.N.T.R.O.</div>

            <div className="kit-block">
              <div className="kit-block-title">Checklist: ¿estás atascado? 8 señales</div>
              {checklist.map((item, i) => (
                <div key={i} className="kit-row">
                  <span className="kit-n">{i + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="kit-block">
              <div className="kit-block-title">Los 5 patrones: reconócelos antes de actuar</div>
              {patterns.map(([title, desc], i) => (
                <div key={i} className="kit-row kit-row-col">
                  <span className="kit-row-title">{title}</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>

            <div className="kit-block">
              <div className="kit-block-title">
                Protocolo C.E.N.T.R.O — los próximos 7 días
              </div>
              <div className="centro-grid">
                {centroItems.map((item, i) => (
                  <div key={i} className="centro-cell">
                    <div className="c-letter">{item.letter}</div>
                    <div className="c-word">{item.word}</div>
                    <div className="c-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="wa-block">
              <div className="wa-block-title">Recibe el protocolo completo por WhatsApp</div>
              <div className="wa-block-desc">
                El kit personalizado para tu arquetipo — con los pasos exactos para romper tu
                patrón en los próximos 7 días. Te lo envío directo.
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-btn">
                <svg
                  className="wa-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    fill="currentColor"
                  />
                </svg>
                Escribirme por WhatsApp
              </a>
            </div>

            <div className="retry-row">
              <button className="retry-btn" onClick={retake}>
                Hacer el test de nuevo
              </button>
              <div
                style={{
                  marginTop: "1.5rem",
                  fontSize: "11px",
                  color: "var(--text3)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                El Camino del Guerrero
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}