"use client"

import { useRef, useState } from "react"

import { completeQuizSession, startQuizSession } from "@/app/actions/quiz"
import { archetypes, questions } from "@/content/quizzes/arquetipos"
import { scoreQuiz } from "@/lib/quiz/score"
import type { ArchetypeKey, QuizAnswers } from "@/lib/quiz/types"
import { whatsappNumber } from "@/lib/site"

export default function QuizPage() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "result">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [resultKey, setResultKey] = useState<ArchetypeKey | "">("")

  /**
   * Sesion de medicion. Vive en un ref y no en el estado a proposito: llega
   * de forma asincrona y no debe provocar re-render ni bloquear el test.
   */
  const sessionId = useRef<string | null>(null)

  /** Abre una sesion sin esperarla: si falla, el test funciona igual. */
  const openSession = () => {
    sessionId.current = null
    void startQuizSession().then((id) => {
      sessionId.current = id
    })
  }

  const init = () => {
    setScreen("quiz")
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedOption(null)
    openSession()
  }

  const pick = (index: number) => {
    setSelectedOption(index)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = index
    setAnswers(newAnswers)
  }

  const next = () => {
    if (selectedOption === null) return
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(answers[currentQuestion + 1] ?? null)
    } else {
      calculateResult()
    }
  }

  const back = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1] ?? null)
    }
  }

  const calculateResult = () => {
    const score = scoreQuiz(questions, answers)
    if (!score) return
    setResultKey(score.key)
    setScreen("result")

    if (sessionId.current) {
      void completeQuizSession({
        sessionId: sessionId.current,
        answers: answers.map((answer) => answer ?? null),
      })
    }
  }

  const retake = () => {
    setAnswers([])
    setCurrentQuestion(0)
    setSelectedOption(null)
    setResultKey("")
    setScreen("quiz")
    openSession()
  }

  const pct = Math.round((currentQuestion / questions.length) * 100)
  const arch = resultKey ? archetypes[resultKey] : undefined
  const waLink = arch ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(arch.waMsg)}` : ""

  const checklist = [
    "Empezaste algo con mucha energía y lo abandonaste antes de la semana 3.",
    "Tienes un plan detallado de algo que llevas meses sin ejecutar.",
    "Tu día termina ocupado pero con la sensación de que lo importante quedó para mañana.",
    "Haces cosas que otros esperan de ti más seguido de lo que haces cosas que tú quieres.",
    "Te cuesta pedir ayuda aunque sepas que la necesitas.",
    "Sabes qué tendrías que hacer diferente pero no lo estás haciendo.",
    "Tu rendimiento o energía bajan cuando algo importante no avanza.",
    "Llevas más de un mes con la misma meta sin progreso real.",
  ]

  const patterns = [
    ["Arranque sin sistema", "La motivación inicial es real pero no hay estructura que la sostenga cuando baja."],
    ["Parálisis por análisis", "El plan detallado reemplaza la ejecución. Prepararse se siente como avanzar."],
    ["Dirección prestada", "Vivir según expectativas ajenas sin saber bien qué quieres tú."],
    ["Urgencia crónica", "Lo urgente siempre gana. Lo importante se queda esperando indefinidamente."],
    ["Independencia rígida", "Cargar todo solo como identidad, no como herramienta."],
  ]

  const centroItems = [
    { letter: "C", word: "Clarifica", desc: "¿Qué quieres lograr realmente? Una cosa. Concreta." },
    { letter: "E", word: "Evalúa", desc: "¿Qué patrón te está frenando hoy? Nómbralo sin juicio." },
    { letter: "N", word: "Nombra", desc: "¿Cuál es el paso más pequeño posible que puedes dar hoy?" },
    { letter: "T", word: "Toma", desc: "Ese paso. Solo ese. Nada más por ahora." },
    { letter: "R", word: "Registra", desc: "Apunta qué hiciste. El tracking convierte acciones en evidencia." },
    { letter: "O", word: "Observa", desc: "¿Qué funcionó? ¿Qué cambiarías mañana? Ajusta, no abandones." },
  ]

  return (
    <>
      {/* Brand Bar */}
      <div className="brand-bar">
        <span className="brand-name">
          El Camino del <span className="brand-accent">Guerrero</span>
        </span>
      </div>

      <div className="wrap">
        {/* INTRO SCREEN */}
        {screen === "intro" && (
          <div className="screen active">
            <div className="intro-eyebrow">El Camino del Guerrero — Test de arquetipo</div>
            <h1 className="intro-title">
              Seamos honestos sobre cómo eres realmente{" "}
              <span>cuando nadie te está mirando.</span>
            </h1>
            <p className="intro-body">
              Esto no es un test de personalidad genérico. Son 13 preguntas sobre cómo te
              comportas realmente — con tus metas, tu tiempo, y contigo mismo.
              <br />
              <br />
              Al final sabes en cuál de los 5 patrones estás y por qué sigues en el mismo lugar.
            </p>
            <p className="intro-meta">
              <span>4 minutos</span> &nbsp;·&nbsp; sin filtros &nbsp;·&nbsp; sin psicoblabla
            </p>
            <button className="btn-primary full" onClick={init}>
              Sí, quiero saber la verdad
            </button>
          </div>
        )}

        {/* QUIZ SCREEN */}
        {screen === "quiz" && (
          <div className="screen active">
            <div className="progress-wrap">
              <div className="progress-top">
                <span className="progress-label">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="progress-pct">{pct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }}></div>
              </div>
            </div>
            <div className="q-text">{questions[currentQuestion].t}</div>
            <div className="q-sub">{questions[currentQuestion].s}</div>
            <div className="options">
              {questions[currentQuestion].opts.map((opt, i) => (
                <button
                  key={i}
                  className={`opt ${selectedOption === i ? "sel" : ""}`}
                  onClick={() => pick(i)}
                >
                  {opt.l}
                </button>
              ))}
            </div>
            <div className="nav">
              <button
                className="btn-back"
                onClick={back}
                style={{ visibility: currentQuestion === 0 ? "hidden" : "visible" }}
              >
                ← Atrás
              </button>
              <button
                className={`btn-primary ${selectedOption === null ? "disabled" : ""}`}
                onClick={next}
              >
                {currentQuestion === questions.length - 1 ? "Ver mi arquetipo →" : "Siguiente →"}
              </button>
            </div>
          </div>
        )}

        {/* RESULT SCREEN */}
        {screen === "result" && arch && (
          <div className="screen active">
            <div className="result-top">
              <span
                className="result-badge"
                style={{ background: arch.badgeBg, color: arch.badgeTx }}
              >
                {arch.badge}
              </span>
              <div className="result-name">{arch.name}</div>
              <div className="result-tagline">{arch.tagline}</div>
              <div className="result-body">{arch.body}</div>
              <div className="truths-label">Lo que necesitas escuchar</div>
              {arch.truths.map((truth, i) => (
                <div key={i} className="truth">
                  <span className="truth-dot" style={{ background: arch.accentColor }}></span>
                  <span>{truth}</span>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="wa-block" style={{ marginBottom: "0.75rem" }}>
              <div className="wa-block-title">Recibe el protocolo completo por WhatsApp</div>
              <div className="wa-block-desc">
                El kit personalizado para tu arquetipo — con los pasos exactos para romper tu
                patrón en los próximos 7 días. Te lo envío directo.
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-btn">
                <svg
                  className="wa-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    fill="currentColor"
                  />
                </svg>
                Escribirme por WhatsApp
              </a>
            </div>

            <div className="divider"></div>

            <div className="kit-label">Tu kit gratuito — Protocolo C.E.N.T.R.O.</div>

            <div className="kit-block">
              <div className="kit-block-title">Checklist: ¿estás atascado? 8 señales</div>
              {checklist.map((item, i) => (
                <div key={i} className="kit-row">
                  <span className="kit-n">{i + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="kit-block">
              <div className="kit-block-title">Los 5 patrones: reconócelos antes de actuar</div>
              {patterns.map(([title, desc], i) => (
                <div key={i} className="kit-row kit-row-col">
                  <span className="kit-row-title">{title}</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>

            <div className="kit-block">
              <div className="kit-block-title">
                Protocolo C.E.N.T.R.O — los próximos 7 días
              </div>
              <div className="centro-grid">
                {centroItems.map((item, i) => (
                  <div key={i} className="centro-cell">
                    <div className="c-letter">{item.letter}</div>
                    <div className="c-word">{item.word}</div>
                    <div className="c-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="wa-block">
              <div className="wa-block-title">Recibe el protocolo completo por WhatsApp</div>
              <div className="wa-block-desc">
                El kit personalizado para tu arquetipo — con los pasos exactos para romper tu
                patrón en los próximos 7 días. Te lo envío directo.
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-btn">
                <svg
                  className="wa-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    fill="currentColor"
                  />
                </svg>
                Escribirme por WhatsApp
              </a>
            </div>

            <div className="retry-row">
              <button className="retry-btn" onClick={retake}>
                Hacer el test de nuevo
              </button>
              <div
                style={{
                  marginTop: "1.5rem",
                  fontSize: "11px",
                  color: "var(--text3)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                El Camino del Guerrero
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}