// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  habits: many(habits),
}));

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: int("expires_at").notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

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
  userId: text("user_id").notNull(),
});

export const habitsRelations = relations(habits, ({ one, many }) => ({
  user: one(users, {
    fields: [habits.userId],
    references: [users.id],
  }),
  habitRecords: many(habitRecords),
}));

export type HabitType = typeof habits.$inferSelect;
export type InsertHabit = typeof habits.$inferInsert;

export const habitRecords = sqliteTable("habit_records", {
  id: int("id").primaryKey({ autoIncrement: true }),
  habitId: int("habit_id").notNull(),
  date: int("date", { mode: "timestamp" }).notNull(),
  completed: int("completed", { mode: "boolean" }).notNull().default(false),
});

export const habitRecordsRelations = relations(habitRecords, ({ one }) => ({
  habits: one(habits, {
    fields: [habitRecords.habitId],
    references: [habits.id],
  }),
}));

export type HabitRecordType = typeof habitRecords.$inferSelect;
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
