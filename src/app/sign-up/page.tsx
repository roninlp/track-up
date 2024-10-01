import { getUserAndSession } from "@/server/auth/lucia";
import Form from "../_components/form";
import { signOut, signUp, signIn } from "./action";

export default async function SignUp() {
  const { user } = await getUserAndSession();

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
      <h1>Sign In</h1>
      <Form action={signIn}>
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
