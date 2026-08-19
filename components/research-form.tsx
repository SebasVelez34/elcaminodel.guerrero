"use client"

import { useState } from "react"
import { submitResearch, type ResearchState } from "@/app/actions/research"
import { Check } from "lucide-react"
import { researchQuestions } from "@/content/research/preguntas"

const TOTAL_STEPS = researchQuestions.length + 1 // preguntas + paso de contacto

export function ResearchForm() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [state, setState] = useState<ResearchState>({ ok: false })
  const [isPending, setIsPending] = useState(false)

  const isContactStep = step === researchQuestions.length
  const currentQuestion = researchQuestions[step]
  const pct = Math.round((step / TOTAL_STEPS) * 100)

  const canAdvance = isContactStep ? true : (answers[currentQuestion.key] ?? "").trim().length > 0

  const setAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const goNext = () => {
    if (!canAdvance) return
    setStep((s) => Math.min(s + 1, researchQuestions.length))
  }

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = async () => {
    setIsPending(true)
    const formData = new FormData()
    formData.set("name", name)
    formData.set("contact", contact)
    researchQuestions.forEach((q) => formData.set(q.key, answers[q.key] ?? ""))
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
            {isContactStep ? "Último paso" : `Pregunta ${step + 1} de ${researchQuestions.length}`}
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
            {step === researchQuestions.length - 1 ? "Último paso →" : "Siguiente →"}
          </button>
        )}
      </div>
    </div>
  )
}
