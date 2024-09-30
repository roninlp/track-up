import { userSchema } from "../zod-schemas/user-schema";

export function validateEmailPassword(email: string, password: string) {
  const result = userSchema.safeParse({ email, password });
  if (!result.success) {
    if (
      result.error.errors.filter((err) => err.path[0] === "email").length > 0
    ) {
      return "Email is invalid";
    }
    if (
      result.error.errors.filter((err) => err.path[0] === "password").length > 0
    ) {
      return "Password is invalid";
    }
    return "Something went wrong";
  }
  return true;
}
