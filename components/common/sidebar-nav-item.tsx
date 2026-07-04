import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarNavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  onNavigate: () => void;
}

export function SidebarNavItem({
  label,
  href,
  icon: Icon,
  isActive,
  onNavigate,
}: SidebarNavItemProps) {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3",
        isActive &&
          "bg-foreground text-background hover:bg-foreground hover:text-background"
      )}
    >
      <Link href={href} onClick={onNavigate}>
        <Icon className="size-4" />
        {label}
      </Link>
    </Button>
  );
}
