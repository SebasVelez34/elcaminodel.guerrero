import { describe, expect, it } from "vitest"
import {
  RESEARCH_QUESTION_KEYS,
  researchFormDataToObject,
  researchSubmissionSchema,
} from "@/lib/validation/research"

/** FormData valido, con overrides opcionales. */
function formData(overrides: Record<string, string> = {}) {
  const fd = new FormData()
  for (const key of RESEARCH_QUESTION_KEYS) fd.set(key, `respuesta ${key}`)
  for (const [key, value] of Object.entries(overrides)) fd.set(key, value)
  return fd
}

const parse = (fd: FormData) => researchSubmissionSchema.safeParse(researchFormDataToObject(fd))

describe("researchSubmissionSchema", () => {
  it("acepta las 10 respuestas sin nombre ni contacto", () => {
    const result = parse(formData())
    expect(result.success).toBe(true)
    expect(result.data?.name).toBeNull()
    expect(result.data?.contact).toBeNull()
    expect(result.data?.q1).toBe("respuesta q1")
  })

  it("rechaza si falta una respuesta", () => {
    expect(parse(formData({ q7: "" })).success).toBe(false)
  })

  it("rechaza respuestas que son solo espacios en blanco", () => {
    expect(parse(formData({ q3: "    " })).success).toBe(false)
  })

  it("rechaza un FormData vacio (POST directo a la Server Action)", () => {
    expect(parse(new FormData()).success).toBe(false)
  })

  it("recorta los espacios de las respuestas y del contacto", () => {
    const result = parse(formData({ q1: "  con espacios  ", contact: "  hola@correo.com  " }))
    expect(result.data?.q1).toBe("con espacios")
    expect(result.data?.contact).toBe("hola@correo.com")
  })

  it("rechaza respuestas absurdamente largas", () => {
    expect(parse(formData({ q1: "x".repeat(5001) })).success).toBe(false)
  })

  it("descarta un nombre demasiado largo sin tumbar el envio", () => {
    const result = parse(formData({ name: "x".repeat(200) }))
    expect(result.success).toBe(true)
    expect(result.data?.name).toBeNull()
  })
})
