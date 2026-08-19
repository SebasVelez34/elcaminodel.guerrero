-- Baseline. La tabla ya existia en Neon antes de que el proyecto tuviera
-- migraciones, asi que este primer archivo usa IF NOT EXISTS para poder
-- aplicarse sobre la base actual sin romperse. Las migraciones siguientes las
-- genera drizzle-kit y no necesitan este tratamiento.
CREATE TABLE IF NOT EXISTS "research_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"contact" text,
	"q1" text,
	"q2" text,
	"q3" text,
	"q4" text,
	"q5" text,
	"q6" text,
	"q7" text,
	"q8" text,
	"q9" text,
	"q10" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
