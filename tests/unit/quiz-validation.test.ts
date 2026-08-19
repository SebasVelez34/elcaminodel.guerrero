import { describe, expect, it } from "vitest"

import { quizCompletionSchema } from "@/lib/validation/quiz"

const sessionId = "3f1a7c2e-9b4d-4c8a-8f2e-1d5b6a7c8e90"

describe("quizCompletionSchema", () => {
  it("acepta un recorrido completo", () => {
    const result = quizCompletionSchema.safeParse({ sessionId, answers: [0, 1, 2, 3, 4] })
    expect(result.success).toBe(true)
  })

  it("acepta preguntas sin responder como null", () => {
    expect(quizCompletionSchema.safeParse({ sessionId, answers: [0, null, 2] }).success).toBe(true)
  })

  it("rechaza un sessionId que no es uuid", () => {
    expect(quizCompletionSchema.safeParse({ sessionId: "abc", answers: [0] }).success).toBe(false)
  })

  it("rechaza indices negativos o decimales", () => {
    expect(quizCompletionSchema.safeParse({ sessionId, answers: [-1] }).success).toBe(false)
    expect(quizCompletionSchema.safeParse({ sessionId, answers: [1.5] }).success).toBe(false)
  })

  it("rechaza payloads inflados", () => {
    const answers = Array.from({ length: 101 }, () => 0)
    expect(quizCompletionSchema.safeParse({ sessionId, answers }).success).toBe(false)
  })

  it("rechaza respuestas que no son numeros", () => {
    expect(quizCompletionSchema.safeParse({ sessionId, answers: ["0"] }).success).toBe(false)
  })
})
