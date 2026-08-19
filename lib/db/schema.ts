import { pgTable, uuid, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core"

import type { ArchetypeKey } from "@/lib/quiz/types"

/** Respuestas del formulario de investigacion (/research). */
export const researchResponses = pgTable("research_responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  contact: text("contact"),
  q1: text("q1"),
  q2: text("q2"),
  q3: text("q3"),
  q4: text("q4"),
  q5: text("q5"),
  q6: text("q6"),
  q7: text("q7"),
  q8: text("q8"),
  q9: text("q9"),
  q10: text("q10"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

/**
 * Una pasada por el test de arquetipos.
 *
 * Se crea la fila al empezar y se completa al terminar: `completed_at` en null
 * es exactamente un abandono, que es lo que permite medir tasa de completado.
 * No guarda ningun dato personal, solo el recorrido.
 */
export const quizSessions = pgTable("quiz_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  /** Que test fue. Preparado para cuando haya mas de uno. */
  quizSlug: text("quiz_slug").notNull().default("arquetipos"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  /** null = empezado y nunca terminado. */
  completedAt: timestamp("completed_at", { withTimezone: true }),
  /** Arquetipo ganador, recalculado en el servidor. */
  archetype: text("archetype").$type<ArchetypeKey>(),
  /** Respuestas por pregunta: indice de la opcion elegida, null si se salto. */
  answers: jsonb("answers").$type<(number | null)[]>(),
  /** Cuantas respuestas sumo cada arquetipo. */
  counts: jsonb("counts").$type<Record<ArchetypeKey, number>>(),
  /** Preguntas efectivamente respondidas. */
  answered: integer("answered"),
  /** El resultado se decidio por desempate: util para revisar la regla. */
  tieBroken: boolean("tie_broken"),
})
