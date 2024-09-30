import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { habitRecords, habits } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, between, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const habitRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().min(1).max(1000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description } = input;
      const userId = ctx.session.user.id;

      await ctx.db.insert(habits).values({
        name,
        description,
        userId,
      });
      revalidatePath("/habits");
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return await ctx.db.query.habits.findMany({
      where: eq(habits.userId, userId),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id } = input;
      const habit = await ctx.db.query.habits.findFirst({
        where: and(eq(habits.id, id), eq(habits.userId, userId)),
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Habit not found",
        });
      }
      return habit;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(100).optional(),
        description: z.string().min(1).max(1000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, name, description } = input;

      const habit = await ctx.db.query.habits.findFirst({
        where: and(eq(habits.id, id), eq(habits.userId, userId)),
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Habit not found",
        });
      }

      await ctx.db
        .update(habits)
        .set({
          name,
          description,
        })
        .where(eq(habits.id, id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id } = input;

      const habit = await ctx.db.query.habits.findFirst({
        where: and(eq(habits.id, id), eq(habits.userId, userId)),
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Habit not found",
        });
      }

      await ctx.db.delete(habits).where(eq(habits.id, id));
    }),

  recordCompletion: protectedProcedure
    .input(
      z.object({
        habitId: z.number(),
        date: z.date(),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { habitId, date, completed } = input;

      await ctx.db.insert(habitRecords).values({
        completed,
        habitId,
        date,
      });
    }),

  getCompletionHistory: protectedProcedure
    .input(
      z.object({
        habitId: z.number(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { habitId, startDate, endDate } = input;
      const userId = ctx.session.user.id;

      const habit = await ctx.db.query.habits.findFirst({
        where: and(eq(habits.id, habitId), eq(habits.userId, userId)),
      });

      if (!habit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Habit not found",
        });
      }

      return await ctx.db.query.habitRecords.findMany({
        where: and(
          eq(habitRecords.habitId, habitId),
          between(habitRecords.date, startDate, endDate),
        ),
      });
    }),
});
