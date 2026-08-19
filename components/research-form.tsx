"use client"

import { useState } from "react"
import { submitResearch, type ResearchState } from "@/app/actions/research"
import { Check } from "lucide-react"

type Question = { key: string; section: string; text: string; sub?: string }

const QUESTIONS: Question[] = [
  {
    key: "q1",
    section: "Dolor actual",
    text: "¿Qué es lo que más te quita el sueño un domingo a las 10pm?",
    sub: "Lo que realmente te da vueltas en la cabeza. No la versión presentable.",
  },
  {
    key: "q2",
    section: "Dolor actual",
    text: 'En una semana normal, ¿en qué momento del día sientes más que estás "en piloto automático"?',
    sub: "El momento donde el tiempo pasa sin que tú decidas nada.",
  },
  {
    key: "q3",
    section: "Intentos fallidos",
    text: "¿Qué libros, cursos o sistemas has comprado ya para resolver esto? ¿Por qué crees que no funcionaron?",
    sub: "Sé específico. Nombra lo que probaste.",
  },
  {
    key: "q4",
    section: "Intentos fallidos",
    text: '¿Cuánto tiempo llevas sintiendo que "algo tiene que cambiar" sin que cambie?',
    sub: "En meses o años. El número real.",
  },
  {
    key: "q5",
    section: "Miedos de trayectoria",
    text: "¿Qué es lo que más te aterra que pase — o no pase — en los próximos 5 años si todo sigue igual?",
    sub: "El miedo concreto, no el genérico.",
  },
  {
    key: "q6",
    section: "Miedos de trayectoria",
    text: "Si le preguntaras a tu versión de dentro de 10 años qué hiciste con esta década, ¿qué te da miedo que responda?",
    sub: "No lo suavices.",
  },
  {
    key: "q7",
    section: "Criterio de éxito",
    text: '¿Cómo se vería, exactamente, sentir que finalmente estás "encaminado" y construyendo algo que respetas?',
    sub: "Descríbelo como si ya estuviera pasando.",
  },
  {
    key: "q8",
    section: "Criterio de éxito",
    text: '¿Qué tendría que pasar para que dejaras de compararte con dónde "deberías" estar?',
    sub: "Lo que te daría paz de verdad.",
  },
  {
    key: "q9",
    section: "Barreras de compra",
    text: '¿Qué te haría decir "esto no es para mí" al ver un programa como este?',
    sub: "Tus objeciones reales. Sé honesto.",
  },
  {
    key: "q10",
    section: "Barreras de compra",
    text: "¿Qué necesitarías ver u oír para confiar en que esto es distinto a lo anterior que compraste?",
    sub: "Lo que te haría creer de verdad.",
  },
]

const TOTAL_STEPS = QUESTIONS.length + 1 // preguntas + paso de contacto

export function ResearchForm() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [state, setState] = useState<ResearchState>({ ok: false })
  const [isPending, setIsPending] = useState(false)

  const isContactStep = step === QUESTIONS.length
  const currentQuestion = QUESTIONS[step]
  const pct = Math.round((step / TOTAL_STEPS) * 100)

  const canAdvance = isContactStep ? true : (answers[currentQuestion.key] ?? "").trim().length > 0

  const setAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const goNext = () => {
    if (!canAdvance) return
    setStep((s) => Math.min(s + 1, QUESTIONS.length))
  }

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = async () => {
    setIsPending(true)
    const formData = new FormData()
    formData.set("name", name)
    formData.set("contact", contact)
    QUESTIONS.forEach((q) => formData.set(q.key, answers[q.key] ?? ""))
    const result = await submitResearch({ ok: false }, formData)
    setState(result)
    setIsPending(false)
  }

  if (state.ok) {
    return (
      <div className="rs-success screen active">
        <div className="rs-success-icon" aria-hidden="true">
          <Check size={26} />
        </div>
        <h2 className="result-name" style={{ fontSize: "clamp(26px, 6vw, 38px)" }}>
          Gracias.
        </h2>
        <p className="result-tagline" style={{ borderBottom: "none", paddingBottom: 0 }}>
          Tus respuestas quedaron registradas. Esto es exactamente lo que necesitábamos para
          construir el MVP del Sistema de Dirección Personal.
        </p>
        <p className="rs-cta-note">
          Tienes acceso prioritario cuando esto se lance. Nada de spam, solo lo importante.
        </p>
      </div>
    )
  }

  return (
    <div className="screen active">
      <div className="progress-wrap">
        <div className="progress-top">
          <span className="progress-label">
            {isContactStep ? "Último paso" : `Pregunta ${step + 1} de ${QUESTIONS.length}`}
          </span>
          <span className="progress-pct">{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }}></div>
        </div>
      </div>

      {isContactStep ? (
        <>
          <div className="rs-eyebrow">Casi listo</div>
          <div className="q-text">¿A dónde te enviamos el acceso prioritario?</div>
          <div className="q-sub">Opcional — pero es la única forma de avisarte cuando esto se lance.</div>

          <div className="rs-contact-block" style={{ marginTop: "1.75rem" }}>
            <div className="rs-field" style={{ marginBottom: "1rem" }}>
              <label className="rs-label" htmlFor="name">
                ¿Cómo te llamas? <span style={{ color: "var(--text3)" }}>(opcional)</span>
              </label>
              <input
                id="name"
                type="text"
                className="rs-input"
                placeholder="Tu nombre"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="rs-field" style={{ marginBottom: 0 }}>
              <label className="rs-label" htmlFor="contact">
                WhatsApp o email{" "}
                <span style={{ color: "var(--text3)" }}>(para el acceso prioritario)</span>
              </label>
              <input
                id="contact"
                type="text"
                className="rs-input"
                placeholder="+57 300 000 0000 o tu@correo.com"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>

          {state.error && <div className="rs-error">{state.error}</div>}
        </>
      ) : (
        <>
          <div className="rs-eyebrow">{currentQuestion.section}</div>
          <div className="q-text">{currentQuestion.text}</div>
          {currentQuestion.sub && <div className="q-sub">{currentQuestion.sub}</div>}
          <textarea
            key={currentQuestion.key}
            className="rs-wizard-textarea"
            placeholder="Escribe con honestidad, sin filtrar…"
            value={answers[currentQuestion.key] ?? ""}
            onChange={(e) => setAnswer(currentQuestion.key, e.target.value)}
            autoFocus
          />
        </>
      )}

      <div className="nav">
        <button
          type="button"
          className="btn-back"
          onClick={goBack}
          style={{ visibility: step === 0 ? "hidden" : "visible" }}
        >
          ← Atrás
        </button>
        {isContactStep ? (
          <button
            type="button"
            className={`btn-primary ${isPending ? "disabled" : ""}`}
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Enviando…" : "Enviar mis respuestas →"}
          </button>
        ) : (
          <button
            type="button"
            className={`btn-primary ${canAdvance ? "" : "disabled"}`}
            onClick={goNext}
          >
            {step === QUESTIONS.length - 1 ? "Último paso →" : "Siguiente →"}
          </button>
        )}
      </div>
    </div>
  )
}
