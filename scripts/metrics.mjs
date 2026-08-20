/**
 * Metricas de los dos funnels, en texto plano.
 *
 *   pnpm metrics
 *
 * Solo lee: ninguna consulta de este archivo escribe en la base.
 */
import { Client } from "pg"

if (!process.env.DATABASE_URL) {
  try {
    process.loadEnvFile(".env.development.local")
  } catch {
    // sin archivo local: seguimos con lo que haya en el entorno
  }
}

if (!process.env.DATABASE_URL) {
  console.error("Falta DATABASE_URL. Corre `vercel env pull` para generar .env.development.local")
  process.exit(1)
}

const pct = (part, total) => (total === 0 ? "—" : `${Math.round((part / total) * 100)}%`)
const title = (text) => console.log(`\n${text}\n${"─".repeat(text.length)}`)

const client = new Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

try {
  const { rows: [research] } = await client.query(`
    select
      count(*)::int as empezados,
      count(completed_at)::int as completados,
      count(contact)::int as con_contacto
    from research_submissions
  `)

  title("Formulario /research")
  console.log(`Empezaron:    ${research.empezados}`)
  console.log(`Completaron:  ${research.completados}  (${pct(research.completados, research.empezados)})`)
  console.log(`Dejaron contacto: ${research.con_contacto}  (${pct(research.con_contacto, research.completados)} de los que completaron)`)

  const { rows: ultimas } = await client.query(`
    select completed_at, coalesce(name, 'anonimo') as name, left(q1, 70) as q1
    from research_submissions
    where completed_at is not null
    order by completed_at desc
    limit 5
  `)
  if (ultimas.length > 0) {
    console.log("\nUltimas respuestas:")
    for (const row of ultimas) {
      console.log(`  ${row.completed_at.toISOString().slice(0, 16).replace("T", " ")}  ${row.name}: ${row.q1}…`)
    }
  }

  const { rows: [quiz] } = await client.query(`
    select
      count(*)::int as empezados,
      count(completed_at)::int as completados,
      count(*) filter (where tie_broken)::int as empates
    from quiz_sessions
  `)

  title("Quiz de arquetipos /")
  console.log(`Empezaron:    ${quiz.empezados}`)
  console.log(`Completaron:  ${quiz.completados}  (${pct(quiz.completados, quiz.empezados)})`)
  console.log(`Resueltos por desempate: ${quiz.empates}`)

  const { rows: distribucion } = await client.query(`
    select archetype, count(*)::int as total
    from quiz_sessions
    where completed_at is not null
    group by archetype
    order by total desc
  `)
  if (distribucion.length > 0) {
    console.log("\nDistribucion de arquetipos:")
    for (const row of distribucion) {
      const barra = "█".repeat(Math.round((row.total / quiz.completados) * 20))
      console.log(`  ${row.archetype}  ${String(row.total).padStart(4)}  ${pct(row.total, quiz.completados).padStart(4)}  ${barra}`)
    }
  }

  console.log("")
} finally {
  await client.end()
}
