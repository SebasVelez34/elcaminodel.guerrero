"use server"

import { db } from "@/lib/db"
import { researchResponses } from "@/lib/db/schema"

export type ResearchState = {
  ok: boolean
  error?: string
}

const QUESTION_KEYS = [
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

export async function submitResearch(
  _prev: ResearchState,
  formData: FormData,
): Promise<ResearchState> {
  try {
    const name = (formData.get("name") as string | null)?.trim() || null
    const contact = (formData.get("contact") as string | null)?.trim() || null

    const answers = QUESTION_KEYS.map((key) => {
      const value = (formData.get(key) as string | null)?.trim()
      return value && value.length > 0 ? value : null
    })

    const answered = answers.filter(Boolean).length
    if (answered < QUESTION_KEYS.length) {
      return { ok: false, error: "Por favor responde las 10 preguntas antes de enviar." }
    }

    await db.insert(researchResponses).values({
      name,
      contact,
      q1: answers[0],
      q2: answers[1],
      q3: answers[2],
      q4: answers[3],
      q5: answers[4],
      q6: answers[5],
      q7: answers[6],
      q8: answers[7],
      q9: answers[8],
      q10: answers[9],
    })

    return { ok: true }
  } catch (error) {
    console.log("[v0] submitResearch error:", error)
    return { ok: false, error: "Ocurrió un error al guardar tus respuestas. Intenta de nuevo." }
  }
}
