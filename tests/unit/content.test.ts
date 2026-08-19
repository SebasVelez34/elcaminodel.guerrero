import { describe, expect, it } from "vitest"

import { archetypes, questions } from "@/content/quizzes/arquetipos"
import { researchQuestions } from "@/content/research/preguntas"
import { ARCHETYPE_KEYS } from "@/lib/quiz/types"
import { RESEARCH_QUESTION_KEYS } from "@/lib/validation/research"

/**
 * El contenido se edita a mano y a menudo por copia-pega. Estos tests son la
 * red que atrapa un codigo de arquetipo mal escrito o una pregunta duplicada
 * antes de que llegue a produccion y ensucie los datos.
 */
describe("contenido del quiz de arquetipos", () => {
  it("define copy para los 5 arquetipos y ninguno de mas", () => {
    expect(Object.keys(archetypes).sort()).toEqual([...ARCHETYPE_KEYS].sort())
  })

  it("cada arquetipo tiene nombre, tagline y frases de cierre", () => {
    for (const [key, arch] of Object.entries(archetypes)) {
      expect(arch.name, key).not.toHaveLength(0)
      expect(arch.tagline, key).not.toHaveLength(0)
      expect(arch.truths.length, key).toBeGreaterThan(0)
      expect(arch.waMsg, key).not.toHaveLength(0)
    }
  })

  it("toda opcion apunta a un arquetipo existente", () => {
    questions.forEach((question, i) => {
      question.opts.forEach((opt) => {
        expect(ARCHETYPE_KEYS, `pregunta ${i + 1}: "${opt.l}"`).toContain(opt.x)
      })
    })
  })

  it("cada pregunta ofrece una opcion por arquetipo, sin repetir", () => {
    questions.forEach((question, i) => {
      const keys = question.opts.map((o) => o.x)
      expect(new Set(keys).size, `pregunta ${i + 1}`).toBe(keys.length)
      expect([...keys].sort(), `pregunta ${i + 1}`).toEqual([...ARCHETYPE_KEYS].sort())
    })
  })

  it("no hay enunciados duplicados", () => {
    const texts = questions.map((q) => q.t)
    expect(new Set(texts).size).toBe(texts.length)
  })

  it("todos los arquetipos son alcanzables desde el test", () => {
    const reachable = new Set(questions.flatMap((q) => q.opts.map((o) => o.x)))
    expect([...reachable].sort()).toEqual([...ARCHETYPE_KEYS].sort())
  })
})

describe("contenido del formulario de investigacion", () => {
  it("las preguntas coinciden en orden con las columnas de la tabla", () => {
    expect(researchQuestions.map((q) => q.key)).toEqual([...RESEARCH_QUESTION_KEYS])
  })

  it("ninguna pregunta esta vacia", () => {
    for (const question of researchQuestions) {
      expect(question.text, question.key).not.toHaveLength(0)
      expect(question.section, question.key).not.toHaveLength(0)
    }
  })
})
