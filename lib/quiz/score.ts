import { ARCHETYPE_KEYS, type ArchetypeKey, type QuizAnswers, type QuizQuestion } from "./types"

export type QuizScore = {
  /** Arquetipo ganador. */
  key: ArchetypeKey
  /** Cuantas respuestas sumo cada arquetipo. */
  counts: Record<ArchetypeKey, number>
  /**
   * Arquetipos que empataron en el primer lugar, incluido el ganador.
   * Si tiene mas de un elemento, `key` se decidio por desempate.
   */
  tied: ArchetypeKey[]
  /** Preguntas efectivamente respondidas. */
  answered: number
}

function emptyCounts(): Record<ArchetypeKey, number> {
  return Object.fromEntries(ARCHETYPE_KEYS.map((k) => [k, 0])) as Record<ArchetypeKey, number>
}

/**
 * Calcula el arquetipo a partir de las respuestas.
 *
 * Desempate: gana el arquetipo que aparecio primero en el recorrido del test.
 * Es una decision de producto, no un detalle tecnico — con 13 preguntas y 5
 * arquetipos los empates son frecuentes, y antes de existir esta funcion los
 * resolvia el orden de `Object.entries`, que no es una regla sino un accidente.
 *
 * Devuelve `null` si no hay ninguna respuesta: no hay resultado que mostrar.
 */
export function scoreQuiz(questions: QuizQuestion[], answers: QuizAnswers): QuizScore | null {
  const counts = emptyCounts()
  /** Primera pregunta en la que el usuario eligio cada arquetipo. */
  const firstSeenAt = new Map<ArchetypeKey, number>()
  let answered = 0

  questions.forEach((question, questionIndex) => {
    const optionIndex = answers[questionIndex]
    if (optionIndex === undefined) return

    const option = question.opts[optionIndex]
    if (!option) return

    counts[option.x] += 1
    answered += 1
    if (!firstSeenAt.has(option.x)) firstSeenAt.set(option.x, questionIndex)
  })

  if (answered === 0) return null

  const max = Math.max(...ARCHETYPE_KEYS.map((k) => counts[k]))
  const tied = ARCHETYPE_KEYS.filter((k) => counts[k] === max)
  const key = tied.reduce((winner, candidate) =>
    (firstSeenAt.get(candidate) ?? Infinity) < (firstSeenAt.get(winner) ?? Infinity)
      ? candidate
      : winner,
  )

  return { key, counts, tied, answered }
}
