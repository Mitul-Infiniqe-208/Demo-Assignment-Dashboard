import { X } from "lucide-react";
import { FlexRow } from "@/components/common/flex-row";
import { Button } from "@/components/ui/button";

interface SidebarHeaderProps {
  onClose: () => void;
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <FlexRow
      align="center"
      justify="between"
      className="h-14 border-b border-border px-5"
    >
      <span className="text-sm font-semibold tracking-wide text-foreground">
        Menu
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        aria-label="Close menu"
      >
        <X className="size-5" />
      </Button>
    </FlexRow>
  );
}
