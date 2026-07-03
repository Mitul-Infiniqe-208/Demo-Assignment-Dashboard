import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmailField({ value, onChange }: EmailFieldProps) {
  return (
    <Field>
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-none border-x-0 border-t-0 border-b border-border px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
        required
      />
    </Field>
  );
}
