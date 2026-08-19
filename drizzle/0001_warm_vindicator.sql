CREATE TABLE "quiz_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz_slug" text DEFAULT 'arquetipos' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"archetype" text,
	"answers" jsonb,
	"counts" jsonb,
	"answered" integer,
	"tie_broken" boolean
);
