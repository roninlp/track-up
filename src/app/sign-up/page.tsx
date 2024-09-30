import { getSession } from "@/server/auth/lucia";
import Form from "../_components/form";
import { signOut, signUp } from "./action";

export default async function SignUp() {
  const { user } = await getSession();

  if (!!user) {
    return (
      <>
        <p>You are already signed in.</p>
        <Form action={signOut}>
          <button type="submit">Sign Out</button>
        </Form>
      </>
    );
  }

  return (
    <>
      <h1>Sign Up</h1>
      <Form action={signUp}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </Form>
    </>
  );
}
