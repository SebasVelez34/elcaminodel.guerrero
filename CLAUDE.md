# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

El proyecto usa **pnpm** (`pnpm-lock.yaml`).

```bash
pnpm install
pnpm dev                 # next dev
pnpm verify              # typecheck + lint + tests + build (lo que debe pasar antes de commitear)

pnpm typecheck           # tsc --noEmit
pnpm lint                # eslint . (flat config, eslint-config-next 16)
pnpm test                # vitest run
pnpm test:watch
pnpm test -- score       # un solo archivo por patron de nombre
pnpm build
```

Tests unitarios en `tests/unit/**/*.test.{ts,tsx}` (Vitest + jsdom, alias `@/`). **No hay tests e2e todavia** — el flujo del formulario contra la base no esta cubierto.

### Base de datos

```bash
pnpm db:generate         # genera migracion tras cambiar lib/db/schema.ts
pnpm db:migrate          # la aplica
pnpm db:studio
```

`drizzle.config.ts` carga `.env.development.local` con `process.loadEnvFile` cuando `DATABASE_URL` no esta en el entorno. Ese archivo lo genera `vercel env pull` y esta ignorado por git.

La migracion `drizzle/0000_*.sql` es un **baseline**: la tabla ya existia en Neon antes de que hubiera migraciones, por eso usa `CREATE TABLE IF NOT EXISTS`. Las siguientes son normales — no repitas ese patron.

### Despliegue

Proyecto vinculado a Vercel (`.vercel/project.json` → `v0-untitled-chat`, alias de produccion `v0-elcaminodelguerrero.vercel.app`). Remote `origin` → `SebasVelez34/elcaminodel.guerrero`.

```bash
vercel --prod --yes
vercel env pull
```

**No hay CI todavia**: nada corre `pnpm verify` automaticamente antes de un deploy.

## Arquitectura

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4 + Drizzle sobre Neon Postgres. Landing en español de "El Camino del Guerrero", con dos funnels que **no comparten estado ni navegacion**.

### Regla estructural

**El dominio vive en `lib/`, no en los componentes.** Toda logica con reglas de negocio (puntuacion, validacion, decisiones) va en un modulo puro y testeable bajo `lib/`; los componentes solo renderizan y manejan estado de UI. Si te encuentras escribiendo un `if` con significado de producto dentro de un `.tsx`, va en `lib/`.

### `/` — Quiz de arquetipos ([app/page.tsx](app/page.tsx))

Client Component con maquina de estados `intro → quiz → result`. Las preguntas (`Qs`) y el copy de los 5 arquetipos (`archs`) **siguen hardcodeados en el archivo** — es la deuda principal pendiente (ver abajo).

- Codigos de arquetipo: `CH` Chispa, `ES` Estratega, `FA` Fantasma, `VO` Volcan, `BL` Blindado. Definidos en [lib/quiz/types.ts](lib/quiz/types.ts).
- La puntuacion esta en [lib/quiz/score.ts](lib/quiz/score.ts), es pura y esta cubierta por tests. **Los empates se resuelven a favor del arquetipo que aparecio primero en el recorrido del test** — es una regla de producto explicita, no un accidente de ordenamiento. `scoreQuiz` devuelve tambien `counts` y `tied` para analitica futura.
- El CTA final arma `https://wa.me/${WA_NUMBER}` con el mensaje del arquetipo. `WA_NUMBER` esta hardcodeado.
- El resultado **no se persiste**: hoy el quiz no deja ningun dato.
- Ojo: el `metadata` de [app/layout.tsx](app/layout.tsx) dice "12 preguntas" pero `Qs` tiene 13. Si cambias el numero, sincroniza el copy.

### `/research` — Formulario de investigacion

Unico camino que escribe en la base:

`components/research-form.tsx` (wizard, una pregunta por paso) → [app/actions/research.ts](app/actions/research.ts) (`"use server"`) → [lib/validation/research.ts](lib/validation/research.ts) (zod) → `lib/db` (Drizzle) → Neon.

- El wizard no usa `<form action={...}>` ni `useActionState`: construye el `FormData` a mano y llama a la Server Action con un `_prev` falso.
- **La Server Action es un endpoint publico.** Cualquiera puede hacerle POST sin pasar por el wizard, asi que la validacion zod es la unica garantia real sobre los datos. Toda escritura nueva debe validar igual.
- Las 10 preguntas van escritas una por una en el esquema zod a proposito: generarlas con `Object.fromEntries` rompe la inferencia de tipos.
- `DATABASE_URL` apunta al **pooler** de Neon (host con sufijo `-pooler`), que es lo que hace viable un `Pool` de `pg` en serverless. No lo cambies por `DATABASE_URL_UNPOOLED`.

### Estilos

[app/globals.css](app/globals.css) (~800 lineas) es el unico CSS y es un design system escrito a mano: variables `--bg`, `--accent`, `--font-head`, y clases globales que las paginas usan directamente (`.wrap`, `.screen`, `.btn-primary`, `.q-text`, `.rs-*`, `.progress-*`). Los componentes mezclan esas clases con `style` inline. Tailwind esta importado pero se usa poco.

`components/ui/` (shadcn) fue **eliminado por no usarse**; `components.json` sigue configurado, asi que si necesitas un componente concreto: `pnpm dlx shadcn@latest add <componente>`. No reintroduzcas el volcado completo.

### SEO

[lib/site.ts](lib/site.ts) centraliza la URL canonica (`NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → localhost) y la lista `publicRoutes`, que alimenta [app/sitemap.ts](app/sitemap.ts). **Al agregar una ruta publica, agregala a `publicRoutes`.**

## Deuda conocida (proximos pasos)

1. **Contenido hardcodeado en componentes** — `Qs`/`archs` en `app/page.tsx` y `QUESTIONS` en `research-form.tsx` deberian moverse a `content/` tipado. Es lo que bloquea agregar mas quizzes o landings sin copiar-pegar.
2. **El quiz no captura nada** — falta tabla `quiz_results` (respuestas, arquetipo, abandono) para tener tasa de completado y leads.
3. **Sin rate limiting** en la Server Action.
4. **Sin CI** — falta workflow que corra `pnpm verify` en cada push/PR.
5. **Sin blog** — decidido: MDX versionado en el repo bajo `content/blog/`.
6. **Sin tests e2e** del funnel de research.

## Convenciones

- Todo el contenido de cara al usuario esta en español (`<html lang="es">`), tono directo y sin suavizar. Manten ese registro al editar copy.
- Los mensajes de error de las Server Actions se devuelven como `{ ok: false, error }` en español; nunca lanzan hacia el cliente.
- Los logs de servidor van con prefijo de modulo: `console.error("[research] ...")`.
