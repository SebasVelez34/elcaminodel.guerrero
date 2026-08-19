/**
 * URL canonica del sitio. Se puede fijar con NEXT_PUBLIC_SITE_URL cuando haya
 * dominio propio; mientras tanto Vercel expone la URL de produccion y en local
 * caemos al puerto de `next dev`.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
)

export const siteName = "El Camino del Guerrero"

/** Rutas indexables. Al agregar una ruta publica, agregala aqui: alimenta el sitemap. */
export const publicRoutes = ["/", "/research"] as const
