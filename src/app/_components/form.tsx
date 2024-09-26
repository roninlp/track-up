"use client";
import { useFormState } from "react-dom";

export interface ActionResult {
  error: string | null;
}

interface FormProps {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (prevState: any, formData: FormData) => Promise<ActionResult>;
}

export function Form({ children, action }: FormProps) {
  const [state, formAction] = useFormState(action, {
    error: null,
  });
  return (
    <form action={formAction}>
      {children}
      <p>{state.error}</p>
    </form>
  );
}
