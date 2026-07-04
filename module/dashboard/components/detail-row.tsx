interface DetailRowProps {
  label: string;
  value?: string | null;
}

export function DetailRow({ label, value }: DetailRowProps) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 border-b border-border/60 px-4 py-3 transition-colors last:border-b-0 hover:bg-muted/30 sm:flex-row sm:items-baseline sm:gap-6">
      <span className="w-full shrink-0 text-sm text-muted-foreground sm:w-40">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
