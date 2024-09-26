import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must be less than 255 characters"),
});
