import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { UseFormRegisterReturn } from "react-hook-form";

interface EmailFieldProps {
  register: UseFormRegisterReturn;
  error?: string;
}

export default function EmailField({ register, error }: EmailFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel
        htmlFor="email"
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
      >
        Email
      </FieldLabel>
      <Input
        id="email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        aria-invalid={!!error}
        className="rounded-none border-x-0 border-t-0 border-b border-border px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
        {...register}
      />
      <FieldError errors={error ? [{ message: error }] : undefined} />
    </Field>
  );
}
