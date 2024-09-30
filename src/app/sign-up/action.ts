import { redirect } from "next/navigation";
import type { ActionResult } from "../_components/form";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { getSession, lucia } from "@/server/auth/lucia";
import { cookies } from "next/headers";
import { validateEmailPassword } from "@/lib/utils/auth";

export async function signUp(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
  formData: FormData,
): Promise<ActionResult> {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = validateEmailPassword(email, password);

  if (result !== true) {
    return {
      error: result,
    };
  }

  const userAlreadyExists = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!!userAlreadyExists) {
    return {
      error: "User already exists",
    };
  }

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userId = generateIdFromEntropySize(10);

  await db.insert(users).values({
    id: userId,
    email,
    passwordHash,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCoockie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCoockie.name,
    sessionCoockie.value,
    sessionCoockie.attributes,
  );

  return redirect("/");
}

export async function signIn(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
  formData: FormData,
): Promise<ActionResult> {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = validateEmailPassword(email, password);

  if (result !== true) {
    return {
      error: result,
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  const validPassword = await verify(existingUser.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) {
    return {
      error: "Password is invalid",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCoockie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCoockie.name,
    sessionCoockie.value,
    sessionCoockie.attributes,
  );

  return redirect("/");
}

export async function signOut(): Promise<ActionResult> {
  "use server";
  const { session } = await getSession();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCoockie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCoockie.name,
    sessionCoockie.value,
    sessionCoockie.attributes,
  );
  return redirect("/");
}
