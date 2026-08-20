CREATE TABLE "research_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"form_slug" text DEFAULT 'direccion-personal' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"name" text,
	"contact" text,
	"q1" text,
	"q2" text,
	"q3" text,
	"q4" text,
	"q5" text
);
