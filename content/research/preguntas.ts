import type { ResearchQuestionKey } from "@/lib/validation/research"

/** Una pregunta abierta del formulario de investigacion. */
export type ResearchQuestion = {
  /** Debe coincidir con RESEARCH_QUESTION_KEYS: es la columna donde se guarda. */
  key: ResearchQuestionKey
  /** Agrupador que se muestra como eyebrow sobre la pregunta. */
  section: string
  text: string
  sub?: string
}

/**
 * Las 10 preguntas de la investigacion, en el orden en que se presentan.
 * Solo datos. Si agregas o quitas preguntas, actualiza tambien
 * RESEARCH_QUESTION_KEYS y el esquema de la tabla.
 */
export const researchQuestions: ResearchQuestion[] = [
  {
    key: "q1",
    section: "Dolor actual",
    text: "¿Qué es lo que más te quita el sueño un domingo a las 10pm?",
    sub: "Lo que realmente te da vueltas en la cabeza. No la versión presentable.",
  },
  {
    key: "q2",
    section: "Dolor actual",
    text: 'En una semana normal, ¿en qué momento del día sientes más que estás "en piloto automático"?',
    sub: "El momento donde el tiempo pasa sin que tú decidas nada.",
  },
  {
    key: "q3",
    section: "Intentos fallidos",
    text: "¿Qué libros, cursos o sistemas has comprado ya para resolver esto? ¿Por qué crees que no funcionaron?",
    sub: "Sé específico. Nombra lo que probaste.",
  },
  {
    key: "q4",
    section: "Intentos fallidos",
    text: '¿Cuánto tiempo llevas sintiendo que "algo tiene que cambiar" sin que cambie?',
    sub: "En meses o años. El número real.",
  },
  {
    key: "q5",
    section: "Miedos de trayectoria",
    text: "¿Qué es lo que más te aterra que pase — o no pase — en los próximos 5 años si todo sigue igual?",
    sub: "El miedo concreto, no el genérico.",
  },
  {
    key: "q6",
    section: "Miedos de trayectoria",
    text: "Si le preguntaras a tu versión de dentro de 10 años qué hiciste con esta década, ¿qué te da miedo que responda?",
    sub: "No lo suavices.",
  },
  {
    key: "q7",
    section: "Criterio de éxito",
    text: '¿Cómo se vería, exactamente, sentir que finalmente estás "encaminado" y construyendo algo que respetas?',
    sub: "Descríbelo como si ya estuviera pasando.",
  },
  {
    key: "q8",
    section: "Criterio de éxito",
    text: '¿Qué tendría que pasar para que dejaras de compararte con dónde "deberías" estar?',
    sub: "Lo que te daría paz de verdad.",
  },
  {
    key: "q9",
    section: "Barreras de compra",
    text: '¿Qué te haría decir "esto no es para mí" al ver un programa como este?',
    sub: "Tus objeciones reales. Sé honesto.",
  },
  {
    key: "q10",
    section: "Barreras de compra",
    text: "¿Qué necesitarías ver u oír para confiar en que esto es distinto a lo anterior que compraste?",
    sub: "Lo que te haría creer de verdad.",
  },
]
