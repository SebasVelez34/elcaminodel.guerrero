"use server"

import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { researchSubmissions } from "@/lib/db/schema"
import { researchFormDataToObject, researchSubmissionSchema } from "@/lib/validation/research"

const FORM_SLUG = "direccion-personal"

export type ResearchState = {
  ok: boolean
  error?: string
}

/**
 * Abre una fila en cuanto la persona empieza a responder, para poder medir
 * cuantos arrancan y cuantos terminan.
 *
 * Devuelve null si algo falla: esto es medicion, no puede tumbar el funnel.
 * El formulario sigue funcionando y al enviar se guarda como fila nueva.
 */
export async function startResearchSession(): Promise<string | null> {
  try {
    const [row] = await db
      .insert(researchSubmissions)
      .values({ formSlug: FORM_SLUG })
      .returning({ id: researchSubmissions.id })
    return row?.id ?? null
  } catch (error) {
    console.error("[research] no se pudo abrir la sesion:", error)
    return null
  }
}

export async function submitResearch(
  _prev: ResearchState,
  formData: FormData,
): Promise<ResearchState> {
  const parsed = researchSubmissionSchema.safeParse(researchFormDataToObject(formData))

  if (!parsed.success) {
    return { ok: false, error: "Por favor responde las 5 preguntas antes de enviar." }
  }

  const { sessionId, ...answers } = parsed.data
  const values = { ...answers, completedAt: new Date() }

  try {
    if (sessionId) {
      const updated = await db
        .update(researchSubmissions)
        .set(values)
        .where(eq(researchSubmissions.id, sessionId))
        .returning({ id: researchSubmissions.id })

      if (updated.length > 0) return { ok: true }
    }

    // Sin sesion, o con una que ya no existe: la respuesta se guarda igual.
    await db.insert(researchSubmissions).values({ ...values, formSlug: FORM_SLUG })
    return { ok: true }
  } catch (error) {
    console.error("[research] fallo al guardar la respuesta:", error)
    return { ok: false, error: "Ocurrió un error al guardar tus respuestas. Intenta de nuevo." }
  }
}
