"use server";

import { protectedAction } from "@/server/api/trpc";
import { habits } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { newHabitSchema } from "./schemas";

export const createHabit = protectedAction
  .meta({ span: "create-habit" })
  .input(newHabitSchema)
  .mutation(async ({ ctx, input }) => {
    const { name, description } = input;
    console.log(input);
    const userId = ctx.user.id;

    await ctx.db.insert(habits).values({
      name,
      description,
      userId,
    });

    revalidatePath("/habits");
  });
