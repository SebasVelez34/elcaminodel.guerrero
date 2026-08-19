import type { Metadata } from "next"
import { ResearchForm } from "@/components/research-form"

export const metadata: Metadata = {
  title: "Investigación — El Camino del Guerrero",
  description:
    "30 hombres, 10 preguntas honestas. Ayúdanos a construir el MVP de un Sistema de Dirección Personal.",
}

export default function ResearchPage() {
  return (
    <>
      {/* Brand Bar */}
      <div className="brand-bar">
        <span className="brand-name">
          El Camino del <span className="brand-accent">Guerrero</span>
        </span>
      </div>

      <div className="wrap" style={{ justifyContent: "flex-start" }}>
        {/* LANDING */}
        <div className="rs-hero screen active">
          <div className="intro-eyebrow">Investigación abierta — 30 cupos</div>
          <h1 className="intro-title">
            Deja de pasar tus 30 decidiendo qué hacer. <span>Empieza a construir.</span>
          </h1>
          <p className="intro-body">
            Define tu dirección para los próximos 3 años y conviértela en un plan de 90 días.
          </p>

          <div className="rs-empathy">
            Lunes a viernes en automático. Resultados que se ven bien desde afuera. Y aun así, los
            domingos en la noche, esa sensación de que estás desperdiciando algo que no vuelve. No te
            falta información — tienes 3 libros a medio leer que lo prueban. Te falta un sistema de
            decisión.
          </div>

          <p className="rs-value">
            Esto no es un curso de <strong>&quot;propósito&quot;</strong>. Es una investigación
            compartida: <strong>30 hombres, 10 preguntas honestas</strong>, para construir el MVP de
            un Sistema de Dirección Personal — antes de que exista como producto terminado.
          </p>

          <a href="#formulario" className="btn-primary full" style={{ textDecoration: "none" }}>
            Participar en la investigación
          </a>
          <p className="rs-cta-note" style={{ textAlign: "center" }}>
            Sin pitch, sin venta. 10 minutos, respuestas reales, y acceso prioritario cuando esto se
            lance.
          </p>
        </div>

        <div className="rs-divider" />

        {/* FORM */}
        <div id="formulario" style={{ scrollMarginTop: "80px" }}>
          <div className="q-text" style={{ marginBottom: "0.25rem" }}>
            10 preguntas. Sin respuestas correctas.
          </div>
          <p className="q-sub" style={{ marginBottom: "2rem" }}>
            Mientras más honesto, más útil para la investigación.
          </p>
          <ResearchForm />
        </div>
      </div>
    </>
  )
}
