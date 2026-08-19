import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const researchResponses = pgTable("research_responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  contact: text("contact"),
  q1: text("q1"),
  q2: text("q2"),
  q3: text("q3"),
  q4: text("q4"),
  q5: text("q5"),
  q6: text("q6"),
  q7: text("q7"),
  q8: text("q8"),
  q9: text("q9"),
  q10: text("q10"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})
