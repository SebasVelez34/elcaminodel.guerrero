import { defineConfig } from "drizzle-kit"

// drizzle-kit no lee archivos .env por su cuenta. En local tomamos las
// credenciales del archivo que genera `vercel env pull`; en CI/Vercel la
// variable ya viene del entorno.
if (!process.env.DATABASE_URL) {
  try {
    process.loadEnvFile(".env.development.local")
  } catch {
    // sin archivo local: seguimos con lo que haya en el entorno
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error("Falta DATABASE_URL. Corre `vercel env pull` para generar .env.development.local")
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL },
})
