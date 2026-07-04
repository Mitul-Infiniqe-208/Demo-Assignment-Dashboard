import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { UseFormRegisterReturn } from "react-hook-form";
import { FlexRow } from "@/components/common/flex-row";

interface PasswordFieldProps {
  register: UseFormRegisterReturn;
  error?: string;
}

export default function PasswordField({ register, error }: PasswordFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FlexRow align="center" justify="between">
        <FieldLabel
          htmlFor="password"
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          Password
        </FieldLabel>
      </FlexRow>
      <Input
        id="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        aria-invalid={!!error}
        className="rounded-none border-x-0 border-t-0 border-b border-border px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
        {...register}
      />
      <FieldError errors={error ? [{ message: error }] : undefined} />
    </Field>
  );
}
