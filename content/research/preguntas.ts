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
 * Formulario de Validacion de Direccion Personal.
 *
 * Las 5 preguntas siguen una progresion deliberada: quiebre emocional →
 * inercia vs. construccion → brecha entre consumo y accion → miedo al tiempo
 * desperdiciado → claridad operacional. Cada `section` explica desde donde
 * pregunta; no las reordenes sin querer, el orden es el argumento.
 *
 * Solo datos. Si agregas o quitas preguntas, actualiza tambien
 * RESEARCH_QUESTION_KEYS y el esquema de la tabla.
 */
export const researchQuestions: ResearchQuestion[] = [
  {
    // Ancla el dolor en un momento real y concreto, cuando la inercia se
    // detiene por un rato y la sospecha alcanza a aparecer.
    key: "q1",
    section: "El momento de quiebre",
    text: "Son las 10 pm de un domingo y mañana es lunes. En ese silencio, ¿cuál es la sospecha más incómoda que te llega sobre la dirección que lleva tu vida hoy?",
    sub: "La que aparece cuando no hay nadie a quien darle una versión presentable.",
  },
  {
    // Separa la vida administrada de la vida construida: apela al deseo de
    // autonomia sin nombrarlo.
    key: "q2",
    section: "Inercia o construcción",
    text: "Siendo honesto contigo mismo, ¿sientes que hoy estás construyendo algo que realmente respetas o simplemente estás administrando una rutina que apareció frente a ti?",
    sub: "No hay respuesta correcta. Hay una verdadera.",
  },
  {
    // Reconoce que ya consume informacion y apunta al problema real: convertir
    // identidad en accion sostenida.
    key: "q3",
    section: "De la información a la acción",
    text: "Has leído libros y escuchado podcasts de desarrollo personal antes. ¿Qué es lo que más te frustra de haber acumulado tanta información sin haber logrado convertirla aún en un cambio tangible en tu día a día?",
    sub: "Sé específico: qué probaste y en qué punto exacto se cayó.",
  },
  {
    // El miedo central del nicho: llegar a la siguiente decada sabiendo que se
    // pudo cambiar la trayectoria y no se hizo.
    key: "q4",
    section: "El costo de no decidir",
    text: "Si dejas que la inercia decida por ti y pasan otros 5 años sin cambios, ¿qué es lo que más te aterra descubrir sobre el hombre en el que te habrás convertido?",
    sub: "El miedo concreto, no el genérico. No lo suavices.",
  },
  {
    // Sustituye el "proposito" abstracto por claridad operacional: mucho mas
    // facil de responder para un hombre funcional.
    key: "q5",
    section: "Claridad operacional",
    text: "Para que pudieras decir \"finalmente estoy encaminado\", ¿cuál es la primera decisión concreta o proyecto real que sabes que tendrías que dejar de postergar hoy mismo?",
    sub: "Una sola. La que ya sabías antes de leer esta pregunta.",
  },
]
