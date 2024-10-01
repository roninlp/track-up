import { z } from "zod";

export const newHabitSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(1000).optional(),
});
