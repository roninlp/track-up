import { Form } from "../_components/form";
import { signUp } from "./action";

export default async function SignUp() {
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
