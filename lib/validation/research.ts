import { z } from "zod"

/** Claves de las 10 preguntas del formulario de investigacion. */
export const RESEARCH_QUESTION_KEYS = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
] as const

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
 * Las 10 preguntas van escritas una por una a proposito — generarlas con un
 * `Object.fromEntries` deja el tipo inferido en `{ name, contact }` y se pierde
 * el chequeo de tipos justo donde importa.
 */
export const researchSubmissionSchema = z.object({
  name: optionalText(120),
  contact: optionalText(200),
  q1: answer,
  q2: answer,
  q3: answer,
  q4: answer,
  q5: answer,
  q6: answer,
  q7: answer,
  q8: answer,
  q9: answer,
  q10: answer,
})

export type ResearchSubmission = z.infer<typeof researchSubmissionSchema>

/** Extrae del FormData solo los campos que nos interesan, como strings. */
export function researchFormDataToObject(formData: FormData): Record<string, unknown> {
  const raw: Record<string, unknown> = {
    name: formData.get("name") ?? "",
    contact: formData.get("contact") ?? "",
  }
  for (const key of RESEARCH_QUESTION_KEYS) {
    raw[key] = formData.get(key) ?? ""
  }
  return raw
}
