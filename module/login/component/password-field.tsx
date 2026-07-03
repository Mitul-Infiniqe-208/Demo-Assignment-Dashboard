import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PasswordField({ value, onChange }: PasswordFieldProps) {
  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel
          htmlFor="password"
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          Password
        </FieldLabel>
        <a
          href="#"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Forgot password?
        </a>
      </div>
      <Input
        id="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-none border-x-0 border-t-0 border-b border-border px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
        required
      />
    </Field>
  );
}
