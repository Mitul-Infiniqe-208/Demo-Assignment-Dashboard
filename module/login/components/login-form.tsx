"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import EmailField from "./email-field";
import PasswordField from "./password-field";
import { useLogin } from "../hooks/UserLogin";
import { loginSchema, type LoginSchema } from "../schema/login-schema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { login, isPending } = useLogin();

  const onSubmit = handleSubmit(async (values) => {
    await login(values);
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <EmailField register={register("email")} error={errors.email?.message} />
        <PasswordField
          register={register("password")}
          error={errors.password?.message}
        />

        <Field className="mt-4">
          <Button
            type="submit"
            disabled={isPending}
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
