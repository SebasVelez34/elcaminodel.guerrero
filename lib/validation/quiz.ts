import { z } from "zod"

/**
 * Payload que manda el cliente al terminar el test.
 *
 * Solo se valida la forma: el arquetipo NO viaja desde el cliente, el servidor
 * lo recalcula con las mismas respuestas. Asi la tabla no puede terminar con
 * resultados que no correspondan a lo que el usuario contesto.
 */
export const quizCompletionSchema = z.object({
  sessionId: z.string().uuid(),
  answers: z.array(z.number().int().min(0).max(50).nullable()).max(100),
})

export type QuizCompletion = z.infer<typeof quizCompletionSchema>
