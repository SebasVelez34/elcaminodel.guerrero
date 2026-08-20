import { z } from "zod"

/**
 * Claves de las preguntas del formulario de investigacion, en orden.
 * Son tambien los nombres de las columnas en `research_submissions`.
 */
export const RESEARCH_QUESTION_KEYS = ["q1", "q2", "q3", "q4", "q5"] as const

export type ResearchQuestionKey = (typeof RESEARCH_QUESTION_KEYS)[number]

/** Tope por respuesta: generoso para texto libre, suficiente para frenar payloads absurdos. */
const MAX_ANSWER = 5000

/** Campo opcional: se recorta, y si queda vacio o pasado de largo se guarda como null. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value.length > 0 ? value : null))
    .nullable()
    .catch(null)

const answer = z.string().trim().min(1).max(MAX_ANSWER)

/**
 * Valida lo que llega del formulario. La Server Action es un endpoint publico:
 * cualquiera puede hacerle POST sin pasar por el wizard, asi que la unica
 * garantia real sobre los datos es esta.
 *
 * Las preguntas van escritas una por una a proposito — generarlas con un
 * `Object.fromEntries` deja el tipo inferido en `{ name, contact }` y se pierde
 * el chequeo de tipos justo donde importa.
 */
export const researchSubmissionSchema = z.object({
  /**
   * Sesion abierta al empezar a responder. Si no llego (fallo la medicion o
   * es un POST directo) se guarda igual como fila nueva: perder una respuesta
   * real por un problema de analitica seria mucho peor.
   */
  sessionId: z.string().uuid().optional().catch(undefined),
  name: optionalText(120),
  contact: optionalText(200),
  q1: answer,
  q2: answer,
  q3: answer,
  q4: answer,
  q5: answer,
})

export type ResearchSubmission = z.infer<typeof researchSubmissionSchema>

/** Extrae del FormData solo los campos que nos interesan, como strings. */
export function researchFormDataToObject(formData: FormData): Record<string, unknown> {
  const raw: Record<string, unknown> = {
    sessionId: formData.get("sessionId") ?? "",
    name: formData.get("name") ?? "",
    contact: formData.get("contact") ?? "",
  }
  for (const key of RESEARCH_QUESTION_KEYS) {
    raw[key] = formData.get(key) ?? ""
  }
  return raw
}
