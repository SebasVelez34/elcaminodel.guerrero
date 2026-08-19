import { describe, expect, it } from "vitest"
import { scoreQuiz } from "@/lib/quiz/score"
import type { ArchetypeKey, QuizQuestion } from "@/lib/quiz/types"

/** Arma un test donde cada pregunta ofrece las 5 opciones en el mismo orden. */
const order: ArchetypeKey[] = ["CH", "ES", "FA", "VO", "BL"]
const q = (n: number): QuizQuestion[] =>
  Array.from({ length: n }, (_, i) => ({
    t: `Pregunta ${i + 1}`,
    opts: order.map((x) => ({ l: `opcion ${x}`, x })),
  }))

/** Indice de la opcion que suma al arquetipo dado. */
const pick = (key: ArchetypeKey) => order.indexOf(key)
const answersFor = (keys: ArchetypeKey[]) => keys.map(pick)

describe("scoreQuiz", () => {
  it("devuelve el arquetipo con mas respuestas", () => {
    const result = scoreQuiz(q(3), answersFor(["ES", "ES", "CH"]))
    expect(result?.key).toBe("ES")
    expect(result?.counts.ES).toBe(2)
    expect(result?.counts.CH).toBe(1)
    expect(result?.tied).toEqual(["ES"])
    expect(result?.answered).toBe(3)
  })

  it("devuelve null si no hay ninguna respuesta", () => {
    expect(scoreQuiz(q(3), [])).toBeNull()
    expect(scoreQuiz(q(3), [undefined, undefined, undefined])).toBeNull()
  })

  it("puntua solo las preguntas respondidas y reporta cuantas fueron", () => {
    const result = scoreQuiz(q(4), [pick("VO"), undefined, pick("VO"), undefined])
    expect(result?.key).toBe("VO")
    expect(result?.answered).toBe(2)
  })

  it("en empate gana el arquetipo que aparecio primero en el test", () => {
    // BL y CH empatan a 2. BL se eligio en la pregunta 1, CH en la 2.
    const result = scoreQuiz(q(4), answersFor(["BL", "CH", "BL", "CH"]))
    expect(result?.tied).toEqual(["CH", "BL"])
    expect(result?.key).toBe("BL")
  })

  it("el desempate no depende del orden de declaracion de los arquetipos", () => {
    // Mismo empate BL/CH, invirtiendo quien aparece primero: ahora gana CH.
    const result = scoreQuiz(q(4), answersFor(["CH", "BL", "CH", "BL"]))
    expect(result?.tied).toEqual(["CH", "BL"])
    expect(result?.key).toBe("CH")
  })

  it("resuelve el empate de los 5 arquetipos a una respuesta cada uno", () => {
    const result = scoreQuiz(q(5), answersFor(["FA", "VO", "BL", "CH", "ES"]))
    expect(result?.tied).toHaveLength(5)
    expect(result?.key).toBe("FA")
  })

  it("ignora indices de opcion fuera de rango en vez de romperse", () => {
    const result = scoreQuiz(q(2), [99, pick("ES")])
    expect(result?.key).toBe("ES")
    expect(result?.answered).toBe(1)
  })
})
