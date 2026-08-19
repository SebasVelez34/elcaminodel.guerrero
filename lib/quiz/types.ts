/** Los 5 patrones del test de arquetipos. */
export const ARCHETYPE_KEYS = ["CH", "ES", "FA", "VO", "BL"] as const

export type ArchetypeKey = (typeof ARCHETYPE_KEYS)[number]

export type QuizOption = {
  /** Texto de la opcion. */
  l: string
  /** Arquetipo al que suma esta opcion. */
  x: ArchetypeKey
}

export type QuizQuestion = {
  /** Enunciado. */
  t: string
  /** Subtitulo aclaratorio. */
  s?: string
  opts: QuizOption[]
}

/** Indice de la opcion elegida por pregunta; `undefined` = sin responder. */
export type QuizAnswers = (number | undefined)[]
