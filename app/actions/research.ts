"use server"

import { db } from "@/lib/db"
import { researchResponses } from "@/lib/db/schema"
import { researchFormDataToObject, researchSubmissionSchema } from "@/lib/validation/research"

export type ResearchState = {
  ok: boolean
  error?: string
}

export async function submitResearch(
  _prev: ResearchState,
  formData: FormData,
): Promise<ResearchState> {
  const parsed = researchSubmissionSchema.safeParse(researchFormDataToObject(formData))

  if (!parsed.success) {
    return { ok: false, error: "Por favor responde las 10 preguntas antes de enviar." }
  }

  try {
    await db.insert(researchResponses).values(parsed.data)
    return { ok: true }
  } catch (error) {
    console.error("[research] fallo al guardar la respuesta:", error)
    return { ok: false, error: "Ocurrió un error al guardar tus respuestas. Intenta de nuevo." }
  }
}
