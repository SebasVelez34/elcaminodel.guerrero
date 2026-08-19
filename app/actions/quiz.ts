"use server"

import { eq } from "drizzle-orm"

import { questions } from "@/content/quizzes/arquetipos"
import { db } from "@/lib/db"
import { quizSessions } from "@/lib/db/schema"
import { scoreQuiz } from "@/lib/quiz/score"
import { quizCompletionSchema } from "@/lib/validation/quiz"

const QUIZ_SLUG = "arquetipos"

/**
 * Abre una sesion al empezar el test y devuelve su id.
 *
 * Devuelve null si algo falla: esto es medicion, no puede tumbar el funnel.
 * El cliente simplemente sigue sin sesion y esa pasada no se cuenta.
 */
export async function startQuizSession(): Promise<string | null> {
  try {
    const [row] = await db
      .insert(quizSessions)
      .values({ quizSlug: QUIZ_SLUG })
      .returning({ id: quizSessions.id })
    return row?.id ?? null
  } catch (error) {
    console.error("[quiz] no se pudo abrir la sesion:", error)
    return null
  }
}

/**
 * Cierra la sesion con el resultado. El arquetipo se recalcula aqui a partir de
 * las respuestas — el cliente no decide que guardamos.
 */
export async function completeQuizSession(input: unknown): Promise<void> {
  const parsed = quizCompletionSchema.safeParse(input)
  if (!parsed.success) {
    console.error("[quiz] payload invalido al completar la sesion")
    return
  }

  const { sessionId, answers } = parsed.data
  const score = scoreQuiz(
    questions,
    answers.map((value) => value ?? undefined),
  )
  if (!score) return

  try {
    await db
      .update(quizSessions)
      .set({
        completedAt: new Date(),
        archetype: score.key,
        answers,
        counts: score.counts,
        answered: score.answered,
        tieBroken: score.tied.length > 1,
      })
      .where(eq(quizSessions.id, sessionId))
  } catch (error) {
    console.error("[quiz] no se pudo guardar el resultado:", error)
  }
}
