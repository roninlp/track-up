// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
});

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: int("expires_at").notNull(),
});

export const habits = sqliteTable("habit", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export type HabitType = typeof habits.$inferSelect;
export type InsertHabit = typeof habits.$inferInsert;

// Habit records table
export const habitRecords = sqliteTable("habit_records", {
  id: int("id").primaryKey({ autoIncrement: true }),
  habitId: int("habit_id")
    .notNull()
    .references(() => habits.id),
  date: int("date", { mode: "timestamp" }).notNull(),
  completed: int("completed", { mode: "boolean" }).notNull(),
});

export type HabitRecord = typeof habitRecords.$inferSelect;
export type InsertHabitRecord = typeof habitRecords.$inferInsert;

// [info] sample model schema
// export const posts = sqliteTable(
//   "post",
//   {
//     id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//     name: text("name", { length: 256 }),
//     createdAt: int("created_at", { mode: "timestamp" })
//       .default(sql`(unixepoch())`)
//       .notNull(),
//     updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
//       () => new Date(),
//     ),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   }),
// );
