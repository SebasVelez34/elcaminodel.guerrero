import { pgTable, uuid, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core"

import type { ArchetypeKey } from "@/lib/quiz/types"

/**
 * Una pasada por el formulario de investigacion (/research).
 *
 * La fila se crea cuando la persona empieza a responder y se completa al
 * enviar: `completed_at` en null es exactamente un abandono, que es lo que
 * permite medir tasa de completado sin una tabla aparte.
 */
export const researchSubmissions = pgTable("research_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  /** Que version del formulario respondio. Preparado para cuando cambien las preguntas. */
  formSlug: text("form_slug").notNull().default("direccion-personal"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  /** null = empezado y nunca enviado. */
  completedAt: timestamp("completed_at", { withTimezone: true }),
  name: text("name"),
  contact: text("contact"),
  /** El momento de quiebre: la sospecha del domingo por la noche. */
  q1: text("q1"),
  /** Inercia o construccion. */
  q2: text("q2"),
  /** De la informacion a la accion: por que no se convirtio en cambio. */
  q3: text("q3"),
  /** El costo de no decidir: el miedo a los 40. */
  q4: text("q4"),
  /** Claridad operacional: la decision que esta postergando. */
  q5: text("q5"),
})

/**
 * Una pasada por el test de arquetipos.
 *
 * Mismo criterio que arriba: se crea la fila al empezar y se completa al
 * terminar. No guarda ningun dato personal, solo el recorrido.
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
