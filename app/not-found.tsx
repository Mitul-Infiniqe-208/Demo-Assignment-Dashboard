import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FlexCol } from "@/components/common/flex-col";

export default function NotFound() {
  return (
    <FlexCol
      justify="center"
      align="center"
      gap={4}
      className="min-h-full flex-1 px-4 text-center"
    >
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="text-3xl font-semibold text-foreground">Page not found</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Button asChild className="mt-2">
        <Link href="/">Back to Dashboard</Link>
      </Button>
    </FlexCol>
  );
}
