"use client";

import { useState, type SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import EmailField from "./email-field";
import PasswordField from "./password-field";
import { useLogin } from "../hook/UserLogin";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending } = useLogin();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const {data} = await login({email,password});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup>
        <EmailField value={email} onChange={setEmail} />
        <PasswordField value={password} onChange={setPassword} />

        <Field className="mt-4">
          <Button
            disabled={isPending}
            type="submit"
            className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90"
          >
            Sign in
          </Button>
          <FieldDescription className="text-center">
            Trouble signing in? Contact your administrator.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
