import { redirect } from "next/navigation";
import type { ActionResult } from "../_components/form";
import { userSchema } from "@/lib/zod-schemas/user-schema";

export async function signUp(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
  formData: FormData,
): Promise<ActionResult> {
  "use server";
  const email = formData.get("email");
  const password = formData.get("password");

  const result = userSchema.safeParse({ email, password });
  if (!result.success) {
    if (
      result.error.errors.filter((err) => err.path[0] === "email").length > 0
    ) {
      return {
        error: "Email is invalid",
      };
    }
    if (
      result.error.errors.filter((err) => err.path[0] === "password").length > 0
    ) {
      return {
        error: "Password is invalid",
      };
    }
    return {
      error: "Something went wrong",
    };
  }

  return redirect("/");
}
