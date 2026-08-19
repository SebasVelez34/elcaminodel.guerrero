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

Tests unitarios en `tests/unit/**/*.test.{ts,tsx}` (Vitest + jsdom, alias `@/`). **No hay tests e2e**: los funnels se verifican a mano en el navegador.

### Base de datos

```bash
pnpm db:generate         # genera migracion tras cambiar lib/db/schema.ts
pnpm db:migrate          # la aplica
pnpm db:studio
```

`drizzle.config.ts` carga `.env.development.local` con `process.loadEnvFile` cuando `DATABASE_URL` no esta en el entorno. Ese archivo lo genera `vercel env pull` y esta ignorado por git.

La migracion `drizzle/0000_*.sql` es un **baseline**: la tabla `research_responses` ya existia en Neon antes de que hubiera migraciones, por eso usa `CREATE TABLE IF NOT EXISTS`. Las siguientes son normales — no repitas ese patron.

### Despliegue

Proyecto vinculado a Vercel (`.vercel/project.json` → `v0-untitled-chat`, alias de produccion `v0-elcaminodelguerrero.vercel.app`). Remote `origin` → `SebasVelez34/elcaminodel.guerrero`.

```bash
vercel --prod --yes
vercel env pull
```

**No hay CI**: nada corre `pnpm verify` automaticamente antes de un deploy.

## Arquitectura

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4 + Drizzle sobre Neon Postgres. Landing en español de "El Camino del Guerrero", con dos funnels que **no comparten estado ni navegacion**.

```
app/(funnels)/          / (quiz) y /research
app/actions/            Server Actions
content/quizzes/        preguntas y copy de arquetipos
content/research/       preguntas del formulario
lib/quiz/               dominio del quiz (scoring, tipos)
lib/validation/         esquemas zod compartidos
lib/db/                 schema y conexion
tests/unit/
```

### Reglas estructurales

**El dominio vive en `lib/`, no en los componentes.** Toda logica con reglas de negocio (puntuacion, validacion, decisiones) va en un modulo puro y testeable bajo `lib/`; los componentes solo renderizan y manejan estado de UI. Si te encuentras escribiendo un `if` con significado de producto dentro de un `.tsx`, va en `lib/`.

**El contenido vive en `content/`, no en los componentes.** Preguntas, copy de resultados y textos largos son datos tipados en `content/`. Un cambio de copy no deberia tocar ningun `.tsx`.

**Las rutas se agrupan por proposito.** `app/(funnels)/` son las rutas interactivas que capturan datos; `app/(marketing)/` queda reservado para blog y paginas de contenido. Los route groups no cambian la URL.

**Toda escritura valida con zod.** Las Server Actions son endpoints publicos: cualquiera puede hacerles POST sin pasar por la UI.

### `/` — Quiz de arquetipos

[app/(funnels)/page.tsx](<app/(funnels)/page.tsx>) es un Client Component con maquina de estados `intro → quiz → result`. Solo renderiza.

- Contenido (13 preguntas + copy de los 5 arquetipos): [content/quizzes/arquetipos.ts](content/quizzes/arquetipos.ts).
- Codigos: `CH` Chispa, `ES` Estratega, `FA` Fantasma, `VO` Volcan, `BL` Blindado ([lib/quiz/types.ts](lib/quiz/types.ts)).
- Scoring en [lib/quiz/score.ts](lib/quiz/score.ts), puro y con tests. **Los empates se resuelven a favor del arquetipo que aparecio primero en el recorrido del test** — regla de producto explicita, no un accidente de ordenamiento.
- **Medicion**: se abre una fila en `quiz_sessions` al empezar y se cierra al terminar ([app/actions/quiz.ts](app/actions/quiz.ts)). `completed_at` en null es exactamente un abandono. El arquetipo se **recalcula en el servidor** con las mismas respuestas: el cliente no decide que se guarda. Si la medicion falla se loguea y el test sigue — nunca puede tumbar el funnel.
- El CTA final arma `https://wa.me/${whatsappNumber}` con el mensaje del arquetipo (`whatsappNumber` en [lib/site.ts](lib/site.ts)).
- Ojo: el `metadata` de [app/layout.tsx](app/layout.tsx) dice "12 preguntas" pero hay 13. Si cambias el numero, sincroniza el copy.

### `/research` — Formulario de investigacion

`components/research-form.tsx` (wizard, una pregunta por paso) → [app/actions/research.ts](app/actions/research.ts) → [lib/validation/research.ts](lib/validation/research.ts) (zod) → `lib/db` → Neon.

- Contenido de las preguntas en [content/research/preguntas.ts](content/research/preguntas.ts), tipado contra `RESEARCH_QUESTION_KEYS` (que son las columnas de la tabla). Un test verifica que orden y claves coincidan.
- El wizard no usa `<form action={...}>` ni `useActionState`: construye el `FormData` a mano y llama a la Server Action con un `_prev` falso.
- Las 10 preguntas van escritas una por una en el esquema zod a proposito: generarlas con `Object.fromEntries` rompe la inferencia de tipos.
- `DATABASE_URL` apunta al **pooler** de Neon (host con sufijo `-pooler`), que es lo que hace viable un `Pool` de `pg` en serverless. No lo cambies por `DATABASE_URL_UNPOOLED`.

### Estilos

[app/globals.css](app/globals.css) (~800 lineas) es el unico CSS y es un design system escrito a mano: variables `--bg`, `--accent`, `--font-head`, y clases globales que las paginas usan directamente (`.wrap`, `.screen`, `.btn-primary`, `.q-text`, `.opt`, `.rs-*`, `.progress-*`). Los componentes mezclan esas clases con `style` inline. Tailwind esta importado pero se usa poco.

`components/ui/` (shadcn) fue **eliminado por no usarse**; `components.json` sigue configurado, asi que si necesitas un componente concreto: `pnpm dlx shadcn@latest add <componente>`. No reintroduzcas el volcado completo.

### SEO

[lib/site.ts](lib/site.ts) centraliza la URL canonica (`NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → localhost) y la lista `publicRoutes`, que alimenta [app/sitemap.ts](app/sitemap.ts). **Al agregar una ruta publica, agregala a `publicRoutes`.**

## Deuda conocida (proximos pasos)

1. **Sin rate limiting** en las Server Actions. `startQuizSession` inserta una fila por cada persona que arranca el test, sin ninguna proteccion.
2. **Sin CI** — falta workflow que corra `pnpm verify` en cada push/PR.
3. **Sin blog** — decidido: MDX versionado en el repo bajo `content/blog/`, servido desde `app/(marketing)/`.
4. **Sin tests e2e** de los funnels.
5. **No se sabe en que pregunta abandona la gente**: solo si empezo y si termino. El drop-off por pregunta requiere eventos por paso.
6. `/favicon.ico` da 404: hay `icon.svg` en `public/` pero no esta declarado como icono de la app.

## Convenciones

- Todo el contenido de cara al usuario esta en español (`<html lang="es">`), tono directo y sin suavizar. Manten ese registro al editar copy.
- Los errores de las Server Actions se devuelven como `{ ok: false, error }` en español; nunca lanzan hacia el cliente.
- Los logs de servidor van con prefijo de modulo: `console.error("[research] ...")`, `console.error("[quiz] ...")`.
- La medicion nunca bloquea ni rompe un funnel: si falla, se loguea y se sigue.
